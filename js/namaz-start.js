/* ==========================================
   IBADAT — NAMAZ START
   Bengali | English | Hindi
   Saved Language | Dark Mode
   ========================================== */

"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";
  const ASSET_BASE = "../assets/";

  const page = document.querySelector(".namaz-start-page");

  if (!page) {
    console.warn("IBADAT: Namaz Start page not found.");
    return;
  }

  /* ---------- LANGUAGE SETTINGS ---------- */

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (error) {
      console.warn("IBADAT: Could not read settings.", error);
      return {};
    }
  }

  function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    const requestedLanguage = params.get("lang");
    const savedLanguage = getSettings().lang;

    const language = requestedLanguage || savedLanguage || "bn";

    return ["bn", "en", "hi"].includes(language)
      ? language
      : "bn";
  }

  let currentLanguage = getLanguage();

  /* ---------- PAGE CONTENT ---------- */

  const content = {
    bn: {
      pageTitle: "নামাজ শুরু | IBADAT",
      description:
        "নিয়ত, তাকবিরে তাহরিমা এবং নামাজ শুরু করার নিয়ম ধাপে ধাপে শিখুন।",

      heroTitle: "নামাজ শুরু",
      heroText:
        "নিয়ত থেকে তাকবিরে তাহরিমা পর্যন্ত নামাজ শুরু করার প্রাথমিক নিয়মগুলো শিখুন।",

      preparation: {
        subtitle: "প্রথম পাঠ",
        title: "নামাজের প্রস্তুতি",
        intro:
          "নামাজ শুরু করার আগে ওয়াক্ত, পবিত্রতা, পোশাক ও নামাজের স্থান সম্পর্কে নিশ্চিত হও।",
        heading: "নামাজের আগে যা যাচাই করবে",
        points: [
          "নামাজের নির্ধারিত ওয়াক্ত হয়েছে কি না নিশ্চিত হও।",
          "প্রয়োজন অনুযায়ী অজু, গোসল বা তায়াম্মুমের মাধ্যমে পবিত্রতা অর্জন করো।",
          "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখো এবং সতর ঢেকে নাও।",
          "কিবলামুখী হয়ে মনোযোগসহ নামাজের জন্য প্রস্তুত হও।"
        ]
      },

      intention: {
        subtitle: "দ্বিতীয় পাঠ",
        title: "নিয়ত",
        intro:
          "নিয়ত হলো কোন নামাজ আদায় করবে, তা অন্তরে স্থির করা।",
        heading: "নিয়ত করার নিয়ম",
        points: [
          "কোন নামাজ আদায় করবে, তা মনে নির্দিষ্ট করো।",
          "নিয়তের জন্য নির্দিষ্ট আরবি বাক্য মুখে বলা আবশ্যক নয়।",
          "ইমামের পেছনে নামাজ পড়লে জামাতে শরিক হওয়ার বিষয়টিও মনে রাখো।"
        ]
      },

      takbir: {
        subtitle: "তৃতীয় পাঠ",
        title: "তাকবিরে তাহরিমা",
        intro:
          "‘আল্লাহু আকবার’ বলে নামাজ শুরু করাকে তাকবিরে তাহরিমা বলা হয়।",
        heading: "তাকবিরে তাহরিমার নিয়ম",
        points: [
          "সক্ষম হলে সোজা হয়ে দাঁড়িয়ে কিবলামুখী হও।",
          "নামাজ শুরু করার সময় ‘আল্লাহু আকবার’ বলো।",
          "তাকবিরের মাধ্যমে নামাজে প্রবেশ করার পর নামাজের নির্ধারিত নিয়ম মেনে চলো।"
        ],
        arabic: "اللّٰهُ أَكْبَرُ",
        pronunciation: "আল্লাহু আকবার",
        meaning: "অর্থ: আল্লাহ সর্বশ্রেষ্ঠ।"
      },

      nextHeading: "এরপর কী করবে?",
      nextText:
        "তাকবিরে তাহরিমার পর নামাজের নিয়ম অনুযায়ী সানা পড়বে। এরপর কিরাতসহ পরবর্তী কাজগুলো ধারাবাহিকভাবে আদায় করবে।",

      cautionHeading: "মনে রাখবে",
      cautionText:
        "এগুলো নামাজ শেখার প্রাথমিক নির্দেশনা। বিস্তারিত বিধানে মাজহাব ও পরিস্থিতি অনুযায়ী পার্থক্য থাকতে পারে। সঠিক পদ্ধতি নির্ভরযোগ্য আলেম বা শিক্ষকের কাছ থেকে শিখে নাও।",

      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    },

    en: {
      pageTitle: "Starting Salah | IBADAT",
      description:
        "Learn the intention, opening takbir and the basic steps for beginning Salah.",

      heroTitle: "Starting Salah",
      heroText:
        "Learn the essential steps for beginning Salah, from intention to the opening takbir.",

      preparation: {
        subtitle: "Lesson One",
        title: "Preparation for Salah",
        intro:
          "Before starting Salah, check the prayer time, purification, clothing and prayer area.",
        heading: "Before you begin",
        points: [
          "Make sure the prescribed prayer time has begun.",
          "Purify yourself through wudu, ghusl or tayammum when required.",
          "Ensure your body, clothing and prayer area are clean, and cover the required parts of the body.",
          "Face the Qiblah and prepare to pray attentively."
        ]
      },

      intention: {
        subtitle: "Lesson Two",
        title: "Intention (Niyyah)",
        intro:
          "Niyyah means having the intention in your heart to perform a particular prayer.",
        heading: "Making the intention",
        points: [
          "Know in your heart which prayer you are about to perform.",
          "Saying a specific Arabic formula aloud is not required for the intention itself.",
          "If praying behind an imam, keep your participation in the congregation in mind."
        ]
      },

      takbir: {
        subtitle: "Lesson Three",
        title: "Opening Takbir",
        intro:
          "The opening declaration ‘Allahu Akbar’ marks the beginning of Salah.",
        heading: "How to begin",
        points: [
          "Stand upright facing the Qiblah if you are able to stand.",
          "Begin the prayer by saying ‘Allahu Akbar’.",
          "After entering Salah with the opening takbir, follow the prescribed rules of prayer."
        ],
        arabic: "اللّٰهُ أَكْبَرُ",
        pronunciation: "Allahu Akbar",
        meaning: "Meaning: Allah is the Greatest."
      },

      nextHeading: "What comes next?",
      nextText:
        "After the opening takbir, recite the opening supplication (Sana) according to the method you follow, then continue with the prescribed recitation and actions of Salah.",

      cautionHeading: "Remember",
      cautionText:
        "These are introductory learning guidelines. Some details may vary by school of thought and circumstance. Learn the correct method from a trusted scholar or teacher.",

      footer: "Preserve purity and find peace in worship."
    },

    hi: {
      pageTitle: "नमाज़ की शुरुआत | IBADAT",
      description:
        "नमाज़ की नियत, तकबीर-ए-तहरीमा और शुरुआत के बुनियादी तरीक़े सीखें।",

      heroTitle: "नमाज़ की शुरुआत",
      heroText:
        "नियत से लेकर तकबीर-ए-तहरीमा तक नमाज़ शुरू करने के बुनियादी तरीक़े सीखें।",

      preparation: {
        subtitle: "पहला पाठ",
        title: "नमाज़ की तैयारी",
        intro:
          "नमाज़ शुरू करने से पहले वक़्त, पाक-सफ़ाई, कपड़ों और नमाज़ की जगह की जाँच करें।",
        heading: "शुरू करने से पहले",
        points: [
          "सुनिश्चित करें कि नमाज़ का निर्धारित वक़्त शुरू हो गया है।",
          "ज़रूरत के अनुसार वुज़ू, ग़ुस्ल या तयम्मुम से पाकी हासिल करें।",
          "शरीर, कपड़े और नमाज़ की जगह को पाक रखें तथा ज़रूरी अंग ढकें।",
          "क़िबले की ओर मुँह करके ध्यान के साथ नमाज़ के लिए तैयार हों।"
        ]
      },

      intention: {
        subtitle: "दूसरा पाठ",
        title: "नियत",
        intro:
          "नियत का अर्थ है दिल में यह तय करना कि कौन-सी नमाज़ अदा करनी है।",
        heading: "नियत करने का तरीक़ा",
        points: [
          "दिल में तय करें कि कौन-सी नमाज़ अदा करनी है।",
          "नियत के लिए किसी ख़ास अरबी वाक्य को ज़ोर से कहना ज़रूरी नहीं है।",
          "इमाम के पीछे नमाज़ पढ़ते समय जमाअत में शामिल होने का इरादा भी रखें।"
        ]
      },

      takbir: {
        subtitle: "तीसरा पाठ",
        title: "तकबीर-ए-तहरीमा",
        intro:
          "‘अल्लाहु अकबर’ कहकर नमाज़ शुरू करने को तकबीर-ए-तहरीमा कहते हैं।",
        heading: "तकबीर-ए-तहरीमा का तरीक़ा",
        points: [
          "यदि खड़े हो सकते हैं, तो सीधे खड़े होकर क़िबले की ओर मुँह करें।",
          "‘अल्लाहु अकबर’ कहकर नमाज़ शुरू करें।",
          "तकबीर के बाद नमाज़ के निर्धारित नियमों का पालन करें।"
        ],
        arabic: "اللّٰهُ أَكْبَرُ",
        pronunciation: "अल्लाहु अकबर",
        meaning: "अर्थ: अल्लाह सबसे महान है।"
      },

      nextHeading: "इसके बाद क्या करें?",
      nextText:
        "तकबीर-ए-तहरीमा के बाद अपने तरीक़े के अनुसार सना पढ़ें। फिर क़िराअत और नमाज़ के अगले काम क्रम से अदा करें।",

      cautionHeading: "याद रखें",
      cautionText:
        "ये नमाज़ सीखने के शुरुआती निर्देश हैं। फ़िक़्ही विवरण मज़हब और परिस्थिति के अनुसार अलग हो सकते हैं। सही तरीक़ा किसी भरोसेमंद आलिम या शिक्षक से सीखें।",

      footer: "पाकी बनाए रखें, इबादत में सुकून पाएँ।"
    }
  };

  /* ---------- TEXT HELPERS ---------- */

  function getText() {
    return content[currentLanguage] || content.bn;
  }

  function setText(selector, value) {
    const element = page.querySelector(selector);

    if (element && typeof value === "string") {
      element.textContent = value;
    }
  }

  function setList(selector, items) {
    const list = page.querySelector(selector);

    if (!list || !Array.isArray(items)) {
      return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      fragment.appendChild(li);
    });

    list.replaceChildren(fragment);
  }

  /* ---------- BUILD PAGE TEXT ---------- */

  function buildPage() {
    const text = getText();

    document.documentElement.lang = currentLanguage;
    document.title = text.pageTitle;

    const description = document.querySelector(
      'meta[name="description"]'
    );

    if (description) {
      description.setAttribute("content", text.description);
    }

    setText(".hero-content h1", text.heroTitle);
    setText(".hero-content p", text.heroText);

    setText("#preparation-subtitle", text.preparation.subtitle);
    setText("#preparation-title", text.preparation.title);
    setText("#preparation-intro", text.preparation.intro);
    setText("#preparation-heading", text.preparation.heading);
    setList("#preparation-list", text.preparation.points);

    setText("#intention-subtitle", text.intention.subtitle);
    setText("#intention-title", text.intention.title);
    setText("#intention-intro", text.intention.intro);
    setText("#intention-heading", text.intention.heading);
    setList("#intention-list", text.intention.points);

    setText("#takbir-subtitle", text.takbir.subtitle);
    setText("#takbir-title", text.takbir.title);
    setText("#takbir-intro", text.takbir.intro);
    setText("#takbir-heading", text.takbir.heading);
    setList("#takbir-list", text.takbir.points);

    setText("#takbir-arabic", text.takbir.arabic);
    setText("#takbir-pronunciation", text.takbir.pronunciation);
    setText("#takbir-meaning", text.takbir.meaning);

    setText("#next-heading", text.nextHeading);
    setText("#next-text", text.nextText);

    setText("#caution-heading", text.cautionHeading);
    setText("#caution-text", text.cautionText);

    setText(".page-footer p", text.footer);

    page.querySelectorAll("[data-language-label]").forEach((element) => {
      const key = element.dataset.languageLabel;

      if (text[key]) {
        element.textContent = text[key];
      }
    });
  }

  /* ---------- DARK MODE ---------- */

  function applyTheme() {
    const settings = getSettings();

    document.body.classList.toggle(
      "dark-mode",
      Boolean(settings.dark)
    );
  }

  /* ---------- IMAGE CHECK ---------- */

  function checkImages() {
    page.querySelectorAll(".topic-image img").forEach((image) => {
      image.addEventListener("error", () => {
        image.classList.add("image-load-error");
        console.warn("IBADAT: Image could not be loaded:", image.src);
      });

      image.addEventListener("load", () => {
        image.classList.remove("image-load-error");
      });

      if (image.complete && image.naturalWidth === 0) {
        image.classList.add("image-load-error");
      }
    });
  }

  /* ---------- LANGUAGE REFRESH ---------- */

  function refreshNamazStartPage() {
    currentLanguage = getLanguage();
    applyTheme();
    buildPage();
  }

  window.refreshNamazStartPage = refreshNamazStartPage;

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      refreshNamazStartPage();
    }
  });

  /* ---------- INITIALIZE ---------- */

  function initialize() {
    applyTheme();
    buildPage();
    checkImages();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
