const form = document.getElementById('registerForm')
const status = document.getElementById('formStatus')
const submitBtn = form.querySelector('.submitBtn')

const fullName = document.getElementById('fullName')
const email = document.getElementById('regEmail')
const phone = document.getElementById('regPhone')
const password = document.getElementById('regPassword')
const confirmPw = document.getElementById('regConfirm')
const terms = document.getElementById('regTerms')

const strength = document.getElementById('strength')
const strengthText = document.getElementById('strengthText')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^(0|\+84)\d{9}$/

function setError(input, message) {
  const errorBox = document.getElementById(input.getAttribute('aria-describedby'))
  const hasError = Boolean(message)

  input.setAttribute('aria-invalid', hasError ? 'true' : 'false')
  errorBox.hidden = !hasError
  errorBox.querySelector('span').textContent = message || ''

  return !hasError
}

function checkName() {
  const value = fullName.value.trim()

  if (!value) return setError(fullName, 'Nhập họ và tên của bạn.')
  if (value.length < 2) return setError(fullName, 'Họ và tên quá ngắn.')

  return setError(fullName, '')
}

function checkEmail() {
  const value = email.value.trim()

  if (!value) return setError(email, 'Nhập địa chỉ email.')
  if (!emailPattern.test(value)) return setError(email, 'Email chưa đúng định dạng.')

  return setError(email, '')
}

function checkPhone() {
  const value = phone.value.replace(/[\s.-]/g, '')

  if (!value) return setError(phone, 'Nhập số điện thoại.')
  if (!phonePattern.test(value)) return setError(phone, 'Số điện thoại gồm 10 số, bắt đầu bằng 0.')

  return setError(phone, '')
}

function checkPassword() {
  if (!password.value) return setError(password, 'Tạo mật khẩu cho tài khoản.')
  if (password.value.length < 8) return setError(password, 'Mật khẩu có ít nhất 8 ký tự.')
  if (!/[A-Za-z]/.test(password.value) || !/\d/.test(password.value)) {
    return setError(password, 'Mật khẩu cần có cả chữ và số.')
  }

  return setError(password, '')
}

function checkConfirm() {
  if (!confirmPw.value) return setError(confirmPw, 'Nhập lại mật khẩu để xác nhận.')
  if (confirmPw.value !== password.value) return setError(confirmPw, 'Mật khẩu nhập lại chưa khớp.')

  return setError(confirmPw, '')
}

function checkTerms() {
  const ok = terms.checked
  const errorBox = document.getElementById('regTermsError')

  terms.setAttribute('aria-invalid', ok ? 'false' : 'true')
  errorBox.hidden = ok
  errorBox.querySelector('span').textContent = ok ? '' : 'Bạn cần đồng ý với điều khoản để tiếp tục.'

  return ok
}

// Độ mạnh mật khẩu: 0 = trống, 1..4 = yếu..rất mạnh
function updateStrength() {
  const value = password.value
  const labels = ['Tối thiểu 8 ký tự, gồm chữ và số.', 'Yếu', 'Trung bình', 'Khá mạnh', 'Rất mạnh']
  let score = 0

  if (value) {
    score += value.length >= 8 ? 1 : 0
    score += /[A-Za-z]/.test(value) && /\d/.test(value) ? 1 : 0
    score += /[a-z]/.test(value) && /[A-Z]/.test(value) ? 1 : 0
    score += /[^A-Za-z0-9]/.test(value) || value.length >= 12 ? 1 : 0
    score = Math.max(score, 1)
  }

  strength.dataset.level = String(score)
  strengthText.textContent = labels[score]
}

function showStatus(message, isError) {
  status.textContent = message
  status.classList.toggle('isError', Boolean(isError))
  status.hidden = false
}

form.querySelectorAll('.eyeBtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.getAttribute('aria-controls'))
    const show = input.type === 'password'

    input.type = show ? 'text' : 'password'
    btn.setAttribute('aria-pressed', String(show))
    btn.setAttribute('aria-label', show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu')
    input.focus()
  })
})

// Báo lỗi khi rời ô, và cập nhật lại ngay khi người dùng sửa
const rules = [
  [fullName, checkName],
  [email, checkEmail],
  [phone, checkPhone],
  [password, checkPassword],
  [confirmPw, checkConfirm]
]

rules.forEach(([input, check]) => {
  input.addEventListener('blur', () => input.value && check())
  input.addEventListener('input', () => input.getAttribute('aria-invalid') === 'true' && check())
})

password.addEventListener('input', () => {
  updateStrength()
  if (confirmPw.value) checkConfirm()
})

terms.addEventListener('change', () => terms.getAttribute('aria-invalid') === 'true' && checkTerms())

form.addEventListener('submit', (event) => {
  event.preventDefault()
  status.hidden = true

  const results = rules.map(([input, check]) => [input, check()])
  const termsOk = checkTerms()
  const firstBad = results.find(([, ok]) => !ok)

  if (firstBad || !termsOk) {
    ;(firstBad ? firstBad[0] : terms).focus()
    return
  }

  submitBtn.classList.add('isLoading')
  submitBtn.textContent = 'Đang tạo tài khoản...'

  // Giao diện mẫu: chưa có máy chủ. Khi có API, gọi fetch tại đây.
  setTimeout(() => {
    submitBtn.classList.remove('isLoading')
    submitBtn.textContent = 'Tạo tài khoản'
    showStatus('Giao diện mẫu: thông tin hợp lệ, chưa kết nối máy chủ để tạo tài khoản thật.', false)
  }, 700)
})
