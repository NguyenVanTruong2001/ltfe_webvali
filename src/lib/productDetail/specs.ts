const SPEC_LABELS: Record<string, string> = {
    material: 'Chất liệu',
    dimensions: 'Kích thước',
    weight: 'Trọng lượng',
    capacity: 'Dung tích',
    wheels: 'Bánh xe',
    lock: 'Khóa',
    warranty: 'Bảo hành',
}

export interface SpecRow {
    key: string
    label: string
    value: string
}

export function specRows(specs: Record<string, string>): SpecRow[] {
    const known = Object.keys(SPEC_LABELS).filter((key) => specs[key])
    const extra = Object.keys(specs).filter((key) => !(key in SPEC_LABELS))
    return [...known, ...extra].map((key) => ({key, label: SPEC_LABELS[key] ?? key, value: specs[key]}))
}
