/* IBADAT Namaz Detail — js/namaz-detail.js
   14 lessons; bn/en/hi; appSettings read-only.
   URL example: ?topic=wudu&lang=bn
*/
(() => {
"use strict";

const $ = id => document.getElementById(id);
const titleEl = $("lesson-title");
const numberEl = $("lesson-number");
const introEl = $("lesson-intro");
const contentEl = $("lesson-content");

if (!titleEl || !numberEl || !introEl || !contentEl) {
  console.error("Namaz detail: required HTML IDs are missing.");
  return;
}

let settings = {};
try {
  settings = JSON.parse(localStorage.getItem("appSettings") || "{}") || {};
} catch (_) {}

const params = new URLSearchParams(location.search);
const supported = ["bn", "en", "hi"];

const lang = supported.includes(params.get("lang"))
  ? params.get("lang")
  : (supported.includes(settings.lang) ? settings.lang : "bn");

document.documentElement.lang = lang;
document.body.classList.toggle("dark-mode", settings.dark === true);

const digits = {
  bn: "০১২৩৪৫৬৭৮৯",
  en: "0123456789",
  hi: "०१२३४५६७८९"
};

const n = value =>
  String(value).replace(/[0-9]/g, digit => digits[lang][+digit]);

const ui = {
  bn: {
    topic: "বিষয়",
    arabic: "আরবি পাঠ",
    pron: "উচ্চারণ",
    meaning: "অর্থ",
    note: "মনে রাখুন",
    important: "গুরুত্বপূর্ণ কথা",
    missing: "বিষয়টি পাওয়া যায়নি",
    disclaimer: "শিক্ষাসহায়িকা: কিছু বিধান ও পরিভাষায় মাজহাবভেদে পার্থক্য আছে। আরবি পাঠ ও উচ্চারণ নির্ভরযোগ্য মুসহাফ, যোগ্য শিক্ষক বা বিশ্বস্ত আলেমের কাছে যাচাই করুন।"
  },
  en: {
    topic: "Topic",
    arabic: "Arabic text",
    pron: "Pronunciation",
    meaning: "Meaning",
    note: "Remember",
    important: "Important note",
    missing: "Topic not found",
    disclaimer: "Learning guide: Some rulings and terms differ between schools of Islamic law. Verify Arabic text and pronunciation with a reliable mushaf, qualified teacher or trusted scholar."
  },
  hi: {
    topic: "विषय",
    arabic: "अरबी पाठ",
    pron: "उच्चारण",
    meaning: "अर्थ",
    note: "याद रखें",
    important: "महत्वपूर्ण बात",
    missing: "विषय नहीं मिला",
    disclaimer: "शिक्षण मार्गदर्शिका: कुछ नियम और शब्दावली फ़िक़्ही मतों के अनुसार अलग हैं। अरबी पाठ और उच्चारण विश्वसनीय मुसहफ़, योग्य शिक्षक या भरोसेमंद आलिम से जाँचें।"
  }
}[lang];

/*
  A section may contain:
  h, p, list, arabic, transliteration, meaning,
  note, warning or table.
*/
const T = [
{
  id: "purity",
  title: ["পাক-পবিত্রতা", "Purification", "पाकी और पवित्रता"],
  intro: [
    "নামাজের আগে শরীর, পোশাক ও স্থান পবিত্র রাখুন। সাধারণ পরিচ্ছন্নতা ও শরিয়তের নির্ধারিত পবিত্রতা এক বিষয় নয়।",
    "Before prayer, keep the body, clothing and prayer area clean and ritually pure. Ordinary cleanliness and ritual purity are not identical.",
    "नमाज़ से पहले शरीर, कपड़े और जगह पाक रखें। सामान्य सफ़ाई और धार्मिक पाकी एक ही बात नहीं हैं।"
  ],
  s: [
    [
      {
        h: "পবিত্রতার ক্ষেত্র",
        p: "শরীর, পোশাক ও নামাজের স্থান—এই তিনটির পবিত্রতা খেয়াল করুন। পরিচিত নাপাকি প্রযোজ্য নিয়মে দূর করুন।"
      },
      {
        h: "হাদাস ও নাজাসাত",
        p: "হাদাস এমন অবস্থা যাতে ওজু বা গোসল দরকার হয়। নাজাসাত হলো নির্দিষ্ট অপবিত্র বস্তু; দুটির বিধান এক নয়।"
      },
      {
        h: "ব্যবহারিক তালিকা",
        list: [
          "পোশাকে পরিচিত নাপাকি আছে কি না দেখুন।",
          "নামাজের স্থান পরিষ্কার রাখুন।",
          "শুধু সন্দেহের কারণে কোনো জিনিসকে নাপাক বলবেন না।",
          "জটিল মাসআলায় যোগ্য আলেমকে জিজ্ঞাসা করুন।"
        ]
      }
    ],
    [
      {
        h: "Areas of purification",
        p: "Pay attention to the body, clothing and prayer area. Remove known impurity according to applicable rules."
      },
      {
        h: "Hadath and najasah",
        p: "Hadath is a state requiring wudu or ghusl. Najasah is a defined impure substance; their rulings differ."
      },
      {
        h: "Checklist",
        list: [
          "Check for known impurity on clothing.",
          "Keep the prayer area clean.",
          "Do not declare something impure solely because of doubt.",
          "Ask a qualified scholar about complex cases."
        ]
      }
    ],
    [
      {
        h: "पाकी के क्षेत्र",
        p: "शरीर, कपड़े और नमाज़ की जगह की पाकी का ध्यान रखें। ज्ञात नापाकी को संबंधित नियमों के अनुसार दूर करें।"
      },
      {
        h: "हदस और नजासत",
        p: "हदस वह अवस्था है जिसमें वुज़ू या ग़ुस्ल चाहिए। नजासत निर्धारित अपवित्र वस्तु है; दोनों के नियम अलग हैं।"
      },
      {
        h: "जाँच सूची",
        list: [
          "कपड़ों पर ज्ञात नापाकी जाँचें।",
          "नमाज़ की जगह साफ़ रखें।",
          "केवल संदेह से किसी चीज़ को नापाक न ठहराएँ।",
          "जटिल मसलों में योग्य आलिम से पूछें।"
        ]
      }
    ]
  ]
},

{
  id: "wudu",
  title: ["ওজু", "Wudu", "वुज़ू"],
  intro: [
    "ওজুর ক্রম, ফরজ ও ওজু ভঙ্গের সাধারণ কারণ শিখুন। পানি অপচয় করবেন না।",
    "Learn the sequence, obligations and common invalidators of wudu. Avoid wasting water.",
    "वुज़ू का क्रम, फ़र्ज़ और वुज़ू टूटने के आम कारण सीखें। पानी बर्बाद न करें।"
  ],
  s: [
    [
      {
        h: "ওজুর সাধারণ ক্রম",
        list: [
          "মনে মনে নিয়ত করুন।",
          "দুই হাত কবজি পর্যন্ত ধুয়ে নিন।",
          "কুলি করুন ও নাকে পানি দিন।",
          "মুখমণ্ডল ধুয়ে নিন।",
          "দুই হাত কনুইসহ ধুয়ে নিন।",
          "মাথা মাসেহ করুন।",
          "দুই পা টাখনুসহ ধুয়ে নিন।"
        ]
      },
      {
        h: "হানাফি মতে চার ফরজ",
        list: [
          "সম্পূর্ণ মুখ ধোয়া।",
          "দুই হাত কনুইসহ ধোয়া।",
          "মাথার অন্তত এক-চতুর্থাংশ মাসেহ।",
          "দুই পা টাখনুসহ ধোয়া।"
        ],
        note: "অন্য মাজহাবে কিছু বিবরণ ভিন্ন হতে পারে।"
      },
      {
        h: "ওজু ভঙ্গ",
        p: "প্রস্রাব-পায়খানা ও বায়ু নির্গমন ওজু ভঙ্গ করে। ঘুম, রক্তপাত ও স্পর্শের মতো বিষয়ে মাজহাবভেদে পার্থক্য আছে।"
      },
      {
        h: "সাধারণ ভুল",
        list: [
          "কনুই বা টাখনু শুকনো রাখা।",
          "পানি পৌঁছাতে বাধা আছে কি না না দেখা।",
          "অযথা পানি অপচয়।",
          "শুধু সন্দেহে বারবার ওজু করা।"
        ]
      }
    ],
    [
      {
        h: "Common sequence",
        list: [
          "Intend wudu in the heart.",
          "Wash hands to the wrists.",
          "Rinse mouth and nose.",
          "Wash the face.",
          "Wash arms including elbows.",
          "Wipe the head.",
          "Wash feet including ankles."
        ]
      },
      {
        h: "Four Hanafi obligations",
        list: [
          "Wash the whole face.",
          "Wash both arms including elbows.",
          "Wipe at least one-quarter of the head.",
          "Wash both feet including ankles."
        ],
        note: "Details differ in other schools."
      },
      {
        h: "Invalidators",
        p: "Urination, defecation and passing wind invalidate wudu. Details about sleep, bleeding and touch vary by school."
      },
      {
        h: "Common mistakes",
        list: [
          "Leaving an elbow or ankle dry.",
          "Not checking for barriers to water.",
          "Wasting water.",
          "Repeating wudu due to doubt alone."
        ]
      }
    ],
    [
      {
        h: "वुज़ू का क्रम",
        list: [
          "दिल में नीयत करें।",
          "दोनों हाथ कलाइयों तक धोएँ।",
          "कुल्ली करें और नाक में पानी डालें।",
          "चेहरा धोएँ।",
          "दोनों बाज़ू कोहनियों सहित धोएँ।",
          "सिर का मसह करें।",
          "दोनों पैर टखनों सहित धोएँ।"
        ]
      },
      {
        h: "हनफ़ी फ़िक़्ह के चार फ़र्ज़",
        list: [
          "पूरा चेहरा धोना।",
          "दोनों बाज़ू कोहनियों सहित धोना।",
          "सिर के कम-से-कम एक-चौथाई हिस्से का मसह।",
          "दोनों पैर टखनों सहित धोना।"
        ],
        note: "दूसरे मतों में विवरण अलग हो सकते हैं।"
      },
      {
        h: "वुज़ू टूटना",
        p: "पेशाब, पाख़ाना और हवा निकलने से वुज़ू टूटता है। नींद, ख़ून और स्पर्श के नियमों में मतभेद हैं।"
      },
      {
        h: "आम गलतियाँ",
        list: [
          "कोहनी या टखना सूखा छोड़ना।",
          "पानी की रुकावट न जाँचना।",
          "पानी बर्बाद करना।",
          "केवल संदेह से वुज़ू दोहराना।"
        ]
      }
    ]
  ]
},

{
  id: "conditions",
  title: ["নামাজের শর্ত", "Conditions of Prayer", "नमाज़ की शर्तें"],
  intro: [
    "নামাজ শুরুর আগে প্রয়োজনীয় শর্তগুলো যাচাই করুন।",
    "Check the required conditions before beginning prayer.",
    "नमाज़ शुरू करने से पहले आवश्यक शर्तें जाँचें।"
  ],
  s: [
    [
      {
        h: "প্রধান শর্ত",
        list: [
          "ওয়াক্ত প্রবেশ করা।",
          "প্রয়োজনীয় পবিত্রতা অর্জন।",
          "শরীর, পোশাক ও স্থানের পবিত্রতা।",
          "প্রয়োজনীয় সতর ঢাকা।",
          "সক্ষম হলে কিবলামুখী হওয়া।",
          "অন্তরে নিয়ত করা।"
        ]
      },
      {
        h: "ওয়াক্ত",
        p: "সময় শহর, তারিখ ও গণনাপদ্ধতি অনুযায়ী বদলায়। স্থানীয় নির্ভরযোগ্য সময়সূচি দেখুন।"
      },
      {
        h: "নিয়ত",
        p: "নিয়ত অন্তরের সংকল্প। মুখে নির্দিষ্ট বাক্য বলার বিষয়ে শিক্ষাপদ্ধতি ভিন্ন।"
      },
      {
        h: "বিশেষ অবস্থা",
        p: "অসুস্থতা বা প্রকৃত অক্ষমতায় বিশেষ বিধান থাকতে পারে; যোগ্য আলেমের পরামর্শ নিন।"
      }
    ],
    [
      {
        h: "Main conditions",
        list: [
          "The prayer time has begun.",
          "Required purification is present.",
          "Body, clothing and place are pure.",
          "Required parts are covered.",
          "Face the Qibla when able.",
          "Intend the prayer."
        ]
      },
      {
        h: "Prayer time",
        p: "Times vary by location, date and calculation method. Check a reliable local timetable."
      },
      {
        h: "Intention",
        p: "Intention is a resolve of the heart; schools differ on spoken formulas."
      },
      {
        h: "Special circumstances",
        p: "Illness or inability may affect some requirements. Ask a qualified scholar."
      }
    ],
    [
      {
        h: "मुख्य शर्तें",
        list: [
          "नमाज़ का समय शुरू हो।",
          "आवश्यक पाकी हासिल हो।",
          "शरीर, कपड़े और जगह पाक हों।",
          "आवश्यक अंग ढके हों।",
          "सक्षम होने पर क़िबला की ओर हों।",
          "दिल में नीयत करें।"
        ]
      },
      {
        h: "वक़्त",
        p: "समय जगह, तारीख़ और गणना-पद्धति के अनुसार बदलता है। विश्वसनीय स्थानीय समय-सारणी देखें।"
      },
      {
        h: "नीयत",
        p: "नीयत दिल का इरादा है; मौखिक वाक्य पर मतभेद हैं।"
      },
      {
        h: "विशेष स्थिति",
        p: "बीमारी या असमर्थता में विशेष नियम हो सकते हैं। योग्य आलिम से पूछें।"
      }
    ]
  ]
},

{
  id: "times-rakats",
  title: ["ওয়াক্ত ও রাকাত", "Prayer Times and Rakats", "वक़्त और रकअतें"],
  intro: [
    "পাঁচ ওয়াক্ত ফরজ নামাজের রাকাত ও ওয়াক্তের সাধারণ পরিচয়।",
    "The obligatory rakats and general time windows of the five daily prayers.",
    "पाँच वक़्त की फ़र्ज़ रकअतें और सामान्य समय।"
  ],
  s: [
    [
      {
        h: "পাঁচ ওয়াক্তের ফরজ রাকাত",
        table: {
          headers: ["নামাজ", "ফরজ রাকাত"],
          rows: [
            ["ফজর", "২"],
            ["জোহর", "৪"],
            ["আসর", "৪"],
            ["মাগরিব", "৩"],
            ["ইশা", "৪"]
          ]
        }
      },
      {
        h: "হানাফি মতে প্রচলিত সুন্নত ও বিতর",
        p: "প্রচলিত হানাফি শিক্ষায় ফজরের আগে ২, জোহরের আগে ৪ ও পরে ২, মাগরিবের পরে ২, ইশার পরে ২ সুন্নতে মুয়াক্কাদা। হানাফি মতে বিতর ৩ রাকাত ওয়াজিব।"
      },
      {
        h: "ওয়াক্ত",
        list: [
          "ফজর: সুবহে সাদিক থেকে সূর্যোদয়ের আগে।",
          "জোহর: সূর্য ঢলে যাওয়ার পর।",
          "আসর: নির্ধারিত বিকেলের সময়; গণনায় মতভেদ আছে।",
          "মাগরিব: সূর্যাস্তের পর।",
          "ইশা: সন্ধ্যার আভা মিলিয়ে যাওয়ার পর।"
        ]
      },
      {
        h: "সময় যাচাই",
        p: "প্রতিদিনের সময় শহর ও গণনাপদ্ধতির ওপর নির্ভর করে। স্থানীয় সময়সূচি দেখুন।"
      }
    ],
    [
      {
        h: "Obligatory rakats",
        table: {
          headers: ["Prayer", "Fard rakats"],
          rows: [
            ["Fajr", "2"],
            ["Dhuhr", "4"],
            ["Asr", "4"],
            ["Maghrib", "3"],
            ["Isha", "4"]
          ]
        }
      },
      {
        h: "Common Hanafi sunnah and witr",
        p: "Common Hanafi teaching includes 2 emphasized sunnah before Fajr, 4 before and 2 after Dhuhr, 2 after Maghrib and 2 after Isha. Hanafi witr is 3 rakats and wajib."
      },
      {
        h: "General times",
        list: [
          "Fajr: true dawn until before sunrise.",
          "Dhuhr: after the sun passes its zenith.",
          "Asr: prescribed afternoon period; calculation differs.",
          "Maghrib: after sunset.",
          "Isha: after twilight disappears."
        ]
      },
      {
        h: "Timetable",
        p: "Times depend on location and calculation method. Check a reliable local timetable."
      }
    ],
    [
      {
        h: "फ़र्ज़ रकअतें",
        table: {
          headers: ["नमाज़", "फ़र्ज़ रकअतें"],
          rows: [
            ["फ़ज्र", "२"],
            ["ज़ुहर", "४"],
            ["अस्र", "४"],
            ["मग़रिब", "३"],
            ["इशा", "४"]
          ]
        }
      },
      {
        h: "आम हनफ़ी सुन्नत और वितर",
        p: "आम हनफ़ी शिक्षा में फ़ज्र से पहले २, ज़ुहर से पहले ४ और बाद में २, मग़रिब के बाद २ और इशा के बाद २ सुन्नते मुअक्कदा हैं। हनफ़ी फ़िक़्ह में वितर ३ रकअत वाजिब है।"
      },
      {
        h: "सामान्य वक़्त",
        list: [
          "फ़ज्र: सच्ची सुबह से सूर्योदय से पहले।",
          "ज़ुहर: सूरज ढलने के बाद।",
          "अस्र: निर्धारित दोपहर बाद का समय।",
          "मग़रिब: सूर्यास्त के बाद।",
          "इशा: शाम की आभा समाप्त होने के बाद।"
        ]
      },
      {
        h: "समय-सारणी",
        p: "समय जगह और गणना-पद्धति पर निर्भर है। स्थानीय विश्वसनीय समय-सारणी देखें।"
      }
    ]
  ]
},
{
  id: "fard-wajib-sunnah",
  title: ["ফরজ, ওয়াজিব ও সুন্নত", "Fard, Wajib and Sunnah", "फ़र्ज़, वाजिब और सुन्नत"],
  intro: [
    "নামাজের বিধানগুলোর পার্থক্য বুঝুন। নিচের ব্যাখ্যা মূলত হানাফি শিক্ষার সাধারণ পরিচয়।",
    "Understand the different categories of prayer rulings. The explanation below mainly introduces common Hanafi teaching.",
    "नमाज़ के नियमों की श्रेणियाँ समझें। नीचे मुख्यतः आम हनफ़ी शिक्षा का परिचय है।"
  ],
  s: [
    [
      {
        h: "ফরজ",
        p: "যে কাজ অবশ্য পালনীয়, তা ফরজ। নামাজের ফরজ বাদ পড়লে নামাজ সহিহ হওয়ার ক্ষেত্রে গুরুতর সমস্যা হয়।"
      },
      {
        h: "ওয়াজিব",
        p: "হানাফি ফিকহে ওয়াজিব একটি পৃথক বিধানশ্রেণি। ইচ্ছাকৃতভাবে ওয়াজিব ছেড়ে দেওয়া গুনাহ; ভুলে ছুটে গেলে নির্দিষ্ট অবস্থায় সাহু সিজদা প্রয়োজন হতে পারে।"
      },
      {
        h: "সুন্নত",
        p: "রাসুলুল্লাহ ﷺ-এর শিক্ষা ও আমল অনুসরণ করা সুন্নতের অন্তর্ভুক্ত। সুন্নতে মুয়াক্কাদা নিয়মিত গুরুত্বসহ পালন করা হয়।"
      },
      {
        h: "মনে রাখুন",
        list: [
          "ফরজ ও ওয়াজিবের পার্থক্য মাজহাবভেদে সংজ্ঞায়িত হয়।",
          "নামাজের কোনো অংশ ভুলে বাদ পড়লে পরিস্থিতি অনুযায়ী বিধান জানতে হবে।",
          "নিশ্চিত না হয়ে নিজের মতো করে নামাজের বিধান নির্ধারণ করবেন না।"
        ]
      }
    ],
    [
      {
        h: "Fard",
        p: "A fard act is obligatory. Omitting a fard element creates a serious issue for the validity of prayer."
      },
      {
        h: "Wajib",
        p: "In Hanafi jurisprudence, wajib is a distinct category. Deliberately omitting it is sinful; an omission by mistake may require prostrations of forgetfulness in certain circumstances."
      },
      {
        h: "Sunnah",
        p: "Sunnah includes following the teachings and practice of Prophet Muhammad ﷺ. Emphasized sunnah practices are maintained regularly."
      },
      {
        h: "Remember",
        list: [
          "The distinction between fard and wajib varies by school.",
          "The ruling for an omitted prayer element depends on the circumstances.",
          "Ask a qualified scholar instead of guessing."
        ]
      }
    ],
    [
      {
        h: "फ़र्ज़",
        p: "फ़र्ज़ वह काम है जिसे करना अनिवार्य है। नमाज़ का कोई फ़र्ज़ छूटने से नमाज़ की वैधता पर गंभीर असर पड़ सकता है।"
      },
      {
        h: "वाजिब",
        p: "हनफ़ी फ़िक़्ह में वाजिब अलग श्रेणी है। जानबूझकर छोड़ना गुनाह है; भूल से छूटने पर कुछ स्थितियों में सज्दा-ए-सहव ज़रूरी हो सकता है।"
      },
      {
        h: "सुन्नत",
        p: "सुन्नत में नबी मुहम्मद ﷺ की शिक्षा और अमल का पालन शामिल है। सुन्नते मुअक्कदा का नियमित रूप से ध्यान रखा जाता है।"
      },
      {
        h: "याद रखें",
        list: [
          "फ़र्ज़ और वाजिब का अंतर फ़िक़्ही मत के अनुसार बदल सकता है।",
          "नमाज़ का कोई भाग छूटने पर परिस्थिति के अनुसार नियम जानें।",
          "अनुमान लगाकर धार्मिक नियम तय न करें।"
        ]
      }
    ]
  ]
},

{
  id: "start",
  title: ["নামাজ শুরু", "Beginning the Prayer", "नमाज़ शुरू करना"],
  intro: [
    "নিয়ত, তাকবিরে তাহরিমা, দাঁড়ানো ও হাত বাঁধার সাধারণ পদ্ধতি শিখুন।",
    "Learn the general practice of intention, opening takbir, standing and placing the hands.",
    "नीयत, तकबीर-ए-तहरीमा, खड़े होने और हाथ बाँधने का सामान्य तरीका सीखें।"
  ],
  s: [
    [
      {
        h: "১. নিয়ত",
        p: "কোন নামাজ পড়ছেন তা অন্তরে স্থির করুন। নিয়ত মূলত অন্তরের সংকল্প।"
      },
      {
        h: "২. তাকবিরে তাহরিমা",
        arabic: "اللّٰهُ أَكْبَرُ",
        transliteration: "আল্লাহু আকবার",
        meaning: "আল্লাহ সর্বশ্রেষ্ঠ।",
        note: "সক্ষম হলে সোজা দাঁড়িয়ে নামাজ শুরু করুন। হাত তোলার উচ্চতা ও হাত বাঁধার স্থান সম্পর্কে মাজহাবভেদে পার্থক্য আছে।"
      },
      {
        h: "৩. কিয়াম",
        p: "ফরজ নামাজে সক্ষম ব্যক্তি দাঁড়িয়ে পড়েন। অসুস্থতা বা অক্ষমতায় প্রযোজ্য ছাড় থাকতে পারে।"
      },
      {
        h: "৪. কিরাত",
        p: "নামাজের ধরন ও রাকাত অনুযায়ী কিরাত পড়ুন। কোন নামাজে কোথায় জোরে বা আস্তে পড়তে হয়, তা শিক্ষক থেকে শিখুন।"
      },
      {
        h: "অনুশীলন",
        list: [
          "নামাজের আগে কিবলার দিক নিশ্চিত করুন।",
          "মনোযোগ দিয়ে তাকবির বলুন।",
          "তাড়াহুড়ো না করে স্থিরভাবে দাঁড়ান।"
        ]
      }
    ],
    [
      {
        h: "1. Intention",
        p: "Resolve in your heart which prayer you are performing. Intention is fundamentally a resolve of the heart."
      },
      {
        h: "2. Opening takbir",
        arabic: "اللّٰهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        meaning: "Allah is the Greatest.",
        note: "Begin standing upright if able. Schools differ on hand-raising height and where the hands are placed."
      },
      {
        h: "3. Standing",
        p: "A person able to stand performs obligatory prayer standing. Relevant concessions may apply in illness or inability."
      },
      {
        h: "4. Recitation",
        p: "Recite according to the prayer and rakat. Learn from a qualified teacher which prayers are recited aloud or quietly."
      },
      {
        h: "Practice",
        list: [
          "Check the Qibla before prayer.",
          "Say the opening takbir attentively.",
          "Stand calmly without rushing."
        ]
      }
    ],
    [
      {
        h: "1. नीयत",
        p: "दिल में तय करें कि कौन-सी नमाज़ पढ़ रहे हैं। नीयत मूल रूप से दिल का इरादा है।"
      },
      {
        h: "2. तकबीर-ए-तहरीमा",
        arabic: "اللّٰهُ أَكْبَرُ",
        transliteration: "अल्लाहु अकबर",
        meaning: "अल्लाह सबसे महान है।",
        note: "सक्षम हों तो सीधे खड़े होकर नमाज़ शुरू करें। हाथ उठाने और बाँधने के तरीके में मतभेद हैं।"
      },
      {
        h: "3. क़ियाम",
        p: "फ़र्ज़ नमाज़ में सक्षम व्यक्ति खड़े होकर पढ़ता है। बीमारी या असमर्थता में संबंधित रियायतें हो सकती हैं।"
      },
      {
        h: "4. क़िरात",
        p: "नमाज़ और रकअत के अनुसार तिलावत करें। कौन-सी नमाज़ में ऊँची या धीमी आवाज़ से पढ़ना है, शिक्षक से सीखें।"
      },
      {
        h: "अभ्यास",
        list: [
          "नमाज़ से पहले क़िबला जाँचें।",
          "ध्यान से तकबीर कहें।",
          "बिना जल्दबाज़ी के स्थिर खड़े रहें।"
        ]
      }
    ]
  ]
},

{
  id: "qirat",
  title: ["কিরাত", "Qira'ah (Recitation)", "क़िरात"],
  intro: [
    "সূরা ফাতিহা ও কুরআন তিলাওয়াতের গুরুত্ব এবং শুদ্ধ উচ্চারণের অনুশীলন।",
    "Learn about Surah Al-Fatihah, Quran recitation and correct pronunciation.",
    "सूरह अल-फ़ातिहा, क़ुरआन की तिलावत और सही उच्चारण के बारे में सीखें।"
  ],
  s: [
    [
      {
        h: "সূরা ফাতিহার প্রথম আয়াত",
        arabic: "بِسْمِ اللّٰهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "বিসমিল্লাহির রাহমানির রাহিম",
        meaning: "পরম করুণাময়, অতি দয়ালু আল্লাহর নামে।"
      },
      {
        h: "কিরাতের আদব",
        list: [
          "আরবি অক্ষরের মাখরাজ শিখুন।",
          "তাড়াহুড়ো না করে স্পষ্টভাবে পড়ুন।",
          "তাজবিদের নিয়ম ধীরে ধীরে শিখুন।",
          "শুধু বাংলা উচ্চারণ দেখে আরবি শেখার ওপর নির্ভর করবেন না।"
        ]
      },
      {
        h: "ফাতিহা ও অতিরিক্ত সূরা",
        p: "সূরা ফাতিহা এবং অতিরিক্ত কিরাতের বিধান রাকাত ও নামাজের ধরন অনুযায়ী প্রযোজ্য। নিজের মাজহাবের নিয়ম শিক্ষক থেকে শিখুন।"
      },
      {
        h: "শুদ্ধ উচ্চারণ",
        p: "বাংলা বা ইংরেজি অক্ষরে আরবি উচ্চারণ পুরোপুরি প্রকাশ করা যায় না। একজন দক্ষ ক্বারির তিলাওয়াত শুনে অনুশীলন করুন।"
      }
    ],
    [
      {
        h: "First verse of Al-Fatihah",
        arabic: "بِسْمِ اللّٰهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillahir-Rahmanir-Rahim",
        meaning: "In the name of Allah, the Most Compassionate, the Most Merciful."
      },
      {
        h: "Recitation etiquette",
        list: [
          "Learn the articulation points of Arabic letters.",
          "Recite clearly without rushing.",
          "Study tajwid gradually.",
          "Do not rely only on transliteration to learn Arabic."
        ]
      },
      {
        h: "Al-Fatihah and additional recitation",
        p: "The rules for Al-Fatihah and additional recitation depend on the rakat and type of prayer. Learn the practice of your school from a qualified teacher."
      },
      {
        h: "Correct pronunciation",
        p: "Bengali or English letters cannot fully represent Arabic pronunciation. Practise by listening to a skilled reciter."
      }
    ],
    [
      {
        h: "सूरह अल-फ़ातिहा की पहली आयत",
        arabic: "بِسْمِ اللّٰهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "बिस्मिल्लाहिर्रहमानिर्रहीम",
        meaning: "अल्लाह के नाम से, जो अत्यंत कृपाशील और दयावान है।"
      },
      {
        h: "तिलावत के आदाब",
        list: [
          "अरबी अक्षरों के मख़ारिज सीखें।",
          "बिना जल्दबाज़ी स्पष्ट पढ़ें।",
          "तजवीद धीरे-धीरे सीखें।",
          "केवल लिप्यंतरण से अरबी सीखने पर निर्भर न रहें।"
        ]
      },
      {
        h: "फ़ातिहा और अतिरिक्त तिलावत",
        p: "सूरह फ़ातिहा और अतिरिक्त तिलावत के नियम रकअत और नमाज़ के प्रकार के अनुसार लागू होते हैं। अपने फ़िक़्ही मत के अनुसार शिक्षक से सीखें।"
      },
      {
        h: "सही उच्चारण",
        p: "हिंदी या अंग्रेज़ी अक्षरों में अरबी उच्चारण पूरी तरह नहीं लिखा जा सकता। अच्छे क़ारी को सुनकर अभ्यास करें।"
      }
    ]
  ]
},

{
  id: "ruku",
  title: ["রুকু", "Ruku (Bowing)", "रुकू"],
  intro: [
    "রুকুর ভঙ্গি, তাসবিহ ও স্থিরতার গুরুত্ব জানুন।",
    "Learn the bowing posture, its remembrance and the importance of composure.",
    "रुकू की मुद्रा, तस्बीह और इत्मीनान का महत्व जानें।"
  ],
  s: [
    [
      {
        h: "রুকুর ভঙ্গি",
        p: "তাকবির বলে রুকুতে যান। সক্ষম হলে পিঠ যথাসম্ভব সোজা রাখুন এবং স্থির থাকুন।"
      },
      {
        h: "রুকুর তাসবিহ",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "সুবহানা রব্বিয়াল আযীম",
        meaning: "আমার মহান প্রতিপালক পবিত্র।"
      },
      {
        h: "রুকু থেকে ওঠা",
        p: "ইমাম, একাকী নামাজি ও মুক্তাদির ক্ষেত্রে উচ্চারণের কিছু বিধান আলাদা হতে পারে। সঠিক পদ্ধতি শিক্ষক থেকে শিখুন।"
      },
      {
        h: "সাধারণ ভুল",
        list: [
          "রুকুতে একেবারেই স্থির না থাকা।",
          "অতিরিক্ত তাড়াহুড়ো করা।",
          "পিঠ ও মাথার অবস্থানের প্রতি মনোযোগ না দেওয়া।"
        ]
      }
    ],
    [
      {
        h: "Bowing posture",
        p: "Move into ruku with the takbir. If able, keep the back reasonably straight and remain composed."
      },
      {
        h: "Remembrance in ruku",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "Subhana Rabbiyal-Azim",
        meaning: "Glory be to my Lord, the Magnificent."
      },
      {
        h: "Rising from ruku",
        p: "Some recitation rules differ for the imam, a person praying alone and a follower. Learn the correct method from a teacher."
      },
      {
        h: "Common mistakes",
        list: [
          "Not remaining composed in ruku.",
          "Rushing excessively.",
          "Neglecting the position of the back and head."
        ]
      }
    ],
    [
      {
        h: "रुकू की मुद्रा",
        p: "तकबीर कहकर रुकू में जाएँ। सक्षम हों तो पीठ को यथासंभव सीधा रखें और इत्मीनान से ठहरें।"
      },
      {
        h: "रुकू की तस्बीह",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "सुब्हाना रब्बियल अज़ीम",
        meaning: "मेरा महान पालनहार पवित्र है।"
      },
      {
        h: "रुकू से उठना",
        p: "इमाम, अकेले नमाज़ पढ़ने वाले और मुक़्तदी के कुछ नियम अलग हो सकते हैं। सही तरीका शिक्षक से सीखें।"
      },
      {
        h: "आम गलतियाँ",
        list: [
          "रुकू में इत्मीनान से न ठहरना।",
          "बहुत जल्दी करना।",
          "पीठ और सिर की स्थिति पर ध्यान न देना।"
        ]
      }
    ]
  ]
},

{
  id: "sujood",
  title: ["সিজদা", "Sujood (Prostration)", "सज्दा"],
  intro: [
    "সিজদার ভঙ্গি, তাসবিহ এবং দুই সিজদার মাঝখানে বসার পদ্ধতি শিখুন।",
    "Learn the prostration posture, its remembrance and the sitting between two prostrations.",
    "सज्दे की मुद्रा, तस्बीह और दोनों सज्दों के बीच बैठना सीखें।"
  ],
  s: [
    [
      {
        h: "সিজদার ভঙ্গি",
        p: "নিয়ম অনুযায়ী সিজদা করুন এবং শরীর স্থির রাখুন। কপাল ও নাক, দুই হাত, দুই হাঁটু এবং দুই পায়ের আঙুলের অবস্থান সম্পর্কে শিক্ষক থেকে ব্যবহারিকভাবে শিখুন।"
      },
      {
        h: "সিজদার তাসবিহ",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "সুবহানা রব্বিয়াল আ'লা",
        meaning: "আমার সর্বোচ্চ প্রতিপালক পবিত্র।"
      },
      {
        h: "দুই সিজদার মাঝখানে",
        p: "প্রথম সিজদা থেকে উঠে স্থিরভাবে বসুন, তারপর দ্বিতীয় সিজদা করুন। বসার ধরন শেখার সময় শিক্ষককে অনুসরণ করুন।"
      },
      {
        h: "সাধারণ ভুল",
        list: [
          "সিজদায় স্থির না থাকা।",
          "তাড়াহুড়ো করে পরের ভঙ্গিতে চলে যাওয়া।",
          "অক্ষমতার ক্ষেত্রে প্রযোজ্য ছাড় সম্পর্কে না জানা।"
        ]
      }
    ],
    [
      {
        h: "Prostration posture",
        p: "Perform sujood according to the prescribed method and remain composed. Learn the practical positioning of the forehead and nose, hands, knees and toes from a qualified teacher."
      },
      {
        h: "Remembrance in sujood",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subhana Rabbiyal-A'la",
        meaning: "Glory be to my Lord, the Most High."
      },
      {
        h: "Between the two prostrations",
        p: "Rise from the first prostration and sit calmly before performing the second. Follow a teacher to learn the sitting posture."
      },
      {
        h: "Common mistakes",
        list: [
          "Not remaining composed in sujood.",
          "Rushing into the next posture.",
          "Not learning the concessions applicable to inability."
        ]
      }
    ],
    [
      {
        h: "सज्दे की मुद्रा",
        p: "निर्धारित तरीके से सज्दा करें और इत्मीनान से ठहरें। माथे और नाक, दोनों हाथों, घुटनों और पैरों की उँगलियों की स्थिति शिक्षक से सीखें।"
      },
      {
        h: "सज्दे की तस्बीह",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "सुब्हाना रब्बियल आला",
        meaning: "मेरा सर्वोच्च पालनहार पवित्र है।"
      },
      {
        h: "दो सज्दों के बीच",
        p: "पहले सज्दे से उठकर इत्मीनान से बैठें, फिर दूसरा सज्दा करें। बैठने का तरीका शिक्षक से सीखें।"
      },
      {
        h: "आम गलतियाँ",
        list: [
          "सज्दे में इत्मीनान से न ठहरना।",
          "जल्दी से अगली मुद्रा में जाना।",
          "असमर्थता में लागू रियायतों को न जानना।"
        ]
      }
    ]
  ]
},
{
  id: "tashahhud",
  title: ["বৈঠক ও দোয়া", "Sitting and Tashahhud", "बैठक और तशह्हुद"],
  intro: [
    "নামাজের বৈঠক, তাশাহহুদ ও দরুদের স্থান সম্পর্কে প্রাথমিক ধারণা নিন।",
    "Learn the basics of sitting, tashahhud and the place of salawat in prayer.",
    "नमाज़ में बैठने, तशह्हुद और दरूद के स्थान की बुनियादी जानकारी लें।"
  ],
  s: [
    [
      {
        h: "বৈঠকের গুরুত্ব",
        p: "নামাজের নির্দিষ্ট রাকাতে বসা হয়। প্রথম ও শেষ বৈঠকের বিধান নামাজের ধরন ও ফিকহি মত অনুযায়ী শিখুন।"
      },
      {
        h: "তাশাহহুদ",
        p: "বৈঠকে তাশাহহুদ পড়া হয়। আরবি পাঠ, উচ্চারণ ও অর্থ নির্ভরযোগ্য কিতাব বা যোগ্য শিক্ষকের কাছ থেকে শুদ্ধভাবে শিখুন।"
      },
      {
        h: "দরুদ ও দোয়া",
        p: "শেষ বৈঠকে দরুদ এবং নির্ধারিত দোয়া পড়ার শিক্ষা নিন। পূর্ণ আরবি পাঠ যাচাই না করে মুখস্থ করবেন না।"
      },
      {
        h: "অনুশীলন",
        list: [
          "বৈঠকে শরীর স্থির রাখুন।",
          "তাশাহহুদ ধীরে ও শুদ্ধভাবে শিখুন।",
          "আরবি উচ্চারণ শিক্ষককে শুনিয়ে সংশোধন করুন।"
        ]
      }
    ],
    [
      {
        h: "Why sitting matters",
        p: "Sitting occurs at specified rakats. Learn the rulings of the first and final sitting according to the prayer type and your school of jurisprudence."
      },
      {
        h: "Tashahhud",
        p: "Tashahhud is recited while sitting. Learn its verified Arabic text, pronunciation and meaning from a reliable book or qualified teacher."
      },
      {
        h: "Salawat and supplication",
        p: "Learn the salawat and prescribed supplications for the final sitting. Do not memorise a full Arabic text without verifying it."
      },
      {
        h: "Practice",
        list: [
          "Remain composed while sitting.",
          "Learn tashahhud slowly and accurately.",
          "Ask a teacher to correct your pronunciation."
        ]
      }
    ],
    [
      {
        h: "बैठक का महत्व",
        p: "नमाज़ की निर्धारित रकअतों में बैठा जाता है। पहली और आख़िरी बैठक के नियम नमाज़ और फ़िक़्ही मत के अनुसार सीखें।"
      },
      {
        h: "तशह्हुद",
        p: "बैठकर तशह्हुद पढ़ा जाता है। इसका प्रमाणित अरबी पाठ, उच्चारण और अर्थ विश्वसनीय किताब या योग्य शिक्षक से सीखें।"
      },
      {
        h: "दरूद और दुआ",
        p: "आख़िरी बैठक में दरूद और निर्धारित दुआएँ सीखें। जाँचे बिना पूरा अरबी पाठ याद न करें।"
      },
      {
        h: "अभ्यास",
        list: [
          "बैठते समय इत्मीनान रखें।",
          "तशह्हुद धीरे और सही सीखें।",
          "शिक्षक से उच्चारण की जाँच कराएँ।"
        ]
      }
    ]
  ]
},

{
  id: "after-prayer",
  title: ["সালাম ও পরের আমল", "Salam and After-Prayer Practices", "सलाम और नमाज़ के बाद के अमल"],
  intro: [
    "নামাজ শেষ করার সালাম এবং পরবর্তী যিকির সম্পর্কে জানুন।",
    "Learn about ending prayer with salam and common remembrances afterward.",
    "सलाम के साथ नमाज़ समाप्त करना और उसके बाद के आम अज़कार सीखें।"
  ],
  s: [
    [
      {
        h: "সালাম",
        arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ",
        transliteration: "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ",
        meaning: "আপনাদের ওপর শান্তি ও আল্লাহর রহমত বর্ষিত হোক।",
        note: "সালামের সংখ্যা ও পদ্ধতি নিজের ফিকহি শিক্ষার সঙ্গে মিলিয়ে শিখুন।"
      },
      {
        h: "নামাজের পর",
        p: "নামাজের পর আল্লাহর যিকির, ইস্তিগফার ও দোয়া করা প্রচলিত সুন্নত আমলের অন্তর্ভুক্ত। নির্দিষ্ট সংখ্যা ও পাঠ নির্ভরযোগ্য সূত্র থেকে শিখুন।"
      },
      {
        h: "আদব",
        list: [
          "নামাজ শেষ করে কিছু সময় যিকিরে মনোযোগ দিন।",
          "অন্যের ইবাদতে বিঘ্ন সৃষ্টি করবেন না।",
          "দোয়া আন্তরিকভাবে করুন।"
        ]
      }
    ],
    [
      {
        h: "Salam",
        arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ",
        transliteration: "Assalamu alaikum wa rahmatullah",
        meaning: "Peace and the mercy of Allah be upon you.",
        note: "Learn the number and method of salam according to your school of jurisprudence."
      },
      {
        h: "After prayer",
        p: "Remembrance of Allah, seeking forgiveness and supplication after prayer are common devotional practices. Learn specific texts and counts from reliable sources."
      },
      {
        h: "Etiquette",
        list: [
          "Spend a little time in remembrance after prayer.",
          "Do not disturb others who are worshipping.",
          "Make supplication sincerely."
        ]
      }
    ],
    [
      {
        h: "सलाम",
        arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ",
        transliteration: "अस्सलामु अलैकुम व रहमतुल्लाह",
        meaning: "आप पर सलामती और अल्लाह की रहमत हो।",
        note: "अपने फ़िक़्ही मत के अनुसार सलाम की संख्या और तरीका सीखें।"
      },
      {
        h: "नमाज़ के बाद",
        p: "नमाज़ के बाद अल्लाह का ज़िक्र, इस्तिग़फ़ार और दुआ आम इबादतों में शामिल हैं। विशेष पाठ और संख्या विश्वसनीय स्रोत से सीखें।"
      },
      {
        h: "आदाब",
        list: [
          "नमाज़ के बाद कुछ समय ज़िक्र करें।",
          "दूसरे इबादत करने वालों को परेशान न करें।",
          "दिल से दुआ करें।"
        ]
      }
    ]
  ]
},

{
  id: "complete",
  title: ["সম্পূর্ণ নামাজ", "A Complete Prayer", "पूरी नमाज़"],
  intro: [
    "নামাজের সাধারণ ধারাবাহিকতা একসঙ্গে দেখে অনুশীলন করুন।",
    "Review the general sequence of prayer as one complete practice.",
    "नमाज़ के सामान्य क्रम को एक साथ देखकर अभ्यास करें।"
  ],
  s: [
    [
      {
        h: "নামাজের সাধারণ ধাপ",
        list: [
          "ওজু ও অন্যান্য শর্ত যাচাই করুন।",
          "কিবলামুখী হয়ে অন্তরে নিয়ত করুন।",
          "তাকবিরে তাহরিমা বলে দাঁড়ান।",
          "কিয়াম অবস্থায় নির্ধারিত কিরাত পড়ুন।",
          "রুকু করুন এবং স্থির থাকুন।",
          "রুকু থেকে উঠে সোজা হয়ে দাঁড়ান।",
          "দুই সিজদা করুন; মাঝখানে স্থিরভাবে বসুন।",
          "পরবর্তী রাকাতগুলো সম্পন্ন করুন।",
          "শেষ বৈঠকে তাশাহহুদ, দরুদ ও প্রযোজ্য দোয়া পড়ুন।",
          "সালাম দিয়ে নামাজ শেষ করুন।"
        ]
      },
      {
        h: "রাকাত অনুযায়ী পার্থক্য",
        p: "দুই, তিন ও চার রাকাতের নামাজে বৈঠক ও কিরাতের বিবরণ এক নয়। ফরজ, সুন্নত, নফল ও বিতরের পদ্ধতিও কিছু ক্ষেত্রে আলাদা।"
      },
      {
        h: "শেখার পদ্ধতি",
        list: [
          "একজন যোগ্য শিক্ষকের সামনে নামাজের ভঙ্গিগুলো অনুশীলন করুন।",
          "আরবি পাঠ ও উচ্চারণ আলাদাভাবে যাচাই করুন।",
          "নিজের মাজহাব অনুযায়ী প্রয়োজনীয় নিয়ম শিখুন।"
        ]
      }
    ],
    [
      {
        h: "General sequence",
        list: [
          "Check wudu and the other conditions.",
          "Face the Qibla and intend the prayer.",
          "Say the opening takbir and stand.",
          "Recite the prescribed verses while standing.",
          "Bow in ruku and remain composed.",
          "Rise fully from ruku.",
          "Perform two prostrations, sitting calmly between them.",
          "Complete the remaining rakats.",
          "In the final sitting, recite tashahhud, salawat and the applicable supplication.",
          "End the prayer with salam."
        ]
      },
      {
        h: "Differences by rakat",
        p: "The sitting and recitation details differ between two-, three- and four-rakat prayers. Some details also differ for fard, sunnah, nafl and witr."
      },
      {
        h: "How to learn",
        list: [
          "Practise the postures with a qualified teacher.",
          "Verify Arabic text and pronunciation separately.",
          "Learn the relevant rules of your school."
        ]
      }
    ],
    [
      {
        h: "नमाज़ का सामान्य क्रम",
        list: [
          "वुज़ू और अन्य शर्तें जाँचें।",
          "क़िबला की ओर होकर दिल में नीयत करें।",
          "तकबीर-ए-तहरीमा कहकर खड़े हों।",
          "खड़े होकर निर्धारित तिलावत करें।",
          "रुकू करें और इत्मीनान से ठहरें।",
          "रुकू से उठकर सीधे खड़े हों।",
          "दो सज्दे करें और बीच में बैठें।",
          "बाक़ी रकअतें पूरी करें।",
          "आख़िरी बैठक में तशह्हुद, दरूद और संबंधित दुआ पढ़ें।",
          "सलाम के साथ नमाज़ समाप्त करें।"
        ]
      },
      {
        h: "रकअत के अनुसार अंतर",
        p: "दो, तीन और चार रकअत की नमाज़ों में बैठक और तिलावत का विवरण अलग होता है। फ़र्ज़, सुन्नत, नफ़्ल और वितर के कुछ नियम भी अलग हैं।"
      },
      {
        h: "सीखने का तरीका",
        list: [
          "योग्य शिक्षक के साथ नमाज़ की मुद्राओं का अभ्यास करें।",
          "अरबी पाठ और उच्चारण अलग से जाँचें।",
          "अपने फ़िक़्ही मत के आवश्यक नियम सीखें।"
        ]
      }
    ]
  ]
},
 {
  id: "mistakes",
  title: ["ভুল ও সংশোধন", "Mistakes and Corrections", "गलतियाँ और सुधार"],
  intro: [
    "নামাজে সাধারণ ভুলগুলো চিনুন এবং প্রয়োজন হলে সঠিকভাবে সংশোধন শিখুন।",
    "Recognise common prayer mistakes and learn how to address them correctly.",
    "नमाज़ की आम गलतियों को पहचानें और सही सुधार सीखें।"
  ],
  s: [
    [
      {
        h: "সাধারণ ভুল",
        list: [
          "রুকু ও সিজদায় তাড়াহুড়ো করা।",
          "রুকু থেকে উঠে পুরোপুরি সোজা না হওয়া।",
          "সিজদার মাঝখানে স্থিরভাবে না বসা।",
          "আরবি পাঠ ভুল উচ্চারণ করা।",
          "নামাজের শর্ত যাচাই না করা।"
        ]
      },
      {
        h: "ভুল হলে কী করবেন?",
        p: "ভুলের ধরন অনুযায়ী বিধান আলাদা। কোনো ওয়াজিব ভুলে ছুটে যাওয়া, রাকাত নিয়ে সন্দেহ হওয়া বা ফরজ বাদ পড়ার ক্ষেত্রে একই সমাধান প্রযোজ্য নয়।"
      },
      {
        h: "সাহু সিজদা",
        p: "কিছু ভুলের জন্য সাহু সিজদা প্রয়োজন হতে পারে। কখন, কীভাবে এবং কোন ভুলে এটি করতে হয়, তা নিজের মাজহাব অনুযায়ী যোগ্য শিক্ষকের কাছ থেকে শিখুন।"
      },
      {
        h: "সতর্কতা",
        p: "প্রতিটি ছোট সন্দেহকে নিশ্চিত ভুল মনে করবেন না। নামাজ ভেঙে গেছে বলে সিদ্ধান্ত নেওয়ার আগে নির্ভরযোগ্য আলেমের পরামর্শ নিন।"
      }
    ],
    [
      {
        h: "Common mistakes",
        list: [
          "Rushing through ruku and sujood.",
          "Not standing fully upright after ruku.",
          "Not sitting calmly between prostrations.",
          "Mispronouncing Arabic recitation.",
          "Not checking the conditions of prayer."
        ]
      },
      {
        h: "What if a mistake occurs?",
        p: "The ruling depends on the type of mistake. Forgetting a wajib act, doubting the number of rakats and omitting a fard act do not all have the same remedy."
      },
      {
        h: "Prostrations of forgetfulness",
        p: "Some mistakes may require prostrations of forgetfulness. Learn when and how to perform them according to your school from a qualified teacher."
      },
      {
        h: "Caution",
        p: "Do not treat every minor doubt as a confirmed mistake. Consult a reliable scholar before deciding that a prayer is invalid."
      }
    ],
    [
      {
        h: "आम गलतियाँ",
        list: [
          "रुकू और सज्दे में जल्दबाज़ी करना।",
          "रुकू से उठकर पूरी तरह सीधा न होना।",
          "दो सज्दों के बीच इत्मीनान से न बैठना।",
          "अरबी तिलावत का गलत उच्चारण करना।",
          "नमाज़ की शर्तें न जाँचना।"
        ]
      },
      {
        h: "गलती हो जाए तो?",
        p: "नियम गलती के प्रकार पर निर्भर करता है। वाजिब भूलना, रकअतों की संख्या में संदेह होना और फ़र्ज़ छूटना—इन सबका समाधान एक जैसा नहीं है।"
      },
      {
        h: "सज्दा-ए-सहव",
        p: "कुछ गलतियों पर सज्दा-ए-सहव आवश्यक हो सकता है। कब और कैसे करना है, अपने फ़िक़्ही मत के अनुसार योग्य शिक्षक से सीखें।"
      },
      {
        h: "सावधानी",
        p: "हर छोटे संदेह को पक्की गलती न समझें। नमाज़ को अमान्य मानने से पहले भरोसेमंद आलिम से पूछें।"
      }
    ]
  ]
},

{
  id: "jamaat-special",
  title: ["জামাত ও বিশেষ নামাজ", "Congregational and Special Prayers", "जमाअत और विशेष नमाज़ें"],
  intro: [
    "জামাতে নামাজ, মুসাফিরের নামাজ এবং কিছু বিশেষ নামাজের প্রাথমিক পরিচয়।",
    "An introduction to congregational prayer, prayer while travelling and selected special prayers.",
    "जमाअत, सफ़र की नमाज़ और कुछ विशेष नमाज़ों का परिचय।"
  ],
  s: [
    [
      {
        h: "জামাতে নামাজ",
        p: "ইমামকে অনুসরণ করুন এবং তাঁর আগে রুকু বা সিজদায় যাবেন না। ইমামের পেছনে কিরাতের বিধান মাজহাব অনুযায়ী শিখুন।"
      },
      {
        h: "সফরে নামাজ",
        p: "শরিয়তসম্মত সফরে নির্দিষ্ট শর্তে চার রাকাত ফরজ নামাজ কসর করে দুই রাকাত পড়ার বিধান আছে। সফরের দূরত্ব ও অবস্থানের বিস্তারিত বিধান মাজহাবভেদে ভিন্ন হতে পারে।"
      },
      {
        h: "জুমার নামাজ",
        p: "জুমার নামাজের জন্য বিশেষ শর্ত ও নিয়ম রয়েছে। স্থানীয় মসজিদ ও যোগ্য আলেমের কাছ থেকে সঠিক পদ্ধতি শিখুন।"
      },
      {
        h: "জানাজার নামাজ",
        p: "জানাজার নামাজে রুকু ও সিজদা নেই। এতে তাকবির, দোয়া ও সালামের নির্দিষ্ট পদ্ধতি রয়েছে; ব্যবহারিকভাবে শিক্ষক থেকে শিখুন।"
      },
      {
        h: "তারাবি ও বিতর",
        p: "রমজানে তারাবি পড়া হয়। বিতরের রাকাত ও পদ্ধতিতে মাজহাবভেদে পার্থক্য আছে; নিজের অনুসৃত ফিকহি মত অনুযায়ী শিখুন।"
      },
      {
        h: "সাধারণ নিয়ম",
        list: [
          "ইমামের নির্দেশ ও জামাতের শৃঙ্খলা বজায় রাখুন।",
          "দেরিতে জামাতে যোগ দিলে কীভাবে বাকি রাকাত পূরণ করতে হয় শিখুন।",
          "বিশেষ নামাজের নিয়ম নির্ভরযোগ্য সূত্র থেকে যাচাই করুন।"
        ]
      }
    ],
    [
      {
        h: "Congregational prayer",
        p: "Follow the imam and do not move into ruku or sujood before the imam. Learn the rules of recitation behind the imam according to your school."
      },
      {
        h: "Prayer while travelling",
        p: "Under specified conditions during a qualifying journey, four-rakat obligatory prayers may be shortened to two. Details such as distance and duration vary by school."
      },
      {
        h: "Friday prayer",
        p: "Friday prayer has specific conditions and rules. Learn the correct practice from a local mosque or qualified scholar."
      },
      {
        h: "Funeral prayer",
        p: "The funeral prayer does not include ruku or sujood. It has a specific sequence of takbirs, supplications and salam; learn it practically from a teacher."
      },
      {
        h: "Tarawih and witr",
        p: "Tarawih is performed during Ramadan. The number of rakats and method of witr differ between schools; follow reliable guidance for your school."
      },
      {
        h: "General guidance",
        list: [
          "Follow the imam and maintain congregational discipline.",
          "Learn how to complete remaining rakats when joining late.",
          "Verify special-prayer rulings through reliable sources."
        ]
      }
    ],
    [
      {
        h: "जमाअत की नमाज़",
        p: "इमाम का पालन करें और उनसे पहले रुकू या सज्दे में न जाएँ। इमाम के पीछे क़िरात के नियम अपने फ़िक़्ही मत के अनुसार सीखें।"
      },
      {
        h: "सफ़र की नमाज़",
        p: "निर्धारित शर्तों वाले सफ़र में चार रकअत फ़र्ज़ नमाज़ को दो रकअत पढ़ने की रियायत है। दूरी और ठहरने की अवधि के नियम मत के अनुसार अलग हो सकते हैं।"
      },
      {
        h: "जुमे की नमाज़",
        p: "जुमे की नमाज़ की विशेष शर्तें और नियम हैं। स्थानीय मस्जिद या योग्य आलिम से सही तरीका सीखें।"
      },
      {
        h: "जनाज़े की नमाज़",
        p: "जनाज़े की नमाज़ में रुकू और सज्दा नहीं होता। इसमें तकबीर, दुआ और सलाम का निर्धारित तरीका है; शिक्षक से अभ्यास करें।"
      },
      {
        h: "तरावीह और वितर",
        p: "रमज़ान में तरावीह पढ़ी जाती है। वितर की रकअतों और तरीके में फ़िक़्ही मतों के अनुसार अंतर है।"
      },
      {
        h: "सामान्य मार्गदर्शन",
        list: [
          "इमाम का पालन करें और जमाअत का अनुशासन बनाए रखें।",
          "देर से शामिल होने पर बाक़ी रकअतें पूरी करना सीखें।",
          "विशेष नमाज़ों के नियम विश्वसनीय स्रोत से जाँचें।"
        ]
      }
    ]
  ]
}
];

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined && text !== null) {
    node.textContent = String(text);
  }
  return node;
}

function labelled(parent, cls, label, value) {
  const box = el("div", cls);
  box.appendChild(el("strong", "", label + ": "));
  box.appendChild(document.createTextNode(String(value)));
  parent.appendChild(box);
}

function makeTable(parent, data) {
  const wrapper = el("div", "table-wrapper");
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  data.headers.forEach(value => {
    headerRow.appendChild(el("th", "", value));
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.rows.forEach(row => {
    const tr = document.createElement("tr");

    row.forEach(value => {
      tr.appendChild(el("td", "", value));
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  parent.appendChild(wrapper);
}

function renderSection(parent, data) {
  const box = el("section", "lesson-section");

  if (data.h) box.appendChild(el("h2", "", data.h));
  if (data.p) box.appendChild(el("p", "", data.p));

  if (data.arabic) {
    box.appendChild(el("h3", "", ui.arabic));

    const arabic = el("p", "arabic", data.arabic);
    arabic.dir = "rtl";
    arabic.lang = "ar";
    box.appendChild(arabic);
  }

  if (data.transliteration) {
    labelled(box, "transliteration", ui.pron, data.transliteration);
  }

  if (data.meaning) {
    labelled(box, "meaning", ui.meaning, data.meaning);
  }

  if (data.list) {
    const list = document.createElement("ul");

    data.list.forEach(value => {
      list.appendChild(el("li", "", value));
    });

    box.appendChild(list);
  }

  if (data.table) makeTable(box, data.table);

  if (data.note) {
    labelled(box, "note-box", ui.note, data.note);
  }

  if (data.warning) {
    labelled(box, "warning", ui.important, data.warning);
  }

  parent.appendChild(box);
}

function getLesson(value) {
  if (!value) return T[0];

  const key = String(value).trim().toLowerCase();
  const match = T.find(item => item.id === key);

  if (match) return match;

  if (/^\d+$/.test(key)) {
    const index = Number(key);
    if (index >= 1 && index <= T.length) {
      return T[index - 1];
    }
  }

  return null;
}

function renderLesson(item) {
  const languageIndex = supported.indexOf(lang);
  const topicIndex = T.findIndex(entry => entry.id === item.id);

  titleEl.textContent = item.title[languageIndex] || item.title[0];
  numberEl.textContent =
    `${ui.topic} ${n(topicIndex + 1)} / ${n(T.length)}`;

  introEl.textContent = item.intro[languageIndex] || item.intro[0];

  contentEl.replaceChildren();
  contentEl.setAttribute("aria-busy", "true");

  const sections = item.s[languageIndex] || item.s[0];
  sections.forEach(data => renderSection(contentEl, data));

  labelled(contentEl, "note-box", ui.important, ui.disclaimer);

  contentEl.setAttribute("aria-busy", "false");
  document.title = `${titleEl.textContent} | IBADAT`;
}

const selectedLesson = getLesson(params.get("topic"));

if (selectedLesson) {
  renderLesson(selectedLesson);
} else {
  titleEl.textContent = ui.missing;
  numberEl.textContent = ui.topic;
  introEl.textContent = ui.missing;

  contentEl.replaceChildren(
    el("p", "note-box", ui.missing)
  );

  labelled(contentEl, "note-box", ui.important, ui.disclaimer);

  contentEl.setAttribute("aria-busy", "false");
  document.title = `${ui.missing} | IBADAT`;
}

console.info("IBADAT Namaz detail loaded", {
  lang,
  topic: selectedLesson ? selectedLesson.id : null,
  totalTopics: T.length,
  darkMode: settings.dark === true
});

})();  
