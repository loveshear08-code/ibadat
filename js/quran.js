
"use strict";

(() => {
  const $ = (id) => document.getElementById(id);

  const API = "https://api.alquran.cloud/v1";
  const ARABIC_EDITION = "quran-uthmani";
  const AUDIO_EDITION = "ar.alafasy";

  const LANGUAGE_EDITION = {
    bn: "bn.bengali",
    en: "en.sahih",
    hi: "hi.hindi"
  };

  const LANGUAGE_KEYS = [
    "ibadat_language",
    "siteLanguage",
    "selectedLanguage",
    "language",
    "lang",
    "preferredLanguage"
  ];

  const TEXT = {
    bn: {
      bismillahMeaning: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",
      read: "কুরআন পড়ুন",
      listen: "তিলাওয়াত শুনুন",
      readTitle: "আল-কুরআন",
      readSubtitle: "পবিত্র কুরআন পড়ুন ও বুঝুন",
      listenTitle: "তিলাওয়াত শুনুন",
      listenSubtitle: "পবিত্র কুরআনের তিলাওয়াত শুনুন",
      description: "পবিত্র কুরআন আল্লাহর বাণী। এটি আমাদের সঠিক পথ দেখায়, সত্য ও ন্যায়ের শিক্ষা দেয় এবং জীবনের প্রতিটি ক্ষেত্রে আল্লাহর সন্তুষ্টি অর্জনের পথ শেখায়।",
      footer: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",
      search: "সূরা খুঁজুন",
      chooseSurah: "সূরা নির্বাচন করুন",
      searchPlaceholder: "সূরার নাম বা নম্বর লিখুন",
      loading: "লোড হচ্ছে...",
      loadingSurah: "সূরার তথ্য লোড হচ্ছে...",
      loadingList: "সূরার তালিকা লোড হচ্ছে...",
      loadError: "তথ্য আনা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      noResults: "কোনো সূরা পাওয়া যায়নি।",
      verses: "আয়াত",
      surah: "সূরা",
      previousSurah: "আগের সূরা",
      nextSurah: "পরের সূরা",
      play: "তিলাওয়াত চালু করুন",
      pause: "তিলাওয়াত থামান",
      playing: "তিলাওয়াত চলছে",
      paused: "তিলাওয়াত থামানো হয়েছে",
      audioError: "তিলাওয়াত চালানো যাচ্ছে না। আবার চেষ্টা করুন।",
      translationMissing: "এই ভাষায় অনুবাদ পাওয়া যায়নি।",
      firstSurah: "এটিই প্রথম সূরা।",
      lastSurah: "এটিই শেষ সূরা।",
      readArabicAlt: "আরবি আয়াত",
      recitation: "কুরআন তিলাওয়াত"
    },

    en: {
      bismillahMeaning: "In the name of Allah, the Most Compassionate, the Most Merciful.",
      read: "Read Quran",
      listen: "Listen to Recitation",
      readTitle: "The Holy Quran",
      readSubtitle: "Read and understand the Holy Quran",
      listenTitle: "Listen to Recitation",
      listenSubtitle: "Listen to the recitation of the Holy Quran",
      description: "The Holy Quran is the word of Allah. It guides us to the right path, teaches truth and justice, and shows us how to seek Allah's pleasure in every part of life.",
      footer: "IBADAT • Learn and practise with purity",
      search: "Find a Surah",
      chooseSurah: "Choose a Surah",
      searchPlaceholder: "Enter a surah name or number",
      loading: "Loading...",
      loadingSurah: "Loading surah...",
      loadingList: "Loading surah list...",
      loadError: "Unable to load data. Check your internet connection and try again.",
      noResults: "No surah found.",
      verses: "verses",
      surah: "Surah",
      previousSurah: "Previous surah",
      nextSurah: "Next surah",
      play: "Play recitation",
      pause: "Pause recitation",
      playing: "Recitation playing",
      paused: "Recitation paused",
      audioError: "Unable to play recitation. Please try again.",
      translationMissing: "Translation is unavailable in this language.",
      firstSurah: "This is the first surah.",
      lastSurah: "This is the last surah.",
      readArabicAlt: "Arabic verse",
      recitation: "Quran recitation"
    },

    hi: {
      bismillahMeaning: "अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",
      read: "क़ुरआन पढ़ें",
      listen: "तिलावत सुनें",
      readTitle: "पवित्र क़ुरआन",
      readSubtitle: "पवित्र क़ुरआन पढ़ें और समझें",
      listenTitle: "तिलावत सुनें",
      listenSubtitle: "पवित्र क़ुरआन की तिलावत सुनें",
      description: "पवित्र क़ुरआन अल्लाह का वचन है। यह हमें सही मार्ग दिखाता है, सत्य और न्याय की शिक्षा देता है तथा जीवन के हर क्षेत्र में अल्लाह की प्रसन्नता पाने का रास्ता बताता है।",
      footer: "IBADAT • पवित्रता के साथ सीखें और अभ्यास करें",
      search: "सूरह खोजें",
      chooseSurah: "सूरह चुनें",
      searchPlaceholder: "सूरह का नाम या संख्या लिखें",
      loading: "लोड हो रहा है...",
      loadingSurah: "सूरह की जानकारी लोड हो रही है...",
      loadingList: "सूरह सूची लोड हो रही है...",
      loadError: "जानकारी नहीं मिल सकी। इंटरनेट जाँचकर फिर प्रयास करें।",
      noResults: "कोई सूरह नहीं मिली।",
      verses: "आयतें",
      surah: "सूरह",
      previousSurah: "पिछली सूरह",
      nextSurah: "अगली सूरह",
      play: "तिलावत चलाएँ",
      pause: "तिलावत रोकें",
      playing: "तिलावत चल रही है",
      paused: "तिलावत रोक दी गई है",
      audioError: "तिलावत नहीं चल सकी। फिर प्रयास करें।",
      translationMissing: "इस भाषा में अनुवाद उपलब्ध नहीं है।",
      firstSurah: "यह पहली सूरह है।",
      lastSurah: "यह अंतिम सूरह है।",
      readArabicAlt: "अरबी आयत",
      recitation: "क़ुरआन तिलावत"
    }
  };

  const state = {
    language: "bn",
    page: "home",
    surahs: [],
    currentSurah: 1,
    currentAyah: 1,
    fontSize: 32,
    audioItems: [],
    audioIndex: 0,
    playingSurah: false,
    audioMode: "none",
    messageTimeout: null,
    requestNumber: 0
  };

  const audio = $("quranAudio");

  function t(key) {
    return TEXT[state.language]?.[key] || TEXT.bn[key] || key;
  }

  function normalizeLanguage(value) {
    if (!value) return null;

    let raw = String(value).trim().toLowerCase();

    try {
      if (raw.startsWith("{") || raw.startsWith('"')) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "string") raw = parsed.toLowerCase();
        else if (parsed && typeof parsed === "object") {
          raw = String(
            parsed.language ||
            parsed.lang ||
            parsed.locale ||
            parsed.selectedLanguage ||
            ""
          ).toLowerCase();
        }
      }
    } catch (_) {}

    if (
      raw === "bn" ||
      raw.startsWith("bn-") ||
      raw.includes("bengali") ||
      raw.includes("বাংলা")
    ) return "bn";

    if (
      raw === "hi" ||
      raw.startsWith("hi-") ||
      raw.includes("hindi") ||
      raw.includes("हिन्दी")
    ) return "hi";

    if (
      raw === "en" ||
      raw.startsWith("en-") ||
      raw.includes("english")
    ) return "en";

    return null;
  }

  function getSiteLanguage() {
    try {
      for (const key of LANGUAGE_KEYS) {
        const value = localStorage.getItem(key);
        const language = normalizeLanguage(value);
        if (language) return language;
      }
    } catch (_) {}

    return normalizeLanguage(document.documentElement.lang) || "bn";
  }

  function localDigits(value) {
    const str = String(value ?? "");

    if (state.language === "bn") {
      return str.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);
    }

    if (state.language === "hi") {
      return str.replace(/\d/g, d => "०१२३४५६७८९"[Number(d)]);
    }

    return str;
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  async function api(path) {
    const response = await fetch(`${API}${path}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();

    if (json.code && json.code !== 200) {
      throw new Error(json.status || "API error");
    }

    return json.data;
  }

  function chapterName(chapter) {
    if (!chapter) return "";

    if (state.language === "bn" && chapter.nameBn) {
      return chapter.nameBn;
    }

    if (state.language === "hi" && chapter.nameHindi) {
      return chapter.nameHindi;
    }

    return chapter.englishName || chapter.name || "";
  }

  function arabicSurahName(chapter) {
    return chapter?.name || "";
  }

  function showMessage(message) {
    const element = $("appMessage");

    element.textContent = message;
    element.classList.add("show");

    if (state.messageTimeout) {
      clearTimeout(state.messageTimeout);
    }

    state.messageTimeout = setTimeout(() => {
      element.classList.remove("show");
    }, 2600);
  }

  function setHomeHeader() {
    $("heroBoard").classList.remove("is-inner-page");

    $("pageTitle").textContent = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
    $("pageTitle").className = "hero-bismillah";
    $("pageTitle").setAttribute("lang", "ar");
    $("pageTitle").setAttribute("dir", "rtl");

    $("pageSubtitle").textContent = t("bismillahMeaning");

    $("quranHeading").textContent =
      state.language === "en" ? "The Holy Quran" :
      state.language === "hi" ? "पवित्र क़ुरआन" :
      "আল-কুরআন";

    $("quranDescription").textContent = t("description");
    $("readOptionText").textContent = t("read");
    $("listenOptionText").textContent = t("listen");
    $("footerText").textContent = t("footer");

    $("quranImage").alt =
      state.language === "en" ? "The Holy Quran opened on a wooden stand" :
      state.language === "hi" ? "रिहाल पर खुला पवित्र क़ुरआन" :
      "রেহালের উপর খোলা পবিত্র কুরআন";
  }

  function setInnerHeader(page) {
    $("heroBoard").classList.add("is-inner-page");

    $("pageTitle").removeAttribute("lang");
    $("pageTitle").removeAttribute("dir");
    $("pageTitle").className = "hero-bismillah";

    if (page === "read") {
      $("pageTitle").textContent = t("readTitle");
      $("pageSubtitle").textContent = t("readSubtitle");
    } else {
      $("pageTitle").textContent = t("listenTitle");
      $("pageSubtitle").textContent = t("listenSubtitle");
    }
  }

  function applyLanguage() {
    const newLanguage = getSiteLanguage();

    if (newLanguage === state.language) {
      setHomeHeader();

      if (state.page === "read") {
        renderSurahSearchList();
      }

      if (state.page === "listen") {
        renderListenList();
      }

      return;
    }

    state.language = newLanguage;
    document.documentElement.lang = newLanguage;

    setHomeHeader();

    if (state.page === "read") {
      setInnerHeader("read");
      $("surahSearchHeading").textContent = t("chooseSurah");
      $("surahSearchInput").placeholder = t("searchPlaceholder");
      loadSurah(state.currentSurah, state.currentAyah);
      renderSurahSearchList();
    } else if (state.page === "listen") {
      setInnerHeader("listen");
      $("listenHeading").textContent = t("listenTitle");
      $("listenDescription").textContent = t("listenSubtitle");
      renderListenList();
    }
  }

  function openPage(page) {
    pauseAudio(false);

    state.page = page;

    $("homePage").hidden = page !== "home";
    $("readPage").hidden = page !== "read";
    $("listenPage").hidden = page !== "listen";

    $("homeFooter").hidden = page !== "home";
    $("readFooter").hidden = page !== "read";
    $("listenFooter").hidden = page !== "listen";

    if (page === "home") {
      setHomeHeader();
      return;
    }

    setInnerHeader(page);

    if (page === "read") {
      $("surahSearchHeading").textContent = t("chooseSurah");
      $("surahSearchInput").placeholder = t("searchPlaceholder");

      loadSurah(state.currentSurah, state.currentAyah);
      renderSurahSearchList();
    }

    if (page === "listen") {
      $("listenHeading").textContent = t("listenTitle");
      $("listenDescription").textContent = t("listenSubtitle");
      renderListenList();
    }
  }

  async function loadSurahNames() {
    $("readStatus").textContent = t("loadingSurah");
    $("listenStatus").textContent = t("loadingList");

    const chapters = await api("/surah");

    state.surahs = chapters.map(chapter => ({
      ...chapter,
      nameBn: "",
      nameHindi: ""
    }));

    try {
      const [bnData, hiData] = await Promise.all([
        api("/quran/bn.bengali").catch(() => null),
        api("/quran/hi.hindi").catch(() => null)
      ]);

      if (bnData?.surahs) {
        bnData.surahs.forEach((item, index) => {
          if (state.surahs[index]) {
            state.surahs[index].nameBn = item.name;
          }
        });
      }

      if (hiData?.surahs) {
        hiData.surahs.forEach((item, index) => {
          if (state.surahs[index]) {
            state.surahs[index].nameHindi = item.name;
          }
        });
      }
    } catch (_) {}

    renderSurahSearchList();
    renderListenList();
  }

  function renderSurahSearchList() {
    const list = $("surahSearchList");
    if (!list) return;

    const query = $("surahSearchInput").value.trim().toLowerCase();

    const results = state.surahs.filter(chapter => {
      const name = chapterName(chapter).toLowerCase();
      const english = String(chapter.englishName || "").toLowerCase();
      const arabic = arabicSurahName(chapter);

      return (
        !query ||
        name.includes(query) ||
        english.includes(query) ||
        arabic.includes(query) ||
        String(chapter.number).includes(query)
      );
    });

    if (!results.length) {
      list.innerHTML = `<p class="status">${escapeHTML(t("noResults"))}</p>`;
      return;
    }

    list.innerHTML = results.map(chapter => `
      <button
        class="search-surah-row"
        type="button"
        data-select-surah="${chapter.number}"
      >
        <span class="surah-index">${localDigits(chapter.number)}</span>
        <span class="surah-copy">
          <strong>${escapeHTML(t("surah"))} ${escapeHTML(chapterName(chapter))}</strong>
          <small>${localDigits(chapter.numberOfAyahs)} ${escapeHTML(t("verses"))}</small>
        </span>
        <span class="surah-arabic" lang="ar" dir="rtl">${escapeHTML(arabicSurahName(chapter))}</span>
      </button>
    `).join("");

    list.querySelectorAll("[data-select-surah]").forEach(button => {
      button.addEventListener("click", () => {
        const number = Number(button.dataset.selectSurah);

        state.currentSurah = number;
        state.currentAyah = 1;

        $("surahSearchPanel").hidden = true;
        $("searchToggle").setAttribute("aria-expanded", "false");
        $("surahSearchInput").value = "";

        loadSurah(number, 1);
      });
    });
  }

  function renderListenList() {
    const list = $("surahList");
    if (!list) return;

    if (!state.surahs.length) {
      list.innerHTML = `<p class="status">${escapeHTML(t("loadingList"))}</p>`;
      return;
    }

    list.innerHTML = state.surahs.map(chapter => `
      <button
        type="button"
        class="surah-row"
        data-listen-surah="${chapter.number}"
      >
        <span class="surah-index">${localDigits(chapter.number)}</span>

        <span class="surah-copy">
          <strong>${escapeHTML(t("surah"))} ${escapeHTML(chapterName(chapter))}</strong>
          <small>${localDigits(chapter.numberOfAyahs)} ${escapeHTML(t("verses"))}</small>
        </span>

        <span class="surah-arabic" lang="ar" dir="rtl">
          ${escapeHTML(arabicSurahName(chapter))}
        </span>
      </button>
    `).join("");

    list.querySelectorAll("[data-listen-surah]").forEach(button => {
      button.addEventListener("click", async () => {
        const number = Number(button.dataset.listenSurah);

        state.currentSurah = number;
        state.currentAyah = 1;

        await startFullSurah(number);
      });
    });
  }

  async function fetchSurah(number) {
    const edition = LANGUAGE_EDITION[state.language] || LANGUAGE_EDITION.bn;

    const [arabic, translation, recitation] = await Promise.all([
      api(`/surah/${number}/${ARABIC_EDITION}`),
      api(`/surah/${number}/${edition}`).catch(() => null),
      api(`/surah/${number}/${AUDIO_EDITION}`).catch(() => null)
    ]);

    return {
      arabic: arabic.ayahs || [],
      translation: translation?.ayahs || [],
      audio: recitation?.ayahs || []
    };
  }

  async function loadSurah(number, jumpAyah = 1) {
    if (number < 1 || number > 114) return;

    const request = ++state.requestNumber;

    state.currentSurah = number;
    state.currentAyah = jumpAyah;

    const chapter = state.surahs[number - 1];

    $("readContent").innerHTML =
      `<p class="status">${escapeHTML(t("loadingSurah"))}</p>`;

    try {
      const data = await fetchSurah(number);

      if (request !== state.requestNumber) return;

      state.currentAyah = Math.min(
        Math.max(1, jumpAyah),
        Math.max(1, data.arabic.length)
      );

      const heading = document.createElement("div");
      heading.className = "ayah-card";

      heading.innerHTML = `
        <h2>${escapeHTML(t("surah"))} ${escapeHTML(chapterName(chapter))}</h2>
        <p class="ayah-translation">
          ${localDigits(data.arabic.length)} ${escapeHTML(t("verses"))}
        </p>
      `;

      const fragment = document.createDocumentFragment();
      fragment.appendChild(heading);

      data.arabic.forEach((ayah, index) => {
        const numberInSurah = ayah.numberInSurah || index + 1;
        const translation =
          data.translation[index]?.text || t("translationMissing");

        const card = document.createElement("article");
        card.className = "ayah-card";
        card.id = `ayah-${numberInSurah}`;

        const top = document.createElement("div");
        top.className = "ayah-card-top";

        const badge = document.createElement("span");
        badge.className = "ayah-number";
        badge.textContent = localDigits(numberInSurah);

        const actions = document.createElement("div");
        actions.className = "ayah-actions";

        const playButton = document.createElement("button");
        playButton.className = "mini-button";
        playButton.type = "button";
        playButton.textContent = "▶";
        playButton.setAttribute("aria-label", t("play"));

        playButton.addEventListener("click", () => {
          playSingleAyah(number, numberInSurah);
        });

        actions.appendChild(playButton);
        top.append(badge, actions);

        const arabicText = document.createElement("div");
        arabicText.className = "ayah-arabic";
        arabicText.lang = "ar";
        arabicText.dir = "rtl";
        arabicText.textContent = ayah.text;

        const translationText = document.createElement("p");
        translationText.className = "ayah-translation";
        translationText.textContent = translation;

        card.append(top, arabicText, translationText);
        fragment.appendChild(card);
      });

      $("readContent").replaceChildren(fragment);

      $("readFooterMessage").textContent =
        `${localDigits(number)} : ${localDigits(state.currentAyah)}`;

      const target = $(`ayah-${state.currentAyah}`);

      if (target) {
        target.scrollIntoView({ block: "start", behavior: "auto" });
      }
    } catch (_) {
      if (request !== state.requestNumber) return;

      $("readContent").innerHTML =
        `<p class="status">${escapeHTML(t("loadError"))}</p>`;
    }
  }

  function updateFooterPosition() {
    $("readFooterMessage").textContent =
      `${localDigits(state.currentSurah)} : ${localDigits(state.currentAyah)}`;
  }

  async function navigateReadSurah(direction) {
    const target = state.currentSurah + direction;

    if (target < 1) {
      showMessage(t("firstSurah"));
      return;
    }

    if (target > 114) {
      showMessage(t("lastSurah"));
      return;
    }

    state.currentSurah = target;
    state.currentAyah = 1;

    await loadSurah(target, 1);
  }

  async function playSingleAyah(surahNumber, ayahNumber) {
    try {
      pauseAudio(false);

      const data = await fetchSurah(surahNumber);
      const item = data.audio[ayahNumber - 1];

      if (!item?.audio) {
        showMessage(t("audioError"));
        return;
      }

      state.currentSurah = surahNumber;
      state.currentAyah = ayahNumber;
      state.audioMode = "single";
      state.playingSurah = false;

      audio.src = item.audio;
      audio.onended = () => {
        state.audioMode = "none";
        updatePlayButton();
      };

      await audio.play();
      updatePlayButton();
    } catch (_) {
      showMessage(t("audioError"));
    }
  }

  async function startFullSurah(number) {
    pauseAudio(false);

    try {
      const data = await fetchSurah(number);

      if (!data.audio.length) {
        showMessage(t("audioError"));
        return;
      }

      state.currentSurah = number;
      state.currentAyah = 1;
      state.audioItems = data.audio;
      state.audioIndex = 0;
      state.audioMode = "surah";
      state.playingSurah = true;

      playCurrentTrack();
    } catch (_) {
      showMessage(t("audioError"));
    }
  }

  async function playCurrentTrack() {
    if (!state.playingSurah) return;

    if (state.audioIndex >= state.audioItems.length) {
      state.playingSurah = false;
      state.audioMode = "none";
      updatePlayButton();
      showMessage(t("playing") + " ✓");
      return;
    }

    const item = state.audioItems[state.audioIndex];

    if (!item?.audio) {
      state.audioIndex += 1;
      playCurrentTrack();
      return;
    }

    state.currentAyah = state.audioIndex + 1;

    audio.src = item.audio;
    audio.onended = () => {
      if (!state.playingSurah) return;

      state.audioIndex += 1;
      state.currentAyah = state.audioIndex + 1;
      playCurrentTrack();
    };

    try {
      await audio.play();
      updatePlayButton();
    } catch (_) {
      state.playingSurah = false;
      state.audioMode = "none";
      updatePlayButton();
      showMessage(t("audioError"));
    }
  }

  function updatePlayButton() {
    const isPlaying = !audio.paused && !audio.ended;

    $("playPause").textContent = isPlaying ? "Ⅱ" : "▶";
    $("playPause").setAttribute(
      "aria-label",
      isPlaying ? t("pause") : t("play")
    );
    $("playPause").title = isPlaying ? t("pause") : t("play");
  }

  function pauseAudio(resetMode = true) {
    audio.pause();

    if (resetMode) {
      state.playingSurah = false;
      state.audioMode = "none";
      audio.onended = null;
    }

    updatePlayButton();
  }

  async function toggleAudio() {
    if (!audio.paused) {
      audio.pause();
      updatePlayButton();
      return;
    }

    if (state.audioMode === "surah" && state.audioItems.length) {
      state.playingSurah = true;

      try {
        await audio.play();
        updatePlayButton();
      } catch (_) {
        playCurrentTrack();
      }

      return;
    }

    if (audio.src && state.audioMode === "single") {
      try {
        await audio.play();
        updatePlayButton();
      } catch (_) {
        showMessage(t("audioError"));
      }

      return;
    }

    await startFullSurah(state.currentSurah);
  }

  function changeFont(delta) {
    state.fontSize = Math.max(22, Math.min(56, state.fontSize + delta));

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.fontSize}px`
    );

    try {
      localStorage.setItem("ibadat_quran_font_size", String(state.fontSize));
    } catch (_) {}
  }

  function restoreFontSize() {
    try {
      const saved = Number(localStorage.getItem("ibadat_quran_font_size"));

      if (saved >= 22 && saved <= 56) {
        state.fontSize = saved;
      }
    } catch (_) {}

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.fontSize}px`
    );
  }

  function wireEvents() {
    $("openRead").addEventListener("click", () => openPage("read"));
    $("openListen").addEventListener("click", () => openPage("listen"));

    $("searchToggle").addEventListener("click", () => {
      const panel = $("surahSearchPanel");
      panel.hidden = !panel.hidden;

      $("searchToggle").setAttribute(
        "aria-expanded",
        String(!panel.hidden)
      );

      if (!panel.hidden) {
        renderSurahSearchList();
        $("surahSearchInput").focus();
      }
    });

    $("surahSearchInput").addEventListener("input", renderSurahSearchList);

    $("fontDown").addEventListener("click", () => changeFont(-2));
    $("fontUp").addEventListener("click", () => changeFont(2));

    /* READ PAGE FOOTER: PREVIOUS / NEXT SURAH */
    $("prevAyah").addEventListener("click", () => {
      navigateReadSurah(-1);
    });

    $("nextAyah").addEventListener("click", () => {
      navigateReadSurah(1);
    });

    /* LISTEN PAGE FOOTER */
    $("prevTrack").addEventListener("click", async () => {
      if (state.currentSurah <= 1) {
        showMessage(t("firstSurah"));
        return;
      }

      await startFullSurah(state.currentSurah - 1);
    });

    $("nextTrack").addEventListener("click", async () => {
      if (state.currentSurah >= 114) {
        showMessage(t("lastSurah"));
        return;
      }

      await startFullSurah(state.currentSurah + 1);
    });

    $("playPause").addEventListener("click", toggleAudio);

    audio.addEventListener("play", updatePlayButton);
    audio.addEventListener("pause", updatePlayButton);
    audio.addEventListener("ended", updatePlayButton);

    audio.addEventListener("error", () => {
      if (state.page === "listen" || state.page === "read") {
        showMessage(t("audioError"));
      }
    });

    window.addEventListener("storage", event => {
      if (LANGUAGE_KEYS.includes(event.key)) {
        applyLanguage();
      }
    });

    window.addEventListener("pageshow", () => {
      const newLanguage = getSiteLanguage();

      if (newLanguage !== state.language) {
        state.language = newLanguage;
        applyLanguage();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        const newLanguage = getSiteLanguage();

        if (newLanguage !== state.language) {
          state.language = newLanguage;
          applyLanguage();
        }
      }
    });
  }

  async function init() {
    applyLanguage();
    restoreFontSize();
    wireEvents();

    $("quranImage").addEventListener("error", () => {
      $("quranImage").style.visibility = "hidden";
    });

    $("quranImage").addEventListener("load", () => {
      $("quranImage").style.visibility = "visible";
    });

    try {
      await loadSurahNames();

      if (state.page === "home") {
        $("readContent").innerHTML =
          `<p class="status">${escapeHTML(t("loadingSurah"))}</p>`;
      }
    } catch (_) {
      $("surahSearchList").innerHTML =
        `<p class="status">${escapeHTML(t("loadError"))}</p>`;

      $("surahList").innerHTML =
        `<p class="status">${escapeHTML(t("loadError"))}</p>`;
    }
  }

  init();
})();
