import type {DisplayReview} from "../../lib/productReviews/merge.ts";
import ReviewItem from "./ReviewItem.tsx";

interface ReviewListProps {
    reviews: DisplayReview[]
    productId: number
    emptyText: string
    manageable?: boolean
}

export default function ReviewList({reviews, productId, emptyText, manageable = false}: ReviewListProps) {
    if (reviews.length === 0) {
        return <p className="reviewEmpty" role="status">{emptyText}</p>;
    }

    return (
        <ul className="reviewList">
            {reviews.map((review) => (
                <ReviewItem review={review} productId={productId} manageable={manageable} key={review.id} />
            ))}
        </ul>
    );
}
