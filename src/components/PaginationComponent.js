export class PaginationComponent {
  constructor({ getPage, getMaxPage, onPrev, onNext }) {
    this.getPage = getPage
    this.getMaxPage = getMaxPage
    this.onPrev = onPrev
    this.onNext = onNext

    this.element = document.createElement("div")
    this.pageLabel = null
    this.prevButton = null
    this.nextButton = null
  }

  render() {
    this.element.className = "pagination"

    this.prevButton = document.createElement("button")
    this.prevButton.className = "pagination__prev"
    this.prevButton.textContent = "Anterior"
    this.prevButton.addEventListener("click", this.onPrev)

    this.pageLabel = document.createElement("span")
    this.pageLabel.className = "pagination__page"

    this.nextButton = document.createElement("button")
    this.nextButton.className = "pagination__next"
    this.nextButton.textContent = "Siguiente"
    this.nextButton.addEventListener("click", this.onNext)

    this.element.append(this.prevButton, this.pageLabel, this.nextButton)
    this.update(this.getPage(), this.getMaxPage())

    return this.element
  }

  update(page, maxPage) {
    // Cambiamos el texto y el estado de los botones.
    this.pageLabel.textContent = `Pagina ${page}`
    this.prevButton.disabled = page <= 1
    this.nextButton.disabled = page >= maxPage
  }
}
