const tabs = document.querySelectorAll('.newsTab')
const cards = document.querySelectorAll('.newsCard')
const emptyNote = document.getElementById('newsEmpty')

function selectTopic(topic) {
  let visible = 0

  tabs.forEach((tab) => {
    const active = tab.dataset.topic === topic
    tab.classList.toggle('isActive', active)
    tab.setAttribute('aria-pressed', String(active))
  })

  cards.forEach((card) => {
    const show = topic === 'all' || card.dataset.topic === topic
    card.hidden = !show
    if (show) visible++
  })

  emptyNote.hidden = visible > 0
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => selectTopic(tab.dataset.topic))
})

const params = new URLSearchParams(window.location.search)
const topic = params.get('topic')

if (topic && document.querySelector(`.newsTab[data-topic="${topic}"]`)) {
  selectTopic(topic)
}
