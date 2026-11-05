// Fija la versión antes del primer pintado para evitar el parpadeo de colores y fuentes.
// Sin ?v= queda la versión por defecto de la build (atributo data-variant del <html>).
var v = new URLSearchParams(location.search).get('v');
if (v === 'a') document.documentElement.dataset.variant = 'neon';
if (v === 'b') document.documentElement.dataset.variant = 'clasica';
