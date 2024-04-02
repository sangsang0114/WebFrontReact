import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
export default function GlobalNavigationBar() {
    const [cookies, ,] = useCookies(['id']);
    const [userId, setUserId] = useState(null);
    const [, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        setUserId(cookies.id);
        setUserName(cookies.name);
        setUserRole(cookies.role);
    })
    return (
        <Navbar bg={userId ? (userRole === 'ROLE_ADMIN' ? 'success' : 'primary') : 'dark'} variant="dark" expand="md">
            <Container>
                <Navbar.Brand href="/">Yoons</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">게시판</Nav.Link>
                        <Nav.Link href={userId ? "/mypage" : "/register"}>{userId ? '마이페이지' : '회원가입'}</Nav.Link>
                        <Nav.Link href={userId ? "/logout" : "/login"}>{userId ? '로그아웃' : '로그인'}</Nav.Link>
                    </Nav>
                    <Nav>
                        {userRole === 'ROLE_ADMIN' && (
                            <Nav.Link href="/manage">게시판 관리</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}