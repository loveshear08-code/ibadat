/* =========================================================
   IBADAT — TASBIH
   Complete fresh JavaScript
   Languages: Bengali, English, Hindi
   Zikr cycle: 33 + 33 + 33 + 1 = 100
   Features:
   - Persistent count and daily completion
   - Automatic daily date rollover
   - Shared theme and language settings
   - Sound and vibration feedback
   - Progress bar and completion animation
   - Safe localStorage handling
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------
     1. Configuration
     --------------------------------------------- */

  const CONFIG = {
    cycleTotal: 100,
    storageKey: "ibadatTasbihState",
    legacyStorageKey: "tasbihState",
    settingsKeys: [
      "ibadatSettings",
      "appSettings",
      "settings"
    ],
    soundEnabledByDefault: true,
    vibrationEnabledByDefault: true,
    milestoneInterval: 10,
    midnightCheckInterval: 60_000
  };

  const STEPS = [
    {
      id: "subhanallah",
      target: 33,
      arabic: "سُبْحَانَ اللّٰهِ",
      names: {
        bn: "সুবহানাল্লাহ",
        en: "SubhanAllah",
        hi: "सुब्हानअल्लाह"
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
      }
    }
  ];

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
      stepProgress: (count, total) =>
        `${toDigits(count, "bn")} / ${toDigits(total, "bn")}`,
      totalProgress: (count, total) =>
        `${toDigits(count, "bn")} / ${toDigits(total, "bn")}`,
      complete: "মাশাআল্লাহ! একটি পূর্ণ তসবিহ সম্পন্ন হয়েছে।",
      allComplete: "মাশাআল্লাহ! তসবিহ সম্পন্ন হয়েছে।",
      reset: "গণনা আবার শুরু হয়েছে।",
      milestone: "আলহামদুলিল্লাহ!",
      soundLabel: "সাউন্ড",
      vibrationLabel: "ভাইব্রেশন"
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
      stepProgress: (count, total) =>
        `${toDigits(count, "en")} / ${toDigits(total, "en")}`,
      totalProgress: (count, total) =>
        `${toDigits(count, "en")} / ${toDigits(total, "en")}`,
      complete: "MashaAllah! One complete Tasbih cycle finished.",
      allComplete: "MashaAllah! Tasbih completed.",
      reset: "Counting has restarted.",
      milestone: "Alhamdulillah!",
      soundLabel: "Sound",
      vibrationLabel: "Vibration"
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
      stepProgress: (count, total) =>
        `${toDigits(count, "hi")} / ${toDigits(total, "hi")}`,
      totalProgress: (count, total) =>
        `${toDigits(count, "hi")} / ${toDigits(total, "hi")}`,
      complete: "माशाअल्लाह! एक पूरा तस्बीह चक्र समाप्त हुआ।",
      allComplete: "माशाअल्लाह! तस्बीह पूरी हुई।",
      reset: "गिनती फिर से शुरू हुई।",
      milestone: "अल्हम्दुलिल्लाह!",
      soundLabel: "ध्वनि",
      vibrationLabel: "कंपन"
    }
  };

  /* ---------------------------------------------
     2. DOM references
     --------------------------------------------- */

  const $ = (id) => document.getElementById(id);

  const DOM = {
    app: $("tasbihApp"),
    header: $("tasbihHeader"),
    footer: $("tasbihFooter"),

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

  /* ---------------------------------------------
     3. Utilities
     --------------------------------------------- */

  function safeReadJSON(key) {
    try {
      const raw = localStorage.getItem(key);

      if (!raw) {
        return null;
      }

      return JSON.parse(raw);
    } catch (error) {
      console.warn(
        `[IBADAT Tasbih] Could not read "${key}".`,
        error
      );

      return null;
    }
  }

  function safeWriteJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(
        `[IBADAT Tasbih] Could not save "${key}".`,
        error
      );

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

  function toDigits(value, language) {
    const number = String(value);

    const digitMaps = {
      bn: "০১২৩৪৫৬৭৮৯",
      hi: "०१२३४५६७८९",
      en: "0123456789"
    };

    const digits = digitMaps[language] || digitMaps.en;

    return number.replace(/\d/g, (digit) => digits[Number(digit)]);
  }

  function getLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getStoredSettings() {
    for (const key of CONFIG.settingsKeys) {
      const settings = safeReadJSON(key);

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

  function firstDefined(object, keys) {
    for (const key of keys) {
      if (
        object &&
        Object.prototype.hasOwnProperty.call(object, key) &&
        object[key] !== undefined &&
        object[key] !== null
      ) {
        return object[key];
      }
    }

    return undefined;
  }

  /* ---------------------------------------------
     4. Language and shared settings
     --------------------------------------------- */

  function normalizeLanguage(value) {
    if (typeof value !== "string") {
      return "bn";
    }

    const normalized = value.trim().toLowerCase();

    if (
      normalized === "en" ||
      normalized.startsWith("en-") ||
      normalized === "english"
    ) {
      return "en";
    }

    if (
      normalized === "hi" ||
      normalized.startsWith("hi-") ||
      normalized === "hindi"
    ) {
      return "hi";
    }

    if (
      normalized === "bn" ||
      normalized.startsWith("bn-") ||
      normalized === "bangla" ||
      normalized === "bengali"
    ) {
      return "bn";
    }

    return "bn";
  }

  function getLanguage() {
    const settings = getStoredSettings();

    const language = firstDefined(settings, [
      "language",
      "lang",
      "appLanguage",
      "selectedLanguage"
    ]);

    return normalizeLanguage(language);
  }

  function normalizeTheme(value) {
    if (typeof value !== "string") {
      return "classic";
    }

    const normalized = value.trim().toLowerCase();

    if (
      normalized.includes("royal") ||
      normalized.includes("purple")
    ) {
      return "royal";
    }

    if (
      normalized.includes("rose") ||
      normalized.includes("pink")
    ) {
      return "rose";
    }

    if (
      normalized.includes("pista") ||
      normalized.includes("green")
    ) {
      return "pista";
    }

    return "classic";
  }

  function normalizeBoolean(value, fallback) {
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

  function readSharedPreferences() {
    const settings = getStoredSettings();

    const themeValue = firstDefined(settings, [
      "theme",
      "colorTheme",
      "selectedTheme",
      "appTheme"
    ]);

    const modeValue = firstDefined(settings, [
      "mode",
      "themeMode",
      "appearance",
      "colorMode"
    ]);

    const darkValue = firstDefined(settings, [
      "darkMode",
      "isDarkMode",
      "dark",
      "isDark"
    ]);

    const soundValue = firstDefined(settings, [
      "sound",
      "soundEnabled",
      "enableSound",
      "tasbihSound"
    ]);

    const vibrationValue = firstDefined(settings, [
      "vibration",
      "vibrationEnabled",
      "enableVibration",
      "hapticFeedback"
    ]);

    const modeIsDark =
      typeof modeValue === "string" &&
      modeValue.toLowerCase().includes("dark");

    return {
      language: getLanguage(),
      theme: normalizeTheme(themeValue),

      darkMode: normalizeBoolean(
        darkValue,
        modeIsDark
      ),

      soundEnabled: normalizeBoolean(
        soundValue,
        CONFIG.soundEnabledByDefault
      ),

      vibrationEnabled: normalizeBoolean(
        vibrationValue,
        CONFIG.vibrationEnabledByDefault
      )
    };
  }

  let preferences = readSharedPreferences();
  let language = preferences.language;
  let words = TEXT[language];

  function applyTheme() {
    const theme = preferences.theme;

    const root = document.documentElement;
    const body = document.body;

    root.dataset.theme = theme;
    body.dataset.theme = theme;

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

    root.classList.add(`theme-${theme}`);
    body.classList.add(`theme-${theme}`);

    root.classList.toggle("dark-mode", preferences.darkMode);
    body.classList.toggle("dark-mode", preferences.darkMode);

    root.classList.toggle("dark", preferences.darkMode);
    body.classList.toggle("dark", preferences.darkMode);

    root.dataset.mode = preferences.darkMode ? "dark" : "light";
    body.dataset.mode = preferences.darkMode ? "dark" : "light";

    root.dataset.themeMode = preferences.darkMode ? "dark" : "light";
    body.dataset.themeMode = preferences.darkMode ? "dark" : "light";

    root.dataset.darkMode = String(preferences.darkMode);
    body.dataset.darkMode = String(preferences.darkMode);

    const themeColor = preferences.darkMode
      ? "#101b16"
      : getComputedStyle(root).getPropertyValue("--primary").trim() ||
        "#123d2c";

    const themeMeta = document.querySelector('meta[name="theme-color"]');

    if (themeMeta) {
      themeMeta.setAttribute("content", themeColor);
    }
  }

  /* ---------------------------------------------
     5. Persistent counting state
     --------------------------------------------- */

  function createInitialState() {
    return {
      version: 2,
      stepIndex: 0,
      stepCount: 0,
      totalCount: 0,
      dailyCompletions: 0,
      dailyDate: getLocalDateKey(),
      soundEnabled: preferences.soundEnabled,
      vibrationEnabled: preferences.vibrationEnabled
    };
  }

  function normalizeState(saved) {
    const initial = createInitialState();

    if (!saved || typeof saved !== "object") {
      return initial;
    }

    const state = {
      ...initial,
      ...saved
    };

    state.totalCount = clamp(
      state.totalCount,
      0,
      CONFIG.cycleTotal
    );

    state.stepIndex = clamp(
      state.stepIndex,
      0,
      STEPS.length - 1
    );

    state.stepCount = clamp(
      state.stepCount,
      0,
      STEPS[state.stepIndex].target
    );

    state.dailyCompletions = clamp(
      state.dailyCompletions,
      0,
      1_000_000_000
    );

    if (typeof state.dailyDate !== "string") {
      state.dailyDate = getLocalDateKey();
    }

    if (state.totalCount >= CONFIG.cycleTotal) {
      state.totalCount = 0;
      state.stepIndex = 0;
      state.stepCount = 0;
    }

    /*
     * Correct step state if a saved value is inconsistent.
     * The current step is derived from totalCount.
     */

    const derived = deriveStepFromTotal(state.totalCount);

    state.stepIndex = derived.stepIndex;
    state.stepCount = derived.stepCount;

    state.soundEnabled = normalizeBoolean(
      state.soundEnabled,
      preferences.soundEnabled
    );

    state.vibrationEnabled = normalizeBoolean(
      state.vibrationEnabled,
      preferences.vibrationEnabled
    );

    return state;
  }

  function loadState() {
    let saved = safeReadJSON(CONFIG.storageKey);

    if (!saved) {
      saved = safeReadJSON(CONFIG.legacyStorageKey);
    }

    return normalizeState(saved);
  }

  let state = loadState();

  function saveState() {
    return safeWriteJSON(CONFIG.storageKey, {
      version: 2,
      stepIndex: state.stepIndex,
      stepCount: state.stepCount,
      totalCount: state.totalCount,
      dailyCompletions: state.dailyCompletions,
      dailyDate: state.dailyDate,
      soundEnabled: state.soundEnabled,
      vibrationEnabled: state.vibrationEnabled
    });
  }

  /* ---------------------------------------------
     6. Derive the current step
     --------------------------------------------- */

  function deriveStepFromTotal(total) {
    let remaining = clamp(total, 0, CONFIG.cycleTotal);

    for (let index = 0; index < STEPS.length; index += 1) {
      const target = STEPS[index].target;

      if (remaining < target) {
        return {
          stepIndex: index,
          stepCount: remaining
        };
      }

      remaining -= target;
    }

    return {
      stepIndex: 0,
      stepCount: 0
    };
  }

  function syncStepFromTotal() {
    const derived = deriveStepFromTotal(state.totalCount);

    state.stepIndex = derived.stepIndex;
    state.stepCount = derived.stepCount;
  }

  /* ---------------------------------------------
     7. Date rollover
     --------------------------------------------- */

  function checkDailyReset() {
    const today = getLocalDateKey();

    if (state.dailyDate === today) {
      return false;
    }

    state.dailyDate = today;
    state.dailyCompletions = 0;

    saveState();
    updateUI();

    return true;
  }

  /* ---------------------------------------------
     8. Audio and vibration
     --------------------------------------------- */

  let audioContext = null;

  function playTone(frequency = 660, duration = 55, volume = 0.035) {
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
      console.warn("[IBADAT Tasbih] Audio unavailable.", error);
    }
  }

  function vibrate(pattern = 12) {
    if (!state.vibrationEnabled) {
      return;
    }

    if (typeof navigator.vibrate !== "function") {
      return;
    }

    try {
      navigator.vibrate(pattern);
    } catch {
      // Vibration may be restricted by the browser or device.
    }
  }

  /* ---------------------------------------------
     9. Completion message and sparks
     --------------------------------------------- */

  let messageTimeout = null;
  let sparkTimeout = null;

  function clearCompletionMessage() {
    if (messageTimeout !== null) {
      window.clearTimeout(messageTimeout);
      messageTimeout = null;
    }

    if (sparkTimeout !== null) {
      window.clearTimeout(sparkTimeout);
      sparkTimeout = null;
    }

    if (DOM.completeMessage) {
      DOM.completeMessage.hidden = true;
      DOM.completeMessage.textContent = "";
    }

    if (DOM.sparkLayer) {
      DOM.sparkLayer.replaceChildren();
    }
  }

  function showMessage(message, duration = 2600) {
    if (!DOM.completeMessage) {
      return;
    }

    if (messageTimeout !== null) {
      window.clearTimeout(messageTimeout);
    }

    DOM.completeMessage.textContent = message;
    DOM.completeMessage.hidden = false;

    messageTimeout = window.setTimeout(() => {
      DOM.completeMessage.hidden = true;
      DOM.completeMessage.textContent = "";
      messageTimeout = null;
    }, duration);
  }

  function createSparks() {
    if (!DOM.sparkLayer) {
      return;
    }

    DOM.sparkLayer.replaceChildren();

    const symbols = ["✦", "✧", "•", "✦", "✧", "✺"];
    const count = 14;

    for (let index = 0; index < count; index += 1) {
      const spark = document.createElement("span");

      spark.className = "spark";
      spark.textContent = symbols[index % symbols.length];

      spark.style.left = `${5 + Math.random() * 90}%`;
      spark.style.top = `${15 + Math.random() * 70}%`;
      spark.style.fontSize = `${10 + Math.random() * 12}px`;
      spark.style.animationDelay = `${Math.random() * 180}ms`;

      DOM.sparkLayer.appendChild(spark);
    }

    if (sparkTimeout !== null) {
      window.clearTimeout(sparkTimeout);
    }

    sparkTimeout = window.setTimeout(() => {
      DOM.sparkLayer.replaceChildren();
      sparkTimeout = null;
    }, 1400);
  }

  /* ---------------------------------------------
     10. Render the current state
     --------------------------------------------- */

  function updateUI() {
    const step = STEPS[state.stepIndex];

    if (!step) {
      return;
    }

    if (DOM.pageTitle) {
      DOM.pageTitle.textContent = words.title;
    }

    if (DOM.zikrLabel) {
      DOM.zikrLabel.textContent = words.zikrHeading;
    }

    if (DOM.zikrArabic) {
      DOM.zikrArabic.textContent = step.arabic;
    }

    if (DOM.zikrName) {
      DOM.zikrName.textContent = step.names[language];
    }

    if (DOM.stepCountLabel) {
      DOM.stepCountLabel.textContent = words.stepLabel;
    }

    if (DOM.totalCountLabel) {
      DOM.totalCountLabel.textContent = words.totalLabel;
    }

    if (DOM.stepCount) {
      DOM.stepCount.textContent = words.stepProgress(
        state.stepCount,
        step.target
      );
    }

    if (DOM.totalCount) {
      DOM.totalCount.textContent = words.totalProgress(
        state.totalCount,
        CONFIG.cycleTotal
      );
    }

    const percentage = Math.round(
      (state.totalCount / CONFIG.cycleTotal) * 100
    );

    if (DOM.progressFill) {
      DOM.progressFill.style.width = `${percentage}%`;
    }

    if (DOM.progressBar) {
      DOM.progressBar.setAttribute(
        "aria-valuenow",
        String(percentage)
      );

      DOM.progressBar.setAttribute(
        "aria-valuetext",
        `${percentage}%`
      );
    }

    if (DOM.todayLabel) {
      DOM.todayLabel.textContent = words.todayLabel;
    }

    if (DOM.todayComplete) {
      DOM.todayComplete.textContent = toDigits(
        state.dailyCompletions,
        language
      );
    }

    if (DOM.todayTimes) {
      DOM.todayTimes.textContent = words.times;
    }

    if (DOM.tapButton) {
      DOM.tapButton.setAttribute(
        "aria-label",
        words.tapLabel
      );
    }

    if (DOM.footerText) {
      DOM.footerText.textContent = words.subtitle;
    }

    if (DOM.app) {
      DOM.app.dataset.language = language;
    }
  }

  /* ---------------------------------------------
     11. Language and preferences refresh
     --------------------------------------------- */

  function refreshPreferences() {
    const previousLanguage = language;
    const previousTheme = preferences.theme;
    const previousDarkMode = preferences.darkMode;

    preferences = readSharedPreferences();

    language = preferences.language;
    words = TEXT[language];

    /*
     * If sound/vibration preferences are saved globally,
     * keep the saved counter state in sync with them.
     */

    const settings = getStoredSettings();

    const soundPreference = firstDefined(settings, [
      "sound",
      "soundEnabled",
      "enableSound",
      "tasbihSound"
    ]);

    const vibrationPreference = firstDefined(settings, [
      "vibration",
      "vibrationEnabled",
      "enableVibration",
      "hapticFeedback"
    ]);

    if (soundPreference !== undefined) {
      state.soundEnabled = normalizeBoolean(
        soundPreference,
        state.soundEnabled
      );
    }

    if (vibrationPreference !== undefined) {
      state.vibrationEnabled = normalizeBoolean(
        vibrationPreference,
        state.vibrationEnabled
      );
    }

    applyTheme();
    updateUI();

    if (
      previousLanguage !== language ||
      previousTheme !== preferences.theme ||
      previousDarkMode !== preferences.darkMode
    ) {
      saveState();
    }
  }

  /* ---------------------------------------------
     12. Count interaction
     --------------------------------------------- */

  function countTap() {
    checkDailyReset();

    const stepBefore = state.stepIndex;
    const totalBefore = state.totalCount;

    if (state.totalCount >= CONFIG.cycleTotal) {
      state.totalCount = 0;
      state.stepIndex = 0;
      state.stepCount = 0;
    }

    state.totalCount += 1;

    syncStepFromTotal();

    const stepChanged = state.stepIndex !== stepBefore;
    const cycleCompleted =
      totalBefore === CONFIG.cycleTotal - 1 &&
      state.totalCount === CONFIG.cycleTotal;

    if (cycleCompleted) {
      state.dailyCompletions += 1;

      /*
       * Save the finished daily count, then prepare the
       * next cycle so the counter never remains stuck at 100.
       */

      state.totalCount = 0;
      state.stepIndex = 0;
      state.stepCount = 0;

      saveState();
      updateUI();

      playTone(880, 150, 0.055);
      vibrate([35, 45, 70]);

      createSparks();
      showMessage(words.complete, 3600);

      return;
    }

    if (stepChanged) {
      playTone(740, 70, 0.04);
      vibrate(20);

      if (state.stepIndex === 3) {
        showMessage(words.milestone, 1500);
      }
    } else {
      playTone(620, 40, 0.025);

      if (
        state.totalCount % CONFIG.milestoneInterval === 0
      ) {
        vibrate(15);
      } else {
        vibrate(8);
      }
    }

    saveState();
    updateUI();
  }

  /* ---------------------------------------------
     13. Keyboard accessibility
     --------------------------------------------- */

  function handleKeyboard(event) {
    if (event.defaultPrevented || event.repeat) {
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

    if (event.code === "Space" && event.target === document.body) {
      event.preventDefault();
      countTap();
    }
  }

  /* ---------------------------------------------
     14. Listen for settings changes
     --------------------------------------------- */

  window.addEventListener("storage", (event) => {
    if (
      event.key === null ||
      CONFIG.settingsKeys.includes(event.key)
    ) {
      refreshPreferences();
    }

    if (
      event.key === CONFIG.storageKey ||
      event.key === CONFIG.legacyStorageKey
    ) {
      state = loadState();
      checkDailyReset();
      updateUI();
    }
  });

  /*
   * The shared settings page may dispatch one of these
   * events after the user changes theme or language.
   */

  [
    "ibadatSettingsChanged",
    "appSettingsChanged",
    "settingsChanged",
    "languageChanged",
    "themeChanged"
  ].forEach((eventName) => {
    window.addEventListener(eventName, refreshPreferences);
  });

  /* ---------------------------------------------
     15. Initialize
     --------------------------------------------- */

  function initialize() {
    checkDailyReset();

    DOM.tapButton.addEventListener("click", countTap);

    document.addEventListener("keydown", handleKeyboard);

    applyTheme();
    updateUI();
    saveState();

    /*
     * Check date rollover periodically, including when
     * the page stays open across midnight.
     */

    window.setInterval(
      checkDailyReset,
      CONFIG.midnightCheckInterval
    );

    /*
     * Refresh date and settings when the user returns
     * to the page after switching apps or tabs.
     */

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        checkDailyReset();
        refreshPreferences();
      }
    });

    window.addEventListener("focus", () => {
      checkDailyReset();
      refreshPreferences();
    });
  }

  initialize();

  /* ---------------------------------------------
     16. Optional public interface
     --------------------------------------------- */

  /*
   * This interface is optional. It allows other IBADAT
   * page scripts to read or adjust Tasbih preferences
   * without directly modifying internal state.
   */

  window.IBADATTasbih = Object.freeze({
    getState() {
      return {
        stepIndex: state.stepIndex,
        stepCount: state.stepCount,
        totalCount: state.totalCount,
        dailyCompletions: state.dailyCompletions,
        dailyDate: state.dailyDate,
        soundEnabled: state.soundEnabled,
        vibrationEnabled: state.vibrationEnabled
      };
    },

    refreshSettings() {
      refreshPreferences();
    },

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
      state.stepIndex = 0;
      state.stepCount = 0;
      state.totalCount = 0;

      clearCompletionMessage();
      saveState();
      updateUI();
    }
  });
})();
