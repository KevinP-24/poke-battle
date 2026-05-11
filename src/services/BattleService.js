export class BattleService {
  constructor(strategy) {
    // La estrategia decide como se calcula el ganador.
    this.strategy = strategy
  }

  combatir(pokemonUno, pokemonDos) {
    // Delegamos el calculo a la estrategia elegida.
    return this.strategy.calcular(pokemonUno, pokemonDos)
  }
}
