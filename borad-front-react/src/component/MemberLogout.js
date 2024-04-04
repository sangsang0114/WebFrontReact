import GNB from "./GlobalNavigationBar";
import { useEffect } from "react";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from "react-cookie";
export default function MemberLogout() {
    const [, , removeCookie] = useCookies(['memberId']);
    const backEndDomain = "http://localhost:8080/api/v1";
    useEffect(() => {
        removeCookie('memberId', { path: '/' });
        removeCookie('accessToken', { path: '/' });
        removeCookie('refreshToken', { path: '/' });
        requestLogout();
    })

    function requestLogout() {
        const requestUrl = `${backEndDomain}/member/logout/`;
        fetch(requestUrl)
            .then(response => response.text())
    }
    return (
        <>
            <GNB />
            <Container>
                <h1>로그아웃 되었습니다</h1>
                <p>다음에 또 만나요</p>
            </Container>
        </>
    )
}