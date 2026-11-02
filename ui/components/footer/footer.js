const footerBaseUrl = document.currentScript.src

class SiteFooter extends HTMLElement {
  async connectedCallback() {
    try {
      const response = await fetch(new URL('footer.html', footerBaseUrl))

      if (!response.ok) {
        throw new Error(response.status)
      }

      this.innerHTML = await response.text()
    } catch (error) {
      this.innerHTML = '<p class="includeError">Không tải được footer. Hãy mở trang bằng WebStorm hoặc chạy npm run dev.</p>'
    }
  }
}

customElements.define('site-footer', SiteFooter)
