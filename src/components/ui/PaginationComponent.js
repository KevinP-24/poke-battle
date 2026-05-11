export class PaginationComponent {
  constructor({ obtenerPagina, obtenerMaximaPagina, irAnterior, irSiguiente }) {
    this.obtenerPagina = obtenerPagina
    this.obtenerMaximaPagina = obtenerMaximaPagina
    this.irAnterior = irAnterior
    this.irSiguiente = irSiguiente

    this.element = document.createElement("div")
    this.pageLabel = null
    this.prevButton = null
    this.nextButton = null
  }

  renderizar() {
    this.element.className = "pagination"

    this.prevButton = document.createElement("button")
    this.prevButton.className = "pagination__prev"
    this.prevButton.textContent = "Anterior"
    this.prevButton.addEventListener("click", this.irAnterior)

    this.pageLabel = document.createElement("span")
    this.pageLabel.className = "pagination__page"

    this.nextButton = document.createElement("button")
    this.nextButton.className = "pagination__next"
    this.nextButton.textContent = "Siguiente"
    this.nextButton.addEventListener("click", this.irSiguiente)

    this.element.append(this.prevButton, this.pageLabel, this.nextButton)
    this.actualizar(this.obtenerPagina(), this.obtenerMaximaPagina())

    return this.element
  }

  actualizar(pagina, paginaMaxima) {
    // Cambiamos el texto y el estado de los botones.
    this.pageLabel.textContent = `Pagina ${pagina}`
    this.prevButton.disabled = pagina <= 1
    this.nextButton.disabled = pagina >= paginaMaxima
  }
}
