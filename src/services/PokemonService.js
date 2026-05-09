import { POKE_API_URL } from "../utils/constants.js"
import { PokemonAdapter } from "../adapters/PokemonAdapter.js"

export class PokemonService {
  request(url) {
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Pokemon request failed with status ${response.status}`)
      }

      return response.json()
    })
  }

  getPokemonList(limite, inicio) {
    // Pedimos una lista paginada de Pokemon a la API.
    return this.request(`${POKE_API_URL}?limit=${limite}&offset=${inicio}`)
      .then((data) => data.results)
  }

  getPokemonByName(name) {
    // Pedimos el detalle de un Pokemon y luego lo pasamos por el Adapter.
    return this.request(`${POKE_API_URL}/${name}`)
      .then((data) => PokemonAdapter.adapt(data))
  }
}
