"use strict";

(() => {
  const $ = (selector) => document.querySelector(selector);

  const LANG = {
    bn: {
      locale: "bn-BD",
      city: "কলকাতা",
      locationUnavailable: "লোকেশন পাওয়া যায়নি",
      bismillah: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
      unit: "সে.",
      settings: "সেটিংস",
      days: ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
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
      city: "Kolkata",
      locationUnavailable: "Location unavailable",
      bismillah: "In the name of Allah, the Most Compassionate, the Most Merciful",
      unit: "°C",
      settings: "Settings",
      days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
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
      city: "कोलकाता",
      locationUnavailable: "स्थान उपलब्ध नहीं",
      bismillah: "परम कृपालु, अत्यंत दयावान अल्लाह के नाम से",
      unit: "°से.",
      settings: "सेटिंग्स",
      days: ["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
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

  /*
   * Sunrise is deliberately not displayed in the prayer timetable.
   * It remains included in prayerState() for status and countdown.
   */
  const PRAYER_IDS = {
    Fajr: "fajrTime",
    Dhuhr: "dhuhrTime",
    Asr: "asrTime",
    Maghrib: "maghribTime",
    Isha: "ishaTime"
  };

  /*
   * Known city translations.
   * Used when OpenStreetMap does not provide a translated name.
   */
  const CITY_NAMES = {
    Kolkata: {
      bn: "কলকাতা",
      en: "Kolkata",
      hi: "कोलकाता"
    },
    "New Delhi": {
      bn: "নয়াদিল্লি",
      en: "New Delhi",
      hi: "नई दिल्ली"
    },
    Delhi: {
      bn: "দিল্লি",
      en: "Delhi",
      hi: "दिल्ली"
    },
    Mumbai: {
      bn: "মুম্বাই",
      en: "Mumbai",
      hi: "मुंबई"
    },
    Chennai: {
      bn: "চেন্নাই",
      en: "Chennai",
      hi: "चेन्नई"
    },
    Hyderabad: {
      bn: "হায়দরাবাদ",
      en: "Hyderabad",
      hi: "हैदराबाद"
    },
    Dhaka: {
      bn: "ঢাকা",
      en: "Dhaka",
      hi: "ढाका"
    },
    London: {
      bn: "লন্ডন",
      en: "London",
      hi: "लंदन"
    }
  };

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

  /*
   * True only when the browser actually provides
   * the user's geolocation successfully.
   */
  let userLocationAvailable = false;

  let lastDate = "";
  let quoteIndex = 0;
  let quoteTimer = null;
  let quoteAnimationTimer = null;

  function hideMissingFeatureIcons() {
    document.querySelectorAll(".feature-icon").forEach((image) => {
      image.addEventListener("error", () => image.remove(), {
        once: true
      });

      if (image.complete && image.naturalWidth === 0) {
        image.remove();
      }
    });
  }

  function readSettings() {
    try {
      return JSON.parse(
        localStorage.getItem("appSettings") || "{}"
      );
    } catch (error) {
      console.warn("Unable to read appSettings.", error);
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

  function normalizeCityName(name) {
    return String(name || "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function findKnownCity(name) {
    const normalized = normalizeCityName(name);

    if (!normalized) return null;

    for (const [city, translations] of Object.entries(CITY_NAMES)) {
      if (normalizeCityName(city) === normalized) {
        return translations;
      }

      if (
        Object.values(translations).some(
          (value) => normalizeCityName(value) === normalized
        )
      ) {
        return translations;
      }
    }

    return null;
  }

  /*
   * Return the best available location name
   * for the currently selected language.
   */
  function localizeCity(name) {
    if (!name || !userLocationAvailable) {
      return t().locationUnavailable;
    }

    if (locationNames[language]) {
      return locationNames[language];
    }

    const knownCity = findKnownCity(name);

    if (knownCity && knownCity[language]) {
      return knownCity[language];
    }

    return name;
  }

  /*
   * Update the location text without changing HTML or CSS.
   */
  function updateLocationDisplay() {
    const cityElement = $("#city");

    if (!cityElement) return;

    if (!userLocationAvailable || !locationName) {
      cityElement.textContent = t().locationUnavailable;
      return;
    }

    cityElement.textContent = localizeCity(locationName);
  }

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
    document.body.classList.toggle("dark-mode", dark);

    const snapshot = JSON.stringify({
      language,
      theme: getTheme(settings),
      dark
    });

    if (snapshot !== settingsSnapshot) {
      const languageChanged =
        settingsSnapshot !== "" &&
        previousLanguage !== language;

      settingsSnapshot = snapshot;

      updateLanguage();

      if (languageChanged) {
        quoteIndex = 0;
        showQuote();

        /*
         * Use already available translations.
         * No unnecessary reverse-geocoding request.
         */
        updateLocationDisplay();
      }
    }
  }

  function updateLanguage() {
    const strings = t();

    $("#bismillahMeaning").textContent = strings.bismillah;
    $("#temperatureUnit").textContent = strings.unit;

    const settingsLabel = $("[data-setting-label]");

    if (settingsLabel) {
      settingsLabel.textContent = strings.settings;
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

  function updateClockAndDate() {
    const now = new Date();

    $("#clock").textContent = formatClock(now, true);

    $("#date").textContent = new Intl.DateTimeFormat(t().locale, {
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

    return `${formatNumber(Number(match[1]))}:${formatNumber(Number(match[2]))}`;
  }

  function renderPrayerTimes() {
    if (!prayerTimes) return;

    Object.entries(PRAYER_IDS).forEach(([key, id]) => {
      const element = document.getElementById(id);

      if (element) {
        element.textContent = formatPrayerTime(prayerTimes[key]);
      }
    });
  }

  /*
   * Sunrise remains in the chronological event sequence,
   * but is not displayed in the prayer timetable.
   */
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
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

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
    const currentPrayer = $("#currentPrayer");
    const nextPrayer = $("#nextPrayer");
    const countdown = $("#countdown");

    if (!prayerTimes) {
      currentPrayer.textContent = "--";
      nextPrayer.textContent = "--";
      countdown.textContent = "--:--:--";
      return;
    }

    const state = prayerState();

    if (!state) {
      currentPrayer.textContent = "--";
      nextPrayer.textContent = "--";
      countdown.textContent = "--:--:--";
      return;
    }

    currentPrayer.textContent =
      t().prayers[state.current.key] || state.current.key;

    nextPrayer.textContent =
      t().prayers[state.next.key] || state.next.key;

    const secondsLeft = Math.max(
      0,
      Math.floor((state.nextDate.getTime() - Date.now()) / 1000)
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
    try {
      const url = new URL(
        `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}`
      );

      url.searchParams.set("latitude", latitude);
      url.searchParams.set("longitude", longitude);
      url.searchParams.set("method", "1");

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Prayer times unavailable");
      }

      const data = await response.json();

      if (!data?.data?.timings) {
        throw new Error("Missing prayer times");
      }

      prayerTimes = data.data.timings;
      lastDate = todayKey();

      renderPrayerTimes();
      updatePrayerStatus();

    } catch (error) {
      console.warn("IBADAT: prayer times unavailable.", error);
    }
  }

  function renderTemperature() {
    $("#temperature").textContent = new Intl.NumberFormat(t().locale, {
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
    try {
      const url = new URL("https://api.open-meteo.com/v1/forecast");

      url.searchParams.set("latitude", latitude);
      url.searchParams.set("longitude", longitude);
      url.searchParams.set("current", "temperature_2m,weather_code");
      url.searchParams.set("timezone", "auto");

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Weather unavailable");
      }

      const data = await response.json();

      if (!data.current) {
        throw new Error("Missing current weather");
      }

      weatherTemperature = Math.round(data.current.temperature_2m);

      $("#weatherIcon").textContent =
        weatherSymbol(data.current.weather_code);

      renderTemperature();

    } catch (error) {
      console.warn("IBADAT: weather unavailable.", error);
    }
  }

  /*
   * Extract the closest available locality from the address.
   */
  function getLocationFromAddress(address) {
    return (
      address.village ||
      address.hamlet ||
      address.neighbourhood ||
      address.suburb ||
      address.residential ||
      address.quarter ||
      address.city_district ||
      address.town ||
      address.municipality ||
      address.city ||
      address.block ||
      address.county ||
      address.state_district ||
      address.state ||
      address.country ||
      null
    );
  }

  /*
   * Get the language-specific names available in OSM.
   */
  function getLocationTranslations(namedetails, mainName) {
    const details = namedetails || {};

    const translations = {
      bn: details["name:bn"] || null,
      en: details["name:en"] || null,
      hi: details["name:hi"] || null
    };

    const knownCity = findKnownCity(mainName);

    if (knownCity) {
      translations.bn = translations.bn || knownCity.bn;
      translations.en = translations.en || knownCity.en;
      translations.hi = translations.hi || knownCity.hi;
    }

    return translations;
  }

  /*
   * Reverse geocoding:
   * - Runs only when actual geolocation is available.
   * - Requests address and language-specific name details.
   * - Stores available Bengali, English and Hindi names.
   * - Shows a localized unavailable message if no name is found.
   */
  async function loadCity(latitude, longitude) {
    try {
      const url = new URL(
        "https://nominatim.openstreetmap.org/reverse"
      );

      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("lat", latitude);
      url.searchParams.set("lon", longitude);
      url.searchParams.set("zoom", "18");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("namedetails", "1");

      const languageCode = {
        bn: "bn",
        en: "en",
        hi: "hi"
      }[language] || "bn";

      url.searchParams.set("accept-language", languageCode);

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Location name unavailable");
      }

      const data = await response.json();

      const address = data.address || {};
      const namedetails = data.namedetails || {};

      const addressName = getLocationFromAddress(address);

      locationName =
        addressName ||
        namedetails.name ||
        data.name ||
        null;

      if (!locationName) {
        throw new Error("No usable location name found");
      }

      locationNames = getLocationTranslations(
        namedetails,
        locationName
      );

      /*
       * Use the localized address returned for the current language
       * only as a fallback for that language.
       */
      if (!locationNames[language]) {
        locationNames[language] =
          addressName ||
          namedetails.name ||
          data.name ||
          locationName;
      }

      updateLocationDisplay();

      try {
        localStorage.setItem(
          "ibadatCityName",
          locationName
        );

        localStorage.setItem(
          "ibadatCityLanguage",
          language
        );

        localStorage.setItem(
          "ibadatCityTranslations",
          JSON.stringify(locationNames)
        );

      } catch (storageError) {
        console.warn(
          "IBADAT: unable to save city name.",
          storageError
        );
      }

    } catch (error) {
      console.warn(
        "IBADAT: location name unavailable.",
        error
      );

      locationName = null;

      locationNames = {
        bn: null,
        en: null,
        hi: null
      };

      updateLocationDisplay();
    }
  }

  /*
   * Load prayer times and weather for the supplied coordinates.
   *
   * locationAvailable:
   * true  = actual browser geolocation succeeded.
   * false = browser geolocation failed; fallback coordinates
   *         are used for prayer times and weather only.
   */
  async function loadAll(
    latitude,
    longitude,
    locationAvailable = true
  ) {
    coordinates = {
      latitude,
      longitude
    };

    userLocationAvailable = locationAvailable;

    /*
     * Reset previous location data before loading new data.
     */
    locationName = null;

    locationNames = {
      bn: null,
      en: null,
      hi: null
    };

    updateLocationDisplay();

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
      console.warn(
        "IBADAT: unable to save location.",
        error
      );
    }

    const tasks = [
      loadPrayerTimes(latitude, longitude),
      loadWeather(latitude, longitude)
    ];

    /*
     * Reverse geocoding is only performed when the browser
     * has successfully obtained the user's actual location.
     */
    if (locationAvailable) {
      tasks.push(loadCity(latitude, longitude));
    }

    await Promise.all(tasks);
  }

  /*
   * Get the user's actual location.
   *
   * If permission is denied, unavailable or times out:
   * - Show localized location-unavailable message.
   * - Keep Kolkata fallback for prayer times and weather.
   */
  function loadLocation() {
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

      () => {
        loadAll(22.5726, 88.3639, false);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  }

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

  /*
   * Show one localized quote and change it every 30 seconds.
   */
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

    /*
     * Measure available width and text width before
     * starting the footer scrolling animation.
     */
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

  function init() {
    hideMissingFeatureIcons();

    applySettings();

    $("#sunriseSettings").addEventListener(
      "click",
      openSettings
    );

    updateClockAndDate();
    showQuote();
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
