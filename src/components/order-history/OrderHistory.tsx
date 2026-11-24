import {Link} from "react-router";
import OrderCard from "./OrderCard.tsx";
import {useAppSelector} from "../../store/hooks.ts";
import {selectOrders} from "../../store/ordersSlice.ts";
import {selectProducts} from "../../store/productsSlice.ts";
import {sortNewestFirst} from "../../lib/orders/history.ts";

export default function OrderHistory() {
    const orders = useAppSelector(selectOrders);
    const products = useAppSelector(selectProducts);
    const sorted = sortNewestFirst(orders);

    return (
        <>
            <nav className="breadcrumb" aria-label="Đường dẫn">
                <ol>
                    <li><Link to="/">Trang chủ</Link></li>
                    <li aria-current="page">Lịch sử đơn hàng</li>
                </ol>
            </nav>
            <div className="checkoutHead">
                <h1 className="checkoutTitle">Lịch sử đơn hàng</h1>
                <p className="historyIntro">Xem lại các đơn đã đặt và theo dõi trạng thái giao hàng.</p>
            </div>
            {sorted.length === 0 ? (
                <div className="cartEmpty">
                    <p className="cartEmptyTitle">Bạn chưa có đơn hàng nào</p>
                    <p>Hãy chọn vali hoặc balo yêu thích để đặt đơn đầu tiên.</p>
                    <Link to="/products" className="btn btnDark">Xem tất cả vali</Link>
                </div>
            ) : (
                <ul className="orderList">
                    {sorted.map((order) => (
                        <OrderCard key={order.code} order={order} products={products} />
                    ))}
                </ul>
            )}
        </>
    );
}
