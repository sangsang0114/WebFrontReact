import { Container, Table, Button, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from "react";
import GNB from "./GlobalNavigationBar";
import articleStyle from "./Article.module.css"
import Comment from "./Comment";

export default function MyBoardDetail() {
    const [article, setArticle] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const backendDomain = "http://localhost:8080/api/v1"
    const commentNickNameRef = useRef(null);
    const commentRef = useRef(null);

    useEffect(() => {
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
                <CommentForm />
                <Comment articleId={id} />
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
                            <td className='col-10'><b>{article.memberId}</b></td>
                        </tr>
                        <tr className='row pd-0 mx-0'>
                            <td className='col-2'><small>최초작성</small> </td>
                            <td className='col-10'><small>{article.createdAt}</small></td>
                        </tr>
                        <tr className='row pd-0 mx-0'>
                            <td className='col-2'><small>최종수정</small> </td>
                            <td className='col-10'><small>{article.updatedAt}</small></td>
                        </tr>
                        <tr className="row pd-0 mx-0">
                            <td className="col-2">제목</td>
                            <td className="col-10">{article.title}</td>
                        </tr>
                        <tr className="row pd-0 mx-0">
                            <td>{article.content}</td>
                        </tr>
                    </tbody>
                </Table>
                <Link to={"/update/" + article.id}
                    state={{ title: article.title, content: article.content, memberId: article.memberId }}>
                    <Button variant='primary'>글 수정하기</Button>
                </Link>
                <Button variant='danger' onClick={deleteArticle}>글 삭제하기</Button>
            </Container>
        )
    }

    function deleteArticle() {
        const deleteArticleRequestUrl = `${backendDomain}/article`;
        fetch(`${deleteArticleRequestUrl}/${id}`, {
            method: "DELETE"
        }).then((response) => response.json())
            .then((result) => {
                alert('게시글 삭제 완료');
                navigate('/')
            })
    }

    function CommentForm() {
        return (
            <Container>
                <Form>
                    <Form.Group className="col-md-6">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="닉네임을 입력하세요"
                            ref={commentNickNameRef}
                        />
                    </Form.Group>
                    <Form.Group className="col-md-6">
                        <Form.Label>Password(댓글 수정/삭제 시 필요)</Form.Label>
                        <Form.Control type="password" placeholder="비밀번호를 설정해주세요" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" placeholder="내용을 입력하세요" rows={2}
                            ref={commentRef}
                        />
                    </Form.Group>
                    <Button variant='primary' onClick={insertComment}>댓글 등록</Button>
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
            username: commentNickNameRef.current.value,
            commentContent: commentRef.current.value,
        });

        fetch(insertCommentRequestUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: bodyString
        })
            .then((response) => response.json())
            .then(() => window.location.reload()
            )
    }
}