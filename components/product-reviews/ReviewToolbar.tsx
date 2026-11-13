import {REVIEW_SORTS} from "../../lib/productReviews/urlState.ts";
import type {ReviewSortKey} from "../../lib/productReviews/urlState.ts";
import {STAR_LEVELS} from "../../lib/productReviews/summary.ts";
import type {StarCount} from "../../lib/productReviews/summary.ts";

interface ReviewToolbarProps {
    counts: StarCount[]
    totalAll: number
    star: number | null
    sort: ReviewSortKey
    onStarChange: (star: number | null) => void
    onSortChange: (sort: ReviewSortKey) => void
}

export default function ReviewToolbar({counts, totalAll, star, sort, onStarChange, onSortChange}: ReviewToolbarProps) {
    return (
        <div className="reviewToolbar">
            <div className="starFilter" role="group" aria-label="Lọc theo số sao">
                <button
                    type="button"
                    className={star === null ? "starChip isActive" : "starChip"}
                    aria-pressed={star === null}
                    onClick={() => onStarChange(null)}
                >
                    Tất cả ({totalAll})
                </button>
                {STAR_LEVELS.map((level) => {
                    const count = counts.find((row) => row.star === level)?.count ?? 0;
                    return (
                        <button
                            type="button"
                            key={level}
                            className={star === level ? "starChip isActive" : "starChip"}
                            aria-pressed={star === level}
                            onClick={() => onStarChange(level)}
                        >
                            {level} sao ({count})
                        </button>
                    );
                })}
            </div>
            <div className="sortBox">
                <label className="sortLabel" htmlFor="reviewSort">Sắp xếp</label>
                <select
                    id="reviewSort"
                    className="sortSelect"
                    value={sort}
                    onChange={(event) => onSortChange(event.target.value as ReviewSortKey)}
                >
                    {REVIEW_SORTS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
