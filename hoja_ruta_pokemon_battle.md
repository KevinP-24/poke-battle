# Hoja de Ruta del Proyecto Web

**Proyecto:** Pokemon Battle  
**Tema del componente:** Preguntar  
**Tecnologia:** HTML, CSS y JavaScript Vanilla  
**API:** PokeAPI  
**Enfoque:** Simulador de batalla Pokemon basado en estadisticas

---

## 1. Descripcion general

Pokemon Battle permite elegir dos Pokemon, compararlos y mostrar un ganador.

- Cumple: consume API, usa componentes y guarda datos locales.
- Por que: la entrega pide una app interactiva basada en consulta y respuesta.
- Donde: [`src/app.js`](/d:/Proyectos/poke-api/poke-battle/src/app.js), [`src/components/BattleComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/BattleComponent.js), [`src/services/PokemonService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/PokemonService.js).

---

## 2. Idea principal

La app no es una Pokedex, es una batalla entre dos Pokemon.

- Cumple: el usuario selecciona dos Pokemon, simula la batalla y ve el resultado.
- Por que: el tema del componente se responde con una pregunta clara: quien gana.
- Donde: [`src/components/BattleComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/BattleComponent.js).

---

## 3. Relacion con el tema: Preguntar

La app responde una consulta concreta: quien ganaria entre dos Pokemon.

- Cumple: convierte la interaccion del usuario en una respuesta visual.
- Por que: conecta el proyecto con el tema del componente.
- Donde: [`src/components/ResultModalComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/ResultModalComponent.js).

---

## 4. Requisitos clave

| Requisito | Cumple | Por que | Donde |
|---|---|---|---|
| Consumo de API | Si | Para traer lista y detalle de Pokemon | [`src/services/PokemonService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/PokemonService.js) |
| Componentes | Si | Para separar la interfaz por partes | [`src/components`](/d:/Proyectos/poke-api/poke-battle/src/components) |
| Adapter | Si | Para limpiar la respuesta de PokeAPI | [`src/adapters/PokemonAdapter.js`](/d:/Proyectos/poke-api/poke-battle/src/adapters/PokemonAdapter.js) |
| Strategy | Si | Para calcular el ganador sin mezclar la logica | [`src/strategies`](/d:/Proyectos/poke-api/poke-battle/src/strategies) |
| Modo claro/oscuro | Si | Para cambiar apariencia visual | [`public/styles/themes.css`](/d:/Proyectos/poke-api/poke-battle/public/styles/themes.css), [`src/services/ThemeService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/ThemeService.js) |
| LocalStorage | Si | Para guardar tema, seleccion e historial | [`src/services/StorageService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/StorageService.js) |
| Paginacion | Si | Para no mostrar demasiados Pokemon de una vez | [`src/components/PaginationComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/PaginationComponent.js) |
| CSS Nesting | Si | Para ordenar mejor los estilos | [`public/styles/components.css`](/d:/Proyectos/poke-api/poke-battle/public/styles/components.css) |

---

## 5. Seleccion de Pokemon

- Cumple: hay dos listas separadas para elegir Pokemon.
- Por que: se necesitan dos combatientes distintos.
- Donde: [`src/components/PokemonListComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/PokemonListComponent.js).

## 6. Tarjetas de batalla

- Cumple: se muestran dos cards grandes con imagen, nombre, tipos y stats.
- Por que: el usuario debe ver claramente a los combatientes.
- Donde: [`src/components/PokemonCardComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/PokemonCardComponent.js), [`src/components/BattleComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/BattleComponent.js).

## 7. Simulacion de batalla

- Cumple: el puntaje sale de HP, ataque, defensa y velocidad.
- Por que: es una regla simple de explicar y mantener.
- Donde: [`src/strategies/BalancedStrategy.js`](/d:/Proyectos/poke-api/poke-battle/src/strategies/BalancedStrategy.js), [`src/services/BattleService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/BattleService.js).

## 8. Modal de resultado

- Cumple: muestra ganador, puntajes y motivo.
- Por que: cierra el flujo principal de la batalla.
- Donde: [`src/components/ResultModalComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/ResultModalComponent.js).

## 9. Historial

- Cumple: cada batalla se guarda y se puede volver a leer.
- Por que: demuestra persistencia local.
- Donde: [`src/services/StorageService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/StorageService.js), [`src/components/BattleComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/BattleComponent.js).

## 10. Paginacion

- Cumple: la paginacion esta en las listas de seleccion.
- Por que: evita mostrar demasiados Pokemon a la vez.
- Donde: [`src/components/PaginationComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/PaginationComponent.js), [`src/components/PokemonListComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/PokemonListComponent.js).

## 11. localStorage

- Cumple: guarda tema, Pokemon elegidos, ultima batalla e historial.
- Por que: mantiene datos entre recargas.
- Donde: [`src/services/StorageService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/StorageService.js).

## 12. Modo claro y oscuro

- Cumple: usa variables CSS y `data-theme`.
- Por que: cambia apariencia sin duplicar estilos.
- Donde: [`public/styles/themes.css`](/d:/Proyectos/poke-api/poke-battle/public/styles/themes.css), [`src/services/ThemeService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/ThemeService.js), [`src/components/ThemeToggleComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/ThemeToggleComponent.js).

## 13. CSS Nesting

- Cumple: se usan selectores anidados para ordenar los estilos.
- Por que: hace mas facil ver que pertenece a cada componente.
- Donde: [`public/styles/components.css`](/d:/Proyectos/poke-api/poke-battle/public/styles/components.css).

## 14. Patrones de diseno

- Cumple: se usan Adapter y Strategy.
- Por que: separan la limpieza de datos y la regla de batalla.
- Donde: [`src/adapters/PokemonAdapter.js`](/d:/Proyectos/poke-api/poke-battle/src/adapters/PokemonAdapter.js), [`src/strategies`](/d:/Proyectos/poke-api/poke-battle/src/strategies), [`src/services/BattleService.js`](/d:/Proyectos/poke-api/poke-battle/src/services/BattleService.js).

## 15. Estructura y visual

- Cumple: el proyecto esta separado por capas y la interfaz esta dividida en header, arena, listas e historial.
- Por que: ordena el codigo y hace la entrega mas clara.
- Donde: [`src/components`](/d:/Proyectos/poke-api/poke-battle/src/components), [`src/services`](/d:/Proyectos/poke-api/poke-battle/src/services), [`src/adapters`](/d:/Proyectos/poke-api/poke-battle/src/adapters), [`src/strategies`](/d:/Proyectos/poke-api/poke-battle/src/strategies), [`public/styles/layout.css`](/d:/Proyectos/poke-api/poke-battle/public/styles/layout.css), [`public/styles/components.css`](/d:/Proyectos/poke-api/poke-battle/public/styles/components.css).

---

## 16. Estado actual de la entrega

### Ya esta hecho

- Consumo de PokeAPI para lista y detalle de Pokemon.
- Seleccion de dos Pokemon desde listas paginadas.
- Tarjetas grandes para la batalla.
- Simulacion de batalla con puntaje general.
- Modal con resultado.
- Historial guardado en `localStorage`.
- Modo claro y oscuro.
- Adapter para limpiar la respuesta de la API.
- Strategy para calcular el ganador.
- CSS Nesting en los estilos de componentes.
- Estructura por componentes, servicios, adapters, strategies y utils.

### Todavia se puede mejorar

- La paginacion de seleccion sigue siendo basica y textual.
- El historial se muestra simple, sin mucha jerarquia visual.
- Los estados vacios y de carga cumplen, pero pueden verse mas claros.
- La experiencia visual general puede subir con pequenos ajustes.

### Proximo reto recomendado

- Convertir la paginacion de nombres en mini cards mas visuales.
- Mantener la misma logica de seleccion, pero cambiar solo la vista.
- Si sobra tiempo, mejorar tambien la presentacion del historial.

---

## 17. Hoja de ruta de trabajo

### Fase 1: Base del proyecto

- [x] Crear la estructura principal.
- [x] Conectar HTML, CSS y JavaScript.
- [x] Crear `header`.
- [x] Crear seccion principal de batalla.
- [x] Crear contenedores para ambos Pokemon.
- [x] Crear boton de simular batalla.

### Fase 2: Consumo de API

- [x] Crear `PokemonService`.
- [x] Consultar lista de Pokemon.
- [x] Consultar detalle de Pokemon.
- [x] Mostrar loader mientras carga.
- [x] Limitar la lista a la primera generacion.

### Fase 3: Modelado de datos

- [x] Crear `PokemonAdapter`.
- [x] Transformar la respuesta de PokeAPI.
- [x] Dejar solo datos necesarios.

### Fase 4: Componentes

- [x] Crear `PokemonCardComponent`.
- [x] Crear `PokemonListComponent`.
- [x] Crear `BattleComponent`.
- [x] Crear `PaginationComponent`.
- [x] Crear `ResultModalComponent`.
- [x] Crear `ThemeToggleComponent`.

### Fase 5: Batalla

- [x] Crear `BattleService`.
- [x] Calcular puntaje de cada Pokemon.
- [x] Determinar ganador.
- [x] Mostrar resultado en modal.

### Fase 6: Persistencia

- [x] Guardar tema seleccionado.
- [x] Guardar Pokemon seleccionados.
- [x] Guardar ultima batalla.
- [x] Guardar historial de batallas.

### Fase 7: Estilos

- [x] Crear variables CSS.
- [x] Crear estilos de modo claro.
- [x] Crear estilos de modo oscuro.
- [x] Aplicar CSS Nesting.
- [x] Disenar tarjetas, botones, modal y paginacion.
- [x] Hacer diseno responsive base.

### Fase 8: Pendientes de mejora visual

- [ ] Convertir la paginacion de nombres en mini cards.
- [ ] Dar mas jerarquia visual al historial.
- [ ] Pulir estados vacios y de carga.
- [ ] Revisar detalles finales de espaciado y consistencia.

---

## 18. Checklist final de entrega

- [x] El proyecto usa HTML, CSS y JavaScript Vanilla.
- [x] Consume PokeAPI.
- [x] Tiene componente de pregunta o consulta.
- [x] Permite seleccionar dos Pokemon.
- [x] Simula una batalla.
- [x] Muestra ganador.
- [x] Usa manipulacion del DOM.
- [x] Usa eventos de JavaScript.
- [x] Usa programacion orientada a objetos.
- [x] Usa patron Adapter.
- [x] Usa patron Strategy.
- [x] No usa Factory.
- [x] No usa Singleton.
- [x] Tiene modo claro.
- [x] Tiene modo oscuro.
- [x] Usa CSS custom properties.
- [x] Usa CSS Nesting.
- [x] Usa localStorage.
- [x] Tiene sistema minimo de paginado.
- [x] Tiene arquitectura de carpetas definida.
- [x] Tiene diseno creativo y ordenado.
- [x] Tiene README o documento de explicacion.

---

## 19. Texto corto para sustentar el proyecto

El proyecto Pokemon Battle es un sitio web desarrollado con HTML, CSS y JavaScript Vanilla que consume datos desde PokeAPI para permitir la seleccion de dos Pokemon y simular una batalla basada en estadisticas. La aplicacion implementa manipulacion del DOM, componentes reutilizables, modo claro y oscuro con variables CSS, almacenamiento en localStorage y paginacion.

A nivel de diseno de software, se implementan los patrones Adapter y Strategy. Adapter se usa para transformar la respuesta de PokeAPI en un modelo mas simple, mientras que Strategy permite cambiar la forma de calcular el ganador de la batalla sin modificar la logica principal del sistema.

---

## 20. Conclusion

La propuesta actual cumple con los criterios del desafio porque integra consumo de API, manipulacion del DOM, CSS avanzado, programacion orientada a objetos, patrones de diseno, almacenamiento local y paginacion. Ademas, evita ser una Pokedex comun y presenta una idea mas creativa basada en comparacion y simulacion de batallas Pokemon.

---

## 21. Mini tarjetas para la seleccion

### Objetivo

- Cambiar la lista de nombres por mini tarjetas mas visuales.
- Mantener la misma logica de seleccion que ya existe.
- Hacer mas facil reconocer el Pokemon antes de elegirlo.

### Lo que ya se reutiliza

- `PokemonListComponent` sigue controlando la lista y la paginacion.
- `PokemonAdapter` ya trae `name`, `image`, `types` y `id`, asi que no hace falta pedir mas datos.
- `selectPokemon(name)` ya trae el detalle completo, asi que no se toca esa parte.

### Donde hacerlo

- [`src/components/PokemonListComponent.js`](/d:/Proyectos/poke-api/poke-battle/src/components/PokemonListComponent.js) para cambiar el render de cada item.
- [`public/styles/components.css`](/d:/Proyectos/poke-api/poke-battle/public/styles/components.css) para agregar los estilos de la mini card.

### Paso a paso

1. Crear una estructura nueva para cada item de la lista.
2. En lugar de `button.textContent = pokemon.name`, usar `innerHTML` con imagen, nombre e id.
3. Seguir usando el mismo `addEventListener("click", ...)` para no cambiar la seleccion.
4. Agregar una clase nueva, por ejemplo `pokemon-list__card`.
5. Hacer la mini card mas compacta que la card principal.
6. Usar la imagen que ya viene en `pokemon.image`.
7. Mostrar solo informacion corta: `id`, `name` y tal vez el primer tipo.
8. Mantener la lista en dos columnas en escritorio y una en movil.

### Como reutilizar lo que ya tienes

- Reutilizar el `forEach` de `renderPage()`.
- Reutilizar el mismo `pokemonService.getPokemonByName(name)` para seleccionar.
- Reutilizar el `Adapter` porque ya trae la imagen y los tipos listos.
- Reutilizar la paginacion tal como esta, sin cambiar botones ni logica.

### Que no cambiar

- No tocar `BattleComponent`.
- No tocar `PaginationComponent`.
- No tocar `selectPokemon`.
- No cambiar la logica de batalla.

### Idea base

La mini card solo cambia la apariencia de la lista. La funcion real sigue siendo la misma: elegir un Pokemon desde la lista y cargar su detalle completo en la batalla.
