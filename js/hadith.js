
"use strict";

(function () {
  const $ = (id) => document.getElementById(id);

  const el = {
    app: $("hadithApp"),
    pageTitle: $("pageTitle"),
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
      api: "nawawi",
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
      clear: "সার্চ মুছুন",
      englishFallback: "ইংরেজি অনুবাদ",
      bengaliFallback: "বাংলা অনুবাদ"
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
      clear: "Clear search",
      englishFallback: "English translation",
      bengaliFallback: "Bengali translation"
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
      clear: "खोज मिटाएँ",
      englishFallback: "अंग्रेज़ी अनुवाद",
      bengaliFallback: "बंगाली अनुवाद"
    }
  };

  const API_BASE =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";

  const LANGUAGE_CODES = {
    bn: "ben",
    en: "eng",
    hi: "hin"
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
      if (!parsed || typeof parsed !== "object") return fallback;

      const themes = ["classic", "royal", "rose", "pista"];

      const themeColor = themes.includes(parsed.themeColor)
        ? parsed.themeColor
        : themes.includes(parsed.theme)
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
        themeColor
      };
    } catch (error) {
      console.warn("IBADAT Hadith: Settings could not be read.", error);
      return fallback;
    }
  }

  function text(key) {
    const current = LANG[state.lang] || LANG.bn;
    return current[key] || LANG.bn[key] || key;
  }

  function formatNumber(value) {
    const locale = {
      bn: "bn-BD",
      en: "en-US",
      hi: "hi-IN"
    }[state.lang] || "bn-BD";

    try {
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

  function updateBookNames() {
    document.querySelectorAll("[data-name]").forEach((node) => {
      const book = BOOKS.find((item) => item.id === node.dataset.name);
      if (book) setText(node, getBookName(book));
    });
  }

  function applySettings() {
    const settings = readSettings();
    const previousLanguage = state.lang;

    state.lang = settings.lang;
    state.dark = settings.dark;
    state.themeColor = settings.themeColor;

    document.documentElement.lang = state.lang;

    setText(el.footerMessage, text("footer"));
    setText(el.retryButton, text("retry"));

    el.searchToggle.setAttribute("aria-label", text("searchLabel"));
    el.searchToggle.title = text("searchLabel");

    el.hadithSearch.placeholder = text("search");
    el.hadithSearch.setAttribute("aria-label", text("searchLabel"));

    el.clearSearch.setAttribute("aria-label", text("clear"));
    el.clearSearch.title = text("clear");

    updateBookNames();

    if (state.screen === "books") {
      setText(el.pageTitle, text("title"));
      document.title = `${text("title")} | IBADAT`;
    } else if (state.book) {
      setText(el.pageTitle, getBookName(state.book));
      setText(el.listHeading, getBookName(state.book));
      setText(el.listSubtitle, text("subtitle"));
      document.title = `${getBookName(state.book)} | IBADAT`;
    }

    if (previousLanguage !== state.lang && state.book) {
      loadBook(state.book.id, { replaceHistory: true });
    } else {
      renderHadiths();
    }
  }

  function showScreen(screen) {
    state.screen = screen === "list" ? "list" : "books";

    const isList = state.screen === "list";

    el.booksScreen.hidden = isList;
    el.listScreen.hidden = !isList;
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
  }

  function setLoading(loading) {
    state.loading = loading;
    el.retryButton.disabled = loading;
    el.listStatus.setAttribute("aria-busy", String(loading));
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
    if (Array.isArray(data?.hadiths?.data)) return data.hadiths.data;
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
    return extractRows(data)
      .map((item, index) => ({
        number: extractNumber(item, index),
        text: extractText(item)
      }))
      .filter((item) => item.text);
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

  async function tryEdition(languageCode, slug) {
    try {
      const data = await fetchEdition(languageCode, slug);
      const rows = normalizeHadiths(data);
      return rows.length ? rows : null;
    } catch (error) {
      console.warn(`Hadith edition unavailable: ${languageCode}-${slug}`, error);
      return null;
    }
  }

  async function fetchBook(book, language, requestId) {
    const requestedCode = LANGUAGE_CODES[language] || "ben";

    /*
     * Fetch Arabic and requested translation independently.
     * A missing translation must not prevent Arabic from loading.
     */
    const [arabicResult, translationResult] = await Promise.all([
      tryEdition("ara", book.api),
      tryEdition(requestedCode, book.api)
    ]);

    if (requestId !== state.requestId) return null;

    let translationRows = translationResult;
    let translationLanguage = language;

    if (!translationRows && requestedCode !== "eng") {
      translationRows = await tryEdition("eng", book.api);
      if (translationRows) translationLanguage = "en";
    }

    if (!translationRows && requestedCode !== "ben") {
      translationRows = await tryEdition("ben", book.api);
      if (translationRows) translationLanguage = "bn";
    }

    if (requestId !== state.requestId) return null;

    const arabicRows = arabicResult || [];
    const translatedRows = translationRows || [];

    if (!arabicRows.length && !translatedRows.length) {
      throw new Error("No available hadith edition was returned.");
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
        translation: translation?.text || "",
        translationLanguage
      });
    }

    return results;
  }

  function makeElement(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value != null) node.textContent = value;
    return node;
  }

  function getTranslationLabel(hadith) {
    if (hadith.translationLanguage === "en" && state.lang !== "en") {
      return text("englishFallback");
    }

    if (hadith.translationLanguage === "bn" && state.lang !== "bn") {
      return text("bengaliFallback");
    }

    return text("translation");
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
      makeElement(
        "span",
        "hadith-language-label",
        getTranslationLabel(hadith)
      )
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

      translation.lang = hadith.translationLanguage || state.lang;
      translation.dir = "auto";
      card.append(translation);
    }

    return card;
  }

  function renderHadiths() {
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

    if (state.loading) {
      el.listMessage.hidden = true;
      el.listBottom.hidden = true;
      return;
    }

    if (!state.hadiths.length) {
      el.listBottom.hidden = true;
      return;
    }

    if (!filtered.length) {
      el.listMessage.hidden = false;
      el.retryButton.hidden = true;
      setText(el.messageText, text("empty"));
    } else {
      el.listMessage.hidden = true;
    }

    el.listBottom.hidden = filtered.length === 0;

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
    state.searchOpen = false;

    el.hadithSearch.value = "";
    el.searchPanel.hidden = true;
    el.searchToggle.setAttribute("aria-expanded", "false");

    clearError();
    setLoading(true);
    el.hadithList.replaceChildren();
    el.listBottom.hidden = true;
    setText(el.listStatus, text("loading"));

    showScreen("list");

    const historyState = {
      hadithScreen: "list",
      bookId: book.id
    };

    if (options.replaceHistory) {
      history.replaceState(historyState, "", `#hadith-${book.id}`);
    } else {
      history.pushState(historyState, "", `#hadith-${book.id}`);
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
    el.hadithSearch.value = "";

    clearError();
    setLoading(false);
    setText(el.listStatus, "");
    el.listBottom.hidden = true;

    showScreen("books");

    const historyState = { hadithScreen: "books" };

    if (options.replaceHistory) {
      history.replaceState(historyState, "", "#hadith-books");
    } else {
      history.pushState(historyState, "", "#hadith-books");
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

  function retryBook() {
    if (state.book) {
      loadBook(state.book.id, { replaceHistory: true });
    }
  }

  function handleBackNavigation(event) {
    const entry = event.state;

    if (entry?.hadithScreen === "list" && entry.bookId) {
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

    el.searchToggle.addEventListener("click", toggleSearch);

    el.hadithSearch.addEventListener("input", (event) => {
      state.query = event.target.value || "";
      renderHadiths();
    });

    el.hadithSearch.addEventListener("keydown", (event) => {
      if (event.key === "Escape") clearSearch();
    });

    el.clearSearch.addEventListener("click", clearSearch);
    el.retryButton.addEventListener("click", retryBook);

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
