
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

  const TEXT = {
    bn: {
      homeSubtitle: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",
      description: "পবিত্র কুরআন আল্লাহর বাণী। এটি আমাদের সঠিক পথ দেখায়, সত্য ও ন্যায়ের শিক্ষা দেয় এবং জীবনের প্রতিটি ক্ষেত্রে আল্লাহর সন্তুষ্টি অর্জনের পথ শেখায়।",
      read: "কুরআন পড়ুন",
      listen: "তিলাওয়াত শুনুন",
      footer: "ইবাদত • শুদ্ধতার পথে শেখা ও অনুশীলন",
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
      prev: "আগের সূরা",
      next: "পরের সূরা",
      playAudio: "তিলাওয়াত চালু করুন",
      pauseAudio: "তিলাওয়াত থামান",
      audioError: "অডিও চালানো যাচ্ছে না। আবার চেষ্টা করুন।",
      translationError: "অনুবাদ পাওয়া যায়নি।",
      readTitle: "শুদ্ধতার পথে ইবাদত",
      listenTitle: "তিলাওয়াত শুনুন"
    },

    en: {
      homeSubtitle: "In the name of Allah, the Most Compassionate, the Most Merciful.",
      description: "The Holy Quran is the word of Allah. It guides us to the right path, teaches truth and justice, and shows us how to seek Allah's pleasure in every part of life.",
      read: "Read Quran",
      listen: "Listen to Recitation",
      footer: "IBADAT • Learning and practice on the path to purity",
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
      prev: "Previous Surah",
      next: "Next Surah",
      playAudio: "Play recitation",
      pauseAudio: "Pause recitation",
      audioError: "Unable to play audio. Please try again.",
      translationError: "Translation unavailable.",
      readTitle: "IBADAT • On the path to purity",
      listenTitle: "Listen to Recitation"
    },

    hi: {
      homeSubtitle: "अत्यंत कृपाशील, परम दयालु अल्लाह के नाम से।",
      description: "पवित्र क़ुरआन अल्लाह का कलाम है। यह हमें सही रास्ता दिखाता है, सत्य और न्याय की शिक्षा देता है और जीवन के हर क्षेत्र में अल्लाह की प्रसन्नता प्राप्त करने का मार्ग बताता है।",
      read: "क़ुरआन पढ़ें",
      listen: "तिलावत सुनें",
      footer: "इबादत • पवित्रता के मार्ग पर सीखना और अभ्यास",
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
      prev: "पिछली सूरह",
      next: "अगली सूरह",
      playAudio: "तिलावत चलाएँ",
      pauseAudio: "तिलावत रोकें",
      audioError: "ऑडियो नहीं चल सका। फिर प्रयास करें।",
      translationError: "अनुवाद उपलब्ध नहीं है।",
      readTitle: "इबादत • पवित्रता के मार्ग पर",
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
    requestId: 0
  };

  function t(key) {
    return TEXT[state.lang]?.[key] || TEXT.bn[key] || key;
  }

  function digits(value) {
    return new Intl.NumberFormat(
      LOCALES[state.lang] || "bn-BD",
      { useGrouping: false }
    ).format(Number(value) || 0);
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

  /* মূল IBADAT সেটিংস */
  function readSiteSettings() {
    try {
      return JSON.parse(localStorage.getItem("appSettings") || "{}");
    } catch (_) {
      return {};
    }
  }

  function normalizeLanguage(value) {
    const lang = String(value || "bn").toLowerCase().trim();

    if (
      ["en", "english", "en-us", "en-gb"].includes(lang) ||
      lang.startsWith("en-")
    ) {
      return "en";
    }

    if (
      ["hi", "hindi", "हिन्दी", "हिंदी"].includes(lang) ||
      lang.startsWith("hi-")
    ) {
      return "hi";
    }

    return "bn";
  }

  function getLanguage() {
    return normalizeLanguage(readSiteSettings().lang);
  }

  function applyTheme() {
    const settings = readSiteSettings();

    document.body.classList.toggle(
      "dark-mode",
      settings.dark === true
    );
  }

  async function api(path) {
    const response = await fetch(`${API}${path}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.code !== 200) {
      throw new Error("Quran API error");
    }

    return result.data;
  }

  /*
   * সূরার নাম তিনটি ভাষায়।
   * ক্রমটি কুরআনের ১১৪টি সূরার ক্রমের সঙ্গে মিলিয়ে রাখা হয়েছে।
   */
  const SURAH_NAMES = {
    bn: [
      "আল-ফাতিহা", "আল-বাকারা", "আলে ইমরান", "আন-নিসা",
      "আল-মায়িদা", "আল-আনআম", "আল-আরাফ", "আল-আনফাল",
      "আত-তাওবা", "ইউনুস", "হুদ", "ইউসুফ", "আর-রাদ",
      "ইবরাহিম", "আল-হিজর", "আন-নাহল", "আল-ইসরা",
      "আল-কাহফ", "মারইয়াম", "ত্বা-হা", "আল-আম্বিয়া",
      "আল-হাজ্জ", "আল-মুমিনুন", "আন-নূর", "আল-ফুরকান",
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
      "আল-মুলক", "আল-কলম", "আল-হাক্কা", "আল-মাআরিজ",
      "নূহ", "আল-জিন", "আল-মুযযাম্মিল", "আল-মুদ্দাসসির",
      "আল-কিয়ামা", "আল-ইনসান", "আল-মুরসালাত", "আন-নাবা",
      "আন-নাযিআত", "আবাসা", "আত-তাকভির", "আল-ইনফিতার",
      "আল-মুতাফফিফিন", "আল-ইনশিকাক", "আল-বুরুজ", "আত-তারিক",
      "আল-আলা", "আল-গাশিয়া", "আল-ফজর", "আল-বালাদ",
      "আশ-শামস", "আল-লাইল", "আদ-দুহা", "আশ-শারহ",
      "আত-তিন", "আল-আলাক", "আল-কদর", "আল-বাইয়্যিনা",
      "আয-যিলযাল", "আল-আদিয়াত", "আল-কারিয়া", "আত-তাকাসুর",
      "আল-আসর", "আল-হুমাযা", "আল-ফিল", "কুরাইশ",
      "আল-মাউন", "আল-কাওসার", "আল-কাফিরুন", "আন-নাসর",
      "আল-মাসাদ", "আল-ইখলাস", "আল-ফালাক", "আন-নাস"
    ],

    hi: [
      "अल-फ़ातिहा", "अल-बक़रा", "आल-इमरान", "अन-निसा",
      "अल-माइदा", "अल-अनआम", "अल-आराफ़", "अल-अनफ़ाल",
      "अत-तौबा", "यूनुस", "हूद", "यूसुफ़", "अर-रअद",
      "इब्राहीम", "अल-हिज्र", "अन-नहल", "अल-इसरा",
      "अल-कहफ़", "मरयम", "ताहा", "अल-अंबिया", "अल-हज्ज",
      "अल-मुमिनून", "अन-नूर", "अल-फ़ुरक़ान", "अश-शुअरा",
      "अन-नम्ल", "अल-क़सस", "अल-अनकबूत", "अर-रूम",
      "लुक़मान", "अस-सज्दा", "अल-अहज़ाब", "सबा", "फ़ातिर",
      "या-सीन", "अस-साफ़्फ़ात", "साद", "अज़-जुमर", "ग़ाफ़िर",
      "फ़ुस्सिलत", "अश-शूरा", "अज़-ज़ुख़रुफ़", "अद-दुख़ान",
      "अल-जासिया", "अल-अहक़ाफ़", "मुहम्मद", "अल-फ़त्ह",
      "अल-हुजुरात", "क़ाफ़", "अज़-ज़ारियात", "अत-तूर",
      "अन-नज्म", "अल-क़मर", "अर-रहमान", "अल-वाक़िआ",
      "अल-हदीद", "अल-मुजादिला", "अल-हश्र", "अल-मुम्तहिना",
      "अस-सफ़्फ़", "अल-जुमुआ", "अल-मुनाफ़िक़ून",
      "अत-तग़ाबुन", "अत-तलाक़", "अत-तहरीम", "अल-मुल्क",
      "अल-क़लम", "अल-हाक़्क़ा", "अल-मआरिज", "नूह",
      "अल-जिन्न", "अल-मुज़्ज़म्मिल", "अल-मुदस्सिर",
      "अल-क़ियामा", "अल-इंसान", "अल-मुरसलात", "अन-नबा",
      "अन-नाज़िआत", "अबसा", "अत-तकवीर", "अल-इन्फ़ितार",
      "अल-मुतफ़्फ़िफ़ीन", "अल-इन्शिक़ाक़", "अल-बुरूज",
      "अत-तारिक़", "अल-आला", "अल-ग़ाशिया", "अल-फ़ज्र",
      "अल-बलद", "अश-शम्स", "अल-लैल", "अद-दुहा",
      "अश-शरह", "अत-तीन", "अल-अलक़", "अल-क़द्र",
      "अल-बय्यिना", "अज़-ज़िलज़ाल", "अल-आदियात",
      "अल-क़ारिआ", "अत-तकासुर", "अल-अस्र", "अल-हुमज़ा",
      "अल-फ़ील", "क़ुरैश", "अल-माऊन", "अल-कौसर",
      "अल-काफ़िरून", "अन-नस्र", "अल-मसद", "अल-इख़लास",
      "अल-फ़लक़", "अन-नास"
    ]
  };

  function chapterName(chapter) {
    if (!chapter) return "";

    const index = Number(chapter.number) - 1;

    if (state.lang === "bn") {
      return SURAH_NAMES.bn[index] || chapter.englishName || "";
    }

    if (state.lang === "hi") {
      return SURAH_NAMES.hi[index] || chapter.englishName || "";
    }

    return chapter.englishName || "";
  }

  function setHeader() {
    $("pageSubtitle").textContent =
      state.page === "read"
        ? t("readSubtitle")
        : state.page === "listen"
          ? t("listenSubtitle")
          : t("homeSubtitle");
  }

  function updateFooter() {
    $("homeFooter").hidden = state.page !== "home";
    $("readFooter").hidden = state.page !== "read";
    $("listenFooter").hidden = state.page !== "listen";

    $("readFooterMessage").textContent = t("readTitle");
    updatePlayButton();
  }

  function updatePlayButton() {
    const playing = !audio.paused;

    $("playPause").textContent = playing ? "Ⅱ" : "▶";

    $("playPause").setAttribute(
      "aria-label",
      playing ? t("pauseAudio") : t("playAudio")
    );
  }

  function showMessage(message) {
    const box = $("appMessage");

    box.textContent = message;
    box.classList.add("show");

    clearTimeout(showMessage.timer);

    showMessage.timer = setTimeout(() => {
      box.classList.remove("show");
    }, 2600);
  }

  function pauseAudio() {
    state.playingSurah = false;
    audio.pause();
    updatePlayButton();
  }

  function openPage(page) {
    pauseAudio();

    state.page = page;

    $("homePage").hidden = page !== "home";
    $("readPage").hidden = page !== "read";
    $("listenPage").hidden = page !== "listen";

    setHeader();
    updateFooter();

    if (page === "read") {
      loadSurah(state.currentSurah, state.currentAyah);
    }

    if (page === "listen") {
      renderListenList();
    }
  }

  /* সূরা সার্চ */
  function renderSurahSearchList(query = "") {
    const list = $("surahSearchList");
    const q = query.trim().toLocaleLowerCase();

    const matches = state.chapters.filter(ch => {
      const values = [
        chapterName(ch),
        ch.englishName,
        ch.name_arabic,
        String(ch.number),
        digits(ch.number)
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

    list.innerHTML = matches.map(ch => `
      <button
        class="surah-search-row"
        type="button"
        data-select-surah="${ch.number}"
      >
        <span class="surah-index">${digits(ch.number)}</span>
        <span class="surah-row-copy">
          <strong>${escapeHTML(chapterName(ch))}</strong>
          <small>${digits(ch.numberOfAyahs)} ${escapeHTML(t("verses"))}</small>
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

  /* তিলাওয়াতের সূরা তালিকা */
  function renderListenList() {
    if (!state.chapters.length) {
      $("surahList").innerHTML =
        `<p class="status">${escapeHTML(t("loading"))}</p>`;
      return;
    }

    $("surahList").innerHTML = state.chapters.map(ch => `
      <button
        class="surah-row ${ch.number === state.currentSurah ? "active" : ""}"
        type="button"
        data-listen-surah="${ch.number}"
      >
        <span class="surah-index">${digits(ch.number)}</span>
        <span class="surah-row-copy">
          <strong>${escapeHTML(chapterName(ch))}</strong>
          <small>${digits(ch.numberOfAyahs)} ${escapeHTML(t("verses"))}</small>
        </span>
      </button>
    `).join("");

    $("surahList").querySelectorAll("[data-listen-surah]").forEach(button => {
      button.addEventListener("click", async () => {
        pauseAudio();

        state.currentSurah = Number(button.dataset.listenSurah);
        state.currentAyah = 1;
        state.audioMode = "surah";

        renderListenList();

        await loadSurah(state.currentSurah, 1);
        await playFullSurah();
      });
    });
  }

  /* ১১৪টি সূরার তথ্য ও নাম লোড */
  async function loadChapters() {
    try {
      const chapters = await api("/surah");

      state.chapters = chapters.map(ch => ({ ...ch }));

      renderSurahSearchList("");
      renderListenList();

      if (state.page === "read") {
        await loadSurah(state.currentSurah, state.currentAyah);
      }
    } catch (_) {
      const errorHTML =
        `<p class="status">${escapeHTML(t("error"))}</p>`;

      $("readContent").innerHTML = errorHTML;
      $("surahList").innerHTML = errorHTML;
      $("surahSearchList").innerHTML = errorHTML;
    }
  }

  /* আরবি, অনুবাদ ও অডিও তথ্য */
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
    ]).then(([ar, tr, au]) => ({
      arabic: ar.ayahs || [],
      translations: tr?.ayahs || [],
      audio: au?.ayahs || []
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
        ${escapeHTML(t("surah"))} ${escapeHTML(chapterName(chapter))}
      </h2>
      <p class="read-surah-meta">
        ${digits(chapter?.number)} • ${digits(ayahs.length)} ${escapeHTML(t("verses"))}
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
              >▶ ${escapeHTML(t("play"))}</button>
            </div>
          </div>

          <p class="ayah-arabic" lang="ar" dir="rtl">
            ${escapeHTML(ayah.text)}
          </p>

          <p
            class="ayah-translation"
            style="font-size:${translationFontSize()}px"
          >${escapeHTML(translation)}</p>
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

    $("readFooterMessage").textContent = t("readTitle");

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

  function translationFontSize() {
    const size = 13 + (state.fontSize - 32) * 0.25;
    return Math.max(10, Math.min(18, size));
  }

  /* একক আয়াত চালানো */
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

  /* একটি সম্পূর্ণ সূরার সব আয়াত চালানো */
  async function playFullSurah() {
    try {
      const data = await getSurahData(state.currentSurah);

      if (!data.audio.length) {
        showMessage(t("audioError"));
        return;
      }

      state.audioItems = data.audio;
      state.audioIndex = 0;
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
    } catch (_) {
      state.playingSurah = false;
      showMessage(t("audioError"));
    }
  }

  /* পড়ার পেজে আগের বা পরের সম্পূর্ণ সূরা */
  function moveSurah(direction) {
    const nextSurah = state.currentSurah + direction;

    if (nextSurah < 1 || nextSurah > 114) {
      return;
    }

    pauseAudio();

    state.currentSurah = nextSurah;
    state.currentAyah = 1;

    if (state.page === "listen") {
      state.audioMode = "surah";

      loadSurah(nextSurah, 1).then(() => {
        playFullSurah();
      });
    } else {
      loadSurah(nextSurah, 1);
    }
  }

  /* মূল সেটিংস থেকে ভাষা ও থিম প্রয়োগ */
  function applyLanguage() {
    state.lang = getLanguage();

    document.documentElement.lang = state.lang;

    applyTheme();

    $("quranDescription").textContent = t("description");
    $("readOptionText").textContent = t("read");
    $("listenOptionText").textContent = t("listen");
    $("footerText").textContent = t("footer");
    $("surahSearchHeading").textContent = t("choose");
    $("surahSearchInput").placeholder = t("search");
    $("listenHeading").textContent = t("listenTitle");
    $("listenDescription").textContent = t("listenSubtitle");
    $("searchToggle").title = t("search");

    $("searchToggle").setAttribute("aria-label", t("search"));
    $("prevAyah").setAttribute("aria-label", t("prev"));
    $("nextAyah").setAttribute("aria-label", t("next"));
    $("prevTrack").setAttribute("aria-label", t("prev"));
    $("nextTrack").setAttribute("aria-label", t("next"));

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
      moveSurah(-1);
    });

    $("nextAyah").addEventListener("click", () => {
      moveSurah(1);
    });

    $("prevTrack").addEventListener("click", () => {
      moveSurah(-1);
    });

    $("nextTrack").addEventListener("click", () => {
      moveSurah(1);
    });

    $("playPause").addEventListener("click", () => {
      if (!audio.paused) {
        pauseAudio();
        return;
      }

      if (state.audioMode === "surah" && state.audioItems.length) {
        state.playingSurah = true;
        playAudioIndex();
      } else {
        playCurrentAyah(true);
      }
    });

    audio.addEventListener("play", updatePlayButton);
    audio.addEventListener("pause", updatePlayButton);

    /* বর্তমান সূরার সব আয়াত শেষ হলে পরের সূরা শুরু */
    audio.addEventListener("ended", () => {
      if (state.audioMode !== "surah" || !state.playingSurah) {
        updateFooter();
        return;
      }

      state.audioIndex++;

      if (state.audioIndex < state.audioItems.length) {
        state.currentAyah = state.audioIndex + 1;
        playAudioIndex();
        return;
      }

      if (state.currentSurah < 114) {
        state.currentSurah++;
        state.currentAyah = 1;

        renderListenList();

        loadSurah(state.currentSurah, 1).then(() => {
          if (state.playingSurah) {
            playFullSurah();
          }
        });

        return;
      }

      state.playingSurah = false;
      updateFooter();
    });

    audio.addEventListener("error", () => {
      if (state.page !== "home") {
        showMessage(t("audioError"));
      }
    });

    /* মূল সেটিংস অন্য ট্যাবে বদলালে */
    window.addEventListener("storage", event => {
      if (!event.key || event.key === "appSettings") {
        const newLanguage = getLanguage();

        applyTheme();

        if (newLanguage !== state.lang) {
          state.cache.clear();
          applyLanguage();
        }
      }
    });

    /* পেজে ফিরে এলে সর্বশেষ সেটিংস পড়া */
    window.addEventListener("pageshow", () => {
      const newLanguage = getLanguage();

      applyTheme();

      if (newLanguage !== state.lang) {
        state.cache.clear();
        applyLanguage();
      }
    });
  }

  /* আরবি লেখা ও অনুবাদ একসঙ্গে ছোট-বড় */
  function changeFont(delta) {
    state.fontSize = Math.max(
      22,
      Math.min(54, state.fontSize + delta)
    );

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.fontSize}px`
    );

    document.querySelectorAll(".ayah-translation").forEach(element => {
      element.style.fontSize = `${translationFontSize()}px`;
    });

    try {
      localStorage.setItem(
        "ibadat_quran_font_size",
        String(state.fontSize)
      );
    } catch (_) {}
  }

  async function init() {
    try {
      const saved = Number(
        localStorage.getItem("ibadat_quran_font_size")
      );

      if (saved >= 22 && saved <= 54) {
        state.fontSize = saved;
      }
    } catch (_) {}

    document.documentElement.style.setProperty(
      "--arabic-size",
      `${state.fontSize}px`
    );

    applyLanguage();
    wireEvents();
    updateFooter();

    await loadChapters();
  }

  init();
})();
