
"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";
  const ASSET_BASE = "../assets/icons/";

  /* ==================================================
     READ SETTINGS
  ================================================== */

  function getAppSettings() {
    try {
      return JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
      );
    } catch (error) {
      console.warn("IBADAT: Could not read app settings.", error);
      return {};
    }
  }

  function normalizeLanguage(language) {
    const value = String(language || "bn").toLowerCase();

    return ["bn", "en", "hi"].includes(value)
      ? value
      : "bn";
  }

  function getCurrentLanguage() {
    const settings = getAppSettings();

    return normalizeLanguage(
      settings.lang ||
      settings.language ||
      "bn"
    );
  }

  function getCurrentTheme() {
    const settings = getAppSettings();

    const theme = String(
      settings.themeColor ||
      settings.theme ||
      "classic"
    ).toLowerCase();

    return ["classic", "royal", "rose", "pista"].includes(theme)
      ? theme
      : "classic";
  }

  function isDarkMode() {
    return getAppSettings().dark === true;
  }

  let currentLanguage = getCurrentLanguage();

  /* ==================================================
     PAGE ROUTES — KEEP EXISTING ROUTES
  ================================================== */

  const NAMAZ_ROUTES = {
    "purity": "namaz-purity.html",
    "iman-aqidah": "namaz-kalima-aqeedah.html",
    "conditions": "namaz-conditions.html",
    "times-rakats": "namaz-waqt-rakat.html",
    "complete": "namaz-complete.html",
    "special-prayers": "namaz-special-prayers.html",
    "jamaat": "namaz-jamaat-jumuah.html",
    "arabic-learning": "namaz-qaida-arabic.html",
    "islamic-rulings": "namaz-islamic-rulings.html",
    "daily-amal": "namaz-daily-amal.html"
  };

  /* ==================================================
     TEN TOPICS — SAME ORDER AND ICONS
  ================================================== */

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
      id: "iman-aqidah",
      icon: "iman-akidah.png",
      title: {
        bn: "ঈমান ও আকিদা",
        en: "Iman & Aqidah",
        hi: "ईमान और अकीदा"
      }
    },
    {
      id: "conditions",
      icon: "prayer-conditions.png",
      title: {
        bn: "শর্ত ও প্রস্তুতি",
        en: "Conditions & Preparation",
        hi: "शर्तें और तैयारी"
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
      id: "complete",
      icon: "complete-prayer.png",
      title: {
        bn: "সম্পূর্ণ নামাজ",
        en: "Complete Prayer",
        hi: "पूरी नमाज़"
      }
    },
    {
      id: "special-prayers",
      icon: "special-prayers.png",
      title: {
        bn: "বিশেষ নামাজ",
        en: "Special Prayers",
        hi: "विशेष नमाज़ें"
      }
    },
    {
      id: "jamaat",
      icon: "mosjid-jamat.png",
      title: {
        bn: "মসজিদ ও জামাত",
        en: "Mosque & Jamaat",
        hi: "मस्जिद और जमात"
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
      id: "islamic-rulings",
      icon: "islamic-rulings.png",
      title: {
        bn: "ইসলামিক বিধান",
        en: "Islamic Rulings",
        hi: "इस्लामी नियम"
      }
    },
    {
      id: "daily-amal",
      icon: "daily-amal.png",
      title: {
        bn: "দৈনিক আমল",
        en: "Daily Practices",
        hi: "दैनिक अमल"
      }
    }
  ];

  /* ==================================================
     INTRODUCTION TEXT
  ================================================== */

  const introduction = {
    bn: {
      heading: "কী ও কেন?",
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

  /* ==================================================
     FOOTER TEXT
  ================================================== */

  const footerMessages = {
    bn: "নামাজ শিখি, শুদ্ধভাবে ইবাদত করি।",
    en: "Learn Salah, worship with sincerity.",
    hi: "नमाज़ सीखें, सच्चे मन से इबादत करें।"
  };

  /* ==================================================
     APPLY SHARED SETTINGS
  ================================================== */

  function applySavedSettings() {
    const theme = getCurrentTheme();

    document.body.dataset.colorTheme = theme;

    document.body.classList.toggle(
      "dark-mode",
      isDarkMode()
    );

    const themeColors = {
      classic: "#1B7F4B",
      royal: "#285A8E",
      rose: "#B96F79",
      pista: "#4CAF50"
    };

    const meta = document.getElementById("themeColorMeta");

    if (meta) {
      meta.content = isDarkMode()
        ? "#103E29"
        : themeColors[theme];
    }
  }

  /* ==================================================
     BUILD INTRODUCTION AND FOOTER
  ================================================== */

  function buildIntroduction() {
    const intro =
      introduction[currentLanguage] ||
      introduction.bn;

    const heading = document.getElementById("intro-title");
    const paragraph = document.getElementById("intro-paragraph-1");
    const board = document.querySelector(".intro-board");
    const footerMessage = document.getElementById("footer-message");

    if (heading) {
      heading.textContent = intro.heading;
    }

    if (paragraph) {
      paragraph.textContent = intro.paragraph;
    }

    if (board) {
      board.setAttribute("aria-label", intro.ariaLabel);
    }

    if (footerMessage) {
      footerMessage.textContent =
        footerMessages[currentLanguage] ||
        footerMessages.bn;
    }

    document.documentElement.lang = currentLanguage;

    const pageTitles = {
      bn: "নামাজ শিক্ষা | IBADAT",
      en: "Learn Salah | IBADAT",
      hi: "नमाज़ शिक्षा | IBADAT"
    };

    document.title = pageTitles[currentLanguage];
  }

  /* ==================================================
     OPEN TOPIC — SAME ROUTES AND LANGUAGE PARAMETER
  ================================================== */

  function openTopic(topic) {
    const page = NAMAZ_ROUTES[topic.id];

    if (!page) {
      console.error(
        "IBADAT: No route configured for",
        topic.id
      );
      return;
    }

    const destination = new URL(
      page,
      window.location.href
    );

    destination.searchParams.set(
      "lang",
      currentLanguage
    );

    window.location.href = destination.href;
  }

  /* ==================================================
     BUILD THE TEN OPTION CARDS
  ================================================== */

  function buildLearningGrid() {
    const grid = document.getElementById("learning-grid");

    if (!grid) {
      console.error("IBADAT: Learning grid was not found.");
      return;
    }

    const fragment = document.createDocumentFragment();

    topics.forEach(topic => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "learning-card";
      button.dataset.topic = topic.id;

      const labelText =
        topic.title[currentLanguage] ||
        topic.title.bn;

      button.setAttribute("aria-label", labelText);

      const icon = document.createElement("img");

      icon.className = "topic-icon";
      icon.src = ASSET_BASE + topic.icon;
      icon.alt = "";
      icon.loading = "eager";
      icon.decoding = "async";
      icon.draggable = false;

      icon.addEventListener(
        "error",
        () => {
          button.classList.add("icon-missing");

          console.warn(
            "IBADAT: Icon not found:",
            icon.getAttribute("src")
          );
        },
        { once: true }
      );

      const label = document.createElement("span");
      label.textContent = labelText;

      button.append(icon, label);

      button.addEventListener("click", () => {
        openTopic(topic);
      });

      fragment.appendChild(button);
    });

    grid.replaceChildren(fragment);
  }

  /* ==================================================
     REFRESH PAGE
  ================================================== */

  function refreshNamazPage() {
    currentLanguage = getCurrentLanguage();

    applySavedSettings();
    buildIntroduction();
    buildLearningGrid();
  }

  window.refreshNamazLanguage = refreshNamazPage;

  /* ==================================================
     SETTINGS CHANGED IN ANOTHER TAB
  ================================================== */

  window.addEventListener("storage", event => {
    if (event.key === SETTINGS_KEY) {
      refreshNamazPage();
    }
  });

  /* ==================================================
     SAME-TAB SETTINGS CHANGE DETECTION
  ================================================== */

  let previousSettings = "";

  function getSettingsSignature() {
    const settings = getAppSettings();

    return JSON.stringify({
      lang: normalizeLanguage(
        settings.lang || settings.language || "bn"
      ),
      themeColor: getCurrentTheme(),
      dark: isDarkMode()
    });
  }

  function checkSettings() {
    const signature = getSettingsSignature();

    if (signature === previousSettings) {
      return;
    }

    previousSettings = signature;
    refreshNamazPage();
  }

  /* ==================================================
     INITIALIZE
  ================================================== */

  function initializeNamazPage() {
    currentLanguage = getCurrentLanguage();

    applySavedSettings();
    buildIntroduction();
    buildLearningGrid();

    previousSettings = getSettingsSignature();

    window.setInterval(checkSettings, 700);
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
