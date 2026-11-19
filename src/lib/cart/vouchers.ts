import {lineTotal} from './pricing.ts'
import type {CartEntry} from './pricing.ts'

export interface Voucher {
    code: string
    title: string
    note: string
    expiryLabel: string
    kind: 'percent' | 'shipping'
    value: number
    minSubtotal: number
    expiresAt: Date
    used?: boolean
    appliesTo?: (entry: CartEntry) => boolean
    scopeMessage?: string
}

export const VOUCHERS: Voucher[] = [
    {
        code: 'WELCOME10',
        title: 'Giảm 10% cho đơn đầu tiên',
        note: 'Áp dụng cho đơn từ 500.000₫',
        expiryLabel: '30/11/2026',
        kind: 'percent',
        value: 10,
        minSubtotal: 500000,
        expiresAt: new Date(2026, 10, 30, 23, 59, 59),
    },
    {
        code: 'ATLAS10',
        title: 'Giảm 10% dòng Atlas khung nhôm',
        note: 'Áp dụng cho Atlas A7 và Atlas A9',
        expiryLabel: '15/12/2026',
        kind: 'percent',
        value: 10,
        minSubtotal: 0,
        expiresAt: new Date(2026, 11, 15, 23, 59, 59),
        appliesTo: (entry) => entry.product?.name.includes('Atlas') ?? false,
        scopeMessage: 'Giỏ hàng chưa có sản phẩm Atlas A7 hoặc Atlas A9.',
    },
    {
        code: 'FASTSHIP30',
        title: 'Giảm 30.000₫ phí giao hàng',
        note: 'Áp dụng khi đơn chưa được miễn phí vận chuyển',
        expiryLabel: '30/11/2026',
        kind: 'shipping',
        value: 30000,
        minSubtotal: 0,
        expiresAt: new Date(2026, 10, 30, 23, 59, 59),
    },
    {
        code: 'COMBO20',
        title: 'Giảm 20% khi mua combo',
        note: 'Đã dùng cho đơn VLG-241018-0412',
        expiryLabel: '31/12/2026',
        kind: 'percent',
        value: 20,
        minSubtotal: 0,
        expiresAt: new Date(2026, 11, 31, 23, 59, 59),
        used: true,
    },
    {
        code: 'BAY50',
        title: 'Flash sale cuối tuần',
        note: 'Giảm đến 50% cho sản phẩm flash sale',
        expiryLabel: '31/10/2026',
        kind: 'percent',
        value: 50,
        minSubtotal: 0,
        expiresAt: new Date(2026, 9, 31, 23, 59, 59),
    },
]

export type VoucherResult =
    | {ok: true, voucher: Voucher, discount: number, shippingDiscount: number}
    | {ok: false, reason: string}

export function normalizeCode(code: string): string {
    return code.trim().toUpperCase()
}

export function isSelectable(voucher: Voucher, now: Date = new Date()): boolean {
    return !voucher.used && voucher.expiresAt.getTime() >= now.getTime()
}

export function valueLabel(voucher: Voucher): string {
    return voucher.kind === 'percent' ? `${voucher.value}%` : `${voucher.value / 1000}K`
}

export function evaluateVoucher(
    code: string,
    entries: CartEntry[],
    subtotal: number,
    shippingFee: number,
    now: Date = new Date(),
): VoucherResult {
    const voucher = VOUCHERS.find((item) => item.code === normalizeCode(code))
    if (!voucher) return {ok: false, reason: 'Mã giảm giá không tồn tại.'}
    if (voucher.used) return {ok: false, reason: 'Mã giảm giá này đã được sử dụng.'}
    if (voucher.expiresAt.getTime() < now.getTime()) return {ok: false, reason: 'Mã giảm giá đã hết hạn.'}
    if (subtotal < voucher.minSubtotal) {
        return {ok: false, reason: `Đơn hàng cần từ ${voucher.minSubtotal.toLocaleString('vi-VN')}₫ để dùng mã này.`}
    }
    if (voucher.kind === 'shipping') {
        if (shippingFee === 0) return {ok: false, reason: 'Đơn hàng đã được miễn phí vận chuyển.'}
        return {ok: true, voucher, discount: 0, shippingDiscount: Math.min(shippingFee, voucher.value)}
    }
    const eligible = voucher.appliesTo ? entries.filter(voucher.appliesTo) : entries
    const base = eligible.reduce((sum, entry) => sum + lineTotal(entry), 0)
    if (base === 0) return {ok: false, reason: voucher.scopeMessage ?? 'Mã giảm giá không áp dụng cho giỏ hàng này.'}
    return {ok: true, voucher, discount: Math.round((base * voucher.value) / 100), shippingDiscount: 0}
}

export interface VoucherOption {
    voucher: Voucher
    result: VoucherResult
}

export function voucherOptions(entries: CartEntry[], subtotal: number, shippingFee: number): VoucherOption[] {
    return VOUCHERS
        .filter((voucher) => isSelectable(voucher))
        .map((voucher) => ({voucher, result: evaluateVoucher(voucher.code, entries, subtotal, shippingFee)}))
}

export function savingOf(result: VoucherResult): number {
    return result.ok ? result.discount + result.shippingDiscount : 0
}

export function bestOption(options: VoucherOption[]): VoucherOption | null {
    const usable = options.filter((option) => option.result.ok)
    if (usable.length === 0) return null
    return usable.reduce((best, option) => (savingOf(option.result) > savingOf(best.result) ? option : best))
}
