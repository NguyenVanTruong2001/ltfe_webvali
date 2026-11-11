import {useState} from "react";
import type {Product} from "../../types/Product.ts";
import ProductBreadcrumb from "./ProductBreadcrumb.tsx";
import ProductGallery from "./ProductGallery.tsx";
import ProductInfo from "./ProductInfo.tsx";
import ProductOptions from "./ProductOptions.tsx";
import ProductBuyRow from "./ProductBuyRow.tsx";
import ProductBuyBar from "./ProductBuyBar.tsx";
import ProductTabs from "./ProductTabs.tsx";
import RelatedProducts from "./RelatedProducts.tsx";
import {useProductOptions} from "../../hooks/useProductOptions.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {addToCart} from "../../store/cartSlice.ts";
import {selectWishIds, toggleWish} from "../../store/wishlistSlice.ts";

export default function ProductDetail({product}: {product: Product}) {
    const options = useProductOptions(product);
    const dispatch = useAppDispatch();
    const wished = useAppSelector((state) => selectWishIds(state).includes(product.id));
    const [notice, setNotice] = useState<string | null>(null);

    const addCurrentToCart = () => {
        dispatch(addToCart({
            productId: product.id,
            color: options.color,
            size: options.size,
            quantity: options.quantity,
        }));
    };

    const handleAddToCart = () => {
        addCurrentToCart();
        setNotice(`Đã thêm ${options.quantity} sản phẩm vào giỏ hàng.`);
    };

    const handleBuyNow = () => {
        addCurrentToCart();
        window.location.assign("/ui/checkout.html");
    };

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
                    <ProductBuyRow
                        quantity={options.quantity}
                        inStock={product.inStock}
                        wished={wished}
                        notice={notice}
                        onQuantityChange={options.setQuantity}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        onToggleWish={() => dispatch(toggleWish(product.id))}
                    />
                </ProductInfo>
            </section>
            <ProductTabs product={product} />
            <RelatedProducts product={product} />
            <ProductBuyBar
                price={product.price}
                originalPrice={product.originalPrice}
                discountPercent={product.discountPercent}
                inStock={product.inStock}
                onAddToCart={handleAddToCart}
            />
        </>
    );
}
