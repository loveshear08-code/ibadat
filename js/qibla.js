
"use strict";

(() => {
  const $ = (id) => document.getElementById(id);

  /* =========================================
     LANGUAGE DATA
  ========================================= */

  const LANG = {
    bn: {
      locale: "bn-BD",
      title: "কিবলা কম্পাস",
      location: "বর্তমান অবস্থান",
      loading: "লোকেশন খোঁজা হচ্ছে...",
      unavailable: "লোকেশন পাওয়া যায়নি",
      distance: "কাবা শরিফ পর্যন্ত দূরত্ব",
      sensorStart: "কম্পাস চালু করুন",
      sensorReady: "কম্পাস চালু হয়েছে",
      sensorPermission: "কম্পাস ব্যবহারের অনুমতি দিন",
      sensorUnavailable: "এই ডিভাইসে কম্পাস সেন্সর পাওয়া যায়নি",
      sensorError: "কম্পাস সেন্সর চালু করা যায়নি",
      calibration: "ফোনটি আটের মতো করে কয়েকবার ঘোরান, তারপর আবার চেষ্টা করুন।",
      permissionError: "লোকেশন ব্যবহারের অনুমতি প্রয়োজন",
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
      km: "কিমি"
    },

    en: {
      locale: "en-IN",
      title: "Qibla Compass",
      location: "Current Location",
      loading: "Finding location...",
      unavailable: "Location unavailable",
      distance: "Distance to Kaaba",
      sensorStart: "Start Compass",
      sensorReady: "Compass activated",
      sensorPermission: "Allow compass access",
      sensorUnavailable: "Compass sensor unavailable",
      sensorError: "Could not start compass sensor",
      calibration: "Move your phone in a figure-eight motion and try again.",
      permissionError: "Location permission is required",
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
      km: "km"
    },

    hi: {
      locale: "hi-IN-u-nu-deva",
      title: "क़िबला कम्पास",
      location: "वर्तमान स्थान",
      loading: "लोकेशन खोजी जा रही है...",
      unavailable: "स्थान उपलब्ध नहीं",
      distance: "काबा तक की दूरी",
      sensorStart: "कम्पास चालू करें",
      sensorReady: "कम्पास चालू हो गया",
      sensorPermission: "कम्पास की अनुमति दें",
      sensorUnavailable: "इस डिवाइस में कम्पास सेंसर उपलब्ध नहीं है",
      sensorError: "कम्पास सेंसर चालू नहीं हो सका",
      calibration: "फ़ोन को आठ के आकार में कुछ बार घुमाएँ और फिर कोशिश करें।",
      permissionError: "लोकेशन की अनुमति आवश्यक है",
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
      km: "किमी"
    }
  };

  /* =========================================
     KAABA COORDINATES
  ========================================= */

  const KAABA = {
    latitude: 21.422487,
    longitude: 39.826206
  };

  const KOLKATA_FALLBACK = {
    latitude: 22.5726,
    longitude: 88.3639
  };

  /* =========================================
     STATE
  ========================================= */

  let language = "bn";

  let coordinates = null;
  let qiblaBearing = null;
  let heading = null;

  let locationRequestId = 0;
  let locationStatus = "loading";

  let sensorActive = false;
  let lastHeading = null;

  let locationTimer = null;
  let quoteIndex = 0;

  let quoteTimer = null;

  const directionElements = [];

  function t() {
    return LANG[language] || LANG.bn;
  }

  /* =========================================
     SETTINGS
  ========================================= */

  function readSettings() {
    try {
      return JSON.parse(
        localStorage.getItem("appSettings") || "{}"
      );
    } catch {
      return {};
    }
  }

  function getLanguage(settings) {
    const selected =
      settings.lang ||
      settings.language ||
      "bn";

    return LANG[selected] ? selected : "bn";
  }

  function getTheme(settings) {
    const raw =
      settings.themeColor ||
      settings.theme ||
      "classic";

    const themes = {
      green: "classic",
      classic: "classic",
      blue: "royal",
      royal: "royal",
      rose: "rose",
      champagne: "rose",
      pista: "pista",
      fresh: "pista"
    };

    return themes[raw] || "classic";
  }

  function applySettings() {
    const settings = readSettings();

    language = getLanguage(settings);

    const dark = Boolean(
      settings.dark ??
      settings.darkMode ??
      settings.isDarkMode ??
      false
    );

    document.documentElement.lang = language;

    document.body.dataset.themeColor =
      getTheme(settings);

    document.body.classList.toggle(
      "dark-mode",
      dark
    );

    updateLanguage();
  }

  /* =========================================
     LANGUAGE UPDATE
  ========================================= */

  function updateLanguage() {
    const strings = t();

    $("pageTitle").textContent = strings.title;
    $("locationLabel").textContent = strings.location;
    $("distanceLabel").textContent = strings.distance;

    $("sensorButton").textContent =
      sensorActive
        ? strings.sensorReady
        : strings.sensorStart;

    document.title =
      strings.title + " | IBADAT";

    document.querySelectorAll(
      ".direction-ring span"
    ).forEach((element, index) => {
      element.textContent =
        strings.directions[index];
    });

    updateLocationDisplay();
    updateDistanceDisplay();
    updateFooter();
  }

  /* =========================================
     NUMBER FORMAT
  ========================================= */

  function number(value, digits = 0) {
    return new Intl.NumberFormat(
      t().locale,
      {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits
      }
    ).format(value);
  }

  /* =========================================
     DISTANCE AND BEARING
  ========================================= */

  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  function normalize(degrees) {
    return (degrees % 360 + 360) % 360;
  }

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
    updateCompass();
  }

  /* =========================================
     DISTANCE DISPLAY
  ========================================= */

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

  /* =========================================
     LOCATION DISPLAY
  ========================================= */

  function updateLocationDisplay() {
    const element = $("locationName");

    if (locationStatus === "loading") {
      element.textContent = t().loading;
      return;
    }

    if (locationStatus !== "available") {
      element.textContent = t().unavailable;
      return;
    }

    const names = window.ibadatLocationNames || {};

    const selectedName =
      names[language] ||
      names.en ||
      names.bn ||
      names.hi;

    element.textContent =
      selectedName ||
      t().unavailable;
  }

  /* =========================================
     SHARED LOCATION
  ========================================= */

  function readSharedLocation() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("ibadatUserLocation") || "null"
      );

      if (
        saved &&
        Number.isFinite(Number(saved.lat)) &&
        Number.isFinite(Number(saved.lon))
      ) {
        return {
          latitude: Number(saved.lat),
          longitude: Number(saved.lon),
          updatedAt: saved.updatedAt || 0
        };
      }
    } catch (error) {
      console.warn("IBADAT: shared location read failed.", error);
    }

    return null;
  }

  /* =========================================
     REVERSE GEOCODING
  ========================================= */

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

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Location name unavailable.");
      }

      const data = await response.json();

      if (requestId !== locationRequestId) return;

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

      const names = {
        en: locality,
        bn: null,
        hi: null
      };

      if (address["name:bn"]) {
        names.bn = address["name:bn"];
      }

      if (address["name:hi"]) {
        names.hi = address["name:hi"];
      }

      const country = address.country || "";

      if (country && country !== locality) {
        names.en = locality + ", " + country;
      }

      if (!names.bn || !names.hi) {
        try {
          const transliteration = await Promise.all(
            ["bn", "hi"].map(async (lang) => {
              if (names[lang]) return names[lang];

              const inputUrl = new URL(
                "https://inputtools.google.com/request"
              );

              inputUrl.searchParams.set("text", locality);
              inputUrl.searchParams.set(
                "itc",
                lang === "bn"
                  ? "bn-t-i0-und"
                  : "hi-t-i0-und"
              );
              inputUrl.searchParams.set("num", "1");

              const resultResponse =
                await fetch(inputUrl.toString());

              const result = await resultResponse.json();

              return result?.[1]?.[0]?.[1]?.[0] || locality;
            })
          );

          names.bn = names.bn || transliteration[0];
          names.hi = names.hi || transliteration[1];

        } catch {
          names.bn = names.bn || locality;
          names.hi = names.hi || locality;
        }
      }

      if (requestId !== locationRequestId) return;

      window.ibadatLocationNames = names;

      locationStatus = "available";

      updateLocationDisplay();

    } catch (error) {
      if (requestId !== locationRequestId) return;

      console.warn(
        "IBADAT: reverse geocoding failed.",
        error
      );

      locationStatus = "unavailable";
      updateLocationDisplay();
    }
  }

  /* =========================================
     GPS
  ========================================= */

  function applyCoordinates(lat, lon, source = "gps") {
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

    if (source === "gps") {
      loadLocationName(lat, lon);
    } else {
      locationStatus = "unavailable";
      updateLocationDisplay();
    }
  }

  function loadGPS() {
    locationStatus = "loading";
    updateLocationDisplay();

    if (!navigator.geolocation) {
      const fallback = KOLKATA_FALLBACK;

      applyCoordinates(
        fallback.latitude,
        fallback.longitude,
        "fallback"
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        applyCoordinates(
          position.coords.latitude,
          position.coords.longitude,
          "gps"
        );

        try {
          localStorage.setItem(
            "ibadatUserLocation",
            JSON.stringify({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              updatedAt: Date.now(),
              source: "gps"
            })
          );
        } catch (error) {
          console.warn("IBADAT: location save failed.", error);
        }
      },

      (error) => {
        console.warn("IBADAT: GPS error.", error);

        const shared = readSharedLocation();

        if (
          shared &&
          Date.now() - shared.updatedAt < 24 * 60 * 60 * 1000
        ) {
          applyCoordinates(
            shared.latitude,
            shared.longitude,
            "cached"
          );

          return;
        }

        const fallback = KOLKATA_FALLBACK;

        applyCoordinates(
          fallback.latitude,
          fallback.longitude,
          "fallback"
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  }

  /* =========================================
     COMPASS TICKS
  ========================================= */

  function createCompassTicks() {
    const container = $("compassTicks");

    container.innerHTML = "";

    for (let i = 0; i < 64; i++) {
      const tick = document.createElement("i");

      tick.style.transform =
        `rotate(${i * 5.625}deg)`;

      if (i % 4 === 0) {
        tick.classList.add("major");
      }

      container.appendChild(tick);
    }
  }

  /* =========================================
     DIRECTION LABEL POSITIONS
  ========================================= */

  function positionDirections() {
    const labels = document.querySelectorAll(
      ".direction-ring span"
    );

    labels.forEach((element, index) => {
      const angle = index * 22.5;

      element.style.setProperty(
        "--angle",
        angle
      );
    });
  }

  /* =========================================
     COMPASS ROTATION
  ========================================= */

  function updateCompass() {
    if (heading === null) return;

    const rose = $("compassRose");

    /*
     * Direction ring rotates as one unit.
     * All 16 directions keep their fixed spacing.
     */
    rose.style.transform =
      `rotate(${-heading}deg)`;

    /*
     * Kaaba marker is positioned at the true
     * relative Qibla direction on the rotating ring.
     */
    if (qiblaBearing !== null) {
      $("qiblaMarker").style.setProperty(
        "--qibla-angle",
        `${qiblaBearing}deg`
      );
    }
  }

  /* =========================================
     HEADING SMOOTHING
  ========================================= */

  function smoothHeading(newHeading) {
    newHeading = normalize(newHeading);

    if (lastHeading === null) {
      lastHeading = newHeading;
      heading = newHeading;
      updateCompass();
      return;
    }

    let difference =
      ((newHeading - lastHeading + 540) % 360) - 180;

    const smoothed =
      normalize(lastHeading + difference * 0.22);

    lastHeading = smoothed;
    heading = smoothed;

    updateCompass();
  }

  /* =========================================
     DEVICE ORIENTATION
  ========================================= */

  function handleOrientation(event) {
    let compassHeading = null;

    /*
     * iOS Safari provides webkitCompassHeading.
     */
    if (
      Number.isFinite(event.webkitCompassHeading)
    ) {
      compassHeading =
        event.webkitCompassHeading;
    }

    /*
     * Absolute orientation fallback.
     */
    else if (
      event.absolute === true &&
      Number.isFinite(event.alpha)
    ) {
      compassHeading =
        360 - event.alpha;
    }

    if (compassHeading === null) {
      return;
    }

    smoothHeading(compassHeading);
  }

  /* =========================================
     SENSOR START
  ========================================= */

  async function startCompass() {
    const button = $("sensorButton");
    const message = $("sensorMessage");

    button.disabled = true;

    try {
      if (!("DeviceOrientationEvent" in window)) {
        throw new Error("unsupported");
      }

      /*
       * iOS permission must be requested
       * directly from a user interaction.
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

      window.addEventListener(
        "deviceorientationabsolute",
        handleOrientation,
        true
      );

      window.addEventListener(
        "deviceorientation",
        handleOrientation,
        true
      );

      sensorActive = true;

      button.textContent = t().sensorReady;

      message.textContent = t().calibration;

      setTimeout(() => {
        if (message.textContent === t().calibration) {
          message.textContent = "";
        }
      }, 6000);

    } catch (error) {
      console.warn("IBADAT: compass sensor error.", error);

      if (error.message === "unsupported") {
        message.textContent = t().sensorUnavailable;
      } else if (error.message === "permission") {
        message.textContent = t().sensorPermission;
      } else {
        message.textContent = t().sensorError;
      }

      sensorActive = false;

      button.textContent = t().sensorStart;

    } finally {
      button.disabled = false;
    }
  }

  /* =========================================
     FOOTER MARQUEE
  ========================================= */

  function updateFooter() {
    const first = $("footerMessage");
    const second = $("footerMessageClone");

    const messages = t().quotes;

    const text = messages.join("   •   ");

    first.textContent = text;
    second.textContent = text;
  }

  /* =========================================
     SETTINGS CHANGE
  ========================================= */

  window.addEventListener("storage", (event) => {
    if (!event.key || event.key === "appSettings") {
      applySettings();
    }
  });

  window.addEventListener("pageshow", () => {
    applySettings();
  });

  document.addEventListener(
    "visibilitychange",
    () => {
      if (!document.hidden) {
        applySettings();
      }
    }
  );

  /* =========================================
     INIT
  ========================================= */

  function init() {
    applySettings();

    createCompassTicks();
    positionDirections();

    $("sensorButton").addEventListener(
      "click",
      startCompass
    );

    /*
     * Prefer the Home Page's shared GPS coordinates
     * when they are recent. Otherwise request GPS.
     */
    const shared = readSharedLocation();

    if (
      shared &&
      Date.now() - shared.updatedAt < 24 * 60 * 60 * 1000
    ) {
      applyCoordinates(
        shared.latitude,
        shared.longitude,
        "gps"
      );
    } else {
      loadGPS();
    }

    /*
     * Refresh GPS when the page remains open.
     */
    locationTimer = window.setInterval(() => {
      if (!document.hidden) {
        loadGPS();
      }
    }, 10 * 60 * 1000);

    window.addEventListener("beforeunload", () => {
      window.clearInterval(locationTimer);

      if (quoteTimer) {
        window.clearTimeout(quoteTimer);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

})();
