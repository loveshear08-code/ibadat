/* =========================================================
   IBADAT — QURAN SECTION
   File: js/quran.js

   Features:
   - Bengali, Hindi and English interface
   - Dark mode
   - Quran reading
   - Quran recitation
   - Previous / Next navigation
   - Persistent reading position
   - Arabic text, transliteration and translation
   - Responsive three-page interface

   API: AlQuran Cloud
   ========================================================= */

"use strict";

/* =========================================================
   1. API AND STORAGE CONFIGURATION
   ========================================================= */

const QURAN_API = "https://api.alquran.cloud/v1";

const QURAN_EDITION = "quran-uthmani";
const RECITATION_EDITION = "ar.alafasy";

const TRANSLATION_EDITIONS = {
  bn: "bn.bengali",
  hi: "hi.hindi",
  en: "en.sahih"
};

const STORAGE_KEYS = {
  language: "ibadat_language",
  theme: "ibadat_theme",
  arabicSize: "ibadat_quran_arabic_size",
  savedPosition: "ibadat_quran_saved_position"
};

/* =========================================================
   2. DOM HELPERS
   ========================================================= */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

function getElement(id) {
  return document.getElementById(id);
}

function setText(element, value) {
  if (element) {
    element.textContent = value ?? "";
  }
}

function safeJSONParse(value, fallback = null) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Storage is unavailable:", error);
  }
}

/* =========================================================
   3. TRANSLATIONS
   ========================================================= */

const TRANSLATIONS = {
  bn: {
    quranTitle: "আল-কুরআন",
    quranSubtitle: "পবিত্র কুরআন শিখি ও বুঝি",

    surahLabel: "সূরা",
    readQuran: "কুরআন পড়ুন",
    listenRecitation: "তিলাওয়াত শুনুন",

    ayahRecitation: "আয়াতের তিলাওয়াত",
    audioReady: "তিলাওয়াত শোনার জন্য প্রস্তুত",
    audioLoading: "তিলাওয়াত লোড হচ্ছে…",
    audioPlaying: "তিলাওয়াত চলছে",
    audioPaused: "তিলাওয়াত থেমে আছে",
    audioError: "তিলাওয়াত চালু করা যায়নি",

    footerMessage: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",

    readSubtitle: "আরবি পাঠ, উচ্চারণ ও অনুবাদ",
    listenSubtitle: "সূরা নির্বাচন করে তিলাওয়াত শুনুন",

    chooseSurah: "সূরা নির্বাচন",
    surahListTitle: "সূরার তালিকা",

    arabicSize: "আরবি লেখার আকার",

    loading: "কুরআনের তথ্য আনা হচ্ছে…",
    loadingSurahs: "সূরার তালিকা লোড হচ্ছে…",
    loadingAyahs: "আয়াত লোড হচ্ছে…",

    previous: "পূর্ববর্তী",
    next: "পরবর্তী",

    playShort: "চালু",
    pauseShort: "থামুন",

    surah: "সূরা",
    ayah: "আয়াত",
    ayahs: "আয়াত",
    meccan: "মাক্কি",
    medinan: "মাদানি",

    transliteration: "উচ্চারণ",
    translation: "অর্থ",
    playAyah: "আয়াত শুনুন",
    playingAyah: "আয়াত চলছে",
    savePosition: "পড়ার অবস্থান সংরক্ষণ",
    savedPosition: "পড়ার অবস্থান সংরক্ষিত",
    resumeReading: "সংরক্ষিত অবস্থান থেকে পড়ুন",

    noSurahs: "কোনো সূরা পাওয়া যায়নি।",
    noAyahs: "এই সূরার আয়াত পাওয়া যায়নি।",
    loadError: "তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।",

    firstAyah: "এটি প্রথম আয়াত।",
    lastAyah: "এটি শেষ আয়াত।",

    darkMode: "ডার্ক মোড চালু করুন",
    lightMode: "লাইট মোড চালু করুন",

    home: "মূল পৃষ্ঠা",
    selectedSurah: "নির্বাচিত সূরা",

    surahType: "সূরার ধরন",
    surahNumber: "সূরা নম্বর",

    searchPlaceholder: "সূরার নাম বা নম্বর",
    continueListening: "তিলাওয়াত চালিয়ে যান",

    networkError: "সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
    invalidResponse: "সঠিক তথ্য পাওয়া যায়নি।",
    audioNotSupported: "এই ব্রাউজারে অডিও চালানো সমর্থিত নয়।"
  },

  hi: {
    quranTitle: "अल-क़ुरआन",
    quranSubtitle: "पवित्र क़ुरआन सीखें और समझें",

    surahLabel: "सूरह",
    readQuran: "क़ुरआन पढ़ें",
    listenRecitation: "तिलावत सुनें",

    ayahRecitation: "आयत की तिलावत",
    audioReady: "तिलावत सुनने के लिए तैयार",
    audioLoading: "तिलावत लोड हो रही है…",
    audioPlaying: "तिलावत चल रही है",
    audioPaused: "तिलावत रुकी हुई है",
    audioError: "तिलावत शुरू नहीं हो सकी",

    footerMessage: "इबादत • शुद्धता के मार्ग पर सीखना और अभ्यास",

    readSubtitle: "अरबी पाठ, उच्चारण और अनुवाद",
    listenSubtitle: "सूरह चुनकर तिलावत सुनें",

    chooseSurah: "सूरह चुनें",
    surahListTitle: "सूरह की सूची",

    arabicSize: "अरबी लेख का आकार",

    loading: "क़ुरआन की जानकारी लाई जा रही है…",
    loadingSurahs: "सूरह की सूची लोड हो रही है…",
    loadingAyahs: "आयतें लोड हो रही हैं…",

    previous: "पिछला",
    next: "अगला",

    playShort: "चलाएँ",
    pauseShort: "रोकें",

    surah: "सूरह",
    ayah: "आयत",
    ayahs: "आयतें",
    meccan: "मक्की",
    medinan: "मदनी",

    transliteration: "उच्चारण",
    translation: "अर्थ",
    playAyah: "आयत सुनें",
    playingAyah: "आयत चल रही है",
    savePosition: "पढ़ने की स्थिति सहेजें",
    savedPosition: "पढ़ने की स्थिति सहेजी गई",
    resumeReading: "सहेजी गई स्थिति से पढ़ें",

    noSurahs: "कोई सूरह नहीं मिली।",
    noAyahs: "इस सूरह की आयतें नहीं मिलीं।",
    loadError: "जानकारी लोड नहीं हुई। इंटरनेट कनेक्शन जाँचें।",

    firstAyah: "यह पहली आयत है।",
    lastAyah: "यह आख़िरी आयत है।",

    darkMode: "डार्क मोड चालू करें",
    lightMode: "लाइट मोड चालू करें",

    home: "मुख्य पृष्ठ",
    selectedSurah: "चुनी गई सूरह",

    surahType: "सूरह का प्रकार",
    surahNumber: "सूरह संख्या",

    searchPlaceholder: "सूरह का नाम या संख्या",
    continueListening: "तिलावत जारी रखें",

    networkError: "कनेक्शन में समस्या हुई। फिर से प्रयास करें।",
    invalidResponse: "सही जानकारी नहीं मिली।",
    audioNotSupported: "इस ब्राउज़र में ऑडियो समर्थित नहीं है।"
  },

  en: {
    quranTitle: "The Holy Quran",
    quranSubtitle: "Learn and understand the Holy Quran",

    surahLabel: "Surah",
    readQuran: "Read Quran",
    listenRecitation: "Listen to Recitation",

    ayahRecitation: "Ayah Recitation",
    audioReady: "Ready to listen",
    audioLoading: "Loading recitation…",
    audioPlaying: "Recitation is playing",
    audioPaused: "Recitation is paused",
    audioError: "Unable to play recitation",

    footerMessage: "IBADAT • Learn and practise with purity",

    readSubtitle: "Arabic text, transliteration and translation",
    listenSubtitle: "Choose a Surah and listen",

    chooseSurah: "Choose Surah",
    surahListTitle: "Surah List",

    arabicSize: "Arabic text size",

    loading: "Loading Quran data…",
    loadingSurahs: "Loading Surah list…",
    loadingAyahs: "Loading Ayahs…",

    previous: "Previous",
    next: "Next",

    playShort: "Play",
    pauseShort: "Stop",

    surah: "Surah",
    ayah: "Ayah",
    ayahs: "Ayahs",
    meccan: "Meccan",
    medinan: "Medinan",

    transliteration: "Transliteration",
    translation: "Translation",
    playAyah: "Listen to Ayah",
    playingAyah: "Ayah is playing",
    savePosition: "Save reading position",
    savedPosition: "Reading position saved",
    resumeReading: "Resume saved position",

    noSurahs: "No Surahs found.",
    noAyahs: "No Ayahs found for this Surah.",
    loadError: "Unable to load data. Check your internet connection.",

    firstAyah: "This is the first Ayah.",
    lastAyah: "This is the last Ayah.",

    darkMode: "Enable dark mode",
    lightMode: "Enable light mode",

    home: "Home",
    selectedSurah: "Selected Surah",

    surahType: "Surah type",
    surahNumber: "Surah number",

    searchPlaceholder: "Surah name or number",
    continueListening: "Continue listening",

    networkError: "Connection problem. Please try again.",
    invalidResponse: "No valid data was received.",
    audioNotSupported: "Audio is not supported by this browser."
  }
};

/* =========================================================
   4. LANGUAGE DETECTION
   ========================================================= */

function normalizeLanguage(value) {
  if (!value) return null;

  const language = String(value)
    .trim()
    .toLowerCase();

  if (
    language === "bn" ||
    language.startsWith("bn-") ||
    language.includes("bangla") ||
    language.includes("bengali")
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
  const possibleKeys = [
    "ibadat_language",
    "siteLanguage",
    "selectedLanguage",
    "language",
    "lang",
    "preferredLanguage"
  ];

  for (const key of possibleKeys) {
    const stored = readStorage(key);

    if (!stored) continue;

    const parsed = safeJSONParse(stored, null);

    const candidate =
      typeof parsed === "string"
        ? parsed
        : parsed?.language ||
          parsed?.lang ||
          parsed?.code ||
          stored;

    const normalized = normalizeLanguage(candidate);

    if (normalized) return normalized;
  }

  const documentLanguage =
    normalizeLanguage(document.documentElement.lang);

  if (documentLanguage) return documentLanguage;

  return "bn";
}

/* =========================================================
   5. APPLICATION STATE
   ========================================================= */

const state = {
  language: detectLanguage(),

  theme: readStorage(STORAGE_KEYS.theme, "light"),

  surahs: [],

  currentPage: "home",

  currentSurah: 1,

  currentAyah: 1,

  ayahData: [],

  audioAyahs: [],

  currentAudioIndex: 0,

  isAudioPlaying: false,

  isAudioLoading: false,

  arabicFontSize: Number(
    readStorage(STORAGE_KEYS.arabicSize, "32")
  ) || 32,

  savedPosition: safeJSONParse(
    readStorage(STORAGE_KEYS.savedPosition),
    null
  ),

  requestCounter: 0,

  cache: new Map(),

  audioSourceType: "none"
};

const audioElement = getElement("quranAudio");

/* =========================================================
   6. NUMBER FORMATTING
   ========================================================= */

function toLocalizedDigits(value) {
  const digits = String(value);

  if (state.language === "bn") {
    return digits.replace(/\d/g, digit =>
      "০১২৩৪৫৬৭৮৯"[Number(digit)]
    );
  }

  if (state.language === "hi") {
    return digits.replace(/\d/g, digit =>
      "०१२३४५६७८९"[Number(digit)]
    );
  }

  return digits;
}

function formatSurahNumber(number) {
  return toLocalizedDigits(number);
}

function formatAyahNumber(number) {
  return toLocalizedDigits(number);
}

/* =========================================================
   7. TRANSLATION HELPERS
   ========================================================= */

function t(key) {
  const languagePack =
    TRANSLATIONS[state.language] || TRANSLATIONS.bn;

  return languagePack[key] ??
    TRANSLATIONS.en[key] ??
    key;
}

function applyTranslations() {
  document.documentElement.lang = state.language;

  $$("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (key) {
      element.textContent = t(key);
    }
  });

  $$("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = t(
      element.dataset.i18nPlaceholder
    );
  });

  $$("[data-i18n-aria]").forEach(element => {
    element.setAttribute(
      "aria-label",
      t(element.dataset.i18nAria)
    );
  });

  updateThemeButtons();
  updateAudioStatus();
}

/* =========================================================
   8. API HELPERS
   ========================================================= */

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${response.statusText}`
    );
  }

  const result = await response.json();

  if (
    result.status &&
    result.status !== "OK"
  ) {
    throw new Error(
      result.data || "Invalid API response"
    );
  }

  return result;
}

async function fetchCached(key, url) {
  if (state.cache.has(key)) {
    return state.cache.get(key);
  }

  const promise = fetchJSON(url)
    .then(result => result.data)
    .catch(error => {
      state.cache.delete(key);
      throw error;
    });

  state.cache.set(key, promise);

  return promise;
}

/* =========================================================
   9. LOAD SURAH LIST
   ========================================================= */

async function loadSurahs() {
  try {
    const data = await fetchCached(
      "surah-list",
      `${QURAN_API}/surah`
    );

    if (!Array.isArray(data)) {
      throw new Error("Surah list is invalid");
    }

    state.surahs = data;

    renderReadSurahSelect();
    renderListenSurahList();
    updateFeaturedSurah();

    return data;
  } catch (error) {
    console.error("Unable to load Surahs:", error);

    showToast(t("loadError"));

    return [];
  }
}

/* =========================================================
   10. SURAH NAME HELPERS
   ========================================================= */

function getSurah(number) {
  return state.surahs.find(
    surah => Number(surah.number) === Number(number)
  ) || null;
}

function getSurahName(surah) {
  if (!surah) return "";

  if (state.language === "bn") {
    return surah.name || "";
  }

  if (state.language === "hi") {
    return surah.name || "";
  }

  return surah.englishName ||
    surah.englishNameTranslation ||
    "";
}

function getSurahTranslationName(surah) {
  if (!surah) return "";

  if (state.language === "en") {
    return surah.englishNameTranslation || "";
  }

  if (state.language === "hi") {
    return surah.englishNameTranslation || "";
  }

  return surah.englishNameTranslation || "";
}

function getRevelationType(surah) {
  if (!surah) return "";

  const revelation = String(
    surah.revelationType || ""
  ).toLowerCase();

  if (revelation === "meccan") {
    return t("meccan");
  }

  if (revelation === "medinan") {
    return t("medinan");
  }

  return "";
}

/* =========================================================
   11. OPEN AND CLOSE PAGES
   ========================================================= */

function openPage(page) {
  const pageMap = {
    home: "homeScreen",
    read: "readScreen",
    listen: "listenScreen"
  };

  Object.entries(pageMap).forEach(([key, id]) => {
    const element = getElement(id);

    if (!element) return;

    element.classList.toggle(
      "hidden",
      key !== page
    );
  });

  state.currentPage = page;

  stopAudio(false);

  if (page === "read") {
    loadSurahForReading(state.currentSurah);
  }

  if (page === "listen") {
    renderListenSurahList();
  }

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}

function goHome() {
  openPage("home");
}

/* =========================================================
   12. THEME / DARK MODE
   ========================================================= */

function applyTheme(theme) {
  state.theme = theme === "dark"
    ? "dark"
    : "light";

  document.body.classList.toggle(
    "dark",
    state.theme === "dark"
  );

  writeStorage(
    STORAGE_KEYS.theme,
    state.theme
  );

  updateThemeButtons();
}

function toggleTheme() {
  applyTheme(
    state.theme === "dark"
      ? "light"
      : "dark"
  );
}

function updateThemeButtons() {
  const isDark = state.theme === "dark";

  const icon = isDark ? "☀" : "☾";

  const themeButtons = [
    ["themeIconHome", "themeToggleHome"],
    ["themeIconRead", "themeToggleRead"],
    ["themeIconListen", "themeToggleListen"]
  ];

  themeButtons.forEach(([iconId, buttonId]) => {
    const iconElement = getElement(iconId);
    const buttonElement = getElement(buttonId);

    setText(iconElement, icon);

    if (buttonElement) {
      buttonElement.setAttribute(
        "aria-label",
        t(isDark ? "lightMode" : "darkMode")
      );
    }
  });
}

/* =========================================================
   13. LANGUAGE CHANGE
   ========================================================= */

function setLanguage(language) {
  const normalized = normalizeLanguage(language);

  if (!normalized) return;

  state.language = normalized;

  writeStorage(
    STORAGE_KEYS.language,
    normalized
  );

  applyTranslations();

  renderReadSurahSelect();
  renderListenSurahList();
  updateFeaturedSurah();

  if (state.currentPage === "read") {
    renderAyahList();
    updateReadHeading();
  }
}

/* =========================================================
   14. FEATURED HOME SURAH
   ========================================================= */

function updateFeaturedSurah() {
  const surah = getSurah(1);

  if (!surah) return;

  setText(
    getElement("featuredSurahName"),
    getSurahName(surah)
  );

  setText(
    getElement("featuredArabicName"),
    surah.name || "سُورَةُ الْفَاتِحَةِ"
  );

  setText(
    getElement("featuredSurahNumber"),
    `${t("surah")} ${formatSurahNumber(1)}`
  );

  loadFeaturedAyah();
}

async function loadFeaturedAyah() {
  try {
    const translationEdition =
      TRANSLATION_EDITIONS[state.language] ||
      TRANSLATION_EDITIONS.bn;

    const [arabic, translation, transliteration, audio] =
      await Promise.all([
        fetchCached(
          "featured-arabic",
          `${QURAN_API}/ayah/1/${QURAN_EDITION}`
        ),

        fetchCached(
          `featured-translation-${translationEdition}`,
          `${QURAN_API}/ayah/1/${translationEdition}`
        ),

        fetchCached(
          "featured-transliteration",
          `${QURAN_API}/ayah/1/en.transliteration`
        ),

        fetchCached(
          "featured-audio",
          `${QURAN_API}/ayah/1/${RECITATION_EDITION}`
        )
      ]);

    setText(
      getElement("featuredArabic"),
      arabic.text
    );

    setText(
      getElement("featuredTranslation"),
      translation.text
    );

    setText(
      getElement("featuredTranslit"),
      transliteration.text || ""
    );

    const playButton = getElement("featuredPlay");

    if (playButton) {
      playButton.dataset.audioUrl =
        audio.audio || "";
    }
  } catch (error) {
    console.error("Featured Ayah error:", error);
  }
}

/* =========================================================
   15. READ PAGE SURAH SELECT
   ========================================================= */

function renderReadSurahSelect() {
  const select = getElement("readSurahSelect");

  if (!select) return;

  const currentValue = String(
    state.currentSurah
  );

  select.replaceChildren();

  state.surahs.forEach(surah => {
    const option = document.createElement("option");

    option.value = String(surah.number);

    option.textContent =
      `${formatSurahNumber(surah.number)}. ` +
      `${getSurahName(surah)}`;

    select.appendChild(option);
  });

  select.value = currentValue;
}

function updateReadHeading() {
  const surah = getSurah(state.currentSurah);

  if (!surah) return;

  setText(
    getElement("readSurahTitle"),
    `${t("surah")} ${getSurahName(surah)}`
  );

  setText(
    getElement("readSurahMeta"),
    `${formatSurahNumber(surah.number)} • ` +
    `${formatAyahNumber(surah.numberOfAyahs)} ${t("ayahs")} • ` +
    `${getRevelationType(surah)}`
  );

  const select = getElement("readSurahSelect");

  if (select) {
    select.value = String(surah.number);
  }
}

/* =========================================================
   16. GET SURAH AYAH DATA
   ========================================================= */

async function getSurahAyahs(surahNumber) {
  const translationEdition =
    TRANSLATION_EDITIONS[state.language] ||
    TRANSLATION_EDITIONS.bn;

  const [arabic, translation, transliteration, audio] =
    await Promise.all([
      fetchCached(
        `arabic-${surahNumber}`,
        `${QURAN_API}/surah/${surahNumber}/${QURAN_EDITION}`
      ),

      fetchCached(
        `translation-${surahNumber}-${translationEdition}`,
        `${QURAN_API}/surah/${surahNumber}/${translationEdition}`
      ),

      fetchCached(
        `transliteration-${surahNumber}`,
        `${QURAN_API}/surah/${surahNumber}/en.transliteration`
      ),

      fetchCached(
        `audio-${surahNumber}`,
        `${QURAN_API}/surah/${surahNumber}/${RECITATION_EDITION}`
      )
    ]);

  const arabicAyahs = arabic.ayahs || [];
  const translationAyahs = translation.ayahs || [];
  const transliterationAyahs = transliteration.ayahs || [];
  const audioAyahs = audio.ayahs || [];

  return arabicAyahs.map((ayah, index) => ({
    number: ayah.number,
    numberInSurah: ayah.numberInSurah,
    text: ayah.text,

    translation:
      translationAyahs[index]?.text || "",

    transliteration:
      transliterationAyahs[index]?.text || "",

    audio:
      audioAyahs[index]?.audio || "",

    surahNumber
  }));
}

/* =========================================================
   17. LOAD SURAH FOR READING
   ========================================================= */

async function loadSurahForReading(
  surahNumber,
  targetAyah = 1
) {
  const requestId = ++state.requestCounter;

  state.currentSurah = Number(surahNumber);
  state.currentAyah = Number(targetAyah);

  updateReadHeading();

  const list = getElement("readAyahList");

  if (list) {
    list.replaceChildren();

    const loading = document.createElement("div");

    loading.className = "loading-state";
    loading.textContent = t("loadingAyahs");

    list.appendChild(loading);
  }

  try {
    const ayahs = await getSurahAyahs(
      state.currentSurah
    );

    if (requestId !== state.requestCounter) {
      return;
    }

    state.ayahData = ayahs;

    renderAyahList();

    scrollToAyah(state.currentAyah);

    saveReadingPosition(
      state.currentSurah,
      state.currentAyah
    );

    updateReadNavigation();
  } catch (error) {
    console.error("Reading data error:", error);

    if (list) {
      list.replaceChildren();

      const message = document.createElement("div");

      message.className = "error-state";
      message.textContent = t("loadError");

      list.appendChild(message);
    }
  }
}

/* =========================================================
   18. RENDER AYAH LIST
   ========================================================= */

function renderAyahList() {
  const list = getElement("readAyahList");

  if (!list) return;

  list.replaceChildren();

  if (!state.ayahData.length) {
    const empty = document.createElement("div");

    empty.className = "empty-state";
    empty.textContent = t("noAyahs");

    list.appendChild(empty);

    return;
  }

  const fragment = document.createDocumentFragment();

  state.ayahData.forEach(ayah => {
    const card = document.createElement("article");

    card.className = "ayah-card";
    card.dataset.ayah = String(ayah.numberInSurah);

    const top = document.createElement("div");

    top.className = "ayah-card-top";

    const badge = document.createElement("span");

    badge.className = "ayah-badge";
    badge.textContent =
      formatAyahNumber(ayah.numberInSurah);

    const actions = document.createElement("div");

    actions.className = "ayah-actions";

    const playButton = document.createElement("button");

    playButton.className = "mini-button";
    playButton.type = "button";
    playButton.textContent = `▶ ${t("playAyah")}`;

    playButton.addEventListener("click", () => {
      playSingleAyah(ayah);
    });

    const saveButton = document.createElement("button");

    saveButton.className = "mini-button";
    saveButton.type = "button";
    saveButton.textContent = "☆";

    saveButton.setAttribute(
      "aria-label",
      t("savePosition")
    );

    saveButton.addEventListener("click", () => {
      saveReadingPosition(
        state.currentSurah,
        ayah.numberInSurah
      );

      showToast(t("savedPosition"));
    });

    actions.append(playButton, saveButton);

    top.append(badge, actions);

    const arabic = document.createElement("div");

    arabic.className = "ayah-arabic";
    arabic.lang = "ar";
    arabic.dir = "rtl";
    arabic.textContent = ayah.text;

    const transliteration = document.createElement("p");

    transliteration.className = "ayah-translit";
    transliteration.textContent = ayah.transliteration;

    const translation = document.createElement("p");

    translation.className = "ayah-translation";
    translation.textContent = ayah.translation;

    card.append(
      top,
      arabic,
      transliteration,
      translation
    );

    if (
      Number(ayah.numberInSurah) ===
      Number(state.currentAyah)
    ) {
      card.classList.add("current-ayah");
    }

    fragment.appendChild(card);
  });

  list.appendChild(fragment);
}

/* =========================================================
   19. SCROLL TO CURRENT AYAH
   ========================================================= */

function scrollToAyah(ayahNumber) {
  const list = getElement("readAyahList");

  if (!list) return;

  const target = $(
    `[data-ayah="${Number(ayahNumber)}"]`,
    list
  );

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* =========================================================
   20. READING POSITION
   ========================================================= */

function saveReadingPosition(surahNumber, ayahNumber) {
  const position = {
    surah: Number(surahNumber),
    ayah: Number(ayahNumber),
    updatedAt: Date.now()
  };

  state.savedPosition = position;

  writeStorage(
    STORAGE_KEYS.savedPosition,
    JSON.stringify(position)
  );
}

function getSavedPosition() {
  const position = safeJSONParse(
    readStorage(STORAGE_KEYS.savedPosition),
    null
  );

  if (
    !position ||
    !Number.isFinite(Number(position.surah)) ||
    !Number.isFinite(Number(position.ayah))
  ) {
    return null;
  }

  return {
    surah: Number(position.surah),
    ayah: Number(position.ayah)
  };
}

/* =========================================================
   21. PREVIOUS / NEXT AYAH
   ========================================================= */

function updateReadNavigation() {
  const previous = getElement("previousAyah");
  const next = getElement("nextAyah");

  if (!previous || !next) return;

  previous.disabled =
    state.currentSurah === 1 &&
    state.currentAyah <= 1;

  const surah = getSurah(state.currentSurah);

  next.disabled = Boolean(
    surah &&
    state.currentAyah >= surah.numberOfAyahs &&
    state.currentSurah >= 114
  );
}

async function goToAyah(direction) {
  if (!state.ayahData.length) return;

  let surahNumber = state.currentSurah;
  let ayahNumber = state.currentAyah + direction;

  const surah = getSurah(surahNumber);

  if (!surah) return;

  if (ayahNumber < 1) {
    if (surahNumber <= 1) {
      showToast(t("firstAyah"));
      return;
    }

    surahNumber--;

    const previousSurah = getSurah(surahNumber);

    ayahNumber = previousSurah
      ? previousSurah.numberOfAyahs
      : 1;
  } else if (ayahNumber > surah.numberOfAyahs) {
    if (surahNumber >= 114) {
      showToast(t("lastAyah"));
      return;
    }

    surahNumber++;
    ayahNumber = 1;
  }

  if (surahNumber !== state.currentSurah) {
    await loadSurahForReading(
      surahNumber,
      ayahNumber
    );
  } else {
    state.currentAyah = ayahNumber;

    renderAyahList();
    scrollToAyah(ayahNumber);

    saveReadingPosition(
      state.currentSurah,
      state.currentAyah
    );

    updateReadNavigation();
  }
}

/* =========================================================
   22. PLAY SINGLE AYAH
   ========================================================= */

async function playSingleAyah(ayah) {
  if (!audioElement || !ayah?.audio) {
    showToast(t("audioError"));
    return;
  }

  stopAudio(false);

  state.audioSourceType = "single";
  state.isAudioLoading = true;

  audioElement.src = ayah.audio;
  audioElement.load();

  try {
    await audioElement.play();

    state.isAudioPlaying = true;
    state.isAudioLoading = false;

    updateAudioStatus();
  } catch (error) {
    console.error("Single Ayah audio error:", error);

    state.isAudioPlaying = false;
    state.isAudioLoading = false;

    showToast(t("audioError"));
    updateAudioStatus();
  }
}

/* =========================================================
   23. FEATURED AUDIO
   ========================================================= */

async function toggleFeaturedAudio() {
  const button = getElement("featuredPlay");

  if (!button) return;

  const url = button.dataset.audioUrl;

  if (!url) {
    await loadFeaturedAyah();

    const newUrl = button.dataset.audioUrl;

    if (!newUrl) {
      showToast(t("audioError"));
      return;
    }
  }

  const audioUrl = button.dataset.audioUrl;

  if (
    audioElement.src === audioUrl &&
    !audioElement.paused
  ) {
    audioElement.pause();
    return;
  }

  if (
    audioElement.src === audioUrl &&
    audioElement.paused &&
    audioElement.currentTime > 0
  ) {
    try {
      await audioElement.play();
      return;
    } catch {
      // Continue with a fresh source.
    }
  }

  stopAudio(false);

  state.audioSourceType = "featured";
  audioElement.src = audioUrl;
  audioElement.load();

  try {
    await audioElement.play();

    state.isAudioPlaying = true;
    updateAudioStatus();
  } catch (error) {
    console.error("Featured audio error:", error);
    showToast(t("audioError"));
  }
}

/* =========================================================
   24. LISTEN PAGE — SURAH LIST
   ========================================================= */

function renderListenSurahList() {
  const list = getElement("listenSurahList");

  if (!list) return;

  list.replaceChildren();

  if (!state.surahs.length) {
    const loading = document.createElement("div");

    loading.className = "loading-state";
    loading.textContent = t("loadingSurahs");

    list.appendChild(loading);

    return;
  }

  const count = getElement("listenSurahCount");

  setText(
    count,
    `${formatSurahNumber(state.surahs.length)} ${t("surah")}`
  );

  const fragment = document.createDocumentFragment();

  state.surahs.forEach(surah => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "surah-row";

    button.dataset.surah = String(surah.number);

    if (surah.number === state.currentSurah) {
      button.classList.add("selected");
    }

    const index = document.createElement("span");

    index.className = "surah-index";
    index.textContent =
      formatSurahNumber(surah.number);

    const copy = document.createElement("span");

    copy.className = "surah-row-copy";

    const name = document.createElement("strong");

    name.textContent = getSurahName(surah);

    const details = document.createElement("small");

    details.textContent =
      `${formatAyahNumber(surah.numberOfAyahs)} ` +
      `${t("ayahs")} • ${getRevelationType(surah)}`;

    const arabic = document.createElement("span");

    arabic.className = "surah-row-arabic";
    arabic.lang = "ar";
    arabic.dir = "rtl";
    arabic.textContent = surah.name || "";

    copy.append(name, details);

    button.append(index, copy, arabic);

    button.addEventListener("click", () => {
      selectSurahForListening(surah.number);
    });

    fragment.appendChild(button);
  });

  list.appendChild(fragment);
}

/* =========================================================
   25. SELECT SURAH FOR LISTENING
   ========================================================= */

async function selectSurahForListening(surahNumber) {
  state.currentSurah = Number(surahNumber);
  state.currentAyah = 1;

  renderListenSurahList();

  try {
    const ayahs = await getSurahAyahs(
      state.currentSurah
    );

    state.audioAyahs = ayahs;

    state.currentAudioIndex = 0;

    saveReadingPosition(
      state.currentSurah,
      1
    );

    const target = $(
      `[data-surah="${state.currentSurah}"]`,
      getElement("listenSurahList")
    );

    target?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    showToast(
      `${t("selectedSurah")}: ` +
      `${getSurahName(getSurah(state.currentSurah))}`
    );
  } catch (error) {
    console.error("Unable to select Surah:", error);
    showToast(t("loadError"));
  }
}

/* =========================================================
   26. LISTEN PAGE — PLAY / PAUSE
   ========================================================= */

async function toggleListenPlayback() {
  if (!audioElement) return;

  if (
    !audioElement.paused &&
    !audioElement.ended
  ) {
    audioElement.pause();
    return;
  }

  if (
    audioElement.src &&
    audioElement.paused &&
    audioElement.currentTime > 0
  ) {
    try {
      await audioElement.play();
      return;
    } catch {
      // Try loading the selected Ayah below.
    }
  }

  if (!state.audioAyahs.length) {
    await selectSurahForListening(
      state.currentSurah || 1
    );
  }

  const ayah = state.audioAyahs[
    state.currentAudioIndex
  ];

  if (!ayah?.audio) {
    showToast(t("audioError"));
    return;
  }

  state.audioSourceType = "listen";

  audioElement.src = ayah.audio;
  audioElement.load();

  try {
    await audioElement.play();

    state.isAudioPlaying = true;
    state.isAudioLoading = false;

    state.currentAyah = ayah.numberInSurah;

    saveReadingPosition(
      state.currentSurah,
      state.currentAyah
    );

    updateAudioStatus();
  } catch (error) {
    console.error("Listen playback error:", error);

    state.isAudioPlaying = false;
    showToast(t("audioError"));

    updateAudioStatus();
  }
}

/* =========================================================
   27. LISTEN PAGE — PREVIOUS / NEXT
   ========================================================= */

async function moveListeningAyah(direction) {
  if (!state.audioAyahs.length) {
    await selectSurahForListening(
      state.currentSurah || 1
    );
  }

  if (!state.audioAyahs.length) return;

  let newIndex =
    state.currentAudioIndex + direction;

  if (newIndex < 0) {
    if (state.currentSurah <= 1) {
      showToast(t("firstAyah"));
      return;
    }

    const previousSurahNumber =
      state.currentSurah - 1;

    await selectSurahForListening(
      previousSurahNumber
    );

    if (!state.audioAyahs.length) return;

    newIndex = state.audioAyahs.length - 1;
  } else if (newIndex >= state.audioAyahs.length) {
    if (state.currentSurah >= 114) {
      showToast(t("lastAyah"));
      return;
    }

    await selectSurahForListening(
      state.currentSurah + 1
    );

    newIndex = 0;
  }

  state.currentAudioIndex = newIndex;

  const ayah = state.audioAyahs[newIndex];

  if (!ayah) return;

  state.currentAyah = ayah.numberInSurah;

  saveReadingPosition(
    state.currentSurah,
    state.currentAyah
  );

  await playListenAyah(ayah);
}

async function playListenAyah(ayah) {
  if (!audioElement || !ayah?.audio) return;

  state.audioSourceType = "listen";

  audioElement.src = ayah.audio;
  audioElement.load();

  try {
    await audioElement.play();

    state.isAudioPlaying = true;
    state.isAudioLoading = false;

    updateAudioStatus();
  } catch (error) {
    console.error("Unable to play Ayah:", error);

    state.isAudioPlaying = false;

    showToast(t("audioError"));
    updateAudioStatus();
  }
}

/* =========================================================
   28. AUDIO EVENTS AND UI
   ========================================================= */

function updateAudioStatus() {
  const status = getElement("featuredAudioStatus");

  if (status) {
    let message = t("audioReady");

    if (state.isAudioLoading) {
      message = t("audioLoading");
    } else if (state.isAudioPlaying) {
      message = t("audioPlaying");
    } else if (
      audioElement &&
      audioElement.currentTime > 0 &&
      audioElement.paused
    ) {
      message = t("audioPaused");
    }

    status.textContent = message;
  }

  const featuredIcon = getElement("featuredPlayIcon");

  if (featuredIcon) {
    featuredIcon.textContent =
      state.isAudioPlaying &&
      state.audioSourceType === "featured"
        ? "Ⅱ"
        : "▶";
  }

  const listenIcon = getElement("listenPlayIcon");
  const listenLabel = getElement("listenPlayLabel");
  const listenButton = getElement("listenPlayPause");

  if (listenIcon) {
    listenIcon.textContent =
      state.isAudioPlaying ? "Ⅱ" : "▶";
  }

  if (listenLabel) {
    listenLabel.textContent =
      state.isAudioPlaying
        ? t("pauseShort")
        : t("playShort");
  }

  if (listenButton) {
    listenButton.setAttribute(
      "aria-label",
      state.isAudioPlaying
        ? t("pauseShort")
        : t("playShort")
    );
  }
}

function stopAudio(resetSource = false) {
  if (!audioElement) return;

  audioElement.pause();

  if (resetSource) {
    audioElement.removeAttribute("src");
    audioElement.load();
  }

  state.isAudioPlaying = false;
  state.isAudioLoading = false;

  updateAudioStatus();
}

if (audioElement) {
  audioElement.addEventListener("play", () => {
    state.isAudioPlaying = true;
    state.isAudioLoading = false;

    updateAudioStatus();
  });

  audioElement.addEventListener("pause", () => {
    state.isAudioPlaying = false;

    updateAudioStatus();
  });

  audioElement.addEventListener("waiting", () => {
    state.isAudioLoading = true;

    updateAudioStatus();
  });

  audioElement.addEventListener("canplay", () => {
    state.isAudioLoading = false;

    updateAudioStatus();
  });

  audioElement.addEventListener("ended", async () => {
    state.isAudioPlaying = false;
    state.isAudioLoading = false;

    if (state.audioSourceType === "listen") {
      const nextIndex = state.currentAudioIndex + 1;

      if (nextIndex < state.audioAyahs.length) {
        state.currentAudioIndex = nextIndex;

        const nextAyah =
          state.audioAyahs[nextIndex];

        state.currentAyah = nextAyah.numberInSurah;

        saveReadingPosition(
          state.currentSurah,
          state.currentAyah
        );

        await playListenAyah(nextAyah);
        return;
      }

      if (state.currentSurah < 114) {
        await selectSurahForListening(
          state.currentSurah + 1
        );

        if (state.audioAyahs.length) {
          state.currentAudioIndex = 0;

          await playListenAyah(
            state.audioAyahs[0]
          );

          return;
        }
      }
    }

    updateAudioStatus();
  });

  audioElement.addEventListener("error", () => {
    state.isAudioPlaying = false;
    state.isAudioLoading = false;

    updateAudioStatus();
  });
}

/* =========================================================
   29. ARABIC FONT SIZE
   ========================================================= */

function applyArabicFontSize(size) {
  const normalized = Math.max(
    22,
    Math.min(54, Number(size) || 32)
  );

  state.arabicFontSize = normalized;

  document.documentElement.style.setProperty(
    "--arabic-size",
    `${normalized}px`
  );

  writeStorage(
    STORAGE_KEYS.arabicSize,
    String(normalized)
  );
}

function changeArabicFontSize(direction) {
  applyArabicFontSize(
    state.arabicFontSize + direction
  );
}

/* =========================================================
   30. TOAST NOTIFICATIONS
   ========================================================= */

let toastTimeout = null;

function showToast(message) {
  const toast = getElement("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* =========================================================
   31. EVENT LISTENERS
   ========================================================= */

function bindEvents() {
  /* Home page navigation */

  $$("[data-open]").forEach(button => {
    button.addEventListener("click", () => {
      const page = button.dataset.open;

      if (page === "read") {
        openPage("read");
      } else if (page === "listen") {
        openPage("listen");
      }
    });
  });

  /* Return to home */

  $$("[data-go-home]").forEach(button => {
    button.addEventListener("click", goHome);
  });

  /* Theme buttons */

  [
    "themeToggleHome",
    "themeToggleRead",
    "themeToggleListen"
  ].forEach(id => {
    getElement(id)?.addEventListener(
      "click",
      toggleTheme
    );
  });

  /* Surah selector on reading page */

  getElement("readSurahSelect")?.addEventListener(
    "change",
    event => {
      const surahNumber = Number(event.target.value);

      if (
        Number.isInteger(surahNumber) &&
        surahNumber >= 1 &&
        surahNumber <= 114
      ) {
        loadSurahForReading(surahNumber, 1);
      }
    }
  );

  /* Previous and next Ayah */

  getElement("previousAyah")?.addEventListener(
    "click",
    () => goToAyah(-1)
  );

  getElement("nextAyah")?.addEventListener(
    "click",
    () => goToAyah(1)
  );

  /* Arabic font controls */

  getElement("fontDown")?.addEventListener(
    "click",
    () => changeArabicFontSize(-2)
  );

  getElement("fontUp")?.addEventListener(
    "click",
    () => changeArabicFontSize(2)
  );

  /* Featured recitation */

  getElement("featuredPlay")?.addEventListener(
    "click",
    toggleFeaturedAudio
  );

  /* Listening controls */

  getElement("listenPlayPause")?.addEventListener(
    "click",
    toggleListenPlayback
  );

  getElement("listenPrevious")?.addEventListener(
    "click",
    () => moveListeningAyah(-1)
  );

  getElement("listenNext")?.addEventListener(
    "click",
    () => moveListeningAyah(1)
  );

  /* Keyboard shortcuts */

  document.addEventListener("keydown", event => {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return;
    }

    if (event.key === "Escape") {
      goHome();
    }
  });

  /* Respond to language changes from another page */

  window.addEventListener("storage", event => {
    if (
      event.key &&
      [
        "ibadat_language",
        "siteLanguage",
        "selectedLanguage",
        "language",
        "lang",
        "preferredLanguage"
      ].includes(event.key)
    ) {
      const language = detectLanguage();

      if (language !== state.language) {
        setLanguage(language);
      }
    }

    if (event.key === STORAGE_KEYS.theme) {
      applyTheme(event.newValue || "light");
    }
  });
}

/* =========================================================
   32. RESTORE SAVED POSITION
   ========================================================= */

async function restoreSavedPosition() {
  const position = getSavedPosition();

  if (!position) return;

  const validSurah =
    position.surah >= 1 &&
    position.surah <= 114;

  if (!validSurah) return;

  state.currentSurah = position.surah;
  state.currentAyah = Math.max(1, position.ayah);
}

/* =========================================================
   33. OPTIONAL GLOBAL LANGUAGE BRIDGE
   ========================================================= */

/*
  Other IBADAT settings pages can call:

  window.IBADAT_QURAN.setLanguage("bn");
  window.IBADAT_QURAN.setLanguage("hi");
  window.IBADAT_QURAN.setLanguage("en");

  Supported theme values:
  window.IBADAT_QURAN.setTheme("dark");
  window.IBADAT_QURAN.setTheme("light");
*/

window.IBADAT_QURAN = {
  setLanguage,

  setTheme: applyTheme,

  openPage,

  goHome,

  getSavedPosition,

  resumeReading: async function () {
    const position = getSavedPosition();

    if (!position) {
      openPage("read");
      return;
    }

    state.currentSurah = position.surah;
    state.currentAyah = position.ayah;

    openPage("read");

    await loadSurahForReading(
      position.surah,
      position.ayah
    );
  }
};

/* =========================================================
   34. APPLICATION INITIALIZATION
   ========================================================= */

async function initializeQuranApp() {
  applyTheme(state.theme);

  applyArabicFontSize(
    state.arabicFontSize
  );

  applyTranslations();

  bindEvents();

  await restoreSavedPosition();

  await loadSurahs();

  updateFeaturedSurah();

  updateReadHeading();

  updateReadNavigation();

  renderListenSurahList();

  updateAudioStatus();
}

/* =========================================================
   35. START APPLICATION
   ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeQuranApp,
    { once: true }
  );
} else {
  initializeQuranApp();
}
