export class PokemonCardComponent {
  constructor(pokemon = null) {
    // Si no llega un Pokemon, mostramos la card vacia.
    this.pokemon = pokemon
    this.element = document.createElement("article")
  }

  render() {
    this.element.className = "pokemon-card pokemon"

    if (!this.pokemon) {
      this.renderEmptyState()
      return this.element
    }

    this.renderPokemonCard()

    return this.element
  }

  renderEmptyState() {
    this.element.innerHTML = `
      <div class="pokemon-card__empty">Selecciona un Pokemon</div>
    `
  }

  renderPokemonCard() {
    const pokemon = this.pokemon
    const stats = pokemon.stats
    const firstType = pokemon.types[0]
    const pokeId = pokemon.id.toString().padStart(3, "0")
    const types = this.renderTypes()

    this.element.innerHTML = `
      <p class="pokemon-id-back">#${pokeId}</p>
      <div class="pokemon-imagen">
        <img class="pokemon-card__image" src="${pokemon.image}" alt="${pokemon.name}">
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">#${pokeId}</p>
          <h2 class="pokemon-nombre">${pokemon.name}</h2>
        </div>
        <div class="pokemon-tipos">
          ${types}
        </div>
        <div class="pokemon-stats">
        <p class="stat">${pokemon.height}m</p>
        <p class="stat">${pokemon.weight}kg</p>
        </div>
        <div class="pokemon-battle-stats">
          ${this.createStatBar("HP", stats.hp)}
          ${this.createStatBar("Ataque", stats.attack)}
          ${this.createStatBar("Defensa", stats.defense)}
          ${this.createStatBar("Velocidad", stats.speed)}
        </div>
      </div>
    `

    // El primer tipo define el color de fondo y de las barras de estadisticas.
    this.element.style.background = `linear-gradient(to bottom, var(--type-${firstType}) 45%, var(--color-surface) 45%)`
    this.element.style.setProperty("--pokemon-color", `var(--type-${firstType})`)
  }

  renderTypes() {
    let types = ""

    for (let i = 0; i < this.pokemon.types.length; i += 1) {
      const type = this.pokemon.types[i]
      types += `<p class="${type} tipo">${type}</p>`
    }

    return types
  }

  createStatBar(label, value) {
    const percent = this.getStatPercent(value)

    // La barra se llena usando el porcentaje calculado desde el valor real.
    return `
      <div class="stat-bar">
        <div class="stat-bar__header">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
        <div class="stat-bar__track">
          <div class="stat-bar__fill" style="width: ${percent}%"></div>
        </div>
      </div>
    `
  }

  getStatPercent(value) {
    // Usamos 150 como maximo visual para que las barras sean faciles de entender.
    return Math.min((value * 100) / 150, 100)
  }
}
