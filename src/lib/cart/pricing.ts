import type {Product} from '../../types/Product.ts'
import type {CartLine} from '../../store/cartSlice.ts'

export interface CartEntry {
    line: CartLine
    product: Product | undefined
}

export function buildEntries(lines: CartLine[], products: Product[]): CartEntry[] {
    const byId = new Map(products.map((product) => [product.id, product]))
    return lines.map((line) => ({line, product: byId.get(line.productId)}))
}

export function lineTotal(entry: CartEntry): number {
    return entry.product ? entry.product.price * entry.line.quantity : 0
}

export function subtotalOf(entries: CartEntry[]): number {
    return entries.reduce((sum, entry) => sum + lineTotal(entry), 0)
}

export function totalQuantity(entries: CartEntry[]): number {
    return entries.reduce((sum, entry) => sum + entry.line.quantity, 0)
}

export function variantLabel(line: CartLine): string {
    return [line.color && `Màu: ${line.color}`, line.size && `Size: ${line.size}`].filter(Boolean).join(', ')
}

export function savingsOf(entries: CartEntry[]): number {
    return entries.reduce((sum, entry) => {
        if (!entry.product) return sum
        return sum + Math.max(0, entry.product.originalPrice - entry.product.price) * entry.line.quantity
    }, 0)
}
