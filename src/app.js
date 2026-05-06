import { BattleComponent } from "./components/BattleComponent.js"
import { ThemeToggleComponent } from "./components/ThemeToggleComponent.js"
import { StorageService } from "./services/StorageService.js"
import { ThemeService } from "./services/ThemeService.js"

export class App {
  constructor(root) {
    // Guardamos el contenedor principal donde se va a mostrar la app.
    this.root = root

    // Creamos servicios que se usan desde el inicio de la aplicacion.
    this.storageService = new StorageService()
    this.themeService = new ThemeService(this.storageService)
  }

  render() {
    // Antes de pintar la pagina, cargamos el tema guardado.
    this.themeService.loadTheme()

    // Creamos los elementos principales con manejo del DOM.
    const page = document.createElement("div")
    page.className = "app"

    const header = document.createElement("header")
    header.className = "app-header"

    const title = document.createElement("h1")
    title.textContent = "Pokemon Battle"

    const themeToggle = new ThemeToggleComponent(this.themeService)

    header.append(title, themeToggle.render())

    const battleComponent = new BattleComponent()

    // Metemos el header y el componente principal dentro de la pagina.
    page.append(header, battleComponent.render())

    // Limpiamos el root y agregamos la pagina nueva.
    this.root.innerHTML = ""
    this.root.append(page)
  }
}
