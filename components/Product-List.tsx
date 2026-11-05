import ProductItem from "./Product-Item.tsx";
import {Products} from "../dataset/Products.tsx";

export default function ProductList() {
    return (<>
        <div className="grid" role="tabpanel">
            {Products.map((product: any) => <ProductItem product={product} key={product.id} />)}
        </div>
        <div className="gridMore">
            <button type="button" className="btn btnGhost">Xem thêm 2 sản phẩm</button>
        </div>
    </>)
}