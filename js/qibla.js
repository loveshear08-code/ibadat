/* =====================================================
   IBADAT — QIBLA COMPASS
   Shared Home Location + Qibla Bearing
   Device Orientation + 4 Themes + Dark Mode
   Languages: Bengali / English / Hindi

   Shared Settings: appSettings
   Shared Location: ibadatUserLocation

   IMPORTANT:
   This page reads the location saved by Home.
   It does not request a separate GPS location.
   ===================================================== */

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const el = {
    pageTitle: $("pageTitle"),
    locationLabel: $("locationLabel"),
    locationName: $("locationName"),

    compassDial: $("compassDial"),
    compassTicks: $("compassTicks"),
    directionRing: $("directionRing"),
    qiblaMarker: $("qiblaMarker"),
    qiblaNeedle: $("qiblaNeedle"),

    bearingValue: $("bearingValue"),
    bearingDirection: $("bearingDirection"),

    distanceLabel: $("distanceLabel"),
    distanceValue: $("distanceValue"),
    distanceUnit: $("distanceUnit"),

    sensorButton: $("sensorButton"),
    sensorButtonText: $("sensorButtonText"),
    compassStatus: $("compassStatus"),

    footerMessage: $("footerMessage"),
    footerMessageClone: $("footerMessageClone"),
    footerTrack: $("footerMessageTrack")
  };

  if (!el.compassDial || !el.qiblaNeedle) return;

  /* =====================================================
     1. CONSTANTS
     ===================================================== */

  const KAABA = {
    latitude: 21.422487,
    longitude: 39.826206
  };

  const SETTINGS_KEY = "appSettings";
  const LOCATION_KEY = "ibadatUserLocation";

  const DIRECTIONS = {
    bn: [
      "উ", "উ-উ-পূ", "উ-পূ", "পূ-উ-পূ",
      "পূ", "দ-পূ-পূ", "দ-পূ", "দ-দ-পূ",
      "দ", "দ-দ-প", "দ-প", "প-দ-প",
      "প", "উ-প", "উ-পূ-প", "উ-উ-প"
    ],

    en: [
      "N", "NNE", "NE", "ENE",
      "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW",
      "W", "WNW", "NW", "NNW"
    ],

    hi: [
      "उ", "उ-उ-पू", "उ-पू", "पू-उ-पू",
      "पू", "द-पू-पू", "द-पू", "द-द-पू",
      "द", "द-द-प", "द-प", "प-द-प",
      "प", "उ-प", "उ-पू-प", "उ-उ-प"
    ]
  };

  const translations = {
    bn: {
      title: "কিবলা কম্পাস",
      locationLabel: "বর্তমান অবস্থান:",
      locating: "Home-এর লোকেশন নেওয়া হচ্ছে...",
      locationUnavailable: "Home পেজের লোকেশন পাওয়া যায়নি",
      locationError: "লোকেশনের তথ্য পড়া যায়নি",

      distanceLabel: "কাবা শরীফ থেকে দূরত্ব:",
      distanceUnit: "কিমি",

      start: "চালু",
      stop: "বন্ধ",
      starting: "চালু হচ্ছে...",
      stopped: "কম্পাস বন্ধ আছে",
      active: "কম্পাস চালু আছে",
      waiting: "কম্পাসের দিক নির্ণয় করা হচ্ছে...",
      secure: "কম্পাস চালাতে HTTPS সংযোগ প্রয়োজন।",
      unsupported: "এই ডিভাইসে কম্পাস সেন্সর পাওয়া যায়নি।",
      denied: "কম্পাস ব্যবহারের অনুমতি পাওয়া যায়নি।",
      noHeading: "নির্ভরযোগ্য কম্পাস দিক পাওয়া যায়নি। সেন্সর ও Calibration পরীক্ষা করুন।"
    },

    en: {
      title: "Qibla Compass",
      locationLabel: "Current Location:",
      locating: "Reading Home location...",
      locationUnavailable: "Home location is not available",
      locationError: "Unable to read location information",

      distanceLabel: "Distance from the Holy Kaaba:",
      distanceUnit: "km",

      start: "Start",
      stop: "Stop",
      starting: "Starting...",
      stopped: "Compass is off",
      active: "Compass is active",
      waiting: "Detecting compass direction...",
      secure: "A secure HTTPS connection is required.",
      unsupported: "Compass sensor is not available on this device.",
      denied: "Compass permission was denied.",
      noHeading: "No reliable compass heading received. Check sensor support and calibration."
    },

    hi: {
      title: "क़िबला कम्पास",
      locationLabel: "वर्तमान स्थान:",
      locating: "Home का स्थान पढ़ा जा रहा है...",
      locationUnavailable: "Home का स्थान उपलब्ध नहीं है",
      locationError: "स्थान की जानकारी पढ़ी नहीं जा सकी",

      distanceLabel: "पवित्र काबा से दूरी:",
      distanceUnit: "किमी",

      start: "चालू",
      stop: "बंद",
      starting: "चालू हो रहा है...",
      stopped: "कम्पास बंद है",
      active: "कम्पास चालू है",
      waiting: "कम्पास की दिशा पता की जा रही है...",
      secure: "कम्पास के लिए सुरक्षित HTTPS कनेक्शन आवश्यक है।",
      unsupported: "इस डिवाइस में कम्पास सेंसर उपलब्ध नहीं है।",
      denied: "कम्पास की अनुमति नहीं मिली।",
      noHeading: "विश्वसनीय कम्पास दिशा नहीं मिली। सेंसर और कैलिब्रेशन जाँचें।"
    }
  };

  let language = "bn";
  let theme = "classic";
  let darkMode = false;

  let userLocation = null;
  let qiblaBearing = null;

  let deviceHeading = null;
  let targetHeading = null;
  let smoothHeading = null;

  let sensorActive = false;
  let firstHeadingReceived = false;

  let animationFrame = null;
  let headingTimeout = null;
  let geocodeRequestId = 0;

  let orientationEventName = null;

  /* =====================================================
     2. HELPERS
     ===================================================== */

  function normalizeAngle(value) {
    return ((value % 360) + 360) % 360;
  }

  function formatNumber(value, decimals = 0) {
    const locale =
      language === "en"
        ? "en-IN"
        : language === "hi"
          ? "hi-IN-u-nu-deva"
          : "bn-BD";

    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  function currentText() {
    return translations[language];
  }

  function setText(element, value) {
    if (element) {
      element.textContent = value;
    }
  }

  function isValidCoordinates(latitude, longitude) {
    return (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    );
  }

  /* =====================================================
     3. READ IBADAT SETTINGS
     ===================================================== */

  function readSettings() {
    let settings = {};

    try {
      settings = JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
      );
    } catch (error) {
      console.warn("IBADAT settings read error:", error);
    }

    const savedLanguage =
      settings.lang ||
      settings.language ||
      settings.appLanguage ||
      "bn";

    language = ["bn", "en", "hi"].includes(
      String(savedLanguage).toLowerCase()
    )
      ? String(savedLanguage).toLowerCase()
      : "bn";

    const savedTheme =
      settings.themeColor ||
      settings.theme ||
      "classic";

    const themeAliases = {
      green: "classic",
      classic: "classic",
      blue: "royal",
      royal: "royal",
      champagne: "rose",
      rose: "rose",
      fresh: "pista",
      pista: "pista"
    };

    theme =
      themeAliases[String(savedTheme).toLowerCase()] ||
      "classic";

    const savedDark =
      settings.dark ??
      settings.darkMode ??
      settings.isDarkMode ??
      false;

    darkMode =
      savedDark === true ||
      savedDark === 1 ||
      savedDark === "true";

    document.documentElement.lang = language;

    document.body.dataset.colorTheme = theme;
    document.body.classList.toggle("dark-mode", darkMode);

    applyTranslations();
    createDirectionLabels();
    updateBearingDisplay();
    updateSensorButton();
  }

  /* =====================================================
     4. APPLY TRANSLATIONS
     ===================================================== */

  function applyTranslations() {
    const t = currentText();

    setText(el.pageTitle, t.title);
    setText(el.locationLabel, t.locationLabel);
    setText(el.distanceLabel, t.distanceLabel);
    setText(el.distanceUnit, t.distanceUnit);

    setText(
      el.footerMessage,
      getFooterMessage()
    );

    setText(
      el.footerMessageClone,
      getFooterMessage()
    );

    updateSensorButton();
    updateLocationText();
    updateDistance();
    updateBearingDisplay();
    restartFooterAnimation();
  }

  function getFooterMessage() {
    const messages = {
      bn: "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।",
      en: "Surely, in the remembrance of Allah hearts find peace.",
      hi: "अल्लाह के स्मरण से ही दिलों को सुकून मिलता है।"
    };

    return messages[language] || messages.bn;
  }

  /* =====================================================
     5. FOOTER SCROLL
     ===================================================== */

  function restartFooterAnimation() {
    if (!el.footerTrack) return;

    el.footerTrack.style.animation = "none";

    void el.footerTrack.offsetWidth;

    el.footerTrack.style.animation = "";
  }

  /* =====================================================
     6. COMPASS TICKS
     ===================================================== */

  function createCompassTicks() {
    if (!el.compassTicks) return;

    const fragment = document.createDocumentFragment();

    for (let degree = 0; degree < 360; degree += 5) {
      const tick = document.createElement("span");

      tick.className = "compass-tick";
      tick.style.setProperty("--angle", `${degree}deg`);

      if (degree % 45 === 0) {
        tick.classList.add("cardinal");
      } else if (degree % 15 === 0) {
        tick.classList.add("major");
      }

      fragment.appendChild(tick);
    }

    el.compassTicks.replaceChildren(fragment);
  }

  /* =====================================================
     7. DIRECTION LABELS — 16 DIRECTIONS
     ===================================================== */

  function createDirectionLabels() {
    if (!el.directionRing) return;

    const names = DIRECTIONS[language];
    const fragment = document.createDocumentFragment();

    names.forEach((name, index) => {
      const label = document.createElement("span");

      label.className = "direction-label";

      if (index % 4 === 0) {
        label.classList.add("cardinal");
      }

      label.textContent = name;

      label.style.setProperty(
        "--angle",
        `${index * 22.5}deg`
      );

      fragment.appendChild(label);
    });

    el.directionRing.replaceChildren(fragment);

    updateDirectionLabelRotation();
  }

  /*
    The direction labels move with the rotating dial.
    Their text is counter-rotated so the letters remain upright.
  */

  function updateDirectionLabelRotation() {
    if (!el.directionRing) return;

    const heading = deviceHeading ?? 0;

    el.directionRing.style.setProperty(
      "--heading-counter",
      `${heading}deg`
    );
  }

  /* =====================================================
     8. DIRECTION NAME FOR BEARING
     ===================================================== */

  function getDirectionName(bearing) {
    if (!Number.isFinite(bearing)) return "---";

    const index =
      Math.round(normalizeAngle(bearing) / 22.5) % 16;

    return DIRECTIONS[language][index];
  }

  /* =====================================================
     9. QIBLA BEARING CALCULATION
     ===================================================== */

  function calculateBearing(latitude, longitude) {
    const lat1 = latitude * Math.PI / 180;
    const lat2 = KAABA.latitude * Math.PI / 180;

    const deltaLongitude =
      (KAABA.longitude - longitude) * Math.PI / 180;

    const y =
      Math.sin(deltaLongitude) * Math.cos(lat2);

    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) *
      Math.cos(lat2) *
      Math.cos(deltaLongitude);

    return normalizeAngle(
      Math.atan2(y, x) * 180 / Math.PI
    );
  }

  /* =====================================================
     10. DISTANCE CALCULATION
     ===================================================== */

  function calculateDistance(latitude, longitude) {
    const earthRadius = 6371.0088;

    const lat1 = latitude * Math.PI / 180;
    const lat2 = KAABA.latitude * Math.PI / 180;

    const deltaLat =
      (KAABA.latitude - latitude) * Math.PI / 180;

    const deltaLon =
      (KAABA.longitude - longitude) * Math.PI / 180;

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2;

    const c =
      2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return earthRadius * c;
  }

  /* =====================================================
     11. UPDATE DISPLAY
     ===================================================== */

  function updateBearingDisplay() {
    if (qiblaBearing === null) {
      setText(el.bearingValue, "---°");
      setText(el.bearingDirection, "---");
      return;
    }

    setText(
      el.bearingValue,
      `${formatNumber(Math.round(qiblaBearing))}°`
    );

    setText(
      el.bearingDirection,
      getDirectionName(qiblaBearing)
    );
  }

  function updateDistance() {
    if (!userLocation) {
      setText(el.distanceValue, "---");
      return;
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude
    );

    setText(
      el.distanceValue,
      formatNumber(distance, 1)
    );
  }

  /* =====================================================
     12. COMPASS MOVEMENT
     ===================================================== */

  function updateCompassMovement() {
    if (qiblaBearing === null) return;

    const heading = deviceHeading ?? 0;

    /*
      Dial:
      Rotates opposite to the phone heading.

      Needle:
      Points towards Qibla relative to phone heading.

      Kaaba:
      Moves around the outer orbit at the same
      relative Qibla angle.
    */

    const relativeAngle =
      normalizeAngle(qiblaBearing - heading);

    if (el.compassDial) {
      el.compassDial.style.transform =
        `rotate(${-heading}deg)`;
    }

    if (el.qiblaNeedle) {
      el.qiblaNeedle.style.transform =
        `translate(-50%, -100%) rotate(${relativeAngle}deg)`;
    }

    if (el.qiblaMarker) {
      el.qiblaMarker.style.setProperty(
        "--qibla-angle",
        `${relativeAngle}deg`
      );
    }

    updateDirectionLabelRotation();
  }

  /* =====================================================
     13. READ HOME PAGE LOCATION
     ===================================================== */

  function readSavedLocation() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(LOCATION_KEY) || "null"
      );

      if (!saved || typeof saved !== "object") {
        return null;
      }

      /*
        Home.js saves:
        {
          lat: latitude,
          lon: longitude,
          updatedAt: timestamp
        }

        Also supports:
        { latitude, longitude }
      */

      const latitude = Number(
        saved.latitude ?? saved.lat
      );

      const longitude = Number(
        saved.longitude ?? saved.lon ?? saved.lng
      );

      if (!isValidCoordinates(latitude, longitude)) {
        return null;
      }

      return {
        latitude,
        longitude,
        accuracy: Number(saved.accuracy) || null,
        name: saved.name || saved.locationName || null,
        approximate: Boolean(saved.approximate)
      };

    } catch (error) {
      console.warn("Saved Home location read error:", error);
      return null;
    }
  }

  /* =====================================================
     14. LOCATION TEXT
     ===================================================== */

  function updateLocationText() {
    if (!userLocation) {
      setText(
        el.locationName,
        currentText().locationUnavailable
      );
      return;
    }

    if (userLocation.name) {
      setText(el.locationName, userLocation.name);
      return;
    }

    setText(
      el.locationName,
      `${formatNumber(userLocation.latitude, 4)}, ${formatNumber(userLocation.longitude, 4)}`
    );
  }

  /* =====================================================
     15. REVERSE GEOCODING
     ===================================================== */

  async function getLocationName(latitude, longitude) {
    const requestId = ++geocodeRequestId;

    try {
      const url =
        "https://nominatim.openstreetmap.org/reverse" +
        `?format=jsonv2&lat=${encodeURIComponent(latitude)}` +
        `&lon=${encodeURIComponent(longitude)}` +
        "&zoom=10&addressdetails=1";

      const response = await fetch(url, {
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Location lookup failed");
      }

      const data = await response.json();

      if (requestId !== geocodeRequestId) return;

      const address = data.address || {};

      const place =
        address.city ||
        address.town ||
        address.village ||
        address.suburb ||
        address.county ||
        address.state_district ||
        address.state ||
        data.name;

      if (place && userLocation) {
        userLocation.name = place;
        setText(el.locationName, place);
      } else {
        updateLocationText();
      }

    } catch (error) {
      console.warn("Reverse geocoding error:", error);
      updateLocationText();
    }
  }

  /* =====================================================
     16. SET SHARED LOCATION
     ===================================================== */

  function setCurrentLocation(location) {
    if (
      !location ||
      !isValidCoordinates(
        Number(location.latitude),
        Number(location.longitude)
      )
    ) {
      return;
    }

    userLocation = {
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
      accuracy: Number(location.accuracy) || null,
      name: location.name || null,
      approximate: Boolean(location.approximate)
    };

    /*
      Do not write a new location here.
      Home page remains the source of truth.
    */

    qiblaBearing = calculateBearing(
      userLocation.latitude,
      userLocation.longitude
    );

    updateLocationText();
    updateDistance();
    updateBearingDisplay();
    updateCompassMovement();

    if (!userLocation.name) {
      getLocationName(
        userLocation.latitude,
        userLocation.longitude
      );
    }
  }

  /* =====================================================
     17. LOAD THE SAME LOCATION AS HOME
     ===================================================== */

  function loadHomeLocation() {
    setText(el.locationName, currentText().locating);

    const saved = readSavedLocation();

    if (saved) {
      setCurrentLocation(saved);
      return;
    }

    /*
      Do not request a separate GPS location.
      Do not silently substitute Kolkata coordinates.
      The Home page must first save a valid location.
    */

    userLocation = null;
    qiblaBearing = null;

    setText(
      el.locationName,
      currentText().locationUnavailable
    );

    setText(el.distanceValue, "---");
    setText(el.bearingValue, "---°");
    setText(el.bearingDirection, "---");
  }

  /* =====================================================
     18. SMOOTH ANGLE
     ===================================================== */

  function smoothAngle(current, target, factor) {
    let difference = target - current;

    difference = ((difference + 540) % 360) - 180;

    return normalizeAngle(
      current + difference * factor
    );
  }

  /* =====================================================
     19. HEADING ANIMATION
     ===================================================== */

  function animateHeading() {
    if (!sensorActive || targetHeading === null) {
      animationFrame = null;
      return;
    }

    if (smoothHeading === null) {
      smoothHeading = targetHeading;
    } else {
      smoothHeading = smoothAngle(
        smoothHeading,
        targetHeading,
        0.18
      );
    }

    deviceHeading = smoothHeading;

    updateCompassMovement();

    animationFrame = requestAnimationFrame(animateHeading);
  }

  function setHeading(value) {
    if (!Number.isFinite(value)) return;

    targetHeading = normalizeAngle(value);
    firstHeadingReceived = true;

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(animateHeading);
    }

    if (headingTimeout) {
      clearTimeout(headingTimeout);
      headingTimeout = null;
    }

    setText(el.compassStatus, currentText().active);
  }

  /* =====================================================
     20. DEVICE ORIENTATION
     ===================================================== */

  function handleOrientation(event) {
    let heading = null;

    /*
      iOS:
      webkitCompassHeading provides compass heading.

      Android:
      alpha is used only when the orientation event
      is absolute. Relative alpha is not a reliable
      reference to magnetic north.
    */

    if (Number.isFinite(event.webkitCompassHeading)) {
      heading = event.webkitCompassHeading;

    } else if (
      event.absolute === true &&
      Number.isFinite(event.alpha)
    ) {
      heading = 360 - event.alpha;

      const screenAngle =
        Number(window.screen?.orientation?.angle) ||
        Number(window.orientation) ||
        0;

      heading += screenAngle;
    }

    if (heading === null || !Number.isFinite(heading)) {
      return;
    }

    setHeading(heading);
  }

  /* =====================================================
     21. SENSOR PERMISSION
     ===================================================== */

  function permissionRequired() {
    return (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    );
  }

  /* =====================================================
     22. SENSOR BUTTON
     ===================================================== */

  function updateSensorButton() {
    const t = currentText();

    if (!el.sensorButton) return;

    setText(
      el.sensorButtonText,
      sensorActive ? t.stop : t.start
    );

    el.sensorButton.setAttribute(
      "aria-pressed",
      String(sensorActive)
    );

    el.sensorButton.setAttribute(
      "aria-label",
      sensorActive ? t.stop : t.start
    );

    el.sensorButton.title =
      sensorActive ? t.stop : t.start;
  }

  /* =====================================================
     23. START COMPASS
     ===================================================== */

  async function startCompass() {
    if (sensorActive) return;

    const t = currentText();

    const secure =
      window.isSecureContext ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (!secure) {
      setText(el.compassStatus, t.secure);
      return;
    }

    if (!("DeviceOrientationEvent" in window)) {
      setText(el.compassStatus, t.unsupported);
      return;
    }

    setText(el.compassStatus, t.starting);
    setText(el.sensorButtonText, t.starting);

    try {
      /*
        iOS permission request must be called
        directly from the user's button interaction.
      */

      if (permissionRequired()) {
        const permission =
          await DeviceOrientationEvent.requestPermission();

        if (permission !== "granted") {
          setText(el.compassStatus, t.denied);
          updateSensorButton();
          return;
        }
      }

      sensorActive = true;
      firstHeadingReceived = false;

      targetHeading = null;
      smoothHeading = null;
      deviceHeading = null;

      /*
        Register one orientation event source.
        Prefer deviceorientationabsolute when available.
        This avoids duplicate sensor updates.
      */

      orientationEventName =
        ("ondeviceorientationabsolute" in window)
          ? "deviceorientationabsolute"
          : "deviceorientation";

      window.addEventListener(
        orientationEventName,
        handleOrientation,
        true
      );

      updateSensorButton();

      setText(el.compassStatus, t.waiting);

      if (headingTimeout) {
        clearTimeout(headingTimeout);
      }

      headingTimeout = window.setTimeout(() => {
        if (!sensorActive || firstHeadingReceived) return;

        setText(el.compassStatus, t.noHeading);
      }, 6000);

    } catch (error) {
      console.error("Compass permission error:", error);

      sensorActive = false;
      removeOrientationListeners();

      setText(el.compassStatus, t.denied);
      updateSensorButton();
    }
  }

  /* =====================================================
     24. REMOVE SENSOR LISTENERS
     ===================================================== */

  function removeOrientationListeners() {
    if (orientationEventName) {
      window.removeEventListener(
        orientationEventName,
        handleOrientation,
        true
      );
    }

    /*
      Also remove both names defensively, so no old
      listener remains if the browser changes support.
    */

    window.removeEventListener(
      "deviceorientation",
      handleOrientation,
      true
    );

    window.removeEventListener(
      "deviceorientationabsolute",
      handleOrientation,
      true
    );

    orientationEventName = null;

    if (headingTimeout) {
      clearTimeout(headingTimeout);
      headingTimeout = null;
    }
  }

  /* =====================================================
     25. STOP COMPASS
     ===================================================== */

  function stopCompass() {
    sensorActive = false;

    removeOrientationListeners();

    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    targetHeading = null;
    smoothHeading = null;
    deviceHeading = null;

    /*
      Return the dial to north-up orientation.
      Qibla bearing and distance remain unchanged.
    */

    if (el.compassDial) {
      el.compassDial.style.transform = "rotate(0deg)";
    }

    if (el.directionRing) {
      el.directionRing.style.setProperty(
        "--heading-counter",
        "0deg"
      );
    }

    updateCompassMovement();
    updateSensorButton();

    setText(el.compassStatus, currentText().stopped);
  }

  /* =====================================================
     26. BUTTON EVENTS
     ===================================================== */

  if (el.sensorButton) {
    el.sensorButton.addEventListener("click", () => {
      if (sensorActive) {
        stopCompass();
      } else {
        startCompass();
      }
    });
  }

  /* =====================================================
     27. SETTINGS AND LOCATION CHANGE EVENTS
     ===================================================== */

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      readSettings();
    }

    if (event.key === LOCATION_KEY) {
      loadHomeLocation();
    }
  });

  /*
    Same-tab settings update support.
    Settings page may dispatch:
    window.dispatchEvent(new Event("ibadatSettingsChanged"));
  */

  window.addEventListener("ibadatSettingsChanged", () => {
    readSettings();
  });

  /*
    Optional same-tab location update support.
    Home page may dispatch:
    window.dispatchEvent(new Event("ibadatLocationChanged"));
  */

  window.addEventListener("ibadatLocationChanged", () => {
    loadHomeLocation();
  });

  /* =====================================================
     28. PAGE RETURN / VISIBILITY
     ===================================================== */

  window.addEventListener("pageshow", () => {
    readSettings();
    loadHomeLocation();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && sensorActive) {
      stopCompass();
    } else if (!document.hidden) {
      readSettings();
      loadHomeLocation();
    }
  });

  /* =====================================================
     29. INITIALIZE
     ===================================================== */

  function initialize() {
    readSettings();

    createCompassTicks();
    createDirectionLabels();

    loadHomeLocation();

    updateSensorButton();
    updateBearingDisplay();
    updateDistance();
  }

  initialize();

  /* =====================================================
     30. CLEANUP
     ===================================================== */

  window.addEventListener("pagehide", () => {
    if (sensorActive) {
      stopCompass();
    }
  });

})();
