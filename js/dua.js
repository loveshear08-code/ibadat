"use strict";

/* =========================================================
   IBADAT — DUA.JS
   Fresh implementation
   Language: Bengali / English / Hindi
   Theme: Shared appSettings
   Pages: Chapters / Entries / Selected Dua
   ========================================================= */

(() => {
  /* =======================================================
     1. API CONFIGURATION
  ======================================================= */

  const API_BASE = "https://api.opendua.org/v2";
  const COLLECTION_ID = "hisn-al-muslim";

  const SETTINGS_KEYS = ["appSettings", "ibadatSettings"];

  const $ = (id) => document.getElementById(id);

  /* =======================================================
     2. DOM ELEMENTS
  ======================================================= */

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
     3. TRANSLATIONS
  ======================================================= */

  const TEXT = {
    bn: {
      title: "দোয়া",
      subtitle: "দোয়া শিখুন, পড়ুন ও প্রশান্তি অনুভব করুন",

      footerHome: "আল্লাহর স্মরণে প্রশান্তি",
      footerEntries: "দোয়া শিখুন, আমল করুন",
      footerDua: "দোয়ায় প্রশান্তি খুঁজুন",

      loading: "দোয়া লোড হচ্ছে...",
      loadingChapters: "দোয়ার অধ্যায় লোড হচ্ছে...",
      loadingEntries: "দোয়ার তালিকা লোড হচ্ছে...",
      loadingDua: "দোয়ার বিস্তারিত লোড হচ্ছে...",

      retry: "আবার চেষ্টা করুন",
      loadError: "দুঃখিত, তথ্য লোড করা যায়নি।",
      networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      chaptersError: "দোয়ার অধ্যায়গুলো লোড করা যায়নি।",
      entriesError: "এই অধ্যায়ের দোয়াগুলো লোড করা যায়নি।",
      duaError: "দোয়ার বিস্তারিত তথ্য লোড করা যায়নি।",

      emptyChapters: "কোনো অধ্যায় পাওয়া যায়নি।",
      emptyEntries: "এই অধ্যায়ে কোনো দোয়া পাওয়া যায়নি।",
      emptyDua: "এই দোয়ার বিস্তারিত তথ্য পাওয়া যায়নি।",

      chapter: "অধ্যায়",
      dua: "দোয়া",
      arabic: "আরবি",
      pronunciation: "উচ্চারণ",
      meaning: "অর্থ",
      reference: "রেফারেন্স",

      play: "চালান",
      pause: "থামান",
      previous: "আগের অডিও",
      next: "পরের অডিও",
      audioError: "অডিও চালানো যাচ্ছে না। আবার চেষ্টা করুন।",

      unnamedChapter: "নামবিহীন অধ্যায়",
      unnamedDua: "নামবিহীন দোয়া",

      quotes: [
        "আল্লাহর স্মরণেই অন্তর প্রশান্তি লাভ করে।",
        "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সঙ্গে আছেন।",
        "আল্লাহর ওপর ভরসা করুন, তিনিই যথেষ্ট।",
        "আল্লাহর রহমত থেকে নিরাশ হবেন না।",
        "নিশ্চয়ই কষ্টের সঙ্গেই স্বস্তি রয়েছে।",
        "আল্লাহকে স্মরণ করুন, তিনিও আপনাকে স্মরণ করবেন।",
        "দোয়া মুমিনের জন্য আশার দরজা।",
        "আল্লাহ সর্বশ্রোতা ও সর্বজ্ঞ।",
        "সৎকাজে একে অপরকে সহযোগিতা করুন।",
        "আল্লাহর কাছে ক্ষমা প্রার্থনা করুন।"
      ]
    },

    en: {
      title: "Du'a",
      subtitle: "Learn, recite and find peace through supplication",

      footerHome: "Peace through remembrance",
      footerEntries: "Learn and practise Du'a",
      footerDua: "Find peace through Du'a",

      loading: "Loading Du'as...",
      loadingChapters: "Loading chapters...",
      loadingEntries: "Loading Du'as...",
      loadingDua: "Loading Du'a details...",

      retry: "Try again",
      loadError: "Sorry, the information could not be loaded.",
      networkError: "Check your internet connection and try again.",
      chaptersError: "Could not load the chapters.",
      entriesError: "Could not load the Du'as in this chapter.",
      duaError: "Could not load the Du'a details.",

      emptyChapters: "No chapters were found.",
      emptyEntries: "No Du'as were found in this chapter.",
      emptyDua: "No details were found for this Du'a.",

      chapter: "Chapter",
      dua: "Du'a",
      arabic: "Arabic",
      pronunciation: "Pronunciation",
      meaning: "Meaning",
      reference: "Reference",

      play: "Play",
      pause: "Pause",
      previous: "Previous audio",
      next: "Next audio",
      audioError: "Unable to play audio. Please try again.",

      unnamedChapter: "Untitled chapter",
      unnamedDua: "Untitled Du'a",

      quotes: [
        "Peace comes through the remembrance of Allah.",
        "Indeed, Allah is with those who are patient.",
        "Put your trust in Allah; He is sufficient.",
        "Do not despair of the mercy of Allah.",
        "Indeed, with hardship comes ease.",
        "Remember Allah, and He will remember you.",
        "Supplication is a source of hope for believers.",
        "Allah is the All-Hearing, All-Knowing.",
        "Help one another in righteousness.",
        "Seek forgiveness from Allah."
      ]
    },

    hi: {
      title: "दुआ",
      subtitle: "दुआ सीखें, पढ़ें और सुकून पाएँ",

      footerHome: "अल्लाह के ज़िक्र से सुकून",
      footerEntries: "दुआ सीखें और अमल करें",
      footerDua: "दुआ से सुकून पाएँ",

      loading: "दुआएँ लोड हो रही हैं...",
      loadingChapters: "अध्याय लोड हो रहे हैं...",
      loadingEntries: "दुआओं की सूची लोड हो रही है...",
      loadingDua: "दुआ की जानकारी लोड हो रही है...",

      retry: "फिर कोशिश करें",
      loadError: "जानकारी लोड नहीं हो सकी।",
      networkError: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
      chaptersError: "अध्याय लोड नहीं हो सके।",
      entriesError: "इस अध्याय की दुआएँ लोड नहीं हो सकीं।",
      duaError: "दुआ की जानकारी लोड नहीं हो सकी।",

      emptyChapters: "कोई अध्याय नहीं मिला।",
      emptyEntries: "इस अध्याय में कोई दुआ नहीं मिली।",
      emptyDua: "इस दुआ की जानकारी उपलब्ध नहीं है।",

      chapter: "अध्याय",
      dua: "दुआ",
      arabic: "अरबी",
      pronunciation: "उच्चारण",
      meaning: "अर्थ",
      reference: "संदर्भ",

      play: "चलाएँ",
      pause: "रोकें",
      previous: "पिछला ऑडियो",
      next: "अगला ऑडियो",
      audioError: "ऑडियो नहीं चल सका। फिर कोशिश करें।",

      unnamedChapter: "बिना नाम का अध्याय",
      unnamedDua: "बिना नाम की दुआ",

      quotes: [
        "अल्लाह के ज़िक्र से दिलों को सुकून मिलता है।",
        "निश्चय ही अल्लाह सब्र करने वालों के साथ है।",
        "अल्लाह पर भरोसा रखें, वही पर्याप्त है।",
        "अल्लाह की रहमत से निराश न हों।",
        "निश्चय ही कठिनाई के साथ आसानी है।",
        "अल्लाह को याद करें, वह आपको याद करेगा।",
        "दुआ मोमिन के लिए उम्मीद का सहारा है।",
        "अल्लाह सब सुनने और जानने वाला है।",
        "नेकी के कामों में एक-दूसरे की मदद करें।",
        "अल्लाह से माफी माँगें।"
      ]
    }
  };

  /* =======================================================
     4. STATE
  ======================================================= */

  let language = "bn";
  let darkMode = false;
  let colorTheme = "classic";

  let currentPage = "home";

  let chapters = [];
  let entries = [];

  let selectedChapter = null;
  let selectedEntry = null;
  let selectedDetails = null;

  let audioList = [];
  let audio = null;
  let audioPlayer = null;
  let audioIndex = 0;

  let loadingVersion = 0;
  let activeController = null;
  let lastErrorType = "chapters";

  let restoringHistory = false;

  const t = (key) =>
    TEXT[language]?.[key] ?? TEXT.bn[key] ?? key;

  /* =======================================================
     5. SAFE DATA HELPERS
  ======================================================= */

  function isObject(value) {
    return value !== null &&
      typeof value === "object" &&
      !Array.isArray(value);
  }

  function array(value) {
    return Array.isArray(value) ? value : [];
  }

  function firstValue(object, keys) {
    if (!isObject(object)) return undefined;

    for (const key of keys) {
      const value = object[key];

      if (value !== undefined && value !== null && value !== "") {
        return value;
      }
    }

    return undefined;
  }

  function normalizeLanguage(value) {
    const valueText = String(value || "bn").toLowerCase().trim();

    if (["en", "eng", "english"].includes(valueText)) return "en";
    if (["hi", "hin", "hindi"].includes(valueText)) return "hi";

    return "bn";
  }

  function localeDigits(value) {
    const digits = {
      bn: "০১২৩৪৫৬৭৮৯",
      hi: "०१२३४५६७८९",
      en: "0123456789"
    };

    return String(value).replace(/\d/g, digit =>
      digits[language][Number(digit)]
    );
  }

  function localized(value) {
    if (value === null || value === undefined) return "";

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }

    if (Array.isArray(value)) {
      return value.map(localized).filter(Boolean).join("\n");
    }

    if (!isObject(value)) return "";

    const languageAliases = {
      bn: ["bn", "ben", "bangla", "bengali"],
      en: ["en", "eng", "english"],
      hi: ["hi", "hin", "hindi"]
    };

    for (const key of languageAliases[language]) {
      if (value[key] !== undefined && value[key] !== null) {
        const result = localized(value[key]);
        if (result) return result;
      }
    }

    for (const key of [
      "text",
      "value",
      "name",
      "title",
      "translation",
      "content"
    ]) {
      if (value[key] !== undefined && value[key] !== null) {
        const result = localized(value[key]);
        if (result) return result;
      }
    }

    return "";
  }

  function field(object, keys) {
    for (const key of keys) {
      if (object && object[key] !== undefined && object[key] !== null) {
        const result = localized(object[key]);
        if (result) return result;
      }
    }

    return "";
  }

  function itemId(item) {
    return firstValue(item, [
      "id",
      "uuid",
      "slug",
      "chapter_id",
      "entry_id"
    ]);
  }

  function chapterName(chapter, index) {
    return field(chapter, [
      "name",
      "title",
      "translated_name",
      "translation",
      "label"
    ]) || `${t("chapter")} ${localeDigits(index + 1)}`;
  }

  function entryName(entry, index) {
    return field(entry, [
      "name",
      "title",
      "translated_name",
      "translation",
      "label"
    ]) || `${t("dua")} ${localeDigits(index + 1)}`;
  }

  function sameId(a, b) {
    return a !== undefined &&
      a !== null &&
      b !== undefined &&
      b !== null &&
      String(a) === String(b);
  }

  /* =======================================================
     6. SHARED SETTINGS
  ======================================================= */

  function readSettings() {
    let settings = {};

    for (const key of SETTINGS_KEYS) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        const parsed = JSON.parse(raw);

        if (isObject(parsed)) {
          settings = { ...settings, ...parsed };
        }
      } catch (error) {
        console.warn("Could not read settings:", error);
      }
    }

    language = normalizeLanguage(
      settings.lang ??
      settings.language ??
      settings.locale ??
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

    const validThemes = ["classic", "royal", "rose", "pista"];

    colorTheme = validThemes.includes(settings.themeColor)
      ? settings.themeColor
      : "classic";

    applyTheme();
    applyStaticLabels();
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

      meta.content = darkMode
        ? "#081b13"
        : colors[colorTheme];
    }
  }

  function applyStaticLabels() {
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

    if (currentPage === "entries" && selectedChapter) {
      el.heroTitle.textContent = chapterName(selectedChapter, 0);
      return;
    }

    if (currentPage === "dua" && selectedEntry) {
      el.heroTitle.textContent = entryName(
        selectedEntry,
        Math.max(0, entries.indexOf(selectedEntry))
      );
      return;
    }

    el.heroTitle.textContent = t("title");
  }

  /* =======================================================
     7. FOOTER MARQUEE
     The ten messages are repeated for continuous scrolling.
  ======================================================= */

  function updateFooter() {
    if (!el.footerText) return;

    if (currentPage !== "home") {
      el.footerText.textContent = currentPage === "entries"
        ? t("footerEntries")
        : t("footerDua");

      el.footerText.style.textAlign = "center";
      el.footerText.style.animation = "none";
      return;
    }

    const messages = t("quotes");
    const quotes = Array.isArray(messages) ? messages : TEXT.bn.quotes;

    el.footerText.replaceChildren();

    const track = document.createElement("span");
    track.className = "dua-quote-track";

    const firstRun = document.createElement("span");
    const secondRun = document.createElement("span");

    firstRun.className = "dua-quote-run";
    secondRun.className = "dua-quote-run";
    secondRun.setAttribute("aria-hidden", "true");

    const buildQuotes = (parent) => {
      quotes.forEach((quote, index) => {
        const span = document.createElement("span");
        span.textContent = quote;
        parent.appendChild(span);

        if (index < quotes.length - 1) {
          const separator = document.createElement("span");
          separator.className = "dua-quote-separator";
          separator.textContent = "✦";
          separator.setAttribute("aria-hidden", "true");
          parent.appendChild(separator);
        }
      });
    };

    buildQuotes(firstRun);
    buildQuotes(secondRun);

    track.append(firstRun, secondRun);
    el.footerText.appendChild(track);

    el.footerText.style.textAlign = "start";
    el.footerText.style.animation = "none";

    /*
     * Inject only the small marquee rules needed by this footer.
     * Existing HTML/CSS IDs remain unchanged.
     */
    if (!$("duaMarqueeStyle")) {
      const style = document.createElement("style");
      style.id = "duaMarqueeStyle";

      style.textContent = `
        .dua-footer-content {
          justify-content: flex-start;
        }

        .dua-footer-message {
          display: block;
          text-align: start;
        }

        .dua-quote-track {
          display: flex;
          align-items: center;
          width: max-content;
          white-space: nowrap;
          animation: duaQuoteScroll 65s linear infinite;
          will-change: transform;
        }

        .dua-quote-run {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 22px;
          padding-inline-end: 22px;
        }

        .dua-quote-run > span {
          flex: 0 0 auto;
          font-size: 12px;
          font-weight: 700;
        }

        .dua-quote-run .dua-quote-separator {
          color: var(--accent);
        }

        @keyframes duaQuoteScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .dua-quote-track {
            animation-duration: 120s;
          }
        }
      `;

      document.head.appendChild(style);
    }
  }

  /* =======================================================
     8. DOM HELPERS
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

  function setHidden(node, hidden) {
    if (!node) return;

    node.classList.toggle("hidden", hidden);
    node.hidden = hidden;
  }

  function showLoading(message) {
    setHidden(el.loadingBox, false);
    setHidden(el.errorBox, true);

    setHidden(el.home, true);
    setHidden(el.entryPage, true);
    setHidden(el.duaPage, true);

    if (el.loadingBox) {
      el.loadingBox.textContent = message || t("loading");
    }
  }

  function hideLoading() {
    setHidden(el.loadingBox, true);
  }

  function showError(message, type) {
    lastErrorType = type || "chapters";

    hideLoading();

    setHidden(el.home, true);
    setHidden(el.entryPage, true);
    setHidden(el.duaPage, true);

    if (el.errorText) {
      el.errorText.textContent = message || t("loadError");
    }

    setHidden(el.errorBox, false);
  }

  function hideError() {
    setHidden(el.errorBox, true);
  }

  function showEmpty(container, message) {
    clear(container);
    container.appendChild(
      makeElement("div", "empty-message", message)
    );
  }

  /* =======================================================
     9. API REQUEST HELPERS
  ======================================================= */

  function collectionURL(path) {
    return `${API_BASE}/collections/${encodeURIComponent(COLLECTION_ID)}${path}`;
  }

  async function fetchJSON(url, options = {}) {
    if (activeController) {
      activeController.abort();
    }

    const controller = new AbortController();
    activeController = controller;

    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(options.headers || {})
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } finally {
      clearTimeout(timeout);

      if (activeController === controller) {
        activeController = null;
      }
    }
  }

  function unwrapList(data, keys) {
    if (Array.isArray(data)) return data;
    if (!isObject(data)) return [];

    for (const key of keys) {
      if (Array.isArray(data[key])) return data[key];
    }

    if (isObject(data.data)) {
      for (const key of keys) {
        if (Array.isArray(data.data[key])) return data.data[key];
      }
    }

    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.results)) return data.results;

    return [];
  }

  function unwrapObject(data) {
    if (!isObject(data)) return {};
    if (isObject(data.data)) return data.data;
    if (isObject(data.result)) return data.result;
    return data;
  }

  async function tryURLs(urls, getResult) {
    let lastError = null;

    for (const url of urls) {
      try {
        const result = await fetchJSON(url);
        const value = getResult(result);

        if (value !== null && value !== undefined) {
          return value;
        }
      } catch (error) {
        lastError = error;

        if (error.name === "AbortError") {
          throw error;
        }
      }
    }

    throw lastError || new Error("API request failed");
  }

  async function fetchChapters() {
    const urls = [
      collectionURL("/chapters"),
      `${API_BASE}/chapters?collection_id=${encodeURIComponent(COLLECTION_ID)}`
    ];

    return tryURLs(urls, data => {
      const list = unwrapList(data, ["chapters", "items", "results"]);
      return list.length || Array.isArray(data) ? list : null;
    });
  }

  async function fetchEntries(chapter) {
    const id = itemId(chapter);

    if (id === undefined) {
      if (Array.isArray(chapter.entries)) return chapter.entries;
      if (Array.isArray(chapter.duas)) return chapter.duas;
      throw new Error("Chapter ID is missing");
    }

    const urls = [
      collectionURL(`/chapters/${encodeURIComponent(id)}/entries`),
      `${API_BASE}/chapters/${encodeURIComponent(id)}/entries`
    ];

    try {
      return await tryURLs(urls, data => {
        const list = unwrapList(data, [
          "entries",
          "duas",
          "items",
          "results"
        ]);

        return list.length || Array.isArray(data) ? list : null;
      });
    } catch (error) {
      if (Array.isArray(chapter.entries)) return chapter.entries;
      if (Array.isArray(chapter.duas)) return chapter.duas;
      throw error;
    }
  }

  async function fetchDuaDetails(entry) {
    const id = itemId(entry);

    if (id === undefined) return entry;

    const urls = [
      collectionURL(`/entries/${encodeURIComponent(id)}`),
      `${API_BASE}/entries/${encodeURIComponent(id)}`
    ];

    try {
      return await tryURLs(urls, data => unwrapObject(data));
    } catch (error) {
      if (
        entry.variations ||
        entry.steps ||
        entry.items ||
        entry.dua ||
        entry.arabic ||
        entry.text
      ) {
        return entry;
      }

      throw error;
    }
  }

  /* =======================================================
     10. HISTORY / SYSTEM BACK
  ======================================================= */

  function pageState(page) {
    return {
      ...(history.state || {}),
      ibadatDuaPage: page,
      chapterId: itemId(selectedChapter) ?? null,
      entryId: itemId(selectedEntry) ?? null
    };
  }

  function replaceHistory(page) {
    try {
      history.replaceState(pageState(page), "", location.href);
    } catch (error) {
      console.warn("Could not replace history state:", error);
    }
  }

  function pushHistory(page) {
    if (restoringHistory) return;

    try {
      history.pushState(pageState(page), "", location.href);
    } catch (error) {
      console.warn("Could not push history state:", error);
    }
  }

  async function restoreHistoryState(state) {
    restoringHistory = true;

    try {
      if (state?.ibadatDuaPage === "dua" && state.entryId != null) {
        const entry = entries.find(item =>
          sameId(itemId(item), state.entryId)
        );

        if (entry) {
          await openDua(entry, { addHistory: false });
          return;
        }
      }

      if (state?.ibadatDuaPage === "entries" && state.chapterId != null) {
        const chapter = chapters.find(item =>
          sameId(itemId(item), state.chapterId)
        );

        if (chapter) {
          await openChapter(chapter, { addHistory: false });
          return;
        }
      }

      await goHome({ addHistory: false });
    } finally {
      restoringHistory = false;
    }
  }

  window.addEventListener("popstate", event => {
    restoreHistoryState(event.state || history.state).catch(error => {
      console.error("Back navigation failed:", error);
      goHome({ addHistory: false });
    });
  });

  /* =======================================================
     11. PAGE NAVIGATION
  ======================================================= */

  function showPage(page) {
    currentPage = page;

    hideLoading();
    hideError();

    setHidden(el.home, page !== "home");
    setHidden(el.entryPage, page !== "entries");
    setHidden(el.duaPage, page !== "dua");

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

  async function goHome(options = {}) {
    const addHistory = options.addHistory !== false;

    stopAudio();

    selectedChapter = null;
    selectedEntry = null;
    selectedDetails = null;

    showPage("home");

    if (addHistory) pushHistory("home");
    else replaceHistory("home");

    if (!chapters.length) {
      await loadChapters();
    } else {
      renderChapters();
    }
  }

  async function openChapter(chapter, options = {}) {
    if (!chapter) return;

    const addHistory = options.addHistory !== false;

    stopAudio();

    selectedChapter = chapter;
    selectedEntry = null;
    selectedDetails = null;
    entries = [];

    showPage("entries");

    if (addHistory) pushHistory("entries");
    else replaceHistory("entries");

    const version = ++loadingVersion;

    showLoading(t("loadingEntries"));

    try {
      const result = await fetchEntries(chapter);

      if (version !== loadingVersion) return;

      entries = result;

      hideLoading();
      hideError();

      showPage("entries");
      renderEntries();
    } catch (error) {
      if (version !== loadingVersion) return;

      console.error("Could not load entries:", error);

      showError(
        error.name === "AbortError"
          ? t("networkError")
          : t("entriesError"),
        "entries"
      );
    }
  }

  async function openDua(entry, options = {}) {
    if (!entry) return;

    const addHistory = options.addHistory !== false;

    stopAudio();

    selectedEntry = entry;
    selectedDetails = null;

    showPage("dua");

    if (addHistory) pushHistory("dua");
    else replaceHistory("dua");

    const version = ++loadingVersion;

    showLoading(t("loadingDua"));

    try {
      const details = await fetchDuaDetails(entry);

      if (version !== loadingVersion) return;
      if (selectedEntry !== entry) return;

      selectedDetails = details;

      hideLoading();
      hideError();

      showPage("dua");
      renderDua(details);
    } catch (error) {
      if (version !== loadingVersion) return;

      console.error("Could not load dua:", error);

      showError(
        error.name === "AbortError"
          ? t("networkError")
          : t("duaError"),
        "dua"
      );
    }
  }

  /* =======================================================
     12. CHAPTER LIST
  ======================================================= */

  function renderChapters() {
    const container = el.chapterList;
    if (!container) return;

    clear(container);

    if (!chapters.length) {
      showEmpty(container, t("emptyChapters"));
      return;
    }

    chapters.forEach((chapter, index) => {
      const button = makeElement("button", "chapter-item");
      button.type = "button";

      const number = makeElement(
        "span",
        "chapter-number",
        localeDigits(index + 1)
      );

      const name = makeElement(
        "span",
        "chapter-name",
        chapterName(chapter, index)
      );

      const arrow = makeElement("span", "chapter-arrow", "›");
      arrow.setAttribute("aria-hidden", "true");

      button.append(number, name, arrow);
      button.addEventListener("click", () => openChapter(chapter));

      container.appendChild(button);
    });
  }

  /* =======================================================
     13. ENTRY LIST
  ======================================================= */

  function renderEntries() {
    const container = el.entryList;
    if (!container) return;

    clear(container);

    if (!entries.length) {
      showEmpty(container, t("emptyEntries"));
      return;
    }

    entries.forEach((entry, index) => {
      const button = makeElement("button", "entry-item");
      button.type = "button";

      const number = makeElement(
        "span",
        "entry-number",
        localeDigits(index + 1)
      );

      const name = makeElement(
        "span",
        "entry-name",
        entryName(entry, index)
      );

      const arrow = makeElement("span", "entry-arrow", "›");
      arrow.setAttribute("aria-hidden", "true");

      button.append(number, name, arrow);
      button.addEventListener("click", () => openDua(entry));

      container.appendChild(button);
    });
  }

  /* =======================================================
     14. DUA DATA EXTRACTION
  ======================================================= */

  function extractDuas(details) {
    if (!isObject(details)) return [];

    if (Array.isArray(details.variations)) {
      const result = [];

      details.variations.forEach(variation => {
        array(variation.steps).forEach(step => {
          array(step.items).forEach(item => {
            result.push({
              ...item,
              recordings: array(step.recordings),
              variation
            });
          });
        });
      });

      if (result.length) return result;
    }

    if (Array.isArray(details.steps)) {
      const result = [];

      details.steps.forEach(step => {
        array(step.items).forEach(item => {
          result.push({
            ...item,
            recordings: array(step.recordings)
          });
        });
      });

      if (result.length) return result;
    }

    if (Array.isArray(details.items)) return details.items;
    if (Array.isArray(details.duas)) return details.duas;

    if (
      details.dua ||
      details.arabic ||
      details.text ||
      details.translation
    ) {
      return [details];
    }

    return [];
  }

  function getArabic(item) {
    return field(item, [
      "dua",
      "arabic",
      "arabic_text",
      "text_ar",
      "text",
      "content"
    ]);
  }

  function getPronunciation(item) {
    return field(item, [
      "transliteration",
      "transliteration_text",
      "pronunciation",
      "phonetic",
      "roman"
    ]);
  }

  function getMeaning(item) {
    return field(item, [
      "translation",
      "meaning",
      "translated_text",
      "text_translation",
      "translation_text"
    ]);
  }

  function getReference(item) {
    return field(item, [
      "reference",
      "source",
      "references",
      "footnote",
      "reference_text"
    ]);
  }

  /* =======================================================
     15. RENDER DUA DETAILS
  ======================================================= */

  function appendField(card, label, value, className, rtl = false) {
    if (!value) return;

    const section = makeElement("div", `${className}-section`);

    let labelClass = "dua-label";

    if (className === "dua-arabic") {
      labelClass += " arabic-label";
    } else if (className === "dua-transliteration") {
      labelClass += " pronunciation-label";
    } else if (className === "dua-translation") {
      labelClass += " translation-label";
    } else {
      labelClass += " reference-label";
    }

    const heading = makeElement("div", labelClass, label);
    const paragraph = makeElement("p", className, value);

    if (rtl) {
      paragraph.dir = "rtl";
      paragraph.lang = "ar";
    }

    section.append(heading, paragraph);
    card.appendChild(section);
  }

  function renderDua(details) {
    const container = el.duaContent;
    if (!container) return;

    clear(container);

    const items = extractDuas(details);

    if (!items.length) {
      showEmpty(container, t("emptyDua"));
      return;
    }

    items.forEach(item => {
      const card = makeElement("article", "dua-card");

      appendField(card, t("arabic"), getArabic(item), "dua-arabic", true);
      appendField(
        card,
        t("pronunciation"),
        getPronunciation(item),
        "dua-transliteration"
      );
      appendField(
        card,
        t("meaning"),
        getMeaning(item),
        "dua-translation"
      );
      appendField(
        card,
        t("reference"),
        getReference(item),
        "dua-reference"
      );

      if (card.childElementCount) {
        container.appendChild(card);
      }
    });

    if (!container.childElementCount) {
      showEmpty(container, t("emptyDua"));
      return;
    }

    audioList = extractAudioList(details, items);

    if (audioList.length) {
      createAudioPlayer(audioList);
    }
  }

  /* =======================================================
     16. AUDIO EXTRACTION
  ======================================================= */

  function extractAudioList(details, items) {
    const tracks = [];

    function add(list) {
      if (!Array.isArray(list)) return;

      list.forEach(item => {
        let url = "";

        if (typeof item === "string") {
          url = item;
        } else {
          url = firstValue(item, [
            "url",
            "audio_url",
            "src",
            "file",
            "path"
          ]);
        }

        if (!url) return;

        tracks.push({
          url: String(url),
          title: typeof item === "object"
            ? field(item, ["title", "name", "label"])
            : ""
        });
      });
    }

    add(details.recordings);
    add(details.audios);

    if (typeof details.audio === "string") {
      add([details.audio]);
    } else {
      add(details.audio);
    }

    array(details.variations).forEach(variation => {
      array(variation.steps).forEach(step => add(step.recordings));
    });

    array(items).forEach(item => {
      add(item.recordings);
      add(item.audios);

      if (typeof item.audio === "string") {
        add([item.audio]);
      } else {
        add(item.audio);
      }
    });

    const unique = new Map();

    tracks.forEach(track => {
      if (/^https?:\/\//i.test(track.url) && !unique.has(track.url)) {
        unique.set(track.url, track);
      }
    });

    return Array.from(unique.values());
  }

  /* =======================================================
     17. AUDIO PLAYER
  ======================================================= */

  function stopAudio() {
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audio = null;
    }

    if (audioPlayer) {
      audioPlayer.remove();
      audioPlayer = null;
    }

    audioList = [];
    audioIndex = 0;
  }

  function createAudioPlayer(tracks) {
    if (!el.duaContent || !tracks.length) return;

    stopAudio();

    audioList = tracks;

    const player = makeElement("section", "dua-audio-player");
    player.id = "duaAudioPlayer";

    const previous = makeElement("button", "audio-control", "⏮");
    const play = makeElement(
      "button",
      "audio-control audio-play-button",
      "▶"
    );
    const next = makeElement("button", "audio-control", "⏭");

    previous.type = play.type = next.type = "button";

    previous.setAttribute("aria-label", t("previous"));
    play.setAttribute("aria-label", t("play"));
    next.setAttribute("aria-label", t("next"));

    const progressWrap = makeElement("div", "audio-progress-wrap");
    const progress = document.createElement("input");

    progress.type = "range";
    progress.min = "0";
    progress.max = "100";
    progress.step = "0.1";
    progress.value = "0";
    progress.className = "audio-track";
    progress.setAttribute("aria-label", t("play"));

    const time = makeElement("div", "audio-time");
    const currentTime = makeElement("span", "", "0:00");
    const duration = makeElement("span", "", "0:00");

    time.append(currentTime, duration);
    progressWrap.append(progress, time);
    player.append(previous, play, next, progressWrap);

    el.duaContent.appendChild(player);

    audioPlayer = player;
    audio = new Audio();
    audio.preload = "metadata";

    function formatTime(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

      const minutes = Math.floor(seconds / 60);
      const secondsLeft = Math.floor(seconds % 60);

      return `${minutes}:${String(secondsLeft).padStart(2, "0")}`;
    }

    function updatePlayButton() {
      if (!audio) return;

      const playing = !audio.paused;

      play.textContent = playing ? "Ⅱ" : "▶";
      play.setAttribute(
        "aria-label",
        playing ? t("pause") : t("play")
      );
      play.title = playing ? t("pause") : t("play");
    }

    function loadTrack(index, autoplay = false) {
      if (!audio || !audioList.length) return;

      audioIndex = (index + audioList.length) % audioList.length;

      audio.pause();
      audio.src = audioList[audioIndex].url;
      audio.load();

      progress.value = "0";
      currentTime.textContent = "0:00";
      duration.textContent = "0:00";

      updatePlayButton();

      if (autoplay) {
        audio.play().catch(error => {
          console.warn("Audio playback failed:", error);
          showAudioMessage(t("audioError"));
          updatePlayButton();
        });
      }
    }

    previous.addEventListener("click", () => {
      loadTrack(audioIndex - 1, true);
    });

    next.addEventListener("click", () => {
      loadTrack(audioIndex + 1, true);
    });

    play.addEventListener("click", async () => {
      if (!audio) return;

      if (audio.paused) {
        try {
          await audio.play();
        } catch (error) {
          console.warn("Audio playback failed:", error);
          showAudioMessage(t("audioError"));
        }
      } else {
        audio.pause();
      }

      updatePlayButton();
    });

    progress.addEventListener("input", () => {
      if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime =
          (Number(progress.value) / 100) * audio.duration;
      }
    });

    audio.addEventListener("loadedmetadata", () => {
      duration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
        return;
      }

      progress.value = String(audio.currentTime / audio.duration * 100);
      currentTime.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("play", updatePlayButton);
    audio.addEventListener("pause", updatePlayButton);

    audio.addEventListener("ended", () => {
      if (audioIndex < audioList.length - 1) {
        loadTrack(audioIndex + 1, true);
      } else {
        updatePlayButton();
      }
    });

    loadTrack(0);
  }

  function showAudioMessage(message) {
    if (!el.duaContent) return;

    let notice = $("duaAudioNotice");

    if (!notice) {
      notice = makeElement("div", "empty-message");
      notice.id = "duaAudioNotice";
      el.duaContent.appendChild(notice);
    }

    notice.textContent = message;
  }

  /* =======================================================
     18. LOAD CHAPTERS
  ======================================================= */

  async function loadChapters() {
    const version = ++loadingVersion;

    showLoading(t("loadingChapters"));

    try {
      const result = await fetchChapters();

      if (version !== loadingVersion) return;

      chapters = result;

      hideLoading();
      hideError();

      showPage("home");
      renderChapters();
      replaceHistory("home");
    } catch (error) {
      if (version !== loadingVersion) return;

      console.error("Chapter loading failed:", error);

      showError(
        error.name === "AbortError"
          ? t("networkError")
          : t("chaptersError"),
        "chapters"
      );
    }
  }

  /* =======================================================
     19. RETRY
  ======================================================= */

  async function retryLastRequest() {
    hideError();

    if (lastErrorType === "entries" && selectedChapter) {
      await openChapter(selectedChapter, { addHistory: false });
      return;
    }

    if (lastErrorType === "dua" && selectedEntry) {
      await openDua(selectedEntry, { addHistory: false });
      return;
    }

    await loadChapters();
  }

  /* =======================================================
     20. SETTINGS CHANGE HANDLING
  ======================================================= */

  function refreshVisibleContent() {
    applyStaticLabels();

    if (currentPage === "home") {
      renderChapters();
    } else if (currentPage === "entries") {
      renderEntries();
    } else if (currentPage === "dua" && selectedDetails) {
      renderDua(selectedDetails);
    }
  }

  window.addEventListener("storage", event => {
    if (event.key && !SETTINGS_KEYS.includes(event.key)) return;

    const previousLanguage = language;
    const previousDark = darkMode;
    const previousTheme = colorTheme;

    readSettings();

    if (
      previousLanguage !== language ||
      previousDark !== darkMode ||
      previousTheme !== colorTheme
    ) {
      refreshVisibleContent();
    }
  });

  window.addEventListener("pageshow", () => {
    const previousLanguage = language;
    const previousDark = darkMode;
    const previousTheme = colorTheme;

    readSettings();

    if (
      previousLanguage !== language ||
      previousDark !== darkMode ||
      previousTheme !== colorTheme
    ) {
      refreshVisibleContent();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;

    const previousLanguage = language;
    const previousDark = darkMode;
    const previousTheme = colorTheme;

    readSettings();

    if (
      previousLanguage !== language ||
      previousDark !== darkMode ||
      previousTheme !== colorTheme
    ) {
      refreshVisibleContent();
    }
  });

  /* =======================================================
     21. INITIALIZATION
  ======================================================= */

  function bindEvents() {
    if (el.retryButton) {
      el.retryButton.addEventListener("click", retryLastRequest);
    }
  }

  async function init() {
    readSettings();
    bindEvents();

    try {
      history.replaceState(
        {
          ...(history.state || {}),
          ibadatDuaPage: "home",
          chapterId: null,
          entryId: null
        },
        "",
        location.href
      );
    } catch (error) {
      console.warn("Could not initialize history:", error);
    }

    currentPage = "home";
    updateHeader();
    updateFooter();

    await loadChapters();
  }

  init().catch(error => {
    console.error("Du'a app initialization failed:", error);
    showError(t("loadError"), "chapters");
  });

})();
