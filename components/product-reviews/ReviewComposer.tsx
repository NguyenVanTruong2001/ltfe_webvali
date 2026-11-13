import {useState} from "react";
import {useLocation} from "react-router-dom";
import ReviewForm from "./ReviewForm.tsx";
import {useReviewEligibility} from "../../hooks/useReviewEligibility.ts";

const COMPOSER_ID = "viet-danh-gia";

const LOCKED_TEXT = {
    in_progress: "Đơn hàng chứa sản phẩm này đang được xử lý. Bạn có thể viết đánh giá sau khi nhận hàng thành công.",
    none: "Chỉ khách đã đặt và nhận hàng thành công mới có thể viết đánh giá cho sản phẩm này.",
};

interface ReviewComposerProps {
    productId: number
    onSubmitted: () => void
}

export default function ReviewComposer({productId, onSubmitted}: ReviewComposerProps) {
    const {hash} = useLocation();
    const eligibility = useReviewEligibility(productId);
    const [open, setOpen] = useState(hash === `#${COMPOSER_ID}`);

    if (eligibility !== "allowed") {
        return (
            <section className="composer" id={COMPOSER_ID} aria-labelledby="composerTitle">
                <h2 id="composerTitle" className="composerTitle">Viết đánh giá của bạn</h2>
                <p className="composerLocked">{LOCKED_TEXT[eligibility]}</p>
                <a href="/ui/orderHistory.html" className="btn btnGhost">Xem lịch sử đơn hàng</a>
            </section>
        );
    }

    return (
        <section className="composer" id={COMPOSER_ID} aria-labelledby="composerTitle">
            <div className="composerHead">
                <h2 id="composerTitle" className="composerTitle">Viết đánh giá của bạn</h2>
                <button
                    type="button"
                    className="btn btnGhost"
                    aria-expanded={open}
                    aria-controls="composerBody"
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? "Thu gọn" : "Viết đánh giá"}
                </button>
            </div>
            {open && (
                <div id="composerBody">
                    <ReviewForm productId={productId} onSubmitted={onSubmitted} />
                </div>
            )}
        </section>
    );
}
