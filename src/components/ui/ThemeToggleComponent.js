export class ThemeToggleComponent {
  constructor(themeService) {
    this.themeService = themeService
    this.element = document.createElement("button")
  }

  render() {
    this.element.className = "theme-button"
    this.element.innerHTML = `
      <span class="theme-button__indicator">
        <span class="theme-button__icon-container">
          <i class="theme-button__icon fa-solid"></i>
        </span>
      </span>
    `

    this.updateIcon()
    this.element.addEventListener("click", () => this.handleClick())

    return this.element
  }

  handleClick() {
    this.themeService.toggleTheme()
    this.updateIcon()
  }

  updateIcon() {
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
