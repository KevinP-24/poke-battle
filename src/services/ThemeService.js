export class ThemeService {
  constructor(storageService) {
    this.storageService = storageService
  }

  cargarTema() {
    // Leemos el tema guardado y lo ponemos en <html>.
    const tema = this.storageService.obtener("theme", "light")
    document.documentElement.dataset.theme = tema
  }

  alternarTema() {
    // Cambiamos entre claro y oscuro.
    const temaActual = document.documentElement.dataset.theme
    let nuevoTema = "dark"

    if (temaActual === "dark") {
      nuevoTema = "light"
    }

    // Guardamos el tema para que se mantenga al recargar.
    document.documentElement.dataset.theme = nuevoTema
    this.storageService.guardar("theme", nuevoTema)
  }
}
