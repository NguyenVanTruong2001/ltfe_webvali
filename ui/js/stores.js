const citySelect = document.getElementById('storeCity')
const keywordInput = document.getElementById('storeKeyword')
const count = document.getElementById('storeCount')
const emptyNote = document.getElementById('storeEmpty')
const cards = document.querySelectorAll('.storeCard')

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
}

function filterStores() {
  const city = citySelect.value
  const keyword = normalize(keywordInput.value.trim())
  let visible = 0

  cards.forEach((card) => {
    const matchCity = !city || card.dataset.city === city
    const matchKeyword = !keyword || normalize(card.textContent).includes(keyword)
    const show = matchCity && matchKeyword

    card.hidden = !show
    if (show) visible++
  })

  count.textContent = `${visible} cửa hàng`
  emptyNote.hidden = visible > 0
}

citySelect.addEventListener('change', filterStores)
keywordInput.addEventListener('input', filterStores)

filterStores()
