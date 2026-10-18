/* ==========================================
   IBADAT — WAQT O RAKAT
   Complete JavaScript
   Bengali / English / Hindi
   Light / Dark Theme
   ========================================== */

(function () {
  "use strict";

  const translations = {
    bn: {
      pageTitle: "ওয়াক্ত ও রাকাত",
      intro: "পাঁচ ওয়াক্ত নামাজের সময়, রাকাত এবং সংশ্লিষ্ট গুরুত্বপূর্ণ তথ্য জেনে নাও।",

      fajrTitle: "ফজর",
      fajrText: "ভোরে সুবহে সাদিক থেকে সূর্য ওঠার আগ পর্যন্ত ফজরের নামাজের সময়।",
      timeLabel: "সময়",
      fajrTime: "সুবহে সাদিক থেকে সূর্যোদয়ের আগ পর্যন্ত",

      zuhrTitle: "যোহর",
      zuhrText: "সূর্য পশ্চিম দিকে ঢলে যাওয়ার পর যোহরের নামাজের সময় শুরু হয়।",
      zuhrTime: "যোহরের ওয়াক্ত শুরু থেকে আসরের ওয়াক্ত শুরু হওয়ার আগ পর্যন্ত",

      asrTitle: "আসর",
      asrText: "বিকেলে আসরের নামাজ আদায় করা হয়।",
      asrTime: "আসরের ওয়াক্ত শুরু থেকে সূর্যাস্তের আগ পর্যন্ত",

      maghribTitle: "মাগরিব",
      maghribText: "সূর্য অস্ত যাওয়ার পর মাগরিবের নামাজের সময় শুরু হয়।",
      maghribTime: "সূর্যাস্তের পর থেকে পশ্চিম আকাশের লাল আভা মিলিয়ে যাওয়ার আগ পর্যন্ত",

      ishaTitle: "ইশা",
      ishaText: "সন্ধ্যার আভা মিলিয়ে যাওয়ার পর ইশার নামাজের সময় শুরু হয়।",
      ishaTime: "ইশার ওয়াক্ত শুরু থেকে সুবহে সাদিকের আগ পর্যন্ত",

      jumuahTitle: "জুমার নামাজ",
      jumuahText: "শুক্রবার যোহরের পরিবর্তে শর্ত পূরণ হলে জামাতে জুমার নামাজ আদায় করা হয়।",
      jumuahLabel: "জুমার ফরজ",
      jumuahNote: "জুমার নামাজের জন্য খুতবা ও জামাতসহ নির্ধারিত শর্ত পূরণ করতে হয়।",

      summaryTitle: "নামাজের রাকাতের সংক্ষিপ্ত তালিকা",
      summaryIntro: "প্রচলিত হানাফি আমল অনুযায়ী সাধারণ রাকাতের একটি সংক্ষিপ্ত তালিকা।",
      thPrayer: "নামাজ",
      thBefore: "আগের সুন্নত",
      thFard: "ফরজ",
      thAfter: "পরের সুন্নত",
      thWitr: "বিতর",
      thNafl: "নফল",

      fajr: "ফজর",
      zuhr: "যোহর",
      asr: "আসর",
      maghrib: "মাগরিব",
      isha: "ইশা",

      fajrNafl: "—",
      zuhrNafl: "—",
      fourOptional: "৪*",
      asrNafl: "—",
      maghribNafl: "—",
      ishaNafl: "—",
      jumuahShort: "জুমা",
      jumuahBefore: "৪ সুন্নত",
      jumuahAfter: "সুন্নত",
      jumuahNafl: "—",
      tableNote: "* কিছু সুন্নত ও নফল রাকাতের সংখ্যা ও আদায়ের ধরন বিষয়ে আলেমদের মধ্যে মতভেদ রয়েছে।",

      naflTitle: "নফল নামাজ সম্পর্কে",
      tahajjudName: "তাহাজ্জুদ",
      tahajjudText: "রাতের শেষ ভাগে আদায় করা উত্তম; ইশার পর থেকে ফজরের আগে পর্যন্ত আদায় করা যায়।",
      ishraqName: "ইশরাক",
      ishraqText: "সূর্য ওঠার পর নিষিদ্ধ সময় শেষ হলে আদায় করা হয়।",
      duhaName: "দুহা বা চাশত",
      duhaText: "সকালে সূর্য বেশ ওপরে ওঠার পর থেকে যোহরের আগ পর্যন্ত আদায় করা হয়।",
      awwabinName: "আওয়াবিন",
      awwabinText: "মাগরিবের পর নফল নামাজ হিসেবে প্রচলিত; রাকাতসংখ্যা নিয়ে মতভেদ আছে।",
      tahiyyatName: "তাহিয়্যাতুল মসজিদ",
      tahiyyatText: "মসজিদে প্রবেশের পর বসার আগে আদায় করা নফল নামাজ, যদি নিষিদ্ধ সময় না হয়।",

      importantTitle: "গুরুত্বপূর্ণ সতর্কতা",
      importantText: "নামাজের সঠিক সময় স্থান ও ঋতুভেদে পরিবর্তিত হয়। নিজের এলাকার নির্ভরযোগ্য নামাজের সময়সূচি অনুসরণ করো। সূর্যোদয়, ঠিক মধ্যাহ্ন ও সূর্যাস্তের সময় নফল নামাজ আদায় থেকে বিরত থাকো। রাকাতসংখ্যা ও কিছু সুন্নত আমলে মাজহাবভেদে পার্থক্য থাকতে পারে।",

      footerText: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    },

    en: {
      pageTitle: "Prayer Times & Rakats",
      intro: "Learn about the five daily prayers, their times, rakats, and important related guidance.",

      fajrTitle: "Fajr",
      fajrText: "Fajr begins at true dawn and ends before sunrise.",
      timeLabel: "Time",
      fajrTime: "From true dawn until before sunrise",

      zuhrTitle: "Zuhr",
      zuhrText: "Zuhr begins after the sun passes its highest point.",
      zuhrTime: "From the start of Zuhr until the start of Asr",

      asrTitle: "Asr",
      asrText: "Asr is the afternoon prayer.",
      asrTime: "From the start of Asr until before sunset",

      maghribTitle: "Maghrib",
      maghribText: "Maghrib begins immediately after sunset.",
      maghribTime: "From sunset until the evening twilight fades",

      ishaTitle: "Isha",
      ishaText: "Isha begins after the evening twilight has disappeared.",
      ishaTime: "From the start of Isha until true dawn",

      jumuahTitle: "Jumu'ah Prayer",
      jumuahText: "On Friday, Jumu'ah is performed in congregation instead of Zuhr when its conditions are fulfilled.",
      jumuahLabel: "Jumu'ah Fard",
      jumuahNote: "Jumu'ah requires its prescribed conditions, including the khutbah and congregation.",

      summaryTitle: "Prayer Rakat Summary",
      summaryIntro: "A brief overview of commonly practised rakats according to the Hanafi tradition.",
      thPrayer: "Prayer",
      thBefore: "Before Sunnah",
      thFard: "Fard",
      thAfter: "After Sunnah",
      thWitr: "Witr",
      thNafl: "Nafl",

      fajr: "Fajr",
      zuhr: "Zuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",

      fajrNafl: "—",
      zuhrNafl: "—",
      fourOptional: "4*",
      asrNafl: "—",
      maghribNafl: "—",
      ishaNafl: "—",
      jumuahShort: "Jumu'ah",
      jumuahBefore: "4 Sunnah",
      jumuahAfter: "Sunnah",
      jumuahNafl: "—",
      tableNote: "* Scholars differ regarding the number and practice of some Sunnah and Nafl rakats.",

      naflTitle: "About Nafl Prayers",
      tahajjudName: "Tahajjud",
      tahajjudText: "Best performed in the last part of the night; it may be prayed after Isha and before Fajr.",
      ishraqName: "Ishraq",
      ishraqText: "Prayed after sunrise once the prohibited time has passed.",
      duhaName: "Duha (Chasht)",
      duhaText: "Prayed in the morning after the sun has risen higher and before Zuhr.",
      awwabinName: "Awwabin",
      awwabinText: "Commonly practised as a voluntary prayer after Maghrib; the number of rakats varies by scholarly view.",
      tahiyyatName: "Tahiyyat al-Masjid",
      tahiyyatText: "A voluntary prayer offered upon entering a mosque before sitting, provided it is not a prohibited time.",

      importantTitle: "Important Note",
      importantText: "Prayer times vary by location and season. Follow a reliable timetable for your area. Avoid voluntary prayers at sunrise, solar noon, and sunset. Rakat counts and some Sunnah practices may differ between schools of Islamic law.",

      footerText: "Maintain purity and find peace through worship."
    },

    hi: {
      pageTitle: "नमाज़ के समय और रकअत",
      intro: "पाँचों वक़्त की नमाज़, उनके समय, रकअत और ज़रूरी जानकारी जानें।",

      fajrTitle: "फ़ज्र",
      fajrText: "फ़ज्र का समय सच्ची सुबह से शुरू होकर सूर्योदय से पहले तक रहता है।",
      timeLabel: "समय",
      fajrTime: "सच्ची सुबह से सूर्योदय से पहले तक",

      zuhrTitle: "ज़ुहर",
      zuhrText: "सूरज ढलने के बाद ज़ुहर का समय शुरू होता है।",
      zuhrTime: "ज़ुहर का समय शुरू होने से अस्र का समय शुरू होने से पहले तक",

      asrTitle: "अस्र",
      asrText: "अस्र की नमाज़ दोपहर के बाद अदा की जाती है।",
      asrTime: "अस्र का समय शुरू होने से सूर्यास्त से पहले तक",

      maghribTitle: "मग़रिब",
      maghribText: "सूर्यास्त के बाद मग़रिब का समय शुरू होता है।",
      maghribTime: "सूर्यास्त के बाद से शाम की लालिमा समाप्त होने तक",

      ishaTitle: "इशा",
      ishaText: "शाम की लालिमा समाप्त होने के बाद इशा का समय शुरू होता है।",
      ishaTime: "इशा का समय शुरू होने से सच्ची सुबह से पहले तक",

      jumuahTitle: "जुमे की नमाज़",
      jumuahText: "शुक्रवार को निर्धारित शर्तें पूरी होने पर ज़ुहर की जगह जमाअत के साथ जुमे की नमाज़ अदा की जाती है।",
      jumuahLabel: "जुमे के फ़र्ज़",
      jumuahNote: "जुमे की नमाज़ के लिए ख़ुत्बा और जमाअत सहित निर्धारित शर्तें पूरी होना ज़रूरी है।",

      summaryTitle: "नमाज़ की रकअतों की सूची",
      summaryIntro: "हनफ़ी परंपरा में प्रचलित रकअतों का संक्षिप्त विवरण।",
      thPrayer: "नमाज़",
      thBefore: "पहले की सुन्नत",
      thFard: "फ़र्ज़",
      thAfter: "बाद की सुन्नत",
      thWitr: "वित्र",
      thNafl: "नफ़्ल",

      fajr: "फ़ज्र",
      zuhr: "ज़ुहर",
      asr: "अस्र",
      maghrib: "मग़रिब",
      isha: "इशा",

      fajrNafl: "—",
      zuhrNafl: "—",
      fourOptional: "४*",
      asrNafl: "—",
      maghribNafl: "—",
      ishaNafl: "—",
      jumuahShort: "जुमा",
      jumuahBefore: "४ सुन्नत",
      jumuahAfter: "सुन्नत",
      jumuahNafl: "—",
      tableNote: "* कुछ सुन्नत और नफ़्ल रकअतों की संख्या और तरीके के बारे में विद्वानों में मतभेद हैं।",

      naflTitle: "नफ़्ल नमाज़ के बारे में",
      tahajjudName: "तहज्जुद",
      tahajjudText: "रात के आख़िरी हिस्से में पढ़ना बेहतर है; इसे इशा के बाद और फ़ज्र से पहले पढ़ सकते हैं।",
      ishraqName: "इशराक़",
      ishraqText: "सूर्योदय के बाद निषिद्ध समय समाप्त होने पर पढ़ी जाती है।",
      duhaName: "दुहा (चाश्त)",
      duhaText: "सुबह सूरज ऊँचा उठने के बाद और ज़ुहर से पहले पढ़ी जाती है।",
      awwabinName: "अव्वाबीन",
      awwabinText: "मग़रिब के बाद नफ़्ल नमाज़ के रूप में प्रचलित है; रकअतों की संख्या पर मतभेद है।",
      tahiyyatName: "तहिय्यतुल मस्जिद",
      tahiyyatText: "मस्जिद में प्रवेश करने के बाद बैठने से पहले पढ़ी जाने वाली नफ़्ल नमाज़, बशर्ते वह निषिद्ध समय न हो।",

      importantTitle: "ज़रूरी सावधानी",
      importantText: "नमाज़ के समय स्थान और मौसम के अनुसार बदलते हैं। अपने क्षेत्र की विश्वसनीय समय-सारणी का पालन करें। सूर्योदय, ठीक दोपहर और सूर्यास्त के समय नफ़्ल नमाज़ न पढ़ें। रकअतों की संख्या और कुछ सुन्नत अमलों में फ़िक़्ही मतभेद हो सकते हैं।",

      footerText: "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।"
    }
  };

  const digitMaps = {
    bn: "০১২৩৪৫৬৭৮৯",
    en: "0123456789",
    hi: "०१२३४५६७८९"
  };

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem("appSettings") || "{}");
    } catch (error) {
      return {};
    }
  }

  function getLanguage() {
    const settings = getSettings();
    const storedLanguage = settings.lang || settings.language || "bn";
    return translations[storedLanguage] ? storedLanguage : "bn";
  }

  function localizeDigits(value, language) {
    const digits = digitMaps[language] || digitMaps.bn;

    return String(value).replace(/[0-9]/g, function (digit) {
      return digits[Number(digit)];
    });
  }

  function applyTranslations(language) {
    const dictionary = translations[language] || translations.bn;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll(".prayer-number[data-number]").forEach(function (element) {
      element.textContent = localizeDigits(element.getAttribute("data-number"), language);
    });

    document.querySelectorAll("[data-digit]").forEach(function (element) {
      const value = element.getAttribute("data-digit");
      element.textContent = localizeDigits(value, language);
    });
  }

  function applyTheme() {
    const settings = getSettings();
    const theme = settings.theme || (settings.dark ? "dark" : "light");

    document.body.classList.toggle(
      "dark-mode",
      theme === "dark" || theme === true
    );
  }

  function init() {
    applyTranslations(getLanguage());
    applyTheme();
  }

  window.refreshWaqtRakatPage = init;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("storage", function (event) {
    if (event.key === "appSettings") {
      init();
    }
  });

  window.addEventListener("languageChanged", init);
  window.addEventListener("themeChanged", init);
})();
