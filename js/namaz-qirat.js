
/* =========================================================
   NAMAZ QIRAT PAGE — JS
   File: JS/namaz-qirat.js
   Languages: Bengali, English, Hindi
   Theme: Light / Dark
   ========================================================= */

(() => {
  "use strict";

  const SUPPORTED_LANGUAGES = ["bn", "en", "hi"];
  const DEFAULT_LANGUAGE = "bn";

  /*
   * Translation keys must match the data-i18n attributes
   * used in HTML/namaz-qirat.html.
   */
  const qiratTranslations = {
    bn: {
      pageTitle: "কিরাত শিক্ষা",
      pageIntro1: "নামাজে কিরাত হলো কুরআনের নির্ধারিত আয়াত ও সূরা তিলাওয়াত।",
      pageIntro2: "এখানে আরবি পাঠ, বাংলা উচ্চারণ ও অর্থের সাহায্যে কিরাত শেখার উপকরণ সাজানো হয়েছে।",

      introTitle: "কিরাত শেখার পরিচিতি",
      imagePlaceholder: "এখানে ছবি যুক্ত করা যাবে",
      introText: "প্রথমে আরবি পাঠ মনোযোগ দিয়ে পড়ুন। এরপর উচ্চারণ শুনে বা দেখে অনুশীলন করুন এবং অর্থ বোঝার চেষ্টা করুন।",

      learningNoteTitle: "শেখার নির্দেশনা",
      learningNote: "বাংলা বা অন্য ভাষার উচ্চারণ আরবি মাখরাজের সম্পূর্ণ বিকল্প নয়। সম্ভব হলে বিশুদ্ধ তিলাওয়াত শুনুন এবং যোগ্য শিক্ষকের কাছে উচ্চারণ যাচাই করুন।",

      taawwudhTitle: "তাআউয",
      taawwudhText: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      taawwudhPronunciation: "আউযু বিল্লাহি মিনাশ শাইতানির রাজীম",
      taawwudhMeaning: "অর্থ: বিতাড়িত শয়তান থেকে আমি আল্লাহর আশ্রয় চাই।",

      basmalaTitle: "বিসমিল্লাহ",
      basmalaText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      basmalaPronunciation: "বিসমিল্লাহির রাহমানির রাহীম",
      basmalaMeaning: "অর্থ: পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",

      pronunciationLabel: "উচ্চারণ",
      meaningLabel: "অর্থ",

      fatihahTitle: "সূরা আল-ফাতিহা",
      fatihahIntro: "সূরা আল-ফাতিহার আরবি পাঠ, উচ্চারণ ও অর্থ।",

      fatihah1Pronunciation: "বিসমিল্লাহির রাহমানির রাহীম",
      fatihah1Meaning: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",

      fatihah2Pronunciation: "আলহামদু লিল্লাহি রাব্বিল আলামীন",
      fatihah2Meaning: "সমস্ত প্রশংসা আল্লাহর, যিনি সকল জগতের প্রতিপালক।",

      fatihah3Pronunciation: "আর-রাহমানির রাহীম",
      fatihah3Meaning: "যিনি পরম করুণাময়, অসীম দয়ালু।",

      fatihah4Pronunciation: "মালিকি ইয়াওমিদ্দীন",
      fatihah4Meaning: "যিনি প্রতিফল দিবসের মালিক।",

      fatihah5Pronunciation: "ইয়্যাকা নাবুদু ওয়া ইয়্যাকা নাস্তাঈন",
      fatihah5Meaning: "আমরা কেবল তোমারই ইবাদত করি এবং কেবল তোমারই সাহায্য চাই।",

      fatihah6Pronunciation: "ইহদিনাস সিরাতাল মুস্তাকীম",
      fatihah6Meaning: "আমাদের সরল পথ দেখাও।",

      fatihah7Pronunciation: "সিরাতাল্লাযীনা আনআমতা আলাইহিম, গাইরিল মাগদূবি আলাইহিম ওয়ালাদ্দল্লীন",
      fatihah7Meaning: "তাদের পথ, যাদের তুমি অনুগ্রহ করেছ; তাদের পথ নয়, যারা ক্রোধের পাত্র হয়েছে, আর নয় পথভ্রষ্টদের পথ।",

      fatihahNote: "সূরা আল-ফাতিহার আয়াত নম্বর মুদ্রিত মুসহাফের নম্বরায়ন অনুযায়ী যাচাই করে নাও।",

      ikhlasTitle: "সূরা আল-ইখলাস",
      ikhlasIntro: "সূরা আল-ইখলাসের আরবি পাঠ, উচ্চারণ ও অর্থ।",

      ikhlas1Pronunciation: "কুল হুওয়াল্লাহু আহাদ",
      ikhlas1Meaning: "বলুন, তিনি আল্লাহ, এক ও অদ্বিতীয়।",

      ikhlas2Pronunciation: "আল্লাহুস সামাদ",
      ikhlas2Meaning: "আল্লাহ অমুখাপেক্ষী; সকলেই তাঁর মুখাপেক্ষী।",

      ikhlas3Pronunciation: "লাম ইয়ালিদ ওয়া লাম ইউলাদ",
      ikhlas3Meaning: "তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি।",

      ikhlas4Pronunciation: "ওয়া লাম ইয়াকুল্লাহু কুফুওয়ান আহাদ",
      ikhlas4Meaning: "আর তাঁর সমতুল্য কেউ নেই।",

      tajweedTitle: "শুদ্ধ তিলাওয়াতের অনুশীলন",
      tajweedText: "আরবি অক্ষরের মাখরাজ, দীর্ঘ স্বর, গুন্নাহ এবং প্রয়োজনীয় তাজবিদের নিয়ম ধীরে ধীরে শিখুন।",

      tajweedNoteTitle: "গুরুত্বপূর্ণ কথা",
      tajweedNote: "লিখিত উচ্চারণ কেবল সহায়ক। সঠিক তিলাওয়াত শেখার জন্য আরবি পাঠের সঙ্গে নির্ভরযোগ্য ক্বারির তিলাওয়াত মিলিয়ে অনুশীলন করুন।",

      backLinkText: "নামাজের শুরুতে ফিরে যান",
      qiratFooterText: "কিরাত শেখার জন্য এখানে ট্যাপ করুন"
    },

    en: {
      pageTitle: "Learn Qirat",
      pageIntro1: "Qirat in Salah refers to the recitation of prescribed Quranic verses and surahs.",
      pageIntro2: "This page provides Arabic text, pronunciation guidance, and meanings to help you learn Qirat.",

      introTitle: "Introduction to Qirat",
      imagePlaceholder: "Image can be added here",
      introText: "Read the Arabic text carefully first. Then practise the pronunciation and try to understand the meaning.",

      learningNoteTitle: "Learning guidance",
      learningNote: "Pronunciation written in English or another language cannot fully replace correct Arabic articulation. Listen to reliable recitation and, if possible, ask a qualified teacher to check your pronunciation.",

      taawwudhTitle: "Ta'awwudh",
      taawwudhText: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      taawwudhPronunciation: "A'udhu billahi minash-shaytanir-rajim",
      taawwudhMeaning: "Meaning: I seek refuge in Allah from Satan, the accursed.",

      basmalaTitle: "Basmala",
      basmalaText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      basmalaPronunciation: "Bismillahir-Rahmanir-Rahim",
      basmalaMeaning: "Meaning: In the name of Allah, the Most Compassionate, the Most Merciful.",

      pronunciationLabel: "Pronunciation",
      meaningLabel: "Meaning",

      fatihahTitle: "Surah Al-Fatihah",
      fatihahIntro: "Arabic text, pronunciation, and meaning of Surah Al-Fatihah.",

      fatihah1Pronunciation: "Bismillahir-Rahmanir-Rahim",
      fatihah1Meaning: "In the name of Allah, the Most Compassionate, the Most Merciful.",

      fatihah2Pronunciation: "Al-hamdu lillahi Rabbil-'alamin",
      fatihah2Meaning: "All praise belongs to Allah, Lord of all worlds.",

      fatihah3Pronunciation: "Ar-Rahmanir-Rahim",
      fatihah3Meaning: "The Most Compassionate, the Most Merciful.",

      fatihah4Pronunciation: "Maliki yawmid-din",
      fatihah4Meaning: "Master of the Day of Judgment.",

      fatihah5Pronunciation: "Iyyaka na'budu wa iyyaka nasta'in",
      fatihah5Meaning: "You alone we worship, and You alone we ask for help.",

      fatihah6Pronunciation: "Ihdinas-siratal-mustaqim",
      fatihah6Meaning: "Guide us to the straight path.",

      fatihah7Pronunciation: "Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-dallin",
      fatihah7Meaning: "The path of those You have blessed, not those who incurred anger, nor those who went astray.",

      fatihahNote: "Check verse numbering against the numbering used in your printed Mushaf.",

      ikhlasTitle: "Surah Al-Ikhlas",
      ikhlasIntro: "Arabic text, pronunciation, and meaning of Surah Al-Ikhlas.",

      ikhlas1Pronunciation: "Qul huwallahu ahad",
      ikhlas1Meaning: "Say: He is Allah, the One.",

      ikhlas2Pronunciation: "Allahus-samad",
      ikhlas2Meaning: "Allah, the Eternal Refuge.",

      ikhlas3Pronunciation: "Lam yalid wa lam yulad",
      ikhlas3Meaning: "He neither begets nor is born.",

      ikhlas4Pronunciation: "Wa lam yakun lahu kufuwan ahad",
      ikhlas4Meaning: "And there is none comparable to Him.",

      tajweedTitle: "Practising Correct Recitation",
      tajweedText: "Gradually learn the articulation points of Arabic letters, vowel lengths, ghunnah, and relevant Tajweed rules.",

      tajweedNoteTitle: "Important note",
      tajweedNote: "Written pronunciation is only a guide. Practise with the Arabic text alongside a reliable reciter to improve accuracy.",

      backLinkText: "Return to the Namaz introduction",
      qiratFooterText: "Tap here to learn Qirat"
    },

    hi: {
      pageTitle: "किरात सीखें",
      pageIntro1: "नमाज़ में किरात का अर्थ कुरआन की निर्धारित आयतों और सूरहों का पाठ करना है।",
      pageIntro2: "इस पृष्ठ पर किरात सीखने के लिए अरबी पाठ, उच्चारण और अर्थ दिए गए हैं।",

      introTitle: "किरात का परिचय",
      imagePlaceholder: "यहाँ चित्र जोड़ा जा सकता है",
      introText: "पहले अरबी पाठ को ध्यान से पढ़ें। फिर उच्चारण का अभ्यास करें और अर्थ समझने की कोशिश करें।",

      learningNoteTitle: "सीखने के लिए मार्गदर्शन",
      learningNote: "हिंदी या किसी अन्य भाषा में लिखा उच्चारण सही अरबी मख़ारिज़ का पूरा विकल्प नहीं है। विश्वसनीय तिलावत सुनें और संभव हो तो योग्य शिक्षक से उच्चारण जाँच करवाएँ।",

      taawwudhTitle: "तआव्वुज़",
      taawwudhText: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      taawwudhPronunciation: "अऊज़ु बिल्लाहि मिनश्शैतानिर्रजीम",
      taawwudhMeaning: "अर्थ: मैं धिक्कारे हुए शैतान से अल्लाह की शरण माँगता हूँ।",

      basmalaTitle: "बिस्मिल्लाह",
      basmalaText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      basmalaPronunciation: "बिस्मिल्लाहिर्रहमानिर्रहीम",
      basmalaMeaning: "अर्थ: अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",

      pronunciationLabel: "उच्चारण",
      meaningLabel: "अर्थ",

      fatihahTitle: "सूरह अल-फ़ातिहा",
      fatihahIntro: "सूरह अल-फ़ातिहा का अरबी पाठ, उच्चारण और अर्थ।",

      fatihah1Pronunciation: "बिस्मिल्लाहिर्रहमानिर्रहीम",
      fatihah1Meaning: "अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",

      fatihah2Pronunciation: "अल्हम्दु लिल्लाहि रब्बिल आलमीन",
      fatihah2Meaning: "सारी प्रशंसा अल्लाह के लिए है, जो सारे संसारों का पालनहार है।",

      fatihah3Pronunciation: "अर्रहमानिर्रहीम",
      fatihah3Meaning: "जो अत्यंत कृपाशील, परम दयालु है।",

      fatihah4Pronunciation: "मालिकी यौमिद्दीन",
      fatihah4Meaning: "प्रतिफल के दिन का स्वामी।",

      fatihah5Pronunciation: "इय्याका नअबुदु व इय्याका नस्तईन",
      fatihah5Meaning: "हम केवल तेरी ही इबादत करते हैं और केवल तुझसे सहायता माँगते हैं।",

      fatihah6Pronunciation: "इहदिनस्सिरातल मुस्तक़ीम",
      fatihah6Meaning: "हमें सीधे मार्ग पर चला।",

      fatihah7Pronunciation: "सिरातल्लज़ीना अनअमता अलैहिम, ग़ैरिल मग़दूबि अलैहिम वलद़्दाल्लीन",
      fatihah7Meaning: "उन लोगों का मार्ग जिन पर तूने अनुग्रह किया, न कि उनका जिन पर क्रोध हुआ और न भटके हुए लोगों का।",

      fatihahNote: "आयतों की संख्या अपने मुद्रित मुशफ़ में दिए गए क्रम से जाँच लें।",

      ikhlasTitle: "सूरह अल-इख़लास",
      ikhlasIntro: "सूरह अल-इख़लास का अरबी पाठ, उच्चारण और अर्थ।",

      ikhlas1Pronunciation: "क़ुल हुवल्लाहु अहद",
      ikhlas1Meaning: "कहिए: वह अल्लाह एक है।",

      ikhlas2Pronunciation: "अल्लाहुस्समद",
      ikhlas2Meaning: "अल्लाह सबकी ज़रूरतों का सहारा है।",

      ikhlas3Pronunciation: "लम यलिद व लम यूलद",
      ikhlas3Meaning: "न उसने किसी को जन्म दिया और न वह जन्मा।",

      ikhlas4Pronunciation: "व लम यकुल्लहू कुफुवन अहद",
      ikhlas4Meaning: "और उसके बराबर कोई नहीं है।",

      tajweedTitle: "सही तिलावत का अभ्यास",
      tajweedText: "अरबी अक्षरों के मख़ारिज़, स्वर की लंबाई, ग़ुन्ना और आवश्यक तजवीद के नियम धीरे-धीरे सीखें।",

      tajweedNoteTitle: "महत्वपूर्ण बात",
      tajweedNote: "लिखित उच्चारण केवल सहायता के लिए है। सही तिलावत सीखने के लिए अरबी पाठ के साथ विश्वसनीय क़ारी की तिलावत सुनकर अभ्यास करें।",

      backLinkText: "नमाज़ के परिचय पर लौटें",
      qiratFooterText: "किरात सीखने के लिए यहाँ टैप करें"
    }
  };

  /* ---------------------------------------------------------
     SETTINGS
     --------------------------------------------------------- */

  function safelyParseJSON(value) {
    if (!value || typeof value !== "string") return null;

    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  function readSettingsObject() {
    const possibleKeys = [
      "appSettings",
      "settings",
      "userSettings"
    ];

    for (const key of possibleKeys) {
      try {
        const parsed = safelyParseJSON(localStorage.getItem(key));
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (error) {
        // Local storage may be unavailable; continue safely.
      }
    }

    return {};
  }

  function normalizeLanguage(value) {
    if (!value) return DEFAULT_LANGUAGE;

    const language = String(value).toLowerCase().trim();

    if (language.startsWith("en")) return "en";
    if (language.startsWith("hi")) return "hi";
    if (language.startsWith("bn") || language.startsWith("be")) return "bn";

    return DEFAULT_LANGUAGE;
  }

  function readLanguage(settings) {
    let language =
      settings.language ??
      settings.lang ??
      settings.appLanguage ??
      null;

    if (!language) {
      try {
        language =
          localStorage.getItem("language") ||
          localStorage.getItem("appLanguage") ||
          localStorage.getItem("lang");
      } catch (error) {
        language = null;
      }
    }

    if (!language && document.documentElement.lang) {
      language = document.documentElement.lang;
    }

    return normalizeLanguage(language);
  }

  function normalizeTheme(value) {
    const theme = String(value || "light").toLowerCase().trim();

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

  function readTheme(settings) {
    let theme =
      settings.theme ??
      settings.mode ??
      settings.colorScheme ??
      null;

    if (!theme) {
      try {
        theme =
          localStorage.getItem("theme") ||
          localStorage.getItem("appTheme") ||
          localStorage.getItem("colorScheme");
      } catch (error) {
        theme = null;
      }
    }

    return normalizeTheme(theme);
  }

  /* ---------------------------------------------------------
     TRANSLATION
     --------------------------------------------------------- */

  function translatePage(language) {
    const dictionary =
      qiratTranslations[language] ||
      qiratTranslations[DEFAULT_LANGUAGE];

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (!key || !Object.prototype.hasOwnProperty.call(dictionary, key)) {
        return;
      }

      /*
       * Use textContent for safety. Do not place HTML markup
       * inside translation strings.
       */
      element.textContent = dictionary[key];
    });

    document.documentElement.lang = language;

    const titleElement = document.querySelector("title");

    if (titleElement && dictionary.pageTitle) {
      titleElement.textContent = dictionary.pageTitle;
    }

    document.querySelectorAll(".arabic-text").forEach((element) => {
      element.setAttribute("dir", "rtl");
      element.setAttribute("lang", "ar");
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");

      if (key && Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.setAttribute("placeholder", dictionary[key]);
      }
    });

    return dictionary;
  }

  /* ---------------------------------------------------------
     THEME
     --------------------------------------------------------- */

  function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-theme", isDark);
    document.body.classList.toggle("dark-mode", isDark);

    document.documentElement.classList.toggle("dark-theme", isDark);
    document.documentElement.classList.toggle("dark-mode", isDark);

    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );

    document.body.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );

    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#10251e" : "#174b35");
    }
  }

  /* ---------------------------------------------------------
     LOCALIZED NUMBERS
     --------------------------------------------------------- */

  function getDigitMap(language) {
    if (language === "bn") {
      return ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    }

    if (language === "hi") {
      return ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    }

    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }

  function localizeNumber(number, language) {
    const digits = getDigitMap(language);

    return String(number).replace(/[0-9]/g, (digit) => {
      return digits[Number(digit)];
    });
  }

  function updateNumberLabels(language) {
    /*
     * Only update elements explicitly marked for automatic
     * numbering. This avoids overwriting other HTML content.
     *
     * Example:
     * <span class="topic-number" data-number="1"></span>
     * <span class="verse-number" data-number="1"></span>
     */

    document.querySelectorAll("[data-number]").forEach((element) => {
      const rawNumber = element.getAttribute("data-number");

      if (rawNumber && /^[0-9]+$/.test(rawNumber)) {
        element.textContent = localizeNumber(rawNumber, language);
      }
    });
  }

  /* ---------------------------------------------------------
     APPLY SETTINGS
     --------------------------------------------------------- */

  function applyAppSettings() {
    const settings = readSettingsObject();
    const language = readLanguage(settings);
    const theme = readTheme(settings);

    translatePage(language);
    applyTheme(theme);
    updateNumberLabels(language);

    document.documentElement.setAttribute("data-language", language);

    return { language, theme };
  }

  /* ---------------------------------------------------------
     SETTINGS CHANGE EVENTS
     --------------------------------------------------------- */

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
      applyAppSettings();
    }
  });

  /*
   * These custom events can be dispatched by the main app
   * whenever its settings change.
   */
  [
    "appSettingsChanged",
    "settingsChanged",
    "languageChanged",
    "themeChanged"
  ].forEach((eventName) => {
    window.addEventListener(eventName, () => {
      applyAppSettings();
    });
  });

  /* ---------------------------------------------------------
     OPTIONAL APP INTEGRATION
     --------------------------------------------------------- */

  /*
   * The main app may call:
   * window.setQiratLanguage("en");
   * window.setQiratTheme("dark");
   *
   * These functions update the current page immediately.
   */

  window.setQiratLanguage = function (language) {
    const normalized = normalizeLanguage(language);
    translatePage(normalized);
    updateNumberLabels(normalized);

    document.documentElement.setAttribute("data-language", normalized);
  };

  window.setQiratTheme = function (theme) {
    applyTheme(normalizeTheme(theme));
  };

  window.refreshQiratSettings = applyAppSettings;

  /* ---------------------------------------------------------
     INITIALIZE
     --------------------------------------------------------- */

  function initializeQiratPage() {
    applyAppSettings();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeQiratPage, {
      once: true
    });
  } else {
    initializeQiratPage();
  }
})();
