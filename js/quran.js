
(() => {
  "use strict";

  const API = "https://api.alquran.cloud/v1";
  const ARABIC_EDITION = "quran-uthmani";
  const AUDIO_EDITION = "ar.alafasy";

  const TRANSLATIONS = {
    bn: "bn.bengali",
    en: "en.sahih",
    hi: "hi.hindi"
  };

  const LOCALES = {
    bn: "bn-BD",
    en: "en-US",
    hi: "hi-IN"
  };

  const TEXT = {
    bn: {
      homeTitle: "আল-কুরআন",
      homeSubtitle: "শুদ্ধতার পথে শেখা ও অনুশীলন",
      readTitle: "আল-কুরআন",
      readSubtitle: "মনোযোগ দিয়ে পবিত্র কুরআন পড়ুন",
      listenTitle: "তিলাওয়াত শুনুন",
      listenSubtitle: "কুরআনের তিলাওয়াতে প্রশান্তি অনুভব করুন",
      bismillahMeaning: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",
      description: "পবিত্র কুরআন আল্লাহর বাণী। এটি আমাদের সঠিক পথ দেখায়, সত্য ও ন্যায়ের শিক্ষা দেয় এবং জীবনের প্রতিটি ক্ষেত্রে আল্লাহর সন্তুষ্টি অর্জনের পথ শেখায়।",
      read: "কুরআন পড়ুন",
      listen: "তিলাওয়াত শুনুন",
      footer: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",
      chooseSurah: "সূরা নির্বাচন করুন",
      searchPlaceholder: "সূরার নাম বা নম্বর লিখুন",
      loading: "লোড হচ্ছে...",
      loadError: "তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
      noSurahs: "কোনো সূরা পাওয়া যায়নি।",
      surah: "সূরা",
      verses: "আয়াত",
      play: "শুনুন",
      playing: "তিলাওয়াত চলছে",
      paused: "তিলাওয়াত থামানো হয়েছে",
      playAudio: "তিলাওয়াত চালু করুন",
      pauseAudio: "তিলাওয়াত থামান",
      audioError: "অডিও চালানো যাচ্ছে না। আবার চেষ্টা করুন।",
      translationError: "অনুবাদ পাওয়া যায়নি।",
      prev: "আগের আয়াত",
      next: "পরের আয়াত",
      selectedSurah: "নির্বাচিত সূরা",
      searchSurah: "সূরা খুঁজুন"
    },

    en: {
      homeTitle: "Al-Quran",
      homeSubtitle: "Learning and practice on the path to purity",
      readTitle: "Al-Quran",
      readSubtitle: "Read the Holy Quran with care",
      listenTitle: "Listen to Recitation",
      listenSubtitle: "Find peace in the recitation of the Quran",
      bismillahMeaning: "In the name of Allah, the Most Compassionate, the Most Merciful.",
      description: "The Holy Quran is the word of Allah. It guides us to the right path, teaches truth and justice, and shows us how to seek Allah's pleasure in every part of life.",
      read: "Read Quran",
      listen: "Listen to Recitation",
      footer: "IBADAT • Learning and practice on the path to purity",
      chooseSurah: "Choose a Surah",
      searchPlaceholder: "Enter a surah name or number",
      loading: "Loading...",
      loadError: "Unable to load data. Check your internet connection and try again.",
      noSurahs: "No surahs found.",
      surah: "Surah",
      verses: "verses",
      play: "Listen",
      playing: "Recitation playing",
      paused: "Recitation paused",
      playAudio: "Play recitation",
      pauseAudio: "Pause recitation",
      audioError: "Unable to play audio. Please try again.",
      translationError: "Translation unavailable.",
      prev: "Previous ayah",
      next: "Next ayah",
      selectedSurah: "Selected surah",
      searchSurah: "Find a surah"
    },

    hi: {
      homeTitle: "अल-क़ुरआन",
      homeSubtitle: "पवित्रता के मार्ग पर सीखना और अभ्यास",
      readTitle: "अल-क़ुरआन",
      readSubtitle: "ध्यान से पवित्र क़ुरआन पढ़ें",
      listenTitle: "तिलावत सुनें",
      listenSubtitle: "क़ुरआन की तिलावत से सुकून पाएँ",
      bismillahMeaning: "अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",
      description: "पवित्र क़ुरआन अल्लाह का कलाम है। यह हमें सही रास्ता दिखाता है, सत्य और न्याय की शिक्षा देता है और जीवन के हर क्षेत्र में अल्लाह की प्रसन्नता प्राप्त करने का मार्ग बताता है।",
      read: "क़ुरआन पढ़ें",
      listen: "तिलावत सुनें",
      footer: "इबादत • पवित्रता के मार्ग पर सीखना और अभ्यास",
      chooseSurah: "सूरह चुनें",
      searchPlaceholder: "सूरह का नाम या नंबर लिखें",
      loading: "लोड हो रहा है...",
      loadError: "जानकारी लोड नहीं हो सकी। इंटरनेट जाँचकर फिर प्रयास करें।",
      noSurahs: "कोई सूरह नहीं मिली।",
      surah: "सूरह",
      verses: "आयतें",
      play: "सुनें",
      playing: "तिलावत चल रही है",
      paused: "तिलावत रोक दी गई है",
      playAudio: "तिलावत चलाएँ",
      pauseAudio: "तिलावत रोकें",
      audioError: "ऑडियो नहीं चल सका। फिर प्रयास करें।",
      translationError: "अनुवाद उपलब्ध नहीं है।",
      prev: "पिछली आयत",
      next: "अगली आयत",
      selectedSurah: "चुनी गई सूरह",
      searchSurah: "सूरह खोजें"
    }
  };

  const $ = id => document.getElementById(id);

  const state = {
    language: "bn",
    page: "home",
    chapters: [],
    currentSurah: 1,
    currentAyah: 1,
    fontSize: 32,
    audioItems: [],
    audioIndex: 0,
    audioMode: "single",
    playingSurah: false,
    requestId: 0,
    cache: new Map()
  };

  const audio = $("quranAudio");

  function digits(number) {
    const locale = LOCALES[state.language] || LOCALES.bn;
    return new Intl.NumberFormat(locale, {
      useGrouping: false
    }).format(Number(number) || 0);
  }

  function t(key) {
    return TEXT[state.language]?.[key] || TEXT.bn[key] || key;
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

  function getSiteLanguage() {
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

        const lang = value.toLowerCase().trim();

        if (
          lang === "bn" ||
          lang.startsWith("bn-") ||
          lang === "bengali" ||
          lang === "বাংলা"
        ) return "bn";

        if (
          lang === "en" ||
          lang.startsWith("en-") ||
          lang === "english"
        ) return "en";

        if (
          lang === "hi" ||
          lang.startsWith("hi-") ||
          lang === "hindi" ||
          lang === "हिन्दी" ||
          lang === "हिंदी"
        ) return "hi";
      } catch (_) {}
    }

    return "bn";
  }

  async function api(path) {
    const response = await fetch(`${API}${path}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.code !== 200) {
      throw new Error("Quran API request failed");
    }

    return result.data;
  }

  function chapterName(chapter) {
    if (!chapter) return "";

    if (state.language === "bn") {
      return chapter.nameBn || chapter.englishName;
    }

    if (state.language === "hi") {
      return chapter.nameHindi || chapter.englishName;
    }

    return chapter.englishName;
  }

  function setPageHeader() {
    if (state.page === "listen") {
      $("pageTitle").textContent = t("listenTitle");
      $("pageSubtitle").textContent = t("listenSubtitle");
    } else if (state.page === "read") {
      $("pageTitle").textContent = t("readTitle");
      $("pageSubtitle").textContent = t("readSubtitle");
    } else {
      $("pageTitle").textContent = t("homeTitle");
      $("pageSubtitle").textContent = t("homeSubtitle");
    }
  }

  function showMessage(message) {
    const box = $("appMessage");

    box.textContent = message;
    box.classList.add("show");

    window.clearTimeout(showMessage.timer);
    showMessage.timer = window.setTimeout(() => {
      box.classList.remove("show");
    }, 2600);
  }

  function updateFooter() {
    $("homeFooter").hidden = state.page !== "home";
    $("readFooter").hidden = state.page !== "read";
    $("listenFooter").hidden = state.page !== "listen";

    if (state.page === "read") {
      $("readFooterMessage").textContent =
        `${digits(state.currentSurah)} : ${digits(state.currentAyah)}`;
    }

    updatePlayButton();
  }

  function updatePlayButton() {
    const isPlaying = !audio.paused;

    $("playPause").textContent = isPlaying ? "Ⅱ" : "▶";
    $("playPause").setAttribute(
      "aria-label",
      isPlaying ? t("pauseAudio") : t("playAudio")
    );
  }

  function pauseAudio() {
    audio.pause();
    state.playingSurah = false;
    updatePlayButton();
  }

  function goHome() {
    pauseAudio();

    state.page = "home";

    $("homePage").hidden = false;
    $("readPage").hidden = true;
    $("listenPage").hidden = true;

    setPageHeader();
    updateFooter();
  }

  function openPage(page) {
    pauseAudio();

    state.page = page;

    $("homePage").hidden = page !== "home";
    $("readPage").hidden = page !== "read";
    $("listenPage").hidden = page !== "listen";

    setPageHeader();
    updateFooter();

    if (page === "read") {
      loadSurah(state.currentSurah, state.currentAyah);
    }

    if (page === "listen") {
      renderListenList();
    }
  }

  function applyLanguage() {
    const oldLanguage = state.language;
    state.language = getSiteLanguage();

    document.documentElement.lang = state.language;

    $("bismillahMeaning").textContent = t("bismillahMeaning");
    $("quranDescription").textContent = t("description");
    $("readOptionText").textContent = t("read");
    $("listenOptionText").textContent = t("listen");
    $("footerText").textContent = t("footer");
    $("surahSearchHeading").textContent = t("chooseSurah");
    $("surahSearchInput").placeholder = t("searchPlaceholder");
    $("listenHeading").textContent = t("listenTitle");
    $("listenDescription").textContent = t("listenSubtitle");

    $("searchToggle").title = t("searchSurah");
    $("searchToggle").setAttribute("aria-label", t("searchSurah"));
    $("prevAyah").setAttribute("aria-label", t("prev"));
    $("nextAyah").setAttribute("aria-label", t("next"));
    $("prevTrack").setAttribute("aria-label", t("prev"));
    $("nextTrack").setAttribute("aria-label", t("next"));

    setPageHeader();
    updateFooter();

    if (state.chapters.length) {
      renderSurahSearchList($("surahSearchInput").value);
      renderListenList();

      if (oldLanguage !== state.language) {
        state.cache.clear();

        if (state.page === "read") {
          loadSurah(state.currentSurah, state.currentAyah);
        }
      }
    }
  }

  async function loadChapters() {
    try {
      const [chapterData, bengaliData, hindiData] = await Promise.all([
        api("/surah"),
        api("/quran/bn.bengali").catch(() => null),
        api("/quran/hi.hindi").catch(() => null)
      ]);

      state.chapters = chapterData.map(chapter => ({ ...chapter }));

      if (bengaliData?.surahs) {
        bengaliData.surahs.forEach((surah, index) => {
          if (state.chapters[index]) {
            state.chapters[index].nameBn = surah.name;
          }
        });
      }

      if (hindiData?.surahs) {
        hindiData.surahs.forEach((surah, index) => {
          if (state.chapters[index]) {
            state.chapters[index].nameHindi = surah.name;
          }
        });
      }

      renderSurahSearchList("");
      renderListenList();

      if (state.page === "read") {
        loadSurah(state.currentSurah, state.currentAyah);
      }
    } catch (_) {
      $("readStatus").textContent = t("loadError");
      $("listenStatus").textContent = t("loadError");
      $("surahSearchList").innerHTML =
        `<p class="status">${escapeHTML(t("loadError"))}</p>`;
    }
  }

  function renderSurahSearchList(query = "") {
    const list = $("surahSearchList");
    const normalized = query.trim().toLocaleLowerCase();

    const matches = state.chapters.filter(chapter => {
      const names = [
        chapterName(chapter),
        chapter.englishName,
        chapter.name_arabic,
        String(chapter.number),
        digits(chapter.number)
      ];

      return !normalized || names.some(name =>
        String(name || "").toLocaleLowerCase().includes(normalized)
      );
    });

    if (!matches.length) {
      list.innerHTML = `<p class="status">${escapeHTML(t("noSurahs"))}</p>`;
      return;
    }

    list.innerHTML = matches.map(chapter => `
      <button
        class="surah-search-row"
        type="button"
        data-select-surah="${chapter.number}"
      >
        <span class="surah-index">${digits(chapter.number)}</span>
        <span class="surah-row-copy">
          <strong>${escapeHTML(chapterName(chapter))}</strong>
          <small>${digits(chapter.numberOfAyahs)} ${escapeHTML(t("verses"))}</small>
        </span>
        <span class="surah-arabic" lang="ar" dir="rtl">
          ${escapeHTML(chapter.name_arabic || "")}
        </span>
      </button>
    `).join("");

    list.querySelectorAll("[data-select-surah]").forEach(button => {
      button.addEventListener("click", () => {
        state.currentSurah = Number(button.dataset.selectSurah);
        state.currentAyah = 1;

        $("surahSearchPanel").hidden = true;
        $("searchToggle").setAttribute("aria-expanded", "false");

        loadSurah(state.currentSurah, 1);
      });
    });
  }

  function renderListenList() {
    const list = $("surahList");

    if (!state.chapters.length) {
      list.innerHTML = `<p class="status">${escapeHTML(t("loading"))}</p>`;
      return;
    }

    list.innerHTML = state.chapters.map(chapter => `
      <button
        class="surah-row ${chapter.number === state.currentSurah ? "active" : ""}"
        type="button"
        data-listen-surah="${chapter.number}"
      >
        <span class="surah-index">${digits(chapter.number)}</span>
        <span class="surah-row-copy">
          <strong>${escapeHTML(chapterName(chapter))}</strong>
          <small>${digits(chapter.numberOfAyahs)} ${escapeHTML(t("verses"))}</small>
        </span>
        <span class="surah-arabic" lang="ar" dir="rtl">
          ${escapeHTML(chapter.name_arabic || "")}
        </span>
      </button>
    `).join("");

    list.querySelectorAll("[data-listen-surah]").forEach(button => {
      button.addEventListener("click", async () => {
        const number = Number(button.dataset.listenSurah);

        state.currentSurah = number;
        state.currentAyah = 1;
        state.audioMode = "surah";

        renderListenList();
        await loadSurah(number, 1);
        await playCurrentAyah(true);
      });
    });
  }

  async function getSurahData(number) {
    const key = `${number}:${state.language}`;

    if (state.cache.has(key)) {
      return state.cache.get(key);
    }

    const translationEdition =
      TRANSLATIONS[state.language] || TRANSLATIONS.bn;

    const promise = Promise.all([
      api(`/surah/${number}/${ARABIC_EDITION}`),
      api(`/surah/${number}/${translationEdition}`).catch(() => null),
      api(`/surah/${number}/${AUDIO_EDITION}`).catch(() => null)
    ]).then(([arabic, translation, recitation]) => ({
      arabic: arabic.ayahs || [],
      translations: translation?.ayahs || [],
      audio: recitation?.ayahs || []
    }));

    state.cache.set(key, promise);

    try {
      const result = await promise;
      state.cache.set(key, result);
      return result;
    } catch (error) {
      state.cache.delete(key);
      throw error;
    }
  }

  async function loadSurah(number, jumpAyah = 1) {
    if (number < 1 || number > 114) return;

    state.currentSurah = Number(number);
    state.currentAyah = Number(jumpAyah) || 1;

    const requestId = ++state.requestId;
    const chapter = state.chapters[number - 1];

    $("readContent").innerHTML =
      `<p class="status">${escapeHTML(t("loading"))}</p>`;

    $("readFooterMessage").textContent =
      `${digits(number)} : ${digits(state.currentAyah)}`;

    try {
      const data = await getSurahData(number);

      if (requestId !== state.requestId) return;

      state.audioItems = data.audio;

      if (state.currentAyah > data.arabic.length) {
        state.currentAyah = 1;
      }

      renderAyahs(chapter, data, state.currentAyah);
      updateFooter();

      if (state.page === "listen") {
        renderListenList();
      }
    } catch (_) {
      if (requestId !== state.requestId) return;

      $("readContent").innerHTML =
        `<p class="status">${escapeHTML(t("loadError"))}</p>`;
    }
  }

  function renderAyahs(chapter, data, jumpAyah) {
    const arabicAyahs = data.arabic || [];
    const translations = data.translations || [];

    const heading = `
      <h2 class="read-surah-heading">
        ${escapeHTML(t("surah"))} ${escapeHTML(chapterName(chapter))}
      </h2>
      <p class="read-surah-meta">
        ${digits(chapter.number)} • ${digits(arabicAyahs.length)} ${escapeHTML(t("verses"))}
      </p>
    `;

    const cards = arabicAyahs.map((ayah, index) => {
      const number = ayah.numberInSurah || index + 1;
      const translation = translations[index]?.text || t("translationError");
      const audioURL = data.audio[index]?.audio || "";

      return `
        <article class="ayah-card" id="ayah-${number}">
          <div class="ayah-card-top">
            <span class="ayah-number">${digits(number)}</span>
            <div class="ayah-actions">
              <button
                class="mini-button"
                type="button"
                data-play-ayah="${number}"
                ${audioURL ? "" : "disabled"}
              >▶ ${escapeHTML(t("play"))}</button>
            </div>
          </div>

          <p class="ayah-arabic" lang="ar" dir="rtl">
            ${escapeHTML(ayah.text)}
          </p>

          <p class="ayah-translation">
            ${escapeHTML(translation)}
          </p>
        </article>
      `;
    }).join("");

    $("readContent").innerHTML =
      `${heading}<div class="ayah-list">${cards}</div>`;

    $("readContent").querySelectorAll("[data-play-ayah]").forEach(button => {
      button.addEventListener("click", () => {
        state.currentAyah = Number(button.dataset.playAyah);
        state.audioMode = "single";
        playCurrentAyah(true);
        updateFooter();
      });
    });

    $("readFooterMessage").textContent =
      `${digits(state.currentSurah)} : ${digits(state.currentAyah)}`;

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

  async function playCurrentAyah(autoplay = false) {
    try {
      const data = await getSurahData(state.currentSurah);
      const item = data.audio[state.currentAyah - 1];

      if (!item?.audio) {
        showMessage(t("audioError"));
        return;
      }

      state.audioItems = data.audio;
      state.audioIndex = state.currentAyah - 1;

      audio.onended = null;
      audio.src = item.audio;

      if (autoplay) {
        await audio.play();
      }

      updateFooter();
    } catch (_) {
      showMessage(t("audioError"));
    }
  }

  async function playFullSurah() {
    try {
      const data = await getSurahData(state.currentSurah);

      if (!data.audio.length) {
        showMessage(t("audioError"));
        return;
      }

      state.audioItems = data.audio;
      state.audioIndex = state.currentAyah - 1;
      state.audioMode = "surah";
      state.playingSurah = true;

      await playAudioIndex();
    } catch (_) {
      state.playingSurah = false;
      showMessage(t("audioError"));
    }
  }

  async function playAudioIndex() {
    if (
      state.audioIndex < 0 ||
      state.audioIndex >= state.audioItems.length
    ) {
      state.playingSurah = false;
      updatePlayButton();
      return;
    }

    const item = state.audioItems[state.audioIndex];

    if (!item?.audio) {
      state.audioIndex++;
      return playAudioIndex();
    }

    state.currentAyah = state.audioIndex + 1;
    audio.src = item.audio;

    try {
      await audio.play();
      updateFooter();
    } catch (_) {
      state.playingSurah = false;
      showMessage(t("audioError"));
    }
  }

  function playPause() {
    if (!audio.paused) {
      pauseAudio();
      return;
    }

    if (state.audioMode === "surah" && state.audioItems.length) {
      state.playingSurah = true;
      playAudioIndex();
      return;
    }

    state.audioMode = "single";
    playCurrentAyah(true);
  }

  function previousAyah() {
    if (state.currentAyah > 1) {
      state.currentAyah--;
    } else if (state.currentSurah > 1) {
      state.currentSurah--;
      state.currentAyah =
        state.chapters[state.currentSurah - 1]?.numberOfAyahs || 1;
    } else {
      return;
    }

    loadSurah(state.currentSurah, state.currentAyah);

    if (state.page === "listen") {
      state.audioMode = "single";
      playCurrentAyah(true);
    }
  }

  function nextAyah() {
    const chapter = state.chapters[state.currentSurah - 1];

    if (!chapter) return;

    if (state.currentAyah < chapter.numberOfAyahs) {
      state.currentAyah++;
    } else if (state.currentSurah < 114) {
      state.currentSurah++;
      state.currentAyah = 1;
    } else {
      pauseAudio();
      return;
    }

    loadSurah(state.currentSurah, state.currentAyah);

    if (state.page === "listen") {
      state.audioMode = "single";
      playCurrentAyah(true);
    }
  }

  function changeFont(delta) {
    state.fontSize = Math.max(
      22,
      Math.min(54, state.fontSize + delta)
    );

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

      if (saved >= 22 && saved <= 54) {
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
        renderSurahSearchList($("surahSearchInput").value);
        $("surahSearchInput").focus();
      }
    });

    $("surahSearchInput").addEventListener("input", event => {
      renderSurahSearchList(event.target.value);
    });

    $("fontDown").addEventListener("click", () => changeFont(-2));
    $("fontUp").addEventListener("click", () => changeFont(2));

    $("prevAyah").addEventListener("click", previousAyah);
    $("nextAyah").addEventListener("click", nextAyah);
    $("prevTrack").addEventListener("click", previousAyah);
    $("nextTrack").addEventListener("click", nextAyah);
    $("playPause").addEventListener("click", playPause);

    audio.addEventListener("play", updatePlayButton);

    audio.addEventListener("pause", updatePlayButton);

    audio.addEventListener("ended", () => {
      if (state.audioMode === "surah" && state.playingSurah) {
        state.audioIndex++;

        if (state.audioIndex < state.audioItems.length) {
          state.currentAyah = state.audioIndex + 1;
          playAudioIndex();
          return;
        }

        state.playingSurah = false;
      }

      updateFooter();
    });

    audio.addEventListener("error", () => {
      if (state.page !== "home") {
        showMessage(t("audioError"));
      }
    });

    window.addEventListener("storage", event => {
      const languageKeys = [
        "ibadat_language",
        "siteLanguage",
        "selectedLanguage",
        "language",
        "lang",
        "preferredLanguage"
      ];

      if (!event.key || languageKeys.includes(event.key)) {
        const newLanguage = getSiteLanguage();

        if (newLanguage !== state.language) {
          applyLanguage();
        }
      }
    });

    window.addEventListener("pageshow", () => {
      const newLanguage = getSiteLanguage();

      if (newLanguage !== state.language) {
        applyLanguage();
      }
    });
  }

  async function init() {
    applyLanguage();
    restoreFontSize();
    wireEvents();
    updateFooter();

    await loadChapters();
  }

  init();
})();
