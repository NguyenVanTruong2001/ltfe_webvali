import type {CSSProperties} from "react";
import type {Product, ProductReview} from "../../types/Product.ts";
import {countByStar, formatRating} from "../../lib/productReviews/summary.ts";
import StarRating from "./StarRating.tsx";

interface ReviewSummaryProps {
    product: Product
    reviews: ProductReview[]
}

export default function ReviewSummary({product, reviews}: ReviewSummaryProps) {
    const ratingText = formatRating(product.rating);
    const rows = countByStar(reviews);

    return (
        <div className="reviewSummary">
            <div className="scoreBox">
                <p className="score">{ratingText}</p>
                <StarRating rating={product.rating} label={`Đánh giá ${ratingText} trên 5 sao`} />
                <p className="scoreNote">Dựa trên {product.reviewCount} đánh giá</p>
            </div>
            <div>
                <ul className="barList">
                    {rows.map((row) => (
                        <li className="barRow" key={row.star}>
                            <span>{row.star} sao</span>
                            <span className="barTrack">
                                <span className="barFill" style={{"--barWidth": `${row.percent}%`} as CSSProperties}></span>
                            </span>
                            <span className="barCount">{row.count}</span>
                        </li>
                    ))}
                </ul>
                <p className="scoreNote barNote">Biểu đồ tính trên {reviews.length} nhận xét chi tiết đang hiển thị.</p>
            </div>
        </div>
    );
}
