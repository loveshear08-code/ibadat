
/* =====================================================
   IBADAT - QIBLA COMPASS
   Complete replacement: qibla.js
   Supports: Bengali, English, Hindi
   Existing Qibla HTML/CSS compatible
===================================================== */

(() => {
    "use strict";

    const $ = id => document.getElementById(id);

    const compass = document.querySelector(".compass");
    const wrapper = document.querySelector(".compass-wrapper");

    if (!compass || !wrapper) {
        console.error("IBADAT: Qibla compass elements not found.");
        return;
    }

    const locationName = $("locationName");
    const locationLabel = $("locationLabel");
    const distanceLabel = $("distanceLabel");
    const distanceEl = $("distance");
    const degreeEl = compass.querySelector(".degree");
    const ring = compass.querySelector(".compass-ring");

    const KAABA_LAT = 21.422487;
    const KAABA_LON = 39.826206;

    const TEXT = {
        bn: {
            location: "বর্তমান অবস্থান",
            distance: "মক্কার দূরত্ব",
            loading: "লোকেশন নেওয়া হচ্ছে...",
            missing: "লোকেশন পাওয়া যায়নি",
            km: "কিমি",
            waiting: "কম্পাস সেন্সরের অপেক্ষায়",
            active: "কম্পাস চালু",
            unavailable: "কম্পাস সেন্সর পাওয়া যায়নি",
            denied: "কম্পাসের অনুমতি প্রয়োজন",
            directions: [
                "উ", "উ-উপূ", "উপূ", "পূ-উপূ",
                "পূ", "পূ-দপূ", "দপূ", "দ-দপূ",
                "দ", "দ-দপ", "দপ", "প-দপ",
                "প", "প-উপ", "উপ", "উ-উপ"
            ]
        },
        en: {
            location: "Current Location",
            distance: "Distance to Makkah",
            loading: "Getting location...",
            missing: "Location unavailable",
            km: "km",
            waiting: "Waiting for compass sensor",
            active: "Compass active",
            unavailable: "Compass sensor unavailable",
            denied: "Compass permission required",
            directions: [
                "N", "NNE", "NE", "ENE",
                "E", "ESE", "SE", "SSE",
                "S", "SSW", "SW", "WSW",
                "W", "WNW", "NW", "NNW"
            ]
        },
        hi: {
            location: "वर्तमान स्थान",
            distance: "मक्का की दूरी",
            loading: "स्थान प्राप्त हो रहा है...",
            missing: "स्थान उपलब्ध नहीं",
            km: "किमी",
            waiting: "कम्पास सेंसर की प्रतीक्षा",
            active: "कम्पास चालू",
            unavailable: "कम्पास सेंसर उपलब्ध नहीं",
            denied: "कम्पास की अनुमति आवश्यक है",
            directions: [
                "उ", "उ-उपू", "उपू", "पू-उपू",
                "पू", "पू-दपू", "दपू", "द-दपू",
                "द", "द-दप", "दप", "प-दप",
                "प", "प-उ", "उप", "उ-उप"
            ]
        }
    };

    let LANG = "bn";
    let T = TEXT.bn;

    let userLat = null;
    let userLon = null;
    let qiblaBearing = 0;
    let heading = null;
    let lastRawHeading = null;
    let absoluteSensorFound = false;
    let lastAbsoluteTime = 0;
    let sensorStarted = false;
    let permissionAttempted = false;

    const toRad = deg => deg * Math.PI / 180;
    const normalize = deg => ((deg % 360) + 360) % 360;

    function getLanguage() {
        try {
            const settings = JSON.parse(
                localStorage.getItem("appSettings") || "{}"
            );
            return TEXT[settings.lang] ? settings.lang : "bn";
        } catch {
            return "bn";
        }
    }

    function formatNumber(value, decimals = 0) {
        const locale = LANG === "bn"
            ? "bn-BD"
            : LANG === "hi"
                ? "hi-IN"
                : "en-US";

        return Number(value).toLocaleString(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    function directionName(deg) {
        const index = Math.round(normalize(deg) / 22.5) % 16;
        return T.directions[index];
    }

    function showStatus(message) {
        // Status is kept out of the distance board.
        status.textContent = message;
        status.title = message;
        status.hidden = true;
    }

    /* ---------------- LANGUAGE ---------------- */

    function applyLanguage() {
        LANG = getLanguage();
        T = TEXT[LANG];

        if (locationLabel) {
            locationLabel.textContent = T.location;
        }

        if (distanceLabel) {
            distanceLabel.textContent = T.distance;
        }

        directions.forEach((el, index) => {
            el.textContent = T.directions[index];
        });

        if (userLat !== null && userLon !== null) {
            updateLocationValues();
        }

        if (heading === null) {
            showStatus(T.waiting);
        } else {
            showStatus(T.active);
        }
    }

    /* ---------------- DISTANCE / BEARING ---------------- */

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

        return 2 * R * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(Math.max(0, 1 - a))
        );
    }

    function calculateBearing(lat, lon) {
        const lat1 = toRad(lat);
        const lat2 = toRad(KAABA_LAT);
        const deltaLon = toRad(KAABA_LON - lon);

        const y = Math.sin(deltaLon) * Math.cos(lat2);
        const x =
            Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) *
            Math.cos(deltaLon);

        return normalize(Math.atan2(y, x) * 180 / Math.PI);
    }

    function updateLocationValues() {
        qiblaBearing = calculateBearing(userLat, userLon);

        const km = calculateDistance(
            userLat, userLon, KAABA_LAT, KAABA_LON
        );

        if (distanceEl) {
            distanceEl.textContent =
                `${formatNumber(Math.round(km))} ${T.km}`;
        }

        if (degreeEl) {
            degreeEl.textContent =
                `${formatNumber(Math.round(qiblaBearing))}° ${directionName(qiblaBearing)}`;
        }

        updateCompass();
    }

    function loadLocation() {
        let saved = null;

        try {
            saved = JSON.parse(
                localStorage.getItem("ibadatUserLocation") || "null"
            );
        } catch {}

        if (
            saved &&
            Number.isFinite(Number(saved.lat)) &&
            Number.isFinite(Number(saved.lon)) &&
            Math.abs(Number(saved.lat)) <= 90 &&
            Math.abs(Number(saved.lon)) <= 180
        ) {
            userLat = Number(saved.lat);
            userLon = Number(saved.lon);

            // Use a saved city name only if the app already provides one.
            try {
                const city = localStorage.getItem("ibadatCityName");
                if (city && locationName) {
                    locationName.textContent = city;
                }
            } catch {}

            updateLocationValues();
            return;
        }

        // Do not request location a second time.
        if (distanceEl) distanceEl.textContent = "—";
        if (degreeEl) degreeEl.textContent = "—";
        if (locationName) locationName.textContent = T.missing;
        showStatus(T.missing);
    }

    /* ---------------- ROTATING DIAL ---------------- */

    const dial = document.createElement("div");
    dial.className = "compass-dial";

    Object.assign(dial.style, {
        position: "absolute",
        inset: "0",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "rotate(0deg)"
    });

    const directions = [...compass.querySelectorAll(".direction")];

    directions.forEach((el, index) => {
        el.textContent = T.directions[index] || el.textContent;
        dial.appendChild(el);
    });

    compass.insertBefore(dial, ring || compass.firstChild);

    /* ---------------- QIBLA NEEDLE ---------------- */

    const needle = document.createElement("div");
    needle.className = "qibla-needle";
    needle.setAttribute("aria-label", "Qibla direction");

    Object.assign(needle.style, {
        position: "absolute",
        zIndex: "3",
        width: "5px",
        height: "75px",
        left: "50%",
        bottom: "50%",
        transform: "translateX(-50%) rotate(0deg)",
        transformOrigin: "50% 100%",
        borderRadius: "5px 5px 2px 2px",
        background: "#0F5132",
        pointerEvents: "none"
    });

    const needleTip = document.createElement("div");

    Object.assign(needleTip.style, {
        position: "absolute",
        width: "0",
        height: "0",
        top: "-11px",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "9px solid transparent",
        borderRight: "9px solid transparent",
        borderBottom: "15px solid #C62828"
    });

    needle.appendChild(needleTip);
    compass.appendChild(needle);

    /* ---------------- KAABA MARKER ---------------- */

    const marker = document.createElement("div");
    marker.className = "kaaba-marker";
    marker.setAttribute("aria-label", "Kaaba direction");

    Object.assign(marker.style, {
        position: "absolute",
        zIndex: "5",
        left: "50%",
        top: "50%",
        width: "30px",
        height: "34px",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 2px rgba(0,0,0,.22))"
    });

    const roof = document.createElement("div");
    const body = document.createElement("div");
    const band = document.createElement("div");

    Object.assign(roof.style, {
        position: "absolute",
        left: "0",
        top: "1px",
        width: "100%",
        height: "10px",
        background: "#242424",
        borderTop: "2px solid #D4AF37",
        transform: "skewY(-10deg)"
    });

    Object.assign(body.style, {
        position: "absolute",
        left: "0",
        top: "8px",
        width: "100%",
        height: "25px",
        boxSizing: "border-box",
        background: "linear-gradient(90deg,#292929,#080808,#303030)",
        border: "1px solid #555",
        borderRadius: "1px"
    });

    Object.assign(band.style, {
        position: "absolute",
        left: "0",
        top: "14px",
        width: "100%",
        height: "5px",
        background: "#D4AF37",
        borderTop: "1px solid #F3D36A",
        borderBottom: "1px solid #8F6D12",
        boxSizing: "border-box"
    });

    marker.append(roof, body, band);
    compass.appendChild(marker);

    /* ---------------- QUIET STATUS ---------------- */

    const status = document.createElement("div");
    status.id = "qiblaSensorStatus";
    status.hidden = true;
    status.setAttribute("aria-live", "polite");
    wrapper.appendChild(status);

    /* ---------------- COMPASS UPDATE ---------------- */

    function updateCompass() {
        const h = heading === null ? 0 : heading;
        const relative = normalize(qiblaBearing - h);

        // Dial follows phone heading.
        dial.style.transform = `rotate(${-h}deg)`;

        // Counter-rotate labels so they remain upright.
        directions.forEach(el => {
            el.style.transform =
                `translate(-50%, -50%) rotate(${h}deg)`;
        });

        // The arrow points towards the relative Qibla bearing.
        needle.style.transform =
            `translateX(-50%) rotate(${relative}deg)`;

        // Keep the Kaaba marker outside the compass perimeter.
        const rect = compass.getBoundingClientRect();
        const radius =
            Math.min(rect.width, rect.height) / 2 +
            8 +
            Math.max(marker.offsetWidth || 30, marker.offsetHeight || 34) / 2;

        const angle = toRad(relative);
        const x = Math.sin(angle) * radius;
        const y = -Math.cos(angle) * radius;

        marker.style.transform =
            `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    }

    /* ---------------- ORIENTATION SENSOR ---------------- */

    function acceptHeading(value, isAbsolute) {
        if (!Number.isFinite(value)) return;

        if (isAbsolute) {
            absoluteSensorFound = true;
            lastAbsoluteTime = Date.now();
        } else if (
            absoluteSensorFound &&
            Date.now() - lastAbsoluteTime < 2000
        ) {
            return;
        }

        const next = normalize(value);

        if (heading === null || lastRawHeading === null) {
            heading = next;
        } else {
            const delta = ((next - lastRawHeading + 540) % 360) - 180;
            heading = normalize(heading + delta * 0.30);
        }

        lastRawHeading = next;
        updateCompass();
        showStatus(isAbsolute ? T.active : T.waiting);
    }

    function onOrientation(event) {
        // iOS Safari gives heading relative to magnetic north.
        if (Number.isFinite(event.webkitCompassHeading)) {
            acceptHeading(event.webkitCompassHeading, true);
            return;
        }

        if (!Number.isFinite(event.alpha)) return;

        const isAbsolute =
            event.absolute === true ||
            event.type === "deviceorientationabsolute";

        // DeviceOrientation alpha may be relative on some devices.
        acceptHeading(360 - event.alpha, isAbsolute);
    }

    function startSensors() {
        if (sensorStarted) return;
        sensorStarted = true;

        window.addEventListener(
            "deviceorientationabsolute",
            onOrientation,
            true
        );

        window.addEventListener(
            "deviceorientation",
            onOrientation,
            true
        );

        showStatus(T.waiting);

        window.setTimeout(() => {
            if (heading === null) {
                showStatus(T.unavailable);
            }
        }, 7000);
    }

    /* ---------------- PERMISSION WITHOUT BUTTON ---------------- */

    async function requestSensorPermission() {
        if (permissionAttempted) return;
        permissionAttempted = true;

        try {
            if (
                typeof DeviceOrientationEvent !== "undefined" &&
                typeof DeviceOrientationEvent.requestPermission === "function"
            ) {
                const result =
                    await DeviceOrientationEvent.requestPermission();

                if (result !== "granted") {
                    showStatus(T.denied);
                    return;
                }
            }

            startSensors();
        } catch {
            showStatus(T.denied);
        }
    }

    function setupSensors() {
        if (typeof DeviceOrientationEvent === "undefined") {
            showStatus(T.unavailable);
            return;
        }

        if (
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            // iOS requires a user gesture. No visible enable button.
            compass.addEventListener("click", requestSensorPermission, {
                once: true
            });

            showStatus(T.denied);
        } else {
            // Android browsers generally allow automatic sensor startup.
            startSensors();
        }
    }

    /* ---------------- INIT ---------------- */

    function init() {
        applyLanguage();
        loadLocation();
        setupSensors();
        updateCompass();
    }

    window.addEventListener("resize", updateCompass);

    window.addEventListener("storage", event => {
        if (event.key === "appSettings") {
            applyLanguage();
        }

        if (event.key === "ibadatUserLocation") {
            loadLocation();
        }
    });

    window.addEventListener("pageshow", () => {
        applyLanguage();
        updateCompass();
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            applyLanguage();
            updateCompass();
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
