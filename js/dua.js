const API_BASE = "https://api.opendua.org/v2";

const TEXT = {

    bn: {
        pageTitle: "দোয়া",
        introTitle: "দোয়া",
        introText: "অনলাইন উৎস থেকে দোয়া ও সংশ্লিষ্ট তথ্য দেখানো হচ্ছে।",
        loading: "দোয়া লোড হচ্ছে...",
        retry: "আবার চেষ্টা করুন",
        error: "দোয়া লোড করা যাচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করুন।",
        chapters: "দোয়ার অধ্যায়",
        entries: "দোয়া",
        arabic: "আরবি",
        transliteration: "উচ্চারণ",
        translation: "অর্থ",
        reference: "সূত্র",
        audio: "শুনুন",
        noData: "কোনো দোয়া পাওয়া যায়নি।",
        back: "←"
    },

    en: {
        pageTitle: "Dua",
        introTitle: "Dua",
        introText: "Duas and related information are loaded from the online source.",
        loading: "Loading duas...",
        retry: "Try Again",
        error: "Unable to load duas. Please check your internet connection.",
        chapters: "Dua Chapters",
        entries: "Duas",
        arabic: "Arabic",
        transliteration: "Transliteration",
        translation: "Meaning",
        reference: "Reference",
        audio: "Listen",
        noData: "No duas were found.",
        back: "←"
    },

    hi: {
        pageTitle: "दुआ",
        introTitle: "दुआ",
        introText: "दुआ और संबंधित जानकारी ऑनलाइन स्रोत से लाई जा रही है।",
        loading: "दुआ लोड हो रही है...",
        retry: "फिर प्रयास करें",
        error: "दुआ लोड नहीं हो सकी। कृपया इंटरनेट कनेक्शन जाँचें।",
        chapters: "दुआ के अध्याय",
        entries: "दुआ",
        arabic: "अरबी",
        transliteration: "उच्चारण",
        translation: "अर्थ",
        reference: "स्रोत",
        audio: "सुनें",
        noData: "कोई दुआ नहीं मिली।",
        back: "←"
    }

};


let currentLanguage = "bn";

let currentChapters = [];
let currentEntries = [];

let currentChapterId = null;
let currentChapterTitle = "";

let pageHistory = [];


/* =========================================
   LANGUAGE
========================================= */

function getLanguage(){

    try{

        let saved = localStorage.getItem("ibadatSettings");

        if(!saved){
            saved = localStorage.getItem("appSettings");
        }

        if(saved){

            const settings = JSON.parse(saved);

            if(
                settings.lang === "bn" ||
                settings.lang === "en" ||
                settings.lang === "hi"
            ){
                return settings.lang;
            }

        }

    }catch(e){}

    return "bn";
}


/* =========================================
   TEXT
========================================= */

function setText(id,value){

    const element = document.getElementById(id);

    if(element){
        element.textContent = value;
    }

}


/* =========================================
   PAGE VISIBILITY
========================================= */

function hideAllPages(){

    document.getElementById("loadingBox")
        ?.classList.add("hidden");

    document.getElementById("errorBox")
        ?.classList.add("hidden");

    document.getElementById("duaHome")
        ?.classList.add("hidden");

    document.getElementById("entryPage")
        ?.classList.add("hidden");

    document.getElementById("duaPage")
        ?.classList.add("hidden");

}


/* =========================================
   API FETCH
========================================= */

async function apiFetch(url){

    const response = await fetch(url, {
        method:"GET",
        headers:{
            "Accept":"application/json"
        },
        cache:"no-store"
    });

    if(!response.ok){

        throw new Error(
            "HTTP " + response.status
        );

    }

    return await response.json();

}


/* =========================================
   LOAD COLLECTION
========================================= */

async function loadDua(){

    currentLanguage = getLanguage();

    const t = TEXT[currentLanguage];

    setText("pageTitle", t.pageTitle);
    setText("introTitle", t.introTitle);
    setText("introText", t.introText);
    setText("retryButton", t.retry);

    hideAllPages();

    const loadingBox = document.getElementById("loadingBox");

    if(loadingBox){

        loadingBox.textContent = t.loading;
        loadingBox.classList.remove("hidden");

    }

    try{

        /*
         * We use the Hisn al-Muslim collection.
         * OpenDua documents this collection as
         * "hisn-al-muslim".
         */

        const data = await apiFetch(
            API_BASE + "/collections/hisn-al-muslim/chapters"
        );

        currentChapters = extractArray(data);

        hideAllPages();

        renderChapters();

        document
            .getElementById("duaHome")
            ?.classList.remove("hidden");

        window.scrollTo(0,0);

    }catch(error){

        console.error("Dua API error:",error);

        hideAllPages();

        const errorBox =
            document.getElementById("errorBox");

        if(errorBox){

            setText("errorText",t.error);

            errorBox.classList.remove("hidden");

        }

    }

}


/* =========================================
   EXTRACT ARRAY
========================================= */

function extractArray(data){

    if(Array.isArray(data)){
        return data;
    }

    if(data && Array.isArray(data.data)){
        return data.data;
    }

    if(data && Array.isArray(data.chapters)){
        return data.chapters;
    }

    if(data && Array.isArray(data.entries)){
        return data.entries;
    }

    return [];

}


/* =========================================
   RENDER CHAPTERS
========================================= */

function renderChapters(){

    const container =
        document.getElementById("chapterList");

    if(!container) return;

    container.innerHTML = "";

    if(!currentChapters.length){

        const empty =
            document.createElement("div");

        empty.className = "status-box";

        empty.textContent =
            TEXT[currentLanguage].noData;

        container.appendChild(empty);

        return;

    }


    currentChapters.forEach((chapter,index)=>{

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
            getTitle(chapter,index);


        info.appendChild(title);


        const arrow =
            document.createElement("div");

        arrow.className = "chapter-arrow";

        arrow.textContent = "›";


        card.appendChild(number);
        card.appendChild(info);
        card.appendChild(arrow);


        card.addEventListener("click",()=>{

            openChapter(chapter);

        });


        container.appendChild(card);

    });

}


/* =========================================
   GET TITLE
========================================= */

function getTitle(item,index){

    if(!item){
        return "Chapter " + (index + 1);
    }

    return (
        item.title ||
        item.name ||
        item.arabicTitle ||
        item.slug ||
        ("Chapter " + (index + 1))
    );

}


/* =========================================
   OPEN CHAPTER
========================================= */

async function openChapter(chapter){

    if(!chapter) return;

    currentChapterId =
        chapter.id ||
        chapter.chapterId;

    currentChapterTitle =
        getTitle(chapter,0);


    pageHistory.push("home");


    hideAllPages();

    const loading =
        document.getElementById("loadingBox");

    if(loading){

        loading.textContent =
            TEXT[currentLanguage].loading;

        loading.classList.remove("hidden");

    }


    try{

        const data = await apiFetch(
            API_BASE +
            "/collections/hisn-al-muslim/chapters/" +
            encodeURIComponent(currentChapterId) +
            "/entries"
        );


        currentEntries =
            extractArray(data);


        hideAllPages();

        setText(
            "entryPageTitle",
            currentChapterTitle
        );


        renderEntries();


        document
            .getElementById("entryPage")
            ?.classList.remove("hidden");


        window.scrollTo(0,0);

    }catch(error){

        console.error(
            "Chapter API error:",
            error
        );

        pageHistory.pop();

        hideAllPages();

        const errorBox =
            document.getElementById("errorBox");

        if(errorBox){

            setText(
                "errorText",
                TEXT[currentLanguage].error
            );

            errorBox.classList.remove("hidden");

        }

    }

}


/* =========================================
   RENDER ENTRIES
========================================= */

function renderEntries(){

    const container =
        document.getElementById("entryList");

    if(!container) return;

    container.innerHTML = "";


    if(!currentEntries.length){

        const empty =
            document.createElement("div");

        empty.className = "status-box";

        empty.textContent =
            TEXT[currentLanguage].noData;

        container.appendChild(empty);

        return;

    }


    currentEntries.forEach((entry,index)=>{

        const card =
            document.createElement("div");

        card.className = "entry-card";


        const number =
            document.createElement("div");

        number.className = "entry-number";

        number.textContent =
            "#" + (index + 1);


        const title =
            document.createElement("div");

        title.className = "entry-title";

        title.textContent =
            getTitle(entry,index);


        card.appendChild(number);
        card.appendChild(title);


        card.addEventListener("click",()=>{

            openEntry(entry);

        });


        container.appendChild(card);

    });

}


/* =========================================
   OPEN ENTRY
========================================= */

async function openEntry(entry){

    if(!entry) return;


    const entryId =
        entry.id ||
        entry.entryId;


    if(!entryId) return;


    pageHistory.push("entries");


    hideAllPages();


    const loading =
        document.getElementById("loadingBox");

    if(loading){

        loading.textContent =
            TEXT[currentLanguage].loading;

        loading.classList.remove("hidden");

    }


    try{

        const data = await apiFetch(
            API_BASE +
            "/entries/" +
            encodeURIComponent(entryId)
        );


        hideAllPages();


        setText(
            "duaPageTitle",
            entry.title ||
            entry.name ||
            TEXT[currentLanguage].entries
        );


        renderDua(data);


        document
            .getElementById("duaPage")
            ?.classList.remove("hidden");


        window.scrollTo(0,0);

    }catch(error){

        console.error(
            "Entry API error:",
            error
        );

        pageHistory.pop();

        hideAllPages();

        const errorBox =
            document.getElementById("errorBox");

        if(errorBox){

            setText(
                "errorText",
                TEXT[currentLanguage].error
            );

            errorBox.classList.remove("hidden");

        }

    }

}


/* =========================================
   RENDER DUA
========================================= */

function renderDua(data){

    const container =
        document.getElementById("duaContent");

    if(!container) return;

    container.innerHTML = "";


    const card =
        document.createElement("div");

    card.className = "dua-card";


    const title =
        document.createElement("div");

    title.className = "dua-title";

    title.textContent =
        data.title ||
        data.name ||
        "";

    card.appendChild(title);


    /*
     * OpenDua entries contain variations,
     * steps and recitation items.
     */

    const variations =
        Array.isArray(data.variations)
        ? data.variations
        : [];


    if(!variations.length){

        renderFallbackDua(data,card);

    }else{

        variations.forEach(variation=>{

            renderVariation(
                variation,
                card
            );

        });

    }


    renderEntryReference(
        data,
        card
    );


    container.appendChild(card);

}


/* =========================================
   RENDER VARIATION
========================================= */

function renderVariation(
    variation,
    card
){

    const steps =
        Array.isArray(variation.steps)
        ? variation.steps
        : [];


    steps.forEach(step=>{

        if(!step) return;


        const items =
            Array.isArray(step.items)
            ? step.items
            : [];


        items.forEach(item=>{

            if(!item) return;


            const dua =
                item.dua;


            if(!dua) return;


            renderDuaObject(
                dua,
                card
            );


            /*
             * Audio recordings
             */

            if(
                Array.isArray(step.recordings) &&
                step.recordings.length
            ){

                step.recordings.forEach(
                    recording=>{

                        if(
                            recording &&
                            recording.url
                        ){

                            const audio =
                                document.createElement("audio");

                            audio.className =
                                "dua-audio";

                            audio.controls = true;

                            audio.preload = "none";

                            audio.src =
                                recording.url;

                            card.appendChild(audio);

                        }

                    }
                );

            }

        });

    });

}


/* =========================================
   RENDER DUA OBJECT
========================================= */

function renderDuaObject(
    dua,
    card
){

    const t =
        TEXT[currentLanguage];


    if(dua.arabic){

        const label =
            document.createElement("div");

        label.className =
            "dua-section-label";

        label.textContent =
            t.arabic;

        card.appendChild(label);


        const arabic =
            document.createElement("div");

        arabic.className =
            "dua-arabic";

        arabic.textContent =
            dua.arabic;

        card.appendChild(arabic);

    }


    if(dua.transliteration){

        const label =
            document.createElement("div");

        label.className =
            "dua-section-label";

        label.textContent =
            t.transliteration;

        card.appendChild(label);


        const text =
            document.createElement("div");

        text.className =
            "dua-transliteration";

        text.textContent =
            dua.transliteration;

        card.appendChild(text);

    }


    if(dua.translation){

        const label =
            document.createElement("div");

        label.className =
            "dua-section-label";

        label.textContent =
            t.translation;

        card.appendChild(label);


        const text =
            document.createElement("div");

        text.className =
            "dua-translation";

        text.textContent =
            dua.translation;

        card.appendChild(text);

    }


    if(
        Array.isArray(dua.references) &&
        dua.references.length
    ){

        renderReferences(
            dua.references,
            card
        );

    }

}


/* =========================================
   FALLBACK DUA
========================================= */

function renderFallbackDua(
    data,
    card
){

    /*
     * This keeps the renderer tolerant
     * if the API returns a direct dua object.
     */

    if(
        data.arabic ||
        data.transliteration ||
        data.translation
    ){

        renderDuaObject(
            data,
            card
        );

    }

}


/* =========================================
   REFERENCES
========================================= */

function renderReferences(
    references,
    card
){

    const t =
        TEXT[currentLanguage];


    const label =
        document.createElement("div");

    label.className =
        "dua-section-label";

    label.textContent =
        t.reference;

    card.appendChild(label);


    const reference =
        document.createElement("div");

    reference.className =
        "dua-reference";


    references.forEach(
        (referenceItem,index)=>{

            if(!referenceItem) return;


            const line =
                document.createElement("div");


            if(
                typeof referenceItem === "string"
            ){

                line.textContent =
                    referenceItem;

            }else{

                line.textContent =
                    referenceItem.name ||
                    referenceItem.title ||
                    referenceItem.text ||
                    referenceItem.id ||
                    "";

            }


            if(index > 0){

                line.style.marginTop =
                    "5px";

            }


            reference.appendChild(line);

        }
    );


    card.appendChild(reference);

}


/* =========================================
   ENTRY REFERENCE
========================================= */

function renderEntryReference(
    data,
    card
){

    const t =
        TEXT[currentLanguage];


    if(
        data.sourceReference
    ){

        const reference =
            document.createElement("div");

        reference.className =
            "dua-reference";

        reference.textContent =
            t.reference +
            ": " +
            data.sourceReference;

        card.appendChild(reference);

    }


    if(
        Array.isArray(data.tags) &&
        data.tags.length
    ){

        const tags =
            document.createElement("div");

        tags.className =
            "dua-tags";


        data.tags.forEach(tag=>{

            const tagElement =
                document.createElement("span");

            tagElement.className =
                "dua-tag";

            tagElement.textContent =
                tag;

            tags.appendChild(tagElement);

        });


        card.appendChild(tags);

    }

}


/* =========================================
   BACK TO HOME
========================================= */

function goHome(){

    pageHistory = [];

    hideAllPages();

    renderChapters();

    document
        .getElementById("duaHome")
        ?.classList.remove("hidden");

    window.scrollTo(0,0);

}


/* =========================================
   BACK TO ENTRIES
========================================= */

function goEntries(){

    pageHistory.pop();

    hideAllPages();

    setText(
        "entryPageTitle",
        currentChapterTitle
    );

    renderEntries();

    document
        .getElementById("entryPage")
        ?.classList.remove("hidden");

    window.scrollTo(0,0);

}


/* =========================================
   MAIN BACK BUTTON
========================================= */

function setupBackButton(){

    const button =
        document.getElementById("backButton");

    if(!button) return;


    button.addEventListener(
        "click",
        ()=>{

            /*
             * If an internal page is open,
             * go back inside Dua first.
             */

            if(
                !document
                    .getElementById("duaPage")
                    ?.classList.contains("hidden")
            ){

                goEntries();

                return;

            }


            if(
                !document
                    .getElementById("entryPage")
                    ?.classList.contains("hidden")
            ){

                goHome();

                return;

            }


            /*
             * Main Dua page:
             * return to the previous IBADAT page.
             */

            history.back();

        }
    );

}


/* =========================================
   ENTRY BACK BUTTON
========================================= */

function setupEntryBack(){

    const button =
        document.getElementById(
            "entryBackButton"
        );

    if(!button) return;


    button.addEventListener(
        "click",
        ()=>{

            goHome();

        }
    );

}


/* =========================================
   DUA BACK BUTTON
========================================= */

function setupDuaBack(){

    const button =
        document.getElementById(
            "duaBackButton"
        );

    if(!button) return;


    button.addEventListener(
        "click",
        ()=>{

            goEntries();

        }
    );

}


/* =========================================
   RETRY
========================================= */

function setupRetry(){

    const button =
        document.getElementById(
            "retryButton"
        );

    if(!button) return;


    button.addEventListener(
        "click",
        ()=>{

            loadDua();

        }
    );

}


/* =========================================
   LANGUAGE REFRESH
========================================= */

function watchLanguageChanges(){

    window.addEventListener(
        "storage",
        event=>{

            if(
                event.key === "ibadatSettings" ||
                event.key === "appSettings"
            ){

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
    ()=>{

        setupBackButton();

        setupEntryBack();

        setupDuaBack();

        setupRetry();

        watchLanguageChanges();

        loadDua();

    }
);
