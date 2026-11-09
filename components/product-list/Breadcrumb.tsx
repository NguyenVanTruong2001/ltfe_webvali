import {Link} from "react-router-dom";

export default function Breadcrumb() {
    return (
        <nav className="breadcrumb" aria-label="Đường dẫn">
            <ol>
                <li>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li aria-current="page">Vali</li>
            </ol>
        </nav>
    );
}
