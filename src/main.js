import { App } from "./app.js"

// 1. Buscamos el div principal que esta en public/index.html.
const root = document.querySelector("#root")

// 2. Creamos la aplicacion y le pasamos ese div para pintar todo adentro.
const app = new App(root)

// 3. Llamamos render para construir la interfaz con JavaScript.
app.render()
