import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
export default function GlobalNavigationBar() {
    return (
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Yoons</a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href='/'>
                        게시판 A<span className="sr-only"></span>
                    </a>
                </div>
            </div>
        </Nav>
    )
}