
document.addEventListener("DOMContentLoaded", async function () {

    const contenedor = document.getElementById("instagram-pedalin");

    if (!contenedor) return;

    const url = "https://pedalin-instagram.gonzagarcia143.workers.dev/";

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las publicaciones");
        }

        const datos = await respuesta.json();
        const publicaciones = datos.publicaciones || [];

        contenedor.innerHTML = "";

        if (publicaciones.length === 0) {
            contenedor.textContent = "Todavía no hay publicaciones disponibles.";
            return;
        }

        contenedor.style.display = "grid";
        contenedor.style.gridTemplateColumns =
            "repeat(auto-fit, minmax(220px, 1fr))";
        contenedor.style.gap = "20px";

        publicaciones.forEach(function (publicacion) {

            const imagenURL =
                publicacion.media_type === "VIDEO"
                    ? publicacion.thumbnail_url
                    : publicacion.media_url;

            if (!imagenURL || !publicacion.permalink) return;

            const enlace = document.createElement("a");
            enlace.href = publicacion.permalink;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";
            enlace.style.display = "block";
            enlace.style.position = "relative";
            enlace.style.overflow = "hidden";
            enlace.style.borderRadius = "8px";

            const imagen = document.createElement("img");
            imagen.src = imagenURL;
            imagen.alt = publicacion.caption
                ? publicacion.caption.substring(0, 100)
                : "Publicación de Instagram de PEDALIN";
            imagen.loading = "lazy";
            imagen.style.width = "100%";
            imagen.style.aspectRatio = "1 / 1";
            imagen.style.objectFit = "cover";
            imagen.style.display = "block";

            enlace.appendChild(imagen);

            if (publicacion.media_type === "VIDEO") {
                const simbolo = document.createElement("span");
                simbolo.textContent = "▶";
                simbolo.style.position = "absolute";
                simbolo.style.top = "10px";
                simbolo.style.right = "12px";
                simbolo.style.color = "white";
                simbolo.style.fontSize = "24px";
                simbolo.style.textShadow = "0 1px 5px black";

                enlace.appendChild(simbolo);
            }

            contenedor.appendChild(enlace);
        });

    } catch (error) {
        console.error("Error al cargar Instagram:", error);
        contenedor.textContent =
            "No se pudieron cargar las publicaciones de Instagram.";
    }
});
// JavaScript Document