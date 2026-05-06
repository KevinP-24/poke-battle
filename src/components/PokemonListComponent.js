import { PaginationComponent } from "./PaginationComponent.js"
import { LoaderComponent } from "./LoaderComponent.js"

export class PokemonListComponent {
  constructor({ title, pokemonService, onSelect }) {
    // Datos que necesita la lista para funcionar.
    this.title = title
    this.pokemonService = pokemonService
    this.onSelect = onSelect

    // Estado sencillo para controlar la paginacion.
    this.page = 1
    this.limit = 8

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
      onPrev: this.prevPage.bind(this),
      onNext: this.nextPage.bind(this),
    })

    this.element.append(title, this.listContainer, this.pagination.render())

    return this.element
  }

  loadPage() {
    const loader = new LoaderComponent("Cargando Pokemon...")

    // Offset le dice a la API desde que Pokemon empezar.
    const offset = (this.page - 1) * this.limit

    // Mostramos cargando mientras llega la respuesta de la API.
    this.listContainer.innerHTML = ""
    this.listContainer.append(loader.render())

    this.pokemonService.getPokemonList(this.limit, offset).then((list) => {
      this.listContainer.innerHTML = ""

      // Por cada Pokemon creamos un boton con DOM.
      list.forEach((pokemon) => {
        const button = document.createElement("button")
        button.className = "pokemon-list__button"
        button.textContent = pokemon.name

        // Al hacer click consultamos el detalle completo de ese Pokemon.
        button.addEventListener("click", () => this.selectPokemon(pokemon.name))
        this.listContainer.append(button)
      })

      this.pagination.update(this.page)
    })
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
    this.page = this.page + 1
    this.loadPage()
  }
}
