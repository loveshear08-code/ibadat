"use strict";

/* =========================================================
   IBADAT — QIBLA PAGE
   File: js/qibla.js

   Features:
   - Uses Home Page saved location
   - No new geolocation request
   - No default Kolkata location
   - Qibla direction calculation
   - Distance to Kaaba
   - Device compass support
   - iOS compass permission support
   - Bengali / English / Hindi
   - Safe DOM handling
========================================================= */

(() => {
    const KAABA = {
        lat: 21.422487,
        lon: 39.826206
    };

    const STORAGE = {
        location: "ibadatUserLocation",
        city: "ibadatCityName",
        settings: "appSettings",
        alternateSettings: "ibadatSettings",
        language: "ibadatLanguage"
    };

    const elements = {};
    let userLocation = null;
    let qiblaBearing = null;
    let compassHeading = null;
    let sensorStarted = false;
    let currentLanguage = "bn";

    const translations = {
        bn: {
            pageTitle: "কিবলা কম্পাস",
            location: "আপনার বর্তমান লোকেশন",
            coordinates: "স্থানাঙ্ক",
            bearing: "কিবলার দিক",
            distance: "কাবা শরীফের দূরত্ব",
            direction: "কিবলার দিক নির্ণয়",
            sensorReady: "কম্পাস চালু করুন",
            sensorActive: "কম্পাস চালু আছে",
            sensorUnavailable: "এই ডিভাইসে কম্পাস সেন্সর পাওয়া যায়নি।",
            sensorPermission: "কম্পাস ব্যবহারের অনুমতি দিন।",
            sensorDenied: "কম্পাস ব্যবহারের অনুমতি পাওয়া যায়নি।",
            sensorError: "কম্পাস চালু করা যায়নি।",
            locationMissing: "Home Page-এ সংরক্ষিত লোকেশন পাওয়া যায়নি।",
            locationInvalid: "Home Page-এর সংরক্ষিত লোকেশন সঠিক নয়।",
            waiting: "কম্পাসের দিক নির্ণয় করা হচ্ছে...",
            north: "উত্তর",
            south: "দক্ষিণ",
            east: "পূর্ব",
            west: "পশ্চিম",
            back: "ফিরে যান",
            turnPhone: "ফোনটি সমতলভাবে রাখুন এবং ধীরে ধীরে ঘোরান।",
            aligned: "আপনি কিবলার দিকে মুখ করে আছেন।",
            notAligned: "কিবলার দিকে ঘোরান।",
            accuracy: "কম্পাসের নির্ভুলতা ডিভাইসের সেন্সরের উপর নির্ভরশীল।",
            degrees: "ডিগ্রি",
            km: "কিলোমিটার",
            meter: "মিটার"
        },

        en: {
            pageTitle: "Qibla Compass",
            location: "Your Current Location",
            coordinates: "Coordinates",
            bearing: "Qibla Bearing",
            distance: "Distance to Kaaba",
            direction: "Qibla Direction",
            sensorReady: "Start Compass",
            sensorActive: "Compass is active",
            sensorUnavailable: "Compass sensor is not available on this device.",
            sensorPermission: "Please allow compass access.",
            sensorDenied: "Compass permission was denied.",
            sensorError: "Unable to start compass.",
            locationMissing: "Saved Home Page location was not found.",
            locationInvalid: "The saved Home Page location is invalid.",
            waiting: "Detecting compass direction...",
            north: "North",
            south: "South",
            east: "East",
            west: "West",
            back: "Go Back",
            turnPhone: "Keep your phone flat and rotate it slowly.",
            aligned: "You are facing the Qibla direction.",
            notAligned: "Turn towards the Qibla.",
            accuracy: "Compass accuracy depends on your device sensor.",
            degrees: "Degrees",
            km: "Kilometres",
            meter: "Metres"
        },

        hi: {
            pageTitle: "क़िबला कम्पास",
            location: "आपका वर्तमान स्थान",
            coordinates: "निर्देशांक",
            bearing: "क़िबला दिशा",
            distance: "काबा शरीफ की दूरी",
            direction: "क़िबला दिशा निर्धारण",
            sensorReady: "कम्पास चालू करें",
            sensorActive: "कम्पास चालू है",
            sensorUnavailable: "इस डिवाइस में कम्पास सेंसर उपलब्ध नहीं है।",
            sensorPermission: "कृपया कम्पास की अनुमति दें।",
            sensorDenied: "कम्पास की अनुमति नहीं मिली।",
            sensorError: "कम्पास चालू नहीं हो सका।",
            locationMissing: "Home Page में सेव किया गया स्थान नहीं मिला।",
            locationInvalid: "Home Page में सेव किया गया स्थान सही नहीं है।",
            waiting: "कम्पास की दिशा निर्धारित की जा रही है...",
            north: "उत्तर",
            south: "दक्षिण",
            east: "पूर्व",
            west: "पश्चिम",
            back: "वापस जाएं",
            turnPhone: "फोन को समतल रखें और धीरे-धीरे घुमाएं।",
            aligned: "आप क़िबला दिशा की ओर हैं।",
            notAligned: "क़िबला दिशा की ओर घूमें।",
            accuracy: "कम्पास की सटीकता डिवाइस सेंसर पर निर्भर करती है।",
            degrees: "डिग्री",
            km: "किलोमीटर",
            meter: "मीटर"
        }
    };

    /* -----------------------------------------------------
       DOM ELEMENTS
    ----------------------------------------------------- */

    function getElements() {
        const ids = [
            "qiblaBack",
            "languageButton",
            "locationName",
            "locationCoordinates",
            "locationStatusText",
            "compassNeedle",
            "compassDegree",
            "qiblaBearing",
            "qiblaDistance",
            "sensorIcon",
            "sensorTitle",
            "sensorMessage",
            "sensorButton",
            "qiblaPageTitle",
            "qiblaLocationLabel",
            "qiblaCoordinatesLabel",
            "qiblaBearingLabel",
            "qiblaDistanceLabel",
            "qiblaDirectionLabel",
            "qiblaAccuracy",
            "qiblaAlignmentMessage",
            "compassNorth",
            "compassSouth",
            "compassEast",
            "compassWest"
        ];

        ids.forEach(id => {
            elements[id] = document.getElementById(id);
        });
    }

    function setText(id, value) {
        if (elements[id]) {
            elements[id].textContent = value;
        }
    }

    function getText(key) {
        return translations[currentLanguage]?.[key] ||
            translations.bn[key] ||
            key;
    }

    /* -----------------------------------------------------
       LANGUAGE
    ----------------------------------------------------- */

    function detectLanguage() {
        try {
            const savedLanguage = localStorage.getItem(
                STORAGE.language
            );

            if (savedLanguage &&
                ["bn", "en", "hi"].includes(savedLanguage)) {
                return savedLanguage;
            }

            const settingsText =
                localStorage.getItem(STORAGE.settings) ||
                localStorage.getItem(STORAGE.alternateSettings);

            if (settingsText) {
                const settings = JSON.parse(settingsText);

                const language =
                    settings.language ||
                    settings.lang ||
                    settings.selectedLanguage;

                if (["bn", "en", "hi"].includes(language)) {
                    return language;
                }
            }
        } catch (error) {
            console.warn("IBADAT language settings:", error);
        }

        return "bn";
    }

    function applyLanguage() {
        const t = translations[currentLanguage];

        document.documentElement.lang = currentLanguage;

        setText("qiblaPageTitle", t.pageTitle);
        setText("qiblaLocationLabel", t.location);
        setText("qiblaCoordinatesLabel", t.coordinates);
        setText("qiblaBearingLabel", t.bearing);
        setText("qiblaDistanceLabel", t.distance);
        setText("qiblaDirectionLabel", t.direction);
        setText("qiblaAccuracy", t.accuracy);

        setText("compassNorth", t.north);
        setText("compassSouth", t.south);
        setText("compassEast", t.east);
        setText("compassWest", t.west);

        setText("qiblaBack", t.back);

        if (elements.sensorButton) {
            elements.sensorButton.textContent =
                sensorStarted ? t.sensorActive : t.sensorReady;
        }

        if (!userLocation) {
            setText("locationName", t.locationMissing);
            setText("locationStatusText", t.locationMissing);
        }

        updateAlignmentMessage();
    }

    function changeLanguage() {
        const languages = ["bn", "en", "hi"];
        const currentIndex = languages.indexOf(currentLanguage);

        currentLanguage =
            languages[(currentIndex + 1) % languages.length];

        try {
            localStorage.setItem(
                STORAGE.language,
                currentLanguage
            );
        } catch (error) {
            console.warn(error);
        }

        applyLanguage();
    }

    /* -----------------------------------------------------
       HOME PAGE LOCATION
    ----------------------------------------------------- */

    function readSavedLocation() {
        try {
            const raw = localStorage.getItem(STORAGE.location);

            if (!raw) {
                return null;
            }

            const saved = JSON.parse(raw);

            if (!saved || typeof saved !== "object") {
                return null;
            }

            const lat = Number(saved.lat);
            const lon = Number(
                saved.lon !== undefined ? saved.lon : saved.lng
            );

            if (
                !Number.isFinite(lat) ||
                !Number.isFinite(lon) ||
                lat < -90 ||
                lat > 90 ||
                lon < -180 ||
                lon > 180
            ) {
                return null;
            }

            return {
                lat,
                lon,
                city: getSavedCity(saved)
            };
        } catch (error) {
            console.error("IBADAT location error:", error);
            return null;
        }
    }

    function getSavedCity(saved) {
        try {
            const city = localStorage.getItem(STORAGE.city);

            if (city && city.trim()) {
                return city.trim();
            }

            if (saved.city) return saved.city;
            if (saved.cityName) return saved.cityName;
            if (saved.name) return saved.name;

            return "Home Page Location";
        } catch (error) {
            return "Home Page Location";
        }
    }

    function displayLocation() {
        if (!userLocation) {
            setText("locationName", getText("locationMissing"));
            setText("locationCoordinates", "--");
            setText("locationStatusText", getText("locationMissing"));
            return;
        }

        setText("locationName", userLocation.city);

        setText(
            "locationCoordinates",
            `${userLocation.lat.toFixed(6)}, ${userLocation.lon.toFixed(6)}`
        );

        setText("locationStatusText", userLocation.city);
    }

    /* -----------------------------------------------------
       QIBLA CALCULATIONS
    ----------------------------------------------------- */

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    function toDegrees(radians) {
        return radians * 180 / Math.PI;
    }

    function normalizeDegrees(degrees) {
        return ((degrees % 360) + 360) % 360;
    }

    function calculateQiblaBearing(lat, lon) {
        const userLat = toRadians(lat);
        const kaabaLat = toRadians(KAABA.lat);
        const deltaLon = toRadians(KAABA.lon - lon);

        const y = Math.sin(deltaLon) * Math.cos(kaabaLat);

        const x =
            Math.cos(userLat) * Math.sin(kaabaLat) -
            Math.sin(userLat) * Math.cos(kaabaLat) *
            Math.cos(deltaLon);

        return normalizeDegrees(
            toDegrees(Math.atan2(y, x))
        );
    }

    function calculateDistance(lat, lon) {
        const earthRadius = 6371;

        const lat1 = toRadians(lat);
        const lat2 = toRadians(KAABA.lat);

        const deltaLat = toRadians(KAABA.lat - lat);
        const deltaLon = toRadians(KAABA.lon - lon);

        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) ** 2;

        const c = 2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

        return earthRadius * c;
    }

    function displayQiblaInformation() {
        if (!userLocation) return;

        qiblaBearing = calculateQiblaBearing(
            userLocation.lat,
            userLocation.lon
        );

        const distance = calculateDistance(
            userLocation.lat,
            userLocation.lon
        );

        setText(
            "qiblaBearing",
            `${qiblaBearing.toFixed(2)}°`
        );

        setText(
            "compassDegree",
            `${qiblaBearing.toFixed(1)}°`
        );

        setText(
            "qiblaDistance",
            distance >= 1
                ? `${distance.toFixed(1)} ${getText("km")}`
                : `${Math.round(distance * 1000)} ${getText("meter")}`
        );

        if (elements.compassNeedle) {
            elements.compassNeedle.style.transform =
                `rotate(${qiblaBearing}deg)`;
        }
    }

    /* -----------------------------------------------------
       COMPASS SENSOR
    ----------------------------------------------------- */

    function updateCompassHeading(heading) {
        if (!Number.isFinite(heading)) return;

        compassHeading = normalizeDegrees(heading);

        const relativeAngle = normalizeDegrees(
            qiblaBearing - compassHeading
        );

        if (elements.compassNeedle) {
            elements.compassNeedle.style.transform =
                `rotate(${relativeAngle}deg)`;
        }

        setText(
            "compassDegree",
            `${compassHeading.toFixed(1)}°`
        );

        updateAlignmentMessage(relativeAngle);
    }

    function updateAlignmentMessage(relativeAngle) {
        if (!elements.qiblaAlignmentMessage) return;

        if (
            !sensorStarted ||
            !Number.isFinite(relativeAngle)
        ) {
            elements.qiblaAlignmentMessage.textContent =
                getText("waiting");
            return;
        }

        const difference = Math.min(
            relativeAngle,
            360 - relativeAngle
        );

        elements.qiblaAlignmentMessage.textContent =
            difference <= 5
                ? getText("aligned")
                : getText("notAligned");
    }

    function handleOrientation(event) {
        let heading = null;

        if (Number.isFinite(event.webkitCompassHeading)) {
            heading = event.webkitCompassHeading;
        } else if (Number.isFinite(event.alpha)) {
            heading = 360 - event.alpha;
        }

        if (heading !== null) {
            updateCompassHeading(heading);
        }
    }

    function showSensorMessage(message) {
        setText("sensorMessage", message);
    }

    function startCompassListener() {
        if (
            !("DeviceOrientationEvent" in window)
        ) {
            showSensorMessage(getText("sensorUnavailable"));
            return false;
        }

        window.addEventListener(
            "deviceorientation",
            handleOrientation,
            true
        );

        sensorStarted = true;

        setText("sensorTitle", getText("sensorActive"));
        setText("sensorButton", getText("sensorActive"));

        showSensorMessage(getText("turnPhone"));

        return true;
    }

    async function startCompass() {
        try {
            if (sensorStarted) {
                showSensorMessage(getText("sensorActive"));
                return;
            }

            if (!("DeviceOrientationEvent" in window)) {
                showSensorMessage(getText("sensorUnavailable"));
                return;
            }

            if (
                typeof DeviceOrientationEvent.requestPermission ===
                "function"
            ) {
                const permission =
                    await DeviceOrientationEvent.requestPermission();

                if (permission !== "granted") {
                    showSensorMessage(getText("sensorDenied"));
                    return;
                }
            }

            const started = startCompassListener();

            if (!started) {
                showSensorMessage(getText("sensorError"));
            }
        } catch (error) {
            console.error("Compass error:", error);
            showSensorMessage(getText("sensorError"));
        }
    }

    /* -----------------------------------------------------
       BUTTONS
    ----------------------------------------------------- */

    function bindEvents() {
        if (elements.sensorButton) {
            elements.sensorButton.addEventListener(
                "click",
                startCompass
            );
        }

        if (elements.languageButton) {
            elements.languageButton.addEventListener(
                "click",
                changeLanguage
            );
        }

        if (elements.qiblaBack) {
            elements.qiblaBack.addEventListener(
                "click",
                () => {
                    if (window.history.length > 1) {
                        window.history.back();
                    } else {
                        window.location.href = "../index.html";
                    }
                }
            );
        }

        window.addEventListener("storage", event => {
            if (
                event.key === STORAGE.location ||
                event.key === STORAGE.city
            ) {
                refreshHomeLocation();
            }
        });
    }

    /* -----------------------------------------------------
       LOCATION REFRESH
    ----------------------------------------------------- */

    function refreshHomeLocation() {
        userLocation = readSavedLocation();

        if (!userLocation) {
            qiblaBearing = null;
            displayLocation();
            setText("qiblaBearing", "--");
            setText("qiblaDistance", "--");

            if (elements.compassNeedle) {
                elements.compassNeedle.style.transform = "rotate(0deg)";
            }

            return;
        }

        displayLocation();
        displayQiblaInformation();
    }

    /* -----------------------------------------------------
       INITIALIZATION
    ----------------------------------------------------- */

    function init() {
        getElements();

        currentLanguage = detectLanguage();

        userLocation = readSavedLocation();

        applyLanguage();
        displayLocation();

        if (userLocation) {
            displayQiblaInformation();
        } else {
            setText("qiblaBearing", "--");
            setText("qiblaDistance", "--");
            showSensorMessage(getText("locationMissing"));
        }

        bindEvents();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
