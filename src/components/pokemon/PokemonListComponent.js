import { PaginationComponent } from "../ui/PaginationComponent.js"
import { LoaderComponent } from "../ui/LoaderComponent.js"
import { CANTIDAD_MAXIMA } from "../../utils/constants.js"

export class PokemonListComponent {
  constructor({ title, pokemonService, onSelect }) {
    // Datos que necesita la lista para funcionar.
    this.title = title
    this.pokemonService = pokemonService
    this.onSelect = onSelect

    // Estado de paginacion.
    this.page = 1
    this.limit = 8
    this.maxPage = Math.ceil(CANTIDAD_MAXIMA / this.limit)
    this.pokemonList = []
    this.loadToken = 0

    // Elementos base.
    this.element = document.createElement("section")
    this.listContainer = document.createElement("div")
    this.pagination = null
  }

  render() {
    // Limpiamos y armamos la estructura.
    this.element.className = "pokemon-list"
    this.element.innerHTML = ""

    const titleElement = document.createElement("h2")
    titleElement.textContent = this.title

    this.listContainer.className = "pokemon-list__items"

    this.pagination = new PaginationComponent({
      getPage: () => this.page,
      getMaxPage: () => this.maxPage,
      onPrev: () => this.prevPage(),
      onNext: () => this.nextPage(),
    })

    this.element.append(titleElement, this.listContainer, this.pagination.render())
    return this.element
  }

  setPokemonList(pokemonList) {
    this.pokemonList = pokemonList
    this.maxPage = Math.ceil(this.pokemonList.length / this.limit)
  }

  loadPage() {
    if (!this.pokemonList.length) {
      this.showLoading("Cargando Pokemon...")
      return
    }

    this.renderPage()
  }

  showLoading(message, showSpinner = true) {
    this.listContainer.innerHTML = ""
    this.listContainer.append(new LoaderComponent(message, showSpinner).render())
  }

  showMessage(message) {
    this.page = 1
    this.showLoading(message, false)

    if (this.pagination) {
      this.pagination.update(this.page, 1)
    }
  }

  async renderPage() {
    this.loadToken += 1
    const currentToken = this.loadToken

    const start = (this.page - 1) * this.limit
    const end = start + this.limit
    const pagePokemon = this.pokemonList.slice(start, end)

    this.showLoading("Cargando Pokemon...")

    try {
      const fragment = document.createDocumentFragment()

      for (let i = 0; i < pagePokemon.length; i += 1) {
        if (currentToken !== this.loadToken) {
          return
        }

        const pokemonListItem = pagePokemon[i]
        const pokemon = await this.pokemonService.getPokemonByName(pokemonListItem.name)

        if (currentToken !== this.loadToken) {
          return
        }

        fragment.append(this.createPokemonButton(pokemon))
      }

      if (currentToken !== this.loadToken) {
        return
      }

      this.listContainer.innerHTML = ""
      this.listContainer.append(fragment)
    } catch (error) {
      if (currentToken !== this.loadToken) {
        return
      }

      this.showMessage("No se pudo cargar esta pagina. Revisa tu conexion.")
    }

    if (currentToken === this.loadToken) {
      this.pagination.update(this.page, this.maxPage)
    }
  }

  createPokemonButton(pokemon) {
    const button = document.createElement("button")
    button.type = "button"

    const pokemonId = pokemon.id.toString().padStart(3, "0")
    const pokemonType = pokemon.types[0] || "normal"
    let types = ""

    for (let i = 0; i < pokemon.types.length; i += 1) {
      const type = pokemon.types[i]
      types += `<span class="${type} pokemon-list__type pokemon-list__type--white">${type}</span>`
    }

    button.className = "pokemon-list__button pokemon-list__card"
    button.style.setProperty("--pokemon-list-color", `var(--type-${pokemonType})`)
    button.innerHTML = `
      <div class="pokemon-list__side pokemon-list__side--color"></div>
      <div class="pokemon-list__side pokemon-list__side--white">
        <span class="pokemon-list__id">#${pokemonId}</span>
        <strong class="pokemon-list__name">${pokemon.name}</strong>
        <div class="pokemon-list__types">
          ${types}
        </div>
      </div>
      <img class="pokemon-list__image" src="${pokemon.image}" alt="${pokemon.name}">
    `

    button.addEventListener("click", () => this.selectPokemon(pokemon.name))
    return button
  }

  async selectPokemon(name) {
    try {
      const pokemon = await this.pokemonService.getPokemonByName(name)
      this.onSelect(pokemon)
    } catch (error) {
      this.showMessage("No se pudo cargar el Pokemon. Revisa tu conexion.")
    }
  }

  prevPage() {
    if (this.page <= 1) {
      return
    }

    this.page = this.page - 1
    this.loadPage()
  }

  nextPage() {
    if (this.page >= this.maxPage) {
      return
    }

    this.page = this.page + 1
    this.loadPage()
  }
}
