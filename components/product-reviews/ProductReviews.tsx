import {Link} from "react-router-dom";
import type {Product} from "../../types/Product.ts";
import ReviewsBreadcrumb from "./ReviewsBreadcrumb.tsx";
import ReviewSummary from "./ReviewSummary.tsx";
import ReviewList from "./ReviewList.tsx";

export default function ProductReviews({product}: {product: Product}) {
    const reviews = product.reviews ?? [];

    return (
        <>
            <ReviewsBreadcrumb product={product} />
            <section className="reviewsPage" aria-labelledby="reviewsTitle">
                <header className="reviewsHead">
                    <div>
                        <h1 id="reviewsTitle" className="reviewsTitle">Đánh giá sản phẩm</h1>
                        <p className="reviewsProduct">{product.name}</p>
                    </div>
                    <Link to={`/products/${product.id}/${product.slug}`} className="btn btnDark">
                        Quay lại sản phẩm
                    </Link>
                </header>
                <ReviewSummary product={product} reviews={reviews} />
                <ReviewList reviews={reviews} />
            </section>
        </>
    );
}
