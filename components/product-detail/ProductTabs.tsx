import {useEffect} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import type {Product} from "../../types/Product.ts";
import {parseTab, TABS} from "../../lib/productDetail/content.ts";
import DescriptionPanel from "./DescriptionPanel.tsx";
import SpecPanel from "./SpecPanel.tsx";
import ReviewPanel from "./ReviewPanel.tsx";
import WarrantyPanel from "./WarrantyPanel.tsx";

export default function ProductTabs({product}: {product: Product}) {
    const [searchParams] = useSearchParams();
    const {hash} = useLocation();
    const tab = parseTab(searchParams.get("tab"));

    useEffect(() => {
        if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({block: "start"});
    }, [hash, tab]);

    return (
        <section className="detailTabs" aria-label="Thông tin chi tiết">
            <div className="tabBar">
                {TABS.map((item) => (
                    <Link
                        key={item.key}
                        to={{search: item.key === "desc" ? "" : `?tab=${item.key}`}}
                        className={item.key === tab ? "tabLabel isActive" : "tabLabel"}
                        aria-current={item.key === tab ? "true" : undefined}
                    >
                        {item.key === "review" ? `${item.label} (${product.reviewCount})` : item.label}
                    </Link>
                ))}
            </div>
            {tab === "desc" && <DescriptionPanel product={product} />}
            {tab === "spec" && <SpecPanel product={product} />}
            {tab === "review" && <ReviewPanel product={product} />}
            {tab === "warranty" && <WarrantyPanel />}
        </section>
    );
}
