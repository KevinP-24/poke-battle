import { PokemonCardComponent } from "./PokemonCardComponent.js"
import { PokemonListComponent } from "./PokemonListComponent.js"
import { ResultModalComponent } from "./ResultModalComponent.js"
import { BattleService } from "../services/BattleService.js"
import { PokemonService } from "../services/PokemonService.js"
import { StorageService } from "../services/StorageService.js"
import { BalancedStrategy } from "../strategies/BalancedStrategy.js"
import { SpeedStrategy } from "../strategies/SpeedStrategy.js"

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

    listas.append(listOne.render(), listTwo.render())

    // Historial basico de batallas guardadas en localStorage.
    this.historyContainer = document.createElement("section")
    this.historyContainer.className = "history"
    this.historyContainer.innerHTML = "<h2>Historial de batallas</h2><p>No hay batallas guardadas.</p>"

    this.element.append(escenario, simulateButton, listas, this.historyContainer)
    
    this.renderHistory();
    
    // Cargamos una sola vez la primera generacion y la compartimos en las dos listas.
    this.pokemonService.getPokemonList(151, 0).then((list) => {
      listOne.setPokemonList(list)
      listTwo.setPokemonList(list)
      listOne.loadPage()
      listTwo.loadPage()
    })
    // Alternativa persistendolos en el local storage
    // this.pokemonService.getPokemonList(151, 0).then((list) => {
    //   listOne.setPokemonList(list)
    //   listTwo.setPokemonList(list)
    //   listOne.loadPage()
    //   listTwo.loadPage()

    //   const selectedPokemon1 = this.storageService.get("selectedPokemon1")
    //   const selectedPokemon2 = this.storageService.get("selectedPokemon2")
    //   if (selectedPokemon1) {
    //     this.pokemonService.getPokemonByName(selectedPokemon1).then((pokemon) => {
    //       this.selectPokemonOne(pokemon)
    //     })
    //   }

    //   if (selectedPokemon2) {
    //     this.pokemonService.getPokemonByName(selectedPokemon2).then((pokemon) => {
    //       this.selectPokemonTwo(pokemon)
    //     })
    //   }
    // })

    return this.element
  }
  // !!!! Pilas no se esta guardando la secion del pokemon en el local storage
  selectPokemonOne(pokemon) {
    // Guardamos el Pokemon uno en memoria y en localStorage.
    this.pokemonOne = pokemon
    this.storageService.save("selectedPokemon1", pokemon.name)

    // Reemplazamos la card vacia por la card del Pokemon seleccionado.
    this.cardOneContainer.innerHTML = ""
    this.cardOneContainer.append(new PokemonCardComponent(pokemon).render())
  }
  // !!!! Pilas no se esta guardando la secion del pokemon en el local storage
  selectPokemonTwo(pokemon) {
    // Guardamos el Pokemon dos en memoria y en localStorage.
    this.pokemonTwo = pokemon
    this.storageService.save("selectedPokemon2", pokemon.name)

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
    // Leemos las batallas guardadas y las pintamos en pantalla.
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
