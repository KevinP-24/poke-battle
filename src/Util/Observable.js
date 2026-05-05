export class Observable {
  #state
  #subscribers = []
  constructor(initialValue) {
    this.#state = initialValue
  }

  get state() {
    return this.#state
  }

  set state(newValue) {
    if (newValue == null) throw new Error("El state no puede ser null")
    else {
      this.#state = newValue
      this.notify()
    }
  }

  subscribe(subscriber) {
    this.#subscribers.push(subscriber)
  }

  notify() {
    this.#subscribers.forEach((subscriber) =>
      subscriber.updateState(this.state),
    )
  }
}
