# Especificaciones del Proyecto Web

**Estudiante:** Kevin Payanene  
**Docente:** Andrés Felipe Villarraga Arango  
**Tema general:** Desarrollo Web con HTML, CSS y JavaScript  
**Tema del componente:** Preguntar  
**Tipo de entrega:** Sitio web con componente interactivo

---

## 1. Descripción general

El proyecto consiste en desarrollar un **sitio web interactivo** usando **HTML, CSS y JavaScript**, donde se evidencie el dominio de:

- Manipulación del DOM.
- Manejo de estilos con CSS.
- Programación orientada a objetos en JavaScript.
- Uso de CSS custom properties.
- Uso de CSS Nesting.
- Implementación de modo claro y modo oscuro.
- Consumo de una API externa.
- Uso de `localStorage`.
- Sistema mínimo de paginado.
- Organización del proyecto por carpetas y componentes.

El sitio tendrá como temática principal el componente **“Preguntar”**, el cual puede funcionar como un componente de preguntas, consultas o búsqueda interactiva para mostrar información relacionada con **películas** y **Pokémon**.

---

## 2. Objetivo del proyecto

Crear un sitio web organizado y reutilizable que permita consumir datos desde APIs externas y mostrarlos mediante componentes visuales, aplicando buenas prácticas de estructura, estilos y programación orientada a objetos en JavaScript.

---

## 3. Tema del componente: Preguntar

El componente principal se llamará **Preguntar**.

Este componente permitirá al usuario realizar una consulta o búsqueda sobre un tema específico, por ejemplo:

- Buscar una película.
- Buscar un Pokémon.
- Consultar información básica.
- Mostrar resultados dinámicos en pantalla.

Ejemplo de funcionamiento:

```txt
Usuario escribe: Pikachu
El sistema consulta la API de Pokémon
El componente muestra nombre, imagen, tipo y habilidades
```

Otro ejemplo:

```txt
Usuario escribe: Batman
El sistema consulta la API de películas
El componente muestra título, póster, descripción y calificación
```

---

## 4. APIs sugeridas

El proyecto puede consumir una o dos APIs externas.

### 4.1 API de Pokémon

API sugerida:

```txt
https://pokeapi.co/
```

Datos que se pueden mostrar:

- Nombre del Pokémon.
- Imagen.
- Tipo.
- Habilidades.
- Estadísticas básicas.

---

### 4.2 API de películas

APIs sugeridas:

```txt
https://www.omdbapi.com/
https://developer.themoviedb.org/
```

Datos que se pueden mostrar:

- Nombre de la película.
- Imagen o póster.
- Descripción.
- Fecha de estreno.
- Calificación.

---

## 5. Requisitos funcionales

### 5.1 Consumo de API

La aplicación debe consumir información desde una API externa usando JavaScript.

Debe incluir:

- Petición HTTP con `fetch`.
- Manejo de respuesta JSON.
- Validación de errores.
- Visualización dinámica de datos en el HTML.

Ejemplo básico:

```js
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Mostrar datos en pantalla
  })
  .catch(error => {
    // Mostrar error
  });
```

---

### 5.2 Manipulación del DOM

La aplicación debe modificar el contenido de la página usando JavaScript.

Debe evidenciar:

- Selección de elementos con `querySelector`.
- Creación dinámica de elementos.
- Inserción de contenido con `innerHTML`, `textContent` o `appendChild`.
- Eventos como `click`, `input` o `submit`.

Ejemplo:

```js
const container = document.querySelector(".results");

const card = document.createElement("article");
card.classList.add("card");
card.textContent = "Resultado encontrado";

container.appendChild(card);
```

---

### 5.3 Componente interactivo

El componente **Preguntar** debe permitir:

- Escribir una pregunta o búsqueda.
- Enviar la consulta.
- Mostrar resultados.
- Mostrar mensajes de error.
- Limpiar resultados anteriores.
- Cambiar su apariencia según el modo claro u oscuro.

---

## 6. Requisitos técnicos

### 6.1 HTML

El HTML debe tener una estructura semántica y ordenada.

Elementos sugeridos:

- `header`
- `main`
- `section`
- `article`
- `form`
- `input`
- `button`
- `footer`

---

### 6.2 CSS

El proyecto debe usar CSS para el diseño visual.

Debe incluir:

- Variables CSS.
- CSS Nesting.
- Diseño responsive.
- Modo claro y oscuro.
- Estilos para tarjetas.
- Estilos para botones, formularios y resultados.

---

### 6.3 JavaScript

El JavaScript debe aplicar:

- Manipulación del DOM.
- Eventos.
- Consumo de API.
- Clases.
- Métodos.
- Objetos.
- Separación de responsabilidades.
- Uso de `localStorage`.

---

## 7. Modo claro y modo oscuro

La aplicación debe permitir alternar entre:

- Modo claro.
- Modo oscuro.

Este modo debe implementarse usando **CSS custom properties**.

Ejemplo:

```css
:root {
  --bg-color: #ffffff;
  --text-color: #111111;
  --card-color: #f3f3f3;
  --primary-color: #2563eb;
}

[data-theme="dark"] {
  --bg-color: #111827;
  --text-color: #f9fafb;
  --card-color: #1f2937;
  --primary-color: #60a5fa;
}
```

El tema seleccionado debe guardarse en `localStorage`.

Ejemplo:

```js
localStorage.setItem("theme", "dark");
```

---

## 8. CSS Nesting

El proyecto debe usar **CSS Nesting** para organizar mejor los estilos.

Ejemplo:

```css
.card {
  background: var(--card-color);
  color: var(--text-color);
  border-radius: 12px;
  padding: 16px;

  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.02);
  }
}
```

---

## 9. Programación orientada a objetos en JavaScript

El proyecto debe usar POO para mejorar la organización y reutilización del código.

Clases sugeridas:

```txt
ApiService
StorageService
ThemeManager
Paginator
PreguntaComponent
CardComponent
```

---

### 9.1 Clase ApiService

Responsable de consumir la API.

```js
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getData(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error("Error al consultar la API");
    }

    return await response.json();
  }
}
```

---

### 9.2 Clase ThemeManager

Responsable de manejar el modo claro y oscuro.

```js
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light";
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", this.theme);
    this.applyTheme();
  }
}
```

---

### 9.3 Clase PreguntaComponent

Responsable del componente principal.

```js
class PreguntaComponent {
  constructor(apiService, container) {
    this.apiService = apiService;
    this.container = container;
  }

  renderResult(data) {
    this.container.innerHTML = `
      <article class="card">
        <h3 class="card__title">${data.name || data.title}</h3>
      </article>
    `;
  }
}
```

---

## 10. Patrones de diseño

Se deben implementar mínimo **dos patrones de diseño**.

No se deben usar:

- Factory.
- Singleton.

Patrones recomendados:

---

### 10.1 Patrón Adapter

Permite transformar la respuesta de una API externa al formato que necesita la aplicación.

Ejemplo:

```js
class PokemonAdapter {
  static adapt(data) {
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map(item => item.type.name),
      abilities: data.abilities.map(item => item.ability.name)
    };
  }
}
```

Uso:

```js
const pokemon = PokemonAdapter.adapt(apiResponse);
```

---

### 10.2 Patrón Strategy

Permite manejar comportamientos diferentes dependiendo del tipo de búsqueda.

Ejemplo:

```js
class PokemonSearchStrategy {
  async search(apiService, query) {
    const data = await apiService.getData(`/pokemon/${query}`);
    return PokemonAdapter.adapt(data);
  }
}

class MovieSearchStrategy {
  async search(apiService, query) {
    const data = await apiService.getData(`/?t=${query}`);
    return MovieAdapter.adapt(data);
  }
}
```

Con esto, el componente puede buscar películas o Pokémon sin cambiar toda su lógica interna.

---

## 11. Sistema de paginado

La aplicación debe tener un sistema mínimo de paginación.

Debe permitir:

- Mostrar una cantidad limitada de resultados por página.
- Avanzar a la siguiente página.
- Volver a la página anterior.
- Mostrar el número de página actual.

Ejemplo visual:

```txt
Anterior | Página 1 | Siguiente
```

Clase sugerida:

```js
class Paginator {
  constructor(items, itemsPerPage) {
    this.items = items;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  getCurrentItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.items.slice(start, end);
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
```

---

## 12. Uso de localStorage

La aplicación debe usar `localStorage` para guardar información local del usuario.

Usos mínimos:

- Tema seleccionado.
- Última búsqueda realizada.
- Página actual.
- Favoritos, si se desea agregar.

Ejemplo:

```js
localStorage.setItem("lastSearch", "pikachu");
localStorage.setItem("currentPage", "1");
```

---

## 13. Arquitectura de carpetas

Estructura sugerida para el proyecto:

```txt
/proyecto-web
│
├── index.html
├── README.md
│
├── src
│   ├── css
│   │   ├── variables.css
│   │   ├── themes.css
│   │   ├── components.css
│   │   └── styles.css
│   │
│   ├── js
│   │   ├── main.js
│   │   │
│   │   ├── components
│   │   │   ├── PreguntaComponent.js
│   │   │   ├── CardComponent.js
│   │   │   ├── PaginationComponent.js
│   │   │   └── ThemeToggleComponent.js
│   │   │
│   │   ├── services
│   │   │   ├── ApiService.js
│   │   │   ├── PokemonService.js
│   │   │   ├── MovieService.js
│   │   │   └── StorageService.js
│   │   │
│   │   ├── adapters
│   │   │   ├── PokemonAdapter.js
│   │   │   └── MovieAdapter.js
│   │   │
│   │   ├── strategies
│   │   │   ├── PokemonSearchStrategy.js
│   │   │   └── MovieSearchStrategy.js
│   │   │
│   │   ├── models
│   │   │   ├── Pokemon.js
│   │   │   └── Movie.js
│   │   │
│   │   └── utils
│   │       └── helpers.js
│   │
│   └── assets
│       ├── images
│       └── icons
```

---

## 14. Componentes mínimos

| Componente | Responsabilidad |
|---|---|
| Header | Mostrar título y navegación principal |
| Navbar | Navegar entre secciones |
| PreguntaComponent | Controlar la búsqueda o pregunta del usuario |
| CardComponent | Mostrar cada resultado |
| PaginationComponent | Controlar el paginado |
| ThemeToggleComponent | Cambiar entre modo claro y oscuro |
| LoaderComponent | Mostrar estado de carga |
| Footer | Mostrar información final |

---

## 15. Funcionalidades mínimas esperadas

- Buscar información desde una API.
- Mostrar resultados dinámicos.
- Manipular el DOM con JavaScript.
- Cambiar entre modo claro y oscuro.
- Guardar configuración en `localStorage`.
- Aplicar paginación básica.
- Usar clases en JavaScript.
- Usar mínimo dos patrones de diseño.
- Usar variables CSS.
- Usar CSS Nesting.
- Tener estructura clara de carpetas.
- Presentar un diseño creativo y ordenado.

---

## 16. Propuesta visual del componente

El componente **Preguntar** puede tener la siguiente estructura:

```txt
┌─────────────────────────────────────┐
│  ¿Qué quieres consultar?            │
│                                     │
│  [ Pokémon / Películas ]            │
│  [ Escribe tu búsqueda...       ]   │
│  [ Buscar ]                         │
│                                     │
│  Resultado:                         │
│  ┌───────────────────────────────┐  │
│  │ Imagen                         │  │
│  │ Nombre                         │  │
│  │ Descripción / Tipo             │  │
│  └───────────────────────────────┘  │
│                                     │
│  Anterior | Página 1 | Siguiente    │
└─────────────────────────────────────┘
```

---

## 17. Criterios de evaluación

| Criterio | Descripción |
|---|---|
| Manipulación del DOM | Crear, modificar y eliminar contenido dinámicamente |
| CSS | Aplicar estilos organizados, variables y nesting |
| JavaScript | Implementar lógica funcional e interactiva |
| POO | Usar clases, métodos y objetos |
| API | Consumir información externa correctamente |
| Creatividad | Presentar una interfaz clara y atractiva |
| Modo oscuro | Implementar cambio visual con custom properties |
| Organización | Mantener carpetas y archivos bien estructurados |

---

## 18. Documentación de apoyo

### CSS

- Using CSS custom properties - MDN.
- CSS Nesting - MDN.
- Variables CSS.
- Dark mode con HTML, CSS y JavaScript.

### JavaScript

- Primeros pasos con JavaScript.
- Programación orientada a objetos en JavaScript.
- Clases, métodos y herencia.
- Web Components sin frameworks.
- Estructura de carpetas en proyectos web.

---

## 19. Checklist de entrega

- [ ] El proyecto usa HTML, CSS y JavaScript.
- [ ] Tiene un componente llamado Preguntar.
- [ ] Consume mínimo una API externa.
- [ ] Muestra datos de películas o Pokémon.
- [ ] Manipula el DOM.
- [ ] Implementa eventos.
- [ ] Usa programación orientada a objetos.
- [ ] Usa mínimo dos patrones de diseño.
- [ ] No usa Factory.
- [ ] No usa Singleton.
- [ ] Usa CSS custom properties.
- [ ] Usa CSS Nesting.
- [ ] Tiene modo claro.
- [ ] Tiene modo oscuro.
- [ ] Guarda el tema en localStorage.
- [ ] Tiene sistema mínimo de paginado.
- [ ] Tiene arquitectura de carpetas definida.
- [ ] Tiene diseño creativo y ordenado.
- [ ] Tiene README con explicación del proyecto.

---

## 20. Conclusión

El proyecto propuesto cumple con los requisitos del desafío de desarrollo web porque integra HTML, CSS y JavaScript en un componente interactivo llamado **Preguntar**. Este componente permite consultar información desde una API externa, mostrar resultados dinámicos, aplicar manipulación del DOM, implementar modo oscuro con variables CSS y organizar la lógica mediante programación orientada a objetos.

Además, el uso de patrones como **Adapter** y **Strategy** permite mejorar la estructura del código sin recurrir a Factory ni Singleton. La inclusión de paginación, `localStorage`, CSS Nesting y una arquitectura clara de carpetas fortalece la calidad técnica del proyecto y facilita su mantenimiento.
