export class Card {
  #counter = 0
  #element = document.createElement("div")
  #observable = {}

  constructor({
    title = "",
    description = "",
    imageUrl = "",
    observable = {},
  } = {}) {
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
    this.#element.className = "card"
    this.#observable = observable
    this.#counter = this.#observable.state

    this.render()
  }

  render() {
    this.#element.innerHTML = `
        <img src="${this.imageUrl}" alt="${this.title}">
        <h2>${this.title}</h2>
        <p>${this.description}</p>
        <button class="increment">+</button>
        <span>${this.#counter}</span>
        <button class="decrement">-</button>
    `

    this.#element
      .querySelector(".increment")
      .addEventListener("click", this.increment.bind(this))

    this.#element
      .querySelector(".decrement")
      .addEventListener("click", this.decrement.bind(this))
  }

  increment() {
    this.#observable.state = this.#observable.state + 1
  }

  decrement() {
    if (this.#counter > 0)
      this.#observable.state = this.#observable.state - 1
    
  }

  updateState(counter) {
    this.#counter = counter
    this.#element.querySelector("span").textContent = this.#counter
  }

  get element() {
    return this.#element
  }
}
