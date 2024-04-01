import { Link } from "react-router-dom";
import GNB from "./GlobalNavigationBar";
import { useEffect, useState } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';

export default function MemberPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        const backEndDomain = "http://localhost:8080/api/v1";
        const requestUrl = `${backEndDomain}/member/info/${cookies.id}`;
        fetch(requestUrl)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setUserId(json.id);
                setUserName(json.username);
            })

    }, []);
    return (
        <>
            <GNB />
            <Container>
                <h1>회원 정보 변경</h1>
                <hr />
                <Form>
                    <h3>id</h3>
                    <p>{userId}</p>

                    <h3>name</h3>
                    <p>{userName}</p>
                </Form>
                <Button variant="primary">닉네임 변경</Button>
            </Container>
        </>
    )
}