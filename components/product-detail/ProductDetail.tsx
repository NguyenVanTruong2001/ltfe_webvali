import type {Product} from "../../types/Product.ts";
import ProductBreadcrumb from "./ProductBreadcrumb.tsx";
import ProductGallery from "./ProductGallery.tsx";
import ProductInfo from "./ProductInfo.tsx";
import ProductOptions from "./ProductOptions.tsx";
import ProductBuyRow from "./ProductBuyRow.tsx";
import ProductTabs from "./ProductTabs.tsx";
import RelatedProducts from "./RelatedProducts.tsx";
import {useProductOptions} from "../../hooks/useProductOptions.ts";

export default function ProductDetail({product}: {product: Product}) {
    const options = useProductOptions(product);

    return (
        <>
            <ProductBreadcrumb name={product.name} />
            <section className="detailTop" aria-labelledby="productTitle">
                <ProductGallery
                    images={product.images}
                    name={product.name}
                    discountPercent={product.discountPercent}
                    activeIndex={options.imageIndex}
                    onSelect={options.selectImage}
                />
                <ProductInfo product={product}>
                    <ProductOptions
                        colors={product.colors}
                        sizes={product.sizes}
                        color={options.color}
                        size={options.size}
                        onColorChange={options.selectColor}
                        onSizeChange={options.selectSize}
                    />
                    <ProductBuyRow quantity={options.quantity} onQuantityChange={options.setQuantity} />
                </ProductInfo>
            </section>
            <ProductTabs product={product} />
            <RelatedProducts product={product} />
        </>
    );
}
