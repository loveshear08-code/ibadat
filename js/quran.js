
(() => {
  "use strict";

  const API = "https://api.alquran.cloud/v1";

  const EDITIONS = {
    arabic: "quran-uthmani",
    audio: "ar.alafasy",
    translation: {
      bn: "bn.bengali",
      hi: "hi.hindi",
      en: "en.sahih"
    }
  };

  const LANGUAGE_KEYS = [
    "ibadat_language",
    "siteLanguage",
    "selectedLanguage",
    "preferredLanguage",
    "language",
    "lang"
  ];

  const THEME_KEYS = [
    "ibadat_theme",
    "siteTheme",
    "selectedTheme",
    "theme",
    "appearance"
  ];

  const LANGUAGE_ALIASES = {
    bn: "bn",
    bn_bd: "bn",
    bn_in: "bn",
    bengali: "bn",
    bangla: "bn",
    বাংলা: "bn",

    hi: "hi",
    hi_in: "hi",
    hindi: "hi",
    हिन्दी: "hi",
    हिंदी: "hi",

    en: "en",
    en_us: "en",
    en_gb: "en",
    english: "en",
    ইংরেজি: "en"
  };

  const SURAH_NAMES = {
    bn: [
      "আল-ফাতিহা", "আল-বাকারা", "আলে ইমরান", "আন-নিসা",
      "আল-মায়িদা", "আল-আনআম", "আল-আরাফ", "আল-আনফাল",
      "আত-তাওবা", "ইউনুস", "হুদ", "ইউসুফ",
      "আর-রাদ", "ইবরাহিম", "আল-হিজর", "আন-নাহল",
      "আল-ইসরা", "আল-কাহফ", "মারইয়াম", "ত্বা-হা",
      "আল-আম্বিয়া", "আল-হজ্জ", "আল-মুমিনুন", "আন-নূর",
      "আল-ফুরকান", "আশ-শুআরা", "আন-নামল", "আল-কাসাস",
      "আল-আনকাবুত", "আর-রূম", "লুকমান", "আস-সাজদা",
      "আল-আহযাব", "সাবা", "ফাতির", "ইয়াসিন",
      "আস-সাফফাত", "সোয়াদ", "আয-যুমার", "গাফির",
      "ফুসসিলাত", "আশ-শূরা", "আয-যুখরুফ", "আদ-দুখান",
      "আল-জাসিয়া", "আল-আহকাফ", "মুহাম্মদ", "আল-ফাতহ",
      "আল-হুজুরাত", "কাফ", "আয-যারিয়াত", "আত-তূর",
      "আন-নাজম", "আল-কামার", "আর-রহমান", "আল-ওয়াকিয়া",
      "আল-হাদিদ", "আল-মুজাদিলা", "আল-হাশর", "আল-মুমতাহিনা",
      "আস-সাফ", "আল-জুমুআ", "আল-মুনাফিকুন", "আত-তাগাবুন",
      "আত-তালাক", "আত-তাহরিম", "আল-মুলক", "আল-কলম",
      "আল-হাক্কাহ", "আল-মাআরিজ", "নূহ", "আল-জিন",
      "আল-মুযযাম্মিল", "আল-মুদ্দাসসির", "আল-কিয়ামাহ", "আল-ইনসান",
      "আল-মুরসালাত", "আন-নাবা", "আন-নাযিয়াত", "আবাসা",
      "আত-তাকভির", "আল-ইনফিতার", "আল-মুতাফফিফিন", "আল-ইনশিকাক",
      "আল-বুরুজ", "আত-তারিক", "আল-আলা", "আল-গাশিয়াহ",
      "আল-ফজর", "আল-বালাদ", "আশ-শামস", "আল-লাইল",
      "আদ-দুহা", "আশ-শারহ", "আত-তিন", "আল-আলাক",
      "আল-কদর", "আল-বাইয়িনাহ", "আয-যিলযাল", "আল-আদিয়াত",
      "আল-কারিআহ", "আত-তাকাসুর", "আল-আসর", "আল-হুমাযাহ",
      "আল-ফিল", "কুরাইশ", "আল-মাউন", "আল-কাওসার",
      "আল-কাফিরুন", "আন-নাসর", "আল-মাসাদ", "আল-ইখলাস",
      "আল-ফালাক", "আন-নাস"
    ],

    hi: [
      "अल-फ़ातिहा", "अल-बक़रा", "आले इमरान", "अन-निसा",
      "अल-माइदा", "अल-अनआम", "अल-आराफ़", "अल-अनफ़ाल",
      "अत-तौबा", "यूनुस", "हूद", "यूसुफ़",
      "अर-रअद", "इब्राहीम", "अल-हिज्र", "अन-नहल",
      "अल-इसरा", "अल-कहफ़", "मरयम", "ताहा",
      "अल-अंबिया", "अल-हज्ज", "अल-मुमिनून", "अन-नूर",
      "अल-फ़ुरक़ान", "अश-शुअरा", "अन-नम्ल", "अल-क़सस",
      "अल-अनकबूत", "अर-रूम", "लुक़मान", "अस-सज्दा",
      "अल-अहज़ाब", "सबा", "फ़ातिर", "यासीन",
      "अस-साफ़्फ़ात", "साद", "अज़-ज़ुमर", "ग़ाफ़िर",
      "फ़ुस्सिलत", "अश-शूरा", "अज़-ज़ुख़रुफ़", "अद-दुख़ान",
      "अल-जासिया", "अल-अहक़ाफ़", "मुहम्मद", "अल-फ़त्ह",
      "अल-हुजुरात", "क़ाफ़", "अज़-ज़ारियात", "अत-तूर",
      "अन-नज्म", "अल-क़मर", "अर-रहमान", "अल-वाक़िआ",
      "अल-हदीद", "अल-मुजादिला", "अल-हश्र", "अल-मुम्तहिना",
      "अस-सफ़", "अल-जुमुआ", "अल-मुनाफ़िक़ून", "अत-तग़ाबुन",
      "अत-तलाक़", "अत-तहरीम", "अल-मुल्क", "अल-क़लम",
      "अल-हाक़्क़ा", "अल-मआरिज", "नूह", "अल-जिन्न",
      "अल-मुज़्ज़म्मिल", "अल-मुद्दस्सिर", "अल-क़ियामा", "अल-इंसान",
      "अल-मुरसलात", "अन-नबा", "अन-नाज़िआत", "अबसा",
      "अत-तकवीर", "अल-इन्फ़ितार", "अल-मुतफ़्फ़िफ़ीन", "अल-इन्शिक़ाक़",
      "अल-बुरूज", "अत-तारिक़", "अल-अला", "अल-ग़ाशिया",
      "अल-फ़ज्र", "अल-बलद", "अश-शम्स", "अल-लैल",
      "अद-दुहा", "अश-शर्ह", "अत-तीन", "अल-अलक़",
      "अल-क़द्र", "अल-बय्यिना", "अज़-ज़िलज़ाल", "अल-आदियात",
      "अल-क़ारिआ", "अत-तकासुर", "अल-अस्र", "अल-हुमज़ा",
      "अल-फ़ील", "क़ुरैश", "अल-माऊन", "अल-कौसर",
      "अल-काफ़िरून", "अन-नस्र", "अल-मसद", "अल-इख़लास",
      "अल-फ़लक़", "अन-नास"
    ],

    en: [
      "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa",
      "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal",
      "At-Tawbah", "Yunus", "Hud", "Yusuf",
      "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl",
      "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha",
      "Al-Anbya", "Al-Hajj", "Al-Mu'minun", "An-Nur",
      "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas",
      "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah",
      "Al-Ahzab", "Saba", "Fatir", "Ya-Sin",
      "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
      "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan",
      "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath",
      "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur",
      "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah",
      "Al-Hadid", "Al-Mujadilah", "Al-Hashr", "Al-Mumtahanah",
      "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun",
      "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam",
      "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn",
      "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan",
      "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa",
      "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq",
      "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah",
      "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Layl",
      "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-Alaq",
      "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-Adiyat",
      "Al-Qari'ah", "At-Takathur", "Al-Asr", "Al-Humazah",
      "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar",
      "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas",
      "Al-Falaq", "An-Nas"
    ]
  };

  const UI = {
    bn: {
      headingHome: "আল-কুরআন",
      headingRead: "কুরআন পড়ুন",
      headingListen: "তিলাওয়াত শুনুন",
      subtitleHome: "পবিত্র কুরআন শিখি ও বুঝি",
      subtitleRead: "আরবি পাঠ, উচ্চারণ ও অনুবাদ",
      subtitleListen: "সূরা নির্বাচন করে তিলাওয়াত শুনুন",
      featuredKicker: "পবিত্র কুরআন",
      featuredTitle: "বিসমিল্লাহির রাহমানির রাহিম",
      featuredTranslation: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",
      featuredReference: "সূরা ১ · আয়াত ১",
      readOption: "কুরআন পড়ুন",
      readDescription: "আরবি পড়ুন ও অর্থ বুঝুন",
      listenOption: "তিলাওয়াত শুনুন",
      listenDescription: "পবিত্র কুরআনের তিলাওয়াত",
      homeFooter: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",
      readFooter: "শুদ্ধভাবে কুরআন পড়ুন",
      listTitle: "সূরার তালিকা",
      surahCount: "১১৪ সূরা",
      arabicSize: "আরবি লেখার আকার",
      selectSurah: "সূরা নির্বাচন",
      ayahs: "আয়াত",
      makki: "মাক্কী",
      madani: "মাদানী",
      playAyah: "▶ আয়াত শুনুন",
      previous: "আগের আয়াত",
      next: "পরের আয়াত",
      play: "তিলাওয়াত চালু করুন",
      pause: "তিলাওয়াত থামান",
      loading: "লোড হচ্ছে…",
      loadError: "কন্টেন্ট লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      translationError: "এই ভাষার অনুবাদ পাওয়া যায়নি।",
      audioError: "অডিও চালানো যায়নি। আবার চেষ্টা করুন।",
      firstAyah: "এটি প্রথম আয়াত।",
      lastAyah: "কুরআনের শেষ আয়াত।",
      languageChanged: "ভাষা পরিবর্তন হয়েছে।",
      saved: "সংরক্ষিত",
      bookmark: "বুকমার্ক"
    },

    hi: {
      headingHome: "अल-क़ुरआन",
      headingRead: "क़ुरआन पढ़ें",
      headingListen: "तिलावत सुनें",
      subtitleHome: "पवित्र क़ुरआन सीखें और समझें",
      subtitleRead: "अरबी पाठ, उच्चारण और अनुवाद",
      subtitleListen: "सूरह चुनकर तिलावत सुनें",
      featuredKicker: "पवित्र क़ुरआन",
      featuredTitle: "बिस्मिल्लाहिर रहमानिर रहीम",
      featuredTranslation: "अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",
      featuredReference: "सूरह १ · आयत १",
      readOption: "क़ुरआन पढ़ें",
      readDescription: "अरबी पढ़ें और अर्थ समझें",
      listenOption: "तिलावत सुनें",
      listenDescription: "पवित्र क़ुरआन की तिलावत",
      homeFooter: "इबादत • पवित्रता के मार्ग पर सीखना और अभ्यास",
      readFooter: "क़ुरआन सही तरह पढ़ें",
      listTitle: "सूरह सूची",
      surahCount: "११४ सूरह",
      arabicSize: "अरबी अक्षरों का आकार",
      selectSurah: "सूरह चुनें",
      ayahs: "आयतें",
      makki: "मक्की",
      madani: "मदनी",
      playAyah: "▶ आयत सुनें",
      previous: "पिछली आयत",
      next: "अगली आयत",
      play: "तिलावत चलाएँ",
      pause: "तिलावत रोकें",
      loading: "लोड हो रहा है…",
      loadError: "सामग्री लोड नहीं हुई। इंटरनेट जाँचकर फिर कोशिश करें।",
      translationError: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      audioError: "ऑडियो नहीं चला। फिर कोशिश करें।",
      firstAyah: "यह पहली आयत है।",
      lastAyah: "क़ुरआन की अंतिम आयत।",
      languageChanged: "भाषा बदल गई है।",
      saved: "सहेजा गया",
      bookmark: "बुकमार्क"
    },

    en: {
      headingHome: "Al-Quran",
      headingRead: "Read Quran",
      headingListen: "Listen to Recitation",
      subtitleHome: "Learn and understand the Holy Quran",
      subtitleRead: "Arabic text, transliteration and translation",
      subtitleListen: "Choose a surah and listen",
      featuredKicker: "The Holy Quran",
      featuredTitle: "Bismillahir Rahmanir Rahim",
      featuredTranslation: "In the name of Allah, the Most Compassionate, the Most Merciful.",
      featuredReference: "Surah 1 · Ayah 1",
      readOption: "Read Quran",
      readDescription: "Read Arabic and understand the meaning",
      listenOption: "Listen to Recitation",
      listenDescription: "Listen to the Holy Quran",
      homeFooter: "IBADAT • Learn and practise on the path of purity",
      readFooter: "Read the Quran correctly",
      listTitle: "Surah List",
      surahCount: "114 Surahs",
      arabicSize: "Arabic text size",
      selectSurah: "Select a surah",
      ayahs: "ayahs",
      makki: "Makki",
      madani: "Madani",
      playAyah: "▶ Listen to ayah",
      previous: "Previous ayah",
      next: "Next ayah",
      play: "Play recitation",
      pause: "Pause recitation",
      loading: "Loading…",
      loadError: "Content could not be loaded. Check your internet connection and try again.",
      translationError: "Translation in this language is unavailable.",
      audioError: "Audio could not be played. Please try again.",
      firstAyah: "This is the first ayah.",
      lastAyah: "This is the last ayah of the Quran.",
      languageChanged: "Language changed.",
      saved: "Saved",
      bookmark: "Bookmark"
    }
  };

  const state = {
    language: "bn",
    theme: "light",
    page: "home",
    surahs: [],
    readSurah: 1,
    readAyah: 1,
    listenSurah: 1,
    listenAyah: 1,
    arabicSize: 38,
    audioPlaying: false,
    audioToken: 0,
    requestToken: 0,
    pageBeforePop: "home",
    loadingRead: false,
    loadingListen: false,
    translationBySurah: new Map(),
    arabicBySurah: new Map(),
    audioBySurah: new Map(),
    bookmarks: new Set()
  };

  const $ = (id) => document.getElementById(id);

  const el = {
    app: $("quranApp"),
    heading: $("pageHeading"),
    subtitle: $("pageSubtitle"),
    home: $("homeScreen"),
    read: $("readScreen"),
    listen: $("listenScreen"),
    featuredTranslation: $("featuredTranslation"),
    featuredReference: $("featuredReference"),
    readSurahSelect: $("readSurahSelect"),
    readSurahName: $("readSurahName"),
    readSurahMeta: $("readSurahMeta"),
    readAyahList: $("readAyahList"),
    readStatus: $("readStatus"),
    readBoardScroll: $("readBoardScroll"),
    listenBoardScroll: $("listenBoardScroll"),
    listenSurahList: $("listenSurahList"),
    listenStatus: $("listenStatus"),
    audio: $("quranAudio"),
    playIcon: $("listenPlayIcon"),
    playButton: $("listenPlayPause"),
    toast: $("quranToast")
  };

  function normalizeLanguage(value) {
    if (value == null) return null;

    const normalized = String(value)
      .trim()
      .toLowerCase()
      .replace(/-/g, "_");

    if (LANGUAGE_ALIASES[normalized]) {
      return LANGUAGE_ALIASES[normalized];
    }

    if (normalized.startsWith("bn")) return "bn";
    if (normalized.startsWith("hi")) return "hi";
    if (normalized.startsWith("en")) return "en";

    return null;
  }

  function readStoredValue(keys) {
    for (const key of keys) {
      try {
        const value = localStorage.getItem(key);
        if (value !== null && value !== "") return value;
      } catch (_) {
        // Storage may be disabled by the browser.
      }
    }

    return null;
  }

  function detectLanguage() {
    const stored = normalizeLanguage(readStoredValue(LANGUAGE_KEYS));

    if (stored) return stored;

    const htmlLanguage = normalizeLanguage(
      document.documentElement.lang
    );

    if (htmlLanguage) return htmlLanguage;

    const browserLanguage = normalizeLanguage(
      navigator.language || "bn"
    );

    return browserLanguage || "bn";
  }

  function detectTheme() {
    const raw = String(readStoredValue(THEME_KEYS) || "")
      .trim()
      .toLowerCase();

    if (["dark", "night", "black", "ডার্ক"].includes(raw)) {
      return "dark";
    }

    if (["light", "normal", "নরমাল", "লাইট"].includes(raw)) {
      return "light";
    }

    if (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  function t(key) {
    return UI[state.language][key] ??
      UI.en[key] ??
      key;
  }

  function localNumber(number) {
    if (state.language === "bn") {
      return String(number).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);
    }

    if (state.language === "hi") {
      return String(number).replace(/\d/g, d => "०१२३४५६७८९"[Number(d)]);
    }

    return String(number);
  }

  function surahName(surah) {
    if (!surah) return "";

    const names = SURAH_NAMES[state.language] || SURAH_NAMES.en;
    return names[surah.number - 1] || surah.englishName || surah.name;
  }

  function surahLabel(surah) {
    return `${localNumber(surah.number)}. ${surahName(surah)}`;
  }

  function revealToast(message) {
    if (!el.toast) return;

    el.toast.textContent = message;
    el.toast.classList.add("visible");

    window.clearTimeout(revealToast.timer);

    revealToast.timer = window.setTimeout(() => {
      el.toast.classList.remove("visible");
    }, 2600);
  }

  function setStatus(element, message) {
    if (element) element.textContent = message || "";
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.colorScheme =
      state.theme === "dark" ? "dark" : "light";
  }

  function applyLanguage() {
    document.documentElement.lang = state.language;

    const homeHeading = state.page === "home";
    const readHeading = state.page === "read";

    el.heading.textContent = homeHeading
      ? t("headingHome")
      : readHeading
        ? t("headingRead")
        : t("headingListen");

    el.subtitle.textContent = homeHeading
      ? t("subtitleHome")
      : readHeading
        ? t("subtitleRead")
        : t("subtitleListen");

    $("featuredKicker").textContent = t("featuredKicker");
    $("featuredTitle").textContent = t("featuredTitle");
    el.featuredTranslation.textContent = t("featuredTranslation");
    el.featuredReference.textContent = t("featuredReference");

    $("readOptionTitle").textContent = t("readOption");
    $("readOptionDescription").textContent = t("readDescription");
    $("listenOptionTitle").textContent = t("listenOption");
    $("listenOptionDescription").textContent = t("listenDescription");
    $("homeFooterText").textContent = t("homeFooter");

    $("arabicSizeLabel").textContent = t("arabicSize");
    $("surahListTitle").textContent = t("listTitle");
    $("surahCount").textContent = t("surahCount");
    $("readFooterMessage").textContent = t("readFooter");

    $("readPrevious").setAttribute("aria-label", t("previous"));
    $("readNext").setAttribute("aria-label", t("next"));
    $("listenPrevious").setAttribute("aria-label", t("previous"));
    $("listenNext").setAttribute("aria-label", t("next"));
    el.playButton.setAttribute(
      "aria-label",
      state.audioPlaying ? t("pause") : t("play")
    );

    renderSurahSelect();
    renderSurahList();
    renderReadHeading();

    const currentRead = getAyah(
      state.readSurah,
      state.readAyah
    );

    if (currentRead) {
      renderReadAyahs(state.readSurah);
    }
  }

  function showPage(page, options = {}) {
    if (!["home", "read", "listen"].includes(page)) return;

    state.page = page;

    el.home.hidden = page !== "home";
    el.read.hidden = page !== "read";
    el.listen.hidden = page !== "listen";

    el.heading.textContent = page === "home"
      ? t("headingHome")
      : page === "read"
        ? t("headingRead")
        : t("headingListen");

    el.subtitle.textContent = page === "home"
      ? t("subtitleHome")
      : page === "read"
        ? t("subtitleRead")
        : t("subtitleListen");

    document.title = `${el.heading.textContent} | ইবাদত`;

    if (page === "read") {
      renderReadHeading();

      if (!state.arabicBySurah.has(state.readSurah)) {
        loadReadSurah(state.readSurah);
      }
    }

    if (page === "listen") {
      renderSurahList();

      if (!state.arabicBySurah.has(state.listenSurah)) {
        loadListenSurah(state.listenSurah);
      }
    }

    if (options.push !== false) {
      try {
        history.pushState(
          { ibadatQuran: true, page },
          "",
          `#quran-${page}`
        );
      } catch (_) {
        // Page navigation still works without History API.
      }
    }
  }

  async function requestJSON(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "default"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();

    if (json.code && json.code !== 200) {
      throw new Error(json.status || "API request failed");
    }

    return json.data;
  }

  async function loadSurahMetadata() {
    if (state.surahs.length) return state.surahs;

    const data = await requestJSON(`${API}/surah`);

    if (!Array.isArray(data) || data.length !== 114) {
      throw new Error("Surah metadata is incomplete");
    }

    state.surahs = data;

    renderSurahSelect();
    renderSurahList();
    renderReadHeading();

    return data;
  }

  function getSurah(number) {
    return state.surahs.find(
      surah => surah.number === Number(number)
    );
  }

  function renderSurahSelect() {
    const select = el.readSurahSelect;
    if (!select) return;

    const previousValue = String(state.readSurah);

    select.replaceChildren();

    for (const surah of state.surahs) {
      const option = document.createElement("option");
      option.value = String(surah.number);
      option.textContent = surahLabel(surah);
      select.appendChild(option);
    }

    select.value = previousValue;
  }

  function renderReadHeading() {
    const surah = getSurah(state.readSurah);
    if (!surah) return;

    el.readSurahName.textContent =
      `${t("selectSurah")}: ${surahName(surah)}`;

    const revelation = surah.revelationType === "Meccan"
      ? t("makki")
      : t("madani");

    el.readSurahMeta.textContent =
      `${localNumber(surah.number)} · ${localNumber(surah.numberOfAyahs)} ${t("ayahs")} · ${revelation}`;

    el.readSurahSelect.value = String(surah.number);
  }

  async function loadSurahContent(surahNumber) {
    const number = Number(surahNumber);

    if (state.arabicBySurah.has(number) &&
        state.translationBySurah.has(number)) {
      return {
        arabic: state.arabicBySurah.get(number),
        translation: state.translationBySurah.get(number)
      };
    }

    const edition = EDITIONS.translation[state.language];

    const results = await Promise.all([
      requestJSON(`${API}/surah/${number}/${EDITIONS.arabic}`),
      requestJSON(`${API}/surah/${number}/${edition}`)
    ]);

    if (!results[0]?.ayahs || !results[1]?.ayahs) {
      throw new Error("Ayah data missing");
    }

    state.arabicBySurah.set(number, results[0].ayahs);
    state.translationBySurah.set(number, results[1].ayahs);

    return {
      arabic: results[0].ayahs,
      translation: results[1].ayahs
    };
  }

  function getAyah(surahNumber, ayahNumber) {
    const arabic = state.arabicBySurah.get(Number(surahNumber));
    if (!arabic) return null;

    return arabic.find(
      ayah => ayah.numberInSurah === Number(ayahNumber)
    ) || null;
  }

  function getTranslation(surahNumber, ayahNumber) {
    const translations = state.translationBySurah.get(Number(surahNumber));
    if (!translations) return null;

    return translations.find(
      ayah => ayah.numberInSurah === Number(ayahNumber)
    ) || null;
  }

  async function loadReadSurah(surahNumber, options = {}) {
    const number = Number(surahNumber);
    const token = ++state.requestToken;

    state.readSurah = number;
    state.loadingRead = true;

    renderReadHeading();

    el.readAyahList.replaceChildren();

    const loading = document.createElement("p");
    loading.className = "loading-message";
    loading.textContent = t("loading");
    el.readAyahList.appendChild(loading);

    try {
      await loadSurahMetadata();
      await loadSurahContent(number);

      if (token !== state.requestToken || state.readSurah !== number) {
        return;
      }

      state.readAyah = Math.min(
        Math.max(1, Number(options.ayah || state.readAyah)),
        getSurah(number)?.numberOfAyahs || 1
      );

      renderReadHeading();
      renderReadAyahs(number);

      if (options.scrollToAyah) {
        scrollReadAyahIntoView(state.readAyah);
      } else {
        el.readBoardScroll.scrollTop = 0;
      }
    } catch (error) {
      if (token !== state.requestToken) return;

      console.error("Unable to load Quran reading content:", error);
      el.readAyahList.replaceChildren();

      const message = document.createElement("p");
      message.className = "loading-message";
      message.textContent = t("loadError");
      el.readAyahList.appendChild(message);
    } finally {
      if (token === state.requestToken) {
        state.loadingRead = false;
      }
    }
  }

  function renderReadAyahs(surahNumber) {
    const arabic = state.arabicBySurah.get(Number(surahNumber));
    const translations = state.translationBySurah.get(Number(surahNumber));

    if (!arabic) return;

    const fragment = document.createDocumentFragment();

    for (const ayah of arabic) {
      const translation = translations?.find(
        item => item.numberInSurah === ayah.numberInSurah
      );

      const card = document.createElement("article");
      card.className = "ayah-card";
      card.dataset.ayah = String(ayah.numberInSurah);
      card.id = `read-ayah-${ayah.numberInSurah}`;

      const controls = document.createElement("div");
      controls.className = "ayah-controls";

      const number = document.createElement("span");
      number.className = "ayah-number";
      number.textContent = localNumber(ayah.numberInSurah);

      const actions = document.createElement("div");
      actions.className = "ayah-actions";

      const play = document.createElement("button");
      play.type = "button";
      play.className = "ayah-audio-button";
      play.textContent = t("playAyah");
      play.addEventListener("click", () => {
        playSelectedReadAyah(Number(surahNumber), ayah.numberInSurah);
      });

      const bookmark = document.createElement("button");
      bookmark.type = "button";
      bookmark.className = "ayah-bookmark-button";
      bookmark.textContent = state.bookmarks.has(ayah.number)
        ? "★"
        : "☆";
      bookmark.setAttribute("aria-label", t("bookmark"));
      bookmark.setAttribute(
        "aria-pressed",
        String(state.bookmarks.has(ayah.number))
      );

      bookmark.addEventListener("click", () => {
        if (state.bookmarks.has(ayah.number)) {
          state.bookmarks.delete(ayah.number);
          bookmark.textContent = "☆";
          bookmark.setAttribute("aria-pressed", "false");
          revealToast(t("bookmark"));
        } else {
          state.bookmarks.add(ayah.number);
          bookmark.textContent = "★";
          bookmark.setAttribute("aria-pressed", "true");
          revealToast(t("saved"));
        }
      });

      actions.append(play, bookmark);
      controls.append(number, actions);

      const arabicText = document.createElement("p");
      arabicText.className = "ayah-arabic";
      arabicText.lang = "ar";
      arabicText.dir = "rtl";
      arabicText.textContent = ayah.text;

      const translationText = document.createElement("p");
      translationText.className = "ayah-translation";
      translationText.textContent =
        translation?.text || t("translationError");

      card.append(controls, arabicText, translationText);

      fragment.appendChild(card);
    }

    el.readAyahList.replaceChildren(fragment);
    el.readAyahList.style.setProperty("--arabic-size", `${state.arabicSize}px`);

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.arabicSize}px`
    );
  }

  function scrollReadAyahIntoView(ayahNumber) {
    const target = document.getElementById(`read-ayah-${ayahNumber}`);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  async function playSelectedReadAyah(surahNumber, ayahNumber) {
    state.listenSurah = Number(surahNumber);
    state.listenAyah = Number(ayahNumber);

    showPage("listen");
    renderSurahList();

    await loadListenSurah(surahNumber, {
      ayah: ayahNumber,
      autoplay: true
    });
  }

  async function loadListenSurah(surahNumber, options = {}) {
    const number = Number(surahNumber);
    const token = ++state.requestToken;

    state.listenSurah = number;
    state.loadingListen = true;

    stopAudio(false);
    renderSurahList();

    try {
      await loadSurahMetadata();
      await loadSurahContent(number);

      if (token !== state.requestToken || state.listenSurah !== number) {
        return;
      }

      const surah = getSurah(number);
      const maxAyah = surah?.numberOfAyahs || 1;

      state.listenAyah = Math.min(
        Math.max(1, Number(options.ayah || state.listenAyah)),
        maxAyah
      );

      renderSurahList();

      if (options.autoplay) {
        await playCurrentAyah();
      }
    } catch (error) {
      if (token !== state.requestToken) return;

      console.error("Unable to load Quran audio content:", error);
      setStatus(el.listenStatus, t("loadError"));
    } finally {
      if (token === state.requestToken) {
        state.loadingListen = false;
      }
    }
  }

  function renderSurahList() {
    if (!el.listenSurahList) return;

    if (!state.surahs.length) return;

    const fragment = document.createDocumentFragment();

    for (const surah of state.surahs) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "surah-item";

      if (surah.number === state.listenSurah) {
        button.classList.add("selected");
        button.setAttribute("aria-current", "true");
      }

      const number = document.createElement("span");
      number.className = "surah-item-number";
      number.textContent = localNumber(surah.number);

      const info = document.createElement("span");
      info.className = "surah-item-info";

      const name = document.createElement("strong");
      name.textContent = `سُورَةُ ${surahName(surah)}`;

      const detail = document.createElement("small");
      const revelation = surah.revelationType === "Meccan"
        ? t("makki")
        : t("madani");

      detail.textContent =
        `${localNumber(surah.numberOfAyahs)} ${t("ayahs")} · ${revelation}`;

      info.append(name, detail);

      const arabic = document.createElement("span");
      arabic.className = "surah-item-arabic";
      arabic.lang = "ar";
      arabic.dir = "rtl";
      arabic.textContent = surah.name;

      button.append(number, info, arabic);

      button.addEventListener("click", () => {
        state.listenSurah = surah.number;
        state.listenAyah = 1;

        loadListenSurah(surah.number, {
          ayah: 1,
          autoplay: true
        });
      });

      fragment.appendChild(button);
    }

    el.listenSurahList.replaceChildren(fragment);
  }

  function stopAudio(resetPosition = true) {
    state.audioToken++;
    state.audioPlaying = false;

    if (el.audio) {
      el.audio.pause();

      if (resetPosition) {
        try {
          el.audio.currentTime = 0;
        } catch (_) {
          // The source may not be ready.
        }
      }

      el.audio.removeAttribute("src");
      el.audio.load();
    }

    updatePlayButton();
  }

  function updatePlayButton() {
    el.playIcon.textContent = state.audioPlaying ? "Ⅱ" : "▶";
    el.playButton.setAttribute(
      "aria-label",
      state.audioPlaying ? t("pause") : t("play")
    );
  }

  async function playCurrentAyah() {
    const surahNumber = state.listenSurah;
    const ayahNumber = state.listenAyah;

    if (!state.arabicBySurah.has(surahNumber)) {
      await loadSurahContent(surahNumber);
    }

    const audioToken = ++state.audioToken;

    try {
      el.audio.pause();

      const audioData = await requestJSON(
        `${API}/ayah/${surahNumber}:${ayahNumber}/${EDITIONS.audio}`
      );

      if (audioToken !== state.audioToken) return;

      const url = audioData?.audio;

      if (!url) {
        throw new Error("Audio URL unavailable");
      }

      el.audio.src = url;
      el.audio.currentTime = 0;
      await el.audio.play();

      if (audioToken !== state.audioToken) return;

      state.audioPlaying = true;
      updatePlayButton();
      setStatus(el.listenStatus, "");
    } catch (error) {
      if (audioToken !== state.audioToken) return;

      console.error("Audio playback failed:", error);
      state.audioPlaying = false;
      updatePlayButton();
      revealToast(t("audioError"));
    }
  }

  async function togglePlayback() {
    if (state.audioPlaying && !el.audio.paused) {
      el.audio.pause();
      state.audioPlaying = false;
      updatePlayButton();
      return;
    }

    if (el.audio.src && el.audio.currentTime > 0) {
      try {
        await el.audio.play();
        state.audioPlaying = true;
        updatePlayButton();
        return;
      } catch (_) {
        // Reload the current ayah below.
      }
    }

    await playCurrentAyah();
  }

  async function moveAyah(direction, targetPage = "listen") {
    const surahNumber = targetPage === "read"
      ? state.readSurah
      : state.listenSurah;

    const ayahNumber = targetPage === "read"
      ? state.readAyah
      : state.listenAyah;

    const surah = getSurah(surahNumber);

    if (!surah) return;

    let nextSurah = surahNumber;
    let nextAyah = ayahNumber + direction;

    if (nextAyah > surah.numberOfAyahs) {
      if (surahNumber >= 114) {
        if (targetPage === "listen") {
          stopAudio();
          state.listenAyah = surah.numberOfAyahs;
          revealToast(t("lastAyah"));
        }
        return;
      }

      nextSurah = surahNumber + 1;
      nextAyah = 1;
    } else if (nextAyah < 1) {
      if (surahNumber <= 1) {
        if (targetPage === "listen") {
          stopAudio();
          state.listenAyah = 1;
          revealToast(t("firstAyah"));
        }
        return;
      }

      nextSurah = surahNumber - 1;

      const previousSurah = getSurah(nextSurah);
      nextAyah = previousSurah?.numberOfAyahs || 1;
    }

    if (targetPage === "read") {
      state.readSurah = nextSurah;
      state.readAyah = nextAyah;

      if (nextSurah !== surahNumber) {
        await loadReadSurah(nextSurah, {
          ayah: nextAyah,
          scrollToAyah: true
        });
      } else {
        scrollReadAyahIntoView(nextAyah);
      }

      return;
    }

    state.listenSurah = nextSurah;
    state.listenAyah = nextAyah;

    await loadListenSurah(nextSurah, {
      ayah: nextAyah,
      autoplay: true
    });
  }

  function updateArabicSize(change) {
    state.arabicSize = Math.max(
      24,
      Math.min(64, state.arabicSize + change)
    );

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.arabicSize}px`
    );

    document.querySelectorAll(".ayah-arabic").forEach(element => {
      element.style.fontSize = `${state.arabicSize}px`;
    });
  }

  function readLanguageChange() {
    const newLanguage = detectLanguage();

    if (newLanguage === state.language) {
      const newTheme = detectTheme();

      if (newTheme !== state.theme) {
        state.theme = newTheme;
        applyTheme();
      }

      return;
    }

    state.language = newLanguage;

    const previousReadSurah = state.readSurah;
    const previousReadAyah = state.readAyah;
    const previousListenSurah = state.listenSurah;
    const previousListenAyah = state.listenAyah;
    const wasPlaying = state.audioPlaying;

    state.translationBySurah.clear();

    applyLanguage();

    if (state.page === "read") {
      loadReadSurah(previousReadSurah, {
        ayah: previousReadAyah,
        scrollToAyah: true
      });
    }

    if (state.page === "listen") {
      loadListenSurah(previousListenSurah, {
        ayah: previousListenAyah,
        autoplay: wasPlaying
      });
    }
  }

  function handleStorage(event) {
    if (!event.key ||
        LANGUAGE_KEYS.includes(event.key) ||
        THEME_KEYS.includes(event.key)) {
      readLanguageChange();

      const newTheme = detectTheme();

      if (newTheme !== state.theme) {
        state.theme = newTheme;
        applyTheme();
      }
    }
  }

  function bindEvents() {
    $("openRead").addEventListener("click", () => {
      showPage("read");
    });

    $("openListen").addEventListener("click", () => {
      showPage("listen");
    });

    el.readSurahSelect.addEventListener("change", event => {
      const number = Number(event.target.value);

      state.readSurah = number;
      state.readAyah = 1;

      loadReadSurah(number, { ayah: 1 });
    });

    $("arabicDecrease").addEventListener("click", () => {
      updateArabicSize(-3);
    });

    $("arabicIncrease").addEventListener("click", () => {
      updateArabicSize(3);
    });

    $("readPrevious").addEventListener("click", () => {
      moveAyah(-1, "read");
    });

    $("readNext").addEventListener("click", () => {
      moveAyah(1, "read");
    });

    $("listenPrevious").addEventListener("click", () => {
      moveAyah(-1, "listen");
    });

    $("listenNext").addEventListener("click", () => {
      moveAyah(1, "listen");
    });

    el.playButton.addEventListener("click", togglePlayback);

    el.audio.addEventListener("play", () => {
      state.audioPlaying = true;
      updatePlayButton();
    });

    el.audio.addEventListener("pause", () => {
      state.audioPlaying = false;
      updatePlayButton();
    });

    el.audio.addEventListener("ended", () => {
      state.audioPlaying = false;
      updatePlayButton();

      const surah = getSurah(state.listenSurah);

      if (!surah) return;

      if (state.listenSurah === 114 &&
          state.listenAyah >= surah.numberOfAyahs) {
        stopAudio();
        revealToast(t("lastAyah"));
        return;
      }

      moveAyah(1, "listen");
    });

    el.audio.addEventListener("error", () => {
      state.audioPlaying = false;
      updatePlayButton();
    });

    window.addEventListener("storage", handleStorage);

    window.addEventListener("pageshow", () => {
      readLanguageChange();
    });

    window.addEventListener("popstate", event => {
      if (event.state?.ibadatQuran && event.state.page) {
        showPage(event.state.page, { push: false });
      } else {
        showPage("home", { push: false });
      }
    });

    window.addEventListener("message", event => {
      /*
       * The host app may notify this page when its settings change.
       * Accepted message examples:
       * { type: "ibadat-settings", language: "en", theme: "dark" }
       * { type: "languageChanged", language: "bn" }
       * { type: "themeChanged", theme: "light" }
       */
      const data = event.data;

      if (!data || typeof data !== "object") return;

      if (
        data.type === "ibadat-settings" ||
        data.type === "languageChanged" ||
        data.type === "themeChanged"
      ) {
        const newLanguage = normalizeLanguage(
          data.language || data.lang
        );

        const newTheme = data.theme
          ? String(data.theme).toLowerCase()
          : null;

        if (newLanguage && newLanguage !== state.language) {
          try {
            localStorage.setItem("ibadat_language", newLanguage);
          } catch (_) {}

          state.language = newLanguage;
          state.translationBySurah.clear();
          applyLanguage();

          if (state.page === "read") {
            loadReadSurah(state.readSurah, {
              ayah: state.readAyah,
              scrollToAyah: true
            });
          } else if (state.page === "listen") {
            loadListenSurah(state.listenSurah, {
              ayah: state.listenAyah,
              autoplay: state.audioPlaying
            });
          }
        }

        if (newTheme && ["dark", "light", "normal"].includes(newTheme)) {
          state.theme = newTheme === "dark" ? "dark" : "light";
          applyTheme();
        }
      }
    });
  }

  async function initialize() {
    state.language = detectLanguage();
    state.theme = detectTheme();

    applyTheme();
    bindEvents();
    applyLanguage();

    try {
      await loadSurahMetadata();
      renderSurahSelect();
      renderSurahList();
      renderReadHeading();
    } catch (error) {
      console.error("Unable to load surah metadata:", error);
      setStatus(el.readStatus, t("loadError"));
      setStatus(el.listenStatus, t("loadError"));
    }

    try {
      history.replaceState(
        { ibadatQuran: true, page: "home" },
        "",
        location.href
      );
    } catch (_) {}
  }

  initialize();
})();
