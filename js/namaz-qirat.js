
/* =========================================================
   IBADAT — NAMAZ QIRAT PAGE
   File: JS/namaz-qirat.js

   Features:
   - Bengali, English and Hindi translations
   - Light and Dark theme support
   - App settings integration
   - Localized topic and verse numbers
   - Footer translation
   ========================================================= */

(() => {
  "use strict";

  const DEFAULT_LANGUAGE = "bn";

  /* =======================================================
     TRANSLATIONS
     Keys match the data-i18n attributes in the HTML.
     ======================================================= */

  const translations = {
    bn: {
      pageTitle: "কিরাত",

      pageIntro1:
        "কিরাত হলো নামাজে কুরআন মাজিদের আয়াত তিলাওয়াত করা।",

      pageIntro2:
        "আরবি পাঠ, উচ্চারণ ও অর্থের সাহায্যে ধাপে ধাপে কিরাত শিখুন।",

      taawwudhTitle: "তাআউয",
      taawwudhPronunciation:
        "আউযু বিল্লাহি মিনাশ শাইতানির রাজীম",
      taawwudhMeaning:
        "বিতাড়িত শয়তান থেকে আমি আল্লাহর আশ্রয় চাই।",

      basmalaTitle: "বিসমিল্লাহ",
      basmalaPronunciation:
        "বিসমিল্লাহির রাহমানির রাহীম",
      basmalaMeaning:
        "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",

      pronunciationLabel: "উচ্চারণ:",
      meaningLabel: "অর্থ:",

      fatihahTitle: "সূরা আল-ফাতিহা",

      fatihah1Pronunciation:
        "বিসমিল্লাহির রাহমানির রাহীম",
      fatihah1Meaning:
        "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",

      fatihah2Pronunciation:
        "আলহামদু লিল্লাহি রব্বিল আলামীন",
      fatihah2Meaning:
        "সমস্ত প্রশংসা আল্লাহর, যিনি সকল জগতের প্রতিপালক।",

      fatihah3Pronunciation:
        "আর-রাহমানির রাহীম",
      fatihah3Meaning:
        "যিনি পরম করুণাময়, অসীম দয়ালু।",

      fatihah4Pronunciation:
        "মালিকি ইয়াওমিদ্দীন",
      fatihah4Meaning:
        "যিনি প্রতিফল দিবসের মালিক।",

      fatihah5Pronunciation:
        "ইয়্যাকা নাবুদু ওয়া ইয়্যাকা নাস্তাঈন",
      fatihah5Meaning:
        "আমরা কেবল তোমারই ইবাদত করি এবং কেবল তোমারই সাহায্য চাই।",

      fatihah6Pronunciation:
        "ইহদিনাস সিরাতাল মুস্তাকীম",
      fatihah6Meaning:
        "আমাদের সরল পথ দেখাও।",

      fatihah7Pronunciation:
        "সিরাতাল্লাযীনা আনআমতা আলাইহিম, গাইরিল মাগদূবি আলাইহিম ওয়ালাদ্দল্লীন",
      fatihah7Meaning:
        "তাদের পথ, যাদের তুমি অনুগ্রহ করেছ; তাদের পথ নয়, যারা ক্রোধের পাত্র হয়েছে, আর নয় পথভ্রষ্টদের পথ।",

      fatihahNote:
        "বাংলা উচ্চারণ আরবি মাখরাজের সব সূক্ষ্মতা প্রকাশ করতে পারে না। নির্ভরযোগ্য তিলাওয়াত শুনে অনুশীলন করুন।",

      ikhlasTitle: "সূরা আল-ইখলাস",

      ikhlas1Pronunciation:
        "কুল হুওয়াল্লাহু আহাদ",
      ikhlas1Meaning:
        "বলুন, তিনি আল্লাহ, এক ও অদ্বিতীয়।",

      ikhlas2Pronunciation:
        "আল্লাহুস সামাদ",
      ikhlas2Meaning:
        "আল্লাহ অমুখাপেক্ষী; সকলেই তাঁর মুখাপেক্ষী।",

      ikhlas3Pronunciation:
        "লাম ইয়ালিদ ওয়া লাম ইউলাদ",
      ikhlas3Meaning:
        "তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি।",

      ikhlas4Pronunciation:
        "ওয়া লাম ইয়াকুন লাহু কুফুওয়ান আহাদ",
      ikhlas4Meaning:
        "আর তাঁর সমতুল্য কেউ নেই।",

      tajweedTitle:
        "শুদ্ধ তিলাওয়াতের অনুশীলন",

      tajweedText:
        "আরবি অক্ষরের সঠিক উচ্চারণস্থান, হরকত, মাদ, গুন্নাহ এবং প্রয়োজনীয় তাজবিদের নিয়ম শিখুন।",

      tajweedNote:
        "একটি নিয়ম করে শিখুন, নির্ভরযোগ্য ক্বারির তিলাওয়াত শুনুন এবং সম্ভব হলে শিক্ষকের কাছে উচ্চারণ যাচাই করুন।",

      nextStepText: "পরবর্তী ধাপ শিখুন"
    },

    en: {
      pageTitle: "Qirat",

      pageIntro1:
        "Qirat is the recitation of Quranic verses during Salah.",

      pageIntro2:
        "Learn Qirat step by step with Arabic text, pronunciation and meanings.",

      taawwudhTitle: "Ta'awwudh",
      taawwudhPronunciation:
        "A'udhu billahi minash-shaytanir-rajim",
      taawwudhMeaning:
        "I seek refuge in Allah from Satan, the accursed.",

      basmalaTitle: "Basmala",
      basmalaPronunciation:
        "Bismillahir-Rahmanir-Rahim",
      basmalaMeaning:
        "In the name of Allah, the Most Compassionate, the Most Merciful.",

      pronunciationLabel: "Pronunciation:",
      meaningLabel: "Meaning:",

      fatihahTitle: "Surah Al-Fatihah",

      fatihah1Pronunciation:
        "Bismillahir-Rahmanir-Rahim",
      fatihah1Meaning:
        "In the name of Allah, the Most Compassionate, the Most Merciful.",

      fatihah2Pronunciation:
        "Al-hamdu lillahi Rabbil-'alamin",
      fatihah2Meaning:
        "All praise belongs to Allah, Lord of all worlds.",

      fatihah3Pronunciation:
        "Ar-Rahmanir-Rahim",
      fatihah3Meaning:
        "The Most Compassionate, the Most Merciful.",

      fatihah4Pronunciation:
        "Maliki yawmid-din",
      fatihah4Meaning:
        "Master of the Day of Judgment.",

      fatihah5Pronunciation:
        "Iyyaka na'budu wa iyyaka nasta'in",
      fatihah5Meaning:
        "You alone we worship, and You alone we ask for help.",

      fatihah6Pronunciation:
        "Ihdinas-siratal-mustaqim",
      fatihah6Meaning:
        "Guide us to the straight path.",

      fatihah7Pronunciation:
        "Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-dallin",
      fatihah7Meaning:
        "The path of those You have blessed, not those who incurred anger, nor those who went astray.",

      fatihahNote:
        "Written transliteration cannot represent every detail of Arabic articulation. Practise by listening to reliable recitation.",

      ikhlasTitle: "Surah Al-Ikhlas",

      ikhlas1Pronunciation:
        "Qul huwallahu ahad",
      ikhlas1Meaning:
        "Say: He is Allah, the One.",

      ikhlas2Pronunciation:
        "Allahus-samad",
      ikhlas2Meaning:
        "Allah, the Eternal Refuge.",

      ikhlas3Pronunciation:
        "Lam yalid wa lam yulad",
      ikhlas3Meaning:
        "He neither begets nor is born.",

      ikhlas4Pronunciation:
        "Wa lam yakun lahu kufuwan ahad",
      ikhlas4Meaning:
        "And there is none comparable to Him.",

      tajweedTitle:
        "Practising Correct Recitation",

      tajweedText:
        "Learn the articulation points of Arabic letters, vowel marks, elongation, ghunnah and relevant Tajweed rules.",

      tajweedNote:
        "Learn one rule at a time, listen to a reliable reciter and, if possible, have a qualified teacher check your pronunciation.",

      nextStepText: "Learn the Next Step"
    },

    hi: {
      pageTitle: "किरात",

      pageIntro1:
        "किरात का अर्थ नमाज़ में कुरआन की आयतों का पाठ करना है।",

      pageIntro2:
        "अरबी पाठ, उच्चारण और अर्थ की सहायता से किरात चरणबद्ध तरीके से सीखें।",

      taawwudhTitle: "तआव्वुज़",
      taawwudhPronunciation:
        "अऊज़ु बिल्लाहि मिनश्शैतानिर्रजीम",
      taawwudhMeaning:
        "मैं धिक्कारे हुए शैतान से अल्लाह की शरण माँगता हूँ।",

      basmalaTitle: "बिस्मिल्लाह",
      basmalaPronunciation:
        "बिस्मिल्लाहिर्रहमानिर्रहीम",
      basmalaMeaning:
        "अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",

      pronunciationLabel: "उच्चारण:",
      meaningLabel: "अर्थ:",

      fatihahTitle: "सूरह अल-फ़ातिहा",

      fatihah1Pronunciation:
        "बिस्मिल्लाहिर्रहमानिर्रहीम",
      fatihah1Meaning:
        "अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",

      fatihah2Pronunciation:
        "अल्हम्दु लिल्लाहि रब्बिल आलमीन",
      fatihah2Meaning:
        "सारी प्रशंसा अल्लाह के लिए है, जो सारे संसारों का पालनहार है।",

      fatihah3Pronunciation:
        "अर्रहमानिर्रहीम",
      fatihah3Meaning:
        "जो अत्यंत कृपाशील, परम दयालु है।",

      fatihah4Pronunciation:
        "मालिकी यौमिद्दीन",
      fatihah4Meaning:
        "प्रतिफल के दिन का स्वामी।",

      fatihah5Pronunciation:
        "इय्याका नअबुदु व इय्याका नस्तईन",
      fatihah5Meaning:
        "हम केवल तेरी ही इबादत करते हैं और केवल तुझसे सहायता माँगते हैं।",

      fatihah6Pronunciation:
        "इहदिनस्सिरातल मुस्तक़ीम",
      fatihah6Meaning:
        "हमें सीधे मार्ग पर चला।",

      fatihah7Pronunciation:
        "सिरातल्लज़ीना अनअमता अलैहिम, ग़ैरिल मग़दूबि अलैहिम वलद़्दाल्लीन",
      fatihah7Meaning:
        "उन लोगों का मार्ग जिन पर तूने अनुग्रह किया, न कि उनका जिन पर क्रोध हुआ और न भटके हुए लोगों का।",

      fatihahNote:
        "लिखित उच्चारण अरबी के हर मख़राज़ को पूरी तरह नहीं दर्शा सकता। विश्वसनीय तिलावत सुनकर अभ्यास करें।",

      ikhlasTitle: "सूरह अल-इख़लास",

      ikhlas1Pronunciation:
        "क़ुल हुवल्लाहु अहद",
      ikhlas1Meaning:
        "कहिए: वह अल्लाह एक है।",

      ikhlas2Pronunciation:
        "अल्लाहुस्समद",
      ikhlas2Meaning:
        "अल्लाह सबकी ज़रूरतों का सहारा है।",

      ikhlas3Pronunciation:
        "लम यलिद व लम यूलद",
      ikhlas3Meaning:
        "न उसने किसी को जन्म दिया और न वह जन्मा।",

      ikhlas4Pronunciation:
        "व लम यकुन लहू कुफुवन अहद",
      ikhlas4Meaning:
        "और उसके बराबर कोई नहीं है।",

      tajweedTitle:
        "सही तिलावत का अभ्यास",

      tajweedText:
        "अरबी अक्षरों के मख़ारिज़, हरकत, स्वर की लंबाई, ग़ुन्ना और आवश्यक तजवीद के नियम सीखें।",

      tajweedNote:
        "एक बार में एक नियम सीखें, विश्वसनीय क़ारी की तिलावत सुनें और संभव हो तो शिक्षक से उच्चारण जाँच करवाएँ।",

      nextStepText: "अगला चरण सीखें"
    }
  };

  /* =======================================================
     SAFE STORAGE ACCESS
     ======================================================= */

  function getStorageValue(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function parseSettings(value) {
    if (!value) return null;

    try {
      const parsed = JSON.parse(value);

      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch (error) {
      // Ignore invalid JSON and use fallback settings.
    }

    return null;
  }

  function getSettings() {
    const keys = [
      "appSettings",
      "settings",
      "userSettings"
    ];

    for (const key of keys) {
      const parsed = parseSettings(getStorageValue(key));

      if (parsed) return parsed;
    }

    return {};
  }

  /* =======================================================
     LANGUAGE
     ======================================================= */

  function normalizeLanguage(value) {
    const language = String(value || "")
      .trim()
      .toLowerCase();

    if (language.startsWith("en")) return "en";
    if (language.startsWith("hi")) return "hi";
    if (language.startsWith("bn") || language.startsWith("be")) {
      return "bn";
    }

    return DEFAULT_LANGUAGE;
  }

  function getCurrentLanguage(settings = getSettings()) {
    const value =
      settings.language ??
      settings.lang ??
      settings.appLanguage ??
      getStorageValue("language") ??
      getStorageValue("appLanguage") ??
      getStorageValue("lang") ??
      document.documentElement.lang ??
      DEFAULT_LANGUAGE;

    return normalizeLanguage(value);
  }

  function applyTranslations(language) {
    const lang = normalizeLanguage(language);
    const dictionary = translations[lang];

    document.documentElement.lang = lang;
    document.documentElement.dataset.language = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (
        key &&
        Object.prototype.hasOwnProperty.call(dictionary, key)
      ) {
        element.textContent = dictionary[key];
      }
    });

    const title = document.querySelector("title");

    if (title) {
      title.textContent =
        lang === "bn"
          ? "কিরাত শিখুন | IBADAT"
          : lang === "hi"
            ? "किरात सीखें | IBADAT"
            : "Learn Qirat | IBADAT";
    }

    document.querySelectorAll(".arabic-text").forEach((element) => {
      element.setAttribute("lang", "ar");
      element.setAttribute("dir", "rtl");
    });

    updateNumbers(lang);

    return lang;
  }

  /* =======================================================
     LOCALIZED NUMBERS
     ======================================================= */

  const digitMaps = {
    bn: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
    en: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    hi: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
  };

  function localizeDigits(value, language) {
    const map = digitMaps[language] || digitMaps.bn;

    return String(value).replace(/[0-9]/g, (digit) => {
      return map[Number(digit)];
    });
  }

  function updateNumbers(language) {
    /*
     * Save each original number once, then localize it.
     * This prevents converted digits from being converted
     * repeatedly when the language changes.
     */
    document.querySelectorAll(".topic-number, .verse-number").forEach((element) => {
      if (!element.hasAttribute("data-original-number")) {
        element.setAttribute(
          "data-original-number",
          element.textContent.trim()
        );
      }

      const original = element.getAttribute("data-original-number");

      if (/^[0-9]+$/.test(original)) {
        element.textContent = localizeDigits(original, language);
      }
    });
  }

  /* =======================================================
     THEME
     ======================================================= */

  function normalizeTheme(value) {
    const theme = String(value || "light")
      .trim()
      .toLowerCase();

    if (
      theme === "dark" ||
      theme === "dark-mode" ||
      theme === "dark_mode" ||
      theme === "dark-theme" ||
      theme === "dark_theme"
    ) {
      return "dark";
    }

    return "light";
  }

  function getCurrentTheme(settings = getSettings()) {
    const value =
      settings.theme ??
      settings.mode ??
      settings.colorScheme ??
      getStorageValue("theme") ??
      getStorageValue("appTheme") ??
      getStorageValue("colorScheme") ??
      "light";

    return normalizeTheme(value);
  }

  function applyTheme(themeValue) {
    const theme = normalizeTheme(themeValue);
    const dark = theme === "dark";

    document.body.classList.toggle("dark-theme", dark);
    document.body.classList.toggle("dark-mode", dark);

    document.documentElement.classList.toggle("dark-theme", dark);
    document.documentElement.classList.toggle("dark-mode", dark);

    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;

    const themeColor = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        dark ? "#17231c" : "#124b36"
      );
    }

    return theme;
  }

  /* =======================================================
     INITIALIZE / REFRESH
     ======================================================= */

  function refreshQiratPage() {
    const settings = getSettings();

    const language = getCurrentLanguage(settings);
    const theme = getCurrentTheme(settings);

    applyTranslations(language);
    applyTheme(theme);

    return { language, theme };
  }

  /* =======================================================
     MAIN APP INTEGRATION
     ======================================================= */

  /*
   * The main app can call these functions if needed:
   *
   * window.setQiratLanguage("en");
   * window.setQiratTheme("dark");
   * window.refreshQiratSettings();
   */

  window.setQiratLanguage = function (language) {
    return applyTranslations(language);
  };

  window.setQiratTheme = function (theme) {
    return applyTheme(theme);
  };

  window.refreshQiratSettings = refreshQiratPage;

  /* =======================================================
     SETTINGS CHANGE LISTENERS
     ======================================================= */

  window.addEventListener("storage", (event) => {
    const relevantKeys = [
      "appSettings",
      "settings",
      "userSettings",
      "language",
      "appLanguage",
      "lang",
      "theme",
      "appTheme",
      "colorScheme"
    ];

    if (!event.key || relevantKeys.includes(event.key)) {
      refreshQiratPage();
    }
  });

  [
    "appSettingsChanged",
    "settingsChanged",
    "languageChanged",
    "themeChanged"
  ].forEach((eventName) => {
    window.addEventListener(eventName, refreshQiratPage);
  });

  /* =======================================================
     START
     ======================================================= */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      refreshQiratPage,
      { once: true }
    );
  } else {
    refreshQiratPage();
  }
})();
