import { PokemonCardComponent } from "./PokemonCardComponent.js"
import { PokemonListComponent } from "./PokemonListComponent.js"
import { ResultModalComponent } from "./ResultModalComponent.js"
import { PaginationComponent } from "./PaginationComponent.js"
import { BattleService } from "../services/BattleService.js"
import { PokemonService } from "../services/PokemonService.js"
import { StorageService } from "../services/StorageService.js"
import { BalancedStrategy } from "../strategies/BalancedStrategy.js"

export class BattleComponent {
  constructor() {
    // Este es el componente principal de la batalla.
    this.element = document.createElement("main")

    // Servicios que usa la batalla.
    this.pokemonService = new PokemonService()
    this.storageService = new StorageService()
    // Se puede selecionar por que factor o condiciones decidir el ganador del combate pokemon
    this.battleService = new BattleService(new BalancedStrategy())

    // Aqui guardamos los dos Pokemon seleccionados.
    this.pokemonOne = null
    this.pokemonTwo = null
    this.listOne = null
    this.listTwo = null
    // Constructor para la paginacion del historial para que quede mas estetico
    this.historyPage = 1
    this.historyLimit = 5
  }

  render() {
    // Limpiamos y volvemos a construir la vista principal.
    this.element.innerHTML = ""
    this.element.className = "battle"

    // Arena donde se ven las dos cards y el VS.
    const escenario = document.createElement("section")
    escenario.className = "battle-arena"

    // Contenedores separados para poder actualizar cada lado.
    this.cardOneContainer = document.createElement("div")
    this.cardTwoContainer = document.createElement("div")
    this.cardOneContainer.className = "battle-arena__player battle-arena__player--left"
    this.cardTwoContainer.className = "battle-arena__player battle-arena__player--right"

    this.cardOneContainer.append(new PokemonCardComponent().render())
    this.cardTwoContainer.append(new PokemonCardComponent().render())

    // Imagen de VS creada tambien desde JavaScript.
    const imagenVS = document.createElement("img")
    imagenVS.className = "versus"
    imagenVS.src = "./assets/images/vs.webp"
    imagenVS.alt = "VS"

    escenario.append(this.cardOneContainer, imagenVS, this.cardTwoContainer)

    // Boton que ejecuta la simulacion de batalla.
    const simulateButton = document.createElement("button")
    simulateButton.className = "primary-button"
    simulateButton.textContent = "Simular batalla"
    simulateButton.addEventListener("click", this.simulateBattle.bind(this))

    // Parte inferior del aplicativo
    // Seccion donde estan las dos listas de seleccion.
    const listas = document.createElement("section")
    listas.className = "selection-grid"

    const listOne = new PokemonListComponent({
      title: "Pokemon 1",
      pokemonService: this.pokemonService,
      onSelect: this.selectPokemonOne.bind(this),
    })

    const listTwo = new PokemonListComponent({
      title: "Pokemon 2",
      pokemonService: this.pokemonService,
      onSelect: this.selectPokemonTwo.bind(this),
    })

    this.listOne = listOne
    this.listTwo = listTwo
    listas.append(listOne.render(), listTwo.render())

    // Historial basico de batallas guardadas en localStorage.
    this.historyContainer = document.createElement("section")
    this.historyContainer.className = "history"
    this.historyContainer.innerHTML = "<h2>Historial de batallas</h2><p>No hay batallas guardadas.</p>"

    this.element.append(escenario, simulateButton, listas, this.historyContainer)

    this.renderHistory()
    this.loadPokemonData()

    return this.element
  }

  loadPokemonData() {
    if (!this.listOne || !this.listTwo) {
      return
    }

    // Cargamos una sola vez la primera generacion y la compartimos en las dos listas.
    this.pokemonService.getPokemonList(151, 0)
      .then((list) => {
        this.listOne.setPokemonList(list)
        this.listTwo.setPokemonList(list)
        this.listOne.loadPage()
        this.listTwo.loadPage()
        this.restoreSelectedPokemon()
      })
      .catch(() => {
        const message = navigator.onLine
          ? "No se pudieron cargar los Pokemon. Intenta de nuevo."
          : "Sin conexion. Conecta internet para cargar la lista."

        this.listOne.showMessage(message)
        this.listTwo.showMessage(message)
        this.restoreSelectedPokemon()
      })
  }

  restoreSelectedPokemon() {
    const selectedPokemon1 = this.storageService.get("selectedPokemon1")
    const selectedPokemon2 = this.storageService.get("selectedPokemon2")

    const restorePokemon = (savedPokemon, onRestore) => {
      if (!savedPokemon) {
        return
      }

      if (typeof savedPokemon === "object" && savedPokemon.name) {
        onRestore(savedPokemon)
        return
      }

      if (!navigator.onLine) {
        return
      }

      this.pokemonService.getPokemonByName(savedPokemon).then(onRestore)
    }

    restorePokemon(selectedPokemon1, this.selectPokemonOne.bind(this))
    restorePokemon(selectedPokemon2, this.selectPokemonTwo.bind(this))
  }

  selectPokemonOne(pokemon) {
    // Guardamos el Pokemon uno en memoria y en localStorage.
    this.pokemonOne = pokemon
    this.storageService.save("selectedPokemon1", pokemon)

    // Reemplazamos la card vacia por la card del Pokemon seleccionado.
    this.cardOneContainer.innerHTML = ""
    this.cardOneContainer.append(new PokemonCardComponent(pokemon).render())
  }

  selectPokemonTwo(pokemon) {
    // Guardamos el Pokemon dos en memoria y en localStorage.
    this.pokemonTwo = pokemon
    this.storageService.save("selectedPokemon2", pokemon)

    // Reemplazamos la card vacia por la card del Pokemon seleccionado.
    this.cardTwoContainer.innerHTML = ""
    this.cardTwoContainer.append(new PokemonCardComponent(pokemon).render())
  }

  simulateBattle() {
    // Validamos que existan dos Pokemon antes de calcular.
    if (!this.pokemonOne || !this.pokemonTwo) {
      const modal = new ResultModalComponent({
        title: "Faltan Pokemon",
        message: "Selecciona dos Pokemon antes de simular la batalla.",
      })
      document.body.append(modal.render())
      return
    }

    // BattleService calcula el ganador con una regla simple.
    const result = this.battleService.battle(this.pokemonOne, this.pokemonTwo)
    let winnerPokemon = null

    // Buscamos el Pokemon completo del ganador para mostrar su card en el modal.
    if (result.winner === this.pokemonOne.name) {
      winnerPokemon = this.pokemonOne
    } else if (result.winner === this.pokemonTwo.name) {
      winnerPokemon = this.pokemonTwo
    }

    // Registro sencillo para guardar en el historial.
    const battleRecord = {
      pokemon1: this.pokemonOne.name,
      pokemon2: this.pokemonTwo.name,
      winner: result.winner,
      reason: result.reason,
      date: new Date().toLocaleDateString(),
    }

    this.storageService.addBattle(battleRecord)
    this.storageService.save("lastBattle", battleRecord)

    // Creamos el modal con el resultado y la card del ganador.
    const modal = new ResultModalComponent({
      title: "Resultado de la batalla",
      result,
      pokemonOne: this.pokemonOne,
      pokemonTwo: this.pokemonTwo,
      winnerPokemon,
    })

    document.body.append(modal.render())
    this.renderHistory()

    // Dejamos la arena limpia para una nueva batalla.
    this.cleanArena()
  }

  cleanArena() {
    // Borramos seleccionados de memoria y localStorage.
    this.pokemonOne = null
    this.pokemonTwo = null
    this.storageService.remove("selectedPokemon1")
    this.storageService.remove("selectedPokemon2")

    // Volvemos a mostrar cards vacias.
    this.cardOneContainer.innerHTML = ""
    this.cardTwoContainer.innerHTML = ""
    this.cardOneContainer.append(new PokemonCardComponent().render())
    this.cardTwoContainer.append(new PokemonCardComponent().render())
  }

  renderHistory() {
    const history = this.storageService.getBattles()
    const maxPage = Math.ceil(history.length / this.historyLimit) || 1
    if (this.historyPage > maxPage) {
      this.historyPage = maxPage
    }
    this.historyContainer.innerHTML = "<h2>Historial de batallas</h2>"
    // Validamos contenido del historial para mostrar mensaje de ser necesario
    if (history.length === 0) {
      const empty = document.createElement("p")
      empty.textContent = "No hay batallas guardadas."
      this.historyContainer.append(empty)
      return
    }
    const start = (this.historyPage - 1) * this.historyLimit
    const end = start + this.historyLimit
    const pageHistory = history.slice(start, end)
    pageHistory.forEach((battle) => {
      const item = document.createElement("article")
      item.className = "history__item"
      item.innerHTML = `
        <div class="history__battle">
          <span>${battle.pokemon1}</span>
          <strong>VS</strong>
          <span>${battle.pokemon2}</span>
        </div>
        <div class="history__winner">
          Ganador: <strong>${battle.winner}</strong>
        </div>
        <p class="history__reason">${battle.reason}</p>
      `
      this.historyContainer.append(item)
    })
    const pagination = new PaginationComponent({
      getPage: () => this.historyPage,
      getMaxPage: () => maxPage,
      onPrev: () => {
        if (this.historyPage > 1) {
          this.historyPage--
          this.renderHistory()
        }
      },
      onNext: () => {
        if (this.historyPage < maxPage) {
          this.historyPage++
          this.renderHistory()
        }
      },
    })
    this.historyContainer.append(pagination.render())
  }
}
