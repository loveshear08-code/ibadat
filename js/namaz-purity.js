/* =========================================
   IBADAT — NAMAZ PURITY PAGE
   Language: Bengali / English / Hindi
   Theme: follows appSettings
   ========================================= */

"use strict";

(function () {
  const SETTINGS_KEY = "appSettings";

  /* Read the existing app settings */
  function getSettings() {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      const settings = saved ? JSON.parse(saved) : {};

      return settings && typeof settings === "object"
        ? settings
        : {};
    } catch (error) {
      return {};
    }
  }

  /* =========================================
     TRANSLATIONS
     ========================================= */

  const translations = {
    bn: {
      heroEyebrow: "IBADAT • নামাজ শিক্ষা",
      pageTitle: "পবিত্রতা",
      pageSubtitle: "ইবাদতের আগে পরিচ্ছন্নতা ও পবিত্রতার সহজ পাঠ",

      introKicker: "শুরু করি",
      introTitle: "পবিত্রতা কী ও কেন?",
      introText:
        "পবিত্রতা হলো শরীর, পোশাক ও নামাজের স্থান পরিচ্ছন্ন রাখা এবং ইবাদতের জন্য প্রয়োজনীয় ধর্মীয় পবিত্রতা অর্জন করা। নামাজের আগে কী করতে হবে, তা জানা প্রত্যেক মুসলিমের জন্য গুরুত্বপূর্ণ।",

      contentsTitle: "এই পেজে যা শিখবে",
      contents: [
        "অজু",
        "গোসল",
        "তায়াম্মুম",
        "নাপাকি ও পরিচ্ছন্নতা"
      ],

      wuduKicker: "প্রথম পাঠ",
      wuduTitle: "অজু (ওযু)",
      wuduIntro:
        "অজু হলো নির্দিষ্ট অঙ্গ পানি দিয়ে ধোয়া ও মাসেহ করার মাধ্যমে নামাজের জন্য পবিত্রতা অর্জনের একটি পদ্ধতি।",
      wuduStepsTitle: "অজুর সাধারণ ধাপ",
      wuduSteps: [
        "নিয়ত করে বিসমিল্লাহ বলা।",
        "দুই হাত কবজি পর্যন্ত ধোয়া।",
        "মুখ কুলি করা এবং নাকে পানি দেওয়া।",
        "সম্পূর্ণ মুখ ধোয়া।",
        "দুই হাত কনুইসহ ধোয়া।",
        "ভেজা হাত দিয়ে মাথা মাসেহ করা; কান মাসেহের বিধানও শেখা।",
        "দুই পা টাখনুসহ ধোয়া।"
      ],
      wuduNoteTitle: "মনে রাখবে",
      wuduNote:
        "ধাপগুলোর ক্রম, ফরজের সংখ্যা এবং কিছু সুন্নত ও মাসেহের বিস্তারিত বিধানে ফিকহি মতভেদ রয়েছে। নিজের অনুসৃত নির্ভরযোগ্য আলেমের নির্দেশনা অনুযায়ী শিখবে।",
      wuduBreakTitle: "অজু ভঙ্গের কারণ",
      wuduBreaks: [
        "প্রস্রাব, পায়খানা বা বায়ু নির্গত হওয়া।",
        "গভীর ঘুম বা চেতনা হারানোর কিছু অবস্থা।",
        "অন্য কিছু বিষয়ে মাজহাবভেদে বিধান আলাদা হতে পারে।"
      ],

      ghuslKicker: "দ্বিতীয় পাঠ",
      ghuslTitle: "গোসল",
      ghuslIntro:
        "গোসল হলো পুরো শরীরে পানি পৌঁছে দিয়ে বড় অপবিত্রতা থেকে পবিত্রতা অর্জনের নির্দিষ্ট পদ্ধতি।",
      ghuslWhenTitle: "কখন গোসল ফরজ হতে পারে?",
      ghuslWhen: [
        "দাম্পত্য মিলনের পর।",
        "যৌনস্রাব নির্গমনের নির্দিষ্ট অবস্থায়।",
        "নারীদের ঋতুস্রাব বা প্রসব-পরবর্তী রক্তস্রাব শেষ হলে।"
      ],
      ghuslStepsTitle: "গোসলের সাধারণ পদ্ধতি",
      ghuslSteps: [
        "পবিত্রতার নিয়ত করা।",
        "শরীরে কোনো নাপাকি থাকলে তা পরিষ্কার করা।",
        "সুন্নাহসম্মতভাবে অজু করা।",
        "মাথা ও পুরো শরীরে পানি পৌঁছানো; কোনো অংশ শুকনো না রাখা।"
      ],
      ghuslNoteTitle: "গুরুত্বপূর্ণ",
      ghuslNote:
        "গোসলের ফরজ, নিয়ত ও পদ্ধতির কিছু বিশদ বিধান মাজহাবভেদে ভিন্ন হতে পারে। ব্যক্তিগত পরিস্থিতির জন্য বিশ্বস্ত আলেমের পরামর্শ নাও।",

      tayammumKicker: "তৃতীয় পাঠ",
      tayammumTitle: "তায়াম্মুম",
      tayammumIntro:
        "পানি ব্যবহার করা সম্ভব না হলে বা তা ক্ষতিকর হলে নির্দিষ্ট শর্তে পবিত্র মাটি বা উপযুক্ত মাটিজাত উপাদান দিয়ে তায়াম্মুম করা যায়।",
      tayammumWhenTitle: "কখন তায়াম্মুম করা যায়?",
      tayammumWhen: [
        "পানি না পাওয়া গেলে।",
        "পানি ব্যবহার করলে অসুস্থতা বাড়ার বাস্তব আশঙ্কা থাকলে।",
        "অন্যান্য শর্ত পূরণ হলে, যা নির্ভরযোগ্য আলেমের কাছ থেকে শেখা উচিত।"
      ],
      tayammumStepsTitle: "সাধারণ ধাপ",
      tayammumSteps: [
        "তায়াম্মুমের নিয়ত করা।",
        "শরিয়তসম্মত পবিত্র মাটিজাত উপাদান ব্যবহার করা।",
        "মুখ মাসেহ করা।",
        "দুই হাত মাসেহ করা—এর পদ্ধতি ও সীমা সম্পর্কে নির্ভরযোগ্য নির্দেশনা শেখা।"
      ],
      tayammumNoteTitle: "সতর্কতা",
      tayammumNote:
        "তায়াম্মুমের উপকরণ, হাত মাসেহের সীমা ও শর্তে ফিকহি মতভেদ রয়েছে; এই সংক্ষিপ্ত তালিকাকে পূর্ণ ফতোয়া মনে করবে না।",

      cleanKicker: "চতুর্থ পাঠ",
      cleanTitle: "নাপাকি ও পরিচ্ছন্নতা",
      cleanIntro:
        "নামাজের আগে শরীর, পোশাক ও নামাজের স্থান পবিত্র থাকা জরুরি। সন্দেহ আর নিশ্চিত নাপাকির মধ্যে পার্থক্য বুঝে চলতে হবে।",
      cleanCheckTitle: "নামাজের আগে যাচাই করো",
      cleanChecks: [
        "শরীর ও পোশাকের পবিত্রতা নিশ্চিত করা।",
        "নামাজের স্থান পরিষ্কার রাখা।",
        "নাপাকি থাকলে উপযুক্তভাবে তা দূর করা।",
        "শুধু সন্দেহের কারণে বারবার কষ্টে না পড়ে নির্ভরযোগ্য বিধান শেখা।"
      ],

      recapKicker: "শেষে মনে রাখো",
      recapTitle: "সংক্ষিপ্ত পুনরালোচনা",
      recapList: [
        "নামাজের আগে প্রয়োজনীয় পবিত্রতা অর্জন করো।",
        "অজু, গোসল ও তায়াম্মুমের নিয়ম আলাদা করে শেখো।",
        "শরীর, পোশাক ও নামাজের স্থান পরিষ্কার রাখো।",
        "যে বিষয়ে নিশ্চিত নও, বিশ্বস্ত আলেমের কাছে জেনে নাও।"
      ],
      disclaimer:
        "শিক্ষামূলক সংক্ষিপ্তসার: বিস্তারিত ধর্মীয় বিধান ও ব্যক্তিগত পরিস্থিতির জন্য নির্ভরযোগ্য আলেমের পরামর্শ নাও।",
      footerText:
        "IBADAT • জ্ঞান অর্জন করো, সুন্দরভাবে আমল করো"
    },

    en: {
      heroEyebrow: "IBADAT • LEARN PRAYER",
      pageTitle: "Purification",
      pageSubtitle:
        "A simple guide to cleanliness and ritual purification before worship",

      introKicker: "GET STARTED",
      introTitle: "What is purification, and why does it matter?",
      introText:
        "Purification includes keeping the body, clothing and prayer place clean, as well as attaining the ritual purity required for worship. Learning what is required before prayer is important for every Muslim.",

      contentsTitle: "On this page",
      contents: [
        "Wudu",
        "Ghusl",
        "Tayammum",
        "Impurity & cleanliness"
      ],

      wuduKicker: "LESSON 1",
      wuduTitle: "Wudu (Ablution)",
      wuduIntro:
        "Wudu is a form of ritual purification for prayer that involves washing specific parts of the body and wiping designated areas.",
      wuduStepsTitle: "General steps of wudu",
      wuduSteps: [
        "Make the intention and say Bismillah.",
        "Wash both hands to the wrists.",
        "Rinse the mouth and gently rinse the nose.",
        "Wash the entire face.",
        "Wash both arms, including the elbows.",
        "Wipe the head with wet hands; learn the ruling on wiping the ears as well.",
        "Wash both feet, including the ankles."
      ],
      wuduNoteTitle: "Remember",
      wuduNote:
        "Legal schools differ on the order, obligatory acts and details of some recommended acts and wiping. Learn from a reliable scholar you trust.",
      wuduBreakTitle: "What invalidates wudu?",
      wuduBreaks: [
        "Passing urine, stool or wind.",
        "Certain states of deep sleep or loss of awareness.",
        "Rulings on some other matters differ between schools of law."
      ],

      ghuslKicker: "LESSON 2",
      ghuslTitle: "Ghusl",
      ghuslIntro:
        "Ghusl is the prescribed full-body washing used to remove major ritual impurity.",
      ghuslWhenTitle: "When may ghusl be obligatory?",
      ghuslWhen: [
        "After marital intercourse.",
        "In specific circumstances involving sexual discharge.",
        "After menstruation or postnatal bleeding has ended."
      ],
      ghuslStepsTitle: "General method",
      ghuslSteps: [
        "Make the intention for purification.",
        "Remove any visible impurity from the body.",
        "Perform wudu in the recommended manner.",
        "Ensure water reaches the head and the entire body, leaving no area dry."
      ],
      ghuslNoteTitle: "Important",
      ghuslNote:
        "Some detailed rulings about obligatory acts, intention and method differ between legal schools. Seek trusted guidance for personal circumstances.",

      tayammumKicker: "LESSON 3",
      tayammumTitle: "Tayammum",
      tayammumIntro:
        "When water is unavailable or its use would be harmful, tayammum may be permitted under specific conditions using clean earth or an eligible earth-derived surface.",
      tayammumWhenTitle: "When may tayammum be used?",
      tayammumWhen: [
        "When water cannot be found.",
        "When there is a credible concern that using water would worsen an illness or cause harm.",
        "When the other required conditions are met; learn these from a reliable scholar."
      ],
      tayammumStepsTitle: "General steps",
      tayammumSteps: [
        "Make the intention for tayammum.",
        "Use a clean, legally suitable earth-derived surface.",
        "Wipe the face.",
        "Wipe the hands according to the reliable method you follow; details and limits differ."
      ],
      tayammumNoteTitle: "Please note",
      tayammumNote:
        "Scholars differ about eligible materials, the extent of wiping and conditions. This brief outline is not a complete legal ruling.",

      cleanKicker: "LESSON 4",
      cleanTitle: "Impurity & cleanliness",
      cleanIntro:
        "Before prayer, the body, clothing and prayer place must meet the requirements of purity. Distinguish established impurity from mere doubt.",
      cleanCheckTitle: "Before prayer, check that you have",
      cleanChecks: [
        "Ensured the body and clothing are pure.",
        "Kept the prayer place clean.",
        "Removed any impurity appropriately.",
        "Learned reliable guidance rather than becoming distressed by repeated doubts."
      ],

      recapKicker: "KEY POINTS",
      recapTitle: "Quick review",
      recapList: [
        "Attain the purification required before prayer.",
        "Learn wudu, ghusl and tayammum as separate topics.",
        "Keep the body, clothing and prayer place clean.",
        "Ask a trusted scholar about matters you are unsure of."
      ],
      disclaimer:
        "Educational overview: consult a qualified, trusted scholar for detailed rulings and personal circumstances.",
      footerText:
        "IBADAT • Learn with care, practice with sincerity"
    },

    hi: {
      heroEyebrow: "IBADAT • नमाज़ सीखें",
      pageTitle: "पवित्रता",
      pageSubtitle:
        "इबादत से पहले स्वच्छता और धार्मिक पवित्रता की सरल जानकारी",

      introKicker: "शुरू करें",
      introTitle: "पवित्रता क्या है और क्यों ज़रूरी है?",
      introText:
        "पवित्रता में शरीर, कपड़ों और नमाज़ की जगह को साफ़ रखना तथा इबादत के लिए आवश्यक धार्मिक पवित्रता प्राप्त करना शामिल है। नमाज़ से पहले की आवश्यक बातें जानना हर मुसलमान के लिए महत्वपूर्ण है।",

      contentsTitle: "इस पेज पर",
      contents: [
        "वुज़ू",
        "ग़ुस्ल",
        "तयम्मुम",
        "नापाकी और स्वच्छता"
      ],

      wuduKicker: "पहला पाठ",
      wuduTitle: "वुज़ू",
      wuduIntro:
        "वुज़ू नमाज़ के लिए धार्मिक पवित्रता प्राप्त करने का तरीका है, जिसमें शरीर के कुछ अंग धोए और कुछ स्थानों पर मसह किया जाता है।",
      wuduStepsTitle: "वुज़ू के सामान्य चरण",
      wuduSteps: [
        "नीयत करें और बिस्मिल्लाह कहें।",
        "दोनों हाथ कलाइयों तक धोएँ।",
        "कुल्ली करें और नाक में पानी डालें।",
        "पूरा चेहरा धोएँ।",
        "दोनों बाज़ू कोहनी सहित धोएँ।",
        "गीले हाथों से सिर का मसह करें; कानों के मसह का हुक्म भी सीखें।",
        "दोनों पैर टखनों सहित धोएँ।"
      ],
      wuduNoteTitle: "याद रखें",
      wuduNote:
        "क्रम, फ़र्ज़ की संख्या और कुछ सुन्नतों तथा मसह के विवरण में फ़िक़्ही मतभेद हैं। अपने भरोसेमंद विद्वान से सीखें।",
      wuduBreakTitle: "वुज़ू टूटने के कारण",
      wuduBreaks: [
        "पेशाब, मल या हवा निकलना।",
        "गहरी नींद या होश खोने की कुछ स्थितियाँ।",
        "कुछ अन्य मामलों में फ़िक़्ही मतभेद हो सकते हैं।"
      ],

      ghuslKicker: "दूसरा पाठ",
      ghuslTitle: "ग़ुस्ल",
      ghuslIntro:
        "ग़ुस्ल पूरे शरीर पर पानी पहुँचाकर बड़ी धार्मिक अपवित्रता से पवित्र होने का निर्धारित तरीका है।",
      ghuslWhenTitle: "ग़ुस्ल कब फ़र्ज़ हो सकता है?",
      ghuslWhen: [
        "वैवाहिक संभोग के बाद।",
        "यौन स्राव से जुड़ी कुछ निर्धारित स्थितियों में।",
        "मासिक धर्म या प्रसव के बाद का रक्तस्राव समाप्त होने पर।"
      ],
      ghuslStepsTitle: "सामान्य तरीका",
      ghuslSteps: [
        "पवित्रता की नीयत करें।",
        "शरीर पर लगी नापाकी हो तो उसे साफ़ करें।",
        "सुन्नत के तरीके से वुज़ू करें।",
        "सिर और पूरे शरीर तक पानी पहुँचाएँ; कोई हिस्सा सूखा न रहे।"
      ],
      ghuslNoteTitle: "महत्वपूर्ण",
      ghuslNote:
        "फ़र्ज़, नीयत और तरीके के कुछ विस्तृत नियम फ़िक़्ही मत के अनुसार अलग हो सकते हैं। निजी स्थिति में भरोसेमंद विद्वान से सलाह लें।",

      tayammumKicker: "तीसरा पाठ",
      tayammumTitle: "तयम्मुम",
      tayammumIntro:
        "जब पानी उपलब्ध न हो या उसका उपयोग हानिकारक हो, तो निश्चित शर्तों के साथ पाक मिट्टी या उपयुक्त मिट्टी-आधारित सतह से तयम्मुम किया जा सकता है।",
      tayammumWhenTitle: "तयम्मुम कब किया जा सकता है?",
      tayammumWhen: [
        "जब पानी उपलब्ध न हो।",
        "जब पानी इस्तेमाल करने से बीमारी बढ़ने या नुकसान होने की वास्तविक आशंका हो।",
        "जब अन्य आवश्यक शर्तें पूरी हों; इन्हें भरोसेमंद विद्वान से सीखें।"
      ],
      tayammumStepsTitle: "सामान्य चरण",
      tayammumSteps: [
        "तयम्मुम की नीयत करें।",
        "शरई तौर पर उपयुक्त साफ़ मिट्टी-आधारित सतह का उपयोग करें।",
        "चेहरे का मसह करें।",
        "भरोसेमंद तरीके के अनुसार हाथों का मसह करें; विवरण और सीमा में मतभेद हैं।"
      ],
      tayammumNoteTitle: "ध्यान दें",
      tayammumNote:
        "उपयुक्त सामग्री, मसह की सीमा और शर्तों में विद्वानों के मतभेद हैं। यह संक्षिप्त जानकारी पूर्ण फ़तवा नहीं है।",

      cleanKicker: "चौथा पाठ",
      cleanTitle: "नापाकी और स्वच्छता",
      cleanIntro:
        "नमाज़ से पहले शरीर, कपड़े और नमाज़ की जगह का पवित्र होना ज़रूरी है। पक्की नापाकी और केवल संदेह में अंतर समझें।",
      cleanCheckTitle: "नमाज़ से पहले जाँचें",
      cleanChecks: [
        "शरीर और कपड़ों की पवित्रता सुनिश्चित करें।",
        "नमाज़ की जगह साफ़ रखें।",
        "नापाकी हो तो उचित तरीके से दूर करें।",
        "बार-बार संदेह में परेशान होने के बजाय भरोसेमंद मार्गदर्शन सीखें।"
      ],

      recapKicker: "याद रखने योग्य",
      recapTitle: "संक्षिप्त दोहराव",
      recapList: [
        "नमाज़ से पहले आवश्यक पवित्रता प्राप्त करें।",
        "वुज़ू, ग़ुस्ल और तयम्मुम के नियम अलग-अलग सीखें।",
        "शरीर, कपड़े और नमाज़ की जगह साफ़ रखें।",
        "जिस बात में यक़ीन न हो, भरोसेमंद विद्वान से पूछें।"
      ],
      disclaimer:
        "शैक्षिक सारांश: विस्तृत धार्मिक नियमों और व्यक्तिगत परिस्थितियों के लिए योग्य, भरोसेमंद विद्वान से सलाह लें।",
      footerText:
        "IBADAT • ज्ञान सीखें, ईमानदारी से अमल करें"
    }
  };

  /* =========================================
     PAGE UPDATE HELPERS
     ========================================= */

  function setText(id, value) {
    const element = document.getElementById(id);

    if (element && typeof value === "string") {
      element.textContent = value;
    }
  }

  function setList(id, values) {
    const list = document.getElementById(id);

    if (!list || !Array.isArray(values)) {
      return;
    }

    list.replaceChildren();

    values.forEach(function (value) {
      const item = document.createElement("li");
      item.textContent = value;
      list.appendChild(item);
    });
  }

  /* =========================================
     APPLY LANGUAGE
     ========================================= */

  function applyLanguage(language) {
    const data = translations[language] || translations.bn;

    document.documentElement.lang = language;

    const textMap = {
      "hero-eyebrow": "heroEyebrow",
      "page-title": "pageTitle",
      "page-subtitle": "pageSubtitle",

      "intro-kicker": "introKicker",
      "intro-title": "introTitle",
      "intro-text": "introText",

      "contents-title": "contentsTitle",

      "wudu-kicker": "wuduKicker",
      "wudu-title": "wuduTitle",
      "wudu-intro": "wuduIntro",
      "wudu-steps-title": "wuduStepsTitle",
      "wudu-note-title": "wuduNoteTitle",
      "wudu-note": "wuduNote",
      "wudu-break-title": "wuduBreakTitle",

      "ghusl-kicker": "ghuslKicker",
      "ghusl-title": "ghuslTitle",
      "ghusl-intro": "ghuslIntro",
      "ghusl-when-title": "ghuslWhenTitle",
      "ghusl-steps-title": "ghuslStepsTitle",
      "ghusl-note-title": "ghuslNoteTitle",
      "ghusl-note": "ghuslNote",

      "tayammum-kicker": "tayammumKicker",
      "tayammum-title": "tayammumTitle",
      "tayammum-intro": "tayammumIntro",
      "tayammum-when-title": "tayammumWhenTitle",
      "tayammum-steps-title": "tayammumStepsTitle",
      "tayammum-note-title": "tayammumNoteTitle",
      "tayammum-note": "tayammumNote",

      "cleanliness-kicker": "cleanKicker",
      "cleanliness-title": "cleanTitle",
      "cleanliness-intro": "cleanIntro",
      "cleanliness-check-title": "cleanCheckTitle",

      "recap-kicker": "recapKicker",
      "recap-title": "recapTitle",
      "disclaimer": "disclaimer",
      "footer-text": "footerText"
    };

    Object.keys(textMap).forEach(function (id) {
      setText(id, data[textMap[id]]);
    });

    setList("wudu-steps", data.wuduSteps);
    setList("wudu-breaks", data.wuduBreaks);

    setList("ghusl-when", data.ghuslWhen);
    setList("ghusl-steps", data.ghuslSteps);

    setList("tayammum-when", data.tayammumWhen);
    setList("tayammum-steps", data.tayammumSteps);

    setList("cleanliness-checks", data.cleanChecks);
    setList("recap-list", data.recapList);

    const contents = document.getElementById("contents-links");

    if (contents) {
      const sectionIds = [
        "wudu",
        "ghusl",
        "tayammum",
        "cleanliness"
      ];

      contents.replaceChildren();

      data.contents.forEach(function (label, index) {
        const link = document.createElement("a");

        link.href = "#" + sectionIds[index];
        link.textContent = label;

        contents.appendChild(link);
      });
    }
  }

  /* =========================================
     APPLY DARK / LIGHT THEME
     ========================================= */

  function applyTheme(settings) {
    const darkEnabled =
      settings.dark === true ||
      settings.dark === "true" ||
      settings.theme === "dark";

    document.body.classList.toggle("dark-mode", darkEnabled);

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
     INITIALIZE
     ========================================= */

  function init() {
    const settings = getSettings();

    const language = ["bn", "en", "hi"].includes(settings.lang)
      ? settings.lang
      : "bn";

    applyLanguage(language);
    applyTheme(settings);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }
})();
