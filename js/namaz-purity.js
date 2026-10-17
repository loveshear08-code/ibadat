
/* =========================================
   IBADAT — NAMAZ PURITY PAGE
   File: namaz-purity.js
========================================= */

(() => {
    "use strict";

    const SETTINGS_KEY = "appSettings";

    const translations = {
        bn: {
            pageTitle: "পবিত্রতা ও পরিচ্ছন্নতা",
            heroEyebrow: "ইবাদতের প্রস্তুতি",
            heroTitle: "পবিত্রতা ও পরিচ্ছন্নতা",
            heroDescription: "ইবাদতের আগে পবিত্রতা অর্জনের নিয়মগুলো সহজভাবে শিখে নাও।",

            lessonsTitle: "পবিত্রতা শেখার বিষয়সমূহ",
            lessonsDescription: "প্রতিটি বিষয় ধাপে ধাপে শিখে সঠিকভাবে আমল করার চেষ্টা করো।",

            wuduTitle: "ওযু",
            wuduDescription: "নামাজের আগে ওযু করার সঠিক নিয়ম ও ধাপগুলো শিখে নাও।",
            wuduButton: "ওযুর নিয়ম দেখো",

            ghuslTitle: "ফরজ গোসল",
            ghuslDescription: "কখন গোসল ফরজ হয় এবং কীভাবে ফরজ গোসল করতে হয় তা জানো।",
            ghuslButton: "গোসলের নিয়ম দেখো",

            tayammumTitle: "তায়াম্মুম",
            tayammumDescription: "পানি ব্যবহার করা সম্ভব না হলে তায়াম্মুমের নিয়ম শিখে নাও।",
            tayammumButton: "তায়াম্মুমের নিয়ম দেখো",

            cleanlinessTitle: "পরিচ্ছন্নতা",
            cleanlinessDescription: "শরীর, পোশাক ও নামাজের স্থানের পবিত্রতা সম্পর্কে জানো।",
            cleanlinessButton: "পরিচ্ছন্নতার নিয়ম দেখো",

            rulesTitle: "পবিত্রতার গুরুত্বপূর্ণ নিয়ম",
            rulesDescription: "পবিত্রতা অর্জনের সময় যে বিষয়গুলো মনে রাখা জরুরি।",
            rulesButton: "গুরুত্বপূর্ণ নিয়ম দেখো",

            wuduSectionTitle: "ওযু করার পদ্ধতি",
            wuduIntro: "ওযু করার সময় ধাপে ধাপে কাজগুলো মনোযোগ দিয়ে সম্পন্ন করো।",
            wuduStep1Title: "হাত ধোয়া",
            wuduStep1Text: "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নাও।",
            wuduStep2Title: "কুলি করা",
            wuduStep2Text: "মুখের ভেতর পানি নিয়ে ভালোভাবে কুলি করো।",
            wuduStep3Title: "নাকে পানি দেওয়া",
            wuduStep3Text: "নাকে পানি দিয়ে পরিষ্কার করো।",
            wuduStep4Title: "মুখ ধোয়া",
            wuduStep4Text: "কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং এক কান থেকে অন্য কান পর্যন্ত মুখ ধুয়ে নাও।",
            wuduStep5Title: "দুই হাত ধোয়া",
            wuduStep5Text: "প্রথমে ডান হাত, তারপর বাম হাত কনুইসহ ধুয়ে নাও।",
            wuduStep6Title: "মাথা মাসেহ করা",
            wuduStep6Text: "ভেজা হাত দিয়ে মাথা মাসেহ করো।",
            wuduStep7Title: "দুই পা ধোয়া",
            wuduStep7Text: "প্রথমে ডান পা, তারপর বাম পা টাখনুসহ ধুয়ে নাও।",
            wuduNote: "ওযুর প্রতিটি অঙ্গ ভালোভাবে ভেজানো এবং পানি অপচয় না করা জরুরি।",

            ghuslIntro: "যেসব অবস্থায় গোসল ফরজ হয় এবং ফরজ গোসলের পদ্ধতি নিচে দেওয়া হলো।",
            ghuslWhenTitle: "কখন গোসল ফরজ হয়?",
            ghuslWhen1: "স্বামী-স্ত্রীর সহবাস হলে, বীর্যপাত হোক বা না হোক।",
            ghuslWhen2: "প্রযোজ্য অবস্থায় বীর্যপাত হলে।",
            ghuslWhen3: "মাসিকের রক্তপাত বন্ধ হলে।",
            ghuslWhen4: "সন্তান প্রসবের পর নিফাসের রক্তপাত বন্ধ হলে।",
            ghuslWhenNote: "ব্যক্তিগত পরিস্থিতি অনুযায়ী কোনো বিধান বুঝতে অসুবিধা হলে নির্ভরযোগ্য আলেমের পরামর্শ নাও।",

            ghuslFardTitle: "ফরজ গোসলের আবশ্যক কাজ",
            ghuslFard1: "মুখের ভেতর ভালোভাবে পানি পৌঁছানো।",
            ghuslFard2: "নাকের ভেতর পানি পৌঁছানো।",
            ghuslFard3: "সমস্ত শরীরে পানি পৌঁছানো, যেন কোনো অংশ শুকনো না থাকে।",
            ghuslFardNote: "এগুলো হানাফি মাজহাব অনুযায়ী ফরজ গোসলের ফরজ কাজ। অন্য মাজহাবে কিছু বিধানের পার্থক্য থাকতে পারে।",

            ghuslStepsTitle: "ফরজ গোসল করার পদ্ধতি",
            ghuslStep1Title: "নিয়ত করা",
            ghuslStep1Text: "পবিত্রতা অর্জনের উদ্দেশ্যে মনে মনে নিয়ত করো।",
            ghuslStep2Title: "শরীরের নাপাকি পরিষ্কার করা",
            ghuslStep2Text: "শরীরে কোনো নাপাকি থাকলে তা আগে ভালোভাবে ধুয়ে পরিষ্কার করো।",
            ghuslStep3Title: "মুখ ও নাকে পানি দেওয়া",
            ghuslStep3Text: "হানাফি মাজহাব অনুযায়ী মুখের ভেতর ও নাকের ভেতর পানি পৌঁছাও।",
            ghuslStep4Title: "মাথা ও চুল ভেজানো",
            ghuslStep4Text: "মাথায় পানি ঢেলে চুলের গোড়াসহ ভালোভাবে ভিজিয়ে নাও।",
            ghuslStep5Title: "সমস্ত শরীর ধোয়া",
            ghuslStep5Text: "শরীরের ডান ও বাম দিকসহ সব অংশে পানি পৌঁছাও।",
            ghuslStep6Title: "কোনো অংশ শুকনো না রাখা",
            ghuslStep6Text: "শরীরের ভাঁজ, নাভি, বগল ও অন্যান্য স্থানে পানি পৌঁছেছে কি না নিশ্চিত হও।",

            ghuslCareTitle: "গোসলের সময় খেয়াল রাখবে",
            ghuslCare1: "শরীরে পানি পৌঁছাতে বাধা দেয় এমন কিছু থাকলে তা সরিয়ে ফেলো।",
            ghuslCare2: "চুলের গোড়া ও শরীরের ভাঁজে পানি পৌঁছানো নিশ্চিত করো।",
            ghuslCare3: "অপ্রয়োজনীয়ভাবে পানি অপচয় করো না।",
            ghuslCare4: "গোসলের সময় শালীনতা ও ব্যক্তিগত গোপনীয়তা বজায় রাখো।",

            tayammumSectionTitle: "তায়াম্মুম করার পদ্ধতি",
            tayammumIntro: "পানি না পাওয়া গেলে বা শরিয়তসম্মত কারণে পানি ব্যবহার করা সম্ভব না হলে তায়াম্মুমের বিধান প্রযোজ্য হতে পারে।",
            tayammumStep1Title: "নিয়ত করা",
            tayammumStep1Text: "পবিত্রতা অর্জনের উদ্দেশ্যে মনে মনে নিয়ত করো।",
            tayammumStep2Title: "পবিত্র মাটিতে হাত রাখা",
            tayammumStep2Text: "তায়াম্মুমের উপযোগী পবিত্র মাটিতে দুই হাত স্পর্শ করো।",
            tayammumStep3Title: "মুখ মাসেহ করা",
            tayammumStep3Text: "নিয়ম অনুযায়ী দুই হাত দিয়ে পুরো মুখ মাসেহ করো।",
            tayammumStep4Title: "দুই হাত মাসেহ করা",
            tayammumStep4Text: "নির্ধারিত পদ্ধতিতে দুই হাত মাসেহ করো।",
            tayammumNote: "তায়াম্মুমের বিস্তারিত বিধান মাজহাবভেদে ভিন্ন হতে পারে।",

            cleanlinessSectionTitle: "পরিচ্ছন্নতা ও পবিত্রতা",
            cleanlinessIntro: "ইবাদতের জন্য শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা জরুরি।",
            cleanlinessItem1: "শরীরের নাপাকি পরিষ্কার করো।",
            cleanlinessItem2: "নামাজের পোশাক পরিষ্কার ও পবিত্র রাখো।",
            cleanlinessItem3: "নামাজের স্থান নাপাকি থেকে মুক্ত রাখো।",
            cleanlinessItem4: "পবিত্রতা অর্জনের ক্ষেত্রে সন্দেহ হলে নির্ভরযোগ্য আলেমের পরামর্শ নাও।",

            rulesSectionTitle: "পবিত্রতার গুরুত্বপূর্ণ নিয়ম",
            rulesItem1: "পানি ব্যবহারের সময় অপচয় এড়িয়ে চলো।",
            rulesItem2: "শরীরের কোনো অংশে পানি পৌঁছাতে বাধা আছে কি না খেয়াল করো।",
            rulesItem3: "ধর্মীয় বিধান শেখার সময় নির্ভরযোগ্য সূত্র অনুসরণ করো।",
            rulesItem4: "মাজহাবভেদে পার্থক্য থাকলে নিজের অনুসৃত মাজহাবের নির্ভরযোগ্য নির্দেশনা মেনে চলো।",

            footerTitle: "জ্ঞান অর্জন করো ও আমল করো",
            footerText: "আল্লাহ আমাদের সঠিকভাবে পবিত্রতা অর্জন করার তাওফিক দিন।"
        },

        en: {
            pageTitle: "Purity and Cleanliness",
            heroEyebrow: "Preparing for Worship",
            heroTitle: "Purity and Cleanliness",
            heroDescription: "Learn the rules of purification before worship in a simple way.",

            lessonsTitle: "Learn About Purification",
            lessonsDescription: "Learn each topic step by step and try to practise it correctly.",

            wuduTitle: "Wudu (Ablution)",
            wuduDescription: "Learn the correct steps of performing wudu before prayer.",
            wuduButton: "Learn Wudu",

            ghuslTitle: "Obligatory Ghusl",
            ghuslDescription: "Learn when ghusl becomes obligatory and how to perform it.",
            ghuslButton: "Learn Ghusl",

            tayammumTitle: "Tayammum",
            tayammumDescription: "Learn how to perform tayammum when water cannot be used.",
            tayammumButton: "Learn Tayammum",

            cleanlinessTitle: "Cleanliness",
            cleanlinessDescription: "Learn about the purity of the body, clothing and prayer area.",
            cleanlinessButton: "Learn Cleanliness",

            rulesTitle: "Important Purification Rules",
            rulesDescription: "Important points to remember when seeking purification.",
            rulesButton: "View Important Rules",

            wuduSectionTitle: "How to Perform Wudu",
            wuduIntro: "Follow each step carefully while performing wudu.",
            wuduStep1Title: "Wash the Hands",
            wuduStep1Text: "Wash both hands thoroughly up to the wrists.",
            wuduStep2Title: "Rinse the Mouth",
            wuduStep2Text: "Take water into your mouth and rinse thoroughly.",
            wuduStep3Title: "Clean the Nose",
            wuduStep3Text: "Use water to clean the inside of the nose.",
            wuduStep4Title: "Wash the Face",
            wuduStep4Text: "Wash the face from the hairline to the chin and from ear to ear.",
            wuduStep5Title: "Wash Both Arms",
            wuduStep5Text: "Wash the right arm and then the left, including the elbows.",
            wuduStep6Title: "Wipe the Head",
            wuduStep6Text: "Wipe the head with wet hands.",
            wuduStep7Title: "Wash Both Feet",
            wuduStep7Text: "Wash the right foot and then the left, including the ankles.",
            wuduNote: "Wash each required area properly and avoid wasting water.",

            ghuslIntro: "Learn when ghusl becomes obligatory and how to perform obligatory ghusl.",
            ghuslWhenTitle: "When Is Ghusl Obligatory?",
            ghuslWhen1: "After sexual intercourse between spouses, whether or not ejaculation occurs.",
            ghuslWhen2: "When ejaculation occurs in circumstances that require ghusl.",
            ghuslWhen3: "When menstrual bleeding ends.",
            ghuslWhen4: "When postnatal bleeding ends.",
            ghuslWhenNote: "For guidance about a specific personal situation, consult a reliable scholar.",

            ghuslFardTitle: "Obligatory Acts of Ghusl",
            ghuslFard1: "Rinse the inside of the mouth thoroughly.",
            ghuslFard2: "Ensure water reaches the inside of the nose.",
            ghuslFard3: "Wash the entire body so that no area remains dry.",
            ghuslFardNote: "These are the obligatory acts according to the Hanafi school. Some details differ among schools of Islamic law.",

            ghuslStepsTitle: "How to Perform Obligatory Ghusl",
            ghuslStep1Title: "Make the Intention",
            ghuslStep1Text: "Make the intention in your heart to attain purification.",
            ghuslStep2Title: "Remove Impurity",
            ghuslStep2Text: "If there is any impurity on the body, wash it away first.",
            ghuslStep3Title: "Rinse the Mouth and Nose",
            ghuslStep3Text: "According to the Hanafi school, ensure water reaches the inside of the mouth and nose.",
            ghuslStep4Title: "Wet the Head and Hair",
            ghuslStep4Text: "Pour water over the head and ensure the hair roots are wet.",
            ghuslStep5Title: "Wash the Entire Body",
            ghuslStep5Text: "Ensure water reaches all parts of the body, including both sides.",
            ghuslStep6Title: "Check for Dry Areas",
            ghuslStep6Text: "Make sure water reaches skin folds, the navel, armpits and other areas.",

            ghuslCareTitle: "Things to Remember During Ghusl",
            ghuslCare1: "Remove anything that prevents water from reaching the body.",
            ghuslCare2: "Ensure water reaches hair roots and body folds.",
            ghuslCare3: "Avoid wasting water.",
            ghuslCare4: "Maintain modesty and privacy while bathing.",

            tayammumSectionTitle: "How to Perform Tayammum",
            tayammumIntro: "Tayammum may apply when water is unavailable or cannot be used for a valid religious reason.",
            tayammumStep1Title: "Make the Intention",
            tayammumStep1Text: "Make the intention in your heart to attain purification.",
            tayammumStep2Title: "Touch Clean Earth",
            tayammumStep2Text: "Place both hands on suitable clean earth or material for tayammum.",
            tayammumStep3Title: "Wipe the Face",
            tayammumStep3Text: "Wipe the entire face with both hands according to the prescribed method.",
            tayammumStep4Title: "Wipe the Hands",
            tayammumStep4Text: "Wipe both hands according to the prescribed method.",
            tayammumNote: "Details of tayammum may differ among schools of Islamic law.",

            cleanlinessSectionTitle: "Cleanliness and Purity",
            cleanlinessIntro: "For worship, the body, clothing and prayer area should be clean and pure.",
            cleanlinessItem1: "Remove impurity from the body.",
            cleanlinessItem2: "Keep prayer clothing clean and pure.",
            cleanlinessItem3: "Keep the prayer area free from impurity.",
            cleanlinessItem4: "Consult a reliable scholar if you are unsure about a purification ruling.",

            rulesSectionTitle: "Important Purification Rules",
            rulesItem1: "Avoid wasting water.",
            rulesItem2: "Check whether anything prevents water from reaching the required areas.",
            rulesItem3: "Follow reliable sources when learning religious rulings.",
            rulesItem4: "Where rulings differ, follow reliable guidance from the school of law you follow.",

            footerTitle: "Gain Knowledge and Practise It",
            footerText: "May Allah grant us the ability to purify ourselves correctly."
        },

        hi: {
            pageTitle: "पवित्रता और स्वच्छता",
            heroEyebrow: "इबादत की तैयारी",
            heroTitle: "पवित्रता और स्वच्छता",
            heroDescription: "इबादत से पहले पाकी हासिल करने के नियम आसानी से सीखें।",

            lessonsTitle: "पवित्रता के बारे में सीखें",
            lessonsDescription: "हर विषय को चरणबद्ध तरीके से सीखें और सही ढंग से अमल करने की कोशिश करें।",

            wuduTitle: "वुज़ू",
            wuduDescription: "नमाज़ से पहले वुज़ू करने का सही तरीका सीखें।",
            wuduButton: "वुज़ू का तरीका",

            ghuslTitle: "फ़र्ज़ ग़ुस्ल",
            ghuslDescription: "जानें कि ग़ुस्ल कब फ़र्ज़ होता है और उसे कैसे किया जाता है।",
            ghuslButton: "ग़ुस्ल का तरीका",

            tayammumTitle: "तयम्मुम",
            tayammumDescription: "पानी इस्तेमाल करना संभव न हो तो तयम्मुम का तरीका सीखें।",
            tayammumButton: "तयम्मुम का तरीका",

            cleanlinessTitle: "स्वच्छता",
            cleanlinessDescription: "शरीर, कपड़ों और नमाज़ की जगह की पाकी के बारे में जानें।",
            cleanlinessButton: "स्वच्छता के नियम",

            rulesTitle: "पवित्रता के ज़रूरी नियम",
            rulesDescription: "पाकी हासिल करते समय इन ज़रूरी बातों का ध्यान रखें।",
            rulesButton: "ज़रूरी नियम देखें",

            wuduSectionTitle: "वुज़ू करने का तरीका",
            wuduIntro: "वुज़ू करते समय हर चरण को ध्यानपूर्वक पूरा करें।",
            wuduStep1Title: "हाथ धोना",
            wuduStep1Text: "दोनों हाथों को कलाई तक अच्छी तरह धोएँ।",
            wuduStep2Title: "कुल्ली करना",
            wuduStep2Text: "मुँह में पानी लेकर अच्छी तरह कुल्ली करें।",
            wuduStep3Title: "नाक साफ़ करना",
            wuduStep3Text: "पानी से नाक के अंदरूनी हिस्से को साफ़ करें।",
            wuduStep4Title: "चेहरा धोना",
            wuduStep4Text: "बालों की शुरुआत से ठोड़ी तक और एक कान से दूसरे कान तक चेहरा धोएँ।",
            wuduStep5Title: "दोनों बाज़ू धोना",
            wuduStep5Text: "पहले दायाँ और फिर बायाँ बाज़ू कोहनियों समेत धोएँ।",
            wuduStep6Title: "सिर का मसह",
            wuduStep6Text: "गीले हाथों से सिर का मसह करें।",
            wuduStep7Title: "दोनों पैर धोना",
            wuduStep7Text: "पहले दायाँ और फिर बायाँ पैर टखनों समेत धोएँ।",
            wuduNote: "हर ज़रूरी अंग को अच्छी तरह धोएँ और पानी बर्बाद न करें।",

            ghuslIntro: "जानें कि ग़ुस्ल कब फ़र्ज़ होता है और फ़र्ज़ ग़ुस्ल कैसे किया जाता है।",
            ghuslWhenTitle: "ग़ुस्ल कब फ़र्ज़ होता है?",
            ghuslWhen1: "पति-पत्नी के बीच संभोग होने पर, चाहे स्खलन हो या न हो।",
            ghuslWhen2: "ऐसी परिस्थिति में वीर्यपात होने पर जिसमें ग़ुस्ल ज़रूरी हो।",
            ghuslWhen3: "मासिक धर्म का रक्तस्राव समाप्त होने पर।",
            ghuslWhen4: "प्रसव के बाद होने वाला रक्तस्राव समाप्त होने पर।",
            ghuslWhenNote: "किसी विशेष परिस्थिति के बारे में मार्गदर्शन के लिए विश्वसनीय आलिम से सलाह लें।",

            ghuslFardTitle: "फ़र्ज़ ग़ुस्ल के अनिवार्य काम",
            ghuslFard1: "मुँह के अंदर अच्छी तरह पानी पहुँचाना।",
            ghuslFard2: "नाक के अंदर पानी पहुँचाना।",
            ghuslFard3: "पूरे शरीर को धोना ताकि कोई हिस्सा सूखा न रहे।",
            ghuslFardNote: "ये हनफ़ी मज़हब के अनुसार फ़र्ज़ ग़ुस्ल के अनिवार्य काम हैं। अन्य मज़हबों में कुछ विवरण अलग हो सकते हैं।",

            ghuslStepsTitle: "फ़र्ज़ ग़ुस्ल करने का तरीका",
            ghuslStep1Title: "नीयत करना",
            ghuslStep1Text: "पाकी हासिल करने की नीयत दिल में करें।",
            ghuslStep2Title: "नापाकी साफ़ करना",
            ghuslStep2Text: "शरीर पर कोई नापाकी हो तो पहले उसे अच्छी तरह धो लें।",
            ghuslStep3Title: "मुँह और नाक में पानी",
            ghuslStep3Text: "हनफ़ी मज़हब के अनुसार मुँह और नाक के अंदर पानी पहुँचाएँ।",
            ghuslStep4Title: "सिर और बाल भिगोना",
            ghuslStep4Text: "सिर पर पानी डालें और बालों की जड़ों तक पानी पहुँचाएँ।",
            ghuslStep5Title: "पूरा शरीर धोना",
            ghuslStep5Text: "शरीर के दाएँ और बाएँ हिस्से समेत हर जगह पानी पहुँचाएँ।",
            ghuslStep6Title: "कोई हिस्सा सूखा न रहे",
            ghuslStep6Text: "शरीर की सिलवटों, नाभि, बगलों और अन्य जगहों तक पानी पहुँचने की जाँच करें।",

            ghuslCareTitle: "ग़ुस्ल के दौरान ध्यान रखने वाली बातें",
            ghuslCare1: "पानी पहुँचने में रुकावट पैदा करने वाली चीज़ हटा दें।",
            ghuslCare2: "बालों की जड़ों और शरीर की सिलवटों तक पानी पहुँचाएँ।",
            ghuslCare3: "पानी बर्बाद न करें।",
            ghuslCare4: "ग़ुस्ल करते समय शालीनता और निजता बनाए रखें।",

            tayammumSectionTitle: "तयम्मुम करने का तरीका",
            tayammumIntro: "पानी उपलब्ध न हो या किसी मान्य धार्मिक कारण से इस्तेमाल न किया जा सके तो तयम्मुम लागू हो सकता है।",
            tayammumStep1Title: "नीयत करना",
            tayammumStep1Text: "पाकी हासिल करने की नीयत दिल में करें।",
            tayammumStep2Title: "पाक मिट्टी पर हाथ रखना",
            tayammumStep2Text: "तयम्मुम के लिए उपयुक्त पाक मिट्टी या सामग्री पर दोनों हाथ रखें।",
            tayammumStep3Title: "चेहरे का मसह",
            tayammumStep3Text: "निर्धारित तरीके से दोनों हाथों से पूरे चेहरे का मसह करें।",
            tayammumStep4Title: "हाथों का मसह",
            tayammumStep4Text: "निर्धारित तरीके से दोनों हाथों का मसह करें।",
            tayammumNote: "तयम्मुम के कुछ विवरण अलग-अलग मज़हबों में भिन्न हो सकते हैं।",

            cleanlinessSectionTitle: "स्वच्छता और पवित्रता",
            cleanlinessIntro: "इबादत के लिए शरीर, कपड़े और नमाज़ की जगह पाक होनी चाहिए।",
            cleanlinessItem1: "शरीर की नापाकी साफ़ करें।",
            cleanlinessItem2: "नमाज़ के कपड़े साफ़ और पाक रखें।",
            cleanlinessItem3: "नमाज़ की जगह को नापाकी से मुक्त रखें।",
            cleanlinessItem4: "पवित्रता के किसी नियम में संदेह हो तो विश्वसनीय आलिम से सलाह लें।",

            rulesSectionTitle: "पवित्रता के ज़रूरी नियम",
            rulesItem1: "पानी बर्बाद करने से बचें।",
            rulesItem2: "देखें कि पानी पहुँचने में कोई रुकावट तो नहीं है।",
            rulesItem3: "धार्मिक नियम सीखते समय विश्वसनीय स्रोतों का पालन करें।",
            rulesItem4: "जहाँ मज़हबों के बीच अंतर हो, अपने अनुसरण वाले मज़हब की विश्वसनीय हिदायत मानें।",

            footerTitle: "ज्ञान हासिल करें और अमल करें",
            footerText: "अल्लाह हमें सही तरीके से पाकी हासिल करने की तौफ़ीक़ दे।"
        }
    };

    const languageAliases = {
        bn: "bn",
        bengali: "bn",
        bangla: "bn",
        বাংলা: "bn",

        en: "en",
        english: "en",
        ইংরেজি: "en",

        hi: "hi",
        hindi: "hi",
        हिन्दी: "hi",
        हिंदी: "hi"
    };

    function readSettings() {
        try {
            const raw = localStorage.getItem(SETTINGS_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (error) {
            console.warn("IBADAT: Could not read app settings.", error);
            return {};
        }
    }

    function getLanguage() {
        const settings = readSettings();

        const storedLanguage =
            settings.lang ??
            settings.language ??
            settings.locale ??
            document.documentElement.lang ??
            "bn";

        const normalized = String(storedLanguage).trim().toLowerCase();

        return languageAliases[normalized] || "bn";
    }

    function getDigitMap(language) {
        if (language === "bn") {
            return ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        }

        if (language === "hi") {
            return ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
        }

        return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    }

    function localizeDigits(value, language) {
        const digits = getDigitMap(language);

        return String(value).replace(/\d/g, (digit) => digits[Number(digit)]);
    }

    function applyTranslations(language) {
        const dictionary = translations[language] || translations.bn;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");

            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
                element.textContent = dictionary[key];
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
            const key = element.getAttribute("data-i18n-placeholder");

            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
                element.setAttribute("placeholder", dictionary[key]);
            }
        });

        document.querySelectorAll("[data-i18n-title]").forEach((element) => {
            const key = element.getAttribute("data-i18n-title");

            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
                element.setAttribute("title", dictionary[key]);
            }
        });

        document.documentElement.lang =
            language === "bn" ? "bn" :
            language === "hi" ? "hi" : "en";

        if (dictionary.pageTitle) {
            document.title = dictionary.pageTitle;
        }

        return dictionary;
    }

    function applyLessonNumbers(language) {
        const numberElements = document.querySelectorAll(".lesson-number");

        numberElements.forEach((element, index) => {
            element.textContent = localizeDigits(index + 1, language);
        });
    }

    function applyTheme() {
        const settings = readSettings();

        const themeValue = String(settings.theme ?? "").toLowerCase();

        const isDark =
            settings.dark === true ||
            settings.isDark === true ||
            settings.darkMode === true ||
            themeValue === "dark";

        document.documentElement.classList.toggle("dark", isDark);
        document.body.classList.toggle("dark", isDark);
        document.body.classList.toggle("dark-theme", isDark);
        document.documentElement.setAttribute(
            "data-theme",
            isDark ? "dark" : "light"
        );
    }

    function applySettings() {
        const language = getLanguage();

        applyTranslations(language);
        applyLessonNumbers(language);
        applyTheme();
    }

    function setupSectionLinks() {
        document.querySelectorAll("[data-scroll-target]").forEach((button) => {
            if (button.dataset.purityScrollReady === "true") {
                return;
            }

            button.dataset.purityScrollReady = "true";

            button.addEventListener("click", () => {
                const targetSelector = button.getAttribute("data-scroll-target");

                if (!targetSelector) {
                    return;
                }

                const target = document.querySelector(targetSelector);

                if (target) {
                    target.scrollIntoView({
                        behavior: window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches ? "auto" : "smooth",
                        block: "start"
                    });
                }
            });
        });
    }

    function setupAnchorScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            if (link.dataset.purityAnchorReady === "true") {
                return;
            }

            link.dataset.purityAnchorReady = "true";

            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (!href || href === "#") {
                    return;
                }

                let target;

                try {
                    target = document.querySelector(href);
                } catch (error) {
                    return;
                }

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                if (history.replaceState) {
                    history.replaceState(null, "", href);
                }
            });
        });
    }

    function initialize() {
        applySettings();
        setupSectionLinks();
        setupAnchorScrolling();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }

    window.addEventListener("storage", (event) => {
        if (!event.key || event.key === SETTINGS_KEY) {
            applySettings();
        }
    });

    window.addEventListener("ibadat:settings-changed", applySettings);

    window.IBADATPurity = {
        applySettings,
        applyTranslations,
        applyTheme,
        translations
    };
})();
