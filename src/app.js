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

    const page = document.createElement("div")
    page.className = "app"

    const header = document.createElement("header")
    header.className = "app-header"

    const title = document.createElement("h1")
    title.textContent = "Pokemon Battle"

    const themeToggle = new ThemeToggleComponent(this.themeService)

    header.append(title, themeToggle.render())

    const battleComponent = new BattleComponent()

    page.append(header, battleComponent.render())
    this.root.innerHTML = ""
    this.root.append(page)
  }
}
