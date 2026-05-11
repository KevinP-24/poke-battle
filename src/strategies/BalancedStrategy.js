export class BalancedStrategy {
  calcular(pokemonUno, pokemonDos) {
    const puntuacionUno =
      pokemonUno.stats.hp +
      pokemonUno.stats.attack +
      pokemonUno.stats.defense +
      pokemonUno.stats.speed

    const puntuacionDos =
      pokemonDos.stats.hp +
      pokemonDos.stats.attack +
      pokemonDos.stats.defense +
      pokemonDos.stats.speed

    if (puntuacionUno > puntuacionDos) {
      return {
        winner: pokemonUno.name,
        reason: "Gano por mejores estadisticas generales",
        score1: puntuacionUno,
        score2: puntuacionDos,
      }
    }

    if (puntuacionDos > puntuacionUno) {
      return {
        winner: pokemonDos.name,
        reason: "Gano por mejores estadisticas generales",
        score1: puntuacionUno,
        score2: puntuacionDos,
      }
    }

    return {
      winner: "Empate",
      reason: "Ambos Pokemon tienen el mismo puntaje",
      score1: puntuacionUno,
      score2: puntuacionDos,
    }
  }
}
