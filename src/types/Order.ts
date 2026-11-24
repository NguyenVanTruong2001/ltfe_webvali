export type OrderStatus = 'pending' | 'shipping' | 'delivered' | 'cancelled'
export type ShippingMethod = 'standard' | 'express'
export type PaymentMethod = 'cod' | 'bank' | 'card' | 'wallet'

export interface OrderItem {
    productId: number
    quantity: number
    color?: string
    size?: string
    name?: string
    price?: number
    img?: string
    colorHex?: string
}

export interface OrderCustomer {
    fullName: string
    phone: string
    email: string
    province: string
    district: string
    ward: string
    address: string
    note?: string
}

export interface Order {
    code: string
    placedAt: string
    status: OrderStatus
    deliveredAt?: string
    items: OrderItem[]
    customer?: OrderCustomer
    shippingMethod?: ShippingMethod
    paymentMethod?: PaymentMethod
    subtotal?: number
    discount?: number
    shippingFee?: number
    total?: number
    voucherCode?: string | null
}