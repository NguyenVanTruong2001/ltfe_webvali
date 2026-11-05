export const Products: any = [
    {
        id: 1,
        name: 'Vali Khung Nhôm Cao Cấp Horizon Titan',
        slug: 'vali-khung-nhom-horizon-titan',
        sku: 'HT-2026-BLK',
        brand: 'Traveler Pro',
        price: 2450000,
        originalPrice: 3200000,
        discountPercent: 23,
        images: [
            'https://images.unsplash.com/photo-1565026057447-b8899f291105?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1581553680321-4fffae59febd?auto=format&fit=crop&q=80&w=800'
        ],
        colors: [
            { name: 'Đen Thạch Anh', hex: '#1A1A1A' },
            { name: 'Bạc Titan', hex: '#C0C0C0' },
            { name: 'Xanh Rose Gold', hex: '#B76E79' }
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        isBestSeller: true,
        isNewArrival: false,
        category: 'suitchase-hard',
        rating: 4.9,
        reviewCount: 128,
        description: 'Vali Horizon Titan sở hữu thiết kế sang trọng với bộ khung hợp kim nhôm siêu bền, bề mặt vân nhám chống trầy xước hoàn hảo cùng bộ khóa đôi chuẩn an ninh quốc tế TSA.',
        specs: {
            material: '100% Nhựa Polycarbonate (PC) nguyên chất + Khung nhôm',
            weight: '3.8 kg (Size S) / 4.5 kg (Size M)',
            dimensions: '55 x 36 x 23 cm (Size S - Xách tay)',
            capacity: '42 Lít',
            wheels: '8 Bánh xe xoay 360 độ bọc cao su đệm hơi chống ồn',
            lock: 'Khóa chốt đôi mã số TSA âm sàn chuẩn Mỹ',
            warranty: '10 năm chính hãng toàn cầu'
        },
        reviews: [
            {
                id: 'rev-1',
                userName: 'Nguyễn Văn Minh',
                rating: 5,
                comment: 'Vali chắc chắn, đi công tác Châu Âu mang theo rất ổn. Khóa mở mượt mà.',
                date: '2026-02-15'
            },
            {
                id: 'rev-2',
                userName: 'Trần Thị Thu Thảo',
                rating: 5,
                comment: 'Màu Bạc bên ngoài nhìn sang lắm. Bánh xe kéo êm ru không nghe tiếng động.',
                date: '2026-03-01'
            }
        ]
    },
    {
        id: 2,
        name: 'Vali Nhựa Dẻo Chống Đập EcoFlow Ultralight',
        slug: 'vali-nhua-deo-ecoflow-ultralight',
        sku: 'EF-UL-BLU',
        brand: 'EcoTrip',
        price: 1290000,
        originalPrice: 1800000,
        discountPercent: 28,
        images: [
            'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
        ],
        colors: [
            { name: 'Xanh Pastel', hex: '#AEC6CF' },
            { name: 'Vàng Chanh', hex: '#FDFD96' },
            { name: 'Hồng Phấn', hex: '#FFB7B2' }
        ],
        sizes: ['S', 'M'],
        inStock: true,
        isBestSeller: false,
        isNewArrival: true,
        category: 'suitchase-hard',
        rating: 4.7,
        reviewCount: 45,
        description: 'Chất liệu Polypropylene (PP) siêu dẻo chịu lực va đập cực tốt, có thể đàn hồi trở lại hình dạng ban đầu ngay cả khi bị đè nén mạnh.',
        specs: {
            material: '100% Nhựa Polypropylene (PP) đàn hồi cao',
            weight: '2.4 kg',
            dimensions: '54 x 35 x 22 cm',
            capacity: '38 Lít',
            wheels: 'Bánh xe đôi Hinomoto Nhật Bản',
            lock: 'Khóa kéo chốt số TSA',
            warranty: '5 năm'
        }
    },
    {
        id: 3,
        name: 'Vali Vải Dù Cao Cấp Executive Business',
        slug: 'vali-vai-du-executive-business',
        sku: 'EX-BUS-01',
        brand: 'Traveler Pro',
        price: 1850000,
        originalPrice: 2100000,
        discountPercent: 12,
        images: [
            'https://images.unsplash.com/photo-1581553680321-4fffae59febd?auto=format&fit=crop&q=80&w=800'
        ],
        colors: [
            { name: 'Đen Doanh Nhân', hex: '#0F0F0F' },
            { name: 'Xanh Navy', hex: '#000080' }
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        isBestSeller: false,
        isNewArrival: false,
        category: 'suitcase-soft',
        rating: 4.6,
        reviewCount: 32,
        description: 'Dành riêng cho doanh nhân bận rộn với ngăn đựng laptop 15.6 inch phía trước lấy nhanh tại an ninh sân bay, chất liệu vải Kodura chống thấm nước tuyệt đối.',
        specs: {
            material: 'Vải Polyester 1680D phủ chống thấm Water-Resistant',
            weight: '3.1 kg',
            dimensions: '56 x 38 x 24 cm (Có nới rộng +5cm)',
            capacity: '48 Lít (Tối đa 55 Lít)',
            wheels: '4 Bánh xe đơn chịu lực cao',
            lock: 'Khóa khóa kéo gài TSA',
            warranty: '3 năm'
        }
    },
    {
        id: 4,
        name: 'Túi Xách Du Lịch Trống Da PU Vintage',
        slug: 'tui-xach-du-lich-da-pu-vintage',
        sku: 'BAG-PU-VTG',
        brand: 'Retro Traveler',
        price: 650000,
        originalPrice: 850000,
        discountPercent: 23,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
        ],
        colors: [
            { name: 'Nâu Bò', hex: '#8B4513' },
            { name: 'Nâu Đậm', hex: '#3B2F2F' }
        ],
        sizes: ['S'],
        inStock: true,
        isBestSeller: true,
        isNewArrival: true,
        category: 'travel-bag',
        rating: 4.8,
        reviewCount: 89,
        description: 'Phong cách cổ điển lịch lãm, thích hợp cho chuyến đi ngắn ngày (2-3 ngày) hoặc đi tập gym.',
        specs: {
            material: 'Da PU tổng hợp cao cấp chống nước nhẹ',
            weight: '1.1 kg',
            dimensions: '48 x 26 x 24 cm',
            capacity: '30 Lít',
            wheels: 'Không bánh xe (Có quai đeo vai + quai xách)',
            lock: 'Khóa kéo kim loại',
            warranty: '1 năm'
        }
    }
];