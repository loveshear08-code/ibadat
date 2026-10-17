/* =====================================================
   IBADAT — PURITY PAGE
   Language: Bengali • English • Hindi
   Theme: Light / Dark
   Settings: appSettings
===================================================== */

"use strict";

/* ---------- 1. TRANSLATIONS ---------- */

const translations = {

  /* =============== BENGALI =============== */
  bn: {
    skipLink: "মূল অংশে যাও",

    heroTitle: "পবিত্রতা",
    heroIntro:
      "পবিত্রতা ইসলামের গুরুত্বপূর্ণ শিক্ষা। নামাজসহ বিভিন্ন ইবাদতের জন্য শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা জরুরি। অজু, গোসল ও তায়াম্মুমের সঠিক নিয়ম শিখে পরিচ্ছন্নতার অভ্যাস গড়ে তোলো।",

    navWudu: "অজু",
    navGhusl: "গোসল",
    navTayammum: "তায়াম্মুম",
    navCleanliness: "পরিচ্ছন্নতা",
    navRules: "মৌলিক নিয়ম",

    wuduTitle: "অজু",
    wuduIntro:
      "অজু হলো নির্দিষ্ট অঙ্গ ধোয়া ও মাসেহ করার মাধ্যমে পবিত্রতা অর্জনের পদ্ধতি। নামাজের জন্য অজুর নিয়ম জানা জরুরি।",
    wuduBeforeTitle: "অজুর আগে যা জানা দরকার",
    wuduBeforeText:
      "অজুর জন্য পবিত্র পানি ব্যবহার করবে। পানি পৌঁছাতে বাধা দেয় এমন বস্তু থাকলে তা সরিয়ে নেবে।",
    wuduStepsTitle: "অজুর ধাপগুলো",

    wuduStep1Title: "নিয়ত ও বিসমিল্লাহ",
    wuduStep1Text:
      "মনে মনে অজুর নিয়ত করবে এবং বিসমিল্লাহ বলে শুরু করবে।",
    wuduStep2Title: "দুই হাত ধোয়া",
    wuduStep2Text:
      "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুবে।",
    wuduStep3Title: "কুলি করা",
    wuduStep3Text:
      "ডান হাতে পানি নিয়ে মুখের ভেতর কুলি করবে।",
    wuduStep4Title: "নাকে পানি দেওয়া",
    wuduStep4Text:
      "নাকে পানি নিয়ে পরিষ্কার করবে; অতিরিক্ত কষ্ট করবে না।",
    wuduStep5Title: "মুখ ধোয়া",
    wuduStep5Text:
      "কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং এক কান থেকে অন্য কান পর্যন্ত মুখ ধুবে।",
    wuduStep6Title: "দুই হাত কনুইসহ ধোয়া",
    wuduStep6Text:
      "প্রথমে ডান, তারপর বাম হাত কনুইসহ ধুবে।",
    wuduStep7Title: "মাথা ও কান মাসেহ",
    wuduStep7Text:
      "ভেজা হাত দিয়ে মাথা মাসেহ করবে এবং ভেজা আঙুল দিয়ে কান মুছবে।",
    wuduStep8Title: "দুই পা ধোয়া",
    wuduStep8Text:
      "প্রথমে ডান, তারপর বাম পা টাখনুসহ ধুবে। আঙুলের ফাঁকেও পানি পৌঁছাবে।",

    wuduFardTitle: "অজুর ফরজ",
    wuduFard1: "সম্পূর্ণ মুখ ধোয়া।",
    wuduFard2: "দুই হাত কনুইসহ ধোয়া।",
    wuduFard3: "মাথার মাসেহ করা।",
    wuduFard4: "দুই পা টাখনুসহ ধোয়া।",

    wuduDuaTitle: "অজুর পরের দোয়া",
    pronunciationLabel: "উচ্চারণ:",
    meaningLabel: "অর্থ:",
    wuduDuaPronunciation:
      "আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহু।",
    wuduDuaMeaning:
      "আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি একক, তাঁর কোনো অংশীদার নেই। আমি আরও সাক্ষ্য দিচ্ছি যে মুহাম্মদ (সা.) তাঁর বান্দা ও রাসুল।",

    wuduBreakTitle: "অজু ভঙ্গের সাধারণ কারণ",
    wuduBreak1: "প্রস্রাব, পায়খানা বা বায়ু নির্গত হওয়া।",
    wuduBreak2:
      "শরীর থেকে রক্ত বা পুঁজ বের হয়ে গড়িয়ে পড়া (হানাফি মত অনুযায়ী)।",
    wuduBreak3: "মুখভর্তি বমি হওয়া (হানাফি মত অনুযায়ী)।",
    wuduBreak4: "গভীর ঘুম বা চেতনা হারানো।",

    ghuslTitle: "গোসল",
    ghuslIntro:
      "বিশেষ কিছু অবস্থায় গোসলের মাধ্যমে পূর্ণ পবিত্রতা অর্জন করতে হয়। গোসলের সময় শরীরের প্রতিটি অংশে পানি পৌঁছানো জরুরি।",
    ghuslFardTitle: "গোসলের ফরজ",
    ghuslFard1: "ভালোভাবে কুলি করা।",
    ghuslFard2: "নাকে পানি পৌঁছানো।",
    ghuslFard3: "সমস্ত শরীরে পানি পৌঁছানো; কোনো অংশ শুকনো না রাখা।",
    ghuslStepsTitle: "গোসলের সহজ ধাপ",
    ghuslStep1Title: "নিয়ত করা",
    ghuslStep1Text: "পবিত্রতা অর্জনের উদ্দেশ্যে মনে মনে নিয়ত করবে।",
    ghuslStep2Title: "হাত ও নাপাকি ধোয়া",
    ghuslStep2Text: "প্রথমে হাত ধুয়ে শরীরে নাপাকি থাকলে তা পরিষ্কার করবে।",
    ghuslStep3Title: "মাথায় পানি দেওয়া",
    ghuslStep3Text: "মাথা ও চুলের গোড়ায় পানি পৌঁছাবে।",
    ghuslStep4Title: "সমস্ত শরীর ধোয়া",
    ghuslStep4Text: "শরীরের ডান ও বাম দিকসহ সব অংশে পানি পৌঁছাবে।",

    tayammumTitle: "তায়াম্মুম",
    tayammumIntro:
      "পানি না পাওয়া গেলে বা পানি ব্যবহার করা ক্ষতিকর হলে শরিয়তের নিয়ম অনুযায়ী তায়াম্মুম করা যায়।",
    tayammumStepsTitle: "তায়াম্মুমের ধাপ",
    tayammumStep1Title: "নিয়ত ও হাত রাখা",
    tayammumStep1Text:
      "নিয়ত করে পবিত্র মাটিজাত বস্তুর ওপর দুই হাত রাখবে।",
    tayammumStep2Title: "মুখ মাসেহ করা",
    tayammumStep2Text: "দুই হাত দিয়ে সম্পূর্ণ মুখ মাসেহ করবে।",
    tayammumStep3Title: "দুই হাত মাসেহ করা",
    tayammumStep3Text:
      "শরিয়তের নির্দেশিত নিয়মে দুই হাত মাসেহ করবে।",

    cleanlinessTitle: "পরিচ্ছন্নতা",
    cleanlinessIntro:
      "ইবাদতের জন্য শরীর, পোশাক ও নামাজের স্থান নাপাকি থেকে পবিত্র রাখা জরুরি। পরিচ্ছন্নতা দৈনন্দিন জীবনেরও গুরুত্বপূর্ণ অংশ।",
    cleanlinessBodyTitle: "শরীর ও পোশাক পরিষ্কার রাখা",
    cleanlinessBodyText:
      "শরীর বা পোশাকে নাপাকি লাগলে নামাজের আগে তা শরিয়তের নিয়ম অনুযায়ী পরিষ্কার করবে।",
    cleanlinessPlaceTitle: "নামাজের স্থান পরিষ্কার রাখা",
    cleanlinessPlaceText:
      "যে স্থানে নামাজ পড়বে, সেখানে নাপাকি আছে কি না খেয়াল করবে এবং প্রয়োজন হলে পরিষ্কার করবে।",
    cleanlinessHabitsTitle: "দৈনন্দিন পরিচ্ছন্নতার অভ্যাস",
    cleanlinessHabit1: "টয়লেট ব্যবহারের পর ভালোভাবে পবিত্রতা অর্জন করবে।",
    cleanlinessHabit2: "শরীর, হাত, নখ ও পোশাক পরিচ্ছন্ন রাখবে।",
    cleanlinessHabit3: "পানি অপচয় করবে না এবং পরিচ্ছন্নতার জিনিস পরিষ্কার রাখবে।",

    rulesTitle: "মৌলিক নিয়ম",
    rulesKnowTitle: "যা জানা দরকার",
    rulesItem1: "পবিত্রতা অর্জনের জন্য উপযুক্ত পানি ব্যবহার করবে।",
    rulesItem2: "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখবে।",
    rulesItem3: "অজু, গোসল ও তায়াম্মুমের নিয়ম পরিস্থিতি অনুযায়ী শিখবে।",
    rulesItem4: "পানি ব্যবহার সম্ভব না হলে বা ক্ষতিকর হলে তায়াম্মুমের বিধান জানবে।",
    rulesDoubtTitle: "সন্দেহ হলে কী করবে?",
    rulesDoubtText:
      "কোনো বিষয় বুঝতে অসুবিধা হলে নির্ভরযোগ্য ইসলামি শিক্ষাসূত্র দেখবে এবং প্রয়োজনে বিশ্বস্ত আলেমের পরামর্শ নেবে।",

    footerTitle: "পবিত্রতা রক্ষা করো",
    footerLine: "ইবাদতকে সুন্দর ও কবুল হওয়ার যোগ্য করো।"
  },

  /* =============== ENGLISH =============== */
  en: {
    skipLink: "Skip to main content",

    heroTitle: "Purification",
    heroIntro:
      "Purification is an important teaching in Islam. Keeping the body, clothing, and prayer area pure is essential for worship. Learn the proper rules of wudu, ghusl, and tayammum and build good habits of cleanliness.",

    navWudu: "Wudu",
    navGhusl: "Ghusl",
    navTayammum: "Tayammum",
    navCleanliness: "Cleanliness",
    navRules: "Basic Rules",

    wuduTitle: "Wudu",
    wuduIntro:
      "Wudu is a method of purification involving washing specific parts of the body and wiping others. Learning its rules is essential for Salah.",
    wuduBeforeTitle: "Before Wudu",
    wuduBeforeText:
      "Use pure water and remove anything that prevents water from reaching the required areas.",
    wuduStepsTitle: "Steps of Wudu",

    wuduStep1Title: "Intention and Bismillah",
    wuduStep1Text: "Make the intention in your heart and begin with Bismillah.",
    wuduStep2Title: "Wash Both Hands",
    wuduStep2Text: "Wash both hands thoroughly up to the wrists.",
    wuduStep3Title: "Rinse the Mouth",
    wuduStep3Text: "Take water with the right hand and rinse your mouth.",
    wuduStep4Title: "Rinse the Nose",
    wuduStep4Text: "Draw water into the nose and clean it without causing discomfort.",
    wuduStep5Title: "Wash the Face",
    wuduStep5Text: "Wash from the hairline to the chin and from one ear to the other.",
    wuduStep6Title: "Wash Both Arms",
    wuduStep6Text: "Wash the right arm first, then the left, including the elbows.",
    wuduStep7Title: "Wipe the Head and Ears",
    wuduStep7Text: "Wipe the head with wet hands and wipe the ears with wet fingers.",
    wuduStep8Title: "Wash Both Feet",
    wuduStep8Text: "Wash both feet up to the ankles, ensuring water reaches between the toes.",

    wuduFardTitle: "Obligatory Acts of Wudu",
    wuduFard1: "Wash the entire face.",
    wuduFard2: "Wash both arms, including the elbows.",
    wuduFard3: "Wipe the head.",
    wuduFard4: "Wash both feet, including the ankles.",

    wuduDuaTitle: "Dua After Wudu",
    pronunciationLabel: "Pronunciation:",
    meaningLabel: "Meaning:",
    wuduDuaPronunciation:
      "Ashhadu alla ilaha illallahu wahdahu la sharika lahu, wa ashhadu anna Muhammadan abduhu wa rasuluhu.",
    wuduDuaMeaning:
      "I bear witness that there is no true deity except Allah alone, without any partner. I also bear witness that Muhammad (peace be upon him) is His servant and Messenger.",

    wuduBreakTitle: "Common Things That Invalidate Wudu",
    wuduBreak1: "Passing urine, stool, or wind.",
    wuduBreak2: "Flowing blood or pus, according to the Hanafi school.",
    wuduBreak3: "Vomiting a mouthful, according to the Hanafi school.",
    wuduBreak4: "Deep sleep or loss of consciousness.",

    ghuslTitle: "Ghusl",
    ghuslIntro:
      "In certain circumstances, a full ritual bath is required. Water must reach every part of the body.",
    ghuslFardTitle: "Obligatory Acts of Ghusl",
    ghuslFard1: "Rinse the mouth thoroughly.",
    ghuslFard2: "Ensure water reaches inside the nose.",
    ghuslFard3: "Wash the entire body without leaving any part dry.",
    ghuslStepsTitle: "Simple Steps of Ghusl",
    ghuslStep1Title: "Make the Intention",
    ghuslStep1Text: "Make the intention in your heart to attain purification.",
    ghuslStep2Title: "Wash Hands and Remove Impurity",
    ghuslStep2Text: "Wash your hands and clean any impurity from the body.",
    ghuslStep3Title: "Wash the Head",
    ghuslStep3Text: "Ensure water reaches the head and roots of the hair.",
    ghuslStep4Title: "Wash the Entire Body",
    ghuslStep4Text: "Ensure water reaches every part of the body.",

    tayammumTitle: "Tayammum",
    tayammumIntro:
      "When water is unavailable or harmful to use, tayammum may be performed according to Islamic rulings.",
    tayammumStepsTitle: "Steps of Tayammum",
    tayammumStep1Title: "Intention and Place the Hands",
    tayammumStep1Text: "Make the intention and place both hands on a suitable clean earth-based surface.",
    tayammumStep2Title: "Wipe the Face",
    tayammumStep2Text: "Wipe the entire face with both hands.",
    tayammumStep3Title: "Wipe Both Hands",
    tayammumStep3Text: "Wipe both hands according to the prescribed method.",

    cleanlinessTitle: "Cleanliness",
    cleanlinessIntro:
      "For worship, the body, clothing, and prayer area must be free from impurity. Cleanliness is also important in daily life.",
    cleanlinessBodyTitle: "Keep the Body and Clothing Clean",
    cleanlinessBodyText: "Clean impurity from the body or clothing according to Islamic rulings before praying.",
    cleanlinessPlaceTitle: "Keep the Prayer Area Clean",
    cleanlinessPlaceText: "Check the prayer area for impurity and clean it when necessary.",
    cleanlinessHabitsTitle: "Daily Cleanliness Habits",
    cleanlinessHabit1: "Clean yourself properly after using the toilet.",
    cleanlinessHabit2: "Keep your body, hands, nails, and clothing clean.",
    cleanlinessHabit3: "Avoid wasting water and keep cleaning items clean.",

    rulesTitle: "Basic Rules",
    rulesKnowTitle: "What You Should Know",
    rulesItem1: "Use suitable water for purification.",
    rulesItem2: "Keep your body, clothing, and prayer area pure.",
    rulesItem3: "Learn the rules of wudu, ghusl, and tayammum for different situations.",
    rulesItem4: "Learn the rulings of tayammum when water is unavailable or harmful.",
    rulesDoubtTitle: "What If You Are Unsure?",
    rulesDoubtText: "Consult reliable Islamic learning resources or a trusted scholar when needed.",

    footerTitle: "Maintain Purity",
    footerLine: "Make your worship beautiful and worthy of acceptance."
  },

  /* =============== HINDI =============== */
  hi: {
    skipLink: "मुख्य सामग्री पर जाएँ",

    heroTitle: "पवित्रता",
    heroIntro:
      "पवित्रता इस्लाम की एक महत्वपूर्ण शिक्षा है। नमाज़ के लिए शरीर, कपड़े और नमाज़ की जगह को पाक रखना ज़रूरी है। वुज़ू, ग़ुस्ल और तयम्मुम के सही नियम सीखें और सफ़ाई की अच्छी आदतें अपनाएँ।",

    navWudu: "वुज़ू",
    navGhusl: "ग़ुस्ल",
    navTayammum: "तयम्मुम",
    navCleanliness: "सफ़ाई",
    navRules: "बुनियादी नियम",

    wuduTitle: "वुज़ू",
    wuduIntro: "वुज़ू में कुछ अंगों को धोया और कुछ का मसह किया जाता है। नमाज़ के लिए सही वुज़ू करना सीखना ज़रूरी है।",
    wuduBeforeTitle: "वुज़ू से पहले",
    wuduBeforeText: "पाक पानी इस्तेमाल करें और पानी को ज़रूरी अंगों तक पहुँचने से रोकने वाली चीज़ हटा दें।",
    wuduStepsTitle: "वुज़ू के चरण",

    wuduStep1Title: "नीयत और बिस्मिल्लाह",
    wuduStep1Text: "दिल में नीयत करें और बिस्मिल्लाह कहकर शुरू करें।",
    wuduStep2Title: "दोनों हाथ धोना",
    wuduStep2Text: "दोनों हाथ कलाई तक अच्छी तरह धोएँ।",
    wuduStep3Title: "कुल्ली करना",
    wuduStep3Text: "दाएँ हाथ से पानी लेकर कुल्ली करें।",
    wuduStep4Title: "नाक में पानी डालना",
    wuduStep4Text: "नाक में पानी डालकर साफ़ करें, लेकिन तकलीफ़ न पहुँचाएँ।",
    wuduStep5Title: "चेहरा धोना",
    wuduStep5Text: "बालों की शुरुआत से ठुड्डी तक और एक कान से दूसरे कान तक चेहरा धोएँ।",
    wuduStep6Title: "दोनों बाँहें धोना",
    wuduStep6Text: "पहले दाईं और फिर बाईं बाँह कोहनी सहित धोएँ।",
    wuduStep7Title: "सिर और कानों का मसह",
    wuduStep7Text: "गीले हाथों से सिर और गीली उँगलियों से कानों का मसह करें।",
    wuduStep8Title: "दोनों पैर धोना",
    wuduStep8Text: "दोनों पैर टखनों सहित धोएँ और उँगलियों के बीच पानी पहुँचाएँ।",

    wuduFardTitle: "वुज़ू के फ़र्ज़",
    wuduFard1: "पूरा चेहरा धोना।",
    wuduFard2: "दोनों बाँहें कोहनियों सहित धोना।",
    wuduFard3: "सिर का मसह करना।",
    wuduFard4: "दोनों पैर टखनों सहित धोना।",

    wuduDuaTitle: "वुज़ू के बाद की दुआ",
    pronunciationLabel: "उच्चारण:",
    meaningLabel: "अर्थ:",
    wuduDuaPronunciation: "अश्हदु अल्ला इलाहा इल्लल्लाहु वह्दहू ला शरीका लहू, व अश्हदु अन्ना मुहम्मदन अब्दुहू व रसूलुहू।",
    wuduDuaMeaning: "मैं गवाही देता हूँ कि अल्लाह के सिवा कोई सच्चा उपास्य नहीं। वह अकेला है, उसका कोई साझीदार नहीं। मुहम्मद (सल्लल्लाहु अलैहि वसल्लम) उसके बंदे और रसूल हैं।",

    wuduBreakTitle: "वुज़ू टूटने के सामान्य कारण",
    wuduBreak1: "पेशाब, पाख़ाना या हवा निकलना।",
    wuduBreak2: "खून या पीप का बहना (हनफ़ी मत के अनुसार)।",
    wuduBreak3: "भर मुँह उल्टी होना (हनफ़ी मत के अनुसार)।",
    wuduBreak4: "गहरी नींद या बेहोशी।",

    ghuslTitle: "ग़ुस्ल",
    ghuslIntro: "कुछ विशेष परिस्थितियों में पूरी पाकी के लिए ग़ुस्ल ज़रूरी होता है। शरीर के हर हिस्से तक पानी पहुँचना चाहिए।",
    ghuslFardTitle: "ग़ुस्ल के फ़र्ज़",
    ghuslFard1: "अच्छी तरह कुल्ली करना।",
    ghuslFard2: "नाक के अंदर पानी पहुँचाना।",
    ghuslFard3: "पूरे शरीर तक पानी पहुँचाना।",
    ghuslStepsTitle: "ग़ुस्ल के आसान चरण",
    ghuslStep1Title: "नीयत करना",
    ghuslStep1Text: "पाकी हासिल करने की नीयत करें।",
    ghuslStep2Title: "हाथ और नापाकी साफ़ करना",
    ghuslStep2Text: "पहले हाथ धोएँ और शरीर पर लगी नापाकी साफ़ करें।",
    ghuslStep3Title: "सिर पर पानी डालना",
    ghuslStep3Text: "सिर और बालों की जड़ों तक पानी पहुँचाएँ।",
    ghuslStep4Title: "पूरा शरीर धोना",
    ghuslStep4Text: "शरीर के हर हिस्से तक पानी पहुँचाएँ।",

    tayammumTitle: "तयम्मुम",
    tayammumIntro: "पानी न मिलने या पानी इस्तेमाल करना नुकसानदेह होने पर इस्लामी नियमों के अनुसार तयम्मुम किया जा सकता है।",
    tayammumStepsTitle: "तयम्मुम के चरण",
    tayammumStep1Title: "नीयत और हाथ रखना",
    tayammumStep1Text: "नीयत करके दोनों हाथ पाक मिट्टी या उपयुक्त सतह पर रखें।",
    tayammumStep2Title: "चेहरे का मसह",
    tayammumStep2Text: "दोनों हाथों से पूरे चेहरे का मसह करें।",
    tayammumStep3Title: "दोनों हाथों का मसह",
    tayammumStep3Text: "निर्धारित तरीके से दोनों हाथों का मसह करें।",

    cleanlinessTitle: "सफ़ाई",
    cleanlinessIntro: "इबादत के लिए शरीर, कपड़े और नमाज़ की जगह को नापाकी से पाक रखना ज़रूरी है।",
    cleanlinessBodyTitle: "शरीर और कपड़ों की सफ़ाई",
    cleanlinessBodyText: "नमाज़ से पहले शरीर या कपड़ों पर लगी नापाकी को इस्लामी नियमों के अनुसार साफ़ करें।",
    cleanlinessPlaceTitle: "नमाज़ की जगह साफ़ रखना",
    cleanlinessPlaceText: "नमाज़ की जगह पर नापाकी हो तो उसे साफ़ करें।",
    cleanlinessHabitsTitle: "रोज़मर्रा की सफ़ाई",
    cleanlinessHabit1: "शौचालय के बाद अच्छी तरह पाकी हासिल करें।",
    cleanlinessHabit2: "शरीर, हाथ, नाखून और कपड़े साफ़ रखें।",
    cleanlinessHabit3: "पानी बर्बाद न करें और सफ़ाई का सामान साफ़ रखें।",

    rulesTitle: "बुनियादी नियम",
    rulesKnowTitle: "क्या जानना ज़रूरी है",
    rulesItem1: "पाकी के लिए उपयुक्त पानी इस्तेमाल करें।",
    rulesItem2: "शरीर, कपड़े और नमाज़ की जगह पाक रखें।",
    rulesItem3: "वुज़ू, ग़ुस्ल और तयम्मुम के नियम सीखें।",
    rulesItem4: "पानी न मिलने या नुकसानदेह होने पर तयम्मुम के नियम जानें।",
    rulesDoubtTitle: "संदेह होने पर क्या करें?",
    rulesDoubtText: "विश्वसनीय इस्लामी स्रोत देखें और ज़रूरत पड़ने पर किसी भरोसेमंद आलिम से सलाह लें।",

    footerTitle: "पवित्रता बनाए रखें",
    footerLine: "इबादत को सुंदर और क़बूल होने योग्य बनाएँ।"
  }
};


/* ---------- 2. SUPPORTED LANGUAGE ---------- */

function getSupportedLanguage(language) {
  const value = String(language || "")
    .trim()
    .toLowerCase();

  if (
    value === "bn" ||
    value.startsWith("bn-") ||
    value === "bengali" ||
    value === "bangla"
  ) {
    return "bn";
  }

  if (
    value === "en" ||
    value.startsWith("en-") ||
    value === "english"
  ) {
    return "en";
  }

  if (
    value === "hi" ||
    value.startsWith("hi-") ||
    value === "hindi"
  ) {
    return "hi";
  }

  return "bn";
}


/* ---------- 3. READ APP SETTINGS ---------- */

function readAppSettings() {
  try {
    const raw = localStorage.getItem("appSettings");

    if (!raw) return {};

    const settings = JSON.parse(raw);

    if (!settings || typeof settings !== "object") {
      return {};
    }

    return settings;
  } catch (error) {
    console.warn("IBADAT: appSettings পড়া যায়নি।", error);
    return {};
  }
}


function getLanguageFromSettings(settings) {
  return getSupportedLanguage(
    settings.lang ??
    settings.language ??
    settings.locale ??
    "bn"
  );
}


/* ---------- 4. APPLY LANGUAGE ---------- */

function applyLanguage(language) {
  const lang = getSupportedLanguage(language);
  const dictionary = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (
      key &&
      Object.prototype.hasOwnProperty.call(dictionary, key)
    ) {
      element.textContent = dictionary[key];
    }
  });

  /*
    প্রতিটি অংশের নম্বর ভাষা অনুযায়ী বদলাবে।
    HTML-এ lesson-number-এর মধ্যে ১, ২, ৩... থাকলেও
    JS সঠিকভাবে স্থানীয় অঙ্ক বসাবে।
  */
  const numberSystems = {
    bn: ["১", "২", "৩", "৪", "৫"],
    en: ["1", "2", "3", "4", "5"],
    hi: ["१", "२", "३", "४", "५"]
  };

  document.querySelectorAll(".lesson-number").forEach((badge, index) => {
    if (index < 5) {
      badge.textContent = numberSystems[lang][index];
    }
  });

  return lang;
}


/* ---------- 5. APPLY LIGHT / DARK THEME ---------- */

function isDarkTheme(settings) {
  if (typeof settings.dark === "boolean") {
    return settings.dark;
  }

  if (typeof settings.isDark === "boolean") {
    return settings.isDark;
  }

  if (typeof settings.darkMode === "boolean") {
    return settings.darkMode;
  }

  if (typeof settings.theme === "string") {
    return settings.theme.toLowerCase() === "dark";
  }

  return false;
}


function applyTheme(settings = {}) {
  const dark = isDarkTheme(settings);
  const root = document.documentElement;
  const body = document.body;

  root.classList.toggle("dark", dark);
  root.classList.toggle("dark-mode", dark);

  body.classList.toggle("dark", dark);
  body.classList.toggle("dark-mode", dark);

  root.dataset.theme = dark ? "dark" : "light";
  body.dataset.theme = dark ? "dark" : "light";

  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      dark ? "#172019" : "#17583e"
    );
  }

  return dark;
}


/* ---------- 6. INITIALIZE ---------- */

function initializePurityPage() {
  const settings = readAppSettings();

  applyLanguage(getLanguageFromSettings(settings));
  applyTheme(settings);
}


/* ---------- 7. SETTINGS UPDATE SUPPORT ---------- */

/*
  একই সাইটের অন্য পেজ appSettings পরিবর্তন করলে
  এই পেজেও ভাষা ও থিম আপডেট হবে।
*/

window.addEventListener("storage", (event) => {
  if (event.key !== "appSettings") return;

  initializePurityPage();
});


window.addEventListener("ibadat:settings-changed", () => {
  initializePurityPage();
});


/* ---------- 8. EXPOSE FUNCTIONS ---------- */

window.IBADATPurity = {
  translations,
  applyLanguage,
  applyTheme,
  readAppSettings,
  initialize: initializePurityPage
};


/* ---------- 9. RUN ---------- */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializePurityPage,
    { once: true }
  );
} else {
  initializePurityPage();
}
