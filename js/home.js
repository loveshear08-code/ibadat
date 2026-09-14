/* =========================================================
   IBADAT - HOME
   ========================================================= */

const DEFAULT_LOCATION = {
    lat: 22.5726,
    lon: 88.3639,
    city: "Kolkata"
};

const PRAYER_CACHE_KEY = "ibadatPrayerCache";

const AZAN_FILES = {
    makkah: "assets/makkah.mp3",
    madinah: "assets/madinah.mp3",
    kuwait: "assets/kuwait.mp3",
    bangladesh: "assets/bangladesh.mp3",
    alaska: "assets/alaska.mp3"
};


/* =========================================================
   TEXT
   ========================================================= */

const TEXT = {
    bn: {
        bismillahMeaning: "পরম করুণাময়, অতি দয়ালু আল্লাহর নামে",
        prayers: {
            Fajr: "ফজর",
            Dhuhr: "যোহর",
            Asr: "আসর",
            Maghrib: "মাগরিব",
            Isha: "এশা"
        },
        current: "বর্তমান নামাজ",
        next: "পরবর্তী নামাজ",
        settings: "⚙️ সেটিং",
        weather: "আবহাওয়া",
        loading: "লোড হচ্ছে...",
        unavailable: "তথ্য পাওয়া যাচ্ছে না",
        beforeFajr: "ফজরের আগে",
        afterIsha: "এশার পর",
        quotes: [
            "নামাজ মুমিনের মেরাজ।",
            "আল্লাহকে স্মরণ করো, আল্লাহ তোমাকে স্মরণ করবেন।",
            "নিশ্চয়ই নামাজ অশ্লীল ও মন্দ কাজ থেকে বিরত রাখে।",
            "আল্লাহর উপর ভরসা করো।"
        ],
        features: {
            namaz: "নামাজ",
            quran: "কুরআন",
            dua: "দোয়া",
            hadith: "হাদিস",
            qibla: "কিবলা",
            tasbih: "তাসবিহ"
        }
    },

    en: {
        bismillahMeaning: "In the name of Allah, the Most Gracious, the Most Merciful",
        prayers: {
            Fajr: "Fajr",
            Dhuhr: "Dhuhr",
            Asr: "Asr",
            Maghrib: "Maghrib",
            Isha: "Isha"
        },
        current: "Current Prayer",
        next: "Next Prayer",
        settings: "⚙️ Settings",
        weather: "Weather",
        loading: "Loading...",
        unavailable: "Information unavailable",
        beforeFajr: "Before Fajr",
        afterIsha: "After Isha",
        quotes: [
            "Prayer is the ascension of the believer.",
            "Remember Allah, and Allah will remember you.",
            "Indeed, prayer restrains from shameful and unjust deeds.",
            "Put your trust in Allah."
        ],
        features: {
            namaz: "Namaz",
            quran: "Quran",
            dua: "Dua",
            hadith: "Hadith",
            qibla: "Qibla",
            tasbih: "Tasbih"
        }
    },

    hi: {
        bismillahMeaning: "अत्यंत कृपाशील, अत्यंत दयावान अल्लाह के नाम से",
        prayers: {
            Fajr: "फ़ज्र",
            Dhuhr: "ज़ुहर",
            Asr: "असर",
            Maghrib: "मग़रिब",
            Isha: "ईशा"
        },
        current: "वर्तमान नमाज़",
        next: "अगली नमाज़",
        settings: "⚙️ सेटिंग",
        weather: "मौसम",
        loading: "लोड हो रहा है...",
        unavailable: "जानकारी उपलब्ध नहीं",
        beforeFajr: "फ़ज्र से पहले",
        afterIsha: "ईशा के बाद",
        quotes: [
            "नमाज़ मोमिन की मेराज है।",
            "अल्लाह को याद करो, अल्लाह तुम्हें याद करेगा।",
            "निश्चय ही नमाज़ बुरे और अश्लील कामों से रोकती है।",
            "अल्लाह पर भरोसा रखो।"
        ],
        features: {
            namaz: "नमाज़",
            quran: "क़ुरआन",
            dua: "दुआ",
            hadith: "हदीस",
            qibla: "क़िबला",
            tasbih: "तस्बीह"
        }
    }
};


/* =========================================================
   SETTINGS
   ========================================================= */

function getSettingsSafe() {

    const defaults = {
        lang: "bn",
        dark: false,
        azan: "makkah"
    };

    try {

        const saved =
            localStorage.getItem("appSettings");

        if (!saved) {
            return defaults;
        }

        const parsed = JSON.parse(saved);

        return {
            lang:
                ["bn", "en", "hi"].includes(parsed.lang)
                    ? parsed.lang
                    : "bn",

            dark:
                parsed.dark === true,

            azan:
                AZAN_FILES[parsed.azan]
                    ? parsed.azan
                    : "makkah"
        };

    } catch (error) {

        console.warn(
            "Settings error:",
            error
        );

        return defaults;
    }
}


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function el(id) {
    return document.getElementById(id);
}

function setText(id, value) {

    const element = el(id);

    if (element) {
        element.textContent =
            value ?? "";
    }
}

function getLang() {
    return getSettingsSafe().lang;
}

function getText() {
    return TEXT[getLang()] || TEXT.bn;
}


/* =========================================================
   LANGUAGE / THEME
   ========================================================= */

function applyHomeSettings() {

    const settings =
        getSettingsSafe();

    document.documentElement.lang =
        settings.lang;

    document.body.classList.toggle(
        "dark-mode",
        settings.dark
    );

    const t =
        TEXT[settings.lang] || TEXT.bn;

    setText(
        "bismillahMeaning",
        t.bismillahMeaning
    );

    [
        "namaz",
        "quran",
        "dua",
        "hadith",
        "qibla",
        "tasbih"
    ].forEach(name => {

        setText(
            name,
            t.features[name]
        );
    });
}


/* =========================================================
   CLOCK / DATE
   ========================================================= */

function updateClock() {

    const now =
        new Date();

    const lang =
        getLang();

    const locale = {
        bn: "bn-BD",
        en: "en-IN",
        hi: "hi-IN"
    }[lang] || "bn-BD";

    const time =
        now.toLocaleTimeString(
            locale,
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }
        );

    setText(
        "clock",
        time
    );

    const day =
        now.toLocaleDateString(
            locale,
            {
                weekday: "long"
            }
        );

    setText(
        "todayDay",
        day
    );

    const date =
        now.toLocaleDateString(
            locale,
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    setText(
        "date",
        date
    );
}


/* =========================================================
   LOCATION
   ========================================================= */

let currentLocation = {
    lat: DEFAULT_LOCATION.lat,
    lon: DEFAULT_LOCATION.lon,
    city: DEFAULT_LOCATION.city
};

function setCityText(cityName) {

    if (!cityName) {
        return;
    }

    currentLocation.city =
        cityName;

    setText(
        "city",
        cityName
    );
}

async function reverseGeocode(lat, lon) {

    try {

        const url =
            "https://api.bigdatacloud.net/data/reverse-geocode-client" +
            `?latitude=${encodeURIComponent(lat)}` +
            `&longitude=${encodeURIComponent(lon)}` +
            "&localityLanguage=en";

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                "Reverse geocoding failed"
            );
        }

        const data =
            await response.json();

        const city =
            data.city ||
            data.locality ||
            data.principalSubdivision ||
            DEFAULT_LOCATION.city;

        setCityText(city);

    } catch (error) {

        console.warn(
            "City lookup failed:",
            error
        );

        setCityText(
            DEFAULT_LOCATION.city
        );
    }
}

function getLocation() {

    setCityText(
        DEFAULT_LOCATION.city
    );

    if (!navigator.geolocation) {

        initWithLocation(
            DEFAULT_LOCATION.lat,
            DEFAULT_LOCATION.lon
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;

            const lon =
                position.coords.longitude;

            currentLocation.lat =
                lat;

            currentLocation.lon =
                lon;

            reverseGeocode(
                lat,
                lon
            );

            initWithLocation(
                lat,
                lon
            );
        },

        error => {

            console.warn(
                "Location unavailable:",
                error
            );

            initWithLocation(
                DEFAULT_LOCATION.lat,
                DEFAULT_LOCATION.lon
            );
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}


/* =========================================================
   WEATHER
   ========================================================= */

function weatherDescription(
    code,
    lang
) {

    const descriptions = {

        bn: {
            0: "পরিষ্কার আকাশ",
            1: "প্রধানত পরিষ্কার",
            2: "আংশিক মেঘলা",
            3: "মেঘলা",
            45: "কুয়াশা",
            48: "কুয়াশা",
            51: "হালকা গুঁড়ি বৃষ্টি",
            53: "গুঁড়ি বৃষ্টি",
            55: "বেশি গুঁড়ি বৃষ্টি",
            61: "হালকা বৃষ্টি",
            63: "বৃষ্টি",
            65: "ভারী বৃষ্টি",
            80: "বৃষ্টির ঝাপটা",
            81: "বৃষ্টির ঝাপটা",
            82: "ভারী বৃষ্টির ঝাপটা",
            95: "বজ্রঝড়"
        },

        en: {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Cloudy",
            45: "Fog",
            48: "Fog",
            51: "Light drizzle",
            53: "Drizzle",
            55: "Heavy drizzle",
            61: "Light rain",
            63: "Rain",
            65: "Heavy rain",
            80: "Rain showers",
            81: "Rain showers",
            82: "Heavy rain showers",
            95: "Thunderstorm"
        },

        hi: {
            0: "साफ़ आसमान",
            1: "मुख्यतः साफ़",
            2: "आंशिक बादल",
            3: "बादल",
            45: "कोहरा",
            48: "कोहरा",
            51: "हल्की बूंदाबांदी",
            53: "बूंदाबांदी",
            55: "तेज़ बूंदाबांदी",
            61: "हल्की बारिश",
            63: "बारिश",
            65: "तेज़ बारिश",
            80: "बारिश की बौछार",
            81: "बारिश की बौछार",
            82: "तेज़ बौछार",
            95: "गरज के साथ बारिश"
        }
    };

    return (
        descriptions[lang]?.[code] ||
        descriptions.en[code] ||
        ""
    );
}

async function loadWeather(
    lat,
    lon
) {

    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            `?latitude=${encodeURIComponent(lat)}` +
            `&longitude=${encodeURIComponent(lon)}` +
            "&current=temperature_2m,weather_code" +
            "&timezone=auto";

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                "Weather request failed"
            );
        }

        const data =
            await response.json();

        if (!data.current) {
            throw new Error(
                "Weather unavailable"
            );
        }

        const temperature =
            Math.round(
                data.current.temperature_2m
            );

        const description =
            weatherDescription(
                data.current.weather_code,
                getLang()
            );

        setText(
            "weather",
            `${temperature}°C • ${description}`
        );

    } catch (error) {

        console.warn(
            "Weather error:",
            error
        );

        setText(
            "weather",
            getText().unavailable
        );
    }
}


/* =========================================================
   PRAYER TIME
   ========================================================= */

const PRAYER_NAMES = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha"
];

let prayerTimes = {};

function todayKey() {

    const now =
        new Date();

    return [
        now.getFullYear(),
        String(
            now.getMonth() + 1
        ).padStart(2, "0"),
        String(
            now.getDate()
        ).padStart(2, "0")
    ].join("-");
}

function cleanPrayerTime(value) {

    if (!value) {
        return null;
    }

    const match =
        String(value).match(
            /^(\d{1,2}):(\d{2})/
        );

    if (!match) {
        return null;
    }

    const hour =
        Number(match[1]);

    const minute =
        Number(match[2]);

    if (
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
    ) {
        return null;
    }

    return {
        hour,
        minute,
        text:
            `${String(hour).padStart(2, "0")}:` +
            `${String(minute).padStart(2, "0")}`
    };
}

function savePrayerCache(data) {

    try {

        localStorage.setItem(
            PRAYER_CACHE_KEY,
            JSON.stringify({
                date: todayKey(),
                times: data
            })
        );

    } catch (error) {

        console.warn(
            "Prayer cache save failed:",
            error
        );
    }
}

function loadPrayerCache() {

    try {

        const saved =
            localStorage.getItem(
                PRAYER_CACHE_KEY
            );

        if (!saved) {
            return null;
        }

        const data =
            JSON.parse(saved);

        if (
            data.date !== todayKey() ||
            !data.times
        ) {
            return null;
        }

        return data.times;

    } catch (error) {

        console.warn(
            "Prayer cache read failed:",
            error
        );

        return null;
    }
}

function normalizePrayerTimes(raw) {

    const result = {};

    PRAYER_NAMES.forEach(name => {

        const parsed =
            cleanPrayerTime(
                raw[name]
            );

        if (parsed) {
            result[name] =
                parsed;
        }
    });

    return result;
}

async function loadPrayerTimes(
    lat,
    lon
) {

    const cached =
        loadPrayerCache();

    if (cached) {

        prayerTimes =
            cached;

        renderPrayerGrid();

        return;
    }

    try {

        const date =
            new Date();

        const dd =
            String(
                date.getDate()
            ).padStart(2, "0");

        const mm =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const yyyy =
            date.getFullYear();

        const url =
            `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}` +
            `?latitude=${encodeURIComponent(lat)}` +
            `&longitude=${encodeURIComponent(lon)}` +
            "&method=1";

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                "Prayer API failed"
            );
        }

        const data =
            await response.json();

        if (
            !data.data ||
            !data.data.timings
        ) {
            throw new Error(
                "Prayer timings unavailable"
            );
        }

        const normalized =
            normalizePrayerTimes(
                data.data.timings
            );

        if (
            Object.keys(normalized).length !== 5
        ) {
            throw new Error(
                "Incomplete prayer timings"
            );
        }

        prayerTimes =
            normalized;

        savePrayerCache(
            prayerTimes
        );

        renderPrayerGrid();

    } catch (error) {

        console.warn(
            "Prayer time error:",
            error
        );

        setText(
            "prayerGrid",
            getText().unavailable
        );
    }
}


/* =========================================================
   PRAYER GRID
   ========================================================= */

function formatPrayerTime(time) {

    if (!time) {
        return "--:--";
    }

    const locale = {
        bn: "bn-BD",
        en: "en-IN",
        hi: "hi-IN"
    }[getLang()] || "en-IN";

    const date =
        new Date();

    date.setHours(
        time.hour,
        time.minute,
        0,
        0
    );

    return date.toLocaleTimeString(
        locale,
        {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }
    );
}

function renderPrayerGrid() {

    const grid =
        el("prayerGrid");

    if (!grid) {
        return;
    }

    const t =
        getText();

    grid.innerHTML = "";

    PRAYER_NAMES.forEach(name => {

        const box =
            document.createElement(
                "div"
            );

        box.className =
            "prayer-box";

        const nameElement =
            document.createElement(
                "div"
            );

        nameElement.textContent =
            t.prayers[name];

        const timeElement =
            document.createElement(
                "div"
            );

        timeElement.textContent =
            formatPrayerTime(
                prayerTimes[name]
            );

        box.appendChild(
            nameElement
        );

        box.appendChild(
            timeElement
        );

        grid.appendChild(
            box
        );
    });
}


/* =========================================================
   CURRENT / NEXT PRAYER
   ========================================================= */

function prayerDate(
    time,
    baseDate = new Date()
) {

    const date =
        new Date(baseDate);

    date.setHours(
        time.hour,
        time.minute,
        0,
        0
    );

    return date;
}

function getCurrentPrayer() {

    const now =
        new Date();

    let current =
        null;

    for (const name of PRAYER_NAMES) {

        const time =
            prayerTimes[name];

        if (!time) {
            continue;
        }

        const prayerTime =
            prayerDate(
                time,
                now
            );

        if (now >= prayerTime) {
            current = name;
        }
    }

    return current;
}

function getNextPrayer() {

    const now =
        new Date();

    for (const name of PRAYER_NAMES) {

        const time =
            prayerTimes[name];

        if (!time) {
            continue;
        }

        const prayerTime =
            prayerDate(
                time,
                now
            );

        if (prayerTime > now) {

            return {
                name,
                date: prayerTime
            };
        }
    }

    const tomorrow =
        new Date(now);

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    if (prayerTimes.Fajr) {

        return {
            name: "Fajr",
            date: prayerDate(
                prayerTimes.Fajr,
                tomorrow
            )
        };
    }

    return null;
}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function updateCountdown(target) {

    const difference =
        target.getTime() -
        Date.now();

    if (difference <= 0) {
        setText(
            "countdown",
            "00:00:00"
        );
        return;
    }

    const totalSeconds =
        Math.floor(
            difference / 1000
        );

    const hours =
        Math.floor(
            totalSeconds / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;

    setText(
        "countdown",
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`
    );
}

function updatePrayerStatus() {

    if (
        Object.keys(prayerTimes).length !== 5
    ) {
        return;
    }

    const t =
        getText();

    const current =
        getCurrentPrayer();

    const next =
        getNextPrayer();

    setText(
        "currentPrayerName",
        current
            ? `${t.current}: ${t.prayers[current]}`
            : t.beforeFajr
    );

    if (!next) {

        setText(
            "nextPrayerName",
            ""
        );

        setText(
            "countdown",
            ""
        );

        return;
    }

    setText(
        "nextPrayerName",
        `${t.next}: ${t.prayers[next.name]}`
    );

    updateCountdown(
        next.date
    );
}


/* =========================================================
   AZAN
   ========================================================= */

const azanAudio =
    new Audio();

azanAudio.preload =
    "auto";

let azanPlayed = {};

function azanKey(
    prayerName,
    time
) {

    return `${todayKey()}_${prayerName}_${time}`;
}

function checkAzan() {

    if (
        Object.keys(prayerTimes).length !== 5
    ) {
        return;
    }

    const now =
        new Date();

    const currentSeconds =
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds();

    for (const name of PRAYER_NAMES) {

        const time =
            prayerTimes[name];

        if (!time) {
            continue;
        }

        const prayerSeconds =
            time.hour * 3600 +
            time.minute * 60;

        const difference =
            currentSeconds -
            prayerSeconds;

        if (
            difference < 0 ||
            difference > 60
        ) {
            continue;
        }

        const key =
            azanKey(
                name,
                time.text
            );

        if (azanPlayed[key]) {
            continue;
        }

        azanPlayed[key] =
            true;

        playAzan();
    }
}

function playAzan() {

    const settings =
        getSettingsSafe();

    const file =
        AZAN_FILES[
            settings.azan
        ] ||
        AZAN_FILES.makkah;

    azanAudio.src =
        file;

    azanAudio.currentTime =
        0;

    azanAudio.play()
        .catch(error => {

            console.warn(
                "Azan autoplay blocked:",
                error
            );
        });
}


/* =========================================================
   FEATURES
   ========================================================= */

function openPage(page) {

    window.location.href =
        `./html/${page}.html`;
}

function setupFeatures() {

    const pages = {
        namaz: "namaz-guide",
        quran: "quran",
        dua: "dua",
        hadith: "hadith",
        qibla: "qibla",
        tasbih: "tasbih"
    };

    Object.entries(pages)
        .forEach(([id, page]) => {

            const element =
                el(id);

            if (!element) {
                return;
            }

            element.onclick =
                () => openPage(page);
        });
}


/* =========================================================
   SETTINGS TILE
   ========================================================= */

function addSettingsTile() {

    const grid =
        el("prayerGrid");

    if (!grid) {
        return;
    }

    if (
        document.getElementById(
            "settingsTile"
        )
    ) {
        return;
    }

    const tile =
        document.createElement(
            "div"
        );

    tile.className =
        "prayer-box";

    tile.id =
        "settingsTile";

    tile.textContent =
        getText().settings;

    tile.style.cursor =
        "pointer";

    tile.onclick =
        () => openPage("settings");

    grid.appendChild(
        tile
    );
}


/* =========================================================
   BOTTOM QUOTE
   ========================================================= */

function updateBottomQuote() {

    const t =
        getText();

    const quotes =
        t.quotes;

    if (!quotes.length) {
        return;
    }

    const index =
        new Date().getDate() %
        quotes.length;

    setText(
        "bottomText",
        quotes[index]
    );
}


/* =========================================================
   CARD NAVIGATION
   ========================================================= */

function setupHomeCards() {

    const bismillah =
        el("bismillahCard");

    if (bismillah) {

        bismillah.onclick =
            () => openPage(
                "allah-names"
            );
    }

    const statusCards =
        document.querySelectorAll(
            ".status"
        );

    statusCards.forEach(card => {

        card.style.cursor =
            "pointer";

        card.onclick =
            () => openPage(
                "calendar"
            );
    });
}


/* =========================================================
   MAIN LOCATION INITIALIZATION
   ========================================================= */

let initialized =
    false;

function initWithLocation(
    lat,
    lon
) {

    if (initialized) {
        return;
    }

    initialized =
        true;

    currentLocation.lat =
        lat;

    currentLocation.lon =
        lon;

    loadWeather(
        lat,
        lon
    );

    loadPrayerTimes(
        lat,
        lon
    );
}


/* =========================================================
   MIDNIGHT RESET
   ========================================================= */

let lastDate =
    todayKey();

function checkDateChange() {

    const currentDate =
        todayKey();

    if (
        currentDate === lastDate
    ) {
        return;
    }

    lastDate =
        currentDate;

    prayerTimes = {};

    azanPlayed = {};

    initialized =
        false;

    getLocation();
}


/* =========================================================
   START APP
   ========================================================= */

function startHome() {

    applyHomeSettings();

    updateClock();

    updateBottomQuote();

    setupFeatures();

    setupHomeCards();

    addSettingsTile();

    getLocation();

    setInterval(
        updateClock,
        1000
    );

    setInterval(
        updatePrayerStatus,
        1000
    );

    setInterval(
        checkAzan,
        1000
    );

    setInterval(
        checkDateChange,
        30000
    );
}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startHome
    );

} else {

    startHome();
}
