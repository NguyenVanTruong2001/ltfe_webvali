const orderList = document.getElementById('orderList')
const tabs = document.querySelectorAll('.historyTab')
const emptyNote = document.getElementById('historyEmpty')

function createElement(tag, className, text) {
  const element = document.createElement(tag)

  if (className) element.className = className
  if (text) element.textContent = text

  return element
}

function renderOrder(order) {
  const info = statusInfo[order.status]
  const first = order.items[0]
  const others = order.items.length - 1

  const card = createElement('li', 'orderCard')
  card.dataset.status = order.status

  const head = createElement('div', 'orderCardHead')
  const code = createElement('div')
  code.append(
    createElement('strong', 'orderCardCode', order.code),
    createElement('span', 'trackMeta', `Đặt ngày ${order.date} lúc ${order.time}`)
  )
  head.append(code, createElement('span', 'statusBadge ' + info.className, info.label))

  const body = createElement('div', 'orderCardBody')
  const thumb = createElement('span', 'summaryThumb')
  thumb.appendChild(createSvg(first, 'summaryImage'))

  const text = createElement('div')
  text.appendChild(createElement('strong', 'summaryName', first.name))
  text.appendChild(createElement('span', 'summaryVariant', first.variant))
  if (others > 0) {
    text.appendChild(createElement('span', 'orderMore', `và ${others} sản phẩm khác`))
  }
  body.append(thumb, text)

  const foot = createElement('div', 'orderCardFoot')
  const total = createElement('p', 'orderCardTotal')
  total.append('Tổng cộng ', createElement('strong', '', formatPrice(getTotal(order))))

  const actions = createElement('div', 'orderCardActions')
  const detail = createElement('a', 'btn btnGhost', 'Xem chi tiết')
  detail.href = 'orderDetail.html?code=' + encodeURIComponent(order.code)
  actions.appendChild(detail)

  if (order.status === 'delivered' || order.status === 'cancelled') {
    const again = createElement('a', 'btn btnPrimary', 'Mua lại')
    again.href = 'productList.html'
    actions.appendChild(again)
  }

  foot.append(total, actions)
  card.append(head, body, foot)

  return card
}

function filterOrders(status) {
  let visible = 0

  tabs.forEach((tab) => {
    const active = tab.dataset.status === status
    tab.classList.toggle('isActive', active)
    tab.setAttribute('aria-pressed', String(active))
  })

  orderList.querySelectorAll('.orderCard').forEach((card) => {
    const show = status === 'all' || card.dataset.status === status
    card.hidden = !show
    if (show) visible++
  })

  emptyNote.hidden = visible > 0
}

orders.forEach((order) => orderList.appendChild(renderOrder(order)))

tabs.forEach((tab) => {
  tab.addEventListener('click', () => filterOrders(tab.dataset.status))
})
