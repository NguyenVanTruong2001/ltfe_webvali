const statusInfo = {
  pending: { label: 'Chờ xác nhận', className: 'isPending', step: 0 },
  shipping: { label: 'Đang vận chuyển', className: 'isShipping', step: 2 },
  delivered: { label: 'Đã giao', className: 'isDelivered', step: 3 },
  cancelled: { label: 'Đã hủy', className: 'isCancelled', step: -1 }
}

const progressSteps = ['Đã nhận đơn', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao']

const orders = [
  {
    code: 'VLG-241103-0827',
    date: '03/11/2026',
    time: '16:30',
    status: 'shipping',
    items: [
      { name: 'Vali khung nhôm Atlas A9 cao cấp', variant: 'Bạc, size 24", số lượng 1', price: 1189000, icon: 'suitcase', color: '#B9C3CD' },
      { name: 'Vali khóa kéo Zipra Z8 bản thường', variant: 'Hồng, size 20", số lượng 1', price: 689000, icon: 'suitcase', color: '#F2A7B8' },
      { name: 'Balo laptop Dune 14 inch', variant: 'Xám tro, số lượng 2', price: 1178000, icon: 'backpack', color: '#8C949C' }
    ],
    discount: 305600,
    shipping: 0,
    shippingName: 'Giao tiêu chuẩn, nhận hàng sau 2 đến 4 ngày',
    payment: 'Thanh toán khi nhận hàng (COD)',
    recipient: 'Nguyễn Văn A',
    phone: '0900000000',
    address: '123 Đường Mẫu, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    timeline: [
      { title: 'Đang giao đến bạn', note: '05/11/2026, 08:15 - Bưu cục Quận 1', done: true },
      { title: 'Đã bàn giao cho đơn vị vận chuyển', note: '04/11/2026, 10:05 - Kho Valigo', done: true },
      { title: 'Đã xác nhận đơn hàng', note: '03/11/2026, 16:52', done: true },
      { title: 'Đã nhận đơn hàng', note: '03/11/2026, 16:30', done: true }
    ]
  },
  {
    code: 'VLG-241102-0905',
    date: '02/11/2026',
    time: '09:12',
    status: 'pending',
    items: [
      { name: 'Vali nhựa PP Pebble', variant: 'Xanh navy, size 20", số lượng 1', price: 890000, icon: 'suitcase', color: '#3F5B7A' }
    ],
    discount: 0,
    shipping: 0,
    shippingName: 'Giao tiêu chuẩn, nhận hàng sau 2 đến 4 ngày',
    payment: 'Ví điện tử',
    recipient: 'Nguyễn Văn A',
    phone: '0900000000',
    address: '123 Đường Mẫu, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    timeline: [
      { title: 'Đã nhận đơn hàng', note: '02/11/2026, 09:12', done: true },
      { title: 'Xác nhận qua điện thoại', note: 'Nhân viên sẽ liên hệ trong vòng 30 phút (giờ hành chính)', done: false }
    ]
  },
  {
    code: 'VLG-241018-0412',
    date: '18/10/2026',
    time: '20:45',
    status: 'delivered',
    items: [
      { name: 'Vali nhựa PC Sora', variant: 'Be, size 24", số lượng 1', price: 1290000, icon: 'suitcase', color: '#E3D3BC' }
    ],
    discount: 0,
    shipping: 30000,
    shippingName: 'Giao nhanh, nhận hàng sau 1 đến 2 ngày',
    payment: 'Chuyển khoản ngân hàng',
    recipient: 'Nguyễn Văn A',
    phone: '0900000000',
    address: '45 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh',
    timeline: [
      { title: 'Giao hàng thành công', note: '20/10/2026, 14:20', done: true },
      { title: 'Đang giao đến bạn', note: '20/10/2026, 08:30 - Bưu cục Quận 7', done: true },
      { title: 'Đã bàn giao cho đơn vị vận chuyển', note: '19/10/2026, 10:00 - Kho Valigo', done: true },
      { title: 'Đã xác nhận thanh toán', note: '18/10/2026, 21:10', done: true },
      { title: 'Đã nhận đơn hàng', note: '18/10/2026, 20:45', done: true }
    ]
  },
  {
    code: 'VLG-240925-0178',
    date: '25/09/2026',
    time: '11:05',
    status: 'cancelled',
    items: [
      { name: 'Balo Skyline', variant: 'Đen, số lượng 1', price: 790000, icon: 'backpack', color: '#2C3A47' }
    ],
    discount: 0,
    shipping: 0,
    shippingName: 'Giao tiêu chuẩn, nhận hàng sau 2 đến 4 ngày',
    payment: 'Thanh toán khi nhận hàng (COD)',
    recipient: 'Nguyễn Văn A',
    phone: '0900000000',
    address: '123 Đường Mẫu, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    cancelNote: 'Đơn hàng đã được hủy theo yêu cầu của bạn vào 25/09/2026, 13:40.',
    timeline: [
      { title: 'Đã hủy đơn hàng', note: '25/09/2026, 13:40', done: true },
      { title: 'Đã nhận đơn hàng', note: '25/09/2026, 11:05', done: true }
    ]
  }
]

function formatPrice(value) {
  return value.toLocaleString('vi-VN') + '₫'
}

function getSubtotal(order) {
  return order.items.reduce((sum, item) => sum + item.price, 0)
}

function getTotal(order) {
  return getSubtotal(order) - order.discount + order.shipping
}

function createSvg(item, className) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')

  svg.setAttribute('class', className)
  svg.setAttribute('viewBox', '0 0 200 240')
  svg.setAttribute('aria-hidden', 'true')
  use.setAttribute('href', '#' + item.icon)
  use.style.setProperty('--bodyColor', item.color)
  svg.appendChild(use)

  return svg
}
