// Funcion auxiliar simple para poner la primera letra en mayuscula.
// Por ahora no es indispensable, pero queda lista para mejorar textos.
export function ponerPrimeraMayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}
