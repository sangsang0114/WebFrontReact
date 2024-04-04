import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
export default function GlobalNavigationBar() {
    const [cookies, ,] = useCookies(['id']);
    const [memberId, setMemberId] = useState(null);
    useEffect(() => {
        setMemberId(cookies.memberId);
    })
    return (
        <Navbar bg={memberId ? 'primary' : 'dark'} variant='dark' expand="md">
            <Container>
                <Navbar.Brand href="/">Yoons</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">게시판</Nav.Link>
                        <Nav.Link href={memberId ? "/mypage" : "/register"}>{memberId ? '마이페이지' : '회원가입'}</Nav.Link>
                        <Nav.Link href={memberId ? "/logout" : "/login"}>{memberId ? '로그아웃' : '로그인'}</Nav.Link>
                    </Nav>
                    <Nav>
                        {memberId && (
                            <Nav.Link href="/manage">게시판 관리</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}