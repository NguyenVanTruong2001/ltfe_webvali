import type {CSSProperties} from "react";
import type {Product} from "../../types/Product.ts";
import {formatReviewDate, initials} from "../../lib/productDetail/reviews.ts";

function Stars({rating, label}: {rating: number, label: string}) {
    return (
        <span className="stars">
            <span className="starsTrack" role="img" aria-label={label}>
                ★★★★★
                <span className="starsFill" style={{"--rateWidth": `${rating * 20}%`} as CSSProperties} aria-hidden="true">
                    ★★★★★
                </span>
            </span>
        </span>
    );
}

export default function ReviewPanel({product}: {product: Product}) {
    const reviews = product.reviews ?? [];
    const ratingText = String(product.rating).replace(".", ",");

    return (
        <div className="tabPanel panelReview isActive" id="danhGia">
            <div className="reviewSummary">
                <div className="scoreBox">
                    <p className="score">{ratingText}</p>
                    <Stars rating={product.rating} label={`Đánh giá ${ratingText} trên 5 sao`} />
                    <p className="scoreNote">Dựa trên {product.reviewCount} đánh giá</p>
                </div>
            </div>
            {reviews.length > 0 ? (
                <ul className="reviewList">
                    {reviews.map((review) => (
                        <li className="reviewItem" key={review.id}>
                            <span className="avatar" aria-hidden="true">{initials(review.userName)}</span>
                            <div className="reviewBody">
                                <p className="reviewHead">
                                    <strong>{review.userName}</strong>
                                    <span className="reviewTag">Đã mua hàng</span>
                                </p>
                                <Stars rating={review.rating} label={`Đánh giá ${review.rating} trên 5 sao`} />
                                <time className="reviewDate" dateTime={review.date}>{formatReviewDate(review.date)}</time>
                                <p className="reviewText">{review.comment}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="scoreNote">Chưa có nhận xét chi tiết cho sản phẩm này.</p>
            )}
        </div>
    );
}
