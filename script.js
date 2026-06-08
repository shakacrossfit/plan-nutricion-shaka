/* =====================================================================
   Plan de Nutrición Shaka CrossFit — script.js
   Mejoras progresivas: sin JS la página sigue siendo 100% funcional.
   ===================================================================== */
(function () {
  "use strict";

  // Marca que hay JS (habilita las animaciones de entrada sin ocultar contenido sin JS)
  document.documentElement.classList.add("js");

  /* ---- Header: fondo sólido al hacer scroll ---- */
  var header = document.getElementById("site-header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Menú móvil ---- */
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    if (!menu || !toggle) return;
    menu.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    // Cerrar al pulsar un enlace
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    // Cerrar si se agranda la ventana a escritorio
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---- Animaciones de entrada (reveal) ---- */
  // OJO: el hero NO se incluye: debe verse siempre, sin depender de la animación.
  var revealEls = document.querySelectorAll(
    ".section-title, .section-intro, .section-lead, .problem-list li, .check-list li, .feature, .step, .price-card, .split-media, .faq-item, .tag-row, .section .btn-row"
  );

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    // Sin animación: mostrar todo tal cual
  } else {
    revealEls.forEach(function (el, i) {
      el.classList.add("reveal");
      // Stagger ligero dentro de grupos cercanos
      el.style.transitionDelay = (i % 6) * 45 + "ms";
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealEls.forEach(function (el) { io.observe(el); });

    // Red de seguridad: si el observer no dispara (pestaña en 2º plano,
    // renderers headless, etc.), mostrar todo igualmente. Nunca dejar contenido oculto.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }, 1100);
  }

  /* ---- Año del footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
