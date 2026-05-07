export class PokemonAdapter {
  static adaptar(data) {
    // Convertimos la respuesta grande de PokeAPI en un objeto pequeno.
    const tipos = []

    for (let i = 0; i < data.types.length; i += 1) {
      tipos.push(data.types[i].type.name)
    }

    return {
      id: data.id,
      nombre: data.name,
      imagen: data.sprites.other["official-artwork"].front_default,
      tipos,
      altura: data.height,
      peso: data.weight,
      estadisticas: {
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        velocidad: data.stats[5].base_stat,
      },
    }
  }
}
