export class LoaderComponent {
  constructor(text = "Cargando...", showSpinner = true) {
    // Texto que queremos mostrar mientras carga la API.
    this.text = text
    this.showSpinner = showSpinner
    this.element = document.createElement("p")
  }

  renderizar() {
    this.element.className = "loader"
    this.element.innerHTML = ""
    this.element.style.gridColumn = "1 / -1"
    this.element.style.width = "100%"

    if (this.showSpinner) {
      const spinner = document.createElement("span")
      spinner.className = "loader__spinner"
      this.element.append(spinner)
    }

    const text = document.createElement("span")
    text.className = "loader__text"
    text.textContent = this.text
    this.element.append(text)

    return this.element
  }
}
