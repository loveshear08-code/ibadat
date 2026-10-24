
"use strict";

/* =========================================
   IBADAT TASBIH
========================================= */

const TASBIH_STORAGE_KEY = "tasbihData";
const TASBIH_DAILY_KEY = "tasbihDaily";

const ZIKR = {
  subhanallah: {
    arabic: "سُبْحَانَ اللّٰهِ",
    bn: "সুবহানাল্লাহ",
    en: "SubhanAllah",
    hi: "सुब्हानअल्लाह"
  },

  alhamdulillah: {
    arabic: "الْحَمْدُ لِلّٰهِ",
    bn: "আলহামদুলিল্লাহ",
    en: "Alhamdulillah",
    hi: "अल्हम्दुलिल्लाह"
  },

  allahuakbar: {
    arabic: "اللّٰهُ أَكْبَرُ",
    bn: "আল্লাহু আকবার",
    en: "Allahu Akbar",
    hi: "अल्लाहु अकबर"
  },

  final: {
    arabic:
      "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",

    bn:
      "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু, লাহুল মুলকু ওয়ালাহুল হামদু, ওয়া হুয়া আলা কুল্লি শাইইন কাদীর",

    en:
      "La ilaha illallahu wahdahu la sharika lah, lahul mulku wa lahul hamd, wa huwa ala kulli shay'in qadir",

    hi:
      "ला इलाहा इल्लल्लाहु वहदहू ला शरीक लह, लहुल मुल्कु व लहुल हम्दु, व हुवा अला कुल्लि शयइन क़दीर"
  }
};

const TEXT = {
  bn: {
    title: "তসবিহ",
    subtitle: "আল্লাহর জিকিরে প্রশান্ত হোক হৃদয়",
    zikr: "জিকির",
    step: "বর্তমান ধাপ",
    total: "মোট গণনা",
    today: "মোট সম্পন্ন:",
    times: "বার",
    footer: "সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার",
    complete: "মাশাআল্লাহ! সম্পূর্ণ তসবিহ শেষ হয়েছে।",
    subComplete: "মাশাআল্লাহ! সুবহানাল্লাহ সম্পূর্ণ হয়েছে।",
    hamdComplete: "মাশাআল্লাহ! আলহামদুলিল্লাহ সম্পূর্ণ হয়েছে।",
    akbarComplete: "মাশাআল্লাহ! আল্লাহু আকবার সম্পূর্ণ হয়েছে।",
    tap: "তসবিহ গণনা করুন"
  },

  en: {
    title: "Tasbih",
    subtitle: "Find peace in the remembrance of Allah",
    zikr: "Zikr",
    step: "Current Step",
    total: "Total Count",
    today: "Completed:",
    times: "times",
    footer: "SubhanAllah, Alhamdulillah, Allahu Akbar",
    complete: "MashaAllah! Complete Tasbih finished.",
    subComplete: "MashaAllah! SubhanAllah completed.",
    hamdComplete: "MashaAllah! Alhamdulillah completed.",
    akbarComplete: "MashaAllah! Allahu Akbar completed.",
    tap: "Count Tasbih"
  },

  hi: {
    title: "तस्बीह",
    subtitle: "अल्लाह के ज़िक्र में दिल को सुकून मिले",
    zikr: "ज़िक्र",
    step: "वर्तमान चरण",
    total: "कुल गणना",
    today: "पूर्ण:",
    times: "बार",
    footer: "सुब्हानअल्लाह, अल्हम्दुलिल्लाह, अल्लाहु अकबर",
    complete: "माशाअल्लाह! पूरी तस्बीह पूरी हुई।",
    subComplete: "माशाअल्लाह! सुब्हानअल्लाह पूरा हुआ।",
    hamdComplete: "माशाअल्लाह! अल्हम्दुलिल्लाह पूरा हुआ।",
    akbarComplete: "माशाअल्लाह! अल्लाहु अकबर पूरा हुआ।",
    tap: "तस्बीह गिनें"
  }
};

let totalCount = 0;
let dailyComplete = 0;
let lastLanguage = "bn";
let lastDate = "";
let messageTimer = null;
let resetTimer = null;
let messageVersion = 0;
let audioContext = null;

/* Storage */

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn("Storage read failed:", error);
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Storage write failed:", error);
  }
}

/* Language */

function getLanguage() {
  try {
    const raw = readStorage("appSettings");

    if (raw) {
      const settings = JSON.parse(raw);
      const lang =
        settings.lang ||
        settings.language ||
        settings.locale;

      if (lang && TEXT[lang]) {
        return lang;
      }
    }
  } catch (error) {
    console.warn("Could not read language setting:", error);
  }

  return "bn";
}

function localizeNumber(number, lang) {
  return String(number).replace(/\d/g, digit => {
    if (lang === "bn") return "০১২৩৪৫৬৭৮৯"[digit];
    if (lang === "hi") return "०१२३४५६७८९"[digit];
    return digit;
  });
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

/* Local calendar date */

function getTodayKey() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
}

/* Midnight reset */

function resetForNewDay() {
  totalCount = 0;
  dailyComplete = 0;

  saveTasbih();
  saveDaily();

  clearMessage();

  if (resetTimer) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }

  const button = document.getElementById("tapButton");

  if (button) {
    button.classList.remove("completed");
  }

  updateUI();
}

function checkMidnight() {
  const today = getTodayKey();

  if (today !== lastDate) {
    lastDate = today;
    resetForNewDay();
  }
}

/* Daily total */

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

/* Total counter */

function loadTasbih() {
  const today = getTodayKey();
  const raw = readStorage(TASBIH_STORAGE_KEY);

  try {
    const data = raw ? JSON.parse(raw) : null;

    if (data && data.date === today) {
      const savedCount = Number(data.totalCount);

      totalCount = Number.isFinite(savedCount)
        ? Math.max(0, Math.min(100, Math.floor(savedCount)))
        : 0;
    } else {
      totalCount = 0;
    }
  } catch (error) {
    totalCount = 0;
  }

  lastDate = today;

  loadDaily();

  saveTasbih();

  lastLanguage = getLanguage();

  updateUI();
}

function saveTasbih() {
  writeStorage(
    TASBIH_STORAGE_KEY,
    JSON.stringify({
      date: getTodayKey(),
      totalCount: totalCount
    })
  );
}

/* Determine current zikr */

function getStepInfo() {
  if (totalCount < 33) {
    return {
      key: "subhanallah",
      stepCount: totalCount,
      target: 33
    };
  }

  if (totalCount < 66) {
    return {
      key: "alhamdulillah",
      stepCount: totalCount - 33,
      target: 33
    };
  }

  if (totalCount < 99) {
    return {
      key: "allahuakbar",
      stepCount: totalCount - 66,
      target: 33
    };
  }

  return {
    key: "final",
    stepCount: totalCount - 99,
    target: 1
  };
}

/* Update UI */

function updateUI() {
  const lang = getLanguage();
  const text = TEXT[lang] || TEXT.bn;
  const info = getStepInfo();
  const zikr = ZIKR[info.key];

  setText("pageTitle", text.title);
  setText("heroSubtitle", text.subtitle);

  setText("zikrLabel", text.zikr);
  setText("zikrArabic", zikr.arabic);
  setText("zikrName", zikr[lang] || zikr.bn);

  setText("stepCountLabel", text.step);
  setText("totalCountLabel", text.total);
  setText("todayLabel", text.today);
  setText("todayTimes", text.times);
  setText("footerText", text.footer);

  setText(
    "stepCount",
    localizeNumber(info.stepCount, lang) +
      " / " +
      localizeNumber(info.target, lang)
  );

  setText(
    "totalCount",
    localizeNumber(totalCount, lang) +
      " / " +
      localizeNumber(100, lang)
  );

  setText(
    "todayComplete",
    localizeNumber(dailyComplete, lang)
  );

  const progressFill = document.getElementById("progressFill");
  const progressBar = document.getElementById("progressBar");

  if (progressFill) {
    progressFill.style.width = totalCount + "%";
  }

  if (progressBar) {
    progressBar.setAttribute("aria-valuenow", String(totalCount));
  }

  const button = document.getElementById("tapButton");

  if (button) {
    button.setAttribute("aria-label", text.tap);
    button.classList.toggle("completed", totalCount === 100);
  }

  document.documentElement.lang = lang;
}

/* Short click sound using Web Audio */

function playClickSound() {
  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1050, now);
    oscillator.frequency.exponentialRampToValueAtTime(650, now + 0.025);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.045);
  } catch (error) {
    /* Sound is optional on unsupported browsers. */
  }
}

/* Vibration */

function vibrateOnce() {
  try {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  } catch (error) {
    /* Vibration is optional. */
  }
}

function vibrateDouble() {
  try {
    if (navigator.vibrate) {
      navigator.vibrate([180, 100, 260]);
    }
  } catch (error) {
    /* Vibration is optional. */
  }
}

/* Completion message */

function clearMessage() {
  messageVersion++;

  if (messageTimer) {
    clearTimeout(messageTimer);
    messageTimer = null;
  }

  const element = document.getElementById("completeMessage");

  if (element) {
    element.hidden = true;
    element.textContent = "";
    element.classList.remove("show", "final-message");
  }
}

function showMessage(message, isFinal = false, duration = 1800) {
  const element = document.getElementById("completeMessage");

  if (!element) return;

  messageVersion++;
  const version = messageVersion;

  if (messageTimer) {
    clearTimeout(messageTimer);
    messageTimer = null;
  }

  element.textContent = message;
  element.classList.toggle("final-message", isFinal);
  element.hidden = false;

  element.classList.remove("show");
  void element.offsetWidth;
  element.classList.add("show");

  if (duration > 0) {
    messageTimer = setTimeout(() => {
      if (version === messageVersion) {
        clearMessage();
      }
    }, duration);
  }
}

function showMilestoneMessage(key) {
  const lang = getLanguage();
  const text = TEXT[lang] || TEXT.bn;

  const messageMap = {
    subhanallah: text.subComplete,
    alhamdulillah: text.hamdComplete,
    allahuakbar: text.akbarComplete
  };

  showMessage(messageMap[key], false, 1800);
}

/* Full tasbih completion */

function completeTasbih() {
  totalCount = 100;

  saveTasbih();

  dailyComplete += 1;
  saveDaily();

  updateUI();

  vibrateDouble();

  const lang = getLanguage();
  const text = TEXT[lang] || TEXT.bn;

  showMessage(text.complete, true, 0);

  const button = document.getElementById("tapButton");

  if (button) {
    button.classList.add("completed");
  }

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

/* Count one tap */

function increase() {
  checkMidnight();

  if (totalCount >= 100) {
    return;
  }

  playClickSound();

  totalCount++;

  saveTasbih();
  updateUI();

  if (totalCount === 33) {
    vibrateOnce();
    showMilestoneMessage("subhanallah");
    return;
  }

  if (totalCount === 66) {
    vibrateOnce();
    showMilestoneMessage("alhamdulillah");
    return;
  }

  if (totalCount === 99) {
    vibrateOnce();
    showMilestoneMessage("allahuakbar");
    return;
  }

  if (totalCount === 100) {
    completeTasbih();
    return;
  }

  clearMessage();
}

/* Language changes */

function checkLanguage() {
  const lang = getLanguage();

  if (lang !== lastLanguage) {
    lastLanguage = lang;
    updateUI();

    const message = document.getElementById("completeMessage");

    if (message && !message.hidden) {
      const text = TEXT[lang] || TEXT.bn;

      if (totalCount === 100) {
        showMessage(text.complete, true, 0);
      } else if (totalCount === 33) {
        showMilestoneMessage("subhanallah");
      } else if (totalCount === 66) {
        showMilestoneMessage("alhamdulillah");
      } else if (totalCount === 99) {
        showMilestoneMessage("allahuakbar");
      }
    }
  }
}

/* Initialize */

document.addEventListener("DOMContentLoaded", () => {
  loadTasbih();

  const button = document.getElementById("tapButton");

  if (button) {
    button.addEventListener("click", increase);
  }

  setInterval(checkLanguage, 500);

  /*
   * Check the local date regularly.
   * The first interaction after midnight also checks it,
   * so the counter does not stay on yesterday's total.
   */
  setInterval(checkMidnight, 1000);
});
