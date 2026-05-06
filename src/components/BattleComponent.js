import { PokemonCardComponent } from "./PokemonCardComponent.js"
import { PokemonListComponent } from "./PokemonListComponent.js"
import { ResultModalComponent } from "./ResultModalComponent.js"
import { BattleService } from "../services/BattleService.js"
import { PokemonService } from "../services/PokemonService.js"
import { StorageService } from "../services/StorageService.js"
import { BalancedStrategy } from "../strategies/BalancedStrategy.js"

export class BattleComponent {
  constructor() {
    this.element = document.createElement("main")
    this.pokemonService = new PokemonService()
    this.storageService = new StorageService()
    this.battleService = new BattleService(new BalancedStrategy())
    this.pokemonOne = null
    this.pokemonTwo = null
  }

  render() {
    this.element.className = "battle"
    this.element.innerHTML = ""

    const arena = document.createElement("section")
    arena.className = "battle-arena"

    this.cardOneContainer = document.createElement("div")
    this.cardTwoContainer = document.createElement("div")
    this.cardOneContainer.className = "battle-arena__player battle-arena__player--left"
    this.cardTwoContainer.className = "battle-arena__player battle-arena__player--right"

    this.cardOneContainer.append(new PokemonCardComponent().render())
    this.cardTwoContainer.append(new PokemonCardComponent().render())

    const versus = document.createElement("img")
    versus.className = "versus"
    versus.src = "./assets/images/vs.webp"
    versus.alt = "VS"

    arena.append(this.cardOneContainer, versus, this.cardTwoContainer)

    const simulateButton = document.createElement("button")
    simulateButton.className = "primary-button"
    simulateButton.textContent = "Simular batalla"
    simulateButton.addEventListener("click", this.simulateBattle.bind(this))

    const lists = document.createElement("section")
    lists.className = "selection-grid"

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

    lists.append(listOne.render(), listTwo.render())

    this.historyContainer = document.createElement("section")
    this.historyContainer.className = "history"
    this.historyContainer.innerHTML = "<h2>Historial de batallas</h2><p>No hay batallas guardadas.</p>"

    this.element.append(arena, simulateButton, lists, this.historyContainer)

    listOne.loadPage()
    listTwo.loadPage()

    return this.element
  }

  selectPokemonOne(pokemon) {
    this.pokemonOne = pokemon
    this.storageService.save("selectedPokemon1", pokemon.name)
    this.cardOneContainer.innerHTML = ""
    this.cardOneContainer.append(new PokemonCardComponent(pokemon).render())
  }

  selectPokemonTwo(pokemon) {
    this.pokemonTwo = pokemon
    this.storageService.save("selectedPokemon2", pokemon.name)
    this.cardTwoContainer.innerHTML = ""
    this.cardTwoContainer.append(new PokemonCardComponent(pokemon).render())
  }

  simulateBattle() {
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
    this.historyContainer.innerHTML = "<h2>Historial de batallas</h2>"

    if (history.length === 0) {
      const empty = document.createElement("p")
      empty.textContent = "No hay batallas guardadas."
      this.historyContainer.append(empty)
      return
    }

    history.forEach((battle) => {
      const item = document.createElement("p")
      item.textContent = `${battle.pokemon1} vs ${battle.pokemon2} - Ganador: ${battle.winner}`
      this.historyContainer.append(item)
    })
  }
}
