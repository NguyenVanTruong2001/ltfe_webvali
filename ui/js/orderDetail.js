const params = new URLSearchParams(window.location.search)
const order = orders.find((item) => item.code === params.get('code'))

const body = document.getElementById('detailBody')
const missing = document.getElementById('detailMissing')

function createElement(tag, className, text) {
  const element = document.createElement(tag)

  if (className) element.className = className
  if (text) element.textContent = text

  return element
}

function renderItems(list) {
  order.items.forEach((item) => {
    const row = createElement('li', 'summaryItem')
    const thumb = createElement('span', 'summaryThumb')
    thumb.appendChild(createSvg(item, 'summaryImage'))

    const text = createElement('span')
    text.append(
      createElement('strong', 'summaryName', item.name),
      createElement('span', 'summaryVariant', item.variant)
    )

    row.append(thumb, text, createElement('span', 'summaryPrice', formatPrice(item.price)))
    list.appendChild(row)
  })
}

function renderInfo(list) {
  const rows = [
    ['Người nhận', [order.recipient, order.phone]],
    ['Địa chỉ', [order.address]],
    ['Vận chuyển', [order.shippingName]],
    ['Thanh toán', [order.payment]]
  ]

  rows.forEach(([label, values]) => {
    const item = createElement('div', 'infoItem')
    item.appendChild(createElement('dt', '', label))
    values.forEach((value) => item.appendChild(createElement('dd', '', value)))
    list.appendChild(item)
  })
}

function renderTimeline(list) {
  order.timeline.forEach((entry) => {
    const item = createElement('li', 'timelineItem' + (entry.done ? ' isDone' : ''))
    item.append(createElement('strong', '', entry.title), createElement('span', '', entry.note))
    list.appendChild(item)
  })
}

function renderProgress(list, info) {
  progressSteps.forEach((label, index) => {
    let className = 'progressStep'

    if (order.status === 'delivered' || index < info.step) className += ' isDone'
    else if (index === info.step) className += ' isCurrent'

    const step = createElement('li', className, label)
    if (className.includes('isCurrent')) step.setAttribute('aria-current', 'step')
    list.appendChild(step)
  })
}

function renderRows(list) {
  const rows = [
    ['Tạm tính', formatPrice(getSubtotal(order)), ''],
    ['Phí vận chuyển', order.shipping ? formatPrice(order.shipping) : 'Miễn phí', '']
  ]

  if (order.discount) {
    rows.splice(1, 0, ['Giảm giá', '-' + formatPrice(order.discount), ' isDiscount'])
  }

  rows.forEach(([label, value, extra]) => {
    const row = createElement('div', 'summaryRow' + extra)
    row.append(createElement('dt', '', label), createElement('dd', '', value))
    list.appendChild(row)
  })
}

if (!order) {
  body.hidden = true
  missing.hidden = false
} else {
  const info = statusInfo[order.status]

  document.title = `Đơn hàng ${order.code} - Valigo`
  document.getElementById('detailTitle').textContent = order.code
  document.getElementById('detailMeta').textContent = `Đặt ngày ${order.date} lúc ${order.time}`

  const badge = document.getElementById('detailBadge')
  badge.textContent = info.label
  badge.classList.add(info.className)

  const progress = document.getElementById('detailProgress')
  const cancel = document.getElementById('detailCancel')

  if (order.status === 'cancelled') {
    progress.hidden = true
    cancel.textContent = order.cancelNote
    cancel.hidden = false
  } else {
    renderProgress(progress, info)
  }

  renderItems(document.getElementById('detailItems'))
  renderInfo(document.getElementById('detailInfo'))
  renderTimeline(document.getElementById('detailTimeline'))
  renderRows(document.getElementById('detailRows'))
  document.getElementById('detailTotal').textContent = formatPrice(getTotal(order))

  if (order.status === 'delivered' || order.status === 'cancelled') {
    document.getElementById('detailAgain').hidden = false
  }
}
