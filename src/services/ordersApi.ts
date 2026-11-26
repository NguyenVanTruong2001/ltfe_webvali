import {SEED_ORDERS} from '../lib/orders/seed.ts'
import type {Order} from '../types/Order.ts'

const STORAGE_KEY = 'valigo:orders'
const FAKE_DELAY_MS = 350

function delay(ms = FAKE_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function readStorage(): Order[] {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ORDERS))
            return [...SEED_ORDERS]
        }
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...SEED_ORDERS]
    } catch {
        return [...SEED_ORDERS]
    }
}

function writeStorage(orders: Order[]): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
    } catch {
        return
    }
}

export const ordersApi = {
    // GET /api/orders
    async fetchOrders(): Promise<Order[]> {
        await delay()
        return readStorage()
    },

    // GET /api/orders/:code
    async fetchOrderByCode(code: string): Promise<Order> {
        await delay()
        const normalized = code.trim().toUpperCase()
        const orders = readStorage()
        const found = orders.find((o) => o.code.toUpperCase() === normalized)
        if (!found) {
            throw new Error(`Không tìm thấy đơn hàng với mã "${code}".`)
        }
        return found
    },

    // POST /api/orders
    async createOrder(newOrder: Order): Promise<Order> {
        await delay(450)
        const orders = readStorage()
        const updated = [newOrder, ...orders]
        writeStorage(updated)
        return newOrder
    },

    // PATCH /api/orders/:code/cancel
    async cancelOrder(code: string): Promise<Order> {
        await delay()
        const orders = readStorage()
        const target = orders.find((o) => o.code === code)
        if (!target) {
            throw new Error('Đơn hàng không tồn tại.')
        }
        if (target.status !== 'pending') {
            throw new Error('Chỉ có thể hủy đơn hàng đang ở trạng thái chờ xác nhận.')
        }
        target.status = 'cancelled'
        writeStorage(orders)
        return {...target}
    },
}