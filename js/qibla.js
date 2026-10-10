/* =====================================================
   IBADAT - QIBLA COMPASS
   Complete JavaScript
   Existing HTML and CSS compatible
===================================================== */

(() => {
    "use strict";

    /* ================= ELEMENTS ================= */

    const $ = id => document.getElementById(id);

    const compass = document.querySelector(".compass");
    const wrapper = document.querySelector(".compass-wrapper");
    const dial = document.createElement("div");

    if (!compass || !wrapper) {
        console.error("Qibla compass elements not found.");
        return;
    }

    const locationName = $("locationName");
    const locationLabel = $("locationLabel");
    const distanceLabel = $("distanceLabel");
    const distanceEl = $("distance");
    const degreeEl = compass.querySelector(".degree");
    const ring = compass.querySelector(".compass-ring");
    const center = compass.querySelector(".center-point");

    /* ================= LANGUAGE ================= */

    function getLanguage() {
        try {
            return JSON.parse(
                localStorage.getItem("appSettings") || "{}"
            ).lang || "bn";
        } catch {
            return "bn";
        }
    }

    const LANG = getLanguage();

    const TEXT = {
        bn: {
            location: "বর্তমান অবস্থান",
            distance: "মক্কার দূরত্ব",
            loading: "লোকেশন নেওয়া হচ্ছে...",
            missing: "লোকেশন পাওয়া যায়নি",
            permission: "কম্পাস চালু করুন",
            waiting: "কম্পাস সেন্সরের অপেক্ষায়...",
            active: "কম্পাস চালু",
            unavailable: "কম্পাস সেন্সর পাওয়া যায়নি",
            denied: "কম্পাস ব্যবহারের অনুমতি দিন",
            km: "কিমি",
            north: "উ",
            northeast: "উ-পূ",
            east: "পূ",
            southeast: "দ-পূ",
            south: "দ",
            southwest: "দ-প",
            west: "প",
            northwest: "উ-প"
        },
        en: {
            location: "Current Location",
            distance: "Distance to Makkah",
            loading: "Getting location...",
            missing: "Location unavailable",
            permission: "Enable compass",
            waiting: "Waiting for compass sensor...",
            active: "Compass active",
            unavailable: "Compass sensor unavailable",
            denied: "Allow compass permission",
            km: "km",
            north: "N",
            northeast: "NE",
            east: "E",
            southeast: "SE",
            south: "S",
            southwest: "SW",
            west: "W",
            northwest: "NW"
        },
        hi: {
            location: "वर्तमान स्थान",
            distance: "मक्का की दूरी",
            loading: "स्थान प्राप्त हो रहा है...",
            missing: "स्थान उपलब्ध नहीं",
            permission: "कम्पास चालू करें",
            waiting: "कम्पास सेंसर की प्रतीक्षा...",
            active: "कम्पास चालू",
            unavailable: "कम्पास सेंसर उपलब्ध नहीं",
            denied: "कम्पास की अनुमति दें",
            km: "किमी",
            north: "उ",
            northeast: "उ-पू",
            east: "पू",
            southeast: "द-पू",
            south: "द",
            southwest: "द-प",
            west: "प",
            northwest: "उ-प"
        }
    };

    const T = TEXT[LANG] || TEXT.bn;

    /* ================= KAABA LOCATION ================= */

    const KAABA_LAT = 21.422487;
    const KAABA_LON = 39.826206;

    let userLat = null;
    let userLon = null;

    let qiblaBearing = 0;
    let heading = null;
    let lastHeading = null;

    let absoluteSensorFound = false;
    let sensorStarted = false;
    let lastAbsoluteTime = 0;

    /* ================= HELPERS ================= */

    const toRad = deg => deg * Math.PI / 180;

    function normalize(deg) {
        return ((deg % 360) + 360) % 360;
    }

    function formatNumber(number, decimals = 0) {
        const locale =
            LANG === "bn" ? "bn-BD" :
            LANG === "hi" ? "hi-IN" : "en-US";

        return number.toLocaleString(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    function directionName(deg) {
        const directions = [
            T.north,
            T.northeast,
            T.east,
            T.southeast,
            T.south,
            T.southwest,
            T.west,
            T.northwest
        ];

        return directions[
            Math.round(normalize(deg) / 45) % 8
        ];
    }

    /* ================= DISTANCE ================= */

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
            Math.sqrt(1 - a)
        );
    }

    /* ================= QIBLA BEARING ================= */

    function calculateBearing(lat, lon) {
        const lat1 = toRad(lat);
        const lat2 = toRad(KAABA_LAT);
        const deltaLon = toRad(KAABA_LON - lon);

        const y = Math.sin(deltaLon) * Math.cos(lat2);

        const x =
            Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) *
            Math.cos(deltaLon);

        return normalize(
            Math.atan2(y, x) * 180 / Math.PI
        );
    }

    /* ================= LOAD LOCATION ================= */

    function useLocation(lat, lon) {
        userLat = Number(lat);
        userLon = Number(lon);

        if (
            !Number.isFinite(userLat) ||
            !Number.isFinite(userLon) ||
            Math.abs(userLat) > 90 ||
            Math.abs(userLon) > 180
        ) {
            showStatus(T.missing);
            return;
        }

        qiblaBearing = calculateBearing(userLat, userLon);

        const km = calculateDistance(
            userLat,
            userLon,
            KAABA_LAT,
            KAABA_LON
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
        if (locationLabel) {
            locationLabel.textContent = T.location;
        }

        if (distanceLabel) {
            distanceLabel.textContent = T.distance;
        }

        let saved = null;

        try {
            saved = JSON.parse(
                localStorage.getItem("ibadatUserLocation") || "null"
            );
        } catch {}

        if (
            saved &&
            Number.isFinite(Number(saved.lat)) &&
            Number.isFinite(Number(saved.lon))
        ) {
            try {
                const city = localStorage.getItem("ibadatCityName");

                if (city && locationName) {
                    const names = {
                        Kolkata: {
                            bn: "কলকাতা",
                            en: "Kolkata",
                            hi: "कोलकाता"
                        },
                        Delhi: {
                            bn: "দিল্লি",
                            en: "Delhi",
                            hi: "दिल्ली"
                        },
                        Mumbai: {
                            bn: "মুম্বাই",
                            en: "Mumbai",
                            hi: "मुंबई"
                        }
                    };

                    locationName.textContent =
                        names[city]?.[LANG] || city;
                }
            } catch {}

            useLocation(saved.lat, saved.lon);
            return;
        }

        // Fallback: request GPS only if no saved coordinates exist.
        if (!navigator.geolocation) {
            showStatus(T.missing);
            return;
        }

        if (locationName) {
            locationName.textContent = T.loading;
        }

        navigator.geolocation.getCurrentPosition(
            pos => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                try {
                    localStorage.setItem(
                        "ibadatUserLocation",
                        JSON.stringify({ lat, lon })
                    );
                } catch {}

                useLocation(lat, lon);
            },
            () => {
                showStatus(T.missing);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 300000
            }
        );
    }

    /* ================= COMPASS DIAL ================= */

    // Move existing direction labels into a rotating dial.
    // The ring and centre remain stationary.
    dial.className = "compass-dial";

    Object.assign(dial.style, {
        position: "absolute",
        inset: "0",
        borderRadius: "50%",
        transform: "rotate(0deg)",
        pointerEvents: "none"
    });

    const directions = [
        ...compass.querySelectorAll(".direction")
    ];

    directions.forEach(el => dial.appendChild(el));

    compass.insertBefore(
        dial,
        ring || compass.firstChild
    );

    /* ================= NEEDLE ================= */

    const needle = document.createElement("div");
    needle.className = "qibla-needle";
    needle.setAttribute("aria-label", "Qibla direction");

    Object.assign(needle.style, {
        position: "absolute",
        zIndex: "2",
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

    /* ================= KAABA MARKER ================= */

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
        borderBottom: "1px solid #8F6D12"
    });

    marker.append(roof, body, band);
    compass.appendChild(marker);

    /* ================= SENSOR STATUS ================= */

    const status = document.createElement("div");
    status.id = "qiblaSensorStatus";

    Object.assign(status.style, {
        position: "absolute",
        left: "50%",
        bottom: "3px",
        transform: "translateX(-50%)",
        width: "100%",
        textAlign: "center",
        fontSize: "12px",
        color: "#52796f",
        pointerEvents: "none"
    });

    wrapper.appendChild(status);

    function showStatus(message) {
        status.textContent = message;
    }

    /* ================= COMPASS BEHAVIOUR ================= */

    function updateCompass() {
        if (!compass || !dial || !needle || !marker) return;

        const h = heading === null ? 0 : heading;

        // Rotate the direction labels with the phone.
        dial.style.transform = `rotate(${-h}deg)`;

        // Relative bearing from the phone's current heading.
        const relative = normalize(qiblaBearing - h);

        // Needle points towards Qibla.
        needle.style.transform =
            `translateX(-50%) rotate(${relative}deg)`;

        // Keep the Kaaba outside the compass with a uniform gap.
        const rect = compass.getBoundingClientRect();

        const markerWidth = marker.offsetWidth || 30;
        const markerHeight = marker.offsetHeight || 34;

        const radius =
            Math.min(rect.width, rect.height) / 2 +
            8 +
            7 +
            Math.max(markerWidth, markerHeight) / 2;

        const angle = toRad(relative);

        const x = Math.sin(angle) * radius;
        const y = -Math.cos(angle) * radius;

        marker.style.transform =
            `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    }

    /* ================= ORIENTATION SENSOR ================= */

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

        if (heading === null || lastHeading === null) {
            heading = next;
        } else {
            // Smooth rotation without a jump across 0°/360°.
            const delta =
                ((next - lastHeading + 540) % 360) - 180;

            heading = normalize(heading + delta * 0.30);
        }

        lastHeading = heading;

        updateCompass();

        showStatus(
            isAbsolute ? T.active : T.waiting
        );
    }

    function onOrientation(event) {
        // iOS Safari provides a dedicated compass heading.
        if (Number.isFinite(event.webkitCompassHeading)) {
            acceptHeading(event.webkitCompassHeading, true);
            return;
        }

        if (!Number.isFinite(event.alpha)) return;

        const isAbsolute =
            event.absolute === true ||
            event.type === "deviceorientationabsolute";

        // Relative alpha is not guaranteed to represent true north.
        acceptHeading(360 - event.alpha, isAbsolute);
    }

    function startSensors() {
        if (sensorStarted) return;

        sensorStarted = true;
        showStatus(T.waiting);

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

        setTimeout(() => {
            if (heading === null) {
                showStatus(T.unavailable);
            }
        }, 7000);
    }

    /* ================= SENSOR PERMISSION ================= */

    function createPermissionButton() {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = T.permission;

        Object.assign(button.style, {
            position: "absolute",
            zIndex: "10",
            left: "50%",
            bottom: "30px",
            transform: "translateX(-50%)",
            padding: "10px 14px",
            border: "0",
            borderRadius: "12px",
            background: "#0F5132",
            color: "#fff",
            fontSize: "13px",
            fontWeight: "700"
        });

        wrapper.appendChild(button);

        button.addEventListener("click", async () => {
            try {
                if (
                    typeof DeviceOrientationEvent !== "undefined" &&
                    typeof DeviceOrientationEvent.requestPermission ===
                        "function"
                ) {
                    const permission =
                        await DeviceOrientationEvent.requestPermission();

                    if (permission !== "granted") {
                        showStatus(T.denied);
                        return;
                    }
                }

                button.remove();
                startSensors();

            } catch (error) {
                showStatus(T.denied);
            }
        });
    }

    function setupSensors() {
        if (typeof DeviceOrientationEvent === "undefined") {
            showStatus(T.unavailable);
            return;
        }

        if (
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            createPermissionButton();
        } else {
            startSensors();
        }
    }

    /* ================= INIT ================= */

    function init() {
        loadLocation();
        setupSensors();
        updateCompass();
    }

    window.addEventListener("resize", updateCompass);

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            updateCompass();
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
