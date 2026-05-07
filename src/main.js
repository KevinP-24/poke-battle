import { App } from "./app.js"

// Buscamos el contenedor principal que esta en public/index.html.
const contenedorPrincipal = document.querySelector("#root")

// Creamos la aplicacion y le pasamos ese contenedor para pintar todo adentro.
const app = new App(contenedorPrincipal)

// Llamamos render para construir la interfaz con JavaScript.
app.render()
