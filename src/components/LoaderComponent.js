export class LoaderComponent {
  constructor(texto = "Cargando...") {
    // Texto que queremos mostrar mientras carga la API.
    this.texto = texto
    this.elemento = document.createElement("p")
  }

  render() {
    // Este componente solo crea un parrafo sencillo de carga.
    this.elemento.className = "loader"
    this.elemento.textContent = this.texto
    return this.elemento
  }
}
