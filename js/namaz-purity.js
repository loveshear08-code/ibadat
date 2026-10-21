
/* =========================================================
   IBADAT — NAMAZ PURITY
   File: js/namaz-purity.js

   HTML:
   ../pages/namaz-purity.html (or your selected page path)

   Images:
   ../assets/images/

   Backgrounds:
   ../assets/main-bg.jpg
   ../assets/hero-bg.jpg
   ========================================================= */

"use strict";

(() => {
  /* ---------- 1. CONFIGURATION ---------- */

  const ASSET_IMAGES = "../assets/images/";

  const FOOTER_TEXT = {
    bn: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
    en: "Maintain purity and find peace in worship.",
    hi: "पवित्रता बनाए रखें और इबादत में सुकून पाएं।"
  };

  const TRANSLATIONS = {
    bn: {
      pageTitle: "পাক-পবিত্রতা",
      pageIntro: "শুদ্ধতা, পরিচ্ছন্নতা ও ইবাদতের প্রস্তুতি",
      detailSubtitle: "সহজভাবে শিখুন, নিয়মিত আমল করুন",
      footer: FOOTER_TEXT.bn,
      backToLessons: "বিষয়সমূহ",
      remember: "মনে রাখুন",
      introduction: "পরিচিতি",
      steps: "ধাপে ধাপে শিখুন",
      source: "তথ্যসূত্র",
      cards: [
        "ওযু",
        "গোসল",
        "তায়াম্মুম",
        "শরীরের পবিত্রতা",
        "পোশাকের পবিত্রতা",
        "নামাজের স্থানের পবিত্রতা",
        "নাপাকি দূর করার নিয়ম",
        "হায়েজ ও নিফাস"
      ]
    },

    en: {
      pageTitle: "Purification",
      pageIntro: "Cleanliness, purity, and preparation for worship",
      detailSubtitle: "Learn the essentials and practise regularly",
      footer: FOOTER_TEXT.en,
      backToLessons: "Topics",
      remember: "Remember",
      introduction: "Introduction",
      steps: "Learn step by step",
      source: "References",
      cards: [
        "Wudu",
        "Ghusl",
        "Tayammum",
        "Body Purity",
        "Clothing Purity",
        "Prayer Place Purity",
        "Removing Impurity",
        "Hayez and Nifas"
      ]
    },

    hi: {
      pageTitle: "पाक-सफाई",
      pageIntro: "स्वच्छता, पवित्रता और इबादत की तैयारी",
      detailSubtitle: "आसान तरीके से सीखें और अमल करें",
      footer: FOOTER_TEXT.hi,
      backToLessons: "विषय",
      remember: "याद रखें",
      introduction: "परिचय",
      steps: "चरण-दर-चरण सीखें",
      source: "संदर्भ",
      cards: [
        "वुज़ू",
        "ग़ुस्ल",
        "तयम्मुम",
        "शरीर की पवित्रता",
        "कपड़ों की पवित्रता",
        "नमाज़ की जगह की पवित्रता",
        "नापाकी दूर करना",
        "हैज़ और निफ़ास"
      ]
    }
  };

  /* ---------- 2. LESSON DATA ---------- */

  const LESSONS = [
    {
      id: "wudu",
      image: "wudu.png",
      title: {
        bn: "ওযু",
        en: "Wudu",
        hi: "वुज़ू"
      },
      intro: {
        bn: "ওযু হলো নির্দিষ্ট অঙ্গগুলো শরিয়তসম্মতভাবে ধোয়া ও মাসেহ করার মাধ্যমে নামাজের প্রস্তুতি নেওয়া। ওযু করার আগে নিয়ত করা এবং পরিষ্কার পানি ব্যবহার করা উচিত।",
        en: "Wudu is the prescribed washing and wiping of particular body parts in preparation for prayer. Begin with the intention and use clean water.",
        hi: "वुज़ू नमाज़ की तैयारी के लिए शरीर के निर्धारित अंगों को धोने और मसह करने की प्रक्रिया है। साफ़ पानी का उपयोग करें।"
      },
      steps: [
        {
          image: "wudu-hands.png",
          title: {
            bn: "১. দুই হাত ধোয়া",
            en: "1. Wash both hands",
            hi: "१. दोनों हाथ धोएँ"
          },
          text: {
            bn: "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নিন। আঙুলের ফাঁকেও পানি পৌঁছানোর চেষ্টা করুন।",
            en: "Wash both hands up to the wrists, paying attention to the spaces between the fingers.",
            hi: "दोनों हाथों को कलाई तक धोएँ और उँगलियों के बीच भी पानी पहुँचाएँ।"
          }
        },
        {
          image: "wudu-mouth.png",
          title: {
            bn: "২. কুলি করা",
            en: "2. Rinse the mouth",
            hi: "२. कुल्ली करें"
          },
          text: {
            bn: "ডান হাতে পানি নিয়ে মুখে দিয়ে কুলি করুন। রোজা থাকলে পানি গলায় চলে যাওয়া থেকে সতর্ক থাকুন।",
            en: "Take water into the mouth and rinse. If fasting, take care not to swallow water.",
            hi: "मुँह में पानी लेकर कुल्ली करें। रोज़े की हालत में पानी निगलने से सावधान रहें।"
          }
        },
        {
          image: "wudu-nose.png",
          title: {
            bn: "৩. নাকে পানি দেওয়া",
            en: "3. Rinse the nose",
            hi: "३. नाक में पानी डालें"
          },
          text: {
            bn: "নাকে পানি নিয়ে পরিষ্কার করুন এবং পানি বের করে দিন। রোজা থাকলে অতিরিক্ত পানি টেনে নেওয়া থেকে বিরত থাকুন।",
            en: "Draw water gently into the nose and expel it. Be cautious while fasting.",
            hi: "नाक में हल्का पानी डालकर साफ़ करें और पानी निकाल दें। रोज़े में सावधानी रखें।"
          }
        },
        {
          image: "wudu-face.png",
          title: {
            bn: "৪. মুখ ধোয়া",
            en: "4. Wash the face",
            hi: "४. चेहरा धोएँ"
          },
          text: {
            bn: "কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং এক কানের পাশ থেকে অন্য কানের পাশ পর্যন্ত পুরো মুখ ধুয়ে নিন।",
            en: "Wash the entire face from the hairline to the chin and from one side of the face to the other.",
            hi: "बालों की शुरुआत से ठोड़ी तक और चेहरे के एक किनारे से दूसरे किनारे तक पूरा चेहरा धोएँ।"
          }
        },
        {
          image: "wudu-arms.png",
          title: {
            bn: "৫. দুই হাত কনুইসহ ধোয়া",
            en: "5. Wash the arms including elbows",
            hi: "५. कोहनियों सहित हाथ धोएँ"
          },
          text: {
            bn: "প্রথমে ডান হাত, তারপর বাম হাত কনুইসহ ধুয়ে নিন। কোনো অংশ শুকনো যেন না থাকে।",
            en: "Wash the right arm and then the left, including the elbows. Ensure water reaches every required area.",
            hi: "पहले दायाँ और फिर बायाँ हाथ कोहनी सहित धोएँ। कोई आवश्यक हिस्सा सूखा न रहे।"
          }
        },
        {
          image: "wudu-head.png",
          title: {
            bn: "৬. মাথা মাসেহ করা",
            en: "6. Wipe the head",
            hi: "६. सिर का मसह करें"
          },
          text: {
            bn: "ভেজা হাত দিয়ে মাথা মাসেহ করুন। মাসেহের নির্দিষ্ট পদ্ধতি মাজহাবভেদে ব্যাখ্যায় কিছু পার্থক্য থাকতে পারে।",
            en: "Wipe the head with wet hands. Details of the required extent may differ between schools of Islamic jurisprudence.",
            hi: "गीले हाथों से सिर का मसह करें। आवश्यक हिस्से के बारे में फ़िक़्ही मतों में कुछ अंतर हो सकता है।"
          }
        },
        {
          image: "wudu-ears.png",
          title: {
            bn: "৭. কান মাসেহ করা",
            en: "7. Wipe the ears",
            hi: "७. कानों का मसह करें"
          },
          text: {
            bn: "ওযুর শেখানো পদ্ধতি অনুযায়ী ভেজা আঙুল দিয়ে কানের ভেতরের দৃশ্যমান অংশ ও বাইরের অংশ মাসেহ করুন।",
            en: "Following the taught method of wudu, wipe the accessible inner and outer parts of the ears with wet fingers.",
            hi: "वुज़ू के सिखाए गए तरीके के अनुसार गीली उँगलियों से कान के अंदर के दिखाई देने वाले और बाहरी हिस्से का मसह करें।"
          }
        },
        {
          image: "wudu-feet.png",
          title: {
            bn: "৮. দুই পা টাখনুসহ ধোয়া",
            en: "8. Wash the feet including ankles",
            hi: "८. टखनों सहित पैर धोएँ"
          },
          text: {
            bn: "প্রথমে ডান পা, তারপর বাম পা টাখনুসহ ধুয়ে নিন। পায়ের আঙুলের ফাঁকেও পানি পৌঁছাতে খেয়াল করুন।",
            en: "Wash the right foot and then the left, including the ankles. Pay attention to the spaces between the toes.",
            hi: "पहले दायाँ और फिर बायाँ पैर टखनों सहित धोएँ। पैर की उँगलियों के बीच भी पानी पहुँचाएँ।"
          }
        }
      ],
      reminder: {
        bn: [
          "ওযুর অঙ্গগুলো যথাযথভাবে ধোয়া জরুরি।",
          "পানি অপচয় করবেন না।",
          "ওযুতে কোনো অঙ্গ বাদ পড়লে আপনার অনুসৃত মাজহাব অনুযায়ী করণীয় জেনে নিন।"
        ],
        en: [
          "Wash the required parts of wudu properly.",
          "Avoid wasting water.",
          "If a required part is missed, follow the guidance of your school of Islamic jurisprudence."
        ],
        hi: [
          "वुज़ू के आवश्यक अंगों को ठीक से धोएँ।",
          "पानी बर्बाद न करें।",
          "यदि कोई आवश्यक हिस्सा छूट जाए, तो अपने फ़िक़्ही मत के अनुसार मार्गदर्शन लें।"
        ]
      },
      reference: {
        bn: "ওযুর বিধান: কুরআন, সূরা আল-মায়িদা ৫:৬।",
        en: "Wudu is described in the Qur'an, Surah Al-Ma'idah 5:6.",
        hi: "वुज़ू का उल्लेख क़ुरआन, सूरह अल-माइदा 5:6 में है।"
      }
    },

    {
      id: "ghusl",
      image: "ghusl.png",
      title: {
        bn: "গোসল",
        en: "Ghusl",
        hi: "ग़ुस्ल"
      },
      intro: {
        bn: "গোসলের মাধ্যমে পুরো শরীরে পানি পৌঁছে পবিত্রতা অর্জন করা হয়। ফরজ গোসলের কারণ, নিয়ম ও বিস্তারিত শর্ত সম্পর্কে নির্ভরযোগ্য আলেমের কাছ থেকে শিক্ষা নেওয়া ভালো।",
        en: "Ghusl is the ritual washing of the whole body. Learn when it becomes obligatory and its detailed requirements from reliable Islamic scholarship.",
        hi: "ग़ुस्ल पूरे शरीर को धोकर पाकी हासिल करने की प्रक्रिया है। इसके अनिवार्य होने की स्थितियों और नियमों के बारे में विश्वसनीय विद्वान से सीखें।"
      },
      steps: [
        {
          image: null,
          title: {
            bn: "১. নিয়ত করা",
            en: "1. Make the intention",
            hi: "१. नियत करें"
          },
          text: {
            bn: "পবিত্রতা অর্জনের উদ্দেশ্যে মনে মনে নিয়ত করুন। নিয়ত মুখে উচ্চারণ করা আবশ্যক—এমন নয়।",
            en: "Intend in your heart to attain ritual purity. Verbalising the intention is not universally required.",
            hi: "पाकी हासिल करने की नियत दिल में करें। नियत को ज़ुबान से कहना हर मत में आवश्यक नहीं है।"
          }
        },
        {
          image: null,
          title: {
            bn: "২. শরীরের নাপাকি দূর করা",
            en: "2. Remove physical impurity",
            hi: "२. शरीर की नापाकी दूर करें"
          },
          text: {
            bn: "শরীরে দৃশ্যমান নাপাকি থাকলে তা পরিষ্কার করে নিন।",
            en: "If there is visible impurity on the body, wash it away.",
            hi: "शरीर पर दिखाई देने वाली नापाकी हो तो उसे साफ़ करें।"
          }
        },
        {
          image: null,
          title: {
            bn: "৩. প্রয়োজনমতো ওযু করা",
            en: "3. Perform wudu as appropriate",
            hi: "३. आवश्यकता के अनुसार वुज़ू करें"
          },
          text: {
            bn: "গোসলের শেখানো পদ্ধতি অনুযায়ী ওযু করুন। গোসলের পদ্ধতিতে মাজহাবভেদে কিছু বিস্তারিত পার্থক্য থাকতে পারে।",
            en: "Perform wudu as taught in the prescribed method of ghusl. Some details differ among schools of jurisprudence.",
            hi: "ग़ुस्ल के सिखाए गए तरीके के अनुसार वुज़ू करें। फ़िक़्ही मतों में कुछ विवरण अलग हो सकते हैं।"
          }
        },
        {
          image: null,
          title: {
            bn: "৪. পুরো শরীরে পানি পৌঁছানো",
            en: "4. Wash the whole body",
            hi: "४. पूरे शरीर पर पानी पहुँचाएँ"
          },
          text: {
            bn: "মাথা ও চুলসহ পুরো শরীরে পানি পৌঁছান। শরীরের ভাঁজ ও এমন স্থানগুলো খেয়াল করুন যেখানে পানি পৌঁছানো কঠিন হতে পারে।",
            en: "Ensure water reaches the entire body, including the head and hair, paying attention to areas that are easy to miss.",
            hi: "सिर और बालों सहित पूरे शरीर पर पानी पहुँचाएँ। उन जगहों पर ध्यान दें जहाँ पानी पहुँचाना कठिन हो सकता है।"
          }
        },
        {
          image: null,
          title: {
            bn: "৫. গোসল শেষে পরিচ্ছন্ন থাকা",
            en: "5. Maintain cleanliness afterwards",
            hi: "५. ग़ुस्ल के बाद सफ़ाई बनाए रखें"
          },
          text: {
            bn: "গোসল শেষে শরীর ও পোশাক পরিচ্ছন্ন রাখুন। গোসলের পর ওযু ভঙ্গের কোনো কারণ ঘটেছে কি না, সে অনুযায়ী নামাজের প্রস্তুতি নিন।",
            en: "Keep the body and clothing clean after ghusl. Prepare for prayer according to whether anything that invalidates wudu has occurred.",
            hi: "ग़ुस्ल के बाद शरीर और कपड़े साफ़ रखें। वुज़ू टूटने की कोई स्थिति हुई है या नहीं, उसके अनुसार नमाज़ की तैयारी करें।"
          }
        }
      ],
      reminder: {
        bn: [
          "ফরজ গোসলে শরীরের কোনো অংশ শুকনো থাকা চলবে না।",
          "পানি পৌঁছাতে বাধা দেয় এমন বস্তু সরিয়ে ফেলুন।",
          "বিশেষ পরিস্থিতিতে নিজের মাজহাবের নির্ভরযোগ্য বিধান জেনে নিন।"
        ],
        en: [
          "In obligatory ghusl, ensure water reaches all required areas.",
          "Remove anything that prevents water from reaching the skin.",
          "For special circumstances, consult reliable guidance from your school of jurisprudence."
        ],
        hi: [
          "फ़र्ज़ ग़ुस्ल में सभी आवश्यक हिस्सों तक पानी पहुँचना चाहिए।",
          "पानी पहुँचने में रुकावट डालने वाली चीज़ें हटा दें।",
          "विशेष परिस्थितियों में अपने फ़िक़्ही मत के विश्वसनीय मार्गदर्शन से सलाह लें।"
        ]
      },
      reference: {
        bn: "পবিত্রতা ও গোসলের বিধান সম্পর্কে নির্ভরযোগ্য ফিকহি নির্দেশনা অনুসরণ করুন।",
        en: "Follow reliable Islamic jurisprudence for detailed rulings on ritual bathing.",
        hi: "पाकी और ग़ुस्ल के विस्तृत नियमों के लिए विश्वसनीय फ़िक़्ही मार्गदर्शन लें।"
      }
    },

    {
      id: "tayammum",
      image: "tayammum.png",
      title: {
        bn: "তায়াম্মুম",
        en: "Tayammum",
        hi: "तयम्मुम"
      },
      intro: {
        bn: "শরিয়তে নির্ধারিত পরিস্থিতিতে পানি না পাওয়া বা পানি ব্যবহার করতে অক্ষম হলে পবিত্র মাটি বা উপযুক্ত মাটিজাতীয় উপাদান দিয়ে তায়াম্মুম করা হয়। এর শর্তগুলো জেনে নেওয়া জরুরি।",
        en: "Tayammum is a prescribed dry purification using suitable earth when its conditions are met, such as when water is unavailable or cannot be used.",
        hi: "पानी न मिलने या उसके उपयोग में असमर्थता जैसी निर्धारित परिस्थितियों में उपयुक्त मिट्टी से तयम्मुम किया जाता है।"
      },
      steps: [
        {
          image: "tayammum-hands.png",
          title: {
            bn: "১. নিয়ত করা ও হাত মাটিতে স্পর্শ করানো",
            en: "1. Intend and touch suitable earth",
            hi: "१. नियत करें और मिट्टी को छुएँ"
          },
          text: {
            bn: "তায়াম্মুমের নিয়ত করুন। এরপর শরিয়তসম্মত উপযুক্ত পরিষ্কার মাটিজাতীয় পৃষ্ঠে হাত স্পর্শ করান। নির্দিষ্ট পদ্ধতি মাজহাব অনুযায়ী শিখুন।",
            en: "Make the intention and touch a suitable clean earth-based surface. Learn the precise method according to your school of jurisprudence.",
            hi: "नियत करें और उपयुक्त साफ़ मिट्टी वाली सतह को हाथ से छुएँ। सही तरीका अपने फ़िक़्ही मत के अनुसार सीखें।"
          }
        },
        {
          image: "tayammum-face.png",
          title: {
            bn: "২. মুখ মাসেহ করা",
            en: "2. Wipe the face",
            hi: "२. चेहरे का मसह करें"
          },
          text: {
            bn: "শেখানো পদ্ধতি অনুযায়ী হাত দিয়ে মুখ মাসেহ করুন। মাসেহের বিস্তারিত নিয়ম মাজহাবভেদে ভিন্ন হতে পারে।",
            en: "Wipe the face with the hands according to the prescribed method. Details may differ between schools.",
            hi: "निर्धारित तरीके के अनुसार हाथों से चेहरे का मसह करें। विवरण फ़िक़्ही मत के अनुसार अलग हो सकते हैं।"
          }
        },
        {
          image: "tayammum-arms.png",
          title: {
            bn: "৩. হাত মাসেহ করা",
            en: "3. Wipe the hands",
            hi: "३. हाथों का मसह करें"
          },
          text: {
            bn: "শরিয়তসম্মত পদ্ধতি অনুযায়ী হাত মাসেহ করুন। কোন সীমা পর্যন্ত মাসেহ করতে হবে, তা নিজের অনুসৃত মাজহাব অনুযায়ী জেনে নিন।",
            en: "Wipe the hands according to the prescribed method. Learn the required extent from your school of jurisprudence.",
            hi: "निर्धारित तरीके से हाथों का मसह करें। कितनी सीमा तक मसह करना है, यह अपने फ़िक़्ही मत के अनुसार सीखें।"
          }
        }
      ],
      reminder: {
        bn: [
          "তায়াম্মুম করার বৈধ কারণ থাকতে হবে।",
          "পানি ব্যবহার করা সম্ভব হলে সাধারণ নিয়ম অনুযায়ী পবিত্রতা অর্জন করুন।",
          "কোন বস্তু দিয়ে তায়াম্মুম করা যাবে, সে বিষয়ে মাজহাবভিত্তিক নির্দেশনা জেনে নিন।"
        ],
        en: [
          "A valid reason for tayammum must exist.",
          "When water can be used, follow the normal purification requirements.",
          "Learn which materials are valid for tayammum according to your school of jurisprudence."
        ],
        hi: [
          "तयम्मुम के लिए वैध कारण होना चाहिए।",
          "पानी का उपयोग संभव हो तो सामान्य पाकी के नियम अपनाएँ।",
          "तयम्मुम के लिए मान्य सामग्री के बारे में अपने फ़िक़्ही मत से सीखें।"
        ]
      },
      reference: {
        bn: "তায়াম্মুমের বিধান: কুরআন, সূরা আল-মায়িদা ৫:৬।",
        en: "Tayammum is described in the Qur'an, Surah Al-Ma'idah 5:6.",
        hi: "तयम्मुम का उल्लेख क़ुरआन, सूरह अल-माइदा 5:6 में है।"
      }
    },

    {
      id: "body-purity",
      image: "body-purity.png",
      title: {
        bn: "শরীরের পবিত্রতা",
        en: "Body Purity",
        hi: "शरीर की पवित्रता"
      },
      intro: {
        bn: "নামাজের জন্য শরীরের পবিত্রতা গুরুত্বপূর্ণ। শরীরে কোনো নাপাকি লাগলে শরিয়তসম্মতভাবে তা পরিষ্কার করতে হয়।",
        en: "Physical purity is important for prayer. If impurity gets on the body, it should be removed according to Islamic guidance.",
        hi: "नमाज़ के लिए शरीर की पवित्रता महत्वपूर्ण है। शरीर पर नापाकी लगने पर उसे इस्लामी नियमों के अनुसार साफ़ करें।"
      },
      steps: [],
      reminder: {
        bn: [
          "শরীর পরিষ্কার রাখুন।",
          "নাপাকি লাগলে তা দূর করুন।",
          "সন্দেহ ও নিশ্চিত নাপাকির মধ্যে পার্থক্য বুঝুন।"
        ],
        en: [
          "Keep the body clean.",
          "Remove known impurity.",
          "Distinguish certainty from mere doubt."
        ],
        hi: [
          "शरीर साफ़ रखें।",
          "नापाकी लगने पर उसे दूर करें।",
          "सिर्फ़ शक और निश्चित नापाकी में अंतर समझें।"
        ]
      },
      reference: {
        bn: "পবিত্রতা সংক্রান্ত বিস্তারিত বিধানের জন্য নির্ভরযোগ্য আলেমের পরামর্শ নিন।",
        en: "Consult reliable Islamic scholarship for detailed rulings on purity.",
        hi: "पवित्रता के विस्तृत नियमों के लिए विश्वसनीय विद्वान से सलाह लें।"
      }
    },

    {
      id: "clothing-purity",
      image: "clothing-purity.png",
      title: {
        bn: "পোশাকের পবিত্রতা",
        en: "Clothing Purity",
        hi: "कपड़ों की पवित्रता"
      },
      intro: {
        bn: "নামাজের পোশাক পরিচ্ছন্ন হওয়া এবং শরিয়তের শর্ত পূরণ করা জরুরি। পোশাকে নাপাকি লাগলে প্রযোজ্য নিয়মে পরিষ্কার করুন।",
        en: "Prayer clothing should be clean and meet the relevant requirements. If impurity gets on it, clean it according to Islamic guidance.",
        hi: "नमाज़ के कपड़े साफ़ होने चाहिए और आवश्यक शर्तें पूरी करनी चाहिए। नापाकी लगने पर उन्हें नियमानुसार साफ़ करें।"
      },
      steps: [],
      reminder: {
        bn: [
          "নামাজের আগে পোশাক পরীক্ষা করুন।",
          "নাপাকি থাকলে প্রযোজ্য নিয়মে দূর করুন।",
          "অপ্রয়োজনীয় সন্দেহে পড়বেন না।"
        ],
        en: [
          "Check clothing before prayer.",
          "Remove impurity according to the applicable rules.",
          "Avoid unnecessary doubts."
        ],
        hi: [
          "नमाज़ से पहले कपड़े जाँच लें।",
          "नापाकी को लागू नियमों के अनुसार दूर करें।",
          "अनावश्यक शक में न पड़ें।"
        ]
      },
      reference: {
        bn: "পোশাকের পবিত্রতা সম্পর্কে নিজের অনুসৃত মাজহাবের নির্ভরযোগ্য বিধান অনুসরণ করুন।",
        en: "Follow reliable guidance from your school of jurisprudence on clothing purity.",
        hi: "कपड़ों की पवित्रता के लिए अपने फ़िक़्ही मत का विश्वसनीय मार्गदर्शन अपनाएँ।"
      }
    },

    {
      id: "place-purity",
      image: "place-purity.png",
      title: {
        bn: "নামাজের স্থানের পবিত্রতা",
        en: "Prayer Place Purity",
        hi: "नमाज़ की जगह की पवित्रता"
      },
      intro: {
        bn: "নামাজ আদায়ের স্থান পবিত্র হওয়া জরুরি। নামাজের জায়গায় নাপাকি থাকলে তা দূর করে পরিষ্কার স্থানে নামাজ আদায় করুন।",
        en: "The place of prayer must meet the requirements of purity. Remove known impurity and pray in a suitable clean place.",
        hi: "नमाज़ की जगह का पाक होना आवश्यक है। ज्ञात नापाकी को दूर करके साफ़ जगह पर नमाज़ पढ़ें।"
      },
      steps: [],
      reminder: {
        bn: [
          "নামাজের স্থান পরিষ্কার রাখুন।",
          "নাপাকি নিশ্চিত হলে তা দূর করুন।",
          "শুধু সন্দেহের কারণে কোনো স্থানকে নাপাক ধরে নেবেন না।"
        ],
        en: [
          "Keep the prayer area clean.",
          "Remove impurity when its presence is established.",
          "Do not assume a place is impure based only on doubt."
        ],
        hi: [
          "नमाज़ की जगह साफ़ रखें।",
          "नापाकी निश्चित हो तो उसे दूर करें।",
          "केवल शक के आधार पर किसी जगह को नापाक न मानें।"
        ]
      },
      reference: {
        bn: "নামাজের স্থান ও পবিত্রতা সম্পর্কে নির্ভরযোগ্য ফিকহি নির্দেশনা অনুসরণ করুন।",
        en: "Follow reliable Islamic jurisprudence regarding the purity of the prayer place.",
        hi: "नमाज़ की जगह की पवित्रता के बारे में विश्वसनीय फ़िक़्ही मार्गदर्शन अपनाएँ।"
      }
    },

    {
      id: "impurity-removal",
      image: "impurity-removal.png",
      title: {
        bn: "নাপাকি দূর করার নিয়ম",
        en: "Removing Impurity",
        hi: "नापाकी दूर करने का तरीका"
      },
      intro: {
        bn: "কোনো স্থানে নাপাকি লাগলে নাপাকির ধরন এবং সংশ্লিষ্ট বিধান অনুযায়ী তা দূর করতে হয়। সাধারণভাবে উপযুক্ত পানি দিয়ে পরিষ্কার করা হয়।",
        en: "Impurity should be removed according to its type and the applicable rules. Water is commonly used where prescribed.",
        hi: "नापाकी को उसकी प्रकृति और लागू नियमों के अनुसार दूर किया जाता है। जहाँ निर्धारित हो, वहाँ पानी से सफ़ाई की जाती है।"
      },
      steps: [],
      reminder: {
        bn: [
          "নাপাকির ধরন অনুযায়ী বিধান শিখুন।",
          "যেখানে প্রযোজ্য, পানি দিয়ে পরিষ্কার করুন।",
          "পরিষ্কার হওয়ার পর অযথা সন্দেহ করবেন না।"
        ],
        en: [
          "Learn the rules for the type of impurity involved.",
          "Use water where required by the applicable rules.",
          "Avoid repeated doubts after proper cleaning."
        ],
        hi: [
          "नापाकी के प्रकार के अनुसार नियम सीखें।",
          "जहाँ आवश्यक हो, पानी से साफ़ करें।",
          "सही सफ़ाई के बाद बार-बार शक न करें।"
        ]
      },
      reference: {
        bn: "বিভিন্ন ধরনের নাপাকির বিধান মাজহাবভেদে বিস্তারিতভাবে আলোচনা করা হয়েছে।",
        en: "Detailed rulings on different kinds of impurity are discussed in Islamic jurisprudence.",
        hi: "विभिन्न प्रकार की नापाकी के विस्तृत नियम इस्लामी फ़िक़्ह में वर्णित हैं।"
      }
    },

    {
      id: "hayez-nifas",
      image: "hayez-nifas.png",
      title: {
        bn: "হায়েজ ও নিফাস",
        en: "Hayez and Nifas",
        hi: "हैज़ और निफ़ास"
      },
      intro: {
        bn: "হায়েজ হলো নারীদের মাসিক ঋতুস্রাব এবং নিফাস হলো সন্তান প্রসবের পরের রক্তস্রাব। এ সময়ের ইবাদত, পবিত্রতা ও গোসলের বিধান বিস্তারিতভাবে জেনে নেওয়া জরুরি।",
        en: "Hayez refers to menstruation and nifas to postnatal bleeding. Learn the relevant rulings on worship, purity, and ghusl from reliable scholarship.",
        hi: "हैज़ मासिक धर्म और निफ़ास प्रसव के बाद होने वाले रक्तस्राव को कहते हैं। इबादत, पाकी और ग़ुस्ल के नियम विश्वसनीय विद्वान से सीखें।"
      },
      steps: [],
      reminder: {
        bn: [
          "হায়েজ ও নিফাসের বিধান ব্যক্তির পরিস্থিতি অনুযায়ী প্রযোজ্য হতে পারে।",
          "রক্তস্রাবের সময়সীমা ও বিশেষ পরিস্থিতির বিধান নির্ভরযোগ্য আলেমের কাছ থেকে জানুন।",
          "পবিত্রতা ফিরে এলে প্রযোজ্য বিধান অনুযায়ী গোসল ও ইবাদত শুরু করুন।"
        ],
        en: [
          "Relevant rulings depend on the person's circumstances.",
          "Ask reliable scholars about duration and special circumstances.",
          "When purity returns, follow the applicable rulings on ghusl and worship."
        ],
        hi: [
          "लागू नियम व्यक्ति की परिस्थिति पर निर्भर करते हैं।",
          "अवधि और विशेष परिस्थितियों के बारे में विश्वसनीय विद्वान से पूछें।",
          "पाकी लौटने पर लागू नियमों के अनुसार ग़ुस्ल और इबादत करें।"
        ]
      },
      reference: {
        bn: "হায়েজ ও নিফাসের বিধান বিস্তারিত ও পরিস্থিতিনির্ভর; নির্ভরযোগ্য আলেমের পরামর্শ নিন।",
        en: "Rulings on menstruation and postnatal bleeding are detailed and situation-dependent; consult reliable scholarship.",
        hi: "हैज़ और निफ़ास के नियम विस्तृत और परिस्थिति पर निर्भर हैं; विश्वसनीय विद्वान से सलाह लें।"
      }
    }
  ];

  /* ---------- 3. DOM REFERENCES ---------- */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const homeView = $("#purityHome");
  const detailView = $("#detailView");
  const learningGrid = $("#learningGrid");

  const pageTitle = $("#pageTitle");
  const pageIntro = $("#pageIntro");
  const footerText = $("#footerText");

  const detailTitle = $("#detailTitle");
  const detailSubtitle = $("#detailSubtitle");
  const detailContent = $("#detailContent");
  const detailScroll = $("#detailScroll");
  const detailFooterText = $("#detailFooterText");

  if (
    !homeView ||
    !detailView ||
    !learningGrid ||
    !detailTitle ||
    !detailContent ||
    !detailScroll
  ) {
    console.error(
      "IBADAT Purity: required HTML elements are missing. Check namaz-purity.html IDs."
    );
    return;
  }

  /* ---------- 4. STATE ---------- */

  let currentLanguage = "bn";
  let currentLessonId = null;

  /* ---------- 5. SAFE TEXT HELPERS ---------- */

  function getText(value, language = currentLanguage) {
    if (value == null) return "";

    if (typeof value === "string") return value;

    return (
      value[language] ??
      value.bn ??
      value.en ??
      value.hi ??
      ""
    );
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined && text !== null) {
      element.textContent = text;
    }

    return element;
  }

  function makeImage(filename, alt, className = "lesson-image") {
    if (!filename) return null;

    const image = document.createElement("img");

    image.className = className;
    image.src = ASSET_IMAGES + filename;
    image.alt = alt || "";
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", () => {
      image.hidden = true;
      console.warn("IBADAT: image not found:", image.src);
    });

    return image;
  }

  function makeParagraph(text, className = "") {
    const paragraph = createElement("p", className, text);
    return paragraph;
  }

  function makeHeading(level, text) {
    return createElement(`h${level}`, "", text);
  }

  /* ---------- 6. CREATE HOME CARDS ---------- */

  function renderCards() {
    learningGrid.replaceChildren();

    LESSONS.forEach((lesson) => {
      const card = document.createElement("button");

      card.type = "button";
      card.className = "purity-card";
      card.dataset.lessonId = lesson.id;
      card.setAttribute(
        "aria-label",
        getText(lesson.title)
      );

      const image = document.createElement("img");

      image.src = ASSET_IMAGES + lesson.image;
      image.alt = getText(lesson.title);
      image.loading = "lazy";
      image.decoding = "async";

      image.addEventListener("error", () => {
        image.hidden = true;
        console.warn("IBADAT: card image not found:", image.src);
      });

      const title = createElement(
        "span",
        "purity-card-title",
        getText(lesson.title)
      );

      card.append(image, title);

      card.addEventListener("click", () => {
        openLesson(lesson.id);
      });

      learningGrid.appendChild(card);
    });
  }

  /* ---------- 7. CREATE INTRO BOARD ---------- */

  function createIntroBoard(lesson) {
    const board = createElement(
      "section",
      "lesson-board lesson-intro"
    );

    board.appendChild(
      makeHeading(2, getText(lesson.title))
    );

    const image = makeImage(
      lesson.image,
      getText(lesson.title)
    );

    if (image) {
      board.appendChild(image);
    }

    board.appendChild(
      makeParagraph(getText(lesson.intro))
    );

    return board;
  }

  /* ---------- 8. CREATE LESSON STEP BOARD ---------- */

  function createStepBoard(step, index) {
    const board = createElement(
      "section",
      "lesson-board lesson-step"
    );

    board.dataset.step = String(index + 1);

    const heading = makeHeading(
      3,
      getText(step.title)
    );

    board.appendChild(heading);

    const image = makeImage(
      step.image,
      getText(step.title)
    );

    if (image) {
      board.appendChild(image);
    }

    board.appendChild(
      makeParagraph(getText(step.text))
    );

    return board;
  }

  /* ---------- 9. CREATE REMINDER BOARD ---------- */

  function createReminderBoard(lesson) {
    const board = createElement(
      "section",
      "lesson-board lesson-reminder"
    );

    board.appendChild(
      makeHeading(
        2,
        TRANSLATIONS[currentLanguage].remember
      )
    );

    const list = document.createElement("ul");

    const reminders =
      lesson.reminder[currentLanguage] ??
      lesson.reminder.bn;

    reminders.forEach((item) => {
      list.appendChild(
        createElement("li", "", item)
      );
    });

    board.appendChild(list);

    if (lesson.reference) {
      const quote = createElement(
        "div",
        "lesson-quote"
      );

      quote.appendChild(
        makeHeading(
          3,
          TRANSLATIONS[currentLanguage].source
        )
      );

      quote.appendChild(
        makeParagraph(
          getText(lesson.reference)
        )
      );

      board.appendChild(quote);
    }

    return board;
  }

  /* ---------- 10. OPEN A LESSON ---------- */

  function openLesson(lessonId, options = {}) {
    const lesson = LESSONS.find(
      (item) => item.id === lessonId
    );

    if (!lesson) {
      console.warn("IBADAT: lesson not found:", lessonId);
      return;
    }

    currentLessonId = lessonId;

    detailTitle.textContent = getText(lesson.title);
    detailSubtitle.textContent =
      TRANSLATIONS[currentLanguage].detailSubtitle;

    detailContent.replaceChildren();

    detailContent.appendChild(
      createIntroBoard(lesson)
    );

    lesson.steps.forEach((step, index) => {
      detailContent.appendChild(
        createStepBoard(step, index)
      );
    });

    detailContent.appendChild(
      createReminderBoard(lesson)
    );

    homeView.hidden = true;
    detailView.hidden = false;

    document.title =
      `${getText(lesson.title)} | IBADAT`;

    if (detailFooterText) {
      detailFooterText.textContent =
        TRANSLATIONS[currentLanguage].footer;
    }

    if (!options.keepScroll) {
      detailScroll.scrollTop = 0;
    }

    detailView.scrollTop = 0;

    if (options.updateHistory !== false) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("lesson", lessonId);

        window.history.pushState(
          { lessonId },
          "",
          url
        );
      } catch (error) {
        console.warn("IBADAT: history update skipped.", error);
      }
    }

    window.dispatchEvent(
      new CustomEvent("ibadat:lesson-opened", {
        detail: {
          lessonId,
          language: currentLanguage
        }
      })
    );
  }

  /* ---------- 11. RETURN TO HOME ---------- */

  function showHome(options = {}) {
    currentLessonId = null;

    detailView.hidden = true;
    homeView.hidden = false;

    document.title =
      `${TRANSLATIONS[currentLanguage].pageTitle} | IBADAT`;

    if (!options.keepHistory) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("lesson");

        window.history.replaceState(
          { lessonId: null },
          "",
          url
        );
      } catch (error) {
        console.warn("IBADAT: history reset skipped.", error);
      }
    }

    window.dispatchEvent(
      new CustomEvent("ibadat:home-opened", {
        detail: {
          language: currentLanguage
        }
      })
    );
  }

  /* ---------- 12. CHANGE LANGUAGE ---------- */

  function setLanguage(language) {
    const nextLanguage = String(language || "").toLowerCase();

    if (!TRANSLATIONS[nextLanguage]) {
      console.warn(
        "IBADAT: unsupported language:",
        nextLanguage
      );
      return false;
    }

    currentLanguage = nextLanguage;

    document.documentElement.lang = nextLanguage;

    const translation = TRANSLATIONS[nextLanguage];

    if (pageTitle) {
      pageTitle.textContent = translation.pageTitle;
    }

    if (pageIntro) {
      pageIntro.textContent = translation.pageIntro;
    }

    if (footerText) {
      footerText.textContent = translation.footer;
    }

    if (detailFooterText) {
      detailFooterText.textContent = translation.footer;
    }

    renderCards();

    if (currentLessonId) {
      openLesson(currentLessonId, {
        updateHistory: false,
        keepScroll: false
      });
    } else {
      document.title =
        `${translation.pageTitle} | IBADAT`;
    }

    window.dispatchEvent(
      new CustomEvent("ibadat:language-changed", {
        detail: {
          language: nextLanguage
        }
      })
    );

    return true;
  }

  /* ---------- 13. DARK MODE INTEGRATION ---------- */

  function setTheme(theme) {
    const normalized = String(theme || "").toLowerCase();

    const isDark =
      normalized === "dark" ||
      normalized === "night";

    const root = document.documentElement;

    root.dataset.theme = isDark ? "dark" : "light";

    document.body.classList.toggle(
      "dark-mode",
      isDark
    );

    window.dispatchEvent(
      new CustomEvent("ibadat:theme-changed", {
        detail: {
          theme: isDark ? "dark" : "light"
        }
      })
    );

    return isDark;
  }

  /* ---------- 14. BROWSER BACK BUTTON ---------- */

  window.addEventListener("popstate", (event) => {
    const url = new URL(window.location.href);
    const lessonId =
      url.searchParams.get("lesson");

    if (lessonId) {
      openLesson(lessonId, {
        updateHistory: false
      });
    } else if (event.state?.lessonId) {
      openLesson(event.state.lessonId, {
        updateHistory: false
      });
    } else {
      showHome({
        keepHistory: true
      });
    }
  });

  /* ---------- 15. RESTORE LESSON FROM URL ---------- */

  function restoreLessonFromURL() {
    let lessonId = null;

    try {
      const url = new URL(window.location.href);
      lessonId = url.searchParams.get("lesson");
    } catch (error) {
      console.warn("IBADAT: URL restore skipped.", error);
    }

    if (
      lessonId &&
      LESSONS.some((lesson) => lesson.id === lessonId)
    ) {
      openLesson(lessonId, {
        updateHistory: false
      });
    }
  }

  /* ---------- 16. PUBLIC API ---------- */

  window.IBADATPurity = Object.freeze({
    lessons: LESSONS,

    getLanguage() {
      return currentLanguage;
    },

    getCurrentLesson() {
      return currentLessonId;
    },

    setLanguage,

    setTheme,

    openLesson(lessonId) {
      openLesson(lessonId);
    },

    showHome() {
      showHome();
    }
  });

  /* ---------- 17. INITIALIZE ---------- */

  function initialize() {
    renderCards();

    if (footerText) {
      footerText.textContent =
        TRANSLATIONS[currentLanguage].footer;
    }

    if (detailFooterText) {
      detailFooterText.textContent =
        TRANSLATIONS[currentLanguage].footer;
    }

    homeView.hidden = false;
    detailView.hidden = true;

    restoreLessonFromURL();

    window.dispatchEvent(
      new CustomEvent("ibadat:purity-ready", {
        detail: {
          language: currentLanguage,
          lessonCount: LESSONS.length
        }
      })
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }
})();
