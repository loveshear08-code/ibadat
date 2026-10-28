
/* ==========================================================
   IBADAT TASBIH — COMPLETE JAVASCRIPT
   Languages: Bengali, English, Hindi
   Cycle: 33 + 33 + 33 + 1 = 100
   ========================================================== */

(() => {
  "use strict";

  const STORAGE_KEY = "ibadatTasbihState";
  const LEGACY_STORAGE_KEY = "tasbihState";
  const CYCLE_TOTAL = 100;

  const $ = (id) => document.getElementById(id);

  const DOM = {
    app: $("tasbihApp"),
    pageTitle: $("pageTitle"),

    zikrBoard: $("zikrBoard"),
    zikrLabel: $("zikrLabel"),
    zikrArabic: $("zikrArabic"),
    zikrName: $("zikrName"),

    stepCountLabel: $("stepCountLabel"),
    totalCountLabel: $("totalCountLabel"),
    stepCount: $("stepCount"),
    totalCount: $("totalCount"),

    progressBar: $("progressBar"),
    progressFill: $("progressFill"),

    todayLabel: $("todayLabel"),
    todayComplete: $("todayComplete"),
    todayTimes: $("todayTimes"),

    tapButton: $("tapButton"),
    footerText: $("footerText"),

    messageSlot: $("messageSlot"),
    completeMessage: $("completeMessage"),
    sparkLayer: $("sparkLayer")
  };

  if (!DOM.app || !DOM.tapButton || !DOM.zikrArabic) {
    console.error("[IBADAT Tasbih] Required HTML elements are missing.");
    return;
  }

/* 1. Zikr steps */

const STEPS = [
  {
    id: "subhanallah",
    target: 33,
    arabic: "سُبْحَانَ اللّٰهِ",
    names: {
      bn: "সুবহানাল্লাহ",
      en: "SubhanAllah",
      hi: "सुब्हानअल्लाह"
    },
    completedMessages: {
      bn: "সুবহানাল্লাহ সম্পন্ন হয়েছে",
      en: "SubhanAllah completed",
      hi: "सुब्हানअल्लाह पूरा हुआ"
    }
  },
  {
    id: "alhamdulillah",
    target: 33,
    arabic: "الْحَمْدُ لِلّٰهِ",
    names: {
      bn: "আলহামদুলিল্লাহ",
      en: "Alhamdulillah",
      hi: "अल्हम्दुलिल्लाह"
    },
    completedMessages: {
      bn: "আলহামদুলিল্লাহ সম্পন্ন হয়েছে",
      en: "Alhamdulillah completed",
      hi: "अल्हम्दुलिल्लाह पूरा हुआ"
    }
  },
  {
    id: "allahuakbar",
    target: 33,
    arabic: "اللّٰهُ أَكْبَرُ",
    names: {
      bn: "আল্লাহু আকবার",
      en: "Allahu Akbar",
      hi: "अल्लाहु अकबर"
    },
    completedMessages: {
      bn: "আল্লাহু আকবার সম্পন্ন হয়েছে",
      en: "Allahu Akbar completed",
      hi: "अल्लाहु अकबर पूरा हुआ"
    }
  },
  {
    id: "dua",
    target: 1,
    arabic: "لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    names: {
      bn: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, লাহুল মুলকু ওয়া লাহুল হামদু, ওয়া হুয়া আলা কুল্লি শাইয়িন কাদীর",
      en: "La ilaha illallahu wahdahu la sharika lahu, lahul mulku wa lahul hamdu wa huwa ala kulli shay'in qadir",
      hi: "ला इलाहा इल्लल्लाहु वह्दहू ला शरीका लहू, लहुल मुल्कु व लहुल हम्दु व हुवा अला कुल्लि शय्इन कदीर"
    },
    completedMessages: {
      bn: "মাশাআল্লাহ! সম্পূর্ণ তসবিহ শেষ হয়েছে",
      en: "MashaAllah! Complete Tasbih finished",
      hi: "माशाअल्लाह! पूरा तस्बीह चक्र समाप्त हुआ"
    }
  }
];

  /* 2. Translations */

  const TEXT = {
    bn: {
      title: "তসবিহ",
      zikrHeading: "জিকির",
      stepLabel: "বর্তমান ধাপ",
      totalLabel: "মোট গণনা",
      todayLabel: "আজ সম্পন্ন:",
      times: "বার",
      subtitle: "আল্লাহর জিকিরে প্রশান্ত হোক হৃদয়",
      tapLabel: "তসবিহ গণনা করুন",
      completeCycle: "মাশাআল্লাহ! একটি পূর্ণ তসবিহ সম্পন্ন হয়েছে।",
      stepProgress: (n, total) => `${digits(n, "bn")} / ${digits(total, "bn")}`,
      totalProgress: (n, total) => `${digits(n, "bn")} / ${digits(total, "bn")}`
    },

    en: {
      title: "Tasbih",
      zikrHeading: "Dhikr",
      stepLabel: "Current step",
      totalLabel: "Total count",
      todayLabel: "Completed today:",
      times: "times",
      subtitle: "May the remembrance of Allah bring peace to your heart",
      tapLabel: "Count Tasbih",
      completeCycle: "MashaAllah! One complete Tasbih cycle finished.",
      stepProgress: (n, total) => `${digits(n, "en")} / ${digits(total, "en")}`,
      totalProgress: (n, total) => `${digits(n, "en")} / ${digits(total, "en")}`
    },

    hi: {
      title: "तस्बीह",
      zikrHeading: "ज़िक्र",
      stepLabel: "वर्तमान चरण",
      totalLabel: "कुल गिनती",
      todayLabel: "आज पूरे हुए:",
      times: "बार",
      subtitle: "अल्लाह के ज़िक्र से दिल को सुकून मिले",
      tapLabel: "तस्बीह गिनें",
      completeCycle: "माशाअल्लाह! पूरा तस्बीह चक्र समाप्त हुआ।",
      stepProgress: (n, total) => `${digits(n, "hi")} / ${digits(total, "hi")}`,
      totalProgress: (n, total) => `${digits(n, "hi")} / ${digits(total, "hi")}`
    }
  };

  /* 3. Utilities */

  function digits(value, lang) {
    const maps = {
      bn: "০১২৩৪৫৬৭৮৯",
      hi: "०१२३४५६७८९",
      en: "0123456789"
    };

    const map = maps[lang] || maps.en;

    return String(value).replace(/\d/g, (digit) => map[Number(digit)]);
  }

  function todayKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function readJSON(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn("[IBADAT Tasbih] Could not read storage.", error);
      return null;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("[IBADAT Tasbih] Could not save storage.", error);
      return false;
    }
  }

  function clamp(value, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) return min;
    return Math.min(max, Math.max(min, Math.floor(number)));
  }

  function firstValue(object, keys) {
    if (!object || typeof object !== "object") return undefined;

    for (const key of keys) {
      if (object[key] !== undefined && object[key] !== null) {
        return object[key];
      }
    }

    return undefined;
  }

  function toBoolean(value, fallback) {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;

    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();

      if (["true", "1", "yes", "on", "enabled"].includes(normalized)) return true;
      if (["false", "0", "no", "off", "disabled"].includes(normalized)) return false;
    }

    return fallback;
  }

  /* 4. Shared settings
     Settings page uses appSettings.lang, appSettings.dark,
     and appSettings.themeColor. Legacy aliases are also supported. */

  function getSettings() {
    const saved = readJSON("appSettings");

    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      return saved;
    }

    for (const key of ["ibadatSettings", "settings"]) {
      const alternate = readJSON(key);

      if (alternate && typeof alternate === "object" && !Array.isArray(alternate)) {
        return alternate;
      }
    }

    return {};
  }

  function normalizeLanguage(value) {
    const normalized = String(value || "bn").trim().toLowerCase();

    if (normalized === "en" || normalized.startsWith("en-") || normalized === "english") {
      return "en";
    }

    if (normalized === "hi" || normalized.startsWith("hi-") || normalized === "hindi") {
      return "hi";
    }

    return "bn";
  }

  function normalizeTheme(value) {
    const normalized = String(value || "classic").trim().toLowerCase();

    if (["classic", "royal", "rose", "pista"].includes(normalized)) {
      return normalized;
    }

    if (normalized.includes("purple") || normalized.includes("blue")) return "royal";
    if (normalized.includes("pink")) return "rose";
    if (normalized.includes("green")) return "pista";

    return "classic";
  }

  function readPreferences() {
    const settings = getSettings();

    const mode = firstValue(settings, [
      "mode", "themeMode", "appearance", "colorMode"
    ]);

    const darkValue = firstValue(settings, [
      "dark", "darkMode", "isDarkMode", "isDark"
    ]);

    return {
      theme: normalizeTheme(firstValue(settings, [
        "themeColor", "theme", "colorTheme", "selectedTheme", "appTheme"
      ])),
      language: normalizeLanguage(firstValue(settings, [
        "lang", "language", "appLanguage", "selectedLanguage"
      ])),
      darkMode: toBoolean(
        darkValue,
        typeof mode === "string" && mode.toLowerCase().includes("dark")
      ),
      soundEnabled: toBoolean(firstValue(settings, [
        "soundEnabled", "sound", "enableSound", "tasbihSound"
      ]), true),
      vibrationEnabled: toBoolean(firstValue(settings, [
        "vibrationEnabled", "vibration", "enableVibration", "hapticFeedback"
      ]), true)
    };
  }

  let preferences = readPreferences();
  let language = preferences.language;
  let words = TEXT[language];

  function applyTheme() {
    const root = document.documentElement;
    const body = document.body;
    const theme = preferences.theme;
    const mode = preferences.darkMode ? "dark" : "light";

    root.dataset.theme = theme;
    body.dataset.theme = theme;

    root.dataset.colorTheme = theme;
    body.dataset.colorTheme = theme;

    root.dataset.themeColor = theme;
    body.dataset.themeColor = theme;

    root.dataset.mode = mode;
    body.dataset.mode = mode;

    root.dataset.themeMode = mode;
    body.dataset.themeMode = mode;

    root.dataset.darkMode = String(preferences.darkMode);
    body.dataset.darkMode = String(preferences.darkMode);

    for (const element of [root, body]) {
      element.classList.remove(
        "theme-classic", "theme-royal", "theme-rose", "theme-pista"
      );

      element.classList.add(`theme-${theme}`);
      element.classList.toggle("dark-mode", preferences.darkMode);
      element.classList.toggle("dark", preferences.darkMode);
    }

    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      const colors = {
        classic: "#0F5132",
        royal: "#173A60",
        rose: "#7D414B",
        pista: "#2F7135"
      };

      meta.content = preferences.darkMode ? "#101b16" : colors[theme];
    }
  }

  /* 5. State */

  function deriveStep(total) {
    let remaining = clamp(total, 0, CYCLE_TOTAL);

    for (let index = 0; index < STEPS.length; index += 1) {
      if (remaining < STEPS[index].target) {
        return {
          stepIndex: index,
          stepCount: remaining
        };
      }

      remaining -= STEPS[index].target;
    }

    return { stepIndex: 0, stepCount: 0 };
  }

  function initialState() {
    return {
      totalCount: 0,
      stepIndex: 0,
      stepCount: 0,
      dailyCompletions: 0,
      dailyDate: todayKey(),
      soundEnabled: preferences.soundEnabled,
      vibrationEnabled: preferences.vibrationEnabled
    };
  }

  function loadState() {
    const saved = readJSON(STORAGE_KEY) || readJSON(LEGACY_STORAGE_KEY);

    if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
      return initialState();
    }

    const state = {
      ...initialState(),
      ...saved
    };

    state.totalCount = clamp(state.totalCount, 0, 99);
    state.dailyCompletions = clamp(state.dailyCompletions, 0, 1_000_000_000);

    const derived = deriveStep(state.totalCount);
    state.stepIndex = derived.stepIndex;
    state.stepCount = derived.stepCount;

    if (typeof state.dailyDate !== "string") {
      state.dailyDate = todayKey();
    }

    state.soundEnabled = preferences.soundEnabled;
    state.vibrationEnabled = preferences.vibrationEnabled;

    return state;
  }

  let state = loadState();

  function saveState() {
    return writeJSON(STORAGE_KEY, {
      version: 4,
      totalCount: state.totalCount,
      stepIndex: state.stepIndex,
      stepCount: state.stepCount,
      dailyCompletions: state.dailyCompletions,
      dailyDate: state.dailyDate,
      soundEnabled: state.soundEnabled,
      vibrationEnabled: state.vibrationEnabled
    });
  }

  /* 6. Daily reset */

  function checkDailyReset() {
    const today = todayKey();

    if (state.dailyDate === today) return false;

    state.dailyDate = today;
    state.dailyCompletions = 0;

    saveState();
    render();

    return true;
  }

  /* 7. Sound
     Ordinary counts all use the same tone, including 30, 33, 66 and 99.
     Full-cycle completion keeps its existing distinct completion tone. */

  let audioContext = null;

  function playTone(frequency = 620, duration = 42, volume = 0.025) {
    if (!state.soundEnabled) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioContext) audioContext = new AudioContextClass();

      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration / 1000
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn("[IBADAT Tasbih] Sound unavailable.", error);
    }
  }

  /* 8. Vibration */

function vibrateAtMilestone(count) {
  if (!state.vibrationEnabled) return false;
  if (typeof navigator.vibrate !== "function") return false;

  const patterns = {
    33: [100],
    66: [100],
    99: [100],
    100: [70, 45, 100]
  };

  const pattern = patterns[count];
  if (!pattern) return false;

  try {
    return navigator.vibrate(pattern);
  } catch (error) {
    console.warn("[IBADAT Tasbih] Vibration failed.", error);
    return false;
  }
}  

  /* 9. Completion message and full-board sparkles */

  let sparkleTimer = null;
  let messageTimer = null;

  function clearSparkles() {
    if (sparkleTimer !== null) {
      window.clearTimeout(sparkleTimer);
      sparkleTimer = null;
    }

    if (DOM.sparkLayer) DOM.sparkLayer.replaceChildren();
    if (DOM.zikrBoard) DOM.zikrBoard.classList.remove("spark-active");
  }

  function showSparkles() {
    if (!DOM.sparkLayer || !DOM.zikrBoard) return;

    clearSparkles();
    DOM.zikrBoard.classList.add("spark-active");

    const symbols = ["✦", "✧", "✶", "✷", "✦", "✧"];
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < 42; index += 1) {
      const star = document.createElement("span");

      star.className = "spark";
      star.textContent = symbols[index % symbols.length];

      star.style.left = `${Math.random() * 96 + 2}%`;
      star.style.top = `${Math.random() * 92 + 4}%`;
      star.style.fontSize = `${9 + Math.random() * 13}px`;
      star.style.animationDelay = `${Math.random() * 250}ms`;
      star.style.animationDuration = `${850 + Math.random() * 450}ms`;

      fragment.appendChild(star);
    }

    DOM.sparkLayer.appendChild(fragment);

    sparkleTimer = window.setTimeout(() => {
      DOM.sparkLayer.replaceChildren();
      DOM.zikrBoard.classList.remove("spark-active");
      sparkleTimer = null;
    }, 1700);
  }

  function showMessage(message, duration = 2400) {
    if (!DOM.completeMessage) return;

    if (messageTimer !== null) {
      window.clearTimeout(messageTimer);
    }

    DOM.completeMessage.textContent = message;
    DOM.completeMessage.hidden = false;

    messageTimer = window.setTimeout(() => {
      DOM.completeMessage.hidden = true;
      DOM.completeMessage.textContent = "";
      messageTimer = null;
    }, duration);
  }

  function showStepCompletion(step) {
    showMessage(
      step.completedMessages[language] || step.completedMessages.en,
      2500
    );

    showSparkles();
  }

  /* 10. Render */

  function render() {
    const step = STEPS[state.stepIndex];
    if (!step) return;

    if (DOM.pageTitle) DOM.pageTitle.textContent = words.title;
    if (DOM.zikrLabel) DOM.zikrLabel.textContent = words.zikrHeading;

    DOM.zikrArabic.textContent = step.arabic;
    DOM.zikrName.textContent = step.names[language];

    if (DOM.stepCountLabel) DOM.stepCountLabel.textContent = words.stepLabel;
    if (DOM.totalCountLabel) DOM.totalCountLabel.textContent = words.totalLabel;

    if (DOM.stepCount) {
      DOM.stepCount.textContent = words.stepProgress(state.stepCount, step.target);
    }

    if (DOM.totalCount) {
      DOM.totalCount.textContent = words.totalProgress(state.totalCount, CYCLE_TOTAL);
    }

    const percent = Math.round((state.totalCount / CYCLE_TOTAL) * 100);

    if (DOM.progressFill) {
      DOM.progressFill.style.width = `${percent}%`;
    }

    if (DOM.progressBar) {
      DOM.progressBar.setAttribute("aria-valuenow", String(percent));
      DOM.progressBar.setAttribute("aria-valuetext", `${percent}%`);
    }

    if (DOM.todayLabel) DOM.todayLabel.textContent = words.todayLabel;

    if (DOM.todayComplete) {
      DOM.todayComplete.textContent = digits(state.dailyCompletions, language);
    }

    if (DOM.todayTimes) DOM.todayTimes.textContent = words.times;

    DOM.tapButton.setAttribute("aria-label", words.tapLabel);

    if (DOM.footerText) DOM.footerText.textContent = words.subtitle;

    DOM.app.dataset.language = language;
  }

  /* 11. Count taps */

  function countTap() {
    checkDailyReset();

    const newTotal = state.totalCount + 1;

    /* Call vibration at the actual milestone count. */
    vibrateAtMilestone(newTotal);

    if (newTotal === CYCLE_TOTAL) {
      state.dailyCompletions += 1;

      playTone(880, 160, 0.055);

      showMessage(words.completeCycle, 3600);
      showSparkles();

      state.totalCount = 0;

      const derived = deriveStep(0);
      state.stepIndex = derived.stepIndex;
      state.stepCount = derived.stepCount;

      saveState();
      render();
      return;
    }

    state.totalCount = newTotal;

    const derived = deriveStep(newTotal);
    state.stepIndex = derived.stepIndex;
    state.stepCount = derived.stepCount;

    /* Cumulative ends: 33, 66, 99. */
    const completedEnds = [33, 66, 99];

    if (completedEnds.includes(newTotal)) {
      const completedIndex = completedEnds.indexOf(newTotal);
      showStepCompletion(STEPS[completedIndex]);
    }

    /* Every ordinary count has the same sound rhythm. */
    playTone(620, 42, 0.025);

    saveState();
    render();
  }

  /* 12. Refresh settings */

  function refreshSettings() {
    preferences = readPreferences();

    language = preferences.language;
    words = TEXT[language];

    state.soundEnabled = preferences.soundEnabled;
    state.vibrationEnabled = preferences.vibrationEnabled;

    applyTheme();
    render();
    saveState();
  }

  /* 13. Events */

  DOM.tapButton.addEventListener("click", countTap);

  window.addEventListener("storage", (event) => {
    if (
      event.key === null ||
      [
        "appSettings",
        "ibadatSettings",
        "settings"
      ].includes(event.key)
    ) {
      refreshSettings();
    }

    if (event.key === STORAGE_KEY || event.key === LEGACY_STORAGE_KEY) {
      state = loadState();
      checkDailyReset();
      render();
    }
  });

  [
    "ibadatSettingsChanged",
    "appSettingsChanged",
    "settingsChanged",
    "languageChanged",
    "themeChanged",
    "globalThemeChanged"
  ].forEach((eventName) => {
    window.addEventListener(eventName, refreshSettings);
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      checkDailyReset();
      refreshSettings();
    }
  });

  window.addEventListener("focus", () => {
    checkDailyReset();
    refreshSettings();
  });

  /* Keyboard accessibility */

  document.addEventListener("keydown", (event) => {
    if (event.repeat || event.defaultPrevented) return;

    if (
      event.target instanceof HTMLElement &&
      (
        event.target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)
      )
    ) {
      return;
    }

    if (event.code === "Space" && event.target === document.body) {
      event.preventDefault();
      countTap();
    }
  });

  /* 14. Initialize */

  applyTheme();
  checkDailyReset();
  render();
  saveState();

  window.setInterval(checkDailyReset, 60_000);

  /* 15. Public interface */

  window.IBADATTasbih = Object.freeze({
    getState() {
      return {
        totalCount: state.totalCount,
        stepIndex: state.stepIndex,
        stepCount: state.stepCount,
        dailyCompletions: state.dailyCompletions,
        dailyDate: state.dailyDate,
        soundEnabled: state.soundEnabled,
        vibrationEnabled: state.vibrationEnabled
      };
    },

    refreshSettings,

    setFeedback(options = {}) {
      if (typeof options.soundEnabled === "boolean") {
        state.soundEnabled = options.soundEnabled;
      }

      if (typeof options.vibrationEnabled === "boolean") {
        state.vibrationEnabled = options.vibrationEnabled;
      }

      saveState();
    },

    resetCurrentCycle() {
      state.totalCount = 0;

      const derived = deriveStep(0);
      state.stepIndex = derived.stepIndex;
      state.stepCount = derived.stepCount;

      if (DOM.completeMessage) {
        DOM.completeMessage.hidden = true;
        DOM.completeMessage.textContent = "";
      }

      clearSparkles();
      saveState();
      render();
    }
  });
})();
