/* =====================================================
   IBADAT - NAMAZ GUIDE
   ===================================================== */


/* =====================================================
   LANGUAGE
   ===================================================== */

const TEXT = {

    bn: {

        pageTitle:
            "নামাজ",

        infoTitle:
            "নামাজ কী ও কেন?",

        infoText1:
            "নামাজ বা সালাত হলো আল্লাহর নির্ধারিত ইবাদত। এটি আল্লাহকে স্মরণ ও তাঁর আনুগত্য করার গুরুত্বপূর্ণ মাধ্যম।",

        infoText2:
            "একজন মুসলিমের জীবনে পাঁচ ওয়াক্ত নামাজ রয়েছে। পাঁচ ওয়াক্ত নামাজের মাধ্যমে আমরা নিয়মিত আল্লাহর ইবাদত করি এবং তাঁর নির্দেশ পালন করি।",

        infoMore:
            "বিস্তারিত দেখতে টাচ করুন",

        purityTitle:
            "পবিত্রতা ও প্রস্তুতি",

        purityDesc:
            "ওযু, গোসল, তায়াম্মুম ও নামাজের প্রস্তুতি।",

        learnTitle:
            "নামাজ শিক্ষা",

        learnDesc:
            "নামাজ শুরু থেকে সালাম পর্যন্ত ধাপে ধাপে শেখা।",

        recitationsTitle:
            "নামাজে যা পড়তে হয়",

        recitationsDesc:
            "সানা, সূরা, তাসবিহ, তাশাহহুদ, দরুদ ও দোয়া।",

        jamaatTitle:
            "জামাত ও বিশেষ নামাজ",

        jamaatDesc:
            "জামাত, বিতর, তাহাজ্জুদ, তারাবিহ, ঈদ, জানাজা ইত্যাদি।",

        namazDetailsTitle:
            "নামাজের সূচি",

        dailyTitle:
            "দৈনিক নামাজের সূচি",

        specialTitle:
            "বিশেষ নামাজের সূচি",

        specialMore:
            "বিস্তারিত দেখতে টাচ করুন →",

        specialDetailsTitle:
            "বিশেষ নামাজের বিস্তারিত",

        purityPage:
            "পবিত্রতা ও প্রস্তুতি",

        learnPage:
            "নামাজ শিক্ষা",

        recitationsPage:
            "নামাজে যা পড়তে হয়",

        jamaatPage:
            "জামাত ও বিশেষ নামাজ",

        blankText:
            "এই অংশের বিস্তারিত তথ্য পরবর্তীতে যোগ করা হবে।",

        daily: [

            {
                name:"ফজর",
                detail:"২ সুন্নত + ২ ফরজ"
            },

            {
                name:"যোহর",
                detail:"৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল",
                extra:"জুম্মা হলে ২ ফরজ"
            },

            {
                name:"আসর",
                detail:"৪ সুন্নত + ৪ ফরজ"
            },

            {
                name:"মাগরিব",
                detail:"৩ ফরজ + ২ সুন্নত + ২ নফল"
            },

            {
                name:"এশা",
                detail:"৪ সুন্নত + ৪ ফরজ + ২ সুন্নত + ২ নফল + ৩ বিতর + ২ নফল"
            }

        ],


        featuredSpecial: [

            {
                name:"তাহাজ্জুদ",
                rakat:"২–৮ রাকাত",
                time:"এশার পর থেকে ফজরের আগে; শেষ রাত উত্তম",
                method:"২ রাকাত করে নফল নামাজ"
            },

            {
                name:"তারাবিহ",
                rakat:"২০ রাকাত",
                time:"রমজানের এশার পর",
                method:"২ রাকাত করে পড়া"
            },

            {
                name:"ঈদের নামাজ",
                rakat:"২ রাকাত",
                time:"ঈদের দিন, সূর্য ওঠার পর",
                method:"জামাতে বিশেষ তাকবিরসহ ২ রাকাত"
            }

        ],


        remainingSpecial: [

            {
                name:"ইশরাক",
                rakat:"২ রাকাত",
                time:"সূর্য ওঠার কিছুক্ষণ পর",
                method:"২ রাকাত নফল নামাজ"
            },

            {
                name:"দোহা / চাশত",
                rakat:"২–৮ রাকাত",
                time:"সূর্য ওঠার কিছুক্ষণ পর থেকে যোহরের আগে",
                method:"২ রাকাত করে নফল নামাজ"
            },

            {
                name:"ইস্তিখারা",
                rakat:"২ রাকাত",
                time:"কোনো গুরুত্বপূর্ণ সিদ্ধান্তের সময়",
                method:"২ রাকাত নফল পড়ে ইস্তিখারার দোয়া"
            },

            {
                name:"হাজতের নামাজ",
                rakat:"২ রাকাত",
                time:"কোনো প্রয়োজন বা সমস্যার সময়",
                method:"২ রাকাত নফল পড়ে আল্লাহর কাছে দোয়া"
            },

            {
                name:"সালাতুত তাসবীহ",
                rakat:"৪ রাকাত",
                time:"নফল নামাজের উপযুক্ত সময়",
                method:"নির্দিষ্ট তাসবিহসহ ৪ রাকাত"
            },

            {
                name:"ইস্তিসকার নামাজ",
                rakat:"২ রাকাত",
                time:"বৃষ্টির প্রয়োজন হলে",
                method:"জামাতে ২ রাকাত বিশেষ নামাজ"
            },

            {
                name:"জানাজার নামাজ",
                rakat:"রাকাত নেই",
                time:"মৃত মুসলিমের জানাজার সময়",
                method:"৪ তাকবির; রুকু-সিজদা নেই"
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
            "What is Salah and Why?",

        infoText1:
            "Salah is the worship prescribed by Allah. It is an important means of remembering Allah and obeying Him.",

        infoText2:
            "A Muslim performs five daily prayers. Through these prayers, we regularly worship Allah and follow His commands.",

        infoMore:
            "Tap to see details",

        purityTitle:
            "Purity & Preparation",

        purityDesc:
            "Wudu, ghusl, tayammum and preparation for Salah.",

        learnTitle:
            "Learn Salah",

        learnDesc:
            "Learn Salah step by step from beginning to salam.",

        recitationsTitle:
            "What to Recite in Salah",

        recitationsDesc:
            "Sana, surah, tasbih, tashahhud, durood and duas.",

        jamaatTitle:
            "Jamaat & Special Prayers",

        jamaatDesc:
            "Jamaat, Witr, Tahajjud, Tarawih, Eid, Janazah and more.",

        namazDetailsTitle:
            "Prayer Schedule",

        dailyTitle:
            "Daily Prayer Schedule",

        specialTitle:
            "Special Prayer Schedule",

        specialMore:
            "Tap to see details →",

        specialDetailsTitle:
            "Special Prayer Details",

        purityPage:
            "Purity & Preparation",

        learnPage:
            "Learn Salah",

        recitationsPage:
            "What to Recite in Salah",

        jamaatPage:
            "Jamaat & Special Prayers",

        blankText:
            "Detailed information for this section will be added later.",

        daily: [

            {
                name:"Fajr",
                detail:"2 Sunnah + 2 Fard"
            },

            {
                name:"Dhuhr",
                detail:"4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl",
                extra:"On Jumu'ah: 2 Fard"
            },

            {
                name:"Asr",
                detail:"4 Sunnah + 4 Fard"
            },

            {
                name:"Maghrib",
                detail:"3 Fard + 2 Sunnah + 2 Nafl"
            },

            {
                name:"Isha",
                detail:"4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr + 2 Nafl"
            }

        ],


        featuredSpecial: [

            {
                name:"Tahajjud",
                rakat:"2–8 rak'ahs",
                time:"After Isha until before Fajr; the last part of the night is best",
                method:"Pray in sets of 2 rak'ahs"
            },

            {
                name:"Tarawih",
                rakat:"20 rak'ahs",
                time:"After Isha during Ramadan",
                method:"Prayed in sets of 2 rak'ahs"
            },

            {
                name:"Eid Prayer",
                rakat:"2 rak'ahs",
                time:"On Eid day, after sunrise",
                method:"2 rak'ahs in congregation with the special takbirs"
            }

        ],


        remainingSpecial: [

            {
                name:"Ishraq",
                rakat:"2 rak'ahs",
                time:"A short while after sunrise",
                method:"2 rak'ahs of Nafl prayer"
            },

            {
                name:"Duha / Chasht",
                rakat:"2–8 rak'ahs",
                time:"A short while after sunrise until before Dhuhr",
                method:"Pray in sets of 2 rak'ahs"
            },

            {
                name:"Istikhara",
                rakat:"2 rak'ahs",
                time:"When seeking guidance for an important decision",
                method:"Pray 2 Nafl rak'ahs and make the Istikhara dua"
            },

            {
                name:"Salat al-Hajah",
                rakat:"2 rak'ahs",
                time:"When facing a need or difficulty",
                method:"Pray 2 Nafl rak'ahs and make dua to Allah"
            },

            {
                name:"Salat al-Tasbih",
                rakat:"4 rak'ahs",
                time:"At a suitable time for Nafl prayer",
                method:"4 rak'ahs with the prescribed tasbih"
            },

            {
                name:"Salat al-Istisqa",
                rakat:"2 rak'ahs",
                time:"When rain is needed",
                method:"2 special rak'ahs in congregation"
            },

            {
                name:"Janazah Prayer",
                rakat:"No rak'ahs",
                time:"At the funeral prayer of a deceased Muslim",
                method:"4 takbirs; no ruku or sujood"
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
            "नमाज़ क्या है और क्यों?",

        infoText1:
            "नमाज़ अल्लाह द्वारा निर्धारित इबादत है। यह अल्लाह को याद करने और उसकी आज्ञा मानने का महत्वपूर्ण माध्यम है।",

        infoText2:
            "एक मुसलमान के लिए पाँच वक्त की नमाज़ है। इनके माध्यम से हम नियमित रूप से अल्लाह की इबादत करते हैं।",

        infoMore:
            "विस्तार देखने के लिए टैप करें",

        purityTitle:
            "पवित्रता और तैयारी",

        purityDesc:
            "वुज़ू, ग़ुस्ल, तयम्मुम और नमाज़ की तैयारी।",

        learnTitle:
            "नमाज़ सीखें",

        learnDesc:
            "नमाज़ शुरू से सलाम तक चरण-दर-चरण सीखें।",

        recitationsTitle:
            "नमाज़ में क्या पढ़ें",

        recitationsDesc:
            "सना, सूरह, तस्बीह, तशह्हुद, दुरूद और दुआ।",

        jamaatTitle:
            "जमाअत और विशेष नमाज़",

        jamaatDesc:
            "जमाअत, वितर, तहज्जुद, तरावीह, ईद, जनाज़ा आदि।",

        namazDetailsTitle:
            "नमाज़ की सूची",

        dailyTitle:
            "दैनिक नमाज़ की सूची",

        specialTitle:
            "विशेष नमाज़ की सूची",

        specialMore:
            "विस्तार देखने के लिए टैप करें →",

        specialDetailsTitle:
            "विशेष नमाज़ का विवरण",

        purityPage:
            "पवित्रता और तैयारी",

        learnPage:
            "नमाज़ सीखें",

        recitationsPage:
            "नमाज़ में क्या पढ़ें",

        jamaatPage:
            "जमाअत और विशेष नमाज़",

        blankText:
            "इस भाग की विस्तृत जानकारी बाद में जोड़ी जाएगी।",

        daily: [

            {
                name:"फ़ज्र",
                detail:"2 सुन्नत + 2 फ़र्ज़"
            },

            {
                name:"ज़ुहर",
                detail:"4 सुन्नत + 4 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल",
                extra:"जुमुआ में: 2 फ़र्ज़"
            },

            {
                name:"अस्र",
                detail:"4 सुन्नत + 4 फ़र्ज़"
            },

            {
                name:"मग़रिब",
                detail:"3 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल"
            },

            {
                name:"इशा",
                detail:"4 सुन्नत + 4 फ़र्ज़ + 2 सुन्नत + 2 नफ़्ल + 3 वितर + 2 नफ़्ल"
            }

        ],


        featuredSpecial: [

            {
                name:"तहज्जुद",
                rakat:"2–8 रकअत",
                time:"इशा के बाद से फ़ज्र से पहले; आख़िरी रात बेहतर है",
                method:"2 रकअत करके पढ़ें"
            },

            {
                name:"तरावीह",
                rakat:"20 रकअत",
                time:"रमज़ान में इशा के बाद",
                method:"2 रकअत करके पढ़ी जाती है"
            },

            {
                name:"ईद की नमाज़",
                rakat:"2 रकअत",
                time:"ईद के दिन सूर्योदय के बाद",
                method:"विशेष तकबीरों के साथ जमाअत में 2 रकअत"
            }

        ],


        remainingSpecial: [

            {
                name:"इशराक",
                rakat:"2 रकअत",
                time:"सूर्योदय के कुछ समय बाद",
                method:"2 रकअत नफ़्ल नमाज़"
            },

            {
                name:"दुहा / चाश्त",
                rakat:"2–8 रकअत",
                time:"सूर्योदय के कुछ समय बाद से ज़ुहर से पहले",
                method:"2 रकअत करके नफ़्ल नमाज़"
            },

            {
                name:"इस्तिखारा",
                rakat:"2 रकअत",
                time:"किसी महत्वपूर्ण निर्णय के समय",
                method:"2 रकअत नफ़्ल पढ़कर इस्तिखारा की दुआ करें"
            },

            {
                name:"सलातुल हाजत",
                rakat:"2 रकअत",
                time:"किसी आवश्यकता या परेशानी के समय",
                method:"2 रकअत नफ़्ल पढ़कर अल्लाह से दुआ करें"
            },

            {
                name:"सलातुत तस्बीह",
                rakat:"4 रकअत",
                time:"नफ़्ल नमाज़ के उपयुक्त समय",
                method:"निर्धारित तस्बीह के साथ 4 रकअत"
            },

            {
                name:"सलातुल इस्तिस्का",
                rakat:"2 रकअत",
                time:"जब बारिश की आवश्यकता हो",
                method:"जमाअत में 2 विशेष रकअत"
            },

            {
                name:"जनाज़े की नमाज़",
                rakat:"कोई रकअत नहीं",
                time:"किसी मृत मुस्लिम की जनाज़े के समय",
                method:"4 तकबीर; रुकू और सज्दा नहीं"
            }

        ]

    }

};



/* =====================================================
   LANGUAGE HELPER
   ===================================================== */

function getLanguage(){

    try{

        /*
           Support both possible settings keys.
        */

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
   NUMBER LOCALIZATION
   ===================================================== */

function localizeNumbers(value, lang){

    if(lang === "bn"){

        return String(value)
            .replace(
                /0/g,"০"
            )
            .replace(
                /1/g,"১"
            )
            .replace(
                /2/g,"২"
            )
            .replace(
                /3/g,"৩"
            )
            .replace(
                /4/g,"৪"
            )
            .replace(
                /5/g,"৫"
            )
            .replace(
                /6/g,"৬"
            )
            .replace(
                /7/g,"৭"
            )
            .replace(
                /8/g,"৮"
            )
            .replace(
                /9/g,"৯"
            );

    }


    if(lang === "hi"){

        return String(value)
            .replace(
                /0/g,"०"
            )
            .replace(
                /1/g,"१"
            )
            .replace(
                /2/g,"२"
            )
            .replace(
                /3/g,"३"
            )
            .replace(
                /4/g,"४"
            )
            .replace(
                /5/g,"५"
            )
            .replace(
                /6/g,"६"
            )
            .replace(
                /7/g,"७"
            )
            .replace(
                /8/g,"८"
            )
            .replace(
                /9/g,"९"
            );

    }


    return String(value);
}



/* =====================================================
   SET TEXT
   ===================================================== */

function setText(id, value){

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
        "infoMore",
        t.infoMore
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


    setText(
        "namazDetailsTitle",
        t.namazDetailsTitle
    );


    setText(
        "dailyScheduleTitle",
        t.dailyTitle
    );


    setText(
        "specialScheduleTitle",
        t.specialTitle
    );


    setText(
        "specialMore",
        t.specialMore
    );


    setText(
        "specialDetailsTitle",
        t.specialDetailsTitle
    );


    renderDailyPrayers(
        t.daily,
        lang
    );


    renderFeaturedSpecial(
        t.featuredSpecial,
        lang
    );


    renderRemainingSpecial(
        t.remainingSpecial,
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


    container.innerHTML = "";


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
                prayer.detail;


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
                    prayer.extra;


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
   FEATURED 3 SPECIAL PRAYERS
   ===================================================== */

function renderFeaturedSpecial(
    prayers,
    lang
){

    const container =
        document.getElementById(
            "featuredSpecialList"
        );


    if(!container){
        return;
    }


    container.innerHTML = "";


    prayers.forEach(
        prayer => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "featured-special-item";


            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "featured-special-name";


            name.textContent =
                prayer.name;


            const rakat =
                document.createElement(
                    "div"
                );


            rakat.className =
                "featured-special-line";


            rakat.innerHTML =
                "<span class='featured-special-label'>" +
                (
                    lang === "bn"
                        ? "রাকাত: "
                        : lang === "hi"
                            ? "रकअत: "
                            : "Rak'ahs: "
                ) +
                "</span>" +
                localizeNumbers(
                    prayer.rakat,
                    lang
                );


            const time =
                document.createElement(
                    "div"
                );


            time.className =
                "featured-special-line";


            time.innerHTML =
                "<span class='featured-special-label'>" +
                (
                    lang === "bn"
                        ? "সময়: "
                        : lang === "hi"
                            ? "समय: "
                            : "Time: "
                ) +
                "</span>" +
                prayer.time;


            const method =
                document.createElement(
                    "div"
                );


            method.className =
                "featured-special-line";


            method.innerHTML =
                "<span class='featured-special-label'>" +
                (
                    lang === "bn"
                        ? "পদ্ধতি: "
                        : lang === "hi"
                            ? "तरीका: "
                            : "Method: "
                ) +
                "</span>" +
                prayer.method;


            item.appendChild(
                name
            );


            item.appendChild(
                rakat
            );


            item.appendChild(
                time
            );


            item.appendChild(
                method
            );


            container.appendChild(
                item
            );

        }
    );
}



/* =====================================================
   REMAINING 7 SPECIAL PRAYERS
   ===================================================== */

function renderRemainingSpecial(
    prayers,
    lang
){

    const container =
        document.getElementById(
            "remainingSpecialList"
        );


    if(!container){
        return;
    }


    container.innerHTML = "";


    prayers.forEach(
        (prayer,index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "special-detail-card";


            const title =
                document.createElement(
                    "div"
                );


            title.className =
                "special-detail-title";


            title.textContent =
                localizeNumbers(
                    index + 4,
                    lang
                ) +
                ". " +
                prayer.name;


            const rakat =
                document.createElement(
                    "div"
                );


            rakat.className =
                "special-detail-row";


            rakat.innerHTML =
                "<span class='special-detail-label'>" +
                (
                    lang === "bn"
                        ? "রাকাত: "
                        : lang === "hi"
                            ? "रकअत: "
                            : "Rak'ahs: "
                ) +
                "</span>" +
                localizeNumbers(
                    prayer.rakat,
                    lang
                );


            const time =
                document.createElement(
                    "div"
                );


            time.className =
                "special-detail-row";


            time.innerHTML =
                "<span class='special-detail-label'>" +
                (
                    lang === "bn"
                        ? "সময়: "
                        : lang === "hi"
                            ? "समय: "
                            : "Time: "
                ) +
                "</span>" +
                prayer.time;


            const method =
                document.createElement(
                    "div"
                );


            method.className =
                "special-detail-row";


            method.innerHTML =
                "<span class='special-detail-label'>" +
                (
                    lang === "bn"
                        ? "কীভাবে পড়তে হয়: "
                        : lang === "hi"
                            ? "कैसे पढ़ें: "
                            : "How to pray: "
                ) +
                "</span>" +
                prayer.method;


            card.appendChild(
                title
            );


            card.appendChild(
                rakat
            );


            card.appendChild(
                time
            );


            card.appendChild(
                method
            );


            container.appendChild(
                card
            );

        }
    );
}



/* =====================================================
   PAGE SHOW / HIDE
   ===================================================== */

function hideAllPages(){

    document
        .getElementById("mainMenu")
        .classList.add("hidden");


    document
        .getElementById("namazDetails")
        .classList.add("hidden");


    document
        .getElementById("specialDetailsPage")
        .classList.add("hidden");


    document
        .getElementById("sectionPage")
        .classList.add("hidden");
}



/* =====================================================
   OPEN SECOND PAGE
   ===================================================== */

function showNamazDetails(){

    hideAllPages();


    document
        .getElementById("namazDetails")
        .classList.remove("hidden");


    window.scrollTo(
        0,
        0
    );
}



/* =====================================================
   OPEN SPECIAL DETAILS
   ===================================================== */

function showSpecialDetails(){

    hideAllPages();


    document
        .getElementById(
            "specialDetailsPage"
        )
        .classList.remove("hidden");


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
        t.jamaatPage;


    if(section === "purity"){

        title =
            t.purityPage;

    }else if(section === "learn"){

        title =
            t.learnPage;

    }else if(section === "recitations"){

        title =
            t.recitationsPage;

    }else if(section === "jamaat"){

        title =
            t.jamaatPage;
    }


    hideAllPages();


    setText(
        "sectionTitle",
        title
    );


    setText(
        "sectionContent",
        t.blankText
    );


    document
        .getElementById(
            "sectionPage"
        )
        .classList.remove(
            "hidden"
        );


    window.scrollTo(
        0,
        0
    );
}



/* =====================================================
   NAVIGATION SETUP
   ===================================================== */

function setupNavigation(){


    /*
       Main "Namaz Ki O Keno" card
    */

    document
        .getElementById(
            "namazInfoCard"
        )
        .addEventListener(
            "click",
            showNamazDetails
        );



    /*
       Special board
       Whole board is clickable
    */

    document
        .getElementById(
            "specialScheduleCard"
        )
        .addEventListener(
            "click",
            showSpecialDetails
        );



    /*
       Back from second page
       -> first Namaz page
    */

    document
        .getElementById(
            "namazDetailsBack"
        )
        .addEventListener(
            "click",
            () => {

                hideAllPages();


                document
                    .getElementById(
                        "mainMenu"
                    )
                    .classList.remove(
                        "hidden"
                    );


                window.scrollTo(
                    0,
                    0
                );

            }
        );



    /*
       Back from third page
       -> second page
    */

    document
        .getElementById(
            "specialDetailsBack"
        )
        .addEventListener(
            "click",
            showNamazDetails
        );



    /*
       Four blank options
    */

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



    /*
       Back from blank section
       -> first Namaz page
    */

    document
        .getElementById(
            "sectionBackButton"
        )
        .addEventListener(
            "click",
            () => {

                hideAllPages();


                document
                    .getElementById(
                        "mainMenu"
                    )
                    .classList.remove(
                        "hidden"
                    );


                window.scrollTo(
                    0,
                    0
                );

            }
        );



    /*
       Top back button
       Usually returns to previous browser page.
    */

    document
        .getElementById(
            "backButton"
        )
        .addEventListener(
            "click",
            () => {

                if(
                    !document
                        .getElementById(
                            "mainMenu"
                        )
                        .classList
                        .contains("hidden")
                ){

                    history.back();

                    return;
                }


                if(
                    !document
                        .getElementById(
                            "specialDetailsPage"
                        )
                        .classList
                        .contains("hidden")
                ){

                    showNamazDetails();

                    return;
                }


                if(
                    !document
                        .getElementById(
                            "namazDetails"
                        )
                        .classList
                        .contains("hidden")
                ){

                    hideAllPages();


                    document
                        .getElementById(
                            "mainMenu"
                        )
                        .classList
                        .remove(
                            "hidden"
                        );

                    return;
                }


                history.back();

            }
        );

}



/* =====================================================
   INIT
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyLanguage();

        setupNavigation();

    }
);
