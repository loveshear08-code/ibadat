document.addEventListener("DOMContentLoaded", function () {

    const s = getSettings();
    applySettings();

    let currentLang = s.lang || "bn";
    let prayerList = [];
    let azanAudio = new Audio();
    let azanUnlocked = false;
    let lastAzanAttempt = null;

    const AZAN_FILES = {
        makkah: "assets/Makkah.mp3",
        madinah: "assets/madinah.mp3",
        kuwait: "assets/kuwait.mp3",
        bangladesh: "assets/bangladesh.mp3",
        alaska: "assets/alaska.mp3"
    };

    const TEXT = {
        bn: {
            bismillah: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
            days: ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"],
            weather: "আবহাওয়া লোড হচ্ছে...",
            weatherOffline: "ইন্টারনেট সংযোগ নেই",
            prayerOffline: "নামাজের সময় পাওয়া যাচ্ছে না",
            settings: "সেটিংস",
            noCurrent: "—",
            next: "পরবর্তী",
            current: "বর্তমান",
            azanFailed: "আজান বাজাতে ট্যাপ করুন",
            features: {
                namaz: "📚 নামাজ শিক্ষা",
                quran: "🕌 আল কুরআন",
                dua: "🤲 দোয়া",
                hadith: "📖 হাদিস",
                qibla: "🕋 কিবলা",
                tasbih: "📿 তসবিহ"
            },
            quotes: [
                "নামাজ জান্নাতের চাবি",
                "আল্লাহকে স্মরণ করো",
                "ধৈর্য ধরো"
            ],
            prayer: ["ফজর", "যোহর", "আসর", "মাগরিব", "এশা"]
        },

        en: {
            bismillah: "In the name of Allah, Most Merciful",
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weather: "Loading weather...",
            weatherOffline: "No internet connection",
            prayerOffline: "Prayer times unavailable",
            settings: "Settings",
            noCurrent: "—",
            next: "Next",
            current: "Current",
            azanFailed: "Tap to play Azan",
            features: {
                namaz: "📚 Namaz Guide",
                quran: "🕌 Al Quran",
                dua: "🤲 Dua",
                hadith: "📖 Hadith",
                qibla: "🕋 Qibla",
                tasbih: "📿 Tasbih"
            },
            quotes: [
                "Prayer is the key to Jannah",
                "Remember Allah",
                "Have patience"
            ],
            prayer: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
        },

        hi: {
            bismillah: "अल्लाह के नाम से जो रहमान और रहीम है",
            days: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
            weather: "मौसम लोड हो रहा है...",
            weatherOffline: "इंटरनेट कनेक्शन नहीं है",
            prayerOffline: "नमाज़ का समय उपलब्ध नहीं है",
            settings: "सेटिंग",
            noCurrent: "—",
            next: "अगली",
            current: "वर्तमान",
            azanFailed: "अज़ान बजाने के लिए टैप करें",
            features: {
                namaz: "📚 नमाज़ गाइड",
                quran: "🕌 अल कुरआन",
                dua: "🤲 दुआ",
                hadith: "📖 हदीस",
                qibla: "🕋 क़िबला",
                tasbih: "📿 तस्बीह"
            },
            quotes: [
                "नमाज़ जन्नत की चाबी है",
                "अल्लाह को याद करो",
                "सब्र करो"
            ],
            prayer: ["फ़ज्र", "ज़ुहर", "असर", "मग़रिब", "इशा"]
        }
    };

    const t = TEXT[s.lang] || TEXT.bn;

    const MONTHS = {
        bn: [
            "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
            "মে", "জুন", "জুলাই", "আগস্ট",
            "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
        ],
        en: [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ],
        hi: [
            "जनवरी", "फ़रवरी", "मार्च", "अप्रैल",
            "मई", "जून", "जुलाई", "अगस्त",
            "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
        ]
    };

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }

    function formatNumber(num) {
        const str = String(num);

        if (s.lang === "bn") {
            return str.replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
        }

        if (s.lang === "hi") {
            return str.replace(/[0-9]/g, d => "०१२३४५६७८९"[d]);
        }

        return str;
    }

    function formatTime(time) {
        if (!time) return "";
        return formatNumber(time);
    }

    function getTodayKey() {
        const d = new Date();

        return [
            d.getFullYear(),
            String(d.getMonth() + 1).padStart(2, "0"),
            String(d.getDate()).padStart(2, "0")
        ].join("-");
    }

    function savePrayerCache(data) {
        try {
            localStorage.setItem(
                "ibadatPrayerCache",
                JSON.stringify({
                    date: getTodayKey(),
                    timings: data
                })
            );
        } catch (e) {
            console.log("Prayer cache save failed:", e);
        }
    }

    function loadPrayerCache() {
        try {
            const saved = localStorage.getItem("ibadatPrayerCache");
            if (!saved) return null;

            const data = JSON.parse(saved);

            if (
                data &&
                data.date === getTodayKey() &&
                data.timings
            ) {
                return data.timings;
            }
        } catch (e) {
            console.log("Prayer cache read failed:", e);
        }

        return null;
    }

    setText("bismillahMeaning", t.bismillah);

    function updateClock() {
        const d = new Date();

        const time =
            String(d.getHours()).padStart(2, "0") + ":" +
            String(d.getMinutes()).padStart(2, "0") + ":" +
            String(d.getSeconds()).padStart(2, "0");

        setText("clock", formatNumber(time));
    }

    updateClock();
    setInterval(updateClock, 1000);

    let lat = 22.5726;
    let lon = 88.3639;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                lat = pos.coords.latitude;
                lon = pos.coords.longitude;
                initAll();
            },
            () => {
                initAll();
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    } else {
        initAll();
    }

    function initAll() {
        setCity(lat, lon);
        loadWeather(lat, lon);
        loadPrayer(lat, lon);
    }

    async function setCity(lat, lon) {
        try {
            const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );

            if (!res.ok) throw new Error("City API failed");

            const data = await res.json();

            let city =
                data.city ||
                data.locality ||
                data.principalSubdivision ||
                "Kolkata";

            if (s.lang === "bn" && city === "Kolkata") {
                city = "কলকাতা";
            }

            if (s.lang === "hi" && city === "Kolkata") {
                city = "कोलकाता";
            }

            setText("city", city);

        } catch (error) {
            console.log("City error:", error);

            if (s.lang === "bn") {
                setText("city", "কলকাতা");
            } else if (s.lang === "hi") {
                setText("city", "कोलकाता");
            } else {
                setText("city", "Kolkata");
            }
        }
    }

    async function loadWeather(lat, lon) {
        try {

            // Open-Meteo does not require an API key.
            const url =
                `https://api.open-meteo.com/v1/forecast` +
                `?latitude=${lat}` +
                `&longitude=${lon}` +
                `&current=temperature_2m,weather_code` +
                `&timezone=auto`;

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error("Weather API failed");
            }

            const data = await res.json();

            const temp = Math.round(data.current.temperature_2m);
            const code = data.current.weather_code;

            const desc = getWeatherDescription(code);

            setText(
                "weather",
                formatNumber(`${temp}°C ${desc}`)
            );

        } catch (error) {
            console.log("Weather error:", error);
            setText("weather", t.weatherOffline);
        }
    }

    function getWeatherDescription(code) {

        const map = {
            0: {
                bn: "☀️ পরিষ্কার",
                en: "☀️ Clear",
                hi: "☀️ साफ"
            },
            1: {
                bn: "🌤️ প্রধানত পরিষ্কার",
                en: "🌤️ Mainly clear",
                hi: "🌤️ मुख्यतः साफ"
            },
            2: {
                bn: "⛅ আংশিক মেঘলা",
                en: "⛅ Partly cloudy",
                hi: "⛅ आंशिक बादल"
            },
            3: {
                bn: "☁️ মেঘলা",
                en: "☁️ Overcast",
                hi: "☁️ बादल"
            },
            45: {
                bn: "🌫️ কুয়াশা",
                en: "🌫️ Fog",
                hi: "🌫️ कोहरा"
            },
            48: {
                bn: "🌫️ ঘন কুয়াশা",
                en: "🌫️ Fog",
                hi: "🌫️ घना कोहरा"
            },
            51: {
                bn: "🌦️ হালকা গুঁড়ি বৃষ্টি",
                en: "🌦️ Light drizzle",
                hi: "🌦️ हल्की बूंदाबांदी"
            },
            53: {
                bn: "🌦️ গুঁড়ি বৃষ্টি",
                en: "🌦️ Drizzle",
                hi: "🌦️ बूंदाबांदी"
            },
            55: {
                bn: "🌧️ ভারী গুঁড়ি বৃষ্টি",
                en: "🌧️ Heavy drizzle",
                hi: "🌧️ तेज़ बूंदाबांदी"
            },
            61: {
                bn: "🌧️ হালকা বৃষ্টি",
                en: "🌧️ Light rain",
                hi: "🌧️ हल्की बारिश"
            },
            63: {
                bn: "🌧️ বৃষ্টি",
                en: "🌧️ Rain",
                hi: "🌧️ बारिश"
            },
            65: {
                bn: "🌧️ ভারী বৃষ্টি",
                en: "🌧️ Heavy rain",
                hi: "🌧️ तेज़ बारिश"
            },
            80: {
                bn: "🌦️ বৃষ্টির ঝাপটা",
                en: "🌦️ Rain showers",
                hi: "🌦️ बारिश की बौछार"
            },
            81: {
                bn: "🌦️ বৃষ্টির ঝাপটা",
                en: "🌦️ Rain showers",
                hi: "🌦️ बारिश की बौछार"
            },
            82: {
                bn: "⛈️ ভারী বৃষ্টির ঝাপটা",
                en: "⛈️ Heavy rain showers",
                hi: "⛈️ तेज़ बारिश की बौछार"
            },
            95: {
                bn: "⛈️ বজ্রঝড়",
                en: "⛈️ Thunderstorm",
                hi: "⛈️ गरज के साथ तूफ़ान"
            }
        };

        const item = map[code] || map[0];

        return item[s.lang] || item.en;
    }

    async function loadPrayer(lat, lon) {

        try {

            const url =
                `https://api.aladhan.com/v1/timings` +
                `?latitude=${lat}` +
                `&longitude=${lon}` +
                `&method=1`;

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error("Prayer API failed");
            }

            const data = await res.json();

            if (
                !data ||
                !data.data ||
                !data.data.timings
            ) {
                throw new Error("Invalid prayer data");
            }

            const tm = data.data.timings;
            const greg = data.data.date.gregorian;

            savePrayerCache(tm);

            renderDate(greg);
            setPrayerTimes(tm);

        } catch (error) {

            console.log("Prayer API error:", error);

            const cached = loadPrayerCache();

            if (cached) {

                setPrayerTimes(cached);

                const now = new Date();

                renderDate({
                    day: String(now.getDate()),
                    month: {
                        number: now.getMonth() + 1
                    },
                    year: now.getFullYear(),
                    weekday: {
                        en: now.toLocaleDateString("en-US", {
                            weekday: "long"
                        })
                    }
                });

            } else {

                prayerList = [];
                renderGrid();
                setText("nextPrayerName", t.prayerOffline);
                setText("currentPrayerName", "");
                setText("countdown", "--:--:--");
            }
        }
    }

    function renderDate(greg) {

        const monthList =
            MONTHS[s.lang] || MONTHS.bn;

        const monthName =
            monthList[Number(greg.month.number) - 1];

        const gregText = formatNumber(
            `${greg.day} ${monthName} ${greg.year}`
        );

        setText("date", gregText);

        const dayMap = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6
        };

        const dayIndex = dayMap[greg.weekday.en];

        if (dayIndex !== undefined) {
            setText(
                "todayDay",
                t.days[dayIndex]
            );
        }
    }

    function setPrayerTimes(tm) {

        prayerList = [
            [t.prayer[0], tm.Fajr],
            [t.prayer[1], tm.Dhuhr],
            [t.prayer[2], tm.Asr],
            [t.prayer[3], tm.Maghrib],
            [t.prayer[4], tm.Isha]
        ];

        renderGrid();
        updateStatus();
    }

    function parsePrayerTime(time) {

        if (!time) return null;

        const clean = String(time).split(" ")[0];

        const parts = clean.split(":");

        if (parts.length < 2) return null;

        const h = Number(parts[0]);
        const m = Number(parts[1]);

        if (
            Number.isNaN(h) ||
            Number.isNaN(m)
        ) {
            return null;
        }

        const d = new Date();

        d.setHours(h, m, 0, 0);

        return d;
    }

    function getNext() {

        const now = new Date();

        const valid = prayerList
            .map(p => ({
                name: p[0],
                time: parsePrayerTime(p[1])
            }))
            .filter(p => p.time);

        for (const p of valid) {

            if (now < p.time) {
                return p;
            }
        }

        if (!valid.length) return null;

        const tomorrow = new Date();
        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const first = parsePrayerTime(
            prayerList[0][1]
        );

        if (!first) return null;

        tomorrow.setHours(
            first.getHours(),
            first.getMinutes(),
            0,
            0
        );

        return {
            name: prayerList[0][0],
            time: tomorrow
        };
    }

    function getCurrent() {

        const now = new Date();

        const valid = prayerList
            .map(p => ({
                name: p[0],
                time: parsePrayerTime(p[1])
            }))
            .filter(p => p.time);

        let current = null;

        for (const p of valid) {

            if (now >= p.time) {
                current = p.name;
            }
        }

        return current;
    }

    function updateStatus() {

        if (!prayerList.length) return;

        const next = getNext();
        const current = getCurrent();

        setText(
            "currentPrayerName",
            current
                ? `● ${current}`
                : `● ${t.noCurrent}`
        );

        setText(
            "nextPrayerName",
            next
                ? `⏭ ${next.name}`
                : ""
        );

        if (!next) {
            setText("countdown", "--:--:--");
            return;
        }

        const diff = next.time - new Date();

        if (diff < 0) {
            setText("countdown", "00:00:00");
            return;
        }

        const hours = Math.floor(
            diff / 3600000
        );

        const minutes = Math.floor(
            (diff % 3600000) / 60000
        );

        const seconds = Math.floor(
            (diff % 60000) / 1000
        );

        const time =
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        setText(
            "countdown",
            formatNumber(time)
        );
    }

    setInterval(updateStatus, 1000);

    function getAzanKey(prayerName, time) {

        return `${getTodayKey()}_${prayerName}_${time}`;
    }

    function showAzanFallback(prayerName) {

        let box = document.getElementById(
            "azanFallback"
        );

        if (!box) {

            box = document.createElement("button");

            box.id = "azanFallback";

            box.style.position = "fixed";
            box.style.left = "50%";
            box.style.bottom = "65px";
            box.style.transform = "translateX(-50%)";
            box.style.zIndex = "9999";
            box.style.padding = "12px 18px";
            box.style.border = "none";
            box.style.borderRadius = "12px";
            box.style.background = "#2e7d32";
            box.style.color = "#fff";
            box.style.fontSize = "16px";
            box.style.fontWeight = "bold";
            box.style.cursor = "pointer";

            document.body.appendChild(box);
        }

        box.innerText =
            `🔊 ${prayerName} — ${t.azanFailed}`;

        box.onclick = function () {

            unlockAzanAudio();

            playAzan(prayerName, true);

            box.remove();
        };
    }

    function unlockAzanAudio() {

        if (azanUnlocked) return;

        const selected =
            getSettings().azan || "makkah";

        const file =
            AZAN_FILES[selected] ||
            AZAN_FILES.makkah;

        azanAudio.src = file;
        azanAudio.volume = 0;

        const promise = azanAudio.play();

        if (promise) {

            promise
                .then(() => {

                    azanAudio.pause();
                    azanAudio.currentTime = 0;
                    azanAudio.volume = 1;
                    azanUnlocked = true;

                })
                .catch(() => {
                    azanAudio.volume = 1;
                });
        }
    }

    document.addEventListener(
        "pointerdown",
        unlockAzanAudio,
        { once: true }
    );

    function playAzan(prayerName, manual = false) {

        const selected =
            getSettings().azan || "makkah";

        const file =
            AZAN_FILES[selected] ||
            AZAN_FILES.makkah;

        azanAudio.src = file;
        azanAudio.currentTime = 0;
        azanAudio.volume = 1;

        const promise = azanAudio.play();

        if (promise) {

            promise
                .then(() => {

                    lastAzanAttempt =
                        getAzanKey(
                            prayerName,
                            getPrayerTimeByName(prayerName)
                        );

                })
                .catch(error => {

                    console.log(
                        "Azan playback failed:",
                        error
                    );

                    if (!manual) {
                        showAzanFallback(
                      
