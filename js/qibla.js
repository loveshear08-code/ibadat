/* =====================================================
   IBADAT QIBLA COMPASS
   Bengali + English + Hindi
   Theme + Dark Mode + Saved Location + Sensors
===================================================== */

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const app = $("qiblaApp");
  const compass = document.querySelector(".compass");
  const dial = document.querySelector(".compass-dial");
  const marker = $("kaabaMarker");

  if (!app || !compass || !dial || !marker) return;

  const pageTitle = $("pageTitle");
  const footerText = $("footerText");
  const locationName = $("locationName");
  const locationLabel = $("locationLabel");
  const distanceLabel = $("distanceLabel");
  const distanceEl = $("distance");
  const degreeEl = $("degreeValue");
  const compassHint = $("compassHint");

  const needle = compass.querySelector(".qibla-needle");
  const KAABA_LAT = 21.422487;
  const KAABA_LON = 39.826206;

  const LANG = {
    bn: {
      title: "কিবলা কম্পাস",
      footer: "সঠিক দিক পেতে কম্পাস ব্যবহার করুন",
      location: "বর্তমান অবস্থান",
      distance: "মক্কার দূরত্ব",
      km: "কিমি",
      missing: "অবস্থান পাওয়া যায়নি",
      waiting: "কম্পাস সেন্সরের অপেক্ষায়",
      active: "কম্পাস সক্রিয়",
      unavailable: "কম্পাস সেন্সর পাওয়া যায়নি",
      denied: "কম্পাসের অনুমতি প্রয়োজন",
      hint: "কম্পাস সঠিকভাবে কাজ করতে ডিভাইসটি সমতল রাখুন",
      directions: [
        "উ", "উ-উপূ", "উপূ", "পূ-উপূ",
        "পূ", "পূ-দপূ", "দপূ", "দ-দপূ",
        "দ", "দ-দপ", "দপ", "প-দপ",
        "প", "প-উপ", "উপ", "উ-উপ"
      ]
    },

    en: {
      title: "Qibla Compass",
      footer: "Use the compass to find the correct direction",
      location: "Current Location",
      distance: "Distance to Makkah",
      km: "km",
      missing: "Location unavailable",
      waiting: "Waiting for compass sensor",
      active: "Compass active",
      unavailable: "Compass sensor unavailable",
      denied: "Compass permission required",
      hint: "Keep your device flat for better compass readings",
      directions: [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
      ]
    },

    hi: {
      title: "क़िबला कम्पास",
      footer: "सही दिशा पाने के लिए कम्पास का उपयोग करें",
      location: "वर्तमान स्थान",
      distance: "मक्का की दूरी",
      km: "किमी",
      missing: "स्थान उपलब्ध नहीं",
      waiting: "कम्पास सेंसर की प्रतीक्षा",
      active: "कम्पास सक्रिय",
      unavailable: "कम्पास सेंसर उपलब्ध नहीं",
      denied: "कम्पास की अनुमति आवश्यक है",
      hint: "सही दिशा के लिए डिवाइस को समतल रखें",
      directions: [
        "उ", "उ-उपू", "उपू", "पू-उपू",
        "पू", "पू-दपू", "दपू", "द-दपू",
        "द", "द-दप", "दप", "प-दप",
        "प", "प-उ", "उप", "उ-उप"
      ]
    }
  };

  let language = "bn";
  let T = LANG.bn;

  let userLat = null;
  let userLon = null;
  let qiblaBearing = 0;
  let heading = null;

  let sensorStarted = false;
  let permissionRequested = false;
  let absoluteSensorAvailable = false;
  let fallbackTimer = null;

  const rad = (value) => value * Math.PI / 180;
  const norm = (value) => ((value % 360) + 360) % 360;

  /* ---------- SETTINGS ---------- */

  function readSettings() {
    const read = (key) => {
      try {
        return JSON.parse(localStorage.getItem(key) || "{}");
      } catch {
        return {};
      }
    };

    return {
      ...read("appSettings"),
      ...read("ibadatSettings")
    };
  }

  function getLanguage() {
    const settings = readSettings();

    const selected =
      settings.language ??
      settings.lang ??
      settings.locale ??
      settings.selectedLanguage ??
      settings.appLanguage ??
      "bn";

    const normalized = String(selected).toLowerCase();

    if (normalized.startsWith("en")) return "en";
    if (normalized.startsWith("hi")) return "hi";
    return "bn";
  }

  function applyTheme() {
    const settings = readSettings();

    const selected =
      settings.themeColor ??
      settings.colorTheme ??
      settings.theme ??
      "classic";

    const allowed = ["classic", "royal", "rose", "pista"];

    const theme = allowed.includes(String(selected).toLowerCase())
      ? String(selected).toLowerCase()
      : "classic";

    document.body.dataset.colorTheme = theme;

    const darkValue =
      settings.darkMode ??
      settings.dark ??
      settings.isDarkMode ??
      settings.isDark;

    if (typeof darkValue === "boolean") {
      document.body.classList.toggle("dark-mode", darkValue);
    } else if (typeof darkValue === "string") {
      document.body.classList.toggle(
        "dark-mode",
        darkValue.toLowerCase() === "true"
      );
    }

    const colors = {
      classic: "#0F5132",
      royal: "#173A60",
      rose: "#7D414B",
      pista: "#2F7135"
    };

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = colors[theme];
  }

  /* ---------- LOCALIZED NUMBERS ---------- */

  function number(value, decimals = 0) {
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) return "—";

    const formatted = numeric.toFixed(decimals);

    const digits = {
      bn: "০১২৩৪৫৬৭৮৯",
      hi: "०१२३४५६७८९",
      en: "0123456789"
    };

    return formatted.replace(/[0-9]/g, (digit) =>
      digits[language][Number(digit)]
    );
  }

  function directionName(degrees) {
    return T.directions[
      Math.round(norm(degrees) / 22.5) % 16
    ];
  }

  /* ---------- COMPASS NEEDLE ---------- */

  function setNeedleAngle(angle) {
    if (!needle) return;
    needle.style.transform =
      `translateX(-50%) rotate(${angle}deg)`;
  }

  /* ---------- DISTANCE AND BEARING ---------- */

  function distanceKm(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const dLat = rad(lat2 - lat1);
    const dLon = rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const safeA = Math.min(1, Math.max(0, a));

    return 2 * earthRadius * Math.atan2(
      Math.sqrt(safeA),
      Math.sqrt(1 - safeA)
    );
  }

  function calculateBearing(lat, lon) {
    const lat1 = rad(lat);
    const lat2 = rad(KAABA_LAT);
    const dLon = rad(KAABA_LON - lon);

    const y = Math.sin(dLon) * Math.cos(lat2);

    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    return norm(Math.atan2(y, x) * 180 / Math.PI);
  }

  function updateLocationValues() {
    if (userLat === null || userLon === null) return;

    qiblaBearing = calculateBearing(userLat, userLon);

    const km = distanceKm(
      userLat,
      userLon,
      KAABA_LAT,
      KAABA_LON
    );

    if (distanceEl) {
      distanceEl.textContent = `${number(km)} ${T.km}`;
    }

    if (degreeEl) {
      degreeEl.textContent =
        `${number(qiblaBearing)}° ${directionName(qiblaBearing)}`;
    }

    updateCompass();
  }

  /* ---------- SAVED LOCATION ---------- */

  function loadSavedLocation() {
    let saved = null;

    try {
      saved = JSON.parse(
        localStorage.getItem("ibadatUserLocation") || "null"
      );
    } catch {
      saved = null;
    }

    const valid =
      saved &&
      saved.lat !== null &&
      saved.lon !== null &&
      Number.isFinite(Number(saved.lat)) &&
      Number.isFinite(Number(saved.lon)) &&
      Math.abs(Number(saved.lat)) <= 90 &&
      Math.abs(Number(saved.lon)) <= 180;

    if (!valid) {
      userLat = null;
      userLon = null;

      let city = null;

      try {
        city = localStorage.getItem("ibadatCityName");
      } catch {
        city = null;
      }

      if (locationName) {
        locationName.textContent = city || T.missing;
      }

      if (distanceEl) distanceEl.textContent = "—";
      if (degreeEl) degreeEl.textContent = "—";

      return;
    }

    userLat = Number(saved.lat);
    userLon = Number(saved.lon);

    let city = null;

    try {
      city = localStorage.getItem("ibadatCityName");
    } catch {
      city = null;
    }

    if (locationName) {
      locationName.textContent =
        city || `${number(userLat, 2)}, ${number(userLon, 2)}`;
    }

    updateLocationValues();
  }

  /* ---------- COMPASS AND KAABA POSITION ---------- */

  function updateCompass() {
    const currentHeading = heading === null ? 0 : heading;
    const relative = norm(qiblaBearing - currentHeading);

    /*
     * Rotate the direction dial with the device heading.
     * The text labels counter-rotate so they remain readable.
     */
    dial.style.transform = `rotate(${-currentHeading}deg)`;

    dial.querySelectorAll(".direction").forEach((element) => {
      element.style.transform =
        `translate(-50%, -50%) rotate(${currentHeading}deg)`;
    });

    setNeedleAngle(relative);

    /*
     * Keep the Kaaba marker outside the compass ring,
     * but constrain its center to the visible compass area.
     */
    const compassRect = compass.getBoundingClientRect();
    const markerWidth = marker.offsetWidth || 42;
    const markerHeight = marker.offsetHeight || 42;

    const markerRadius = Math.max(markerWidth, markerHeight) / 2;
    const outerRadius = Math.min(
      compassRect.width,
      compassRect.height
    ) / 2;

    const radius = Math.max(
      0,
      outerRadius - markerRadius - 3
    );

    const angle = rad(relative);
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;

    marker.style.transform =
      `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  }

  /* ---------- DEVICE ORIENTATION ---------- */

  function showStatus(message) {
    /*
     * Keep the existing page design uncluttered.
     * Status messages remain available in the console.
     */
    console.info("IBADAT Qibla:", message);
  }

  function applyHeading(raw) {
    if (!Number.isFinite(raw)) return;

    heading = norm(raw);
    updateCompass();
  }

  function onAbsoluteOrientation(event) {
    if (!Number.isFinite(event.alpha)) return;

    absoluteSensorAvailable = true;

    if (fallbackTimer !== null) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }

    applyHeading(360 - event.alpha);
    showStatus(T.active);
  }

  function onFallbackOrientation(event) {
    if (absoluteSensorAvailable) return;

    if (Number.isFinite(event.webkitCompassHeading)) {
      applyHeading(event.webkitCompassHeading);
      showStatus(T.active);
      return;
    }

    if (!Number.isFinite(event.alpha)) return;

    applyHeading(360 - event.alpha);
    showStatus(T.waiting);
  }

  function startSensors() {
    if (sensorStarted) return;

    if (!("DeviceOrientationEvent" in window)) {
      showStatus(T.unavailable);
      return;
    }

    sensorStarted = true;
    absoluteSensorAvailable = false;

    window.addEventListener(
      "deviceorientationabsolute",
      onAbsoluteOrientation,
      true
    );

    window.addEventListener(
      "deviceorientation",
      onFallbackOrientation,
      true
    );

    fallbackTimer = window.setTimeout(() => {
      fallbackTimer = null;

      if (!absoluteSensorAvailable && heading === null) {
        showStatus(T.unavailable);
      }
    }, 3000);
  }

  function setupSensors() {
    if (!("DeviceOrientationEvent" in window)) {
      showStatus(T.unavailable);
      return;
    }

    if (typeof DeviceOrientationEvent.requestPermission !== "function") {
      startSensors();
      return;
    }

    compass.addEventListener("click", async () => {
      if (permissionRequested) return;

      permissionRequested = true;

      try {
        const result =
          await DeviceOrientationEvent.requestPermission();

        if (result === "granted") {
          startSensors();
        } else {
          showStatus(T.denied);
          permissionRequested = false;
        }
      } catch (error) {
        console.warn("Qibla sensor permission error:", error);
        showStatus(T.denied);
        permissionRequested = false;
      }
    });
  }

  /* ---------- LANGUAGE ---------- */

  function applyLanguage() {
    language = getLanguage();
    T = LANG[language];

    document.documentElement.lang = language;

    if (pageTitle) pageTitle.textContent = T.title;
    if (footerText) footerText.textContent = T.footer;
    if (locationLabel) locationLabel.textContent = T.location;
    if (distanceLabel) distanceLabel.textContent = T.distance;
    if (compassHint) compassHint.textContent = T.hint;

    const directionElements = dial.querySelectorAll(".direction");

    directionElements.forEach((element, index) => {
      element.textContent = T.directions[index] || "";
    });

    if (userLat !== null && userLon !== null) {
      updateLocationValues();
    } else {
      loadSavedLocation();
    }
  }

  /* ---------- SETTINGS REFRESH ---------- */

  function refreshSettings() {
    applyTheme();
    applyLanguage();
    updateCompass();
  }

  /* ---------- INITIALIZATION ---------- */

  function init() {
    refreshSettings();
    loadSavedLocation();
    setupSensors();
    updateCompass();
  }

  window.addEventListener("resize", updateCompass);

  window.addEventListener("storage", (event) => {
    if (
      event.key === "appSettings" ||
      event.key === "ibadatSettings"
    ) {
      refreshSettings();
    }

    if (
      event.key === "ibadatUserLocation" ||
      event.key === "ibadatCityName"
    ) {
      loadSavedLocation();
    }
  });

  window.addEventListener("pageshow", refreshSettings);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refreshSettings();
      loadSavedLocation();
      updateCompass();
    }
  });

  /*
   * Detect same-tab settings changes as well.
   * This keeps theme and language synchronized with
   * the main app's settings screen.
   */
  let lastSettingsSignature = "";

  function settingsSignature() {
    const settings = readSettings();

    return JSON.stringify({
      language:
        settings.language ??
        settings.lang ??
        settings.locale ??
        settings.selectedLanguage ??
        settings.appLanguage ??
        "bn",

      theme:
        settings.themeColor ??
        settings.colorTheme ??
        settings.theme ??
        "classic",

      dark:
        settings.darkMode ??
        settings.dark ??
        settings.isDarkMode ??
        settings.isDark ??
        false
    });
  }

  function checkSettings() {
    const signature = settingsSignature();

    if (signature !== lastSettingsSignature) {
      lastSettingsSignature = signature;
      refreshSettings();
    }
  }

  /*
   * The settings object is small; a short polling interval
   * keeps same-tab changes working without affecting compass
   * orientation events.
   */
  window.setInterval(checkSettings, 700);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }
})();
