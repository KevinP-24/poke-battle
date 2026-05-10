import { App } from "./app.js"

// Buscamos el contenedor principal que esta en el HTML.
const contenedorPrincipal = document.querySelector("#root")

// Creamos la app y le pasamos ese contenedor.
const app = new App(contenedorPrincipal)

// Pintamos la interfaz.
app.render()
