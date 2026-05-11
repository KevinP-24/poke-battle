export class PokemonCardComponent {
  constructor(pokemon = null) {
    // Si no llega un Pokemon, mostramos la card vacia.
    this.pokemon = pokemon
    this.element = document.createElement("article")
  }

  renderizar() {
    this.element.className = "pokemon-card pokemon"

    if (!this.pokemon) {
      this.renderizarEstadoVacio()
      return this.element
    }

    this.renderizarTarjetaPokemon()

    return this.element
  }

  renderizarEstadoVacio() {
    this.element.innerHTML = `
      <div class="pokemon-card__empty">Selecciona un Pokemon</div>
    `
  }

  renderizarTarjetaPokemon() {
    const pokemon = this.pokemon
    const stats = pokemon.stats
    const firstType = pokemon.types[0]
    const pokeId = pokemon.id.toString().padStart(3, "0")
    const tipos = this.renderizarTipos()

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
          ${tipos}
        </div>
        <div class="pokemon-stats">
        <p class="stat">${pokemon.height}m</p>
        <p class="stat">${pokemon.weight}kg</p>
        </div>
        <div class="pokemon-battle-stats">
          ${this.crearBarraEstadistica("HP", stats.hp)}
          ${this.crearBarraEstadistica("Ataque", stats.attack)}
          ${this.crearBarraEstadistica("Defensa", stats.defense)}
          ${this.crearBarraEstadistica("Velocidad", stats.speed)}
        </div>
      </div>
    `

    // El primer tipo define el color de fondo y de las barras de estadisticas.
    this.element.style.background = `linear-gradient(to bottom, var(--type-${firstType}) 45%, var(--color-surface) 45%)`
    this.element.style.setProperty("--pokemon-color", `var(--type-${firstType})`)
  }

  renderizarTipos() {
    let tipos = ""

    for (let i = 0; i < this.pokemon.types.length; i += 1) {
      const type = this.pokemon.types[i]
      tipos += `<p class="${type} tipo">${type}</p>`
    }

    return tipos
  }

  crearBarraEstadistica(etiqueta, valor) {
    const porcentaje = this.obtenerPorcentajeEstadistica(valor)

    // La barra se llena usando el porcentaje calculado desde el valor real.
    return `
      <div class="stat-bar">
        <div class="stat-bar__header">
          <span>${etiqueta}</span>
          <strong>${valor}</strong>
        </div>
        <div class="stat-bar__track">
          <div class="stat-bar__fill" style="width: ${porcentaje}%"></div>
        </div>
      </div>
    `
  }

  obtenerPorcentajeEstadistica(valor) {
    // Usamos 150 como maximo visual para que las barras sean faciles de entender.
    return Math.min((valor * 100) / 150, 100)
  }
}
