"use strict";

/* =========================================================
   IBADAT — DUA.JS
   IslamicAPI / Masnun Dua Dataset
   20 Curated Categories
   Bengali / English / Hindi
   Lazy Loading + Arabic Validation
   Global Dua-ID de-duplication
========================================================= */

(() => {
  const BASE =
    "https://raw.githubusercontent.com/islamicapi/masnun-dua/main/";

  const SETTINGS_KEYS = ["appSettings", "ibadatSettings"];
  const THEMES = ["classic", "royal", "rose", "pista"];

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
      noDuas: "এই বিভাগে কোনো দোয়া পাওয়া যায়নি।",
      noDetails: "এই দোয়ার বিস্তারিত তথ্য পাওয়া যায়নি।",
      missingMeaning: "এই ভাষায় অর্থ পাওয়া যায়নি।",
      networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      dataError: "ডেটা সঠিকভাবে পড়া যায়নি।",
      sourceError: "দোয়ার তথ্য লোড করা যায়নি।"
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
      noDuas: "No Du'as were found in this category.",
      noDetails: "Details for this Du'a could not be found.",
      missingMeaning: "Meaning is not available in this language.",
      networkError: "Check your internet connection and try again.",
      dataError: "The data could not be read correctly.",
      sourceError: "Could not load Du'a data."
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
      noDuas: "इस श्रेणी में कोई दुआ नहीं मिली।",
      noDetails: "इस दुआ की जानकारी नहीं मिली।",
      missingMeaning: "इस भाषा में अर्थ उपलब्ध नहीं है।",
      networkError: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
      dataError: "डेटा सही ढंग से पढ़ा नहीं जा सका।",
      sourceError: "दुआ की जानकारी लोड नहीं हो सकी।"
    }
  };

  let language = "bn";
  let darkMode = false;
  let colorTheme = "classic";
  let currentPage = "home";

  let subcategories = [];
  let selectedCategory = null;
  let selectedDua = null;

  let loadingCategory = false;
  let settingsReloading = false;
  let requestVersion = 0;

  const duaCache = new Map();
  const categoryCache = new Map();

  const t = key =>
    TEXT[language]?.[key] || TEXT.bn[key] || key;

  /* =======================================================
     20 APPROVED MAIN CATEGORIES

     Source subcategory slugs are assigned to one primary
     category only. Broad, unspecific source collections are
     deliberately not dumped into a miscellaneous category.
  ======================================================= */

  const CATEGORY_DEFINITIONS = [
    {
      id: "life-family",
      bn: "জীবন ও পরিবার",
      en: "Life & Family",
      hi: "जीवन और परिवार",
      slugs: ["family"]
    },
    {
      id: "marriage",
      bn: "বিবাহ ও দাম্পত্য",
      en: "Marriage & Married Life",
      hi: "विवाह और दांपत्य जीवन",
      slugs: ["marriage"]
    },
    {
      id: "daily-life",
      bn: "দৈনন্দিন জীবন",
      en: "Daily Life",
      hi: "दैनिक जीवन",
      slugs: ["sleep", "cloths", "home"]
    },
    {
      id: "purity",
      bn: "পবিত্রতা ও পরিচ্ছন্নতা",
      en: "Purity & Cleanliness",
      hi: "पवित्रता और स्वच्छता",
      slugs: ["ablution-and-bath", "toilet"]
    },
    {
      id: "food-drink",
      bn: "খাদ্য ও পানীয়",
      en: "Food & Drink",
      hi: "भोजन और पेय",
      slugs: ["food"]
    },
    {
      id: "salah-mosque",
      bn: "নামাজ ও মসজিদ",
      en: "Salah & Mosque",
      hi: "नमाज़ और मस्जिद",
      slugs: [
        "adhaan-and-iqamah",
        "mosque",
        "salah",
        "witr-and-other"
      ]
    },
    {
      id: "fasting",
      bn: "রোজা ও রমজান",
      en: "Fasting & Ramadan",
      hi: "रोज़ा और रमज़ान",
      slugs: ["fasting"]
    },
    {
      id: "eid-sacrifice",
      bn: "ঈদ ও কুরবানি",
      en: "Eid & Sacrifice",
      hi: "ईद और क़ुर्बानी",
      slugs: ["eid", "sacrifice"]
    },
    {
      id: "hajj-umrah",
      bn: "হজ ও ওমরাহ",
      en: "Hajj & Umrah",
      hi: "हज और उमराह",
      slugs: ["hajj-and-umrah"]
    },
    {
      id: "travel",
      bn: "সফর ও যাতায়াত",
      en: "Travel & Transportation",
      hi: "सफ़र और यातायात",
      slugs: ["travel"]
    },
    {
      id: "society-manners",
      bn: "সমাজ ও শিষ্টাচার",
      en: "Society & Manners",
      hi: "समाज और शिष्टाचार",
      slugs: [
        "manners",
        "gathering",
        "condemnationpraise"
      ]
    },
    {
      id: "nature-animals",
      bn: "প্রকৃতি ও প্রাণিজগৎ",
      en: "Nature & Animals",
      hi: "प्रकृति और जीव-जगत",
      slugs: ["rainnature", "animals"]
    },
    {
      id: "health-healing",
      bn: "স্বাস্থ্য ও আরোগ্য",
      en: "Health & Healing",
      hi: "स्वास्थ्य और शिफ़ा",
      slugs: ["sickness"]
    },
    {
      id: "protection",
      bn: "সুরক্ষা ও আশ্রয়",
      en: "Protection & Refuge",
      hi: "सुरक्षा और पनाह",
      slugs: ["evil-protection", "jinndiseases"]
    },
    {
      id: "hardship",
      bn: "বিপদ ও দুশ্চিন্তা",
      en: "Hardship & Anxiety",
      hi: "मुसीबत और चिंता",
      slugs: ["anxiety", "danger"]
    },
    {
      id: "provision",
      bn: "রিজিক ও প্রয়োজন",
      en: "Provision & Needs",
      hi: "रिज़्क़ और ज़रूरतें",
      slugs: ["debt"]
    },
    {
      id: "forgiveness",
      bn: "ক্ষমা ও তওবা",
      en: "Forgiveness & Repentance",
      hi: "माफ़ी और तौबा",
      slugs: ["forgiveness"]
    },
    {
      id: "quran-prophets",
      bn: "কুরআন ও নবীদের দোয়া",
      en: "Quranic & Prophetic Du'as",
      hi: "क़ुरआन और पैग़म्बरों की दुआएँ",
      slugs: [
        "quranic-dua",
        "40-rabbana-duas",
        "prophets-dua"
      ]
    },
    {
      id: "dhikr-etiquette",
      bn: "যিকির ও দোয়ার আদব",
      en: "Dhikr & Etiquette of Du'a",
      hi: "ज़िक्र और दुआ के आदाब",
      slugs: [
        "morning-and-evening",
        "duas-importance",
        "duas-excellence",
        "time-of-dua",
        "dua-acceptance",
        "greatest-name-of-allah"
      ]
    },
    {
      id: "death-afterlife",
      bn: "মৃত্যু ও আখিরাত",
      en: "Death & Hereafter",
      hi: "मृत्यु और आख़िरत",
      slugs: ["grave-funeral"]
    }
  ];

  /* Broad source collections are not assigned wholesale.
     Their individual Dua IDs need content-level classification. */
  const UNMAPPED_BROAD_SLUGS = new Set([
    "duas-of-hadith",
    "duas-of-sahaba",
    "masnun-duas",
    "other-duas",
    "when-to-say-what"
  ]);

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

    language = normalizeLanguage(
      settings.lang ||
      settings.language ||
      settings.locale ||
      "bn"
    );

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
    const normalized = String(value || "bn")
      .toLowerCase()
      .trim();

    if (["en", "eng", "english"].includes(normalized)) {
      return "en";
    }

    if (["hi", "hin", "hindi"].includes(normalized)) {
      return "hi";
    }

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

      meta.content = darkMode ? "#081b13" : colors[colorTheme];
    }
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
      el.heroTitle.textContent = selectedCategory
        ? getCategoryName(selectedCategory)
        : t("entries");
      return;
    }

    if (currentPage === "dua" && selectedDua) {
      el.heroTitle.textContent = selectedDua.title || t("title");
      return;
    }

    el.heroTitle.textContent = t("title");
  }

  function updateFooter() {
    if (el.footerText) {
      el.footerText.textContent = t("footer");
    }
  }

  function getCategoryName(category) {
    return category?.[language] || category?.bn || "";
  }

  /* =======================================================
     HELPERS
  ======================================================= */

  function makeElement(tag, className, text) {
    const node = document.createElement(tag);

    if (className) {
      node.className = className;
    }

    if (text !== undefined && text !== null) {
      node.textContent = String(text);
    }

    return node;
  }

  function clear(node) {
    if (node) {
      node.replaceChildren();
    }
  }

  function showEmpty(container, message) {
    if (!container) return;

    clear(container);

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
    if (value === undefined || value === null) {
      return "";
    }

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

  function extractDuaIds(group) {
    const values = Array.isArray(group?.["dua-ids"])
      ? group["dua-ids"]
      : [];

    return values
      .map(value => normalizeId(
        isObject(value)
          ? value.dua_id || value.id
          : value
      ))
      .filter(Boolean);
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

  async function loadSubcategories() {
    const data = await fetchJSON(
      getRawURL(`sub-categories/${language}.json`)
    );

    if (!Array.isArray(data)) {
      throw new Error("Invalid subcategory data");
    }

    subcategories = data;
  }

  /* =======================================================
     CATEGORY / ID OWNERSHIP

     A Dua ID is allowed to appear in one main category only.
     Repeated IDs are kept only in their first mapped category.
  ======================================================= */

  function getCategorySubcategories(category) {
    const slugs = new Set(
      category.slugs.map(normalizeSlug)
    );

    return subcategories.filter(item =>
      slugs.has(normalizeSlug(item.category))
    );
  }

  function buildCategoryIdMap() {
    const map = new Map();
    const claimedIds = new Set();

    CATEGORY_DEFINITIONS.forEach(category => {
      const categoryIds = [];
      const localSeen = new Set();

      getCategorySubcategories(category).forEach(group => {
        extractDuaIds(group).forEach(id => {
          if (localSeen.has(id) || claimedIds.has(id)) {
            return;
          }

          localSeen.add(id);
          claimedIds.add(id);
          categoryIds.push(id);
        });
      });

      map.set(category.id, categoryIds);
    });

    return map;
  }

  let categoryIdMap = new Map();

  /* =======================================================
     LOAD ONE DUA
     Arabic and selected translation use the same source ID.
  ======================================================= */

  async function loadOneDua(id) {
    const key = `${language}:${id}`;

    if (duaCache.has(key)) {
      return duaCache.get(key);
    }

    const task = (async () => {
      const [arabicRecord, translatedRecord] =
        await Promise.all([
          fetchJSON(
            getRawURL(`translation/ar/dua_${id}.json`)
          ),
          fetchJSON(
            getRawURL(`translation/${language}/dua_${id}.json`)
          )
        ]);

      if (
        !isObject(arabicRecord) ||
        !isObject(translatedRecord)
      ) {
        return null;
      }

      if (
        String(arabicRecord.dua_id) !== String(id) ||
        String(translatedRecord.dua_id) !== String(id)
      ) {
        return null;
      }

      const arabic = String(
        arabicRecord.arabic ||
        translatedRecord.arabic ||
        ""
      ).trim();

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

      if (!title) {
        return null;
      }

      return {
        id: String(id),
        title,
        arabic,
        pronunciation,
        meaning,
        reference
      };
    })();

    duaCache.set(key, task);

    try {
      return await task;
    } catch (error) {
      duaCache.delete(key);
      console.warn("Du'a load failed:", id, error);
      return null;
    }
  }

  /* =======================================================
     LIMITED CONCURRENCY
  ======================================================= */

  async function runLimited(items, limit, worker) {
    const output = new Array(items.length);
    let nextIndex = 0;

    async function runWorker() {
      while (true) {
        const index = nextIndex++;

        if (index >= items.length) {
          return;
        }

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

  async function loadCategoryDuas(category) {
    const cacheKey = `${language}:${category.id}`;

    if (categoryCache.has(cacheKey)) {
      return categoryCache.get(cacheKey);
    }

    const ids = categoryIdMap.get(category.id) || [];

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
      dua.id &&
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
      node?.classList.add("hidden");
    });
  }

  function hideLoading() {
    el.loadingBox?.classList.add("hidden");
  }

  function hideError() {
    el.errorBox?.classList.add("hidden");
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

    el.errorBox?.classList.remove("hidden");
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

    currentPage = page;
  }

  function handleBack(event) {
    const state = event.state;

    if (!state?.ibadatDua) {
      selectedCategory = null;
      selectedDua = null;
      showPage("home");
      return;
    }

    if (state.page === "entries") {
      selectedDua = null;
      showPage("entries");
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

    if (!CATEGORY_DEFINITIONS.length) {
      showEmpty(box, t("noCategories"));
      return;
    }

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
    if (loadingCategory || settingsReloading) return;

    selectedCategory = category;
    selectedDua = null;

    const version = ++requestVersion;

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

      if (version === requestVersion) {
        showError(t("sourceError"));
      }

    } finally {
      if (version === requestVersion) {
        loadingCategory = false;
      }
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

  function addDuaField(
    card,
    label,
    value,
    className,
    direction
  ) {
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

    if (direction === "rtl") {
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

    navigateTo("dua");
    renderDua(dua);
    showPage("dua");
  }

  /* =======================================================
     LANGUAGE / THEME REFRESH
  ======================================================= */

  async function refreshSettings() {
    if (settingsReloading) return;

    const previousLanguage = language;
    const previousTheme = colorTheme;
    const previousDark = darkMode;
    const previousPage = currentPage;
    const previousCategoryId = selectedCategory?.id;
    const previousDuaId = selectedDua?.id;

    readSettings();

    const languageChanged =
      previousLanguage !== language;

    const appearanceChanged =
      previousTheme !== colorTheme ||
      previousDark !== darkMode;

    if (appearanceChanged) {
      applyTheme();
    }

    if (!languageChanged) {
      applyLabels();
      return;
    }

    settingsReloading = true;

    const version = ++requestVersion;

    try {
      subcategories = [];
      categoryCache.clear();

      await loadSubcategories();

      if (version !== requestVersion) return;

      categoryIdMap = buildCategoryIdMap();

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

        if (version !== requestVersion) return;

        renderDuaList(duas);
        showPage("entries");

      } else if (
        previousPage === "dua" &&
        selectedCategory
      ) {
        showLoading(t("loadingDetails"));

        const duas =
          await loadCategoryDuas(selectedCategory);

        if (version !== requestVersion) return;

        selectedDua = duas.find(
          dua => String(dua.id) === String(previousDuaId)
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

      if (version === requestVersion) {
        showError(t("dataError"));
      }

    } finally {
      if (version === requestVersion) {
        settingsReloading = false;
      }
    }
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

    loadingCategory = false;
    subcategories = [];

    categoryIdMap.clear();
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

      categoryIdMap = buildCategoryIdMap();

      renderCategories();
      showPage("home");

    } catch (error) {
      console.error("IBADAT Dua initialization:", error);

      if (version !== requestVersion) return;

      showError(
        error.name === "AbortError"
          ? t("networkError")
          : t("sourceError")
      );
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
