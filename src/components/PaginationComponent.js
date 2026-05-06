export class PaginationComponent {
  constructor({ getPage, onPrev, onNext }) {
    this.getPage = getPage
    this.onPrev = onPrev
    this.onNext = onNext
    this.element = document.createElement("div")
  }

  render() {
    this.element.className = "pagination"
    this.element.innerHTML = `
      <button class="pagination__prev">Anterior</button>
      <span class="pagination__page">Pagina ${this.getPage()}</span>
      <button class="pagination__next">Siguiente</button>
    `

    this.element.querySelector(".pagination__prev").addEventListener("click", this.onPrev)
    this.element.querySelector(".pagination__next").addEventListener("click", this.onNext)

    return this.element
  }

  update(page) {
    this.element.querySelector(".pagination__page").textContent = `Pagina ${page}`
  }
}
