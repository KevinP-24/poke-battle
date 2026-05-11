export class SpeedStrategy {
  calcular(pokemonUno, pokemonDos) {
    const puntuacionUno = pokemonUno.stats.speed
    const puntuacionDos = pokemonDos.stats.speed

    if (puntuacionUno > puntuacionDos) {
      return {
        winner: pokemonUno.name,
        reason: "Gano por mayor velocidad",
        score1: puntuacionUno,
        score2: puntuacionDos,
      }
    }

    if (puntuacionDos > puntuacionUno) {
      return {
        winner: pokemonDos.name,
        reason: "Gano por mayor velocidad",
        score1: puntuacionUno,
        score2: puntuacionDos,
      }
    }

    return {
      winner: "Empate",
      reason: "Ambos Pokemon tienen la misma velocidad",
      score1: puntuacionUno,
      score2: puntuacionDos,
    }
  }
}
