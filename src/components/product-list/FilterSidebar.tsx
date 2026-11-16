import type {CSSProperties} from "react";
import type {Product} from "../../types/Product.ts";
import {FILTER_GROUPS} from "../../lib/productList/filterConfig.ts";
import type {FilterGroup} from "../../lib/productList/filterConfig.ts";
import {countOption, isChecked} from "../../lib/productList/filtering.ts";
import type {FilterState} from "../../lib/productList/filtering.ts";

interface FilterSidebarProps {
    products: Product[]
    filters: FilterState
    onToggle: (groupKey: string, value: string) => void
    onClear: () => void
}

interface GroupProps {
    group: FilterGroup
    products: Product[]
    filters: FilterState
    onToggle: (groupKey: string, value: string) => void
}

function ColorGroup({group, filters, onToggle}: GroupProps) {
    return (
        <div className="colorList">
            {group.options.map((option) => (
                <label className="colorOption" key={option.value}>
                    <input
                        type="checkbox"
                        name={group.key}
                        value={option.value}
                        className="visuallyHidden"
                        checked={isChecked(filters, group, option)}
                        onChange={() => onToggle(group.key, option.value)}
                    />
                    <span className="colorDot" style={{"--bodyColor": option.swatch} as CSSProperties}></span>
                    <span className="visuallyHidden">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

function CheckGroup({group, products, filters, onToggle}: GroupProps) {
    return (
        <div className="filterBody">
            {group.options.map((option) => {
                const count = countOption(products, filters, group, option);
                const checked = isChecked(filters, group, option);

                return (
                    <label className="checkRow" key={option.value}>
                        <input
                            type={group.input === "radio" ? "radio" : "checkbox"}
                            name={group.key}
                            value={option.value}
                            checked={checked}
                            // Hết hàng thì khóa lại, trừ khi đang chọn (để còn bỏ chọn được)
                            disabled={count === 0 && !checked}
                            onChange={() => onToggle(group.key, option.value)}
                        />
                        <span className="checkText">{option.label}</span>
                        <span className="checkCount">{count}</span>
                    </label>
                );
            })}
        </div>
    );
}

export default function FilterSidebar({products, filters, onToggle, onClear}: FilterSidebarProps) {
    return (
        <>
            <input type="checkbox" id="filterCheck" className="filterCheck" aria-label="Mở bộ lọc" />
            <aside className="sidebar" aria-label="Bộ lọc sản phẩm">
                <div className="sidebarHead">
                    <h2 className="sidebarTitle">Bộ lọc</h2>
                    <button type="button" className="textLink linkButton" onClick={onClear}>Xóa tất cả</button>
                </div>
                {FILTER_GROUPS.map((group) => (
                    <fieldset className="filterGroup" key={group.key}>
                        <legend className="filterTitle">{group.title}</legend>
                        {group.input === "color"
                            ? <ColorGroup group={group} products={products} filters={filters} onToggle={onToggle} />
                            : <CheckGroup group={group} products={products} filters={filters} onToggle={onToggle} />}
                    </fieldset>
                ))}
            </aside>
        </>
    );
}
