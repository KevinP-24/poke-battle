export class BattleService {
  constructor(strategy) {
    // La estrategia decide como se calcula el ganador.
    this.strategy = strategy
  }

  battle(pokemonOne, pokemonTwo) {
    // Delegamos el calculo a la estrategia elegida.
    return this.strategy.calculate(pokemonOne, pokemonTwo)
  }
}
