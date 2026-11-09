import {SORT_OPTIONS} from "../../lib/productList/filterConfig.ts";

interface ListHeadProps {
    total: number
}

export default function ListHead({total}: ListHeadProps) {
    return (
        <div className="listHead">
            <div>
                <h1 className="listTitle">Vali</h1>
                <p className="listCount" aria-live="polite">Hiển thị {total} sản phẩm</p>
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
                    <select id="sortSelect" className="sortSelect" defaultValue={SORT_OPTIONS[0].value}>
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
