export class ThemeToggleComponent {
  constructor(themeService) {
    this.themeService = themeService
    this.element = document.createElement("button")
  }

  renderizar() {
    this.element.className = "theme-button"
    this.element.innerHTML = `
      <span class="theme-button__indicator">
        <span class="theme-button__icon-container">
          <i class="theme-button__icon fa-solid"></i>
        </span>
      </span>
    `

    this.actualizarIcono()
    this.element.addEventListener("click", () => this.manejarClick())

    return this.element
  }

  manejarClick() {
    this.themeService.alternarTema()
    this.actualizarIcono()
  }

  actualizarIcono() {
    const icon = this.element.querySelector(".theme-button__icon")
    const theme = document.documentElement.dataset.theme

    icon.classList.remove("fa-sun", "fa-moon")

    if (theme === "dark") {
      icon.classList.add("fa-moon")
      return
    }

    icon.classList.add("fa-sun")
  }
}
