import type {Product} from '../../types/Product.ts'

export type FilterInput = 'checkbox' | 'radio' | 'color'

export interface FilterOption {
    value: string
    label: string
    /** Mã màu dùng cho nhóm "color" */
    swatch?: string
    /** Sản phẩm có thuộc lựa chọn này không. Bỏ trống với lựa chọn "tất cả". */
    test?: (product: Product) => boolean
}

export interface FilterGroup {
    key: string
    title: string
    input: FilterInput
    options: FilterOption[]
}

/** Gom mã màu hex về một nhóm màu để lọc (dữ liệu có hơn 20 tên màu khác nhau). */
export function colorFamily(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    const d = max - min
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
    let h = 0
    if (d !== 0) {
        if (max === r) h = ((g - b) / d) % 6
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h = (h * 60 + 360) % 360
    }

    if (l < 0.12) return 'den'
    if (s < 0.12) return l < 0.25 ? 'den' : 'bac-xam'
    if (l > 0.88) return 'be'
    if (h < 15 || h >= 335) return l > 0.5 ? 'hong' : 'do'
    if (h < 45) return l < 0.4 ? 'nau' : 'cam'
    if (h < 70) return 'vang'
    if (h < 170) return 'xanh-la'
    if (h < 260) return 'xanh-duong'
    return 'hong'
}

const hasColor = (family: string) => (p: Product) => p.colors.some((c) => colorFamily(c.hex) === family)

export const FILTER_GROUPS: FilterGroup[] = [
    {
        key: 'size',
        title: 'Size',
        input: 'checkbox',
        options: [
            {value: 'S', label: 'S - 20" xách tay', test: (p) => p.sizes.includes('S')},
            {value: 'M', label: 'M - 24" ký gửi', test: (p) => p.sizes.includes('M')},
            {value: 'L', label: 'L - 28" cỡ lớn', test: (p) => p.sizes.includes('L')},
        ],
    },
    {
        key: 'category',
        title: 'Loại sản phẩm',
        input: 'checkbox',
        options: [
            {value: 'suitchase-hard', label: 'Vali vỏ cứng', test: (p) => p.category === 'suitchase-hard'},
            {value: 'suitcase-soft', label: 'Vali vải', test: (p) => p.category === 'suitcase-soft'},
            {value: 'travel-bag', label: 'Túi du lịch', test: (p) => p.category === 'travel-bag'},
            {value: 'accessory', label: 'Phụ kiện', test: (p) => p.category === 'accessory'},
        ],
    },
    {
        key: 'price',
        title: 'Khoảng giá',
        input: 'radio',
        options: [
            {value: 'all', label: 'Tất cả mức giá'},
            {value: 'under700', label: 'Dưới 700.000₫', test: (p) => p.price < 700_000},
            {value: '700-1000', label: '700.000₫ đến 1.000.000₫', test: (p) => p.price >= 700_000 && p.price < 1_000_000},
            {value: '1000-2000', label: '1.000.000₫ đến 2.000.000₫', test: (p) => p.price >= 1_000_000 && p.price < 2_000_000},
            {value: 'over2000', label: 'Trên 2.000.000₫', test: (p) => p.price >= 2_000_000},
        ],
    },
    {
        key: 'color',
        title: 'Màu sắc',
        input: 'color',
        options: [
            {value: 'den', label: 'Đen', swatch: '#2B3038', test: hasColor('den')},
            {value: 'bac-xam', label: 'Bạc / Xám', swatch: '#B9C3CD', test: hasColor('bac-xam')},
            {value: 'be', label: 'Be', swatch: '#E8DCC0', test: hasColor('be')},
            {value: 'nau', label: 'Nâu', swatch: '#8B5A2B', test: hasColor('nau')},
            {value: 'hong', label: 'Hồng', swatch: '#F2A7B8', test: hasColor('hong')},
            {value: 'vang', label: 'Vàng', swatch: '#F2C230', test: hasColor('vang')},
            {value: 'xanh-la', label: 'Xanh lá', swatch: '#6B7B4A', test: hasColor('xanh-la')},
            {value: 'xanh-duong', label: 'Xanh dương', swatch: '#27466F', test: hasColor('xanh-duong')},
        ],
    },
    {
        key: 'brand',
        title: 'Thương hiệu',
        input: 'checkbox',
        options: [
            {value: 'Traveler Pro', label: 'Traveler Pro', test: (p) => p.brand === 'Traveler Pro'},
            {value: 'EcoTrip', label: 'EcoTrip', test: (p) => p.brand === 'EcoTrip'},
            {value: 'Retro Traveler', label: 'Retro Traveler', test: (p) => p.brand === 'Retro Traveler'},
            {value: 'Little Traveler', label: 'Little Traveler', test: (p) => p.brand === 'Little Traveler'},
        ],
    },
    {
        key: 'rating',
        title: 'Đánh giá',
        input: 'radio',
        options: [
            {value: '4.8', label: 'Từ 4,8 sao trở lên', test: (p) => p.rating >= 4.8},
            {value: '4.5', label: 'Từ 4,5 sao trở lên', test: (p) => p.rating >= 4.5},
        ],
    },
    {
        key: 'promo',
        title: 'Khuyến mại',
        input: 'checkbox',
        options: [
            {value: 'sale', label: 'Đang giảm giá', test: (p) => p.discountPercent > 0},
            {value: 'best', label: 'Bán chạy', test: (p) => p.isBestSeller},
            {value: 'new', label: 'Hàng mới về', test: (p) => p.isNewArrival},
        ],
    },
    {
        key: 'stock',
        title: 'Tình trạng',
        input: 'checkbox',
        options: [
            {value: 'in', label: 'Còn hàng', test: (p) => p.inStock},
        ],
    },
]

export const SORT_OPTIONS = [
    {value: 'newest', label: 'Mới nhất'},
    {value: 'bestseller', label: 'Bán chạy'},
    {value: 'price-asc', label: 'Giá thấp đến cao'},
    {value: 'price-desc', label: 'Giá cao đến thấp'},
    {value: 'discount', label: 'Giảm giá nhiều nhất'},
    {value: 'rating', label: 'Đánh giá cao nhất'},
] as const

export type SortKey = typeof SORT_OPTIONS[number]['value']
