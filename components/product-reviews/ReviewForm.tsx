import {useId, useState} from "react";
import type {FormEvent} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {addReview, updateReview} from "../../store/reviewsSlice.ts";
import type {ReviewEdit} from "../../store/reviewsSlice.ts";
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
    initial?: ReviewEdit
    onSubmitted: () => void
    onCancel?: () => void
}

const RATING_LABELS = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

export default function ReviewForm({productId, initial, onSubmitted, onCancel}: ReviewFormProps) {
    const dispatch = useAppDispatch();
    const uid = useId();
    const [rating, setRating] = useState(initial?.rating ?? 0);
    const [userName, setUserName] = useState(initial?.userName ?? "");
    const [comment, setComment] = useState(initial?.comment ?? "");
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

        const draft = {rating, userName: userName.trim(), comment: comment.trim()};
        if (initial) {
            dispatch(updateReview({id: initial.id, ...draft}));
        } else {
            dispatch(addReview({id: newReviewId(), productId, date: todayIso(), ...draft}));
            setRating(0);
            setUserName("");
            setComment("");
            setNotice("Cảm ơn bạn! Đánh giá đã được lưu trên trình duyệt này.");
        }
        onSubmitted();
    };

    return (
        <form className="reviewForm" onSubmit={handleSubmit} noValidate>
            <fieldset className="ratingField" aria-describedby={errors.rating ? `${uid}-rating` : undefined}>
                <legend>Bạn chấm sản phẩm này mấy sao?</legend>
                <div className="ratingPick">
                    {RATING_LABELS.map((label, index) => {
                        const value = index + 1;
                        return (
                            <label className={value <= rating ? "ratingStar isActive" : "ratingStar"} key={value}>
                                <input
                                    type="radio"
                                    name={`${uid}-rating`}
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
                {errors.rating && <p className="fieldError" id={`${uid}-rating`} role="alert">{errors.rating}</p>}
            </fieldset>
            <div className="fieldRow">
                <label htmlFor={`${uid}-name`}>Tên hiển thị</label>
                <input
                    id={`${uid}-name`}
                    type="text"
                    value={userName}
                    maxLength={NAME_MAX}
                    autoComplete="name"
                    aria-invalid={errors.userName ? "true" : undefined}
                    aria-describedby={errors.userName ? `${uid}-nameError` : undefined}
                    onChange={(event) => setUserName(event.target.value)}
                />
                {errors.userName && <p className="fieldError" id={`${uid}-nameError`} role="alert">{errors.userName}</p>}
            </div>
            <div className="fieldRow">
                <label htmlFor={`${uid}-comment`}>Nhận xét</label>
                <textarea
                    id={`${uid}-comment`}
                    rows={5}
                    value={comment}
                    maxLength={COMMENT_MAX}
                    aria-invalid={errors.comment ? "true" : undefined}
                    aria-describedby={errors.comment ? `${uid}-commentError` : undefined}
                    onChange={(event) => setComment(event.target.value)}
                />
                <p className="fieldHint">{comment.length}/{COMMENT_MAX}</p>
                {errors.comment && <p className="fieldError" id={`${uid}-commentError`} role="alert">{errors.comment}</p>}
            </div>
            <div className="formActions">
                <button type="submit" className="btn btnDark">{initial ? "Lưu thay đổi" : "Gửi đánh giá"}</button>
                {onCancel && <button type="button" className="btn btnGhost" onClick={onCancel}>Hủy</button>}
                {notice && <p className="formNotice" role="status">{notice}</p>}
            </div>
        </form>
    );
}
