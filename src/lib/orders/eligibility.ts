import type {Order} from '../../types/Order.ts'

export type ReviewEligibility = 'allowed' | 'in_progress' | 'none'

export function reviewEligibility(orders: Order[], productId: number): ReviewEligibility {
    const containing = orders.filter((order) => order.items.some((item) => item.productId === productId))

    if (containing.some((order) => order.status === 'delivered')) return 'allowed'
    if (containing.some((order) => order.status === 'pending' || order.status === 'shipping')) return 'in_progress'
    return 'none'
}
