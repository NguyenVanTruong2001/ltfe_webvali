import {Link} from "react-router-dom";

export default function CartEmpty() {
    return (
        <div className="cartEmpty">
            <p className="cartEmptyTitle">Giỏ hàng của bạn đang trống</p>
            <p>Hãy chọn vali hoặc balo yêu thích và thêm vào giỏ để bắt đầu.</p>
            <Link to="/products" className="btn btnDark">Xem tất cả vali</Link>
        </div>
    );
}
