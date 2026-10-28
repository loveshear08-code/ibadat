
// =====================================================
// IBADAT — HADITH CONTROLLER
// File: js/hadith.js
//
// Two screens only:
// 1. Eight-book selection
// 2. Complete scrollable hadith list
//
// Reads global appSettings from js/theme.js
// =====================================================

"use strict";

(function () {
  const $ = (id) => document.getElementById(id);

  const el = {
    app: $("hadithApp"),
    pageTitle: $("pageTitle"),
    headerAction: $("headerAction"),
    backBooks: $("backBooks"),

    booksScreen: $("booksScreen"),
    booksGrid: $("booksGrid"),

    listScreen: $("listScreen"),
    listHeading: $("listHeading"),
    listSubtitle: $("listSubtitle"),

    searchToggle: $("searchToggle"),
    searchPanel: $("searchPanel"),
    hadithSearch: $("hadithSearch"),
    clearSearch: $("clearSearch"),

    listStatus: $("listStatus"),
    hadithList: $("hadithList"),
    listMessage: $("listMessage"),
    messageText: $("messageText"),
    retryButton: $("retryButton"),
    listBottom: $("listBottom"),
    loadedCount: $("loadedCount"),

    footerMessage: $("footerMessage")
  };

  const BOOKS = [
    {
      id: "bukhari",
      api: "bukhari",
      names: {
        bn: "সহিহ বুখারি",
        en: "Sahih al-Bukhari",
        hi: "सहीह अल-बुखारी"
      }
    },
    {
      id: "muslim",
      api: "muslim",
      names: {
        bn: "সহিহ মুসলিম",
        en: "Sahih Muslim",
        hi: "सहीह मुस्लिम"
      }
    },
    {
      id: "abudawud",
      api: "abudawud",
      names: {
        bn: "সুনান আবু দাউদ",
        en: "Sunan Abi Dawud",
        hi: "सुनन अबू दाऊद"
      }
    },
    {
      id: "tirmidhi",
      api: "tirmidhi",
      names: {
        bn: "জামে তিরমিজি",
        en: "Jami at-Tirmidhi",
        hi: "जामे तिर्मिज़ी"
      }
    },
    {
      id: "nasai",
      api: "nasai",
      names: {
        bn: "সুনান নাসাঈ",
        en: "Sunan an-Nasa'i",
        hi: "सुनन नसाई"
      }
    },
    {
      id: "ibnmajah",
      api: "ibnmajah",
      names: {
        bn: "সুনান ইবনে মাজাহ",
        en: "Sunan Ibn Majah",
        hi: "सुनन इब्न माजा"
      }
    },
    {
      id: "malik",
      api: "malik",
      names: {
        bn: "মুআত্তা ইমাম মালিক",
        en: "Muwatta Imam Malik",
        hi: "मुवत्ता इमाम मालिक"
      }
    },
    {
      id: "nawawi",
      api: "nawawi40",
      names: {
        bn: "ইমাম নববীর ৪০ হাদিস",
        en: "Forty Hadith of Imam Nawawi",
        hi: "इमाम नववी की चालीस हदीसें"
      }
    }
  ];

  const LANG = {
    bn: {
      title: "হাদিস সংকলন",
      footer: "জ্ঞান অর্জন করুন, আমল করুন",
      subtitle: "আরবি পাঠ ও বাংলা অনুবাদ",
      search: "হাদিস খুঁজুন…",
      searchLabel: "হাদিস খুঁজুন",
      loading: "হাদিস লোড হচ্ছে…",
      empty: "কোনো হাদিস পাওয়া যায়নি।",
      error: "হাদিস লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      retry: "আবার চেষ্টা করুন",
      number: "হাদিস",
      translation: "অনুবাদ",
      loaded: "মোট {count}টি হাদিস",
      back: "বইয়ের তালিকায় ফিরে যান",
      refresh: "পুনরায় লোড করুন",
      clear: "সার্চ মুছুন",
      noArabic: "আরবি পাঠ পাওয়া যায়নি।",
      noTranslation: "এই ভাষায় অনুবাদ পাওয়া যায়নি।"
    },
    en: {
      title: "Hadith Collection",
      footer: "Learn knowledge, put it into practice",
      subtitle: "Arabic text and English translation",
      search: "Search hadiths…",
      searchLabel: "Search hadiths",
      loading: "Loading hadiths…",
      empty: "No hadiths found.",
      error: "Could not load hadiths. Check your internet connection and try again.",
      retry: "Try again",
      number: "Hadith",
      translation: "Translation",
      loaded: "{count} hadiths",
      back: "Back to books",
      refresh: "Reload hadiths",
      clear: "Clear search",
      noArabic: "Arabic text is unavailable.",
      noTranslation: "Translation is unavailable in this language."
    },
    hi: {
      title: "हदीस संग्रह",
      footer: "ज्ञान प्राप्त करें और अमल करें",
      subtitle: "अरबी पाठ और हिंदी अनुवाद",
      search: "हदीस खोजें…",
      searchLabel: "हदीस खोजें",
      loading: "हदीस लोड हो रही हैं…",
      empty: "कोई हदीस नहीं मिली।",
      error: "हदीस लोड नहीं हो सकीं। इंटरनेट जाँचकर फिर कोशिश करें।",
      retry: "फिर कोशिश करें",
      number: "हदीस",
      translation: "अनुवाद",
      loaded: "कुल {count} हदीसें",
      back: "पुस्तकों की सूची पर लौटें",
      refresh: "फिर से लोड करें",
      clear: "खोज मिटाएँ",
      noArabic: "अरबी पाठ उपलब्ध नहीं है।",
      noTranslation: "इस भाषा में अनुवाद उपलब्ध नहीं है।"
    }
  };

  const API_BASE =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";

  const LANGUAGE_CODES = {
    bn: ["ben", "ben"],
    en: ["eng", "eng"],
    hi: ["hin", "hin"]
  };

  const state = {
    lang: "bn",
    dark: false,
    themeColor: "classic",
    screen: "books",
    book: null,
    hadiths: [],
    query: "",
    searchOpen: false,
    loading: false,
    requestId: 0,
    cache: new Map()
  };

  function readSettings() {
    const fallback = {
      lang: "bn",
      dark: false,
      themeColor: "classic"
    };

    try {
      const saved = localStorage.getItem("appSettings");

      if (!saved) return fallback;

      const parsed = JSON.parse(saved);

      if (!parsed || typeof parsed !== "object") {
        return fallback;
      }

      const theme = ["classic", "royal", "rose", "pista"].includes(
        parsed.themeColor
      )
        ? parsed.themeColor
        : ["classic", "royal", "rose", "pista"].includes(parsed.theme)
          ? parsed.theme
          : fallback.themeColor;

      const lang = ["bn", "en", "hi"].includes(parsed.lang)
        ? parsed.lang
        : ["bn", "en", "hi"].includes(parsed.language)
          ? parsed.language
          : fallback.lang;

      return {
        lang,
        dark: parsed.dark === true,
        themeColor: theme
      };
    } catch (error) {
      console.warn("IBADAT Hadith: Settings could not be read.", error);
      return fallback;
    }
  }

  function text(key) {
    return (LANG[state.lang] || LANG.bn)[key] || LANG.bn[key] || key;
  }

  function formatNumber(value) {
    try {
      const locale = {
        bn: "bn-BD",
        en: "en-US",
        hi: "hi-IN"
      }[state.lang] || "bn-BD";

      return new Intl.NumberFormat(locale).format(Number(value));
    } catch (_) {
      return String(value);
    }
  }

  function setText(node, value) {
    if (node) node.textContent = value;
  }

  function getBookName(book) {
    return book?.names?.[state.lang] ||
      book?.names?.en ||
      book?.id ||
      text("title");
  }

  function normalize(value) {
    return String(value ?? "")
      .normalize("NFKC")
      .toLocaleLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function applySettings() {
    const settings = readSettings();

    const languageChanged = settings.lang !== state.lang;

    state.lang = settings.lang;
    state.dark = settings.dark;
    state.themeColor = settings.themeColor;

    document.documentElement.lang = state.lang;

    /*
     * theme.js owns body theme attributes and dark-mode class.
     * Do not override those values here.
     */

    setText(el.footerMessage, text("footer"));

    if (el.backBooks) {
      el.backBooks.setAttribute("aria-label", text("back"));
      el.backBooks.title = text("back");
    }

    if (el.headerAction) {
      el.headerAction.setAttribute(
        "aria-label",
        state.screen === "list" ? text("refresh") : text("title")
      );
      el.headerAction.title =
        state.screen === "list" ? text("refresh") : text("title");
    }

    if (el.searchToggle) {
      el.searchToggle.setAttribute("aria-label", text("searchLabel"));
      el.searchToggle.title = text("searchLabel");
    }

    if (el.hadithSearch) {
      el.hadithSearch.placeholder = text("search");
      el.hadithSearch.setAttribute("aria-label", text("searchLabel"));
    }

    if (el.clearSearch) {
      el.clearSearch.setAttribute("aria-label", text("clear"));
      el.clearSearch.title = text("clear");
    }

    setText(el.retryButton, text("retry"));

    if (state.screen === "books") {
      setText(el.pageTitle, text("title"));
      document.title = `${text("title")} | IBADAT`;
    } else if (state.book) {
      setText(el.pageTitle, getBookName(state.book));
      document.title = `${getBookName(state.book)} | IBADAT`;
      setText(el.listHeading, getBookName(state.book));
      setText(el.listSubtitle, text("subtitle"));
    }

    updateBookNames();

    if (languageChanged && state.book) {
      loadBook(state.book.id, { replaceHistory: true });
    } else {
      renderHadiths();
    }
  }

  function updateBookNames() {
    document.querySelectorAll("[data-name]").forEach((node) => {
      const book = BOOKS.find((item) => item.id === node.dataset.name);
      if (book) setText(node, getBookName(book));
    });
  }

  function showScreen(screen) {
    state.screen = screen === "list" ? "list" : "books";

    const isList = state.screen === "list";

    el.booksScreen.hidden = isList;
    el.listScreen.hidden = !isList;
    el.backBooks.hidden = !isList;

    el.app.dataset.screen = state.screen;

    if (isList && state.book) {
      setText(el.pageTitle, getBookName(state.book));
      setText(el.listHeading, getBookName(state.book));
      setText(el.listSubtitle, text("subtitle"));
      document.title = `${getBookName(state.book)} | IBADAT`;
    } else {
      setText(el.pageTitle, text("title"));
      document.title = `${text("title")} | IBADAT`;
    }

    if (el.headerAction) {
      el.headerAction.setAttribute(
        "aria-label",
        isList ? text("refresh") : text("title")
      );
      el.headerAction.title = isList ? text("refresh") : text("title");
    }
  }

  function setLoading(loading) {
    state.loading = loading;

    if (el.retryButton) {
      el.retryButton.disabled = loading;
    }

    if (el.headerAction) {
      el.headerAction.disabled = loading;
    }

    if (el.listStatus) {
      el.listStatus.setAttribute("aria-busy", String(loading));
    }
  }

  function showError(message) {
    el.listMessage.hidden = false;
    el.retryButton.hidden = false;
    el.hadithList.replaceChildren();
    el.listBottom.hidden = true;
    setText(el.messageText, message);
    setText(el.listStatus, "");
  }

  function clearError() {
    el.listMessage.hidden = true;
    setText(el.messageText, "");
  }

  async function fetchJson(url) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  function extractRows(data) {
    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.hadiths)) return data.hadiths;
    if (Array.isArray(data?.data)) return data.data;

    if (Array.isArray(data?.hadiths?.data)) {
      return data.hadiths.data;
    }

    return [];
  }

  function extractText(item) {
    if (typeof item === "string") return item.trim();

    const candidates = [
      item?.text,
      item?.arabic,
      item?.translation,
      item?.hadith
    ];

    for (const value of candidates) {
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }

    return "";
  }

  function extractNumber(item, index) {
    return item?.hadithnumber ??
      item?.hadithNumber ??
      item?.number ??
      item?.id ??
      index + 1;
  }

  function normalizeHadiths(data) {
    const rows = extractRows(data);

    return rows.map((item, index) => ({
      number: extractNumber(item, index),
      text: extractText(item)
    })).filter((item) => item.text);
  }

  function editionUrl(languageCode, slug) {
    return `${API_BASE}/editions/${languageCode}-${slug}.json`;
  }

  async function fetchEdition(languageCode, slug) {
    const key = `${languageCode}-${slug}`;

    if (!state.cache.has(key)) {
      state.cache.set(
        key,
        fetchJson(editionUrl(languageCode, slug)).catch((error) => {
          state.cache.delete(key);
          throw error;
        })
      );
    }

    return state.cache.get(key);
  }

  async function fetchBook(book, language, requestId) {
    const languageCode = (LANGUAGE_CODES[language] || LANGUAGE_CODES.bn)[0];

    const attempts = [
      async () => {
        const [arabicData, translatedData] = await Promise.all([
          fetchEdition("ara", book.api),
          fetchEdition(languageCode, book.api)
        ]);

        const arabicRows = normalizeHadiths(arabicData);
        const translatedRows = normalizeHadiths(translatedData);

        if (!arabicRows.length && !translatedRows.length) {
          throw new Error("No hadith entries were returned.");
        }

        const length = Math.max(arabicRows.length, translatedRows.length);
        const results = [];

        for (let index = 0; index < length; index++) {
          if (requestId !== state.requestId) return null;

          const arabic = arabicRows[index];
          const translation = translatedRows[index];

          results.push({
            number: arabic?.number ?? translation?.number ?? index + 1,
            arabic: arabic?.text || "",
            translation: translation?.text || ""
          });
        }

        return results;
      },

      async () => {
        /*
         * Fallback: attempt a single English edition when the
         * requested translation edition is unavailable.
         */
        const data = await fetchEdition("eng", book.api);
        const rows = normalizeHadiths(data);

        return rows.map((item) => ({
          number: item.number,
          arabic: "",
          translation: item.text
        }));
      }
    ];

    let lastError;

    for (const attempt of attempts) {
      if (requestId !== state.requestId) return null;

      try {
        const result = await attempt();

        if (requestId !== state.requestId) return null;

        if (Array.isArray(result) && result.length) {
          return result;
        }
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Hadith data unavailable.");
  }

  function makeElement(tag, className, value) {
    const node = document.createElement(tag);

    if (className) node.className = className;
    if (value != null) node.textContent = value;

    return node;
  }

  function createHadithCard(hadith) {
    const card = makeElement("article", "hadith-item");
    const top = makeElement("div", "hadith-item-top");

    top.append(
      makeElement(
        "span",
        "hadith-number",
        `${text("number")} ${formatNumber(hadith.number)}`
      ),
      makeElement("span", "hadith-language-label", text("translation"))
    );

    card.append(top);

    if (hadith.arabic) {
      const arabic = makeElement("p", "hadith-arabic", hadith.arabic);
      arabic.lang = "ar";
      arabic.dir = "rtl";
      card.append(arabic);
    }

    if (hadith.translation) {
      const translation = makeElement(
        "p",
        "hadith-translation",
        hadith.translation
      );

      translation.lang = state.lang;
      translation.dir = "auto";
      card.append(translation);
    }

    return card;
  }

  function renderHadiths() {
    if (!el.hadithList) return;

    const query = normalize(state.query);

    const filtered = state.hadiths.filter((hadith) => {
      if (!query) return true;

      return normalize(
        `${hadith.number} ${hadith.arabic} ${hadith.translation}`
      ).includes(query);
    });

    const fragment = document.createDocumentFragment();

    filtered.forEach((hadith) => {
      fragment.append(createHadithCard(hadith));
    });

    el.hadithList.replaceChildren(fragment);

    if (!state.loading && !el.listMessage.hidden && state.hadiths.length === 0) {
      el.listBottom.hidden = true;
      return;
    }

    if (!state.loading && filtered.length === 0) {
      el.listMessage.hidden = false;
      el.retryButton.hidden = state.hadiths.length > 0;

      setText(
        el.messageText,
        state.hadiths.length ? text("empty") : text("error")
      );
    } else if (filtered.length > 0) {
      el.listMessage.hidden = true;
    }

    el.listBottom.hidden = state.loading || filtered.length === 0;

    setText(
      el.loadedCount,
      text("loaded").replace("{count}", formatNumber(filtered.length))
    );
  }

  async function loadBook(bookId, options = {}) {
    const book = BOOKS.find((item) => item.id === bookId);
    if (!book) return;

    const requestId = ++state.requestId;

    state.book = book;
    state.hadiths = [];
    state.query = "";

    if (el.hadithSearch) el.hadithSearch.value = "";

    state.searchOpen = false;
    el.searchPanel.hidden = true;
    el.searchToggle.setAttribute("aria-expanded", "false");

    clearError();
    setLoading(true);

    el.hadithList.replaceChildren();
    el.listBottom.hidden = true;
    setText(el.listStatus, text("loading"));

    showScreen("list");

    if (!options.replaceHistory) {
      history.pushState(
        { hadithScreen: "list", bookId: book.id },
        "",
        `#hadith-${book.id}`
      );
    } else {
      history.replaceState(
        { hadithScreen: "list", bookId: book.id },
        "",
        `#hadith-${book.id}`
      );
    }

    try {
      const hadiths = await fetchBook(book, state.lang, requestId);

      if (requestId !== state.requestId || !hadiths) return;

      state.hadiths = hadiths;
      setText(el.listStatus, "");
      clearError();

      renderHadiths();
    } catch (error) {
      if (requestId !== state.requestId) return;

      console.error("IBADAT Hadith: Load failed.", error);
      showError(text("error"));
    } finally {
      if (requestId === state.requestId) {
        setLoading(false);
        renderHadiths();
      }
    }
  }

  function returnToBooks(options = {}) {
    state.requestId++;

    state.book = null;
    state.hadiths = [];
    state.query = "";
    state.searchOpen = false;

    el.hadithList.replaceChildren();
    el.searchPanel.hidden = true;
    el.searchToggle.setAttribute("aria-expanded", "false");

    if (el.hadithSearch) el.hadithSearch.value = "";

    clearError();
    setLoading(false);
    setText(el.listStatus, "");
    el.listBottom.hidden = true;

    showScreen("books");

    if (!options.replaceHistory) {
      history.pushState(
        { hadithScreen: "books" },
        "",
        "#hadith-books"
      );
    } else {
      history.replaceState(
        { hadithScreen: "books" },
        "",
        "#hadith-books"
      );
    }
  }

  function toggleSearch() {
    state.searchOpen = !state.searchOpen;
    el.searchPanel.hidden = !state.searchOpen;

    el.searchToggle.setAttribute(
      "aria-expanded",
      String(state.searchOpen)
    );

    if (state.searchOpen) {
      el.hadithSearch.focus();
    } else {
      state.query = "";
      el.hadithSearch.value = "";
      renderHadiths();
    }
  }

  function clearSearch() {
    state.query = "";
    el.hadithSearch.value = "";
    renderHadiths();
    el.hadithSearch.focus();
  }

  function refreshBook() {
    if (!state.book) return;

    state.cache.clear();
    loadBook(state.book.id, { replaceHistory: true });
  }

  function handleBackNavigation(event) {
    const entry = event.state;

    if (
      entry?.hadithScreen === "list" &&
      entry.bookId
    ) {
      loadBook(entry.bookId, { replaceHistory: true });
      return;
    }

    if (entry?.hadithScreen === "books") {
      returnToBooks({ replaceHistory: true });
      return;
    }

    const match = (location.hash || "").match(/^#hadith-([^&]+)$/);

    if (match && match[1] !== "books") {
      const bookId = decodeURIComponent(match[1]);

      if (BOOKS.some((book) => book.id === bookId)) {
        loadBook(bookId, { replaceHistory: true });
        return;
      }
    }

    returnToBooks({ replaceHistory: true });
  }

  function bindEvents() {
    el.booksGrid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-book]");
      if (card) loadBook(card.dataset.book);
    });

    el.backBooks.addEventListener("click", () => {
      returnToBooks();
    });

    el.headerAction.addEventListener("click", () => {
      if (state.screen === "list" && state.book) {
        refreshBook();
      }
    });

    el.searchToggle.addEventListener("click", toggleSearch);

    el.hadithSearch.addEventListener("input", (event) => {
      state.query = event.target.value || "";
      renderHadiths();
    });

    el.hadithSearch.addEventListener("keydown", (event) => {
      if (event.key === "Escape") clearSearch();
    });

    el.clearSearch.addEventListener("click", clearSearch);

    el.retryButton.addEventListener("click", () => {
      if (state.book) refreshBook();
    });

    window.addEventListener("popstate", handleBackNavigation);

    window.addEventListener("globalThemeChanged", (event) => {
      const next = event.detail || {};
      const settings = readSettings();

      const previousLanguage = state.lang;

      state.lang = ["bn", "en", "hi"].includes(next.lang)
        ? next.lang
        : settings.lang;

      state.dark = typeof next.dark === "boolean"
        ? next.dark
        : settings.dark;

      state.themeColor = ["classic", "royal", "rose", "pista"].includes(
        next.themeColor
      )
        ? next.themeColor
        : settings.themeColor;

      document.documentElement.lang = state.lang;

      if (previousLanguage !== state.lang && state.book) {
        loadBook(state.book.id, { replaceHistory: true });
      } else {
        applySettings();
      }
    });

    window.addEventListener("storage", (event) => {
      if (event.key === "appSettings") {
        applySettings();
      }
    });
  }

  function initialize() {
    const settings = readSettings();

    state.lang = settings.lang;
    state.dark = settings.dark;
    state.themeColor = settings.themeColor;

    document.documentElement.lang = state.lang;

    bindEvents();
    applySettings();
    showScreen("books");

    const match = (location.hash || "").match(/^#hadith-([^&]+)$/);

    if (match && match[1] !== "books") {
      const bookId = decodeURIComponent(match[1]);

      if (BOOKS.some((book) => book.id === bookId)) {
        loadBook(bookId, { replaceHistory: true });
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();
