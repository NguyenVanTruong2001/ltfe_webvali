document.querySelectorAll('.eyeBtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.getAttribute('aria-controls'))
    const show = input.type === 'password'

    input.type = show ? 'text' : 'password'
    btn.setAttribute('aria-pressed', String(show))
    btn.setAttribute('aria-label', show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu')
  })
})
