import type {Product} from "../types/Product.ts";

export const Products: Product[] = [
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
            'https://plus.unsplash.com/premium_photo-1684407616508-b9e82c8bc8a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1568571959361-3bffbad07499?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1564209906116-fb6887675069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
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
            'https://images.unsplash.com/photo-1568571959361-3bffbad07499?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1564209906116-fb6887675069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1673505705680-36437a06ee27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
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
            'https://images.unsplash.com/photo-1564209906116-fb6887675069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1673505705680-36437a06ee27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1564209906116-fb6887675069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
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
        name: 'Vali Vải Dù Cao Cấp Executive Business',
        slug: 'vali-vai-du-executive-business',
        sku: 'BAG-PU-VTG',
        brand: 'Retro Traveler',
        price: 650000,
        originalPrice: 850000,
        discountPercent: 23,
        images: [
            'https://images.unsplash.com/photo-1673505705680-36437a06ee27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://plus.unsplash.com/premium_photo-1679423808722-5eb50d6b7de7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1673505705680-36437a06ee27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
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
    },
    {
        id: 5,
        name: 'Vali Trẻ Em Hình Thú Cute Zoo Express',
        slug: 'vali-tre-em-hinh-thu-cute-zoo',
        sku: 'KID-ZOO-05',
        brand: 'Little Traveler',
        price: 790000,
        originalPrice: 950000,
        discountPercent: 17,
        images: [
            'https://plus.unsplash.com/premium_photo-1679423808722-5eb50d6b7de7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1673505705680-36437a06ee27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
        ],
        colors: [
            { name: 'Vàng Khủng Long', hex: '#FFD700' },
            { name: 'Hồng Thỏ Ngọc', hex: '#FFC0CB' },
            { name: 'Xanh Chú Voi', hex: '#87CEEB' }
        ],
        sizes: ['S'],
        inStock: true,
        isBestSeller: true,
        isNewArrival: false,
        category: 'suitchase-hard',
        rating: 4.9,
        reviewCount: 64,
        description: 'Vali chuyên dụng cho bé với thiết kế bo tròn an toàn, chất liệu nhựa ABS nhẹ chịu lực tốt, bánh xe phát sáng khi di chuyển.',
        specs: {
            material: 'Nhựa ABS + PC an toàn cho trẻ em',
            weight: '1.6 kg',
            dimensions: '45 x 30 x 20 cm (Size 18 inch)',
            capacity: '22 Lít',
            wheels: '4 Bánh xe xoay 360 độ tích hợp đèn LED phát sáng',
            lock: 'Khóa kéo tiêu chuẩn',
            warranty: '2 năm'
        }
    },
    {
        id: 6,
        name: 'Vali Khóa Khung Chống Trộm AeroShield Pro',
        slug: 'vali-khoa-khung-aeroshield-pro',
        sku: 'AERO-PRO-06',
        brand: 'Traveler Pro',
        price: 3190000,
        originalPrice: 4200000,
        discountPercent: 24,
        images: [
            'https://images.unsplash.com/photo-1673505705680-36437a06ee27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1786021114316-58bd9b0edfcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
        ],
        colors: [
            { name: 'Xám Titan', hex: '#5A5A5A' },
            { name: 'Đen Mờ', hex: '#2B2B2B' }
        ],
        sizes: ['M', 'L'],
        inStock: true,
        isBestSeller: false,
        isNewArrival: true,
        category: 'suitchase-hard',
        rating: 5.0,
        reviewCount: 19,
        description: 'Thiết kế nguyên khối không khóa kéo (Zipperless), bộ đôi khóa sập kép TSA viền cao su chống nước xâm nhập tuyệt đối.',
        specs: {
            material: '100% German Bayer Polycarbonate',
            weight: '4.2 kg (Size M) / 5.1 kg (Size L)',
            dimensions: '67 x 45 x 27 cm (Size M)',
            capacity: '68 Lít',
            wheels: '8 Bánh xe giảm chấn công nghệ Lisof Nhật',
            lock: 'Bộ kép 2 khóa sập TSA chuẩn Quốc tế',
            warranty: '10 năm 1 đổi 1'
        }
    },
    {
        id: 7,
        name: 'Vali Khung Nhôm Cao Cấp Horizon Titan',
        slug: 'vali-khung-nhom-horizon-titan',
        sku: 'ACC-COV-07',
        brand: 'EcoTrip',
        price: 190000,
        originalPrice: 250000,
        discountPercent: 24,
        images: [
            'https://images.unsplash.com/photo-1786021114316-58bd9b0edfcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1673505705700-e0afd7273fbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
        ],
        colors: [
            { name: 'Đen Trơn', hex: '#000000' },
            { name: 'Họa Tiết Bản Đồ', hex: '#4682B4' }
        ],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        isBestSeller: true,
        isNewArrival: false,
        category: 'accessory',
        rating: 4.5,
        reviewCount: 210,
        description: 'Bao bọc bảo vệ vali khỏi trầy xước, bụi bẩn và rách khi ký gửi tại sân bay. Chất liệu Spandex dày dặn, co giãn 4 chiều.',
        specs: {
            material: 'Vải Spandex + Polyester co giãn',
            weight: '0.2 kg',
            dimensions: 'Tương thích vali 20-30 inch',
            capacity: 'N/A',
            wheels: 'Có lỗ hở cho bánh xe và tay kéo',
            lock: 'Cố định bằng khóa kéo + đai gài đáy',
            warranty: '6 tháng'
        }
    },
    {
        id: 8,
        name: 'Vali Khóa Khung Chống Trộm AeroShield Pro',
        slug: 'vali-khoa-khung-aeroshield-pro',
        sku: 'ACC-KIT-08',
        brand: 'Retro Traveler',
        price: 280000,
        originalPrice: 350000,
        discountPercent: 20,
        images: [
            'https://images.unsplash.com/photo-1673505705700-e0afd7273fbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1786021114316-58bd9b0edfcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1673505705700-e0afd7273fbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
        ],
        colors: [
            { name: 'Hồng Be', hex: '#F5F5DC' },
            { name: 'Xanh Mint', hex: '#98FF98' }
        ],
        sizes: ['S'],
        inStock: false, // Hàng tạm hết
        isBestSeller: false,
        isNewArrival: true,
        category: 'accessory',
        rating: 4.6,
        reviewCount: 38,
        description: 'Túi đựng mỹ phẩm 2 tầng có móc treo tiện lợi, ngăn chia chống nước chuẩn chuyên nghiệp.',
        specs: {
            material: 'Vải Nylon chống thấm nước',
            weight: '0.3 kg',
            dimensions: '24 x 18 x 10 cm',
            capacity: '4 Lít',
            wheels: 'Không',
            lock: 'Khóa kéo đôi',
            warranty: '6 tháng'
        }
    },
    {
        id: 9,
        name: 'Vali Khung Nhôm Cao Cấp Horizon Titan',
        slug: 'vali-khung-nhom-horizon-titan',
        sku: 'HT-2026-BLK',
        brand: 'Traveler Pro',
        price: 2450000,
        originalPrice: 3200000,
        discountPercent: 23,
        images: [
            'https://images.unsplash.com/photo-1673505705680-36437a06ee27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1568571959361-3bffbad07499?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
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
        id: 10,
        name: 'Vali Nhựa Dẻo Chống Đập EcoFlow Ultralight',
        slug: 'vali-nhua-deo-ecoflow-ultralight',
        sku: 'EF-UL-BLU',
        brand: 'EcoTrip',
        price: 1290000,
        originalPrice: 1800000,
        discountPercent: 28,
        images: [
            'https://images.unsplash.com/photo-1568571959361-3bffbad07499?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://plus.unsplash.com/premium_photo-1684407616508-b9e82c8bc8a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1564209906116-fb6887675069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
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
        id: 11,
        name: 'Vali Vải Dù Cao Cấp Executive Business',
        slug: 'vali-vai-du-executive-business',
        sku: 'EX-BUS-01',
        brand: 'Traveler Pro',
        price: 1850000,
        originalPrice: 2100000,
        discountPercent: 12,
        images: [
            'https://images.unsplash.com/photo-1564209906116-fb6887675069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://plus.unsplash.com/premium_photo-1684407616508-b9e82c8bc8a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
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
        id: 12,
        name: 'Vali Trẻ Em Hình Thú Cute Zoo Express',
        slug: 'vali-tre-em-hinh-thu-cute-zoo',
        sku: 'BAG-PU-VTG',
        brand: 'Retro Traveler',
        price: 650000,
        originalPrice: 850000,
        discountPercent: 23,
        images: [
            'https://plus.unsplash.com/premium_photo-1684407616508-b9e82c8bc8a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
            'https://images.unsplash.com/photo-1564209906116-fb6887675069?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
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