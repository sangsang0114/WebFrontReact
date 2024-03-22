import GNB from "./GlobalNavigationBar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, FormGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyBoardInsert() {
    const nicknameRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();
    const backEndDomain = "http://localhost:3030";

    function addArticle(event) {
        event.preventDefault();

        let now = new Date().toString();
        let bodyString = JSON.stringify({
            mem_id: nicknameRef.current.value,
            title: titleRef.current.value,
            text: contentRef.current.value,
            count: 1,
            reg_dtm: now,
            mod_dtm: now,
        });

        const requestUrl = `${backEndDomain}/boards/`;
        fetch(requestUrl,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: bodyString
            }
        )
            .then((response) => response.json())
            .then((result) => {
                alert('게시글 등록이 완료되었습니다.');
                navigate('/');
            });
    }
    return (
        <>
            <GNB />
            <Container>
                <Form>
                    <Form.Group as={Row}>
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="작성자명을 입력하세요."
                            ref={nicknameRef}
                        />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="제목을 입력하세요."
                            ref={titleRef}
                        />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <label>Content</label>
                        <textarea
                            className="form-control"
                            placeholder="내용을 입력하세요."
                            rows={10}
                            ref={contentRef}
                        />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <label>password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="설정할 비밀번호를 입력하세요."
                        />
                    </Form.Group>
                    <br />
                    <br />
                    <Button variant="primary" onClick={addArticle}>게시글 등록</Button>
                    <Button type="reset" variant="warning">모두 지우기</Button>
                </Form>
            </Container>
        </>
    )
}