export class PokemonCardComponent {
  constructor(pokemon = null) {
    // Si pokemon llega null, mostramos la card vacia.
    this.pokemon = pokemon
    this.element = document.createElement("article")
  }

  render() {
    this.element.className = "pokemon-card pokemon"

    // Estado inicial antes de seleccionar un Pokemon.
    if (!this.pokemon) {
      this.element.innerHTML = `
        <div class="pokemon-card__empty">Selecciona un Pokemon</div>
      `
      return this.element
    }

    const stats = this.pokemon.stats
    const firstType = this.pokemon.types[0]
    const types = this.pokemon.types.map((type) => `<p class="${type} tipo">${type}</p>`)
    const pokeId = this.pokemon.id.toString().padStart(3, "0")

    // El primer tipo define el color de fondo y de las barras de estadisticas.
    this.element.style.background = `linear-gradient(to bottom, var(--type-${firstType}) 45%, var(--color-surface) 45%)`
    this.element.style.setProperty("--pokemon-color", `var(--type-${firstType})`)

    // Creamos la estructura visual de la card con datos ya limpios del Adapter.
    this.element.innerHTML = `
      <p class="pokemon-id-back">#${pokeId}</p>
      <div class="pokemon-imagen">
        <img class="pokemon-card__image" src="${this.pokemon.image}" alt="${this.pokemon.name}">
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">#${pokeId}</p>
          <h2 class="pokemon-nombre">${this.pokemon.name}</h2>
        </div>
        <div class="pokemon-tipos">
          ${types.join("")}
        </div>
        <div class="pokemon-stats">
          <p class="stat">${this.pokemon.height}m</p>
          <p class="stat">${this.pokemon.weight}kg</p>
        </div>
        <div class="pokemon-battle-stats">
          ${this.createStatBar("HP", stats.hp)}
          ${this.createStatBar("Ataque", stats.attack)}
          ${this.createStatBar("Defensa", stats.defense)}
          ${this.createStatBar("Velocidad", stats.speed)}
        </div>
      </div>
    `

    return this.element
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
    const maxStat = 150
    const percent = (value * 100) / maxStat

    if (percent > 100) {
      return 100
    }

    return percent
  }
}
