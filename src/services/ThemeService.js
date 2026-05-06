export class ThemeService {
  constructor(storageService) {
    this.storageService = storageService
  }

  loadTheme() {
    const theme = this.storageService.get("theme", "light")
    document.documentElement.dataset.theme = theme
  }

  toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme
    let newTheme = "dark"

    if (currentTheme === "dark") {
      newTheme = "light"
    }

    document.documentElement.dataset.theme = newTheme
    this.storageService.save("theme", newTheme)
  }
}
