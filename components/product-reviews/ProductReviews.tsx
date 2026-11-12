import {useMemo} from "react";
import {Link} from "react-router-dom";
import type {Product} from "../../types/Product.ts";
import {countByStar} from "../../lib/productReviews/summary.ts";
import {useReviewFilters} from "../../hooks/useReviewFilters.ts";
import Pagination from "../product-list/Pagination.tsx";
import ReviewsBreadcrumb from "./ReviewsBreadcrumb.tsx";
import ReviewSummary from "./ReviewSummary.tsx";
import ReviewList from "./ReviewList.tsx";
import ReviewToolbar from "./ReviewToolbar.tsx";

export default function ProductReviews({product}: {product: Product}) {
    const reviews = useMemo(() => product.reviews ?? [], [product.reviews]);
    const counts = useMemo(() => countByStar(reviews), [reviews]);
    const filters = useReviewFilters(reviews);
    const emptyText = reviews.length === 0
        ? "Sản phẩm này chưa có nhận xét chi tiết."
        : "Không có nhận xét nào khớp với bộ lọc.";

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
                <ReviewSummary
                    product={product}
                    rows={counts}
                    detailedCount={reviews.length}
                    activeStar={filters.star}
                    searchForStar={filters.searchForStar}
                />
                <ReviewToolbar
                    counts={counts}
                    totalAll={reviews.length}
                    star={filters.star}
                    sort={filters.sort}
                    onStarChange={filters.setStar}
                    onSortChange={filters.setSort}
                />
                <ReviewList reviews={filters.items} emptyText={emptyText} />
                <Pagination page={filters.page} totalPages={filters.totalPages} searchFor={filters.searchForPage} />
            </section>
        </>
    );
}
