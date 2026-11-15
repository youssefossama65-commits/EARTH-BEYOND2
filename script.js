/* ==========================================================================
   PAGE 1 — LANDING SCRIPT (standalone: ستارفيلد + لوحة ☰ + زرار البداية)
   ========================================================================== */

function $(id) { return document.getElementById(id); }

var calmMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
/* ---------- لوحة ☰ ---------- */
function syncSideOptionState(btn) {
  var stateEl = btn.querySelector(".side-option-state");
  if (stateEl) stateEl.textContent = btn.getAttribute("aria-pressed") === "true" ? "On" : "Off";
}

function setupSidePanel() {
  var toggleBtn = $("menuToggleBtn");
  var panel = $("sidePanel");
  var scrim = $("panelScrim");
  var closeBtn = $("panelCloseBtn");
  if (!toggleBtn || !panel || !scrim) return;

  function setPanelOpen(open, returnFocus) {
    toggleBtn.setAttribute("aria-expanded", String(open));
    toggleBtn.setAttribute("aria-label",
      open ? "Close mission controls" : "Open mission controls — comfort and vision tools");
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
    if (e.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") setPanelOpen(false, true);
  });
}

/* ---------- أدوات الرؤية ---------- */
function setupVisionControls() {
  var fontBtn = $("fontSizeToggle");
  var contrastBtn = $("contrastToggle");
  var motionBtn = $("motionToggle");

  if (fontBtn) fontBtn.addEventListener("click", function () {
    var active = document.documentElement.classList.toggle("big-text");
    fontBtn.setAttribute("aria-pressed", String(active));
    syncSideOptionState(fontBtn);
  });

  if (contrastBtn) contrastBtn.addEventListener("click", function () {
    var active = document.body.classList.toggle("high-contrast");
    contrastBtn.setAttribute("aria-pressed", String(active));
    syncSideOptionState(contrastBtn);
  });

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
      drawStars();
    });
  }
}

/* ---------- ستارفيلد 2D ---------- */
var canvas = $("spaceCanvas");
var ctx = canvas ? canvas.getContext("2d") : null;
var stars = [];
var animFrameId = null;

function initStars() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var count = Math.min(110, Math.floor((canvas.width * canvas.height) / 14000));
  stars = [];
  for (var i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.8 + Math.random() * 1.9,
      alpha: 0.35 + Math.random() * 0.65,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function renderStars(time) {
  if (!ctx) return;
  time = time || 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var highContrast = document.body.classList.contains("high-contrast");

  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];
    var twinkle = calmMotion ? 1 : 0.65 + 0.35 * Math.sin(time * 0.002 + s.phase);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = highContrast
      ? "rgba(255,255,255," + (0.45 * twinkle) + ")"
      : "rgba(225,240,255," + (s.alpha * twinkle) + ")";
    ctx.fill();
  }

  if (!calmMotion) animFrameId = requestAnimationFrame(renderStars);
}

function drawStars() {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  renderStars(0);
}

window.addEventListener("resize", function () { initStars(); drawStars(); });

/* ---------- تشغيل ---------- */
setupVisionControls();
setupSidePanel();
initStars();
drawStars();


