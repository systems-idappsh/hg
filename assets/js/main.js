/* =========================================================
   TRAVEL NOW — main.js
   Controlador unificado:
   - Menú móvil (un solo handler, sin duplicados)
   - Assistant modal
   - Review slider 3D
   - Header scroll-shrink
   ========================================================= */
(function () {
  "use strict";

  /* ---- Helpers ---- */
  function byId(id) { return document.getElementById(id); }
  function getVal(id) {
    var el = byId(id);
    if (!el) return "";
    var v = el.value;
    return typeof v === "string" ? v.trim() : "";
  }

  document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       HEADER SCROLL SHRINK
       ======================================== */
    var header = document.querySelector(".header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 40);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ========================================
       MENU MOVIL
       Un solo controlador. Usa #menuBtn / #nav.
       ======================================== */
    var menuBtn = byId("menuBtn");
    var nav     = byId("nav");

    function closeNav() {
      if (!nav || !menuBtn) return;
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }

    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
      });

      document.addEventListener("click", function (e) {
        if (!e || !e.target) return;
        var inside = nav.contains(e.target) || menuBtn.contains(e.target);
        if (!inside && nav.classList.contains("open")) closeNav();
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 980) closeNav();
      });
    }

    /* ========================================
       ASSISTANT MODAL
       ======================================== */
    var assistantBtn = document.querySelectorAll("[data-open-assistant], .is-assistant-open");
    var modal        = byId("assistantModal");
    var closeBtn     = byId("closeAssistant");
    var form         = byId("assistantForm");

    var modalOverlay = byId("assistantOverlay");

    function openModal(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (!modal) return;
      modal.classList.add("open", "is-open");
      modal.setAttribute("aria-hidden", "false");
      if (modalOverlay) modalOverlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      if (!window.matchMedia("(pointer:coarse)").matches) {
        var first = modal.querySelector("input, select, textarea");
        if (first) first.focus();
      }
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove("open", "is-open");
      modal.setAttribute("aria-hidden", "true");
      if (modalOverlay) modalOverlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    document.addEventListener("click", function (e) {
      if (!e.target) return;
      var opener = e.target.closest("[data-open-assistant], .is-assistant-open, .is-assistant");
      if (!opener) return;
      openModal(e);
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
    }
    if (modalOverlay) {
      modalOverlay.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", function (e) {
      if (!modal || !modal.classList.contains("open")) return;
      if (e.key === "Escape") closeModal();
    });

    /* Formulario asistente → WhatsApp */
    if (form) {
      var charCount = byId("charCount");
      var detalle   = byId("a_detalle");
      var submitBtn = form.querySelector("[type=submit]");

      /* Contador caracteres */
      if (detalle && charCount) {
        detalle.addEventListener("input", function () {
          charCount.textContent = detalle.value.length + " / 200";
        });
      }

      /* Habilitar/deshabilitar submit */
      function checkForm() {
        if (!submitBtn) return;
        var nombre  = getVal("a_nombre");
        var email   = getVal("a_email");
        var tramite = getVal("a_tramite");
        var ciudad  = getVal("a_ciudad");
        submitBtn.disabled = !(nombre && email && tramite && ciudad);
      }

      ["a_nombre","a_email","a_tramite","a_ciudad"].forEach(function (id) {
        var el = byId(id);
        if (el) el.addEventListener("input", checkForm);
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var nombre  = getVal("a_nombre");
        var tramite = getVal("a_tramite");
        var ciudad  = getVal("a_ciudad");
        var detalle = getVal("a_detalle");

        var parts = ["Hola, quiero asesoria para un tramite."];
        if (nombre)  parts.push("Nombre: " + nombre);
        if (tramite) parts.push("Tramite: " + tramite);
        if (ciudad)  parts.push("Ubicacion: " + ciudad);
        if (detalle) parts.push("Detalles: " + detalle);
        parts.push("Vengo desde travel-now.com.mx");

        var url = "https://wa.me/5215521114448?text=" + encodeURIComponent(parts.join("\n"));
        window.open(url, "_blank", "noopener");
      });
    }

    /* ========================================
       REVIEW SLIDER 3D
       Solo activo si el DOM tiene #reviews3dStage
       ======================================== */
    var stage   = byId("reviews3dStage");
    var dataEl  = byId("reviewsData");
    var btnPrev = byId("revPrev");
    var btnNext = byId("revNext");
    var countEl = byId("reviewsCount");
    var shell   = byId("reviewsShell");

    if (!stage || !dataEl) return; /* salida limpia, no hay reviews en esta página */

    var reviews = [];
    try {
      var raw = String(dataEl.textContent || "").trim();
      reviews = raw ? JSON.parse(raw) : [];
    } catch (err) {
      reviews = [];
    }
    if (!Array.isArray(reviews)) reviews = [];
    if (countEl) countEl.textContent = reviews.length + " reseñas";
    if (reviews.length === 0) return;

    var index    = 0;
    var autoTimer = null;
    var isPaused  = false;
    var AUTO_MS   = 4500;

    function clampIndex(i) {
      var n = reviews.length;
      return (i % n + n) % n;
    }

    function starsLine(n) {
      var s = Math.max(1, Math.min(5, Math.round(Number(n) || 5)));
      return "★★★★★".slice(0, s) + "☆☆☆☆☆".slice(0, 5 - s);
    }

    function formatDate(iso) {
      var str = String(iso || "").trim();
      if (!str) return "";
      var d = new Date(str);
      if (isNaN(d.getTime())) return str;
      try {
        return d.toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "2-digit" });
      } catch (e) { return str; }
    }

    function makeEl(tag, cls) {
      var el = document.createElement(tag);
      if (cls) el.className = cls;
      return el;
    }

    function safeStr(v) { return typeof v === "string" ? v.trim() : ""; }

    function renderCard(item, pos, isActive) {
      var card = makeEl("article", "r3d-card");
      card.setAttribute("data-pos", pos);
      card.tabIndex = 0;

      var head   = makeEl("div", "r3d-head");
      var avatar = makeEl("div", "r3d-avatar");
      avatar.textContent = safeStr(item.avatar) || "AV";

      var info = makeEl("div", "");
      var name = makeEl("div", "r3d-name");
      name.textContent = safeStr(item.name) || "Reseña";

      var meta = makeEl("div", "r3d-meta");
      var date = safeStr(item.date);
      var tag  = safeStr(item.tag);
      var chip = makeEl("span", "src-chip");
      var dot  = makeEl("span", "src-dot");
      dot.setAttribute("aria-hidden", "true");
      chip.appendChild(dot);
      chip.appendChild(document.createTextNode("Google"));

      var metaText = [];
      if (date) metaText.push(formatDate(date));
      if (tag)  metaText.push(tag);
      meta.textContent = metaText.join(" • ");
      if (meta.textContent) meta.appendChild(document.createTextNode(" "));
      meta.appendChild(chip);

      info.appendChild(name);
      info.appendChild(meta);
      head.appendChild(avatar);
      head.appendChild(info);

      var stars = makeEl("div", "r3d-stars");
      stars.textContent = starsLine(item.stars);

      var text = makeEl("div", "r3d-text");
      text.textContent = safeStr(item.text) || "";

      var more = makeEl("button", "r3d-more");
      more.type = "button";
      more.textContent = "Ver más";
      more.setAttribute("data-action", "toggle");
      if (!isActive) more.style.display = "none";

      card.appendChild(head);
      card.appendChild(stars);
      card.appendChild(text);
      card.appendChild(more);

      return card;
    }

    function build(directionClass) {
      while (stage.firstChild) stage.removeChild(stage.firstChild);

      if (directionClass) {
        stage.classList.remove("slide-next", "slide-prev");
        stage.classList.add(directionClass);
        setTimeout(function () {
          if (stage) stage.classList.remove(directionClass);
        }, 380);
      }

      stage.appendChild(renderCard(reviews[clampIndex(index - 1)], "prev", false));
      stage.appendChild(renderCard(reviews[index], "active", true));
      stage.appendChild(renderCard(reviews[clampIndex(index + 1)], "next", false));
    }

    function go(step) {
      index = clampIndex(index + step);
      build(step > 0 ? "slide-next" : "slide-prev");
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(function () { if (!isPaused) go(1); }, AUTO_MS);
    }
    function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    function pause()  { isPaused = true; }
    function resume() { isPaused = false; }

    build("");
    startAuto();

    if (btnPrev) btnPrev.addEventListener("click", function () { go(-1); });
    if (btnNext) btnNext.addEventListener("click", function () { go(1); });

    if (shell) {
      shell.addEventListener("mouseenter", pause);
      shell.addEventListener("mouseleave", resume);
      shell.addEventListener("focusin",    pause);
      shell.addEventListener("focusout",   resume);
      shell.addEventListener("touchstart", pause, { passive: true });
      shell.addEventListener("touchend", function () { setTimeout(resume, 800); }, { passive: true });
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pause(); else resume();
    });

    stage.addEventListener("click", function (e) {
      var t = e && e.target;
      if (!t) return;
      var action = t.getAttribute && t.getAttribute("data-action");
      if (action !== "toggle") return;
      var card = t.closest ? t.closest(".r3d-card") : null;
      if (!card) return;
      var isExpanded = card.classList.toggle("expanded");
      t.textContent = isExpanded ? "Ver menos" : "Ver más";
    });

    stage.addEventListener("keydown", function (e) {
      if (!e) return;
      if (e.key === "ArrowLeft")  { e.preventDefault(); go(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    });

  }); /* end DOMContentLoaded */
})();
