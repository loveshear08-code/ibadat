"use strict";

(() => {
  const $ = (id) => document.getElementById(id);

  /* =====================================================
     LANGUAGE DATA
  ===================================================== */

  const LANG = {
    bn: {
      locale: "bn-BD",
      title: "কিবলা কম্পাস",
      location: "বর্তমান অবস্থান",
      loading: "লোকেশন খোঁজা হচ্ছে...",
      unavailable: "লোকেশন পাওয়া যায়নি",
      approximate: "কলকাতা (আনুমানিক অবস্থান)",
      distance: "কাবা শরিফ পর্যন্ত দূরত্ব",
      sensorStart: "কম্পাস চালু করুন",
      sensorReady: "কম্পাস চালু হয়েছে",
      sensorPermission: "কম্পাস ব্যবহারের অনুমতি দিন",
      sensorUnavailable: "এই ডিভাইসে কম্পাস সেন্সর পাওয়া যায়নি",
      sensorError: "কম্পাস সেন্সর চালু করা যায়নি",
      calibration: "ফোনটি আটের মতো করে কয়েকবার ঘোরান, নির্ভুলতার জন্য ধাতব বস্তু থেকে দূরে থাকুন।",
      quotes: [
        "নামাজ আদায়ের আগে সঠিক কিবলার দিক জেনে নিন।",
        "পবিত্র কাবা শরিফের দিকে মুখ করে নামাজ আদায় করুন।",
        "আপনার বর্তমান অবস্থান অনুযায়ী কিবলার দিক নির্ণয় করুন।",
        "সঠিক অবস্থান ও কম্পাস সেন্সর ব্যবহার করে কিবলার দিক খুঁজে নিন।",
        "নামাজের প্রস্তুতিতে কিবলার সঠিক দিক জানা অত্যন্ত গুরুত্বপূর্ণ।",
        "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।"
      ],
      directions: [
        "উ", "উ-উ-পূ", "উ-পূ", "পূ-উ-পূ",
        "পূ", "পূ-দ-পূ", "দ-পূ", "দ-দ-পূ",
        "দ", "দ-দ-প", "দ-প", "প-দ-প",
        "প", "প-উ-প", "উ-প", "উ-উ-প"
      ],
      degrees: [
        "০°", "৪৫°", "৯০°", "১৩৫°",
        "১৮০°", "২২৫°", "২৭০°", "৩১৫°"
      ],
      km: "কিমি"
    },

    en: {
      locale: "en-IN",
      title: "Qibla Compass",
      location: "Current Location",
      loading: "Finding location...",
      unavailable: "Location unavailable",
      approximate: "Kolkata (approximate location)",
      distance: "Distance to Kaaba",
      sensorStart: "Start Compass",
      sensorReady: "Compass activated",
      sensorPermission: "Allow compass access",
      sensorUnavailable: "Compass sensor unavailable on this device",
      sensorError: "Could not start compass sensor",
      calibration: "Move your phone in a figure-eight motion. Keep it away from magnetic objects.",
      quotes: [
        "Find the correct Qibla direction before prayer.",
        "Face the Holy Kaaba when offering your prayer.",
        "Find the Qibla direction based on your current location.",
        "Use your location and compass sensor to find the Qibla.",
        "Knowing the correct Qibla direction is important before prayer.",
        "In the remembrance of Allah, hearts find peace."
      ],
      directions: [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
      ],
      degrees: [
        "0°", "45°", "90°", "135°",
        "180°", "225°", "270°", "315°"
      ],
      km: "km"
    },

    hi: {
      locale: "hi-IN-u-nu-deva",
      title: "क़िबला कम्पास",
      location: "वर्तमान स्थान",
      loading: "लोकेशन खोजी जा रही है...",
      unavailable: "स्थान उपलब्ध नहीं",
      approximate: "कोलकाता (अनुमानित स्थान)",
      distance: "काबा तक की दूरी",
      sensorStart: "कम्पास चालू करें",
      sensorReady: "कम्पास चालू हो गया",
      sensorPermission: "कम्पास की अनुमति दें",
      sensorUnavailable: "इस डिवाइस में कम्पास सेंसर उपलब्ध नहीं है",
      sensorError: "कम्पास सेंसर चालू नहीं हो सका",
      calibration: "फ़ोन को आठ के आकार में कुछ बार घुमाएँ। चुंबकीय वस्तुओं से दूर रहें।",
      quotes: [
        "नमाज़ से पहले सही क़िबला दिशा जान लें।",
        "नमाज़ अदा करते समय पवित्र काबा की ओर रुख करें।",
        "अपने वर्तमान स्थान के अनुसार क़िबला दिशा जानें।",
        "लोकेशन और कम्पास सेंसर से क़िबला दिशा पता करें।",
        "नमाज़ से पहले सही क़िबला दिशा जानना ज़रूरी है।",
        "अल्लाह के स्मरण से दिलों को सुकून मिलता है।"
      ],
      directions: [
        "उ", "उ-उ-पू", "उ-पू", "पू-उ-पू",
        "पू", "पू-द-पू", "द-पू", "द-द-पू",
        "द", "द-द-प", "द-प", "प-द-प",
        "प", "प-उ-प", "उ-प", "उ-उ-प"
      ],
      degrees: [
        "०°", "४५°", "९०°", "१३५°",
        "१८०°", "२२५°", "२७०°", "३१५°"
      ],
      km: "किमी"
    }
  };

  /* =====================================================
     FIXED COORDINATES
  ===================================================== */

  const KAABA = {
    latitude: 21.422487,
    longitude: 39.826206
  };

  const KOLKATA_FALLBACK = {
    latitude: 22.5726,
    longitude: 88.3639
  };

  const VALID_THEMES = [
    "classic",
    "royal",
    "rose",
    "pista"
  ];

  const VALID_LANGUAGES = [
    "bn",
    "en",
    "hi"
  ];

  /* =====================================================
     STATE
  ===================================================== */

  let language = "bn";

  let coordinates = null;
  let qiblaBearing = null;

  let heading = null;
  let lastHeading = null;

  let sensorActive = false;
  let locationStatus = "loading";

  let locationTimer = null;
  let locationRequestId = 0;

  let calibrationTimer = null;

  let orientationListening = false;
  let lastOrientationTime = 0;

  /* =====================================================
     HELPERS
  ===================================================== */

  function t() {
    return LANG[language] || LANG.bn;
  }

  function normalize(degrees) {
    return (degrees % 360 + 360) % 360;
  }

  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  function number(value, digits = 0) {
    return new Intl.NumberFormat(t().locale, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits
    }).format(value);
  }

  function readSettings() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("appSettings") || "{}"
      );

      if (
        !saved ||
        typeof saved !== "object" ||
        Array.isArray(saved)
      ) {
        return {};
      }

      return saved;

    } catch (error) {
      console.warn(
        "IBADAT: settings read failed.",
        error
      );

      return {};
    }
  }

  /* =====================================================
     SETTINGS INTEGRATION
  ===================================================== */

  function getLanguage(settings) {
    const selected =
      settings.lang ||
      settings.language ||
      "bn";

    return VALID_LANGUAGES.includes(selected)
      ? selected
      : "bn";
  }

  function getTheme(settings) {
    const selected =
      settings.themeColor ||
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

    const theme = aliases[selected] || "classic";

    return VALID_THEMES.includes(theme)
      ? theme
      : "classic";
  }

  function applySettings() {
    const settings = readSettings();

    language = getLanguage(settings);

    const dark =
      settings.dark === true ||
      settings.darkMode === true ||
      settings.isDarkMode === true;

    document.documentElement.lang = language;

    document.body.dataset.colorTheme =
      getTheme(settings);

    document.body.classList.toggle(
      "dark-mode",
      dark
    );

    updateLanguage();
  }

  /* =====================================================
     LANGUAGE UPDATE
  ===================================================== */

  function updateLanguage() {
    const strings = t();

    $("pageTitle").textContent = strings.title;

    $("locationLabel").textContent =
      strings.location;

    $("distanceLabel").textContent =
      strings.distance;

    $("sensorButton").textContent =
      sensorActive
        ? strings.sensorReady
        : strings.sensorStart;

    document.title =
      strings.title + " | IBADAT";

    /* DIRECTION NAMES */

    document.querySelectorAll(
      ".direction-ring span"
    ).forEach((element, index) => {

      element.textContent =
        strings.directions[index] || "";

    });

    /* DEGREE LABELS */

    document.querySelectorAll(
      ".degree-ring span"
    ).forEach((element, index) => {

      element.textContent =
        strings.degrees[index] || "";

    });

    updateLocationDisplay();
    updateDistanceDisplay();
    updateFooter();
  }

  /* =====================================================
     DISTANCE AND BEARING CALCULATIONS
  ===================================================== */

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const c =
      2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return earthRadius * c;
  }

  function calculateBearing(lat1, lon1, lat2, lon2) {
    const phi1 = toRadians(lat1);
    const phi2 = toRadians(lat2);

    const deltaLambda =
      toRadians(lon2 - lon1);

    const y =
      Math.sin(deltaLambda) * Math.cos(phi2);

    const x =
      Math.cos(phi1) * Math.sin(phi2) -
      Math.sin(phi1) *
      Math.cos(phi2) *
      Math.cos(deltaLambda);

    return normalize(
      toDegrees(Math.atan2(y, x))
    );
  }

  function calculateQibla() {
    if (!coordinates) return;

    qiblaBearing = calculateBearing(
      coordinates.latitude,
      coordinates.longitude,
      KAABA.latitude,
      KAABA.longitude
    );

    updateDistanceDisplay();
    updateQiblaMarker();
  }

  /* =====================================================
     DISTANCE DISPLAY
  ===================================================== */

  function updateDistanceDisplay() {
    const element = $("distanceValue");

    if (!coordinates) {
      element.textContent = "--";
      return;
    }

    const distance = calculateDistance(
      coordinates.latitude,
      coordinates.longitude,
      KAABA.latitude,
      KAABA.longitude
    );

    element.textContent =
      number(distance, 1) + " " + t().km;
  }

  /* =====================================================
     LOCATION DISPLAY
  ===================================================== */

  function updateLocationDisplay() {
    const element = $("locationName");

    if (locationStatus === "loading") {
      element.textContent = t().loading;
      return;
    }

    if (locationStatus === "approximate") {
      element.textContent = t().approximate;
      return;
    }

    if (locationStatus !== "available") {
      element.textContent = t().unavailable;
      return;
    }

    const names =
      window.ibadatLocationNames || {};

    element.textContent =
      names[language] ||
      names.en ||
      names.bn ||
      names.hi ||
      t().unavailable;
  }

  /* =====================================================
     SHARED LOCATION
  ===================================================== */

  function readSharedLocation() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(
          "ibadatUserLocation"
        ) || "null"
      );

      if (
        saved &&
        Number.isFinite(Number(saved.lat)) &&
        Number.isFinite(Number(saved.lon)) &&
        Math.abs(Number(saved.lat)) <= 90 &&
        Math.abs(Number(saved.lon)) <= 180
      ) {
        return {
          latitude: Number(saved.lat),
          longitude: Number(saved.lon),
          updatedAt: Number(saved.updatedAt) || 0
        };
      }

    } catch (error) {
      console.warn(
        "IBADAT: shared location read failed.",
        error
      );
    }

    return null;
  }

  /* =====================================================
     REVERSE GEOCODING
  ===================================================== */

  async function loadLocationName(lat, lon) {
    const requestId = ++locationRequestId;

    locationStatus = "loading";
    updateLocationDisplay();

    try {
      const url = new URL(
        "https://nominatim.openstreetmap.org/reverse"
      );

      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("lat", lat);
      url.searchParams.set("lon", lon);
      url.searchParams.set("zoom", "14");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("accept-language", "en");

      const response = await fetch(
        url.toString(),
        {
          headers: {
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error(
          "Location name unavailable."
        );
      }

      const data = await response.json();

      if (requestId !== locationRequestId) {
        return;
      }

      const address = data.address || {};

      const localityFields = [
        "neighbourhood",
        "suburb",
        "quarter",
        "city_district",
        "borough",
        "town",
        "city",
        "municipality",
        "village",
        "hamlet",
        "county",
        "state"
      ];

      let locality = null;

      for (const field of localityFields) {
        if (
          typeof address[field] === "string" &&
          address[field].trim()
        ) {
          locality = address[field].trim();
          break;
        }
      }

      if (!locality) {
        throw new Error("Locality not found.");
      }

      const country = address.country || "";

      const names = {
        en:
          country && country !== locality
            ? locality + ", " + country
            : locality,

        bn: address["name:bn"] || null,
        hi: address["name:hi"] || null
      };

      /*
       * Transliteration fallback
       */

      if (!names.bn || !names.hi) {
        try {
          const missingLanguages = [
            "bn",
            "hi"
          ].filter(lang => !names[lang]);

          const translated = await Promise.all(
            missingLanguages.map(async lang => {

              const inputUrl = new URL(
                "https://inputtools.google.com/request"
              );

              inputUrl.searchParams.set(
                "text",
                locality
              );

              inputUrl.searchParams.set(
                "itc",
                lang === "bn"
                  ? "bn-t-i0-und"
                  : "hi-t-i0-und"
              );

              inputUrl.searchParams.set(
                "num",
                "1"
              );

              const resultResponse = await fetch(
                inputUrl.toString()
              );

              if (!resultResponse.ok) {
                throw new Error(
                  "Transliteration unavailable."
                );
              }

              const result =
                await resultResponse.json();

              return (
                result?.[1]?.[0]?.[1]?.[0] ||
                locality
              );
            })
          );

          missingLanguages.forEach(
            (lang, index) => {
              names[lang] = translated[index];
            }
          );

        } catch {
          names.bn = names.bn || locality;
          names.hi = names.hi || locality;
        }
      }

      if (requestId !== locationRequestId) {
        return;
      }

      window.ibadatLocationNames = names;

      locationStatus = "available";
      updateLocationDisplay();

    } catch (error) {

      if (requestId !== locationRequestId) {
        return;
      }

      console.warn(
        "IBADAT: reverse geocoding failed.",
        error
      );

      locationStatus = "unavailable";
      updateLocationDisplay();
    }
  }

  /* =====================================================
     APPLY COORDINATES
  ===================================================== */

  function applyCoordinates(
    lat,
    lon,
    source = "gps"
  ) {
    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      Math.abs(lat) > 90 ||
      Math.abs(lon) > 180
    ) {
      return;
    }

    coordinates = {
      latitude: lat,
      longitude: lon
    };

    calculateQibla();

    if (
      source === "gps" ||
      source === "cached"
    ) {
      loadLocationName(lat, lon);

    } else {

      locationRequestId++;

      locationStatus = "approximate";
      updateLocationDisplay();
    }
  }

  /* =====================================================
     GPS
  ===================================================== */

  function useFallbackLocation() {
    applyCoordinates(
      KOLKATA_FALLBACK.latitude,
      KOLKATA_FALLBACK.longitude,
      "fallback"
    );
  }

  function loadGPS() {
    if (!navigator.geolocation) {
      useFallbackLocation();
      return;
    }

    locationStatus = "loading";
    updateLocationDisplay();

    navigator.geolocation.getCurrentPosition(

      position => {

        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        applyCoordinates(
          lat,
          lon,
          "gps"
        );

        try {
          localStorage.setItem(
            "ibadatUserLocation",
            JSON.stringify({
              lat,
              lon,
              updatedAt: Date.now(),
              source: "gps"
            })
          );

        } catch (error) {
          console.warn(
            "IBADAT: location save failed.",
            error
          );
        }
      },

      error => {

        console.warn(
          "IBADAT: GPS error.",
          error
        );

        const shared = readSharedLocation();

        if (
          shared &&
          shared.updatedAt > 0 &&
          Date.now() - shared.updatedAt <
            24 * 60 * 60 * 1000
        ) {
          applyCoordinates(
            shared.latitude,
            shared.longitude,
            "cached"
          );

          return;
        }

        useFallbackLocation();
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  }

  /* =====================================================
     COMPASS TICKS
  ===================================================== */

  function createCompassTicks() {
    const container = $("compassTicks");

    if (!container) return;

    container.replaceChildren();

    for (let i = 0; i < 64; i++) {

      const tick = document.createElement("i");

      tick.style.transform =
        `rotate(${i * 5.625}deg)`;

      /*
       * Four levels of tick marks:
       *
       * Every 5.625°  = small
       * Every 22.5°   = medium
       * Every 45°     = red secondary
       * Every 90°     = red cardinal
       */

      if (i % 16 === 0) {

        tick.classList.add("cardinal");

      } else if (i % 8 === 0) {

        tick.classList.add("intercardinal");

      } else if (i % 4 === 0) {

        tick.classList.add("major");

      }

      container.appendChild(tick);
    }
  }

  /* =====================================================
     DIRECTION LABEL POSITIONS
  ===================================================== */

  function positionDirections() {

    const labels = document.querySelectorAll(
      ".direction-ring span"
    );

    labels.forEach((element, index) => {

      element.style.setProperty(
        "--angle",
        index * 22.5
      );

    });
  }

  /* =====================================================
     DEGREE LABEL POSITIONS
  ===================================================== */

  function positionDegrees() {

    const labels = document.querySelectorAll(
      ".degree-ring span"
    );

    labels.forEach((element, index) => {

      element.style.setProperty(
        "--degree-angle",
        index * 45
      );

    });
  }

  /* =====================================================
     KAABA MARKER
     OUTSIDE THE COMPASS
  ===================================================== */

  function updateQiblaMarker() {

    if (qiblaBearing === null) {
      return;
    }

    /*
     * The marker is outside the rotating rose.
     * Therefore its angle must include the
     * phone heading.
     */

    const relativeBearing =
      heading === null
        ? qiblaBearing
        : normalize(qiblaBearing - heading);

    const orbit = $("qiblaOrbit");
    const marker = $("qiblaMarker");

    if (!orbit || !marker) return;

    orbit.style.transform =
      `rotate(${relativeBearing}deg)`;

    /*
     * Counter-rotate the icon so that the
     * Kaaba image stays upright.
     */

    marker.style.transform =
      `rotate(${-relativeBearing}deg)`;
  }

  /* =====================================================
     COMPASS ROTATION
  ===================================================== */

  function updateCompass() {

    if (heading === null) {
      updateQiblaMarker();
      return;
    }

    /*
     * Dial, direction names and degree labels
     * rotate together against phone movement.
     */

    $("compassRose").style.transform =
      `rotate(${-heading}deg)`;

    updateQiblaMarker();
  }

  /* =====================================================
     SMOOTH HEADING
  ===================================================== */

  function smoothHeading(newHeading) {

    newHeading = normalize(newHeading);

    if (lastHeading === null) {

      lastHeading = newHeading;
      heading = newHeading;

      updateCompass();

      return;
    }

    /*
     * Shortest angular distance avoids
     * sudden jumps around 0° / 360°.
     */

    const difference =
      ((newHeading - lastHeading + 540) % 360) - 180;

    const smoothed =
      normalize(
        lastHeading + difference * 0.20
      );

    lastHeading = smoothed;
    heading = smoothed;

    updateCompass();
  }

  /* =====================================================
     SCREEN ORIENTATION
  ===================================================== */

  function getScreenAngle() {

    if (
      screen.orientation &&
      Number.isFinite(screen.orientation.angle)
    ) {
      return screen.orientation.angle;
    }

    if (
      Number.isFinite(window.orientation)
    ) {
      return window.orientation;
    }

    return 0;
  }

  /* =====================================================
     DEVICE ORIENTATION
  ===================================================== */

  function handleOrientation(event) {

    let compassHeading = null;

    /*
     * iOS Safari
     */

    if (
      Number.isFinite(event.webkitCompassHeading)
    ) {

      compassHeading =
        event.webkitCompassHeading;

    }

    /*
     * Android absolute orientation
     */

    else if (
      event.absolute === true &&
      Number.isFinite(event.alpha)
    ) {

      compassHeading =
        360 - event.alpha + getScreenAngle();

    }

    /*
     * Browser fallback
     */

    else if (
      Number.isFinite(event.alpha)
    ) {

      compassHeading =
        360 - event.alpha + getScreenAngle();

    }

    if (!Number.isFinite(compassHeading)) {
      return;
    }

    const now = performance.now();

    /*
     * Ignore duplicate sensor events.
     */

    if (
      now - lastOrientationTime < 8
    ) {
      return;
    }

    lastOrientationTime = now;

    smoothHeading(compassHeading);
  }

  /* =====================================================
     SENSOR LISTENER CONTROL
  ===================================================== */

  function addOrientationListeners() {

    if (orientationListening) return;

    window.addEventListener(
      "deviceorientation",
      handleOrientation,
      true
    );

    window.addEventListener(
      "deviceorientationabsolute",
      handleOrientation,
      true
    );

    orientationListening = true;
  }

  function removeOrientationListeners() {

    if (!orientationListening) return;

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

    orientationListening = false;
  }

  /* =====================================================
     SENSOR START
  ===================================================== */

  async function startCompass() {

    const button = $("sensorButton");
    const message = $("sensorMessage");

    button.disabled = true;
    message.textContent = "";

    try {

      if (
        !("DeviceOrientationEvent" in window)
      ) {
        throw new Error("unsupported");
      }

      /*
       * iOS sensor permission
       */

      if (
        typeof DeviceOrientationEvent.requestPermission ===
        "function"
      ) {

        const permission =
          await DeviceOrientationEvent.requestPermission();

        if (permission !== "granted") {
          throw new Error("permission");
        }
      }

      lastHeading = null;
      heading = null;

      lastOrientationTime = 0;

      addOrientationListeners();

      sensorActive = true;

      button.textContent =
        t().sensorReady;

      message.textContent =
        t().calibration;

      if (calibrationTimer) {
        clearTimeout(calibrationTimer);
      }

      calibrationTimer = window.setTimeout(
        () => {

          if (sensorActive) {
            message.textContent = "";
          }

        },
        7000
      );

    } catch (error) {

      console.warn(
        "IBADAT: compass sensor error.",
        error
      );

      removeOrientationListeners();

      sensorActive = false;

      if (error.message === "unsupported") {

        message.textContent =
          t().sensorUnavailable;

      } else if (
        error.message === "permission"
      ) {

        message.textContent =
          t().sensorPermission;

      } else {

        message.textContent =
          t().sensorError;

      }

      button.textContent =
        t().sensorStart;

    } finally {

      button.disabled = false;

    }
  }

  /* =====================================================
     FOOTER MARQUEE
  ===================================================== */

  function updateFooter() {

    const first = $("footerMessage");
    const second = $("footerMessageClone");

    const text = t().quotes.join(
      "   •   "
    );

    first.textContent = text;
    second.textContent = text;
  }

  /* =====================================================
     SETTINGS CHANGE LISTENERS
  ===================================================== */

  window.addEventListener(
    "storage",
    event => {

      if (
        !event.key ||
        event.key === "appSettings"
      ) {
        applySettings();
      }

      if (
        !event.key ||
        event.key === "ibadatUserLocation"
      ) {

        const shared = readSharedLocation();

        if (
          shared &&
          shared.updatedAt > 0 &&
          Date.now() - shared.updatedAt <
            24 * 60 * 60 * 1000
        ) {

          applyCoordinates(
            shared.latitude,
            shared.longitude,
            "cached"
          );

        }
      }
    }
  );

  window.addEventListener(
    "pageshow",
    () => {
      applySettings();
    }
  );

  document.addEventListener(
    "visibilitychange",
    () => {

      if (!document.hidden) {
        applySettings();
      }

    }
  );

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function init() {

    applySettings();

    createCompassTicks();

    positionDirections();

    positionDegrees();

    $("sensorButton").addEventListener(
      "click",
      startCompass
    );

    /*
     * Prefer recent shared location.
     */

    const shared = readSharedLocation();

    if (
      shared &&
      shared.updatedAt > 0 &&
      Date.now() - shared.updatedAt <
        24 * 60 * 60 * 1000
    ) {

      applyCoordinates(
        shared.latitude,
        shared.longitude,
        "cached"
      );

    } else {

      loadGPS();

    }

    /*
     * Refresh location periodically.
     */

    locationTimer = window.setInterval(
      () => {

        if (!document.hidden) {
          loadGPS();
        }

      },
      10 * 60 * 1000
    );

    window.addEventListener(
      "beforeunload",
      () => {

        window.clearInterval(locationTimer);

        if (calibrationTimer) {
          clearTimeout(calibrationTimer);
        }

        removeOrientationListeners();

      }
    );
  }

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );

  } else {

    init();

  }

})();
