document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       IBADAT — ISLAMIC CALENDAR
       Languages: Bengali, English, Hindi
    ================================================== */

    const grid = document.getElementById("calendarGrid");
    const title = document.getElementById("monthTitle");
    const prev = document.getElementById("prevMonth");
    const next = document.getElementById("nextMonth");
    const dayNamesDiv = document.getElementById("dayNames");
    const eventsTitle = document.getElementById("eventsTitle");
    const eventsTimeline = document.getElementById("eventsTimeline");

    if (
        !grid || !title || !prev || !next ||
        !dayNamesDiv || !eventsTitle || !eventsTimeline
    ) {
        console.error("IBADAT Calendar: HTML elements missing.");
        return;
    }

    /* ================= SETTINGS ================= */

    function readSettings() {
        try {
            return JSON.parse(localStorage.getItem("appSettings")) || {};
        } catch (error) {
            return {};
        }
    }

    function getLanguage() {
        const selected = readSettings().lang || "bn";
        return ["bn", "en", "hi"].includes(selected) ? selected : "bn";
    }

    let lang = getLanguage();

    /* ================= MONTHS ================= */

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

    /* ================= WEEKDAYS ================= */

    const DAYS = {
        bn: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"],
        en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
    };

    /* ================= UI TEXT ================= */

    const TEXT = {
        bn: {
            eventsTitle: "এই মাসের ইসলামিক বিশেষ দিন",
            empty: "এই মাসের জন্য তালিকাভুক্ত কোনো বিশেষ দিন পাওয়া যায়নি।",
            loading: "ইসলামিক বিশেষ দিনের তথ্য লোড হচ্ছে…",
            error: "বিশেষ দিনের তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
            retry: "আবার চেষ্টা করুন",
            unknown: "অন্যান্য ইসলামিক বিশেষ দিন",
            translationUnavailable: "এই দিবসের বাংলা অনুবাদ যোগ করা হয়নি।",
            dateNote: "চাঁদ দেখা ও স্থানীয় সিদ্ধান্তের কারণে তারিখ এক দিন ভিন্ন হতে পারে।"
        },

        en: {
            eventsTitle: "Islamic Special Days This Month",
            empty: "No listed special days were found for this month.",
            loading: "Loading Islamic observances…",
            error: "Could not load special-day information. Check your internet connection and try again.",
            retry: "Try again",
            unknown: "Other Islamic observance",
            translationUnavailable: "Translation not yet available.",
            dateNote: "Dates may differ by one day depending on local moon sighting."
        },

        hi: {
            eventsTitle: "इस महीने के इस्लामी विशेष दिन",
            empty: "इस महीने के लिए सूचीबद्ध कोई विशेष दिन नहीं मिला।",
            loading: "इस्लामी विशेष दिनों की जानकारी लोड हो रही है…",
            error: "विशेष दिनों की जानकारी लोड नहीं हो सकी। इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
            retry: "फिर कोशिश करें",
            unknown: "अन्य इस्लामी विशेष दिन",
            translationUnavailable: "इस दिन का अनुवाद अभी उपलब्ध नहीं है।",
            dateNote: "स्थानीय चाँद दिखने के अनुसार तारीख़ एक दिन अलग हो सकती है।"
        }
    };

    /* ================= NUMBER FORMAT ================= */

    function formatNum(value) {
        const digits = {
            bn: "০১২৩৪৫৬৭৮৯",
            hi: "०१२३४५६७८९"
        };

        return String(value).replace(/\d/g, function (digit) {
            if (lang === "en") return digit;
            return digits[lang][Number(digit)];
        });
    }

    /* ================= CURATED HIJRI EVENTS =================
       Key = Hijri day-month.
       Dates depend on the Hijri calendar calculation.
    ========================================================== */

    const EVENTS = {
        "1-1": {
            bn: "ইসলামি নববর্ষ",
            en: "Islamic New Year",
            hi: "इस्लामी नव वर्ष"
        },
        "10-1": {
            bn: "আশুরা",
            en: "Ashura",
            hi: "आशूरा"
        },
        "12-3": {
            bn: "ঈদে মিলাদুন্নবী ﷺ",
            en: "Mawlid an-Nabi ﷺ",
            hi: "ईद मिलादुन्नबी ﷺ"
        },
        "27-7": {
            bn: "শবে মেরাজ",
            en: "Isra and Mi'raj",
            hi: "शबे मेराज"
        },
        "15-8": {
            bn: "শবে বরাত",
            en: "Mid-Sha'ban (Shab-e-Barat)",
            hi: "शबे बरात"
        },
        "1-9": {
            bn: "রমজানের প্রথম দিন",
            en: "First day of Ramadan",
            hi: "रमज़ान का पहला दिन"
        },
        "27-9": {
            bn: "শবে কদর (প্রচলিত তারিখ)",
            en: "Laylat al-Qadr (commonly observed date)",
            hi: "शबे क़द्र (प्रचलित तारीख़)"
        },
        "1-10": {
            bn: "ঈদুল ফিতর",
            en: "Eid al-Fitr",
            hi: "ईद-उल-फ़ित्र"
        },
        "9-12": {
            bn: "আরাফার দিন",
            en: "Day of Arafah",
            hi: "अरफ़ा का दिन"
        },
        "10-12": {
            bn: "ঈদুল আজহা",
            en: "Eid al-Adha",
            hi: "ईद-उल-अज़हा"
        },
        "11-12": {
            bn: "আইয়ামে তাশরীক",
            en: "Days of Tashreeq",
            hi: "अय्याम-ए-तशरीक़"
        },
        "12-12": {
            bn: "আইয়ামে তাশরীক",
            en: "Days of Tashreeq",
            hi: "अय्याम-ए-तशरीक़"
        },
        "13-12": {
            bn: "আইয়ামে তাশরীক",
            en: "Days of Tashreeq",
            hi: "अय्याम-ए-तशरीक़"
        }
    };

    /* ================= API NAME TRANSLATIONS =================
       Normalized API names are matched against these aliases.
    ========================================================== */

    const API_NAMES = [
        {
            keys: ["beginning of the holy months", "holy months"],
            bn: "সম্মানিত মাসসমূহের সূচনা",
            en: "Beginning of the Holy Months",
            hi: "सम्मानित महीनों की शुरुआत"
        },
        {
            keys: ["lailat ul raghaib", "lailat ul ragaib", "raghaib"],
            bn: "লাইলাতুর রাগায়িব",
            en: "Laylat al-Raghaib",
            hi: "लैलतुर रग़ाइब"
        },
        {
            keys: ["urs of shaykh muhiyuddin ibn al arabi", "muhiyuddin ibn al arabi"],
            bn: "শায়খ মুহিউদ্দিন ইবনুল আরাবির উরস",
            en: "Urs of Shaykh Muhiyuddin Ibn al-Arabi",
            hi: "शैख़ मुहियुद्दीन इब्नुल अरबी का उर्स"
        },
        {
            keys: ["urs of hazrat shaykh moin al din chishti", "moin al din chishti", "moinuddin chishti"],
            bn: "হজরত শায়খ মঈনুদ্দিন চিশতির উরস",
            en: "Urs of Hazrat Shaykh Moin al-Din Chishti",
            hi: "हज़रत शैख़ मुईनुद्दीन चिश्ती का उर्स"
        },
        {
            keys: ["urs of mawlana shaykh nazim al haqqani", "nazim al haqqani"],
            bn: "মাওলানা শায়খ নাজিম আল-হাক্কানির উরস",
            en: "Urs of Mawlana Shaykh Nazim al-Haqqani",
            hi: "मौलाना शैख़ नाज़िम अल-हक्कानी का उर्स"
        },
        {
            keys: ["birth of sayyidina ali ibn abi talib", "ali ibn abi talib"],
            bn: "সাইয়্যিদুনা আলী ইবনে আবি তালিবের জন্মদিন",
            en: "Birth of Sayyidina Ali ibn Abi Talib",
            hi: "सैय्यदिना अली इब्न अबी तालिब का जन्मदिन"
        },
        {
            keys: ["urs of sayyidina jafar as sadiq", "jafar as sadiq", "ja far as sadiq"],
            bn: "সাইয়্যিদুনা জাফর আস-সাদিকের উরস",
            en: "Urs of Sayyidina Ja'far as-Sadiq",
            hi: "सैय्यदिना जाफ़र अस-सादिक़ का उर्स"
        },
        {
            keys: ["urs of zaynab bint ali", "zaynab bint ali"],
            bn: "জয়নব বিনতে আলীর উরস",
            en: "Urs of Zaynab bint Ali",
            hi: "ज़ैनब बिन्त अली का उर्स"
        },
        {
            keys: ["islamic new year", "first muharram"],
            bn: "ইসলামি নববর্ষ",
            en: "Islamic New Year",
            hi: "इस्लामी नव वर्ष"
        },
        {
            keys: ["ashura", "day of ashura"],
            bn: "আশুরা",
            en: "Ashura",
            hi: "आशूरा"
        },
        {
            keys: ["mawlid an nabi", "mawlid", "prophet birthday", "prophet's birthday"],
            bn: "ঈদে মিলাদুন্নবী ﷺ",
            en: "Mawlid an-Nabi ﷺ",
            hi: "ईद मिलादुन्नबी ﷺ"
        },
        {
            keys: ["eid al fitr", "eid ul fitr", "eid fitr"],
            bn: "ঈদুল ফিতর",
            en: "Eid al-Fitr",
            hi: "ईद-उल-फ़ित्र"
        },
        {
            keys: ["eid al adha", "eid ul adha", "eid adha"],
            bn: "ঈদুল আজহা",
            en: "Eid al-Adha",
            hi: "ईद-उल-अज़हा"
        },
        {
            keys: ["day of arafah", "arafah"],
            bn: "আরাফার দিন",
            en: "Day of Arafah",
            hi: "अरफ़ा का दिन"
        },
        {
            keys: ["laylat al qadr", "laylatul qadr", "lailat ul qadr"],
            bn: "শবে কদর",
            en: "Laylat al-Qadr",
            hi: "शबे क़द्र"
        },
        {
            keys: ["isra and miraj", "isra wal miraj", "miraj"],
            bn: "শবে মেরাজ",
            en: "Isra and Mi'raj",
            hi: "शबे मेराज"
        },
        {
            keys: ["mid shaban", "shab e barat", "shab e baraat"],
            bn: "শবে বরাত",
            en: "Mid-Sha'ban (Shab-e-Barat)",
            hi: "शबे बरात"
        },
        {
            keys: ["first day of ramadan", "beginning of ramadan", "ramadan begins"],
            bn: "রমজানের প্রথম দিন",
            en: "First day of Ramadan",
            hi: "रमज़ान का पहला दिन"
        },
        {
            keys: ["days of tashreeq", "ayyam al tashreeq", "tashreeq"],
            bn: "আইয়ামে তাশরীক",
            en: "Days of Tashreeq",
            hi: "अय्याम-ए-तशरीक़"
        }
    ];

    function normalizeName(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[’‘`']/g, "")
            .replace(/[^a-z0-9]+/g, " ")
            .trim()
            .replace(/\s+/g, " ");
    }

    function translateApiName(rawName) {
        const normalized = normalizeName(rawName);

        if (!normalized) {
            return null;
        }

        for (const entry of API_NAMES) {
            const match = entry.keys.some(function (key) {
                return normalized.includes(normalizeName(key));
            });

            if (match) {
                return entry[lang];
            }
        }

        // Do not display an untranslated English API name in Bengali/Hindi.
        // Unknown names receive a localized general label.
        return TEXT[lang].unknown;
    }

    /* ================= DAY LABELS ================= */

    function renderDays() {
        dayNamesDiv.innerHTML = "";

        DAYS[lang].forEach(function (dayName) {
            const element = document.createElement("div");
            element.textContent = dayName;
            dayNamesDiv.appendChild(element);
        });
    }

    /* ================= CURRENT MONTH ================= */

    let current = new Date();
    current.setDate(1);

    let requestId = 0;

    /* ================= EVENT HELPERS ================= */

    function showMessage(message, className) {
        eventsTimeline.innerHTML = "";

        const element = document.createElement("div");
        element.className = className;
        element.textContent = message;

        eventsTimeline.appendChild(element);
    }

    function addEvent(map, day, name) {
        const date = Number(day);
        const eventName = String(name || "").trim();

        if (
            !Number.isInteger(date) ||
            date < 1 ||
            !eventName
        ) {
            return;
        }

        if (!map.has(date)) {
            map.set(date, []);
        }

        const list = map.get(date);
        const normalized = normalizeName(eventName);

        const duplicate = list.some(function (item) {
            return normalizeName(item) === normalized;
        });

        if (!duplicate) {
            list.push(eventName);
        }
    }

    function renderEventList(eventMap) {
        eventsTimeline.innerHTML = "";

        const dates = Array.from(eventMap.keys()).sort(function (a, b) {
            return a - b;
        });

        if (dates.length === 0) {
            showMessage(TEXT[lang].empty, "event-empty");
        } else {
            dates.forEach(function (day) {
                eventMap.get(day).forEach(function (eventName) {
                    const item = document.createElement("div");
                    item.className = "event-item";

                    const dot = document.createElement("div");
                    dot.className = "event-dot";
                    dot.setAttribute("aria-hidden", "true");

                    const date = document.createElement("div");
                    date.className = "event-date";
                    date.textContent = formatNum(day);

                    const name = document.createElement("div");
                    name.className = "event-name";
                    name.textContent = eventName;

                    item.appendChild(dot);
                    item.appendChild(date);
                    item.appendChild(name);

                    eventsTimeline.appendChild(item);
                });
            });
        }

        const note = document.createElement("div");
        note.className = "event-empty";
        note.textContent = TEXT[lang].dateNote;
        eventsTimeline.appendChild(note);
    }

    /* ================= LOAD ISLAMIC EVENTS ================= */

    async function renderEvents() {
        const thisRequest = ++requestId;
        const year = current.getFullYear();
        const month = current.getMonth() + 1;

        eventsTitle.textContent = TEXT[lang].eventsTitle;
        showMessage(TEXT[lang].loading, "event-loading");

        const eventMap = new Map();

        try {
            const url =
                "https://api.aladhan.com/v1/gToHCalendar/" +
                month + "/" + year;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("API HTTP error: " + response.status);
            }

            const result = await response.json();

            if (!result || !Array.isArray(result.data)) {
                throw new Error("Invalid API response");
            }

            if (thisRequest !== requestId) {
                return;
            }

            result.data.forEach(function (day) {
                if (!day || !day.hijri || !day.gregorian) {
                    return;
                }

                const gregorianDay = Number(day.gregorian.day);
                const hijriDay = Number(day.hijri.day);
                const hijriMonth = Number(
                    day.hijri.month && day.hijri.month.number
                );

                // Our curated list of known Hijri observances.
                const key = hijriDay + "-" + hijriMonth;
                const curated = EVENTS[key];

                if (curated) {
                    addEvent(eventMap, gregorianDay, curated[lang]);
                }

                // Events supplied by the calendar API.
                const holidayLists = [
                    day.hijri.holidays,
                    day.hijri.adjustedHolidays
                ];

                holidayLists.forEach(function (holidays) {
                    if (!Array.isArray(holidays)) {
                        return;
                    }

                    holidays.forEach(function (holiday) {
                        const translated = translateApiName(holiday);

                        if (translated) {
                            addEvent(eventMap, gregorianDay, translated);
                        }
                    });
                });
            });

            if (thisRequest !== requestId) {
                return;
            }

            renderEventList(eventMap);

        } catch (error) {
            console.error("Calendar events loading failed:", error);

            if (thisRequest !== requestId) {
                return;
            }

            showMessage(TEXT[lang].error, "event-error");

            const retryButton = document.createElement("button");
            retryButton.type = "button";
            retryButton.textContent = TEXT[lang].retry;
            retryButton.style.display = "block";
            retryButton.style.margin = "8px auto 0";
            retryButton.style.padding = "7px 12px";
            retryButton.style.border = "0";
            retryButton.style.borderRadius = "10px";
            retryButton.style.background = "var(--primary)";
            retryButton.style.color = "var(--cream)";
            retryButton.style.cursor = "pointer";

            retryButton.addEventListener("click", renderEvents);
            eventsTimeline.appendChild(retryButton);
        }
    }

    /* ================= DRAW CALENDAR ================= */

    function draw() {
        grid.innerHTML = "";

        const year = current.getFullYear();
        const month = current.getMonth();

        title.textContent =
            MONTHS[lang][month] + " " + formatNum(year);

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        // Blank cells before the first day.
        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement("div");
            blank.setAttribute("aria-hidden", "true");
            grid.appendChild(blank);
        }

        // Calendar dates.
        for (let day = 1; day <= totalDays; day++) {
            const cell = document.createElement("div");
            cell.className = "day";

            const number = document.createElement("div");
            number.className = "eng";
            number.textContent = formatNum(day);

            cell.appendChild(number);

            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                cell.classList.add("today");
                cell.setAttribute("aria-current", "date");
            }

            grid.appendChild(cell);
        }

        renderEvents();
    }

    /* ================= MONTH NAVIGATION ================= */

    prev.addEventListener("click", function () {
        current.setMonth(current.getMonth() - 1);
        draw();
    });

    next.addEventListener("click", function () {
        current.setMonth(current.getMonth() + 1);
        draw();
    });

    /* ================= INITIALIZE ================= */

    renderDays();
    draw();

    /* ================= LANGUAGE UPDATE ================= */

    setInterval(function () {
        const newLang = getLanguage();

        if (newLang !== lang) {
            lang = newLang;
            renderDays();
            draw();
        }
    }, 1000);

});
