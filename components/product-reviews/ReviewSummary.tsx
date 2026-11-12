import type {CSSProperties} from "react";
import {Link} from "react-router-dom";
import type {Product} from "../../types/Product.ts";
import {formatRating} from "../../lib/productReviews/summary.ts";
import type {StarCount} from "../../lib/productReviews/summary.ts";
import StarRating from "./StarRating.tsx";

interface ReviewSummaryProps {
    product: Product
    rows: StarCount[]
    detailedCount: number
    activeStar: number | null
    searchForStar: (star: number) => string
}

export default function ReviewSummary({product, rows, detailedCount, activeStar, searchForStar}: ReviewSummaryProps) {
    const ratingText = formatRating(product.rating);

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
                        <li className={row.star === activeStar ? "barRow isActive" : "barRow"} key={row.star}>
                            <Link
                                className="barLink"
                                to={{search: searchForStar(row.star)}}
                                aria-label={`Lọc ${row.star} sao`}
                            >
                                {row.star} sao
                            </Link>
                            <span className="barTrack">
                                <span className="barFill" style={{"--barWidth": `${row.percent}%`} as CSSProperties}></span>
                            </span>
                            <span className="barCount">{row.count}</span>
                        </li>
                    ))}
                </ul>
                <p className="scoreNote barNote">Biểu đồ tính trên {detailedCount} nhận xét chi tiết đang hiển thị.</p>
            </div>
        </div>
    );
}
