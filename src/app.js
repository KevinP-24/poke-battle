import { BattleComponent } from "./components/BattleComponent.js"
import { ThemeToggleComponent } from "./components/ThemeToggleComponent.js"
import { ResultModalComponent } from "./components/ResultModalComponent.js"
import { StorageService } from "./services/StorageService.js"
import { ThemeService } from "./services/ThemeService.js"

export class App {
  constructor(root) {
    this.root = root
    this.storageService = new StorageService()
    this.themeService = new ThemeService(this.storageService)
    this.battleComponent = null
    this.networkListenersAttached = false
    this.offlineModalShown = false
    this.offlineModalElement = null
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
    this.battleComponent = new BattleComponent()

    // La renderizamos
    page.append(header, this.battleComponent.render())

    // La limpiamos
    this.root.innerHTML = ""

    // Y la agregamos
    this.root.append(page)

    this.bindNetworkListeners()
  }

  bindNetworkListeners() {
    if (this.networkListenersAttached) {
      return
    }

    window.addEventListener("offline", () => {
      this.showOfflineModal()
    })

    window.addEventListener("online", () => {
      this.hideOfflineModal()
      this.battleComponent?.loadPokemonData()
    })

    this.networkListenersAttached = true
  }

  showOfflineModal() {
    if (this.offlineModalShown) {
      return
    }

    this.offlineModalShown = true

    const modal = new ResultModalComponent({
      title: "Sin conexion",
      message: "Se perdio la conexion a internet. La app seguira funcionando cuando vuelva la red.",
    })

    const modalElement = modal.render()
    const closeButton = modalElement.querySelector("button")
    closeButton.addEventListener("click", () => {
      this.hideOfflineModal()
    }, { once: true })

    this.offlineModalElement = modalElement
    document.body.append(modalElement)
  }

  hideOfflineModal() {
    this.offlineModalShown = false

    if (this.offlineModalElement) {
      this.offlineModalElement.remove()
      this.offlineModalElement = null
    }
  }
}
