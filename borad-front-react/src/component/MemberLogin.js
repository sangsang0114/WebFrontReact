import GNB from "./GlobalNavigationBar";
import { useRef, useState } from "react";
import { Container, Alert, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function MemberLogin() {
    const memberIdRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const backEndDomain = "http://localhost:8080/api/v1";

    const [showAlert, setShowAlert] = useState(false);
    const [idCookie, setIdCookie] = useCookies(['id']);
    const [nameCookie, setNameCookie] = useCookies(['name']);
    function requestLogin(event) {
        event.preventDefault();

        const requestUrl = `${backEndDomain}/member/login/`;
        const bodyString = JSON.stringify({
            memberId: memberIdRef.current.value,
            memberPassword: passwordRef.current.value
        });
        console.log(bodyString);
        fetch(requestUrl,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: bodyString
            }
        )
            .then(response => response.json())
            .then((json) => {
                if (json.code === "E4") {
                    setShowAlert(true);
                } else {
                    setIdCookie('id', json.memberId);
                    setNameCookie('name', json.memberName);
                    navigate('/');
                }
            })
    }
    return (
        <>
            <GNB />
            <Container>
                <h1>로그인</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="ID를 입력하세요"
                            ref={memberIdRef}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" placeholder="비밀번호를 입력하세요" ref={passwordRef}></Form.Control>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={requestLogin}>로그인</Button>
                <Button variant="warning">취소</Button>
                {showAlert && <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading>로그인에 실패하였습니다.</Alert.Heading>
                    <hr />
                    <p>아이디 및 패스워드를 확인해주세요</p>
                </Alert>}
            </Container>
        </>
    )
}