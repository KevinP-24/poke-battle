export class AttackStrategy {
  calculate(pokemonOne, pokemonTwo) {
    // Esta estrategia solo compara el ataque.
    const score1 = pokemonOne.stats.attack
    const score2 = pokemonTwo.stats.attack

    if (score1 > score2) {
      return {
        winner: pokemonOne.name,
        reason: "Gano por mayor ataque",
        score1,
        score2,
      }
    }

    if (score2 > score1) {
      return {
        winner: pokemonTwo.name,
        reason: "Gano por mayor ataque",
        score1,
        score2,
      }
    }

    return {
      winner: "Empate",
      reason: "Ambos Pokemon tienen el mismo ataque",
      score1,
      score2,
    }
  }
}
