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

  renderizar() {
    // Limpiamos el contenedor principal.
    this.element.innerHTML = ""
    this.element.className = "battle"

    const arena = document.createElement("section")
    arena.className = "battle-arena"

    // Contenedor del Pokemon 1.
    this.cardOneContainer = document.createElement("div")
    this.cardOneContainer.className = "battle-arena__player battle-arena__player--left"
    this.cardOneContainer.append(new PokemonCardComponent().renderizar())

    // Contenedor del Pokemon 2.
    this.cardTwoContainer = document.createElement("div")
    this.cardTwoContainer.className = "battle-arena__player battle-arena__player--right"
    this.cardTwoContainer.append(new PokemonCardComponent().renderizar())

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
    simulateButton.addEventListener("click", () => this.simularBatalla())

    // Lista de seleccion izquierda.
    this.listOne = new PokemonListComponent({
      title: "Pokemon 1",
      pokemonService: this.pokemonService,
      onSelect: (pokemon) => this.seleccionarPokemonUno(pokemon),
    })

    // Lista de seleccion derecha.
    this.listTwo = new PokemonListComponent({
      title: "Pokemon 2",
      pokemonService: this.pokemonService,
      onSelect: (pokemon) => this.seleccionarPokemonDos(pokemon),
    })

    const lists = document.createElement("section")
    lists.className = "selection-grid"
    lists.append(this.listOne.renderizar(), this.listTwo.renderizar())

    // Zona del historial.
    this.historyContainer = document.createElement("section")
    this.historyContainer.className = "history"
    this.historyContainer.innerHTML = "<h2>Historial de batallas</h2><p>No hay batallas guardadas.</p>"

    this.element.append(arena, simulateButton, lists, this.historyContainer)

    this.renderizarHistorial()
    this.cargarDatosPokemon()

    return this.element
  }

  async cargarDatosPokemon() {
    if (!this.listOne || !this.listTwo) {
      return
    }

    try {
      const lista = await this.pokemonService.obtenerListaPokemon(151, 0)
      this.listOne.establecerListaPokemon(lista)
      this.listTwo.establecerListaPokemon(lista)
      this.listOne.cargarPagina()
      this.listTwo.cargarPagina()
      await this.restaurarPokemonSeleccionados()
    } catch (error) {
      const message = navigator.onLine
        ? "No se pudieron cargar los Pokemon. Intenta de nuevo."
        : "Sin conexion. Conecta internet para cargar la lista."

      this.listOne.mostrarMensaje(message)
      this.listTwo.mostrarMensaje(message)
    }
  }

  async restaurarPokemonSeleccionados() {
    const pokemonGuardadoUno = this.storageService.obtener("selectedPokemon1")
    const pokemonGuardadoDos = this.storageService.obtener("selectedPokemon2")

    if (pokemonGuardadoUno) {
      await this.restaurarPrimerPokemon(pokemonGuardadoUno)
    }

    if (pokemonGuardadoDos) {
      await this.restaurarSegundoPokemon(pokemonGuardadoDos)
    }
  }

  async restaurarPrimerPokemon(pokemonGuardado) {
    if (pokemonGuardado && pokemonGuardado.name) {
      this.seleccionarPokemonUno(pokemonGuardado)
      return
    }

    if (!navigator.onLine) {
      return
    }

    const pokemon = await this.pokemonService.obtenerPokemonPorNombre(pokemonGuardado)
    this.seleccionarPokemonUno(pokemon)
  }

  async restaurarSegundoPokemon(pokemonGuardado) {
    if (pokemonGuardado && pokemonGuardado.name) {
      this.seleccionarPokemonDos(pokemonGuardado)
      return
    }

    if (!navigator.onLine) {
      return
    }

    const pokemon = await this.pokemonService.obtenerPokemonPorNombre(pokemonGuardado)
    this.seleccionarPokemonDos(pokemon)
  }

  seleccionarPokemonUno(pokemon) {
    // Guardamos el primer Pokemon y pintamos su card.
    this.pokemonOne = pokemon
    this.storageService.guardar("selectedPokemon1", pokemon)

    this.cardOneContainer.innerHTML = ""
    this.cardOneContainer.append(new PokemonCardComponent(pokemon).renderizar())
  }

  seleccionarPokemonDos(pokemon) {
    // Guardamos el segundo Pokemon y pintamos su card.
    this.pokemonTwo = pokemon
    this.storageService.guardar("selectedPokemon2", pokemon)

    this.cardTwoContainer.innerHTML = ""
    this.cardTwoContainer.append(new PokemonCardComponent(pokemon).renderizar())
  }

  simularBatalla() {
    // Si falta alguno, mostramos un modal simple.
    if (!this.pokemonOne || !this.pokemonTwo) {
      const modal = new ResultModalComponent({
        title: "Faltan Pokemon",
        message: "Selecciona dos Pokemon antes de simular la batalla.",
      })
      document.body.append(modal.renderizar())
      return
    }

    const resultado = this.battleService.combatir(this.pokemonOne, this.pokemonTwo)
    let pokemonGanador = null

    if (resultado.winner === this.pokemonOne.name) {
      pokemonGanador = this.pokemonOne
    }

    if (resultado.winner === this.pokemonTwo.name) {
      pokemonGanador = this.pokemonTwo
    }

    const registroBatalla = {
      pokemon1: this.pokemonOne.name,
      pokemon2: this.pokemonTwo.name,
      winner: resultado.winner,
      reason: resultado.reason,
      date: new Date().toLocaleDateString(),
    }

    this.storageService.agregarBatalla(registroBatalla)
    this.storageService.guardar("lastBattle", registroBatalla)

    const modal = new ResultModalComponent({
      title: "Resultado de la batalla",
      result: resultado,
      pokemonOne: this.pokemonOne,
      pokemonTwo: this.pokemonTwo,
      winnerPokemon: pokemonGanador,
    })

    document.body.append(modal.renderizar())
    this.renderizarHistorial()
    this.limpiarArena()
  }

  limpiarArena() {
    // Limpiamos memoria y storage para empezar otra vez.
    this.pokemonOne = null
    this.pokemonTwo = null
    this.storageService.eliminar("selectedPokemon1")
    this.storageService.eliminar("selectedPokemon2")

    this.cardOneContainer.innerHTML = ""
    this.cardTwoContainer.innerHTML = ""
    this.cardOneContainer.append(new PokemonCardComponent().renderizar())
    this.cardTwoContainer.append(new PokemonCardComponent().renderizar())
  }

  renderizarHistorial() {
    const historial = this.storageService.obtenerBatallas()
    const paginaMaxima = Math.ceil(historial.length / this.historyLimit) || 1

    if (this.historyPage > paginaMaxima) {
      this.historyPage = paginaMaxima
    }

    this.historyContainer.innerHTML = "<h2>Historial de batallas</h2>"

    if (historial.length === 0) {
      const empty = document.createElement("p")
      empty.textContent = "No hay batallas guardadas."
      this.historyContainer.append(empty)
      return
    }

    const start = (this.historyPage - 1) * this.historyLimit
    const end = start + this.historyLimit
    const historialPagina = historial.slice(start, end)

    historialPagina.forEach((battle) => {
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
      obtenerPagina: () => this.historyPage,
      obtenerMaximaPagina: () => paginaMaxima,
      irAnterior: () => {
        if (this.historyPage > 1) {
          this.historyPage = this.historyPage - 1
          this.renderizarHistorial()
        }
      },
      irSiguiente: () => {
        if (this.historyPage < paginaMaxima) {
          this.historyPage = this.historyPage + 1
          this.renderizarHistorial()
        }
      },
    })

    this.historyContainer.append(pagination.renderizar())
  }
}
