import { PokemonCardComponent } from "../pokemon/PokemonCardComponent.js"
import { PokemonListComponent } from "../pokemon/PokemonListComponent.js"
import { ResultModalComponent } from "./ResultModalComponent.js"
import { PaginationComponent } from "../ui/PaginationComponent.js"
import { BattleService } from "../../services/BattleService.js"
import { PokemonService } from "../../services/PokemonService.js"
import { StorageService } from "../../services/StorageService.js"
import { BalancedStrategy } from "../../strategies/BalancedStrategy.js"

export class BattleComponent {
  constructor() {
    // Componente principal de toda la zona de batalla.
    this.element = document.createElement("main")

    // Servicios que usa esta vista.
    this.pokemonService = new PokemonService()
    this.storageService = new StorageService()
    this.battleService = new BattleService(new BalancedStrategy())

    // Pokemon elegidos por el usuario.
    this.pokemonOne = null
    this.pokemonTwo = null

    // Referencias a las dos listas.
    this.listOne = null
    this.listTwo = null

    // Historial de batallas.
    this.historyPage = 1
    this.historyLimit = 5
  }

  render() {
    // Limpiamos el contenedor principal.
    this.element.innerHTML = ""
    this.element.className = "battle"

    const arena = document.createElement("section")
    arena.className = "battle-arena"

    // Contenedor del Pokemon 1.
    this.cardOneContainer = document.createElement("div")
    this.cardOneContainer.className = "battle-arena__player battle-arena__player--left"
    this.cardOneContainer.append(new PokemonCardComponent().render())

    // Contenedor del Pokemon 2.
    this.cardTwoContainer = document.createElement("div")
    this.cardTwoContainer.className = "battle-arena__player battle-arena__player--right"
    this.cardTwoContainer.append(new PokemonCardComponent().render())

    // Imagen central de VS.
    const versusImage = document.createElement("img")
    versusImage.className = "versus"
    versusImage.src = "./assets/images/vs.webp"
    versusImage.alt = "VS"

    arena.append(this.cardOneContainer, versusImage, this.cardTwoContainer)

    // Boton para iniciar la batalla.
    const simulateButton = document.createElement("button")
    simulateButton.className = "primary-button"
    simulateButton.textContent = "Simular batalla"
    simulateButton.addEventListener("click", () => this.simulateBattle())

    // Lista de seleccion izquierda.
    this.listOne = new PokemonListComponent({
      title: "Pokemon 1",
      pokemonService: this.pokemonService,
      onSelect: (pokemon) => this.selectPokemonOne(pokemon),
    })

    // Lista de seleccion derecha.
    this.listTwo = new PokemonListComponent({
      title: "Pokemon 2",
      pokemonService: this.pokemonService,
      onSelect: (pokemon) => this.selectPokemonTwo(pokemon),
    })

    const lists = document.createElement("section")
    lists.className = "selection-grid"
    lists.append(this.listOne.render(), this.listTwo.render())

    // Zona del historial.
    this.historyContainer = document.createElement("section")
    this.historyContainer.className = "history"
    this.historyContainer.innerHTML = "<h2>Historial de batallas</h2><p>No hay batallas guardadas.</p>"

    this.element.append(arena, simulateButton, lists, this.historyContainer)

    this.renderHistory()
    this.loadPokemonData()

    return this.element
  }

  async loadPokemonData() {
    if (!this.listOne || !this.listTwo) {
      return
    }

    try {
      const list = await this.pokemonService.getPokemonList(151, 0)
      this.listOne.setPokemonList(list)
      this.listTwo.setPokemonList(list)
      this.listOne.loadPage()
      this.listTwo.loadPage()
      await this.restoreSelectedPokemon()
    } catch (error) {
      const message = navigator.onLine
        ? "No se pudieron cargar los Pokemon. Intenta de nuevo."
        : "Sin conexion. Conecta internet para cargar la lista."

      this.listOne.showMessage(message)
      this.listTwo.showMessage(message)
    }
  }

  async restoreSelectedPokemon() {
    const savedPokemonOne = this.storageService.get("selectedPokemon1")
    const savedPokemonTwo = this.storageService.get("selectedPokemon2")

    if (savedPokemonOne) {
      await this.restoreOnePokemon(savedPokemonOne)
    }

    if (savedPokemonTwo) {
      await this.restoreTwoPokemon(savedPokemonTwo)
    }
  }

  async restoreOnePokemon(savedPokemon) {
    if (savedPokemon && savedPokemon.name) {
      this.selectPokemonOne(savedPokemon)
      return
    }

    if (!navigator.onLine) {
      return
    }

    const pokemon = await this.pokemonService.getPokemonByName(savedPokemon)
    this.selectPokemonOne(pokemon)
  }

  async restoreTwoPokemon(savedPokemon) {
    if (savedPokemon && savedPokemon.name) {
      this.selectPokemonTwo(savedPokemon)
      return
    }

    if (!navigator.onLine) {
      return
    }

    const pokemon = await this.pokemonService.getPokemonByName(savedPokemon)
    this.selectPokemonTwo(pokemon)
  }

  selectPokemonOne(pokemon) {
    // Guardamos el primer Pokemon y pintamos su card.
    this.pokemonOne = pokemon
    this.storageService.save("selectedPokemon1", pokemon)

    this.cardOneContainer.innerHTML = ""
    this.cardOneContainer.append(new PokemonCardComponent(pokemon).render())
  }

  selectPokemonTwo(pokemon) {
    // Guardamos el segundo Pokemon y pintamos su card.
    this.pokemonTwo = pokemon
    this.storageService.save("selectedPokemon2", pokemon)

    this.cardTwoContainer.innerHTML = ""
    this.cardTwoContainer.append(new PokemonCardComponent(pokemon).render())
  }

  simulateBattle() {
    // Si falta alguno, mostramos un modal simple.
    if (!this.pokemonOne || !this.pokemonTwo) {
      const modal = new ResultModalComponent({
        title: "Faltan Pokemon",
        message: "Selecciona dos Pokemon antes de simular la batalla.",
      })
      document.body.append(modal.render())
      return
    }

    const result = this.battleService.battle(this.pokemonOne, this.pokemonTwo)
    let winnerPokemon = null

    if (result.winner === this.pokemonOne.name) {
      winnerPokemon = this.pokemonOne
    }

    if (result.winner === this.pokemonTwo.name) {
      winnerPokemon = this.pokemonTwo
    }

    const battleRecord = {
      pokemon1: this.pokemonOne.name,
      pokemon2: this.pokemonTwo.name,
      winner: result.winner,
      reason: result.reason,
      date: new Date().toLocaleDateString(),
    }

    this.storageService.addBattle(battleRecord)
    this.storageService.save("lastBattle", battleRecord)

    const modal = new ResultModalComponent({
      title: "Resultado de la batalla",
      result,
      pokemonOne: this.pokemonOne,
      pokemonTwo: this.pokemonTwo,
      winnerPokemon,
    })

    document.body.append(modal.render())
    this.renderHistory()
    this.cleanArena()
  }

  cleanArena() {
    // Limpiamos memoria y storage para empezar otra vez.
    this.pokemonOne = null
    this.pokemonTwo = null
    this.storageService.remove("selectedPokemon1")
    this.storageService.remove("selectedPokemon2")

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
          this.historyPage = this.historyPage - 1
          this.renderHistory()
        }
      },
      onNext: () => {
        if (this.historyPage < maxPage) {
          this.historyPage = this.historyPage + 1
          this.renderHistory()
        }
      },
    })

    this.historyContainer.append(pagination.render())
  }
}
