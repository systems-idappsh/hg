/* =========================================================
   /layout/nav-data.js
   Fuente única de datos para nav y footer dinámicos.
   Paso A — definitivo.
   ---------------------------------------------------------
   Reglas:
   - Las rutas son absolutas desde la raíz del sitio.
   - Las páginas de pages/visaspais/ NO aparecen en el menú principal.
   - section: identifica el ítem activo en el header al estar en esa
     página o cualquier subruta relacionada.
========================================================= */
(function () {
  "use strict";

  /* Menú principal del header */
  window.NAV_ITEMS = [
    { name: "Principal", url: "/index.html",                section: "home" },
    { name: "Servicios", url: "/pages/core/servicios.html", section: "servicios" },
    { name: "Nosotros",  url: "/pages/core/nosotros.html",  section: "nosotros" },
    { name: "FAQ",       url: "/pages/core/faq.html",       section: "faq" },
    { name: "Contacto",  url: "/pages/core/contacto.html",  section: "contacto" }
  ];

  /* Navegación del footer (refleja el menú principal) */
  window.FOOTER_NAV = window.NAV_ITEMS.slice();

  /* Bloque legal del footer */
  window.FOOTER_LEGAL = [
    {
      name: "Aviso de privacidad",
      url:  "/pages/legal/aviso_privacidad.html",
      icon: "fa-solid fa-shield-halved",
      className: "privacidad"
    },
    {
      name: "Términos y condiciones",
      url:  "/pages/legal/terminos_condiciones.html",
      icon: "fa-solid fa-file-contract",
      className: "terminos"
    }
  ];

  /* Bloque de redes y contacto del footer */
  window.FOOTER_SOCIAL = [
    {
      name: "travel-now",
      url:  "https://www.facebook.com/share/1DTbZwXcYM/",
      icon: "fa-brands fa-facebook-f",
      className: "facebook",
      external: true
    },
    {
      name: "@travel.nowvisas",
      url:  "https://www.tiktok.com/@travel.nowvisas",
      icon: "fa-brands fa-tiktok",
      className: "tiktok",
      external: true
    },
    {
      name: "WhatsApp",
      url:  "https://wa.me/5215521114448",
      icon: "fa-brands fa-whatsapp",
      className: "whatsapp",
      external: true
    },
    {
      name: "+52 1 55 2111 4448",
      url:  "tel:+5215521114448",
      icon: "fa-solid fa-phone",
      className: "phone"
    },
    {
      name: "contacto@travel-now.com.mx",
      url:  "mailto:contacto@travel-now.com.mx",
      icon: "fa-solid fa-envelope",
      className: "email"
    }
  ];

  /* Marca el banderín de "datos cargados" para que header.js / footer.js
     no se ejecuten antes de tener los arrays disponibles. */
  window.__TN_NAV_DATA_READY__ = true;
})();
