/* =========================================
   IBADAT — NAMAZ LEARNING PAGE
   18 Topics | Bengali / English / Hindi
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
     18 LEARNING TOPICS
     The order matches the agreed final list.
     ========================================= */

  const topics = [
    {
      id: "purity",
      icon: "purity.png",
      title: {
        bn: "পবিত্রতা",
        en: "Purification",
        hi: "पवित्रता"
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
        bn: "নামাজের বিধান",
        en: "Prayer Rulings",
        hi: "नमाज़ के नियम"
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
        bn: "সালাম ও পরবর্তী আমল",
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
      icon: "gender-prayer.png",
      title: {
        bn: "নারী-পুরুষের নামাজ",
        en: "Men's & Women's Prayer",
        hi: "पुरुषों और महिलाओं की नमाज़"
      }
    },
    {
      id: "mistakes",
      icon: "prayer-mistakes.png",
      title: {
        bn: "ভুল সংশোধন",
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
        bn: "কলিমা ও আকিদা",
        en: "Kalima & Aqeedah",
        hi: "कलिमा और अकीदा"
      }
    },
    {
      id: "daily-amal",
      icon: "daily-amal.png",
      title: {
        bn: "দৈনন্দিন আমল",
        en: "Daily Amal",
        hi: "दैनिक अमल"
      }
    },
    {
      id: "qaida-arabic-reading",
      icon: "qaida-arabic-reading.png",
      title: {
        bn: "কায়দা ও আরবি পাঠ",
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

  /* =========================================
     INTRODUCTION BOARD
     The approved heading and paragraph remain.
     Rakat rows are no longer shown on this board.
     ========================================= */

  const introduction = {
    bn: {
      heading: "কী ও কেন ?",
      paragraph1:
        "নামাজ ইসলামের অন্যতম প্রধান ইবাদত, যা আল্লাহর স্মরণে হৃদয়কে প্রশান্ত করে। এটি মুমিনের জীবনে শৃঙ্খলা আনে এবং সৃষ্টিকর্তার নৈকট্য লাভের পথ সুগম করে।"
    },

    en: {
      heading: "What & Why ?",
      paragraph1:
        "Salah is a central act of worship in Islam. It brings the heart peace through remembrance of Allah, builds discipline, and helps believers grow closer to their Creator."
    },

    hi: {
      heading: "क्या और क्यों ?",
      paragraph1:
        "नमाज़ इस्लाम की प्रमुख इबादतों में से एक है। यह अल्लाह की याद से दिल को सुकून देती है, जीवन में अनुशासन लाती है और अपने रब के करीब होने का माध्यम बनती है।"
    }
  };

  /* =========================================
     FIVE DAILY PRAYERS & RAKATS
     Kept as lesson data for the
     "Prayer Times & Rakats" topic.
     These rows are NOT rendered on the board.
     ========================================= */

  const prayerRakat = {
    bn: [
      {
        prayer: "ফজর",
        details: "২ সুন্নত + ২ ফরজ"
      },
      {
        prayer: "যোহর",
        details: "৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল"
      },
      {
        prayer: "আসর",
        details: "৪ সুন্নত + ৪ ফরজ"
      },
      {
        prayer: "মাগরিব",
        details: "৩ ফরজ + ২ সুন্নত + ২ নফল"
      },
      {
        prayer: "এশা",
        details: "৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল + ৩ বিতর + ২ নফল"
      }
    ],

    en: [
      {
        prayer: "Fajr",
        details: "2 Sunnah + 2 Fard"
      },
      {
        prayer: "Dhuhr",
        details: "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl"
      },
      {
        prayer: "Asr",
        details: "4 Sunnah + 4 Fard"
      },
      {
        prayer: "Maghrib",
        details: "3 Fard + 2 Sunnah + 2 Nafl"
      },
      {
        prayer: "Isha",
        details: "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr + 2 Nafl"
      }
    ],

    hi: [
      {
        prayer: "फ़ज्र",
        details: "२ सुन्नत + २ फ़र्ज़"
      },
      {
        prayer: "ज़ुहर",
        details: "४ सुन्नत + ४ फ़र्ज़ + २ सुन्नत + २ नफ़्ल"
      },
      {
        prayer: "असर",
        details: "४ सुन्नत + ४ फ़र्ज़"
      },
      {
        prayer: "मग़रिब",
        details: "३ फ़र्ज़ + २ सुन्नत + २ नफ़्ल"
      },
      {
        prayer: "इशा",
        details: "४ सुन्नत + ४ फ़र्ज़ + २ सुन्नत + २ नफ़्ल + ३ वितर + २ नफ़्ल"
      }
    ]
  };

  /*
   * Make the rakats available for the lesson page
   * when we build it in a later step.
   */
  window.namazLessonData = {
    prayerRakat
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
     BUILD INTRODUCTION
     No prayer/rakat list is rendered here.
     ========================================= */

  function buildIntroduction() {
    const heading = document.getElementById("intro-title");
    const paragraph = document.getElementById("intro-paragraph-1");

    const intro =
      introduction[currentLanguage] ||
      introduction.bn;

    if (heading) {
      heading.textContent = intro.heading;
    }

    if (paragraph) {
      paragraph.textContent = intro.paragraph1;
    }
  }

  /* =========================================
     OPEN SELECTED TOPIC
     Keep the existing destination convention.
     Individual lesson pages will be built later.
     ========================================= */

  function openTopic(topic) {
    const destination = new URL(
      "namaz-detail.html",
      window.location.href
    );

    destination.searchParams.set("topic", topic.id);
    destination.searchParams.set("lang", currentLanguage);

    window.location.href = destination.href;
  }

  /* =========================================
     BUILD ALL 18 TOPIC CARDS
     ========================================= */

  function buildLearningGrid() {
    const grid = document.getElementById("learning-grid");

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

      const title = getText(topic.title);
      button.setAttribute("aria-label", title);

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

      label.textContent = title;
      label.dataset.label = topic.id;

      button.append(icon, label);

      /* Open the selected lesson */

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

  window.refreshNamazLanguage = refreshNamazLanguage;

  /* Refresh when settings change in another tab */

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
