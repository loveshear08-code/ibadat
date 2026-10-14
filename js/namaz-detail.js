/* =========================================
   IBADAT — NAMAZ DETAIL
   14 topics | Bengali / English / Hindi
   No history or reading-progress storage
   ========================================= */

"use strict";

(() => {
  const SETTINGS_KEY = "appSettings";

  const params = new URLSearchParams(window.location.search);

  const topicId = params.get("topic");

  const translations = {
    bn: {
      back: "ফিরে যাও",
      section: "নামাজ শিক্ষা",
      previous: "← আগের বিষয়",
      next: "পরের বিষয় →",
      first: "এটাই প্রথম বিষয়",
      last: "এটাই শেষ বিষয়",
      invalid: "বিষয়টি পাওয়া যায়নি",
      invalidText: "এই বিষয়ের লিংকটি সঠিক নয়। আগের পেজে ফিরে গিয়ে আবার চেষ্টা করো।",
      note: "মনে রাখবে: বিস্তারিত মাসআলা ও ফিকহি মতভেদ নির্ভরযোগ্য আলেম বা শিক্ষকের কাছ থেকে যাচাই করে শিখবে।"
    },
    en: {
      back: "Back",
      section: "Prayer Learning",
      previous: "← Previous",
      next: "Next →",
      first: "This is the first topic",
      last: "This is the last topic",
      invalid: "Topic not found",
      invalidText: "This topic link is invalid. Return to the previous page and try again.",
      note: "Note: Learn detailed rulings and differences from a qualified scholar or teacher."
    },
    hi: {
      back: "वापस जाएँ",
      section: "नमाज़ की शिक्षा",
      previous: "← पिछला विषय",
      next: "अगला विषय →",
      first: "यह पहला विषय है",
      last: "यह आख़िरी विषय है",
      invalid: "विषय नहीं मिला",
      invalidText: "इस विषय का लिंक सही नहीं है। पिछले पेज पर लौटकर दोबारा कोशिश करें।",
      note: "ध्यान दें: विस्तृत मसले और फ़िक़्ही मतभेद योग्य आलिम या शिक्षक से सीखें।"
    }
  };

  /*
   * Each lesson contains a title and learning sections
   * in Bengali, English and Hindi.
   */
  const lessons = [
    {
      id: "purity",
      title: {
        bn: "পাক-পবিত্রতা",
        en: "Purification",
        hi: "पाक-सफ़ाई"
      },
      intro: {
        bn: "নামাজের আগে পবিত্রতা ও পরিচ্ছন্নতার প্রাথমিক বিষয়গুলো শেখো।",
        en: "Learn the basic requirements of cleanliness before prayer.",
        hi: "नमाज़ से पहले पाक-सफ़ाई की बुनियादी बातें सीखें।"
      },
      sections: {
        bn: [
          ["পাক-পবিত্রতা কেন জরুরি", "নামাজের জন্য শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা জরুরি। অপবিত্রতা থাকলে তা শরিয়তসম্মতভাবে দূর করতে হয়।"],
          ["শরীর ও পোশাক", "নামাজের আগে শরীর ও পোশাকে অপবিত্রতা আছে কি না দেখে নাও। প্রয়োজন অনুযায়ী পরিষ্কার করো।"],
          ["নামাজের স্থান", "যেখানে নামাজ পড়বে, সেই স্থান পবিত্র কি না নিশ্চিত হও।"],
          ["মনে রাখবে", "পবিত্রতার নির্দিষ্ট বিধান সম্পর্কে সন্দেহ হলে নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নাও।"]
        ],
        en: [
          ["Why purification matters", "For prayer, the body, clothing and place of prayer must meet the requirements of Islamic cleanliness."],
          ["Body and clothing", "Check for impurity before prayer and remove it appropriately."],
          ["Place of prayer", "Make sure the place where you pray is clean and suitable for prayer."],
          ["Remember", "Ask a qualified scholar about specific rulings when needed."]
        ],
        hi: [
          ["पाक-सफ़ाई क्यों ज़रूरी है", "नमाज़ के लिए शरीर, कपड़े और नमाज़ की जगह का पाक होना ज़रूरी है।"],
          ["शरीर और कपड़े", "नमाज़ से पहले नापाकी की जाँच करें और ज़रूरत के अनुसार उसे दूर करें।"],
          ["नमाज़ की जगह", "जिस जगह नमाज़ पढ़ें, उसके पाक होने का ध्यान रखें।"],
          ["याद रखें", "विशेष मसले के लिए योग्य आलिम से पूछें।"]
        ]
      }
    },

    {
      id: "wudu",
      title: {
        bn: "ওজু",
        en: "Wudu",
        hi: "वुज़ू"
      },
      intro: {
        bn: "ওজুর সাধারণ ধাপ ও পরিচ্ছন্নতার নিয়ম শেখো।",
        en: "Learn the general steps of wudu and cleanliness.",
        hi: "वुज़ू के सामान्य चरण और सफ़ाई के नियम सीखें।"
      },
      sections: {
        bn: [
          ["ওজুর গুরুত্ব", "নামাজের আগে ওজু প্রয়োজন হলে সঠিকভাবে ওজু করতে হবে।"],
          ["ওজুর সাধারণ ধাপ", "হাত ধোও, কুলি করো, নাকে পানি দাও, মুখ ধোও, কনুইসহ দুই হাত ধোও, মাথা মাসেহ করো এবং টাখনুসহ দুই পা ধোও।"],
          ["ওজুর সময় সতর্কতা", "কোনো অঙ্গে পানি পৌঁছাতে বাধা দেয় এমন কিছু থাকলে তা সম্পর্কে সচেতন হও। পানি অপচয় কোরো না।"],
          ["ওজু ভাঙার বিধান", "কোন কোন কারণে ওজু ভাঙে, তা নিজের অনুসৃত ফিকহ অনুযায়ী নির্ভরযোগ্য শিক্ষক থেকে শেখো।"]
        ],
        en: [
          ["Importance of wudu", "Perform wudu correctly whenever it is required before prayer."],
          ["General steps", "Wash the hands, rinse the mouth and nose, wash the face and arms, wipe the head, and wash the feet including the ankles."],
          ["Care during wudu", "Ensure water reaches the required areas and avoid wasting water."],
          ["What invalidates wudu", "Learn the relevant rulings from a reliable teacher according to your school of jurisprudence."]
        ],
        hi: [
          ["वुज़ू की अहमियत", "नमाज़ से पहले जहाँ वुज़ू ज़रूरी हो, उसे सही तरीक़े से करें।"],
          ["सामान्य चरण", "हाथ धोएँ, कुल्ली करें, नाक में पानी डालें, चेहरा और बाँहें धोएँ, सिर का मसह करें और टखनों सहित पैर धोएँ।"],
          ["वुज़ू में सावधानी", "पानी ज़रूरी जगहों तक पहुँचाएँ और उसे बर्बाद न करें।"],
          ["वुज़ू टूटने के कारण", "अपने फ़िक़्ह के अनुसार नियम विश्वसनीय शिक्षक से सीखें।"]
        ]
      }
    },

    {
      id: "conditions",
      title: {
        bn: "নামাজের শর্ত",
        en: "Prayer Conditions",
        hi: "नमाज़ की शर्तें"
      },
      intro: {
        bn: "নামাজ শুরু করার আগে প্রয়োজনীয় শর্তগুলো যাচাই করো।",
        en: "Check the essential conditions before beginning prayer.",
        hi: "नमाज़ शुरू करने से पहले आवश्यक शर्तें जाँचें।"
      },
      sections: {
        bn: [
          ["পবিত্রতা", "নামাজের আগে প্রয়োজনীয় পবিত্রতা নিশ্চিত করো।"],
          ["সতর ঢাকা", "নামাজের জন্য শরিয়ত নির্ধারিত সতর ঢেকে রাখো।"],
          ["কিবলামুখী হওয়া", "সম্ভব হলে কিবলার দিকে মুখ করে নামাজ পড়ো।"],
          ["ওয়াক্ত ও নিয়ত", "নামাজের সময় হয়েছে কি না নিশ্চিত হও এবং মনে নির্দিষ্ট নামাজের নিয়ত রাখো।"]
        ],
        en: [
          ["Purification", "Ensure the required state of purification before prayer."],
          ["Covering", "Cover the parts of the body required for prayer."],
          ["Facing the Qibla", "Face the direction of the Qibla when possible."],
          ["Time and intention", "Check that the prayer time has begun and intend the prayer in your heart."]
        ],
        hi: [
          ["पाक-सफ़ाई", "नमाज़ से पहले आवश्यक पाक-सफ़ाई सुनिश्चित करें।"],
          ["सतर ढकना", "नमाज़ के लिए आवश्यक अंगों को ढकें।"],
          ["क़िबला की ओर", "संभव हो तो क़िबला की ओर मुँह करके नमाज़ पढ़ें।"],
          ["वक़्त और नियत", "नमाज़ का वक़्त शुरू होने की पुष्टि करें और दिल में नियत रखें।"]
        ]
      }
    },

    {
      id: "times-rakats",
      title: {
        bn: "ওয়াক্ত ও রাকাত",
        en: "Prayer Times & Rakats",
        hi: "नमाज़ के वक़्त और रकअत"
      },
      intro: {
        bn: "পাঁচ ওয়াক্ত ফরজ নামাজের রাকাত ও সময় সম্পর্কে জানো।",
        en: "Learn about the five daily prayers and their obligatory rakats.",
        hi: "पाँच वक़्त की नमाज़ और उनकी फ़र्ज़ रकअत जानें।"
      },
      sections: {
        bn: [
          ["পাঁচ ওয়াক্ত নামাজ", "ফজর, জোহর, আসর, মাগরিব ও ইশা—এই পাঁচটি ফরজ নামাজ প্রতিদিন আদায় করা হয়।"],
          ["ফরজ রাকাত", "ফজর ২ রাকাত, জোহর ৪ রাকাত, আসর ৪ রাকাত, মাগরিব ৩ রাকাত এবং ইশা ৪ রাকাত ফরজ।"],
          ["নামাজের সময়", "নামাজের সঠিক ওয়াক্ত স্থান ও তারিখ অনুযায়ী পরিবর্তিত হয়। নিজের এলাকার নির্ভরযোগ্য সময়সূচি অনুসরণ করো।"],
          ["সুন্নত ও নফল", "ফরজ ছাড়াও বিভিন্ন নামাজে সুন্নত ও নফল রাকাত রয়েছে। এগুলোর বিস্তারিত নির্ভরযোগ্য শিক্ষক থেকে শেখো।"]
        ],
        en: [
          ["The five daily prayers", "The obligatory daily prayers are Fajr, Dhuhr, Asr, Maghrib and Isha."],
          ["Obligatory rakats", "Fajr: 2; Dhuhr: 4; Asr: 4; Maghrib: 3; Isha: 4 obligatory rakats."],
          ["Prayer times", "Times vary by location and date. Follow a reliable local timetable."],
          ["Sunnah and voluntary prayers", "Additional Sunnah and voluntary rakats are associated with various prayers. Learn their details from a reliable teacher."]
        ],
        hi: [
          ["पाँच वक़्त की नमाज़", "फ़ज्र, ज़ुहर, अस्र, मग़रिब और इशा पाँच फ़र्ज़ नमाज़ें हैं।"],
          ["फ़र्ज़ रकअत", "फ़ज्र 2, ज़ुहर 4, अस्र 4, मग़रिब 3 और इशा 4 फ़र्ज़ रकअत।"],
          ["नमाज़ का वक़्त", "वक़्त जगह और तारीख़ के अनुसार बदलता है। स्थानीय विश्वसनीय समय-सारणी देखें।"],
          ["सुन्नत और नफ़्ल", "अलग-अलग नमाज़ों के साथ सुन्नत और नफ़्ल रकअतें भी होती हैं। इनके विवरण शिक्षक से सीखें।"]
        ]
      }
    },

    {
      id: "fard-wajib-sunnah",
      title: {
        bn: "ফরজ, ওয়াজিব ও সুন্নত",
        en: "Fard, Wajib & Sunnah",
        hi: "फ़र्ज़, वाजिब और सुन्नत"
      },
      intro: {
        bn: "নামাজের বিভিন্ন বিধানের পার্থক্য সম্পর্কে প্রাথমিক ধারণা নাও।",
        en: "Understand the basic distinctions between prayer rulings.",
        hi: "नमाज़ के विभिन्न हुक्मों का बुनियादी अंतर समझें।"
      },
      sections: {
        bn: [
          ["ফরজ", "ফরজ হলো অবশ্য পালনীয় বিধান। নামাজের ফরজ বিষয়গুলো সঠিকভাবে শেখা জরুরি।"],
          ["ওয়াজিব", "ওয়াজিবের বিধান ও গুরুত্ব ফরজ থেকে আলাদা হতে পারে। বিস্তারিত ব্যাখ্যা অনুসৃত ফিকহের ওপর নির্ভর করতে পারে।"],
          ["সুন্নত", "রাসুলুল্লাহ ﷺ-এর শেখানো ও পালন করা আমলকে সুন্নত বলা হয়। নামাজের সুন্নত আমলগুলো নির্ভরযোগ্যভাবে শেখো।"],
          ["কোনো কাজ বাদ পড়লে", "কোন কাজ বাদ পড়লে কী বিধান প্রযোজ্য, তা নির্ভরযোগ্য আলেম বা শিক্ষকের কাছ থেকে জেনে নাও।"]
        ],
        en: [
          ["Fard", "Fard refers to an obligatory requirement. Learn the essential requirements of prayer carefully."],
          ["Wajib", "Wajib has its own legal classification. Detailed explanations may depend on the school of jurisprudence."],
          ["Sunnah", "Sunnah refers to the teachings and practices of the Prophet Muhammad ﷺ. Learn the Sunnah actions of prayer from reliable sources."],
          ["If something is missed", "Ask a qualified scholar about the ruling when an action is omitted."]
        ],
        hi: [
          ["फ़र्ज़", "फ़र्ज़ अनिवार्य हुक्म है। नमाज़ के आवश्यक फ़र्ज़ अच्छी तरह सीखें।"],
          ["वाजिब", "वाजिब का हुक्म अलग है। विस्तृत विवरण फ़िक़्ही मत पर निर्भर कर सकता है।"],
          ["सुन्नत", "सुन्नत रसूलुल्लाह ﷺ की शिक्षाओं और अमलों को कहते हैं।"],
          ["कोई अमल छूट जाए", "ऐसी स्थिति में योग्य आलिम या शिक्षक से पूछें।"]
        ]
      }
    },

    {
      id: "start",
      title: {
        bn: "নামাজ শুরু",
        en: "Starting Prayer",
        hi: "नमाज़ की शुरुआत"
      },
      intro: {
        bn: "নামাজের শুরু থেকে দাঁড়িয়ে পড়ার সাধারণ পদ্ধতি শেখো।",
        en: "Learn the basic opening sequence of prayer.",
        hi: "नमाज़ शुरू करने का सामान्य तरीक़ा सीखें।"
      },
      sections: {
        bn: [
          ["প্রস্তুতি", "ওজু, পোশাক, নামাজের স্থান, কিবলা ও ওয়াক্ত নিশ্চিত করো।"],
          ["নিয়ত", "কোন নামাজ পড়ছ, তা মনে নির্ধারণ করো। নিয়ত মূলত অন্তরের ইচ্ছা।"],
          ["তাকবিরে তাহরিমা", "নামাজ শুরু করার সময় 'আল্লাহু আকবার' বলা হয়।"],
          ["কিয়াম", "সামর্থ্য থাকলে ফরজ নামাজে দাঁড়িয়ে কিরাত পড়ো। হাত বাঁধার পদ্ধতি নিজের অনুসৃত শিক্ষার সঙ্গে মিলিয়ে শেখো।"]
        ],
        en: [
          ["Preparation", "Check wudu, clothing, prayer place, Qibla and prayer time."],
          ["Intention", "Know in your heart which prayer you are performing."],
          ["Opening takbir", "Prayer begins with saying 'Allahu Akbar'."],
          ["Standing", "Stand for obligatory prayer when able and recite as taught. Learn the hand position according to your practice."]
        ],
        hi: [
          ["तैयारी", "वुज़ू, कपड़े, जगह, क़िबला और वक़्त जाँचें।"],
          ["नियत", "दिल में तय करें कि कौन-सी नमाज़ पढ़ रहे हैं।"],
          ["तकबीर-ए-तहरीमा", "नमाज़ की शुरुआत 'अल्लाहु अकबर' कहकर होती है।"],
          ["क़ियाम", "सामर्थ्य हो तो फ़र्ज़ नमाज़ में खड़े होकर क़िराअत करें।"]
        ]
      }
    },

    {
      id: "qirat",
      title: {
        bn: "কিরাত",
        en: "Qira'at",
        hi: "क़िराअत"
      },
      intro: {
        bn: "নামাজে কুরআন তিলাওয়াত ও সঠিক উচ্চারণের গুরুত্ব জানো।",
        en: "Learn about Qur'anic recitation and correct pronunciation in prayer.",
        hi: "नमाज़ में क़ुरआन की तिलावत और सही उच्चारण का महत्व जानें।"
      },
      sections: {
        bn: [
          ["কিরাত কী", "নামাজে কুরআনের আয়াত তিলাওয়াত করাকে কিরাত বলা হয়।"],
          ["সূরা ফাতিহা", "সূরা ফাতিহা সঠিক আরবি উচ্চারণে শেখো এবং অর্থ বোঝার চেষ্টা করো।"],
          ["অন্য সূরা", "প্রয়োজন অনুযায়ী কুরআনের ছোট সূরাগুলো সঠিক উচ্চারণে শেখো।"],
          ["তিলাওয়াতের আদব", "ধীরে ও স্পষ্টভাবে পড়ো। উচ্চারণ সংশোধনের জন্য অভিজ্ঞ শিক্ষকের কাছে শুনিয়ে নাও।"]
        ],
        en: [
          ["What is Qira'at?", "Qira'at is the recitation of Qur'anic verses during prayer."],
          ["Surah Al-Fatihah", "Learn Surah Al-Fatihah with correct Arabic pronunciation and understand its meaning."],
          ["Other surahs", "Learn additional short surahs with accurate pronunciation."],
          ["Recitation etiquette", "Recite clearly and practise with a qualified teacher."]
        ],
        hi: [
          ["क़िराअत क्या है?", "नमाज़ में क़ुरआन की आयतें पढ़ने को क़िराअत कहते हैं।"],
          ["सूरह फ़ातिहा", "सूरह फ़ातिहा सही अरबी उच्चारण के साथ सीखें और अर्थ समझें।"],
          ["दूसरी सूरतें", "छोटी सूरतें सही उच्चारण के साथ सीखें।"],
          ["तिलावत का आदब", "साफ़ पढ़ें और उच्चारण शिक्षक से सुधारें।"]
        ]
      }
    },

    {
      id: "ruku",
      title: {
        bn: "রুকু",
        en: "Ruku",
        hi: "रुकू"
      },
      intro: {
        bn: "রুকুর ভঙ্গি, তাসবিহ ও স্থিরতার গুরুত্ব শেখো।",
        en: "Learn the posture of ruku, its tasbih and the importance of calmness.",
        hi: "रुकू की मुद्रा, तस्बीह और इत्मीनान का महत्व सीखें।"
      },
      sections: {
        bn: [
          ["রুকুতে যাওয়া", "কিরাতের পর 'আল্লাহু আকবার' বলে রুকুতে যাওয়া হয়।"],
          ["রুকুর ভঙ্গি", "রুকুতে পিঠ যথাসম্ভব সোজা রাখো এবং স্থির থাকো। সঠিক ভঙ্গি শিক্ষক থেকে শিখে নাও।"],
          ["রুকুর তাসবিহ", "রুকুতে সাধারণভাবে 'সুবহানা রব্বিয়াল আযীম' পড়া হয়।"],
          ["রুকু থেকে ওঠা", "রুকু থেকে উঠে সোজা হয়ে স্থির হও, তারপর পরবর্তী ধাপে যাও।"]
        ],
        en: [
          ["Entering ruku", "After recitation, bow into ruku while saying 'Allahu Akbar'."],
          ["Ruku posture", "Keep the back appropriately straight and remain still. Learn the correct posture from a teacher."],
          ["Tasbih of ruku", "A commonly recited glorification is 'Subhana Rabbiyal Adheem'."],
          ["Rising from ruku", "Rise upright and remain still before proceeding."]
        ],
        hi: [
          ["रुकू में जाना", "क़िराअत के बाद 'अल्लाहु अकबर' कहकर रुकू करें।"],
          ["रुकू की मुद्रा", "पीठ को यथासंभव सीधा रखें और इत्मीनान से रहें।"],
          ["रुकू की तस्बीह", "आम तौर पर 'सुब्हाना रब्बियल अज़ीम' पढ़ा जाता है।"],
          ["रुकू से उठना", "सीधे खड़े होकर इत्मीनान करें और फिर आगे बढ़ें।"]
        ]
      }
    },

    {
      id: "sujood",
      title: {
        bn: "সিজদা",
        en: "Sujood",
        hi: "सज्दा"
      },
      intro: {
        bn: "সিজদা, তাসবিহ এবং দুই সিজদার মাঝের বৈঠক শেখো।",
        en: "Learn about prostration, its tasbih and the sitting between prostrations.",
        hi: "सज्दा, उसकी तस्बीह और दोनों सज्दों के बीच बैठना सीखें।"
      },
      sections: {
        bn: [
          ["সিজদায় যাওয়া", "রুকু থেকে উঠে দাঁড়ানোর পর নির্ধারিত পদ্ধতিতে সিজদা করা হয়।"],
          ["সিজদার ভঙ্গি", "সিজদার সঠিক ভঙ্গি ও শরীরের অবস্থান নির্ভরযোগ্য শিক্ষক থেকে শিখে নাও।"],
          ["সিজদার তাসবিহ", "সিজদায় সাধারণভাবে 'সুবহানা রব্বিয়াল আ'লা' পড়া হয়।"],
          ["দুই সিজদার মাঝখানে", "দুই সিজদার মাঝে বসে স্থির থাকো এবং শেখানো পদ্ধতি অনুসরণ করো।"]
        ],
        en: [
          ["Entering sujood", "After rising from ruku, perform sujood in the prescribed manner."],
          ["Sujood posture", "Learn the correct posture and positioning from a qualified teacher."],
          ["Tasbih of sujood", "A commonly recited glorification is 'Subhana Rabbiyal A'la'."],
          ["Between prostrations", "Sit calmly between the two prostrations and follow the taught method."]
        ],
        hi: [
          ["सज्दे में जाना", "रुकू से उठने के बाद निर्धारित तरीक़े से सज्दा करें।"],
          ["सज्दे की मुद्रा", "सही मुद्रा और शरीर की स्थिति शिक्षक से सीखें।"],
          ["सज्दे की तस्बीह", "आम तौर पर 'सुब्हाना रब्बियल आला' पढ़ा जाता है।"],
          ["दो सज्दों के बीच", "दोनों सज्दों के बीच इत्मीनान से बैठें।"]
        ]
      }
    },

    {
      id: "tashahhud",
      title: {
        bn: "বৈঠক ও দোয়া",
        en: "Sitting & Supplication",
        hi: "बैठक और दुआ"
      },
      intro: {
        bn: "নামাজের বৈঠক, তাশাহহুদ ও শেষ বৈঠকের আমল সম্পর্কে জানো।",
        en: "Learn about the sitting, Tashahhud and the actions of the final sitting.",
        hi: "बैठक, तशह्हुद और आख़िरी बैठक के अमल सीखें।"
      },
      sections: {
        bn: [
          ["নামাজের বৈঠক", "নামাজের নির্ধারিত পর্যায়ে বসে তাশাহহুদ পড়া হয়।"],
          ["তাশাহহুদ", "আত্তাহিয়্যাতু সঠিক আরবি উচ্চারণে শেখো এবং এর অর্থ বোঝার চেষ্টা করো।"],
          ["দরুদ", "শেষ বৈঠকে দরুদ পড়ার পদ্ধতি নির্ভরযোগ্য শিক্ষক থেকে শেখো।"],
          ["দোয়া", "শেষ বৈঠকে শেখানো দোয়াগুলো সঠিকভাবে শেখো। আরবি উচ্চারণ ও অর্থ যাচাই করে নাও।"]
        ],
        en: [
          ["Sitting in prayer", "At the prescribed sitting, recite the Tashahhud."],
          ["Tashahhud", "Learn the Arabic recitation accurately and understand its meaning."],
          ["Salawat", "Learn the prescribed salawat for the final sitting from a reliable teacher."],
          ["Supplication", "Learn the taught supplications and verify their Arabic pronunciation and meaning."]
        ],
        hi: [
          ["नमाज़ की बैठक", "निर्धारित बैठक में तशह्हुद पढ़ें।"],
          ["तशह्हुद", "अरबी उच्चारण सही सीखें और अर्थ समझें।"],
          ["दरूद", "आख़िरी बैठक में दरूद पढ़ने का तरीक़ा विश्वसनीय शिक्षक से सीखें।"],
          ["दुआ", "सिखाई गई दुआएँ सही उच्चारण और अर्थ के साथ सीखें।"]
        ]
      }
    },

    {
      id: "after-prayer",
      title: {
        bn: "সালাম ও পরের আমল",
        en: "Salam & After Prayer",
        hi: "सलाम और नमाज़ के बाद"
      },
      intro: {
        bn: "নামাজ শেষ করার পদ্ধতি ও পরের জিকির-দোয়া সম্পর্কে জানো।",
        en: "Learn how prayer concludes and about remembrance afterward.",
        hi: "नमाज़ समाप्त करने और उसके बाद के ज़िक्र के बारे में जानें।"
      },
      sections: {
        bn: [
          ["সালাম", "নামাজের শেষে নির্ধারিত পদ্ধতিতে সালাম ফিরিয়ে নামাজ শেষ করা হয়।"],
          ["জিকির", "নামাজের পর মাসনুন জিকির শেখো এবং নির্ভরযোগ্য পাঠ অনুসরণ করো।"],
          ["দোয়া", "নামাজের পরের দোয়াগুলোর আরবি, উচ্চারণ ও অর্থ নির্ভরযোগ্য উৎস থেকে শেখো।"],
          ["নিয়মিত আমল", "সঠিকভাবে শেখার পর নিয়মিত জিকির ও দোয়া পড়ার চেষ্টা করো।"]
        ],
        en: [
          ["Salam", "Prayer is concluded by giving salam in the prescribed manner."],
          ["Remembrance", "Learn the established remembrances after prayer from reliable sources."],
          ["Supplication", "Learn the Arabic text, pronunciation and meaning of supplications after prayer."],
          ["Consistency", "After learning correctly, try to maintain regular remembrance."]
        ],
        hi: [
          ["सलाम", "नमाज़ का अंत निर्धारित तरीक़े से सलाम फेरकर होता है।"],
          ["ज़िक्र", "नमाज़ के बाद के मस्नून ज़िक्र विश्वसनीय स्रोत से सीखें।"],
          ["दुआ", "दुआओं का अरबी पाठ, उच्चारण और अर्थ सीखें।"],
          ["नियमित अमल", "सही तरीक़ा सीखने के बाद नियमित ज़िक्र करें।"]
        ]
      }
    },

    {
      id: "complete",
      title: {
        bn: "সম্পূর্ণ নামাজ",
        en: "Complete Prayer",
        hi: "पूरी नमाज़"
      },
      intro: {
        bn: "নামাজের শুরু থেকে শেষ পর্যন্ত ধাপে ধাপে শিখে নাও।",
        en: "Learn the sequence of prayer from beginning to end.",
        hi: "नमाज़ की शुरुआत से अंत तक का क्रम सीखें।"
      },
      sections: {
        bn: [
          ["প্রথম ধাপ: প্রস্তুতি", "পবিত্রতা, পোশাক, স্থান, কিবলা ও নামাজের ওয়াক্ত নিশ্চিত করো।"],
          ["দ্বিতীয় ধাপ: শুরু", "মনে নিয়ত করে তাকবিরে তাহরিমার মাধ্যমে নামাজ শুরু করো।"],
          ["তৃতীয় ধাপ: কিয়াম ও কিরাত", "দাঁড়িয়ে শেখানো পদ্ধতিতে কিরাত পড়ো।"],
          ["চতুর্থ ধাপ: রুকু ও সিজদা", "রুকু, দাঁড়ানো, সিজদা এবং দুই সিজদার মাঝের বসা সঠিকভাবে করো।"],
          ["পঞ্চম ধাপ: বৈঠক ও সালাম", "নির্ধারিত বৈঠক, তাশাহহুদ, দরুদ ও দোয়া শেষে সালাম ফিরিয়ে নামাজ শেষ করো।"],
          ["অনুশীলন", "সম্পূর্ণ পদ্ধতি একজন নির্ভরযোগ্য শিক্ষক বা স্বীকৃত নির্দেশিকা থেকে দেখে অনুশীলন করো।"]
        ],
        en: [
          ["Step 1: Preparation", "Check purification, clothing, prayer place, Qibla and prayer time."],
          ["Step 2: Beginning", "Make the intention in your heart and begin with the opening takbir."],
          ["Step 3: Standing and recitation", "Stand and recite according to the method you have learned."],
          ["Step 4: Ruku and sujood", "Perform ruku, standing upright, prostration and the sitting between prostrations correctly."],
          ["Step 5: Sitting and salam", "Complete the prescribed sitting, Tashahhud, salawat and supplications, then conclude with salam."],
          ["Practice", "Practise the complete sequence with a qualified teacher or reliable guide."]
        ],
        hi: [
          ["पहला चरण: तैयारी", "पाक-सफ़ाई, कपड़े, जगह, क़िबला और वक़्त जाँचें।"],
          ["दूसरा चरण: शुरुआत", "दिल में नियत करके तकबीर-ए-तहरीमा से नमाज़ शुरू करें।"],
          ["तीसरा चरण: क़ियाम और क़िराअत", "खड़े होकर सीखी हुई विधि के अनुसार क़िराअत करें।"],
          ["चौथा चरण: रुकू और सज्दा", "रुकू, सीधे खड़े होना, सज्दा और दोनों सज्दों के बीच बैठना सही तरीक़े से करें।"],
          ["पाँचवाँ चरण: बैठक और सलाम", "तशह्हुद, दरूद और दुआ के बाद सलाम फेरकर नमाज़ पूरी करें।"],
          ["अभ्यास", "पूरी विधि विश्वसनीय शिक्षक या मार्गदर्शिका से सीखकर अभ्यास करें।"]
        ]
      }
    },

    {
      id: "mistakes",
      title: {
        bn: "ভুল ও সংশোধন",
        en: "Mistakes & Correction",
        hi: "ग़लतियाँ और सुधार"
      },
      intro: {
        bn: "নামাজে সাধারণ ভুল এড়ানো ও ভুল হলে সঠিক পরামর্শ নেওয়া শেখো।",
        en: "Learn to avoid common mistakes and seek guidance when needed.",
        hi: "आम ग़लतियों से बचना और ज़रूरत पर सही मार्गदर्शन लेना सीखें।"
      },
      sections: {
        bn: [
          ["তাড়াহুড়ো করা", "রুকু, সিজদা ও বৈঠকে তাড়াহুড়ো না করে স্থিরতা বজায় রাখো।"],
          ["উচ্চারণের ভুল", "কুরআন তিলাওয়াতের উচ্চারণ সংশোধনের জন্য অভিজ্ঞ শিক্ষকের কাছে অনুশীলন করো।"],
          ["অমনোযোগ", "নামাজে মনোযোগ রাখার চেষ্টা করো এবং শেখানো পদ্ধতি অনুসরণ করো।"],
          ["ভুল হয়ে গেলে", "সব ভুলের বিধান এক নয়। কী করতে হবে, তা ভুলের ধরন ও অনুসৃত ফিকহ অনুযায়ী নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নাও।"]
        ],
        en: [
          ["Rushing", "Avoid rushing through ruku, sujood and sitting; maintain calmness."],
          ["Pronunciation mistakes", "Practise Qur'anic recitation with a qualified teacher."],
          ["Lack of focus", "Try to maintain attention and follow the method you have learned."],
          ["When a mistake occurs", "Rulings depend on the type of mistake and school of jurisprudence. Ask a qualified scholar."]
        ],
        hi: [
          ["जल्दबाज़ी", "रुकू, सज्दे और बैठक में इत्मीनान रखें।"],
          ["उच्चारण की ग़लती", "क़ुरआन का उच्चारण योग्य शिक्षक से सुधारें।"],
          ["ध्यान की कमी", "नमाज़ में ध्यान रखने की कोशिश करें।"],
          ["ग़लती होने पर", "हुक्म ग़लती और फ़िक़्ही मत पर निर्भर करता है। योग्य आलिम से पूछें।"]
        ]
      }
    },

    {
      id: "jamaat-special",
      title: {
        bn: "জামাত ও বিশেষ নামাজ",
        en: "Congregation & Special Prayers",
        hi: "जमाअत और विशेष नमाज़ें"
      },
      intro: {
        bn: "জামাত, জুমা, ঈদ ও অন্যান্য বিশেষ নামাজের প্রাথমিক পরিচয় জানো।",
        en: "Learn the basics of congregational and special prayers.",
        hi: "जमाअत और विशेष नमाज़ों की बुनियादी बातें जानें।"
      },
      sections: {
        bn: [
          ["জামাতে নামাজ", "জামাতে নামাজ আদায়ের সময় ইমামের অনুসরণ করো এবং কাতার ঠিক রাখো।"],
          ["জুমার নামাজ", "জুমার নামাজের বিশেষ শর্ত ও পদ্ধতি রয়েছে। স্থানীয় নির্ভরযোগ্য শিক্ষক থেকে বিস্তারিত শেখো।"],
          ["ঈদের নামাজ", "ঈদের নামাজের অতিরিক্ত তাকবিরসহ বিশেষ বিধান রয়েছে। সঠিক পদ্ধতি শেখো।"],
          ["অন্যান্য বিশেষ নামাজ", "বিতর, তারাবিহ, জানাজা ও অন্যান্য নামাজের নিয়ম আলাদা হতে পারে। প্রতিটি বিষয় নির্ভরযোগ্য উৎস থেকে শেখো।"]
        ],
        en: [
          ["Congregational prayer", "Follow the imam and keep the prayer row orderly."],
          ["Friday prayer", "Jumu'ah has specific conditions and procedures. Learn the details from a reliable local teacher."],
          ["Eid prayer", "Eid prayer includes special rulings, including additional takbirs. Learn the correct method."],
          ["Other special prayers", "Witr, Taraweeh, Janazah and other prayers have distinct rulings. Learn each from reliable sources."]
        ],
        hi: [
          ["जमाअत की नमाज़", "इमाम की पैरवी करें और सफ़ सीधी रखें।"],
          ["जुमा की नमाज़", "जुमा के विशेष नियम और तरीक़े हैं। विश्वसनीय शिक्षक से सीखें।"],
          ["ईद की नमाज़", "ईद की नमाज़ में अतिरिक्त तकबीरों सहित विशेष नियम हैं।"],
          ["अन्य विशेष नमाज़ें", "वितर, तरावीह, जनाज़ा और दूसरी नमाज़ों के नियम अलग हैं।"]
        ]
      }
    }
  ];

  /* Read settings without saving any new data. */
  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  const settings = getSettings();

  let language = params.get("lang") || settings.lang || "bn";

  if (!["bn", "en", "hi"].includes(language)) {
    language = "bn";
  }

  const ui = translations[language];
  const lessonIndex = lessons.findIndex(lesson => lesson.id === topicId);

  document.documentElement.lang = language;

  /* Apply the saved theme. */
  document.body.classList.toggle(
    "dark-mode",
    Boolean(settings.dark)
  );

  /* Header and navigation labels. */
  document.getElementById("back-label").textContent = ui.back;
  document.getElementById("previous-button").textContent = ui.previous;
  document.getElementById("next-button").textContent = ui.next;

  /* Back button returns to the previous page. */
  document.getElementById("back-button").addEventListener("click", () => {
    if (document.referrer && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "namaz.html";
    }
  });

  const titleElement = document.getElementById("lesson-title");
  const numberElement = document.getElementById("lesson-number");
  const introElement = document.getElementById("lesson-intro");
  const contentElement = document.getElementById("lesson-content");
  const noteElement = document.getElementById("lesson-note");

  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  /* Invalid topic link. */
  if (lessonIndex === -1) {
    document.title = ui.invalid + " | IBADAT";
    titleElement.textContent = ui.invalid;
    numberElement.textContent = ui.section;
    introElement.textContent = "";
    contentElement.textContent = ui.invalidText;
    noteElement.textContent = "";

    previousButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  const lesson = lessons[lessonIndex];

  const lessonTitle = lesson.title[language] || lesson.title.bn;
  const lessonIntro = lesson.intro[language] || lesson.intro.bn;
  const lessonSections = lesson.sections[language] || lesson.sections.bn;

  document.title = lessonTitle + " | IBADAT";

  titleElement.textContent = lessonTitle;

  numberElement.textContent =
    ui.section + " · " + (lessonIndex + 1) + "/" + lessons.length;

  introElement.textContent = lessonIntro;

  /* Build lesson sections safely using textContent. */
  const fragment = document.createDocumentFragment();

  lessonSections.forEach(section => {
    const heading = document.createElement("h2");
    heading.textContent = section[0];

    const paragraph = document.createElement("p");
    paragraph.textContent = section[1];

    fragment.appendChild(heading);
    fragment.appendChild(paragraph);
  });

  contentElement.replaceChildren(fragment);

  noteElement.textContent = ui.note;

  /* Previous / next topic navigation. */
  previousButton.disabled = lessonIndex === 0;
  nextButton.disabled = lessonIndex === lessons.length - 1;

  previousButton.title =
    lessonIndex === 0 ? ui.first : "";

  nextButton.title =
    lessonIndex === lessons.length - 1 ? ui.last : "";

  function navigateToLesson(index) {
    if (index < 0 || index >= lessons.length) {
      return;
    }

    const destination = new URL(
      "namaz-detail.html",
      window.location.href
    );

    destination.searchParams.set("topic", lessons[index].id);
    destination.searchParams.set("lang", language);

    window.location.href = destination.href;
  }

  previousButton.addEventListener("click", () => {
    navigateToLesson(lessonIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    navigateToLesson(lessonIndex + 1);
  });

  /*
   * No History tracking.
   * No reading-progress storage.
   * No localStorage writes.
   */
})();
