export class StorageService {
  save(key, value) {
    // localStorage solo guarda texto, por eso usamos JSON.stringify.
    localStorage.setItem(key, JSON.stringify(value))
  }

  remove(key) {
    // Eliminamos un dato guardado.
    localStorage.removeItem(key)
  }

  get(key, defaultValue) {
    // Buscamos un dato. Si no existe, devolvemos un valor por defecto.
    const savedValue = localStorage.getItem(key)

    if (!savedValue) {
      return defaultValue
    }

    try {
      return JSON.parse(savedValue)
    } catch (error) {
      return defaultValue
    }
  }

  addBattle(battle) {
    // Traemos el historial, agregamos la nueva batalla al inicio y guardamos.
    const history = this.getBattles()
    history.unshift(battle)
    localStorage.setItem("battleHistory", JSON.stringify(history))
  }

  getBattles() {
    // Si no hay historial, devolvemos un arreglo vacio.
    return this.get("battleHistory", [])
  }
}
