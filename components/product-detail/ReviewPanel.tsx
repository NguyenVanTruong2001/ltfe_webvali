import {Link} from "react-router-dom";
import type {Product} from "../../types/Product.ts";
import {useProductReviews} from "../../hooks/useProductReviews.ts";
import {formatRating} from "../../lib/productReviews/summary.ts";
import ReviewItem from "../product-reviews/ReviewItem.tsx";
import StarRating from "../product-reviews/StarRating.tsx";

export default function ReviewPanel({product}: {product: Product}) {
    const {reviews, rating, count} = useProductReviews(product);
    const ratingText = formatRating(rating);

    return (
        <div className="tabPanel panelReview isActive" id="danhGia">
            <div className="reviewSummary">
                <div className="scoreBox">
                    <p className="score">{ratingText}</p>
                    <StarRating rating={rating} label={`Đánh giá ${ratingText} trên 5 sao`} />
                    <p className="scoreNote">Dựa trên {count} đánh giá</p>
                </div>
            </div>
            {reviews.length > 0 ? (
                <ul className="reviewList">
                    {reviews.map((review) => (
                        <ReviewItem review={review} productId={product.id} key={review.id} />
                    ))}
                </ul>
            ) : (
                <p className="scoreNote">Chưa có nhận xét chi tiết cho sản phẩm này.</p>
            )}
            <div className="reviewMore">
                <Link to={`/products/${product.id}/reviews`} className="btn btnDark">
                    Xem tất cả đánh giá
                </Link>
                <Link to={{pathname: `/products/${product.id}/reviews`, hash: "#viet-danh-gia"}} className="btn btnGhost">
                    Viết đánh giá
                </Link>
            </div>
        </div>
    );
}
