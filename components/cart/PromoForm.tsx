import {useState} from "react";
import type {FormEvent} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {applyVoucher, removeVoucher} from "../../store/voucherSlice.ts";
import {evaluateVoucher, normalizeCode} from "../../lib/cart/vouchers.ts";
import type {CartEntry} from "../../lib/cart/pricing.ts";
import type {CartTotals} from "../../lib/cart/totals.ts";

interface PromoFormProps {
    entries: CartEntry[]
    totals: CartTotals
    voucherCode: string | null
}

export default function PromoForm({entries, totals, voucherCode}: PromoFormProps) {
    const dispatch = useAppDispatch();
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const code = normalizeCode(input);
        if (!code) {
            setError("Vui lòng nhập mã giảm giá.");
            return;
        }
        const baseFee = totals.shippingFee;
        const result = evaluateVoucher(code, entries, totals.subtotal, baseFee);
        if (!result.ok) {
            setError(result.reason);
            return;
        }
        dispatch(applyVoucher(result.voucher.code));
        setInput("");
        setError(null);
    };

    const handleRemove = () => {
        dispatch(removeVoucher());
        setError(null);
    };

    return (
        <>
            <form className="promoForm" onSubmit={handleSubmit} noValidate>
                <label className="visuallyHidden" htmlFor="promoCode">Mã giảm giá</label>
                <input
                    id="promoCode"
                    type="text"
                    autoComplete="off"
                    placeholder="Nhập mã giảm giá"
                    value={input}
                    aria-invalid={error !== null}
                    aria-describedby={error ? "promoError" : undefined}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit" className="btn btnGhost">Áp dụng</button>
            </form>
            {error && <p id="promoError" className="promoError" role="alert">{error}</p>}
            {voucherCode && totals.voucher && (
                <p className="promoApplied">
                    <span>
                        <svg className="icon iconSm" aria-hidden="true">
                            <use href="#iCheck" />
                        </svg>
                        Mã {totals.voucher.code} đã được áp dụng
                    </span>
                    <button
                        type="button"
                        className="textAction"
                        aria-label={`Bỏ mã ${totals.voucher.code}`}
                        onClick={handleRemove}
                    >
                        Bỏ mã
                    </button>
                </p>
            )}
            {voucherCode && totals.voucherError && (
                <p className="promoError" role="status">
                    Mã {voucherCode} chưa dùng được: {totals.voucherError}
                    <button
                        type="button"
                        className="textAction"
                        aria-label={`Bỏ mã ${voucherCode}`}
                        onClick={handleRemove}
                    >
                        Bỏ mã
                    </button>
                </p>
            )}
        </>
    );
}
