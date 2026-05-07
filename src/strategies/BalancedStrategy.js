export class BalancedStrategy {
  calculate(pokemonOne, pokemonTwo) {
    const score1 =
      pokemonOne.stats.hp +
      pokemonOne.stats.attack +
      pokemonOne.stats.defense +
      pokemonOne.stats.speed

    const score2 =
      pokemonTwo.stats.hp +
      pokemonTwo.stats.attack +
      pokemonTwo.stats.defense +
      pokemonTwo.stats.speed

    if (score1 > score2) {
      return {
        winner: pokemonOne.name,
        reason: "Gano por mejores estadisticas generales",
        score1,
        score2,
      }
    }

    if (score2 > score1) {
      return {
        winner: pokemonTwo.name,
        reason: "Gano por mejores estadisticas generales",
        score1,
        score2,
      }
    }

    return {
      winner: "Empate",
      reason: "Ambos Pokemon tienen el mismo puntaje",
      score1,
      score2,
    }
  }
}
