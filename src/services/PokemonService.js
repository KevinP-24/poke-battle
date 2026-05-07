import { POKE_API_URL } from "../utils/constants.js"
import { PokemonAdapter } from "../adapters/PokemonAdapter.js"

export class PokemonService {
  getPokemonList(limite, inicio) {
    // Pedimos una lista paginada de Pokemon a la API.
    return fetch(`${POKE_API_URL}?limit=${limite}&offset=${inicio}`)
      .then((response) => response.json())
      .then((data) => data.results)
  }

  getPokemonByName(name) {
    // Pedimos el detalle de un Pokemon y luego lo pasamos por el Adapter.
    return fetch(`${POKE_API_URL}/${name}`)
      .then((response) => response.json())
      .then((data) => PokemonAdapter.adapt(data))
  }
}
