document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* ==================================================
       IBADAT — ISLAMIC CALENDAR
       Languages: Bengali, English, Hindi
       Settings: appSettings
    ================================================== */

    const $ = function (id) {
        return document.getElementById(id);
    };

    const grid = $("calendarGrid");
    const title = $("monthTitle");
    const prev = $("prevMonth");
    const next = $("nextMonth");
    const dayNamesDiv = $("dayNames");
    const eventsTitle = $("eventsTitle");
    const timeline = $("eventsTimeline");
    const heading = $("calendarHeading");
    const footer = $("calendarFooter");

    if (
        !grid ||
        !title ||
        !prev ||
        !next ||
        !dayNamesDiv ||
        !eventsTitle ||
        !timeline
    ) {
        console.error("IBADAT Calendar: HTML elements missing.");
        return;
    }

    /* ==================================================
       SETTINGS
    ================================================== */

    function readSettings() {
        try {
            return JSON.parse(
                localStorage.getItem("appSettings")
            ) || {};
        } catch (error) {
            return {};
        }
    }

    function getLanguage() {
        const settings = readSettings();

        const value = String(
            settings.lang ||
            settings.language ||
            "bn"
        ).toLowerCase();

        return ["bn", "en", "hi"].includes(value)
            ? value
            : "bn";
    }

    function getTheme() {
        const settings = readSettings();

        const value = String(
            settings.themeColor ||
            settings.theme ||
            "classic"
        ).toLowerCase();

        return ["classic", "royal", "rose", "pista"].includes(value)
            ? value
            : "classic";
    }

    function getDarkMode() {
        return readSettings().dark === true;
    }

    let lang = getLanguage();

    const initialDate = new Date();

    let year = initialDate.getFullYear();
    let month = initialDate.getMonth();

    let requestId = 0;

    const eventCache = new Map();

    /* ==================================================
       MONTH NAMES
    ================================================== */

    const MONTHS = {
        bn: [
            "জানুয়ারি",
            "ফেব্রুয়ারি",
            "মার্চ",
            "এপ্রিল",
            "মে",
            "জুন",
            "জুলাই",
            "আগস্ট",
            "সেপ্টেম্বর",
            "অক্টোবর",
            "নভেম্বর",
            "ডিসেম্বর"
        ],

        en: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],

        hi: [
            "जनवरी",
            "फ़रवरी",
            "मार्च",
            "अप्रैल",
            "मई",
            "जून",
            "जुलाई",
            "अगस्त",
            "सितंबर",
            "अक्टूबर",
            "नवंबर",
            "दिसंबर"
        ]
    };

    /* ==================================================
       WEEKDAYS
    ================================================== */

    const DAYS = {
        bn: [
            "রবি",
            "সোম",
            "মঙ্গল",
            "বুধ",
            "বৃহ",
            "শুক্র",
            "শনি"
        ],

        en: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],

        hi: [
            "रवि",
            "सोम",
            "मंगल",
            "बुध",
            "गुरु",
            "शुक्र",
            "शनि"
        ]
    };

    /* ==================================================
       UI TEXT
    ================================================== */

    const TEXT = {
        bn: {
            heading: "ক্যালেন্ডার",
            footer: "আল্লাহকে স্মরণ করুন",
            eventsTitle: "ইসলামিক বিশেষ দিন",
            empty: "এই মাসের জন্য তালিকাভুক্ত কোনো বিশেষ দিন পাওয়া যায়নি।",
            loading: "ইসলামিক বিশেষ দিনের তথ্য লোড হচ্ছে…",
            error: "বিশেষ দিনের তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
            retry: "আবার চেষ্টা করুন",
            unknown: "অন্যান্য ইসলামিক বিশেষ দিন",
            dateNote: "চাঁদ দেখা ও স্থানীয় সিদ্ধান্তের কারণে তারিখ এক দিন ভিন্ন হতে পারে।",
            previous: "আগের মাস",
            next: "পরের মাস",
            calendarLabel: "ক্যালেন্ডার",
            specialDaysLabel: "ইসলামিক বিশেষ দিন"
        },

        en: {
            heading: "Calendar",
            footer: "Remember Allah",
            eventsTitle: "Islamic Special Days",
            empty: "No listed special days were found for this month.",
            loading: "Loading Islamic observances…",
            error: "Could not load special-day information. Check your internet connection and try again.",
            retry: "Try again",
            unknown: "Other Islamic observance",
            dateNote: "Dates may differ by one day depending on local moon sighting.",
            previous: "Previous month",
            next: "Next month",
            calendarLabel: "Calendar",
            specialDaysLabel: "Islamic special days"
        },

        hi: {
            heading: "कैलेंडर",
            footer: "अल्लाह को याद करें",
            eventsTitle: "इस्लामी विशेष दिन",
            empty: "इस महीने के लिए सूचीबद्ध कोई विशेष दिन नहीं मिला।",
            loading: "इस्लामी विशेष दिनों की जानकारी लोड हो रही है…",
            error: "विशेष दिनों की जानकारी लोड नहीं हो सकी। इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
            retry: "फिर कोशिश करें",
            unknown: "अन्य इस्लामी विशेष दिन",
            dateNote: "स्थानीय चाँद दिखने के अनुसार तारीख़ एक दिन अलग हो सकती है।",
            previous: "पिछला महीना",
            next: "अगला महीना",
            calendarLabel: "कैलेंडर",
            specialDaysLabel: "इस्लामी विशेष दिन"
        }
    };

    /* ==================================================
       NUMBER FORMATTING
    ================================================== */

    const DIGITS = {
        bn: "০১২৩৪৫৬৭৮৯",
        en: "0123456789",
        hi: "०१२३४५६७८९"
    };

    function formatNumber(value) {
        const digitSet = DIGITS[lang] || DIGITS.bn;

        return String(value).replace(/\d/g, function (digit) {
            return digitSet[Number(digit)];
        });
    }

    /* ==================================================
       CURATED HIJRI EVENTS
       Key format: Hijri day-month
    ================================================== */

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

    /* ==================================================
       API EVENT TRANSLATIONS
    ================================================== */

    const API_NAMES = [
        {
            keys: [
                "beginning of the holy months",
                "holy months"
            ],
            bn: "সম্মানিত মাসসমূহের সূচনা",
            en: "Beginning of the Holy Months",
            hi: "सम्मानित महीनों की शुरुआत"
        },

        {
            keys: [
                "lailat ul raghaib",
                "lailat ul ragaib",
                "raghaib"
            ],
            bn: "লাইলাতুর রাগায়িব",
            en: "Laylat al-Raghaib",
            hi: "लैलतुर रग़ाइब"
        },

        {
            keys: [
                "urs of shaykh muhiyuddin ibn al arabi",
                "muhiyuddin ibn al arabi"
            ],
            bn: "শায়খ মুহিউদ্দিন ইবনুল আরাবির উরস",
            en: "Urs of Shaykh Muhiyuddin Ibn al-Arabi",
            hi: "शैख़ मुहियुद्दीन इब्नुल अरबी का उर्स"
        },

        {
            keys: [
                "urs of hazrat shaykh moin al din chishti",
                "moin al din chishti",
                "moinuddin chishti"
            ],
            bn: "হজরত শায়খ মঈনুদ্দিন চিশতির উরস",
            en: "Urs of Hazrat Shaykh Moin al-Din Chishti",
            hi: "हज़रत शैख़ मुईनुद्दीन चिश्ती का उर्स"
        },

        {
            keys: [
                "urs of mawlana shaykh nazim al haqqani",
                "nazim al haqqani"
            ],
            bn: "মাওলানা শায়খ নাজিম আল-হাক্কানির উরস",
            en: "Urs of Mawlana Shaykh Nazim al-Haqqani",
            hi: "मौलाना शैख़ नाज़िम अल-हक्कानी का उर्स"
        },

        {
            keys: [
                "birth of sayyidina ali ibn abi talib",
                "ali ibn abi talib"
            ],
            bn: "সাইয়্যিদুনা আলী ইবনে আবি তালিবের জন্মদিন",
            en: "Birth of Sayyidina Ali ibn Abi Talib",
            hi: "सैय्यदिना अली इब्न अबी तालिब का जन्मदिन"
        },

        {
            keys: [
                "urs of sayyidina jafar as sadiq",
                "jafar as sadiq",
                "ja far as sadiq"
            ],
            bn: "সাইয়্যিদুনা জাফর আস-সাদিকের উরস",
            en: "Urs of Sayyidina Ja'far as-Sadiq",
            hi: "सैय्यदिना जाफ़र अस-सादिक़ का उर्स"
        },

        {
            keys: [
                "urs of zaynab bint ali",
                "zaynab bint ali"
            ],
            bn: "জয়নব বিনতে আলীর উরস",
            en: "Urs of Zaynab bint Ali",
            hi: "ज़ैनब बिन्त अली का उर्स"
        },

        {
            keys: [
                "islamic new year",
                "first muharram"
            ],
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
            keys: [
                "mawlid an nabi",
                "mawlid",
                "prophet birthday",
                "prophet's birthday"
            ],
            bn: "ঈদে মিলাদুন্নবী ﷺ",
            en: "Mawlid an-Nabi ﷺ",
            hi: "ईद मिलादुन्नबी ﷺ"
        },

        {
            keys: [
                "eid al fitr",
                "eid ul fitr",
                "eid fitr"
            ],
            bn: "ঈদুল ফিতর",
            en: "Eid al-Fitr",
            hi: "ईद-उल-फ़ित्र"
        },

        {
            keys: [
                "eid al adha",
                "eid ul adha",
                "eid adha"
            ],
            bn: "ঈদুল আজহা",
            en: "Eid al-Adha",
            hi: "ईद-उল-अज़हा"
        },

        {
            keys: [
                "day of arafah",
                "arafah"
            ],
            bn: "আরাফার দিন",
            en: "Day of Arafah",
            hi: "अरफ़ा का दिन"
        },

        {
            keys: [
                "laylat al qadr",
                "laylatul qadr",
                "lailat ul qadr"
            ],
            bn: "শবে কদর",
            en: "Laylat al-Qadr",
            hi: "शबे क़द्र"
        },

        {
            keys: [
                "isra and miraj",
                "isra wal miraj",
                "miraj"
            ],
            bn: "শবে মেরাজ",
            en: "Isra and Mi'raj",
            hi: "शबे मेराज"
        },

        {
            keys: [
                "mid shaban",
                "shab e barat",
                "shab e baraat"
            ],
            bn: "শবে বরাত",
            en: "Mid-Sha'ban (Shab-e-Barat)",
            hi: "शबे बरात"
        },

        {
            keys: [
                "first day of ramadan",
                "beginning of ramadan",
                "ramadan begins"
            ],
            bn: "রমজানের প্রথম দিন",
            en: "First day of Ramadan",
            hi: "रमज़ान का पहला दिन"
        },

        {
            keys: [
                "days of tashreeq",
                "ayyam al tashreeq",
                "tashreeq"
            ],
            bn: "আইয়ামে তাশরীক",
            en: "Days of Tashreeq",
            hi: "अय्याम-ए-तशरीक़"
        }
    ];

    /* ==================================================
       TRANSLATION HELPERS
    ================================================== */

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
            const matched = entry.keys.some(function (key) {
                const normalizedKey = normalizeName(key);

                return normalized === normalizedKey ||
                    normalized.includes(normalizedKey);
            });

            if (matched) {
                return entry[lang] || entry.en;
            }
        }

        return lang === "en"
            ? String(rawName).trim()
            : TEXT[lang].unknown;
    }

    /* ==================================================
       SETTINGS THEME APPLICATION
    ================================================== */

    function applySettings() {
        const settings = readSettings();

        lang = getLanguage();

        document.documentElement.lang = lang;

        document.body.dataset.colorTheme = getTheme();

        document.body.classList.toggle(
            "dark-mode",
            getDarkMode()
        );

        const colors = {
            classic: "#1B7F4B",
            royal: "#285A8E",
            rose: "#B96F79",
            pista: "#4CAF50"
        };

        const meta = $("themeColorMeta");

        if (meta) {
            meta.content = getDarkMode()
                ? "#103E29"
                : colors[getTheme()];
        }
    }

    /* ==================================================
       HEADINGS AND ACCESSIBLE LABELS
    ================================================== */

    function renderHeadings() {
        heading.textContent = TEXT[lang].heading;
        footer.textContent = TEXT[lang].footer;
        eventsTitle.textContent = TEXT[lang].eventsTitle;

        prev.setAttribute(
            "aria-label",
            TEXT[lang].previous
        );

        prev.setAttribute(
            "title",
            TEXT[lang].previous
        );

        next.setAttribute(
            "aria-label",
            TEXT[lang].next
        );

        next.setAttribute(
            "title",
            TEXT[lang].next
        );

        $("monthTitle").setAttribute(
            "aria-label",
            TEXT[lang].calendarLabel
        );

        $("eventsTitle").setAttribute(
            "aria-label",
            TEXT[lang].specialDaysLabel
        );
    }

    /* ==================================================
       WEEKDAY LABELS
    ================================================== */

    function renderDays() {
        dayNamesDiv.replaceChildren();

        DAYS[lang].forEach(function (dayName) {
            const element = document.createElement("div");

            element.className = "day-name";
            element.textContent = dayName;

            dayNamesDiv.appendChild(element);
        });
    }

    /* ==================================================
       EVENT DISPLAY HELPERS
    ================================================== */

    function showMessage(message, className) {
        timeline.replaceChildren();

        const element = document.createElement("div");

        element.className = className;
        element.textContent = message;

        timeline.appendChild(element);
    }

    function addEvent(map, day, name) {
        const date = Number(day);
        const eventName = String(name || "").trim();

        if (
            !Number.isInteger(date) ||
            date < 1 ||
            date > 31 ||
            !eventName
        ) {
            return;
        }

        if (!map.has(date)) {
            map.set(date, []);
        }

        const list = map.get(date);
        const normalized = normalizeName(eventName);

        const duplicate = list.some(function (existingName) {
            return normalizeName(existingName) === normalized;
        });

        if (!duplicate) {
            list.push(eventName);
        }
    }

    function renderEventList(eventMap) {
        timeline.replaceChildren();

        const sortedDays = Array.from(eventMap.keys())
            .sort(function (a, b) {
                return a - b;
            });

        if (sortedDays.length === 0) {
            const empty = document.createElement("div");

            empty.className = "event-empty";
            empty.textContent = TEXT[lang].empty;

            timeline.appendChild(empty);
        } else {
            sortedDays.forEach(function (day) {
                eventMap.get(day).forEach(function (eventName) {
                    const item = document.createElement("div");
                    const dot = document.createElement("span");
                    const date = document.createElement("span");
                    const name = document.createElement("span");

                    item.className = "event-item";

                    dot.className = "event-dot";
                    dot.setAttribute("aria-hidden", "true");

                    date.className = "event-date";
                    date.textContent = formatNumber(day);

                    name.className = "event-name";
                    name.textContent = eventName;

                    item.append(dot, date, name);

                    timeline.appendChild(item);
                });
            });
        }

        const note = document.createElement("div");

        note.className = "event-empty";
        note.textContent = TEXT[lang].dateNote;

        timeline.appendChild(note);
    }

    function showError() {
        timeline.replaceChildren();

        const error = document.createElement("div");
        const retryButton = document.createElement("button");

        error.className = "event-error";
        error.textContent = TEXT[lang].error;

        retryButton.type = "button";
        retryButton.textContent = TEXT[lang].retry;

        retryButton.addEventListener("click", renderEvents);

        timeline.append(error, retryButton);
    }

    /* ==================================================
       API DATE HELPERS
    ================================================== */

    function getGregorianDate(entry) {
        const gregorian = entry && entry.gregorian;

        if (!gregorian) {
            return null;
        }

        const parts = String(gregorian.date || "").split("-");

        if (parts.length === 3) {
            const day = Number(parts[0]);
            const monthNumber = Number(parts[1]);
            const yearNumber = Number(parts[2]);

            if (
                Number.isInteger(day) &&
                Number.isInteger(monthNumber) &&
                Number.isInteger(yearNumber)
            ) {
                return {
                    day: day,
                    month: monthNumber,
                    year: yearNumber
                };
            }
        }

        const day = Number(gregorian.day);
        const monthNumber = Number(
            gregorian.month && gregorian.month.number
        );
        const yearNumber = Number(gregorian.year);

        if (
            Number.isInteger(day) &&
            Number.isInteger(monthNumber) &&
            Number.isInteger(yearNumber) &&
            day > 0 &&
            monthNumber > 0 &&
            yearNumber > 0
        ) {
            return {
                day: day,
                month: monthNumber,
                year: yearNumber
            };
        }

        return null;
    }

    /* ==================================================
       BUILD ISLAMIC EVENTS FOR THE SELECTED MONTH
    ================================================== */

    function buildEventMap(apiDays, selectedYear, selectedMonth) {
        const eventMap = new Map();

        apiDays.forEach(function (entry) {
            const gregorian = getGregorianDate(entry);

            if (
                !gregorian ||
                gregorian.year !== selectedYear ||
                gregorian.month !== selectedMonth
            ) {
                return;
            }

            const hijri = entry && entry.hijri;

            if (hijri && hijri.day && hijri.month) {
                const key =
                    Number(hijri.day) +
                    "-" +
                    Number(hijri.month.number);

                const curated = EVENTS[key];

                if (curated) {
                    addEvent(
                        eventMap,
                        gregorian.day,
                        curated[lang] || curated.en
                    );
                }
            }

            const holidayLists = [
                hijri && hijri.holidays,
                hijri && hijri.adjustedHolidays
            ];

            holidayLists.forEach(function (list) {
                if (!Array.isArray(list)) {
                    return;
                }

                list.forEach(function (rawName) {
                    if (
                        typeof rawName === "string" &&
                        rawName.trim()
                    ) {
                        const translated = translateApiName(rawName);

                        if (translated) {
                            addEvent(
                                eventMap,
                                gregorian.day,
                                translated
                            );
                        }
                    }
                });
            });
        });

        return eventMap;
    }

    /* ==================================================
       LOAD ISLAMIC EVENTS
    ================================================== */

    async function renderEvents() {
        const thisRequest = ++requestId;

        const selectedYear = year;
        const selectedMonth = month + 1;

        const cacheKey =
            selectedYear + "-" + selectedMonth;

        eventsTitle.textContent = TEXT[lang].eventsTitle;

        if (eventCache.has(cacheKey)) {
            renderEventList(eventCache.get(cacheKey));
            return;
        }

        showMessage(
            TEXT[lang].loading,
            "event-loading"
        );

        const url =
            "https://api.aladhan.com/v1/gToHCalendar/" +
            selectedMonth +
            "/" +
            selectedYear;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(
                    "Calendar API HTTP error: " +
                    response.status
                );
            }

            const result = await response.json();

            if (
                !result ||
                (result.code && result.code !== 200) ||
                !Array.isArray(result.data)
            ) {
                throw new Error(
                    "Invalid calendar API response."
                );
            }

            if (thisRequest !== requestId) {
                return;
            }

            const eventMap = buildEventMap(
                result.data,
                selectedYear,
                selectedMonth
            );

            eventCache.set(cacheKey, eventMap);

            renderEventList(eventMap);

        } catch (error) {
            console.error(
                "IBADAT Calendar API error:",
                error
            );

            if (thisRequest === requestId) {
                showError();
            }
        }
    }

    /* ==================================================
       DRAW GREGORIAN CALENDAR
    ================================================== */

    function drawCalendar() {
        grid.replaceChildren();

        title.textContent =
            MONTHS[lang][month] +
            " " +
            formatNumber(year);

        const firstDay = new Date(
            year,
            month,
            1
        ).getDay();

        const totalDays = new Date(
            year,
            month + 1,
            0
        ).getDate();

        const today = new Date();

        /* ফাঁকা ঘর */

        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement("div");

            blank.className = "day-empty";
            blank.setAttribute("aria-hidden", "true");

            grid.appendChild(blank);
        }

        /* মাসের তারিখ */

        for (let day = 1; day <= totalDays; day++) {
            const cell = document.createElement("div");

            cell.className = "day";
            cell.textContent = formatNumber(day);

            const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

            if (isToday) {
                cell.classList.add("today");
                cell.setAttribute("aria-current", "date");
            }

            cell.setAttribute(
                "aria-label",
                MONTHS[lang][month] +
                " " +
                formatNumber(day) +
                ", " +
                formatNumber(year)
            );

            grid.appendChild(cell);
        }

        renderEvents();
    }

    /* ==================================================
       FULL PAGE RENDER
    ================================================== */

    function draw() {
        applySettings();
        renderHeadings();
        renderDays();
        drawCalendar();
    }

    /* ==================================================
       PREVIOUS MONTH
    ================================================== */

    prev.addEventListener("click", function () {
        month--;

        if (month < 0) {
            month = 11;
            year--;
        }

        draw();
    });

    /* ==================================================
       NEXT MONTH
    ================================================== */

    next.addEventListener("click", function () {
        month++;

        if (month > 11) {
            month = 0;
            year++;
        }

        draw();
    });

    /* ==================================================
       SETTINGS CHANGES FROM OTHER TABS
    ================================================== */

    window.addEventListener("storage", function (event) {
        if (event.key !== "appSettings") {
            return;
        }

        const oldLang = lang;

        applySettings();

        if (oldLang !== lang) {
            draw();
        }
    });

    /* ==================================================
       SAME-TAB SETTINGS CHANGE DETECTION
       Supports the existing Settings page.
    ================================================== */

    window.setInterval(function () {
        const newLang = getLanguage();
        const newTheme = getTheme();
        const newDark = getDarkMode();

        const languageChanged = newLang !== lang;

        const themeChanged =
            document.body.dataset.colorTheme !== newTheme;

        const darkChanged =
            document.body.classList.contains("dark-mode") !== newDark;

        if (languageChanged) {
            lang = newLang;
            draw();
            return;
        }

        if (themeChanged || darkChanged) {
            applySettings();
        }
    }, 1000);

    /* ==================================================
       INITIALIZE
    ================================================== */

    draw();
});
