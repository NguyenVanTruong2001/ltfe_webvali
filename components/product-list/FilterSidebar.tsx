import type {CSSProperties} from "react";
import type {Product} from "../../types/Product.ts";
import {FILTER_GROUPS} from "../../lib/productList/filterConfig.ts";
import type {FilterGroup, FilterOption} from "../../lib/productList/filterConfig.ts";

interface FilterSidebarProps {
    products: Product[]
}

function countOption(products: Product[], option: FilterOption): number {
    return option.test ? products.filter(option.test).length : products.length;
}

function ColorGroup({group}: {group: FilterGroup}) {
    return (
        <div className="colorList">
            {group.options.map((option) => (
                <label className="colorOption" key={option.value}>
                    <input type="checkbox" name={group.key} value={option.value} className="visuallyHidden" />
                    <span className="colorDot" style={{"--bodyColor": option.swatch} as CSSProperties}></span>
                    <span className="visuallyHidden">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

function CheckGroup({group, products}: {group: FilterGroup, products: Product[]}) {
    return (
        <div className="filterBody">
            {group.options.map((option) => (
                <label className="checkRow" key={option.value}>
                    <input
                        type={group.input === "radio" ? "radio" : "checkbox"}
                        name={group.key}
                        value={option.value}
                        defaultChecked={group.input === "radio" && option.value === "all"}
                    />
                    <span className="checkText">{option.label}</span>
                    <span className="checkCount">{countOption(products, option)}</span>
                </label>
            ))}
        </div>
    );
}

export default function FilterSidebar({products}: FilterSidebarProps) {
    return (
        <>
            <input type="checkbox" id="filterCheck" className="filterCheck" aria-label="Mở bộ lọc" />
            <aside className="sidebar" aria-label="Bộ lọc sản phẩm">
                <div className="sidebarHead">
                    <h2 className="sidebarTitle">Bộ lọc</h2>
                    <a href="#" className="textLink">Xóa tất cả</a>
                </div>
                {FILTER_GROUPS.map((group) => (
                    <fieldset className="filterGroup" key={group.key}>
                        <legend className="filterTitle">{group.title}</legend>
                        {group.input === "color"
                            ? <ColorGroup group={group} />
                            : <CheckGroup group={group} products={products} />}
                    </fieldset>
                ))}
            </aside>
        </>
    );
}
