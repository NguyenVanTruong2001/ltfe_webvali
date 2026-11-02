const form = document.getElementById('loginForm')
const status = document.getElementById('formStatus')
const submitBtn = form.querySelector('.submitBtn')
const loginId = document.getElementById('loginId')
const password = document.getElementById('loginPassword')
const eyeBtn = form.querySelector('.eyeBtn')

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

function checkLoginId() {
  const value = loginId.value.trim()

  if (!value) {
    return setError(loginId, 'Nhập email hoặc số điện thoại đã đăng ký.')
  }

  if (!emailPattern.test(value) && !phonePattern.test(value.replace(/[\s.-]/g, ''))) {
    return setError(loginId, 'Email hoặc số điện thoại chưa đúng định dạng.')
  }

  return setError(loginId, '')
}

function checkPassword() {
  if (!password.value) {
    return setError(password, 'Nhập mật khẩu của bạn.')
  }

  if (password.value.length < 6) {
    return setError(password, 'Mật khẩu có ít nhất 6 ký tự.')
  }

  return setError(password, '')
}

function showStatus(message, isError) {
  status.textContent = message
  status.classList.toggle('isError', Boolean(isError))
  status.hidden = false
}

eyeBtn.addEventListener('click', () => {
  const show = password.type === 'password'

  password.type = show ? 'text' : 'password'
  eyeBtn.setAttribute('aria-pressed', String(show))
  eyeBtn.setAttribute('aria-label', show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu')
  password.focus()
})

loginId.addEventListener('blur', () => loginId.value && checkLoginId())
password.addEventListener('blur', () => password.value && checkPassword())
loginId.addEventListener('input', () => loginId.getAttribute('aria-invalid') === 'true' && checkLoginId())
password.addEventListener('input', () => password.getAttribute('aria-invalid') === 'true' && checkPassword())

form.addEventListener('submit', (event) => {
  event.preventDefault()
  status.hidden = true

  const idOk = checkLoginId()
  const passOk = checkPassword()

  if (!idOk || !passOk) {
    ;(idOk ? password : loginId).focus()
    return
  }

  submitBtn.classList.add('isLoading')
  submitBtn.textContent = 'Đang đăng nhập...'

  setTimeout(() => {
    submitBtn.classList.remove('isLoading')
    submitBtn.textContent = 'Đăng nhập'
    showStatus('Giao diện mẫu: thông tin hợp lệ, chưa kết nối máy chủ để đăng nhập thật.', false)
  }, 700)
})
