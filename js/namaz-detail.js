/* =========================================
   IBADAT — NAMAZ DETAIL
   14 Topics | Bengali / English / Hindi
   Light Theme + Dark Theme
   No History | No Previous/Next Buttons
   ========================================= */

"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";

  const params = new URLSearchParams(window.location.search);
  const topicId = params.get("topic");

  /* =========================================
     1. LANGUAGE TEXT
     ========================================= */

  const interfaceText = {
    bn: {
      section: "নামাজ শিক্ষা",
      loading: "বিষয়বস্তু লোড হচ্ছে...",
      notFound: "বিষয়টি পাওয়া যায়নি",
      notFoundText:
        "এই বিষয়টি খুঁজে পাওয়া যায়নি। মূল নামাজ শিক্ষা পেজে ফিরে গিয়ে আবার বিষয়টি নির্বাচন করো।",
      lesson: "বিষয়",
      of: "এর",
      intro: "ভূমিকা"
    },

    en: {
      section: "Prayer Learning",
      loading: "Loading lesson...",
      notFound: "Topic not found",
      notFoundText:
        "This topic could not be found. Return to the main prayer-learning page and select the topic again.",
      lesson: "Topic",
      of: "of",
      intro: "Introduction"
    },

    hi: {
      section: "नमाज़ की शिक्षा",
      loading: "पाठ लोड हो रहा है...",
      notFound: "विषय नहीं मिला",
      notFoundText:
        "यह विषय नहीं मिला। मुख्य नमाज़-शिक्षा पेज पर लौटें और विषय को फिर से चुनें।",
      lesson: "विषय",
      of: "में से",
      intro: "परिचय"
    }
  };


  /* =========================================
     2. READ APP SETTINGS
     No data is written to localStorage.
     ========================================= */

  function readSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  }

  const settings = readSettings();

  let language =
    params.get("lang") ||
    settings.lang ||
    "bn";

  if (!["bn", "en", "hi"].includes(language)) {
    language = "bn";
  }

  const ui = interfaceText[language];

  document.documentElement.lang = language;

  document.body.classList.toggle(
    "dark-mode",
    Boolean(settings.dark)
  );


  /* =========================================
     3. LESSON CONTENT
     Each topic has its own detailed sections.
     ========================================= */

  const lessons = [

    /* -----------------------------------------
       TOPIC 1 — PURIFICATION
       ----------------------------------------- */

    {
      id: "purity",

      title: {
        bn: "পাক-পবিত্রতা",
        en: "Purification",
        hi: "पाक-सफ़ाई"
      },

      intro: {
        bn: "নামাজ আদায়ের আগে পবিত্রতা সম্পর্কে জানা অত্যন্ত গুরুত্বপূর্ণ। শরীর, পোশাক ও নামাজের স্থান পরিষ্কার রাখার পাশাপাশি প্রয়োজনীয় ধর্মীয় পবিত্রতার নিয়মও শিখতে হবে।",
        en: "Purification is an important preparation for prayer. Learn about bodily cleanliness, clothing, the prayer place and the religious requirements of purification.",
        hi: "नमाज़ से पहले पाक-सफ़ाई की जानकारी ज़रूरी है। शरीर, कपड़ों और नमाज़ की जगह की सफ़ाई के साथ धार्मिक पाक-सफ़ाई के नियम भी सीखें।"
      },

      sections: {
        bn: [
          {
            heading: "১. পাক-পবিত্রতা বলতে কী বোঝায়?",
            paragraphs: [
              "পাক-পবিত্রতা বলতে পরিচ্ছন্নতা এবং নামাজের জন্য প্রয়োজনীয় শরয়ি পবিত্রতা বোঝায়। সাধারণ ময়লা পরিষ্কার করা এবং ওজু বা গোসলের মতো ইবাদত-সম্পর্কিত পবিত্রতা—দুটি বিষয়ের নিয়ম এক নয়।",
              "তাই শুধু পোশাক পরিষ্কার হলেই সব ক্ষেত্রে ওজুর প্রয়োজন শেষ হয়ে যায় না। আবার ওজু থাকলেও পোশাক বা স্থানে অপবিত্রতা থাকলে সেটি আলাদাভাবে দেখতে হয়।"
            ]
          },
          {
            heading: "২. শরীর পরিষ্কার রাখা",
            paragraphs: [
              "নামাজের আগে শরীরে অপবিত্রতা লেগেছে কি না, তা স্বাভাবিকভাবে যাচাই করো। অপবিত্রতা থাকলে সংশ্লিষ্ট বিধান অনুযায়ী পরিষ্কার করো।",
              "অপ্রয়োজনীয় সন্দেহে বারবার পরীক্ষা করা বা বারবার পরিষ্কার করার দরকার নেই। নিশ্চিত তথ্যের ভিত্তিতে কাজ করো।"
            ]
          },
          {
            heading: "৩. পোশাক ও নামাজের স্থান",
            paragraphs: [
              "নামাজের পোশাক পরিষ্কার ও সতর ঢাকার উপযোগী হওয়া দরকার। যে স্থানে নামাজ পড়বে, সেখানেও নামাজের জন্য প্রয়োজনীয় পবিত্রতা নিশ্চিত করো।",
              "জায়নামাজ ব্যবহার করা সুবিধাজনক, তবে জায়নামাজ থাকাই পবিত্রতার একমাত্র শর্ত নয়। নিচের স্থানটি পবিত্র হওয়াই মূল বিষয়।"
            ]
          },
          {
            heading: "৪. ওজু ও গোসলের প্রয়োজন",
            paragraphs: [
              "কোনো ব্যক্তির ওজু না থাকলে নামাজের আগে ওজু করতে হয়। নির্দিষ্ট পরিস্থিতিতে গোসল ফরজ হলে গোসলের বিধান অনুসরণ করতে হয়।",
              "কখন গোসল ফরজ হয় এবং কীভাবে গোসল করতে হয়, তা নির্ভরযোগ্য আলেম বা শিক্ষকের কাছ থেকে বিস্তারিত শেখো।"
            ]
          },
          {
            heading: "৫. নতুন শিক্ষার্থীর জন্য অনুশীলন",
            paragraphs: [
              "নামাজের আগে তিনটি বিষয় যাচাই করার অভ্যাস করো: প্রয়োজনীয় পবিত্রতা আছে কি না, পোশাক পবিত্র কি না এবং নামাজের স্থান পবিত্র কি না।",
              "ধর্মীয় কোনো নির্দিষ্ট বিধান নিয়ে সন্দেহ হলে নিজের অনুসৃত ফিকহ অনুযায়ী নির্ভরযোগ্য শিক্ষকের কাছে জেনে নাও।"
            ]
          }
        ],

        en: [
          {
            heading: "1. What does purification mean?",
            paragraphs: [
              "Purification includes ordinary cleanliness and the ritual state required for prayer. Cleaning visible dirt and performing ritual purification, such as wudu or ghusl, are related but distinct matters.",
              "Clean clothing does not automatically remove the need for wudu. Likewise, having wudu does not make an impure garment or place suitable for prayer."
            ]
          },
          {
            heading: "2. Keeping the body clean",
            paragraphs: [
              "Before prayer, check reasonably whether impurity is present. If it is, clean it according to the applicable ruling.",
              "Avoid repeated checking based only on unnecessary doubts. Act on reliable knowledge."
            ]
          },
          {
            heading: "3. Clothing and the prayer place",
            paragraphs: [
              "Prayer clothing should be clean and cover the required parts of the body. The place where you pray must also meet the relevant requirements of purity.",
              "A prayer mat can be convenient, but owning a prayer mat is not itself the requirement. The relevant concern is the purity of the place."
            ]
          },
          {
            heading: "4. Wudu and ghusl",
            paragraphs: [
              "Wudu is required when a person is not in a state of wudu. Ghusl is required in particular circumstances defined by Islamic law.",
              "Learn when ghusl becomes obligatory and how to perform it from a qualified teacher."
            ]
          },
          {
            heading: "5. Practice for beginners",
            paragraphs: [
              "Before prayer, develop the habit of checking the required purification, clothing and prayer place.",
              "Ask a qualified scholar about specific rulings according to the school of jurisprudence you follow."
            ]
          }
        ],

        hi: [
          {
            heading: "1. पाक-सफ़ाई का क्या अर्थ है?",
            paragraphs: [
              "पाक-सफ़ाई में सामान्य सफ़ाई और नमाज़ के लिए आवश्यक धार्मिक पाकी दोनों शामिल हैं। दिखाई देने वाली गंदगी साफ़ करना और वुज़ू या ग़ुस्ल करना अलग-अलग बातें हैं।",
              "साफ़ कपड़े होने से हर स्थिति में वुज़ू की ज़रूरत समाप्त नहीं होती।"
            ]
          },
          {
            heading: "2. शरीर की सफ़ाई",
            paragraphs: [
              "नमाज़ से पहले सामान्य रूप से देखें कि शरीर पर नापाकी तो नहीं लगी। यदि लगी हो, तो संबंधित नियम के अनुसार साफ़ करें।",
              "बिना वजह बार-बार जाँच करने के बजाय भरोसेमंद जानकारी पर अमल करें।"
            ]
          },
          {
            heading: "3. कपड़े और नमाज़ की जगह",
            paragraphs: [
              "नमाज़ के कपड़े साफ़ हों और आवश्यक अंग ढके हों। नमाज़ की जगह भी आवश्यक पाकी के अनुरूप होनी चाहिए।",
              "जानमाज़ सुविधाजनक है, लेकिन केवल जानमाज़ होना ही शर्त नहीं है।"
            ]
          },
          {
            heading: "4. वुज़ू और ग़ुस्ल",
            paragraphs: [
              "वुज़ू न होने पर नमाज़ से पहले वुज़ू करें। कुछ स्थितियों में ग़ुस्ल आवश्यक होता है।",
              "ग़ुस्ल कब फ़र्ज़ होता है और उसे कैसे करना है, योग्य शिक्षक से सीखें।"
            ]
          },
          {
            heading: "5. अभ्यास",
            paragraphs: [
              "नमाज़ से पहले पाकी, कपड़ों और नमाज़ की जगह की जाँच करने की आदत बनाएँ।",
              "विशेष धार्मिक मसले के लिए योग्य आलिम से पूछें।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 2 — WUDU
       ----------------------------------------- */

    {
      id: "wudu",

      title: {
        bn: "ওজু",
        en: "Wudu",
        hi: "वुज़ू"
      },

      intro: {
        bn: "ওজু নামাজের প্রস্তুতির একটি গুরুত্বপূর্ণ অংশ। সঠিকভাবে ওজু করার জন্য ধাপগুলো শেখা, পানি যেন প্রয়োজনীয় স্থানে পৌঁছায় তা নিশ্চিত করা এবং অপচয় এড়ানো দরকার।",
        en: "Wudu is an important preparation for prayer. Learn the steps, ensure water reaches the required areas and avoid waste.",
        hi: "वुज़ू नमाज़ की तैयारी का महत्वपूर्ण हिस्सा है। सही चरण सीखें, ज़रूरी जगहों तक पानी पहुँचाएँ और पानी बर्बाद न करें।"
      },

      sections: {
        bn: [
          {
            heading: "১. ওজু কী এবং কেন করা হয়?",
            paragraphs: [
              "ওজু হলো নির্দিষ্ট অঙ্গগুলো নির্ধারিত পদ্ধতিতে ধোয়া ও মাসেহ করার ইবাদত। নামাজের জন্য ওজু প্রয়োজন হলে তা সঠিকভাবে করতে হয়।",
              "ওজুর সময় তাড়াহুড়ো না করে প্রতিটি অঙ্গে পানি পৌঁছানো এবং শেখানো পদ্ধতি অনুসরণ করার দিকে মনোযোগ দাও।"
            ]
          },
          {
            heading: "২. ওজুর আগে প্রস্তুতি",
            paragraphs: [
              "পরিষ্কার পানি ব্যবহার করো। হাতে বা শরীরের এমন কোনো বস্তু থাকলে যা প্রয়োজনীয় স্থানে পানি পৌঁছাতে বাধা দেয়, সেটি সম্পর্কে সচেতন হও।",
              "ওজুর জন্য আলাদা কোনো বিশেষ পোশাক আবশ্যক নয়। তবে এমনভাবে প্রস্তুত হও, যাতে স্বাচ্ছন্দ্যে অঙ্গগুলো ধুতে পারো।"
            ]
          },
          {
            heading: "৩. ওজুর সাধারণ ধাপ",
            paragraphs: [
              "প্রথমে মনে ওজুর নিয়ত রাখো এবং আল্লাহর নাম নিয়ে শুরু করো। এরপর হাত, মুখ, নাক, দুই হাত, মাথা মাসেহ এবং পা ধোয়ার ধাপগুলো শেখানো পদ্ধতিতে সম্পন্ন করো।",
              "সাধারণভাবে ধাপগুলো হলো: দুই হাত ধোয়া, কুলি করা, নাকে পানি দেওয়া, মুখ ধোয়া, কনুইসহ দুই হাত ধোয়া, মাথা মাসেহ করা এবং টাখনুসহ দুই পা ধোয়া।",
              "ধোয়ার সংখ্যা, ক্রম এবং কিছু বিস্তারিত বিধান মাজহাবভেদে ব্যাখ্যা করা হয়। তাই নির্ভরযোগ্য শিক্ষকের কাছ থেকে ব্যবহারিকভাবে ওজু শিখে নেওয়া ভালো।"
            ]
          },
          {
            heading: "৪. পানি যেন পৌঁছায়",
            paragraphs: [
              "আঙুলের ফাঁক, কনুই, গোড়ালি এবং পায়ের আঙুলের মতো স্থানে পানি পৌঁছানোর বিষয়ে সচেতন থাকো। কোনো আবরণ পানি পৌঁছাতে বাধা দিচ্ছে কি না, প্রয়োজন হলে যাচাই করো।",
              "তবে অকারণে বারবার ওজু পুনরাবৃত্তি কোরো না। স্বাভাবিকভাবে ওজু সম্পন্ন করাই লক্ষ্য।"
            ]
          },
          {
            heading: "৫. ওজু ভেঙে গেলে",
            paragraphs: [
              "কিছু নির্দিষ্ট ঘটনা ওজু নষ্ট করে। তবে সব বিষয়ে সব মাজহাবের ব্যাখ্যা এক নয়। নিজের অনুসৃত ফিকহ অনুযায়ী ওজু ভঙ্গের কারণগুলো শিখে নাও।",
              "শুধু সন্দেহ হলে ওজু ভেঙে গেছে বলে ধরে নেওয়া ঠিক নয়। নিশ্চিত জ্ঞান ও নির্ভরযোগ্য নির্দেশনা অনুসরণ করো।"
            ]
          },
          {
            heading: "৬. সাধারণ ভুল",
            paragraphs: [
              "কোনো অঙ্গের অংশ শুকনো রেখে দেওয়া, তাড়াহুড়ো করা এবং অতিরিক্ত পানি ব্যবহার করা এড়িয়ে চলো।",
              "ওজু শেখার সময় একজন অভিজ্ঞ শিক্ষককে নিজের পদ্ধতি দেখিয়ে ভুল সংশোধন করিয়ে নেওয়া সবচেয়ে কার্যকর।"
            ]
          }
        ],

        en: [
          {
            heading: "1. What is wudu?",
            paragraphs: [
              "Wudu is a prescribed act of washing and wiping particular parts of the body. Perform it correctly whenever it is required for prayer.",
              "Avoid rushing and pay attention to the required areas."
            ]
          },
          {
            heading: "2. Preparation",
            paragraphs: [
              "Use clean water. Be aware of anything that may prevent water from reaching a required area.",
              "No special clothing is required, but prepare in a way that allows you to wash comfortably."
            ]
          },
          {
            heading: "3. General steps",
            paragraphs: [
              "Begin with the intention in your heart and the name of Allah. Learn the prescribed sequence for washing the hands, rinsing the mouth and nose, washing the face and arms, wiping the head and washing the feet.",
              "The general sequence includes the hands, mouth, nose, face, arms including the elbows, head and feet including the ankles.",
              "Some details about order and repetition differ among schools of jurisprudence. Learn the practical method from a qualified teacher."
            ]
          },
          {
            heading: "4. Ensure water reaches the required areas",
            paragraphs: [
              "Pay attention to the spaces between fingers, elbows, ankles and toes. Check whether anything prevents water from reaching the required area.",
              "Do not repeat wudu unnecessarily."
            ]
          },
          {
            heading: "5. When wudu is invalidated",
            paragraphs: [
              "Certain events invalidate wudu, and some details differ among schools of jurisprudence. Learn the rules relevant to your practice.",
              "Do not treat mere doubt as certainty."
            ]
          },
          {
            heading: "6. Common mistakes",
            paragraphs: [
              "Avoid leaving required areas dry, rushing and wasting water.",
              "A practical demonstration by a qualified teacher is an effective way to correct mistakes."
            ]
          }
        ],

        hi: [
          {
            heading: "1. वुज़ू क्या है?",
            paragraphs: [
              "वुज़ू में शरीर के कुछ अंगों को निर्धारित तरीक़े से धोया और मसह किया जाता है। नमाज़ के लिए ज़रूरत होने पर इसे सही तरीक़े से करें।",
              "जल्दबाज़ी न करें और ज़रूरी अंगों पर ध्यान दें।"
            ]
          },
          {
            heading: "2. तैयारी",
            paragraphs: [
              "साफ़ पानी इस्तेमाल करें। ऐसी चीज़ों पर ध्यान दें जो ज़रूरी जगह तक पानी पहुँचने में रुकावट बन सकती हैं।",
              "ऐसी स्थिति में रहें जिससे अंग आसानी से धो सकें।"
            ]
          },
          {
            heading: "3. वुज़ू के सामान्य चरण",
            paragraphs: [
              "दिल में नियत करके अल्लाह का नाम लें। फिर हाथ, मुँह, नाक, चेहरा, कोहनियों सहित बाँहें धोएँ, सिर का मसह करें और टखनों सहित पैर धोएँ।",
              "कुछ विवरण फ़िक़्ही मत के अनुसार अलग हो सकते हैं। इसलिए योग्य शिक्षक से व्यावहारिक तरीक़ा सीखें।"
            ]
          },
          {
            heading: "4. पानी ज़रूरी जगह तक पहुँचाएँ",
            paragraphs: [
              "उँगलियों के बीच, कोहनी, टखनों और पैर की उँगलियों पर ध्यान दें।",
              "बिना वजह बार-बार वुज़ू न दोहराएँ।"
            ]
          },
          {
            heading: "5. वुज़ू टूटने के कारण",
            paragraphs: [
              "कुछ स्थितियों में वुज़ू टूट जाता है। अपने फ़िक़्ह के अनुसार नियम सीखें।",
              "केवल शक होने से वुज़ू टूटना निश्चित न मानें।"
            ]
          },
          {
            heading: "6. आम ग़लतियाँ",
            paragraphs: [
              "ज़रूरी अंग सूखे छोड़ने, जल्दबाज़ी करने और पानी बर्बाद करने से बचें।",
              "योग्य शिक्षक को अपना तरीक़ा दिखाकर सुधार करना उपयोगी है।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 3 — PRAYER CONDITIONS
       ----------------------------------------- */

    {
      id: "conditions",

      title: {
        bn: "নামাজের শর্ত",
        en: "Prayer Conditions",
        hi: "नमाज़ की शर्तें"
      },

      intro: {
        bn: "নামাজ শুরু করার আগে কয়েকটি গুরুত্বপূর্ণ শর্ত যাচাই করতে হয়। এই শর্তগুলো সম্পর্কে পরিষ্কার ধারণা থাকলে নামাজের প্রস্তুতি সহজ হয়।",
        en: "Several important conditions must be considered before prayer. Understanding them makes preparation easier.",
        hi: "नमाज़ से पहले कुछ महत्वपूर्ण शर्तों का ध्यान रखना होता है। इन्हें समझने से तैयारी आसान होती है।"
      },

      sections: {
        bn: [
          {
            heading: "১. পবিত্রতা",
            paragraphs: [
              "নামাজের জন্য প্রয়োজনীয় ওজু বা অন্য পবিত্রতা নিশ্চিত করো। শরীর, পোশাক ও নামাজের স্থান সম্পর্কেও প্রযোজ্য বিধান অনুসরণ করো।"
            ]
          },
          {
            heading: "২. সতর ঢাকা",
            paragraphs: [
              "নামাজে শরিয়ত নির্ধারিত সতর ঢেকে রাখা জরুরি। নারী ও পুরুষের সতরের বিধান এবং কিছু বিস্তারিত বিষয় ফিকহ অনুযায়ী শেখা উচিত।",
              "এমন পোশাক ব্যবহার করো যা প্রয়োজনীয় অংশ ঢেকে রাখে এবং নামাজের উপযোগী।"
            ]
          },
          {
            heading: "৩. কিবলামুখী হওয়া",
            paragraphs: [
              "নামাজে কাবার দিকে মুখ করে দাঁড়াতে হয়। নিজের অবস্থান অনুযায়ী নির্ভরযোগ্য কিবলা নির্দেশনা ব্যবহার করো।",
              "ভ্রমণ বা অসুবিধার বিশেষ পরিস্থিতিতে কী বিধান প্রযোজ্য, তা নির্ভরযোগ্য শিক্ষক থেকে জেনে নাও।"
            ]
          },
          {
            heading: "৪. ওয়াক্ত হওয়া",
            paragraphs: [
              "ফরজ নামাজ নির্ধারিত সময়ের মধ্যে আদায় করতে হয়। শুধু ঘড়িতে নির্দিষ্ট সময় দেখলেই সব স্থানে একই সময় হবে না, কারণ অবস্থান ও তারিখ অনুযায়ী ওয়াক্ত বদলায়।",
              "নিজের এলাকার নির্ভরযোগ্য নামাজের সময়সূচি অনুসরণ করো।"
            ]
          },
          {
            heading: "৫. নিয়ত",
            paragraphs: [
              "কোন নামাজ আদায় করতে যাচ্ছ, তা অন্তরে নির্ধারণ করো। নিয়ত হলো ইবাদতের উদ্দেশ্য স্থির করা।",
              "নিয়তের নির্দিষ্ট উচ্চারিত বাক্য আবশ্যক কি না—এ বিষয়ে নিজের অনুসৃত ফিকহ অনুযায়ী শিখে নাও।"
            ]
          },
          {
            heading: "৬. প্রস্তুতির সহজ তালিকা",
            paragraphs: [
              "নামাজের আগে মনে মনে যাচাই করো: পবিত্রতা আছে কি না, পোশাক উপযুক্ত কি না, স্থান পবিত্র কি না, কিবলার দিক ঠিক কি না এবং ওয়াক্ত হয়েছে কি না।",
              "কোনো শর্তে অসুবিধা হলে অনুমান করে সিদ্ধান্ত না নিয়ে নির্ভরযোগ্য আলেমের কাছে জেনে নাও।"
            ]
          }
        ],

        en: [
          {
            heading: "1. Purification",
            paragraphs: [
              "Ensure the required state of wudu or other purification. Follow the applicable rules for the body, clothing and prayer place."
            ]
          },
          {
            heading: "2. Covering the required parts",
            paragraphs: [
              "The required parts of the body must be covered according to Islamic rulings. Some details differ by school of jurisprudence.",
              "Choose suitable clothing that provides the required covering."
            ]
          },
          {
            heading: "3. Facing the Qibla",
            paragraphs: [
              "Face the direction of the Ka'bah. Use a reliable Qibla guide appropriate to your location.",
              "Ask a qualified teacher about exceptional circumstances during travel or difficulty."
            ]
          },
          {
            heading: "4. Prayer time",
            paragraphs: [
              "Obligatory prayers must be performed within their prescribed times. Prayer times vary by location and date.",
              "Follow a reliable local timetable."
            ]
          },
          {
            heading: "5. Intention",
            paragraphs: [
              "Know in your heart which prayer you intend to perform. Intention establishes the purpose of the act of worship.",
              "Learn the ruling about verbalizing intention according to your school of jurisprudence."
            ]
          },
          {
            heading: "6. A simple preparation checklist",
            paragraphs: [
              "Check purification, clothing, prayer place, Qibla and prayer time before beginning.",
              "Ask a qualified scholar about any difficult or exceptional situation."
            ]
          }
        ],

        hi: [
          {
            heading: "1. पाक-सफ़ाई",
            paragraphs: [
              "नमाज़ के लिए आवश्यक वुज़ू या दूसरी पाकी सुनिश्चित करें। शरीर, कपड़े और जगह से जुड़े नियमों का पालन करें।"
            ]
          },
          {
            heading: "2. आवश्यक अंग ढकना",
            paragraphs: [
              "नमाज़ में आवश्यक अंगों को ढकना ज़रूरी है। कुछ विवरण फ़िक़्ह के अनुसार अलग हो सकते हैं।",
              "उपयुक्त कपड़े पहनें जो आवश्यक अंगों को ढकें।"
            ]
          },
          {
            heading: "3. क़िबला की ओर",
            paragraphs: [
              "काबा की दिशा में मुँह करें। अपने स्थान के अनुसार विश्वसनीय क़िबला साधन इस्तेमाल करें।",
              "यात्रा या कठिन परिस्थिति के नियम योग्य शिक्षक से सीखें।"
            ]
          },
          {
            heading: "4. नमाज़ का वक़्त",
            paragraphs: [
              "फ़र्ज़ नमाज़ निर्धारित समय में पढ़ी जाती है। समय स्थान और तारीख़ के अनुसार बदलता है।",
              "अपने क्षेत्र की विश्वसनीय समय-सारणी देखें।"
            ]
          },
          {
            heading: "5. नियत",
            paragraphs: [
              "दिल में तय करें कि कौन-सी नमाज़ पढ़नी है। नियत इबादत का उद्देश्य तय करना है।",
              "नियत को ज़बान से कहने के बारे में अपने फ़िक़्ह के अनुसार सीखें।"
            ]
          },
          {
            heading: "6. तैयारी की सूची",
            paragraphs: [
              "पाकी, कपड़े, नमाज़ की जगह, क़िबला और वक़्त की जाँच करें।",
              "विशेष परिस्थिति में योग्य आलिम से मार्गदर्शन लें।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 4 — PRAYER TIMES & RAKATS
       ----------------------------------------- */

    {
      id: "times-rakats",

      title: {
        bn: "ওয়াক্ত ও রাকাত",
        en: "Prayer Times & Rakats",
        hi: "नमाज़ के वक़्त और रकअत"
      },

      intro: {
        bn: "পাঁচ ওয়াক্ত নামাজের নাম, ফরজ রাকাত এবং সময়ের গুরুত্ব শিখে নাও। নামাজের সময় স্থান ও তারিখ অনুযায়ী পরিবর্তিত হয়।",
        en: "Learn the five daily prayers, their obligatory rakats and the importance of prayer times. Times change with location and date.",
        hi: "पाँच वक़्त की नमाज़, उनकी फ़र्ज़ रकअत और वक़्त का महत्व सीखें। नमाज़ का समय जगह और तारीख़ के अनुसार बदलता है।"
      },

      sections: {
        bn: [
          {
            heading: "১. পাঁচ ওয়াক্ত নামাজ",
            paragraphs: [
              "প্রতিদিনের পাঁচটি ফরজ নামাজ হলো ফজর, জোহর, আসর, মাগরিব ও ইশা। প্রত্যেকটির নির্ধারিত ওয়াক্ত রয়েছে।"
            ]
          },
          {
            heading: "২. ফরজ রাকাতের সংখ্যা",
            paragraphs: [
              "ফজরের ফরজ ২ রাকাত, জোহরের ফরজ ৪ রাকাত, আসরের ফরজ ৪ রাকাত, মাগরিবের ফরজ ৩ রাকাত এবং ইশার ফরজ ৪ রাকাত।",
              "এগুলো শুধু ফরজ রাকাতের সংখ্যা। সুন্নত, নফল ও বিতরের বিধান আলাদা করে শিখতে হবে।"
            ]
          },
          {
            heading: "৩. ফজরের সময়",
            paragraphs: [
              "ফজরের সময় সুবহে সাদিক থেকে শুরু হয় এবং সূর্যোদয়ের আগে শেষ হয়। স্থানভেদে সময়ের ঘড়ির হিসাব আলাদা হতে পারে।",
              "সূর্যোদয়ের সময়ের সঙ্গে ফজরের শেষ সময় গুলিয়ে ফেলো না। নির্ভরযোগ্য স্থানীয় সময়সূচি দেখে নাও।"
            ]
          },
          {
            heading: "৪. জোহর ও আসরের সময়",
            paragraphs: [
              "জোহর ও আসরের সময় সূর্যের অবস্থানের সঙ্গে সম্পর্কিত। আসরের শুরু নির্ধারণের পদ্ধতিতে ফিকহি মতভেদ রয়েছে।",
              "তাই নিজের এলাকার নির্ভরযোগ্য মসজিদ বা স্বীকৃত সময়সূচি অনুসরণ করো।"
            ]
          },
          {
            heading: "৫. মাগরিব ও ইশার সময়",
            paragraphs: [
              "মাগরিবের সময় সূর্যাস্তের পর শুরু হয়। ইশার সময় রাতের নির্দিষ্ট পর্যায়ে শুরু হয়। সঠিক সময় জানতে স্থানীয় সময়সূচি অনুসরণ করো।"
            ]
          },
          {
            heading: "৬. সুন্নত, নফল ও বিতর",
            paragraphs: [
              "ফরজ নামাজের পাশাপাশি বিভিন্ন নামাজে সুন্নত ও নফল রাকাত রয়েছে। হানাফি ফিকহে বিতরের বিশেষ বিধান রয়েছে; অন্যান্য ফিকহি মতেও বিস্তারিত নিয়ম শেখা দরকার।",
              "প্রতিটি নামাজের আগে-পরে কত রাকাত পড়তে হয়, তা একটি নির্ভরযোগ্য তালিকা থেকে শিখে নাও।"
            ]
          },
          {
            heading: "৭. শেখার অনুশীলন",
            paragraphs: [
              "নিজের এলাকার সময়সূচি দেখো, পাঁচটি নামাজের নাম বলো এবং প্রতিটির ফরজ রাকাত মনে রাখার অনুশীলন করো।",
              "কোনো অ্যাপের সময় ও স্থানীয় মসজিদের সময়ের মধ্যে পার্থক্য থাকলে সেটিংস, অবস্থান ও গণনার পদ্ধতি যাচাই করো।"
            ]
          }
        ],

        en: [
          {
            heading: "1. The five daily prayers",
            paragraphs: [
              "The five obligatory daily prayers are Fajr, Dhuhr, Asr, Maghrib and Isha. Each has its prescribed time."
            ]
          },
          {
            heading: "2. Obligatory rakats",
            paragraphs: [
              "Fajr has 2 obligatory rakats, Dhuhr 4, Asr 4, Maghrib 3 and Isha 4.",
              "These figures refer to obligatory rakats only. Sunnah, voluntary prayers and Witr must be learned separately."
            ]
          },
          {
            heading: "3. Fajr time",
            paragraphs: [
              "Fajr begins at true dawn and ends before sunrise. Clock times vary by location.",
              "Do not confuse sunrise with the beginning of Fajr's final period. Consult a reliable local timetable."
            ]
          },
          {
            heading: "4. Dhuhr and Asr",
            paragraphs: [
              "Dhuhr and Asr are related to the sun's position. Schools of jurisprudence differ on the calculation of the beginning of Asr.",
              "Follow a reliable local mosque or timetable."
            ]
          },
          {
            heading: "5. Maghrib and Isha",
            paragraphs: [
              "Maghrib begins after sunset. Isha begins later in the evening according to the relevant rules. Use a reliable local timetable."
            ]
          },
          {
            heading: "6. Sunnah, voluntary prayers and Witr",
            paragraphs: [
              "Sunnah and voluntary rakats accompany various prayers. Witr has specific rulings, including details associated with the Hanafi school.",
              "Learn the rakats before and after each prayer from a reliable guide."
            ]
          },
          {
            heading: "7. Practice",
            paragraphs: [
              "Use your local timetable, name the five daily prayers and practise remembering their obligatory rakats.",
              "If an app differs from the local mosque timetable, check the location and calculation settings."
            ]
          }
        ],

        hi: [
          {
            heading: "1. पाँच वक़्त की नमाज़",
            paragraphs: [
              "पाँच फ़र्ज़ नमाज़ें फ़ज्र, ज़ुहर, अस्र, मग़रिब और इशा हैं। हर नमाज़ का अपना निर्धारित वक़्त है।"
            ]
          },
          {
            heading: "2. फ़र्ज़ रकअत",
            paragraphs: [
              "फ़ज्र में 2, ज़ुहर में 4, अस्र में 4, मग़रिब में 3 और इशा में 4 फ़र्ज़ रकअत हैं।",
              "ये केवल फ़र्ज़ रकअतें हैं। सुन्नत, नफ़्ल और वितर के नियम अलग से सीखें।"
            ]
          },
          {
            heading: "3. फ़ज्र का वक़्त",
            paragraphs: [
              "फ़ज्र सच्ची सुबह से शुरू होती है और सूर्योदय से पहले समाप्त होती है। घड़ी का समय जगह के अनुसार बदलता है।",
              "अपने क्षेत्र की विश्वसनीय समय-सारणी देखें।"
            ]
          },
          {
            heading: "4. ज़ुहर और अस्र",
            paragraphs: [
              "ज़ुहर और अस्र का समय सूर्य की स्थिति से संबंधित है। अस्र के शुरू होने के हिसाब में फ़िक़्ही मतभेद हैं।",
              "विश्वसनीय स्थानीय मस्जिद की समय-सारणी अपनाएँ।"
            ]
          },
          {
            heading: "5. मग़रिब और इशा",
            paragraphs: [
              "मग़रिब सूर्यास्त के बाद शुरू होती है। इशा का वक़्त बाद में आता है। स्थानीय समय-सारणी देखें।"
            ]
          },
          {
            heading: "6. सुन्नत, नफ़्ल और वितर",
            paragraphs: [
              "विभिन्न नमाज़ों के साथ सुन्नत और नफ़्ल रकअतें होती हैं। वितर के विशेष नियम भी सीखें।",
              "हर नमाज़ से पहले और बाद की रकअतें विश्वसनीय मार्गदर्शिका से जानें।"
            ]
          },
          {
            heading: "7. अभ्यास",
            paragraphs: [
              "स्थानीय समय-सारणी देखकर पाँच नमाज़ों और उनकी फ़र्ज़ रकअतों का अभ्यास करें।",
              "ऐप का समय अलग हो तो स्थान और गणना सेटिंग्स जाँचें।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 5 — FARD, WAJIB & SUNNAH
       ----------------------------------------- */

    {
      id: "fard-wajib-sunnah",

      title: {
        bn: "ফরজ, ওয়াজিব ও সুন্নত",
        en: "Fard, Wajib & Sunnah",
        hi: "फ़र्ज़, वाजिब और सुन्नत"
      },

      intro: {
        bn: "নামাজের বিভিন্ন বিধানের পার্থক্য বোঝা জরুরি। কোন কাজ আবশ্যক, কোনটির আলাদা বিধান রয়েছে এবং কোন কাজ সুন্নত—এসব বিষয় ধীরে ধীরে শেখো।",
        en: "Understanding prayer rulings is important. Learn the distinctions between obligatory requirements and Sunnah practices.",
        hi: "नमाज़ के अलग-अलग हुक्मों को समझना ज़रूरी है। फ़र्ज़, वाजिब और सुन्नत के अंतर को धीरे-धीरे सीखें।"
      },

      sections: {
        bn: [
          {
            heading: "১. ফরজ কী?",
            paragraphs: [
              "ফরজ হলো এমন বিধান, যা অবশ্য পালনীয়। নামাজের ফরজ বিষয়গুলো ঠিকভাবে শেখা জরুরি, কারণ এগুলোর সঙ্গে নামাজের শুদ্ধতা সম্পর্কিত।"
            ]
          },
          {
            heading: "২. ওয়াজিব কী?",
            paragraphs: [
              "ওয়াজিব শব্দটি ফিকহের কিছু ধারায় বিশেষ আইনগত অর্থে ব্যবহৃত হয়। বিশেষ করে হানাফি ফিকহে ফরজ ও ওয়াজিবের মধ্যে শ্রেণিগত পার্থক্য করা হয়।",
              "অন্য মাজহাবে একই শ্রেণিবিভাগ সব সময় একইভাবে ব্যবহৃত হয় না। তাই কোনো বিধান শেখার সময় কোন ফিকহি ব্যাখ্যা অনুসরণ করা হচ্ছে, তা জেনে নাও।"
            ]
          },
          {
            heading: "৩. সুন্নত কী?",
            paragraphs: [
              "সুন্নত হলো রাসুলুল্লাহ ﷺ-এর শিক্ষা, কথা ও আমলের সঙ্গে সম্পর্কিত নির্দেশনা ও অনুশীলন। নামাজে বহু সুন্নত আমল রয়েছে।",
              "সুন্নত আমল যত্নসহকারে শেখো এবং তা পালনের চেষ্টা করো। তবে কোনো আমল বাদ পড়লে তার বিধান কী, তা নিজের অনুসৃত ফিকহ অনুযায়ী জেনে নাও।"
            ]
          },
          {
            heading: "৪. ফরজ ও সুন্নতের পার্থক্য",
            paragraphs: [
              "সব বিধান একই স্তরের নয়। কোনো কাজ আবশ্যক হওয়া, কোনো কাজ বিশেষ আইনগত শ্রেণিতে পড়া এবং কোনো কাজ সুন্নত হওয়ার মধ্যে পার্থক্য রয়েছে।",
              "সঠিক পার্থক্য শেখার জন্য নির্ভরযোগ্য পাঠ্যবই বা আলেমের ব্যাখ্যা অনুসরণ করো।"
            ]
          },
          {
            heading: "৫. কোনো কাজ বাদ পড়লে",
            paragraphs: [
              "নামাজে কোনো কাজ ভুলে বাদ পড়লে কী করতে হবে, তা কাজটির ধরন, ভুলের পরিস্থিতি এবং অনুসৃত ফিকহের ওপর নির্ভর করে।",
              "সব ভুলের জন্য একই সমাধান প্রযোজ্য নয়। প্রয়োজন হলে সিজদায়ে সাহু বা নামাজ পুনরায় পড়ার মতো বিধান সম্পর্কে নির্ভরযোগ্য আলেমের পরামর্শ নাও।"
            ]
          }
        ],

        en: [
          {
            heading: "1. What is Fard?",
            paragraphs: [
              "Fard refers to an obligatory requirement. Learn the essential requirements of prayer carefully because they relate to its validity."
            ]
          },
          {
            heading: "2. What is Wajib?",
            paragraphs: [
              "Wajib has a particular legal classification in some schools. Hanafi jurisprudence distinguishes Fard from Wajib in a technical sense.",
              "Other schools do not always use the same classification. Learn which legal framework a lesson follows."
            ]
          },
          {
            heading: "3. What is Sunnah?",
            paragraphs: [
              "Sunnah relates to the teachings, sayings and practices of the Prophet Muhammad ﷺ. Prayer includes many Sunnah actions.",
              "Learn and practise these actions, and ask a qualified scholar about the ruling if one is omitted."
            ]
          },
          {
            heading: "4. Understanding the differences",
            paragraphs: [
              "Not every ruling has the same legal status. Obligatory requirements and recommended practices must be distinguished.",
              "Use a reliable textbook or qualified scholar for detailed explanations."
            ]
          },
          {
            heading: "5. If an action is omitted",
            paragraphs: [
              "The ruling depends on the action, the circumstances and the school of jurisprudence.",
              "Different mistakes do not all have the same remedy. Ask a qualified scholar about prostration of forgetfulness or repeating the prayer when relevant."
            ]
          }
        ],

        hi: [
          {
            heading: "1. फ़र्ज़ क्या है?",
            paragraphs: [
              "फ़र्ज़ अनिवार्य हुक्म है। नमाज़ के आवश्यक फ़र्ज़ अच्छी तरह सीखें क्योंकि उनका संबंध नमाज़ की शुद्धता से है।"
            ]
          },
          {
            heading: "2. वाजिब क्या है?",
            paragraphs: [
              "कुछ फ़िक़्ही मतों में वाजिब की अलग तकनीकी परिभाषा है। हनफ़ी फ़िक़्ह में फ़र्ज़ और वाजिब में अंतर किया जाता है।",
              "दूसरे मतों में वर्गीकरण हमेशा एक जैसा नहीं होता।"
            ]
          },
          {
            heading: "3. सुन्नत क्या है?",
            paragraphs: [
              "सुन्नत रसूलुल्लाह ﷺ की शिक्षाओं और अमलों से संबंधित है। नमाज़ में कई सुन्नत अमल हैं।",
              "उन्हें सीखें और किसी अमल के छूटने पर योग्य आलिम से पूछें।"
            ]
          },
          {
            heading: "4. अंतर समझना",
            paragraphs: [
              "हर हुक्म का दर्जा समान नहीं होता। अनिवार्य और पसंदीदा अमलों में अंतर समझना ज़रूरी है।",
              "विस्तृत जानकारी विश्वसनीय पुस्तक या योग्य आलिम से लें।"
            ]
          },
          {
            heading: "5. कोई अमल छूट जाए",
            paragraphs: [
              "हुक्म इस बात पर निर्भर करता है कि कौन-सा अमल छूटा और कौन-सा फ़िक़्ही मत अपनाया जाता है।",
              "हर ग़लती का समाधान एक जैसा नहीं होता। ज़रूरत पर योग्य आलिम से पूछें।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 6 — STARTING PRAYER
       ----------------------------------------- */

    {
      id: "start",

      title: {
        bn: "নামাজ শুরু",
        en: "Starting Prayer",
        hi: "नमाज़ की शुरुआत"
      },

      intro: {
        bn: "নামাজের শুরুতে প্রস্তুতি, নিয়ত, তাকবিরে তাহরিমা এবং কিয়ামের পদ্ধতি শিখে নাও। প্রতিটি ধাপ বুঝে অনুশীলন করলে নামাজ শেখা সহজ হয়।",
        en: "Learn the preparation, intention, opening takbir and standing at the beginning of prayer.",
        hi: "नमाज़ की तैयारी, नियत, तकबीर-ए-तहरीमा और क़ियाम के बारे में सीखें।"
      },

      sections: {
        bn: [
          {
            heading: "১. নামাজের প্রস্তুতি",
            paragraphs: [
              "প্রথমে ওজু ও প্রয়োজনীয় পবিত্রতা নিশ্চিত করো। পোশাক, নামাজের স্থান, কিবলার দিক এবং ওয়াক্ত ঠিক আছে কি না যাচাই করো।",
              "মোবাইল বা অন্য কোনো বিষয় যাতে মনোযোগ নষ্ট না করে, সে জন্য সম্ভব হলে শান্ত জায়গায় দাঁড়াও।"
            ]
          },
          {
            heading: "২. নিয়ত",
            paragraphs: [
              "কোন নামাজ আদায় করবে, তা মনে স্থির করো। যেমন ফজরের ফরজ, জোহরের ফরজ অথবা অন্য কোনো নির্দিষ্ট নামাজ।",
              "নিয়ত হলো অন্তরের উদ্দেশ্য। নিয়ত উচ্চস্বরে বলা সম্পর্কে বিস্তারিত বিধান নিজের অনুসৃত ফিকহ অনুযায়ী শিখে নাও।"
            ]
          },
          {
            heading: "৩. তাকবিরে তাহরিমা",
            paragraphs: [
              "নামাজ শুরু করার সময় 'আল্লাহু আকবার' বলা হয়। এই তাকবিরের মাধ্যমে নামাজে প্রবেশ করা হয়।",
              "আরবি উচ্চারণ সঠিকভাবে শেখার চেষ্টা করো। প্রয়োজনে অভিজ্ঞ শিক্ষককে শুনিয়ে উচ্চারণ সংশোধন করো।"
            ]
          },
          {
            heading: "৪. কিয়াম বা দাঁড়ানো",
            paragraphs: [
              "সামর্থ্য থাকলে ফরজ নামাজ দাঁড়িয়ে আদায় করা হয়। দাঁড়ানোর সময় শরীর স্থির রাখো এবং মনোযোগ কুরআন তিলাওয়াতের দিকে রাখো।",
              "হাত বাঁধার অবস্থান ও পদ্ধতি ফিকহি শিক্ষার সঙ্গে মিলিয়ে শেখো।"
            ]
          },
          {
            heading: "৫. কিরাতের প্রস্তুতি",
            paragraphs: [
              "নামাজের প্রযোজ্য স্থানে কুরআন তিলাওয়াত করো। সূরা ফাতিহা ও প্রয়োজনীয় কিরাতের উচ্চারণ শুদ্ধ করার জন্য ধীরে ধীরে অনুশীলন করো।",
              "তিলাওয়াতের নির্দিষ্ট নিয়ম ও কোন রাকাতে কী পড়তে হবে, তা পরবর্তী কিরাত বিষয়ের সঙ্গে মিলিয়ে শেখো।"
            ]
          },
          {
            heading: "৬. নতুন শিক্ষার্থীর অনুশীলন",
            paragraphs: [
              "প্রথমে প্রস্তুতি, নিয়ত, তাকবির ও কিয়ামের ধাপগুলো আলাদাভাবে শিখে নাও। এরপর একজন শিক্ষককে দেখিয়ে সম্পূর্ণ ধারাবাহিকতা অনুশীলন করো।"
            ]
          }
        ],

        en: [
          {
            heading: "1. Preparation",
            paragraphs: [
              "Ensure wudu and the required purification. Check clothing, prayer place, Qibla and prayer time.",
              "When possible, stand in a calm place where distractions are reduced."
            ]
          },
          {
            heading: "2. Intention",
            paragraphs: [
              "Know in your heart which prayer you intend to perform, such as the obligatory Fajr or Dhuhr prayer.",
              "Intention is the purpose in the heart. Learn the ruling on verbalizing it according to your school."
            ]
          },
          {
            heading: "3. Opening takbir",
            paragraphs: [
              "Prayer begins with saying 'Allahu Akbar'. This opening takbir marks entry into prayer.",
              "Learn the Arabic pronunciation carefully and practise with a qualified teacher."
            ]
          },
          {
            heading: "4. Standing",
            paragraphs: [
              "Obligatory prayer is performed standing when a person is able. Remain composed and focus on the recitation.",
              "Learn the position of the hands according to your school of jurisprudence."
            ]
          },
          {
            heading: "5. Preparing for recitation",
            paragraphs: [
              "Recite the Qur'an in the prescribed parts of prayer. Practise Surah Al-Fatihah and other required recitations slowly.",
              "Learn the detailed rules of recitation in the Qira'at lesson."
            ]
          },
          {
            heading: "6. Practice",
            paragraphs: [
              "Learn preparation, intention, opening takbir and standing separately, then practise the complete sequence with a teacher."
            ]
          }
        ],

        hi: [
          {
            heading: "1. तैयारी",
            paragraphs: [
              "वुज़ू और आवश्यक पाकी सुनिश्चित करें। कपड़े, जगह, क़िबला और वक़्त जाँचें।",
              "जहाँ संभव हो, ध्यान भटकाने वाली चीज़ों से दूर खड़े हों।"
            ]
          },
          {
            heading: "2. नियत",
            paragraphs: [
              "दिल में तय करें कि कौन-सी नमाज़ पढ़नी है, जैसे फ़ज्र या ज़ुहर की फ़र्ज़ नमाज़।",
              "नियत दिल का इरादा है। उसे ज़बान से कहने के नियम अपने फ़िक़्ह के अनुसार सीखें।"
            ]
          },
          {
            heading: "3. तकबीर-ए-तहरीमा",
            paragraphs: [
              "नमाज़ की शुरुआत 'अल्लाहु अकबर' कहकर होती है।",
              "अरबी उच्चारण सही सीखें और शिक्षक से सुधार करवाएँ।"
            ]
          },
          {
            heading: "4. क़ियाम",
            paragraphs: [
              "सामर्थ्य होने पर फ़र्ज़ नमाज़ खड़े होकर पढ़ी जाती है। शरीर को स्थिर रखें और तिलावत पर ध्यान दें।",
              "हाथ बाँधने का तरीक़ा अपने फ़िक़्ह के अनुसार सीखें।"
            ]
          },
          {
            heading: "5. क़िराअत की तैयारी",
            paragraphs: [
              "नमाज़ के निर्धारित हिस्सों में क़ुरआन पढ़ें। सूरह फ़ातिहा का सही उच्चारण सीखें।",
              "विस्तृत नियम क़िराअत वाले विषय में पढ़ें।"
            ]
          },
          {
            heading: "6. अभ्यास",
            paragraphs: [
              "तैयारी, नियत, तकबीर और क़ियाम को अलग-अलग सीखें, फिर शिक्षक के साथ पूरा क्रम दोहराएँ।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 7 — QIRA'AT
       ----------------------------------------- */

    {
      id: "qirat",

      title: {
        bn: "কিরাত",
        en: "Qira'at",
        hi: "क़िराअत"
      },

      intro: {
        bn: "কিরাত হলো নামাজে কুরআন তিলাওয়াত। সঠিক উচ্চারণ, ধীরে পড়া এবং আয়াতের অর্থ বোঝার চেষ্টা একজন শিক্ষার্থীর জন্য গুরুত্বপূর্ণ।",
        en: "Qira'at is Qur'anic recitation during prayer. Correct pronunciation, measured recitation and understanding the meaning are important.",
        hi: "क़िराअत नमाज़ में क़ुरआन पढ़ना है। सही उच्चारण, ठहरकर पढ़ना और अर्थ समझना महत्वपूर्ण है।"
      },

      sections: {
        bn: [
          {
            heading: "১. কিরাত কী?",
            paragraphs: [
              "নামাজে কুরআনের আয়াত তিলাওয়াত করাকে কিরাত বলা হয়। কোন রাকাতে কী পড়তে হবে এবং কতটুকু পড়তে হবে, তার বিস্তারিত বিধান নামাজের ধরন ও ফিকহ অনুযায়ী শেখা উচিত।"
            ]
          },
          {
            heading: "২. সূরা ফাতিহা শেখা",
            paragraphs: [
              "সূরা ফাতিহা নামাজ শিক্ষার অন্যতম মৌলিক পাঠ। প্রথমে আরবি পাঠ শুনে শেখো, তারপর ধীরে ধীরে উচ্চারণ অনুশীলন করো।",
              "বাংলা হরফে উচ্চারণ শেখার প্রাথমিক সহায়তা পাওয়া যায়, কিন্তু বাংলা অক্ষর দিয়ে সব আরবি ধ্বনি নির্ভুলভাবে প্রকাশ করা সম্ভব নয়। তাই আরবি পাঠ ও শিক্ষকের সাহায্য জরুরি।"
            ]
          },
          {
            heading: "৩. ছোট সূরা শেখা",
            paragraphs: [
              "সূরা ফাতিহার পাশাপাশি ছোট সূরাগুলো ধীরে ধীরে শেখো। প্রতিটি সূরার আরবি পাঠ, সঠিক উচ্চারণ এবং বাংলা অর্থ আলাদা করে অনুশীলন করো।",
              "একবারে অনেক কিছু মুখস্থ করার চেষ্টা না করে ছোট অংশ বারবার পড়ো এবং ভুল সংশোধন করো।"
            ]
          },
          {
            heading: "৪. তিলাওয়াতের আদব",
            paragraphs: [
              "স্পষ্টভাবে এবং মনোযোগ দিয়ে পড়ো। অযথা তাড়াহুড়ো কোরো না। আয়াতের শব্দ ও হরফ সঠিকভাবে উচ্চারণ করার চেষ্টা করো।",
              "শুধু বাংলা উচ্চারণ দেখে আরবি তিলাওয়াতের পূর্ণ শুদ্ধতা নিশ্চিত করা যায় না। অভিজ্ঞ কারির কাছে পড়া শুনিয়ে নেওয়া উপকারী।"
            ]
          },
          {
            heading: "৫. নীরব ও উচ্চস্বরে কিরাত",
            paragraphs: [
              "বিভিন্ন নামাজে কিরাত উচ্চস্বরে বা নিচু স্বরে পড়ার বিধান রয়েছে। কোন নামাজে কী পদ্ধতি, তা নিজের অনুসৃত ফিকহ ও জামাতের নিয়ম অনুযায়ী শেখো।"
            ]
          },
          {
            heading: "৬. অনুশীলন পদ্ধতি",
            paragraphs: [
              "প্রথমে একটি ছোট অংশ শুনে পড়ো। তারপর নিজের উচ্চারণ শিক্ষককে শুনিয়ে সংশোধন করো। শেষে অর্থ পড়ে বোঝার চেষ্টা করো। এই তিন ধাপ নিয়মিত অনুসরণ করলে শেখা সহজ হয়।"
            ]
          }
        ],

        en: [
          {
            heading: "1. What is Qira'at?",
            paragraphs: [
              "Qira'at is the recitation of Qur'anic verses during prayer. The required recitation depends on the prayer and the relevant school of jurisprudence."
            ]
          },
          {
            heading: "2. Learning Surah Al-Fatihah",
            paragraphs: [
              "Surah Al-Fatihah is a foundational part of prayer learning. Listen to the Arabic recitation and practise the pronunciation slowly.",
              "Transliteration can help beginners, but another alphabet cannot represent every Arabic sound accurately. Learning the Arabic text with a teacher is important."
            ]
          },
          {
            heading: "3. Learning short surahs",
            paragraphs: [
              "Learn short surahs gradually. Practise the Arabic text, pronunciation and meaning separately.",
              "Work on small passages repeatedly instead of trying to memorize too much at once."
            ]
          },
          {
            heading: "4. Recitation etiquette",
            paragraphs: [
              "Recite clearly and attentively. Avoid unnecessary rushing and work on accurate pronunciation.",
              "A qualified reciter can help correct errors that transliteration alone cannot reveal."
            ]
          },
          {
            heading: "5. Audible and quiet recitation",
            paragraphs: [
              "Some prayers include audible recitation and others quiet recitation. Learn the applicable rules according to your school and congregational practice."
            ]
          },
          {
            heading: "6. Practice method",
            paragraphs: [
              "Listen to a short passage, recite it, ask a teacher to correct your pronunciation and then study its meaning."
            ]
          }
        ],

        hi: [
          {
            heading: "1. क़िराअत क्या है?",
            paragraphs: [
              "नमाज़ में क़ुरआन की आयतें पढ़ने को क़िराअत कहते हैं। कौन-सी नमाज़ में क्या पढ़ना है, यह संबंधित नियमों के अनुसार सीखें।"
            ]
          },
          {
            heading: "2. सूरह फ़ातिहा सीखना",
            paragraphs: [
              "सूरह फ़ातिहा नमाज़ सीखने का बुनियादी हिस्सा है। पहले अरबी पाठ सुनें, फिर धीरे-धीरे उच्चारण करें।",
              "लिप्यंतरण मदद कर सकता है, लेकिन हर अरबी ध्वनि को दूसरी लिपि में सही दिखाना संभव नहीं है।"
            ]
          },
          {
            heading: "3. छोटी सूरतें सीखना",
            paragraphs: [
              "छोटी सूरतें धीरे-धीरे सीखें। अरबी पाठ, उच्चारण और अर्थ का अलग-अलग अभ्यास करें।",
              "एक साथ बहुत कुछ याद करने के बजाय छोटे हिस्से बार-बार दोहराएँ।"
            ]
          },
          {
            heading: "4. तिलावत का आदब",
            paragraphs: [
              "साफ़ और ध्यान से पढ़ें। जल्दबाज़ी से बचें और सही उच्चारण का अभ्यास करें।",
              "योग्य क़ारी से सुनकर उच्चारण सुधारना उपयोगी है।"
            ]
          },
          {
            heading: "5. धीमी और ऊँची आवाज़ में पढ़ना",
            paragraphs: [
              "कुछ नमाज़ों में ऊँची और कुछ में धीमी आवाज़ से क़िराअत की जाती है। अपने फ़िक़्ह के अनुसार नियम सीखें।"
            ]
          },
          {
            heading: "6. अभ्यास",
            paragraphs: [
              "छोटा पाठ सुनें, उसे पढ़ें, शिक्षक से उच्चारण सुधारें और फिर उसका अर्थ समझें।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 8 — RUKU
       ----------------------------------------- */

    {
      id: "ruku",

      title: {
        bn: "রুকু",
        en: "Ruku",
        hi: "रुकू"
      },

      intro: {
        bn: "রুকু নামাজের একটি গুরুত্বপূর্ণ ভঙ্গি। কীভাবে রুকুতে যেতে হয়, কীভাবে স্থির থাকতে হয় এবং রুকু থেকে কীভাবে উঠতে হয়, তা ধাপে ধাপে শিখে নাও।",
        en: "Ruku is an important posture in prayer. Learn how to bow, remain composed and rise correctly.",
        hi: "रुकू नमाज़ की महत्वपूर्ण मुद्रा है। इसमें झुकना, इत्मीनान रखना और फिर सीधे खड़े होना सीखें।"
      },

      sections: {
        bn: [
          {
            heading: "১. রুকুতে যাওয়া",
            paragraphs: [
              "কিরাতের পর শেখানো পদ্ধতিতে তাকবির বলে রুকুতে যাওয়া হয়। নড়াচড়া যেন নিয়ন্ত্রিত ও স্বাভাবিক হয়।"
            ]
          },
          {
            heading: "২. রুকুর ভঙ্গি",
            paragraphs: [
              "রুকুতে শরীর সামনের দিকে ঝুঁকে থাকে এবং হাত হাঁটুর ওপর রাখা হয়। পিঠ ও শরীরের অবস্থান সম্পর্কে সঠিক ব্যবহারিক পদ্ধতি শিক্ষক থেকে শিখে নাও।",
              "যাদের শারীরিক অসুবিধা আছে, তাদের জন্য প্রযোজ্য বিধান আলাদা হতে পারে।"
            ]
          },
          {
            heading: "৩. রুকুর তাসবিহ",
            paragraphs: [
              "রুকুতে সাধারণভাবে এই তাসবিহ পড়া হয়:"
            ],
            arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
            transliteration: "সুবহানা রব্বিয়াল আযীম",
            meaning: "অর্থ: আমার মহান প্রতিপালক পবিত্র।"
          },
          {
            heading: "৪. রুকুতে স্থিরতা",
            paragraphs: [
              "রুকুতে গিয়ে সঙ্গে সঙ্গে উঠে না পড়ে স্থির হও। নামাজে প্রতিটি ভঙ্গির নিজস্ব গুরুত্ব রয়েছে।",
              "কতবার তাসবিহ পড়বে, তা প্রচলিত শিক্ষা ও নিজের অনুসৃত ফিকহ অনুযায়ী শিখে নাও।"
            ]
          },
          {
            heading: "৫. রুকু থেকে ওঠা",
            paragraphs: [
              "রুকু থেকে উঠে সোজা হয়ে দাঁড়াও এবং স্থির হও। এরপর শেখানো পদ্ধতিতে পরবর্তী ভঙ্গি, অর্থাৎ সিজদায় যাও।",
              "রুকু থেকে ওঠার সময়ের জিকির ও তার উচ্চারণ নির্ভরযোগ্য পাঠ থেকে শিখে নাও।"
            ]
          },
          {
            heading: "৬. সাধারণ ভুল",
            paragraphs: [
              "অতিরিক্ত তাড়াহুড়ো করা, রুকুর ভঙ্গি না বুঝে করা এবং সোজা হয়ে দাঁড়ানোর আগেই পরবর্তী ভঙ্গিতে চলে যাওয়া এড়িয়ে চলো।",
              "শিক্ষকের সামনে নামাজের ভঙ্গিগুলো অনুশীলন করলে ভুল সংশোধন করা সহজ হয়।"
            ]
          }
        ],

        en: [
          {
            heading: "1. Entering ruku",
            paragraphs: [
              "After recitation, enter ruku with the prescribed takbir. Keep the movement controlled and natural."
            ]
          },
          {
            heading: "2. Ruku posture",
            paragraphs: [
              "In ruku, bend forward and place the hands on the knees. Learn the correct body position from a qualified teacher.",
              "People with physical limitations may have different applicable rulings."
            ]
          },
          {
            heading: "3. Tasbih of ruku",
            paragraphs: [
              "A commonly recited glorification during ruku is:"
            ],
            arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
            transliteration: "Subhana Rabbiyal Adheem",
            meaning: "Meaning: Glory be to my Lord, the Magnificent."
          },
          {
            heading: "4. Remaining composed",
            paragraphs: [
              "Remain composed in ruku instead of immediately rising. Each posture has its place in prayer.",
              "Learn the customary number of repetitions according to your practice."
            ]
          },
          {
            heading: "5. Rising from ruku",
            paragraphs: [
              "Rise upright and remain still before moving into sujood.",
              "Learn the remembrance said when rising from ruku from a reliable source."
            ]
          },
          {
            heading: "6. Common mistakes",
            paragraphs: [
              "Avoid rushing, using an incorrect posture and moving on before standing upright.",
              "Practising the postures with a teacher helps correct mistakes."
            ]
          }
        ],

        hi: [
          {
            heading: "1. रुकू में जाना",
            paragraphs: [
              "क़िराअत के बाद निर्धारित तकबीर के साथ रुकू करें। हरकत नियंत्रित और स्वाभाविक रखें।"
            ]
          },
          {
            heading: "2. रुकू की मुद्रा",
            paragraphs: [
              "रुकू में आगे झुककर हाथ घुटनों पर रखे जाते हैं। सही मुद्रा योग्य शिक्षक से सीखें।",
              "शारीरिक कठिनाई होने पर अलग नियम लागू हो सकते हैं।"
            ]
          },
          {
            heading: "3. रुकू की तस्बीह",
            paragraphs: [
              "रुकू में आम तौर पर यह तस्बीह पढ़ी जाती है:"
            ],
            arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
            transliteration: "सुब्हाना रब्बियल अज़ीम",
            meaning: "अर्थ: मेरा महान पालनहार पाक है।"
          },
          {
            heading: "4. इत्मीनान",
            paragraphs: [
              "रुकू में ठहरें और तुरंत न उठें। हर मुद्रा का अपना महत्व है।",
              "तस्बीह की संख्या अपने सीखे हुए तरीक़े के अनुसार जानें।"
            ]
          },
          {
            heading: "5. रुकू से उठना",
            paragraphs: [
              "सीधे खड़े हों और स्थिर होने के बाद सज्दे में जाएँ।",
              "रुकू से उठते समय पढ़े जाने वाले ज़िक्र को विश्वसनीय स्रोत से सीखें।"
            ]
          },
          {
            heading: "6. आम ग़लतियाँ",
            paragraphs: [
              "जल्दबाज़ी, गलत मुद्रा और सीधे खड़े होने से पहले आगे बढ़ने से बचें।",
              "शिक्षक के साथ अभ्यास करने से ग़लतियाँ सुधरती हैं।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 9 — SUJOOD
       ----------------------------------------- */

    {
      id: "sujood",

      title: {
        bn: "সিজদা",
        en: "Sujood",
        hi: "सज्दा"
      },

      intro: {
        bn: "সিজদা নামাজের অত্যন্ত গুরুত্বপূর্ণ অংশ। সিজদার ভঙ্গি, তাসবিহ, দুই সিজদার মাঝের বসা এবং স্থিরতার বিষয়গুলো ভালোভাবে শেখো।",
        en: "Sujood is an essential part of prayer. Learn its posture, tasbih, the sitting between prostrations and the importance of composure.",
        hi: "सज्दा नमाज़ का महत्वपूर्ण हिस्सा है। इसकी मुद्रा, तस्बीह, दोनों सज्दों के बीच बैठना और इत्मीनान सीखें।"
      },

      sections: {
        bn: [
          {
            heading: "১. সিজদায় যাওয়া",
            paragraphs: [
              "রুকু থেকে উঠে সোজা হয়ে দাঁড়ানোর পর শেখানো পদ্ধতিতে সিজদায় যাও। নামাজের ভঙ্গিগুলোর ক্রম ঠিক রাখা জরুরি।"
            ]
          },
          {
            heading: "২. সিজদার ভঙ্গি",
            paragraphs: [
              "সিজদায় কপাল ও নাকসহ সিজদার নির্ধারিত অঙ্গগুলো যথাযথভাবে মাটিতে রাখা হয়। হাত, হাঁটু ও পায়ের অবস্থানও সঠিকভাবে শিখতে হবে।",
              "শারীরিক অসুবিধা থাকলে সিজদার বিকল্প পদ্ধতি সম্পর্কে নির্ভরযোগ্য শিক্ষক বা আলেমের পরামর্শ নাও।"
            ]
          },
          {
            heading: "৩. সিজদার তাসবিহ",
            paragraphs: [
              "সিজদায় সাধারণভাবে এই তাসবিহ পড়া হয়:"
            ],
            arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
            transliteration: "সুবহানা রব্বিয়াল আ'লা",
            meaning: "অর্থ: আমার সর্বোচ্চ প্রতিপালক পবিত্র।"
          },
          {
            heading: "৪. সিজদায় স্থির থাকা",
            paragraphs: [
              "সিজদায় গিয়ে স্থির থাকো এবং শেখানো তাসবিহ পড়ো। খুব দ্রুত সিজদা করে উঠে পড়া এড়িয়ে চলো।"
            ]
          },
          {
            heading: "৫. দুই সিজদার মাঝের বৈঠক",
            paragraphs: [
              "প্রথম সিজদার পর বসে স্থির হও, তারপর দ্বিতীয় সিজদা করো। বসার সঠিক ভঙ্গি ও সংশ্লিষ্ট দোয়া শিক্ষক থেকে শেখো।"
            ]
          },
          {
            heading: "৬. সাধারণ ভুল",
            paragraphs: [
              "সিজদার অঙ্গগুলোর অবস্থান অবহেলা করা, তাড়াহুড়ো করা এবং দুই সিজদার মাঝখানে একেবারেই না থামা—এসব বিষয়ে সচেতন হও।",
              "প্রয়োজনে একজন অভিজ্ঞ শিক্ষককে নিজের ভঙ্গি দেখিয়ে সংশোধন করো।"
            ]
          }
        ],

        en: [
          {
            heading: "1. Entering sujood",
            paragraphs: [
              "After rising upright from ruku, move into sujood according to the taught method. Keep the order of the postures correct."
            ]
          },
          {
            heading: "2. Sujood posture",
            paragraphs: [
              "Place the forehead and nose and the prescribed prostration points appropriately. Learn the correct placement of the hands, knees and feet.",
              "Ask a qualified teacher about alternatives if you have a physical limitation."
            ]
          },
          {
            heading: "3. Tasbih of sujood",
            paragraphs: [
              "A commonly recited glorification during sujood is:"
            ],
            arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
            transliteration: "Subhana Rabbiyal A'la",
            meaning: "Meaning: Glory be to my Lord, the Most High."
          },
          {
            heading: "4. Remaining composed",
            paragraphs: [
              "Remain composed in sujood and recite the taught glorification. Avoid rushing immediately out of the posture."
            ]
          },
          {
            heading: "5. Sitting between prostrations",
            paragraphs: [
              "After the first prostration, sit calmly before performing the second. Learn the sitting posture and its supplication from a teacher."
            ]
          },
          {
            heading: "6. Common mistakes",
            paragraphs: [
              "Pay attention to the required posture, avoid rushing and do not omit the pause between prostrations.",
              "A qualified teacher can help correct your posture."
            ]
          }
        ],

        hi: [
          {
            heading: "1. सज्दे में जाना",
            paragraphs: [
              "रुकू से सीधे खड़े होने के बाद सिखाए गए तरीक़े से सज्दा करें। नमाज़ का क्रम सही रखें।"
            ]
          },
          {
            heading: "2. सज्दे की मुद्रा",
            paragraphs: [
              "माथा और नाक सहित निर्धारित अंगों को सही तरीक़े से रखें। हाथों, घुटनों और पैरों की स्थिति भी सीखें।",
              "शारीरिक कठिनाई हो तो योग्य शिक्षक से मार्गदर्शन लें।"
            ]
          },
          {
            heading: "3. सज्दे की तस्बीह",
            paragraphs: [
              "सज्दे में आम तौर पर यह तस्बीह पढ़ी जाती है:"
            ],
            arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
            transliteration: "सुब्हाना रब्बियल आला",
            meaning: "अर्थ: मेरा सर्वोच्च पालनहार पाक है।"
          },
          {
            heading: "4. इत्मीनान",
            paragraphs: [
              "सज्दे में ठहरें और तस्बीह पढ़ें। तुरंत उठने की जल्दबाज़ी न करें।"
            ]
          },
          {
            heading: "5. दोनों सज्दों के बीच",
            paragraphs: [
              "पहले सज्दे के बाद बैठें और फिर दूसरा सज्दा करें। बैठने की मुद्रा और दुआ शिक्षक से सीखें।"
            ]
          },
          {
            heading: "6. आम ग़लतियाँ",
            paragraphs: [
              "मुद्रा की अनदेखी, जल्दबाज़ी और दोनों सज्दों के बीच न ठहरने से बचें।",
              "ज़रूरत पर शिक्षक से मुद्रा ठीक करवाएँ।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 10 — TASHAHHUD & DUAS
       ----------------------------------------- */

    {
      id: "tashahhud",

      title: {
        bn: "বৈঠক ও দোয়া",
        en: "Sitting & Supplications",
        hi: "बैठक और दुआएँ"
      },

      intro: {
        bn: "নামাজের বৈঠকে কীভাবে বসতে হয়, তাশাহহুদ কী এবং শেষ বৈঠকে কী পড়া হয়—এসব ধাপে ধাপে শিখে নাও।",
        en: "Learn the sitting postures, Tashahhud and the recitations of the final sitting.",
        hi: "बैठने की मुद्रा, तशह्हुद और आख़िरी बैठक की पढ़ाई सीखें।"
      },

      sections: {
        bn: [
          {
            heading: "১. বৈঠক কখন হয়?",
            paragraphs: [
              "নামাজের নির্ধারিত পর্যায়ে বসে তাশাহহুদ পড়া হয়। দুই রাকাতের নামাজে শেষ বৈঠক থাকে; তিন বা চার রাকাতের নামাজে মধ্যবর্তী ও শেষ বৈঠক থাকতে পারে।",
              "কোন নামাজে কখন বসতে হবে, তা নামাজের ধরন অনুযায়ী শিখে নাও।"
            ]
          },
          {
            heading: "২. তাশাহহুদ শেখা",
            paragraphs: [
              "তাশাহহুদ বা আত্তাহিয়্যাতু আরবি পাঠ। এটি সঠিক উচ্চারণে শেখার জন্য প্রথমে অভিজ্ঞ পাঠকের কাছ থেকে শুনে নাও।",
              "বাংলা উচ্চারণ কেবল সহায়ক। আরবি হরফের সব ধ্বনি বাংলা অক্ষরে পুরোপুরি প্রকাশ করা যায় না।"
            ]
          },
          {
            heading: "৩. আঙুলের ইশারা ও বসার ভঙ্গি",
            paragraphs: [
              "বৈঠকে বসার ভঙ্গি এবং তাশাহহুদে আঙুলের ইশারা সম্পর্কে বিভিন্ন ফিকহি পদ্ধতি রয়েছে। নিজের অনুসৃত শিক্ষার সঙ্গে মিলিয়ে সঠিক পদ্ধতি শিখে নাও।"
            ]
          },
          {
            heading: "৪. দরুদ শরিফ",
            paragraphs: [
              "শেষ বৈঠকে দরুদ পড়ার পদ্ধতি শেখো। আরবি পাঠ, উচ্চারণ এবং অর্থ একসঙ্গে শিখলে তা মনে রাখা সহজ হয়।",
              "দরুদের বিভিন্ন বর্ণনা ও পাঠ রয়েছে; নির্ভরযোগ্য পাঠ্যসূত্র অনুসরণ করো।"
            ]
          },
          {
            heading: "৫. শেষ বৈঠকের দোয়া",
            paragraphs: [
              "শেষ বৈঠকে শেখানো দোয়া পড়া হয়। দোয়ার পাঠ ও অবস্থান নিজের অনুসৃত ফিকহ অনুযায়ী নির্ভরযোগ্য শিক্ষকের কাছ থেকে জেনে নাও।"
            ]
          },
          {
            heading: "৬. শেখার সহজ পদ্ধতি",
            paragraphs: [
              "প্রথমে তাশাহহুদ, তারপর দরুদ এবং তারপর নির্ধারিত দোয়া আলাদাভাবে শেখো। প্রতিটির আরবি পাঠ, উচ্চারণ ও অর্থ অনুশীলন করো।",
              "সঠিক পাঠ নিশ্চিত করতে অভিজ্ঞ শিক্ষককে শুনিয়ে নাও।"
            ]
          }
        ],

        en: [
          {
            heading: "1. When does sitting occur?",
            paragraphs: [
              "Tashahhud is recited during the prescribed sitting in prayer. Two-rakat prayers have a final sitting, while three- and four-rakat prayers may include an earlier sitting as well.",
              "Learn the sequence for each prayer."
            ]
          },
          {
            heading: "2. Learning Tashahhud",
            paragraphs: [
              "Tashahhud, also called At-Tahiyyat, is an Arabic recitation. Listen to a qualified reciter and practise the pronunciation.",
              "Transliteration is only a learning aid and cannot fully represent every Arabic sound."
            ]
          },
          {
            heading: "3. Sitting posture and finger gesture",
            paragraphs: [
              "Schools of jurisprudence have different details regarding sitting and the finger gesture during Tashahhud. Learn the method you follow."
            ]
          },
          {
            heading: "4. Salawat",
            paragraphs: [
              "Learn the salawat recited in the final sitting. Studying the Arabic text, pronunciation and meaning together helps memorization.",
              "Follow a reliable source for the particular wording."
            ]
          },
          {
            heading: "5. Supplications in the final sitting",
            paragraphs: [
              "Learn the prescribed supplications and when they are recited according to your school of jurisprudence."
            ]
          },
          {
            heading: "6. A simple learning method",
            paragraphs: [
              "Study Tashahhud, salawat and the relevant supplication separately. Practise the Arabic text, pronunciation and meaning.",
              "Have a qualified teacher check your recitation."
            ]
          }
        ],

        hi: [
          {
            heading: "1. बैठक कब होती है?",
            paragraphs: [
              "नमाज़ की निर्धारित बैठक में तशह्हुद पढ़ा जाता है। दो रकअत की नमाज़ में आख़िरी बैठक होती है; तीन या चार रकअत की नमाज़ में पहले की बैठक भी हो सकती है।",
              "हर नमाज़ का क्रम अलग से सीखें।"
            ]
          },
          {
            heading: "2. तशह्हुद सीखना",
            paragraphs: [
              "तशह्हुद, जिसे अत्तहिय्यात भी कहा जाता है, अरबी पाठ है। सही उच्चारण के लिए योग्य पाठक से सुनें।",
              "लिप्यंतरण केवल मदद है; हर अरबी ध्वनि दूसरी लिपि में पूरी तरह नहीं लिखी जा सकती।"
            ]
          },
          {
            heading: "3. बैठने की मुद्रा और उँगली का इशारा",
            paragraphs: [
              "बैठने और तशह्हुद में उँगली के इशारे के विवरण फ़िक़्ह के अनुसार अलग हो सकते हैं। अपना सीखा हुआ तरीक़ा अपनाएँ।"
            ]
          },
          {
            heading: "4. दरूद शरीफ़",
            paragraphs: [
              "आख़िरी बैठक में पढ़ा जाने वाला दरूद सीखें। अरबी पाठ, उच्चारण और अर्थ साथ सीखना उपयोगी है।",
              "विश्वसनीय स्रोत से सही पाठ सीखें।"
            ]
          },
          {
            heading: "5. आख़िरी बैठक की दुआ",
            paragraphs: [
              "आख़िरी बैठक की दुआएँ अपने फ़िक़्ह के अनुसार विश्वसनीय शिक्षक से सीखें।"
            ]
          },
          {
            heading: "6. सीखने का आसान तरीक़ा",
            paragraphs: [
              "पहले तशह्हुद, फिर दरूद और फिर दुआ अलग-अलग सीखें। अरबी पाठ, उच्चारण और अर्थ का अभ्यास करें।",
              "शिक्षक से उच्चारण की जाँच करवाएँ।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 11 — SALAM & AFTER PRAYER
       ----------------------------------------- */

    {
      id: "after-prayer",

      title: {
        bn: "সালাম ও পরের আমল",
        en: "Salam & After Prayer",
        hi: "सलाम और नमाज़ के बाद"
      },

      intro: {
        bn: "নামাজ শেষ করার পদ্ধতি এবং নামাজের পরের জিকির ও দোয়া সম্পর্কে জানো। আরবি পাঠের পাশাপাশি উচ্চারণ ও অর্থ শেখার চেষ্টা করো।",
        en: "Learn how prayer concludes and how to approach remembrance and supplications afterward.",
        hi: "नमाज़ समाप्त करने और उसके बाद के ज़िक्र व दुआ के बारे में जानें।"
      },

      sections: {
        bn: [
          {
            heading: "১. সালাম ফিরিয়ে নামাজ শেষ করা",
            paragraphs: [
              "নামাজের শেষ পর্যায়ে নির্ধারিত পদ্ধতিতে সালাম ফিরিয়ে নামাজ শেষ করা হয়। সালামের উচ্চারণ ও মাথা ফেরানোর পদ্ধতি শিক্ষক থেকে শিখে নাও।"
            ]
          },
          {
            heading: "২. নামাজের পর জিকির",
            paragraphs: [
              "নামাজের পর বিভিন্ন মাসনুন জিকির পড়ার শিক্ষা রয়েছে। এগুলোর নির্ভরযোগ্য পাঠ, উচ্চারণ এবং অর্থ শেখো।",
              "কোন জিকির কতবার পড়তে হয়, তা যাচাই করা পাঠ্যসূত্র থেকে শিখে নাও।"
            ]
          },
          {
            heading: "৩. দোয়া করা",
            paragraphs: [
              "নামাজের পর দোয়া করতে পারো। পরিচিত দোয়াগুলোর অর্থ বোঝার চেষ্টা করো এবং আল্লাহর কাছে আন্তরিকভাবে প্রার্থনা করো।",
              "নির্দিষ্ট দোয়া ও আমলের ক্ষেত্রে নির্ভরযোগ্য বর্ণনা ও শিক্ষকের নির্দেশনা অনুসরণ করো।"
            ]
          },
          {
            heading: "৪. তাড়াহুড়ো না করা",
            paragraphs: [
              "নামাজ শেষ হওয়ার পরপরই তাড়াহুড়ো করে উঠে যাওয়ার বদলে সময় নিয়ে জিকির ও দোয়া শেখা যেতে পারে।",
              "মসজিদে জামাতের নিয়ম এবং অন্য মুসল্লিদের সুবিধার প্রতিও খেয়াল রাখো।"
            ]
          },
          {
            heading: "৫. নিয়মিত অনুশীলন",
            paragraphs: [
              "প্রথমে অল্প কয়েকটি নির্ভরযোগ্য জিকির শিখো। আরবি পাঠ, উচ্চারণ ও অর্থ বুঝে নিয়মিত অনুশীলন করো। পরে ধীরে ধীরে আরও শেখো।"
            ]
          }
        ],

        en: [
          {
            heading: "1. Concluding prayer with salam",
            paragraphs: [
              "Prayer concludes with salam in the prescribed manner. Learn the wording and head movement from a qualified teacher."
            ]
          },
          {
            heading: "2. Remembrance after prayer",
            paragraphs: [
              "There are established remembrances after prayer. Learn their reliable wording, pronunciation and meaning.",
              "Use a trustworthy source to learn the recommended repetitions."
            ]
          },
          {
            heading: "3. Supplication",
            paragraphs: [
              "You may make supplication after prayer. Learn the meaning of familiar supplications and pray sincerely.",
              "Follow reliable sources for specific prescribed supplications and practices."
            ]
          },
          {
            heading: "4. Avoid rushing",
            paragraphs: [
              "Instead of rushing away immediately, take time to learn and practise remembrance when appropriate.",
              "Respect congregational arrangements and the needs of others in the mosque."
            ]
          },
          {
            heading: "5. Regular practice",
            paragraphs: [
              "Begin with a few reliable remembrances. Practise the Arabic text, pronunciation and meaning before adding more."
            ]
          }
        ],

        hi: [
          {
            heading: "1. सलाम से नमाज़ समाप्त करना",
            paragraphs: [
              "नमाज़ का अंत निर्धारित तरीक़े से सलाम फेरकर होता है। पाठ और सिर घुमाने का तरीक़ा शिक्षक से सीखें।"
            ]
          },
          {
            heading: "2. नमाज़ के बाद ज़िक्र",
            paragraphs: [
              "नमाज़ के बाद मस्नून ज़िक्र पढ़े जाते हैं। उनका विश्वसनीय पाठ, उच्चारण और अर्थ सीखें।",
              "ज़िक्र की संख्या विश्वसनीय स्रोत से जानें।"
            ]
          },
          {
            heading: "3. दुआ",
            paragraphs: [
              "नमाज़ के बाद दुआ कर सकते हैं। दुआ का अर्थ समझें और अल्लाह से दिल से माँगें।",
              "विशेष अमल के लिए विश्वसनीय मार्गदर्शन अपनाएँ।"
            ]
          },
          {
            heading: "4. जल्दबाज़ी न करें",
            paragraphs: [
              "जहाँ उचित हो, नमाज़ के बाद ज़िक्र और दुआ के लिए समय निकालें।",
              "मस्जिद में जमाअत और दूसरों की सुविधा का ध्यान रखें।"
            ]
          },
          {
            heading: "5. नियमित अभ्यास",
            paragraphs: [
              "पहले कुछ विश्वसनीय ज़िक्र सीखें। अरबी पाठ, उच्चारण और अर्थ का अभ्यास करें, फिर धीरे-धीरे और सीखें।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 12 — COMPLETE PRAYER
       ----------------------------------------- */

    {
      id: "complete",

      title: {
        bn: "সম্পূর্ণ নামাজ",
        en: "Complete Prayer",
        hi: "पूरी नमाज़"
      },

      intro: {
        bn: "এই অধ্যায়ে নামাজের প্রস্তুতি থেকে সালাম পর্যন্ত পুরো ধারাবাহিকতা একসঙ্গে বুঝবে। আগে প্রতিটি বিষয় আলাদাভাবে শেখো, তারপর সব ধাপ মিলিয়ে অনুশীলন করো।",
        en: "This lesson brings together the sequence from preparation to salam. Learn the individual topics first, then practise the complete sequence.",
        hi: "इस पाठ में तैयारी से सलाम तक नमाज़ का पूरा क्रम दिया गया है। पहले अलग-अलग विषय सीखें, फिर पूरे क्रम का अभ्यास करें।"
      },

      sections: {
        bn: [
          {
            heading: "১. প্রথম ধাপ: প্রস্তুতি",
            paragraphs: [
              "ওজু ও প্রয়োজনীয় পবিত্রতা নিশ্চিত করো। পোশাক, নামাজের স্থান, কিবলা ও ওয়াক্ত যাচাই করো।"
            ]
          },
          {
            heading: "২. দ্বিতীয় ধাপ: নিয়ত ও তাকবির",
            paragraphs: [
              "কোন নামাজ আদায় করবে, তা মনে নির্ধারণ করো। এরপর শেখানো পদ্ধতিতে তাকবিরে তাহরিমার মাধ্যমে নামাজ শুরু করো।"
            ]
          },
          {
            heading: "৩. তৃতীয় ধাপ: কিয়াম ও কিরাত",
            paragraphs: [
              "সামর্থ্য থাকলে দাঁড়িয়ে কিরাত পড়ো। সূরা ফাতিহা ও প্রযোজ্য অতিরিক্ত কিরাতের পাঠ ও উচ্চারণ সঠিকভাবে শেখো।"
            ]
          },
          {
            heading: "৪. চতুর্থ ধাপ: রুকু",
            paragraphs: [
              "কিরাতের পর রুকুতে যাও। রুকুর ভঙ্গি ও তাসবিহ শিখে স্থির থাকো। তারপর শেখানো পদ্ধতিতে উঠে সোজা হয়ে দাঁড়াও।"
            ]
          },
          {
            heading: "৫. পঞ্চম ধাপ: সিজদা",
            paragraphs: [
              "সঠিক পদ্ধতিতে প্রথম সিজদা করো, এরপর বসে স্থির হও এবং দ্বিতীয় সিজদা করো। প্রতিটি ভঙ্গিতে তাড়াহুড়ো এড়িয়ে চলো।"
            ]
          },
          {
            heading: "৬. ষষ্ঠ ধাপ: পরবর্তী রাকাত",
            paragraphs: [
              "নামাজে যত রাকাত রয়েছে, সেই অনুযায়ী পরবর্তী রাকাতের কাজগুলো সম্পন্ন করো। কোথায় বসতে হবে এবং কোন রাকাতে কী পড়তে হবে, তা নামাজের ধরন অনুযায়ী শিখে নাও।"
            ]
          },
          {
            heading: "৭. সপ্তম ধাপ: বৈঠক ও তাশাহহুদ",
            paragraphs: [
              "নির্ধারিত বৈঠকে বসে তাশাহহুদ পড়ো। শেষ বৈঠকে দরুদ ও শেখানো দোয়া পড়ার পদ্ধতি শিখে নাও।"
            ]
          },
          {
            heading: "৮. অষ্টম ধাপ: সালাম",
            paragraphs: [
              "নামাজের শেষে নির্ধারিত পদ্ধতিতে সালাম ফিরিয়ে নামাজ শেষ করো।"
            ]
          },
          {
            heading: "৯. নামাজের পরে",
            paragraphs: [
              "নামাজের পরের জিকির ও দোয়া ধীরে ধীরে শেখো। আরবি পাঠের পাশাপাশি উচ্চারণ ও অর্থ বোঝার চেষ্টা করো।"
            ]
          },
          {
            heading: "১০. পূর্ণ অনুশীলন",
            paragraphs: [
              "শুধু লেখা পড়ে ভঙ্গি পুরোপুরি শেখা কঠিন হতে পারে। তাই একজন যোগ্য শিক্ষক বা নির্ভরযোগ্য ব্যবহারিক নির্দেশিকা অনুসরণ করে পুরো নামাজ অনুশীলন করো।",
              "কোনো বিশেষ বিধান নিয়ে সন্দেহ হলে নির্ভরযোগ্য আলেমের কাছে জেনে নাও।"
            ]
          }
        ],

        en: [
          {
            heading: "1. Preparation",
            paragraphs: [
              "Ensure wudu and the required purification. Check clothing, prayer place, Qibla and prayer time."
            ]
          },
          {
            heading: "2. Intention and opening takbir",
            paragraphs: [
              "Intend the particular prayer in your heart, then begin with the prescribed opening takbir."
            ]
          },
          {
            heading: "3. Standing and recitation",
            paragraphs: [
              "Stand when able and recite according to the prayer's requirements. Learn Surah Al-Fatihah and any additional recitation accurately."
            ]
          },
          {
            heading: "4. Ruku",
            paragraphs: [
              "Bow into ruku, learn its posture and glorification, and remain composed. Rise upright according to the taught method."
            ]
          },
          {
            heading: "5. Sujood",
            paragraphs: [
              "Perform the first prostration, sit calmly, and perform the second. Avoid rushing through the postures."
            ]
          },
          {
            heading: "6. Remaining rakats",
            paragraphs: [
              "Continue according to the number of rakats in the prayer. Learn the sitting points and recitations for each type of prayer."
            ]
          },
          {
            heading: "7. Sitting and Tashahhud",
            paragraphs: [
              "Sit at the prescribed points and recite Tashahhud. Learn the salawat and supplication of the final sitting."
            ]
          },
          {
            heading: "8. Salam",
            paragraphs: [
              "Conclude the prayer with salam in the prescribed manner."
            ]
          },
          {
            heading: "9. After prayer",
            paragraphs: [
              "Gradually learn the remembrances and supplications after prayer, including their pronunciation and meaning."
            ]
          },
          {
            heading: "10. Complete practice",
            paragraphs: [
              "Written instructions alone may not fully teach the physical postures. Practise with a qualified teacher or reliable practical guide.",
              "Ask a qualified scholar about specific rulings when needed."
            ]
          }
        ],

        hi: [
          {
            heading: "1. तैयारी",
            paragraphs: [
              "वुज़ू और आवश्यक पाकी सुनिश्चित करें। कपड़े, जगह, क़िबला और वक़्त जाँचें।"
            ]
          },
          {
            heading: "2. नियत और तकबीर",
            paragraphs: [
              "दिल में नमाज़ की नियत करें और निर्धारित तकबीर से शुरुआत करें।"
            ]
          },
          {
            heading: "3. क़ियाम और क़िराअत",
            paragraphs: [
              "सामर्थ्य होने पर खड़े होकर क़िराअत करें। सूरह फ़ातिहा का सही पाठ सीखें।"
            ]
          },
          {
            heading: "4. रुकू",
            paragraphs: [
              "रुकू करें, उसकी मुद्रा और तस्बीह सीखें, फिर सीधे खड़े हों।"
            ]
          },
          {
            heading: "5. सज्दा",
            paragraphs: [
              "पहला सज्दा करें, बैठकर ठहरें और दूसरा सज्दा करें। जल्दबाज़ी न करें।"
            ]
          },
          {
            heading: "6. बाकी रकअतें",
            paragraphs: [
              "नमाज़ की रकअतों के अनुसार आगे बढ़ें। हर नमाज़ में बैठने और पढ़ने का क्रम सीखें।"
            ]
          },
          {
            heading: "7. बैठक और तशह्हुद",
            paragraphs: [
              "निर्धारित बैठक में तशह्हुद पढ़ें। आख़िरी बैठक में दरूद और दुआ सीखें।"
            ]
          },
          {
            heading: "8. सलाम",
            paragraphs: [
              "निर्धारित तरीक़े से सलाम फेरकर नमाज़ पूरी करें।"
            ]
          },
          {
            heading: "9. नमाज़ के बाद",
            paragraphs: [
              "नमाज़ के बाद के ज़िक्र और दुआएँ धीरे-धीरे सीखें।"
            ]
          },
          {
            heading: "10. पूरा अभ्यास",
            paragraphs: [
              "केवल लिखित निर्देशों से शारीरिक मुद्राएँ पूरी तरह सीखना कठिन हो सकता है। योग्य शिक्षक के साथ अभ्यास करें।",
              "विशेष धार्मिक नियम के लिए योग्य आलिम से पूछें।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 13 — MISTAKES & CORRECTION
       ----------------------------------------- */

    {
      id: "mistakes",

      title: {
        bn: "ভুল ও সংশোধন",
        en: "Mistakes & Corrections",
        hi: "ग़लतियाँ और सुधार"
      },

      intro: {
        bn: "নামাজ শেখার সময় কিছু সাধারণ ভুল হতে পারে। ভুল বুঝে সংশোধন করা, তাড়াহুড়ো এড়ানো এবং প্রয়োজন হলে নির্ভরযোগ্য পরামর্শ নেওয়া গুরুত্বপূর্ণ।",
        en: "Beginners may make common mistakes. Learn to identify them, correct them carefully and seek reliable guidance when needed.",
        hi: "नमाज़ सीखते समय कुछ आम ग़लतियाँ हो सकती हैं। उन्हें पहचानना, सुधारना और ज़रूरत पर सही मार्गदर्शन लेना ज़रूरी है।"
      },

      sections: {
        bn: [
          {
            heading: "১. তাড়াহুড়ো করে নামাজ পড়া",
            paragraphs: [
              "রুকু, সিজদা এবং বৈঠকে খুব দ্রুত নড়াচড়া করলে ভঙ্গিগুলো ঠিকভাবে সম্পন্ন নাও হতে পারে। প্রতিটি ভঙ্গিতে স্থির থাকার অভ্যাস করো।"
            ]
          },
          {
            heading: "২. উচ্চারণের ভুল",
            paragraphs: [
              "আরবি কিরাত ও দোয়ায় উচ্চারণের ভুল হতে পারে। বাংলা উচ্চারণ দেখে শেখার পাশাপাশি আরবি পাঠ শুনো এবং অভিজ্ঞ শিক্ষকের কাছে সংশোধন করো।",
              "ভুলের গুরুত্ব সব ক্ষেত্রে এক নয়। কোনো নির্দিষ্ট উচ্চারণের কারণে নামাজের বিধান কী হবে, তা অনুমান করে সিদ্ধান্ত নিও না।"
            ]
          },
          {
            heading: "৩. অঙ্গের অবস্থান ভুল হওয়া",
            paragraphs: [
              "রুকু, সিজদা ও বৈঠকের ভঙ্গি বুঝে শেখা দরকার। লেখা পড়ে ধারণা পাওয়া যায়, কিন্তু ব্যবহারিকভাবে দেখিয়ে শেখা আরও কার্যকর।"
            ]
          },
          {
            heading: "৪. ওজুতে অসাবধানতা",
            paragraphs: [
              "ওজুর সময় প্রয়োজনীয় স্থানে পানি পৌঁছেছে কি না, তা স্বাভাবিকভাবে নিশ্চিত করো। অকারণে অতিরিক্ত পরীক্ষা বা পুনরাবৃত্তি কোরো না।"
            ]
          },
          {
            heading: "৫. নামাজে মনোযোগ নষ্ট হওয়া",
            paragraphs: [
              "নামাজের আগে অপ্রয়োজনীয় কাজ শেষ করে শান্তভাবে দাঁড়ানোর চেষ্টা করো। তিলাওয়াতের অর্থ শেখা মনোযোগ বাড়াতে সহায়তা করতে পারে।"
            ]
          },
          {
            heading: "৬. ভুল হলে কী করবে?",
            paragraphs: [
              "সব ভুলের বিধান এক নয়। ভুলে কোনো কাজ বাদ পড়া, কোনো কাজ অতিরিক্ত হওয়া অথবা উচ্চারণের ভুল—প্রতিটি পরিস্থিতির বিধান আলাদা হতে পারে।",
              "সিজদায়ে সাহু, নামাজ পুনরায় পড়া বা অন্য কোনো ব্যবস্থা প্রয়োজন কি না, তা নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নাও।"
            ]
          },
          {
            heading: "৭. ভুল সংশোধনের ভালো পদ্ধতি",
            paragraphs: [
              "প্রথমে নিজের ভুলটি নির্দিষ্ট করে বোঝো। তারপর নির্ভরযোগ্য শিক্ষক বা পাঠ্যসূত্র থেকে সঠিক পদ্ধতি শেখো। এরপর ধীরে ধীরে অনুশীলন করো।",
              "অন্য কারও নামাজ দেখে তাড়াহুড়ো করে তাকে ভুল বলার আগে বিধানটি ভালোভাবে যাচাই করো।"
            ]
          }
        ],

        en: [
          {
            heading: "1. Rushing through prayer",
            paragraphs: [
              "Moving too quickly through ruku, sujood and sitting may prevent the postures from being performed correctly. Practise remaining composed."
            ]
          },
          {
            heading: "2. Pronunciation mistakes",
            paragraphs: [
              "Mistakes may occur in Arabic recitation and supplications. Listen to Arabic recitation and have a qualified teacher correct your pronunciation.",
              "The rulings are not identical for every error. Do not assume the legal consequence of a particular pronunciation mistake."
            ]
          },
          {
            heading: "3. Incorrect posture",
            paragraphs: [
              "Learn the positions for ruku, sujood and sitting. Written explanations help, but practical demonstration is often more effective."
            ]
          },
          {
            heading: "4. Carelessness in wudu",
            paragraphs: [
              "Make sure water reaches the required areas without excessive checking or unnecessary repetition."
            ]
          },
          {
            heading: "5. Loss of focus",
            paragraphs: [
              "Complete unnecessary tasks before prayer and try to stand calmly. Understanding the recitation can help improve focus."
            ]
          },
          {
            heading: "6. What if a mistake occurs?",
            paragraphs: [
              "Different mistakes have different rulings. Omitting an action, adding an action and making a pronunciation mistake may require different responses.",
              "Ask a qualified scholar whether prostration of forgetfulness, repeating the prayer or another response applies."
            ]
          },
          {
            heading: "7. A good correction method",
            paragraphs: [
              "Identify the specific mistake, learn the correct method from a reliable source and practise slowly.",
              "Verify a ruling before judging another person's prayer."
            ]
          }
        ],

        hi: [
          {
            heading: "1. जल्दबाज़ी में नमाज़",
            paragraphs: [
              "रुकू, सज्दे और बैठक में जल्दबाज़ी करने से मुद्रा सही तरह पूरी नहीं हो सकती। इत्मीनान का अभ्यास करें।"
            ]
          },
          {
            heading: "2. उच्चारण की ग़लतियाँ",
            paragraphs: [
              "अरबी क़िराअत और दुआ में ग़लती हो सकती है। अरबी पाठ सुनें और योग्य शिक्षक से सुधार करवाएँ।",
              "हर ग़लती का हुक्म एक जैसा नहीं होता।"
            ]
          },
          {
            heading: "3. मुद्रा की ग़लती",
            paragraphs: [
              "रुकू, सज्दे और बैठक की मुद्रा सीखें। लिखित जानकारी के साथ व्यावहारिक प्रदर्शन भी उपयोगी है।"
            ]
          },
          {
            heading: "4. वुज़ू में लापरवाही",
            paragraphs: [
              "ज़रूरी जगहों तक पानी पहुँचाएँ। बिना वजह बार-बार जाँच न करें।"
            ]
          },
          {
            heading: "5. ध्यान भटकना",
            paragraphs: [
              "नमाज़ से पहले अनावश्यक काम समाप्त करें। तिलावत का अर्थ समझना ध्यान बढ़ाने में मदद कर सकता है।"
            ]
          },
          {
            heading: "6. ग़लती हो जाए तो?",
            paragraphs: [
              "हर ग़लती का हुक्म अलग हो सकता है। किसी अमल का छूटना, अतिरिक्त अमल होना या उच्चारण की ग़लती अलग स्थितियाँ हैं।",
              "सज्दा-ए-सहव या नमाज़ दोहराने की ज़रूरत के लिए योग्य आलिम से पूछें।"
            ]
          },
          {
            heading: "7. सुधार का अच्छा तरीक़ा",
            paragraphs: [
              "ग़लती पहचानें, विश्वसनीय स्रोत से सही तरीक़ा सीखें और धीरे-धीरे अभ्यास करें।",
              "दूसरे की नमाज़ पर राय देने से पहले नियम की पुष्टि करें।"
            ]
          }
        ]
      }
    },


    /* -----------------------------------------
       TOPIC 14 — JAMAAT & SPECIAL PRAYERS
       ----------------------------------------- */

    {
      id: "jamaat-special",

      title: {
        bn: "জামাত ও বিশেষ নামাজ",
        en: "Jamaat & Special Prayers",
        hi: "जमाअत और विशेष नमाज़ें"
      },

      intro: {
        bn: "জামাতে নামাজ, জুমা, ঈদ, বিতর, তারাবিহ ও জানাজার মতো বিশেষ নামাজের প্রাথমিক পরিচয় এবং শেখার পদ্ধতি জানো।",
        en: "Learn the basics of congregational prayer and special prayers such as Jumu'ah, Eid, Witr, Taraweeh and Janazah.",
        hi: "जमाअत, जुमा, ईद, वितर, तरावीह और जनाज़े जैसी विशेष नमाज़ों की बुनियादी बातें सीखें।"
      },

      sections: {
        bn: [
          {
            heading: "১. জামাতে নামাজ",
            paragraphs: [
              "জামাতে নামাজে একজন ইমাম নামাজ পরিচালনা করেন এবং মুসল্লিরা তাঁর অনুসরণ করেন। কাতার সোজা রাখা, শৃঙ্খলা বজায় রাখা এবং ইমামের আগে না এগোনো গুরুত্বপূর্ণ।",
              "ইমামের সঙ্গে কোন সময়ে কোন ভঙ্গি করতে হবে, তা ব্যবহারিকভাবে শিখে নাও।"
            ]
          },
          {
            heading: "২. জুমার নামাজ",
            paragraphs: [
              "জুমার নামাজের নিজস্ব শর্ত ও পদ্ধতি রয়েছে। খুতবা, জামাত এবং স্থানীয় ব্যবস্থার সঙ্গে সম্পর্কিত নিয়মগুলো নির্ভরযোগ্য শিক্ষক থেকে শেখো।",
              "কার ওপর জুমা প্রযোজ্য এবং বিশেষ পরিস্থিতিতে কী বিধান, তা নিজের অনুসৃত ফিকহ অনুযায়ী জেনে নাও।"
            ]
          },
          {
            heading: "৩. ঈদের নামাজ",
            paragraphs: [
              "ঈদের নামাজে সাধারণ দৈনিক নামাজের তুলনায় বিশেষ পদ্ধতি রয়েছে, যেমন অতিরিক্ত তাকবিরের বিধান। এগুলোর সংখ্যা ও পদ্ধতিতে ফিকহি পার্থক্য থাকতে পারে।",
              "নিজের এলাকার নির্ভরযোগ্য ইমাম বা শিক্ষকের কাছ থেকে ব্যবহারিকভাবে শিখে নাও।"
            ]
          },
          {
            heading: "৪. বিতর নামাজ",
            paragraphs: [
              "বিতর নামাজের রাকাত ও পদ্ধতি সম্পর্কে বিভিন্ন ফিকহি ব্যাখ্যা রয়েছে। হানাফি ফিকহে বিতরের বিশেষ গুরুত্ব ও পদ্ধতি রয়েছে।",
              "কুনুতের দোয়া এবং তা পড়ার স্থান নিজের অনুসৃত পদ্ধতি অনুযায়ী শেখো।"
            ]
          },
          {
            heading: "৫. তারাবিহ",
            paragraphs: [
              "রমজানে তারাবিহ নামাজ পড়া হয়। রাকাতের সংখ্যা ও কিছু বিস্তারিত বিষয়ে বিভিন্ন প্রচলিত ফিকহি পদ্ধতি রয়েছে।",
              "নিজের অনুসৃত শিক্ষার ভিত্তিতে নির্ভরযোগ্য ইমামের কাছ থেকে তারাবিহর পদ্ধতি শিখে নাও।"
            ]
          },
          {
            heading: "৬. জানাজার নামাজ",
            paragraphs: [
              "জানাজার নামাজ মৃত মুসলিমের জন্য বিশেষ দোয়া ও ইবাদত। এতে সাধারণ রুকু ও সিজদা থাকে না; নির্ধারিত তাকবির ও দোয়ার পদ্ধতি রয়েছে।",
              "জানাজার নামাজের পূর্ণ পদ্ধতি, দোয়া এবং ইমামের অনুসরণ করার নিয়ম শিক্ষক থেকে শেখো।"
            ]
          },
          {
            heading: "৭. বিশেষ পরিস্থিতির নামাজ",
            paragraphs: [
              "সফর, অসুস্থতা বা অন্য বিশেষ পরিস্থিতিতে নামাজের কিছু বিধান আলাদা হতে পারে। এসব ক্ষেত্রে নিজে অনুমান না করে নির্ভরযোগ্য আলেমের নির্দেশনা নাও।"
            ]
          },
          {
            heading: "৮. শেখার পরিকল্পনা",
            paragraphs: [
              "প্রথমে জামাতে নামাজের সাধারণ নিয়ম শেখো। এরপর জুমা, ঈদ, বিতর, তারাবিহ ও জানাজার পদ্ধতি আলাদাভাবে পড়ো।",
              "প্রতিটি বিশেষ নামাজের আরবি দোয়া, উচ্চারণ, অর্থ এবং ব্যবহারিক ধাপ যাচাইযোগ্য উৎস থেকে শেখো।"
            ]
          }
        ],

        en: [
          {
            heading: "1. Congregational prayer",
            paragraphs: [
              "In congregational prayer, an imam leads and the worshippers follow. Keep the rows orderly and do not move ahead of the imam.",
              "Learn the timing of each posture in relation to the imam."
            ]
          },
          {
            heading: "2. Friday prayer",
            paragraphs: [
              "Jumu'ah has its own conditions and procedure. Learn the rules concerning the sermon, congregation and local arrangements from a qualified teacher.",
              "Ask about eligibility and exceptional circumstances according to your school of jurisprudence."
            ]
          },
          {
            heading: "3. Eid prayer",
            paragraphs: [
              "Eid prayer includes special procedures, including additional takbirs. Details can differ among schools of jurisprudence.",
              "Learn the practical method from a reliable local imam or teacher."
            ]
          },
          {
            heading: "4. Witr",
            paragraphs: [
              "There are different jurisprudential explanations regarding Witr. Hanafi jurisprudence has its particular method and rulings.",
              "Learn the Qunut supplication and where it is recited according to your practice."
            ]
          },
          {
            heading: "5. Taraweeh",
            paragraphs: [
              "Taraweeh is performed during Ramadan. Common legal traditions differ on some details, including the number of rakats.",
              "Learn the method from a reliable imam according to the practice you follow."
            ]
          },
          {
            heading: "6. Janazah prayer",
            paragraphs: [
              "Janazah is a special prayer and supplication for a deceased Muslim. It does not include the usual ruku and sujood; it has prescribed takbirs and supplications.",
              "Learn the complete procedure and supplications from a qualified teacher."
            ]
          },
          {
            heading: "7. Special circumstances",
            paragraphs: [
              "Travel, illness and other special circumstances can affect some prayer rulings. Seek reliable guidance rather than guessing."
            ]
          },
          {
            heading: "8. Learning plan",
            paragraphs: [
              "Start with congregational prayer, then study Jumu'ah, Eid, Witr, Taraweeh and Janazah separately.",
              "Learn the Arabic supplications, pronunciation, meanings and practical steps from reliable sources."
            ]
          }
        ],

        hi: [
          {
            heading: "1. जमाअत की नमाज़",
            paragraphs: [
              "जमाअत में इमाम नमाज़ पढ़ाते हैं और लोग उनका अनुसरण करते हैं। सफ़ सीधी रखें और इमाम से आगे न बढ़ें।",
              "इमाम के साथ हर मुद्रा का समय सीखें।"
            ]
          },
          {
            heading: "2. जुमा की नमाज़",
            paragraphs: [
              "जुमा के अपने नियम और तरीक़े हैं। ख़ुत्बा, जमाअत और स्थानीय व्यवस्था से जुड़े नियम योग्य शिक्षक से सीखें।",
              "विशेष परिस्थिति में अपने फ़िक़्ह के अनुसार मार्गदर्शन लें।"
            ]
          },
          {
            heading: "3. ईद की नमाज़",
            paragraphs: [
              "ईद की नमाज़ में अतिरिक्त तकबीरों सहित विशेष नियम हैं। कुछ विवरण फ़िक़्ह के अनुसार अलग हो सकते हैं।",
              "स्थानीय विश्वसनीय इमाम से व्यावहारिक तरीक़ा सीखें।"
            ]
          },
          {
            heading: "4. वितर",
            paragraphs: [
              "वितर की रकअत और तरीक़े के बारे में अलग-अलग फ़िक़्ही व्याख्याएँ हैं। हनफ़ी फ़िक़्ह में इसका विशेष तरीक़ा है।",
              "क़ुनूत की दुआ और उसका स्थान अपने तरीक़े के अनुसार सीखें।"
            ]
          },
          {
            heading: "5. तरावीह",
            paragraphs: [
              "रमज़ान में तरावीह पढ़ी जाती है। रकअतों की संख्या और कुछ विवरणों में फ़िक़्ही अंतर हैं।",
              "विश्वसनीय इमाम से अपना तरीक़ा सीखें।"
            ]
          },
          {
            heading: "6. जनाज़े की नमाज़",
            paragraphs: [
              "जनाज़े की नमाज़ मृत मुस्लिम के लिए विशेष दुआ है। इसमें सामान्य रुकू और सज्दा नहीं होते; निर्धारित तकबीरें और दुआएँ होती हैं।",
              "पूरी विधि योग्य शिक्षक से सीखें।"
            ]
          },
          {
            heading: "7. विशेष परिस्थितियाँ",
            paragraphs: [
              "सफ़र, बीमारी और दूसरी विशेष स्थितियों में कुछ नियम अलग हो सकते हैं। योग्य आलिम से मार्गदर्शन लें।"
            ]
          },
          {
            heading: "8. सीखने की योजना",
            paragraphs: [
              "पहले जमाअत की सामान्य बातें सीखें। फिर जुमा, ईद, वितर, तरावीह और जनाज़े को अलग-अलग पढ़ें।",
              "अरबी दुआ, उच्चारण, अर्थ और व्यावहारिक चरण विश्वसनीय स्रोत से सीखें।"
            ]
          }
        ]
      }
    }
  ];


  /* =========================================
     4. FIND PAGE ELEMENTS
     ========================================= */

  const titleElement = document.getElementById("lesson-title");
  const badgeElement = document.getElementById("lesson-number");
  const introElement = document.getElementById("lesson-intro");
  const contentElement = document.getElementById("lesson-content");

  if (
    !titleElement ||
    !badgeElement ||
    !introElement ||
    !contentElement
  ) {
    console.error(
      "IBADAT: Required lesson elements were not found in namaz-detail.html."
    );
    return;
  }


  /* =========================================
     5. SAFE CONTENT HELPERS
     ========================================= */

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

  function addParagraphs(container, paragraphs) {
    if (!Array.isArray(paragraphs)) {
      return;
    }

    paragraphs.forEach(text => {
      container.appendChild(
        createElement("p", "", text)
      );
    });
  }

  function addArabicBlock(container, section, lang) {
    if (!section.arabic) {
      return;
    }

    const arabic = createElement(
      "div",
      "arabic",
      section.arabic
    );

    arabic.setAttribute("dir", "rtl");
    arabic.setAttribute("lang", "ar");
    arabic.setAttribute("aria-label", "Arabic prayer text");

    container.appendChild(arabic);

    if (section.transliteration) {
      const label =
        lang === "en"
          ? "Pronunciation: "
          : lang === "hi"
            ? "उच्चारण: "
            : "উচ্চারণ: ";

      const transliteration = createElement(
        "p",
        "transliteration",
        label + section.transliteration
      );

      container.appendChild(transliteration);
    }

    if (section.meaning) {
      const label =
        lang === "en"
          ? "Meaning: "
          : lang === "hi"
            ? "अर्थ: "
            : "অর্থ: ";

      const meaning = createElement(
        "p",
        "meaning",
        label + section.meaning
      );

      container.appendChild(meaning);
    }
  }


  /* =========================================
     6. RENDER A LESSON SECTION
     ========================================= */

  function renderSection(section, lang) {
    const wrapper = document.createDocumentFragment();

    if (section.heading) {
      wrapper.appendChild(
        createElement("h2", "", section.heading)
      );
    }

    addParagraphs(wrapper, section.paragraphs);
    addArabicBlock(wrapper, section, lang);

    return wrapper;
  }


  /* =========================================
     7. SHOW INVALID TOPIC MESSAGE
     ========================================= */

  function showNotFound() {
    document.title = ui.notFound + " | IBADAT";

    titleElement.textContent = ui.notFound;
    badgeElement.textContent = ui.section;
    introElement.textContent = "";

    contentElement.replaceChildren(
      createElement("p", "", ui.notFoundText)
    );
  }


  /* =========================================
     8. LOAD THE SELECTED TOPIC
     ========================================= */

  const lessonIndex = lessons.findIndex(
    lesson => lesson.id === topicId
  );

  if (lessonIndex === -1) {
    showNotFound();
    return;
  }

  const lesson = lessons[lessonIndex];

  const lessonTitle =
    lesson.title[language] || lesson.title.bn;

  const lessonIntro =
    lesson.intro[language] || lesson.intro.bn;

  const sections =
    lesson.sections[language] || lesson.sections.bn;

  document.title = lessonTitle + " | IBADAT";

  titleElement.textContent = lessonTitle;

  const topicNumber = lessonIndex + 1;
  const totalTopics = lessons.length;

  if (language === "en") {
    badgeElement.textContent =
      "Topic " + topicNumber + " of " + totalTopics;
  } else if (language === "hi") {
    badgeElement.textContent =
      "विषय " + topicNumber + " / " + totalTopics;
  } else {
    badgeElement.textContent =
      "বিষয় " + topicNumber + " / " + totalTopics;
  }

  introElement.textContent = lessonIntro;

  const fragment = document.createDocumentFragment();

  sections.forEach(section => {
    fragment.appendChild(
      renderSection(section, language)
    );
  });

  contentElement.replaceChildren(fragment);


  /* =========================================
     9. NO HISTORY TRACKING
     No Previous/Next buttons
     No Back button
     No reminder board
     No localStorage writes
     ========================================= */

})();
