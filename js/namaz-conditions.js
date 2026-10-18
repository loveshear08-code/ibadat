/* =========================================
   IBADAT — Namaz Conditions
   Bengali / English / Hindi
   Light / Dark theme
   ========================================= */

"use strict";

(() => {
    const SETTINGS_KEY = "appSettings";
    const LANGUAGES = ["bn", "en", "hi"];

    const content = {
        bn: {
            page: "নামাজের শর্ত",
            introText: "নামাজ শুদ্ধভাবে আদায়ের আগে প্রয়োজনীয় শর্তগুলো জেনে নাও।",
            subtitle: "নামাজের আগে কী জানা ও প্রস্তুত রাখা দরকার—তার সহজ পাঠ।",
            footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
            sections: [
                {
                    title: "পরিচয় ও গুরুত্ব",
                    lead: "নামাজ ইসলামের গুরুত্বপূর্ণ ইবাদত। নামাজ আদায়ের আগে এর প্রয়োজনীয় শর্তগুলো জানা দরকার, যাতে মনোযোগের সঙ্গে নামাজ আদায় করা যায়।",
                    heading: "নামাজের আগে মূল বিষয়গুলো",
                    list: [
                        "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা।",
                        "নামাজের নির্ধারিত সময় হয়েছে কি না নিশ্চিত হওয়া।",
                        "কিবলার দিকে মুখ করা এবং সতর ঢেকে রাখা।",
                        "কোন নামাজ আদায় করবে, তা মনে স্থির করে নিয়ত করা।"
                    ],
                    noteTitle: "মনে রাখবে",
                    note: "এগুলো নামাজ শেখার প্রাথমিক নির্দেশনা। বিস্তারিত বিধানে মাজহাবভেদে পার্থক্য থাকতে পারে।"
                },
                {
                    kicker: "প্রথম পাঠ",
                    title: "নিয়ত",
                    lead: "নিয়ত হলো কোন ইবাদত আদায় করা হচ্ছে, তা অন্তরে স্থির করা। নামাজের ক্ষেত্রে কোন নামাজ পড়বে, তা মনে নির্ধারণ করো।",
                    heading: "নিয়ত কীভাবে করবে?",
                    list: [
                        "কোন নামাজ পড়বে, তা মনে স্থির করো।",
                        "আল্লাহর সন্তুষ্টির জন্য ইবাদত করার মনোভাব রাখো।",
                        "নিয়তের বিস্তারিত বিধান নির্ভরযোগ্য শিক্ষাসূত্র থেকে শিখে নাও।"
                    ],
                    noteTitle: "মনে রাখবে",
                    note: "নিয়ত নিয়ে অযথা দুশ্চিন্তা না করে এর অর্থ বোঝা ও নামাজে মনোযোগ দেওয়ার চেষ্টা করো।"
                },
                {
                    kicker: "দ্বিতীয় পাঠ",
                    title: "কিবলামুখী হওয়া",
                    lead: "সামর্থ্য ও নিরাপদ পরিস্থিতিতে নামাজের সময় কাবা শরিফের দিকে মুখ করে দাঁড়াতে হয়।",
                    heading: "কিবলার দিক নির্ধারণ",
                    list: [
                        "মসজিদের কিবলা নির্দেশনা অনুসরণ করো।",
                        "প্রয়োজনে নির্ভরযোগ্য কিবলা কম্পাস বা অ্যাপ ব্যবহার করো।",
                        "অপরিচিত স্থানে নির্ভরযোগ্য ব্যক্তির কাছ থেকে জেনে নাও।"
                    ],
                    noteTitle: "বিশেষ অবস্থা",
                    note: "অসুস্থতা, ভয় বা বিশেষ পরিস্থিতিতে আলাদা বিধান থাকতে পারে। প্রয়োজন হলে নির্ভরযোগ্য আলেমের পরামর্শ নাও।"
                },
                {
                    kicker: "তৃতীয় পাঠ",
                    title: "সতর ঢাকা ও পোশাক",
                    lead: "নামাজে সতর ঢেকে রাখা এবং শরীর ও পোশাক পবিত্র রাখা জরুরি।",
                    heading: "পোশাকের ক্ষেত্রে খেয়াল রাখবে",
                    list: [
                        "পোশাক শরীরের প্রয়োজনীয় অংশ ঢেকে রাখছে কি না দেখো।",
                        "পোশাকে নিশ্চিত নাপাকি থাকলে তা পরিষ্কার করো।",
                        "পোশাক স্বচ্ছ নয় এবং সতর প্রকাশ করে না—এটি নিশ্চিত করো।",
                        "সতরের বিস্তারিত সীমা সম্পর্কে নির্ভরযোগ্য নির্দেশনা শিখে নাও।"
                    ],
                    noteTitle: "মনে রাখবে",
                    note: "পোশাকের পরিচ্ছন্নতা, শালীনতা এবং সতর ঢাকার দিকে খেয়াল রাখো।"
                },
                {
                    kicker: "চতুর্থ পাঠ",
                    title: "সময় ও প্রস্তুতি",
                    lead: "প্রত্যেক ফরজ নামাজের নির্ধারিত সময় আছে। তাই নামাজের আগে সময় ও পবিত্রতা নিশ্চিত করা দরকার।",
                    heading: "নামাজের আগে প্রস্তুতি",
                    list: [
                        "নামাজের নির্ধারিত সময় হয়েছে কি না যাচাই করো।",
                        "প্রয়োজন অনুযায়ী ওযু, গোসল বা তায়াম্মুম করে পবিত্র হও।",
                        "শরীর, পোশাক ও নামাজের স্থান পরিষ্কার রাখো।",
                        "ফোন নীরব রাখো এবং মনোযোগ নষ্ট করে এমন বিষয় দূরে রাখো।"
                    ],
                    noteTitle: "সময় সম্পর্কে সতর্কতা",
                    note: "নির্ভরযোগ্য স্থানীয় নামাজের সময়সূচি অনুসরণ করো।"
                },
                {
                    kicker: "পঞ্চম পাঠ",
                    title: "অসুস্থতা ও বিশেষ অবস্থা",
                    lead: "অসুস্থতা বা শারীরিক অসুবিধায় নামাজ আদায়ের নিয়ম ব্যক্তির সামর্থ্য ও পরিস্থিতি অনুযায়ী হতে পারে।",
                    heading: "বিশেষ অবস্থায় করণীয়",
                    list: [
                        "দাঁড়াতে না পারলে বসে নামাজ পড়ার বিধান প্রযোজ্য হতে পারে।",
                        "বসা সম্ভব না হলে শোয়া অবস্থায় নামাজের নিয়ম শিখে নাও।",
                        "পানি ব্যবহার ক্ষতিকর হলে নির্দিষ্ট শর্তে তায়াম্মুম প্রযোজ্য হতে পারে।",
                        "নিজের পরিস্থিতি অনুযায়ী নির্ভরযোগ্য নির্দেশনা অনুসরণ করো।"
                    ],
                    noteTitle: "গুরুত্বপূর্ণ",
                    note: "বিশেষ পরিস্থিতির বিস্তারিত বিধান জানতে নির্ভরযোগ্য আলেমের পরামর্শ নাও।"
                },
                {
                    kicker: "ষষ্ঠ পাঠ",
                    title: "সাধারণ ভুল ও সতর্কতা",
                    lead: "সঠিক নিয়ম শেখা ও মনোযোগের সঙ্গে অনুশীলন করলে নামাজের প্রস্তুতিতে অনেক সাধারণ ভুল এড়ানো যায়।",
                    heading: "যে বিষয়গুলোতে সতর্ক থাকবে",
                    list: [
                        "সময় নিশ্চিত না হয়ে ফরজ নামাজ শুরু করবে না।",
                        "পবিত্রতা সম্পর্কে নিশ্চিত তথ্য ছাড়া বারবার সন্দেহ করবে না।",
                        "কিবলার দিক নির্ধারণে যথাসাধ্য চেষ্টা করবে।",
                        "সতর ঢাকা ও পোশাকের পবিত্রতা উপেক্ষা করবে না।",
                        "যাচাই না করে শোনা কথাকে চূড়ান্ত বিধান মনে করবে না।"
                    ],
                    secondHeading: "ভুল হলে কী করবে?",
                    secondList: [
                        "শান্তভাবে সঠিক নিয়ম শিখে তা অনুসরণ করো।",
                        "নামাজের ভুল সংশোধনের বিধান নির্ভরযোগ্য সূত্র থেকে শিখে নাও।",
                        "অল্প তথ্যের ভিত্তিতে অন্যকে দোষারোপ করো না।"
                    ],
                    noteTitle: "শেষ কথা",
                    note: "এই পেজটি প্রাথমিক শিক্ষার জন্য। বিস্তারিত বিধান জানতে নির্ভরযোগ্য আলেম বা স্বীকৃত শিক্ষাসামগ্রী অনুসরণ করো।"
                }
            ]
        },

        en: {
            page: "Conditions of Salah",
            introText: "Learn the essential conditions to know before performing salah correctly.",
            subtitle: "A simple guide to what to know and prepare before salah.",
            footer: "Preserve purity and find peace in worship.",
            sections: [
                {
                    title: "Introduction & Importance",
                    lead: "Salah is an important act of worship in Islam. Learning its conditions helps you prepare and pray with attention.",
                    heading: "Key things before prayer",
                    list: [
                        "Keep the body, clothing and prayer place pure.",
                        "Make sure the prescribed prayer time has begun.",
                        "Face the qibla and cover the required area.",
                        "Know which prayer you intend to perform."
                    ],
                    noteTitle: "Remember",
                    note: "This is introductory guidance. Some detailed rulings may differ between schools of Islamic law."
                },
                {
                    kicker: "Lesson 1",
                    title: "Intention (Niyyah)",
                    lead: "Intention means inwardly determining the act of worship you are performing. Know which prayer you intend to offer.",
                    heading: "How to make the intention",
                    list: [
                        "Know which prayer you intend to perform.",
                        "Intend to worship Allah sincerely.",
                        "Learn detailed rulings about intention from a reliable source."
                    ],
                    noteTitle: "Remember",
                    note: "Understand the meaning of intention and focus on prayer instead of worrying unnecessarily."
                },
                {
                    kicker: "Lesson 2",
                    title: "Facing the Qibla",
                    lead: "When able and in safe circumstances, face the Kaaba during prayer.",
                    heading: "Finding the direction",
                    list: [
                        "Follow the qibla marker in a mosque.",
                        "Use a reliable qibla compass or app if needed.",
                        "Ask a trustworthy local person when you are unfamiliar with a place."
                    ],
                    noteTitle: "Special circumstances",
                    note: "Different rulings may apply in cases of illness, fear or other special circumstances. Seek reliable guidance when needed."
                },
                {
                    kicker: "Lesson 3",
                    title: "Covering & Clothing",
                    lead: "During prayer, the required area must be covered and the body and clothing must be pure.",
                    heading: "Check your clothing",
                    list: [
                        "Make sure the required parts of the body are covered.",
                        "Clean clothing if impurity is confirmed.",
                        "Avoid transparent clothing that exposes the required area.",
                        "Learn the detailed requirements from a reliable source."
                    ],
                    noteTitle: "Remember",
                    note: "Pay attention to cleanliness, modesty and proper covering."
                },
                {
                    kicker: "Lesson 4",
                    title: "Prayer Time & Preparation",
                    lead: "Each obligatory prayer has an appointed time. Check the time and purification before praying.",
                    heading: "Before you pray",
                    list: [
                        "Check that the prescribed prayer time has begun.",
                        "Perform wudu, ghusl or tayammum as applicable.",
                        "Keep the body, clothing and prayer place pure.",
                        "Silence your phone and put away distractions."
                    ],
                    noteTitle: "Time caution",
                    note: "Follow a reliable local prayer timetable."
                },
                {
                    kicker: "Lesson 5",
                    title: "Illness & Special Circumstances",
                    lead: "Prayer guidance may depend on a person's ability and circumstances during illness or physical difficulty.",
                    heading: "What to do in special circumstances",
                    list: [
                        "If you cannot stand, praying while seated may apply.",
                        "If sitting is not possible, learn how to pray lying down.",
                        "Tayammum may apply if water is harmful and its conditions are met.",
                        "Follow reliable guidance for your circumstances."
                    ],
                    noteTitle: "Important",
                    note: "Ask a trusted scholar about detailed rulings for special circumstances."
                },
                {
                    kicker: "Lesson 6",
                    title: "Common Mistakes & Cautions",
                    lead: "Learning reliable guidance and practising carefully can help avoid common mistakes when preparing for prayer.",
                    heading: "Things to be careful about",
                    list: [
                        "Do not begin an obligatory prayer before its time is confirmed.",
                        "Avoid repeated doubts about purity without clear evidence.",
                        "Make a reasonable effort to determine the qibla.",
                        "Do not overlook covering requirements or clothing purity.",
                        "Do not treat unverified claims as definitive rulings."
                    ],
                    secondHeading: "What if you make a mistake?",
                    secondList: [
                        "Calmly learn the correct rule and follow it.",
                        "Learn from a reliable source how to correct prayer mistakes.",
                        "Avoid blaming others based on incomplete information."
                    ],
                    noteTitle: "Final note",
                    note: "This page is introductory. Consult reliable scholars or recognized learning resources for detailed rulings."
                }
            ]
        },

        hi: {
            page: "नमाज़ की शर्तें",
            introText: "नमाज़ सही तरीके से पढ़ने से पहले ज़रूरी शर्तें जानें।",
            subtitle: "नमाज़ से पहले जानने और तैयारी करने की आसान जानकारी।",
            footer: "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।",
            sections: [
                {
                    title: "परिचय और महत्व",
                    lead: "नमाज़ इस्लाम की महत्वपूर्ण इबादत है। इसकी शर्तें जानने से सही तैयारी और ध्यान के साथ नमाज़ पढ़ना आसान होता है।",
                    heading: "नमाज़ से पहले मुख्य बातें",
                    list: [
                        "शरीर, कपड़े और नमाज़ की जगह पाक रखें।",
                        "नमाज़ का निर्धारित समय शुरू होने की पुष्टि करें।",
                        "क़िबले की ओर रुख़ करें और आवश्यक अंगों को ढकें।",
                        "जिस नमाज़ को पढ़ना है, उसकी नीयत करें।"
                    ],
                    noteTitle: "याद रखें",
                    note: "यह शुरुआती जानकारी है। कुछ विस्तृत नियम फ़िक़्ही मत के अनुसार अलग हो सकते हैं।"
                },
                {
                    kicker: "पहला पाठ",
                    title: "नीयत",
                    lead: "नीयत का अर्थ है दिल में यह तय करना कि कौन-सी इबादत की जा रही है। नमाज़ के लिए तय करें कि कौन-सी नमाज़ पढ़नी है।",
                    heading: "नीयत कैसे करें?",
                    list: [
                        "दिल में तय करें कि कौन-सी नमाज़ पढ़नी है।",
                        "अल्लाह की रज़ा के लिए इबादत का इरादा रखें।",
                        "नीयत के विस्तृत नियम भरोसेमंद स्रोत से सीखें।"
                    ],
                    noteTitle: "याद रखें",
                    note: "नीयत का अर्थ समझें और अनावश्यक चिंता के बजाय नमाज़ पर ध्यान दें।"
                },
                {
                    kicker: "दूसरा पाठ",
                    title: "क़िबले की ओर रुख़",
                    lead: "सामर्थ्य और सुरक्षित परिस्थिति में नमाज़ के समय काबा की ओर रुख़ करें।",
                    heading: "दिशा कैसे पता करें",
                    list: [
                        "मस्जिद के क़िबला संकेत का पालन करें।",
                        "ज़रूरत पर भरोसेमंद क़िबला कंपास या ऐप इस्तेमाल करें।",
                        "अनजान जगह पर किसी भरोसेमंद स्थानीय व्यक्ति से पूछें।"
                    ],
                    noteTitle: "विशेष परिस्थितियाँ",
                    note: "बीमारी, डर या विशेष परिस्थितियों में अलग नियम हो सकते हैं। ज़रूरत पर भरोसेमंद विद्वान से सलाह लें।"
                },
                {
                    kicker: "तीसरा पाठ",
                    title: "सतर और कपड़े",
                    lead: "नमाज़ में आवश्यक अंगों को ढकना और शरीर व कपड़ों को पाक रखना ज़रूरी है।",
                    heading: "कपड़ों पर ध्यान दें",
                    list: [
                        "जाँचें कि आवश्यक अंग ढके हुए हैं।",
                        "निश्चित नापाकी होने पर कपड़े साफ़ करें।",
                        "ऐसे पारदर्शी कपड़े न पहनें जिनसे सतर खुल जाए।",
                        "विस्तृत नियम भरोसेमंद स्रोत से सीखें।"
                    ],
                    noteTitle: "याद रखें",
                    note: "स्वच्छता, शालीनता और सतर ढकने का ध्यान रखें।"
                },
                {
                    kicker: "चौथा पाठ",
                    title: "समय और तैयारी",
                    lead: "हर फ़र्ज़ नमाज़ का निर्धारित समय होता है। नमाज़ से पहले समय और पवित्रता सुनिश्चित करें।",
                    heading: "नमाज़ से पहले तैयारी",
                    list: [
                        "जाँचें कि नमाज़ का समय शुरू हो गया है।",
                        "ज़रूरत के अनुसार वुज़ू, ग़ुस्ल या तयम्मुम करें।",
                        "शरीर, कपड़े और नमाज़ की जगह पाक रखें।",
                        "फ़ोन शांत रखें और ध्यान भटकाने वाली चीज़ें दूर रखें।"
                    ],
                    noteTitle: "समय के बारे में सावधानी",
                    note: "भरोसेमंद स्थानीय नमाज़ समय-सारणी का पालन करें।"
                },
                {
                    kicker: "पाँचवाँ पाठ",
                    title: "बीमारी और विशेष परिस्थितियाँ",
                    lead: "बीमारी या शारीरिक कठिनाई में नमाज़ के नियम व्यक्ति की क्षमता और परिस्थिति पर निर्भर कर सकते हैं।",
                    heading: "विशेष परिस्थिति में क्या करें",
                    list: [
                        "खड़े होना संभव न हो तो बैठकर नमाज़ पढ़ने का नियम लागू हो सकता है।",
                        "बैठना भी संभव न हो तो लेटकर नमाज़ पढ़ने का तरीका सीखें।",
                        "पानी नुकसानदेह हो और शर्तें पूरी हों तो तयम्मुम लागू हो सकता है।",
                        "अपनी परिस्थिति के अनुसार भरोसेमंद मार्गदर्शन लें।"
                    ],
                    noteTitle: "महत्वपूर्ण",
                    note: "विशेष परिस्थितियों के विस्तृत नियमों के लिए भरोसेमंद विद्वान से सलाह लें।"
                },
                {
                    kicker: "छठा पाठ",
                    title: "आम गलतियाँ और सावधानियाँ",
                    lead: "सही जानकारी और ध्यानपूर्वक अभ्यास से नमाज़ की तैयारी में होने वाली आम गलतियों से बचा जा सकता है।",
                    heading: "इन बातों से सावधान रहें",
                    list: [
                        "समय की पुष्टि किए बिना फ़र्ज़ नमाज़ शुरू न करें।",
                        "बिना स्पष्ट कारण पवित्रता को लेकर बार-बार संदेह न करें।",
                        "क़िबले की दिशा पता करने की उचित कोशिश करें।",
                        "सतर ढकने और कपड़ों की पवित्रता को नज़रअंदाज़ न करें।",
                        "बिना जाँच के सुनी हुई बात को अंतिम नियम न मानें।"
                    ],
                    secondHeading: "गलती हो जाए तो क्या करें?",
                    secondList: [
                        "शांति से सही नियम सीखें और उसका पालन करें।",
                        "नमाज़ की गलती सुधारने का तरीका भरोसेमंद स्रोत से सीखें।",
                        "अधूरी जानकारी के आधार पर दूसरों को दोष न दें।"
                    ],
                    noteTitle: "अंतिम बात",
                    note: "यह शुरुआती मार्गदर्शिका है। विस्तृत नियमों के लिए भरोसेमंद विद्वानों या मान्य शिक्षण सामग्री का सहारा लें।"
                }
            ]
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

    const numberWords = {
        bn: ["প্রথম পাঠ", "দ্বিতীয় পাঠ", "তৃতীয় পাঠ", "চতুর্থ পাঠ", "পঞ্চম পাঠ", "ষষ্ঠ পাঠ"],
        en: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5", "Lesson 6"],
        hi: ["पहला पाठ", "दूसरा पाठ", "तीसरा पाठ", "चौथा पाठ", "पाँचवाँ पाठ", "छठा पाठ"]
    };

    const numerals = {
        bn: ["১", "২", "৩", "৪", "৫", "৬"],
        en: ["1", "2", "3", "4", "5", "6"],
        hi: ["१", "२", "३", "४", "५", "६"]
    };

    function getSettings() {
        try {
            const settings = JSON.parse(
                localStorage.getItem(SETTINGS_KEY) || "{}"
            );

            return settings && typeof settings === "object"
                ? settings
                : {};
        } catch {
            return {};
        }
    }

    function getLanguage() {
        const lang = getSettings().lang;
        return LANGUAGES.includes(lang) ? lang : "bn";
    }

    function setText(id, value) {
        const element = document.getElementById(id);

        if (element && typeof value === "string") {
            element.textContent = value;
        }
    }

    function setList(id, values) {
        const element = document.getElementById(id);

        if (!element || !Array.isArray(values)) return;

        const fragment = document.createDocumentFragment();

        values.forEach(value => {
            const li = document.createElement("li");
            li.textContent = value;
            fragment.appendChild(li);
        });

        element.replaceChildren(fragment);
    }

    function applyLanguage(language) {
        const lang = LANGUAGES.includes(language) ? language : "bn";
        const data = content[lang];

        document.documentElement.lang = lang;

        setText("page-title", data.page);
        setText("intro-text", data.introText);
        setText("page-subtitle", data.subtitle);
        setText("footerText", data.footer);

        /* পরিচয় বোর্ডে নম্বর থাকবে না */
        const introSection = document.getElementById("intro");

        if (introSection) {
            const intro = data.sections[0];

            setText("intro-title", intro.title);
            setText("intro-lead", intro.lead);
            setText("intro-before-title", intro.heading);
            setList("intro-before", intro.list);
            setText("intro-note-title", intro.noteTitle);
            setText("intro-note", intro.note);
        }

        /* বাকি ছয়টি বোর্ড: ১ থেকে ৬ */
        sectionIds.slice(1).forEach((id, index) => {
            const section = data.sections[index + 1];
            const element = document.getElementById(id);

            if (!element || !section) return;

            const number = element.querySelector(".section-number");
            if (number) {
                number.textContent = numerals[lang][index];
            }

            setText(id + "-kicker", section.kicker);
            setText(id + "-title", section.title);
            setText(id + "-lead", section.lead);

            const headingId = {
                niyot: "niyot-how-title",
                qibla: "qibla-check-title",
                poshak: "poshak-check-title",
                prostuti: "prostuti-check-title",
                osusthota: "osusthota-guidance-title",
                sotorkota: "sotorkota-common-title"
            }[id];

            const listId = {
                niyot: "niyot-how",
                qibla: "qibla-check",
                poshak: "poshak-check",
                prostuti: "prostuti-check",
                osusthota: "osusthota-guidance",
                sotorkota: "sotorkota-common"
            }[id];

            setText(headingId, section.heading);
            setList(listId, section.list);

            setText(id + "-note-title", section.noteTitle);
            setText(id + "-note", section.note);

            if (id === "sotorkota") {
                setText("sotorkota-what-title", section.secondHeading);
                setList("sotorkota-what", section.secondList);
            }
        });

        /* বাংলা, ইংরেজি ও হিন্দিতে ordered-list নম্বর */
        document.querySelectorAll(".lesson ol").forEach(list => {
            list.style.listStyleType = {
                bn: "bengali",
                en: "decimal",
                hi: "devanagari"
            }[lang];
        });
    }

    function applyTheme() {
        const settings = getSettings();

        const dark =
            settings.dark === true ||
            settings.dark === "true" ||
            settings.theme === "dark";

        document.body.classList.toggle("dark-mode", dark);

        const themeColor = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (themeColor) {
            themeColor.setAttribute(
                "content",
                dark ? "#121A15" : "#0F5132"
            );
        }
    }

    function refreshPage() {
        applyLanguage(getLanguage());
        applyTheme();
    }

    window.refreshConditionsPage = refreshPage;

    window.addEventListener("storage", event => {
        if (event.key === SETTINGS_KEY || event.key === null) {
            refreshPage();
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", refreshPage, {
            once: true
        });
    } else {
        refreshPage();
    }
})();
