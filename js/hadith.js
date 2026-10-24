
(() => {
  "use strict";

  const API_BASE =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";

  const BOOKS = [
    {
      id: "bukhari",
      names: {
        bn: "সহিহ বুখারি",
        en: "Sahih al-Bukhari",
        hi: "सहीह अल-बुखारी"
      },
      icon: "ب",
      description: {
        bn: "ইমাম বুখারির সংকলন",
        en: "Collection of Imam Bukhari",
        hi: "इमाम बुखारी का संग्रह"
      }
    },
    {
      id: "muslim",
      names: {
        bn: "সহিহ মুসলিম",
        en: "Sahih Muslim",
        hi: "सहीह मुस्लिम"
      },
      icon: "م",
      description: {
        bn: "ইমাম মুসলিমের সংকলন",
        en: "Collection of Imam Muslim",
        hi: "इमाम मुस्लिम का संग्रह"
      }
    },
    {
      id: "abudawud",
      names: {
        bn: "সুনানে আবু দাউদ",
        en: "Sunan Abi Dawud",
        hi: "सुनन अबू दाऊद"
      },
      icon: "د",
      description: {
        bn: "আবু দাউদের সংকলন",
        en: "Collection of Abu Dawud",
        hi: "अबू दाऊद का संग्रह"
      }
    },
    {
      id: "tirmidhi",
      names: {
        bn: "জামে আত-তিরমিজি",
        en: "Jami at-Tirmidhi",
        hi: "जामे अत-तिर्मिज़ी"
      },
      icon: "ت",
      description: {
        bn: "ইমাম তিরমিজির সংকলন",
        en: "Collection of Imam Tirmidhi",
        hi: "इमाम तिर्मिज़ी का संग्रह"
      }
    },
    {
      id: "nasai",
      names: {
        bn: "সুনানে নাসাঈ",
        en: "Sunan an-Nasa'i",
        hi: "सुनन नसाई"
      },
      icon: "ن",
      description: {
        bn: "ইমাম নাসাঈর সংকলন",
        en: "Collection of Imam Nasa'i",
        hi: "इमाम नसाई का संग्रह"
      }
    },
    {
      id: "ibnmajah",
      names: {
        bn: "সুনানে ইবনে মাজাহ",
        en: "Sunan Ibn Majah",
        hi: "सुनन इब्न माजा"
      },
      icon: "ج",
      description: {
        bn: "ইবনে মাজাহর সংকলন",
        en: "Collection of Ibn Majah",
        hi: "इब्न माजा का संग्रह"
      }
    },
    {
      id: "malik",
      names: {
        bn: "মুয়াত্তা ইমাম মালিক",
        en: "Muwatta Malik",
        hi: "मुवत्ता इमाम मालिक"
      },
      icon: "م",
      description: {
        bn: "ইমাম মালিকের সংকলন",
        en: "Collection of Imam Malik",
        hi: "इमाम मालिक का संग्रह"
      }
    },
    {
      id: "nawawi",
      names: {
        bn: "ইমাম নববির ৪০ হাদিস",
        en: "Forty Hadith of Nawawi",
        hi: "इमाम नववी की चालीस हदीसें"
      },
      icon: "أ",
      description: {
        bn: "নির্বাচিত চল্লিশটি হাদিস",
        en: "Forty selected Hadith",
        hi: "चालीस चयनित हदीसें"
      }
    }
  ];

  const TEXT = {
    bn: {
      title: "হাদিস সংকলন",
      subtitle: "হাদিস পড়ুন, শিক্ষা গ্রহণ করুন",
      books: "হাদিসের বই",
      loadingBooks: "হাদিসের বই লোড হচ্ছে...",
      loadingHadith: "হাদিস লোড হচ্ছে...",
      loadBooksError: "হাদিসের বই লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      loadHadithError: "হাদিস লোড করা যায়নি। আবার চেষ্টা করুন।",
      retry: "আবার চেষ্টা করুন",
      search: "হাদিস খুঁজুন...",
      searchLabel: "হাদিস খুঁজুন",
      noResults: "কোনো হাদিস পাওয়া যায়নি।",
      arabic: "আরবি",
      translation: "অনুবাদ",
      reference: "রেফারেন্স",
      detail: "হাদিসের বিবরণ",
      hadithNumber: "হাদিস নম্বর",
      previous: "← আগের",
      next: "পরের →",
      footer: "পড়ুন • চিন্তা করুন • আমল করুন",
      noTranslation: "এই ভাষায় অনুবাদ পাওয়া যায়নি।",
      noArabic: "আরবি পাঠ পাওয়া যায়নি।",
      noReference: "রেফারেন্স পাওয়া যায়নি।",
      first: "প্রথম হাদিসে পৌঁছে গেছেন।",
      last: "শেষ হাদিসে পৌঁছে গেছেন।",
      untitled: "হাদিস",
      item: "হাদিস",
      network: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
    },
    en: {
      title: "Hadith Collection",
      subtitle: "Read Hadith and learn from its teachings",
      books: "Hadith Books",
      loadingBooks: "Loading Hadith collections...",
      loadingHadith: "Loading Hadith...",
      loadBooksError: "Could not load Hadith collections. Check your internet connection and try again.",
      loadHadithError: "Could not load Hadith. Please try again.",
      retry: "Try Again",
      search: "Search Hadith...",
      searchLabel: "Search Hadith",
      noResults: "No Hadith found.",
      arabic: "Arabic",
      translation: "Translation",
      reference: "Reference",
      detail: "Hadith Details",
      hadithNumber: "Hadith No.",
      previous: "← Previous",
      next: "Next →",
      footer: "Read • Reflect • Practice",
      noTranslation: "Translation is not available in this language.",
      noArabic: "Arabic text is unavailable.",
      noReference: "Reference is unavailable.",
      first: "You are at the first Hadith.",
      last: "You are at the last Hadith.",
      untitled: "Hadith",
      item: "Hadith",
      network: "Check your internet connection and try again."
    },
    hi: {
      title: "हदीस संग्रह",
      subtitle: "हदीस पढ़ें और उससे शिक्षा प्राप्त करें",
      books: "हदीस की पुस्तकें",
      loadingBooks: "हदीस संग्रह लोड हो रहे हैं...",
      loadingHadith: "हदीस लोड हो रही हैं...",
      loadBooksError: "हदीस संग्रह लोड नहीं हो सके। इंटरनेट कनेक्शन जाँचें और फिर प्रयास करें।",
      loadHadithError: "हदीस लोड नहीं हो सकीं। कृपया फिर प्रयास करें।",
      retry: "फिर प्रयास करें",
      search: "हदीस खोजें...",
      searchLabel: "हदीस खोजें",
      noResults: "कोई हदीस नहीं मिली।",
      arabic: "अरबी",
      translation: "अनुवाद",
      reference: "संदर्भ",
      detail: "हदीस का विवरण",
      hadithNumber: "हदीस संख्या",
      previous: "← पिछली",
      next: "अगली →",
      footer: "पढ़ें • विचार करें • अमल करें",
      noTranslation: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      noArabic: "अरबी पाठ उपलब्ध नहीं है।",
      noReference: "संदर्भ उपलब्ध नहीं है।",
      first: "आप पहली हदीस पर हैं।",
      last: "आप आखिरी हदीस पर हैं।",
      untitled: "हदीस",
      item: "हदीस",
      network: "इंटरनेट कनेक्शन जाँचें और फिर प्रयास करें।"
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
    loadingBooks: false,
    loadingHadith: false
  };

  const $ = (id) => document.getElementById(id);

  function readSettings() {
    let result = {};

    for (const key of ["appSettings", "ibadatSettings"]) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            result = { ...result, ...parsed };
          }
        }
      } catch (_) {
        // Invalid settings are ignored.
      }
    }

    return result;
  }

  function normalizeLanguage(value) {
    const lang = String(value || "").toLowerCase().trim();

    if (["en", "english", "eng"].includes(lang)) return "en";
    if (["hi", "hindi", "hin"].includes(lang)) return "hi";
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

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = state.dark ? "#081b13" : "#123d2c";
    }
  }

  function t(key) {
    return TEXT[state.lang][key] || TEXT.bn[key] || key;
  }

  function setText(id, value) {
    const element = $(id);
    if (element) element.textContent = value;
  }

  function show(element, visible) {
    if (element) element.hidden = !visible;
  }

  function formatNumber(value) {
    const stringValue = String(value ?? "");

    if (state.lang === "en") return stringValue;

    const digits = state.lang === "hi"
      ? "०१२३४५६७८९"
      : "০১২৩৪৫৬৭৮৯";

    return stringValue.replace(/\d/g, digit => digits[Number(digit)]);
  }

  function safeText(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    return "";
  }

  function getBookName(book) {
    return book?.names?.[state.lang] || book?.names?.en || "";
  }

  function updateStaticText() {
    setText("pageTitle", t("title"));
    setText("pageSubtitle", t("subtitle"));
    setText("booksHeading", t("books"));
    setText("arabicHeading", t("arabic"));
    setText("translationHeading", t("translation"));
    setText("referenceHeading", t("reference"));
    setText("footerText", t("footer"));
    setText("footerBrand", "IBADAT");

    const search = $("hadithSearch");
    if (search) {
      search.placeholder = t("search");
      search.setAttribute("aria-label", t("searchLabel"));
    }

    setText("previousHadithButton", t("previous"));
    setText("nextHadithButton", t("next"));
    setText("retryButton", t("retry"));
    setText("listRetryButton", t("retry"));

    if (state.currentScreen === "books") {
      setText("pageTitle", t("title"));
      setText("pageSubtitle", t("subtitle"));
    } else if (state.currentScreen === "list" && state.currentBook) {
      setText("pageTitle", getBookName(state.currentBook));
      setText("pageSubtitle", t("books"));
    } else if (state.currentScreen === "detail" && state.currentBook) {
      setText("pageTitle", getBookName(state.currentBook));
      setText("pageSubtitle", t("detail"));
    }
  }

  function showScreen(name, addHistory = true) {
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

    if (addHistory) {
      try {
        history.pushState({ hadithScreen: name }, "");
      } catch (_) {
        // Navigation still works without History API.
      }
    }

    updateStaticText();

    if (name === "books") {
      renderBooks();
    } else if (name === "list") {
      renderHadithList();
    } else if (name === "detail") {
      renderHadithDetail();
    }
  }

  function goBack() {
    if (state.currentScreen === "detail") {
      showScreen("list", false);
      return;
    }

    if (state.currentScreen === "list") {
      showScreen("books", false);
      return;
    }

    // At the first screen, allow the normal browser/app back behavior.
    if (history.state?.hadithScreen) {
      history.back();
    }
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

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  function setBooksLoading(loading) {
    state.loadingBooks = loading;

    show($("loadingMessage"), loading);
    show($("errorMessage"), false);

    if (loading) {
      setText("loadingMessage", t("loadingBooks"));
      $("bookGrid").replaceChildren();
    }
  }

  async function loadEditions() {
    setBooksLoading(true);

    try {
      const data = await fetchJson(`${API_BASE}/editions.json`);

      if (!Array.isArray(data)) {
        throw new Error("Invalid editions response");
      }

      state.editions = data;
      renderBooks();

      show($("loadingMessage"), false);
      show($("errorMessage"), false);
    } catch (error) {
      console.error("Hadith editions error:", error);
      show($("loadingMessage"), false);
      show($("errorMessage"), true);
      setText("errorText", t("loadBooksError"));
    } finally {
      state.loadingBooks = false;
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

  function findEdition(collection, language) {
    const exact = state.editions.find(edition =>
      edition.collection === collection &&
      String(edition.language || "").toLowerCase() === language
    );

    if (exact) return exact;

    return state.editions.find(edition =>
      edition.collection === collection &&
      String(edition.name || "").toLowerCase().includes(language)
    );
  }

  function normalizeHadithArray(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.hadiths)) return data.hadiths;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }

  function getHadithNumber(item, fallbackIndex) {
    return item?.hadithnumber ??
      item?.hadithNumber ??
      item?.number ??
      item?.id ??
      fallbackIndex + 1;
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

  function findMatchingTranslation(number) {
    const key = String(number);

    return state.translatedHadith.find(item =>
      String(getHadithNumber(item, -1)) === key
    ) || null;
  }

  function getTranslationLanguage() {
    const settings = readSettings();

    return normalizeLanguage(
      settings.translationLanguage ||
      settings.translationLang ||
      state.lang
    );
  }

  function getTranslationEdition(book) {
    const language = getTranslationLanguage();

    const editionCode = {
      bn: "ben",
      en: "eng",
      hi: "hin"
    }[language];

    const collection = book.id;

    return findEdition(collection, language) ||
      state.editions.find(edition =>
        edition.collection === collection &&
        String(edition.name || "").toLowerCase().startsWith(editionCode + "-")
      ) ||
      state.editions.find(edition =>
        edition.collection === collection &&
        String(edition.language || "").toLowerCase().startsWith(language)
      );
  }

  function getArabicEdition(book) {
    return state.editions.find(edition =>
      edition.collection === book.id &&
      (
        String(edition.language || "").toLowerCase() === "ara" ||
        String(edition.name || "").toLowerCase().startsWith("ara-")
      )
    );
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
    $("hadithList").replaceChildren();

    try {
      if (!state.editions.length) {
        const data = await fetchJson(`${API_BASE}/editions.json`);
        state.editions = Array.isArray(data) ? data : [];
      }

      const arabicEdition = getArabicEdition(book);
      const translationEdition = getTranslationEdition(book);

      if (!arabicEdition && !translationEdition) {
        throw new Error("No matching editions found");
      }

      const requests = [];

      requests.push(
        arabicEdition
          ? fetchJson(`${API_BASE}/editions/${arabicEdition.name}.json`)
          : Promise.resolve(null)
      );

      requests.push(
        translationEdition
          ? fetchJson(`${API_BASE}/editions/${translationEdition.name}.json`)
          : Promise.resolve(null)
      );

      const [arabicData, translationData] = await Promise.all(requests);

      if (requestId !== state.requestId) return;

      state.arabicHadith = normalizeHadithArray(arabicData);
      state.translatedHadith = normalizeHadithArray(translationData);

      if (!state.arabicHadith.length && !state.translatedHadith.length) {
        throw new Error("No Hadith data found");
      }

      state.displayedHadith = buildHadithItems();
      state.currentHadithIndex = 0;

      show($("listLoadingMessage"), false);
      show($("listErrorMessage"), false);
      renderHadithList();
    } catch (error) {
      if (requestId !== state.requestId) return;

      console.error("Hadith loading error:", error);
      show($("listLoadingMessage"), false);
      show($("listErrorMessage"), true);
      setText("listErrorText", t("loadHadithError"));
    } finally {
      if (requestId === state.requestId) {
        state.loadingHadith = false;
      }
    }
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
        translation: translationItem ? getHadithText(translationItem) :
          (translated.length && !arabic.length ? getHadithText(item) : ""),
        reference: safeText(
          item.reference ??
          item.referenceText ??
          translationItem?.reference ??
          translationItem?.referenceText ??
          ""
        ),
        arabicItem: item,
        translationItem
      };
    });
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

    show($("emptySearchMessage"), results.length === 0 && !state.loadingHadith);

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
        previewText.length > 170
          ? `${previewText.slice(0, 170)}…`
          : previewText
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

    if (previous) {
      previous.disabled = state.currentHadithIndex <= 0;
    }

    if (next) {
      next.disabled =
        state.currentHadithIndex >= state.displayedHadith.length - 1;
    }

    const detailCard = document.querySelector(".hadith-detail-card");
    if (detailCard) detailCard.scrollTop = 0;
  }

  function moveHadith(direction) {
    const nextIndex = state.currentHadithIndex + direction;

    if (nextIndex < 0 || nextIndex >= state.displayedHadith.length) {
      return;
    }

    state.currentHadithIndex = nextIndex;
    renderHadithDetail();
  }

  function retryBooks() {
    loadEditions();
  }

  function retryHadith() {
    if (state.currentBook) loadHadith(state.currentBook);
  }

  function refreshLanguage() {
    applySettings();
    updateStaticText();
    renderBooks();
    renderHadithList();

    if (state.currentScreen === "detail") {
      renderHadithDetail();
    }
  }

  function onStorageChange(event) {
    if (
      !event.key ||
      event.key === "appSettings" ||
      event.key === "ibadatSettings"
    ) {
      refreshLanguage();
    }
  }

  function onPageShow() {
    refreshLanguage();
  }

  function bindEvents() {
    $("retryButton")?.addEventListener("click", retryBooks);
    $("listRetryButton")?.addEventListener("click", retryHadith);

    $("previousHadithButton")?.addEventListener("click", () => {
      moveHadith(-1);
    });

    $("nextHadithButton")?.addEventListener("click", () => {
      moveHadith(1);
    });

    $("hadithSearch")?.addEventListener("input", event => {
      state.searchQuery = event.target.value || "";
      renderHadithList();
    });

    window.addEventListener("storage", onStorageChange);
    window.addEventListener("pageshow", onPageShow);

    window.addEventListener("popstate", () => {
      if (state.currentScreen === "detail") {
        showScreen("list", false);
      } else if (state.currentScreen === "list") {
        showScreen("books", false);
      }
    });

    // Android/WebView back button events, where supported by the host.
    document.addEventListener("backbutton", event => {
      event.preventDefault?.();
      goBack();
    });
  }

  function init() {
    applySettings();
    bindEvents();
    updateStaticText();

    try {
      history.replaceState({ hadithScreen: "books" }, "");
    } catch (_) {
      // Continue without history state.
    }

    renderBooks();
    loadEditions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
