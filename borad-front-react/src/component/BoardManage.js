import { Link, useSearchParams } from "react-router-dom";
import GNB from "./GlobalNavigationBar";
import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyBoard() {
    const [artcileList, setArticleList] = useState([]);
    const [limitCount, setLimitCount] = useState(10);
    const [searchParams, _] = useSearchParams();
    const size = searchParams.get("size") || 10;
    const page = searchParams.get("page") || 0;
    const [pageNumbers, setPageNumbers] = useState([]);
    const [pagingInfo, setPagingInfo] = useState({});

    useEffect(() => {
        const backEndDomain = "http://localhost:8080/api/v1";
        const requestUrl = `${backEndDomain}/article/deleted/?size=${size}&page=${page}`;
        fetch(requestUrl)
            .then(response => response.json())
            .then(json => {
                setArticleList(json.articles)
                setPagingInfo({
                    totalPages: json.totalPages,
                    currentPage: json.currentPage,
                    hasPrevious: json.hasPrevious,
                    lastPage: json.lastPage,
                    firstPage: json.firstPage
                });
            }
            );
    }, [size, page]);

    useEffect(() => {
        const pages = [];
        const lowerBound = Math.max(0, pagingInfo.currentPage - 5);
        const upperBound = Math.min(lowerBound == 0 ? 10 : pagingInfo.currentPage + 5, pagingInfo.totalPages);
        for (let i = lowerBound; i < upperBound; i++)
            pages.push(i);
        setPageNumbers(pages);
    }, [pagingInfo]);

    return (
        <>
            <GNB />
            <Container>
                <h1>관리자 전용 메뉴입니다.</h1>
                <PaginationOption />
                <hr />
                <h2>삭제된 게시글</h2>
                <ArticleListTable />
                <PaginationItem />
            </Container >
        </>
    )

    function onChangeOption(e) {
        setLimitCount(e.target.value);
    }

    function PaginationOption() {
        return (
            <Form action="/">
                <Form.Select value={limitCount} name="size" onChange={onChangeOption}>
                    <option value={5}>5개씩 보기 </option>
                    <option value={10}>10개씩 보기 </option>
                    <option value={15}>15개씩 보기 </option>
                    <option value={20}>20개씩 보기 </option>
                    <option value={25}>25개씩 보기 </option>
                </Form.Select>
                <Button variant="primary" type="submit">적용</Button>
            </Form>
        )
    }

    function PaginationItem() {
        return (
            <Pagination>
                <Pagination.First disabled={pagingInfo.firstPage} href={`/?size=${size}&page=0`}>처음</Pagination.First>
                <Pagination.Prev disabled={pagingInfo.currentPage < 10} href={`/?size=${size}&page=${pagingInfo.currentPage - 10}`} />
                {pageNumbers.map(i => (
                    <Pagination.Item
                        active={i === pagingInfo.currentPage}
                        href={`/?size=${size}&page=${i}`}
                    >
                        {i}
                    </Pagination.Item>
                ))}
                <Pagination.Next disabled={pagingInfo.currentPage + 10 > pagingInfo.totalPages - 1} href={`/?size=${size}&page=${pagingInfo.currentPage + 10}`} />
                <Pagination.Last disabled={pagingInfo.lastPage} href={`/?size=${size}&page=${pagingInfo.totalPages - 1}`}>마지막</Pagination.Last>
            </Pagination>
        )
    }

    function ArticleListTable() {
        return <>
            <Table bordered className="mt-4">
                <tbody>
                    <tr>
                        <th className="d-sm-none d-lg-block">번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th className="d-sm-none d-lg-block">삭제일</th>
                    </tr>
                    {artcileList.map(article => (
                        <tr>
                            <td className="d-sm-none d-lg-block">{article.id}</td>
                            <td><Link to={"/" + article.id}>{article.title}</Link></td>
                            <td>{article.memberId}</td>
                            <td className="d-sm-none d-lg-block">{article.updatedAt}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table >
        </>
    }
}