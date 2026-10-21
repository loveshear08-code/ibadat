/* =========================================================
   IBADAT — PAK-PABITRATA / NAMAZ PURITY
   File: js/namaz-purity.js
   Features:
   - 8 learning options
   - Bengali / English / Hindi
   - Light / dark mode
   - Top bar and bottom bar
   - Responsive cards and detail boards
   - Wudu: 8 steps
   - Ghusl: 5 steps
   - Tayammum: 3 steps
   - Reads appSettings when available
   ========================================================= */

(function () {
  "use strict";

  /* ---------- ELEMENTS ---------- */

  const $ = (id) => document.getElementById(id);

  const page = $("purityPage");
  const pageTitle = $("pageTitle");
  const pageIntro = $("pageIntro");
  const grid = $("learningGrid");
  const footerText = $("footerText");

  const detailView = $("detailView");
  const detailTitle = $("detailTitle");
  const detailSubtitle = $("detailSubtitle");
  const detailContent = $("detailContent");
  const detailFooterText = $("detailFooterText");

  if (!page || !grid || !detailView || !detailContent) {
    console.error(
      "IBADAT: Required HTML elements were not found. " +
      "Check purityPage, learningGrid, detailView and detailContent."
    );
    return;
  }

  /* ---------- SETTINGS ---------- */

  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem("appSettings") || "{}");
    } catch (error) {
      return {};
    }
  }

  const settings = readSettings();

  let currentLanguage =
    settings.language ||
    settings.lang ||
    settings.selectedLanguage ||
    "bn";

  if (!["bn", "en", "hi"].includes(currentLanguage)) {
    currentLanguage = "bn";
  }

  let darkMode = settings.dark === true;

  /* ---------- LANGUAGE TEXT ---------- */

  const UI = {
    bn: {
      title: "পাক-পবিত্রতা",
      subtitle: "শুদ্ধতার পথে শেখা ও অনুশীলন",
      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
      home: "মূল পাতা",
      topLabel: "ইবাদত • পবিত্রতা শিক্ষা",
      choose: "শিখুন ও অনুশীলন করুন",
      open: "বিস্তারিত শিক্ষা",
      remember: "মনে রাখুন",
      reminder: "গুরুত্বপূর্ণ স্মরণিকা",
      quran: "কুরআনের নির্দেশনা",
      summary: "সংক্ষেপে",
      next: "পরবর্তী শিক্ষা",
      language: "ভাষা",
      light: "লাইট মোড",
      dark: "ডার্ক মোড",
      noImage: "ছবি পাওয়া যায়নি",
      intro: "ভূমিকা",
      step: "ধাপ",
      caution: "সতর্কতা",
      sourceNote:
        "এটি সাধারণ শিক্ষামূলক নির্দেশনা। নির্দিষ্ট পরিস্থিতিতে যোগ্য আলেমের পরামর্শ নিন।"
    },
    en: {
      title: "Purity",
      subtitle: "Learn and practise the path to cleanliness",
      footer: "Maintain purity and find peace in worship.",
      home: "Home",
      topLabel: "IBADAT • Purity Learning",
      choose: "Learn and practise",
      open: "Detailed lesson",
      remember: "Remember",
      reminder: "Important reminder",
      quran: "Qur'anic guidance",
      summary: "In summary",
      next: "Next lesson",
      language: "Language",
      light: "Light mode",
      dark: "Dark mode",
      noImage: "Image unavailable",
      intro: "Introduction",
      step: "Step",
      caution: "Caution",
      sourceNote:
        "This is general educational guidance. Consult a qualified scholar for specific circumstances."
    },
    hi: {
      title: "पवित्रता",
      subtitle: "पवित्रता के मार्ग को सीखें और अपनाएँ",
      footer: "पवित्रता बनाए रखें और इबादत में सुकून पाएँ।",
      home: "मुख्य पृष्ठ",
      topLabel: "इबादत • पवित्रता शिक्षा",
      choose: "सीखें और अभ्यास करें",
      open: "विस्तृत पाठ",
      remember: "याद रखें",
      reminder: "महत्वपूर्ण स्मरण",
      quran: "क़ुरआनी मार्गदर्शन",
      summary: "संक्षेप में",
      next: "अगला पाठ",
      language: "भाषा",
      light: "लाइट मोड",
      dark: "डार्क मोड",
      noImage: "चित्र उपलब्ध नहीं",
      intro: "परिचय",
      step: "चरण",
      caution: "सावधानी",
      sourceNote:
        "यह सामान्य शैक्षिक मार्गदर्शन है। विशेष परिस्थितियों में योग्य आलिम से सलाह लें।"
    }
  };

  /* ---------- LESSON DATA ---------- */

  const LESSONS = [
    {
      id: "wudu",
      image: "wudu.png",
      bn: {
        title: "ওযু",
        subtitle: "নামাজের আগে পবিত্রতা অর্জন",
        intro:
          "ওযু হলো নির্দিষ্ট অঙ্গ ধৌত ও মাসেহ করার মাধ্যমে ইবাদতের জন্য পবিত্রতা অর্জনের একটি পদ্ধতি। নামাজের জন্য ওযু প্রয়োজন হয় যখন শরিয়ত অনুযায়ী ওযু থাকা আবশ্যক।",
        sections: [
          {
            title: "১. নিয়ত ও প্রস্তুতি",
            image: "wudu-hands.png",
            text:
              "মনে ওযু করার ইচ্ছা রাখুন। হাত পরিষ্কার আছে কি না দেখুন এবং পরিষ্কার পানি প্রস্তুত করুন। মুখে নিয়ত উচ্চারণ করা আবশ্যক—এমন ধারণা করবেন না।"
          },
          {
            title: "২. দুই হাত ধোয়া",
            image: "wudu-hands.png",
            text:
              "দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নিন। আঙুলের ফাঁকেও পানি পৌঁছানোর চেষ্টা করুন।"
          },
          {
            title: "৩. কুলি করা",
            image: "wudu-mouth.png",
            text:
              "মুখে পানি নিয়ে কুলি করুন। পানি ব্যবহারে চিকিৎসাগত অসুবিধা থাকলে নিজের অবস্থার উপযোগী ব্যবস্থা নিন।"
          },
          {
            title: "৪. নাকে পানি দেওয়া",
            image: "wudu-nose.png",
            text:
              "নাকে পানি পৌঁছে পরিষ্কার করুন। অসুস্থতা বা ক্ষতির আশঙ্কা থাকলে অতিরিক্ত কষ্ট করবেন না।"
          },
          {
            title: "৫. মুখ ধোয়া",
            image: "wudu-face.png",
            text:
              "কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং এক কানের পাশ থেকে অন্য কানের পাশ পর্যন্ত মুখের নির্ধারিত অংশ ধুয়ে নিন।"
          },
          {
            title: "৬. দুই হাত কনুইসহ ধোয়া",
            image: "wudu-arms.png",
            text:
              "প্রথমে ডান হাত, পরে বাম হাত কনুইসহ ধুয়ে নিন। আংটি বা এমন কিছু থাকলে যার নিচে পানি পৌঁছায় না, তা সরিয়ে বা নড়িয়ে পানি পৌঁছাতে সাহায্য করুন।"
          },
          {
            title: "৭. মাথা মাসেহ",
            image: "wudu-head.png",
            text:
              "ভেজা হাত দিয়ে মাথা মাসেহ করুন। মাসেহের সুনির্দিষ্ট পরিমাণ ও পদ্ধতিতে ফিকহি মতভেদ রয়েছে; নিজের অনুসৃত নির্ভরযোগ্য শিক্ষাপদ্ধতি অনুসরণ করুন।"
          },
          {
            title: "৮. কান মাসেহ ও পা ধোয়া",
            image: "wudu-ears.png",
            text:
              "কান মাসেহ করুন। এরপর দুই পা টাখনুসহ ধুয়ে নিন; আঙুলের ফাঁকে পানি পৌঁছানো নিশ্চিত করুন।"
          }
        ],
        summary:
          "ওযুর অঙ্গগুলো মনোযোগ দিয়ে পরিষ্কার করুন। অযথা পানি অপচয় করবেন না এবং ওযুকে তাড়াহুড়োর কাজ বানাবেন না।",
        quran:
          "সূরা আল-মায়িদা ৫:৬-এ নামাজের জন্য ওযু এবং পবিত্রতা অর্জনের নির্দেশনা এসেছে।",
        reminder:
          "ওযুর ফরজ, সুন্নত এবং ওযু ভঙ্গের বিষয়গুলো বিস্তারিতভাবে শেখার জন্য নির্ভরযোগ্য আলেমের কাছ থেকে শিক্ষা নিন।"
      },
      en: {
        title: "Wudu",
        subtitle: "Purification before prayer",
        intro:
          "Wudu is a prescribed form of purification involving washing particular parts of the body and wiping the head. It is required for prayer when Islamic law requires a state of ablution.",
        sections: [
          {
            title: "1. Intention and preparation",
            image: "wudu-hands.png",
            text:
              "Intend in your heart to perform wudu and prepare clean water. Do not assume that saying the intention aloud is obligatory."
          },
          {
            title: "2. Wash both hands",
            image: "wudu-hands.png",
            text:
              "Wash both hands up to the wrists, taking care to clean between the fingers."
          },
          {
            title: "3. Rinse the mouth",
            image: "wudu-mouth.png",
            text:
              "Take water into the mouth and rinse. If a medical condition makes this difficult, act according to your circumstances."
          },
          {
            title: "4. Clean the nose",
            image: "wudu-nose.png",
            text:
              "Bring water into the nose and clean it. Avoid causing harm if you are ill or have a medical restriction."
          },
          {
            title: "5. Wash the face",
            image: "wudu-face.png",
            text:
              "Wash the prescribed area of the face, from the hairline to below the chin and across the area between the ears."
          },
          {
            title: "6. Wash the arms",
            image: "wudu-arms.png",
            text:
              "Wash the right arm and then the left, including the elbows. Ensure that water reaches the skin."
          },
          {
            title: "7. Wipe the head",
            image: "wudu-head.png",
            text:
              "Wipe the head with wet hands. Details of the required extent differ among schools of Islamic jurisprudence."
          },
          {
            title: "8. Wipe the ears and wash the feet",
            image: "wudu-ears.png",
            text:
              "Wipe the ears and wash both feet, including the ankles. Ensure water reaches between the toes."
          }
        ],
        summary:
          "Perform each step carefully, avoid wasting water, and learn the correct requirements of wudu.",
        quran:
          "Qur'an 5:6 gives instructions about ablution and purification for prayer.",
        reminder:
          "Learn the obligatory acts, recommended acts, and nullifiers of wudu from a trusted qualified scholar."
      },
      hi: {
        title: "वुज़ू",
        subtitle: "नमाज़ से पहले पवित्रता",
        intro:
          "वुज़ू एक निर्धारित पवित्रता की प्रक्रिया है, जिसमें शरीर के कुछ अंग धोए जाते हैं और सिर का मसह किया जाता है। जब शरीअत के अनुसार आवश्यक हो, तब नमाज़ के लिए वुज़ू किया जाता है।",
        sections: [
          {
            title: "1. नीयत और तैयारी",
            image: "wudu-hands.png",
            text:
              "दिल में वुज़ू करने की नीयत रखें और साफ पानी तैयार करें। नीयत को ज़ोर से बोलना अनिवार्य न समझें।"
          },
          {
            title: "2. दोनों हाथ धोना",
            image: "wudu-hands.png",
            text:
              "दोनों हाथ कलाइयों तक धोएँ और उँगलियों के बीच भी सफाई करें।"
          },
          {
            title: "3. कुल्ली करना",
            image: "wudu-mouth.png",
            text:
              "मुँह में पानी लेकर कुल्ली करें। बीमारी या चिकित्सकीय परेशानी हो तो अपनी स्थिति के अनुसार सावधानी रखें।"
          },
          {
            title: "4. नाक साफ करना",
            image: "wudu-nose.png",
            text:
              "नाक में पानी पहुँचाकर उसे साफ करें। नुकसान की आशंका हो तो अपने ऊपर ज़ोर न डालें।"
          },
          {
            title: "5. चेहरा धोना",
            image: "wudu-face.png",
            text:
              "निर्धारित चेहरे को बालों की सीमा से ठोड़ी के नीचे तक और एक कान के पास से दूसरे कान के पास तक धोएँ।"
          },
          {
            title: "6. दोनों बाज़ू धोना",
            image: "wudu-arms.png",
            text:
              "पहले दायाँ और फिर बायाँ बाज़ू कोहनियों सहित धोएँ। पानी त्वचा तक पहुँचने दें।"
          },
          {
            title: "7. सिर का मसह",
            image: "wudu-head.png",
            text:
              "गीले हाथों से सिर का मसह करें। मसह की मात्रा और तरीके में फ़िक़्ही मतभेद पाए जाते हैं।"
          },
          {
            title: "8. कान का मसह और पैर धोना",
            image: "wudu-ears.png",
            text:
              "कानों का मसह करें और दोनों पैर टखनों सहित धोएँ। उँगलियों के बीच पानी पहुँचाएँ।"
          }
        ],
        summary:
          "हर चरण सावधानी से पूरा करें, पानी बर्बाद न करें और वुज़ू के सही नियम सीखें।",
        quran:
          "क़ुरआन 5:6 में नमाज़ के लिए वुज़ू और पवित्रता के निर्देश दिए गए हैं।",
        reminder:
          "वुज़ू के फ़र्ज़, सुन्नत और वुज़ू तोड़ने वाली बातों को किसी विश्वसनीय आलिम से सीखें।"
      }
    },

    {
      id: "ghusl",
      image: "ghusl.png",
      bn: {
        title: "গোসল",
        subtitle: "শরিয়তসম্মত পবিত্রতার গোসল",
        intro:
          "গোসল বলতে নির্দিষ্ট অবস্থায় পুরো শরীরে পানি পৌঁছে পবিত্রতা অর্জন বোঝায়। সব গোসল একই কারণে আবশ্যক হয় না; পরিস্থিতি অনুযায়ী বিধান বুঝতে হবে।",
        sections: [
          {
            title: "১. প্রস্তুতি ও নিয়ত",
            text:
              "যে কারণে গোসল প্রয়োজন হয়েছে, তা বুঝে মনে পবিত্রতার নিয়ত রাখুন। পানি ও গোসলের স্থান প্রস্তুত করুন।"
          },
          {
            title: "২. নাপাকি পরিষ্কার করা",
            text:
              "শরীরে দৃশ্যমান নাপাকি থাকলে আগে তা দূর করুন। পরিষ্কার করার সময় পানি যেন শরীরের অন্য অংশে অপ্রয়োজনে ছড়িয়ে না পড়ে সেদিকে খেয়াল রাখুন।"
          },
          {
            title: "৩. ওযু করা",
            text:
              "গোসলের আগে ওযু করা প্রচলিত সুন্নত পদ্ধতির অংশ। গোসলের ধরন এবং অনুসৃত ফিকহি পদ্ধতি অনুযায়ী কিছু বিবরণে পার্থক্য থাকতে পারে।"
          },
          {
            title: "৪. পুরো শরীরে পানি পৌঁছানো",
            text:
              "মাথা, চুলের গোড়া এবং শরীরের সব অংশে পানি পৌঁছান। বগল, নাভি, কানের ভাঁজ এবং আঙুলের ফাঁকের মতো জায়গাগুলোতে খেয়াল রাখুন।"
          },
          {
            title: "৫. শেষে যাচাই",
            text:
              "শরীরের কোনো অংশ শুকনো রয়ে গেছে কি না নিশ্চিত করুন। গোসলের ক্ষেত্রে পানি ব্যবহার করা সম্ভব না হলে বা ক্ষতির আশঙ্কা থাকলে যোগ্য আলেমের পরামর্শ নিন।"
          }
        ],
        summary:
          "গোসলের মূল লক্ষ্য হলো শরীরের নির্ধারিত সব অংশে পানি পৌঁছানো এবং শরিয়তের নির্দেশনা পালন করা।",
        quran:
          "সূরা আল-মায়িদা ৫:৬-এ জানাবাতের অবস্থায় পবিত্রতা অর্জনের নির্দেশ রয়েছে।",
        reminder:
          "কোন অবস্থায় গোসল ফরজ হয় এবং কী কী ফরজ—এ বিষয়ে নির্ভরযোগ্য ফিকহি শিক্ষা গ্রহণ করুন।"
      },
      en: {
        title: "Ghusl",
        subtitle: "Ritual bathing for purification",
        intro:
          "Ghusl is a prescribed full-body wash required in particular circumstances. Not every bath is obligatory; the ruling depends on the situation.",
        sections: [
          {
            title: "1. Prepare and intend",
            text:
              "Understand why ghusl is required and intend purification in your heart. Prepare clean water and a suitable place."
          },
          {
            title: "2. Remove visible impurity",
            text:
              "Clean any visible impurity from the body before proceeding."
          },
          {
            title: "3. Perform wudu",
            text:
              "Performing wudu before ghusl is part of a commonly taught Sunnah method. Some details vary by school and circumstance."
          },
          {
            title: "4. Wash the entire body",
            text:
              "Ensure water reaches the head, hair roots, and all parts of the body, including folds and spaces between the fingers."
          },
          {
            title: "5. Check completion",
            text:
              "Make sure no required area remains dry. Seek qualified guidance if water use is harmful or impossible."
          }
        ],
        summary:
          "The goal is to ensure that water reaches all required parts of the body according to the relevant ruling.",
        quran:
          "Qur'an 5:6 addresses purification in a state of major ritual impurity.",
        reminder:
          "Learn when ghusl becomes obligatory and its required elements from a trusted scholar."
      },
      hi: {
        title: "ग़ुस्ल",
        subtitle: "पवित्रता के लिए पूरा स्नान",
        intro:
          "ग़ुस्ल कुछ विशेष परिस्थितियों में आवश्यक होने वाला पूरा शरीर धोने का धार्मिक तरीका है। हर स्नान फ़र्ज़ नहीं होता; हुक्म परिस्थिति पर निर्भर करता है।",
        sections: [
          {
            title: "1. तैयारी और नीयत",
            text:
              "समझें कि ग़ुस्ल क्यों आवश्यक है और दिल में पवित्रता की नीयत रखें। साफ पानी और उचित स्थान तैयार करें।"
          },
          {
            title: "2. दिखाई देने वाली नापाकी साफ करें",
            text:
              "ग़ुस्ल शुरू करने से पहले शरीर पर मौजूद दिखाई देने वाली नापाकी को साफ करें।"
          },
          {
            title: "3. वुज़ू करना",
            text:
              "ग़ुस्ल से पहले वुज़ू करना आम तौर पर सिखाए जाने वाले सुन्नत तरीके का हिस्सा है। कुछ विवरणों में फ़िक़्ही मतभेद हो सकते हैं।"
          },
          {
            title: "4. पूरे शरीर पर पानी पहुँचाना",
            text:
              "सिर, बालों की जड़ों और शरीर के सभी हिस्सों तक पानी पहुँचाएँ। त्वचा की सिलवटों और उँगलियों के बीच भी ध्यान दें।"
          },
          {
            title: "5. पूरा होने की जाँच",
            text:
              "सुनिश्चित करें कि कोई आवश्यक हिस्सा सूखा न रह जाए। पानी इस्तेमाल करना हानिकारक या असंभव हो तो योग्य आलिम से सलाह लें।"
          }
        ],
        summary:
          "उद्देश्य यह है कि धार्मिक नियम के अनुसार शरीर के सभी आवश्यक हिस्सों तक पानी पहुँचे।",
        quran:
          "क़ुरआन 5:6 में बड़ी नापाकी की स्थिति में पवित्रता का निर्देश है।",
        reminder:
          "ग़ुस्ल कब फ़र्ज़ होता है और उसके आवश्यक तत्व क्या हैं, यह विश्वसनीय आलिम से सीखें।"
      }
    },

    {
      id: "tayammum",
      image: "tayammum.png",
      bn: {
        title: "তায়াম্মুম",
        subtitle: "বিশেষ অবস্থায় বিকল্প পবিত্রতা",
        intro:
          "পানি না পাওয়া গেলে অথবা পানি ব্যবহার করলে শরিয়তসম্মতভাবে ক্ষতির আশঙ্কা থাকলে নির্দিষ্ট শর্তে তায়াম্মুমের বিধান প্রযোজ্য হতে পারে। এটি সাধারণ পরিস্থিতিতে ওযু বা গোসলের বিকল্প নয়।",
        sections: [
          {
            title: "১. কারণ ও উপযুক্ত উপাদান",
            image: "tayammum-hands.png",
            text:
              "পানি পাওয়া যাচ্ছে কি না এবং পানি ব্যবহার করা ক্ষতিকর কি না যাচাই করুন। তায়াম্মুমের জন্য কোন ধরনের পরিষ্কার মাটি বা ধুলাযুক্ত উপাদান গ্রহণযোগ্য, তা অনুসৃত ফিকহি বিধান অনুযায়ী বুঝুন।"
          },
          {
            title: "২. মুখ মাসেহ",
            image: "tayammum-face.png",
            text:
              "নিয়তসহ শরিয়তসম্মত পদ্ধতিতে হাত দিয়ে মুখ মাসেহ করুন। মুখ মাসেহের পদ্ধতি ও বিবরণে ফিকহি মতভেদ থাকতে পারে।"
          },
          {
            title: "৩. হাত মাসেহ",
            image: "tayammum-arms.png",
            text:
              "নির্দেশিত পদ্ধতিতে দুই হাত মাসেহ করুন। কোন সীমা পর্যন্ত মাসেহ করতে হবে, তা নিজের অনুসৃত নির্ভরযোগ্য ফিকহি পদ্ধতি অনুযায়ী শিখুন।"
          }
        ],
        summary:
          "তায়াম্মুমের শর্ত পূরণ হলেই কেবল এটি প্রযোজ্য হয়। পানি পাওয়া গেলে বা পরিস্থিতি বদলালে বিধানও বদলাতে পারে।",
        quran:
          "সূরা আল-মায়িদা ৫:৬-এ পানি না পাওয়া বা বিশেষ অবস্থায় পবিত্রতার বিকল্প পদ্ধতির নির্দেশ রয়েছে।",
        reminder:
          "তায়াম্মুমের কারণ, উপাদান, পদ্ধতি ও কখন তা শেষ হয়—এসব বিষয়ে যোগ্য আলেমের পরামর্শ নিন।"
      },
      en: {
        title: "Tayammum",
        subtitle: "Alternative purification in specific circumstances",
        intro:
          "Tayammum may be permitted when water is unavailable or its use is likely to cause harm under the relevant rules. It is not a general substitute for wudu or ghusl whenever water is available and safe.",
        sections: [
          {
            title: "1. Check the circumstances",
            image: "tayammum-hands.png",
            text:
              "Check whether water is unavailable or harmful to use. Learn which clean earth-based material is valid according to the school of law you follow."
          },
          {
            title: "2. Wipe the face",
            image: "tayammum-face.png",
            text:
              "With the intention of purification, wipe the face according to the prescribed method. Some procedural details differ among schools."
          },
          {
            title: "3. Wipe the hands",
            image: "tayammum-arms.png",
            text:
              "Wipe both hands using the method and limits taught by a reliable authority in your school of law."
          }
        ],
        summary:
          "Tayammum applies only when its conditions are met. The ruling may change if water becomes available or circumstances change.",
        quran:
          "Qur'an 5:6 discusses an alternative purification method when water is unavailable in qualifying circumstances.",
        reminder:
          "Ask a qualified scholar about its conditions, valid materials, method, and when it ceases to apply."
      },
      hi: {
        title: "तयम्मुम",
        subtitle: "विशेष परिस्थिति में वैकल्पिक पवित्रता",
        intro:
          "पानी उपलब्ध न होने या उसके इस्तेमाल से नुकसान की आशंका होने पर निर्धारित शर्तों के अंतर्गत तयम्मुम की अनुमति हो सकती है। यह हर परिस्थिति में वुज़ू या ग़ुस्ल का सामान्य विकल्प नहीं है।",
        sections: [
          {
            title: "1. परिस्थिति की जाँच",
            image: "tayammum-hands.png",
            text:
              "देखें कि पानी उपलब्ध है या उसका इस्तेमाल हानिकारक है। साफ मिट्टी या किस प्रकार का पदार्थ मान्य है, यह अपने फ़िक़्ही तरीके के अनुसार सीखें।"
          },
          {
            title: "2. चेहरे का मसह",
            image: "tayammum-face.png",
            text:
              "पवित्रता की नीयत के साथ निर्धारित तरीके से चेहरे का मसह करें। कुछ विवरणों में फ़िक़्ही मतभेद हैं।"
          },
          {
            title: "3. हाथों का मसह",
            image: "tayammum-arms.png",
            text:
              "अपने विश्वसनीय फ़िक़्ही तरीके के अनुसार दोनों हाथों का मसह करें।"
          }
        ],
        summary:
          "तयम्मुम तभी लागू होता है जब उसकी शर्तें पूरी हों। पानी उपलब्ध होने या परिस्थिति बदलने पर हुक्म बदल सकता है।",
        quran:
          "क़ुरआन 5:6 में योग्य परिस्थितियों में पानी न मिलने पर वैकल्पिक पवित्रता का निर्देश है।",
        reminder:
          "तयम्मुम की शर्तों, सामग्री, तरीके और उसके समाप्त होने के बारे में योग्य आलिम से पूछें।"
      }
    },

    {
      id: "body",
      image: "body-purity.png",
      bn: {
        title: "শরীরের পবিত্রতা",
        subtitle: "পরিচ্ছন্নতা ও ইবাদতের প্রস্তুতি",
        intro:
          "শরীর পরিষ্কার রাখা ইসলামে গুরুত্বপূর্ণ। ব্যক্তিগত পরিচ্ছন্নতা, দুর্গন্ধ দূর করা এবং শরীরে লেগে থাকা নাপাকি পরিষ্কার করা—এসব বিষয়ে সচেতন থাকা উচিত।",
        sections: [
          {
            title: "১. দৈনন্দিন পরিচ্ছন্নতা",
            text:
              "নিয়মিত শরীর ধোয়া, হাত পরিষ্কার রাখা, দাঁত ও মুখের যত্ন নেওয়া এবং প্রয়োজন অনুযায়ী নখ পরিষ্কার ও ছোট রাখা ভালো পরিচ্ছন্নতার অংশ।"
          },
          {
            title: "২. শরীরে নাপাকি লাগলে",
            text:
              "যে স্থানে নাপাকি লেগেছে, তা পরিষ্কার করুন। শুধু সন্দেহের কারণে শরীরের সব অংশ বারবার ধোয়ার প্রয়োজন ধরে নেবেন না।"
          },
          {
            title: "৩. ব্যক্তিগত পরিচর্যা",
            text:
              "ব্যক্তিগত পরিচ্ছন্নতা ও স্বাভাবিক শারীরিক যত্ন বজায় রাখুন। ধর্মীয় বিধানের পাশাপাশি স্বাস্থ্য ও নিরাপত্তার বিষয়ও বিবেচনা করুন।"
          },
          {
            title: "৪. ওযু ও গোসলের প্রয়োজন",
            text:
              "শরীর পরিষ্কার থাকা এবং ওযু থাকা এক বিষয় নয়। কখন ওযু বা গোসল প্রয়োজন হয়, তা আলাদা করে শিখুন।"
          }
        ],
        summary:
          "পরিচ্ছন্নতা বজায় রাখুন, তবে অকারণ সন্দেহ ও অতিরিক্ত ধোয়ার অভ্যাস এড়িয়ে চলুন।",
        quran:
          "সূরা আল-বাকারা ২:২২২-এ আল্লাহ তওবাকারী ও পবিত্রতা অর্জনকারীদের ভালোবাসেন বলে উল্লেখ রয়েছে।",
        reminder:
          "রক্তপাত, ক্ষত বা অসুস্থতার মতো বিশেষ পরিস্থিতির বিধান জানতে বিশ্বস্ত আলেম ও প্রয়োজনে চিকিৎসকের পরামর্শ নিন।"
      },
      en: {
        title: "Body Purity",
        subtitle: "Cleanliness and preparation for worship",
        intro:
          "Keeping the body clean is important in Islam. Personal hygiene, removing unpleasant odours, and cleaning actual impurities are all part of responsible care.",
        sections: [
          {
            title: "1. Everyday hygiene",
            text:
              "Wash regularly, keep hands clean, care for your teeth and mouth, and maintain clean nails as appropriate."
          },
          {
            title: "2. When impurity touches the body",
            text:
              "Clean the affected area. Mere doubt does not mean that every part of the body must be washed repeatedly."
          },
          {
            title: "3. Personal care",
            text:
              "Maintain personal hygiene and ordinary bodily care, while also considering health and safety."
          },
          {
            title: "4. Cleanliness versus wudu",
            text:
              "Being physically clean and having wudu are not the same thing. Learn separately when wudu or ghusl is required."
          }
        ],
        summary:
          "Maintain cleanliness without falling into unnecessary doubt or repeated washing.",
        quran:
          "Qur'an 2:222 mentions that Allah loves those who repent and those who purify themselves.",
        reminder:
          "For special circumstances such as bleeding, wounds, or illness, consult a trusted scholar and, when appropriate, a medical professional."
      },
      hi: {
        title: "शरीर की पवित्रता",
        subtitle: "सफाई और इबादत की तैयारी",
        intro:
          "इस्लाम में शरीर को साफ रखना महत्वपूर्ण है। व्यक्तिगत स्वच्छता, दुर्गंध दूर करना और वास्तविक नापाकी को साफ करना ज़िम्मेदारी का हिस्सा है।",
        sections: [
          {
            title: "1. रोज़मर्रा की सफाई",
            text:
              "नियमित स्नान करें, हाथ साफ रखें, दाँतों और मुँह की देखभाल करें और नाखून साफ रखें।"
          },
          {
            title: "2. शरीर पर नापाकी लगना",
            text:
              "जिस जगह नापाकी लगी हो उसे साफ करें। केवल संदेह के कारण पूरे शरीर को बार-बार धोना आवश्यक न समझें।"
          },
          {
            title: "3. व्यक्तिगत देखभाल",
            text:
              "व्यक्तिगत स्वच्छता और सामान्य शारीरिक देखभाल बनाए रखें तथा स्वास्थ्य और सुरक्षा का ध्यान रखें।"
          },
          {
            title: "4. सफाई और वुज़ू का अंतर",
            text:
              "शरीर का साफ होना और वुज़ू की अवस्था में होना एक ही बात नहीं है। वुज़ू और ग़ुस्ल की आवश्यकता अलग से सीखें।"
          }
        ],
        summary:
          "सफाई बनाए रखें, लेकिन अनावश्यक संदेह और बार-बार धोने से बचें।",
        quran:
          "क़ुरआन 2:222 में बताया गया है कि अल्लाह तौबा करने वालों और पवित्रता अपनाने वालों से प्रेम करता है।",
        reminder:
          "खून, घाव या बीमारी जैसी विशेष परिस्थितियों में विश्वसनीय आलिम और ज़रूरत पड़ने पर डॉक्टर से सलाह लें।"
      }
    },

    {
      id: "clothing",
      image: "clothing-purity.png",
      bn: {
        title: "পোশাকের পবিত্রতা",
        subtitle: "পরিচ্ছন্ন পোশাকে নামাজ",
        intro:
          "নামাজের জন্য পোশাকের পবিত্রতা গুরুত্বপূর্ণ। পোশাক পরিষ্কার, শালীন এবং শরিয়তের প্রয়োজনীয় শর্তের উপযোগী হওয়া উচিত।",
        sections: [
          {
            title: "১. পোশাক পরীক্ষা",
            text:
              "পোশাকে দৃশ্যমান ময়লা বা নাপাকি আছে কি না স্বাভাবিকভাবে দেখুন। অযথা অতিরিক্ত পরীক্ষা করে সন্দেহ বাড়াবেন না।"
          },
          {
            title: "২. নাপাকি লাগলে",
            text:
              "যে অংশে নাপাকি লেগেছে, সেটি যথাযথভাবে পরিষ্কার করুন। নাপাকির ধরন ও ফিকহি বিধান অনুযায়ী পরিষ্কারের পদ্ধতি ভিন্ন হতে পারে।"
          },
          {
            title: "৩. পরিচ্ছন্ন ও শালীন পোশাক",
            text:
              "নামাজের সময় পরিষ্কার পোশাক পরুন এবং সতর ঢাকার বিধান মেনে চলুন। পোশাকের বিষয়ে সন্দেহ হলে নির্ভরযোগ্য শিক্ষকের কাছে জেনে নিন।"
          }
        ],
        summary:
          "পরিষ্কার পোশাক ব্যবহার করুন এবং প্রকৃত নাপাকি দূর করুন।",
        quran:
          "সূরা আল-মুদ্দাসসির ৭৪:৪-এ পোশাক পবিত্র রাখার নির্দেশ রয়েছে।",
        reminder:
          "নাপাকির পরিমাণ, ধরন এবং তা দূর করার পদ্ধতি সম্পর্কে ফিকহি মতভেদ থাকতে পারে।"
      },
      en: {
        title: "Clothing Purity",
        subtitle: "Clean clothing for prayer",
        intro:
          "Clean clothing is important for prayer. Clothing should be clean, modest, and meet the relevant requirements of Islamic worship.",
        sections: [
          {
            title: "1. Check your clothing",
            text:
              "Look normally for visible dirt or impurity. Avoid repeated checking that only increases unnecessary doubt."
          },
          {
            title: "2. If impurity is present",
            text:
              "Clean the affected part appropriately. The method can depend on the type of impurity and the applicable legal ruling."
          },
          {
            title: "3. Clean and modest dress",
            text:
              "Wear clean clothing for prayer and observe the rules of covering the body. Ask a reliable teacher if unsure."
          }
        ],
        summary:
          "Wear clean clothing and remove actual impurities.",
        quran:
          "Qur'an 74:4 instructs the Prophet to keep his garments purified.",
        reminder:
          "Rulings about types and amounts of impurity and how to remove them may differ among schools."
      },
      hi: {
        title: "कपड़ों की पवित्रता",
        subtitle: "नमाज़ के लिए साफ कपड़े",
        intro:
          "नमाज़ के लिए कपड़ों का साफ होना महत्वपूर्ण है। कपड़े साफ, शालीन और इबादत की आवश्यक शर्तों के अनुरूप होने चाहिए।",
        sections: [
          {
            title: "1. कपड़ों की जाँच",
            text:
              "सामान्य रूप से देखें कि कपड़ों पर दिखाई देने वाली गंदगी या नापाकी तो नहीं है। अनावश्यक बार-बार जाँचने से बचें।"
          },
          {
            title: "2. नापाकी लगने पर",
            text:
              "प्रभावित हिस्से को उचित तरीके से साफ करें। तरीका नापाकी के प्रकार और संबंधित फ़िक़्ही हुक्म पर निर्भर हो सकता है।"
          },
          {
            title: "3. साफ और शालीन कपड़े",
            text:
              "नमाज़ के लिए साफ कपड़े पहनें और शरीर ढकने के नियमों का पालन करें। संदेह होने पर विश्वसनीय शिक्षक से पूछें।"
          }
        ],
        summary:
          "साफ कपड़े पहनें और वास्तविक नापाकी को दूर करें।",
        quran:
          "क़ुरआन 74:4 में कपड़ों को पवित्र रखने का निर्देश है।",
        reminder:
          "नापाकी के प्रकार, मात्रा और सफाई के तरीके में फ़िक़्ही मतभेद हो सकते हैं।"
      }
    },

    {
      id: "place",
      image: "place-purity.png",
      bn: {
        title: "নামাজের স্থানের পবিত্রতা",
        subtitle: "পরিষ্কার জায়গায় ইবাদত",
        intro:
          "নামাজের স্থান পরিচ্ছন্ন হওয়া জরুরি। যেখানে নামাজ পড়বেন, সেখানে নাপাকি আছে কি না স্বাভাবিকভাবে খেয়াল করুন এবং প্রয়োজন হলে পরিষ্কার করুন।",
        sections: [
          {
            title: "১. স্থান নির্বাচন",
            text:
              "নিরাপদ ও পরিষ্কার জায়গা বেছে নিন। মেঝে, জায়নামাজ বা যেখানে শরীর রাখা হবে, সেখানে দৃশ্যমান নাপাকি আছে কি না দেখুন।"
          },
          {
            title: "২. নাপাকি পরিষ্কার করা",
            text:
              "স্থানটিতে নাপাকি থাকলে সংশ্লিষ্ট অংশ যথাযথভাবে পরিষ্কার করুন। শুধু সন্দেহের কারণে পুরো ঘর বা জায়নামাজ ধোয়ার প্রয়োজন ধরে নেবেন না।"
          },
          {
            title: "৩. মসজিদ ও জনসাধারণের স্থান",
            text:
              "মসজিদে পরিচ্ছন্নতা বজায় রাখুন। জুতা, খাবারের আবর্জনা বা অন্য ময়লা দিয়ে নামাজের জায়গা নোংরা করবেন না।"
          },
          {
            title: "৪. পরিচ্ছন্নতা বজায় রাখা",
            text:
              "নামাজ শেষে ব্যবহৃত জায়গা পরিপাটি রাখুন এবং অন্যদের ইবাদতের সুবিধার কথা বিবেচনা করুন।"
          }
        ],
        summary:
          "নামাজের স্থান পরিষ্কার রাখুন, অন্যের সুবিধা রক্ষা করুন এবং অকারণ সন্দেহ এড়িয়ে চলুন।",
        quran:
          "সূরা আল-বাকারা ২:১২৫-এ কাবাঘরকে তাওয়াফকারী, ইতিকাফকারী ও রুকু-সিজদাকারীদের জন্য পবিত্র রাখার কথা এসেছে।",
        reminder:
          "কোনো স্থানে প্রকৃত নাপাকি আছে কি না—তা যুক্তিসংগতভাবে যাচাই করুন; অনুমানকে নিশ্চিত তথ্য মনে করবেন না।"
      },
      en: {
        title: "Purity of the Prayer Area",
        subtitle: "Worship in a clean place",
        intro:
          "The prayer area should be clean. Check reasonably for actual impurity and clean the affected area when needed.",
        sections: [
          {
            title: "1. Choose a suitable place",
            text:
              "Choose a safe, clean area. Check the floor, prayer mat, and the area where the body will rest for visible impurity."
          },
          {
            title: "2. Clean actual impurity",
            text:
              "If impurity is present, clean the affected area appropriately. Mere doubt does not mean the whole room or mat must be washed."
          },
          {
            title: "3. Mosques and shared spaces",
            text:
              "Help keep mosques clean. Do not dirty prayer spaces with footwear, food waste, or other rubbish."
          },
          {
            title: "4. Maintain cleanliness",
            text:
              "Leave the area tidy after prayer and consider the needs of others who will use it."
          }
        ],
        summary:
          "Keep the prayer area clean, respect others, and avoid unnecessary doubt.",
        quran:
          "Qur'an 2:125 refers to keeping the House of Allah pure for those who worship there.",
        reminder:
          "Use reasonable evidence to determine whether impurity is actually present rather than treating every suspicion as fact."
      },
      hi: {
        title: "नमाज़ की जगह की पवित्रता",
        subtitle: "साफ स्थान पर इबादत",
        intro:
          "नमाज़ की जगह साफ होनी चाहिए। वास्तविक नापाकी की सामान्य रूप से जाँच करें और आवश्यकता होने पर प्रभावित जगह साफ करें।",
        sections: [
          {
            title: "1. उचित स्थान चुनें",
            text:
              "सुरक्षित और साफ जगह चुनें। फर्श, जानमाज़ और शरीर रखने की जगह पर दिखाई देने वाली नापाकी देखें।"
          },
          {
            title: "2. वास्तविक नापाकी साफ करें",
            text:
              "नापाकी मौजूद हो तो प्रभावित हिस्से को उचित तरीके से साफ करें। केवल संदेह के कारण पूरा कमरा या जानमाज़ धोना आवश्यक न समझें।"
          },
          {
            title: "3. मस्जिद और साझा स्थान",
            text:
              "मस्जिद को साफ रखें। जूते, खाने का कचरा या अन्य गंदगी नमाज़ की जगह पर न फैलाएँ।"
          },
          {
            title: "4. सफाई बनाए रखें",
            text:
              "नमाज़ के बाद जगह व्यवस्थित रखें और दूसरों की सुविधा का ध्यान रखें।"
          }
        ],
        summary:
          "नमाज़ की जगह साफ रखें, दूसरों का ध्यान रखें और अनावश्यक संदेह से बचें।",
        quran:
          "क़ुरआन 2:125 में इबादत करने वालों के लिए अल्लाह के घर को पवित्र रखने का उल्लेख है।",
        reminder:
          "यह तय करने के लिए उचित आधार देखें कि नापाकी वास्तव में मौजूद है या नहीं।"
      }
    },

    {
      id: "impurity",
      image: "impurity-removal.png",
      bn: {
        title: "নাপাকি দূর করা",
        subtitle: "পরিষ্কার করার সঠিক অভ্যাস",
        intro:
          "নাপাকি দূর করার ক্ষেত্রে নাপাকির স্থান, ধরন এবং পরিষ্কারের পদ্ধতি বোঝা প্রয়োজন। শরিয়তের বিধান সম্পর্কে নিশ্চিত না হলে অনুমান না করে নির্ভরযোগ্য জ্ঞান নিন।",
        sections: [
          {
            title: "১. নাপাকির স্থান শনাক্ত করা",
            text:
              "শরীর, পোশাক বা স্থানের কোন অংশে নাপাকি লেগেছে তা যতটুকু নিশ্চিতভাবে জানা যায়, সেই অংশ পরিষ্কারে মনোযোগ দিন।"
          },
          {
            title: "২. দৃশ্যমান বস্তু সরানো",
            text:
              "যদি নাপাকির কোনো দৃশ্যমান বস্তু থাকে, আগে তা সরিয়ে নিন। এরপর উপযুক্ত পদ্ধতিতে সংশ্লিষ্ট অংশ পরিষ্কার করুন।"
          },
          {
            title: "৩. পানি দিয়ে পরিষ্কার",
            text:
              "সাধারণভাবে পানি দিয়ে ধোয়া পরিচ্ছন্নতার একটি গুরুত্বপূর্ণ উপায়। নাপাকির ধরন, পানির ব্যবহার এবং নির্দিষ্ট ফিকহি বিধানের কারণে বিস্তারিত পদ্ধতিতে পার্থক্য হতে পারে।"
          },
          {
            title: "৪. সন্দেহ ও নিশ্চিততার পার্থক্য",
            text:
              "শুধু সন্দেহের ভিত্তিতে কোনো জিনিসকে নাপাক ঘোষণা করবেন না। বাস্তব প্রমাণ বা স্পষ্ট কারণ থাকলে সে অনুযায়ী ব্যবস্থা নিন।"
          },
          {
            title: "৫. স্বাস্থ্য ও নিরাপত্তা",
            text:
              "ক্ষতিকর রাসায়নিক বা বিপজ্জনক উপায় ব্যবহার করবেন না। প্রয়োজন হলে নিরাপদ পরিষ্কারক এবং স্বাস্থ্যবিধি অনুসরণ করুন।"
          }
        ],
        summary:
          "নাপাকি যেখানে আছে সেটি যথাযথভাবে পরিষ্কার করুন; অকারণে সবকিছু ধোয়া বা বারবার পরীক্ষা করা থেকে বিরত থাকুন।",
        quran:
          "কুরআনে পবিত্রতা অর্জনের গুরুত্ব বারবার এসেছে। নির্দিষ্ট নাপাকির বিস্তারিত বিধান নির্ভরযোগ্য ফিকহি উৎস থেকে শিখতে হবে।",
        reminder:
          "কোনো বিষয় মাযহাবভেদে ভিন্ন হলে সব মতকে এক নিয়ম হিসেবে উপস্থাপন করা ঠিক নয়।"
      },
      en: {
        title: "Removing Impurity",
        subtitle: "Good cleaning practices",
        intro:
          "Removing impurity requires understanding where it is, what it is, and which cleaning method applies. When unsure about a religious ruling, seek reliable guidance instead of guessing.",
        sections: [
          {
            title: "1. Identify the affected area",
            text:
              "Focus on the part of the body, clothing, or place that is actually known to be affected."
          },
          {
            title: "2. Remove visible material",
            text:
              "If visible material is present, remove it first, then clean the affected area using an appropriate method."
          },
          {
            title: "3. Cleaning with water",
            text:
              "Washing with water is a common and important cleaning method. Details can vary according to the type of impurity and the relevant legal ruling."
          },
          {
            title: "4. Doubt versus certainty",
            text:
              "Do not declare something impure on suspicion alone. Act on clear evidence or a sound reason."
          },
          {
            title: "5. Health and safety",
            text:
              "Avoid harmful chemicals and dangerous methods. Follow safe cleaning practices when needed."
          }
        ],
        summary:
          "Clean the affected area appropriately without washing everything repeatedly due to uncertainty.",
        quran:
          "The Qur'an repeatedly emphasizes purification. Detailed rulings for particular impurities should be learned from reliable jurisprudential sources.",
        reminder:
          "Where schools differ, do not present every opinion as one universal rule."
      },
      hi: {
        title: "नापाकी दूर करना",
        subtitle: "सही सफाई की आदतें",
        intro:
          "नापाकी दूर करने के लिए यह समझना ज़रूरी है कि वह कहाँ लगी है, किस प्रकार की है और कौन-सा तरीका लागू होता है। धार्मिक हुक्म स्पष्ट न हो तो अनुमान के बजाय विश्वसनीय मार्गदर्शन लें।",
        sections: [
          {
            title: "1. प्रभावित जगह पहचानें",
            text:
              "शरीर, कपड़े या जगह के उसी हिस्से पर ध्यान दें जिसके नापाक होने की जानकारी वास्तव में हो।"
          },
          {
            title: "2. दिखाई देने वाली चीज़ हटाएँ",
            text:
              "यदि नापाकी का कोई दिखाई देने वाला पदार्थ है, तो पहले उसे हटाएँ और फिर उचित तरीके से सफाई करें।"
          },
          {
            title: "3. पानी से सफाई",
            text:
              "पानी से धोना सफाई का एक महत्वपूर्ण तरीका है। नापाकी के प्रकार और फ़िक़्ही हुक्म के अनुसार विवरण अलग हो सकते हैं।"
          },
          {
            title: "4. संदेह और यक़ीन का अंतर",
            text:
              "केवल संदेह के आधार पर किसी चीज़ को नापाक न ठहराएँ। स्पष्ट प्रमाण या उचित कारण के अनुसार कार्य करें।"
          },
          {
            title: "5. स्वास्थ्य और सुरक्षा",
            text:
              "हानिकारक रसायनों या खतरनाक तरीकों का उपयोग न करें। सुरक्षित सफाई के नियम अपनाएँ।"
          }
        ],
        summary:
          "प्रभावित हिस्से को उचित तरीके से साफ करें और संदेह के कारण हर चीज़ को बार-बार धोने से बचें।",
        quran:
          "क़ुरआन में पवित्रता की महत्ता बार-बार बताई गई है। विशेष नापाकियों के विस्तृत नियम विश्वसनीय फ़िक़्ही स्रोत से सीखें।",
        reminder:
          "जहाँ फ़िक़्ही मतभेद हों, वहाँ सभी मतों को एक ही सार्वभौमिक नियम के रूप में न बताएँ।"
      }
    },

    {
      id: "hayez",
      image: "hayez-nifas.png",
      bn: {
        title: "হায়েজ ও নিফাস",
        subtitle: "নারীদের পবিত্রতা-সংক্রান্ত শিক্ষা",
        intro:
          "হায়েজ বলতে মাসিক ঋতুস্রাব এবং নিফাস বলতে সন্তান প্রসবের পরবর্তী রক্তস্রাব বোঝানো হয়। এ বিষয়ে ইবাদতের বিধান, রক্তস্রাবের ধরন ও সময়সীমা বুঝতে নির্ভরযোগ্য ফিকহি শিক্ষা প্রয়োজন।",
        sections: [
          {
            title: "১. হায়েজ সম্পর্কে ধারণা",
            text:
              "মাসিক ঋতুস্রাবের সময় নামাজ ও রোজা সম্পর্কে বিশেষ বিধান রয়েছে। রক্তস্রাবের সময়, অভ্যাস এবং অন্যান্য অবস্থার ভিত্তিতে কিছু বিধান ভিন্ন হতে পারে।"
          },
          {
            title: "২. নিফাস সম্পর্কে ধারণা",
            text:
              "সন্তান প্রসবের পর রক্তস্রাবকে নিফাস বলা হয়। এর সময়সীমা ও বিধানের বিস্তারিত ব্যাখ্যায় ফিকহি মতভেদ রয়েছে।"
          },
          {
            title: "৩. পবিত্রতা ফিরে এলে",
            text:
              "রক্তস্রাব শেষ হয়ে পবিত্রতা নিশ্চিত হলে প্রযোজ্য বিধান অনুযায়ী গোসল করে ইবাদত শুরু করতে হয়। পবিত্রতা নিশ্চিত করার পদ্ধতি নির্ভরযোগ্যভাবে শিখুন।"
          },
          {
            title: "৪. রোজা ও নামাজের বিধান",
            text:
              "হায়েজ ও নিফাসের সময় নামাজ এবং রোজার বিধান এক নয়; নামাজের কাজা ও রোজার কাজা সম্পর্কেও আলাদা নিয়ম রয়েছে। নিজের অবস্থার জন্য যোগ্য আলেমের পরামর্শ নিন।"
          },
          {
            title: "৫. স্বাস্থ্যসচেতনতা",
            text:
              "অস্বাভাবিক অতিরিক্ত রক্তপাত, তীব্র ব্যথা, মাথা ঘোরা বা অন্য উদ্বেগজনক উপসর্গ থাকলে চিকিৎসকের পরামর্শ নিন।"
          }
        ],
        summary:
          "হায়েজ ও নিফাসের বিধান ব্যক্তির অবস্থা এবং ফিকহি নিয়মের ওপর নির্ভর করতে পারে। অনুমানের বদলে নির্ভরযোগ্য জ্ঞান গ্রহণ করুন।",
        quran:
          "সূরা আল-বাকারা ২:২২২-এ ঋতুস্রাব সম্পর্কে নির্দেশনা এসেছে। আয়াতের প্রয়োগ ও বিস্তারিত বিধান নির্ভরযোগ্য তাফসির ও ফিকহের আলোকে শিখুন।",
        reminder:
          "এই বিষয়ে লজ্জা বা সংকোচ না করে যোগ্য আলেমা/আলেম এবং প্রয়োজন হলে চিকিৎসকের সঙ্গে কথা বলুন।"
      },
      en: {
        title: "Hayd and Nifas",
        subtitle: "Learning about women's ritual purity",
        intro:
          "Hayd refers to menstruation, while nifas refers to bleeding after childbirth. Worship-related rulings depend on the type and timing of bleeding and should be learned from reliable jurisprudential guidance.",
        sections: [
          {
            title: "1. Understanding hayd",
            text:
              "Specific rules apply to prayer and fasting during menstruation. Details can depend on the bleeding pattern, personal circumstances, and the school of law followed."
          },
          {
            title: "2. Understanding nifas",
            text:
              "Nifas refers to bleeding after childbirth. Scholars differ on some details concerning its maximum duration and related rulings."
          },
          {
            title: "3. When purity returns",
            text:
              "When bleeding ends and purity is established, ghusl is performed when required before resuming worship. Learn how purity is established from a reliable source."
          },
          {
            title: "4. Prayer and fasting",
            text:
              "Rules for prayer and fasting during hayd and nifas are not identical. Make-up fasting and prayer also have different rulings; seek guidance for your situation."
          },
          {
            title: "5. Health matters",
            text:
              "Seek medical advice for unusually heavy bleeding, severe pain, dizziness, or other concerning symptoms."
          }
        ],
        summary:
          "Rules related to hayd and nifas can depend on individual circumstances and jurisprudential guidance. Avoid guessing.",
        quran:
          "Qur'an 2:222 addresses menstruation. Learn its application through reliable tafsir and jurisprudential teaching.",
        reminder:
          "Do not feel embarrassed to ask a qualified scholar or female scholar, and consult a healthcare professional when needed."
      },
      hi: {
        title: "हैज़ और निफ़ास",
        subtitle: "महिलाओं की धार्मिक पवित्रता की शिक्षा",
        intro:
          "हैज़ का अर्थ मासिक धर्म और निफ़ास का अर्थ प्रसव के बाद होने वाला रक्तस्राव है। इबादत के नियम रक्तस्राव के प्रकार, समय और परिस्थिति पर निर्भर कर सकते हैं।",
        sections: [
          {
            title: "1. हैज़ को समझना",
            text:
              "मासिक धर्म के दौरान नमाज़ और रोज़े के विशेष नियम हैं। कुछ विवरण रक्तस्राव के तरीके, व्यक्तिगत परिस्थिति और फ़िक़्ही मत पर निर्भर करते हैं।"
          },
          {
            title: "2. निफ़ास को समझना",
            text:
              "प्रसव के बाद होने वाले रक्तस्राव को निफ़ास कहा जाता है। इसकी अवधि और कुछ संबंधित नियमों के विवरण में फ़िक़्ही मतभेद हैं।"
          },
          {
            title: "3. पवित्रता लौटने पर",
            text:
              "रक्तस्राव समाप्त होने और पवित्रता निश्चित होने पर, जहाँ आवश्यक हो, इबादत शुरू करने से पहले ग़ुस्ल किया जाता है। पवित्रता की पुष्टि का तरीका विश्वसनीय स्रोत से सीखें।"
          },
          {
            title: "4. रोज़ा और नमाज़ के नियम",
            text:
              "हैज़ और निफ़ास में नमाज़ और रोज़े के नियम पूरी तरह एक जैसे नहीं हैं। क़ज़ा के नियम भी अलग हो सकते हैं; अपनी परिस्थिति के लिए योग्य आलिम से सलाह लें।"
          },
          {
            title: "5. स्वास्थ्य का ध्यान",
            text:
              "बहुत अधिक रक्तस्राव, तेज़ दर्द, चक्कर या अन्य चिंताजनक लक्षण हों तो डॉक्टर से सलाह लें।"
          }
        ],
        summary:
          "हैज़ और निफ़ास के नियम व्यक्तिगत परिस्थिति और फ़िक़्ही मार्गदर्शन पर निर्भर हो सकते हैं। अनुमान न लगाएँ।",
        quran:
          "क़ुरआन 2:222 में मासिक धर्म का उल्लेख है। इसके विस्तृत नियम विश्वसनीय तफ़सीर और फ़िक़्ही शिक्षा से सीखें।",
        reminder:
          "योग्य आलिमा या आलिम से पूछने में संकोच न करें और आवश्यकता पड़ने पर डॉक्टर से भी सलाह लें।"
      }
    }
  ];

  /* ---------- HELPERS ---------- */

  function getText(object) {
    return object[currentLanguage] || object.bn || object;
  }

  function imagePath(fileName) {
    return "../assets/images/" + fileName;
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function makeImage(fileName, alt, className) {
    if (!fileName) return "";

    return `
      <div class="purity-image-wrap ${className || ""}">
        <img
          src="${imagePath(fileName)}"
          alt="${escapeHTML(alt || "")}"
          loading="lazy"
          onerror="this.closest('.purity-image-wrap').style.display='none'"
        >
      </div>
    `;
  }

  function saveSettings() {
    try {
      const oldSettings = readSettings();

      oldSettings.language = currentLanguage;
      oldSettings.lang = currentLanguage;
      oldSettings.dark = darkMode;

      localStorage.setItem(
        "appSettings",
        JSON.stringify(oldSettings)
      );
    } catch (error) {
      console.warn("IBADAT: Settings could not be saved.", error);
    }
  }

  /* ---------- STYLES ---------- */

  function addStyles() {
    if ($("purityRuntimeStyles")) return;

    const style = document.createElement("style");
    style.id = "purityRuntimeStyles";

    style.textContent = `
      #purityPage {
        --purity-green: #0f5132;
        --purity-green-dark: #082f20;
        --purity-gold: #d9b45b;
        --purity-text: #26352d;
        --purity-card: rgba(255,255,255,.94);
        --purity-border: rgba(15,81,50,.24);
        color: var(--purity-text);
        width: 100%;
        box-sizing: border-box;
      }

      #purityPage *,
      #detailView * {
        box-sizing: border-box;
      }

      .purity-topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px 14px;
        background: var(--purity-green-dark);
        color: #fff;
        border-bottom: 2px solid var(--purity-gold);
        border-radius: 12px;
        margin-bottom: 12px;
      }

      .purity-brand {
        font-size: 13px;
        font-weight: 800;
        letter-spacing: .4px;
      }

      .purity-tools {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }

      .purity-tools select,
      .purity-tools button {
        min-height: 36px;
        border: 1px solid var(--purity-gold);
        border-radius: 8px;
        padding: 6px 10px;
        font: inherit;
        font-size: 12px;
        color: #fff;
        background: #164d35;
        cursor: pointer;
      }

      .purity-hero {
        background: linear-gradient(135deg, rgba(8,47,32,.96), rgba(15,81,50,.90));
        border: 2px solid var(--purity-gold);
        border-radius: 16px;
        padding: 22px 14px;
        text-align: center;
        margin-bottom: 16px;
        color: #fff;
      }

      .purity-hero h1 {
        margin: 0 0 8px;
        color: var(--purity-gold);
        font-size: clamp(25px, 5vw, 35px);
      }

      .purity-hero p {
        margin: 0;
        color: #fff;
        line-height: 1.8;
        font-size: 14px;
      }

      #learningGrid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        align-items: stretch;
      }

      .purity-option {
        appearance: none;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 0;
        padding: 10px;
        border: 1px solid var(--purity-border);
        border-radius: 13px;
        background: var(--purity-card);
        color: var(--purity-text);
        cursor: pointer;
        text-align: center;
        overflow: hidden;
        box-shadow: 0 3px 12px rgba(0,0,0,.07);
        transition: transform .18s ease, box-shadow .18s ease;
      }

      .purity-option:active {
        transform: scale(.98);
      }

      .purity-option:focus-visible,
      .purity-tools button:focus-visible,
      .purity-tools select:focus-visible {
        outline: 3px solid var(--purity-gold);
        outline-offset: 3px;
      }

      .purity-option-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: rgba(15,81,50,.045);
        border-radius: 9px;
      }

      .purity-option-image img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .purity-option h3 {
        font-size: 14px;
        line-height: 1.6;
        margin: 9px 2px 2px;
        overflow-wrap: anywhere;
      }

      .purity-hero-footer,
      .purity-bottom-bar {
        margin-top: 16px;
        padding: 12px;
        border-radius: 11px;
        text-align: center;
        line-height: 1.8;
        font-size: 12px;
      }

      .purity-hero-footer {
        background: rgba(15,81,50,.08);
        border: 1px solid var(--purity-border);
      }

      .purity-bottom-bar {
        background: var(--purity-green-dark);
        border: 1px solid var(--purity-gold);
        color: #fff;
      }

      #detailView {
        margin-top: 12px;
      }

      .purity-detail-header {
        background: linear-gradient(135deg, #082f20, #0f5132);
        border: 2px solid var(--purity-gold);
        border-radius: 15px;
        padding: 18px 12px;
        text-align: center;
        margin-bottom: 14px;
      }

      .purity-detail-header h2 {
        color: var(--purity-gold);
        margin: 0 0 7px;
        font-size: clamp(22px, 5vw, 30px);
      }

      .purity-detail-header p {
        color: #fff;
        margin: 0;
        line-height: 1.8;
        font-size: 13px;
      }

      #detailContent {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .purity-board {
        background: var(--purity-card);
        color: var(--purity-text);
        border: 1px solid var(--purity-border);
        border-radius: 13px;
        padding: 15px;
        overflow-wrap: anywhere;
        box-shadow: 0 3px 12px rgba(0,0,0,.055);
      }

      .purity-board h3 {
        color: var(--purity-green);
        font-size: 17px;
        line-height: 1.6;
        margin: 0 0 10px;
      }

      .purity-board p {
        font-size: 14px;
        line-height: 1.95;
        margin: 0 0 8px;
        white-space: pre-line;
      }

      .purity-board p:last-child {
        margin-bottom: 0;
      }

      .purity-board .purity-image-wrap {
        width: 100%;
        max-width: 360px;
        margin: 8px auto 12px;
        text-align: center;
      }

      .purity-board .purity-image-wrap img {
        width: 100%;
        max-height: 320px;
        object-fit: contain;
        display: block;
        margin: 0 auto;
        border-radius: 10px;
      }

      .purity-board.remember-board {
        border: 2px solid var(--purity-gold);
        background: linear-gradient(145deg, rgba(217,180,91,.13), var(--purity-card));
      }

      .purity-board.remember-board h3 {
        color: #926d14;
      }

      .purity-board .purity-small-heading {
        font-weight: 800;
        margin: 12px 0 5px;
        color: var(--purity-green);
      }

      .purity-source-note {
        font-size: 12px !important;
        opacity: .82;
        margin-top: 12px !important;
      }

      .purity-hidden {
        display: none !important;
      }

      #purityPage.purity-dark,
      #detailView.purity-dark {
        --purity-text: #e7eee9;
        --purity-card: rgba(22,34,28,.97);
        --purity-border: rgba(217,180,91,.35);
      }

      #purityPage.purity-dark .purity-option,
      #detailView.purity-dark .purity-board {
        box-shadow: 0 4px 14px rgba(0,0,0,.22);
      }

      #purityPage.purity-dark .purity-option-image {
        background: rgba(255,255,255,.04);
      }

      #purityPage.purity-dark .purity-hero-footer {
        background: rgba(15,81,50,.25);
        color: #e7eee9;
      }

      #detailView.purity-dark .purity-board h3 {
        color: #e1c36f;
      }

      #detailView.purity-dark .purity-board .purity-small-heading {
        color: #e1c36f;
      }

      #detailView.purity-dark .purity-board.remember-board h3 {
        color: #f0d27a;
      }

      @media (max-width: 360px) {
        #learningGrid {
          gap: 8px;
        }

        .purity-option {
          padding: 7px;
        }

        .purity-option h3 {
          font-size: 12px;
        }

        .purity-tools select,
        .purity-tools button {
          font-size: 11px;
          padding: 5px 7px;
        }

        .purity-board {
          padding: 12px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .purity-option {
          transition: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* ---------- TOP AND BOTTOM BARS ---------- */

  function createTopBar() {
    let bar = $("purityTopbar");
    if (bar) return bar;

    bar = document.createElement("div");
    bar.id = "purityTopbar";
    bar.className = "purity-topbar";

    bar.innerHTML = `
      <div class="purity-brand" id="purityBrand"></div>
      <div class="purity-tools">
        <label for="purityLanguage" class="purity-brand" id="purityLanguageLabel"></label>
        <select id="purityLanguage" aria-label="Language">
          <option value="bn">বাংলা</option>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
        <button type="button" id="purityThemeToggle"></button>
        <button type="button" id="purityHomeButton"></button>
      </div>
    `;

    page.prepend(bar);

    $("purityLanguage").addEventListener("change", function () {
      currentLanguage = this.value;
      saveSettings();
      renderHome();

      if (activeLessonId) {
        openLesson(activeLessonId);
      }
    });

    $("purityThemeToggle").addEventListener("click", function () {
      darkMode = !darkMode;
      saveSettings();
      applyTheme();
      updateControls();
    });

    $("purityHomeButton").addEventListener("click", showHome);

    return bar;
  }

  function createBottomBar() {
    let bar = $("purityBottomBar");
    if (bar) return bar;

    bar = document.createElement("div");
    bar.id = "purityBottomBar";
    bar.className = "purity-bottom-bar";
    bar.textContent = UI[currentLanguage].footer;

    if (detailView.parentNode) {
      detailView.parentNode.insertBefore(bar, detailView.nextSibling);
    } else {
      page.appendChild(bar);
    }

    return bar;
  }

  function updateControls() {
    const t = UI[currentLanguage];

    const brand = $("purityBrand");
    const langLabel = $("purityLanguageLabel");
    const langSelect = $("purityLanguage");
    const themeButton = $("purityThemeToggle");
    const homeButton = $("purityHomeButton");
    const bottom = $("purityBottomBar");

    if (brand) brand.textContent = t.topLabel;
    if (langLabel) langLabel.textContent = t.language;
    if (langSelect) langSelect.value = currentLanguage;
    if (themeButton) {
      themeButton.textContent = darkMode ? t.light : t.dark;
    }
    if (homeButton) homeButton.textContent = t.home;
    if (bottom) bottom.textContent = t.footer;

    if (pageTitle) pageTitle.textContent = t.title;
    if (pageIntro) pageIntro.textContent = t.subtitle;
    if (footerText) footerText.textContent = t.footer;
    if (detailFooterText) detailFooterText.textContent = t.footer;
  }

  function applyTheme() {
    page.classList.toggle("purity-dark", darkMode);
    detailView.classList.toggle("purity-dark", darkMode);

    document.documentElement.dataset.purityTheme =
      darkMode ? "dark" : "light";

    document.documentElement.style.colorScheme =
      darkMode ? "dark" : "light";
  }

  /* ---------- HOME PAGE ---------- */

  let activeLessonId = null;

  function renderHome() {
    const t = UI[currentLanguage];

    updateControls();

    if (pageTitle) {
      pageTitle.textContent = t.title;
    }

    if (pageIntro) {
      pageIntro.textContent = t.subtitle;
    }

    grid.innerHTML = "";

    LESSONS.forEach(function (lesson) {
      const data = getText(lesson);

      const card = document.createElement("button");
      card.type = "button";
      card.className = "purity-option";
      card.setAttribute("aria-label", data.title);

      card.innerHTML = `
        <div class="purity-option-image">
          <img
            src="${imagePath(lesson.image)}"
            alt="${escapeHTML(data.title)}"
            loading="lazy"
            onerror="this.style.display='none'"
          >
        </div>
        <h3>${escapeHTML(data.title)}</h3>
      `;

      card.addEventListener("click", function () {
        openLesson(lesson.id);
      });

      grid.appendChild(card);
    });

    if (footerText) {
      footerText.textContent = t.footer;
    }

    const bottom = $("purityBottomBar");
    if (bottom) bottom.textContent = t.footer;

    page.classList.remove("purity-hidden");
    detailView.classList.add("purity-hidden");
    applyTheme();
  }

  /* ---------- DETAIL BOARDS ---------- */

  function makeBoard(title, text, image, extraClass) {
    const board = document.createElement("section");
    board.className = "purity-board" + (extraClass ? " " + extraClass : "");

    let html = `<h3>${escapeHTML(title)}</h3>`;

    if (image) {
      html += makeImage(image, title, "purity-detail-image");
    }

    if (Array.isArray(text)) {
      text.forEach(function (paragraph) {
        html += `<p>${escapeHTML(paragraph)}</p>`;
      });
    } else if (text) {
      html += `<p>${escapeHTML(text)}</p>`;
    }

    board.innerHTML = html;
    return board;
  }

  function openLesson(id) {
    const lesson = LESSONS.find(function (item) {
      return item.id === id;
    });

    if (!lesson) return;

    activeLessonId = id;

    const data = getText(lesson);
    const t = UI[currentLanguage];

    if (detailTitle) detailTitle.textContent = data.title;
    if (detailSubtitle) detailSubtitle.textContent = data.subtitle;

    detailContent.innerHTML = "";

    /* Intro board: heading, image, then paragraph. */
    detailContent.appendChild(
      makeBoard(t.intro, data.intro, lesson.image, "intro-board")
    );

    /* Each step is an independent board. */
    data.sections.forEach(function (section) {
      detailContent.appendChild(
        makeBoard(
          section.title,
          section.text,
          section.image || null,
          "lesson-step-board"
        )
      );
    });

    /* One final board combines summary, Qur'anic guidance and reminder. */
    const rememberBoard = document.createElement("section");
    rememberBoard.className = "purity-board remember-board";

    rememberBoard.innerHTML = `
      <h3>${escapeHTML(t.remember)}</h3>

      <div class="purity-small-heading">${escapeHTML(t.summary)}</div>
      <p>${escapeHTML(data.summary || "")}</p>

      <div class="purity-small-heading">${escapeHTML(t.quran)}</div>
      <p>${escapeHTML(data.quran || "")}</p>

      <div class="purity-small-heading">${escapeHTML(t.reminder)}</div>
      <p>${escapeHTML(data.reminder || "")}</p>

      <p class="purity-source-note">${escapeHTML(t.sourceNote)}</p>
    `;

    detailContent.appendChild(rememberBoard);

    if (detailFooterText) {
      detailFooterText.textContent = t.footer;
    }

    page.classList.add("purity-hidden");
    detailView.classList.remove("purity-hidden");

    applyTheme();

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }

  function showHome() {
    activeLessonId = null;

    detailView.classList.add("purity-hidden");
    page.classList.remove("purity-hidden");

    applyTheme();

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }

  /* ---------- INITIALIZE ---------- */

  addStyles();
  createTopBar();
  createBottomBar();
  updateControls();
  applyTheme();
  renderHome();

  /* ---------- OPTIONAL GLOBAL API ---------- */
  /* Allows other pages to open a topic if needed. */

  window.NamazPurity = {
    open: openLesson,
    home: showHome,
    setLanguage: function (language) {
      if (!["bn", "en", "hi"].includes(language)) return;

      currentLanguage = language;
      saveSettings();
      renderHome();

      if (activeLessonId) {
        openLesson(activeLessonId);
      }
    },
    setDarkMode: function (enabled) {
      darkMode = Boolean(enabled);
      saveSettings();
      applyTheme();
      updateControls();
    },
    getLanguage: function () {
      return currentLanguage;
    },
    getDarkMode: function () {
      return darkMode;
    }
  };
})();
