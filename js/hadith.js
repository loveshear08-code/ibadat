(() => {
  "use strict";

  const API_BASE =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1";

  const $ = (id) => document.getElementById(id);

  const page = document.querySelector(".hadith-page");

  const BOOKS = [
    {
      id: "bukhari",
      icon: "📗",
      names: { bn: "সহিহ বুখারি", en: "Sahih al-Bukhari", hi: "सहीह बुखारी" },
      descriptions: { bn: "ইমাম বুখারি", en: "Imam Bukhari", hi: "इमाम बुखारी" }
    },
    {
      id: "muslim",
      icon: "📘",
      names: { bn: "সহিহ মুসলিম", en: "Sahih Muslim", hi: "सहीह मुस्लिम" },
      descriptions: { bn: "ইমাম মুসলিম", en: "Imam Muslim", hi: "इमाम मुस्लिम" }
    },
    {
      id: "abudawud",
      icon: "📙",
      names: { bn: "সুনান আবু দাউদ", en: "Sunan Abu Dawud", hi: "सुनन अबू दाऊद" },
      descriptions: { bn: "সুনান সংকলন", en: "Hadith collection", hi: "हदीस संग्रह" }
    },
    {
      id: "tirmidhi",
      icon: "📕",
      names: { bn: "জামে আত-তিরমিজি", en: "Jami at-Tirmidhi", hi: "जामे तिर्मिज़ी" },
      descriptions: { bn: "ইমাম তিরমিজি", en: "Imam Tirmidhi", hi: "इमाम तिर्मिज़ी" }
    },
    {
      id: "nasai",
      icon: "📔",
      names: { bn: "সুনান আন-নাসাঈ", en: "Sunan an-Nasa'i", hi: "सुनन नसाई" },
      descriptions: { bn: "ইমাম নাসাঈ", en: "Imam Nasa'i", hi: "इमाम नसाई" }
    },
    {
      id: "ibnmajah",
      icon: "📚",
      names: { bn: "সুনান ইবনে মাজাহ", en: "Sunan Ibn Majah", hi: "सुनन इबনে মাজাহ" },
      descriptions: { bn: "ইমাম ইবনে মাজাহ", en: "Ibn Majah", hi: "इबনে মাজाह" }
    },
    {
      id: "malik",
      icon: "📖",
      names: { bn: "মুয়াত্তা ইমাম মালিক", en: "Muwatta Malik", hi: "मुवत्ता इमाम मालिक" },
      descriptions: { bn: "ইমাম মালিক", en: "Imam Malik", hi: "इमाम मालिक" }
    },
    {
      id: "nawawi",
      icon: "📜",
      names: { bn: "ইমাম নববীর ৪০ হাদিস", en: "Nawawi's 40 Hadith", hi: "इमाम नववी की 40 हदीस" },
      descriptions: { bn: "নির্বাচিত হাদিস", en: "Selected hadith", hi: "चुनी हुई हदीस" }
    }
  ];

  const TEXT = {
    bn: {
      pageTitle: "হাদিস সংকলন",
      pageSubtitle: "হাদিস পড়ুন, শিক্ষা গ্রহণ করুন",
      booksHeading: "হাদিসের বই",
      loadingBooks: "হাদিসের বই লোড হচ্ছে...",
      booksError: "হাদিসের বই লোড করা যায়নি।",
      retry: "আবার চেষ্টা করুন",
      search: "হাদিস খুঁজুন...",
      searchLabel: "হাদিস খুঁজুন",
      loadingHadith: "হাদিস লোড হচ্ছে...",
      hadithError: "হাদিস লোড করা যায়নি।",
      empty: "কোনো হাদিস পাওয়া যায়নি।",
      backBooks: "বইসমূহ",
      backList: "হাদিসের তালিকা",
      detail: "হাদিসের বিবরণ",
      arabic: "আরবি",
      translation: "অনুবাদ",
      reference: "রেফারেন্স",
      hadithNumber: "হাদিস নম্বর",
      previous: "আগের",
      next: "পরের",
      footer: "পড়ুন • চিন্তা করুন • আমল করুন",
      noArabic: "আরবি পাঠ পাওয়া যায়নি।",
      noTranslation: "এই ভাষায় অনুবাদ পাওয়া যায়নি।",
      noReference: "রেফারেন্স পাওয়া যায়নি।",
      loadFailed: "হাদিস লোড করতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
    },
    en: {
      pageTitle: "Hadith Collection",
      pageSubtitle: "Read Hadith, gain knowledge",
      booksHeading: "Hadith Books",
      loadingBooks: "Loading hadith books...",
      booksError: "Could not load the book list.",
      retry: "Try again",
      search: "Search hadith...",
      searchLabel: "Search hadith",
      loadingHadith: "Loading hadith...",
      hadithError: "Could not load hadith.",
      empty: "No hadith found.",
      backBooks: "Books",
      backList: "Hadith list",
      detail: "Hadith Details",
      arabic: "Arabic",
      translation: "Translation",
      reference: "Reference",
      hadithNumber: "Hadith number",
      previous: "Previous",
      next: "Next",
      footer: "Read • Reflect • Practise",
      noArabic: "Arabic text is unavailable.",
      noTranslation: "Translation is unavailable in this language.",
      noReference: "Reference unavailable.",
      loadFailed: "Unable to load hadith. Check your internet connection and try again."
    },
    hi: {
      pageTitle: "हदीस संग्रह",
      pageSubtitle: "हदीस पढ़ें, ज्ञान प्राप्त करें",
      booksHeading: "हदीस की किताबें",
      loadingBooks: "हदीस की किताबें लोड हो रही हैं...",
      booksError: "किताबों की सूची लोड नहीं हो सकी।",
      retry: "फिर से कोशिश करें",
      search: "हदीस खोजें...",
      searchLabel: "हदीस खोजें",
      loadingHadith: "हदीस लोड हो रही हैं...",
      hadithError: "हदीस लोड नहीं हो सकीं।",
      empty: "कोई हदीस नहीं मिली।",
      backBooks: "किताबें",
      backList: "हदीस सूची",
      detail: "हदीस विवरण",
      arabic: "अरबी",
      translation: "अनुवाद",
      reference: "संदर्भ",
      hadithNumber: "हदीस संख्या",
      previous: "पिछली",
      next: "अगली",
      footer: "पढ़ें • विचार करें • अमल करें",
      noArabic: "अरबी पाठ उपलब्ध नहीं है।",
      noTranslation: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      noReference: "संदर्भ उपलब्ध नहीं है।",
      loadFailed: "हदीस लोड नहीं हो सकीं। इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।"
    }
  };

  const state = {
    lang: "bn",
    dark: false,
    theme: "classic",
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

  const safeParse = (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return {};
    }
  };

  function getSettings() {
    const app = safeParse(localStorage.getItem("appSettings") || "{}");
    const ibadat = safeParse(localStorage.getItem("ibadatSettings") || "{}");
    return { ...app, ...ibadat };
  }

  function normalizeLanguage(value) {
    const lang = String(value || "bn").toLowerCase();

    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("hi")) return "hi";
    return "bn";
  }

  function applySettings() {
    const settings = getSettings();

    const language =
      settings.language ??
      settings.lang ??
      settings.selectedLanguage ??
      settings.appLanguage;

    state.lang = normalizeLanguage(language);

    const darkValue =
      settings.darkMode ??
      settings.dark ??
      settings.isDarkMode ??
      settings.isDark;

    if (typeof darkValue === "boolean") {
      state.dark = darkValue;
    } else if (typeof darkValue === "string") {
      state.dark = darkValue === "true";
    }

    const themeValue =
      settings.themeColor ??
      settings.colorTheme ??
      settings.theme ??
      "classic";

    const allowedThemes = ["classic", "royal", "rose", "pista"];

    state.theme = allowedThemes.includes(String(themeValue).toLowerCase())
      ? String(themeValue).toLowerCase()
      : "classic";

    document.documentElement.lang = state.lang;
    document.body.classList.toggle("dark-mode", state.dark);
    document.body.dataset.colorTheme = state.theme;

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      const colors = {
        classic: "#123d2c",
        royal: "#26356f",
        rose: "#703447",
        pista: "#365a3d"
      };
      metaTheme.content = colors[state.theme];
    }
  }

  function t(key) {
    return TEXT[state.lang][key] ?? TEXT.bn[key] ?? key;
  }

  function localized(book, key) {
    return book?.[key]?.[state.lang] ?? book?.[key]?.bn ?? "";
  }

  function getBookName(book) {
    return localized(book, "names");
  }

  function updateStaticText() {
    $("booksHeading").textContent = t("booksHeading");
    $("loadingMessage").textContent = t("loadingBooks");
    $("errorText").textContent = t("booksError");
    $("retryButton").textContent = t("retry");

    $("hadithSearch").placeholder = t("search");
    $("hadithSearch").setAttribute("aria-label", t("searchLabel"));

    $("listLoadingMessage").textContent = t("loadingHadith");
    $("listErrorText").textContent = t("hadithError");
    $("listRetryButton").textContent = t("retry");
    $("emptySearchMessage").textContent = t("empty");

    $("backToBooksText").textContent = t("backBooks");
    $("backToListText").textContent = t("backList");

    $("detailHeading").textContent = t("detail");
    $("arabicHeading").textContent = t("arabic");
    $("translationHeading").textContent = t("translation");
    $("referenceHeading").textContent = t("reference");

    $("previousText").textContent = t("previous");
    $("nextText").textContent = t("next");
    $("footerText").textContent = t("footer");

    if (state.currentScreen === "books") {
      $("pageTitle").textContent = t("pageTitle");
      $("pageSubtitle").textContent = t("pageSubtitle");
    } else if (state.currentBook) {
      $("pageTitle").textContent = getBookName(state.currentBook);
      $("pageSubtitle").textContent =
        state.currentScreen === "detail" ? t("detail") : t("booksHeading");
    }
  }

  function showScreen(name, pushHistory = true) {
    state.currentScreen = name;
    page.dataset.screen = name;

    const screens = {
      books: $("booksScreen"),
      list: $("listScreen"),
      detail: $("detailScreen")
    };

    Object.entries(screens).forEach(([key, element]) => {
      const active = key === name;
      element.hidden = !active;
      element.classList.toggle("active", active);
    });

    if (pushHistory) {
      try {
        history.pushState({ hadithScreen: name }, "", `#${name}`);
      } catch {
        // History API unavailable; keep the page functional.
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

  async function fetchJson(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "default"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  function normalizeArray(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.hadiths)) return data.hadiths;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.collection)) return data.collection;
    return [];
  }

  function normalizeEdition(item) {
    if (!item || typeof item !== "object") return null;

    const name = String(
      item.name ??
      item.edition ??
      item.id ??
      item.collection ??
      ""
    );

    const collection = String(
      item.collection ??
      item.book ??
      item.bookName ??
      ""
    );

    const language = String(
      item.language ??
      item.lang ??
      ""
    ).toLowerCase();

    return {
      ...item,
      name,
      collection,
      language,
      raw: item
    };
  }

  function editionLanguage(edition) {
    return String(
      edition?.language ??
      edition?.lang ??
      edition?.name?.split(".").pop() ??
      ""
    ).toLowerCase();
  }

  function editionMatchesBook(edition, bookId) {
    const collection = String(
      edition?.collection ??
      edition?.book ??
      edition?.bookName ??
      ""
    ).toLowerCase();

    const name = String(edition?.name ?? edition?.id ?? "").toLowerCase();

    return (
      collection === bookId.toLowerCase() ||
      collection.includes(bookId.toLowerCase()) ||
      name.startsWith(`${bookId}.`) ||
      name.includes(`/${bookId}.`) ||
      name.includes(bookId.toLowerCase())
    );
  }

  function editionUrl(edition) {
    const direct = edition?.link ?? edition?.url;

    if (direct && /^https?:\/\//i.test(direct)) {
      return direct;
    }

    const name = String(edition?.name ?? edition?.id ?? "").trim();

    if (!name) return "";

    if (name.endsWith(".json") && /^https?:\/\//i.test(name)) {
      return name;
    }

    return `${API_BASE}/editions/${encodeURIComponent(name)}.json`;
  }

  async function loadEditions() {
    if (state.editions.length) return state.editions;

    const possibleUrls = [
      `${API_BASE}/editions.json`,
      `${API_BASE}/editions.min.json`
    ];

    let lastError;

    for (const url of possibleUrls) {
      try {
        const data = await fetchJson(url);
        let items = [];

        if (Array.isArray(data)) {
          items = data;
        } else if (data && typeof data === "object") {
          if (Array.isArray(data.data)) {
            items = data.data;
          } else {
            items = Object.entries(data).flatMap(([key, value]) => {
              if (Array.isArray(value)) {
                return value.map((item) => ({
                  ...item,
                  collection: item.collection ?? key
                }));
              }

              if (value && typeof value === "object") {
                return [{
                  ...value,
                  collection: value.collection ?? key,
                  name: value.name ?? value.edition ?? key
                }];
              }

              return [];
            });
          }
        }

        state.editions = items
          .map(normalizeEdition)
          .filter(Boolean);

        if (state.editions.length) {
          return state.editions;
        }
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Edition list unavailable");
  }

  function findEdition(bookId, language) {
    const all = state.editions.filter((edition) =>
      editionMatchesBook(edition, bookId)
    );

    return all.find((edition) => {
      const lang = editionLanguage(edition);
      return lang === language || lang.startsWith(`${language}-`);
    }) || null;
  }

  function findArabicEdition(bookId) {
    const all = state.editions.filter((edition) =>
      editionMatchesBook(edition, bookId)
    );

    return all.find((edition) => {
      const lang = editionLanguage(edition);
      const name = String(edition.name || "").toLowerCase();

      return (
        lang === "ara" ||
        lang === "ar" ||
        lang.startsWith("ar-") ||
        name.endsWith(".ara") ||
        name.endsWith(".ar")
      );
    }) || null;
  }

  function extractText(item) {
    if (typeof item === "string") return item;
    if (!item || typeof item !== "object") return "";

    return String(
      item.text ??
      item.hadith ??
      item.arabic ??
      item.translation ??
      item.body ??
      item.content ??
      ""
    );
  }

  function extractNumber(item, fallbackIndex) {
    const value =
      item?.hadithnumber ??
      item?.hadithNumber ??
      item?.number ??
      item?.id ??
      fallbackIndex + 1;

    return String(value);
  }

  function extractReference(item) {
    if (!item || typeof item !== "object") return "";

    const candidates = [
      item.reference,
      item.references,
      item.book,
      item.chapter,
      item.source
    ];

    for (const candidate of candidates) {
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate.trim();
      }

      if (Array.isArray(candidate) && candidate.length) {
        return candidate.map((part) => {
          if (typeof part === "string") return part;
          return JSON.stringify(part);
        }).join(" • ");
      }

      if (candidate && typeof candidate === "object") {
        const text = Object.values(candidate)
          .filter((value) => value !== null && value !== undefined)
          .map(String)
          .join(" • ");

        if (text) return text;
      }
    }

    return "";
  }

  function normalizeHadithItems(data) {
    const items = normalizeArray(data);

    return items.map((item, index) => ({
      number: extractNumber(item, index),
      text: extractText(item),
      reference: extractReference(item),
      original: item
    }));
  }

  function mergeHadith(arabicItems, translatedItems) {
    const count = Math.max(arabicItems.length, translatedItems.length);

    return Array.from({ length: count }, (_, index) => {
      const arabic = arabicItems[index] || {};
      const translated = translatedItems[index] || {};

      return {
        number: translated.number || arabic.number || String(index + 1),
        arabic: arabic.text || "",
        translation: translated.text || "",
        reference: translated.reference || arabic.reference || "",
        arabicOriginal: arabic.original || null,
        translationOriginal: translated.original || null
      };
    });
  }

  function renderBooks() {
    const grid = $("bookGrid");
    grid.replaceChildren();

    $("bookCount").textContent = String(BOOKS.length);

    BOOKS.forEach((book) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "book-card";
      button.setAttribute("aria-label", getBookName(book));

      const icon = document.createElement("span");
      icon.className = "book-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = book.icon;

      const name = document.createElement("span");
      name.className = "book-name";
      name.textContent = getBookName(book);

      const description = document.createElement("span");
      description.className = "book-description";
      description.textContent = localized(book, "descriptions");

      button.append(icon, name, description);
      button.addEventListener("click", () => openBook(book));

      grid.appendChild(button);
    });
  }

  function setLoadingBooks(loading) {
    state.loadingBooks = loading;
    $("loadingMessage").hidden = !loading;
    $("errorMessage").hidden = true;
  }

  async function initializeBooks() {
    const request = ++state.booksRequestId;
    setLoadingBooks(true);

    try {
      await loadEditions();

      if (request !== state.booksRequestId) return;

      $("errorMessage").hidden = true;
    } catch {
      if (request !== state.booksRequestId) return;

      // বইয়ের তালিকা স্থানীয়ভাবেই দেখানো হবে।
      $("errorMessage").hidden = true;
    } finally {
      if (request === state.booksRequestId) {
        setLoadingBooks(false);
        renderBooks();
      }
    }
  }

  async function openBook(book) {
    state.currentBook = book;
    state.searchQuery = "";
    state.currentHadithIndex = 0;

    $("hadithSearch").value = "";
    state.arabicHadith = [];
    state.translatedHadith = [];
    state.displayedHadith = [];

    showScreen("list");
    await loadHadith();
  }

  async function loadHadith() {
    if (!state.currentBook) return;

    const request = ++state.requestId;
    state.loadingHadith = true;

    $("listLoadingMessage").hidden = false;
    $("listErrorMessage").hidden = true;
    $("emptySearchMessage").hidden = true;
    $("hadithList").replaceChildren();

    try {
      await loadEditions();

      if (request !== state.requestId) return;

      const bookId = state.currentBook.id;

      const arabicEdition = findArabicEdition(bookId);
      const translationEdition = findEdition(bookId, state.lang);

      if (!arabicEdition && !translationEdition) {
        throw new Error("No suitable editions found");
      }

      const requests = [];

      requests.push(
        arabicEdition
          ? fetchJson(editionUrl(arabicEdition))
          : Promise.resolve(null)
      );

      requests.push(
        translationEdition
          ? fetchJson(editionUrl(translationEdition))
          : Promise.resolve(null)
      );

      const [arabicData, translationData] = await Promise.all(requests);

      if (request !== state.requestId) return;

      state.arabicHadith = arabicData
        ? normalizeHadithItems(arabicData)
        : [];

      state.translatedHadith = translationData
        ? normalizeHadithItems(translationData)
        : [];

      state.displayedHadith = mergeHadith(
        state.arabicHadith,
        state.translatedHadith
      );

      state.currentHadithIndex = 0;

      $("listErrorMessage").hidden = true;
      renderHadithList();
    } catch (error) {
      if (request !== state.requestId) return;

      $("listErrorText").textContent = t("loadFailed");
      $("listErrorMessage").hidden = false;
      $("hadithList").replaceChildren();
      $("emptySearchMessage").hidden = true;
    } finally {
      if (request === state.requestId) {
        state.loadingHadith = false;
        $("listLoadingMessage").hidden = true;
      }
    }
  }

  function normalizeSearchText(value) {
    return String(value || "")
      .toLocaleLowerCase(state.lang)
      .normalize("NFKC")
      .trim();
  }

  function renderHadithList() {
    const list = $("hadithList");
    list.replaceChildren();

    if (!state.currentBook) return;

    const query = normalizeSearchText(state.searchQuery);

    const filtered = state.displayedHadith
      .map((hadith, index) => ({ hadith, index }))
      .filter(({ hadith }) => {
        if (!query) return true;

        const haystack = normalizeSearchText([
          hadith.number,
          hadith.arabic,
          hadith.translation,
          hadith.reference
        ].join(" "));

        return haystack.includes(query);
      });

    $("emptySearchMessage").hidden =
      filtered.length !== 0 ||
      state.loadingHadith ||
      !$("listErrorMessage").hidden;

    filtered.forEach(({ hadith, index }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hadith-list-item";

      const number = document.createElement("span");
      number.className = "list-item-number";
      number.textContent = hadith.number;

      const content = document.createElement("span");
      content.className = "list-item-content";

      if (hadith.arabic) {
        const arabic = document.createElement("span");
        arabic.className = "list-item-arabic";
        arabic.lang = "ar";
        arabic.dir = "rtl";
        arabic.textContent = hadith.arabic;
        content.appendChild(arabic);
      }

      const translation = document.createElement("span");
      translation.className = "list-item-translation";
      translation.textContent =
        hadith.translation || t("noTranslation");
      content.appendChild(translation);

      if (hadith.reference) {
        const reference = document.createElement("span");
        reference.className = "list-item-reference";
        reference.textContent = hadith.reference;
        content.appendChild(reference);
      }

      button.append(number, content);

      button.addEventListener("click", () => {
        state.currentHadithIndex = index;
        showScreen("detail");
      });

      list.appendChild(button);
    });
  }

  function renderHadithDetail() {
    const hadith = state.displayedHadith[state.currentHadithIndex];

    if (!hadith) {
      $("detailBookName").textContent = state.currentBook
        ? getBookName(state.currentBook)
        : t("detail");

      $("detailHadithNumber").textContent = t("hadithNumber");
      $("arabicText").textContent = t("noArabic");
      $("translationText").textContent = t("noTranslation");
      $("referenceText").textContent = t("noReference");

      $("previousHadithButton").disabled = true;
      $("nextHadithButton").disabled = true;
      return;
    }

    $("detailBookName").textContent = getBookName(state.currentBook);

    $("detailHadithNumber").textContent =
      `${t("hadithNumber")}: ${hadith.number}`;

    $("arabicText").textContent = hadith.arabic || t("noArabic");
    $("translationText").textContent =
      hadith.translation || t("noTranslation");

    const hasReference = Boolean(hadith.reference);

    $("referenceSection").hidden = !hasReference;
    $("referenceDivider").hidden = !hasReference;
    $("referenceText").textContent =
      hadith.reference || t("noReference");

    $("previousHadithButton").disabled =
      state.currentHadithIndex <= 0;

    $("nextHadithButton").disabled =
      state.currentHadithIndex >= state.displayedHadith.length - 1;
  }

  function goToPreviousHadith() {
    if (state.currentHadithIndex <= 0) return;

    state.currentHadithIndex -= 1;
    renderHadithDetail();

    $("detailScreen").scrollTop = 0;
  }

  function goToNextHadith() {
    if (state.currentHadithIndex >= state.displayedHadith.length - 1) {
      return;
    }

    state.currentHadithIndex += 1;
    renderHadithDetail();

    $("detailScreen").scrollTop = 0;
  }

  function backToBooks() {
    state.requestId += 1;
    state.currentBook = null;
    state.searchQuery = "";
    showScreen("books");
  }

  function backToList() {
    showScreen("list");
  }

  function handleBackNavigation() {
    if (state.currentScreen === "detail") {
      backToList();
    } else if (state.currentScreen === "list") {
      backToBooks();
    }
  }

  function refreshSettings() {
    const oldLanguage = state.lang;
    const oldTheme = state.theme;
    const oldDark = state.dark;

    applySettings();
    updateStaticText();

    if (
      oldLanguage !== state.lang ||
      oldTheme !== state.theme ||
      oldDark !== state.dark
    ) {
      renderBooks();

      if (state.currentBook && state.currentScreen !== "books") {
        // ভাষা পরিবর্তন হলে নতুন অনুবাদ লোড হবে।
        if (oldLanguage !== state.lang) {
          state.editions = [];
          loadHadith();
        } else if (state.currentScreen === "list") {
          renderHadithList();
        } else {
          renderHadithDetail();
        }
      }
    }
  }

  function bindEvents() {
    $("retryButton").addEventListener("click", initializeBooks);

    $("listRetryButton").addEventListener("click", loadHadith);

    $("hadithSearch").addEventListener("input", (event) => {
      state.searchQuery = event.target.value;
      renderHadithList();
    });

    $("backToBooksButton").addEventListener("click", backToBooks);
    $("backToListButton").addEventListener("click", backToList);

    $("previousHadithButton").addEventListener(
      "click",
      goToPreviousHadith
    );

    $("nextHadithButton").addEventListener(
      "click",
      goToNextHadith
    );

    window.addEventListener("storage", (event) => {
      if (
        event.key === "appSettings" ||
        event.key === "ibadatSettings"
      ) {
        refreshSettings();
      }
    });

    window.addEventListener("pageshow", () => {
      refreshSettings();
    });

    window.addEventListener("popstate", () => {
      handleBackNavigation();
    });

    // Android WebView বা অ্যাপের ব্যাক ইভেন্ট সমর্থনের চেষ্টা।
    document.addEventListener("backbutton", (event) => {
      if (state.currentScreen !== "books") {
        event.preventDefault?.();
        handleBackNavigation();
      }
    });
  }

  function init() {
    applySettings();
    updateStaticText();
    renderBooks();
    bindEvents();

    showScreen("books", false);
    initializeBooks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
