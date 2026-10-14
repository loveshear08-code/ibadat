/* =========================================
   IBADAT — NAMAZ LEARNING PAGE
   14 Topics | Bengali / English / Hindi
   Light & Dark Theme
   ========================================= */

"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";
  const ASSET_PATH = "../assets/";

  /* =========================================
     APP SETTINGS & LANGUAGE
     ========================================= */

  function getAppSettings() {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn("Namaz: Could not read app settings.", error);
      return {};
    }
  }

  function normalizeLanguage(language) {
    return ["bn", "en", "hi"].includes(language)
      ? language
      : "bn";
  }

  let currentLanguage = normalizeLanguage(
    getAppSettings().lang || "bn"
  );

  /* =========================================
     ALL 14 LEARNING TOPICS
     ========================================= */

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
      id: "wudu",
      icon: "wudu.png",
      title: {
        bn: "ওজু",
        en: "Wudu",
        hi: "वुज़ू"
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
    }
  ];

 /* =========================================
   INTRODUCTION TEXT
   ========================================= */

const introduction = {
  bn: {
    heading: "কী ও কেন ?",
    paragraph1:
      "নামাজ ইসলামের অন্যতম প্রধান ইবাদত। আল্লাহর স্মরণ, হৃদয়ের গভীর প্রশান্তি ও আল্লাহর নৈকট্য লাভের মাধ্যম।",
    paragraph2: ""
  },

  en: {
    heading: "What & Why?",
    paragraph1:
      "Salah is one of the most important acts of worship in Islam. It is a remembrance of Allah, a source of deep peace, and a means of attaining closeness to Him.",
    paragraph2: ""
  },

  hi: {
    heading: "क्या और क्यों?",
    paragraph1:
      "नमाज़ इस्लाम की प्रमुख इबादतों में से एक है। यह अल्लाह की याद, दिल का सुकून और उसकी निकटता पाने का माध्यम है।",
    paragraph2: ""
  }
}; 

  /* =========================================
     HELPER FUNCTIONS
     ========================================= */

  function getText(textObject) {
    return (
      textObject[currentLanguage] ||
      textObject.bn ||
      ""
    );
  }

  function applySavedTheme() {
    const settings = getAppSettings();

    document.body.classList.toggle(
      "dark-mode",
      Boolean(settings.dark)
    );
  }

  /* =========================================
     BUILD INTRODUCTION
     ========================================= */

  function buildIntroduction() {
    const heading = document.getElementById("intro-title");
    const paragraph1 = document.getElementById(
      "intro-paragraph-1"
    );
    const paragraph2 = document.getElementById(
      "intro-paragraph-2"
    );

    const intro =
      introduction[currentLanguage] ||
      introduction.bn;

    if (heading) {
      heading.textContent = intro.heading;
    }

    if (paragraph1) {
      paragraph1.textContent = intro.paragraph1;
    }

    if (paragraph2) {
      paragraph2.textContent = intro.paragraph2;
    }
  }

  /* =========================================
     OPEN SELECTED TOPIC
     ========================================= */

  function openTopic(topic) {
    /*
     * Uses the existing shared lesson page.
     * Topic IDs are passed through the URL.
     */

    const destination = new URL(
      "namaz-detail.html",
      window.location.href
    );

    destination.searchParams.set(
      "topic",
      topic.id
    );

    destination.searchParams.set(
      "lang",
      currentLanguage
    );

    window.location.href = destination.href;
  }

  /* =========================================
     BUILD ALL 14 OPTION CARDS
     ========================================= */

  function buildLearningGrid() {
    const grid = document.getElementById(
      "learning-grid"
    );

    if (!grid) {
      console.error(
        "Namaz: #learning-grid was not found. Check namaz.html."
      );
      return;
    }

    const fragment = document.createDocumentFragment();

    topics.forEach((topic) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "learning-card";
      button.dataset.topic = topic.id;

      button.setAttribute(
        "aria-label",
        getText(topic.title)
      );

      /* Topic icon */

      const icon = document.createElement("img");

      icon.className = "topic-icon";
      icon.src = ASSET_PATH + topic.icon;
      icon.alt = "";
      icon.loading = "eager";
      icon.decoding = "async";
      icon.draggable = false;

      icon.addEventListener(
        "error",
        () => {
          console.error(
            "Namaz icon not found: " +
            ASSET_PATH +
            topic.icon
          );

          button.classList.add("icon-missing");
        },
        { once: true }
      );

      /* Topic label */

      const label = document.createElement("span");

      label.textContent = getText(topic.title);
      label.dataset.label = topic.id;

      button.append(icon, label);

      /* Open the lesson */

      button.addEventListener("click", () => {
        openTopic(topic);
      });

      fragment.appendChild(button);
    });

    grid.replaceChildren(fragment);
  }

  /* =========================================
     REFRESH LANGUAGE & THEME
     ========================================= */

  function refreshNamazLanguage() {
    const settings = getAppSettings();

    currentLanguage = normalizeLanguage(
      settings.lang || currentLanguage
    );

    applySavedTheme();
    buildIntroduction();
    buildLearningGrid();
  }

  /*
   * Other app scripts can call:
   * window.refreshNamazLanguage()
   */

  window.refreshNamazLanguage =
    refreshNamazLanguage;

  /* Update when settings change in another tab */

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      refreshNamazLanguage();
    }
  });

  /* =========================================
     INITIALIZE PAGE
     ========================================= */

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
