import {Link} from "react-router-dom";

export default function CartBreadcrumb() {
    return (
        <nav className="breadcrumb" aria-label="Đường dẫn">
            <ol>
                <li>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li aria-current="page">Giỏ hàng</li>
            </ol>
        </nav>
    );
}
