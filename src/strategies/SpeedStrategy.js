export class SpeedStrategy {
  calculate(pokemonOne, pokemonTwo) {
    // Esta estrategia solo compara la velocidad.
    const score1 = pokemonOne.stats.speed
    const score2 = pokemonTwo.stats.speed

    if (score1 > score2) {
      return {
        winner: pokemonOne.name,
        reason: "Gano por mayor velocidad",
        score1,
        score2,
      }
    }

    if (score2 > score1) {
      return {
        winner: pokemonTwo.name,
        reason: "Gano por mayor velocidad",
        score1,
        score2,
      }
    }

    return {
      winner: "Empate",
      reason: "Ambos Pokemon tienen la misma velocidad",
      score1,
      score2,
    }
  }
}
