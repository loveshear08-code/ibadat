
"use strict";

(() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    body: document.body,
    title: $("pageTitle"),
    home: $("homePage"),
    read: $("readPage"),
    listen: $("listenPage"),
    homeFooter: $("homeFooter"),
    readFooter: $("readFooter"),
    listenFooter: $("listenFooter"),
    readContent: $("readContent"),
    surahList: $("surahList"),
    readMessage: $("readFooterMessage"),
    audio: $("quranAudio"),
    play: $("playPause")
  };

  const API = "https://api.alquran.cloud/v1";
  const LANG_KEYS = [
    "ibadat_language",
    "siteLanguage",
    "selectedLanguage",
    "preferredLanguage",
    "language",
    "lang"
  ];
  const THEME_KEYS = [
    "ibadat_theme",
    "siteTheme",
    "selectedTheme",
    "theme",
    "appearance"
  ];

  const translations = {
    bn: {
      subtitle: "শুদ্ধতার পথে শেখা ও অনুশীলন",
      home: "আল-কুরআন",
      readTitle: "কুরআন পড়ুন",
      listenTitle: "তিলাওয়াত শুনুন",
      readQuran: "কুরআন পড়ুন",
      listenQuran: "তিলাওয়াত শুনুন",
      bismillahMeaning: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",
      bismillahReference: "পবিত্র কুরআন",
      footerText: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",
      loading: "লোড হচ্ছে...",
      loadError: "কন্টেন্ট লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      loadingSurahs: "১১৪টি সূরার তালিকা লোড হচ্ছে...",
      loadingAyahs: "আয়াত লোড হচ্ছে...",
      previous: "আগের আয়াত",
      next: "পরের আয়াত",
      playing: "তিলাওয়াত চলছে",
      play: "তিলাওয়াত চালু করুন",
      pause: "তিলাওয়াত থামান",
      surah: "সূরা",
      ayah: "আয়াত",
      ayahs: "আয়াত",
      meccan: "মাক্কী",
      medinan: "মাদানী",
      readMessage: "আল-কুরআন"
    },
    hi: {
      subtitle: "पवित्रता की राह पर सीखना और अभ्यास",
      home: "अल-क़ुरआन",
      readTitle: "क़ुरआन पढ़ें",
      listenTitle: "तिलावत सुनें",
      readQuran: "क़ुरआन पढ़ें",
      listenQuran: "तिलावत सुनें",
      bismillahMeaning: "अल्लाह के नाम से, जो अत्यंत कृपाशील और दयावान है।",
      bismillahReference: "पवित्र क़ुरआन",
      footerText: "इबादत • पवित्रता की राह पर सीखना और अभ्यास",
      loading: "लोड हो रहा है...",
      loadError: "सामग्री लोड नहीं हुई। इंटरनेट जाँचकर पुनः प्रयास करें।",
      loadingSurahs: "114 सूराओं की सूची लोड हो रही है...",
      loadingAyahs: "आयतें लोड हो रही हैं...",
      previous: "पिछली आयत",
      next: "अगली आयत",
      playing: "तिलावत चल रही है",
      play: "तिलावत चलाएँ",
      pause: "तिलावत रोकें",
      surah: "सूरह",
      ayah: "आयत",
      ayahs: "आयतें",
      meccan: "मक्की",
      medinan: "मदनी",
      readMessage: "अल-क़ुरआन"
    },
    en: {
      subtitle: "Learning and practice on the path to purity",
      home: "Al-Quran",
      readTitle: "Read Quran",
      listenTitle: "Listen to Recitation",
      readQuran: "Read Quran",
      listenQuran: "Listen to Recitation",
      bismillahMeaning: "In the name of Allah, the Most Compassionate, the Most Merciful.",
      bismillahReference: "The Holy Quran",
      footerText: "IBADAT • Learning and practice on the path to purity",
      loading: "Loading...",
      loadError: "Could not load content. Check your internet connection and try again.",
      loadingSurahs: "Loading the list of 114 surahs...",
      loadingAyahs: "Loading verses...",
      previous: "Previous ayah",
      next: "Next ayah",
      playing: "Recitation playing",
      play: "Play recitation",
      pause: "Pause recitation",
      surah: "Surah",
      ayah: "Ayah",
      ayahs: "Ayahs",
      meccan: "Meccan",
      medinan: "Medinan",
      readMessage: "Al-Quran"
    }
  };

  const state = {
    page: "home",
    language: "bn",
    theme: "dark",
    surahs: [],
    currentSurah: 1,
    currentAyah: 1,
    fontScale: 1,
    audioPlaying: false,
    requestToken: 0,
    navigationReady: false,
    navigatingBack: false,
    audioQueue: false
  };

  const arabicCache = new Map();
  const translationCache = new Map();
  const surahCache = new Map();

  function safeStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function normalizeLanguage(value) {
    const v = String(value || "").toLowerCase().trim();

    if (["bn", "bn-bd", "bangla", "bengali", "বাংলা"].includes(v)) return "bn";
    if (["hi", "hi-in", "hindi", "हिन्दी", "हिंदी"].includes(v)) return "hi";
    if (["en", "en-us", "en-in", "english"].includes(v)) return "en";

    if (v.startsWith("bn")) return "bn";
    if (v.startsWith("hi")) return "hi";
    if (v.startsWith("en")) return "en";

    return null;
  }

  function normalizeTheme(value) {
    const v = String(value || "").toLowerCase().trim();

    if (["light", "normal", "day", "সাধারণ", "হালকা"].includes(v)) return "light";
    if (["dark", "night", "ডার্ক", "অন্ধকার"].includes(v)) return "dark";

    return null;
  }

  function detectLanguage() {
    for (const key of LANG_KEYS) {
      const value = normalizeLanguage(safeStorageGet(key));
      if (value) return value;
    }

    return normalizeLanguage(document.documentElement.lang) ||
      normalizeLanguage(navigator.language) ||
      "bn";
  }

  function detectTheme() {
    for (const key of THEME_KEYS) {
      const value = normalizeTheme(safeStorageGet(key));
      if (value) return value;
    }

    return "dark";
  }

  function t(key) {
    return translations[state.language][key] || translations.bn[key] || key;
  }

  function updateStaticText() {
    document.documentElement.lang = state.language;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key) node.textContent = t(key);
    });

    updatePageTitle();

    if (el.readMessage) {
      el.readMessage.textContent = t("readMessage");
    }

    updateAudioButton();
  }

  function updatePageTitle() {
    const titleKeys = {
      home: "home",
      read: "readTitle",
      listen: "listenTitle"
    };

    el.title.textContent = t(titleKeys[state.page] || "home");
    document.title = `${el.title.textContent} | IBADAT`;
  }

  function applyTheme(theme) {
    state.theme = normalizeTheme(theme) || "dark";
    document.body.classList.toggle("theme-light", state.theme === "light");
  }

  function updateAudioButton() {
    if (!el.play) return;

    el.play.textContent = state.audioPlaying ? "Ⅱ" : "▶";
    el.play.setAttribute(
      "aria-label",
      state.audioPlaying ? t("pause") : t("play")
    );
  }

  function setPage(page, pushHistory = true) {
    if (!["home", "read", "listen"].includes(page)) return;

    state.page = page;

    el.home.hidden = page !== "home";
    el.read.hidden = page !== "read";
    el.listen.hidden = page !== "listen";

    el.homeFooter.hidden = page !== "home";
    el.readFooter.hidden = page !== "read";
    el.listenFooter.hidden = page !== "listen";

    updatePageTitle();

    if (pushHistory && state.navigationReady) {
      history.pushState(
        { quranSection: true, quranPage: page },
        "",
        location.href
      );
    }

    if (page === "read") {
      loadReadSurah(state.currentSurah);
    } else if (page === "listen") {
      loadSurahList();
    }

    if (page !== "listen" && state.audioPlaying) {
      pauseAudio();
    }
  }

  async function fetchJSON(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "default"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();

    if (json.code !== 200 || !json.data) {
      throw new Error("Invalid API response");
    }

    return json.data;
  }

  function translationEdition() {
    if (state.language === "hi") return "hi.hindi";
    if (state.language === "en") return "en.sahih";
    return "bn.bengali";
  }

  async function getSurahMetadata() {
    if (state.surahs.length) return state.surahs;

    const data = await fetchJSON(`${API}/surah`);
    state.surahs = data;

    return data;
  }

  async function getSurahData(surahNumber, language = state.language) {
    const cacheKey = `${surahNumber}-${language}`;

    if (surahCache.has(cacheKey)) {
      return surahCache.get(cacheKey);
    }

    const edition = language === "hi"
      ? "hi.hindi"
      : language === "en"
        ? "en.sahih"
        : "bn.bengali";

    const [arabic, translated] = await Promise.all([
      fetchJSON(`${API}/surah/${surahNumber}/quran-uthmani`),
      fetchJSON(`${API}/surah/${surahNumber}/${edition}`)
    ]);

    const result = {
      arabic,
      translated,
      ayahs: arabic.ayahs.map((ayah, index) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: translated.ayahs[index]?.text || ""
      }))
    };

    surahCache.set(cacheKey, result);
    return result;
  }

  function showReadStatus(message) {
    el.readContent.replaceChildren();

    const p = document.createElement("p");
    p.className = "status";
    p.textContent = message;

    el.readContent.appendChild(p);
  }

  function renderReadSurah(data) {
    el.readContent.replaceChildren();

    const heading = document.createElement("h2");
    heading.className = "surah-heading";
    heading.textContent =
      `${data.arabic.name} — ${data.translated.englishName}`;

    el.readContent.appendChild(heading);

    if (state.currentSurah !== 1 && state.currentSurah !== 9) {
      const bismillah = document.createElement("p");
      bismillah.className = "bismillah-small";
      bismillah.lang = "ar";
      bismillah.textContent = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
      el.readContent.appendChild(bismillah);
    }

    const fragment = document.createDocumentFragment();

    data.ayahs.forEach((ayah) => {
      const item = document.createElement("article");
      item.className = "ayah";
      item.dataset.ayah = String(ayah.numberInSurah);

      const arabic = document.createElement("p");
      arabic.className = "ayah-arabic";
      arabic.lang = "ar";
      arabic.dir = "rtl";
      arabic.appendChild(document.createTextNode(ayah.text + " "));

      const number = document.createElement("span");
      number.className = "ayah-number";
      number.textContent = String(ayah.numberInSurah);
      arabic.appendChild(number);

      const translation = document.createElement("p");
      translation.className = "ayah-translation";
      translation.textContent = ayah.translation;

      item.append(arabic, translation);
      fragment.appendChild(item);
    });

    el.readContent.appendChild(fragment);
    applyFontScale();

    el.readMessage.textContent =
      `${t("surah")} ${state.currentSurah} • ${t("ayah")} ${state.currentAyah}`;
  }

  async function loadReadSurah(surahNumber) {
    const token = ++state.requestToken;
    state.currentSurah = Math.min(114, Math.max(1, surahNumber));

    showReadStatus(t("loadingAyahs"));

    try {
      const data = await getSurahData(state.currentSurah);

      if (token !== state.requestToken || state.page !== "read") return;

      renderReadSurah(data);
      scrollToCurrentAyah();
    } catch (error) {
      if (token !== state.requestToken) return;

      showReadStatus(t("loadError"));
    }
  }

  function scrollToCurrentAyah() {
    const item = el.readContent.querySelector(
      `[data-ayah="${state.currentAyah}"]`
    );

    if (item) {
      item.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }

  function applyFontScale() {
    el.readContent.style.setProperty("--content-scale", String(state.fontScale));
  }

  function changeFont(amount) {
    state.fontScale = Math.max(
      0.7,
      Math.min(1.7, Math.round((state.fontScale + amount) * 10) / 10)
    );

    applyFontScale();
  }

  function renderSurahList(surahs) {
    el.surahList.replaceChildren();

    const fragment = document.createDocumentFragment();

    surahs.forEach((surah) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "surah-item";
      button.dataset.surah = String(surah.number);

      if (surah.number === state.currentSurah) {
        button.classList.add("active");
      }

      const number = document.createElement("span");
      number.className = "surah-number";
      number.textContent = String(surah.number);

      const info = document.createElement("span");
      info.className = "surah-info";

      const name = document.createElement("span");
      name.className = "surah-name";
      name.textContent = surah.englishName;

      const meta = document.createElement("span");
      meta.className = "surah-meta";

      const place = surah.revelationType === "Meccan"
        ? t("meccan")
        : t("medinan");

      meta.textContent = `${place} • ${surah.numberOfAyahs} ${t("ayahs")}`;

      info.append(name, meta);

      const arabic = document.createElement("span");
      arabic.className = "surah-arabic";
      arabic.lang = "ar";
      arabic.textContent = surah.name;

      button.append(number, info, arabic);
      fragment.appendChild(button);
    });

    el.surahList.appendChild(fragment);
  }

  async function loadSurahList() {
    if (state.surahs.length) {
      renderSurahList(state.surahs);
      return;
    }

    el.surahList.replaceChildren();

    const status = document.createElement("p");
    status.className = "status";
    status.textContent = t("loadingSurahs");
    el.surahList.appendChild(status);

    try {
      const surahs = await getSurahMetadata();

      if (state.page === "listen") {
        renderSurahList(surahs);
      }
    } catch (error) {
      el.surahList.replaceChildren();

      const message = document.createElement("p");
      message.className = "status";
      message.textContent = t("loadError");

      el.surahList.appendChild(message);
    }
  }

  function updateActiveSurah() {
    el.surahList.querySelectorAll(".surah-item").forEach((item) => {
      item.classList.toggle(
        "active",
        Number(item.dataset.surah) === state.currentSurah
      );
    });
  }

  async function selectSurah(surahNumber, autoplay = false) {
    state.currentSurah = Math.max(1, Math.min(114, surahNumber));
    state.currentAyah = 1;

    updateActiveSurah();

    if (state.page === "read") {
      await loadReadSurah(state.currentSurah);
    }

    if (autoplay) {
      await playCurrentAyah();
    }
  }

  async function getAudioUrl(surahNumber, ayahNumber) {
    const data = await fetchJSON(
      `${API}/ayah/${surahNumber}:${ayahNumber}/ar.alafasy`
    );

    return data.audio;
  }

  async function playCurrentAyah() {
    try {
      const surahData = await getSurahData(state.currentSurah);
      const ayah = surahData.ayahs.find(
        (item) => item.numberInSurah === state.currentAyah
      );

      if (!ayah) {
        state.currentAyah = 1;
      }

      const url = await getAudioUrl(state.currentSurah, state.currentAyah);

      el.audio.src = url;
      el.audio.load();

      await el.audio.play();

      state.audioPlaying = true;
      updateAudioButton();
      updateActiveSurah();
    } catch (error) {
      state.audioPlaying = false;
      updateAudioButton();
    }
  }

  function pauseAudio() {
    el.audio.pause();
    state.audioPlaying = false;
    updateAudioButton();
  }

  async function toggleAudio() {
    if (!el.audio.paused && !el.audio.ended) {
      pauseAudio();
      return;
    }

    await playCurrentAyah();
  }

  async function moveAyah(direction) {
    let surah = state.currentSurah;
    let ayah = state.currentAyah;

    const currentData = await getSurahData(surah);
    const totalAyahs = currentData.ayahs.length;

    ayah += direction;

    if (ayah > totalAyahs) {
      if (surah >= 114) {
        state.currentSurah = 114;
        state.currentAyah = totalAyahs;
        pauseAudio();
        updateActiveSurah();
        return;
      }

      surah += 1;
      ayah = 1;
    } else if (ayah < 1) {
      if (surah <= 1) {
        state.currentSurah = 1;
        state.currentAyah = 1;
        updateActiveSurah();
        return;
      }

      surah -= 1;
      const previousData = await getSurahData(surah);
      ayah = previousData.ayahs.length;
    }

    state.currentSurah = surah;
    state.currentAyah = ayah;

    updateActiveSurah();

    if (state.page === "read") {
      await loadReadSurah(surah);
    } else {
      await playCurrentAyah();
    }
  }

  el.audio.addEventListener("play", () => {
    state.audioPlaying = true;
    updateAudioButton();
  });

  el.audio.addEventListener("pause", () => {
    state.audioPlaying = false;
    updateAudioButton();
  });

  el.audio.addEventListener("ended", async () => {
    state.audioPlaying = false;
    updateAudioButton();

    if (state.currentSurah === 114) {
      const data = await getSurahData(114);

      if (state.currentAyah >= data.ayahs.length) {
        state.currentAyah = data.ayahs.length;
        return;
      }
    }

    await moveAyah(1);
  });

  $("openRead").addEventListener("click", () => {
    setPage("read");
  });

  $("openListen").addEventListener("click", () => {
    setPage("listen");
  });

  $("fontDown").addEventListener("click", () => changeFont(-0.1));
  $("fontUp").addEventListener("click", () => changeFont(0.1));

  $("prevAyah").addEventListener("click", () => {
    moveAyah(-1).catch(() => {});
  });

  $("nextAyah").addEventListener("click", () => {
    moveAyah(1).catch(() => {});
  });

  $("prevTrack").addEventListener("click", () => {
    moveAyah(-1).catch(() => {});
  });

  $("nextTrack").addEventListener("click", () => {
    moveAyah(1).catch(() => {});
  });

  $("playPause").addEventListener("click", () => {
    toggleAudio();
  });

  el.surahList.addEventListener("click", (event) => {
    const button = event.target.closest(".surah-item");
    if (!button) return;

    const surahNumber = Number(button.dataset.surah);
    if (!Number.isInteger(surahNumber)) return;

    selectSurah(surahNumber, true);
  });

  function syncSettings(detail) {
    if (!detail || typeof detail !== "object") return;

    const lang = normalizeLanguage(
      detail.language ?? detail.lang ?? detail.locale
    );

    const theme = normalizeTheme(
      detail.theme ?? detail.appearance ?? detail.mode
    );

    let changedLanguage = false;

    if (lang && lang !== state.language) {
      state.language = lang;
      changedLanguage = true;
      translationCache.clear();
      surahCache.clear();
      state.surahs = [];
    }

    if (theme) applyTheme(theme);

    updateStaticText();

    if (changedLanguage) {
      if (state.page === "read") {
        loadReadSurah(state.currentSurah);
      }

      if (state.page === "listen") {
        state.surahs = [];
        loadSurahList();
      }
    }
  }

  window.addEventListener("storage", (event) => {
    if (!event.key) {
      syncSettings({
        language: detectLanguage(),
        theme: detectTheme()
      });
      return;
    }

    if (LANG_KEYS.includes(event.key) || THEME_KEYS.includes(event.key)) {
      syncSettings({
        language: detectLanguage(),
        theme: detectTheme()
      });
    }
  });

  window.addEventListener("message", (event) => {
    const data = event.data;

    if (!data || typeof data !== "object") return;

    const type = String(data.type || data.action || "").toLowerCase();

    if (
      type === "ibadat-settings" ||
      type === "settings-changed" ||
      type === "language-changed" ||
      type === "theme-changed"
    ) {
      syncSettings(data.settings || data);
    }
  });

  window.addEventListener("popstate", (event) => {
    if (state.page === "read" || state.page === "listen") {
      state.page = "home";

      el.home.hidden = false;
      el.read.hidden = true;
      el.listen.hidden = true;

      el.homeFooter.hidden = false;
      el.readFooter.hidden = true;
      el.listenFooter.hidden = true;

      updatePageTitle();
      pauseAudio();

      return;
    }

    /*
      Home page থেকে Back হলে browser/WebView-এর আগের
      host page-এ ফিরে যাওয়ার সুযোগ রাখা হচ্ছে।
      এখানে host history-কে replace করা হচ্ছে না।
    */
  });

  function initialize() {
    state.language = detectLanguage();
    applyTheme(detectTheme());
    updateStaticText();

    /*
      প্রথমে হোস্ট অ্যাপের বর্তমান history entry অক্ষত রাখা হয়।
      তারপর Home marker যোগ করা হয়, যাতে ভিতরের পেজ থেকে
      Back চাপলে Home-এ ফেরা যায়।
    */
    history.pushState(
      { quranSection: true, quranPage: "home" },
      "",
      location.href
    );

    state.navigationReady = true;

    getSurahMetadata().catch(() => {});
  }

  initialize();
})();
