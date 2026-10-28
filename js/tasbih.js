/* ==========================================================
   IBADAT TASBIH — COMPLETE JAVASCRIPT
   Languages: Bengali, English, Hindi
   Zikr cycle: 33 + 33 + 33 + 1 = 100

   Features:
   - Persistent count and daily completion
   - Vibration at 30, 33, 66, 99 and 100
   - Sound feedback
   - Completion messages above Arabic zikr
   - Full zikr-board sparkle animation
   - Theme, dark mode and language synchronization
   - Automatic daily counter reset
   - Progress bar
   ========================================================== */

(() => {
  "use strict";

  /* ==================== 1. CONFIGURATION ==================== */

  const STORAGE_KEY = "ibadatTasbihState";

  const SETTINGS_KEYS = [
    "ibadatSettings",
    "appSettings",
    "settings"
  ];

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
    console.error(
      "[IBADAT Tasbih] Required HTML elements are missing."
    );
    return;
  }

  /* ==================== 2. ZIKR STEPS ==================== */

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
        hi: "सुब्हानअल्लाह पूरा हुआ"
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
      arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ",
      names: {
        bn: "লা ইলাহা ইল্লাল্লাহ",
        en: "La ilaha illallah",
        hi: "ला इलाहा इल्लल्लाह"
      },
      completedMessages: {
        bn: "মাশাআল্লাহ! সম্পূর্ণ তসবিহ শেষ হয়েছে",
        en: "MashaAllah! Complete Tasbih finished",
        hi: "माशाअल्लाह! पूरा तस्बीह चक्र समाप्त हुआ"
      }
    }
  ];

  /* ==================== 3. TRANSLATIONS ==================== */

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
      milestone: "আলহামদুলিল্লাহ!",
      stepProgress: (n, total) =>
        `${digits(n, "bn")} / ${digits(total, "bn")}`,
      totalProgress: (n, total) =>
        `${digits(n, "bn")} / ${digits(total, "bn")}`
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
      milestone: "Alhamdulillah!",
      stepProgress: (n, total) =>
        `${digits(n, "en")} / ${digits(total, "en")}`,
      totalProgress: (n, total) =>
        `${digits(n, "en")} / ${digits(total, "en")}`
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
      milestone: "अल्हम्दुलिल्लाह!",
      stepProgress: (n, total) =>
        `${digits(n, "hi")} / ${digits(total, "hi")}`,
      totalProgress: (n, total) =>
        `${digits(n, "hi")} / ${digits(total, "hi")}`
    }
  };

  /* ==================== 4. UTILITIES ==================== */

  function readJSON(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn("[IBADAT Tasbih] Storage read failed.", error);
      return null;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("[IBADAT Tasbih] Storage save failed.", error);
      return false;
    }
  }

  function clamp(value, min, max) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return min;
    }

    return Math.min(max, Math.max(min, Math.floor(number)));
  }

  function digits(value, lang) {
    const maps = {
      bn: "০১২৩৪৫৬৭৮৯",
      hi: "०१२३४५६७८९",
      en: "0123456789"
    };

    const map = maps[lang] || maps.en;

    return String(value).replace(
      /\d/g,
      (digit) => map[Number(digit)]
    );
  }

  function todayKey() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function firstValue(object, keys) {
    if (!object || typeof object !== "object") {
      return undefined;
    }

    for (const key of keys) {
      if (
        Object.prototype.hasOwnProperty.call(object, key) &&
        object[key] !== undefined &&
        object[key] !== null
      ) {
        return object[key];
      }
    }

    return undefined;
  }

  function toBoolean(value, fallback) {
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "number") {
      return value !== 0;
    }

    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();

      if (["true", "1", "yes", "on", "enabled"].includes(normalized)) {
        return true;
      }

      if (["false", "0", "no", "off", "disabled"].includes(normalized)) {
        return false;
      }
    }

    return fallback;
  }

  /* ==================== 5. SHARED SETTINGS ==================== */

  function getSettings() {
    for (const key of SETTINGS_KEYS) {
      const settings = readJSON(key);

      if (
        settings &&
        typeof settings === "object" &&
        !Array.isArray(settings)
      ) {
        return settings;
      }
    }

    return {};
  }

  function normalizeLanguage(value) {
    const language = String(value || "bn").toLowerCase();

    if (
      language === "en" ||
      language.startsWith("en-") ||
      language === "english"
    ) {
      return "en";
    }

    if (
      language === "hi" ||
      language.startsWith("hi-") ||
      language === "hindi"
    ) {
      return "hi";
    }

    return "bn";
  }

  function normalizeTheme(value) {
    const theme = String(value || "classic").toLowerCase();

    if (theme.includes("royal") || theme.includes("purple")) {
      return "royal";
    }

    if (theme.includes("rose") || theme.includes("pink")) {
      return "rose";
    }

    if (theme.includes("pista") || theme.includes("green")) {
      return "pista";
    }

    return "classic";
  }

  function readPreferences() {
    const settings = getSettings();

    const theme = firstValue(settings, [
      "theme",
      "colorTheme",
      "selectedTheme",
      "appTheme"
    ]);

    const language = firstValue(settings, [
      "language",
      "lang",
      "appLanguage",
      "selectedLanguage"
    ]);

    const mode = firstValue(settings, [
      "mode",
      "themeMode",
      "appearance",
      "colorMode"
    ]);

    const dark = firstValue(settings, [
      "darkMode",
      "isDarkMode",
      "dark",
      "isDark"
    ]);

    const sound = firstValue(settings, [
      "soundEnabled",
      "sound",
      "enableSound",
      "tasbihSound"
    ]);

    const vibration = firstValue(settings, [
      "vibrationEnabled",
      "vibration",
      "enableVibration",
      "hapticFeedback"
    ]);

    return {
      theme: normalizeTheme(theme),
      language: normalizeLanguage(language),

      darkMode: toBoolean(
        dark,
        typeof mode === "string" &&
          mode.toLowerCase().includes("dark")
      ),

      soundEnabled: toBoolean(sound, true),
      vibrationEnabled: toBoolean(vibration, true)
    };
  }

  let preferences = readPreferences();
  let language = preferences.language;
  let words = TEXT[language];

  function applyTheme() {
    const root = document.documentElement;
    const body = document.body;

    root.dataset.theme = preferences.theme;
    body.dataset.theme = preferences.theme;

    root.dataset.mode = preferences.darkMode ? "dark" : "light";
    body.dataset.mode = preferences.darkMode ? "dark" : "light";

    root.dataset.themeMode = root.dataset.mode;
    body.dataset.themeMode = body.dataset.mode;

    root.dataset.darkMode = String(preferences.darkMode);
    body.dataset.darkMode = String(preferences.darkMode);

    root.classList.remove(
      "theme-classic",
      "theme-royal",
      "theme-rose",
      "theme-pista"
    );

    body.classList.remove(
      "theme-classic",
      "theme-royal",
      "theme-rose",
      "theme-pista"
    );

    root.classList.add(`theme-${preferences.theme}`);
    body.classList.add(`theme-${preferences.theme}`);

    root.classList.toggle("dark-mode", preferences.darkMode);
    body.classList.toggle("dark-mode", preferences.darkMode);

    root.classList.toggle("dark", preferences.darkMode);
    body.classList.toggle("dark", preferences.darkMode);

    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      meta.content = preferences.darkMode
        ? "#101b16"
        : "#123d2c";
    }
  }

  /* ==================== 6. SAVED STATE ==================== */

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

    return {
      stepIndex: 0,
      stepCount: 0
    };
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
    const saved =
      readJSON(STORAGE_KEY) ||
      readJSON("tasbihState");

    if (!saved || typeof saved !== "object") {
      return initialState();
    }

    const state = {
      ...initialState(),
      ...saved
    };

    state.totalCount = clamp(state.totalCount, 0, 99);

    state.dailyCompletions = clamp(
      state.dailyCompletions,
      0,
      1_000_000_000
    );

    const derived = deriveStep(state.totalCount);

    state.stepIndex = derived.stepIndex;
    state.stepCount = derived.stepCount;

    state.dailyDate =
      typeof state.dailyDate === "string"
        ? state.dailyDate
        : todayKey();

    state.soundEnabled = toBoolean(
      state.soundEnabled,
      preferences.soundEnabled
    );

    state.vibrationEnabled = toBoolean(
      state.vibrationEnabled,
      preferences.vibrationEnabled
    );

    return state;
  }

  let state = loadState();

  function saveState() {
    return writeJSON(STORAGE_KEY, {
      version: 3,
      totalCount: state.totalCount,
      stepIndex: state.stepIndex,
      stepCount: state.stepCount,
      dailyCompletions: state.dailyCompletions,
      dailyDate: state.dailyDate,
      soundEnabled: state.soundEnabled,
      vibrationEnabled: state.vibrationEnabled
    });
  }

  /* ==================== 7. DAILY RESET ==================== */

  function checkDailyReset() {
    const today = todayKey();

    if (state.dailyDate === today) {
      return false;
    }

    state.dailyDate = today;
    state.dailyCompletions = 0;

    saveState();
    render();

    return true;
  }

  /* ==================== 8. SOUND ==================== */

  let audioContext = null;

  function playTone(frequency = 620, duration = 50, volume = 0.03) {
    if (!state.soundEnabled) {
      return;
    }

    try {
      const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContextClass) {
        return;
      }

      if (!audioContext) {
        audioContext = new AudioContextClass();
      }

      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration / 1000
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(
        audioContext.currentTime + duration / 1000
      );
    } catch (error) {
      console.warn("[IBADAT Tasbih] Sound unavailable.", error);
    }
  }

  /* ==================== 9. VIBRATION ==================== */

  function vibrateAtMilestone(count) {
    if (!state.vibrationEnabled) {
      return;
    }

    if (typeof navigator.vibrate !== "function") {
      return;
    }

    /*
     * Explicit milestone patterns:
     * 30: short
     * 33: step completed
     * 66: second step completed
     * 99: third step completed
     * 100: complete cycle
     */

    const patterns = {
      30:  [45],
      33:  [35, 35, 55],
      66:  [45, 40, 65],
      99:  [50, 40, 75],
      100: [80, 50, 120]
    };

    const pattern = patterns[count];

    if (!pattern) {
      return;
    }

    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn("[IBADAT Tasbih] Vibration failed.", error);
    }
  }

  /* ==================== 10. BOARD SPARKLES ==================== */

  let sparkleTimer = null;
  let messageTimer = null;

  function clearSparkles() {
    if (sparkleTimer !== null) {
      window.clearTimeout(sparkleTimer);
      sparkleTimer = null;
    }

    if (DOM.sparkLayer) {
      DOM.sparkLayer.replaceChildren();
    }

    if (DOM.zikrBoard) {
      DOM.zikrBoard.classList.remove("spark-active");
    }
  }

  function showSparkles() {
    if (!DOM.sparkLayer || !DOM.zikrBoard) {
      return;
    }

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
      star.style.animationDelay = `${Math.random() * 450}ms`;
      star.style.animationDuration = `${850 + Math.random() * 650}ms`;

      fragment.appendChild(star);
    }

    DOM.sparkLayer.appendChild(fragment);

    sparkleTimer = window.setTimeout(() => {
      DOM.sparkLayer.replaceChildren();
      DOM.zikrBoard.classList.remove("spark-active");
      sparkleTimer = null;
    }, 1900);
  }

  /* ==================== 11. COMPLETION MESSAGE ==================== */

  function showMessage(message, duration = 2400) {
    if (!DOM.completeMessage) {
      return;
    }

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
    const message =
      step.completedMessages[language] ||
      step.completedMessages.en;

    showMessage(message, 2500);
    showSparkles();
  }

  /* ==================== 12. RENDER UI ==================== */

  function render() {
    const step = STEPS[state.stepIndex];

    if (!step) {
      return;
    }

    DOM.pageTitle.textContent = words.title;
    DOM.zikrLabel.textContent = words.zikrHeading;

    DOM.zikrArabic.textContent = step.arabic;
    DOM.zikrName.textContent = step.names[language];

    if (DOM.stepCountLabel) {
      DOM.stepCountLabel.textContent = words.stepLabel;
    }

    if (DOM.totalCountLabel) {
      DOM.totalCountLabel.textContent = words.totalLabel;
    }

    DOM.stepCount.textContent = words.stepProgress(
      state.stepCount,
      step.target
    );

    DOM.totalCount.textContent = words.totalProgress(
      state.totalCount,
      CYCLE_TOTAL
    );

    const percent = Math.round(
      (state.totalCount / CYCLE_TOTAL) * 100
    );

    DOM.progressFill.style.width = `${percent}%`;

    DOM.progressBar.setAttribute(
      "aria-valuenow",
      String(percent)
    );

    DOM.progressBar.setAttribute(
      "aria-valuetext",
      `${percent}%`
    );

    if (DOM.todayLabel) {
      DOM.todayLabel.textContent = words.todayLabel;
    }

    if (DOM.todayComplete) {
      DOM.todayComplete.textContent = digits(
        state.dailyCompletions,
        language
      );
    }

    if (DOM.todayTimes) {
      DOM.todayTimes.textContent = words.times;
    }

    DOM.tapButton.setAttribute(
      "aria-label",
      words.tapLabel
    );

    if (DOM.footerText) {
      DOM.footerText.textContent = words.subtitle;
    }

    DOM.app.dataset.language = language;
  }

  /* ==================== 13. COUNTING ==================== */

  function countTap() {
    checkDailyReset();

    const previousTotal = state.totalCount;

    /*
     * Count is based on the total, avoiding skipped or
     * duplicated step transitions.
     */

    const newTotal = previousTotal + 1;

    vibrateAtMilestone(newTotal);

    if (newTotal === 100) {
      /*
       * Complete the cycle before resetting the visible
       * counter for the next cycle.
       */

      state.dailyCompletions += 1;

      playTone(880, 160, 0.055);

      showMessage(
        TEXT[language].completeCycle,
        3600
      );

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

    /*
     * Every completed zikr step shows its own message.
     * The message sits above the Arabic text.
     */

    const completedStep = STEPS.findIndex(
      (item, index) => {
        const stepEnd = STEPS
          .slice(0, index + 1)
          .reduce((sum, current) => sum + current.target, 0);

        return stepEnd === newTotal;
      }
    );

    if (completedStep >= 0) {
      const step = STEPS[completedStep];

      showStepCompletion(step);
      playTone(760, 90, 0.045);
    } else if ([30, 66, 99].includes(newTotal)) {
      /*
       * 30, 66 and 99 are explicit vibration milestones.
       * 66 and 99 also coincide with completed zikr steps,
       * so the completion message is displayed above.
       */

      playTone(700, 70, 0.04);
    } else {
      playTone(620, 42, 0.025);
    }

    saveState();
    render();
  }

  /* ==================== 14. REFRESH SHARED SETTINGS ==================== */

  function refreshSettings() {
    preferences = readPreferences();

    language = preferences.language;
    words = TEXT[language];

    /*
     * Global sound/vibration preferences override the
     * local defaults when explicitly configured.
     */

    const settings = getSettings();

    const sound = firstValue(settings, [
      "soundEnabled",
      "sound",
      "enableSound",
      "tasbihSound"
    ]);

    const vibration = firstValue(settings, [
      "vibrationEnabled",
      "vibration",
      "enableVibration",
      "hapticFeedback"
    ]);

    if (sound !== undefined) {
      state.soundEnabled = toBoolean(
        sound,
        state.soundEnabled
      );
    }

    if (vibration !== undefined) {
      state.vibrationEnabled = toBoolean(
        vibration,
        state.vibrationEnabled
      );
    }

    applyTheme();
    render();
    saveState();
  }

  /* ==================== 15. EVENT LISTENERS ==================== */

  DOM.tapButton.addEventListener("click", countTap);

  window.addEventListener("storage", (event) => {
    if (
      event.key === null ||
      SETTINGS_KEYS.includes(event.key)
    ) {
      refreshSettings();
    }

    if (event.key === STORAGE_KEY) {
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
    "themeChanged"
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

  /* ==================== 16. KEYBOARD ACCESSIBILITY ==================== */

  document.addEventListener("keydown", (event) => {
    if (event.repeat || event.defaultPrevented) {
      return;
    }

    if (
      event.target instanceof HTMLElement &&
      (
        event.target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)
      )
    ) {
      return;
    }

    if (
      event.code === "Space" &&
      event.target === document.body
    ) {
      event.preventDefault();
      countTap();
    }
  });

  /* ==================== 17. INITIALIZE ==================== */

  applyTheme();

  checkDailyReset();

  render();

  saveState();

  window.setInterval(() => {
    checkDailyReset();
  }, 60_000);

  /* ==================== 18. PUBLIC INTERFACE ==================== */

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
