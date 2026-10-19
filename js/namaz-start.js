/* =========================================
   IBADAT — NAMAZ START PAGE
   Bengali / English / Hindi
   Language settings + Dark mode
========================================= */

(() => {
  "use strict";

  const STORAGE_KEY = "appSettings";

  /* =======================================
     TRANSLATIONS
  ======================================= */

  const translations = {
    bn: {
      pageTitle: "নামাজ শুরু করার প্রস্তুতি",
      pageIntro: "নামাজের আগে প্রস্তুতি থেকে তাকবিরে তাহরিমা পর্যন্ত ধাপে ধাপে শিখে নাও।",

      introTitle: "নামাজ শুরু করার আগে",
      introText: "নামাজ আদায়ের আগে পবিত্রতা, সতর ঢাকা, কিবলামুখী হওয়া এবং নামাজের জন্য প্রস্তুত হওয়া জরুরি। এরপর অন্তরে নামাজের নিয়ত করে তাকবিরে তাহরিমার মাধ্যমে নামাজ শুরু করতে হয়।",

      preparationSubtitle: "প্রথম ধাপ",
      preparationTitle: "নামাজের প্রস্তুতি",
      preparationIntroTitle: "নামাজের আগে যা নিশ্চিত করবে",
      preparationIntroText: "নামাজ শুরু করার আগে নিচের বিষয়গুলো খেয়াল করো।",
      preparationChecklistTitle: "প্রস্তুতির তালিকা",
      preparationPoint1: "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা।",
      preparationPoint2: "ওযু থাকা এবং প্রয়োজন হলে গোসল করা।",
      preparationPoint3: "নামাজের সময় হয়েছে কি না নিশ্চিত হওয়া।",
      preparationPoint4: "সতর ঢেকে কিবলামুখী হয়ে দাঁড়ানো।",

      niyyahSubtitle: "দ্বিতীয় ধাপ",
      niyyahTitle: "নামাজের নিয়ত",
      niyyahIntroTitle: "নিয়ত কী?",
      niyyahIntroText: "নিয়ত হলো অন্তরে কোনো ইবাদত করার সংকল্প করা। কোন নামাজ আদায় করবে, তা অন্তরে স্থির করাই মূল বিষয়।",
      niyyahMeaningTitle: "নিয়ত সম্পর্কে মনে রাখবে",
      niyyahMeaningText: "নিয়ত মুখে উচ্চারণ করা আবশ্যক নয়; অন্তরের সংকল্পই নিয়তের মূল বিষয়।",
      niyyahImportantTitle: "গুরুত্বপূর্ণ সতর্কতা",
      niyyahImportantText: "নিয়ত নিয়ে অযথা সন্দেহ বা বারবার একই সংকল্প পুনরাবৃত্তি করে নিজেকে কষ্ট দেবে না।",

      takbirSubtitle: "তৃতীয় ধাপ",
      takbirTitle: "তাকবিরে তাহরিমা",
      takbirIntroTitle: "তাকবিরে তাহরিমা কী?",
      takbirIntroText: "নামাজ শুরু করার সময় আল্লাহু আকবার বলে নামাজে প্রবেশ করাকে তাকবিরে তাহরিমা বলা হয়।",
      takbirHowTitle: "কীভাবে তাকবির বলবে",
      takbirHowText: "নামাজ শুরু করার সময় “আল্লাহু আকবার” বলবে। হাত তোলার পদ্ধতি ও অবস্থান সম্পর্কে নিজের অনুসৃত নির্ভরযোগ্য শিক্ষার নির্দেশনা মেনে চলবে।",
      takbirPronunciationTitle: "উচ্চারণ",
      takbirPronunciationText: "আল্লাহু আকবার",
      takbirMeaningTitle: "অর্থ",
      takbirMeaningText: "আল্লাহ সর্বশ্রেষ্ঠ।",

      sanaTitle: "ছানা পড়া",
      sanaText: "তাকবিরে তাহরিমার পর ছানা পড়া হয়। ছানার প্রচলিত দোয়া নিচে দেওয়া হলো।",

      sanaArabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      sanaPronunciationTitle: "বাংলা উচ্চারণ",
      sanaPronunciationText: "সুবহানাকাল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা'আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুক।",
      sanaMeaningTitle: "অর্থ",
      sanaMeaningText: "হে আল্লাহ! তুমি পবিত্র, তোমারই প্রশংসা। তোমার নাম বরকতময়, তোমার মর্যাদা অতি উচ্চ এবং তুমি ছাড়া কোনো উপাস্য নেই।",

      nextStepsTitle: "এরপর কী করবে?",
      nextStep1: "ছানা পড়ার পর নিজের নামাজের ধরন ও অনুসৃত পদ্ধতি অনুযায়ী পরবর্তী কিরাআত শুরু করবে।",
      nextStep2: "নামাজের প্রতিটি অংশ ধীরস্থিরভাবে এবং মনোযোগ দিয়ে আদায় করবে।",
      nextStep3: "নামাজের ফরজ, ওয়াজিব ও সুন্নত সম্পর্কে নির্ভরযোগ্য শিক্ষা গ্রহণ করবে।",
      nextStep4: "কোনো বিষয়ে সন্দেহ হলে যোগ্য আলেমের কাছে জেনে নেবে।",

      cautionTitle: "গুরুত্বপূর্ণ সতর্কতা",
      cautionText: "নামাজের কিছু নিয়ম মাজহাব ও অনুসৃত ফিকহি পদ্ধতি অনুযায়ী ভিন্ন হতে পারে। তাই নিজের অনুসৃত নির্ভরযোগ্য পদ্ধতি অনুযায়ী শিখবে।",

      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
      footerText: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    },

    en: {
      pageTitle: "Preparing to Begin Salah",
      pageIntro: "Learn step by step, from preparation before prayer to the opening takbir.",

      introTitle: "Before Starting Salah",
      introText: "Before praying, ensure cleanliness, cover the required parts of the body, face the Qiblah, and prepare for prayer. Then make the intention in your heart and begin with the opening takbir.",

      preparationSubtitle: "Step One",
      preparationTitle: "Preparation for Salah",
      preparationIntroTitle: "What to Check Before Salah",
      preparationIntroText: "Keep the following points in mind before beginning your prayer.",
      preparationChecklistTitle: "Preparation Checklist",
      preparationPoint1: "Ensure that your body, clothes, and prayer place are clean.",
      preparationPoint2: "Have wudu, and perform ghusl when required.",
      preparationPoint3: "Make sure the prayer time has begun.",
      preparationPoint4: "Cover the required parts of the body and face the Qiblah.",

      niyyahSubtitle: "Step Two",
      niyyahTitle: "Intention for Salah",
      niyyahIntroTitle: "What Is Niyyah?",
      niyyahIntroText: "Niyyah means forming the intention in your heart to perform an act of worship. The essential point is to establish in your heart which prayer you intend to perform.",
      niyyahMeaningTitle: "Remember About Niyyah",
      niyyahMeaningText: "Uttering the intention aloud is not obligatory; the intention in the heart is the essential part.",
      niyyahImportantTitle: "Important Caution",
      niyyahImportantText: "Do not distress yourself with unnecessary doubts or repeatedly renewing the same intention.",

      takbirSubtitle: "Step Three",
      takbirTitle: "Takbirat al-Ihram",
      takbirIntroTitle: "What Is Takbirat al-Ihram?",
      takbirIntroText: "Entering salah by saying “Allahu Akbar” at its beginning is called Takbirat al-Ihram.",
      takbirHowTitle: "How to Say the Takbir",
      takbirHowText: "At the beginning of salah, say “Allahu Akbar.” Follow the reliable guidance of the school or method you practise regarding raising and positioning the hands.",
      takbirPronunciationTitle: "Pronunciation",
      takbirPronunciationText: "Allahu Akbar",
      takbirMeaningTitle: "Meaning",
      takbirMeaningText: "Allah is the Greatest.",

      sanaTitle: "Reciting the Sana",
      sanaText: "Sana is recited after the opening takbir. A commonly taught supplication is given below.",

      sanaArabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      sanaPronunciationTitle: "Pronunciation",
      sanaPronunciationText: "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk.",
      sanaMeaningTitle: "Meaning",
      sanaMeaningText: "Glory and praise belong to You, O Allah. Blessed is Your name, exalted is Your majesty, and there is no deity besides You.",

      nextStepsTitle: "What Comes Next?",
      nextStep1: "After the Sana, begin the next recitation according to your prayer and the method you follow.",
      nextStep2: "Perform each part of the prayer calmly and attentively.",
      nextStep3: "Learn the obligatory, necessary, and Sunnah acts of prayer from reliable sources.",
      nextStep4: "If you are unsure about something, ask a qualified scholar.",

      cautionTitle: "Important Caution",
      cautionText: "Some details of salah may differ according to the school of jurisprudence and the method followed. Learn according to reliable guidance from your own tradition.",

      footer: "Maintain purity and find peace in worship.",
      footerText: "Maintain purity and find peace in worship."
    },

    hi: {
      pageTitle: "नमाज़ शुरू करने की तैयारी",
      pageIntro: "नमाज़ से पहले की तैयारी से लेकर तकबीरे तहरीमा तक, चरण-दर-चरण सीखें।",

      introTitle: "नमाज़ शुरू करने से पहले",
      introText: "नमाज़ पढ़ने से पहले पाकीज़गी, शरीर के आवश्यक अंगों को ढकना, क़िबला की ओर रुख करना और नमाज़ के लिए तैयार होना ज़रूरी है। फिर दिल में नियत करके तकबीरे तहरीमा से नमाज़ शुरू करें।",

      preparationSubtitle: "पहला चरण",
      preparationTitle: "नमाज़ की तैयारी",
      preparationIntroTitle: "नमाज़ से पहले क्या जाँचें",
      preparationIntroText: "नमाज़ शुरू करने से पहले इन बातों का ध्यान रखें।",
      preparationChecklistTitle: "तैयारी की सूची",
      preparationPoint1: "शरीर, कपड़े और नमाज़ की जगह पाक रखें।",
      preparationPoint2: "वुज़ू की हालत में हों और ज़रूरत होने पर ग़ुस्ल करें।",
      preparationPoint3: "सुनिश्चित करें कि नमाज़ का समय शुरू हो गया है।",
      preparationPoint4: "शरीर के आवश्यक अंगों को ढककर क़िबला की ओर खड़े हों।",

      niyyahSubtitle: "दूसरा चरण",
      niyyahTitle: "नमाज़ की नियत",
      niyyahIntroTitle: "नियत क्या है?",
      niyyahIntroText: "नियत का अर्थ दिल में इबादत करने का इरादा करना है। आप कौन-सी नमाज़ पढ़ रहे हैं, इसे दिल में तय करना मूल बात है।",
      niyyahMeaningTitle: "नियत के बारे में याद रखें",
      niyyahMeaningText: "नियत को ज़ुबान से कहना अनिवार्य नहीं है; दिल का इरादा ही नियत का मूल है।",
      niyyahImportantTitle: "महत्वपूर्ण सावधानी",
      niyyahImportantText: "बेवजह शक करके या बार-बार वही नियत दोहराकर खुद को परेशान न करें।",

      takbirSubtitle: "तीसरा चरण",
      takbirTitle: "तकबीरे तहरीमा",
      takbirIntroTitle: "तकबीरे तहरीमा क्या है?",
      takbirIntroText: "नमाज़ शुरू करते समय “अल्लाहु अकबर” कहकर नमाज़ में प्रवेश करना तकबीरे तहरीमा कहलाता है।",
      takbirHowTitle: "तकबीर कैसे कहें",
      takbirHowText: "नमाज़ शुरू करते समय “अल्लाहु अकबर” कहें। हाथ उठाने और रखने के तरीके के लिए अपने मान्य फ़िक़्ही तरीके की विश्वसनीय शिक्षा का पालन करें।",
      takbirPronunciationTitle: "उच्चारण",
      takbirPronunciationText: "अल्लाहु अकबर",
      takbirMeaningTitle: "अर्थ",
      takbirMeaningText: "अल्लाह सबसे महान है।",

      sanaTitle: "सना पढ़ना",
      sanaText: "तकबीरे तहरीमा के बाद सना पढ़ी जाती है। नीचे एक प्रचलित दुआ दी गई है।",

      sanaArabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      sanaPronunciationTitle: "उच्चारण",
      sanaPronunciationText: "सुब्हानकल्लाहुम्मा व बिहम्दिका, व तबारकस्मुका, व तआला जद्दुका, व ला इलाहा ग़ैरुक।",
      sanaMeaningTitle: "अर्थ",
      sanaMeaningText: "ऐ अल्लाह! तू पाक है और सारी प्रशंसा तेरे लिए है। तेरा नाम बरकत वाला है, तेरी शान बुलंद है और तेरे सिवा कोई उपास्य नहीं।",

      nextStepsTitle: "इसके बाद क्या करें?",
      nextStep1: "सना के बाद अपनी नमाज़ और अपनाए गए तरीके के अनुसार अगली क़िराअत शुरू करें।",
      nextStep2: "नमाज़ के हर भाग को शांति और ध्यान के साथ अदा करें।",
      nextStep3: "विश्वसनीय स्रोतों से नमाज़ के फ़र्ज़, वाजिब और सुन्नत कार्य सीखें।",
      nextStep4: "किसी बात में संदेह हो तो योग्य आलिम से पूछें।",

      cautionTitle: "महत्वपूर्ण सावधानी",
      cautionText: "नमाज़ के कुछ नियम फ़िक़्ही मज़हब और अपनाए गए तरीके के अनुसार अलग हो सकते हैं। अपने तरीके की विश्वसनीय शिक्षा के अनुसार सीखें।",

      footer: "पाकीज़गी बनाए रखें और इबादत में सुकून पाएँ।",
      footerText: "पाकीज़गी बनाए रखें और इबादत में सुकून पाएँ।"
    }
  };

  /* =======================================
     SETTINGS
  ======================================= */

  function readSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
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

    document.title = content.pageTitle || "IBADAT";
  }

  /* =======================================
     INITIALIZE PAGE
  ======================================= */

  function initializePage() {
    applyTheme();
    applyTranslations(getLanguage());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage);
  } else {
    initializePage();
  }

})();
