
"use strict";

/* =========================================
   IBADAT — DU'A
   Language: Bengali / English / Hindi
   Theme: Main application settings
   Navigation: Home / Chapter entries / Dua
========================================= */

(() => {
    /* =====================================
       API CONFIGURATION
    ===================================== */

    const API_BASE = "https://api.opendua.org/v2";
    const COLLECTION_ID = "hisn-al-muslim";

    const SETTINGS_KEYS = [
        "appSettings",
        "ibadatSettings"
    ];

    const LANGUAGE_KEYS = [
        "lang",
        "language"
    ];

    const SUPPORTED_LANGUAGES = ["bn", "en", "hi"];

    /* =====================================
       ELEMENTS
    ===================================== */

    const $ = (id) => document.getElementById(id);

    const elements = {
        heroTitle: $("heroTitle"),
        heroSubtitle: $("heroSubtitle"),
        footerText: $("footerText"),

        loadingBox: $("loadingBox"),
        errorBox: $("errorBox"),
        errorText: $("errorText"),
        retryButton: $("retryButton"),

        home: $("duaHome"),
        chapterList: $("chapterList"),

        entryPage: $("entryPage"),
        entryList: $("entryList"),

        duaPage: $("duaPage"),
        duaContent: $("duaContent")
    };

    /* =====================================
       TRANSLATIONS
    ===================================== */

    const TEXT = {
        bn: {
            title: "দোয়া",
            subtitle: "দোয়া শিখুন, পড়ুন ও প্রশান্তি অনুভব করুন",

            footerHome: "আল্লাহর স্মরণে প্রশান্তি",
            footerEntries: "দোয়া শিখুন, আমল করুন",
            footerDua: "দোয়ায় প্রশান্তি খুঁজুন",

            loading: "দোয়া লোড হচ্ছে...",
            loadingChapters: "দোয়ার অধ্যায় লোড হচ্ছে...",
            loadingEntries: "দোয়ার তালিকা লোড হচ্ছে...",
            loadingDua: "দোয়া লোড হচ্ছে...",

            retry: "আবার চেষ্টা করুন",
            loadError: "দুঃখিত, তথ্য লোড করা যায়নি।",
            networkError: "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
            chaptersError: "দোয়ার অধ্যায়গুলো লোড করা যায়নি।",
            entriesError: "এই অধ্যায়ের দোয়াগুলো লোড করা যায়নি।",
            duaError: "দোয়ার বিস্তারিত তথ্য লোড করা যায়নি।",

            emptyChapters: "কোনো অধ্যায় পাওয়া যায়নি।",
            emptyEntries: "এই অধ্যায়ে কোনো দোয়া পাওয়া যায়নি।",
            emptyDua: "এই দোয়ার বিস্তারিত তথ্য পাওয়া যায়নি।",

            chapter: "অধ্যায়",
            dua: "দোয়া",
            arabic: "আরবি",
            pronunciation: "উচ্চারণ",
            meaning: "অর্থ",
            reference: "রেফারেন্স",

            audio: "দোয়ার অডিও",
            play: "চালান",
            pause: "থামান",
            previous: "আগের অডিও",
            next: "পরের অডিও",
            audioUnavailable: "এই দোয়ার অডিও পাওয়া যায়নি।",
            audioError: "অডিও চালানো যাচ্ছে না। আবার চেষ্টা করুন।",

            unnamedChapter: "নামবিহীন অধ্যায়",
            unnamedDua: "নামবিহীন দোয়া",
            chapterNumber: "অধ্যায়",
            duaNumber: "দোয়া"
        },

        en: {
            title: "Du'a",
            subtitle: "Learn, recite and find peace through supplication",

            footerHome: "Peace through remembrance",
            footerEntries: "Learn and practise Du'a",
            footerDua: "Find peace through Du'a",

            loading: "Loading Du'as...",
            loadingChapters: "Loading chapters...",
            loadingEntries: "Loading Du'as in this chapter...",
            loadingDua: "Loading Du'a...",

            retry: "Try again",
            loadError: "Sorry, the information could not be loaded.",
            networkError: "Check your internet connection and try again.",
            chaptersError: "Could not load the chapters.",
            entriesError: "Could not load the Du'as in this chapter.",
            duaError: "Could not load the Du'a details.",

            emptyChapters: "No chapters were found.",
            emptyEntries: "No Du'as were found in this chapter.",
            emptyDua: "No details were found for this Du'a.",

            chapter: "Chapter",
            dua: "Du'a",
            arabic: "Arabic",
            pronunciation: "Pronunciation",
            meaning: "Meaning",
            reference: "Reference",

            audio: "Du'a audio",
            play: "Play",
            pause: "Pause",
            previous: "Previous audio",
            next: "Next audio",
            audioUnavailable: "Audio is not available for this Du'a.",
            audioError: "Unable to play audio. Please try again.",

            unnamedChapter: "Untitled chapter",
            unnamedDua: "Untitled Du'a",
            chapterNumber: "Chapter",
            duaNumber: "Du'a"
        },

        hi: {
            title: "दुआ",
            subtitle: "दुआ सीखें, पढ़ें और सुकून पाएँ",

            footerHome: "अल्लाह के ज़िक्र से सुकून",
            footerEntries: "दुआ सीखें और अमल करें",
            footerDua: "दुआ से सुकून पाएँ",

            loading: "दुआएँ लोड हो रही हैं...",
            loadingChapters: "अध्याय लोड हो रहे हैं...",
            loadingEntries: "दुआओं की सूची लोड हो रही है...",
            loadingDua: "दुआ लोड हो रही है...",

            retry: "फिर कोशिश करें",
            loadError: "माफ़ कीजिए, जानकारी लोड नहीं हो सकी।",
            networkError: "इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।",
            chaptersError: "अध्याय लोड नहीं हो सके।",
            entriesError: "इस अध्याय की दुआएँ लोड नहीं हो सकीं।",
            duaError: "दुआ की जानकारी लोड नहीं हो सकी।",

            emptyChapters: "कोई अध्याय नहीं मिला।",
            emptyEntries: "इस अध्याय में कोई दुआ नहीं मिली।",
            emptyDua: "इस दुआ की जानकारी उपलब्ध नहीं है।",

            chapter: "अध्याय",
            dua: "दुआ",
            arabic: "अरबी",
            pronunciation: "उच्चारण",
            meaning: "अर्थ",
            reference: "संदर्भ",

            audio: "दुआ का ऑडियो",
            play: "चलाएँ",
            pause: "रोकें",
            previous: "पिछला ऑडियो",
            next: "अगला ऑडियो",
            audioUnavailable: "इस दुआ का ऑडियो उपलब्ध नहीं है।",
            audioError: "ऑडियो नहीं चल सका। फिर कोशिश करें।",

            unnamedChapter: "बिना नाम का अध्याय",
            unnamedDua: "बिना नाम की दुआ",
            chapterNumber: "अध्याय",
            duaNumber: "दुआ"
        }
    };

    /* =====================================
       APPLICATION STATE
    ===================================== */

    let currentLanguage = "bn";
    let isDarkMode = false;

    let currentPage = "home";

    let chapters = [];
    let entries = [];
    let currentDuas = [];

    let selectedChapter = null;
    let selectedEntry = null;

    let currentAudioIndex = 0;
    let currentAudio = null;
    let audioPlayer = null;

    let requestVersion = 0;
    let historyStateReady = false;
    let isRestoringHistory = false;

    let lastErrorType = "chapters";

    const pageStack = [];

    const t = (key) => {
        return TEXT[currentLanguage]?.[key]
            ?? TEXT.bn[key]
            ?? key;
    };

    /* =====================================
       SAFE DATA HELPERS
    ===================================== */

    function isObject(value) {
        return (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        );
    }

    function asArray(value) {
        return Array.isArray(value) ? value : [];
    }

    function getFirstValue(object, keys) {
        if (!isObject(object)) return undefined;

        for (const key of keys) {
            const value = object[key];

            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                return value;
            }
        }

        return undefined;
    }

    function localized(value) {
        if (value === null || value === undefined) {
            return "";
        }

        if (typeof value === "string" || typeof value === "number") {
            return String(value);
        }

        if (Array.isArray(value)) {
            return localized(value[0]);
        }

        if (!isObject(value)) {
            return "";
        }

        const languageKeys = {
            bn: ["bn", "ben", "bangla", "bengali"],
            en: ["en", "eng", "english"],
            hi: ["hi", "hin", "hindi"]
        };

        const keys = languageKeys[currentLanguage] || languageKeys.bn;

        for (const key of keys) {
            if (value[key] !== undefined && value[key] !== null) {
                const result = localized(value[key]);

                if (result) return result;
            }
        }

        for (const key of [
            "text",
            "value",
            "name",
            "title",
            "translation",
            "content"
        ]) {
            if (value[key] !== undefined && value[key] !== null) {
                const result = localized(value[key]);

                if (result) return result;
            }
        }

        return "";
    }

    function getLocalizedField(object, keys) {
        if (!isObject(object)) return "";

        for (const key of keys) {
            if (object[key] !== undefined && object[key] !== null) {
                const result = localized(object[key]);

                if (result) return result;
            }
        }

        return "";
    }

    function getId(item) {
        return getFirstValue(item, [
            "id",
            "uuid",
            "slug",
            "chapter_id",
            "entry_id"
        ]);
    }

    function getChapterName(chapter, index) {
        const name = getLocalizedField(chapter, [
            "name",
            "title",
            "translated_name",
            "translation",
            "label"
        ]);

        if (name) return name;

        const number = toLocaleDigits(index + 1);

        return `${t("chapterNumber")} ${number}`;
    }

    function getEntryName(entry, index) {
        const name = getLocalizedField(entry, [
            "name",
            "title",
            "translated_name",
            "translation",
            "label"
        ]);

        if (name) return name;

        const number = toLocaleDigits(index + 1);

        return `${t("duaNumber")} ${number}`;
    }

    function toLocaleDigits(value) {
        const digits = {
            bn: "০১২৩৪৫৬৭৮৯",
            hi: "०१२३४५६७८९",
            en: "0123456789"
        };

        const set = digits[currentLanguage] || digits.bn;

        return String(value).replace(/\d/g, (digit) => {
            return set[Number(digit)];
        });
    }

    function normalizeLanguage(value) {
        const language = String(value || "bn")
            .trim()
            .toLowerCase();

        if (["en", "eng", "english"].includes(language)) {
            return "en";
        }

        if (["hi", "hin", "hindi"].includes(language)) {
            return "hi";
        }

        return "bn";
    }

    /* =====================================
       MAIN APP SETTINGS
    ===================================== */

    function readSettings() {
        let settings = {};

        for (const key of SETTINGS_KEYS) {
            try {
                const raw = localStorage.getItem(key);

                if (!raw) continue;

                const parsed = JSON.parse(raw);

                if (isObject(parsed)) {
                    settings = {
                        ...settings,
                        ...parsed
                    };
                }
            } catch (error) {
                console.warn(`Could not read ${key}:`, error);
            }
        }

        let languageValue;

        for (const key of LANGUAGE_KEYS) {
            if (settings[key] !== undefined) {
                languageValue = settings[key];
                break;
            }
        }

        currentLanguage = normalizeLanguage(languageValue);

        const darkValue = getFirstValue(settings, [
            "dark",
            "darkMode",
            "dark_mode",
            "isDarkMode"
        ]);

        isDarkMode =
            darkValue === true ||
            darkValue === 1 ||
            darkValue === "true" ||
            darkValue === "dark";

        applyTheme();
        applyLanguage();
    }

    function applyTheme() {
        document.body.classList.toggle("dark-mode", isDarkMode);

        document.documentElement.style.colorScheme =
            isDarkMode ? "dark" : "light";

        const themeMeta = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (themeMeta) {
            themeMeta.setAttribute(
                "content",
                isDarkMode ? "#081b13" : "#123d2c"
            );
        }
    }

    function applyLanguage() {
        document.documentElement.lang = currentLanguage;

        if (elements.heroTitle) {
            elements.heroTitle.textContent = t("title");
        }

        if (elements.heroSubtitle) {
            elements.heroSubtitle.textContent = t("subtitle");
        }

        if (elements.retryButton) {
            elements.retryButton.textContent = t("retry");
        }

        updateFooter();
    }

    function updateFooter() {
        if (!elements.footerText) return;

        const messages = {
            home: "footerHome",
            entries: "footerEntries",
            dua: "footerDua"
        };

        elements.footerText.textContent =
            t(messages[currentPage] || "footerHome");
    }

    /* =====================================
       DOM HELPERS
    ===================================== */

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }

        return element;
    }

    function clearElement(element) {
        if (element) {
            element.replaceChildren();
        }
    }

    function setHidden(element, hidden) {
        if (!element) return;

        element.classList.toggle("hidden", hidden);
        element.hidden = hidden;
    }

    function showLoading(message) {
        if (elements.loadingBox) {
            elements.loadingBox.textContent = message || t("loading");
            setHidden(elements.loadingBox, false);
        }

        setHidden(elements.errorBox, true);

        setHidden(elements.home, true);
        setHidden(elements.entryPage, true);
        setHidden(elements.duaPage, true);
    }

    function hideLoading() {
        setHidden(elements.loadingBox, true);
    }

    function showError(message, type = "chapters") {
        lastErrorType = type;

        hideLoading();

        setHidden(elements.home, true);
        setHidden(elements.entryPage, true);
        setHidden(elements.duaPage, true);

        if (elements.errorText) {
            elements.errorText.textContent =
                message || t("loadError");
        }

        setHidden(elements.errorBox, false);
    }

    function hideError() {
        setHidden(elements.errorBox, true);
    }

    function showEmpty(container, message) {
        clearElement(container);

        container.appendChild(
            createElement("div", "empty-message", message)
        );
    }

    /* =====================================
       API HELPERS
    ===================================== */

    async function fetchJSON(url, options = {}) {
        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 20000);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    Accept: "application/json",
                    ...(options.headers || {})
                }
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } finally {
            clearTimeout(timeout);
        }
    }

    function unwrapCollection(data, keys) {
        if (Array.isArray(data)) return data;

        if (!isObject(data)) return [];

        for (const key of keys) {
            if (Array.isArray(data[key])) {
                return data[key];
            }
        }

        if (isObject(data.data)) {
            for (const key of keys) {
                if (Array.isArray(data.data[key])) {
                    return data.data[key];
                }
            }
        }

        if (Array.isArray(data.data)) {
            return data.data;
        }

        if (Array.isArray(data.results)) {
            return data.results;
        }

        return [];
    }

    function unwrapObject(data) {
        if (!isObject(data)) return {};

        if (isObject(data.data)) {
            return data.data;
        }

        if (isObject(data.result)) {
            return data.result;
        }

        return data;
    }

    function buildCollectionURL(path) {
        return `${API_BASE}/collections/${encodeURIComponent(COLLECTION_ID)}${path}`;
    }

    async function loadChaptersFromAPI() {
        const urls = [
            buildCollectionURL("/chapters"),
            `${API_BASE}/chapters?collection_id=${encodeURIComponent(COLLECTION_ID)}`
        ];

        let lastError = null;

        for (const url of urls) {
            try {
                const data = await fetchJSON(url);

                const list = unwrapCollection(data, [
                    "chapters",
                    "items",
                    "results"
                ]);

                if (list.length || Array.isArray(data)) {
                    return list;
                }

                if (isObject(data) && data.data && Array.isArray(data.data)) {
                    return data.data;
                }
            } catch (error) {
                lastError = error;
            }
        }

        throw lastError || new Error("Unable to load chapters");
    }

    async function loadEntriesFromAPI(chapter) {
        const id = getId(chapter);

        const urls = [];

        if (id !== undefined) {
            urls.push(
                buildCollectionURL(
                    `/chapters/${encodeURIComponent(id)}/entries`
                )
            );

            urls.push(
                `${API_BASE}/chapters/${encodeURIComponent(id)}/entries`
            );
        }

        let lastError = null;

        for (const url of urls) {
            try {
                const data = await fetchJSON(url);

                const list = unwrapCollection(data, [
                    "entries",
                    "duas",
                    "items",
                    "results"
                ]);

                if (list.length || Array.isArray(data)) {
                    return list;
                }

                if (isObject(data) && data.data && Array.isArray(data.data)) {
                    return data.data;
                }
            } catch (error) {
                lastError = error;
            }
        }

        if (Array.isArray(chapter.entries)) {
            return chapter.entries;
        }

        if (Array.isArray(chapter.duas)) {
            return chapter.duas;
        }

        throw lastError || new Error("Unable to load entries");
    }

    async function loadEntryDetailsFromAPI(entry) {
        const id = getId(entry);

        if (id === undefined) {
            return entry;
        }

        const urls = [
            buildCollectionURL(
                `/entries/${encodeURIComponent(id)}`
            ),
            `${API_BASE}/entries/${encodeURIComponent(id)}`
        ];

        let lastError = null;

        for (const url of urls) {
            try {
                const data = await fetchJSON(url);
                return unwrapObject(data);
            } catch (error) {
                lastError = error;
            }
        }

        if (
            entry.variations ||
            entry.steps ||
            entry.items ||
            entry.dua
        ) {
            return entry;
        }

        throw lastError || new Error("Unable to load entry details");
    }

    /* =====================================
       HISTORY / PHONE BACK BUTTON
    ===================================== */

    function getPageState() {
        return {
            ibadatDuaPage: currentPage,
            chapterId: getId(selectedChapter) ?? null,
            entryId: getId(selectedEntry) ?? null
        };
    }

    function initializeHistory() {
        if (historyStateReady) return;

        historyStateReady = true;

        try {
            history.replaceState(
                {
                    ...(history.state || {}),
                    ...getPageState()
                },
                "",
                location.href
            );
        } catch (error) {
            console.warn("History initialization failed:", error);
        }
    }

    function pushPageHistory(page) {
        if (isRestoringHistory) return;

        try {
            history.pushState(
                {
                    ...(history.state || {}),
                    ibadatDuaPage: page,
                    chapterId: getId(selectedChapter) ?? null,
                    entryId: getId(selectedEntry) ?? null
                },
                "",
                location.href
            );
        } catch (error) {
            console.warn("Could not update page history:", error);
        }
    }

    function replacePageHistory(page) {
        try {
            history.replaceState(
                {
                    ...(history.state || {}),
                    ibadatDuaPage: page,
                    chapterId: getId(selectedChapter) ?? null,
                    entryId: getId(selectedEntry) ?? null
                },
                "",
                location.href
            );
        } catch (error) {
            console.warn("Could not replace page history:", error);
        }
    }

    async function handleSystemBack() {
        const state = history.state || {};
        const targetPage = state.ibadatDuaPage;

        isRestoringHistory = true;

        try {
            if (targetPage === "dua" && state.entryId !== null) {
                const entry = entries.find(
                    (item) => String(getId(item)) === String(state.entryId)
                );

                if (entry) {
                    await openDua(entry, {
                        addHistory: false,
                        restore: true
                    });

                    return;
                }
            }

            if (targetPage === "entries" && state.chapterId !== null) {
                const chapter = chapters.find(
                    (item) => String(getId(item)) === String(state.chapterId)
                );

                if (chapter) {
                    await openChapter(chapter, {
                        addHistory: false,
                        restore: true
                    });

                    return;
                }
            }

            await goHome({
                addHistory: false,
                restore: true
            });
        } finally {
            isRestoringHistory = false;
        }
    }

    window.addEventListener("popstate", () => {
        handleSystemBack().catch((error) => {
            console.error("Back navigation failed:", error);

            goHome({
                addHistory: false,
                restore: true
            });
        });
    });

    /* =====================================
       PAGE NAVIGATION
    ===================================== */

    function showPage(page) {
        currentPage = page;

        hideLoading();
        hideError();

        setHidden(elements.home, page !== "home");
        setHidden(elements.entryPage, page !== "entries");
        setHidden(elements.duaPage, page !== "dua");

        updateFooter();

        const activePage = {
            home: elements.home,
            entries: elements.entryPage,
            dua: elements.duaPage
        }[page];

        if (activePage) {
            activePage.scrollTop = 0;
        }

        if (page === "entries" && elements.entryList) {
            elements.entryList.scrollTop = 0;
        }

        if (page === "dua" && elements.duaContent) {
            elements.duaContent.scrollTop = 0;
        }
    }

    async function goHome(options = {}) {
        const addHistory = options.addHistory !== false;

        stopAudio();

        selectedChapter = null;
        selectedEntry = null;

        showPage("home");

        if (addHistory) {
            pushPageHistory("home");
        } else {
            replacePageHistory("home");
        }

        if (!chapters.length) {
            await loadChapters();
        } else {
            renderChapters();
        }
    }

    async function openChapter(chapter, options = {}) {
        const addHistory = options.addHistory !== false;

        if (!chapter) return;

        stopAudio();

        selectedChapter = chapter;
        selectedEntry = null;
        entries = [];

        showPage("entries");

        if (addHistory) {
            pushPageHistory("entries");
        } else {
            replacePageHistory("entries");
        }

        showLoading(t("loadingEntries"));

        try {
            const list = await loadEntriesFromAPI(chapter);

            entries = list;

            hideLoading();
            hideError();

            showPage("entries");
            renderEntries();
        } catch (error) {
            console.error("Entries loading failed:", error);

            showError(
                error.name === "AbortError"
                    ? t("networkError")
                    : t("entriesError"),
                "entries"
            );
        }
    }

    async function openDua(entry, options = {}) {
        const addHistory = options.addHistory !== false;

        if (!entry) return;

        stopAudio();

        selectedEntry = entry;

        showPage("dua");

        if (addHistory) {
            pushPageHistory("dua");
        } else {
            replacePageHistory("dua");
        }

        showLoading(t("loadingDua"));

        try {
            const details = await loadEntryDetailsFromAPI(entry);

            if (selectedEntry !== entry) return;

            currentDuas = extractDuas(details);

            hideLoading();
            hideError();

            showPage("dua");
            renderDua(details);
        } catch (error) {
            console.error("Dua details loading failed:", error);

            showError(
                error.name === "AbortError"
                    ? t("networkError")
                    : t("duaError"),
                "dua"
            );
        }
    }

    /* =====================================
       CHAPTER LIST
    ===================================== */

    function renderChapters() {
        const container = elements.chapterList;

        if (!container) return;

        clearElement(container);

        if (!chapters.length) {
            showEmpty(container, t("emptyChapters"));
            return;
        }

        chapters.forEach((chapter, index) => {
            const button = createElement(
                "button",
                "chapter-item"
            );

            button.type = "button";

            const number = createElement(
                "span",
                "chapter-number",
                toLocaleDigits(index + 1)
            );

            const name = createElement(
                "span",
                "chapter-name",
                getChapterName(chapter, index)
            );

            const arrow = createElement(
                "span",
                "chapter-arrow",
                "›"
            );

            arrow.setAttribute("aria-hidden", "true");

            button.append(number, name, arrow);

            button.addEventListener("click", () => {
                openChapter(chapter);
            });

            container.appendChild(button);
        });
    }

    /* =====================================
       ENTRY LIST
    ===================================== */

    function renderEntries() {
        const container = elements.entryList;

        if (!container) return;

        clearElement(container);

        if (!entries.length) {
            showEmpty(container, t("emptyEntries"));
            return;
        }

        entries.forEach((entry, index) => {
            const button = createElement(
                "button",
                "entry-item"
            );

            button.type = "button";

            const number = createElement(
                "span",
                "entry-number",
                toLocaleDigits(index + 1)
            );

            const name = createElement(
                "span",
                "entry-name",
                getEntryName(entry, index)
            );

            const arrow = createElement(
                "span",
                "entry-arrow",
                "›"
            );

            arrow.setAttribute("aria-hidden", "true");

            button.append(number, name, arrow);

            button.addEventListener("click", () => {
                openDua(entry);
            });

            container.appendChild(button);
        });
    }

    /* =====================================
       DUA CONTENT EXTRACTION
    ===================================== */

    function extractDuas(details) {
        if (!isObject(details)) return [];

        if (Array.isArray(details.variations)) {
            const result = [];

            details.variations.forEach((variation) => {
                asArray(variation.steps).forEach((step) => {
                    asArray(step.items).forEach((item) => {
                        result.push({
                            ...item,
                            recordings: asArray(step.recordings),
                            variation
                        });
                    });
                });
            });

            if (result.length) return result;
        }

        if (Array.isArray(details.steps)) {
            const result = [];

            details.steps.forEach((step) => {
                asArray(step.items).forEach((item) => {
                    result.push({
                        ...item,
                        recordings: asArray(step.recordings)
                    });
                });
            });

            if (result.length) return result;
        }

        if (Array.isArray(details.items)) {
            return details.items;
        }

        if (Array.isArray(details.duas)) {
            return details.duas;
        }

        if (details.dua || details.arabic || details.text) {
            return [details];
        }

        return [];
    }

    function extractAudioList(details) {
        const recordings = [];

        if (!isObject(details)) return recordings;

        const addRecordings = (items) => {
            asArray(items).forEach((item) => {
                const url = getFirstValue(item, [
                    "url",
                    "audio_url",
                    "src",
                    "file",
                    "path"
                ]);

                if (url) {
                    recordings.push({
                        url: String(url),
                        title: localized(
                            getFirstValue(item, [
                                "title",
                                "name",
                                "label"
                            ])
                        )
                    });
                }
            });
        };

        if (Array.isArray(details.variations)) {
            details.variations.forEach((variation) => {
                asArray(variation.steps).forEach((step) => {
                    addRecordings(step.recordings);
                });
            });
        }

        addRecordings(details.recordings);
        addRecordings(details.audios);
        addRecordings(details.audio);

        currentDuas.forEach((dua) => {
            addRecordings(dua.recordings);
            addRecordings(dua.audios);
        });

        const unique = new Map();

        recordings.forEach((recording) => {
            if (!unique.has(recording.url)) {
                unique.set(recording.url, recording);
            }
        });

        return Array.from(unique.values());
    }

    /* =====================================
       DUA CONTENT RENDERING
    ===================================== */

    function getArabic(item) {
        return getLocalizedField(item, [
            "dua",
            "arabic",
            "arabic_text",
            "text_ar",
            "text",
            "content"
        ]);
    }

    function getTransliteration(item) {
        return getLocalizedField(item, [
            "transliteration",
            "transliteration_text",
            "pronunciation",
            "phonetic",
            "roman"
        ]);
    }

    function getTranslation(item) {
        return getLocalizedField(item, [
            "translation",
            "meaning",
            "translated_text",
            "text_translation",
            "translation_text"
        ]);
    }

    function getReference(item) {
        return getLocalizedField(item, [
            "reference",
            "source",
            "references",
            "footnote",
            "reference_text"
        ]);
    }

    function appendDuaField(card, label, value, className, rtl = false) {
        if (!value) return;

        const section = createElement(
            "div",
            `${className}-section`
        );

        const heading = createElement(
            "div",
            className === "dua-arabic"
                ? "dua-label arabic-label"
                : className === "dua-transliteration"
                    ? "dua-label pronunciation-label"
                    : className === "dua-translation"
                        ? "dua-label translation-label"
                        : "dua-label reference-label",
            label
        );

        const paragraph = createElement(
            "p",
            className,
            value
        );

        if (rtl) {
            paragraph.setAttribute("dir", "rtl");
            paragraph.setAttribute("lang", "ar");
        }

        section.append(heading, paragraph);
        card.appendChild(section);
    }

    function renderDua(details) {
        const container = elements.duaContent;

        if (!container) return;

        clearElement(container);

        const items = currentDuas.length
            ? currentDuas
            : extractDuas(details);

        if (!items.length) {
            showEmpty(container, t("emptyDua"));
            return;
        }

        items.forEach((item) => {
            const card = createElement("article", "dua-card");

            const arabic = getArabic(item);
            const transliteration = getTransliteration(item);
            const translation = getTranslation(item);
            const reference = getReference(item);

            appendDuaField(
                card,
                t("arabic"),
                arabic,
                "dua-arabic",
                true
            );

            appendDuaField(
                card,
                t("pronunciation"),
                transliteration,
                "dua-transliteration"
            );

            appendDuaField(
                card,
                t("meaning"),
                translation,
                "dua-translation"
            );

            appendDuaField(
                card,
                t("reference"),
                reference,
                "dua-reference"
            );

            if (card.childElementCount) {
                container.appendChild(card);
            }
        });

        if (!container.childElementCount) {
            showEmpty(container, t("emptyDua"));
            return;
        }

        const audioList = extractAudioList(details);

        if (audioList.length) {
            createAudioPlayer(audioList);
        }
    }

    /* =====================================
       AUDIO PLAYER
    ===================================== */

    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();

            currentAudio.removeAttribute("src");
            currentAudio.load();

            currentAudio = null;
        }

        if (audioPlayer) {
            audioPlayer.remove();
            audioPlayer = null;
        }

        currentAudioIndex = 0;
    }

    function createAudioPlayer(audioList) {
        if (!elements.duaContent || !audioList.length) return;

        audioList = audioList.filter((item) => {
            return item && item.url;
        });

        if (!audioList.length) return;

        const player = createElement(
            "section",
            "dua-audio-player"
        );

        player.id = "duaAudioPlayer";

        const previousButton = createElement(
            "button",
            "audio-control",
            "⏮"
        );

        previousButton.type = "button";
        previousButton.setAttribute("aria-label", t("previous"));
        previousButton.title = t("previous");

        const playButton = createElement(
            "button",
            "audio-control audio-play-button",
            "▶"
        );

        playButton.type = "button";
        playButton.setAttribute("aria-label", t("play"));
        playButton.title = t("play");

        const nextButton = createElement(
            "button",
            "audio-control",
            "⏭"
        );

        nextButton.type = "button";
        nextButton.setAttribute("aria-label", t("next"));
        nextButton.title = t("next");

        const progressWrap = createElement(
            "div",
            "audio-progress-wrap"
        );

        const progress = document.createElement("input");

        progress.type = "range";
        progress.min = "0";
        progress.max = "100";
        progress.value = "0";
        progress.step = "0.1";
        progress.className = "audio-track";
        progress.setAttribute("aria-label", t("audio"));

        const time = createElement("div", "audio-time");

        const currentTimeText = createElement("span", "", "0:00");
        const durationText = createElement("span", "", "0:00");

        time.append(currentTimeText, durationText);
        progressWrap.append(progress, time);

        player.append(
            previousButton,
            playButton,
            nextButton,
            progressWrap
        );

        elements.duaContent.appendChild(player);

        audioPlayer = player;

        currentAudio = new Audio();
        currentAudio.preload = "metadata";

        function formatTime(seconds) {
            if (!Number.isFinite(seconds) || seconds < 0) {
                return "0:00";
            }

            const minutes = Math.floor(seconds / 60);
            const remaining = Math.floor(seconds % 60);

            return `${minutes}:${String(remaining).padStart(2, "0")}`;
        }

        function updatePlayButton() {
            const playing = currentAudio && !currentAudio.paused;

            playButton.textContent = playing ? "Ⅱ" : "▶";
            playButton.setAttribute(
                "aria-label",
                playing ? t("pause") : t("play")
            );

            playButton.title = playing ? t("pause") : t("play");
        }

        function loadTrack(index, autoplay = false) {
            if (!audioList.length || !currentAudio) return;

            currentAudioIndex =
                (index + audioList.length) % audioList.length;

            const track = audioList[currentAudioIndex];

            currentAudio.pause();
            currentAudio.src = track.url;
            currentAudio.load();

            progress.value = "0";
            currentTimeText.textContent = "0:00";
            durationText.textContent = "0:00";

            updatePlayButton();

            if (autoplay) {
                currentAudio.play().catch((error) => {
                    console.warn("Audio playback failed:", error);
                    showAudioMessage(t("audioError"));
                    updatePlayButton();
                });
            }
        }

        previousButton.addEventListener("click", () => {
            loadTrack(currentAudioIndex - 1, true);
        });

        nextButton.addEventListener("click", () => {
            loadTrack(currentAudioIndex + 1, true);
        });

        playButton.addEventListener("click", async () => {
            if (!currentAudio) return;

            if (currentAudio.paused) {
                try {
                    await currentAudio.play();
                } catch (error) {
                    console.warn("Audio playback failed:", error);
                    showAudioMessage(t("audioError"));
                }
            } else {
                currentAudio.pause();
            }

            updatePlayButton();
        });

        progress.addEventListener("input", () => {
            if (
                currentAudio &&
                Number.isFinite(currentAudio.duration) &&
                currentAudio.duration > 0
            ) {
                currentAudio.currentTime =
                    (Number(progress.value) / 100) *
                    currentAudio.duration;
            }
        });

        currentAudio.addEventListener("loadedmetadata", () => {
            durationText.textContent = formatTime(
                currentAudio.duration
            );
        });

        currentAudio.addEventListener("timeupdate", () => {
            if (
                !currentAudio ||
                !Number.isFinite(currentAudio.duration) ||
                currentAudio.duration <= 0
            ) {
                return;
            }

            progress.value = String(
                (currentAudio.currentTime / currentAudio.duration) * 100
            );

            currentTimeText.textContent = formatTime(
                currentAudio.currentTime
            );
        });

        currentAudio.addEventListener("play", updatePlayButton);
        currentAudio.addEventListener("pause", updatePlayButton);

        currentAudio.addEventListener("ended", () => {
            if (currentAudioIndex < audioList.length - 1) {
                loadTrack(currentAudioIndex + 1, true);
            } else {
                updatePlayButton();
            }
        });

        currentAudio.addEventListener("error", () => {
            updatePlayButton();
        });

        loadTrack(0, false);
    }

    function showAudioMessage(message) {
        if (!elements.duaContent) return;

        let notice = $("duaAudioNotice");

        if (!notice) {
            notice = createElement(
                "div",
                "empty-message"
            );

            notice.id = "duaAudioNotice";

            elements.duaContent.appendChild(notice);
        }

        notice.textContent = message;
    }

    /* =====================================
       LOADING CHAPTERS
    ===================================== */

    async function loadChapters() {
        const version = ++requestVersion;

        showLoading(t("loadingChapters"));

        try {
            const list = await loadChaptersFromAPI();

            if (version !== requestVersion) return;

            chapters = list;

            hideLoading();
            hideError();

            showPage("home");
            renderChapters();

            replacePageHistory("home");
        } catch (error) {
            if (version !== requestVersion) return;

            console.error("Chapter loading failed:", error);

            showError(
                error.name === "AbortError"
                    ? t("networkError")
                    : t("chaptersError"),
                "chapters"
            );
        }
    }

    /* =====================================
       RETRY
    ===================================== */

    async function retryLastRequest() {
        hideError();

        if (lastErrorType === "entries" && selectedChapter) {
            await openChapter(selectedChapter, {
                addHistory: false
            });

            return;
        }

        if (lastErrorType === "dua" && selectedEntry) {
            await openDua(selectedEntry, {
                addHistory: false
            });

            return;
        }

        await loadChapters();
    }

    /* =====================================
       LANGUAGE / THEME CHANGE LISTENERS
       Settings are controlled by the main app.
       This page does not create a language
       or theme switch of its own.
    ===================================== */

    window.addEventListener("storage", (event) => {
        if (
            event.key &&
            !SETTINGS_KEYS.includes(event.key)
        ) {
            return;
        }

        const previousLanguage = currentLanguage;
        const previousDarkMode = isDarkMode;

        readSettings();

        if (
            previousLanguage !== currentLanguage ||
            previousDarkMode !== isDarkMode
        ) {
            refreshVisibleContent();
        }
    });

    window.addEventListener("pageshow", () => {
        readSettings();
        refreshVisibleContent();
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            readSettings();
            refreshVisibleContent();
        }
    });

    function refreshVisibleContent() {
        applyLanguage();
        applyTheme();

        if (currentPage === "home") {
            renderChapters();
        } else if (currentPage === "entries") {
            renderEntries();
        } else if (currentPage === "dua" && selectedEntry) {
            /*
             * Keep the current content and audio intact.
             * The language/theme settings update immediately.
             */
            updateFooter();
        }
    }

    /* =====================================
       INITIALIZATION
    ===================================== */

    function bindEvents() {
        if (elements.retryButton) {
            elements.retryButton.addEventListener(
                "click",
                retryLastRequest
            );
        }

        /*
         * There are intentionally no in-page back buttons.
         * Android/browser back is handled through popstate.
         */
    }

    async function init() {
        readSettings();
        bindEvents();
        initializeHistory();

        currentPage = "home";
        updateFooter();

        await loadChapters();
    }

    init().catch((error) => {
        console.error("Du'a app initialization failed:", error);

        showError(t("loadError"), "chapters");
    });

})();
