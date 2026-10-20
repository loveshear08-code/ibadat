/* ==========================================
   IBADAT — Namaz Start Page
   File: JS/namaz-start.js
========================================== */

"use strict";

/* ---------- Translations ---------- */

const translations = {
  bn: {
    pageTitle: "নামাজ শুরু",
    pageIntro: "নিয়ত থেকে নামাজের প্রথম ধাপগুলো সহজভাবে শিখে নাও।",

    niyyahTitle: "নিয়ত",
    niyyahText:
      "নিয়ত হলো অন্তরে কোন নামাজ আদায় করবে তা স্থির করা। নিয়ত মূলত অন্তরের সংকল্প; মুখে নির্দিষ্ট বাক্য বলা আবশ্যক নয়।",

    takbirTitle: "তাকবিরে তাহরিমা",
    takbirPronunciation: "উচ্চারণ: আল্লাহু আকবার",
    takbirMeaning: "অর্থ: আল্লাহ সর্বশ্রেষ্ঠ।",
    takbirText: "তাকবিরে তাহরিমা বলে নামাজ শুরু করা হয়।",

    handsTitle: "হাত বাঁধা",
    handsText:
      "তাকবির বলার পর নামাজে হাত বাঁধবে। হাত বাঁধার পদ্ধতিতে প্রচলিত ফিকহি মতভেদ রয়েছে; তাই শেখার সময় নিজের অনুসৃত নির্ভরযোগ্য শিক্ষকের নির্দেশনা অনুসরণ করবে।",

    qiyamTitle: "কিয়াম",
    qiyamText:
      "কিয়াম হলো নামাজে দাঁড়িয়ে থাকা। সক্ষম ব্যক্তি ফরজ নামাজে দাঁড়িয়ে নামাজ আদায় করবে এবং মনোযোগ ও বিনয়ের সঙ্গে থাকবে।",

    sanaTitle: "সানা",
    sanaPronunciation:
      "উচ্চারণ: সুবহানাকাল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা‘আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুক।",
    sanaMeaning:
      "অর্থ: হে আল্লাহ! আপনি পবিত্র, আপনারই প্রশংসা। আপনার নাম বরকতময়, আপনার মর্যাদা মহান, আর আপনি ছাড়া কোনো উপাস্য নেই।",

    qiratLinkText: "কিরাত শিখো"
  },

  en: {
    pageTitle: "Starting Salah",
    pageIntro:
      "Learn the first steps of Salah, beginning with intention.",

    niyyahTitle: "Intention (Niyyah)",
    niyyahText:
      "Niyyah means intending in your heart which prayer you are going to perform. It is primarily an intention of the heart; saying a specific phrase aloud is not required.",

    takbirTitle: "Takbir al-Tahrimah",
    takbirPronunciation: "Pronunciation: Allahu Akbar",
    takbirMeaning: "Meaning: Allah is the Greatest.",
    takbirText:
      "Salah begins by saying Takbir al-Tahrimah.",

    handsTitle: "Folding the Hands",
    handsText:
      "After saying the opening takbir, fold your hands for Salah. Practices differ on how the hands are positioned, so follow the guidance of a reliable teacher you trust.",

    qiyamTitle: "Qiyam (Standing)",
    qiyamText:
      "Qiyam means standing during Salah. A person who is able should stand for obligatory prayers and remain attentive and humble.",

    sanaTitle: "Sana",
    sanaPronunciation:
      "Pronunciation: Subhanakallahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk.",
    sanaMeaning:
      "Meaning: O Allah, You are glorified and all praise belongs to You. Blessed is Your name, exalted is Your majesty, and there is no deity besides You.",

    qiratLinkText: "Learn Qirat"
  },

  hi: {
    pageTitle: "नमाज़ की शुरुआत",
    pageIntro:
      "नीयत से नमाज़ के शुरुआती चरणों को आसानी से सीखें।",

    niyyahTitle: "नीयत",
    niyyahText:
      "नीयत का अर्थ है दिल में यह इरादा करना कि कौन-सी नमाज़ पढ़नी है। नीयत मूल रूप से दिल का इरादा है; किसी विशेष वाक्य को ज़ोर से कहना आवश्यक नहीं है।",

    takbirTitle: "तकबीर-ए-तहरीमा",
    takbirPronunciation: "उच्चारण: अल्लाहु अकबर",
    takbirMeaning: "अर्थ: अल्लाह सबसे महान है।",
    takbirText:
      "तकबीर-ए-तहरीमा कहकर नमाज़ शुरू की जाती है।",

    handsTitle: "हाथ बाँधना",
    handsText:
      "शुरुआती तकबीर के बाद नमाज़ में हाथ बाँधें। हाथ बाँधने के तरीके में अलग-अलग प्रचलित मत हैं, इसलिए अपने विश्वसनीय शिक्षक के मार्गदर्शन का पालन करें।",

    qiyamTitle: "क़ियाम",
    qiyamText:
      "क़ियाम का अर्थ नमाज़ में खड़े रहना है। जो व्यक्ति खड़े होने में सक्षम हो, वह फ़र्ज़ नमाज़ खड़े होकर अदा करे और ध्यान व विनम्रता बनाए रखे।",

    sanaTitle: "सना",
    sanaPronunciation:
      "उच्चारण: सुब्हानकल्लाहुम्मा व बिहम्दिका, व तबारकस्मुका, व तआला जद्दुका, व ला इलाहा ग़ैरुक।",
    sanaMeaning:
      "अर्थ: ऐ अल्लाह! आप पाक हैं और सारी प्रशंसा आपके लिए है। आपका नाम बरकत वाला है, आपकी महानता बुलंद है और आपके सिवा कोई पूज्य नहीं।",

    qiratLinkText: "क़िरात सीखें"
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
    console.warn("IBADAT: Settings could not be read.", error);
  }

  return {};
}


/* ---------- Language Detection ---------- */

function getCurrentLanguage() {
  const settings = readAppSettings();

  const possibleLanguage =
    settings.language ||
    settings.lang ||
    localStorage.getItem("language") ||
    localStorage.getItem("appLanguage") ||
    document.documentElement.lang ||
    "bn";

  const language = String(possibleLanguage).toLowerCase();

  if (language.startsWith("en")) return "en";
  if (language.startsWith("hi")) return "hi";

  return "bn";
}


/* ---------- Translation ---------- */

function applyTranslations() {
  const language = getCurrentLanguage();
  const dictionary = translations[language] || translations.bn;

  document.documentElement.lang = language;

  // Translate text content.
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (
      Object.prototype.hasOwnProperty.call(dictionary, key)
    ) {
      element.textContent = dictionary[key];
    }
  });

  // Translate image alt text.
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.getAttribute("data-i18n-alt");

    if (
      Object.prototype.hasOwnProperty.call(dictionary, key)
    ) {
      element.setAttribute("alt", dictionary[key]);
    }
  });

  // Update the page title.
  document.title =
    dictionary.pageTitle + " | IBADAT";

  // Update text direction for Arabic content.
  document.querySelectorAll(".arabic-text").forEach((element) => {
    element.setAttribute("dir", "rtl");
    element.setAttribute("lang", "ar");
  });
}


/* ---------- Theme Handling ---------- */

function applyTheme() {
  const settings = readAppSettings();

  const savedTheme =
    settings.theme ||
    settings.mode ||
    localStorage.getItem("theme") ||
    localStorage.getItem("appTheme") ||
    "light";

  const theme = String(savedTheme).toLowerCase();

  const isDark =
    theme === "dark" ||
    theme === "dark-mode" ||
    theme === "dark_theme";

  document.body.classList.toggle("dark-theme", isDark);
  document.body.classList.toggle("dark-mode", isDark);

  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );

  document.documentElement.style.colorScheme =
    isDark ? "dark" : "light";
}


/* ---------- Sync with App Settings ---------- */

function refreshPageSettings() {
  applyTranslations();
  applyTheme();
}


/* ---------- Initialize ---------- */

function initializeNamazStartPage() {
  refreshPageSettings();

  // React when settings are changed in another tab.
  window.addEventListener("storage", (event) => {
    if (
      event.key === "appSettings" ||
      event.key === "language" ||
      event.key === "appLanguage" ||
      event.key === "theme" ||
      event.key === "appTheme"
    ) {
      refreshPageSettings();
    }
  });

  // Allow the app to request a refresh after changing settings.
  window.addEventListener("appSettingsChanged", () => {
    refreshPageSettings();
  });

  window.addEventListener("languageChanged", () => {
    applyTranslations();
  });

  window.addEventListener("themeChanged", () => {
    applyTheme();
  });
}


/* ---------- Run Safely ---------- */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeNamazStartPage,
    { once: true }
  );
} else {
  initializeNamazStartPage();
}
