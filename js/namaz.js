"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";
  const ASSET_BASE = "../assets/";

  function getAppSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (error) {
      console.warn("IBADAT: Could not read app settings.", error);
      return {};
    }
  }

  function normalizeLanguage(language) {
    return ["bn", "en", "hi"].includes(language) ? language : "bn";
  }

  function getCurrentLanguage() {
    const params = new URLSearchParams(window.location.search);
    const settings = getAppSettings();

    return normalizeLanguage(
      params.get("lang") ||
      settings.lang ||
      settings.language ||
      "bn"
    );
  }

  let currentLanguage = getCurrentLanguage();

  const NAMAZ_ROUTES = {
    "kalima-aqeedah": "namaz-kalima-aqeedah.html",
    "arabic-learning": "namaz-qaida-arabic.html",
    "purity": "namaz-purity.html",
    "conditions": "namaz-conditions.html",
    "times-rakats": "namaz-waqt-rakat.html",
    "islamic-rulings": "namaz-islamic-rulings.html",
    "start": "namaz-start.html",
    "qirat": "namaz-qirat.html",
    "ruku-sujood": "namaz-ruku-sujood.html",
    "sitting-salam": "namaz-baithak-salam.html",
    "complete": "namaz-complete.html",
    "jamaat-jumuah": "namaz-jamaat-jumuah.html",
    "special-prayers": "namaz-special-prayers.html",
    "daily-amal": "namaz-daily-amal.html"
  };

  const topics = [
    {
      id: "kalima-aqeedah",
      icon: "kalima-aqeedah.png",
      title: {
        bn: "কালিমা ও আকিদা",
        en: "Kalima & Aqeedah",
        hi: "कलिमा और अकीदा"
      }
    },
    {
      id: "arabic-learning",
      icon: "arabic-learning.png",
      title: {
        bn: "আরবি শিক্ষা",
        en: "Arabic Learning",
        hi: "अरबी शिक्षा"
      }
    },
    {
      id: "purity",
      icon: "purity.png",
      title: {
        bn: "পাক-পবিত্রতা",
        en: "Purification",
        hi: "पाक-सफ़ाई"
      }
    },
    {
      id: "conditions",
      icon: "prayer-conditions.png",
      title: {
        bn: "নামাজের শর্ত",
        en: "Prayer Conditions",
        hi: "नमाज़ की शर्तें"
      }
    },
    {
      id: "times-rakats",
      icon: "waqt-rakat.png",
      title: {
        bn: "ওয়াক্ত ও রাকাত",
        en: "Prayer Times & Rakats",
        hi: "नमाज़ के वक़्त और रकअत"
      }
    },
    {
      id: "islamic-rulings",
      icon: "islamic-rulings.png",
      title: {
        bn: "ইসলামিক বিধান",
        en: "Islamic Rulings",
        hi: "इस्लामी नियम"
      }
    },
    {
      id: "start",
      icon: "prayer-start.png",
      title: {
        bn: "নামাজ শুরু",
        en: "Starting Prayer",
        hi: "नमाज़ की शुरुआत"
      }
    },
    {
      id: "qirat",
      icon: "qirat.png",
      title: {
        bn: "কিরাত",
        en: "Qira'at",
        hi: "क़िराअत"
      }
    },
    {
      id: "ruku-sujood",
      icon: "ruku.png",
      title: {
        bn: "রুকু ও সিজদা",
        en: "Ruku & Sujood",
        hi: "रुकू और सज्दा"
      }
    },
    {
      id: "sitting-salam",
      icon: "tashahhud.png",
      title: {
        bn: "বৈঠক ও সালাম",
        en: "Sitting & Salam",
        hi: "बैठक और सलाम"
      }
    },
    {
      id: "complete",
      icon: "complete-namaz.png",
      title: {
        bn: "সম্পূর্ণ নামাজ",
        en: "Complete Prayer",
        hi: "पूरी नमाज़"
      }
    },
    {
      id: "jamaat-jumuah",
      icon: "jamaat-special-namaz.png",
      title: {
        bn: "জামাত ও জুমা",
        en: "Jamaat & Jumu'ah",
        hi: "जमाअत और जुमा"
      }
    },
    {
      id: "special-prayers",
      icon: "complete-namaz.png",
      title: {
        bn: "বিশেষ নামাজ",
        en: "Special Prayers",
        hi: "विशेष नमाज़ें"
      }
    },
    {
      id: "daily-amal",
      icon: "daily-amal.png",
      title: {
        bn: "দৈনন্দিন আমল",
        en: "Daily Practices",
        hi: "दैनिक अमल"
      }
    }
  ];

  const introduction = {
    bn: {
      heading: "কী ও কেন ?",
      paragraph:
        "নামাজ ইসলামের অন্যতম প্রধান ইবাদত, যা আল্লাহর স্মরণে হৃদয়কে প্রশান্ত করে। এটি মুমিনের জীবনে শৃঙ্খলা আনে এবং সৃষ্টিকর্তার নৈকট্য লাভের পথ সুগম করে।",
      ariaLabel: "নামাজ সম্পর্কে পরিচিতি"
    },
    en: {
      heading: "What & Why?",
      paragraph:
        "Salah is one of the most important acts of worship in Islam. It brings remembrance of Allah, peace to the heart, and discipline to daily life.",
      ariaLabel: "Introduction to Salah"
    },
    hi: {
      heading: "क्या और क्यों?",
      paragraph:
        "नमाज़ इस्लाम की प्रमुख इबादतों में से एक है। यह अल्लाह की याद, दिल का सुकून और जीवन में अनुशासन लाती है।",
      ariaLabel: "नमाज़ का परिचय"
    }
  };

  function getText(textObject) {
    return textObject[currentLanguage] || textObject.bn || "";
  }

  function applySavedTheme() {
    const settings = getAppSettings();
    document.body.classList.toggle("dark-mode", Boolean(settings.dark));
  }

  function buildIntroduction() {
    const intro = introduction[currentLanguage] || introduction.bn;

    const heading = document.getElementById("intro-title");
    const paragraph = document.getElementById("intro-paragraph-1");
    const board = document.querySelector(".intro-board");

    if (heading) {
      heading.textContent = intro.heading;
    }

    if (paragraph) {
      paragraph.textContent = intro.paragraph;
    }

    if (board) {
      board.setAttribute("aria-label", intro.ariaLabel);
    }

    document.documentElement.lang = currentLanguage;

    const pageTitles = {
      bn: "নামাজ শিক্ষা | IBADAT",
      en: "Learn Salah | IBADAT",
      hi: "नमाज़ शिक्षा | IBADAT"
    };

    document.title = pageTitles[currentLanguage];
  }

  function openTopic(topic) {
    const page = NAMAZ_ROUTES[topic.id];

    if (!page) {
      console.error("IBADAT: No route configured for", topic.id);
      return;
    }

    const destination = new URL(page, window.location.href);
    destination.searchParams.set("lang", currentLanguage);

    window.location.href = destination.href;
  }

  function buildLearningGrid() {
    const grid = document.getElementById("learning-grid");

    if (!grid) {
      console.error("IBADAT: Learning grid was not found.");
      return;
    }

    const fragment = document.createDocumentFragment();

    topics.forEach((topic) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "learning-card";
      button.dataset.topic = topic.id;
      button.setAttribute("aria-label", getText(topic.title));

      const icon = document.createElement("img");

      icon.className = "topic-icon";
      icon.src = ASSET_BASE + topic.icon;
      icon.alt = "";
      icon.loading = "eager";
      icon.decoding = "async";
      icon.draggable = false;

      icon.addEventListener("error", () => {
        button.classList.add("icon-missing");
        console.warn("IBADAT: Icon not found:", icon.src);
      }, { once: true });

      const label = document.createElement("span");
      label.textContent = getText(topic.title);

      button.append(icon, label);

      button.addEventListener("click", () => {
        openTopic(topic);
      });

      fragment.appendChild(button);
    });

    grid.replaceChildren(fragment);
  }

  function refreshNamazPage() {
    currentLanguage = getCurrentLanguage();
    applySavedTheme();
    buildIntroduction();
    buildLearningGrid();
  }

  window.refreshNamazLanguage = refreshNamazPage;

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      refreshNamazPage();
    }
  });

  function initializeNamazPage() {
    applySavedTheme();
    buildIntroduction();
    buildLearningGrid();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeNamazPage,
      { once: true }
    );
  } else {
    initializeNamazPage();
  }
})();
