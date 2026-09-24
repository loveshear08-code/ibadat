const API_BASE = "https://api.opendua.org/v2";
const COLLECTION_ID = "hisn-al-muslim";

const BN_API_BASE = "https://dua-api.hisnul.workers.dev";

let currentLanguage = "bn";

let chapters = [];
let currentChapter = null;
let currentEntries = [];

let currentEntry = null;

let openDuaCatalogue = null;
let bengaliDuas = null;


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
        notAvailable:"এই ভাষায় তথ্য এখনো পাওয়া যায়নি।",
        englishFallback:"ইংরেজি তথ্য দেখানো হচ্ছে।",
        bengaliLoading:"বাংলা অর্থ লোড হচ্ছে...",
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
        notAvailable:"Information is not available in this language yet.",
        englishFallback:"",
        bengaliLoading:"",
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
        notAvailable:"इस भाषा में जानकारी अभी उपलब्ध नहीं है।",
        englishFallback:"अभी अंग्रेज़ी जानकारी दिखाई जा रही है।",
        bengaliLoading:"",
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

    pageTitle.textContent = t.title;

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

    loadingBox.classList.remove("hidden");

    errorBox.classList.add("hidden");
}


function hideLoading(){

    loadingBox.classList.add("hidden");
}


function showError(message){

    hideAll();

    hideLoading();

    errorBox.classList.remove("hidden");

    errorText.textContent =
        message || TEXT[currentLanguage].error;
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
            }
        });

    if(!response.ok){

        throw new Error(
            "HTTP " + response.status
        );
    }

    return await response.json();
}


/* =========================
   LOAD OPEN DUA CATALOGUE
========================= */

async function loadOpenDuaCatalogue(){

    if(openDuaCatalogue){
        return openDuaCatalogue;
    }

    const url =
        "https://opendua.org/v0.0.4/catalogue.json";

    openDuaCatalogue =
        await fetchJSON(url);

    return openDuaCatalogue;
}


/* =========================
   ARABIC NORMALIZATION
========================= */

function normalizeArabic(text){

    if(!text){
        return "";
    }

    return String(text)

        // Remove tashkeel
        .replace(
            /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,
            ""
        )

        // Normalize Arabic letters
        .replace(/[أإآٱ]/g,"ا")
        .replace(/ى/g,"ي")
        .replace(/ؤ/g,"و")
        .replace(/ئ/g,"ي")

        // Remove tatweel
        .replace(/ـ/g,"")

        // Remove punctuation
        .replace(/[^\u0600-\u06FF0-9]/g,"")

        // Normalize whitespace
        .replace(/\s+/g,"")

        .trim();
}


/* =========================
   GET OPEN DUA ARABIC
========================= */

function getOpenDuaArabic(entry){

    if(!entry){
        return "";
    }

    const texts = [];

    try{

        const variations =
            entry.variations || [];

        variations.forEach(variation => {

            const steps =
                variation.steps || [];

            steps.forEach(step => {

                const items =
                    step.items || [];

                items.forEach(item => {

                    if(
                        item.dua &&
                        item.dua.arabic
                    ){

                        texts.push(
                            item.dua.arabic
                        );
                    }

                });

            });

        });

    }catch(e){}

    return texts.join(" ");
}


/* =========================
   GET BENGALI DUA DATA
========================= */

async function loadBengaliDuas(){

    if(bengaliDuas){
        return bengaliDuas;
    }

    const all = [];

    for(let page = 1; page <= 10; page++){

        const url =
            BN_API_BASE +
            "/api/books/1/duas?page=" +
            page +
            "&limit=100";

        const result =
            await fetchJSON(url);

        const rows =
            Array.isArray(result.data)
                ? result.data
                : [];

        all.push(...rows);

        const pagination =
            result.pagination;

        if(!pagination){
            break;
        }

        if(page >= pagination.pages){
            break;
        }
    }

    bengaliDuas = all;

    return bengaliDuas;
}


/* =========================
   EXTRACT BENGALI ARABIC
========================= */

function getBengaliArabic(dua){

    if(!dua){
        return "";
    }

    const segments =
        dua.segments || [];

    return segments
        .map(segment =>
            segment && segment.arabic
                ? segment.arabic
                : ""
        )
        .filter(Boolean)
        .join(" ");
}


/* =========================
   EXTRACT BENGALI TRANSLATION
========================= */

function getBengaliTranslation(dua){

    if(!dua){
        return "";
    }

    const segments =
        dua.segments || [];

    return segments
        .map(segment =>
            segment && segment.translations
                ? segment.translations
                : ""
        )
        .filter(Boolean)
        .join(" ");
}


/* =========================
   EXTRACT BENGALI REFERENCE
========================= */

function getBengaliReference(dua){

    if(!dua){
        return "";
    }

    const segments =
        dua.segments || [];

    return segments
        .map(segment =>
            segment && segment.reference
                ? segment.reference
                : ""
        )
        .filter(Boolean)
        .join(" • ");
}


/* =========================
   MATCH BENGALI DUA
========================= */

function findBengaliMatch(openEntry){

    if(
        !openEntry ||
        !bengaliDuas ||
        !Array.isArray(bengaliDuas)
    ){
        return null;
    }

    const openArabic =
        normalizeArabic(
            getOpenDuaArabic(openEntry)
        );

    if(!openArabic){
        return null;
    }


    /*
       1. First try exact Arabic match.
    */

    for(const dua of bengaliDuas){

        const bnArabic =
            normalizeArabic(
                getBengaliArabic(dua)
            );

        if(
            bnArabic &&
            bnArabic === openArabic
        ){
            return dua;
        }
    }


    /*
       2. Try containment.
       This handles small punctuation /
       segmentation differences.
    */

    for(const dua of bengaliDuas){

        const bnArabic =
            normalizeArabic(
                getBengaliArabic(dua)
            );

        if(!bnArabic){
            continue;
        }

        if(
            bnArabic.length >= 25 &&
            openArabic.includes(bnArabic)
        ){
            return dua;
        }

        if(
            openArabic.length >= 25 &&
            bnArabic.includes(openArabic)
        ){
            return dua;
        }
    }


    return null;
}


/* =========================
   OPEN CHAPTERS
========================= */

async function loadChapters(){

    showLoading();

    try{

        const url =
            API_BASE +
            "/collections/" +
            COLLECTION_ID +
            "/chapters";

        const data =
            await fetchJSON(url);

        chapters =
            Array.isArray(data)
                ? data
                : (
                    Array.isArray(data.data)
                        ? data.data
                        : []
                );

        renderChapters();

        hideLoading();

        duaHome.classList.remove("hidden");

    }catch(error){

        console.error(error);

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

    chapters.forEach((chapter,index) => {

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
            chapter.title || "";

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
            () => openChapter(chapter)
        );

        chapterList.appendChild(card);
    });
}


/* =========================
   OPEN CHAPTER
========================= */

async function openChapter(chapter){

    currentChapter =
        chapter;

    hideAll();

    entryPage.classList.remove("hidden");

    entryPageTitle.textContent =
        chapter.title || "";

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

        const data =
            await fetchJSON(url);

        currentEntries =
            Array.isArray(data)
                ? data
                : (
                    Array.isArray(data.data)
                        ? data.data
                        : []
                );

        renderEntries();

    }catch(error){

        console.error(error);

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


    currentEntries.forEach((entry,index) => {

        const card =
            document.createElement("div");

        card.className =
            "entry-card";

        const number =
            document.createElement("div");

        number.className =
            "entry-number";

        number.textContent =
            "Dua " + (index + 1);

        const title =
            document.createElement("div");

        title.className =
            "entry-title";

        title.textContent =
            entry.title || "";

        card.appendChild(number);
        card.appendChild(title);

        card.addEventListener(
            "click",
            () => openEntry(entry)
        );

        entryList.appendChild(card);
    });
}


/* =========================
   OPEN ENTRY
========================= */

async function openEntry(entry){

    hideAll();

    duaPage.classList.remove("hidden");

    duaPageTitle.textContent =
        entry.title || "";

    duaContent.innerHTML =
        `<div class="status-box">
            ${TEXT[currentLanguage].loading}
        </div>`;


    try{

        const url =
            API_BASE +
            "/entries/" +
            entry.id;

        currentEntry =
            await fetchJSON(url);

        /*
           Bengali mode needs the Bengali
           source loaded and matched.
        */

        let bengaliMatch = null;

        if(currentLanguage === "bn"){

            try{

                await loadBengaliDuas();

                bengaliMatch =
                    findBengaliMatch(
                        currentEntry
                    );

            }catch(error){

                console.warn(
                    "Bengali API unavailable:",
                    error
                );
            }
        }


        renderDua(
            currentEntry,
            bengaliMatch
        );

    }catch(error){

        console.error(error);

        duaContent.innerHTML =
            `<div class="status-box error-box">
                ${TEXT[currentLanguage].error}
            </div>`;
    }
}


/* =========================
   RENDER DUA
========================= */

function renderDua(
    entry,
    bengaliMatch
){

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
        entry.title || "";

    card.appendChild(title);


    const variations =
        entry.variations || [];


    if(!variations.length){

        duaContent.appendChild(card);

        return;
    }


    variations.forEach(
        (variation,variationIndex) => {

            const steps =
                variation.steps || [];


            steps.forEach(step => {

                const items =
                    step.items || [];


                items.forEach(item => {

                    if(
                        !item.dua
                    ){
                        return;
                    }


                    const dua =
                        item.dua;


                    /*
                       Arabic
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
                        dua.arabic || "";

                    card.appendChild(arabic);


                    /*
                       Bengali
                    */

                    if(currentLanguage === "bn"){

                        renderBengali(
                            card,
                            bengaliMatch
                        );

                    }

                    /*
                       English
                    */

                    else if(currentLanguage === "en"){

                        addLabel(
                            card,
                            TEXT.en.pronunciation
                        );

                        const transliteration =
                            document.createElement("div");

                        transliteration.className =
                            "dua-transliteration";

                        transliteration.textContent =
                            dua.transliteration || "";

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
                            dua.translation || "";

                        card.appendChild(
                            translation
                        );

                    }

                    /*
                       Hindi
                    */

                    else if(currentLanguage === "hi"){

                        addLabel(
                            card,
                            TEXT.hi.pronunciation
                        );

                        const transliteration =
                            document.createElement("div");

                        transliteration.className =
                            "dua-transliteration";

                        transliteration.textContent =
                            dua.transliteration || "";

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
                            dua.translation || "";

                        card.appendChild(
                            translation
                        );


                        const note =
                            document.createElement("div");

                        note.className =
                            "dua-reference";

                        note.textContent =
                            TEXT.hi.englishFallback;

                        if(TEXT.hi.englishFallback){
                            card.appendChild(note);
                        }

                    }

                });

            });

        }
    );


    /*
       References
    */

    renderReferences(
        card,
        entry
    );


    /*
       Audio
    */

    renderAudio(
        card,
        entry
    );


    /*
       Tags
    */

    renderTags(
        card,
        entry
    );


    duaContent.appendChild(card);
}


/* =========================
   BENGALI CONTENT
========================= */

function renderBengali(
    card,
    bengaliMatch
){

    if(!bengaliMatch){

        addLabel(
            card,
            TEXT.bn.meaning
        );

        const unavailable =
            document.createElement("div");

        unavailable.className =
            "dua-translation";

        unavailable.textContent =
            TEXT.bn.notAvailable;

        card.appendChild(
            unavailable
        );

        return;
    }


    const translation =
        getBengaliTranslation(
            bengaliMatch
        );


    if(translation){

        addLabel(
            card,
            TEXT.bn.meaning
        );

        const meaning =
            document.createElement("div");

        meaning.className =
            "dua-translation";

        meaning.textContent =
            translation;

        card.appendChild(
            meaning
        );

    }else{

        addLabel(
            card,
            TEXT.bn.meaning
        );

        const unavailable =
            document.createElement("div");

        unavailable.className =
            "dua-translation";

        unavailable.textContent =
            TEXT.bn.notAvailable;

        card.appendChild(
            unavailable
        );
    }


    const reference =
        getBengaliReference(
            bengaliMatch
        );

    if(reference){

        addLabel(
            card,
            TEXT.bn.reference
        );

        const ref =
            document.createElement("div");

        ref.className =
            "dua-reference";

        ref.textContent =
            reference;

        card.appendChild(ref);
    }
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

    parent.appendChild(label);
}


/* =========================
   REFERENCES
========================= */

function renderReferences(
    card,
    entry
){

    const refs =
        entry.references || [];


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
        card.appendChild(ref);
    }
}


/* =========================
   AUDIO
========================= */

function renderAudio(
    card,
    entry
){

    const audioUrls = [];


    try{

        const variations =
            entry.variations || [];


        variations.forEach(
            variation => {

                const steps =
                    variation.steps || [];


                steps.forEach(
                    step => {

                        const items =
                            step.items || [];


                        items.forEach(
                            item => {

                                const recordings =
                                    item.recordings || [];


                                recordings.forEach(
                                    recording => {

                                        if(
                                            recording &&
                                            recording.url
                                        ){

                                            if(
                                                !audioUrls.includes(
                                                    recording.url
                                                )
                                            ){

                                                audioUrls.push(
                                                    recording.url
                                                );
                                            }
                                        }

                                    }
                                );

                            }
                        );

                    }
                );

            }
        );

    }catch(error){

        console.warn(
            "Audio parsing error:",
            error
        );
    }


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

            audio.controls = true;

            audio.preload = "none";

            audio.src = url;

            card.appendChild(audio);
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
        entry.tags || [];


    if(!tags.length){
        return;
    }


    const container =
        document.createElement("div");

    container.className =
        "dua-tags";


    tags.forEach(tag => {

        const item =
            document.createElement("span");

        item.className =
            "dua-tag";

        item.textContent =
            tag;

        container.appendChild(item);

    });


    card.appendChild(container);
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

        entryPage.classList.add("hidden");

        duaHome.classList.remove("hidden");

    }
);


duaBackButton.addEventListener(
    "click",
    () => {

        duaPage.classList.add("hidden");

        entryPage.classList.remove("hidden");

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
