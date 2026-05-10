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
    // Aplicamos el tema guardado antes de pintar la app.
    this.themeService.loadTheme()

    const page = document.createElement("div")
    page.className = "app"

    const header = document.createElement("header")
    header.className = "app-header"

    const titleImage = document.createElement("img")
    titleImage.src = "./assets/images/batalla.png"
    titleImage.alt = "Pokemon Battle"
    titleImage.className = "app-logo"

    const themeToggle = new ThemeToggleComponent(this.themeService)

    header.append(titleImage, themeToggle.render())

    this.battleComponent = new BattleComponent()

    page.append(header, this.battleComponent.render())

    this.root.innerHTML = ""
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
      if (this.battleComponent) {
        this.battleComponent.loadPokemonData()
      }
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
    closeButton.addEventListener(
      "click",
      () => {
        this.hideOfflineModal()
      },
      { once: true }
    )

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
