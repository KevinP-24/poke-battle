export class PokemonAdapter {
  static adapt(data) {
    // Convertimos la respuesta grande de PokeAPI en un objeto pequeno.
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      types: data.types.map((item) => item.type.name),
      height: data.height,
      weight: data.weight,
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
      },
    }
  }
}
