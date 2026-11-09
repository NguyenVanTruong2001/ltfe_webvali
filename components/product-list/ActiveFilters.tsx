import type {ActiveFilter} from "../../lib/productList/filtering.ts";

interface ActiveFiltersProps {
    items: ActiveFilter[]
    onRemove: (groupKey: string, value: string) => void
    onClear: () => void
}

export default function ActiveFilters({items, onRemove, onClear}: ActiveFiltersProps) {
    if (items.length === 0) return null;

    return (
        <div className="activeFilters">
            <span className="activeLabel">Đang lọc:</span>
            {items.map((item) => (
                <button
                    type="button"
                    className="activeChip"
                    key={`${item.groupKey}:${item.value}`}
                    aria-label={`Bỏ lọc ${item.label}`}
                    onClick={() => onRemove(item.groupKey, item.value)}
                >
                    {item.label}
                    <svg className="icon" aria-hidden="true">
                        <use href="#iClose" />
                    </svg>
                </button>
            ))}
            <button type="button" className="textLink linkButton" onClick={onClear}>Xóa tất cả</button>
        </div>
    );
}
