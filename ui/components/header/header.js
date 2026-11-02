const headerBaseUrl = document.currentScript.src

class SiteHeader extends HTMLElement {
  async connectedCallback() {
    const current = this.getAttribute('current')

    try {
      const response = await fetch(new URL('header.html', headerBaseUrl))

      if (!response.ok) {
        throw new Error(response.status)
      }

      this.innerHTML = await response.text()
    } catch (error) {
      this.innerHTML = '<p class="includeError">Không tải được header. Hãy mở trang bằng WebStorm hoặc chạy npm run dev.</p>'
      return
    }

    const currentLink = current ? this.querySelector(`[data-nav="${current}"]`) : null

    if (currentLink) {
      currentLink.classList.add('isCurrent')
    }

    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    }
  }
}

customElements.define('site-header', SiteHeader)
