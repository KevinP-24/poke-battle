import { PaginationComponent } from "./PaginationComponent.js"
import { LoaderComponent } from "./LoaderComponent.js"

export class PokemonListComponent {
  constructor({ title, pokemonService, onSelect }) {
    this.title = title
    this.pokemonService = pokemonService
    this.onSelect = onSelect
    this.page = 1
    this.limit = 8
    this.element = document.createElement("section")
    this.listContainer = document.createElement("div")
  }

  render() {
    this.element.className = "pokemon-list"
    this.element.innerHTML = ""

    const title = document.createElement("h2")
    title.textContent = this.title

    this.listContainer.className = "pokemon-list__items"

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
    const offset = (this.page - 1) * this.limit

    this.listContainer.innerHTML = ""
    this.listContainer.append(loader.render())

    this.pokemonService.getPokemonList(this.limit, offset).then((list) => {
      this.listContainer.innerHTML = ""

      list.forEach((pokemon) => {
        const button = document.createElement("button")
        button.className = "pokemon-list__button"
        button.textContent = pokemon.name
        button.addEventListener("click", () => this.selectPokemon(pokemon.name))
        this.listContainer.append(button)
      })

      this.pagination.update(this.page)
    })
  }

  selectPokemon(name) {
    this.pokemonService.getPokemonByName(name).then((pokemon) => {
      this.onSelect(pokemon)
    })
  }

  prevPage() {
    if (this.page > 1) {
      this.page = this.page - 1
      this.loadPage()
    }
  }

  nextPage() {
    this.page = this.page + 1
    this.loadPage()
  }
}
