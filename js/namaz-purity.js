/* IBADAT — NAMAZ PURITY
   File: js/namaz-purity.js
*/
(function () {
  "use strict";

  const SETTINGS_KEY = "appSettings";

  const T = {
    bn: {
      eyebrow: "ইবাদত",
      pageTitle: "পবিত্রতা",
      heroDescription: [
        "পবিত্রতা হলো শরীর, পোশাক ও মনের পরিচ্ছন্নতা।",
        "এটি ইবাদতের প্রস্তুতি ও জীবনের সৌন্দর্য।",
        "পবিত্রতা আমাদের শেখায় পরিচ্ছন্নতা ও সচেতনতা।",
        "এর মাধ্যমেই ইবাদতে আসে প্রশান্তি ও পরিপূর্ণতা।"
      ],

      cleanKicker: "প্রথম পাঠ",
      cleanTitle: "পবিত্রতা ও প্রস্তুতি",
      cleanIntro:
        "ইবাদতের আগে শরীর, পোশাক ও নামাজের স্থান পরিষ্কার রাখা জরুরি।",
      cleanBodyTitle: "শরীরের পবিত্রতা",
      cleanBody:
        "শরীর পরিষ্কার রাখো এবং অপবিত্রতা লাগলে তা যথাযথভাবে পরিষ্কার করো।",
      cleanClothesTitle: "পোশাকের পবিত্রতা",
      cleanClothes:
        "নামাজের জন্য পরিষ্কার পোশাক পরো। পোশাকে অপবিত্রতা লাগলে তা দূর করো।",
      cleanPlaceTitle: "নামাজের স্থানের পবিত্রতা",
      cleanPlace:
        "নামাজের স্থান পরিষ্কার রাখো এবং সেখানে অপবিত্রতা থাকলে তা দূর করো.",

      wuduKicker: "দ্বিতীয় পাঠ",
      wuduTitle: "ওযু করার নিয়ম",
      wuduIntro:
        "নামাজের আগে প্রয়োজন অনুযায়ী ওযু করো। প্রতিটি অঙ্গ যত্নসহকারে ধুয়ে নাও।",
      wuduNiyyahTitle: "ওযুর নিয়ত",
      wuduNiyyah:
        "ওযু করার জন্য মনে নিয়ত করো। নিয়ত মূলত অন্তরের ইচ্ছা।",
      wuduStepsTitle: "ওযুর ধাপগুলো",
      wuduNoteTitle: "মনে রাখবে",
      wuduNote:
        "যে অঙ্গ ধোয়া জরুরি, সেখানে পানি পৌঁছেছে কি না খেয়াল করো। অযথা পানি অপচয় কোরো না।",
      wuduBreaksTitle: "ওযু ভঙ্গের বিষয়",
      wuduBreaks: [
        "প্রস্রাব, পায়খানা বা বায়ু নির্গত হওয়া।",
        "গভীর ঘুম বা এমন অচেতনতা, যাতে নিজের অবস্থা বোঝা যায় না।",
        "ওযু ভঙ্গের অন্যান্য বিষয়ে নিজের অনুসৃত নির্ভরযোগ্য আলেমের নির্দেশনা অনুসরণ করো।"
      ],
      wuduSteps: [
        {
          title: "দুই হাত ধোয়া",
          text: "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নাও।"
        },
        {
          title: "কুলি করা",
          text: "মুখে পানি নিয়ে ভালোভাবে কুলি করো।"
        },
        {
          title: "নাকে পানি দেওয়া",
          text: "নাকে পানি নিয়ে পরিষ্কার করো, তবে ক্ষতি হয় এমনভাবে নয়।"
        },
        {
          title: "মুখ ধোয়া",
          text: "কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং এক কান থেকে অন্য কান পর্যন্ত মুখ ধুয়ে নাও।"
        },
        {
          title: "দুই হাত কনুইসহ ধোয়া",
          text: "প্রথমে ডান হাত, তারপর বাম হাত কনুইসহ ধুয়ে নাও।"
        },
        {
          title: "মাথা মাসেহ করা",
          text: "ভেজা হাত দিয়ে মাথা মাসেহ করো।"
        },
        {
          title: "কান মাসেহ করা",
          text: "ভেজা আঙুল দিয়ে কানের ভেতর এবং বুড়ো আঙুল দিয়ে বাইরের অংশ মাসেহ করো।"
        },
        {
          title: "দুই পা টাখনুসহ ধোয়া",
          text: "প্রথমে ডান পা, তারপর বাম পা টাখনুসহ ভালোভাবে ধুয়ে নাও।"
        }
      ],

      ghuslKicker: "তৃতীয় পাঠ",
      ghuslTitle: "গোসলের নিয়ম",
      ghuslIntro:
        "যেসব অবস্থায় ফরজ গোসল প্রয়োজন হয়, সেসব ক্ষেত্রে শরীরের সর্বত্র পানি পৌঁছানো জরুরি।",
      ghuslNiyyahTitle: "নিয়ত ও প্রস্তুতি",
      ghuslNiyyah:
        "গোসলের জন্য মনে নিয়ত করো এবং শরীরের অপবিত্রতা থাকলে তা পরিষ্কার করো।",
      ghuslStepsTitle: "গোসলের প্রধান ধাপ",
      ghuslSteps: [
        {
          title: "হাত ও অপবিত্র স্থান পরিষ্কার করা",
          text: "প্রথমে হাত ধুয়ে শরীরে অপবিত্রতা থাকলে তা দূর করো।"
        },
        {
          title: "ওযু করা",
          text: "নামাজের ওযুর মতো ওযু করো।"
        },
        {
          title: "মাথায় পানি দেওয়া",
          text: "মাথা ও চুলের গোড়ায় পানি পৌঁছাও।"
        },
        {
          title: "সারা শরীরে পানি পৌঁছানো",
          text: "শরীরের ডান ও বাম দিকসহ কোনো অংশ শুকনো না রেখে ভালোভাবে ধুয়ে নাও।"
        }
      ],
      ghuslNoteTitle: "বিশেষভাবে খেয়াল রাখবে",
      ghuslNote:
        "শরীরের ভাঁজ, নাভি এবং পানি পৌঁছাতে অসুবিধা হয় এমন স্থানেও পানি পৌঁছেছে কি না নিশ্চিত হও।",

      tayammumKicker: "চতুর্থ পাঠ",
      tayammumTitle: "তায়াম্মুমের নিয়ম",
      tayammumIntro:
        "পানি না পাওয়া গেলে অথবা পানি ব্যবহার করা শরিয়তসম্মতভাবে সম্ভব না হলে নির্ধারিত নিয়মে তায়াম্মুম করা যায়।",
      tayammumStepsTitle: "তায়াম্মুমের ধাপ",
      tayammumSteps: [
        {
          title: "নিয়ত করা",
          text: "পবিত্রতা অর্জনের উদ্দেশ্যে মনে নিয়ত করো।"
        },
        {
          title: "মাটি বা উপযুক্ত পবিত্র বস্তুতে হাত রাখা",
          text: "শরিয়তসম্মত পবিত্র মাটি বা উপযুক্ত বস্তু ব্যবহার করে দুই হাত দিয়ে মুখ মাসেহ করো।"
        },
        {
          title: "দুই হাত মাসেহ করা",
          text: "নির্ধারিত নিয়ম অনুযায়ী দুই হাত মাসেহ করো।"
        }
      ],
      tayammumNoteTitle: "মনে রাখবে",
      tayammumNote:
        "তায়াম্মুমের বিস্তারিত পদ্ধতিতে মাজহাবভেদে কিছু পার্থক্য রয়েছে। নিজের অনুসৃত নির্ভরযোগ্য আলেমের নির্দেশনা অনুসরণ করো।",

      guidanceKicker: "পঞ্চম পাঠ",
      guidanceTitle: "গুরুত্বপূর্ণ সতর্কতা",
      guidanceIntro:
        "পবিত্রতার নিয়ম বুঝে আমল করো। কোনো বিষয়ে সন্দেহ হলে নির্ভরযোগ্য আলেমের কাছে জেনে নাও।",
      guidanceCards: [
        {
          title: "ওযু ভেঙে গেলে",
          text: "নামাজের আগে প্রয়োজন হলে নতুন করে ওযু করো।"
        },
        {
          title: "শরীর বা পোশাকে অপবিত্রতা লাগলে",
          text: "নামাজের আগে অপবিত্র স্থান যথাযথভাবে পরিষ্কার করো।"
        },
        {
          title: "ফরজ গোসল প্রয়োজন হলে",
          text: "নামাজের আগে শরিয়তের নিয়ম অনুযায়ী গোসল সম্পন্ন করো।"
        },
        {
          title: "পানি ব্যবহার সম্ভব না হলে",
          text: "শরিয়তের শর্ত পূরণ হলে তায়াম্মুমের নিয়ম অনুসরণ করো।"
        },
        {
          title: "কোনো বিষয়ে সন্দেহ হলে",
          text: "অনুমান করে সিদ্ধান্ত না নিয়ে নির্ভরযোগ্য জ্ঞান থেকে বিষয়টি জেনে নাও।"
        }
      ],

      footerText: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
      backToTop: "উপরে ফিরে যাও",
      imageAlt: "পবিত্রতা শেখার চিত্র",
      stepLabel: "ধাপ",
      languageNames: {
        bn: "বাংলা",
        en: "English",
        hi: "हिन्दी"
      }
    },

    en: {
      eyebrow: "IBADAT",
      pageTitle: "Purity",
      heroDescription: [
        "Purity means keeping the body, clothes, and mind clean.",
        "It is part of preparing for worship and living well.",
        "Purity teaches cleanliness and awareness.",
        "It brings calmness and completeness to worship."
      ],

      cleanKicker: "Lesson One",
      cleanTitle: "Purity and Preparation",
      cleanIntro:
        "Before worship, keep your body, clothes, and prayer place clean.",
      cleanBodyTitle: "Cleanliness of the Body",
      cleanBody:
        "Keep your body clean and properly remove any impurity.",
      cleanClothesTitle: "Cleanliness of Clothing",
      cleanClothes:
        "Wear clean clothes for prayer and remove any impurity from them.",
      cleanPlaceTitle: "Cleanliness of the Prayer Place",
      cleanPlace:
        "Keep the prayer place clean and remove any impurity from it.",

      wuduKicker: "Lesson Two",
      wuduTitle: "How to Perform Wudu",
      wuduIntro:
        "Perform wudu when required before prayer. Wash each part carefully.",
      wuduNiyyahTitle: "Intention for Wudu",
      wuduNiyyah:
        "Make the intention for wudu in your heart. Intention is an inward resolve.",
      wuduStepsTitle: "Steps of Wudu",
      wuduNoteTitle: "Remember",
      wuduNote:
        "Make sure water reaches the required parts. Avoid wasting water.",
      wuduBreaksTitle: "What Invalidates Wudu",
      wuduBreaks: [
        "Urination, defecation, or passing wind.",
        "Deep sleep or unconsciousness that prevents awareness.",
        "For other cases, follow guidance from a trusted scholar in your tradition."
      ],
      wuduSteps: [
        {
          title: "Wash Both Hands",
          text: "Wash both hands thoroughly up to the wrists."
        },
        {
          title: "Rinse the Mouth",
          text: "Take water into your mouth and rinse it well."
        },
        {
          title: "Clean the Nose",
          text: "Take water into the nose and clean it gently."
        },
        {
          title: "Wash the Face",
          text: "Wash from the hairline to below the chin and from ear to ear."
        },
        {
          title: "Wash Both Arms",
          text: "Wash the right arm and then the left, including the elbows."
        },
        {
          title: "Wipe the Head",
          text: "Wipe the head with wet hands."
        },
        {
          title: "Wipe the Ears",
          text: "Wipe the inner and outer parts of the ears with wet fingers."
        },
        {
          title: "Wash Both Feet",
          text: "Wash the right foot and then the left, including the ankles."
        }
      ],

      ghuslKicker: "Lesson Three",
      ghuslTitle: "How to Perform Ghusl",
      ghuslIntro:
        "When a ritual bath is required, water must reach the entire body.",
      ghuslNiyyahTitle: "Intention and Preparation",
      ghuslNiyyah:
        "Make the intention for ghusl and remove any visible impurity first.",
      ghuslStepsTitle: "Main Steps of Ghusl",
      ghuslSteps: [
        {
          title: "Wash Hands and Remove Impurity",
          text: "Wash your hands and remove any impurity from the body."
        },
        {
          title: "Perform Wudu",
          text: "Perform wudu as you would for prayer."
        },
        {
          title: "Wash the Head",
          text: "Make sure water reaches the head and roots of the hair."
        },
        {
          title: "Wash the Entire Body",
          text: "Wash the right and left sides and ensure no part remains dry."
        }
      ],
      ghuslNoteTitle: "Pay Special Attention",
      ghuslNote:
        "Make sure water reaches skin folds, the navel, and other areas that are difficult to wash.",

      tayammumKicker: "Lesson Four",
      tayammumTitle: "How to Perform Tayammum",
      tayammumIntro:
        "Tayammum may be performed according to its prescribed rules when water is unavailable or cannot validly be used.",
      tayammumStepsTitle: "Steps of Tayammum",
      tayammumSteps: [
        {
          title: "Make the Intention",
          text: "Make the intention in your heart to attain ritual purity."
        },
        {
          title: "Use Pure Earth or a Suitable Surface",
          text: "Using a suitable pure surface, wipe the face with both hands."
        },
        {
          title: "Wipe Both Hands",
          text: "Wipe both hands according to the prescribed method."
        }
      ],
      tayammumNoteTitle: "Remember",
      tayammumNote:
        "Some details of tayammum differ among schools of Islamic law. Follow a trusted scholar in your tradition.",

      guidanceKicker: "Lesson Five",
      guidanceTitle: "Important Warnings",
      guidanceIntro:
        "Learn the rules of purity and practise them carefully. Ask a trusted scholar when unsure.",
      guidanceCards: [
        {
          title: "When Wudu Is Invalidated",
          text: "Perform wudu again before prayer when required."
        },
        {
          title: "When Body or Clothes Become Impure",
          text: "Properly clean the affected area before prayer."
        },
        {
          title: "When Ghusl Is Required",
          text: "Complete the ritual bath according to Islamic guidance before prayer."
        },
        {
          title: "When Water Cannot Be Used",
          text: "Follow the rules of tayammum when its conditions are met."
        },
        {
          title: "When You Are Unsure",
          text: "Seek reliable knowledge rather than relying on guesses."
        }
      ],

      footerText: "Preserve purity and find peace in worship.",
      backToTop: "Back to top",
      imageAlt: "Illustration for learning about purity",
      stepLabel: "Step",
      languageNames: {
        bn: "বাংলা",
        en: "English",
        hi: "हिन्दी"
      }
    },

    hi: {
      eyebrow: "इबादत",
      pageTitle: "पवित्रता",
      heroDescription: [
        "पवित्रता शरीर, कपड़ों और मन की स्वच्छता है।",
        "यह इबादत की तैयारी और जीवन की सुंदरता है।",
        "पवित्रता हमें सफाई और जागरूकता सिखाती है।",
        "इससे इबादत में शांति और पूर्णता आती है।"
      ],

      cleanKicker: "पहला पाठ",
      cleanTitle: "पवित्रता और तैयारी",
      cleanIntro:
        "इबादत से पहले शरीर, कपड़े और नमाज़ की जगह साफ रखें।",
      cleanBodyTitle: "शरीर की पवित्रता",
      cleanBody:
        "शरीर को साफ रखें और नापाकी लगने पर उसे उचित तरीके से साफ करें।",
      cleanClothesTitle: "कपड़ों की पवित्रता",
      cleanClothes:
        "नमाज़ के लिए साफ कपड़े पहनें और उन पर लगी नापाकी दूर करें।",
      cleanPlaceTitle: "नमाज़ की जगह की पवित्रता",
      cleanPlace:
        "नमाज़ की जगह साफ रखें और वहाँ मौजूद नापाकी दूर करें।",

      wuduKicker: "दूसरा पाठ",
      wuduTitle: "वुज़ू करने का तरीका",
      wuduIntro:
        "नमाज़ से पहले आवश्यकता के अनुसार वुज़ू करें और हर अंग को ध्यान से धोएँ।",
      wuduNiyyahTitle: "वुज़ू की नीयत",
      wuduNiyyah:
        "वुज़ू की नीयत दिल में करें। नीयत मूल रूप से मन का इरादा है।",
      wuduStepsTitle: "वुज़ू के चरण",
      wuduNoteTitle: "याद रखें",
      wuduNote:
        "ध्यान रखें कि पानी आवश्यक अंगों तक पहुँचे। पानी बर्बाद न करें।",
      wuduBreaksTitle: "वुज़ू टूटने के कारण",
      wuduBreaks: [
        "पेशाब, शौच या हवा निकलना।",
        "गहरी नींद या ऐसी बेहोशी जिसमें होश न रहे।",
        "अन्य मामलों में अपने परंपरागत विश्वसनीय आलिम की सलाह लें।"
      ],
      wuduSteps: [
        {
          title: "दोनों हाथ धोना",
          text: "दोनों हाथों को कलाई तक अच्छी तरह धोएँ।"
        },
        {
          title: "कुल्ली करना",
          text: "मुँह में पानी लेकर अच्छी तरह कुल्ली करें।"
        },
        {
          title: "नाक साफ करना",
          text: "नाक में पानी लेकर उसे सावधानी से साफ करें।"
        },
        {
          title: "चेहरा धोना",
          text: "बालों की जड़ से ठोड़ी के नीचे तक और एक कान से दूसरे कान तक चेहरा धोएँ।"
        },
        {
          title: "दोनों बाँहें धोना",
          text: "पहले दाहिनी, फिर बाईं बाँह को कोहनियों सहित धोएँ।"
        },
        {
          title: "सिर का मसह करना",
          text: "गीले हाथों से सिर का मसह करें।"
        },
        {
          title: "कानों का मसह करना",
          text: "गीली उँगलियों से कानों के अंदर और बाहर का मसह करें।"
        },
        {
          title: "दोनों पैर धोना",
          text: "पहले दाहिना, फिर बायाँ पैर टखनों सहित अच्छी तरह धोएँ।"
        }
      ],

      ghuslKicker: "तीसरा पाठ",
      ghuslTitle: "ग़ुस्ल करने का तरीका",
      ghuslIntro:
        "जब फ़र्ज़ ग़ुस्ल आवश्यक हो, तो पूरे शरीर तक पानी पहुँचाना ज़रूरी है।",
      ghuslNiyyahTitle: "नीयत और तैयारी",
      ghuslNiyyah:
        "ग़ुस्ल की नीयत करें और शरीर पर लगी नापाकी पहले साफ करें।",
      ghuslStepsTitle: "ग़ुस्ल के मुख्य चरण",
      ghuslSteps: [
        {
          title: "हाथ और नापाक जगह साफ करना",
          text: "पहले हाथ धोएँ और शरीर पर लगी नापाकी दूर करें।"
        },
        {
          title: "वुज़ू करना",
          text: "नमाज़ के लिए किए जाने वाले वुज़ू की तरह वुज़ू करें।"
        },
        {
          title: "सिर धोना",
          text: "सिर और बालों की जड़ों तक पानी पहुँचाएँ।"
        },
        {
          title: "पूरा शरीर धोना",
          text: "शरीर के दाएँ और बाएँ हिस्से को धोएँ और कोई हिस्सा सूखा न रहने दें।"
        }
      ],
      ghuslNoteTitle: "विशेष ध्यान दें",
      ghuslNote:
        "त्वचा की सिलवटों, नाभि और उन जगहों तक पानी पहुँचाएँ जिन्हें धोना कठिन होता है।",

      tayammumKicker: "चौथा पाठ",
      tayammumTitle: "तयम्मुम करने का तरीका",
      tayammumIntro:
        "पानी उपलब्ध न होने या वैध रूप से इस्तेमाल न कर पाने की स्थिति में निर्धारित नियमों के अनुसार तयम्मुम किया जा सकता है।",
      tayammumStepsTitle: "तयम्मुम के चरण",
      tayammumSteps: [
        {
          title: "नीयत करना",
          text: "पवित्रता प्राप्त करने की नीयत दिल में करें।"
        },
        {
          title: "पाक मिट्टी या उपयुक्त सतह का उपयोग",
          text: "उपयुक्त पाक सतह का उपयोग करके दोनों हाथों से चेहरे का मसह करें।"
        },
        {
          title: "दोनों हाथों का मसह",
          text: "निर्धारित तरीके के अनुसार दोनों हाथों का मसह करें।"
        }
      ],
      tayammumNoteTitle: "याद रखें",
      tayammumNote:
        "तयम्मुम के कुछ विवरण फ़िक़्ही मतों के अनुसार अलग हो सकते हैं। अपने विश्वसनीय आलिम की सलाह लें।",

      guidanceKicker: "पाँचवाँ पाठ",
      guidanceTitle: "महत्वपूर्ण सावधानियाँ",
      guidanceIntro:
        "पवित्रता के नियम समझकर अमल करें। संदेह होने पर विश्वसनीय आलिम से पूछें।",
      guidanceCards: [
        {
          title: "वुज़ू टूट जाने पर",
          text: "नमाज़ से पहले आवश्यकता होने पर दोबारा वुज़ू करें।"
        },
        {
          title: "शरीर या कपड़ों पर नापाकी लगने पर",
          text: "नमाज़ से पहले प्रभावित जगह को अच्छी तरह साफ करें।"
        },
        {
          title: "फ़र्ज़ ग़ुस्ल आवश्यक होने पर",
          text: "नमाज़ से पहले इस्लामी नियमों के अनुसार ग़ुस्ल करें।"
        },
        {
          title: "पानी इस्तेमाल न कर पाने पर",
          text: "शर्तें पूरी होने पर तयम्मुम के नियमों का पालन करें।"
        },
        {
          title: "किसी बात में संदेह होने पर",
          text: "अनुमान लगाने के बजाय विश्वसनीय जानकारी प्राप्त करें।"
        }
      ],

      footerText: "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।",
      backToTop: "ऊपर जाएँ",
      imageAlt: "पवित्रता सीखने का चित्र",
      stepLabel: "चरण",
      languageNames: {
        bn: "বাংলা",
        en: "English",
        hi: "हिन्दी"
      }
    }
  };

  function readSettings() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
      );

      return saved && typeof saved === "object" ? saved : {};
    } catch (error) {
      return {};
    }
  }

  function getLanguage() {
    const settings = readSettings();
    const language = settings.lang || settings.language || "bn";

    return T[language] ? language : "bn";
  }

  function setText(id, value) {
    const element = document.getElementById(id);

    if (element && value !== undefined && value !== null) {
      element.textContent = value;
    }
  }

  function setParagraphs(id, values) {
    const element = document.getElementById(id);

    if (!element || !Array.isArray(values)) return;

    element.replaceChildren();

    values.forEach(function (value) {
      const paragraph = document.createElement("p");
      paragraph.textContent = value;
      element.appendChild(paragraph);
    });
  }

  function renderSimpleList(id, values) {
    const element = document.getElementById(id);

    if (!element || !Array.isArray(values)) return;

    element.replaceChildren();

    values.forEach(function (value) {
      const item = document.createElement("li");
      item.textContent = value;
      element.appendChild(item);
    });
  }

  function renderStepCards(id, steps, language) {
    const container = document.getElementById(id);

    if (!container || !Array.isArray(steps)) return;

    container.replaceChildren();

    steps.forEach(function (step, index) {
      const article = document.createElement("article");
      article.className = "step-card";

      const number = document.createElement("span");
      number.className = "step-number";
      number.textContent = String(index + 1);

      const content = document.createElement("div");
      content.className = "step-content";

      const title = document.createElement("h3");
      title.textContent = step.title;

      const description = document.createElement("p");
      description.textContent = step.text;

      content.append(title, description);
      article.append(number, content);
      container.appendChild(article);
    });
  }

  function renderGuidanceCards(cards) {
    const container = document.getElementById("guidanceCards");

    if (!container || !Array.isArray(cards)) return;

    container.replaceChildren();

    cards.forEach(function (card, index) {
      const article = document.createElement("article");
      article.className = "guidance-card";

      const number = document.createElement("span");
      number.className = "guidance-number";
      number.textContent = String(index + 1);

      const title = document.createElement("h3");
      title.textContent = card.title;

      const description = document.createElement("p");
      description.textContent = card.text;

      article.append(number, title, description);
      container.appendChild(article);
    });
  }

  function applyLanguage(language) {
    const content = T[language] || T.bn;
    document.documentElement.lang = language;

    const textIds = [
      "eyebrow",
      "pageTitle",
      "cleanKicker",
      "cleanTitle",
      "cleanIntro",
      "cleanBodyTitle",
      "cleanBody",
      "cleanClothesTitle",
      "cleanClothes",
      "cleanPlaceTitle",
      "cleanPlace",
      "wuduKicker",
      "wuduTitle",
      "wuduIntro",
      "wuduNiyyahTitle",
      "wuduNiyyah",
      "wuduStepsTitle",
      "wuduNoteTitle",
      "wuduNote",
      "wuduBreaksTitle",
      "ghuslKicker",
      "ghuslTitle",
      "ghuslIntro",
      "ghuslNiyyahTitle",
      "ghuslNiyyah",
      "ghuslStepsTitle",
      "ghuslNoteTitle",
      "ghuslNote",
      "tayammumKicker",
      "tayammumTitle",
      "tayammumIntro",
      "tayammumStepsTitle",
      "tayammumNoteTitle",
      "tayammumNote",
      "guidanceKicker",
      "guidanceTitle",
      "guidanceIntro",
      "footerText"
    ];

    textIds.forEach(function (id) {
      if (Object.prototype.hasOwnProperty.call(content, id)) {
        setText(id, content[id]);
      }
    });

    setParagraphs("heroDescription", content.heroDescription);

    renderSimpleList("wuduBreaksList", content.wuduBreaks);

    renderStepCards(
      "wuduStepList",
      content.wuduSteps,
      language
    );

    renderStepCards(
      "ghuslStepList",
      content.ghuslSteps,
      language
    );

    renderStepCards(
      "tayammumStepList",
      content.tayammumSteps,
      language
    );

    renderGuidanceCards(content.guidanceCards);

    const sectionHeadings = [
      ["cleanliness", content.cleanTitle],
      ["wudu", content.wuduTitle],
      ["ghusl", content.ghuslTitle],
      ["tayammum", content.tayammumTitle],
      ["purityRules", content.guidanceTitle]
    ];

    sectionHeadings.forEach(function (item) {
      const section = document.getElementById(item[0]);

      if (section) {
        section.setAttribute("aria-label", item[1]);
      }
    });

    document.querySelectorAll("[data-back-to-top]").forEach(function (button) {
      button.textContent = content.backToTop;
    });

    document.querySelectorAll(".purity-image").forEach(function (image) {
      image.alt = content.imageAlt;
    });

    document.querySelectorAll("[data-language]").forEach(function (button) {
      const buttonLanguage = button.getAttribute("data-language");

      button.classList.toggle(
        "active",
        buttonLanguage === language
      );

      button.setAttribute(
        "aria-pressed",
        String(buttonLanguage === language)
      );
    });
  }

  function applyTheme() {
    const settings = readSettings();

    const darkEnabled =
      settings.dark === true ||
      settings.dark === "true" ||
      settings.theme === "dark";

    document.body.classList.toggle("dark-mode", darkEnabled);
    document.documentElement.classList.toggle("dark-mode", darkEnabled);
  }

  function refreshSettings() {
    applyTheme();
    applyLanguage(getLanguage());
  }

  function init() {
    refreshSettings();

    document.querySelectorAll("[data-language]").forEach(function (button) {
      button.addEventListener("click", function () {
        const language = button.getAttribute("data-language");

        if (!T[language]) return;

        try {
          const settings = readSettings();
          settings.lang = language;

          localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(settings)
          );
        } catch (error) {
          // ভাষা বদলানো localStorage ছাড়াও কাজ করবে।
        }

        applyLanguage(language);
      });
    });

    document.querySelectorAll("[data-back-to-top]").forEach(function (button) {
      button.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    });

    window.addEventListener("storage", function (event) {
      if (!event.key || event.key === SETTINGS_KEY) {
        refreshSettings();
      }
    });

    window.addEventListener("appSettingsChanged", refreshSettings);

    document.querySelectorAll("img").forEach(function (image) {
      image.addEventListener("error", function () {
        image.classList.add("image-error");
      });

      image.addEventListener("load", function () {
        image.classList.remove("image-error");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(); 
