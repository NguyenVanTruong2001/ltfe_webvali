import type {ProductReview} from "../../types/Product.ts";
import ReviewItem from "./ReviewItem.tsx";

interface ReviewListProps {
    reviews: ProductReview[]
    emptyText: string
}

export default function ReviewList({reviews, emptyText}: ReviewListProps) {
    if (reviews.length === 0) {
        return <p className="reviewEmpty" role="status">{emptyText}</p>;
    }

    return (
        <ul className="reviewList">
            {reviews.map((review) => (
                <ReviewItem review={review} key={review.id} />
            ))}
        </ul>
    );
}
