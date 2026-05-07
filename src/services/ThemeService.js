export class ThemeService {
  constructor(storageService) {
    this.storageService = storageService
  }

  cargarTema() {
    // Leemos el tema guardado y lo ponemos como atributo en <html>.
    const tema = this.storageService.obtener("tema", "light")
    document.documentElement.dataset.theme = tema
  }

  cambiarTema() {
    // Si esta en oscuro pasa a claro, si no pasa a oscuro.
    const temaActual = document.documentElement.dataset.theme
    let temaNuevo = "dark"

    if (temaActual === "dark") {
      temaNuevo = "light"
    }

    // Guardamos el tema para que se mantenga al recargar.
    document.documentElement.dataset.theme = temaNuevo
    this.storageService.guardar("tema", temaNuevo)
  }
}
