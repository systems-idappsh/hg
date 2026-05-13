/* =========================================================
   TRAVEL NOW — PÁGINA DE PAÍS v2.0
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* === READ PROGRESS === */
  const bar  = document.querySelector('.read-progress');
  const doc  = document.querySelector('.pais-doc');

  if (bar && doc) {
    window.addEventListener('scroll', () => {
      const rect  = doc.getBoundingClientRect();
      const total = doc.offsetHeight - window.innerHeight;
      const done  = Math.max(0, -rect.top);
      bar.style.width = Math.min(100, (done / total) * 100) + '%';
    }, { passive: true });
  }

  /* === FAQ SELECT → SMOOTH SCROLL + HIGHLIGHT === */
  const select = document.getElementById('faq-select');
  if (select) {
    select.addEventListener('change', () => {
      const target = document.querySelector(select.value);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth', block: 'center' });

      /* quitar highlight previo */
      document.querySelectorAll('.doc-section.section-active')
        .forEach(s => s.classList.remove('section-active'));

      /* agregar highlight */
      target.classList.add('section-active');

      /* auto-limpiar después de 3s */
      setTimeout(() => target.classList.remove('section-active'), 3000);

      /* reset select */
      select.value = '';
    });
  }

  /* === HEADER SCROLL === */
  const header = document.querySelector('.header');
  if (header) {
    const toggle = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

  /* === MOBILE MENU === */
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.textContent = open ? 'Cerrar' : 'Menú';
      btn.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.textContent = 'Menú';
      document.body.style.overflow = '';
    }));
  }

  /* === SUPPORT PANEL === */
  const btns    = document.querySelectorAll('.is-support');
  const overlay = document.getElementById('supportOverlay');
  const panel   = document.getElementById('supportPanel');
  const close   = document.getElementById('supportClose');
  if (overlay && panel) {
    const open  = () => { overlay.classList.add('open'); panel.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const closeP= () => { overlay.classList.remove('open'); panel.classList.remove('open'); document.body.style.overflow = ''; };
    btns.forEach(b => b.addEventListener('click', e => { e.preventDefault(); open(); }));
    overlay.addEventListener('click', closeP);
    if (close) close.addEventListener('click', closeP);
  }

  /* === FOOTER YEAR === */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
