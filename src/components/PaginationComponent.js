export class PaginationComponent {
  constructor({ getPage, getMaxPage, onPrev, onNext }) {
    this.getPage = getPage
    this.getMaxPage = getMaxPage
    this.onPrev = onPrev
    this.onNext = onNext
    this.element = document.createElement("div")
  }

  render() {
    this.element.className = "pagination"

    // Creamos los botones con innerHTML porque es una estructura pequena.
    this.element.innerHTML = `
      <button class="pagination__prev">Anterior</button>
      <span class="pagination__page">Pagina ${this.getPage()}</span>
      <button class="pagination__next">Siguiente</button>
    `

    // Cada boton ejecuta la funcion que recibio en el constructor.
    this.element.querySelector(".pagination__prev").addEventListener("click", this.onPrev)
    this.element.querySelector(".pagination__next").addEventListener("click", this.onNext)

    this.update(this.getPage(), this.getMaxPage())

    return this.element
  }

  update(page, maxPage) {
    // Solo cambiamos el texto de la pagina actual.
    const pageLabel = this.element.querySelector(".pagination__page")
    const prevButton = this.element.querySelector(".pagination__prev")
    const nextButton = this.element.querySelector(".pagination__next")

    pageLabel.textContent = `Pagina ${page}`
    prevButton.disabled = page <= 1
    nextButton.disabled = page >= maxPage
  }
}
