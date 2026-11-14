import {Link} from "react-router-dom";
import {useCartEntries} from "../../hooks/useCartEntries.ts";
import CartBreadcrumb from "./CartBreadcrumb.tsx";
import CartEmpty from "./CartEmpty.tsx";
import CartItem from "./CartItem.tsx";
import CartSummary from "./CartSummary.tsx";

export default function Cart() {
    const {entries, subtotal, quantity} = useCartEntries();

    return (
        <>
            <CartBreadcrumb />
            <div className="cartHead">
                <div>
                    <h1 className="cartTitle">Giỏ hàng</h1>
                    <p className="cartCount" aria-live="polite">
                        {entries.length === 0 ? "Chưa có sản phẩm nào" : `${quantity} sản phẩm trong giỏ`}
                    </p>
                </div>
                <Link to="/products" className="textLink">Tiếp tục mua sắm</Link>
            </div>
            {entries.length === 0 ? (
                <CartEmpty />
            ) : (
                <div className="cartLayout">
                    <section aria-label="Sản phẩm trong giỏ">
                        <div className="cartCols" aria-hidden="true">
                            <span></span>
                            <span>Sản phẩm</span>
                            <span>Số lượng</span>
                            <span className="colEnd">Thành tiền</span>
                        </div>
                        <ul className="cartList">
                            {entries.map((entry) => (
                                <CartItem entry={entry} key={entry.line.key} />
                            ))}
                        </ul>
                    </section>
                    <CartSummary subtotal={subtotal} />
                </div>
            )}
        </>
    );
}
