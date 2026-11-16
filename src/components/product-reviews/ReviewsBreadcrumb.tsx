import {Link} from "react-router-dom";
import type {Product} from "../../types/Product.ts";

export default function ReviewsBreadcrumb({product}: {product: Product}) {
    return (
        <nav className="breadcrumb" aria-label="Đường dẫn">
            <ol>
                <li>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li>
                    <Link to="/products">Vali</Link>
                </li>
                <li>
                    <Link to={`/products/${product.id}/${product.slug}`}>{product.name}</Link>
                </li>
                <li aria-current="page">Đánh giá</li>
            </ol>
        </nav>
    );
}
