"use strict";

(() => {
  const $ = (selector) => document.querySelector(selector);

  const LANG = {
    bn: {
      locale: "bn-BD",
      city: "কলকাতা",
      bismillah: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
      footer: "আল্লাহর স্মরণেই অন্তর প্রশান্ত হয়।",
      days: ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
      unit: "সে.",
      prayers: {
        Fajr: "ফজর",
        Sunrise: "সূর্যোদয়",
        Dhuhr: "যোহর",
        Asr: "আসর",
        Maghrib: "মাগরিব",
        Isha: "ইশা"
      },
      features: {
        namaz: "নামাজ",
        quran: "কুরআন",
        dua: "দোয়া",
        hadith: "হাদিস",
        qibla: "কিবলা",
        tasbih: "তাসবিহ"
      }
    },

    en: {
      locale: "en-IN",
      city: "Kolkata",
      bismillah: "In the name of Allah, the Most Compassionate, the Most Merciful",
      footer: "In the remembrance of Allah, hearts find peace.",
      days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      unit: "°C",
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
      }
    },

    hi: {
      locale: "hi-IN-u-nu-deva",
      city: "कोलकाता",
      bismillah: "परम कृपालु, अत्यंत दयावान अल्लाह के नाम से",
      footer: "अल्लाह के स्मरण से दिल को सुकून मिलता है।",
      days: ["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
      unit: "°से.",
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
      }
    }
  };

  const PRAYER_IDS = {
    Fajr: "fajrTime",
    Sunrise: "sunriseTime",
    Dhuhr: "dhuhrTime",
    Asr: "asrTime",
    Maghrib: "maghribTime",
    Isha: "ishaTime"
  };

  const CITY_NAMES = {
    Kolkata: { bn: "কলকাতা", en: "Kolkata", hi: "कोलकाता" },
    "New Delhi": { bn: "নয়াদিল্লি", en: "New Delhi", hi: "नई दिल्ली" },
    Delhi: { bn: "দিল্লি", en: "Delhi", hi: "दिल्ली" },
    Mumbai: { bn: "মুম্বাই", en: "Mumbai", hi: "मुंबई" },
    Chennai: { bn: "চেন্নাই", en: "Chennai", hi: "चेन्नई" },
    Hyderabad: { bn: "হায়দরাবাদ", en: "Hyderabad", hi: "हैदराबाद" },
    Dhaka: { bn: "ঢাকা", en: "Dhaka", hi: "ढाका" },
    London: { bn: "লন্ডন", en: "London", hi: "लंदन" }
  };

  let language = "bn";
  let settingsSnapshot = "";
  let coordinates = null;
  let prayerTimes = null;
  let weatherTemperature = null;
  let locationName = null;
  let lastDate = "";

  /*
   * Feature icon image handling:
   * If an icon image is missing or cannot load, remove only that image.
   * The feature card and its translated label remain visible.
   */
  function hideMissingFeatureIcons() {
    document.querySelectorAll(".feature-icon").forEach((image) => {
      image.addEventListener("error", () => {
        image.remove();
      }, { once: true });

      if (image.complete && image.naturalWidth === 0) {
        image.remove();
      }
    });
  }

  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem("appSettings") || "{}");
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

  function applySettings() {
    const settings = readSettings();
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
      settingsSnapshot = snapshot;
      updateLanguage();
    }
  }

  function t() {
    return LANG[language] || LANG.bn;
  }

  function localizeCity(name) {
    if (!name) return t().city;

    const mapped = CITY_NAMES[name];

    if (mapped) return mapped[language] || mapped.en;

    return name;
  }

  function updateLanguage() {
    const strings = t();

    $("#bismillahMeaning").textContent = strings.bismillah;
    $("#footerMessage").textContent = strings.footer;
    $("#temperatureUnit").textContent = strings.unit;

    document.querySelectorAll("[data-prayer-label]").forEach((element) => {
      const key = element.dataset.prayerLabel;
      element.textContent = strings.prayers[key] || key;
    });

    document.querySelectorAll("[data-feature-label]").forEach((element) => {
      const key = element.dataset.featureLabel;
      element.textContent = strings.features[key] || key;
    });

    $("#city").textContent = locationName
      ? localizeCity(locationName)
      : strings.city;

    updateClockAndDate();

    if (weatherTemperature !== null) {
      renderTemperature();
    }

    if (prayerTimes) {
      renderPrayerTimes();
      updatePrayerStatus();
    }
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

  function prayerState() {
    if (!prayerTimes) return null;

    const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const entries = order
      .map((key) => ({
        key,
        minutes: parseTime(prayerTimes[key])
      }))
      .filter((item) => item.minutes !== null);

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

    if (!current) current = entries[entries.length - 1];
    if (!next) next = entries[0];

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

    return { current, next, nextDate };
  }

  function updatePrayerStatus() {
    const state = prayerState();
    if (!state) return;

    $("#currentPrayer").textContent = t().prayers[state.current.key];
    $("#nextPrayer").textContent = t().prayers[state.next.key];

    const secondsLeft = Math.max(
      0,
      Math.floor((state.nextDate.getTime() - Date.now()) / 1000)
    );

    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    $("#countdown").textContent = [
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
      if (!response.ok) throw new Error("Prayer times unavailable");

      const data = await response.json();
      if (!data?.data?.timings) throw new Error("Missing prayer times");

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
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
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
      if (!response.ok) throw new Error("Weather unavailable");

      const data = await response.json();
      if (!data.current) throw new Error("Missing current weather");

      weatherTemperature = Math.round(data.current.temperature_2m);
      $("#weatherIcon").textContent = weatherSymbol(data.current.weather_code);

      renderTemperature();
    } catch (error) {
      console.warn("IBADAT: weather unavailable.", error);
    }
  }

  async function loadCity(latitude, longitude) {
    try {
      const url = new URL("https://nominatim.openstreetmap.org/reverse");
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("lat", latitude);
      url.searchParams.set("lon", longitude);
      url.searchParams.set("accept-language", language);

      const response = await fetch(url.toString(), {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Location name unavailable");

      const data = await response.json();
      const address = data.address || {};

      locationName =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.state_district ||
        address.state ||
        t().city;

      $("#city").textContent = localizeCity(locationName);
    } catch (error) {
      console.warn("IBADAT: location name unavailable.", error);
      locationName = null;
      $("#city").textContent = t().city;
    }
  }

  async function loadAll(latitude, longitude) {
    coordinates = { latitude, longitude };

    await Promise.all([
      loadPrayerTimes(latitude, longitude),
      loadWeather(latitude, longitude),
      loadCity(latitude, longitude)
    ]);
  }

  function loadLocation() {
    if (!navigator.geolocation) {
      loadAll(22.5726, 88.3639);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadAll(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        loadAll(22.5726, 88.3639);
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 600000
      }
    );
  }

  function openSettings() {
    const settings = readSettings();
    const configured = settings.settingsPage || settings.settingsUrl;

    if (typeof configured === "string" && configured.trim()) {
      window.location.href = configured;
      return;
    }

    window.location.href = "html/settings.html";
  }

  function init() {
    hideMissingFeatureIcons();
    applySettings();

    $("#sunriseSettings").addEventListener("click", openSettings);

    updateClockAndDate();
    loadLocation();

    window.setInterval(() => {
      updateClockAndDate();
      updatePrayerStatus();

      if (lastDate && lastDate !== todayKey() && coordinates) {
        loadPrayerTimes(coordinates.latitude, coordinates.longitude);
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
