import { POKE_API_URL } from "../utils/constants.js"
import { PokemonAdapter } from "../adapters/PokemonAdapter.js"

export class PokemonService {
  getPokemonList(limit, offset) {
    return fetch(`${POKE_API_URL}?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => data.results)
  }

  getPokemonByName(name) {
    return fetch(`${POKE_API_URL}/${name}`)
      .then((response) => response.json())
      .then((data) => PokemonAdapter.adapt(data))
  }
}
