import {Link} from "react-router-dom";

export default function ProductBreadcrumb({name}: {name: string}) {
    return (
        <nav className="breadcrumb" aria-label="Đường dẫn">
            <ol>
                <li>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li>
                    <Link to="/products">Vali</Link>
                </li>
                <li aria-current="page">{name}</li>
            </ol>
        </nav>
    );
}
