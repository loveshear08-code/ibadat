
/* =========================================
   IBADAT — NAMAZ PURITY
   File: js/namaz-purity.js
   ========================================= */

(function () {
  "use strict";

  const SETTINGS_KEY = "appSettings";

  const translations = {
    bn: {
      pageTitle: "পবিত্রতা",
      hero: [
        "পবিত্রতা ইসলামে ইবাদতের জন্য প্রস্তুতির গুরুত্বপূর্ণ অংশ।",
        "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা জরুরি।",
        "ওযু, গোসল ও তায়াম্মুমের মাধ্যমে পবিত্রতা অর্জনের নিয়ম শিখে নাও।",
        "সঠিক নিয়ম মেনে চলো, পবিত্র জীবন গড়ে তোলো।"
      ],
      sectionKickers: [
        "প্রথম পাঠ", "দ্বিতীয় পাঠ", "তৃতীয় পাঠ",
        "চতুর্থ পাঠ", "পঞ্চম পাঠ", "শেষ পাঠ"
      ],
      sectionTitles: [
        "পবিত্রতার নিয়ম", "ওযু", "গোসল",
        "তায়াম্মুম", "নাপাকি ও পবিত্রতা",
        "মনে রাখার গুরুত্বপূর্ণ বিষয়"
      ],
      rulesIntro: "নামাজের আগে প্রয়োজন অনুযায়ী ওযু বা গোসল করে পবিত্রতা অর্জন করতে হয়। শরীর, পোশাক ও নামাজের স্থান নাপাকি থেকে পরিষ্কার রাখতে হবে। পানি ব্যবহার করা সম্ভব না হলে এবং তায়াম্মুমের শর্ত পূরণ হলে তায়াম্মুমের বিধান প্রযোজ্য হতে পারে।",
      rulesCards: [
        ["পবিত্রতার তিনটি গুরুত্বপূর্ণ দিক", "শরীর পরিষ্কার রাখা এবং প্রয়োজনীয় পবিত্রতা অর্জন করা।"],
        ["পোশাক পবিত্র রাখা", "নামাজের পোশাকে নাপাকি থাকলে নামাজের আগে তা যথাযথভাবে পরিষ্কার করা।"],
        ["নামাজের স্থান পরিষ্কার রাখা", "যেখানে নামাজ আদায় করবে, সেই স্থান পবিত্র রাখা।"]
      ],
      wuduIntro: "ওযু হলো নির্দিষ্ট অঙ্গ ধোয়া এবং মাথা ও কান মাসেহ করার মাধ্যমে নামাজের জন্য প্রয়োজনীয় পবিত্রতা অর্জনের পদ্ধতি।",
      wuduNiyyahTitle: "ওযুর নিয়ত",
      wuduNiyyah: "মনে মনে আল্লাহর সন্তুষ্টির জন্য ওযু করার ইচ্ছা করো। নিয়তের বিষয়ে নির্ভরযোগ্য নির্দেশনা অনুসরণ করো।",
      wuduStepsTitle: "ওযুর ধাপ",
      wuduStepsIntro: "প্রতিটি ধাপ মনোযোগ দিয়ে সম্পন্ন করো এবং প্রয়োজনীয় অঙ্গে পানি পৌঁছাও।",
      wuduSteps: [
        ["দুই হাত ধোয়া", "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নাও এবং আঙুলের ফাঁকে পানি পৌঁছাও।", "৩ বার"],
        ["কুলি করা", "পানি নিয়ে মুখে ঘুরিয়ে কুলি করো। রোজা থাকলে পানি গলায় চলে যাওয়া থেকে সতর্ক থাকো।", "৩ বার"],
        ["নাক পরিষ্কার করা", "নাকে আলতোভাবে পানি নিয়ে পরিষ্কার করো এবং পানি বের করে দাও।", "৩ বার"],
        ["মুখ ধোয়া", "কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং মুখের দুই পাশ ভালোভাবে ধুয়ে নাও।", "৩ বার"],
        ["দুই হাত কনুইসহ ধোয়া", "প্রথমে ডান হাত, তারপর বাঁ হাত কনুইসহ ভালোভাবে ধুয়ে নাও।", "প্রতিটি হাত ৩ বার"],
        ["মাথা মাসেহ করা", "ভেজা হাত দিয়ে মাথা মাসেহ করো। মাসেহের নির্দিষ্ট পদ্ধতি নির্ভরযোগ্য নির্দেশনা থেকে শিখে নাও।", "১ বার"],
        ["কান মাসেহ করা", "ভেজা আঙুল দিয়ে কানের নির্ধারিত অংশ মাসেহ করো।", "১ বার"],
        ["দুই পা ধোয়া", "প্রথমে ডান, তারপর বাঁ পা টাখনুসহ ধুয়ে নাও এবং আঙুলের ফাঁকে পানি পৌঁছাও।", "প্রতিটি পা ৩ বার"]
      ],
      wuduNoteTitle: "ওযু সম্পর্কে মনে রাখবে",
      wuduNote: "এখানে সাধারণ শিক্ষামূলক পদ্ধতি দেওয়া হয়েছে। বিস্তারিত বিধানের জন্য নির্ভরযোগ্য আলেমের পরামর্শ নাও।",
      wuduBreakTitle: "ওযু ভঙ্গের সাধারণ কারণ",
      wuduBreaks: [
        "প্রস্রাব, পায়খানা বা বায়ু নির্গত হওয়া।",
        "চেতনা হারানো বা এমন ঘুম, যাতে সচেতনতা থাকে না।",
        "অন্যান্য পরিস্থিতির বিধান নিশ্চিত হয়ে জেনে নাও।"
      ],
      ghuslIntro: "গোসল হলো নির্দিষ্ট অবস্থায় বড় অপবিত্রতা থেকে পবিত্রতা অর্জনের জন্য পুরো শরীরে পানি পৌঁছে দেওয়ার পদ্ধতি।",
      ghuslStepsTitle: "গোসলের সাধারণ পদ্ধতি",
      ghuslSteps: [
        "মনে মনে পবিত্রতার নিয়ত করো।",
        "শরীরে কোনো নাপাকি থাকলে আগে তা পরিষ্কার করো।",
        "নির্দেশিত পদ্ধতিতে ওযু করো।",
        "মাথা ও চুলের গোড়ায় পানি পৌঁছাও।",
        "শরীরের সর্বত্র পানি পৌঁছাও; বগল, নাভি ও শরীরের ভাঁজে খেয়াল করো।"
      ],
      ghuslWhenTitle: "কখন গোসল ফরজ হয়?",
      ghuslWhen: [
        "দাম্পত্য মিলনের পর, প্রযোজ্য বিধান অনুযায়ী।",
        "বীর্য নির্গমনের নির্দিষ্ট পরিস্থিতিতে।",
        "ঋতুস্রাব শেষ হলে।",
        "প্রসব-পরবর্তী রক্তস্রাব শেষ হলে।"
      ],
      ghuslNoteTitle: "গোসল সম্পর্কে গুরুত্বপূর্ণ কথা",
      ghuslNote: "শরীরের কোনো অংশে পানি পৌঁছাতে বাধা থাকলে তা খেয়াল করো। ব্যক্তিগত পরিস্থিতি সম্পর্কে নির্ভরযোগ্য নির্দেশনা নাও।",
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
        ["উপযুক্ত মাটিতে হাত রাখা", "তায়াম্মুমের জন্য উপযুক্ত পবিত্র মাটিজাতীয় উপাদান ব্যবহার করো।"],
        ["মুখ মাসেহ করা", "নির্ভরযোগ্য নির্দেশনা অনুযায়ী মুখ মাসেহ করো।"],
        ["হাত মাসেহ করা", "নির্দেশিত পদ্ধতি অনুযায়ী হাত মাসেহ সম্পন্ন করো।"]
      ],
      tayammumNoteTitle: "মনে রাখবে",
      tayammumNote: "তায়াম্মুম কেবল প্রযোজ্য শর্ত পূরণ হলে করা যায়। সঠিক পদ্ধতি নির্ভরযোগ্য নির্দেশনা থেকে শিখে নাও।",
      cleanTitle: "নাপাকি ও পবিত্রতা",
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
        "অকারণ সন্দেহের কারণে নিজেকে বারবার কষ্টে ফেলো না।"
      ],
      guidance: [
        ["ওযু ভেঙে গেলে", "নামাজের আগে ওযু ভেঙে গেছে নিশ্চিত হলে নতুন করে ওযু করো। শুধু সন্দেহ হলে নির্ভরযোগ্য বিধান জেনে নাও।"],
        ["শরীর বা পোশাকে নাপাকি লাগলে", "নাপাকি নিশ্চিত হলে নামাজের আগে তা যথাযথভাবে পরিষ্কার করো।"],
        ["গোসল ফরজ হলে", "প্রযোজ্য অবস্থায় শুধু ওযু যথেষ্ট নয়। নামাজের আগে নির্ধারিত নিয়মে গোসল করে পবিত্রতা অর্জন করো।"],
        ["পানি ব্যবহার করা সম্ভব না হলে", "তায়াম্মুমের শর্ত পূরণ হয়েছে কি না নিশ্চিত হয়ে নির্ভরযোগ্য নির্দেশনা অনুসরণ করো।"],
        ["কোনো বিধান নিশ্চিত না হলে", "অনুমান করে সিদ্ধান্ত না নিয়ে বিশ্বস্ত আলেমের কাছে জেনে নাও। এই পেজটি প্রাথমিক শিক্ষার জন্য।"]
      ],
      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
      countLabel: "কতবার:"
    },

    en: {
      pageTitle: "Purification",
      hero: [
        "Purification is an important part of preparing for worship in Islam.",
        "Keep your body, clothes, and prayer place clean.",
        "Learn how to purify yourself through wudu, ghusl, and tayammum.",
        "Follow sound guidance and build a life of cleanliness."
      ],
      sectionKickers: ["Lesson One", "Lesson Two", "Lesson Three", "Lesson Four", "Lesson Five", "Final Lesson"],
      sectionTitles: ["Rules of Purification", "Wudu", "Ghusl", "Tayammum", "Impurity and Cleanliness", "Important Things to Remember"],
      rulesIntro: "Before prayer, perform wudu or ghusl as required. Keep the body, clothes, and prayer place free from impurity. If water cannot be used and the conditions for tayammum are met, tayammum may apply.",
      rulesCards: [
        ["Three Important Aspects", "Keep the body clean and attain the required state of purification."],
        ["Keep Clothes Clean", "If prayer clothes are impure, clean them properly before praying."],
        ["Keep the Prayer Place Clean", "Make sure the place where you pray is clean."]
      ],
      wuduIntro: "Wudu is a method of purification for prayer that involves washing specific parts and wiping the head and ears.",
      wuduNiyyahTitle: "Intention for Wudu",
      wuduNiyyah: "Intend in your heart to perform wudu for the sake of Allah. Follow reliable guidance about intention.",
      wuduStepsTitle: "Steps of Wudu",
      wuduStepsIntro: "Complete each step carefully and ensure water reaches the required areas.",
      wuduSteps: [
        ["Wash Both Hands", "Wash both hands up to the wrists, including between the fingers.", "3 times"],
        ["Rinse the Mouth", "Swirl water in the mouth and rinse. If fasting, avoid swallowing water.", "3 times"],
        ["Clean the Nose", "Gently draw water into the nose and expel it.", "3 times"],
        ["Wash the Face", "Wash from the hairline to the chin and across the face.", "3 times"],
        ["Wash Both Arms", "Wash the right arm, then the left, including the elbows.", "Each arm 3 times"],
        ["Wipe the Head", "Wipe the head with wet hands. Learn the precise method from reliable guidance.", "1 time"],
        ["Wipe the Ears", "Wipe the prescribed parts of the ears with wet fingers.", "1 time"],
        ["Wash Both Feet", "Wash each foot up to the ankles, including between the toes.", "Each foot 3 times"]
      ],
      wuduNoteTitle: "Remember About Wudu",
      wuduNote: "This is a general educational guide. Consult a reliable scholar for detailed rulings.",
      wuduBreakTitle: "Common Causes That Invalidate Wudu",
      wuduBreaks: [
        "Passing urine, stool, or wind.",
        "Losing consciousness or sleeping in a way that removes awareness.",
        "Seek reliable guidance about other circumstances."
      ],
      ghuslIntro: "Ghusl is the method of washing the whole body to attain purification in circumstances that require it.",
      ghuslStepsTitle: "General Method of Ghusl",
      ghuslSteps: [
        "Make the intention for purification.",
        "Clean any impurity from the body first.",
        "Perform wudu according to the prescribed method.",
        "Ensure water reaches the head and hair roots.",
        "Ensure water reaches the entire body, including folds and hidden areas."
      ],
      ghuslWhenTitle: "When Is Ghusl Required?",
      ghuslWhen: [
        "After marital intercourse, according to the applicable ruling.",
        "In specific circumstances involving ejaculation.",
        "After menstruation ends.",
        "After postnatal bleeding ends."
      ],
      ghuslNoteTitle: "Important Note About Ghusl",
      ghuslNote: "Ensure water reaches all required areas. Seek reliable guidance for personal circumstances.",
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
        ["Place Hands on Suitable Earth", "Use a suitable, pure earth-based material for tayammum."],
        ["Wipe the Face", "Wipe the face according to reliable guidance."],
        ["Wipe the Hands", "Complete the hand wiping according to the prescribed method."]
      ],
      tayammumNoteTitle: "Remember",
      tayammumNote: "Tayammum is permitted only when its conditions are met. Learn the correct method from reliable guidance.",
      cleanTitle: "Impurity and Purification",
      cleanBodyTitle: "Personal Cleanliness",
      cleanBody: ["Maintain personal hygiene.", "Clean yourself properly after using the toilet.", "Remove impurity from the body before prayer."],
      cleanClothesTitle: "Clean Clothes",
      cleanClothes: ["Clean or change prayer clothes if they become impure.", "If you know where the impurity is, wash that area thoroughly."],
      cleanPlaceTitle: "Clean Prayer Place",
      cleanPlace: ["Keep the prayer area clean.", "Remove impurity properly if it gets on the area.", "Do not distress yourself repeatedly over baseless doubts."],
      guidance: [
        ["If Wudu Is Invalidated", "If you are certain your wudu has been invalidated, perform it again before prayer. Seek guidance if unsure."],
        ["If Body or Clothes Become Impure", "If impurity is confirmed, clean it properly before prayer."],
        ["When Ghusl Is Required", "Wudu alone is not sufficient in circumstances requiring ghusl. Perform the required ghusl before prayer."],
        ["When Water Cannot Be Used", "Confirm that tayammum conditions are met and follow reliable guidance."],
        ["When Unsure About a Ruling", "Ask a trusted scholar rather than guessing. This page is for introductory learning."]
      ],
      footer: "Preserve purity and find peace in worship.",
      countLabel: "Frequency:"
    },

    hi: {
      pageTitle: "पवित्रता",
      hero: [
        "इस्लाम में इबादत की तैयारी के लिए पवित्रता महत्वपूर्ण है।",
        "शरीर, कपड़े और नमाज़ की जगह साफ रखें।",
        "वुज़ू, ग़ुस्ल और तयम्मुम के नियम सीखें।",
        "सही मार्गदर्शन अपनाएँ और स्वच्छ जीवन बनाएँ।"
      ],
      sectionKickers: ["पहला पाठ", "दूसरा पाठ", "तीसरा पाठ", "चौथा पाठ", "पाँचवाँ पाठ", "अंतिम पाठ"],
      sectionTitles: ["पवित्रता के नियम", "वुज़ू", "ग़ुस्ल", "तयम्मुम", "नापाकी और सफ़ाई", "ज़रूरी बातें याद रखें"],
      rulesIntro: "नमाज़ से पहले आवश्यकता के अनुसार वुज़ू या ग़ुस्ल करें। शरीर, कपड़े और नमाज़ की जगह को नापाकी से साफ रखें। पानी उपलब्ध न हो या उसका उपयोग हानिकारक हो और तयम्मुम की शर्तें पूरी हों, तो तयम्मुम किया जा सकता है।",
      rulesCards: [
        ["पवित्रता के तीन महत्वपूर्ण पहलू", "शरीर साफ रखें और आवश्यक पवित्रता प्राप्त करें।"],
        ["कपड़े साफ रखें", "नमाज़ के कपड़े नापाक हों तो नमाज़ से पहले उन्हें साफ करें।"],
        ["नमाज़ की जगह साफ रखें", "जहाँ नमाज़ पढ़ें, उस जगह को साफ रखें।"]
      ],
      wuduIntro: "वुज़ू नमाज़ के लिए पवित्रता प्राप्त करने का तरीका है, जिसमें कुछ अंग धोए जाते हैं और सिर व कानों का मसह किया जाता है।",
      wuduNiyyahTitle: "वुज़ू की नीयत",
      wuduNiyyah: "दिल में अल्लाह की प्रसन्नता के लिए वुज़ू करने का इरादा करें। नीयत के बारे में विश्वसनीय मार्गदर्शन लें।",
      wuduStepsTitle: "वुज़ू के चरण",
      wuduStepsIntro: "हर चरण ध्यान से पूरा करें और आवश्यक अंगों तक पानी पहुँचाएँ।",
      wuduSteps: [
        ["दोनों हाथ धोना", "दोनों हाथ कलाई तक धोएँ और उँगलियों के बीच पानी पहुँचाएँ।", "3 बार"],
        ["कुल्ली करना", "पानी मुँह में घुमाकर कुल्ली करें। रोज़े में पानी निगलने से बचें।", "3 बार"],
        ["नाक साफ करना", "नाक में हल्का पानी लेकर साफ करें और बाहर निकालें।", "3 बार"],
        ["चेहरा धोना", "बालों की शुरुआत से ठुड्डी तक और चेहरे के दोनों ओर धोएँ।", "3 बार"],
        ["दोनों बाँहें कोहनी सहित धोना", "पहले दायाँ, फिर बायाँ हाथ कोहनी सहित धोएँ।", "हर बाँह 3 बार"],
        ["सिर का मसह", "गीले हाथों से सिर का मसह करें। सही तरीका विश्वसनीय मार्गदर्शन से सीखें।", "1 बार"],
        ["कानों का मसह", "गीली उँगलियों से कानों के निर्धारित हिस्से का मसह करें।", "1 बार"],
        ["दोनों पैर धोना", "दोनों पैर टखनों सहित धोएँ और उँगलियों के बीच पानी पहुँचाएँ।", "हर पैर 3 बार"]
      ],
      wuduNoteTitle: "वुज़ू के बारे में याद रखें",
      wuduNote: "यह सामान्य शैक्षिक जानकारी है। विस्तृत धार्मिक नियमों के लिए विश्वसनीय आलिम से सलाह लें।",
      wuduBreakTitle: "वुज़ू टूटने के सामान्य कारण",
      wuduBreaks: ["पेशाब, मल या हवा निकलना।", "बेहोशी या ऐसी नींद जिसमें होश न रहे।", "अन्य स्थितियों के बारे में विश्वसनीय मार्गदर्शन लें।"],
      ghuslIntro: "ग़ुस्ल उन स्थितियों में पूरे शरीर को पानी से धोकर पवित्रता प्राप्त करने का तरीका है जहाँ इसकी आवश्यकता होती है।",
      ghuslStepsTitle: "ग़ुस्ल का सामान्य तरीका",
      ghuslSteps: ["पवित्रता की नीयत करें।", "शरीर पर लगी नापाकी पहले साफ करें।", "निर्धारित तरीके से वुज़ू करें।", "सिर और बालों की जड़ों तक पानी पहुँचाएँ।", "बगल, नाभि और शरीर की सिलवटों सहित पूरे शरीर तक पानी पहुँचाएँ।"],
      ghuslWhenTitle: "ग़ुस्ल कब फ़र्ज़ होता है?",
      ghuslWhen: ["वैवाहिक संबंध के बाद, लागू नियम के अनुसार।", "वीर्य निकलने की कुछ निर्धारित स्थितियों में।", "मासिक धर्म समाप्त होने पर।", "प्रसव के बाद रक्तस्राव समाप्त होने पर।"],
      ghuslNoteTitle: "ग़ुस्ल के बारे में ज़रूरी बात",
      ghuslNote: "ध्यान दें कि सभी आवश्यक अंगों तक पानी पहुँचे। निजी परिस्थितियों के लिए विश्वसनीय मार्गदर्शन लें।",
      tayammumIntro: "पानी न मिलने या पानी के उपयोग से वास्तविक नुकसान का खतरा होने पर निर्धारित शर्तों के अंतर्गत तयम्मुम किया जा सकता है।",
      tayammumWhenTitle: "तयम्मुम कब किया जा सकता है?",
      tayammumWhen: ["ज़रूरी पानी न मिलने पर।", "पानी के उपयोग से वास्तविक नुकसान का खतरा होने पर।", "अन्य लागू शर्तें पूरी होने पर।"],
      tayammumStepsTitle: "तयम्मुम के चरण",
      tayammumStepsIntro: "लागू नियमों और शर्तों के अनुसार हर चरण पूरा करें।",
      tayammumSteps: [
        ["उपयुक्त मिट्टी पर हाथ रखना", "तयम्मुम के लिए उपयुक्त और पाक मिट्टी जैसी सामग्री का उपयोग करें।"],
        ["चेहरे का मसह", "विश्वसनीय मार्गदर्शन के अनुसार चेहरे का मसह करें।"],
        ["हाथों का मसह", "निर्धारित तरीके के अनुसार हाथों का मसह पूरा करें।"]
      ],
      tayammumNoteTitle: "याद रखें",
      tayammumNote: "तयम्मुम तभी करें जब उसकी शर्तें पूरी हों। सही तरीका विश्वसनीय मार्गदर्शन से सीखें।",
      cleanTitle: "नापाकी और पवित्रता",
      cleanBodyTitle: "शरीर की सफ़ाई",
      cleanBody: ["शरीर साफ रखें और व्यक्तिगत स्वच्छता का ध्यान रखें।", "शौचालय के उपयोग के बाद ठीक से साफ हों।", "शरीर पर नापाकी लगने पर नमाज़ से पहले उसे दूर करें।"],
      cleanClothesTitle: "कपड़ों की सफ़ाई",
      cleanClothes: ["नमाज़ के कपड़े नापाक हों तो उन्हें साफ करें या बदलें।", "नापाकी की जगह पता हो तो उसे अच्छी तरह धोएँ।"],
      cleanPlaceTitle: "नमाज़ की जगह की सफ़ाई",
      cleanPlace: ["नमाज़ की जगह साफ रखें।", "नापाकी लगने पर उसे ठीक से दूर करें।", "बिना कारण बार-बार संदेह करके खुद को परेशान न करें।"],
      guidance: [
        ["वुज़ू टूट जाए", "यदि वुज़ू टूटना निश्चित हो, तो नमाज़ से पहले दोबारा वुज़ू करें। संदेह होने पर विश्वसनीय मार्गदर्शन लें।"],
        ["शरीर या कपड़ों पर नापाकी लगे", "नापाकी निश्चित हो तो नमाज़ से पहले ठीक से साफ करें।"],
        ["ग़ुस्ल फ़र्ज़ हो", "जहाँ ग़ुस्ल आवश्यक हो, वहाँ केवल वुज़ू पर्याप्त नहीं है। नमाज़ से पहले ग़ुस्ल करें।"],
        ["पानी इस्तेमाल न कर सकें", "तयम्मुम की शर्तें पूरी होने की पुष्टि करके विश्वसनीय मार्गदर्शन अपनाएँ।"],
        ["किसी नियम को लेकर संदेह हो", "अनुमान लगाने के बजाय किसी भरोसेमंद आलिम से पूछें। यह पेज शुरुआती शिक्षा के लिए है।"]
      ],
      footer: "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।",
      countLabel: "कितनी बार:"
    }
  };

  function readSettings() {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined) {
      element.textContent = value;
    }
  }

  function setParagraphs(containerId, lines) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(lines)) return;

    const paragraphs = container.querySelectorAll("p");
    paragraphs.forEach((paragraph, index) => {
      if (lines[index] !== undefined) {
        paragraph.textContent = lines[index];
      }
    });
  }

  function setList(id, items) {
    const list = document.getElementById(id);
    if (!list || !Array.isArray(items)) return;

    list.replaceChildren();
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }

  function setCards(sectionId, cards) {
    const section = document.getElementById(sectionId);
    if (!section || !Array.isArray(cards)) return;

    const articles = section.querySelectorAll(":scope > article.content-board");
    cards.forEach((card, index) => {
      const article = articles[index];
      if (!article) return;

      const heading = article.querySelector("h3");
      const paragraph = article.querySelector("p");

      if (heading) heading.textContent = card[0];
      if (paragraph) paragraph.textContent = card[1];
    });
  }

  function applyLanguage(language) {
    const t = translations[language] || translations.bn;

    document.documentElement.lang =
      language === "hi" ? "hi" : language === "en" ? "en" : "bn";

    setText("pageTitle", t.pageTitle);
    setParagraphs("heroDescription", t.hero);

    const sectionIds = [
      "purityRules", "wudu", "ghusl",
      "tayammum", "cleanliness", "importantGuidance"
    ];

    sectionIds.forEach((id, index) => {
      const section = document.getElementById(id);
      if (!section) return;

      const kicker = section.querySelector(".kicker");
      if (kicker && t.sectionKickers[index]) {
        kicker.textContent = t.sectionKickers[index];
      }

      const title = section.querySelector(".section-title h2");
      if (title && t.sectionTitles[index]) {
        title.textContent = t.sectionTitles[index];
      }
    });

    setText("purityRulesTitle", t.sectionTitles[0]);
    setText("purityRulesIntro", t.rulesIntro);
    setCards("purityRules", t.rulesCards);

    setText("wuduTitle", t.sectionTitles[1]);
    setText("wuduIntro", t.wuduIntro);
    setText("wuduNiyyahTitle", t.wuduNiyyahTitle);
    setText("wuduNiyyah", t.wuduNiyyah);

    const wuduSection = document.getElementById("wudu");
    if (wuduSection) {
      const cards = wuduSection.querySelectorAll(":scope > article.content-board");
      if (cards[2]) {
        const heading = cards[2].querySelector("h3");
        const paragraph = cards[2].querySelector("p");
        if (heading) heading.textContent = t.wuduStepsTitle;
        if (paragraph) paragraph.textContent = t.wuduStepsIntro;
      }
    }

    const wuduSteps = document.querySelectorAll("#wuduStepList .step-card");
    wuduSteps.forEach((card, index) => {
      const data = t.wuduSteps[index];
      if (!data) return;

      const heading = card.querySelector(".step-copy h3");
      const paragraph = card.querySelector(".step-copy p:not(.step-count)");
      const count = card.querySelector(".step-count");

      if (heading) heading.textContent = data[0];
      if (paragraph) paragraph.textContent = data[1];

      if (count) {
        count.replaceChildren();
        const strong = document.createElement("strong");
        strong.textContent = t.countLabel + " ";
        count.append(strong, document.createTextNode(data[2]));
      }

      const image = card.querySelector("img");
      if (image) image.alt = data[0];
    });

    setText("wuduNoteTitle", t.wuduNoteTitle);
    const wuduNote = document.querySelector("#wudu .note p");
    if (wuduNote) wuduNote.textContent = t.wuduNote;
    setText("wuduBreakTitle", t.wuduBreakTitle);
    setList("wuduBreaks", t.wuduBreaks);

    setText("ghuslTitle", t.sectionTitles[2]);
    setText("ghuslIntro", t.ghuslIntro);
    setText("ghuslStepsTitle", t.ghuslStepsTitle);
    setList("ghuslSteps", t.ghuslSteps);
    setText("ghuslWhenTitle", t.ghuslWhenTitle);
    setList("ghuslWhen", t.ghuslWhen);
    setText("ghuslNoteTitle", t.ghuslNoteTitle);
    const ghuslNote = document.querySelector("#ghuslNote p");
    if (ghuslNote) ghuslNote.textContent = t.ghuslNote;

    setText("tayammumTitle", t.sectionTitles[3]);
    setText("tayammumIntro", t.tayammumIntro);
    setText("tayammumWhenTitle", t.tayammumWhenTitle);
    setList("tayammumWhen", t.tayammumWhen);

    const tayammumSection = document.getElementById("tayammum");
    if (tayammumSection) {
      const articles = tayammumSection.querySelectorAll(":scope > article.content-board");
      if (articles[2]) {
        const heading = articles[2].querySelector("h3");
        const paragraph = articles[2].querySelector("p");
        if (heading) heading.textContent = t.tayammumStepsTitle;
        if (paragraph) paragraph.textContent = t.tayammumStepsIntro;
      }
    }

    const tayammumCards = document.querySelectorAll(".tayammum-step-card");
    tayammumCards.forEach((card, index) => {
      const data = t.tayammumSteps[index];
      if (!data) return;

      const heading = card.querySelector("h3");
      const paragraph = card.querySelector("p");
      if (heading) heading.textContent = data[0];
      if (paragraph) paragraph.textContent = data[1];

      const image = card.querySelector("img");
      if (image) image.alt = data[0];
    });

    setText("tayammumNoteTitle", t.tayammumNoteTitle);
    const tayammumNote = document.querySelector("#tayammumNote p");
    if (tayammumNote) tayammumNote.textContent = t.tayammumNote;

    setText("cleanTitle", t.cleanTitle);
    setText("cleanBodyTitle", t.cleanBodyTitle);
    setList("cleanBody", t.cleanBody);
    setText("cleanClothesTitle", t.cleanClothesTitle);
    setList("cleanClothes", t.cleanClothes);
    setText("cleanPlaceTitle", t.cleanPlaceTitle);
    setList("cleanPlace", t.cleanPlace);

    const guidanceSection = document.getElementById("importantGuidance");
    if (guidanceSection) {
      const articles = guidanceSection.querySelectorAll(":scope > article.content-board");
      t.guidance.forEach((data, index) => {
        const article = articles[index];
        if (!article) return;

        const heading = article.querySelector("h3");
        const paragraph = article.querySelector("p");
        if (heading) heading.textContent = data[0];
        if (paragraph) paragraph.textContent = data[1];
      });
    }

    setText("guidanceTitle", t.sectionTitles[5]);
    setText("footerText", t.footer);
  }

  function applyTheme(settings) {
    const dark =
      settings.dark === true ||
      settings.dark === "true" ||
      settings.theme === "dark";

    document.body.classList.toggle("dark-mode", dark);
  }

  function refreshSettings() {
    const settings = readSettings();
    const language = ["bn", "en", "hi"].includes(settings.lang)
      ? settings.lang
      : "bn";

    applyLanguage(language);
    applyTheme(settings);
  }

  function init() {
    refreshSettings();

    window.addEventListener("storage", function (event) {
      if (event.key === SETTINGS_KEY) {
        refreshSettings();
      }
    });

    window.addEventListener("appSettingsChanged", refreshSettings);

    /* Preserve layout if an image fails to load. */
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", function () {
        img.classList.add("image-unavailable");
        img.alt = img.alt || "ছবি লোড করা যায়নি";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
