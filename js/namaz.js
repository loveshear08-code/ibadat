/* =====================================================
   IBADAT — NAMAZ LEARNING PAGE
   18 Topics | Bengali / English / Hindi
   Light & Dark Theme | Central Route Map
   ===================================================== */

"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";
  const ASSET_BASE = "../assets/";

  /* ---------- SETTINGS ---------- */

  function getAppSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (error) {
      console.warn("Could not read app settings:", error);
      return {};
    }
  }

  function normalizeLanguage(language) {
    return ["bn", "en", "hi"].includes(language) ? language : "bn";
  }

  let currentLanguage = normalizeLanguage(
    getAppSettings().lang || "bn"
  );

  /* ---------- CENTRAL ROUTE MAP ---------- */

  /*
    Every topic has its own destination.
    Create the remaining HTML pages later using these filenames.
  */

  const NAMAZ_ROUTES = {
    "purity": "namaz-purity.html",
    "conditions": "namaz-conditions.html",
    "times-rakats": "namaz-waqt-rakats.html",
    "fard-wajib-sunnah": "namaz-rulings.html",
    "start": "namaz-start.html",
    "qirat": "namaz-qirat.html",
    "ruku": "namaz-ruku.html",
    "sujood": "namaz-sujood.html",
    "tashahhud": "namaz-tashahhud.html",
    "after-prayer": "namaz-after-prayer.html",
    "complete": "namaz-complete.html",
    "gender-prayer": "namaz-gender-prayer.html",
    "mistakes": "namaz-mistakes.html",
    "jamaat-special": "namaz-jamaat-special.html",
    "kalima-aqeedah": "namaz-kalima-aqeedah.html",
    "daily-amal": "namaz-daily-amal.html",
    "qaida-arabic-reading": "namaz-qaida-arabic.html",
    "islamic-rulings": "namaz-islamic-rulings.html"
  };

  /* ---------- 18 LEARNING TOPICS ---------- */

  const topics = [
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
      icon: "prayer-times-rakats.png",
      title: {
        bn: "ওয়াক্ত ও রাকাত",
        en: "Prayer Times & Rakats",
        hi: "नमाज़ के वक़्त और रकअत"
      }
    },
    {
      id: "fard-wajib-sunnah",
      icon: "farz-wajib-sunnah.png",
      title: {
        bn: "ফরজ, ওয়াজিব ও সুন্নত",
        en: "Fard, Wajib & Sunnah",
        hi: "फ़र्ज़, वाजिब और सुन्नत"
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
      id: "ruku",
      icon: "ruku.png",
      title: {
        bn: "রুকু",
        en: "Ruku",
        hi: "रुकू"
      }
    },
    {
      id: "sujood",
      icon: "sijda.png",
      title: {
        bn: "সিজদা",
        en: "Sujood",
        hi: "सज्दा"
      }
    },
    {
      id: "tashahhud",
      icon: "tashahhud.png",
      title: {
        bn: "বৈঠক ও দোয়া",
        en: "Sitting & Duas",
        hi: "बैठक और दुआएँ"
      }
    },
    {
      id: "after-prayer",
      icon: "salam-after-prayer.png",
      title: {
        bn: "সালাম ও পরের আমল",
        en: "Salam & After Prayer",
        hi: "सलाम और बाद के अमल"
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
      id: "gender-prayer",
      icon: "men-women-prayer.png",
      title: {
        bn: "নারী-পুরুষের নামাজ",
        en: "Prayer for Men & Women",
        hi: "पुरुषों और महिलाओं की नमाज़"
      }
    },
    {
      id: "mistakes",
      icon: "prayer-mistakes.png",
      title: {
        bn: "ভুল ও সংশোধন",
        en: "Mistakes & Corrections",
        hi: "गलतियाँ और सुधार"
      }
    },
    {
      id: "jamaat-special",
      icon: "jamaat-special-namaz.png",
      title: {
        bn: "জামাত ও বিশেষ নামাজ",
        en: "Jamaat & Special Prayers",
        hi: "जमाअत और विशेष नमाज़ें"
      }
    },
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
      id: "daily-amal",
      icon: "daily-amal.png",
      title: {
        bn: "দৈনন্দিন আমল",
        en: "Daily Practices",
        hi: "दैनिक अमल"
      }
    },
    {
      id: "qaida-arabic-reading",
      icon: "qaida-arabic-reading.png",
      title: {
        bn: "কায়দা ও আরবি পড়া",
        en: "Qaida & Arabic Reading",
        hi: "क़ायदा और अरबी पढ़ना"
      }
    },
    {
      id: "islamic-rulings",
      icon: "islamic-rulings.png",
      title: {
        bn: "ইসলামি বিধান",
        en: "Islamic Rulings",
        hi: "इस्लामी नियम"
      }
    }
  ];

  /* ---------- INTRODUCTION BOARD TEXT ---------- */

  const introduction = {
    bn: {
      heading: "কী ও কেন?",
      paragraph1:
        "নামাজ ইসলামের অন্যতম প্রধান ইবাদত। আল্লাহর সন্তুষ্টি অর্জনের জন্য প্রত্যেক মুসলিমের নামাজ আদায় করা গুরুত্বপূর্ণ।",
      paragraph2:
        "পাক-পবিত্রতা থেকে সালাম পর্যন্ত নামাজের নিয়ম, দোয়া ও প্রয়োজনীয় বিষয়গুলো ধাপে ধাপে শিখুন।",
      ariaLabel: "নামাজ সম্পর্কে পরিচিতি পড়ুন"
    },

    en: {
      heading: "What & Why?",
      paragraph1:
        "Salah is one of the most important acts of worship in Islam. Performing Salah is essential for a Muslim seeking the pleasure of Allah.",
      paragraph2:
        "Learn the steps of prayer, from purification to Salam, including essential rules and duas.",
      ariaLabel: "Open the prayer introduction"
    },

    hi: {
      heading: "क्या और क्यों?",
      paragraph1:
        "नमाज़ इस्लाम की सबसे महत्वपूर्ण इबादतों में से एक है। अल्लाह की रज़ा पाने के लिए नमाज़ अदा करना ज़रूरी है।",
      paragraph2:
        "पाक-सफ़ाई से सलाम तक नमाज़ के तरीक़े, दुआएँ और ज़रूरी बातें चरणबद्ध तरीके से सीखें।",
      ariaLabel: "नमाज़ का परिचय खोलें"
    }
  };

  function getText(textObject) {
    return textObject[currentLanguage] || textObject.bn || "";
  }

  /* ---------- THEME ---------- */

  function applySavedTheme() {
    const settings = getAppSettings();

    document.body.classList.toggle(
      "dark-mode",
      Boolean(settings.dark)
    );
  }

  /* ---------- BUILD INTRODUCTION ---------- */

  function buildIntroduction() {
    const intro =
      introduction[currentLanguage] || introduction.bn;

    const heading = document.getElementById("intro-title");
    const paragraph1 =
      document.getElementById("intro-paragraph-1");
    const paragraph2 =
      document.getElementById("intro-paragraph-2");

    if (heading) {
      heading.textContent = intro.heading;
    }

    if (paragraph1) {
      paragraph1.textContent = intro.paragraph1;
    }

    if (paragraph2) {
      paragraph2.textContent = intro.paragraph2;
    }

    const board = document.querySelector(".intro-board");

    if (board) {
      board.setAttribute("aria-label", intro.ariaLabel);
    }
  }

  /* ---------- OPEN TOPIC PAGE ---------- */

  function openTopic(topic) {
    const page = NAMAZ_ROUTES[topic.id];

    if (!page) {
      console.error(
        "IBADAT Namaz: No route configured for topic:",
        topic.id
      );
      return;
    }

    const destination = new URL(
      page,
      window.location.href
    );

    destination.searchParams.set("lang", currentLanguage);

    window.location.href = destination.href;
  }

  /* ---------- OPEN INTRODUCTION PAGE ---------- */

  function openIntroductionBoard() {
    const destination = new URL(
      "namaz-intro.html",
      window.location.href
    );

    destination.searchParams.set("lang", currentLanguage);

    window.location.href = destination.href;
  }

  function setupIntroductionBoard() {
    const board = document.querySelector(".intro-board");

    if (!board) {
      console.warn(
        "IBADAT Namaz: Introduction board was not found."
      );
      return;
    }

    board.style.cursor = "pointer";
    board.setAttribute("role", "link");
    board.setAttribute("tabindex", "0");

    board.addEventListener(
      "click",
      openIntroductionBoard
    );

    board.addEventListener("keydown", function (event) {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        openIntroductionBoard();
      }
    });
  }

  /* ---------- BUILD THE 18 TOPIC CARDS ---------- */

  function buildLearningGrid() {
    const grid = document.getElementById("learning-grid");

    if (!grid) {
      console.error(
        "IBADAT Namaz: #learning-grid was not found."
      );
      return;
    }

    const fragment = document.createDocumentFragment();

    topics.forEach(function (topic) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "learning-card";
      button.dataset.topic = topic.id;

      button.setAttribute(
        "aria-label",
        getText(topic.title)
      );

      const icon = document.createElement("img");

      icon.className = "topic-icon";
      icon.src = ASSET_BASE + topic.icon;
      icon.alt = "";
      icon.loading = "eager";
      icon.decoding = "async";
      icon.draggable = false;

      icon.addEventListener(
        "error",
        function () {
          console.warn(
            "IBADAT Namaz: Icon not found:",
            ASSET_BASE + topic.icon
          );

          button.classList.add("icon-missing");
        },
        { once: true }
      );

      const label = document.createElement("span");

      label.textContent = getText(topic.title);
      label.dataset.label = topic.id;

      button.append(icon, label);

      button.addEventListener("click", function () {
        openTopic(topic);
      });

      fragment.appendChild(button);
    });

    grid.replaceChildren(fragment);
  }

  /* ---------- REFRESH LANGUAGE AND THEME ---------- */

  function refreshNamazLanguage() {
    const settings = getAppSettings();

    currentLanguage = normalizeLanguage(
      settings.lang || currentLanguage
    );

    applySavedTheme();
    buildIntroduction();
    buildLearningGrid();
  }

  window.refreshNamazLanguage = refreshNamazLanguage;

  window.addEventListener("storage", function (event) {
    if (event.key === SETTINGS_KEY) {
      refreshNamazLanguage();
    }
  });

  /* ---------- INITIALIZE PAGE ---------- */

  function initializeNamazPage() {
    applySavedTheme();
    buildIntroduction();
    buildLearningGrid();
    setupIntroductionBoard();
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
