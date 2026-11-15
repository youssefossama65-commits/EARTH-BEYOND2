/* ==========================================================================
   BEYOND EARTH — الصفحة ٣ (devices.html)
   المقدمة + الأجهزة مقسّمة على مجموعتين (Zamoon / Mars)
   ========================================================================== */

function deviceThumbMarkup(device) {
  if (device.thumbUrl) {
    return '<img src="' + device.thumbUrl + '" alt="" />';
  }
  return (
    '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" aria-hidden="true">' +
    '<circle cx="18" cy="18" r="11" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" />' +
    '<path d="M18 11v14M11 18h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />' +
    "</svg>"
  );
}

/* ---------------- كارت جهاز واحد ---------------- */
function buildDeviceCard(device, group) {
  var card = document.createElement("article");
  card.className = "device-card";
  card.setAttribute("role", "listitem");
  card.dataset.deviceId = device.id;

  card.innerHTML =
    '<a class="device-card-link" href="device.html?device=' + encodeURIComponent(device.id) + '">' +
      '<span class="card-code">' + group.code + " · " + device.code + "</span>" +
      '<span class="card-thumb">' + deviceThumbMarkup(device) + "</span>" +
      '<span class="card-name"></span>' +
      '<span class="card-tagline"></span>' +
      '<span class="card-open">Open device <span aria-hidden="true">→</span></span>' +
    "</a>";

  setSlotText(card.querySelector(".card-name"), device.name, "Device name slot " + device.code);
  setSlotText(card.querySelector(".card-tagline"), device.tagline, "short line about this device");

  return card;
}

/* ---------------- مجموعة واحدة ---------------- */
function buildGroupBlock(group) {
  var block = document.createElement("section");
  block.className = "group-block";
  block.id = "group-" + group.id;
  block.setAttribute("aria-labelledby", "group-title-" + group.id);

  block.innerHTML =
    '<div class="group-head">' +
      '<span class="group-badge" aria-hidden="true">' + group.code + "</span>" +
      "<div class=\"group-head-text\">" +
        '<h3 class="group-title" id="group-title-' + group.id + '">' + group.title + "</h3>" +
        '<p class="group-subtitle"></p>' +
      "</div>" +
      '<span class="group-count">' + group.devices.length + " devices</span>" +
    "</div>" +
    '<div class="device-grid" role="list" aria-label="' + group.title + ' devices"></div>';

  setSlotText(block.querySelector(".group-subtitle"), group.subtitle,
    "subtitle slot — a short line about " + group.title);

  var grid = block.querySelector(".device-grid");
  group.devices.forEach(function (device) {
    grid.appendChild(buildDeviceCard(device, group));
  });

  return block;
}

/* ---------------- رسم كل المجموعات ---------------- */
function renderDeviceGroups() {
  var wrap = $("deviceGroups");
  if (!wrap || !window.SpaceData) return;

  wrap.innerHTML = "";
  window.SpaceData.groups.forEach(function (group) {
    wrap.appendChild(buildGroupBlock(group));
  });

  var hint = $("deviceCountHint");
  if (hint) {
    var s = window.SpaceData.settings;
    hint.textContent =
      s.totalDevices + " stories · " + window.SpaceData.groups.length + " destinations";
  }

  // عدّاد الأجهزة جنب كل عنوان في القائمة الجانبية
  document.querySelectorAll("[data-group-count]").forEach(function (el) {
    var group = window.SpaceData.getGroup(el.dataset.groupCount);
    if (group) el.textContent = group.devices.length;
  });
}

/* ---------------- تشغيل ---------------- */
function initDevicesPage() {
  renderDeviceGroups();
  initSharedUI();
}

initDevicesPage();

/* علم بسيط للفحص التلقائي في الصفحات */
window.__pageReady = true;
