import {useState} from "react";
import type {DisplayReview} from "../../lib/productReviews/merge.ts";
import {formatReviewDate, initials} from "../../lib/productDetail/reviews.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {removeReview, selectHelpfulIds, toggleHelpful} from "../../store/reviewsSlice.ts";
import StarRating from "./StarRating.tsx";
import ReviewForm from "./ReviewForm.tsx";

type Mode = "view" | "edit" | "confirm";

interface ReviewItemProps {
    review: DisplayReview
    productId: number
    manageable?: boolean
}

export default function ReviewItem({review, productId, manageable = false}: ReviewItemProps) {
    const dispatch = useAppDispatch();
    const helpful = useAppSelector((state) => selectHelpfulIds(state).includes(review.id));
    const [mode, setMode] = useState<Mode>("view");

    if (mode === "edit") {
        return (
            <li className="reviewItem reviewEditing">
                <ReviewForm
                    productId={productId}
                    initial={{id: review.id, rating: review.rating, userName: review.userName, comment: review.comment}}
                    onSubmitted={() => setMode("view")}
                    onCancel={() => setMode("view")}
                />
            </li>
        );
    }

    return (
        <li className="reviewItem">
            <span className="avatar" aria-hidden="true">{initials(review.userName)}</span>
            <div className="reviewBody">
                <p className="reviewHead">
                    <strong>{review.userName}</strong>
                    {review.own
                        ? <span className="reviewTag reviewTagOwn">Của bạn</span>
                        : <span className="reviewTag">Đã mua hàng</span>}
                </p>
                <StarRating rating={review.rating} label={`Đánh giá ${review.rating} trên 5 sao`} />
                <time className="reviewDate" dateTime={review.date}>{formatReviewDate(review.date)}</time>
                <p className="reviewText">{review.comment}</p>
                <div className="reviewActions">
                    <button
                        type="button"
                        className={helpful ? "reviewAction isActive" : "reviewAction"}
                        aria-pressed={helpful}
                        onClick={() => dispatch(toggleHelpful(review.id))}
                    >
                        {helpful ? "Đã thấy hữu ích" : "Hữu ích"}
                    </button>
                    {manageable && review.own && mode === "view" && (
                        <>
                            <button type="button" className="reviewAction" onClick={() => setMode("edit")}>Sửa</button>
                            <button type="button" className="reviewAction" onClick={() => setMode("confirm")}>Xóa</button>
                        </>
                    )}
                    {mode === "confirm" && (
                        <span className="reviewConfirm" role="alert">
                            Xóa đánh giá này?
                            <button type="button" className="reviewAction isDanger" onClick={() => dispatch(removeReview(review.id))}>
                                Xóa
                            </button>
                            <button type="button" className="reviewAction" onClick={() => setMode("view")}>Hủy</button>
                        </span>
                    )}
                </div>
            </div>
        </li>
    );
}
