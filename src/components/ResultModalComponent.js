import { PokemonCardComponent } from "./PokemonCardComponent.js"

export class ResultModalComponent {
  constructor({ title, message = "", result = null, pokemonOne = null, pokemonTwo = null, winnerPokemon = null }) {
    // El modal puede mostrar un mensaje simple o un resultado de batalla.
    this.title = title
    this.message = message
    this.result = result
    this.pokemonOne = pokemonOne
    this.pokemonTwo = pokemonTwo
    this.winnerPokemon = winnerPokemon
    this.element = document.createElement("div")
  }

  render() {
    // Capa oscura que cubre la pagina.
    this.element.className = "modal"

    // Caja blanca del modal.
    const content = document.createElement("div")
    content.className = "modal__content"

    const title = document.createElement("h2")
    title.textContent = this.title

    // Aqui va el texto o la card del ganador.
    const body = document.createElement("div")
    body.className = "modal__body"

    if (this.result) {
      // Si hay ganador, mostramos su card reutilizando PokemonCardComponent.
      if (this.winnerPokemon) {
        const winnerCard = document.createElement("div")
        winnerCard.className = "modal__winner-card"
        winnerCard.append(new PokemonCardComponent(this.winnerPokemon).render())
        body.append(winnerCard)
      }

      // Informacion resumida del resultado.
      const resultInfo = document.createElement("div")
      resultInfo.className = "modal__result-info"
      resultInfo.innerHTML = `
        <span class="modal__label">Pokemon ganador</span>
        <h3>${this.result.winner}</h3>
        <div class="modal__scores">
          <p><span>${this.pokemonOne.name}</span><strong>${this.result.score1}</strong></p>
          <p><span>${this.pokemonTwo.name}</span><strong>${this.result.score2}</strong></p>
        </div>
        <p class="modal__reason">${this.result.reason}</p>
      `
      body.append(resultInfo)
    } else {
      body.textContent = this.message
    }

    // Boton para cerrar el modal eliminandolo del DOM.
    const closeButton = document.createElement("button")
    closeButton.className = "primary-button"
    closeButton.textContent = "Cerrar"
    closeButton.addEventListener("click", () => this.element.remove())

    content.append(title, body, closeButton)
    this.element.append(content)

    return this.element
  }
}
