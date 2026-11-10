(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const elements = {
    pageTitle: $("pageTitle"),
    locationLabel: $("locationLabel"),
    locationName: $("locationName"),
    compassShell: $("compassShell"),
    compassTicks: $("compassTicks"),
    directionRing: $("directionRing"),
    degreeRing: $("degreeRing"),
    qiblaOrbit: $("qiblaOrbit"),
    qiblaMarker: $("qiblaMarker"),
    bearingValue: $("bearingValue"),
    bearingDirection: $("bearingDirection"),
    distanceLabel: $("distanceLabel"),
    distanceValue: $("distanceValue"),
    sensorButton: $("sensorButton"),
    sensorButtonText: $("sensorButtonText"),
    sensorMessage: $("sensorMessage"),
    footerMessage: $("footerMessage"),
    footerMessageClone: $("footerMessageClone")
  };

  const translations = {
    bn: {
      title: "কিবলা কম্পাস",
      location: "আপনার অবস্থান",
      locating: "অবস্থান নির্ণয় করা হচ্ছে...",
      locationError: "অবস্থান পাওয়া যায়নি",
      fallbackLocation: "কলকাতা, পশ্চিমবঙ্গ (আনুমানিক)",
      distance: "মক্কার দূরত্ব",
      qibla: "কিবলার দিক",
      enable: "কম্পাস চালু করুন",
      enabled: "কম্পাস চালু আছে",
      unsupported: "আপনার ডিভাইসে কম্পাস সেন্সর সমর্থিত নয়।",
      permission: "কম্পাস ব্যবহারের অনুমতি দিন।",
      permissionDenied: "কম্পাস ব্যবহারের অনুমতি পাওয়া যায়নি।",
      sensorReady: "ফোনটি সমতলভাবে ধরে ধীরে ঘোরান।",
      sensorWaiting: "কম্পাস সেন্সরের তথ্যের অপেক্ষায়...",
      sensorActive: "কম্পাস সক্রিয়। কিবলার দিক অনুসরণ করুন।",
      sensorError: "কম্পাস চালু করা যায়নি।",
      footer: "সঠিক কিবলার দিক জানতে কম্পাস ব্যবহার করুন।",
      north: "উত্তর",
      northEast: "উত্তর-পূর্ব",
      east: "পূর্ব",
      southEast: "দক্ষিণ-পূর্ব",
      south: "দক্ষিণ",
      southWest: "দক্ষিণ-পশ্চিম",
      west: "পশ্চিম",
      northWest: "উত্তর-পশ্চিম",
      km: "কিমি",
      thousand: "হাজার",
      degrees: "°"
    },

    en: {
      title: "Qibla Compass",
      location: "Your Location",
      locating: "Finding your location...",
      locationError: "Location unavailable",
      fallbackLocation: "Kolkata, West Bengal (approx.)",
      distance: "Distance to Makkah",
      qibla: "Qibla Direction",
      enable: "Enable Compass",
      enabled: "Compass is active",
      unsupported: "Your device does not support compass sensors.",
      permission: "Please allow compass access.",
      permissionDenied: "Compass permission was denied.",
      sensorReady: "Keep your phone flat and rotate it slowly.",
      sensorWaiting: "Waiting for compass sensor...",
      sensorActive: "Compass active. Follow the Qibla direction.",
      sensorError: "Unable to start the compass.",
      footer: "Use the compass to find the correct Qibla direction.",
      north: "North",
      northEast: "NE",
      east: "East",
      southEast: "SE",
      south: "South",
      southWest: "SW",
      west: "West",
      northWest: "NW",
      km: "km",
      thousand: "thousand",
      degrees: "°"
    },

    hi: {
      title: "क़िबला कंपास",
      location: "आपका स्थान",
      locating: "स्थान खोजा जा रहा है...",
      locationError: "स्थान उपलब्ध नहीं है",
      fallbackLocation: "कोलकाता, पश्चिम बंगाल (अनुमानित)",
      distance: "मक्का की दूरी",
      qibla: "क़िबला दिशा",
      enable: "कंपास चालू करें",
      enabled: "कंपास चालू है",
      unsupported: "आपका डिवाइस कंपास सेंसर का समर्थन नहीं करता।",
      permission: "कृपया कंपास की अनुमति दें।",
      permissionDenied: "कंपास की अनुमति नहीं मिली।",
      sensorReady: "फोन को समतल रखकर धीरे-धीरे घुमाएँ।",
      sensorWaiting: "कंपास सेंसर की प्रतीक्षा हो रही है...",
      sensorActive: "कंपास सक्रिय है। क़िबला दिशा का पालन करें।",
      sensorError: "कंपास चालू नहीं हो सका।",
      footer: "सही क़िबला दिशा जानने के लिए कंपास का उपयोग करें।",
      north: "उत्तर",
      northEast: "उत्तर-पूर्व",
      east: "पूर्व",
      southEast: "दक्षिण-पूर्व",
      south: "दक्षिण",
      southWest: "दक्षिण-पश्चिम",
      west: "पश्चिम",
      northWest: "उत्तर-पश्चिम",
      km: "किमी",
      thousand: "हज़ार",
      degrees: "°"
    }
  };

  const directionKeys = [
    "north",
    "northEast",
    "east",
    "southEast",
    "south",
    "southWest",
    "west",
    "northWest"
  ];

  const degreeValues = [0, 45, 90, 135, 180, 225, 270, 315];

  const MAKKAH = {
    latitude: 21.4225,
    longitude: 39.8262
  };

  const KOLKATA = {
    latitude: 22.5726,
    longitude: 88.3639
  };

  let currentLanguage = "bn";
  let userLatitude = KOLKATA.latitude;
  let userLongitude = KOLKATA.longitude;
  let currentBearing = 0;
  let currentHeading = 0;
  let sensorStarted = false;
  let locationIsApproximate = true;

  let sensorEventName = null;

  /* ------------------------------
     Shared app settings
  ------------------------------ */

  function readSettings() {
    try {
      const raw = localStorage.getItem("appSettings");
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.warn("IBADAT settings could not be read:", error);
      return {};
    }
  }

  function getLanguage(settings) {
    const raw = String(
      settings.lang ||
      settings.language ||
      "bn"
    ).toLowerCase();

    if (raw.startsWith("en")) return "en";
    if (raw.startsWith("hi")) return "hi";
    return "bn";
  }

  function getTheme(settings) {
    const raw = String(
      settings.themeColor ||
      settings.theme ||
      "classic"
    ).toLowerCase();

    const aliases = {
      green: "classic",
      classic: "classic",
      blue: "royal",
      royal: "royal",
      champagne: "rose",
      rose: "rose",
      fresh: "pista",
      pista: "pista"
    };

    return aliases[raw] || "classic";
  }

  function getDarkMode(settings) {
    return (
      settings.dark === true ||
      settings.darkMode === true ||
      settings.isDarkMode === true ||
      settings.appearance === "dark"
    );
  }

  function applySettings() {
    const settings = readSettings();

    currentLanguage = getLanguage(settings);

    document.documentElement.lang = currentLanguage;
    document.body.classList.remove(
      "theme-classic",
      "theme-royal",
      "theme-rose",
      "theme-pista",
      "dark-mode"
    );

    document.body.classList.add(
      "theme-" + getTheme(settings)
    );

    if (getDarkMode(settings)) {
      document.body.classList.add("dark-mode");
    }

    updateLanguage();
  }

  function t(key) {
    return translations[currentLanguage][key] ||
      translations.bn[key] ||
      key;
  }

  /* ------------------------------
     Number formatting
  ------------------------------ */

  function formatNumber(value, maximumFractionDigits = 0) {
    const locales = {
      bn: "bn-BD",
      en: "en-IN",
      hi: "hi-IN-u-nu-deva"
    };

    return new Intl.NumberFormat(
      locales[currentLanguage],
      {
        maximumFractionDigits
      }
    ).format(value);
  }

  /* ------------------------------
     Language update
  ------------------------------ */

  function updateLanguage() {
    if (elements.pageTitle) {
      elements.pageTitle.textContent = t("title");
    }

    if (elements.locationLabel) {
      elements.locationLabel.textContent = t("location");
    }

    if (elements.distanceLabel) {
      elements.distanceLabel.textContent = t("distance");
    }

    if (elements.bearingDirection) {
      elements.bearingDirection.textContent = t("qibla");
    }

    if (elements.sensorButtonText) {
      elements.sensorButtonText.textContent =
        sensorStarted ? t("enabled") : t("enable");
    }

    if (elements.sensorMessage) {
      elements.sensorMessage.textContent =
        sensorStarted ? t("sensorActive") : t("sensorReady");
    }

    if (elements.footerMessage) {
      elements.footerMessage.textContent = t("footer");
    }

    if (elements.footerMessageClone) {
      elements.footerMessageClone.textContent = t("footer");
    }

    updateDirectionLabels();
    updateDegreeLabels();
    updateBearingDisplay();
    updateDistanceDisplay();
  }

  function updateDirectionLabels() {
    if (!elements.directionRing) return;

    const labels = elements.directionRing.querySelectorAll("span");

    labels.forEach((label, index) => {
      label.textContent = t(directionKeys[index]);
    });
  }

  function updateDegreeLabels() {
    if (!elements.degreeRing) return;

    const labels = elements.degreeRing.querySelectorAll("span");

    labels.forEach((label, index) => {
      label.textContent =
        formatNumber(degreeValues[index]) + t("degrees");
    });
  }

  /* ------------------------------
     Compass tick marks
     All ticks stay inside the compass face.
  ------------------------------ */

  function createCompassTicks() {
    if (!elements.compassTicks) return;

    elements.compassTicks.replaceChildren();

    const fragment = document.createDocumentFragment();

    for (let degree = 0; degree < 360; degree += 5) {
      const tick = document.createElement("i");

      if (degree % 45 === 0) {
        tick.classList.add("major");
      }

      tick.style.transform = `rotate(${degree}deg)`;
      fragment.appendChild(tick);
    }

    elements.compassTicks.appendChild(fragment);
  }

  /* ------------------------------
     Qibla calculation
  ------------------------------ */

  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  function normalizeAngle(angle) {
    return ((angle % 360) + 360) % 360;
  }

  function calculateQiblaBearing(latitude, longitude) {
    const lat1 = toRadians(latitude);
    const lat2 = toRadians(MAKKAH.latitude);
    const deltaLongitude = toRadians(
      MAKKAH.longitude - longitude
    );

    const y = Math.sin(deltaLongitude) * Math.cos(lat2);

    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) *
      Math.cos(deltaLongitude);

    return normalizeAngle(toDegrees(Math.atan2(y, x)));
  }

  function calculateDistance(latitude, longitude) {
    const earthRadius = 6371;

    const lat1 = toRadians(latitude);
    const lat2 = toRadians(MAKKAH.latitude);

    const deltaLat = toRadians(
      MAKKAH.latitude - latitude
    );

    const deltaLon = toRadians(
      MAKKAH.longitude - longitude
    );

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

    return earthRadius * c;
  }

  function updateBearingDisplay() {
    if (!elements.bearingValue) return;

    elements.bearingValue.textContent =
      formatNumber(Math.round(currentBearing)) + t("degrees");
  }

  function updateDistanceDisplay() {
    if (!elements.distanceValue) return;

    const distance = calculateDistance(
      userLatitude,
      userLongitude
    );

    elements.distanceValue.textContent =
      formatNumber(distance, 1) + " " + t("km");
  }

  function updateQibla() {
    currentBearing = calculateQiblaBearing(
      userLatitude,
      userLongitude
    );

    updateBearingDisplay();
    updateDistanceDisplay();
    updateCompassRotation();
  }

  /* ------------------------------
     Compass movement
  ------------------------------ */

  function updateCompassRotation() {
    const heading = normalizeAngle(currentHeading);

    /*
      The compass dial follows the device heading.
      The Qibla marker rotates to the calculated bearing.
      The marker itself is counter-rotated so the Kaaba
      image remains upright.
    */

    if (elements.compassShell) {
      elements.compassShell.style.transform =
        `rotate(${-heading}deg)`;
    }

    if (elements.qiblaOrbit) {
      elements.qiblaOrbit.style.transform =
        `rotate(${currentBearing}deg)`;
    }

    if (elements.qiblaMarker) {
      elements.qiblaMarker.style.transform =
        `translateX(-50%) rotate(${-currentBearing}deg)`;
    }
  }

  /* ------------------------------
     Location
  ------------------------------ */

  function updateLocationText(text) {
    if (!elements.locationName) return;
    elements.locationName.textContent = text;
  }

  function useFallbackLocation() {
    userLatitude = KOLKATA.latitude;
    userLongitude = KOLKATA.longitude;
    locationIsApproximate = true;

    updateLocationText(t("fallbackLocation"));
    updateQibla();
  }

  function loadSavedLocation() {
    try {
      const saved = localStorage.getItem("ibadatUserLocation");

      if (!saved) return false;

      const location = JSON.parse(saved);

      const latitude = Number(
        location.latitude ?? location.lat
      );

      const longitude = Number(
        location.longitude ?? location.lng ?? location.lon
      );

      if (
        Number.isFinite(latitude) &&
        Number.isFinite(longitude) &&
        Math.abs(latitude) <= 90 &&
        Math.abs(longitude) <= 180
      ) {
        userLatitude = latitude;
        userLongitude = longitude;
        locationIsApproximate = false;

        updateLocationText(
          location.name ||
          location.city ||
          t("location")
        );

        updateQibla();
        return true;
      }
    } catch (error) {
      console.warn("Saved location could not be read:", error);
    }

    return false;
  }

  async function reverseGeocode(latitude, longitude) {
    const url =
      "https://nominatim.openstreetmap.org/reverse" +
      `?format=jsonv2&lat=${latitude}&lon=${longitude}` +
      "&zoom=10&addressdetails=1";

    try {
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Geocoding request failed");
      }

      const data = await response.json();
      const address = data.address || {};

      const place =
        address.city ||
        address.town ||
        address.village ||
        address.suburb ||
        address.county ||
        address.state ||
        t("location");

      updateLocationText(place);

      return place;
    } catch (error) {
      console.warn("Reverse geocoding failed:", error);
      updateLocationText(t("location"));
      return null;
    }
  }

  function requestLocation() {
    if (!navigator.geolocation) {
      useFallbackLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
        locationIsApproximate = false;

        updateLocationText(t("location"));
        updateQibla();

        await reverseGeocode(
          userLatitude,
          userLongitude
        );

        try {
          localStorage.setItem(
            "ibadatUserLocation",
            JSON.stringify({
              latitude: userLatitude,
              longitude: userLongitude
            })
          );
        } catch (error) {
          console.warn("Location could not be saved:", error);
        }
      },

      (error) => {
        console.warn("Location error:", error);
        useFallbackLocation();
      },

      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 300000
      }
    );
  }

  /* ------------------------------
     Device orientation sensor
  ------------------------------ */

  function getHeadingFromEvent(event) {
    if (
      typeof event.webkitCompassHeading === "number" &&
      Number.isFinite(event.webkitCompassHeading)
    ) {
      return normalizeAngle(event.webkitCompassHeading);
    }

    if (
      typeof event.alpha === "number" &&
      Number.isFinite(event.alpha)
    ) {
      return normalizeAngle(360 - event.alpha);
    }

    return null;
  }

  function handleOrientation(event) {
    const heading = getHeadingFromEvent(event);

    if (heading === null) return;

    currentHeading = heading;
    updateCompassRotation();

    if (elements.sensorMessage && sensorStarted) {
      elements.sensorMessage.textContent = t("sensorActive");
    }
  }

  function handleOrientationError(error) {
    console.warn("Orientation sensor error:", error);

    if (elements.sensorMessage) {
      elements.sensorMessage.textContent = t("sensorError");
    }
  }

  async function startCompass() {
    if (sensorStarted) return;

    if (!("DeviceOrientationEvent" in window)) {
      elements.sensorMessage.textContent = t("unsupported");
      return;
    }

    try {
      if (
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        const permission =
          await DeviceOrientationEvent.requestPermission();

        if (permission !== "granted") {
          elements.sensorMessage.textContent =
            t("permissionDenied");
          return;
        }
      }

      sensorEventName = "deviceorientationabsolute";

      window.addEventListener(
        sensorEventName,
        handleOrientation,
        true
      );

      window.addEventListener(
        "deviceorientation",
        handleOrientation,
        true
      );

      sensorStarted = true;

      elements.sensorButtonText.textContent = t("enabled");
      elements.sensorButton.disabled = false;
      elements.sensorMessage.textContent = t("sensorWaiting");

    } catch (error) {
      handleOrientationError(error);
      elements.sensorMessage.textContent = t("sensorError");
    }
  }

  function stopCompass() {
    if (!sensorStarted) return;

    if (sensorEventName) {
      window.removeEventListener(
        sensorEventName,
        handleOrientation,
        true
      );
    }

    window.removeEventListener(
      "deviceorientation",
      handleOrientation,
      true
    );

    sensorStarted = false;
    currentHeading = 0;

    updateCompassRotation();

    elements.sensorButtonText.textContent = t("enable");
    elements.sensorMessage.textContent = t("sensorReady");
  }

  /* ------------------------------
     Settings change detection
  ------------------------------ */

  window.addEventListener("storage", (event) => {
    if (event.key === "appSettings") {
      applySettings();
    }

    if (event.key === "ibadatUserLocation") {
      if (loadSavedLocation()) {
        updateQibla();
      }
    }
  });

  window.addEventListener("pageshow", () => {
    applySettings();
  });

  /* ------------------------------
     Initialize
  ------------------------------ */

  function initialize() {
    applySettings();

    createCompassTicks();

    updateLocationText(t("locating"));

    if (!loadSavedLocation()) {
      useFallbackLocation();
      requestLocation();
    }

    updateQibla();

    if (elements.sensorButton) {
      elements.sensorButton.addEventListener("click", () => {
        if (sensorStarted) {
          stopCompass();
        } else {
          startCompass();
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }

})();
