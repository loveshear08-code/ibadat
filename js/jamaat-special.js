/* =====================================================
   IBADAT - JAMAAT & SPECIAL PRAYERS
   ===================================================== */


const TEXT = {


    /* =================================================
       BANGLA
       ================================================= */

    bn: {

        pageTitle:
            "জামাত ও বিশেষ নামাজ",

        introTitle:
            "জামাত ও বিশেষ নামাজ",

        introText:
            "জামাতের নামাজ এবং বিভিন্ন বিশেষ নামাজ সঠিকভাবে আদায় করার জন্য প্রয়োজনীয় নিয়ম ও পদ্ধতি জানা প্রয়োজন।",

        topics: {

            "jamaat-rules":
                "জামাতের নিয়ম",

            "imam-muqtadi":
                "ইমাম ও মুক্তাদির নিয়ম",

            "missed-jamaat":
                "জামাত মিস ও দেরিতে যোগ",

            "imam-mistake":
                "ইমামের ভুল ও সাহু সিজদা",

            "jumuah-eid":
                "জুমুআ ও ঈদ",

            "tarawih-witr":
                "তারাবিহ ও বিতর",

            "tahajjud-nafl":
                "তাহাজ্জুদ ও নফল",

            janazah:
                "জানাজার নামাজ"

        }

    },


    /* =================================================
       ENGLISH
       ================================================= */

    en: {

        pageTitle:
            "Jamaat & Special Prayers",

        introTitle:
            "Jamaat & Special Prayers",

        introText:
            "Learn the essential rules and methods for performing congregational and special prayers correctly.",

        topics: {

            "jamaat-rules":
                "Rules of Jamaat",

            "imam-muqtadi":
                "Imam & Muqtadi Rules",

            "missed-jamaat":
                "Missed Jamaat & Joining Late",

            "imam-mistake":
                "Imam's Mistake & Sujood as-Sahw",

            "jumuah-eid":
                "Jumu'ah & Eid",

            "tarawih-witr":
                "Tarawih & Witr",

            "tahajjud-nafl":
                "Tahajjud & Nafl",

            janazah:
                "Janazah Prayer"

        }

    },


    /* =================================================
       HINDI
       ================================================= */

    hi: {

        pageTitle:
            "जमाअत और विशेष नमाज़",

        introTitle:
            "जमाअत और विशेष नमाज़",

        introText:
            "जमाअत और विभिन्न विशेष नमाज़ों को सही तरीके से अदा करने के लिए आवश्यक नियम और तरीका जानना ज़रूरी है।",

        topics: {

            "jamaat-rules":
                "जमाअत के नियम",

            "imam-muqtadi":
                "इमाम और मुक़्तदी के नियम",

            "missed-jamaat":
                "जमाअत छूटना और देर से शामिल होना",

            "imam-mistake":
                "इमाम की भूल और सज्दा-ए-सह्व",

            "jumuah-eid":
                "जुमुआ और ईद",

            "tarawih-witr":
                "तरावीह और वितर",

            "tahajjud-nafl":
                "तहज्जुद और नफ़्ल",

            janazah:
                "जनाज़े की नमाज़"

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
        "titleJamaatRules",
        t.topics["jamaat-rules"]
    );


    setText(
        "titleImamMuqtadi",
        t.topics["imam-muqtadi"]
    );


    setText(
        "titleMissedJamaat",
        t.topics["missed-jamaat"]
    );


    setText(
        "titleImamMistake",
        t.topics["imam-mistake"]
    );


    setText(
        "titleJumuahEid",
        t.topics["jumuah-eid"]
    );


    setText(
        "titleTarawihWitr",
        t.topics["tarawih-witr"]
    );


    setText(
        "titleTahajjudNafl",
        t.topics["tahajjud-nafl"]
    );


    setText(
        "titleJanazah",
        t.topics.janazah
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
                   return to the main Jamaat
                   & Special Prayers page.
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
                   If already on the main Jamaat
                   & Special Prayers page,
                   return to the previous
                   Namaz Guide page.
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
