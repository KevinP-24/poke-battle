function counterFormat(counter) {
  return `🛒 ${counter}`
}

export class Shopping {
  #counter
  #element = document.createElement("div")
  constructor( counter = 0) {
    this.#counter = counter
    this.render()
  }

  render() {
    this.#element.textContent = counterFormat(this.#counter)
  }

  updateState(counter) {
    this.#counter = counter
    this.#element.innerHTML = counterFormat(this.#counter)
  }

  get element() {
    return this.#element
  }
}
