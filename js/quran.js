
/* =========================================================
   IBADAT — COMPLETE QURAN JAVASCRIPT
   File: js/quran.js

   Features:
   - Quran home, reading and listening pages
   - All 114 surahs
   - Arabic Quran text
   - Bengali, Hindi and English translations
   - Surah selection
   - Ayah navigation across surah boundaries
   - Audio play, pause, resume and automatic next ayah
   - Arabic font size controls
   - Site language setting integration
   - Browser Back navigation
   - Loading and error messages
   - Audio request race protection
========================================================= */

"use strict";


/* =========================================================
   01. CONFIGURATION
========================================================= */

const IBADAT_QURAN = (() => {
    const API_BASE = "https://api.alquran.cloud/v1";

    const EDITIONS = {
        arabic: "quran-uthmani",
        audio: "ar.alafasy",
        bn: "bn.bengali",
        hi: "hi.hindi",
        en: "en.sahih"
    };

    const LANGUAGE_KEYS = [
        "ibadat_language",
        "siteLanguage",
        "selectedLanguage",
        "language",
        "lang",
        "preferredLanguage"
    ];

    const DEFAULT_LANGUAGE = "bn";

    const MIN_ARABIC_FONT = 22;
    const MAX_ARABIC_FONT = 54;
    const FONT_STEP = 2;
    const INITIAL_ARABIC_FONT = 32;

    const AUDIO_END_TOLERANCE = 0.25;

    const LANGUAGE_NAMES = {
        bn: "বাংলা",
        hi: "हिन्दी",
        en: "English"
    };

    const UI_TEXT = {
        bn: {
            brandName: "ইবাদত",
            brandSubtitle: "শুদ্ধতার পথে শেখা ও অনুশীলন",
            homeHeading: "পবিত্র কুরআন",
            homeSubheading: "পড়ুন, বুঝুন এবং তিলাওয়াত শুনুন",
            readHeading: "কুরআন পড়ুন",
            readSubheading: "আয়াত পড়ুন ও অর্থ বুঝুন",
            listenHeading: "তিলাওয়াত শুনুন",
            listenSubheading: "মনোযোগ দিয়ে তিলাওয়াত শুনুন",
            featuredEyebrow: "পবিত্র কুরআনের বাণী",
            featuredPlay: "তিলাওয়াত শুনুন",
            featuredPause: "বিরতি দিন",
            readOptionTitle: "কুরআন পড়ুন",
            readOptionDescription: "আরবি আয়াত ও অনুবাদ",
            listenOptionTitle: "তিলাওয়াত শুনুন",
            listenOptionDescription: "শুনুন ও অনুসরণ করুন",
            readSelector: "পড়ার জন্য সূরা নির্বাচন করুন",
            listenSelector: "তিলাওয়াতের জন্য সূরা নির্বাচন করুন",
            readEyebrow: "কুরআন পাঠ",
            listenEyebrow: "কুরআন তিলাওয়াত",
            readFooter: "শুদ্ধভাবে কুরআন পড়ুন",
            homeFooter: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",
            listenListHeading: "আয়াত নির্বাচন করুন",
            play: "তিলাওয়াত চালান",
            pause: "তিলাওয়াত বিরতি দিন",
            previous: "আগের আয়াত",
            next: "পরের আয়াত",
            loadingSurahs: "সূরার তালিকা লোড হচ্ছে…",
            loadingAyahs: "কুরআনের আয়াত লোড হচ্ছে…",
            loadingAudio: "তিলাওয়াত প্রস্তুত হচ্ছে…",
            ready: "তিলাওয়াত শোনার জন্য প্লে বাটনে চাপ দিন।",
            playing: "তিলাওয়াত চলছে…",
            paused: "তিলাওয়াত বিরতিতে আছে।",
            audioError: "তিলাওয়াত চালানো যাচ্ছে না। আবার চেষ্টা করুন।",
            networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
            dataError: "কুরআনের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।",
            noAyahs: "এখানে দেখানোর মতো কোনো আয়াত পাওয়া যায়নি।",
            endOfQuran: "কুরআনের শেষ সূরা পর্যন্ত তিলাওয়াত সম্পন্ন হয়েছে।",
            noPrevious: "এটি কুরআনের প্রথম আয়াত।",
            fontIncreased: "আরবি লেখার আকার বড় করা হয়েছে।",
            fontDecreased: "আরবি লেখার আকার ছোট করা হয়েছে।",
            selectedAyah: "আয়াত",
            surah: "সূরা",
            ayahs: "আয়াত",
            meccan: "মক্কায় অবতীর্ণ",
            medinan: "মদিনায় অবতীর্ণ",
            translationUnavailable: "এই ভাষায় অনুবাদ পাওয়া যায়নি।",
            unknownSurah: "সূরা",
            retry: "আবার চেষ্টা করুন"
        },

        hi: {
            brandName: "इबादत",
            brandSubtitle: "पवित्रता की राह पर सीखना और अभ्यास",
            homeHeading: "पवित्र क़ुरआन",
            homeSubheading: "पढ़ें, समझें और तिलावत सुनें",
            readHeading: "क़ुरआन पढ़ें",
            readSubheading: "आयतें पढ़ें और अर्थ समझें",
            listenHeading: "तिलावत सुनें",
            listenSubheading: "ध्यान से तिलावत सुनें",
            featuredEyebrow: "पवित्र क़ुरआन का संदेश",
            featuredPlay: "तिलावत सुनें",
            featuredPause: "रोकें",
            readOptionTitle: "क़ुरआन पढ़ें",
            readOptionDescription: "अरबी आयतें और अनुवाद",
            listenOptionTitle: "तिलावत सुनें",
            listenOptionDescription: "सुनें और साथ पढ़ें",
            readSelector: "पढ़ने के लिए सूरह चुनें",
            listenSelector: "तिलावत के लिए सूरह चुनें",
            readEyebrow: "क़ुरआन पाठ",
            listenEyebrow: "क़ुरआन तिलावत",
            readFooter: "क़ुरआन सही ढंग से पढ़ें",
            homeFooter: "इबादत • पवित्रता की राह पर सीखना और अभ्यास",
            listenListHeading: "आयत चुनें",
            play: "तिलावत चलाएँ",
            pause: "तिलावत रोकें",
            previous: "पिछली आयत",
            next: "अगली आयत",
            loadingSurahs: "सूरह सूची लोड हो रही है…",
            loadingAyahs: "क़ुरआन की आयतें लोड हो रही हैं…",
            loadingAudio: "तिलावत तैयार हो रही है…",
            ready: "तिलावत सुनने के लिए प्ले बटन दबाएँ।",
            playing: "तिलावत चल रही है…",
            paused: "तिलावत रुकी हुई है।",
            audioError: "तिलावत नहीं चल सकी। फिर से कोशिश करें।",
            networkError: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
            dataError: "क़ुरआन की जानकारी लोड नहीं हुई। कुछ देर बाद कोशिश करें।",
            noAyahs: "दिखाने के लिए कोई आयत उपलब्ध नहीं है।",
            endOfQuran: "क़ुरआन की अंतिम सूरह तक तिलावत पूरी हो गई।",
            noPrevious: "यह क़ुरआन की पहली आयत है।",
            fontIncreased: "अरबी लिखावट बड़ी कर दी गई है।",
            fontDecreased: "अरबी लिखावट छोटी कर दी गई है।",
            selectedAyah: "आयत",
            surah: "सूरह",
            ayahs: "आयतें",
            meccan: "मक्का में अवतरित",
            medinan: "मदीना में अवतरित",
            translationUnavailable: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
            unknownSurah: "सूरह",
            retry: "फिर कोशिश करें"
        },

        en: {
            brandName: "IBADAT",
            brandSubtitle: "Learn and practise on the path to purity",
            homeHeading: "The Holy Quran",
            homeSubheading: "Read, understand and listen to recitation",
            readHeading: "Read the Quran",
            readSubheading: "Read the verses and understand their meaning",
            listenHeading: "Listen to Recitation",
            listenSubheading: "Listen to the Quran attentively",
            featuredEyebrow: "A message from the Holy Quran",
            featuredPlay: "Listen to recitation",
            featuredPause: "Pause recitation",
            readOptionTitle: "Read the Quran",
            readOptionDescription: "Arabic verses and translation",
            listenOptionTitle: "Listen to Recitation",
            listenOptionDescription: "Listen and follow along",
            readSelector: "Select a surah to read",
            listenSelector: "Select a surah for recitation",
            readEyebrow: "Quran Reading",
            listenEyebrow: "Quran Recitation",
            readFooter: "Read the Quran correctly",
            homeFooter: "IBADAT • Learn and practise on the path to purity",
            listenListHeading: "Select an ayah",
            play: "Play recitation",
            pause: "Pause recitation",
            previous: "Previous ayah",
            next: "Next ayah",
            loadingSurahs: "Loading surah list…",
            loadingAyahs: "Loading Quran verses…",
            loadingAudio: "Preparing recitation…",
            ready: "Press play to listen to the recitation.",
            playing: "Recitation is playing…",
            paused: "Recitation is paused.",
            audioError: "Unable to play recitation. Please try again.",
            networkError: "Check your internet connection and try again.",
            dataError: "Unable to load Quran data. Please try again later.",
            noAyahs: "No verses are available to display.",
            endOfQuran: "Recitation has reached the final surah of the Quran.",
            noPrevious: "This is the first ayah of the Quran.",
            fontIncreased: "Arabic text size increased.",
            fontDecreased: "Arabic text size decreased.",
            selectedAyah: "Ayah",
            surah: "Surah",
            ayahs: "ayahs",
            meccan: "Revealed in Makkah",
            medinan: "Revealed in Madinah",
            translationUnavailable: "Translation is unavailable in this language.",
            unknownSurah: "Surah",
            retry: "Try again"
        }
    };


    /* =====================================================
       02. STATE
    ===================================================== */

    const state = {
        language: DEFAULT_LANGUAGE,

        page: "home",

        surahs: [],
        surahsLoaded: false,
        surahLoadPromise: null,

        readSurah: 1,
        readAyah: 1,

        listenSurah: 1,
        listenAyah: 1,

        readData: new Map(),
        listenData: new Map(),

        readRequestId: 0,
        listenRequestId: 0,

        readLoadPromises: new Map(),
        listenLoadPromises: new Map(),

        audio: null,
        audioMode: "listen",

        audioRequestId: 0,
        isPlaying: false,
        isSeeking: false,

        featuredAudioUrl: null,

        arabicFontSize: INITIAL_ARABIC_FONT,

        historyReady: false,
        changingHistory: false,

        audioMetadataReady: false,
        toastTimer: null
    };


    /* =====================================================
       03. DOM HELPERS
    ===================================================== */

    const $ = (id) => document.getElementById(id);

    function text(key) {
        return (UI_TEXT[state.language] || UI_TEXT.bn)[key]
            || UI_TEXT.bn[key]
            || key;
    }

    function setText(id, value) {
        const element = $(id);
        if (element) {
            element.textContent = value == null ? "" : String(value);
        }
    }

    function setHTMLHidden(id, hidden) {
        const element = $(id);
        if (element) {
            element.hidden = Boolean(hidden);
        }
    }

    function setStatus(id, message) {
        setText(id, message);
    }

    function showError(id, message) {
        const element = $(id);
        if (!element) return;

        element.textContent = message;
        element.hidden = false;
    }

    function clearError(id) {
        const element = $(id);
        if (!element) return;

        element.textContent = "";
        element.hidden = true;
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, (character) => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[character];
        });
    }

    function makeElement(tag, className, value) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (value !== undefined && value !== null) {
            element.textContent = String(value);
        }

        return element;
    }

    function padNumber(number) {
        return String(number).padStart(2, "0");
    }

    function formatTime(seconds) {
        if (!Number.isFinite(seconds) || seconds < 0) {
            return "0:00";
        }

        const totalSeconds = Math.floor(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const remainder = totalSeconds % 60;

        return `${minutes}:${String(remainder).padStart(2, "0")}`;
    }

    function showToast(message) {
        const toast = $("quranToast");
        if (!toast) return;

        toast.textContent = message;
        toast.hidden = false;

        if (state.toastTimer) {
            clearTimeout(state.toastTimer);
        }

        state.toastTimer = setTimeout(() => {
            toast.hidden = true;
        }, 2400);
    }


    /* =====================================================
       04. LANGUAGE DETECTION
    ===================================================== */

    function normalizeLanguage(value) {
        if (!value) return null;

        const language = String(value)
            .trim()
            .toLowerCase()
            .replace("_", "-");

        if (
            language === "bn" ||
            language.startsWith("bn-") ||
            language === "bangla" ||
            language === "bengali"
        ) {
            return "bn";
        }

        if (
            language === "hi" ||
            language.startsWith("hi-") ||
            language === "hindi"
        ) {
            return "hi";
        }

        if (
            language === "en" ||
            language.startsWith("en-") ||
            language === "english"
        ) {
            return "en";
        }

        return null;
    }

    function detectLanguage() {
        try {
            for (const key of LANGUAGE_KEYS) {
                const value = localStorage.getItem(key);
                const language = normalizeLanguage(value);

                if (language) return language;
            }
        } catch (error) {
            // Storage can be unavailable in restricted browsers.
        }

        const htmlLanguage = normalizeLanguage(
            document.documentElement.lang
        );

        if (htmlLanguage) return htmlLanguage;

        return DEFAULT_LANGUAGE;
    }

    function applyLanguageToDocument() {
        const languageTags = {
            bn: "bn",
            hi: "hi",
            en: "en"
        };

        document.documentElement.lang =
            languageTags[state.language] || "bn";

        document.documentElement.dir = "ltr";

        document.title =
            `${text("homeHeading")} | ${text("brandName")}`;

        document.documentElement.style.setProperty(
            "--arabic-font-size",
            `${state.arabicFontSize}px`
        );
    }


    /* =====================================================
       05. TRANSLATED SURAH NAMES
    ===================================================== */

    const BENGALI_SURAH_NAMES = [
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
        "আশ-শুরা",
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
        "আল-হাক্কাহ",
        "আল-মাআরিজ",
        "নূহ",
        "আল-জিন",
        "আল-মুযযাম্মিল",
        "আল-মুদ্দাসসির",
        "আল-কিয়ামাহ",
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
        "আল-গাশিয়াহ",
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
        "আয-যালযালাহ",
        "আল-আদিয়াত",
        "আল-কারিআহ",
        "আত-তাকাসুর",
        "আল-আসর",
        "আল-হুমাযাহ",
        "আল-ফিল",
        "কুরাইশ",
        "আল-মাউন",
        "আল-কাওসার",
        "আল-কাফিরুন",
        "আন-নাসর",
        "আল-মাসাদ",
        "আল-ইখলাস",
        "আল-ফালাক",
        "আন-নাস"
    ];

    const HINDI_SURAH_NAMES = [
        "अल-फ़ातिहा",
        "अल-बक़रा",
        "आले इमरान",
        "अन-निसा",
        "अल-माइदा",
        "अल-अनआम",
        "अल-आराफ़",
        "अल-अनफ़ाल",
        "अत-तौबा",
        "यूनुस",
        "हूद",
        "यूसुफ़",
        "अर-रअद",
        "इब्राहीम",
        "अल-हिज्र",
        "अन-नहल",
        "अल-इसरा",
        "अल-कहफ़",
        "मरयम",
        "ता-हा",
        "अल-अंबिया",
        "अल-हज्ज",
        "अल-मुमिनून",
        "अन-नूर",
        "अल-फ़ुरक़ान",
        "अश-शुअरा",
        "अन-नम्ल",
        "अल-क़सस",
        "अल-अनकबूत",
        "अर-रूम",
        "लुक़मान",
        "अस-सज्दा",
        "अल-अहज़ाब",
        "सबा",
        "फ़ातिर",
        "या-सीन",
        "अस-साफ़्फ़ात",
        "साद",
        "अज़-ज़ुमर",
        "ग़ाफ़िर",
        "फ़ुस्सिलत",
        "अश-शूरा",
        "अज़-ज़ुख़रुफ़",
        "अद-दुख़ान",
        "अल-जासिया",
        "अल-अहक़ाफ़",
        "मुहम्मद",
        "अल-फ़त्ह",
        "अल-हुजुरात",
        "क़ाफ़",
        "अज़-ज़ारियात",
        "अत-तूर",
        "अन-नज्म",
        "अल-क़मर",
        "अर-रहमान",
        "अल-वाक़िआ",
        "अल-हदीद",
        "अल-मुजादिला",
        "अल-हश्र",
        "अल-मुम्तहिना",
        "अस-सफ़",
        "अल-जुमुआ",
        "अल-मुनाफ़िक़ून",
        "अत-तग़ाबुन",
        "अत-तलाक़",
        "अत-तहरीम",
        "अल-मुल्क",
        "अल-क़लम",
        "अल-हाक़्क़ा",
        "अल-मआरिज",
        "नूह",
        "अल-जिन्न",
        "अल-मुज़्ज़म्मिल",
        "अल-मुदस्सिर",
        "अल-क़ियामा",
        "अल-इंसान",
        "अल-मुर्सलात",
        "अन-नबा",
        "अन-नाज़िआत",
        "अबसा",
        "अत-तकवीर",
        "अल-इन्फ़ितार",
        "अल-मुतफ़्फ़िफ़ीन",
        "अल-इन्शिक़ाक़",
        "अल-बुरूज",
        "अत-तारिक़",
        "अल-आला",
        "अल-ग़ाशिया",
        "अल-फ़ज्र",
        "अल-बलद",
        "अश-शम्स",
        "अल-लैल",
        "अद-दुहा",
        "अश-शर्ह",
        "अत-तीन",
        "अल-अलक़",
        "अल-क़द्र",
        "अल-बय्यिना",
        "अज़-ज़लज़ला",
        "अल-आदियात",
        "अल-क़ारिआ",
        "अत-तकासुर",
        "अल-अस्र",
        "अल-हुमज़ा",
        "अल-फ़ील",
        "क़ुरैश",
        "अल-माऊन",
        "अल-कौसर",
        "अल-काफ़िरून",
        "अन-नस्र",
        "अल-मसद",
        "अल-इख़लास",
        "अल-फ़लक़",
        "अन-नास"
    ];


    /* =====================================================
       06. SURAH DATA HELPERS
    ===================================================== */

    function getSurahName(surah) {
        if (!surah) return text("unknownSurah");

        if (state.language === "bn") {
            return BENGALI_SURAH_NAMES[surah.number - 1]
                || surah.englishName
                || surah.name;
        }

        if (state.language === "hi") {
            return HINDI_SURAH_NAMES[surah.number - 1]
                || surah.englishName
                || surah.name;
        }

        return surah.englishName
            || surah.englishNameTranslation
            || surah.name
            || text("unknownSurah");
    }

    function getSurahByNumber(number) {
        return state.surahs.find(
            (surah) => Number(surah.number) === Number(number)
        ) || null;
    }

    function getSurahData(number, mode) {
        const store = mode === "read"
            ? state.readData
            : state.listenData;

        return store.get(Number(number)) || null;
    }

    function getTranslationEdition() {
        return EDITIONS[state.language] || EDITIONS.bn;
    }

    function getRevelationLabel(surah) {
        if (!surah) return "";

        const type = String(surah.revelationType || "").toLowerCase();

        if (type === "meccan") return text("meccan");
        if (type === "medinan") return text("medinan");

        return "";
    }

    function getSurahMeta(surah) {
        if (!surah) return "";

        const parts = [
            `${text("surah")} ${surah.number}`,
            getRevelationLabel(surah),
            `${surah.numberOfAyahs} ${text("ayahs")}`
        ].filter(Boolean);

        return parts.join(" · ");
    }


    /* =====================================================
       07. API REQUEST HELPERS
    ===================================================== */

    async function fetchJSON(url, options = {}) {
        const response = await fetch(url, {
            method: "GET",
            cache: "default",
            ...options,
            headers: {
                Accept: "application/json",
                ...(options.headers || {})
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (
            !result ||
            (result.code !== undefined && result.code !== 200)
        ) {
            throw new Error("Invalid Quran API response");
        }

        return result.data;
    }

    function normalizeAyahData(arabicData, translationData, audioData) {
        const arabicAyahs = arabicData?.ayahs || [];
        const translationAyahs = translationData?.ayahs || [];
        const audioAyahs = audioData?.ayahs || [];

        const translationMap = new Map();
        const audioMap = new Map();

        for (const ayah of translationAyahs) {
            translationMap.set(Number(ayah.numberInSurah), ayah);
        }

        for (const ayah of audioAyahs) {
            audioMap.set(Number(ayah.numberInSurah), ayah);
        }

        return arabicAyahs.map((ayah) => {
            const number = Number(ayah.numberInSurah);
            const translation = translationMap.get(number);
            const audio = audioMap.get(number);

            return {
                number: number,
                globalNumber: Number(ayah.number),
                arabic: ayah.text || "",
                translation: translation?.text || "",
                audioUrl: audio?.audio || "",
                surahNumber: Number(
                    ayah.surah?.number
                    || arabicData?.number
                ),
                surahName: ayah.surah?.englishName || ""
            };
        });
    }

    async function loadSurahDirectory() {
        if (state.surahsLoaded && state.surahs.length) {
            return state.surahs;
        }

        if (state.surahLoadPromise) {
            return state.surahLoadPromise;
        }

        state.surahLoadPromise = (async () => {
            const data = await fetchJSON(`${API_BASE}/surah`);

            if (!Array.isArray(data) || data.length !== 114) {
                throw new Error("Surah directory is incomplete");
            }

            state.surahs = data.map((surah) => ({
                number: Number(surah.number),
                name: surah.name || "",
                englishName: surah.englishName || "",
                englishNameTranslation:
                    surah.englishNameTranslation || "",
                revelationType: surah.revelationType || "",
                numberOfAyahs: Number(surah.numberOfAyahs) || 0
            }));

            state.surahsLoaded = true;

            renderSurahSelectors();
            renderPageLabels();

            return state.surahs;
        })();

        try {
            return await state.surahLoadPromise;
        } finally {
            state.surahLoadPromise = null;
        }
    }

    async function loadSurahContent(surahNumber, options = {}) {
        const number = Number(surahNumber);

        if (!Number.isInteger(number) || number < 1 || number > 114) {
            throw new Error("Invalid surah number");
        }

        const language = options.language || state.language;
        const translationEdition = EDITIONS[language] || EDITIONS.bn;

        const arabicURL =
            `${API_BASE}/surah/${number}/${EDITIONS.arabic}`;

        const translationURL =
            `${API_BASE}/surah/${number}/${translationEdition}`;

        const audioURL =
            `${API_BASE}/surah/${number}/${EDITIONS.audio}`;

        const [arabicResult, translationResult, audioResult] =
            await Promise.all([
                fetchJSON(arabicURL),
                fetchJSON(translationURL).catch(() => null),
                fetchJSON(audioURL).catch(() => null)
            ]);

        const arabicData = arabicResult;
        const translationData = translationResult;
        const audioData = audioResult;

        if (
            !arabicData ||
            !Array.isArray(arabicData.ayahs) ||
            arabicData.ayahs.length === 0
        ) {
            throw new Error("Arabic ayah data is missing");
        }

        const ayahs = normalizeAyahData(
            arabicData,
            translationData,
            audioData
        );

        const surah = getSurahByNumber(number);

        return {
            surahNumber: number,
            surah: surah,
            ayahs: ayahs,
            translationAvailable: Boolean(translationData),
            audioAvailable: ayahs.some((ayah) => Boolean(ayah.audioUrl))
        };
    }


    /* =====================================================
       08. SURAH SELECTORS
    ===================================================== */

    function renderSurahSelectors() {
        const selectors = [
            $("readSurahSelect"),
            $("listenSurahList")
        ].filter(Boolean);

        for (const select of selectors) {
            const currentValue = Number(select.value) || 1;
            const fragment = document.createDocumentFragment();

            for (const surah of state.surahs) {
                const option = document.createElement("option");

                option.value = String(surah.number);
                option.textContent =
                    `${padNumber(surah.number)}. ${getSurahName(surah)}`;

                fragment.appendChild(option);
            }

            select.replaceChildren(fragment);

            const targetValue = Math.min(
                114,
                Math.max(1, currentValue)
            );

            select.value = String(targetValue);
        }

        if ($("readSurahSelect")) {
            $("readSurahSelect").value = String(state.readSurah);
        }

        if ($("listenSurahList")) {
            $("listenSurahList").value = String(state.listenSurah);
        }
    }


    /* =====================================================
       09. SHARED PAGE LABELS
    ===================================================== */

    function renderPageLabels() {
        setText("brandName", text("brandName"));
        setText("brandSubtitle", text("brandSubtitle"));

        setText("featuredEyebrow", text("featuredEyebrow"));
        setText("featuredPlayText", text("featuredPlay"));

        setText("readOptionTitle", text("readOptionTitle"));
        setText("readOptionDescription", text("readOptionDescription"));

        setText("listenOptionTitle", text("listenOptionTitle"));
        setText("listenOptionDescription", text("listenOptionDescription"));

        setText("readEyebrow", text("readEyebrow"));
        setText("listenEyebrow", text("listenEyebrow"));

        setText("readSurahSelectLabel", text("readSelector"));
        setText("listenSurahSelectLabel", text("listenSelector"));

        setText("readFooterMessage", text("readFooter"));
        setText("homeFooterMessage", text("homeFooter"));
        setText("listenAyahListHeading", text("listenListHeading"));

        setText(
            "previousAyah",
            $("previousAyah")?.querySelector("span")?.textContent || "‹"
        );

        if ($("previousAyah")) {
            $("previousAyah").setAttribute("aria-label", text("previous"));
            $("previousAyah").title = text("previous");
        }

        if ($("nextAyah")) {
            $("nextAyah").setAttribute("aria-label", text("next"));
            $("nextAyah").title = text("next");
        }

        if ($("listenPrevious")) {
            $("listenPrevious").setAttribute("aria-label", text("previous"));
            $("listenPrevious").title = text("previous");
        }

        if ($("listenNext")) {
            $("listenNext").setAttribute("aria-label", text("next"));
            $("listenNext").title = text("next");
        }

        if ($("listenPlayPause")) {
            $("listenPlayPause").setAttribute(
                "aria-label",
                state.isPlaying ? text("pause") : text("play")
            );
            $("listenPlayPause").title =
                state.isPlaying ? text("pause") : text("play");
        }

        if ($("featuredPlayButton")) {
            $("featuredPlayButton").setAttribute(
                "aria-label",
                state.audioMode === "featured" && state.isPlaying
                    ? text("featuredPause")
                    : text("featuredPlay")
            );
        }

        const titleByPage = {
            home: text("homeHeading"),
            read: text("readHeading"),
            listen: text("listenHeading")
        };

        const subtitleByPage = {
            home: text("homeSubheading"),
            read: text("readSubheading"),
            listen: text("listenSubheading")
        };

        setText("pageHeading", titleByPage[state.page] || text("homeHeading"));
        setText(
            "pageSubheading",
            subtitleByPage[state.page] || text("homeSubheading")
        );

        document.title =
            `${titleByPage[state.page] || text("homeHeading")} | ${text("brandName")}`;
    }


    /* =====================================================
       10. PAGE NAVIGATION
    ===================================================== */

    function getPageElement(page) {
        if (page === "read") return $("readScreen");
        if (page === "listen") return $("listenScreen");
        return $("homeScreen");
    }

    function renderPageVisibility() {
        const pages = {
            home: $("homeScreen"),
            read: $("readScreen"),
            listen: $("listenScreen")
        };

        for (const [name, element] of Object.entries(pages)) {
            if (element) {
                element.hidden = name !== state.page;
            }
        }

        setHTMLHidden("homeFooter", state.page !== "home");
        setHTMLHidden("readFooter", state.page !== "read");
        setHTMLHidden("listenFooter", state.page !== "listen");

        const content = getPageElement(state.page);

        if (content) {
            content.scrollTop = 0;
        }

        renderPageLabels();
    }

    function pushPageHistory(page) {
        if (!state.historyReady || state.changingHistory) return;

        try {
            const currentState = history.state || {};

            if (
                currentState.ibadatQuran === true &&
                currentState.page === page
            ) {
                return;
            }

            history.pushState(
                {
                    ...(currentState && typeof currentState === "object"
                        ? currentState
                        : {}),
                    ibadatQuran: true,
                    page: page
                },
                "",
                location.href
            );
        } catch (error) {
            // Navigation still works without History API support.
        }
    }

    function initializeHistory() {
        if (state.historyReady) return;

        try {
            if (
                !history.state ||
                history.state.ibadatQuran !== true
            ) {
                history.replaceState(
                    {
                        ...(history.state && typeof history.state === "object"
                            ? history.state
                            : {}),
                        ibadatQuran: true,
                        page: "home"
                    },
                    "",
                    location.href
                );
            }
        } catch (error) {
            // Ignore restricted History API environments.
        }

        state.historyReady = true;

        window.addEventListener("popstate", (event) => {
            const targetPage =
                event.state?.ibadatQuran === true
                    ? event.state.page
                    : "home";

            state.changingHistory = true;

            showPage(
                ["home", "read", "listen"].includes(targetPage)
                    ? targetPage
                    : "home",
                {
                    history: false,
                    fromPopState: true
                }
            );

            state.changingHistory = false;
        });
    }

    function showPage(page, options = {}) {
        if (!["home", "read", "listen"].includes(page)) {
            page = "home";
        }

        const previousPage = state.page;

        state.page = page;

        renderPageVisibility();

        if (options.history !== false) {
            pushPageHistory(page);
        }

        if (page === "read") {
            loadReadSurah(state.readSurah).catch(() => {});
        }

        if (page === "listen") {
            loadListenSurah(state.listenSurah).catch(() => {});
        }

        if (previousPage !== page) {
            window.dispatchEvent(
                new CustomEvent("ibadat:quranpagechange", {
                    detail: {
                        page: page,
                        previousPage: previousPage
                    }
                })
            );
        }
    }


    /* =====================================================
       11. READ PAGE — LOAD AND RENDER
    ===================================================== */

    async function loadReadSurah(surahNumber, options = {}) {
        const number = Number(surahNumber);
        const requestId = ++state.readRequestId;

        state.readSurah = number;

        if (!options.preserveAyah) {
            state.readAyah = 1;
        }

        clearError("readError");
        setHTMLHidden("readLoading", false);
        setHTMLHidden("readEmpty", true);

        setStatus("readLoading", text("loadingAyahs"));

        try {
            await loadSurahDirectory();

            let data = getSurahData(number, "read");

            if (
                !data ||
                data.language !== state.language
            ) {
                data = await loadSurahContent(number);

                data.language = state.language;
                state.readData.set(number, data);
            }

            if (requestId !== state.readRequestId) return;

            const surah = getSurahByNumber(number);

            if (!surah) {
                throw new Error("Surah not found");
            }

            state.readSurah = number;

            const totalAyahs = data.ayahs.length;

            state.readAyah = Math.min(
                Math.max(1, state.readAyah),
                totalAyahs
            );

            if ($("readSurahSelect")) {
                $("readSurahSelect").value = String(number);
            }

            setText("readSurahTitle", getSurahName(surah));
            setText("readSurahMeta", getSurahMeta(surah));

            renderReadAyahs(data);

            setHTMLHidden("readLoading", true);

            if (state.page === "read") {
                updateReadActiveAyah();
            }

        } catch (error) {
            if (requestId !== state.readRequestId) return;

            setHTMLHidden("readLoading", true);

            showError(
                "readError",
                error instanceof TypeError
                    ? text("networkError")
                    : text("dataError")
            );

            setHTMLHidden("readEmpty", true);

        } finally {
            if (requestId === state.readRequestId) {
                setHTMLHidden("readLoading", true);
            }
        }
    }

    function renderReadAyahs(data) {
        const list = $("readAyahList");
        if (!list) return;

        const fragment = document.createDocumentFragment();

        for (const ayah of data.ayahs) {
            const card = makeElement("article", "ayah-card");
            card.dataset.ayahNumber = String(ayah.number);
            card.dataset.surahNumber = String(data.surahNumber);

            const header = makeElement("div", "ayah-card-header");

            const numberBadge = makeElement(
                "span",
                "ayah-number",
                ayah.number
            );

            numberBadge.setAttribute("aria-label", `${text("selectedAyah")} ${ayah.number}`);

            const reference = makeElement(
                "span",
                "ayah-reference",
                `${getSurahName(data.surah)} · ${text("selectedAyah")} ${ayah.number}`
            );

            header.append(numberBadge, reference);

            const arabic = makeElement(
                "p",
                "ayah-arabic arabic-text",
                ayah.arabic
            );

            arabic.lang = "ar";
            arabic.dir = "rtl";

            const translation = makeElement(
                "p",
                "ayah-translation",
                ayah.translation || text("translationUnavailable")
            );

            translation.lang = state.language;

            const actions = makeElement("div", "ayah-card-actions");

            if (ayah.audioUrl) {
                const playButton = makeElement("button", "ayah-play-button");
                playButton.type = "button";
                playButton.dataset.action = "play-ayah";
                playButton.dataset.surahNumber = String(data.surahNumber);
                playButton.dataset.ayahNumber = String(ayah.number);

                playButton.setAttribute(
                    "aria-label",
                    `${text("play")}: ${getSurahName(data.surah)}, ${text("selectedAyah")} ${ayah.number}`
                );

                const icon = makeElement("span", "", "▶");
                icon.setAttribute("aria-hidden", "true");

                playButton.appendChild(icon);
                actions.appendChild(playButton);
            }

            card.append(header, arabic, translation);

            if (actions.childElementCount) {
                card.appendChild(actions);
            }

            fragment.appendChild(card);
        }

        list.replaceChildren(fragment);

        setHTMLHidden("readEmpty", data.ayahs.length > 0);

        updateReadActiveAyah();
    }

    function updateReadActiveAyah() {
        const list = $("readAyahList");
        if (!list) return;

        const cards = list.querySelectorAll(".ayah-card");

        for (const card of cards) {
            const isActive =
                Number(card.dataset.ayahNumber) === state.readAyah &&
                Number(card.dataset.surahNumber) === state.readSurah;

            card.classList.toggle("is-active", isActive);
            card.classList.toggle("active", isActive);

            if (isActive) {
                card.setAttribute("aria-current", "true");
            } else {
                card.removeAttribute("aria-current");
            }
        }
    }

    async function selectReadSurah(number) {
        state.readSurah = Number(number);
        state.readAyah = 1;

        await loadReadSurah(state.readSurah);
    }

    async function moveReadAyah(direction) {
        const data = getSurahData(state.readSurah, "read");

        if (!data) {
            await loadReadSurah(state.readSurah);
        }

        const currentData = getSurahData(state.readSurah, "read");
        if (!currentData) return;

        const currentAyahCount = currentData.ayahs.length;

        if (direction > 0) {
            if (state.readAyah < currentAyahCount) {
                state.readAyah += 1;
                updateReadActiveAyah();
                scrollReadAyahIntoView();
                return;
            }

            if (state.readSurah < 114) {
                state.readSurah += 1;
                state.readAyah = 1;

                await loadReadSurah(state.readSurah);
                scrollReadAyahIntoView();
                return;
            }

            showToast(text("endOfQuran"));
            return;
        }

        if (state.readAyah > 1) {
            state.readAyah -= 1;
            updateReadActiveAyah();
            scrollReadAyahIntoView();
            return;
        }

        if (state.readSurah > 1) {
            state.readSurah -= 1;

            await loadReadSurah(state.readSurah);

            const previousData = getSurahData(state.readSurah, "read");

            state.readAyah = previousData
                ? previousData.ayahs.length
                : 1;

            updateReadActiveAyah();
            scrollReadAyahIntoView();

            return;
        }

        showToast(text("noPrevious"));
    }

    function scrollReadAyahIntoView() {
        const list = $("readAyahList");
        if (!list) return;

        const active = list.querySelector(
            `.ayah-card[data-ayah-number="${state.readAyah}"]`
        );

        if (active) {
            active.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }


    /* =====================================================
       12. LISTEN PAGE — LOAD AND RENDER
    ===================================================== */

    async function loadListenSurah(surahNumber, options = {}) {
        const number = Number(surahNumber);
        const requestId = ++state.listenRequestId;

        state.listenSurah = number;

        if (!options.preserveAyah) {
            state.listenAyah = 1;
        }

        stopCurrentAudio({ preservePosition: false });

        clearError("listenError");

        setHTMLHidden("listenLoading", false);
        setStatus("listenLoading", text("loadingAudio"));

        try {
            await loadSurahDirectory();

            let data = getSurahData(number, "listen");

            if (
                !data ||
                data.language !== state.language
            ) {
                data = await loadSurahContent(number);

                data.language = state.language;
                state.listenData.set(number, data);
            }

            if (requestId !== state.listenRequestId) return;

            const surah = getSurahByNumber(number);

            if (!surah) {
                throw new Error("Surah not found");
            }

            state.listenSurah = number;

            state.listenAyah = Math.min(
                Math.max(1, state.listenAyah),
                data.ayahs.length
            );

            if ($("listenSurahList")) {
                $("listenSurahList").value = String(number);
            }

            setText("listenSurahTitle", getSurahName(surah));
            setText("listenSurahMeta", getSurahMeta(surah));

            renderListenAyahList(data);
            renderCurrentListenAyah();

            setHTMLHidden("listenLoading", true);
            setStatus("listenAudioStatus", text("ready"));

            resetProgress();

        } catch (error) {
            if (requestId !== state.listenRequestId) return;

            setHTMLHidden("listenLoading", true);

            showError(
                "listenError",
                error instanceof TypeError
                    ? text("networkError")
                    : text("dataError")
            );

        } finally {
            if (requestId === state.listenRequestId) {
                setHTMLHidden("listenLoading", true);
            }
        }
    }

    function renderListenAyahList(data) {
        const list = $("listenAyahList");
        if (!list) return;

        const fragment = document.createDocumentFragment();

        for (const ayah of data.ayahs) {
            const card = makeElement("article", "ayah-card");

            card.dataset.ayahNumber = String(ayah.number);
            card.dataset.surahNumber = String(data.surahNumber);

            const header = makeElement("div", "ayah-card-header");

            const numberBadge = makeElement(
                "span",
                "ayah-number",
                ayah.number
            );

            const reference = makeElement(
                "span",
                "ayah-reference",
                `${getSurahName(data.surah)} · ${text("selectedAyah")} ${ayah.number}`
            );

            header.append(numberBadge, reference);

            const arabic = makeElement(
                "p",
                "ayah-arabic arabic-text",
                ayah.arabic
            );

            arabic.lang = "ar";
            arabic.dir = "rtl";

            const translation = makeElement(
                "p",
                "ayah-translation",
                ayah.translation || text("translationUnavailable")
            );

            translation.lang = state.language;

            const actions = makeElement("div", "ayah-card-actions");

            const playButton = makeElement("button", "ayah-play-button");
            playButton.type = "button";
            playButton.dataset.action = "select-listen-ayah";
            playButton.dataset.surahNumber = String(data.surahNumber);
            playButton.dataset.ayahNumber = String(ayah.number);

            playButton.setAttribute(
                "aria-label",
                `${text("play")}: ${getSurahName(data.surah)}, ${text("selectedAyah")} ${ayah.number}`
            );

            const icon = makeElement("span", "", "▶");
            icon.setAttribute("aria-hidden", "true");

            playButton.appendChild(icon);
            actions.appendChild(playButton);

            card.append(header, arabic, translation, actions);
            fragment.appendChild(card);
        }

        list.replaceChildren(fragment);

        updateListenActiveAyah();
    }

    function renderCurrentListenAyah() {
        const data = getSurahData(state.listenSurah, "listen");
        if (!data) return;

        const ayah = data.ayahs.find(
            (item) => item.number === state.listenAyah
        );

        if (!ayah) return;

        setText(
            "listenAyahReference",
            `${text("surah")} ${state.listenSurah} · ${text("selectedAyah")} ${state.listenAyah}`
        );

        setText("listenCurrentArabic", ayah.arabic);

        setText(
            "listenCurrentTranslation",
            ayah.translation || text("translationUnavailable")
        );

        const arabic = $("listenCurrentArabic");
        if (arabic) {
            arabic.lang = "ar";
            arabic.dir = "rtl";
        }

        const translation = $("listenCurrentTranslation");
        if (translation) {
            translation.lang = state.language;
        }

        updateListenActiveAyah();
    }

    function updateListenActiveAyah() {
        const list = $("listenAyahList");
        if (!list) return;

        for (const card of list.querySelectorAll(".ayah-card")) {
            const active =
                Number(card.dataset.surahNumber) === state.listenSurah &&
                Number(card.dataset.ayahNumber) === state.listenAyah;

            card.classList.toggle("is-active", active);
            card.classList.toggle("active", active);

            if (active) {
                card.setAttribute("aria-current", "true");
            } else {
                card.removeAttribute("aria-current");
            }
        }
    }

    async function selectListenSurah(number) {
        state.listenSurah = Number(number);
        state.listenAyah = 1;

        await loadListenSurah(state.listenSurah);
    }


    /* =====================================================
       13. AUDIO CONTROLS
    ===================================================== */

    function updatePlayPauseButton() {
        const icon = $("listenPlayIcon");
        const button = $("listenPlayPause");

        if (icon) {
            icon.textContent = state.isPlaying ? "Ⅱ" : "▶";
        }

        if (button) {
            button.setAttribute(
                "aria-label",
                state.isPlaying ? text("pause") : text("play")
            );

            button.title = state.isPlaying
                ? text("pause")
                : text("play");

            button.setAttribute(
                "aria-pressed",
                state.isPlaying ? "true" : "false"
            );
        }

        const featuredIcon = $("featuredPlayIcon");

        if (featuredIcon && state.audioMode === "featured") {
            featuredIcon.textContent = state.isPlaying ? "Ⅱ" : "▶";
        }
    }

    function resetProgress() {
        const progress = $("listenProgress");
        const currentTime = $("listenCurrentTime");
        const duration = $("listenDuration");

        if (progress) progress.value = "0";
        if (currentTime) currentTime.textContent = "0:00";
        if (duration) duration.textContent = "0:00";
    }

    function updateAudioProgress() {
        const audio = state.audio;
        if (!audio) return;

        const progress = $("listenProgress");
        const currentTime = $("listenCurrentTime");
        const duration = $("listenDuration");

        if (currentTime) {
            currentTime.textContent = formatTime(audio.currentTime);
        }

        if (
            duration &&
            Number.isFinite(audio.duration) &&
            audio.duration > 0
        ) {
            duration.textContent = formatTime(audio.duration);
        }

        if (
            progress &&
            !state.isSeeking &&
            Number.isFinite(audio.duration) &&
            audio.duration > 0
        ) {
            progress.value = String(
                (audio.currentTime / audio.duration) * 100
            );
        }
    }

    function getCurrentListenAyah() {
        const data = getSurahData(state.listenSurah, "listen");
        if (!data) return null;

        return data.ayahs.find(
            (ayah) => ayah.number === state.listenAyah
        ) || null;
    }

    function stopCurrentAudio(options = {}) {
        const audio = state.audio;

        state.audioRequestId += 1;
        state.isPlaying = false;

        if (audio) {
            try {
                audio.pause();

                if (!options.preservePosition) {
                    audio.currentTime = 0;
                }
            } catch (error) {
                // Some browsers reject currentTime before metadata loads.
            }
        }

        updatePlayPauseButton();
    }

    async function playAudioURL(url, mode = "listen") {
        if (!state.audio || !url) {
            showToast(text("audioError"));
            return false;
        }

        const audio = state.audio;
        const requestId = ++state.audioRequestId;

        state.audioMode = mode;
        state.isPlaying = false;

        updatePlayPauseButton();

        try {
            if (audio.src !== new URL(url, location.href).href) {
                audio.pause();
                audio.src = url;
                audio.load();
            }

            const playPromise = audio.play();

            if (playPromise && typeof playPromise.then === "function") {
                await playPromise;
            }

            if (requestId !== state.audioRequestId) {
                audio.pause();
                return false;
            }

            state.isPlaying = true;
            updatePlayPauseButton();

            setStatus(
                "listenAudioStatus",
                text("playing")
            );

            return true;

        } catch (error) {
            if (requestId !== state.audioRequestId) {
                return false;
            }

            state.isPlaying = false;
            updatePlayPauseButton();

            setStatus(
                "listenAudioStatus",
                text("audioError")
            );

            showToast(text("audioError"));

            return false;
        }
    }

    async function playCurrentListenAyah() {
        const ayah = getCurrentListenAyah();

        if (!ayah) {
            await loadListenSurah(state.listenSurah);
        }

        const currentAyah = getCurrentListenAyah();

        if (!currentAyah || !currentAyah.audioUrl) {
            showToast(text("audioError"));
            return;
        }

        renderCurrentListenAyah();
        updateListenActiveAyah();

        await playAudioURL(currentAyah.audioUrl, "listen");
    }

    async function toggleListenPlayback() {
        if (!state.audio) return;

        if (
            state.audioMode === "listen" &&
            state.audio.src &&
            state.audio.currentTime > 0 &&
            state.audio.paused &&
            !state.audio.ended
        ) {
            try {
                await state.audio.play();

                state.isPlaying = true;
                updatePlayPauseButton();

                setStatus(
                    "listenAudioStatus",
                    text("playing")
                );

                return;

            } catch (error) {
                showToast(text("audioError"));
                return;
            }
        }

        if (state.isPlaying && !state.audio.paused) {
            state.audio.pause();
            state.isPlaying = false;

            updatePlayPauseButton();
            setStatus("listenAudioStatus", text("paused"));

            return;
        }

        if (state.audioMode === "featured") {
            await playFeatured();
            return;
        }

        await playCurrentListenAyah();
    }

    async function moveListenAyah(direction) {
        const currentData = getSurahData(state.listenSurah, "listen");

        if (!currentData) {
            await loadListenSurah(state.listenSurah);
        }

        const data = getSurahData(state.listenSurah, "listen");
        if (!data) return;

        const ayahCount = data.ayahs.length;

        if (direction > 0) {
            if (state.listenAyah < ayahCount) {
                state.listenAyah += 1;

                renderCurrentListenAyah();
                resetProgress();

                await playCurrentListenAyah();
                return;
            }

            if (state.listenSurah < 114) {
                const nextSurah = state.listenSurah + 1;

                state.listenSurah = nextSurah;
                state.listenAyah = 1;

                await loadListenSurah(nextSurah);
                await playCurrentListenAyah();

                return;
            }

            stopCurrentAudio({ preservePosition: true });

            setStatus("listenAudioStatus", text("endOfQuran"));
            showToast(text("endOfQuran"));

            return;
        }

        if (state.listenAyah > 1) {
            state.listenAyah -= 1;

            renderCurrentListenAyah();
            resetProgress();

            await playCurrentListenAyah();
            return;
        }

        if (state.listenSurah > 1) {
            const previousSurah = state.listenSurah - 1;

            await loadListenSurah(previousSurah);

            const previousData = getSurahData(previousSurah, "listen");

            state.listenAyah = previousData
                ? previousData.ayahs.length
                : 1;

            renderCurrentListenAyah();
            resetProgress();

            await playCurrentListenAyah();

            return;
        }

        showToast(text("noPrevious"));
    }


    /* =====================================================
       14. FEATURED BISMILLAH AUDIO
    ===================================================== */

    async function playFeatured() {
        if (!state.featuredAudioUrl) {
            try {
                const data = await fetchJSON(
                    `${API_BASE}/ayah/1/${EDITIONS.audio}`
                );

                if (!data || !data.audio) {
                    throw new Error("Featured audio unavailable");
                }

                state.featuredAudioUrl = data.audio;

            } catch (error) {
                showToast(text("audioError"));
                return;
            }
        }

        if (
            state.audioMode === "featured" &&
            state.isPlaying &&
            state.audio &&
            !state.audio.paused
        ) {
            state.audio.pause();
            state.isPlaying = false;
            updatePlayPauseButton();
            return;
        }

        await playAudioURL(state.featuredAudioUrl, "featured");
    }


    /* =====================================================
       15. AUDIO EVENTS
    ===================================================== */

    function bindAudioEvents() {
        const audio = state.audio;
        if (!audio) return;

        audio.addEventListener("play", () => {
            state.isPlaying = true;
            updatePlayPauseButton();

            if (state.audioMode === "listen") {
                setStatus("listenAudioStatus", text("playing"));
            }
        });

        audio.addEventListener("pause", () => {
            state.isPlaying = false;
            updatePlayPauseButton();

            if (
                state.audioMode === "listen" &&
                !audio.ended
            ) {
                setStatus("listenAudioStatus", text("paused"));
            }
        });

        audio.addEventListener("timeupdate", updateAudioProgress);

        audio.addEventListener("loadedmetadata", () => {
            state.audioMetadataReady = true;
            updateAudioProgress();
        });

        audio.addEventListener("durationchange", updateAudioProgress);

        audio.addEventListener("seeking", () => {
            state.isSeeking = true;
        });

        audio.addEventListener("seeked", () => {
            state.isSeeking = false;
            updateAudioProgress();
        });

        audio.addEventListener("ended", async () => {
            state.isPlaying = false;
            updatePlayPauseButton();

            if (state.audioMode === "featured") {
                setStatus("listenAudioStatus", text("ready"));
                return;
            }

            const currentRequestId = state.audioRequestId;

            if (currentRequestId < 1) return;

            await moveListenAyah(1);
        });

        audio.addEventListener("error", () => {
            state.isPlaying = false;
            updatePlayPauseButton();

            if (state.audioMode === "listen") {
                setStatus("listenAudioStatus", text("audioError"));
            }
        });
    }


    /* =====================================================
       16. SEEK BAR
    ===================================================== */

    function seekAudioFromProgress() {
        const progress = $("listenProgress");
        const audio = state.audio;

        if (!progress || !audio) return;

        const duration = audio.duration;

        if (!Number.isFinite(duration) || duration <= 0) {
            return;
        }

        const percentage = Math.min(
            100,
            Math.max(0, Number(progress.value) || 0)
        );

        audio.currentTime = duration * percentage / 100;
        updateAudioProgress();
    }


    /* =====================================================
       17. ARABIC FONT CONTROLS
    ===================================================== */

    function updateArabicFontSize() {
        document.documentElement.style.setProperty(
            "--arabic-font-size",
            `${state.arabicFontSize}px`
        );

        const readArabic = $("readAyahList");
        const listenArabic = $("listenAyahList");

        if (readArabic) {
            readArabic.style.setProperty(
                "--arabic-font-size",
                `${state.arabicFontSize}px`
            );
        }

        if (listenArabic) {
            listenArabic.style.setProperty(
                "--arabic-font-size",
                `${Math.max(22, state.arabicFontSize - 5)}px`
            );
        }
    }

    function changeArabicFontSize(direction) {
        state.arabicFontSize = Math.max(
            MIN_ARABIC_FONT,
            Math.min(
                MAX_ARABIC_FONT,
                state.arabicFontSize + direction * FONT_STEP
            )
        );

        updateArabicFontSize();

        showToast(
            direction > 0
                ? text("fontIncreased")
                : text("fontDecreased")
        );
    }


    /* =====================================================
       18. AYAH CLICK HANDLERS
    ===================================================== */

    async function playSelectedReadAyah(surahNumber, ayahNumber) {
        state.listenSurah = Number(surahNumber);
        state.listenAyah = Number(ayahNumber);

        showPage("listen");

        await loadListenSurah(state.listenSurah, {
            preserveAyah: true
        });

        const data = getSurahData(state.listenSurah, "listen");

        if (!data) return;

        state.listenAyah = Math.min(
            Math.max(1, state.listenAyah),
            data.ayahs.length
        );

        renderCurrentListenAyah();

        await playCurrentListenAyah();
    }

    async function selectAndPlayListenAyah(surahNumber, ayahNumber) {
        const targetSurah = Number(surahNumber);
        const targetAyah = Number(ayahNumber);

        if (
            targetSurah < 1 ||
            targetSurah > 114 ||
            targetAyah < 1
        ) {
            return;
        }

        if (targetSurah !== state.listenSurah) {
            state.listenSurah = targetSurah;
            state.listenAyah = targetAyah;

            await loadListenSurah(targetSurah, {
                preserveAyah: true
            });

        } else {
            state.listenAyah = targetAyah;
            renderCurrentListenAyah();
        }

        const data = getSurahData(targetSurah, "listen");

        if (!data) return;

        if (state.listenAyah > data.ayahs.length) {
            state.listenAyah = data.ayahs.length;
        }

        renderCurrentListenAyah();
        await playCurrentListenAyah();
    }


    /* =====================================================
       19. LANGUAGE CHANGE SUPPORT
    ===================================================== */

    async function changeLanguage(newLanguage) {
        const normalized = normalizeLanguage(newLanguage);
        if (!normalized || normalized === state.language) return;

        state.language = normalized;

        state.readData.clear();
        state.listenData.clear();

        applyLanguageToDocument();
        renderPageLabels();
        renderSurahSelectors();

        if (state.surahsLoaded) {
            renderPageLabels();
        }

        if (state.page === "read") {
            await loadReadSurah(state.readSurah);
        }

        if (state.page === "listen") {
            const wasPlaying = state.isPlaying;

            await loadListenSurah(state.listenSurah);

            if (wasPlaying) {
                await playCurrentListenAyah();
            }
        }

        window.dispatchEvent(
            new CustomEvent("ibadat:quranlanguagechange", {
                detail: { language: normalized }
            })
        );
    }


    /* =====================================================
       20. EVENT BINDING
    ===================================================== */

    function bindClick(id, callback) {
        const element = $(id);
        if (!element) return;

        element.addEventListener("click", (event) => {
            event.preventDefault();
            callback(event);
        });
    }

    function initEvents() {
        bindClick("openReadPage", () => {
            showPage("read");
        });

        bindClick("openListenPage", () => {
            showPage("listen");
        });

        bindClick("featuredPlayButton", () => {
            playFeatured();
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

        bindClick("decreaseArabicFont", () => {
            changeArabicFontSize(-1);
        });

        bindClick("increaseArabicFont", () => {
            changeArabicFontSize(1);
        });

        const readSelect = $("readSurahSelect");

        if (readSelect) {
            readSelect.addEventListener("change", () => {
                const number = Number(readSelect.value);

                if (number >= 1 && number <= 114) {
                    selectReadSurah(number);
                }
            });
        }

        const listenSelect = $("listenSurahList");

        if (listenSelect) {
            listenSelect.addEventListener("change", () => {
                const number = Number(listenSelect.value);

                if (number >= 1 && number <= 114) {
                    selectListenSurah(number);
                }
            });
        }

        const readList = $("readAyahList");

        if (readList) {
            readList.addEventListener("click", (event) => {
                const button = event.target.closest(
                    '[data-action="play-ayah"]'
                );

                if (!button) return;

                const surahNumber = Number(button.dataset.surahNumber);
                const ayahNumber = Number(button.dataset.ayahNumber);

                playSelectedReadAyah(surahNumber, ayahNumber);
            });
        }

        const listenList = $("listenAyahList");

        if (listenList) {
            listenList.addEventListener("click", (event) => {
                const button = event.target.closest(
                    '[data-action="select-listen-ayah"]'
                );

                if (!button) return;

                const surahNumber = Number(button.dataset.surahNumber);
                const ayahNumber = Number(button.dataset.ayahNumber);

                selectAndPlayListenAyah(surahNumber, ayahNumber);
            });
        }

        const progress = $("listenProgress");

        if (progress) {
            progress.addEventListener("input", () => {
                state.isSeeking = true;
            });

            progress.addEventListener("change", () => {
                seekAudioFromProgress();
                state.isSeeking = false;
            });
        }

        document.addEventListener("ibadat:languagechange", (event) => {
            const language =
                event.detail?.language ||
                event.detail?.lang ||
                event.detail;

            changeLanguage(language);
        });

        document.addEventListener("ibadat:quran-language-change", (event) => {
            const language =
                event.detail?.language ||
                event.detail?.lang ||
                event.detail;

            changeLanguage(language);
        });

        window.IBADAT_QURAN = {
            setLanguage: changeLanguage,

            openHome: () => showPage("home"),
            openRead: () => showPage("read"),
            openListen: () => showPage("listen"),

            selectReadSurah,
            selectListenSurah,

            play: toggleListenPlayback,
            pause: () => {
                if (state.audio && !state.audio.paused) {
                    state.audio.pause();
                }
            },

            nextAyah: () => moveListenAyah(1),
            previousAyah: () => moveListenAyah(-1),

            getState: () => ({
                language: state.language,
                page: state.page,
                readSurah: state.readSurah,
                readAyah: state.readAyah,
                listenSurah: state.listenSurah,
                listenAyah: state.listenAyah,
                isPlaying: state.isPlaying
            })
        };
    }


    /* =====================================================
       21. PAGE INITIALIZATION
    ===================================================== */

    async function init() {
        state.language = detectLanguage();

        state.audio = $("quranAudio");

        applyLanguageToDocument();
        renderPageLabels();
        renderPageVisibility();
        updateArabicFontSize();

        initializeHistory();
        initEvents();
        bindAudioEvents();

        try {
            await loadSurahDirectory();

            await Promise.all([
                loadReadSurah(state.readSurah),
                loadListenSurah(state.listenSurah)
            ]);

            setHTMLHidden("readLoading", true);
            setHTMLHidden("listenLoading", true);

        } catch (error) {
            setHTMLHidden("readLoading", true);
            setHTMLHidden("listenLoading", true);

            showError("readError", text("dataError"));
            showError("listenError", text("dataError"));
        }
    }


    /* =====================================================
       22. PUBLIC MODULE API
    ===================================================== */

    return {
        init,
        changeLanguage,
        showPage,
        loadReadSurah,
        loadListenSurah,
        playCurrentListenAyah,
        moveListenAyah
    };
})();


/* =========================================================
   23. START APPLICATION
========================================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        IBADAT_QURAN.init();
    }, { once: true });
} else {
    IBADAT_QURAN.init();
}


/* =========================================================
   END OF QURAN JAVASCRIPT
========================================================= */
