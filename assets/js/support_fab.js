/* support-fab.js — Travel Now */
(function () {
  "use strict";

  var WA_URL = "https://wa.me/5215521114448?text=Hola%2C%20vengo%20desde%20travel-now.com.mx%20y%20quiero%20informaci%C3%B3n%20%F0%9F%99%82";
  var FB_URL = "https://www.facebook.com/share/1DTbZwXcYM/";
  var TK_URL = "https://www.tiktok.com/@travel.nowvisas";

  function ensureSupportUI() {
    var overlay = document.getElementById("supportOverlay");
    var fab     = document.getElementById("supportFab");
    var panel   = document.getElementById("supportPanel");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "supportOverlay";
      overlay.className = "support-overlay";
      document.body.appendChild(overlay);
    }

    if (!fab) {
      fab = document.createElement("button");
      fab.id = "supportFab";
      fab.className = "support-fab";
      fab.type = "button";
      fab.setAttribute("aria-label", "Abrir soporte");
      fab.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7v3a3 3 0 0 0 3 3h1v-5H6V9a6 6 0 1 1 12 0v1h-3v5h1a3 3 0 0 0 3-3V9a7 7 0 0 0-7-7Zm-2 17h4v2h-4v-2Z"/></svg>';
      document.body.appendChild(fab);
    }

    if (!panel) {
      panel = document.createElement("div");
      panel.id = "supportPanel";
      panel.className = "support-panel";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "false");
      panel.setAttribute("aria-label", "Soporte rapido");
      panel.innerHTML = [
        '<div class="support-head">',
          '<div class="support-title">Contactanos</div>',
          '<button type="button" class="support-close" id="supportClose" aria-label="Cerrar">Cerrar</button>',
        '</div>',
        '<div class="support-actions">',
          '<a class="social-btn is-wa" href="' + WA_URL + '" target="_blank" rel="noopener noreferrer">',
            '<div class="left">',
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.68 15l-1.1 4.02 4.12-1.08A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.07-1.1l-.29-.17-2.45.65.66-2.35-.19-.3A8 8 0 1 1 12 20Zm4.2-6.05c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.52.12-.15.23-.6.75-.74.9-.14.15-.27.17-.5.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.35-1.27-1.58-.13-.23-.01-.35.1-.46.1-.1.23-.27.34-.4.11-.14.15-.23.23-.38.08-.15.04-.28-.02-.4-.06-.12-.52-1.24-.71-1.7-.19-.44-.38-.38-.52-.38h-.44c-.15 0-.4.05-.6.28-.2.23-.78.76-.78 1.85s.8 2.14.91 2.29c.12.15 1.58 2.48 3.86 3.38.54.23.97.36 1.3.46.55.18 1.05.15 1.44.09.44-.07 1.36-.56 1.55-1.1.19-.55.19-1.01.13-1.1-.06-.1-.21-.15-.44-.27Z"/></svg>',
              '<div class="meta"><div class="label">WhatsApp</div><div class="sub">Respuesta inmediata</div></div>',
            '</div><span aria-hidden="true">&#x2192;</span>',
          '</a>',
          '<a class="social-btn is-fb" href="' + FB_URL + '" target="_blank" rel="noopener noreferrer">',
            '<div class="left">',
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2V11H7.5v3H10v8h3.5Z"/></svg>',
              '<div class="meta"><div class="label">Facebook</div><div class="sub">travel-now</div></div>',
            '</div><span aria-hidden="true">&#x2192;</span>',
          '</a>',
          '<a class="social-btn is-tk" href="' + TK_URL + '" target="_blank" rel="noopener noreferrer">',
            '<div class="left">',
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09Z"/></svg>',
              '<div class="meta"><div class="label">TikTok</div><div class="sub">@travel.nowvisas</div></div>',
            '</div><span aria-hidden="true">&#x2192;</span>',
          '</a>',
          '<a class="social-btn is-phone" href="tel:+5215521114448">',
            '<div class="left">',
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011-.24c1.12.37 2.33.57 3.59.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.2 2.47.57 3.59a1 1 0 01-.24 1l-2.2 2.2z"/></svg>',
              '<div class="meta"><div class="label">Llamar</div><div class="sub">55 2111 4448</div></div>',
            '</div><span aria-hidden="true">&#x2192;</span>',
          '</a>',
        '</div>'
      ].join("");
      document.body.appendChild(panel);
    }

    return { overlay: overlay, fab: fab, panel: panel };
  }

  function init() {
    var ui      = ensureSupportUI();
    var overlay = ui.overlay;
    var fab     = ui.fab;
    var panel   = ui.panel;
    var closeBtn = document.getElementById("supportClose");

    var open = function () {
      overlay.classList.add("is-open");
      panel.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
    };
    var close = function () {
      overlay.classList.remove("is-open");
      panel.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
    };
    var isOpen = function () { return panel.classList.contains("is-open"); };

    fab.addEventListener("click", function () { isOpen() ? close() : open(); });
    overlay.addEventListener("click", close);

    /* Delegacion: el closeBtn puede ser inyectado tarde */
    document.addEventListener("click", function (e) {
      if (e.target && e.target.id === "supportClose") close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) close();
    });

    /* Botones que abren soporte */
    document.addEventListener("click", function (e) {
      if (!e.target) return;
      var supportBtn = e.target.closest(".is-support");
      if (!supportBtn) return;
      e.preventDefault();
      open();
    });

    /* Boton asistente guiado: lo delega a main.js si existe */
    document.addEventListener("click", function (e) {
      if (!e.target) return;
      var btn = e.target.closest(".is-assistant");
      if (!btn) return;
      close();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
