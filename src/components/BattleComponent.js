import { PokemonCardComponent } from "./PokemonCardComponent.js"
import { PokemonListComponent } from "./PokemonListComponent.js"
import { ResultModalComponent } from "./ResultModalComponent.js"
import { BattleService } from "../services/BattleService.js"
import { PokemonService } from "../services/PokemonService.js"
import { StorageService } from "../services/StorageService.js"

export class BattleComponent {
  constructor() {
    // Este es el componente principal de la batalla.
    this.elemento = document.createElement("main")

    // Servicios que usa la batalla.
    this.servicioPokemon = new PokemonService()
    this.servicioAlmacenamiento = new StorageService()
    this.servicioBatalla = new BattleService()

    // Aqui guardamos los dos Pokemon seleccionados.
    this.pokemonUno = null
    this.pokemonDos = null
  }

  render() {
    // Limpiamos y volvemos a construir la vista principal.
    this.elemento.className = "battle"
    this.elemento.innerHTML = ""

    // Arena donde se ven las dos cards y el VS.
    const escenario = document.createElement("section")
    escenario.className = "battle-arena"

    // Contenedores separados para poder actualizar cada lado.
    this.contenedorPokemonUno = document.createElement("div")
    this.contenedorPokemonDos = document.createElement("div")
    this.contenedorPokemonUno.className = "battle-arena__player battle-arena__player--left"
    this.contenedorPokemonDos.className = "battle-arena__player battle-arena__player--right"

    this.contenedorPokemonUno.append(new PokemonCardComponent().render())
    this.contenedorPokemonDos.append(new PokemonCardComponent().render())

    // Imagen de VS creada tambien desde JavaScript.
    const imagenVS = document.createElement("img")
    imagenVS.className = "versus"
    imagenVS.src = "./assets/images/vs.webp"
    imagenVS.alt = "VS"

    escenario.append(this.contenedorPokemonUno, imagenVS, this.contenedorPokemonDos)

    // Boton que ejecuta la simulacion de batalla.
    const botonSimular = document.createElement("button")
    botonSimular.className = "primary-button"
    botonSimular.textContent = "Simular batalla"
    botonSimular.addEventListener("click", this.simularBatalla.bind(this))

    // Seccion donde estan las dos listas de seleccion.
    const listas = document.createElement("section")
    listas.className = "selection-grid"

    const listaUno = new PokemonListComponent({
      titulo: "Pokemon Uno",
      pokemonService: this.servicioPokemon,
      onSelect: this.seleccionarPokemonUno.bind(this),
    })

    const listaDos = new PokemonListComponent({
      titulo: "Pokemon Dos",
      pokemonService: this.servicioPokemon,
      onSelect: this.seleccionarPokemonDos.bind(this),
    })

    listas.append(listaUno.render(), listaDos.render())

    // Historial basico de batallas guardadas en localStorage.
    this.contenedorHistorial = document.createElement("section")
    this.contenedorHistorial.className = "history"
    this.contenedorHistorial.innerHTML = "<h2>Historial de batallas</h2><p>No hay batallas guardadas.</p>"

    this.elemento.append(escenario, botonSimular, listas, this.contenedorHistorial)

    // Cargamos una sola vez la primera generacion y la compartimos en las dos listas.
    this.servicioPokemon.obtenerListaPrimeraGeneracion().then((listaPokemon) => {
      listaUno.establecerListaPokemon(listaPokemon)
      listaDos.establecerListaPokemon(listaPokemon)
      listaUno.cargarPagina()
      listaDos.cargarPagina()
    })

    return this.elemento
  }

  seleccionarPokemonUno(pokemon) {
    // Guardamos el Pokemon uno en memoria y en localStorage.
    this.pokemonUno = pokemon
    this.servicioAlmacenamiento.guardar("pokemonSeleccionadoUno", pokemon.nombre)

    // Reemplazamos la card vacia por la card del Pokemon seleccionado.
    this.contenedorPokemonUno.innerHTML = ""
    this.contenedorPokemonUno.append(new PokemonCardComponent(pokemon).render())
  }

  seleccionarPokemonDos(pokemon) {
    // Guardamos el Pokemon dos en memoria y en localStorage.
    this.pokemonDos = pokemon
    this.servicioAlmacenamiento.guardar("pokemonSeleccionadoDos", pokemon.nombre)

    // Reemplazamos la card vacia por la card del Pokemon seleccionado.
    this.contenedorPokemonDos.innerHTML = ""
    this.contenedorPokemonDos.append(new PokemonCardComponent(pokemon).render())
  }

  simularBatalla() {
    // Validamos que existan dos Pokemon antes de calcular.
    if (!this.pokemonUno || !this.pokemonDos) {
      const modal = new ResultModalComponent({
        titulo: "Faltan Pokemon",
        mensaje: "Selecciona dos Pokemon antes de simular la batalla.",
      })
      document.body.append(modal.render())
      return
    }

    // BattleService calcula el ganador con una regla simple.
    const resultado = this.servicioBatalla.resolverBatalla(this.pokemonUno, this.pokemonDos)
    let pokemonGanador = null

    // Buscamos el Pokemon completo del ganador para mostrar su card en el modal.
    if (resultado.ganador === this.pokemonUno.nombre) {
      pokemonGanador = this.pokemonUno
    } else if (resultado.ganador === this.pokemonDos.nombre) {
      pokemonGanador = this.pokemonDos
    }

    // Registro sencillo para guardar en el historial.
    const registroBatalla = {
      pokemon1: this.pokemonUno.nombre,
      pokemon2: this.pokemonDos.nombre,
      ganador: resultado.ganador,
      motivo: resultado.motivo,
      fecha: new Date().toLocaleDateString(),
    }

    this.servicioAlmacenamiento.agregarBatalla(registroBatalla)

    // Creamos el modal con el resultado y la card del ganador.
    const modal = new ResultModalComponent({
      titulo: "Resultado de la batalla",
      resultado,
      pokemonUno: this.pokemonUno,
      pokemonDos: this.pokemonDos,
      pokemonGanador,
    })

    document.body.append(modal.render())
    this.renderizarHistorial()

    // Dejamos la arena limpia para una nueva batalla.
    this.limpiarEscenario()
  }

  limpiarEscenario() {
    // Borramos seleccionados de memoria y localStorage.
    this.pokemonUno = null
    this.pokemonDos = null
    this.servicioAlmacenamiento.eliminar("pokemonSeleccionadoUno")
    this.servicioAlmacenamiento.eliminar("pokemonSeleccionadoDos")

    // Volvemos a mostrar cards vacias.
    this.contenedorPokemonUno.innerHTML = ""
    this.contenedorPokemonDos.innerHTML = ""
    this.contenedorPokemonUno.append(new PokemonCardComponent().render())
    this.contenedorPokemonDos.append(new PokemonCardComponent().render())
  }

  renderizarHistorial() {
    // Leemos las batallas guardadas y las pintamos en pantalla.
    const historial = this.servicioAlmacenamiento.obtenerBatallas()
    this.contenedorHistorial.innerHTML = "<h2>Historial de batallas</h2>"

    if (historial.length === 0) {
      const vacio = document.createElement("p")
      vacio.textContent = "No hay batallas guardadas."
      this.contenedorHistorial.append(vacio)
      return
    }

    historial.forEach((batalla) => {
      const item = document.createElement("p")
      item.textContent = `${batalla.pokemon1} vs ${batalla.pokemon2} - Ganador: ${batalla.ganador}`
      this.contenedorHistorial.append(item)
    })
  }
}
