export class BalancedStrategy {
  calculate(pokemonOne, pokemonTwo) {
    const score1 = this.getScore(pokemonOne)
    const score2 = this.getScore(pokemonTwo)

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

  getScore(pokemon) {
    return pokemon.stats.hp + pokemon.stats.attack + pokemon.stats.defense + pokemon.stats.speed
  }
}
