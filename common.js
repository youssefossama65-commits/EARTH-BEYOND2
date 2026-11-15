/* ==========================================================================
   BEYOND EARTH — SHARED UI CORE (both pages)
   Starfield · Side mission menu · Comfort controls · 3D handoff hook
   No 3D libraries, no audio. Pure 2D + empty slots.
   ========================================================================== */

/**
 * TEAM INTEGRATION HOOK
 * 3D team:  window.SpaceIntegration.onLaunch3D(context)
 *           أو اسمع للـ event: space:launch-3d
 */
window.SpaceIntegration = {
  onStartSession: null, // function({ nextPageUrl }) — بداية الجلسة من الصفحة الأولى
  onLaunch3D: null      // function(context) — الانتقال لموديل الـ3D
};

/* ---------------- DOM helper ---------------- */
function $(id) {
  return document.getElementById(id);
}

/* ---------------- shared state ---------------- */
var calmMotion = window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;
var toastTimer = null;

/* ==========================================================================
   TOAST
   ========================================================================== */
function showToast(message) {
  var toast = $("spaceToast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.hidden = true; }, 3200);
}

/* ==========================================================================
   EMPTY SLOT HELPERS
   ========================================================================== */
function setSlotText(el, value, placeholder) {
  if (!el) return;
  el.textContent = value ? value : placeholder;
  el.classList.toggle("is-empty", !value);
  if (!value) el.setAttribute("aria-label", "Empty slot: " + placeholder);
  else el.removeAttribute("aria-label");
}

/* ==========================================================================
   3D HANDOFF HOOK (آخر خطوة 2D — الـ 3D نفسه برا النطاق)
   ========================================================================== */
function launch3D(context) {
  context = context || {};
  window.dispatchEvent(new CustomEvent("space:launch-3d", { detail: context }));

  if (typeof window.SpaceIntegration.onLaunch3D === "function") {
    window.SpaceIntegration.onLaunch3D(context);
    return;
  }

  if (context.url) {
    window.location.href = context.url;
    return;
  }

  showToast((context.label ? context.label + " — " : "") + "3D slot ready، ضيف handoff3DUrl في data.js");
}

/* ==========================================================================
   SIDE MISSION MENU (☰)
   ========================================================================== */
function syncSideOptionState(btn) {
  if (!btn) return;
  var stateEl = btn.querySelector(".side-option-state");
  if (stateEl) {
    stateEl.textContent = btn.getAttribute("aria-pressed") === "true" ? "On" : "Off";
  }
}

function setupSidePanel() {
  var toggleBtn = $("menuToggleBtn");
  var panel = $("sidePanel");
  var scrim = $("panelScrim");
  var closeBtn = $("panelCloseBtn");
  if (!toggleBtn || !panel || !scrim) return;

  function setPanelOpen(open, returnFocus) {
    toggleBtn.setAttribute("aria-expanded", String(open));
    toggleBtn.setAttribute(
      "aria-label",
      open ? "Close mission controls" : "Open mission controls — comfort and vision tools"
    );
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    scrim.classList.toggle("open", open);
    if (open && closeBtn) closeBtn.focus();
    if (!open && returnFocus) toggleBtn.focus();
  }

  toggleBtn.addEventListener("click", function () {
    setPanelOpen(toggleBtn.getAttribute("aria-expanded") !== "true", true);
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { setPanelOpen(false, true); });
  scrim.addEventListener("click", function () { setPanelOpen(false, true); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
      setPanelOpen(false, true);
    }
  });

  panel.querySelectorAll(".side-jump-links a").forEach(function (link) {
    link.addEventListener("click", function () { setPanelOpen(false, false); });
  });
}

/* ==========================================================================
   VISION & COMFORT CONTROLS
   ========================================================================== */
function setupVisionControls() {
  var fontBtn = $("fontSizeToggle");
  var contrastBtn = $("contrastToggle");
  var motionBtn = $("motionToggle");

  if (fontBtn) {
    fontBtn.addEventListener("click", function () {
      var active = document.documentElement.classList.toggle("big-text");
      fontBtn.setAttribute("aria-pressed", String(active));
      syncSideOptionState(fontBtn);
    });
  }

  if (contrastBtn) {
    contrastBtn.addEventListener("click", function () {
      var active = document.body.classList.toggle("high-contrast");
      contrastBtn.setAttribute("aria-pressed", String(active));
      syncSideOptionState(contrastBtn);
    });
  }

  if (motionBtn) {
    if (calmMotion) {
      document.body.classList.add("calm-motion");
      motionBtn.setAttribute("aria-pressed", "true");
    }
    syncSideOptionState(motionBtn);

    motionBtn.addEventListener("click", function () {
      calmMotion = !calmMotion;
      document.body.classList.toggle("calm-motion", calmMotion);
      motionBtn.setAttribute("aria-pressed", String(calmMotion));
      syncSideOptionState(motionBtn);
      drawStaticOrAnimatedStars();
    });
  }
}

/* ==========================================================================
   PURE 2D STARFIELD
   ========================================================================== */
var starCanvas = null;
var starCtx = null;
var stars = [];
var animFrameId = null;

function initStars() {
  starCanvas = $("spaceCanvas");
  if (!starCanvas) return;
  starCtx = starCanvas.getContext("2d");

  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;

  var count = Math.min(110, Math.floor((starCanvas.width * starCanvas.height) / 14000));
  stars = Array.from({ length: count }, function () {
    return {
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: 0.8 + Math.random() * 1.9,
      alpha: 0.35 + Math.random() * 0.65,
      phase: Math.random() * Math.PI * 2
    };
  });
}

function renderStarsFrame(time) {
  if (!starCtx) return;
  time = time || 0;
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

  var highContrast = document.body.classList.contains("high-contrast");

  stars.forEach(function (s) {
    var twinkle = calmMotion ? 1 : 0.65 + 0.35 * Math.sin(time * 0.002 + s.phase);
    starCtx.beginPath();
    starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starCtx.fillStyle = highContrast
      ? "rgba(255, 255, 255, " + 0.45 * twinkle + ")"
      : "rgba(225, 240, 255, " + s.alpha * twinkle + ")";
    starCtx.fill();
  });

  if (!calmMotion) animFrameId = requestAnimationFrame(renderStarsFrame);
}

function drawStaticOrAnimatedStars() {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  renderStarsFrame(0);
}

window.addEventListener("resize", function () {
  initStars();
  drawStaticOrAnimatedStars();
});

/* ==========================================================================
   SCROLL REVEAL (العناصر بتظهر بنعومة وانت بتنزل)
   ========================================================================== */
function setupReveal() {
  if (!("IntersectionObserver" in window)) return; // لو المتصفح قديم: كل حاجة تفضل ظاهرة

  var targets = document.querySelectorAll(
    ".section-header, .device-card, .device-view, .part-item-btn, .detail-box"
  );
  if (!targets.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });

  targets.forEach(function (el) {
    // تأخير بسيط متتابع للعناصر اللي جانب بعض (زي كروت الأجهزة)
    var index = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--reveal-delay", Math.min(index, 9) * 55 + "ms");
    el.classList.add("revealable");
    observer.observe(el);
  });
}

/* ==========================================================================
   PAGE TRANSITIONS (خروج ناعم بين الصفحتين)
   ========================================================================== */
function setupPageTransitions() {
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;

    var link = e.target.closest ? e.target.closest("a") : null;
    if (!link) return;

    var href = link.getAttribute("href") || "";
    var isInternalPage = /\.html(\?|#|$)/.test(href) && href.indexOf("http") !== 0;
    if (!isInternalPage || link.target === "_blank" || link.hasAttribute("download")) return;

    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(function () { window.location.href = href; }, 170);
  });

  // الرجوع بـ Back (bfcache) لازم يرجّع الصفحة ظاهرة
  window.addEventListener("pageshow", function () {
    document.body.classList.remove("is-leaving");
  });
}

/* ==========================================================================
   BOOT SHARED PIECES
   ========================================================================== */
function initSharedUI() {
  setupVisionControls();
  setupSidePanel();
  setupPageTransitions();
  initStars();
  drawStaticOrAnimatedStars();
  setupReveal(); // آخر خطوة: بعد ما المحتوى اترسم
}
