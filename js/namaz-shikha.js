/* =====================================================
   IBADAT - NAMAZ SHIKHA
   ===================================================== */


const TEXT = {

    /* =================================================
       BANGLA
       ================================================= */

    bn: {

        pageTitle: "নামাজ শিক্ষা",

        introTitle: "নামাজ শিক্ষা",

        introText:
            "নামাজ সঠিকভাবে আদায় করার জন্য নামাজের প্রতিটি ধাপ ও নিয়ম জানা প্রয়োজন।",

        topics: {

            niyyah:
                "নিয়ত ও নামাজ শুরু",

            qiyam:
                "কিয়াম ও কিরাআত",

            ruku:
                "রুকু ও ই‘তিদাল",

            sajdah:
                "সিজদা ও জলসা",

            "final-sitting":
                "শেষ বৈঠক",

            tashahhud:
                "তাশাহহুদ, দরুদ ও দোয়া",

            salam:
                "সালাম ও সমাপ্তি",

            complete:
                "পূর্ণ নামাজ"

        }

    },


    /* =================================================
       ENGLISH
       ================================================= */

    en: {

        pageTitle: "Learn Salah",

        introTitle: "Learn Salah",

        introText:
            "To perform Salah correctly, it is important to learn its steps and essential rules.",

        topics: {

            niyyah:
                "Niyyah & Starting Salah",

            qiyam:
                "Qiyam & Recitation",

            ruku:
                "Ruku & I‘tidal",

            sajdah:
                "Sajdah & Jalsah",

            "final-sitting":
                "Final Sitting",

            tashahhud:
                "Tashahhud, Durood & Du'a",

            salam:
                "Salam & Completion",

            complete:
                "Complete Salah"

        }

    },


    /* =================================================
       HINDI
       ================================================= */

    hi: {

        pageTitle: "नमाज़ सीखें",

        introTitle: "नमाज़ सीखें",

        introText:
            "नमाज़ सही तरीके से अदा करने के लिए उसके चरणों और आवश्यक नियमों को जानना ज़रूरी है।",

        topics: {

            niyyah:
                "नियत और नमाज़ शुरू करना",

            qiyam:
                "क़ियाम और क़िराअत",

            ruku:
                "रुकू और इ‘तिदाल",

            sajdah:
                "सज्दा और जलसा",

            "final-sitting":
                "आख़िरी क़ायदा",

            tashahhud:
                "तशह्हुद, दुरूद और दुआ",

            salam:
                "सलाम और समापन",

            complete:
                "पूरी नमाज़"

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
        "titleNiyyah",
        t.topics.niyyah
    );


    setText(
        "titleQiyam",
        t.topics.qiyam
    );


    setText(
        "titleRuku",
        t.topics.ruku
    );


    setText(
        "titleSajdah",
        t.topics.sajdah
    );


    setText(
        "titleFinalSitting",
        t.topics["final-sitting"]
    );


    setText(
        "titleTashahhud",
        t.topics.tashahhud
    );


    setText(
        "titleSalam",
        t.topics.salam
    );


    setText(
        "titleComplete",
        t.topics.complete
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
                   return to Namaz Shikha main page.
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
                   If already on Namaz Shikha
                   main page, return to the
                   previous Namaz Guide page.
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
