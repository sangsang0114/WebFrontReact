import { Container, Table, Button, Modal } from 'react-bootstrap';
import articleStyle from "./Article.module.css"
import { useEffect, useState, useRef } from "react"
import { useCookies } from 'react-cookie';

export default function Comment(props) {
    const [cookies, ,] = useCookies(['id']);
    const [comments, setComments] = useState([]);
    const commentRef = useRef(null);
    const backendDomain = "http://localhost:8080/api/v1/comment"
    const articleId = props.articleId;
    const [show, setShow] = useState(false);

    const [memberId, setMemberId] = useState(null);

    useEffect(() => {
        setMemberId(cookies.memberId);
        loadComments();
    }, []);

    function loadComments() {
        const commentRequestUrl = `${backendDomain}/${articleId}`
        fetch(commentRequestUrl, {
            headers: {
                'Authorization': `Bearer ${cookies.accessToken}`
            }
        })
            .then(response => response.json())
            .then(json => { setComments(json) });
    }
    return (
        <>
            {comments.map(comment => (
                <Container className={articleStyle.articleZone}>
                    {memberId === comment.memberId &&
                        <CommentEditButton commentId={comment.id} commentContent={comment.commentContent} />
                    }
                    {(memberId === comment.memberId) &&
                        <CommentDeleteButton commentId={comment.id} />
                    }
                    <Table bordered>
                        <tbody>
                            <tr className="row pd-0 mx-0">
                                <td className="col-8">작성자 <b>{comment.nickname}</b></td>
                                <td className="col-4" ><small>{comment.createdAt}</small></td>
                            </tr>
                            <tr className="row pd-0 mx-0">
                                <td>{comment.commentContent}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container >
            ))
            }
        </>
    )

    function editComment(commentId, commentContent) {
        const editCommentRequestUrl = `${backendDomain}/${commentId}`;
        const bodyString = JSON.stringify({ commentContent: commentContent });
        fetch(editCommentRequestUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: bodyString
        }).then((response) => response.json())
            .then(() => {
                alert('댓글 수정 완료');
                window.location.reload();
            })
        setShow(false);
    }

    function CommentEditButton(props) {
        const commentId = props.commentId;
        const commentContent = props.commentContent

        const onCancelClicked = () => setShow(false);
        const handleShow = () => setShow(true);
        const onEditClicked = () => editComment(commentId, commentRef.current.value);
        return (
            <>
                <Button variant="primary" size="sm" onClick={handleShow}>수정</Button>
                <Modal
                    show={show}
                    animation={true}
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
        const commentId = props.commentId;
        function deleteComment() {
            const editCommentRequestUrl = `${backendDomain}/${commentId}`
            fetch(editCommentRequestUrl,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }
            ).then(() => window.location.reload());
        }
        return (
            <><Button variant='danger' size='sm' onClick={deleteComment}>삭제</Button></>
        )
    }
}