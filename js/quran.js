
(() => {
  "use strict";

  /* =========================================
     IBADAT - QURAN MODULE
     Compatible with quran.html and quran.css
  ========================================= */

  const API_BASE = "https://api.alquran.cloud/v1";
  const ARABIC_EDITION = "quran-uthmani";
  const AUDIO_BASE =
    "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/";

  const $ = (id) => document.getElementById(id);

  const translations = {
    bn: {
      appTitle: "IBADAT | আল-কুরআন",
      homeHeading: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      homeSubtitle: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে",
      readHeading: "কুরআন পড়ুন",
      readSubtitle: "কুরআন পড়ুন, প্রশান্তি অনুভব করুন",
      listenHeading: "তিলাওয়াত শুনুন",
      listenSubtitle: "তিলাওয়াত শুনুন ও প্রশান্তি অনুভব করুন",
      quranTitle: "আল-কুরআন",
      quranDescription: "পবিত্র কুরআন পড়ুন, শুনুন এবং প্রশান্তি অনুভব করুন।",
      readOption: "কুরআন পড়ুন",
      listenOption: "তিলাওয়াত শুনুন",
      homeFooter: "আল-কুরআন — হেদায়েত ও প্রশান্তির আলো",
      readFooter: "কুরআন পড়ুন, প্রশান্তি অনুভব করুন",
      searchHeading: "সূরা খুঁজুন",
      searchPlaceholder: "সূরার নাম লিখুন...",
      loadingRead: "কুরআনের আয়াত লোড হচ্ছে...",
      loadingListen: "সূরার তালিকা লোড হচ্ছে...",
      noResults: "কোনো সূরা পাওয়া যায়নি।",
      loadError: "তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      previous: "আগের সূরা",
      next: "পরের সূরা",
      play: "তিলাওয়াত চালান",
      pause: "তিলাওয়াত থামান",
      audioError: "অডিও চালানো যায়নি। আবার চেষ্টা করুন।",
      beginning: "এটাই প্রথম সূরা।",
      end: "এটাই শেষ সূরা।",
      surah: "সূরা",
      backHome: "কুরআনের মূল পেজে ফিরে এসেছেন।"
    },

    en: {
      appTitle: "IBADAT | Al-Quran",
      homeHeading: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      homeSubtitle: "In the name of Allah, the Most Compassionate, the Most Merciful",
      readHeading: "Read Quran",
      readSubtitle: "Read Quran, feel tranquility",
      listenHeading: "Listen to Recitation",
      listenSubtitle: "Listen to recitation and feel tranquility",
      quranTitle: "Al-Quran",
      quranDescription: "Read the Holy Quran, listen to it, and feel tranquility.",
      readOption: "Read Quran",
      listenOption: "Listen",
      homeFooter: "Al-Quran — A light of guidance and tranquility",
      readFooter: "Read Quran, feel tranquility",
      searchHeading: "Find a Surah",
      searchPlaceholder: "Enter a Surah name...",
      loadingRead: "Loading Quran verses...",
      loadingListen: "Loading Surah list...",
      noResults: "No Surahs found.",
      loadError: "Could not load the content. Check your internet connection and try again.",
      previous: "Previous Surah",
      next: "Next Surah",
      play: "Play recitation",
      pause: "Pause recitation",
      audioError: "Unable to play audio. Please try again.",
      beginning: "This is the first Surah.",
      end: "This is the last Surah.",
      surah: "Surah",
      backHome: "Returned to the Quran home page."
    },

    hi: {
      appTitle: "IBADAT | अल-क़ुरआन",
      homeHeading: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      homeSubtitle: "परम कृपाशील, अत्यंत दयावान अल्लाह के नाम से",
      readHeading: "क़ुरआन पढ़ें",
      readSubtitle: "क़ुरआन पढ़ें, सुकून महसूस करें",
      listenHeading: "तिलावत सुनें",
      listenSubtitle: "तिलावत सुनें और सुकून महसूस करें",
      quranTitle: "अल-क़ुरआन",
      quranDescription: "पवित्र क़ुरआन पढ़ें, सुनें और सुकून महसूस करें।",
      readOption: "क़ुरआन पढ़ें",
      listenOption: "तिलावत सुनें",
      homeFooter: "अल-क़ुरआन — मार्गदर्शन और सुकून की रोशनी",
      readFooter: "क़ुरआन पढ़ें, सुकून महसूस करें",
      searchHeading: "सूरह खोजें",
      searchPlaceholder: "सूरह का नाम लिखें...",
      loadingRead: "क़ुरआन की आयतें लोड हो रही हैं...",
      loadingListen: "सूरह की सूची लोड हो रही है...",
      noResults: "कोई सूरह नहीं मिली।",
      loadError: "सामग्री लोड नहीं हुई। इंटरनेट जाँचकर फिर कोशिश करें।",
      previous: "पिछली सूरह",
      next: "अगली सूरह",
      play: "तिलावत चलाएँ",
      pause: "तिलावत रोकें",
      audioError: "ऑडियो नहीं चल सका। फिर कोशिश करें।",
      beginning: "यह पहली सूरह है।",
      end: "यह आख़िरी सूरह है।",
      surah: "सूरह",
      backHome: "क़ुरआन के मुख्य पेज पर लौट आए।"
    }
  };

  const surahNames = {
    bn: [
      "আল-ফাতিহা", "আল-বাকারা", "আলে ইমরান", "আন-নিসা",
      "আল-মায়িদা", "আল-আনআম", "আল-আরাফ", "আল-আনফাল",
      "আত-তাওবা", "ইউনুস", "হুদ", "ইউসুফ", "আর-রাদ",
      "ইবরাহিম", "আল-হিজর", "আন-নাহল", "আল-ইসরা",
      "আল-কাহফ", "মারইয়াম", "ত্ব-হা", "আল-আম্বিয়া",
      "আল-হজ", "আল-মুমিনুন", "আন-নূর", "আল-ফুরকান",
      "আশ-শুআরা", "আন-নামল", "আল-কাসাস", "আল-আনকাবুত",
      "আর-রূম", "লুকমান", "আস-সাজদা", "আল-আহযাব",
      "সাবা", "ফাতির", "ইয়াসিন", "আস-সাফফাত", "সাদ",
      "আয-যুমার", "গাফির", "ফুসসিলাত", "আশ-শূরা",
      "আয-যুখরুফ", "আদ-দুখান", "আল-জাসিয়া", "আল-আহকাফ",
      "মুহাম্মদ", "আল-ফাতহ", "আল-হুজুরাত", "কাফ",
      "আয-যারিয়াত", "আত-তূর", "আন-নাজম", "আল-কামার",
      "আর-রহমান", "আল-ওয়াকিয়া", "আল-হাদিদ", "আল-মুজাদিলা",
      "আল-হাশর", "আল-মুমতাহিনা", "আস-সাফ", "আল-জুমুআ",
      "আল-মুনাফিকুন", "আত-তাগাবুন", "আত-তালাক", "আত-তাহরিম",
      "আল-মুলক", "আল-কলম", "আল-হাক্কাহ", "আল-মাআরিজ",
      "নূহ", "আল-জিন", "আল-মুযযাম্মিল", "আল-মুদ্দাসসির",
      "আল-কিয়ামাহ", "আল-ইনসান", "আল-মুরসালাত", "আন-নাবা",
      "আন-নাযিআত", "আবাসা", "আত-তাকভির", "আল-ইনফিতার",
      "আল-মুতাফফিফিন", "আল-ইনশিকাক", "আল-বুরুজ", "আত-তারিক",
      "আল-আলা", "আল-গাশিয়াহ", "আল-ফজর", "আল-বালাদ",
      "আশ-শামস", "আল-লাইল", "আদ-দুহা", "আশ-শারহ",
      "আত-তিন", "আল-আলাক", "আল-কদর", "আল-বাইয়্যিনাহ",
      "আয-যিলযাল", "আল-আদিয়াত", "আল-কারিআহ", "আত-তাকাসুর",
      "আল-আসর", "আল-হুমাযাহ", "আল-ফিল", "কুরাইশ",
      "আল-মাউন", "আল-কাউসার", "আল-কাফিরুন", "আন-নাসর",
      "আল-মাসাদ", "আল-ইখলাস", "আল-ফালাক", "আন-নাস"
    ],

    en: [
      "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa",
      "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal",
      "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd",
      "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra",
      "Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbya",
      "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan",
      "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut",
      "Ar-Rum", "Luqman", "As-Sajdah", "Al-Ahzab",
      "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad",
      "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura",
      "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf",
      "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf",
      "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar",
      "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", "Al-Mujadilah",
      "Al-Hashr", "Al-Mumtahanah", "As-Saff", "Al-Jumu'ah",
      "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim",
      "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij",
      "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir",
      "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba",
      "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar",
      "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq",
      "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad",
      "Ash-Shams", "Al-Layl", "Ad-Duha", "Ash-Sharh",
      "At-Tin", "Al-Alaq", "Al-Qadr", "Al-Bayyinah",
      "Az-Zalzalah", "Al-Adiyat", "Al-Qari'ah", "At-Takathur",
      "Al-Asr", "Al-Humazah", "Al-Fil", "Quraysh",
      "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr",
      "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
    ],

    hi: [
      "अल-फ़ातिहा", "अल-बक़रा", "आले-इमरान", "अन-निसा",
      "अल-माइदा", "अल-अनआम", "अल-आराफ़", "अल-अनफ़ाल",
      "अत-तौबा", "यूनुस", "हूद", "यूसुफ़", "अर-रअद",
      "इब्राहीम", "अल-हिज्र", "अन-नहल", "अल-इसरा",
      "अल-कहफ़", "मरयम", "ता-हा", "अल-अंबिया",
      "अल-हज्ज", "अल-मुमिनून", "अन-नूर", "अल-फ़ुरकान",
      "अश-शुअरा", "अन-नम्ल", "अल-क़सस", "अल-अंकबूत",
      "अर-रूम", "लुक़मान", "अस-सज्दा", "अल-अहज़ाब",
      "सबा", "फ़ातिर", "या-सीन", "अस-साफ़्फ़ात", "साद",
      "अज़-ज़ुमर", "ग़ाफ़िर", "फ़ुस्सिलत", "अश-शूरा",
      "अज़-ज़ुख़रुफ़", "अद-दुख़ान", "अल-जासिया", "अल-अहक़ाफ़",
      "मुहम्मद", "अल-फ़त्ह", "अल-हुजुरात", "क़ाफ़",
      "अज़-ज़ारियात", "अत-तूर", "अन-नज्म", "अल-क़मर",
      "अर-रहमान", "अल-वाक़िआ", "अल-हदीद", "अल-मुजादिला",
      "अल-हश्र", "अल-मुम्तहिना", "अस-सफ़", "अल-जुमुआ",
      "अल-मुनाफ़िक़ून", "अत-तग़ाबुन", "अत-तलाक़", "अत-तहरीम",
      "अल-मुल्क", "अल-क़लम", "अल-हाक़्क़ा", "अल-मआरिज",
      "नूह", "अल-जिन्न", "अल-मुज़्ज़म्मिल", "अल-मुद्दस्सिर",
      "अल-क़ियामा", "अल-इंसान", "अल-मुर्सलात", "अन-नबा",
      "अन-नाज़िआत", "अबस", "अत-तकवीर", "अल-इन्फ़ितार",
      "अल-मुतफ़्फ़िफ़ीन", "अल-इन्शिक़ाक़", "अल-बुरूज", "अत-तारिक़",
      "अल-अला", "अल-ग़ाशिया", "अल-फ़ज्र", "अल-बलद",
      "अश-शम्स", "अल-लैल", "अद-दुहा", "अश-शर्ह",
      "अत-तीन", "अल-अलक़", "अल-क़द्र", "अल-बय्यिना",
      "अज़-ज़िलज़ाल", "अल-आदियात", "अल-क़ारिआ", "अत-तकासुर",
      "अल-अस्र", "अल-हुमज़ा", "अल-फ़ील", "क़ुरैश",
      "अल-माऊन", "अल-कौसर", "अल-काफ़िरून", "अन-नस्र",
      "अल-मसद", "अल-इख़लास", "अल-फ़लक़", "अन-नास"
    ]
  };

  const state = {
    lang: "bn",
    dark: false,
    page: "home",
    surahs: [],
    currentSurah: 1,
    arabicFontSize: 1.75,
    translationFontSize: 1,
    readRequest: 0,
    audioRequest: 0,
    messageTimer: null,
    historyEntryAdded: false,
    initialized: false
  };

  const audio = $("quranAudio");

  function t(key) {
    const language = translations[state.lang] || translations.bn;
    return language[key] ?? translations.bn[key] ?? key;
  }

  function readSettings() {
    try {
      const raw = localStorage.getItem("appSettings");
      if (!raw) return;

      const settings = JSON.parse(raw);

      if (["bn", "en", "hi"].includes(settings.lang)) {
        state.lang = settings.lang;
      }

      state.dark = Boolean(settings.dark);
    } catch (error) {
      console.warn("IBADAT settings could not be read.", error);
    }
  }

  function showMessage(message) {
    const box = $("appMessage");
    if (!box) return;

    box.textContent = message;
    box.hidden = false;

    if (state.messageTimer) {
      clearTimeout(state.messageTimer);
    }

    state.messageTimer = setTimeout(() => {
      box.hidden = true;
    }, 2600);
  }

  function updateHeader() {
    const heading = $("pageSubtitle");
    const subtitle = $("heroSubtitle");

    if (state.page === "home") {
      heading.textContent = t("homeHeading");
      heading.lang = "ar";
      heading.dir = "rtl";
      subtitle.textContent = t("homeSubtitle");
    } else if (state.page === "read") {
      heading.textContent = t("readHeading");
      heading.lang = state.lang;
      heading.dir = "auto";
      subtitle.textContent = t("readSubtitle");
    } else {
      heading.textContent = t("listenHeading");
      heading.lang = state.lang;
      heading.dir = "auto";
      subtitle.textContent = t("listenSubtitle");
    }

    document.title = t("appTitle");
  }

  function applyTheme() {
    document.body.classList.toggle("dark-mode", state.dark);
  }

  function getSurahName(number) {
    const names = surahNames[state.lang] || surahNames.bn;
    return names[number - 1] || `Surah ${number}`;
  }

  function getTranslationEdition() {
    if (state.lang === "en") return "en.sahih";
    if (state.lang === "hi") return "hi.hindi";
    return "bn.bengali";
  }

  async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.code && result.code !== 200) {
      throw new Error(result.status || "API request failed");
    }

    return result.data;
  }

  async function ensureSurahs() {
    if (state.surahs.length === 114) {
      return state.surahs;
    }

    const result = await fetchJson(`${API_BASE}/surah`);

    if (!Array.isArray(result) || result.length !== 114) {
      throw new Error("Invalid Surah list.");
    }

    state.surahs = result;
    return result;
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined && text !== null) {
      element.textContent = text;
    }

    return element;
  }

  function setPage(page, options = {}) {
    if (!["home", "read", "listen"].includes(page)) return;

    state.page = page;

    $("homePage").hidden = page !== "home";
    $("readPage").hidden = page !== "read";
    $("listenPage").hidden = page !== "listen";

    $("homePage").classList.toggle("active", page === "home");
    $("readPage").classList.toggle("active", page === "read");
    $("listenPage").classList.toggle("active", page === "listen");

    $("homeFooter").hidden = page !== "home";
    $("readFooter").hidden = page !== "read";
    $("listenFooter").hidden = page !== "listen";

    updateHeader();

    if (page !== "listen" && audio && !audio.paused) {
      audio.pause();
    }

    updatePlayButton();

    if (page === "read" && !options.skipLoad) {
      loadSurah(state.currentSurah);
    }

    if (page === "listen" && !options.skipLoad) {
      renderListenList();
    }

    if (page === "home") {
      $("surahSearchPanel").hidden = true;
      $("searchToggle").setAttribute("aria-expanded", "false");
    }

    window.scrollTo(0, 0);
  }

  /*
   * Back navigation strategy:
   *
   * Opening Read or Listen creates one same-URL history entry.
   * The first Back is handled by popstate and returns to Quran Home.
   * From Quran Home, the next Back can return to the parent IBADAT page.
   *
   * If this document is opened inside an iframe or a parent app that
   * manages its own navigation, that parent must cooperate with browser
   * history for fully native back-stack behavior.
   */

  function openSubpage(page) {
    if (page !== "read" && page !== "listen") return;
    if (state.page === page) return;

    if (state.page === "home") {
      try {
        history.pushState(
          { ibadatQuranSubpage: true },
          "",
          window.location.href
        );
        state.historyEntryAdded = true;
      } catch (error) {
        console.warn("Could not add Quran navigation history.", error);
      }
    }

    setPage(page);
  }

  window.addEventListener("popstate", () => {
    if (state.page === "read" || state.page === "listen") {
      setPage("home");
      showMessage(t("backHome"));
      state.historyEntryAdded = false;
    }
  });

  function applyLanguage() {
    $("quranTitle").textContent = t("quranTitle");
    $("quranDescription").textContent = t("quranDescription");
    $("readOptionText").textContent = t("readOption");
    $("listenOptionText").textContent = t("listenOption");
    $("footerText").textContent = t("homeFooter");
    $("readFooterMessage").textContent = t("readFooter");

    $("surahSearchHeading").textContent = t("searchHeading");
    $("surahSearchInput").placeholder = t("searchPlaceholder");

    $("readLoading").textContent = t("loadingRead");
    $("listenLoading").textContent = t("loadingListen");

    $("prevAyah").setAttribute("aria-label", t("previous"));
    $("nextAyah").setAttribute("aria-label", t("next"));
    $("prevTrack").setAttribute("aria-label", t("previous"));
    $("nextTrack").setAttribute("aria-label", t("next"));

    $("openRead").setAttribute("aria-label", t("readOption"));
    $("openListen").setAttribute("aria-label", t("listenOption"));

    updateHeader();
    updatePlayButton();

    if (state.surahs.length) {
      renderSearchList($("surahSearchInput").value);
      renderListenList();
    }

    if (state.page === "read") {
      loadSurah(state.currentSurah);
    }
  }

  function createSurahButton(surah, mode) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "surah-item";
    button.dataset.surah = String(surah.number);

    if (mode === "listen" && surah.number === state.currentSurah) {
      button.classList.add("playing");
    }

    const number = makeElement(
      "span",
      "surah-item-number",
      String(surah.number)
    );

    const name = makeElement(
      "span",
      "surah-item-name",
      `${getSurahName(surah.number)} (${surah.englishName || ""})`
    );

    const arabic = makeElement(
      "span",
      "surah-item-arabic",
      surah.name || ""
    );

    arabic.dir = "rtl";

    button.append(number, name, arabic);

    button.addEventListener("click", () => {
      state.currentSurah = surah.number;

      if (mode === "listen") {
        playSurah(surah.number);
      } else {
        loadSurah(surah.number);
      }
    });

    return button;
  }

  async function renderSearchList(query = "") {
    const list = $("surahList");
    if (!list) return;

    list.replaceChildren();

    try {
      const surahs = await ensureSurahs();
      const normalized = query.trim().toLocaleLowerCase();

      const matches = surahs.filter((surah) => {
        const localName = getSurahName(surah.number).toLocaleLowerCase();
        const englishName = (surah.englishName || "").toLocaleLowerCase();
        const arabicName = (surah.name || "").toLocaleLowerCase();

        return (
          !normalized ||
          localName.includes(normalized) ||
          englishName.includes(normalized) ||
          arabicName.includes(normalized) ||
          String(surah.number) === normalized
        );
      });

      if (!matches.length) {
        list.appendChild(
          makeElement("p", "empty-message", t("noResults"))
        );
        return;
      }

      matches.forEach((surah) => {
        list.appendChild(createSurahButton(surah, "read"));
      });
    } catch (error) {
      list.replaceChildren(
        makeElement("p", "error-message", t("loadError"))
      );

      console.error("Search list error:", error);
    }
  }

  async function renderListenList() {
    const list = $("listenSurahList");
    if (!list) return;

    list.replaceChildren();

    try {
      const surahs = await ensureSurahs();

      surahs.forEach((surah) => {
        list.appendChild(createSurahButton(surah, "listen"));
      });
    } catch (error) {
      list.appendChild(
        makeElement("p", "error-message", t("loadError"))
      );

      console.error("Listen list error:", error);
    }
  }

  function applyFontSizes() {
    document.documentElement.style.setProperty(
      "--arabic-font-size",
      `${state.arabicFontSize}rem`
    );

    document.documentElement.style.setProperty(
      "--translation-font-size",
      `${state.translationFontSize}rem`
    );
  }

  function changeFont(direction) {
    state.arabicFontSize = Math.max(
      1.1,
      Math.min(3, state.arabicFontSize + direction * 0.1)
    );

    state.translationFontSize = Math.max(
      0.75,
      Math.min(1.8, state.translationFontSize + direction * 0.05)
    );

    applyFontSizes();
  }

  function renderSurah(arabicData, translationData) {
    const content = $("readContent");
    content.replaceChildren();

    const heading = makeElement("div", "surah-heading");

    const headingName = makeElement(
      "h2",
      "surah-heading-name",
      `${t("surah")} ${arabicData.number}: ${getSurahName(arabicData.number)}`
    );

    const headingArabic = makeElement(
      "p",
      "surah-heading-arabic",
      arabicData.name || ""
    );

    headingArabic.dir = "rtl";
    heading.append(headingName, headingArabic);
    content.appendChild(heading);

    if (arabicData.number !== 1 && arabicData.number !== 9) {
      const basmala = makeElement(
        "p",
        "bismillah",
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
      );

      basmala.dir = "rtl";
      content.appendChild(basmala);
    }

    const arabicAyahs = arabicData.ayahs || [];
    const translatedAyahs = translationData.ayahs || [];

    arabicAyahs.forEach((ayah, index) => {
      const article = makeElement("article", "ayah");

      const arabic = makeElement("p", "ayah-arabic", ayah.text);
      arabic.dir = "rtl";

      const number = makeElement(
        "span",
        "ayah-number",
        String(ayah.numberInSurah)
      );

      arabic.appendChild(number);

      const translationText = translatedAyahs[index]
        ? translatedAyahs[index].text
        : "";

      const translation = makeElement(
        "p",
        "ayah-translation",
        translationText
      );

      article.append(arabic, translation);
      content.appendChild(article);
    });

    applyFontSizes();
  }

  async function loadSurah(number) {
    if (!Number.isInteger(number) || number < 1 || number > 114) {
      return;
    }

    state.currentSurah = number;

    const requestId = ++state.readRequest;
    const content = $("readContent");

    content.replaceChildren(
      makeElement("p", "loading-message", t("loadingRead"))
    );

    try {
      const translationEdition = getTranslationEdition();

      const [arabicData, translationData] = await Promise.all([
        fetchJson(
          `${API_BASE}/surah/${number}/${ARABIC_EDITION}`
        ),
        fetchJson(
          `${API_BASE}/surah/${number}/${translationEdition}`
        )
      ]);

      if (requestId !== state.readRequest) return;

      renderSurah(arabicData, translationData);
      renderSearchList($("surahSearchInput").value);
    } catch (error) {
      if (requestId !== state.readRequest) return;

      content.replaceChildren(
        makeElement("p", "error-message", t("loadError"))
      );

      console.error("Quran content error:", error);
    }
  }

  function updatePlayButton() {
    const button = $("playPause");
    if (!button || !audio) return;

    const playing = !audio.paused;

    button.innerHTML = playing
      ? '<span aria-hidden="true">⏸</span>'
      : '<span aria-hidden="true">▶</span>';

    button.setAttribute("aria-label", playing ? t("pause") : t("play"));
    button.title = playing ? t("pause") : t("play");
  }

  function updateListenSelection() {
    document.querySelectorAll(
      "#listenSurahList .surah-item"
    ).forEach((button) => {
      const selected =
        Number(button.dataset.surah) === state.currentSurah;

      button.classList.toggle("playing", selected);

      if (selected) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  async function playSurah(number) {
    if (!audio || number < 1 || number > 114) return;

    state.currentSurah = number;

    const requestId = ++state.audioRequest;

    audio.pause();
    audio.removeAttribute("src");
    audio.load();

    audio.src = `${AUDIO_BASE}${number}.mp3`;

    updateListenSelection();
    updatePlayButton();

    try {
      await audio.play();

      if (requestId !== state.audioRequest) {
        audio.pause();
        return;
      }

      updatePlayButton();
      updateListenSelection();
    } catch (error) {
      if (requestId !== state.audioRequest) return;

      updatePlayButton();
      showMessage(t("audioError"));
      console.error("Audio playback error:", error);
    }
  }

  function toggleAudio() {
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      updatePlayButton();
      return;
    }

    if (!audio.src) {
      playSurah(state.currentSurah);
      return;
    }

    audio.play()
      .then(updatePlayButton)
      .catch((error) => {
        console.error("Audio resume error:", error);
        showMessage(t("audioError"));
      });
  }

  function changeSurah(direction, mode) {
    const nextNumber = state.currentSurah + direction;

    if (nextNumber < 1) {
      showMessage(t("beginning"));
      return;
    }

    if (nextNumber > 114) {
      showMessage(t("end"));
      return;
    }

    state.currentSurah = nextNumber;

    if (mode === "listen") {
      playSurah(nextNumber);
    } else {
      loadSurah(nextNumber);
    }
  }

  function toggleSearch() {
    const panel = $("surahSearchPanel");
    const button = $("searchToggle");
    const shouldOpen = panel.hidden;

    panel.hidden = !shouldOpen;
    button.setAttribute("aria-expanded", String(shouldOpen));

    if (shouldOpen) {
      renderSearchList($("surahSearchInput").value);
      $("surahSearchInput").focus();
    }
  }

  function bindEvents() {
    $("openRead").addEventListener("click", () => {
      openSubpage("read");
    });

    $("openListen").addEventListener("click", () => {
      openSubpage("listen");
    });

    $("fontDown").addEventListener("click", () => {
      changeFont(-1);
    });

    $("fontUp").addEventListener("click", () => {
      changeFont(1);
    });

    $("searchToggle").addEventListener("click", toggleSearch);

    $("surahSearchInput").addEventListener("input", (event) => {
      renderSearchList(event.target.value);
    });

    $("prevAyah").addEventListener("click", () => {
      changeSurah(-1, "read");
    });

    $("nextAyah").addEventListener("click", () => {
      changeSurah(1, "read");
    });

    $("prevTrack").addEventListener("click", () => {
      changeSurah(-1, "listen");
    });

    $("nextTrack").addEventListener("click", () => {
      changeSurah(1, "listen");
    });

    $("playPause").addEventListener("click", toggleAudio);

    audio.addEventListener("play", updatePlayButton);
    audio.addEventListener("pause", updatePlayButton);

    audio.addEventListener("ended", () => {
      if (state.page === "listen" && state.currentSurah < 114) {
        playSurah(state.currentSurah + 1);
      } else {
        updatePlayButton();
      }
    });

    audio.addEventListener("error", updatePlayButton);

    window.addEventListener("storage", (event) => {
      if (event.key !== "appSettings") return;

      const previousLanguage = state.lang;
      readSettings();
      applyTheme();

      if (previousLanguage !== state.lang) {
        applyLanguage();
      } else {
        updateHeader();
      }
    });
  }

  async function init() {
    if (state.initialized) return;
    state.initialized = true;

    readSettings();
    applyTheme();
    applyFontSizes();
    bindEvents();
    applyLanguage();

    setPage("home", { skipLoad: true });

    try {
      await ensureSurahs();
      await renderSearchList("");
      await renderListenList();
    } catch (error) {
      console.error("Quran initialization error:", error);
    }
  }

  init();
})();
