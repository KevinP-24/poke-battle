export class ThemeService {
  constructor(storageService) {
    this.storageService = storageService
  }

  loadTheme() {
    // Leemos el tema guardado y lo ponemos como atributo en <html>.
    const theme = this.storageService.get("theme", "light")
    document.documentElement.dataset.theme = theme
  }

  toggleTheme() {
    // Si esta en oscuro pasa a claro, si no pasa a oscuro.
    const currentTheme = document.documentElement.dataset.theme
    let newTheme = "dark"

    if (currentTheme === "dark") {
      newTheme = "light"
    }

    // Guardamos el tema para que se mantenga al recargar.
    document.documentElement.dataset.theme = newTheme
    this.storageService.save("theme", newTheme)
  }
}
