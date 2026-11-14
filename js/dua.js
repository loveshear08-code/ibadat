
"use strict";

/* =========================================================
   IBADAT — DUA.JS
   Source: IslamicAPI / masnun-dua
   Languages: Bengali, English, Hindi
   Theme: appSettings / ibadatSettings
   ========================================================= */

(() => {
  const REPO_API =
    "https://api.github.com/repos/islamicapi/masnun-dua";

  const RAW_BASE =
    "https://raw.githubusercontent.com/islamicapi/masnun-dua/main/";

  const LANGUAGES = ["bn", "en", "hi"];

  const SETTINGS_KEYS = ["appSettings", "ibadatSettings"];

  const $ = id => document.getElementById(id);

  const el = {
    heroTitle: $("heroTitle"),
    heroSubtitle: $("heroSubtitle"),
    footerText: $("footerText"),
    backButton: $("backButton"),

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
      back: "পেছনে যান",
      category: "বিভাগ",
      dua: "দোয়া",
      arabic: "আরবি",
      pronunciation: "উচ্চারণ",
      meaning: "অর্থ",
      reference: "সূত্র",
      noCategories: "কোনো বিভাগ পাওয়া যায়নি।",
      noEntries: "এই বিভাগে কোনো দোয়া পাওয়া যায়নি।",
      noDetails: "এই দোয়ার তথ্য পাওয়া যায়নি।",
      missingLanguage: "এই দোয়ার নির্ভরযোগ্য বাংলা, English ও हिन्दी তথ্য একসঙ্গে পাওয়া যায়নি।",
      sourceError: "দোয়ার ডেটাসোর্স থেকে তথ্য আনা যায়নি।",
      networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      dataError: "ডেটার কাঠামো প্রত্যাশিত ফরম্যাটের সঙ্গে মেলেনি।",
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
      back: "Go back",
      category: "Category",
      dua: "Du'a",
      arabic: "Arabic",
      pronunciation: "Pronunciation",
      meaning: "Meaning",
      reference: "Reference",
      noCategories: "No categories were found.",
      noEntries: "No Du'as were found in this category.",
      noDetails: "No details were found for this Du'a.",
      missingLanguage: "Verified Bengali, English and Hindi content was not available together for this Du'a.",
      sourceError: "Could not retrieve data from the Du'a source.",
      networkError: "Check your internet connection and try again.",
      dataError: "The dataset structure did not match the expected format.",
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
      back: "वापस जाएँ",
      category: "श्रेणी",
      dua: "दुआ",
      arabic: "अरबी",
      pronunciation: "उच्चारण",
      meaning: "अर्थ",
      reference: "संदर्भ",
      noCategories: "कोई श्रेणी नहीं मिली।",
      noEntries: "इस श्रेणी में कोई दुआ नहीं मिली।",
      noDetails: "इस दुआ की जानकारी नहीं मिली।",
      missingLanguage: "इस दुआ के लिए বাংলা, English और हिन्दी की पूरी जानकारी एक साथ उपलब्ध नहीं है।",
      sourceError: "दुआ स्रोत से जानकारी प्राप्त नहीं हो सकी।",
      networkError: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
      dataError: "डेटासेट का प्रारूप अपेक्षित संरचना से मेल नहीं खाता।",
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
    ar: [],
    bn: [],
    en: [],
    hi: []
  };

  let selectedCategory = null;
  let selectedDua = null;

  let duaIndex = new Map();
  let fileTree = [];

  let lastAction = "init";
  let requestVersion = 0;

  const t = key =>
    TEXT[language]?.[key] ?? TEXT.bn[key] ?? key;

  /* =======================================================
     SETTINGS
  ======================================================= */

  function readSettings() {
    let settings = {};

    for (const key of SETTINGS_KEYS) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            settings = { ...settings, ...parsed };
          }
        }
      } catch (error) {
        console.warn("Settings read error:", error);
      }
    }

    const requestedLanguage =
      settings.lang ||
      settings.language ||
      settings.locale ||
      "bn";

    language = normalizeLanguage(requestedLanguage);

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

    const validThemes = ["classic", "royal", "rose", "pista"];

    colorTheme = validThemes.includes(settings.themeColor)
      ? settings.themeColor
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

    const meta = document.querySelector('meta[name="theme-color"]');

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

    if (el.backButton) {
      el.backButton.setAttribute("aria-label", t("back"));
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

  function getNestedText(object, keys) {
    if (!isObject(object)) return "";

    for (const key of keys) {
      const value = object[key];

      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }

      if (isObject(value)) {
        const nested =
          value[language] ||
          value[`${language}-IN`] ||
          value[`${language}-BD`] ||
          value.text ||
          value.value;

        if (typeof nested === "string" && nested.trim()) {
          return nested.trim();
        }
      }
    }

    return "";
  }

  function getId(item) {
    if (!isObject(item)) return null;

    return item.id ??
      item.dua_id ??
      item.duaId ??
      item.subcategory_id ??
      item.uuid ??
      null;
  }

  function getLocalizedCategoryName(item) {
    if (!isObject(item)) return "";

    return getNestedText(item, [
      "name",
      "title",
      "category_name",
      "translation"
    ]) || cleanText(item.name || item.title);
  }

  function getLocalizedDuaName(item) {
    if (!isObject(item)) return "";

    return getNestedText(item, [
      "title",
      "name",
      "dua_name",
      "translation"
    ]) || cleanText(item.title || item.name);
  }

  function getArabic(item) {
    if (!isObject(item)) return "";

    return cleanText(
      item.arabic ??
      item.ar ??
      item.arabic_text ??
      item.arabicText ??
      item.text_ar ??
      item.textArabic ??
      item.dua_ar ??
      item.dua
    );
  }

  function getMeaning(item, lang) {
    if (!isObject(item)) return "";

    const possibleKeys = {
      bn: [
        "bn", "bengali", "bangla",
        "translation_bn", "meaning_bn",
        "translation", "meaning", "text"
      ],
      en: [
        "en", "english",
        "translation_en", "meaning_en",
        "translation", "meaning", "text"
      ],
      hi: [
        "hi", "hindi",
        "translation_hi", "meaning_hi",
        "translation", "meaning", "text"
      ]
    };

    for (const key of possibleKeys[lang]) {
      const value = item[key];

      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }

      if (isObject(value)) {
        const nested =
          value[lang] ||
          value.text ||
          value.translation ||
          value.meaning;

        if (typeof nested === "string" && nested.trim()) {
          return nested.trim();
        }
      }
    }

    return "";
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

    if (typeof value === "string") return value.trim();

    if (Array.isArray(value)) {
      return value
        .map(x => typeof x === "string" ? x : (
          x?.text || x?.name || x?.reference || ""
        ))
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

  function makeElement(tag, className, text) {
    const node = document.createElement(tag);

    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);

    return node;
  }

  function clear(node) {
    if (node) node.replaceChildren();
  }

  function showEmpty(container, message) {
    clear(container);
    container.appendChild(
      makeElement("div", "empty-message", message)
    );
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

    if (el.errorBox) el.errorBox.classList.add("hidden");

    if (el.loadingBox) {
      el.loadingBox.textContent = message || t("loading");
      el.loadingBox.classList.remove("hidden");
    }
  }

  function hideLoading() {
    if (el.loadingBox) el.loadingBox.classList.add("hidden");
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
    if (el.errorBox) el.errorBox.classList.add("hidden");
  }

  /* =======================================================
     NETWORK
  ======================================================= */

  async function fetchJSON(url, timeoutMs = 20000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

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
        throw new Error(`HTTP ${response.status}`);
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

  function findLanguageFile(folder, lang) {
    const candidates = fileTree.filter(path => {
      const p = path.toLowerCase();
      const parts = p.split("/");

      if (!p.startsWith(`${folder}/`)) return false;

      const fileName = parts[parts.length - 1];
      const baseName = fileName.replace(/\.json$/i, "");

      return (
        baseName === lang ||
        parts.includes(lang)
      );
    });

    const exact = candidates.find(path =>
      path.toLowerCase() === `${folder}/${lang}.json`
    );

    return exact || candidates[0] || null;
  }

  async function fetchLanguageFile(path) {
    if (!path) {
      throw new Error("Required language JSON file was not found");
    }

    return fetchJSON(RAW_BASE + path.split("/").map(encodeURIComponent).join("/"));
  }

  function unwrapArray(data, keys = []) {
    if (Array.isArray(data)) return data;

    if (!isObject(data)) return [];

    for (const key of keys) {
      if (Array.isArray(data[key])) return data[key];
    }

    if (isObject(data.data)) {
      for (const key of keys) {
        if (Array.isArray(data.data[key])) return data.data[key];
      }
      if (Array.isArray(data.data.items)) return data.data.items;
    }

    if (Array.isArray(data.data)) return data.data;

    return [];
  }

  /* =======================================================
     TRANSLATION FILE DISCOVERY
  ======================================================= */

  function findTranslationFile(lang) {
    const files = fileTree.filter(path => {
      const p = path.toLowerCase();

      if (!p.startsWith("translation/")) return false;

      const parts = p.split("/");
      const fileName = parts[parts.length - 1];
      const baseName = fileName.replace(/\.json$/i, "");

      return baseName === lang || parts.includes(lang);
    });

    const exact = files.find(path =>
      path.toLowerCase() === `translation/${lang}.json`
    );

    return exact || files[0] || null;
  }

  /* =======================================================
     DATA INDEXING
  ======================================================= */

  function getPossibleRecordId(item) {
    if (!isObject(item)) return null;

    const values = [
      item.id,
      item.dua_id,
      item.duaId,
      item.global_id,
      item.globalId,
      item.number
    ];

    for (const value of values) {
      if (value !== undefined && value !== null) {
        return String(value);
      }
    }

    return null;
  }

  function collectRecords(value, output, depth = 0) {
    if (depth > 12 || value == null) return;

    if (Array.isArray(value)) {
      value.forEach(item => collectRecords(item, output, depth + 1));
      return;
    }

    if (!isObject(value)) return;

    const id = getPossibleRecordId(value);

    if (id !== null) {
      output.push(value);
    }

    Object.values(value).forEach(child => {
      if (Array.isArray(child) || isObject(child)) {
        collectRecords(child, output, depth + 1);
      }
    });
  }

  function indexRecords(data) {
    const records = [];
    collectRecords(data, records);

    const map = new Map();

    records.forEach(record => {
      const id = getPossibleRecordId(record);
      if (id === null) return;

      if (!map.has(id)) {
        map.set(id, record);
      }
    });

    return map;
  }

  function mergeRecords(id) {
    const key = String(id);

    const arabic = duaIndex.get(key) || {};
    const bn = allTranslations.bn.get(key) || {};
    const en = allTranslations.en.get(key) || {};
    const hi = allTranslations.hi.get(key) || {};

    return {
      id: key,
      arabic: getArabic(arabic) || getArabic(bn) || getArabic(en) || getArabic(hi),

      bn: getMeaning(bn, "bn") || getMeaning(arabic, "bn"),
      en: getMeaning(en, "en") || getMeaning(arabic, "en"),
      hi: getMeaning(hi, "hi") || getMeaning(arabic, "hi"),

      reference:
        getReference(arabic) ||
        getReference(bn) ||
        getReference(en) ||
        getReference(hi),

      pronunciation:
        bn.transliteration ||
        bn.pronunciation ||
        en.transliteration ||
        en.pronunciation ||
        ""
    };
  }

  /* =======================================================
     LOAD SOURCE FILES
  ======================================================= */

  async function loadSource() {
    await fetchRepositoryTree();

    const categoryPath = findLanguageFile("categories", language);
    const subcategoryPath = findLanguageFile("sub-categories", language);

    if (!categoryPath || !subcategoryPath) {
      throw new Error(
        "Category or sub-category language file is missing"
      );
    }

    const arabicPath = findTranslationFile("ar");
    const bnPath = findTranslationFile("bn");
    const enPath = findTranslationFile("en");
    const hiPath = findTranslationFile("hi");

    if (!arabicPath || !bnPath || !enPath || !hiPath) {
      throw new Error(
        "Arabic / Bengali / English / Hindi translation files could not all be located"
      );
    }

    const [
      categoryData,
      subcategoryData,
      arabicData,
      bnData,
      enData,
      hiData
    ] = await Promise.all([
      fetchLanguageFile(categoryPath),
      fetchLanguageFile(subcategoryPath),
      fetchLanguageFile(arabicPath),
      fetchLanguageFile(bnPath),
      fetchLanguageFile(enPath),
      fetchLanguageFile(hiPath)
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

    if (!categories.length || !subcategories.length) {
      throw new Error("Category dataset is empty");
    }

    duaIndex = indexRecords(arabicData);

    allTranslations.ar = duaIndex;
    allTranslations.bn = indexRecords(bnData);
    allTranslations.en = indexRecords(enData);
    allTranslations.hi = indexRecords(hiData);

    if (
      !allTranslations.bn.size ||
      !allTranslations.en.size ||
      !allTranslations.hi.size
    ) {
      throw new Error("One or more translation datasets are empty");
    }
  }

  /* =======================================================
     CATEGORY / DUA RELATION
  ======================================================= */

  function getCategorySlug(category) {
    return String(
      category?.url ??
      category?.slug ??
      category?.id ??
      ""
    );
  }

  function getSubcategoryCategory(subcategory) {
    return String(
      subcategory?.category ??
      subcategory?.category_url ??
      subcategory?.category_slug ??
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
        return item.id ?? item.dua_id ?? item.global_id;
      }
      return item;
    }).filter(value => value !== undefined && value !== null);
  }

  function getDuasForCategory(category) {
    const slug = getCategorySlug(category);

    const relevant = subcategories.filter(subcategory =>
      getSubcategoryCategory(subcategory) === slug
    );

    const ids = [];

    relevant.forEach(subcategory => {
      getSubcategoryDuaIds(subcategory).forEach(id => {
        if (!ids.some(existing => String(existing) === String(id))) {
          ids.push(id);
        }
      });
    });

    return ids.map(id => mergeRecords(id));
  }

  /* =======================================================
     VALIDATION
  ======================================================= */

  function hasAllThreeMeanings(dua) {
    return Boolean(
      dua &&
      dua.arabic &&
      dua.bn &&
      dua.en &&
      dua.hi
    );
  }

  function getVisibleDuas(category) {
    const list = getDuasForCategory(category);

    /*
     * Do not show a record if one of the required languages
     * is missing. No fallback translation is substituted.
     */
    return list.filter(hasAllThreeMeanings);
  }

  /* =======================================================
     PAGE NAVIGATION
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

    if (el.backButton) {
      el.backButton.classList.toggle("hidden", page === "home");
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

  function goBack() {
    if (currentPage === "dua") {
      selectedDua = null;
      showPage("entries");
      return;
    }

    if (currentPage === "entries") {
      selectedCategory = null;
      showPage("home");
    }
  }

  /* =======================================================
     RENDER CATEGORIES
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
        index + 1
      );

      const name = makeElement(
        "span",
        "chapter-name",
        getLocalizedCategoryName(category) || `${t("category")} ${index + 1}`
      );

      const arrow = makeElement("span", "chapter-arrow", "›");
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

  function openCategory(category) {
    selectedCategory = category;
    selectedDua = null;

    showPage("entries");
    renderDuasForCategory(category);
  }

  /* =======================================================
     RENDER DUA LIST
  ======================================================= */

  function renderDuasForCategory(category) {
    const box = el.entryList;
    if (!box) return;

    clear(box);

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
        index + 1
      );

      const name = makeElement(
        "span",
        "entry-name",
        getLocalizedDuaName(dua) || `${t("number")} ${index + 1}`
      );

      const arrow = makeElement("span", "entry-arrow", "›");
      arrow.setAttribute("aria-hidden", "true");

      button.append(number, name, arrow);

      button.addEventListener("click", () => {
        openDua(dua);
      });

      box.appendChild(button);
    });
  }

  /* =======================================================
     OPEN DUA
  ======================================================= */

  function openDua(dua) {
    selectedDua = dua;
    showPage("dua");
    renderDua(dua);
  }

  /* =======================================================
     RENDER DUA DETAIL
  ======================================================= */

  function addDuaField(card, label, value, className, direction) {
    if (!value) return;

    const section = makeElement("section", "dua-section");

    const heading = makeElement("div", "dua-label", label);
    const paragraph = makeElement("p", className, value);

    if (direction === "rtl") {
      paragraph.dir = "rtl";
      paragraph.lang = "ar";
    }

    section.append(heading, paragraph);
    card.appendChild(section);
  }

  function addTranslation(card, languageCode, label, value) {
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

  function renderDua(dua) {
    const box = el.duaContent;
    if (!box) return;

    clear(box);

    if (!dua || !hasAllThreeMeanings(dua)) {
      showEmpty(box, t("missingLanguage"));
      return;
    }

    const card = makeElement("article", "dua-card");

    addDuaField(
      card,
      t("arabic"),
      dua.arabic,
      "dua-arabic",
      "rtl"
    );

    if (dua.pronunciation) {
      addDuaField(
        card,
        t("pronunciation"),
        dua.pronunciation,
        "dua-pronunciation"
      );
    }

    addTranslation(card, "bn", "বাংলা", dua.bn);
    addTranslation(card, "en", "English", dua.en);
    addTranslation(card, "hi", "हिन्दी", dua.hi);

    if (dua.reference) {
      addDuaField(
        card,
        t("reference"),
        dua.reference,
        "dua-reference"
      );
    }

    box.appendChild(card);
  }

  /* =======================================================
     RETRY
  ======================================================= */

  async function retry() {
    await init(true);
  }

  /* =======================================================
     SETTINGS CHANGE
  ======================================================= */

  function refreshSettings() {
    const oldLanguage = language;
    const oldTheme = colorTheme;
    const oldDark = darkMode;

    readSettings();

    if (
      oldLanguage !== language ||
      oldTheme !== colorTheme ||
      oldDark !== darkMode
    ) {
      renderCurrentPage();
    }
  }

  function renderCurrentPage() {
    applyLabels();

    if (currentPage === "home") {
      renderCategories();
    } else if (currentPage === "entries" && selectedCategory) {
      renderDuasForCategory(selectedCategory);
    } else if (currentPage === "dua" && selectedDua) {
      renderDua(selectedDua);
    }
  }

  window.addEventListener("storage", event => {
    if (event.key && !SETTINGS_KEYS.includes(event.key)) return;
    refreshSettings();
  });

  window.addEventListener("pageshow", refreshSettings);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      refreshSettings();
    }
  });

  /* =======================================================
     INITIALIZATION
  ======================================================= */

  async function init(isRetry = false) {
    const version = ++requestVersion;

    readSettings();

    if (isRetry) {
      categories = [];
      subcategories = [];
      allTranslations = {
        ar: [],
        bn: [],
        en: [],
        hi: []
      };
      duaIndex = new Map();
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

      showPage("home");
      renderCategories();

    } catch (error) {
      if (version !== requestVersion) return;

      console.error("IBADAT Dua source error:", error);

      let message = t("sourceError");

      if (error.name === "AbortError" || error instanceof TypeError) {
        message = t("networkError");
      } else if (
        String(error.message || "").includes("language") ||
        String(error.message || "").includes("translation")
      ) {
        message = t("dataError");
      }

      showError(message);
    }
  }

  function bindEvents() {
    if (el.retryButton) {
      el.retryButton.addEventListener("click", retry);
    }

    if (el.backButton) {
      el.backButton.addEventListener("click", goBack);
    }
  }

  bindEvents();
  init();

})();
