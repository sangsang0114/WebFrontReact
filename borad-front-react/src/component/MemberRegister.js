import GNB from "./GlobalNavigationBar";
import { useRef, useState } from "react";
import { Container, Alert, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function MyBoard() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [alertVariant, setAlertVariant] = useState("");

    const [isAvailableId, setIsAvailableId] = useState(false);
    const [isAvailablePassword, setIsAvaialblePassword] = useState(false);


    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [passwordAlertContent, setPasswordAlertContent] = useState("");
    const [passwordAlertVariant, setPasswordAlertVariant] = useState("");


    const [showPasswordConfirmAlert, setshowPasswordConfrimAlert] = useState(false);
    const [passwordConfirmAlertContent, setPasswordConfirmAlertContent] = useState("");
    const [passwordConfirmAlertVariant, setPasswordConfirmAlertVariant] = useState("");

    const memberIdRef = useRef(null);
    const membernameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const backEndDomain = "http://localhost:8080/api/v1";
    const navigate = useNavigate();

    function requestRegister(event) {
        event.preventDefault();

        const requestUrl = `${backEndDomain}/member/`;
        const bodyString = JSON.stringify({
            memberId: memberIdRef.current.value,
            memberName: membernameRef.current.value,
            memberRole: "ROLE_USER",
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
            .then(response => response.text())
            .then(() => {
                alert('회원가입이 완료되었습니다');
                navigate('/');
            })
    }

    function onIdFormChange() {
        setIsAvailableId(false);
    }

    function onPasswordConfirmFormChange() {
        setIsAvaialblePassword(false);
        const input = passwordRef.current.value;
        const confirm = passwordConfirmRef.current.value;
        if (confirm === input) {
            setPasswordConfirmAlertContent("OK");
            setPasswordConfirmAlertVariant("success");
            setshowPasswordConfrimAlert(true);
            setIsAvaialblePassword(true);
        } else {
            setPasswordConfirmAlertContent("비밀번호가 일치하지 않습니다");
            setPasswordConfirmAlertVariant("warning");
            setshowPasswordConfrimAlert(true);
            setIsAvaialblePassword(false);
        }
    }
    function onPasswordFormChange() {
        setIsAvaialblePassword(false);
        const input = passwordRef.current.value;
        const reg = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/;
        if (input.match(reg) == null) {
            setPasswordAlertContent("영문, 숫자, 특수문자 중 2가지 이상 조합하여 10~20자리로 작성해주세요");
            setPasswordAlertVariant("warning");
            setShowPasswordAlert(true);
            setIsAvaialblePassword(false);
        } else {
            setPasswordAlertContent("사용 가능한 비밀번호입니다");
            setPasswordAlertVariant("success");
            setShowPasswordAlert(true);
        }
    }

    function checkDuplicate(event) {
        event.preventDefault();
        const memberId = memberIdRef.current.value;

        const requestUrl = `${backEndDomain}/member/${memberId}`;
        fetch(requestUrl)
            .then(response => response.json())
            .then(isDuplicate => {
                setShowAlert(true);
                if (isDuplicate === true) {
                    setAlertContent("이미 존재하는 ID입니다")
                    setAlertVariant("warning");
                    setIsAvailableId(false);
                }
                else {
                    setAlertContent("사용 가능한 ID입니다")
                    setAlertVariant("success");
                    setIsAvailableId(true);
                }
            })
    }
    return (
        <>
            <GNB />
            <Container>
                <h1>회원가입을 환영합니다</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="ID를 입력하세요" onChange={onIdFormChange}
                            ref={memberIdRef}>
                        </Form.Control>
                        {showAlert && <Alert variant={alertVariant}>{alertContent}</Alert>}
                        <Button onClick={checkDuplicate}>ID 중복확인</Button>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>nickname</Form.Label>
                        <Form.Control type="text" placeholder="닉네임을 입력하세요" ref={membernameRef}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" placeholder="비밀번호 설정"
                            ref={passwordRef} onChange={onPasswordFormChange}></Form.Control>

                    </Form.Group>
                    {showPasswordAlert && <Alert variant={passwordAlertVariant}>{passwordAlertContent}</Alert>}
                    <Form.Group>
                        <Form.Label>password confirm</Form.Label>
                        <Form.Control type="password" placeholder="비밀번호 확인"
                            ref={passwordConfirmRef}
                            onChange={onPasswordConfirmFormChange}></Form.Control>
                    </Form.Group>
                    {showPasswordConfirmAlert && <Alert variant={passwordConfirmAlertVariant}>{passwordConfirmAlertContent}</Alert>}
                </Form>
                <Button variant="primary" disabled={!(isAvailablePassword && isAvailableId)} onClick={requestRegister}>회원가입</Button>
                <Button variant="warning">취소</Button>
            </Container>
        </>
    )
}