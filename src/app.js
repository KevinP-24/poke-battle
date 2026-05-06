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
    this.themeService.loadTheme()

    const page = document.createElement("div")
    page.className = "app"

    const header = document.createElement("header")
    header.className = "app-header"
    //Creacion de imagen con el DOM
    const titleImage = document.createElement("img");
    titleImage.src = "./assets/images/batalla.png"; 
    titleImage.alt = "Pokemon Battle";
    titleImage.className = "app-logo"; // Opcional: para darle estilos en CSS

    const themeToggle = new ThemeToggleComponent(this.themeService)

    // 2. Agregamos la imagen al header (quitamos 'title')
    header.append(titleImage, themeToggle.render())

    const battleComponent = new BattleComponent()

    page.append(header, battleComponent.render())

    this.root.innerHTML = ""
    this.root.append(page)
  }
}
