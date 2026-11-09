import type {Product} from '../../types/Product.ts'
import {FILTER_GROUPS} from './filterConfig.ts'
import type {FilterGroup, FilterOption, SortKey} from './filterConfig.ts'

/** key của nhóm -> các value đang chọn. Nhóm radio chỉ có tối đa 1 phần tử. */
export type FilterState = Record<string, string[]>

export interface ActiveFilter {
    groupKey: string
    value: string
    label: string
}

export function selectedOf(state: FilterState, group: FilterGroup): string[] {
    return state[group.key] ?? []
}

export function isChecked(state: FilterState, group: FilterGroup, option: FilterOption): boolean {
    const selected = selectedOf(state, group)
    if (group.input === 'radio' && option.value === 'all') return selected.length === 0
    return selected.includes(option.value)
}

/** Trong cùng một nhóm: chọn nhiều giá trị thì lấy sản phẩm khớp ÍT NHẤT một giá trị (OR). */
function matchesGroup(product: Product, group: FilterGroup, selected: string[]): boolean {
    if (selected.length === 0) return true
    return group.options.some((o) => selected.includes(o.value) && (o.test ? o.test(product) : true))
}

/** Giữa các nhóm khác nhau: phải khớp TẤT CẢ (AND). `skipKey` dùng để đếm số lượng cho một nhóm. */
export function applyFilters(products: Product[], state: FilterState, skipKey?: string): Product[] {
    return products.filter((product) =>
        FILTER_GROUPS.every((group) => group.key === skipKey || matchesGroup(product, group, selectedOf(state, group))),
    )
}

/** Số sản phẩm sẽ có nếu bấm vào `option`, giữ nguyên các nhóm lọc khác. */
export function countOption(products: Product[], state: FilterState, group: FilterGroup, option: FilterOption): number {
    const pool = applyFilters(products, state, group.key)
    return option.test ? pool.filter(option.test).length : pool.length
}

export function toggleOption(state: FilterState, group: FilterGroup, value: string): FilterState {
    const selected = selectedOf(state, group)

    if (group.input === 'radio') {
        // "Tất cả" hoặc bấm lại lựa chọn đang chọn = bỏ lọc nhóm này
        const next = value === 'all' || selected.includes(value) ? [] : [value]
        return {...state, [group.key]: next}
    }

    const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
    return {...state, [group.key]: next}
}

export function removeOption(state: FilterState, groupKey: string, value: string): FilterState {
    return {...state, [groupKey]: (state[groupKey] ?? []).filter((v) => v !== value)}
}

export function listActiveFilters(state: FilterState): ActiveFilter[] {
    return FILTER_GROUPS.flatMap((group) =>
        selectedOf(state, group).flatMap((value) => {
            const option = group.options.find((o) => o.value === value)
            return option ? [{groupKey: group.key, value, label: chipLabel(group, option)}] : []
        }),
    )
}

function chipLabel(group: FilterGroup, option: FilterOption): string {
    if (group.key === 'size') return `Size ${option.value}`
    if (group.key === 'color') return `Màu ${option.label.toLowerCase()}`
    return option.label
}

const comparators: Record<SortKey, (a: Product, b: Product) => number> = {
    // dữ liệu chưa có ngày tạo: hàng mới về lên trước, sau đó id lớn hơn là mới hơn
    'newest': (a, b) => Number(b.isNewArrival) - Number(a.isNewArrival) || b.id - a.id,
    'bestseller': (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || b.reviewCount - a.reviewCount,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'discount': (a, b) => b.discountPercent - a.discountPercent,
    'rating': (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
    return [...products].sort(comparators[sort])
}
