(() => {
  "use strict";

  // ==========================================
  // IBADAT Quran Section
  // File: js/quran.js
  // ==========================================

  const API = "https://api.alquran.cloud/v1";
  const AUDIO_EDITION = "ar.alafasy";
  const ARABIC_EDITION = "quran-uthmani";

  const LANGUAGE_EDITION = {
    bn: "bn.bengali",
    en: "en.sahih",
    hi: "hi.hindi"
  };

  const LANG_STRINGS = {
    bn: {
      quranTitle: "আল-কুরআন",
      quranSubtitle: "পবিত্র কুরআন শিখি ও বুঝি",
      readQuran: "কুরআন পড়ুন",
      listenRecitation: "তিলাওয়াত শুনুন",
      findSurah: "সূরা খুঁজুন",
      saveReading: "সংরক্ষণ করুন",
      footerText: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",
      ayahRecitation: "আয়াতের তিলাওয়াত",
      audioReady: "শোনার জন্য প্রস্তুত",
      chooseSurah: "সূরা নির্বাচন",
      arabicSize: "আরবি লেখা",
      fullSurahRecitation: "সম্পূর্ণ সূরার তিলাওয়াত",
      playSurah: "সূরা চালান",
      selectSurahToListen: "শোনার জন্য সূরা নির্বাচন করুন",
      searchLabel: "সূরার নাম, নম্বর বা আয়াত নম্বর লিখুন",
      searchButton: "খুঁজুন",
      searchHint: "সূরা খুঁজতে নাম/নম্বর, নির্দিষ্ট আয়াতে যেতে সূরা:আয়াত লিখুন।",
      savedReadingTitle: "আপনার সংরক্ষিত পাঠ",
      continueReading: "পড়া শুরু করুন",
      removeSaved: "সংরক্ষণ সরান",
      savedNote: "পড়ার সময় পরবর্তী আয়াতে গেলে বর্তমান সংরক্ষিত অবস্থান আপডেট হবে।",
      previous: "আগের",
      next: "পরের",
      readTitle: "কুরআন পড়ুন",
      listenTitle: "তিলাওয়াত শুনুন",
      searchTitle: "সূরা খুঁজুন",
      savedTitle: "সংরক্ষণ করুন",
      chooseSurahSubtitle: "সূরা নির্বাচন করুন",
      readSubtitle: "আরবি পাঠ, উচ্চারণ ও অনুবাদ",
      listenSubtitle: "সূরা নির্বাচন করে তিলাওয়াত শুনুন",
      searchSubtitle: "সূরা বা নির্দিষ্ট আয়াত খুঁজুন",
      savedSubtitle: "আপনার পড়ার অবস্থান",
      loading: "কুরআনের তথ্য আনা হচ্ছে…",
      loadError: "তথ্য আনা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      noSaved: "এখনও কোনো পাঠ সংরক্ষণ করা হয়নি।",
      savedAt: "সংরক্ষিত অবস্থান",
      removed: "সংরক্ষণ সরানো হয়েছে।",
      savedNow: "বর্তমান আয়াত সংরক্ষণ করা হয়েছে।",
      noResults: "কোনো ফলাফল পাওয়া যায়নি।",
      enterSearch: "সূরার নাম, নম্বর অথবা সূরা:আয়াত লিখুন।",
      invalidAyah: "এই সূরায় ওই আয়াত নম্বর নেই।",
      playing: "তিলাওয়াত চলছে",
      paused: "তিলাওয়াত থামানো হয়েছে",
      audioError: "এই আয়াতের অডিও চালানো যায়নি।",
      makkah: "মক্কি",
      madinah: "মাদানি",
      verses: "আয়াত",
      translationUnavailable: "এই ভাষার অনুবাদ পাওয়া যায়নি।",
      openAyah: "আয়াত খুলুন",
      play: "শুনুন",
      saveAyah: "সংরক্ষণ",
      unsaveAyah: "সংরক্ষণ সরান",
      surah: "সূরা",
      ayah: "আয়াত",
      darkOn: "ডার্ক মোড চালু",
      darkOff: "ডার্ক মোড বন্ধ"
    },

    en: {
      quranTitle: "The Holy Quran",
      quranSubtitle: "Learn and understand the Holy Quran",
      readQuran: "Read Quran",
      listenRecitation: "Listen to Recitation",
      findSurah: "Find a Surah",
      saveReading: "Save Reading",
      footerText: "IBADAT • Learn and practise with purity",
      ayahRecitation: "Ayah recitation",
      audioReady: "Ready to listen",
      chooseSurah: "Choose a Surah",
      arabicSize: "Arabic text",
      fullSurahRecitation: "Full Surah recitation",
      playSurah: "Play Surah",
      selectSurahToListen: "Choose a Surah to listen",
      searchLabel: "Enter a Surah name, number, or ayah reference",
      searchButton: "Search",
      searchHint: "Search by Surah name/number, or enter Surah:Ayah to open a verse.",
      savedReadingTitle: "Your saved reading",
      continueReading: "Resume reading",
      removeSaved: "Remove saved position",
      savedNote: "Moving to the next ayah updates your current saved position.",
      previous: "Previous",
      next: "Next",
      readTitle: "Read Quran",
      listenTitle: "Listen to Recitation",
      searchTitle: "Find a Surah",
      savedTitle: "Save Reading",
      chooseSurahSubtitle: "Choose a Surah",
      readSubtitle: "Arabic text, transliteration and translation",
      listenSubtitle: "Choose a Surah and listen",
      searchSubtitle: "Find a Surah or a specific ayah",
      savedSubtitle: "Your reading position",
      loading: "Loading Quran data…",
      loadError: "Could not load data. Check your internet connection and try again.",
      noSaved: "No reading position has been saved yet.",
      savedAt: "Saved position",
      removed: "Saved position removed.",
      savedNow: "Current ayah saved.",
      noResults: "No results found.",
      enterSearch: "Enter a Surah name, number, or Surah:Ayah.",
      invalidAyah: "That ayah number is not in this Surah.",
      playing: "Recitation playing",
      paused: "Recitation paused",
      audioError: "Could not play this ayah's audio.",
      makkah: "Makkan",
      madinah: "Madinan",
      verses: "ayahs",
      translationUnavailable: "Translation unavailable in this language.",
      openAyah: "Open ayah",
      play: "Listen",
      saveAyah: "Save",
      unsaveAyah: "Remove saved position",
      surah: "Surah",
      ayah: "Ayah",
      darkOn: "Dark mode on",
      darkOff: "Dark mode off"
    },

    hi: {
      quranTitle: "पवित्र क़ुरआन",
      quranSubtitle: "पवित्र क़ुरआन सीखें और समझें",
      readQuran: "क़ुरआन पढ़ें",
      listenRecitation: "तिलावत सुनें",
      findSurah: "सूरह खोजें",
      saveReading: "पाठ सुरक्षित करें",
      footerText: "इबादत • पवित्रता के साथ सीखें और अभ्यास करें",
      ayahRecitation: "आयत की तिलावत",
      audioReady: "सुनने के लिए तैयार",
      chooseSurah: "सूरह चुनें",
      arabicSize: "अरबी लिखावट",
      fullSurahRecitation: "पूरी सूरह की तिलावत",
      playSurah: "सूरह चलाएँ",
      selectSurahToListen: "सुनने के लिए सूरह चुनें",
      searchLabel: "सूरह का नाम, नंबर या आयत नंबर लिखें",
      searchButton: "खोजें",
      searchHint: "सूरह के नाम/नंबर से खोजें या आयत खोलने के लिए सूरह:आयत लिखें।",
      savedReadingTitle: "आपका सुरक्षित पाठ",
      continueReading: "पढ़ना जारी रखें",
      removeSaved: "सहेजा स्थान हटाएँ",
      savedNote: "अगली आयत पर जाने से वर्तमान सुरक्षित स्थान अपडेट होगा।",
      previous: "पिछली",
      next: "अगली",
      readTitle: "क़ुरआन पढ़ें",
      listenTitle: "तिलावत सुनें",
      searchTitle: "सूरह खोजें",
      savedTitle: "पाठ सुरक्षित करें",
      chooseSurahSubtitle: "सूरह चुनें",
      readSubtitle: "अरबी पाठ, उच्चारण और अनुवाद",
      listenSubtitle: "सूरह चुनें और तिलावत सुनें",
      searchSubtitle: "सूरह या आयत खोजें",
      savedSubtitle: "आपकी पढ़ने की स्थिति",
      loading: "क़ुरआन की जानकारी लाई जा रही है…",
      loadError: "जानकारी नहीं मिली। इंटरनेट जाँचकर फिर प्रयास करें।",
      noSaved: "अभी कोई पाठ सुरक्षित नहीं किया गया है।",
      savedAt: "सुरक्षित स्थान",
      removed: "सुरक्षित स्थान हटा दिया गया।",
      savedNow: "वर्तमान आयत सुरक्षित की गई।",
      noResults: "कोई परिणाम नहीं मिला।",
      enterSearch: "सूरह का नाम, नंबर या सूरह:आयत लिखें।",
      invalidAyah: "इस सूरह में यह आयत नंबर नहीं है।",
      playing: "तिलावत चल रही है",
      paused: "तिलावत रोक दी गई",
      audioError: "इस आयत का ऑडियो नहीं चल सका।",
      makkah: "मक्की",
      madinah: "मदनी",
      verses: "आयतें",
      translationUnavailable: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      openAyah: "आयत खोलें",
      play: "सुनें",
      saveAyah: "सुरक्षित करें",
      unsaveAyah: "सहेजा स्थान हटाएँ",
      surah: "सूरह",
      ayah: "आयत",
      darkOn: "डार्क मोड चालू",
      darkOff: "डार्क मोड बंद"
    }
  };

  const $ = id => document.getElementById(id);

  const state = {
    lang: "bn",
    page: "home",
    chapters: [],
    currentSurah: 1,
    currentAyah: 1,
    arabic: [],
    translations: [],
    transliterations: [],
    audioUrls: [],
    audioMode: "ayah",
    playingSurah: false,
    searchResults: [],
    fontSize: 32,
    saved: null,
    cache: new Map(),
    loadingSurah: false
  };

  const STORE = {
    saved: "ibadat_quran_saved_position",
    theme: "ibadat_theme",
    font: "ibadat_quran_arabic_size"
  };

  // ------------------------------------------
  // Language and general utilities
  // ------------------------------------------

  function getLanguageFromSite() {
    const keys = [
      "ibadat_language",
      "siteLanguage",
      "selectedLanguage",
      "language",
      "lang",
      "preferredLanguage"
    ];

    for (const key of keys) {
      try {
        const value = localStorage.getItem(key);

        if (!value) continue;

        const normalized = value.toLowerCase().trim();

        if (
          ["bn", "bn-bd", "bn-in", "bengali", "বাংলা"]
            .includes(normalized)
        ) {
          return "bn";
        }

        if (
          ["en", "en-us", "en-gb", "english"]
            .includes(normalized)
        ) {
          return "en";
        }

        if (
          ["hi", "hi-in", "hindi", "हिन्दी", "हिंदी"]
            .includes(normalized)
        ) {
          return "hi";
        }
      } catch (_) {}
    }

    const docLang = (
      document.documentElement.lang || ""
    ).toLowerCase();

    if (docLang.startsWith("en")) return "en";
    if (docLang.startsWith("hi")) return "hi";

    return "bn";
  }

  const t = key =>
    (LANG_STRINGS[state.lang] &&
      LANG_STRINGS[state.lang][key]) ||
    LANG_STRINGS.bn[key] ||
    key;

  function localDigits(value) {
    const stringValue = String(value);

    if (state.lang === "bn") {
      return stringValue.replace(
        /\d/g,
        digit => "০১২৩৪৫৬৭৮৯"[Number(digit)]
      );
    }

    if (state.lang === "hi") {
      return stringValue.replace(
        /\d/g,
        digit => "०१२३४५६७८९"[Number(digit)]
      );
    }

    return stringValue;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
    );
  }

  function showToast(message) {
    const toast = $("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  async function api(path) {
    const response = await fetch(`${API}${path}`, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`API ${response.status}`);
    }

    const json = await response.json();

    if (json.code && json.code !== 200) {
      throw new Error(json.status || "API error");
    }

    return json.data;
  }

  // ------------------------------------------
  // Save and restore reading position
  // ------------------------------------------

  function loadSaved() {
    try {
      state.saved = JSON.parse(
        localStorage.getItem(STORE.saved) || "null"
      );
    } catch (_) {
      state.saved = null;
    }
  }

  function savePosition(surah, ayah, explicit = false) {
    state.saved = {
      surah: Number(surah),
      ayah: Number(ayah),
      updatedAt: Date.now()
    };

    try {
      localStorage.setItem(
        STORE.saved,
        JSON.stringify(state.saved)
      );
    } catch (_) {}

    updateSavedPanel();

    if (explicit) {
      showToast(t("savedNow"));
    }
  }

  function clearSaved() {
    state.saved = null;

    try {
      localStorage.removeItem(STORE.saved);
    } catch (_) {}

    updateSavedPanel();
    showToast(t("removed"));
  }

  // ------------------------------------------
  // Theme controls
  // ------------------------------------------

  function applyTheme() {
    let theme = "light";

    try {
      theme = localStorage.getItem(STORE.theme) || "light";
    } catch (_) {}

    document.body.classList.toggle(
      "dark",
      theme === "dark"
    );

    $("themeIconHome").textContent =
      theme === "dark" ? "☀" : "☾";

    $("themeIconContent").textContent =
      theme === "dark" ? "☀" : "☾";

    $("themeToggleHome").setAttribute(
      "aria-label",
      theme === "dark" ? t("darkOff") : t("darkOn")
    );

    $("themeToggleContent").setAttribute(
      "aria-label",
      theme === "dark" ? t("darkOff") : t("darkOn")
    );
  }

  function toggleTheme() {
    const next = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    try {
      localStorage.setItem(STORE.theme, next);
    } catch (_) {}

    applyTheme();
  }

  // ------------------------------------------
  // Language controls
  // ------------------------------------------

  function applyLanguage() {
    state.lang = getLanguageFromSite();
    document.documentElement.lang = state.lang;

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;

      if (t(key)) {
        element.textContent = t(key);
      }
    });

    const input = $("searchInput");

    if (input) {
      if (state.lang === "en") {
        input.placeholder = "e.g. Al-Fatihah, 2 or 2:255";
      } else if (state.lang === "hi") {
        input.placeholder = "जैसे: फ़ातिहा, 2 या 2:255";
      } else {
        input.placeholder = "যেমন: ফাতিহা, 2 বা 2:255";
      }
    }

    if (state.chapters.length) {
      renderChapterSelect();
      renderFeatured();

      if (state.page === "read") {
        loadSurah(
          state.currentSurah,
          state.currentAyah
        );
      }

      if (state.page === "listen") {
        renderListenList();
      }

      if (state.page === "saved") {
        updateSavedPanel();
      }
    }

    applyTheme();
  }

  function chapterName(chapter) {
    if (!chapter) return "";

    if (state.lang === "bn") {
      return (
        chapter.nameBn ||
        chapter.name_simple ||
        chapter.name_arabic
      );
    }

    if (state.lang === "hi") {
      return (
        chapter.nameHindi ||
        chapter.name_simple ||
        chapter.name_arabic
      );
    }

    return chapter.name_simple || chapter.name_arabic;
  }

  // ------------------------------------------
  // Initialize the Quran page
  // ------------------------------------------

  async function init() {
    state.lang = getLanguageFromSite();

    loadSaved();

    try {
      const storedFont = Number(
        localStorage.getItem(STORE.font)
      );

      if (storedFont >= 24 && storedFont <= 52) {
        state.fontSize = storedFont;
      }
    } catch (_) {}

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.fontSize}px`
    );

    applyLanguage();

    try {
      const [chapters, bnNames, hiNames] = await Promise.all([
        api("/surah"),
        api("/quran/bn.bengali").catch(() => null),
        api("/quran/hi.hindi").catch(() => null)
      ]);

      state.chapters = chapters.map(chapter => ({
        ...chapter
      }));

      if (bnNames?.surahs) {
        bnNames.surahs.forEach((surah, index) => {
          if (state.chapters[index]) {
            state.chapters[index].nameBn = surah.name;
          }
        });
      }

      if (hiNames?.surahs) {
        hiNames.surahs.forEach((surah, index) => {
          if (state.chapters[index]) {
            state.chapters[index].nameHindi = surah.name;
          }
        });
      }

      renderChapterSelect();
      await renderFeatured();
      renderListenList();
      updateSavedPanel();
    } catch (error) {
      console.error("Quran initialization error:", error);

      $("homeStatus").textContent = t("loadError");
      renderFeaturedFallback();
    }

    wireEvents();
    applyTheme();
  }

  function renderFeaturedFallback() {
    if (state.lang === "en") {
      $("featuredSurahName").textContent = "Surah Al-Fatihah";
    } else if (state.lang === "hi") {
      $("featuredSurahName").textContent = "सूरह अल-फ़ातिहा";
    } else {
      $("featuredSurahName").textContent = "সূরা আল-ফাতিহা";
    }
  }

  function renderChapterSelect() {
    const select = $("surahSelect");
    const current = String(state.currentSurah);

    select.innerHTML = state.chapters.map(chapter => `
      <option value="${chapter.number}">
        ${localDigits(chapter.number)}.
        ${escapeHtml(chapterName(chapter))}
        — ${escapeHtml(chapter.name_arabic || "")}
      </option>
    `).join("");

    select.value = current;
  }

  // ------------------------------------------
  // Fetch and cache Surah data
  // ------------------------------------------

  async function getSurahData(number) {
    const cacheKey = `${number}:${state.lang}`;

    if (state.cache.has(cacheKey)) {
      return state.cache.get(cacheKey);
    }

    const translationEdition =
      LANGUAGE_EDITION[state.lang] ||
      LANGUAGE_EDITION.bn;

    const dataPromise = Promise.all([
      api(`/surah/${number}/${ARABIC_EDITION}`),

      api(
        `/surah/${number}/${translationEdition}`
      ).catch(() => null),

      api(
        `/surah/${number}/${AUDIO_EDITION}`
      ).catch(() => null),

      api(
        `/surah/${number}/en.transliteration`
      ).catch(() => null)
    ]).then(
      ([arabic, translation, audio, transliteration]) => {
        const result = {
          arabic: arabic.ayahs || [],
          translations: translation?.ayahs || [],
          audio: audio?.ayahs || [],
          transliterations: transliteration?.ayahs || []
        };

        state.cache.set(cacheKey, result);

        return result;
      }
    );

    state.cache.set(cacheKey, dataPromise);

    try {
      return await dataPromise;
    } catch (error) {
      state.cache.delete(cacheKey);
      throw error;
    }
  }

  // ------------------------------------------
  // Home featured Surah
  // ------------------------------------------

  async function renderFeatured() {
    if (!state.chapters.length) return;

    const chapter =
      state.chapters.find(item => item.number === 1) ||
      state.chapters[0];

    $("featuredSurahName").textContent =
      `${t("surah")} ${chapterName(chapter)}`;

    $("featuredSurahNumber").textContent =
      `${t("surah")} ${localDigits(chapter.number)}`;

    try {
      const data = await getSurahData(chapter.number);

      const firstArabic = data.arabic[0];
      const firstTranslation = data.translations[0];
      const firstTransliteration = data.transliterations[0];

      if (firstArabic) {
        $("featuredArabic").textContent = firstArabic.text;
      }

      $("featuredTranslation").textContent =
        firstTranslation
          ? firstTranslation.text
          : t("translationUnavailable");

      $("featuredTranslit").textContent =
        firstTransliteration?.text || "";

      $("featuredTranslit").classList.toggle(
        "hidden",
        !firstTransliteration?.text
      );

      $("featuredPlay").dataset.audio =
        data.audio[0]?.audio || "";

      $("featuredPlay").disabled =
        !data.audio[0]?.audio;
    } catch (error) {
      console.error("Featured Quran load error:", error);
      $("homeStatus").textContent = t("loadError");
    }
  }

  // ------------------------------------------
  // Page navigation
  // ------------------------------------------

  function openPage(page) {
    const config = {
      read: ["readTitle", "readSubtitle"],
      listen: ["listenTitle", "listenSubtitle"],
      search: ["searchTitle", "searchSubtitle"],
      saved: ["savedTitle", "savedSubtitle"]
    }[page];

    if (!config) return;

    state.page = page;

    $("homeScreen").classList.add("hidden");
    $("contentScreen").classList.remove("hidden");

    $("contentTitle").textContent = t(config[0]);
    $("contentSubtitle").textContent = t(config[1]);

    [
      "readPanel",
      "listenPanel",
      "searchPanel",
      "savedPanel"
    ].forEach(id => {
      $(id).classList.add("hidden");
    });

    $(`${page}Panel`).classList.remove("hidden");

    $("surahSelectWrap").classList.toggle(
      "hidden",
      page === "search" || page === "saved"
    );

    $("fontSizeControl").classList.toggle(
      "hidden",
      page !== "read"
    );

    $("contentTools").classList.toggle(
      "hidden",
      page === "search" || page === "saved"
    );

    $("previousAyah").classList.toggle(
      "hidden",
      page !== "read"
    );

    $("nextAyah").classList.toggle(
      "hidden",
      page !== "read"
    );

    $("positionLabel").classList.toggle(
      "hidden",
      page !== "read"
    );

    $("screenBody").scrollTop = 0;

    if (page === "read") {
      loadSurah(state.currentSurah, state.currentAyah);
    }

    if (page === "listen") {
      renderListenList();
    }

    if (page === "saved") {
      updateSavedPanel();
    }

    if (page === "search") {
      $("searchInput").focus({
        preventScroll: true
      });
    }

    applyTheme();
  }

  function goHome() {
    pauseAudio();

    state.page = "home";

    $("contentScreen").classList.add("hidden");
    $("homeScreen").classList.remove("hidden");
  }

  // ------------------------------------------
  // Read Quran
  // ------------------------------------------

  async function loadSurah(number, jumpAyah = 1) {
    if (!number || number < 1 || number > 114) return;

    state.currentSurah = Number(number);
    state.currentAyah = Number(jumpAyah) || 1;

    $("surahSelect").value = String(number);

    const chapter = state.chapters[number - 1];

    $("readSurahTitle").textContent =
      `${t("surah")} ${chapterName(chapter)}`;

    $("readSurahMeta").textContent =
      `${localDigits(number)} • ` +
      `${localDigits(chapter?.numberOfAyahs || "")} ` +
      `${t("verses")}`;

    $("ayahList").innerHTML =
      `<div class="loading">${t("loading")}</div>`;

    $("listenSurahName").textContent =
      `${t("surah")} ${chapterName(chapter)}`;

    $("positionLabel").textContent =
      `${localDigits(number)} : ${localDigits(state.currentAyah)}`;

    try {
      const data = await getSurahData(number);

      state.arabic = data.arabic;
      state.translations = data.translations;
      state.transliterations = data.transliterations;
      state.audioUrls = data.audio;

      if (state.currentAyah > data.arabic.length) {
        state.currentAyah = 1;
      }

      renderAyahs(data, state.currentAyah);

      $("positionLabel").textContent =
        `${localDigits(number)} : ${localDigits(state.currentAyah)}`;
    } catch (error) {
      console.error("Surah load error:", error);

      $("ayahList").innerHTML =
        `<div class="error-state">${t("loadError")}</div>`;
    }
  }

  function renderAyahs(data, jumpAyah) {
    const chapter = state.chapters[state.currentSurah - 1];

    $("readSurahTitle").textContent =
      `${t("surah")} ${chapterName(chapter)}`;

    $("readSurahMeta").textContent =
      `${localDigits(chapter.number)} • ` +
      `${localDigits(data.arabic.length)} ${t("verses")}`;

    $("ayahList").innerHTML = data.arabic.map((ayah, index) => {
      const translation =
        data.translations[index]?.text ||
        t("translationUnavailable");

      const transliteration =
        data.transliterations[index]?.text || "";

      const audio = data.audio[index]?.audio || "";
      const number = ayah.numberInSurah || index + 1;

      const savedHere =
        state.saved &&
        state.saved.surah === state.currentSurah &&
        state.saved.ayah === number;

      return `
        <article
          class="ayah-card"
          id="ayah-${number}"
          data-ayah="${number}"
        >
          <div class="ayah-card-top">
            <span class="ayah-badge">
              ${localDigits(number)}
            </span>

            <div class="ayah-actions">
              <button
                class="mini-button"
                type="button"
                data-play-ayah="${number}"
                ${audio ? "" : "disabled"}
              >
                ▶ ${t("play")}
              </button>

              <button
                class="mini-button"
                type="button"
                data-save-ayah="${number}"
              >
                ${savedHere ? "✓ " + t("unsaveAyah") : "♧ " + t("saveAyah")}
              </button>
            </div>
          </div>

          <div class="ayah-arabic" lang="ar" dir="rtl">
            ${escapeHtml(ayah.text)}
          </div>

          ${
            transliteration
              ? `<p class="ayah-translit">${escapeHtml(transliteration)}</p>`
              : ""
          }

          <p class="ayah-translation">
            ${escapeHtml(translation)}
          </p>
        </article>
      `;
    }).join("");

    $("ayahList")
      .querySelectorAll("[data-play-ayah]")
      .forEach(button => {
        button.addEventListener("click", () => {
          playAyah(Number(button.dataset.playAyah));
        });
      });

    $("ayahList")
      .querySelectorAll("[data-save-ayah]")
      .forEach(button => {
        button.addEventListener("click", () => {
          const ayahNumber = Number(button.dataset.saveAyah);

          if (
            state.saved &&
            state.saved.surah === state.currentSurah &&
            state.saved.ayah === ayahNumber
          ) {
            clearSaved();
          } else {
            savePosition(
              state.currentSurah,
              ayahNumber,
              true
            );
          }

          renderAyahs(data, state.currentAyah);
        });
      });

    requestAnimationFrame(() => {
      const target = $(`ayah-${jumpAyah}`);

      if (target) {
        target.scrollIntoView({
          block: "start",
          behavior: "auto"
        });
      }
    });
  }

  // ------------------------------------------
  // Listen to recitation
  // ------------------------------------------

  function renderListenList() {
    $("listenSurahList").innerHTML =
      state.chapters.map(chapter => `
        <button
          type="button"
          class="surah-row"
          data-listen-surah="${chapter.number}"
        >
          <span class="surah-index">
            ${localDigits(chapter.number)}
          </span>

          <span class="surah-row-copy">
            <strong>${escapeHtml(chapterName(chapter))}</strong>
            <small>
              ${localDigits(chapter.numberOfAyahs)}
              ${t("verses")}
              •
              ${
                chapter.revelationType === "Meccan"
                  ? t("makkah")
                  : t("madinah")
              }
            </small>
          </span>

          <span class="surah-row-arabic" lang="ar">
            ${escapeHtml(chapter.name_arabic || "")}
          </span>
        </button>
      `).join("");

    $("listenSurahList")
      .querySelectorAll("[data-listen-surah]")
      .forEach(button => {
        button.addEventListener("click", async () => {
          const number = Number(button.dataset.listenSurah);

          state.currentSurah = number;
          state.currentAyah = 1;

          $("surahSelect").value = String(number);

          await loadSurah(number, 1);
          await playAyah(1);
        });
      });
  }

  async function playAyah(ayahNumber) {
    const data = await getSurahData(
      state.currentSurah
    ).catch(() => null);

    const item = data?.audio?.[ayahNumber - 1];

    if (!item?.audio) {
      showToast(t("audioError"));
      return;
    }

    const audio = $("quranAudio");

    state.playingSurah = false;
    audio.onended = null;
    audio.src = item.audio;

    state.currentAyah = ayahNumber;

    $("positionLabel").textContent =
      `${localDigits(state.currentSurah)} : ${localDigits(ayahNumber)}`;

    // Keep only one current saved reading position.
    savePosition(
      state.currentSurah,
      ayahNumber,
      false
    );

    try {
      await audio.play();

      $("featuredPlayIcon").textContent = "Ⅱ";
      $("featuredAudioStatus").textContent = t("playing");
    } catch (error) {
      showToast(t("audioError"));
    }
  }

  async function playFullSurah() {
    const number = state.currentSurah;

    const data = await getSurahData(number).catch(() => null);

    if (!data?.audio?.length) {
      $("listenStatus").textContent = t("audioError");
      return;
    }

    state.playingSurah = true;

    let index = 0;
    const audio = $("quranAudio");

    const playCurrent = async () => {
      if (!state.playingSurah || index >= data.audio.length) {
        state.playingSurah = false;
        $("listenStatus").textContent = "";
        return;
      }

      const item = data.audio[index];

      if (!item?.audio) {
        index++;
        return playCurrent();
      }

      state.currentAyah = index + 1;

      savePosition(
        number,
        index + 1,
        false
      );

      $("listenStatus").textContent =
        `${t("playing")} • ` +
        `${localDigits(index + 1)} / ` +
        `${localDigits(data.audio.length)}`;

      audio.src = item.audio;

      try {
        await audio.play();
      } catch (error) {
        state.playingSurah = false;
        $("listenStatus").textContent = t("audioError");
      }
    };

    audio.onended = () => {
      index++;
      playCurrent();
    };

    await playCurrent();
  }

  function pauseAudio() {
    const audio = $("quranAudio");

    audio.pause();
    state.playingSurah = false;
    audio.onended = null;

    $("featuredPlayIcon").textContent = "▶";
  }

  // ------------------------------------------
  // Saved position panel
  // ------------------------------------------

  function updateSavedPanel() {
    const hasSavedPosition = Boolean(
      state.saved &&
      state.saved.surah &&
      state.saved.ayah
    );

    $("resumeSaved").disabled = !hasSavedPosition;
    $("removeSaved").disabled = !hasSavedPosition;

    if (!hasSavedPosition) {
      $("savedDescription").textContent = t("noSaved");
      return;
    }

    const chapter = state.chapters[state.saved.surah - 1];

    $("savedDescription").textContent =
      `${t("savedAt")}: ` +
      `${t("surah")} ${chapter ? chapterName(chapter) : state.saved.surah}, ` +
      `${t("ayah")} ${localDigits(state.saved.ayah)}`;
  }

  function openSpecificAyah(surah, ayah) {
    const chapter = state.chapters[surah - 1];

    if (
      !chapter ||
      ayah < 1 ||
      ayah > chapter.numberOfAyahs
    ) {
      showToast(t("invalidAyah"));
      return;
    }

    state.currentSurah = surah;
    state.currentAyah = ayah;

    openPage("read");
  }

  // ------------------------------------------
  // Search Surahs and Ayahs
  // ------------------------------------------

  async function performSearch(query) {
    const searchQuery = query.trim();
    const results = $("searchResults");

    results.innerHTML = "";

    if (!searchQuery) {
      results.innerHTML =
        `<div class="empty-state">${t("enterSearch")}</div>`;
      return;
    }

    // Search by reference, e.g. 2:255 or 2/255.
    const direct = searchQuery.match(
      /^(\d{1,3})\s*[:/.-]\s*(\d{1,3})$/
    );

    if (direct) {
      const surahNumber = Number(direct[1]);
      const ayahNumber = Number(direct[2]);

      const chapter = state.chapters[surahNumber - 1];

      if (
        chapter &&
        ayahNumber >= 1 &&
        ayahNumber <= chapter.numberOfAyahs
      ) {
        results.innerHTML = `
          <button
            class="result-row"
            type="button"
            id="directResult"
          >
            <span class="surah-index">
              ${localDigits(surahNumber)}:${localDigits(ayahNumber)}
            </span>

            <span class="result-copy">
              <strong>
                ${escapeHtml(chapterName(chapter))}
                — ${t("ayah")} ${localDigits(ayahNumber)}
              </strong>
              <p>${t("openAyah")}</p>
            </span>
          </button>
        `;

        $("directResult").addEventListener("click", () => {
          openSpecificAyah(surahNumber, ayahNumber);
        });
      } else {
        results.innerHTML =
          `<div class="empty-state">${t("invalidAyah")}</div>`;
      }

      return;
    }

    // Search by Surah number.
    if (/^\d{1,3}$/.test(searchQuery)) {
      const number = Number(searchQuery);

      if (number >= 1 && number <= 114) {
        const chapter = state.chapters[number - 1];

        results.innerHTML = `
          <button
            class="result-row"
            type="button"
            id="surahResult"
          >
            <span class="surah-index">
              ${localDigits(number)}
            </span>

            <span class="result-copy">
              <strong>${escapeHtml(chapterName(chapter))}</strong>
              <p>
                ${localDigits(chapter.numberOfAyahs)}
                ${t("verses")}
                •
                ${escapeHtml(chapter.name_arabic || "")}
              </p>
            </span>
          </button>
        `;

        $("surahResult").addEventListener("click", () => {
          state.currentSurah = number;
          state.currentAyah = 1;
          openPage("read");
        });

        return;
      }
    }

    // Search locally by Surah name.
    const normalizedQuery = searchQuery.toLowerCase();

    const localMatches = state.chapters.filter(chapter => {
      return (
        chapterName(chapter)
          .toLowerCase()
          .includes(normalizedQuery) ||

        (chapter.name_simple || "")
          .toLowerCase()
          .includes(normalizedQuery) ||

        (chapter.name_arabic || "")
          .includes(searchQuery)
      );
    });

    if (localMatches.length) {
      results.innerHTML = localMatches.map(chapter => `
        <button
          class="result-row"
          type="button"
          data-result-surah="${chapter.number}"
        >
          <span class="surah-index">
            ${localDigits(chapter.number)}
          </span>

          <span class="result-copy">
            <strong>${escapeHtml(chapterName(chapter))}</strong>
            <p>
              ${localDigits(chapter.numberOfAyahs)}
              ${t("verses")}
              •
              ${escapeHtml(chapter.name_arabic || "")}
            </p>
          </span>
        </button>
      `).join("");

      results
        .querySelectorAll("[data-result-surah]")
        .forEach(button => {
          button.addEventListener("click", () => {
            state.currentSurah = Number(
              button.dataset.resultSurah
            );

            state.currentAyah = 1;
            openPage("read");
          });
        });

      return;
    }

    // Search within the selected translation.
    try {
      const edition =
        LANGUAGE_EDITION[state.lang] ||
        LANGUAGE_EDITION.bn;

      const data = await api(
        `/search/${encodeURIComponent(searchQuery)}/all/${edition}`
      );

      const matches = data.matches || [];

      if (!matches.length) {
        results.innerHTML =
          `<div class="empty-state">${t("noResults")}</div>`;
        return;
      }

      results.innerHTML = matches
        .slice(0, 40)
        .map(item => {
          const surahNumber = item.surah?.number || 1;
          const ayahNumber = item.numberInSurah || 1;

          const chapter = state.chapters[surahNumber - 1];

          return `
            <button
              class="result-row"
              type="button"
              data-result-ayah="${surahNumber}:${ayahNumber}"
            >
              <span class="surah-index">
                ${localDigits(surahNumber)}:${localDigits(ayahNumber)}
              </span>

              <span class="result-copy">
                <strong>
                  ${escapeHtml(
                    chapter
                      ? chapterName(chapter)
                      : item.surah?.englishName || t("surah")
                  )}
                </strong>

                <p>${escapeHtml(item.text)}</p>
              </span>
            </button>
          `;
        })
        .join("");

      results
        .querySelectorAll("[data-result-ayah]")
        .forEach(button => {
          button.addEventListener("click", () => {
            const [surahNumber, ayahNumber] =
              button.dataset.resultAyah
                .split(":")
                .map(Number);

            openSpecificAyah(surahNumber, ayahNumber);
          });
        });
    } catch (error) {
      console.error("Quran search error:", error);

      results.innerHTML =
        `<div class="empty-state">${t("noResults")}</div>`;
    }
  }

  // ------------------------------------------
  // Arabic font-size controls
  // ------------------------------------------

  function changeFont(delta) {
    state.fontSize = Math.max(
      24,
      Math.min(52, state.fontSize + delta)
    );

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.fontSize}px`
    );

    try {
      localStorage.setItem(
        STORE.font,
        String(state.fontSize)
      );
    } catch (_) {}
  }

  // ------------------------------------------
  // Connect all interface events
  // ------------------------------------------

  function wireEvents() {
    document.querySelectorAll("[data-open]").forEach(button => {
      button.addEventListener("click", () => {
        openPage(button.dataset.open);
      });
    });

    $("backHome").addEventListener("click", goHome);

    $("themeToggleHome").addEventListener(
      "click",
      toggleTheme
    );

    $("themeToggleContent").addEventListener(
      "click",
      toggleTheme
    );

    $("surahSelect").addEventListener("change", event => {
      const number = Number(event.target.value);

      state.currentSurah = number;
      state.currentAyah = 1;

      if (state.page === "read") {
        loadSurah(number, 1);
      }

      if (state.page === "listen") {
        $("listenSurahName").textContent =
          `${t("surah")} ${chapterName(state.chapters[number - 1])}`;
      }
    });

    // Featured audio on the home page.
    $("featuredPlay").addEventListener(
      "click",
      async () => {
        const url = $("featuredPlay").dataset.audio;

        if (!url) return;

        const audio = $("quranAudio");

        if (!audio.paused) {
          pauseAudio();

          $("featuredPlayIcon").textContent = "▶";
          $("featuredAudioStatus").textContent = t("paused");

          return;
        }

        audio.src = url;

        try {
          await audio.play();

          $("featuredPlayIcon").textContent = "Ⅱ";
          $("featuredAudioStatus").textContent = t("playing");
        } catch (error) {
          showToast(t("audioError"));
        }
      }
    );

    // Full Surah playback.
    $("playSurahButton").addEventListener("click", () => {
      if (state.playingSurah) {
        pauseAudio();
        $("listenStatus").textContent = t("paused");
      } else {
        playFullSurah();
      }
    });

    // Search form.
    $("searchForm").addEventListener("submit", event => {
      event.preventDefault();

      performSearch($("searchInput").value);
    });

    // Resume the saved reading position.
    $("resumeSaved").addEventListener("click", () => {
      if (!state.saved) return;

      openSpecificAyah(
        state.saved.surah,
        state.saved.ayah
      );
    });

    // Remove the saved position.
    $("removeSaved").addEventListener(
      "click",
      clearSaved
    );

    // Previous Ayah.
    $("previousAyah").addEventListener("click", () => {
      if (state.page !== "read") return;

      if (state.currentAyah > 1) {
        loadSurah(
          state.currentSurah,
          state.currentAyah - 1
        );
      } else if (state.currentSurah > 1) {
        const previousSurah =
          state.currentSurah - 1;

        const lastAyah =
          state.chapters[previousSurah - 1].numberOfAyahs;

        loadSurah(previousSurah, lastAyah);
      }
    });

    // Next Ayah. The saved position moves forward.
    $("nextAyah").addEventListener("click", () => {
      if (state.page !== "read") return;

      const chapter =
        state.chapters[state.currentSurah - 1];

      const maxAyah = chapter?.numberOfAyahs || 1;

      if (state.currentAyah < maxAyah) {
        const next = state.currentAyah + 1;

        state.currentAyah = next;

        savePosition(
          state.currentSurah,
          next,
          false
        );

        const target = $(`ayah-${next}`);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }

        $("positionLabel").textContent =
          `${localDigits(state.currentSurah)} : ${localDigits(next)}`;
      } else if (state.currentSurah < 114) {
        loadSurah(state.currentSurah + 1, 1);
      }
    });

    $("fontDown").addEventListener("click", () => {
      changeFont(-2);
    });

    $("fontUp").addEventListener("click", () => {
      changeFont(2);
    });

    $("quranAudio").addEventListener("error", () => {
      if (state.page !== "home") {
        showToast(t("audioError"));
      }
    });

    // Synchronize settings if another page changes them.
    window.addEventListener("storage", event => {
      const languageKeys = [
        "ibadat_language",
        "siteLanguage",
        "selectedLanguage",
        "language",
        "lang",
        "preferredLanguage"
      ];

      if (
        event.key &&
        languageKeys.includes(event.key)
      ) {
        applyLanguage();
      }

      if (event.key === STORE.theme) {
        applyTheme();
      }

      if (event.key === STORE.saved) {
        loadSaved();
        updateSavedPanel();
      }
    });

    window.addEventListener("pageshow", () => {
      const language = getLanguageFromSite();

      if (language !== state.lang) {
        applyLanguage();
      }
    });
  }

  // Start the Quran application.
  init();
})();
