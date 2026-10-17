/* =========================================================
   IBADAT — NAMAZ PURITY PAGE
   Language: Bengali • English • Hindi
   Theme: Light / Dark
   Settings: localStorage "appSettings"
========================================================= */

"use strict";


/* -------------------- 1. TRANSLATIONS -------------------- */

const translations = {

  /* ==================== BENGALI ==================== */
  bn: {
    skipLink: "মূল অংশে যাও",
    homeLink: "হোম",
    namazLink: "নামাজ",

    heroEyebrow: "ইবাদতের প্রস্তুতি",
    heroTitle: "পবিত্রতা",
    heroIntro:
      "নামাজসহ বিভিন্ন ইবাদতের জন্য শরীর, পোশাক ও স্থান পবিত্র রাখা জরুরি। তাই পবিত্রতা অর্জনের সঠিক নিয়ম জানা প্রত্যেক মুসলিমের জন্য প্রয়োজনীয়।",

    contentsTitle: "পরিচ্ছন্নতা ও পবিত্রতার সহজ পাঠ",
    navWudu: "অজু",
    navGhusl: "গোসল",
    navTayammum: "তায়াম্মুম",
    navCleanliness: "নাপাকি ও পরিচ্ছন্নতা",
    navRules: "পবিত্রতার মৌলিক নিয়ম",

    /* অজু */
    wuduTitle: "অজু",
    wuduIntro:
      "অজু হলো নির্দিষ্ট অঙ্গগুলো নির্দিষ্ট নিয়মে ধোয়া এবং মাসেহ করার মাধ্যমে পবিত্রতা অর্জনের একটি পদ্ধতি। নামাজের জন্য অজুর সঠিক নিয়ম জানা জরুরি।",

    wuduBeforeTitle: "অজুর আগে যা জানা দরকার",
    wuduBeforeText:
      "অজুর জন্য পবিত্র পানি ব্যবহার করবে। শরীরের কোনো অঙ্গে পানি পৌঁছাতে বাধা দেয় এমন বস্তু থাকলে তা দূর করবে।",

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
      "প্রথমে ডান, তারপর বাম হাত আঙুলের ডগা থেকে কনুইসহ ধুবে।",

    wuduStep7Title: "মাথা ও কান মাসেহ করা",
    wuduStep7Text:
      "ভেজা হাত দিয়ে মাথা মাসেহ করবে এবং ভেজা আঙুল দিয়ে কান মুছবে।",

    wuduStep8Title: "দুই পা ধোয়া",
    wuduStep8Text:
      "প্রথমে ডান, তারপর বাম পা টাখনুসহ ভালোভাবে ধুবে; আঙুলের ফাঁকেও পানি পৌঁছাবে।",

    wuduFardTitle: "অজুর ফরজ",
    wuduFard1: "সম্পূর্ণ মুখ ধোয়া।",
    wuduFard2: "দুই হাত কনুইসহ ধোয়া।",
    wuduFard3: "মাথার অন্তত এক-চতুর্থাংশ মাসেহ করা।",
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
    wuduBreak3: "মুখভর্তি বমি হওয়া।",
    wuduBreak4: "গভীর ঘুম বা চেতনা হারানো।",

    /* গোসল */
    ghuslTitle: "গোসল",
    ghuslIntro:
      "বিশেষ কিছু অবস্থায় গোসলের মাধ্যমে পূর্ণ পবিত্রতা অর্জন করতে হয়। গোসলের সময় শরীরের প্রতিটি অংশে পানি পৌঁছানো জরুরি।",

    ghuslFardTitle: "গোসলের ফরজ",
    ghuslFard1: "ভালোভাবে কুলি করা।",
    ghuslFard2: "নাকে পানি পৌঁছানো।",
    ghuslFard3:
      "সমস্ত শরীরে পানি পৌঁছানো; কোনো অংশ শুকনো না রাখা।",

    ghuslStepsTitle: "গোসলের সহজ ধাপ",

    ghuslStep1Title: "নিয়ত করা",
    ghuslStep1Text:
      "পবিত্রতা অর্জনের উদ্দেশ্যে মনে মনে নিয়ত করবে।",

    ghuslStep2Title: "হাত ও শরীরের নাপাকি ধোয়া",
    ghuslStep2Text:
      "প্রথমে হাত ধুয়ে শরীরে নাপাকি থাকলে তা পরিষ্কার করবে।",

    ghuslStep3Title: "মাথায় পানি দেওয়া",
    ghuslStep3Text:
      "মাথা ও চুলের গোড়ায় পানি পৌঁছাবে।",

    ghuslStep4Title: "সমস্ত শরীর ধোয়া",
    ghuslStep4Text:
      "শরীরের ডান ও বাম দিকসহ সব অংশে পানি পৌঁছাবে।",

    /* তায়াম্মুম */
    tayammumTitle: "তায়াম্মুম",
    tayammumIntro:
      "পানি না পাওয়া গেলে বা পানি ব্যবহার করা ক্ষতিকর হলে শরিয়তের নিয়ম অনুযায়ী পবিত্র মাটি বা মাটিজাত বস্তু দিয়ে তায়াম্মুম করা যায়।",

    tayammumStepsTitle: "তায়াম্মুমের ধাপ",

    tayammumStep1Title: "নিয়ত ও হাত রাখা",
    tayammumStep1Text:
      "নিয়ত করে পবিত্র মাটিজাত বস্তুর ওপর দুই হাত রাখবে।",

    tayammumStep2Title: "মুখ মাসেহ করা",
    tayammumStep2Text:
      "দুই হাত দিয়ে সম্পূর্ণ মুখ মাসেহ করবে।",

    tayammumStep3Title: "দুই হাত মাসেহ করা",
    tayammumStep3Text:
      "নির্দেশিত নিয়মে দুই হাত কনুইসহ মাসেহ করবে।",

    /* পরিচ্ছন্নতা */
    cleanlinessTitle: "নাপাকি ও পরিচ্ছন্নতা",
    cleanlinessIntro:
      "ইবাদতের জন্য শরীর, পোশাক ও নামাজের স্থান নাপাকি থেকে পবিত্র রাখা জরুরি। পরিচ্ছন্নতা দৈনন্দিন জীবনেরও গুরুত্বপূর্ণ অংশ।",

    cleanlinessBodyTitle: "শরীর ও পোশাক পরিষ্কার রাখা",
    cleanlinessBodyText:
      "শরীর বা পোশাকে নাপাকি লাগলে নামাজের আগে তা শরিয়তের নিয়ম অনুযায়ী পরিষ্কার করবে।",

    cleanlinessPlaceTitle: "নামাজের স্থান পরিষ্কার রাখা",
    cleanlinessPlaceText:
      "যে স্থানে নামাজ পড়বে, সেখানে নাপাকি আছে কি না খেয়াল করবে এবং প্রয়োজন হলে পরিষ্কার করবে।",

    cleanlinessHabitsTitle: "দৈনন্দিন পরিচ্ছন্নতার অভ্যাস",
    cleanlinessHabit1:
      "টয়লেট ব্যবহারের পর ভালোভাবে পবিত্রতা অর্জন করবে।",
    cleanlinessHabit2:
      "শরীর, হাত, নখ ও পোশাক পরিচ্ছন্ন রাখবে।",
    cleanlinessHabit3:
      "পানি অপচয় করবে না এবং পরিচ্ছন্নতার জিনিস পরিষ্কার রাখবে।",

    /* মৌলিক নিয়ম */
    rulesTitle: "পবিত্রতার মৌলিক নিয়ম",
    rulesKnowTitle: "যা জানা দরকার",

    rulesItem1:
      "পবিত্রতা অর্জনের জন্য পরিষ্কার ও উপযুক্ত পানি ব্যবহার করবে।",
    rulesItem2:
      "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখবে।",
    rulesItem3:
      "অজু, গোসল ও তায়াম্মুমের নিয়ম পরিস্থিতি অনুযায়ী শিখবে।",
    rulesItem4:
      "পানি ব্যবহার সম্ভব না হলে বা ক্ষতিকর হলে তায়াম্মুমের বিধান জানতে হবে।",

    rulesDoubtTitle: "সন্দেহ হলে কী করবে?",
    rulesDoubtText:
      "কোনো বিষয় বুঝতে অসুবিধা হলে নির্ভরযোগ্য ইসলামি শিক্ষাসূত্র দেখে নেবে এবং প্রয়োজনে বিশ্বস্ত আলেমের পরামর্শ নেবে।",

    footerLine:
      "পবিত্রতা শেখো, আমল করো এবং ইবাদতে যত্নবান হও।"
  },


  /* ==================== ENGLISH ==================== */
  en: {
    skipLink: "Skip to main content",
    homeLink: "Home",
    namazLink: "Prayer",

    heroEyebrow: "Preparing for worship",
    heroTitle: "Purification",
    heroIntro:
      "Keeping the body, clothing, and place of prayer clean is essential for worship, including Salah. Every Muslim should learn the proper rules of purification.",

    contentsTitle: "A Simple Guide to Cleanliness and Purification",
    navWudu: "Wudu",
    navGhusl: "Ghusl",
    navTayammum: "Tayammum",
    navCleanliness: "Impurity and Cleanliness",
    navRules: "Basic Rules of Purification",

    /* Wudu */
    wuduTitle: "Wudu",
    wuduIntro:
      "Wudu is a method of purification that involves washing specific parts of the body and wiping others in a prescribed manner. Learning how to perform wudu correctly is essential for Salah.",

    wuduBeforeTitle: "Before Performing Wudu",
    wuduBeforeText:
      "Use pure water for wudu. Remove anything on the body that prevents water from reaching the required area.",

    wuduStepsTitle: "Steps of Wudu",

    wuduStep1Title: "Intention and Bismillah",
    wuduStep1Text:
      "Make the intention in your heart and begin by saying Bismillah.",

    wuduStep2Title: "Wash Both Hands",
    wuduStep2Text:
      "Wash both hands thoroughly up to the wrists.",

    wuduStep3Title: "Rinse the Mouth",
    wuduStep3Text:
      "Take water with the right hand and rinse your mouth.",

    wuduStep4Title: "Rinse the Nose",
    wuduStep4Text:
      "Draw water into the nose and clean it without causing discomfort.",

    wuduStep5Title: "Wash the Face",
    wuduStep5Text:
      "Wash the face from the hairline to the bottom of the chin and from one ear to the other.",

    wuduStep6Title: "Wash Both Arms to the Elbows",
    wuduStep6Text:
      "Wash the right arm first, then the left, including the elbows.",

    wuduStep7Title: "Wipe the Head and Ears",
    wuduStep7Text:
      "Wipe the head with wet hands and wipe the ears with wet fingers.",

    wuduStep8Title: "Wash Both Feet",
    wuduStep8Text:
      "Wash the right foot first, then the left, including the ankles. Make sure water reaches between the toes.",

    wuduFardTitle: "Obligatory Acts of Wudu",
    wuduFard1: "Wash the entire face.",
    wuduFard2: "Wash both arms, including the elbows.",
    wuduFard3: "Wipe at least one-quarter of the head.",
    wuduFard4: "Wash both feet, including the ankles.",

    wuduDuaTitle: "Dua After Wudu",
    pronunciationLabel: "Pronunciation:",
    meaningLabel: "Meaning:",

    wuduDuaPronunciation:
      "Ashhadu alla ilaha illallahu wahdahu la sharika lahu, wa ashhadu anna Muhammadan abduhu wa rasuluhu.",

    wuduDuaMeaning:
      "I bear witness that there is no true deity except Allah alone, without any partner. And I bear witness that Muhammad (peace be upon him) is His servant and Messenger.",

    wuduBreakTitle: "Common Things That Invalidate Wudu",
    wuduBreak1: "Passing urine, stool, or wind.",
    wuduBreak2:
      "Blood or pus flowing from the body, according to the Hanafi school.",
    wuduBreak3: "Vomiting a mouthful.",
    wuduBreak4: "Deep sleep or loss of consciousness.",

    /* Ghusl */
    ghuslTitle: "Ghusl",
    ghuslIntro:
      "In certain circumstances, a full ritual bath is required to attain purification. Water must reach every part of the body during ghusl.",

    ghuslFardTitle: "Obligatory Acts of Ghusl",
    ghuslFard1: "Rinse the mouth thoroughly.",
    ghuslFard2: "Ensure water reaches inside the nose.",
    ghuslFard3:
      "Wash the entire body, leaving no part dry.",

    ghuslStepsTitle: "Simple Steps of Ghusl",

    ghuslStep1Title: "Make the Intention",
    ghuslStep1Text:
      "Make the intention in your heart to attain purification.",

    ghuslStep2Title: "Wash the Hands and Remove Impurity",
    ghuslStep2Text:
      "Wash your hands first and clean any impurity from the body.",

    ghuslStep3Title: "Pour Water over the Head",
    ghuslStep3Text:
      "Ensure water reaches the head and the roots of the hair.",

    ghuslStep4Title: "Wash the Entire Body",
    ghuslStep4Text:
      "Ensure water reaches every part of the body, including both sides.",

    /* Tayammum */
    tayammumTitle: "Tayammum",
    tayammumIntro:
      "When water is unavailable or using it would be harmful, tayammum may be performed with clean earth or an appropriate earth-based surface according to Islamic rulings.",

    tayammumStepsTitle: "Steps of Tayammum",

    tayammumStep1Title: "Intention and Placing the Hands",
    tayammumStep1Text:
      "Make the intention and place both hands on a clean earth-based surface.",

    tayammumStep2Title: "Wipe the Face",
    tayammumStep2Text:
      "Wipe the entire face with both hands.",

    tayammumStep3Title: "Wipe Both Arms",
    tayammumStep3Text:
      "Wipe both arms up to the elbows according to the prescribed method.",

    /* Cleanliness */
    cleanlinessTitle: "Impurity and Cleanliness",
    cleanlinessIntro:
      "For worship, the body, clothing, and place of prayer must be free from impurity. Cleanliness is also an important part of daily life.",

    cleanlinessBodyTitle: "Keeping the Body and Clothing Clean",
    cleanlinessBodyText:
      "If impurity gets on the body or clothing, clean it according to Islamic rulings before praying.",

    cleanlinessPlaceTitle: "Keeping the Prayer Area Clean",
    cleanlinessPlaceText:
      "Check whether the place where you pray is free from impurity, and clean it when necessary.",

    cleanlinessHabitsTitle: "Daily Cleanliness Habits",
    cleanlinessHabit1:
      "Clean yourself properly after using the toilet.",
    cleanlinessHabit2:
      "Keep your body, hands, nails, and clothing clean.",
    cleanlinessHabit3:
      "Avoid wasting water and keep cleaning items clean.",

    /* Basic rules */
    rulesTitle: "Basic Rules of Purification",
    rulesKnowTitle: "What You Should Know",

    rulesItem1:
      "Use clean and suitable water for purification.",
    rulesItem2:
      "Keep your body, clothing, and place of prayer pure.",
    rulesItem3:
      "Learn the rules of wudu, ghusl, and tayammum for different situations.",
    rulesItem4:
      "Learn the rulings of tayammum when water is unavailable or harmful to use.",

    rulesDoubtTitle: "What If You Are Unsure?",
    rulesDoubtText:
      "If something is unclear, consult reliable Islamic learning resources and seek advice from a trusted scholar when necessary.",

    footerLine:
      "Learn purification, practise what you learn, and take care in worship."
  },


  /* ==================== HINDI ==================== */
  hi: {
    skipLink: "मुख्य सामग्री पर जाएँ",
    homeLink: "होम",
    namazLink: "नमाज़",

    heroEyebrow: "इबादत की तैयारी",
    heroTitle: "पवित्रता",
    heroIntro:
      "नमाज़ सहित विभिन्न इबादतों के लिए शरीर, कपड़े और नमाज़ की जगह को पाक रखना ज़रूरी है। इसलिए हर मुसलमान के लिए पवित्रता के सही नियम सीखना आवश्यक है।",

    contentsTitle: "सफ़ाई और पवित्रता की आसान जानकारी",
    navWudu: "वुज़ू",
    navGhusl: "ग़ुस्ल",
    navTayammum: "तयम्मुम",
    navCleanliness: "नापाकी और सफ़ाई",
    navRules: "पवित्रता के बुनियादी नियम",

    /* Wudu */
    wuduTitle: "वुज़ू",
    wuduIntro:
      "वुज़ू पवित्रता हासिल करने का एक तरीक़ा है, जिसमें कुछ अंगों को निर्धारित तरीके से धोया और कुछ को मसह किया जाता है। नमाज़ के लिए सही वुज़ू करना सीखना ज़रूरी है।",

    wuduBeforeTitle: "वुज़ू से पहले क्या जानें",
    wuduBeforeText:
      "वुज़ू के लिए पाक पानी इस्तेमाल करें। शरीर पर ऐसी कोई चीज़ हो जो पानी को ज़रूरी हिस्से तक पहुँचने से रोके, तो उसे हटा दें।",

    wuduStepsTitle: "वुज़ू के चरण",

    wuduStep1Title: "नीयत और बिस्मिल्लाह",
    wuduStep1Text:
      "दिल में वुज़ू की नीयत करें और बिस्मिल्लाह कहकर शुरू करें।",

    wuduStep2Title: "दोनों हाथ धोना",
    wuduStep2Text:
      "दोनों हाथों को कलाई तक अच्छी तरह धोएँ।",

    wuduStep3Title: "कुल्ली करना",
    wuduStep3Text:
      "दाएँ हाथ से पानी लेकर मुँह में कुल्ली करें।",

    wuduStep4Title: "नाक में पानी डालना",
    wuduStep4Text:
      "नाक में पानी डालकर साफ़ करें, लेकिन तकलीफ़ न पहुँचाएँ।",

    wuduStep5Title: "चेहरा धोना",
    wuduStep5Text:
      "बालों की शुरुआत से ठुड्डी के नीचे तक और एक कान से दूसरे कान तक चेहरा धोएँ।",

    wuduStep6Title: "कोहनियों सहित दोनों बाँहें धोना",
    wuduStep6Text:
      "पहले दाईं और फिर बाईं बाँह को उँगलियों से कोहनी सहित धोएँ।",

    wuduStep7Title: "सिर और कानों का मसह",
    wuduStep7Text:
      "गीले हाथों से सिर का मसह करें और गीली उँगलियों से कानों का मसह करें।",

    wuduStep8Title: "दोनों पैर धोना",
    wuduStep8Text:
      "पहले दायाँ और फिर बायाँ पैर टखनों सहित अच्छी तरह धोएँ। उँगलियों के बीच भी पानी पहुँचाएँ।",

    wuduFardTitle: "वुज़ू के फ़र्ज़",
    wuduFard1: "पूरा चेहरा धोना।",
    wuduFard2: "दोनों बाँहें कोहनियों सहित धोना।",
    wuduFard3: "सिर के कम-से-कम एक चौथाई हिस्से का मसह करना।",
    wuduFard4: "दोनों पैर टखनों सहित धोना।",

    wuduDuaTitle: "वुज़ू के बाद की दुआ",
    pronunciationLabel: "उच्चारण:",
    meaningLabel: "अर्थ:",

    wuduDuaPronunciation:
      "अश्हदु अल्ला इलाहा इल्लल्लाहु वह्दहू ला शरीका लहू, व अश्हदु अन्ना मुहम्मदन अब्दुहू व रसूलुहू।",

    wuduDuaMeaning:
      "मैं गवाही देता हूँ कि अल्लाह के सिवा कोई सच्चा उपास्य नहीं। वह अकेला है, उसका कोई साझीदार नहीं। और मैं गवाही देता हूँ कि मुहम्मद (सल्लल्लाहु अलैहि वसल्लम) उसके बंदे और रसूल हैं।",

    wuduBreakTitle: "वुज़ू टूटने के सामान्य कारण",
    wuduBreak1: "पेशाब, पाख़ाना या हवा निकलना।",
    wuduBreak2:
      "शरीर से खून या पीप निकलकर बहना (हनफ़ी मत के अनुसार)।",
    wuduBreak3: "भर मुँह उल्टी होना।",
    wuduBreak4: "गहरी नींद या बेहोशी।",

    /* Ghusl */
    ghuslTitle: "ग़ुस्ल",
    ghuslIntro:
      "कुछ विशेष परिस्थितियों में पूरी पाकी हासिल करने के लिए ग़ुस्ल ज़रूरी होता है। ग़ुस्ल के दौरान शरीर के हर हिस्से तक पानी पहुँचना चाहिए।",

    ghuslFardTitle: "ग़ुस्ल के फ़र्ज़",
    ghuslFard1: "अच्छी तरह कुल्ली करना।",
    ghuslFard2: "नाक के अंदर पानी पहुँचाना।",
    ghuslFard3:
      "पूरे शरीर तक पानी पहुँचाना और कोई हिस्सा सूखा न छोड़ना।",

    ghuslStepsTitle: "ग़ुस्ल के आसान चरण",

    ghuslStep1Title: "नीयत करना",
    ghuslStep1Text:
      "पाकी हासिल करने की नीयत दिल में करें।",

    ghuslStep2Title: "हाथ धोना और नापाकी साफ़ करना",
    ghuslStep2Text:
      "पहले हाथ धोएँ और शरीर पर लगी नापाकी साफ़ करें।",

    ghuslStep3Title: "सिर पर पानी डालना",
    ghuslStep3Text:
      "सिर और बालों की जड़ों तक पानी पहुँचाएँ।",

    ghuslStep4Title: "पूरा शरीर धोना",
    ghuslStep4Text:
      "शरीर के दाएँ और बाएँ हिस्से सहित हर जगह पानी पहुँचाएँ।",

    /* Tayammum */
    tayammumTitle: "तयम्मुम",
    tayammumIntro:
      "पानी उपलब्ध न होने पर या पानी इस्तेमाल करना नुकसानदेह होने पर इस्लामी नियमों के अनुसार पाक मिट्टी या मिट्टी से बनी उपयुक्त सतह से तयम्मुम किया जा सकता है।",

    tayammumStepsTitle: "तयम्मुम के चरण",

    tayammumStep1Title: "नीयत और हाथ रखना",
    tayammumStep1Text:
      "नीयत करके दोनों हाथ पाक मिट्टी या उपयुक्त मिट्टी वाली सतह पर रखें।",

    tayammumStep2Title: "चेहरे का मसह",
    tayammumStep2Text:
      "दोनों हाथों से पूरे चेहरे का मसह करें।",

    tayammumStep3Title: "दोनों बाँहों का मसह",
    tayammumStep3Text:
      "निर्धारित तरीके से दोनों बाँहों का कोहनियों सहित मसह करें।",

    /* Cleanliness */
    cleanlinessTitle: "नापाकी और सफ़ाई",
    cleanlinessIntro:
      "इबादत के लिए शरीर, कपड़े और नमाज़ की जगह को नापाकी से पाक रखना ज़रूरी है। रोज़मर्रा की ज़िंदगी में भी सफ़ाई महत्वपूर्ण है।",

    cleanlinessBodyTitle: "शरीर और कपड़ों की सफ़ाई",
    cleanlinessBodyText:
      "यदि शरीर या कपड़ों पर नापाकी लग जाए, तो नमाज़ से पहले इस्लामी नियमों के अनुसार उसे साफ़ करें।",

    cleanlinessPlaceTitle: "नमाज़ की जगह साफ़ रखना",
    cleanlinessPlaceText:
      "नमाज़ पढ़ने की जगह पर नापाकी है या नहीं, इसका ध्यान रखें और ज़रूरत पड़ने पर उसे साफ़ करें।",

    cleanlinessHabitsTitle: "रोज़मर्रा की सफ़ाई की आदतें",
    cleanlinessHabit1:
      "शौचालय इस्तेमाल करने के बाद अच्छी तरह पाकी हासिल करें।",
    cleanlinessHabit2:
      "शरीर, हाथ, नाखून और कपड़े साफ़ रखें।",
    cleanlinessHabit3:
      "पानी बर्बाद न करें और सफ़ाई के सामान को साफ़ रखें।",

    /* Basic rules */
    rulesTitle: "पवित्रता के बुनियादी नियम",
    rulesKnowTitle: "क्या जानना ज़रूरी है",

    rulesItem1:
      "पाकी हासिल करने के लिए साफ़ और उपयुक्त पानी इस्तेमाल करें।",
    rulesItem2:
      "शरीर, कपड़े और नमाज़ की जगह को पाक रखें।",
    rulesItem3:
      "अलग-अलग परिस्थितियों के अनुसार वुज़ू, ग़ुस्ल और तयम्मुम के नियम सीखें।",
    rulesItem4:
      "पानी उपलब्ध न होने या नुकसानदेह होने पर तयम्मुम के नियम जानें।",

    rulesDoubtTitle: "अगर कोई संदेह हो तो क्या करें?",
    rulesDoubtText:
      "यदि कोई बात समझ में न आए, तो विश्वसनीय इस्लामी अध्ययन-स्रोत देखें और ज़रूरत पड़ने पर किसी भरोसेमंद आलिम से सलाह लें।",

    footerLine:
      "पवित्रता सीखें, उस पर अमल करें और इबादत का ध्यान रखें।"
  }

};


/* -------------------- 2. LANGUAGE HELPERS -------------------- */

function getSupportedLanguage(language) {
  const value = String(language || "")
    .trim()
    .toLowerCase();

  if (value === "bn" || value.startsWith("bn-") ||
      value === "bengali" || value === "bangla") {
    return "bn";
  }

  if (value === "hi" || value.startsWith("hi-") ||
      value === "hindi") {
    return "hi";
  }

  if (value === "en" || value.startsWith("en-") ||
      value === "english") {
    return "en";
  }

  return "bn";
}


function readAppSettings() {
  try {
    const raw = localStorage.getItem("appSettings");

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed;
  } catch (error) {
    console.warn(
      "IBADAT: Could not read appSettings.",
      error
    );

    return {};
  }
}


function getLanguageFromSettings(settings) {
  const language =
    settings.lang ??
    settings.language ??
    settings.locale ??
    "bn";

  return getSupportedLanguage(language);
}


/* -------------------- 3. APPLY TRANSLATIONS -------------------- */

function applyLanguage(language) {
  const lang = getSupportedLanguage(language);
  const dictionary = translations[lang] || translations.bn;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (!key || !Object.prototype.hasOwnProperty.call(dictionary, key)) {
      return;
    }

    /*
      textContent ব্যবহার করা হচ্ছে যাতে অনুবাদ নিরাপদভাবে
      বসে এবং HTML structure নষ্ট না হয়।
    */
    element.textContent = dictionary[key];
  });

  /*
    আরবি দোয়াটি ইচ্ছাকৃতভাবে অনুবাদ করা হচ্ছে না।
    HTML-এ থাকা Arabic text অপরিবর্তিত থাকবে।
  */

  document.documentElement.dataset.lang = lang;

  return lang;
}


/* -------------------- 4. APPLY THEME -------------------- */

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

  /*
    Settings-এ theme না থাকলে light mode ব্যবহার হবে।
  */
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

  /*
    Theme পরিবর্তনের সময় browser UI-এর theme color-ও বদলাবে।
  */
  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      dark ? "#111b16" : "#174b38"
    );
  }

  return dark;
}


/* -------------------- 5. INITIALIZE PAGE -------------------- */

function initializePurityPage() {
  const settings = readAppSettings();

  const language = getLanguageFromSettings(settings);

  applyLanguage(language);
  applyTheme(settings);
}


/* -------------------- 6. SETTINGS CHANGE SUPPORT -------------------- */

/*
  একই সাইটের অন্য কোনো স্ক্রিপ্ট appSettings বদলালে
  এই পেজ খোলা থাকা অবস্থায়ও ভাষা ও থিম আপডেট হতে পারে।
*/

window.addEventListener("storage", (event) => {
  if (event.key !== "appSettings") {
    return;
  }

  const settings = readAppSettings();

  applyLanguage(getLanguageFromSettings(settings));
  applyTheme(settings);
});


/*
  অন্য JS ফাইল চাইলে ভাষা পরিবর্তনের পর এই event পাঠাতে পারে:

  window.dispatchEvent(
    new CustomEvent("ibadat:settings-changed")
  );
*/

window.addEventListener("ibadat:settings-changed", () => {
  const settings = readAppSettings();

  applyLanguage(getLanguageFromSettings(settings));
  applyTheme(settings);
});


/*
  অন্যান্য পেজের স্ক্রিপ্ট প্রয়োজনে এই functions ব্যবহার করতে পারে।
  এগুলো global window object-এ প্রকাশ করা হচ্ছে।
*/

window.IBADATPurity = {
  translations,
  applyLanguage,
  applyTheme,
  readAppSettings,
  initialize: initializePurityPage
};


/* -------------------- 7. RUN -------------------- */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializePurityPage,
    { once: true }
  );
} else {
  initializePurityPage();
}  
