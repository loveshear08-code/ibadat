/* =====================================================
   IBADAT — QIBLA COMPASS
   GPS + Qibla Bearing + Device Orientation
   Shared Settings: appSettings
   ===================================================== */

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const el = {
    pageTitle: $("pageTitle"),

    locationName: $("locationName"),
    refreshLocation: $("refreshLocation"),

    compassDial: $("compassDial"),
    compassTicks: $("compassTicks"),
    directionRing: $("directionRing"),

    qiblaOrbit: $("qiblaOrbit"),
    qiblaMarker: $("qiblaMarker"),
    qiblaNeedle: $("qiblaNeedle"),

    bearingValue: $("bearingValue"),

    distanceValue: $("distanceValue"),
    distanceUnit: $("distanceUnit"),

    footerMessage: $("footerMessage"),
    footerMessageClone: $("footerMessageClone")
  };

  if (!el.compassDial) return;

  /* =====================================================
     1. CONSTANTS
     ===================================================== */

  const KAABA = {
    latitude: 21.422487,
    longitude: 39.826206
  };

  const KOLKATA = {
    latitude: 22.5726,
    longitude: 88.3639
  };

  const SETTINGS_KEY = "appSettings";
  const LOCATION_KEY = "ibadatUserLocation";

  let language = "bn";
  let theme = "classic";
  let darkMode = false;

  let userLocation = null;
  let qiblaBearing = null;
  let deviceHeading = null;

  let sensorActive = false;
  let locationRequestId = 0;
  let firstHeadingReceived = false;

  let lastHeading = null;
  let smoothHeading = null;
  let animationFrame = null;

  /* =====================================================
     2. TRANSLATIONS
     ===================================================== */

  const translations = {
    bn: {
      title: "কিবলা কম্পাস",

      locating: "অবস্থান খোঁজা হচ্ছে...",
      locationDenied: "অবস্থানের অনুমতি পাওয়া যায়নি",
      locationUnavailable: "অবস্থান পাওয়া যাচ্ছে না",
      locationError: "অবস্থান শনাক্ত করা যায়নি",
      approximate: "কলকাতা (আনুমানিক অবস্থান)",

      distanceUnit: "কিমি",

      footer: "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।"
    },

    en: {
      title: "Qibla Compass",

      locating: "Finding your location...",
      locationDenied: "Location permission denied",
      locationUnavailable: "Location unavailable",
      locationError: "Unable to detect location",
      approximate: "Kolkata (Approximate location)",

      distanceUnit: "km",

      footer: "Surely, in the remembrance of Allah hearts find peace."
    },

    hi: {
      title: "क़िबला कम्पास",

      locating: "आपका स्थान खोजा जा रहा है...",
      locationDenied: "स्थान की अनुमति नहीं मिली",
      locationUnavailable: "स्थान उपलब्ध नहीं है",
      locationError: "स्थान पता नहीं चल सका",
      approximate: "कोलकाता (अनुमानित स्थान)",

      distanceUnit: "किमी",

      footer: "अल्लाह के स्मरण से ही दिलों को सुकून मिलता है।"
    }
  };

  /* =====================================================
     3. NUMBER FORMAT
     ===================================================== */

  function getLocale() {
    if (language === "en") return "en-IN";
    if (language === "hi") return "hi-IN-u-nu-deva";
    return "bn-BD";
  }

  function formatNumber(value, decimals = 0) {
    return new Intl.NumberFormat(getLocale(), {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    }).format(value);
  }

  function normalizeAngle(value) {
    return ((value % 360) + 360) % 360;
  }

  /* =====================================================
     4. READ IBADAT SETTINGS
     ===================================================== */

  function readSettings() {
    let settings = {};

    try {
      settings = JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
      );
    } catch (error) {
      console.warn("Settings read error:", error);
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

    darkMode = Boolean(
      settings.dark ??
      settings.darkMode ??
      settings.isDarkMode ??
      false
    );

    document.documentElement.lang = language;

    document.body.dataset.colorTheme = theme;
    document.body.classList.toggle("dark-mode", darkMode);

    applyTranslations();
  }

  /* =====================================================
     5. APPLY LANGUAGE
     ===================================================== */

  function applyTranslations() {
    const t = translations[language];

    if (el.pageTitle) {
      el.pageTitle.textContent = t.title;
    }

    if (el.distanceUnit) {
      el.distanceUnit.textContent = t.distanceUnit;
    }

    if (el.footerMessage) {
      el.footerMessage.textContent = t.footer;
    }

    if (el.footerMessageClone) {
      el.footerMessageClone.textContent = t.footer;
    }

    updateDistance();
    updateBearingText();
    updateFooterAnimation();
  }

  /* =====================================================
     6. FOOTER ANIMATION
     ===================================================== */

  function updateFooterAnimation() {
    const track = $("footerMessageTrack");

    if (!track) return;

    /*
      Two identical messages make a continuous
      scrolling footer.
    */

    track.style.animation = "none";

    void track.offsetWidth;

    track.style.animation = "";
  }

  /* =====================================================
     7. CREATE COMPASS TICKS
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
     8. CREATE DIRECTION LABELS
     ===================================================== */

  function createDirectionLabels() {
    if (!el.directionRing) return;

    const directionNames = {
      bn: [
        "উ", "উ-উ-পূ", "উ-পূ", "পূ-উ-পূ",
        "পূ", "দ-পূ", "দ-দ-পূ", "দ-উ-পূ",
        "দ", "দ-দ-প", "দ-প", "প-দ-প",
        "প", "উ-প", "উ-উ-প", "উ-পূ-প"
      ],

      en: [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
      ],

      hi: [
        "उ", "उ-उ-पू", "उ-पू", "पू-उ-पू",
        "पू", "द-पू", "द-द-पू", "द-उ-पू",
        "द", "द-द-प", "द-प", "प-द-प",
        "प", "उ-प", "उ-उ-प", "उ-पू-प"
      ]
    };

    const names = directionNames[language];
    const fragment = document.createDocumentFragment();

    names.forEach((name, index) => {
      const label = document.createElement("span");

      label.className = "direction-label";

      if (index % 4 === 0) {
        label.classList.add("cardinal");
      }

      label.textContent = name;

      const angle = index * 22.5;

      label.style.setProperty("--angle", `${angle}deg`);

      fragment.appendChild(label);
    });

    el.directionRing.replaceChildren(fragment);
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

    const bearing =
      Math.atan2(y, x) * 180 / Math.PI;

    return normalizeAngle(bearing);
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
     11. UPDATE BEARING DISPLAY
     ===================================================== */

  function updateBearingText() {
    if (!el.bearingValue) return;

    if (qiblaBearing === null) {
      el.bearingValue.textContent = "---°";
      return;
    }

    el.bearingValue.textContent =
      `${formatNumber(Math.round(qiblaBearing))}°`;
  }

  /* =====================================================
     12. UPDATE DISTANCE DISPLAY
     ===================================================== */

  function updateDistance() {
    if (!el.distanceValue) return;

    if (!userLocation) {
      el.distanceValue.textContent = "---";
      return;
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude
    );

    el.distanceValue.textContent =
      formatNumber(distance, 1);
  }

  /* =====================================================
     13. UPDATE COMPASS MOVEMENT
     ===================================================== */

  function updateCompassMovement() {
    if (qiblaBearing === null) return;

    const heading = deviceHeading ?? 0;

    /*
      Compass dial follows the phone's heading.

      Qibla needle and Kaaba marker use the same
      relative angle, so both indicate the same direction.
    */

    const relativeAngle =
      normalizeAngle(qiblaBearing - heading);

    /* Rotate compass direction labels */

    if (el.compassDial) {
      el.compassDial.style.transform =
        `rotate(${-heading}deg)`;
    }

    /* Rotate single red-tip needle */

    if (el.qiblaNeedle) {
      el.qiblaNeedle.style.transform =
        `translate(-50%, -100%) rotate(${relativeAngle}deg)`;
    }

    /* Move Kaaba outside the compass */

    if (el.qiblaMarker) {
      el.qiblaMarker.style.setProperty(
        "--qibla-angle",
        `${relativeAngle}deg`
      );
    }
  }

  /* =====================================================
     14. SAVE LOCATION
     ===================================================== */

  function saveLocation(location) {
    try {
      localStorage.setItem(
        LOCATION_KEY,
        JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy || null,
          updatedAt: Date.now()
        })
      );
    } catch (error) {
      console.warn("Location save error:", error);
    }
  }

  /* =====================================================
     15. READ SAVED LOCATION
     ===================================================== */

  function readSavedLocation() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(LOCATION_KEY) || "null"
      );

      if (
        saved &&
        Number.isFinite(Number(saved.latitude)) &&
        Number.isFinite(Number(saved.longitude))
      ) {
        return {
          latitude: Number(saved.latitude),
          longitude: Number(saved.longitude),
          accuracy: saved.accuracy || null
        };
      }
    } catch (error) {
      console.warn("Saved location error:", error);
    }

    return null;
  }

  /* =====================================================
     16. REVERSE GEOCODING
     ===================================================== */

  async function getLocationName(latitude, longitude) {
    try {
      const url =
        "https://nominatim.openstreetmap.org/reverse" +
        `?format=jsonv2&lat=${encodeURIComponent(latitude)}` +
        `&lon=${encodeURIComponent(longitude)}` +
        "&zoom=10&addressdetails=1";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Location lookup failed");
      }

      const data = await response.json();
      const address = data.address || {};

      const place =
        address.city ||
        address.town ||
        address.village ||
        address.suburb ||
        address.county ||
        address.state_district ||
        address.state;

      if (place && userLocation) {
        el.locationName.textContent = place;
      } else if (userLocation) {
        el.locationName.textContent =
          `${formatNumber(latitude, 4)}, ${formatNumber(longitude, 4)}`;
      }

    } catch (error) {
      console.warn("Reverse geocoding error:", error);

      if (userLocation) {
        el.locationName.textContent =
          `${formatNumber(latitude, 4)}, ${formatNumber(longitude, 4)}`;
      }
    }
  }

  /* =====================================================
     17. SET CURRENT LOCATION
     ===================================================== */

  function setCurrentLocation(location, approximate = false) {
    userLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy || null,
      approximate
    };

    saveLocation(userLocation);

    qiblaBearing = calculateBearing(
      userLocation.latitude,
      userLocation.longitude
    );

    updateBearingText();
    updateDistance();
    updateCompassMovement();

    if (approximate) {
      el.locationName.textContent =
        translations[language].approximate;
    } else {
      el.locationName.textContent =
        `${formatNumber(location.latitude, 4)}, ${formatNumber(location.longitude, 4)}`;

      getLocationName(
        location.latitude,
        location.longitude
      );
    }
  }

  /* =====================================================
     18. FALLBACK LOCATION
     ===================================================== */

  function useFallbackLocation() {
    /*
      Kolkata is only an approximate fallback.
      It is not presented as the user's GPS location.
    */

    setCurrentLocation(KOLKATA, true);
  }

  /* =====================================================
     19. REQUEST GPS
     ===================================================== */

  function requestLocation() {
    const requestId = ++locationRequestId;

    el.locationName.textContent =
      translations[language].locating;

    if (!navigator.geolocation) {
      const saved = readSavedLocation();

      if (saved) {
        setCurrentLocation(saved);
      } else {
        useFallbackLocation();
      }

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (requestId !== locationRequestId) return;

        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },

      (error) => {
        if (requestId !== locationRequestId) return;

        console.warn("GPS error:", error);

        const saved = readSavedLocation();

        if (saved) {
          setCurrentLocation(saved);
        } else {
          useFallbackLocation();
        }

        /*
          Do not overwrite the approximate location
          with a misleading GPS success message.
        */
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  }

  /* =====================================================
     20. SMOOTH HEADING
     ===================================================== */

  function smoothAngle(current, target) {
    let difference = target - current;

    difference = ((difference + 540) % 360) - 180;

    return normalizeAngle(current + difference * 0.22);
  }

  function animateHeading() {
    if (!sensorActive || lastHeading === null) {
      animationFrame = null;
      return;
    }

    if (smoothHeading === null) {
      smoothHeading = lastHeading;
    } else {
      smoothHeading = smoothAngle(
        smoothHeading,
        lastHeading
      );
    }

    deviceHeading = smoothHeading;

    updateCompassMovement();

    animationFrame = requestAnimationFrame(animateHeading);
  }

  function setHeading(value) {
    if (!Number.isFinite(value)) return;

    lastHeading = normalizeAngle(value);

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(animateHeading);
    }
  }

  /* =====================================================
     21. DEVICE ORIENTATION
     ===================================================== */

  function handleOrientation(event) {
    let heading = null;

    /*
      iOS Safari: webkitCompassHeading
      Other browsers: alpha

      Android alpha is an orientation value, not always
      a calibrated magnetic compass heading.
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

    firstHeadingReceived = true;
    setHeading(heading);
  }

  /* =====================================================
     22. SENSOR PERMISSION
     ===================================================== */

  function permissionRequired() {
    return (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    );
  }

  /* =====================================================
     23. START COMPASS
     ===================================================== */

  async function startCompass() {
    if (sensorActive) return;

    if (
      !window.isSecureContext &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1"
    ) {
      alert(
        language === "en"
          ? "Compass requires a secure HTTPS connection."
          : language === "hi"
            ? "कम्पास के लिए सुरक्षित HTTPS कनेक्शन आवश्यक है।"
            : "কম্পাস চালাতে নিরাপদ HTTPS সংযোগ প্রয়োজন।"
      );

      return;
    }

    if (!("DeviceOrientationEvent" in window)) {
      alert(
        language === "en"
          ? "Compass sensor is not supported on this device."
          : language === "hi"
            ? "इस डिवाइस में कम्पास सेंसर उपलब्ध नहीं है।"
            : "এই ডিভাইসে কম্পাস সেন্সর পাওয়া যায়নি।"
      );

      return;
    }

    try {
      /*
        iOS permission must be requested directly
        from the user's button click.
      */

      if (permissionRequired()) {
        const permission =
          await DeviceOrientationEvent.requestPermission();

        if (permission !== "granted") {
          alert(
            language === "en"
              ? "Compass permission was denied."
              : language === "hi"
                ? "कम्पास की अनुमति नहीं मिली।"
                : "কম্পাস ব্যবহারের অনুমতি পাওয়া যায়নি।"
          );

          return;
        }
      }

      sensorActive = true;
      firstHeadingReceived = false;

      lastHeading = null;
      smoothHeading = null;

      window.addEventListener(
        "deviceorientation",
        handleOrientation,
        true
      );

      /*
        If the device does not provide an absolute
        compass heading, do not pretend that alpha alone
        is a reliable magnetic bearing.
      */

      window.setTimeout(() => {
        if (!sensorActive || firstHeadingReceived) return;

        const message =
          language === "en"
            ? "No reliable compass heading received. Check device sensor support and calibration."
            : language === "hi"
              ? "विश्वसनीय कम्पास दिशा नहीं मिली। सेंसर और कैलिब्रेशन जाँचें।"
              : "নির্ভরযোগ্য কম্পাস দিক পাওয়া যায়নি। সেন্সর ও ক্যালিব্রেশন পরীক্ষা করুন।";

        console.warn(message);
      }, 5000);

    } catch (error) {
      console.error("Compass start error:", error);

      sensorActive = false;
    }
  }

  /* =====================================================
     24. STOP COMPASS
     ===================================================== */

  function stopCompass() {
    sensorActive = false;

    window.removeEventListener(
      "deviceorientation",
      handleOrientation,
      true
    );

    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    lastHeading = null;
    smoothHeading = null;
    deviceHeading = null;

    /*
      Return to the north-up view when sensor stops.
    */

    if (el.compassDial) {
      el.compassDial.style.transform = "rotate(0deg)";
    }

    if (el.qiblaNeedle) {
      el.qiblaNeedle.style.transform =
        "translate(-50%, -100%) rotate(0deg)";
    }

    if (el.qiblaMarker) {
      el.qiblaMarker.style.setProperty(
        "--qibla-angle",
        `${qiblaBearing ?? 0}deg`
      );
    }

    updateCompassMovement();
  }

  /* =====================================================
     25. BUTTON EVENTS
     ===================================================== */

  if (el.refreshLocation) {
    el.refreshLocation.addEventListener(
      "click",
      requestLocation
    );
  }

  /* =====================================================
     26. SETTINGS CHANGE
     ===================================================== */

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      readSettings();
      createDirectionLabels();
    }

    if (event.key === LOCATION_KEY) {
      const saved = readSavedLocation();

      if (saved) {
        setCurrentLocation(saved);
      }
    }
  });

  window.addEventListener("ibadatSettingsChanged", () => {
    readSettings();
    createDirectionLabels();
  });

  /*
    When returning from the IBADAT Settings page,
    reload the shared settings.
  */

  window.addEventListener("pageshow", () => {
    readSettings();
    createDirectionLabels();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && sensorActive) {
      stopCompass();
    } else if (!document.hidden) {
      readSettings();
      createDirectionLabels();
    }
  });

  /* =====================================================
     27. INITIALIZE
     ===================================================== */

  function initialize() {
    readSettings();

    createCompassTicks();
    createDirectionLabels();

    const saved = readSavedLocation();

    if (saved) {
      setCurrentLocation(saved);
    }

    requestLocation();

    updateBearingText();
    updateDistance();
    updateCompassMovement();
  }

  initialize();

})();
