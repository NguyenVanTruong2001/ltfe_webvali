import {useState} from "react";
import type {Order} from "../../types/Order.ts";
import type {Product} from "../../types/Product.ts";
import OrderThumb from "./OrderThumb.tsx";
import {formatPrice} from "../../lib/productList/format.ts";
import {canCancel, canReorder} from "../../lib/orders/reorder.ts";
import {formatOrderDate, historyLines, orderTotalOf, STATUS_INFO} from "../../lib/orders/history.ts";

interface OrderCardProps {
    order: Order;
    products: Product[];
    onCancel: (order: Order) => void;
    onReorder: (order: Order) => void;
}

export default function OrderCard({order, products, onCancel, onReorder}: OrderCardProps) {
    const [confirming, setConfirming] = useState(false);
    const lines = historyLines(order, products);
    const first = lines[0];
    const others = lines.length - 1;
    const info = STATUS_INFO[order.status];

    return (
        <li className="orderCard" data-status={order.status}>
            <div className="orderCardHead">
                <div>
                    <strong className="orderCardCode">{order.code}</strong>
                    <span className="trackMeta">Đặt ngày {formatOrderDate(order.placedAt)}</span>
                </div>
                <span className={`statusBadge ${info.className}`}>{info.label}</span>
            </div>
            {first && (
                <div className="orderCardBody">
                    <OrderThumb line={first} />
                    <div>
                        <strong className="summaryName">{first.name}</strong>
                        <span className="summaryVariant">{first.variant}</span>
                        {others > 0 && <span className="orderMore">và {others} sản phẩm khác</span>}
                    </div>
                </div>
            )}
            <div className="orderCardFoot">
                <p className="orderCardTotal">
                    Tổng cộng <strong>{formatPrice(orderTotalOf(order, products))}</strong>
                </p>
                <div className="orderCardActions">
                    {canCancel(order) && !confirming && (
                        <button type="button" className="btn btnGhost" onClick={() => setConfirming(true)}>
                            Hủy đơn
                        </button>
                    )}
                    {canCancel(order) && confirming && (
                        <>
                            <button type="button" className="btn btnDark" onClick={() => onCancel(order)}>
                                Xác nhận hủy
                            </button>
                            <button type="button" className="btn btnGhost" onClick={() => setConfirming(false)}>
                                Giữ đơn
                            </button>
                        </>
                    )}
                    {canReorder(order) && (
                        <button type="button" className="btn btnPrimary" onClick={() => onReorder(order)}>
                            Mua lại
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
}
