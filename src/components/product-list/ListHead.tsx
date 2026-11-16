import {SORT_OPTIONS} from "../../lib/productList/filterConfig.ts";
import type {SortKey} from "../../lib/productList/filterConfig.ts";

interface ListHeadProps {
    total: number
    from: number
    to: number
    sort: SortKey
    onSortChange: (sort: SortKey) => void
}

export default function ListHead({total, from, to, sort, onSortChange}: ListHeadProps) {
    return (
        <div className="listHead">
            <div>
                <h1 className="listTitle">Vali</h1>
                <p className="listCount" aria-live="polite">{total === 0 ? "Không có sản phẩm nào" : `Hiển thị ${from} đến ${to} trên ${total} sản phẩm`}</p>
            </div>
            <div className="listTools">
                <label htmlFor="filterCheck" className="btn btnGhost filterToggle">
                    <svg className="icon" aria-hidden="true">
                        <use href="#iFilter" />
                    </svg>
                    Bộ lọc
                </label>
                <div className="sortBox">
                    <label className="sortLabel" htmlFor="sortSelect">Sắp xếp</label>
                    <select
                        id="sortSelect"
                        className="sortSelect"
                        value={sort}
                        onChange={(event) => onSortChange(event.target.value as SortKey)}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
