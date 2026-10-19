/* =========================================
   IBADAT — NAMAZ START PAGE
   Bengali / English / Hindi
   Language + Dark Mode
========================================= */

(() => {
  "use strict";

  const STORAGE_KEY = "appSettings";

  /* =======================================
     TRANSLATIONS
  ======================================= */

  const translations = {
    bn: {
      pageTitle: "নামাজ শুরু",
      pageIntro:
        "নামাজের প্রস্তুতি থেকে তাকবিরে তাহরিমা ও সানা পর্যন্ত ধাপে ধাপে শিখে নাও।",

      introTitle: "নামাজ শুরু করার আগে",
      introText:
        "নামাজের আগে পবিত্রতা, সতর ঢাকা, কিবলামুখী হওয়া এবং নামাজের জন্য প্রস্তুত হওয়া জরুরি। এরপর অন্তরে নিয়ত করে তাকবিরে তাহরিমার মাধ্যমে নামাজ শুরু করো।",

      preparationSubtitle: "প্রথম ধাপ",
      preparationTitle: "নামাজের প্রস্তুতি",
      preparationImageAlt:
        "নামাজের প্রস্তুতি নিচ্ছে এমন এক মুসলিম বালক",
      preparationIntroTitle: "নামাজের আগে যা নিশ্চিত করবে",
      preparationIntroText:
        "নামাজ শুরু করার আগে প্রয়োজনীয় বিষয়গুলো নিশ্চিত করো।",
      preparationChecklistTitle: "প্রস্তুতির তালিকা",
      preparationPoint1:
        "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখো।",
      preparationPoint2:
        "অজু করো এবং প্রয়োজন হলে গোসল করো।",
      preparationPoint3:
        "নামাজের ওয়াক্ত হয়েছে কি না নিশ্চিত করো।",
      preparationPoint4:
        "সতর ঢেকে কিবলামুখী হয়ে দাঁড়াও।",

      niyyahSubtitle: "দ্বিতীয় ধাপ",
      niyyahTitle: "নামাজের নিয়ত",
      niyyahImageAlt:
        "নামাজের নিয়ত মনে স্থির করছে এমন এক মুসলিম বালক",
      niyyahIntroTitle: "নিয়ত কী?",
      niyyahIntroText:
        "নিয়ত হলো অন্তরে ইবাদত করার সংকল্প করা। কোন নামাজ আদায় করবে, তা মনে স্থির রাখো।",
      niyyahMeaningTitle: "নিয়ত সম্পর্কে মনে রাখবে",
      niyyahMeaningText:
        "নিয়তের মূল স্থান অন্তর। নির্দিষ্ট আরবি বাক্য মুখে বলা নিয়তের অপরিহার্য শর্ত নয়।",
      niyyahImportantTitle: "গুরুত্বপূর্ণ সতর্কতা",
      niyyahImportantText:
        "অযথা সন্দেহ করে একই নিয়ত বারবার পুনরাবৃত্তি করে নিজেকে কষ্ট দেবে না।",

      takbirSubtitle: "তৃতীয় ধাপ",
      takbirTitle: "তাকবিরে তাহরিমা",
      takbirImageAlt:
        "নামাজ শুরু করার সময় দুই হাত তুলছে এমন এক মুসলিম বালক",
      takbirIntroTitle: "তাকবিরে তাহরিমা কী?",
      takbirIntroText:
        "নামাজ শুরু করার সময় আল্লাহু আকবার বলে নামাজে প্রবেশ করাকে তাকবিরে তাহরিমা বলে।",
      takbirHowTitle: "কীভাবে তাকবির বলবে?",
      takbirHowText:
        "নামাজ শুরু করার সময় বলো:",
      takbirPronunciationText: "আল্লাহু আকবার",
      takbirMeaningText: "অর্থ: আল্লাহ সর্বশ্রেষ্ঠ।",

      sanaSubtitle: "চতুর্থ ধাপ",
      sanaTitle: "সানা পড়া",
      sanaText:
        "তাকবিরে তাহরিমার পর সানা পড়া হয়। সানার প্রচলিত দোয়াটি শিখে নাও।",
      sanaArabic:
        "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      sanaPronunciationTitle: "বাংলা উচ্চারণ",
      sanaPronunciationText:
        "সুবহানাকাল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা'আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুক।",
      sanaMeaningTitle: "অর্থ",
      sanaMeaningText:
        "হে আল্লাহ! আপনি পবিত্র, আপনারই প্রশংসা। আপনার নাম বরকতময়, আপনার মর্যাদা অতি উচ্চ এবং আপনি ছাড়া কোনো সত্য উপাস্য নেই।",

      nextStepsSubtitle: "পঞ্চম ধাপ",
      nextStepsTitle: "সানার পরের ধাপ",
      nextStep1: "বিসমিল্লাহ বলো।",
      nextStep2: "সূরা ফাতিহা পড়ো।",
      nextStep3: "সূরা ফাতিহার পর নির্ধারিত কিরাত পড়ো।",
      nextStep4:
        "এরপর রুকু, সিজদা ও পরবর্তী ধাপগুলো সম্পন্ন করো।",

      cautionTitle: "গুরুত্বপূর্ণ সতর্কতা",
      cautionText:
        "নামাজের নিয়ম নির্ভরযোগ্য ইসলামী শিক্ষা থেকে শিখবে। কোনো বিষয়ে সংশয় থাকলে যোগ্য আলেমের পরামর্শ নাও।",

      footerText:
        "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    },

    en: {
      pageTitle: "Beginning Salah",
      pageIntro:
        "Learn step by step, from preparation to the opening takbir and Sana.",

      introTitle: "Before Starting Salah",
      introText:
        "Before praying, ensure purity, cover the required parts of the body, face the Qiblah, and prepare for prayer. Then make the intention in your heart and begin with the opening takbir.",

      preparationSubtitle: "Step One",
      preparationTitle: "Preparation for Salah",
      preparationImageAlt:
        "A Muslim boy preparing for prayer",
      preparationIntroTitle: "What to Check Before Salah",
      preparationIntroText:
        "Check the essential requirements before beginning your prayer.",
      preparationChecklistTitle: "Preparation Checklist",
      preparationPoint1:
        "Keep your body, clothes, and prayer place clean.",
      preparationPoint2:
        "Perform wudu and take a ritual bath when required.",
      preparationPoint3:
        "Make sure the prayer time has begun.",
      preparationPoint4:
        "Cover the required parts of your body and face the Qiblah.",

      niyyahSubtitle: "Step Two",
      niyyahTitle: "Intention for Salah",
      niyyahImageAlt:
        "A Muslim boy forming his intention to pray",
      niyyahIntroTitle: "What Is Niyyah?",
      niyyahIntroText:
        "Niyyah means forming the intention in your heart to worship. Keep in mind which prayer you intend to perform.",
      niyyahMeaningTitle: "Remember About Niyyah",
      niyyahMeaningText:
        "The intention is made in the heart. Saying a specific Arabic formula aloud is not an essential requirement of intention.",
      niyyahImportantTitle: "Important Caution",
      niyyahImportantText:
        "Do not distress yourself by repeatedly renewing the same intention because of unnecessary doubts.",

      takbirSubtitle: "Step Three",
      takbirTitle: "Opening Takbir",
      takbirImageAlt:
        "A Muslim boy raising his hands at the beginning of prayer",
      takbirIntroTitle: "What Is the Opening Takbir?",
      takbirIntroText:
        "Entering salah by saying Allahu Akbar at its beginning is called the opening takbir.",
      takbirHowTitle: "How to Say the Takbir",
      takbirHowText:
        "At the beginning of salah, say:",
      takbirPronunciationText: "Allahu Akbar",
      takbirMeaningText: "Meaning: Allah is the Greatest.",

      sanaSubtitle: "Step Four",
      sanaTitle: "Reciting the Sana",
      sanaText:
        "Sana is recited after the opening takbir. Learn the commonly recited supplication below.",
      sanaArabic:
        "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      sanaPronunciationTitle: "Pronunciation",
      sanaPronunciationText:
        "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk.",
      sanaMeaningTitle: "Meaning",
      sanaMeaningText:
        "Glory and praise belong to You, O Allah. Blessed is Your name, exalted is Your majesty, and there is no true deity besides You.",

      nextStepsSubtitle: "Step Five",
      nextStepsTitle: "What Comes After Sana?",
      nextStep1: "Say Bismillah.",
      nextStep2: "Recite Surah Al-Fatihah.",
      nextStep3:
        "After Al-Fatihah, recite the additional Quranic passage.",
      nextStep4:
        "Then proceed with ruku, sujud, and the following steps of prayer.",

      cautionTitle: "Important Caution",
      cautionText:
        "Learn the rules of salah from reliable Islamic sources. If you are unsure about a matter, consult a qualified scholar.",

      footerText:
        "Maintain purity and find peace in worship."
    },

    hi: {
      pageTitle: "नमाज़ शुरू करना",
      pageIntro:
        "नमाज़ की तैयारी से लेकर तकबीरे तहरीमा और सना तक, चरण-दर-चरण सीखें।",

      introTitle: "नमाज़ शुरू करने से पहले",
      introText:
        "नमाज़ से पहले पाकीज़गी, शरीर के आवश्यक अंगों को ढकना, क़िबला की ओर रुख करना और नमाज़ के लिए तैयार होना ज़रूरी है। फिर दिल में नियत करके तकबीरे तहरीमा से नमाज़ शुरू करें।",

      preparationSubtitle: "पहला चरण",
      preparationTitle: "नमाज़ की तैयारी",
      preparationImageAlt:
        "नमाज़ की तैयारी करता हुआ एक मुस्लिम लड़का",
      preparationIntroTitle: "नमाज़ से पहले क्या जाँचें",
      preparationIntroText:
        "नमाज़ शुरू करने से पहले ज़रूरी बातों की पुष्टि करें।",
      preparationChecklistTitle: "तैयारी की सूची",
      preparationPoint1:
        "शरीर, कपड़े और नमाज़ की जगह पाक रखें।",
      preparationPoint2:
        "वुज़ू करें और ज़रूरत होने पर ग़ुस्ल करें।",
      preparationPoint3:
        "सुनिश्चित करें कि नमाज़ का समय शुरू हो गया है।",
      preparationPoint4:
        "शरीर के आवश्यक अंगों को ढककर क़िबला की ओर खड़े हों।",

      niyyahSubtitle: "दूसरा चरण",
      niyyahTitle: "नमाज़ की नियत",
      niyyahImageAlt:
        "नमाज़ की नियत दिल में करने वाला एक मुस्लिम लड़का",
      niyyahIntroTitle: "नियत क्या है?",
      niyyahIntroText:
        "नियत का अर्थ दिल में इबादत करने का इरादा करना है। आप कौन-सी नमाज़ पढ़ रहे हैं, इसे दिल में तय करें।",
      niyyahMeaningTitle: "नियत के बारे में याद रखें",
      niyyahMeaningText:
        "नियत का मूल स्थान दिल है। नियत के लिए किसी खास अरबी वाक्य को ज़ुबान से कहना अनिवार्य नहीं है।",
      niyyahImportantTitle: "महत्वपूर्ण सावधानी",
      niyyahImportantText:
        "बेवजह शक करके एक ही नियत को बार-बार दोहराकर खुद को परेशान न करें।",

      takbirSubtitle: "तीसरा चरण",
      takbirTitle: "तकबीरे तहरीमा",
      takbirImageAlt:
        "नमाज़ शुरू करते समय हाथ उठाता हुआ एक मुस्लिम लड़का",
      takbirIntroTitle: "तकबीरे तहरीमा क्या है?",
      takbirIntroText:
        "नमाज़ शुरू करते समय अल्लाहु अकबर कहकर नमाज़ में प्रवेश करना तकबीरे तहरीमा कहलाता है।",
      takbirHowTitle: "तकबीर कैसे कहें?",
      takbirHowText:
        "नमाज़ शुरू करते समय कहें:",
      takbirPronunciationText: "अल्लाहु अकबर",
      takbirMeaningText: "अर्थ: अल्लाह सबसे महान है।",

      sanaSubtitle: "चौथा चरण",
      sanaTitle: "सना पढ़ना",
      sanaText:
        "तकबीरे तहरीमा के बाद सना पढ़ी जाती है। नीचे दी गई प्रचलित दुआ सीखें।",
      sanaArabic:
        "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      sanaPronunciationTitle: "उच्चारण",
      sanaPronunciationText:
        "सुब्हानकल्लाहुम्मा व बिहम्दिका, व तबारकस्मुका, व तआला जद्दुका, व ला इलाहा ग़ैरुक।",
      sanaMeaningTitle: "अर्थ",
      sanaMeaningText:
        "ऐ अल्लाह! तू पाक है और सारी प्रशंसा तेरे लिए है। तेरा नाम बरकत वाला है, तेरी शान बुलंद है और तेरे सिवा कोई सच्चा उपास्य नहीं।",

      nextStepsSubtitle: "पाँचवाँ चरण",
      nextStepsTitle: "सना के बाद क्या करें?",
      nextStep1: "बिस्मिल्लाह कहें।",
      nextStep2: "सूरह अल-फ़ातिहा पढ़ें।",
      nextStep3:
        "अल-फ़ातिहा के बाद क़ुरआन का अगला निर्धारित पाठ पढ़ें।",
      nextStep4:
        "फिर रुकू, सज्दा और नमाज़ के अगले चरण पूरे करें।",

      cautionTitle: "महत्वपूर्ण सावधानी",
      cautionText:
        "नमाज़ के नियम विश्वसनीय इस्लामी स्रोतों से सीखें। किसी विषय में संदेह हो तो योग्य आलिम से सलाह लें।",

      footerText:
        "पाकीज़गी बनाए रखें और इबादत में सुकून पाएँ।"
    }
  };

  /* =======================================
     SETTINGS
  ======================================= */

  function readSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  function getLanguage() {
    const settings = readSettings();
    const params = new URLSearchParams(window.location.search);
    const urlLanguage = params.get("lang");

    const language = (
      urlLanguage ||
      settings.lang ||
      settings.language ||
      "bn"
    ).toLowerCase();

    return translations[language] ? language : "bn";
  }

  function applyTheme() {
    const settings = readSettings();
    const darkMode = Boolean(settings.dark);

    document.body.classList.toggle("dark-mode", darkMode);
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }

  /* =======================================
     APPLY TRANSLATIONS
  ======================================= */

  function applyTranslations(language) {
    const content = translations[language] || translations.bn;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (Object.prototype.hasOwnProperty.call(content, key)) {
        element.textContent = content[key];
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.dataset.i18nAlt;

      if (Object.prototype.hasOwnProperty.call(content, key)) {
        element.setAttribute("alt", content[key]);
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;

      if (Object.prototype.hasOwnProperty.call(content, key)) {
        element.setAttribute("placeholder", content[key]);
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const key = element.dataset.i18nTitle;

      if (Object.prototype.hasOwnProperty.call(content, key)) {
        element.setAttribute("title", content[key]);
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;

      if (Object.prototype.hasOwnProperty.call(content, key)) {
        element.setAttribute("aria-label", content[key]);
      }
    });

    document.title = `${content.pageTitle} | IBADAT`;
  }

  /* =======================================
     INITIALIZE
  ======================================= */

  function initializePage() {
    applyTheme();
    applyTranslations(getLanguage());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage, {
      once: true
    });
  } else {
    initializePage();
  }
})();
