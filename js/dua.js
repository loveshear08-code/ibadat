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
        previous: "আগের দোয়া",
        next: "পরের দোয়া",
        play: "চালান",
        pause: "বিরতি"
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
        previous: "Previous Dua",
        next: "Next Dua",
        play: "Play",
        pause: "Pause"
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
        previous: "पिछली दुआ",
        next: "अगली दुआ",
        play: "चलाएँ",
        pause: "रोकें"
    }

};


let currentLanguage = "bn";

let chapters = [];
let entries = [];

let currentChapterId = "";
let currentChapterTitle = "";

let currentEntryIndex = -1;

let currentAudio = null;
let currentAudioUrl = "";

let isLoadingEntry = false;


/* =========================================
   LANGUAGE
========================================= */

function getLanguage() {

    try {

        let saved =
            localStorage.getItem(
                "ibadatSettings"
            );

        if (!saved) {

            saved =
                localStorage.getItem(
                    "appSettings"
                );
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


/* =========================================
   TEXT HELPER
========================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;
    }
}


/* =========================================
   SHOW / HIDE
========================================= */

function hideAllPages() {

    const ids = [

        "loadingBox",
        "errorBox",
        "duaHome",
        "entryPage",
        "duaPage"

    ];


    ids.forEach(
        id => {

            const element =
                document.getElementById(
                    id
                );

            if (element) {

                element.classList.add(
                    "hidden"
                );
            }

        }
    );
}


/* =========================================
   API
========================================= */

async function apiFetch(
    url
) {

    const response =
        await fetch(
            url,
            {
                method: "GET",

                headers: {
                    "Accept":
                        "application/json"
                },

                cache: "no-cache"
            }
        );


    if (!response.ok) {

        let message =
            "HTTP " +
            response.status;


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


        throw new Error(
            message
        );
    }


    return await response.json();
}


/* =========================================
   NORMALIZE API RESPONSE
========================================= */

function getList(
    data,
    possibleKeys
) {

    if (
        Array.isArray(data)
    ) {

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


    return [];
}


/* =========================================
   CHAPTER TITLE
========================================= */

function getChapterTitle(
    chapter,
    index
) {

    if (!chapter) {

        return (
            "Chapter " +
            (index + 1)
        );
    }


    return (

        chapter.title ||
        chapter.name ||
        chapter.slug ||
        (
            "Chapter " +
            (index + 1)
        )

    );
}


/* =========================================
   ENTRY TITLE
========================================= */

function getEntryTitle(
    entry,
    index
) {

    if (!entry) {

        return (
            "Dua " +
            (index + 1)
        );
    }


    return (

        entry.title ||
        entry.name ||
        entry.slug ||
        (
            "Dua " +
            (index + 1)
        )

    );
}


/* =========================================
   LOAD CHAPTERS
========================================= */

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


    stopCurrentAudio();

    removeAudioPlayer();


    currentEntryIndex = -1;

    entries = [];


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


        if (
            !chapters.length
        ) {

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


/* =========================================
   RENDER CHAPTERS
========================================= */

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


    if (
        !chapters.length
    ) {

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
        (
            chapter,
            index
        ) => {

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
                () =>
                    openChapter(
                        chapter,
                        index
                    )
            );


            container.appendChild(
                card
            );

        }
    );
}


/* =========================================
   OPEN CHAPTER
========================================= */

async function openChapter(
    chapter,
    index
) {

    if (!chapter) {
        return;
    }


    stopCurrentAudio();

    removeAudioPlayer();


    currentEntryIndex = -1;

    entries = [];


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


    if (
        !currentChapterId
    ) {

        console.error(
            "Chapter ID missing:",
            chapter
        );


        return;
    }


    hideAllPages();


    const loadingBox =
        document.getElementById(
            "loadingBox"
        );


    if (loadingBox) {

        loadingBox.textContent =
            TEXT[
                currentLanguage
            ].loading;


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
            await apiFetch(
                url
            );


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


/* =========================================
   RENDER ENTRIES
========================================= */

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


    if (
        !entries.length
    ) {

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
        (
            entry,
            index
        ) => {

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
                "#" +
                (index + 1);


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
                () =>
                    openEntry(
                        entry,
                        index
                    )
            );


            container.appendChild(
                card
            );

        }
    );
}


/* =========================================
   OPEN ENTRY
========================================= */

async function openEntry(
    entry,
    index
) {

    if (!entry) {
        return;
    }


    if (
        index < 0 ||
        index >= entries.length
    ) {

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


    await loadEntry(
        index,
        true
    );
}


/* =========================================
   LOAD ENTRY DETAIL
========================================= */

async function loadEntry(
    index,
    showPage = true,
    autoPlay = false
) {

    if (
        isLoadingEntry
    ) {

        return;
    }


    if (
        index < 0 ||
        index >= entries.length
    ) {

        return;
    }


    const entry =
        entries[index];


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


    isLoadingEntry = true;


    if (showPage) {

        hideAllPages();


        const loadingBox =
            document.getElementById(
                "loadingBox"
            );


        if (loadingBox) {

            loadingBox.textContent =
                TEXT[
                    currentLanguage
                ].loading;


            loadingBox.classList.remove(
                "hidden"
            );
        }
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
            await apiFetch(
                url
            );


        console.log(
            "Dua detail response:",
            data
        );


        currentEntryIndex =
            index;


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


        if (showPage) {

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


            window.scrollTo(
                0,
                0
            );
        }


        const audioUrl =
            getEntryAudioUrl(
                data
            );


        createAudioPlayer(
            audioUrl,
            index
        );


        if (
            autoPlay &&
            audioUrl
        ) {

            try {

                await currentAudio.play();

            } catch (error) {

                console.log(
                    "Audio autoplay blocked:",
                    error
                );
            }
        }


    } catch (error) {

        console.error(
            "OpenDua detail error:",
            error
        );


        if (showPage) {

            showError();
        }

    } finally {

        isLoadingEntry =
            false;
    }
}


/* =========================================
   RENDER COMPLETE DUA
========================================= */

function renderDua(
    data
) {

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
     * OpenDua documented structure:
     *
     * data.variations[]
     *      ↓
     * steps[]
     *      ↓
     * items[]
     *      ↓
     * dua{}
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


                        /*
                         * Existing inline audio.
                         * Recordings belong to the
                         * recitation step.
                         */

                        if (
                            Array.isArray(
                                step.recordings
                            )
                        ) {

                            step.recordings.forEach(
                                recording => {

                                    if (
                                        recording &&
                                        recording.url
                                    ) {

                                        addAudio(
                                            recording.url,
                                            card
                                        );
                                    }

                                }
                            );
                        }

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
     * Entry-level source reference
     */

    if (
        data.sourceReference
    ) {

        addReference(
            TEXT[
                currentLanguage
            ].reference +
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


/* =========================================
   RENDER DUA OBJECT
========================================= */

function renderDuaObject(
    dua,
    card
) {

    if (!dua) {
        return;
    }


    const t =
        TEXT[
            currentLanguage
        ];


    /*
     * Arabic
     */

    if (
        dua.arabic
    ) {

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
     * English translation
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


/* =========================================
   LABEL
========================================= */

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


/* =========================================
   REFERENCE
========================================= */

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


/* =========================================
   REFERENCE TEXT
========================================= */

function getReferenceText(
    reference
) {

    if (!reference) {
        return "";
    }


    if (
        typeof reference ===
        "string"
    ) {

        return reference;
    }


    if (
        typeof reference ===
        "object"
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


/* =========================================
   EXISTING INLINE AUDIO
========================================= */

function addAudio(
    url,
    card
) {

    if (!url) {
        return;
    }


    const audio =
        document.createElement(
            "audio"
        );


    audio.className =
        "dua-audio";


    audio.controls =
        true;


    audio.preload =
        "none";


    audio.src =
        url;


    card.appendChild(
        audio
    );
}


/* =========================================
   GET ENTRY AUDIO URL
========================================= */

function getEntryAudioUrl(
    data
) {

    if (!data) {
        return "";
    }


    /*
     * OpenDua:
     *
     * variations[]
     *    ↓
     * steps[]
     *    ↓
     * recordings[]
     */

    if (
        Array.isArray(
            data.variations
        )
    ) {

        for (
            const variation
            of data.variations
        ) {

            if (
                !variation ||
                !Array.isArray(
                    variation.steps
                )
            ) {

                continue;
            }


            for (
                const step
                of variation.steps
            ) {

                if (
                    !step ||
                    !Array.isArray(
                        step.recordings
                    )
                ) {

                    continue;
                }


                for (
                    const recording
                    of step.recordings
                ) {

                    if (
                        recording &&
                        recording.url
                    ) {

                        return recording.url;
                    }
                }
            }
        }
    }


    /*
     * Additional fallback:
     * Some API responses may expose
     * recording directly.
     */

    if (
        Array.isArray(
            data.recordings
        )
    ) {

        for (
            const recording
            of data.recordings
        ) {

            if (
                recording &&
                recording.url
            ) {

                return recording.url;
            }
        }
    }


    return "";
}


/* =========================================
   CREATE AUDIO PLAYER
========================================= */

function createAudioPlayer(
    url,
    index
) {

    removeAudioPlayer();


    currentAudio = null;
    currentAudioUrl = "";


    const player =
        document.createElement(
            "div"
        );


    player.id =
        "duaAudioPlayer";


    player.className =
        "dua-audio-player";


    /*
     * PLAYER TITLE
     */

    const title =
        document.createElement(
            "div"
        );


    title.className =
        "audio-player-title";


    title.id =
        "audioPlayerTitle";


    title.textContent =
        getEntryTitle(
            entries[index],
            index
        );


    player.appendChild(
        title
    );


    /*
     * PROGRESS AREA
     */

    const progressRow =
        document.createElement(
            "div"
        );


    progressRow.className =
        "audio-progress-row";


    const currentTime =
        document.createElement(
            "span"
        );


    currentTime.id =
        "audioCurrentTime";


    currentTime.textContent =
        "0:00";


    const progress =
        document.createElement(
            "input"
        );


    progress.type =
        "range";


    progress.id =
        "audioProgress";


    progress.min =
        "0";


    progress.max =
        "100";


    progress.value =
        "0";


    progress.step =
        "0.1";


    progress.setAttribute(
        "aria-label",
        "Audio progress"
    );


    const duration =
        document.createElement(
            "span"
        );


    duration.id =
        "audioDuration";


    duration.textContent =
        "0:00";


    progressRow.appendChild(
        currentTime
    );


    progressRow.appendChild(
        progress
    );


    progressRow.appendChild(
        duration
    );


    player.appendChild(
        progressRow
    );


    /*
     * CONTROL AREA
     */

    const controls =
        document.createElement(
            "div"
        );


    controls.className =
        "audio-controls";


    const previousButton =
        document.createElement(
            "button"
        );


    previousButton.id =
        "audioPrevious";


    previousButton.type =
        "button";


    previousButton.textContent =
        "⏮";


    previousButton.setAttribute(
        "aria-label",
        TEXT[
            currentLanguage
        ].previous
    );


    const playButton =
        document.createElement(
            "button"
        );


    playButton.id =
        "audioPlayPause";


    playButton.type =
        "button";


    playButton.textContent =
        "▶";


    playButton.setAttribute(
        "aria-label",
        TEXT[
            currentLanguage
        ].play
    );


    const nextButton =
        document.createElement(
            "button"
        );


    nextButton.id =
        "audioNext";


    nextButton.type =
        "button";


    nextButton.textContent =
        "⏭";


    nextButton.setAttribute(
        "aria-label",
        TEXT[
            currentLanguage
        ].next
    );


    controls.appendChild(
        previousButton
    );


    controls.appendChild(
        playButton
    );


    controls.appendChild(
        nextButton
    );


    player.appendChild(
        controls
    );


    document.body.appendChild(
        player
    );


    /*
     * AUDIO OBJECT
     */

    if (url) {

        currentAudio =
            new Audio();


        currentAudio.preload =
            "metadata";


        currentAudio.src =
            url;


        currentAudioUrl =
            url;


        attachAudioEvents(
            progress,
            currentTime,
            duration,
            playButton
        );
    }


    /*
     * PLAY / PAUSE
     */

    playButton.addEventListener(
        "click",
        async () => {

            if (!currentAudio) {
                return;
            }


            if (
                currentAudio.paused
            ) {

                try {

                    await currentAudio.play();

                } catch (error) {

                    console.error(
                        "Audio play error:",
                        error
                    );
                }

            } else {

                currentAudio.pause();
            }

        }
    );


    /*
     * PREVIOUS
     */

    previousButton.addEventListener(
        "click",
        () => {

            playPreviousEntry();

        }
    );


    /*
     * NEXT
     */

    nextButton.addEventListener(
        "click",
        () => {

            playNextEntry(
                true
            );

        }
    );


    /*
     * PROGRESS SEEK
     */

    progress.addEventListener(
        "input",
        () => {

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
                        progress.value
                    ) / 100
                ) *
                currentAudio.duration;

        }
    );
}


/* =========================================
   AUDIO EVENTS
========================================= */

function attachAudioEvents(
    progress,
    currentTime,
    duration,
    playButton
) {

    if (!currentAudio) {
        return;
    }


    currentAudio.addEventListener(
        "loadedmetadata",
        () => {

            if (
                Number.isFinite(
                    currentAudio.duration
                )
            ) {

                duration.textContent =
                    formatAudioTime(
                        currentAudio.duration
                    );
            }
        }
    );


    currentAudio.addEventListener(
        "timeupdate",
        () => {

            if (
                Number.isFinite(
                    currentAudio.duration
                ) &&
                currentAudio.duration > 0
            ) {

                const percent =

                    (
                        currentAudio.currentTime /
                        currentAudio.duration
                    ) *
                    100;


                progress.value =
                    percent;
            }


            currentTime.textContent =
                formatAudioTime(
                    currentAudio.currentTime
                );
        }
    );


    currentAudio.addEventListener(
        "play",
        () => {

            playButton.textContent =
                "⏸";


            playButton.setAttribute(
                "aria-label",
                TEXT[
                    currentLanguage
                ].pause
            );
        }
    );


    currentAudio.addEventListener(
        "pause",
        () => {

            playButton.textContent =
                "▶";


            playButton.setAttribute(
                "aria-label",
                TEXT[
                    currentLanguage
                ].play
            );
        }
    );


    /*
     * AUTO NEXT
     */

    currentAudio.addEventListener(
        "ended",
        () => {

            playNextEntry(
                true
            );

        }
    );
}


/* =========================================
   NEXT ENTRY
========================================= */

async function playNextEntry(
    autoPlay = true
) {

    if (
        currentEntryIndex < 0
    ) {

        return;
    }


    const nextIndex =
        currentEntryIndex + 1;


    /*
     * Last entry
     */

    if (
        nextIndex >= entries.length
    ) {

        if (currentAudio) {

            currentAudio.currentTime =
                0;
        }


        return;
    }


    await loadEntry(
        nextIndex,
        true,
        autoPlay
    );
}


/* =========================================
   PREVIOUS ENTRY
========================================= */

async function playPreviousEntry() {

    if (
        currentEntryIndex < 0
    ) {

        return;
    }


    /*
     * If current audio has played
     * more than 3 seconds, previous
     * button first restarts current audio.
     */

    if (
        currentAudio &&
        currentAudio.currentTime > 3
    ) {

        currentAudio.currentTime =
            0;


        return;
    }


    const previousIndex =
        currentEntryIndex - 1;


    if (
        previousIndex < 0
    ) {

        if (currentAudio) {

            currentAudio.currentTime =
                0;
        }


        return;
    }


    await loadEntry(
        previousIndex,
        true,
        true
    );
}


/* =========================================
   STOP CURRENT AUDIO
========================================= */

function stopCurrentAudio() {

    if (currentAudio) {

        try {

            currentAudio.pause();

            currentAudio.currentTime =
                0;

        } catch (error) {}
    }


    currentAudio =
        null;


    currentAudioUrl =
        "";
}


/* =========================================
   REMOVE PLAYER
========================================= */

function removeAudioPlayer() {

    const player =
        document.getElementById(
            "duaAudioPlayer"
        );


    if (player) {

        player.remove();
    }
}


/* =========================================
   AUDIO TIME FORMAT
========================================= */

function formatAudioTime(
    seconds
) {

    if (
        !Number.isFinite(
            seconds
        )
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


/* =========================================
   ERROR
========================================= */

function showError() {

    stopCurrentAudio();

    removeAudioPlayer();


    hideAllPages();


    const t =
        TEXT[
            currentLanguage
        ];


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


/* =========================================
   HOME
========================================= */

function goHome() {

    stopCurrentAudio();

    removeAudioPlayer();


    currentEntryIndex =
        -1;


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


/* =========================================
   ENTRY LIST
========================================= */

function goEntries() {

    stopCurrentAudio();

    removeAudioPlayer();


    currentEntryIndex =
        -1;


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


/* =========================================
   MAIN BACK
========================================= */

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


/* =========================================
   ENTRY BACK
========================================= */

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


/* =========================================
   DUA BACK
========================================= */

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


/* =========================================
   RETRY
========================================= */

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


/* =========================================
   LANGUAGE CHANGE
========================================= */

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

                location.reload();
            }

        }
    );
}


/* =========================================
   PAGE EXIT
========================================= */

window.addEventListener(
    "beforeunload",
    () => {

        stopCurrentAudio();

    }
);


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupBackButton();

        setupEntryBack();

        setupDuaBack();

        setupRetry();

        setupLanguageWatcher();

        loadChapters();

    }
);
