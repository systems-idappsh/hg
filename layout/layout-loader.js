/* =========================================================
   /layout/layout-loader.js
   Carga en orden los scripts de layout:
     1) /layout/nav-data.js
     2) /layout/header.js
     3) /layout/footer.js
   ---------------------------------------------------------
   - Idempotente: una sola carga por página, aunque se incluya
     dos veces.
   - Defensivo: si un script falla, lo reporta sin romper la
     ejecución del resto.
========================================================= */
(function () {
  "use strict";

  if (window.__TN_LAYOUT_LOADER_INIT__) return;
  window.__TN_LAYOUT_LOADER_INIT__ = true;

  var scripts = [
    "/layout/nav-data.js",
    "/layout/header.js",
    "/layout/footer.js"
  ];

  function alreadyLoaded(src) {
    var existing = document.querySelectorAll('script[src="' + src + '"]');
    return existing.length > 0;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (alreadyLoaded(src)) {
        resolve();
        return;
      }
      var s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.onload  = function () { resolve(); };
      s.onerror = function () { reject(new Error("No se pudo cargar: " + src)); };
      document.head.appendChild(s);
    });
  }

  scripts.reduce(function (chain, src) {
    return chain.then(function () { return loadScript(src); });
  }, Promise.resolve()).catch(function (err) {
    if (window.console && console.error) console.error("[layout-loader]", err);
  });
})();
