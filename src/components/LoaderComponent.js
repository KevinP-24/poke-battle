export class LoaderComponent {
  constructor(text = "Cargando...") {
    // Texto que queremos mostrar mientras carga la API.
    this.text = text
    this.element = document.createElement("p")
  }

  render() {
    // Este componente solo crea un parrafo sencillo de carga.
    this.element.className = "loader"
    this.element.textContent = this.text
    return this.element
  }
}
