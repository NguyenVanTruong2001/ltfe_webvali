import type {Order} from '../../types/Order.ts'
import type {Product} from '../../types/Product.ts'
import type {AddToCartPayload} from '../../store/cartSlice.ts'

export function canCancel(order: Order): boolean {
    return order.status === 'pending'
}

export function canReorder(order: Order): boolean {
    return order.status === 'delivered' || order.status === 'cancelled'
}

export interface ReorderPlan {
    payloads: AddToCartPayload[]
    skipped: number
}

export function planReorder(order: Order, products: Product[]): ReorderPlan {
    const byId = new Map(products.map((product) => [product.id, product]))
    const payloads: AddToCartPayload[] = []
    order.items.forEach((item) => {
        const product = byId.get(item.productId)
        if (!product || !product.inStock) return
        const color = product.colors.some((c) => c.name === item.color) ? item.color! : product.colors[0]?.name ?? ''
        const size = item.size !== undefined && product.sizes.includes(item.size) ? item.size : product.sizes[0] ?? ''
        payloads.push({productId: product.id, color, size, quantity: item.quantity})
    })
    return {payloads, skipped: order.items.length - payloads.length}
}
