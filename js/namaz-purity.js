/* ============================================================
   IBADAT — PAK-PABITRATA
   Complete multilingual JavaScript
   Languages: Bengali, English, Hindi

   Required HTML IDs:
   purityPage, pageTitle, pageIntro, learningGrid, footerText,
   detailView, detailTitle, detailContent, backButton, backLabel,
   detailFooterText

   Image directory:
   ../assets/images/

   Main backgrounds are handled by CSS.
   ============================================================ */

"use strict";

(() => {
  /* ----------------------------------------------------------
     1. CONFIGURATION
     ---------------------------------------------------------- */

  const CONFIG = {
    defaultLanguage: "bn",
    supportedLanguages: ["bn", "en", "hi"],

    settingsKey: "appSettings",

    imageBase: "../assets/images/",

    /*
      Keep the footer message in one central place.
      Replace these strings with the exact Namaz-page footer
      messages if the existing Namaz page uses different wording.
    */
    footer: {
      bn: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
      en: "Maintain purity and find peace in worship.",
      hi: "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।"
    }
  };

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const page = $("#purityPage");
  const detailView = $("#detailView");
  const pageTitle = $("#pageTitle");
  const pageIntro = $("#pageIntro");
  const learningGrid = $("#learningGrid");
  const footerText = $("#footerText");
  const detailTitle = $("#detailTitle");
  const detailContent = $("#detailContent");
  const backButton = $("#backButton");
  const backLabel = $("#backLabel");
  const detailFooterText = $("#detailFooterText");

  if (
    !page ||
    !detailView ||
    !pageTitle ||
    !pageIntro ||
    !learningGrid ||
    !detailTitle ||
    !detailContent ||
    !backButton
  ) {
    console.error(
      "IBADAT Pak-Pabitrata: One or more required HTML elements are missing."
    );
    return;
  }

  /* ----------------------------------------------------------
     2. TRANSLATIONS — ALL MAIN PAGE CONTENT
     ---------------------------------------------------------- */

  const UI = {
    bn: {
      documentTitle: "পাক-পবিত্রতা | IBADAT",
      pageTitle: "পাক-পবিত্রতা",
      pageIntro:
        "পবিত্রতা ইসলামের গুরুত্বপূর্ণ শিক্ষা। ওযু, গোসল, তায়াম্মুম ও পরিচ্ছন্নতার নিয়ম শিখে ইবাদতের জন্য প্রস্তুত হও।",

      back: "ফিরে যাও",
      footer: CONFIG.footer.bn,

      detailIntro: "বিস্তারিত শিক্ষা",
      readMore: "বিস্তারিত শিখুন",
      mainImageAlt: "পাক-পবিত্রতার শিক্ষামূলক ছবি",
      step: "ধাপ",
      important: "গুরুত্বপূর্ণ কথা",
      summary: "সংক্ষেপে মনে রাখুন",
      practice: "করণীয়",
      avoid: "যা এড়িয়ে চলবে",
      references: "কুরআনের নির্দেশনা",
      noImage: "ছবিটি বর্তমানে পাওয়া যাচ্ছে না।",

      cards: [
        {
          id: "wudu",
          title: "ওযু",
          description: "ওযুর নিয়ম ও ধাপ",
          image: "wudu.png"
        },
        {
          id: "ghusl",
          title: "গোসল",
          description: "ফরজ গোসলের শিক্ষা",
          image: "ghusl.png"
        },
        {
          id: "tayammum",
          title: "তায়াম্মুম",
          description: "প্রয়োজনে পবিত্রতার বিকল্প",
          image: "tayammum.png"
        },
        {
          id: "body-purity",
          title: "শরীরের পবিত্রতা",
          description: "পরিচ্ছন্নতার নিয়ম",
          image: "body-purity.png"
        },
        {
          id: "clothing-purity",
          title: "পোশাকের পবিত্রতা",
          description: "পরিচ্ছন্ন পোশাকের শিক্ষা",
          image: "clothing-purity.png"
        },
        {
          id: "place-purity",
          title: "স্থানের পবিত্রতা",
          description: "নামাজের স্থান পরিচ্ছন্ন রাখা",
          image: "place-purity.png"
        },
        {
          id: "impurity-removal",
          title: "নাপাকি দূরীকরণ",
          description: "নাপাকি পরিষ্কারের নিয়ম",
          image: "impurity-removal.png"
        },
        {
          id: "hayez-nifas",
          title: "হায়েজ ও নিফাস",
          description: "পবিত্রতা ও ইবাদতের বিধান",
          image: "hayez-nifas.png"
        }
      ]
    },

    en: {
      documentTitle: "Purification | IBADAT",
      pageTitle: "Purification",
      pageIntro:
        "Purification is an important teaching in Islam. Learn about wudu, ghusl, tayammum and cleanliness to prepare for worship.",

      back: "Go back",
      footer: CONFIG.footer.en,

      detailIntro: "Detailed lesson",
      readMore: "Learn more",
      mainImageAlt: "Educational purification illustration",
      step: "Step",
      important: "Important note",
      summary: "Remember",
      practice: "What to do",
      avoid: "What to avoid",
      references: "Qur'anic guidance",
      noImage: "This image is currently unavailable.",

      cards: [
        {
          id: "wudu",
          title: "Wudu",
          description: "Rules and steps of ablution",
          image: "wudu.png"
        },
        {
          id: "ghusl",
          title: "Ghusl",
          description: "Learning ritual bathing",
          image: "ghusl.png"
        },
        {
          id: "tayammum",
          title: "Tayammum",
          description: "Dry purification when permitted",
          image: "tayammum.png"
        },
        {
          id: "body-purity",
          title: "Body Purity",
          description: "Personal cleanliness",
          image: "body-purity.png"
        },
        {
          id: "clothing-purity",
          title: "Clothing Purity",
          description: "Keeping clothes clean",
          image: "clothing-purity.png"
        },
        {
          id: "place-purity",
          title: "Place Purity",
          description: "Keeping the prayer area clean",
          image: "place-purity.png"
        },
        {
          id: "impurity-removal",
          title: "Removing Impurity",
          description: "How to clean impurities",
          image: "impurity-removal.png"
        },
        {
          id: "hayez-nifas",
          title: "Hayd and Nifas",
          description: "Purification and worship rulings",
          image: "hayez-nifas.png"
        }
      ]
    },

    hi: {
      documentTitle: "पवित्रता | IBADAT",
      pageTitle: "पाक-पवित्रता",
      pageIntro:
        "पवित्रता इस्लाम की एक महत्वपूर्ण शिक्षा है। इबादत की तैयारी के लिए वुज़ू, ग़ुस्ल, तयम्मुम और स्वच्छता के नियम सीखें।",

      back: "वापस जाएँ",
      footer: CONFIG.footer.hi,

      detailIntro: "विस्तृत पाठ",
      readMore: "और जानें",
      mainImageAlt: "पवित्रता से संबंधित शैक्षिक चित्र",
      step: "चरण",
      important: "महत्वपूर्ण बात",
      summary: "याद रखें",
      practice: "क्या करें",
      avoid: "किससे बचें",
      references: "क़ुरआन का मार्गदर्शन",
      noImage: "यह चित्र अभी उपलब्ध नहीं है।",

      cards: [
        {
          id: "wudu",
          title: "वुज़ू",
          description: "वुज़ू के नियम और चरण",
          image: "wudu.png"
        },
        {
          id: "ghusl",
          title: "ग़ुस्ल",
          description: "फ़र्ज़ ग़ुस्ल की शिक्षा",
          image: "ghusl.png"
        },
        {
          id: "tayammum",
          title: "तयम्मुम",
          description: "अनुमति होने पर सूखी पवित्रता",
          image: "tayammum.png"
        },
        {
          id: "body-purity",
          title: "शरीर की पवित्रता",
          description: "व्यक्तिगत स्वच्छता",
          image: "body-purity.png"
        },
        {
          id: "clothing-purity",
          title: "कपड़ों की पवित्रता",
          description: "कपड़ों को साफ़ रखना",
          image: "clothing-purity.png"
        },
        {
          id: "place-purity",
          title: "स्थान की पवित्रता",
          description: "नमाज़ की जगह साफ़ रखना",
          image: "place-purity.png"
        },
        {
          id: "impurity-removal",
          title: "नजासत दूर करना",
          description: "नापाकी साफ़ करने के नियम",
          image: "impurity-removal.png"
        },
        {
          id: "hayez-nifas",
          title: "हैज़ और निफ़ास",
          description: "पवित्रता और इबादत के नियम",
          image: "hayez-nifas.png"
        }
      ]
    }
  };

  /* ----------------------------------------------------------
     3. DETAILED LESSON CONTENT
     All content is stored locally. No network is required.
     ---------------------------------------------------------- */

  const LESSONS = {
    wudu: {
      bn: {
        title: "ওযু",
        intro:
          "ওযু হলো নির্দিষ্ট অঙ্গ পানি দিয়ে ধোয়া এবং মাথা মাসেহ করার মাধ্যমে অর্জিত পবিত্রতা। নামাজের আগে ওযু সঠিকভাবে করা অত্যন্ত গুরুত্বপূর্ণ।",

        image: "wudu.png",

        sections: [
          {
            heading: "ওযু কেন করতে হয়?",
            paragraphs: [
              "নামাজ আদায়ের জন্য শরিয়ত অনুযায়ী ওযু প্রয়োজন হয়। ওযু মানুষকে পরিচ্ছন্ন থাকতে এবং ইবাদতের জন্য প্রস্তুত হতে সাহায্য করে।",
              "আল্লাহ তাআলা সূরা আল-মায়িদার ৬ নম্বর আয়াতে নামাজের প্রস্তুতিতে মুখ, হাত, মাথা ও পা সম্পর্কিত পবিত্রতার নির্দেশ দিয়েছেন।"
            ]
          },
          {
            heading: "ওযুর আগে প্রস্তুতি",
            bullets: [
              "পরিষ্কার ও পবিত্র পানি ব্যবহার করো।",
              "মনে মনে ওযুর নিয়ত করো; নিয়ত মুখে উচ্চারণ করা আবশ্যক নয়।",
              "অঙ্গগুলোতে পানি পৌঁছাতে বাধা দেয় এমন কিছু থাকলে তা সরিয়ে নাও, যদি নিরাপদে সম্ভব হয়।",
              "পানি অপচয় করো না।"
            ]
          },
          {
            heading: "ওযুর ধাপসমূহ",
            paragraphs: [
              "নিচে ওযুর পরিচিত সুন্নত-পদ্ধতির আটটি শিক্ষামূলক ধাপ দেওয়া হলো। বিভিন্ন মাজহাবে কিছু খুঁটিনাটি পদ্ধতিতে পার্থক্য থাকতে পারে।"
            ],
            steps: [
              {
                title: "হাত ধোয়া",
                text:
                  "বিসমিল্লাহ বলে দুই হাত কবজি পর্যন্ত ধুয়ে নাও। সাধারণ সুন্নত-পদ্ধতিতে তিনবার ধোয়া হয়।",
                image: "wudu-hands.png"
              },
              {
                title: "কুলি করা",
                text:
                  "ডান হাতে পানি নিয়ে মুখের ভেতর ভালোভাবে কুলি করো। পানি গলায় পৌঁছানোর দরকার নেই।",
                image: "wudu-mouth.png"
              },
              {
                title: "নাকে পানি দেওয়া",
                text:
                  "নাকে পানি নিয়ে পরিষ্কার করো এবং পানি বের করে দাও। রোজা অবস্থায় পানি টানার ক্ষেত্রে সতর্ক থাকো।",
                image: "wudu-nose.png"
              },
              {
                title: "মুখ ধোয়া",
                text:
                  "কপালের চুলের গোড়া থেকে থুতনি পর্যন্ত এবং এক কানের পাশ থেকে অন্য কানের পাশ পর্যন্ত পুরো মুখ ধুয়ে নাও।",
                image: "wudu-face.png"
              },
              {
                title: "দুই হাত কনুইসহ ধোয়া",
                text:
                  "প্রথমে ডান হাত, তারপর বাম হাত আঙুলের ডগা থেকে কনুইসহ ধুয়ে নাও। কনুইও ধোয়ার অন্তর্ভুক্ত।",
                image: "wudu-arms.png"
              },
              {
                title: "মাথা মাসেহ করা",
                text:
                  "ভেজা হাত দিয়ে মাথা মাসেহ করো। মাথার কতটুকু মাসেহ করতে হবে, সে বিষয়ে মাজহাবভেদে কিছু পার্থক্য রয়েছে।",
                image: "wudu-head.png"
              },
              {
                title: "কান মাসেহ করা",
                text:
                  "মাথা মাসেহের সঙ্গে সুন্নত-পদ্ধতিতে ভেজা আঙুল দিয়ে কানের ভেতরের দৃশ্যমান অংশ ও বাইরের অংশ মাসেহ করা হয়।",
                image: "wudu-ears.png"
              },
              {
                title: "দুই পা টাখনুসহ ধোয়া",
                text:
                  "প্রথমে ডান পা, তারপর বাম পা টাখনুসহ ভালোভাবে ধুয়ে নাও। আঙুলের ফাঁকেও পানি পৌঁছাও।",
                image: "wudu-feet.png"
              }
            ]
          },
          {
            heading: "ওযুর ফরজ অঙ্গ",
            bullets: [
              "পুরো মুখ ধোয়া।",
              "দুই হাত কনুইসহ ধোয়া।",
              "মাথা মাসেহ করা।",
              "দুই পা টাখনুসহ ধোয়া।"
            ],
            paragraphs: [
              "এগুলো কুরআনের নির্দেশনার ভিত্তিতে ওযুর মৌলিক ফরজ অঙ্গ। নির্দিষ্ট মাজহাব অনুসারে ফরজ, সুন্নত ও অন্যান্য শর্তের বিস্তারিত শিখে নাও।"
            ]
          },
          {
            heading: "ওযু নষ্ট হওয়ার বিষয়",
            bullets: [
              "পেশাব, পায়খানা বা বায়ু নির্গমন।",
              "গভীর ঘুম বা চেতনা হারানোর মতো অবস্থা—বিধান পরিস্থিতি ও মাজহাব অনুযায়ী বিবেচ্য।",
              "কিছু বিষয়ে, যেমন রক্তপাত বা সরাসরি স্পর্শ, মাজহাবভেদে বিধান আলাদা হতে পারে।"
            ],
            note:
              "কোনো নির্দিষ্ট পরিস্থিতিতে ওযু ভেঙেছে কি না, তা নিশ্চিত না হলে নিজের অনুসৃত মাজহাবের নির্ভরযোগ্য আলেমের কাছে জেনে নাও।"
          },
          {
            heading: "ওযুতে সাধারণ ভুল",
            bullets: [
              "কনুই বা টাখনুর কোনো অংশ শুকনো রেখে দেওয়া।",
              "আঙুলের ফাঁকে পানি না পৌঁছানো।",
              "অতিরিক্ত পানি ব্যবহার করা।",
              "তাড়াহুড়ো করে অঙ্গগুলো অসম্পূর্ণ ধোয়া।"
            ]
          }
        ],

        summary:
          "ওযু ধীরে-সুস্থে করো, পানি অপচয় করো না এবং প্রত্যেক অঙ্গে পানি পৌঁছেছে কি না নিশ্চিত হও।"
      },

      en: {
        title: "Wudu (Ablution)",
        intro:
          "Wudu is a form of ritual purification involving washing specified body parts and wiping the head. Performing it correctly is important before salah.",

        image: "wudu.png",

        sections: [
          {
            heading: "Why perform wudu?",
            paragraphs: [
              "Wudu is required for salah in circumstances specified by Islamic law. It supports cleanliness and prepares a person for worship.",
              "Qur'an 5:6 gives guidance about washing the face and arms, wiping the head, and washing the feet when preparing for prayer."
            ]
          },
          {
            heading: "Preparation",
            bullets: [
              "Use clean, purifying water.",
              "Make the intention in your heart; verbalizing the intention is not obligatory.",
              "Remove anything that prevents water from reaching the skin, when this can be done safely.",
              "Avoid wasting water."
            ]
          },
          {
            heading: "Steps of wudu",
            paragraphs: [
              "The following eight educational steps describe a familiar Sunnah method. Some details differ among Islamic schools of jurisprudence."
            ],
            steps: [
              {
                title: "Wash the hands",
                text:
                  "Begin with Bismillah and wash both hands up to the wrists. The common Sunnah method washes them three times.",
                image: "wudu-hands.png"
              },
              {
                title: "Rinse the mouth",
                text:
                  "Take water into the mouth with the right hand and rinse. There is no need to force water into the throat.",
                image: "wudu-mouth.png"
              },
              {
                title: "Rinse the nose",
                text:
                  "Bring water into the nose and expel it. Take care not to draw water forcefully while fasting.",
                image: "wudu-nose.png"
              },
              {
                title: "Wash the face",
                text:
                  "Wash the whole face, from the usual hairline to the chin and from one side of the face to the other.",
                image: "wudu-face.png"
              },
              {
                title: "Wash both arms",
                text:
                  "Wash the right arm and then the left, including the elbows. The washing extends from the fingertips to and including the elbows.",
                image: "wudu-arms.png"
              },
              {
                title: "Wipe the head",
                text:
                  "Wipe the head with wet hands. Schools of jurisprudence differ on the precise extent required.",
                image: "wudu-head.png"
              },
              {
                title: "Wipe the ears",
                text:
                  "In the familiar Sunnah method, use wet fingers to wipe the visible inner and outer parts of the ears.",
                image: "wudu-ears.png"
              },
              {
                title: "Wash both feet",
                text:
                  "Wash the right foot and then the left, including the ankles. Make sure water reaches between the toes.",
                image: "wudu-feet.png"
              }
            ]
          },
          {
            heading: "The essential acts of wudu",
            bullets: [
              "Washing the entire face.",
              "Washing both arms, including the elbows.",
              "Wiping the head.",
              "Washing both feet, including the ankles."
            ],
            paragraphs: [
              "These are the core acts described in Qur'an 5:6. Learn the complete requirements, Sunnah acts, and conditions according to your school of jurisprudence."
            ]
          },
          {
            heading: "What may invalidate wudu?",
            bullets: [
              "Urination, defecation, or passing wind.",
              "Deep sleep or loss of consciousness, depending on the circumstances.",
              "Some issues, such as bleeding or physical contact, are treated differently by different schools."
            ],
            note:
              "If you are uncertain about a specific situation, consult a qualified scholar from the school of jurisprudence you follow."
          },
          {
            heading: "Common mistakes",
            bullets: [
              "Leaving part of an elbow or ankle dry.",
              "Not washing between the fingers or toes.",
              "Wasting water.",
              "Rushing and failing to wash each required area completely."
            ]
          }
        ],

        summary:
          "Perform wudu carefully, avoid wasting water, and ensure that every required area has been washed."
      },

      hi: {
        title: "वुज़ू",
        intro:
          "वुज़ू में शरीर के निर्धारित अंगों को धोया जाता है और सिर का मसह किया जाता है। नमाज़ से पहले सही तरीके से वुज़ू करना महत्वपूर्ण है।",

        image: "wudu.png",

        sections: [
          {
            heading: "वुज़ू क्यों किया जाता है?",
            paragraphs: [
              "इस्लामी नियमों के अनुसार नमाज़ के लिए वुज़ू आवश्यक होता है। यह स्वच्छता और इबादत की तैयारी में मदद करता है।",
              "क़ुरआन 5:6 में नमाज़ की तैयारी के लिए चेहरे और हाथों को धोने, सिर का मसह करने तथा पैरों को धोने का निर्देश दिया गया है।"
            ]
          },
          {
            heading: "वुज़ू की तैयारी",
            bullets: [
              "पाक और साफ़ पानी का उपयोग करें।",
              "दिल में वुज़ू की नीयत करें; नीयत को ज़ुबान से कहना अनिवार्य नहीं है।",
              "यदि सुरक्षित हो, तो पानी पहुँचने में रुकावट डालने वाली चीज़ हटा दें।",
              "पानी बर्बाद न करें।"
            ]
          },
          {
            heading: "वुज़ू के चरण",
            paragraphs: [
              "नीचे वुज़ू की प्रचलित सुन्नत-पद्धति के आठ शिक्षात्मक चरण दिए गए हैं। कुछ विवरण फ़िक़्ह के अलग-अलग मज़हबों में भिन्न हो सकते हैं।"
            ],
            steps: [
              {
                title: "हाथ धोना",
                text:
                  "बिस्मिल्लाह कहकर दोनों हाथों को कलाई तक धोएँ। प्रचलित सुन्नत-पद्धति में तीन बार धोया जाता है।",
                image: "wudu-hands.png"
              },
              {
                title: "कुल्ली करना",
                text:
                  "दाएँ हाथ से पानी लेकर मुँह में कुल्ली करें। पानी को गले तक पहुँचाने की आवश्यकता नहीं है।",
                image: "wudu-mouth.png"
              },
              {
                title: "नाक साफ़ करना",
                text:
                  "नाक में पानी लेकर उसे साफ़ करें और पानी बाहर निकाल दें। रोज़े की हालत में पानी खींचने में सावधानी रखें।",
                image: "wudu-nose.png"
              },
              {
                title: "चेहरा धोना",
                text:
                  "बालों की सामान्य शुरुआत से ठोड़ी तक और चेहरे के एक किनारे से दूसरे किनारे तक पूरा चेहरा धोएँ।",
                image: "wudu-face.png"
              },
              {
                title: "दोनों हाथ कोहनियों सहित धोना",
                text:
                  "पहले दायाँ और फिर बायाँ हाथ उँगलियों से कोहनियों सहित धोएँ। कोहनियाँ भी धोने में शामिल हैं।",
                image: "wudu-arms.png"
              },
              {
                title: "सिर का मसह करना",
                text:
                  "गीले हाथों से सिर का मसह करें। आवश्यक हिस्से की सीमा के बारे में फ़िक़्ह के मज़हबों में अंतर हो सकता है।",
                image: "wudu-head.png"
              },
              {
                title: "कानों का मसह करना",
                text:
                  "प्रचलित सुन्नत-पद्धति में गीली उँगलियों से कान के दिखाई देने वाले अंदरूनी और बाहरी हिस्से का मसह किया जाता है।",
                image: "wudu-ears.png"
              },
              {
                title: "दोनों पैर टखनों सहित धोना",
                text:
                  "पहले दायाँ और फिर बायाँ पैर टखनों सहित अच्छी तरह धोएँ। उँगलियों के बीच भी पानी पहुँचाएँ।",
                image: "wudu-feet.png"
              }
            ]
          },
          {
            heading: "वुज़ू के मूल अनिवार्य अंग",
            bullets: [
              "पूरा चेहरा धोना।",
              "दोनों हाथ कोहनियों सहित धोना।",
              "सिर का मसह करना।",
              "दोनों पैर टखनों सहित धोना।"
            ],
            paragraphs: [
              "ये क़ुरआन 5:6 में बताए गए वुज़ू के मूल अंग हैं। अपने फ़िक़्ही मज़हब के अनुसार आवश्यक शर्तें और सुन्नतें भी सीखें।"
            ]
          },
          {
            heading: "वुज़ू किन कारणों से टूट सकता है?",
            bullets: [
              "पेशाब, शौच या हवा निकलना।",
              "गहरी नींद या बेहोशी जैसी स्थिति; इसका विवरण परिस्थिति के अनुसार हो सकता है।",
              "खून निकलने या शारीरिक स्पर्श जैसे कुछ मामलों में मज़हबों के अनुसार अलग नियम हैं।"
            ],
            note:
              "किसी विशेष स्थिति में संदेह हो तो अपने फ़िक़्ही मज़हब के योग्य आलिम से पूछें।"
          },
          {
            heading: "आम गलतियाँ",
            bullets: [
              "कोहनी या टखने का कोई हिस्सा सूखा छोड़ देना।",
              "उँगलियों के बीच पानी न पहुँचाना।",
              "पानी बर्बाद करना।",
              "जल्दबाज़ी में किसी आवश्यक अंग को अधूरा धोना।"
            ]
          }
        ],

        summary:
          "वुज़ू ध्यान से करें, पानी बर्बाद न करें और सुनिश्चित करें कि हर आवश्यक अंग अच्छी तरह धुल गया है।"
      }
    },

    ghusl: {
      bn: {
        title: "গোসল",
        intro:
          "গোসল হলো শরীরের সর্বত্র পানি পৌঁছে পবিত্রতা অর্জন করা। কিছু নির্দিষ্ট অবস্থায় নামাজের আগে ফরজ গোসল আবশ্যক হয়।",

        image: "ghusl.png",

        sections: [
          {
            heading: "গোসল কখন ফরজ হয়?",
            bullets: [
              "স্বামী-স্ত্রীর সহবাসের পর, বীর্যপাত হয়েছে কি না তা নির্বিশেষে—প্রযোজ্য শরয়ি বিধান অনুযায়ী।",
              "স্বপ্নদোষ বা অন্য কারণে বীর্যপাত হলে।",
              "মাসিক বা প্রসবোত্তর রক্তস্রাব শেষ হলে।"
            ],
            note:
              "কোনো বিশেষ অবস্থার বিধান নিয়ে সন্দেহ হলে নির্ভরযোগ্য আলেমের পরামর্শ নাও।"
          },
          {
            heading: "গোসলের আগে প্রস্তুতি",
            bullets: [
              "মনে মনে পবিত্রতা অর্জনের নিয়ত করো।",
              "পরিষ্কার পানি ব্যবহার করো।",
              "শরীরে দৃশ্যমান নাপাকি থাকলে তা পরিষ্কার করো।",
              "শরীরের কোথাও পানি পৌঁছাতে বাধা দেয় এমন পদার্থ থাকলে নিরাপদে সরিয়ে নাও।"
            ]
          },
          {
            heading: "গোসলের সুন্নত-পদ্ধতি",
            steps: [
              {
                title: "দুই হাত ধোয়া",
                text:
                  "গোসল শুরু করে দুই হাত ধুয়ে নাও।"
              },
              {
                title: "গোপনাঙ্গ ও নাপাকি পরিষ্কার করা",
                text:
                  "শরীরে কোনো নাপাকি থাকলে তা পরিষ্কার করো।"
              },
              {
                title: "ওযু করা",
                text:
                  "নামাজের ওযুর মতো ওযু করো। গোসলের স্থানে পানি জমলে পা শেষে ধোয়া যেতে পারে।"
              },
              {
                title: "মাথায় পানি দেওয়া",
                text:
                  "মাথা ও চুলের গোড়ায় পানি পৌঁছাও।"
              },
              {
                title: "পুরো শরীর ধোয়া",
                text:
                  "প্রথমে ডান দিক, তারপর বাম দিকসহ পুরো শরীরে পানি পৌঁছাও। নাভি, বগল, কানের দৃশ্যমান ভাঁজ এবং অন্যান্য স্থানে পানি পৌঁছেছে কি না খেয়াল করো।"
              }
            ]
          },
          {
            heading: "ফরজ গোসলের মূল বিষয়",
            paragraphs: [
              "হানাফি ফিকহে গোসলের ফরজ হিসেবে মুখে পানি পৌঁছানো, নাকে পানি পৌঁছানো এবং পুরো শরীর ধোয়ার কথা বলা হয়। অন্যান্য মাজহাবে কিছু খুঁটিনাটি পার্থক্য রয়েছে।",
              "নিজের অনুসৃত মাজহাব অনুযায়ী গোসলের শর্তগুলো শেখা গুরুত্বপূর্ণ।"
            ]
          },
          {
            heading: "যে ভুলগুলো এড়াবে",
            bullets: [
              "শরীরের কোনো অংশ শুকনো রেখে দেওয়া।",
              "চুলের গোড়া বা ত্বকে পানি পৌঁছানোর বিষয়টি উপেক্ষা করা।",
              "অযথা অতিরিক্ত পানি ব্যবহার করা।",
              "গোসলের বিধান না জেনে অন্যের ব্যক্তিগত অবস্থা সম্পর্কে অনুমান করা।"
            ]
          }
        ],

        summary:
          "ফরজ গোসলে শরিয়ত অনুযায়ী প্রয়োজনীয় সব অঙ্গে পানি পৌঁছাও এবং নিজের অনুসৃত মাজহাবের বিধান মেনে চলো।"
      },

      en: {
        title: "Ghusl (Ritual Bath)",
        intro:
          "Ghusl is a full-body ritual bath. It becomes obligatory in certain circumstances before a person can perform salah.",

        image: "ghusl.png",

        sections: [
          {
            heading: "When is ghusl obligatory?",
            bullets: [
              "After sexual intercourse, whether or not ejaculation occurs, according to the applicable rulings.",
              "Following ejaculation, including a wet dream.",
              "After menstruation or postnatal bleeding has ended."
            ],
            note:
              "Ask a qualified scholar if you are unsure how a specific circumstance is ruled."
          },
          {
            heading: "Preparation",
            bullets: [
              "Make the intention in your heart to purify yourself.",
              "Use clean water.",
              "Remove any visible impurity from the body.",
              "Safely remove anything that prevents water from reaching the skin."
            ]
          },
          {
            heading: "A familiar Sunnah method",
            steps: [
              {
                title: "Wash the hands",
                text:
                  "Begin by washing both hands."
              },
              {
                title: "Clean the private area",
                text:
                  "Clean any impurity from the body."
              },
              {
                title: "Perform wudu",
                text:
                  "Perform wudu as for prayer. If water collects where you bathe, you may wash the feet at the end."
              },
              {
                title: "Wash the head",
                text:
                  "Make sure water reaches the head and the roots of the hair."
              },
              {
                title: "Wash the entire body",
                text:
                  "Wash the whole body, including the right and left sides. Pay attention to areas such as the navel, armpits, visible folds of the ears and other places where water may be missed."
              }
            ]
          },
          {
            heading: "Essential requirements",
            paragraphs: [
              "In Hanafi jurisprudence, the obligatory requirements include rinsing the mouth, rinsing the nose, and washing the entire body. Some details differ among Islamic schools.",
              "Learn the complete requirements according to the school of jurisprudence you follow."
            ]
          },
          {
            heading: "Mistakes to avoid",
            bullets: [
              "Leaving any part of the body dry.",
              "Overlooking the roots of the hair or parts of the skin.",
              "Using excessive amounts of water.",
              "Making assumptions about another person's private circumstances."
            ]
          }
        ],

        summary:
          "During obligatory ghusl, ensure that water reaches every required area and follow the guidance of your school of jurisprudence."
      },

      hi: {
        title: "ग़ुस्ल",
        intro:
          "ग़ुस्ल पूरे शरीर को धोकर पाक होने का तरीका है। कुछ विशेष परिस्थितियों में नमाज़ से पहले फ़र्ज़ ग़ुस्ल आवश्यक होता है।",

        image: "ghusl.png",

        sections: [
          {
            heading: "ग़ुस्ल कब फ़र्ज़ होता है?",
            bullets: [
              "वैवाहिक संबंध के बाद, लागू शरीयत के नियमों के अनुसार, स्खलन हुआ हो या नहीं।",
              "स्खलन होने पर, जिसमें स्वप्नदोष भी शामिल है।",
              "माहवारी या प्रसवोत्तर रक्तस्राव समाप्त होने के बाद।"
            ],
            note:
              "किसी विशेष परिस्थिति के नियम को लेकर संदेह हो तो योग्य आलिम से पूछें।"
          },
          {
            heading: "ग़ुस्ल की तैयारी",
            bullets: [
              "पाक होने की नीयत दिल में करें।",
              "साफ़ पानी का उपयोग करें।",
              "शरीर पर लगी दिखाई देने वाली नापाकी साफ़ करें।",
              "यदि कोई चीज़ पानी पहुँचने में रुकावट डालती हो, तो उसे सुरक्षित तरीके से हटाएँ।"
            ]
          },
          {
            heading: "ग़ुस्ल की प्रचलित सुन्नत-पद्धति",
            steps: [
              {
                title: "दोनों हाथ धोना",
                text:
                  "ग़ुस्ल की शुरुआत दोनों हाथ धोकर करें।"
              },
              {
                title: "निजी अंगों को साफ़ करना",
                text:
                  "शरीर पर लगी नापाकी को साफ़ करें।"
              },
              {
                title: "वुज़ू करना",
                text:
                  "नमाज़ के वुज़ू की तरह वुज़ू करें। यदि नहाने की जगह पानी जमा होता हो तो पैर अंत में धो सकते हैं।"
              },
              {
                title: "सिर धोना",
                text:
                  "सिर और बालों की जड़ों तक पानी पहुँचाएँ।"
              },
              {
                title: "पूरा शरीर धोना",
                text:
                  "दाएँ और बाएँ हिस्से सहित पूरे शरीर पर पानी पहुँचाएँ। नाभि, बगल, कानों की दिखाई देने वाली सिलवटों और अन्य छूट सकने वाले स्थानों पर ध्यान दें।"
              }
            ]
          },
          {
            heading: "फ़र्ज़ ग़ुस्ल की मूल बातें",
            paragraphs: [
              "हनफ़ी फ़िक़्ह में मुँह में पानी पहुँचाना, नाक में पानी पहुँचाना और पूरे शरीर को धोना फ़र्ज़ आवश्यकताओं में शामिल हैं। अन्य मज़हबों में कुछ विवरण भिन्न हो सकते हैं।",
              "अपने फ़िक़्ही मज़हब के अनुसार सभी आवश्यक शर्तें सीखें।"
            ]
          },
          {
            heading: "इन गलतियों से बचें",
            bullets: [
              "शरीर का कोई हिस्सा सूखा छोड़ देना।",
              "बालों की जड़ों या त्वचा के हिस्सों पर ध्यान न देना।",
              "ज़रूरत से अधिक पानी बहाना।",
              "दूसरों की निजी परिस्थितियों के बारे में अनुमान लगाना।"
            ]
          }
        ],

        summary:
          "फ़र्ज़ ग़ुस्ल में हर आवश्यक स्थान तक पानी पहुँचाएँ और अपने फ़िक़्ही मज़हब के नियमों का पालन करें।"
      }
    },

    tayammum: {
      bn: {
        title: "তায়াম্মুম",
        intro:
          "পানি না পাওয়া গেলে অথবা পানি ব্যবহার করলে অসুস্থতা বা ক্ষতির আশঙ্কা থাকলে শরিয়তের শর্ত পূরণ সাপেক্ষে তায়াম্মুমের অনুমতি রয়েছে।",

        image: "tayammum.png",

        sections: [
          {
            heading: "তায়াম্মুম কী?",
            paragraphs: [
              "তায়াম্মুম হলো পবিত্র মাটি বা শরিয়তসম্মত পবিত্র ভূমিজ উপাদান ব্যবহার করে নির্দিষ্ট অঙ্গ মাসেহ করার মাধ্যমে পবিত্রতা অর্জনের বিকল্প পদ্ধতি।",
              "এটি ওযু বা গোসলের বিকল্প হতে পারে, তবে কেবল শরিয়তে অনুমোদিত পরিস্থিতিতে।"
            ]
          },
          {
            heading: "কখন তায়াম্মুম করা যায়?",
            bullets: [
              "যথাযথ চেষ্টা করেও প্রয়োজনীয় পানি না পাওয়া গেলে।",
              "পানি ব্যবহার করলে অসুস্থতা বেড়ে যাওয়া বা ক্ষতির বাস্তব আশঙ্কা থাকলে।",
              "পানি ব্যবহারের ক্ষেত্রে চিকিৎসাগত বা শরয়ি বাধা থাকলে।"
            ],
            note:
              "শুধু সুবিধার জন্য বা অযথা গোসল/ওযু এড়ানোর উদ্দেশ্যে তায়াম্মুম করা উচিত নয়। অনুমতির শর্ত পূরণ হওয়া জরুরি।"
          },
          {
            heading: "তায়াম্মুমের তিনটি শিক্ষামূলক ধাপ",
            paragraphs: [
              "তায়াম্মুমের পদ্ধতি ও হাত মাসেহের সীমা মাজহাবভেদে ভিন্ন হতে পারে। নিচের তিনটি ধাপ তোমার ছবির সঙ্গে মিলিয়ে একটি পরিচিত পদ্ধতি বোঝানোর জন্য দেওয়া হয়েছে।"
            ],
            steps: [
              {
                title: "পবিত্র মাটিতে হাত স্পর্শ করা",
                text:
                  "মনে মনে তায়াম্মুমের নিয়ত করো। শরিয়তসম্মত পবিত্র মাটি বা উপযুক্ত ভূমিজ উপাদানে দুই হাত স্পর্শ করো।",
                image: "tayammum-hands.png"
              },
              {
                title: "মুখ মাসেহ করা",
                text:
                  "হাতের সাহায্যে পুরো মুখ মাসেহ করো। কোনো অংশ বাদ না পড়ার দিকে খেয়াল রাখো।",
                image: "tayammum-face.png"
              },
              {
                title: "হাত বা বাহু মাসেহ করা",
                text:
                  "অনুসৃত মাজহাবের পদ্ধতি অনুযায়ী হাত বা বাহুর নির্ধারিত অংশ মাসেহ করো। কনুই পর্যন্ত মাসেহের পদ্ধতি অনুসৃত হলে কনুইসহ পুরো নির্ধারিত অংশ সম্পন্ন করো।",
                image: "tayammum-arms.png"
              }
            ]
          },
          {
            heading: "তায়াম্মুম শেষ হলে",
            bullets: [
              "তায়াম্মুমের শর্ত ও পদ্ধতি ঠিকভাবে পূরণ হয়েছে কি না নিশ্চিত হও।",
              "যে কারণে তায়াম্মুমের অনুমতি ছিল তা দূর হলে এবং পানি ব্যবহার সম্ভব হলে পানি দিয়ে পবিত্রতা অর্জন করো।",
              "তায়াম্মুম ভঙ্গের কারণ ও পুনরায় করার নিয়ম নিজের অনুসৃত মাজহাব অনুযায়ী শিখে নাও।"
            ]
          }
        ],

        summary:
          "তায়াম্মুম একটি শরয়ি অনুমতি; পানি অনুপস্থিত বা ব্যবহার ক্ষতিকর হলে প্রযোজ্য শর্ত মেনে তা সম্পন্ন করো।"
      },

      en: {
        title: "Tayammum",
        intro:
          "Tayammum may be permitted when water is unavailable or using it could cause harm, provided the relevant Islamic legal conditions are met.",

        image: "tayammum.png",

        sections: [
          {
            heading: "What is tayammum?",
            paragraphs: [
              "Tayammum is an alternative form of ritual purification performed by wiping specified areas with clean earth or another qualifying material.",
              "It may substitute for wudu or ghusl, but only in circumstances permitted by Islamic law."
            ]
          },
          {
            heading: "When may tayammum be performed?",
            bullets: [
              "When necessary water cannot be found after a reasonable search.",
              "When using water poses a genuine risk of illness or harm.",
              "When a medical or religiously recognized obstacle prevents the use of water."
            ],
            note:
              "Tayammum should not be used simply for convenience or to avoid wudu or ghusl without a valid reason. Its conditions must be met."
          },
          {
            heading: "Three educational steps",
            paragraphs: [
              "The details of tayammum, including how the hands are wiped, differ among schools of jurisprudence. These three steps accompany the supplied illustrations and describe a familiar method."
            ],
            steps: [
              {
                title: "Touch clean earth",
                text:
                  "Make the intention in your heart. Touch clean earth or another qualifying material with both hands.",
                image: "tayammum-hands.png"
              },
              {
                title: "Wipe the face",
                text:
                  "Wipe the whole face with the hands, taking care not to leave an area uncovered.",
                image: "tayammum-face.png"
              },
              {
                title: "Wipe the hands or arms",
                text:
                  "Wipe the required areas according to the method of the school of jurisprudence you follow. If that method requires wiping to the elbows, include the elbows and the entire specified area.",
                image: "tayammum-arms.png"
              }
            ]
          },
          {
            heading: "After tayammum",
            bullets: [
              "Make sure the required conditions and method have been followed.",
              "When the reason permitting tayammum ends and water can be used, purify yourself with water.",
              "Learn the rules for invalidation and renewal according to your school of jurisprudence."
            ]
          }
        ],

        summary:
          "Tayammum is a legal concession. Use it only when water is unavailable or harmful to use and the required conditions are met."
      },

      hi: {
        title: "तयम्मुम",
        intro:
          "जब पानी उपलब्ध न हो या पानी के उपयोग से वास्तविक नुकसान का खतरा हो, तो इस्लामी नियमों की शर्तें पूरी होने पर तयम्मुम की अनुमति हो सकती है।",

        image: "tayammum.png",

        sections: [
          {
            heading: "तयम्मुम क्या है?",
            paragraphs: [
              "तयम्मुम पाक मिट्टी या शरीयत के अनुसार योग्य पाक धरती से संबंधित सामग्री पर निर्धारित अंगों का मसह करके पाक होने का वैकल्पिक तरीका है।",
              "यह वुज़ू या ग़ुस्ल का विकल्प हो सकता है, लेकिन केवल शरीयत द्वारा अनुमत परिस्थितियों में।"
            ]
          },
          {
            heading: "तयम्मुम कब किया जा सकता है?",
            bullets: [
              "उचित प्रयास के बाद भी आवश्यक पानी न मिले।",
              "पानी के उपयोग से बीमारी बढ़ने या नुकसान होने का वास्तविक खतरा हो।",
              "चिकित्सकीय या शरीयत द्वारा मान्य बाधा के कारण पानी का उपयोग संभव न हो।"
            ],
            note:
              "सिर्फ़ सुविधा के लिए वुज़ू या ग़ुस्ल छोड़कर तयम्मुम नहीं करना चाहिए। इसकी शर्तें पूरी होना आवश्यक है।"
          },
          {
            heading: "तयम्मुम के तीन शिक्षात्मक चरण",
            paragraphs: [
              "तयम्मुम के विवरण और हाथों के मसह की सीमा में फ़िक़्ही मज़हबों के अनुसार अंतर हो सकता है। नीचे दिए गए चरण चित्रों के साथ एक प्रचलित तरीका समझाते हैं।"
            ],
            steps: [
              {
                title: "पाक मिट्टी को हाथ लगाना",
                text:
                  "दिल में तयम्मुम की नीयत करें। दोनों हाथों से पाक मिट्टी या योग्य सामग्री को स्पर्श करें।",
                image: "tayammum-hands.png"
              },
              {
                title: "चेहरे का मसह करना",
                text:
                  "दोनों हाथों से पूरे चेहरे का मसह करें और कोई हिस्सा छूटने न दें।",
                image: "tayammum-face.png"
              },
              {
                title: "हाथों या बाज़ुओं का मसह करना",
                text:
                  "अपने फ़िक़्ही मज़हब के अनुसार निर्धारित हिस्से का मसह करें। यदि कोहनियों तक मसह करना आवश्यक हो, तो कोहनियों सहित पूरा हिस्सा पूरा करें।",
                image: "tayammum-arms.png"
              }
            ]
          },
          {
            heading: "तयम्मुम के बाद",
            bullets: [
              "सुनिश्चित करें कि आवश्यक शर्तें और तरीका पूरा हुआ है।",
              "जब तयम्मुम की अनुमति का कारण समाप्त हो जाए और पानी का उपयोग संभव हो, तो पानी से पाक हों।",
              "तयम्मुम टूटने और दोबारा करने के नियम अपने फ़िक़्ही मज़हब के अनुसार सीखें।"
            ]
          }
        ],

        summary:
          "तयम्मुम शरीयत की एक रियायत है। पानी उपलब्ध न होने या उसका उपयोग हानिकारक होने पर ही आवश्यक शर्तों के साथ इसे करें।"
      }
    },

    "body-purity": {
      bn: {
        title: "শরীরের পবিত্রতা",
        intro:
          "শরীর পরিষ্কার রাখা ইসলামের পরিচ্ছন্নতার শিক্ষার গুরুত্বপূর্ণ অংশ। ব্যক্তিগত পরিচ্ছন্নতা, স্বাস্থ্যবিধি এবং শরয়ি পবিত্রতা—সবকিছুর প্রতি যত্নবান হও।",

        image: "body-purity.png",

        sections: [
          {
            heading: "প্রতিদিনের পরিচ্ছন্নতা",
            bullets: [
              "নিয়মিত গোসল করো এবং শরীর পরিষ্কার রাখো।",
              "হাত, নখ ও শরীরের দৃশ্যমান ময়লা পরিষ্কার করো।",
              "প্রস্রাব-পায়খানার পর যথাযথভাবে পরিষ্কার হও।",
              "শরীরে নাপাকি লাগলে তা শরয়ি নিয়ম অনুযায়ী পরিষ্কার করো।",
              "ব্যক্তিগত পরিচ্ছন্নতার উপকরণ পরিষ্কার রাখো।"
            ]
          },
          {
            heading: "ইস্তিঞ্জা ও পরিষ্কার হওয়া",
            paragraphs: [
              "প্রস্রাব বা পায়খানার পর শরীরের সংশ্লিষ্ট স্থান থেকে নাপাকি দূর করাকে গুরুত্ব দাও। পানি ব্যবহার করা সম্ভব হলে পানি দিয়ে পরিষ্কার হওয়া প্রচলিত পদ্ধতি।",
              "পরিচ্ছন্নতার সময় শরীর বা পোশাকে নাপাকি ছড়িয়ে পড়ছে কি না খেয়াল করো।"
            ]
          },
          {
            heading: "স্বাস্থ্য ও পবিত্রতার ভারসাম্য",
            bullets: [
              "পরিষ্কার পানি ও স্বাস্থ্যসম্মত উপকরণ ব্যবহার করো।",
              "ত্বকে ক্ষত বা অসুস্থতা থাকলে ক্ষতিকর ঘষাঘষি এড়াও।",
              "পরিষ্কার থাকার নামে নিজেকে অযথা কষ্ট দিও না।",
              "শুধু সন্দেহের কারণে বারবার ধোয়ার অভ্যাস গড়ে তুলো না।"
            ],
            note:
              "স্বাস্থ্যবিধি এবং ধর্মীয় পবিত্রতা সম্পর্কিত বিষয় একে অপরের সঙ্গে সম্পর্কিত হলেও সব ক্ষেত্রে একই বিধান নয়। নির্দিষ্ট ধর্মীয় প্রশ্নে যোগ্য আলেমের পরামর্শ নাও।"
          }
        ],

        summary:
          "শরীর পরিচ্ছন্ন রাখো, নাপাকি যথাযথভাবে দূর করো এবং সন্দেহের কারণে নিজেকে অযথা কষ্ট দিও না।"
      },

      en: {
        title: "Body Purity",
        intro:
          "Keeping the body clean is an important part of Islamic cleanliness. Pay attention to personal hygiene, health, and ritual purity.",

        image: "body-purity.png",

        sections: [
          {
            heading: "Daily cleanliness",
            bullets: [
              "Bathe regularly and keep the body clean.",
              "Clean your hands, nails and visible dirt.",
              "Clean yourself properly after using the toilet.",
              "Remove ritual impurities according to the applicable rules.",
              "Keep personal hygiene items clean."
            ]
          },
          {
            heading: "Istinja and cleaning",
            paragraphs: [
              "After urination or defecation, take care to remove impurity from the relevant area. When available, water is a common way to clean oneself.",
              "Take care not to spread impurity onto the body or clothing while cleaning."
            ]
          },
          {
            heading: "Balancing health and purity",
            bullets: [
              "Use clean water and hygienic materials.",
              "Avoid harmful scrubbing if you have a wound or skin condition.",
              "Do not cause yourself unnecessary hardship in the name of cleanliness.",
              "Do not develop repeated washing habits based only on doubts."
            ],
            note:
              "Health hygiene and ritual purity are related but are not identical in every case. Consult a qualified scholar for specific religious questions."
          }
        ],

        summary:
          "Keep your body clean, remove impurity properly, and do not cause yourself unnecessary hardship because of doubts."
      },

      hi: {
        title: "शरीर की पवित्रता",
        intro:
          "शरीर को साफ़ रखना इस्लामी स्वच्छता की एक महत्वपूर्ण शिक्षा है। व्यक्तिगत सफ़ाई, स्वास्थ्य और शरीयत की पवित्रता का ध्यान रखें।",

        image: "body-purity.png",

        sections: [
          {
            heading: "रोज़मर्रा की स्वच्छता",
            bullets: [
              "नियमित रूप से स्नान करें और शरीर साफ़ रखें।",
              "हाथ, नाखून और दिखाई देने वाली गंदगी साफ़ करें।",
              "शौचालय के उपयोग के बाद सही तरीके से सफ़ाई करें।",
              "शरीर पर लगी नापाकी को संबंधित नियमों के अनुसार दूर करें।",
              "व्यक्तिगत सफ़ाई के सामान को साफ़ रखें।"
            ]
          },
          {
            heading: "इस्तिंजा और सफ़ाई",
            paragraphs: [
              "पेशाब या शौच के बाद संबंधित स्थान से नापाकी दूर करने का ध्यान रखें। पानी उपलब्ध हो तो उससे सफ़ाई करना एक प्रचलित तरीका है।",
              "सफ़ाई करते समय नापाकी को शरीर या कपड़ों पर फैलने से बचाएँ।"
            ]
          },
          {
            heading: "स्वास्थ्य और पवित्रता में संतुलन",
            bullets: [
              "साफ़ पानी और स्वच्छ सामग्री का उपयोग करें।",
              "घाव या त्वचा की समस्या होने पर हानिकारक रगड़ से बचें।",
              "स्वच्छता के नाम पर स्वयं को अनावश्यक कठिनाई न दें।",
              "केवल संदेह के कारण बार-बार धोने की आदत न बनाएँ।"
            ],
            note:
              "स्वास्थ्य संबंधी स्वच्छता और शरीयत की पवित्रता आपस में संबंधित हैं, लेकिन हर मामले में एक जैसी नहीं हैं। विशेष धार्मिक प्रश्नों के लिए योग्य आलिम से पूछें।"
          }
        ],

        summary:
          "शरीर को साफ़ रखें, नापाकी सही तरीके से दूर करें और केवल संदेह के कारण स्वयं को अनावश्यक कठिनाई न दें।"
      }
    },

    "clothing-purity": {
      bn: {
        title: "পোশাকের পবিত্রতা",
        intro:
          "নামাজের জন্য পোশাক পবিত্র থাকা গুরুত্বপূর্ণ। পোশাকে নাপাকি লাগলে শরিয়ত অনুযায়ী তা পরিষ্কার করো এবং পোশাকের পরিচ্ছন্নতা বজায় রাখো।",

        image: "clothing-purity.png",

        sections: [
          {
            heading: "পোশাক পরিষ্কার রাখার নিয়ম",
            bullets: [
              "পোশাকে দৃশ্যমান ময়লা থাকলে পরিষ্কার করো।",
              "শরয়ি নাপাকি লাগলে সংশ্লিষ্ট স্থান ধুয়ে পরিষ্কার করো।",
              "পরিষ্কার পোশাক শুকনো ও পরিচ্ছন্ন স্থানে রাখো।",
              "পরিচ্ছন্ন পোশাক পরার আগে নিশ্চিত হও যে তা নাপাকির সংস্পর্শে আসেনি।"
            ]
          },
          {
            heading: "পোশাকে নাপাকি লাগলে",
            paragraphs: [
              "নাপাকি যে স্থানে লেগেছে তা শনাক্ত করে সংশ্লিষ্ট শরয়ি নিয়ম অনুযায়ী পরিষ্কার করো। সব পোশাক ফেলে দেওয়ার বা সম্পূর্ণ পোশাক ধোয়ার প্রয়োজন সব ক্ষেত্রে হয় না।",
              "নাপাকি দূর করার পদ্ধতি নাপাকির ধরন এবং অনুসৃত মাজহাবের বিধানের ওপর নির্ভর করতে পারে।"
            ]
          },
          {
            heading: "সাধারণ ভুল",
            bullets: [
              "নাপাকি পরিষ্কার না করে পোশাক ব্যবহার করা।",
              "সন্দেহমাত্রেই পুরো পোশাককে নাপাক ধরে নেওয়া।",
              "অন্যের পোশাক বা ব্যক্তিগত পরিচ্ছন্নতা নিয়ে বিদ্রূপ করা।",
              "অযথা পানি ও পরিষ্কারক অপচয় করা।"
            ]
          }
        ],

        summary:
          "পোশাক পরিষ্কার রাখো, প্রকৃত নাপাকি যথাযথভাবে দূর করো এবং অকারণ সন্দেহে পড়ো না।"
      },

      en: {
        title: "Clothing Purity",
        intro:
          "Clean clothing is important for salah. If clothing becomes ritually impure, clean it according to the applicable Islamic rules.",

        image: "clothing-purity.png",

        sections: [
          {
            heading: "Keeping clothes clean",
            bullets: [
              "Remove visible dirt from clothing.",
              "If ritual impurity is present, clean the affected area according to the relevant rules.",
              "Store clean clothing in a dry, clean place.",
              "Take care that clean clothing does not come into contact with impurity."
            ]
          },
          {
            heading: "If clothing becomes impure",
            paragraphs: [
              "Identify the affected area and clean it according to the applicable ruling. It is not always necessary to discard the clothing or wash the entire garment.",
              "The method may depend on the type of impurity and the school of jurisprudence you follow."
            ]
          },
          {
            heading: "Common mistakes",
            bullets: [
              "Using clothing without removing known impurity.",
              "Treating an entire garment as impure based only on doubt.",
              "Mocking other people's clothing or personal hygiene.",
              "Wasting water or cleaning products."
            ]
          }
        ],

        summary:
          "Keep clothing clean, remove actual impurity appropriately, and avoid unnecessary doubts."
      },

      hi: {
        title: "कपड़ों की पवित्रता",
        intro:
          "नमाज़ के लिए कपड़ों का पाक होना महत्वपूर्ण है। कपड़ों पर नापाकी लग जाए तो संबंधित इस्लामी नियमों के अनुसार उसे साफ़ करें।",

        image: "clothing-purity.png",

        sections: [
          {
            heading: "कपड़ों को साफ़ रखना",
            bullets: [
              "कपड़ों पर दिखाई देने वाली गंदगी साफ़ करें।",
              "शरीयत की नापाकी लगने पर संबंधित स्थान को नियमों के अनुसार साफ़ करें।",
              "साफ़ कपड़ों को सूखी और स्वच्छ जगह पर रखें।",
              "ध्यान दें कि साफ़ कपड़े नापाकी के संपर्क में न आएँ।"
            ]
          },
          {
            heading: "कपड़ों पर नापाकी लग जाए तो",
            paragraphs: [
              "प्रभावित स्थान पहचानें और लागू नियमों के अनुसार उसे साफ़ करें। हर बार पूरा कपड़ा फेंकना या पूरा कपड़ा धोना आवश्यक नहीं होता।",
              "सफ़ाई का तरीका नापाकी के प्रकार और आपके फ़िक़्ही मज़हब के नियमों पर निर्भर कर सकता है।"
            ]
          },
          {
            heading: "आम गलतियाँ",
            bullets: [
              "मालूम नापाकी साफ़ किए बिना कपड़े पहनना।",
              "केवल संदेह से पूरे कपड़े को नापाक मान लेना।",
              "दूसरों के कपड़ों या व्यक्तिगत सफ़ाई का मज़ाक उड़ाना।",
              "पानी और सफ़ाई के सामान को बर्बाद करना।"
            ]
          }
        ],

        summary:
          "कपड़े साफ़ रखें, वास्तविक नापाकी को सही तरीके से दूर करें और अनावश्यक संदेह से बचें।"
      }
    },

    "place-purity": {
      bn: {
        title: "স্থানের পবিত্রতা",
        intro:
          "নামাজের স্থানে পবিত্রতা বজায় রাখা জরুরি। পরিষ্কার জায়গা নির্বাচন করো এবং সেখানে শরয়ি নাপাকি থাকলে যথাযথভাবে পরিষ্কার করো।",

        image: "place-purity.png",

        sections: [
          {
            heading: "নামাজের স্থান প্রস্তুত করা",
            bullets: [
              "পরিষ্কার ও নিরাপদ স্থান নির্বাচন করো।",
              "জায়গায় শরয়ি নাপাকি থাকলে তা পরিষ্কার করো।",
              "জায়নামাজ বা কাপড় ব্যবহার করলে সেটিও পরিষ্কার রাখো।",
              "অন্যের চলাচলে বাধা সৃষ্টি করে এমন জায়গায় নামাজ পড়া এড়িয়ে চলো।"
            ]
          },
          {
            heading: "মেঝেতে নাপাকি থাকলে",
            paragraphs: [
              "নাপাকি যেখানে লেগেছে তা শনাক্ত করে সংশ্লিষ্ট বিধান অনুযায়ী পরিষ্কার করো। পানি দিয়ে পরিষ্কার করার সময় নাপাকি যেন অন্যত্র ছড়িয়ে না পড়ে তা খেয়াল রাখো।",
              "শুধু দাগ, গন্ধ বা পুরোনো ঘটনার সন্দেহের ভিত্তিতে সব সময় পুরো স্থানকে নাপাক ধরে নেওয়া ঠিক নয়; বিষয়টি পরিস্থিতি ও বিধানের ওপর নির্ভর করে।"
            ]
          },
          {
            heading: "মসজিদ ও সাধারণ স্থান",
            bullets: [
              "মসজিদে পরিচ্ছন্নতা বজায় রাখো।",
              "ময়লা বা ব্যবহৃত জিনিস নির্ধারিত স্থানে ফেলো।",
              "পানি ব্যবহার করলে মেঝে পিচ্ছিল করে রেখো না।",
              "সবার জন্য পরিচ্ছন্ন ও সম্মানজনক পরিবেশ বজায় রাখো।"
            ]
          }
        ],

        summary:
          "নামাজের স্থান পরিচ্ছন্ন রাখো, প্রকৃত নাপাকি দূর করো এবং অন্যের জন্যও স্থানটি নিরাপদ রাখো।"
      },

      en: {
        title: "Place Purity",
        intro:
          "Maintaining purity in the prayer area is important. Choose a clean place and remove any ritual impurity according to the applicable rules.",

        image: "place-purity.png",

        sections: [
          {
            heading: "Preparing a prayer area",
            bullets: [
              "Choose a clean and safe place.",
              "Remove any known ritual impurity.",
              "Keep prayer mats and cloths clean.",
              "Avoid praying where you obstruct other people's movement."
            ]
          },
          {
            heading: "If the floor is impure",
            paragraphs: [
              "Identify the affected area and clean it according to the relevant ruling. When using water, avoid spreading impurity to other places.",
              "Do not automatically declare an entire area impure based only on a stain, smell, or uncertain past event; the ruling depends on the circumstances."
            ]
          },
          {
            heading: "Mosques and shared spaces",
            bullets: [
              "Help keep the mosque clean.",
              "Dispose of rubbish in designated places.",
              "Do not leave floors slippery after using water.",
              "Maintain a clean and respectful environment for everyone."
            ]
          }
        ],

        summary:
          "Keep the prayer area clean, remove actual impurity, and make the space safe for others."
      },

      hi: {
        title: "स्थान की पवित्रता",
        intro:
          "नमाज़ की जगह को पाक रखना महत्वपूर्ण है। साफ़ स्थान चुनें और वहाँ मौजूद शरीयत की नापाकी को सही तरीके से दूर करें।",

        image: "place-purity.png",

        sections: [
          {
            heading: "नमाज़ की जगह तैयार करना",
            bullets: [
              "साफ़ और सुरक्षित स्थान चुनें।",
              "ज्ञात नापाकी को साफ़ करें।",
              "जानमाज़ या कपड़े को भी साफ़ रखें।",
              "ऐसी जगह नमाज़ पढ़ने से बचें जहाँ दूसरों का रास्ता रुकता हो।"
            ]
          },
          {
            heading: "फ़र्श पर नापाकी हो तो",
            paragraphs: [
              "प्रभावित स्थान को पहचानें और लागू नियमों के अनुसार साफ़ करें। पानी से सफ़ाई करते समय नापाकी को दूसरी जगह फैलने से बचाएँ।",
              "केवल दाग, गंध या किसी पुरानी घटना के संदेह से पूरे स्थान को हमेशा नापाक न मानें; नियम परिस्थिति पर निर्भर करते हैं।"
            ]
          },
          {
            heading: "मस्जिद और साझा स्थान",
            bullets: [
              "मस्जिद की स्वच्छता बनाए रखने में मदद करें।",
              "कचरा निर्धारित स्थान पर डालें।",
              "पानी के उपयोग के बाद फ़र्श को फिसलन भरा न छोड़ें।",
              "सभी के लिए स्वच्छ और सम्मानजनक वातावरण बनाए रखें।"
            ]
          }
        ],

        summary:
          "नमाज़ की जगह साफ़ रखें, वास्तविक नापाकी दूर करें और दूसरों की सुरक्षा का ध्यान रखें।"
      }
    },

    "impurity-removal": {
      bn: {
        title: "নাপাকি দূরীকরণ",
        intro:
          "শরীর, পোশাক বা নামাজের স্থানে শরয়ি নাপাকি লাগলে তা সংশ্লিষ্ট বিধান অনুযায়ী পরিষ্কার করতে হয়।",

        image: "impurity-removal.png",

        sections: [
          {
            heading: "প্রথমে কী করবে?",
            bullets: [
              "নাপাকি কোথায় লেগেছে তা শনাক্ত করো।",
              "যতটুকু অংশে নাপাকি লেগেছে তা বোঝার চেষ্টা করো।",
              "উপযুক্ত পদ্ধতিতে নাপাকি দূর করো।",
              "পরিষ্কার করার সময় নাপাকি অন্যত্র ছড়িয়ে পড়তে দিও না।"
            ]
          },
          {
            heading: "পানি দিয়ে পরিষ্কার করা",
            paragraphs: [
              "অনেক ধরনের নাপাকি পানি দিয়ে ধুয়ে দূর করা হয়। পরিষ্কার করার সময় নাপাকির বস্তুগত চিহ্ন দূর করার চেষ্টা করো।",
              "সব ধরনের নাপাকির জন্য একই পদ্ধতি প্রযোজ্য নয়। কিছু বিষয়ের বিধান মাজহাব ও পরিস্থিতি অনুযায়ী আলাদা হতে পারে।"
            ]
          },
          {
            heading: "সন্দেহ ও নিশ্চিততার পার্থক্য",
            bullets: [
              "নাপাকি নিশ্চিতভাবে জানা থাকলে তা পরিষ্কার করো।",
              "শুধু সন্দেহের কারণে পরিষ্কার থাকা জিনিসকে নাপাক ধরে নিও না।",
              "পরিষ্কার করার পর অকারণে বারবার একই কাজ করো না।",
              "জটিল পরিস্থিতিতে নির্ভরযোগ্য আলেমের পরামর্শ নাও।"
            ],
            note:
              "এটি প্রাথমিক শিক্ষামূলক নির্দেশনা; বিশেষ ধরনের নাপাকি ও বিশেষ পরিস্থিতির বিস্তারিত বিধান আলাদা হতে পারে।"
          }
        ],

        summary:
          "নাপাকি নিশ্চিত হলে সঠিকভাবে দূর করো; অকারণ সন্দেহে পড়ো না এবং প্রয়োজনে আলেমের পরামর্শ নাও।"
      },

      en: {
        title: "Removing Impurity",
        intro:
          "When ritual impurity affects the body, clothing, or prayer area, it should be cleaned according to the applicable rules.",

        image: "impurity-removal.png",

        sections: [
          {
            heading: "What should you do first?",
            bullets: [
              "Identify where the impurity is present.",
              "Determine which area has been affected.",
              "Use an appropriate cleaning method.",
              "Avoid spreading the impurity while cleaning."
            ]
          },
          {
            heading: "Cleaning with water",
            paragraphs: [
              "Many types of impurity are removed by washing with water. Try to remove the physical traces of the impurity.",
              "One method does not apply to every type of impurity. Some rulings differ according to the circumstances and school of jurisprudence."
            ]
          },
          {
            heading: "Distinguishing doubt from certainty",
            bullets: [
              "Clean something when impurity is known to be present.",
              "Do not declare an otherwise clean item impure based only on doubt.",
              "Do not repeat the same cleaning unnecessarily after it has been completed.",
              "Seek guidance from a qualified scholar in complex cases."
            ],
            note:
              "This is introductory educational guidance. Special types of impurity and circumstances may require more specific rulings."
          }
        ],

        summary:
          "Remove known impurity appropriately, avoid unnecessary doubts, and seek scholarly advice when needed."
      },

      hi: {
        title: "नापाकी दूर करना",
        intro:
          "शरीर, कपड़ों या नमाज़ की जगह पर शरीयत की नापाकी लग जाए तो संबंधित नियमों के अनुसार उसे साफ़ करना चाहिए।",

        image: "impurity-removal.png",

        sections: [
          {
            heading: "सबसे पहले क्या करें?",
            bullets: [
              "पहचानें कि नापाकी कहाँ लगी है।",
              "प्रभावित हिस्से को समझें।",
              "उचित तरीके से सफ़ाई करें।",
              "सफ़ाई करते समय नापाकी को दूसरी जगह फैलने से बचाएँ।"
            ]
          },
          {
            heading: "पानी से सफ़ाई",
            paragraphs: [
              "कई प्रकार की नापाकी को पानी से धोकर दूर किया जाता है। सफ़ाई करते समय नापाकी के भौतिक निशान हटाने का प्रयास करें।",
              "हर प्रकार की नापाकी के लिए एक ही तरीका लागू नहीं होता। कुछ नियम परिस्थिति और फ़िक़्ही मज़हब के अनुसार भिन्न हो सकते हैं।"
            ]
          },
          {
            heading: "संदेह और निश्चितता में अंतर",
            bullets: [
              "नापाकी का निश्चित पता हो तो उसे साफ़ करें।",
              "केवल संदेह के कारण साफ़ वस्तु को नापाक न मानें।",
              "सफ़ाई पूरी होने के बाद बिना कारण वही काम बार-बार न करें।",
              "जटिल स्थिति में योग्य आलिम से सलाह लें।"
            ],
            note:
              "यह प्रारंभिक शिक्षात्मक मार्गदर्शन है। विशेष प्रकार की नापाकी और परिस्थितियों में अलग नियम लागू हो सकते हैं।"
          }
        ],

        summary:
          "ज्ञात नापाकी को सही तरीके से दूर करें, अनावश्यक संदेह से बचें और ज़रूरत पड़ने पर आलिम से सलाह लें।"
      }
    },

    "hayez-nifas": {
      bn: {
        title: "হায়েজ ও নিফাস",
        intro:
          "হায়েজ হলো নারীদের মাসিক রক্তস্রাব এবং নিফাস হলো সন্তান প্রসবের পরের রক্তস্রাব। এ সময়ের ইবাদত ও পবিত্রতার বিধান সঠিকভাবে শেখা গুরুত্বপূর্ণ।",

        image: "hayez-nifas.png",

        sections: [
          {
            heading: "হায়েজ কী?",
            paragraphs: [
              "হায়েজ হলো নারীদের স্বাভাবিক মাসিক রক্তস্রাব, যার জন্য ইসলামী ফিকহে নির্দিষ্ট বিধান রয়েছে। এর শুরু, শেষ ও সর্বোচ্চ-সর্বনিম্ন সময়ের বিস্তারিত বিধান মাজহাবভেদে ভিন্ন হতে পারে।"
            ]
          },
          {
            heading: "নিফাস কী?",
            paragraphs: [
              "সন্তান প্রসবের পর যে রক্তস্রাব হয় তাকে নিফাস বলা হয়। নিফাসের সময়সীমা ও সংশ্লিষ্ট বিধান সম্পর্কে নিজের অনুসৃত মাজহাবের নির্ভরযোগ্য নির্দেশনা শিখে নাও।"
            ]
          },
          {
            heading: "এই সময়ে ইবাদতের বিধান",
            paragraphs: [
              "হায়েজ ও নিফাস চলাকালে নামাজ এবং রোজার বিধান সাধারণ অবস্থার থেকে আলাদা। সাধারণ সুন্নি ফিকহে এই সময়ের নামাজ আদায় করা হয় না এবং পরে সেই নামাজের কাজাও করতে হয় না; রমজানের ছুটে যাওয়া রোজা পরে কাজা করতে হয়।",
              "বিভিন্ন ইবাদত ও পরিস্থিতি অনুযায়ী বিস্তারিত বিধান থাকতে পারে। তাই নিজের অনুসৃত মাজহাব অনুযায়ী শিখে নাও।"
            ]
          },
          {
            heading: "রক্তস্রাব শেষ হলে",
            bullets: [
              "রক্তস্রাব সত্যিই শেষ হয়েছে কি না নিশ্চিত হও।",
              "হায়েজ বা নিফাস শেষ হলে নামাজ শুরু করার আগে শরিয়ত অনুযায়ী গোসল করো।",
              "অনিয়মিত রক্তস্রাব বা ইস্তিহাজার বিধান আলাদা হতে পারে।",
              "চিকিৎসাগত উদ্বেগ থাকলে স্বাস্থ্যকর্মীর পরামর্শ নাও।"
            ]
          },
          {
            heading: "মনে রাখার বিষয়",
            bullets: [
              "এটি স্বাভাবিক শারীরবৃত্তীয় বিষয়; এ নিয়ে কাউকে লজ্জা দেওয়া বা অপমান করা উচিত নয়।",
              "ব্যক্তিগত গোপনীয়তা রক্ষা করো।",
              "নিজের নির্দিষ্ট পরিস্থিতির ধর্মীয় বিধান নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নাও।",
              "অস্বাভাবিক বা অতিরিক্ত রক্তপাত হলে চিকিৎসা-পরামর্শ নাও।"
            ],
            note:
              "এই অংশটি প্রাথমিক শিক্ষার জন্য। হায়েজ, নিফাস ও ইস্তিহাজার সময়সীমা এবং বিধানের সূক্ষ্ম বিষয়গুলো মাজহাবভেদে আলাদা হতে পারে।"
          }
        ],

        summary:
          "হায়েজ ও নিফাসের বিধান সম্মানের সঙ্গে শেখো, রক্তস্রাব শেষ হলে শরিয়ত অনুযায়ী গোসল করো এবং নির্দিষ্ট প্রশ্নে নির্ভরযোগ্য পরামর্শ নাও।"
      },

      en: {
        title: "Hayd and Nifas",
        intro:
          "Hayd refers to menstrual bleeding, while nifas refers to postnatal bleeding. Learning the related rulings on worship and purification is important.",

        image: "hayez-nifas.png",

        sections: [
          {
            heading: "What is hayd?",
            paragraphs: [
              "Hayd is menstrual bleeding and has specific rulings in Islamic jurisprudence. Details about its beginning, end, and maximum or minimum duration can differ among schools of jurisprudence."
            ]
          },
          {
            heading: "What is nifas?",
            paragraphs: [
              "Nifas is bleeding after childbirth. Learn the applicable duration and rulings from a reliable source within the school of jurisprudence you follow."
            ]
          },
          {
            heading: "Worship during this time",
            paragraphs: [
              "The rulings on salah and fasting during menstruation and postnatal bleeding differ from those in ordinary circumstances. In mainstream Sunni jurisprudence, salah is not performed during these periods and is not made up afterward; missed Ramadan fasts are made up later.",
              "Specific situations and other forms of worship may require additional guidance. Follow reliable instruction according to your school of jurisprudence."
            ]
          },
          {
            heading: "When bleeding ends",
            bullets: [
              "Make sure the bleeding has actually ended.",
              "After menstruation or nifas ends, perform the required ghusl before resuming salah.",
              "Irregular bleeding and istihada may have different rulings.",
              "Seek medical advice if you have health concerns."
            ]
          },
          {
            heading: "Important reminders",
            bullets: [
              "These are normal physiological matters; nobody should be shamed or insulted for them.",
              "Respect personal privacy.",
              "Ask a qualified scholar about the rules for your particular circumstances.",
              "Seek medical care for unusual or excessive bleeding."
            ],
            note:
              "This is introductory educational guidance. Detailed time limits and rulings for hayd, nifas, and istihada may differ among schools of jurisprudence."
          }
        ],

        summary:
          "Learn the rulings on hayd and nifas respectfully, perform ghusl when the bleeding ends, and seek reliable advice for specific circumstances."
      },

      hi: {
        title: "हैज़ और निफ़ास",
        intro:
          "हैज़ महिलाओं के मासिक धर्म के रक्तस्राव को और निफ़ास प्रसव के बाद होने वाले रक्तस्राव को कहते हैं। इस समय इबादत और पवित्रता के नियम सीखना महत्वपूर्ण है।",

        image: "hayez-nifas.png",

        sections: [
          {
            heading: "हैज़ क्या है?",
            paragraphs: [
              "हैज़ महिलाओं का मासिक धर्म है, जिसके बारे में इस्लामी फ़िक़्ह में विशेष नियम हैं। इसके आरंभ, समाप्ति और न्यूनतम या अधिकतम अवधि के विवरण अलग-अलग फ़िक़्ही मज़हबों में भिन्न हो सकते हैं।"
            ]
          },
          {
            heading: "निफ़ास क्या है?",
            paragraphs: [
              "प्रसव के बाद होने वाले रक्तस्राव को निफ़ास कहते हैं। इसकी अवधि और संबंधित नियम अपने फ़िक़्ही मज़हब के विश्वसनीय स्रोत से सीखें।"
            ]
          },
          {
            heading: "इस समय इबादत के नियम",
            paragraphs: [
              "हैज़ और निफ़ास के दौरान नमाज़ और रोज़े के नियम सामान्य स्थिति से अलग होते हैं। मुख्यधारा की सुन्नी फ़िक़्ह में इस अवधि में नमाज़ नहीं पढ़ी जाती और बाद में उसकी क़ज़ा नहीं होती; रमज़ान के छूटे हुए रोज़ों की बाद में क़ज़ा की जाती है।",
              "विशेष परिस्थितियों और अन्य इबादतों के लिए अतिरिक्त मार्गदर्शन आवश्यक हो सकता है। अपने फ़िक़्ही मज़हब के अनुसार विश्वसनीय निर्देश लें।"
            ]
          },
          {
            heading: "रक्तस्राव समाप्त होने पर",
            bullets: [
              "सुनिश्चित करें कि रक्तस्राव वास्तव में समाप्त हो गया है।",
              "हैज़ या निफ़ास समाप्त होने के बाद नमाज़ शुरू करने से पहले आवश्यक ग़ुस्ल करें।",
              "अनियमित रक्तस्राव और इस्तिहाज़ा के नियम अलग हो सकते हैं।",
              "स्वास्थ्य संबंधी चिंता होने पर चिकित्सक से सलाह लें।"
            ]
          },
          {
            heading: "महत्वपूर्ण बातें",
            bullets: [
              "ये सामान्य शारीरिक प्रक्रियाएँ हैं; इनके लिए किसी को शर्मिंदा या अपमानित न करें।",
              "व्यक्तिगत गोपनीयता का सम्मान करें।",
              "अपनी परिस्थिति के धार्मिक नियमों के लिए योग्य आलिम से पूछें।",
              "असामान्य या अत्यधिक रक्तस्राव होने पर चिकित्सा सहायता लें।"
            ],
            note:
              "यह प्रारंभिक शिक्षात्मक जानकारी है। हैज़, निफ़ास और इस्तिहाज़ा की अवधि तथा विस्तृत नियम फ़िक़्ही मज़हबों के अनुसार भिन्न हो सकते हैं।"
          }
        ],

        summary:
          "हैज़ और निफ़ास के नियम सम्मानपूर्वक सीखें, रक्तस्राव समाप्त होने पर आवश्यक ग़ुस्ल करें और विशेष परिस्थिति में विश्वसनीय सलाह लें।"
      }
    }
  };

  /* ----------------------------------------------------------
     4. GENERAL TRANSLATED SECTIONS
     ---------------------------------------------------------- */

  const COMMON = {
    bn: {
      sourceHeading: "কুরআনের নির্দেশনা",
      sourceText:
        "সূরা আল-মায়িদা ৫:৬-এ ওযু, গোসল ও পানি না পাওয়া বা ব্যবহার করতে না পারার নির্দিষ্ট পরিস্থিতিতে তায়াম্মুমের নির্দেশনা রয়েছে।",
      reminderHeading: "মনে রাখবে",
      reminderText:
        "এই পেজটি প্রাথমিক শিক্ষামূলক সহায়িকা। নির্দিষ্ট মাসআলা ও মাজহাবভিত্তিক বিস্তারিত বিধানের জন্য নির্ভরযোগ্য আলেমের পরামর্শ নাও।"
    },
    en: {
      sourceHeading: "Qur'anic guidance",
      sourceText:
        "Qur'an 5:6 provides guidance on wudu, ghusl, and tayammum in specified circumstances when water is unavailable or cannot be used.",
      reminderHeading: "Remember",
      reminderText:
        "This page is an introductory educational guide. Consult a qualified scholar for specific rulings and detailed guidance according to your school of jurisprudence."
    },
    hi: {
      sourceHeading: "क़ुरआन का मार्गदर्शन",
      sourceText:
        "क़ुरआन 5:6 में वुज़ू, ग़ुस्ल और पानी उपलब्ध न होने या उसका उपयोग संभव न होने की विशेष परिस्थितियों में तयम्मुम के बारे में मार्गदर्शन है।",
      reminderHeading: "याद रखें",
      reminderText:
        "यह पृष्ठ प्रारंभिक शिक्षात्मक मार्गदर्शिका है। विशेष नियमों और अपने फ़िक़्ही मज़हब के विस्तृत मार्गदर्शन के लिए योग्य आलिम से सलाह लें।"
    }
  };

  /* ----------------------------------------------------------
     5. LANGUAGE MANAGEMENT
     ---------------------------------------------------------- */

  function getSettings() {
    try {
      const raw = localStorage.getItem(CONFIG.settingsKey);

      if (!raw) {
        return {};
      }

      const parsed = JSON.parse(raw);

      return parsed && typeof parsed === "object"
        ? parsed
        : {};
    } catch (error) {
      console.warn("IBADAT: Could not read app settings.", error);
      return {};
    }
  }

  function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    const urlLanguage = params.get("lang");

    if (CONFIG.supportedLanguages.includes(urlLanguage)) {
      return urlLanguage;
    }

    const settings = getSettings();

    const savedLanguage =
      settings.language ||
      settings.lang ||
      settings.selectedLanguage;

    if (CONFIG.supportedLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }

    const documentLanguage = document.documentElement.lang;

    if (CONFIG.supportedLanguages.includes(documentLanguage)) {
      return documentLanguage;
    }

    return CONFIG.defaultLanguage;
  }

  let currentLanguage = getLanguage();
  let currentDetailId = null;

  function textSet(element, value) {
    if (element && typeof value === "string") {
      element.textContent = value;
    }
  }

  function applyLanguage() {
    const strings = UI[currentLanguage] || UI.bn;

    document.documentElement.lang = currentLanguage;

    document.title = strings.documentTitle;

    textSet(pageTitle, strings.pageTitle);
    textSet(pageIntro, strings.pageIntro);
    textSet(backLabel, strings.back);
    textSet(footerText, strings.footer);
    textSet(detailFooterText, strings.footer);

    renderCards();

    if (currentDetailId) {
      renderDetail(currentDetailId);
    }
  }

  /* ----------------------------------------------------------
     6. DARK MODE
     Reads appSettings.dark.
     Supports both body.dark-mode and body.dark.
     ---------------------------------------------------------- */

  function applyDarkMode() {
    const settings = getSettings();
    const isDark = settings.dark === true;

    document.body.classList.toggle("dark-mode", isDark);
    document.body.classList.toggle("dark", isDark);

    page.classList.toggle("dark-mode", isDark);
    page.classList.toggle("dark", isDark);

    detailView.classList.toggle("dark-mode", isDark);
    detailView.classList.toggle("dark", isDark);

    const themeColor = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        isDark ? "#092c1b" : "#0F5132"
      );
    }
  }

  /* ----------------------------------------------------------
     7. SAFE HTML HELPERS
     ---------------------------------------------------------- */

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function imagePath(fileName) {
    return CONFIG.imageBase + fileName;
  }

  function createImage(fileName, alt, className = "") {
    const img = document.createElement("img");

    img.src = imagePath(fileName);
    img.alt = alt || "";
    img.loading = "lazy";
    img.decoding = "async";

    if (className) {
      img.className = className;
    }

    img.addEventListener("error", () => {
      img.dataset.imageUnavailable = "true";
      img.style.display = "none";

      const existingNotice = img.nextElementSibling;

      if (
        existingNotice &&
        existingNotice.classList.contains("image-fallback")
      ) {
        existingNotice.hidden = false;
        return;
      }

      const fallback = document.createElement("p");

      fallback.className = "image-fallback";
      fallback.textContent =
        (UI[currentLanguage] || UI.bn).noImage;

      img.insertAdjacentElement("afterend", fallback);
    });

    return img;
  }

  function appendParagraph(parent, text) {
    const p = document.createElement("p");
    p.textContent = text;
    parent.appendChild(p);
  }

  function appendList(parent, items, ordered = false) {
    if (!Array.isArray(items) || items.length === 0) {
      return;
    }

    const list = document.createElement(ordered ? "ol" : "ul");

    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    parent.appendChild(list);
  }

  /* ----------------------------------------------------------
     8. RENDER THE EIGHT MAIN CARDS
     ---------------------------------------------------------- */

  function renderCards() {
    const strings = UI[currentLanguage] || UI.bn;

    learningGrid.replaceChildren();

    strings.cards.forEach((card) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "learning-card";
      button.dataset.lesson = card.id;
      button.setAttribute("aria-haspopup", "true");
      button.setAttribute("aria-controls", "detailView");

      const image = createImage(
        card.image,
        card.title,
        ""
      );

      const title = document.createElement("h2");
      title.textContent = card.title;

      const description = document.createElement("p");
      description.textContent = card.description;

      const arrow = document.createElement("span");
      arrow.className = "card-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = currentLanguage === "en" ? "→" : "←";

      button.append(image, title, description, arrow);

      button.addEventListener("click", () => {
        openDetail(card.id);
      });

      learningGrid.appendChild(button);
    });
  }

  /* ----------------------------------------------------------
     9. RENDER DETAIL SECTIONS
     ---------------------------------------------------------- */

  function renderStep(step, index) {
    const strings = UI[currentLanguage] || UI.bn;

    const article = document.createElement("article");
    article.className = "lesson-card";

    const heading = document.createElement("h3");
    heading.className = "step-heading";

    const number = document.createElement("span");
    number.className = "step-number";
    number.textContent = String(index + 1);

    const title = document.createElement("span");
    title.textContent = step.title;

    heading.append(number, title);
    article.appendChild(heading);

    if (step.image) {
      article.appendChild(
        createImage(
          step.image,
          step.title,
          "step-image"
        )
      );
    }

    appendParagraph(article, step.text);

    if (step.note) {
      const note = document.createElement("aside");
      note.className = "info-note";
      note.textContent = step.note;
      article.appendChild(note);
    }

    return article;
  }

  function renderSection(section) {
    const article = document.createElement("article");
    article.className = "detail-panel";

    if (section.heading) {
      const heading = document.createElement("h2");
      heading.textContent = section.heading;
      article.appendChild(heading);
    }

    if (Array.isArray(section.paragraphs)) {
      section.paragraphs.forEach((paragraph) => {
        appendParagraph(article, paragraph);
      });
    }

    if (section.bullets) {
      appendList(article, section.bullets);
    }

    if (section.list) {
      appendList(article, section.list, true);
    }

    if (Array.isArray(section.steps)) {
      section.steps.forEach((step, index) => {
        article.appendChild(renderStep(step, index));
      });
    }

    if (section.note) {
      const note = document.createElement("aside");
      note.className = "info-note";
      note.textContent = section.note;
      article.appendChild(note);
    }

    if (section.important) {
      const note = document.createElement("aside");
      note.className = "important-note";
      note.textContent = section.important;
      article.appendChild(note);
    }

    return article;
  }

  function renderDetail(id) {
    const strings = UI[currentLanguage] || UI.bn;
    const languageLessons = LESSONS[id];
    const lesson = languageLessons
      ? languageLessons[currentLanguage]
      : null;

    if (!lesson) {
      detailContent.replaceChildren();

      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        currentLanguage === "en"
          ? "This lesson is currently unavailable."
          : currentLanguage === "hi"
            ? "यह पाठ अभी उपलब्ध नहीं है।"
            : "এই পাঠটি বর্তমানে পাওয়া যাচ্ছে না।";

      detailContent.appendChild(errorMessage);
      return;
    }

    textSet(detailTitle, lesson.title);
    textSet(backLabel, strings.back);
    textSet(detailFooterText, strings.footer);

    detailContent.replaceChildren();

    const hero = document.createElement("article");
    hero.className = "detail-panel";

    if (lesson.image) {
      hero.appendChild(
        createImage(
          lesson.image,
          lesson.title,
          "detail-main-image"
        )
      );
    }

    const heroHeading = document.createElement("h2");
    heroHeading.textContent = lesson.title;
    hero.appendChild(heroHeading);

    appendParagraph(hero, lesson.intro);

    detailContent.appendChild(hero);

    lesson.sections.forEach((section) => {
      detailContent.appendChild(renderSection(section));
    });

    const summaryPanel = document.createElement("article");
    summaryPanel.className = "detail-panel";

    const summaryHeading = document.createElement("h2");
    summaryHeading.textContent =
      (UI[currentLanguage] || UI.bn).summary;

    summaryPanel.appendChild(summaryHeading);
    appendParagraph(summaryPanel, lesson.summary);

    detailContent.appendChild(summaryPanel);

    const common = COMMON[currentLanguage] || COMMON.bn;

    const sourcePanel = document.createElement("article");
    sourcePanel.className = "detail-panel";

    const sourceHeading = document.createElement("h2");
    sourceHeading.textContent = common.sourceHeading;

    sourcePanel.appendChild(sourceHeading);
    appendParagraph(sourcePanel, common.sourceText);

    detailContent.appendChild(sourcePanel);

    const reminderPanel = document.createElement("aside");
    reminderPanel.className = "important-note";

    const reminderHeading = document.createElement("strong");
    reminderHeading.textContent =
      common.reminderHeading + ": ";

    reminderPanel.appendChild(reminderHeading);
    reminderPanel.appendChild(
      document.createTextNode(common.reminderText)
    );

    detailContent.appendChild(reminderPanel);
  }

  /* ----------------------------------------------------------
     10. NAVIGATION: MAIN PAGE <-> DETAIL PAGE
     ---------------------------------------------------------- */

  function openDetail(id) {
    if (!LESSONS[id]) {
      return;
    }

    currentDetailId = id;

    renderDetail(id);

    page.hidden = true;
    detailView.hidden = false;

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });

    detailTitle.setAttribute("tabindex", "-1");
    detailTitle.focus({
      preventScroll: true
    });
  }

  function closeDetail() {
    currentDetailId = null;

    detailView.hidden = true;
    page.hidden = false;

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });

    const firstCard = $(".learning-card", learningGrid);

    if (firstCard) {
      firstCard.focus({
        preventScroll: true
      });
    }
  }

  backButton.addEventListener("click", closeDetail);

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      !detailView.hidden
    ) {
      closeDetail();
    }
  });

  /* ----------------------------------------------------------
     11. OPTIONAL BROWSER BACK-BUTTON SUPPORT
     ---------------------------------------------------------- */

  let historyEntryAdded = false;

  function openDetailWithHistory(id) {
    openDetail(id);

    if (!historyEntryAdded) {
      try {
        window.history.pushState(
          {
            purityDetail: id
          },
          "",
          window.location.href
        );

        historyEntryAdded = true;
      } catch (error) {
        console.warn(
          "IBADAT: Browser history state could not be updated.",
          error
        );
      }
    }
  }

  window.addEventListener("popstate", () => {
    if (!detailView.hidden) {
      closeDetail();
    }

    historyEntryAdded = false;
  });

  /*
    Use the history-aware function for card clicks.
    This keeps the browser Back button useful without changing
    the original URL language parameter.
  */

  learningGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-lesson]");

    if (!card) {
      return;
    }

    const id = card.dataset.lesson;

    if (id && LESSONS[id]) {
      openDetailWithHistory(id);
    }
  });

  /* ----------------------------------------------------------
     12. SETTINGS CHANGES FROM OTHER APP PAGES
     ---------------------------------------------------------- */

  window.addEventListener("storage", (event) => {
    if (event.key === CONFIG.settingsKey) {
      applyDarkMode();

      const settings = getSettings();

      const savedLanguage =
        settings.language ||
        settings.lang ||
        settings.selectedLanguage;

      if (
        CONFIG.supportedLanguages.includes(savedLanguage) &&
        !new URLSearchParams(window.location.search).has("lang")
      ) {
        currentLanguage = savedLanguage;
        applyLanguage();
      }
    }
  });

  /*
    Other parts of the app may dispatch this event after updating
    appSettings in the same browser window:
      window.dispatchEvent(new Event("appSettingsChanged"));
  */

  window.addEventListener("appSettingsChanged", () => {
    applyDarkMode();

    const params = new URLSearchParams(window.location.search);

    if (!params.has("lang")) {
      const settings = getSettings();

      const savedLanguage =
        settings.language ||
        settings.lang ||
        settings.selectedLanguage;

      if (CONFIG.supportedLanguages.includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        applyLanguage();
      }
    }
  });

  /* ----------------------------------------------------------
     13. INITIALIZE THE PAGE
     ---------------------------------------------------------- */

  function initialize() {
    applyDarkMode();
    applyLanguage();

    page.hidden = false;
    detailView.hidden = true;

    textSet(
      footerText,
      (UI[currentLanguage] || UI.bn).footer
    );

    textSet(
      detailFooterText,
      (UI[currentLanguage] || UI.bn).footer
    );
  }

  initialize();

  /* ----------------------------------------------------------
     14. OPTIONAL PUBLIC API
     Other app scripts can use these functions if needed.
     ---------------------------------------------------------- */

  window.IBADATPurity = {
    openDetail,
    closeDetail,

    setLanguage(language) {
      if (!CONFIG.supportedLanguages.includes(language)) {
        return false;
      }

      currentLanguage = language;
      applyLanguage();

      return true;
    },

    refreshSettings() {
      applyDarkMode();

      const settings = getSettings();
      const savedLanguage =
        settings.language ||
        settings.lang ||
        settings.selectedLanguage;

      if (CONFIG.supportedLanguages.includes(savedLanguage)) {
        currentLanguage = savedLanguage;
      }

      applyLanguage();
    },

    getLanguage() {
      return currentLanguage;
    },

    getLessonIds() {
      return Object.keys(LESSONS);
    }
  };
})();
