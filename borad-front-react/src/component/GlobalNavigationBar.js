import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
export default function GlobalNavigationBar() {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        setUserId(cookies.id);
        setUserName(cookies.name);
        setUserRole('ROLE_ADMIN');
    })
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Yoons</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">게시판</Nav.Link>
                    <Nav.Link href={userId ? "/mypage" : "/register"}>{userId ? `${userName}(${userId})님 환영합니다` : '회원가입'}</Nav.Link>
                    <Nav.Link href={userId ? "/logout" : "/login"}> {userId ? '로그아웃' : '로그인'}</Nav.Link>
                    <ManagementPageLink />
                </Nav>
            </Container>
        </Navbar>
    )

    function ManagementPageLink() {
        if (userRole === 'ROLE_ADMIN') {
            return <Nav.Link href="/manage">관리자 페이지</Nav.Link>
        } else {
            return null;
        }
    }
}