export class BattleService {
  resolverBatalla(pokemonUno, pokemonDos) {
    const puntajeUno = this.obtenerPuntaje(pokemonUno)
    const puntajeDos = this.obtenerPuntaje(pokemonDos)

    if (puntajeUno > puntajeDos) {
      return {
        ganador: pokemonUno.nombre,
        motivo: "Gano por mejores estadisticas generales",
        puntajeUno,
        puntajeDos,
      }
    }

    if (puntajeDos > puntajeUno) {
      return {
        ganador: pokemonDos.nombre,
        motivo: "Gano por mejores estadisticas generales",
        puntajeUno,
        puntajeDos,
      }
    }

    return {
      ganador: "Empate",
      motivo: "Ambos Pokemon tienen el mismo puntaje",
      puntajeUno,
      puntajeDos,
    }
  }

  obtenerPuntaje(pokemon) {
    return pokemon.estadisticas.hp + pokemon.estadisticas.ataque + pokemon.estadisticas.defensa + pokemon.estadisticas.velocidad
  }
}
