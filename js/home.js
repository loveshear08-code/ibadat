
"use strict";

(() => {
  const $ = (selector) => document.querySelector(selector);

  const LANGUAGES = {
    bn: {
      locale: "bn-BD",
      cityFallback: "কলকাতা",
      dateFallback: "তারিখ পাওয়া যায়নি",
      bismillah: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
      footer: "আল্লাহর স্মরণেই অন্তর প্রশান্ত হয়।",
      days: ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"],
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
      cityFallback: "Kolkata",
      dateFallback: "Date unavailable",
      bismillah: "In the name of Allah, the Most Compassionate, the Most Merciful",
      footer: "In the remembrance of Allah, hearts find peace.",
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
      locale: "hi-IN",
      cityFallback: "कोलकाता",
      dateFallback: "तारीख उपलब्ध नहीं",
      bismillah: "परम कृपालु, अत्यंत दयावान अल्लाह के नाम से",
      footer: "अल्लाह के स्मरण से दिल को सुकून मिलता है।",
      days: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
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

  let language = "bn";
  let settingsSnapshot = "";
  let prayerTimes = null;
  let coordinates = null;
  let weatherLoaded = false;
  let lastPrayerDate = "";

  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem("appSettings") || "{}");
    } catch {
      return {};
    }
  }

  function getLanguage(settings) {
    const value = settings.lang || settings.language || "bn";
    return LANGUAGES[value] ? value : "bn";
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
    document.body.classList.toggle("dark-mode", dark);
    document.body.dataset.themeColor = getTheme(settings);

    const snapshot = JSON.stringify({
      language,
      dark,
      theme: getTheme(settings)
    });

    if (snapshot !== settingsSnapshot) {
      settingsSnapshot = snapshot;
      updateLanguage();
    }
  }

  function text() {
    return LANGUAGES[language] || LANGUAGES.bn;
  }

  function updateLanguage() {
    const t = text();

    $("#bismillahMeaning").textContent = t.bismillah;
    $("#footerMessage").textContent = t.footer;

    document.querySelectorAll("[data-prayer-label]").forEach((element) => {
      const key = element.dataset.prayerLabel;
      element.textContent = t.prayers[key] || key;
    });

    document.querySelectorAll("[data-feature-label]").forEach((element) => {
      const key = element.dataset.featureLabel;
      element.textContent = t.features[key] || key;
    });

    updateDateAndClock();

    if (prayerTimes) {
      renderPrayerTimes();
      updatePrayerStatus();
    }
  }

  function numberLocale() {
    return text().locale;
  }

  function formatClock(date, seconds = true) {
    return new Intl.DateTimeFormat(numberLocale(), {
      hour: "2-digit",
      minute: "2-digit",
      ...(seconds ? { second: "2-digit" } : {}),
      hour12: false
    }).format(date);
  }

  function updateDateAndClock() {
    const now = new Date();

    $("#clock").textContent = formatClock(now, true);

    $("#date").textContent = new Intl.DateTimeFormat(numberLocale(), {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(now);

    $("#dayName").textContent = text().days[now.getDay()];
  }

  function dateKey() {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");
  }

  function parsePrayerTime(value) {
    if (!value) return null;

    const match = String(value).match(/(\d{1,2}):(\d{2})/);
    if (!match) return null;

    const hour = Number(match[1]);
    const minute = Number(match[2]);

    if (hour > 23 || minute > 59) return null;

    return hour * 60 + minute;
  }

  function displayPrayerTime(value) {
    if (!value) return "--:--";

    const match = String(value).match(/(\d{1,2}):(\d{2})/);
    if (!match) return "--:--";

    const date = new Date();
    date.setHours(Number(match[1]), Number(match[2]), 0, 0);

    return new Intl.DateTimeFormat(numberLocale(), {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(date);
  }

  function renderPrayerTimes() {
    if (!prayerTimes) return;

    Object.entries(PRAYER_IDS).forEach(([key, id]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = displayPrayerTime(prayerTimes[key]);
      }
    });
  }

  function getPrayerState() {
    if (!prayerTimes) return null;

    const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const entries = order
      .map((key) => ({
        key,
        minutes: parsePrayerTime(prayerTimes[key])
      }))
      .filter((item) => item.minutes !== null);

    if (!entries.length) return null;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let current = null;
    let next = null;

    for (const entry of entries) {
      if (entry.minutes <= currentMinutes) {
        current = entry;
      } else {
        next = entry;
        break;
      }
    }

    if (!current) current = entries[entries.length - 1];
    if (!next) next = entries[0];

    let nextDate = new Date();
    nextDate.setHours(
      Math.floor(next.minutes / 60),
      next.minutes % 60,
      0,
      0
    );

    if (next.minutes <= currentMinutes) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    return { current, next, nextDate };
  }

  function updatePrayerStatus() {
    const state = getPrayerState();
    if (!state) return;

    $("#currentPrayer").textContent = text().prayers[state.current.key];
    $("#nextPrayer").textContent = text().prayers[state.next.key];

    const remaining = Math.max(0, state.nextDate.getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatter = new Intl.NumberFormat(numberLocale(), {
      minimumIntegerDigits: 2,
      useGrouping: false
    });

    $("#countdown").textContent = [
      formatter.format(hours),
      formatter.format(minutes),
      formatter.format(seconds)
    ].join(":");
  }

  async function loadPrayerTimes(latitude, longitude) {
    try {
      const today = dateKey();
      const unixTime = Math.floor(Date.now() / 1000);

      const url = new URL(`https://api.aladhan.com/v1/timings/${unixTime}`);
      url.searchParams.set("latitude", latitude);
      url.searchParams.set("longitude", longitude);
      url.searchParams.set("method", "1");

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("Prayer times unavailable");

      const result = await response.json();
      const timings = result?.data?.timings;

      if (!timings) throw new Error("Prayer timings missing");

      prayerTimes = timings;
      lastPrayerDate = today;

      renderPrayerTimes();
      updatePrayerStatus();
    } catch (error) {
      console.warn("IBADAT: prayer times could not be loaded.", error);
    }
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

      const result = await response.json();
      const current = result.current;

      if (!current) throw new Error("Current weather missing");

      const temp = Math.round(current.temperature_2m);

      $("#temperature").textContent = new Intl.NumberFormat(numberLocale(), {
        maximumFractionDigits: 0
      }).format(temp);

      $("#weatherIcon").textContent = weatherIcon(current.weather_code);
      weatherLoaded = true;
    } catch (error) {
      console.warn("IBADAT: weather could not be loaded.", error);
    }
  }

  function weatherIcon(code) {
    if (code === 0) return "☀️";
    if ([1, 2].includes(code)) return "🌤️";
    if (code === 3) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
    if ([71, 73, 75, 85, 86].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌤️";
  }

  async function loadCity(latitude, longitude) {
    try {
      const url = new URL("https://nominatim.openstreetmap.org/reverse");
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("lat", latitude);
      url.searchParams.set("lon", longitude);

      const response = await fetch(url.toString(), {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Location name unavailable");

      const data = await response.json();
      const address = data.address || {};

      const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.state_district ||
        address.state ||
        text().cityFallback;

      $("#city").textContent = city;
    } catch (error) {
      console.warn("IBADAT: city name could not be loaded.", error);
      $("#city").textContent = text().cityFallback;
    }
  }

  async function useCoordinates(latitude, longitude) {
    coordinates = { latitude, longitude };

    await Promise.all([
      loadPrayerTimes(latitude, longitude),
      loadWeather(latitude, longitude),
      loadCity(latitude, longitude)
    ]);
  }

  function loadLocation() {
    if (!navigator.geolocation) {
      useDefaultLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        useCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => useDefaultLocation(),
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 600000
      }
    );
  }

  function useDefaultLocation() {
    /*
      Kolkata fallback is used only when location access is unavailable.
      The user can allow location access to get local prayer times.
    */
    $("#city").textContent = text().cityFallback;

    useCoordinates(22.5726, 88.3639);
  }

  function openSettings() {
    const candidates = [
      "html/settings.html",
      "settings.html"
    ];

    const settings = readSettings();
    const configuredPath = settings.settingsPage || settings.settingsUrl;

    if (configuredPath && typeof configuredPath === "string") {
      window.location.href = configuredPath;
      return;
    }

    /*
      Change this path if the existing Settings page uses a different
      filename in the project.
    */
    window.location.href = candidates[0];
  }

  function init() {
    applySettings();

    $("#sunriseSettings").addEventListener("click", openSettings);

    loadLocation();
    updateDateAndClock();

    window.setInterval(() => {
      updateDateAndClock();
      updatePrayerStatus();

      if (lastPrayerDate && lastPrayerDate !== dateKey() && coordinates) {
        lastPrayerDate = "";
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
      updateDateAndClock();
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        applySettings();
        updateDateAndClock();
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
