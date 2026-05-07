import { BattleComponent } from "./components/BattleComponent.js"
import { ThemeToggleComponent } from "./components/ThemeToggleComponent.js"
import { StorageService } from "./services/StorageService.js"
import { ThemeService } from "./services/ThemeService.js"

export class App {
  constructor(root) {
    this.root = root
    this.storageService = new StorageService()
    this.themeService = new ThemeService(this.storageService)
  }

  render() {
    this.themeService.loadTheme()
    // Div donde esta contenido todo el aplicativo
    const page = document.createElement("div")
    page.className = "app"
    // Header donde metemos la imagen o titulo y el boton toggle para cambiar tema
    const header = document.createElement("header")
    header.className = "app-header"
    // Logo de batalla pokemon
    const titleImage = document.createElement("img")
    titleImage.src = "./assets/images/batalla.png"
    titleImage.alt = "Pokemon Battle"
    titleImage.className = "app-logo"

    const themeToggle = new ThemeToggleComponent(this.themeService)
    // Renderizamos el header para que se vea
    header.append(titleImage, themeToggle.render())
    // Creamos la parte inferior donde va estar contenida la batalla con la lista
    const battleComponent = new BattleComponent()
    //La renderizamos
    page.append(header, battleComponent.render())
    // La limpiamos 
    this.root.innerHTML = ""
    // y la agregamos
    this.root.append(page)
  }
}
