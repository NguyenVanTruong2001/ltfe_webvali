import type {ProductReview} from "../../types/Product.ts";
import ReviewItem from "./ReviewItem.tsx";

export default function ReviewList({reviews}: {reviews: ProductReview[]}) {
    if (reviews.length === 0) {
        return <p className="scoreNote">Sản phẩm này chưa có nhận xét chi tiết.</p>;
    }

    return (
        <ul className="reviewList">
            {reviews.map((review) => (
                <ReviewItem review={review} key={review.id} />
            ))}
        </ul>
    );
}
