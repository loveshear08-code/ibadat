"use strict";

/* =========================================================
   IBADAT — COMPLETE QURAN APPLICATION
   File: js/quran.js

   Features:
   - All 114 Surahs
   - Complete Arabic Quran text from AlQuran Cloud API
   - Bengali, Hindi and English translations
   - Surah selection
   - Ayah-by-ayah navigation
   - Audio play, pause and resume
   - Automatic next-ayah playback
   - Cross-surah navigation
   - Arabic font-size controls
   - Language preference detection
   - Dark/light theme preference detection
   - Browser/mobile Back navigation
   - Loading and error handling
   - Request cancellation and stale-request protection

   Required files:
   html/quran.html
   css/quran.css
   js/quran.js

   Required images:
   assets/hero-bg.jpg
   assets/main-bg.jpg

   API:
   https://api.alquran.cloud/v1
   ========================================================= */


/* =========================================================
   1. CONFIGURATION
   ========================================================= */

const QuranApp = (() => {

    const API_BASE = "https://api.alquran.cloud/v1";

    const EDITIONS = {
        arabic: "quran-uthmani",
        audio: "ar.alafasy",

        bn: "bn.bengali",
        hi: "hi.hindi",
        en: "en.sahih"
    };

    const DEFAULT_LANGUAGE = "bn";

    const DEFAULT_SURAH = 1;
    const DEFAULT_AYAH = 1;

    const MIN_ARABIC_FONT = 20;
    const MAX_ARABIC_FONT = 54;
    const DEFAULT_ARABIC_FONT = 30;
    const ARABIC_FONT_STEP = 2;

    const REQUEST_TIMEOUT = 25000;

    const LANGUAGE_KEYS = [
        "ibadat_language",
        "siteLanguage",
        "selectedLanguage",
        "language",
        "lang",
        "preferredLanguage"
    ];

    const THEME_KEYS = [
        "ibadat_theme",
        "siteTheme",
        "selectedTheme",
        "theme",
        "darkMode",
        "dark_mode"
    ];

    const LANGUAGE_CODES = {
        bn: "bn",
        bengali: "bn",
        bangla: "bn",
        বাংলা: "bn",

        hi: "hi",
        hindi: "hi",
        हिन्दी: "hi",
        हिंदी: "hi",

        en: "en",
        english: "en",
        ইংরেজি: "en"
    };


    /* =====================================================
       2. TRANSLATABLE UI TEXT
       ===================================================== */

    const UI_TEXT = {

        bn: {
            pageTitle: "আল-কুরআন | ইবাদত",

            heroTitle: "আল-কুরআন",
            heroSubtitle: "পবিত্র কুরআন শিখি ও বুঝি",

            featuredEyebrow: "পবিত্র কুরআন",
            featuredTitle: "সূরা আল-ফাতিহা",
            featuredTranslation:
                "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",

            featuredPlay: "তিলাওয়াত শুনুন",

            readOptionTitle: "কুরআন পড়ুন",
            readOptionDescription: "আরবি পড়ুন ও অর্থ বুঝুন",

            listenOptionTitle: "তিলাওয়াত শুনুন",
            listenOptionDescription:
                "শুনুন পবিত্র কুরআনের তিলাওয়াত",

            readEyebrow: "শুদ্ধভাবে পড়ুন",
            readTitle: "কুরআন পড়ুন",
            readDescription:
                "আরবি তিলাওয়াত পড়ুন এবং আয়াতের অর্থ জানুন।",

            listenEyebrow: "মনোযোগ দিয়ে শুনুন",
            listenTitle: "তিলাওয়াত শুনুন",
            listenDescription:
                "পবিত্র কুরআনের সুমধুর তিলাওয়াত শুনুন।",

            readSurahLabel: "পড়ার জন্য সূরা নির্বাচন করুন",
            listenSurahLabel: "তিলাওয়াতের জন্য সূরা নির্বাচন করুন",

            fontSizeLabel: "লেখার আকার",

            currentAyah: "বর্তমানে চলছে",
            ayahListTitle: "আয়াতের তালিকা",
            ayahListDescription:
                "যে আয়াত শুনতে চান, সেটি নির্বাচন করুন।",

            play: "তিলাওয়াত চালু করুন",
            pause: "তিলাওয়াত থামান",
            resume: "তিলাওয়াত আবার চালু করুন",

            previousAyah: "আগের আয়াত",
            nextAyah: "পরের আয়াত",

            readFooter: "শুদ্ধভাবে কুরআন পড়ুন",
            homeFooter: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",

            loadingSurahs: "সূরার তালিকা লোড হচ্ছে…",
            loadingAyahs: "আয়াত লোড হচ্ছে…",
            loadingAudio: "তিলাওয়াত লোড হচ্ছে…",

            ready: "তিলাওয়াত শুরু করতে প্লে বোতাম চাপুন।",
            playing: "তিলাওয়াত চলছে…",
            paused: "তিলাওয়াত থামানো হয়েছে।",
            audioEnded: "তিলাওয়াত শেষ হয়েছে।",

            surah: "সূরা",
            ayah: "আয়াত",
            ayahs: "আয়াত",
            juz: "পারা",
            revelation: "নাজিলের স্থান",

            meccan: "মাক্কী",
            medinan: "মাদানী",
            unknown: "অজানা",

            networkError:
                "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",

            apiError:
                "কুরআনের তথ্য লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।",

            translationError:
                "এই ভাষার অনুবাদ এখন লোড করা যায়নি।",

            audioError:
                "এই আয়াতের অডিও চালানো যাচ্ছে না। আবার চেষ্টা করুন।",

            audioUnsupported:
                "আপনার ব্রাউজারে অডিও চালানোর সুবিধা পাওয়া যাচ্ছে না।",

            noAyahs: "এই সূরার আয়াত পাওয়া যায়নি।",

            firstAyah: "এটিই প্রথম আয়াত।",
            lastAyah: "শেষ সূরা ও শেষ আয়াতে পৌঁছে গেছেন।",

            playingAyah: "আয়াতের তিলাওয়াত চলছে।",
            selectedAyah: "আয়াত নির্বাচন করা হয়েছে।",

            surahOption: "সূরা নির্বাচন করুন",

            home: "মূল পাতা",
            read: "কুরআন পড়ুন",
            listen: "তিলাওয়াত শুনুন",

            unknownError: "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।"
        },


        hi: {
            pageTitle: "अल-क़ुरआन | इबादत",

            heroTitle: "अल-क़ुरआन",
            heroSubtitle: "पवित्र क़ुरआन सीखें और समझें",

            featuredEyebrow: "पवित्र क़ुरआन",
            featuredTitle: "सूरह अल-फ़ातिहा",
            featuredTranslation:
                "अल्लाह के नाम से, जो अत्यंत कृपाशील, अत्यंत दयावान है।",

            featuredPlay: "तिलावत सुनें",

            readOptionTitle: "क़ुरआन पढ़ें",
            readOptionDescription: "अरबी पढ़ें और अर्थ समझें",

            listenOptionTitle: "तिलावत सुनें",
            listenOptionDescription: "पवित्र क़ुरआन की तिलावत सुनें",

            readEyebrow: "सही तरीके से पढ़ें",
            readTitle: "क़ुरआन पढ़ें",
            readDescription:
                "अरबी पढ़ें और प्रत्येक आयत का अर्थ जानें।",

            listenEyebrow: "ध्यान से सुनें",
            listenTitle: "तिलावत सुनें",
            listenDescription:
                "पवित्र क़ुरआन की मधुर तिलावत सुनें।",

            readSurahLabel: "पढ़ने के लिए सूरह चुनें",
            listenSurahLabel: "तिलावत के लिए सूरह चुनें",

            fontSizeLabel: "लिखावट का आकार",

            currentAyah: "अभी चल रहा है",
            ayahListTitle: "आयतों की सूची",
            ayahListDescription:
                "जिस आयत को सुनना चाहते हैं, उसे चुनें।",

            play: "तिलावत शुरू करें",
            pause: "तिलावत रोकें",
            resume: "तिलावत फिर शुरू करें",

            previousAyah: "पिछली आयत",
            nextAyah: "अगली आयत",

            readFooter: "क़ुरआन सही तरीके से पढ़ें",
            homeFooter: "इबादत • पवित्रता की राह पर सीखना और अभ्यास",

            loadingSurahs: "सूरह की सूची लोड हो रही है…",
            loadingAyahs: "आयतें लोड हो रही हैं…",
            loadingAudio: "तिलावत लोड हो रही है…",

            ready: "तिलावत शुरू करने के लिए प्ले बटन दबाएँ।",
            playing: "तिलावत चल रही है…",
            paused: "तिलावत रोक दी गई है।",
            audioEnded: "तिलावत समाप्त हो गई।",

            surah: "सूरह",
            ayah: "आयत",
            ayahs: "आयतें",
            juz: "पारा",
            revelation: "नाज़िल होने का स्थान",

            meccan: "मक्की",
            medinan: "मदनी",
            unknown: "अज्ञात",

            networkError:
                "इंटरनेट कनेक्शन जाँचें और फिर कोशिश करें।",

            apiError:
                "क़ुरआन की जानकारी लोड नहीं हो सकी। कृपया फिर कोशिश करें।",

            translationError:
                "इस भाषा का अनुवाद अभी लोड नहीं हो सका।",

            audioError:
                "इस आयत का ऑडियो नहीं चल सका। फिर कोशिश करें।",

            audioUnsupported:
                "आपके ब्राउज़र में ऑडियो सुविधा उपलब्ध नहीं है।",

            noAyahs: "इस सूरह की आयतें नहीं मिलीं।",

            firstAyah: "यह पहली आयत है।",
            lastAyah: "आप अंतिम सूरह और अंतिम आयत तक पहुँच गए हैं।",

            playingAyah: "आयत की तिलावत चल रही है।",
            selectedAyah: "आयत चुनी गई है।",

            surahOption: "सूरह चुनें",

            home: "मुख्य पृष्ठ",
            read: "क़ुरआन पढ़ें",
            listen: "तिलावत सुनें",

            unknownError: "एक समस्या हुई। फिर कोशिश करें।"
        },


        en: {
            pageTitle: "The Holy Quran | Ibadat",

            heroTitle: "The Holy Quran",
            heroSubtitle: "Learn and understand the Holy Quran",

            featuredEyebrow: "The Holy Quran",
            featuredTitle: "Surah Al-Fatihah",
            featuredTranslation:
                "In the name of Allah, the Most Compassionate, Most Merciful.",

            featuredPlay: "Listen to recitation",

            readOptionTitle: "Read the Quran",
            readOptionDescription: "Read Arabic and understand its meaning",

            listenOptionTitle: "Listen to recitation",
            listenOptionDescription: "Listen to the Holy Quran",

            readEyebrow: "Read correctly",
            readTitle: "Read the Quran",
            readDescription:
                "Read the Arabic text and learn the meaning of each ayah.",

            listenEyebrow: "Listen attentively",
            listenTitle: "Listen to recitation",
            listenDescription:
                "Listen to the beautiful recitation of the Holy Quran.",

            readSurahLabel: "Select a surah to read",
            listenSurahLabel: "Select a surah to listen to",

            fontSizeLabel: "Text size",

            currentAyah: "Now playing",
            ayahListTitle: "Ayah list",
            ayahListDescription:
                "Select the ayah you want to listen to.",

            play: "Start recitation",
            pause: "Pause recitation",
            resume: "Resume recitation",

            previousAyah: "Previous ayah",
            nextAyah: "Next ayah",

            readFooter: "Read the Quran correctly",
            homeFooter: "Ibadat • Learning and practice on the path to purity",

            loadingSurahs: "Loading surah list…",
            loadingAyahs: "Loading ayahs…",
            loadingAudio: "Loading recitation…",

            ready: "Press play to begin recitation.",
            playing: "Recitation is playing…",
            paused: "Recitation paused.",
            audioEnded: "Recitation finished.",

            surah: "Surah",
            ayah: "Ayah",
            ayahs: "ayahs",
            juz: "Juz",
            revelation: "Place of revelation",

            meccan: "Meccan",
            medinan: "Medinan",
            unknown: "Unknown",

            networkError:
                "Check your internet connection and try again.",

            apiError:
                "Unable to load Quran data. Please try again shortly.",

            translationError:
                "The translation in this language could not be loaded.",

            audioError:
                "Unable to play this ayah. Please try again.",

            audioUnsupported:
                "Audio playback is not supported by this browser.",

            noAyahs: "No ayahs were found for this surah.",

            firstAyah: "This is the first ayah.",
            lastAyah: "You have reached the final ayah of the final surah.",

            playingAyah: "Ayah recitation is playing.",
            selectedAyah: "Ayah selected.",

            surahOption: "Select a surah",

            home: "Home",
            read: "Read Quran",
            listen: "Listen",

            unknownError: "Something went wrong. Please try again."
        }

    };


    /* =====================================================
       3. SURAH NAMES
       Used as local fallback if the API is unavailable.
       API metadata remains the primary source.
       ===================================================== */

    const SURAH_NAMES = [

        "আল-ফাতিহা",
        "আল-বাকারা",
        "আলে ইমরান",
        "আন-নিসা",
        "আল-মায়িদা",
        "আল-আনআম",
        "আল-আরাফ",
        "আল-আনফাল",
        "আত-তাওবা",
        "ইউনুস",
        "হুদ",
        "ইউসুফ",
        "আর-রাদ",
        "ইবরাহিম",
        "আল-হিজর",
        "আন-নাহল",
        "আল-ইসরা",
        "আল-কাহফ",
        "মারইয়াম",
        "ত্বা-হা",
        "আল-আম্বিয়া",
        "আল-হাজ্জ",
        "আল-মুমিনুন",
        "আন-নূর",
        "আল-ফুরকান",
        "আশ-শুআরা",
        "আন-নামল",
        "আল-কাসাস",
        "আল-আনকাবুত",
        "আর-রূম",
        "লুকমান",
        "আস-সাজদা",
        "আল-আহযাব",
        "সাবা",
        "ফাতির",
        "ইয়াসিন",
        "আস-সাফফাত",
        "সাদ",
        "আয-যুমার",
        "গাফির",
        "ফুসসিলাত",
        "আশ-শূরা",
        "আয-যুখরুফ",
        "আদ-দুখান",
        "আল-জাসিয়া",
        "আল-আহকাফ",
        "মুহাম্মদ",
        "আল-ফাতহ",
        "আল-হুজুরাত",
        "কাফ",
        "আয-যারিয়াত",
        "আত-তূর",
        "আন-নাজম",
        "আল-কামার",
        "আর-রহমান",
        "আল-ওয়াকিয়া",
        "আল-হাদিদ",
        "আল-মুজাদিলা",
        "আল-হাশর",
        "আল-মুমতাহিনা",
        "আস-সাফ",
        "আল-জুমুআ",
        "আল-মুনাফিকুন",
        "আত-তাগাবুন",
        "আত-তালাক",
        "আত-তাহরিম",
        "আল-মুলক",
        "আল-কলম",
        "আল-হাক্কা",
        "আল-মাআরিজ",
        "নূহ",
        "আল-জিন",
        "আল-মুযযাম্মিল",
        "আল-মুদ্দাসসির",
        "আল-কিয়ামা",
        "আল-ইনসান",
        "আল-মুরসালাত",
        "আন-নাবা",
        "আন-নাযিআত",
        "আবাসা",
        "আত-তাকভির",
        "আল-ইনফিতার",
        "আল-মুতাফফিফিন",
        "আল-ইনশিকাক",
        "আল-বুরুজ",
        "আত-তারিক",
        "আল-আলা",
        "আল-গাশিয়া",
        "আল-ফজর",
        "আল-বালাদ",
        "আশ-শামস",
        "আল-লাইল",
        "আদ-দুহা",
        "আশ-শারহ",
        "আত-তিন",
        "আল-আলাক",
        "আল-কদর",
        "আল-বাইয়্যিনাহ",
        "আয-যিলযাল",
        "আল-আদিয়াত",
        "আল-কারিআহ",
        "আত-তাকাসুর",
        "আল-আসর",
        "আল-হুমাযাহ",
        "আল-ফিল",
        "কুরাইশ",
        "আল-মাউন",
        "আল-কাউসার",
        "আল-কাফিরুন",
        "আন-নাসর",
        "আল-মাসাদ",
        "আল-ইখলাস",
        "আল-ফালাক",
        "আন-নাস"

    ];


    /* =====================================================
       4. APPLICATION STATE
       ===================================================== */

    const state = {

        initialized: false,

        language: DEFAULT_LANGUAGE,

        theme: "light",

        currentPage: "home",

        surahs: [],

        readSurah: DEFAULT_SURAH,
        readAyah: DEFAULT_AYAH,

        listenSurah: DEFAULT_SURAH,
        listenAyah: DEFAULT_AYAH,

        readData: new Map(),
        listenData: new Map(),

        readLoading: false,
        listenLoading: false,

        readRequestId: 0,
        listenRequestId: 0,

        audioRequestId: 0,

        audioPlaying: false,
        audioLoading: false,

        pendingAutoPlay: false,

        arabicFontSize: DEFAULT_ARABIC_FONT,

        toastTimer: null,

        historyInitialized: false,

        pendingReadSurah: null,
        pendingListenSurah: null

    };


    /* =====================================================
       5. DOM HELPERS
       ===================================================== */

    const $ = (id) => document.getElementById(id);


    function setText(id, value) {
        const element = $(id);

        if (element) {
            element.textContent = value == null ? "" : String(value);
        }
    }


    function showElement(element, visible = true) {
        if (!element) {
            return;
        }

        element.hidden = !visible;
    }


    function getText(key) {
        const dictionary = UI_TEXT[state.language] || UI_TEXT.bn;

        return dictionary[key] || UI_TEXT.bn[key] || key;
    }


    function getSurah(id) {
        return state.surahs.find(
            (surah) => Number(surah.number) === Number(id)
        ) || null;
    }


    function normalizeLanguage(value) {
        if (value == null) {
            return null;
        }

        const normalized = String(value)
            .trim()
            .toLowerCase();

        return LANGUAGE_CODES[normalized] || null;
    }


    function safeStorageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }


    function safeStorageSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // Storage may be unavailable in private browsing.
        }
    }


    function persistLanguage(language) {
        safeStorageSet("ibadat_language", language);
    }


    function detectLanguage() {

        for (const key of LANGUAGE_KEYS) {

            const value = safeStorageGet(key);
            const normalized = normalizeLanguage(value);

            if (normalized) {
                return normalized;
            }

        }

        const htmlLanguage = document.documentElement.lang;

        const fromHTML = normalizeLanguage(htmlLanguage);

        if (fromHTML) {
            return fromHTML;
        }

        const browserLanguage =
            navigator.language ||
            navigator.userLanguage ||
            "";

        const normalizedBrowser =
            normalizeLanguage(browserLanguage);

        if (normalizedBrowser) {
            return normalizedBrowser;
        }

        if (/^hi(?:-|$)/i.test(browserLanguage)) {
            return "hi";
        }

        if (/^en(?:-|$)/i.test(browserLanguage)) {
            return "en";
        }

        return DEFAULT_LANGUAGE;
    }


    function detectTheme() {

        for (const key of THEME_KEYS) {

            const value = safeStorageGet(key);

            if (value == null) {
                continue;
            }

            const normalized = String(value)
                .trim()
                .toLowerCase();

            if (
                normalized === "dark" ||
                normalized === "true" ||
                normalized === "1" ||
                normalized === "enabled"
            ) {
                return "dark";
            }

            if (
                normalized === "light" ||
                normalized === "false" ||
                normalized === "0" ||
                normalized === "disabled"
            ) {
                return "light";
            }

        }

        if (
            document.body.classList.contains("dark-mode") ||
            document.documentElement.classList.contains("dark-mode")
        ) {
            return "dark";
        }

        if (
            document.body.classList.contains("light-mode") ||
            document.documentElement.classList.contains("light-mode")
        ) {
            return "light";
        }

        return "light";
    }


    /* =====================================================
       6. TOAST / STATUS HELPERS
       ===================================================== */

    function showToast(message) {

        const toast = $("quranToast");

        if (!toast) {
            return;
        }

        if (state.toastTimer) {
            clearTimeout(state.toastTimer);
            state.toastTimer = null;
        }

        toast.textContent = message;
        toast.hidden = false;

        state.toastTimer = setTimeout(() => {
            toast.hidden = true;
        }, 3500);
    }


    function setStatus(id, message, visible = true) {

        const element = $(id);

        if (!element) {
            return;
        }

        element.textContent = message;
        element.hidden = !visible;
    }


    function showError(id, message) {

        const element = $(id);

        if (!element) {
            showToast(message);
            return;
        }

        element.textContent = message;
        element.hidden = false;
    }


    function clearError(id) {
        const element = $(id);

        if (element) {
            element.textContent = "";
            element.hidden = true;
        }
    }


    function isNetworkAvailable() {
        return navigator.onLine !== false;
    }


    /* =====================================================
       7. FETCH HELPER
       ===================================================== */

    async function fetchJSON(url, options = {}) {

        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, REQUEST_TIMEOUT);

        const externalSignal = options.signal;

        let externalAbortHandler = null;

        if (externalSignal) {

            if (externalSignal.aborted) {
                controller.abort();
            } else {

                externalAbortHandler = () => {
                    controller.abort();
                };

                externalSignal.addEventListener(
                    "abort",
                    externalAbortHandler,
                    { once: true }
                );

            }

        }

        try {

            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    Accept: "application/json",
                    ...(options.headers || {})
                }
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const payload = await response.json();

            if (
                payload.status &&
                payload.status !== "OK"
            ) {
                throw new Error(
                    payload.data || payload.status
                );
            }

            return payload;

        } finally {

            clearTimeout(timeoutId);

            if (
                externalSignal &&
                externalAbortHandler
            ) {
                externalSignal.removeEventListener(
                    "abort",
                    externalAbortHandler
                );
            }

        }

    }


    /* =====================================================
       8. SURAH NAME AND METADATA HELPERS
       ===================================================== */

    function getSurahDisplayName(surahNumber) {

        const surah = getSurah(surahNumber);

        if (!surah) {
            return `${getText("surah")} ${surahNumber}`;
        }

        const englishName = surah.englishName || "";

        const arabicName = surah.name || "";

        const localizedFallback =
            SURAH_NAMES[Number(surahNumber) - 1] || "";

        if (state.language === "en") {
            return englishName || `Surah ${surahNumber}`;
        }

        if (state.language === "hi") {

            const hindiName =
                surah.hindiName ||
                localizedFallback ||
                englishName;

            return hindiName || `सूरह ${surahNumber}`;
        }

        const localizedName =
            surah.bengaliName ||
            localizedFallback ||
            englishName;

        return localizedName || `সূরা ${surahNumber}`;
    }


    function getSurahMetadataText(surah) {

        if (!surah) {
            return "";
        }

        const place =
            surah.revelationType === "Meccan"
                ? getText("meccan")
                : surah.revelationType === "Medinan"
                    ? getText("medinan")
                    : getText("unknown");

        return (
            `${getText("surah")} ${surah.number}` +
            ` · ${surah.numberOfAyahs} ${getText("ayahs")}` +
            ` · ${place}`
        );
    }


    function getArabicSurahName(surah) {
        return surah?.name || "";
    }


    function updateSurahInformation(prefix, surahNumber) {

        const surah = getSurah(surahNumber);

        if (!surah) {
            return;
        }

        setText(
            `${prefix}SurahTitle`,
            getSurahDisplayName(surahNumber)
        );

        setText(
            `${prefix}SurahMeta`,
            getSurahMetadataText(surah)
        );

        setText(
            `${prefix}SurahArabicName`,
            getArabicSurahName(surah)
        );

    }


    /* =====================================================
       9. SURAH SELECTORS
       ===================================================== */

    function populateSurahSelector(selectorId) {

        const selector = $(selectorId);

        if (!selector) {
            return;
        }

        const previousValue = Number(selector.value) || 0;

        const fragment = document.createDocumentFragment();

        state.surahs.forEach((surah) => {

            const option = document.createElement("option");

            option.value = String(surah.number);

            option.textContent =
                `${String(surah.number).padStart(3, "0")}. ` +
                getSurahDisplayName(surah.number);

            fragment.appendChild(option);

        });

        selector.replaceChildren(fragment);

        const desiredValue =
            previousValue >= 1 && previousValue <= 114
                ? previousValue
                : selectorId === "readSurahSelect"
                    ? state.readSurah
                    : state.listenSurah;

        selector.value = String(desiredValue);

    }


    function refreshSurahSelectors() {

        populateSurahSelector("readSurahSelect");
        populateSurahSelector("listenSurahSelect");

        if ($("readSurahSelect")) {
            $("readSurahSelect").value = String(state.readSurah);
        }

        if ($("listenSurahSelect")) {
            $("listenSurahSelect").value = String(state.listenSurah);
        }

    }


    /* =====================================================
       10. LANGUAGE / THEME LABELS
       ===================================================== */

    function renderPageLabels() {

        const t = UI_TEXT[state.language] || UI_TEXT.bn;

        document.documentElement.lang =
            state.language === "bn"
                ? "bn"
                : state.language === "hi"
                    ? "hi"
                    : "en";

        document.title = t.pageTitle;

        setText("heroTitle", t.heroTitle);
        setText("heroSubtitle", t.heroSubtitle);

        setText("featuredEyebrow", t.featuredEyebrow);
        setText("featuredTitle", t.featuredTitle);
        setText("featuredTranslation", t.featuredTranslation);
        setText("featuredPlayText", t.featuredPlay);

        setText("readOptionTitle", t.readOptionTitle);
        setText("readOptionDescription", t.readOptionDescription);

        setText("listenOptionTitle", t.listenOptionTitle);
        setText("listenOptionDescription", t.listenOptionDescription);

        setText("readBoardEyebrow", t.readEyebrow);
        setText("readBoardTitle", t.readTitle);
        setText("readBoardDescription", t.readDescription);

        setText("listenBoardEyebrow", t.listenEyebrow);
        setText("listenBoardTitle", t.listenTitle);
        setText("listenBoardDescription", t.listenDescription);

        setText("readSurahSelectLabel", t.readSurahLabel);
        setText("listenSurahSelectLabel", t.listenSurahLabel);

        setText("fontSizeLabel", t.fontSizeLabel);

        setText("listenCurrentAyahLabel", t.currentAyah);

        setText("listenAyahListTitle", t.ayahListTitle);
        setText(
            "listenAyahListDescription",
            t.ayahListDescription
        );

        setText("readFooterMessage", t.readFooter);
        setText("homeFooterMessage", t.homeFooter);

        const previous = $("previousAyah");
        const next = $("nextAyah");

        const listenPrevious = $("listenPrevious");
        const listenNext = $("listenNext");
        const playPause = $("listenPlayPause");

        if (previous) {
            previous.setAttribute("aria-label", t.previousAyah);
            previous.title = t.previousAyah;
        }

        if (next) {
            next.setAttribute("aria-label", t.nextAyah);
            next.title = t.nextAyah;
        }

        if (listenPrevious) {
            listenPrevious.setAttribute(
                "aria-label",
                t.previousAyah
            );

            listenPrevious.title = t.previousAyah;
        }

        if (listenNext) {
            listenNext.setAttribute(
                "aria-label",
                t.nextAyah
            );

            listenNext.title = t.nextAyah;
        }

        if (playPause) {
            playPause.setAttribute(
                "aria-label",
                state.audioPlaying ? t.pause : t.play
            );

            playPause.title =
                state.audioPlaying ? t.pause : t.play;
        }

        updateSurahInformation("read", state.readSurah);
        updateSurahInformation("listen", state.listenSurah);

        refreshSurahSelectors();

        updateAudioButtonState();

    }


    function applyLanguage(language, options = {}) {

        const normalized = normalizeLanguage(language);

        if (!normalized) {
            return false;
        }

        if (state.language === normalized && !options.force) {
            return true;
        }

        const oldLanguage = state.language;

        state.language = normalized;

        if (options.persist !== false) {
            persistLanguage(normalized);
        }

        renderPageLabels();

        if (oldLanguage !== normalized) {

            if (state.readData.has(state.readSurah)) {
                renderReadAyahs(state.readSurah);
            }

            if (state.listenData.has(state.listenSurah)) {
                renderListenAyahs(state.listenSurah);
                updateCurrentListenAyah();
            }

            if (state.currentPage === "read") {
                loadReadSurah(
                    state.readSurah,
                    { preserveAyah: true }
                );
            }

            if (state.currentPage === "listen") {
                loadListenSurah(
                    state.listenSurah,
                    {
                        preserveAyah: true,
                        preservePlayback: true
                    }
                );
            }

        }

        return true;
    }


    function applyTheme(theme) {

        const normalized =
            String(theme).toLowerCase() === "dark"
                ? "dark"
                : "light";

        state.theme = normalized;

        const isDark = normalized === "dark";

        document.body.classList.toggle("dark-mode", isDark);
        document.body.classList.toggle("light-mode", !isDark);

        document.documentElement.classList.toggle(
            "dark-mode",
            isDark
        );

        document.documentElement.classList.toggle(
            "light-mode",
            !isDark
        );

        const app = $("quranApp");

        if (app) {
            app.classList.toggle("dark-mode", isDark);
            app.classList.toggle("light-mode", !isDark);
        }

    }


    function handleExternalLanguageChange(event) {

        if (!event || !event.key) {
            return;
        }

        if (!LANGUAGE_KEYS.includes(event.key)) {
            return;
        }

        const language = normalizeLanguage(event.newValue);

        if (language && language !== state.language) {
            applyLanguage(language, { persist: false });
        }

    }


    function handleExternalThemeChange(event) {

        if (!event || !event.key) {
            return;
        }

        if (!THEME_KEYS.includes(event.key)) {
            return;
        }

        if (event.newValue == null) {
            return;
        }

        applyTheme(event.newValue);
    }


    /* =====================================================
       11. API SURAH METADATA
       ===================================================== */

    async function loadSurahMetadata() {

        try {

            const payload = await fetchJSON(
                `${API_BASE}/surah`
            );

            if (
                !payload.data ||
                !Array.isArray(payload.data) ||
                payload.data.length !== 114
            ) {
                throw new Error(
                    "Invalid surah metadata"
                );
            }

            state.surahs = payload.data.map((surah) => ({
                ...surah,

                bengaliName:
                    SURAH_NAMES[Number(surah.number) - 1] ||
                    surah.englishName,

                hindiName:
                    surah.englishName
            }));

            refreshSurahSelectors();

            renderPageLabels();

            return true;

        } catch (error) {

            console.error(
                "[Quran] Unable to load surah metadata:",
                error
            );

            state.surahs = createFallbackSurahs();

            refreshSurahSelectors();

            renderPageLabels();

            return false;
        }

    }


    function createFallbackSurahs() {

        return SURAH_NAMES.map((name, index) => ({

            number: index + 1,

            name: "",

            englishName: name,

            bengaliName: name,

            hindiName: name,

            numberOfAyahs: 0,

            revelationType: "Unknown"

        }));

    }


    /* =====================================================
       12. SURAH DATA REQUESTS
       ===================================================== */

    async function fetchSurahEdition(
        surahNumber,
        edition
    ) {

        const payload = await fetchJSON(
            `${API_BASE}/surah/${surahNumber}/${encodeURIComponent(edition)}`
        );

        if (!payload.data) {
            throw new Error("Missing Quran data");
        }

        return payload.data;
    }


    async function fetchCompleteSurah(
        surahNumber,
        language
    ) {

        const translationEdition =
            EDITIONS[language] || EDITIONS.bn;

        const results = await Promise.allSettled([

            fetchSurahEdition(
                surahNumber,
                EDITIONS.arabic
            ),

            fetchSurahEdition(
                surahNumber,
                translationEdition
            )

        ]);

        if (results[0].status !== "fulfilled") {
            throw results[0].reason;
        }

        const arabicSurah = results[0].value;

        const translationSurah =
            results[1].status === "fulfilled"
                ? results[1].value
                : null;

        const arabicAyahs =
            Array.isArray(arabicSurah.ayahs)
                ? arabicSurah.ayahs
                : [];

        const translatedAyahs =
            translationSurah &&
            Array.isArray(translationSurah.ayahs)
                ? translationSurah.ayahs
                : [];

        const translatedMap = new Map();

        translatedAyahs.forEach((ayah) => {
            translatedMap.set(
                Number(ayah.numberInSurah),
                ayah
            );
        });

        const ayahs = arabicAyahs.map((ayah) => {

            const translated =
                translatedMap.get(
                    Number(ayah.numberInSurah)
                );

            return {

                ...ayah,

                number: Number(ayah.number),

                numberInSurah:
                    Number(ayah.numberInSurah),

                text: ayah.text || "",

                translation:
                    translated?.text || "",

                translationAvailable:
                    Boolean(translated?.text),

                audioUrl: null

            };

        });

        return {

            surahNumber: Number(surahNumber),

            arabicName: arabicSurah.name || "",

            englishName:
                arabicSurah.englishName || "",

            numberOfAyahs:
                Number(arabicSurah.numberOfAyahs) ||
                ayahs.length,

            ayahs,

            translationAvailable:
                Boolean(translationSurah),

            language,

            loadedAt: Date.now()

        };

    }


    /* =====================================================
       13. AUDIO ELEMENT
       ===================================================== */

    function getAudioElement() {
        return $("quranAudio");
    }


    function invalidateAudioRequest() {
        state.audioRequestId += 1;

        return state.audioRequestId;
    }


    function stopCurrentAudio(options = {}) {

        const audio = getAudioElement();

        invalidateAudioRequest();

        state.audioPlaying = false;
        state.audioLoading = false;
        state.pendingAutoPlay = false;

        if (audio) {

            audio.pause();

            if (options.reset !== false) {

                try {
                    audio.currentTime = 0;
                } catch (error) {
                    // Metadata may not have loaded.
                }

                audio.removeAttribute("src");
                audio.load();

            }

        }

        updateAudioButtonState();

        updateProgressDisplay();

    }


    function updateAudioButtonState() {

        const button = $("listenPlayPause");
        const icon = $("listenPlayIcon");

        if (button) {

            button.classList.toggle(
                "is-playing",
                state.audioPlaying
            );

            button.setAttribute(
                "aria-pressed",
                state.audioPlaying ? "true" : "false"
            );

            button.setAttribute(
                "aria-label",
                state.audioPlaying
                    ? getText("pause")
                    : getText("play")
            );

            button.title =
                state.audioPlaying
                    ? getText("pause")
                    : getText("play");

        }

        if (icon) {

            icon.textContent =
                state.audioPlaying ? "Ⅱ" : "▶";

        }

    }


    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {
            return "0:00";
        }

        const whole = Math.floor(seconds);

        const minutes = Math.floor(whole / 60);

        const remainingSeconds =
            String(whole % 60).padStart(2, "0");

        return `${minutes}:${remainingSeconds}`;
    }


    function updateProgressDisplay() {

        const audio = getAudioElement();

        const progress = $("listenProgress");
        const track = $("listenProgressTrack");

        const currentTime = $("listenCurrentTime");
        const duration = $("listenDuration");

        if (!audio) {
            return;
        }

        const current =
            Number.isFinite(audio.currentTime)
                ? audio.currentTime
                : 0;

        const total =
            Number.isFinite(audio.duration)
                ? audio.duration
                : 0;

        const percentage =
            total > 0
                ? Math.min(100, (current / total) * 100)
                : 0;

        if (progress) {
            progress.style.width = `${percentage}%`;
        }

        if (track) {
            track.setAttribute(
                "aria-valuenow",
                String(Math.round(percentage))
            );
        }

        setText(
            "listenCurrentTime",
            formatTime(current)
        );

        setText(
            "listenDuration",
            formatTime(total)
        );

    }


    /* =====================================================
       14. AUDIO URL
       ===================================================== */

    function getAudioUrl(globalAyahNumber) {

        return (
            `${API_BASE}/ayah/` +
            `${Number(globalAyahNumber)}/` +
            `${encodeURIComponent(EDITIONS.audio)}`
        );

    }


    async function resolveAudioUrl(globalAyahNumber) {

        const payload = await fetchJSON(
            getAudioUrl(globalAyahNumber)
        );

        const data = payload.data || {};

        const candidates = [

            data.audio,

            data.audioSecondary &&
                data.audioSecondary[0]

        ];

        const audioUrl = candidates.find(
            (candidate) =>
                typeof candidate === "string" &&
                candidate.trim() !== ""
        );

        if (!audioUrl) {
            throw new Error("Audio URL unavailable");
        }

        return audioUrl;
    }


    /* =====================================================
       15. LOAD READ SURAH
       ===================================================== */

    async function loadReadSurah(
        surahNumber,
        options = {}
    ) {

        const number = Number(surahNumber);

        if (
            !Number.isInteger(number) ||
            number < 1 ||
            number > 114
        ) {
            return;
        }

        const requestId = ++state.readRequestId;

        state.readSurah = number;

        if (!options.preserveAyah) {
            state.readAyah = DEFAULT_AYAH;
        }

        state.readLoading = true;

        const selector = $("readSurahSelect");

        if (selector) {
            selector.value = String(number);
        }

        updateSurahInformation("read", number);

        clearError("readError");

        setStatus(
            "readLoadingStatus",
            getText("loadingAyahs"),
            true
        );

        showElement($("readEmptyState"), false);

        const list = $("readAyahList");

        if (list) {
            list.replaceChildren();
        }

        try {

            let data = state.readData.get(number);

            if (
                !data ||
                data.language !== state.language
            ) {

                data = await fetchCompleteSurah(
                    number,
                    state.language
                );

            }

            if (requestId !== state.readRequestId) {
                return;
            }

            state.readData.set(number, data);

            state.readLoading = false;

            if (
                state.readAyah >
                data.ayahs.length
            ) {
                state.readAyah = 1;
            }

            if (data.ayahs.length === 0) {
                showElement($("readEmptyState"), true);

                setText(
                    "readEmptyText",
                    getText("noAyahs")
                );

                return;
            }

            renderReadAyahs(number);

            updateReadAyahFocus();

            if (
                state.currentPage === "read" &&
                options.scrollToAyah !== false
            ) {
                scrollReadAyahIntoView();
            }

            if (!data.translationAvailable) {
                showToast(getText("translationError"));
            }

        } catch (error) {

            if (requestId !== state.readRequestId) {
                return;
            }

            state.readLoading = false;

            console.error(
                "[Quran] Read surah loading failed:",
                error
            );

            showElement($("readEmptyState"), false);

            showError(
                "readError",
                isNetworkAvailable()
                    ? getText("apiError")
                    : getText("networkError")
            );

        } finally {

            if (requestId === state.readRequestId) {

                setStatus(
                    "readLoadingStatus",
                    "",
                    false
                );

            }

        }

    }


    /* =====================================================
       16. RENDER READ AYAH CARDS
       ===================================================== */

    function renderReadAyahs(surahNumber) {

        const list = $("readAyahList");

        if (!list) {
            return;
        }

        const data = state.readData.get(
            Number(surahNumber)
        );

        if (!data) {
            return;
        }

        const fragment = document.createDocumentFragment();

        data.ayahs.forEach((ayah) => {

            const card = document.createElement("article");

            card.className = "ayah-card";

            card.dataset.ayah = String(
                ayah.numberInSurah
            );

            card.dataset.globalAyah = String(
                ayah.number
            );

            if (
                Number(ayah.numberInSurah) ===
                Number(state.readAyah)
            ) {
                card.classList.add("active-ayah");
            }

            const top = document.createElement("div");

            top.className = "ayah-card-top";

            const number = document.createElement("span");

            number.className = "ayah-number";

            number.textContent =
                `${getText("ayah")} ` +
                ayah.numberInSurah;

            const play = document.createElement("button");

            play.type = "button";

            play.className = "ayah-action-button";

            play.textContent = "▶";

            play.setAttribute(
                "aria-label",
                `${getText("play")} — ` +
                `${getText("ayah")} ${ayah.numberInSurah}`
            );

            play.title = getText("play");

            play.addEventListener("click", () => {

                playReadAyahInListenPage(
                    Number(surahNumber),
                    Number(ayah.numberInSurah)
                );

            });

            top.append(number, play);

            const arabic = document.createElement("p");

            arabic.className = "ayah-arabic arabic-text";

            arabic.lang = "ar";
            arabic.dir = "rtl";

            arabic.textContent = ayah.text;

            arabic.style.setProperty(
                "--arabic-size",
                `${state.arabicFontSize}px`
            );

            const translation = document.createElement("p");

            translation.className = "ayah-translation";

            translation.textContent =
                ayah.translation ||
                getText("translationError");

            const footer = document.createElement("div");

            footer.className = "ayah-card-footer";

            const surahLabel = document.createElement("span");

            surahLabel.className = "ayah-surah-label";

            surahLabel.textContent =
                getSurahDisplayName(surahNumber);

            const actionLabel = document.createElement("span");

            actionLabel.className = "ayah-play-label";

            actionLabel.textContent = getText("listen");

            footer.append(surahLabel, actionLabel);

            card.append(
                top,
                arabic,
                translation,
                footer
            );

            fragment.appendChild(card);

        });

        list.replaceChildren(fragment);

        applyArabicFontSize();

    }


    function updateReadAyahFocus() {

        const list = $("readAyahList");

        if (!list) {
            return;
        }

        list.querySelectorAll(".ayah-card").forEach((card) => {

            const isActive =
                Number(card.dataset.ayah) ===
                Number(state.readAyah);

            card.classList.toggle(
                "active-ayah",
                isActive
            );

        });

    }


    function scrollReadAyahIntoView() {

        const list = $("readAyahList");

        if (!list) {
            return;
        }

        const target = list.querySelector(
            `[data-ayah="${state.readAyah}"]`
        );

        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =====================================================
       17. LOAD LISTEN SURAH
       ===================================================== */

    async function loadListenSurah(
        surahNumber,
        options = {}
    ) {

        const number = Number(surahNumber);

        if (
            !Number.isInteger(number) ||
            number < 1 ||
            number > 114
        ) {
            return;
        }

        const requestId = ++state.listenRequestId;

        const wasPlaying =
            options.preservePlayback &&
            (
                state.audioPlaying ||
                state.pendingAutoPlay
            );

        const previousAyah = state.listenAyah;

        stopCurrentAudio();

        state.listenSurah = number;

        if (options.preserveAyah) {

            state.listenAyah = Math.max(
                1,
                previousAyah || DEFAULT_AYAH
            );

        } else {

            state.listenAyah = DEFAULT_AYAH;

        }

        state.listenLoading = true;

        const selector = $("listenSurahSelect");

        if (selector) {
            selector.value = String(number);
        }

        updateSurahInformation("listen", number);

        clearError("listenError");

        setStatus(
            "listenLoadingStatus",
            getText("loadingAyahs"),
            true
        );

        showElement($("listenEmptyState"), false);

        const list = $("listenAyahList");

        if (list) {
            list.replaceChildren();
        }

        try {

            let data = state.listenData.get(number);

            if (
                !data ||
                data.language !== state.language
            ) {

                data = await fetchCompleteSurah(
                    number,
                    state.language
                );

            }

            if (requestId !== state.listenRequestId) {
                return;
            }

            state.listenData.set(number, data);

            state.listenLoading = false;

            if (data.ayahs.length === 0) {

                showElement($("listenEmptyState"), true);

                setText(
                    "listenEmptyText",
                    getText("noAyahs")
                );

                return;
            }

            if (
                state.listenAyah >
                data.ayahs.length
            ) {
                state.listenAyah = 1;
            }

            renderListenAyahs(number);

            updateCurrentListenAyah();

            updateProgressDisplay();

            setStatus(
                "listenAudioStatus",
                getText("ready"),
                true
            );

            if (!data.translationAvailable) {
                showToast(getText("translationError"));
            }

            if (wasPlaying) {
                await playCurrentListenAyah();
            }

        } catch (error) {

            if (requestId !== state.listenRequestId) {
                return;
            }

            state.listenLoading = false;

            console.error(
                "[Quran] Listen surah loading failed:",
                error
            );

            showElement($("listenEmptyState"), false);

            showError(
                "listenError",
                isNetworkAvailable()
                    ? getText("apiError")
                    : getText("networkError")
            );

        } finally {

            if (requestId === state.listenRequestId) {

                setStatus(
                    "listenLoadingStatus",
                    "",
                    false
                );

            }

        }

    }


    /* =====================================================
       18. RENDER LISTEN AYAH CARDS
       ===================================================== */

    function renderListenAyahs(surahNumber) {

        const list = $("listenAyahList");

        if (!list) {
            return;
        }

        const data = state.listenData.get(
            Number(surahNumber)
        );

        if (!data) {
            return;
        }

        const fragment = document.createDocumentFragment();

        data.ayahs.forEach((ayah) => {

            const card = document.createElement("article");

            card.className = "ayah-card";

            card.dataset.ayah = String(
                ayah.numberInSurah
            );

            card.dataset.globalAyah = String(
                ayah.number
            );

            if (
                Number(ayah.numberInSurah) ===
                Number(state.listenAyah)
            ) {
                card.classList.add("is-playing");
            }

            const top = document.createElement("div");

            top.className = "ayah-card-top";

            const number = document.createElement("span");

            number.className = "ayah-number";

            number.textContent =
                `${getText("ayah")} ` +
                ayah.numberInSurah;

            const play = document.createElement("button");

            play.type = "button";

            play.className = "ayah-action-button";

            play.textContent = "▶";

            play.setAttribute(
                "aria-label",
                `${getText("play")} — ` +
                `${getText("ayah")} ${ayah.numberInSurah}`
            );

            play.title = getText("play");

            play.addEventListener("click", () => {

                selectListenAyah(
                    Number(surahNumber),
                    Number(ayah.numberInSurah),
                    { autoplay: true }
                );

            });

            top.append(number, play);

            const arabic = document.createElement("p");

            arabic.className = "ayah-arabic arabic-text";

            arabic.lang = "ar";
            arabic.dir = "rtl";

            arabic.textContent = ayah.text;

            const translation = document.createElement("p");

            translation.className = "ayah-translation";

            translation.textContent =
                ayah.translation ||
                getText("translationError");

            card.append(top, arabic, translation);

            fragment.appendChild(card);

        });

        list.replaceChildren(fragment);

    }


    function updateListenAyahFocus() {

        const list = $("listenAyahList");

        if (!list) {
            return;
        }

        list.querySelectorAll(".ayah-card").forEach((card) => {

            const isActive =
                Number(card.dataset.ayah) ===
                Number(state.listenAyah);

            card.classList.toggle(
                "is-playing",
                isActive
            );

        });

    }


    function scrollListenAyahIntoView() {

        const list = $("listenAyahList");

        if (!list) {
            return;
        }

        const target = list.querySelector(
            `[data-ayah="${state.listenAyah}"]`
        );

        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =====================================================
       19. UPDATE CURRENT LISTEN AYAH
       ===================================================== */

    function updateCurrentListenAyah() {

        const data = state.listenData.get(
            Number(state.listenSurah)
        );

        if (!data) {
            return;
        }

        const ayah = data.ayahs.find(
            (item) =>
                Number(item.numberInSurah) ===
                Number(state.listenAyah)
        );

        if (!ayah) {
            return;
        }

        setText(
            "listenCurrentArabic",
            ayah.text
        );

        setText(
            "listenCurrentTranslation",
            ayah.translation ||
            getText("translationError")
        );

        setText(
            "listenCurrentAyahNumber",
            `${getText("ayah")} ${ayah.numberInSurah}`
        );

        updateSurahInformation(
            "listen",
            state.listenSurah
        );

        updateListenAyahFocus();

    }


    /* =====================================================
       20. SELECT AN AYAH
       ===================================================== */

    async function selectListenAyah(
        surahNumber,
        ayahNumber,
        options = {}
    ) {

        const surah = Number(surahNumber);
        const ayah = Number(ayahNumber);

        if (
            !Number.isInteger(surah) ||
            surah < 1 ||
            surah > 114 ||
            !Number.isInteger(ayah) ||
            ayah < 1
        ) {
            return;
        }

        if (surah !== state.listenSurah) {

            state.listenAyah = ayah;

            await loadListenSurah(
                surah,
                { preserveAyah: true }
            );

            if (options.autoplay) {
                await playCurrentListenAyah();
            }

            return;
        }

        const data = state.listenData.get(surah);

        if (!data) {
            return;
        }

        if (ayah > data.ayahs.length) {
            return;
        }

        stopCurrentAudio();

        state.listenSurah = surah;
        state.listenAyah = ayah;

        updateCurrentListenAyah();

        updateProgressDisplay();

        setStatus(
            "listenAudioStatus",
            getText("selectedAyah"),
            true
        );

        if (options.scroll !== false) {
            scrollListenAyahIntoView();
        }

        if (options.autoplay) {
            await playCurrentListenAyah();
        }

    }


    /* =====================================================
       21. READ AYAH -> LISTEN PAGE
       ===================================================== */

    async function playReadAyahInListenPage(
        surahNumber,
        ayahNumber
    ) {

        state.listenSurah = Number(surahNumber);
        state.listenAyah = Number(ayahNumber);

        showPage("listen");

        await loadListenSurah(
            surahNumber,
            { preserveAyah: true }
        );

        if (
            state.listenSurah === Number(surahNumber) &&
            state.listenAyah === Number(ayahNumber)
        ) {
            await playCurrentListenAyah();
        }

    }


    /* =====================================================
       22. PLAY CURRENT AYAH
       ===================================================== */

    async function playCurrentListenAyah() {

        const audio = getAudioElement();

        if (!audio) {
            showToast(getText("audioUnsupported"));
            return;
        }

        const data = state.listenData.get(
            Number(state.listenSurah)
        );

        if (!data) {

            await loadListenSurah(
                state.listenSurah,
                { preserveAyah: true }
            );

            return;
        }

        const ayah = data.ayahs.find(
            (item) =>
                Number(item.numberInSurah) ===
                Number(state.listenAyah)
        );

        if (!ayah) {
            return;
        }

        const requestId = invalidateAudioRequest();

        state.audioLoading = true;
        state.audioPlaying = false;

        updateAudioButtonState();

        setStatus(
            "listenAudioStatus",
            getText("loadingAudio"),
            true
        );

        try {

            const audioUrl = await resolveAudioUrl(
                ayah.number
            );

            if (requestId !== state.audioRequestId) {
                return;
            }

            audio.src = audioUrl;
            audio.load();

            await audio.play();

            if (requestId !== state.audioRequestId) {
                audio.pause();
                return;
            }

            state.audioLoading = false;
            state.audioPlaying = true;

            updateAudioButtonState();

            setStatus(
                "listenAudioStatus",
                getText("playing"),
                true
            );

        } catch (error) {

            if (requestId !== state.audioRequestId) {
                return;
            }

            state.audioLoading = false;
            state.audioPlaying = false;

            updateAudioButtonState();

            console.error(
                "[Quran] Audio playback failed:",
                error
            );

            setStatus(
                "listenAudioStatus",
                getText("audioError"),
                true
            );

        }

    }


    /* =====================================================
       23. PLAY / PAUSE / RESUME
       ===================================================== */

    async function toggleListenPlayback() {

        const audio = getAudioElement();

        if (!audio) {
            showToast(getText("audioUnsupported"));
            return;
        }

        if (state.audioLoading) {
            return;
        }

        if (
            state.audioPlaying &&
            !audio.paused
        ) {

            audio.pause();

            state.audioPlaying = false;

            updateAudioButtonState();

            setStatus(
                "listenAudioStatus",
                getText("paused"),
                true
            );

            return;
        }

        if (
            audio.src &&
            audio.currentTime > 0 &&
            audio.paused &&
            !audio.ended
        ) {

            try {

                await audio.play();

                state.audioPlaying = true;

                updateAudioButtonState();

                setStatus(
                    "listenAudioStatus",
                    getText("playing"),
                    true
                );

                return;

            } catch (error) {

                console.error(
                    "[Quran] Audio resume failed:",
                    error
                );

            }

        }

        await playCurrentListenAyah();

    }


    /* =====================================================
       24. NEXT / PREVIOUS AYAH
       Cross-surah navigation is supported.
       ===================================================== */

    function getCurrentAyahCount(surahNumber) {

        const data = state.listenData.get(
            Number(surahNumber)
        );

        if (data && data.ayahs.length) {
            return data.ayahs.length;
        }

        const surah = getSurah(surahNumber);

        return Number(surah?.numberOfAyahs) || 0;
    }


    async function moveListenAyah(direction) {

        const step = direction < 0 ? -1 : 1;

        const currentSurah = state.listenSurah;
        const currentAyah = state.listenAyah;

        const count = getCurrentAyahCount(currentSurah);

        if (!count) {
            return;
        }

        let nextSurah = currentSurah;
        let nextAyah = currentAyah + step;

        if (nextAyah > count) {

            if (currentSurah >= 114) {

                stopCurrentAudio();

                setStatus(
                    "listenAudioStatus",
                    getText("lastAyah"),
                    true
                );

                return;
            }

            nextSurah = currentSurah + 1;
            nextAyah = 1;

        } else if (nextAyah < 1) {

            if (currentSurah <= 1) {

                stopCurrentAudio();

                setStatus(
                    "listenAudioStatus",
                    getText("firstAyah"),
                    true
                );

                return;
            }

            nextSurah = currentSurah - 1;

            nextAyah =
                getCurrentAyahCount(nextSurah);

            if (!nextAyah) {
                nextAyah = 1;
            }

        }

        if (nextSurah !== currentSurah) {

            stopCurrentAudio();

            state.listenSurah = nextSurah;
            state.listenAyah = nextAyah;

            await loadListenSurah(
                nextSurah,
                { preserveAyah: true }
            );

        } else {

            await selectListenAyah(
                nextSurah,
                nextAyah,
                {
                    autoplay: false,
                    scroll: true
                }
            );

        }

        setStatus(
            "listenAudioStatus",
            getText("selectedAyah"),
            true
        );

    }


    /* =====================================================
       25. AUTO-PLAY NEXT AYAH
       ===================================================== */

    async function handleAudioEnded() {

        state.audioPlaying = false;
        state.audioLoading = false;

        updateAudioButtonState();

        await moveListenAyah(1);

        if (
            state.listenSurah === 114 &&
            state.listenAyah === getCurrentAyahCount(114)
        ) {

            const audio = getAudioElement();

            if (audio && audio.ended) {

                setStatus(
                    "listenAudioStatus",
                    getText("lastAyah"),
                    true
                );

            }

            return;
        }

        await playCurrentListenAyah();

    }


    /* =====================================================
       26. AUDIO EVENT LISTENERS
       ===================================================== */

    function bindAudioEvents() {

        const audio = getAudioElement();

        if (!audio) {
            return;
        }

        audio.addEventListener("play", () => {

            state.audioPlaying = true;
            state.audioLoading = false;

            updateAudioButtonState();

        });

        audio.addEventListener("pause", () => {

            state.audioPlaying = false;

            updateAudioButtonState();

        });

        audio.addEventListener("ended", () => {

            handleAudioEnded();

        });

        audio.addEventListener("timeupdate", () => {

            updateProgressDisplay();

        });

        audio.addEventListener("loadedmetadata", () => {

            updateProgressDisplay();

        });

        audio.addEventListener("durationchange", () => {

            updateProgressDisplay();

        });

        audio.addEventListener("error", () => {

            if (state.audioLoading || state.audioPlaying) {

                state.audioLoading = false;
                state.audioPlaying = false;

                updateAudioButtonState();

                setStatus(
                    "listenAudioStatus",
                    getText("audioError"),
                    true
                );

            }

        });

    }


    /* =====================================================
       27. ARABIC FONT SIZE
       ===================================================== */

    function applyArabicFontSize() {

        document.documentElement.style.setProperty(
            "--arabic-size",
            `${state.arabicFontSize}px`
        );

        setText(
            "arabicFontSizeValue",
            state.arabicFontSize
        );

        document.querySelectorAll(
            "#readAyahList .ayah-arabic"
        ).forEach((element) => {

            element.style.fontSize =
                `${state.arabicFontSize}px`;

        });

    }


    function changeArabicFontSize(direction) {

        const nextSize =
            state.arabicFontSize +
            (
                direction *
                ARABIC_FONT_STEP
            );

        state.arabicFontSize = Math.min(
            MAX_ARABIC_FONT,
            Math.max(
                MIN_ARABIC_FONT,
                nextSize
            )
        );

        applyArabicFontSize();

    }


    /* =====================================================
       28. PAGE NAVIGATION
       ===================================================== */

    function updateVisibleFooter(page) {

        showElement(
            $("homeFooter"),
            page === "home"
        );

        showElement(
            $("readFooter"),
            page === "read"
        );

        showElement(
            $("listenFooter"),
            page === "listen"
        );

    }


    function showPage(page, options = {}) {

        const allowedPages = [
            "home",
            "read",
            "listen"
        ];

        if (!allowedPages.includes(page)) {
            return;
        }

        const previousPage = state.currentPage;

        state.currentPage = page;

        const app = $("quranApp");

        if (app) {
            app.dataset.page = page;
        }

        const screens = {
            home: $("homeScreen"),
            read: $("readScreen"),
            listen: $("listenScreen")
        };

        Object.entries(screens).forEach(
            ([screenName, element]) => {

                if (!element) {
                    return;
                }

                const active = screenName === page;

                element.hidden = !active;

                element.classList.toggle(
                    "active",
                    active
                );

                element.setAttribute(
                    "aria-hidden",
                    active ? "false" : "true"
                );

            }
        );

        updateVisibleFooter(page);

        if (page === "read") {

            if (!state.readData.has(state.readSurah)) {
                loadReadSurah(state.readSurah);
            } else {

                renderReadAyahs(state.readSurah);

                updateReadAyahFocus();

            }

        }

        if (page === "listen") {

            if (!state.listenData.has(state.listenSurah)) {

                loadListenSurah(state.listenSurah, {
                    preserveAyah: true
                });

            } else {

                renderListenAyahs(state.listenSurah);

                updateCurrentListenAyah();

            }

        }

        if (
            !options.fromHistory &&
            previousPage !== page
        ) {

            pushPageHistory(page);

        }

    }


    /* =====================================================
       29. BROWSER HISTORY / BACK BUTTON
       ===================================================== */

    function pushPageHistory(page) {

        try {

            const currentState =
                history.state &&
                typeof history.state === "object"
                    ? history.state
                    : {};

            history.pushState(
                {
                    ...currentState,

                    ibadatQuran: true,

                    page

                },
                "",
                location.href
            );

        } catch (error) {

            console.warn(
                "[Quran] History navigation unavailable:",
                error
            );

        }

    }


    function initializeHistory() {

        if (state.historyInitialized) {
            return;
        }

        state.historyInitialized = true;

        try {

            history.pushState(
                {
                    ...(history.state || {}),

                    ibadatQuran: true,

                    page: "home",

                    quranRoot: true

                },
                "",
                location.href
            );

        } catch (error) {

            console.warn(
                "[Quran] Unable to initialize history:",
                error
            );

        }

        window.addEventListener(
            "popstate",
            (event) => {

                const page =
                    event.state &&
                    event.state.ibadatQuran
                        ? event.state.page
                        : "home";

                showPage(
                    ["home", "read", "listen"].includes(page)
                        ? page
                        : "home",
                    { fromHistory: true }
                );

            }
        );

    }


    /* =====================================================
       30. HOME FEATURED CONTENT
       ===================================================== */

    async function loadFeaturedContent() {

        try {

            const data = await fetchCompleteSurah(
                1,
                state.language
            );

            const ayah = data.ayahs[0];

            if (!ayah) {
                return;
            }

            setText(
                "featuredArabic",
                ayah.text
            );

            setText(
                "featuredTranslation",
                ayah.translation ||
                getText("featuredTranslation")
            );

            setText(
                "featuredSurahMeta",
                `${getText("surah")} 1`
            );

            setText(
                "featuredAyahMeta",
                `${getText("ayah")} 1`
            );

        } catch (error) {

            console.error(
                "[Quran] Featured ayah loading failed:",
                error
            );

        }

    }


    /* =====================================================
       31. EVENT LISTENERS
       ===================================================== */

    function bindClick(id, handler) {

        const element = $(id);

        if (!element) {
            return;
        }

        element.addEventListener("click", handler);
    }


    function bindChange(id, handler) {

        const element = $(id);

        if (!element) {
            return;
        }

        element.addEventListener("change", handler);
    }


    function bindUIEvents() {

        bindClick("openReadButton", () => {
            showPage("read");
        });

        bindClick("openListenButton", () => {
            showPage("listen");
        });

        bindClick("featuredPlayButton", async () => {

            state.listenSurah = 1;
            state.listenAyah = 1;

            showPage("listen");

            await loadListenSurah(
                1,
                { preserveAyah: true }
            );

            await playCurrentListenAyah();

        });


        bindChange("readSurahSelect", async (event) => {

            const number = Number(event.target.value);

            if (number >= 1 && number <= 114) {

                state.readSurah = number;
                state.readAyah = 1;

                await loadReadSurah(number);

            }

        });


        bindChange("listenSurahSelect", async (event) => {

            const number = Number(event.target.value);

            if (number >= 1 && number <= 114) {

                state.listenSurah = number;
                state.listenAyah = 1;

                await loadListenSurah(number);

            }

        });


        bindClick("decreaseArabicFont", () => {
            changeArabicFontSize(-1);
        });

        bindClick("increaseArabicFont", () => {
            changeArabicFontSize(1);
        });


        bindClick("previousAyah", () => {

            moveReadAyah(-1);

        });


        bindClick("nextAyah", () => {

            moveReadAyah(1);

        });


        bindClick("listenPrevious", () => {

            moveListenAyah(-1);

        });


        bindClick("listenNext", () => {

            moveListenAyah(1);

        });


        bindClick("listenPlayPause", () => {

            toggleListenPlayback();

        });


        window.addEventListener(
            "storage",
            (event) => {

                handleExternalLanguageChange(event);

                handleExternalThemeChange(event);

            }
        );


        window.addEventListener(
            "online",
            () => {

                if (state.currentPage === "read") {
                    loadReadSurah(
                        state.readSurah,
                        { preserveAyah: true }
                    );
                }

                if (state.currentPage === "listen") {
                    loadListenSurah(
                        state.listenSurah,
                        { preserveAyah: true }
                    );
                }

            }
        );

    }


    /* =====================================================
       32. READ AYAH NAVIGATION
       ===================================================== */

    async function moveReadAyah(direction) {

        const step = direction < 0 ? -1 : 1;

        const currentSurah = state.readSurah;
        const currentAyah = state.readAyah;

        let data = state.readData.get(currentSurah);

        if (!data) {

            await loadReadSurah(
                currentSurah,
                { preserveAyah: true }
            );

            data = state.readData.get(currentSurah);

            if (!data) {
                return;
            }

        }

        let nextSurah = currentSurah;
        let nextAyah = currentAyah + step;

        const count = data.ayahs.length;

        if (nextAyah > count) {

            if (currentSurah >= 114) {

                showToast(getText("lastAyah"));

                return;
            }

            nextSurah = currentSurah + 1;
            nextAyah = 1;

        } else if (nextAyah < 1) {

            if (currentSurah <= 1) {

                showToast(getText("firstAyah"));

                return;
            }

            nextSurah = currentSurah - 1;

            const previousData =
                state.readData.get(nextSurah);

            if (previousData) {

                nextAyah =
                    previousData.ayahs.length;

            } else {

                await loadReadSurah(
                    nextSurah,
                    { preserveAyah: true }
                );

                const loaded =
                    state.readData.get(nextSurah);

                nextAyah =
                    loaded?.ayahs.length || 1;

            }

        }

        if (nextSurah !== currentSurah) {

            state.readSurah = nextSurah;
            state.readAyah = nextAyah;

            await loadReadSurah(
                nextSurah,
                { preserveAyah: true }
            );

        } else {

            state.readAyah = nextAyah;

            updateReadAyahFocus();

            scrollReadAyahIntoView();

        }

    }


    /* =====================================================
       33. LANGUAGE CHANGE PUBLIC HANDLER
       ===================================================== */

    function setLanguage(language) {

        const normalized = normalizeLanguage(language);

        if (!normalized) {
            return false;
        }

        return applyLanguage(normalized);

    }


    /* =====================================================
       34. THEME CHANGE PUBLIC HANDLER
       ===================================================== */

    function setTheme(theme) {

        applyTheme(theme);

        safeStorageSet(
            "ibadat_theme",
            state.theme
        );

    }


    /* =====================================================
       35. OPTIONAL GLOBAL INTEGRATION
       ===================================================== */

    function bindGlobalIntegration() {

        /*
         * Other parts of the IBADAT website can change
         * language/theme using these functions:
         *
         * window.IbadatQuran.setLanguage("bn");
         * window.IbadatQuran.setLanguage("hi");
         * window.IbadatQuran.setLanguage("en");
         *
         * window.IbadatQuran.setTheme("dark");
         * window.IbadatQuran.setTheme("light");
         *
         * window.IbadatQuran.openPage("home");
         * window.IbadatQuran.openPage("read");
         * window.IbadatQuran.openPage("listen");
         */

        window.IbadatQuran = {

            setLanguage,

            setTheme,

            openPage: showPage,

            loadReadSurah,

            loadListenSurah,

            playAyah: selectListenAyah,

            play: playCurrentListenAyah,

            pause: () => {

                const audio = getAudioElement();

                if (audio) {
                    audio.pause();
                }

            },

            getState: () => ({

                language: state.language,

                theme: state.theme,

                currentPage: state.currentPage,

                readSurah: state.readSurah,

                readAyah: state.readAyah,

                listenSurah: state.listenSurah,

                listenAyah: state.listenAyah,

                audioPlaying: state.audioPlaying

            })

        };

    }


    /* =====================================================
       36. INITIALIZE APPLICATION
       ===================================================== */

    async function initialize() {

        if (state.initialized) {
            return;
        }

        state.initialized = true;

        state.language = detectLanguage();

        state.theme = detectTheme();

        applyTheme(state.theme);

        renderPageLabels();

        applyArabicFontSize();

        bindUIEvents();

        bindAudioEvents();

        bindGlobalIntegration();

        initializeHistory();

        setStatus(
            "readLoadingStatus",
            "",
            false
        );

        setStatus(
            "listenLoadingStatus",
            "",
            false
        );

        await loadSurahMetadata();

        renderPageLabels();

        await Promise.allSettled([

            loadFeaturedContent(),

            loadReadSurah(
                state.readSurah,
                { preserveAyah: true }
            )

        ]);

        /*
         * Do not automatically fetch the audio for all ayahs.
         * Audio URLs are resolved when the user presses Play.
         * This avoids unnecessary network requests.
         */

    }


    /* =====================================================
       37. PUBLIC API
       ===================================================== */

    return {

        initialize,

        setLanguage,

        setTheme,

        showPage,

        loadReadSurah,

        loadListenSurah,

        selectListenAyah,

        playCurrentListenAyah,

        toggleListenPlayback,

        moveListenAyah,

        moveReadAyah,

        getState: () => ({ ...state })

    };

})();


/* =========================================================
   38. START APPLICATION
   ========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            QuranApp.initialize();
        },
        { once: true }
    );

} else {

    QuranApp.initialize();

}


/* =========================================================
   END OF QURAN JAVASCRIPT
   ========================================================= */
