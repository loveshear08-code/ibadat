
"use strict";

/* =========================================
   IBADAT TASBIH
   Count, completion messages, language,
   daily total, vibration and saved progress
========================================= */

const TASBIH_STORAGE_KEY = "tasbihData";
const TASBIH_DAILY_KEY = "tasbihDaily";

const ZIKR = {
  subhanallah: {
    arabic: "سُبْحَانَ اللّٰهِ",
    bn: "সুবহানাল্লাহ",
    en: "SubhanAllah",
    hi: "सुब्हानअल्लाह",
    target: 33
  },

  alhamdulillah: {
    arabic: "الْحَمْدُ لِلّٰهِ",
    bn: "আলহামদুলিল্লাহ",
    en: "Alhamdulillah",
    hi: "अल्हम्दुलिल्लाह",
    target: 33
  },

  allahuakbar: {
    arabic: "اللّٰهُ أَكْبَرُ",
    bn: "আল্লাহু আকবার",
    en: "Allahu Akbar",
    hi: "अल्लाहु अकबर",
    target: 33
  },

  final: {
    arabic:
      "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",

    bn:
      "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু, লাহুল মুলকু ওয়ালাহুল হামদু, ওয়া হুয়া আলা কুল্লি শাইইন কাদীর",

    en:
      "La ilaha illallahu wahdahu la sharika lah, lahul mulku wa lahul hamd, wa huwa ala kulli shay'in qadir",

    hi:
      "ला इलाहा इल्लल्लाहु वहदहू ला शरीक लह, लहुल मुल्कु व लहुल हम्दु, व हुवा अला कुल्लि शयइन क़दीर",

    target: 1
  }
};

/* Language strings */

const TEXT = {
  bn: {
    title: "তসবিহ",
    subtitle: "আল্লাহর জিকিরে প্রশান্ত হোক হৃদয়",
    current: "বর্তমান জিকির",
    step: "বর্তমান ধাপ",
    total: "মোট কাউন্ট",
    progress: "অগ্রগতি",
    today: "আজ মোট সম্পন্ন",
    times: "বার",
    footer: "সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার",
    stepComplete: "সম্পন্ন হয়েছে",
    complete: "মাশাআল্লাহ! একটি সম্পূর্ণ তসবিহ শেষ হয়েছে।",
    tap: "তসবিহ গণনা করুন"
  },

  en: {
    title: "Tasbih",
    subtitle: "Find peace in the remembrance of Allah",
    current: "Current Zikr",
    step: "Current Step",
    total: "Total Count",
    progress: "Progress",
    today: "Completed Today",
    times: "times",
    footer: "SubhanAllah, Alhamdulillah, Allahu Akbar",
    stepComplete: "completed",
    complete: "MashaAllah! One complete Tasbih finished.",
    tap: "Count Tasbih"
  },

  hi: {
    title: "तस्बीह",
    subtitle: "अल्लाह के ज़िक्र में दिल को सुकून मिले",
    current: "वर्तमान ज़िक्र",
    step: "वर्तमान चरण",
    total: "कुल काउंट",
    progress: "प्रगति",
    today: "आज कुल पूर्ण",
    times: "बार",
    footer: "सुब्हानअल्लाह, अल्हम्दुलिल्लाह, अल्लाहु अकबर",
    stepComplete: "पूरा हुआ",
    complete: "माशाअल्लाह! एक पूरी तस्बीह पूरी हुई।",
    tap: "तस्बीह गिनें"
  }
};

/* State */

let totalCount = 0;
let dailyComplete = 0;
let lastLanguage = "bn";
let lastDate = "";
let messageTimer = null;
let resetTimer = null;
let messageVersion = 0;

/* Safe storage helpers */

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn("Storage read unavailable:", key, error);
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn("Storage write unavailable:", key, error);
    return false;
  }
}

/* Language */

function getLanguage() {
  try {
    const raw = readStorage("appSettings");

    if (raw) {
      const settings = JSON.parse(raw);
      const language =
        settings.lang ||
        settings.language ||
        settings.locale;

      if (language && TEXT[language]) {
        return language;
      }
    }
  } catch (error) {
    console.warn("Could not read language setting:", error);
  }

  return "bn";
}

function localizeNumber(number, language) {
  const digits = String(number);

  if (language === "bn") {
    return digits.replace(/\d/g, digit => "০১২৩৪৫৬৭৮৯"[digit]);
  }

  if (language === "hi") {
    return digits.replace(/\d/g, digit => "०१२३४५६७८९"[digit]);
  }

  return digits;
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

/* Date */

function getTodayKey() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
}

/* Daily count */

function loadDaily() {
  const today = getTodayKey();
  const raw = readStorage(TASBIH_DAILY_KEY);

  if (!raw) {
    dailyComplete = 0;
    saveDaily();
    return;
  }

  try {
    const data = JSON.parse(raw);

    if (data.date === today) {
      dailyComplete = Math.max(0, Number(data.count) || 0);
    } else {
      dailyComplete = 0;
      saveDaily();
    }
  } catch (error) {
    dailyComplete = 0;
    saveDaily();
  }
}

function saveDaily() {
  writeStorage(
    TASBIH_DAILY_KEY,
    JSON.stringify({
      date: getTodayKey(),
      count: dailyComplete
    })
  );
}

/* Main count persistence */

function loadTasbih() {
  const raw = readStorage(TASBIH_STORAGE_KEY);

  if (raw) {
    try {
      const data = JSON.parse(raw);
      const storedCount = Number(data.totalCount);

      totalCount = Number.isFinite(storedCount)
        ? Math.min(100, Math.max(0, Math.floor(storedCount)))
        : 0;
    } catch (error) {
      totalCount = 0;
    }
  } else {
    totalCount = 0;
  }

  loadDaily();

  lastLanguage = getLanguage();
  lastDate = getTodayKey();

  updateUI();
}

function saveTasbih() {
  writeStorage(
    TASBIH_STORAGE_KEY,
    JSON.stringify({
      totalCount: totalCount
    })
  );
}

/* Current step */

function getStepInfo() {
  if (totalCount < 33) {
    return {
      key: "subhanallah",
      step: 1,
      stepCount: totalCount,
      target: 33
    };
  }

  if (totalCount < 66) {
    return {
      key: "alhamdulillah",
      step: 2,
      stepCount: totalCount - 33,
      target: 33
    };
  }

  if (totalCount < 99) {
    return {
      key: "allahuakbar",
      step: 3,
      stepCount: totalCount - 66,
      target: 33
    };
  }

  return {
    key: "final",
    step: 4,
    stepCount: totalCount - 99,
    target: 1
  };
}

/* Update page */

function updateUI() {
  const language = getLanguage();
  const text = TEXT[language] || TEXT.bn;
  const info = getStepInfo();
  const zikr = ZIKR[info.key];

  setText("pageTitle", text.title);
  setText("heroSubtitle", text.subtitle);

  setText("zikrLabel", text.current);
  setText("zikrArabic", zikr.arabic);
  setText("zikrName", zikr[language] || zikr.bn);

  const stepWord =
    language === "bn" ? "ধাপ " :
    language === "hi" ? "चरण " :
    "Step ";

  setText(
    "stepText",
    stepWord +
      localizeNumber(info.step, language) +
      " / " +
      localizeNumber(4, language)
  );

  setText("stepCountLabel", text.step);
  setText("totalCountLabel", text.total);
  setText("progressLabel", text.progress);
  setText("todayLabel", text.today);
  setText("todayTimes", text.times);
  setText("footerText", text.footer);

  setText(
    "stepCount",
    localizeNumber(info.stepCount, language) +
      " / " +
      localizeNumber(info.target, language)
  );

  setText(
    "totalCount",
    localizeNumber(totalCount, language) +
      " / " +
      localizeNumber(100, language)
  );

  setText(
    "progressPercent",
    localizeNumber(totalCount, language) + "%"
  );

  setText(
    "todayComplete",
    localizeNumber(dailyComplete, language)
  );

  const progress = document.getElementById("progressFill");
  const progressBar = document.getElementById("progressBar");

  if (progress) {
    progress.style.width = totalCount + "%";
  }

  if (progressBar) {
    progressBar.setAttribute("aria-valuenow", String(totalCount));
  }

  const tapButton = document.getElementById("tapButton");

  if (tapButton) {
    tapButton.setAttribute("aria-label", text.tap);
    tapButton.classList.toggle("completed", totalCount === 100);
  }

  document.documentElement.lang = language;
}

/* Vibration */

function vibrate(pattern) {
  try {
    if (typeof navigator.vibrate === "function") {
      navigator.vibrate(pattern);
    }
  } catch (error) {
    // Vibration is optional.
  }
}

/* Completion message */

function showMessage(message, isFinal = false, duration = 1800) {
  const element = document.getElementById("completeMessage");

  if (!element) {
    return;
  }

  messageVersion += 1;
  const currentVersion = messageVersion;

  if (messageTimer) {
    clearTimeout(messageTimer);
    messageTimer = null;
  }

  element.textContent = message;
  element.classList.toggle("final-message", isFinal);

  element.hidden = false;

  /* Restart the reveal animation. */
  element.classList.remove("show");
  void element.offsetWidth;
  element.classList.add("show");

  if (duration > 0) {
    messageTimer = setTimeout(() => {
      if (currentVersion === messageVersion) {
        clearMessage();
      }
    }, duration);
  }
}

function clearMessage() {
  messageVersion += 1;

  if (messageTimer) {
    clearTimeout(messageTimer);
    messageTimer = null;
  }

  const element = document.getElementById("completeMessage");

  if (element) {
    element.classList.remove("show", "final-message");
    element.textContent = "";
    element.hidden = true;
  }
}

function showStepMessage(key) {
  const language = getLanguage();
  const text = TEXT[language] || TEXT.bn;
  const zikr = ZIKR[key];

  showMessage(
    "✓ " + (zikr[language] || zikr.bn) + " — " + text.stepComplete,
    false,
    1800
  );
}

/* Completed full cycle */

function completeTasbih() {
  totalCount = 100;

  saveTasbih();

  dailyComplete += 1;
  saveDaily();

  updateUI();

  vibrate([180, 100, 260]);

  const language = getLanguage();
  const text = TEXT[language] || TEXT.bn;

  showMessage(text.complete, true, 0);

  const tapButton = document.getElementById("tapButton");

  if (tapButton) {
    tapButton.classList.add("completed");
  }

  /*
   * Keep the 100/100 result and completion
   * message visible briefly, then begin a new cycle.
   */
  if (resetTimer) {
    clearTimeout(resetTimer);
  }

  resetTimer = setTimeout(() => {
    totalCount = 0;

    saveTasbih();
    clearMessage();
    updateUI();

    resetTimer = null;
  }, 2500);
}

/* Increase count */

function increase() {
  if (totalCount >= 100) {
    return;
  }

  if (resetTimer) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }

  totalCount += 1;

  saveTasbih();
  updateUI();

  if (totalCount === 33) {
    vibrate(100);
    showStepMessage("subhanallah");
    return;
  }

  if (totalCount === 66) {
    vibrate(100);
    showStepMessage("alhamdulillah");
    return;
  }

  if (totalCount === 99) {
    vibrate(100);
    showStepMessage("allahuakbar");
    return;
  }

  if (totalCount === 100) {
    completeTasbih();
    return;
  }

  /* A new tap clears an older completion message. */
  clearMessage();
}

/* Settings changes */

function checkLanguage() {
  const currentLanguage = getLanguage();

  if (currentLanguage !== lastLanguage) {
    lastLanguage = currentLanguage;
    updateUI();

    /*
     * If a completion message is currently visible,
     * refresh it in the newly selected language.
     */
    const message = document.getElementById("completeMessage");

    if (message && !message.hidden) {
      if (totalCount === 100) {
        const text = TEXT[currentLanguage] || TEXT.bn;
        showMessage(text.complete, true, 0);
      } else if (totalCount === 33) {
        showStepMessage("subhanallah");
      } else if (totalCount === 66) {
        showStepMessage("alhamdulillah");
      } else if (totalCount === 99) {
        showStepMessage("allahuakbar");
      }
    }
  }
}

/* Midnight: reset only today's total */

function checkMidnight() {
  const today = getTodayKey();

  if (today !== lastDate) {
    lastDate = today;
    dailyComplete = 0;

    saveDaily();
    updateUI();
  }
}

/* Initialize */

document.addEventListener("DOMContentLoaded", () => {
  loadTasbih();

  const tapButton = document.getElementById("tapButton");

  if (tapButton) {
    tapButton.addEventListener("click", increase);
  }

  setInterval(checkLanguage, 500);
  setInterval(checkMidnight, 30000);
});
