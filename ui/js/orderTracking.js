const form = document.getElementById('trackForm')
const orderCode = document.getElementById('orderCode')
const phone = document.getElementById('trackPhone')
const status = document.getElementById('trackStatus')
const result = document.getElementById('trackResult')

const phonePattern = /^(0|\+84)\d{9}$/
const sampleCode = 'VLG-241103-0827'

function showError(message, input) {
  status.textContent = message
  status.hidden = false
  result.hidden = true

  orderCode.setAttribute('aria-invalid', input === orderCode ? 'true' : 'false')
  phone.setAttribute('aria-invalid', input === phone ? 'true' : 'false')
  input.focus()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const code = orderCode.value.trim().toUpperCase()
  const number = phone.value.replace(/[\s.-]/g, '')

  if (!code) {
    return showError('Nhập mã đơn hàng trong email xác nhận.', orderCode)
  }

  if (!phonePattern.test(number)) {
    return showError('Số điện thoại chưa đúng định dạng.', phone)
  }

  if (code !== sampleCode) {
    return showError('Không tìm thấy đơn hàng. Kiểm tra lại mã đơn và số điện thoại.', orderCode)
  }

  status.hidden = true
  orderCode.setAttribute('aria-invalid', 'false')
  phone.setAttribute('aria-invalid', 'false')
  result.hidden = false
  result.scrollIntoView({ behavior: 'smooth', block: 'start' })
})
