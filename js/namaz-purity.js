/* =========================================
   IBADAT — NAMAZ PURITY
   Languages: বাংলা, English, हिन्दी
   ========================================= */

"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";

  const translations = {
    bn: {
      pageTitle: "পবিত্রতা",

      cleanKicker: "প্রথম পাঠ",
      cleanTitle: "পবিত্রতা ও পরিচ্ছন্নতা",
      cleanBodyTitle: "শরীরের পরিচ্ছন্নতা",
      cleanBody: [
        "শরীর পরিষ্কার রাখো এবং ব্যক্তিগত পরিচ্ছন্নতার যত্ন নাও।",
        "টয়লেট ব্যবহারের পর যথাযথভাবে পরিষ্কার হও।",
        "শরীরে নিশ্চিত নাপাকি লাগলে নামাজের আগে তা দূর করো।"
      ],
      cleanClothesTitle: "পোশাকের পরিচ্ছন্নতা",
      cleanClothes: [
        "নামাজের পোশাকে নাপাকি লাগলে সেই অংশ পরিষ্কার করো বা প্রয়োজনে পোশাক বদলাও।",
        "নাপাকি কোথায় লেগেছে জানা থাকলে সেই অংশ ভালোভাবে ধুয়ে নাও।"
      ],
      cleanPlaceTitle: "নামাজের স্থানের পরিচ্ছন্নতা",
      cleanPlace: [
        "নামাজের স্থান পরিচ্ছন্ন রাখো।",
        "নিশ্চিত নাপাকি থাকলে যথাযথভাবে তা দূর করো।",
        "শুধু ভিত্তিহীন সন্দেহের কারণে বারবার নিজেকে কষ্টে ফেলো না।"
      ],

      wuduKicker: "দ্বিতীয় পাঠ",
      wuduTitle: "ওযু",
      wuduIntro: "ওযু হলো নামাজের জন্য পবিত্রতা অর্জনের পদ্ধতি, যাতে নির্দিষ্ট অঙ্গ ধোয়া এবং মাথা ও কান মাসেহ করা হয়।",
      wuduNiyyahTitle: "ওযুর নিয়ত",
      wuduNiyyah: "মনে মনে আল্লাহর সন্তুষ্টির জন্য ওযু করার ইচ্ছা করো। বিস্তারিত বিধানের জন্য নির্ভরযোগ্য ইসলামি নির্দেশনা অনুসরণ করো।",
      wuduStepsTitle: "ওযুর ধাপ",
      wuduStepsIntro: "প্রতিটি অঙ্গ ভালোভাবে পরিষ্কার করো। কিছু বিস্তারিত বিধানে আলেমদের মধ্যে মতভেদ রয়েছে।",
      countLabel: "কতবার:",

      wuduSteps: [
        [
          "দুই হাত ধোয়া",
          "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নাও এবং আঙুলের ফাঁকে পানি পৌঁছাও।",
          "৩ বার"
        ],
        [
          "কুলি করা",
          "পানি নিয়ে মুখের ভেতর ঘুরিয়ে কুলি করো। রোজা থাকলে পানি গিলে ফেলা থেকে সতর্ক থাকো।",
          "৩ বার"
        ],
        [
          "নাকে পানি দেওয়া",
          "নাকে আলতোভাবে পানি নিয়ে পরিষ্কার করো এবং পানি বের করে দাও।",
          "৩ বার"
        ],
        [
          "মুখ ধোয়া",
          "কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং মুখের দুই পাশ ভালোভাবে ধুয়ে নাও।",
          "৩ বার"
        ],
        [
          "দুই হাত কনুইসহ ধোয়া",
          "প্রথমে ডান, তারপর বাঁ হাত কনুইসহ ভালোভাবে ধুয়ে নাও।",
          "প্রতিটি হাত ৩ বার"
        ],
        [
          "মাথা মাসেহ করা",
          "ভেজা হাত দিয়ে মাথা মাসেহ করো। মাসেহের নির্দিষ্ট পদ্ধতি নির্ভরযোগ্য নির্দেশনা থেকে শিখে নাও।",
          "১ বার"
        ],
        [
          "কান মাসেহ করা",
          "ভেজা আঙুল দিয়ে কানের নির্ধারিত অংশ মাসেহ করো।",
          "১ বার"
        ],
        [
          "দুই পা ধোয়া",
          "প্রথমে ডান, তারপর বাঁ পা টাখনুসহ ধুয়ে নাও এবং আঙুলের ফাঁকে পানি পৌঁছাও।",
          "প্রতিটি পা ৩ বার"
        ]
      ],

      wuduNoteTitle: "ওযু সম্পর্কে মনে রাখবে",
      wuduNote: "এটি সাধারণ শিক্ষামূলক নির্দেশনা। ফরজ, সুন্নত ও কিছু বিস্তারিত বিধানে মতভেদ থাকতে পারে। প্রয়োজনে বিশ্বস্ত আলেমের পরামর্শ নাও।",
      wuduBreakTitle: "ওযু ভঙ্গের সাধারণ কারণ",
      wuduBreaks: [
        "প্রস্রাব, পায়খানা বা বায়ু নির্গত হওয়া।",
        "চেতনা হারানো বা এমন ঘুম, যাতে সচেতনতা থাকে না।",
        "অন্যান্য পরিস্থিতির বিধান নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নাও।"
      ],

      ghuslKicker: "তৃতীয় পাঠ",
      ghuslTitle: "গোসল",
      ghuslIntro: "গোসল হলো নির্দিষ্ট অবস্থায় পবিত্রতা অর্জনের জন্য পুরো শরীরে পানি পৌঁছে দেওয়ার পদ্ধতি।",
      ghuslStepsTitle: "গোসলের সাধারণ পদ্ধতি",
      ghuslSteps: [
        "মনে মনে পবিত্রতার নিয়ত করো।",
        "শরীরে নাপাকি থাকলে আগে তা পরিষ্কার করো।",
        "সুন্নাহর বর্ণিত পদ্ধতি অনুযায়ী ওযু করো।",
        "মাথা ও চুলের গোড়ায় পানি পৌঁছাও।",
        "শরীরের সর্বত্র পানি পৌঁছাও; বগল, নাভি ও শরীরের ভাঁজে খেয়াল করো।"
      ],
      ghuslWhenTitle: "কখন গোসল ফরজ হতে পারে?",
      ghuslWhen: [
        "দাম্পত্য মিলনের পর, প্রযোজ্য বিধান অনুযায়ী।",
        "বীর্য নির্গমনের নির্দিষ্ট পরিস্থিতিতে।",
        "ঋতুস্রাব শেষ হলে।",
        "প্রসব-পরবর্তী রক্তস্রাব শেষ হলে।"
      ],
      ghuslNoteTitle: "গোসল সম্পর্কে গুরুত্বপূর্ণ কথা",
      ghuslNote: "ব্যক্তিগত পরিস্থিতি ও বিস্তারিত বিধানের জন্য নির্ভরযোগ্য আলেমের পরামর্শ নাও।",

      tayammumKicker: "চতুর্থ পাঠ",
      tayammumTitle: "তায়াম্মুম",
      tayammumIntro: "পানি না পাওয়া গেলে বা পানি ব্যবহার করলে ক্ষতির বাস্তব আশঙ্কা থাকলে নির্দিষ্ট শর্তে তায়াম্মুম করা যায়।",
      tayammumWhenTitle: "কখন তায়াম্মুম করা যায়?",
      tayammumWhen: [
        "প্রয়োজনীয় পানি খুঁজেও না পাওয়া গেলে।",
        "পানি ব্যবহার করলে ক্ষতির বাস্তব আশঙ্কা থাকলে।",
        "প্রযোজ্য অন্যান্য শর্ত পূরণ হলে।"
      ],
      tayammumStepsTitle: "তায়াম্মুমের ধাপ",
      tayammumStepsIntro: "প্রযোজ্য নিয়ম ও শর্ত মেনে প্রতিটি ধাপ সম্পন্ন করো।",
      tayammumSteps: [
        [
          "উপযুক্ত মাটিজাত উপাদান ব্যবহার",
          "তায়াম্মুমের জন্য উপযুক্ত ও পবিত্র মাটিজাত উপাদান ব্যবহার করো।"
        ],
        [
          "মুখ মাসেহ করা",
          "নির্ভরযোগ্য নির্দেশনা অনুযায়ী মুখ মাসেহ করো।"
        ],
        [
          "হাত মাসেহ করা",
          "প্রযোজ্য পদ্ধতি অনুযায়ী হাত মাসেহ সম্পন্ন করো।"
        ]
      ],
      tayammumNoteTitle: "মনে রাখবে",
      tayammumNote: "তায়াম্মুম কেবল প্রযোজ্য শর্ত পূরণ হলে করা যায়। উপকরণ ও মাসেহের পদ্ধতি নির্ভরযোগ্য ইসলামি নির্দেশনা থেকে শিখে নাও।",

      guidanceTitle: "গুরুত্বপূর্ণ সতর্কতা",
      guidance: [
        [
          "ওযু ভেঙে গেলে",
          "ওযু ভেঙেছে নিশ্চিত হলে নামাজের আগে নতুন করে ওযু করো। শুধু সন্দেহ হলে নির্ভরযোগ্য বিধান জেনে নাও।"
        ],
        [
          "শরীর বা পোশাকে নাপাকি লাগলে",
          "নাপাকি নিশ্চিত হলে নামাজের আগে তা যথাযথভাবে পরিষ্কার করো।"
        ],
        [
          "গোসল ফরজ হলে",
          "যে অবস্থায় গোসল আবশ্যক, সেখানে শুধু ওযু যথেষ্ট নয়। নামাজের আগে প্রযোজ্য নিয়মে গোসল করো।"
        ],
        [
          "পানি ব্যবহার করা সম্ভব না হলে",
          "তায়াম্মুমের শর্ত পূরণ হয়েছে কি না নিশ্চিত হয়ে নির্ভরযোগ্য নির্দেশনা অনুসরণ করো।"
        ],
        [
          "কোনো বিধান নিশ্চিত না হলে",
          "অনুমান করে সিদ্ধান্ত না নিয়ে বিশ্বস্ত আলেমের কাছে জেনে নাও।"
        ]
      ],

      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
      disclaimer: "শিক্ষামূলক সংক্ষিপ্তসার। বিস্তারিত ধর্মীয় বিধান ও ব্যক্তিগত পরিস্থিতির জন্য নির্ভরযোগ্য আলেমের পরামর্শ নাও।"
    },

    en: {
      pageTitle: "Purification",

      cleanKicker: "LESSON ONE",
      cleanTitle: "Purity and Cleanliness",
      cleanBodyTitle: "Personal Cleanliness",
      cleanBody: [
        "Maintain personal hygiene.",
        "Clean yourself properly after using the toilet.",
        "If impurity is confirmed on the body, remove it before prayer."
      ],
      cleanClothesTitle: "Clean Clothing",
      cleanClothes: [
        "If prayer clothes become impure, clean the affected area or change clothes when needed.",
        "If you know where the impurity is, wash that area thoroughly."
      ],
      cleanPlaceTitle: "Clean Prayer Area",
      cleanPlace: [
        "Keep the prayer area clean.",
        "Remove confirmed impurity appropriately.",
        "Do not repeatedly distress yourself over baseless doubts."
      ],

      wuduKicker: "LESSON TWO",
      wuduTitle: "Wudu (Ablution)",
      wuduIntro: "Wudu is a purification practice for prayer that includes washing specific parts and wiping the head and ears.",
      wuduNiyyahTitle: "Intention for Wudu",
      wuduNiyyah: "Intend in your heart to perform wudu for the sake of Allah. Follow reliable Islamic guidance for detailed rulings.",
      wuduStepsTitle: "Steps of Wudu",
      wuduStepsIntro: "Clean each part carefully. Scholars differ on some details of the rulings.",
      countLabel: "Frequency:",

      wuduSteps: [
        ["Wash Both Hands", "Wash both hands up to the wrists, including between the fingers.", "3 times"],
        ["Rinse the Mouth", "Swirl water in the mouth and rinse. If fasting, take care not to swallow water.", "3 times"],
        ["Rinse the Nose", "Gently take water into the nose and expel it.", "3 times"],
        ["Wash the Face", "Wash from the hairline to below the chin and across the face.", "3 times"],
        ["Wash Both Arms", "Wash the right arm, then the left, including the elbows.", "Each arm 3 times"],
        ["Wipe the Head", "Wipe the head with wet hands. Learn the precise method from reliable guidance.", "1 time"],
        ["Wipe the Ears", "Wipe the prescribed parts of the ears with wet fingers.", "1 time"],
        ["Wash Both Feet", "Wash each foot up to the ankles, including between the toes.", "Each foot 3 times"]
      ],

      wuduNoteTitle: "Remember About Wudu",
      wuduNote: "This is a general educational guide. Some details of obligatory and recommended acts differ. Consult a trusted scholar when needed.",
      wuduBreakTitle: "Common Causes That Invalidate Wudu",
      wuduBreaks: [
        "Passing urine, stool, or wind.",
        "Losing consciousness or sleeping in a way that removes awareness.",
        "Ask a reliable scholar about other circumstances."
      ],

      ghuslKicker: "LESSON THREE",
      ghuslTitle: "Ghusl",
      ghuslIntro: "Ghusl is full-body washing used to attain purification in circumstances that require it.",
      ghuslStepsTitle: "General Method of Ghusl",
      ghuslSteps: [
        "Make the intention for purification.",
        "Clean any impurity from the body first.",
        "Perform wudu according to the described Sunnah method.",
        "Ensure water reaches the head and hair roots.",
        "Ensure water reaches the entire body, including folds and hidden areas."
      ],
      ghuslWhenTitle: "When May Ghusl Be Obligatory?",
      ghuslWhen: [
        "After marital intercourse, according to the applicable ruling.",
        "In specific circumstances involving semen emission.",
        "After menstruation ends.",
        "After postnatal bleeding ends."
      ],
      ghuslNoteTitle: "Important Note About Ghusl",
      ghuslNote: "For personal circumstances and detailed rulings, consult a reliable scholar.",

      tayammumKicker: "LESSON FOUR",
      tayammumTitle: "Tayammum",
      tayammumIntro: "Tayammum may be permitted under specific conditions when water is unavailable or using it poses a genuine risk of harm.",
      tayammumWhenTitle: "When May Tayammum Be Used?",
      tayammumWhen: [
        "When the required water cannot be found.",
        "When using water poses a genuine risk of harm.",
        "When the other applicable conditions are met."
      ],
      tayammumStepsTitle: "Steps of Tayammum",
      tayammumStepsIntro: "Complete each step according to the applicable rules and conditions.",
      tayammumSteps: [
        ["Use Suitable Earth-Based Material", "Use a suitable and pure earth-based material for tayammum."],
        ["Wipe the Face", "Wipe the face according to reliable guidance."],
        ["Wipe the Hands", "Complete the hand wiping according to the applicable method."]
      ],
      tayammumNoteTitle: "Remember",
      tayammumNote: "Tayammum is permitted only when its conditions are met. Learn the materials and method from reliable Islamic guidance.",

      guidanceTitle: "Important Precautions",
      guidance: [
        ["If Wudu Is Invalidated", "If you are certain your wudu has been invalidated, perform it again before prayer. If unsure, seek reliable guidance."],
        ["If Body or Clothes Become Impure", "If impurity is confirmed, clean it properly before prayer."],
        ["When Ghusl Is Required", "Where ghusl is required, wudu alone is not sufficient. Perform ghusl according to the applicable method before prayer."],
        ["When Water Cannot Be Used", "Confirm that the conditions for tayammum are met and follow reliable guidance."],
        ["When Unsure About a Ruling", "Ask a trusted scholar rather than guessing."]
      ],

      footer: "Preserve purity and find peace in worship.",
      disclaimer: "Educational overview. Consult a qualified, trusted scholar for detailed rulings and personal circumstances."
    },

    hi: {
      pageTitle: "पवित्रता",

      cleanKicker: "पहला पाठ",
      cleanTitle: "पवित्रता और स्वच्छता",
      cleanBodyTitle: "शरीर की स्वच्छता",
      cleanBody: [
        "व्यक्तिगत स्वच्छता का ध्यान रखें।",
        "शौचालय के उपयोग के बाद ठीक से साफ हों।",
        "शरीर पर नापाकी निश्चित हो तो नमाज़ से पहले उसे दूर करें।"
      ],
      cleanClothesTitle: "कपड़ों की स्वच्छता",
      cleanClothes: [
        "नमाज़ के कपड़े नापाक हों तो प्रभावित हिस्से को साफ करें या ज़रूरत पर कपड़े बदलें।",
        "नापाकी की जगह पता हो तो उसे अच्छी तरह धोएँ।"
      ],
      cleanPlaceTitle: "नमाज़ की जगह की स्वच्छता",
      cleanPlace: [
        "नमाज़ की जगह साफ रखें।",
        "नापाकी निश्चित हो तो उसे उचित तरीके से दूर करें।",
        "बिना आधार के संदेह करके बार-बार खुद को परेशान न करें।"
      ],

      wuduKicker: "दूसरा पाठ",
      wuduTitle: "वुज़ू",
      wuduIntro: "वुज़ू नमाज़ के लिए पवित्रता प्राप्त करने का तरीका है, जिसमें कुछ अंग धोए जाते हैं और सिर व कानों का मसह किया जाता है।",
      wuduNiyyahTitle: "वुज़ू की नीयत",
      wuduNiyyah: "दिल में अल्लाह की प्रसन्नता के लिए वुज़ू करने का इरादा करें। विस्तृत नियमों के लिए विश्वसनीय इस्लामी मार्गदर्शन लें।",
      wuduStepsTitle: "वुज़ू के चरण",
      wuduStepsIntro: "हर अंग को ध्यान से साफ करें। कुछ विस्तृत नियमों में विद्वानों के मत अलग हो सकते हैं।",
      countLabel: "कितनी बार:",

      wuduSteps: [
        ["दोनों हाथ धोएँ", "दोनों हाथ कलाइयों तक धोएँ और उँगलियों के बीच पानी पहुँचाएँ।", "3 बार"],
        ["कुल्ली करें", "पानी को मुँह में घुमाकर कुल्ली करें। रोज़ा हो तो पानी निगलने से सावधान रहें।", "3 बार"],
        ["नाक साफ करें", "नाक में हल्के से पानी लेकर साफ करें और पानी बाहर निकालें।", "3 बार"],
        ["चेहरा धोएँ", "बालों की जड़ से ठोड़ी के नीचे तक और चेहरे के दोनों ओर धोएँ।", "3 बार"],
        ["दोनों बाज़ू धोएँ", "पहले दायाँ, फिर बायाँ बाज़ू कोहनी सहित धोएँ।", "हर बाज़ू 3 बार"],
        ["सिर का मसह करें", "गीले हाथों से सिर का मसह करें। सही विधि विश्वसनीय मार्गदर्शन से सीखें।", "1 बार"],
        ["कानों का मसह करें", "गीली उँगलियों से कानों के निर्धारित हिस्सों का मसह करें।", "1 बार"],
        ["दोनों पैर धोएँ", "दोनों पैर टखनों सहित धोएँ और उँगलियों के बीच पानी पहुँचाएँ।", "हर पैर 3 बार"]
      ],

      wuduNoteTitle: "वुज़ू के बारे में याद रखें",
      wuduNote: "यह सामान्य शैक्षिक जानकारी है। फ़र्ज़ और सुन्नत के कुछ विवरण अलग हो सकते हैं; ज़रूरत पर भरोसेमंद विद्वान से पूछें।",
      wuduBreakTitle: "वुज़ू टूटने के सामान्य कारण",
      wuduBreaks: [
        "पेशाब, मल या हवा निकलना।",
        "होश खोना या ऐसी नींद जिसमें जागरूकता न रहे।",
        "अन्य स्थितियों के बारे में विश्वसनीय विद्वान से पूछें।"
      ],

      ghuslKicker: "तीसरा पाठ",
      ghuslTitle: "ग़ुस्ल",
      ghuslIntro: "ग़ुस्ल उन स्थितियों में पूरे शरीर को धोकर पवित्रता प्राप्त करने का तरीका है जहाँ इसकी आवश्यकता होती है।",
      ghuslStepsTitle: "ग़ुस्ल का सामान्य तरीका",
      ghuslSteps: [
        "पवित्रता की नीयत करें।",
        "शरीर पर लगी नापाकी पहले साफ करें।",
        "वर्णित सुन्नत तरीके के अनुसार वुज़ू करें।",
        "सिर और बालों की जड़ों तक पानी पहुँचाएँ।",
        "बगल, नाभि और शरीर की सिलवटों सहित पूरे शरीर तक पानी पहुँचाएँ।"
      ],
      ghuslWhenTitle: "ग़ुस्ल कब फ़र्ज़ हो सकता है?",
      ghuslWhen: [
        "वैवाहिक संबंध के बाद, लागू नियम के अनुसार।",
        "वीर्य निकलने की कुछ निर्धारित स्थितियों में।",
        "मासिक धर्म समाप्त होने पर।",
        "प्रसव के बाद रक्तस्राव समाप्त होने पर।"
      ],
      ghuslNoteTitle: "ग़ुस्ल के बारे में ज़रूरी बात",
      ghuslNote: "व्यक्तिगत परिस्थितियों और विस्तृत नियमों के लिए भरोसेमंद विद्वान से सलाह लें।",

      tayammumKicker: "चौथा पाठ",
      tayammumTitle: "तयम्मुम",
      tayammumIntro: "पानी न मिलने या पानी के उपयोग से वास्तविक नुकसान का खतरा होने पर निर्धारित शर्तों के अंतर्गत तयम्मुम किया जा सकता है।",
      tayammumWhenTitle: "तयम्मुम कब किया जा सकता है?",
      tayammumWhen: [
        "ज़रूरी पानी न मिलने पर।",
        "पानी के उपयोग से वास्तविक नुकसान का खतरा होने पर।",
        "अन्य लागू शर्तें पूरी होने पर।"
      ],
      tayammumStepsTitle: "तयम्मुम के चरण",
      tayammumStepsIntro: "लागू नियमों और शर्तों के अनुसार हर चरण पूरा करें।",
      tayammumSteps: [
        ["उपयुक्त मिट्टी-आधारित सामग्री लें", "तयम्मुम के लिए उपयुक्त और पाक मिट्टी-आधारित सामग्री इस्तेमाल करें।"],
        ["चेहरे का मसह करें", "विश्वसनीय मार्गदर्शन के अनुसार चेहरे का मसह करें।"],
        ["हाथों का मसह करें", "लागू विधि के अनुसार हाथों का मसह पूरा करें।"]
      ],
      tayammumNoteTitle: "याद रखें",
      tayammumNote: "तयम्मुम तभी किया जा सकता है जब उसकी शर्तें पूरी हों। सामग्री और विधि विश्वसनीय इस्लामी मार्गदर्शन से सीखें।",

      guidanceTitle: "महत्वपूर्ण सावधानियाँ",
      guidance: [
        ["वुज़ू टूट जाए तो", "यदि वुज़ू टूटना निश्चित है, तो नमाज़ से पहले दोबारा वुज़ू करें। संदेह हो तो विश्वसनीय मार्गदर्शन लें।"],
        ["शरीर या कपड़ों पर नापाकी हो", "नापाकी निश्चित हो तो नमाज़ से पहले उसे ठीक से साफ करें।"],
        ["जब ग़ुस्ल ज़रूरी हो", "जहाँ ग़ुस्ल आवश्यक है, वहाँ केवल वुज़ू पर्याप्त नहीं। नमाज़ से पहले लागू तरीके से ग़ुस्ल करें।"],
        ["पानी इस्तेमाल न कर सकें", "तयम्मुम की शर्तें पूरी हैं या नहीं, इसकी पुष्टि करके विश्वसनीय मार्गदर्शन अपनाएँ।"],
        ["किसी नियम पर संदेह हो", "अनुमान लगाने के बजाय भरोसेमंद विद्वान से पूछें।"]
      ],

      footer: "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।",
      disclaimer: "शैक्षिक जानकारी। विस्तृत नियमों और व्यक्तिगत परिस्थितियों के लिए योग्य, भरोसेमंद विद्वान से सलाह लें।"
    }
  };

  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value != null) {
      el.textContent = value;
    }
  }

  function setList(id, items) {
    const el = document.getElementById(id);
    if (!el || !Array.isArray(items)) return;

    el.replaceChildren();

    items.forEach(value => {
      const li = document.createElement("li");
      li.textContent = value;
      el.appendChild(li);
    });
  }

  function setSectionHeader(id, kicker, title) {
    const section = document.getElementById(id);
    if (!section) return;

    const kickerEl = section.querySelector(
      ".section-title .kicker, .lesson-kicker, .section-heading .kicker"
    );

    const titleEl = section.querySelector(
      ".section-title h2, .lesson-heading h2, .section-heading h2, h2"
    );

    if (kickerEl) kickerEl.textContent = kicker;
    if (titleEl) titleEl.textContent = title;
  }

  function setCardText(card, title, description) {
    if (!card) return;

    const heading = card.querySelector("h3, h4");
    const paragraph = card.querySelector(
      ".step-copy p:not(.step-count), .step-copy p, p"
    );

    if (heading) heading.textContent = title;
    if (paragraph) paragraph.textContent = description;

    const image = card.querySelector("img");
    if (image) image.alt = title;
  }

  function updateWudu(t) {
    const section = document.getElementById("wudu");
    if (!section) return;

    const cards = section.querySelectorAll(".step-card");

    t.wuduSteps.forEach((step, index) => {
      const card = cards[index];
      if (!card) return;

      setCardText(card, step[0], step[1]);

      const count = card.querySelector(".step-count");
      if (count) {
        count.replaceChildren();

        const strong = document.createElement("strong");
        strong.textContent = t.countLabel + " ";

        count.append(
          strong,
          document.createTextNode(step[2])
        );
      }
    });
  }

  function updateTayammum(t) {
    const section = document.getElementById("tayammum");
    if (!section) return;

    const cards = section.querySelectorAll(
      ".tayammum-step-card, .step-grid .step-card"
    );

    t.tayammumSteps.forEach((step, index) => {
      const card = cards[index];
      if (!card) return;

      setCardText(card, step[0], step[1]);
    });
  }

  function updateGuidance(t) {
    const section =
      document.getElementById("purityRules") ||
      document.getElementById("importantGuidance") ||
      document.getElementById("purity-rules");

    if (!section) return;

    const cards = section.querySelectorAll(
      ":scope > article.content-board, .guidance-card, .warning-card, .step-card"
    );

    t.guidance.forEach((item, index) => {
      const card = cards[index];
      if (!card) return;

      const heading = card.querySelector("h2, h3, h4");
      const paragraph = card.querySelector("p");

      if (heading) heading.textContent = item[0];
      if (paragraph) paragraph.textContent = item[1];
    });

    setText("guidanceTitle", t.guidanceTitle);
    setText("importantGuidanceTitle", t.guidanceTitle);
  }

  function applyLanguage(language) {
    const lang = ["bn", "en", "hi"].includes(language)
      ? language
      : "bn";

    const t = translations[lang];
    document.documentElement.lang = lang;

    /*
      Hero board-এর চারটি লাইন ইচ্ছাকৃতভাবে পরিবর্তন করা হচ্ছে না।
      ফলে তোমার নির্ধারিত মূল লেখাগুলো অপরিবর্তিত থাকবে।
    */

    setText("cleanKicker", t.cleanKicker);
    setText("cleanTitle", t.cleanTitle);
    setText("cleanBodyTitle", t.cleanBodyTitle);
    setList("cleanBody", t.cleanBody);
    setText("cleanClothesTitle", t.cleanClothesTitle);
    setList("cleanClothes", t.cleanClothes);
    setText("cleanPlaceTitle", t.cleanPlaceTitle);
    setList("cleanPlace", t.cleanPlace);

    setText("wuduKicker", t.wuduKicker);
    setText("wuduTitle", t.wuduTitle);
    setText("wuduIntro", t.wuduIntro);
    setText("wuduNiyyahTitle", t.wuduNiyyahTitle);
    setText("wuduNiyyah", t.wuduNiyyah);
    setText("wuduStepsTitle", t.wuduStepsTitle);
    updateWudu(t);

    const wuduIntro = document.querySelector(
      "#wudu .steps-intro, #wudu [data-wudu-steps-intro]"
    );
    if (wuduIntro) wuduIntro.textContent = t.wuduStepsIntro;

    setText("wuduNoteTitle", t.wuduNoteTitle);

    const wuduNote = document.querySelector(
      "#wudu .note p, #wuduNote p, #wuduNote"
    );
    if (wuduNote) wuduNote.textContent = t.wuduNote;

    setText("wuduBreakTitle", t.wuduBreakTitle);
    setList("wuduBreaks", t.wuduBreaks);
    setList("wuduBreaksList", t.wuduBreaks);

    setText("ghuslKicker", t.ghuslKicker);
    setText("ghuslTitle", t.ghuslTitle);
    setText("ghuslIntro", t.ghuslIntro);
    setText("ghuslStepsTitle", t.ghuslStepsTitle);
    setList("ghuslSteps", t.ghuslSteps);
    setList("ghuslStepList", t.ghuslSteps);
    setText("ghuslWhenTitle", t.ghuslWhenTitle);
    setList("ghuslWhen", t.ghuslWhen);
    setText("ghuslNoteTitle", t.ghuslNoteTitle);

    const ghuslNote = document.querySelector(
      "#ghusl .note p, #ghuslNote p, #ghuslNote"
    );
    if (ghuslNote) ghuslNote.textContent = t.ghuslNote;

    setText("tayammumKicker", t.tayammumKicker);
    setText("tayammumTitle", t.tayammumTitle);
    setText("tayammumIntro", t.tayammumIntro);
    setText("tayammumStepsTitle", t.tayammumStepsTitle);
    updateTayammum(t);
    setText("tayammumWhenTitle", t.tayammumWhenTitle);
    setList("tayammumWhen", t.tayammumWhen);
    setText("tayammumNoteTitle", t.tayammumNoteTitle);

    const tayammumNote = document.querySelector(
      "#tayammum .note p, #tayammumNote p, #tayammumNote"
    );
    if (tayammumNote) tayammumNote.textContent = t.tayammumNote;

    updateGuidance(t);

    setText("footerText", t.footer);
    setText("footerLine", t.footer);
    setText("disclaimer", t.disclaimer);

    const links = document.getElementById("contentsLinks");

    if (links) {
      const ids = [
        "cleanliness",
        "wudu",
        "ghusl",
        "tayammum",
        "purityRules"
      ];

      const labels = [
        t.cleanTitle,
        t.wuduTitle,
        t.ghuslTitle,
        t.tayammumTitle,
        t.guidanceTitle
      ];

      links.querySelectorAll("a").forEach((link, index) => {
        if (labels[index]) link.textContent = labels[index];
        if (ids[index]) link.href = "#" + ids[index];
      });
    }
  }

  function applyTheme(settings) {
    const dark =
      settings.dark === true ||
      settings.dark === "true" ||
      settings.theme === "dark";

    document.body.classList.toggle("dark-mode", dark);

    const meta = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (meta) {
      meta.content = dark ? "#121A15" : "#0F5132";
    }
  }

  function refreshSettings() {
    const settings = readSettings();
    const language = settings.lang || "bn";

    applyLanguage(language);
    applyTheme(settings);
  }

  function init() {
    refreshSettings();

    window.addEventListener("storage", event => {
      if (event.key === SETTINGS_KEY) {
        refreshSettings();
      }
    });

    window.addEventListener(
      "appSettingsChanged",
      refreshSettings
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }
})();
