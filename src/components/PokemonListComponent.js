import { PaginationComponent } from "./PaginationComponent.js"
import { LoaderComponent } from "./LoaderComponent.js"

export class PokemonListComponent {
  constructor({ titulo, pokemonService, onSelect }) {
    // Datos que necesita la lista para funcionar.
    this.titulo = titulo
    this.pokemonService = pokemonService
    this.onSelect = onSelect

    // Estado sencillo para controlar la paginacion.
    this.pagina = 1
    this.limite = 8
    this.paginaMaxima = 1
    this.listaPokemon = []

    // Elementos base que se van a reutilizar.
    this.elemento = document.createElement("section")
    this.contenedorLista = document.createElement("div")
  }

  render() {
    // Cada vez que renderizamos, limpiamos el componente.
    this.elemento.className = "pokemon-list"
    this.elemento.innerHTML = ""

    const titulo = document.createElement("h2")
    titulo.textContent = this.titulo

    // Aqui se van a insertar los botones de cada Pokemon.
    this.contenedorLista.className = "pokemon-list__items"

    // La paginacion recibe funciones para cambiar de pagina.
    this.pagination = new PaginationComponent({
      irAnterior: this.paginaAnterior.bind(this),
      irSiguiente: this.paginaSiguiente.bind(this),
    })

    this.elemento.append(titulo, this.contenedorLista, this.pagination.render())

    return this.elemento
  }

  establecerListaPokemon(listaPokemon) {
    this.listaPokemon = listaPokemon
    this.paginaMaxima = Math.ceil(this.listaPokemon.length / this.limite)
  }

  cargarPagina() {
    if (!this.listaPokemon.length) {
      const cargador = new LoaderComponent("Cargando Pokemon...")
      this.contenedorLista.innerHTML = ""
      this.contenedorLista.append(cargador.render())
      return
    }

    this.renderizarPagina()
  }

  renderizarPagina() {
    const inicio = (this.pagina - 1) * this.limite
    const fin = inicio + this.limite
    const pokemonPagina = this.listaPokemon.slice(inicio, fin)

    this.contenedorLista.innerHTML = ""

    // Por cada Pokemon creamos un boton con DOM.
    pokemonPagina.forEach((pokemon) => {
      const boton = document.createElement("button")
      boton.className = "pokemon-list__button"
      boton.textContent = pokemon.name

      // Al hacer click consultamos el detalle completo de ese Pokemon.
      boton.addEventListener("click", () => this.seleccionarPokemon(pokemon.name))
      this.contenedorLista.append(boton)
    })

    this.pagination.update(this.pagina, this.paginaMaxima)
  }

  seleccionarPokemon(nombre) {
    // Pedimos el detalle del Pokemon y avisamos al componente padre.
    this.pokemonService.obtenerPokemonPorNombre(nombre).then((pokemon) => {
      this.onSelect(pokemon)
    })
  }

  paginaAnterior() {
    // Solo podemos retroceder si no estamos en la pagina 1.
    if (this.pagina > 1) {
      this.pagina = this.pagina - 1
      this.cargarPagina()
    }
  }

  paginaSiguiente() {
    // Avanzamos una pagina y volvemos a pedir datos a la API.
    if (this.pagina >= this.paginaMaxima) {
      return
    }

    this.pagina = this.pagina + 1
    this.cargarPagina()
  }
}
