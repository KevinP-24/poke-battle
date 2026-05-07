export class PaginationComponent {
  constructor({ irAnterior, irSiguiente }) {
    this.irAnterior = irAnterior
    this.irSiguiente = irSiguiente
    this.pagina = 1
    this.paginaMaxima = 1
    this.elemento = document.createElement("div")
  }

  render() {
    this.elemento.className = "pagination"

    // Creamos los botones con innerHTML porque es una estructura pequena.
    this.elemento.innerHTML = `
      <button class="pagination__prev">Anterior</button>
      <span class="pagination__page">Pagina ${this.pagina}</span>
      <button class="pagination__next">Siguiente</button>
    `

    // Cada boton ejecuta la funcion que recibio en el constructor.
    this.elemento.querySelector(".pagination__prev").addEventListener("click", this.irAnterior)
    this.elemento.querySelector(".pagination__next").addEventListener("click", this.irSiguiente)

    this.update(1, 1)

    return this.elemento
  }

  update(pagina, paginaMaxima) {
    // Solo cambiamos el texto de la pagina actual.
    this.pagina = pagina
    this.paginaMaxima = paginaMaxima

    const etiquetaPagina = this.elemento.querySelector(".pagination__page")
    const botonAnterior = this.elemento.querySelector(".pagination__prev")
    const botonSiguiente = this.elemento.querySelector(".pagination__next")

    etiquetaPagina.textContent = `Pagina ${this.pagina}`
    botonAnterior.disabled = pagina <= 1
    botonSiguiente.disabled = this.pagina >= this.paginaMaxima
  }
}
