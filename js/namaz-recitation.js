/* =====================================================
   IBADAT - NAMAZ RECITATION
   ===================================================== */


const TEXT = {


    /* =================================================
       BANGLA
       ================================================= */

    bn: {

        pageTitle:
            "নামাজে যা পড়তে হয়",

        introTitle:
            "নামাজে যা পড়তে হয়",

        introText:
            "নামাজের বিভিন্ন অবস্থানে যে দোয়া, যিকির ও কিরাআত পড়তে হয় সেগুলো ধাপে ধাপে জানা প্রয়োজন।",

        topics: {

            takbir:
                "তাকবির, সানা ও আউযু",

            bismillah:
                "বিসমিল্লাহ, ফাতিহা ও আমিন",

            "short-surah":
                "ছোট সূরা",

            "ruku-dhikr":
                "রুকু ও ই‘তিদালের যিকির",

            "sajdah-dua":
                "সিজদা ও জলসার দোয়া",

            "tashahhud-durood":
                "তাশাহহুদ ও দরুদ",

            "final-dua":
                "শেষের দোয়া",

            "qunut-other":
                "কুনুত ও অন্যান্য দোয়া"

        }

    },


    /* =================================================
       ENGLISH
       ================================================= */

    en: {

        pageTitle:
            "What to Recite in Salah",

        introTitle:
            "What to Recite in Salah",

        introText:
            "Learn the supplications, remembrance and recitations used at different stages of Salah.",

        topics: {

            takbir:
                "Takbir, Sana & A'udhu",

            bismillah:
                "Bismillah, Al-Fatihah & Amin",

            "short-surah":
                "Short Surahs",

            "ruku-dhikr":
                "Dhikr of Ruku & I‘tidal",

            "sajdah-dua":
                "Sajdah & Jalsah Du'as",

            "tashahhud-durood":
                "Tashahhud & Durood",

            "final-dua":
                "Final Du'a",

            "qunut-other":
                "Qunut & Other Du'as"

        }

    },


    /* =================================================
       HINDI
       ================================================= */

    hi: {

        pageTitle:
            "नमाज़ में क्या पढ़ें",

        introTitle:
            "नमाज़ में क्या पढ़ें",

        introText:
            "नमाज़ के अलग-अलग चरणों में पढ़ी जाने वाली दुआ, ज़िक्र और क़िराअत को क्रम से जानना ज़रूरी है।",

        topics: {

            takbir:
                "तकबीर, सना और आउज़ु",

            bismillah:
                "बिस्मिल्लाह, फ़ातिहा और आमीन",

            "short-surah":
                "छोटी सूरतें",

            "ruku-dhikr":
                "रुकू और इ‘तिदाल का ज़िक्र",

            "sajdah-dua":
                "सज्दा और जलसा की दुआ",

            "tashahhud-durood":
                "तशह्हुद और दुरूद",

            "final-dua":
                "आख़िरी दुआ",

            "qunut-other":
                "क़ुनूत और अन्य दुआएँ"

        }

    }

};



/* =====================================================
   GET LANGUAGE
   ===================================================== */

function getLanguage(){

    try{

        let saved =
            localStorage.getItem(
                "ibadatSettings"
            );


        if(!saved){

            saved =
                localStorage.getItem(
                    "appSettings"
                );

        }


        if(saved){

            const settings =
                JSON.parse(saved);


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



/* =====================================================
   SET TEXT
   ===================================================== */

function setText(id,value){

    const element =
        document.getElementById(id);


    if(element){

        element.textContent = value;

    }

}



/* =====================================================
   APPLY LANGUAGE
   ===================================================== */

function applyLanguage(){

    const lang =
        getLanguage();


    const t =
        TEXT[lang];


    document.documentElement.lang =
        lang === "bn"
            ? "bn"
            : lang === "hi"
                ? "hi"
                : "en";


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
        "titleTakbir",
        t.topics.takbir
    );


    setText(
        "titleBismillah",
        t.topics.bismillah
    );


    setText(
        "titleShortSurah",
        t.topics["short-surah"]
    );


    setText(
        "titleRukuDhikr",
        t.topics["ruku-dhikr"]
    );


    setText(
        "titleSajdahDua",
        t.topics["sajdah-dua"]
    );


    setText(
        "titleTashahhudDurood",
        t.topics["tashahhud-durood"]
    );


    setText(
        "titleFinalDua",
        t.topics["final-dua"]
    );


    setText(
        "titleQunutOther",
        t.topics["qunut-other"]
    );

}



/* =====================================================
   HIDE ALL PAGES
   ===================================================== */

function hideAllPages(){

    const mainPage =
        document.getElementById(
            "mainPage"
        );


    const topicPage =
        document.getElementById(
            "topicPage"
        );


    if(mainPage){

        mainPage.classList.add(
            "hidden"
        );

    }


    if(topicPage){

        topicPage.classList.add(
            "hidden"
        );

    }

}



/* =====================================================
   SHOW MAIN PAGE
   ===================================================== */

function showMainPage(){

    hideAllPages();


    const mainPage =
        document.getElementById(
            "mainPage"
        );


    if(mainPage){

        mainPage.classList.remove(
            "hidden"
        );

    }


    applyLanguage();


    window.scrollTo(
        0,
        0
    );

}



/* =====================================================
   SHOW BLANK TOPIC PAGE
   ===================================================== */

function showTopicPage(topic){

    const lang =
        getLanguage();


    const t =
        TEXT[lang];


    const title =
        t.topics[topic] || "";


    hideAllPages();


    setText(
        "topicPageTitle",
        title
    );


    setText(
        "topicContent",
        ""
    );


    const topicPage =
        document.getElementById(
            "topicPage"
        );


    if(topicPage){

        topicPage.classList.remove(
            "hidden"
        );

    }


    window.scrollTo(
        0,
        0
    );

}



/* =====================================================
   NAVIGATION SETUP
   ===================================================== */

function setupNavigation(){


    /* ================================================
       EIGHT TOPIC CARDS
       ================================================ */

    document
        .querySelectorAll(
            ".topic-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        showTopicPage(
                            card.dataset.topic
                        );

                    }
                );

            }
        );



    /* ================================================
       BACK FROM TOPIC PAGE
       ================================================ */

    const topicBackButton =
        document.getElementById(
            "topicBackButton"
        );


    if(topicBackButton){

        topicBackButton.addEventListener(
            "click",
            () => {

                showMainPage();

            }
        );

    }



    /* ================================================
       TOP BACK BUTTON
       ================================================ */

    const backButton =
        document.getElementById(
            "backButton"
        );


    if(backButton){

        backButton.addEventListener(
            "click",
            () => {


                const topicPage =
                    document.getElementById(
                        "topicPage"
                    );


                /*
                   If a topic page is open,
                   return to the main recitation page.
                */

                if(
                    topicPage &&
                    !topicPage.classList.contains(
                        "hidden"
                    )
                ){

                    showMainPage();

                    return;

                }



                /*
                   If already on the main
                   recitation page, return to
                   the previous Namaz Guide page.
                */

                const mainPage =
                    document.getElementById(
                        "mainPage"
                    );


                if(
                    mainPage &&
                    !mainPage.classList.contains(
                        "hidden"
                    )
                ){

                    history.back();

                    return;

                }

            }
        );

    }

}



/* =====================================================
   START
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyLanguage();

        setupNavigation();

    }
);
