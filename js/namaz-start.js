
/* ==========================================
   IBADAT — Namaz Start Page
   File: JS/namaz-start.js
========================================== */

"use strict";

/* ---------- Translations ---------- */

const translations = {
  bn: {
    pageTitle: "নামাজ শুরু",

    pageIntro1:
      "Namaz হল আল্লাহর সাথে সরাসরি সংযোগের একটি অনন্য ইবাদত।",

    pageIntro2:
      "এই অংশে নামাজ শুরুর ধাপগুলো ধারাবাহিকভাবে উপস্থাপনা করা হয়েছে।",

    niyyahTitle: "নিয়ত",
    niyyahAlt: "নিয়ত করার প্রস্তুতি",

    niyyahText:
      "নামাজ শুরু করার আগে মনে মনে স্থির করবে, তুমি কোন নামাজ আদায় করতে যাচ্ছ। নিয়ত হলো অন্তরের সংকল্প; মুখে নির্দিষ্ট বাক্য বলা আবশ্যক নয়।",

    niyyahExampleTitle: "সহজ উদাহরণ",

    niyyahExample:
      "আল্লাহর সন্তুষ্টির জন্য যে নামাজ আদায় করতে যাচ্ছ, সেই উদ্দেশ্যটি মনে স্থির করো।",

    takbirTitle: "তাকবিরে তাহরিমা",
    takbirAlt: "তাকবিরে তাহরিমা বলার ভঙ্গি",

    takbirText:
      "নামাজ শুরু করার সময় নির্ধারিত পদ্ধতিতে তাকবির বলবে। হাত তোলার ভঙ্গি শেখার সময় নির্ভরযোগ্য শিক্ষকের নির্দেশনা অনুসরণ করো।",

    pronunciationLabel: "উচ্চারণ:",
    meaningLabel: "অর্থ:",

    takbirPronunciation: "আল্লাহু আকবার।",
    takbirMeaning: "আল্লাহ সর্বশ্রেষ্ঠ।",

    sanaTitle: "সানা",
    sanaAlt: "সানা পাঠের প্রস্তুতি",

    sanaText:
      "তাকবিরে তাহরিমার পর সানা পাঠ করা হয়।",

    sanaPronunciation:
      "সুবহানাকাল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা'আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুক।",

    sanaMeaning:
      "হে আল্লাহ! আপনি পবিত্র, আপনারই প্রশংসা। আপনার নাম বরকতময়, আপনার মর্যাদা মহান, আর আপনি ছাড়া কোনো উপাস্য নেই।",

    qiratLinkText:
      "কিরাত শেখার জন্য এখানে ট্যাপ করুন"
  },

  en: {
    pageTitle: "Starting Salah",

    pageIntro1:
      "Namaz is a unique act of worship that connects us directly with Allah.",

    pageIntro2:
      "This section presents the opening steps of Salah in a clear, step-by-step order.",

    niyyahTitle: "Intention (Niyyah)",
    niyyahAlt: "Preparing to make the intention for Salah",

    niyyahText:
      "Before beginning Salah, make a clear intention in your heart about which prayer you are going to perform. Niyyah is an intention of the heart; saying a specific phrase aloud is not required.",

    niyyahExampleTitle: "A Simple Example",

    niyyahExample:
      "Keep in mind which prayer you intend to perform for the sake of Allah.",

    takbirTitle: "Opening Takbir",
    takbirAlt: "Posture for the opening Takbir",

    takbirText:
      "Begin Salah by saying the opening Takbir in the prescribed manner. Follow a reliable teacher's guidance when learning the hand-raising posture.",

    pronunciationLabel: "Pronunciation:",
    meaningLabel: "Meaning:",

    takbirPronunciation: "Allahu Akbar.",
    takbirMeaning: "Allah is the Greatest.",

    sanaTitle: "Sana",
    sanaAlt: "Preparing to recite Sana",

    sanaText:
      "Sana is recited after the opening Takbir.",

    sanaPronunciation:
      "Subhanakallahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk.",

    sanaMeaning:
      "Glory be to You, O Allah, and praise belongs to You. Blessed is Your name, exalted is Your majesty, and there is no deity besides You.",

    qiratLinkText:
      "Tap here to learn Qirat"
  },

  hi: {
    pageTitle: "नमाज़ की शुरुआत",

    pageIntro1:
      "नमाज़ अल्लाह से सीधे जुड़ने का एक अनूठा इबादत का माध्यम है।",

    pageIntro2:
      "इस भाग में नमाज़ शुरू करने के शुरुआती चरणों को क्रमबद्ध रूप से प्रस्तुत किया गया है।",

    niyyahTitle: "नीयत",
    niyyahAlt: "नमाज़ की नीयत करने की तैयारी",

    niyyahText:
      "नमाज़ शुरू करने से पहले दिल में यह इरादा करें कि कौन-सी नमाज़ अदा करनी है। नीयत दिल का इरादा है; किसी विशेष वाक्य को ज़ोर से कहना आवश्यक नहीं है।",

    niyyahExampleTitle: "आसान उदाहरण",

    niyyahExample:
      "अल्लाह की प्रसन्नता के लिए आप जो नमाज़ अदा करने वाले हैं, उसका इरादा दिल में रखें।",

    takbirTitle: "तकबीर-ए-तहरीमा",
    takbirAlt: "तकबीर-ए-तहरीमा कहने की मुद्रा",

    takbirText:
      "नमाज़ की शुरुआत निर्धारित तरीके से तकबीर कहकर करें। हाथ उठाने की मुद्रा सीखते समय किसी विश्वसनीय शिक्षक के मार्गदर्शन का पालन करें।",

    pronunciationLabel: "उच्चारण:",
    meaningLabel: "अर्थ:",

    takbirPronunciation: "अल्लाहु अकबर।",
    takbirMeaning: "अल्लाह सबसे महान है।",

    sanaTitle: "सना",
    sanaAlt: "सना पढ़ने की तैयारी",

    sanaText:
      "शुरुआती तकबीर के बाद सना पढ़ी जाती है।",

    sanaPronunciation:
      "सुब्हानकल्लाहुम्मा व बिहम्दिका, व तबारकस्मुका, व तआला जद्दुका, व ला इलाहा ग़ैरुक।",

    sanaMeaning:
      "ऐ अल्लाह! आप पाक हैं और सारी प्रशंसा आपके लिए है। आपका नाम बरकत वाला है, आपकी महानता बुलंद है और आपके सिवा कोई पूज्य नहीं।",

    qiratLinkText:
      "क़िरात सीखने के लिए यहाँ टैप करें"
  }
};


/* ---------- Settings ---------- */

function readAppSettings() {
  try {
    const saved = localStorage.getItem("appSettings");

    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    }
  } catch (error) {
    console.warn(
      "IBADAT: Could not read app settings.",
      error
    );
  }

  return {};
}


/* ---------- Language ---------- */

function getCurrentLanguage() {
  const settings = readAppSettings();

  const savedLanguage =
    settings.language ||
    settings.lang ||
    localStorage.getItem("language") ||
    localStorage.getItem("appLanguage") ||
    document.documentElement.lang ||
    "bn";

  const language = String(savedLanguage).toLowerCase();

  if (language.startsWith("en")) return "en";
  if (language.startsWith("hi")) return "hi";

  return "bn";
}


/* ---------- Apply Translations ---------- */

function applyTranslations() {
  const language = getCurrentLanguage();
  const dictionary = translations[language] || translations.bn;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.getAttribute("data-i18n-alt");

    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      element.setAttribute("alt", dictionary[key]);
    }
  });

  // Use the appropriate numeral style for each language.
  const numerals = {
    bn: ["১", "২", "৩"],
    en: ["1", "2", "3"],
    hi: ["१", "२", "३"]
  };

  document.querySelectorAll(".topic-number").forEach((element, index) => {
    if (numerals[language]?.[index]) {
      element.textContent = numerals[language][index];
    }
  });

  document.title = `${dictionary.pageTitle} | IBADAT`;

  // Keep Arabic text in its correct direction in every language.
  document.querySelectorAll(".arabic-text").forEach((element) => {
    element.setAttribute("dir", "rtl");
    element.setAttribute("lang", "ar");
  });
}


/* ---------- Theme ---------- */

function getCurrentTheme() {
  const settings = readAppSettings();

  const savedTheme =
    settings.theme ||
    settings.mode ||
    localStorage.getItem("theme") ||
    localStorage.getItem("appTheme") ||
    "light";

  const theme = String(savedTheme).toLowerCase();

  return [
    "dark",
    "dark-mode",
    "dark_mode",
    "dark-theme",
    "dark_theme"
  ].includes(theme);
}

function applyTheme() {
  const isDark = getCurrentTheme();

  document.body.classList.toggle("dark-theme", isDark);
  document.body.classList.toggle("dark-mode", isDark);

  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );

  document.documentElement.style.colorScheme =
    isDark ? "dark" : "light";
}


/* ---------- Refresh ---------- */

function refreshPageSettings() {
  applyTranslations();
  applyTheme();
}


/* ---------- Initialize ---------- */

function initializeNamazStartPage() {
  refreshPageSettings();

  // Respond to settings changes saved in another tab.
  window.addEventListener("storage", (event) => {
    const watchedKeys = [
      "appSettings",
      "language",
      "appLanguage",
      "theme",
      "appTheme"
    ];

    if (watchedKeys.includes(event.key)) {
      refreshPageSettings();
    }
  });

  // Respond to events dispatched by the existing app settings page.
  window.addEventListener("appSettingsChanged", refreshPageSettings);

  window.addEventListener("languageChanged", applyTranslations);

  window.addEventListener("themeChanged", applyTheme);
}


/* ---------- Run ---------- */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeNamazStartPage,
    { once: true }
  );
} else {
  initializeNamazStartPage();
}
