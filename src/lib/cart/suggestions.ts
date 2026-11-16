import type {Product} from '../../types/Product.ts'
import type {CartEntry} from './pricing.ts'

export const SUGGESTION_LIMIT = 4

export function suggestProducts(products: Product[], entries: CartEntry[], limit: number = SUGGESTION_LIMIT): Product[] {
    const inCart = new Set(entries.map((entry) => entry.line.productId))
    const categories = new Set(
        entries.flatMap((entry) => (entry.product ? [entry.product.category] : [])),
    )
    const pool = products.filter((product) => product.inStock && !inCart.has(product.id))
    const sameCategory = pool.filter((product) => categories.has(product.category))
    const others = pool
        .filter((product) => !categories.has(product.category))
        .sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || b.rating - a.rating)
    return [...sameCategory, ...others].slice(0, limit)
}
