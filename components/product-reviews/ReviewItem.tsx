import type {ProductReview} from "../../types/Product.ts";
import {formatReviewDate, initials} from "../../lib/productDetail/reviews.ts";
import StarRating from "./StarRating.tsx";

export default function ReviewItem({review}: {review: ProductReview}) {
    return (
        <li className="reviewItem">
            <span className="avatar" aria-hidden="true">{initials(review.userName)}</span>
            <div className="reviewBody">
                <p className="reviewHead">
                    <strong>{review.userName}</strong>
                    <span className="reviewTag">Đã mua hàng</span>
                </p>
                <StarRating rating={review.rating} label={`Đánh giá ${review.rating} trên 5 sao`} />
                <time className="reviewDate" dateTime={review.date}>{formatReviewDate(review.date)}</time>
                <p className="reviewText">{review.comment}</p>
            </div>
        </li>
    );
}
