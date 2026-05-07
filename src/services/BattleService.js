export class BattleService {
  constructor(strategy) {
    // La estrategia define como se calcula el ganador.
    this.strategy = strategy
  }

  battle(pokemonOne, pokemonTwo) {
    // Delegamos el calculo a la estrategia seleccionada.
    return this.strategy.calculate(pokemonOne, pokemonTwo)
  }
}
