const API_BASE = "https://api.opendua.org/v2";
const COLLECTION_ID = "hisn-al-muslim";

const TEXT = {
    bn: {
        pageTitle: "দোয়া",
        introTitle: "দোয়া",
        introText: "",
        loading: "দোয়া লোড হচ্ছে...",
        retry: "আবার চেষ্টা করুন",
        error: "দোয়া লোড করা যাচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করুন।",
        noData: "কোনো দোয়া পাওয়া যায়নি।",
        chapters: "দোয়ার অধ্যায়",
        entries: "দোয়া",
        arabic: "আরবি",
        transliteration: "উচ্চারণ",
        translation: "অর্থ",
        reference: "সূত্র",
        listen: "শুনুন",
        part: "অংশ",
        noAudio: "এই দোয়ার অডিও নেই।"
    },

    en: {
        pageTitle: "Dua",
        introTitle: "Dua",
        introText: "",
        loading: "Loading duas...",
        retry: "Try Again",
        error: "Unable to load duas. Please check your internet connection.",
        noData: "No duas were found.",
        chapters: "Dua Chapters",
        entries: "Duas",
        arabic: "Arabic",
        transliteration: "Transliteration",
        translation: "Meaning",
        reference: "Reference",
        listen: "Listen",
        part: "Part",
        noAudio: "This dua has no audio."
    },

    hi: {
        pageTitle: "दुआ",
        introTitle: "दुआ",
        introText: "",
        loading: "दुआ लोड हो रही है...",
        retry: "फिर प्रयास करें",
        error: "दुआ लोड नहीं हो सकी। कृपया इंटरनेट कनेक्शन जाँचें।",
        noData: "कोई दुआ नहीं मिली।",
        chapters: "दुआ के अध्याय",
        entries: "दुआ",
        arabic: "अरबी",
        transliteration: "उच्चारण",
        translation: "अर्थ",
        reference: "स्रोत",
        listen: "सुनें",
        part: "भाग",
        noAudio: "इस दुआ का ऑडियो उपलब्ध नहीं है।"
    }
};


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLanguage = "bn";

let chapters = [];
let entries = [];

let currentChapterId = "";
let currentChapterTitle = "";

let currentEntryIndex = -1;
let currentPartIndex = -1;

let currentEntryParts = [];

let chapterAudioCache = new Map();

let currentAudio = null;

let audioPlayerCreated = false;
let audioRequestId = 0;
let isAudioLoading = false;


/* =========================================================
   LANGUAGE
========================================================= */

function getLanguage() {

    try {

        let saved =
            localStorage.getItem("ibadatSettings");

        if (!saved) {
            saved =
                localStorage.getItem("appSettings");
        }

        if (saved) {

            const settings =
                JSON.parse(saved);

            if (
                settings.lang === "bn" ||
                settings.lang === "en" ||
                settings.lang === "hi"
            ) {
                return settings.lang;
            }
        }

    } catch (error) {}

    return "bn";
}


/* =========================================================
   BASIC HELPERS
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


function hideAllPages() {

    const ids = [
        "loadingBox",
        "errorBox",
        "duaHome",
        "entryPage",
        "duaPage"
    ];

    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }

    });
}


async function apiFetch(url) {

    const response =
        await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            cache: "no-cache"
        });

    if (!response.ok) {

        let message =
            "HTTP " + response.status;

        try {

            const errorData =
                await response.json();

            if (
                errorData &&
                errorData.error
            ) {
                message =
                    errorData.error;
            }

        } catch (error) {}

        throw new Error(message);
    }

    return await response.json();
}


function getList(
    data,
    possibleKeys
) {

    if (Array.isArray(data)) {
        return data;
    }

    if (
        !data ||
        typeof data !== "object"
    ) {
        return [];
    }

    for (
        const key of possibleKeys
    ) {

        if (
            Array.isArray(data[key])
        ) {
            return data[key];
        }
    }

    return [];
}


function getChapterTitle(
    chapter,
    index
) {

    if (!chapter) {
        return "Chapter " + (index + 1);
    }

    return (
        chapter.title ||
        chapter.name ||
        chapter.slug ||
        ("Chapter " + (index + 1))
    );
}


function getEntryTitle(
    entry,
    index
) {

    if (!entry) {
        return "Dua " + (index + 1);
    }

    return (
        entry.title ||
        entry.name ||
        entry.slug ||
        ("Dua " + (index + 1))
    );
}


/* =========================================================
   AUDIO CORE
========================================================= */

function createAudioObject() {

    if (currentAudio) {
        return;
    }

    currentAudio =
        new Audio();

    currentAudio.preload =
        "auto";

    currentAudio.addEventListener(
        "timeupdate",
        updateAudioProgress
    );

    currentAudio.addEventListener(
        "loadedmetadata",
        updateAudioDuration
    );

    currentAudio.addEventListener(
        "ended",
        handleAudioEnded
    );

    currentAudio.addEventListener(
        "play",
        () => {
            updatePlayButton(true);
        }
    );

    currentAudio.addEventListener(
        "pause",
        () => {
            updatePlayButton(false);
        }
    );

    currentAudio.addEventListener(
        "error",
        handleAudioError
    );
}


function stopCurrentAudio() {

    audioRequestId++;

    if (!currentAudio) {
        return;
    }

    try {

        currentAudio.pause();

        currentAudio.currentTime = 0;

        currentAudio.removeAttribute(
            "src"
        );

        currentAudio.load();

    } catch (error) {

        console.error(
            "Audio stop error:",
            error
        );
    }

    updatePlayButton(false);
    resetAudioProgress();
}


function extractAudioParts(data) {

    const parts = [];

    if (
        !data ||
        !Array.isArray(data.variations)
    ) {
        return parts;
    }

    data.variations.forEach(
        (variation, variationIndex) => {

            if (
                !variation ||
                !Array.isArray(
                    variation.steps
                )
            ) {
                return;
            }

            variation.steps.forEach(
                (step, stepIndex) => {

                    if (
                        !step ||
                        !Array.isArray(
                            step.recordings
                        )
                    ) {
                        return;
                    }

                    step.recordings.forEach(
                        (
                            recording,
                            recordingIndex
                        ) => {

                            if (
                                recording &&
                                recording.url
                            ) {

                                parts.push({
                                    url: recording.url,

                                    variationIndex:
                                        variationIndex,

                                    stepIndex:
                                        stepIndex,

                                    recordingIndex:
                                        recordingIndex,

                                    durationSeconds:
                                        Number(
                                            recording.durationSeconds
                                        ) || 0
                                });

                            }

                        }
                    );

                }
            );

        }
    );

    return parts;
}


async function loadEntryData(
    entryIndex
) {

    if (
        entryIndex < 0 ||
        entryIndex >= entries.length
    ) {
        return null;
    }

    const cached =
        chapterAudioCache.get(
            entryIndex
        );

    if (cached && cached.data) {
        return cached.data;
    }

    const entry =
        entries[entryIndex];

    if (!entry) {
        return null;
    }

    const entryId =
        entry.id ||
        entry.entryId ||
        "";

    if (!entryId) {
        return null;
    }

    const url =
        API_BASE +
        "/entries/" +
        encodeURIComponent(
            entryId
        );

    const data =
        await apiFetch(url);

    const parts =
        extractAudioParts(data);

    chapterAudioCache.set(
        entryIndex,
        {
            data: data,
            parts: parts
        }
    );

    return data;
}


async function loadEntryParts(
    entryIndex
) {

    if (
        entryIndex < 0 ||
        entryIndex >= entries.length
    ) {
        return [];
    }

    const cached =
        chapterAudioCache.get(
            entryIndex
        );

    if (cached) {
        return cached.parts || [];
    }

    const data =
        await loadEntryData(
            entryIndex
        );

    if (!data) {
        return [];
    }

    const parts =
        extractAudioParts(data);

    chapterAudioCache.set(
        entryIndex,
        {
            data: data,
            parts: parts
        }
    );

    return parts;
}


/* =========================================================
   PLAY SPECIFIC PART
========================================================= */

async function playAudioPart(
    entryIndex,
    partIndex,
    autoPlay = true
) {

    if (isAudioLoading) {
        return false;
    }

    isAudioLoading = true;

    const requestId =
        ++audioRequestId;

    try {

        const parts =
            await loadEntryParts(
                entryIndex
            );

        if (
            requestId !==
            audioRequestId
        ) {
            return false;
        }

        if (!parts.length) {
            return false;
        }

        if (
            partIndex < 0 ||
            partIndex >= parts.length
        ) {
            return false;
        }

        const entry =
            entries[entryIndex];

        const title =
            getEntryTitle(
                entry,
                entryIndex
            );

        const entryData =
            await loadEntryData(
                entryIndex
            );

        if (
            requestId !==
            audioRequestId
        ) {
            return false;
        }

        /*
         * Stop current audio BEFORE
         * assigning the new source.
         */

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentEntryIndex =
            entryIndex;

        currentEntryParts =
            parts;

        currentPartIndex =
            partIndex;

        /*
         * If we are moving to another
         * Dua, update the visible
         * Dua content too.
         */

        if (
            entryData &&
            entryIndex !==
                getVisibleEntryIndex()
        ) {

            setText(
                "duaPageTitle",
                title
            );

            renderDua(
                entryData
            );
        }

        setText(
            "duaPageTitle",
            title
        );

        updateAudioPlayer(
            title,
            partIndex + 1,
            parts.length
        );

        resetAudioProgress();

        currentAudio.src =
            parts[partIndex].url;

        currentAudio.load();

        if (autoPlay) {

            try {

                await currentAudio.play();

            } catch (error) {

                console.warn(
                    "Audio autoplay/play blocked:",
                    error
                );

                updatePlayButton(false);

                return false;
            }
        }

        return true;

    } catch (error) {

        console.error(
            "Play audio part error:",
            error
        );

        return false;

    } finally {

        isAudioLoading = false;
    }
}


/* =========================================================
   VISIBLE ENTRY
========================================================= */

function getVisibleEntryIndex() {

    const titleElement =
        document.getElementById(
            "duaPageTitle"
        );

    if (!titleElement) {
        return -1;
    }

    const currentTitle =
        titleElement.textContent;

    for (
        let i = 0;
        i < entries.length;
        i++
    ) {

        if (
            getEntryTitle(
                entries[i],
                i
            ) === currentTitle
        ) {
            return i;
        }
    }

    return -1;
}


/* =========================================================
   NEXT
========================================================= */

async function playNextPart() {

    if (
        currentEntryIndex < 0
    ) {
        return;
    }

    const parts =
        currentEntryParts;

    /*
     * Same Dua → next Part
     */

    if (
        currentPartIndex <
        parts.length - 1
    ) {

        await playAudioPart(
            currentEntryIndex,
            currentPartIndex + 1,
            true
        );

        return;
    }

    /*
     * Current Dua finished.
     * Move to next Dua.
     */

    const nextEntryIndex =
        currentEntryIndex + 1;

    if (
        nextEntryIndex >=
        entries.length
    ) {

        /*
         * Last part of the last Dua.
         */

        stopCurrentAudio();

        return;
    }

    await playNextEntry(
        nextEntryIndex
    );
}


async function playNextEntry(
    startIndex
) {

    let index =
        startIndex;

    while (
        index < entries.length
    ) {

        const parts =
            await loadEntryParts(
                index
            );

        if (parts.length) {

            const data =
                await loadEntryData(
                    index
                );

            if (data) {

                setText(
                    "duaPageTitle",
                    getEntryTitle(
                        data,
                        index
                    )
                );

                renderDua(
                    data
                );
            }

            await playAudioPart(
                index,
                0,
                true
            );

            return;
        }

        index++;
    }

    stopCurrentAudio();
}


/* =========================================================
   PREVIOUS
========================================================= */

async function playPreviousPart() {

    if (
        currentEntryIndex < 0
    ) {
        return;
    }

    /*
     * Same Dua → previous Part
     */

    if (
        currentPartIndex > 0
    ) {

        await playAudioPart(
            currentEntryIndex,
            currentPartIndex - 1,
            true
        );

        return;
    }

    /*
     * We are at Part 1.
     * Go to previous Dua's
     * last available Part.
     */

    const previousEntryIndex =
        currentEntryIndex - 1;

    if (
        previousEntryIndex < 0
    ) {
        return;
    }

    await playPreviousEntry(
        previousEntryIndex
    );
}


async function playPreviousEntry(
    startIndex
) {

    let index =
        startIndex;

    while (
        index >= 0
    ) {

        const parts =
            await loadEntryParts(
                index
            );

        if (parts.length) {

            const data =
                await loadEntryData(
                    index
                );

            if (data) {

                setText(
                    "duaPageTitle",
                    getEntryTitle(
                        data,
                        index
                    )
                );

                renderDua(
                    data
                );
            }

            await playAudioPart(
                index,
                parts.length - 1,
                true
            );

            return;
        }

        index--;
    }
}


/* =========================================================
   PLAY / PAUSE
========================================================= */

async function toggleAudioPlay() {

    createAudioObject();

    /*
     * Nothing selected yet.
     * Start from first available
     * audio in the current chapter.
     */

    if (
        currentEntryIndex < 0 ||
        currentPartIndex < 0
    ) {

        await playNextEntry(0);

        return;
    }

    if (
        currentAudio.paused
    ) {

        try {

            await currentAudio.play();

        } catch (error) {

            console.error(
                "Play error:",
                error
            );
        }

    } else {

        currentAudio.pause();
    }
}


/* =========================================================
   PLAYER UI
========================================================= */

function createAudioPlayer() {

    if (audioPlayerCreated) {
        return;
    }

    const player =
        document.createElement("div");

    player.id =
        "duaAudioPlayer";

    player.className =
        "dua-audio-player hidden";

    player.innerHTML = `
        <div class="audio-player-info">

            <div
                id="audioPlayerTitle"
                class="audio-player-title">
                দোয়া
            </div>

            <div
                id="audioPlayerPart"
                class="audio-player-part">
                অংশ 0/0
            </div>

        </div>

        <div class="audio-player-time-row">

            <span id="audioCurrentTime">
                0:00
            </span>

            <span id="audioDuration">
                0:00
            </span>

        </div>

        <input
            type="range"
            id="audioProgress"
            class="audio-progress"
            min="0"
            max="100"
            value="0"
            step="0.1"
            aria-label="Audio progress"
        >

        <div class="audio-player-controls">

            <button
                id="audioPrevious"
                type="button"
                aria-label="Previous">
                ⏮
            </button>

            <button
                id="audioPlay"
                type="button"
                aria-label="Play or pause">
                ▶
            </button>

            <button
                id="audioNext"
                type="button"
                aria-label="Next">
                ⏭
            </button>

        </div>
    `;

    document.body.appendChild(
        player
    );

    const previousButton =
        document.getElementById(
            "audioPrevious"
        );

    const playButton =
        document.getElementById(
            "audioPlay"
        );

    const nextButton =
        document.getElementById(
            "audioNext"
        );

    const progress =
        document.getElementById(
            "audioProgress"
        );

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            async () => {

                await playPreviousPart();

            }
        );
    }

    if (playButton) {

        playButton.addEventListener(
            "click",
            async () => {

                await toggleAudioPlay();

            }
        );
    }

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            async () => {

                await playNextPart();

            }
        );
    }

    if (progress) {

        progress.addEventListener(
            "input",
            seekAudio
        );
    }

    audioPlayerCreated = true;
}


function showAudioPlayer() {

    const player =
        document.getElementById(
            "duaAudioPlayer"
        );

    if (!player) {
        return;
    }

    player.classList.remove(
        "hidden"
    );
}


function hideAudioPlayer() {

    const player =
        document.getElementById(
            "duaAudioPlayer"
        );

    if (!player) {
        return;
    }

    player.classList.add(
        "hidden"
    );
}


function updateAudioPlayer(
    title,
    partNumber,
    totalParts
) {

    showAudioPlayer();

    const titleElement =
        document.getElementById(
            "audioPlayerTitle"
        );

    const partElement =
        document.getElementById(
            "audioPlayerPart"
        );

    if (titleElement) {

        titleElement.textContent =
            title;
    }

    if (partElement) {

        partElement.textContent =
            TEXT[currentLanguage].part +
            " " +
            partNumber +
            "/" +
            totalParts;
    }
}


function updatePlayButton(
    playing
) {

    const button =
        document.getElementById(
            "audioPlay"
        );

    if (!button) {
        return;
    }

    button.textContent =
        playing ? "⏸" : "▶";
}


function updateAudioProgress() {

    if (!currentAudio) {
        return;
    }

    const progress =
        document.getElementById(
            "audioProgress"
        );

    const currentTime =
        document.getElementById(
            "audioCurrentTime"
        );

    if (
        !progress ||
        !currentTime
    ) {
        return;
    }

    const duration =
        currentAudio.duration;

    const time =
        currentAudio.currentTime || 0;

    if (
        duration &&
        isFinite(duration)
    ) {

        progress.value =
            (
                time / duration
            ) * 100;
    }

    currentTime.textContent =
        formatTime(time);
}


function updateAudioDuration() {

    if (!currentAudio) {
        return;
    }

    const durationElement =
        document.getElementById(
            "audioDuration"
        );

    if (!durationElement) {
        return;
    }

    const duration =
        currentAudio.duration;

    durationElement.textContent =
        formatTime(
            isFinite(duration)
                ? duration
                : 0
        );
}


function resetAudioProgress() {

    const progress =
        document.getElementById(
            "audioProgress"
        );

    const currentTime =
        document.getElementById(
            "audioCurrentTime"
        );

    const duration =
        document.getElementById(
            "audioDuration"
        );

    if (progress) {
        progress.value = 0;
    }

    if (currentTime) {
        currentTime.textContent =
            "0:00";
    }

    if (duration) {
        duration.textContent =
            "0:00";
    }
}


function seekAudio(event) {

    if (!currentAudio) {
        return;
    }

    const duration =
        currentAudio.duration;

    if (
        !duration ||
        !isFinite(duration)
    ) {
        return;
    }

    const percent =
        Number(
            event.target.value
        );

    currentAudio.currentTime =
        (
            percent / 100
        ) * duration;
}


function formatTime(seconds) {

    if (
        !seconds ||
        !isFinite(seconds)
    ) {
        return "0:00";
    }

    const total =
        Math.floor(seconds);

    const minutes =
        Math.floor(
            total / 60
        );

    const remainingSeconds =
        total % 60;

    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(2, "0")
    );
}


function handleAudioEnded() {

    /*
     * When one recording ends,
     * automatically move to the
     * next recording/part.
     */

    playNextPart();
}


function handleAudioError(event) {

    console.error(
        "Dua audio error:",
        event
    );

    updatePlayButton(false);
}


/* =========================================================
   LOAD CHAPTERS
========================================================= */

async function loadChapters() {

    currentLanguage =
        getLanguage();

    const t =
        TEXT[currentLanguage];

    setText(
        "pageTitle",
        t.pageTitle
    );

    setText(
        "introTitle",
        t.introTitle
    );

    setText(
        "introText",
        t.introText
    );

    setText(
        "retryButton",
        t.retry
    );

    hideAudioPlayer();

    hideAllPages();

    const loadingBox =
        document.getElementById(
            "loadingBox"
        );

    if (loadingBox) {

        loadingBox.textContent =
            t.loading;

        loadingBox.classList.remove(
            "hidden"
        );
    }

    try {

        const url =
            API_BASE +
            "/collections/" +
            COLLECTION_ID +
            "/chapters";

        console.log(
            "Dua chapters URL:",
            url
        );

        const data =
            await apiFetch(url);

        console.log(
            "Dua chapters response:",
            data
        );

        chapters =
            getList(
                data,
                [
                    "chapters",
                    "data",
                    "items",
                    "results"
                ]
            );

        if (!chapters.length) {
            throw new Error(
                "EMPTY_CHAPTER_LIST"
            );
        }

        renderChapters();

        hideAllPages();

        const home =
            document.getElementById(
                "duaHome"
            );

        if (home) {

            home.classList.remove(
                "hidden"
            );
        }

        window.scrollTo(
            0,
            0
        );

    } catch (error) {

        console.error(
            "OpenDua chapter error:",
            error
        );

        showError();
    }
}


/* =========================================================
   CHAPTER LIST
========================================================= */

function renderChapters() {

    const container =
        document.getElementById(
            "chapterList"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const t =
        TEXT[currentLanguage];

    if (!chapters.length) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "status-box";

        empty.textContent =
            t.noData;

        container.appendChild(
            empty
        );

        return;
    }

    chapters.forEach(
        (chapter, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "chapter-card";

            const number =
                document.createElement(
                    "div"
                );

            number.className =
                "chapter-number";

            number.textContent =
                index + 1;

            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "chapter-info";

            const title =
                document.createElement(
                    "div"
                );

            title.className =
                "chapter-title";

            title.textContent =
                getChapterTitle(
                    chapter,
                    index
                );

            info.appendChild(
                title
            );

            const arrow =
                document.createElement(
                    "div"
                );

            arrow.className =
                "chapter-arrow";

            arrow.textContent =
                "›";

            card.appendChild(
                number
            );

            card.appendChild(
                info
            );

            card.appendChild(
                arrow
            );

            card.addEventListener(
                "click",
                () => {

                    openChapter(
                        chapter,
                        index
                    );

                }
            );

            container.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   OPEN CHAPTER
========================================================= */

async function openChapter(
    chapter,
    index
) {

    if (!chapter) {
        return;
    }

    stopCurrentAudio();

    currentEntryIndex = -1;
    currentPartIndex = -1;
    currentEntryParts = [];

    chapterAudioCache =
        new Map();

    currentChapterId =
        chapter.id ||
        chapter.chapterId ||
        chapter.slug ||
        "";

    currentChapterTitle =
        getChapterTitle(
            chapter,
            index
        );

    if (!currentChapterId) {

        console.error(
            "Chapter ID missing:",
            chapter
        );

        return;
    }

    hideAudioPlayer();

    hideAllPages();

    const loadingBox =
        document.getElementById(
            "loadingBox"
        );

    if (loadingBox) {

        loadingBox.textContent =
            TEXT[currentLanguage].loading;

        loadingBox.classList.remove(
            "hidden"
        );
    }

    try {

        const url =
            API_BASE +
            "/collections/" +
            COLLECTION_ID +
            "/chapters/" +
            encodeURIComponent(
                currentChapterId
            ) +
            "/entries";

        console.log(
            "Dua entries URL:",
            url
        );

        const data =
            await apiFetch(url);

        console.log(
            "Dua entries response:",
            data
        );

        entries =
            getList(
                data,
                [
                    "entries",
                    "data",
                    "items",
                    "results"
                ]
            );

        if (!entries.length) {

            throw new Error(
                "EMPTY_ENTRY_LIST"
            );
        }

        setText(
            "entryPageTitle",
            currentChapterTitle
        );

        renderEntries();

        hideAllPages();

        const entryPage =
            document.getElementById(
                "entryPage"
            );

        if (entryPage) {

            entryPage.classList.remove(
                "hidden"
            );
        }

        window.scrollTo(
            0,
            0
        );

    } catch (error) {

        console.error(
            "OpenDua entry error:",
            error
        );

        showError();
    }
}


/* =========================================================
   ENTRY LIST
========================================================= */

function renderEntries() {

    const container =
        document.getElementById(
            "entryList"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const t =
        TEXT[currentLanguage];

    if (!entries.length) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "status-box";

        empty.textContent =
            t.noData;

        container.appendChild(
            empty
        );

        return;
    }

    entries.forEach(
        (entry, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "entry-card";

            const number =
                document.createElement(
                    "div"
                );

            number.className =
                "entry-number";

            number.textContent =
                "#" + (index + 1);

            const title =
                document.createElement(
                    "div"
                );

            title.className =
                "entry-title";

            title.textContent =
                getEntryTitle(
                    entry,
                    index
                );

            card.appendChild(
                number
            );

            card.appendChild(
                title
            );

            card.addEventListener(
                "click",
                () => {

                    openEntry(
                        entry,
                        index
                    );

                }
            );

            container.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   OPEN ENTRY
========================================================= */

async function openEntry(
    entry,
    index
) {

    if (!entry) {
        return;
    }

    const entryId =
        entry.id ||
        entry.entryId ||
        "";

    if (!entryId) {

        console.error(
            "Entry ID missing:",
            entry
        );

        return;
    }

    stopCurrentAudio();

    currentEntryIndex = index;
    currentPartIndex = -1;
    currentEntryParts = [];

    hideAllPages();

    const loadingBox =
        document.getElementById(
            "loadingBox"
        );

    if (loadingBox) {

        loadingBox.textContent =
            TEXT[currentLanguage].loading;

        loadingBox.classList.remove(
            "hidden"
        );
    }

    try {

        const url =
            API_BASE +
            "/entries/" +
            encodeURIComponent(
                entryId
            );

        console.log(
            "Dua detail URL:",
            url
        );

        const data =
            await apiFetch(url);

        console.log(
            "Dua detail response:",
            data
        );

        const parts =
            extractAudioParts(
                data
            );

        chapterAudioCache.set(
            index,
            {
                data: data,
                parts: parts
            }
        );

        currentEntryParts =
            parts;

        setText(
            "duaPageTitle",
            getEntryTitle(
                data,
                index
            )
        );

        renderDua(
            data
        );

        hideAllPages();

        const duaPage =
            document.getElementById(
                "duaPage"
            );

        if (duaPage) {

            duaPage.classList.remove(
                "hidden"
            );
        }

        if (parts.length) {

            currentPartIndex = 0;

            updateAudioPlayer(
                getEntryTitle(
                    data,
                    index
                ),
                1,
                parts.length
            );

            /*
             * Player appears ready,
             * but audio does NOT
             * automatically start.
             */

        } else {

            hideAudioPlayer();

        }

        window.scrollTo(
            0,
            0
        );

    } catch (error) {

        console.error(
            "OpenDua detail error:",
            error
        );

        showError();
    }
}


/* =========================================================
   RENDER DUA
========================================================= */

function renderDua(data) {

    const container =
        document.getElementById(
            "duaContent"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "dua-card";

    const title =
        document.createElement(
            "div"
        );

    title.className =
        "dua-title";

    title.textContent =
        data.title ||
        data.name ||
        "";

    card.appendChild(
        title
    );

    /*
     * OpenDua structure:
     *
     * variations[]
     *     ↓
     * steps[]
     *     ↓
     * items[]
     *     ↓
     * dua{}
     *
     * Audio:
     *
     * steps[]
     *     ↓
     * recordings[]
     *
     * IMPORTANT:
     * Audio controls are NOT inserted
     * here. The bottom player is
     * the only audio controller.
     */

    if (
        Array.isArray(
            data.variations
        ) &&
        data.variations.length
    ) {

        data.variations.forEach(
            variation => {

                if (
                    !variation ||
                    !Array.isArray(
                        variation.steps
                    )
                ) {
                    return;
                }

                variation.steps.forEach(
                    step => {

                        if (
                            !step ||
                            !Array.isArray(
                                step.items
                            )
                        ) {
                            return;
                        }

                        step.items.forEach(
                            item => {

                                if (
                                    item &&
                                    item.dua
                                ) {

                                    renderDuaObject(
                                        item.dua,
                                        card
                                    );
                                }

                            }
                        );

                    }
                );

            }
        );

    } else {

        renderDuaObject(
            data,
            card
        );
    }

    /*
     * Entry-level source
     */

    if (
        data.sourceReference
    ) {

        addReference(
            TEXT[currentLanguage].reference +
            ": " +
            data.sourceReference,
            card
        );
    }

    /*
     * Structured references
     */

    if (
        Array.isArray(
            data.references
        ) &&
        data.references.length
    ) {

        data.references.forEach(
            reference => {

                const text =
                    getReferenceText(
                        reference
                    );

                if (text) {

                    addReference(
                        text,
                        card
                    );
                }
            }
        );
    }

    container.appendChild(
        card
    );
}


/* =========================================================
   RENDER DUA OBJECT
========================================================= */

function renderDuaObject(
    dua,
    card
) {

    if (!dua) {
        return;
    }

    const t =
        TEXT[currentLanguage];

    /*
     * Arabic
     */

    if (dua.arabic) {

        addLabel(
            t.arabic,
            card
        );

        const arabic =
            document.createElement(
                "div"
            );

        arabic.className =
            "dua-arabic";

        arabic.textContent =
            dua.arabic;

        card.appendChild(
            arabic
        );
    }

    /*
     * Transliteration
     */

    if (
        dua.transliteration
    ) {

        addLabel(
            t.transliteration,
            card
        );

        const transliteration =
            document.createElement(
                "div"
            );

        transliteration.className =
            "dua-transliteration";

        transliteration.textContent =
            dua.transliteration;

        card.appendChild(
            transliteration
        );
    }

    /*
     * Translation
     */

    if (
        dua.translation
    ) {

        addLabel(
            t.translation,
            card
        );

        const translation =
            document.createElement(
                "div"
            );

        translation.className =
            "dua-translation";

        translation.textContent =
            dua.translation;

        card.appendChild(
            translation
        );
    }

    /*
     * Dua-level references
     */

    if (
        Array.isArray(
            dua.references
        ) &&
        dua.references.length
    ) {

        dua.references.forEach(
            reference => {

                const text =
                    getReferenceText(
                        reference
                    );

                if (text) {

                    addReference(
                        text,
                        card
                    );
                }
            }
        );
    }
}


function addLabel(
    text,
    card
) {

    const label =
        document.createElement(
            "div"
        );

    label.className =
        "dua-section-label";

    label.textContent =
        text;

    card.appendChild(
        label
    );
}


function addReference(
    text,
    card
) {

    const reference =
        document.createElement(
            "div"
        );

    reference.className =
        "dua-reference";

    reference.textContent =
        text;

    card.appendChild(
        reference
    );
}


function getReferenceText(
    reference
) {

    if (!reference) {
        return "";
    }

    if (
        typeof reference === "string"
    ) {
        return reference;
    }

    if (
        typeof reference === "object"
    ) {

        return (
            reference.text ||
            reference.title ||
            reference.name ||
            reference.work ||
            reference.id ||
            ""
        );
    }

    return "";
}


/* =========================================================
   NAVIGATION
========================================================= */

function showError() {

    stopCurrentAudio();

    hideAudioPlayer();

    hideAllPages();

    const t =
        TEXT[currentLanguage];

    const errorBox =
        document.getElementById(
            "errorBox"
        );

    if (!errorBox) {
        return;
    }

    setText(
        "errorText",
        t.error
    );

    const retryButton =
        document.getElementById(
            "retryButton"
        );

    if (retryButton) {

        retryButton.textContent =
            t.retry;
    }

    errorBox.classList.remove(
        "hidden"
    );
}


function goHome() {

    stopCurrentAudio();

    currentEntryIndex = -1;
    currentPartIndex = -1;
    currentEntryParts = [];

    hideAudioPlayer();

    hideAllPages();

    renderChapters();

    const home =
        document.getElementById(
            "duaHome"
        );

    if (home) {

        home.classList.remove(
            "hidden"
        );
    }

    window.scrollTo(
        0,
        0
    );
}


function goEntries() {

    stopCurrentAudio();

    currentEntryIndex = -1;
    currentPartIndex = -1;
    currentEntryParts = [];

    hideAudioPlayer();

    hideAllPages();

    setText(
        "entryPageTitle",
        currentChapterTitle
    );

    renderEntries();

    const page =
        document.getElementById(
            "entryPage"
        );

    if (page) {

        page.classList.remove(
            "hidden"
        );
    }

    window.scrollTo(
        0,
        0
    );
}


/* =========================================================
   BACK BUTTONS
========================================================= */

function setupBackButton() {

    const button =
        document.getElementById(
            "backButton"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        () => {

            const duaPage =
                document.getElementById(
                    "duaPage"
                );

            const entryPage =
                document.getElementById(
                    "entryPage"
                );

            if (
                duaPage &&
                !duaPage.classList.contains(
                    "hidden"
                )
            ) {

                goEntries();

                return;
            }

            if (
                entryPage &&
                !entryPage.classList.contains(
                    "hidden"
                )
            ) {

                goHome();

                return;
            }

            history.back();
        }
    );
}


function setupEntryBack() {

    const button =
        document.getElementById(
            "entryBackButton"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        () => {

            goHome();

        }
    );
}


function setupDuaBack() {

    const button =
        document.getElementById(
            "duaBackButton"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        () => {

            goEntries();

        }
    );
}


function setupRetry() {

    const button =
        document.getElementById(
            "retryButton"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        () => {

            loadChapters();

        }
    );
}


/* =========================================================
   LANGUAGE WATCHER
========================================================= */

function setupLanguageWatcher() {

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                    "ibadatSettings" ||
                event.key ===
                    "appSettings"
            ) {

                stopCurrentAudio();

                location.reload();

            }

        }
    );
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupBackButton();

        setupEntryBack();

        setupDuaBack();

        setupRetry();

        setupLanguageWatcher();

        createAudioObject();

        createAudioPlayer();

        loadChapters();

    }
);
