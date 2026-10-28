"use strict";

(() => {
  const $ = (id) => document.getElementById(id);

  const app = $("qiblaApp");
  const compass = $("compass");
  const dial = $("compassDial");
  const marker = $("kaabaMarker");

  if (!app || !compass || !dial || !marker) return;

  const pageTitle = $("pageTitle");
  const footerText = $("footerText");
  const locationNameEl = $("locationName");
  const locationLabel = $("locationLabel");
  const distanceLabel = $("distanceLabel");
  const distanceEl = $("distance");
  const degreeEl = $("degreeValue");
  const needle = $("qiblaNeedle");

  const KAABA_LAT = 21.422487;
  const KAABA_LON = 39.826206;

  const FALLBACK_LAT = 22.5726;
  const FALLBACK_LON = 88.3639;

  // ছবির প্রান্ত ও কম্পাসের বাইরের রিংয়ের মধ্যে ন্যূনতম ফাঁক।
  const MARKER_GAP = 8;

  const LANG = {
    bn: {
      title: "কিবলা কম্পাস",
      location: "বর্তমান অবস্থান:",
      distance: "মক্কার দূরত্ব:",
      km: "কিমি",
      locating: "অবস্থান খোঁজা হচ্ছে...",
      locationError: "অবস্থান পাওয়া যায়নি",
      footer: "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।",
      unavailable: "কম্পাস সেন্সর পাওয়া যায়নি",
      denied: "কম্পাসের অনুমতি প্রয়োজন"
    },
    en: {
      title: "Qibla Compass",
      location: "Current location:",
      distance: "Distance to Makkah:",
      km: "km",
      locating: "Finding your location...",
      locationError: "Location unavailable",
      footer: "Indeed, in the remembrance of Allah hearts find peace.",
      unavailable: "Compass sensor unavailable",
      denied: "Compass permission required"
    },
    hi: {
      title: "क़िबला कम्पास",
      location: "वर्तमान स्थान:",
      distance: "मक्का की दूरी:",
      km: "किमी",
      locating: "स्थान खोजा जा रहा है...",
      locationError: "स्थान उपलब्ध नहीं",
      footer: "अल्लाह के स्मरण से दिलों को सुकून मिलता है।",
      unavailable: "कम्पास सेंसर उपलब्ध नहीं",
      denied: "कम्पास की अनुमति आवश्यक है"
    }
  };

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
  let lastSettingsSignature = "";

  const rad = (value) => value * Math.PI / 180;
  const norm = (value) => ((value % 360) + 360) % 360;

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
      settings.lang ||
      settings.language ||
      settings.locale ||
      settings.selectedLanguage ||
      settings.appLanguage ||
      "bn";

    const normalized = String(selected).toLowerCase();

    if (normalized.startsWith("en")) return "en";
    if (normalized.startsWith("hi")) return "hi";
    return "bn";
  }

  function getTheme() {
    const settings = readSettings();

    const raw =
      settings.themeColor ||
      settings.colorTheme ||
      settings.theme ||
      "classic";

    const aliases = {
      green: "classic",
      classic: "classic",
      blue: "royal",
      royal: "royal",
      rose: "rose",
      champagne: "rose",
      pista: "pista",
      fresh: "pista"
    };

    return aliases[String(raw).toLowerCase()] || "classic";
  }

  function applyTheme() {
    const settings = readSettings();

    document.body.dataset.colorTheme = getTheme();

    const darkValue =
      settings.dark ??
      settings.darkMode ??
      settings.isDarkMode ??
      settings.isDark ??
      false;

    const dark = typeof darkValue === "string"
      ? darkValue.toLowerCase() === "true"
      : Boolean(darkValue);

    document.body.classList.toggle("dark-mode", dark);

    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      const colors = {
        classic: "#0F5132",
        royal: "#173A60",
        rose: "#7D414B",
        pista: "#2F7135"
      };

      meta.content = dark ? "#111C15" : colors[getTheme()];
    }
  }

  function number(value, decimals = 0) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return "—";

    return new Intl.NumberFormat(
      language === "bn" ? "bn-BD" :
      language === "hi" ? "hi-IN-u-nu-deva" : "en-IN",
      {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: false
      }
    ).format(numeric);
  }

  function directionName(degrees) {
    const list = DIRECTIONS[language] || DIRECTIONS.bn;
    return list[Math.round(norm(degrees) / 22.5) % 16];
  }

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

  /*
   * Home পেজের শহরের নাম সরাসরি ব্যবহার করা হবে।
   * নির্দিষ্ট শহরের জন্য আলাদা hardcoded mapping নেই।
   */
  function localizeCity(name) {
    return name ? String(name).trim() : "";
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

    distanceEl.textContent = `${number(km)} ${T.km}`;

    degreeEl.textContent =
      `${number(qiblaBearing)}° ${directionName(qiblaBearing)}`;

    updateCompass();
  }

  function readSavedLocation() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("ibadatUserLocation") || "null"
      );

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

      return {
        lat,
        lon,
        updatedAt: Number(saved.updatedAt) || 0
      };
    } catch {
      return null;
    }
  }

  function getSavedCity() {
    try {
      return localStorage.getItem("ibadatCityName") || "";
    } catch {
      return "";
    }
  }

  function showLocationName(name) {
    if (!locationNameEl) return;

    locationNameEl.textContent =
      localizeCity(name) ||
      (userLat !== null && userLon !== null
        ? `${number(userLat, 2)}, ${number(userLon, 2)}`
        : T.locating);
  }

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
      console.warn("IBADAT: unable to save location.", error);
    }
  }

  function setLocation(lat, lon, city) {
    userLat = Number(lat);
    userLon = Number(lon);

    saveLocation(userLat, userLon, city);
    showLocationName(city);
    updateLocationValues();
  }

  /*
   * শুধু Home-এর সংরক্ষিত অবস্থান না থাকলেই
   * reverse geocoding ব্যবহার করা হবে।
   */
  async function findCity(lat, lon) {
    try {
      const url = new URL("https://nominatim.openstreetmap.org/reverse");

      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("lat", lat);
      url.searchParams.set("lon", lon);
      url.searchParams.set("zoom", 10);
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set(
        "accept-language",
        language === "bn" ? "bn" : language
      );

      const response = await fetch(url.toString(), {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Reverse geocoding unavailable");
      }

      const data = await response.json();
      const address = data.address || {};

      const city =
        address.city ||
        address.town ||
        address.municipality ||
        address.city_district ||
        address.suburb ||
        address.neighbourhood ||
        address.village ||
        address.county ||
        address.state_district ||
        address.state ||
        address.country ||
        "";

      return city || "";
    } catch (error) {
      console.info("IBADAT Qibla: city lookup unavailable.", error);
      return "";
    }
  }

  function useFallbackLocation() {
    const fallbackCity = {
      bn: "কলকাতা",
      en: "Kolkata",
      hi: "कोलकाता"
    }[language];

    setLocation(FALLBACK_LAT, FALLBACK_LON, fallbackCity);
  }

  /*
   * Home-এর saved location থাকলে সেটিই authoritative।
   * Qibla পেজ সেটিকে নিজস্ব GPS ফলাফল দিয়ে overwrite করবে না।
   */
  function loadSavedLocation() {
    const saved = readSavedLocation();

    if (saved) {
      userLat = saved.lat;
      userLon = saved.lon;

      showLocationName(getSavedCity());
      updateLocationValues();
      return;
    }

    requestCurrentLocation();
  }

  /*
   * কেবল Home-এর shared location না থাকলে GPS fallback।
   * এতে Qibla পেজ স্বাভাবিক অবস্থায় Home-এর শহর বদলাবে না।
   */
  function requestCurrentLocation() {
    if (locationRequestStarted) return;
    locationRequestStarted = true;

    if (!navigator.geolocation) {
      useFallbackLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        userLat = lat;
        userLon = lon;
        updateLocationValues();

        const city = await findCity(lat, lon);

        saveLocation(
          lat,
          lon,
          city || getSavedCity()
        );

        showLocationName(city || getSavedCity());
        updateLocationValues();
      },
      (error) => {
        console.info("IBADAT Qibla: GPS unavailable.", error);

        const saved = readSavedLocation();

        if (saved) {
          userLat = saved.lat;
          userLon = saved.lon;
          showLocationName(getSavedCity());
          updateLocationValues();
        } else {
          useFallbackLocation();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 300000
      }
    );
  }

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

  function setNeedleAngle(angle) {
    needle.style.transform =
      `translateX(-50%) rotate(${angle}deg)`;
  }

  /*
   * কাবার ছবির অবস্থান:
   * 1. কম্পাসের বাইরের রিং থেকে MARKER_GAP ফাঁক।
   * 2. ছবির সম্পূর্ণ অংশ wrapper-এর ভেতরে।
   * 3. ফোন ঘোরালে marker সঠিক relative bearing অনুসরণ করবে।
   */
  function updateCompass() {
    const currentHeading = heading === null ? 0 : heading;
    const relative = norm(qiblaBearing - currentHeading);

    dial.style.transform = `rotate(${-currentHeading}deg)`;

    dial.querySelectorAll(".direction").forEach((element) => {
      element.style.transform =
        `translate(-50%, -50%) rotate(${currentHeading}deg)`;
    });

    setNeedleAngle(relative);

    const compassRect = compass.getBoundingClientRect();
    const wrapper = compass.closest(".compass-wrapper");

    if (
      !compassRect.width ||
      !compassRect.height ||
      !wrapper
    ) {
      return;
    }

    const wrapperRect = wrapper.getBoundingClientRect();
    const markerRect = marker.getBoundingClientRect();

    const markerWidth =
      markerRect.width || compassRect.width * 0.20;

    const markerHeight =
      markerRect.height || compassRect.height * 0.20;

    const markerHalfWidth = markerWidth / 2;
    const markerHalfHeight = markerHeight / 2;

    const compassRadius = Math.min(
      compassRect.width,
      compassRect.height
    ) / 2;

    /*
     * ছবির কেন্দ্র এতটা দূরে থাকবে যাতে ছবির প্রান্ত
     * রিংকে স্পর্শ না করে।
     */
    const desiredRadius =
      compassRadius +
      Math.max(markerHalfWidth, markerHalfHeight) +
      MARKER_GAP;

    const angle = rad(relative);
    const dirX = Math.sin(angle);
    const dirY = -Math.cos(angle);

    /*
     * কম্পাসের কেন্দ্র wrapper-এর কেন্দ্রের সঙ্গে
     * পুরোপুরি না মিললেও সঠিক অবস্থান গণনা করা হবে।
     */
    const centerX =
      compassRect.left +
      compassRect.width / 2 -
      wrapperRect.left;

    const centerY =
      compassRect.top +
      compassRect.height / 2 -
      wrapperRect.top;

    /*
     * ছবির অর্ধেক প্রস্থ/উচ্চতা এবং wrapper-এর সীমানা
     * ব্যবহার করে সর্বোচ্চ নিরাপদ দূরত্ব বের করা।
     */
    const limitX = dirX > 0
      ? (wrapperRect.width - markerHalfWidth - centerX) / dirX
      : dirX < 0
        ? (markerHalfWidth - centerX) / dirX
        : Infinity;

    const limitY = dirY > 0
      ? (wrapperRect.height - markerHalfHeight - centerY) / dirY
      : dirY < 0
        ? (markerHalfHeight - centerY) / dirY
        : Infinity;

    const availableRadius = Math.max(
      0,
      Math.min(limitX, limitY)
    );

    /*
     * জায়গা থাকলে পুরো gap বজায় থাকবে।
     * জায়গা কম হলে marker-কে viewport-এর ভেতরে
     * রাখাকে অগ্রাধিকার দেওয়া হবে।
     */
    const radius = Math.min(
      desiredRadius,
      availableRadius
    );

    const x = dirX * radius;
    const y = dirY * radius;

    marker.style.transform =
      `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  }

  function showStatus(message) {
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
  }

  function onFallbackOrientation(event) {
    if (absoluteSensorAvailable) return;

    if (Number.isFinite(event.webkitCompassHeading)) {
      applyHeading(event.webkitCompassHeading);
      return;
    }

    if (Number.isFinite(event.alpha)) {
      applyHeading(360 - event.alpha);
    }
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

  function applyLanguage() {
    language = getLanguage();
    T = LANG[language] || LANG.bn;

    document.documentElement.lang = language;

    if (pageTitle) pageTitle.textContent = T.title;
    if (locationLabel) locationLabel.textContent = T.location;
    if (distanceLabel) distanceLabel.textContent = T.distance;
    if (footerText) footerText.textContent = T.footer;

    const directionElements = dial.querySelectorAll(".direction");
    const labels = DIRECTIONS[language] || DIRECTIONS.bn;

    directionElements.forEach((element, index) => {
      element.textContent = labels[index] || "";
    });

    arrangeDirectionLabels();

    if (userLat !== null && userLon !== null) {
  updateLocationValues();

  const lat = userLat;
  const lon = userLon;
  const requestedLanguage = language;

  showLocationName(getSavedCity());

  findCity(lat, lon).then((city) => {
    if (
      requestedLanguage !== language ||
      lat !== userLat ||
      lon !== userLon
    ) {
      return;
    }

    if (city) {
      showLocationName(city);
    } else {
      showLocationName(getSavedCity());
    }
  });
}

  function settingsSignature() {
    const settings = readSettings();

    return JSON.stringify({
      language:
        settings.lang ||
        settings.language ||
        settings.locale ||
        settings.selectedLanguage ||
        settings.appLanguage ||
        "bn",

      theme:
        settings.themeColor ||
        settings.colorTheme ||
        settings.theme ||
        "classic",

      dark:
        settings.dark ??
        settings.darkMode ??
        settings.isDarkMode ??
        settings.isDark ??
        false
    });
  }

  function refreshSettings() {
    applyTheme();
    applyLanguage();
    lastSettingsSignature = settingsSignature();
  }

  function checkSettings() {
    if (settingsSignature() !== lastSettingsSignature) {
      refreshSettings();
    }
  }

  function syncSharedLocation() {
    const saved = readSavedLocation();

    if (!saved) return;

    const current = userLat !== null && userLon !== null;

    const changed =
      !current ||
      saved.lat !== userLat ||
      saved.lon !== userLon;

    if (changed) {
      userLat = saved.lat;
      userLon = saved.lon;

      showLocationName(getSavedCity());
      updateLocationValues();
   } else {
  // একই GPS অবস্থানে পুরোনো শহরের নাম আবার বসাবে না।
} 
  }

  function init() {
    refreshSettings();
    arrangeDirectionLabels();
    loadSavedLocation();
    setupSensors();
    updateCompass();

    /*
     * একই origin-এ Home থেকে অবস্থান আপডেট হলে
     * Qibla পেজও তা গ্রহণ করবে।
     */
    window.setInterval(() => {
      checkSettings();
      syncSharedLocation();
    }, 1000);
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
      syncSharedLocation();
    }
  });

  window.addEventListener("globalThemeChanged", refreshSettings);

  window.addEventListener("pageshow", () => {
    refreshSettings();
    syncSharedLocation();
    arrangeDirectionLabels();
    updateCompass();
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refreshSettings();
      syncSharedLocation();
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
