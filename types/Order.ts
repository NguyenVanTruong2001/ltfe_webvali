export type OrderStatus = 'pending' | 'shipping' | 'delivered' | 'cancelled'

export interface OrderItem {
    productId: number
    quantity: number
}

export interface Order {
    code: string
    placedAt: string
    status: OrderStatus
    deliveredAt?: string
    items: OrderItem[]
}
