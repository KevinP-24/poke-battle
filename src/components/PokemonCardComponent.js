export class PokemonCardComponent {
  constructor(pokemon = null) {
    // Si pokemon llega null, mostramos la card vacia.
    this.pokemon = pokemon
    this.elemento = document.createElement("article")
  }

  render() {
    this.elemento.className = "pokemon-card pokemon"

    // Estado inicial antes de seleccionar un Pokemon.
    if (!this.pokemon) {
      this.elemento.innerHTML = `
        <div class="pokemon-card__empty">Selecciona un Pokemon</div>
      `
      return this.elemento
    }

    const estadisticas = this.pokemon.estadisticas
    const tipoPrincipal = this.pokemon.tipos[0]
    let tipos = ""

    for (let i = 0; i < this.pokemon.tipos.length; i += 1) {
      const tipo = this.pokemon.tipos[i]
      tipos += `<p class="${tipo} tipo">${tipo}</p>`
    }

    const idPokemon = this.pokemon.id.toString().padStart(3, "0")

    // El primer tipo define el color de fondo y de las barras de estadisticas.
    this.elemento.style.background = `linear-gradient(to bottom, var(--type-${tipoPrincipal}) 45%, var(--color-surface) 45%)`
    this.elemento.style.setProperty("--pokemon-color", `var(--type-${tipoPrincipal})`)

    // Creamos la estructura visual de la card con datos ya limpios del Adapter.
    this.elemento.innerHTML = `
      <p class="pokemon-id-back">#${idPokemon}</p>
      <div class="pokemon-imagen">
        <img class="pokemon-card__image" src="${this.pokemon.imagen}" alt="${this.pokemon.nombre}">
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">#${idPokemon}</p>
          <h2 class="pokemon-nombre">${this.pokemon.nombre}</h2>
        </div>
        <div class="pokemon-tipos">
          ${tipos}
        </div>
        <div class="pokemon-stats">
        <p class="stat">${this.pokemon.altura}m</p>
        <p class="stat">${this.pokemon.peso}kg</p>
        </div>
        <div class="pokemon-battle-stats">
          ${this.crearBarraEstadistica("HP", estadisticas.hp)}
          ${this.crearBarraEstadistica("Ataque", estadisticas.ataque)}
          ${this.crearBarraEstadistica("Defensa", estadisticas.defensa)}
          ${this.crearBarraEstadistica("Velocidad", estadisticas.velocidad)}
        </div>
      </div>
    `

    return this.elemento
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
