/* ==========================================
   IBADAT — WAQT O RAKAT
   Complete JavaScript
   Bengali / English / Hindi
   Light / Dark Theme
   ========================================== */

(() => {
  "use strict";

  const translations = {
    bn: {
      pageTitle: "ওয়াক্ত ও রাকাত",
      intro: "পাঁচ ওয়াক্ত নামাজের ওয়াক্ত ও রাকাত জানা গুরুত্বপূর্ণ। সঠিক সময়ে নামাজ আদায়ের জন্য নিজের এলাকার নির্ভরযোগ্য সময়সূচি অনুসরণ করো।",
      ribbon: "সঠিক সময়ে নামাজ, জীবনের শান্তি ও বরকতের পথ",

      fajrTitle: "ফজর নামাজ",
      fajrText: "সুবহে সাদিক থেকে সূর্যোদয়ের আগে পর্যন্ত ফজরের ওয়াক্ত। ফজরের ফরজ দুই রাকাত; এর আগে দুই রাকাত সুন্নতে মুয়াক্কাদা পড়া হয়।",
      fajrTime: "সুবহে সাদিক থেকে সূর্যোদয়ের আগে পর্যন্ত",

      zuhrTitle: "যোহর নামাজ",
      zuhrText: "সূর্য পশ্চিম দিকে ঢলে পড়লে যোহরের ওয়াক্ত শুরু হয়। যোহরের ফরজ চার রাকাত। জুমার শর্ত পূরণ হলে জুমার নামাজে ফরজ দুই রাকাত আদায় করা হয়; জুমা যোহরের বিকল্প।",
      zuhrTime: "সূর্য ঢলে পড়ার পর থেকে আসরের ওয়াক্ত শুরু হওয়ার আগে পর্যন্ত",

      asrTitle: "আসর নামাজ",
      asrText: "যোহরের ওয়াক্ত শেষ হওয়ার পর আসরের ওয়াক্ত শুরু হয়। আসরের ফরজ চার রাকাত।",
      asrTime: "আসরের ওয়াক্ত শুরু থেকে সূর্যাস্তের আগে পর্যন্ত",

      maghribTitle: "মাগরিব নামাজ",
      maghribText: "সূর্যাস্তের পর মাগরিবের ওয়াক্ত শুরু হয়। মাগরিবের ফরজ তিন রাকাত। অযথা দেরি না করে নামাজ আদায় করো।",
      maghribTime: "সূর্যাস্তের পর থেকে সন্ধ্যার গোধূলি মিলিয়ে যাওয়ার আগে পর্যন্ত",

      ishaTitle: "এশা নামাজ",
      ishaText: "সন্ধ্যার গোধূলি মিলিয়ে যাওয়ার পর এশার ওয়াক্ত শুরু হয়। এশার ফরজ চার রাকাত; হানাফি মতে বিতর তিন রাকাত।",
      ishaTime: "সন্ধ্যার গোধূলি মিলিয়ে যাওয়ার পর থেকে ফজরের আগে পর্যন্ত",

      timeLabel: "ওয়াক্ত:",
      summaryTitle: "রাকাতের সংক্ষিপ্ত বিবরণ",
      summaryIntro: "পাঁচ ওয়াক্ত নামাজের সুন্নত, ফরজ ও বিতরের প্রচলিত হানাফি বিন্যাস।",
      thPrayer: "নামাজ",
      thBefore: "আগের সুন্নত",
      thFard: "ফরজ",
      thAfter: "পরের সুন্নত",
      thWitr: "বিতর",
      tableNote: "* আসর ও এশার আগে চার রাকাত সুন্নত গায়রে মুয়াক্কাদা। এটি প্রচলিত হানাফি বিন্যাস; অন্যান্য মাজহাবে কিছু পার্থক্য থাকতে পারে।",
      importantTitle: "মনে রাখবে",
      importantText: "নামাজের ওয়াক্ত স্থান ও তারিখ অনুযায়ী বদলে যায়। জুমার নামাজ নির্দিষ্ট শর্তে যোহরের পরিবর্তে আদায় করা হয়। নিজের এলাকার নির্ভরযোগ্য সময়সূচি ও ধর্মীয় নির্দেশনা অনুসরণ করো।",
      footerText: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",

      jumuaTitle: "জুমার নামাজ",
      jumuaText: "শুক্রবার যোহরের ওয়াক্তে জামাতের সঙ্গে জুমার নামাজ আদায় করা হয়। প্রচলিত হানাফি বিধান অনুযায়ী খুতবার পর দুই রাকাত ফরজ পড়া হয়। জুমার শর্ত পূরণ না হলে যোহরের নামাজ আদায় করতে হয়।",
      jumuaTime: "শুক্রবার যোহরের ওয়াক্তে; স্থানীয় মসজিদের সময়সূচি অনুসরণ করো",
      naflTitle: "নফল নামাজ",
      naflText: "নফল নামাজ ঐচ্ছিক ইবাদত। নির্দিষ্ট নফল নামাজের নিয়ম ও সময় আলাদা হতে পারে। নিজের শেখা নির্ভরযোগ্য নির্দেশনা অনুযায়ী আদায় করো।",
      naflTime: "নফল নামাজের ধরন অনুযায়ী সময় ভিন্ন হয়; নিষিদ্ধ সময়গুলো খেয়াল রাখো",
      jumuaNav: "জুমার নামাজ",
      naflNav: "নফল নামাজ"
    },

    en: {
      pageTitle: "Prayer Times & Rakats",
      intro: "Learn the times and rakats of the five daily prayers. Follow a reliable local timetable to pray at the correct time.",
      ribbon: "Pray on time — a path to peace and blessing",

      fajrTitle: "Fajr Prayer",
      fajrText: "Fajr begins at true dawn and ends before sunrise. Its obligatory prayer is two rakats, preceded by two emphasized Sunnah rakats.",
      fajrTime: "From true dawn until before sunrise",

      zuhrTitle: "Zuhr Prayer",
      zuhrText: "Zuhr begins after the sun passes its zenith. Its obligatory prayer is four rakats. When the conditions for Jumu'ah are met, two obligatory rakats of Friday prayer replace Zuhr.",
      zuhrTime: "After solar noon until Asr begins",

      asrTitle: "Asr Prayer",
      asrText: "Asr begins when the Zuhr period ends. Its obligatory prayer is four rakats.",
      asrTime: "From the beginning of Asr until before sunset",

      maghribTitle: "Maghrib Prayer",
      maghribText: "Maghrib begins at sunset. Its obligatory prayer is three rakats. Pray without unnecessary delay.",
      maghribTime: "From sunset until evening twilight disappears",

      ishaTitle: "Isha Prayer",
      ishaText: "Isha begins after evening twilight disappears. Its obligatory prayer is four rakats; Witr is three rakats in the Hanafi school.",
      ishaTime: "After evening twilight disappears until before Fajr",

      timeLabel: "Time:",
      summaryTitle: "Rakat Summary",
      summaryIntro: "A commonly taught Hanafi arrangement of Sunnah, obligatory and Witr rakats.",
      thPrayer: "Prayer",
      thBefore: "Before Sunnah",
      thFard: "Fard",
      thAfter: "After Sunnah",
      thWitr: "Witr",
      tableNote: "* Four rakats before Asr and Isha are non-emphasized Sunnah in the common Hanafi arrangement. Other schools may differ.",
      importantTitle: "Remember",
      importantText: "Prayer times vary by location and date. Friday prayer replaces Zuhr only when its conditions are met. Follow a reliable local timetable and trusted religious guidance.",
      footerText: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",

      jumuaTitle: "Jumu'ah (Friday Prayer)",
      jumuaText: "Jumu'ah is performed in congregation on Friday during Zuhr time. In the common Hanafi practice, two obligatory rakats are performed after the sermon. If the conditions for Jumu'ah are not met, Zuhr is performed instead.",
      jumuaTime: "During Zuhr time on Friday; follow your local mosque's schedule",
      naflTitle: "Nafl Prayers",
      naflText: "Nafl prayers are voluntary acts of worship. Their methods and times vary by type. Follow reliable religious guidance when performing them.",
      naflTime: "The time depends on the type of Nafl prayer; observe prohibited prayer times",
      jumuaNav: "Friday Prayer",
      naflNav: "Nafl Prayers"
    },

    hi: {
      pageTitle: "नमाज़ के वक़्त और रकअत",
      intro: "पाँचों वक़्त की नमाज़ के समय और रकअत जानें। सही समय पर नमाज़ पढ़ने के लिए अपने क्षेत्र की विश्वसनीय समय-सारणी देखें।",
      ribbon: "समय पर नमाज़ — सुकून और बरकत का रास्ता",

      fajrTitle: "फ़ज्र की नमाज़",
      fajrText: "सच्ची सुबह से सूर्योदय से पहले तक फ़ज्र का वक़्त है। फ़र्ज़ दो रकअत हैं और उनसे पहले दो सुन्नते मुअक्कदा रकअत पढ़ी जाती हैं।",
      fajrTime: "सच्ची सुबह से सूर्योदय से पहले तक",

      zuhrTitle: "ज़ुहर की नमाज़",
      zuhrText: "सूरज ढलने के बाद ज़ुहर का वक़्त शुरू होता है। फ़र्ज़ चार रकअत हैं। जुमे की शर्तें पूरी होने पर ज़ुहर के बदले जुमे की दो फ़र्ज़ रकअत अदा की जाती हैं।",
      zuhrTime: "सूरज ढलने के बाद से अस्र शुरू होने तक",

      asrTitle: "अस्र की नमाज़",
      asrText: "ज़ुहर का वक़्त समाप्त होने के बाद अस्र शुरू होता है। फ़र्ज़ चार रकअत हैं।",
      asrTime: "अस्र के वक़्त से सूर्यास्त से पहले तक",

      maghribTitle: "मग़रिब की नमाज़",
      maghribText: "सूर्यास्त के बाद मग़रिब का वक़्त शुरू होता है। फ़र्ज़ तीन रकअत हैं। बिना अनावश्यक देरी के नमाज़ पढ़ें।",
      maghribTime: "सूर्यास्त से शाम की लाली समाप्त होने तक",

      ishaTitle: "इशा की नमाज़",
      ishaText: "शाम की लाली समाप्त होने के बाद इशा शुरू होता है। फ़र्ज़ चार रकअत हैं; हनफ़ी मत में वितर तीन रकअत हैं।",
      ishaTime: "शाम की लाली समाप्त होने से फ़ज्र से पहले तक",

      timeLabel: "वक़्त:",
      summaryTitle: "रकअत का संक्षिप्त विवरण",
      summaryIntro: "सुन्नत, फ़र्ज़ और वितर रकअतों की प्रचलित हनफ़ी व्यवस्था।",
      thPrayer: "नमाज़",
      thBefore: "पहले की सुन्नत",
      thFard: "फ़र्ज़",
      thAfter: "बाद की सुन्नत",
      thWitr: "वितर",
      tableNote: "* अस्र और इशा से पहले चार रकअत ग़ैर-मुअक्कदा सुन्नत हैं। अन्य फ़िक़्ही मतों में कुछ अंतर हो सकता है।",
      importantTitle: "ध्यान रखें",
      importantText: "नमाज़ के वक़्त स्थान और तारीख़ के अनुसार बदलते हैं। जुमे की नमाज़ शर्तें पूरी होने पर ही ज़ुहर की जगह अदा की जाती है। विश्वसनीय स्थानीय समय-सारणी और धार्मिक मार्गदर्शन अपनाएँ।",
      footerText: "पवित्रता बनाए रखें, इबादत में सुकून पाएँ।",

      jumuaTitle: "जुमे की नमाज़",
      jumuaText: "शुक्रवार को ज़ुहर के वक़्त जमात के साथ जुमे की नमाज़ अदा की जाती है। प्रचलित हनफ़ी अमल में ख़ुत्बे के बाद दो फ़र्ज़ रकअत पढ़ी जाती हैं। जुमे की शर्तें पूरी न हों तो ज़ुहर की नमाज़ अदा की जाती है।",
      jumuaTime: "शुक्रवार को ज़ुहर के वक़्त; स्थानीय मस्जिद की समय-सारणी देखें",
      naflTitle: "नफ़्ल नमाज़",
      naflText: "नफ़्ल नमाज़ स्वैच्छिक इबादत है। अलग-अलग नफ़्ल नमाज़ के तरीके और समय अलग हो सकते हैं। विश्वसनीय धार्मिक मार्गदर्शन का पालन करें।",
      naflTime: "समय नफ़्ल नमाज़ के प्रकार पर निर्भर करता है; निषिद्ध समय का ध्यान रखें",
      jumuaNav: "जुमे की नमाज़",
      naflNav: "नफ़्ल नमाज़"
    }
  };

  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem("appSettings") || "{}");
    } catch (error) {
      return {};
    }
  }

  function applyLanguage(language) {
    const dictionary = translations[language] || translations.bn;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      }
    });

    document.title = `${dictionary.pageTitle} | IBADAT`;
  }

  function applyTheme(settings) {
    const theme = String(
      settings.theme || (settings.dark ? "dark" : "light")
    ).toLowerCase();

    const isDark =
      settings.dark === true ||
      settings.dark === "true" ||
      theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        isDark ? "#102820" : "#f5f0df"
      );
    }
  }

  function refreshPage() {
    const settings = readSettings();
    const savedLanguage = String(settings.lang || "bn").toLowerCase();
    const language = translations[savedLanguage] ? savedLanguage : "bn";

    applyLanguage(language);
    applyTheme(settings);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refreshPage);
  } else {
    refreshPage();
  }

  window.addEventListener("storage", (event) => {
    if (event.key === "appSettings") {
      refreshPage();
    }
  });

  window.refreshWaqtRakatPage = refreshPage;
})();
