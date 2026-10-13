/* =========================================
   IBADAT - NAMAZ LEARNING
   Bengali / English / Hindi
   ========================================= */

"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";

  /* -----------------------------------------
     LANGUAGE SETTINGS
     ----------------------------------------- */

  function getAppSettings() {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  }

  const settings = getAppSettings();

  function getLanguage() {
    const language = settings.lang || "bn";
    return ["bn", "en", "hi"].includes(language) ? language : "bn";
  }

  let currentLanguage = getLanguage();

  /* -----------------------------------------
     12 LEARNING TOPICS
     ----------------------------------------- */

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
      id: "times-rakats",
      icon: "prayer-times-rakats.png",
      title: {
        bn: "ওয়াক্ত ও রাকাত",
        en: "Prayer Times & Rakats",
        hi: "नमाज़ के वक़्त और रकअत"
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
      id: "complete",
      icon: "complete-namaz.png",
      title: {
        bn: "সম্পূর্ণ নামাজ",
        en: "Complete Prayer",
        hi: "पूरी नमाज़"
      }
    }
  ];

  /* -----------------------------------------
     INTRODUCTION TEXT
     ----------------------------------------- */

  const introduction = {
    bn: {
      heading: "কী ও কেন?",
      paragraph1:
        "নামাজ ইসলামের অন্যতম প্রধান ইবাদত। আল্লাহর সন্তুষ্টি অর্জনের জন্য প্রত্যেক মুসলিমের নামাজ আদায় করা গুরুত্বপূর্ণ।",
      paragraph2:
        "পাক-পবিত্রতা থেকে সালাম পর্যন্ত নামাজের নিয়ম, দোয়া ও প্রয়োজনীয় বিষয়গুলো ধাপে ধাপে শিখুন।"
    },

    en: {
      heading: "What & Why?",
      paragraph1:
        "Salah is one of the most important acts of worship in Islam. Performing Salah is essential for a Muslim seeking the pleasure of Allah.",
      paragraph2:
        "Learn the steps of prayer, from purification to Salam, including essential rules and duas."
    },

    hi: {
      heading: "क्या और क्यों?",
      paragraph1:
        "नमाज़ इस्लाम की सबसे महत्वपूर्ण इबादतों में से एक है। अल्लाह की रज़ा पाने के लिए नमाज़ अदा करना ज़रूरी है।",
      paragraph2:
        "पाक-सफ़ाई से सलाम तक नमाज़ के तरीक़े, दुआएँ और ज़रूरी बातें चरणबद्ध तरीके से सीखें।"
    }
  };

  /* -----------------------------------------
     HELPERS
     ----------------------------------------- */

  function getText(textObject) {
    return (
      textObject[currentLanguage] ||
      textObject.bn ||
      ""
    );
  }

  function findElement(selectors) {
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }
    return null;
  }

  /* -----------------------------------------
     BUILD INTRODUCTION BOARD
     ----------------------------------------- */

  function buildIntroduction() {
    const heading = findElement([
      ".intro-content h1",
      "#introHeading",
      "[data-namaz-heading]"
    ]);

    const paragraphs = document.querySelectorAll(
      ".intro-content p"
    );

    const intro = introduction[currentLanguage];

    if (heading) {
      heading.textContent = intro.heading;
    }

    if (paragraphs[0]) {
      paragraphs[0].textContent = intro.paragraph1;
    }

    if (paragraphs[1]) {
      paragraphs[1].textContent = intro.paragraph2;
    }

    const divider = document.querySelector(".intro-divider");

    if (divider) {
      divider.setAttribute("aria-hidden", "true");
    }
  }

  /* -----------------------------------------
     BUILD THE 12 OPTION CARDS
     ----------------------------------------- */

  function buildLearningGrid() {
    const grid = findElement([
      ".learning-grid",
      "#learningGrid",
      "#namazOptions"
    ]);

    if (!grid) {
      console.error(
        "Namaz: learning grid not found. Check namaz.html."
      );
      return;
    }

    grid.replaceChildren();

    topics.forEach((topic) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "learning-card";
      button.dataset.topic = topic.id;
      button.setAttribute("aria-label", getText(topic.title));

      const icon = document.createElement("img");
      icon.className = "topic-icon";
      icon.src = `../assets/${topic.icon}`;
      icon.alt = "";
      icon.loading = "eager";
      icon.draggable = false;

      icon.addEventListener("error", () => {
        console.error(
          `Namaz icon not found: ../assets/${topic.icon}`
        );
      });

      const label = document.createElement("span");
      label.textContent = getText(topic.title);

      button.append(icon, label);

      button.addEventListener("click", () => {
        openTopic(topic);
      });

      grid.appendChild(button);
    });
  }

  /* -----------------------------------------
     OPEN TOPIC
     ----------------------------------------- */

  function openTopic(topic) {
    /*
      Each option passes its topic ID to the shared
      content page. That page can display the selected
      lesson and provide a Back button.

      The destination file will be namaz-detail.html.
    */

    const destination = new URL(
      "namaz-detail.html",
      window.location.href
    );

    destination.searchParams.set("topic", topic.id);
    destination.searchParams.set("lang", currentLanguage);

    window.location.href = destination.href;
  }

  /* -----------------------------------------
     LANGUAGE CHANGE SUPPORT
     ----------------------------------------- */

  function refreshLanguage() {
    const updatedSettings = getAppSettings();
    const newLanguage = updatedSettings.lang || currentLanguage;

    if (["bn", "en", "hi"].includes(newLanguage)) {
      currentLanguage = newLanguage;
    }

    buildIntroduction();
    buildLearningGrid();
  }

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      refreshLanguage();
    }
  });

  /*
    Other app code can call this after changing
    the language without reloading the page.
  */
  window.refreshNamazLanguage = refreshLanguage;

  /* -----------------------------------------
     INITIALIZE
     ----------------------------------------- */

  function initializeNamazPage() {
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
