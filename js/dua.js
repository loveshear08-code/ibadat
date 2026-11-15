
"use strict";

/* =========================================================
   IBADAT — DUA.JS
   Fresh Dua Page Controller
   HTML and CSS remain unchanged.

   Features:
   - 20 main categories
   - Bengali / English / Hindi
   - Arabic text from Arabic source
   - Language-specific translation and transliteration
   - Unique Dua IDs across categories
   - Corrected known source-category misplacements
   - Existing appSettings integration
   - Existing HTML IDs and CSS classes preserved
========================================================= */

(() => {
  /* =======================================================
     CONFIG
  ======================================================= */

  const SOURCE_BASE =
    "https://raw.githubusercontent.com/islamicapi/masnun-dua/main/";

  const SETTINGS_KEY = "appSettings";

  const SUPPORTED_LANGUAGES = ["bn", "en", "hi"];

  const SUPPORTED_THEMES = [
    "classic",
    "royal",
    "rose",
    "pista"
  ];

  const $ = id => document.getElementById(id);

  const UI = {
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
     TRANSLATIONS
  ======================================================= */

  const UI_TEXT = {
    bn: {
      title: "দোয়া",
      subtitle: "দোয়া শিখুন, পড়ুন ও প্রশান্তি অনুভব করুন",
      footer: "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।",

      loading: "দোয়ার বিভাগ লোড হচ্ছে...",
      loadingDuas: "দোয়াসমূহ লোড হচ্ছে...",
      loadingDetails: "দোয়ার বিস্তারিত লোড হচ্ছে...",

      retry: "আবার চেষ্টা করুন",

      arabic: "আরবি",
      pronunciation: "বাংলা উচ্চারণ",
      meaning: "বাংলা অর্থ",
      introduction: "পরিচিতি",
      when: "কখন পড়বেন",
      reference: "সূত্র",

      noCategories: "কোনো বিভাগ পাওয়া যায়নি।",
      noDuas: "এই বিভাগে কোনো দোয়া পাওয়া যায়নি।",
      noDetails: "দোয়ার বিস্তারিত তথ্য পাওয়া যায়নি।",

      missingTranslation: "এই ভাষায় অনুবাদ পাওয়া যায়নি।",
      missingPronunciation: "উচ্চারণ পাওয়া যায়নি।",

      networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      sourceError: "দোয়ার তথ্য লোড করা যায়নি।"
    },

    en: {
      title: "Du'a",
      subtitle: "Learn, recite and find peace through supplication",
      footer: "Peace comes through the remembrance of Allah.",

      loading: "Loading categories...",
      loadingDuas: "Loading Du'as...",
      loadingDetails: "Loading Du'a details...",

      retry: "Try again",

      arabic: "Arabic",
      pronunciation: "Pronunciation",
      meaning: "English Meaning",
      introduction: "Introduction",
      when: "When to Recite",
      reference: "Reference",

      noCategories: "No categories were found.",
      noDuas: "No Du'as were found in this category.",
      noDetails: "Details for this Du'a could not be found.",

      missingTranslation: "Translation is not available in this language.",
      missingPronunciation: "Pronunciation is not available.",

      networkError: "Check your internet connection and try again.",
      sourceError: "Could not load Du'a data."
    },

    hi: {
      title: "दुआ",
      subtitle: "दुआ सीखें, पढ़ें और सुकून पाएँ",
      footer: "अल्लाह के ज़िक्र से दिलों को सुकून मिलता है।",

      loading: "श्रेणियाँ लोड हो रही हैं...",
      loadingDuas: "दुआएँ लोड हो रही हैं...",
      loadingDetails: "दुआ की जानकारी लोड हो रही है...",

      retry: "फिर कोशिश करें",

      arabic: "अरबी",
      pronunciation: "उच्चारण",
      meaning: "हिंदी अर्थ",
      introduction: "परिचय",
      when: "कब पढ़ें",
      reference: "संदर्भ",

      noCategories: "कोई श्रेणी नहीं मिली।",
      noDuas: "इस श्रेणी में कोई दुआ नहीं मिली।",
      noDetails: "इस दुआ की जानकारी नहीं मिली।",

      missingTranslation: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      missingPronunciation: "उच्चारण उपलब्ध नहीं है।",

      networkError: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
      sourceError: "दुआ की जानकारी लोड नहीं हो सकी।"
    }
  };

  /* =======================================================
     APP STATE
  ======================================================= */

  let language = "bn";
  let darkMode = false;
  let colorTheme = "classic";

  let currentPage = "home";

  let sourceSubcategories = [];

  let selectedCategory = null;
  let selectedDua = null;

  let categoryDuaMap = new Map();

  let isLoading = false;
  let requestToken = 0;

  const duaCache = new Map();
  const categoryCache = new Map();

  const t = key =>
    UI_TEXT[language]?.[key] ||
    UI_TEXT.bn[key] ||
    key;

  /* =======================================================
     20 MAIN CATEGORIES

     Source slugs are assigned to one main category.
     Special ID corrections are applied separately below.
  ======================================================= */

  const CATEGORIES = [
    {
      id: "life-family",
      bn: "জীবন ও পরিবার",
      en: "Life & Family",
      hi: "जीवन और परिवार",
      slugs: ["family"],
      order: 1
    },

    {
      id: "marriage",
      bn: "বিবাহ ও দাম্পত্য",
      en: "Marriage & Married Life",
      hi: "विवाह और दांपत्य जीवन",
      slugs: ["marriage"],
      order: 2
    },

    {
      id: "daily-life",
      bn: "দৈনন্দিন জীবন",
      en: "Daily Life",
      hi: "दैनिक जीवन",
      slugs: ["sleep", "cloths", "home"],
      order: 3
    },

    {
      id: "purity",
      bn: "পবিত্রতা ও পরিচ্ছন্নতা",
      en: "Purity & Cleanliness",
      hi: "पवित्रता और स्वच्छता",
      slugs: ["toilet", "ablution-and-bath"],
      order: 4
    },

    {
      id: "food-drink",
      bn: "খাদ্য ও পানীয়",
      en: "Food & Drink",
      hi: "भोजन और पेय",
      slugs: ["food"],
      order: 5
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
      ],
      order: 6
    },

    {
      id: "fasting",
      bn: "রোজা ও রমজান",
      en: "Fasting & Ramadan",
      hi: "रोज़ा और रमज़ान",
      slugs: ["fasting"],
      order: 7
    },

    {
      id: "eid-sacrifice",
      bn: "ঈদ ও কুরবানি",
      en: "Eid & Sacrifice",
      hi: "ईद और क़ुर्बानी",
      slugs: ["eid", "sacrifice"],
      order: 8
    },

    {
      id: "hajj-umrah",
      bn: "হজ ও ওমরাহ",
      en: "Hajj & Umrah",
      hi: "हज और उमराह",
      slugs: ["hajj-and-umrah"],
      order: 9
    },

    {
      id: "travel",
      bn: "সফর ও যাতায়াত",
      en: "Travel & Transportation",
      hi: "सफ़र और यातायात",
      slugs: ["travel"],
      order: 10
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
      ],
      order: 11
    },

    {
      id: "nature-animals",
      bn: "প্রকৃতি ও প্রাণিজগৎ",
      en: "Nature & Animals",
      hi: "प्रकृति और जीव-जगत",
      slugs: ["rainnature", "animals"],
      order: 12
    },

    {
      id: "health-healing",
      bn: "স্বাস্থ্য ও আরোগ্য",
      en: "Health & Healing",
      hi: "स्वास्थ्य और शिफ़ा",
      slugs: ["sickness"],
      order: 13
    },

    {
      id: "protection",
      bn: "সুরক্ষা ও আশ্রয়",
      en: "Protection & Refuge",
      hi: "सुरक्षा और पनाह",
      slugs: [
        "evil-protection",
        "jinndiseases"
      ],
      order: 14
    },

    {
      id: "hardship",
      bn: "বিপদ ও দুশ্চিন্তা",
      en: "Hardship & Anxiety",
      hi: "मुसीबत और चिंता",
      slugs: [
        "anxiety",
        "danger"
      ],
      order: 15
    },

    {
      id: "provision",
      bn: "রিজিক ও প্রয়োজন",
      en: "Provision & Needs",
      hi: "रिज़्क़ और ज़रूरतें",
      slugs: ["debt"],
      order: 16
    },

    {
      id: "forgiveness",
      bn: "ক্ষমা ও তওবা",
      en: "Forgiveness & Repentance",
      hi: "माफ़ी और तौबा",
      slugs: ["forgiveness"],
      order: 17
    },

    {
      id: "quran-prophets",
      bn: "কুরআন ও নবীদের দোয়া",
      en: "Quranic & Prophetic Du'as",
      hi: "क़ुरआन और पैग़म्बरों की दुआएँ",
      slugs: [
        "40-rabbana-duas",
        "prophets-dua"
      ],
      order: 18
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
      ],
      order: 19
    },

    {
      id: "death-afterlife",
      bn: "মৃত্যু ও আখিরাত",
      en: "Death & Hereafter",
      hi: "मृत्यु और आख़िरत",
      slugs: ["grave-funeral"],
      order: 20
    }
  ];

  /* =======================================================
     SOURCE CORRECTIONS

     These corrections prevent known source misplacements.
     A source subcategory is not trusted blindly.
  ======================================================= */

  const ID_OVERRIDES = {
    "396": "life-family",
    "397": "life-family",

    "551": "death-afterlife",
    "552": "death-afterlife",

    "553": "protection",
    "554": "protection",
    "555": "protection",
    "556": "protection",
    "557": "protection",
    "558": "protection",
    "919": "protection"
  };

  /* Ramadan source records:
     311 is informational: the source says no fixed
     Sunnah wording is established for the fasting intention.
     It must not be displayed as an Arabic supplication.
  */

  const INFORMATION_ONLY_IDS = new Set([
    "311"
  ]);

  /* =======================================================
     HELPERS
  ======================================================= */

  function normalizeLanguage(value) {
    const v = String(value || "bn").toLowerCase().trim();

    if (["en", "eng", "english"].includes(v)) return "en";
    if (["hi", "hin", "hindi"].includes(v)) return "hi";

    return "bn";
  }

  function normalizeId(value) {
    if (value === undefined || value === null) return "";
    return String(value).trim();
  }

  function normalizeSlug(value) {
    return String(value || "").trim().toLowerCase();
  }

  function isObject(value) {
    return (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    );
  }

  function hasArabic(value) {
    return (
      typeof value === "string" &&
      /[\u0600-\u06FF]/.test(value)
    );
  }

  function getCategoryName(category) {
    return (
      category?.[language] ||
      category?.bn ||
      ""
    );
  }

  function getRawURL(path) {
    return SOURCE_BASE + path
      .split("/")
      .map(encodeURIComponent)
      .join("/");
  }

  function clear(node) {
    if (node) node.replaceChildren();
  }

  function createElement(tag, className, text) {
    const node = document.createElement(tag);

    if (className) node.className = className;

    if (text !== undefined && text !== null) {
      node.textContent = String(text);
    }

    return node;
  }

  function showEmpty(container, message) {
    if (!container) return;

    clear(container);

    container.appendChild(
      createElement("div", "empty-message", message)
    );
  }

  function formatNumber(number) {
    const locales = {
      bn: "bn-BD",
      en: "en-IN",
      hi: "hi-IN"
    };

    return new Intl.NumberFormat(
      locales[language] || "bn-BD"
    ).format(number);
  }

  function getIdsFromSubcategory(item) {
    if (!Array.isArray(item?.["dua-ids"])) return [];

    return item["dua-ids"]
      .map(entry => {
        if (isObject(entry)) {
          return normalizeId(entry.dua_id || entry.id);
        }

        return normalizeId(entry);
      })
      .filter(Boolean);
  }

  /* =======================================================
     SETTINGS INTEGRATION
  ======================================================= */

  function readSettings() {
    let settings = {};

    try {
      const raw = localStorage.getItem(SETTINGS_KEY);

      if (raw) {
        const parsed = JSON.parse(raw);

        if (isObject(parsed)) {
          settings = parsed;
        }
      }
    } catch (error) {
      console.warn("IBADAT settings read error:", error);
    }

    language = normalizeLanguage(
      settings.lang || settings.language || "bn"
    );

    darkMode = settings.dark === true;

    const savedTheme =
      settings.themeColor ||
      settings.theme ||
      "classic";

    colorTheme = SUPPORTED_THEMES.includes(savedTheme)
      ? savedTheme
      : "classic";

    applyTheme();
    applyStaticText();
  }

  function applyTheme() {
    document.body.dataset.colorTheme = colorTheme;

    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

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

  function applyStaticText() {
    document.documentElement.lang = language;

    if (UI.heroSubtitle) {
      UI.heroSubtitle.textContent = t("subtitle");
    }

    if (UI.footerText) {
      UI.footerText.textContent = t("footer");
    }

    if (UI.retryButton) {
      UI.retryButton.textContent = t("retry");
    }

    updateHeader();
  }

  /* =======================================================
     HEADER
  ======================================================= */

  function updateHeader() {
    if (!UI.heroTitle) return;

    if (currentPage === "entries" && selectedCategory) {
      UI.heroTitle.textContent =
        getCategoryName(selectedCategory);
      return;
    }

    if (currentPage === "dua" && selectedDua) {
      UI.heroTitle.textContent =
        selectedDua.title || t("title");
      return;
    }

    UI.heroTitle.textContent = t("title");
  }

  /* =======================================================
     NETWORK
  ======================================================= */

  async function fetchJSON(url, timeout = 20000) {
    const controller = new AbortController();

    const timer = setTimeout(
      () => controller.abort(),
      timeout
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

  async function loadSubcategories() {
    const data = await fetchJSON(
      getRawURL(`sub-categories/${language}.json`)
    );

    if (!Array.isArray(data)) {
      throw new Error("Invalid subcategory data");
    }

    sourceSubcategories = data;
  }

  /* =======================================================
     CATEGORY CLASSIFICATION

     A Dua ID can belong to one main category only.
  ======================================================= */

  function findCategoryById(categoryId) {
    return CATEGORIES.find(
      category => category.id === categoryId
    );
  }

  function findCategoryForRecord(group, duaId) {
    const override = ID_OVERRIDES[duaId];

    if (override) {
      return findCategoryById(override);
    }

    const slug = normalizeSlug(group.category);

    return CATEGORIES.find(category =>
      category.slugs.some(
        allowed => normalizeSlug(allowed) === slug
      )
    ) || null;
  }

  function buildCategoryMap() {
    const map = new Map();

    CATEGORIES.forEach(category => {
      map.set(category.id, []);
    });

    const claimed = new Set();

    sourceSubcategories.forEach(group => {
      const ids = getIdsFromSubcategory(group);

      ids.forEach(id => {
        const category = findCategoryForRecord(group, id);

        if (!category) return;

        if (claimed.has(id)) return;

        claimed.add(id);

        map.get(category.id).push({
          id,
          sourceGroupId: group.id,
          sourceGroupTitle: group.title || "",
          sourceSlug: group.category || ""
        });
      });
    });

    /* Remove information-only records from the normal
       Arabic Dua list. Their explanation is shown separately
       only if the UI is later extended for informational cards.
    */

    for (const [categoryId, records] of map.entries()) {
      map.set(
        categoryId,
        records.filter(record =>
          !INFORMATION_ONLY_IDS.has(record.id)
        )
      );
    }

    return map;
  }

  /* =======================================================
     LOAD DUA RECORD

     Arabic comes from ar.
     Translation and transliteration come from selected language.
     No silent cross-language substitution.
  ======================================================= */

  async function loadDua(id) {
    const cacheKey = `${language}:${id}`;

    if (duaCache.has(cacheKey)) {
      return duaCache.get(cacheKey);
    }

    const task = (async () => {
      const [arabicData, languageData] = await Promise.all([
        fetchJSON(
          getRawURL(`translation/ar/dua_${id}.json`)
        ),

        fetchJSON(
          getRawURL(`translation/${language}/dua_${id}.json`)
        )
      ]);

      if (
        !isObject(arabicData) ||
        !isObject(languageData)
      ) {
        return null;
      }

      if (
        String(arabicData.dua_id) !== String(id) ||
        String(languageData.dua_id) !== String(id)
      ) {
        return null;
      }

      const arabic = String(
        arabicData.arabic ||
        languageData.arabic ||
        ""
      ).trim();

      const title = String(
        languageData.title || ""
      ).trim();

      const transliteration = String(
        languageData.transliteration || ""
      ).trim();

      const translation = String(
        languageData.translation || ""
      ).trim();

      const reference = String(
        languageData.reference ||
        arabicData.reference ||
        ""
      ).trim();

      if (!title) return null;

      /* A record without Arabic is not presented as an
         Arabic supplication. */
      if (!hasArabic(arabic)) return null;

      return {
        id: String(id),
        title,
        arabic,
        transliteration,
        translation,
        reference,

        introduction: String(
          languageData.introduction || ""
        ).trim(),

        whenToRecite:
          languageData.when_to_recite &&
          String(
            languageData.when_to_recite.description || ""
          ).trim(),

        source: languageData
      };
    })();

    duaCache.set(cacheKey, task);

    try {
      return await task;
    } catch (error) {
      duaCache.delete(cacheKey);
      console.warn("Dua load failed:", id, error);
      return null;
    }
  }

  /* =======================================================
     LIMITED PARALLEL LOADING
  ======================================================= */

  async function runLimited(items, limit, worker) {
    const results = new Array(items.length);
    let cursor = 0;

    async function runWorker() {
      while (true) {
        const index = cursor++;

        if (index >= items.length) return;

        results[index] = await worker(items[index], index);
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

    return results;
  }

  async function loadCategoryDuas(category) {
    const cacheKey = `${language}:${category.id}`;

    if (categoryCache.has(cacheKey)) {
      return categoryCache.get(cacheKey);
    }

    const records =
      categoryDuaMap.get(category.id) || [];

    const ids = records.map(record => record.id);

    if (!ids.length) {
      categoryCache.set(cacheKey, []);
      return [];
    }

    const loaded = await runLimited(
      ids,
      7,
      id => loadDua(id)
    );

    const valid = loaded.filter(Boolean);

    categoryCache.set(cacheKey, valid);

    return valid;
  }

  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  function hideAllPages() {
    [
      UI.home,
      UI.entryPage,
      UI.duaPage
    ].forEach(page => {
      page?.classList.add("hidden");
    });
  }

  function hideLoading() {
    UI.loadingBox?.classList.add("hidden");
  }

  function hideError() {
    UI.errorBox?.classList.add("hidden");
  }

  function showLoading(message) {
    hideAllPages();
    hideError();

    if (UI.loadingBox) {
      UI.loadingBox.textContent = message || t("loading");
      UI.loadingBox.classList.remove("hidden");
    }
  }

  function showError(message) {
    hideLoading();
    hideAllPages();

    if (UI.errorText) {
      UI.errorText.textContent =
        message || t("sourceError");
    }

    UI.errorBox?.classList.remove("hidden");
  }

  function showPage(page) {
    currentPage = page;

    hideLoading();
    hideError();

    UI.home?.classList.toggle(
      "hidden",
      page !== "home"
    );

    UI.entryPage?.classList.toggle(
      "hidden",
      page !== "entries"
    );

    UI.duaPage?.classList.toggle(
      "hidden",
      page !== "dua"
    );

    updateHeader();

    if (page === "home" && UI.chapterList) {
      UI.chapterList.scrollTop = 0;
    }

    if (page === "entries" && UI.entryList) {
      UI.entryList.scrollTop = 0;
    }

    if (page === "dua" && UI.duaContent) {
      UI.duaContent.scrollTop = 0;
    }
  }

  /* =======================================================
     HISTORY / BACK BUTTON
  ======================================================= */

  function initializeHistory() {
    if (history.state?.ibadatDuaPage) return;

    history.replaceState(
      { ibadatDuaPage: "home" },
      "",
      location.href
    );
  }

  function pushPage(page) {
    history.pushState(
      { ibadatDuaPage: page },
      "",
      location.href
    );
  }

  window.addEventListener("popstate", event => {
    const page = event.state?.ibadatDuaPage;

    if (page === "entries" && selectedCategory) {
      selectedDua = null;
      showPage("entries");
      return;
    }

    selectedCategory = null;
    selectedDua = null;

    showPage("home");
  });

  /* =======================================================
     CATEGORY LIST
  ======================================================= */

  function renderCategories() {
    const box = UI.chapterList;

    if (!box) return;

    clear(box);

    if (!CATEGORIES.length) {
      showEmpty(box, t("noCategories"));
      return;
    }

    CATEGORIES
      .slice()
      .sort((a, b) => a.order - b.order)
      .forEach((category, index) => {
        const button = createElement(
          "button",
          "chapter-item"
        );

        button.type = "button";

        const number = createElement(
          "span",
          "chapter-number",
          formatNumber(index + 1)
        );

        const name = createElement(
          "span",
          "chapter-name",
          getCategoryName(category)
        );

        const arrow = createElement(
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
    if (isLoading) return;

    selectedCategory = category;
    selectedDua = null;

    const token = ++requestToken;

    isLoading = true;

    pushPage("entries");
    showLoading(t("loadingDuas"));

    try {
      const duas = await loadCategoryDuas(category);

      if (token !== requestToken) return;

      renderDuaList(duas);
      showPage("entries");

    } catch (error) {
      console.error("Category error:", error);

      if (token === requestToken) {
        showError(t("sourceError"));
      }

    } finally {
      if (token === requestToken) {
        isLoading = false;
      }
    }
  }

  /* =======================================================
     DUA LIST
  ======================================================= */

  function renderDuaList(duas) {
    const box = UI.entryList;

    if (!box) return;

    clear(box);

    if (!duas.length) {
      showEmpty(box, t("noDuas"));
      return;
    }

    duas.forEach((dua, index) => {
      const button = createElement(
        "button",
        "entry-item"
      );

      button.type = "button";

      const number = createElement(
        "span",
        "entry-number",
        formatNumber(index + 1)
      );

      const name = createElement(
        "span",
        "entry-name",
        dua.title
      );

      const arrow = createElement(
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
     DUA DETAIL FIELDS
  ======================================================= */

  function addDuaField(
    card,
    label,
    value,
    className,
    direction = "ltr"
  ) {
    if (!value) return;

    const section = createElement(
      "section",
      "dua-section"
    );

    const heading = createElement(
      "div",
      "dua-label",
      label
    );

    const paragraph = createElement(
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

  /* =======================================================
     DUA DETAIL PAGE
  ======================================================= */

  function renderDua(dua) {
    const box = UI.duaContent;

    if (!box) return;

    clear(box);

    if (!dua) {
      showEmpty(box, t("noDetails"));
      return;
    }

    const card = createElement(
      "article",
      "dua-card"
    );

    const heading = createElement(
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
      dua.transliteration || t("missingPronunciation"),
      "dua-pronunciation"
    );

    addDuaField(
      card,
      t("meaning"),
      dua.translation || t("missingTranslation"),
      "dua-translation"
    );

    addDuaField(
      card,
      t("introduction"),
      dua.introduction,
      "dua-translation"
    );

    addDuaField(
      card,
      t("when"),
      dua.whenToRecite,
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

    pushPage("dua");

    renderDua(dua);
    showPage("dua");
  }

  /* =======================================================
     LANGUAGE REFRESH
  ======================================================= */

  async function refreshLanguage() {
    const oldLanguage = language;
    const oldPage = currentPage;

    const oldCategoryId = selectedCategory?.id;
    const oldDuaId = selectedDua?.id;

    readSettings();

    if (oldLanguage === language) {
      applyStaticText();
      return;
    }

    const token = ++requestToken;

    showLoading(t("loading"));

    sourceSubcategories = [];

    categoryCache.clear();
    duaCache.clear();

    try {
      await loadSubcategories();

      if (token !== requestToken) return;

      categoryDuaMap = buildCategoryMap();

      selectedCategory =
        CATEGORIES.find(
          category => category.id === oldCategoryId
        ) || null;

      selectedDua = null;

      if (
        oldPage === "entries" &&
        selectedCategory
      ) {
        showLoading(t("loadingDuas"));

        const duas =
          await loadCategoryDuas(selectedCategory);

        if (token !== requestToken) return;

        renderDuaList(duas);
        showPage("entries");

      } else if (
        oldPage === "dua" &&
        selectedCategory
      ) {
        showLoading(t("loadingDetails"));

        const duas =
          await loadCategoryDuas(selectedCategory);

        if (token !== requestToken) return;

        selectedDua = duas.find(
          dua => String(dua.id) === String(oldDuaId)
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
      console.error("Language refresh error:", error);
      showError(t("sourceError"));
    }
  }

  /* =======================================================
     SETTINGS CHANGE DETECTION
  ======================================================= */

  window.addEventListener("storage", event => {
    if (event.key && event.key !== SETTINGS_KEY) {
      return;
    }

    refreshLanguage();
  });

  window.addEventListener("pageshow", () => {
    refreshLanguage();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      refreshLanguage();
    }
  });

  /* =======================================================
     RETRY
  ======================================================= */

  async function retry() {
    requestToken++;

    isLoading = false;

    sourceSubcategories = [];

    categoryDuaMap.clear();
    categoryCache.clear();
    duaCache.clear();

    await initialize();
  }

  /* =======================================================
     INITIALIZATION
  ======================================================= */

  async function initialize() {
    const token = ++requestToken;

    readSettings();
    initializeHistory();

    showLoading(t("loading"));

    try {
      await loadSubcategories();

      if (token !== requestToken) return;

      categoryDuaMap = buildCategoryMap();

      renderCategories();
      showPage("home");

    } catch (error) {
      console.error("IBADAT Dua initialization:", error);

      if (token !== requestToken) return;

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

  if (UI.retryButton) {
    UI.retryButton.addEventListener("click", retry);
  }

  /* =======================================================
     START
  ======================================================= */

  initialize();

})();
