
/* =====================================
   IBADAT — Waqt o Rakat
   Complete JavaScript
   Bengali + English + Hindi
===================================== */

(() => {
  "use strict";

  const translations = {
    bn: {
      eyebrow: "নামাজ শিক্ষা",
      pageTitle: "ওয়াক্ত ও রাকাত",
      intro: "পাঁচ ওয়াক্ত নামাজের ওয়াক্ত ও রাকাত জানা গুরুত্বপূর্ণ। সঠিক সময়ে নামাজ আদায়ের জন্য নিজের এলাকার নির্ভরযোগ্য সময়সূচি অনুসরণ করো।",
      ribbon: "সঠিক সময়ে নামাজ, জীবনের শান্তি ও বরকতের পথ",
      learnTitle: "এই পেজে যা শিখবে",
      fajr: "ফজর",
      zuhr: "যোহর",
      asr: "আসর",
      maghrib: "মাগরিব",
      isha: "এশা",
      summaryNav: "রাকাতের সারসংক্ষেপ",

      fajrTitle: "ফজর নামাজ",
      fajrText: "সুবহে সাদিক থেকে সূর্যোদয়ের আগে পর্যন্ত ফজরের ওয়াক্ত। ফজরের ফরজ দুই রাকাত; এর আগে দুই রাকাত সুন্নত পড়া হয়।",
      fajrTime: "সুবহে সাদিক থেকে সূর্যোদয়ের আগে পর্যন্ত",

      zuhrTitle: "যোহর নামাজ",
      zuhrText: "সূর্য মধ্য আকাশ থেকে পশ্চিম দিকে ঢলে পড়লে যোহরের ওয়াক্ত শুরু হয়। যোহরের ফরজ চার রাকাত।",
      zuhrTime: "সূর্য ঢলে পড়ার পর থেকে আসরের ওয়াক্ত শুরু হওয়ার আগে পর্যন্ত",

      asrTitle: "আসর নামাজ",
      asrText: "যোহরের ওয়াক্ত শেষ হওয়ার পর আসরের ওয়াক্ত শুরু হয়। আসরের ফরজ চার রাকাত। ওয়াক্তের মধ্যে নামাজ আদায় করবে।",
      asrTime: "আসরের ওয়াক্ত শুরু থেকে সূর্যাস্তের আগে পর্যন্ত",

      maghribTitle: "মাগরিব নামাজ",
      maghribText: "সূর্যাস্তের পর মাগরিবের ওয়াক্ত শুরু হয়। মাগরিবের ফরজ তিন রাকাত। অযথা দেরি না করে নামাজ আদায় করা হয়।",
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
      tableNote: "* আসর ও এশার আগে চার রাকাত সুন্নত গায়রে মুয়াক্কাদা। এখানে প্রচলিত হানাফি বিন্যাস দেখানো হয়েছে।",
      importantTitle: "মনে রাখবে",
      importantText: "নামাজের ওয়াক্ত স্থান ও তারিখ অনুযায়ী বদলে যায়। নিজের এলাকার নির্ভরযোগ্য সময়সূচি অনুসরণ করবে।",
      footerText: "জ্ঞান অর্জন করো, সুন্দরভাবে আমল করো"
    },

    en: {
      eyebrow: "LEARN SALAH",
      pageTitle: "Prayer Times & Rakats",
      intro: "Knowing the prayer times and rakats is important. Follow a reliable local timetable to pray at the correct time.",
      ribbon: "Pray on time — a path to peace and blessing",
      learnTitle: "What you will learn",
      fajr: "Fajr",
      zuhr: "Zuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
      summaryNav: "Rakat summary",

      fajrTitle: "Fajr Prayer",
      fajrText: "Fajr begins at true dawn and ends before sunrise. The obligatory prayer is two rakats, preceded by two Sunnah rakats.",
      fajrTime: "From true dawn until before sunrise",

      zuhrTitle: "Zuhr Prayer",
      zuhrText: "Zuhr begins after the sun passes its zenith. The obligatory prayer is four rakats.",
      zuhrTime: "After solar noon until Asr begins",

      asrTitle: "Asr Prayer",
      asrText: "Asr begins after the Zuhr period ends. The obligatory prayer is four rakats.",
      asrTime: "From the beginning of Asr until before sunset",

      maghribTitle: "Maghrib Prayer",
      maghribText: "Maghrib begins at sunset. Its obligatory prayer is three rakats. It is generally prayed without unnecessary delay.",
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
      tableNote: "* Four rakats before Asr and Isha are non-emphasized Sunnah. This table follows a common Hanafi arrangement.",
      importantTitle: "Remember",
      importantText: "Prayer times vary by location and date. Follow a reliable local timetable.",
      footerText: "Seek knowledge and practice beautifully"
    },

    hi: {
      eyebrow: "नमाज़ की शिक्षा",
      pageTitle: "नमाज़ के वक़्त और रकअत",
      intro: "नमाज़ के वक़्त और रकअत जानना ज़रूरी है। सही समय पर नमाज़ पढ़ने के लिए अपने क्षेत्र की विश्वसनीय समय-सारणी देखें।",
      ribbon: "समय पर नमाज़ — सुकून और बरकत का रास्ता",
      learnTitle: "इस पेज पर क्या सीखेंगे",
      fajr: "फ़ज्र",
      zuhr: "ज़ुहर",
      asr: "अस्र",
      maghrib: "मग़रिब",
      isha: "इशा",
      summaryNav: "रकअत का सारांश",

      fajrTitle: "फ़ज्र की नमाज़",
      fajrText: "सच्ची सुबह से सूर्योदय से पहले तक फ़ज्र का वक़्त है। फ़र्ज़ दो रकअत हैं और उनसे पहले दो सुन्नत रकअत पढ़ी जाती हैं।",
      fajrTime: "सच्ची सुबह से सूर्योदय से पहले तक",

      zuhrTitle: "ज़ुहर की नमाज़",
      zuhrText: "सूरज ढलने के बाद ज़ुहर का वक़्त शुरू होता है। फ़र्ज़ चार रकअत हैं।",
      zuhrTime: "सूरज ढलने के बाद से अस्र शुरू होने तक",

      asrTitle: "अस्र की नमाज़",
      asrText: "ज़ुहर का वक़्त समाप्त होने के बाद अस्र शुरू होता है। फ़र्ज़ चार रकअत हैं।",
      asrTime: "अस्र के वक़्त से सूर्यास्त से पहले तक",

      maghribTitle: "मग़रिब की नमाज़",
      maghribText: "सूर्यास्त के बाद मग़रिब का वक़्त शुरू होता है। फ़र्ज़ तीन रकअत हैं।",
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
      tableNote: "* अस्र और इशा से पहले चार रकअत ग़ैर-मुअक्कदा सुन्नत हैं। यह तालिका आम हनफ़ी व्यवस्था पर आधारित है।",
      importantTitle: "ध्यान रखें",
      importantText: "नमाज़ के वक़्त स्थान और तारीख़ के अनुसार बदलते हैं। अपने क्षेत्र की विश्वसनीय समय-सारणी देखें।",
      footerText: "ज्ञान प्राप्त करें और अच्छे ढंग से अमल करें"
    }
  };

  function readSettings() {
    try {
      const saved = localStorage.getItem("appSettings");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn("IBADAT settings could not be read.", error);
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
    const isDark =
      settings.dark === true ||
      settings.dark === "true" ||
      settings.theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);
  }

  function init() {
    const settings = readSettings();
    const savedLanguage = String(settings.lang || "bn").toLowerCase();
    const language = translations[savedLanguage] ? savedLanguage : "bn";

    applyLanguage(language);
    applyTheme(settings);
  }

  init();

  // অন্য পেজ থেকে ভাষা বা থিম পরিবর্তনের পর চাইলে কল করা যাবে।
  window.refreshWaqtRakatPage = init;
})();
