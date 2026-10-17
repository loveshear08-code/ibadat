
/* =========================================================
   IBADAT — NAMAZ PURITY PAGE
   File: js/namaz-purity.js
   Fresh, complete version
   Languages: Bengali, English, Hindi
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     1. LANGUAGE CONTENT
     --------------------------------------------------------- */

  const translations = {
    bn: {
      pageTitle: "পবিত্রতা | ইবাদত",
      heroTitle: "পবিত্রতা",
      heroIntro:
        "ইবাদতের জন্য পবিত্রতা অর্জন, ওযু, গোসল, তায়াম্মুম ও পরিচ্ছন্নতার প্রয়োজনীয় নিয়মগুলো সহজভাবে শিখে নাও।",

      wuduTitle: "ওযু",
      wuduIntro:
        "নামাজের আগে ওযু করার নিয়মগুলো ধাপে ধাপে জেনে নাও। প্রতিটি ধাপ মনোযোগ দিয়ে অনুসরণ করো।",
      wuduStep1Title: "ওযুর নিয়ত",
      wuduStep1Text:
        "মনে মনে পবিত্রতা অর্জন ও ইবাদতের প্রস্তুতির নিয়ত করো। নিয়ত মূলত অন্তরের বিষয়।",
      wuduStep2Title: "দুই হাত ধোয়া",
      wuduStep2Text:
        "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নাও।",
      wuduStep3Title: "কুলি করা",
      wuduStep3Text:
        "পরিষ্কার পানি দিয়ে মুখের ভেতর ভালোভাবে কুলি করো।",
      wuduStep4Title: "নাকে পানি দেওয়া",
      wuduStep4Text:
        "নাকে পানি নিয়ে পরিষ্কার করো। পানি ব্যবহারে অসুবিধা হলে সতর্ক থাকো।",
      wuduStep5Title: "মুখ ধোয়া",
      wuduStep5Text:
        "কপালের চুলের গোড়া থেকে থুতনি পর্যন্ত এবং এক কান থেকে অন্য কান পর্যন্ত মুখ ধুয়ে নাও।",
      wuduStep6Title: "দুই হাত ধোয়া",
      wuduStep6Text:
        "প্রথমে ডান হাত, তারপর বাম হাত কনুইসহ ধুয়ে নাও।",
      wuduStep7Title: "মাথা মাসেহ করা",
      wuduStep7Text:
        "ভেজা হাত দিয়ে মাথা মাসেহ করো।",
      wuduStep8Title: "দুই পা ধোয়া",
      wuduStep8Text:
        "প্রথমে ডান পা, তারপর বাম পা টাখনুসহ ভালোভাবে ধুয়ে নাও।",
      wuduNoteTitle: "মনে রাখবে",
      wuduNote:
        "পানি অপচয় করবে না। ওযুর সময় অঙ্গগুলো ভালোভাবে পরিষ্কার করো এবং ধাপগুলো মনোযোগ দিয়ে অনুসরণ করো।",
      wuduBreakTitle: "ওযু নষ্ট হওয়ার কিছু সাধারণ কারণ",
      wuduBreak1: "প্রস্রাব বা পায়খানা করা কিংবা বায়ু নির্গত হওয়া।",
      wuduBreak2: "শরীর থেকে রক্ত বা পুঁজ বের হওয়া।",
      wuduBreak3: "বমি হওয়া।",
      wuduBreak4: "গভীর ঘুম বা চেতনা হারানো।",
      wuduBreakNote:
        "কিছু বিষয়ে বিধান ভিন্ন হতে পারে। প্রয়োজন হলে নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নাও।",

      ghuslTitle: "গোসল",
      ghuslIntro:
        "যেসব অবস্থায় গোসল ফরজ হয়, সেসব অবস্থায় সঠিকভাবে পবিত্রতা অর্জনের জন্য গোসলের নিয়ম জেনে নাও।",
      ghuslWhenTitle: "যেসব অবস্থায় গোসল ফরজ হয়",
      ghuslWhen1: "স্বামী-স্ত্রীর সহবাস হলে।",
      ghuslWhen2: "ঘুম বা জাগ্রত অবস্থায় বীর্যপাত হলে।",
      ghuslWhen3: "নারীদের মাসিক শেষ হলে।",
      ghuslWhen4: "সন্তান জন্মের পর নিফাসের রক্তপাত বন্ধ হলে।",
      ghuslWhenNote:
        "ব্যক্তিগত পরিস্থিতি অনুযায়ী কোনো বিষয়ের বিধান বুঝতে অসুবিধা হলে নির্ভরযোগ্য আলেমের পরামর্শ নাও।",

      ghuslStepsTitle: "গোসলের পদ্ধতি",
      ghuslStep1Title: "নিয়ত করা",
      ghuslStep1Text:
        "মনে মনে পবিত্রতা অর্জনের নিয়ত করো।",
      ghuslStep2Title: "হাত ও শরীরের অপবিত্রতা পরিষ্কার করা",
      ghuslStep2Text:
        "দুই হাত ধুয়ে শরীরে কোনো অপবিত্রতা থাকলে তা পরিষ্কার করে নাও।",
      ghuslStep3Title: "ওযু করা",
      ghuslStep3Text:
        "নামাজের ওযুর মতো ওযু করো। গোসলের স্থানে পানি জমলে পা ধোয়া শেষে করতে পারো।",
      ghuslStep4Title: "মাথায় পানি দেওয়া",
      ghuslStep4Text:
        "মাথায় পানি ঢালো এবং চুলের গোড়াসহ ভালোভাবে ভিজিয়ে নাও।",
      ghuslStep5Title: "সারা শরীর ধোয়া",
      ghuslStep5Text:
        "প্রথমে শরীরের ডান দিক, তারপর বাম দিকসহ পুরো শরীরে পানি পৌঁছাও।",
      ghuslStep6Title: "কোনো অংশ শুকনো না রাখা",
      ghuslStep6Text:
        "শরীরের প্রতিটি অংশে পানি পৌঁছেছে কি না নিশ্চিত হও। বগল, নাভি ও শরীরের ভাঁজের দিকে খেয়াল রাখো।",

      ghuslCareTitle: "গোসলের সময় খেয়াল রাখবে",
      ghuslCare1: "শরীরের প্রতিটি অংশে পানি পৌঁছাতে হবে।",
      ghuslCare2: "চুলের গোড়া ভালোভাবে ভেজাতে হবে।",
      ghuslCare3: "শরীরে কোনো অপবিত্রতা থাকলে তা পরিষ্কার করতে হবে।",
      ghuslCare4: "অপ্রয়োজনীয়ভাবে পানি অপচয় করা যাবে না।",

      tayammumTitle: "তায়াম্মুম",
      tayammumIntro:
        "পানি না পাওয়া গেলে অথবা পানি ব্যবহার করা সম্ভব না হলে নির্দিষ্ট শর্তে তায়াম্মুমের মাধ্যমে পবিত্রতা অর্জন করা যায়।",
      tayammumStep1Title: "নিয়ত করা",
      tayammumStep1Text:
        "তায়াম্মুমের মাধ্যমে পবিত্রতা অর্জনের নিয়ত করো।",
      tayammumStep2Title: "পবিত্র মাটিতে হাত লাগানো",
      tayammumStep2Text:
        "তায়াম্মুমের উপযোগী পবিত্র মাটি বা মাটিজাতীয় বস্তুর ওপর হাত লাগাও।",
      tayammumStep3Title: "মুখ ও হাত মাসেহ করা",
      tayammumStep3Text:
        "নির্ধারিত নিয়মে মুখ ও হাত মাসেহ করো।",
      tayammumNoteTitle: "গুরুত্বপূর্ণ কথা",
      tayammumNote:
        "তায়াম্মুমের শর্ত ও পদ্ধতি সঠিকভাবে জেনে নাও। প্রয়োজন হলে নির্ভরযোগ্য আলেমের পরামর্শ নাও।",

      cleanlinessTitle: "পরিচ্ছন্নতা",
      cleanlinessIntro:
        "ব্যক্তিগত পরিচ্ছন্নতা, পোশাক ও নামাজের স্থানের পবিত্রতার প্রতি যত্নশীল হও।",
      cleanliness1Title: "শরীর পরিষ্কার রাখা",
      cleanliness1Text:
        "শরীর পরিষ্কার রাখো এবং অপবিত্রতা লাগলে তা দূর করো।",
      cleanliness2Title: "পোশাক পরিষ্কার রাখা",
      cleanliness2Text:
        "নামাজের পোশাক পরিষ্কার রাখো এবং অপবিত্রতা থাকলে তা দূর করো।",
      cleanliness3Title: "নামাজের স্থান পরিষ্কার রাখা",
      cleanliness3Text:
        "নামাজ আদায়ের স্থান পরিচ্ছন্ন ও অপবিত্রতামুক্ত রাখো।",
      cleanliness4Title: "পরিচ্ছন্নতার অভ্যাস",
      cleanliness4Text:
        "নিয়মিত হাত ধোয়া, নখ পরিষ্কার রাখা এবং ব্যক্তিগত পরিচ্ছন্নতার যত্ন নেওয়ার অভ্যাস গড়ে তোলো।",

      rulesTitle: "পবিত্রতা সম্পর্কে কিছু কথা",
      rulesIntro:
        "পবিত্রতা অর্জনের ক্ষেত্রে প্রয়োজনীয় বিষয়গুলো মনে রাখো।",
      rule1Title: "পানি ব্যবহার",
      rule1Text:
        "পবিত্রতা অর্জনে পরিষ্কার ও উপযুক্ত পানি ব্যবহার করো।",
      rule2Title: "অপবিত্রতা দূর করা",
      rule2Text:
        "শরীর, পোশাক বা নামাজের স্থানে অপবিত্রতা থাকলে তা পরিষ্কার করো।",
      rule3Title: "পানি অপচয় নয়",
      rule3Text:
        "পবিত্রতা অর্জনের সময় প্রয়োজনের অতিরিক্ত পানি ব্যবহার করো না।",
      rule4Title: "সঠিক জ্ঞান অর্জন",
      rule4Text:
        "কোনো বিধান বুঝতে অসুবিধা হলে নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নাও।",

      pronunciationLabel: "উচ্চারণ:",
      meaningLabel: "অর্থ:",
      footerText: "জ্ঞান অর্জন করো ও আমল করো",
      backToTop: "উপরে ফিরে যাও",
      stepLabel: "ধাপ",
      imageUnavailable: "ছবিটি দেখানো যাচ্ছে না"
    },

    en: {
      pageTitle: "Purification | IBADAT",
      heroTitle: "Purification",
      heroIntro:
        "Learn the essential guidance on wudu, ghusl, tayammum and cleanliness for worship.",

      wuduTitle: "Wudu (Ablution)",
      wuduIntro:
        "Learn the steps of wudu before prayer and follow each step carefully.",
      wuduStep1Title: "Intention",
      wuduStep1Text:
        "Make the intention in your heart to attain purification and prepare for worship.",
      wuduStep2Title: "Wash the hands",
      wuduStep2Text:
        "Wash both hands thoroughly up to the wrists.",
      wuduStep3Title: "Rinse the mouth",
      wuduStep3Text:
        "Rinse your mouth thoroughly with clean water.",
      wuduStep4Title: "Clean the nose",
      wuduStep4Text:
        "Draw water into the nose and clean it, taking care not to cause discomfort.",
      wuduStep5Title: "Wash the face",
      wuduStep5Text:
        "Wash the face from the hairline to the chin and from one ear to the other.",
      wuduStep6Title: "Wash the arms",
      wuduStep6Text:
        "Wash the right arm and then the left, including the elbows.",
      wuduStep7Title: "Wipe the head",
      wuduStep7Text:
        "Wipe the head with wet hands.",
      wuduStep8Title: "Wash the feet",
      wuduStep8Text:
        "Wash the right foot and then the left, including the ankles.",
      wuduNoteTitle: "Remember",
      wuduNote:
        "Avoid wasting water. Clean each area properly and follow the steps attentively.",
      wuduBreakTitle: "Some commonly discussed causes that affect wudu",
      wuduBreak1: "Urinating, passing stool or passing wind.",
      wuduBreak2: "Bleeding or discharge of pus from the body.",
      wuduBreak3: "Vomiting.",
      wuduBreak4: "Deep sleep or loss of consciousness.",
      wuduBreakNote:
        "Rulings on some matters may differ. Consult a trusted scholar when needed.",

      ghuslTitle: "Ghusl (Ritual Bath)",
      ghuslIntro:
        "Learn how to perform ghusl correctly when a ritual bath is required.",
      ghuslWhenTitle: "When ghusl is obligatory",
      ghuslWhen1: "After sexual intercourse between spouses.",
      ghuslWhen2: "Following ejaculation during sleep or while awake.",
      ghuslWhen3: "When menstruation ends.",
      ghuslWhen4: "When postpartum bleeding ends.",
      ghuslWhenNote:
        "For questions about a specific personal situation, seek guidance from a trusted scholar.",

      ghuslStepsTitle: "How to perform ghusl",
      ghuslStep1Title: "Make the intention",
      ghuslStep1Text:
        "Make the intention in your heart to attain purification.",
      ghuslStep2Title: "Wash the hands and remove impurities",
      ghuslStep2Text:
        "Wash both hands and clean any impurity from the body.",
      ghuslStep3Title: "Perform wudu",
      ghuslStep3Text:
        "Perform wudu as you would for prayer. If water collects where you bathe, you may wash your feet at the end.",
      ghuslStep4Title: "Wash the head",
      ghuslStep4Text:
        "Pour water over the head and ensure that the hair roots are thoroughly wet.",
      ghuslStep5Title: "Wash the whole body",
      ghuslStep5Text:
        "Wash the right side first, then the left, ensuring water reaches the entire body.",
      ghuslStep6Title: "Ensure no area remains dry",
      ghuslStep6Text:
        "Check that water reaches every part, including the armpits, navel and folds of the body.",

      ghuslCareTitle: "Things to remember during ghusl",
      ghuslCare1: "Water should reach every part of the body.",
      ghuslCare2: "The roots of the hair should be thoroughly wet.",
      ghuslCare3: "Any impurity on the body should be removed.",
      ghuslCare4: "Do not waste water unnecessarily.",

      tayammumTitle: "Tayammum",
      tayammumIntro:
        "Under specific conditions, tayammum may be performed when water is unavailable or cannot be used.",
      tayammumStep1Title: "Make the intention",
      tayammumStep1Text:
        "Make the intention to attain purification through tayammum.",
      tayammumStep2Title: "Touch clean earth",
      tayammumStep2Text:
        "Place your hands on clean earth or a suitable earth-based surface.",
      tayammumStep3Title: "Wipe the face and hands",
      tayammumStep3Text:
        "Wipe the face and hands according to the prescribed method.",
      tayammumNoteTitle: "Important",
      tayammumNote:
        "Learn the conditions and method of tayammum correctly. Consult a trusted scholar if needed.",

      cleanlinessTitle: "Cleanliness",
      cleanlinessIntro:
        "Take care of personal hygiene and keep your clothing and prayer area clean.",
      cleanliness1Title: "Keep the body clean",
      cleanliness1Text:
        "Maintain personal cleanliness and remove impurities when present.",
      cleanliness2Title: "Keep clothing clean",
      cleanliness2Text:
        "Keep prayer clothing clean and remove any impurity from it.",
      cleanliness3Title: "Keep the prayer area clean",
      cleanliness3Text:
        "Keep the place where you pray clean and free from impurity.",
      cleanliness4Title: "Build clean habits",
      cleanliness4Text:
        "Develop regular habits such as washing your hands, keeping your nails clean and maintaining personal hygiene.",

      rulesTitle: "A few notes on purification",
      rulesIntro:
        "Keep these essential points in mind when seeking purification.",
      rule1Title: "Use suitable water",
      rule1Text:
        "Use clean, suitable water for purification.",
      rule2Title: "Remove impurities",
      rule2Text:
        "Clean any impurity from the body, clothing or prayer area.",
      rule3Title: "Avoid wasting water",
      rule3Text:
        "Do not use more water than necessary for purification.",
      rule4Title: "Learn correctly",
      rule4Text:
        "If you are unsure about a ruling, consult a trusted scholar.",

      pronunciationLabel: "Pronunciation:",
      meaningLabel: "Meaning:",
      footerText: "Gain knowledge and put it into practice",
      backToTop: "Back to top",
      stepLabel: "Step",
      imageUnavailable: "Image could not be displayed"
    },

    hi: {
      pageTitle: "पवित्रता | इबादत",
      heroTitle: "पवित्रता",
      heroIntro:
        "इबादत के लिए वुज़ू, ग़ुस्ल, तयम्मुम और स्वच्छता के आवश्यक नियम सरल तरीके से सीखें।",

      wuduTitle: "वुज़ू",
      wuduIntro:
        "नमाज़ से पहले वुज़ू करने के चरण सीखें और हर चरण को ध्यान से पूरा करें।",
      wuduStep1Title: "नीयत",
      wuduStep1Text:
        "पवित्रता प्राप्त करने और इबादत की तैयारी की नीयत दिल में करें।",
      wuduStep2Title: "दोनों हाथ धोना",
      wuduStep2Text:
        "दोनों हाथों को कलाई तक अच्छी तरह धोएँ।",
      wuduStep3Title: "कुल्ली करना",
      wuduStep3Text:
        "साफ पानी से मुँह अच्छी तरह कुल्ली करें।",
      wuduStep4Title: "नाक साफ करना",
      wuduStep4Text:
        "नाक में पानी लेकर उसे साफ करें और असुविधा से बचें।",
      wuduStep5Title: "चेहरा धोना",
      wuduStep5Text:
        "बालों की जड़ से ठुड्डी तक और एक कान से दूसरे कान तक चेहरा धोएँ।",
      wuduStep6Title: "दोनों बाँहें धोना",
      wuduStep6Text:
        "पहले दाहिनी और फिर बाईं बाँह को कोहनी सहित धोएँ।",
      wuduStep7Title: "सिर का मसह",
      wuduStep7Text:
        "गीले हाथों से सिर का मसह करें।",
      wuduStep8Title: "दोनों पैर धोना",
      wuduStep8Text:
        "पहले दाहिना और फिर बायाँ पैर टखनों सहित धोएँ।",
      wuduNoteTitle: "याद रखें",
      wuduNote:
        "पानी बर्बाद न करें। हर अंग को अच्छी तरह साफ करें और चरणों का ध्यान रखें।",
      wuduBreakTitle: "वुज़ू को प्रभावित करने वाले कुछ सामान्य कारण",
      wuduBreak1: "पेशाब करना, शौच करना या हवा निकलना।",
      wuduBreak2: "शरीर से खून या मवाद निकलना।",
      wuduBreak3: "उल्टी होना।",
      wuduBreak4: "गहरी नींद या होश खो देना।",
      wuduBreakNote:
        "कुछ मामलों के नियम अलग हो सकते हैं। आवश्यकता होने पर किसी विश्वसनीय आलिम से पूछें।",

      ghuslTitle: "ग़ुस्ल",
      ghuslIntro:
        "जब ग़ुस्ल आवश्यक हो, तब सही तरीके से पवित्रता प्राप्त करने की विधि सीखें।",
      ghuslWhenTitle: "जिन स्थितियों में ग़ुस्ल फ़र्ज़ होता है",
      ghuslWhen1: "पति-पत्नी के बीच संभोग होने पर।",
      ghuslWhen2: "सोते या जागते समय वीर्यपात होने पर।",
      ghuslWhen3: "महिलाओं का मासिक धर्म समाप्त होने पर।",
      ghuslWhen4: "प्रसव के बाद का रक्तस्राव बंद होने पर।",
      ghuslWhenNote:
        "किसी विशेष परिस्थिति के बारे में जानकारी चाहिए तो विश्वसनीय आलिम से सलाह लें।",

      ghuslStepsTitle: "ग़ुस्ल करने का तरीका",
      ghuslStep1Title: "नीयत करना",
      ghuslStep1Text:
        "पवित्रता प्राप्त करने की नीयत दिल में करें।",
      ghuslStep2Title: "हाथ धोना और गंदगी साफ करना",
      ghuslStep2Text:
        "दोनों हाथ धोएँ और शरीर पर लगी किसी भी नापाकी को साफ करें।",
      ghuslStep3Title: "वुज़ू करना",
      ghuslStep3Text:
        "नमाज़ के वुज़ू की तरह वुज़ू करें। यदि नहाने की जगह पानी जमा हो तो पैर अंत में धो सकते हैं।",
      ghuslStep4Title: "सिर पर पानी डालना",
      ghuslStep4Text:
        "सिर पर पानी डालें और बालों की जड़ों तक अच्छी तरह पानी पहुँचाएँ।",
      ghuslStep5Title: "पूरा शरीर धोना",
      ghuslStep5Text:
        "पहले शरीर का दाहिना भाग, फिर बायाँ भाग धोएँ और पूरे शरीर तक पानी पहुँचाएँ।",
      ghuslStep6Title: "कोई हिस्सा सूखा न छोड़ना",
      ghuslStep6Text:
        "सुनिश्चित करें कि बगल, नाभि और शरीर की सिलवटों सहित हर जगह पानी पहुँचे।",

      ghuslCareTitle: "ग़ुस्ल के समय ध्यान रखने योग्य बातें",
      ghuslCare1: "शरीर के हर हिस्से तक पानी पहुँचना चाहिए।",
      ghuslCare2: "बालों की जड़ों को अच्छी तरह भिगोना चाहिए।",
      ghuslCare3: "शरीर पर लगी नापाकी साफ करनी चाहिए।",
      ghuslCare4: "बिना ज़रूरत पानी बर्बाद न करें।",

      tayammumTitle: "तयम्मुम",
      tayammumIntro:
        "विशेष परिस्थितियों में पानी उपलब्ध न होने या पानी इस्तेमाल न कर सकने पर तयम्मुम किया जा सकता है।",
      tayammumStep1Title: "नीयत करना",
      tayammumStep1Text:
        "तयम्मुम के ज़रिए पवित्रता प्राप्त करने की नीयत करें।",
      tayammumStep2Title: "पाक मिट्टी को छूना",
      tayammumStep2Text:
        "पाक मिट्टी या मिट्टी से बनी उपयुक्त सतह पर हाथ लगाएँ।",
      tayammumStep3Title: "चेहरे और हाथों का मसह",
      tayammumStep3Text:
        "निर्धारित तरीके से चेहरे और हाथों का मसह करें।",
      tayammumNoteTitle: "महत्वपूर्ण बात",
      tayammumNote:
        "तयम्मुम की शर्तें और तरीका सही ढंग से सीखें। आवश्यकता होने पर विश्वसनीय आलिम से सलाह लें।",

      cleanlinessTitle: "स्वच्छता",
      cleanlinessIntro:
        "व्यक्तिगत स्वच्छता, कपड़ों और नमाज़ की जगह की सफाई का ध्यान रखें।",
      cleanliness1Title: "शरीर साफ रखना",
      cleanliness1Text:
        "शरीर को साफ रखें और नापाकी लगने पर उसे दूर करें।",
      cleanliness2Title: "कपड़े साफ रखना",
      cleanliness2Text:
        "नमाज़ के कपड़े साफ रखें और उन पर लगी नापाकी दूर करें।",
      cleanliness3Title: "नमाज़ की जगह साफ रखना",
      cleanliness3Text:
        "नमाज़ पढ़ने की जगह को साफ और नापाकी से मुक्त रखें।",
      cleanliness4Title: "स्वच्छ आदतें अपनाना",
      cleanliness4Text:
        "हाथ धोने, नाखून साफ रखने और व्यक्तिगत स्वच्छता की नियमित आदत बनाएँ।",

      rulesTitle: "पवित्रता के बारे में कुछ बातें",
      rulesIntro:
        "पवित्रता प्राप्त करते समय इन आवश्यक बातों को याद रखें।",
      rule1Title: "उपयुक्त पानी का उपयोग",
      rule1Text:
        "पवित्रता के लिए साफ और उपयुक्त पानी का इस्तेमाल करें।",
      rule2Title: "नापाकी दूर करना",
      rule2Text:
        "शरीर, कपड़ों या नमाज़ की जगह पर लगी नापाकी साफ करें।",
      rule3Title: "पानी बर्बाद न करें",
      rule3Text:
        "पवित्रता के लिए आवश्यकता से अधिक पानी इस्तेमाल न करें।",
      rule4Title: "सही जानकारी प्राप्त करना",
      rule4Text:
        "किसी नियम को लेकर संदेह हो तो विश्वसनीय आलिम से पूछें।",

      pronunciationLabel: "उच्चारण:",
      meaningLabel: "अर्थ:",
      footerText: "ज्ञान प्राप्त करें और उस पर अमल करें",
      backToTop: "ऊपर जाएँ",
      stepLabel: "चरण",
      imageUnavailable: "चित्र नहीं दिखाया जा सका"
    }
  };

  /* ---------------------------------------------------------
     2. SETTINGS
     --------------------------------------------------------- */

  const DEFAULT_LANGUAGE = "bn";
  const SUPPORTED_LANGUAGES = ["bn", "en", "hi"];
  const SETTINGS_KEY = "appSettings";

  let currentLanguage = DEFAULT_LANGUAGE;

  function readSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return {};

      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      console.warn("IBADAT: Could not read saved settings.", error);
      return {};
    }
  }

  function saveSettings(update) {
    try {
      const settings = readSettings();
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ ...settings, ...update })
      );
    } catch (error) {
      console.warn("IBADAT: Could not save settings.", error);
    }
  }

  function normalizeLanguage(value) {
    if (typeof value !== "string") return DEFAULT_LANGUAGE;

    const normalized = value.toLowerCase().trim().split(/[-_]/)[0];

    return SUPPORTED_LANGUAGES.includes(normalized)
      ? normalized
      : DEFAULT_LANGUAGE;
  }

  function getInitialLanguage() {
    const settings = readSettings();

    const savedLanguage =
      settings.lang ||
      settings.language ||
      settings.locale ||
      document.documentElement.lang;

    return normalizeLanguage(savedLanguage);
  }

  /* ---------------------------------------------------------
     3. TRANSLATION HELPERS
     --------------------------------------------------------- */

  function getText(key) {
    const languagePack = translations[currentLanguage] || translations.bn;

    if (Object.prototype.hasOwnProperty.call(languagePack, key)) {
      return languagePack[key];
    }

    if (Object.prototype.hasOwnProperty.call(translations.bn, key)) {
      return translations.bn[key];
    }

    return null;
  }

  function translateElement(element) {
    const key = element.getAttribute("data-i18n");
    if (!key) return;

    const translatedText = getText(key);
    if (translatedText === null) return;

    /*
     * Translate only the target element's own text.
     * Elements with nested markup are handled safely:
     * use data-i18n on the specific child that needs translation.
     */
    if (element.children.length > 0) {
      const textNodes = Array.from(element.childNodes).filter(
        (node) =>
          node.nodeType === Node.TEXT_NODE &&
          node.textContent.trim() !== ""
      );

      if (textNodes.length === 1) {
        textNodes[0].textContent = ` ${translatedText} `;
      } else if (textNodes.length > 1) {
        textNodes[0].textContent = ` ${translatedText} `;
        textNodes.slice(1).forEach((node) => {
          node.textContent = "";
        });
      }

      return;
    }

    element.textContent = translatedText;
  }

  function translateAttributes() {
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const text = getText(element.getAttribute("data-i18n-placeholder"));
      if (text !== null) element.setAttribute("placeholder", text);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const text = getText(element.getAttribute("data-i18n-title"));
      if (text !== null) element.setAttribute("title", text);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const text = getText(element.getAttribute("data-i18n-alt"));
      if (text !== null) element.setAttribute("alt", text);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const text = getText(element.getAttribute("data-i18n-aria-label"));
      if (text !== null) element.setAttribute("aria-label", text);
    });
  }

  function updateLanguageControls() {
    document.querySelectorAll("[data-language], [data-lang]").forEach((button) => {
      const value =
        button.getAttribute("data-language") ||
        button.getAttribute("data-lang");

      const active = normalizeLanguage(value) === currentLanguage;

      button.classList.toggle("active", active);

      if (active) {
        button.setAttribute("aria-pressed", "true");
      } else {
        button.setAttribute("aria-pressed", "false");
      }
    });

    document.querySelectorAll("select[name='language'], #language-select").forEach(
      (select) => {
        if (SUPPORTED_LANGUAGES.includes(select.value)) {
          select.value = currentLanguage;
        }
      }
    );
  }

  /* ---------------------------------------------------------
     4. APPLY LANGUAGE
     --------------------------------------------------------- */

  function applyLanguage(language) {
    currentLanguage = normalizeLanguage(language);

    document.documentElement.lang = currentLanguage;
    document.documentElement.setAttribute("data-language", currentLanguage);

    document.querySelectorAll("[data-i18n]").forEach(translateElement);
    translateAttributes();
    updateLanguageControls();

    const pageTitle = getText("pageTitle");
    if (pageTitle) document.title = pageTitle;

    saveSettings({
      lang: currentLanguage,
      language: currentLanguage
    });

    document.dispatchEvent(
      new CustomEvent("ibadat:languageChanged", {
        detail: { language: currentLanguage }
      })
    );
  }

  /* ---------------------------------------------------------
     5. THEME SETTINGS
     --------------------------------------------------------- */

  function normalizeTheme(value) {
    if (typeof value === "boolean") {
      return value ? "dark" : "light";
    }

    if (typeof value !== "string") return null;

    const normalized = value.toLowerCase().trim();

    if (["dark", "night"].includes(normalized)) return "dark";
    if (["light", "day"].includes(normalized)) return "light";

    return null;
  }

  function getInitialTheme() {
    const settings = readSettings();

    const savedTheme =
      normalizeTheme(settings.theme) ||
      normalizeTheme(settings.darkMode) ||
      normalizeTheme(settings.isDark);

    return savedTheme || "light";
  }

  function applyTheme(theme, persist = true) {
    const normalizedTheme = normalizeTheme(theme) || "light";
    const isDark = normalizedTheme === "dark";

    document.documentElement.setAttribute("data-theme", normalizedTheme);
    document.documentElement.classList.toggle("dark-theme", isDark);
    document.body.classList.toggle("dark-theme", isDark);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
    });

    if (persist) {
      saveSettings({
        theme: normalizedTheme,
        darkMode: isDark,
        isDark
      });
    }

    document.dispatchEvent(
      new CustomEvent("ibadat:themeChanged", {
        detail: { theme: normalizedTheme }
      })
    );
  }

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";

    applyTheme(currentTheme === "dark" ? "light" : "dark");
  }

  /* ---------------------------------------------------------
     6. CLICK AND SELECT EVENTS
     --------------------------------------------------------- */

  function setupLanguageControls() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-language], [data-lang]");
      if (!button) return;

      const language =
        button.getAttribute("data-language") ||
        button.getAttribute("data-lang");

      if (language) applyLanguage(language);
    });

    document.addEventListener("change", (event) => {
      const select = event.target.closest(
        "select[name='language'], #language-select"
      );

      if (select && select.value) {
        applyLanguage(select.value);
      }
    });
  }

  function setupThemeControls() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme-toggle]");
      if (!button) return;

      event.preventDefault();
      toggleTheme();
    });
  }

  /* ---------------------------------------------------------
     7. BACK TO TOP
     --------------------------------------------------------- */

  function setupBackToTop() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest(
        "[data-back-to-top], .back-to-top"
      );

      if (!button) return;

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ---------------------------------------------------------
     8. IMAGE FALLBACK
     --------------------------------------------------------- */

  function setupImageFallback() {
    document.querySelectorAll(".purity-page img, img[data-purity-image]").forEach(
      (img) => {
        img.addEventListener(
          "error",
          () => {
            img.classList.add("image-load-error");
            img.setAttribute("data-image-error", "true");

            /*
             * Keep the layout intact if an image is missing.
             * Do not replace the image URL with a guessed asset.
             */
            const figure = img.closest("figure, .lesson-art, .step-image");
            if (figure) figure.classList.add("image-unavailable");
          },
          { once: true }
        );

        img.addEventListener("load", () => {
          img.classList.remove("image-load-error");
          img.removeAttribute("data-image-error");

          const figure = img.closest("figure, .lesson-art, .step-image");
          if (figure) figure.classList.remove("image-unavailable");
        });
      }
    );
  }

  /* ---------------------------------------------------------
     9. ACCESSIBILITY AND INITIALIZATION
     --------------------------------------------------------- */

  function setupExternalLanguageChange() {
    /*
     * Other parts of the website may request a language change:
     * document.dispatchEvent(
     *   new CustomEvent("ibadat:setLanguage", { detail: { language: "en" } })
     * );
     */
    document.addEventListener("ibadat:setLanguage", (event) => {
      const language = event.detail && event.detail.language;
      if (language) applyLanguage(language);
    });

    document.addEventListener("ibadat:setTheme", (event) => {
      const theme = event.detail && event.detail.theme;
      if (theme) applyTheme(theme);
    });
  }

  function init() {
    applyTheme(getInitialTheme(), false);
    applyLanguage(getInitialLanguage());

    setupLanguageControls();
    setupThemeControls();
    setupBackToTop();
    setupImageFallback();
    setupExternalLanguageChange();

    document.documentElement.classList.add("purity-js-ready");

    document.dispatchEvent(
      new CustomEvent("ibadat:purityReady", {
        detail: {
          language: currentLanguage,
          theme: document.documentElement.getAttribute("data-theme") || "light"
        }
      })
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  /* ---------------------------------------------------------
     10. PUBLIC API
     --------------------------------------------------------- */

  window.IBADATPurity = Object.freeze({
    applyLanguage,
    applyTheme,
    toggleTheme,
    getLanguage: () => currentLanguage,
    getText
  });
})();
