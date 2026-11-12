import {Link} from "react-router-dom";
import type {Product} from "../../types/Product.ts";
import {formatRating} from "../../lib/productReviews/summary.ts";
import ReviewItem from "../product-reviews/ReviewItem.tsx";
import StarRating from "../product-reviews/StarRating.tsx";

export default function ReviewPanel({product}: {product: Product}) {
    const reviews = product.reviews ?? [];
    const ratingText = formatRating(product.rating);

    return (
        <div className="tabPanel panelReview isActive" id="danhGia">
            <div className="reviewSummary">
                <div className="scoreBox">
                    <p className="score">{ratingText}</p>
                    <StarRating rating={product.rating} label={`Đánh giá ${ratingText} trên 5 sao`} />
                    <p className="scoreNote">Dựa trên {product.reviewCount} đánh giá</p>
                </div>
            </div>
            {reviews.length > 0 ? (
                <ul className="reviewList">
                    {reviews.map((review) => (
                        <ReviewItem review={review} key={review.id} />
                    ))}
                </ul>
            ) : (
                <p className="scoreNote">Chưa có nhận xét chi tiết cho sản phẩm này.</p>
            )}
            <Link to={`/products/${product.id}/reviews`} className="btn btnDark reviewMore">
                Xem tất cả đánh giá
            </Link>
        </div>
    );
}
