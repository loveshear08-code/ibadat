/* =========================================
   IBADAT - HADITH PAGE
   Complete JavaScript
   File: js/hadith.js
   ========================================= */

(() => {
  "use strict";

  /* ---------- Configuration ---------- */

  const API_BASE =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";

  const BOOKS = [
    {
      id: "bukhari",
      name: "Sahih al-Bukhari",
      bn: "সহিহ আল-বুখারি",
      hi: "सहीह अल-बुखारी"
    },
    {
      id: "muslim",
      name: "Sahih Muslim",
      bn: "সহিহ মুসলিম",
      hi: "सहीह मुस्लिम"
    },
    {
      id: "abudawud",
      name: "Sunan Abu Dawud",
      bn: "সুনানে আবু দাউদ",
      hi: "सुनन अबू दाऊद"
    },
    {
      id: "tirmidhi",
      name: "Jami at-Tirmidhi",
      bn: "জামে আত-তিরমিজি",
      hi: "जामे अत-तिर्मिज़ी"
    },
    {
      id: "nasai",
      name: "Sunan an-Nasa'i",
      bn: "সুনানে আন-নাসাঈ",
      hi: "सुनन अन-नसाई"
    },
    {
      id: "ibnmajah",
      name: "Sunan Ibn Majah",
      bn: "সুনানে ইবনে মাজাহ",
      hi: "सुनन इब्न माजा"
    },
    {
      id: "malik",
      name: "Muwatta Malik",
      bn: "মুআত্তা মালিক",
      hi: "मुवत्ता मालिक"
    },
    {
      id: "nawawi",
      name: "Forty Hadith Nawawi",
      bn: "ইমাম নববীর ৪০ হাদিস",
      hi: "इमाम नववी की 40 हदीस"
    }
  ];

  const UI_TEXT = {
    bn: {
      title: "হাদিস",
      subtitle: "সহিহ হাদিস পড়ুন ও শিখুন",
      welcome: "হাদিস সংকলন",
      welcomeDesc: "বিভিন্ন হাদিসের বই পড়ুন এবং শিক্ষা গ্রহণ করুন।",
      booksHeading: "হাদিসের বই",
      loadingBooks: "হাদিসের বই লোড হচ্ছে...",
      loadingHadith: "হাদিস লোড হচ্ছে...",
      errorBooks: "হাদিসের বই লোড করা যায়নি। ইন্টারনেট পরীক্ষা করে আবার চেষ্টা করুন।",
      errorHadith: "হাদিস লোড করা যায়নি। আবার চেষ্টা করুন।",
      retry: "আবার চেষ্টা করুন",
      search: "হাদিস খুঁজুন...",
      translation: "অনুবাদের ভাষা",
      selectHadith: "পড়ার জন্য একটি হাদিস নির্বাচন করুন।",
      noResults: "কোনো হাদিস পাওয়া যায়নি।",
      arabic: "আরবি",
      translated: "অনুবাদ",
      reference: "রেফারেন্স",
      hadithNo: "হাদিস নম্বর",
      previous: "← আগের",
      next: "পরের →",
      footer: "পড়ুন • চিন্তা করুন • আমল করুন",
      language: "BN",
      back: "ফিরে যান",
      unavailable: "এই ভাষায় অনুবাদ পাওয়া যায়নি।",
      noArabic: "আরবি পাঠ পাওয়া যায়নি।",
      bookUnavailable: "এই বইয়ের তথ্য এখন পাওয়া যাচ্ছে না।",
      networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      page: "হাদিস"
    },

    en: {
      title: "Hadith",
      subtitle: "Read and learn from authentic Hadith",
      welcome: "Hadith Collection",
      welcomeDesc: "Explore Hadith collections and their teachings.",
      booksHeading: "Hadith Books",
      loadingBooks: "Loading Hadith collections...",
      loadingHadith: "Loading Hadith...",
      errorBooks: "Could not load Hadith collections. Check your internet and retry.",
      errorHadith: "Could not load Hadith. Please try again.",
      retry: "Retry",
      search: "Search Hadith...",
      translation: "Translation language",
      selectHadith: "Select a Hadith to read.",
      noResults: "No Hadith found.",
      arabic: "Arabic",
      translated: "Translation",
      reference: "Reference",
      hadithNo: "Hadith No.",
      previous: "← Previous",
      next: "Next →",
      footer: "Read • Reflect • Practice",
      language: "EN",
      back: "Go back",
      unavailable: "Translation is unavailable in this language.",
      noArabic: "Arabic text is unavailable.",
      bookUnavailable: "This book's data is currently unavailable.",
      networkError: "Check your internet connection and try again.",
      page: "Hadith"
    },

    hi: {
      title: "हदीस",
      subtitle: "हदीस पढ़ें और उनसे सीखें",
      welcome: "हदीस संग्रह",
      welcomeDesc: "हदीस की किताबें पढ़ें और उनकी शिक्षाओं को समझें।",
      booksHeading: "हदीस की किताबें",
      loadingBooks: "हदीस संग्रह लोड हो रहे हैं...",
      loadingHadith: "हदीस लोड हो रही हैं...",
      errorBooks: "हदीस संग्रह लोड नहीं हो सके। इंटरनेट जाँचकर फिर प्रयास करें।",
      errorHadith: "हदीस लोड नहीं हो सकी। फिर प्रयास करें।",
      retry: "फिर प्रयास करें",
      search: "हदीस खोजें...",
      translation: "अनुवाद की भाषा",
      selectHadith: "पढ़ने के लिए हदीस चुनें।",
      noResults: "कोई हदीस नहीं मिली।",
      arabic: "अरबी",
      translated: "अनुवाद",
      reference: "संदर्भ",
      hadithNo: "हदीस संख्या",
      previous: "← पिछली",
      next: "अगली →",
      footer: "पढ़ें • विचार करें • अमल करें",
      language: "HI",
      back: "वापस जाएँ",
      unavailable: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      noArabic: "अरबी पाठ उपलब्ध नहीं है।",
      bookUnavailable: "इस किताब का डेटा अभी उपलब्ध नहीं है।",
      networkError: "इंटरनेट कनेक्शन जाँचकर फिर प्रयास करें।",
      page: "हदीस"
    }
  };

  /* ---------- State ---------- */

  const state = {
    language: "bn",
    translationLanguage: "bn",
    books: [],
    currentBook: null,
    arabicHadith: [],
    translatedHadith: [],
    displayedHadith: [],
    currentHadithIndex: 0,
    editions: {},
    currentScreen: "books",
    searchQuery: "",
    bookRequestId: 0
  };

  /* ---------- DOM Helpers ---------- */

  const $ = (id) => document.getElementById(id);

  function setText(id, value) {
    const element = $(id);
    if (element) element.textContent = value;
  }

  function setVisible(id, visible) {
    const element = $(id);
    if (element) element.hidden = !visible;
  }

  function setHTML(id, html) {
    const element = $(id);
    if (element) element.innerHTML = html;
  }

  function safeText(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    return "";
  }

  function normaliseLanguage(language) {
    const value = String(language || "").toLowerCase();

    if (value.startsWith("bn") || value === "ben") return "bn";
    if (value.startsWith("hi") || value === "hin") return "hi";

    return "en";
  }

  function getInterfaceLanguage() {
    try {
      const settings = JSON.parse(
        localStorage.getItem("appSettings") || "{}"
      );

      return normaliseLanguage(settings.lang || "bn");
    } catch (_) {
      return "bn";
    }
  }

  function getDarkMode() {
    try {
      const settings = JSON.parse(
        localStorage.getItem("appSettings") || "{}"
      );

      return settings.dark === true;
    } catch (_) {
      return false;
    }
  }

  function getCurrentTexts() {
    return UI_TEXT[state.language] || UI_TEXT.bn;
  }

  /* ---------- Safe API Requests ---------- */

  async function fetchJSON(url) {
    let lastError;

    const urls = [
      url,
      url.replace(/\.json$/, ".min.json")
    ];

    for (const requestURL of urls) {
      try {
        const response = await fetch(requestURL, {
          method: "GET",
          cache: "default"
        });

        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }

        return await response.json();
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Unable to fetch data");
  }

  function editionURL(editionName) {
    return (
      API_BASE +
      "/editions/" +
      encodeURIComponent(editionName) +
      ".json"
    );
  }

  /* ---------- Edition Discovery ---------- */

  function getBookEditions(bookId) {
    const metadata = state.editions[bookId];

    if (!metadata || !Array.isArray(metadata.collection)) {
      return [];
    }

    return metadata.collection;
  }

  function findEdition(bookId, prefixes) {
    const editions = getBookEditions(bookId);

    for (const prefix of prefixes) {
      const found = editions.find((edition) => {
        const name = safeText(edition.name);

        return (
          name.toLowerCase() ===
          (prefix + "-" + bookId).toLowerCase()
        );
      });

      if (found) return found.name;
    }

    return null;
  }

  function getArabicEdition(bookId) {
    return findEdition(bookId, ["ara"]);
  }

  function getTranslationEdition(bookId, language) {
    const prefixes = {
      bn: ["ben"],
      en: ["eng"],
      hi: ["hin", "hindi"]
    };

    return findEdition(
      bookId,
      prefixes[language] || ["eng"]
    );
  }

  /* ---------- Book Names ---------- */

  function getBookName(book) {
    if (!book) return "";

    return (
      book[state.language] ||
      book.name ||
      book.id
    );
  }

  function getBookMetadataName(bookId) {
    const metadata = state.editions[bookId];

    return metadata && metadata.name
      ? metadata.name
      : "";
  }

  /* ---------- API Data Normalisation ---------- */

  function getHadithArray(data) {
    if (!data || typeof data !== "object") return [];

    if (Array.isArray(data.hadiths)) {
      return data.hadiths;
    }

    if (Array.isArray(data.data)) {
      return data.data;
    }

    if (Array.isArray(data.hadith)) {
      return data.hadith;
    }

    return [];
  }

  function getHadithNumber(row, index) {
    if (!row) return index + 1;

    return (
      row.hadithnumber ??
      row.hadithNumber ??
      row.number ??
      row.id ??
      index + 1
    );
  }

  function getHadithText(row) {
    if (!row) return "";

    if (typeof row.text === "string") {
      return row.text;
    }

    if (typeof row.hadith === "string") {
      return row.hadith;
    }

    if (typeof row.body === "string") {
      return row.body;
    }

    if (typeof row.english === "string") {
      return row.english;
    }

    return "";
  }

  function getReference(row) {
    if (!row || typeof row !== "object") return "";

    const parts = [];

    if (row.reference && typeof row.reference === "object") {
      if (row.reference.book) {
        parts.push("Book " + row.reference.book);
      }

      if (row.reference.hadith) {
        parts.push("Hadith " + row.reference.hadith);
      }
    }

    if (row.grades && Array.isArray(row.grades)) {
      row.grades.forEach((grade) => {
        if (grade && grade.grade) {
          parts.push("Grade: " + grade.grade);
        }
      });
    }

    if (row.grade && typeof row.grade === "string") {
      parts.push("Grade: " + row.grade);
    }

    return parts.join(" • ");
  }

  function makeHadithIndex(rows) {
    return rows.map((row, index) => ({
      number: getHadithNumber(row, index),
      text: getHadithText(row),
      reference: getReference(row),
      original: row
    }));
  }

  /* ---------- Screen Navigation ---------- */

  function showScreen(screenName) {
    const screens = {
      books: "booksScreen",
      list: "listScreen",
      detail: "detailScreen"
    };

    Object.entries(screens).forEach(([name, id]) => {
      const element = $(id);
      if (!element) return;

      const active = name === screenName;

      element.hidden = !active;
      element.classList.toggle("active", active);
    });

    state.currentScreen = screenName;

    if (screenName === "books") {
      setText("pageTitle", getCurrentTexts().title);
    } else if (screenName === "list" && state.currentBook) {
      setText("pageTitle", getBookName(state.currentBook));
    } else if (screenName === "detail") {
      setText("pageTitle", getCurrentTexts().page);
    }

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }

  function goBack() {
    if (state.currentScreen === "detail") {
      showScreen("list");
      return;
    }

    if (state.currentScreen === "list") {
      showScreen("books");
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "../index.html";
    }
  }

  /* ---------- Interface Language ---------- */

  function applyLanguage() {
    const t = getCurrentTexts();

    document.documentElement.lang = state.language;

    setText("pageTitle", t.title);
    setText("pageSubtitle", t.subtitle);
    setText("welcomeTitle", t.welcome);
    setText("welcomeDescription", t.welcomeDesc);
    setText("booksHeading", t.booksHeading);
    setText("loadingMessage", t.loadingBooks);
    setText("errorText", t.errorBooks);
    setText("retryButton", t.retry);
    setText("hadithSearch", "");

    const searchInput = $("hadithSearch");
    if (searchInput) {
      searchInput.placeholder = t.search;
      searchInput.setAttribute("aria-label", t.search);
    }

    setText("translationLabel", t.translation);
    setText("arabicHeading", t.arabic);
    setText("translationHeading", t.translated);
    setText("referenceHeading", t.reference);
    setText("footerText", t.footer);
    setText("languageButton", t.language);
    setText("previousHadithButton", t.previous);
    setText("nextHadithButton", t.next);
    setText("emptySearchMessage", t.noResults);
    setText("listLoadingMessage", t.loadingHadith);
    setText("listErrorText", t.errorHadith);
    setText("listRetryButton", t.retry);

    const select = $("translationLanguage");

    if (select) {
      const options = {
        bn: "বাংলা",
        en: "English",
        hi: "हिन्दी"
      };

      Array.from(select.options).forEach((option) => {
        if (options[option.value]) {
          option.textContent = options[option.value];
        }
      });
    }

    renderBooks();

    if (state.currentBook) {
      setText(
        "selectedBookTitle",
        getBookName(state.currentBook)
      );
    }

    if (state.currentScreen === "list") {
      renderHadithList();
    }

    if (state.currentScreen === "detail") {
      renderHadithDetail();
    }
  }

  function toggleLanguage() {
    const languages = ["bn", "en", "hi"];
    const index = languages.indexOf(state.language);

    state.language = languages[(index + 1) % languages.length];

    applyLanguage();
  }

  /* ---------- Render Book Cards ---------- */

  function renderBooks() {
    const container = $("bookGrid");
    if (!container) return;

    container.replaceChildren();

    setText("bookCount", String(state.books.length));

    state.books.forEach((book) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "book-card";
      button.setAttribute(
        "aria-label",
        getBookName(book)
      );

      const icon = document.createElement("span");
      icon.className = "book-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "▤";

      const title = document.createElement("h3");
      title.textContent = getBookName(book);

      const description = document.createElement("p");
      description.textContent =
        getBookMetadataName(book.id) ||
        book.name;

      button.append(icon, title, description);

      button.addEventListener("click", () => {
        openBook(book);
      });

      container.appendChild(button);
    });
  }

  /* ---------- Load Books ---------- */

  async function loadBooks() {
    setVisible("loadingMessage", true);
    setVisible("errorMessage", false);

    try {
      const data = await fetchJSON(
        API_BASE + "/editions.json"
      );

      if (!data || typeof data !== "object") {
        throw new Error("Invalid editions data");
      }

      state.editions = data;

      state.books = BOOKS.filter((book) => {
        const metadata = state.editions[book.id];

        return (
          metadata &&
          Array.isArray(metadata.collection) &&
          metadata.collection.length > 0
        );
      });

      if (!state.books.length) {
        throw new Error("No Hadith collections found");
      }

      renderBooks();
      setVisible("loadingMessage", false);
      setVisible("errorMessage", false);
    } catch (error) {
      console.error("Hadith books error:", error);

      setVisible("loadingMessage", false);
      setVisible("errorMessage", true);
    }
  }

  /* ---------- Load One Edition ---------- */

  async function loadEdition(editionName) {
    if (!editionName) return [];

    const data = await fetchJSON(
      editionURL(editionName)
    );

    return getHadithArray(data);
  }

  /* ---------- Open Book ---------- */

  async function openBook(book) {
    if (!book) return;

    const requestId = ++state.bookRequestId;

    state.currentBook = book;
    state.arabicHadith = [];
    state.translatedHadith = [];
    state.displayedHadith = [];
    state.currentHadithIndex = 0;
    state.searchQuery = "";

    const search = $("hadithSearch");
    if (search) search.value = "";

    setText("selectedBookTitle", getBookName(book));
    setText(
      "selectedBookDescription",
      getCurrentTexts().selectHadith
    );

    setHTML("hadithList", "");
    setVisible("listLoadingMessage", true);
    setVisible("listErrorMessage", false);
    setVisible("emptySearchMessage", false);

    showScreen("list");

    try {
      const arabicEdition = getArabicEdition(book.id);

      if (!arabicEdition) {
        throw new Error("Arabic edition unavailable");
      }

      const translationLanguage =
        state.translationLanguage;

      let translationEdition =
        getTranslationEdition(
          book.id,
          translationLanguage
        );

      if (!translationEdition) {
        translationEdition =
          getTranslationEdition(book.id, "en");
      }

      const arabicPromise = loadEdition(arabicEdition);

      const translationPromise = translationEdition
        ? loadEdition(translationEdition).catch((error) => {
            console.warn(
              "Translation could not be loaded:",
              error
            );

            return [];
          })
        : Promise.resolve([]);

      const [arabicRows, translationRows] =
        await Promise.all([
          arabicPromise,
          translationPromise
        ]);

      if (requestId !== state.bookRequestId) return;

      state.arabicHadith = makeHadithIndex(arabicRows);
      state.translatedHadith =
        makeHadithIndex(translationRows);

      if (!state.arabicHadith.length) {
        throw new Error("No Arabic Hadith data");
      }

      state.displayedHadith = state.arabicHadith;

      setVisible("listLoadingMessage", false);
      setVisible("listErrorMessage", false);

      renderHadithList();
    } catch (error) {
      if (requestId !== state.bookRequestId) return;

      console.error("Hadith loading error:", error);

      setVisible("listLoadingMessage", false);
      setVisible("listErrorMessage", true);
    }
  }

  /* ---------- Translation Lookup ---------- */

  function findTranslation(arabicItem) {
    if (!arabicItem) return null;

    const number = String(arabicItem.number);

    return (
      state.translatedHadith.find(
        (item) => String(item.number) === number
      ) || null
    );
  }

  function getDisplayText(item) {
    if (!item) return "";

    const translation = findTranslation(item);

    if (
      translation &&
      translation.text &&
      state.translationLanguage !== "ar"
    ) {
      return translation.text;
    }

    return "";
  }

  /* ---------- Render Hadith List ---------- */

  function renderHadithList() {
    const container = $("hadithList");
    if (!container) return;

    container.replaceChildren();

    const query = state.searchQuery
      .trim()
      .toLocaleLowerCase();

    const filtered = state.arabicHadith.filter((item) => {
      if (!query) return true;

      const translation = findTranslation(item);

      const searchable = [
        String(item.number),
        item.text,
        translation ? translation.text : ""
      ]
        .join(" ")
        .toLocaleLowerCase();

      return searchable.includes(query);
    });

    state.displayedHadith = filtered;

    setVisible(
      "emptySearchMessage",
      filtered.length === 0 &&
      !($("listLoadingMessage") &&
        !$("listLoadingMessage").hidden)
    );

    filtered.forEach((item) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "hadith-list-item";

      const number = document.createElement("span");
      number.className = "hadith-item-number";
      number.textContent =
        getCurrentTexts().hadithNo +
        " " +
        item.number;

      const preview = document.createElement("p");
      preview.className = "hadith-item-preview";

      const text =
        getDisplayText(item) ||
        item.text ||
        getCurrentTexts().unavailable;

      preview.textContent =
        text.length > 230
          ? text.slice(0, 230) + "…"
          : text;

      button.append(number, preview);

      button.addEventListener("click", () => {
        const index = state.arabicHadith.findIndex(
          (entry) =>
            String(entry.number) === String(item.number)
        );

        state.currentHadithIndex =
          Math.max(0, index);

        renderHadithDetail();
        showScreen("detail");
      });

      container.appendChild(button);
    });
  }

  /* ---------- Render Hadith Details ---------- */

  function renderHadithDetail() {
    const item =
      state.arabicHadith[state.currentHadithIndex];

    if (!item) return;

    const t = getCurrentTexts();
    const translation = findTranslation(item);

    setText(
      "detailBookName",
      getBookName(state.currentBook)
    );

    setText(
      "detailHeading",
      t.hadithNo + " " + item.number
    );

    setText(
      "detailHadithNumber",
      t.hadithNo + " " + item.number
    );

    setText(
      "arabicText",
      item.text || t.noArabic
    );

    const translatedText =
      translation && translation.text
        ? translation.text
        : t.unavailable;

    setText("translationText", translatedText);

    const referenceParts = [];

    if (state.currentBook) {
      referenceParts.push(
        getBookName(state.currentBook)
      );
    }

    referenceParts.push(
      t.hadithNo + " " + item.number
    );

    if (item.reference) {
      referenceParts.push(item.reference);
    }

    setText(
      "referenceText",
      referenceParts.join(" • ")
    );

    const previousButton = $("previousHadithButton");
    const nextButton = $("nextHadithButton");

    if (previousButton) {
      previousButton.disabled =
        state.currentHadithIndex <= 0;
    }

    if (nextButton) {
      nextButton.disabled =
        state.currentHadithIndex >=
        state.arabicHadith.length - 1;
    }
  }

  /* ---------- Previous / Next ---------- */

  function goToPreviousHadith() {
    if (state.currentHadithIndex <= 0) return;

    state.currentHadithIndex--;
    renderHadithDetail();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function goToNextHadith() {
    if (
      state.currentHadithIndex >=
      state.arabicHadith.length - 1
    ) {
      return;
    }

    state.currentHadithIndex++;
    renderHadithDetail();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /* ---------- Change Translation ---------- */

  async function changeTranslationLanguage() {
    const select = $("translationLanguage");
    if (!select || !state.currentBook) return;

    const requestedLanguage =
      normaliseLanguage(select.value);

    state.translationLanguage = requestedLanguage;

    const book = state.currentBook;
    const requestId = state.bookRequestId;

    let edition = getTranslationEdition(
      book.id,
      requestedLanguage
    );

    if (!edition && requestedLanguage !== "en") {
      edition = getTranslationEdition(book.id, "en");
    }

    if (!edition) {
      state.translatedHadith = [];
      renderHadithList();

      if (state.currentScreen === "detail") {
        renderHadithDetail();
      }

      return;
    }

    setVisible("listLoadingMessage", true);

    try {
      const rows = await loadEdition(edition);

      if (
        requestId !== state.bookRequestId ||
        state.currentBook.id !== book.id
      ) {
        return;
      }

      state.translatedHadith = makeHadithIndex(rows);

      setVisible("listLoadingMessage", false);

      renderHadithList();

      if (state.currentScreen === "detail") {
        renderHadithDetail();
      }
    } catch (error) {
      console.error("Translation loading error:", error);

      setVisible("listLoadingMessage", false);

      state.translatedHadith = [];
      renderHadithList();

      if (state.currentScreen === "detail") {
        renderHadithDetail();
      }
    }
  }

  /* ---------- Search ---------- */

  function handleSearch(event) {
    state.searchQuery = event.target.value || "";
    renderHadithList();
  }

  /* ---------- Retry ---------- */

  function retryBooks() {
    loadBooks();
  }

  function retryCurrentBook() {
    if (state.currentBook) {
      openBook(state.currentBook);
    }
  }

  /* ---------- Bind Events ---------- */

  function bindEvents() {
    const backButton = $("backButton");
    const languageButton = $("languageButton");
    const retryButton = $("retryButton");
    const listRetryButton = $("listRetryButton");
    const searchInput = $("hadithSearch");
    const translationSelect = $("translationLanguage");
    const previousButton = $("previousHadithButton");
    const nextButton = $("nextHadithButton");

    if (backButton) {
      backButton.addEventListener("click", goBack);
    }

    if (languageButton) {
      languageButton.addEventListener(
        "click",
        toggleLanguage
      );
    }

    if (retryButton) {
      retryButton.addEventListener(
        "click",
        retryBooks
      );
    }

    if (listRetryButton) {
      listRetryButton.addEventListener(
        "click",
        retryCurrentBook
      );
    }

    if (searchInput) {
      searchInput.addEventListener(
        "input",
        handleSearch
      );
    }

    if (translationSelect) {
      translationSelect.value =
        state.translationLanguage;

      translationSelect.addEventListener(
        "change",
        changeTranslationLanguage
      );
    }

    if (previousButton) {
      previousButton.addEventListener(
        "click",
        goToPreviousHadith
      );
    }

    if (nextButton) {
      nextButton.addEventListener(
        "click",
        goToNextHadith
      );
    }
  }

  /* ---------- Theme ---------- */

  function applySavedTheme() {
    if (getDarkMode()) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

  /* ---------- Initialise ---------- */

  async function init() {
    state.language = getInterfaceLanguage();
    state.translationLanguage = state.language;

    applySavedTheme();
    bindEvents();
    applyLanguage();

    const select = $("translationLanguage");

    if (select) {
      select.value = state.translationLanguage;
    }

    await loadBooks();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();
