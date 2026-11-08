"use strict";

(() => {
  const $ = (selector) => document.querySelector(selector);

  /* =========================================
     LANGUAGE DATA
     ========================================= */

  const LANG = {
    bn: {
      locale: "bn-BD",
      locationLoading: "লোকেশন খোঁজা হচ্ছে...",
      locationUnavailable: "লোকেশন পাওয়া যায়নি",
      bismillah: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
      unit: "সে.",
      settings: "সেটিংস",

      days: [
        "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার",
        "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
      ],

      prayers: {
        Fajr: "ফজর",
        Sunrise: "সূর্যোদয়",
        Dhuhr: "যোহর",
        Asr: "আসর",
        Maghrib: "মাগরিব",
        Isha: "এশা"
      },

      features: {
        namaz: "নামাজ",
        quran: "কুরআন",
        dua: "দোয়া",
        hadith: "হাদিস",
        qibla: "কিবলা",
        tasbih: "তাসবিহ"
      },

      quotes: [
        "আল্লাহর স্মরণেই অন্তর প্রশান্ত হয়।",
        "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সঙ্গে আছেন।",
        "আল্লাহর রহমত থেকে নিরাশ হয়ো না।",
        "নামাজ কায়েম করো এবং আল্লাহকে স্মরণ করো।",
        "আল্লাহ উত্তম পরিকল্পনাকারী।",
        "কৃতজ্ঞ হলে আল্লাহ নিয়ামত বাড়িয়ে দেন।",
        "নিশ্চয়ই কষ্টের সঙ্গে স্বস্তি রয়েছে।",
        "আল্লাহর ওপর ভরসা করো।",
        "সৎকাজের প্রতিদান উত্তম।",
        "আল্লাহ ক্ষমাশীল ও পরম দয়ালু।"
      ]
    },

    en: {
      locale: "en-IN",
      locationLoading: "Finding location...",
      locationUnavailable: "Location unavailable",
      bismillah: "In the name of Allah, the Most Compassionate, the Most Merciful",
      unit: "°C",
      settings: "Settings",

      days: [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
      ],

      prayers: {
        Fajr: "Fajr",
        Sunrise: "Sunrise",
        Dhuhr: "Dhuhr",
        Asr: "Asr",
        Maghrib: "Maghrib",
        Isha: "Isha"
      },

      features: {
        namaz: "Prayer",
        quran: "Quran",
        dua: "Dua",
        hadith: "Hadith",
        qibla: "Qibla",
        tasbih: "Tasbih"
      },

      quotes: [
        "Indeed, in the remembrance of Allah hearts find peace.",
        "Indeed, Allah is with those who are patient.",
        "Do not despair of the mercy of Allah.",
        "Establish prayer and remember Allah.",
        "Allah is the best of planners.",
        "If you are grateful, He will increase you.",
        "Indeed, with hardship comes ease.",
        "Put your trust in Allah.",
        "Good deeds bring a good reward.",
        "Allah is Forgiving and Merciful."
      ]
    },

    hi: {
      locale: "hi-IN-u-nu-deva",
      locationLoading: "लोकेशन खोजी जा रही है...",
      locationUnavailable: "स्थान उपलब्ध नहीं",
      bismillah: "परम कृपालु, अत्यंत दयावान अल्लाह के नाम से",
      unit: "°से.",
      settings: "सेटिंग्स",

      days: [
        "रविवार", "सोमवार", "मंगलवार", "बुधवार",
        "गुरुवार", "शुक्रवार", "शनिवार"
      ],

      prayers: {
        Fajr: "फ़ज्र",
        Sunrise: "सूर्योदय",
        Dhuhr: "ज़ुहर",
        Asr: "अस्र",
        Maghrib: "मग़रिब",
        Isha: "इशा"
      },

      features: {
        namaz: "नमाज़",
        quran: "क़ुरआन",
        dua: "दुआ",
        hadith: "हदीस",
        qibla: "क़िबला",
        tasbih: "तस्बीह"
      },

      quotes: [
        "अल्लाह के स्मरण से दिलों को सुकून मिलता है।",
        "निश्चय ही अल्लाह धैर्य रखने वालों के साथ है।",
        "अल्लाह की रहमत से निराश न हों।",
        "नमाज़ क़ायम करें और अल्लाह को याद करें।",
        "अल्लाह सबसे अच्छी योजना बनाने वाला है।",
        "शुक्र करने पर अल्लाह नेमतें बढ़ाता है।",
        "निश्चय ही कठिनाई के साथ आसानी है।",
        "अल्लाह पर भरोसा रखें।",
        "नेक काम का बदला अच्छा है।",
        "अल्लाह क्षमाशील और दयालु है।"
      ]
    }
  };

  const PRAYER_IDS = {
    Fajr: "fajrTime",
    Dhuhr: "dhuhrTime",
    Asr: "asrTime",
    Maghrib: "maghribTime",
    Isha: "ishaTime"
  };

  /* =========================================
     APPLICATION STATE
     ========================================= */

  let language = "bn";
  let settingsSnapshot = "";

  let coordinates = null;
  let prayerTimes = null;
  let weatherTemperature = null;

  let locationName = null;

  let locationNames = {
    bn: null,
    en: null,
    hi: null
  };

  let locationStatus = "loading";
  let lastDate = "";

  let quoteIndex = 0;
  let quoteTimer = null;
  let quoteAnimationTimer = null;

  let locationRequestId = 0;
  let prayerRequestId = 0;
  let weatherRequestId = 0;

  /* =========================================
     SETTINGS
     ========================================= */

  function readSettings() {
    try {
      return JSON.parse(
        localStorage.getItem("appSettings") || "{}"
      );
    } catch (error) {
      console.warn("IBADAT: settings could not be read.", error);
      return {};
    }
  }

  function getLanguage(settings) {
    const value = settings.lang || settings.language || "bn";
    return LANG[value] ? value : "bn";
  }

  function getTheme(settings) {
    const raw = settings.themeColor || settings.theme || "classic";

    const aliases = {
      green: "classic",
      classic: "classic",
      blue: "royal",
      royal: "royal",
      rose: "rose",
      champagne: "rose",
      pista: "pista",
      fresh: "pista"
    };

    return aliases[raw] || "classic";
  }

  function t() {
    return LANG[language] || LANG.bn;
  }

  /* =========================================
     LOCATION CACHE
     ========================================= */

  function locationCacheKey(lat, lon) {
    return [
      "ibadatLocationV2",
      Number(lat).toFixed(4),
      Number(lon).toFixed(4)
    ].join("_");
  }

  function readLocationCache(lat, lon) {
    try {
      const key = locationCacheKey(lat, lon);

      const saved = JSON.parse(
        localStorage.getItem(key) || "{}"
      );

      if (
        !saved.updatedAt ||
        Date.now() - saved.updatedAt > 30 * 24 * 60 * 60 * 1000
      ) {
        return null;
      }

      return saved.names || null;

    } catch (error) {
      return null;
    }
  }

  function saveLocationCache(lat, lon) {
    try {
      const key = locationCacheKey(lat, lon);

      localStorage.setItem(
        key,
        JSON.stringify({
          names: locationNames,
          updatedAt: Date.now()
        })
      );

    } catch (error) {
      console.warn("IBADAT: location cache save failed.", error);
    }
  }

  /* =========================================
     LOCATION DISPLAY
     ========================================= */

  function updateLocationDisplay() {
    const element = $("#city");

    if (!element) return;

    if (locationStatus === "loading") {
      element.textContent = t().locationLoading;
      return;
    }

    if (locationStatus !== "available") {
      element.textContent = t().locationUnavailable;
      return;
    }

    element.textContent =
      locationNames[language] ||
      locationName ||
      t().locationUnavailable;
  }

  /* =========================================
     LOCALITY SELECTION
     Never use street or road as location
     ========================================= */

  function getLocationFromAddress(address) {
    if (!address || typeof address !== "object") {
      return null;
    }

    const fields = [
      "neighbourhood",
      "suburb",
      "quarter",
      "city_district",
      "borough",
      "town",
      "city",
      "municipality",
      "village",
      "hamlet",
      "locality",
      "county",
      "state_district",
      "state"
    ];

    for (const field of fields) {
      const value = address[field];

      if (
        typeof value === "string" &&
        value.trim()
      ) {
        return value.trim();
      }
    }

    return null;
  }

  /* =========================================
     SCRIPT DETECTION
     ========================================= */

  function containsTargetScript(value, lang) {
    if (!value) return false;

    if (lang === "bn") {
      return /[\u0980-\u09FF]/.test(value);
    }

    if (lang === "hi") {
      return /[\u0900-\u097F]/.test(value);
    }

    if (lang === "en") {
      return /[A-Za-z]/.test(value);
    }

    return false;
  }

  /* =========================================
     UNIVERSAL TRANSLITERATION
     ========================================= */

  async function transliteratePlaceName(value, lang) {
    if (!value) return null;

    const name = String(value).trim();

    if (!name) return null;

    if (lang === "en") return name;

    if (containsTargetScript(name, lang)) {
      return name;
    }

    const languageCode = {
      bn: "bn-t-i0-und",
      hi: "hi-t-i0-und"
    }[lang];

    try {
      const url = new URL(
        "https://inputtools.google.com/request"
      );

      url.searchParams.set("text", name);
      url.searchParams.set("itc", languageCode);
      url.searchParams.set("num", "1");

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Transliteration service unavailable.");
      }

      const result = await response.json();

      const suggestion = result?.[1]?.[0]?.[1]?.[0];

      if (
        result?.[0] === "SUCCESS" &&
        typeof suggestion === "string" &&
        suggestion.trim()
      ) {
        return suggestion.trim();
      }

    } catch (error) {
      console.warn("IBADAT: transliteration unavailable.", error);
    }

    return name;
  }

  /* =========================================
     REVERSE GEOCODING
     ========================================= */

  async function loadCity(latitude, longitude) {
    const requestId = ++locationRequestId;

    locationStatus = "loading";
    updateLocationDisplay();

    const cached = readLocationCache(latitude, longitude);

    if (cached) {
      locationNames = {
        bn: cached.bn || null,
        en: cached.en || null,
        hi: cached.hi || null
      };

      if (locationNames[language]) {
        locationName =
          locationNames.en ||
          locationNames.bn ||
          locationNames.hi;

        locationStatus = "available";
        updateLocationDisplay();
        return;
      }
    }

    try {
      const url = new URL(
        "https://nominatim.openstreetmap.org/reverse"
      );

      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("lat", latitude);
      url.searchParams.set("lon", longitude);
      url.searchParams.set("zoom", "14");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("namedetails", "1");

      url.searchParams.set(
        "accept-language",
        language === "bn"
          ? "bn,en"
          : language === "hi"
            ? "hi,en"
            : "en"
      );

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Reverse geocoding failed.");
      }

      const data = await response.json();

      if (requestId !== locationRequestId) return;

      const address = data.address || {};
      const names = data.namedetails || {};

      const locality = getLocationFromAddress(address);

      if (!locality) {
        throw new Error("Locality not found.");
      }

      const englishName =
        names["name:en"] ||
        address["name:en"] ||
        locality;

      const bengaliName =
        names["name:bn"] ||
        address["name:bn"] ||
        null;

      const hindiName =
        names["name:hi"] ||
        address["name:hi"] ||
        null;

      locationName = englishName;

      locationNames = {
        bn: bengaliName,
        en: englishName,
        hi: hindiName
      };

      /*
       * If OSM has not provided the selected language,
       * try transliterating the best available name.
       */
      if (!locationNames[language]) {
        const sourceName =
          language === "en"
            ? englishName
            : englishName || locality;

        locationNames[language] =
          await transliteratePlaceName(
            sourceName,
            language
          );
      }

      if (requestId !== locationRequestId) return;

      locationStatus = "available";

      saveLocationCache(latitude, longitude);
      updateLocationDisplay();

    } catch (error) {
      if (requestId !== locationRequestId) return;

      console.warn("IBADAT: location unavailable.", error);

      if (locationNames[language]) {
        locationStatus = "available";
      } else {
        locationStatus = "unavailable";
      }

      updateLocationDisplay();
    }
  }

  /* =========================================
     APPLY SETTINGS
     ========================================= */

  function applySettings() {
    const settings = readSettings();
    const previousLanguage = language;

    language = getLanguage(settings);

    const dark = Boolean(
      settings.dark ??
      settings.darkMode ??
      settings.isDarkMode ??
      false
    );

    document.documentElement.lang = language;

    document.body.dataset.themeColor = getTheme(settings);

    document.body.classList.toggle(
      "dark-mode",
      dark
    );

    const snapshot = JSON.stringify({
      language,
      theme: getTheme(settings),
      dark
    });

    if (snapshot === settingsSnapshot) return;

    const languageChanged =
      settingsSnapshot !== "" &&
      previousLanguage !== language;

    settingsSnapshot = snapshot;

    updateLanguage();

    if (languageChanged) {
      quoteIndex = 0;
      showQuote();

      if (coordinates) {
        loadCity(
          coordinates.latitude,
          coordinates.longitude
        );
      } else {
        updateLocationDisplay();
      }
    }
  }

  /* =========================================
     LANGUAGE UPDATE
     ========================================= */

  function updateLanguage() {
    const strings = t();

    $("#bismillahMeaning").textContent = strings.bismillah;
    $("#temperatureUnit").textContent = strings.unit;

    const settingLabel = $("[data-setting-label]");

    if (settingLabel) {
      settingLabel.textContent = strings.settings;
    }

    const settingsButton = $("#sunriseSettings");

    if (settingsButton) {
      settingsButton.setAttribute(
        "aria-label",
        strings.settings
      );
    }

    document.querySelectorAll("[data-prayer-label]").forEach((element) => {
      const key = element.dataset.prayerLabel;
      element.textContent = strings.prayers[key] || key;
    });

    document.querySelectorAll("[data-feature-label]").forEach((element) => {
      const key = element.dataset.featureLabel;
      element.textContent = strings.features[key] || key;
    });

    updateLocationDisplay();
    updateClockAndDate();

    if (weatherTemperature !== null) {
      renderTemperature();
    }

    if (prayerTimes) {
      renderPrayerTimes();
      updatePrayerStatus();
    }

    showQuote();
  }

  /* =========================================
     NUMBER FORMATTING
     ========================================= */

  function formatNumber(value, minimumDigits = 2) {
    return new Intl.NumberFormat(t().locale, {
      minimumIntegerDigits: minimumDigits,
      maximumFractionDigits: 0,
      useGrouping: false
    }).format(value);
  }

  function formatClock(date, seconds = true) {
    return new Intl.DateTimeFormat(t().locale, {
      hour: "2-digit",
      minute: "2-digit",
      ...(seconds ? { second: "2-digit" } : {}),
      hour12: false
    }).format(date);
  }

  /* =========================================
     DATE AND CLOCK
     ========================================= */

  function updateClockAndDate() {
    const now = new Date();

    $("#clock").textContent = formatClock(now, true);

    $("#date").textContent =
      new Intl.DateTimeFormat(t().locale, {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(now);

    $("#dayName").textContent = t().days[now.getDay()];
  }

  function todayKey() {
    const now = new Date();

    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");
  }

  /* =========================================
     PRAYER TIME FUNCTIONS
     ========================================= */

  function parseTime(value) {
    if (!value) return null;

    const match = String(value).match(/(\d{1,2}):(\d{2})/);

    if (!match) return null;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    if (hours > 23 || minutes > 59) return null;

    return hours * 60 + minutes;
  }

  function formatPrayerTime(value) {
    if (!value) return "--:--";

    const match = String(value).match(/(\d{1,2}):(\d{2})/);

    if (!match) return "--:--";

    return (
      formatNumber(Number(match[1])) +
      ":" +
      formatNumber(Number(match[2]))
    );
  }

  function renderPrayerTimes() {
    if (!prayerTimes) return;

    Object.entries(PRAYER_IDS).forEach(([key, id]) => {
      const element = document.getElementById(id);

      if (element) {
        element.textContent =
          formatPrayerTime(prayerTimes[key]);
      }
    });
  }

  function prayerState() {
    if (!prayerTimes) return null;

    const order = [
      "Fajr",
      "Sunrise",
      "Dhuhr",
      "Asr",
      "Maghrib",
      "Isha"
    ];

    const entries = order
      .map((key) => ({
        key,
        minutes: parseTime(prayerTimes[key])
      }))
      .filter((item) => item.minutes !== null)
      .sort((a, b) => a.minutes - b.minutes);

    if (!entries.length) return null;

    const now = new Date();

    const nowMinutes =
      now.getHours() * 60 + now.getMinutes();

    let current = null;
    let next = null;

    for (const item of entries) {
      if (item.minutes <= nowMinutes) {
        current = item;
      } else {
        next = item;
        break;
      }
    }

    if (!current) {
      current = entries[entries.length - 1];
    }

    if (!next) {
      next = entries[0];
    }

    const nextDate = new Date();

    nextDate.setHours(
      Math.floor(next.minutes / 60),
      next.minutes % 60,
      0,
      0
    );

    if (next.minutes <= nowMinutes) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    return {
      current,
      next,
      nextDate
    };
  }

  function updatePrayerStatus() {
    const currentElement = $("#currentPrayer");
    const nextElement = $("#nextPrayer");
    const countdown = $("#countdown");

    if (!prayerTimes) {
      currentElement.textContent = "--";
      nextElement.textContent = "--";
      countdown.textContent = "--:--:--";
      return;
    }

    const state = prayerState();

    if (!state) return;

    currentElement.textContent =
      t().prayers[state.current.key] ||
      state.current.key;

    nextElement.textContent =
      t().prayers[state.next.key] ||
      state.next.key;

    const secondsLeft = Math.max(
      0,
      Math.floor(
        (state.nextDate.getTime() - Date.now()) / 1000
      )
    );

    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    countdown.textContent = [
      formatNumber(hours),
      formatNumber(minutes),
      formatNumber(seconds)
    ].join(":");
  }

  async function loadPrayerTimes(latitude, longitude) {
    const requestId = ++prayerRequestId;

    try {
      const url = new URL(
        `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}`
      );

      url.searchParams.set("latitude", latitude);
      url.searchParams.set("longitude", longitude);
      url.searchParams.set("method", "1");

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Prayer times unavailable.");
      }

      const data = await response.json();

      if (!data?.data?.timings) {
        throw new Error("Prayer times missing.");
      }

      if (requestId !== prayerRequestId) return;

      prayerTimes = data.data.timings;
      lastDate = todayKey();

      renderPrayerTimes();
      updatePrayerStatus();

    } catch (error) {
      console.warn("IBADAT: prayer times unavailable.", error);
    }
  }

  /* =========================================
     WEATHER
     ========================================= */

  function renderTemperature() {
    $("#temperature").textContent =
      new Intl.NumberFormat(t().locale, {
        maximumFractionDigits: 0,
        useGrouping: false
      }).format(weatherTemperature);

    $("#temperatureUnit").textContent = t().unit;
  }

  function weatherSymbol(code) {
    if (code === 0) return "☀️";
    if ([1, 2].includes(code)) return "🌤️";
    if (code === 3) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "🌨️";
    if ([95, 96, 99].includes(code)) return "⛈️";

    return "🌤️";
  }

  async function loadWeather(latitude, longitude) {
    const requestId = ++weatherRequestId;

    try {
      const url = new URL(
        "https://api.open-meteo.com/v1/forecast"
      );

      url.searchParams.set("latitude", latitude);
      url.searchParams.set("longitude", longitude);
      url.searchParams.set(
        "current",
        "temperature_2m,weather_code"
      );
      url.searchParams.set("timezone", "auto");

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Weather unavailable.");
      }

      const data = await response.json();

      if (!data.current) {
        throw new Error("Weather data missing.");
      }

      if (requestId !== weatherRequestId) return;

      weatherTemperature =
        Math.round(data.current.temperature_2m);

      $("#weatherIcon").textContent =
        weatherSymbol(data.current.weather_code);

      renderTemperature();

    } catch (error) {
      console.warn("IBADAT: weather unavailable.", error);
    }
  }

  /* =========================================
     LOAD ALL LOCATION-BASED DATA
     ========================================= */

  async function loadAll(
    latitude,
    longitude,
    locationAvailable = true
  ) {
    coordinates = {
      latitude,
      longitude
    };

    try {
      localStorage.setItem(
        "ibadatUserLocation",
        JSON.stringify({
          lat: latitude,
          lon: longitude,
          updatedAt: Date.now()
        })
      );
    } catch (error) {
      console.warn("IBADAT: location save failed.", error);
    }

    if (locationAvailable) {
      locationStatus = "loading";
      updateLocationDisplay();
    } else {
      locationStatus = "unavailable";
      updateLocationDisplay();
    }

    const tasks = [
      loadPrayerTimes(latitude, longitude),
      loadWeather(latitude, longitude)
    ];

    if (locationAvailable) {
      tasks.push(loadCity(latitude, longitude));
    }

    await Promise.all(tasks);
  }

  /* =========================================
     GPS LOCATION
     ========================================= */

  function loadLocation() {
    locationStatus = "loading";
    updateLocationDisplay();

    if (!navigator.geolocation) {
      loadAll(22.5726, 88.3639, false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadAll(
          position.coords.latitude,
          position.coords.longitude,
          true
        );
      },

      (error) => {
        console.warn(
          "IBADAT: GPS location unavailable.",
          error
        );

        /*
         * Kolkata is used only as a fallback for
         * prayer times and weather. It is never
         * displayed as the detected location.
         */
        loadAll(22.5726, 88.3639, false);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  }

  /* =========================================
     SETTINGS PAGE
     ========================================= */

  function openSettings() {
    const settings = readSettings();

    const configured =
      settings.settingsPage ||
      settings.settingsUrl;

    if (
      typeof configured === "string" &&
      configured.trim()
    ) {
      window.location.href = configured;
      return;
    }

    window.location.href = "html/settings.html";
  }

  /* =========================================
     FEATURE ICONS
     ========================================= */

  function hideMissingFeatureIcons() {
    document.querySelectorAll(".feature-icon").forEach((image) => {
      image.addEventListener(
        "error",
        () => image.remove(),
        { once: true }
      );

      if (image.complete && image.naturalWidth === 0) {
        image.remove();
      }
    });
  }

  /* =========================================
     FOOTER QUOTE ANIMATION
     ========================================= */

  function showQuote() {
    const message = $("#footerMessage");

    const windowElement = document.querySelector(
      ".footer-message-window"
    );

    if (!message || !windowElement) return;

    const quotes = t().quotes;
    const quote = quotes[quoteIndex % quotes.length];

    if (quoteTimer) {
      window.clearTimeout(quoteTimer);
    }

    if (quoteAnimationTimer) {
      window.clearTimeout(quoteAnimationTimer);
    }

    message.style.animation = "none";
    message.textContent = quote;

    quoteAnimationTimer = window.setTimeout(() => {
      const availableWidth = windowElement.clientWidth;
      const textWidth = message.scrollWidth;
      const distance = availableWidth + textWidth;

      const duration = Math.max(12, distance / 30);

      message.style.setProperty(
        "--message-duration",
        `${duration}s`
      );

      message.style.animation =
        "footer-message-scroll var(--message-duration) linear infinite";

    }, 50);

    quoteTimer = window.setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      showQuote();
    }, 30000);
  }

  /* =========================================
     INITIALIZATION
     ========================================= */

  function init() {
    hideMissingFeatureIcons();

    applySettings();

    $("#sunriseSettings").addEventListener(
      "click",
      openSettings
    );

    updateClockAndDate();
    showQuote();

    /*
     * Ask for GPS once when Home opens.
     */
    loadLocation();

    window.setInterval(() => {
      updateClockAndDate();
      updatePrayerStatus();

      if (
        lastDate &&
        lastDate !== todayKey() &&
        coordinates
      ) {
        loadPrayerTimes(
          coordinates.latitude,
          coordinates.longitude
        );
      }

    }, 1000);

    window.addEventListener("storage", (event) => {
      if (!event.key || event.key === "appSettings") {
        applySettings();
      }
    });

    window.addEventListener("pageshow", () => {
      applySettings();
      updateClockAndDate();
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        applySettings();
        updateClockAndDate();
        updatePrayerStatus();
      }
    });

    window.addEventListener("resize", () => {
      showQuote();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
