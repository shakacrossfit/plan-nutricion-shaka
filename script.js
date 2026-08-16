(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var navToggleLabel = document.getElementById("nav-toggle-label");
  var navMenu = document.getElementById("nav-menu");
  var mobileActions = document.querySelector(".mobile-actions");
  var heroPrimaryAction = document.querySelector(".hero .button-primary");
  var finalCta = document.querySelector(".final-cta");
  var sampleDialog = document.getElementById("sample-dialog");
  var sampleDialogTitle = document.getElementById("sample-dialog-title");
  var sampleDialogImage = document.getElementById("sample-dialog-image");
  var sampleClose = document.getElementById("sample-close");
  var sampleButtons = document.querySelectorAll(".sample-open");
  var sampleTrigger = null;
  var year = document.getElementById("year");
  var actionUpdateQueued = false;

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function closeMenu(restoreFocus) {
    if (!navToggle || !navMenu) return;
    var wasOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", "false");
    if (navToggleLabel) navToggleLabel.textContent = "Abrir menú";
    navMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    requestMobileActionUpdate();

    if (restoreFocus && wasOpen) {
      window.requestAnimationFrame(function () {
        navToggle.focus();
      });
    }
  }

  function openMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "true");
    if (navToggleLabel) navToggleLabel.textContent = "Cerrar menú";
    navMenu.classList.add("is-open");
    document.body.classList.add("menu-open");
    requestMobileActionUpdate();
  }

  function updateMobileActions() {
    actionUpdateQueued = false;
    if (!mobileActions || !heroPrimaryAction || !finalCta) return;

    var heroActionRect = heroPrimaryAction.getBoundingClientRect();
    var finalCtaRect = finalCta.getBoundingClientRect();
    var heroActionHasPassed = heroActionRect.bottom < 0;
    var finalCtaHasArrived = finalCtaRect.top < window.innerHeight;
    var shouldShow =
      window.innerWidth <= 600 &&
      heroActionHasPassed &&
      !finalCtaHasArrived &&
      !document.body.classList.contains("menu-open") &&
      !document.body.classList.contains("dialog-open");

    mobileActions.classList.toggle("is-visible", shouldShow);
    mobileActions.setAttribute("aria-hidden", shouldShow ? "false" : "true");
    mobileActions.toggleAttribute("inert", !shouldShow);
  }

  function requestMobileActionUpdate() {
    if (actionUpdateQueued) return;
    actionUpdateQueued = true;
    window.requestAnimationFrame(updateMobileActions);
  }

  updateHeader();
  updateMobileActions();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("scroll", requestMobileActionUpdate, { passive: true });
  window.addEventListener("resize", requestMobileActionUpdate);

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu(false);
      else openMenu();
    });

    navMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        navToggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) closeMenu(false);
    });
  }

  if (sampleDialog && sampleDialogImage && sampleClose) {
    sampleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var caption = button.closest("figure").querySelector("figcaption");
        sampleTrigger = button;
        sampleDialogImage.src = button.dataset.sample || "";
        sampleDialogImage.alt = button.dataset.alt || "Muestra de la guía";
        if (sampleDialogTitle && caption) {
          sampleDialogTitle.textContent = caption.textContent;
        }
        sampleDialog.showModal();
        document.body.classList.add("dialog-open");
        requestMobileActionUpdate();
      });
    });

    sampleClose.addEventListener("click", function () {
      sampleDialog.close();
    });

    sampleDialog.addEventListener("click", function (event) {
      if (event.target === sampleDialog) sampleDialog.close();
    });

    sampleDialog.addEventListener("close", function () {
      document.body.classList.remove("dialog-open");
      requestMobileActionUpdate();
      sampleDialogImage.src = "img/muestras/01-resumen-anonimizado.png";
      sampleDialogImage.alt =
        "Resumen anonimizado de un bloque de la Guía de Alimentación Shaka";
      if (sampleDialogTitle) sampleDialogTitle.textContent = "Muestra de la guía";
      if (sampleTrigger) {
        window.requestAnimationFrame(function () {
          sampleTrigger.focus();
          sampleTrigger = null;
        });
      }
    });
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
