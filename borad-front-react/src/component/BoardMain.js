import { Link } from "react-router-dom";
import GNB from "./GlobalNavigationBar";
import { useEffect, useState } from "react";
import { Container, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyBoard() {
    const [artcileList, setArticleList] = useState([]);
    useEffect(() => {
        const backEndDomain = "http://localhost:3030";
        const requestUrl = `${backEndDomain}/boards/`;
        fetch(requestUrl)
            .then(response => response.json())
            .then(json => { setArticleList(json); })
    }, []);

    return (
        <>
            <GNB />
            <Container>
                <h1>게시판에 오신 것을 환영합니다.</h1>
                <Link to={"/insert"}><Button variant="primary">게시글 작성</Button></Link>
                <ArticleListTable />
            </Container>
        </>
    )

    function ArticleListTable() {
        return <>
            <Table bordered>
                <tbody>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록일</th>
                        <th>수정일</th>
                    </tr>
                    {artcileList.map(article => (
                        <tr>
                            <td>{article.id}</td>
                            <td><Link to={"/" + article.id}>{article.title}</Link></td>
                            <td>{article.mem_id}</td>
                            <td>{article.count}</td>
                            <td>{article.reg_dtm}</td>
                            <td>{article.mod_dtm}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table >
        </>
    }
}