import GNB from "./GlobalNavigationBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyBoardInsert() {
    const { id } = useParams();
    const [oldArticle, setOldArticle] = useState({});
    const navigate = useNavigate();
    const backEndDomain = "http://localhost:8080/api/v1/article";
    const location = useLocation();

    useEffect(() => {
        setOldArticle({ ...location.state });
    }, []);

    const onFormCahnge = (e) => {
        const newArticle = oldArticle;
        newArticle[e.target.name] = e.target.value;
        setOldArticle(newArticle);
    }

    function updateArticle(event) {
        event.preventDefault();
        const requestUrl = `${backEndDomain}/${id}`;
        const bodyString = JSON.stringify({
            title: oldArticle.title,
            content: oldArticle.content,
        });
        fetch(requestUrl,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: bodyString
            }
        )
            .then((response) => response.json())
            .then(() => {
                alert('게시글 수정 완료');
                navigate(`/${id}`);
            });
    }
    return (
        <>
            <GNB />
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" disabled
                            value={oldArticle.memberId || "unknown"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="제목을 입력하세요" name="title"
                            onChange={onFormCahnge}
                            defaultValue={oldArticle.title}
                        />
                    </Form.Group>
                    <Form.Group className='mb-4'>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" name="content" placeholder="내용을 입력하세요" rows={10}
                            onChange={onFormCahnge}
                            defaultValue={oldArticle.content || ""}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={updateArticle}>게시글 수정</Button>
                    <Button type="reset" variant="warning">모두 지우기</Button>
                </Form>
            </Container>
        </>
    )
}