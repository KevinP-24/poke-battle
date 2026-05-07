// Funcion auxiliar simple para poner la primera letra en mayuscula.
// Por ahora no es indispensable, pero queda lista para mejorar textos.
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
