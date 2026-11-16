import {Products} from '../dataset/Products.tsx'
import type {Product} from '../types/Product.ts'

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
    signal?.throwIfAborted()
    return Products
}
