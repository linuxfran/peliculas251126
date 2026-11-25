// Catálogo de CineMundo
const contenido = [
    { id: "p1", tipo: "pelicula", titulo: "Interestelar", genero: "Ciencia ficción", anio: 2014, descripcion: "Un viaje por el espacio para encontrar un nuevo hogar.", imagen: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800" },
    { id: "p2", tipo: "pelicula", titulo: "El origen", genero: "Acción", anio: 2010, descripcion: "Un hombre puede entrar en los sueños de otras personas.", imagen: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800" },
    { id: "p3", tipo: "pelicula", titulo: "Coco", genero: "Animación", anio: 2017, descripcion: "Un niño descubre los secretos de su familia a través de la música.", imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800" },
    { id: "p4", tipo: "pelicula", titulo: "En busca de la felicidad", genero: "Drama", anio: 2006, descripcion: "Una historia sobre la perseverancia y nunca rendirse.", imagen: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800" },
    { id: "d1", tipo: "documental", titulo: "Nuestro planeta", genero: "Naturaleza", anio: 2019, descripcion: "Un recorrido por los paisajes y animales del planeta.", imagen: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800" },
    { id: "d2", tipo: "documental", titulo: "El universo", genero: "Ciencia", anio: 2022, descripcion: "Descubre los misterios del espacio y las estrellas.", imagen: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800" },
    { id: "d3", tipo: "documental", titulo: "Civilizaciones antiguas", genero: "Historia", anio: 2021, descripcion: "Conoce las civilizaciones que marcaron la historia.", imagen: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=800" },
    { id: "d4", tipo: "documental", titulo: "El futuro digital", genero: "Tecnología", anio: 2023, descripcion: "Explora cómo la tecnología está cambiando nuestras vidas.", imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800" }
];

function obtenerFavoritos() {
    try {
        const guardados = JSON.parse(localStorage.getItem("favoritos")) || [];
        return Array.isArray(guardados) ? guardados : [];
    } catch {
        return [];
    }
}

function mostrarContenido(lista, contenedor) {
    if (!contenedor) return;
    if (lista.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">No se encontraron resultados.</p>';
        return;
    }

    const favoritos = obtenerFavoritos();
    contenedor.innerHTML = lista.map(item => `
        <article class="tarjeta">
            <img src="${item.imagen}" alt="Imagen de ${item.titulo}" loading="lazy">
            <div class="tarjeta-contenido">
                <p class="etiqueta">${item.tipo === "pelicula" ? "Película" : "Documental"} · ${item.genero} · ${item.anio}</p>
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
                <button class="boton-favorito" type="button" data-id="${item.id}" aria-pressed="${favoritos.includes(item.id)}">
                    ${favoritos.includes(item.id) ? "♥ Quitar de favoritos" : "♡ Agregar a favoritos"}
                </button>
            </div>
        </article>
    `).join("");

    contenedor.querySelectorAll(".boton-favorito").forEach(boton => {
        boton.addEventListener("click", () => alternarFavorito(boton.dataset.id));
    });
}

function alternarFavorito(id) {
    const favoritos = obtenerFavoritos();
    const nuevosFavoritos = favoritos.includes(id)
        ? favoritos.filter(favorito => favorito !== id)
        : [...favoritos, id];
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));

    if (window.location.pathname.endsWith("favoritos.html")) {
        mostrarContenido(contenido.filter(item => nuevosFavoritos.includes(item.id)), document.getElementById("catalogo"));
        return;
    }

    document.querySelectorAll(".boton-favorito").forEach(boton => {
        const esFavorito = nuevosFavoritos.includes(boton.dataset.id);
        boton.setAttribute("aria-pressed", String(esFavorito));
        boton.textContent = esFavorito ? "♥ Quitar de favoritos" : "♡ Agregar a favoritos";
    });
}

function prepararCatalogo(tipo, contenedor) {
    const buscador = document.getElementById("buscador");
    const filtro = document.getElementById("filtro");
    if (!buscador || !filtro) return;

    function actualizar() {
        const texto = buscador.value.trim().toLocaleLowerCase("es");
        const genero = filtro.value;
        const resultados = contenido.filter(item => item.tipo === tipo &&
            item.titulo.toLocaleLowerCase("es").includes(texto) &&
            (genero === "todos" || item.genero === genero));
        mostrarContenido(resultados, contenedor);
    }

    buscador.addEventListener("input", actualizar);
    filtro.addEventListener("change", actualizar);
    actualizar();
}

function recomendarSorpresa() {
    const recomendacion = contenido[Math.floor(Math.random() * contenido.length)];
    mostrarContenido([recomendacion], document.getElementById("sorpresa"));
}

function iniciarPagina() {
    const pagina = window.location.pathname.split("/").pop();
    const contenedor = document.getElementById("catalogo");
    const destacadas = document.getElementById("destacadas");

    if (pagina === "index.html" || pagina === "") {
        mostrarContenido(contenido.filter(item => item.tipo === "pelicula").slice(0, 3), destacadas);
        const botonSorpresa = document.getElementById("botonSorpresa");
        if (botonSorpresa) botonSorpresa.onclick = recomendarSorpresa;
    } else if (pagina === "peliculas.html") {
        prepararCatalogo("pelicula", contenedor);
    } else if (pagina === "documentales.html") {
        prepararCatalogo("documental", contenedor);
    } else if (pagina === "favoritos.html") {
        mostrarContenido(contenido.filter(item => obtenerFavoritos().includes(item.id)), contenedor);
    }
}

iniciarPagina();
