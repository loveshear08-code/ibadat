
/* =====================================================
   IBADAT — শর্ত ও প্রস্তুতি
   File: js/namaz-conditions.js

   কাজ:
   1. বাংলা / English / हिन्दी ভাষা
   2. Light / Dark theme
   3. দশটি অপশনের সঠিক লিংক
   4. Deep link ও section navigation
   5. পুরো পেজে স্বাভাবিক scrolling
   6. ছোট স্ক্রিনে নিরাপদ responsive behavior
   ===================================================== */

(() => {
    "use strict";

    /* ================================================
       1. অনুবাদ
       ================================================ */

    const translations = {
        bn: {
            title: "শর্ত ও প্রস্তুতি",
            description: "নামাজের আগে প্রয়োজনীয় বিষয়গুলো জেনে নাও",
            footer: "মনোযোগ দিয়ে ইবাদত করো।",

            cards: {
                wudu: "ওযু",
                ghusl: "গোসল",
                body: "শরীরের পবিত্রতা",
                clothing: "পোশাকের পবিত্রতা",
                place: "স্থানের পবিত্রতা",
                qibla: "কিবলামুখী হওয়া",
                satr: "সতর ঢাকা",
                niyyah: "নিয়ত",
                time: "নামাজের ওয়াক্ত",
                special: "বিশেষ পরিস্থিতি"
            }
        },

        en: {
            title: "Conditions & Preparation",
            description: "Learn what is needed before prayer",
            footer: "Worship with attention.",

            cards: {
                wudu: "Wudu",
                ghusl: "Ghusl",
                body: "Body Purity",
                clothing: "Clothing Purity",
                place: "Place Purity",
                qibla: "Face the Qibla",
                satr: "Covering the Awrah",
                niyyah: "Intention",
                time: "Prayer Times",
                special: "Special Situations"
            }
        },

        hi: {
            title: "शर्तें और तैयारी",
            description: "नमाज़ से पहले ज़रूरी बातें जानें",
            footer: "ध्यान से इबादत करें।",

            cards: {
                wudu: "वुज़ू",
                ghusl: "ग़ुस्ल",
                body: "शरीर की पवित्रता",
                clothing: "कपड़ों की पवित्रता",
                place: "जगह की पवित्रता",
                qibla: "क़िबला की ओर रुख़",
                satr: "सतर ढकना",
                niyyah: "नीयत",
                time: "नमाज़ का समय",
                special: "विशेष परिस्थितियाँ"
            }
        }
    };


    /* ================================================
       2. অপশনগুলোর লিংক

       দ্রষ্টব্য:
       namaz-purity.html এবং prayer-time.html
       প্রকৃত HTML filename-এর সঙ্গে মিলিয়ে নেবেন।
       ================================================ */

    const cardLinks = {
        wudu:
            "namaz-purity.html#lesson-wudu",

        ghusl:
            "namaz-purity.html#lesson-ghusl",

        body:
            "namaz-purity.html#lesson-body-purity",

        clothing:
            "namaz-purity.html#lesson-clothing-purity",

        place:
            "namaz-purity.html#lesson-place-purity",

        qibla:
            "qibla-direction.html",

        satr:
            "satr-covering.html",

        niyyah:
            "niyyah.html",

        time:
            "prayer-time.html",

        special:
            "special-situations.html"
    };


    /* ================================================
       3. localStorage থেকে সেটিংস পড়া
       ================================================ */

    function readAppSettings() {
        try {
            const saved = localStorage.getItem("appSettings");

            if (!saved) {
                return {};
            }

            const parsed = JSON.parse(saved);

            return parsed && typeof parsed === "object"
                ? parsed
                : {};
        } catch (error) {
            console.warn(
                "IBADAT: appSettings পড়া যায়নি।",
                error
            );

            return {};
        }
    }


    /* ================================================
       4. বর্তমান ভাষা নির্ধারণ
       ================================================ */

    function getCurrentLanguage() {
        const settings = readAppSettings();

        const candidates = [
            settings.lang,
            settings.language,
            localStorage.getItem("lang"),
            localStorage.getItem("language"),
            document.documentElement.lang
        ];

        for (const candidate of candidates) {
            if (
                typeof candidate === "string" &&
                Object.prototype.hasOwnProperty.call(
                    translations,
                    candidate
                )
            ) {
                return candidate;
            }
        }

        return "bn";
    }


    /* ================================================
       5. বর্তমান থিম নির্ধারণ
       ================================================ */

    function getCurrentTheme() {
        const settings = readAppSettings();

        const savedTheme =
            settings.theme ||
            localStorage.getItem("theme") ||
            localStorage.getItem("appTheme") ||
            "";

        if (
            savedTheme === "dark" ||
            settings.dark === true
        ) {
            return "dark";
        }

        if (
            savedTheme === "light" ||
            settings.dark === false
        ) {
            return "light";
        }

        return "light";
    }


    /* ================================================
       6. ভাষা প্রয়োগ
       ================================================ */

    function applyLanguage() {
        const language = getCurrentLanguage();
        const text = translations[language];

        document.documentElement.lang = language;

        const pageTitle =
            document.getElementById("pageTitle");

        const heroDescription =
            document.getElementById("heroDescription");

        const footerText =
            document.getElementById("footerText");

        if (pageTitle) {
            pageTitle.textContent = text.title;
        }

        if (heroDescription) {
            heroDescription.textContent =
                text.description;
        }

        if (footerText) {
            footerText.textContent = text.footer;
        }

        /*
         * data-card-key ব্যবহার করে কার্ড শনাক্ত করা হয়।
         * ফলে কার্ডের ক্রম বদলালেও ভুল লিংক হবে না।
         */

        document
            .querySelectorAll("[data-card-key]")
            .forEach(card => {
                const key = card.dataset.cardKey;

                const title = text.cards[key];

                const titleElement =
                    card.querySelector(".card-title") ||
                    card.querySelector(
                        "[data-i18n]"
                    ) ||
                    card.querySelector(
                        "span:last-child"
                    );

                if (titleElement && title) {
                    titleElement.textContent = title;
                }

                if (cardLinks[key]) {
                    card.setAttribute(
                        "href",
                        cardLinks[key]
                    );
                }
            });
    }


    /* ================================================
       7. থিম প্রয়োগ
       ================================================ */

    function applyTheme() {
        const theme = getCurrentTheme();

        document.documentElement.dataset.theme =
            theme;

        document.body.dataset.theme =
            theme;

        /*
         * CSS-এ html[data-theme="dark"] এবং
         * body[data-theme="dark"] ব্যবহৃত হয়েছে।
         */
    }


    /* ================================================
       8. Deep link navigation

       উদাহরণ:
       namaz-purity.html#lesson-wudu

       লক্ষ্য সেকশনের শুরু দেখানোর চেষ্টা করে।
       পুরো পেজের scrolling বন্ধ করে না।
       ================================================ */

    function scrollToHashTarget() {
        const hash = window.location.hash;

        if (!hash || hash.length < 2) {
            return;
        }

        let targetId;

        try {
            targetId = decodeURIComponent(
                hash.substring(1)
            );
        } catch (error) {
            targetId = hash.substring(1);
        }

        const target =
            document.getElementById(targetId);

        if (!target) {
            /*
             * লিংকের লক্ষ্য এই পেজে না থাকলে
             * কিছু করা হবে না।
             */
            return;
        }

        requestAnimationFrame(() => {
            target.scrollIntoView({
                behavior: "auto",
                block: "start"
            });
        });
    }


    /* ================================================
       9. Scroll behavior

       পেজে overflow:hidden প্রয়োগ করা হচ্ছে না।
       ছোট স্ক্রিনে কনটেন্ট বেশি হলে পেজ স্ক্রল হবে।
       ================================================ */

    function prepareScrolling() {
        document.documentElement.style.scrollBehavior =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
                ? "auto"
                : "smooth";
    }


    /* ================================================
       10. সেটিংস পরিবর্তন হলে পুনরায় প্রয়োগ
       ================================================ */

    function handleStorageChange(event) {
        const watchedKeys = [
            "appSettings",
            "lang",
            "language",
            "theme",
            "appTheme"
        ];

        if (
            !event ||
            event.key === null ||
            watchedKeys.includes(event.key)
        ) {
            applyLanguage();
            applyTheme();
        }
    }


    /* ================================================
       11. শুরু
       ================================================ */

    function initialize() {
        applyLanguage();
        applyTheme();
        prepareScrolling();

        /*
         * HTML ও ছবির লোড সম্পন্ন হলে
         * hash target-এর অবস্থান ঠিক করা।
         */

        window.addEventListener(
            "load",
            scrollToHashTarget,
            { once: true }
        );

        window.addEventListener(
            "hashchange",
            scrollToHashTarget
        );

        window.addEventListener(
            "storage",
            handleStorageChange
        );
    }


    /*
     * DOM প্রস্তুত থাকলে সঙ্গে সঙ্গে শুরু।
     * অন্যথায় DOMContentLoaded পর্যন্ত অপেক্ষা।
     */

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }

})();
