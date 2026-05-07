import { PaginationComponent } from "./PaginationComponent.js"
import { LoaderComponent } from "./LoaderComponent.js"
import { FIRST_GEN_POKEMON_COUNT } from "../utils/constants.js"

export class PokemonListComponent {
  constructor({ title, pokemonService, onSelect }) {
    // Datos que necesita la lista para funcionar.
    this.title = title
    this.pokemonService = pokemonService
    this.onSelect = onSelect

    // Estado sencillo para controlar la paginacion.
    this.page = 1
    this.limit = 8
    this.maxPage = Math.ceil(FIRST_GEN_POKEMON_COUNT / this.limit)
    this.pokemonList = []

    // Elementos base que se van a reutilizar.
    this.element = document.createElement("section")
    this.listContainer = document.createElement("div")
  }

  render() {
    // Cada vez que renderizamos, limpiamos el componente.
    this.element.className = "pokemon-list"
    this.element.innerHTML = ""

    const title = document.createElement("h2")
    title.textContent = this.title

    // Aqui se van a insertar los botones de cada Pokemon.
    this.listContainer.className = "pokemon-list__items"

    // La paginacion recibe funciones para cambiar de pagina.
    this.pagination = new PaginationComponent({
      getPage: () => this.page,
      getMaxPage: () => this.maxPage,
      onPrev: this.prevPage.bind(this),
      onNext: this.nextPage.bind(this),
    })

    this.element.append(title, this.listContainer, this.pagination.render())

    return this.element
  }

  setPokemonList(pokemonList) {
    this.pokemonList = pokemonList
    this.maxPage = Math.ceil(this.pokemonList.length / this.limit)
  }

  loadPage() {
    if (!this.pokemonList.length) {
      const loader = new LoaderComponent("Cargando Pokemon...")
      this.listContainer.innerHTML = ""
      this.listContainer.append(loader.render())
      return
    }

    this.renderPage()
  }

  renderPage() {
    const start = (this.page - 1) * this.limit
    const end = start + this.limit
    const pagePokemon = this.pokemonList.slice(start, end)

    this.listContainer.innerHTML = ""

    // Por cada Pokemon creamos un boton con DOM.
    pagePokemon.forEach((pokemon) => {
      const button = document.createElement("button")
      button.className = "pokemon-list__button"
      button.textContent = pokemon.name

      // Al hacer click consultamos el detalle completo de ese Pokemon.
      button.addEventListener("click", () => this.selectPokemon(pokemon.name))
      this.listContainer.append(button)
    })

    this.pagination.update(this.page, this.maxPage)
  }

  selectPokemon(name) {
    // Pedimos el detalle del Pokemon y avisamos al componente padre.
    this.pokemonService.getPokemonByName(name).then((pokemon) => {
      this.onSelect(pokemon)
    })
  }

  prevPage() {
    // Solo podemos retroceder si no estamos en la pagina 1.
    if (this.page > 1) {
      this.page = this.page - 1
      this.loadPage()
    }
  }

  nextPage() {
    // Avanzamos una pagina y volvemos a pedir datos a la API.
    if (this.page >= this.maxPage) {
      return
    }

    this.page = this.page + 1
    this.loadPage()
  }
}
