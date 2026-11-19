export const FREE_SHIPPING_THRESHOLD = 1000000
export const SHIPPING_FEE = 30000

export function shippingFeeOf(subtotal: number): number {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
}

export function freeShippingRemaining(subtotal: number): number {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
}

export function freeShippingProgress(subtotal: number): number {
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
}
