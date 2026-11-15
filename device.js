/* ==========================================================================
   BEYOND EARTH — PAGE 2 CONTROLLER (device only, no versions)
   الصورة بأسهم طالعة منها → Details / Parts / 3D
   كل البيانات من data.js. مفيش صوت.
   ========================================================================== */

var currentDevice = null;
var activePartIndex = 0;

/* ---------------- helpers ---------------- */
function getDeviceFromUrl() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get("device");
  var device = id ? window.SpaceData.getDevice(id) : null;
  return device || window.SpaceData.devices[0] || null;
}

/** مكان الصورة: لو مفيش لينك تفضل اللوحة الفاضية */
function setMediaSlot(imgEl, url, alt) {
  if (!imgEl) return;
  var slot = imgEl.closest(".media-slot");
  var caption = slot ? slot.querySelector(".media-caption") : null;
  var schematic = slot ? slot.querySelector(".placeholder-schematic") : null;

  if (url) {
    imgEl.src = url;
    imgEl.alt = alt || "";
    imgEl.hidden = false;
    if (caption) caption.hidden = true;
    if (schematic) schematic.style.display = "none";
  } else {
    imgEl.hidden = true;
    imgEl.removeAttribute("src");
    if (caption) caption.hidden = false;
    if (schematic) schematic.style.display = "block";
  }
}

function flashPanel(panel) {
  if (!panel) return;
  panel.classList.remove("is-flash");
  void panel.offsetWidth; // إعادة تشغيل الأنيميشن
  panel.classList.add("is-flash");
  if (panel.scrollIntoView) {
    panel.scrollIntoView({ behavior: calmMotion ? "auto" : "smooth", block: "center" });
  }
}

/* ==========================================================================
   المحتوى
   ========================================================================== */
function renderDevice() {
  var group = window.SpaceData.getGroupOf ? window.SpaceData.getGroupOf(currentDevice) : null;
  $("deviceCode").textContent = (group ? group.title.toUpperCase() + " · " : "DEVICE ") + currentDevice.code;
  setSlotText($("deviceTitle"), currentDevice.name, "Device name slot " + currentDevice.code);
  setSlotText($("deviceTagline"), currentDevice.tagline, "short line about this device");
  setSlotText($("deviceSummary"), currentDevice.summary, "Short summary slot for this device.");
  setSlotText($("deviceDetails"), currentDevice.details,
    "Details slot — the full explanation of this device goes here.");

  document.title = (currentDevice.name || "Device " + currentDevice.code) + " — Beyond Earth";

  setMediaSlot(
    $("deviceImage"),
    currentDevice.image2DUrl || currentDevice.thumbUrl,
    currentDevice.photoCaption
  );

  $("photoCaption").textContent = currentDevice.photoCaption + " Credit: " + (currentDevice.photoId.startsWith("PIA") ? "NASA/JPL-Caltech" : "NASA") + " · NASA Image and Video Library.";
  $("photoSource").href = currentDevice.photoSource;
  $("missionSource").href = currentDevice.sourceUrl;
  $("handoffStatus").textContent = "Walk around an illustrative 3D model; the model is not a NASA photograph.";

  renderParts();
}

/* ---------------- الأجزاء ---------------- */
function selectPart(index) {
  var part = currentDevice.parts[index];
  if (!part) return;

  activePartIndex = index;

  document.querySelectorAll(".part-item-btn").forEach(function (btn, i) {
    var isActive = i === index;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  $("partBadge").textContent = "PART " + part.number;
  setSlotText($("partTitle"), part.title, "Part name slot " + part.number);
  setSlotText($("partDescription"), part.description, "Short description slot for this part.");
  setSlotText($("partUsage"), part.usage, "Usage slot — how this part helps in space.");

  animateSwap($("partDetailCard"));
}

/** حركة صغيرة لما محتوى الكارت يتغيّر */
function animateSwap(el) {
  if (!el) return;
  el.classList.remove("is-swapping");
  void el.offsetWidth; // إعادة تشغيل الأنيميشن
  el.classList.add("is-swapping");
}

function renderParts() {
  var list = $("partsList");
  if (!list) return;
  list.innerHTML = "";

  currentDevice.parts.forEach(function (part, index) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "part-item-btn";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "false");

    btn.innerHTML =
      '<span class="part-num-circle">' + part.number + "</span>" +
      '<span class="part-item-name"></span>' +
      '<span class="part-item-arrow" aria-hidden="true">→</span>';

    setSlotText(btn.querySelector(".part-item-name"), part.title, "Part name slot " + part.number);

    btn.addEventListener("click", function () { selectPart(index); });
    list.appendChild(btn);
  });

  var hint = $("partsCountHint");
  if (hint) {
    hint.textContent = currentDevice.parts.length + " key components";
  }

  selectPart(0);
}

/* ==========================================================================
   الصورة: الأسهم الطالعة منها
   ========================================================================== */
function setupImageArrows() {
  var stage = $("deviceStage");
  var tap = $("stageTap");
  var hint = $("stageHint");
  if (!stage || !tap) return;

  tap.addEventListener("click", function () {
    var open = stage.classList.toggle("arrows-open");
    tap.setAttribute("aria-expanded", String(open));
    tap.setAttribute(
      "aria-label",
      open ? "Hide the options of this device" : "Show the options of this device"
    );
    if (hint) hint.hidden = open;
  });

  stage.querySelectorAll(".arrow-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.dataset.target;

      // سهم الـ 3D بيفتح الموديل علطول — من غير زرار تاني في النص
      if (target === "three-d") {
        trigger3D();
        return;
      }

      // سهم Details / Parts بينقل على القسم بتاعه علطول
      flashPanel(document.querySelector('[data-panel="' + target + '"]'));
    });
  });
}

/* ==========================================================================
   3D HANDOFF
   ========================================================================== */
function trigger3D() {
  launch3D({
    device: currentDevice,
    deviceId: currentDevice.id,
    url: currentDevice.handoff3DUrl || "",
    label: currentDevice.name || "Device " + currentDevice.code
  });
}

function setupLaunch3D() {
  var btn = $("launch3DBtn");
  if (btn) btn.addEventListener("click", trigger3D);
}

/* ==========================================================================
   START
   ========================================================================== */
function initDevicePage() {
  if (!window.SpaceData || !window.SpaceData.devices.length) return;

  currentDevice = getDeviceFromUrl();
  if (!currentDevice) return;

  renderDevice();
  setupImageArrows();
  setupLaunch3D();
  initSharedUI();
}

initDevicePage();

/* علم بسيط للفحص التلقائي في الصفحات */
window.__pageReady = true;
