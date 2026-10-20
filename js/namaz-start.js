/* =========================================================
   IBADAT — NAMAZ START PAGE
   File: namaz-start.js
   Features:
   - Bengali, English and Hindi translations
   - Language from appSettings
   - Dark mode from appSettings
   - Existing HTML data-i18n support
   - Qirat footer link localization
   ========================================================= */

(() => {
  "use strict";

  const translations = {
    bn: {
      pageTitle: "নামাজ শুরু করার নিয়ম",
      pageIntro: "নিয়ত থেকে সানা পর্যন্ত নামাজের শুরুর ধাপগুলো সহজভাবে শিখুন।",
      pageSubtitle: "ধীরে ধীরে শিখুন, বুঝে পড়ুন এবং মনোযোগ ধরে রাখুন।",

      niyyahSubtitle: "প্রথম ধাপ",
      niyyahTitle: "নিয়ত",
      niyyahImageAlt: "নামাজের নিয়ত করার চিত্র",
      niyyahWhatTitle: "নিয়ত কী?",
      niyyahWhatText: "নিয়ত হলো মনে মনে স্থির করা যে আপনি আল্লাহর সন্তুষ্টির জন্য কোন নামাজ আদায় করছেন।",
      niyyahHowTitle: "যেভাবে নিয়ত করবেন",
      niyyahPoint1: "কোন নামাজ পড়বেন, তা মনে মনে নির্দিষ্ট করুন।",
      niyyahPoint2: "নিয়ত মূলত অন্তরের সংকল্প; মুখে নির্দিষ্ট বাক্য বলা আবশ্যক নয়।",
      niyyahPoint3: "নামাজ শুরু করার সময় আপনি কোন নামাজ পড়ছেন, সে বিষয়ে সচেতন থাকুন।",
      niyyahNoteTitle: "মনে রাখুন",
      niyyahNoteText: "নিয়তের জন্য নির্দিষ্ট আরবি বাক্য মুখস্থ করা জরুরি নয়।",

      takbirSubtitle: "দ্বিতীয় ধাপ",
      takbirTitle: "তাকবিরে তাহরিমা",
      takbirImageAlt: "নামাজ শুরু করার তাকবিরের চিত্র",
      takbirWhatTitle: "তাকবির কী?",
      takbirWhatText: "নামাজ শুরুতে আল্লাহর মহত্ত্ব ঘোষণা করে “আল্লাহু আকবার” বলা হয়।",
      takbirHowTitle: "যেভাবে বলবেন",
      takbirHowText: "মনোযোগসহ বলুন:",
      takbirPronunciation: "উচ্চারণ: আল্লাহু আকবার",
      takbirMeaning: "অর্থ: আল্লাহ সর্বশ্রেষ্ঠ।",
      takbirReminderTitle: "খেয়াল রাখুন",
      takbirReminderText: "তাকবির স্পষ্টভাবে বলুন এবং নামাজে মনোযোগী হোন।",

      handsSubtitle: "তৃতীয় ধাপ",
      handsTitle: "হাত বাঁধা",
      handsImageAlt: "নামাজে দাঁড়িয়ে হাত বাঁধার চিত্র",
      handsWhatTitle: "হাত বাঁধার নিয়ম",
      handsWhatText: "তাকবিরের পর নামাজের প্রচলিত পদ্ধতি অনুযায়ী দাঁড়িয়ে হাত রাখুন।",
      handsReminderTitle: "যা মনে রাখবেন",
      handsPoint1: "শান্তভাবে সোজা হয়ে দাঁড়ান।",
      handsPoint2: "হাত রাখার পদ্ধতিতে প্রচলিত শিক্ষায় কিছু পার্থক্য রয়েছে।",
      handsPoint3: "আপনি যে নির্ভরযোগ্য পদ্ধতিতে শিখছেন, সেটি অনুসরণ করুন।",
      handsNoteTitle: "মনে রাখুন",
      handsNoteText: "হাত বাঁধার অবস্থান নিয়ে অযথা বিভ্রান্ত হবেন না; নামাজের আদব ও মনোযোগ বজায় রাখুন।",

      qiyamSubtitle: "চতুর্থ ধাপ",
      qiyamTitle: "কিয়াম",
      qiyamImageAlt: "নামাজে দাঁড়িয়ে থাকার চিত্র",
      qiyamWhatTitle: "কিয়াম কী?",
      qiyamWhatText: "নামাজে দাঁড়িয়ে কিরাত পড়ার অবস্থাকে কিয়াম বলা হয়।",
      qiyamHowTitle: "কিয়ামের সময়",
      qiyamPoint1: "সামর্থ্য অনুযায়ী সোজা হয়ে দাঁড়ান।",
      qiyamPoint2: "দৃষ্টি ও মনোযোগ নামাজের দিকে রাখুন।",
      qiyamPoint3: "শান্তভাবে কিরাত পড়ুন এবং তাড়াহুড়ো করবেন না।",
      qiyamPoint4: "কিরাত শেখার জন্য নিচের “কিরাত শিখো” লিংকে যেতে পারেন।",
      qiyamNoteTitle: "মনে রাখুন",
      qiyamNoteText: "কিয়ামের সময় স্থিরতা ও মনোযোগ বজায় রাখুন।",

      sanaSubtitle: "পঞ্চম ধাপ",
      sanaTitle: "সানা",
      sanaImageAlt: "নামাজের সানা পড়ার নির্দেশনামূলক চিত্র",
      sanaIntroText: "নামাজের শুরুতে সানা পড়া হয়। সানার একটি প্রচলিত পাঠ নিচে দেওয়া হলো।",
      sanaPronunciationTitle: "আরবি ও উচ্চারণ",
      sanaPronunciationText: "সুবহানাকাল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা'আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুক।",
      sanaMeaningTitle: "অর্থ",
      sanaMeaningText: "হে আল্লাহ! আপনি পবিত্র, আপনারই প্রশংসা। আপনার নাম বরকতময়, আপনার মর্যাদা অতি উচ্চ এবং আপনি ছাড়া কোনো সত্য উপাস্য নেই।",
      sanaNoteTitle: "মনে রাখুন",
      sanaNoteText: "সানা ধীরে ধীরে শিখুন। আরবি উচ্চারণ সঠিক করার জন্য নির্ভরযোগ্য শিক্ষক বা অডিওর সাহায্য নিন।",

      cautionTitle: "গুরুত্বপূর্ণ সতর্কতা",
      cautionText: "নামাজের কিছু বিস্তারিত পদ্ধতিতে গ্রহণযোগ্য শিক্ষাগত পার্থক্য থাকতে পারে। নির্ভরযোগ্য উৎস থেকে শিখুন এবং শেখার সময় ধৈর্য ধরুন।",

      qiratLinkLabel: "কিরাত শিখো পৃষ্ঠায় যান",
      qiratLinkText: "কিরাত শিখো"
    },

    en: {
      pageTitle: "How to Begin Salah",
      pageIntro: "Learn the opening steps of Salah, from intention to Sana, in a simple way.",
      pageSubtitle: "Learn gradually, understand what you recite, and stay focused.",

      niyyahSubtitle: "Step One",
      niyyahTitle: "Niyyah — Intention",
      niyyahImageAlt: "Illustration of making the intention for prayer",
      niyyahWhatTitle: "What is Niyyah?",
      niyyahWhatText: "Niyyah means intending in your heart which prayer you are performing for the sake of Allah.",
      niyyahHowTitle: "How to make the intention",
      niyyahPoint1: "Know in your heart which prayer you are about to perform.",
      niyyahPoint2: "Intention is primarily a matter of the heart; a specific spoken formula is not required.",
      niyyahPoint3: "When beginning, be conscious of which prayer you are performing.",
      niyyahNoteTitle: "Remember",
      niyyahNoteText: "You do not need to memorize a specific Arabic sentence to make the intention.",

      takbirSubtitle: "Step Two",
      takbirTitle: "Opening Takbir",
      takbirImageAlt: "Illustration of the opening takbir in prayer",
      takbirWhatTitle: "What is Takbir?",
      takbirWhatText: "At the beginning of Salah, you proclaim Allah's greatness by saying “Allahu Akbar.”",
      takbirHowTitle: "What to say",
      takbirHowText: "Say attentively:",
      takbirPronunciation: "Pronunciation: Allahu Akbar",
      takbirMeaning: "Meaning: Allah is the Greatest.",
      takbirReminderTitle: "Keep in mind",
      takbirReminderText: "Pronounce the takbir clearly and focus on your prayer.",

      handsSubtitle: "Step Three",
      handsTitle: "Folding the Hands",
      handsImageAlt: "Illustration of standing with hands folded in prayer",
      handsWhatTitle: "How to position your hands",
      handsWhatText: "After the opening takbir, stand and position your hands according to the method you have learned.",
      handsReminderTitle: "Remember",
      handsPoint1: "Stand upright and calmly.",
      handsPoint2: "There are differences in established teachings about hand placement.",
      handsPoint3: "Follow a reliable method you are learning.",
      handsNoteTitle: "Keep in mind",
      handsNoteText: "Do not become unnecessarily confused about hand placement. Maintain the manners and focus of prayer.",

      qiyamSubtitle: "Step Four",
      qiyamTitle: "Qiyam — Standing",
      qiyamImageAlt: "Illustration of standing during prayer",
      qiyamWhatTitle: "What is Qiyam?",
      qiyamWhatText: "Qiyam is the standing position in Salah during which recitation is performed.",
      qiyamHowTitle: "During Qiyam",
      qiyamPoint1: "Stand upright according to your ability.",
      qiyamPoint2: "Keep your attention on your prayer.",
      qiyamPoint3: "Recite calmly without rushing.",
      qiyamPoint4: "Use the “Learn Qirat” link below to learn recitation.",
      qiyamNoteTitle: "Remember",
      qiyamNoteText: "Remain steady and attentive while standing.",

      sanaSubtitle: "Step Five",
      sanaTitle: "Sana — Opening Supplication",
      sanaImageAlt: "Instructional illustration for reciting Sana in prayer",
      sanaIntroText: "Sana is recited at the beginning of Salah. One commonly taught version is shown below.",
      sanaPronunciationTitle: "Arabic and pronunciation",
      sanaPronunciationText: "Subhanakallahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk.",
      sanaMeaningTitle: "Meaning",
      sanaMeaningText: "Glory and praise belong to You, O Allah. Blessed is Your name, exalted is Your majesty, and there is no true deity except You.",
      sanaNoteTitle: "Remember",
      sanaNoteText: "Learn Sana gradually. Use a reliable teacher or audio resource to improve your Arabic pronunciation.",

      cautionTitle: "Important Note",
      cautionText: "Some details of prayer practice have recognized differences in teaching. Learn from reliable sources and be patient as you practise.",

      qiratLinkLabel: "Go to the Learn Qirat page",
      qiratLinkText: "Learn Qirat"
    },

    hi: {
      pageTitle: "नमाज़ शुरू करने का तरीका",
      pageIntro: "नीयत से सना तक नमाज़ के शुरुआती चरण आसान तरीके से सीखें।",
      pageSubtitle: "धीरे-धीरे सीखें, पढ़े गए शब्दों को समझें और ध्यान बनाए रखें।",

      niyyahSubtitle: "पहला चरण",
      niyyahTitle: "नीयत",
      niyyahImageAlt: "नमाज़ की नीयत करने का चित्र",
      niyyahWhatTitle: "नीयत क्या है?",
      niyyahWhatText: "नीयत दिल में यह इरादा करना है कि आप अल्लाह की प्रसन्नता के लिए कौन-सी नमाज़ पढ़ रहे हैं।",
      niyyahHowTitle: "नीयत कैसे करें",
      niyyahPoint1: "दिल में तय करें कि आप कौन-सी नमाज़ पढ़ने जा रहे हैं।",
      niyyahPoint2: "नीयत मुख्य रूप से दिल का इरादा है; कोई खास वाक्य बोलना अनिवार्य नहीं है।",
      niyyahPoint3: "नमाज़ शुरू करते समय ध्यान रखें कि आप कौन-सी नमाज़ पढ़ रहे हैं।",
      niyyahNoteTitle: "याद रखें",
      niyyahNoteText: "नीयत के लिए कोई खास अरबी वाक्य याद करना ज़रूरी नहीं है।",

      takbirSubtitle: "दूसरा चरण",
      takbirTitle: "तकबीर-ए-तहरीमा",
      takbirImageAlt: "नमाज़ शुरू करने की तकबीर का चित्र",
      takbirWhatTitle: "तकबीर क्या है?",
      takbirWhatText: "नमाज़ की शुरुआत में अल्लाह की महानता का ऐलान करते हुए “अल्लाहु अकबर” कहा जाता है।",
      takbirHowTitle: "क्या कहें",
      takbirHowText: "ध्यान से कहें:",
      takbirPronunciation: "उच्चारण: अल्लाहु अकबर",
      takbirMeaning: "अर्थ: अल्लाह सबसे महान है।",
      takbirReminderTitle: "ध्यान दें",
      takbirReminderText: "तकबीर स्पष्ट रूप से कहें और नमाज़ पर ध्यान रखें।",

      handsSubtitle: "तीसरा चरण",
      handsTitle: "हाथ बाँधना",
      handsImageAlt: "नमाज़ में हाथ बाँधकर खड़े होने का चित्र",
      handsWhatTitle: "हाथ रखने का तरीका",
      handsWhatText: "तकबीर के बाद खड़े होकर सीखे हुए तरीके के अनुसार हाथ रखें।",
      handsReminderTitle: "याद रखने योग्य बातें",
      handsPoint1: "शांतिपूर्वक सीधे खड़े रहें।",
      handsPoint2: "हाथ रखने के तरीके के बारे में प्रचलित शिक्षाओं में कुछ अंतर हैं।",
      handsPoint3: "किसी विश्वसनीय तरीके से सीखें और उसी का पालन करें।",
      handsNoteTitle: "याद रखें",
      handsNoteText: "हाथ रखने के तरीके को लेकर अनावश्यक उलझन में न पड़ें। नमाज़ के आदाब और ध्यान बनाए रखें।",

      qiyamSubtitle: "चौथा चरण",
      qiyamTitle: "क़ियाम — खड़े होना",
      qiyamImageAlt: "नमाज़ में खड़े होने का चित्र",
      qiyamWhatTitle: "क़ियाम क्या है?",
      qiyamWhatText: "नमाज़ में खड़े होकर क़िरात पढ़ने की अवस्था को क़ियाम कहते हैं।",
      qiyamHowTitle: "क़ियाम के दौरान",
      qiyamPoint1: "अपनी क्षमता के अनुसार सीधे खड़े रहें।",
      qiyamPoint2: "अपना ध्यान नमाज़ पर रखें।",
      qiyamPoint3: "बिना जल्दबाज़ी के शांति से पढ़ें।",
      qiyamPoint4: "क़िरात सीखने के लिए नीचे “क़िरात सीखें” लिंक खोलें।",
      qiyamNoteTitle: "याद रखें",
      qiyamNoteText: "क़ियाम के दौरान स्थिरता और ध्यान बनाए रखें।",

      sanaSubtitle: "पाँचवाँ चरण",
      sanaTitle: "सना",
      sanaImageAlt: "नमाज़ में सना पढ़ने का निर्देशात्मक चित्र",
      sanaIntroText: "नमाज़ की शुरुआत में सना पढ़ी जाती है। नीचे सना का एक प्रचलित पाठ दिया गया है।",
      sanaPronunciationTitle: "अरबी और उच्चारण",
      sanaPronunciationText: "सुब्हानकल्लाहुम्मा व बि-हम्दिका, व तबारकस्मुका, व तआला जद्दुका, व ला इलाहा ग़ैरुक।",
      sanaMeaningTitle: "अर्थ",
      sanaMeaningText: "ऐ अल्लाह! तू पवित्र है और तेरी ही प्रशंसा है। तेरा नाम बरकत वाला है, तेरी महानता बहुत ऊँची है और तेरे सिवा कोई सच्चा पूज्य नहीं।",
      sanaNoteTitle: "याद रखें",
      sanaNoteText: "सना धीरे-धीरे सीखें। अरबी उच्चारण सुधारने के लिए किसी विश्वसनीय शिक्षक या ऑडियो की मदद लें।",

      cautionTitle: "महत्वपूर्ण सावधानी",
      cautionText: "नमाज़ के कुछ विवरणों में मान्य शिक्षागत अंतर हो सकते हैं। विश्वसनीय स्रोतों से सीखें और अभ्यास करते समय धैर्य रखें।",

      qiratLinkLabel: "क़िरात सीखने वाले पृष्ठ पर जाएँ",
      qiratLinkText: "क़िरात सीखें"
    }
  };

  /* -----------------------------------------
     Read saved app settings safely
     ----------------------------------------- */

  function readSettings() {
    try {
      const saved = localStorage.getItem("appSettings");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn("IBADAT: Could not read appSettings.", error);
      return {};
    }
  }

  const settings = readSettings();

  /* -----------------------------------------
     Determine language
     Supports settings.lang and settings.language
     ----------------------------------------- */

  function normalizeLanguage(value) {
    if (!value) return null;

    const language = String(value).toLowerCase().trim();

    if (language === "bn" || language.startsWith("bn-") ||
        language === "bengali" || language === "বাংলা") {
      return "bn";
    }

    if (language === "hi" || language.startsWith("hi-") ||
        language === "hindi" || language === "हिन्दी" ||
        language === "हिंदी") {
      return "hi";
    }

    if (language === "en" || language.startsWith("en-") ||
        language === "english") {
      return "en";
    }

    return null;
  }

  function getCurrentLanguage() {
    const params = new URLSearchParams(window.location.search);

    return (
      normalizeLanguage(params.get("lang")) ||
      normalizeLanguage(settings.lang) ||
      normalizeLanguage(settings.language) ||
      normalizeLanguage(document.documentElement.lang) ||
      "bn"
    );
  }

  let currentLanguage = getCurrentLanguage();

  /* -----------------------------------------
     Apply translated text
     ----------------------------------------- */

  function applyTranslations(language) {
    const dictionary = translations[language] || translations.bn;

    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-language", language);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.getAttribute("data-i18n-aria-label");

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.setAttribute("aria-label", dictionary[key]);
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const key = element.getAttribute("data-i18n-title");

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.setAttribute("title", dictionary[key]);
      }
    });

    const title = dictionary.pageTitle || "IBADAT";

    document.title =
      language === "bn"
        ? `${title} | IBADAT`
        : `${title} | IBADAT`;
  }

  /* -----------------------------------------
     Apply saved theme
     Supports common appSettings theme fields.
     ----------------------------------------- */

  function isDarkModeEnabled(savedSettings) {
    if (typeof savedSettings.dark === "boolean") {
      return savedSettings.dark;
    }

    if (typeof savedSettings.darkMode === "boolean") {
      return savedSettings.darkMode;
    }

    const theme = String(
      savedSettings.theme || savedSettings.mode || ""
    ).toLowerCase();

    return theme === "dark";
  }

  function applyTheme() {
    const darkMode = isDarkModeEnabled(settings);

    document.body.classList.toggle("dark-mode", darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );

    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        darkMode ? "#093B25" : "#0F5132"
      );
    }
  }

  /* -----------------------------------------
     Optional language update function
     Other app code can call:
     window.IBADATNamazStart.setLanguage("en")
     ----------------------------------------- */

  function setLanguage(language) {
    const normalized = normalizeLanguage(language);

    if (!normalized) return false;

    currentLanguage = normalized;
    applyTranslations(currentLanguage);

    return true;
  }

  /* -----------------------------------------
     Initialize page
     ----------------------------------------- */

  function initializePage() {
    applyTranslations(currentLanguage);
    applyTheme();

    document.querySelectorAll(".topic-image img").forEach((image) => {
      image.addEventListener("error", () => {
        image.classList.add("image-load-error");
      }, { once: true });
    });
  }

  window.IBADATNamazStart = {
    setLanguage,
    getLanguage: () => currentLanguage,
    translations
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage, {
      once: true
    });
  } else {
    initializePage();
  }
})();
