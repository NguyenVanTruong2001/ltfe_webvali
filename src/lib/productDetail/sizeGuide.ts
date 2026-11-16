export interface SizeGuide {
    inch: string
    dimensions: string
    capacity: string
    weight: string
    suitable: string
    note: string
}

export const SIZE_GUIDE: Record<string, SizeGuide> = {
    S: {
        inch: '20"',
        dimensions: '55 × 38 × 23 cm',
        capacity: '38 lít',
        weight: '2,7 kg',
        suitable: '1 đến 3 ngày',
        note: 'Xách tay lên máy bay, hợp chuyến đi từ 1 đến 3 ngày.',
    },
    M: {
        inch: '24"',
        dimensions: '65 × 43 × 27 cm',
        capacity: '65 lít',
        weight: '3,2 kg',
        suitable: '4 đến 7 ngày',
        note: 'Ký gửi, hợp chuyến đi từ 4 đến 7 ngày.',
    },
    L: {
        inch: '28"',
        dimensions: '75 × 50 × 30 cm',
        capacity: '95 lít',
        weight: '4,0 kg',
        suitable: 'Trên 7 ngày',
        note: 'Dành cho chuyến dài ngày hoặc đi cùng gia đình.',
    },
}
