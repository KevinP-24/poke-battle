export class PokemonAdapter {
  static adaptar(datos) {
    // Convertimos la respuesta grande de PokeAPI en un objeto sencillo.
    const types = []

    for (let i = 0; i < datos.types.length; i += 1) {
      types.push(datos.types[i].type.name)
    }

    return {
      id: datos.id,
      name: datos.name,
      image: datos.sprites.other["official-artwork"].front_default,
      types,
      height: datos.height,
      weight: datos.weight,
      stats: {
        hp: datos.stats[0].base_stat,
        attack: datos.stats[1].base_stat,
        defense: datos.stats[2].base_stat,
        speed: datos.stats[5].base_stat,
      },
    }
  }
}
