/* =====================================================
   IBADAT QIBLA COMPASS
   Bengali + English + Hindi
   Theme + Dark Mode + GPS + Sensors + Scrolling Quotes
===================================================== */

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const app = $("qiblaApp");
  const compass = $("compass");
  const dial = $("compassDial");
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
  const needle = $("qiblaNeedle");

  const KAABA_LAT = 21.422487;
  const KAABA_LON = 39.826206;

  const FALLBACK_LAT = 22.5726;
  const FALLBACK_LON = 88.3639;

  const DIRECTIONS = {
    bn: [
      "উ", "উ-উপূ", "উপূ", "পূ-উপূ",
      "পূ", "পূ-দপূ", "দপূ", "দ-দপূ",
      "দ", "দ-দপ", "দপ", "প-দপ",
      "প", "প-উপ", "উপ", "উ-উপ"
    ],
    en: [
      "N", "NNE", "NE", "ENE",
      "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW",
      "W", "WNW", "NW", "NNW"
    ],
    hi: [
      "उ", "उ-उपू", "उपू", "पू-उपू",
      "पू", "पू-दपू", "दपू", "द-दपू",
      "द", "द-दप", "दप", "प-दप",
      "प", "प-उ", "उप", "उ-उप"
    ]
  };

  const LANG = {
    bn: {
      title: "কিবলা কম্পাস",
      location: "বর্তমান অবস্থান",
      distance: "মক্কার দূরত্ব",
      km: "কিমি",
      missing: "অবস্থান পাওয়া যায়নি",
      locating: "অবস্থান খোঁজা হচ্ছে...",
      waiting: "কম্পাস সেন্সরের অপেক্ষায়",
      active: "কম্পাস সক্রিয়",
      unavailable: "কম্পাস সেন্সর পাওয়া যায়নি",
      denied: "কম্পাসের অনুমতি প্রয়োজন",
      hint: "কম্পাস সঠিকভাবে কাজ করতে ডিভাইসটি সমতল রাখুন",
      locationError: "অবস্থান পাওয়া যায়নি",
      quotes: [
        "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।",
        "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সঙ্গে আছেন।",
        "নামাজ মুমিনের জীবনের প্রশান্তি।",
        "আল্লাহর ওপর ভরসা রাখুন।",
        "সৎকাজের প্রতিদান কখনো নষ্ট হয় না।",
        "আল্লাহর রহমত থেকে নিরাশ হয়ো না।",
        "দোয়া মুমিনের শক্তি।",
        "কৃতজ্ঞতা নিয়ামত বৃদ্ধি করে।",
        "আল্লাহ সর্বোত্তম পরিকল্পনাকারী।",
        "প্রতিটি ভালো কাজের শুরু হোক বিসমিল্লাহ দিয়ে।"
      ]
    },

    en: {
      title: "Qibla Compass",
      location: "Current Location",
      distance: "Distance to Makkah",
      km: "km",
      missing: "Location unavailable",
      locating: "Finding your location...",
      waiting: "Waiting for compass sensor",
      active: "Compass active",
      unavailable: "Compass sensor unavailable",
      denied: "Compass permission required",
      hint: "Keep your device flat for better compass readings",
      locationError: "Location unavailable",
      quotes: [
        "Surely, in the remembrance of Allah hearts find peace.",
        "Indeed, Allah is with those who are patient.",
        "Prayer brings peace to a believer's life.",
        "Place your trust in Allah.",
        "The reward of good deeds is never lost.",
        "Do not despair of the mercy of Allah.",
        "Supplication is a believer's strength.",
        "Gratitude increases blessings.",
        "Allah is the best of planners.",
        "Begin every good deed with Bismillah."
      ]
    },

    hi: {
      title: "क़िबला कम्पास",
      location: "वर्तमान स्थान",
      distance: "मक्का की दूरी",
      km: "किमी",
      missing: "स्थान उपलब्ध नहीं",
      locating: "स्थान खोजा जा रहा है...",
      waiting: "कम्पास सेंसर की प्रतीक्षा",
      active: "कम्पास सक्रिय",
      unavailable: "कम्पास सेंसर उपलब्ध नहीं",
      denied: "कम्पास की अनुमति आवश्यक है",
      hint: "सही दिशा के लिए डिवाइस को समतल रखें",
      locationError: "स्थान उपलब्ध नहीं",
      quotes: [
        "अल्लाह के ज़िक्र से दिलों को सुकून मिलता है।",
        "निश्चय ही अल्लाह सब्र करने वालों के साथ है।",
        "नमाज़ मोमिन की ज़िंदगी का सुकून है।",
        "अल्लाह पर भरोसा रखें।",
        "नेक कामों का सवाब कभी व्यर्थ नहीं जाता।",
        "अल्लाह की रहमत से निराश न हों।",
        "दुआ मोमिन की ताकत है।",
        "शुक्र करने से नेमतें बढ़ती हैं।",
        "अल्लाह सबसे बेहतर योजना बनाने वाला है।",
        "हर अच्छे काम की शुरुआत बिस्मिल्लाह से करें।"
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
  let locationRequestStarted = false;
  let quoteIndex = 0;
  let lastSettingsSignature = "";

  const rad = (value) => value * Math.PI / 180;
  const norm = (value) => ((value % 360) + 360) % 360;

  /* ---------- SETTINGS ---------- */

  function safeRead(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch {
      return {};
    }
  }

  function readSettings() {
    return {
      ...safeRead("appSettings"),
      ...safeRead("ibadatSettings")
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
    const selectedTheme = String(selected).toLowerCase();

    const theme = allowed.includes(selectedTheme)
      ? selectedTheme
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

    if (meta) {
      meta.content = document.body.classList.contains("dark-mode")
        ? "#111C15"
        : colors[theme];
    }
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
    const list = DIRECTIONS[language] || DIRECTIONS.bn;
    return list[Math.round(norm(degrees) / 22.5) % 16];
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

  /* ---------- SAVE LOCATION ---------- */

  function saveLocation(lat, lon, city) {
    try {
      localStorage.setItem(
        "ibadatUserLocation",
        JSON.stringify({
          lat,
          lon,
          updatedAt: Date.now()
        })
      );

      if (city) {
        localStorage.setItem("ibadatCityName", city);
      }
    } catch (error) {
      console.warn("IBADAT: Could not save location.", error);
    }
  }

  function readSavedLocation() {
    let saved = null;

    try {
      saved = JSON.parse(
        localStorage.getItem("ibadatUserLocation") || "null"
      );
    } catch {
      saved = null;
    }

    if (!saved) return null;

    const lat = Number(saved.lat);
    const lon = Number(saved.lon);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      Math.abs(lat) > 90 ||
      Math.abs(lon) > 180
    ) {
      return null;
    }

    return { lat, lon };
  }

  function getSavedCity() {
    try {
      return localStorage.getItem("ibadatCityName") || "";
    } catch {
      return "";
    }
  }

  function setLocation(lat, lon, city) {
    userLat = Number(lat);
    userLon = Number(lon);

    if (locationName) {
      locationName.textContent =
        city || `${number(userLat, 2)}, ${number(userLon, 2)}`;
    }

    saveLocation(userLat, userLon, city);
    updateLocationValues();
  }

  /* ---------- REVERSE GEOCODING ---------- */

  async function findCity(lat, lon) {
    const cached = getSavedCity();

    /*
     * Use reverse geocoding to find a city name.
     * If the request fails, coordinates are still usable.
     */
    try {
      const url =
        "https://nominatim.openstreetmap.org/reverse" +
        `?format=jsonv2&lat=${encodeURIComponent(lat)}` +
        `&lon=${encodeURIComponent(lon)}` +
        "&zoom=10&addressdetails=1";

      const response = await fetch(url, {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Geocoding unavailable");

      const data = await response.json();
      const address = data.address || {};

      const city =
        address.city ||
        address.town ||
        address.city_district ||
        address.municipality ||
        address.county ||
        address.village ||
        address.suburb ||
        "";

      const region = address.state || "";

      const name = city && region && city !== region
        ? `${city}, ${region}`
        : city || region || data.name || "";

      if (name) {
        saveLocation(lat, lon, name);
        return name;
      }
    } catch (error) {
      console.info("IBADAT Qibla: City lookup unavailable.", error);
    }

    return cached || "";
  }

  /* ---------- GPS ---------- */

  function requestCurrentLocation() {
    if (locationRequestStarted) return;

    locationRequestStarted = true;

    if (!navigator.geolocation) {
      useFallbackLocation();
      return;
    }

    if (locationName) {
      locationName.textContent = T.locating;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        userLat = lat;
        userLon = lon;
        updateLocationValues();

        const city = await findCity(lat, lon);

        if (locationName) {
          locationName.textContent =
            city || `${number(lat, 2)}, ${number(lon, 2)}`;
        }

        saveLocation(lat, lon, city);
      },
      (error) => {
        console.info("IBADAT Qibla: GPS unavailable.", error);
        useSavedOrFallbackLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 300000
      }
    );
  }

  function useFallbackLocation() {
    const city = language === "hi"
      ? "कोलकाता"
      : language === "en"
        ? "Kolkata"
        : "কলকাতা";

    setLocation(FALLBACK_LAT, FALLBACK_LON, city);
  }

  function useSavedOrFallbackLocation() {
    const saved = readSavedLocation();

    if (saved) {
      const city = getSavedCity();

      userLat = saved.lat;
      userLon = saved.lon;

      if (locationName) {
        locationName.textContent =
          city || `${number(userLat, 2)}, ${number(userLon, 2)}`;
      }

      updateLocationValues();
      return;
    }

    if (locationName) {
      locationName.textContent = T.locationError;
    }

    useFallbackLocation();
  }

  function loadSavedLocation() {
    const saved = readSavedLocation();

    if (!saved) {
      if (locationName) {
        locationName.textContent = T.locating;
      }

      if (distanceEl) distanceEl.textContent = "—";
      if (degreeEl) degreeEl.textContent = "—";

      requestCurrentLocation();
      return;
    }

    userLat = saved.lat;
    userLon = saved.lon;

    const city = getSavedCity();

    if (locationName) {
      locationName.textContent =
        city || `${number(userLat, 2)}, ${number(userLon, 2)}`;
    }

    updateLocationValues();

    /*
     * Refresh the saved location from GPS where possible.
     * This helps the Qibla page stay current if the user moves.
     */
    requestCurrentLocation();
  }

  /* ---------- COMPASS DIRECTION LABELS ---------- */

  function arrangeDirectionLabels() {
    const elements = Array.from(dial.querySelectorAll(".direction"));
    const radiusPercent = 42;

    elements.forEach((element, index) => {
      const angle = rad(index * 22.5);
      const x = 50 + Math.sin(angle) * radiusPercent;
      const y = 50 - Math.cos(angle) * radiusPercent;

      element.style.left = `${x}%`;
      element.style.top = `${y}%`;
    });
  }

  /* ---------- COMPASS + KAABA MARKER ---------- */

  function setNeedleAngle(angle) {
    if (!needle) return;

    needle.style.transform =
      `translateX(-50%) rotate(${angle}deg)`;
  }

  function updateCompass() {
    const currentHeading = heading === null ? 0 : heading;
    const relative = norm(qiblaBearing - currentHeading);

    /*
     * Rotate the dial against device heading.
     * Counter-rotate text so each direction stays readable.
     */
    dial.style.transform = `rotate(${-currentHeading}deg)`;

    dial.querySelectorAll(".direction").forEach((element) => {
      element.style.transform =
        `translate(-50%, -50%) rotate(${currentHeading}deg)`;
    });

    setNeedleAngle(relative);

    /*
     * Position the Kaaba in the Qibla direction near the
     * outer ring. Keep the full marker inside the compass.
     */
    const compassRect = compass.getBoundingClientRect();

    if (!compassRect.width || !compassRect.height) return;

    const markerRect = marker.getBoundingClientRect();

    const markerWidth = markerRect.width || compassRect.width * 0.17;
    const markerHeight = markerRect.height || compassRect.height * 0.17;
    const markerRadius = Math.max(markerWidth, markerHeight) / 2;

    const compassRadius = Math.min(
      compassRect.width,
      compassRect.height
    ) / 2;

    const safeRadius = Math.max(
      0,
      compassRadius - markerRadius - 4
    );

    const angle = rad(relative);
    const x = Math.sin(angle) * safeRadius;
    const y = -Math.cos(angle) * safeRadius;

    marker.style.transform =
      `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  }

  /* ---------- DEVICE ORIENTATION ---------- */

  function showStatus(message) {
    /*
     * Keep the visual layout uncluttered, as in the
     * original page. Status remains available in console.
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

  /* ---------- SCROLLING FOOTER QUOTES ---------- */

  function showNextQuote() {
    if (!footerText) return;

    const quotes = T.quotes;
    if (!quotes || !quotes.length) return;

    footerText.style.animation = "none";
    footerText.textContent = quotes[quoteIndex % quotes.length];
    quoteIndex += 1;

    /*
     * Restart the CSS animation after changing the quote.
     */
    void footerText.offsetWidth;
    footerText.style.animation = "";

    const reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    footerText.style.animationDuration = reducedMotion
      ? "30s"
      : "18s";
  }

  /* ---------- LANGUAGE ---------- */

  function applyLanguage() {
    language = getLanguage();
    T = LANG[language] || LANG.bn;

    document.documentElement.lang = language;

    if (pageTitle) pageTitle.textContent = T.title;
    if (locationLabel) locationLabel.textContent = T.location;
    if (distanceLabel) distanceLabel.textContent = T.distance;
    if (compassHint) compassHint.textContent = T.hint;

    const directionElements = dial.querySelectorAll(".direction");
    const labels = DIRECTIONS[language] || DIRECTIONS.bn;

    directionElements.forEach((element, index) => {
      element.textContent = labels[index] || "";
    });

    arrangeDirectionLabels();

    quoteIndex = 0;
    showNextQuote();

    if (userLat !== null && userLon !== null) {
      updateLocationValues();
    } else {
      loadSavedLocation();
    }
  }

  /* ---------- SETTINGS REFRESH ---------- */

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

  function refreshSettings() {
    applyTheme();
    applyLanguage();
    updateCompass();
    lastSettingsSignature = settingsSignature();
  }

  function checkSettings() {
    const signature = settingsSignature();

    if (signature !== lastSettingsSignature) {
      refreshSettings();
    }
  }

  /* ---------- INITIALIZATION ---------- */

  function init() {
    refreshSettings();
    loadSavedLocation();
    setupSensors();
    arrangeDirectionLabels();
    updateCompass();

    window.setInterval(showNextQuote, 7000);
    window.setInterval(checkSettings, 700);
  }

  window.addEventListener("resize", () => {
    arrangeDirectionLabels();
    updateCompass();
  });

  window.addEventListener("orientationchange", () => {
    window.setTimeout(() => {
      arrangeDirectionLabels();
      updateCompass();
    }, 150);
  });

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
      const saved = readSavedLocation();

      if (saved) {
        userLat = saved.lat;
        userLon = saved.lon;

        if (locationName) {
          locationName.textContent =
            getSavedCity() ||
            `${number(userLat, 2)}, ${number(userLon, 2)}`;
        }

        updateLocationValues();
      }
    }
  });

  window.addEventListener("globalThemeChanged", refreshSettings);

  window.addEventListener("pageshow", () => {
    refreshSettings();
    arrangeDirectionLabels();
    updateCompass();
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refreshSettings();
      arrangeDirectionLabels();
      updateCompass();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
