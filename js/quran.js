/* =========================================================
   IBADAT — QURAN SECTION
   File: js/quran.js

   Features:
   - AlQuran Cloud API
   - Arabic Quran text
   - Bengali, Hindi and English translations
   - Surah reading and listening
   - Audio play / pause / next / previous
   - Featured ayah playback
   - Arabic font size controls
   - Saved reading position
   - Mobile Back navigation
   - Existing site language and theme compatibility
========================================================= */

(() => {
  "use strict";

  /* =======================================================
     1. CONFIGURATION
  ======================================================= */

  const API_BASE = "https://api.alquran.cloud/v1";

  const EDITIONS = {
    arabic: "quran-uthmani",
    audio: "ar.alafasy",

    bn: "bn.bengali",
    hi: "hi.hindi",
    en: "en.sahih"
  };

  const STORAGE_KEYS = {
    language: [
      "ibadat_language",
      "siteLanguage",
      "selectedLanguage",
      "language",
      "lang",
      "preferredLanguage"
    ],

    savedPosition: "ibadat_quran_saved_position",
    arabicSize: "ibadat_quran_arabic_size"
  };

  const DEFAULT_LANGUAGE = "bn";
  const DEFAULT_SURAH = 1;

  const MIN_ARABIC_SIZE = 22;
  const MAX_ARABIC_SIZE = 48;
  const DEFAULT_ARABIC_SIZE = 30;

  const API_TIMEOUT = 20000;


  /* =======================================================
     2. DOM HELPERS
  ======================================================= */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const getElement = (id) =>
    document.getElementById(id);

  const setText = (element, text) => {
    if (element) {
      element.textContent = text ?? "";
    }
  };

  const setHTMLLanguage = (language) => {
    document.documentElement.lang = language;
  };

  const safeStorageGet = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const safeStorageSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The application remains usable if storage is unavailable.
    }
  };

  const safeStorageRemove = (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage restrictions.
    }
  };

  const escapeHTML = (value) => {
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
  };


  /* =======================================================
     3. LANGUAGE CONFIGURATION
  ======================================================= */

  const LANGUAGE_TEXT = {
    bn: {
      siteBrand: "ইবাদত",

      homeTitle: "পবিত্র কুরআন",
      subtitle: "শুদ্ধতার পথে শেখা ও অনুশীলন",

      featuredEyebrow: "আজকের নির্বাচিত আয়াত",
      readTitle: "কুরআন পড়ুন",
      readDescription: "আরবি আয়াত ও অনুবাদ পড়ুন",
      listenTitle: "তিলাওয়াত শুনুন",
      listenDescription: "পবিত্র কুরআনের তিলাওয়াত",

      homeFooter: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",
      readFooter: "শুদ্ধভাবে কুরআন পড়ুন",

      readHero: "কুরআন পড়ুন",
      listenHero: "তিলাওয়াত শুনুন",

      selectSurah: "সূরা নির্বাচন করুন",
      selectListenSurah: "তিলাওয়াতের জন্য সূরা নির্বাচন করুন",

      currentListening: "বর্তমানে শোনা হচ্ছে",
      startListening: "তিলাওয়াত শুরু করতে প্লে করুন",

      previousAyah: "আগের আয়াত",
      nextAyah: "পরবর্তী আয়াত",

      play: "তিলাওয়াত চালু করুন",
      pause: "তিলাওয়াত থামান",
      featuredPlay: "নির্বাচিত আয়াতের তিলাওয়াত শুনুন",

      fontSmaller: "আরবি লেখার আকার ছোট করুন",
      fontLarger: "আরবি লেখার আকার বড় করুন",

      ayah: "আয়াত",
      surah: "সূরা",
      meccan: "মাক্কি",
      medinan: "মাদানি",

      loadingSurahs: "সূরার তালিকা লোড হচ্ছে…",
      loadingAyahs: "আয়াত লোড হচ্ছে…",
      loadingAudio: "তিলাওয়াত লোড হচ্ছে…",

      audioReady: "তিলাওয়াত শুরু করতে প্লে করুন",
      audioPlaying: "তিলাওয়াত চলছে",
      audioPaused: "তিলাওয়াত থামানো হয়েছে",
      audioEnded: "তিলাওয়াত শেষ হয়েছে",

      loadError: "তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।",
      audioError: "অডিও চালানো যাচ্ছে না। আবার চেষ্টা করুন।",
      noAyah: "কোনো আয়াত পাওয়া যায়নি।",

      savedPosition: "আগের পড়ার অবস্থান পুনরুদ্ধার করা হয়েছে।",
      firstAyah: "এটাই প্রথম আয়াত।",
      lastAyah: "এটাই শেষ আয়াত।",

      surahNumber: "সূরা",
      ayahNumber: "আয়াত",

      noTranslation: "অনুবাদ পাওয়া যায়নি।"
    },

    hi: {
      siteBrand: "इबादत",

      homeTitle: "पवित्र क़ुरआन",
      subtitle: "पवित्रता की राह पर सीखना और अभ्यास",

      featuredEyebrow: "आज की चुनी हुई आयत",
      readTitle: "क़ुरआन पढ़ें",
      readDescription: "अरबी आयतें और अनुवाद पढ़ें",
      listenTitle: "तिलावत सुनें",
      listenDescription: "पवित्र क़ुरआन की तिलावत",

      homeFooter: "इबादत • पवित्रता की राह पर सीखना और अभ्यास",
      readFooter: "क़ुरआन सही ढंग से पढ़ें",

      readHero: "क़ुरआन पढ़ें",
      listenHero: "तिलावत सुनें",

      selectSurah: "सूरह चुनें",
      selectListenSurah: "तिलावत के लिए सूरह चुनें",

      currentListening: "अभी सुना जा रहा है",
      startListening: "तिलावत शुरू करने के लिए चलाएँ",

      previousAyah: "पिछली आयत",
      nextAyah: "अगली आयत",

      play: "तिलावत चलाएँ",
      pause: "तिलावत रोकें",
      featuredPlay: "चुनी हुई आयत की तिलावत सुनें",

      fontSmaller: "अरबी अक्षरों का आकार छोटा करें",
      fontLarger: "अरबी अक्षरों का आकार बड़ा करें",

      ayah: "आयत",
      surah: "सूरह",
      meccan: "मक्की",
      medinan: "मदनी",

      loadingSurahs: "सूरह की सूची लोड हो रही है…",
      loadingAyahs: "आयतें लोड हो रही हैं…",
      loadingAudio: "तिलावत लोड हो रही है…",

      audioReady: "तिलावत शुरू करने के लिए चलाएँ",
      audioPlaying: "तिलावत चल रही है",
      audioPaused: "तिलावत रोक दी गई है",
      audioEnded: "तिलावत समाप्त हुई",

      loadError: "जानकारी लोड नहीं हुई। इंटरनेट कनेक्शन जाँचें।",
      audioError: "ऑडियो नहीं चल पाया। फिर कोशिश करें।",
      noAyah: "कोई आयत नहीं मिली।",

      savedPosition: "पिछली पढ़ने की स्थिति बहाल की गई।",
      firstAyah: "यह पहली आयत है।",
      lastAyah: "यह अंतिम आयत है।",

      surahNumber: "सूरह",
      ayahNumber: "आयत",

      noTranslation: "अनुवाद उपलब्ध नहीं है।"
    },

    en: {
      siteBrand: "IBADAT",

      homeTitle: "The Holy Quran",
      subtitle: "Learning and practice on the path to purity",

      featuredEyebrow: "Featured Ayah",
      readTitle: "Read the Quran",
      readDescription: "Read Arabic verses and translations",
      listenTitle: "Listen to Recitation",
      listenDescription: "Listen to the Holy Quran",

      homeFooter: "IBADAT • Learning and practice on the path to purity",
      readFooter: "Read the Quran correctly",

      readHero: "Read the Quran",
      listenHero: "Listen to Recitation",

      selectSurah: "Select a Surah",
      selectListenSurah: "Select a Surah to listen",

      currentListening: "Now playing",
      startListening: "Press play to start recitation",

      previousAyah: "Previous ayah",
      nextAyah: "Next ayah",

      play: "Play recitation",
      pause: "Pause recitation",
      featuredPlay: "Listen to the featured ayah",

      fontSmaller: "Decrease Arabic font size",
      fontLarger: "Increase Arabic font size",

      ayah: "ayahs",
      surah: "Surah",
      meccan: "Meccan",
      medinan: "Medinan",

      loadingSurahs: "Loading surah list…",
      loadingAyahs: "Loading verses…",
      loadingAudio: "Loading recitation…",

      audioReady: "Press play to start recitation",
      audioPlaying: "Recitation is playing",
      audioPaused: "Recitation paused",
      audioEnded: "Recitation finished",

      loadError: "Unable to load data. Check your internet connection.",
      audioError: "Unable to play audio. Please try again.",
      noAyah: "No verses were found.",

      savedPosition: "Previous reading position restored.",
      firstAyah: "This is the first ayah.",
      lastAyah: "This is the last ayah.",

      surahNumber: "Surah",
      ayahNumber: "Ayah",

      noTranslation: "Translation unavailable."
    }
  };


  /* =======================================================
     4. APP STATE
  ======================================================= */

  const state = {
    language: DEFAULT_LANGUAGE,

    surahs: [],

    currentSurah: DEFAULT_SURAH,
    currentAyah: 1,

    currentPage: "home",

    readingAyahs: [],
    listeningAyahs: [],

    translations: new Map(),
    surahDetails: new Map(),

    isLoadingSurahs: false,
    isLoadingReading: false,
    isLoadingListening: false,

    audioMode: "listen",

    audioRequestId: 0,
    readingRequestId: 0,
    listeningRequestId: 0,

    audioReady: false,

    featuredAudioUrl: "",
    featuredAudioPlaying: false,

    savedPosition: null,

    audioSeekPending: null,

    audioElement: null
  };


  /* =======================================================
     5. LANGUAGE DETECTION
  ======================================================= */

  function normalizeLanguage(value) {
    if (!value) return null;

    const language = String(value)
      .trim()
      .toLowerCase()
      .replace("_", "-");

    if (
      language === "bn" ||
      language.startsWith("bn-") ||
      language.includes("bengali") ||
      language.includes("bangla")
    ) {
      return "bn";
    }

    if (
      language === "hi" ||
      language.startsWith("hi-") ||
      language.includes("hindi")
    ) {
      return "hi";
    }

    if (
      language === "en" ||
      language.startsWith("en-") ||
      language.includes("english")
    ) {
      return "en";
    }

    return null;
  }

  function detectLanguage() {
    for (const key of STORAGE_KEYS.language) {
      const value = safeStorageGet(key);
      const normalized = normalizeLanguage(value);

      if (normalized) {
        return normalized;
      }
    }

    const htmlLanguage = normalizeLanguage(
      document.documentElement.lang
    );

    return htmlLanguage || DEFAULT_LANGUAGE;
  }

  function t(key) {
    return (
      LANGUAGE_TEXT[state.language]?.[key] ??
      LANGUAGE_TEXT[DEFAULT_LANGUAGE][key] ??
      key
    );
  }


  /* =======================================================
     6. LANGUAGE UI
  ======================================================= */

  function updateLanguageUI() {
    setHTMLLanguage(state.language);

    const textMap = {
      siteBrand: "siteBrand",

      homeTitle: "homeTitle",
      homeSubtitle: "subtitle",

      featuredEyebrow: "featuredEyebrow",

      readActionTitle: "readTitle",
      readActionDescription: "readDescription",

      listenActionTitle: "listenTitle",
      listenActionDescription: "listenDescription",

      homeFooterMessage: "homeFooter",

      readHeroSubtitle: "subtitle",
      readHeroTitle: "readHero",

      listenHeroSubtitle: "subtitle",
      listenHeroTitle: "listenHero",

      readSurahSelectLabel: "selectSurah",
      listenSurahSelectLabel: "selectListenSurah",

      listenCurrentLabel: "currentListening",
      readFooterMessage: "readFooter"
    };

    Object.entries(textMap).forEach(([id, key]) => {
      setText(getElement(id), t(key));
    });

    const featuredPlay = getElement("featuredPlay");
    if (featuredPlay) {
      featuredPlay.setAttribute("aria-label", t("featuredPlay"));
    }

    const fontDown = getElement("fontDown");
    if (fontDown) {
      fontDown.setAttribute("aria-label", t("fontSmaller"));
      fontDown.title = t("fontSmaller");
    }

    const fontUp = getElement("fontUp");
    if (fontUp) {
      fontUp.setAttribute("aria-label", t("fontLarger"));
      fontUp.title = t("fontLarger");
    }

    const previous = getElement("previousAyah");
    if (previous) {
      previous.setAttribute("aria-label", t("previousAyah"));
      previous.title = t("previousAyah");
    }

    const next = getElement("nextAyah");
    if (next) {
      next.setAttribute("aria-label", t("nextAyah"));
      next.title = t("nextAyah");
    }

    const listenPrevious = getElement("listenPrevious");
    if (listenPrevious) {
      listenPrevious.setAttribute("aria-label", t("previousAyah"));
      listenPrevious.title = t("previousAyah");
    }

    const listenNext = getElement("listenNext");
    if (listenNext) {
      listenNext.setAttribute("aria-label", t("nextAyah"));
      listenNext.title = t("nextAyah");
    }

    updatePlayPauseButton();
    updateSurahOptionLabels();

    renderReadingAyahs();
    renderListeningAyahs();

    updateCurrentListeningAyah();
    updateFeaturedTranslation();
  }

  /*
    Existing site settings may update a language storage key.
    This function also allows the host page to request a change:

      window.IBADAT_QURAN.setLanguage("bn")
      window.IBADAT_QURAN.setLanguage("hi")
      window.IBADAT_QURAN.setLanguage("en")
  */

  function setLanguage(language) {
    const normalized = normalizeLanguage(language);

    if (!normalized) return;

    state.language = normalized;

    updateLanguageUI();

    if (state.surahs.length) {
      loadReadingSurah(state.currentSurah);
      loadListeningSurah(state.currentSurah);
    }

    if (state.featuredAudioPlaying) {
      stopFeaturedAudio();
    }

    safeStorageSet("ibadat_language", normalized);
  }


  /* =======================================================
     7. API REQUEST HELPER
  ======================================================= */

  async function apiGet(path, options = {}) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT);

    try {
      const response = await fetch(`${API_BASE}${path}`, {
        method: "GET",
        cache: "default",
        signal: options.signal || controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();

      if (
        json.status &&
        json.status !== "OK"
      ) {
        throw new Error(json.status);
      }

      return json.data;
    } finally {
      clearTimeout(timeout);
    }
  }

  async function apiGetWithFallback(paths) {
    let lastError = null;

    for (const path of paths) {
      try {
        return await apiGet(path);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("API request failed");
  }


  /* =======================================================
     8. NUMBERS AND FORMATTING
  ======================================================= */

  function toLocalizedNumber(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return String(value ?? "");
    }

    const localeMap = {
      bn: "bn-BD",
      hi: "hi-IN",
      en: "en-US"
    };

    return new Intl.NumberFormat(
      localeMap[state.language] || "bn-BD"
    ).format(number);
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      seconds = 0;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return (
      `${toLocalizedNumber(minutes)}:` +
      `${toLocalizedNumber(remainingSeconds).padStart(2, "0")}`
    );
  }

  function getSurahName(surah) {
    if (!surah) return "";

    if (state.language === "bn") {
      return surah.nameBn || surah.englishName;
    }

    if (state.language === "hi") {
      return surah.nameHi || surah.englishName;
    }

    return surah.englishName || surah.name;
  }

  function getSurahMeta(surah) {
    if (!surah) return "";

    const type =
      surah.revelationType === "Meccan"
        ? t("meccan")
        : t("medinan");

    return (
      `${t("surahNumber")} ${toLocalizedNumber(surah.number)}` +
      ` • ${toLocalizedNumber(surah.numberOfAyahs)} ${t("ayah")}` +
      ` • ${type}`
    );
  }

  function getTranslation(ayah) {
    if (!ayah) return t("noTranslation");

    const key = `${state.language}:${ayah.number}`;

    const cached = state.translations.get(key);

    if (cached) return cached;

    const value =
      ayah.translation ||
      ayah.translations?.[state.language] ||
      "";

    return value || t("noTranslation");
  }

  function getAudioUrl(ayah) {
    if (!ayah) return "";

    if (ayah.audio) {
      return ayah.audio;
    }

    if (ayah.audioUrl) {
      return ayah.audioUrl;
    }

    return "";
  }


  /* =======================================================
     9. SURAH DATA
  ======================================================= */

  async function loadSurahMetadata() {
    if (state.isLoadingSurahs) return;

    state.isLoadingSurahs = true;

    try {
      const [arabicSurahs, bnSurahs, hiSurahs] =
        await Promise.all([
          apiGet("/surah"),
          apiGet("/surah").catch(() => null),
          apiGet("/surah").catch(() => null)
        ]);

      const bnNames = {
        1: "আল-ফাতিহা",
        2: "আল-বাকারা",
        3: "আলে ইমরান",
        4: "আন-নিসা",
        5: "আল-মায়িদা",
        6: "আল-আনআম",
        7: "আল-আরাফ",
        8: "আল-আনফাল",
        9: "আত-তাওবা",
        10: "ইউনুস",
        11: "হুদ",
        12: "ইউসুফ",
        13: "আর-রাদ",
        14: "ইবরাহিম",
        15: "আল-হিজর",
        16: "আন-নাহল",
        17: "বনি ইসরাইল",
        18: "আল-কাহফ",
        19: "মারইয়াম",
        20: "ত্ব-হা",
        21: "আল-আম্বিয়া",
        22: "আল-হজ্জ",
        23: "আল-মুমিনুন",
        24: "আন-নূর",
        25: "আল-ফুরকান",
        26: "আশ-শুআরা",
        27: "আন-নামল",
        28: "আল-কাসাস",
        29: "আল-আনকাবুত",
        30: "আর-রূম",
        31: "লুকমান",
        32: "আস-সাজদা",
        33: "আল-আহযাব",
        34: "সাবা",
        35: "ফাতির",
        36: "ইয়াসিন",
        37: "আস-সাফফাত",
        38: "সোয়াদ",
        39: "আয-যুমার",
        40: "গাফির",
        41: "ফুসসিলাত",
        42: "আশ-শূরা",
        43: "আয-যুখরুফ",
        44: "আদ-দুখান",
        45: "আল-জাসিয়া",
        46: "আল-আহকাফ",
        47: "মুহাম্মদ",
        48: "আল-ফাতহ",
        49: "আল-হুজুরাত",
        50: "কাফ",
        51: "আয-যারিয়াত",
        52: "আত-তূর",
        53: "আন-নাজম",
        54: "আল-কামার",
        55: "আর-রহমান",
        56: "আল-ওয়াকিয়া",
        57: "আল-হাদিদ",
        58: "আল-মুজাদালা",
        59: "আল-হাশর",
        60: "আল-মুমতাহিনা",
        61: "আস-সাফ",
        62: "আল-জুমুআ",
        63: "আল-মুনাফিকুন",
        64: "আত-তাগাবুন",
        65: "আত-তালাক",
        66: "আত-তাহরিম",
        67: "আল-মুলক",
        68: "আল-কলম",
        69: "আল-হাক্কাহ",
        70: "আল-মাআরিজ",
        71: "নূহ",
        72: "আল-জিন",
        73: "আল-মুযযাম্মিল",
        74: "আল-মুদ্দাসসির",
        75: "আল-কিয়ামাহ",
        76: "আল-ইনসান",
        77: "আল-মুরসালাত",
        78: "আন-নাবা",
        79: "আন-নাযিআত",
        80: "আবাসা",
        81: "আত-তাকভির",
        82: "আল-ইনফিতার",
        83: "আল-মুতাফফিফিন",
        84: "আল-ইনশিকাক",
        85: "আল-বুরুজ",
        86: "আত-তারিক",
        87: "আল-আলা",
        88: "আল-গাশিয়া",
        89: "আল-ফজর",
        90: "আল-বালাদ",
        91: "আশ-শামস",
        92: "আল-লাইল",
        93: "আদ-দুহা",
        94: "আশ-শারহ",
        95: "আত-তিন",
        96: "আল-আলাক",
        97: "আল-কদর",
        98: "আল-বাইয়্যিনাহ",
        99: "আয-যিলযাল",
        100: "আল-আদিয়াত",
        101: "আল-কারিয়া",
        102: "আত-তাকাসুর",
        103: "আল-আসর",
        104: "আল-হুমাযা",
        105: "আল-ফিল",
        106: "কুরাইশ",
        107: "আল-মাউন",
        108: "আল-কাওসার",
        109: "আল-কাফিরুন",
        110: "আন-নাসর",
        111: "আল-মাসাদ",
        112: "আল-ইখলাস",
        113: "আল-ফালাক",
        114: "আন-নাস"
      };

      const hiNames = {
        1: "अल-फ़ातिहा",
        2: "अल-बक़रा",
        3: "आले इमरान",
        4: "अन-निसा",
        5: "अल-माइदा",
        6: "अल-अनआम",
        7: "अल-आराफ़",
        8: "अल-अनफ़ाल",
        9: "अत-तौबा",
        10: "यूनुस",
        18: "अल-कहफ़",
        36: "या-सीन",
        55: "अर-रहमान",
        67: "अल-मुल्क",
        112: "अल-इख़लास",
        113: "अल-फ़लक़",
        114: "अन-नास"
      };

      const bnData = bnSurahs?.surahs || bnSurahs;
      const hiData = hiSurahs?.surahs || hiSurahs;

      state.surahs = (arabicSurahs || []).map((surah) => {
        const bn = Array.isArray(bnData)
          ? bnData.find((item) => item.number === surah.number)
          : null;

        const hi = Array.isArray(hiData)
          ? hiData.find((item) => item.number === surah.number)
          : null;

        return {
          ...surah,

          nameBn:
            bnNames[surah.number] ||
            bn?.englishName ||
            surah.englishName,

          nameHi:
            hiNames[surah.number] ||
            hi?.englishName ||
            surah.englishName
        };
      });

      renderSurahSelects();

      if (!state.surahs.length) {
        throw new Error("Empty surah list");
      }

    } catch (error) {
      console.error("Surah list error:", error);
      showToast(t("loadError"));
    } finally {
      state.isLoadingSurahs = false;
    }
  }


  /* =======================================================
     10. SURAH SELECTS
  ======================================================= */

  function renderSurahSelects() {
    const readSelect = getElement("readSurahSelect");
    const listenSelect = getElement("listenSurahList");

    [readSelect, listenSelect].forEach((select) => {
      if (!select) return;

      const previousValue = Number(select.value) || state.currentSurah;

      select.innerHTML = "";

      state.surahs.forEach((surah) => {
        const option = document.createElement("option");

        option.value = String(surah.number);

        option.textContent =
          `${toLocalizedNumber(surah.number)}. ${getSurahName(surah)}`;

        select.appendChild(option);
      });

      const selected = state.surahs.some(
        (surah) => surah.number === previousValue
      );

      select.value = String(
        selected ? previousValue : DEFAULT_SURAH
      );
    });

    updateSurahOptionLabels();
  }

  function updateSurahOptionLabels() {
    [getElement("readSurahSelect"), getElement("listenSurahList")]
      .forEach((select) => {
        if (!select || !state.surahs.length) return;

        Array.from(select.options).forEach((option) => {
          const surah = state.surahs.find(
            (item) => item.number === Number(option.value)
          );

          if (!surah) return;

          option.textContent =
            `${toLocalizedNumber(surah.number)}. ${getSurahName(surah)}`;
        });
      });
  }


  /* =======================================================
     11. SURAH AND AYAH FETCHING
  ======================================================= */

  async function loadSurahBundle(surahNumber, language) {
    const translationEdition = EDITIONS[language] || EDITIONS.bn;

    const data = await apiGetWithFallback([
      `/surah/${surahNumber}/editions/${EDITIONS.arabic},${translationEdition}`,
      `/surah/${surahNumber}/editions/${EDITIONS.arabic}`
    ]);

    const editions = Array.isArray(data) ? data : [data];

    const arabicEdition = editions.find(
      (edition) =>
        edition.edition?.identifier === EDITIONS.arabic ||
        edition.ayahs?.some((ayah) => ayah.text && ayah.numberInSurah)
    );

    const translationEditionData = editions.find(
      (edition) =>
        edition.edition?.identifier === translationEdition
    );

    if (!arabicEdition?.ayahs?.length) {
      throw new Error("Arabic ayahs unavailable");
    }

    const translationAyahs = translationEditionData?.ayahs || [];

    return arabicEdition.ayahs.map((ayah, index) => ({
      ...ayah,

      translation:
        translationAyahs[index]?.text ||
        "",

      audio: ""
    }));
  }

  async function loadAudioEdition(surahNumber) {
    const data = await apiGet(
      `/surah/${surahNumber}/${EDITIONS.audio}`
    );

    return data?.ayahs || [];
  }

  async function loadSurahForLanguage(surahNumber, language) {
    const cacheKey = `${surahNumber}:${language}`;

    if (state.surahDetails.has(cacheKey)) {
      return state.surahDetails.get(cacheKey);
    }

    const bundle = await loadSurahBundle(surahNumber, language);

    state.surahDetails.set(cacheKey, bundle);

    return bundle;
  }


  /* =======================================================
     12. READING PAGE
  ======================================================= */

  async function loadReadingSurah(surahNumber) {
    const requestId = ++state.readingRequestId;

    state.currentSurah = Number(surahNumber) || DEFAULT_SURAH;

    state.isLoadingReading = true;

    setText(getElement("readMessage"), t("loadingAyahs"));

    const list = getElement("readAyahList");

    if (list) {
      list.setAttribute("aria-busy", "true");
    }

    try {
      const ayahs = await loadSurahForLanguage(
        state.currentSurah,
        state.language
      );

      if (requestId !== state.readingRequestId) return;

      state.readingAyahs = ayahs;

      const surah = state.surahs.find(
        (item) => item.number === state.currentSurah
      );

      setText(
        getElement("readSurahTitle"),
        getSurahName(surah) || `${t("surah")} ${state.currentSurah}`
      );

      setText(
        getElement("readSurahMeta"),
        getSurahMeta(surah)
      );

      if (getElement("readSurahSelect")) {
        getElement("readSurahSelect").value =
          String(state.currentSurah);
      }

      renderReadingAyahs();
      updateReadingNavigation();
      saveReadingPosition();

      setText(getElement("readMessage"), "");

    } catch (error) {
      if (requestId !== state.readingRequestId) return;

      console.error("Reading load error:", error);

      setText(getElement("readMessage"), t("loadError"));

    } finally {
      if (requestId === state.readingRequestId) {
        state.isLoadingReading = false;

        if (list) {
          list.setAttribute("aria-busy", "false");
        }
      }
    }
  }

  function renderReadingAyahs() {
    const list = getElement("readAyahList");

    if (!list) return;

    if (!state.readingAyahs.length) {
      if (!state.isLoadingReading) {
        list.innerHTML = "";
      }
      return;
    }

    list.innerHTML = state.readingAyahs.map((ayah) => {
      const translation = getTranslation(ayah);

      return `
        <article
          class="ayah-card"
          data-ayah-number="${ayah.numberInSurah}"
        >
          <div class="ayah-card-top">
            <span class="ayah-number">
              ${escapeHTML(toLocalizedNumber(ayah.numberInSurah))}
            </span>

            <button
              class="ayah-play"
              type="button"
              data-ayah-play="${ayah.numberInSurah}"
              aria-label="${escapeHTML(t("play"))}"
              title="${escapeHTML(t("play"))}"
            >
              <span aria-hidden="true">▶</span>
            </button>
          </div>

          <p class="ayah-arabic" lang="ar" dir="rtl">
            ${escapeHTML(ayah.text)}
          </p>

          <p class="ayah-translation">
            ${escapeHTML(translation)}
          </p>
        </article>
      `;
    }).join("");

    highlightCurrentAyah();
  }

  function updateReadingNavigation() {
    const previous = getElement("previousAyah");
    const next = getElement("nextAyah");

    const total = state.readingAyahs.length;

    if (previous) {
      previous.disabled = state.currentAyah <= 1;
    }

    if (next) {
      next.disabled = total > 0 && state.currentAyah >= total;
    }
  }

  function highlightCurrentAyah() {
    $$(".ayah-card", getElement("readAyahList") || document)
      .forEach((card) => {
        const isCurrent =
          Number(card.dataset.ayahNumber) === state.currentAyah;

        card.classList.toggle("current-ayah", isCurrent);
      });
  }

  function goToReadingAyah(ayahNumber) {
    const total = state.readingAyahs.length;

    if (!total) return;

    const target = Math.min(
      Math.max(Number(ayahNumber) || 1, 1),
      total
    );

    state.currentAyah = target;

    highlightCurrentAyah();
    updateReadingNavigation();
    saveReadingPosition();

    const card = $(
      `[data-ayah-number="${target}"]`,
      getElement("readAyahList") || document
    );

    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }


  /* =======================================================
     13. LISTENING PAGE
  ======================================================= */

  async function loadListeningSurah(surahNumber) {
    const requestId = ++state.listeningRequestId;

    state.currentSurah = Number(surahNumber) || DEFAULT_SURAH;

    state.isLoadingListening = true;

    setText(getElement("listenMessage"), t("loadingAyahs"));
    setText(getElement("listenAudioStatus"), t("loadingAudio"));

    const list = getElement("listenAyahList");

    if (list) {
      list.setAttribute("aria-busy", "true");
    }

    try {
      const [ayahs, audioAyahs] = await Promise.all([
        loadSurahForLanguage(
          state.currentSurah,
          state.language
        ),

        loadAudioEdition(state.currentSurah)
      ]);

      if (requestId !== state.listeningRequestId) return;

      const audioByNumber = new Map(
        audioAyahs.map((ayah) => [
          ayah.numberInSurah,
          ayah.audio
        ])
      );

      state.listeningAyahs = ayahs.map((ayah) => ({
        ...ayah,
        audio: audioByNumber.get(ayah.numberInSurah) || ""
      }));

      const surah = state.surahs.find(
        (item) => item.number === state.currentSurah
      );

      setText(
        getElement("listenSurahTitle"),
        getSurahName(surah) || `${t("surah")} ${state.currentSurah}`
      );

      setText(
        getElement("listenSurahCount"),
        getSurahMeta(surah)
      );

      if (getElement("listenSurahList")) {
        getElement("listenSurahList").value =
          String(state.currentSurah);
      }

      const savedAyah = getSavedPosition();

      if (
        savedAyah &&
        savedAyah.surah === state.currentSurah
      ) {
        state.currentAyah = Math.min(
          savedAyah.ayah,
          state.listeningAyahs.length
        );
      } else {
        state.currentAyah = 1;
      }

      renderListeningAyahs();
      updateCurrentListeningAyah();
      updatePlayPauseButton();

      setText(getElement("listenMessage"), "");
      setText(getElement("listenAudioStatus"), t("audioReady"));

    } catch (error) {
      if (requestId !== state.listeningRequestId) return;

      console.error("Listening load error:", error);

      setText(getElement("listenMessage"), t("loadError"));
      setText(getElement("listenAudioStatus"), t("audioError"));

    } finally {
      if (requestId === state.listeningRequestId) {
        state.isLoadingListening = false;

        if (list) {
          list.setAttribute("aria-busy", "false");
        }
      }
    }
  }

  function renderListeningAyahs() {
    const list = getElement("listenAyahList");

    if (!list) return;

    if (!state.listeningAyahs.length) {
      if (!state.isLoadingListening) {
        list.innerHTML = "";
      }
      return;
    }

    list.innerHTML = state.listeningAyahs.map((ayah) => {
      return `
        <article
          class="ayah-card listen-ayah-card"
          data-listen-ayah-number="${ayah.numberInSurah}"
        >
          <div class="ayah-card-top">
            <span class="ayah-number">
              ${escapeHTML(toLocalizedNumber(ayah.numberInSurah))}
            </span>

            <button
              class="ayah-play"
              type="button"
              data-listen-ayah-play="${ayah.numberInSurah}"
              aria-label="${escapeHTML(t("play"))}"
              title="${escapeHTML(t("play"))}"
            >
              <span aria-hidden="true">▶</span>
            </button>
          </div>

          <p class="ayah-arabic" lang="ar" dir="rtl">
            ${escapeHTML(ayah.text)}
          </p>

          <p class="ayah-translation">
            ${escapeHTML(getTranslation(ayah))}
          </p>
        </article>
      `;
    }).join("");

    highlightListeningAyah();
  }

  function updateCurrentListeningAyah() {
    const ayah = state.listeningAyahs.find(
      (item) => item.numberInSurah === state.currentAyah
    );

    if (!ayah) {
      setText(getElement("listenCurrentArabic"), "");
      setText(getElement("listenCurrentTranslation"), "");
      return;
    }

    setText(getElement("listenCurrentArabic"), ayah.text);

    setText(
      getElement("listenCurrentTranslation"),
      getTranslation(ayah)
    );

    highlightListeningAyah();
    saveReadingPosition();
  }

  function highlightListeningAyah() {
    $$(".listen-ayah-card", getElement("listenAyahList") || document)
      .forEach((card) => {
        const isCurrent =
          Number(card.dataset.listenAyahNumber) === state.currentAyah;

        card.classList.toggle("current-ayah", isCurrent);
      });
  }

  function goToListeningAyah(ayahNumber) {
    const total = state.listeningAyahs.length;

    if (!total) return;

    const target = Math.min(
      Math.max(Number(ayahNumber) || 1, 1),
      total
    );

    state.currentAyah = target;

    updateCurrentListeningAyah();
    updatePlayPauseButton();

    const card = $(
      `[data-listen-ayah-number="${target}"]`,
      getElement("listenAyahList") || document
    );

    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }


  /* =======================================================
     14. AUDIO ELEMENT
  ======================================================= */

  function initAudio() {
    const audio = getElement("quranAudio");

    if (!audio) {
      console.error("Missing #quranAudio element.");
      return;
    }

    state.audioElement = audio;

    audio.preload = "none";

    audio.addEventListener("play", () => {
      if (state.audioMode === "featured") {
        state.featuredAudioPlaying = true;
        updateFeaturedPlayButton();
      } else {
        updatePlayPauseButton();
        setText(getElement("listenAudioStatus"), t("audioPlaying"));
      }
    });

    audio.addEventListener("pause", () => {
      if (state.audioMode === "featured") {
        state.featuredAudioPlaying = false;
        updateFeaturedPlayButton();
      } else {
        updatePlayPauseButton();

        if (!audio.ended) {
          setText(getElement("listenAudioStatus"), t("audioPaused"));
        }
      }
    });

    audio.addEventListener("ended", () => {
      if (state.audioMode === "featured") {
        state.featuredAudioPlaying = false;
        updateFeaturedPlayButton();
        return;
      }

      const total = state.listeningAyahs.length;

      if (state.currentAyah < total) {
        state.currentAyah += 1;

        updateCurrentListeningAyah();
        playCurrentAyah();
      } else {
        updatePlayPauseButton();
        setText(getElement("listenAudioStatus"), t("audioEnded"));
      }
    });

    audio.addEventListener("timeupdate", updateAudioProgress);
    audio.addEventListener("durationchange", updateAudioProgress);

    audio.addEventListener("error", () => {
      updatePlayPauseButton();

      if (state.audioMode === "featured") {
        setText(getElement("featuredAudioStatus"), t("audioError"));
      } else {
        setText(getElement("listenAudioStatus"), t("audioError"));
      }
    });

    audio.addEventListener("loadedmetadata", () => {
      updateAudioProgress();

      if (state.audioSeekPending !== null) {
        const seekTo = state.audioSeekPending;
        state.audioSeekPending = null;

        audio.currentTime = seekTo;
      }
    });
  }

  function updateAudioProgress() {
    const audio = state.audioElement;

    if (!audio) return;

    const currentTime = audio.currentTime || 0;
    const duration = audio.duration || 0;

    setText(getElement("listenCurrentTime"), formatTime(currentTime));
    setText(getElement("listenDuration"), formatTime(duration));

    const progress = getElement("listenProgress");

    if (progress) {
      progress.value =
        duration > 0
          ? String((currentTime / duration) * 100)
          : "0";
    }
  }

  function updatePlayPauseButton() {
    const button = getElement("listenPlayPause");
    const icon = getElement("listenPlayIcon");

    if (!button || !icon) return;

    const playing =
      state.audioMode === "listen" &&
      state.audioElement &&
      !state.audioElement.paused &&
      !state.audioElement.ended;

    /*
      The symbol alone changes.
      No circle or extra border is inserted into the button.
    */
    icon.textContent = playing ? "Ⅱ" : "▶";

    button.setAttribute(
      "aria-label",
      playing ? t("pause") : t("play")
    );

    button.title = playing ? t("pause") : t("play");
  }

  function updateFeaturedPlayButton() {
    const icon = getElement("featuredPlayIcon");
    const button = getElement("featuredPlay");

    if (icon) {
      icon.textContent = state.featuredAudioPlaying ? "Ⅱ" : "▶";
    }

    if (button) {
      button.setAttribute(
        "aria-label",
        t("featuredPlay")
      );
    }
  }


  /* =======================================================
     15. PLAY / PAUSE CURRENT AYAH
  ======================================================= */

  async function playCurrentAyah() {
    const audio = state.audioElement;

    if (!audio) return;

    const ayah = state.listeningAyahs.find(
      (item) => item.numberInSurah === state.currentAyah
    );

    if (!ayah) {
      setText(getElement("listenAudioStatus"), t("noAyah"));
      return;
    }

    const audioUrl = getAudioUrl(ayah);

    if (!audioUrl) {
      setText(getElement("listenAudioStatus"), t("audioError"));
      return;
    }

    const requestId = ++state.audioRequestId;

    state.audioMode = "listen";

    try {
      if (!audio.paused) {
        audio.pause();
      }

      audio.src = audioUrl;
      audio.load();

      setText(getElement("listenAudioStatus"), t("loadingAudio"));

      await audio.play();

      if (requestId !== state.audioRequestId) {
        audio.pause();
        return;
      }

      updatePlayPauseButton();
      setText(getElement("listenAudioStatus"), t("audioPlaying"));

    } catch (error) {
      if (requestId !== state.audioRequestId) return;

      console.error("Audio playback error:", error);

      updatePlayPauseButton();
      setText(getElement("listenAudioStatus"), t("audioError"));
    }
  }

  async function toggleListenPlayPause() {
    const audio = state.audioElement;

    if (!audio) return;

    if (
      state.audioMode === "listen" &&
      !audio.paused &&
      !audio.ended
    ) {
      audio.pause();
      return;
    }

    if (
      state.audioMode === "listen" &&
      audio.paused &&
      audio.src &&
      audio.readyState > 0
    ) {
      try {
        await audio.play();
        return;
      } catch {
        // If resuming fails, attempt to load the current ayah again.
      }
    }

    await playCurrentAyah();
  }

  function stopListeningAudio() {
    if (!state.audioElement) return;

    state.audioRequestId += 1;

    state.audioElement.pause();

    updatePlayPauseButton();
  }

  function nextListeningAyah() {
    const total = state.listeningAyahs.length;

    if (!total) return;

    if (state.currentAyah >= total) {
      setText(getElement("listenAudioStatus"), t("lastAyah"));
      return;
    }

    state.currentAyah += 1;

    updateCurrentListeningAyah();
    playCurrentAyah();
  }

  function previousListeningAyah() {
    if (!state.listeningAyahs.length) return;

    if (state.currentAyah <= 1) {
      setText(getElement("listenAudioStatus"), t("firstAyah"));
      return;
    }

    state.currentAyah -= 1;

    updateCurrentListeningAyah();
    playCurrentAyah();
  }


  /* =======================================================
     16. FEATURED AYAH AUDIO
  ======================================================= */

  async function playFeaturedAyah() {
    const audio = state.audioElement;

    if (!audio) return;

    const requestId = ++state.audioRequestId;

    try {
      state.audioMode = "featured";

      if (!audio.paused) {
        audio.pause();
      }

      const surahNumber = 1;
      const ayahNumber = 1;

      const audioAyahs = await loadAudioEdition(surahNumber);

      if (requestId !== state.audioRequestId) return;

      const ayah = audioAyahs.find(
        (item) => item.numberInSurah === ayahNumber
      );

      if (!ayah?.audio) {
        throw new Error("Featured audio not found");
      }

      audio.src = ayah.audio;
      audio.load();

      setText(
        getElement("featuredAudioStatus"),
        t("loadingAudio")
      );

      await audio.play();

      if (requestId !== state.audioRequestId) {
        audio.pause();
        return;
      }

      state.featuredAudioPlaying = true;

      updateFeaturedPlayButton();

      setText(
        getElement("featuredAudioStatus"),
        t("audioPlaying")
      );

    } catch (error) {
      if (requestId !== state.audioRequestId) return;

      console.error("Featured audio error:", error);

      state.featuredAudioPlaying = false;

      updateFeaturedPlayButton();

      setText(
        getElement("featuredAudioStatus"),
        t("audioError")
      );
    }
  }

  function stopFeaturedAudio() {
    const audio = state.audioElement;

    if (!audio || state.audioMode !== "featured") return;

    state.audioRequestId += 1;

    audio.pause();

    state.featuredAudioPlaying = false;
    state.audioMode = "listen";

    updateFeaturedPlayButton();
  }

  async function toggleFeaturedAudio() {
    const audio = state.audioElement;

    if (!audio) return;

    if (
      state.audioMode === "featured" &&
      !audio.paused &&
      !audio.ended
    ) {
      audio.pause();
      return;
    }

    if (
      state.audioMode === "featured" &&
      audio.paused &&
      audio.src
    ) {
      try {
        await audio.play();
        return;
      } catch {
        // Retry loading featured audio below.
      }
    }

    await playFeaturedAyah();
  }

  function updateFeaturedTranslation() {
    const arabic = getElement("featuredArabic");
    const translation = getElement("featuredTranslation");
    const transliteration = getElement("featuredTranslit");

    if (!arabic || !translation) return;

    /*
      The featured Arabic is intentionally left in Arabic.
      The translation changes with the selected language.
    */

    const translations = {
      bn: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",
      hi: "अल्लाह के नाम से, जो अत्यंत कृपाशील, अत्यंत दयावान है।",
      en: "In the name of Allah, the Most Compassionate, the Most Merciful."
    };

    setText(translation, translations[state.language]);

    if (transliteration) {
      const transliterations = {
        bn: "বিসমিল্লাহির রাহমানির রাহিম",
        hi: "बिस्मिल्लाहिर्रहमानिर्रहीम",
        en: "Bismillahir-Rahmanir-Raheem"
      };

      setText(transliteration, transliterations[state.language]);
    }
  }


  /* =======================================================
     17. SAVED READING POSITION
  ======================================================= */

  function getSavedPosition() {
    const raw = safeStorageGet(STORAGE_KEYS.savedPosition);

    if (!raw) return null;

    try {
      const data = JSON.parse(raw);

      const surah = Number(data.surah);
      const ayah = Number(data.ayah);

      if (
        Number.isInteger(surah) &&
        surah >= 1 &&
        surah <= 114 &&
        Number.isInteger(ayah) &&
        ayah >= 1
      ) {
        return { surah, ayah };
      }

      return null;

    } catch {
      return null;
    }
  }

  function saveReadingPosition() {
    safeStorageSet(
      STORAGE_KEYS.savedPosition,
      JSON.stringify({
        surah: state.currentSurah,
        ayah: state.currentAyah
      })
    );
  }

  function restoreSavedPosition() {
    const saved = getSavedPosition();

    if (!saved) return;

    state.savedPosition = saved;

    state.currentSurah = saved.surah;
    state.currentAyah = saved.ayah;
  }


  /* =======================================================
     18. ARABIC FONT SIZE
  ======================================================= */

  function loadArabicFontSize() {
    const stored = Number(
      safeStorageGet(STORAGE_KEYS.arabicSize)
    );

    const size =
      Number.isFinite(stored) &&
      stored >= MIN_ARABIC_SIZE &&
      stored <= MAX_ARABIC_SIZE
        ? stored
        : DEFAULT_ARABIC_SIZE;

    applyArabicFontSize(size);
  }

  function applyArabicFontSize(size) {
    const safeSize = Math.max(
      MIN_ARABIC_SIZE,
      Math.min(MAX_ARABIC_SIZE, Number(size))
    );

    document.documentElement.style.setProperty(
      "--arabic-font-size",
      `${safeSize}px`
    );

    safeStorageSet(
      STORAGE_KEYS.arabicSize,
      String(safeSize)
    );
  }

  function changeArabicFontSize(delta) {
    const current = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--arabic-font-size")
    ) || DEFAULT_ARABIC_SIZE;

    applyArabicFontSize(current + delta);
  }


  /* =======================================================
     19. PAGE NAVIGATION
  ======================================================= */

  function getPageElement(pageName) {
    const ids = {
      home: "homeScreen",
      read: "readScreen",
      listen: "listenScreen"
    };

    return getElement(ids[pageName]);
  }

  function setPageVisibility(pageName) {
    ["home", "read", "listen"].forEach((name) => {
      const element = getPageElement(name);

      if (!element) return;

      const active = name === pageName;

      element.classList.toggle("active", active);
      element.hidden = !active;

      element.setAttribute(
        "aria-hidden",
        active ? "false" : "true"
      );
    });

    state.currentPage = pageName;

    if (pageName === "read") {
      updateReadingNavigation();
    }

    if (pageName === "listen") {
      updatePlayPauseButton();
    }
  }

  function openPage(pageName, options = {}) {
    if (!["home", "read", "listen"].includes(pageName)) {
      return;
    }

    if (pageName === state.currentPage && !options.force) {
      return;
    }

    if (pageName !== "listen") {
      stopListeningAudio();
    }

    if (
      state.audioMode === "featured" &&
      pageName !== "home"
    ) {
      stopFeaturedAudio();
    }

    setPageVisibility(pageName);

    if (pageName === "read") {
      if (
        !state.readingAyahs.length ||
        state.currentSurah !== Number(
          getElement("readSurahSelect")?.value || state.currentSurah
        )
      ) {
        loadReadingSurah(
          Number(getElement("readSurahSelect")?.value) ||
          state.currentSurah
        );
      }
    }

    if (pageName === "listen") {
      const selectedSurah =
        Number(getElement("listenSurahList")?.value) ||
        state.currentSurah;

      if (
        !state.listeningAyahs.length ||
        state.currentSurah !== selectedSurah
      ) {
        loadListeningSurah(selectedSurah);
      }
    }

    if (!options.fromPopState) {
      const hash = {
        home: "#quran-home",
        read: "#quran-read",
        listen: "#quran-listen"
      }[pageName];

      try {
        history.pushState(
          {
            ibadatQuran: true,
            page: pageName
          },
          "",
          hash
        );
      } catch (error) {
        console.warn("History navigation unavailable:", error);
      }
    }
  }

  function handlePopState(event) {
    const destination = event.state;

    if (
      destination &&
      destination.ibadatQuran &&
      ["home", "read", "listen"].includes(destination.page)
    ) {
      openPage(destination.page, {
        fromPopState: true,
        force: true
      });

      return;
    }

    /*
      The browser / host app handles Back if the destination
      is outside this Quran page. Do not force the user to home.
    */

    setPageVisibility("home");
  }

  function initHistoryNavigation() {
    /*
      Preserve the host page's history entry.
      Add one Quran-home marker only when no Quran marker exists.
      Opening read/listen creates their own history entries.
    */

    const currentState = history.state;

    if (
      !currentState ||
      !currentState.ibadatQuran
    ) {
      try {
        history.replaceState(
          {
            ibadatQuran: true,
            page: "home"
          },
          "",
          location.href
        );
      } catch (error) {
        console.warn("Unable to initialize history state:", error);
      }
    }

    window.addEventListener("popstate", handlePopState);
  }


  /* =======================================================
     20. TOAST
  ======================================================= */

  let toastTimer = null;

  function showToast(message) {
    const toast = getElement("toast");

    if (!toast) return;

    setText(toast, message);

    toast.hidden = false;

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2600);
  }


  /* =======================================================
     21. EVENTS
  ======================================================= */

  function initPageNavigationEvents() {
    const readButton = getElement("openReadPage");
    const listenButton = getElement("openListenPage");

    readButton?.addEventListener("click", () => {
      openPage("read");
    });

    listenButton?.addEventListener("click", () => {
      openPage("listen");
    });
  }

  function initSurahSelectEvents() {
    getElement("readSurahSelect")?.addEventListener("change", (event) => {
      const surah = Number(event.target.value);

      state.currentAyah = 1;

      loadReadingSurah(surah);
    });

    getElement("listenSurahList")?.addEventListener("change", (event) => {
      const surah = Number(event.target.value);

      stopListeningAudio();

      state.currentAyah = 1;

      loadListeningSurah(surah);
    });
  }

  function initReadingEvents() {
    getElement("previousAyah")?.addEventListener("click", () => {
      if (state.currentAyah <= 1) {
        showToast(t("firstAyah"));
        return;
      }

      goToReadingAyah(state.currentAyah - 1);
    });

    getElement("nextAyah")?.addEventListener("click", () => {
      if (state.currentAyah >= state.readingAyahs.length) {
        showToast(t("lastAyah"));
        return;
      }

      goToReadingAyah(state.currentAyah + 1);
    });

    getElement("fontDown")?.addEventListener("click", () => {
      changeArabicFontSize(-2);
    });

    getElement("fontUp")?.addEventListener("click", () => {
      changeArabicFontSize(2);
    });

    getElement("readAyahList")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-ayah-play]");

      if (!button) return;

      const ayahNumber = Number(button.dataset.ayahPlay);

      if (!ayahNumber) return;

      openPage("listen");

      if (
        state.currentSurah !==
        Number(getElement("readSurahSelect")?.value)
      ) {
        state.currentSurah =
          Number(getElement("readSurahSelect")?.value) ||
          DEFAULT_SURAH;
      }

      if (
        !state.listeningAyahs.length ||
        state.listeningAyahs.length !== state.readingAyahs.length
      ) {
        loadListeningSurah(state.currentSurah).then(() => {
          goToListeningAyah(ayahNumber);
          playCurrentAyah();
        });
      } else {
        goToListeningAyah(ayahNumber);
        playCurrentAyah();
      }
    });
  }

  function initListeningEvents() {
    getElement("listenPlayPause")?.addEventListener("click", () => {
      toggleListenPlayPause();
    });

    getElement("listenPrevious")?.addEventListener("click", () => {
      previousListeningAyah();
    });

    getElement("listenNext")?.addEventListener("click", () => {
      nextListeningAyah();
    });

    getElement("listenAyahList")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-listen-ayah-play]");

      if (!button) return;

      const ayahNumber = Number(button.dataset.listenAyahPlay);

      if (!ayahNumber) return;

      goToListeningAyah(ayahNumber);
      playCurrentAyah();
    });

    getElement("listenProgress")?.addEventListener("input", (event) => {
      const audio = state.audioElement;

      if (!audio || !Number.isFinite(audio.duration)) return;

      const percent = Number(event.target.value);

      audio.currentTime = (percent / 100) * audio.duration;
    });
  }

  function initFeaturedAudioEvents() {
    getElement("featuredPlay")?.addEventListener("click", () => {
      toggleFeaturedAudio();
    });
  }


  /* =======================================================
     22. LANGUAGE INTEGRATION
  ======================================================= */

  function initLanguageIntegration() {
    /*
      Host settings can dispatch:
        window.dispatchEvent(
          new CustomEvent("ibadat:languagechange", {
            detail: { language: "hi" }
          })
        );
    */

    window.addEventListener("ibadat:languagechange", (event) => {
      const language =
        event.detail?.language ||
        event.detail?.lang;

      setLanguage(language);
    });

    window.addEventListener("storage", (event) => {
      if (!STORAGE_KEYS.language.includes(event.key)) return;

      const language = normalizeLanguage(event.newValue);

      if (language && language !== state.language) {
        setLanguage(language);
      }
    });
  }


  /* =======================================================
     23. INITIALIZATION
  ======================================================= */

  async function init() {
    state.language = detectLanguage();

    restoreSavedPosition();

    initAudio();
    loadArabicFontSize();

    updateLanguageUI();

    initPageNavigationEvents();
    initSurahSelectEvents();
    initReadingEvents();
    initListeningEvents();
    initFeaturedAudioEvents();

    initLanguageIntegration();
    initHistoryNavigation();

    setPageVisibility("home");

    await loadSurahMetadata();

    if (state.surahs.length) {
      const saved = getSavedPosition();

      const initialSurah =
        saved?.surah ||
        DEFAULT_SURAH;

      state.currentSurah = initialSurah;
      state.currentAyah = saved?.ayah || 1;

      if (getElement("readSurahSelect")) {
        getElement("readSurahSelect").value =
          String(initialSurah);
      }

      if (getElement("listenSurahList")) {
        getElement("listenSurahList").value =
          String(initialSurah);
      }

      await loadReadingSurah(initialSurah);

      if (saved) {
        state.currentAyah = saved.ayah;

        updateReadingNavigation();
        highlightCurrentAyah();
      }
    }

    updatePlayPauseButton();
    updateFeaturedPlayButton();

    console.info("IBADAT Quran initialized.");
  }


  /* =======================================================
     24. PUBLIC API FOR HOST SETTINGS
  ======================================================= */

  window.IBADAT_QURAN = {
    setLanguage,

    openPage,

    getState() {
      return {
        language: state.language,
        currentPage: state.currentPage,
        currentSurah: state.currentSurah,
        currentAyah: state.currentAyah
      };
    }
  };


  /* =======================================================
     25. START
  ======================================================= */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }

})();
