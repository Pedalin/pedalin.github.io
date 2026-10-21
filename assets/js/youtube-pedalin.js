
const API_KEY = "AIzaSyD4p49XBP8eKmecDoWOBLi2VV9k_XSzSco";
const PLAYLIST_ID = "UUC1zfS_zmbqeqpJVSvUMshA";

async function cargarVideosPedalin() {
    const contenedor = document.getElementById("videos-pedalin");

    if (!contenedor) return;

    contenedor.textContent = "Cargando videos de PEDALIN...";

    const url = new URL(
        "https://www.googleapis.com/youtube/v3/playlistItems"
    );

    url.searchParams.set("part", "snippet");
    url.searchParams.set("playlistId", PLAYLIST_ID);
    url.searchParams.set("maxResults", "12");
    url.searchParams.set("key", API_KEY);

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudieron consultar los videos");
        }

        const datos = await respuesta.json();
        contenedor.replaceChildren();
		contenedor.style.display = "grid";
		contenedor.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		contenedor.style.gap = "20px";contenedor.style.display = "grid";
		

        for (const video of datos.items || []) {
            const id = video.snippet.resourceId?.videoId;
            if (!id) continue;

            const enlace = document.createElement("a");
            enlace.href = `https://www.youtube.com/watch?v=${id}`;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";

            const imagen = document.createElement("img");
            imagen.src = video.snippet.thumbnails?.medium?.url || "";
            imagen.alt = video.snippet.title;
            imagen.style.width = "100%";

            const titulo = document.createElement("p");
            titulo.textContent = video.snippet.title;

            enlace.append(imagen, titulo);
            contenedor.appendChild(enlace);
        }
    } catch (error) {
        contenedor.textContent =
            "Por ahora no se pudieron cargar los videos.";
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", cargarVideosPedalin);
// JavaScript Document