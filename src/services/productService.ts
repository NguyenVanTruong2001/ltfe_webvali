import axios from 'axios'
import type {Product} from '../types/Product.ts'

const PRODUCTS_URL = 'data/products.json'

const http = axios.create({baseURL: import.meta.env.BASE_URL})

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
    const response = await http.get<Product[]>(PRODUCTS_URL, {signal})
    return response.data
}
