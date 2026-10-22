/* =====================================================
   IBADAT — NAMAZ CONDITIONS
   Bengali / English / Hindi
   Light / Dark theme
   Responsive screen fitting
   ===================================================== */

(() => {
    "use strict";

    const translations = {
        bn: {
            pageTitle: "শর্ত ও প্রস্তুতি",
            heroDescription: "নামাজের আগে প্রয়োজনীয় বিষয়গুলো জেনে নাও",
            heroSubtitle: "পবিত্রতা • সময় • কিবলা • নিয়ত",
            footer: "পবিত্রতা রক্ষা করো, মনোযোগ দিয়ে ইবাদত করো।",

            timeTitle: "নামাজের সময়",
            timeDesc: "নির্ধারিত ওয়াক্তে নামাজ আদায়",

            purityTitle: "পবিত্রতা",
            purityDesc: "অজু, গোসল ও তায়াম্মুম",

            bodyTitle: "শরীরের পবিত্রতা",
            bodyDesc: "শরীরের নাপাকি পরিষ্কার রাখা",

            clothingTitle: "পোশাকের পবিত্রতা",
            clothingDesc: "পরিষ্কার ও উপযুক্ত পোশাক",

            placeTitle: "নামাজের স্থান",
            placeDesc: "নামাজের জায়গা পবিত্র রাখা",

            qiblaTitle: "কিবলামুখী হওয়া",
            qiblaDesc: "কাবা শরিফের দিকে মুখ করা",

            satrTitle: "সতর ঢাকা",
            satrDesc: "প্রয়োজনীয় অঙ্গ ঢেকে রাখা",

            niyyahTitle: "নিয়ত",
            niyyahDesc: "কোন নামাজ পড়বে তা মনে স্থির করা",

            specialTitle: "বিশেষ পরিস্থিতি",
            specialDesc: "অসুস্থতা ও সামর্থ্য অনুযায়ী বিধান",

            checkTitle: "শেষবার যাচাই",
            checkDesc: "নামাজের আগে প্রস্তুতি মিলিয়ে নাও"
        },

        en: {
            pageTitle: "Conditions & Preparation",
            heroDescription: "Learn what you need before offering Salah",
            heroSubtitle: "Purity • Time • Qiblah • Intention",
            footer: "Maintain purity and worship with attention.",

            timeTitle: "Prayer Time",
            timeDesc: "Pray within the prescribed time",

            purityTitle: "Purification",
            purityDesc: "Wudu, ghusl and tayammum",

            bodyTitle: "Body Purity",
            bodyDesc: "Keep the body free from impurity",

            clothingTitle: "Clean Clothing",
            clothingDesc: "Wear clean and suitable clothing",

            placeTitle: "Prayer Place",
            placeDesc: "Keep the prayer area clean",

            qiblaTitle: "Facing the Qiblah",
            qiblaDesc: "Face towards the Ka'bah",

            satrTitle: "Covering the Satr",
            satrDesc: "Cover the required parts of the body",

            niyyahTitle: "Intention",
            niyyahDesc: "Know which prayer you intend to offer",

            specialTitle: "Special Situations",
            specialDesc: "Guidance for illness and limitations",

            checkTitle: "Final Checklist",
            checkDesc: "Review your preparation before prayer"
        },

        hi: {
            pageTitle: "शर्तें और तैयारी",
            heroDescription: "नमाज़ से पहले ज़रूरी बातें सीखें",
            heroSubtitle: "पाकी • समय • क़िबला • नीयत",
            footer: "पाकी बनाए रखें और ध्यान से इबादत करें।",

            timeTitle: "नमाज़ का समय",
            timeDesc: "निर्धारित समय में नमाज़ पढ़ें",

            purityTitle: "पाकी",
            purityDesc: "वुज़ू, ग़ुस्ल और तयम्मुम",

            bodyTitle: "शरीर की पाकी",
            bodyDesc: "शरीर की नापाकी साफ़ रखें",

            clothingTitle: "कपड़ों की पाकी",
            clothingDesc: "साफ़ और उपयुक्त कपड़े पहनें",

            placeTitle: "नमाज़ की जगह",
            placeDesc: "नमाज़ की जगह पाक रखें",

            qiblaTitle: "क़िबला की ओर रुख",
            qiblaDesc: "काबा शरीफ़ की दिशा में रुख करें",

            satrTitle: "सतर ढकना",
            satrDesc: "ज़रूरी अंगों को ढककर रखें",

            niyyahTitle: "नीयत",
            niyyahDesc: "दिल में तय करें कि कौन-सी नमाज़ पढ़नी है",

            specialTitle: "विशेष परिस्थितियाँ",
            specialDesc: "बीमारी और क्षमता के अनुसार नियम",

            checkTitle: "अंतिम जाँच",
            checkDesc: "नमाज़ से पहले तैयारी जाँचें"
        }
    };

    const digitSets = {
        bn: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
        en: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        hi: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
    };

    const cardKeys = [
        "time",
        "purity",
        "body",
        "clothing",
        "place",
        "qibla",
        "satr",
        "niyyah",
        "special",
        "check"
    ];

    const cardPaths = {
        time: "prayer-time.html",
        purity: "purity.html",
        body: "body-purity.html",
        clothing: "clothing-purity.html",
        place: "place-purity.html",
        qibla: "qibla-direction.html",
        satr: "satr-covering.html",
        niyyah: "niyyah.html",
        special: "special-situations.html",
        check: "prayer-checklist.html"
    };

    let currentLanguage = "bn";
    let resizeFrame = 0;

    /* ---------- Settings ---------- */

    function readSettings() {
        try {
            const value = JSON.parse(
                localStorage.getItem("appSettings") || "{}"
            );

            return value && typeof value === "object" ? value : {};
        } catch (error) {
            return {};
        }
    }

    function resolveLanguage(settings) {
        const value = String(settings.lang || "bn").toLowerCase();

        if (value.startsWith("en")) return "en";
        if (value.startsWith("hi")) return "hi";

        return "bn";
    }

    /* ---------- Text helpers ---------- */

    function setText(id, value) {
        const element = document.getElementById(id);

        if (element && typeof value === "string") {
            element.textContent = value;
        }
    }

    function translatePage(language) {
        const content = translations[language] || translations.bn;

        currentLanguage = language;
        document.documentElement.lang = language;

        setText("pageTitle", content.pageTitle);
        setText("heroDescription", content.heroDescription);
        setText("heroSubtitle", content.heroSubtitle);
        setText("footerText", content.footer);

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;

            if (Object.prototype.hasOwnProperty.call(content, key)) {
                element.textContent = content[key];
            }
        });

        updateCardNumbers(language);
        updateDocumentTitle(content.pageTitle);

        document.documentElement.setAttribute(
            "data-language",
            language
        );
    }

    function updateDocumentTitle(title) {
        document.title = `${title} | IBADAT`;
    }

    function convertNumber(number, language) {
        const digits = digitSets[language] || digitSets.bn;

        return String(number).replace(/[0-9]/g, (digit) => {
            return digits[Number(digit)];
        });
    }

    function updateCardNumbers(language) {
        document.querySelectorAll(".condition-card .card-number")
            .forEach((element, index) => {
                element.textContent = convertNumber(index + 1, language);
            });
    }

    /* ---------- Theme ---------- */

    function applyTheme(settings) {
        const theme = String(
            settings.theme || (settings.dark ? "dark" : "light")
        ).toLowerCase();

        const dark = theme === "dark";

        document.body.classList.toggle("dark-mode", dark);

        const themeColor = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (themeColor) {
            themeColor.setAttribute(
                "content",
                dark ? "#102820" : "#0F5132"
            );
        }

        document.documentElement.style.colorScheme =
            dark ? "dark" : "light";
    }

    /* ---------- Card navigation ---------- */

    function normalizeCardLinks() {
        document.querySelectorAll(".condition-card").forEach((card, index) => {
            const key = cardKeys[index];

            if (!key || !cardPaths[key]) return;

            /*
             * HTML-এ দেওয়া লিংক ঠিক থাকলে সেটি ব্যবহার হবে।
             * লিংক খালি থাকলে নির্ধারিত ফাইলের পথ বসবে।
             */
            const href = card.getAttribute("href");

            if (!href || href.trim() === "#") {
                card.setAttribute("href", cardPaths[key]);
            }

            card.setAttribute("data-card-key", key);
        });
    }

    /* ---------- Responsive fitting ---------- */

    function fitPageToScreen() {
        cancelAnimationFrame(resizeFrame);

        resizeFrame = requestAnimationFrame(() => {
            const page = document.querySelector(".conditions-page");
            const header = document.querySelector(".hero-board");
            const cards = document.querySelector(".options-area");
            const footer = document.querySelector(".footer-board");

            if (!page || !header || !cards || !footer) return;

            /*
             * স্ক্রিনের মাপ অনুযায়ী CSS custom properties আপডেট করা হয়।
             * কোনো নির্দিষ্ট ফোনের মাপ ধরে নেওয়া হচ্ছে না।
             */
            const viewportWidth = document.documentElement.clientWidth;
            const viewportHeight = window.visualViewport
                ? window.visualViewport.height
                : window.innerHeight;

            const compact = viewportWidth <= 480;
            const veryShort = viewportHeight <= 650;
            const short = viewportHeight <= 760;

            document.documentElement.style.setProperty(
                "--available-screen-height",
                `${Math.max(240, viewportHeight)}px`
            );

            /*
             * দশটি কার্ডের জন্য দুই কলাম রাখা হয়।
             * ছোট স্ক্রিনে গ্যাপ ও padding কমানো হয়,
             * কিন্তু লেখা লুকিয়ে ফেলা হয় না।
             */
            if (compact) {
                page.style.setProperty("--card-gap", veryShort ? "4px" : "7px");
                page.style.setProperty("--page-padding", "9px");

                if (veryShort) {
                    header.style.minHeight = "70px";
                    footer.style.minHeight = "38px";
                } else if (short) {
                    header.style.minHeight = "82px";
                    footer.style.minHeight = "48px";
                } else {
                    header.style.minHeight = "96px";
                    footer.style.minHeight = "56px";
                }
            } else {
                page.style.setProperty("--card-gap", "10px");
                page.style.setProperty("--page-padding", "12px");

                header.style.minHeight = "";
                footer.style.minHeight = "";
            }

            /*
             * CSS Grid নিজে থেকেই কলাম ও কার্ডের প্রস্থ ঠিক করবে।
             * কোনো কার্ডের লেখা JavaScript দিয়ে কেটে ফেলা হবে না।
             */
            cards.style.gridTemplateColumns =
                viewportWidth <= 300
                    ? "minmax(0, 1fr)"
                    : "repeat(2, minmax(0, 1fr))";

            /*
             * অতিরিক্ত ছোট স্ক্রিনে এক কলাম হলে দশটি কার্ডের
             * জন্য স্ক্রল লাগতে পারে। তাই স্বাভাবিক ফোনের প্রস্থে
             * দুই কলাম বজায় রাখা হয়।
             */
            if (viewportWidth <= 300) {
                cards.style.alignContent = "start";
            } else {
                cards.style.alignContent = "center";
            }
        });
    }

    /* ---------- Refresh ---------- */

    function refreshPage() {
        const settings = readSettings();
        const language = resolveLanguage(settings);

        translatePage(language);
        applyTheme(settings);
        normalizeCardLinks();
        fitPageToScreen();
    }

    /* ---------- Startup ---------- */

    function init() {
        refreshPage();

        window.addEventListener("resize", fitPageToScreen, {
            passive: true
        });

        window.addEventListener("orientationchange", fitPageToScreen, {
            passive: true
        });

        if (window.visualViewport) {
            window.visualViewport.addEventListener(
                "resize",
                fitPageToScreen,
                { passive: true }
            );
        }

        window.addEventListener("storage", (event) => {
            if (event.key === "appSettings") {
                refreshPage();
            }
        });

        /*
         * অন্য স্ক্রিপ্ট থেকে সেটিংস পরিবর্তন হলে
         * পেজ আপডেট করার জন্য এই ফাংশনটি ব্যবহার করা যাবে।
         */
        window.refreshConditionsPage = refreshPage;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
