import { POKE_API_URL } from "../utils/constants.js"
import { PokemonAdapter } from "../adapters/PokemonAdapter.js"

export class PokemonService {
  async solicitar(url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Pokemon request failed with status ${response.status}`)
    }

    return response.json()
  }

  async obtenerListaPokemon(cantidad, desplazamiento) {
    // Pedimos una lista de Pokemon a la API.
    const data = await this.solicitar(`${POKE_API_URL}?limit=${cantidad}&offset=${desplazamiento}`)
    return data.results
  }

  async obtenerPokemonPorNombre(nombre) {
    // Pedimos el detalle de un Pokemon y lo convertimos con el Adapter.
    const data = await this.solicitar(`${POKE_API_URL}/${nombre}`)
    return PokemonAdapter.adaptar(data)
  }
}
