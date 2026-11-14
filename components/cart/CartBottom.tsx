import {useState} from "react";
import {formatPrice} from "../../lib/productList/format.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {clearCart} from "../../store/cartSlice.ts";

interface CartBottomProps {
    savings: number
    onNotice: (message: string) => void
}

export default function CartBottom({savings, onNotice}: CartBottomProps) {
    const dispatch = useAppDispatch();
    const [confirming, setConfirming] = useState(false);

    const handleClear = () => {
        dispatch(clearCart());
        onNotice("Đã xóa tất cả sản phẩm khỏi giỏ hàng.");
    };

    return (
        <div className="cartBottom">
            {confirming ? (
                <span className="cartConfirm" role="alert">
                    Xóa tất cả sản phẩm trong giỏ?
                    <button type="button" className="textAction" onClick={handleClear}>Xóa tất cả</button>
                    <button type="button" className="textAction" onClick={() => setConfirming(false)}>Hủy</button>
                </span>
            ) : (
                <button type="button" className="textAction" onClick={() => setConfirming(true)}>
                    Xóa tất cả sản phẩm
                </button>
            )}
            {savings > 0 && <p className="savedNote">Bạn tiết kiệm {formatPrice(savings)} so với giá gốc</p>}
        </div>
    );
}
