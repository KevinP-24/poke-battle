export class StorageService {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  remove(key) {
    localStorage.removeItem(key)
  }

  get(key, defaultValue) {
    const savedValue = localStorage.getItem(key)

    if (!savedValue) {
      return defaultValue
    }

    return JSON.parse(savedValue)
  }

  addBattle(battle) {
    const history = this.getBattles()
    history.unshift(battle)
    localStorage.setItem("battleHistory", JSON.stringify(history))
  }

  getBattles() {
    return this.get("battleHistory", [])
  }
}
