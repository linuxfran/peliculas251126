# CineMundo 🎬

CineMundo es una pequeña guía web para descubrir películas y documentales. Puedes explorar el catálogo, buscar títulos, filtrar por género o categoría, guardar tus favoritos y pedir una recomendación aleatoria cuando no sabes qué ver.

## Funciones

- Catálogos separados de películas y documentales.
- Búsqueda por título y filtros por género o categoría.
- Lista de favoritos que se guarda en el navegador con `localStorage`.
- Recomendación sorpresa en la portada.
- Diseño adaptable a celulares y computadores.

## Cómo funciona

La interfaz está hecha con HTML y CSS, sin frameworks ni dependencias que instalar. `js/app.js` contiene el catálogo y la lógica de búsqueda, filtros, favoritos y recomendaciones. Los favoritos quedan guardados en el navegador del dispositivo, así que no se comparten entre equipos. Las imágenes del catálogo se cargan desde Unsplash y requieren conexión a internet; el resto de la app funciona como una página estática.

## Ejecutar el proyecto

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd peliculas241126
   ```

2. Abre `index.html` en un navegador. También puedes abrir la carpeta con VS Code y usar una extensión de servidor local, como Live Server.

No se requiere instalar paquetes ni configurar variables de entorno.

## Páginas

- `index.html`: portada, películas destacadas y recomendación sorpresa.
- `peliculas.html`: catálogo de películas con búsqueda y filtro.
- `documentales.html`: catálogo de documentales con búsqueda y filtro.
- `favoritos.html`: elementos guardados en el navegador.

## Flujo de ramas del proyecto

El proyecto utiliza `main` para la versión estable y `develop` para el desarrollo. Los cambios se preparan en `develop` con commits descriptivos y, cuando están listos, se integran a `main`.

```bash
git switch develop
# realiza cambios y crea commits descriptivos
git push -u origin develop
git switch main
git merge develop
git push origin main
```

## Tecnologías

HTML5 · CSS3 · JavaScript · Git y GitHub
