export class ThemeToggleComponent {
  constructor(themeService) {
    // Recibimos el servicio que sabe cambiar y guardar el tema.
    this.themeService = themeService
    this.element = document.createElement("button")
  }

  render() {
    this.element.className = "theme-button"
    this.element.textContent = "Cambiar tema"

    // Al hacer click, llamamos al servicio. El componente solo maneja el boton.
    this.element.addEventListener("click", () => {
      this.themeService.toggleTheme()
    })

    return this.element
  }
}
