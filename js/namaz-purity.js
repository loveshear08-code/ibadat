/* IBADAT — Purification lesson
   File: js/namaz-purity.js
   Language: Bengali / English / Hindi
*/
(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const supported = ["bn", "en", "hi"];

  const params = new URLSearchParams(location.search);
  let settings = {};

  try {
    settings = JSON.parse(localStorage.getItem("appSettings") || "{}") || {};
  } catch (_) {}

  const digitMap = {
    bn: "০১২৩৪৫৬৭৮৯",
    en: "0123456789",
    hi: "०१२३४५६७८९"
  };

  const number = (value, lang) =>
    String(value).replace(/[0-9]/g, d => digitMap[lang][Number(d)]);

  const UI = {
    bn: {
      back: "ফিরে যান",
      languageLabel: "ভাষা নির্বাচন",
      eyebrow: "নামাজ শিক্ষা · প্রথম অধ্যায়",
      title: "পাক-পবিত্রতা",
      heroDescription: "নামাজের আগে শরীর, পোশাক ও স্থান পবিত্র রাখা এবং পবিত্রতা অর্জনের নিয়ম শিখুন।",
      lessonCount: "১০টি অধ্যায়",
      indexTitle: "এই অধ্যায়ে যা শিখবেন",
      indexDescription: "যেকোনো শিরোনামে চাপ দিলে সেই অংশে যেতে পারবেন। পুরো পাঠ একই পেজে রয়েছে।",
      quizEyebrow: "নিজেকে যাচাই করুন",
      quizTitle: "পাক-পবিত্রতা কুইজ",
      quizDescription: "অধ্যায়গুলো পড়ে প্রশ্নগুলোর উত্তর দিন।",
      checkAnswers: "উত্তর যাচাই করুন",
      checklistTitle: "নামাজের আগে পবিত্রতা যাচাই",
      checklistDescription: "নামাজের প্রস্তুতির সময় এই তালিকাটি ব্যবহার করুন।",
      completionTitle: "প্রথম অধ্যায় সম্পূর্ণ?",
      completionDescription: "পড়া শেষ হলে পরের বিষয় ওজু শিখতে এগিয়ে যান।",
      nextLesson: "পরবর্তী অধ্যায়: ওজু",
      allLessons: "সব নামাজ শিক্ষার বিষয়",
      backToTop: "↑",
      footerText: "ইবাদত শিখুন, বুঝে আমল করুন",
      read: "পড়েছি",
      source: "সূত্র ও সতর্কতা",
      important: "মনে রাখুন",
      example: "বাস্তব উদাহরণ",
      warning: "সতর্কতা",
      question: "প্রশ্ন",
      correct: "সঠিক উত্তর!",
      incorrect: "সঠিক উত্তরটি দেখুন:",
      score: "আপনার ফলাফল",
      completed: "অধ্যায় পড়ার অগ্রগতি",
      quizEmpty: "প্রতিটি প্রশ্নের একটি করে উত্তর নির্বাচন করুন।",
      checklist: [
        "শরীর ও পোশাকের পবিত্রতা নিশ্চিত করেছি।",
        "নামাজের স্থান পরিষ্কার আছে।",
        "প্রয়োজনীয় ওজু বা গোসল সম্পন্ন করেছি।",
        "প্রয়োজনীয় সতর ঢাকা আছে।",
        "নামাজের ওয়াক্ত ও কিবলা যাচাই করেছি।"
      ],
      quiz: [
        {
          q: "নামাজের আগে কোন বিষয়গুলো পবিত্র রাখা জরুরি?",
          options: [
            "শুধু জায়নামাজ",
            "শরীর, পোশাক ও নামাজের স্থান",
            "শুধু হাত"
          ],
          answer: 1,
          explanation: "নামাজের আগে শরীর, পোশাক ও নামাজের স্থানের প্রয়োজনীয় পবিত্রতা নিশ্চিত করতে হয়।"
        },
        {
          q: "হাদাস ও নাজাসাত কি একই জিনিস?",
          options: [
            "হ্যাঁ, দুটির অর্থ এক",
            "না, দুটির বিধান আলাদা",
            "শুধু পোশাকের ক্ষেত্রে আলাদা"
          ],
          answer: 1,
          explanation: "হাদাস পবিত্রতার একটি অবস্থা; নাজাসাত হলো নির্দিষ্ট অপবিত্র বস্তু।"
        },
        {
          q: "শুধু সন্দেহ হলে কি পোশাককে নিশ্চিত নাপাক বলতে হবে?",
          options: [
            "হ্যাঁ, সব সময়",
            "না, শুধু সন্দেহকে নিশ্চিত ঘটনা ধরে নেওয়া উচিত নয়",
            "সব পোশাক ধুতে হবে"
          ],
          answer: 1,
          explanation: "সন্দেহ ও নিশ্চিত জ্ঞানের পার্থক্য আছে। নির্দিষ্ট পরিস্থিতির বিধান জানতে যোগ্য আলেমের পরামর্শ নিন।"
        },
        {
          q: "ওজুর সম্পূর্ণ ধাপ এই অধ্যায়ের প্রধান বিষয় কি?",
          options: [
            "হ্যাঁ, এখানেই সব ধাপ বিস্তারিত থাকবে",
            "না, এখানে প্রাথমিক পরিচয়; সম্পূর্ণ ওজুর জন্য দ্বিতীয় অধ্যায়",
            "ওজুর সঙ্গে পবিত্রতার কোনো সম্পর্ক নেই"
          ],
          answer: 1,
          explanation: "এই অধ্যায়ে পবিত্রতার সামগ্রিক ধারণা থাকবে। ওজুর বিস্তারিত পদ্ধতি আলাদা অধ্যায়ে শেখানো হবে।"
        },
        {
          q: "ধর্মীয় বিধানে মতপার্থক্য থাকলে কী করা উচিত?",
          options: [
            "যাচাই না করে যেকোনো মত গ্রহণ করা",
            "বিশ্বস্ত সূত্র ও যোগ্য আলেমের কাছে যাচাই করা",
            "সব বিধান একই ধরে নেওয়া"
          ],
          answer: 1,
          explanation: "মতপার্থক্য থাকলে নিজের অনুসৃত ফিকহি মত অনুযায়ী যোগ্য আলেমের কাছে যাচাই করা ভালো।"
        }
      ]
    },

    en: {
      back: "Back",
      languageLabel: "Choose language",
      eyebrow: "Prayer learning · Chapter 1",
      title: "Purification",
      heroDescription: "Learn how to maintain the required purity of your body, clothing and prayer area before salah.",
      lessonCount: "10 sections",
      indexTitle: "What you will learn",
      indexDescription: "Select a heading to jump to that section. The entire lesson is on this page.",
      quizEyebrow: "Test yourself",
      quizTitle: "Purification quiz",
      quizDescription: "Read the sections and answer the questions.",
      checkAnswers: "Check answers",
      checklistTitle: "Purity checklist before prayer",
      checklistDescription: "Use this checklist when preparing for prayer.",
      completionTitle: "Finished the first chapter?",
      completionDescription: "When ready, continue to the next topic: Wudu.",
      nextLesson: "Next chapter: Wudu",
      allLessons: "All prayer lessons",
      backToTop: "↑",
      footerText: "Learn worship with understanding",
      read: "Read",
      source: "Sources and caution",
      important: "Remember",
      example: "Practical example",
      warning: "Caution",
      question: "Question",
      correct: "Correct!",
      incorrect: "Correct answer:",
      score: "Your result",
      completed: "Reading progress",
      quizEmpty: "Choose one answer for every question.",
      checklist: [
        "I have checked the required purity of my body and clothing.",
        "The prayer area is clean.",
        "I have performed the required wudu or ghusl.",
        "The required parts of the body are covered.",
        "I have checked the prayer time and Qibla."
      ],
      quiz: [
        {
          q: "What must be kept ritually pure before prayer?",
          options: [
            "Only the prayer mat",
            "The body, clothing and prayer area",
            "Only the hands"
          ],
          answer: 1,
          explanation: "The required purity of the body, clothing and prayer area must be observed."
        },
        {
          q: "Are hadath and najasah the same thing?",
          options: [
            "Yes, they mean the same thing",
            "No, they refer to different matters",
            "They differ only for clothing"
          ],
          answer: 1,
          explanation: "Hadath is a state requiring ritual purification; najasah is a defined impure substance."
        },
        {
          q: "Does mere doubt always make clothing impure?",
          options: [
            "Yes, always",
            "No, doubt should not automatically be treated as certainty",
            "All clothing must be washed"
          ],
          answer: 1,
          explanation: "Doubt and established knowledge are different. Ask a qualified scholar about specific cases."
        },
        {
          q: "Is the complete procedure of wudu the main focus here?",
          options: [
            "Yes, every step is covered here",
            "No, this chapter introduces it; the next chapter covers wudu in detail",
            "Wudu has no connection with purification"
          ],
          answer: 1,
          explanation: "This chapter covers the overall concept of purity. Detailed wudu instruction belongs in the next chapter."
        },
        {
          q: "What should you do when a religious ruling differs between schools?",
          options: [
            "Accept any claim without checking",
            "Check reliable sources and consult a qualified scholar",
            "Assume every ruling is identical"
          ],
          answer: 1,
          explanation: "Consult a qualified scholar and follow reliable guidance for your school of jurisprudence."
        }
      ]
    },

    hi: {
      back: "वापस जाएँ",
      languageLabel: "भाषा चुनें",
      eyebrow: "नमाज़ की शिक्षा · पहला अध्याय",
      title: "पाकी और पवित्रता",
      heroDescription: "नमाज़ से पहले शरीर, कपड़ों और नमाज़ की जगह की आवश्यक पाकी के नियम सीखें।",
      lessonCount: "१० अध्याय",
      indexTitle: "इस अध्याय में क्या सीखेंगे",
      indexDescription: "किसी शीर्षक पर दबाएँ और उस भाग पर जाएँ। पूरा पाठ इसी पेज पर है।",
      quizEyebrow: "अपनी जानकारी जाँचें",
      quizTitle: "पाकी की प्रश्नोत्तरी",
      quizDescription: "अध्याय पढ़कर प्रश्नों के उत्तर दें।",
      checkAnswers: "उत्तर जाँचें",
      checklistTitle: "नमाज़ से पहले पाकी की जाँच",
      checklistDescription: "नमाज़ की तैयारी में इस सूची का उपयोग करें।",
      completionTitle: "पहला अध्याय पूरा हुआ?",
      completionDescription: "पढ़ने के बाद अगला विषय वुज़ू सीखें।",
      nextLesson: "अगला अध्याय: वुज़ू",
      allLessons: "नमाज़ के सभी पाठ",
      backToTop: "↑",
      footerText: "इबादत को समझकर सीखें",
      read: "पढ़ लिया",
      source: "स्रोत और सावधानी",
      important: "याद रखें",
      example: "व्यावहारिक उदाहरण",
      warning: "सावधानी",
      question: "प्रश्न",
      correct: "सही उत्तर!",
      incorrect: "सही उत्तर:",
      score: "आपका परिणाम",
      completed: "पढ़ने की प्रगति",
      quizEmpty: "हर प्रश्न के लिए एक उत्तर चुनें।",
      checklist: [
        "मैंने शरीर और कपड़ों की आवश्यक पाकी जाँची है।",
        "नमाज़ की जगह साफ़ है।",
        "मैंने आवश्यक वुज़ू या ग़ुस्ल किया है।",
        "आवश्यक अंग ढके हुए हैं।",
        "मैंने नमाज़ का वक़्त और क़िबला जाँचा है।"
      ],
      quiz: [
        {
          q: "नमाज़ से पहले किन चीज़ों की आवश्यक पाकी का ध्यान रखना चाहिए?",
          options: [
            "केवल जानमाज़",
            "शरीर, कपड़े और नमाज़ की जगह",
            "केवल हाथ"
          ],
          answer: 1,
          explanation: "नमाज़ से पहले शरीर, कपड़े और जगह की आवश्यक पाकी का ध्यान रखना चाहिए।"
        },
        {
          q: "क्या हदस और नजासत एक ही चीज़ हैं?",
          options: [
            "हाँ, दोनों का अर्थ एक है",
            "नहीं, दोनों अलग विषय हैं",
            "केवल कपड़ों में अंतर है"
          ],
          answer: 1,
          explanation: "हदस पाकी की एक अवस्था है; नजासत निर्धारित अपवित्र वस्तु है।"
        },
        {
          q: "क्या केवल संदेह से कपड़े को निश्चित रूप से नापाक मानना चाहिए?",
          options: [
            "हाँ, हमेशा",
            "नहीं, केवल संदेह को निश्चित घटना नहीं मानना चाहिए",
            "सभी कपड़े धोने चाहिए"
          ],
          answer: 1,
          explanation: "संदेह और निश्चित जानकारी अलग हैं। विशेष स्थिति में योग्य आलिम से पूछें।"
        },
        {
          q: "क्या वुज़ू की पूरी विधि इसी अध्याय का मुख्य विषय है?",
          options: [
            "हाँ, सभी चरण यहीं हैं",
            "नहीं, यहाँ परिचय है; अगले अध्याय में विस्तार है",
            "वुज़ू का पाकी से संबंध नहीं है"
          ],
          answer: 1,
          explanation: "यह अध्याय पाकी की समग्र जानकारी देता है। वुज़ू की पूरी विधि अगले अध्याय में होगी।"
        },
        {
          q: "फ़िक़्ही मतों में अंतर हो तो क्या करना चाहिए?",
          options: [
            "बिना जाँच किसी भी दावे को मानना",
            "विश्वसनीय स्रोत और योग्य आलिम से जाँच करना",
            "सभी नियम एक जैसे मानना"
          ],
          answer: 1,
          explanation: "अपने फ़िक़्ही मत के अनुसार विश्वसनीय मार्गदर्शन और योग्य आलिम से सलाह लें।"
        }
      ]
    }
  };

  const lessons = {
    bn: [
      {
        title: "পবিত্রতার পরিচয় ও গুরুত্ব",
        intro: "পবিত্রতা শুধু পরিষ্কার দেখানোর বিষয় নয়; নামাজের জন্য নির্দিষ্ট পবিত্রতার বিধানও রয়েছে।",
        parts: [
          ["পবিত্রতা বলতে কী বোঝায়", "পবিত্রতার সাধারণ অর্থ পরিচ্ছন্নতা। ইসলামী ইবাদতে এর পাশাপাশি শরিয়ত নির্ধারিত পবিত্রতার শর্তও রয়েছে। তাই কোনো জিনিস দেখতে পরিষ্কার হলেই সব পরিস্থিতিতে সেটি শরিয়তসম্মতভাবে পবিত্র—এমন সিদ্ধান্ত দেওয়া যায় না।"],
          ["নামাজের সঙ্গে সম্পর্ক", "নামাজের আগে শরীর, পোশাক ও নামাজের স্থানের প্রয়োজনীয় পবিত্রতা নিশ্চিত করতে হয়। পরিস্থিতি অনুযায়ী ওজু বা গোসলেরও প্রয়োজন হতে পারে।"],
          ["দৈনন্দিন জীবনে", "পরিচ্ছন্ন পোশাক ব্যবহার করা, ব্যক্তিগত পরিচ্ছন্নতা বজায় রাখা, পানি অপচয় না করা এবং নামাজের স্থান পরিষ্কার রাখা ভালো অভ্যাস।"],
          ["মনে রাখুন", "সাধারণ পরিচ্ছন্নতা ও ফিকহি পবিত্রতা সম্পর্কিত হলেও সব সময় এক বিষয় নয়। নির্দিষ্ট মাসআলা নির্ভরযোগ্য শিক্ষকের কাছ থেকে শিখুন।"]
        ]
      },
      {
        title: "শরীরের পবিত্রতা",
        intro: "শরীরে নাপাকি লাগলে পরিস্থিতি অনুযায়ী তা দূর করতে হবে।",
        parts: [
          ["নাপাকি লাগলে", "শরীরে নিশ্চিতভাবে নাপাকি লাগলে আক্রান্ত স্থান যথাযথভাবে পরিষ্কার করুন। শুধু সন্দেহ বা অকারণ চিন্তার কারণে নিজেকে অপবিত্র মনে করবেন না।"],
          ["ব্যক্তিগত পরিচ্ছন্নতা", "প্রস্রাব-পায়খানার পর পরিচ্ছন্ন হওয়া জরুরি। পানি দিয়ে পরিষ্কারের নিয়ম এবং বিকল্প ব্যবহারের শর্ত নির্ভরযোগ্য ফিকহি শিক্ষার মাধ্যমে শিখুন।"],
          ["পরিষ্কার করার পদ্ধতি", "যেখানে নাপাকি লেগেছে, সেই স্থান পরিষ্কার করুন। কীভাবে ও কতটুকু পরিষ্কার করতে হবে, তা নাপাকির ধরন ও প্রযোজ্য ফিকহি বিধানের ওপর নির্ভর করতে পারে।"],
          ["বাস্তব উদাহরণ", "হাতে নিশ্চিত নাপাকি লাগলে হাতের আক্রান্ত অংশ পরিষ্কার করুন। শুধু মনে হলো কিছু লেগেছে—এমন সন্দেহকে নিশ্চিত ঘটনা ধরে বারবার ধোয়ার দরকার নেই।"]
        ]
      },
      {
        title: "পোশাকের পবিত্রতা",
        intro: "নামাজের পোশাকে নাপাকি থাকলে তা প্রযোজ্য নিয়মে দূর করতে হবে।",
        parts: [
          ["পোশাক পরীক্ষা", "নামাজের আগে পোশাকে নিশ্চিত নাপাকি আছে কি না দেখুন। সাধারণ দাগ, ধুলো বা খাবারের দাগকে স্বয়ংক্রিয়ভাবে শরিয়তসম্মত নাপাকি মনে করবেন না।"],
          ["কাপড় পরিষ্কার করা", "নাপাকি লাগা অংশ পানি দিয়ে পরিষ্কার করুন, যতক্ষণ প্রযোজ্য নিয়মে নাপাকি দূর হয়। কাপড়ের ধরন ও নাপাকির অবস্থার কারণে নির্দিষ্ট বিধান আলাদা হতে পারে।"],
          ["পবিত্রতা ও সতর", "পোশাক পবিত্র হওয়া এবং শরীরের প্রয়োজনীয় অংশ ঢাকা—দুটি আলাদা বিষয়। নামাজের জন্য দুটিই প্রযোজ্য শর্ত অনুযায়ী নিশ্চিত করতে হয়।"],
          ["সন্দেহ হলে", "শুধু সন্দেহের কারণে পুরো পোশাক নাপাক ধরে নেবেন না। নিশ্চিত তথ্য থাকলে সেটি অনুসারে কাজ করুন; জটিল ক্ষেত্রে আলেমকে জিজ্ঞাসা করুন।"]
        ]
      },
      {
        title: "নামাজের স্থানের পবিত্রতা",
        intro: "যে স্থানে নামাজ পড়বেন, সেখানে প্রয়োজনীয় পবিত্রতা থাকা জরুরি।",
        parts: [
          ["জায়নামাজ ও মেঝে", "জায়নামাজ ব্যবহার করা সুবিধাজনক, কিন্তু জায়নামাজ থাকা নিজেই পবিত্রতার নিশ্চয়তা নয়। এর নিচের মেঝে বা নামাজের সংস্পর্শে আসা স্থান সম্পর্কে নিশ্চিত নাপাকি থাকলে তা বিবেচনা করুন।"],
          ["নাপাকি পড়লে", "মেঝে বা জায়নামাজে নাপাকি লাগলে সংশ্লিষ্ট অংশ প্রযোজ্য নিয়মে পরিষ্কার করুন। পরিষ্কার করার পদ্ধতি পৃষ্ঠের ধরন ও নাপাকির প্রকৃতির ওপর নির্ভর করতে পারে।"],
          ["শুধু সন্দেহ", "কোনো স্থান নাপাক বলে নিশ্চিত প্রমাণ না থাকলে শুধু সন্দেহের কারণে সেটিকে নাপাক ধরে নেওয়া ঠিক নয়।"],
          ["প্রস্তুতি", "নামাজের আগে স্থানটি নিরাপদ, ব্যবহারযোগ্য ও পরিচ্ছন্ন কি না দেখুন এবং অন্যের ইবাদতে বিঘ্ন সৃষ্টি করবেন না।"]
        ]
      },
      {
        title: "হাদাস ও নাজাসাতের পার্থক্য",
        intro: "এই দুটি পরিভাষার পার্থক্য বোঝা পাক-পবিত্রতার অন্যতম গুরুত্বপূর্ণ অংশ।",
        parts: [
          ["হাদাস", "হাদাস হলো এমন একটি অবস্থা যার কারণে নামাজের জন্য ওজু বা গোসলের প্রয়োজন হতে পারে। উদাহরণ হিসেবে ওজু ভঙ্গকারী ঘটনা বা গোসল ফরজ হওয়ার অবস্থা বোঝা যায়।"],
          ["নাজাসাত", "নাজাসাত বলতে শরিয়তের দৃষ্টিতে নির্দিষ্ট অপবিত্র বস্তু বোঝায়। এটি শরীর, পোশাক বা নামাজের স্থানে লাগলে প্রযোজ্য নিয়মে দূর করতে হয়।"],
          ["মূল পার্থক্য", "হাদাসের ক্ষেত্রে প্রয়োজনীয় পবিত্রতা অর্জন করা হয়; নাজাসাতের ক্ষেত্রে অপবিত্র বস্তু দূর করা হয়। কখনো দুটো বিষয় একসঙ্গে ঘটতে পারে, আবার আলাদাও হতে পারে।"],
          ["উদাহরণ", "ওজু ভেঙে গেলে শরীরে দৃশ্যমান নাপাকি না থাকলেও ওজু প্রয়োজন হতে পারে। আবার পোশাকে নাপাকি লাগলেও তার কারণে সব সময় ওজু ভেঙে যায়—এমন নয়।"]
        ]
      },
      {
        title: "পানি ও নাপাকি দূর করার নিয়ম",
        intro: "পানি দিয়ে পরিষ্কার করার সাধারণ ধারণা শিখুন; বিশেষ পরিস্থিতিতে ফিকহি বিধান যাচাই করুন।",
        parts: [
          ["পানি", "পবিত্রতা অর্জনে পানি গুরুত্বপূর্ণ। পানিতে নাপাকি মিশে তার রং, গন্ধ বা স্বাদ পরিবর্তিত হলে তার ব্যবহার সম্পর্কে বিশেষ বিধান থাকতে পারে।"],
          ["কাপড় বা পৃষ্ঠ পরিষ্কার", "নাপাকি লেগে থাকলে আক্রান্ত অংশ পরিষ্কার করুন। কতবার ধুতে হবে বা কীভাবে পরিষ্কার করতে হবে, তা সব অবস্থায় একই নয়।"],
          ["পানি না থাকলে", "পানি পাওয়া না গেলে বা ব্যবহার করলে ক্ষতির আশঙ্কা থাকলে তায়াম্মুমের বিধান প্রযোজ্য হতে পারে। এর শর্ত ও পদ্ধতি আলাদাভাবে শিখতে হবে।"],
          ["সতর্কতা", "পানি নিয়ে অযথা কঠিন নিয়ম বানাবেন না। পানির পরিমাণ বা অবস্থা সম্পর্কে জটিল প্রশ্ন হলে যোগ্য আলেমের কাছে নির্দিষ্ট ঘটনা বর্ণনা করে জিজ্ঞাসা করুন।"]
        ]
      },
      {
        title: "ওজু কখন প্রয়োজন",
        intro: "এই অংশে ওজুর সঙ্গে পবিত্রতার সম্পর্ক বোঝানো হচ্ছে; সম্পূর্ণ ওজুর পদ্ধতি পরের অধ্যায়ে থাকবে।",
        parts: [
          ["ওজুর উদ্দেশ্য", "ওজু হলো নির্দিষ্ট অঙ্গ ধোয়া ও মাসেহ করার মাধ্যমে শরিয়ত নির্ধারিত পবিত্রতা অর্জনের একটি পদ্ধতি।"],
          ["ওজু ভঙ্গ", "প্রস্রাব-পায়খানা ও বায়ু নির্গমনের মতো ঘটনা সাধারণভাবে ওজু ভঙ্গ করে। ঘুম, রক্তপাত, স্পর্শ ইত্যাদির কিছু বিধান মাজহাবভেদে ভিন্ন হতে পারে।"],
          ["সন্দেহ", "আগে ওজু ছিল কি না বা ওজু ভেঙেছে কি না—শুধু সন্দেহের ভিত্তিতে বারবার ওজু করার অভ্যাস করবেন না। নির্দিষ্ট মাসআলা নিজের ফিকহি মত অনুযায়ী শিখুন।"],
          ["পরবর্তী পাঠ", "ওজুর ফরজ, সুন্নত, ধাপে ধাপে পদ্ধতি ও সাধারণ ভুল জানতে দ্বিতীয় অধ্যায় ‘ওজু’ পড়ুন।"]
        ]
      },
      {
        title: "গোসল ও তায়াম্মুমের পরিচয়",
        intro: "কিছু অবস্থায় শুধু ওজু যথেষ্ট নয়; আবার পানি ব্যবহার অসম্ভব হলে বিকল্প বিধান থাকতে পারে।",
        parts: [
          ["গোসল কখন প্রয়োজন", "নির্দিষ্ট অবস্থায় গোসল ফরজ হয়। এসব অবস্থার সঠিক বিধান, গোসলের ফরজ ও সম্পূর্ণ পদ্ধতি নির্ভরযোগ্য ফিকহি শিক্ষকের কাছ থেকে শিখতে হবে।"],
          ["গোসল ও সাধারণ স্নান", "সাধারণভাবে গোসল করা আর শরিয়তসম্মত ফরজ গোসল সম্পন্ন করা সব সময় একই বিষয় নয়। প্রযোজ্য শর্ত ও ফরজগুলো জানতে হবে।"],
          ["তায়াম্মুম", "পানি না পাওয়া বা ব্যবহার ক্ষতিকর হওয়ার মতো নির্দিষ্ট অবস্থায় শরিয়তের শর্ত অনুযায়ী তায়াম্মুমের অনুমতি থাকতে পারে।"],
          ["গুরুত্বপূর্ণ", "নিজে থেকে তায়াম্মুমকে পানির বিকল্প ধরে নেবেন না। কখন অনুমতি আছে এবং কীভাবে করতে হয় তা নির্ভরযোগ্য আলেমের কাছে যাচাই করুন।"]
        ]
      },
      {
        title: "বাস্তব সমস্যা ও সাধারণ ভুল",
        intro: "বাস্তব পরিস্থিতিতে নিশ্চিত তথ্য ও সন্দেহের পার্থক্য বুঝে কাজ করুন।",
        parts: [
          ["পরিস্থিতি ১: পোশাকে দাগ", "দাগটি কী এবং নাপাকি কি না তা নিশ্চিত করুন। সব দাগ নাপাকি নয়। নিশ্চিত নাপাকি হলে প্রযোজ্য নিয়মে আক্রান্ত স্থান পরিষ্কার করুন।"],
          ["পরিস্থিতি ২: জায়নামাজ নিয়ে সন্দেহ", "শুধু সন্দেহের কারণে জায়নামাজ নাপাক ধরে নেবেন না। নিশ্চিত তথ্য থাকলে সেটি অনুযায়ী পরিষ্কার করুন।"],
          ["পরিস্থিতি ৩: ওজু ভেঙেছে কি না", "শুধু সন্দেহের কারণে বারবার ওজু করবেন না। নিজের ফিকহি মত অনুযায়ী সন্দেহের বিধান শিখুন।"],
          ["পরিস্থিতি ৪: পানি ব্যবহার সম্ভব নয়", "অসুস্থতা বা ক্ষতির আশঙ্কা থাকলে প্রযোজ্য ছাড় আছে কি না, তা যোগ্য আলেম বা চিকিৎসাগত প্রয়োজন অনুযায়ী যাচাই করুন।"],
          ["সাধারণ ভুল", "সব সন্দেহকে নিশ্চিত নাপাকি মনে করা, অকারণে পানি অপচয় করা এবং যাচাই ছাড়া ধর্মীয় সিদ্ধান্ত নেওয়া এড়িয়ে চলুন।"]
        ]
      },
      {
        title: "চূড়ান্ত চেকলিস্ট ও পরীক্ষা",
        intro: "এই অধ্যায়ের মূল শিক্ষা মনে রাখতে নিচের তালিকা ও কুইজ ব্যবহার করুন।",
        parts: [
          ["সারাংশ", "পবিত্রতা বলতে সাধারণ পরিচ্ছন্নতার পাশাপাশি শরিয়ত নির্ধারিত পবিত্রতার বিধানও বোঝায়। শরীর, পোশাক ও নামাজের স্থানের প্রয়োজনীয় পবিত্রতা নিশ্চিত করুন। হাদাস ও নাজাসাতের পার্থক্য বুঝুন এবং প্রয়োজন অনুযায়ী ওজু বা গোসল করুন।"],
          ["নিজেকে যাচাই", "কুইজে উত্তর দেওয়ার আগে প্রতিটি প্রশ্ন মনোযোগ দিয়ে পড়ুন। ভুল হলে সংশ্লিষ্ট অধ্যায় আবার পড়ুন।"],
          ["পরবর্তী অধ্যায়", "এবার ওজুর ফরজ, সুন্নত, ধাপে ধাপে পদ্ধতি এবং ওজু ভঙ্গের কারণ শেখার জন্য দ্বিতীয় অপশনে যান।"]
        ]
      }
    ],

    en: [
      {
        title: "Introduction and importance of purification",
        intro: "Purification is not only about looking clean; prayer also has specific requirements for ritual purity.",
        parts: [
          ["What purification means", "Purification generally means cleanliness. In Islamic worship, it also includes requirements of ritual purity defined by Islamic law. Something that looks clean is not automatically ritually pure in every circumstance."],
          ["Connection with prayer", "Before prayer, observe the required purity of the body, clothing and prayer area. Depending on the situation, wudu or ghusl may also be required."],
          ["In daily life", "Wear clean clothes, maintain personal hygiene, avoid wasting water and keep the prayer area clean."],
          ["Remember", "Ordinary cleanliness and ritual purity are related but not always identical. Learn specific rulings from reliable teachers."]
        ]
      },
      {
        title: "Purity of the body",
        intro: "If impurity is known to be present on the body, remove it according to the applicable rules.",
        parts: [
          ["When impurity is present", "If a substance known to be impure touches the body, clean the affected area appropriately. Do not assume impurity merely because of an unsupported worry."],
          ["Personal hygiene", "Cleanliness after urination and defecation is important. Learn the rules for water and any permitted alternatives from reliable jurisprudential instruction."],
          ["Cleaning method", "Clean the affected area. The method and extent of cleaning can depend on the substance and the applicable school of jurisprudence."],
          ["Example", "If known impurity touches your hand, clean the affected area. If you only suspect that something touched it, do not repeatedly wash without reason."]
        ]
      },
      {
        title: "Purity of clothing",
        intro: "Impurity on clothing used for prayer must be addressed according to the applicable rules.",
        parts: [
          ["Checking clothing", "Before prayer, check whether known impurity is present. Do not automatically treat every ordinary stain, dust mark or food stain as ritual impurity."],
          ["Cleaning fabric", "Wash the affected area with water as required to remove the impurity. Details may depend on the material and the type of impurity."],
          ["Purity and covering", "Ritual purity of clothing and covering the required parts of the body are different matters. Both must be observed for prayer."],
          ["When in doubt", "Do not declare the entire garment impure based on doubt alone. Act on established information and ask a qualified scholar about complex cases."]
        ]
      },
      {
        title: "Purity of the prayer area",
        intro: "The place where you pray must meet the applicable requirements of purity.",
        parts: [
          ["Prayer mat and floor", "A prayer mat is convenient, but having a mat does not itself guarantee purity. Consider any known impurity on the mat, floor or area where prayer is performed."],
          ["If impurity is present", "Clean the affected part of the floor or mat according to the relevant rules. The method may depend on the surface and substance."],
          ["Mere doubt", "Do not treat a place as impure solely because of doubt when there is no established evidence of impurity."],
          ["Preparation", "Make sure the area is clean and suitable for prayer, and avoid disturbing others who are worshipping."]
        ]
      },
      {
        title: "The difference between hadath and najasah",
        intro: "Understanding these two terms is an important part of learning purification.",
        parts: [
          ["Hadath", "Hadath is a state that can require wudu or ghusl before prayer. Examples include events that invalidate wudu or circumstances requiring ghusl."],
          ["Najasah", "Najasah refers to a defined impure substance under Islamic law. If it affects the body, clothing or prayer area, it must be addressed according to the applicable rules."],
          ["Main difference", "Hadath is addressed by attaining the required ritual purity; najasah is addressed by removing the impure substance. They can occur together or separately."],
          ["Example", "Wudu may be required even when there is no visible impurity on the body. Conversely, impurity on clothing does not automatically mean that wudu has been invalidated."]
        ]
      },
      {
        title: "Water and removing impurity",
        intro: "Learn the general principles of cleaning with water and verify specific rulings for special situations.",
        parts: [
          ["Water", "Water is important for purification. If impurity changes the colour, smell or taste of water, specific rules may affect whether it can be used for purification."],
          ["Cleaning clothing or surfaces", "Clean the affected area when impurity is present. The number of washes and the method are not necessarily identical in every situation."],
          ["When water is unavailable", "Tayammum may be permitted in specified circumstances, such as when water is unavailable or using it would cause harm. Its conditions must be learned separately."],
          ["Caution", "Do not invent unnecessarily strict rules about water. Ask a qualified scholar about a specific situation that is difficult to assess."]
        ]
      },
      {
        title: "When is wudu required?",
        intro: "This section explains the connection between wudu and purification; the full wudu method belongs in the next chapter.",
        parts: [
          ["Purpose of wudu", "Wudu is a prescribed form of ritual purification involving washing particular body parts and wiping others."],
          ["Invalidators", "Urination, defecation and passing wind generally invalidate wudu. Some rulings about sleep, bleeding and touch differ between schools."],
          ["Doubt", "Do not repeatedly perform wudu merely because of recurring doubts. Learn the relevant rulings according to your school of jurisprudence."],
          ["Next lesson", "Read chapter two, Wudu, for the obligations, sunnah practices, step-by-step method and common mistakes."]
        ]
      },
      {
        title: "Introduction to ghusl and tayammum",
        intro: "Some circumstances require more than wudu; other circumstances may permit an alternative when water cannot be used.",
        parts: [
          ["When ghusl is required", "Ghusl becomes obligatory in specified circumstances. Learn those circumstances and the required method from reliable jurisprudential instruction."],
          ["Ghusl versus an ordinary bath", "Taking an ordinary bath and completing an obligatory ritual ghusl are not always the same. The applicable requirements must be observed."],
          ["Tayammum", "Tayammum may be allowed under specific conditions, such as lack of water or a risk of harm from using it."],
          ["Important", "Do not assume tayammum is automatically available as a substitute for water. Verify its conditions and method with a qualified scholar."]
        ]
      },
      {
        title: "Practical situations and common mistakes",
        intro: "Distinguish established facts from doubts when dealing with everyday situations.",
        parts: [
          ["Situation 1: A stain on clothing", "Determine what the stain is and whether it is actually impure. Not every stain is ritual impurity. Clean known impurity according to the applicable rules."],
          ["Situation 2: Doubt about a prayer mat", "Do not declare the mat impure solely because of doubt. Clean it when there is established information that requires it."],
          ["Situation 3: Doubt about wudu", "Do not repeatedly renew wudu merely because of doubt. Learn the relevant rule according to your school."],
          ["Situation 4: Water cannot be used", "If illness or risk of harm is involved, ask a qualified scholar whether a concession applies, while considering relevant medical advice."],
          ["Common mistakes", "Avoid treating every doubt as confirmed impurity, wasting water unnecessarily and making religious rulings without checking reliable sources."]
        ]
      },
      {
        title: "Final checklist and quiz",
        intro: "Use the checklist and quiz to review the main lessons in this chapter.",
        parts: [
          ["Summary", "Purification includes ordinary cleanliness as well as ritual requirements. Observe the required purity of the body, clothing and prayer area. Understand hadath and najasah, and perform wudu or ghusl when required."],
          ["Test yourself", "Read each quiz question carefully. If you answer incorrectly, revisit the relevant section."],
          ["Next chapter", "Continue to chapter two to learn the obligations of wudu, sunnah practices, its complete method and its invalidators."]
        ]
      }
    ],

    hi: [
      {
        title: "पाकी का परिचय और महत्व",
        intro: "पाकी केवल साफ़ दिखने का नाम नहीं; नमाज़ के लिए धार्मिक पाकी के कुछ नियम भी हैं।",
        parts: [
          ["पाकी का अर्थ", "पाकी का सामान्य अर्थ सफ़ाई है। इस्लामी इबादत में शरीअत द्वारा निर्धारित धार्मिक पाकी की शर्तें भी शामिल हैं। कोई चीज़ साफ़ दिखे, तो हर परिस्थिति में उसे धार्मिक रूप से पाक नहीं कहा जा सकता।"],
          ["नमाज़ से संबंध", "नमाज़ से पहले शरीर, कपड़ों और नमाज़ की जगह की आवश्यक पाकी का ध्यान रखें। परिस्थिति के अनुसार वुज़ू या ग़ुस्ल भी आवश्यक हो सकता है।"],
          ["रोज़मर्रा की ज़िंदगी", "साफ़ कपड़े पहनें, व्यक्तिगत सफ़ाई रखें, पानी बर्बाद न करें और नमाज़ की जगह साफ़ रखें।"],
          ["याद रखें", "सामान्य सफ़ाई और शरीअत की पाकी संबंधित हैं, लेकिन हमेशा एक ही बात नहीं। विशेष नियम विश्वसनीय शिक्षक से सीखें।"]
        ]
      },
      {
        title: "शरीर की पाकी",
        intro: "शरीर पर नापाकी निश्चित रूप से हो तो संबंधित नियमों के अनुसार उसे दूर करें।",
        parts: [
          ["नापाकी लगने पर", "यदि ज्ञात नापाकी शरीर पर लग जाए, तो प्रभावित जगह को उचित तरीके से साफ़ करें। केवल बेबुनियाद चिंता से स्वयं को नापाक न मानें।"],
          ["व्यक्तिगत सफ़ाई", "पेशाब और पाख़ाने के बाद सफ़ाई महत्वपूर्ण है। पानी से सफ़ाई और अनुमत विकल्पों के नियम विश्वसनीय फ़िक़्ही शिक्षा से सीखें।"],
          ["साफ़ करने का तरीका", "जहाँ नापाकी लगी है, उस हिस्से को साफ़ करें। तरीका और मात्रा नापाकी तथा संबंधित फ़िक़्ही नियम पर निर्भर हो सकते हैं।"],
          ["उदाहरण", "हाथ पर निश्चित नापाकी लगने पर प्रभावित हिस्सा साफ़ करें। केवल संदेह हो तो बिना कारण बार-बार न धोएँ।"]
        ]
      },
      {
        title: "कपड़ों की पाकी",
        intro: "नमाज़ के कपड़ों पर नापाकी हो तो संबंधित नियमों के अनुसार उसे दूर करें।",
        parts: [
          ["कपड़ों की जाँच", "नमाज़ से पहले देखें कि कपड़ों पर निश्चित नापाकी तो नहीं। हर दाग, धूल या खाने के निशान को अपने आप धार्मिक नापाकी न मानें।"],
          ["कपड़ा साफ़ करना", "नापाकी वाले हिस्से को आवश्यकतानुसार पानी से साफ़ करें। विवरण कपड़े और नापाकी के प्रकार पर निर्भर हो सकते हैं।"],
          ["पाकी और पर्दा", "कपड़ों का पाक होना और शरीर के आवश्यक अंगों को ढकना अलग विषय हैं। नमाज़ में दोनों का ध्यान रखना चाहिए।"],
          ["संदेह होने पर", "केवल संदेह से पूरे कपड़े को नापाक न मानें। निश्चित जानकारी के अनुसार काम करें और कठिन मामले में योग्य आलिम से पूछें।"]
        ]
      },
      {
        title: "नमाज़ की जगह की पाकी",
        intro: "जिस जगह नमाज़ पढ़ें, वहाँ आवश्यक पाकी होनी चाहिए।",
        parts: [
          ["जानमाज़ और फ़र्श", "जानमाज़ सुविधाजनक है, लेकिन उसके होने से पाकी की गारंटी नहीं मिलती। जानमाज़, फ़र्श या नमाज़ की जगह पर ज्ञात नापाकी हो तो संबंधित नियम देखें।"],
          ["नापाकी लगने पर", "फ़र्श या जानमाज़ के प्रभावित हिस्से को उचित नियमों के अनुसार साफ़ करें। तरीका सतह और नापाकी के प्रकार पर निर्भर हो सकता है।"],
          ["केवल संदेह", "यदि नापाकी का प्रमाण नहीं है, तो केवल संदेह से जगह को नापाक न मानें।"],
          ["तैयारी", "जगह को साफ़ और नमाज़ के योग्य रखें तथा दूसरे इबादत करने वालों को परेशान न करें।"]
        ]
      },
      {
        title: "हदस और नजासत में अंतर",
        intro: "इन दोनों शब्दों का अंतर समझना पाकी सीखने का महत्वपूर्ण भाग है।",
        parts: [
          ["हदस", "हदस ऐसी अवस्था है जिसमें नमाज़ से पहले वुज़ू या ग़ुस्ल की आवश्यकता हो सकती है। वुज़ू टूटने या ग़ुस्ल फ़र्ज़ होने वाली स्थिति इसके उदाहरण हैं।"],
          ["नजासत", "नजासत शरीअत के अनुसार निर्धारित अपवित्र वस्तु है। शरीर, कपड़ों या नमाज़ की जगह पर लगने पर संबंधित नियमों के अनुसार उसे दूर किया जाता है।"],
          ["मुख्य अंतर", "हदस में आवश्यक धार्मिक पाकी हासिल की जाती है; नजासत में अपवित्र वस्तु को दूर किया जाता है। दोनों साथ या अलग-अलग हो सकते हैं।"],
          ["उदाहरण", "शरीर पर दिखाई देने वाली नापाकी न होने पर भी वुज़ू की ज़रूरत हो सकती है। कपड़े पर नापाकी लगने से हर बार वुज़ू नहीं टूटता।"]
        ]
      },
      {
        title: "पानी और नापाकी दूर करने के नियम",
        intro: "पानी से सफ़ाई के सामान्य नियम सीखें और विशेष स्थितियों में फ़िक़्ही हुक्म जाँचें।",
        parts: [
          ["पानी", "पाकी हासिल करने में पानी महत्वपूर्ण है। यदि नापाकी से पानी का रंग, गंध या स्वाद बदल जाए, तो उसके उपयोग के विशेष नियम हो सकते हैं।"],
          ["कपड़े या सतह की सफ़ाई", "नापाकी मौजूद हो तो प्रभावित हिस्सा साफ़ करें। कितनी बार धोना है और कैसे साफ़ करना है, हर स्थिति में एक जैसा नहीं होता।"],
          ["पानी न मिलने पर", "पानी उपलब्ध न हो या उसका उपयोग नुकसानदेह हो, तो निर्धारित शर्तों में तयम्मुम की अनुमति हो सकती है। इसकी विधि अलग से सीखें।"],
          ["सावधानी", "पानी के बारे में अपनी ओर से अनावश्यक कठोर नियम न बनाएँ। कठिन स्थिति में योग्य आलिम से पूछें।"]
        ]
      },
      {
        title: "वुज़ू कब आवश्यक है?",
        intro: "यह भाग वुज़ू और पाकी का संबंध समझाता है; पूरी विधि अगले अध्याय में होगी।",
        parts: [
          ["वुज़ू का उद्देश्य", "वुज़ू धार्मिक पाकी हासिल करने का निर्धारित तरीका है, जिसमें कुछ अंग धोए और कुछ का मसह किया जाता है।"],
          ["वुज़ू टूटना", "पेशाब, पाख़ाना और हवा निकलने से आम तौर पर वुज़ू टूटता है। नींद, ख़ून और स्पर्श के कुछ नियम फ़िक़्ही मत के अनुसार अलग हो सकते हैं।"],
          ["संदेह", "बार-बार संदेह होने पर बार-बार वुज़ू न करें। अपने फ़िक़्ही मत के अनुसार संबंधित नियम सीखें।"],
          ["अगला पाठ", "दूसरे अध्याय वुज़ू में फ़र्ज़, सुन्नत, पूरी विधि और आम गलतियाँ सीखें।"]
        ]
      },
      {
        title: "ग़ुस्ल और तयम्मुम का परिचय",
        intro: "कुछ स्थितियों में केवल वुज़ू पर्याप्त नहीं होता; पानी इस्तेमाल न कर पाने पर वैकल्पिक नियम हो सकते हैं।",
        parts: [
          ["ग़ुस्ल कब आवश्यक है", "कुछ निर्धारित स्थितियों में ग़ुस्ल फ़र्ज़ होता है। उन स्थितियों और सही विधि को विश्वसनीय फ़िक़्ही शिक्षक से सीखें।"],
          ["ग़ुस्ल और सामान्य स्नान", "सामान्य स्नान करना और फ़र्ज़ ग़ुस्ल की आवश्यक शर्तें पूरी करना हमेशा एक ही बात नहीं है।"],
          ["तयम्मुम", "पानी उपलब्ध न होने या पानी इस्तेमाल करने से नुकसान होने जैसी निर्धारित स्थितियों में तयम्मुम की अनुमति हो सकती है।"],
          ["महत्वपूर्ण", "यह न मानें कि पानी की जगह तयम्मुम हमेशा किया जा सकता है। उसकी शर्तें और तरीका योग्य आलिम से जाँचें।"]
        ]
      },
      {
        title: "व्यावहारिक स्थितियाँ और आम गलतियाँ",
        intro: "रोज़मर्रा की स्थितियों में निश्चित जानकारी और संदेह के अंतर को समझें।",
        parts: [
          ["स्थिति 1: कपड़े पर दाग", "दाग क्या है और क्या वह वास्तव में नापाक है, यह समझें। हर दाग नापाकी नहीं है। निश्चित नापाकी हो तो संबंधित नियम से साफ़ करें।"],
          ["स्थिति 2: जानमाज़ पर संदेह", "केवल संदेह से जानमाज़ को नापाक न मानें। निश्चित जानकारी होने पर उसके अनुसार सफ़ाई करें।"],
          ["स्थिति 3: वुज़ू पर संदेह", "केवल संदेह से बार-बार वुज़ू न दोहराएँ। अपने फ़िक़्ही मत के अनुसार नियम सीखें।"],
          ["स्थिति 4: पानी इस्तेमाल नहीं कर सकते", "बीमारी या नुकसान की आशंका हो तो योग्य आलिम से पूछें कि कोई रियायत लागू होती है या नहीं; आवश्यक चिकित्सा सलाह भी लें।"],
          ["आम गलतियाँ", "हर संदेह को निश्चित नापाकी मानना, पानी बर्बाद करना और बिना जाँच धार्मिक निर्णय लेना छोड़ें।"]
        ]
      },
      {
        title: "अंतिम जाँच सूची और प्रश्नोत्तरी",
        intro: "इस अध्याय की मुख्य बातें याद रखने के लिए सूची और प्रश्नोत्तरी का उपयोग करें।",
        parts: [
          ["सारांश", "पाकी में सामान्य सफ़ाई के साथ शरीअत की आवश्यक शर्तें भी शामिल हैं। शरीर, कपड़े और नमाज़ की जगह की आवश्यक पाकी रखें। हदस और नजासत का अंतर समझें और ज़रूरत के अनुसार वुज़ू या ग़ुस्ल करें।"],
          ["अपनी जानकारी जाँचें", "हर प्रश्न ध्यान से पढ़ें। गलत उत्तर होने पर संबंधित भाग फिर से पढ़ें।"],
          ["अगला अध्याय", "दूसरे अध्याय में वुज़ू के फ़र्ज़, सुन्नत, पूरी विधि और वुज़ू टूटने के कारण सीखें।"]
        ]
      }
    ]
  };

  const indexList = $("chapter-index-list");
  const lessonList = $("lesson-list");
  const quizContainer = $("quiz-container");
  const checklistContainer = $("checklist-container");
  const languageSelect = $("language-select");

  let lang = supported.includes(params.get("lang"))
    ? params.get("lang")
    : supported.includes(settings.lang)
      ? settings.lang
      : "bn";

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function addText(parent, tag, className, text) {
    const node = make(tag, className, text);
    parent.appendChild(node);
    return node;
  }

  function addCallout(parent, title, text, className = "info-box") {
    const box = make("aside", className);
    addText(box, "h3", "", title);
    addText(box, "p", "", text);
    parent.appendChild(box);
  }

  function renderIndex() {
    indexList.replaceChildren();

    lessons[lang].forEach((lesson, index) => {
      const li = document.createElement("li");
      const link = make("a", "index-link");
      link.href = `#chapter-${index + 1}`;

      const num = make("span", "index-number", number(index + 1, lang));
      num.setAttribute("aria-hidden", "true");

      const title = make("span", "", lesson.title);

      link.append(num, title);
      li.appendChild(link);
      indexList.appendChild(li);
    });
  }

  function renderLessons() {
    lessonList.replaceChildren();

    lessons[lang].forEach((lesson, index) => {
      const section = make("section", "lesson-section");
      section.id = `chapter-${index + 1}`;
      section.setAttribute("aria-labelledby", `chapter-title-${index + 1}`);

      const heading = make("div", "section-heading");
      const num = make("span", "section-number", number(index + 1, lang));
      num.setAttribute("aria-hidden", "true");

      const title = make("h2", "", lesson.title);
      title.id = `chapter-title-${index + 1}`;

      heading.append(num, title);
      section.appendChild(heading);

      addText(section, "p", "muted", lesson.intro);

      lesson.parts.forEach((part, partIndex) => {
        addText(section, "h3", "", part[0]);
        addText(section, "p", "", part[1]);

        if (partIndex === 0 && index === 0) {
          addCallout(
            section,
            UI[lang].important,
            lang === "bn"
              ? "নামাজের পবিত্রতার বিধান ও সাধারণ পরিচ্ছন্নতা সম্পর্কিত, কিন্তু সব ক্ষেত্রে এক নয়।"
              : lang === "en"
                ? "Ritual purity for prayer and ordinary cleanliness are related, but they are not identical in every case."
                : "नमाज़ की धार्मिक पाकी और सामान्य सफ़ाई संबंधित हैं, लेकिन हर स्थिति में एक जैसी नहीं हैं।",
            "note-box"
          );
        }
      });

      const readLabel = make("label", "checklist-item");
      const readCheck = document.createElement("input");
      readCheck.type = "checkbox";
      readCheck.className = "chapter-read";
      readCheck.dataset.chapter = String(index + 1);
      readCheck.setAttribute("aria-label", `${UI[lang].read}: ${lesson.title}`);

      const readText = make("span", "", UI[lang].read);
      readLabel.append(readCheck, readText);
      section.appendChild(readLabel);

      lessonList.appendChild(section);
    });

    lessonList.querySelectorAll(".chapter-read").forEach(input => {
      input.addEventListener("change", updateProgress);
    });
  }

  function renderQuiz() {
    quizContainer.replaceChildren();

    UI[lang].quiz.forEach((question, index) => {
      const block = make("fieldset", "quiz-question");
      block.dataset.question = String(index);
      block.style.minWidth = "0";
      block.style.border = "0";
      block.style.paddingInline = "0";
      block.style.marginInline = "0";

      addText(
        block,
        "legend",
        "",
        `${number(index + 1, lang)}. ${question.q}`
      );

      question.options.forEach((option, optionIndex) => {
        const label = make("label", "quiz-option");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `purity-question-${index}`;
        radio.value = String(optionIndex);

        label.append(radio, make("span", "", option));
        block.appendChild(label);
      });

      const feedback = make("p", "quiz-feedback");
      feedback.hidden = true;
      block.appendChild(feedback);
      quizContainer.appendChild(block);
    });

    $("quiz-result").textContent = "";
  }

  function renderChecklist() {
    checklistContainer.replaceChildren();

    UI[lang].checklist.forEach((text, index) => {
      const label = make("label", "checklist-item");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `purity-check-${index + 1}`;

      label.append(input, make("span", "", text));
      checklistContainer.appendChild(label);
    });
  }

  function renderStaticText() {
    document.documentElement.lang = lang;
    document.title = `${UI[lang].title} | IBADAT`;

    document.querySelectorAll("[data-i18n]").forEach(node => {
      const key = node.dataset.i18n;
      if (UI[lang][key] !== undefined) {
        node.textContent = UI[lang][key];
      }
    });

    languageSelect.value = lang;
  }

  function updateProgress() {
    const total = lessons[lang].length;
    const done = lessonList.querySelectorAll(".chapter-read:checked").length;
    const percent = Math.round((done / total) * 100);

    $("progress-fill").style.width = `${percent}%`;
    $("progress-track").setAttribute("aria-valuenow", String(done));

    $("progress-label").textContent =
      `${UI[lang].completed}: ${number(done, lang)} / ${number(total, lang)} (${number(percent, lang)}%)`;
  }

  function checkQuiz() {
    const questions = UI[lang].quiz;
    let score = 0;
    let unanswered = false;

    quizContainer.querySelectorAll(".quiz-question").forEach((block, index) => {
      const selected = block.querySelector("input:checked");
      const feedback = block.querySelector(".quiz-feedback");
      const question = questions[index];

      feedback.hidden = false;
      feedback.classList.remove("correct", "incorrect");

      if (!selected) {
        unanswered = true;
        feedback.classList.add("incorrect");
        feedback.textContent = UI[lang].quizEmpty;
        return;
      }

      if (Number(selected.value) === question.answer) {
        score++;
        feedback.classList.add("correct");
        feedback.textContent = `${UI[lang].correct} ${question.explanation}`;
      } else {
        feedback.classList.add("incorrect");
        feedback.textContent =
          `${UI[lang].incorrect} ${question.options[question.answer]}. ${question.explanation}`;
      }
    });

    const result = $("quiz-result");

    if (unanswered) {
      result.textContent = UI[lang].quizEmpty;
    } else {
      result.textContent =
        `${UI[lang].score}: ${number(score, lang)} / ${number(questions.length, lang)}`;
    }
  }

  function applyTheme() {
    document.body.classList.toggle("dark-mode", settings.dark === true);
  }

  function render() {
    renderStaticText();
    renderIndex();
    renderLessons();
    renderQuiz();
    renderChecklist();
    updateProgress();
    applyTheme();
  }

  languageSelect.addEventListener("change", event => {
    const next = event.target.value;
    if (!supported.includes(next)) return;

    lang = next;
    render();

    const newUrl = new URL(location.href);
    newUrl.searchParams.set("lang", lang);

    // Update URL without adding a new browser history entry.
    history.replaceState(null, "", newUrl);
  });

  $("check-quiz").addEventListener("click", checkQuiz);

  $("back-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    $("back-to-top").classList.toggle("visible", window.scrollY > 450);
  }, { passive: true });

  render();
})();
