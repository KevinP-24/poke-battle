import { PokemonCardComponent } from "./PokemonCardComponent.js"

export class ResultModalComponent {
  constructor({ titulo, mensaje = "", resultado = null, pokemonUno = null, pokemonDos = null, pokemonGanador = null }) {
    // El modal puede mostrar un mensaje simple o un resultado de batalla.
    this.titulo = titulo
    this.mensaje = mensaje
    this.resultado = resultado
    this.pokemonUno = pokemonUno
    this.pokemonDos = pokemonDos
    this.pokemonGanador = pokemonGanador
    this.elemento = document.createElement("div")
  }

  render() {
    // Capa oscura que cubre la pagina.
    this.elemento.className = "modal"

    // Caja blanca del modal.
    const content = document.createElement("div")
    content.className = "modal__content"

    const titulo = document.createElement("h2")
    titulo.textContent = this.titulo

    // Aqui va el texto o la card del ganador.
    const body = document.createElement("div")
    body.className = "modal__body"

    if (this.resultado) {
      // Si hay ganador, mostramos su card reutilizando PokemonCardComponent.
      if (this.pokemonGanador) {
        const cardGanadora = document.createElement("div")
        cardGanadora.className = "modal__winner-card"
        cardGanadora.append(new PokemonCardComponent(this.pokemonGanador).render())
        body.append(cardGanadora)
      }

      // Informacion resumida del resultado.
      const informacionResultado = document.createElement("div")
      informacionResultado.className = "modal__result-info"
      informacionResultado.innerHTML = `
        <span class="modal__label">Pokemon ganador</span>
        <h3>${this.resultado.ganador}</h3>
        <div class="modal__scores">
          <p><span>${this.pokemonUno.nombre}</span><strong>${this.resultado.puntajeUno}</strong></p>
          <p><span>${this.pokemonDos.nombre}</span><strong>${this.resultado.puntajeDos}</strong></p>
        </div>
        <p class="modal__reason">${this.resultado.motivo}</p>
      `
      body.append(informacionResultado)
    } else {
      body.textContent = this.mensaje
    }

    // Boton para cerrar el modal eliminandolo del DOM.
    const botonCerrar = document.createElement("button")
    botonCerrar.className = "primary-button"
    botonCerrar.textContent = "Cerrar"
    botonCerrar.addEventListener("click", () => this.elemento.remove())

    content.append(titulo, body, botonCerrar)
    this.elemento.append(content)

    return this.elemento
  }
}
