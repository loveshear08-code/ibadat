/* =========================================
   IBADAT — NAMAZ CONDITIONS PAGE
   File: js/namaz-conditions.js
   Bengali / English / Hindi + Light / Dark theme
   ========================================= */
"use strict";

(function () {
    const SETTINGS_KEY = "appSettings";
    const SUPPORTED_LANGUAGES = ["bn", "en", "hi"];

    function getSettings() {
        try {
            const raw = localStorage.getItem(SETTINGS_KEY);
            const value = raw ? JSON.parse(raw) : {};

            return value &&
                typeof value === "object" &&
                !Array.isArray(value)
                ? value
                : {};
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

    const translations = {
        bn: {
            pageTitle: "নামাজের শর্ত",
            pageIntro: "নামাজ শুদ্ধভাবে আদায়ের জন্য কিছু শর্ত জানা জরুরি। পবিত্রতা, নিয়ত, কিবলামুখী হওয়া, সতর ঢাকা এবং সময়ের মতো বিষয়গুলো বুঝে নিলে নামাজ শেখা সহজ হয়।",
            pageSubtitle: "নামাজের আগে কী জানা ও প্রস্তুত রাখা দরকার—তার সহজ পাঠ",
            contentsTitle: "এই পেজে যা শিখবে",
            contents: [
                "পরিচয় ও গুরুত্ব",
                "নিয়ত",
                "কিবলামুখী হওয়া",
                "সতর ঢাকা ও পোশাক",
                "সময় ও প্রস্তুতি",
                "অসুস্থতা ও বিশেষ অবস্থা",
                "সাধারণ ভুল ও সতর্কতা"
            ],

            introKicker: "প্রথম পাঠ",
            introTitle: "পরিচয় ও গুরুত্ব",
            introLead: "নামাজ ইসলামের গুরুত্বপূর্ণ ইবাদত। নামাজ আদায়ের আগে এর শর্তগুলো জানা দরকার, যাতে ইবাদতটি যথাসম্ভব সঠিকভাবে ও মনোযোগের সঙ্গে আদায় করা যায়।",
            introBeforeTitle: "নামাজের আগে মূল বিষয়গুলো",
            introBefore: [
                "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা।",
                "নামাজের সময় হয়েছে কি না নিশ্চিত হওয়া।",
                "কিবলার দিকে মুখ করা এবং সতর ঢেকে রাখা।",
                "কোন নামাজ পড়ছি তা মনে স্থির করে নিয়ত করা।"
            ],
            introNoteTitle: "মনে রাখবে",
            introNote: "এগুলো নামাজ শেখার প্রাথমিক নির্দেশনা। কিছু বিস্তারিত বিধানে মাজহাবভেদে পার্থক্য থাকতে পারে; নিজের অনুসৃত নির্ভরযোগ্য আলেমের কাছ থেকে শিখবে।",

            niyotKicker: "দ্বিতীয় পাঠ",
            niyotTitle: "নিয়ত",
            niyotLead: "নিয়ত হলো কোন ইবাদত করছি তা অন্তরে স্থির করা। নামাজের ক্ষেত্রে কোন নামাজ আদায় করতে যাচ্ছি, তা মনে নির্ধারণ করাই মূল বিষয়।",
            niyotHowTitle: "নিয়ত কীভাবে করবে?",
            niyotHow: [
                "কোন নামাজ পড়বে—যেমন ফজর, যোহর বা আসর—তা মনে স্থির করো।",
                "আল্লাহর সন্তুষ্টির জন্য ইবাদত করার মনোভাব রাখো।",
                "নিয়তের জন্য নির্দিষ্ট আরবি বাক্য মুখে বলা সবার জন্য আবশ্যক—এমন ধারণা করো না; এ বিষয়ে বিস্তারিত বিধান বিশ্বস্ত আলেমের কাছ থেকে শেখো।"
            ],
            niyotNoteTitle: "মনে রাখবে",
            niyotNote: "নিয়ত মূলত অন্তরের বিষয়। উচ্চারণ নিয়ে অযথা দুশ্চিন্তা না করে নিয়তের অর্থ বোঝা ও মনোযোগী হওয়ায় গুরুত্ব দাও।",

            qiblaKicker: "তৃতীয় পাঠ",
            qiblaTitle: "কিবলামুখী হওয়া",
            qiblaLead: "সামর্থ্য ও নিরাপদ পরিস্থিতি থাকলে নামাজে কাবা শরিফের দিকে মুখ করে দাঁড়াতে হয়। দূরে থাকলে কিবলার দিক নির্ভরযোগ্যভাবে নির্ধারণ করার চেষ্টা করবে।",
            qiblaCheckTitle: "কিবলার দিক নির্ধারণ",
            qiblaCheck: [
                "মসজিদের কিবলা নির্দেশনা বা নির্ভরযোগ্য কিবলা কম্পাস/অ্যাপ ব্যবহার করা যায়।",
                "অপরিচিত স্থানে স্থানীয় নির্ভরযোগ্য ব্যক্তির কাছে জেনে নিতে পারো।",
                "যথাসাধ্য চেষ্টা করার পরও দিক নিয়ে অনিশ্চয়তা থাকলে নিজের অনুসৃত ফিকহি নির্দেশনা অনুসরণ করো।"
            ],
            qiblaNoteTitle: "বিশেষ অবস্থা",
            qiblaNote: "ভয়, অসুস্থতা, যানবাহনে থাকা বা দিক নির্ধারণ অসম্ভব হওয়ার মতো পরিস্থিতিতে আলাদা বিধান থাকতে পারে। প্রয়োজন অনুযায়ী বিশ্বস্ত আলেমের পরামর্শ নাও।",

            poshakKicker: "চতুর্থ পাঠ",
            poshakTitle: "সতর ঢাকা ও পোশাক",
            poshakLead: "নামাজে সতর ঢেকে রাখা এবং পোশাক পবিত্র ও শালীন হওয়া জরুরি। পোশাক এমন হওয়া উচিত, যাতে নামাজের প্রয়োজনীয় অঙ্গগুলো যথাযথভাবে ঢাকা থাকে।",
            poshakCheckTitle: "পোশাক পরার আগে খেয়াল করো",
            poshakCheck: [
                "পোশাক শরীরের প্রয়োজনীয় অংশ ঢেকে রাখছে কি না।",
                "পোশাকে নিশ্চিত নাপাকি থাকলে তা যথাযথভাবে পরিষ্কার করা হয়েছে কি না।",
                "পোশাক স্বচ্ছ বা এমনভাবে খোলা নয়, যাতে সতর প্রকাশ পায়।",
                "নারী-পুরুষের সতরের সীমা ও কিছু বিস্তারিত বিধানে ফিকহি পার্থক্য থাকতে পারে।"
            ],
            poshakNoteTitle: "মনে রাখবে",
            poshakNote: "সতরের নির্দিষ্ট সীমা সম্পর্কে নিজের অনুসৃত মাজহাব অনুযায়ী নির্ভরযোগ্য নির্দেশনা শিখবে। পরিচ্ছন্নতা ও শালীনতার দিকেও খেয়াল রাখবে।",

            prostutiKicker: "পঞ্চম পাঠ",
            prostutiTitle: "সময় ও প্রস্তুতি",
            prostutiLead: "প্রত্যেক ফরজ নামাজের নির্ধারিত সময় আছে। সময় শুরু হওয়ার আগে ফরজ নামাজ আদায় করা যায় না। তাই সময়, পবিত্রতা ও নামাজের স্থান প্রস্তুত রাখা দরকার।",
            prostutiCheckTitle: "নামাজের আগে প্রস্তুতির তালিকা",
            prostutiCheck: [
                "সঠিক নামাজের সময় হয়েছে কি না যাচাই করা।",
                "প্রয়োজন অনুযায়ী অজু, গোসল বা তায়াম্মুমের মাধ্যমে পবিত্রতা অর্জন করা।",
                "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা।",
                "ফোন ও অন্য মনোযোগ-বিভ্রান্তিকারী বিষয় নীরব বা দূরে রাখা।",
                "নামাজে দাঁড়ানোর আগে মন শান্ত করে ইবাদতের জন্য প্রস্তুত হওয়া।"
            ],
            prostutiNoteTitle: "সময় সম্পর্কে সতর্কতা",
            prostutiNote: "স্থান ও ঋতুভেদে নামাজের সময় বদলে যায়। নির্ভরযোগ্য স্থানীয় সময়সূচি অনুসরণ করবে; অনুমান করে সময় নির্ধারণ করবে না।",

            osusthotaKicker: "ষষ্ঠ পাঠ",
            osusthotaTitle: "অসুস্থতা ও বিশেষ অবস্থা",
            osusthotaLead: "ইসলামে সামর্থ্য অনুযায়ী ইবাদতের নির্দেশনা রয়েছে। অসুস্থতা বা চলাচলে অসুবিধা হলে নিজের সক্ষমতা ও পরিস্থিতি অনুযায়ী নামাজ আদায়ের বিধান শিখতে হবে।",
            osusthotaGuidanceTitle: "অসুস্থ হলে কী করবে?",
            osusthotaGuidance: [
                "দাঁড়াতে সক্ষম না হলে বসে নামাজ পড়ার বিধান প্রযোজ্য হতে পারে।",
                "বসাও সম্ভব না হলে নিজের সামর্থ্য অনুযায়ী শোয়া অবস্থায় নামাজের নিয়ম জানতে হবে।",
                "পানি ব্যবহার ক্ষতিকর হলে বা বিশেষ শর্ত পূরণ হলে তায়াম্মুমের বিধান প্রযোজ্য হতে পারে।",
                "ভ্রমণ, ভয় বা জরুরি পরিস্থিতিতে কিছু বিধান আলাদা হতে পারে।"
            ],
            osusthotaNoteTitle: "গুরুত্বপূর্ণ",
            osusthotaNote: "কীভাবে ইশারা করবে, কোন অবস্থায় বসে বা শুয়ে পড়বে এবং পবিত্রতার বিকল্প কী হবে—এসবের বিস্তারিত বিধান পরিস্থিতিভেদে ভিন্ন হতে পারে। বিশ্বস্ত আলেমের নির্দেশনা নাও।",

            sotorkotaKicker: "সপ্তম পাঠ",
            sotorkotaTitle: "সাধারণ ভুল ও সতর্কতা",
            sotorkotaLead: "নামাজ শেখার সময় কিছু ভুল ধারণা বা অসাবধানতা দেখা দিতে পারে। সঠিক জ্ঞান অর্জন, ধীরে অনুশীলন এবং প্রয়োজনে নির্ভরযোগ্য ব্যক্তির কাছে শেখার মাধ্যমে এগুলো কমানো যায়।",
            sotorkotaCommonTitle: "যে বিষয়গুলোতে সতর্ক থাকবে",
            sotorkotaCommon: [
                "নামাজের সময় শুরু হয়েছে কি না নিশ্চিত না হয়ে ফরজ নামাজ শুরু করা।",
                "পবিত্রতা বা পোশাক সম্পর্কে নিশ্চিত তথ্য ছাড়া বারবার সন্দেহ করা।",
                "কিবলার দিক নির্ধারণে যথাসাধ্য চেষ্টা না করা।",
                "সতর ঢাকার প্রয়োজনীয়তা উপেক্ষা করা।",
                "অন্যের কাছ থেকে শোনা প্রতিটি কথাকে যাচাই ছাড়া চূড়ান্ত বিধান মনে করা।"
            ],
            sotorkotaWhatTitle: "ভুল হলে কী করবে?",
            sotorkotaWhat: [
                "শান্তভাবে সঠিক নিয়ম শিখে পরবর্তী সময়ে তা অনুসরণ করো।",
                "নামাজের ভেতরে কোনো ভুল হলে কী করতে হয়, তা নির্ভরযোগ্য আলেমের কাছ থেকে শেখো।",
                "মাজহাবভেদে বিধান আলাদা হতে পারে—তাই অল্প তথ্যের ভিত্তিতে অন্যকে দোষারোপ করো না।"
            ],
            sotorkotaNoteTitle: "শেষ কথা",
            sotorkotaNote: "এই পেজটি প্রাথমিক শিক্ষার জন্য। নামাজের শর্ত, ফরজ, ওয়াজিব এবং ভুল সংশোধনের বিস্তারিত বিধান শেখার জন্য নির্ভরযোগ্য আলেম বা স্বীকৃত শিক্ষাসামগ্রী অনুসরণ করবে。",
            footerText: "জ্ঞান অর্জন করো, সুন্দরভাবে আমল করো"
        },

        en: {
            pageTitle: "Conditions of Salah",
            pageIntro: "Learn the key conditions to prepare for prayer, including intention, facing the qibla, covering the required area, prayer time and preparation.",
            pageSubtitle: "A simple guide to what to know and prepare before salah",
            contentsTitle: "On this page",
            contents: [
                "Introduction & importance",
                "Intention",
                "Facing the qibla",
                "Covering & clothing",
                "Time & preparation",
                "Illness & special circumstances",
                "Common mistakes & cautions"
            ],

            introKicker: "LESSON 1",
            introTitle: "Introduction & Importance",
            introLead: "Salah is an important act of worship in Islam. Learning its conditions helps a person prepare and pray with care and attention.",
            introBeforeTitle: "Key things before prayer",
            introBefore: [
                "Keep the body, clothing and prayer place pure.",
                "Make sure the prayer time has begun.",
                "Face the qibla and cover the required area.",
                "Set the intention for the prayer you are about to perform."
            ],
            introNoteTitle: "Remember",
            introNote: "This is introductory learning material. Some details differ between schools of Islamic law; follow reliable guidance from a scholar you trust.",

            niyotKicker: "LESSON 2",
            niyotTitle: "Intention (Niyyah)",
            niyotLead: "Intention means inwardly determining the act of worship you are performing. For salah, know in your heart which prayer you intend to offer.",
            niyotHowTitle: "How to make the intention",
            niyotHow: [
                "Know which prayer you are about to perform, such as Fajr, Zuhr or Asr.",
                "Keep the intention of worshipping Allah sincerely.",
                "Do not assume that a particular Arabic phrase must be spoken by everyone; learn the detailed ruling from a trusted scholar."
            ],
            niyotNoteTitle: "Remember",
            niyotNote: "Intention is primarily an inward matter. Focus on its meaning and on prayer rather than becoming unnecessarily anxious about wording.",

            qiblaKicker: "LESSON 3",
            qiblaTitle: "Facing the Qibla",
            qiblaLead: "When able and in safe circumstances, face the Kaaba for prayer. If you are far away, make a reasonable effort to determine the direction reliably.",
            qiblaCheckTitle: "Finding the direction",
            qiblaCheck: [
                "Use a mosque's qibla marker or a reliable compass/app.",
                "In an unfamiliar place, ask a trustworthy local person.",
                "If uncertainty remains after reasonable effort, follow the guidance of the legal school you follow."
            ],
            qiblaNoteTitle: "Special circumstances",
            qiblaNote: "Different rulings may apply in situations involving fear, illness, travel or inability to determine the direction. Seek trusted guidance when needed.",

            poshakKicker: "LESSON 4",
            poshakTitle: "Covering & Clothing",
            poshakLead: "During prayer, the required area must be covered and clothing should be clean and modest.",
            poshakCheckTitle: "Check your clothing",
            poshakCheck: [
                "Make sure the required parts of the body are covered.",
                "Remove confirmed impurity from clothing appropriately.",
                "Avoid transparent or loose clothing that exposes the required area.",
                "Detailed rules about the required area can differ by legal school and circumstance."
            ],
            poshakNoteTitle: "Remember",
            poshakNote: "Learn the specific requirements according to the legal school you follow, and pay attention to cleanliness and modesty.",

            prostutiKicker: "LESSON 5",
            prostutiTitle: "Prayer Time & Preparation",
            prostutiLead: "Each obligatory prayer has an appointed time. An obligatory prayer should not be performed before its time begins, so check the time and prepare beforehand.",
            prostutiCheckTitle: "Before you pray",
            prostutiCheck: [
                "Check that the correct prayer time has begun.",
                "Complete the required purification by wudu, ghusl or tayammum as applicable.",
                "Ensure the body, clothing and prayer place are pure.",
                "Silence or put away distracting devices.",
                "Settle yourself and prepare to worship attentively."
            ],
            prostutiNoteTitle: "Time caution",
            prostutiNote: "Prayer times vary by location and season. Use a reliable local timetable rather than guessing.",

            osusthotaKicker: "LESSON 6",
            osusthotaTitle: "Illness & Special Circumstances",
            osusthotaLead: "Islamic guidance takes a person's ability into account. If illness or limited mobility affects prayer, learn the rulings that apply to your circumstances.",
            osusthotaGuidanceTitle: "If you are unwell",
            osusthotaGuidance: [
                "If you cannot stand, praying while seated may apply.",
                "If sitting is not possible, learn how to pray lying down according to your ability.",
                "Tayammum may apply if water would be harmful or its conditions are met.",
                "Some rulings may differ during travel, danger or emergencies."
            ],
            osusthotaNoteTitle: "Important",
            osusthotaNote: "Detailed rulings about gestures, posture and alternatives for purification depend on the circumstances. Ask a trusted scholar for guidance.",

            sotorkotaKicker: "LESSON 7",
            sotorkotaTitle: "Common Mistakes & Cautions",
            sotorkotaLead: "Misunderstandings and carelessness can occur while learning salah. Reliable teaching and calm practice help reduce them.",
            sotorkotaCommonTitle: "Things to be careful about",
            sotorkotaCommon: [
                "Beginning an obligatory prayer without checking that its time has begun.",
                "Repeatedly doubting purity or clothing without clear evidence.",
                "Not making a reasonable effort to determine the qibla.",
                "Overlooking the requirement to cover the required area.",
                "Treating every claim heard from others as a definitive ruling without checking."
            ],
            sotorkotaWhatTitle: "What if you make a mistake?",
            sotorkotaWhat: [
                "Learn the correct rule calmly and apply it going forward.",
                "Ask a reliable scholar what to do if a mistake occurs during prayer.",
                "Rulings can differ between legal schools; avoid blaming others based on incomplete information."
            ],
            sotorkotaNoteTitle: "Final note",
            sotorkotaNote: "This page is an introductory guide. Use reliable scholars or recognized learning resources for detailed rulings about prayer conditions and correcting mistakes.",
            footerText: "Learn with care, practice with sincerity"
        },

        hi: {
            pageTitle: "नमाज़ की शर्तें",
            pageIntro: "नमाज़ से पहले की ज़रूरी शर्तें सीखें—नीयत, क़िबले की ओर रुख़, आवश्यक अंगों को ढकना, नमाज़ का समय और तैयारी।",
            pageSubtitle: "नमाज़ से पहले जानने और तैयार रहने की आसान जानकारी",
            contentsTitle: "इस पेज पर",
            contents: [
                "परिचय और महत्व",
                "नीयत",
                "क़िबले की ओर रुख़",
                "सतर और कपड़े",
                "समय और तैयारी",
                "बीमारी और विशेष परिस्थितियाँ",
                "आम गलतियाँ और सावधानियाँ"
            ],

            introKicker: "पहला पाठ",
            introTitle: "परिचय और महत्व",
            introLead: "नमाज़ इस्लाम की महत्वपूर्ण इबादत है। इसकी शर्तें जानने से नमाज़ के लिए सही तैयारी और ध्यान के साथ इबादत करना आसान होता है।",
            introBeforeTitle: "नमाज़ से पहले मुख्य बातें",
            introBefore: [
                "शरीर, कपड़े और नमाज़ की जगह को पाक रखें।",
                "नमाज़ का समय शुरू होने की पुष्टि करें।",
                "क़िबले की ओर रुख़ करें और आवश्यक अंगों को ढकें।",
                "जिस नमाज़ को पढ़ना है उसकी नीयत दिल में करें।"
            ],
            introNoteTitle: "याद रखें",
            introNote: "यह शुरुआती शैक्षिक जानकारी है। कुछ विस्तृत नियम फ़िक़्ही मत के अनुसार अलग हो सकते हैं; भरोसेमंद विद्वान से सीखें।",

            niyotKicker: "दूसरा पाठ",
            niyotTitle: "नीयत",
            niyotLead: "नीयत का अर्थ है दिल में यह तय करना कि कौन-सी इबादत की जा रही है। नमाज़ में यह जानना मुख्य है कि कौन-सी नमाज़ अदा करनी है।",
            niyotHowTitle: "नीयत कैसे करें?",
            niyotHow: [
                "दिल में तय करें कि कौन-सी नमाज़ पढ़नी है, जैसे फ़ज्र, ज़ुहर या अस्र।",
                "अल्लाह की रज़ा के लिए इबादत करने का इरादा रखें।",
                "यह न समझें कि एक खास अरबी वाक्य बोलना हर व्यक्ति पर अनिवार्य है; विस्तृत हुक्म भरोसेमंद विद्वान से सीखें।"
            ],
            niyotNoteTitle: "याद रखें",
            niyotNote: "नीयत मुख्यतः दिल का मामला है। शब्दों को लेकर अनावश्यक चिंता करने के बजाय नीयत का अर्थ और ध्यान पर ध्यान दें।",

            qiblaKicker: "तीसरा पाठ",
            qiblaTitle: "क़िबले की ओर रुख़",
            qiblaLead: "सामर्थ्य और सुरक्षित परिस्थिति होने पर नमाज़ में काबा की ओर रुख़ किया जाता है। दूर होने पर दिशा पता करने की उचित कोशिश करें।",
            qiblaCheckTitle: "दिशा कैसे पता करें",
            qiblaCheck: [
                "मस्जिद के क़िबला संकेत या भरोसेमंद कंपास/ऐप का उपयोग करें।",
                "अनजान जगह पर किसी भरोसेमंद स्थानीय व्यक्ति से पूछें।",
                "उचित कोशिश के बाद भी संदेह रहे तो अपने फ़िक़्ही मार्गदर्शन पर अमल करें।"
            ],
            qiblaNoteTitle: "विशेष परिस्थितियाँ",
            qiblaNote: "डर, बीमारी, यात्रा या दिशा पता न कर पाने जैसी स्थितियों में अलग नियम हो सकते हैं। ज़रूरत पर भरोसेमंद विद्वान से सलाह लें।",

            poshakKicker: "चौथा पाठ",
            poshakTitle: "सतर और कपड़े",
            poshakLead: "नमाज़ में आवश्यक अंगों को ढकना और साफ़ व शालीन कपड़े पहनना ज़रूरी है।",
            poshakCheckTitle: "कपड़े पहनने से पहले",
            poshakCheck: [
                "जाँचें कि आवश्यक अंग ढके हुए हैं।",
                "कपड़ों पर निश्चित नापाकी हो तो उसे उचित तरीके से साफ़ करें।",
                "ऐसे पारदर्शी या खुले कपड़े न पहनें जिनसे सतर खुल जाए।",
                "सतर की सीमा के विस्तृत नियम फ़िक़्ही मत और परिस्थिति के अनुसार अलग हो सकते हैं।"
            ],
            poshakNoteTitle: "याद रखें",
            poshakNote: "अपने फ़िक़्ही मत के अनुसार सतर की सीमा सीखें और स्वच्छता व शालीनता का ध्यान रखें।",

            prostutiKicker: "पाँचवाँ पाठ",
            prostutiTitle: "समय और तैयारी",
            prostutiLead: "हर फ़र्ज़ नमाज़ का निर्धारित समय होता है। समय शुरू होने से पहले फ़र्ज़ नमाज़ अदा नहीं करनी चाहिए।",
            prostutiCheckTitle: "नमाज़ से पहले तैयारी",
            prostutiCheck: [
                "जाँचें कि सही नमाज़ का समय शुरू हो गया है।",
                "ज़रूरत के अनुसार वुज़ू, ग़ुस्ल या तयम्मुम करें।",
                "शरीर, कपड़े और नमाज़ की जगह पाक रखें।",
                "फ़ोन और दूसरी ध्यान भटकाने वाली चीज़ों को शांत या दूर रखें।",
                "मन को शांत करके इबादत के लिए तैयार हों।"
            ],
            prostutiNoteTitle: "समय के बारे में सावधानी",
            prostutiNote: "नमाज़ के समय जगह और मौसम के अनुसार बदलते हैं। भरोसेमंद स्थानीय समय-सारणी का पालन करें।",

            osusthotaKicker: "छठा पाठ",
            osusthotaTitle: "बीमारी और विशेष परिस्थितियाँ",
            osusthotaLead: "इस्लाम में व्यक्ति की क्षमता को ध्यान में रखा जाता है। बीमारी या चलने-फिरने में कठिनाई हो तो अपनी परिस्थिति के अनुसार नमाज़ के नियम सीखें।",
            osusthotaGuidanceTitle: "बीमार होने पर",
            osusthotaGuidance: [
                "खड़े होना संभव न हो तो बैठकर नमाज़ पढ़ने का नियम लागू हो सकता है।",
                "बैठना भी संभव न हो तो अपनी क्षमता के अनुसार लेटकर नमाज़ का तरीका सीखें।",
                "पानी का उपयोग नुकसानदेह हो या शर्तें पूरी हों तो तयम्मुम लागू हो सकता है।",
                "यात्रा, डर या आपात स्थिति में कुछ नियम अलग हो सकते हैं।"
            ],
            osusthotaNoteTitle: "महत्वपूर्ण",
            osusthotaNote: "इशारे, बैठने या लेटने और पवित्रता के विकल्प से जुड़े विस्तृत नियम परिस्थिति के अनुसार अलग हो सकते हैं। भरोसेमंद विद्वान से सलाह लें।",

            sotorkotaKicker: "सातवाँ पाठ",
            sotorkotaTitle: "आम गलतियाँ और सावधानियाँ",
            sotorkotaLead: "नमाज़ सीखते समय गलतफहमियाँ या लापरवाही हो सकती है। सही शिक्षा और शांत अभ्यास से इन्हें कम किया जा सकता है।",
            sotorkotaCommonTitle: "इन बातों से सावधान रहें",
            sotorkotaCommon: [
                "समय शुरू होने की पुष्टि किए बिना फ़र्ज़ नमाज़ शुरू करना।",
                "बिना स्पष्ट कारण पवित्रता या कपड़ों को लेकर बार-बार संदेह करना।",
                "क़िबले की दिशा जानने की उचित कोशिश न करना।",
                "सतर ढकने की ज़रूरत को नज़रअंदाज़ करना।",
                "दूसरों की हर बात को जाँच के बिना अंतिम धार्मिक नियम मान लेना।"
            ],
            sotorkotaWhatTitle: "गलती हो जाए तो क्या करें?",
            sotorkotaWhat: [
                "शांति से सही नियम सीखें और आगे उस पर अमल करें।",
                "नमाज़ के दौरान गलती हो तो क्या करना चाहिए, यह भरोसेमंद विद्वान से सीखें।",
                "फ़िक़्ही मत के अनुसार नियम अलग हो सकते हैं; अधूरी जानकारी पर दूसरों को दोष न दें।"
            ],
            sotorkotaNoteTitle: "अंतिम बात",
            sotorkotaNote: "यह शुरुआती मार्गदर्शिका है। नमाज़ की शर्तों और गलतियों को सुधारने के विस्तृत नियमों के लिए भरोसेमंद विद्वानों या मान्य शिक्षण सामग्री का सहारा लें।",
            footerText: "ज्ञान सीखें, ईमानदारी से अमल करें"
        }
    };

    const sectionIds = [
        "intro",
        "niyot",
        "qibla",
        "poshak",
        "prostuti",
        "osusthota",
        "sotorkota"
    ];

    const sectionKeys = [
        "intro",
        "niyot",
        "qibla",
        "poshak",
        "prostuti",
        "osusthota",
        "sotorkota"
    ];

    function setText(id, value) {
        const el = document.getElementById(id);

        if (el && typeof value === "string") {
            el.textContent = value;
        }
    }

    function setList(id, values) {
        const el = document.getElementById(id);

        if (!el || !Array.isArray(values)) {
            return;
        }

        const fragment = document.createDocumentFragment();

        values.forEach(value => {
            const li = document.createElement("li");
            li.textContent = value;
            fragment.appendChild(li);
        });

        el.replaceChildren(fragment);
    }

    function applyLanguage(language) {
        const lang = SUPPORTED_LANGUAGES.includes(language)
            ? language
            : "bn";

        const data = translations[lang];

        document.documentElement.lang = lang;

        const numerals = {
            bn: ["১", "২", "৩", "৪", "৫", "৬", "৭"],
            en: ["1", "2", "3", "4", "5", "6", "7"],
            hi: ["१", "२", "३", "४", "५", "६", "७"]
        };

        document.querySelectorAll(
            ".lesson .section-title > b"
        ).forEach((badge, index) => {
            if (index < 7) {
                badge.textContent = numerals[lang][index];
            }
        });

        document.querySelectorAll(".lesson ol").forEach(list => {
            list.style.listStyleType = ({
                bn: "bengali",
                en: "decimal",
                hi: "devanagari"
            })[lang] || "decimal";
        });

        [
            "pageTitle",
            "pageIntro",
            "pageSubtitle",
            "contentsTitle"
        ].forEach((key, index) => {
            setText(
                [
                    "page-title",
                    "intro-text",
                    "page-subtitle",
                    "contents-title"
                ][index],
                data[key]
            );
        });

        const links = document.getElementById("contents-links");

        if (links) {
            const fragment = document.createDocumentFragment();

            data.contents.forEach((label, index) => {
                const a = document.createElement("a");
                a.href = "#" + sectionIds[index];
                a.textContent = label;
                fragment.appendChild(a);
            });

            links.replaceChildren(fragment);
        }

        const mappings = {
            intro: [
                "Kicker", "Title", "Lead",
                "BeforeTitle", "Before",
                "NoteTitle", "Note"
            ],
            niyot: [
                "Kicker", "Title", "Lead",
                "HowTitle", "How",
                "NoteTitle", "Note"
            ],
            qibla: [
                "Kicker", "Title", "Lead",
                "CheckTitle", "Check",
                "NoteTitle", "Note"
            ],
            poshak: [
                "Kicker", "Title", "Lead",
                "CheckTitle", "Check",
                "NoteTitle", "Note"
            ],
            prostuti: [
                "Kicker", "Title", "Lead",
                "CheckTitle", "Check",
                "NoteTitle", "Note"
            ],
            osusthota: [
                "Kicker", "Title", "Lead",
                "GuidanceTitle", "Guidance",
                "NoteTitle", "Note"
            ],
            sotorkota: [
                "Kicker", "Title", "Lead",
                "CommonTitle", "Common",
                "WhatTitle", "What",
                "NoteTitle", "Note"
            ]
        };

        const idMap = {
            intro: [
                "intro-kicker", "intro-title", "intro-lead",
                "intro-before-title", "intro-before",
                "intro-note-title", "intro-note"
            ],
            niyot: [
                "niyot-kicker", "niyot-title", "niyot-lead",
                "niyot-how-title", "niyot-how",
                "niyot-note-title", "niyot-note"
            ],
            qibla: [
                "qibla-kicker", "qibla-title", "qibla-lead",
                "qibla-check-title", "qibla-check",
                "qibla-note-title", "qibla-note"
            ],
            poshak: [
                "poshak-kicker", "poshak-title", "poshak-lead",
                "poshak-check-title", "poshak-check",
                "poshak-note-title", "poshak-note"
            ],
            prostuti: [
                "prostuti-kicker", "prostuti-title", "prostuti-lead",
                "prostuti-check-title", "prostuti-check",
                "prostuti-note-title", "prostuti-note"
            ],
            osusthota: [
                "osusthota-kicker", "osusthota-title",
                "osusthota-lead", "osusthota-guidance-title",
                "osusthota-guidance", "osusthota-note-title",
                "osusthota-note"
            ],
            sotorkota: [
                "sotorkota-kicker", "sotorkota-title",
                "sotorkota-lead", "sotorkota-common-title",
                "sotorkota-common", "sotorkota-what-title",
                "sotorkota-what", "sotorkota-note-title",
                "sotorkota-note"
            ]
        };

        sectionKeys.forEach(section => {
            const keys = mappings[section];
            const ids = idMap[section];

            for (let i = 0; i < keys.length; i++) {
                const key = section + keys[i];
                const id = ids[i];

                if (
                    key.endsWith("Before") ||
                    key.endsWith("How") ||
                    key.endsWith("Check") ||
                    key.endsWith("Guidance") ||
                    key.endsWith("Common") ||
                    key.endsWith("What")
                ) {
                    setList(id, data[key]);
                } else {
                    setText(id, data[key]);
                }
            }
        });

        setText("footerMessage", data.footerText);
        setText("footerBrand", "IBADAT");
    }

    function applyTheme() {
        const settings = getSettings();

        const dark =
            settings.dark === true ||
            settings.dark === "true" ||
            settings.theme === "dark";

        document.body.classList.toggle("dark-mode", dark);

        const meta = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (meta) {
            meta.setAttribute(
                "content",
                dark ? "#121A15" : "#0F5132"
            );
        }
    }

    function refreshConditionsPage() {
        applyLanguage(getCurrentLanguage());
        applyTheme();
    }

    window.refreshConditionsPage = refreshConditionsPage;

    window.addEventListener("storage", event => {
        if (event.key === SETTINGS_KEY || event.key === null) {
            refreshConditionsPage();
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            refreshConditionsPage,
            { once: true }
        );
    } else {
        refreshConditionsPage();
    }
})();
