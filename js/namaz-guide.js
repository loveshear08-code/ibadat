/* =====================================================
   IBADAT - NAMAZ GUIDE
   FINAL VERSION
   ===================================================== */


/* =====================================================
   LANGUAGE
   ===================================================== */

const TEXT = {

    /* =================================================
       BENGALI
       ================================================= */

    bn: {

        pageTitle:
            "নামাজ",

        infoTitle:
            "কী ও কেন?",

        infoText1:
            "নামাজ বা সালাত হলো আল্লাহর নির্ধারিত ইবাদত। এটি আল্লাহকে স্মরণ ও তাঁর আনুগত্য করার গুরুত্বপূর্ণ মাধ্যম।",

        infoText2:
            "একজন মুসলিমের জীবনে পাঁচ ওয়াক্ত নামাজ রয়েছে। পাঁচ ওয়াক্ত নামাজের মাধ্যমে আমরা নিয়মিত আল্লাহর ইবাদত করি এবং তাঁর নির্দেশ পালন করি।",


        purityTitle:
            "পবিত্রতা ও প্রস্তুতি",


        learnTitle:
            "নামাজ শিক্ষা",


        recitationsTitle:
            "নামাজে যা পড়তে হয়",


        jamaatTitle:
            "জামাত ও বিশেষ নামাজ",


        sectionTitle: {

            purity:
                "পবিত্রতা ও প্রস্তুতি",

            learn:
                "নামাজ শিক্ষা",

            recitations:
                "নামাজে যা পড়তে হয়",

            jamaat:
                "জামাত ও বিশেষ নামাজ"

        },


        dailyTitle:
            "নামাজের সূচি",


        daily: [

            {
                name:
                    "ফজর",

                detail:
                    "২ সুন্নত + ২ ফরজ"
            },

            {
                name:
                    "যোহর",

                detail:
                    "৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল",

                extra:
                    "জুম্মা হলে ২ ফরজ"
            },

            {
                name:
                    "আসর",

                detail:
                    "৪ সুন্নত + ৪ ফরজ"
            },

            {
                name:
                    "মাগরিব",

                detail:
                    "৩ ফরজ + ২ সুন্নত + ২ নফল"
            },

            {
                name:
                    "এশা",

                detail:
                    "৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল + ৩ বিতর + ২ নফল"
            }

        ]

    },


    /* =================================================
       ENGLISH
       ================================================= */

    en: {

        pageTitle:
            "Prayer",

        infoTitle:
            "What and Why?",

        infoText1:
            "Salah is the worship prescribed by Allah. It is an important means of remembering Allah and obeying Him.",

        infoText2:
            "A Muslim performs five daily prayers. Through these prayers, we regularly worship Allah and follow His commands.",


        purityTitle:
            "Purity & Preparation",


        learnTitle:
            "Learn Salah",


        recitationsTitle:
            "What to Recite in Salah",


        jamaatTitle:
            "Jamaat & Special Prayers",


        sectionTitle: {

            purity:
                "Purity & Preparation",

            learn:
                "Learn Salah",

            recitations:
                "What to Recite in Salah",

            jamaat:
                "Jamaat & Special Prayers"

        },


        dailyTitle:
            "Prayer Schedule",


        daily: [

            {
                name:
                    "Fajr",

                detail:
                    "2 Sunnah + 2 Fard"
            },

            {
                name:
                    "Dhuhr",

                detail:
                    "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl",

                extra:
                    "On Jumu'ah: 2 Fard"
            },

            {
                name:
                    "Asr",

                detail:
                    "4 Sunnah + 4 Fard"
            },

            {
                name:
                    "Maghrib",

                detail:
                    "3 Fard + 2 Sunnah + 2 Nafl"
            },

            {
                name:
                    "Isha",

                detail:
                    "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr + 2 Nafl"
            }

        ]

    },


    /* =================================================
       HINDI
       ================================================= */

    hi: {

        pageTitle:
            "नमाज़",

        infoTitle:
            "क्या और क्यों?",

        infoText1:
            "नमाज़ अल्लाह द्वारा निर्धारित इबादत है। यह अल्लाह को याद करने और उसकी आज्ञा मानने का महत्वपूर्ण माध्यम है।",

        infoText2:
            "एक मुसलमान के लिए पाँच वक्त की नमाज़ है। इनके माध्यम से हम नियमित रूप से अल्लाह की इबादत करते हैं।",


        purityTitle:
            "पवित्रता और तैयारी",


        learnTitle:
            "नमाज़ सीखें",


        recitationsTitle:
            "नमाज़ में क्या पढ़ें",


        jamaatTitle:
            "जमाअत और विशेष नमाज़",


        sectionTitle: {

            purity:
                "पवित्रता और तैयारी",

            learn:
                "नमाज़ सीखें",

            recitations:
                "नमाज़ में क्या पढ़ें",

            jamaat:
                "जमाअत और विशेष नमाज़"

        },


        dailyTitle:
            "नमाज़ की सूची",


        daily: [

            {
                name:
                    "फ़ज्र",

                detail:
                    "2 सुन्नत + 2 फ़र्ज़"
            },

            {
                name:
                    "ज़ुहर",

                detail:
                    "4 सुन्नत + 4 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल",

                extra:
                    "जुमुआ में: 2 फ़र्ज़"
            },

            {
                name:
                    "अस्र",

                detail:
                    "4 सुन्नत + 4 फ़र्ज़"
            },

            {
                name:
                    "मग़रिब",

                detail:
                    "3 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल"
            },

            {
                name:
                    "इशा",

                detail:
                    "4 सुन्नत + 4 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल + 3 वितर + 2 नफ़्ल"
            }

        ]

    }

};


/* =====================================================
   LANGUAGE HELPER
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
   NUMBER LOCALIZATION
   ===================================================== */

function localizeNumbers(
    value,
    lang
){

    if(lang === "bn"){

        return String(value)

            .replace(/0/g,"০")
            .replace(/1/g,"১")
            .replace(/2/g,"২")
            .replace(/3/g,"৩")
            .replace(/4/g,"৪")
            .replace(/5/g,"৫")
            .replace(/6/g,"৬")
            .replace(/7/g,"৭")
            .replace(/8/g,"৮")
            .replace(/9/g,"৯");

    }


    if(lang === "hi"){

        return String(value)

            .replace(/0/g,"०")
            .replace(/1/g,"१")
            .replace(/2/g,"२")
            .replace(/3/g,"३")
            .replace(/4/g,"४")
            .replace(/5/g,"५")
            .replace(/6/g,"६")
            .replace(/7/g,"७")
            .replace(/8/g,"८")
            .replace(/9/g,"९");

    }


    return String(value);

}


/* =====================================================
   SET TEXT
   ===================================================== */

function setText(
    id,
    value
){

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
        "infoTitle",
        t.infoTitle
    );


    setText(
        "infoText1",
        t.infoText1
    );


    setText(
        "infoText2",
        t.infoText2
    );


    setText(
        "titlePurity",
        t.purityTitle
    );


    setText(
        "descPurity",
        t.purityDesc
    );


    setText(
        "titleLearn",
        t.learnTitle
    );


    setText(
        "descLearn",
        t.learnDesc
    );


    setText(
        "titleRecitations",
        t.recitationsTitle
    );


    setText(
        "descRecitations",
        t.recitationsDesc
    );


    setText(
        "titleJamaat",
        t.jamaatTitle
    );


    setText(
        "descJamaat",
        t.jamaatDesc
    );


    renderDailyPrayers(
        t.daily,
        lang
    );

}


/* =====================================================
   DAILY PRAYERS
   ===================================================== */

function renderDailyPrayers(
    prayers,
    lang
){

    const container =
        document.getElementById(
            "dailyPrayerList"
        );


    if(!container){

        return;

    }


    container.innerHTML =
        "";


    prayers.forEach(
        prayer => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "daily-prayer-row";


            const name =
                document.createElement(
                    "span"
                );


            name.className =
                "daily-prayer-name";


            name.textContent =
                prayer.name + " — ";


            const detail =
                document.createElement(
                    "span"
                );


            detail.className =
                "daily-prayer-detail";


            detail.textContent =
                localizeNumbers(
                    prayer.detail,
                    lang
                );


            row.appendChild(
                name
            );


            row.appendChild(
                detail
            );


            if(prayer.extra){

                const extra =
                    document.createElement(
                        "span"
                    );


                extra.className =
                    "daily-prayer-extra";


                extra.textContent =
                    localizeNumbers(
                        prayer.extra,
                        lang
                    );


                row.appendChild(
                    extra
                );

            }


            container.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   PAGE SHOW / HIDE
   ===================================================== */

function hideAllPages(){

    const mainMenu =
        document.getElementById(
            "mainMenu"
        );


    const sectionPage =
        document.getElementById(
            "sectionPage"
        );


    if(mainMenu){

        mainMenu.classList.add(
            "hidden"
        );

    }


    if(sectionPage){

        sectionPage.classList.add(
            "hidden"
        );

    }

}


/* =====================================================
   SHOW MAIN NAMAZ PAGE
   ===================================================== */

function showMainNamazPage(){

    hideAllPages();


    const mainMenu =
        document.getElementById(
            "mainMenu"
        );


    if(mainMenu){

        mainMenu.classList.remove(
            "hidden"
        );

    }


    /*
       Reload all language text.
       This prevents the cards from
       appearing without their text.
    */

    applyLanguage();


    window.scrollTo(
        0,
        0
    );

}


/* =====================================================
   OPEN BLANK SECTION
   ===================================================== */

function showBlankSection(
    section
){

    const lang =
        getLanguage();


    const t =
        TEXT[lang];


    let title =
        "";


    if(
        t.sectionTitle &&
        t.sectionTitle[section]
    ){

        title =
            t.sectionTitle[section];

    }


    hideAllPages();


    /*
       Only the section title is shown.
       Content area remains completely blank.
    */

    setText(
        "sectionTitle",
        title
    );


    setText(
        "sectionContent",
        ""
    );


    const sectionPage =
        document.getElementById(
            "sectionPage"
        );


    if(sectionPage){

        sectionPage.classList.remove(
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
       FOUR MAIN GUIDE CARDS
       ================================================ */

    document
        .querySelectorAll(
            ".guide-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        showBlankSection(
                            card.dataset.section
                        );

                    }
                );

            }
        );


    /* ================================================
       BACK FROM BLANK SECTION
       ================================================ */

    const sectionBackButton =
        document.getElementById(
            "sectionBackButton"
        );


    if(sectionBackButton){

        sectionBackButton.addEventListener(
            "click",
            () => {

                showMainNamazPage();

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

                const sectionPage =
                    document.getElementById(
                        "sectionPage"
                    );


                /*
                   If currently inside one of
                   the four Namaz sections,
                   return to Namaz main page.
                */

                if(
                    sectionPage &&
                    !sectionPage.classList.contains(
                        "hidden"
                    )
                ){

                    showMainNamazPage();

                    return;

                }


                /*
                   If already on Namaz main page,
                   return to the previous app page.
                */

                const mainMenu =
                    document.getElementById(
                        "mainMenu"
                    );


                if(
                    mainMenu &&
                    !mainMenu.classList.contains(
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
   INITIALIZATION
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyLanguage();

        setupNavigation();

    }
);
