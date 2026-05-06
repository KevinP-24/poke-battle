export class BattleService {
  constructor(strategy) {
    this.strategy = strategy
  }

  battle(pokemonOne, pokemonTwo) {
    return this.strategy.calculate(pokemonOne, pokemonTwo)
  }
}
