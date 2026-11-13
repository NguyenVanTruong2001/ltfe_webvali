import {useState} from "react";
import {useLocation} from "react-router-dom";
import ReviewForm from "./ReviewForm.tsx";

const COMPOSER_ID = "viet-danh-gia";

interface ReviewComposerProps {
    productId: number
    onSubmitted: () => void
}

export default function ReviewComposer({productId, onSubmitted}: ReviewComposerProps) {
    const {hash} = useLocation();
    const [open, setOpen] = useState(hash === `#${COMPOSER_ID}`);

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
