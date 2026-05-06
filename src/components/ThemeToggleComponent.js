export class ThemeToggleComponent {
  constructor(themeService) {
    this.themeService = themeService
    this.element = document.createElement("button")
  }

  render() {
    this.element.className = "theme-button"
    this.element.textContent = "Cambiar tema"
    this.element.addEventListener("click", () => {
      this.themeService.toggleTheme()
    })

    return this.element
  }
}
