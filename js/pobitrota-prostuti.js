/* =====================================================
   IBADAT - POBITROTA O PROSTUTI
   ===================================================== */


const TEXT = {

    bn: {

        pageTitle: "পবিত্রতা ও প্রস্তুতি",

        introTitle: "পবিত্রতা ও প্রস্তুতি",

        introText:
            "নামাজের আগে পবিত্রতা, প্রয়োজনীয় প্রস্তুতি ও গুরুত্বপূর্ণ শর্তগুলো জানুন।",

        topics: {

            wudu:
                "ওযু ও ওযু ভঙ্গ",

            ghusl:
                "গোসল ও গোসল ফরজ",

            tayammum:
                "তায়াম্মুম",

            istinja:
                "ইস্তিঞ্জা ও নাপাকি",

            purity:
                "শরীর, কাপড় ও স্থান পবিত্রতা",

            awrah:
                "সতর",

            qibla:
                "কিবলা",

            time:
                "সময় ও প্রস্তুতি"

        }

    },


    en: {

        pageTitle: "Purity & Preparation",

        introTitle: "Purity & Preparation",

        introText:
            "Learn the essential purification, preparation and requirements before Salah.",

        topics: {

            wudu:
                "Wudu & What Invalidates It",

            ghusl:
                "Ghusl & When It Is Required",

            tayammum:
                "Tayammum",

            istinja:
                "Istinja & Impurity",

            purity:
                "Body, Clothes & Place",

            awrah:
                "Awrah",

            qibla:
                "Qiblah",

            time:
                "Prayer Time & Preparation"

        }

    },


    hi: {

        pageTitle: "पवित्रता और तैयारी",

        introTitle: "पवित्रता और तैयारी",

        introText:
            "नमाज़ से पहले पवित्रता, तैयारी और आवश्यक बातों को जानें।",

        topics: {

            wudu:
                "वुज़ू और वुज़ू टूटना",

            ghusl:
                "ग़ुस्ल और ग़ुस्ल फ़र्ज़",

            tayammum:
                "तयम्मुम",

            istinja:
                "इस्तिंजा और नापाकी",

            purity:
                "शरीर, कपड़े और स्थान की पवित्रता",

            awrah:
                "सतर",

            qibla:
                "क़िबला",

            time:
                "नमाज़ का समय और तैयारी"

        }

    }

};


/* =====================================================
   LANGUAGE
   ===================================================== */

function getLanguage(){

    try{

        let saved =
            localStorage.getItem("ibadatSettings");

        if(!saved){

            saved =
                localStorage.getItem("appSettings");
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

        element.textContent =
            value;
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
        "topicWudu",
        t.topics.wudu
    );


    setText(
        "topicGhusl",
        t.topics.ghusl
    );


    setText(
        "topicTayammum",
        t.topics.tayammum
    );


    setText(
        "topicIstinja",
        t.topics.istinja
    );


    setText(
        "topicPurity",
        t.topics.purity
    );


    setText(
        "topicAwrah",
        t.topics.awrah
    );


    setText(
        "topicQibla",
        t.topics.qibla
    );


    setText(
        "topicTime",
        t.topics.time
    );

}


/* =====================================================
   SHOW MAIN PAGE
   ===================================================== */

function showMainPage(){

    const mainPage =
        document.getElementById("mainPage");

    const topicPage =
        document.getElementById("topicPage");


    if(mainPage){

        mainPage.classList.remove("hidden");
    }


    if(topicPage){

        topicPage.classList.add("hidden");
    }


    window.scrollTo(0,0);

}


/* =====================================================
   SHOW TOPIC PAGE
   ===================================================== */

function showTopicPage(topic){

    const lang =
        getLanguage();

    const t =
        TEXT[lang];


    const title =
        t.topics[topic] || "";


    setText(
        "topicPageTitle",
        title
    );


    setText(
        "topicContent",
        ""
    );


    const mainPage =
        document.getElementById("mainPage");

    const topicPage =
        document.getElementById("topicPage");


    if(mainPage){

        mainPage.classList.add("hidden");
    }


    if(topicPage){

        topicPage.classList.remove("hidden");
    }


    window.scrollTo(0,0);

}


/* =====================================================
   NAVIGATION
   ===================================================== */

function setupNavigation(){


    document
        .querySelectorAll(".topic-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    showTopicPage(
                        card.dataset.topic
                    );

                }
            );

        });


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


                if(
                    topicPage &&
                    !topicPage.classList.contains(
                        "hidden"
                    )
                ){

                    showMainPage();

                    return;
                }


                history.back();

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
