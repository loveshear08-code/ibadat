/* =========================================
   IBADAT — NAMAZ PURITY PAGE
   File: js/namaz-purity.js

   Languages:
   Bengali / English / Hindi

   Theme:
   Light Mode / Dark Mode

   Lessons:
   1. Wudu
   2. Ghusl
   3. Tayammum
   4. Impurity & Cleanliness
   5. Basic Purity Rules & Doubts
   ========================================= */

"use strict";

(function () {

    /* =========================================
       1. SETTINGS
       ========================================= */

    const SETTINGS_KEY = "appSettings";

    const SUPPORTED_LANGUAGES = ["bn", "en", "hi"];


    function getSettings() {

        try {

            const savedSettings =
                localStorage.getItem(SETTINGS_KEY);

            const settings = savedSettings
                ? JSON.parse(savedSettings)
                : {};

            if (
                settings &&
                typeof settings === "object" &&
                !Array.isArray(settings)
            ) {
                return settings;
            }

            return {};

        } catch (error) {

            return {};

        }

    }


    function getCurrentLanguage() {

        const settings = getSettings();

        return SUPPORTED_LANGUAGES.includes(settings.lang)
            ? settings.lang
            : "bn";

    }


    /* =========================================
       2. TRANSLATIONS
       ========================================= */

    const translations = {

        /* =====================================
           BENGALI
           ===================================== */

        bn: {

            pageTitle: "পবিত্রতা",

            pageIntro:
                "পবিত্রতা হলো শরীর, পোশাক ও নামাজের স্থান পরিচ্ছন্ন রাখা এবং ইবাদতের জন্য প্রয়োজনীয় ধর্মীয় পবিত্রতা অর্জন করা। নামাজের আগে কী করতে হবে, তা জানা প্রত্যেক মুসলিমের জন্য গুরুত্বপূর্ণ।",

            pageSubtitle:
                "ইবাদতের আগে পরিচ্ছন্নতা ও পবিত্রতার সহজ পাঠ",


            contentsTitle:
                "এই পেজে যা শিখবে",

            contents: [
                "অজু",
                "গোসল",
                "তায়াম্মুম",
                "নাপাকি ও পরিচ্ছন্নতা",
                "পবিত্রতার মৌলিক নিয়ম ও সন্দেহ"
            ],


            /* WUDU */

            wuduKicker: "প্রথম পাঠ",

            wuduTitle: "অজু (ওযু)",

            wuduIntro:
                "অজু হলো নির্দিষ্ট অঙ্গ পানি দিয়ে ধোয়া ও মাসেহ করার মাধ্যমে নামাজের জন্য পবিত্রতা অর্জনের একটি পদ্ধতি।",

            wuduStepsTitle:
                "অজুর সাধারণ ধাপ",

            wuduSteps: [
                "নিয়ত করে বিসমিল্লাহ বলা।",
                "দুই হাত কবজি পর্যন্ত ধোয়া।",
                "কুলি করা ও নাকে পানি দেওয়া।",
                "সম্পূর্ণ মুখ ধোয়া।",
                "দুই হাত কনুইসহ ধোয়া।",
                "ভেজা হাত দিয়ে মাথা মাসেহ করা এবং কান মাসেহের বিধান শেখা।",
                "দুই পা টাখনুসহ ধোয়া।"
            ],

            wuduNoteTitle:
                "মনে রাখবে",

            wuduNote:
                "ফরজের সংখ্যা, ক্রম এবং কিছু সুন্নত ও মাসেহের বিস্তারিত বিধানে ফিকহি মতভেদ রয়েছে। নিজের অনুসৃত নির্ভরযোগ্য আলেমের নির্দেশনা অনুযায়ী শিখবে।",

            wuduBreakTitle:
                "অজু ভঙ্গের কারণ",

            wuduBreaks: [
                "প্রস্রাব, পায়খানা বা বায়ু নির্গত হওয়া।",
                "গভীর ঘুম বা চেতনা হারানোর কিছু অবস্থা।",
                "কিছু বিষয়ে মাজহাবভেদে বিধান আলাদা হতে পারে।"
            ],


            /* GHUSL */

            ghuslKicker: "দ্বিতীয় পাঠ",

            ghuslTitle: "গোসল",

            ghuslIntro:
                "গোসল হলো পুরো শরীরে পানি পৌঁছে দিয়ে বড় অপবিত্রতা থেকে পবিত্রতা অর্জনের নির্দিষ্ট পদ্ধতি।",

            ghuslWhenTitle:
                "কখন গোসল ফরজ হতে পারে?",

            ghuslWhen: [
                "দাম্পত্য মিলনের পর।",
                "যৌনস্রাব নির্গমনের নির্দিষ্ট অবস্থায়।",
                "ঋতুস্রাব বা প্রসব-পরবর্তী রক্তস্রাব শেষ হলে।"
            ],

            ghuslStepsTitle:
                "গোসলের সাধারণ পদ্ধতি",

            ghuslSteps: [
                "পবিত্রতার নিয়ত করা।",
                "শরীরে নাপাকি থাকলে তা পরিষ্কার করা।",
                "সুন্নাহসম্মতভাবে অজু করা।",
                "মাথা ও পুরো শরীরে পানি পৌঁছানো; কোনো অংশ শুকনো না রাখা।"
            ],

            ghuslNoteTitle:
                "গুরুত্বপূর্ণ",

            ghuslNote:
                "গোসলের ফরজ ও পদ্ধতির বিস্তারিত বিধান মাজহাবভেদে ভিন্ন হতে পারে। ব্যক্তিগত পরিস্থিতির জন্য বিশ্বস্ত আলেমের পরামর্শ নাও।",


            /* TAYAMMUM */

            tayammumKicker: "তৃতীয় পাঠ",

            tayammumTitle: "তায়াম্মুম",

            tayammumIntro:
                "পানি না পাওয়া গেলে বা পানি ব্যবহার ক্ষতিকর হলে নির্দিষ্ট শর্তে তায়াম্মুম করা যায়।",

            tayammumWhenTitle:
                "কখন তায়াম্মুম করা যায়?",

            tayammumWhen: [
                "পানি না পাওয়া গেলে।",
                "পানি ব্যবহার করলে অসুস্থতা বাড়ার বাস্তব আশঙ্কা থাকলে।",
                "অন্যান্য প্রয়োজনীয় শর্ত পূরণ হলে।"
            ],

            tayammumStepsTitle:
                "সাধারণ ধাপ",

            tayammumSteps: [
                "তায়াম্মুমের নিয়ত করা।",
                "শরিয়তসম্মত পবিত্র মাটিজাত উপাদান ব্যবহার করা।",
                "মুখ মাসেহ করা।",
                "নির্ভরযোগ্য নির্দেশনা অনুযায়ী হাত মাসেহ করা।"
            ],

            tayammumNoteTitle:
                "সতর্কতা",

            tayammumNote:
                "উপকরণ, হাত মাসেহের সীমা ও শর্তে ফিকহি মতভেদ রয়েছে। এই সংক্ষিপ্ত তালিকাকে পূর্ণ ফতোয়া মনে করবে না।",


            /* CLEANLINESS */

            cleanlinessKicker:
                "চতুর্থ পাঠ",

            cleanlinessTitle:
                "নাপাকি ও পরিচ্ছন্নতা",

            cleanlinessIntro:
                "নামাজের আগে শরীর, পোশাক ও নামাজের স্থান পবিত্র থাকা জরুরি। সন্দেহ আর নিশ্চিত নাপাকির মধ্যে পার্থক্য বুঝে চলতে হবে।",

            cleanlinessCheckTitle:
                "নামাজের আগে যাচাই করো",

            cleanlinessChecks: [
                "শরীর ও পোশাকের পবিত্রতা নিশ্চিত করা।",
                "নামাজের স্থান পরিষ্কার রাখা।",
                "নাপাকি থাকলে উপযুক্তভাবে তা দূর করা।",
                "শুধু সন্দেহের কারণে বারবার কষ্টে না পড়ে নির্ভরযোগ্য বিধান শেখা।"
            ],


            /* BASIC PURITY RULES */

            purityRulesKicker:
                "পঞ্চম পাঠ",

            purityRulesTitle:
                "পবিত্রতার মৌলিক নিয়ম ও সন্দেহ",

            purityRulesIntro:
                "অজু, গোসল, তায়াম্মুম ও নাপাকি দূর করার নিয়ম জানা যেমন জরুরি, তেমনি কোন অবস্থায় কোনটি প্রয়োজন তা বোঝাও গুরুত্বপূর্ণ। শুধু সন্দেহের কারণে অযথা দুশ্চিন্তা না করে নির্ভরযোগ্য বিধান শেখা উচিত।",

            purityRulesWhenTitle:
                "কোন অবস্থায় কী প্রয়োজন?",

            purityRulesWhen: [
                "সাধারণত অজু ভেঙে গেলে নামাজের আগে নতুন করে অজু করতে হয়।",
                "গোসল ফরজ হওয়ার অবস্থা তৈরি হলে শুধু অজু যথেষ্ট নয়; প্রয়োজনীয় গোসল করতে হয়।",
                "পানি না পাওয়া গেলে বা পানি ব্যবহার ক্ষতিকর হলে নির্দিষ্ট শর্তে তায়াম্মুমের বিধান প্রযোজ্য হতে পারে।",
                "শরীর, পোশাক বা নামাজের স্থানে নিশ্চিত নাপাকি থাকলে তা যথাযথভাবে দূর করতে হবে।"
            ],

            purityRulesDoubtTitle:
                "সন্দেহ হলে কী করবে?",

            purityRulesDoubts: [
                "শুধু সন্দেহকে নিশ্চিত নাপাকি মনে করবে না।",
                "বারবার পরীক্ষা করে অযথা দুশ্চিন্তা বাড়াবে না।",
                "একই ধরনের সন্দেহ বারবার হলে বিশ্বস্ত আলেমের কাছ থেকে নিজের পরিস্থিতি অনুযায়ী নির্দেশনা নেবে।"
            ],

            purityRulesNoteTitle:
                "মনে রাখবে",

            purityRulesNote:
                "পবিত্রতার কিছু বিধান পরিস্থিতি ও ফিকহি মতভেদ অনুযায়ী ভিন্ন হতে পারে। এখানে দেওয়া তথ্য শিক্ষামূলক সংক্ষিপ্তসার; ব্যক্তিগত সমস্যায় নির্ভরযোগ্য আলেমের পরামর্শ নাও।",


            /* RECAP */

            recapKicker:
                "শেষে মনে রাখো",

            recapTitle:
                "সংক্ষিপ্ত পুনরালোচনা",

            recapList: [
                "নামাজের আগে প্রয়োজনীয় পবিত্রতা অর্জন করো।",
                "অজু, গোসল ও তায়াম্মুমের নিয়ম আলাদা করে শেখো।",
                "শরীর, পোশাক ও নামাজের স্থান পরিষ্কার রাখো।",
                "শুধু সন্দেহের কারণে অযথা দুশ্চিন্তা না করে নির্ভরযোগ্য বিধান শেখো।",
                "যে বিষয়ে নিশ্চিত নও, বিশ্বস্ত আলেমের কাছে জেনে নাও।"
            ],

            disclaimer:
                "শিক্ষামূলক সংক্ষিপ্তসার: বিস্তারিত ধর্মীয় বিধান ও ব্যক্তিগত পরিস্থিতির জন্য নির্ভরযোগ্য আলেমের পরামর্শ নাও।",

            footerText:
                "IBADAT • জ্ঞান অর্জন করো, সুন্দরভাবে আমল করো"

        },


        /* =====================================
           ENGLISH
           ===================================== */

        en: {

            pageTitle: "Purification",

            pageIntro:
                "Purification includes keeping the body, clothing and prayer place clean, as well as attaining the ritual purity required for worship. Learning what is required before prayer is important for every Muslim.",

            pageSubtitle:
                "A simple guide to cleanliness and ritual purification before worship",


            contentsTitle:
                "On this page",

            contents: [
                "Wudu",
                "Ghusl",
                "Tayammum",
                "Impurity & cleanliness",
                "Basic purity rules & doubts"
            ],


            /* WUDU */

            wuduKicker: "LESSON 1",

            wuduTitle: "Wudu (Ablution)",

            wuduIntro:
                "Wudu is a form of ritual purification for prayer that involves washing specific parts of the body and wiping designated areas.",

            wuduStepsTitle:
                "General steps of wudu",

            wuduSteps: [
                "Make the intention and say Bismillah.",
                "Wash both hands to the wrists.",
                "Rinse the mouth and gently rinse the nose.",
                "Wash the entire face.",
                "Wash both arms, including the elbows.",
                "Wipe the head with wet hands and learn the ruling on wiping the ears.",
                "Wash both feet, including the ankles."
            ],

            wuduNoteTitle:
                "Remember",

            wuduNote:
                "Legal schools differ on the number and order of obligatory acts and on some recommended acts and details of wiping. Learn from a reliable scholar you trust.",

            wuduBreakTitle:
                "What invalidates wudu?",

            wuduBreaks: [
                "Passing urine, stool or wind.",
                "Certain states of deep sleep or loss of awareness.",
                "Rulings on some other matters differ between schools of law."
            ],


            /* GHUSL */

            ghuslKicker: "LESSON 2",

            ghuslTitle: "Ghusl",

            ghuslIntro:
                "Ghusl is the prescribed full-body washing used to remove major ritual impurity.",

            ghuslWhenTitle:
                "When may ghusl be obligatory?",

            ghuslWhen: [
                "After marital intercourse.",
                "In specific circumstances involving sexual discharge.",
                "After menstruation or postnatal bleeding has ended."
            ],

            ghuslStepsTitle:
                "General method of ghusl",

            ghuslSteps: [
                "Make the intention for purification.",
                "Remove any impurity from the body.",
                "Perform wudu in the recommended manner.",
                "Ensure water reaches the head and the entire body, leaving no area dry."
            ],

            ghuslNoteTitle:
                "Important",

            ghuslNote:
                "Some detailed rulings about obligatory acts and the method differ between legal schools. Seek trusted guidance for personal circumstances.",


            /* TAYAMMUM */

            tayammumKicker: "LESSON 3",

            tayammumTitle: "Tayammum",

            tayammumIntro:
                "When water is unavailable or its use would be harmful, tayammum may be permitted under specific conditions.",

            tayammumWhenTitle:
                "When may tayammum be used?",

            tayammumWhen: [
                "When water cannot be found.",
                "When there is a credible concern that using water would worsen an illness or cause harm.",
                "When the other required conditions are met."
            ],

            tayammumStepsTitle:
                "General steps",

            tayammumSteps: [
                "Make the intention for tayammum.",
                "Use a clean, legally suitable earth-derived surface.",
                "Wipe the face.",
                "Wipe the hands according to the reliable method you follow."
            ],

            tayammumNoteTitle:
                "Please note",

            tayammumNote:
                "Scholars differ about eligible materials, the extent of wiping and the conditions. This brief outline is not a complete legal ruling.",


            /* CLEANLINESS */

            cleanlinessKicker:
                "LESSON 4",

            cleanlinessTitle:
                "Impurity & Cleanliness",

            cleanlinessIntro:
                "Before prayer, the body, clothing and prayer place must meet the requirements of purity. Distinguish established impurity from mere doubt.",

            cleanlinessCheckTitle:
                "Before prayer, check that you have",

            cleanlinessChecks: [
                "Ensured the body and clothing are pure.",
                "Kept the prayer place clean.",
                "Removed any impurity appropriately.",
                "Learned reliable guidance rather than becoming distressed by repeated doubts."
            ],


            /* BASIC PURITY RULES */

            purityRulesKicker:
                "LESSON 5",

            purityRulesTitle:
                "Basic Purity Rules & Doubts",

            purityRulesIntro:
                "Learning the rules of wudu, ghusl, tayammum and removing impurity is important. It is also important to understand which form of purification is required in a given situation. Learn reliable guidance rather than worrying unnecessarily over doubts.",

            purityRulesWhenTitle:
                "What is needed in different situations?",

            purityRulesWhen: [
                "When wudu is invalidated, a new wudu is generally needed before prayer.",
                "When ghusl becomes obligatory, wudu alone is not sufficient; the required ghusl must be performed.",
                "When water is unavailable or harmful to use, tayammum may apply under specific conditions.",
                "Established impurity on the body, clothing or prayer place should be removed appropriately."
            ],

            purityRulesDoubtTitle:
                "What should you do when in doubt?",

            purityRulesDoubts: [
                "Do not treat mere doubt as confirmed impurity.",
                "Avoid repeatedly checking in ways that increase unnecessary distress.",
                "If the same doubts keep recurring, seek guidance from a trusted scholar for your circumstances."
            ],

            purityRulesNoteTitle:
                "Remember",

            purityRulesNote:
                "Some purity rulings differ according to circumstances and legal schools. This is an educational overview, not a complete legal ruling. Consult a reliable scholar for personal concerns.",


            /* RECAP */

            recapKicker:
                "KEY POINTS",

            recapTitle:
                "Quick Review",

            recapList: [
                "Attain the purification required before prayer.",
                "Learn wudu, ghusl and tayammum as separate topics.",
                "Keep the body, clothing and prayer place clean.",
                "Learn reliable guidance instead of worrying unnecessarily over doubts.",
                "Ask a trusted scholar about matters you are unsure of."
            ],

            disclaimer:
                "Educational overview: consult a qualified, trusted scholar for detailed rulings and personal circumstances.",

            footerText:
                "IBADAT • Learn with care, practice with sincerity"

        },


        /* =====================================
           HINDI
           ===================================== */

        hi: {

            pageTitle: "पवित्रता",

            pageIntro:
                "पवित्रता में शरीर, कपड़ों और नमाज़ की जगह को साफ़ रखना तथा इबादत के लिए आवश्यक धार्मिक पवित्रता प्राप्त करना शामिल है। नमाज़ से पहले की आवश्यक बातें जानना हर मुसलमान के लिए महत्वपूर्ण है।",

            pageSubtitle:
                "इबादत से पहले स्वच्छता और धार्मिक पवित्रता की सरल जानकारी",


            contentsTitle:
                "इस पेज पर",

            contents: [
                "वुज़ू",
                "ग़ुस्ल",
                "तयम्मुम",
                "नापाकी और स्वच्छता",
                "पवित्रता के मूल नियम और संदेह"
            ],


            /* WUDU */

            wuduKicker: "पहला पाठ",

            wuduTitle: "वुज़ू",

            wuduIntro:
                "वुज़ू नमाज़ के लिए धार्मिक पवित्रता प्राप्त करने का तरीका है, जिसमें शरीर के कुछ अंग धोए और कुछ स्थानों पर मसह किया जाता है।",

            wuduStepsTitle:
                "वुज़ू के सामान्य चरण",

            wuduSteps: [
                "नीयत करें और बिस्मिल्लाह कहें।",
                "दोनों हाथ कलाइयों तक धोएँ।",
                "कुल्ली करें और नाक में पानी डालें।",
                "पूरा चेहरा धोएँ।",
                "दोनों बाज़ू कोहनी सहित धोएँ।",
                "गीले हाथों से सिर का मसह करें और कानों के मसह का हुक्म भी सीखें।",
                "दोनों पैर टखनों सहित धोएँ।"
            ],

            wuduNoteTitle:
                "याद रखें",

            wuduNote:
                "फ़र्ज़ की संख्या, क्रम और कुछ सुन्नतों तथा मसह के विवरण में फ़िक़्ही मतभेद हैं। अपने भरोसेमंद विद्वान से सीखें।",

            wuduBreakTitle:
                "वुज़ू टूटने के कारण",

            wuduBreaks: [
                "पेशाब, मल या हवा निकलना।",
                "गहरी नींद या होश खोने की कुछ स्थितियाँ।",
                "कुछ अन्य मामलों में फ़िक़्ही मतभेद हो सकते हैं।"
            ],


            /* GHUSL */

            ghuslKicker: "दूसरा पाठ",

            ghuslTitle: "ग़ुस्ल",

            ghuslIntro:
                "ग़ुस्ल पूरे शरीर पर पानी पहुँचाकर बड़ी धार्मिक अपवित्रता से पवित्र होने का निर्धारित तरीका है।",

            ghuslWhenTitle:
                "ग़ुस्ल कब फ़र्ज़ हो सकता है?",

            ghuslWhen: [
                "वैवाहिक संभोग के बाद।",
                "यौन स्राव से जुड़ी कुछ निर्धारित स्थितियों में।",
                "मासिक धर्म या प्रसव के बाद का रक्तस्राव समाप्त होने पर।"
            ],

            ghuslStepsTitle:
                "ग़ुस्ल का सामान्य तरीका",

            ghuslSteps: [
                "पवित्रता की नीयत करें।",
                "शरीर पर लगी नापाकी हो तो उसे साफ़ करें।",
                "सुन्नत के तरीके से वुज़ू करें।",
                "सिर और पूरे शरीर तक पानी पहुँचाएँ; कोई हिस्सा सूखा न रहे।"
            ],

            ghuslNoteTitle:
                "महत्वपूर्ण",

            ghuslNote:
                "ग़ुस्ल के फ़र्ज़ और तरीके के कुछ विस्तृत नियम फ़िक़्ही मत के अनुसार अलग हो सकते हैं। निजी स्थिति में भरोसेमंद विद्वान से सलाह लें।",


            /* TAYAMMUM */

            tayammumKicker: "तीसरा पाठ",

            tayammumTitle: "तयम्मुम",

            tayammumIntro:
                "जब पानी उपलब्ध न हो या उसका उपयोग हानिकारक हो, तो निश्चित शर्तों के साथ तयम्मुम किया जा सकता है।",

            tayammumWhenTitle:
                "तयम्मुम कब किया जा सकता है?",

            tayammumWhen: [
                "जब पानी उपलब्ध न हो।",
                "जब पानी इस्तेमाल करने से बीमारी बढ़ने या नुकसान होने की वास्तविक आशंका हो।",
                "जब अन्य आवश्यक शर्तें पूरी हों।"
            ],

            tayammumStepsTitle:
                "सामान्य चरण",

            tayammumSteps: [
                "तयम्मुम की नीयत करें।",
                "शरई तौर पर उपयुक्त साफ़ मिट्टी-आधारित सतह का उपयोग करें।",
                "चेहरे का मसह करें।",
                "भरोसेमंद तरीके के अनुसार हाथों का मसह करें।"
            ],

            tayammumNoteTitle:
                "ध्यान दें",

            tayammumNote:
                "उपयुक्त सामग्री, मसह की सीमा और शर्तों में विद्वानों के मतभेद हैं। यह संक्षिप्त जानकारी पूर्ण फ़तवा नहीं है।",


            /* CLEANLINESS */

            cleanlinessKicker:
                "चौथा पाठ",

            cleanlinessTitle:
                "नापाकी और स्वच्छता",

            cleanlinessIntro:
                "नमाज़ से पहले शरीर, कपड़े और नमाज़ की जगह का पवित्र होना ज़रूरी है। पक्की नापाकी और केवल संदेह में अंतर समझें।",

            cleanlinessCheckTitle:
                "नमाज़ से पहले जाँचें",

            cleanlinessChecks: [
                "शरीर और कपड़ों की पवित्रता सुनिश्चित करें।",
                "नमाज़ की जगह साफ़ रखें।",
                "नापाकी हो तो उचित तरीके से दूर करें।",
                "बार-बार संदेह में परेशान होने के बजाय भरोसेमंद मार्गदर्शन सीखें।"
            ],


            /* BASIC PURITY RULES */

            purityRulesKicker:
                "पाँचवाँ पाठ",

            purityRulesTitle:
                "पवित्रता के मूल नियम और संदेह",

            purityRulesIntro:
                "वुज़ू, ग़ुस्ल, तयम्मुम और नापाकी दूर करने के नियम जानना ज़रूरी है। साथ ही यह समझना भी महत्वपूर्ण है कि किस स्थिति में कौन-सा तरीका आवश्यक है। केवल संदेह के कारण अनावश्यक चिंता करने के बजाय भरोसेमंद मार्गदर्शन सीखें।",

            purityRulesWhenTitle:
                "किस स्थिति में क्या आवश्यक है?",

            purityRulesWhen: [
                "वुज़ू टूट जाने पर आम तौर पर नमाज़ से पहले नया वुज़ू करना होता है।",
                "जब ग़ुस्ल फ़र्ज़ हो जाए, तो केवल वुज़ू पर्याप्त नहीं; आवश्यक ग़ुस्ल करना होता है।",
                "पानी उपलब्ध न हो या उसका उपयोग हानिकारक हो, तो निश्चित शर्तों के साथ तयम्मुम लागू हो सकता है।",
                "शरीर, कपड़ों या नमाज़ की जगह पर निश्चित नापाकी हो, तो उसे उचित तरीके से दूर करना चाहिए।"
            ],

            purityRulesDoubtTitle:
                "संदेह होने पर क्या करें?",

            purityRulesDoubts: [
                "केवल संदेह को निश्चित नापाकी न मानें।",
                "बार-बार जाँच करके अनावश्यक चिंता न बढ़ाएँ।",
                "यदि एक ही तरह के संदेह बार-बार हों, तो अपनी स्थिति के अनुसार भरोसेमंद विद्वान से सलाह लें।"
            ],

            purityRulesNoteTitle:
                "याद रखें",

            purityRulesNote:
                "पवित्रता के कुछ नियम परिस्थितियों और फ़िक़्ही मत के अनुसार अलग हो सकते हैं। यह शैक्षिक सारांश है, पूर्ण फ़तवा नहीं। निजी स्थिति के लिए भरोसेमंद विद्वान से सलाह लें।",


            /* RECAP */

            recapKicker:
                "याद रखने योग्य",

            recapTitle:
                "संक्षिप्त दोहराव",

            recapList: [
                "नमाज़ से पहले आवश्यक पवित्रता प्राप्त करें।",
                "वुज़ू, ग़ुस्ल और तयम्मुम के नियम अलग-अलग सीखें।",
                "शरीर, कपड़े और नमाज़ की जगह साफ़ रखें।",
                "केवल संदेह के कारण अनावश्यक चिंता करने के बजाय भरोसेमंद मार्गदर्शन सीखें।",
                "जिस बात में यक़ीन न हो, भरोसेमंद विद्वान से पूछें।"
            ],

            disclaimer:
                "शैक्षिक सारांश: विस्तृत धार्मिक नियमों और व्यक्तिगत परिस्थितियों के लिए योग्य, भरोसेमंद विद्वान से सलाह लें।",

            footerText:
                "IBADAT • ज्ञान सीखें, ईमानदारी से अमल करें"

        }

    };


    /* =========================================
       3. DOM HELPERS
       ========================================= */

    function setText(id, value) {

        const element = document.getElementById(id);

        if (
            element &&
            typeof value === "string"
        ) {
            element.textContent = value;
        }

    }


    function setList(id, values) {

        const element = document.getElementById(id);

        if (
            !element ||
            !Array.isArray(values)
        ) {
            return;
        }

        const fragment = document.createDocumentFragment();

        values.forEach(function (value) {

            const item = document.createElement("li");

            item.textContent = value;

            fragment.appendChild(item);

        });

        element.replaceChildren(fragment);

    }


    /* =========================================
       4. APPLY PAGE LANGUAGE
       ========================================= */

    function applyLanguage(language) {

        const lang = SUPPORTED_LANGUAGES.includes(language)
            ? language
            : "bn";

        const data = translations[lang];

        document.documentElement.lang = lang;

           /* UPDATE LESSON NUMBERS BY LANGUAGE */
       
    const lessonNumbers = {
      bn: ["১", "২", "৩", "৪", "৫"],
      en: ["1", "2", "3", "4", "5"],
      hi: ["१", "२", "३", "४", "५"]
    };

    const numbers = lessonNumbers[lang] || lessonNumbers.bn;

    document.querySelectorAll(
      ".lesson .section-title > b"
    ).forEach(function (badge, index) {
      if (index < numbers.length) {
        badge.textContent = numbers[index];
      }
    });

        /* PAGE HEADER */

        setText(
            "page-title",
            data.pageTitle
        );

        setText(
            "intro-text",
            data.pageIntro
        );

        setText(
            "page-subtitle",
            data.pageSubtitle
        );


        /* CONTENTS */

        setText(
            "contents-title",
            data.contentsTitle
        );


        const contentsElement =
            document.getElementById("contents-links");

        if (contentsElement) {

            const sectionIds = [
                "wudu",
                "ghusl",
                "tayammum",
                "cleanliness",
                "purity-rules"
            ];

            const fragment = document.createDocumentFragment();

            data.contents.forEach(function (label, index) {

                const link = document.createElement("a");

                link.href = "#" + sectionIds[index];

                link.textContent = label;

                fragment.appendChild(link);

            });

            contentsElement.replaceChildren(fragment);

        }


        /* WUDU */

        setText(
            "wudu-kicker",
            data.wuduKicker
        );

        setText(
            "wudu-title",
            data.wuduTitle
        );

        setText(
            "wudu-intro",
            data.wuduIntro
        );

        setText(
            "wudu-steps-title",
            data.wuduStepsTitle
        );

        setList(
            "wudu-steps",
            data.wuduSteps
        );

        setText(
            "wudu-note-title",
            data.wuduNoteTitle
        );

        setText(
            "wudu-note",
            data.wuduNote
        );

        setText(
            "wudu-break-title",
            data.wuduBreakTitle
        );

        setList(
            "wudu-breaks",
            data.wuduBreaks
        );


        /* GHUSL */

        setText(
            "ghusl-kicker",
            data.ghuslKicker
        );

        setText(
            "ghusl-title",
            data.ghuslTitle
        );

        setText(
            "ghusl-intro",
            data.ghuslIntro
        );

        setText(
            "ghusl-when-title",
            data.ghuslWhenTitle
        );

        setList(
            "ghusl-when",
            data.ghuslWhen
        );

        setText(
            "ghusl-steps-title",
            data.ghuslStepsTitle
        );

        setList(
            "ghusl-steps",
            data.ghuslSteps
        );

        setText(
            "ghusl-note-title",
            data.ghuslNoteTitle
        );

        setText(
            "ghusl-note",
            data.ghuslNote
        );


        /* TAYAMMUM */

        setText(
            "tayammum-kicker",
            data.tayammumKicker
        );

        setText(
            "tayammum-title",
            data.tayammumTitle
        );

        setText(
            "tayammum-intro",
            data.tayammumIntro
        );

        setText(
            "tayammum-when-title",
            data.tayammumWhenTitle
        );

        setList(
            "tayammum-when",
            data.tayammumWhen
        );

        setText(
            "tayammum-steps-title",
            data.tayammumStepsTitle
        );

        setList(
            "tayammum-steps",
            data.tayammumSteps
        );

        setText(
            "tayammum-note-title",
            data.tayammumNoteTitle
        );

        setText(
            "tayammum-note",
            data.tayammumNote
        );


        /* CLEANLINESS */

        setText(
            "cleanliness-kicker",
            data.cleanlinessKicker
        );

        setText(
            "cleanliness-title",
            data.cleanlinessTitle
        );

        setText(
            "cleanliness-intro",
            data.cleanlinessIntro
        );

        setText(
            "cleanliness-check-title",
            data.cleanlinessCheckTitle
        );

        setList(
            "cleanliness-checks",
            data.cleanlinessChecks
        );


        /* BASIC PURITY RULES */

        setText(
            "purity-rules-kicker",
            data.purityRulesKicker
        );

        setText(
            "purity-rules-title",
            data.purityRulesTitle
        );

        setText(
            "purity-rules-intro",
            data.purityRulesIntro
        );

        setText(
            "purity-rules-when-title",
            data.purityRulesWhenTitle
        );

        setList(
            "purity-rules-when",
            data.purityRulesWhen
        );

        setText(
            "purity-rules-doubt-title",
            data.purityRulesDoubtTitle
        );

        setList(
            "purity-rules-doubts",
            data.purityRulesDoubts
        );

        setText(
            "purity-rules-note-title",
            data.purityRulesNoteTitle
        );

        setText(
            "purity-rules-note",
            data.purityRulesNote
        );


        /* RECAP */

        setText(
            "recap-kicker",
            data.recapKicker
        );

        setText(
            "recap-title",
            data.recapTitle
        );

        setList(
            "recap-list",
            data.recapList
        );


        /* FOOTER AND DISCLAIMER */

        setText(
            "disclaimer",
            data.disclaimer
        );

        setText(
            "footer-text",
            data.footerText
        );

    }


    /* =========================================
       5. APPLY LIGHT / DARK THEME
       ========================================= */

    function applyTheme() {

        const settings = getSettings();

        const darkEnabled =
            settings.dark === true ||
            settings.dark === "true" ||
            settings.theme === "dark";

        document.body.classList.toggle(
            "dark-mode",
            darkEnabled
        );

        const themeColor = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (themeColor) {

            themeColor.setAttribute(
                "content",
                darkEnabled ? "#121A15" : "#0F5132"
            );

        }

    }


    /* =========================================
       6. REFRESH PAGE
       ========================================= */

    function refreshPurityPage() {

        const language = getCurrentLanguage();

        applyLanguage(language);

        applyTheme();

    }


    /* =========================================
       7. SETTINGS CHANGE LISTENER
       ========================================= */

    function setupSettingsListener() {

        window.addEventListener("storage", function (event) {

            if (
                event.key === SETTINGS_KEY ||
                event.key === null
            ) {
                refreshPurityPage();
            }

        });

    }


    /* =========================================
       8. INITIALIZE PAGE
       ========================================= */

    function initializePurityPage() {

        refreshPurityPage();

        setupSettingsListener();

    }


    /* =========================================
       9. PUBLIC REFRESH FUNCTION
       ========================================= */

    window.refreshPurityPage = refreshPurityPage;


    /* =========================================
       10. START
       ========================================= */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializePurityPage,
            { once: true }
        );

    } else {

        initializePurityPage();

    }

})();
