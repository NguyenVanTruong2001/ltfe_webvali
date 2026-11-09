import type {Product} from '../types/Product.ts'

// "API" hiện là file JSON tĩnh trong public/data. Khi có backend thật chỉ cần đổi địa chỉ này.
const PRODUCTS_URL = `${import.meta.env.BASE_URL}data/products.json`

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
    const response = await fetch(PRODUCTS_URL, {signal})

    if (!response.ok) {
        throw new Error(`Không tải được sản phẩm (lỗi ${response.status})`)
    }

    return response.json()
}
