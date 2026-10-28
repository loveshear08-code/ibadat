
// ============================================================
// IBADAT — HADITH COLLECTION
// Two screens only: Books → Complete scrollable hadith list
// ============================================================

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const elements = {
    page: $("hadithPage"),
    pageTitle: $("pageTitle"),
    pageSubtitle: $("pageSubtitle"),
    backBooks: $("backBooks"),
    refreshHadith: $("refreshHadith"),

    booksScreen: $("booksScreen"),
    booksGrid: $("booksGrid"),
    booksHeading: $("booksHeading"),
    booksDescription: $("booksDescription"),
    bookCount: $("bookCount"),

    listScreen: $("listScreen"),
    listHeading: $("listHeading"),
    listSubtitle: $("listSubtitle"),
    searchToggle: $("searchToggle"),
    searchPanel: $("searchPanel"),
    hadithSearch: $("hadithSearch"),
    clearSearch: $("clearSearch"),

    listStatus: $("listStatus"),
    hadithList: $("hadithList"),
    listEmpty: $("listEmpty"),
    emptyTitle: $("emptyTitle"),
    emptyDescription: $("emptyDescription"),

    listError: $("listError"),
    errorTitle: $("errorTitle"),
    errorDescription: $("errorDescription"),
    retryHadith: $("retryHadith"),

    listBottom: $("listBottom"),
    loadedCount: $("loadedCount"),
    footerText: $("footerText")
  };

  const LANGUAGES = {
    bn: "bn",
    en: "en",
    hi: "hi"
  };

  const BOOKS = [
    {
      id: "bukhari",
      editions: ["bukhari"],
      names: {
        bn: "সহিহ বুখারি",
        en: "Sahih al-Bukhari",
        hi: "सहीह अल-बुखारी"
      },
      descriptions: {
        bn: "সহিহ হাদিসের সংকলন",
        en: "Collection of authentic hadith",
        hi: "प्रामाणिक हदीसों का संग्रह"
      }
    },
    {
      id: "muslim",
      editions: ["muslim"],
      names: {
        bn: "সহিহ মুসলিম",
        en: "Sahih Muslim",
        hi: "सहीह मुस्लिम"
      },
      descriptions: {
        bn: "সহিহ হাদিসের সংকলন",
        en: "Collection of authentic hadith",
        hi: "प्रामाणिक हदीसों का संग्रह"
      }
    },
    {
      id: "abudawud",
      editions: ["abudawud", "abu-dawud"],
      names: {
        bn: "সুনান আবু দাউদ",
        en: "Sunan Abi Dawud",
        hi: "सुनन अबू दाऊद"
      },
      descriptions: {
        bn: "হাদিস ও ফিকহের সংকলন",
        en: "Hadith and jurisprudence",
        hi: "हदीस और फ़िक़्ह का संग्रह"
      }
    },
    {
      id: "tirmidhi",
      editions: ["tirmidhi"],
      names: {
        bn: "জামে তিরমিজি",
        en: "Jami at-Tirmidhi",
        hi: "जामे तिर्मिज़ी"
      },
      descriptions: {
        bn: "হাদিসের প্রসিদ্ধ সংকলন",
        en: "A well-known hadith collection",
        hi: "हदीसों का प्रसिद्ध संग्रह"
      }
    },
    {
      id: "nasai",
      editions: ["nasai", "nasa'i"],
      names: {
        bn: "সুনান নাসাঈ",
        en: "Sunan an-Nasa'i",
        hi: "सुनन नसाई"
      },
      descriptions: {
        bn: "হাদিসের প্রসিদ্ধ সংকলন",
        en: "A well-known hadith collection",
        hi: "हदीसों का प्रसिद्ध संग्रह"
      }
    },
    {
      id: "ibnmajah",
      editions: ["ibnmajah", "ibn-majah"],
      names: {
        bn: "সুনান ইবনে মাজাহ",
        en: "Sunan Ibn Majah",
        hi: "सुनन इब्न माजा"
      },
      descriptions: {
        bn: "হাদিসের প্রসিদ্ধ সংকলন",
        en: "A well-known hadith collection",
        hi: "हदीसों का प्रसिद्ध संग्रह"
      }
    },
    {
      id: "malik",
      editions: ["malik", "muwatta-malik"],
      names: {
        bn: "মুআত্তা ইমাম মালিক",
        en: "Muwatta Imam Malik",
        hi: "मुवत्ता इमाम मालिक"
      },
      descriptions: {
        bn: "প্রাচীন হাদিস সংকলন",
        en: "An early hadith collection",
        hi: "प्राचीन हदीस संग्रह"
      }
    },
    {
      id: "nawawi",
      editions: ["nawawi", "nawawi40", "nawawi-40"],
      names: {
        bn: "ইমাম নববীর ৪০ হাদিস",
        en: "Forty Hadith of Imam Nawawi",
        hi: "इमाम नववी की चालीस हदीसें"
      },
      descriptions: {
        bn: "নির্বাচিত ৪০টি হাদিস",
        en: "Forty selected hadith",
        hi: "चालीस चयनित हदीसें"
      }
    }
  ];

  const TEXT = {
    bn: {
      pageTitle: "হাদিস সংকলন",
      pageSubtitle: "নির্ভরযোগ্য হাদিস গ্রন্থসমূহ",
      booksHeading: "হাদিসের গ্রন্থসমূহ",
      booksDescription: "পছন্দের গ্রন্থ নির্বাচন করে হাদিস পড়ুন",
      listHeading: "হাদিসসমূহ",
      listSubtitle: "হাদিসের তালিকা",
      searchPlaceholder: "আরবি বা অনুবাদ দিয়ে খুঁজুন…",
      searchLabel: "হাদিস খুঁজুন",
      loading: "হাদিস লোড হচ্ছে…",
      loadingMore: "হাদিসের তথ্য প্রস্তুত হচ্ছে…",
      loaded: "মোট {count}টি হাদিস",
      noResults: "কোনো হাদিস পাওয়া যায়নি",
      noResultsDescription: "অন্য শব্দ দিয়ে আবার চেষ্টা করুন।",
      loadError: "হাদিস লোড করা যায়নি",
      loadErrorDescription: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      retry: "আবার চেষ্টা করুন",
      hadithNumber: "হাদিস {number}",
      arabic: "আরবি",
      translation: "অনুবাদ",
      footer: "জ্ঞান অর্জন করুন, আমল করুন",
      count: "০৮",
      back: "বইয়ের তালিকায় ফিরে যান",
      refresh: "হাদিস পুনরায় লোড করুন",
      searchClear: "সার্চ মুছুন",
      booksScreen: "হাদিস সংকলন",
      listScreen: "হাদিসের তালিকা",
      noArabic: "আরবি পাঠ পাওয়া যায়নি।",
      noTranslation: "এই ভাষায় অনুবাদ পাওয়া যায়নি।",
      language: "বাংলা"
    },

    en: {
      pageTitle: "Hadith Collection",
      pageSubtitle: "Explore trusted hadith books",
      booksHeading: "Hadith Books",
      booksDescription: "Choose a collection to start reading",
      listHeading: "Hadiths",
      listSubtitle: "Complete collection",
      searchPlaceholder: "Search Arabic or translation…",
      searchLabel: "Search hadiths",
      loading: "Loading hadiths…",
      loadingMore: "Preparing hadith collection…",
      loaded: "{count} hadiths",
      noResults: "No hadiths found",
      noResultsDescription: "Try searching with another word.",
      loadError: "Could not load hadiths",
      loadErrorDescription: "Check your internet connection and try again.",
      retry: "Try again",
      hadithNumber: "Hadith {number}",
      arabic: "Arabic",
      translation: "Translation",
      footer: "Learn knowledge, put it into practice",
      count: "08",
      back: "Back to books",
      refresh: "Reload hadiths",
      searchClear: "Clear search",
      booksScreen: "Hadith Collection",
      listScreen: "Hadith List",
      noArabic: "Arabic text is unavailable.",
      noTranslation: "Translation is unavailable in this language.",
      language: "Translation"
    },

    hi: {
      pageTitle: "हदीस संग्रह",
      pageSubtitle: "प्रसिद्ध हदीस ग्रंथ",
      booksHeading: "हदीस की पुस्तकें",
      booksDescription: "पढ़ने के लिए एक संग्रह चुनें",
      listHeading: "हदीसें",
      listSubtitle: "हदीसों की सूची",
      searchPlaceholder: "अरबी या अनुवाद खोजें…",
      searchLabel: "हदीस खोजें",
      loading: "हदीसें लोड हो रही हैं…",
      loadingMore: "हदीस संग्रह तैयार हो रहा है…",
      loaded: "कुल {count} हदीसें",
      noResults: "कोई हदीस नहीं मिली",
      noResultsDescription: "किसी दूसरे शब्द से खोजें।",
      loadError: "हदीसें लोड नहीं हो सकीं",
      loadErrorDescription: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
      retry: "फिर कोशिश करें",
      hadithNumber: "हदीस {number}",
      arabic: "अरबी",
      translation: "अनुवाद",
      footer: "ज्ञान प्राप्त करें और अमल करें",
      count: "०८",
      back: "पुस्तकों की सूची पर लौटें",
      refresh: "हदीसें फिर से लोड करें",
      searchClear: "खोज मिटाएँ",
      booksScreen: "हदीस संग्रह",
      listScreen: "हदीस सूची",
      noArabic: "अरबी पाठ उपलब्ध नहीं है।",
      noTranslation: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      language: "अनुवाद"
    }
  };

  const API_BASES = [
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1",
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1.0"
  ];

  const state = {
    language: "bn",
    currentScreen: "books",
    currentBook: null,
    allHadiths: [],
    visibleHadiths: [],
    editions: null,
    loading: false,
    requestId: 0,
    query: "",
    searchOpen: false,
    editionCache: new Map()
  };

  function currentText() {
    return TEXT[state.language] || TEXT.bn;
  }

  function getLanguage() {
    const candidates = [
      document.documentElement.lang,
      document.body.dataset.language,
      document.body.dataset.lang,
      document.documentElement.dataset.language,
      document.documentElement.dataset.lang
    ];

    for (const candidate of candidates) {
      if (!candidate) continue;

      const value = String(candidate).toLowerCase();

      if (value.startsWith("bn")) return "bn";
      if (value.startsWith("hi")) return "hi";
      if (value.startsWith("en")) return "en";
    }

    try {
      const keys = [
        "ibadatLanguage",
        "selectedLanguage",
        "appLanguage",
        "language",
        "lang"
      ];

      for (const key of keys) {
        const value = localStorage.getItem(key);

        if (!value) continue;

        const normalized = value.toLowerCase();

        if (normalized.includes("বাংলা") || normalized === "bn") return "bn";
        if (normalized.includes("हिन्दी") || normalized.includes("हिंदी") || normalized === "hi") return "hi";
        if (normalized.includes("english") || normalized === "en") return "en";
      }
    } catch (_) {
      // Storage can be unavailable in restricted browser contexts.
    }

    return "bn";
  }

  function t(key, values = {}) {
    let result = currentText()[key] ?? TEXT.bn[key] ?? key;

    for (const [name, value] of Object.entries(values)) {
      result = result.replaceAll(`{${name}}`, String(value));
    }

    return result;
  }

  function normalizeText(value) {
    return String(value ?? "")
      .normalize("NFKC")
      .toLocaleLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function formatNumber(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) return String(value ?? "");

    try {
      const locale = state.language === "bn"
        ? "bn-BD"
        : state.language === "hi"
          ? "hi-IN"
          : "en-US";

      return new Intl.NumberFormat(locale).format(number);
    } catch (_) {
      return String(number);
    }
  }

  function setText(element, value) {
    if (element) element.textContent = value;
  }

  function getBook(bookId) {
    return BOOKS.find((book) => book.id === bookId) || null;
  }

  function getBookName(book) {
    if (!book) return t("pageTitle");

    return book.names[state.language] || book.names.en || book.id;
  }

  function getBookDescription(book) {
    if (!book) return "";

    return book.descriptions[state.language] ||
      book.descriptions.en ||
      "";
  }

  function updateBookCards() {
    if (!elements.booksGrid) return;

    for (const card of elements.booksGrid.querySelectorAll("[data-book]")) {
      const book = getBook(card.dataset.book);
      if (!book) continue;

      const name = card.querySelector(".book-name");
      const description = card.querySelector(".book-description");

      setText(name, getBookName(book));
      setText(description, getBookDescription(book));
      card.setAttribute("aria-label", getBookName(book));
    }

    setText(elements.booksHeading, t("booksHeading"));
    setText(elements.booksDescription, t("booksDescription"));
    setText(elements.bookCount, t("count"));
  }

  function updateStaticText() {
    const language = state.language;

    document.documentElement.lang = language;

    setText(elements.pageTitle, t("pageTitle"));
    setText(elements.pageSubtitle, t("pageSubtitle"));
    setText(elements.footerText, t("footer"));

    if (elements.backBooks) {
      elements.backBooks.setAttribute("aria-label", t("back"));
      elements.backBooks.title = t("back");
    }

    if (elements.refreshHadith) {
      elements.refreshHadith.setAttribute("aria-label", t("refresh"));
      elements.refreshHadith.title = t("refresh");
    }

    if (elements.searchToggle) {
      elements.searchToggle.setAttribute("aria-label", t("searchLabel"));
      elements.searchToggle.title = t("searchLabel");
    }

    if (elements.hadithSearch) {
      elements.hadithSearch.placeholder = t("searchPlaceholder");
    }

    if (elements.clearSearch) {
      elements.clearSearch.setAttribute("aria-label", t("searchClear"));
      elements.clearSearch.title = t("searchClear");
    }

    if (elements.retryHadith) {
      setText(elements.retryHadith, t("retry"));
    }

    setText(elements.emptyTitle, t("noResults"));
    setText(elements.emptyDescription, t("noResultsDescription"));
    setText(elements.errorTitle, t("loadError"));
    setText(elements.errorDescription, t("loadErrorDescription"));

    updateBookCards();

    if (state.currentBook) {
      setText(elements.listHeading, getBookName(state.currentBook));
      setText(elements.listSubtitle, t("listSubtitle"));
    }

    if (state.currentScreen === "books") {
      document.title = `${t("pageTitle")} | IBADAT`;
    } else {
      document.title = `${getBookName(state.currentBook)} | IBADAT`;
    }

    renderHadiths();
  }

  function showScreen(screen) {
    state.currentScreen = screen === "list" ? "list" : "books";

    const isList = state.currentScreen === "list";

    if (elements.booksScreen) {
      elements.booksScreen.hidden = isList;
    }

    if (elements.listScreen) {
      elements.listScreen.hidden = !isList;
    }

    if (elements.backBooks) {
      elements.backBooks.hidden = !isList;
    }

    if (elements.page) {
      elements.page.dataset.screen = state.currentScreen;
    }

    if (isList && state.currentBook) {
      setText(elements.pageTitle, getBookName(state.currentBook));
      setText(elements.pageSubtitle, t("listScreen"));
      setText(elements.listHeading, getBookName(state.currentBook));
      setText(elements.listSubtitle, t("listSubtitle"));

      document.title = `${getBookName(state.currentBook)} | IBADAT`;
    } else {
      setText(elements.pageTitle, t("pageTitle"));
      setText(elements.pageSubtitle, t("pageSubtitle"));

      document.title = `${t("pageTitle")} | IBADAT`;
    }

    if (elements.hadithList) {
      elements.hadithList.scrollTop = 0;
    }
  }

  function setStatus(message) {
    setText(elements.listStatus, message || "");
  }

  function showError(message) {
    if (elements.listError) {
      elements.listError.hidden = false;
    }

    if (elements.listEmpty) {
      elements.listEmpty.hidden = true;
    }

    if (elements.listBottom) {
      elements.listBottom.hidden = true;
    }

    if (elements.hadithList) {
      elements.hadithList.replaceChildren();
    }

    setStatus(message || "");
  }

  function clearError() {
    if (elements.listError) {
      elements.listError.hidden = true;
    }
  }

  function setLoading(loading) {
    state.loading = loading;

    if (elements.retryHadith) {
      elements.retryHadith.disabled = loading;
    }

    if (elements.refreshHadith) {
      elements.refreshHadith.disabled = loading;
    }

    if (elements.listStatus) {
      elements.listStatus.setAttribute("aria-busy", String(loading));
    }
  }

  async function fetchJson(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "default",
      mode: "cors",
      credentials: "omit"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  async function fetchFromBases(path) {
    let lastError = null;

    for (const base of API_BASES) {
      try {
        return await fetchJson(`${base}/${path}`);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("API unavailable");
  }

  function getEditionList(data) {
    if (Array.isArray(data)) return data;

    if (data && typeof data === "object") {
      if (Array.isArray(data.editions)) return data.editions;

      return Object.entries(data).map(([key, value]) => {
        if (value && typeof value === "object") {
          return { id: key, ...value };
        }

        return { id: key };
      });
    }

    return [];
  }

  function normalizeEdition(edition) {
    const id = String(
      edition?.id ??
      edition?.edition ??
      edition?.slug ??
      ""
    ).toLowerCase();

    const language = String(
      edition?.language ??
      edition?.lang ??
      ""
    ).toLowerCase();

    const book = String(
      edition?.book ??
      edition?.collection ??
      ""
    ).toLowerCase();

    const name = String(edition?.name ?? "").toLowerCase();

    return { ...edition, id, language, book, name };
  }

  async function loadEditions() {
    if (state.editions) return state.editions;

    const data = await fetchFromBases("editions.json");

    state.editions = getEditionList(data).map(normalizeEdition);

    return state.editions;
  }

  function editionBookMatches(edition, book) {
    const identifiers = [
      edition.id,
      edition.book,
      edition.name
    ].join(" ");

    const candidates = book.editions.map((item) =>
      item.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    const normalized = identifiers.replace(/[^a-z0-9]/g, "");

    return candidates.some((candidate) =>
      normalized.includes(candidate)
    );
  }

  function chooseEdition(editions, book, language) {
    const langAliases = {
      bn: ["ben", "bengali", "bangla", "bn"],
      en: ["eng", "english", "en"],
      hi: ["hin", "hindi", "hi"]
    };

    const aliases = langAliases[language] || langAliases.en;

    const matchingBook = editions.filter((edition) =>
      editionBookMatches(edition, book)
    );

    const languageMatches = matchingBook.filter((edition) => {
      const id = edition.id.toLowerCase();
      const lang = edition.language.toLowerCase();
      const name = edition.name.toLowerCase();

      return aliases.some((alias) =>
        lang === alias ||
        id.startsWith(`${alias}-`) ||
        id.startsWith(`${alias}_`) ||
        id.endsWith(`-${alias}`) ||
        name.includes(alias)
      );
    });

    if (languageMatches.length) {
      return languageMatches[0];
    }

    const arabicMatches = matchingBook.filter((edition) => {
      const id = edition.id.toLowerCase();
      const lang = edition.language.toLowerCase();
      const name = edition.name.toLowerCase();

      return lang === "ara" ||
        lang === "ar" ||
        id.startsWith("ara-") ||
        id.startsWith("ar-") ||
        name.includes("arabic");
    });

    if (language === "en" && matchingBook.length) {
      return matchingBook.find((edition) =>
        edition.language === "eng" ||
        edition.id.startsWith("eng-")
      ) || matchingBook[0];
    }

    return arabicMatches[0] || matchingBook[0] || null;
  }

  function getEditionPath(editionId) {
    return `editions/${encodeURIComponent(editionId)}.json`;
  }

  function extractHadithArray(data) {
    if (Array.isArray(data)) return data;

    if (data && Array.isArray(data.hadiths)) {
      return data.hadiths;
    }

    if (data && data.hadiths && Array.isArray(data.hadiths.data)) {
      return data.hadiths.data;
    }

    if (data && Array.isArray(data.data)) {
      return data.data;
    }

    if (data && data.hadiths && typeof data.hadiths === "object") {
      const values = Object.values(data.hadiths);

      if (values.length && values.every((item) => typeof item === "object")) {
        return values;
      }
    }

    return [];
  }

  function extractHadithNumber(item, fallbackIndex) {
    const value =
      item?.hadithnumber ??
      item?.hadithNumber ??
      item?.number ??
      item?.id ??
      item?.reference?.hadith ??
      fallbackIndex;

    return value == null ? fallbackIndex : value;
  }

  function extractArabic(item) {
    return String(
      item?.arabic ??
      item?.textArabic ??
      item?.arabicText ??
      item?.text_ar ??
      item?.text ??
      ""
    ).trim();
  }

  function extractTranslation(item) {
    const candidates = [
      item?.text,
      item?.translation,
      item?.english,
      item?.translatedText,
      item?.textEnglish,
      item?.text_en
    ];

    for (const value of candidates) {
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }

      if (value && typeof value === "object") {
        const nested = value[state.language] || value.text;

        if (typeof nested === "string" && nested.trim()) {
          return nested.trim();
        }
      }
    }

    return "";
  }

  function normalizeHadith(item, index, sourceLanguage) {
    const arabic = extractArabic(item);

    let translation = extractTranslation(item);

    if (sourceLanguage === "ar" || sourceLanguage === "ara") {
      translation = "";
    }

    if (!translation && arabic && !/[\u0600-\u06FF]/.test(arabic)) {
      translation = arabic;
    }

    return {
      number: extractHadithNumber(item, index + 1),
      arabic,
      translation,
      original: item
    };
  }

  function hasUsefulHadiths(hadiths) {
    return Array.isArray(hadiths) &&
      hadiths.some((hadith) => hadith.arabic || hadith.translation);
  }

  function buildKnownEditionCandidates(book, language) {
    const languagePrefix = {
      bn: "ben",
      en: "eng",
      hi: "hin"
    }[language] || "eng";

    const candidates = [];

    for (const slug of book.editions) {
      candidates.push(`${languagePrefix}-${slug}`);
      candidates.push(`ara-${slug}`);
      candidates.push(`eng-${slug}`);
      candidates.push(`ben-${slug}`);
      candidates.push(`hin-${slug}`);
    }

    return [...new Set(candidates)];
  }

  async function fetchEdition(editionId) {
    if (state.editionCache.has(editionId)) {
      return state.editionCache.get(editionId);
    }

    const promise = fetchFromBases(getEditionPath(editionId));
    state.editionCache.set(editionId, promise);

    try {
      const data = await promise;
      return data;
    } catch (error) {
      state.editionCache.delete(editionId);
      throw error;
    }
  }

  async function fetchBookHadiths(book, language, requestId) {
    let editions = [];

    try {
      editions = await loadEditions();
    } catch (_) {
      // Known edition IDs are tried below if edition discovery fails.
    }

    if (requestId !== state.requestId) return null;

    const preferred = chooseEdition(editions, book, language);
    const candidates = [];

    if (preferred?.id) {
      candidates.push(preferred.id);
    }

    candidates.push(...buildKnownEditionCandidates(book, language));

    const uniqueCandidates = [...new Set(candidates)];

    let lastError = null;

    for (const editionId of uniqueCandidates) {
      if (requestId !== state.requestId) return null;

      try {
        const data = await fetchEdition(editionId);

        if (requestId !== state.requestId) return null;

        const rawHadiths = extractHadithArray(data);
        const metadataLanguage = String(
          data?.metadata?.language ??
          data?.metadata?.lang ??
          preferred?.language ??
          ""
        ).toLowerCase();

        const normalized = rawHadiths
          .map((item, index) =>
            normalizeHadith(item, index, metadataLanguage)
          )
          .filter((item) => item.arabic || item.translation);

        if (hasUsefulHadiths(normalized)) {
          return {
            hadiths: normalized,
            editionId,
            metadata: data?.metadata || null,
            sourceLanguage: metadataLanguage
          };
        }
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("No usable hadith edition found");
  }

  function makeElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (text != null) {
      element.textContent = text;
    }

    return element;
  }

  function renderHadithCard(hadith) {
    const item = makeElement("article", "hadith-item");
    const top = makeElement("div", "hadith-item-top");

    const number = makeElement(
      "span",
      "hadith-number",
      t("hadithNumber", { number: formatNumber(hadith.number) })
    );

    const label = makeElement(
      "span",
      "hadith-language-label",
      t("translation")
    );

    top.append(number, label);
    item.append(top);

    if (hadith.arabic) {
      const arabic = makeElement("p", "hadith-arabic", hadith.arabic);
      arabic.lang = "ar";
      arabic.dir = "rtl";
      arabic.setAttribute("aria-label", t("arabic"));
      item.append(arabic);
    }

    if (hadith.translation) {
      const translation = makeElement(
        "p",
        "hadith-translation",
        hadith.translation
      );

      translation.lang = state.language;
      translation.dir = state.language === "ar" ? "rtl" : "auto";
      item.append(translation);
    }

    if (!hadith.translation) {
      item.classList.add("is-arabic-only");
    }

    if (!hadith.arabic) {
      item.classList.add("is-translation-only");
    }

    return item;
  }

  function renderHadiths() {
    if (!elements.hadithList) return;

    const query = normalizeText(state.query);

    const filtered = state.allHadiths.filter((hadith) => {
      if (!query) return true;

      const haystack = normalizeText(
        `${hadith.number} ${hadith.arabic} ${hadith.translation}`
      );

      return haystack.includes(query);
    });

    state.visibleHadiths = filtered;

    const fragment = document.createDocumentFragment();

    for (const hadith of filtered) {
      fragment.append(renderHadithCard(hadith));
    }

    elements.hadithList.replaceChildren(fragment);

    const isLoading = state.loading;
    const hasError = elements.listError && !elements.listError.hidden;
    const isEmpty = !isLoading && !hasError && filtered.length === 0;

    if (elements.listEmpty) {
      elements.listEmpty.hidden = !isEmpty;
    }

    if (elements.listBottom) {
      elements.listBottom.hidden =
        isLoading ||
        Boolean(hasError) ||
        filtered.length === 0;
    }

    if (elements.loadedCount) {
      setText(
        elements.loadedCount,
        t("loaded", { count: formatNumber(filtered.length) })
      );
    }

    if (isEmpty && state.allHadiths.length > 0) {
      setText(elements.emptyTitle, t("noResults"));
      setText(elements.emptyDescription, t("noResultsDescription"));
    }

    if (!state.allHadiths.length && !isLoading && !hasError) {
      setText(elements.emptyTitle, t("noResults"));
      setText(elements.emptyDescription, t("noResultsDescription"));
    }
  }

  async function openBook(bookId, options = {}) {
    const book = getBook(bookId);

    if (!book) return;

    state.requestId += 1;

    const requestId = state.requestId;

    state.currentBook = book;
    state.allHadiths = [];
    state.visibleHadiths = [];
    state.query = "";

    if (elements.hadithSearch) {
      elements.hadithSearch.value = "";
    }

    state.searchOpen = false;

    if (elements.searchPanel) {
      elements.searchPanel.hidden = true;
    }

    if (elements.searchToggle) {
      elements.searchToggle.setAttribute("aria-expanded", "false");
    }

    clearError();
    setLoading(true);

    if (elements.hadithList) {
      elements.hadithList.replaceChildren();
      elements.hadithList.scrollTop = 0;
    }

    if (elements.listEmpty) {
      elements.listEmpty.hidden = true;
    }

    if (elements.listBottom) {
      elements.listBottom.hidden = true;
    }

    setStatus(t("loading"));

    showScreen("list");

    if (options.pushHistory !== false) {
      try {
        history.pushState(
          { hadithScreen: "list", bookId: book.id },
          "",
          `#hadith-${encodeURIComponent(book.id)}`
        );
      } catch (_) {
        // Continue even when browser history is restricted.
      }
    }

    try {
      const result = await fetchBookHadiths(
        book,
        state.language,
        requestId
      );

      if (!result || requestId !== state.requestId) return;

      state.allHadiths = result.hadiths;
      state.visibleHadiths = result.hadiths;

      clearError();
      setStatus("");

      renderHadiths();
    } catch (error) {
      if (requestId !== state.requestId) return;

      console.error("[IBADAT Hadith] Could not load collection:", error);

      showError(t("loadErrorDescription"));
    } finally {
      if (requestId === state.requestId) {
        setLoading(false);
        renderHadiths();
      }
    }
  }

  function returnToBooks(options = {}) {
    state.requestId += 1;
    state.currentBook = null;
    state.allHadiths = [];
    state.visibleHadiths = [];
    state.query = "";
    state.searchOpen = false;

    if (elements.hadithSearch) {
      elements.hadithSearch.value = "";
    }

    if (elements.searchPanel) {
      elements.searchPanel.hidden = true;
    }

    if (elements.searchToggle) {
      elements.searchToggle.setAttribute("aria-expanded", "false");
    }

    if (elements.hadithList) {
      elements.hadithList.replaceChildren();
    }

    if (elements.listError) {
      elements.listError.hidden = true;
    }

    if (elements.listEmpty) {
      elements.listEmpty.hidden = true;
    }

    if (elements.listBottom) {
      elements.listBottom.hidden = true;
    }

    setStatus("");
    setLoading(false);
    showScreen("books");

    if (options.pushHistory !== false) {
      try {
        history.pushState({ hadithScreen: "books" }, "", "#hadith-books");
      } catch (_) {
        // Browser history is optional.
      }
    }
  }

  function toggleSearch() {
    state.searchOpen = !state.searchOpen;

    if (elements.searchPanel) {
      elements.searchPanel.hidden = !state.searchOpen;
    }

    if (elements.searchToggle) {
      elements.searchToggle.setAttribute(
        "aria-expanded",
        String(state.searchOpen)
      );
    }

    if (state.searchOpen && elements.hadithSearch) {
      requestAnimationFrame(() => elements.hadithSearch.focus());
    } else if (elements.hadithSearch) {
      elements.hadithSearch.value = "";
      state.query = "";
      renderHadiths();
    }
  }

  function clearSearch() {
    state.query = "";

    if (elements.hadithSearch) {
      elements.hadithSearch.value = "";
      elements.hadithSearch.focus();
    }

    renderHadiths();
  }

  function refreshCurrentBook() {
    if (!state.currentBook) return;

    state.editions = null;
    state.allHadiths = [];
    state.editionCache.clear();

    openBook(state.currentBook.id, { pushHistory: false });
  }

  function handlePopState(event) {
    const historyState = event.state;

    if (
      historyState &&
      historyState.hadithScreen === "list" &&
      historyState.bookId
    ) {
      openBook(historyState.bookId, { pushHistory: false });
      return;
    }

    if (
      historyState &&
      historyState.hadithScreen === "books"
    ) {
      returnToBooks({ pushHistory: false });
      return;
    }

    const hash = decodeURIComponent(location.hash || "");
    const match = hash.match(/^#hadith-(.+)$/);

    if (match && match[1] !== "books") {
      const book = getBook(match[1]);

      if (book) {
        openBook(book.id, { pushHistory: false });
        return;
      }
    }

    returnToBooks({ pushHistory: false });
  }

  function bindEvents() {
    if (elements.booksGrid) {
      elements.booksGrid.addEventListener("click", (event) => {
        const card = event.target.closest("[data-book]");

        if (!card) return;

        openBook(card.dataset.book);
      });
    }

    if (elements.backBooks) {
      elements.backBooks.addEventListener("click", () => {
        returnToBooks();
      });
    }

    if (elements.refreshHadith) {
      elements.refreshHadith.addEventListener("click", () => {
        if (state.currentBook) {
          refreshCurrentBook();
        } else {
          state.editions = null;
          state.editionCache.clear();
          updateStaticText();
        }
      });
    }

    if (elements.searchToggle) {
      elements.searchToggle.addEventListener("click", toggleSearch);
    }

    if (elements.hadithSearch) {
      elements.hadithSearch.addEventListener("input", (event) => {
        state.query = event.target.value || "";
        renderHadiths();
      });

      elements.hadithSearch.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          clearSearch();
        }
      });
    }

    if (elements.clearSearch) {
      elements.clearSearch.addEventListener("click", clearSearch);
    }

    if (elements.retryHadith) {
      elements.retryHadith.addEventListener("click", () => {
        if (state.currentBook) {
          refreshCurrentBook();
        }
      });
    }

    window.addEventListener("popstate", handlePopState);

    window.addEventListener("globalThemeChanged", () => {
      // Theme colors are handled by CSS custom properties.
      // Re-rendering is not needed for theme changes.
    });

    window.addEventListener("storage", (event) => {
      if (!event.key) {
        syncLanguage();
        return;
      }

      if (/language|lang/i.test(event.key)) {
        syncLanguage();
      }
    });
  }

  function syncLanguage() {
    const nextLanguage = getLanguage();

    if (nextLanguage === state.language) return;

    state.language = nextLanguage;
    updateStaticText();

    if (state.currentBook) {
      refreshCurrentBook();
    }
  }

  function initialize() {
    state.language = getLanguage();

    updateStaticText();
    bindEvents();

    showScreen("books");

    // Restore the selected collection when opening a direct hadith link.
    const hash = decodeURIComponent(location.hash || "");
    const match = hash.match(/^#hadith-(.+)$/);

    if (match && match[1] !== "books" && getBook(match[1])) {
      openBook(match[1], { pushHistory: false });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
