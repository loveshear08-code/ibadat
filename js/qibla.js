
/* =====================================================
   IBADAT - QIBLA COMPASS
   Automatic sensor startup + live heading
   Uses saved home-page coordinates
===================================================== */

(() => {
    "use strict";

    const $ = id => document.getElementById(id);
    const compass = document.querySelector(".compass");
    const wrapper = document.querySelector(".compass-wrapper");

    if (!compass || !wrapper) {
        console.error("IBADAT Qibla: compass HTML not found.");
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

    const LANGUAGES = {
        bn: {
            location: "বর্তমান অবস্থান",
            distance: "মক্কার দূরত্ব",
            km: "কিমি",
            missing: "হোম পেজের লোকেশন পাওয়া যায়নি",
            waiting: "কম্পাস সেন্সরের অপেক্ষায়",
            active: "কম্পাস সক্রিয়",
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
            km: "km",
            missing: "Home-page location unavailable",
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
            km: "किमी",
            missing: "होम पेज का स्थान उपलब्ध नहीं",
            waiting: "कम्पास सेंसर की प्रतीक्षा",
            active: "कम्पास सक्रिय",
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

    let language = "bn";
    let T = LANGUAGES.bn;

    let userLat = null;
    let userLon = null;
    let qiblaBearing = 0;
    let heading = null;
    let previousRawHeading = null;
    let sensorStarted = false;
    let permissionRequested = false;
    let absoluteSensorFound = false;
    let lastAbsoluteTime = 0;

    const toRad = n => n * Math.PI / 180;
    const normalize = n => ((n % 360) + 360) % 360;

    function getLanguage() {
        try {
            const settings = JSON.parse(
                localStorage.getItem("appSettings") || "{}"
            );
            return LANGUAGES[settings.lang] ? settings.lang : "bn";
        } catch {
            return "bn";
        }
    }

    function formatNumber(n) {
        const locale =
            language === "bn" ? "bn-BD" :
            language === "hi" ? "hi-IN" : "en-US";

        return Number(n).toLocaleString(locale, {
            maximumFractionDigits: 0
        });
    }

    function directionName(deg) {
        const index = Math.round(normalize(deg) / 22.5) % 16;
        return T.directions[index];
    }

    /* Status is available for diagnostics, not displayed on the
       distance board. */
    const status = document.createElement("span");
    status.id = "qiblaSensorStatus";
    status.hidden = true;
    wrapper.appendChild(status);

    function setStatus(message) {
        status.textContent = message;
        status.title = message;
        console.info("IBADAT Qibla:", message);
    }

    /* ---------------- LANGUAGE ---------------- */

    function applyLanguage() {
        language = getLanguage();
        T = LANGUAGES[language];

        if (locationLabel) locationLabel.textContent = T.location;
        if (distanceLabel) distanceLabel.textContent = T.distance;

        directions.forEach((el, i) => {
            el.textContent = T.directions[i] || el.textContent;
        });

        if (userLat !== null && userLon !== null) {
            updateLocationValues();
        }

        updateCompass();
    }

    /* ---------------- DISTANCE AND BEARING ---------------- */

    function distanceKm(lat1, lon1, lat2, lon2) {
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
        const dLon = toRad(KAABA_LON - lon);

        const y = Math.sin(dLon) * Math.cos(lat2);
        const x =
            Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

        return normalize(Math.atan2(y, x) * 180 / Math.PI);
    }

    function updateLocationValues() {
        qiblaBearing = calculateBearing(userLat, userLon);

        const km = distanceKm(
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

    function loadSavedLocation() {
        let saved = null;

        try {
            saved = JSON.parse(
                localStorage.getItem("ibadatUserLocation") || "null"
            );
        } catch {}

        if (
            !saved ||
            !Number.isFinite(Number(saved.lat)) ||
            !Number.isFinite(Number(saved.lon)) ||
            Math.abs(Number(saved.lat)) > 90 ||
            Math.abs(Number(saved.lon)) > 180
        ) {
            if (locationName) locationName.textContent = T.missing;
            if (distanceEl) distanceEl.textContent = "—";
            if (degreeEl) degreeEl.textContent = "—";
            setStatus(T.missing);
            return;
        }

        userLat = Number(saved.lat);
        userLon = Number(saved.lon);

        // The home page should save its actual city name in this key.
        try {
            const city = localStorage.getItem("ibadatCityName");
            if (city && locationName) {
                locationName.textContent = city;
            }
        } catch {}

        updateLocationValues();
    }

    /* ---------------- COMPASS DIAL ---------------- */

    const directions = [...compass.querySelectorAll(".direction")];

    const dial = document.createElement("div");
    dial.className = "compass-dial";

    Object.assign(dial.style, {
        position: "absolute",
        inset: "0",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "rotate(0deg)"
    });

    directions.forEach(el => dial.appendChild(el));
    compass.insertBefore(dial, ring || compass.firstChild);

    /* ---------------- NEEDLE ---------------- */

    const needle = document.createElement("div");
    needle.className = "qibla-needle";

    Object.assign(needle.style, {
        position: "absolute",
        zIndex: "3",
        width: "5px",
        height: "75px",
        left: "50%",
        bottom: "50%",
        transform: "translateX(-50%) rotate(0deg)",
        transformOrigin: "50% 100%",
        borderRadius: "5px",
        background: "#0F5132",
        pointerEvents: "none"
    });

    const tip = document.createElement("div");

    Object.assign(tip.style, {
        position: "absolute",
        top: "-11px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "0",
        height: "0",
        borderLeft: "9px solid transparent",
        borderRight: "9px solid transparent",
        borderBottom: "15px solid #C62828"
    });

    needle.appendChild(tip);
    compass.appendChild(needle);

    /* ---------------- KAABA MARKER ---------------- */

    const marker = document.createElement("div");
    marker.className = "kaaba-marker";

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
        border: "1px solid #555"
    });

    Object.assign(band.style, {
        position: "absolute",
        left: "0",
        top: "14px",
        width: "100%",
        height: "5px",
        boxSizing: "border-box",
        background: "#D4AF37",
        borderTop: "1px solid #F3D36A",
        borderBottom: "1px solid #8F6D12"
    });

    marker.append(roof, body, band);
    compass.appendChild(marker);

    /* ---------------- LIVE COMPASS ---------------- */

    function updateCompass() {
        const h = heading === null ? 0 : heading;
        const relative = normalize(qiblaBearing - h);

        // The dial follows the device direction.
        dial.style.transform = `rotate(${-h}deg)`;

        // Counter-rotate labels so the text remains upright.
        directions.forEach(el => {
            el.style.transform =
                `translate(-50%, -50%) rotate(${h}deg)`;
        });

        // Arrow points to Qibla relative to current heading.
        needle.style.transform =
            `translateX(-50%) rotate(${relative}deg)`;

        // Keep Kaaba icon outside the compass rim.
        const rect = compass.getBoundingClientRect();
        const radius =
            Math.min(rect.width, rect.height) / 2 +
            8 +
            Math.max(marker.offsetWidth, marker.offsetHeight) / 2;

        const angle = toRad(relative);
        const x = Math.sin(angle) * radius;
        const y = -Math.cos(angle) * radius;

        marker.style.transform =
            `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    }

    function acceptHeading(rawValue, isAbsolute) {
        if (!Number.isFinite(rawValue)) return;

        if (isAbsolute) {
            absoluteSensorFound = true;
            lastAbsoluteTime = Date.now();
        } else if (
            absoluteSensorFound &&
            Date.now() - lastAbsoluteTime < 2000
        ) {
            return;
        }

        const next = normalize(rawValue);

        if (heading === null || previousRawHeading === null) {
            heading = next;
        } else {
            // Smooth rotation while handling 359° -> 0° correctly.
            const delta = ((next - previousRawHeading + 540) % 360) - 180;
            heading = normalize(heading + delta * 0.35);
        }

        previousRawHeading = next;

        updateCompass();
        setStatus(isAbsolute ? T.active : T.waiting);
    }

    function onOrientation(event) {
        // iOS Safari exposes a compass heading directly.
        if (Number.isFinite(event.webkitCompassHeading)) {
            acceptHeading(event.webkitCompassHeading, true);
            return;
        }

        if (!Number.isFinite(event.alpha)) return;

        const isAbsolute =
            event.absolute === true ||
            event.type === "deviceorientationabsolute";

        // Absolute events are preferred. Some Android browsers only
        // provide alpha; in that case this is a best-effort estimate.
        acceptHeading(360 - event.alpha, isAbsolute);
    }

    function startSensors() {
        if (sensorStarted) return;
        sensorStarted = true;

        window.addEventListener(
            "deviceorientationabsolute", onOrientation, true
        );
        window.addEventListener(
            "deviceorientation", onOrientation, true
        );

        setStatus(T.waiting);

        window.setTimeout(() => {
            if (heading === null) {
                setStatus(T.unavailable);
                console.warn(
                    "No compass heading received. Check browser/device sensor support."
                );
            }
        }, 7000);
    }

    function setupSensors() {
        if (typeof DeviceOrientationEvent === "undefined") {
            setStatus(T.unavailable);
            return;
        }

        // Most Android browsers can start sensors without a permission prompt.
        if (
            typeof DeviceOrientationEvent.requestPermission !== "function"
        ) {
            startSensors();
            return;
        }

        // iOS requires a user gesture. No visible button is added.
        compass.addEventListener("click", async () => {
            if (permissionRequested) return;
            permissionRequested = true;

            try {
                const result =
                    await DeviceOrientationEvent.requestPermission();

                if (result === "granted") {
                    startSensors();
                } else {
                    setStatus(T.denied);
                }
            } catch {
                setStatus(T.denied);
            }
        }, { once: true });

        setStatus(T.denied);
    }

    /* ---------------- REFRESH ---------------- */

    function init() {
        applyLanguage();
        loadSavedLocation();
        setupSensors();
        updateCompass();
    }

    window.addEventListener("resize", updateCompass);

    window.addEventListener("storage", event => {
        if (event.key === "appSettings") {
            applyLanguage();
        }

        if (
            event.key === "ibadatUserLocation" ||
            event.key === "ibadatCityName"
        ) {
            loadSavedLocation();
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            applyLanguage();
            loadSavedLocation();
            updateCompass();
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
