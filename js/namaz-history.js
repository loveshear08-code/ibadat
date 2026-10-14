/* =========================================
   IBADAT — NAMAZ LEARNING HISTORY
   14 topics | Progress | Filters | Dark mode
   ========================================= */

(() => {
  "use strict";

  /* -----------------------------------------
     SETTINGS & STORAGE
     ----------------------------------------- */

  const HISTORY_KEY = "ibadatNamazHistory";
  const SETTINGS_KEY = "appSettings";

  const TOTAL_TOPICS = 14;

  let activeFilter = "all";

  const topicIds = [
    "purity",
    "wudu",
    "conditions",
    "times-rakats",
    "fard-wajib-sunnah",
    "start",
    "qirat",
    "ruku",
    "sujood",
    "tashahhud",
    "after-prayer",
    "complete",
    "mistakes",
    "jamaat-special"
  ];

  /* -----------------------------------------
     TOPIC NAMES
     ----------------------------------------- */

  const topicNames = {
    purity: {
      bn: "পাক-পবিত্রতা",
      en: "Purity",
      hi: "पाक-सफ़ाई"
    },

    wudu: {
      bn: "ওজু",
      en: "Wudu",
      hi: "वुज़ू"
    },

    conditions: {
      bn: "নামাজের শর্ত",
      en: "Conditions of Salah",
      hi: "नमाज़ की शर्तें"
    },

    "times-rakats": {
      bn: "ওয়াক্ত ও রাকাত",
      en: "Prayer Times and Rakats",
      hi: "वक़्त और रकात"
    },

    "fard-wajib-sunnah": {
      bn: "ফরজ, ওয়াজিব ও সুন্নত",
      en: "Fard, Wajib and Sunnah",
      hi: "फ़र्ज़, वाजिब और सुन्नत"
    },

    start: {
      bn: "নামাজ শুরু",
      en: "Starting Salah",
      hi: "नमाज़ शुरू करना"
    },

    qirat: {
      bn: "কিরাত",
      en: "Qiraat",
      hi: "क़िरात"
    },

    ruku: {
      bn: "রুকু",
      en: "Ruku",
      hi: "रुकू"
    },

    sujood: {
      bn: "সিজদা",
      en: "Sujood",
      hi: "सज्दा"
    },

    tashahhud: {
      bn: "বৈঠক ও দোয়া",
      en: "Sitting and Duas",
      hi: "बैठक और दुआ"
    },

    "after-prayer": {
      bn: "সালাম ও পরের আমল",
      en: "Salam and After-Prayer Practices",
      hi: "सलाम और बाद के अमल"
    },

    complete: {
      bn: "সম্পূর্ণ নামাজ",
      en: "Complete Salah",
      hi: "पूरी नमाज़"
    },

    mistakes: {
      bn: "ভুল ও সংশোধন",
      en: "Mistakes and Corrections",
      hi: "गलतियाँ और सुधार"
    },

    "jamaat-special": {
      bn: "জামাত ও বিশেষ নামাজ",
      en: "Congregation and Special Prayers",
      hi: "जमात और विशेष नमाज़"
    }
  };

  /* -----------------------------------------
     LANGUAGE TEXT
     ----------------------------------------- */

  const translations = {
    bn: {
      viewed: "দেখেছি",
      completed: "সম্পন্ন ✓",
      notStarted: "শুরু হয়নি",
      lastOpened: "সর্বশেষ খোলা",
      completedAt: "সম্পন্ন করার সময়",
      continue: "পড়া চালিয়ে যাও",
      start: "শেখা শুরু করো",
      allComplete: "মাশাআল্লাহ! সব বিষয় সম্পন্ন হয়েছে।",
      progress: "টি বিষয় সম্পন্ন",
      noProgress: "শুরু করো—একটি একটি করে বিষয় শিখে নাও।",
      progressPrefix: "তুমি",
      progressSuffix: "টি বিষয় দেখেছ। চালিয়ে যাও!",
      emptyTitle: "এখনও কোনো বিষয় পড়া হয়নি",
      emptyDescription: "নামাজ শেখার পেজ থেকে একটি বিষয় খুলে শেখা শুরু করো।",
      noFilterResults: "এই ফিল্টারে কোনো বিষয় পাওয়া যায়নি।",
      confirmClear: "তোমার নামাজ শেখার সম্পূর্ণ ইতিহাস মুছে ফেলবে?",
      cleared: "ইতিহাস মুছে ফেলা হয়েছে।",
      clearError: "ইতিহাস মুছতে সমস্যা হয়েছে।",
      dateError: "তারিখ পাওয়া যায়নি",
      continueHeading: "সর্বশেষ পড়া বিষয়"
    },

    en: {
      viewed: "Viewed",
      completed: "Completed ✓",
      notStarted: "Not started",
      lastOpened: "Last opened",
      completedAt: "Completed",
      continue: "Continue learning",
      start: "Start learning",
      allComplete: "Well done! All topics are completed.",
      progress: "topics completed",
      noProgress: "Start learning one topic at a time.",
      progressPrefix: "You have viewed",
      progressSuffix: "topics. Keep going!",
      emptyTitle: "No topics viewed yet",
      emptyDescription: "Open a topic from the Salah learning page to get started.",
      noFilterResults: "No topics match this filter.",
      confirmClear: "Delete all your Salah learning history?",
      cleared: "History has been cleared.",
      clearError: "Unable to clear history.",
      dateError: "Date unavailable",
      continueHeading: "Continue your last topic"
    },

    hi: {
      viewed: "देखा गया",
      completed: "पूरा हुआ ✓",
      notStarted: "शुरू नहीं हुआ",
      lastOpened: "आख़िरी बार खोला",
      completedAt: "पूरा करने का समय",
      continue: "सीखना जारी रखें",
      start: "सीखना शुरू करें",
      allComplete: "बहुत अच्छा! सभी विषय पूरे हो गए।",
      progress: "विषय पूरे हुए",
      noProgress: "एक-एक करके विषय सीखना शुरू करें।",
      progressPrefix: "आपने",
      progressSuffix: "विषय देखे हैं। जारी रखें!",
      emptyTitle: "अभी कोई विषय नहीं पढ़ा गया",
      emptyDescription: "शुरू करने के लिए नमाज़ सीखने वाले पेज से कोई विषय खोलें।",
      noFilterResults: "इस फ़िल्टर में कोई विषय नहीं मिला।",
      confirmClear: "क्या आप नमाज़ सीखने का पूरा इतिहास मिटाना चाहते हैं?",
      cleared: "इतिहास मिटा दिया गया है।",
      clearError: "इतिहास मिटाने में समस्या हुई।",
      dateError: "तारीख़ उपलब्ध नहीं",
      continueHeading: "आख़िरी विषय जारी रखें"
    }
  };

  /* -----------------------------------------
     DOM ELEMENTS
     ----------------------------------------- */

  const elements = {
    completedCount: document.getElementById("completed-count"),
    totalCount: document.getElementById("total-count"),
    viewedCount: document.getElementById("viewed-count"),
    summaryCompletedCount:
      document.getElementById("summary-completed-count"),

    progressTrack: document.getElementById("progress-track"),
    progressFill: document.getElementById("progress-fill"),
    progressMessage: document.getElementById("progress-message"),

    continueCard: document.getElementById("continue-card"),
    continueHeading: document.getElementById("continue-heading"),
    continueTitle: document.getElementById("continue-title"),
    continueDate: document.getElementById("continue-date"),
    continueLink: document.getElementById("continue-link"),

    historyList: document.getElementById("history-list"),
    emptyMessage: document.getElementById("empty-message"),
    emptyTitle: document.getElementById("empty-title"),
    emptyDescription:
      document.getElementById("empty-description"),

    clearButton: document.getElementById("clear-history"),
    filterButtons: [
      ...document.querySelectorAll(".filter-button")
    ]
  };

  /* -----------------------------------------
     READ SETTINGS SAFELY
     ----------------------------------------- */

  function readSettings() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
      );

      return saved && typeof saved === "object" ? saved : {};
    } catch {
      return {};
    }
  }

  const settings = readSettings();

  const lang = ["bn", "en", "hi"].includes(settings.lang)
    ? settings.lang
    : "bn";

  const text = translations[lang];

  /* -----------------------------------------
     READ & SAVE HISTORY
     ----------------------------------------- */

  function readHistory() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(HISTORY_KEY) || "{}"
      );

      return saved &&
        typeof saved === "object" &&
        !Array.isArray(saved)
        ? saved
        : {};
    } catch {
      return {};
    }
  }

  function saveHistory(history) {
    try {
      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
      );

      return true;
    } catch (error) {
      console.error("History save failed:", error);
      return false;
    }
  }

  /* -----------------------------------------
     TOPIC NAME & URL
     ----------------------------------------- */

  function getTopicName(id, entry = {}) {
    return (
      topicNames[id]?.[lang] ||
      entry.title ||
      id
    );
  }

  function getTopicUrl(id) {
    const params = new URLSearchParams();

    params.set("topic", id);
    params.set("lang", lang);

    return `namaz-detail.html?${params.toString()}`;
  }

  /* -----------------------------------------
     DATE FORMATTING
     ----------------------------------------- */

  function formatDate(value) {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    try {
      return date.toLocaleString(
        lang === "en"
          ? "en-US"
          : lang === "hi"
            ? "hi-IN"
            : "bn-BD",
        {
          dateStyle: "medium",
          timeStyle: "short"
        }
      );
    } catch {
      return date.toLocaleString();
    }
  }

  function getDateLabel(entry) {
    if (entry.completed && entry.completedAt) {
      const date = formatDate(entry.completedAt);

      return date
        ? `${text.completedAt}: ${date}`
        : text.completed;
    }

    if (entry.openedAt) {
      const date = formatDate(entry.openedAt);

      return date
        ? `${text.lastOpened}: ${date}`
        : text.viewed;
    }

    return text.notStarted;
  }

  /* -----------------------------------------
     FILTER STATE
     ----------------------------------------- */

  function matchesFilter(id, history) {
    const entry = history[id];

    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "viewed") {
      return Boolean(entry?.openedAt);
    }

    if (activeFilter === "completed") {
      return Boolean(entry?.completed);
    }

    if (activeFilter === "not-started") {
      return !entry?.openedAt;
    }

    return true;
  }

  function updateFilterButtons() {
    elements.filterButtons.forEach(button => {
      const isActive = button.dataset.filter === activeFilter;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  /* -----------------------------------------
     PROGRESS SUMMARY
     ----------------------------------------- */

  function renderProgress(history) {
    const completedCount = topicIds.filter(
      id => Boolean(history[id]?.completed)
    ).length;

    const viewedCount = topicIds.filter(
      id => Boolean(history[id]?.openedAt)
    ).length;

    const percentage = Math.round(
      (completedCount / TOTAL_TOPICS) * 100
    );

    elements.completedCount.textContent =
      String(completedCount);

    elements.totalCount.textContent =
      String(TOTAL_TOPICS);

    elements.viewedCount.textContent =
      String(viewedCount);

    elements.summaryCompletedCount.textContent =
      String(completedCount);

    elements.progressFill.style.width =
      `${percentage}%`;

    elements.progressTrack.setAttribute(
      "aria-valuenow",
      String(completedCount)
    );

    if (completedCount === TOTAL_TOPICS) {
      elements.progressMessage.textContent =
        text.allComplete;
    } else if (viewedCount === 0) {
      elements.progressMessage.textContent =
        text.noProgress;
    } else {
      elements.progressMessage.textContent =
        `${text.progressPrefix} ${viewedCount} ${text.progressSuffix}`;
    }
  }

  /* -----------------------------------------
     CONTINUE LEARNING
     ----------------------------------------- */

  function renderContinueCard(history) {
    const lastEntry = topicIds
      .filter(id => history[id]?.openedAt)
      .map(id => ({
        id,
        ...history[id]
      }))
      .sort((a, b) => {
        return (
          new Date(b.openedAt).getTime() -
          new Date(a.openedAt).getTime()
        );
      })[0];

    if (!lastEntry) {
      elements.continueCard.hidden = true;
      return;
    }

    elements.continueCard.hidden = false;

    elements.continueHeading.textContent =
      text.continueHeading;

    elements.continueTitle.textContent =
      getTopicName(lastEntry.id, lastEntry);

    elements.continueDate.textContent =
      getDateLabel(lastEntry);

    elements.continueLink.href =
      getTopicUrl(lastEntry.id);

    elements.continueLink.textContent =
      lastEntry.completed
        ? text.continue
        : text.continue;
  }

  /* -----------------------------------------
     CREATE ONE HISTORY ITEM
     ----------------------------------------- */

  function createHistoryItem(id, index, history) {
    const entry = history[id] || {};
    const viewed = Boolean(entry.openedAt);
    const completed = Boolean(entry.completed);

    const item = document.createElement("article");
    item.className = "history-item";

    const number = document.createElement("span");
    number.className = "topic-number";
    number.textContent = String(index + 1);
    number.setAttribute("aria-hidden", "true");

    const main = document.createElement("div");
    main.className = "history-item-main";

    const link = document.createElement("a");
    link.className = "history-item-title";
    link.href = getTopicUrl(id);
    link.textContent = getTopicName(id, entry);

    const date = document.createElement("p");
    date.className = "history-item-date";
    date.textContent = getDateLabel(entry);

    main.append(link, date);

    const status = document.createElement("span");
    status.className = "history-status";

    if (completed) {
      status.classList.add("completed");
      status.textContent = text.completed;
    } else if (viewed) {
      status.classList.add("viewed");
      status.textContent = text.viewed;
    } else {
      status.classList.add("not-started");
      status.textContent = text.notStarted;
    }

    item.append(number, main, status);

    return item;
  }

  /* -----------------------------------------
     HISTORY LIST
     ----------------------------------------- */

  function renderHistoryList(history) {
    elements.historyList.replaceChildren();

    const visibleTopics = topicIds
      .map((id, index) => ({ id, index }))
      .filter(({ id }) => matchesFilter(id, history));

    if (visibleTopics.length === 0) {
      elements.emptyMessage.hidden = false;

      const noHistory =
        !topicIds.some(id => history[id]?.openedAt);

      elements.emptyTitle.textContent = noHistory
        ? text.emptyTitle
        : text.noFilterResults;

      elements.emptyDescription.textContent = noHistory
        ? text.emptyDescription
        : "";

      return;
    }

    elements.emptyMessage.hidden = true;

    const fragment = document.createDocumentFragment();

    visibleTopics.forEach(({ id, index }) => {
      fragment.appendChild(
        createHistoryItem(id, index, history)
      );
    });

    elements.historyList.appendChild(fragment);
  }

  /* -----------------------------------------
     RENDER EVERYTHING
     ----------------------------------------- */

  function render() {
    const history = readHistory();

    updateFilterButtons();
    renderProgress(history);
    renderContinueCard(history);
    renderHistoryList(history);
  }

  /* -----------------------------------------
     FILTER BUTTON EVENTS
     ----------------------------------------- */

  elements.filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      const validFilters = [
        "all",
        "viewed",
        "completed",
        "not-started"
      ];

      if (!validFilters.includes(filter)) {
        return;
      }

      activeFilter = filter;
      render();
    });
  });

  /* -----------------------------------------
     CLEAR HISTORY
     ----------------------------------------- */

  elements.clearButton.addEventListener("click", () => {
    const history = readHistory();

    const hasHistory = topicIds.some(
      id => Boolean(history[id])
    );

    if (!hasHistory) {
      return;
    }

    const confirmed = window.confirm(
      text.confirmClear
    );

    if (!confirmed) {
      return;
    }

    try {
      localStorage.removeItem(HISTORY_KEY);
      render();

      // এই বার্তাটি স্ক্রিনে দেখানোর জন্য
      // progress-message ব্যবহার করা হচ্ছে।
      elements.progressMessage.textContent =
        text.cleared;
    } catch (error) {
      console.error("History clear failed:", error);

      elements.progressMessage.textContent =
        text.clearError;
    }
  });

  /* -----------------------------------------
     APPLY DARK THEME
     ----------------------------------------- */

  if (settings.dark === true) {
    document.body.classList.add("dark-mode");
  }

  /* -----------------------------------------
     INITIAL RENDER
     ----------------------------------------- */

  render();
})();
