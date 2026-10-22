
// =====================================================
// IBADAT — কিবলামুখী হওয়া
// File: js/qibla-direction.js
//
// Features:
// 1. বাংলা, English ও हिन्दी ভাষা
// 2. Light / Dark theme
// 3. সেকশনে সরাসরি যাওয়া
// 4. পুরো পেজে স্বাভাবিক scrolling
// 5. App settings-এর সঙ্গে সামঞ্জস্য
// 6. Footer message update
// =====================================================

(() => {
    "use strict";

    /* ================================================
       1. অনুবাদ
       ================================================ */

    const translations = {
        bn: {
            title: "কিবলামুখী হওয়া",

            description:
                "নামাজে কিবলার দিকে মুখ করার নিয়ম ও প্রয়োজনীয় বিষয়গুলো জেনে নাও",

            footer:
                "মনোযোগ দিয়ে ইবাদত করো।",

            sections: {
                "heading-qibla-intro":
                    "কিবলা কী ও কেন?",

                "content-qibla-intro": [
                    "কিবলা হলো সেই দিক, যেদিকে মুখ করে মুসলিমরা নামাজ আদায় করেন। কাবা শরিফ মুসলিমদের কিবলা।",
                    "নামাজে কিবলামুখী হওয়া নামাজের গুরুত্বপূর্ণ শর্তগুলোর একটি। তাই নামাজ শুরু করার আগে কিবলার দিক সম্পর্কে নিশ্চিত হওয়ার চেষ্টা করতে হবে।"
                ],

                "heading-qibla-rule":
                    "কিবলামুখী হওয়ার নিয়ম",

                "content-qibla-rule": [
                    "নামাজের জন্য দাঁড়ানোর সময় কাবা শরিফের দিকে মুখ করতে হবে। আপনি যে স্থানে আছেন, সেখান থেকে কিবলার সঠিক দিক নির্ণয় করে সেই দিকে মুখ করে নামাজ শুরু করুন।"
                ],

                "heading-qibla-direction":
                    "কিবলার দিক কীভাবে জানবে?",

                "content-qibla-direction": [
                    "কিবলার দিক নির্ণয়ের জন্য একাধিক উপায় ব্যবহার করা যায়। নিজের অবস্থান অনুযায়ী নির্ভরযোগ্য পদ্ধতি বেছে নিন।",
                    "কম্পাস বা মোবাইলের দিকনির্দেশনা ব্যবহার করলে অবস্থান ও যন্ত্রের নির্ভুলতা যাচাই করা ভালো।"
                ],

                "heading-qibla-doubt":
                    "কিবলার দিক নিয়ে সন্দেহ হলে",

                "content-qibla-doubt": [
                    "কিবলার দিক নিয়ে সন্দেহ হলে আগে সম্ভব হলে যাচাই করে নিন। অনুমাননির্ভর সিদ্ধান্তের পরিবর্তে নির্ভরযোগ্য তথ্য বা সাহায্য নেওয়া উত্তম।",
                    "যাচাই করার সুযোগ না থাকলে আপনার অনুসৃত ফিকহ অনুযায়ী বিশ্বস্ত আলেমের কাছ থেকে নির্দেশনা নিন।"
                ],

                "heading-qibla-special":
                    "বিশেষ পরিস্থিতিতে কিবলা",

                "content-qibla-special": [
                    "অসুস্থতা, নিরাপত্তার ঝুঁকি, যানবাহনে অবস্থান বা অন্য কোনো অনিবার্য পরিস্থিতিতে স্বাভাবিকভাবে কিবলামুখী হওয়া সম্ভব নাও হতে পারে।",
                    "এমন অবস্থায় পরিস্থিতি অনুযায়ী ইসলামী বিধান প্রযোজ্য হতে পারে। বিশ্বস্ত আলেমের কাছ থেকে উপযুক্ত নির্দেশনা নেওয়া ভালো।"
                ],

                "heading-qibla-summary":
                    "মনে রাখার বিষয়"
            }
        },

        en: {
            title: "Facing the Qibla",

            description:
                "Learn how to face the Qibla and what to consider before prayer",

            footer:
                "Worship with attention.",

            sections: {
                "heading-qibla-intro":
                    "What Is the Qibla?",

                "content-qibla-intro": [
                    "The Qibla is the direction Muslims face when performing salah. The Kaaba in Makkah is the Qibla.",
                    "Facing the Qibla is an important condition of prayer. Try to establish the correct direction before beginning salah."
                ],

                "heading-qibla-rule":
                    "How to Face the Qibla",

                "content-qibla-rule": [
                    "Before beginning salah, determine the direction of the Kaaba from your location and face that direction."
                ],

                "heading-qibla-direction":
                    "How to Find the Qibla",

                "content-qibla-direction": [
                    "Several methods can help you find the Qibla. Choose a reliable method suitable for your location.",
                    "When using a compass or phone, check that your location and device readings are reliable."
                ],

                "heading-qibla-doubt":
                    "If You Are Unsure of the Direction",

                "content-qibla-doubt": [
                    "If possible, verify the direction before praying. Reliable information is preferable to an unsupported guess.",
                    "If verification is not possible, seek guidance from a trusted scholar according to the school of jurisprudence you follow."
                ],

                "heading-qibla-special":
                    "The Qibla in Special Circumstances",

                "content-qibla-special": [
                    "Illness, safety concerns, travel, or other unavoidable circumstances may make it difficult to face the Qibla normally.",
                    "Relevant rulings may depend on the circumstances. Seek appropriate guidance from a trusted scholar."
                ],

                "heading-qibla-summary":
                    "Remember"
            }
        },

        hi: {
            title: "क़िबला की ओर रुख़",

            description:
                "नमाज़ में क़िबले की ओर रुख़ करने के नियम जानें",

            footer:
                "ध्यान से इबादत करें।",

            sections: {
                "heading-qibla-intro":
                    "क़िबला क्या है?",

                "content-qibla-intro": [
                    "क़िबला वह दिशा है जिसकी ओर मुसलमान नमाज़ अदा करते समय रुख़ करते हैं। मक्का में स्थित काबा क़िबला है।",
                    "नमाज़ में क़िबले की ओर रुख़ करना एक महत्वपूर्ण शर्त है। नमाज़ शुरू करने से पहले सही दिशा जानने की कोशिश करें।"
                ],

                "heading-qibla-rule":
                    "क़िबले की ओर रुख़ करने का तरीका",

                "content-qibla-rule": [
                    "नमाज़ शुरू करने से पहले अपने स्थान से काबा की दिशा का पता लगाएँ और उसी दिशा में रुख़ करके नमाज़ पढ़ें।"
                ],

                "heading-qibla-direction":
                    "क़िबले की दिशा कैसे जानें?",

                "content-qibla-direction": [
                    "क़िबले की दिशा जानने के कई तरीके हैं। अपने स्थान के अनुसार विश्वसनीय तरीका चुनें।",
                    "कम्पास या मोबाइल का उपयोग करते समय स्थान और उपकरण की सटीकता जाँच लें।"
                ],

                "heading-qibla-doubt":
                    "दिशा के बारे में संदेह हो तो",

                "content-qibla-doubt": [
                    "यदि संभव हो तो नमाज़ से पहले दिशा की पुष्टि करें। बिना आधार के अनुमान लगाने के बजाय विश्वसनीय जानकारी लें।",
                    "यदि जाँच संभव न हो, तो अपने फ़िक़्ह के अनुसार किसी विश्वसनीय आलिम से मार्गदर्शन लें।"
                ],

                "heading-qibla-special":
                    "विशेष परिस्थितियों में क़िबला",

                "content-qibla-special": [
                    "बीमारी, सुरक्षा की समस्या, यात्रा या किसी मजबूरी में सामान्य रूप से क़िबले की ओर रुख़ करना कठिन हो सकता है।",
                    "ऐसी परिस्थितियों में संबंधित इस्लामी नियम लागू हो सकते हैं। विश्वसनीय आलिम से मार्गदर्शन लें।"
                ],

                "heading-qibla-summary":
                    "याद रखने योग्य बातें"
            }
        }
    };


    /* ================================================
       2. সেটিংস পড়া
       ================================================ */

    function readSettings() {
        try {
            const value =
                localStorage.getItem("appSettings");

            if (!value) {
                return {};
            }

            const settings = JSON.parse(value);

            return settings &&
                typeof settings === "object"
                ? settings
                : {};
        } catch (error) {
            return {};
        }
    }


    /* ================================================
       3. ভাষা নির্ধারণ
       ================================================ */

    function getLanguage() {
        const settings = readSettings();

        const candidates = [
            settings.lang,
            settings.language,
            localStorage.getItem("lang"),
            localStorage.getItem("language"),
            document.documentElement.lang
        ];

        for (const value of candidates) {
            if (
                typeof value === "string" &&
                Object.prototype.hasOwnProperty.call(
                    translations,
                    value
                )
            ) {
                return value;
            }
        }

        return "bn";
    }


    /* ================================================
       4. থিম নির্ধারণ
       ================================================ */

    function getTheme() {
        const settings = readSettings();

        const theme =
            settings.theme ||
            localStorage.getItem("theme") ||
            localStorage.getItem("appTheme");

        if (
            theme === "dark" ||
            settings.dark === true
        ) {
            return "dark";
        }

        return "light";
    }


    /* ================================================
       5. অনুবাদের জন্য নিরাপদ টেক্সট আপডেট
       ================================================ */

    function setText(id, value) {
        const element =
            document.getElementById(id);

        if (element && typeof value === "string") {
            element.textContent = value;
        }
    }


    /* ================================================
       6. বিষয়বস্তুর অনুবাদ
       ================================================ */

    function applyTranslations() {
        const language = getLanguage();
        const text = translations[language];

        document.documentElement.lang = language;

        setText("pageTitle", text.title);

        setText(
            "heroDescription",
            text.description
        );

        setText(
            "footerText",
            text.footer
        );

        /*
         * শিরোনাম অনুবাদ করা হচ্ছে।
         */

        Object.entries(text.sections).forEach(
            ([id, value]) => {
                if (typeof value === "string") {
                    setText(id, value);
                }
            }
        );

        /*
         * অনুচ্ছেদের অনুবাদ:
         * প্রতিটি কনটেন্ট বক্সের বিদ্যমান paragraph
         * element-গুলোতেই লেখা বসানো হয়।
         */

        Object.entries(text.sections).forEach(
            ([id, value]) => {
                if (!Array.isArray(value)) {
                    return;
                }

                const container =
                    document.getElementById(id);

                if (!container) {
                    return;
                }

                const paragraphs =
                    container.querySelectorAll("p");

                value.forEach((paragraph, index) => {
                    if (paragraphs[index]) {
                        paragraphs[index].textContent =
                            paragraph;
                    }
                });
            }
        );
    }


    /* ================================================
       7. থিম প্রয়োগ
       ================================================ */

    function applyTheme() {
        const theme = getTheme();

        document.documentElement.dataset.theme =
            theme;

        document.body.dataset.theme =
            theme;
    }


    /* ================================================
       8. URL hash থেকে নির্দিষ্ট বোর্ডে যাওয়া
       ================================================ */

    function scrollToHashTarget() {
        const hash = window.location.hash;

        if (!hash || hash.length < 2) {
            return;
        }

        let id;

        try {
            id = decodeURIComponent(
                hash.substring(1)
            );
        } catch (error) {
            id = hash.substring(1);
        }

        const target =
            document.getElementById(id);

        if (!target) {
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
       9. পুরো পেজের scrolling সচল রাখা
       ================================================ */

    function configureScrolling() {
        /*
         * এই পেজে overflow:hidden প্রয়োগ করা হবে না।
         * দীর্ঘ কনটেন্ট হলে পুরো পেজ স্বাভাবিকভাবে স্ক্রল হবে।
         */

        document.documentElement.style.overflowY =
            "auto";

        document.body.style.overflowY =
            "auto";
    }


    /* ================================================
       10. সেটিংস পরিবর্তন পর্যবেক্ষণ
       ================================================ */

    function onSettingsChanged(event) {
        if (
            !event ||
            event.key === null ||
            [
                "appSettings",
                "lang",
                "language",
                "theme",
                "appTheme"
            ].includes(event.key)
        ) {
            applyTranslations();
            applyTheme();
        }
    }


    /* ================================================
       11. শুরু
       ================================================ */

    function initialize() {
        applyTranslations();
        applyTheme();
        configureScrolling();

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
            onSettingsChanged
        );
    }


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
