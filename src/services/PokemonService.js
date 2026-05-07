import { URL_POKEAPI } from "../utils/constants.js"
import { PokemonAdapter } from "../adapters/PokemonAdapter.js"

export class PokemonService {
  obtenerListaPrimeraGeneracion() {
    // Pedimos directamente los 151 Pokemon de la primera generacion.
    return fetch(`${URL_POKEAPI}?limit=151`)
      .then((response) => response.json())
      .then((data) => data.results)
  }

  obtenerPokemonPorNombre(nombre) {
    // Pedimos el detalle de un Pokemon y luego lo pasamos por el Adapter.
    return fetch(`${URL_POKEAPI}/${nombre}`)
      .then((response) => response.json())
      .then((data) => PokemonAdapter.adaptar(data))
  }
}
