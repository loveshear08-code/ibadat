const API_BASE = "https://api.opendua.org/v2";
const COLLECTION_ID = "hisn-al-muslim";

const TEXT = {
    bn: {
        pageTitle: "দোয়া",
        introTitle: "দোয়া",
        introText: "অনলাইন উৎস থেকে দোয়ার তথ্য দেখানো হচ্ছে।",
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
        listen: "শুনুন"
    },

    en: {
        pageTitle: "Dua",
        introTitle: "Dua",
        introText: "Dua information is loaded from the online source.",
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
        listen: "Listen"
    },

    hi: {
        pageTitle: "दुआ",
        introTitle: "दुआ",
        introText: "दुआ की जानकारी ऑनलाइन स्रोत से लाई जा रही है।",
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
        listen: "सुनें"
    }
};

let currentLanguage = "bn";
let chapters = [];
let entries = [];
let currentChapterId = "";
let currentChapterTitle = "";


/* =========================================
   LANGUAGE
========================================= */

function getLanguage() {
    try {
        let saved = localStorage.getItem("ibadatSettings");

        if (!saved) {
            saved = localStorage.getItem("appSettings");
        }

        if (saved) {
            const settings = JSON.parse(saved);

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

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
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

    ids.forEach(id => {
        const element = document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }
    });
}


/* =========================================
   API
========================================= */

async function apiFetch(url) {

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
        cache: "no-cache"
    });

    if (!response.ok) {

        let message = "HTTP " + response.status;

        try {
            const errorData = await response.json();

            if (errorData && errorData.error) {
                message = errorData.error;
            }
        } catch (error) {}

        throw new Error(message);
    }

    return await response.json();
}


/* =========================================
   NORMALIZE API RESPONSE
========================================= */

function getList(data, possibleKeys) {

    if (Array.isArray(data)) {
        return data;
    }

    if (!data || typeof data !== "object") {
        return [];
    }

    for (const key of possibleKeys) {

        if (Array.isArray(data[key])) {
            return data[key];
        }
    }

    return [];
}


/* =========================================
   CHAPTER TITLE
========================================= */

function getChapterTitle(chapter, index) {

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


/* =========================================
   ENTRY TITLE
========================================= */

function getEntryTitle(entry, index) {

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


/* =========================================
   LOAD CHAPTERS
========================================= */

async function loadChapters() {

    currentLanguage = getLanguage();

    const t = TEXT[currentLanguage];

    setText("pageTitle", t.pageTitle);
    setText("introTitle", t.introTitle);
    setText("introText", t.introText);
    setText("retryButton", t.retry);

    hideAllPages();

    const loadingBox =
        document.getElementById("loadingBox");

    if (loadingBox) {
        loadingBox.textContent = t.loading;
        loadingBox.classList.remove("hidden");
    }

    try {

        const url =
            API_BASE +
            "/collections/" +
            COLLECTION_ID +
            "/chapters";

        console.log("Dua chapters URL:", url);

        const data = await apiFetch(url);

        console.log("Dua chapters response:", data);

        chapters = getList(data, [
            "chapters",
            "data",
            "items",
            "results"
        ]);

        if (!chapters.length) {
            throw new Error("EMPTY_CHAPTER_LIST");
        }

        renderChapters();

        hideAllPages();

        const home =
            document.getElementById("duaHome");

        if (home) {
            home.classList.remove("hidden");
        }

        window.scrollTo(0, 0);

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
        document.getElementById("chapterList");

    if (!container) return;

    container.innerHTML = "";

    const t = TEXT[currentLanguage];

    if (!chapters.length) {

        const empty =
            document.createElement("div");

        empty.className = "status-box";
        empty.textContent = t.noData;

        container.appendChild(empty);

        return;
    }

    chapters.forEach((chapter, index) => {

        const card =
            document.createElement("div");

        card.className = "chapter-card";


        const number =
            document.createElement("div");

        number.className = "chapter-number";

        number.textContent =
            index + 1;


        const info =
            document.createElement("div");

        info.className = "chapter-info";


        const title =
            document.createElement("div");

        title.className = "chapter-title";

        title.textContent =
            getChapterTitle(
                chapter,
                index
            );


        info.appendChild(title);


        const arrow =
            document.createElement("div");

        arrow.className =
            "chapter-arrow";

        arrow.textContent = "›";


        card.appendChild(number);
        card.appendChild(info);
        card.appendChild(arrow);


        card.addEventListener(
            "click",
            () => openChapter(chapter, index)
        );


        container.appendChild(card);
    });
}


/* =========================================
   OPEN CHAPTER
========================================= */

async function openChapter(chapter, index) {

    if (!chapter) return;

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


    hideAllPages();

    const loadingBox =
        document.getElementById("loadingBox");

    if (loadingBox) {
        loadingBox.textContent =
            TEXT[currentLanguage].loading;

        loadingBox.classList.remove("hidden");
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
            getList(data, [
                "entries",
                "data",
                "items",
                "results"
            ]);


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

        window.scrollTo(0, 0);

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

    if (!container) return;

    container.innerHTML = "";

    const t = TEXT[currentLanguage];


    if (!entries.length) {

        const empty =
            document.createElement("div");

        empty.className =
            "status-box";

        empty.textContent =
            t.noData;

        container.appendChild(empty);

        return;
    }


    entries.forEach((entry, index) => {

        const card =
            document.createElement("div");

        card.className =
            "entry-card";


        const number =
            document.createElement("div");

        number.className =
            "entry-number";

        number.textContent =
            "#" + (index + 1);


        const title =
            document.createElement("div");

        title.className =
            "entry-title";

        title.textContent =
            getEntryTitle(
                entry,
                index
            );


        card.appendChild(number);
        card.appendChild(title);


        card.addEventListener(
            "click",
            () => openEntry(entry, index)
        );


        container.appendChild(card);
    });
}


/* =========================================
   OPEN ENTRY
========================================= */

async function openEntry(entry, index) {

    if (!entry) return;


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


        setText(
            "duaPageTitle",
            getEntryTitle(
                data,
                index
            )
        );


        renderDua(data);


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


        window.scrollTo(0, 0);

    } catch (error) {

        console.error(
            "OpenDua detail error:",
            error
        );

        showError();
    }
}


/* =========================================
   RENDER COMPLETE DUA
========================================= */

function renderDua(data) {

    const container =
        document.getElementById(
            "duaContent"
        );

    if (!container) return;

    container.innerHTML = "";


    const card =
        document.createElement("div");

    card.className =
        "dua-card";


    const title =
        document.createElement("div");

    title.className =
        "dua-title";

    title.textContent =
        data.title ||
        data.name ||
        "";


    card.appendChild(title);


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
        Array.isArray(data.variations) &&
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
                         * Recordings belong to
                         * the recitation step.
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

        /*
         * Fallback if API returns
         * a direct dua object.
         */

        renderDuaObject(
            data,
            card
        );
    }


    /*
     * Entry-level source reference
     */

    if (data.sourceReference) {

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
        Array.isArray(data.references) &&
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


    container.appendChild(card);
}


/* =========================================
   RENDER DUA OBJECT
========================================= */

function renderDuaObject(
    dua,
    card
) {

    if (!dua) return;

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
            document.createElement("div");

        arabic.className =
            "dua-arabic";

        arabic.textContent =
            dua.arabic;

        card.appendChild(arabic);
    }


    /*
     * Transliteration
     */

    if (dua.transliteration) {

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

    if (dua.translation) {

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
        Array.isArray(dua.references) &&
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

    card.appendChild(label);
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

    card.appendChild(reference);
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


/* =========================================
   AUDIO
========================================= */

function addAudio(
    url,
    card
) {

    const audio =
        document.createElement(
            "audio"
        );

    audio.className =
        "dua-audio";

    audio.controls = true;

    audio.preload = "none";

    audio.src = url;

    card.appendChild(audio);
}


/* =========================================
   ERROR
========================================= */

function showError() {

    hideAllPages();

    const t =
        TEXT[currentLanguage];


    const errorBox =
        document.getElementById(
            "errorBox"
        );

    if (!errorBox) return;


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

    window.scrollTo(0, 0);
}


/* =========================================
   ENTRY LIST
========================================= */

function goEntries() {

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

    window.scrollTo(0, 0);
}


/* =========================================
   MAIN BACK
========================================= */

function setupBackButton() {

    const button =
        document.getElementById(
            "backButton"
        );

    if (!button) return;


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

    if (!button) return;


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

    if (!button) return;


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

    if (!button) return;


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
