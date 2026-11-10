/* =========================================================
   IBADAT - QIBLA COMPASS
   Main JavaScript: js/qibla.js
   ========================================================= */

(() => {
  "use strict";

  /* -------------------------------------------------------
     1. ELEMENTS
  ------------------------------------------------------- */

  const app = document.getElementById("qiblaApp");

  if (!app) return;

  const $ = (id) => document.getElementById(id);

  const elements = {
    pageTitle: $("pageTitle"),
    locationLabel: $("locationLabel"),
    locationName: $("locationName"),
    locationCoordinates: $("locationCoordinates"),
    refreshLocation: $("refreshLocation"),

    compassKicker: $("compassKicker"),
    compassHeading: $("compassHeading"),
    compassInstruction: $("compassInstruction"),
    compassTicks: $("compassTicks"),
    directionRing: $("directionRing"),
    degreeRing: $("degreeRing"),
    qiblaOrbit: $("qiblaOrbit"),

    bearingLabel: $("bearingLabel"),
    bearingValue: $("bearingValue"),
    headingLabel: $("headingLabel"),
    headingValue: $("headingValue"),
    compassStatus: $("compassStatus"),

    sensorTitle: $("sensorTitle"),
    sensorMessage: $("sensorMessage"),
    sensorButton: $("sensorButton"),
    sensorButtonText: $("sensorButtonText"),

    distanceLabel: $("distanceLabel"),
    distanceValue: $("distanceValue"),
    distanceUnit: $("distanceUnit"),
    distanceDestination: $("distanceDestination"),

    instructionTitle: $("instructionTitle"),
    instructionOne: $("instructionOne"),
    instructionTwo: $("instructionTwo"),
    instructionThree: $("instructionThree"),
    instructionFour: $("instructionFour"),

    footerMessage: $("footerMessage"),
    footerMessageClone: $("footerMessageClone"),
    footerTranslation: $("footerTranslation")
  };

  /* -------------------------------------------------------
     2. CONSTANTS
  ------------------------------------------------------- */

  const KAABA = {
    latitude: 21.422487,
    longitude: 39.826206
  };

  const KOLKATA_FALLBACK = {
    latitude: 22.5726,
    longitude: 88.3639
  };

  const SETTINGS_KEY = "appSettings";
  const LOCATION_KEY = "ibadatUserLocation";

  let currentLanguage = "bn";
  let currentTheme = "classic";
  let currentDarkMode = false;

  let userLocation = null;
  let qiblaBearing = null;
  let deviceHeading = null;

  let sensorActive = false;
  let sensorListenerAttached = false;
  let locationRequestId = 0;

  /* -------------------------------------------------------
     3. TRANSLATIONS
  ------------------------------------------------------- */

  const translations = {
    bn: {
      pageTitle: "কিবলা কম্পাস",
      locationLabel: "আপনার বর্তমান অবস্থান",
      locating: "অবস্থান খোঁজা হচ্ছে...",
      locationDenied: "অবস্থানের অনুমতি দেওয়া হয়নি",
      locationUnavailable: "অবস্থান পাওয়া যায়নি",
      locationError: "অবস্থান শনাক্ত করা সম্ভব হয়নি",
      approximateKolkata: "কলকাতা (আনুমানিক অবস্থান)",

      compassKicker: "QIBLA DIRECTION",
      compassHeading: "কিবলার দিক নির্ণয়",
      compassInstruction: "কিবলার সঠিক দিক জানতে ফোনটি সমতলভাবে ধরুন",

      bearingLabel: "কিবলার দিক",
      headingLabel: "ফোনের দিক",

      compassReady: "কম্পাস চালু করতে নিচের বাটনে চাপ দিন",
      compassActive: "কম্পাস চালু আছে। ফোনটি ধীরে ঘোরান।",
      compassUnsupported: "এই ডিভাইসে কম্পাস সেন্সর পাওয়া যায়নি।",
      compassPermission: "কম্পাস ব্যবহারের অনুমতি প্রয়োজন।",
      compassPermissionDenied: "কম্পাস সেন্সরের অনুমতি দেওয়া হয়নি।",
      compassCalibration: "কম্পাস Calibration প্রয়োজন হতে পারে। ফোনটি আটের মতো করে নাড়ান।",
      compassWaiting: "কম্পাসের দিক নির্ণয় করা হচ্ছে...",
      compassSecure: "কম্পাস চালাতে HTTPS বা নিরাপদ সংযোগ প্রয়োজন।",

      sensorTitle: "কম্পাস সেন্সর",
      sensorMessage: "দিক নির্ণয়ের জন্য সেন্সর চালু করুন",
      sensorButtonStart: "কম্পাস চালু করুন",
      sensorButtonStop: "কম্পাস বন্ধ করুন",
      sensorStarting: "সেন্সর চালু হচ্ছে...",

      distanceLabel: "কাবা শরিফ থেকে আপনার দূরত্ব",
      distanceUnit: "কিমি",
      distanceDestination: "মক্কা, সৌদি আরব",

      instructionTitle: "ব্যবহারের নির্দেশনা",
      instructionOne: "ফোনটি মাটির সমান্তরালে বা সমতলভাবে ধরুন।",
      instructionTwo: "কম্পাস সেন্সর চালু করার অনুমতি দিন।",
      instructionThree: "ধাতব বস্তু ও চুম্বক থেকে ফোন দূরে রাখুন।",
      instructionFour: "প্রয়োজনে ফোনটি আটের মতো করে কয়েকবার নাড়িয়ে Calibration করুন।",

      footerArabic: "فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ",
      footerTranslation: "সুতরাং আপনি মসজিদুল হারামের দিকে আপনার মুখ ফিরান।",

      directions: [
        "উত্তর", "উত্তর-পূর্ব", "পূর্ব", "দক্ষিণ-পূর্ব",
        "দক্ষিণ", "দক্ষিণ-পশ্চিম", "পশ্চিম", "উত্তর-পশ্চিম"
      ],

      shortDirections: [
        "উ", "উ-পূ", "পূ", "দ-পূ",
        "দ", "দ-প", "প", "উ-প"
      ],

      degreeNames: [
        "০°", "৪৫°", "৯০°", "১৩৫°",
        "১৮০°", "২২৫°", "২৭০°", "৩১৫°"
      ]
    },

    en: {
      pageTitle: "Qibla Compass",
      locationLabel: "Your Current Location",
      locating: "Finding your location...",
      locationDenied: "Location permission was denied",
      locationUnavailable: "Location is unavailable",
      locationError: "Unable to detect your location",
      approximateKolkata: "Kolkata (Approximate location)",

      compassKicker: "QIBLA DIRECTION",
      compassHeading: "Find the Qibla Direction",
      compassInstruction: "Keep your phone flat to find the Qibla direction",

      bearingLabel: "Qibla Bearing",
      headingLabel: "Phone Heading",

      compassReady: "Tap the button below to activate the compass",
      compassActive: "Compass is active. Rotate your phone slowly.",
      compassUnsupported: "Compass sensor is not available on this device.",
      compassPermission: "Compass permission is required.",
      compassPermissionDenied: "Compass sensor permission was denied.",
      compassCalibration: "Compass calibration may be needed. Move your phone in a figure-eight motion.",
      compassWaiting: "Detecting compass direction...",
      compassSecure: "A secure HTTPS connection is required for the compass.",

      sensorTitle: "Compass Sensor",
      sensorMessage: "Activate the sensor to find the direction",
      sensorButtonStart: "Start Compass",
      sensorButtonStop: "Stop Compass",
      sensorStarting: "Starting sensor...",

      distanceLabel: "Your Distance from the Holy Kaaba",
      distanceUnit: "km",
      distanceDestination: "Makkah, Saudi Arabia",

      instructionTitle: "How to Use",
      instructionOne: "Keep your phone flat and parallel to the ground.",
      instructionTwo: "Allow permission to activate the compass sensor.",
      instructionThree: "Keep your phone away from metal objects and magnets.",
      instructionFour: "If needed, calibrate by moving your phone in a figure-eight motion.",

      footerArabic: "فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ",
      footerTranslation: "So turn your face towards Al-Masjid Al-Haram.",

      directions: [
        "North", "North-East", "East", "South-East",
        "South", "South-West", "West", "North-West"
      ],

      shortDirections: [
        "N", "NE", "E", "SE", "S", "SW", "W", "NW"
      ],

      degreeNames: [
        "0°", "45°", "90°", "135°",
        "180°", "225°", "270°", "315°"
      ]
    },

    hi: {
      pageTitle: "क़िबला कम्पास",
      locationLabel: "आपका वर्तमान स्थान",
      locating: "आपका स्थान खोजा जा रहा है...",
      locationDenied: "स्थान की अनुमति नहीं दी गई",
      locationUnavailable: "स्थान उपलब्ध नहीं है",
      locationError: "आपका स्थान पता नहीं चल सका",
      approximateKolkata: "कोलकाता (अनुमानित स्थान)",

      compassKicker: "QIBLA DIRECTION",
      compassHeading: "क़िबला दिशा निर्धारित करें",
      compassInstruction: "क़िबला दिशा जानने के लिए फोन को समतल रखें",

      bearingLabel: "क़िबला दिशा",
      headingLabel: "फोन की दिशा",

      compassReady: "कम्पास चालू करने के लिए नीचे बटन दबाएँ",
      compassActive: "कम्पास चालू है। फोन को धीरे-धीरे घुमाएँ।",
      compassUnsupported: "इस डिवाइस में कम्पास सेंसर उपलब्ध नहीं है।",
      compassPermission: "कम्पास के लिए अनुमति आवश्यक है।",
      compassPermissionDenied: "कम्पास सेंसर की अनुमति नहीं दी गई।",
      compassCalibration: "कम्पास कैलिब्रेशन की आवश्यकता हो सकती है। फोन को आठ के आकार में घुमाएँ।",
      compassWaiting: "कम्पास दिशा का पता लगाया जा रहा है...",
      compassSecure: "कम्पास के लिए सुरक्षित HTTPS कनेक्शन आवश्यक है।",

      sensorTitle: "कम्पास सेंसर",
      sensorMessage: "दिशा जानने के लिए सेंसर चालू करें",
      sensorButtonStart: "कम्पास चालू करें",
      sensorButtonStop: "कम्पास बंद करें",
      sensorStarting: "सेंसर चालू हो रहा है...",

      distanceLabel: "पवित्र काबा से आपकी दूरी",
      distanceUnit: "किमी",
      distanceDestination: "मक्का, सऊदी अरब",

      instructionTitle: "उपयोग करने का तरीका",
      instructionOne: "फोन को जमीन के समानांतर और समतल रखें।",
      instructionTwo: "कम्पास सेंसर चालू करने की अनुमति दें।",
      instructionThree: "फोन को धातु की वस्तुओं और चुंबकों से दूर रखें।",
      instructionFour: "जरूरत पड़ने पर फोन को आठ के आकार में घुमाकर कैलिब्रेट करें।",

      footerArabic: "فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ",
      footerTranslation: "अतः अपना चेहरा मस्जिद अल-हराम की ओर फेरें।",

      directions: [
        "उत्तर", "उत्तर-पूर्व", "पूर्व", "दक्षिण-पूर्व",
        "दक्षिण", "दक्षिण-पश्चिम", "पश्चिम", "उत्तर-पश्चिम"
      ],

      shortDirections: [
        "उ", "उ-पू", "पू", "द-पू",
        "द", "द-प", "प", "उ-प"
      ],

      degreeNames: [
        "०°", "४५°", "९०°", "१३५°",
        "१८०°", "२२५°", "२७०°", "३१५°"
      ]
    }
  };

  /* -------------------------------------------------------
     4. LANGUAGE AND NUMBER FORMATTING
  ------------------------------------------------------- */

  function getLocale() {
    if (currentLanguage === "en") return "en-IN";
    if (currentLanguage === "hi") return "hi-IN-u-nu-deva";
    return "bn-BD";
  }

  function formatNumber(value, maximumFractionDigits = 0) {
    return new Intl.NumberFormat(getLocale(), {
      maximumFractionDigits
    }).format(value);
  }

  function formatDegree(value) {
    if (!Number.isFinite(value)) return "---°";
    return `${formatNumber(Math.round(normalizeAngle(value)))}°`;
  }

  function normalizeAngle(angle) {
    return ((angle % 360) + 360) % 360;
  }

  function setText(element, value) {
    if (element) element.textContent = value;
  }

  /* -------------------------------------------------------
     5. READ MAIN APP SETTINGS
  ------------------------------------------------------- */

  function readSettings() {
    let settings = {};

    try {
      settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (error) {
      console.warn("IBADAT settings could not be read:", error);
    }

    const language =
      settings.lang ||
      settings.language ||
      settings.appLanguage ||
      "bn";

    currentLanguage =
      ["bn", "en", "hi"].includes(String(language).toLowerCase())
        ? String(language).toLowerCase()
        : "bn";

    let theme =
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

    currentTheme = themeAliases[String(theme).toLowerCase()] || "classic";

    currentDarkMode = Boolean(
      settings.dark ??
      settings.darkMode ??
      settings.isDarkMode ??
      false
    );

    app.dataset.theme = currentTheme;
    app.dataset.mode = currentDarkMode ? "dark" : "light";

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = "ltr";

    applyTranslations();
    renderCompassLabels();
  }

  /* -------------------------------------------------------
     6. APPLY TRANSLATIONS
  ------------------------------------------------------- */

  function applyTranslations() {
    const t = translations[currentLanguage];

    setText(elements.pageTitle, t.pageTitle);
    setText(elements.locationLabel, t.locationLabel);

    setText(elements.compassKicker, t.compassKicker);
    setText(elements.compassHeading, t.compassHeading);
    setText(elements.compassInstruction, t.compassInstruction);

    setText(elements.bearingLabel, t.bearingLabel);
    setText(elements.headingLabel, t.headingLabel);

    setText(elements.sensorTitle, t.sensorTitle);

    setText(elements.distanceLabel, t.distanceLabel);
    setText(elements.distanceUnit, t.distanceUnit);
    setText(elements.distanceDestination, t.distanceDestination);

    setText(elements.instructionTitle, t.instructionTitle);
    setText(elements.instructionOne, t.instructionOne);
    setText(elements.instructionTwo, t.instructionTwo);
    setText(elements.instructionThree, t.instructionThree);
    setText(elements.instructionFour, t.instructionFour);

    setText(elements.footerMessage, t.footerArabic);
    setText(elements.footerMessageClone, t.footerArabic);
    setText(elements.footerTranslation, t.footerTranslation);

    updateSensorInterface();
    updateBearingDisplay();
    updateDistanceDisplay();
  }

  /* -------------------------------------------------------
     7. CREATE COMPASS TICKS
  ------------------------------------------------------- */

  function renderCompassTicks() {
    if (!elements.compassTicks) return;

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

    elements.compassTicks.replaceChildren(fragment);
  }

  /* -------------------------------------------------------
     8. CREATE DEGREE LABELS
  ------------------------------------------------------- */

  function renderDegreeLabels() {
    if (!elements.degreeRing) return;

    const fragment = document.createDocumentFragment();

    for (let degree = 0; degree < 360; degree += 45) {
      const label = document.createElement("span");

      label.className = "degree-label";
      label.textContent = formatNumber(degree) + "°";

      label.style.setProperty("--angle", `${degree}deg`);
      label.style.setProperty("--radius", "39%");

      fragment.appendChild(label);
    }

    elements.degreeRing.replaceChildren(fragment);
  }

  /* -------------------------------------------------------
     9. CREATE DIRECTION LABELS
  ------------------------------------------------------- */

  function renderDirectionLabels() {
    if (!elements.directionRing) return;

    const t = translations[currentLanguage];
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < 8; index++) {
      const label = document.createElement("span");

      label.className = "direction-label";

      if (index % 2 === 0) {
        label.classList.add("cardinal");
      }

      label.textContent = t.shortDirections[index];

      label.style.setProperty("--angle", `${index * 45}deg`);
      label.style.setProperty("--radius", "46%");

      label.title = t.directions[index];

      fragment.appendChild(label);
    }

    elements.directionRing.replaceChildren(fragment);
  }

  function renderCompassLabels() {
    renderCompassTicks();
    renderDegreeLabels();
    renderDirectionLabels();
  }

  /* -------------------------------------------------------
     10. QIBLA BEARING CALCULATION
  ------------------------------------------------------- */

  function calculateBearing(latitude, longitude) {
    const lat1 = latitude * Math.PI / 180;
    const lat2 = KAABA.latitude * Math.PI / 180;
    const deltaLongitude =
      (KAABA.longitude - longitude) * Math.PI / 180;

    const y = Math.sin(deltaLongitude) * Math.cos(lat2);

    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLongitude);

    const bearing = Math.atan2(y, x) * 180 / Math.PI;

    return normalizeAngle(bearing);
  }

  /* -------------------------------------------------------
     11. DISTANCE CALCULATION
  ------------------------------------------------------- */

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

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  }

  /* -------------------------------------------------------
     12. UPDATE LOCATION INFORMATION
  ------------------------------------------------------- */

  function updateLocationCalculations() {
    if (!userLocation) return;

    qiblaBearing = calculateBearing(
      userLocation.latitude,
      userLocation.longitude
    );

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude
    );

    setText(
      elements.distanceValue,
      formatNumber(distance, 1)
    );

    updateBearingDisplay();
    updateMarkerPosition();
  }

  function updateDistanceDisplay() {
    if (!userLocation) {
      setText(elements.distanceValue, "---");
      return;
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude
    );

    setText(elements.distanceValue, formatNumber(distance, 1));
  }

  function updateBearingDisplay() {
    setText(
      elements.bearingValue,
      qiblaBearing === null ? "---°" : formatDegree(qiblaBearing)
    );

    setText(
      elements.headingValue,
      deviceHeading === null ? "---°" : formatDegree(deviceHeading)
    );
  }

  /* -------------------------------------------------------
     13. UPDATE KAABA MARKER
  ------------------------------------------------------- */

  function updateMarkerPosition() {
    if (!elements.qiblaOrbit || qiblaBearing === null) return;

    const heading = deviceHeading === null ? 0 : deviceHeading;

    const relativeAngle = normalizeAngle(qiblaBearing - heading);

    elements.qiblaOrbit.style.setProperty(
      "--qibla-angle",
      `${relativeAngle}deg`
    );

    elements.qiblaOrbit.style.transform =
      `rotate(${relativeAngle}deg)`;
  }

  /* -------------------------------------------------------
     14. LOCATION NAME REVERSE GEOCODING
  ------------------------------------------------------- */

  async function getLocationName(latitude, longitude) {
    const t = translations[currentLanguage];

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

      if (!response.ok) throw new Error("Geocoding failed");

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

      if (place) {
        setText(elements.locationName, place);
      } else {
        setText(
          elements.locationName,
          `${formatNumber(latitude, 4)}, ${formatNumber(longitude, 4)}`
        );
      }
    } catch (error) {
      console.warn("Location name lookup failed:", error);

      setText(
        elements.locationName,
        `${formatNumber(latitude, 4)}, ${formatNumber(longitude, 4)}`
      );
    }
  }

  /* -------------------------------------------------------
     15. SAVE LOCATION
  ------------------------------------------------------- */

  function saveLocation(location) {
    try {
      localStorage.setItem(LOCATION_KEY, JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy || null,
        updatedAt: Date.now()
      }));
    } catch (error) {
      console.warn("Location could not be saved:", error);
    }
  }

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
      console.warn("Saved location could not be read:", error);
    }

    return null;
  }

  /* -------------------------------------------------------
     16. SET CURRENT LOCATION
  ------------------------------------------------------- */

  function setCurrentLocation(location, approximate = false) {
    userLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy || null,
      approximate
    };

    saveLocation(userLocation);

    if (elements.locationCoordinates) {
      const accuracyText = userLocation.accuracy
        ? ` · ±${formatNumber(userLocation.accuracy)} m`
        : "";

      setText(
        elements.locationCoordinates,
        `${formatNumber(location.latitude, 5)}, ` +
        `${formatNumber(location.longitude, 5)}${accuracyText}`
      );
    }

    if (approximate) {
      setText(
        elements.locationName,
        translations[currentLanguage].approximateKolkata
      );
    } else {
      setText(elements.locationName, translations[currentLanguage].locating);
      getLocationName(location.latitude, location.longitude);
    }

    updateLocationCalculations();
  }

  /* -------------------------------------------------------
     17. GET GPS LOCATION
  ------------------------------------------------------- */

  function requestLocation() {
    const requestId = ++locationRequestId;
    const t = translations[currentLanguage];

    setText(elements.locationName, t.locating);

    if (!navigator.geolocation) {
      setText(elements.locationName, t.locationUnavailable);
      useFallbackLocation();
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

        console.warn("GPS location error:", error);

        if (error.code === error.PERMISSION_DENIED) {
          setText(elements.locationName, t.locationDenied);
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setText(elements.locationName, t.locationUnavailable);
        } else {
          setText(elements.locationName, t.locationError);
        }

        const saved = readSavedLocation();

        if (saved) {
          setCurrentLocation(saved);
        } else {
          useFallbackLocation();
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  }

  function useFallbackLocation() {
    setCurrentLocation(KOLKATA_FALLBACK, true);
  }

  /* -------------------------------------------------------
     18. DEVICE COMPASS SENSOR
  ------------------------------------------------------- */

  function isSecureContextAvailable() {
    return window.isSecureContext ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";
  }

  function updateHeading(value) {
    if (!Number.isFinite(value)) return;

    deviceHeading = normalizeAngle(value);

    updateBearingDisplay();
    updateMarkerPosition();

    if (elements.compassStatus) {
      setText(
        elements.compassStatus,
        translations[currentLanguage].compassActive
      );
    }
  }

  function handleOrientation(event) {
    let heading = null;

    /*
      iOS Safari provides webkitCompassHeading.
      Android and other browsers usually provide alpha.
    */

    if (Number.isFinite(event.webkitCompassHeading)) {
      heading = event.webkitCompassHeading;
    } else if (Number.isFinite(event.alpha)) {
      heading = 360 - event.alpha;

      const screenAngle =
        Number(window.screen?.orientation?.angle) ||
        Number(window.orientation) ||
        0;

      heading += screenAngle;
    }

    if (heading === null || !Number.isFinite(heading)) return;

    updateHeading(heading);
  }

  function orientationPermissionRequired() {
    return typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function";
  }

  /* -------------------------------------------------------
     19. START COMPASS
  ------------------------------------------------------- */

  async function startCompass() {
    const t = translations[currentLanguage];

    if (!isSecureContextAvailable()) {
      setText(elements.sensorMessage, t.compassSecure);
      setText(elements.compassStatus, t.compassSecure);
      return;
    }

    if (!("DeviceOrientationEvent" in window)) {
      setText(elements.sensorMessage, t.compassUnsupported);
      setText(elements.compassStatus, t.compassUnsupported);
      return;
    }

    setText(elements.sensorMessage, t.sensorStarting);
    setText(elements.compassStatus, t.compassWaiting);

    try {
      if (orientationPermissionRequired()) {
        const permission =
          await DeviceOrientationEvent.requestPermission();

        if (permission !== "granted") {
          setText(elements.sensorMessage, t.compassPermissionDenied);
          setText(elements.compassStatus, t.compassPermissionDenied);
          return;
        }
      }

      if (!sensorListenerAttached) {
        window.addEventListener(
          "deviceorientation",
          handleOrientation,
          true
        );

        sensorListenerAttached = true;
      }

      sensorActive = true;
      updateSensorInterface();

      /*
        Some browsers do not send the event immediately.
        Wait briefly for the first valid heading.
      */

      setTimeout(() => {
        if (sensorActive && deviceHeading === null) {
          setText(
            elements.sensorMessage,
            t.compassCalibration
          );

          setText(
            elements.compassStatus,
            t.compassCalibration
          );
        }
      }, 4000);

    } catch (error) {
      console.error("Compass permission error:", error);

      setText(elements.sensorMessage, t.compassPermissionDenied);
      setText(elements.compassStatus, t.compassPermissionDenied);
    }
  }

  /* -------------------------------------------------------
     20. STOP COMPASS
  ------------------------------------------------------- */

  function stopCompass() {
    if (sensorListenerAttached) {
      window.removeEventListener(
        "deviceorientation",
        handleOrientation,
        true
      );

      sensorListenerAttached = false;
    }

    sensorActive = false;
    deviceHeading = null;

    updateSensorInterface();
    updateBearingDisplay();
    updateMarkerPosition();

    setText(
      elements.compassStatus,
      translations[currentLanguage].compassReady
    );
  }

  /* -------------------------------------------------------
     21. SENSOR INTERFACE
  ------------------------------------------------------- */

  function updateSensorInterface() {
    const t = translations[currentLanguage];

    if (sensorActive) {
      setText(elements.sensorButtonText, t.sensorButtonStop);
      setText(elements.sensorMessage, t.compassActive);
    } else {
      setText(elements.sensorButtonText, t.sensorButtonStart);

      if (
        elements.sensorMessage &&
        !elements.sensorMessage.textContent.includes("অনুমতি") &&
        !elements.sensorMessage.textContent.includes("permission") &&
        !elements.sensorMessage.textContent.includes("अनुमति")
      ) {
        setText(elements.sensorMessage, t.sensorMessage);
      }
    }

    if (elements.sensorButton) {
      elements.sensorButton.setAttribute(
        "aria-pressed",
        String(sensorActive)
      );
    }
  }

  /* -------------------------------------------------------
     22. BUTTON EVENTS
  ------------------------------------------------------- */

  if (elements.sensorButton) {
    elements.sensorButton.addEventListener("click", () => {
      if (sensorActive) {
        stopCompass();
      } else {
        startCompass();
      }
    });
  }

  if (elements.refreshLocation) {
    elements.refreshLocation.addEventListener("click", () => {
      requestLocation();
    });
  }

  /* -------------------------------------------------------
     23. SETTINGS CHANGE LISTENER
  ------------------------------------------------------- */

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      readSettings();
    }

    if (event.key === LOCATION_KEY) {
      const saved = readSavedLocation();

      if (saved) {
        setCurrentLocation(saved);
      }
    }
  });

  /*
    Same-tab settings changes do not trigger the storage event.
    The main IBADAT app can dispatch:
    window.dispatchEvent(new Event("ibadatSettingsChanged"));
  */

  window.addEventListener("ibadatSettingsChanged", () => {
    readSettings();
  });

  /* -------------------------------------------------------
     24. PAGE VISIBILITY
  ------------------------------------------------------- */

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && sensorActive) {
      stopCompass();
    }
  });

  /* -------------------------------------------------------
     25. INITIALIZE APP
  ------------------------------------------------------- */

  function initializeQibla() {
    readSettings();

    renderCompassTicks();
    renderDegreeLabels();
    renderDirectionLabels();

    const savedLocation = readSavedLocation();

    if (savedLocation) {
      setCurrentLocation(savedLocation);
    } else {
      setText(
        elements.locationName,
        translations[currentLanguage].locating
      );
    }

    requestLocation();

    updateSensorInterface();
    updateBearingDisplay();
  }

  initializeQibla();

})();
