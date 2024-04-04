import GNB from "./GlobalNavigationBar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';

export default function MyBoardInsert() {
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();
    const backEndDomain = "http://localhost:8080/api/v1/article";
    const [cookies, ,] = useCookies();

    function addArticle(event) {
        event.preventDefault();

        const bodyString = JSON.stringify({
            title: titleRef.current.value,
            content: contentRef.current.value,
        });

        const requestUrl = `${backEndDomain}/`;
        fetch(requestUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.accessToken}`
                },
                body: bodyString
            }
        )
            .then((response) => response.json())
            .then(() => {
                alert('게시글 등록이 완료되었습니다.');
                navigate('/');
            });
    }
    return (
        <>
            <GNB />
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="제목을 입력하세요."
                            ref={titleRef}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" placeholder="내용을 입력하세요." rows={10}
                            ref={contentRef}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={addArticle}>게시글 등록</Button>
                    <Button type="reset" variant="warning">모두 지우기</Button>
                </Form>
            </Container>
        </>
    )
}