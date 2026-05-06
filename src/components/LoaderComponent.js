export class LoaderComponent {
  constructor(text = "Cargando...") {
    this.text = text
    this.element = document.createElement("p")
  }

  render() {
    this.element.className = "loader"
    this.element.textContent = this.text
    return this.element
  }
}
