/* =========================================================
   IBADAT — NAMAZ PURITY PAGE
   File: js/namaz-purity.js

   Features:
   1. Bengali, English and Hindi translations
   2. Reads appSettings from localStorage
   3. Light and dark theme support
   4. Complete page content translation
   5. Wudu, Ghusl, Tayammum and cleanliness lessons
   6. Image error handling
   7. Accessible in-page navigation
   8. Safe fallback when settings are unavailable
   ========================================================= */

"use strict";

(() => {
    const SETTINGS_KEY = "appSettings";
    const SUPPORTED_LANGUAGES = ["bn", "en", "hi"];

    const $ = (selector, root = document) =>
        root.querySelector(selector);

    const $$ = (selector, root = document) =>
        Array.from(root.querySelectorAll(selector));

    /* =====================================================
       1. TRANSLATION DATA
       ===================================================== */

    const translations = {
        bn: {
            documentTitle: "পবিত্রতা | IBADAT",
            pageDescription:
                "ওযু, গোসল, তায়াম্মুম ও পরিচ্ছন্নতার সহজ নির্দেশিকা।",
            eyebrow: "IBADAT • নামাজ শিক্ষা",
            pageTitle: "পবিত্রতা",

            hero: [
                "পবিত্রতা ইসলামে ইবাদতের জন্য প্রস্তুতির গুরুত্বপূর্ণ অংশ।",
                "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা জরুরি।",
                "ওযু, গোসল ও তায়াম্মুমের মাধ্যমে পবিত্রতা অর্জনের নিয়ম শিখে নাও।",
                "সঠিক নিয়ম মেনে চলো, পবিত্র জীবন গড়ে তোলো।"
            ],

            purityRulesKicker: "প্রথম পাঠ",
            purityRulesTitle: "পবিত্রতার নিয়ম",
            purityRulesIntro:
                "নামাজের আগে প্রয়োজন অনুযায়ী ওযু বা গোসল করে পবিত্রতা অর্জন করতে হয়। শরীর, পোশাক ও নামাজের স্থান নাপাকি থেকে পরিষ্কার রাখতে হবে। পানি ব্যবহার করা সম্ভব না হলে এবং প্রযোজ্য শর্ত পূরণ হলে তায়াম্মুমের বিধান প্রযোজ্য হতে পারে।",

            wuduKicker: "দ্বিতীয় পাঠ",
            wuduTitle: "ওযু",
            wuduIntro:
                "ওযু হলো নির্দিষ্ট অঙ্গ ধোয়া এবং মাথা ও কান মাসেহ করার মাধ্যমে নামাজের জন্য প্রয়োজনীয় পবিত্রতা অর্জনের পদ্ধতি। নামাজের আগে ওযু প্রয়োজন হলে তা সঠিকভাবে সম্পন্ন করো।",
            wuduNiyyahTitle: "ওযুর নিয়ত",
            wuduNiyyah:
                "মনে মনে পবিত্রতা অর্জন করে আল্লাহর সন্তুষ্টির জন্য ওযু করার ইচ্ছা করো। মুখে নির্দিষ্ট বাক্য বলা আবশ্যক—এমন মনে করার প্রয়োজন নেই।",

            wuduSteps: [
                {
                    title: "১. দুই হাত ধোয়া",
                    text:
                        "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নাও। সাধারণভাবে তিনবার ধোয়া সুন্নত। আঙুলের ফাঁকেও পানি পৌঁছাও।",
                    alt: "দুই হাত ধোয়া"
                },
                {
                    title: "২. কুলি করা",
                    text:
                        "পানি নিয়ে মুখে ঘুরিয়ে কুলি করো। সাধারণভাবে তিনবার করা সুন্নত। রোজা থাকলে পানি গলায় চলে যাওয়া থেকে সতর্ক থাকো।",
                    alt: "কুলি করা"
                },
                {
                    title: "৩. নাক পরিষ্কার করা",
                    text:
                        "নাকে আলতোভাবে পানি নিয়ে পরিষ্কার করো এবং পানি বের করে দাও। সাধারণভাবে তিনবার করা সুন্নত; রোজা থাকলে অতিরিক্ত গভীরে পানি টেনে নিও না।",
                    alt: "নাক পরিষ্কার করা"
                },
                {
                    title: "৪. মুখ ধোয়া",
                    text:
                        "কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং এক কানের পাশ থেকে অন্য কানের পাশ পর্যন্ত পুরো মুখ ধোও। সাধারণভাবে তিনবার ধোয়া সুন্নত।",
                    alt: "মুখ ধোয়া"
                },
                {
                    title: "৫. দুই হাত কনুইসহ ধোয়া",
                    text:
                        "প্রথমে ডান হাত, তারপর বাঁ হাত আঙুলের ডগা থেকে কনুইসহ ভালোভাবে ধোও। সাধারণভাবে তিনবার ধোয়া সুন্নত।",
                    alt: "কনুইসহ হাত ধোয়া"
                },
                {
                    title: "৬. মাথা মাসেহ করা",
                    text:
                        "ভেজা হাত দিয়ে মাথা মাসেহ করো। মাসেহের নির্দিষ্ট সীমা সম্পর্কে নির্ভরযোগ্য নির্দেশনা অনুসরণ করো। সাধারণভাবে মাথা একবার মাসেহ করা হয়।",
                    alt: "মাথা মাসেহ করা"
                },
                {
                    title: "৭. কান মাসেহ করা",
                    text:
                        "ভেজা আঙুল দিয়ে কানের ভেতরের দৃশ্যমান অংশ ও বাইরের অংশ মাসেহ করো। সাধারণভাবে একবার করা হয়।",
                    alt: "কান মাসেহ করা"
                },
                {
                    title: "৮. দুই পা ধোয়া",
                    text:
                        "প্রথমে ডান, তারপর বাঁ পা টাখনুসহ ধুয়ে নাও। সাধারণভাবে তিনবার ধোয়া সুন্নত। পায়ের আঙুলের ফাঁকে পানি পৌঁছাতে খেয়াল করো।",
                    alt: "টাখনুসহ পা ধোয়া"
                }
            ],

            wuduNoteTitle: "ওযু সম্পর্কে মনে রাখবে",
            wuduNote:
                "ধোয়ার সংখ্যা, ফরজ ও সুন্নতের বিস্তারিত বিধানে কিছু ফিকহি পার্থক্য রয়েছে। এখানে সাধারণ শিক্ষামূলক পদ্ধতি দেওয়া হয়েছে; নিজের পরিস্থিতি সম্পর্কে নিশ্চিত হতে বিশ্বস্ত আলেমের পরামর্শ নাও।",

            wuduBreakTitle: "ওযু ভঙ্গের সাধারণ কারণ",
            wuduBreaks: [
                "প্রস্রাব, পায়খানা বা বায়ু নির্গত হওয়া।",
                "চেতনা হারানো বা এমন ঘুম, যাতে সচেতনতা থাকে না।",
                "কিছু অতিরিক্ত বিষয়ে বিধান ভিন্ন হতে পারে; নিশ্চিত না হলে জেনে নাও।"
            ],

            ghuslKicker: "তৃতীয় পাঠ",
            ghuslTitle: "গোসল",
            ghuslIntro:
                "গোসল হলো নির্দিষ্ট অবস্থায় বড় অপবিত্রতা থেকে পবিত্রতা অর্জনের জন্য পুরো শরীরে পানি পৌঁছে দেওয়ার পদ্ধতি। শরীরের কোনো অংশ যেন শুকনো না থাকে, সেদিকে খেয়াল রাখতে হয়।",

            ghuslStepsTitle: "গোসলের সাধারণ পদ্ধতি",
            ghuslSteps: [
                "মনে মনে পবিত্রতার নিয়ত করো।",
                "শরীরে কোনো নাপাকি থাকলে আগে তা পরিষ্কার করো।",
                "সুন্নাহসম্মত পদ্ধতিতে ওযু করো।",
                "মাথায় পানি দাও এবং চুলের গোড়াসহ পানি পৌঁছাও।",
                "শরীরের ডান ও বাঁ দিকসহ সর্বত্র পানি পৌঁছে দাও। বগল, নাভি, আঙুলের ফাঁক ও শরীরের ভাঁজে পানি পৌঁছেছে কি না খেয়াল করো।"
            ],

            ghuslWhenTitle: "কখন গোসল ফরজ হয়?",
            ghuslWhen: [
                "দাম্পত্য মিলনের পর।",
                "বীর্য নির্গমনের নির্দিষ্ট অবস্থায়।",
                "ঋতুস্রাব শেষ হলে।",
                "প্রসব-পরবর্তী রক্তস্রাব শেষ হলে।"
            ],

            ghuslNoteTitle: "গোসল সম্পর্কে গুরুত্বপূর্ণ কথা",
            ghuslNote:
                "গোসলের সময় গোপনীয়তা বজায় রাখবে এবং শরীরের কোনো অংশে পানি পৌঁছাতে বাধা দেয় এমন কিছু থাকলে তা খেয়াল করবে। গোসলের বিস্তারিত বিধান ও কিছু পরিস্থিতির ব্যাখ্যায় পার্থক্য থাকতে পারে। ব্যক্তিগত কোনো প্রশ্ন থাকলে বিশ্বস্ত আলেমের পরামর্শ নাও।",

            tayammumKicker: "চতুর্থ পাঠ",
            tayammumTitle: "তায়াম্মুম",
            tayammumIntro:
                "পানি না পাওয়া গেলে বা পানি ব্যবহার করলে অসুস্থতা বা ক্ষতির বাস্তব আশঙ্কা থাকলে নির্দিষ্ট শর্তে তায়াম্মুম করা যায়। এটি ওযু বা গোসলের বিকল্প হিসেবে কেবল অনুমোদিত পরিস্থিতিতেই প্রযোজ্য।",

            tayammumWhenTitle: "কখন তায়াম্মুম করা যায়?",
            tayammumWhen: [
                "প্রয়োজনীয় পানি খুঁজেও না পাওয়া গেলে।",
                "পানি ব্যবহার করলে ক্ষতির বাস্তব আশঙ্কা থাকলে।",
                "প্রযোজ্য অন্যান্য শর্ত পূরণ হলে।"
            ],

            tayammumSteps: [
                {
                    title: "১. নিয়ত করো",
                    text:
                        "মনে মনে পবিত্রতা অর্জন করে ইবাদতের জন্য তায়াম্মুম করার ইচ্ছা করো।",
                    alt: "তায়াম্মুমের প্রস্তুতি"
                },
                {
                    title: "২. পবিত্র মাটিজাত উপাদান ব্যবহার করো",
                    text:
                        "নির্দেশিত পদ্ধতিতে উপযুক্ত পবিত্র মাটিজাত উপাদানের ওপর হাত রাখো বা স্পর্শ করো। উপকরণের শর্ত নির্ভরযোগ্য নির্দেশনা থেকে শিখে নাও।",
                    alt: "পবিত্র মাটিজাত উপাদান ব্যবহার"
                },
                {
                    title: "৩. মুখ ও হাত মাসেহ করো",
                    text:
                        "তায়াম্মুমের নির্ধারিত নিয়ম অনুযায়ী মুখ ও হাত মাসেহ করো। মাসেহের সীমা ও ক্রম সম্পর্কে নির্ভরযোগ্য আলেমের শেখানো পদ্ধতি অনুসরণ করো।",
                    alt: "মুখ ও হাত মাসেহ করা"
                }
            ],

            tayammumNoteTitle: "মনে রাখবে",
            tayammumNote:
                "তায়াম্মুমের শর্ত পূরণ না হলে এটি করা যায় না। পানি ব্যবহার সম্ভব হয়ে গেলে পরবর্তী পবিত্রতার জন্য প্রযোজ্য নিয়ম অনুসরণ করো। বিস্তারিত বিধান জেনে নাও।",

            cleanKicker: "পঞ্চম পাঠ",
            cleanTitle: "পরিচ্ছন্নতা",
            cleanIntro:
                "পরিচ্ছন্নতা দৈনন্দিন জীবনের গুরুত্বপূর্ণ অভ্যাস। নামাজের জন্য শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা জরুরি। নাপাকি থাকলে তা উপযুক্তভাবে দূর করতে হবে।",

            cleanBodyTitle: "শরীরের পরিচ্ছন্নতা",
            cleanBody: [
                "শরীর পরিষ্কার রাখো এবং ব্যক্তিগত পরিচ্ছন্নতার যত্ন নাও।",
                "টয়লেট ব্যবহারের পর যথাযথভাবে পরিষ্কার হও।",
                "শরীরে নাপাকি লাগলে নামাজের আগে তা দূর করো।"
            ],

            cleanClothesTitle: "পোশাকের পরিচ্ছন্নতা",
            cleanClothes: [
                "নামাজের পোশাকে নাপাকি লাগলে তা পরিষ্কার করো বা পোশাক বদলাও।",
                "নাপাকি কোথায় লেগেছে জানা থাকলে সেই অংশ ভালোভাবে ধুয়ে নাও।"
            ],

            cleanPlaceTitle: "নামাজের স্থানের পরিচ্ছন্নতা",
            cleanPlace: [
                "যেখানে নামাজ পড়বে, সেই স্থান পবিত্র রাখো।",
                "নাপাকি পড়লে তা যথাযথভাবে দূর করো।",
                "শুধু অকারণ সন্দেহের কারণে নিজেকে বারবার কষ্টে ফেলো না; নির্ভরযোগ্য বিধান শিখে নাও।"
            ],

            guidanceKicker: "শেষ পাঠ",
            guidanceTitle: "জরুরি নির্দেশনা",
            guidanceItems: [
                {
                    title: "ওযু ভেঙে গেলে",
                    text:
                        "নামাজের আগে ওযু ভেঙে গেছে নিশ্চিত হলে নতুন করে ওযু করো। শুধু সন্দেহ হলে বারবার ওযু করার আগে নির্ভরযোগ্য বিধান জেনে নাও।"
                },
                {
                    title: "শরীর বা পোশাকে নাপাকি লাগলে",
                    text:
                        "নাপাকি লাগার বিষয়টি নিশ্চিত হলে নামাজের আগে তা উপযুক্তভাবে পরিষ্কার করো। কোথায় লেগেছে জানা থাকলে সেই অংশ পরিষ্কার করো।"
                },
                {
                    title: "গোসল ফরজ হলে",
                    text:
                        "যে অবস্থায় গোসল ফরজ হয়, সে অবস্থায় শুধু ওযু যথেষ্ট নয়। নামাজের আগে প্রযোজ্য নিয়মে গোসল করে পবিত্রতা অর্জন করো।"
                },
                {
                    title: "পানি না পেলে বা পানি ব্যবহার ক্ষতিকর হলে",
                    text:
                        "প্রযোজ্য শর্ত পূরণ হলে তায়াম্মুম করা যায়। নির্ভরযোগ্য নির্দেশনা অনুসরণ করো।"
                },
                {
                    title: "কোনো বিধান নিশ্চিত না হলে",
                    text:
                        "অনুমান করে সিদ্ধান্ত না নিয়ে বিশ্বস্ত আলেমের কাছে জেনে নাও। এই পেজটি প্রাথমিক শিক্ষার জন্য, ব্যক্তিগত ফতোয়ার বিকল্প নয়।"
                }
            ],

            footer:
                "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
        },

        en: {
            documentTitle: "Purification | IBADAT",
            pageDescription:
                "A simple guide to wudu, ghusl, tayammum and cleanliness.",
            eyebrow: "IBADAT • PRAYER LEARNING",
            pageTitle: "Purification",

            hero: [
                "Purification is an important part of preparing for worship in Islam.",
                "The body, clothing and place of prayer should be kept pure.",
                "Learn how to attain purification through wudu, ghusl and tayammum.",
                "Follow reliable guidance and build clean, mindful habits."
            ],

            purityRulesKicker: "LESSON 1",
            purityRulesTitle: "Rules of Purification",
            purityRulesIntro:
                "Before prayer, perform wudu or ghusl as required. Keep the body, clothing and prayer place free from impurity. If water is unavailable or its use is harmful, tayammum may apply when its conditions are met.",

            wuduKicker: "LESSON 2",
            wuduTitle: "Wudu",
            wuduIntro:
                "Wudu is a form of ritual purification for prayer that involves washing specific body parts and wiping designated areas. Perform it correctly whenever it is required before prayer.",
            wuduNiyyahTitle: "Intention for Wudu",
            wuduNiyyah:
                "Intend in your heart to perform wudu for the sake of Allah. You do not need to assume that a particular spoken formula is required.",

            wuduSteps: [
                {
                    title: "1. Wash both hands",
                    text:
                        "Wash both hands thoroughly up to the wrists. Washing three times is generally recommended. Make sure water reaches between the fingers.",
                    alt: "Washing both hands"
                },
                {
                    title: "2. Rinse the mouth",
                    text:
                        "Take water into the mouth and rinse it. Repeating this three times is generally recommended. While fasting, take care not to let water reach the throat.",
                    alt: "Rinsing the mouth"
                },
                {
                    title: "3. Clean the nose",
                    text:
                        "Gently take water into the nose and expel it. Repeating this three times is generally recommended. While fasting, avoid drawing water too deeply.",
                    alt: "Cleaning the nose"
                },
                {
                    title: "4. Wash the face",
                    text:
                        "Wash the whole face from the hairline to below the chin and from one side of the face to the other. Washing three times is generally recommended.",
                    alt: "Washing the face"
                },
                {
                    title: "5. Wash both arms",
                    text:
                        "Wash the right arm first, then the left, including the elbows. Ensure water reaches all areas. Washing three times is generally recommended.",
                    alt: "Washing arms including the elbows"
                },
                {
                    title: "6. Wipe the head",
                    text:
                        "Wipe the head with wet hands. Follow reliable guidance for the required extent of wiping. The head is generally wiped once.",
                    alt: "Wiping the head"
                },
                {
                    title: "7. Wipe the ears",
                    text:
                        "Use wet fingers to wipe the visible inner and outer parts of the ears. This is generally done once.",
                    alt: "Wiping the ears"
                },
                {
                    title: "8. Wash both feet",
                    text:
                        "Wash the right foot first, then the left, including the ankles. Washing three times is generally recommended. Ensure water reaches between the toes.",
                    alt: "Washing feet including the ankles"
                }
            ],

            wuduNoteTitle: "Remember about Wudu",
            wuduNote:
                "Some details about the required acts, recommended acts and number of washes differ among scholars. This is a general educational guide. Consult a trusted scholar for guidance on your circumstances.",

            wuduBreakTitle: "Common causes that invalidate Wudu",
            wuduBreaks: [
                "Passing urine, stool or wind.",
                "Losing consciousness or sleeping in a way that removes awareness.",
                "Additional details may differ. Ask a reliable scholar if you are unsure."
            ],

            ghuslKicker: "LESSON 3",
            ghuslTitle: "Ghusl",
            ghuslIntro:
                "Ghusl is a prescribed full-body washing required in certain circumstances to attain ritual purity. Ensure that water reaches every part of the body and that no area remains dry.",

            ghuslStepsTitle: "General Method of Ghusl",
            ghuslSteps: [
                "Make the intention for purification in your heart.",
                "Remove any impurity from the body first.",
                "Perform wudu according to the recommended method.",
                "Pour water over the head and ensure it reaches the roots of the hair.",
                "Ensure water reaches the entire body, including both sides, the armpits, navel, spaces between fingers and toes, and skin folds."
            ],

            ghuslWhenTitle: "When is Ghusl Obligatory?",
            ghuslWhen: [
                "After marital intercourse.",
                "In certain circumstances involving ejaculation.",
                "When menstruation ends.",
                "When postnatal bleeding ends."
            ],

            ghuslNoteTitle: "Important about Ghusl",
            ghuslNote:
                "Maintain privacy and check that nothing prevents water from reaching the body. Detailed rulings can differ in certain circumstances. Consult a trusted scholar for personal questions.",

            tayammumKicker: "LESSON 4",
            tayammumTitle: "Tayammum",
            tayammumIntro:
                "Tayammum may be permitted under specific conditions when water cannot be found or using it presents a genuine risk of harm. It replaces wudu or ghusl only in circumstances where it is permitted.",

            tayammumWhenTitle: "When may Tayammum be used?",
            tayammumWhen: [
                "When the required water cannot be found after a reasonable search.",
                "When using water presents a genuine risk of harm.",
                "When the other applicable conditions are met."
            ],

            tayammumSteps: [
                {
                    title: "1. Make the intention",
                    text:
                        "Intend in your heart to perform tayammum to attain purification for worship.",
                    alt: "Preparing for tayammum"
                },
                {
                    title: "2. Use an eligible clean earth-derived material",
                    text:
                        "Touch or place your hands on an eligible clean earth-derived material according to the prescribed method. Learn the material requirements from reliable guidance.",
                    alt: "Using an eligible earth-derived material"
                },
                {
                    title: "3. Wipe the face and hands",
                    text:
                        "Wipe the face and hands according to the prescribed method. Follow reliable guidance for the extent and order of wiping.",
                    alt: "Wiping the face and hands"
                }
            ],

            tayammumNoteTitle: "Remember",
            tayammumNote:
                "Tayammum is only valid when its conditions are met. When water becomes available and can be used, follow the applicable purification rules. Learn the detailed rulings from a trusted source.",

            cleanKicker: "LESSON 5",
            cleanTitle: "Cleanliness",
            cleanIntro:
                "Cleanliness is an important daily habit. Before prayer, keep the body, clothing and prayer place pure. Remove impurity appropriately when it is present.",

            cleanBodyTitle: "Personal Cleanliness",
            cleanBody: [
                "Keep your body clean and take care of personal hygiene.",
                "Clean yourself appropriately after using the toilet.",
                "Remove any impurity from the body before prayer."
            ],

            cleanClothesTitle: "Clean Clothing",
            cleanClothes: [
                "If impurity gets on prayer clothing, clean it or change the clothing.",
                "If you know where the impurity is, wash that area thoroughly."
            ],

            cleanPlaceTitle: "Clean Prayer Space",
            cleanPlace: [
                "Keep the place where you pray pure.",
                "Remove impurity appropriately if it is present.",
                "Do not distress yourself with repeated unfounded doubts. Learn the reliable ruling."
            ],

            guidanceKicker: "FINAL LESSON",
            guidanceTitle: "Important Guidance",
            guidanceItems: [
                {
                    title: "If Wudu is invalidated",
                    text:
                        "If you are certain that your wudu has been invalidated before prayer, perform it again. If you only have a doubt, learn the reliable ruling before repeatedly repeating wudu."
                },
                {
                    title: "If impurity gets on your body or clothing",
                    text:
                        "If you are certain that impurity is present, remove it appropriately before prayer. If you know the affected area, clean that area."
                },
                {
                    title: "When Ghusl is obligatory",
                    text:
                        "When ghusl is obligatory, wudu alone is not sufficient. Perform ghusl according to the applicable rules before prayer."
                },
                {
                    title: "When water is unavailable or harmful",
                    text:
                        "Tayammum may be permitted if the applicable conditions are met. Follow reliable guidance."
                },
                {
                    title: "When you are unsure about a ruling",
                    text:
                        "Do not decide by guesswork. Ask a trusted scholar. This page is for basic learning and is not a substitute for a personal religious ruling."
                }
            ],

            footer:
                "Preserve purity and find peace in worship."
        },

        hi: {
            documentTitle: "पवित्रता | IBADAT",
            pageDescription:
                "वुज़ू, ग़ुस्ल, तयम्मुम और स्वच्छता की सरल जानकारी।",
            eyebrow: "IBADAT • नमाज़ की शिक्षा",
            pageTitle: "पवित्रता",

            hero: [
                "इस्लाम में इबादत की तैयारी के लिए पवित्रता महत्वपूर्ण है।",
                "शरीर, कपड़ों और नमाज़ की जगह को पवित्र रखना ज़रूरी है।",
                "वुज़ू, ग़ुस्ल और तयम्मुम के ज़रिए पवित्रता के नियम सीखें।",
                "सही मार्गदर्शन अपनाएँ और स्वच्छ आदतें बनाएँ।"
            ],

            purityRulesKicker: "पहला पाठ",
            purityRulesTitle: "पवित्रता के नियम",
            purityRulesIntro:
                "नमाज़ से पहले आवश्यकता के अनुसार वुज़ू या ग़ुस्ल करके पवित्रता प्राप्त करें। शरीर, कपड़ों और नमाज़ की जगह को नापाकी से साफ़ रखें। पानी उपलब्ध न हो या उसका उपयोग हानिकारक हो, तो शर्तें पूरी होने पर तयम्मुम लागू हो सकता है।",

            wuduKicker: "दूसरा पाठ",
            wuduTitle: "वुज़ू",
            wuduIntro:
                "वुज़ू नमाज़ के लिए आवश्यक धार्मिक पवित्रता प्राप्त करने का तरीका है, जिसमें कुछ अंग धोए जाते हैं और निर्धारित हिस्सों का मसह किया जाता है। नमाज़ से पहले आवश्यकता होने पर सही तरीके से वुज़ू करें।",
            wuduNiyyahTitle: "वुज़ू की नीयत",
            wuduNiyyah:
                "दिल में अल्लाह की प्रसन्नता के लिए वुज़ू करने की नीयत करें। किसी विशेष वाक्य को ज़ुबान से कहना अनिवार्य है, ऐसा मानना ज़रूरी नहीं।",

            wuduSteps: [
                {
                    title: "1. दोनों हाथ धोएँ",
                    text:
                        "दोनों हाथ कलाइयों तक अच्छी तरह धोएँ। आम तौर पर तीन बार धोना अनुशंसित है। उँगलियों के बीच भी पानी पहुँचाएँ।",
                    alt: "दोनों हाथ धोना"
                },
                {
                    title: "2. कुल्ली करें",
                    text:
                        "पानी लेकर मुँह में घुमाकर कुल्ली करें। आम तौर पर तीन बार करना अनुशंसित है। रोज़ा होने पर पानी गले में जाने से बचें।",
                    alt: "कुल्ली करना"
                },
                {
                    title: "3. नाक साफ़ करें",
                    text:
                        "नाक में हल्के से पानी लेकर साफ़ करें और पानी बाहर निकाल दें। आम तौर पर तीन बार करना अनुशंसित है। रोज़े में पानी बहुत अंदर न खींचें।",
                    alt: "नाक साफ़ करना"
                },
                {
                    title: "4. चेहरा धोएँ",
                    text:
                        "बालों की सीमा से ठुड्डी के नीचे तक और चेहरे के एक किनारे से दूसरे किनारे तक पूरा चेहरा धोएँ। आम तौर पर तीन बार धोना अनुशंसित है।",
                    alt: "चेहरा धोना"
                },
                {
                    title: "5. दोनों बाज़ू कोहनी सहित धोएँ",
                    text:
                        "पहले दायाँ और फिर बायाँ बाज़ू उँगलियों से कोहनी सहित अच्छी तरह धोएँ। आम तौर पर तीन बार धोना अनुशंसित है।",
                    alt: "कोहनी सहित बाज़ू धोना"
                },
                {
                    title: "6. सिर का मसह करें",
                    text:
                        "गीले हाथों से सिर का मसह करें। मसह की सीमा के लिए भरोसेमंद मार्गदर्शन अपनाएँ। आम तौर पर सिर का मसह एक बार किया जाता है।",
                    alt: "सिर का मसह करना"
                },
                {
                    title: "7. कानों का मसह करें",
                    text:
                        "गीली उँगलियों से कानों के दिखाई देने वाले अंदरूनी और बाहरी हिस्सों का मसह करें। आम तौर पर एक बार किया जाता है।",
                    alt: "कानों का मसह करना"
                },
                {
                    title: "8. दोनों पैर धोएँ",
                    text:
                        "पहले दायाँ और फिर बायाँ पैर टखनों सहित धोएँ। आम तौर पर तीन बार धोना अनुशंसित है। उँगलियों के बीच पानी पहुँचाएँ।",
                    alt: "टखनों सहित पैर धोना"
                }
            ],

            wuduNoteTitle: "वुज़ू के बारे में याद रखें",
            wuduNote:
                "फ़र्ज़, सुन्नत और धोने की संख्या के कुछ विवरणों में विद्वानों के बीच अंतर हो सकता है। यह सामान्य शैक्षिक जानकारी है। अपनी परिस्थिति के लिए भरोसेमंद विद्वान से सलाह लें।",

            wuduBreakTitle: "वुज़ू टूटने के सामान्य कारण",
            wuduBreaks: [
                "पेशाब, मल या हवा निकलना।",
                "होश खोना या ऐसा सोना जिसमें जागरूकता न रहे।",
                "कुछ अतिरिक्त मामलों में नियम अलग हो सकते हैं; संदेह हो तो पूछें।"
            ],

            ghuslKicker: "तीसरा पाठ",
            ghuslTitle: "ग़ुस्ल",
            ghuslIntro:
                "ग़ुस्ल कुछ परिस्थितियों में धार्मिक पवित्रता प्राप्त करने के लिए पूरे शरीर पर पानी पहुँचाने की विधि है। ध्यान रखें कि शरीर का कोई हिस्सा सूखा न रह जाए।",

            ghuslStepsTitle: "ग़ुस्ल की सामान्य विधि",
            ghuslSteps: [
                "दिल में पवित्रता की नीयत करें।",
                "शरीर पर कोई नापाकी हो तो पहले उसे साफ़ करें।",
                "अनुशंसित तरीके से वुज़ू करें।",
                "सिर पर पानी डालें और बालों की जड़ों तक पानी पहुँचाएँ।",
                "शरीर के दाएँ-बाएँ हिस्सों सहित हर जगह पानी पहुँचाएँ। बगल, नाभि, उँगलियों के बीच और त्वचा की सिलवटों पर ध्यान दें।"
            ],

            ghuslWhenTitle: "ग़ुस्ल कब फ़र्ज़ होता है?",
            ghuslWhen: [
                "वैवाहिक संभोग के बाद।",
                "वीर्य निकलने की कुछ परिस्थितियों में।",
                "मासिक धर्म समाप्त होने पर।",
                "प्रसव के बाद होने वाला रक्तस्राव समाप्त होने पर।"
            ],

            ghuslNoteTitle: "ग़ुस्ल के बारे में महत्वपूर्ण बात",
            ghuslNote:
                "ग़ुस्ल करते समय निजता बनाए रखें और ध्यान दें कि पानी शरीर तक पहुँचने में कोई रुकावट न हो। कुछ परिस्थितियों के विस्तृत नियम अलग हो सकते हैं। व्यक्तिगत प्रश्नों के लिए भरोसेमंद विद्वान से सलाह लें।",

            tayammumKicker: "चौथा पाठ",
            tayammumTitle: "तयम्मुम",
            tayammumIntro:
                "पानी उपलब्ध न होने या उसके उपयोग से वास्तविक नुकसान की आशंका होने पर कुछ शर्तों के तहत तयम्मुम किया जा सकता है। यह वुज़ू या ग़ुस्ल का विकल्प केवल अनुमत परिस्थितियों में है।",

            tayammumWhenTitle: "तयम्मुम कब किया जा सकता है?",
            tayammumWhen: [
                "उचित प्रयास के बाद भी आवश्यक पानी न मिलने पर।",
                "पानी का उपयोग करने से वास्तविक नुकसान की आशंका होने पर।",
                "जब अन्य लागू शर्तें पूरी हों।"
            ],

            tayammumSteps: [
                {
                    title: "1. नीयत करें",
                    text:
                        "इबादत के लिए पवित्रता प्राप्त करने हेतु दिल में तयम्मुम की नीयत करें।",
                    alt: "तयम्मुम की तैयारी"
                },
                {
                    title: "2. उपयुक्त साफ़ मिट्टी-आधारित सामग्री लें",
                    text:
                        "निर्धारित तरीके से उपयुक्त साफ़ मिट्टी-आधारित सामग्री को हाथ से छुएँ। सामग्री की शर्तें भरोसेमंद मार्गदर्शन से सीखें।",
                    alt: "मिट्टी-आधारित सामग्री का उपयोग"
                },
                {
                    title: "3. चेहरे और हाथों का मसह करें",
                    text:
                        "निर्धारित तरीके से चेहरे और हाथों का मसह करें। मसह की सीमा और क्रम के लिए भरोसेमंद मार्गदर्शन अपनाएँ।",
                    alt: "चेहरे और हाथों का मसह"
                }
            ],

            tayammumNoteTitle: "याद रखें",
            tayammumNote:
                "शर्तें पूरी हुए बिना तयम्मुम नहीं किया जा सकता। पानी उपलब्ध हो जाए और उसका उपयोग संभव हो, तो लागू पवित्रता के नियम अपनाएँ। विस्तृत नियम भरोसेमंद स्रोत से सीखें।",

            cleanKicker: "पाँचवाँ पाठ",
            cleanTitle: "स्वच्छता",
            cleanIntro:
                "स्वच्छता रोज़मर्रा की ज़िंदगी की महत्वपूर्ण आदत है। नमाज़ के लिए शरीर, कपड़े और नमाज़ की जगह को पवित्र रखें। नापाकी हो तो उसे उचित तरीके से दूर करें।",

            cleanBodyTitle: "शरीर की स्वच्छता",
            cleanBody: [
                "शरीर साफ़ रखें और व्यक्तिगत स्वच्छता का ध्यान रखें।",
                "शौचालय के उपयोग के बाद उचित तरीके से सफ़ाई करें।",
                "शरीर पर नापाकी लग जाए तो नमाज़ से पहले उसे दूर करें।"
            ],

            cleanClothesTitle: "कपड़ों की स्वच्छता",
            cleanClothes: [
                "नमाज़ के कपड़ों पर नापाकी लगे तो उसे साफ़ करें या कपड़े बदलें।",
                "नापाकी की जगह पता हो तो उस हिस्से को अच्छी तरह धोएँ।"
            ],

            cleanPlaceTitle: "नमाज़ की जगह की स्वच्छता",
            cleanPlace: [
                "जहाँ नमाज़ पढ़ें, उस जगह को पवित्र रखें।",
                "नापाकी मौजूद हो तो उसे उचित तरीके से दूर करें।",
                "बिना आधार के बार-बार संदेह करके स्वयं को परेशान न करें; भरोसेमंद नियम सीखें।"
            ],

            guidanceKicker: "अंतिम पाठ",
            guidanceTitle: "ज़रूरी निर्देश",
            guidanceItems: [
                {
                    title: "वुज़ू टूट जाए तो",
                    text:
                        "यदि नमाज़ से पहले निश्चित हो कि वुज़ू टूट गया है, तो दोबारा वुज़ू करें। केवल संदेह होने पर बार-बार वुज़ू करने से पहले भरोसेमंद नियम जानें।"
                },
                {
                    title: "शरीर या कपड़ों पर नापाकी लगे तो",
                    text:
                        "नापाकी निश्चित हो तो नमाज़ से पहले उसे उचित तरीके से साफ़ करें। जगह पता हो तो उसी हिस्से को साफ़ करें।"
                },
                {
                    title: "ग़ुस्ल फ़र्ज़ हो तो",
                    text:
                        "जब ग़ुस्ल फ़र्ज़ हो, तो केवल वुज़ू पर्याप्त नहीं है। नमाज़ से पहले लागू नियमों के अनुसार ग़ुस्ल करें।"
                },
                {
                    title: "पानी न मिले या उसका उपयोग हानिकारक हो तो",
                    text:
                        "शर्तें पूरी होने पर तयम्मुम किया जा सकता है। भरोसेमंद मार्गदर्शन अपनाएँ।"
                },
                {
                    title: "किसी नियम को लेकर संदेह हो तो",
                    text:
                        "अनुमान से निर्णय न लें। भरोसेमंद विद्वान से पूछें। यह पेज बुनियादी शिक्षा के लिए है, व्यक्तिगत धार्मिक फ़ैसले का विकल्प नहीं।"
                }
            ],

            footer:
                "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।"
        }
    };

    /* =====================================================
       2. SETTINGS HELPERS
       ===================================================== */

    function readSettings() {
        try {
            const raw = localStorage.getItem(SETTINGS_KEY);

            if (!raw) {
                return {};
            }

            const parsed = JSON.parse(raw);

            return parsed && typeof parsed === "object"
                ? parsed
                : {};
        } catch (error) {
            console.warn(
                "IBADAT: Unable to read app settings.",
                error
            );

            return {};
        }
    }

    function getActiveLanguage(settings = readSettings()) {
        return SUPPORTED_LANGUAGES.includes(settings.lang)
            ? settings.lang
            : "bn";
    }

    function getActiveTheme(settings = readSettings()) {
        const dark = settings.dark;

        return dark === true || dark === "true"
            ? "dark"
            : "light";
    }

    /* =====================================================
       3. DARK THEME STYLES
       The supplied CSS does not need to contain these rules.
       ===================================================== */

    function installThemeStyles() {
        if ($("#purity-js-theme-styles")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "purity-js-theme-styles";

        style.textContent = `
            body.dark-mode {
                color: #E7F0E4;
                background-color: #121A15;
                background-image:
                    linear-gradient(
                        rgba(12, 24, 18, 0.86),
                        rgba(12, 24, 18, 0.86)
                    ),
                    url("../assets/bg_pattern.png");
            }

            body.dark-mode .purity-hero,
            body.dark-mode .hero,
            body.dark-mode .panel.lesson {
                color: #E7F0E4;
                background-color: #1E2A22;
                border-color: rgba(212, 175, 55, 0.48);
            }

            body.dark-mode .purity-hero::before,
            body.dark-mode .hero::before {
                background: rgba(20, 34, 25, 0.78);
            }

            body.dark-mode .hero h1,
            body.dark-mode .purity-hero h1,
            body.dark-mode .hero-eyebrow,
            body.dark-mode .eyebrow,
            body.dark-mode .section-title h2,
            body.dark-mode .section-copy h3,
            body.dark-mode .step-copy h3,
            body.dark-mode .step-copy h4,
            body.dark-mode .kicker {
                color: #E7D18A;
            }

            body.dark-mode .hero-description,
            body.dark-mode .hero-description p,
            body.dark-mode .section-copy,
            body.dark-mode .section-copy p,
            body.dark-mode .section-copy li,
            body.dark-mode .lead,
            body.dark-mode .step-copy p,
            body.dark-mode .step-copy,
            body.dark-mode .panel.lesson p,
            body.dark-mode .panel.lesson li {
                color: #E7F0E4;
            }

            body.dark-mode .main-illustration,
            body.dark-mode .lesson-art,
            body.dark-mode .step-card {
                background: #263B29;
                border-color: rgba(190, 228, 183, 0.22);
            }

            body.dark-mode .note {
                color: #F1E8C8;
                background: #302F20;
                border-color: rgba(212, 175, 55, 0.4);
            }

            body.dark-mode .note p,
            body.dark-mode .note h3 {
                color: #F1E8C8;
            }

            body.dark-mode .purity-footer {
                color: #F3E4B0;
                background: #1E3828;
                border-color: rgba(212, 175, 55, 0.55);
            }

            body.dark-mode a {
                color: #E7D18A;
            }

            body.dark-mode a:focus-visible,
            body.dark-mode button:focus-visible {
                outline-color: #E7D18A;
            }

            .image-unavailable {
                min-height: 24px;
            }

            img[hidden] {
                display: none !important;
            }

            @media (prefers-reduced-motion: reduce) {
                html {
                    scroll-behavior: auto !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function applyTheme(settings = readSettings()) {
        const theme = getActiveTheme(settings);

        document.body.classList.toggle(
            "dark-mode",
            theme === "dark"
        );

        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;

        const themeColor = $('meta[name="theme-color"]');

        if (themeColor) {
            themeColor.setAttribute(
                "content",
                theme === "dark" ? "#121A15" : "#0B3D26"
            );
        }
    }

    /* =====================================================
       4. SAFE TEXT AND LIST HELPERS
       ===================================================== */

    function setText(id, value) {
        const element = document.getElementById(id);

        if (!element || typeof value !== "string") {
            return;
        }

        element.textContent = value;
    }

    function setList(id, values, tagName = "li") {
        const container = document.getElementById(id);

        if (!container || !Array.isArray(values)) {
            return;
        }

        const fragment = document.createDocumentFragment();

        values.forEach((value) => {
            const item = document.createElement(tagName);

            item.textContent =
                typeof value === "string" ? value : "";

            fragment.appendChild(item);
        });

        container.replaceChildren(fragment);
    }

    function setParagraphs(containerId, paragraphs) {
        const container = document.getElementById(containerId);

        if (!container || !Array.isArray(paragraphs)) {
            return;
        }

        const fragment = document.createDocumentFragment();

        paragraphs.forEach((text) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = text;
            fragment.appendChild(paragraph);
        });

        container.replaceChildren(fragment);
    }

    /* =====================================================
       5. HERO AND BASIC RULES
       ===================================================== */

    function renderHero(data) {
        setText("eyebrow", data.eyebrow);
        setText("pageTitle", data.pageTitle);

        setParagraphs("heroDescription", data.hero);

        setText("purityRulesTitle", data.purityRulesTitle);
        setText("purityRulesIntro", data.purityRulesIntro);

        const kicker = $("#purityRules .kicker");

        if (kicker) {
            kicker.textContent = data.purityRulesKicker;
        }
    }

    /* =====================================================
       6. WUDU SECTION
       ===================================================== */

    function renderWudu(data) {
        setText("wuduKicker", data.wuduKicker);
        setText("wuduTitle", data.wuduTitle);
        setText("wuduIntro", data.wuduIntro);
        setText("wuduNiyyahTitle", data.wuduNiyyahTitle);
        setText("wuduNiyyah", data.wuduNiyyah);

        const stepContainer = $("#wuduStepList");

        if (stepContainer) {
            const cards = $$(".step-card", stepContainer);

            data.wuduSteps.forEach((step, index) => {
                const card = cards[index];

                if (!card) {
                    return;
                }

                const image = $("img", card);
                const heading = $(".step-copy h3", card);
                const paragraph = $(".step-copy p", card);

                if (heading) {
                    heading.textContent = step.title;
                }

                if (paragraph) {
                    paragraph.textContent = step.text;
                }

                if (image) {
                    image.alt = step.alt;
                }
            });
        }

        setText("wuduNoteTitle", data.wuduNoteTitle);
        setText("wuduNoteText", data.wuduNote);

        const note = $("#wuduNote");

        if (note) {
            const paragraph = $("p", note);

            if (paragraph) {
                paragraph.textContent = data.wuduNote;
            }
        }

        setText("wuduBreakTitle", data.wuduBreakTitle);
        setList("wuduBreaks", data.wuduBreaks);
    }

    /* =====================================================
       7. GHUSL SECTION
       ===================================================== */

    function renderGhusl(data) {
        setText("ghuslKicker", data.ghuslKicker);
        setText("ghuslTitle", data.ghuslTitle);
        setText("ghuslIntro", data.ghuslIntro);
        setText("ghuslStepsTitle", data.ghuslStepsTitle);

        setList("ghuslSteps", data.ghuslSteps, "li");

        setText("ghuslWhenTitle", data.ghuslWhenTitle);
        setList("ghuslWhen", data.ghuslWhen);

        setText("ghuslNoteTitle", data.ghuslNoteTitle);

        const note = $("#ghuslNote");

        if (note) {
            const paragraph = $("p", note);

            if (paragraph) {
                paragraph.textContent = data.ghuslNote;
            }
        }
    }

    /* =====================================================
       8. TAYAMMUM SECTION
       ===================================================== */

    function renderTayammum(data) {
        setText("tayammumKicker", data.tayammumKicker);
        setText("tayammumTitle", data.tayammumTitle);
        setText("tayammumIntro", data.tayammumIntro);
        setText("tayammumWhenTitle", data.tayammumWhenTitle);

        setList("tayammumWhen", data.tayammumWhen);

        const container = $("#tayammumStepList");

        if (container) {
            const cards = $$(".step-card", container);

            data.tayammumSteps.forEach((step, index) => {
                const card = cards[index];

                if (!card) {
                    return;
                }

                const image = $("img", card);
                const heading = $(".step-copy h3", card);
                const paragraph = $(".step-copy p", card);

                if (heading) {
                    heading.textContent = step.title;
                }

                if (paragraph) {
                    paragraph.textContent = step.text;
                }

                if (image) {
                    image.alt = step.alt;
                }
            });
        }

        setText("tayammumNoteTitle", data.tayammumNoteTitle);

        const note = $("#tayammumNote");

        if (note) {
            const paragraph = $("p", note);

            if (paragraph) {
                paragraph.textContent = data.tayammumNote;
            }
        }
    }

    /* =====================================================
       9. CLEANLINESS SECTION
       ===================================================== */

    function renderCleanliness(data) {
        setText("cleanKicker", data.cleanKicker);
        setText("cleanTitle", data.cleanTitle);
        setText("cleanIntro", data.cleanIntro);

        setText("cleanBodyTitle", data.cleanBodyTitle);
        setList("cleanBody", data.cleanBody);

        setText("cleanClothesTitle", data.cleanClothesTitle);
        setList("cleanClothes", data.cleanClothes);

        setText("cleanPlaceTitle", data.cleanPlaceTitle);
        setList("cleanPlace", data.cleanPlace);
    }

    /* =====================================================
       10. IMPORTANT GUIDANCE SECTION
       ===================================================== */

    function renderGuidance(data) {
        setText("guidanceTitle", data.guidanceTitle);

        const kicker = $("#importantGuidance .kicker");

        if (kicker) {
            kicker.textContent = data.guidanceKicker;
        }

        const container = $("#guidanceList");

        if (!container) {
            return;
        }

        const cards = $$(".guidance-item", container);

        data.guidanceItems.forEach((item, index) => {
            const card = cards[index];

            if (!card) {
                return;
            }

            const heading = $("h3", card);
            const paragraph = $("p", card);

            if (heading) {
                heading.textContent = item.title;
            }

            if (paragraph) {
                paragraph.textContent = item.text;
            }
        });
    }

    /* =====================================================
       11. FOOTER AND DOCUMENT METADATA
       ===================================================== */

    function renderFooter(data) {
        setText("footerText", data.footer);

        document.title = data.documentTitle;

        const description = $('meta[name="description"]');

        if (description) {
            description.setAttribute(
                "content",
                data.pageDescription
            );
        }
    }

    /* =====================================================
       12. IMAGE ERROR HANDLING
       ===================================================== */

    function setupImageHandling() {
        $$("img").forEach((image) => {
            if (image.dataset.purityImageReady === "true") {
                return;
            }

            image.dataset.purityImageReady = "true";

            image.addEventListener("error", () => {
                image.classList.add("image-load-failed");
                image.setAttribute("aria-invalid", "true");

                const parent = image.closest(
                    ".main-illustration, .lesson-art, .step-card"
                );

                if (parent) {
                    parent.classList.add("image-unavailable");
                }

                console.warn(
                    "IBADAT: Image could not be loaded:",
                    image.getAttribute("src")
                );
            });

            image.addEventListener("load", () => {
                image.classList.remove("image-load-failed");
                image.removeAttribute("aria-invalid");

                const parent = image.closest(
                    ".main-illustration, .lesson-art, .step-card"
                );

                if (parent) {
                    parent.classList.remove("image-unavailable");
                }
            });

            if (!image.hasAttribute("decoding")) {
                image.setAttribute("decoding", "async");
            }
        });
    }

    /* =====================================================
       13. IN-PAGE NAVIGATION
       ===================================================== */

    function setupNavigation() {
        $$('a[href^="#"]').forEach((link) => {
            if (link.dataset.purityNavigationReady === "true") {
                return;
            }

            link.dataset.purityNavigationReady = "true";

            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (!href || href === "#") {
                    return;
                }

                let target;

                try {
                    target = document.querySelector(href);
                } catch (error) {
                    return;
                }

                if (!target) {
                    return;
                }

                event.preventDefault();

                const reduceMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;

                target.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start"
                });

                if (!target.hasAttribute("tabindex")) {
                    target.setAttribute("tabindex", "-1");
                }

                target.focus({
                    preventScroll: true
                });
            });
        });
    }

    /* =====================================================
       14. ACCESSIBILITY
       ===================================================== */

    function setupAccessibility() {
        $$(".panel.lesson").forEach((section) => {
            if (!section.hasAttribute("tabindex")) {
                section.setAttribute("tabindex", "-1");
            }

            if (!section.hasAttribute("aria-label")) {
                const heading = $("h2", section);

                if (heading && heading.textContent.trim()) {
                    section.setAttribute(
                        "aria-label",
                        heading.textContent.trim()
                    );
                }
            }
        });

        $$("img").forEach((image) => {
            if (!image.hasAttribute("alt")) {
                image.setAttribute("alt", "");
            }
        });
    }

    /* =====================================================
       15. COMPLETE PAGE RENDER
       ===================================================== */

    function renderLanguage(language) {
        const data = translations[language] || translations.bn;

        document.documentElement.lang = language;

        renderHero(data);
        renderWudu(data);
        renderGhusl(data);
        renderTayammum(data);
        renderCleanliness(data);
        renderGuidance(data);
        renderFooter(data);

        /*
         * Keep the selected language available to other app pages.
         * Do not overwrite the user's other settings.
         */
        document.documentElement.dataset.language = language;

        setupAccessibility();
    }

    function applySettings() {
        const settings = readSettings();
        const language = getActiveLanguage(settings);

        installThemeStyles();
        applyTheme(settings);
        renderLanguage(language);
    }

    /* =====================================================
       16. LISTEN FOR SETTINGS UPDATES
       ===================================================== */

    function setupSettingsListeners() {
        /*
         * Other pages can notify this page after updating appSettings:
         *
         * window.dispatchEvent(new Event("appSettingsChanged"));
         */

        window.addEventListener("appSettingsChanged", () => {
            applySettings();
        });

        /*
         * The storage event is triggered when appSettings changes
         * in another tab of the same origin.
         */

        window.addEventListener("storage", (event) => {
            if (event.key === SETTINGS_KEY) {
                applySettings();
            }
        });

        /*
         * A page becoming visible can refresh settings that changed
         * while the user was viewing another page.
         */

        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) {
                applySettings();
            }
        });
    }

    /* =====================================================
       17. INITIALIZE
       ===================================================== */

    function initialize() {
        installThemeStyles();
        applySettings();
        setupImageHandling();
        setupNavigation();
        setupAccessibility();
        setupSettingsListeners();

        document.documentElement.dataset.purityPage = "ready";
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }

})();
