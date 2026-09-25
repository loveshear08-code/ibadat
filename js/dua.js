const API_BASE = "https://api.opendua.org/v2";
const COLLECTION_ID = "hisn-al-muslim";

const TEXT = {
    bn: {
        title: "দোয়া",
        intro: "দোয়া",
        loading: "দোয়া লোড হচ্ছে...",
        retry: "আবার চেষ্টা করুন",
        error: "দোয়া লোড করা যাচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করুন।",
        noData: "কোনো দোয়া পাওয়া যায়নি।",
        part: "অংশ",
        previous: "আগের অংশ",
        next: "পরের অংশ",
        play: "প্লে",
        pause: "পজ",
        arabic: "আরবি",
        pronunciation: "উচ্চারণ",
        meaning: "অর্থ",
        reference: "সূত্র"
    },

    en: {
        title: "Dua",
        intro: "Dua",
        loading: "Loading duas...",
        retry: "Try Again",
        error: "Unable to load duas. Please check your internet connection.",
        noData: "No dua found.",
        part: "Part",
        previous: "Previous part",
        next: "Next part",
        play: "Play",
        pause: "Pause",
        arabic: "Arabic",
        pronunciation: "Pronunciation",
        meaning: "Meaning",
        reference: "Reference"
    },

    hi: {
        title: "दुआ",
        intro: "दुआ",
        loading: "दुआ लोड हो रही है...",
        retry: "फिर प्रयास करें",
        error: "दुआ लोड नहीं हो सकी। कृपया इंटरनेट कनेक्शन जाँचें।",
        noData: "कोई दुआ नहीं मिली।",
        part: "भाग",
        previous: "पिछला भाग",
        next: "अगला भाग",
        play: "प्ले",
        pause: "रोकें",
        arabic: "अरबी",
        pronunciation: "उच्चारण",
        meaning: "अर्थ",
        reference: "स्रोत"
    }
};


/* =========================================================
   GLOBAL STATE
========================================================= */

let lang = "bn";

let chapters = [];
let entries = [];

let chapterIndex = -1;
let entryIndex = -1;
let partIndex = -1;

let entryParts = [];

let currentChapterTitle = "";

let currentAudio = null;

let playerCreated = false;

let busy = false;

let requestId = 0;

const entryCache = new Map();


/* =========================================================
   SETTINGS
========================================================= */

function settings() {
    try {
        const appRaw = localStorage.getItem("appSettings");

        if (appRaw) {
            const appSettings = JSON.parse(appRaw);

            if (appSettings && typeof appSettings === "object") {
                return appSettings;
            }
        }

        const oldRaw = localStorage.getItem("ibadatSettings");

        if (oldRaw) {
            const oldSettings = JSON.parse(oldRaw);

            if (oldSettings && typeof oldSettings === "object") {
                return oldSettings;
            }
        }
    } catch (error) {
        console.warn("Settings error:", error);
    }

    return {};
}


function getLanguage() {

    try {

        const appRaw = localStorage.getItem("appSettings");

        if (appRaw) {

            const appSettings = JSON.parse(appRaw);

            const selectedLanguage =
                appSettings?.lang ||
                appSettings?.language;

            if (["bn", "en", "hi"].includes(selectedLanguage)) {
                return selectedLanguage;
            }
        }


        const oldRaw = localStorage.getItem("ibadatSettings");

        if (oldRaw) {

            const oldSettings = JSON.parse(oldRaw);

            const selectedLanguage =
                oldSettings?.lang ||
                oldSettings?.language;

            if (["bn", "en", "hi"].includes(selectedLanguage)) {
                return selectedLanguage;
            }
        }

    } catch (error) {

        console.warn("Language error:", error);

    }

    return "bn";
}


/* =========================================================
   THEME
========================================================= */

function applyTheme() {

    const currentSettings = settings();

    document.body.classList.toggle(
        "dark-mode",
        !!currentSettings.dark
    );
}


/* =========================================================
   BASIC UI HELPERS
========================================================= */

function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value ?? "";
    }
}


function hidePages() {

    [
        "duaHome",
        "entryPage",
        "duaPage"
    ].forEach(id => {

        document
            .getElementById(id)
            ?.classList.add("hidden");

    });
}


function show(id) {

    document
        .getElementById(id)
        ?.classList.remove("hidden");
}


/* =========================================================
   LOCALIZATION HELPERS
========================================================= */

function localized(value, language = lang) {

    if (typeof value === "string") {
        return value.trim();
    }


    if (Array.isArray(value)) {

        for (const item of value) {

            const result = localized(
                item,
                language
            );

            if (result) {
                return result;
            }
        }

        return "";
    }


    if (!value || typeof value !== "object") {
        return "";
    }


    const languageKeys = [

        language,

        `${language}-IN`,

        `${language}-BD`,

        "en",

        "bn",

        "hi"

    ];


    for (const key of languageKeys) {

        if (
            typeof value[key] === "string" &&
            value[key].trim()
        ) {

            return value[key].trim();

        }

    }


    return "";
}


function pick(obj, keys, language = lang) {

    for (const key of keys) {

        const result = localized(
            obj?.[key],
            language
        );

        if (result) {
            return result;
        }

    }

    return "";
}


/* =========================================================
   TITLES
========================================================= */

function chapterTitle(chapter, index) {

    return (
        pick(
            chapter,
            [
                "title",
                "name",
                "chapterTitle",
                "chapter_name"
            ]
        ) ||
        `${TEXT[lang].title} ${index + 1}`
    );
}


function entryTitle(entry, index) {

    return (
        pick(
            entry,
            [
                "title",
                "name",
                "entryTitle",
                "entry_title"
            ]
        ) ||
        `${TEXT[lang].title} ${index + 1}`
    );
}


/* =========================================================
   API HELPERS
========================================================= */

function listFrom(data, names) {

    if (Array.isArray(data)) {
        return data;
    }


    for (const name of names) {

        if (Array.isArray(data?.[name])) {
            return data[name];
        }


        if (
            Array.isArray(
                data?.data?.[name]
            )
        ) {
            return data.data[name];
        }

    }


    if (Array.isArray(data?.data)) {
        return data.data;
    }


    return [];
}


async function api(url) {

    const response = await fetch(
        url,
        {
            headers: {
                Accept: "application/json"
            },
            cache: "no-store"
        }
    );


    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}`
        );
    }


    return response.json();
}


/* =========================================================
   AUDIO OBJECT
========================================================= */

function createAudio() {

    if (currentAudio) {
        return;
    }


    currentAudio = new Audio();

    currentAudio.preload = "auto";


    currentAudio.addEventListener(
        "timeupdate",
        updateProgress
    );


    currentAudio.addEventListener(
        "loadedmetadata",
        updateDuration
    );


    currentAudio.addEventListener(
        "ended",
        nextAudio
    );


    currentAudio.addEventListener(
        "play",
        () => updatePlayButton(true)
    );


    currentAudio.addEventListener(
        "pause",
        () => updatePlayButton(false)
    );


    currentAudio.addEventListener(
        "error",
        () => updatePlayButton(false)
    );
}


/* =========================================================
   STOP AUDIO
========================================================= */

function stopAudio() {

    requestId++;

    busy = false;


    if (!currentAudio) {
        return;
    }


    currentAudio.pause();

    currentAudio.removeAttribute("src");

    currentAudio.load();


    updatePlayButton(false);

    resetProgress();
}


/* =========================================================
   FIND ALL AUDIO PARTS
========================================================= */

function audioParts(data) {

    const output = [];


    for (
        const variation of
        data?.variations || []
    ) {

        for (
            const step of
            variation?.steps || []
        ) {

            for (
                const recording of
                step?.recordings || []
            ) {

                if (recording?.url) {

                    output.push({
                        url: recording.url
                    });

                }

            }

        }

    }


    return output;
}


/* =========================================================
   LOAD SINGLE ENTRY
========================================================= */

async function loadEntry(index) {

    if (
        index < 0 ||
        index >= entries.length
    ) {
        return null;
    }


    const cached = entryCache.get(index);


    if (cached) {
        return cached;
    }


    const id =
        entries[index]?.id ||
        entries[index]?.entryId;


    if (!id) {
        return null;
    }


    const data = await api(
        `${API_BASE}/entries/${encodeURIComponent(id)}`
    );


    const value = {

        data,

        parts: audioParts(data)

    };


    entryCache.set(
        index,
        value
    );


    return value;
}


/* =========================================================
   GET AUDIO PARTS FOR ENTRY
========================================================= */

async function partsFor(index) {

    const item = await loadEntry(index);

    return item?.parts || [];
}


/* =========================================================
   PLAY SPECIFIC PART
========================================================= */

async function playPart(
    index,
    part,
    autoplay = true
) {

    if (busy) {
        return false;
    }


    createAudio();


    const currentRequest = ++requestId;

    busy = true;


    try {

        const item =
            await loadEntry(index);


        if (
            !item ||
            currentRequest !== requestId ||
            !item.parts[part]
        ) {

            return false;

        }


        entryIndex = index;

        partIndex = part;

        entryParts = item.parts;


        renderDua(item.data);


        const title =
            entryTitle(
                entries[index],
                index
            );


        setText(
            "duaPageTitle",
            title
        );


        updatePlayer(
            title,
            part + 1,
            entryParts.length
        );


        resetProgress();


        currentAudio.pause();


        currentAudio.src =
            item.parts[part].url;


        currentAudio.load();


        if (autoplay) {

            await currentAudio.play();

        }


        return true;

    } catch (error) {

        console.error(
            "Dua audio:",
            error
        );

        return false;

    } finally {

        busy = false;

    }
}


/* =========================================================
   NEXT AUDIO
========================================================= */

async function nextAudio() {

    if (entryIndex < 0) {
        return false;
    }


    /* Next part of same Dua */

    for (
        let part = partIndex + 1;
        part < entryParts.length;
        part++
    ) {

        if (
            await playPart(
                entryIndex,
                part
            )
        ) {

            return true;

        }

    }


    /* Next Dua in same chapter */

    for (
        let index = entryIndex + 1;
        index < entries.length;
        index++
    ) {

        const parts =
            await partsFor(index);


        if (
            parts.length &&
            await playPart(index, 0)
        ) {

            return true;

        }

    }


    /* Next chapter */

    return nextChapter();
}


/* =========================================================
   PREVIOUS AUDIO
========================================================= */

async function previousAudio() {

    if (entryIndex < 0) {
        return false;
    }


    /* Previous part of same Dua */

    if (partIndex > 0) {

        return playPart(
            entryIndex,
            partIndex - 1
        );

    }


    /* Previous Dua */

    for (
        let index = entryIndex - 1;
        index >= 0;
        index--
    ) {

        const parts =
            await partsFor(index);


        if (parts.length) {

            return playPart(
                index,
                parts.length - 1
            );

        }

    }


    /* Previous chapter */

    return previousChapter();
}


/* =========================================================
   PLAY / PAUSE
========================================================= */

async function togglePlay() {

    createAudio();


    if (!currentAudio.src) {

        if (entryIndex >= 0) {

            return playPart(
                entryIndex,
                0
            );

        }


        return nextChapter();

    }


    if (currentAudio.paused) {

        try {

            await currentAudio.play();

        } catch (error) {

            console.error(error);

        }

    } else {

        currentAudio.pause();

    }

}


/* =========================================================
   LOAD CHAPTER ENTRIES
========================================================= */

async function chapterEntries(index) {

    const chapter =
        chapters[index];


    const id =
        chapter?.id ||
        chapter?.chapterId ||
        chapter?.slug;


    if (!id) {
        return [];
    }


    const data = await api(
        `${API_BASE}/collections/${COLLECTION_ID}/chapters/${encodeURIComponent(id)}/entries`
    );


    return listFrom(
        data,
        [
            "entries",
            "items",
            "results"
        ]
    );
}


/* =========================================================
   USE CHAPTER
========================================================= */

async function useChapter(index) {

    try {

        const list =
            await chapterEntries(index);


        if (!list.length) {
            return false;
        }


        chapterIndex = index;

        entries = list;

        entryCache.clear();


        entryIndex = -1;

        partIndex = -1;

        entryParts = [];


        currentChapterTitle =
            chapterTitle(
                chapters[index],
                index
            );


        return true;

    } catch (error) {

        console.error(
            "Chapter:",
            error
        );

        return false;

    }
}


/* =========================================================
   NEXT CHAPTER
========================================================= */

async function nextChapter() {

    for (
        let index = chapterIndex + 1;
        index < chapters.length;
        index++
    ) {

        if (!await useChapter(index)) {
            continue;
        }


        for (
            let entry = 0;
            entry < entries.length;
            entry++
        ) {

            if (
                (await partsFor(entry)).length
            ) {

                return playPart(
                    entry,
                    0
                );

            }

        }

    }


    stopAudio();

    return false;
}


/* =========================================================
   PREVIOUS CHAPTER
========================================================= */

async function previousChapter() {

    for (
        let index = chapterIndex - 1;
        index >= 0;
        index--
    ) {

        if (!await useChapter(index)) {
            continue;
        }


        for (
            let entry = entries.length - 1;
            entry >= 0;
            entry--
        ) {

            const parts =
                await partsFor(entry);


            if (parts.length) {

                return playPart(
                    entry,
                    parts.length - 1
                );

            }

        }

    }


    return false;
}


/* =========================================================
   AUDIO PLAYER
========================================================= */

function createPlayer() {

    if (playerCreated) {
        return;
    }


    playerCreated = true;


    const player =
        document.createElement("div");


    player.id =
        "duaAudioPlayer";


    player.className =
        "dua-audio-player hidden";


    player.innerHTML = `

        <div
            class="dua-audio-title audio-player-title"
            id="audioTitle">
        </div>

        <div
            class="dua-audio-part audio-player-part"
            id="audioPart">
        </div>

        <div
            class="dua-audio-progress-wrap audio-progress">

            <input
                id="audioProgress"
                type="range"
                min="0"
                max="100"
                value="0"
                step="0.1">

        </div>

        <div
            class="dua-audio-time audio-player-time-row">

            <span id="audioCurrentTime">
                0:00
            </span>

            <span id="audioDuration">
                0:00
            </span>

        </div>

        <div
            class="dua-audio-controls audio-player-controls">

            <button
                type="button"
                id="audioPrevious">
                ⏮
            </button>

            <button
                type="button"
                id="audioPlay">
                ▶
            </button>

            <button
                type="button"
                id="audioNext">
                ⏭
            </button>

        </div>
    `;


    document.body.appendChild(player);


    document
        .getElementById("audioPrevious")
        ?.addEventListener(
            "click",
            previousAudio
        );


    document
        .getElementById("audioNext")
        ?.addEventListener(
            "click",
            nextAudio
        );


    document
        .getElementById("audioPlay")
        ?.addEventListener(
            "click",
            togglePlay
        );


    document
        .getElementById("audioProgress")
        ?.addEventListener(
            "input",
            event => {

                if (
                    currentAudio?.duration
                ) {

                    currentAudio.currentTime =
                        event.target.value /
                        100 *
                        currentAudio.duration;

                }

            }
        );
}


/* =========================================================
   UPDATE PLAYER
========================================================= */

function updatePlayer(
    title,
    part,
    total
) {

    show("duaAudioPlayer");


    setText(
        "audioTitle",
        title
    );


    setText(
        "audioPart",
        `${TEXT[lang].part} ${part} / ${total}`
    );


    updatePlayButton(
        !!currentAudio &&
        !currentAudio.paused
    );
}


/* =========================================================
   PLAY BUTTON
========================================================= */

function updatePlayButton(playing) {

    const button =
        document.getElementById(
            "audioPlay"
        );


    if (!button) {
        return;
    }


    button.textContent =
        playing
            ? "❚❚"
            : "▶";


    button.setAttribute(
        "aria-label",
        playing
            ? TEXT[lang].pause
            : TEXT[lang].play
    );
}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    if (!currentAudio) {
        return;
    }


    const progress =
        document.getElementById(
            "audioProgress"
        );


    if (
        progress &&
        currentAudio.duration
    ) {

        progress.value =
            currentAudio.currentTime /
            currentAudio.duration *
            100;

    }


    setText(
        "audioCurrentTime",
        time(
            currentAudio.currentTime
        )
    );
}


/* =========================================================
   AUDIO DURATION
========================================================= */

function updateDuration() {

    setText(
        "audioDuration",
        time(
            currentAudio?.duration
        )
    );
}


/* =========================================================
   RESET PROGRESS
========================================================= */

function resetProgress() {

    const progress =
        document.getElementById(
            "audioProgress"
        );


    if (progress) {
        progress.value = 0;
    }


    setText(
        "audioCurrentTime",
        "0:00"
    );


    setText(
        "audioDuration",
        "0:00"
    );
}


/* =========================================================
   FORMAT TIME
========================================================= */

function time(seconds) {

    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }


    return (
        `${Math.floor(seconds / 60)}:` +
        `${String(
            Math.floor(seconds % 60)
        ).padStart(2, "0")}`
    );
}


/* =========================================================
   CHAPTER LIST
========================================================= */

function renderChapters() {

    const box =
        document.getElementById(
            "chapterList"
        );


    if (!box) {
        return;
    }


    box.innerHTML = "";


    chapters.forEach(
        (chapter, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";


            button.className =
                "chapter-item chapter-card";


            button.textContent =
                chapterTitle(
                    chapter,
                    index
                );


            button.addEventListener(
                "click",
                () => openChapter(index)
            );


            box.appendChild(button);

        }
    );
}


/* =========================================================
   OPEN CHAPTER
========================================================= */

async function openChapter(index) {

    stopAudio();


    if (
        !await useChapter(index)
    ) {

        return showError();

    }


    hidePages();


    setText(
        "entryPageTitle",
        currentChapterTitle
    );


    renderEntries();


    show("entryPage");
}


/* =========================================================
   ENTRY LIST
========================================================= */

function renderEntries() {

    const box =
        document.getElementById(
            "entryList"
        );


    if (!box) {
        return;
    }


    box.innerHTML = "";


    entries.forEach(
        (entry, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";


            button.className =
                "entry-item entry-card";


            button.textContent =
                entryTitle(
                    entry,
                    index
                );


            button.addEventListener(
                "click",
                () => openEntry(index)
            );


            box.appendChild(button);

        }
    );
}


/* =========================================================
   OPEN ENTRY
========================================================= */

async function openEntry(index) {

    stopAudio();


    entryIndex = index;

    partIndex = -1;

    entryParts = [];


    hidePages();

    show("duaPage");


    try {

        const item =
            await loadEntry(index);


        if (!item) {
            throw new Error(
                "ENTRY_EMPTY"
            );
        }


        entryParts =
            item.parts;


        setText(
            "duaPageTitle",
            entryTitle(
                entries[index],
                index
            )
        );


        renderDua(item.data);


        if (entryParts.length) {

            updatePlayer(
                entryTitle(
                    entries[index],
                    index
                ),
                0,
                entryParts.length
            );

        } else {

            document
                .getElementById(
                    "duaAudioPlayer"
                )
                ?.classList.add(
                    "hidden"
                );

        }

    } catch (error) {

        console.error(error);

        showError();

    }
}


/* =========================================================
   RENDER DUA
========================================================= */

function renderDua(data) {

    const box =
        document.getElementById(
            "duaContent"
        );


    if (!box) {
        return;
    }


    box.innerHTML = "";


    let count = 0;


    for (
        const variation of
        data?.variations || []
    ) {

        for (
            const step of
            variation?.steps || []
        ) {

            for (
                const item of
                step?.items || []
            ) {

                if (!item?.dua) {
                    continue;
                }


                const card =
                    duaCard(item.dua);


                if (card) {

                    box.appendChild(card);

                    count++;

                }

            }

        }

    }


    if (!count) {

        box.innerHTML =
            `<div class="status-box">
                ${TEXT[lang].noData}
            </div>`;

    }
}


/* =========================================================
   SINGLE DUA CARD
========================================================= */

function duaCard(dua) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "dua-card";


    const arabic =
        dua?.arabic ||
        dua?.textArabic ||
        dua?.text_ar ||
        "";


    const pronunciation =
        pick(
            dua,
            [
                "transliteration",
                "transliterationText",
                "transliteration_en"
            ],
            "en"
        );


    const meaning =
        pick(
            dua,
            [
                "translation",
                "meaning",
                "translationText",
                "meaningText"
            ],
            lang
        );


    const reference =
        referenceText(dua);


    addField(
        card,
        TEXT[lang].arabic,
        arabic,
        "dua-arabic"
    );


    addField(
        card,
        TEXT[lang].pronunciation,
        pronunciation,
        "dua-transliteration"
    );


    addField(
        card,
        TEXT[lang].meaning,
        meaning,
        "dua-translation"
    );


    addField(
        card,
        TEXT[lang].reference,
        reference,
        "dua-reference"
    );


    return card;
}


/* =========================================================
   ADD DUA FIELD
========================================================= */

function addField(
    card,
    label,
    value,
    className
) {

    if (!value) {
        return;
    }


    const labelElement =
        document.createElement(
            "div"
        );


    labelElement.className =
        "dua-label";


    labelElement.textContent =
        label;


    const valueElement =
        document.createElement(
            "div"
        );


    valueElement.className =
        className;


    valueElement.textContent =
        value;


    card.append(
        labelElement,
        valueElement
    );
}


/* =========================================================
   REFERENCE
========================================================= */

function referenceText(dua) {

    const reference =
        dua?.reference ||
        dua?.references ||
        dua?.source;


    if (
        typeof reference ===
        "string"
    ) {

        return reference;

    }


    if (
        Array.isArray(reference)
    ) {

        return reference
            .map(
                item =>
                    typeof item ===
                    "string"
                        ? item
                        : item?.text ||
                          item?.name ||
                          item?.reference ||
                          ""
            )
            .filter(Boolean)
            .join(" • ");

    }


    if (
        reference &&
        typeof reference ===
        "object"
    ) {

        return (
            reference.text ||
            reference.name ||
            reference.title ||
            reference.reference ||
            ""
        );

    }


    return "";
}


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage() {

    document.documentElement.lang =
        lang;


    document.title =
        `IBADAT - ${TEXT[lang].title}`;


    setText(
        "introTitle",
        TEXT[lang].intro
    );


    setText(
        "loadingBox",
        TEXT[lang].loading
    );


    setText(
        "retryButton",
        TEXT[lang].retry
    );


    const home =
        document.getElementById(
            "duaHome"
        );


    if (
        home &&
        !home.classList.contains(
            "hidden"
        )
    ) {

        renderChapters();

    }


    const entryPage =
        document.getElementById(
            "entryPage"
        );


    if (
        entryPage &&
        !entryPage.classList.contains(
            "hidden"
        )
    ) {

        setText(
            "entryPageTitle",
            currentChapterTitle
        );


        renderEntries();

    }


    const duaPage =
        document.getElementById(
            "duaPage"
        );


    if (
        duaPage &&
        !duaPage.classList.contains(
            "hidden"
        ) &&
        entryIndex >= 0
    ) {

        setText(
            "duaPageTitle",
            entryTitle(
                entries[entryIndex],
                entryIndex
            )
        );


        const cached =
            entryCache.get(
                entryIndex
            );


        if (cached) {

            renderDua(
                cached.data
            );

        }

    }


    if (entryIndex >= 0) {

        updatePlayer(
            entryTitle(
                entries[entryIndex],
                entryIndex
            ),
            partIndex >= 0
                ? partIndex + 1
                : 0,
            entryParts.length
        );

    }


    updatePlayButton(
        !!currentAudio &&
        !currentAudio.paused
    );
}


/* =========================================================
   ERROR
========================================================= */

function showError() {

    document
        .getElementById(
            "loadingBox"
        )
        ?.classList.add(
            "hidden"
        );


    hidePages();


    setText(
        "errorText",
        TEXT[lang].error
    );


    show("errorBox");
}


/* =========================================================
   GO HOME
========================================================= */

function goHome() {

    stopAudio();


    entryIndex = -1;

    partIndex = -1;

    entryParts = [];


    document
        .getElementById(
            "duaAudioPlayer"
        )
        ?.classList.add(
            "hidden"
        );


    hidePages();

    show("duaHome");
}


/* =========================================================
   GO BACK TO ENTRY LIST
========================================================= */

function goEntries() {

    stopAudio();


    entryIndex = -1;

    partIndex = -1;

    entryParts = [];


    document
        .getElementById(
            "duaAudioPlayer"
        )
        ?.classList.add(
            "hidden"
        );


    hidePages();


    setText(
        "entryPageTitle",
        currentChapterTitle
    );


    renderEntries();


    show("entryPage");
}


/* =========================================================
   LOAD ALL CHAPTERS
========================================================= */

async function loadChapters() {

    try {

        document
            .getElementById(
                "loadingBox"
            )
            ?.classList.remove(
                "hidden"
            );


        const data =
            await api(
                `${API_BASE}/collections/${COLLECTION_ID}/chapters`
            );


        chapters =
            listFrom(
                data,
                [
                    "chapters",
                    "items",
                    "results"
                ]
            );


        if (!chapters.length) {

            throw new Error(
                "NO_CHAPTERS"
            );

        }


        renderChapters();


        hidePages();

        show("duaHome");


        document
            .getElementById(
                "loadingBox"
            )
            ?.classList.add(
                "hidden"
            );

    } catch (error) {

        console.error(error);

        showError();

    }
}


/* =========================================================
   REFRESH SETTINGS
========================================================= */

function refreshSettings() {

    const nextLanguage =
        getLanguage();


    if (
        nextLanguage !== lang
    ) {

        lang = nextLanguage;

        applyLanguage();

    }


    applyTheme();
}


/* =========================================================
   PAGE START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        lang =
            getLanguage();


        applyTheme();


        applyLanguage();


        document
            .getElementById(
                "entryBackButton"
            )
            ?.addEventListener(
                "click",
                goHome
            );


        document
            .getElementById(
                "duaBackButton"
            )
            ?.addEventListener(
                "click",
                goEntries
            );


        document
            .getElementById(
                "retryButton"
            )
            ?.addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "errorBox"
                        )
                        ?.classList.add(
                            "hidden"
                        );


                    loadChapters();

                }
            );


        window.addEventListener(
            "storage",
            event => {

                if (
                    event.key ===
                        "appSettings" ||
                    event.key ===
                        "ibadatSettings"
                ) {

                    refreshSettings();

                }

            }
        );


        window.addEventListener(
            "pageshow",
            refreshSettings
        );


        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    !document.hidden
                ) {

                    refreshSettings();

                }

            }
        );


        createAudio();

        createPlayer();

        loadChapters();

    }
);
