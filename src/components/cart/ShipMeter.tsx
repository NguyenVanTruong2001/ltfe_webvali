import type {CSSProperties} from "react";
import {formatPrice} from "../../lib/productList/format.ts";
import type {CartTotals} from "../../lib/cart/totals.ts";

export default function ShipMeter({totals}: {totals: CartTotals}) {
    const free = totals.freeShippingRemaining === 0;
    const style = {"--meterWidth": `${totals.freeShippingProgress}%`} as CSSProperties;

    return (
        <div className="shipMeter">
            <p>
                <svg className="icon iconSm" aria-hidden="true">
                    <use href="#iTruck" />
                </svg>
                {free ? (
                    <strong>Đơn hàng của bạn được miễn phí vận chuyển.</strong>
                ) : (
                    <span>
                        Mua thêm <strong>{formatPrice(totals.freeShippingRemaining)}</strong> để được miễn phí vận chuyển.
                    </span>
                )}
            </p>
            <div
                className="meterBar"
                role="progressbar"
                aria-label="Tiến độ miễn phí vận chuyển"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={totals.freeShippingProgress}
            >
                <span className="meterFill" style={style}></span>
            </div>
        </div>
    );
}
