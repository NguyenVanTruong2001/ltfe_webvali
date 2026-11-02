const inputs = document.querySelectorAll('.otpInput')

inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '')
    if (input.value && inputs[index + 1]) inputs[index + 1].focus()
  })

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && !input.value && inputs[index - 1]) inputs[index - 1].focus()
  })
})
