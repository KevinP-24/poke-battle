export class CardV2 {
    #root = document.createElement('div')
    #dataInit = {}
    #observable = null

    constructor({
        title = "",
        description = "",
        imageUrl = "",
        observable = {},
    } = {}){
        this.#dataInit = {
            title,
            description,
            imageUrl,
            counter: observable.state
        }
        this.#observable = observable

        this.#initStructure()
        this.#setupComponent()
    }

    /**
     * Sets up event listeners and bindings for the select component.
     */
    #setupComponent(){
        this.#root
            .querySelector(".increment")
            .addEventListener("click", this.#increment.bind(this))
  
        this.#root
            .querySelector(".decrement")
            .addEventListener("click", this.#decrement)
    }
    /**
     * Initializes the structure of the select component with provided data and template HTML.
     */
    #initStructure(){

        const { title, description, imageUrl, counter  } = this.#dataInit

        this.#root.className = "card"

        this.#root.innerHTML = `
            <img src="${imageUrl}" alt="${this.title}">
            <h2>${title}</h2>
            <p>${description}</p>
            <button class="increment">+</button>
            <span>${counter}</span>
            <button class="decrement">-</button>
        `
    }


    /**
     * Increments the counter value by 1
     */
    #increment() {
        this.#observable.state = this.#observable.state + 1
    }
    /*
    * Decrements the counter value by 1
    */
    #decrement() {
        if (this.#dataInit.counter > 0)
          this.#observable.state = this.#observable.state - 1
    }

    updateState(counter) {
        this.#dataInit.counter = counter
        this.#root.querySelector("span").textContent = counter
    }


    /**
     * Renders the main html element
     * @returns Returns the root object containing all the html to be rendered.
     */
    render(){
        return this.#root
    }
}