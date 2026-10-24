
(() => {
  "use strict";

  const API_BASE = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";

  const BOOKS = [
    { id: "bukhari", names: { bn: "সহিহ বুখারি", en: "Sahih al-Bukhari", hi: "सहीह अल-बुखारी" }, icon: "ب", description: { bn: "ইমাম বুখারির সংকলন", en: "Collection of Imam Bukhari", hi: "इमाम बुखारी का संग्रह" } },
    { id: "muslim", names: { bn: "সহিহ মুসলিম", en: "Sahih Muslim", hi: "सहीह मुस्लिम" }, icon: "م", description: { bn: "ইমাম মুসলিমের সংকলন", en: "Collection of Imam Muslim", hi: "इमाम मुस्लिम का संग्रह" } },
    { id: "abudawud", names: { bn: "সুনানে আবু দাউদ", en: "Sunan Abi Dawud", hi: "सुनन अबू दाऊद" }, icon: "د", description: { bn: "আবু দাউদের সংকলন", en: "Collection of Abu Dawud", hi: "अबू दाऊद का संग्रह" } },
    { id: "tirmidhi", names: { bn: "জামে আত-তিরমিজি", en: "Jami at-Tirmidhi", hi: "जामे अत-तिर्मिज़ी" }, icon: "ت", description: { bn: "ইমাম তিরমিজির সংকলন", en: "Collection of Imam Tirmidhi", hi: "इमाम तिर्मिज़ी का संग्रह" } },
    { id: "nasai", names: { bn: "সুনানে নাসাঈ", en: "Sunan an-Nasa'i", hi: "सुनन नसाई" }, icon: "ن", description: { bn: "ইমাম নাসাঈর সংকলন", en: "Collection of Imam Nasa'i", hi: "इमाम नसाई का संग्रह" } },
    { id: "ibnmajah", names: { bn: "সুনানে ইবনে মাজাহ", en: "Sunan Ibn Majah", hi: "सुनन इब्न माजा" }, icon: "ج", description: { bn: "ইবনে মাজাহর সংকলন", en: "Collection of Ibn Majah", hi: "इब्न माजा का संग्रह" } },
    { id: "malik", names: { bn: "মুয়াত্তা ইমাম মালিক", en: "Muwatta Malik", hi: "मुवत्ता इमाम मालिक" }, icon: "م", description: { bn: "ইমাম মালিকের সংকলন", en: "Collection of Imam Malik", hi: "इमाम मालिक का संग्रह" } },
    { id: "nawawi", names: { bn: "ইমাম নববির ৪০ হাদিস", en: "Forty Hadith of Nawawi", hi: "इमाम नववी की चालीस हदीसें" }, icon: "أ", description: { bn: "নির্বাচিত চল্লিশটি হাদিস", en: "Forty selected Hadith", hi: "चालीस चयनित हदीसें" } }
  ];

  const TEXT = {
    bn: {
      title: "হাদিস সংকলন", subtitle: "হাদিস পড়ুন, শিক্ষা গ্রহণ করুন",
      books: "হাদিসের বই", loadingBooks: "হাদিসের বই লোড হচ্ছে...",
      loadingHadith: "হাদিস লোড হচ্ছে...",
      loadBooksError: "হাদিসের বই লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      loadHadithError: "হাদিস লোড করা যায়নি। আবার চেষ্টা করুন।",
      retry: "আবার চেষ্টা করুন", search: "হাদিস খুঁজুন...",
      searchLabel: "হাদিস খুঁজুন", noResults: "কোনো হাদিস পাওয়া যায়নি।",
      arabic: "আরবি", translation: "অনুবাদ", reference: "রেফারেন্স",
      detail: "হাদিসের বিবরণ", hadithNumber: "হাদিস নম্বর",
      previous: "← আগের", next: "পরের →",
      footer: "পড়ুন • চিন্তা করুন • আমল করুন",
      noTranslation: "এই ভাষায় অনুবাদ পাওয়া যায়নি।",
      noArabic: "আরবি পাঠ পাওয়া যায়নি.", noReference: "রেফারেন্স পাওয়া যায়নি।",
      untitled: "হাদিস", item: "হাদিস"
    },
    en: {
      title: "Hadith Collection", subtitle: "Read Hadith and learn from its teachings",
      books: "Hadith Books", loadingBooks: "Loading Hadith collections...",
      loadingHadith: "Loading Hadith...",
      loadBooksError: "Could not load Hadith collections. Check your internet connection and try again.",
      loadHadithError: "Could not load Hadith. Please try again.",
      retry: "Try Again", search: "Search Hadith...",
      searchLabel: "Search Hadith", noResults: "No Hadith found.",
      arabic: "Arabic", translation: "Translation", reference: "Reference",
      detail: "Hadith Details", hadithNumber: "Hadith No.",
      previous: "← Previous", next: "Next →",
      footer: "Read • Reflect • Practice",
      noTranslation: "Translation is not available in this language.",
      noArabic: "Arabic text is unavailable.", noReference: "Reference is unavailable.",
      untitled: "Hadith", item: "Hadith"
    },
    hi: {
      title: "हदीस संग्रह", subtitle: "हदीस पढ़ें और उससे शिक्षा प्राप्त करें",
      books: "हदीस की पुस्तकें", loadingBooks: "हदीस संग्रह लोड हो रहे हैं...",
      loadingHadith: "हदीस लोड हो रही हैं...",
      loadBooksError: "हदीस संग्रह लोड नहीं हो सके। इंटरनेट कनेक्शन जाँचें और फिर प्रयास करें।",
      loadHadithError: "हदीस लोड नहीं हो सकीं। कृपया फिर प्रयास करें।",
      retry: "फिर प्रयास करें", search: "हदीस खोजें...",
      searchLabel: "हदीस खोजें", noResults: "कोई हदीस नहीं मिली।",
      arabic: "अरबी", translation: "अनुवाद", reference: "संदर्भ",
      detail: "हदीस का विवरण", hadithNumber: "हदीस संख्या",
      previous: "← पिछली", next: "अगली →",
      footer: "पढ़ें • विचार करें • अमल करें",
      noTranslation: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      noArabic: "अरबी पाठ उपलब्ध नहीं है।", noReference: "संदर्भ उपलब्ध नहीं है।",
      untitled: "हदीस", item: "हदीस"
    }
  };

  const state = {
    lang: "bn",
    dark: false,
    editions: [],
    currentBook: null,
    arabicHadith: [],
    translatedHadith: [],
    displayedHadith: [],
    currentHadithIndex: 0,
    searchQuery: "",
    currentScreen: "books",
    requestId: 0,
    booksRequestId: 0,
    loadingBooks: false,
    loadingHadith: false
  };

  const $ = id => document.getElementById(id);

  function readSettings() {
    let settings = {};

    ["appSettings", "ibadatSettings"].forEach(key => {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          const parsed = JSON.parse(value);
          if (parsed && typeof parsed === "object") {
            settings = { ...settings, ...parsed };
          }
        }
      } catch (_) {}
    });

    return settings;
  }

  function normalizeLanguage(value) {
    const language = String(value || "").toLowerCase().trim();
    if (["en", "english", "eng"].includes(language)) return "en";
    if (["hi", "hindi", "hin"].includes(language)) return "hi";
    return "bn";
  }

  function applySettings() {
    const settings = readSettings();

    state.lang = normalizeLanguage(
      settings.lang ||
      settings.language ||
      settings.selectedLanguage ||
      settings.currentLanguage ||
      "bn"
    );

    state.dark = Boolean(
      settings.dark ??
      settings.darkMode ??
      settings.isDarkMode ??
      false
    );

    document.documentElement.lang = state.lang;
    document.body.classList.toggle("dark-mode", state.dark);

    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.content = state.dark ? "#081b13" : "#123d2c";
  }

  function t(key) {
    return TEXT[state.lang]?.[key] || TEXT.bn[key] || key;
  }

  function setText(id, value) {
    const element = $(id);
    if (element) element.textContent = value ?? "";
  }

  function show(element, visible) {
    if (element) element.hidden = !visible;
  }

  function formatNumber(value) {
    const input = String(value ?? "");
    if (state.lang === "en") return input;

    const digits = state.lang === "hi"
      ? "०१२३४५६७८९"
      : "০১২৩৪৫৬৭৮৯";

    return input.replace(/\d/g, digit => digits[Number(digit)]);
  }

  function safeText(value) {
    return typeof value === "string" || typeof value === "number"
      ? String(value)
      : "";
  }

  function getBookName(book) {
    return book?.names?.[state.lang] || book?.names?.en || "";
  }

  function updateStaticText() {
    setText("booksHeading", t("books"));
    setText("arabicHeading", t("arabic"));
    setText("translationHeading", t("translation"));
    setText("referenceHeading", t("reference"));
    setText("footerBrand", "IBADAT");
    setText("footerText", t("footer"));
    setText("retryButton", t("retry"));
    setText("listRetryButton", t("retry"));
    setText("previousHadithButton", t("previous"));
    setText("nextHadithButton", t("next"));

    const search = $("hadithSearch");
    if (search) {
      search.placeholder = t("search");
      search.setAttribute("aria-label", t("searchLabel"));
    }

    if (state.currentScreen === "books") {
      setText("pageTitle", t("title"));
      setText("pageSubtitle", t("subtitle"));
    } else if (state.currentBook) {
      setText("pageTitle", getBookName(state.currentBook));
      setText("pageSubtitle", state.currentScreen === "detail" ? t("detail") : t("books"));
    }
  }

  function showScreen(name, pushHistory = true) {
    state.currentScreen = name;

    const screens = {
      books: $("booksScreen"),
      list: $("listScreen"),
      detail: $("detailScreen")
    };

    Object.entries(screens).forEach(([key, element]) => {
      if (!element) return;
      const active = key === name;
      element.hidden = !active;
      element.classList.toggle("active", active);
    });

    if (pushHistory) {
      try {
        history.pushState({ hadithScreen: name }, "");
      } catch (_) {}
    }

    updateStaticText();

    if (name === "books") renderBooks();
    if (name === "list") renderHadithList();
    if (name === "detail") renderHadithDetail();
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  async function fetchJson(url) {
    const response = await fetch(url, {
      cache: "no-cache",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return response.json();
  }

  /*
   * API data normalizer:
   * API response can be a direct array or an object containing data/metadata.
   */
  function normalizeArray(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.hadiths)) return data.hadiths;
    if (Array.isArray(data?.books)) return data.books;
    return [];
  }

  function normalizeEdition(edition) {
    return {
      ...edition,
      name: String(edition?.name || edition?.id || ""),
      collection: String(
        edition?.collection ||
        edition?.collectionName ||
        edition?.book ||
        ""
      ).toLowerCase(),
      language: String(
        edition?.language ||
        edition?.lang ||
        ""
      ).toLowerCase()
    };
  }

  function getEditionList(data) {
    const raw = normalizeArray(data);
    return raw
      .filter(item => item && typeof item === "object")
      .map(normalizeEdition);
  }

  function editionMatchesBook(edition, bookId) {
    const collection = String(edition.collection || "").toLowerCase();
    const name = String(edition.name || "").toLowerCase();
    const book = String(bookId).toLowerCase();

    return collection === book ||
      collection.endsWith(`-${book}`) ||
      collection.endsWith(`_${book}`) ||
      name.includes(`-${book}-`) ||
      name.endsWith(`-${book}`);
  }

  function editionLanguage(edition) {
    const name = String(edition.name || "").toLowerCase();
    const language = String(edition.language || "").toLowerCase();

    if (language === "ara" || name.startsWith("ara-") || name.startsWith("ara_")) return "ara";
    if (language === "ben" || language === "bn" || name.startsWith("ben-") || name.startsWith("ben_")) return "bn";
    if (language === "eng" || language === "en" || name.startsWith("eng-") || name.startsWith("eng_")) return "en";
    if (language === "hin" || language === "hi" || name.startsWith("hin-") || name.startsWith("hin_")) return "hi";

    return language;
  }

  async function loadEditions() {
    const requestId = ++state.booksRequestId;
    state.loadingBooks = true;

    show($("loadingMessage"), true);
    show($("errorMessage"), false);
    setText("loadingMessage", t("loadingBooks"));

    try {
      const data = await fetchJson(`${API_BASE}/editions.json`);
      const editions = getEditionList(data);

      if (requestId !== state.booksRequestId) return;

      if (!editions.length) {
        throw new Error("The editions response did not contain an edition list.");
      }

      state.editions = editions;
      show($("loadingMessage"), false);
      show($("errorMessage"), false);
      renderBooks();
    } catch (error) {
      if (requestId !== state.booksRequestId) return;

      console.error("Unable to load Hadith editions:", error);

      /*
       * Books are local UI choices, not API results.
       * Keep the book grid visible even when the edition index is unavailable.
       */
      state.editions = [];
      show($("loadingMessage"), false);
      show($("errorMessage"), false);
      renderBooks();
    } finally {
      if (requestId === state.booksRequestId) {
        state.loadingBooks = false;
      }
    }
  }

  function renderBooks() {
    const grid = $("bookGrid");
    if (!grid) return;

    grid.replaceChildren();
    setText("bookCount", formatNumber(BOOKS.length));

    BOOKS.forEach(book => {
      const button = makeElement("button", "book-card");
      button.type = "button";
      button.setAttribute("aria-label", getBookName(book));

      const icon = makeElement("span", "book-icon", book.icon);
      icon.setAttribute("aria-hidden", "true");

      const name = makeElement("span", "book-name", getBookName(book));
      const description = makeElement(
        "span",
        "book-description",
        book.description[state.lang] || book.description.en
      );

      button.append(icon, name, description);
      button.addEventListener("click", () => openBook(book));
      grid.appendChild(button);
    });
  }

  function findEdition(bookId, language) {
    const matches = state.editions.filter(edition =>
      editionMatchesBook(edition, bookId)
    );

    return matches.find(edition => editionLanguage(edition) === language) || null;
  }

  function getArabicEdition(book) {
    return findEdition(book.id, "ara");
  }

  function getTranslationEdition(book) {
    const settings = readSettings();
    const language = normalizeLanguage(
      settings.translationLanguage ||
      settings.translationLang ||
      state.lang
    );

    return findEdition(book.id, language);
  }

  function getHadithNumber(item, index) {
    return item?.hadithnumber ??
      item?.hadithNumber ??
      item?.number ??
      item?.id ??
      index + 1;
  }

  function getHadithText(item) {
    if (!item || typeof item !== "object") return "";

    return safeText(
      item.text ??
      item.hadith ??
      item.arab ??
      item.arabic ??
      item.translation ??
      item.content ??
      ""
    );
  }

  function getHadithArray(data) {
    const direct = normalizeArray(data);
    if (direct.length) return direct;

    if (data?.metadata && Array.isArray(data?.hadiths)) {
      return data.hadiths;
    }

    return [];
  }

  function findMatchingTranslation(number) {
    const target = String(number);

    return state.translatedHadith.find((item, index) =>
      String(getHadithNumber(item, index)) === target
    ) || null;
  }

  function buildHadithItems() {
    const arabic = state.arabicHadith;
    const translated = state.translatedHadith;
    const base = arabic.length ? arabic : translated;

    return base.map((item, index) => {
      const number = getHadithNumber(item, index);
      const translationItem = findMatchingTranslation(number);

      return {
        number,
        arabic: arabic.length ? getHadithText(item) : "",
        translation: translationItem
          ? getHadithText(translationItem)
          : (!arabic.length ? getHadithText(item) : ""),
        reference: safeText(
          item.reference ??
          item.referenceText ??
          translationItem?.reference ??
          translationItem?.referenceText ??
          ""
        )
      };
    });
  }

  async function openBook(book) {
    state.currentBook = book;
    state.searchQuery = "";

    const search = $("hadithSearch");
    if (search) search.value = "";

    showScreen("list");
    await loadHadith(book);
  }

  async function loadHadith(book) {
    const requestId = ++state.requestId;

    state.loadingHadith = true;
    state.arabicHadith = [];
    state.translatedHadith = [];
    state.displayedHadith = [];

    show($("listLoadingMessage"), true);
    setText("listLoadingMessage", t("loadingHadith"));
    show($("listErrorMessage"), false);
    show($("emptySearchMessage"), false);

    $("hadithList")?.replaceChildren();

    try {
      /*
       * If the edition index has not loaded, retry it before resolving URLs.
       */
      if (!state.editions.length) {
        const editionData = await fetchJson(`${API_BASE}/editions.json`);
        state.editions = getEditionList(editionData);
      }

      if (!state.editions.length) {
        throw new Error("No editions available from the API.");
      }

      const arabicEdition = getArabicEdition(book);
      const translationEdition = getTranslationEdition(book);

      if (!arabicEdition && !translationEdition) {
        throw new Error(`No Arabic or translation edition found for ${book.id}.`);
      }

      const [arabicData, translationData] = await Promise.all([
        arabicEdition
          ? fetchJson(`${API_BASE}/editions/${encodeURIComponent(arabicEdition.name)}.json`)
          : Promise.resolve(null),
        translationEdition
          ? fetchJson(`${API_BASE}/editions/${encodeURIComponent(translationEdition.name)}.json`)
          : Promise.resolve(null)
      ]);

      if (requestId !== state.requestId) return;

      state.arabicHadith = getHadithArray(arabicData);
      state.translatedHadith = getHadithArray(translationData);

      if (!state.arabicHadith.length && !state.translatedHadith.length) {
        throw new Error("The selected edition contains no Hadith entries.");
      }

      state.displayedHadith = buildHadithItems();
      state.currentHadithIndex = 0;

      show($("listLoadingMessage"), false);
      show($("listErrorMessage"), false);
      renderHadithList();
    } catch (error) {
      if (requestId !== state.requestId) return;

      console.error("Hadith data loading error:", error);
      show($("listLoadingMessage"), false);
      show($("listErrorMessage"), true);
      setText("listErrorText", t("loadHadithError"));
    } finally {
      if (requestId === state.requestId) {
        state.loadingHadith = false;
      }
    }
  }

  function renderHadithList() {
    const list = $("hadithList");
    if (!list) return;

    list.replaceChildren();

    const query = state.searchQuery.trim().toLocaleLowerCase();
    const results = state.displayedHadith
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
        if (!query) return true;

        return [
          item.number,
          item.arabic,
          item.translation,
          item.reference
        ].some(value =>
          String(value || "").toLocaleLowerCase().includes(query)
        );
      });

    show(
      $("emptySearchMessage"),
      results.length === 0 && !state.loadingHadith
    );

    results.forEach(({ item, index }) => {
      const button = makeElement("button", "hadith-item");
      button.type = "button";

      const number = makeElement(
        "span",
        "item-number",
        `${t("hadithNumber")} ${formatNumber(item.number)}`
      );

      const heading = makeElement(
        "h3",
        "",
        item.translation || item.arabic || `${t("item")} ${formatNumber(item.number)}`
      );

      const previewText = item.translation || item.arabic || "";
      const preview = makeElement(
        "p",
        "",
        previewText.length > 170 ? `${previewText.slice(0, 170)}…` : previewText
      );

      button.append(number, heading, preview);
      button.addEventListener("click", () => {
        state.currentHadithIndex = index;
        showScreen("detail");
      });

      list.appendChild(button);
    });
  }

  function renderHadithDetail() {
    const item = state.displayedHadith[state.currentHadithIndex];

    if (!item) {
      setText("detailHeading", t("detail"));
      setText("arabicText", t("noArabic"));
      setText("translationText", t("noTranslation"));
      setText("referenceText", t("noReference"));
      return;
    }

    setText("detailBookName", getBookName(state.currentBook));
    setText("detailHeading", t("detail"));
    setText(
      "detailHadithNumber",
      `${t("hadithNumber")} ${formatNumber(item.number)}`
    );
    setText("arabicText", item.arabic || t("noArabic"));
    setText("translationText", item.translation || t("noTranslation"));
    setText("referenceText", item.reference || t("noReference"));

    const previous = $("previousHadithButton");
    const next = $("nextHadithButton");

    if (previous) previous.disabled = state.currentHadithIndex <= 0;
    if (next) {
      next.disabled = state.currentHadithIndex >= state.displayedHadith.length - 1;
    }

    const detailCard = document.querySelector(".hadith-detail-card");
    if (detailCard) detailCard.scrollTop = 0;
  }

  function moveHadith(direction) {
    const index = state.currentHadithIndex + direction;
    if (index < 0 || index >= state.displayedHadith.length) return;

    state.currentHadithIndex = index;
    renderHadithDetail();
  }

  function refreshSettings() {
    applySettings();
    updateStaticText();
    renderBooks();
    renderHadithList();

    if (state.currentScreen === "detail") renderHadithDetail();
  }

  function bindEvents() {
    $("retryButton")?.addEventListener("click", loadEditions);
    $("listRetryButton")?.addEventListener("click", () => {
      if (state.currentBook) loadHadith(state.currentBook);
    });

    $("previousHadithButton")?.addEventListener("click", () => moveHadith(-1));
    $("nextHadithButton")?.addEventListener("click", () => moveHadith(1));

    $("hadithSearch")?.addEventListener("input", event => {
      state.searchQuery = event.target.value || "";
      renderHadithList();
    });

    window.addEventListener("storage", event => {
      if (
        !event.key ||
        event.key === "appSettings" ||
        event.key === "ibadatSettings"
      ) {
        refreshSettings();
      }
    });

    window.addEventListener("pageshow", refreshSettings);

    window.addEventListener("popstate", () => {
      if (state.currentScreen === "detail") {
        showScreen("list", false);
      } else if (state.currentScreen === "list") {
        showScreen("books", false);
      }
    });

    document.addEventListener("backbutton", event => {
      event.preventDefault?.();

      if (state.currentScreen === "detail") {
        showScreen("list", false);
      } else if (state.currentScreen === "list") {
        showScreen("books", false);
      }
    });
  }

  function init() {
    applySettings();
    bindEvents();

    try {
      history.replaceState({ hadithScreen: "books" }, "");
    } catch (_) {}

    updateStaticText();
    renderBooks();
    loadEditions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
