/* =========================================================
   IBADAT - NAMAZ GUIDE
   MAIN INFO CARD + FOUR OPTIONS
   BN / EN / HI
   ========================================================= */


const TEXT = {

    /* =====================================================
       BANGLA
       ===================================================== */

    bn: {

        pageTitle: "নামাজ",

        infoTitle: "নামাজ কী ও কেন?",

        infoText1:
            "নামাজ বা সালাত হলো আল্লাহর নির্ধারিত ইবাদত। এটি আল্লাহকে স্মরণ ও তাঁর আনুগত্য করার গুরুত্বপূর্ণ মাধ্যম।",

        infoText2:
            "একজন মুসলিমের জীবনে পাঁচ ওয়াক্ত নামাজ রয়েছে। পাঁচ ওয়াক্ত নামাজের মাধ্যমে আমরা নিয়মিত আল্লাহর ইবাদত করি এবং তাঁর নির্দেশ পালন করি।",

        infoMore:
            "বিস্তারিত দেখতে টাচ করুন",

        fivePrayersTitle:
            "পাঁচ ওয়াক্ত নামাজ",

        prayers: [

            ["ফজর", "২ সুন্নত + ২ ফরজ"],

            ["যোহর", "৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল"],

            ["আসর", "৪ সুন্নত + ৪ ফরজ"],

            ["মাগরিব", "৩ ফরজ + ২ সুন্নত + ২ নফল"],

            ["এশা", "৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল + ৩ বিতর + ২ নফল"]

        ],


        purityTitle: "পবিত্রতা ও প্রস্তুতি",

        purityDesc:
            "ওযু, গোসল, তায়াম্মুম ও নামাজের প্রস্তুতি।",


        learnTitle: "নামাজ শিক্ষা",

        learnDesc:
            "নামাজ শুরু থেকে সালাম পর্যন্ত ধাপে ধাপে শেখা।",


        recitationsTitle: "নামাজে যা পড়তে হয়",

        recitationsDesc:
            "সানা, সূরা, তাসবিহ, তাশাহহুদ, দরুদ ও দোয়া।",


        jamaatTitle: "জামাত ও বিশেষ নামাজ",

        jamaatDesc:
            "জামাত, বিতর, তাহাজ্জুদ, তারাবিহ, ঈদ, জানাজা ইত্যাদি।",


        sections: {

            purity: {

                title: "পবিত্রতা ও প্রস্তুতি",

                items: [

                    ["ওযু", "ওযুর প্রয়োজনীয় নিয়ম ও বিষয়গুলো এখানে থাকবে।"],

                    ["গোসল", "ফরজ গোসল ও প্রয়োজনীয় নিয়মগুলো এখানে থাকবে।"],

                    ["তায়াম্মুম", "তায়াম্মুমের নিয়ম ও প্রয়োজনীয় বিষয়গুলো এখানে থাকবে।"],

                    ["নামাজের প্রস্তুতি", "নামাজের আগে প্রয়োজনীয় প্রস্তুতিগুলো এখানে থাকবে।"]

                ]

            },


            learn: {

                title: "নামাজ শিক্ষা",

                items: [

                    ["নামাজের শুরু", "নামাজ শুরু করার নিয়ম এখানে থাকবে।"],

                    ["কিয়াম", "দাঁড়িয়ে নামাজ পড়ার নিয়ম এখানে থাকবে।"],

                    ["রুকু", "রুকুর নিয়ম এখানে থাকবে।"],

                    ["সিজদা", "সিজদার নিয়ম এখানে থাকবে।"],

                    ["কায়দা ও সালাম", "শেষ বৈঠক ও সালামের নিয়ম এখানে থাকবে।"]

                ]

            },


            recitations: {

                title: "নামাজে যা পড়তে হয়",

                items: [

                    ["সানা", "সানার বিষয়বস্তু এখানে থাকবে।"],

                    ["সূরা ফাতিহা", "সূরা ফাতিহা এখানে থাকবে।"],

                    ["ছোট সূরা", "নামাজে পড়ার উপযোগী ছোট সূরাগুলো এখানে থাকবে।"],

                    ["রুকু ও সিজদার তাসবিহ", "রুকু ও সিজদার তাসবিহ এখানে থাকবে।"],

                    ["তাশাহহুদ", "তাশাহহুদের বিষয়বস্তু এখানে থাকবে।"],

                    ["দরুদ", "দরুদের বিষয়বস্তু এখানে থাকবে।"],

                    ["দোয়া", "নামাজের শেষের দোয়া এখানে থাকবে।"]

                ]

            },


            jamaat: {

                title: "জামাত ও বিশেষ নামাজ",

                items: [

                    ["জামাত", "জামাতে নামাজ পড়ার নিয়ম এখানে থাকবে।"],

                    ["ইমামের অনুসরণ", "ইমামের অনুসরণ সম্পর্কিত বিষয় এখানে থাকবে।"],

                    ["মাসবুক", "মাসবুকের প্রয়োজনীয় নিয়ম এখানে থাকবে।"],

                    ["বিতর", "বিতর নামাজের নিয়ম এখানে থাকবে।"],

                    ["তাহাজ্জুদ", "তাহাজ্জুদ নামাজের নিয়ম এখানে থাকবে।"],

                    ["তারাবিহ", "তারাবিহ নামাজের বিষয়গুলো এখানে থাকবে।"],

                    ["ঈদের নামাজ", "ঈদের নামাজের নিয়ম এখানে থাকবে।"],

                    ["জানাজার নামাজ", "জানাজার নামাজের নিয়ম এখানে থাকবে।"]

                ]

            }

        }

    },


    /* =====================================================
       ENGLISH
       ===================================================== */

    en: {

        pageTitle: "Namaz",

        infoTitle: "What is Namaz and Why?",

        infoText1:
            "Namaz, or Salah, is the worship prescribed by Allah. It is an important means of remembering Allah and obeying Him.",

        infoText2:
            "A Muslim has five daily prayers. Through these five prayers, we regularly worship Allah and follow His command.",

        infoMore:
            "Tap to see details",

        fivePrayersTitle:
            "Five Daily Prayers",

        prayers: [

            ["Fajr", "2 Sunnah + 2 Fard"],

            ["Dhuhr", "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl"],

            ["Asr", "4 Sunnah + 4 Fard"],

            ["Maghrib", "3 Fard + 2 Sunnah + 2 Nafl"],

            ["Isha", "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr + 2 Nafl"]

        ],


        purityTitle: "Purity & Preparation",

        purityDesc:
            "Wudu, Ghusl, Tayammum and preparation for Namaz.",


        learnTitle: "Learn Namaz",

        learnDesc:
            "Learn Namaz step by step from beginning to Salam.",


        recitationsTitle: "What to Recite in Namaz",

        recitationsDesc:
            "Sana, Surahs, Tasbih, Tashahhud, Durood and Dua.",


        jamaatTitle: "Jamaat & Special Prayers",

        jamaatDesc:
            "Jamaat, Witr, Tahajjud, Taraweeh, Eid, Janazah and more.",


        sections: {

            purity: {

                title: "Purity & Preparation",

                items: [

                    ["Wudu", "Rules and essential matters of Wudu will be provided here."],

                    ["Ghusl", "Obligatory Ghusl and related rules will be provided here."],

                    ["Tayammum", "Rules and essential matters of Tayammum will be provided here."],

                    ["Preparation for Namaz", "Necessary preparation before Namaz will be provided here."]

                ]

            },


            learn: {

                title: "Learn Namaz",

                items: [

                    ["Beginning Namaz", "How to begin Namaz will be provided here."],

                    ["Qiyam", "The rules of standing in Namaz will be provided here."],

                    ["Ruku", "The rules of Ruku will be provided here."],

                    ["Sajdah", "The rules of Sajdah will be provided here."],

                    ["Qa'dah & Salam", "The final sitting and Salam will be provided here."]

                ]

            },


            recitations: {

                title: "What to Recite in Namaz",

                items: [

                    ["Sana", "Sana will be provided here."],

                    ["Surah Al-Fatihah", "Surah Al-Fatihah will be provided here."],

                    ["Short Surahs", "Suitable short Surahs for Namaz will be provided here."],

                    ["Tasbih of Ruku & Sajdah", "Tasbih of Ruku and Sajdah will be provided here."],

                    ["Tashahhud", "Tashahhud will be provided here."],

                    ["Durood", "Durood will be provided here."],

                    ["Dua", "Dua recited at the end of Namaz will be provided here."]

                ]

            },


            jamaat: {

                title: "Jamaat & Special Prayers",

                items: [

                    ["Jamaat", "Rules of praying in congregation will be provided here."],

                    ["Following the Imam", "Rules related to following the Imam will be provided here."],

                    ["Masbuq", "Rules concerning a Masbuq will be provided here."],

                    ["Witr", "Rules of Witr prayer will be provided here."],

                    ["Tahajjud", "Rules of Tahajjud prayer will be provided here."],

                    ["Taraweeh", "Information about Taraweeh will be provided here."],

                    ["Eid Prayer", "Rules of Eid prayer will be provided here."],

                    ["Janazah", "Rules of Janazah prayer will be provided here."]

                ]

            }

        }

    },


    /* =====================================================
       HINDI
       ===================================================== */

    hi: {

        pageTitle: "नमाज़",

        infoTitle: "नमाज़ क्या है और क्यों?",

        infoText1:
            "नमाज़ या सलात अल्लाह द्वारा निर्धारित इबादत है। यह अल्लाह को याद करने और उसकी आज्ञा का पालन करने का महत्वपूर्ण माध्यम है।",

        infoText2:
            "एक मुसलमान के जीवन में पाँच वक़्त की नमाज़ होती है। इन पाँच नमाज़ों के माध्यम से हम नियमित रूप से अल्लाह की इबादत करते हैं और उसकी आज्ञा का पालन करते हैं।",

        infoMore:
            "विवरण देखने के लिए टैप करें",

        fivePrayersTitle:
            "पाँच वक़्त की नमाज़",

        prayers: [

            ["फ़ज्र", "२ सुन्नत + २ फ़र्ज़"],

            ["ज़ुहर", "४ सुन्नत + ४ फ़र्ज़ + २ सुन्नत + २ नफ़्ल"],

            ["असर", "४ सुन्नत + ४ फ़र्ज़"],

            ["मग़रिब", "३ फ़र्ज़ + २ सुन्नत + २ नफ़्ल"],

            ["इशा", "४ सुन्नत + ४ फ़र्ज़ + २ सुन्नत + २ नफ़्ल + ३ वित्र + २ नफ़्ल"]

        ],


        purityTitle: "पवित्रता और तैयारी",

        purityDesc:
            "वुज़ू, ग़ुस्ल, तयम्मुम और नमाज़ की तैयारी।",


        learnTitle: "नमाज़ सीखें",

        learnDesc:
            "नमाज़ शुरू करने से सलाम तक चरणबद्ध तरीके से सीखें।",


        recitationsTitle: "नमाज़ में क्या पढ़ें",

        recitationsDesc:
            "सना, सूरह, तस्बीह, तशह्हुद, दुरूद और दुआ।",


        jamaatTitle: "जमाअत और विशेष नमाज़",

        jamaatDesc:
            "जमाअत, वित्र, तहज्जुद, तरावीह, ईद, जनाज़ा आदि।",


        sections: {

            purity: {

                title: "पवित्रता और तैयारी",

                items: [

                    ["वुज़ू", "वुज़ू के आवश्यक नियम यहाँ दिए जाएंगे।"],

                    ["ग़ुस्ल", "फ़र्ज़ ग़ुस्ल और संबंधित नियम यहाँ दिए जाएंगे।"],

                    ["तयम्मुम", "तयम्मुम के नियम यहाँ दिए जाएंगे।"],

                    ["नमाज़ की तैयारी", "नमाज़ से पहले आवश्यक तैयारी यहाँ दी जाएगी।"]

                ]

            },


            learn: {

                title: "नमाज़ सीखें",

                items: [

                    ["नमाज़ की शुरुआत", "नमाज़ शुरू करने का तरीका यहाँ दिया जाएगा।"],

                    ["क़ियाम", "नमाज़ में खड़े होने के नियम यहाँ दिए जाएंगे।"],

                    ["रुकू", "रुकू के नियम यहाँ दिए जाएंगे।"],

                    ["सजदा", "सजदे के नियम यहाँ दिए जाएंगे।"],

                    ["क़ायदा और सलाम", "अंतिम बैठक और सलाम के नियम यहाँ दिए जाएंगे।"]

                ]

            },


            recitations: {

                title: "नमाज़ में क्या पढ़ें",

                items: [

                    ["सना", "सना यहाँ दी जाएगी।"],

                    ["सूरह अल-फ़ातिहा", "सूरह अल-फ़ातिहा यहाँ दी जाएगी।"],

                    ["छोटी सूरहें", "नमाज़ के लिए छोटी सूरहें यहाँ दी जाएंगी।"],

                    ["रुकू और सजदे की तस्बीह", "रुकू और सजदे की तस्बीह यहाँ दी जाएगी।"],

                    ["तशह्हुद", "तशह्हुद यहाँ दिया जाएगा।"],

                    ["दुरूद", "दुरूद यहाँ दिया जाएगा।"],

                    ["दुआ", "नमाज़ के अंत की दुआ यहाँ दी जाएगी।"]

                ]

            },


            jamaat: {

                title: "जमाअत और विशेष नमाज़",

                items: [

                    ["जमाअत", "जमाअत में नमाज़ पढ़ने के नियम यहाँ दिए जाएंगे।"],

                    ["इमाम का अनुसरण", "इमाम का अनुसरण करने से संबंधित नियम यहाँ दिए जाएंगे।"],

                    ["मसबूक", "मसबूक से संबंधित नियम यहाँ दिए जाएंगे।"],

                    ["वित्र", "वित्र नमाज़ के नियम यहाँ दिए जाएंगे।"],

                    ["तहज्जुद", "तहज्जुद नमाज़ के नियम यहाँ दिए जाएंगे।"],

                    ["तरावीह", "तरावीह के बारे में जानकारी यहाँ दी जाएगी।"],

                    ["ईद की नमाज़", "ईद की नमाज़ के नियम यहाँ दिए जाएंगे।"],

                    ["जनाज़ा", "जनाज़े की नमाज़ के नियम यहाँ दिए जाएंगे।"]

                ]

            }

        }

    }

};


/* =========================================================
   LANGUAGE
   ========================================================= */

function getLanguage(){

    try{

        const saved =
            JSON.parse(
                localStorage.getItem("ibadatSettings")
            );

        if(
            saved &&
            ["bn","en","hi"].includes(saved.lang)
        ){

            return saved.lang;

        }

    }catch(error){

        console.log(error);

    }

    return "bn";
}


/* =========================================================
   SET TEXT
   ========================================================= */

function setText(id, text){

    const element =
        document.getElementById(id);

    if(element){

        element.textContent = text;

    }

}


/* =========================================================
   APPLY LANGUAGE
   ========================================================= */

function applyLanguage(){

    const lang = getLanguage();

    const t = TEXT[lang];


    document.documentElement.lang = lang;


    document.title =
        lang === "bn"
            ? "IBADAT - নামাজ"
            : lang === "hi"
                ? "IBADAT - नमाज़"
                : "IBADAT - Namaz";


    setText("pageTitle", t.pageTitle);


    setText("infoTitle", t.infoTitle);

    setText("infoText1", t.infoText1);

    setText("infoText2", t.infoText2);

    setText("infoMore", t.infoMore);


    setText("titlePurity", t.purityTitle);

    setText("descPurity", t.purityDesc);


    setText("titleLearn", t.learnTitle);

    setText("descLearn", t.learnDesc);


    setText("titleRecitations", t.recitationsTitle);

    setText("descRecitations", t.recitationsDesc);


    setText("titleJamaat", t.jamaatTitle);

    setText("descJamaat", t.jamaatDesc);


    /*
     * Language পরিবর্তন হলে
     * বর্তমানে খোলা page-ও update হবে।
     */

    const sectionPage =
        document.getElementById("sectionPage");

    const currentSection =
        sectionPage.dataset.section;


    if(currentSection){

        showSection(
            currentSection,
            false
        );

    }


    const namazDetails =
        document.getElementById("namazDetails");


    if(
        !namazDetails.classList.contains("hidden")
    ){

        showNamazDetails(false);

    }

}


/* =========================================================
   SHOW NAMAZ DETAILS
   ========================================================= */

function showNamazDetails(updateHistory = true){

    const lang = getLanguage();

    const t = TEXT[lang];


    document
        .getElementById("mainMenu")
        .classList.add("hidden");


    document
        .getElementById("sectionPage")
        .classList.add("hidden");


    document
        .getElementById("namazDetails")
        .classList.remove("hidden");


    setText(
        "namazDetailsTitle",
        t.infoTitle
    );


    setText(
        "fivePrayersTitle",
        t.fivePrayersTitle
    );


    const container =
        document.getElementById("prayerDetails");


    container.innerHTML = "";


    t.prayers.forEach(
        function(prayer){

            const row =
                document.createElement("div");

            row.className =
                "prayer-row";


            const name =
                document.createElement("span");

            name.className =
                "prayer-name";

            name.textContent =
                prayer[0] + ":";


            const count =
                document.createElement("span");

            count.className =
                "prayer-count";

            count.textContent =
                prayer[1];


            row.appendChild(name);

            row.appendChild(count);


            container.appendChild(row);

        }
    );


    if(updateHistory){

        history.pushState(
            {
                page: "namazDetails"
            },
            "",
            "#namaz-details"
        );

    }

}


/* =========================================================
   CLOSE NAMAZ DETAILS
   ========================================================= */

function closeNamazDetails(){

    document
        .getElementById("namazDetails")
        .classList.add("hidden");


    document
        .getElementById("mainMenu")
        .classList.remove("hidden");

}


/* =========================================================
   SHOW OTHER SECTION
   ========================================================= */

function showSection(
    sectionName,
    updateHistory = true
){

    const lang = getLanguage();

    const section =
        TEXT[lang].sections[sectionName];


    if(!section){

        return;

    }


    document
        .getElementById("mainMenu")
        .classList.add("hidden");


    document
        .getElementById("namazDetails")
        .classList.add("hidden");


    document
        .getElementById("sectionPage")
        .classList.remove("hidden");


    document
        .getElementById("sectionPage")
        .dataset.section =
        sectionName;


    setText(
        "sectionTitle",
        section.title
    );


    const sectionContent =
        document.getElementById(
            "sectionContent"
        );


    sectionContent.innerHTML = "";


    section.items.forEach(
        function(item){

            const card =
                document.createElement("div");

            card.className =
                "content-card";


            const title =
                document.createElement("div");

            title.className =
                "content-title";

            title.textContent =
                item[0];


            const text =
                document.createElement("div");

            text.className =
                "content-text";

            text.textContent =
                item[1];


            card.appendChild(title);

            card.appendChild(text);


            sectionContent.appendChild(card);

        }
    );


    if(updateHistory){

        history.pushState(
            {
                section: sectionName
            },
            "",
            "#" + sectionName
        );

    }

}


/* =========================================================
   CLOSE OTHER SECTION
   ========================================================= */

function closeSection(){

    document
        .getElementById("sectionPage")
        .classList.add("hidden");


    document
        .getElementById("sectionPage")
        .dataset.section = "";


    document
        .getElementById("mainMenu")
        .classList.remove("hidden");
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation(){

    /*
     * Main "নামাজ কী ও কেন" card
     */

    document
        .getElementById("namazInfoCard")
        .addEventListener(
            "click",
            function(){

                showNamazDetails();

            }
        );


    /*
     * Four main cards
     */

    const cards =
        document.querySelectorAll(
            ".guide-card"
        );


    cards.forEach(
        function(card){

            card.addEventListener(
                "click",
                function(){

                    showSection(
                        card.dataset.section
                    );

                }
            );

        }
    );


    /*
     * Namaz details back
     */

    document
        .getElementById("namazDetailsBack")
        .addEventListener(
            "click",
            function(){

                history.back();

            }
        );


    /*
     * Other section back
     */

    document
        .getElementById("sectionBackButton")
        .addEventListener(
            "click",
            function(){

                history.back();

            }
        );


    /*
     * Browser / Android back
     */

    window.addEventListener(
        "popstate",
        function(){

            const hash =
                window.location.hash
                    .replace("#","");


            if(hash === "namaz-details"){

                showNamazDetails(false);

                return;

            }


            if(
                TEXT[getLanguage()]
                    .sections[hash]
            ){

                showSection(
                    hash,
                    false
                );

                return;

            }


            closeNamazDetails();

            closeSection();

        }
    );

}


/* =========================================================
   HOME BACK
   ========================================================= */

function setupHomeBack(){

    document
        .getElementById("backButton")
        .addEventListener(
            "click",
            function(){

                window.location.href =
                    "../index.html";

            }
        );

}


/* =========================================================
   LANGUAGE SYNC
   ========================================================= */

let lastLanguage = null;


function syncLanguage(){

    const currentLanguage =
        getLanguage();


    if(
        currentLanguage !== lastLanguage
    ){

        lastLanguage =
            currentLanguage;

        applyLanguage();

    }

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        lastLanguage =
            getLanguage();


        applyLanguage();


        setupNavigation();

        setupHomeBack();


        /*
         * Settings থেকে language পরিবর্তন করলে
         * Namaz page automatic update হবে।
         */

        setInterval(
            syncLanguage,
            500
        );


        /*
         * Direct hash opening
         */

        const hash =
            window.location.hash
                .replace("#","");


        if(hash === "namaz-details"){

            showNamazDetails(false);

        }
        else if(
            TEXT[getLanguage()]
                .sections[hash]
        ){

            showSection(
                hash,
                false
            );

        }

    }
);

