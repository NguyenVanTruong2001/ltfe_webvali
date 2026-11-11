import type {Product} from "../../types/Product.ts";
import ProductBreadcrumb from "./ProductBreadcrumb.tsx";
import ProductGallery from "./ProductGallery.tsx";
import ProductInfo from "./ProductInfo.tsx";

export default function ProductDetail({product}: {product: Product}) {
    return (
        <>
            <ProductBreadcrumb name={product.name} />
            <section className="detailTop" aria-labelledby="productTitle">
                <ProductGallery
                    images={product.images}
                    name={product.name}
                    discountPercent={product.discountPercent}
                    activeIndex={0}
                />
                <ProductInfo product={product} />
            </section>
        </>
    );
}
