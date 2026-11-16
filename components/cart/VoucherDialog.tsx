import {useEffect, useRef, useState} from "react";
import type {MouseEvent} from "react";
import {formatPrice} from "../../lib/productList/format.ts";
import {savingOf, valueLabel} from "../../lib/cart/vouchers.ts";
import type {VoucherOption} from "../../lib/cart/vouchers.ts";

interface VoucherDialogProps {
    options: VoucherOption[]
    currentCode: string | null
    onConfirm: (code: string | null) => void
    onClose: () => void
}

export default function VoucherDialog({options, currentCode, onConfirm, onClose}: VoucherDialogProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const [draft, setDraft] = useState<string | null>(currentCode);

    useEffect(() => {
        const dialog = ref.current;
        if (dialog && !dialog.open) dialog.showModal();
    }, []);

    const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) onClose();
    };

    return (
        <dialog
            ref={ref}
            className="voucherDialog"
            aria-labelledby="voucherDialogTitle"
            onClose={onClose}
            onClick={handleBackdrop}
        >
            <div className="voucherDialogHead">
                <h3 id="voucherDialogTitle" className="voucherDialogTitle">Chọn voucher Valigo</h3>
                <button type="button" className="textAction" onClick={onClose}>Đóng</button>
            </div>
            <ul className="voucherPick">
                {options.map(({voucher, result}) => {
                    const usable = result.ok;
                    const checked = draft === voucher.code;
                    return (
                        <li
                            key={voucher.code}
                            className={`voucherPickItem${checked ? " isSelected" : ""}${usable ? "" : " isDisabled"}`}
                        >
                            <span className="voucherPickValue">{valueLabel(voucher)}</span>
                            <label className="voucherPickBody" htmlFor={`voucher-${voucher.code}`}>
                                <span className="voucherPickName">
                                    <strong>{voucher.code}</strong> · {voucher.title}
                                </span>
                                <span className="voucherPickNote">{voucher.note}. HSD {voucher.expiryLabel}</span>
                                {result.ok ? (
                                    <span className="voucherPickSaving">Tiết kiệm {formatPrice(savingOf(result))}</span>
                                ) : (
                                    <span className="voucherPickReason">{result.reason}</span>
                                )}
                            </label>
                            <input
                                id={`voucher-${voucher.code}`}
                                type="radio"
                                name="voucher"
                                checked={checked}
                                disabled={!usable}
                                onChange={() => setDraft(voucher.code)}
                            />
                        </li>
                    );
                })}
            </ul>
            <div className="voucherDialogFoot">
                <button type="button" className="textAction" onClick={() => setDraft(null)}>
                    Không dùng voucher
                </button>
                <button
                    type="button"
                    className="btn btnPrimary"
                    onClick={() => {
                        onConfirm(draft);
                        onClose();
                    }}
                >
                    Xác nhận
                </button>
            </div>
        </dialog>
    );
}
