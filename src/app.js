import { BattleComponent, ThemeToggleComponent, ResultModalComponent } from "./components/index.js"
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

  renderizar() {
    // Aplicamos el tema guardado antes de pintar la app.
    this.themeService.cargarTema()

    const page = document.createElement("div")
    page.className = "app"

    const header = document.createElement("header")
    header.className = "app-header"

    const titleImage = document.createElement("img")
    titleImage.src = "./assets/images/batalla.png"
    titleImage.alt = "Pokemon Battle"
    titleImage.className = "app-logo"

    const themeToggle = new ThemeToggleComponent(this.themeService)

    header.append(titleImage, themeToggle.renderizar())

    this.battleComponent = new BattleComponent()

    page.append(header, this.battleComponent.renderizar())

    this.root.innerHTML = ""
    this.root.append(page)

    this.enlazarEscuchasRed()
  }

  enlazarEscuchasRed() {
    if (this.networkListenersAttached) {
      return
    }

    window.addEventListener("offline", () => {
      this.mostrarModalSinConexion()
    })

    window.addEventListener("online", () => {
      this.ocultarModalSinConexion()
      if (this.battleComponent) {
        this.battleComponent.cargarDatosPokemon()
      }
    })

    this.networkListenersAttached = true
  }

  mostrarModalSinConexion() {
    if (this.offlineModalShown) {
      return
    }

    this.offlineModalShown = true

    const modal = new ResultModalComponent({
      title: "Sin conexion",
      message: "Se perdio la conexion a internet. La app seguira funcionando cuando vuelva la red.",
    })

    const modalElement = modal.renderizar()
    const closeButton = modalElement.querySelector("button")
    closeButton.addEventListener(
      "click",
      () => {
        this.ocultarModalSinConexion()
      },
      { once: true }
    )

    this.offlineModalElement = modalElement
    document.body.append(modalElement)
  }

  ocultarModalSinConexion() {
    this.offlineModalShown = false

    if (this.offlineModalElement) {
      this.offlineModalElement.remove()
      this.offlineModalElement = null
    }
  }
}
