/* =========================================================
   /layout/footer.js
   Rellena los placeholders del footer dinámico:
     - <div id="footer-nav"></div>
     - <div id="footer-social"></div>
     - <div id="footer-legal"></div>
   y actualiza el año en cualquier <span id="year"></span> /
   <span class="js-year"></span>.
   ---------------------------------------------------------
   Si la página tiene un footer hardcodeado SIN estos
   placeholders, este script no toca el DOM (no rompe nada).
   Idempotente: no se re-inicializa si ya corrió.
========================================================= */
(function () {
  "use strict";

  if (window.__TN_FOOTER_INIT__) return;
  window.__TN_FOOTER_INIT__ = true;

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function normPath(p) {
    if (!p) return "/index.html";
    var path = String(p).split("?")[0].split("#")[0].replace(/\/+$/, "");
    if (!path) return "/index.html";
    if (/\/$/.test(path)) return path + "index.html";
    return path;
  }

  function isActive(url) {
    return normPath(location.pathname) === normPath(url);
  }

  function isExternal(item) {
    if (!item) return false;
    if (item.external === true) return true;
    var u = String(item.url || "");
    return /^https?:\/\//i.test(u);
  }

  function attrs(item) {
    if (isExternal(item)) return ' target="_blank" rel="noopener"';
    return "";
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderNavBlock(target, items) {
    if (!target || !Array.isArray(items) || !items.length) return;
    if (target.dataset.tnRendered === "1") return;

    var html =
      '<div class="footer-column-title">Navegación</div>' +
      '<div class="footer-links"><ul class="list">' +
        items.map(function (it) {
          var cls = isActive(it.url) ? ' class="active"' : "";
          return '<li><a href="' + escapeHtml(it.url) + '"' + cls + '>' +
                 escapeHtml(it.name) + '</a></li>';
        }).join("") +
      '</ul></div>';

    target.className = "footer-col";
    target.innerHTML = html;
    target.dataset.tnRendered = "1";
  }

  function renderSocialBlock(target, items) {
    if (!target || !Array.isArray(items) || !items.length) return;
    if (target.dataset.tnRendered === "1") return;

    var html =
      '<div class="footer-column-title">Redes y Contacto</div>' +
      '<div class="footer-social-list">' +
        items.map(function (it) {
          var cls = "social-item " + (it.className || "");
          return '<a href="' + escapeHtml(it.url) + '" class="' + cls + '"' + attrs(it) + '>' +
                   '<i class="' + escapeHtml(it.icon || "") + '"></i>' +
                   '<span>' + escapeHtml(it.name) + '</span>' +
                 '</a>';
        }).join("") +
      '</div>';

    target.className = "footer-col";
    target.innerHTML = html;
    target.dataset.tnRendered = "1";
  }

  function renderLegalBlock(target, items) {
    if (!target || !Array.isArray(items) || !items.length) return;
    if (target.dataset.tnRendered === "1") return;

    var html =
      '<div class="footer-column-title">Legal</div>' +
      '<div class="footer-legal">' +
        items.map(function (it) {
          var cls = "legal-item " + (it.className || "");
          return '<a href="' + escapeHtml(it.url) + '" class="' + cls + '"' + attrs(it) + '>' +
                   '<i class="' + escapeHtml(it.icon || "") + '"></i>' +
                   '<span>' + escapeHtml(it.name) + '</span>' +
                 '</a>';
        }).join("") +
      '</div>';

    target.className = "footer-col";
    target.innerHTML = html;
    target.dataset.tnRendered = "1";
  }

  function fillYear() {
    var year = String(new Date().getFullYear());

    var byId = document.getElementById("year");
    if (byId && !byId.textContent.trim()) byId.textContent = year;

    var byClass = document.querySelectorAll(".js-year");
    for (var i = 0; i < byClass.length; i++) {
      if (!byClass[i].textContent.trim()) byClass[i].textContent = year;
    }
  }

  onReady(function () {
    fillYear();

    renderNavBlock(   document.getElementById("footer-nav"),    window.FOOTER_NAV);
    renderSocialBlock(document.getElementById("footer-social"), window.FOOTER_SOCIAL);
    renderLegalBlock( document.getElementById("footer-legal"),  window.FOOTER_LEGAL);
  });
})();
