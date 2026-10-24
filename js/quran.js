
(() => {
  "use strict";

  const API = "https://api.alquran.cloud/v1";
  const ARABIC_EDITION = "quran-uthmani";
  const AUDIO_EDITION = "ar.alafasy";

  const EDITIONS = {
    bn: "bn.bengali",
    en: "en.sahih",
    hi: "hi.hindi"
  };

  const LOCALES = {
    bn: "bn-BD",
    en: "en-US",
    hi: "hi-IN"
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
      homeSubtitle: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",
      description: "পবিত্র কুরআন আল্লাহর বাণী। এটি আমাদের সঠিক পথ দেখায়, সত্য ও ন্যায়ের শিক্ষা দেয় এবং জীবনের প্রতিটি ক্ষেত্রে আল্লাহর সন্তুষ্টি অর্জনের পথ শেখায়।",
      read: "কুরআন পড়ুন",
      listen: "তিলাওয়াত শুনুন",
      footer: "শুদ্ধতার পথে ইবাদত",
      readSubtitle: "মনোযোগ দিয়ে পবিত্র কুরআন পড়ুন",
      listenSubtitle: "কুরআনের তিলাওয়াতে প্রশান্তি অনুভব করুন",
      choose: "সূরা নির্বাচন করুন",
      search: "সূরার নাম বা নম্বর লিখুন",
      loading: "লোড হচ্ছে...",
      error: "তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।",
      none: "কোনো সূরা পাওয়া যায়নি।",
      surah: "সূরা",
      verses: "আয়াত",
      play: "শুনুন",
      prev: "আগের আয়াত",
      next: "পরের আয়াত",
      playAudio: "তিলাওয়াত চালু করুন",
      pauseAudio: "তিলাওয়াত থামান",
      audioError: "অডিও চালানো যাচ্ছে না। আবার চেষ্টা করুন।",
      translationError: "অনুবাদ পাওয়া যায়নি।",
      readTitle: "আল-কুরআন",
      listenTitle: "তিলাওয়াত শুনুন"
    },

    en: {
      homeSubtitle: "In the name of Allah, the Most Compassionate, the Most Merciful.",
      description: "The Holy Quran is the word of Allah. It guides us to the right path, teaches truth and justice, and shows us how to seek Allah's pleasure in every part of life.",
      read: "Read Quran",
      listen: "Listen to Recitation",
      footer: "IBADAT • Worship on the path to purity",
      readSubtitle: "Read the Holy Quran with care",
      listenSubtitle: "Find peace in the recitation of the Quran",
      choose: "Choose a Surah",
      search: "Enter a surah name or number",
      loading: "Loading...",
      error: "Unable to load data. Check your internet connection.",
      none: "No surahs found.",
      surah: "Surah",
      verses: "verses",
      play: "Listen",
      prev: "Previous ayah",
      next: "Next ayah",
      playAudio: "Play recitation",
      pauseAudio: "Pause recitation",
      audioError: "Unable to play audio. Please try again.",
      translationError: "Translation unavailable.",
      readTitle: "Al-Quran",
      listenTitle: "Listen to Recitation"
    },

    hi: {
      homeSubtitle: "अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",
      description: "पवित्र क़ुरआन अल्लाह का कलाम है। यह हमें सही रास्ता दिखाता है, सत्य और न्याय की शिक्षा देता है और जीवन के हर क्षेत्र में अल्लाह की प्रसन्नता प्राप्त करने का मार्ग बताता है।",
      read: "क़ुरआन पढ़ें",
      listen: "तिलावत सुनें",
      footer: "इबादत • पवित्रता के मार्ग पर",
      readSubtitle: "ध्यान से पवित्र क़ुरआन पढ़ें",
      listenSubtitle: "क़ुरआन की तिलावत से सुकून पाएँ",
      choose: "सूरह चुनें",
      search: "सूरह का नाम या नंबर लिखें",
      loading: "लोड हो रहा है...",
      error: "जानकारी लोड नहीं हो सकी। इंटरनेट जाँचें।",
      none: "कोई सूरह नहीं मिली।",
      surah: "सूरह",
      verses: "आयतें",
      play: "सुनें",
      prev: "पिछली आयत",
      next: "अगली आयत",
      playAudio: "तिलावत चलाएँ",
      pauseAudio: "तिलावत रोकें",
      audioError: "ऑडियो नहीं चल सका। फिर प्रयास करें।",
      translationError: "अनुवाद उपलब्ध नहीं है।",
      readTitle: "अल-क़ुरआन",
      listenTitle: "तिलावत सुनें"
    }
  };

  const $ = id => document.getElementById(id);
  const audio = $("quranAudio");

  const state = {
    lang: "bn",
    page: "home",
    chapters: [],
    currentSurah: 1,
    currentAyah: 1,
    fontSize: 32,
    cache: new Map(),
    audioItems: [],
    audioIndex: 0,
    audioMode: "single",
    playingSurah: false,
    requestId: 0,
    navigationReady: false
  };

  function t(key) {
    return (TEXT[state.lang] && TEXT[state.lang][key]) ||
      TEXT.bn[key] ||
      key;
  }

  function digits(value) {
    return new Intl.NumberFormat(
      LOCALES[state.lang] || "bn-BD",
      { useGrouping: false }
    ).format(Number(value) || 0);
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function normalizeLanguage(value) {
    const language = String(value ?? "").trim().toLowerCase();

    if (
      ["bn", "bn-bd", "bn-in", "bengali", "বাংলা"].includes(language) ||
      language.startsWith("bn-")
    ) {
      return "bn";
    }

    if (
      ["en", "en-us", "en-gb", "english"].includes(language) ||
      language.startsWith("en-")
    ) {
      return "en";
    }

    if (
      ["hi", "hi-in", "hindi", "हिन्दी", "हिंदी"].includes(language) ||
      language.startsWith("hi-")
    ) {
      return "hi";
    }

    return null;
  }

  function getLanguage() {
    for (const key of LANGUAGE_KEYS) {
      try {
        const value = localStorage.getItem(key);
        const language = normalizeLanguage(value);

        if (language) return language;

        if (value && value.trim().startsWith("{")) {
          const settings = JSON.parse(value);
          const nestedLanguage = normalizeLanguage(
            settings.language ??
            settings.lang ??
            settings.locale
          );

          if (nestedLanguage) return nestedLanguage;
        }
      } catch (_) {}
    }

    const documentLanguage = normalizeLanguage(
      document.documentElement.lang
    );

    return documentLanguage || "bn";
  }

  async function api(path) {
    const response = await fetch(`${API}${path}`, {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.code !== 200) {
      throw new Error("Quran API error");
    }

    return result.data;
  }

  function chapterName(chapter) {
    if (!chapter) return "";

    if (state.lang === "bn") {
      return chapter.nameBn || chapter.englishName;
    }

    if (state.lang === "hi") {
      return chapter.nameHindi || chapter.englishName;
    }

    return chapter.englishName;
  }

  function setHeader() {
    $("pageSubtitle").textContent =
      state.page === "read"
        ? t("readSubtitle")
        : state.page === "listen"
          ? t("listenSubtitle")
          : t("homeSubtitle");

    document.title =
      `${state.page === "read"
        ? t("readTitle")
        : state.page === "listen"
          ? t("listenTitle")
          : t("readTitle")} | IBADAT`;
  }

  function updateFooter() {
    $("homeFooter").hidden = state.page !== "home";
    $("readFooter").hidden = state.page !== "read";
    $("listenFooter").hidden = state.page !== "listen";

    $("readFooterMessage").textContent =
      `${digits(state.currentSurah)} : ${digits(state.currentAyah)}`;

    updatePlayButton();
  }

  function updatePlayButton() {
    const playing = audio && !audio.paused;

    $("playPause").textContent = playing ? "Ⅱ" : "▶";
    $("playPause").setAttribute(
      "aria-label",
      playing ? t("pauseAudio") : t("playAudio")
    );
  }

  function showMessage(message) {
    const box = $("appMessage");

    if (!box) return;

    box.textContent = message;
    box.classList.add("show");

    clearTimeout(showMessage.timer);

    showMessage.timer = setTimeout(() => {
      box.classList.remove("show");
    }, 2600);
  }

  function pauseAudio() {
    if (audio) audio.pause();

    state.playingSurah = false;
    updatePlayButton();
  }

  function setPageVisibility(page) {
    $("homePage").hidden = page !== "home";
    $("readPage").hidden = page !== "read";
    $("listenPage").hidden = page !== "listen";

    state.page = page;

    setHeader();
    updateFooter();
  }

  function openPage(page) {
    if (!["home", "read", "listen"].includes(page)) return;

    if (page === state.page) return;

    pauseAudio();

    if (state.navigationReady) {
      history.pushState(
        { ibadatQuran: true, quranPage: page },
        "",
        location.href
      );
    }

    setPageVisibility(page);

    if (page === "read") {
      loadSurah(state.currentSurah, state.currentAyah);
    }

    if (page === "listen") {
      renderListenList();
    }
  }

  function goHomeFromBack() {
    if (state.page === "home") return;

    pauseAudio();
    state.requestId++;

    setPageVisibility("home");
  }

  function renderSurahSearchList(query = "") {
    const list = $("surahSearchList");
    const q = String(query).trim().toLocaleLowerCase();

    const matches = state.chapters.filter(chapter => {
      const values = [
        chapterName(chapter),
        chapter.englishName,
        chapter.name_arabic,
        String(chapter.number),
        digits(chapter.number)
      ];

      return values.some(value =>
        String(value || "").toLocaleLowerCase().includes(q)
      );
    });

    if (!matches.length) {
      list.innerHTML =
        `<p class="status">${escapeHTML(t("none"))}</p>`;
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
          <small>
            ${digits(chapter.numberOfAyahs)}
            ${escapeHTML(t("verses"))}
          </small>
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
      list.innerHTML =
        `<p class="status">${escapeHTML(t("loading"))}</p>`;
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
          <small>
            ${digits(chapter.numberOfAyahs)}
            ${escapeHTML(t("verses"))}
          </small>
        </span>
        <span class="surah-arabic" lang="ar" dir="rtl">
          ${escapeHTML(chapter.name_arabic || "")}
        </span>
      </button>
    `).join("");

    list.querySelectorAll("[data-listen-surah]").forEach(button => {
      button.addEventListener("click", async () => {
        state.currentSurah = Number(button.dataset.listenSurah);
        state.currentAyah = 1;
        state.audioMode = "surah";
        state.playingSurah = true;

        renderListenList();

        await loadSurah(state.currentSurah, 1);
        await playFullSurah();
      });
    });
  }

  async function loadChapters() {
    try {
      const [chapters, bnData, hiData] = await Promise.all([
        api("/surah"),
        api("/quran/bn.bengali").catch(() => null),
        api("/quran/hi.hindi").catch(() => null)
      ]);

      state.chapters = chapters.map(chapter => ({ ...chapter }));

      bnData?.surahs?.forEach((chapter, index) => {
        if (state.chapters[index]) {
          state.chapters[index].nameBn = chapter.name;
        }
      });

      hiData?.surahs?.forEach((chapter, index) => {
        if (state.chapters[index]) {
          state.chapters[index].nameHindi = chapter.name;
        }
      });

      renderSurahSearchList($("surahSearchInput").value);
      renderListenList();

      if (state.page === "read") {
        await loadSurah(state.currentSurah, state.currentAyah);
      }
    } catch (_) {
      const message =
        `<p class="status">${escapeHTML(t("error"))}</p>`;

      $("readContent").innerHTML = message;
      $("surahList").innerHTML = message;
      $("surahSearchList").innerHTML = message;
    }
  }

  async function getSurahData(number) {
    const key = `${number}:${state.lang}`;

    if (state.cache.has(key)) {
      return state.cache.get(key);
    }

    const edition = EDITIONS[state.lang] || EDITIONS.bn;

    const promise = Promise.all([
      api(`/surah/${number}/${ARABIC_EDITION}`),
      api(`/surah/${number}/${edition}`).catch(() => null),
      api(`/surah/${number}/${AUDIO_EDITION}`).catch(() => null)
    ]).then(([arabic, translation, recitation]) => ({
      arabic: arabic.ayahs || [],
      translations: translation?.ayahs || [],
      audio: recitation?.ayahs || []
    }));

    state.cache.set(key, promise);

    try {
      const data = await promise;
      state.cache.set(key, data);
      return data;
    } catch (error) {
      state.cache.delete(key);
      throw error;
    }
  }

  async function loadSurah(number, jumpAyah = 1) {
    if (number < 1 || number > 114) return;

    state.currentSurah = Number(number);
    state.currentAyah = Number(jumpAyah) || 1;

    const request = ++state.requestId;

    $("readContent").innerHTML =
      `<p class="status">${escapeHTML(t("loading"))}</p>`;

    try {
      const data = await getSurahData(number);

      if (request !== state.requestId) return;

      state.audioItems = data.audio;

      if (state.currentAyah > data.arabic.length) {
        state.currentAyah = 1;
      }

      renderAyahs(
        state.chapters[number - 1],
        data,
        state.currentAyah
      );

      updateFooter();

      if (state.page === "listen") {
        renderListenList();
      }
    } catch (_) {
      if (request === state.requestId) {
        $("readContent").innerHTML =
          `<p class="status">${escapeHTML(t("error"))}</p>`;
      }
    }
  }

  function renderAyahs(chapter, data, jumpAyah) {
    const ayahs = data.arabic || [];
    const translations = data.translations || [];

    const heading = `
      <h2 class="read-surah-heading">
        ${escapeHTML(t("surah"))}
        ${escapeHTML(chapterName(chapter))}
      </h2>
      <p class="read-surah-meta">
        ${digits(chapter?.number)}
        •
        ${digits(ayahs.length)}
        ${escapeHTML(t("verses"))}
      </p>
    `;

    const cards = ayahs.map((ayah, index) => {
      const number = ayah.numberInSurah || index + 1;
      const translation =
        translations[index]?.text || t("translationError");
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
              >
                ▶ ${escapeHTML(t("play"))}
              </button>
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
        state.playingSurah = false;

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
      state.audioMode = "single";
      state.playingSurah = false;

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
        state.playingSurah = false;
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
    const item = state.audioItems[state.audioIndex];

    if (!item) {
      state.playingSurah = false;
      updatePlayButton();
      return;
    }

    if (!item.audio) {
      state.audioIndex++;
      return playAudioIndex();
    }

    state.currentAyah = state.audioIndex + 1;
    audio.src = item.audio;

    try {
      await audio.play();
      updateFooter();
      renderListenList();
    } catch (_) {
      state.playingSurah = false;
      showMessage(t("audioError"));
    }
  }

  function moveAyah(direction) {
    const chapter = state.chapters[state.currentSurah - 1];

    if (!chapter) return;

    if (direction < 0) {
      if (state.currentAyah > 1) {
        state.currentAyah--;
      } else if (state.currentSurah > 1) {
        state.currentSurah--;
        state.currentAyah =
          state.chapters[state.currentSurah - 1].numberOfAyahs;
      } else {
        return;
      }
    } else {
      if (state.currentAyah < chapter.numberOfAyahs) {
        state.currentAyah++;
      } else if (state.currentSurah < 114) {
        state.currentSurah++;
        state.currentAyah = 1;
      } else {
        pauseAudio();
        return;
      }
    }

    loadSurah(state.currentSurah, state.currentAyah);

    if (state.page === "listen") {
      state.audioMode = "single";
      state.playingSurah = false;
      playCurrentAyah(true);
    }
  }

  function applyLanguage() {
    const previousLanguage = state.lang;
    state.lang = getLanguage();

    document.documentElement.lang = state.lang;

    $("quranDescription").textContent = t("description");
    $("quranHeading").textContent = t("readTitle");
    $("readOptionText").textContent = t("read");
    $("listenOptionText").textContent = t("listen");
    $("footerText").textContent = t("footer");
    $("surahSearchHeading").textContent = t("choose");
    $("surahSearchInput").placeholder = t("search");

    $("searchToggle").title = t("search");
    $("searchToggle").setAttribute("aria-label", t("search"));

    $("fontDown").setAttribute(
      "aria-label",
      state.lang === "en" ? "Decrease font size" :
      state.lang === "hi" ? "अक्षर छोटे करें" :
      "অক্ষর ছোট করুন"
    );

    $("fontUp").setAttribute(
      "aria-label",
      state.lang === "en" ? "Increase font size" :
      state.lang === "hi" ? "अक्षर बड़े करें" :
      "অক্ষর বড় করুন"
    );

    $("prevAyah").setAttribute("aria-label", t("prev"));
    $("nextAyah").setAttribute("aria-label", t("next"));
    $("prevTrack").setAttribute("aria-label", t("prev"));
    $("nextTrack").setAttribute("aria-label", t("next"));

    const image = $("quranImage");

    if (image) {
      image.alt =
        state.lang === "en"
          ? "The Holy Quran open on a rehal"
          : state.lang === "hi"
            ? "रिहाल पर खुला पवित्र क़ुरआन"
            : "রেহালের উপর খোলা পবিত্র কুরআন";
    }

    if (previousLanguage !== state.lang) {
      state.cache.clear();
    }

    setHeader();
    updateFooter();

    if (state.chapters.length) {
      renderSurahSearchList($("surahSearchInput").value);
      renderListenList();

      if (state.page === "read") {
        loadSurah(state.currentSurah, state.currentAyah);
      }
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
      localStorage.setItem(
        "ibadat_quran_font_size",
        String(state.fontSize)
      );
    } catch (_) {}
  }

  function wireEvents() {
    $("openRead").addEventListener("click", () => {
      openPage("read");
    });

    $("openListen").addEventListener("click", () => {
      openPage("listen");
    });

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

    $("fontDown").addEventListener("click", () => {
      changeFont(-2);
    });

    $("fontUp").addEventListener("click", () => {
      changeFont(2);
    });

    $("prevAyah").addEventListener("click", () => {
      moveAyah(-1);
    });

    $("nextAyah").addEventListener("click", () => {
      moveAyah(1);
    });

    $("prevTrack").addEventListener("click", () => {
      moveAyah(-1);
    });

    $("nextTrack").addEventListener("click", () => {
      moveAyah(1);
    });

    $("playPause").addEventListener("click", () => {
      if (!audio.paused) {
        pauseAudio();
        return;
      }

      if (
        state.audioMode === "surah" &&
        state.audioItems.length
      ) {
        state.playingSurah = true;
        playAudioIndex();
      } else {
        playCurrentAyah(true);
      }
    });

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
      if (!event.key || LANGUAGE_KEYS.includes(event.key)) {
        const language = getLanguage();

        if (language !== state.lang) {
          applyLanguage();
        }
      }
    });

    window.addEventListener("message", event => {
      const data = event.data;

      if (!data || typeof data !== "object") return;

      const type = String(
        data.type || data.action || ""
      ).toLowerCase();

      if (
        [
          "ibadat-settings",
          "settings-changed",
          "language-changed"
        ].includes(type)
      ) {
        const settings = data.settings || data;
        const language = normalizeLanguage(
          settings.language ??
          settings.lang ??
          settings.locale
        );

        if (language && language !== state.lang) {
          applyLanguage();
        }
      }
    });

    window.addEventListener("pageshow", () => {
      if (getLanguage() !== state.lang) {
        applyLanguage();
      }
    });

    window.addEventListener("popstate", () => {
      if (state.page !== "home") {
        goHomeFromBack();
      }
    });
  }

  async function init() {
    try {
      const savedFontSize = Number(
        localStorage.getItem("ibadat_quran_font_size")
      );

      if (savedFontSize >= 22 && savedFontSize <= 54) {
        state.fontSize = savedFontSize;
      }
    } catch (_) {}

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.fontSize}px`
    );

    applyLanguage();
    wireEvents();

    /*
     * একটি প্রাথমিক history entry রাখা হয়, যাতে
     * Read/Listen পেজ থেকে Back চাপলে Quran home-এ ফেরা যায়।
     */
    try {
      history.replaceState(
        { ibadatQuran: true, quranPage: "home" },
        "",
        location.href
      );

      history.pushState(
        { ibadatQuran: true, quranPage: "home-entry" },
        "",
        location.href
      );

      state.navigationReady = true;
    } catch (_) {}

    updateFooter();
    await loadChapters();
  }

  init();
})();
