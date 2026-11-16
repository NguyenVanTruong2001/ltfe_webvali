import {useState} from "react";
import {formatPrice} from "../../lib/productList/format.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {applyVoucher, removeVoucher} from "../../store/voucherSlice.ts";
import {bestOption, savingOf, voucherOptions} from "../../lib/cart/vouchers.ts";
import type {CartEntry} from "../../lib/cart/pricing.ts";
import type {CartTotals} from "../../lib/cart/totals.ts";
import VoucherDialog from "./VoucherDialog.tsx";

interface VoucherPickerProps {
    entries: CartEntry[]
    totals: CartTotals
    voucherCode: string | null
}

export default function VoucherPicker({entries, totals, voucherCode}: VoucherPickerProps) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const options = voucherOptions(entries, totals.subtotal, totals.shippingFee);
    const best = bestOption(options);

    const handleConfirm = (code: string | null) => {
        dispatch(code ? applyVoucher(code) : removeVoucher());
    };

    return (
        <section className="voucherPicker" aria-labelledby="voucherPickTitle">
            <h3 id="voucherPickTitle" className="voucherPickTitle">Mã giảm giá</h3>
            {totals.voucher ? (
                <div className="voucherCard isApplied">
                    <p className="voucherCardText">
                        <svg className="icon iconSm" aria-hidden="true">
                            <use href="#iCheck" />
                        </svg>
                        <span>
                            <strong>{totals.voucher.code}</strong> đã được áp dụng, tiết kiệm{" "}
                            {formatPrice(totals.discount + totals.shippingDiscount)}
                        </span>
                    </p>
                    <button type="button" className="textAction" onClick={() => dispatch(removeVoucher())}>
                        Bỏ mã
                    </button>
                </div>
            ) : voucherCode && totals.voucherError ? (
                <div className="voucherCard isWarning" role="status">
                    <p className="voucherCardText">
                        Mã {voucherCode} chưa dùng được: {totals.voucherError}
                    </p>
                    <button type="button" className="textAction" onClick={() => dispatch(removeVoucher())}>
                        Bỏ mã
                    </button>
                </div>
            ) : best ? (
                <div className="voucherCard">
                    <p className="voucherCardText">
                        <span>
                            Gợi ý cho bạn: <strong>{best.voucher.code}</strong>, tiết kiệm{" "}
                            {formatPrice(savingOf(best.result))}
                        </span>
                    </p>
                    <button
                        type="button"
                        className="btn btnGhost"
                        aria-label={`Áp dụng mã ${best.voucher.code}`}
                        onClick={() => dispatch(applyVoucher(best.voucher.code))}
                    >
                        Áp dụng
                    </button>
                </div>
            ) : (
                <p className="voucherCardEmpty">Chưa có voucher phù hợp với đơn hàng này.</p>
            )}
            <button type="button" className="voucherMore" onClick={() => setOpen(true)}>
                Chọn voucher khác
            </button>
            {open && (
                <VoucherDialog
                    options={options}
                    currentCode={totals.voucher ? totals.voucher.code : null}
                    onConfirm={handleConfirm}
                    onClose={() => setOpen(false)}
                />
            )}
        </section>
    );
}
