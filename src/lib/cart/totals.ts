import type {CartEntry} from './pricing.ts'
import {isPurchasable, isUnavailable, subtotalOf} from './pricing.ts'
import {freeShippingProgress, freeShippingRemaining, shippingFeeOf} from './shipping.ts'
import {evaluateVoucher} from './vouchers.ts'
import type {Voucher} from './vouchers.ts'

export interface CartTotals {
    subtotal: number
    shippingFee: number
    shippingDiscount: number
    discount: number
    voucher: Voucher | null
    voucherError: string | null
    total: number
    purchasableCount: number
    unavailableCount: number
    freeShippingRemaining: number
    freeShippingProgress: number
}

export function computeTotals(entries: CartEntry[], voucherCode: string | null): CartTotals {
    const subtotal = subtotalOf(entries)
    const purchasableCount = entries.filter(isPurchasable).length
    const shippingFee = purchasableCount > 0 ? shippingFeeOf(subtotal) : 0
    const result = voucherCode ? evaluateVoucher(voucherCode, entries, subtotal, shippingFee) : null
    const discount = result?.ok ? result.discount : 0
    const shippingDiscount = result?.ok ? result.shippingDiscount : 0
    return {
        subtotal,
        shippingFee,
        shippingDiscount,
        discount,
        voucher: result?.ok ? result.voucher : null,
        voucherError: result && !result.ok ? result.reason : null,
        purchasableCount,
        unavailableCount: entries.filter(isUnavailable).length,
        total: subtotal - discount + shippingFee - shippingDiscount,
        freeShippingRemaining: freeShippingRemaining(subtotal),
        freeShippingProgress: freeShippingProgress(subtotal),
    }
}
