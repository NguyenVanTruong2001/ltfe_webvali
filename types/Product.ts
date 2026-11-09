export interface ProductColor {
    name: string
    hex: string
}

export interface ProductReview {
    id: string
    userName: string
    rating: number
    comment: string
    date: string
}

export interface Product {
    id: number
    name: string
    slug: string
    sku: string
    brand: string
    price: number
    originalPrice: number
    discountPercent: number
    images: string[]
    colors: ProductColor[]
    sizes: string[]
    inStock: boolean
    isBestSeller: boolean
    isNewArrival: boolean
    category: string
    rating: number
    reviewCount: number
    description: string
    specs: Record<string, string>
    reviews: ProductReview[]
}
