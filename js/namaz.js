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
     APP SETTINGS
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
     Existing IDs, icons and order preserved
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
     INTRODUCTION
     User-approved wording in all 3 languages
     ========================================= */

  const introduction = {
    bn: {
      heading: "কী ও কেন?",
      paragraph1:
        "নামাজ ইসলামের অন্যতম প্রধান ইবাদত, যা আল্লাহর স্মরণে হৃদয়কে প্রশান্ত করে। এটি মুমিনের জীবনে শৃঙ্খলা আনে এবং সৃষ্টিকর্তার নৈকট্য লাভের পথ সুগম করে।"
    },

    en: {
      heading: "What & Why?",
      paragraph1:
        "Salah is a central act of worship in Islam. It brings the heart peace through remembrance of Allah, builds discipline, and helps believers grow closer to their Creator."
    },

    hi: {
      heading: "क्या और क्यों?",
      paragraph1:
        "नमाज़ इस्लाम की प्रमुख इबादतों में से एक है। यह अल्लाह की याद से दिल को सुकून देती है, जीवन में अनुशासन लाती है और अपने रब के करीब होने का माध्यम बनती है।"
    }
  };

  /* =========================================
     FIVE DAILY PRAYERS & RAKATS
     Displayed in the selected language
     ========================================= */

  const prayerRakat = {
    bn: [
      "ফজর — ২ সুন্নত + ২ ফরজ",
      "যোহর — ৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল",
      "আসর — ৪ সুন্নত + ৪ ফরজ",
      "মাগরিব — ৩ ফরজ + ২ সুন্নত + ২ নফল",
      "এশা — ৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল + ৩ বিতর + ২ নফল"
    ],

    en: [
      "Fajr — 2 Sunnah + 2 Fard",
      "Dhuhr — 4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl",
      "Asr — 4 Sunnah + 4 Fard",
      "Maghrib — 3 Fard + 2 Sunnah + 2 Nafl",
      "Isha — 4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr + 2 Nafl"
    ],

    hi: [
      "फ़ज्र — 2 सुन्नत + 2 फ़र्ज़",
      "ज़ुहर — 4 सुन्नत + 4 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल",
      "असर — 4 सुन्नत + 4 फ़र्ज़",
      "मग़रिब — 3 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल",
      "इशा — 4 सुन्नत + 4 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल + 3 वितर + 2 नफ़्ल"
    ]
  };

  /* =========================================
     HELPERS
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
     BUILD INTRODUCTION AND PRAYER LIST
     ========================================= */

  function buildIntroduction() {
    const heading = document.getElementById("intro-title");

    const paragraph = document.getElementById(
      "intro-paragraph-1"
    );

    const list = document.getElementById(
      "prayer-rakat-list"
    );

    const intro =
      introduction[currentLanguage] ||
      introduction.bn;

    const prayerItems =
      prayerRakat[currentLanguage] ||
      prayerRakat.bn;

    if (heading) {
      heading.textContent = intro.heading;
    }

    if (paragraph) {
      paragraph.textContent = intro.paragraph1;
    }

    /*
     * Build the list only if the matching HTML
     * container exists. This avoids breaking
     * the rest of the page if HTML is not updated.
     */

    if (list) {
      const fragment = document.createDocumentFragment();

      prayerItems.forEach((item) => {
        const row = document.createElement("p");
        row.textContent = item;
        fragment.appendChild(row);
      });

      list.replaceChildren(fragment);
    }
  }

  /* =========================================
     OPEN SELECTED TOPIC
     Existing detail-page URL preserved
     ========================================= */

  function openTopic(topic) {
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
     BUILD ALL 14 TOPIC CARDS
     Existing order, IDs and assets preserved
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

      /* Open the existing lesson page */

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
   * Preserve the existing public refresh function.
   */

  window.refreshNamazLanguage = refreshNamazLanguage;

  /*
   * Refresh when settings change in another tab.
   */

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      refreshNamazLanguage();
    }
  });

  /* =========================================
     INITIALIZE
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
