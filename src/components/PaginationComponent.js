export class PaginationComponent {
  constructor({ getPage, onPrev, onNext }) {
    // Recibimos funciones desde afuera para no manejar la lista aqui.
    this.getPage = getPage
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

    return this.element
  }

  update(page) {
    // Solo cambiamos el texto de la pagina actual.
    this.element.querySelector(".pagination__page").textContent = `Pagina ${page}`
  }
}
