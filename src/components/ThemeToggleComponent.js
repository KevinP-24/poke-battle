export class ThemeToggleComponent {
  constructor(servicioTema) {
    this.servicioTema = servicioTema
    this.elemento = document.createElement("button")
  }
  render() {
    this.elemento.className = "theme-button"
    this.elemento.innerHTML = `
      <span class="theme-button__indicator">
        <span class="theme-button__icon-container">
          <i class="theme-button__icon fa-solid"></i>
        </span>
      </span>
    `
    this.actualizarIcono()
    this.elemento.addEventListener("click", () => {
      this.servicioTema.cambiarTema()
      this.actualizarIcono()
    })
    return this.elemento
  }

  actualizarIcono() {
    const icono = this.elemento.querySelector(".theme-button__icon")
    const tema = document.documentElement.dataset.theme
    icono.classList.remove("fa-sun", "fa-moon")
    if (tema === "dark") {
      icono.classList.add("fa-moon")
    } else {
      icono.classList.add("fa-sun")
    }
  }
}
