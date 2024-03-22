import GNB from "./GlobalNavigationBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyBoardInsert() {
    const { id } = useParams();
    const [oldArticle, setOldArticle] = useState({});
    const navigate = useNavigate();
    const backEndDomain = "http://localhost:3030";
    useEffect(() => {
        const loadArticleRequestUrl = `${backEndDomain}/boards/${id}`
        fetch(loadArticleRequestUrl)
            .then(response => response.json())
            .then(json => {
                setOldArticle(json);
            });
    }, []);

    const onFormCahnge = (e) => {
        let newArticle = oldArticle;
        newArticle[e.target.name] = e.target.value;
        setOldArticle(newArticle);
    }

    function updateArticle(event) {
        event.preventDefault();
        const requestUrl = `${backEndDomain}/boards/${id}`;
        let now = new Date().toString();
        console.log(oldArticle.title);
        let bodyString = JSON.stringify({
            title: oldArticle.title,
            text: oldArticle.text,
            mod_dtm: now,
        });
        console.log(bodyString);
        fetch(requestUrl,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: bodyString
            }
        )
            .then((response) => response.json())
            .then((result) => {
                alert('게시글 수정 완료');
                navigate('/');
            });
    }
    return (
        <>
            <GNB />
            <Container>
                <Form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly={true}
                            value={oldArticle.mem_id || "unknown"}
                        />
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" className="form-control"
                            placeholder="제목을 입력하세요" defaultValue={oldArticle.title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            name="text"
                            className="form-control"
                            placeholder="내용을 입력하세요"
                            defaultValue={oldArticle.text || ""}
                            onChange={onFormCahnge}
                            rows={10}
                        />
                    </div>
                    <br />
                    <br />
                    <Button variant="primary" onClick={updateArticle}>게시글 수정</Button>
                    <Button type="reset" variant="warning">모두 지우기</Button>
                </Form>
            </Container>
        </>
    )
}