import { Container, Table, Button, Modal } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from "react";
import GNB from "./GlobalNavigationBar";
import articleStyle from "./Article.module.css"

export default function MyBoardDetail() {
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [show, setShow] = useState(false);

    const commentRef = useRef(null);
    const commentNickNameRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const backendDomain = "http://localhost:3030"

    useEffect(() => {
        loadArticle();
        loadComments();
    }, [id]);

    function loadArticle() {
        const articleRequestUrl = `${backendDomain}/boards/${id}`
        fetch(articleRequestUrl)
            .then(response => response.json())
            .then(json => { setArticle(json); })
    }

    function loadComments() {
        const commentRequestUrl = `${backendDomain}/replies?board_id=${id}`
        fetch(commentRequestUrl)
            .then(response => response.json())
            .then(json => { setComments(json); })
    }

    return (
        <>
            <GNB />
            <Container>
                <Article />
                <hr />
                <CommentForm />
                <Comment />
            </Container>
        </>
    )
    function Article() {
        return (
            <Container className={articleStyle.articleZone}>
                <Table bordered >
                    <tbody>
                        <tr className="row pd-0 mx-0">
                            <td className='col-2'>작성자 </td>
                            <td className='col-10'><b>{article.mem_id}</b></td>
                        </tr>
                        <tr className='row pd-0 mx-0'>
                            <td className='col-2'><small>최초작성</small> </td>
                            <td className='col-10'><small>{article.reg_dtm}</small></td>
                        </tr>
                        <tr className='row pd-0 mx-0'>
                            <td className='col-2'><small>최종수정</small> </td>
                            <td className='col-10'><small>{article.mod_dtm}</small></td>
                        </tr>
                        <tr className="row pd-0 mx-0">
                            <td className="col-2">제목</td>
                            <td className="col-10">{article.title}</td>
                        </tr>
                        <tr className="row pd-0 mx-0">
                            <td>{article.text}</td>
                        </tr>
                    </tbody>
                </Table>
                <Link to={"/update/" + article.id}><Button variant='primary'>글 수정하기</Button></Link>
                <Button variant='danger' onClick={deleteArticle}>글 삭제하기</Button>
            </Container>
        )
    }

    function deleteArticle() {
        const deleteArticleRequestUrl = `${backendDomain}/boards`;
        fetch(`${deleteArticleRequestUrl}/${id}`, {
            method: "DELETE"
        }).then((response) => response.json())
            .then((result) => {
                alert('게시글 삭제 완료');
                navigate('/')
            })
    }

    function Comment() {
        return (
            <>
                {comments.map(comment => (
                    <Container className={articleStyle.articleZone}>
                        <CommentEditButton commentId={comment.id} commentContent={comment.reply} />
                        <CommentDeleteButton commentId={comment.id} />
                        <Table bordered>
                            <tbody>
                                <tr className="row pd-0 mx-0">
                                    <td className="col-9">작성자 <b>{comment.mem_id}</b></td>
                                    <td className="col-3" ><small>{comment.reg_dtm}</small></td>
                                </tr>
                                <tr className="row pd-0 mx-0">
                                    <td>{comment.reply}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container >
                ))
                }
            </>
        )
    }

    function editComment(commentId, commentContent) {
        const editCommentRequestUrl = `${backendDomain}/replies/${commentId}`;
        let bodyString = JSON.stringify({ reply: commentContent });
        fetch(editCommentRequestUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: bodyString
        }).then((response) => response.json())
            .then((result) => {
                alert('댓글 수정 완료');
                window.location.reload();
            })
        setShow(false);
    }

    function CommentEditButton(props) {
        let commentId = props.commentId;
        let commentContent = props.commentContent
        const [show, setShow] = useState(false);

        const onCancelClicked = () => setShow(false);
        const handleShow = () => setShow(true);
        const onEditClicked = () => editComment(commentId, commentRef.current.value);
        return (
            <>
                <Button variant="primary" size="sm" onClick={handleShow}>수정</Button>
                <Modal
                    show={show}
                    animation={false}
                    size='lg'
                    backdrop="static"
                    keyboard={false}
                    onHide={onCancelClicked}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>댓글 수정하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea rows={2}
                            className="form-control"
                            placeholder="댓글 내용을 입력하세요"
                            ref={commentRef}
                            defaultValue={commentContent} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onCancelClicked}>취소</Button>
                        <Button variant="primary" onClick={onEditClicked}>댓글 수정</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    function CommentDeleteButton(props) {
        let commentId = props.commentId;
        function deleteComment() {
            const editCommentRequestUrl = `${backendDomain}/replies/${commentId}`
            fetch(editCommentRequestUrl,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }
            ).then((result) => {
                alert('댓글 삭제 완료');
                window.location.reload();
            });
        }
        return (
            <><Button variant='danger' size='sm' onClick={deleteComment}>삭제</Button></>
        )
    }

    function CommentForm() {
        return (
            <Container>
                <form action="">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="userNameInput">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="닉네임을 입력하세요"
                                ref={commentNickNameRef}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Password(댓글 수정/삭제 시 필요)</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="비밀번호를 설정해주세요"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contentInput">Content</label>
                        <textarea
                            className="form-control"
                            placeholder="내용을 입력하세요"
                            rows={2}
                            ref={commentRef}
                        />
                    </div>
                    <Button variant='primary' onClick={insertComment}>댓글 등록</Button>
                    <hr />
                </form>
            </Container>
        )
    }

    function insertComment() {
        const insertCommentRequestUrl = `${backendDomain}/replies`;
        let now = new Date().toString();
        let bodyString = JSON.stringify({
            board_id: id,
            mem_id: commentNickNameRef.current.value,
            reply: commentRef.current.value,
            reg_dtm: now
        });

        fetch(insertCommentRequestUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: bodyString
        })
            .then((response) => response.json())
            .then((result) => {
                alert('댓글이 등록되었습니다');
                window.location.reload();
            })
    }
}