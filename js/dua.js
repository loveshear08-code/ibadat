const API_BASE = "https://api.opendua.org/v2";
const COLLECTION_ID = "hisn-al-muslim";

let currentLanguage = "bn";

let chapters = [];
let currentChapter = null;
let currentEntries = [];
let currentEntry = null;


/* =========================
   LANGUAGE
========================= */

function getLanguage(){

    try{

        const ibadatSettings =
            localStorage.getItem("ibadatSettings");

        if(ibadatSettings){

            const settings =
                JSON.parse(ibadatSettings);

            if(
                settings &&
                ["bn","en","hi"].includes(settings.lang)
            ){
                return settings.lang;
            }
        }

    }catch(e){}


    try{

        const appSettings =
            localStorage.getItem("appSettings");

        if(appSettings){

            const settings =
                JSON.parse(appSettings);

            if(
                settings &&
                ["bn","en","hi"].includes(settings.lang)
            ){
                return settings.lang;
            }
        }

    }catch(e){}


    return "bn";
}


currentLanguage = getLanguage();


/* =========================
   TEXT
========================= */

const TEXT = {

    bn:{
        title:"দোয়া",
        loading:"দোয়া লোড হচ্ছে...",
        retry:"আবার চেষ্টা করুন",
        introTitle:"দোয়া",
        introText:"অনলাইন উৎস থেকে দোয়া ও সংশ্লিষ্ট তথ্য দেখানো হচ্ছে।",
        arabic:"আরবি",
        pronunciation:"উচ্চারণ",
        meaning:"অর্থ",
        reference:"উৎস",
        audio:"দোয়া শুনুন",
        noDua:"কোনো দোয়া পাওয়া যায়নি।",
        error:"দোয়া লোড করতে সমস্যা হয়েছে।"
    },

    en:{
        title:"Dua",
        loading:"Loading duas...",
        retry:"Try again",
        introTitle:"Dua",
        introText:"Duas and related information are loaded from online sources.",
        arabic:"Arabic",
        pronunciation:"Pronunciation",
        meaning:"Meaning",
        reference:"Reference",
        audio:"Listen to Dua",
        noDua:"No dua found.",
        error:"Unable to load duas."
    },

    hi:{
        title:"दुआ",
        loading:"दुआ लोड हो रही है...",
        retry:"फिर कोशिश करें",
        introTitle:"दुआ",
        introText:"दुआ और संबंधित जानकारी ऑनलाइन स्रोत से दिखाई जा रही है।",
        arabic:"अरबी",
        pronunciation:"उच्चारण",
        meaning:"अर्थ",
        reference:"स्रोत",
        audio:"दुआ सुनें",
        noDua:"कोई दुआ नहीं मिली।",
        error:"दुआ लोड करने में समस्या हुई।"
    }

};


/* =========================
   ELEMENTS
========================= */

const loadingBox =
    document.getElementById("loadingBox");

const errorBox =
    document.getElementById("errorBox");

const errorText =
    document.getElementById("errorText");

const retryButton =
    document.getElementById("retryButton");

const duaHome =
    document.getElementById("duaHome");

const entryPage =
    document.getElementById("entryPage");

const duaPage =
    document.getElementById("duaPage");

const chapterList =
    document.getElementById("chapterList");

const entryList =
    document.getElementById("entryList");

const duaContent =
    document.getElementById("duaContent");

const pageTitle =
    document.getElementById("pageTitle");

const introTitle =
    document.getElementById("introTitle");

const introText =
    document.getElementById("introText");

const entryPageTitle =
    document.getElementById("entryPageTitle");

const duaPageTitle =
    document.getElementById("duaPageTitle");

const backButton =
    document.getElementById("backButton");

const entryBackButton =
    document.getElementById("entryBackButton");

const duaBackButton =
    document.getElementById("duaBackButton");


/* =========================
   INITIAL UI
========================= */

function setInitialTexts(){

    const t = TEXT[currentLanguage];

    pageTitle.textContent =
        t.title;

    introTitle.textContent =
        t.introTitle;

    introText.textContent =
        t.introText;

    loadingBox.textContent =
        t.loading;

    retryButton.textContent =
        t.retry;
}


/* =========================
   SHOW / HIDE
========================= */

function hideAll(){

    duaHome.classList.add("hidden");
    entryPage.classList.add("hidden");
    duaPage.classList.add("hidden");
}


function showLoading(){

    hideAll();

    errorBox.classList.add("hidden");

    loadingBox.classList.remove("hidden");
}


function hideLoading(){

    loadingBox.classList.add("hidden");
}


function showError(message){

    hideAll();

    hideLoading();

    errorBox.classList.remove("hidden");

    errorText.textContent =
        message ||
        TEXT[currentLanguage].error;
}


/* =========================
   FETCH JSON
========================= */

async function fetchJSON(url){

    const response =
        await fetch(url, {
            method:"GET",
            headers:{
                "Accept":"application/json"
            },
            cache:"default"
        });

    if(!response.ok){

        throw new Error(
            "HTTP " + response.status
        );
    }

    return await response.json();
}


/* =========================
   RESPONSE EXTRACTION
========================= */

function extractArray(data, possibleKeys){

    if(Array.isArray(data)){
        return data;
    }


    if(
        data &&
        Array.isArray(data.data)
    ){
        return data.data;
    }


    if(
        data &&
        Array.isArray(data.items)
    ){
        return data.items;
    }


    if(
        data &&
        Array.isArray(data.results)
    ){
        return data.results;
    }


    if(
        data &&
        Array.isArray(data.chapters)
    ){
        return data.chapters;
    }


    if(
        data &&
        Array.isArray(data.entries)
    ){
        return data.entries;
    }


    if(
        data &&
        Array.isArray(data[possibleKeys])
    ){
        return data[possibleKeys];
    }


    return [];
}


/* =========================
   LOAD CHAPTERS
========================= */

async function loadChapters(){

    showLoading();

    try{

        const url =
            API_BASE +
            "/collections/" +
            COLLECTION_ID +
            "/chapters";

        console.log(
            "Loading chapters:",
            url
        );


        const data =
            await fetchJSON(url);


        console.log(
            "OpenDua chapter response:",
            data
        );


        chapters =
            extractArray(
                data,
                "chapters"
            );


        console.log(
            "Chapters found:",
            chapters.length
        );


        if(!chapters.length){

            throw new Error(
                "No chapters returned"
            );
        }


        renderChapters();

        hideLoading();

        duaHome.classList.remove(
            "hidden"
        );

    }catch(error){

        console.error(
            "Chapter loading error:",
            error
        );

        showError(
            TEXT[currentLanguage].error
        );
    }
}


/* =========================
   RENDER CHAPTERS
========================= */

function renderChapters(){

    chapterList.innerHTML = "";


    chapters.forEach(
        (chapter,index) => {

            const card =
                document.createElement("div");

            card.className =
                "chapter-card";


            const number =
                document.createElement("div");

            number.className =
                "chapter-number";

            number.textContent =
                index + 1;


            const info =
                document.createElement("div");

            info.className =
                "chapter-info";


            const title =
                document.createElement("div");

            title.className =
                "chapter-title";

            title.textContent =
                chapter.title ||
                chapter.name ||
                ("Chapter " + (index + 1));


            info.appendChild(
                title
            );


            const arrow =
                document.createElement("div");

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
                () => openChapter(chapter)
            );


            chapterList.appendChild(
                card
            );

        }
    );
}


/* =========================
   OPEN CHAPTER
========================= */

async function openChapter(chapter){

    currentChapter =
        chapter;


    hideAll();

    entryPage.classList.remove(
        "hidden"
    );


    entryPageTitle.textContent =
        chapter.title ||
        chapter.name ||
        "";


    entryList.innerHTML =
        `<div class="status-box">
            ${TEXT[currentLanguage].loading}
        </div>`;


    try{

        const url =
            API_BASE +
            "/collections/" +
            COLLECTION_ID +
            "/chapters/" +
            chapter.id +
            "/entries";


        console.log(
            "Loading entries:",
            url
        );


        const data =
            await fetchJSON(url);


        console.log(
            "OpenDua entry response:",
            data
        );


        currentEntries =
            extractArray(
                data,
                "entries"
            );


        renderEntries();


    }catch(error){

        console.error(
            "Entry loading error:",
            error
        );


        entryList.innerHTML =
            `<div class="status-box error-box">
                ${TEXT[currentLanguage].error}
            </div>`;
    }
}


/* =========================
   RENDER ENTRIES
========================= */

function renderEntries(){

    entryList.innerHTML = "";


    if(!currentEntries.length){

        entryList.innerHTML =
            `<div class="status-box">
                ${TEXT[currentLanguage].noDua}
            </div>`;

        return;
    }


    currentEntries.forEach(
        (entry,index) => {

            const card =
                document.createElement("div");

            card.className =
                "entry-card";


            const number =
                document.createElement("div");

            number.className =
                "entry-number";

            number.textContent =
                "Dua " +
                (index + 1);


            const title =
                document.createElement("div");

            title.className =
                "entry-title";

            title.textContent =
                entry.title ||
                entry.name ||
                "";


            card.appendChild(
                number
            );

            card.appendChild(
                title
            );


            card.addEventListener(
                "click",
                () => openEntry(entry)
            );


            entryList.appendChild(
                card
            );

        }
    );
}


/* =========================
   OPEN ENTRY
========================= */

async function openEntry(entry){

    hideAll();

    duaPage.classList.remove(
        "hidden"
    );


    duaPageTitle.textContent =
        entry.title ||
        entry.name ||
        "";


    duaContent.innerHTML =
        `<div class="status-box">
            ${TEXT[currentLanguage].loading}
        </div>`;


    try{

        const url =
            API_BASE +
            "/entries/" +
            entry.id;


        console.log(
            "Loading dua:",
            url
        );


        currentEntry =
            await fetchJSON(url);


        renderDua(
            currentEntry
        );


    }catch(error){

        console.error(
            "Dua loading error:",
            error
        );


        duaContent.innerHTML =
            `<div class="status-box error-box">
                ${TEXT[currentLanguage].error}
            </div>`;
    }
}


/* =========================
   RENDER DUA
========================= */

function renderDua(entry){

    duaContent.innerHTML = "";


    const card =
        document.createElement("div");

    card.className =
        "dua-card";


    const title =
        document.createElement("div");

    title.className =
        "dua-title";

    title.textContent =
        entry.title ||
        "";


    card.appendChild(
        title
    );


    const variations =
        entry.variations ||
        [];


    if(!variations.length){

        duaContent.appendChild(
            card
        );

        return;
    }


    variations.forEach(
        variation => {

            const steps =
                variation.steps ||
                [];


            steps.forEach(
                step => {

                    const items =
                        step.items ||
                        [];


                    items.forEach(
                        item => {

                            if(
                                !item ||
                                !item.dua
                            ){
                                return;
                            }


                            const dua =
                                item.dua;


                            /*
                               ARABIC
                            */

                            addLabel(
                                card,
                                TEXT[currentLanguage].arabic
                            );


                            const arabic =
                                document.createElement("div");

                            arabic.className =
                                "dua-arabic";

                            arabic.textContent =
                                dua.arabic ||
                                "";


                            card.appendChild(
                                arabic
                            );


                            /*
                               ENGLISH
                            */

                            if(
                                currentLanguage === "en"
                            ){

                                addLabel(
                                    card,
                                    TEXT.en.pronunciation
                                );


                                const transliteration =
                                    document.createElement("div");

                                transliteration.className =
                                    "dua-transliteration";

                                transliteration.textContent =
                                    dua.transliteration ||
                                    "";


                                card.appendChild(
                                    transliteration
                                );


                                addLabel(
                                    card,
                                    TEXT.en.meaning
                                );


                                const translation =
                                    document.createElement("div");

                                translation.className =
                                    "dua-translation";

                                translation.textContent =
                                    dua.translation ||
                                    "";


                                card.appendChild(
                                    translation
                                );
                            }


                            /*
                               BENGALI
                            */

                            else if(
                                currentLanguage === "bn"
                            ){

                                /*
                                   আপাতত OpenDua-এর
                                   English translation
                                   fallback হিসেবে
                                   দেখানো হচ্ছে।

                                   বাংলা source পরে
                                   আলাদা verified
                                   mapping দিয়ে যোগ হবে।
                                */

                                addLabel(
                                    card,
                                    TEXT.bn.pronunciation
                                );


                                const transliteration =
                                    document.createElement("div");

                                transliteration.className =
                                    "dua-transliteration";

                                transliteration.textContent =
                                    dua.transliteration ||
                                    "";


                                card.appendChild(
                                    transliteration
                                );


                                addLabel(
                                    card,
                                    TEXT.bn.meaning
                                );


                                const translation =
                                    document.createElement("div");

                                translation.className =
                                    "dua-translation";

                                translation.textContent =
                                    dua.translation ||
                                    "";


                                card.appendChild(
                                    translation
                                );
                            }


                            /*
                               HINDI
                            */

                            else if(
                                currentLanguage === "hi"
                            ){

                                addLabel(
                                    card,
                                    TEXT.hi.pronunciation
                                );


                                const transliteration =
                                    document.createElement("div");

                                transliteration.className =
                                    "dua-transliteration";

                                transliteration.textContent =
                                    dua.transliteration ||
                                    "";


                                card.appendChild(
                                    transliteration
                                );


                                addLabel(
                                    card,
                                    TEXT.hi.meaning
                                );


                                const translation =
                                    document.createElement("div");

                                translation.className =
                                    "dua-translation";

                                translation.textContent =
                                    dua.translation ||
                                    "";


                                card.appendChild(
                                    translation
                                );
                            }

                        }
                    );

                }
            );

        }
    );


    /*
       REFERENCES
    */

        renderReferences(
        card,
        entry
    );


    /*
       AUDIO
    */

    renderAudio(
        card,
        entry
    );


    /*
       TAGS
    */

    renderTags(
        card,
        entry
    );


    duaContent.appendChild(
        card
    );
}


/* =========================
   LABEL
========================= */

function addLabel(
    parent,
    text
){

    const label =
        document.createElement("div");

    label.className =
        "dua-section-label";

    label.textContent =
        text;


    parent.appendChild(
        label
    );
}


/* =========================
   REFERENCES
========================= */

function renderReferences(
    card,
    entry
){

    const refs =
        entry.references ||
        [];


    if(!refs.length){
        return;
    }


    addLabel(
        card,
        TEXT[currentLanguage].reference
    );


    const ref =
        document.createElement("div");

    ref.className =
        "dua-reference";


    const texts =
        refs.map(
            item => {

                if(
                    typeof item === "string"
                ){
                    return item;
                }


                if(
                    item &&
                    item.text
                ){
                    return item.text;
                }


                if(
                    item &&
                    item.title
                ){
                    return item.title;
                }


                return "";
            }
        )
        .filter(Boolean);


    ref.textContent =
        texts.join(" • ");


    if(ref.textContent){

        card.appendChild(
            ref
        );
    }
}


/* =========================
   AUDIO
========================= */

function renderAudio(
    card,
    entry
){

    const audioUrls =
        [];


    const variations =
        entry.variations ||
        [];


    variations.forEach(
        variation => {

            const steps =
                variation.steps ||
                [];


            steps.forEach(
                step => {

                    const items =
                        step.items ||
                        [];


                    items.forEach(
                        item => {

                            const recordings =
                                item.recordings ||
                                [];


                            recordings.forEach(
                                recording => {

                                    if(
                                        recording &&
                                        recording.url &&
                                        !audioUrls.includes(
                                            recording.url
                                        )
                                    ){

                                        audioUrls.push(
                                            recording.url
                                        );
                                    }

                                }
                            );

                        }
                    );

                }
            );

        }
    );


    if(!audioUrls.length){
        return;
    }


    addLabel(
        card,
        TEXT[currentLanguage].audio
    );


    audioUrls.forEach(
        url => {

            const audio =
                document.createElement("audio");

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
    );
}


/* =========================
   TAGS
========================= */

function renderTags(
    card,
    entry
){

    const tags =
        entry.tags ||
        [];


    if(!tags.length){
        return;
    }


    const container =
        document.createElement("div");

    container.className =
        "dua-tags";


    tags.forEach(
        tag => {

            const item =
                document.createElement("span");

            item.className =
                "dua-tag";

            item.textContent =
                tag;


            container.appendChild(
                item
            );

        }
    );


    card.appendChild(
        container
    );
}


/* =========================
   BACK BUTTONS
========================= */

backButton.addEventListener(
    "click",
    () => {

        window.history.back();

    }
);


entryBackButton.addEventListener(
    "click",
    () => {

        entryPage.classList.add(
            "hidden"
        );

        duaHome.classList.remove(
            "hidden"
        );

    }
);


duaBackButton.addEventListener(
    "click",
    () => {

        duaPage.classList.add(
            "hidden"
        );

        entryPage.classList.remove(
            "hidden"
        );

    }
);


/* =========================
   RETRY
========================= */

retryButton.addEventListener(
    "click",
    () => {

        loadChapters();

    }
);


/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        currentLanguage =
            getLanguage();

        setInitialTexts();

        loadChapters();

    }
);
