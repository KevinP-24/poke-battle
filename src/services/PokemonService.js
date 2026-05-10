import { POKE_API_URL } from "../utils/constants.js"
import { PokemonAdapter } from "../adapters/PokemonAdapter.js"

export class PokemonService {
  async request(url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Pokemon request failed with status ${response.status}`)
    }

    return response.json()
  }

  async getPokemonList(limit, offset) {
    // Pedimos una lista de Pokemon a la API.
    const data = await this.request(`${POKE_API_URL}?limit=${limit}&offset=${offset}`)
    return data.results
  }

  async getPokemonByName(name) {
    // Pedimos el detalle de un Pokemon y lo convertimos con el Adapter.
    const data = await this.request(`${POKE_API_URL}/${name}`)
    return PokemonAdapter.adapt(data)
  }
}
