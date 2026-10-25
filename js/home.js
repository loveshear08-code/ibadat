
"use strict";

(() => {
  const $ = (selector) => document.querySelector(selector);

  const prayerIds = {
    Fajr: "fajrTime",
    Sunrise: "sunriseTime",
    Dhuhr: "dhuhrTime",
    Asr: "asrTime",
    Maghrib: "maghribTime",
    Isha: "ishaTime"
  };

  const translations = {
    bn: {
      location: "লোকেশন খোঁজা হচ্ছে...",
      locationError: "লোকেশন পাওয়া যায়নি",
      dateLoading: "তারিখ খোঁজা হচ্ছে...",
      statusHeading: "আজকের ইবাদত",
      today: "আজ",
      currentPrayer: "বর্তমান ওয়াক্ত",
      nextPrayer: "পরবর্তী ওয়াক্ত",
      prayerTimes: "আজকের নামাজের সময়",
      bismillah: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।",
      footer: "আল্লাহকে স্মরণ করো, অন্তরে প্রশান্তি লাভ করো।",
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
        quran: "আল-কুরআন",
        dua: "দোয়া",
        hadith: "হাদিস",
        qibla: "কিবলা",
        tasbih: "তাসবিহ"
      }
    },

    en: {
      location: "Finding location...",
      locationError: "Location unavailable",
      dateLoading: "Loading date...",
      statusHeading: "Daily Worship",
      today: "Today",
      currentPrayer: "Current Prayer",
      nextPrayer: "Next Prayer",
      prayerTimes: "Today's Prayer Times",
      bismillah: "In the name of Allah, the Most Compassionate, the Most Merciful.",
      footer: "Remember Allah; find peace in your heart.",
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
        quran: "Al-Quran",
        dua: "Dua",
        hadith: "Hadith",
        qibla: "Qibla",
        tasbih: "Tasbih"
      }
    },

    hi: {
      location: "स्थान खोजा जा रहा है...",
      locationError: "स्थान उपलब्ध नहीं",
      dateLoading: "तारीख लोड हो रही है...",
      statusHeading: "आज की इबादत",
      today: "आज",
      currentPrayer: "वर्तमान नमाज़",
      nextPrayer: "अगली नमाज़",
      prayerTimes: "आज की नमाज़ के समय",
      bismillah: "परम कृपालु, अत्यंत दयावान अल्लाह के नाम से।",
      footer: "अल्लाह को याद करें और दिल में सुकून पाएं।",
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
        quran: "अल-क़ुरआन",
        dua: "दुआ",
        hadith: "हदीस",
        qibla: "क़िबला",
        tasbih: "तस्बीह"
      }
    }
  };

  let currentLanguage = "bn";
  let prayerSchedule = null;
  let prayerDateKey = "";
  let lastSettingsKey = "";

  function readSettings() {
    try {
      const raw = localStorage.getItem("appSettings");
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.warn("Could not read appSettings:", error);
      return {};
    }
  }

  function getLanguage(settings) {
    const lang = settings.lang || settings.language || "bn";
    return ["bn", "en", "hi"].includes(lang) ? lang : "bn";
  }

  function getThemeName(settings) {
    const theme = settings.themeColor || settings.theme || "classic";

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

    return aliases[theme] || "classic";
  }

  function applySettings() {
    const settings = readSettings();

    currentLanguage = getLanguage(settings);

    document.documentElement.lang = currentLanguage;
    document.body.dataset.themeColor = getThemeName(settings);

    const darkMode = Boolean(
      settings.dark ??
      settings.darkMode ??
      settings.isDarkMode ??
      false
    );

    document.body.classList.toggle("dark-mode", darkMode);

    const settingsKey = JSON.stringify({
      lang: currentLanguage,
      theme: getThemeName(settings),
      dark: darkMode
    });

    if (settingsKey !== lastSettingsKey) {
      lastSettingsKey = settingsKey;
      updateLanguage();
    }
  }

  function T() {
    return translations[currentLanguage] || translations.bn;
  }

  function updateLanguage() {
    const text = T();

    $("#city").textContent = text.location;
    $("#date").textContent = text.dateLoading;
    $("#statusHeading").textContent = text.statusHeading;
    $("#dayLabel").textContent = text.today;
    $("#currentPrayerLabel").textContent = text.currentPrayer;
    $("#nextPrayerLabel").textContent = text.nextPrayer;
    $("#prayerTimesTitle").textContent = text.prayerTimes;
    $("#bismillahMeaning").textContent = text.bismillah;
    $("#footerMessage").textContent = text.footer;

    document.querySelectorAll("[data-prayer-label]").forEach((element) => {
      const key = element.dataset.prayerLabel;
      const englishKeys = {
        fajr: "Fajr",
        sunrise: "Sunrise",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha"
      };

      element.textContent = text.prayers[englishKeys[key]] || key;
    });

    document.querySelectorAll("[data-feature-label]").forEach((element) => {
      const key = element.dataset.featureLabel;
      element.textContent = text.features[key] || key;
    });

    updateClockAndDate();
    updatePrayerStatus();
  }

  function updateClockAndDate() {
    const now = new Date();

    $("#clock").textContent = new Intl.DateTimeFormat(
      currentLanguage === "bn" ? "bn-BD" :
      currentLanguage === "hi" ? "hi-IN" : "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }
    ).format(now);

    $("#date").textContent = new Intl.DateTimeFormat(
      currentLanguage === "bn" ? "bn-BD" :
      currentLanguage === "hi" ? "hi-IN" : "en-IN",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    ).format(now);

    $("#dayName").textContent = T().days[now.getDay()];
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

    const date = new Date();
    date.setHours(Number(match[1]), Number(match[2]), 0, 0);

    return new Intl.DateTimeFormat(
      currentLanguage === "bn" ? "bn-BD" :
      currentLanguage === "hi" ? "hi-IN" : "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }
    ).format(date);
  }

  function updatePrayerStatus() {
    if (!prayerSchedule) return;

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const prayerOrder = [
      "Fajr",
      "Dhuhr",
      "Asr",
      "Maghrib",
      "Isha"
    ];

    const prayerValues = prayerOrder
      .map((key) => ({
        key,
        minutes: parseTime(prayerSchedule[key])
      }))
      .filter((item) => item.minutes !== null);

    if (!prayerValues.length) return;

    let current = null;
    let next = null;

    for (let i = 0; i < prayerValues.length; i++) {
      if (nowMinutes >= prayerValues[i].minutes) {
        current = prayerValues[i];
      }

      if (nowMinutes < prayerValues[i].minutes) {
        next = prayerValues[i];
        break;
      }
    }

    if (!current) {
      current = prayerValues[prayerValues.length - 1];
    }

    if (!next) {
      next = prayerValues[0];
    }

    $("#currentPrayer").textContent = T().prayers[current.key];
    $("#nextPrayer").textContent = T().prayers[next.key];
    $("#nextPrayerTime").textContent = formatPrayerTime(
      prayerSchedule[next.key]
    );
  }

  function getLocalDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  async function loadPrayerTimes(latitude, longitude) {
    const dateKey = getLocalDateKey();

    if (prayerDateKey === dateKey && prayerSchedule) {
      return;
    }

    try {
      const timestamp = Math.floor(Date.now() / 1000);

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=1`
      );

      if (!response.ok) {
        throw new Error("Prayer time service unavailable");
      }

      const result = await response.json();
      const timings = result?.data?.timings;

      if (!timings) {
        throw new Error("Prayer times not found");
      }

      prayerSchedule = timings;
      prayerDateKey = dateKey;

      Object.entries(prayerIds).forEach(([prayer, elementId]) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.textContent = formatPrayerTime(timings[prayer]);
        }
      });

      updatePrayerStatus();
    } catch (error) {
      console.warn("Unable to load prayer times:", error);
    }
  }

  async function loadLocation() {
    const fallbackLatitude = 22.5726;
    const fallbackLongitude = 88.3639;

    if (!navigator.geolocation) {
      $("#city").textContent = T().locationError;
      await loadPrayerTimes(fallbackLatitude, fallbackLongitude);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        await loadPrayerTimes(latitude, longitude);
        await loadCityName(latitude, longitude);
      },
      async () => {
        $("#city").textContent = T().locationError;
        await loadPrayerTimes(fallbackLatitude, fallbackLongitude);
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 600000
      }
    );
  }

  async function loadCityName(latitude, longitude) {
    try {
      const url = new URL("https://nominatim.openstreetmap.org/reverse");
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("lat", latitude);
      url.searchParams.set("lon", longitude);

      const response = await fetch(url.toString(), {
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) throw new Error("Location lookup failed");

      const data = await response.json();
      const address = data.address || {};

      const city =
        address.city ||
        address.town ||
        address.village ||
        address.county ||
        address.state ||
        T().locationError;

      $("#city").textContent = city;
    } catch (error) {
      console.warn("Unable to determine city:", error);
      $("#city").textContent = T().locationError;
    }
  }

  function startClock() {
    updateClockAndDate();

    window.setInterval(() => {
      updateClockAndDate();
      updatePrayerStatus();

      const dateKey = getLocalDateKey();

      if (prayerDateKey && dateKey !== prayerDateKey) {
        prayerDateKey = "";
        loadLocation();
      }
    }, 1000);
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js")
        .catch((error) => {
          console.warn("Service worker registration failed:", error);
        });
    });
  }

  function init() {
    applySettings();
    startClock();
    loadLocation();
    registerServiceWorker();

    window.addEventListener("storage", (event) => {
      if (!event.key || event.key === "appSettings") {
        applySettings();
      }
    });

    window.addEventListener("pageshow", () => {
      applySettings();
      updateClockAndDate();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
