export class StorageService {
  guardar(clave, valor) {
    // localStorage solo guarda texto, por eso usamos JSON.stringify.
    localStorage.setItem(clave, JSON.stringify(valor))
  }

  eliminar(clave) {
    // Eliminamos un dato guardado.
    localStorage.removeItem(clave)
  }

  obtener(clave, valorPorDefecto) {
    // Buscamos un dato. Si no existe, devolvemos un valor por defecto.
    const valorGuardado = localStorage.getItem(clave)

    if (!valorGuardado) {
      return valorPorDefecto
    }

    return JSON.parse(valorGuardado)
  }

  agregarBatalla(batalla) {
    // Traemos el historial, agregamos la nueva batalla al inicio y guardamos.
    const historial = this.obtenerBatallas()
    historial.unshift(batalla)
    localStorage.setItem("historialBatallas", JSON.stringify(historial))
  }

  obtenerBatallas() {
    // Si no hay historial, devolvemos un arreglo vacio.
    return this.obtener("historialBatallas", [])
  }
}
