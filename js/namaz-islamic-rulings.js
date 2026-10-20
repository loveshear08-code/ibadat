"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";
  const ASSET_BASE = "../assets/icons/";

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

  const BIDHAN_ROUTES = {
    "moulik-bidhan": "bidhan-moulik.html",
    "roza-bidhan": "bidhan-roza.html",
    "zakat-sadaka": "bidhan-zakat-sadaka.html",
    "hajj-umrah": "bidhan-hajj-umrah.html",
    "halal-haram": "bidhan-halal-haram.html",
    "arthik-bidhan": "bidhan-arthik.html",
    "paribarik-bidhan": "bidhan-paribarik.html",
    "uttoradhikar": "bidhan-uttoradhikar.html",
    "manobadhikar": "bidhan-manobadhikar.html",
    "gunah-tawba": "bidhan-gunah-tawba.html"
  };

  const topics = [
    {
      id: "moulik-bidhan",
      icon: "moulik-bidhan.png",
      title: {
        bn: "মৌলিক বিধান",
        en: "Basic Islamic Rulings",
        hi: "इस्लाम के मूल नियम"
      }
    },
    {
      id: "roza-bidhan",
      icon: "roza-bidhan.png",
      title: {
        bn: "রোজার বিধান",
        en: "Rules of Fasting",
        hi: "रोज़े के नियम"
      }
    },
    {
      id: "zakat-sadaka",
      icon: "zakat-sadaka.png",
      title: {
        bn: "যাকাত ও সদকা",
        en: "Zakat & Sadaqah",
        hi: "ज़कात और सदक़ा"
      }
    },
    {
      id: "hajj-umrah",
      icon: "hajj-umrah.png",
      title: {
        bn: "হজ ও উমরা",
        en: "Hajj & Umrah",
        hi: "हज और उमराह"
      }
    },
    {
      id: "halal-haram",
      icon: "halal-haram.png",
      title: {
        bn: "হালাল ও হারাম",
        en: "Halal & Haram",
        hi: "हलाल और हराम"
      }
    },
    {
      id: "arthik-bidhan",
      icon: "arthik-bidhan.png",
      title: {
        bn: "আর্থিক বিধান",
        en: "Financial Rulings",
        hi: "आर्थिक नियम"
      }
    },
    {
      id: "paribarik-bidhan",
      icon: "paribarik-bidhan.png",
      title: {
        bn: "পারিবারিক বিধান",
        en: "Family Rulings",
        hi: "पारिवारिक नियम"
      }
    },
    {
      id: "uttoradhikar",
      icon: "uttoradhikar.png",
      title: {
        bn: "উত্তরাধিকার",
        en: "Inheritance",
        hi: "विरासत"
      }
    },
    {
      id: "manobadhikar",
      icon: "manobadhikar.png",
      title: {
        bn: "মানবাধিকার",
        en: "Rights of People",
        hi: "लोगों के अधिकार"
      }
    },
    {
      id: "gunah-tawba",
      icon: "gunah-tawba.png",
      title: {
        bn: "গুনাহ ও তওবা",
        en: "Sins & Repentance",
        hi: "गुनाह और तौबा"
      }
    }
  ];

  const introduction = {
    bn: {
      heading: "ইসলামিক বিধান",
      paragraph:
        "ইসলামের শিক্ষা আমাদের দৈনন্দিন জীবনকে সুন্দর ও সুশৃঙ্খল করে। সহজ ভাষায় ইসলামের মৌলিক বিধান জানুন, বুঝুন এবং জীবনে আমল করার চেষ্টা করুন।",
      ariaLabel: "ইসলামিক বিধান সম্পর্কে পরিচিতি"
    },
    en: {
      heading: "Islamic Rulings",
      paragraph:
        "Islamic teachings guide us toward a better and more balanced life. Learn the basic rulings of Islam in simple language and try to practise them in daily life.",
      ariaLabel: "Introduction to Islamic rulings"
    },
    hi: {
      heading: "इस्लामी नियम",
      paragraph:
        "इस्लाम की शिक्षाएँ हमारे जीवन को बेहतर और व्यवस्थित बनाती हैं। इस्लाम के मूल नियमों को सरल भाषा में जानें, समझें और जीवन में अपनाने की कोशिश करें।",
      ariaLabel: "इस्लामी नियमों का परिचय"
    }
  };

  const footerMessages = {
    bn: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
    en: "Maintain purity and find peace in worship.",
    hi: "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।"
  };

  const pageTitles = {
    bn: "ইসলামিক বিধান | IBADAT",
    en: "Islamic Rulings | IBADAT",
    hi: "इस्लामी नियम | IBADAT"
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
    const paragraph = document.getElementById("intro-paragraph");
    const board = document.querySelector(".intro-board");
    const footer = document.getElementById("footer-message");

    if (heading) {
      heading.textContent = intro.heading;
    }

    if (paragraph) {
      paragraph.textContent = intro.paragraph;
    }

    if (board) {
      board.setAttribute("aria-label", intro.ariaLabel);
    }

    if (footer) {
      footer.textContent = getText(footerMessages);
    }

    document.documentElement.lang = currentLanguage;
    document.title = pageTitles[currentLanguage] || pageTitles.bn;
  }

  function openTopic(topic) {
    const page = BIDHAN_ROUTES[topic.id];

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

  function refreshBidhanPage() {
    currentLanguage = getCurrentLanguage();
    applySavedTheme();
    buildIntroduction();
    buildLearningGrid();
  }

  window.refreshIslamicBidhanLanguage = refreshBidhanPage;

  window.addEventListener("storage", (event) => {
    if (event.key === SETTINGS_KEY) {
      refreshBidhanPage();
    }
  });

  function initializeBidhanPage() {
    applySavedTheme();
    buildIntroduction();
    buildLearningGrid();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeBidhanPage,
      { once: true }
    );
  } else {
    initializeBidhanPage();
  }
})();
