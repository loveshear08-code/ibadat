const API_BASE = "https://api.opendua.org/v2";
const COLLECTION_ID = "hisn-al-muslim";

const TEXT = {
    bn: {
        pageTitle: "দোয়া",
        introTitle: "দোয়া",
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
        part: "অংশ",
        previous: "আগের অংশ",
        next: "পরের অংশ",
        play: "প্লে",
        pause: "পজ"
    },

    en: {
        pageTitle: "Dua",
        introTitle: "Dua",
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
        part: "Part",
        previous: "Previous",
        next: "Next",
        play: "Play",
        pause: "Pause"
    },

    hi: {
        pageTitle: "दुआ",
        introTitle: "दुआ",
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
        part: "भाग",
        previous: "पिछला",
        next: "अगला",
        play: "प्ले",
        pause: "रोकें"
    }
};


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLanguage = "bn";

let chapters = [];
let entries = [];

let currentChapterIndex = -1;
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

        const raw =
            localStorage.getItem("ibadatSettings") ||
            localStorage.getItem("appSettings");

        if (raw) {

            const settings = JSON.parse(raw);

            const language =
                settings?.lang ||
                settings?.language;

            if (
                ["bn", "en", "hi"].includes(language)
            ) {
                return language;
            }
        }

    } catch (error) {

        console.warn(
            "Language error:",
            error
        );
    }

    return "bn";
}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            value ?? "";
    }
}


function applyLanguage() {

    const text =
        TEXT[currentLanguage];

    document.documentElement.lang =
        currentLanguage;

    document.title =
        "IBADAT - " +
        text.pageTitle;

    setText(
        "introTitle",
        text.introTitle
    );

    setText(
        "loadingBox",
        text.loading
    );

    const retryButton =
        document.getElementById(
            "retryButton"
        );

    if (retryButton) {
        retryButton.textContent =
            text.retry;
    }

    updatePlayButton(
        currentAudio &&
        !currentAudio.paused
    );
}


/* =========================================================
   PAGE CONTROL
========================================================= */

function hideAllPages() {

    [
        "duaHome",
        "entryPage",
        "duaPage"
    ].forEach((id) => {

        const element =
            document.getElementById(id);

        if (element) {
            element.classList.add(
                "hidden"
            );
        }

    });
}


/* =========================================================
   API
========================================================= */

async function apiFetch(url) {

    const response =
        await fetch(
            url,
            {
                method: "GET",
                headers: {
                    Accept:
                        "application/json"
                },
                cache: "no-store"
            }
        );

    if (!response.ok) {

        throw new Error(
            "HTTP_" +
            response.status
        );
    }

    return await response.json();
}


function getList(
    data,
    possibleKeys = []
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
            Array.isArray(
                data[key]
            )
        ) {
            return data[key];
        }
    }

    if (
        Array.isArray(data.data)
    ) {
        return data.data;
    }

    if (
        data.data &&
        typeof data.data === "object"
    ) {

        for (
            const key of possibleKeys
        ) {

            if (
                Array.isArray(
                    data.data[key]
                )
            ) {
                return data.data[key];
            }
        }
    }

    return [];
}


/* =========================================================
   LOCALIZED TEXT
========================================================= */

function localized(
    object,
    language,
    keys
) {

    if (!object) {
        return "";
    }

    for (
        const key of keys
    ) {

        const value =
            object[key];

        if (
            typeof value === "string" &&
            value.trim()
        ) {
            return value.trim();
        }

        if (
            value &&
            typeof value === "object"
        ) {

            const translated =
                value[language] ||
                value.en ||
                value.bn ||
                value.hi;

            if (
                typeof translated === "string" &&
                translated.trim()
            ) {
                return translated.trim();
            }
        }
    }

    return "";
}


function getChapterTitle(
    chapter,
    index
) {

    const title =
        localized(
            chapter,
            currentLanguage,
            [
                "title",
                "name",
                "chapterTitle",
                "chapter_name"
            ]
        );

    if (title) {
        return title;
    }

    return (
        TEXT[currentLanguage].chapters +
        " " +
        (index + 1)
    );
}


function getEntryTitle(
    entry,
    index
) {

    const title =
        localized(
            entry,
            currentLanguage,
            [
                "title",
                "name",
                "entryTitle",
                "entry_title"
            ]
        );

    if (title) {
        return title;
    }

    return (
        TEXT[currentLanguage].entries +
        " " +
        (index + 1)
    );
}


/* =========================================================
   AUDIO OBJECT
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

    isAudioLoading = false;

    if (!currentAudio) {
        return;
    }

    try {

        currentAudio.pause();

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


/* =========================================================
   AUDIO EXTRACTION
========================================================= */

function extractAudioParts(data) {

    const parts = [];

    if (
        !Array.isArray(
            data?.variations
        )
    ) {
        return parts;
    }

    data.variations.forEach(
        (
            variation,
            variationIndex
        ) => {

            if (
                !Array.isArray(
                    variation?.steps
                )
            ) {
                return;
            }

            variation.steps.forEach(
                (
                    step,
                    stepIndex
                ) => {

                    if (
                        !Array.isArray(
                            step?.recordings
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
                                recording?.url
                            ) {

                                parts.push({

                                    url:
                                        recording.url,

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


/* =========================================================
   ENTRY DATA
========================================================= */

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

    if (
        cached &&
        cached.data
    ) {
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
        extractAudioParts(
            data
        );

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
        extractAudioParts(
            data
        );

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
   PLAY ONE AUDIO PART
========================================================= */

async function playAudioPart(
    entryIndex,
    partIndex,
    autoPlay = true
) {

    createAudioObject();

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

        if (
            !parts.length
        ) {
            return false;
        }

        if (
            partIndex < 0 ||
            partIndex >= parts.length
        ) {
            return false;
        }

        const data =
            await loadEntryData(
                entryIndex
            );

        if (
            requestId !==
            audioRequestId
        ) {
            return false;
        }

        if (!data) {
            return false;
        }

        currentEntryIndex =
            entryIndex;

        currentEntryParts =
            parts;

        currentPartIndex =
            partIndex;

        const title =
            getEntryTitle(
                entries[entryIndex],
                entryIndex
            );

        setText(
            "duaPageTitle",
            title
        );

        renderDua(
            data
        );

        updateAudioPlayer(
            title,
            partIndex + 1,
            parts.length
        );

        resetAudioProgress();

        currentAudio.pause();

        currentAudio.src =
            parts[partIndex].url;

        currentAudio.load();

        if (autoPlay) {

            try {

                await currentAudio.play();

            } catch (error) {

                console.error(
                    "Audio play error:",
                    error
                );

                updatePlayButton(
                    false
                );

                return false;
            }
        }

        return true;

    } catch (error) {

        console.error(
            "playAudioPart error:",
            error
        );

        return false;

    } finally {

        isAudioLoading = false;
    }
}


/* =========================================================
   NEXT AUDIO
========================================================= */

async function playNextPart() {

    if (
        currentEntryIndex < 0
    ) {
        return false;
    }

    /*
     * 1. Next part of same Dua
     */

    const parts =
        currentEntryParts || [];

    if (
        currentPartIndex + 1 <
        parts.length
    ) {

        const played =
            await playAudioPart(
                currentEntryIndex,
                currentPartIndex + 1,
                true
            );

        if (played) {
            return true;
        }
    }


    /*
     * 2. Next Dua of same Chapter
     */

    for (
        let i =
            currentEntryIndex + 1;

        i < entries.length;

        i++
    ) {

        const nextParts =
            await loadEntryParts(
                i
            );

        if (
            nextParts.length
        ) {

            const played =
                await playAudioPart(
                    i,
                    0,
                    true
                );

            if (played) {
                return true;
            }
        }
    }


    /*
     * 3. Current Chapter finished.
     *    Move to next Chapter.
     */

    return await playNextChapter();
}


/* =========================================================
   PREVIOUS AUDIO
========================================================= */

async function playPreviousPart() {

    if (
        currentEntryIndex < 0
    ) {
        return false;
    }


    /*
     * Previous part of same Dua
     */

    if (
        currentPartIndex > 0
    ) {

        return await playAudioPart(
            currentEntryIndex,
            currentPartIndex - 1,
            true
        );
    }


    /*
     * Previous Dua of same Chapter
     */

    for (
        let i =
            currentEntryIndex - 1;

        i >= 0;

        i--
    ) {

        const previousParts =
            await loadEntryParts(
                i
            );

        if (
            previousParts.length
        ) {

            return await playAudioPart(
                i,
                previousParts.length - 1,
                true
            );
        }
    }


    /*
     * Beginning of Chapter.
     * Move to previous Chapter.
     */

    return await playPreviousChapter();
}


/* =========================================================
   LOAD CHAPTER ENTRIES
========================================================= */

async function loadChapterEntries(
    chapterIndex
) {

    const chapter =
        chapters[chapterIndex];

    if (!chapter) {
        return [];
    }

    const chapterId =
        chapter.id ||
        chapter.chapterId ||
        chapter.slug ||
        "";

    if (!chapterId) {
        return [];
    }

    const url =
        API_BASE +
        "/collections/" +
        COLLECTION_ID +
        "/chapters/" +
        encodeURIComponent(
            chapterId
        ) +
        "/entries";

    const data =
        await apiFetch(
            url
        );

    return getList(
        data,
        [
            "entries",
            "data",
            "items",
            "results"
        ]
    );
}


/* =========================================================
   NEXT CHAPTER
========================================================= */

async function playNextChapter() {

    for (
        let chapterIndex =
            currentChapterIndex + 1;

        chapterIndex <
        chapters.length;

        chapterIndex++
    ) {

        try {

            const newEntries =
                await loadChapterEntries(
                    chapterIndex
                );

            if (
                !newEntries.length
            ) {
                continue;
            }

            currentChapterIndex =
                chapterIndex;

            currentChapterId =
                chapters[
                    chapterIndex
                ].id ||
                chapters[
                    chapterIndex
                ].chapterId ||
                chapters[
                    chapterIndex
                ].slug ||
                "";

            currentChapterTitle =
                getChapterTitle(
                    chapters[
                        chapterIndex
                    ],
                    chapterIndex
                );

            entries =
                newEntries;

            chapterAudioCache =
                new Map();

            currentEntryIndex =
                -1;

            currentPartIndex =
                -1;

            currentEntryParts =
                [];

            /*
             * Find first Dua with audio.
             */

            for (
                let i = 0;

                i < entries.length;

                i++
            ) {

                const parts =
                    await loadEntryParts(
                        i
                    );

                if (
                    parts.length
                ) {

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

                    return await playAudioPart(
                        i,
                        0,
                        true
                    );
                }
            }

        } catch (error) {

            console.error(
                "Next chapter error:",
                error
            );
        }
    }


    /*
     * All chapters finished.
     */

    stopCurrentAudio();

    return false;
}


/* =========================================================
   PREVIOUS CHAPTER
========================================================= */

async function playPreviousChapter() {

    for (
        let chapterIndex =
            currentChapterIndex - 1;

        chapterIndex >= 0;

        chapterIndex--
    ) {

        try {

            const newEntries =
                await loadChapterEntries(
                    chapterIndex
                );

            if (
                !newEntries.length
            ) {
                continue;
            }

            currentChapterIndex =
                chapterIndex;

            currentChapterId =
                chapters[
                    chapterIndex
                ].id ||
                chapters[
                    chapterIndex
                ].chapterId ||
                chapters[
                    chapterIndex
                ].slug ||
                "";

            currentChapterTitle =
                getChapterTitle(
                    chapters[
                        chapterIndex
                    ],
                    chapterIndex
                );

            entries =
                newEntries;

            chapterAudioCache =
                new Map();

            currentEntryIndex =
                -1;

            currentPartIndex =
                -1;

            currentEntryParts =
                [];

            /*
             * Search backwards for
             * last Dua with audio.
             */

            for (
                let i =
                    entries.length - 1;

                i >= 0;

                i--
            ) {

                const parts =
                    await loadEntryParts(
                        i
                    );

                if (
                    parts.length
                ) {

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

                    return await playAudioPart(
                        i,
                        parts.length - 1,
                        true
                    );
                }
            }

        } catch (error) {

            console.error(
                "Previous chapter error:",
                error
            );
        }
    }

    return false;
}


/* =========================================================
   AUDIO ENDED
========================================================= */

async function handleAudioEnded() {

    try {

        await playNextPart();

    } catch (error) {

        console.error(
            "Auto next audio error:",
            error
        );

        updatePlayButton(
            false
        );
    }
}


/* =========================================================
   PLAY / PAUSE
========================================================= */

async function toggleAudioPlay() {

    createAudioObject();


    /*
     * If no source is loaded,
     * start from current Dua.
     */

    if (
        !currentAudio.src
    ) {

        if (
            currentEntryIndex >= 0
        ) {

            const played =
                await playAudioPart(
                    currentEntryIndex,
                    0,
                    true
                );

            if (played) {
                return;
            }
        }

        /*
         * If current Dua has no audio,
         * search forward.
         */

        for (
            let i =
                Math.max(
                    0,
                    currentEntryIndex
                );

            i < entries.length;

            i++
        ) {

            const parts =
                await loadEntryParts(
                    i
                );

            if (
                parts.length
            ) {

                const played =
                    await playAudioPart(
                        i,
                        0,
                        true
                    );

                if (played) {
                    return;
                }
            }
        }

        await playNextChapter();

        return;
    }


    /*
     * Resume
     */

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

            updatePlayButton(
                false
            );
        }

    } else {

        currentAudio.pause();
    }
}


/* =========================================================
   AUDIO PLAYER UI
========================================================= */

function createAudioPlayer() {

    if (audioPlayerCreated) {
        return;
    }

    audioPlayerCreated = true;

    const player =
        document.createElement(
            "div"
        );

    player.id =
        "duaAudioPlayer";

    player.className =
        "dua-audio-player hidden";

    player.innerHTML = `

        <div
            class="dua-audio-title"
            id="audioTitle"
        >
            ${TEXT[currentLanguage].pageTitle}
        </div>

        <div
            class="dua-audio-part"
            id="audioPart"
        >
        </div>

        <div
            class="dua-audio-progress-wrap"
        >
            <input
                type="range"
                id="audioProgress"
                min="0"
                max="100"
                value="0"
                step="0.1"
            >
        </div>

        <div
            class="dua-audio-time"
        >
            <span id="audioCurrentTime">
                0:00
            </span>

            <span id="audioDuration">
                0:00
            </span>
        </div>

        <div
            class="dua-audio-controls"
        >

            <button
                type="button"
                id="audioPrevious"
                aria-label="${TEXT[currentLanguage].previous}"
            >
                ⏮
            </button>

            <button
                type="button"
                id="audioPlay"
                aria-label="${TEXT[currentLanguage].play}"
            >
                ▶
            </button>

            <button
                type="button"
                id="audioNext"
                aria-label="${TEXT[currentLanguage].next}"
            >
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

                if (
                    isAudioLoading
                ) {
                    return;
                }

                await playPreviousPart();
            }
        );
    }


    if (playButton) {

        playButton.addEventListener(
            "click",
            async () => {

                if (
                    isAudioLoading
                ) {
                    return;
                }

                await toggleAudioPlay();
            }
        );
    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            async () => {

                if (
                    isAudioLoading
                ) {
                    return;
                }

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
}


function showAudioPlayer() {

    createAudioPlayer();

    const player =
        document.getElementById(
            "duaAudioPlayer"
        );

    if (player) {

        player.classList.remove(
            "hidden"
        );
    }
}


function hideAudioPlayer() {

    const player =
        document.getElementById(
            "duaAudioPlayer"
        );

    if (player) {

        player.classList.add(
            "hidden"
        );
    }

    stopCurrentAudio();
}


function updateAudioPlayer(
    title,
    partNumber,
    totalParts
) {

    showAudioPlayer();

    setText(
        "audioTitle",
        title
    );

    setText(
        "audioPart",
        TEXT[currentLanguage].part +
        " " +
        partNumber +
        " / " +
        totalParts
    );
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
        playing
            ? "❚❚"
            : "▶";

    button.setAttribute(
        "aria-label",
        playing
            ? TEXT[currentLanguage].pause
            : TEXT[currentLanguage].play
    );
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
        progress &&
        Number.isFinite(
            currentAudio.duration
        ) &&
        currentAudio.duration > 0
    ) {

        progress.value =
            (
                currentAudio.currentTime /
                currentAudio.duration
            ) *
            100;
    }

    if (currentTime) {

        currentTime.textContent =
            formatTime(
                currentAudio.currentTime
            );
    }
}


function updateAudioDuration() {

    if (!currentAudio) {
        return;
    }

    const duration =
        document.getElementById(
            "audioDuration"
        );

    if (duration) {

        duration.textContent =
            formatTime(
                currentAudio.duration
            );
    }
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

    if (
        !currentAudio ||
        !Number.isFinite(
            currentAudio.duration
        )
    ) {
        return;
    }

    currentAudio.currentTime =
        (
            Number(
                event.target.value
            ) /
            100
        ) *
        currentAudio.duration;
}


function formatTime(seconds) {

    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {
        return "0:00";
    }

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remainingSeconds =
        Math.floor(
            seconds % 60
        );

    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )
    );
}


function handleAudioError(
    event
) {

    console.error(
        "Dua audio error:",
        event
    );

    updatePlayButton(
        false
    );
            }


/* =========================================================
   CHAPTER LOADING
========================================================= */

async function loadChapters() {

    try {

        currentLanguage =
            getLanguage();

        applyLanguage();

        document
            .getElementById(
                "loadingBox"
            )
            ?.classList.remove(
                "hidden"
            );


        const data =
            await apiFetch(
                API_BASE +
                "/collections/" +
                COLLECTION_ID +
                "/chapters"
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


        if (
            !chapters.length
        ) {

            throw new Error(
                "EMPTY_CHAPTER_LIST"
            );
        }


        renderChapters();

        hideAllPages();

        document
            .getElementById(
                "duaHome"
            )
            ?.classList.remove(
                "hidden"
            );

        document
            .getElementById(
                "loadingBox"
            )
            ?.classList.add(
                "hidden"
            );

    } catch (error) {

        console.error(
            "loadChapters error:",
            error
        );

        showError();
    }
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
        (
            chapter,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "chapter-item";

            button.textContent =
                getChapterTitle(
                    chapter,
                    index
                );

            button.addEventListener(
                "click",
                () => {

                    openChapter(
                        chapter,
                        index
                    );
                }
            );

            box.appendChild(
                button
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

    currentChapterIndex =
        index;

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

    currentEntryIndex =
        -1;

    currentPartIndex =
        -1;

    currentEntryParts =
        [];

    chapterAudioCache =
        new Map();

    hideAudioPlayer();

    hideAllPages();


    try {

        entries =
            await loadChapterEntries(
                index
            );

        if (
            !entries.length
        ) {

            throw new Error(
                "EMPTY_ENTRY_LIST"
            );
        }

        setText(
            "entryPageTitle",
            currentChapterTitle
        );

        renderEntries();

        document
            .getElementById(
                "entryPage"
            )
            ?.classList.remove(
                "hidden"
            );

    } catch (error) {

        console.error(
            "openChapter error:",
            error
        );

        showError();
    }
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
        (
            entry,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "entry-item";

            button.textContent =
                getEntryTitle(
                    entry,
                    index
                );

            button.addEventListener(
                "click",
                () => {

                    openEntry(
                        entry,
                        index
                    );
                }
            );

            box.appendChild(
                button
            );
        }
    );
}


/* =========================================================
   OPEN ONE DUA
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
        return;
    }

    stopCurrentAudio();

    currentEntryIndex =
        index;

    currentPartIndex =
        -1;

    currentEntryParts =
        [];

    hideAllPages();

    document
        .getElementById(
            "duaPage"
        )
        ?.classList.remove(
            "hidden"
        );


    try {

        const data =
            await loadEntryData(
                index
            );

        if (!data) {

            throw new Error(
                "ENTRY_DATA_EMPTY"
            );
        }

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
                entry,
                index
            )
        );

        renderDua(
            data
        );


        if (
            parts.length
        ) {

            /*
             * Important:
             * -1 means no source loaded yet.
             * Play button will load Part 1.
             */

            currentPartIndex =
                -1;

            updateAudioPlayer(
                getEntryTitle(
                    entry,
                    index
                ),
                0,
                parts.length
            );

            updatePlayButton(
                false
            );

        } else {

            hideAudioPlayer();
        }

    } catch (error) {

        console.error(
            "openEntry error:",
            error
        );

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

    let rendered =
        false;


    if (
        Array.isArray(
            data?.variations
        )
    ) {

        data.variations.forEach(
            (variation) => {

                if (
                    !Array.isArray(
                        variation?.steps
                    )
                ) {
                    return;
                }

                variation.steps.forEach(
                    (step) => {

                        if (
                            !Array.isArray(
                                step?.items
                            )
                        ) {
                            return;
                        }

                        step.items.forEach(
                            (item) => {

                                if (
                                    !item?.dua
                                ) {
                                    return;
                                }

                                const card =
                                    renderDuaObject(
                                        item.dua
                                    );

                                if (card) {

                                    box.appendChild(
                                        card
                                    );

                                    rendered =
                                        true;
                                }
                            }
                        );
                    }
                );
            }
        );
    }


    if (!rendered) {

        box.innerHTML =
            `
            <div class="status-box">
                ${TEXT[currentLanguage].noData}
            </div>
            `;
    }
}


/* =========================================================
   DUA CARD
========================================================= */

function renderDuaObject(
    dua
) {

    if (!dua) {
        return null;
    }

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "dua-card";


    const arabic =
        dua.arabic ||
        dua.textArabic ||
        dua.text_ar ||
        "";


    const transliteration =
        localized(
            dua,
            "en",
            [
                "transliteration",
                "transliterationText",
                "transliteration_en"
            ]
        );


    const translation =
        localized(
            dua,
            currentLanguage,
            [
                "translation",
                "meaning",
                "translationText",
                "meaningText"
            ]
        );


    if (arabic) {

        addLabel(
            card,
            TEXT[currentLanguage].arabic
        );

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "dua-arabic";

        element.textContent =
            arabic;

        card.appendChild(
            element
        );
    }


    if (transliteration) {

        addLabel(
            card,
            TEXT[currentLanguage].transliteration
        );

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "dua-transliteration";

        element.textContent =
            transliteration;

        card.appendChild(
            element
        );
    }


    if (translation) {

        addLabel(
            card,
            TEXT[currentLanguage].translation
        );

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "dua-translation";

        element.textContent =
            translation;

        card.appendChild(
            element
        );
    }


    const reference =
        getReferenceText(
            dua
        );

    if (reference) {

        addLabel(
            card,
            TEXT[currentLanguage].reference
        );

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "dua-reference";

        element.textContent =
            reference;

        card.appendChild(
            element
        );
    }


    return card;
}


function addLabel(
    parent,
    text
) {

    const label =
        document.createElement(
            "div"
        );

    label.className =
        "dua-label";

    label.textContent =
        text;

    parent.appendChild(
        label
    );
}


function getReferenceText(
    dua
) {

    const reference =
        dua?.reference ||
        dua?.references ||
        dua?.source ||
        "";

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
                (item) => {

                    if (
                        typeof item ===
                        "string"
                    ) {
                        return item;
                    }

                    return (
                        item?.text ||
                        item?.name ||
                        item?.reference ||
                        ""
                    );
                }
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

    hideAllPages();

    setText(
        "errorText",
        TEXT[currentLanguage].error
    );

    document
        .getElementById(
            "errorBox"
        )
        ?.classList.remove(
            "hidden"
        );
}


/* =========================================================
   NAVIGATION
========================================================= */

function goHome() {

    stopCurrentAudio();

    currentEntryIndex =
        -1;

    currentPartIndex =
        -1;

    currentEntryParts =
        [];

    hideAudioPlayer();

    hideAllPages();

    document
        .getElementById(
            "duaHome"
        )
        ?.classList.remove(
            "hidden"
        );
}


function goEntries() {

    stopCurrentAudio();

    currentEntryIndex =
        -1;

    currentPartIndex =
        -1;

    currentEntryParts =
        [];

    hideAudioPlayer();

    hideAllPages();

    document
        .getElementById(
            "entryPage"
        )
        ?.classList.remove(
            "hidden"
        );

    setText(
        "entryPageTitle",
        currentChapterTitle
    );

    renderEntries();
}


/* =========================================================
   BUTTON SETUP
========================================================= */

function setupBackButton() {

    const button =
        document.getElementById(
            "entryBackButton"
        );

    if (button) {

        button.addEventListener(
            "click",
            goHome
        );
    }
}


function setupEntryBack() {

    const button =
        document.getElementById(
            "duaBackButton"
        );

    if (button) {

        button.addEventListener(
            "click",
            goEntries
        );
    }
}


function setupDuaBack() {
    /*
     * Kept for compatibility.
     */
}


function setupRetry() {

    const button =
        document.getElementById(
            "retryButton"
        );

    if (button) {

        button.addEventListener(
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
    }
}


/* =========================================================
   LANGUAGE WATCHER
========================================================= */

function setupLanguageWatcher() {

    window.addEventListener(
        "storage",
        (event) => {

            if (
                event.key !==
                    "ibadatSettings" &&
                event.key !==
                    "appSettings"
            ) {
                return;
            }

            const language =
                getLanguage();

            if (
                language ===
                currentLanguage
            ) {
                return;
            }

            currentLanguage =
                language;

            applyLanguage();
        }
    );
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        currentLanguage =
            getLanguage();

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
