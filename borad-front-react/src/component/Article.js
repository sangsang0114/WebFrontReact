import { Container, Table, Button, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from "react";
import GNB from "./GlobalNavigationBar";
import articleStyle from "./Article.module.css"
import Comment from "./Comment";
import { useCookies } from 'react-cookie';

export default function MyBoardDetail() {
    const [cookies, ,] = useCookies(['id']);
    const [article, setArticle] = useState({});
    const [memberId, setMemberId] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const backendDomain = "http://localhost:8080/api/v1"
    const commentNickNameRef = useRef(null);
    const commentRef = useRef(null);

    useEffect(() => {
        setMemberId(cookies.memberId);
        loadArticle();
    }, []);

    function loadArticle() {
        const articleRequestUrl = `${backendDomain}/article/${id}`
        fetch(articleRequestUrl)
            .then(response => response.json())
            .then(json => { setArticle(json); })
    }
    return (
        <>
            <GNB />
            <Container>
                <Article />
                <hr />
                {article.isDeleted === 0 && (<><CommentForm /> <Comment articleId={id} /></>)}
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
                            <td className='col-10'><b>{article.nickname}</b></td>
                        </tr>
                        <tr className='row pd-0 mx-0'>
                            <td className='col-2'><small>최초작성</small> </td>
                            <td className='col-10'><small>{article.createdAt}</small></td>
                        </tr>
                        <tr className='row pd-0 mx-0'>
                            <td className='col-2'><small>최종수정</small> </td>
                            <td className='col-6'><small>{article.updatedAt}</small></td>
                            <td className="col-2">조회수</td>
                            <td className="col-2">{article.viewCount}</td>
                        </tr>
                        <tr className="row pd-0 mx-0">
                            <td className="col-2">제목</td>
                            <td className="col-10">{article.title}</td>
                        </tr>
                        <tr className="row pd-0 mx-0">

                        </tr>
                        <tr className="row pd-0 mx-0">
                            <td>{article.content}</td>
                        </tr>
                    </tbody>
                </Table>
                {memberId === article.memberId && (<Link to={"/update/" + article.id}
                    state={{ title: article.title, content: article.content, memberId: article.memberId }}>
                    <Button variant='primary'>글 수정하기</Button>
                </Link>)}

                <Button variant='danger' onClick={deleteArticle}>글 삭제하기</Button>
            </Container>
        )
    }

    function deleteArticle() {
        const deleteArticleRequestUrl = `${backendDomain}/article`;
        fetch(`${deleteArticleRequestUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.accessToken}`
            },
            method: "DELETE"
        }).then((response) => response.text())
            .then(() => {
                alert('게시글 삭제 완료');
                navigate('/')
            })
    }

    function CommentForm() {
        return (
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" placeholder={memberId ? "댓글 내용을 입력하세요" : "댓글 작성을 위해서는 로그인이 필요합니다."} rows={2}
                            ref={commentRef} disabled={!memberId}
                        />
                    </Form.Group>
                    <Button variant='primary' onClick={insertComment} disabled={!memberId}>댓글 등록</Button>
                    <hr />
                </Form>
            </Container >
        )
    }

    function insertComment(event) {
        event.preventDefault();
        const insertCommentRequestUrl = `${backendDomain}/comment/`;
        const bodyString = JSON.stringify({
            articleId: id,
            commentContent: commentRef.current.value,
        });

        fetch(insertCommentRequestUrl, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + cookies.accessToken,
                "Content-Type": "application/json"
            },
            body: bodyString
        })
            .then((response) => response.json())
            .then(() => window.location.reload()
            )
    }
}