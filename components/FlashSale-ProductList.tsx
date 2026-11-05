import {Products} from "../dataset/Products.tsx";
import FlashSaleItem from "./FlashSale-ProductItem.tsx";

export default function FlashSaleList() {
    return (<>
        <div className="rail" tabIndex={0} aria-label="Danh sách sản phẩm flash sale">
            {Products.map((product: any) => <FlashSaleItem product={product} key={product.id} />)}
        </div>
    </>)
}
