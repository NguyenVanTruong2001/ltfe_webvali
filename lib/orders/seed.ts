import type {Order} from '../../types/Order.ts'

export const SEED_ORDERS: Order[] = [
    {
        code: 'VLG-241103-0827',
        placedAt: '2026-11-03',
        status: 'shipping',
        items: [{productId: 2, quantity: 1}],
    },
    {
        code: 'VLG-241102-0905',
        placedAt: '2026-11-02',
        status: 'pending',
        items: [{productId: 6, quantity: 1}],
    },
    {
        code: 'VLG-241018-0412',
        placedAt: '2026-10-18',
        status: 'delivered',
        deliveredAt: '2026-10-20',
        items: [{productId: 1, quantity: 1}, {productId: 3, quantity: 1}],
    },
    {
        code: 'VLG-240925-0178',
        placedAt: '2026-09-25',
        status: 'cancelled',
        items: [{productId: 5, quantity: 1}],
    },
]
