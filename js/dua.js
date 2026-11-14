"use strict";

/* =========================================================
   IBADAT — DUA.JS
   Source: IslamicAPI / masnun-dua
   Languages: Bengali / English / Hindi
   Theme: appSettings / ibadatSettings
   Navigation: Browser / Android Back
========================================================= */

(() => {
  const REPO_API =
    "https://api.github.com/repos/islamicapi/masnun-dua";

  const RAW_BASE =
    "https://raw.githubusercontent.com/islamicapi/masnun-dua/main/";

  const LANGUAGES = ["bn", "en", "hi"];
  const SETTINGS_KEYS = ["appSettings", "ibadatSettings"];
  const VALID_THEMES = ["classic", "royal", "rose", "pista"];

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

  const TEXT = {
    bn: {
      title: "দোয়া",
      subtitle: "দোয়া শিখুন, পড়ুন ও প্রশান্তি অনুভব করুন",
      footer: "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।",
      loading: "দোয়ার তথ্য লোড হচ্ছে...",
      loadingCategories: "দোয়ার বিভাগ লোড হচ্ছে...",
      loadingEntries: "দোয়ার তালিকা লোড হচ্ছে...",
      loadingDetails: "দোয়ার বিস্তারিত লোড হচ্ছে...",
      retry: "আবার চেষ্টা করুন",
      category: "বিভাগ",
      dua: "দোয়া",
      arabic: "আরবি",
      pronunciation: "উচ্চারণ",
      meaning: "অর্থ",
      reference: "সূত্র",
      bengali: "বাংলা",
      english: "English",
      hindi: "हिन्दी",
      noCategories: "কোনো বিভাগ পাওয়া যায়নি।",
      noEntries: "এই বিভাগে কোনো দোয়া পাওয়া যায়নি।",
      noDetails: "এই দোয়ার তথ্য পাওয়া যায়নি।",
      missingTranslation: "এই ভাষার অনুবাদ পাওয়া যায়নি।",
      sourceError: "দোয়ার ডেটাসোর্স থেকে তথ্য আনা যায়নি।",
      networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      dataError: "ডেটার কাঠামো সঠিকভাবে পড়া যায়নি।",
      number: "দোয়া"
    },

    en: {
      title: "Du'a",
      subtitle: "Learn, recite and find peace through supplication",
      footer: "Peace comes through the remembrance of Allah.",
      loading: "Loading Du'a data...",
      loadingCategories: "Loading categories...",
      loadingEntries: "Loading Du'as...",
      loadingDetails: "Loading Du'a details...",
      retry: "Try again",
      category: "Category",
      dua: "Du'a",
      arabic: "Arabic",
      pronunciation: "Pronunciation",
      meaning: "Meaning",
      reference: "Reference",
      bengali: "বাংলা",
      english: "English",
      hindi: "हिन्दी",
      noCategories: "No categories were found.",
      noEntries: "No Du'as were found in this category.",
      noDetails: "No details were found for this Du'a.",
      missingTranslation: "Translation is not available in this language.",
      sourceError: "Could not retrieve data from the Du'a source.",
      networkError: "Check your internet connection and try again.",
      dataError: "The dataset could not be read correctly.",
      number: "Du'a"
    },

    hi: {
      title: "दुआ",
      subtitle: "दुआ सीखें, पढ़ें और सुकून पाएँ",
      footer: "अल्लाह के ज़िक्र से दिलों को सुकून मिलता है।",
      loading: "दुआ की जानकारी लोड हो रही है...",
      loadingCategories: "श्रेणियाँ लोड हो रही हैं...",
      loadingEntries: "दुआओं की सूची लोड हो रही है...",
      loadingDetails: "दुआ की जानकारी लोड हो रही है...",
      retry: "फिर कोशिश करें",
      category: "श्रेणी",
      dua: "दुआ",
      arabic: "अरबी",
      pronunciation: "उच्चारण",
      meaning: "अर्थ",
      reference: "संदर्भ",
      bengali: "বাংলা",
      english: "English",
      hindi: "हिन्दी",
      noCategories: "कोई श्रेणी नहीं मिली।",
      noEntries: "इस श्रेणी में कोई दुआ नहीं मिली।",
      noDetails: "इस दुआ की जानकारी नहीं मिली।",
      missingTranslation: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      sourceError: "दुआ स्रोत से जानकारी प्राप्त नहीं हो सकी।",
      networkError: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
      dataError: "डेटासेट को सही ढंग से पढ़ा नहीं जा सका।",
      number: "दुआ"
    }
  };

  let language = "bn";
  let darkMode = false;
  let colorTheme = "classic";

  let currentPage = "home";

  let categories = [];
  let subcategories = [];

  let allTranslations = {
    ar: new Map(),
    bn: new Map(),
    en: new Map(),
    hi: new Map()
  };

  let selectedCategory = null;
  let selectedDua = null;

  let fileTree = [];
  let requestVersion = 0;

  let sourceReady = false;
  let historyReady = false;
  let settingsReloading = false;

  const t = key =>
    TEXT[language]?.[key] ?? TEXT.bn[key] ?? key;

  /* =======================================================
     LANGUAGE / NUMBER HELPERS
  ======================================================= */

  function normalizeLanguage(value) {
    const v = String(value || "bn").toLowerCase().trim();

    if (["en", "eng", "english"].includes(v)) return "en";
    if (["hi", "hin", "hindi"].includes(v)) return "hi";

    return "bn";
  }

  function formatNumber(value) {
    const locale = {
      bn: "bn-BD",
      en: "en-IN",
      hi: "hi-IN"
    }[language] || "bn-BD";

    return new Intl.NumberFormat(locale).format(value);
  }

  function normalizeId(value) {
    if (value === undefined || value === null) return "";

    return String(value).trim();
  }

  function normalizeSlug(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\/+$/, "");
  }

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
        console.warn("IBADAT settings read error:", error);
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

    colorTheme = VALID_THEMES.includes(settings.themeColor)
      ? settings.themeColor
      : "classic";

    applyTheme();
    applyLabels();
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

    if (currentPage === "entries" && selectedCategory) {
      el.heroTitle.textContent =
        getLocalizedCategoryName(selectedCategory) || t("title");

    } else if (currentPage === "dua" && selectedDua) {
      el.heroTitle.textContent =
        getLocalizedDuaName(selectedDua) || t("title");

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
     GENERAL HELPERS
  ======================================================= */

  function isObject(value) {
    return value !== null &&
      typeof value === "object" &&
      !Array.isArray(value);
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function cleanText(value) {
    if (typeof value === "string" || typeof value === "number") {
      return String(value).trim();
    }

    return "";
  }

  function firstText(object, keys) {
    if (!isObject(object)) return "";

    for (const key of keys) {
      const value = object[key];

      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }

      if (typeof value === "number") {
        return String(value);
      }

      if (isObject(value)) {
        const nested =
          value[language] ||
          value[`${language}-IN`] ||
          value[`${language}-BD`] ||
          value.text ||
          value.value ||
          value.translation ||
          value.meaning;

        if (typeof nested === "string" && nested.trim()) {
          return nested.trim();
        }
      }
    }

    return "";
  }

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

  /* =======================================================
     LOCALIZED RECORD FIELDS
  ======================================================= */

  function getLocalizedValue(item, lang, keys) {
    if (!isObject(item)) return "";

    for (const key of keys) {
      const value = item[key];

      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }

      if (isObject(value)) {
        const nested =
          value[lang] ||
          value[`${lang}-IN`] ||
          value[`${lang}-BD`] ||
          value.text ||
          value.title ||
          value.name ||
          value.value;

        if (typeof nested === "string" && nested.trim()) {
          return nested.trim();
        }
      }
    }

    return "";
  }

  function getLocalizedCategoryName(item) {
    if (!isObject(item)) return "";

    return getLocalizedValue(item, language, [
      "name",
      "title",
      "category_name",
      "translation"
    ]);
  }

  function getLocalizedDuaName(item) {
    if (!isObject(item)) return "";

    return getLocalizedValue(item, language, [
      "title",
      "name",
      "dua_name",
      "duaName",
      "heading",
      "translation"
    ]);
  }

  function getArabic(item) {
    if (!isObject(item)) return "";

    return firstText(item, [
      "arabic",
      "ar",
      "arabic_text",
      "arabicText",
      "text_ar",
      "textArabic",
      "dua_ar",
      "dua",
      "text"
    ]);
  }

  function getMeaning(item, lang) {
    if (!isObject(item)) return "";

    const keys = {
      bn: [
        "bn",
        "bengali",
        "bangla",
        "translation_bn",
        "meaning_bn",
        "translation",
        "meaning",
        "text"
      ],

      en: [
        "en",
        "english",
        "translation_en",
        "meaning_en",
        "translation",
        "meaning",
        "text"
      ],

      hi: [
        "hi",
        "hindi",
        "translation_hi",
        "meaning_hi",
        "translation",
        "meaning",
        "text"
      ]
    };

    return getLocalizedValue(item, lang, keys[lang] || []);
  }

  function getReference(item) {
    if (!isObject(item)) return "";

    const value =
      item.reference ??
      item.references ??
      item.source ??
      item.hadith ??
      item.footnote ??
      "";

    if (typeof value === "string") {
      return value.trim();
    }

    if (Array.isArray(value)) {
      return value
        .map(item => {
          if (typeof item === "string") return item;

          return item?.text ||
            item?.name ||
            item?.reference ||
            "";
        })
        .filter(Boolean)
        .join(" • ");
    }

    if (isObject(value)) {
      return value.text ||
        value.name ||
        value.title ||
        value.reference ||
        "";
    }

    return "";
  }

  /*
   * Prefer a pronunciation explicitly belonging to the
   * currently selected language. If the source only provides
   * one common transliteration, use that as a fallback.
   */
  function getPronunciation(records, lang = language) {
    const languageKeys = {
      bn: [
        "transliteration_bn",
        "pronunciation_bn",
        "pronunciation_bn_bd"
      ],
      en: [
        "transliteration_en",
        "pronunciation_en"
      ],
      hi: [
        "transliteration_hi",
        "pronunciation_hi"
      ]
    };

    for (const item of records) {
      if (!isObject(item)) continue;

      const specific = firstText(
        item,
        languageKeys[lang] || []
      );

      if (specific) return specific;
    }

    for (const item of records) {
      if (!isObject(item)) continue;

      const common = firstText(item, [
        "transliteration",
        "pronunciation",
        "latin",
        "phonetic"
      ]);

      if (common) return common;
    }

    return "";
  }

  /* =======================================================
     LOADING / ERROR
  ======================================================= */

  function hideAllPages() {
    [el.home, el.entryPage, el.duaPage].forEach(node => {
      if (node) node.classList.add("hidden");
    });
  }

  function showLoading(message) {
    hideAllPages();

    if (el.errorBox) {
      el.errorBox.classList.add("hidden");
    }

    if (el.loadingBox) {
      el.loadingBox.textContent = message || t("loading");
      el.loadingBox.classList.remove("hidden");
    }
  }

  function hideLoading() {
    if (el.loadingBox) {
      el.loadingBox.classList.add("hidden");
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

  function hideError() {
    if (el.errorBox) {
      el.errorBox.classList.add("hidden");
    }
  }

  /* =======================================================
     NETWORK
  ======================================================= */

  async function fetchJSON(url, timeoutMs = 25000) {
    const controller = new AbortController();

    const timer = setTimeout(
      () => controller.abort(),
      timeoutMs
    );

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Accept: "application/json"
        },
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${url}`);
      }

      return await response.json();

    } finally {
      clearTimeout(timer);
    }
  }

  async function fetchRepositoryTree() {
    const data = await fetchJSON(
      `${REPO_API}/git/trees/main?recursive=1`
    );

    if (!Array.isArray(data.tree)) {
      throw new Error("Repository tree is unavailable");
    }

    fileTree = data.tree
      .filter(item =>
        item.type === "blob" &&
        typeof item.path === "string" &&
        item.path.toLowerCase().endsWith(".json")
      )
      .map(item => item.path);

    if (!fileTree.length) {
      throw new Error("No JSON files found in repository");
    }
  }

  async function fetchLanguageFile(path) {
    if (!path) {
      throw new Error("Required language file was not found");
    }

    const encodedPath = path
      .split("/")
      .map(encodeURIComponent)
      .join("/");

    return fetchJSON(RAW_BASE + encodedPath);
  }

  /* =======================================================
     EXACT LANGUAGE FILE DISCOVERY
  ======================================================= */

  function findExactLanguageFile(folder, lang) {
    const normalizedFolder = folder.toLowerCase();
    const normalizedLang = lang.toLowerCase();

    const candidates = fileTree.filter(path => {
      const parts = path.toLowerCase().split("/");
      const fileName = parts[parts.length - 1];
      const baseName = fileName.replace(/\.json$/i, "");

      return (
        parts.length === 2 &&
        parts[0] === normalizedFolder &&
        baseName === normalizedLang
      );
    });

    return candidates[0] || null;
  }

  function findTranslationFiles(lang) {
    const normalizedLang = lang.toLowerCase();

    return fileTree.filter(path => {
      const parts = path.toLowerCase().split("/");

      if (parts[0] !== "translation") return false;

      const fileName = parts[parts.length - 1];
      const baseName = fileName.replace(/\.json$/i, "");

      return (
        baseName === normalizedLang ||
        parts.slice(1, -1).includes(normalizedLang)
      );
    });
  }

  /* =======================================================
     JSON NORMALIZATION
  ======================================================= */

  function unwrapArray(data, keys = []) {
    if (Array.isArray(data)) return data;

    if (!isObject(data)) return [];

    for (const key of keys) {
      if (Array.isArray(data[key])) {
        return data[key];
      }
    }

    if (isObject(data.data)) {
      for (const key of keys) {
        if (Array.isArray(data.data[key])) {
          return data.data[key];
        }
      }

      if (Array.isArray(data.data.items)) {
        return data.data.items;
      }
    }

    if (Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  }

  function getRecordId(item, fallbackKey = "") {
    if (!isObject(item)) {
      return fallbackKey ? String(fallbackKey) : "";
    }

    const possible = [
      item.id,
      item.dua_id,
      item.duaId,
      item.global_id,
      item.globalId,
      item.number,
      item.dua_number,
      item.duaNumber,
      item.key
    ];

    for (const value of possible) {
      if (value !== undefined && value !== null && value !== "") {
        return String(value);
      }
    }

    if (fallbackKey && /^\d+$/.test(String(fallbackKey))) {
      return String(fallbackKey);
    }

    return "";
  }

  function addRecordToMap(map, record, fallbackKey = "") {
    if (!isObject(record)) return;

    const id = getRecordId(record, fallbackKey);

    if (!id) return;

    if (!map.has(id)) {
      map.set(id, record);
    }
  }

  function collectRecords(value, map, depth = 0, fallbackKey = "") {
    if (depth > 15 || value == null) return;

    if (Array.isArray(value)) {
      value.forEach(item => {
        collectRecords(item, map, depth + 1);
      });

      return;
    }

    if (!isObject(value)) return;

    const id = getRecordId(value, fallbackKey);

    if (id) {
      addRecordToMap(map, value, fallbackKey);
    }

    Object.entries(value).forEach(([key, child]) => {
      if (Array.isArray(child) || isObject(child)) {
        collectRecords(child, map, depth + 1, key);
      }
    });
  }

  function indexRecords(data) {
    const map = new Map();

    if (Array.isArray(data)) {
      data.forEach(record => addRecordToMap(map, record));
      return map;
    }

    if (!isObject(data)) return map;

    const directArrays = [
      data.data,
      data.items,
      data.results,
      data.duas,
      data.translations
    ];

    for (const value of directArrays) {
      if (Array.isArray(value)) {
        value.forEach(record => addRecordToMap(map, record));
      }
    }

    collectRecords(data, map);

    return map;
  }

  function mergeTranslationMaps(target, source) {
    source.forEach((record, id) => {
      if (!target.has(id)) {
        target.set(id, record);
      }
    });
  }

  async function loadTranslationLanguage(lang) {
    const paths = findTranslationFiles(lang);

    if (!paths.length) {
      console.warn(
        `IBADAT: No explicitly named translation file found for ${lang}`
      );

      return new Map();
    }

    const result = new Map();

    const batchSize = 8;

    for (let i = 0; i < paths.length; i += batchSize) {
      const batch = paths.slice(i, i + batchSize);

      const datasets = await Promise.all(
        batch.map(path => fetchLanguageFile(path))
      );

      datasets.forEach(data => {
        mergeTranslationMaps(result, indexRecords(data));
      });
    }

    return result;
  }

  /* =======================================================
     DATA SOURCE
  ======================================================= */

  async function loadSource() {
    await fetchRepositoryTree();

    const categoryPath = findExactLanguageFile(
      "categories",
      language
    );

    const subcategoryPath = findExactLanguageFile(
      "sub-categories",
      language
    );

    if (!categoryPath || !subcategoryPath) {
      throw new Error(
        `Category files for ${language} were not found`
      );
    }

    const [
      categoryData,
      subcategoryData,
      arabicMap,
      bengaliMap,
      englishMap,
      hindiMap
    ] = await Promise.all([
      fetchLanguageFile(categoryPath),
      fetchLanguageFile(subcategoryPath),
      loadTranslationLanguage("ar"),
      loadTranslationLanguage("bn"),
      loadTranslationLanguage("en"),
      loadTranslationLanguage("hi")
    ]);

    categories = unwrapArray(categoryData, [
      "categories",
      "items",
      "results"
    ]);

    subcategories = unwrapArray(subcategoryData, [
      "subcategories",
      "sub_categories",
      "items",
      "results"
    ]);

    if (!categories.length) {
      throw new Error("Category dataset is empty");
    }

    if (!subcategories.length) {
      throw new Error("Subcategory dataset is empty");
    }

    allTranslations = {
      ar: arabicMap,
      bn: bengaliMap,
      en: englishMap,
      hi: hindiMap
    };

    sourceReady = true;

    console.info("IBADAT Dua data loaded:", {
      categories: categories.length,
      subcategories: subcategories.length,
      arabic: arabicMap.size,
      bengali: bengaliMap.size,
      english: englishMap.size,
      hindi: hindiMap.size
    });
  }

  /* =======================================================
     CATEGORY / SUBCATEGORY RELATION
  ======================================================= */

  function getCategorySlug(category) {
    return normalizeSlug(
      category?.url ??
      category?.slug ??
      category?.id ??
      ""
    );
  }

  function getSubcategoryCategory(subcategory) {
    return normalizeSlug(
      subcategory?.category ??
      subcategory?.category_url ??
      subcategory?.category_slug ??
      subcategory?.categoryUrl ??
      ""
    );
  }

  function getSubcategoryDuaIds(subcategory) {
    const ids =
      subcategory?.["dua-ids"] ??
      subcategory?.dua_ids ??
      subcategory?.duaIds ??
      subcategory?.duas ??
      [];

    if (!Array.isArray(ids)) return [];

    return ids.map(item => {
      if (isObject(item)) {
        return (
          item.id ??
          item.dua_id ??
          item.global_id ??
          item.globalId
        );
      }

      return item;
    }).filter(value =>
      value !== undefined &&
      value !== null &&
      value !== ""
    );
  }

  function getSubcategoriesForCategory(category) {
    const slug = getCategorySlug(category);

    if (!slug) return [];

    return subcategories.filter(subcategory =>
      getSubcategoryCategory(subcategory) === slug
    );
  }

  /* =======================================================
     DUA RECORD MERGING
  ======================================================= */

  function getRecordFromMap(map, id) {
    if (!map || !(map instanceof Map)) return null;

    const key = normalizeId(id);

    if (map.has(key)) return map.get(key);

    const numeric = Number(key);

    if (Number.isFinite(numeric)) {
      if (map.has(String(numeric))) {
        return map.get(String(numeric));
      }
    }

    return null;
  }

  function mergeRecords(id) {
    const key = normalizeId(id);

    const arabic = getRecordFromMap(allTranslations.ar, key);
    const bn = getRecordFromMap(allTranslations.bn, key);
    const en = getRecordFromMap(allTranslations.en, key);
    const hi = getRecordFromMap(allTranslations.hi, key);

    const records = [arabic, bn, en, hi].filter(Boolean);

    const arabicText =
      getArabic(arabic) ||
      getArabic(bn) ||
      getArabic(en) ||
      getArabic(hi);

    const bengaliText =
      getMeaning(bn, "bn") ||
      getMeaning(arabic, "bn") ||
      getMeaning(en, "bn") ||
      getMeaning(hi, "bn");

    const englishText =
      getMeaning(en, "en") ||
      getMeaning(arabic, "en") ||
      getMeaning(bn, "en") ||
      getMeaning(hi, "en");

    const hindiText =
      getMeaning(hi, "hi") ||
      getMeaning(arabic, "hi") ||
      getMeaning(bn, "hi") ||
      getMeaning(en, "hi");

    const name =
      getLocalizedDuaName(
        getRecordFromMap(
          allTranslations[language],
          key
        )
      ) ||
      getLocalizedDuaName(arabic) ||
      getLocalizedDuaName(bn) ||
      getLocalizedDuaName(en) ||
      getLocalizedDuaName(hi);

    return {
      id: key,
      title: name,
      arabic: arabicText,
      bn: bengaliText,
      en: englishText,
      hi: hindiText,
      reference:
        records.map(getReference).find(Boolean) || "",
      pronunciation: getPronunciation(records, language)
    };
  }

  /* =======================================================
     CATEGORY DUA LOOKUP
  ======================================================= */

  function getDuasForCategory(category) {
    const relevantSubcategories =
      getSubcategoriesForCategory(category);

    const ids = [];
    const seen = new Set();

    relevantSubcategories.forEach(subcategory => {
      getSubcategoryDuaIds(subcategory).forEach(id => {
        const key = normalizeId(id);

        if (!key || seen.has(key)) return;

        seen.add(key);
        ids.push(key);
      });
    });

    return ids.map(id => mergeRecords(id));
  }

  function getVisibleDuas(category) {
    return getDuasForCategory(category).filter(dua =>
      dua.arabic ||
      dua.bn ||
      dua.en ||
      dua.hi ||
      dua.title
    );
  }

  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  function showPage(page) {
    currentPage = page;

    hideLoading();
    hideError();

    if (el.home) {
      el.home.classList.toggle("hidden", page !== "home");
    }

    if (el.entryPage) {
      el.entryPage.classList.toggle("hidden", page !== "entries");
    }

    if (el.duaPage) {
      el.duaPage.classList.toggle("hidden", page !== "dua");
    }

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
     DEVICE / BROWSER BACK NAVIGATION
  ======================================================= */

  function makeHistoryState(page) {
    return {
      ibadatDua: true,
      page
    };
  }

  function initializeHistory() {
    if (historyReady) return;

    historyReady = true;

    history.replaceState(
      makeHistoryState("home"),
      "",
      location.href
    );

    history.pushState(
      makeHistoryState("home"),
      "",
      location.href
    );
  }

  function navigateTo(page) {
    if (page === currentPage) return;

    history.pushState(
      makeHistoryState(page),
      "",
      location.href
    );

    showPage(page);
  }

  function openCategory(category) {
    selectedCategory = category;
    selectedDua = null;

    renderDuasForCategory(category);
    navigateTo("entries");
  }

  function openDua(dua) {
    selectedDua = dua;

    renderDua(dua);
    navigateTo("dua");
  }

  function handleBrowserBack(event) {
    const state = event.state;

    if (!state || state.ibadatDua !== true) {
      return;
    }

    if (state.page === "dua") {
      currentPage = "dua";
      updateHeader();
      return;
    }

    if (state.page === "entries") {
      selectedDua = null;
      showPage("entries");
      return;
    }

    selectedDua = null;
    selectedCategory = null;
    showPage("home");
  }

  window.addEventListener("popstate", handleBrowserBack);

  /* =======================================================
     CATEGORY RENDERING
  ======================================================= */

  function renderCategories() {
    const box = el.chapterList;

    if (!box) return;

    clear(box);

    if (!categories.length) {
      showEmpty(box, t("noCategories"));
      return;
    }

    categories.forEach((category, index) => {
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
        getLocalizedCategoryName(category) ||
          `${t("category")} ${formatNumber(index + 1)}`
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
     DUA LIST RENDERING
  ======================================================= */

  function renderDuasForCategory(category) {
    const box = el.entryList;

    if (!box) return;

    clear(box);

    const subcategoryGroups =
      getSubcategoriesForCategory(category);

    if (!subcategoryGroups.length) {
      showEmpty(box, t("noEntries"));
      return;
    }

    const duas = getVisibleDuas(category);

    if (!duas.length) {
      showEmpty(box, t("noEntries"));
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
        dua.title ||
          `${t("number")} ${formatNumber(index + 1)}`
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
     DUA DETAIL RENDERING
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

  function addTranslation(
    card,
    languageCode,
    label,
    value
  ) {
    if (!value) return;

    const section = makeElement("section", "dua-section");

    const heading = makeElement(
      "div",
      "translation-language",
      label
    );

    const paragraph = makeElement(
      "p",
      "dua-translation",
      value
    );

    paragraph.lang = languageCode;

    section.append(heading, paragraph);
    card.appendChild(section);
  }

  /*
   * IMPORTANT:
   * Only the currently selected language is rendered.
   *
   * Bengali selected:
   * Arabic + Bengali pronunciation + Bengali meaning.
   *
   * English selected:
   * Arabic + English pronunciation + English meaning.
   *
   * Hindi selected:
   * Arabic + Hindi pronunciation + Hindi meaning.
   *
   * Other language sections are not added to the page.
   */

  function renderDua(dua) {
    const box = el.duaContent;

    if (!box) return;

    clear(box);

    if (!dua) {
      showEmpty(box, t("noDetails"));
      return;
    }

    const card = makeElement("article", "dua-card");

    if (dua.title) {
      const heading = makeElement(
        "h2",
        "dua-heading",
        dua.title
      );

      card.appendChild(heading);
    }

    /* Arabic is always visible in every language. */
    addDuaField(
      card,
      t("arabic"),
      dua.arabic,
      "dua-arabic",
      "rtl"
    );

    /* Pronunciation for the selected language only. */
    addDuaField(
      card,
      t("pronunciation"),
      dua.pronunciation,
      "dua-pronunciation"
    );

    /*
     * Select exactly one translation.
     * No English or Hindi section is created when Bengali
     * is selected, and vice versa.
     */
    const selectedMeaning = dua[language] || "";

    if (selectedMeaning) {
      addTranslation(
        card,
        language,
        t("meaning"),
        selectedMeaning
      );
    }

    /* Reference remains visible in every language. */
    addDuaField(
      card,
      t("reference"),
      dua.reference,
      "dua-reference"
    );

    if (!card.children.length) {
      showEmpty(box, t("noDetails"));
      return;
    }

    box.appendChild(card);
  }

  /* =======================================================
     SETTINGS CHANGE
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

    if (languageChanged && sourceReady) {
      settingsReloading = true;

      const previousPage = currentPage;
      const previousCategorySlug =
        selectedCategory
          ? getCategorySlug(selectedCategory)
          : "";

      const previousDuaId =
        selectedDua?.id || "";

      try {
        await loadSource();

        selectedCategory =
          categories.find(category =>
            getCategorySlug(category) === previousCategorySlug
          ) || null;

        selectedDua = null;

        if (previousPage === "entries" && selectedCategory) {
          renderDuasForCategory(selectedCategory);
          showPage("entries");

        } else if (
          previousPage === "dua" &&
          selectedCategory
        ) {
          const updatedDuas =
            getVisibleDuas(selectedCategory);

          selectedDua =
            updatedDuas.find(dua =>
              String(dua.id) === String(previousDuaId)
            ) || null;

          if (selectedDua) {
            renderDua(selectedDua);
            showPage("dua");
          } else {
            renderDuasForCategory(selectedCategory);
            showPage("entries");
          }

        } else {
          renderCategories();
          showPage("home");
        }

      } catch (error) {
        console.error("Language refresh error:", error);
        showError(t("dataError"));

      } finally {
        settingsReloading = false;
      }

      return;
    }

    if (appearanceChanged) {
      applyTheme();
    }

    applyLabels();

    if (currentPage === "home") {
      renderCategories();

    } else if (currentPage === "entries" && selectedCategory) {
      renderDuasForCategory(selectedCategory);

    } else if (currentPage === "dua" && selectedDua) {
      /*
       * Re-rendering uses the new selected language.
       * Therefore only that language's meaning appears.
       */
      selectedDua.pronunciation =
        getPronunciation(
          [
            getRecordFromMap(allTranslations.ar, selectedDua.id),
            getRecordFromMap(allTranslations.bn, selectedDua.id),
            getRecordFromMap(allTranslations.en, selectedDua.id),
            getRecordFromMap(allTranslations.hi, selectedDua.id)
          ].filter(Boolean),
          language
        );

      renderDua(selectedDua);
    }
  }

  window.addEventListener("storage", event => {
    if (event.key && !SETTINGS_KEYS.includes(event.key)) {
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
    await init(true);
  }

  /* =======================================================
     INITIALIZATION
  ======================================================= */

  async function init(isRetry = false) {
    const version = ++requestVersion;

    readSettings();
    initializeHistory();

    if (isRetry) {
      sourceReady = false;

      categories = [];
      subcategories = [];

      allTranslations = {
        ar: new Map(),
        bn: new Map(),
        en: new Map(),
        hi: new Map()
      };

      fileTree = [];
    }

    showLoading(t("loadingCategories"));

    try {
      await loadSource();

      if (version !== requestVersion) return;

      hideLoading();
      hideError();

      selectedCategory = null;
      selectedDua = null;

      renderCategories();
      showPage("home");

    } catch (error) {
      if (version !== requestVersion) return;

      console.error("IBADAT Dua source error:", error);

      let message = t("sourceError");

      if (
        error.name === "AbortError" ||
        error instanceof TypeError
      ) {
        message = t("networkError");

      } else if (
        String(error.message || "").includes("language") ||
        String(error.message || "").includes("translation") ||
        String(error.message || "").includes("dataset")
      ) {
        message = t("dataError");
      }

      showError(message);
    }
  }

  /* =======================================================
     EVENTS
  ======================================================= */

  function bindEvents() {
    if (el.retryButton) {
      el.retryButton.addEventListener("click", retry);
    }
  }

  bindEvents();
  init();

})();
