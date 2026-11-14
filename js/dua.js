"use strict";

/* =========================================================
   IBADAT — DUA.JS
   IslamicAPI / Masnun Dua Dataset
   30 Curated Categories
   Bengali / English / Hindi
   Lazy Loading + Arabic Validation
========================================================= */

(() => {
  const BASE =
    "https://raw.githubusercontent.com/islamicapi/masnun-dua/main/";

  const SETTINGS_KEYS = [
    "appSettings",
    "ibadatSettings"
  ];

  const LANGUAGES = ["bn", "en", "hi"];

  const THEMES = [
    "classic",
    "royal",
    "rose",
    "pista"
  ];

  const $ = id => document.getElementById(id);

  const el = {
    heroTitle: $("heroTitle"),
    heroSubtitle: $("heroSubtitle"),
    footerText: $("footerText"),

    loadingBox: $("loadingBox"),
    errorBox: $("errorBox"),
    errorText: $("errorText"),
    retryButton: $("retryButton"),

    home: $("duaHome"),
    chapterList: $("chapterList"),

    entryPage: $("entryPage"),
    entryList: $("entryList"),

    duaPage: $("duaPage"),
    duaContent: $("duaContent")
  };

  /* =======================================================
     LANGUAGE TEXT
  ======================================================= */

  const TEXT = {
    bn: {
      title: "দোয়া",
      entries: "দোয়াসমূহ",
      subtitle: "দোয়া শিখুন, পড়ুন ও প্রশান্তি অনুভব করুন",
      footer: "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।",
      loading: "দোয়ার বিভাগ লোড হচ্ছে...",
      loadingDuas: "দোয়াসমূহ লোড হচ্ছে...",
      loadingDetails: "দোয়ার বিস্তারিত লোড হচ্ছে...",
      retry: "আবার চেষ্টা করুন",
      arabic: "আরবি",
      pronunciation: "উচ্চারণ",
      meaning: "অর্থ",
      reference: "সূত্র",
      noCategories: "কোনো বিভাগ পাওয়া যায়নি।",
      noDuas: "এই বিভাগে কোনো যাচাইকৃত দোয়া পাওয়া যায়নি।",
      noDetails: "এই দোয়ার বিস্তারিত তথ্য পাওয়া যায়নি।",
      missingMeaning: "এই ভাষায় অর্থ পাওয়া যায়নি।",
      networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      dataError: "ডেটা সঠিকভাবে পড়া যায়নি।",
      sourceError: "দোয়ার তথ্য লোড করা যায়নি।",
      number: "দোয়া"
    },

    en: {
      title: "Du'a",
      entries: "Du'as",
      subtitle: "Learn, recite and find peace through supplication",
      footer: "Peace comes through the remembrance of Allah.",
      loading: "Loading categories...",
      loadingDuas: "Loading Du'as...",
      loadingDetails: "Loading Du'a details...",
      retry: "Try again",
      arabic: "Arabic",
      pronunciation: "Pronunciation",
      meaning: "Meaning",
      reference: "Reference",
      noCategories: "No categories were found.",
      noDuas: "No verified Du'as were found in this category.",
      noDetails: "Details for this Du'a could not be found.",
      missingMeaning: "Meaning is not available in this language.",
      networkError: "Check your internet connection and try again.",
      dataError: "The data could not be read correctly.",
      sourceError: "Could not load Du'a data.",
      number: "Du'a"
    },

    hi: {
      title: "दुआ",
      entries: "दुआएँ",
      subtitle: "दुआ सीखें, पढ़ें और सुकून पाएँ",
      footer: "अल्लाह के ज़िक्र से दिलों को सुकून मिलता है।",
      loading: "श्रेणियाँ लोड हो रही हैं...",
      loadingDuas: "दुआएँ लोड हो रही हैं...",
      loadingDetails: "दुआ की जानकारी लोड हो रही है...",
      retry: "फिर कोशिश करें",
      arabic: "अरबी",
      pronunciation: "उच्चारण",
      meaning: "अर्थ",
      reference: "संदर्भ",
      noCategories: "कोई श्रेणी नहीं मिली।",
      noDuas: "इस श्रेणी में कोई प्रमाणित दुआ नहीं मिली।",
      noDetails: "इस दुआ की जानकारी नहीं मिली।",
      missingMeaning: "इस भाषा में अर्थ उपलब्ध नहीं है।",
      networkError: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
      dataError: "डेटा सही ढंग से पढ़ा नहीं जा सका।",
      sourceError: "दुआ की जानकारी लोड नहीं हो सकी।",
      number: "दुआ"
    }
  };

  let language = "bn";
  let darkMode = false;
  let colorTheme = "classic";

  let currentPage = "home";

  let subcategories = [];

  let selectedCategory = null;
  let selectedDua = null;

  let sourceReady = false;
  let loadingCategory = false;
  let settingsReloading = false;

  let requestVersion = 0;

  const duaCache = new Map();
  const categoryCache = new Map();

  const t = key =>
    TEXT[language]?.[key] || TEXT.bn[key] || key;

  /* =======================================================
     30 FINAL CATEGORIES
     Source slugs are grouped without changing original IDs.
  ======================================================= */

  const CATEGORY_DEFINITIONS = [
    {
      id: "morning",
      bn: "সকাল ও সন্ধ্যার যিকির",
      en: "Morning & Evening Adhkar",
      hi: "सुबह और शाम के अज़कार",
      slugs: ["morning-and-evening"]
    },
    {
      id: "sleep",
      bn: "ঘুম ও বিশ্রাম",
      en: "Sleep & Rest",
      hi: "नींद और आराम",
      slugs: ["sleep"]
    },
    {
      id: "purity",
      bn: "পবিত্রতা ও অজু",
      en: "Purification & Wudu",
      hi: "पवित्रता और वुज़ू",
      slugs: ["ablution-and-bath"]
    },
    {
      id: "toilet",
      bn: "টয়লেট ও প্রাকৃতিক প্রয়োজন",
      en: "Toilet & Natural Needs",
      hi: "शौचालय और प्राकृतिक ज़रूरतें",
      slugs: ["toilet"]
    },
    {
      id: "clothing",
      bn: "পোশাক ও সাজসজ্জা",
      en: "Clothing & Dressing",
      hi: "कपड़े और पहनावा",
      slugs: ["cloths"]
    },
    {
      id: "home",
      bn: "ঘর ও বাসস্থান",
      en: "Home & Residence",
      hi: "घर और निवास",
      slugs: ["home"]
    },
    {
      id: "mosque",
      bn: "মসজিদ ও আজান",
      en: "Mosque & Adhan",
      hi: "मस्जिद और अज़ान",
      slugs: ["mosque", "adhaan-and-iqamah"]
    },
    {
      id: "salah",
      bn: "নামাজ",
      en: "Salah / Prayer",
      hi: "नमाज़",
      slugs: ["salah"]
    },
    {
      id: "special-prayer",
      bn: "বিশেষ নামাজ ও কুনুত",
      en: "Special Prayers & Qunut",
      hi: "विशेष नमाज़ और क़ुनूत",
      slugs: ["witr-and-other"]
    },
    {
      id: "fasting",
      bn: "রোজা ও রমজান",
      en: "Fasting & Ramadan",
      hi: "रोज़ा और रमज़ान",
      slugs: ["fasting"]
    },
    {
      id: "eid",
      bn: "ঈদ",
      en: "Eid",
      hi: "ईद",
      slugs: ["eid"]
    },
    {
      id: "hajj",
      bn: "হজ ও ওমরাহ",
      en: "Hajj & Umrah",
      hi: "हज और उमराह",
      slugs: ["hajj-and-umrah", "sacrifice"]
    },
    {
      id: "travel",
      bn: "সফর ও যানবাহন",
      en: "Travel & Transportation",
      hi: "सफ़र और वाहन",
      slugs: ["travel"]
    },
    {
      id: "food",
      bn: "খাবার ও পানীয়",
      en: "Food & Drink",
      hi: "खाना और पेय",
      slugs: ["food"]
    },
    {
      id: "nature",
      bn: "বৃষ্টি ও প্রকৃতি",
      en: "Rain & Nature",
      hi: "बारिश और प्रकृति",
      slugs: ["rainnature"]
    },
    {
      id: "sickness",
      bn: "অসুস্থতা ও আরোগ্য",
      en: "Illness & Healing",
      hi: "बीमारी और शिफ़ा",
      slugs: ["sickness"]
    },
    {
      id: "protection",
      bn: "রুকইয়াহ ও আত্মরক্ষা",
      en: "Ruqyah & Protection",
      hi: "रुक़्या और सुरक्षा",
      slugs: ["evil-protection", "jinndiseases"]
    },
    {
      id: "anxiety",
      bn: "ভয় ও দুশ্চিন্তা",
      en: "Fear & Anxiety",
      hi: "डर और चिंता",
      slugs: ["anxiety"]
    },
    {
      id: "danger",
      bn: "বিপদ ও কঠিন পরিস্থিতি",
      en: "Danger & Difficult Situations",
      hi: "मुसीबत और कठिन परिस्थितियाँ",
      slugs: ["danger"]
    },
    {
      id: "forgiveness",
      bn: "ক্ষমা ও তওবা",
      en: "Forgiveness & Repentance",
      hi: "माफ़ी और तौबा",
      slugs: ["forgiveness"]
    },
    {
      id: "debt",
      bn: "রিজিক ও ঋণমুক্তি",
      en: "Provision & Debt Relief",
      hi: "रिज़्क़ और कर्ज़ से मुक्ति",
      slugs: ["debt"]
    },
    {
      id: "marriage",
      bn: "বিবাহ ও দাম্পত্য জীবন",
      en: "Marriage & Married Life",
      hi: "विवाह और वैवाहिक जीवन",
      slugs: ["marriage"]
    },
    {
      id: "family",
      bn: "সন্তান ও পিতামাতা",
      en: "Children & Parents",
      hi: "बच्चे और माता-पिता",
      slugs: ["family"]
    },
    {
      id: "death",
      bn: "মৃত্যু, কবর ও জানাজা",
      en: "Death, Grave & Funeral",
      hi: "मृत्यु, क़ब्र और जनाज़ा",
      slugs: ["grave-funeral"]
    },
    {
      id: "quran",
      bn: "কুরআনের দোয়া",
      en: "Quranic Du'as",
      hi: "क़ुरआनी दुआएँ",
      slugs: ["quranic-dua", "40-rabbana-duas"]
    },
    {
      id: "prophets",
      bn: "নবীদের দোয়া",
      en: "Prophets' Du'as",
      hi: "अंबिया की दुआएँ",
      slugs: ["prophets-dua"]
    },
    {
      id: "praise",
      bn: "আল্লাহর নাম ও প্রশংসা",
      en: "Names of Allah & Praise",
      hi: "अल्लाह के नाम और प्रशंसा",
      slugs: [
        "greatest-name-of-allah",
        "duas-excellence",
        "condemnationpraise"
      ]
    },
    {
      id: "manners",
      bn: "সামাজিক আদব ও সম্পর্ক",
      en: "Social Manners & Relations",
      hi: "सामाजिक शिष्टाचार और संबंध",
      slugs: ["manners", "gathering"]
    },
    {
      id: "animals",
      bn: "পশুপাখি ও জীবজন্তু",
      en: "Animals",
      hi: "जानवर और पक्षी",
      slugs: ["animals"]
    },
    {
      id: "other",
      bn: "অন্যান্য প্রামাণ্য মাসনুন দোয়া",
      en: "Other Authentic Masnun Du'as",
      hi: "अन्य प्रमाणित मसनून दुआएँ",
      slugs: [
        "duas-importance",
        "time-of-dua",
        "dua-acceptance",
        "duas-of-hadith",
        "duas-of-sahaba",
        "masnun-duas",
        "other-duas",
        "when-to-say-what"
      ]
    }
  ];

  /* =======================================================
     SETTINGS
  ======================================================= */

  function readSettings() {
    let settings = {};

    for (const key of SETTINGS_KEYS) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        const parsed = JSON.parse(raw);

        if (parsed && typeof parsed === "object") {
          settings = { ...settings, ...parsed };
        }
      } catch (error) {
        console.warn("IBADAT settings:", error);
      }
    }

    const langValue =
      settings.lang ||
      settings.language ||
      settings.locale ||
      "bn";

    language = normalizeLanguage(langValue);

    const darkValue =
      settings.dark ??
      settings.darkMode ??
      settings.dark_mode ??
      settings.isDarkMode ??
      false;

    darkMode =
      darkValue === true ||
      darkValue === 1 ||
      darkValue === "true" ||
      darkValue === "dark";

    const themeValue =
      settings.themeColor ||
      settings.colorTheme ||
      settings.theme ||
      "classic";

    colorTheme = THEMES.includes(themeValue)
      ? themeValue
      : "classic";

    applyTheme();
    applyLabels();
  }

  function normalizeLanguage(value) {
    const v = String(value || "bn").toLowerCase().trim();

    if (["en", "eng", "english"].includes(v)) return "en";
    if (["hi", "hin", "hindi"].includes(v)) return "hi";

    return "bn";
  }

  function applyTheme() {
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.dataset.colorTheme = colorTheme;

    document.documentElement.style.colorScheme =
      darkMode ? "dark" : "light";

    const meta = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (meta) {
      const colors = {
        classic: "#0F5132",
        royal: "#173A60",
        rose: "#7D414B",
        pista: "#2F7135"
      };

      meta.content = darkMode
        ? "#081b13"
        : colors[colorTheme];
    }
  }

  function getCategoryName(category) {
    return category[language] || category.bn;
  }

  function applyLabels() {
    document.documentElement.lang = language;

    if (el.heroSubtitle) {
      el.heroSubtitle.textContent = t("subtitle");
    }

    if (el.retryButton) {
      el.retryButton.textContent = t("retry");
    }

    updateHeader();
    updateFooter();
  }

  function updateHeader() {
    if (!el.heroTitle) return;

    if (currentPage === "entries") {
      el.heroTitle.textContent = t("entries");
    } else if (currentPage === "dua" && selectedDua) {
      el.heroTitle.textContent = selectedDua.title || t("title");
    } else {
      el.heroTitle.textContent = t("title");
    }
  }

  function updateFooter() {
    if (el.footerText) {
      el.footerText.textContent = t("footer");
    }
  }

  /* =======================================================
     HELPERS
  ======================================================= */

  function makeElement(tag, className, text) {
    const node = document.createElement(tag);

    if (className) node.className = className;

    if (text !== undefined && text !== null) {
      node.textContent = String(text);
    }

    return node;
  }

  function clear(node) {
    if (node) node.replaceChildren();
  }

  function showEmpty(container, message) {
    clear(container);

    if (!container) return;

    container.appendChild(
      makeElement("div", "empty-message", message)
    );
  }

  function normalizeSlug(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\/+$/, "");
  }

  function normalizeId(value) {
    if (value === undefined || value === null) return "";
    return String(value).trim();
  }

  function isObject(value) {
    return value !== null &&
      typeof value === "object" &&
      !Array.isArray(value);
  }

  function hasArabicText(value) {
    return typeof value === "string" &&
      /[\u0600-\u06FF]/.test(value);
  }

  function formatNumber(value) {
    const locales = {
      bn: "bn-BD",
      en: "en-IN",
      hi: "hi-IN"
    };

    return new Intl.NumberFormat(
      locales[language] || "bn-BD"
    ).format(value);
  }

  /* =======================================================
     NETWORK
  ======================================================= */

  async function fetchJSON(url, timeoutMs = 18000) {
    const controller = new AbortController();

    const timer = setTimeout(
      () => controller.abort(),
      timeoutMs
    );

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "force-cache",
        headers: {
          Accept: "application/json"
        },
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();

    } finally {
      clearTimeout(timer);
    }
  }

  function getRawURL(path) {
    return BASE + path
      .split("/")
      .map(encodeURIComponent)
      .join("/");
  }

  /* =======================================================
     LOAD SUBCATEGORIES
     Only one language file is needed initially.
  ======================================================= */

  async function loadSubcategories() {
    const data = await fetchJSON(
      getRawURL(`sub-categories/${language}.json`)
    );

    if (!Array.isArray(data)) {
      throw new Error("Invalid subcategory data");
    }

    subcategories = data;
    sourceReady = true;
  }

  /* =======================================================
     CATEGORY RELATION
  ======================================================= */

  function getCategorySubcategories(category) {
    const slugs = new Set(category.slugs);

    return subcategories.filter(item =>
      slugs.has(normalizeSlug(item.category))
    );
  }

  function getCategoryDuaIds(category) {
    const groups = getCategorySubcategories(category);
    const ids = [];
    const seen = new Set();

    groups.forEach(group => {
      const values = Array.isArray(group["dua-ids"])
        ? group["dua-ids"]
        : [];

      values.forEach(value => {
        const id = normalizeId(
          isObject(value)
            ? value.dua_id || value.id
            : value
        );

        if (!id || seen.has(id)) return;

        seen.add(id);
        ids.push(id);
      });
    });

    return ids;
  }

  /* =======================================================
     LOAD ONE DUA
     Same ID is used for Arabic and selected language.
  ======================================================= */

  async function loadOneDua(id) {
    const key = `${language}:${id}`;

    if (duaCache.has(key)) {
      return duaCache.get(key);
    }

    const result = (async () => {
      const [arabicRecord, translatedRecord] =
        await Promise.all([
          fetchJSON(
            getRawURL(`translation/ar/dua_${id}.json`)
          ),
          fetchJSON(
            getRawURL(`translation/${language}/dua_${id}.json`)
          )
        ]);

      if (!isObject(arabicRecord) ||
          !isObject(translatedRecord)) {
        return null;
      }

      /* Strict ID check prevents accidental mismatching. */
      if (
        String(arabicRecord.dua_id) !== String(id) ||
        String(translatedRecord.dua_id) !== String(id)
      ) {
        return null;
      }

      const arabic = String(
        arabicRecord.arabic || translatedRecord.arabic || ""
      ).trim();

      /*
       * A record without genuine Arabic supplication text
       * must not appear in the Du'a list.
       */
      if (!hasArabicText(arabic)) {
        return null;
      }

      const title = String(
        translatedRecord.title || ""
      ).trim();

      const pronunciation = String(
        translatedRecord.transliteration || ""
      ).trim();

      const meaning = String(
        translatedRecord.translation || ""
      ).trim();

      const reference = String(
        translatedRecord.reference ||
        arabicRecord.reference ||
        ""
      ).trim();

      return {
        id: String(id),
        title,
        arabic,
        pronunciation,
        meaning,
        reference
      };
    })();

    duaCache.set(key, result);

    try {
      return await result;
    } catch (error) {
      duaCache.delete(key);
      console.warn("Du'a load failed:", id, error);
      return null;
    }
  }

  /* =======================================================
     CONCURRENT TASK RUNNER
     Prevents too many simultaneous requests.
  ======================================================= */

  async function runLimited(items, limit, worker) {
    const output = new Array(items.length);
    let nextIndex = 0;

    async function runWorker() {
      while (true) {
        const index = nextIndex++;

        if (index >= items.length) return;

        output[index] = await worker(items[index], index);
      }
    }

    const workers = [];

    for (
      let i = 0;
      i < Math.min(limit, items.length);
      i++
    ) {
      workers.push(runWorker());
    }

    await Promise.all(workers);

    return output;
  }

  /* =======================================================
     LOAD CATEGORY DUAS
  ======================================================= */

  async function loadCategoryDuas(category) {
    const cacheKey = `${language}:${category.id}`;

    if (categoryCache.has(cacheKey)) {
      return categoryCache.get(cacheKey);
    }

    const ids = getCategoryDuaIds(category);

    if (!ids.length) {
      categoryCache.set(cacheKey, []);
      return [];
    }

    const loaded = await runLimited(
      ids,
      8,
      id => loadOneDua(id)
    );

    const valid = loaded.filter(dua =>
      dua &&
      dua.arabic &&
      dua.title
    );

    categoryCache.set(cacheKey, valid);

    return valid;
  }

  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  function hideAllPages() {
    [
      el.home,
      el.entryPage,
      el.duaPage
    ].forEach(node => {
      if (node) node.classList.add("hidden");
    });
  }

  function hideLoading() {
    if (el.loadingBox) {
      el.loadingBox.classList.add("hidden");
    }
  }

  function hideError() {
    if (el.errorBox) {
      el.errorBox.classList.add("hidden");
    }
  }

  function showLoading(message) {
    hideAllPages();
    hideError();

    if (el.loadingBox) {
      el.loadingBox.textContent = message || t("loading");
      el.loadingBox.classList.remove("hidden");
    }
  }

  function showError(message) {
    hideLoading();
    hideAllPages();

    if (el.errorText) {
      el.errorText.textContent = message || t("sourceError");
    }

    if (el.errorBox) {
      el.errorBox.classList.remove("hidden");
    }
  }

  function showPage(page) {
    currentPage = page;

    hideLoading();
    hideError();

    el.home?.classList.toggle("hidden", page !== "home");
    el.entryPage?.classList.toggle("hidden", page !== "entries");
    el.duaPage?.classList.toggle("hidden", page !== "dua");

    updateHeader();
    updateFooter();

    if (page === "home" && el.chapterList) {
      el.chapterList.scrollTop = 0;
    }

    if (page === "entries" && el.entryList) {
      el.entryList.scrollTop = 0;
    }

    if (page === "dua" && el.duaContent) {
      el.duaContent.scrollTop = 0;
    }
  }

  /* =======================================================
     BROWSER / ANDROID BACK
  ======================================================= */

  function historyState(page) {
    return {
      ibadatDua: true,
      page
    };
  }

  function initializeHistory() {
    if (history.state?.ibadatDua) return;

    history.replaceState(
      historyState("home"),
      "",
      location.href
    );

    history.pushState(
      historyState("home"),
      "",
      location.href
    );
  }

  function navigateTo(page) {
    if (page === currentPage) return;

    history.pushState(
      historyState(page),
      "",
      location.href
    );

    showPage(page);
  }

  function handleBack(event) {
    const state = event.state;

    if (!state?.ibadatDua) return;

    if (state.page === "entries") {
      selectedDua = null;
      showPage("entries");
      return;
    }

    if (state.page === "dua") {
      updateHeader();
      return;
    }

    selectedCategory = null;
    selectedDua = null;
    showPage("home");
  }

  window.addEventListener("popstate", handleBack);

  /* =======================================================
     CATEGORY RENDERING
  ======================================================= */

  function renderCategories() {
    const box = el.chapterList;

    if (!box) return;

    clear(box);

    CATEGORY_DEFINITIONS.forEach((category, index) => {
      const button = makeElement("button", "chapter-item");
      button.type = "button";

      const number = makeElement(
        "span",
        "chapter-number",
        formatNumber(index + 1)
      );

      const name = makeElement(
        "span",
        "chapter-name",
        getCategoryName(category)
      );

      const arrow = makeElement(
        "span",
        "chapter-arrow",
        "›"
      );

      arrow.setAttribute("aria-hidden", "true");

      button.append(number, name, arrow);

      button.addEventListener("click", () => {
        openCategory(category);
      });

      box.appendChild(button);
    });
  }

  /* =======================================================
     OPEN CATEGORY
  ======================================================= */

  async function openCategory(category) {
    if (loadingCategory) return;

    selectedCategory = category;
    selectedDua = null;

    const version = ++requestVersion;

    showLoading(t("loadingDuas"));

    navigateTo("entries");

    showLoading(t("loadingDuas"));

    loadingCategory = true;

    try {
      const duas = await loadCategoryDuas(category);

      if (version !== requestVersion) return;

      renderDuaList(duas);
      showPage("entries");

    } catch (error) {
      console.error("Category loading error:", error);
      showError(t("sourceError"));

    } finally {
      loadingCategory = false;
    }
  }

  /* =======================================================
     DUA LIST
  ======================================================= */

  function renderDuaList(duas) {
    const box = el.entryList;

    if (!box) return;

    clear(box);

    if (!duas.length) {
      showEmpty(box, t("noDuas"));
      return;
    }

    duas.forEach((dua, index) => {
      const button = makeElement("button", "entry-item");
      button.type = "button";

      const number = makeElement(
        "span",
        "entry-number",
        formatNumber(index + 1)
      );

      const name = makeElement(
        "span",
        "entry-name",
        dua.title
      );

      const arrow = makeElement(
        "span",
        "entry-arrow",
        "›"
      );

      arrow.setAttribute("aria-hidden", "true");

      button.append(number, name, arrow);

      button.addEventListener("click", () => {
        openDua(dua);
      });

      box.appendChild(button);
    });
  }

  /* =======================================================
     DUA DETAILS
  ======================================================= */

  function addDuaField(card, label, value, className, dir) {
    if (!value) return;

    const section = makeElement("section", "dua-section");

    const heading = makeElement(
      "div",
      "dua-label",
      label
    );

    const paragraph = makeElement(
      "p",
      className,
      value
    );

    if (dir === "rtl") {
      paragraph.dir = "rtl";
      paragraph.lang = "ar";
    }

    section.append(heading, paragraph);
    card.appendChild(section);
  }

  function renderDua(dua) {
    const box = el.duaContent;

    if (!box) return;

    clear(box);

    if (!dua) {
      showEmpty(box, t("noDetails"));
      return;
    }

    const card = makeElement("article", "dua-card");

    const heading = makeElement(
      "h2",
      "dua-heading",
      dua.title
    );

    card.appendChild(heading);

    addDuaField(
      card,
      t("arabic"),
      dua.arabic,
      "dua-arabic",
      "rtl"
    );

    addDuaField(
      card,
      t("pronunciation"),
      dua.pronunciation,
      "dua-pronunciation"
    );

    addDuaField(
      card,
      t("meaning"),
      dua.meaning || t("missingMeaning"),
      "dua-translation"
    );

    addDuaField(
      card,
      t("reference"),
      dua.reference,
      "dua-reference"
    );

    box.appendChild(card);
  }

  function openDua(dua) {
    selectedDua = dua;

    renderDua(dua);
    navigateTo("dua");
  }

  /* =======================================================
     LANGUAGE / THEME REFRESH
  ======================================================= */

  async function refreshSettings() {
    if (settingsReloading) return;

    const oldLanguage = language;
    const oldTheme = colorTheme;
    const oldDark = darkMode;

    readSettings();

    const languageChanged = oldLanguage !== language;

    const appearanceChanged =
      oldTheme !== colorTheme ||
      oldDark !== darkMode;

    if (appearanceChanged) {
      applyTheme();
    }

    if (languageChanged) {
      settingsReloading = true;

      const previousPage = currentPage;
      const previousCategoryId = selectedCategory?.id;
      const previousDuaId = selectedDua?.id;

      try {
        subcategories = [];
        categoryCache.clear();

        await loadSubcategories();

        selectedCategory =
          CATEGORY_DEFINITIONS.find(
            item => item.id === previousCategoryId
          ) || null;

        selectedDua = null;

        if (
          previousPage === "entries" &&
          selectedCategory
        ) {
          showLoading(t("loadingDuas"));

          const duas =
            await loadCategoryDuas(selectedCategory);

          renderDuaList(duas);
          showPage("entries");

        } else if (
          previousPage === "dua" &&
          selectedCategory
        ) {
          showLoading(t("loadingDetails"));

          const duas =
            await loadCategoryDuas(selectedCategory);

          selectedDua =
            duas.find(dua =>
              String(dua.id) === String(previousDuaId)
            ) || null;

          if (selectedDua) {
            renderDua(selectedDua);
            showPage("dua");
          } else {
            renderDuaList(duas);
            showPage("entries");
          }

        } else {
          renderCategories();
          showPage("home");
        }

      } catch (error) {
        console.error("Language refresh:", error);
        showError(t("dataError"));

      } finally {
        settingsReloading = false;
      }

      return;
    }

    applyLabels();
  }

  window.addEventListener("storage", event => {
    if (
      event.key &&
      !SETTINGS_KEYS.includes(event.key)
    ) {
      return;
    }

    refreshSettings();
  });

  window.addEventListener("pageshow", () => {
    refreshSettings();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      refreshSettings();
    }
  });

  /* =======================================================
     RETRY
  ======================================================= */

  async function retry() {
    requestVersion++;

    sourceReady = false;
    loadingCategory = false;

    subcategories = [];

    duaCache.clear();
    categoryCache.clear();

    await init();
  }

  /* =======================================================
     INITIALIZATION
  ======================================================= */

  async function init() {
    const version = ++requestVersion;

    readSettings();
    initializeHistory();

    showLoading(t("loading"));

    try {
      await loadSubcategories();

      if (version !== requestVersion) return;

      renderCategories();
      showPage("home");

    } catch (error) {
      console.error("IBADAT Dua initialization:", error);

      if (error.name === "AbortError") {
        showError(t("networkError"));
      } else {
        showError(t("sourceError"));
      }
    }
  }

  /* =======================================================
     EVENTS
  ======================================================= */

  if (el.retryButton) {
    el.retryButton.addEventListener("click", retry);
  }

  init();

})();
