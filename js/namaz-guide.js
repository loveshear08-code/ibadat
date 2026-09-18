/* =========================================================
   IBADAT - NAMAZ GUIDE
   8 MAIN OPTIONS
   LANGUAGE: BN / EN / HI
   ========================================================= */


/* =========================
   LANGUAGE TEXT
   ========================= */

const NAMAZ_GUIDE_TEXT = {

    bn: {

        pageTitle: "নামাজ শিক্ষা",

        introTitle: "নামাজ শেখার গাইড",

        introText:
            "ধাপে ধাপে পবিত্রতা, প্রস্তুতি, পাঁচ ওয়াক্ত নামাজ, নামাজের পদ্ধতি ও প্রয়োজনীয় দোয়া শিখুন।",

        wudu: {
            title: "পবিত্রতা ও ওযু",
            desc: "পবিত্রতা, ওযু, গোসল, ওযু ভঙ্গের কারণ ও তায়াম্মুম"
        },

        what: {
            title: "নামাজ কী ও কেন",
            desc: "নামাজের পরিচয়, গুরুত্ব, উদ্দেশ্য ও প্রয়োজনীয়তা"
        },

        preparation: {
            title: "নামাজের প্রস্তুতি",
            desc: "পোশাক, শরীর, স্থান, সতর, কিবলা, সময় ও নিয়ত"
        },

        times: {
            title: "পাঁচ ওয়াক্ত নামাজ",
            desc: "ফজর, জোহর, আসর, মাগরিব ও এশার সময় ও রাকাত"
        },

        learn: {
            title: "নামাজ শিক্ষা",
            desc: "তাকবির থেকে সালাম পর্যন্ত ধাপে ধাপে নামাজ শেখা"
        },

        duas: {
            title: "নামাজে যা পড়তে হয়",
            desc: "সানা, ফাতিহা, সূরা, তাসবিহ, আত্তাহিয়্যাতু, দরুদ ও দোয়া"
        },

        jamaat: {
            title: "জামাত ও বিশেষ পরিস্থিতি",
            desc: "জামাত, ইমামের অনুসরণ, মাসবুক, ভুল ও সিজদায়ে সাহু"
        },

        special: {
            title: "বিশেষ নামাজ",
            desc: "বিতর, তাহাজ্জুদ, তারাবিহ, ঈদ, জানাজা ও অন্যান্য নফল নামাজ"
        }
    },


    en: {

        pageTitle: "Namaz Guide",

        introTitle: "Namaz Learning Guide",

        introText:
            "Learn purification, preparation, the five daily prayers, the method of Salah and the essential recitations step by step.",

        wudu: {
            title: "Purification & Wudu",
            desc: "Purification, Wudu, Ghusl, things that break Wudu and Tayammum"
        },

        what: {
            title: "What is Namaz & Why",
            desc: "Introduction, importance, purpose and significance of Namaz"
        },

        preparation: {
            title: "Preparation for Namaz",
            desc: "Clothing, body, place, awrah, Qibla, prayer time and intention"
        },

        times: {
            title: "Five Daily Prayers",
            desc: "Fajr, Dhuhr, Asr, Maghrib and Isha: times and rakats"
        },

        learn: {
            title: "Namaz Education",
            desc: "Step-by-step Namaz from Takbir to Salam"
        },

        duas: {
            title: "What to Recite in Namaz",
            desc: "Sana, Al-Fatihah, Surahs, Tasbih, Tashahhud, Durood and Duas"
        },

        jamaat: {
            title: "Jamaat & Special Situations",
            desc: "Congregation, following the Imam, Masbuq, mistakes and Sajdah Sahw"
        },

        special: {
            title: "Special Prayers",
            desc: "Witr, Tahajjud, Tarawih, Eid, Janazah and other Nafl prayers"
        }
    },


    hi: {

        pageTitle: "नमाज़ गाइड",

        introTitle: "नमाज़ सीखने की गाइड",

        introText:
            "पवित्रता, तैयारी, पाँच वक्त की नमाज़, नमाज़ पढ़ने का तरीका और ज़रूरी दुआएँ चरणबद्ध तरीके से सीखें।",

        wudu: {
            title: "पवित्रता और वुज़ू",
            desc: "पवित्रता, वुज़ू, ग़ुस्ल, वुज़ू तोड़ने वाली चीज़ें और तयम्मुम"
        },

        what: {
            title: "नमाज़ क्या है और क्यों",
            desc: "नमाज़ का परिचय, महत्व, उद्देश्य और आवश्यकता"
        },

        preparation: {
            title: "नमाज़ की तैयारी",
            desc: "कपड़े, शरीर, स्थान, सतर, क़िबला, समय और नियत"
        },

        times: {
            title: "पाँच वक्त की नमाज़",
            desc: "फ़ज्र, ज़ुहर, असर, मग़रिब और ईशा के समय और रकअत"
        },

        learn: {
            title: "नमाज़ की शिक्षा",
            desc: "तकबीर से सलाम तक नमाज़ पढ़ने का चरणबद्ध तरीका"
        },

        duas: {
            title: "नमाज़ में क्या पढ़ें",
            desc: "सना, फ़ातिहा, सूरह, तस्बीह, अतहिय्यात, दुरूद और दुआ"
        },

        jamaat: {
            title: "जमाअत और विशेष परिस्थितियाँ",
            desc: "जमाअत, इमाम का अनुसरण, मसबूक, गलतियाँ और सजदह सहव"
        },

        special: {
            title: "विशेष नमाज़",
            desc: "वित्र, तहज्जुद, तरावीह, ईद, जनाज़ा और अन्य नफ़्ल नमाज़"
        }
    }
};


/* =========================
   GET LANGUAGE
   ========================= */

function getNamazLanguage(){

    try{

        const saved =
            JSON.parse(localStorage.getItem("ibadatSettings"));

        if(
            saved &&
            ["bn","en","hi"].includes(saved.lang)
        ){
            return saved.lang;
        }

    }catch(e){}

    return "bn";
}


/* =========================
   APPLY LANGUAGE
   ========================= */

function applyNamazLanguage(){

    const lang = getNamazLanguage();

    const text =
        NAMAZ_GUIDE_TEXT[lang] ||
        NAMAZ_GUIDE_TEXT.bn;


    document.documentElement.lang = lang;


    document.getElementById("pageTitle").textContent =
        text.pageTitle;

    document.getElementById("introTitle").textContent =
        text.introTitle;

    document.getElementById("introText").textContent =
        text.introText;


    /* 1 */

    document.getElementById("titleWudu").textContent =
        text.wudu.title;

    document.getElementById("descWudu").textContent =
        text.wudu.desc;


    /* 2 */

    document.getElementById("titleWhat").textContent =
        text.what.title;

    document.getElementById("descWhat").textContent =
        text.what.desc;


    /* 3 */

    document.getElementById("titlePreparation").textContent =
        text.preparation.title;

    document.getElementById("descPreparation").textContent =
        text.preparation.desc;


    /* 4 */

    document.getElementById("titleTimes").textContent =
        text.times.title;

    document.getElementById("descTimes").textContent =
        text.times.desc;


    /* 5 */

    document.getElementById("titleLearn").textContent =
        text.learn.title;

    document.getElementById("descLearn").textContent =
        text.learn.desc;


    /* 6 */

    document.getElementById("titleDuas").textContent =
        text.duas.title;

    document.getElementById("descDuas").textContent =
        text.duas.desc;


    /* 7 */

    document.getElementById("titleJamaat").textContent =
        text.jamaat.title;

    document.getElementById("descJamaat").textContent =
        text.jamaat.desc;


    /* 8 */

    document.getElementById("titleSpecial").textContent =
        text.special.title;

    document.getElementById("descSpecial").textContent =
        text.special.desc;
}


/* =========================
   NAVIGATION
   ========================= */

function setupNamazNavigation(){

    const pages = {

        wudu:
            "namaz-wudu.html",

        what:
            "namaz-what.html",

        preparation:
            "namaz-preparation.html",

        times:
            "namaz-times.html",

        learn:
            "namaz-learn.html",

        duas:
            "namaz-duas.html",

        jamaat:
            "namaz-jamaat.html",

        special:
            "namaz-special.html"
    };


    document
        .querySelectorAll(".guide-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                const page =
                    pages[card.dataset.page];

                if(page){

                    window.location.href =
                        page;
                }
            });

        });
}


/* =========================
   BACK BUTTON
   ========================= */

function setupBackButton(){

    const button =
        document.getElementById("backButton");

    if(!button) return;

    button.addEventListener("click", () => {

        window.location.href =
            "../index.html";
    });
}


/* =========================
   LANGUAGE SYNC
   ========================= */

let lastNamazLanguage =
    getNamazLanguage();


function syncNamazLanguage(){

    const current =
        getNamazLanguage();

    if(current !== lastNamazLanguage){

        lastNamazLanguage =
            current;

        applyNamazLanguage();
    }
}


/* =========================
   START
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyNamazLanguage();

        setupNamazNavigation();

        setupBackButton();

        setInterval(
            syncNamazLanguage,
            1000
        );

    }
);
