/* =========================================================
   /layout/header.js
   Renderiza el menú principal dentro de <nav id="nav"></nav>
   Maneja:
     - menú móvil (botón #menuBtn)
     - cierre al hacer clic en un enlace
     - estado activo según ruta
     - clases scrolled / is-fixed al hacer scroll
   Paso A — definitivo.
   Idempotente: no se re-inicializa si ya corrió.
========================================================= */
(function () {
  "use strict";

  if (window.__TN_HEADER_INIT__) return;
  window.__TN_HEADER_INIT__ = true;

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /* Normaliza una ruta para comparación */
  function normPath(p) {
    if (!p) return "/index.html";
    var path = String(p).split("?")[0].split("#")[0].replace(/\/+$/, "");
    if (!path) return "/index.html";
    if (/\/$/.test(path)) return path + "index.html";
    return path;
  }

  /* Determina la sección activa a partir del path */
  function sectionFromPath(rawPath) {
    var path = normPath(rawPath);

    if (path === "/" || /\/index\.html$/i.test(path) && path === "/index.html") return "home";
    if (path === "/index.html") return "home";

    if (path.indexOf("/pages/core/servicios") !== -1) return "servicios";
    if (path.indexOf("/pages/core/nosotros")  !== -1) return "nosotros";
    if (path.indexOf("/pages/core/faq")       !== -1) return "faq";
    if (path.indexOf("/pages/core/contacto")  !== -1) return "contacto";

    /* Visaspais y trámites quedan bajo "Servicios" */
    if (path.indexOf("/pages/visaspais/") !== -1) return "servicios";
    if (path.indexOf("/pages/tramites/")  !== -1) return "servicios";

    /* Legal: no resaltamos ningún item */
    if (path.indexOf("/pages/legal/") !== -1) return "";

    return "";
  }

  /* Render del menú */
  function renderNav(navEl, items, current) {
    if (!navEl || !Array.isArray(items)) return;

    var html = items.map(function (item) {
      var isActive = item && item.section && item.section === current;
      var cls      = isActive ? ' class="active"' : "";
      var current_ = isActive ? ' aria-current="page"' : "";
      return '<a href="' + item.url + '"' + cls + current_ + '>' + item.name + '</a>';
    }).join("");

    navEl.innerHTML = html;
  }

  /* Menú móvil */
  function bindMobileMenu(menuBtn, navEl) {
    if (!menuBtn || !navEl) return;

    function close() {
      navEl.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "Menú";
      document.body.style.overflow = "";
    }

    function toggle() {
      var willOpen = !navEl.classList.contains("open");
      navEl.classList.toggle("open", willOpen);
      menuBtn.setAttribute("aria-expanded", String(willOpen));
      menuBtn.textContent = willOpen ? "Cerrar" : "Menú";
      document.body.style.overflow = willOpen ? "hidden" : "";
    }

    menuBtn.addEventListener("click", toggle);

    /* Cerrar al hacer clic en cualquier link interno del menú */
    navEl.addEventListener("click", function (e) {
      var target = e && e.target;
      if (!target || target.tagName !== "A") return;
      close();
    });

    /* Cerrar con tecla Escape */
    document.addEventListener("keydown", function (e) {
      if (e && e.key === "Escape" && navEl.classList.contains("open")) close();
    });

    /* Cerrar al ampliar la ventana a desktop */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980 && navEl.classList.contains("open")) close();
    });
  }

  /* Estado scrolled / is-fixed para el header */
  function bindHeaderScroll() {
    var header = document.querySelector(".header");
    if (!header) return;

    var raf = null;
    function update() {
      var y = window.scrollY || window.pageYOffset || 0;
      header.classList.toggle("is-fixed", y > 80);
      header.classList.toggle("scrolled", y > 40);
      raf = null;
    }
    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  onReady(function () {
    var navEl   = document.getElementById("nav");
    var menuBtn = document.getElementById("menuBtn");
    var items   = window.NAV_ITEMS;

    if (navEl && Array.isArray(items)) {
      var current = sectionFromPath(location.pathname);
      renderNav(navEl, items, current);
    }

    bindMobileMenu(menuBtn, navEl);
    bindHeaderScroll();
  });
})();
