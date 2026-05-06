# Hoja de Ruta del Proyecto Web

**Proyecto:** Pokémon Battle  
**Tema del componente:** Preguntar  
**Tecnología:** HTML, CSS y JavaScript Vanilla  
**API:** PokéAPI  
**Enfoque:** Simulador de batalla Pokémon basado en estadísticas

---

## 1. Descripción general

El proyecto consiste en desarrollar un sitio web interactivo llamado **Pokémon Battle**, donde el usuario podrá seleccionar dos Pokémon desde listas paginadas, comparar sus estadísticas y simular una batalla.

La aplicación consumirá datos desde **PokéAPI**, manipulará el DOM con JavaScript, aplicará programación orientada a objetos, usará dos patrones de diseño, tendrá modo claro y modo oscuro, guardará información en `localStorage`, usará CSS Nesting y estará organizada por componentes.

---

## 2. Idea principal del proyecto

La aplicación no será una Pokédex tradicional. El objetivo será crear una experiencia tipo batalla.

Flujo principal:

```txt
1. El usuario selecciona el Pokémon 1.
2. El usuario selecciona el Pokémon 2.
3. La aplicación consulta los datos desde PokéAPI.
4. Se muestran las tarjetas de ambos Pokémon.
5. El usuario presiona "Simular batalla".
6. El sistema calcula un ganador según las estadísticas.
7. Se muestra el resultado en un modal.
8. La batalla se guarda en localStorage.
9. El historial de batallas se muestra con paginación.
```

---

## 3. Relación con el tema del componente: Preguntar

El componente principal se puede interpretar como un componente de pregunta o consulta, ya que el usuario interactúa con el sistema para obtener una respuesta.

Pregunta principal de la aplicación:

```txt
¿Qué Pokémon ganaría en una batalla basada en estadísticas?
```

El usuario selecciona dos Pokémon y el sistema responde mostrando:

- Pokémon ganador.
- Motivo del resultado.
- Puntaje de cada Pokémon.
- Comparación visual de estadísticas.

---

## 4. Requisitos del proyecto y cómo se cumplirán

| Requisito | Implementación en el proyecto |
|---|---|
| Consumo de API | Se usará PokéAPI para obtener información de los Pokémon |
| Sitio web con componentes | Se dividirá la interfaz en componentes reutilizables |
| Arquitectura de carpetas | Se organizará el proyecto por carpetas: components, services, adapters, strategies, styles y utils |
| 2 patrones de diseño | Se usarán Adapter y Strategy |
| No Factory | No se implementará Factory |
| No Singleton | No se implementará Singleton |
| Modo claro y oscuro | Se hará con CSS custom properties y JavaScript |
| Sistema de paginado | Se aplicará en las listas de selección y/o historial de batallas |
| LocalStorage | Se guardará el tema, Pokémon seleccionados y últimas batallas |
| CSS Nesting | Se usará nesting en los estilos de componentes |
| Manipulación del DOM | Se crearán y actualizarán tarjetas, listas, modal y resultados |
| POO en JavaScript | Se usarán clases para servicios, componentes, estrategias y almacenamiento |

---

## 5. Funcionalidades principales

### 5.1 Selección de Pokémon

La aplicación tendrá dos zonas de selección:

```txt
Pokémon 1
Pokémon 2
```

Cada zona permitirá:

- Ver una lista de Pokémon.
- Seleccionar un Pokémon.
- Mostrar tarjetas pequeñas.
- Navegar con paginación.
- Filtrar por tipo, si se implementa como mejora.

---

### 5.2 Tarjetas principales de batalla

Cuando el usuario seleccione los Pokémon, se mostrarán dos tarjetas principales:

```txt
┌────────────────────┐      VS      ┌────────────────────┐
│ Pokémon 1          │              │ Pokémon 2          │
│ Imagen             │              │ Imagen             │
│ Nombre             │              │ Nombre             │
│ Tipo               │              │ Tipo               │
│ HP                 │              │ HP                 │
│ Ataque             │              │ Ataque             │
│ Defensa            │              │ Defensa            │
│ Velocidad          │              │ Velocidad          │
└────────────────────┘              └────────────────────┘
```

---

### 5.3 Simulación de batalla

La batalla será una simulación basada en estadísticas, no una batalla oficial del videojuego.

Fórmula recomendada:

```txt
Puntaje = HP + Ataque + Defensa + Velocidad
```

Gana el Pokémon con mayor puntaje.

Ejemplo:

```txt
Pikachu:
HP: 35
Ataque: 55
Defensa: 40
Velocidad: 90
Total: 220

Charmander:
HP: 39
Ataque: 52
Defensa: 43
Velocidad: 65
Total: 199

Ganador: Pikachu
Motivo: mayor puntaje general
```

---

### 5.4 Modal de resultado

Al presionar el botón **Simular batalla**, aparecerá un modal.

Contenido del modal:

```txt
Resultado de la batalla

Ganador: Pikachu
Puntaje Pikachu: 220
Puntaje Charmander: 199
Motivo: ganó por mejores estadísticas generales

[Cerrar]
```

Este modal permite demostrar manipulación del DOM, eventos y diseño visual.

---

### 5.5 Historial de batallas

Cada batalla simulada se guardará en `localStorage`.

Ejemplo de registro:

```json
{
  "pokemon1": "pikachu",
  "pokemon2": "charmander",
  "winner": "pikachu",
  "reason": "Ganó por mejores estadísticas generales",
  "date": "2026-05-06"
}
```

El historial puede mostrarse en una sección inferior con paginación.

---

## 6. Sistema de paginación

El paginado se puede implementar en dos partes:

### Opción principal

Usar paginación en las listas de selección de Pokémon.

Ejemplo:

```txt
Pokémon 1
[Bulbasaur] [Ivysaur] [Venusaur]

Anterior | Página 1 | Siguiente
```

### Opción secundaria

Usar paginación en el historial de batallas.

Ejemplo:

```txt
Historial de batallas

1. Pikachu vs Charmander - Ganador: Pikachu
2. Squirtle vs Bulbasaur - Ganador: Bulbasaur
3. Mewtwo vs Gengar - Ganador: Mewtwo

Anterior | Página 1 | Siguiente
```

Recomendación: usar paginación en ambos si el tiempo alcanza. Como mínimo, aplicarla en el historial o en la lista de Pokémon.

---

## 7. Uso de localStorage

La aplicación usará `localStorage` para guardar información local del usuario.

Datos mínimos:

| Dato | Clave sugerida |
|---|---|
| Tema seleccionado | `theme` |
| Pokémon 1 seleccionado | `selectedPokemon1` |
| Pokémon 2 seleccionado | `selectedPokemon2` |
| Última batalla | `lastBattle` |
| Historial de batallas | `battleHistory` |

Ejemplo:

```js
localStorage.setItem("theme", "dark");
localStorage.setItem("battleHistory", JSON.stringify(history));
```

---

## 8. Modo claro y modo oscuro

El modo claro y oscuro se implementará usando **CSS custom properties**.

Ejemplo:

```css
:root {
  --bg-color: #ffffff;
  --text-color: #111827;
  --card-bg: #f3f4f6;
  --primary-color: #2563eb;
}

[data-theme="dark"] {
  --bg-color: #111827;
  --text-color: #f9fafb;
  --card-bg: #1f2937;
  --primary-color: #60a5fa;
}
```

El botón de cambio de tema actualizará el atributo `data-theme` y guardará la preferencia en `localStorage`.

---

## 9. CSS Nesting

El proyecto usará CSS Nesting para organizar estilos de componentes.

Ejemplo:

```css
.pokemon-card {
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: 16px;
  padding: 16px;

  &__image {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }

  &__title {
    font-size: 22px;
    text-transform: capitalize;
  }

  &__stats {
    display: grid;
    gap: 8px;
  }

  &:hover {
    transform: scale(1.02);
  }
}
```

---

## 10. Patrones de diseño seleccionados

Se usarán dos patrones de diseño:

```txt
1. Adapter
2. Strategy
```

No se usarán:

```txt
Factory
Singleton
```

---

### 10.1 Patrón Adapter

PokéAPI devuelve una respuesta grande con muchos datos. La aplicación solo necesita algunos campos.

El patrón **Adapter** permite transformar la respuesta original en un objeto más limpio.

Archivo sugerido:

```txt
/src/adapters/PokemonAdapter.js
```

Ejemplo:

```js
export class PokemonAdapter {
  static adapt(data) {
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map(item => item.type.name),
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat
      }
    };
  }
}
```

Sustentación:

```txt
Se implementó Adapter para convertir la respuesta original de PokéAPI en un modelo simple y útil para la aplicación.
```

---

### 10.2 Patrón Strategy

El patrón **Strategy** permite cambiar la forma de calcular el ganador sin modificar toda la lógica principal.

Estrategias posibles:

```txt
BalancedStrategy: gana quien tenga mayor puntaje general.
AttackStrategy: gana quien tenga mayor ataque.
SpeedStrategy: gana quien tenga mayor velocidad.
```

Archivo sugerido:

```txt
/src/strategies/BalancedStrategy.js
/src/strategies/AttackStrategy.js
/src/strategies/SpeedStrategy.js
```

Ejemplo:

```js
export class BalancedStrategy {
  calculate(pokemon1, pokemon2) {
    const score1 =
      pokemon1.stats.hp +
      pokemon1.stats.attack +
      pokemon1.stats.defense +
      pokemon1.stats.speed;

    const score2 =
      pokemon2.stats.hp +
      pokemon2.stats.attack +
      pokemon2.stats.defense +
      pokemon2.stats.speed;

    if (score1 > score2) {
      return {
        winner: pokemon1.name,
        reason: "Ganó por mejores estadísticas generales",
        score1,
        score2
      };
    }

    if (score2 > score1) {
      return {
        winner: pokemon2.name,
        reason: "Ganó por mejores estadísticas generales",
        score1,
        score2
      };
    }

    return {
      winner: "Empate",
      reason: "Ambos Pokémon tienen el mismo puntaje",
      score1,
      score2
    };
  }
}
```

Sustentación:

```txt
Se implementó Strategy para permitir diferentes formas de calcular el resultado de una batalla Pokémon sin modificar el servicio principal.
```

---

## 11. Arquitectura de carpetas

Estructura recomendada:

```txt
/COMPONENTS
│
├── index.html
├── README.md
├── Instrucciones.md
├── .gitignore
│
├── public
│   └── assets
│       ├── images
│       └── icons
│
└── src
    │
    ├── main.js
    ├── app.js
    │
    ├── styles
    │   ├── variables.css
    │   ├── themes.css
    │   ├── base.css
    │   ├── layout.css
    │   └── components.css
    │
    ├── components
    │   ├── BattleComponent.js
    │   ├── PokemonCardComponent.js
    │   ├── PokemonListComponent.js
    │   ├── PaginationComponent.js
    │   ├── ResultModalComponent.js
    │   ├── ThemeToggleComponent.js
    │   └── LoaderComponent.js
    │
    ├── services
    │   ├── PokemonService.js
    │   ├── BattleService.js
    │   ├── StorageService.js
    │   └── ThemeService.js
    │
    ├── adapters
    │   └── PokemonAdapter.js
    │
    ├── strategies
    │   ├── BalancedStrategy.js
    │   ├── AttackStrategy.js
    │   └── SpeedStrategy.js
    │
    └── utils
        ├── constants.js
        └── helpers.js
```

---

## 12. Componentes del proyecto

| Componente | Responsabilidad |
|---|---|
| `BattleComponent` | Controlar la sección principal de batalla |
| `PokemonCardComponent` | Mostrar la información visual de cada Pokémon |
| `PokemonListComponent` | Mostrar listas de Pokémon seleccionables |
| `PaginationComponent` | Controlar páginas anteriores y siguientes |
| `ResultModalComponent` | Mostrar el resultado final de la batalla |
| `ThemeToggleComponent` | Cambiar entre modo claro y modo oscuro |
| `LoaderComponent` | Mostrar estado de carga mientras se consulta la API |

---

## 13. Servicios del proyecto

| Servicio | Responsabilidad |
|---|---|
| `PokemonService` | Consumir PokéAPI |
| `BattleService` | Ejecutar la lógica de batalla usando Strategy |
| `StorageService` | Guardar y leer datos desde localStorage |
| `ThemeService` | Aplicar y guardar el tema visual |

---

## 14. Endpoints de PokéAPI sugeridos

### Obtener lista de Pokémon

```txt
https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
```

Uso:

- Sirve para la lista paginada.
- `limit` define cuántos Pokémon se muestran.
- `offset` define desde cuál posición inicia la consulta.

---

### Obtener detalle de un Pokémon

```txt
https://pokeapi.co/api/v2/pokemon/pikachu
```

Uso:

- Sirve para obtener imagen, tipos, habilidades y estadísticas.

---

### Obtener Pokémon por tipo

```txt
https://pokeapi.co/api/v2/type/fire
```

Uso:

- Sirve para filtrar Pokémon por tipo.
- Puede usarse como mejora adicional.

---

## 15. Diseño visual propuesto

Estructura general:

```txt
┌──────────────────────────────────────────────┐
│ Pokémon Battle              [Modo oscuro]    │
├──────────────────────────────────────────────┤
│                                              │
│ ┌───────────────┐      VS     ┌──────────────┐│
│ │ Pokémon 1     │             │ Pokémon 2    ││
│ │ Imagen        │             │ Imagen       ││
│ │ Stats         │             │ Stats        ││
│ └───────────────┘             └──────────────┘│
│                                              │
│              [ Simular batalla ]             │
│                                              │
├──────────────────────────────────────────────┤
│ Seleccionar Pokémon 1     Seleccionar Pokémon 2│
│ [Lista paginada]          [Lista paginada]     │
│ [Anterior] [Siguiente]    [Anterior] [Siguiente]│
├──────────────────────────────────────────────┤
│ Historial de batallas                         │
│ [Registros paginados]                         │
└──────────────────────────────────────────────┘
```

---

## 16. Hoja de ruta de desarrollo

### Fase 1: Preparación del proyecto

- [ ] Crear carpeta principal del proyecto.
- [ ] Crear `index.html`.
- [ ] Crear `README.md`.
- [ ] Crear `.gitignore`.
- [ ] Crear estructura de carpetas.
- [ ] Conectar archivos CSS y JavaScript.

---

### Fase 2: Maquetación HTML

- [ ] Crear `header`.
- [ ] Crear sección principal de batalla.
- [ ] Crear contenedor para Pokémon 1.
- [ ] Crear contenedor para Pokémon 2.
- [ ] Crear botón de simular batalla.
- [ ] Crear sección de selección de Pokémon.
- [ ] Crear sección de historial.
- [ ] Crear modal de resultado.

---

### Fase 3: Estilos base

- [ ] Crear variables CSS.
- [ ] Crear estilos de modo claro.
- [ ] Crear estilos de modo oscuro.
- [ ] Aplicar CSS Nesting.
- [ ] Diseñar tarjetas Pokémon.
- [ ] Diseñar botones.
- [ ] Diseñar modal.
- [ ] Diseñar paginación.
- [ ] Hacer diseño responsive.

---

### Fase 4: Consumo de API

- [ ] Crear `PokemonService`.
- [ ] Consultar lista de Pokémon.
- [ ] Consultar detalle de Pokémon.
- [ ] Manejar errores de API.
- [ ] Mostrar loader mientras carga.
- [ ] Probar búsqueda por nombre.

---

### Fase 5: Adapter

- [ ] Crear `PokemonAdapter`.
- [ ] Transformar la respuesta de PokéAPI.
- [ ] Dejar solo datos necesarios.
- [ ] Usar el Adapter antes de renderizar tarjetas.

---

### Fase 6: Componentes

- [ ] Crear `PokemonCardComponent`.
- [ ] Crear `PokemonListComponent`.
- [ ] Crear `BattleComponent`.
- [ ] Crear `PaginationComponent`.
- [ ] Crear `ResultModalComponent`.
- [ ] Crear `ThemeToggleComponent`.

---

### Fase 7: Strategy y batalla

- [ ] Crear `BalancedStrategy`.
- [ ] Crear `AttackStrategy`, si se desea agregar más opciones.
- [ ] Crear `SpeedStrategy`, si se desea agregar más opciones.
- [ ] Crear `BattleService`.
- [ ] Calcular puntaje de cada Pokémon.
- [ ] Determinar ganador.
- [ ] Mostrar resultado en modal.

---

### Fase 8: localStorage

- [ ] Guardar tema seleccionado.
- [ ] Guardar Pokémon seleccionados.
- [ ] Guardar última batalla.
- [ ] Guardar historial de batallas.
- [ ] Cargar datos guardados al abrir la página.

---

### Fase 9: Paginación

- [ ] Crear lógica de página actual.
- [ ] Crear botón anterior.
- [ ] Crear botón siguiente.
- [ ] Mostrar número de página.
- [ ] Aplicar paginado a listas de Pokémon.
- [ ] Aplicar paginado al historial, si se implementa.

---

### Fase 10: Pruebas y ajustes

- [ ] Probar búsqueda de Pokémon válidos.
- [ ] Probar errores con nombres incorrectos.
- [ ] Probar cambio de tema.
- [ ] Probar almacenamiento local.
- [ ] Probar paginación.
- [ ] Revisar diseño responsive.
- [ ] Limpiar código.
- [ ] Revisar nombres de archivos y carpetas.
- [ ] Preparar sustentación.

---

## 17. Checklist final de entrega

- [ ] El proyecto usa HTML, CSS y JavaScript Vanilla.
- [ ] Consume PokéAPI.
- [ ] Tiene componente de pregunta o consulta.
- [ ] Permite seleccionar dos Pokémon.
- [ ] Simula una batalla.
- [ ] Muestra ganador.
- [ ] Usa manipulación del DOM.
- [ ] Usa eventos de JavaScript.
- [ ] Usa programación orientada a objetos.
- [ ] Usa patrón Adapter.
- [ ] Usa patrón Strategy.
- [ ] No usa Factory.
- [ ] No usa Singleton.
- [ ] Tiene modo claro.
- [ ] Tiene modo oscuro.
- [ ] Usa CSS custom properties.
- [ ] Usa CSS Nesting.
- [ ] Usa localStorage.
- [ ] Tiene sistema mínimo de paginado.
- [ ] Tiene arquitectura de carpetas definida.
- [ ] Tiene diseño creativo y ordenado.
- [ ] Tiene README o documento de explicación.

---

## 18. Texto corto para sustentar el proyecto

El proyecto **Pokémon Battle** es un sitio web desarrollado con HTML, CSS y JavaScript Vanilla que consume datos desde PokéAPI para permitir la selección de dos Pokémon y simular una batalla basada en estadísticas. La aplicación implementa manipulación del DOM, componentes reutilizables, modo claro y oscuro con variables CSS, almacenamiento en localStorage y paginación.

A nivel de diseño de software, se implementan los patrones **Adapter** y **Strategy**. Adapter se usa para transformar la respuesta de PokéAPI en un modelo más simple, mientras que Strategy permite cambiar la forma de calcular el ganador de la batalla sin modificar la lógica principal del sistema.

---

## 19. Conclusión

La propuesta actual cumple con los criterios del desafío porque integra consumo de API, manipulación del DOM, CSS avanzado, programación orientada a objetos, patrones de diseño, almacenamiento local y paginación. Además, evita ser una Pokédex común y presenta una idea más creativa basada en comparación y simulación de batallas Pokémon.
