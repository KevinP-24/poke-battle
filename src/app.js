import { BattleComponent } from "./components/BattleComponent.js"
import { ThemeToggleComponent } from "./components/ThemeToggleComponent.js"
import { StorageService } from "./services/StorageService.js"
import { ThemeService } from "./services/ThemeService.js"

export class App {
  constructor(contenedorPrincipal) {
    this.contenedorPrincipal = contenedorPrincipal

    this.servicioAlmacenamiento = new StorageService()
    this.servicioTema = new ThemeService(this.servicioAlmacenamiento)
  }

  render() {
    this.servicioTema.cargarTema()

    const pagina = document.createElement("div")
    pagina.className = "app"

    const encabezado = document.createElement("header")
    encabezado.className = "app-header"
    const imagenTitulo = document.createElement("img")
    imagenTitulo.src = "./assets/images/batalla.png"
    imagenTitulo.alt = "Batalla Pokemon"
    imagenTitulo.className = "app-logo"

    const botonTema = new ThemeToggleComponent(this.servicioTema)

    encabezado.append(imagenTitulo, botonTema.render())

    const componenteBatalla = new BattleComponent()

    pagina.append(encabezado, componenteBatalla.render())

    this.contenedorPrincipal.innerHTML = ""
    this.contenedorPrincipal.append(pagina)
  }
}
