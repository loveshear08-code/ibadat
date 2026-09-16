/* =========================================================
   IBADAT - HOME.JS
   ========================================================= */


/* ================= DEFAULT LOCATION ================= */

const DEFAULT_LOCATION = {
    lat: 22.5726,
    lon: 88.3639,
    city: "Kolkata"
};


/* ================= CACHE ================= */

const PRAYER_CACHE_KEY = "ibadatPrayerCache";


/* ================= AZAN FILES ================= */
/* IMPORTANT:
   settings.js already has AZAN_FILES.
   তাই এখানে একই নাম ব্যবহার করা হয়নি।
*/

const HOME_AZAN_FILES = {
    makkah: "assets/makkah.mp3",
    madinah: "assets/madinah.mp3",
    kuwait: "assets/kuwait.mp3",
    bangladesh: "assets/bangladesh.mp3",
    alaska: "assets/alaska.mp3"
};


/* ================= HOME TEXT ================= */

const HOME_TEXT = {

    bn: {

        bismillah:
            "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে",

        prayers: {
            Fajr: "ফজর",
            Dhuhr: "যোহর",
            Asr: "আসর",
            Maghrib: "মাগরিব",
            Isha: "এশা"
        },

        current: "বর্তমান",
        next: "পরবর্তী",

        weatherLoading:
            "আবহাওয়া লোড হচ্ছে...",

        weatherUnavailable:
            "আবহাওয়া পাওয়া যাচ্ছে না",

        beforeFajr:
            "ফজরের আগে",

        afterIsha:
            "এশার পর",

        settings:
            "⚙️ সেটিং",

        features: {
            namaz: "নামাজ",
            quran: "কুরআন",
            dua: "দোয়া",
            hadith: "হাদিস",
            qibla: "কিবলা",
            tasbih: "তাসবিহ"
        },

        quotes: [
            "নামাজ মুমিনের মেরাজ।",
            "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সঙ্গে আছেন।",
            "আল্লাহকে স্মরণ করো, তিনি তোমাদের স্মরণ করবেন।",
            "আল্লাহর রহমত থেকে নিরাশ হয়ো না।",
            "নিশ্চয়ই কষ্টের সাথে স্বস্তি রয়েছে।",
            "আল্লাহর উপর ভরসা করো।",
            "সবর করো, নিশ্চয়ই আল্লাহ সবরকারীদের সাথে আছেন।"
        ]
    },


    en: {

        bismillah:
            "In the name of Allah, the Most Gracious, the Most Merciful",

        prayers: {
            Fajr: "Fajr",
            Dhuhr: "Dhuhr",
            Asr: "Asr",
            Maghrib: "Maghrib",
            Isha: "Isha"
        },

        current: "Current",
        next: "Next",

        weatherLoading:
            "Loading weather...",

        weatherUnavailable:
            "Weather unavailable",

        beforeFajr:
            "Before Fajr",

        afterIsha:
            "After Isha",

        settings:
            "⚙️ Settings",

        features: {
            namaz: "Namaz",
            quran: "Quran",
            dua: "Dua",
            hadith: "Hadith",
            qibla: "Qibla",
            tasbih: "Tasbih"
        },

        quotes: [
            "Prayer is the ascension of a believer.",
            "Indeed, Allah is with the patient.",
            "Remember Allah, and He will remember you.",
            "Do not despair of the mercy of Allah.",
            "Indeed, with hardship comes ease.",
            "Put your trust in Allah.",
            "Be patient. Surely Allah is with the patient."
        ]
    },


    hi: {

        bismillah:
            "सबसे कृपाशील और दयालु अल्लाह के नाम से",

        prayers: {
            Fajr: "फ़ज्र",
            Dhuhr: "ज़ुहर",
            Asr: "असर",
            Maghrib: "मग़रिब",
            Isha: "ईशा"
        },

        current: "वर्तमान",
        next: "अगली",

        weatherLoading:
            "मौसम लोड हो रहा है...",

        weatherUnavailable:
            "मौसम उपलब्ध नहीं है",

        beforeFajr:
            "फ़ज्र से पहले",

        afterIsha:
            "ईशा के बाद",

        settings:
            "⚙️ सेटिंग",

        features: {
            namaz: "नमाज़",
            quran: "क़ुरआन",
            dua: "दुआ",
            hadith: "हदीस",
            qibla: "क़िबला",
            tasbih: "तस्बीह"
        },

        quotes: [
            "नमाज़ मोमिन की मेराज है।",
            "निश्चय ही अल्लाह सब्र करने वालों के साथ है।",
            "अल्लाह को याद करो, वह तुम्हें याद करेगा।",
            "अल्लाह की रहमत से निराश मत हो।",
            "निश्चय ही कठिनाई के साथ आसानी है।",
            "अल्लाह पर भरोसा रखो।",
            "सब्र करो, निश्चय ही अल्लाह सब्र करने वालों के साथ है।"
        ]
    }
};


/* ================= PRAYER LIST ================= */

const PRAYER_NAMES = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha"
];


/* ================= GLOBAL VARIABLES ================= */

let currentLocation = {
    ...DEFAULT_LOCATION
};

let prayerTimes = {};

let prayerDate = null;

let azanPlayed = {};

let lastDateKey = "";


/* ================= ELEMENT ================= */

function el(id) {
    return document.getElementById(id);
}


/* ================= SET TEXT ================= */

function setText(id, value) {

    const element = el(id);

    if (element) {
        element.innerText = value;
    }
}


/* ================= SETTINGS ================= */

function getHomeSettings() {

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

        const data =
            JSON.parse(saved);

        return {

            lang:
                ["bn", "en", "hi"].includes(data.lang)
                    ? data.lang
                    : "bn",

            dark:
                data.dark === true,

            azan:
                HOME_AZAN_FILES[data.azan]
                    ? data.azan
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


/* ================= LANGUAGE ================= */

function getLang() {

    return getHomeSettings().lang;
}


function getHomeText() {

    return (
        HOME_TEXT[getLang()] ||
        HOME_TEXT.bn
    );
}


/* ================= APPLY HOME SETTINGS ================= */

function applyHomeSettings() {

    const settings =
        getHomeSettings();

    const text =
        HOME_TEXT[settings.lang] ||
        HOME_TEXT.bn;


    document.documentElement.lang =
        settings.lang;


    setText(
        "bismillahMeaning",
        text.bismillah
    );


    setText(
        "namaz",
        text.features.namaz
    );

    setText(
        "quran",
        text.features.quran
    );

    setText(
        "dua",
        text.features.dua
    );

    setText(
        "hadith",
        text.features.hadith
    );

    setText(
        "qibla",
        text.features.qibla
    );

    setText(
        "tasbih",
        text.features.tasbih
    );


    if (settings.dark) {

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );
    }


    document.title =
        settings.lang === "bn"
            ? "ইবাদত"
            : settings.lang === "hi"
                ? "इबादत"
                : "IBADAT";
}


/* ================= CLOCK ================= */

function updateClock() {

    const now =
        new Date();

    const lang =
        getLang();


    let locale =
        "bn-BD";

    if (lang === "en") {
        locale = "en-IN";
    }

    if (lang === "hi") {
        locale = "hi-IN";
    }


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


    const date =
        now.toLocaleDateString(
            locale,
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    const day =
        now.toLocaleDateString(
            locale,
            {
                weekday: "long"
            }
        );


    setText(
        "clock",
        time
    );

    setText(
        "date",
        date
    );

    setText(
        "todayDay",
        day
    );
}


/* ================= LOCATION ================= */

function setCity(city) {

    setText(
        "city",
        city || DEFAULT_LOCATION.city
    );
}


async function reverseGeocode(
    latitude,
    longitude
) {

    try {

        const url =
            "https://api.bigdatacloud.net/data/reverse-geocode-client" +
            "?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&localityLanguage=en";


        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error(
                "Reverse geocode failed"
            );
        }


        const data =
            await response.json();


        return (
            data.city ||
            data.locality ||
            data.principalSubdivision ||
            DEFAULT_LOCATION.city
        );

    } catch (error) {

        console.warn(
            "City detection error:",
            error
        );

        return DEFAULT_LOCATION.city;
    }
}


function getLocation() {

    if (!navigator.geolocation) {

        currentLocation = {
            ...DEFAULT_LOCATION
        };

        setCity(
            DEFAULT_LOCATION.city
        );

        initializeLocationData();

        return;
    }


    navigator.geolocation.getCurrentPosition(

        async function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            currentLocation = {

                lat: latitude,

                lon: longitude,

                city: DEFAULT_LOCATION.city
            };


            setCity("Loading...");


            const city =
                await reverseGeocode(
                    latitude,
                    longitude
                );


            currentLocation.city =
                city;


            setCity(city);


            initializeLocationData();
        },


        function(error) {

            console.warn(
                "Location permission/error:",
                error
            );


            currentLocation = {
                ...DEFAULT_LOCATION
            };


            setCity(
                DEFAULT_LOCATION.city
            );


            initializeLocationData();
        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}


/* ================= WEATHER ================= */

async function loadWeather() {

    const text =
        getHomeText();


    setText(
        "weather",
        text.weatherLoading
    );


    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" +
            currentLocation.lat +
            "&longitude=" +
            currentLocation.lon +
            "&current=temperature_2m,weather_code" +
            "&timezone=auto";


        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error(
                "Weather API error"
            );
        }


        const data =
            await response.json();


        if (
            !data.current
        ) {

            throw new Error(
                "Weather data unavailable"
            );
        }


        const temperature =
            data.current.temperature_2m;

        const code =
            data.current.weather_code;


        const icon =
            getWeatherIcon(code);


        setText(
            "weather",
            icon +
            " " +
            Math.round(temperature) +
            "°C"
        );

    } catch (error) {

        console.warn(
            "Weather error:",
            error
        );


        setText(
            "weather",
            text.weatherUnavailable
        );
    }
}


/* ================= WEATHER ICON ================= */

function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }

    if (
        code === 1 ||
        code === 2
    ) {
        return "🌤️";
    }

    if (code === 3) {
        return "☁️";
    }

    if (
        code >= 45 &&
        code <= 48
    ) {
        return "🌫️";
    }

    if (
        code >= 51 &&
        code <= 67
    ) {
        return "🌧️";
    }

    if (
        code >= 71 &&
        code <= 77
    ) {
        return "❄️";
    }

    if (
        code >= 80 &&
        code <= 82
    ) {
        return "🌦️";
    }

    if (code >= 95) {
        return "⛈️";
    }

    return "🌤️";
}


/* ================= DATE KEY ================= */

function getTodayKey() {

    const now =
        new Date();


    return (
        now.getFullYear() +
        "-" +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            now.getDate()
        ).padStart(2, "0")
    );
}


/* ================= CLEAN PRAYER TIME ================= */

function cleanPrayerTime(value) {

    if (!value) {
        return null;
    }


    const time =
        String(value)
            .split(" ")[0]
            .trim();


    if (
        !/^\d{1,2}:\d{2}$/.test(time)
    ) {

        return null;
    }


    return time;
}


/* ================= SAVE CACHE ================= */

function savePrayerCache(
    key,
    data
) {

    try {

        localStorage.setItem(
            PRAYER_CACHE_KEY,
            JSON.stringify({
                key: key,
                data: data
            })
        );

    } catch (error) {

        console.warn(
            "Cache save error:",
            error
        );
    }
}


/* ================= GET CACHE ================= */

function getPrayerCache(key) {

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
            data &&
            data.key === key &&
            data.data
        ) {

            return data.data;
        }

    } catch (error) {

        console.warn(
            "Cache read error:",
            error
        );
    }


    return null;
}


/* ================= LOAD PRAYER TIMES ================= */

async function loadPrayerTimes() {

    const todayKey =
        getTodayKey();


    if (
        prayerDate === todayKey &&
        Object.keys(prayerTimes).length > 0
    ) {

        return;
    }


    const cached =
        getPrayerCache(
            todayKey
        );


    if (cached) {

        prayerTimes =
            cached;

        prayerDate =
            todayKey;


        renderPrayerGrid();

        updatePrayerStatus();

        return;
    }


    try {

        const timestamp =
            Math.floor(
                Date.now() / 1000
            );


        const url =
            "https://api.aladhan.com/v1/timings/" +
            timestamp +
            "?latitude=" +
            currentLocation.lat +
            "&longitude=" +
            currentLocation.lon +
            "&method=1";


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Prayer API error"
            );
        }


        const result =
            await response.json();


        if (
            !result.data ||
            !result.data.timings
        ) {

            throw new Error(
                "Prayer data missing"
            );
        }


        const timings =
            result.data.timings;


        const cleaned = {};


        PRAYER_NAMES.forEach(
            function(name) {

                cleaned[name] =
                    cleanPrayerTime(
                        timings[name]
                    );
            }
        );


        prayerTimes =
            cleaned;

        prayerDate =
            todayKey;


        savePrayerCache(
            todayKey,
            cleaned
        );


        renderPrayerGrid();

        updatePrayerStatus();

    } catch (error) {

        console.error(
            "Prayer time error:",
            error
        );


        renderPrayerError();
    }
}


/* ================= RENDER PRAYER GRID ================= */

function renderPrayerGrid() {

    const grid =
        el("prayerGrid");


    if (!grid) {
        return;
    }


    const text =
        getHomeText();


    grid.innerHTML = "";


    PRAYER_NAMES.forEach(
        function(name) {

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


            nameElement.innerText =
                text.prayers[name];


            const timeElement =
                document.createElement(
                    "div"
                );


            timeElement.innerText =
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
        }
    );
}


/* ================= PRAYER ERROR ================= */

function renderPrayerError() {

    const grid =
        el("prayerGrid");


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    PRAYER_NAMES.forEach(
        function(name) {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "prayer-box";


            box.innerText =
                name;


            grid.appendChild(
                box
            );
        }
    );
}


/* ================= FORMAT TIME ================= */

function formatPrayerTime(time) {

    if (
        !time ||
        time === "--:--"
    ) {

        return "--:--";
    }


    const parts =
        time.split(":");


    let hour =
        Number(parts[0]);


    const minute =
        parts[1];


    if (Number.isNaN(hour)) {
        return time;
    }


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12;


    if (hour === 0) {
        hour = 12;
    }


    return (
        String(hour).padStart(2, "0") +
        ":" +
        minute +
        " " +
        period
    );
}


/* ================= PRAYER DATE TIME ================= */

function getPrayerDateTime(
    time,
    dayOffset
) {

    if (!time) {
        return null;
    }


    const parts =
        time.split(":");


    if (parts.length !== 2) {
        return null;
    }


    const date =
        new Date();


    date.setDate(
        date.getDate() +
        (dayOffset || 0)
    );


    date.setHours(
        Number(parts[0]),
        Number(parts[1]),
        0,
        0
    );


    return date;
}


/* ================= PRAYER STATUS ================= */

function updatePrayerStatus() {

    if (
        !prayerTimes ||
        Object.keys(prayerTimes).length === 0
    ) {

        return;
    }


    const now =
        new Date();


    let current =
        null;

    let next =
        null;


    for (
        let i = 0;
        i < PRAYER_NAMES.length;
        i++
    ) {

        const name =
            PRAYER_NAMES[i];


        const time =
            prayerTimes[name];


        const prayerDateTime =
            getPrayerDateTime(
                time,
                0
            );


        if (!prayerDateTime) {
            continue;
        }


        if (
            prayerDateTime <= now
        ) {

            current = {
                name: name,
                time: time,
                date: prayerDateTime
            };

        } else {

            if (!next) {

                next = {
                    name: name,
                    time: time,
                    date: prayerDateTime
                };
            }
        }
    }


    const text =
        getHomeText();


    if (current) {

        setText(
            "currentPrayerName",
            text.current +
            ": " +
            text.prayers[current.name]
        );

    } else {

        setText(
            "currentPrayerName",
            text.beforeFajr
        );
    }


    if (!next) {

        const tomorrowFajr =
            getPrayerDateTime(
                prayerTimes.Fajr,
                1
            );


        if (tomorrowFajr) {

            next = {
                name: "Fajr",
                time: prayerTimes.Fajr,
                date: tomorrowFajr
            };

        } else {

            setText(
                "nextPrayerName",
                text.afterIsha
            );

            setText(
                "countdown",
                "--:--:--"
            );

            return;
        }
    }


    setText(
        "nextPrayerName",
        text.next +
        ": " +
        text.prayers[next.name]
    );


    updateCountdown(
        next.date
    );
}


/* ================= COUNTDOWN ================= */

function updateCountdown(
    targetDate
) {

    if (!targetDate) {
        return;
    }


    const now =
        new Date();


    let seconds =
        Math.floor(
            (
                targetDate.getTime() -
                now.getTime()
            ) / 1000
        );


    if (seconds < 0) {
        seconds = 0;
    }


    const hours =
        Math.floor(
            seconds / 3600
        );


    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );


    const remainingSeconds =
        seconds % 60;


    setText(
        "countdown",
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}


/* ================= AZAN ================= */

function playHomeAzan() {

    const settings =
        getHomeSettings();


    const file =
        HOME_AZAN_FILES[
            settings.azan
        ] ||
        HOME_AZAN_FILES.makkah;


    const audio =
        new Audio(file);


    audio.play().catch(
        function(error) {

            console.warn(
                "Azan autoplay blocked:",
                error
            );
        }
    );
}


/* ================= CHECK AZAN ================= */

function checkAzan() {

    if (
        !prayerTimes ||
        Object.keys(prayerTimes).length === 0
    ) {

        return;
    }


    const now =
        new Date();


    const todayKey =
        getTodayKey();


    if (
        lastDateKey !== todayKey
    ) {

        azanPlayed = {};

        lastDateKey =
            todayKey;
    }


    PRAYER_NAMES.forEach(
        function(name) {

            const time =
                prayerTimes[name];


            if (!time) {
                return;
            }


            const parts =
                time.split(":");


            const hour =
                Number(parts[0]);


            const minute =
                Number(parts[1]);


            if (
                hour === now.getHours() &&
                minute === now.getMinutes() &&
                now.getSeconds() < 3
            ) {

                const key =
                    todayKey +
                    "_" +
                    name;


                if (
                    !azanPlayed[key]
                ) {

                    azanPlayed[key] =
                        true;


                    playHomeAzan();
                }
            }
        }
    );
}


/* ================= FEATURE NAVIGATION ================= */

function setupFeatures() {

    const pages = {

        namaz:
            "html/namaz-guide.html",

        quran:
            "html/quran.html",

        dua:
            "html/dua.html",

        hadith:
            "html/hadith.html",

        qibla:
            "html/qibla.html",

        tasbih:
            "html/tasbih.html"
    };


    Object.keys(pages).forEach(
        function(id) {

            const button =
                el(id);


            if (!button) {
                return;
            }


            button.onclick =
                function() {

                    window.location.href =
                        pages[id];
                };
        }
    );
}


/* ================= BISMILLAH CARD ================= */

function setupBismillahCard() {

    const card =
        el("bismillahCard");


    if (!card) {
        return;
    }


    card.onclick =
        function() {

            window.location.href =
                "html/settings.html";
        };
}


/* ================= SETTINGS TILE ================= */

function addSettingsTile() {

    const grid =
        el("prayerGrid");


    if (!grid) {
        return;
    }


    if (
        el("homeSettingsTile")
    ) {

        return;
    }


    const text =
        getHomeText();


    const tile =
        document.createElement(
            "div"
        );


    tile.id =
        "homeSettingsTile";


    tile.className =
        "prayer-box";


    tile.innerText =
        text.settings;


    tile.onclick =
        function() {

            window.location.href =
                "html/settings.html";
        };


    grid.appendChild(
        tile
    );
}


/* ================= BOTTOM QUOTE ================= */

function updateBottomQuote() {

    const text =
        getHomeText();


    if (
        !text.quotes ||
        text.quotes.length === 0
    ) {

        return;
    }


    const index =
        new Date().getDate() %
        text.quotes.length;


    setText(
        "bottomText",
        text.quotes[index]
    );
}


/* ================= INITIALIZE LOCATION ================= */

function initializeLocationData() {

    loadWeather();

    loadPrayerTimes();
}


/* ================= DATE CHANGE ================= */

function checkDateChange() {

    const todayKey =
        getTodayKey();


    if (
        prayerDate &&
        prayerDate !== todayKey
    ) {

        prayerTimes = {};

        prayerDate = null;

        azanPlayed = {};

        getLocation();
    }
}


/* ================= START HOME ================= */

function startHome() {

    applyHomeSettings();

    updateClock();

    updateBottomQuote();

    setupFeatures();

    setupBismillahCard();

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


/* ================= RUN ================= */

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
