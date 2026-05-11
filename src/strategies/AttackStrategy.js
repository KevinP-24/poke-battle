export class AttackStrategy {
  calcular(pokemonUno, pokemonDos) {
    const puntuacionUno = pokemonUno.stats.attack
    const puntuacionDos = pokemonDos.stats.attack

    if (puntuacionUno > puntuacionDos) {
      return {
        winner: pokemonUno.name,
        reason: "Gano por mayor ataque",
        score1: puntuacionUno,
        score2: puntuacionDos,
      }
    }

    if (puntuacionDos > puntuacionUno) {
      return {
        winner: pokemonDos.name,
        reason: "Gano por mayor ataque",
        score1: puntuacionUno,
        score2: puntuacionDos,
      }
    }

    return {
      winner: "Empate",
      reason: "Ambos Pokemon tienen el mismo ataque",
      score1: puntuacionUno,
      score2: puntuacionDos,
    }
  }
}
