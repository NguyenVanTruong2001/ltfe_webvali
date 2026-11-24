import {STATUS_FILTERS} from "../../lib/orders/history.ts";
import type {StatusFilter} from "../../lib/orders/history.ts";

interface OrderTabsProps {
    active: StatusFilter;
    counts: Record<StatusFilter, number>;
    onChange: (filter: StatusFilter) => void;
}

export default function OrderTabs({active, counts, onChange}: OrderTabsProps) {
    return (
        <div className="historyTabs" role="group" aria-label="Lọc theo trạng thái">
            {STATUS_FILTERS.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    className={`historyTab${active === filter.id ? " isActive" : ""}`}
                    aria-pressed={active === filter.id}
                    onClick={() => onChange(filter.id)}
                >
                    {filter.label}
                    <span className="historyTabCount">({counts[filter.id]})</span>
                </button>
            ))}
        </div>
    );
}
