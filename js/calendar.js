document.addEventListener("DOMContentLoaded", function () {

    /* ================= ELEMENTS ================= */

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
        console.error("Calendar: required HTML elements are missing.");
        return;
    }

    /* ================= SETTINGS ================= */

    function readSettings() {
        try {
            return JSON.parse(
                localStorage.getItem("appSettings")
            ) || { lang: "bn" };
        } catch (error) {
            return { lang: "bn" };
        }
    }

    function getLanguage() {
        const value = readSettings().lang || "bn";
        return ["bn", "en", "hi"].includes(value) ? value : "bn";
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

    /* ================= DAYS ================= */

    const DAYS = {
        bn: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"],
        en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
    };

    /* ================= TEXT ================= */

    const TEXT = {
        bn: {
            title: "এই মাসের ইসলামিক বিশেষ দিন",
            empty: "এই মাসের জন্য তালিকাভুক্ত কোনো বিশেষ দিন পাওয়া যায়নি।",
            loading: "ইসলামিক বিশেষ দিনের তথ্য লোড হচ্ছে…",
            error: "বিশেষ দিনের তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করো।",
            retry: "আবার চেষ্টা করুন",
            apiUnknown: "ইসলামিক বিশেষ দিন",
            approximate: "চাঁদ দেখা ও স্থানীয় সিদ্ধান্তের কারণে তারিখ এক দিন ভিন্ন হতে পারে।"
        },

        en: {
            title: "Islamic Special Days This Month",
            empty: "No listed special days were found for this month.",
            loading: "Loading Islamic observances…",
            error: "Could not load observance data. Check your internet connection and try again.",
            retry: "Try again",
            apiUnknown: "Islamic observance",
            approximate: "Dates may differ by one day depending on local moon sighting."
        },

        hi: {
            title: "इस महीने के इस्लामी विशेष दिन",
            empty: "इस महीने के लिए सूचीबद्ध कोई विशेष दिन नहीं मिला।",
            loading: "इस्लामी विशेष दिनों की जानकारी लोड हो रही है…",
            error: "जानकारी लोड नहीं हो सकी। इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
            retry: "फिर कोशिश करें",
            apiUnknown: "इस्लामी विशेष दिन",
            approximate: "स्थानीय चाँद दिखने के अनुसार तारीख़ एक दिन अलग हो सकती है।"
        }
    };

    /* ================= CURATED HIJRI EVENTS =================
       Key format: Hijri day-month.
       These are commonly observed dates, not a guarantee of
       the locally confirmed Gregorian date.
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

    /* ================= NUMBER FORMAT ================= */

    function formatNum(value) {
        const digits = {
            bn: "০১২৩৪৫৬৭৮৯",
            hi: "०१२३४५६७८९"
        };

        if (lang === "en") {
            return String(value);
        }

        return String(value).replace(/\d/g, function (digit) {
            return digits[lang][Number(digit)];
        });
    }

    /* ================= DAY NAMES ================= */

    function renderDays() {
        dayNamesDiv.innerHTML = "";

        DAYS[lang].forEach(function (day) {
            const cell = document.createElement("div");
            cell.textContent = day;
            dayNamesDiv.appendChild(cell);
        });
    }

    /* ================= CURRENT MONTH ================= */

    let current = new Date();
    current.setDate(1);

    /* ================= API REQUEST CONTROL ================= */

    let requestNumber = 0;

    /* ================= API HOLIDAY TRANSLATIONS ================= */

    const API_TRANSLATIONS = {
        "islamic new year": {
            bn: "ইসলামি নববর্ষ",
            en: "Islamic New Year",
            hi: "इस्लामी नव वर्ष"
        },

        "ashura": {
            bn: "আশুরা",
            en: "Ashura",
            hi: "आशूरा"
        },

        "mawlid": {
            bn: "ঈদে মিলাদুন্নবী ﷺ",
            en: "Mawlid an-Nabi ﷺ",
            hi: "ईद मिलादुन्नबी ﷺ"
        },

        "prophet's birthday": {
            bn: "ঈদে মিলাদুন্নবী ﷺ",
            en: "Prophet's Birthday",
            hi: "ईद मिलादुन्नबी ﷺ"
        },

        "eid al-fitr": {
            bn: "ঈদুল ফিতর",
            en: "Eid al-Fitr",
            hi: "ईद-उल-फ़ित्र"
        },

        "eid al-adha": {
            bn: "ঈদুল আজহা",
            en: "Eid al-Adha",
            hi: "ईद-उल-अज़हा"
        },

        "day of arafah": {
            bn: "আরাফার দিন",
            en: "Day of Arafah",
            hi: "अरफ़ा का दिन"
        },

        "laylat al-qadr": {
            bn: "শবে কদর",
            en: "Laylat al-Qadr",
            hi: "शबे क़द्र"
        },

        "isra": {
            bn: "শবে মেরাজ",
            en: "Isra and Mi'raj",
            hi: "शबे मेराज"
        },

        "mid-sha'ban": {
            bn: "শবে বরাত",
            en: "Mid-Sha'ban",
            hi: "शबे बरात"
        }
    };

    function translateApiHoliday(rawName) {
        const original = String(rawName || "").trim();

        if (!original) {
            return null;
        }

        const normalized = original
            .toLowerCase()
            .replace(/[’‘]/g, "'")
            .replace(/\s+/g, " ");

        for (const key in API_TRANSLATIONS) {
            if (normalized.includes(key)) {
                return API_TRANSLATIONS[key][lang];
            }
        }

        // Unknown API holiday: keep the source name rather than
        // inventing a translation or silently discarding it.
        return original;
    }

    /* ================= EVENTS UI ================= */

    function showMessage(message, className) {
        eventsTimeline.innerHTML = "";

        const element = document.createElement("div");
        element.className = className;
        element.textContent = message;

        eventsTimeline.appendChild(element);
    }

    function addEventToMap(map, date, name, source) {
        if (!Number.isInteger(date) || date < 1 || !name) {
            return;
        }

        if (!map.has(date)) {
            map.set(date, []);
        }

        const list = map.get(date);
        const normalizedName = String(name).trim().toLowerCase();

        const alreadyExists = list.some(function (item) {
            return item.name.trim().toLowerCase() === normalizedName;
        });

        if (!alreadyExists) {
            list.push({
                name: String(name).trim(),
                source: source || "listed"
            });
        }
    }

    function renderEventList(map) {
        eventsTimeline.innerHTML = "";

        const dates = Array.from(map.keys()).sort(function (a, b) {
            return a - b;
        });

        if (dates.length === 0) {
            showMessage(TEXT[lang].empty, "event-empty");

            const note = document.createElement("div");
            note.className = "event-empty";
            note.textContent = TEXT[lang].approximate;
            eventsTimeline.appendChild(note);
            return;
        }

        dates.forEach(function (dayNumber) {
            map.get(dayNumber).forEach(function (event) {
                const item = document.createElement("div");
                item.className = "event-item";

                const dot = document.createElement("div");
                dot.className = "event-dot";
                dot.setAttribute("aria-hidden", "true");

                const date = document.createElement("div");
                date.className = "event-date";
                date.textContent = formatNum(dayNumber);

                const name = document.createElement("div");
                name.className = "event-name";
                name.textContent = event.name;

                item.appendChild(dot);
                item.appendChild(date);
                item.appendChild(name);

                eventsTimeline.appendChild(item);
            });
        });

        const note = document.createElement("div");
        note.className = "event-empty";
        note.textContent = TEXT[lang].approximate;
        eventsTimeline.appendChild(note);
    }

    /* ================= RENDER EVENTS ================= */

    async function renderEvents() {
        const thisRequest = ++requestNumber;

        eventsTitle.textContent = TEXT[lang].title;
        showMessage(TEXT[lang].loading, "event-loading");

        const year = current.getFullYear();
        const month = current.getMonth() + 1;
        const curatedEvents = new Map();

        try {
            const url =
                "https://api.aladhan.com/v1/gToHCalendar/" +
                month + "/" + year;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Calendar API returned " + response.status);
            }

            const result = await response.json();

            if (
                !result ||
                !Array.isArray(result.data)
            ) {
                throw new Error("Invalid calendar API response");
            }

            // Ignore a response belonging to a month the user has
            // already navigated away from.
            if (thisRequest !== requestNumber) {
                return;
            }

            result.data.forEach(function (day) {
                if (!day || !day.hijri || !day.gregorian) {
                    return;
                }

                const hijriDay = Number(day.hijri.day);
                const hijriMonth = Number(
                    day.hijri.month && day.hijri.month.number
                );
                const gregorianDay = Number(day.gregorian.day);

                if (
                    Number.isInteger(hijriDay) &&
                    Number.isInteger(hijriMonth)
                ) {
                    const key = hijriDay + "-" + hijriMonth;
                    const event = EVENTS[key];

                    if (event) {
                        addEventToMap(
                            curatedEvents,
                            gregorianDay,
                            event[lang],
                            "curated"
                        );
                    }
                }

                // Also read holidays supplied by the API.
                const holidays = day.hijri.holidays;

                if (Array.isArray(holidays)) {
                    holidays.forEach(function (holiday) {
                        const name = translateApiHoliday(holiday);

                        if (name) {
                            addEventToMap(
                                curatedEvents,
                                gregorianDay,
                                name,
                                "api"
                            );
                        }
                    });
                }

                const adjustedHolidays = day.hijri.adjustedHolidays;

                if (Array.isArray(adjustedHolidays)) {
                    adjustedHolidays.forEach(function (holiday) {
                        const name = translateApiHoliday(holiday);

                        if (name) {
                            addEventToMap(
                                curatedEvents,
                                gregorianDay,
                                name,
                                "api"
                            );
                        }
                    });
                }
            });

            if (thisRequest !== requestNumber) {
                return;
            }

            renderEventList(curatedEvents);

        } catch (error) {
            console.error("Islamic events could not be loaded:", error);

            if (thisRequest !== requestNumber) {
                return;
            }

            showMessage(TEXT[lang].error, "event-error");

            const retry = document.createElement("button");
            retry.type = "button";
            retry.className = "header-button";
            retry.textContent = TEXT[lang].retry;
            retry.style.display = "block";
            retry.style.margin = "8px auto 0";
            retry.style.padding = "7px 12px";
            retry.style.border = "0";
            retry.style.borderRadius = "10px";
            retry.style.background = "var(--primary)";
            retry.style.color = "var(--cream)";
            retry.style.cursor = "pointer";

            retry.addEventListener("click", renderEvents);
            eventsTimeline.appendChild(retry);
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

        // Empty cells before the first day of the month.
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.setAttribute("aria-hidden", "true");
            grid.appendChild(emptyCell);
        }

        for (let d = 1; d <= totalDays; d++) {
            const cell = document.createElement("div");
            cell.className = "day";

            const dateNumber = document.createElement("div");
            dateNumber.className = "eng";
            dateNumber.textContent = formatNum(d);

            cell.appendChild(dateNumber);

            if (
                d === today.getDate() &&
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

    /* ================= AUTO LANGUAGE UPDATE ================= */

    setInterval(function () {
        const newLang = getLanguage();

        if (newLang !== lang) {
            lang = newLang;
            renderDays();
            draw();
        }
    }, 1000);

});
