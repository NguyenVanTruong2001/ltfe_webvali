import type {Order, OrderStatus} from '../../types/Order.ts'
import type {Product} from '../../types/Product.ts'

export const STATUS_INFO: Record<OrderStatus, {label: string, className: string}> = {
    pending: {label: 'Chờ xác nhận', className: 'isPending'},
    shipping: {label: 'Đang vận chuyển', className: 'isShipping'},
    delivered: {label: 'Đã giao', className: 'isDelivered'},
    cancelled: {label: 'Đã hủy', className: 'isCancelled'},
}

export interface HistoryLine {
    key: string
    name: string
    variant: string
    image: string | undefined
    colorHex: string
    quantity: number
    unitPrice: number
}

const DEFAULT_COLOR = '#B9C3CD'

export function sortNewestFirst(orders: Order[]): Order[] {
    return [...orders].sort((a, b) => b.placedAt.localeCompare(a.placedAt))
}

export function formatOrderDate(placedAt: string): string {
    const date = new Date(placedAt)
    if (Number.isNaN(date.getTime())) return placedAt
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const label = `${day}/${month}/${date.getFullYear()}`
    if (!placedAt.includes('T')) return label
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${label} lúc ${hours}:${minutes}`
}

export function historyLines(order: Order, products: Product[]): HistoryLine[] {
    const byId = new Map(products.map((product) => [product.id, product]))
    return order.items.map((item, index) => {
        const product = byId.get(item.productId)
        const color = item.color ?? product?.colors[0]?.name
        const size = item.size ?? product?.sizes[0]
        const variant = [color, size && `size ${size}`, `số lượng ${item.quantity}`].filter(Boolean).join(', ')
        const colorHex = item.colorHex
            ?? product?.colors.find((c) => c.name === color)?.hex
            ?? product?.colors[0]?.hex
            ?? DEFAULT_COLOR
        return {
            key: `${item.productId}-${index}`,
            name: item.name ?? product?.name ?? `Sản phẩm #${item.productId}`,
            variant,
            image: item.img ?? product?.images[0],
            colorHex,
            quantity: item.quantity,
            unitPrice: item.price ?? product?.price ?? 0,
        }
    })
}

export function orderTotalOf(order: Order, products: Product[]): number {
    if (order.total !== undefined) return order.total
    const subtotal = historyLines(order, products).reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
    return Math.max(0, subtotal - (order.discount ?? 0) + (order.shippingFee ?? 0))
}

export type StatusFilter = 'all' | OrderStatus

export const STATUS_FILTERS: {id: StatusFilter, label: string}[] = [
    {id: 'all', label: 'Tất cả'},
    {id: 'pending', label: STATUS_INFO.pending.label},
    {id: 'shipping', label: STATUS_INFO.shipping.label},
    {id: 'delivered', label: STATUS_INFO.delivered.label},
    {id: 'cancelled', label: STATUS_INFO.cancelled.label},
]

export function parseFilter(value: string | null): StatusFilter {
    const match = STATUS_FILTERS.find((filter) => filter.id === value)
    return match ? match.id : 'all'
}

export function filterOrders(orders: Order[], filter: StatusFilter): Order[] {
    return filter === 'all' ? orders : orders.filter((order) => order.status === filter)
}

export function countByFilter(orders: Order[]): Record<StatusFilter, number> {
    const counts: Record<StatusFilter, number> = {all: orders.length, pending: 0, shipping: 0, delivered: 0, cancelled: 0}
    orders.forEach((order) => {
        counts[order.status] += 1
    })
    return counts
}
