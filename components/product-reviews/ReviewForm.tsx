import {useState} from "react";
import type {FormEvent} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {addReview} from "../../store/reviewsSlice.ts";
import {
    COMMENT_MAX,
    NAME_MAX,
    newReviewId,
    todayIso,
    validateReview,
} from "../../lib/productReviews/validation.ts";
import type {ReviewErrors} from "../../lib/productReviews/validation.ts";

interface ReviewFormProps {
    productId: number
    onSubmitted: () => void
}

const RATING_LABELS = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

export default function ReviewForm({productId, onSubmitted}: ReviewFormProps) {
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState(0);
    const [userName, setUserName] = useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState<ReviewErrors>({});
    const [notice, setNotice] = useState<string | null>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const found = validateReview({rating, userName, comment});
        setErrors(found);
        if (Object.keys(found).length > 0) {
            setNotice(null);
            return;
        }

        dispatch(addReview({
            id: newReviewId(),
            productId,
            userName: userName.trim(),
            rating,
            comment: comment.trim(),
            date: todayIso(),
        }));
        setRating(0);
        setUserName("");
        setComment("");
        setNotice("Cảm ơn bạn! Đánh giá đã được lưu trên trình duyệt này.");
        onSubmitted();
    };

    return (
        <form className="reviewForm" onSubmit={handleSubmit} noValidate>
            <fieldset className="ratingField" aria-describedby={errors.rating ? "ratingError" : undefined}>
                <legend>Bạn chấm sản phẩm này mấy sao?</legend>
                <div className="ratingPick">
                    {RATING_LABELS.map((label, index) => {
                        const value = index + 1;
                        return (
                            <label className={value <= rating ? "ratingStar isActive" : "ratingStar"} key={value}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={value}
                                    checked={rating === value}
                                    onChange={() => setRating(value)}
                                />
                                <span aria-hidden="true">★</span>
                                <span className="visuallyHidden">{value} sao, {label}</span>
                            </label>
                        );
                    })}
                    {rating > 0 && <span className="ratingText">{RATING_LABELS[rating - 1]}</span>}
                </div>
                {errors.rating && <p className="fieldError" id="ratingError" role="alert">{errors.rating}</p>}
            </fieldset>
            <div className="fieldRow">
                <label htmlFor="reviewName">Tên hiển thị</label>
                <input
                    id="reviewName"
                    type="text"
                    value={userName}
                    maxLength={NAME_MAX}
                    autoComplete="name"
                    aria-invalid={errors.userName ? "true" : undefined}
                    aria-describedby={errors.userName ? "nameError" : undefined}
                    onChange={(event) => setUserName(event.target.value)}
                />
                {errors.userName && <p className="fieldError" id="nameError" role="alert">{errors.userName}</p>}
            </div>
            <div className="fieldRow">
                <label htmlFor="reviewComment">Nhận xét</label>
                <textarea
                    id="reviewComment"
                    rows={5}
                    value={comment}
                    maxLength={COMMENT_MAX}
                    aria-invalid={errors.comment ? "true" : undefined}
                    aria-describedby={errors.comment ? "commentError" : undefined}
                    onChange={(event) => setComment(event.target.value)}
                />
                <p className="fieldHint">{comment.length}/{COMMENT_MAX}</p>
                {errors.comment && <p className="fieldError" id="commentError" role="alert">{errors.comment}</p>}
            </div>
            <div className="formActions">
                <button type="submit" className="btn btnDark">Gửi đánh giá</button>
                {notice && <p className="formNotice" role="status">{notice}</p>}
            </div>
        </form>
    );
}
