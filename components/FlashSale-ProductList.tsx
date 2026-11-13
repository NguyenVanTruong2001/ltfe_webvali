import FlashSaleItem from "./FlashSale-ProductItem.tsx";
import {useProducts} from "../hooks/useProducts.ts";

export default function FlashSaleList() {
    const {products, status} = useProducts();

    if (status !== "succeeded") {
        return <p role="status">Đang tải sản phẩm...</p>;
    }

    return (<>
        <div className="rail" tabIndex={0} aria-label="Danh sách sản phẩm flash sale">
            {products.map((product) => <FlashSaleItem product={product} key={product.id} />)}
        </div>
    </>)
}
