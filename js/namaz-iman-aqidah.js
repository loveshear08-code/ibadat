"use strict";

/* =========================================================
   IBADAT — IMAN & AQIDAH
   File: js/namaz-iman-aqidah.js

   10 Main Topics
   Languages: Bengali, English, Hindi
   Theme: Parent website appSettings
   Design: Same board pattern as NAMAZ PURITY
   ========================================================= */

(() => {
  const SETTINGS_KEY = "appSettings";
  const SUPPORTED_LANGUAGES = ["bn", "en", "hi"];
  const ALLOWED_THEMES = ["classic", "royal", "rose", "pista"];

  /* =========================================================
     PAGE TEXT
     ========================================================= */

  const UI = {
    bn: {
      pageTitle: "ঈমান ও আকিদা",
      footer: "বিশুদ্ধ বিশ্বাস গড়ো, সুন্দর জীবন গড়ো।",
      remember: "মনে রাখুন",
      imageAlt: "ঈমান ও আকিদা বিষয়ক শিক্ষামূলক ছবি",
      topics: {
        basics: "মৌলিক পরিচয়",
        kalimas: "পাঁচ কালিমা",
        allah: "আল্লাহর প্রতি ঈমান",
        angels: "ফেরেশতায় বিশ্বাস",
        books: "আসমানি কিতাব",
        messengers: "রাসুলগণে বিশ্বাস",
        afterlife: "আখিরাতে বিশ্বাস",
        qadar: "তাকদিরে বিশ্বাস",
        companions: "সাহাবি ও আহলে বাইত",
        practice: "ঈমানের বাস্তব জীবন"
      }
    },

    en: {
      pageTitle: "Iman & Aqidah",
      footer: "Build sound faith and live a beautiful life.",
      remember: "Remember",
      imageAlt: "Educational illustration about faith",
      topics: {
        basics: "Basic Introduction",
        kalimas: "Five Kalimas",
        allah: "Belief in Allah",
        angels: "Belief in Angels",
        books: "Divine Books",
        messengers: "Belief in Messengers",
        afterlife: "Belief in the Hereafter",
        qadar: "Belief in Divine Decree",
        companions: "Companions and Ahl al-Bayt",
        practice: "Faith in Daily Life"
      }
    },

    hi: {
      pageTitle: "ईमान और अक़ीदा",
      footer: "सही ईमान अपनाएँ और सुंदर जीवन बनाएँ।",
      remember: "याद रखें",
      imageAlt: "ईमान से संबंधित शैक्षिक चित्र",
      topics: {
        basics: "मूल परिचय",
        kalimas: "पाँच कलिमे",
        allah: "अल्लाह पर ईमान",
        angels: "फ़रिश्तों पर ईमान",
        books: "आसमानी किताबें",
        messengers: "रसूलों पर ईमान",
        afterlife: "आख़िरत पर ईमान",
        qadar: "तक़दीर पर ईमान",
        companions: "सहाबा और अहले बैत",
        practice: "जीवन में ईमान"
      }
    }
  };

  /* =========================================================
     CONTENT HELPERS
     ========================================================= */

  const L = (bn, en, hi) => ({ bn, en, hi });

  const P = (bn, en, hi) => ({
    type: "paragraph",
    content: L(bn, en, hi)
  });

  const H = (bn, en, hi) => ({
    type: "heading",
    content: L(bn, en, hi)
  });

  const LIST = (bn, en, hi) => ({
    type: "list",
    content: L(bn, en, hi)
  });

  const AR = (arabic, bn, en, hi, reference = "") => ({
    type: "quote",
    arabic,
    translation: L(bn, en, hi),
    reference
  });

  const NOTE = (bn, en, hi) => ({
    type: "note",
    content: L(bn, en, hi)
  });

  const REF = (bn, en, hi) => ({
    type: "reference",
    content: L(bn, en, hi)
  });

  const BOARD = (title, content, extra = {}) => ({
    title,
    content,
    ...extra
  });

  /* =========================================================
     COMPLETE LESSON CONTENT
     ========================================================= */

  const LESSONS = {

    /* =====================================================
       1. BASIC INTRODUCTION
       ===================================================== */

    basics: {
      intro: L(
        "ঈমান হলো অন্তর দিয়ে আল্লাহ, তাঁর নির্দেশ এবং তাঁর পক্ষ থেকে প্রেরিত সত্যকে বিশ্বাস করা। আকিদা বলতে সেই মৌলিক বিশ্বাসগুলোকে বোঝায়, যার ওপর একজন মুসলিমের ধর্মীয় জীবন প্রতিষ্ঠিত। ঈমান শুধু মুখের কথা নয়; বিশ্বাস, স্বীকারোক্তি ও সৎকর্মের মাধ্যমে তা জীবনে প্রকাশ পায়।",
        "Iman means believing in Allah, His guidance, and the truth revealed by Him. Aqidah refers to the fundamental beliefs upon which a Muslim's religious life is built. Faith is not merely a statement; it is reflected through belief, confession, and righteous conduct.",
        "ईमान का अर्थ है अल्लाह, उसकी हिदायत और उसकी ओर से भेजे गए सत्य पर विश्वास करना। अक़ीदा उन मूल विश्वासों को कहते हैं जिन पर एक मुसलमान का धार्मिक जीवन आधारित होता है। ईमान केवल ज़ुबान का कथन नहीं, बल्कि विश्वास, स्वीकार और अच्छे कर्मों में दिखाई देता है।"
      ),

      boards: [
        BOARD(L("ঈমান কী?", "What is Iman?", "ईमान क्या है?"), [
          P(
            "ঈমানের মূল অর্থ হলো বিশ্বাস ও অন্তরের স্বীকৃতি। একজন মুসলিম বিশ্বাস করেন যে আল্লাহ এক, মুহাম্মদ (সা.) আল্লাহর রাসুল এবং আল্লাহর পক্ষ থেকে দেওয়া সব সত্য সংবাদ সত্য।",
            "Iman fundamentally means belief and inward acceptance. A Muslim believes that Allah is One, Muhammad (peace be upon him) is His Messenger, and the truths revealed by Allah are true.",
            "ईमान का मूल अर्थ विश्वास और दिल से स्वीकार करना है। मुसलमान मानता है कि अल्लाह एक है, मुहम्मद (सल्लल्लाहु अलैहि वसल्लम) उसके रसूल हैं और अल्लाह की ओर से बताई गई सभी सच्ची बातें सत्य हैं।"
          ),
          P(
            "ঈমানের সঙ্গে আল্লাহর প্রতি ভালোবাসা, তাঁর ওপর ভরসা, তাঁর আদেশ পালন এবং তাঁর নিষেধ থেকে দূরে থাকার সম্পর্ক রয়েছে।",
            "Iman is connected with love for Allah, reliance upon Him, obedience to His commands, and avoiding what He has forbidden.",
            "ईमान का संबंध अल्लाह से प्रेम, उस पर भरोसा, उसके आदेशों का पालन और उसकी मनाही से बचने से है।"
          )
        ]),

        BOARD(L("আকিদা কী?", "What is Aqidah?", "अक़ीदा क्या है?"), [
          P(
            "আকিদা হলো ইসলামের মৌলিক বিশ্বাসের সুস্পষ্ট ধারণা। যেমন—আল্লাহর একত্ব, ফেরেশতা, আসমানি কিতাব, নবী-রাসুল, পরকাল এবং তাকদিরে বিশ্বাস।",
            "Aqidah is a clear understanding of the fundamental beliefs of Islam, such as belief in Allah's Oneness, angels, divine books, prophets and messengers, the Hereafter, and divine decree.",
            "अक़ीदा इस्लाम के मूल विश्वासों की स्पष्ट समझ है, जैसे अल्लाह की एकता, फ़रिश्ते, आसमानी किताबें, नबी और रसूल, आख़िरत और तक़दीर पर विश्वास।"
          ),
          P(
            "বিশুদ্ধ আকিদা মানুষকে সঠিকভাবে আল্লাহকে চিনতে, তাঁর ইবাদত করতে এবং জীবনের উদ্দেশ্য বুঝতে সাহায্য করে।",
            "Sound aqidah helps a person know Allah correctly, worship Him, and understand the purpose of life.",
            "सही अक़ीदा इंसान को अल्लाह को सही ढंग से पहचानने, उसकी इबादत करने और जीवन का उद्देश्य समझने में मदद करता है।"
          )
        ]),

        BOARD(L("ঈমানের ছয়টি মৌলিক বিষয়", "Six Articles of Faith", "ईमान की छह मूल बातें"), [
          LIST(
            [
              "১. আল্লাহর প্রতি বিশ্বাস।",
              "২. ফেরেশতাদের প্রতি বিশ্বাস।",
              "৩. আল্লাহর নাজিল করা কিতাবগুলোর প্রতি বিশ্বাস।",
              "৪. আল্লাহর প্রেরিত নবী ও রাসুলদের প্রতি বিশ্বাস।",
              "৫. শেষ দিবস বা আখিরাতের প্রতি বিশ্বাস।",
              "৬. তাকদিরের ভালো-মন্দ আল্লাহর জ্ঞানের অধীন—এ বিশ্বাস।"
            ],
            [
              "1. Belief in Allah.",
              "2. Belief in the angels.",
              "3. Belief in the revealed books.",
              "4. Belief in the prophets and messengers.",
              "5. Belief in the Last Day and the Hereafter.",
              "6. Belief in divine decree, both its good and what is difficult for us."
            ],
            [
              "1. अल्लाह पर विश्वास।",
              "2. फ़रिश्तों पर विश्वास।",
              "3. आसमानी किताबों पर विश्वास।",
              "4. नबियों और रसूलों पर विश्वास।",
              "5. आख़िरी दिन और आख़िरत पर विश्वास।",
              "6. अच्छी और कठिन लगने वाली सभी घटनाओं के अल्लाह के ज्ञान और तक़दीर के अधीन होने पर विश्वास।"
            ]
          ),
          REF(
            "তথ্যসূত্র: সহিহ মুসলিম, হাদিসে জিবরিল; কুরআন, সূরা আল-বাকারা ২:২৮৫।",
            "References: Sahih Muslim, Hadith of Jibril; Qur'an 2:285.",
            "संदर्भ: सहीह मुस्लिम, हदीस-ए-जिब्रील; क़ुरआन 2:285।"
          )
        ]),

        BOARD(L("ঈমানের গুরুত্ব", "Importance of Faith", "ईमान का महत्व"), [
          P(
            "ঈমান মানুষের জীবনের উদ্দেশ্য নির্ধারণ করে। মানুষ বুঝতে পারে যে সে উদ্দেশ্যহীনভাবে সৃষ্টি হয়নি; বরং আল্লাহর ইবাদত ও সৎ জীবনযাপনের জন্য তাকে দায়িত্ব দেওয়া হয়েছে।",
            "Faith gives purpose to human life. It teaches that people were not created without purpose, but are responsible for worshipping Allah and living righteously.",
            "ईमान इंसान के जीवन को उद्देश्य देता है। यह समझाता है कि इंसान बिना उद्देश्य के पैदा नहीं हुआ, बल्कि अल्लाह की इबादत और नेक जीवन जीने की ज़िम्मेदारी उसे दी गई है।"
          ),
          AR(
            "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ",
            "আমি জিন ও মানুষকে কেবল আমার ইবাদতের জন্য সৃষ্টি করেছি।",
            "I did not create jinn and humans except to worship Me.",
            "मैंने जिन्न और इंसानों को केवल अपनी इबादत के लिए पैदा किया।",
            "কুরআন, সূরা আয-যারিয়াত ৫১:৫৬"
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "ঈমানের ভিত্তি হলো আল্লাহর একত্ব ও তাঁর প্রেরিত সত্যের প্রতি বিশ্বাস। এই বিশ্বাস জ্ঞান, আন্তরিকতা, ইবাদত ও সুন্দর চরিত্রের মাধ্যমে জীবনে প্রকাশ করতে হয়।",
            "The foundation of faith is belief in Allah's Oneness and the truth He revealed. This belief should be reflected through knowledge, sincerity, worship, and good character.",
            "ईमान की बुनियाद अल्लाह की एकता और उसकी ओर से भेजे गए सत्य पर विश्वास है। यह विश्वास ज्ञान, सच्चाई, इबादत और अच्छे चरित्र में दिखाई देना चाहिए।"
          )
        ])
      ]
    },

    /* =====================================================
       2. FIVE KALIMAS
       ===================================================== */

    kalimas: {
      intro: L(
        "কালিমা অর্থ বাক্য বা ঘোষণা। উপমহাদেশে মুসলিমদের প্রাথমিক ধর্মীয় শিক্ষা দেওয়ার জন্য পাঁচ কালিমা নামে কয়েকটি পরিচিত আরবি বিশ্বাসের বাক্য শেখানো হয়। এগুলোর মূল বিষয় হলো আল্লাহর একত্ব, তাঁর রাসুলের প্রতি সাক্ষ্য, আল্লাহর প্রশংসা, তাওহিদ ও ক্ষমা প্রার্থনা।",
        "Kalima means a word or declaration. In South Asian Muslim education, several well-known Arabic declarations are taught together as the Five Kalimas. Their themes include Allah's Oneness, testimony to His Messenger, praise, monotheism, and seeking forgiveness.",
        "कलिमा का अर्थ है वाक्य या घोषणा। दक्षिण एशिया की मुस्लिम शिक्षा में कुछ प्रसिद्ध अरबी विश्वास-वाक्यों को पाँच कलिमों के नाम से सिखाया जाता है। इनमें अल्लाह की एकता, उसके रसूल की गवाही, प्रशंसा, तौहीद और माफ़ी माँगना शामिल है।"
      ),

      boards: [
        BOARD(L("প্রথম কালিমা — কালিমায়ে তাইয়্যিবা", "First Kalima — Tayyibah", "पहला कलिमा — तय्यिबा"), [
          AR(
            "لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَّسُولُ اللّٰهِ",
            "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই; মুহাম্মদ (সা.) আল্লাহর রাসুল।",
            "There is no true deity except Allah; Muhammad is the Messenger of Allah.",
            "अल्लाह के सिवा कोई सच्चा पूज्य नहीं; मुहम्मद अल्लाह के रसूल हैं।"
          ),
          P(
            "এই কালিমায় আল্লাহর একত্ব এবং মুহাম্মদ (সা.)-এর রাসুল হওয়ার ঘোষণা রয়েছে। একজন মুসলিমের বিশ্বাসের কেন্দ্রীয় ভিত্তি হলো এই সাক্ষ্য।",
            "This declaration affirms Allah's Oneness and Muhammad's messengership. This testimony is central to a Muslim's faith.",
            "इस कलिमे में अल्लाह की एकता और मुहम्मद के रसूल होने की गवाही है। यह गवाही मुसलमान के ईमान का केंद्रीय आधार है।"
          )
        ]),

        BOARD(L("দ্বিতীয় কালিমা — কালিমায়ে শাহাদাত", "Second Kalima — Shahadah", "दूसरा कलिमा — शहादत"), [
          AR(
            "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
            "আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি এক, তাঁর কোনো শরিক নেই। আমি আরও সাক্ষ্য দিচ্ছি যে মুহাম্মদ (সা.) তাঁর বান্দা ও রাসুল।",
            "I bear witness that there is no true deity except Allah alone, without partner, and I bear witness that Muhammad is His servant and Messenger.",
            "मैं गवाही देता हूँ कि अल्लाह के सिवा कोई सच्चा पूज्य नहीं। वह अकेला है, उसका कोई साझी नहीं। और मैं गवाही देता हूँ कि मुहम्मद उसके बंदे और रसूल हैं।"
          ),
          P(
            "এখানে আল্লাহর একত্বের পাশাপাশি রাসুলের প্রতি সাক্ষ্য দেওয়া হয়েছে। রাসুলকে আল্লাহর বান্দা ও প্রেরিত দূত হিসেবে স্বীকার করা হয়।",
            "This declaration affirms Allah's Oneness and testifies to the Messenger, acknowledging him as Allah's servant and messenger.",
            "इसमें अल्लाह की एकता के साथ रसूल की गवाही दी गई है और उन्हें अल्लाह का बंदा तथा भेजा हुआ रसूल माना गया है।"
          )
        ]),

        BOARD(L("তৃতীয় কালিমা — কালিমায়ে তামজিদ", "Third Kalima — Tamjid", "तीसरा कलिमा — तमजीद"), [
          AR(
            "سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيمِ",
            "আল্লাহ পবিত্র, সমস্ত প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই, আল্লাহ সর্বশ্রেষ্ঠ। মহান ও সর্বোচ্চ আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।",
            "Glory be to Allah, all praise belongs to Allah, there is no true deity except Allah, Allah is the Greatest. There is no power or strength except through Allah, the Most High, the Magnificent.",
            "अल्लाह पाक है, सारी प्रशंसा अल्लाह के लिए है, अल्लाह के सिवा कोई सच्चा पूज्य नहीं, अल्लाह सबसे महान है। महान और सर्वोच्च अल्लाह की मदद के बिना कोई शक्ति और सामर्थ्य नहीं।"
          ),
          P(
            "এই বাক্যে আল্লাহর পবিত্রতা, প্রশংসা, মহত্ত্ব এবং তাঁর সাহায্যের প্রতি মানুষের নির্ভরতা প্রকাশ পায়।",
            "This declaration expresses Allah's perfection, praise, greatness, and human dependence upon His help.",
            "इस वाक्य में अल्लाह की पवित्रता, प्रशंसा, महानता और उसकी सहायता पर इंसान की निर्भरता व्यक्त होती है।"
          )
        ]),

        BOARD(L("চতুর্থ কালিমা — কালিমায়ে তাওহিদ", "Fourth Kalima — Tawhid", "चौथा कलिमा — तौहीद"), [
          AR(
            "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ أَبَدًا أَبَدًا ذُو الْجَلَالِ وَالْإِكْرَامِ بِيَدِهِ الْخَيْرُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
            "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি এক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই, সমস্ত প্রশংসাও তাঁর। তিনিই জীবন দেন ও মৃত্যু দেন। তিনি চিরঞ্জীব, কখনো মৃত্যুবরণ করবেন না। তিনি মহিমা ও সম্মানের অধিকারী। সমস্ত কল্যাণ তাঁরই হাতে এবং তিনি সবকিছুর ওপর ক্ষমতাবান।",
            "There is no true deity except Allah alone, without partner. His is the kingdom and all praise. He gives life and causes death. He is Ever-Living and never dies. He is the Lord of Majesty and Honour. All good is in His hand, and He has power over everything.",
            "अल्लाह के सिवा कोई सच्चा पूज्य नहीं। वह अकेला है, उसका कोई साझी नहीं। बादशाहत उसी की है और सारी प्रशंसा उसी के लिए है। वही जीवन देता और मृत्यु देता है। वह हमेशा जीवित है, कभी नहीं मरेगा। वह महानता और सम्मान का मालिक है। सारी भलाई उसी के हाथ में है और वह हर चीज़ पर सामर्थ्य रखता है।"
          ),
          P(
            "এই কালিমায় আল্লাহর একত্ব, রাজত্ব, জীবন ও মৃত্যুর ওপর তাঁর কর্তৃত্ব এবং সর্বশক্তিমান হওয়ার কথা ঘোষণা করা হয়েছে।",
            "This declaration affirms Allah's Oneness, sovereignty, control over life and death, and absolute power.",
            "इस कलिमे में अल्लाह की एकता, बादशाहत, जीवन और मृत्यु पर उसका अधिकार तथा उसकी पूर्ण शक्ति का वर्णन है।"
          )
        ]),

        BOARD(L("পঞ্চম কালিমা — কালিমায়ে ইস্তিগফার", "Fifth Kalima — Istighfar", "पाँचवाँ कलिमा — इस्तिग़फ़ार"), [
          AR(
            "أَسْتَغْفِرُ اللّٰهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمَدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً وَأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيمِ",
            "আমি আমার প্রতিপালক আল্লাহর কাছে আমার সব গুনাহের ক্ষমা চাই—যা জেনে বা না জেনে, ইচ্ছায় বা ভুলে, গোপনে বা প্রকাশ্যে করেছি। আমি তাঁর কাছে তওবা করছি। নিশ্চয়ই তিনি অদৃশ্যের জ্ঞানী, দোষ গোপনকারী ও গুনাহ ক্ষমাকারী। মহান ও সর্বোচ্চ আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।",
            "I seek forgiveness from Allah, my Lord, for every sin I committed knowingly or unknowingly, intentionally or by mistake, secretly or openly. I repent to Him. He knows the unseen, conceals faults, and forgives sins. There is no power or strength except through Allah, the Most High, the Magnificent.",
            "मैं अपने रब अल्लाह से अपने हर गुनाह की माफ़ी माँगता हूँ, जिसे मैंने जानकर या अनजाने में, जानबूझकर या गलती से, छिपकर या खुले में किया। मैं उसकी ओर तौबा करता हूँ। वह ग़ैब का जानने वाला, दोषों को छिपाने वाला और गुनाहों को माफ़ करने वाला है। महान और सर्वोच्च अल्लाह की मदद के बिना कोई शक्ति नहीं।"
          ),
          P(
            "ইস্তিগফার অর্থ আল্লাহর কাছে ক্ষমা চাওয়া। তওবা অর্থ গুনাহ ছেড়ে আল্লাহর দিকে ফিরে আসা। শুধু মুখে ক্ষমা চাওয়া নয়, ভুল কাজ থেকে ফিরে আসার আন্তরিক চেষ্টা জরুরি।",
            "Istighfar means asking Allah for forgiveness. Tawbah means turning back to Allah and leaving sin. Sincere repentance requires more than words; it includes a genuine effort to abandon wrongdoing.",
            "इस्तिग़फ़ार का अर्थ अल्लाह से माफ़ी माँगना है। तौबा का अर्थ गुनाह छोड़कर अल्लाह की ओर लौटना है। केवल शब्दों में माफ़ी माँगना पर्याप्त नहीं; गलत काम छोड़ने की सच्ची कोशिश भी ज़रूरी है।"
          )
        ]),

        BOARD(L("পাঁচ কালিমা সম্পর্কে গুরুত্বপূর্ণ কথা", "Important Note about the Five Kalimas", "पाँच कलिमों के बारे में महत्वपूर्ण बात"), [
          P(
            "পাঁচ কালিমা নামে প্রচলিত এই শিক্ষামূলক সংকলনটি দক্ষিণ এশিয়ার মুসলিম সমাজে পরিচিত। তবে কুরআন ও সহিহ হাদিসে এগুলোকে একসঙ্গে নির্দিষ্টভাবে 'পাঁচ কালিমা' নামে বাধ্যতামূলক তালিকা হিসেবে নির্ধারণ করা হয়নি।",
            "This educational collection known as the Five Kalimas is familiar in South Asian Muslim communities. However, the Qur'an and authentic Hadith do not prescribe them together as a compulsory list specifically titled 'the Five Kalimas'.",
            "पाँच कलिमों के नाम से प्रसिद्ध यह शिक्षात्मक संग्रह दक्षिण एशिया के मुस्लिम समाज में जाना जाता है। लेकिन क़ुरआन और सहीह हदीस में इन्हें एक साथ 'पाँच कलिमे' नाम की अनिवार्य सूची के रूप में निर्धारित नहीं किया गया है।"
          ),
          P(
            "এগুলোর অর্থ বুঝে শেখা ভালো। বিশেষ করে শাহাদাত ও তাওহিদের বিশ্বাস একজন মুসলিমের ঈমানের কেন্দ্রীয় অংশ।",
            "It is beneficial to learn these declarations with understanding. The testimony of faith and belief in Tawhid are central to a Muslim's faith.",
            "इन वाक्यों को अर्थ समझकर सीखना अच्छा है। विशेष रूप से शहादत और तौहीद का विश्वास मुसलमान के ईमान का केंद्रीय हिस्सा है।"
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "কালিমাগুলো শুধু মুখস্থ করাই যথেষ্ট নয়; এর অর্থ বুঝে বিশ্বাস করা এবং জীবনে সেই বিশ্বাসের শিক্ষা অনুসরণ করাই গুরুত্বপূর্ণ।",
            "Memorising the declarations alone is not enough. Understanding their meanings, believing in them, and living by their teachings are important.",
            "केवल कलिमे याद कर लेना पर्याप्त नहीं। उनके अर्थ को समझना, उन पर विश्वास करना और जीवन में उनकी शिक्षा अपनाना महत्वपूर्ण है।"
          )
        ])
      ]
    },

    /* =====================================================
       3. BELIEF IN ALLAH
       ===================================================== */

    allah: {
      intro: L(
        "আল্লাহ একমাত্র সৃষ্টিকর্তা, পালনকর্তা ও ইবাদতের যোগ্য। তিনি কাউকে জন্ম দেননি এবং তাঁকেও কেউ জন্ম দেয়নি। তাঁর কোনো সমকক্ষ নেই। একজন মুসলিমের ঈমানের সবচেয়ে গুরুত্বপূর্ণ ভিত্তি হলো আল্লাহর একত্বে বিশ্বাস করা এবং একমাত্র তাঁরই ইবাদত করা।",
        "Allah alone is the Creator, Sustainer, and One worthy of worship. He neither begets nor is born, and none is comparable to Him. The most important foundation of a Muslim's faith is belief in Allah's Oneness and worshipping Him alone.",
        "अल्लाह ही एकमात्र पैदा करने वाला, पालनहार और इबादत के योग्य है। न उसने किसी को जन्म दिया और न वह किसी से पैदा हुआ। उसके समान कोई नहीं। मुसलमान के ईमान की सबसे महत्वपूर्ण बुनियाद अल्लाह की एकता पर विश्वास और केवल उसी की इबादत करना है।"
      ),

      boards: [
        BOARD(L("আল্লাহ এক ও অদ্বিতীয়", "Allah Is One", "अल्लाह एक और अद्वितीय है"), [
          AR(
            "قُلْ هُوَ اللّٰهُ أَحَدٌ ۝ اللّٰهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
            "বলুন, তিনি আল্লাহ, এক। আল্লাহ অমুখাপেক্ষী। তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি। আর তাঁর সমতুল্য কেউ নেই।",
            "Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there anything comparable to Him.",
            "कहिए: वह अल्लाह एक है। अल्लाह सबका बेनियाज़ है। न उसने किसी को जन्म दिया और न वह किसी से पैदा हुआ। और कोई उसके समान नहीं।",
            "কুরআন, সূরা আল-ইখলাস ১১২:১–৪"
          )
        ]),

        BOARD(L("আল্লাহই সৃষ্টিকর্তা", "Allah Is the Creator", "अल्लाह ही सृष्टिकर्ता है"), [
          P(
            "আকাশ, পৃথিবী, মানুষ, জীবজন্তু, গাছপালা এবং দৃশ্যমান-অদৃশ্যমান সবকিছুর সৃষ্টিকর্তা আল্লাহ। সব সৃষ্টি তাঁর ওপর নির্ভরশীল, কিন্তু তিনি কারও ওপর নির্ভরশীল নন।",
            "Allah created the heavens, the earth, human beings, animals, plants, and everything visible and invisible. All creation depends upon Him, while He depends on no one.",
            "आसमान, ज़मीन, इंसान, जानवर, पेड़-पौधे और दिखाई देने वाली तथा न दिखाई देने वाली हर चीज़ का सृष्टिकर्ता अल्लाह है। सारी सृष्टि उस पर निर्भर है, लेकिन वह किसी पर निर्भर नहीं।"
          )
        ]),

        BOARD(L("আল্লাহর সুন্দর নাম ও গুণাবলি", "Allah's Beautiful Names and Attributes", "अल्लाह के सुंदर नाम और गुण"), [
          P(
            "আল্লাহর অনেক সুন্দর নাম রয়েছে। এসব নামের মাধ্যমে তাঁর দয়া, ক্ষমা, জ্ঞান, প্রজ্ঞা, ক্ষমতা ও কর্তৃত্ব সম্পর্কে জানা যায়।",
            "Allah has many beautiful names. Through these names, we learn about His mercy, forgiveness, knowledge, wisdom, power, and authority.",
            "अल्लाह के अनेक सुंदर नाम हैं। इन नामों से उसकी दया, क्षमा, ज्ञान, बुद्धिमत्ता, शक्ति और अधिकार के बारे में जानकारी मिलती है।"
          ),
          LIST(
            [
              "আর-রহমান — পরম দয়ালু।",
              "আর-রহিম — অতি মেহেরবান।",
              "আল-আলিম — সর্বজ্ঞ।",
              "আল-গাফুর — অতিশয় ক্ষমাশীল।",
              "আস-সামি — সর্বশ্রোতা।",
              "আল-বাসির — সর্বদ্রষ্টা।"
            ],
            [
              "Ar-Rahman — The Most Merciful.",
              "Ar-Rahim — The Especially Merciful.",
              "Al-Alim — The All-Knowing.",
              "Al-Ghafur — The Most Forgiving.",
              "As-Sami — The All-Hearing.",
              "Al-Basir — The All-Seeing."
            ],
            [
              "अर-रहमान — अत्यंत दयावान।",
              "अर-रहीम — बहुत मेहरबान।",
              "अल-अलीम — सब कुछ जानने वाला।",
              "अल-ग़फ़ूर — बहुत क्षमा करने वाला।",
              "अस-समी — सब कुछ सुनने वाला।",
              "अल-बसीर — सब कुछ देखने वाला।"
            ]
          )
        ]),

        BOARD(L("তাওহিদ কী?", "What Is Tawhid?", "तौहीद क्या है?"), [
          P(
            "তাওহিদ হলো আল্লাহকে এক ও অদ্বিতীয় হিসেবে বিশ্বাস করা এবং ইবাদতের সব অধিকার একমাত্র তাঁকেই দেওয়া। দোয়া, সাহায্য প্রার্থনা, ভরসা, মানত ও ইবাদতের ক্ষেত্রে আল্লাহর প্রতি একনিষ্ঠ থাকা তাওহিদের শিক্ষা।",
            "Tawhid means believing that Allah is One and unique and that He alone deserves worship. It teaches sincerity towards Allah in supplication, reliance, vows, and all acts of worship.",
            "तौहीद का अर्थ है अल्लाह को एक और अद्वितीय मानना तथा इबादत का अधिकार केवल उसी को देना। दुआ, भरोसा, मन्नत और इबादत में केवल अल्लाह के प्रति निष्ठावान रहना तौहीद की शिक्षा है।"
          )
        ]),

        BOARD(L("শিরক থেকে বেঁচে থাকা", "Avoiding Shirk", "शिर्क से बचना"), [
          P(
            "শিরক হলো আল্লাহর সঙ্গে কাউকে ইবাদত বা তাঁর বিশেষ অধিকারে অংশীদার করা। ইসলামে শিরক অত্যন্ত গুরুতর পাপ। তাই ইবাদত ও বিশ্বাসে আল্লাহর একত্ব অক্ষুণ্ণ রাখতে হবে।",
            "Shirk means associating partners with Allah in worship or in what belongs uniquely to Him. Islam treats shirk as an extremely serious sin. A believer must preserve the Oneness of Allah in belief and worship.",
            "शिर्क का अर्थ है इबादत या अल्लाह के विशेष अधिकारों में किसी को उसका साझी बनाना। इस्लाम में शिर्क बहुत गंभीर पाप है। इसलिए विश्वास और इबादत में अल्लाह की एकता बनाए रखनी चाहिए।"
          ),
          REF(
            "তথ্যসূত্র: কুরআন, সূরা আন-নিসা ৪:৪৮; সূরা আল-ইখলাস ১১২।",
            "References: Qur'an 4:48; Surah Al-Ikhlas 112.",
            "संदर्भ: क़ुरआन 4:48; सूरह अल-इख़लास 112।"
          )
        ]),

        BOARD(L("আল্লাহর ওপর ভরসা", "Trust in Allah", "अल्लाह पर भरोसा"), [
          P(
            "আল্লাহর ওপর ভরসা মানে নিজের সাধ্য অনুযায়ী সঠিক চেষ্টা করা এবং ফলাফলের জন্য আল্লাহর ওপর নির্ভর করা। চেষ্টা ছেড়ে দিয়ে বসে থাকা ভরসার সঠিক অর্থ নয়।",
            "Trusting Allah means making proper effort within one's ability and relying upon Him for the outcome. It does not mean abandoning effort and doing nothing.",
            "अल्लाह पर भरोसा करने का अर्थ है अपनी क्षमता के अनुसार सही कोशिश करना और परिणाम के लिए उस पर निर्भर रहना। कोशिश छोड़कर बैठ जाना भरोसे का सही अर्थ नहीं है।"
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "আল্লাহ এক, তাঁর কোনো শরিক নেই। তিনিই সৃষ্টিকর্তা, পালনকর্তা ও একমাত্র ইবাদতের যোগ্য। তাঁর ওপর ভরসা রাখুন, তাঁর কাছে সাহায্য চান এবং তাঁর নির্দেশ অনুযায়ী জীবন গড়ুন।",
            "Allah is One and has no partner. He alone is the Creator, Sustainer, and One worthy of worship. Trust Him, seek His help, and live according to His guidance.",
            "अल्लाह एक है और उसका कोई साझी नहीं। वही सृष्टिकर्ता, पालनहार और इबादत के योग्य है। उसी पर भरोसा करें, उसी से मदद माँगें और उसकी हिदायत के अनुसार जीवन बिताएँ।"
          )
        ])
      ]
    },

    /* =====================================================
       4. ANGELS
       ===================================================== */

    angels: {
      intro: L(
        "ফেরেশতারা আল্লাহর সৃষ্টি। তাঁরা আল্লাহর নির্দেশ অমান্য করেন না এবং তাঁকে দেওয়া দায়িত্ব পালন করেন। তাঁরা সাধারণ মানুষের মতো স্বাধীনভাবে পাপাচার করেন না। ফেরেশতাদের প্রতি বিশ্বাস ঈমানের ছয়টি মৌলিক বিষয়ের একটি।",
        "Angels are created by Allah. They do not disobey Him and carry out the duties assigned to them. Belief in angels is one of the six fundamental articles of faith.",
        "फ़रिश्ते अल्लाह की बनाई हुई मख़लूक़ हैं। वे अल्लाह की अवज्ञा नहीं करते और उन्हें दिए गए काम पूरे करते हैं। फ़रिश्तों पर ईमान ईमान की छह मूल बातों में से एक है।"
      ),

      boards: [
        BOARD(L("ফেরেশতাদের পরিচয়", "Who Are the Angels?", "फ़रिश्ते कौन हैं?"), [
          P(
            "ফেরেশতারা অদৃশ্য জগতের সৃষ্টি। আল্লাহ তাঁদের নূর থেকে সৃষ্টি করেছেন। তাঁরা আল্লাহর আদেশ পালন করেন এবং নির্ধারিত দায়িত্ব যথাযথভাবে সম্পন্ন করেন।",
            "Angels belong to the unseen creation. Allah created them from light. They obey His commands and fulfil their assigned responsibilities.",
            "फ़रिश्ते ग़ैब की मख़लूक़ हैं। अल्लाह ने उन्हें नूर से पैदा किया। वे उसके आदेशों का पालन करते और अपने निर्धारित काम पूरे करते हैं।"
          ),
          AR(
            "لَا يَعْصُونَ اللّٰهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ",
            "আল্লাহ তাদের যে নির্দেশ দেন, তারা তা অমান্য করে না এবং যা আদেশ করা হয় তাই করে।",
            "They do not disobey Allah in what He commands them, but do what they are commanded.",
            "अल्लाह उन्हें जो आदेश देता है, वे उसकी अवज्ञा नहीं करते और वही करते हैं जिसका उन्हें आदेश दिया जाता है।",
            "কুরআন, সূরা আত-তাহরিম ৬৬:৬"
          )
        ]),

        BOARD(L("পরিচিত কয়েকজন ফেরেশতা", "Some Well-Known Angels", "कुछ प्रसिद्ध फ़रिश्ते"), [
          LIST(
            [
              "জিবরিল (আ.) — আল্লাহর ওহি নবী-রাসুলদের কাছে পৌঁছে দিতেন।",
              "মিকাইল (আ.) — বৃষ্টি ও জীবিকার ব্যবস্থার সঙ্গে সংশ্লিষ্ট দায়িত্বে নিয়োজিত।",
              "ইসরাফিল (আ.) — শিঙ্গায় ফুঁ দেওয়ার দায়িত্বপ্রাপ্ত।",
              "মালাকুল মাউত — আল্লাহর আদেশে প্রাণ গ্রহণ করেন।"
            ],
            [
              "Jibril — delivered revelation to the prophets and messengers.",
              "Mikail — assigned responsibilities related to rain and provision.",
              "Israfil — entrusted with blowing the Trumpet.",
              "Angel of Death — takes souls by Allah's command."
            ],
            [
              "जिब्रील — नबियों और रसूलों तक वह़्य पहुँचाते थे।",
              "मीकाईल — बारिश और रोज़ी से संबंधित ज़िम्मेदारियों पर नियुक्त हैं।",
              "इस्राफ़ील — सूर फूँकने की ज़िम्मेदारी दी गई है।",
              "मौत का फ़रिश्ता — अल्लाह के आदेश से जान निकालता है।"
            ]
          ),
          NOTE(
            "এই দায়িত্বগুলো সম্পর্কে কুরআন ও নির্ভরযোগ্য হাদিসে যে তথ্য এসেছে, সেটুকুই বিশ্বাস করতে হবে। অপ্রমাণিত কাহিনি বা অতিরিক্ত বিবরণকে নিশ্চিত ধর্মীয় তথ্য মনে করা ঠিক নয়।",
            "Beliefs about these responsibilities should be based on the Qur'an and reliable Hadith. Unverified stories or additional details should not be treated as established religious facts.",
            "इन ज़िम्मेदारियों के बारे में वही जानकारी माननी चाहिए जो क़ुरआन और विश्वसनीय हदीस में आई है। अप्रमाणित कहानियों को निश्चित धार्मिक तथ्य नहीं मानना चाहिए।"
          )
        ]),

        BOARD(L("ফেরেশতাদের কাজ", "Duties of Angels", "फ़रिश्तों के काम"), [
          LIST(
            [
              "আল্লাহর ওহি পৌঁছে দেওয়া।",
              "মানুষের আমল লিপিবদ্ধ করা।",
              "আল্লাহর আদেশে বিভিন্ন দায়িত্ব পালন করা।",
              "আল্লাহর ইবাদত ও প্রশংসা করা।",
              "আখিরাতের নির্ধারিত দায়িত্ব পালন করা।"
            ],
            [
              "Delivering revelation.",
              "Recording human deeds.",
              "Carrying out duties by Allah's command.",
              "Worshipping and glorifying Allah.",
              "Fulfilling assigned responsibilities related to the Hereafter."
            ],
            [
              "वह़्य पहुँचाना।",
              "इंसानों के कर्म लिखना।",
              "अल्लाह के आदेश से विभिन्न काम करना।",
              "अल्लाह की इबादत और प्रशंसा करना।",
              "आख़िरत से संबंधित निर्धारित ज़िम्मेदारियाँ निभाना।"
            ]
          )
        ]),

        BOARD(L("ফেরেশতাদের প্রতি বিশ্বাসের শিক্ষা", "Lessons from Belief in Angels", "फ़रिश्तों पर ईमान की शिक्षा"), [
          P(
            "মানুষের কাজ লিপিবদ্ধ হয়—এই বিশ্বাস তাকে সতর্ক ও দায়িত্বশীল করে। সে বুঝতে পারে যে তার প্রতিটি কথা ও কাজের হিসাব আল্লাহর কাছে রয়েছে।",
            "Belief that deeds are recorded encourages responsibility and caution. A person understands that every word and action is known to Allah.",
            "कर्म लिखे जाते हैं—यह विश्वास इंसान को सावधान और ज़िम्मेदार बनाता है। वह समझता है कि उसका हर शब्द और काम अल्लाह के ज्ञान में है।"
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "ফেরেশতারা আল্লাহর সৃষ্টি ও অনুগত বান্দা। তাঁদের প্রতি বিশ্বাস রাখতে হবে, কিন্তু তাঁদের ইবাদত করা যাবে না। ইবাদত একমাত্র আল্লাহর জন্য।",
            "Angels are created by Allah and are obedient to Him. We believe in them, but do not worship them. Worship belongs to Allah alone.",
            "फ़रिश्ते अल्लाह की मख़लूक़ और उसके आज्ञाकारी बंदे हैं। उन पर विश्वास करना है, लेकिन उनकी इबादत नहीं करनी। इबादत केवल अल्लाह के लिए है।"
          )
        ])
      ]
    },

    /* =====================================================
       5. DIVINE BOOKS
       ===================================================== */

    books: {
      intro: L(
        "আল্লাহ মানুষকে সঠিক পথ দেখানোর জন্য তাঁর নবী-রাসুলদের কাছে কিতাব ও বাণী পাঠিয়েছেন। এসব আসমানি কিতাবের প্রতি বিশ্বাস ঈমানের একটি মৌলিক অংশ। মুসলিমরা বিশ্বাস করেন যে আল্লাহর পক্ষ থেকে নাজিল হওয়া সব মূল ওহি সত্য ছিল এবং কুরআন সর্বশেষ নাজিলকৃত আসমানি কিতাব।",
        "Allah sent scriptures and revelations through His prophets and messengers to guide humanity. Belief in the revealed books is a fundamental part of faith. Muslims believe that the original revelations from Allah were true and that the Qur'an is the final revealed scripture.",
        "अल्लाह ने इंसानों को सही रास्ता दिखाने के लिए अपने नबियों और रसूलों पर किताबें और संदेश भेजे। आसमानी किताबों पर विश्वास ईमान का एक मूल हिस्सा है। मुसलमान मानते हैं कि अल्लाह की ओर से भेजी गई मूल वह़्य सत्य थी और क़ुरआन अंतिम आसमानी किताब है।"
      ),

      boards: [
        BOARD(L("আসমানি কিতাব কী?", "What Are Divine Books?", "आसमानी किताबें क्या हैं?"), [
          P(
            "আসমানি কিতাব হলো আল্লাহর পক্ষ থেকে নবী-রাসুলদের কাছে পাঠানো ওহি ও নির্দেশনা। এগুলোর উদ্দেশ্য ছিল মানুষকে এক আল্লাহর ইবাদত, ন্যায়, সত্য ও সৎ জীবনযাপনের পথে পরিচালিত করা।",
            "Divine books are revelations and guidance sent by Allah to His prophets and messengers. Their purpose was to guide people towards worshipping One God, justice, truth, and righteous living.",
            "आसमानी किताबें अल्लाह की ओर से नबियों और रसूलों पर भेजी गई वह़्य और हिदायत हैं। इनका उद्देश्य लोगों को एक अल्लाह की इबादत, न्याय, सत्य और नेक जीवन की ओर मार्गदर्शन देना था।"
          )
        ]),

        BOARD(L("পরিচিত আসমানি কিতাব", "Well-Known Divine Scriptures", "प्रसिद्ध आसमानी किताबें"), [
          LIST(
            [
              "তাওরাত — মুসা (আ.)-এর ওপর নাজিল হয়েছিল।",
              "যাবুর — দাউদ (আ.)-এর ওপর নাজিল হয়েছিল।",
              "ইনজিল — ঈসা (আ.)-এর ওপর নাজিল হয়েছিল।",
              "কুরআন — মুহাম্মদ (সা.)-এর ওপর নাজিল হয়েছে।"
            ],
            [
              "Tawrat — revealed to Musa (Moses).",
              "Zabur — revealed to Dawud (David).",
              "Injil — revealed to Isa (Jesus).",
              "Qur'an — revealed to Muhammad."
            ],
            [
              "तौरात — मूसा (अलैहिस्सलाम) पर उतारी गई।",
              "ज़बूर — दाऊद (अलैहिस्सलाम) पर उतारी गई।",
              "इंजील — ईसा (अलैहिस्सलाम) पर उतारी गई।",
              "क़ुरआन — मुहम्मद (सल्लल्लाहु अलैहि वसल्लम) पर उतारा गया।"
            ]
          ),
          REF(
            "তথ্যসূত্র: কুরআন, সূরা আল-মায়িদা ৫:৪৪–৪৬; সূরা আল-ইসরা ১৭:৫৫।",
            "References: Qur'an 5:44–46; Qur'an 17:55.",
            "संदर्भ: क़ुरआन 5:44–46; क़ुरआन 17:55।"
          )
        ]),

        BOARD(L("কুরআনের পরিচয়", "Introduction to the Qur'an", "क़ुरआन का परिचय"), [
          P(
            "কুরআন হলো আল্লাহর শেষ আসমানি কিতাব, যা ফেরেশতা জিবরিল (আ.)-এর মাধ্যমে মুহাম্মদ (সা.)-এর ওপর নাজিল হয়েছে। এটি সমগ্র মানবজাতির জন্য পথনির্দেশ।",
            "The Qur'an is the final revealed scripture from Allah, sent to Muhammad through the Angel Jibril. It is guidance for all humanity.",
            "क़ुरआन अल्लाह की अंतिम आसमानी किताब है, जिसे फ़रिश्ते जिब्रील के माध्यम से मुहम्मद पर उतारा गया। यह पूरी मानवता के लिए मार्गदर्शन है।"
          ),
          AR(
            "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
            "নিশ্চয়ই আমিই এই উপদেশগ্রন্থ নাজিল করেছি এবং আমিই এর সংরক্ষক।",
            "Indeed, We sent down the Reminder, and indeed, We will preserve it.",
            "निश्चय ही हमने ही यह उपदेश उतारा है और हम ही इसकी रक्षा करेंगे।",
            "কুরআন, সূরা আল-হিজর ১৫:৯"
          )
        ]),

        BOARD(L("কুরআনের প্রতি আমাদের দায়িত্ব", "Our Responsibilities Towards the Qur'an", "क़ुरआन के प्रति हमारी ज़िम्मेदारी"), [
          LIST(
            [
              "বিশুদ্ধভাবে কুরআন পড়া শেখা।",
              "আরবি শব্দের সঠিক উচ্চারণের চেষ্টা করা।",
              "অর্থ ও ব্যাখ্যা বোঝার চেষ্টা করা।",
              "কুরআনের নির্দেশ অনুযায়ী জীবন পরিচালনা করা।",
              "কুরআনকে সম্মান ও মর্যাদা দেওয়া।"
            ],
            [
              "Learn to recite the Qur'an correctly.",
              "Try to pronounce Arabic words accurately.",
              "Study its meaning and explanation.",
              "Live according to its guidance.",
              "Treat the Qur'an with respect."
            ],
            [
              "क़ुरआन सही ढंग से पढ़ना सीखें।",
              "अरबी शब्दों का सही उच्चारण करने की कोशिश करें।",
              "उसका अर्थ और व्याख्या समझें।",
              "क़ुरआन की हिदायत के अनुसार जीवन बिताएँ।",
              "क़ुरआन का सम्मान करें।"
            ]
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "সব আসমানি কিতাবের মূল উৎস আল্লাহর ওহি। কুরআন সর্বশেষ কিতাব এবং মুসলিমদের জন্য পূর্ণাঙ্গ পথনির্দেশ। তাই কুরআন পড়া, বোঝা ও আমল করা অত্যন্ত গুরুত্বপূর্ণ।",
            "All divine scriptures originated from Allah's revelation. The Qur'an is the final scripture and complete guidance for Muslims. Reciting, understanding, and following it are essential.",
            "सभी आसमानी किताबों का मूल स्रोत अल्लाह की वह़्य है। क़ुरआन अंतिम किताब और मुसलमानों के लिए संपूर्ण मार्गदर्शन है। इसलिए इसे पढ़ना, समझना और अमल करना बहुत महत्वपूर्ण है।"
          )
        ])
      ]
    },

    /* =====================================================
       6. PROPHETS AND MESSENGERS
       ===================================================== */

    messengers: {
      intro: L(
        "আল্লাহ মানুষকে সঠিক পথ দেখানোর জন্য বিভিন্ন সময়ে নবী ও রাসুল পাঠিয়েছেন। তাঁরা মানুষকে এক আল্লাহর ইবাদত, ন্যায়বিচার, সত্যবাদিতা ও সৎ জীবনযাপনের শিক্ষা দিয়েছেন। মুহাম্মদ (সা.) আল্লাহর সর্বশেষ নবী ও রাসুল।",
        "Allah sent prophets and messengers throughout history to guide humanity. They taught people to worship One God, uphold justice, speak the truth, and live righteously. Muhammad is the final Prophet and Messenger.",
        "अल्लाह ने मानवता को मार्गदर्शन देने के लिए अलग-अलग समय में नबी और रसूल भेजे। उन्होंने एक अल्लाह की इबादत, न्याय, सच्चाई और नेक जीवन की शिक्षा दी। मुहम्मद अल्लाह के अंतिम नबी और रसूल हैं।"
      ),

      boards: [
        BOARD(L("নবী ও রাসুল কারা?", "Who Are Prophets and Messengers?", "नबी और रसूल कौन हैं?"), [
          P(
            "নবী ও রাসুল হলেন আল্লাহর মনোনীত মানুষ, যাঁদের কাছে তিনি ওহি পাঠিয়েছেন। তাঁরা মানুষকে আল্লাহর পরিচয় দিয়েছেন, তাঁর নির্দেশ পৌঁছে দিয়েছেন এবং সঠিক পথে চলার শিক্ষা দিয়েছেন।",
            "Prophets and messengers are people chosen by Allah, to whom He sent revelation. They taught people about Allah, conveyed His commands, and guided them towards the right path.",
            "नबी और रसूल अल्लाह के चुने हुए इंसान हैं, जिन पर उसने वह़्य भेजी। उन्होंने लोगों को अल्लाह का परिचय दिया, उसके आदेश पहुँचाए और सही रास्ते की शिक्षा दी।"
          )
        ]),

        BOARD(L("পরিচিত কয়েকজন নবী", "Some Well-Known Prophets", "कुछ प्रसिद्ध नबी"), [
          LIST(
            [
              "আদম (আ.)",
              "নুহ (আ.)",
              "ইবরাহিম (আ.)",
              "ইসমাইল (আ.)",
              "ইসহাক (আ.)",
              "ইয়াকুব (আ.)",
              "ইউসুফ (আ.)",
              "মুসা (আ.)",
              "হারুন (আ.)",
              "দাউদ (আ.)",
              "সুলাইমান (আ.)",
              "ইউনুস (আ.)",
              "ইয়াহইয়া (আ.)",
              "ঈসা (আ.)",
              "মুহাম্মদ (সা.)"
            ],
            [
              "Adam, Nuh, Ibrahim, Ismail, Ishaq, Yaqub, Yusuf, Musa, Harun, Dawud, Sulayman, Yunus, Yahya, Isa, and Muhammad (peace be upon them all)."
            ],
            [
              "आदम, नूह, इब्राहीम, इस्माईल, इसहाक़, याक़ूब, यूसुफ़, मूसा, हारून, दाऊद, सुलैमान, यूनुस, यहया, ईसा और मुहम्मद (सभी पर शांति हो)।"
            ]
          ),
          NOTE(
            "কুরআনে অনেক নবীর নাম উল্লেখ করা হয়েছে। সব নবীর নাম আমাদের জানা নেই। তাই কুরআন ও নির্ভরযোগ্য শিক্ষায় যাঁদের কথা এসেছে তাঁদের প্রতি বিশ্বাস রাখতে হবে এবং অজানা নবীদের অস্তিত্বও অস্বীকার করা যাবে না।",
            "The Qur'an mentions many prophets, but not all prophets' names are known to us. We believe in those named in revelation and do not deny the existence of others.",
            "क़ुरआन में कई नबियों के नाम आए हैं, लेकिन सभी नबियों के नाम हमें मालूम नहीं। जिनका उल्लेख वह़्य में है उन पर विश्वास करें और दूसरे नबियों के अस्तित्व से इनकार न करें।"
          )
        ]),

        BOARD(L("নবী-রাসুলদের মূল শিক্ষা", "The Central Message of the Prophets", "नबियों की मूल शिक्षा"), [
          AR(
            "وَلَقَدْ بَعَثْنَا فِي كُلِّ أُمَّةٍ رَّسُولًا أَنِ اعْبُدُوا اللّٰهَ وَاجْتَنِبُوا الطَّاغُوتَ",
            "আমি প্রত্যেক জাতির মধ্যে রাসুল পাঠিয়েছি এই নির্দেশ দিয়ে যে, তোমরা আল্লাহর ইবাদত করো এবং মিথ্যা উপাস্য থেকে দূরে থাকো।",
            "We sent a messenger to every community, saying: Worship Allah and avoid false objects of worship.",
            "हमने हर समुदाय में एक रसूल भेजा कि अल्लाह की इबादत करो और झूठे पूज्यों से बचो।",
            "কুরআন, সূরা আন-নাহল ১৬:৩৬"
          ),
          P(
            "সব নবী মানুষকে আল্লাহর একত্ব, সৎকর্ম, ন্যায়বিচার, পবিত্রতা ও পরকালের জবাবদিহির শিক্ষা দিয়েছেন।",
            "All prophets taught the Oneness of Allah, righteous deeds, justice, purity, and accountability in the Hereafter.",
            "सभी नबियों ने अल्लाह की एकता, नेक कर्म, न्याय, पवित्रता और आख़िरत में जवाबदेही की शिक्षा दी।"
          )
        ]),

        BOARD(L("মুহাম্মদ (সা.) সর্বশেষ নবী", "Muhammad Is the Final Prophet", "मुहम्मद अंतिम नबी हैं"), [
          P(
            "মুহাম্মদ (সা.) আল্লাহর শেষ নবী ও রাসুল। তাঁর পরে আর কোনো নবী আসবেন না। তিনি সমগ্র মানবজাতির জন্য আল্লাহর পক্ষ থেকে প্রেরিত রাসুল।",
            "Muhammad is the final Prophet and Messenger of Allah. No prophet will come after him. He was sent as a messenger for all humanity.",
            "मुहम्मद अल्लाह के अंतिम नबी और रसूल हैं। उनके बाद कोई नबी नहीं आएगा। उन्हें पूरी मानवता के लिए रसूल बनाकर भेजा गया।"
          ),
          AR(
            "مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللّٰهِ وَخَاتَمَ النَّبِيِّينَ",
            "মুহাম্মদ তোমাদের পুরুষদের কারও পিতা নন; বরং তিনি আল্লাহর রাসুল এবং সর্বশেষ নবী।",
            "Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the Prophets.",
            "मुहम्मद तुम्हारे पुरुषों में से किसी के पिता नहीं, बल्कि अल्लाह के रसूल और अंतिम नबी हैं।",
            "কুরআন, সূরা আল-আহযাব ৩৩:৪০"
          )
        ]),

        BOARD(L("রাসুলের প্রতি আমাদের দায়িত্ব", "Our Responsibilities Towards the Messenger", "रसूल के प्रति हमारी ज़िम्मेदारी"), [
          LIST(
            [
              "তাঁর প্রতি আন্তরিক ভালোবাসা রাখা।",
              "তাঁর প্রতি দরুদ ও সালাম পাঠ করা।",
              "তাঁর শিক্ষা ও আদর্শ জানার চেষ্টা করা।",
              "তাঁর সুন্নাহ অনুসরণ করা।",
              "তাঁর নামে মিথ্যা কথা প্রচার না করা।"
            ],
            [
              "Love him sincerely.",
              "Send blessings and peace upon him.",
              "Learn his teachings and example.",
              "Follow his Sunnah.",
              "Do not attribute false statements to him."
            ],
            [
              "उनसे सच्चा प्रेम रखें।",
              "उन पर दरूद और सलाम भेजें।",
              "उनकी शिक्षा और आदर्श जानें।",
              "उनकी सुन्नत का पालन करें।",
              "उनके नाम से झूठी बातें न फैलाएँ।"
            ]
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "সব নবী-রাসুল আল্লাহর মনোনীত বান্দা। তাঁদের সবাইকে সম্মান ও বিশ্বাস করতে হবে। মুহাম্মদ (সা.) সর্বশেষ নবী; তাঁর দেখানো পথ অনুসরণ করা মুসলিমের কর্তব্য।",
            "All prophets and messengers were chosen servants of Allah and must be respected and believed in. Muhammad is the final Prophet, and Muslims should follow his guidance.",
            "सभी नबी और रसूल अल्लाह के चुने हुए बंदे थे और उन सभी पर विश्वास तथा सम्मान करना चाहिए। मुहम्मद अंतिम नबी हैं और मुसलमानों को उनकी हिदायत पर चलना चाहिए।"
          )
        ])
      ]
    },

    /* =====================================================
       7. HEREAFTER
       ===================================================== */

    afterlife: {
      intro: L(
        "আখিরাত হলো মৃত্যুর পরের চিরস্থায়ী জীবন। ইসলামে বিশ্বাস করা হয় যে একদিন পৃথিবীর জীবন শেষ হবে, সবাইকে পুনরুত্থিত করা হবে এবং আল্লাহর সামনে নিজের কাজের হিসাব দিতে হবে। জান্নাত ও জাহান্নাম আখিরাতের বাস্তব বিষয়।",
        "The Hereafter is the everlasting life after death. Islam teaches that worldly life will end, all people will be resurrected, and everyone will answer to Allah for their deeds. Paradise and Hell are realities of the Hereafter.",
        "आख़िरत मृत्यु के बाद का हमेशा रहने वाला जीवन है। इस्लाम सिखाता है कि एक दिन दुनिया का जीवन समाप्त होगा, सभी को दोबारा उठाया जाएगा और हर व्यक्ति को अपने कर्मों का हिसाब देना होगा। जन्नत और जहन्नम आख़िरत की वास्तविकताएँ हैं।"
      ),

      boards: [
        BOARD(L("মৃত্যু ও কবরের জীবন", "Death and the Life of the Grave", "मृत्यु और क़ब्र का जीवन"), [
          P(
            "প্রত্যেক প্রাণীকে মৃত্যুর স্বাদ গ্রহণ করতে হবে। মৃত্যুর পর মানুষ বারযাখের জীবনে প্রবেশ করে। কবরের জীবন অদৃশ্য জগতের বিষয়; এ সম্পর্কে কুরআন ও নির্ভরযোগ্য হাদিসে যতটুকু এসেছে, ততটুকুই বিশ্বাস করতে হবে।",
            "Every soul will experience death. After death, people enter the life of Barzakh. The life of the grave belongs to the unseen, and we should believe in what is established in the Qur'an and reliable Hadith.",
            "हर जीव को मृत्यु का स्वाद चखना है। मृत्यु के बाद इंसान बरज़ख़ के जीवन में प्रवेश करता है। क़ब्र का जीवन ग़ैब की बात है; इसके बारे में क़ुरआन और विश्वसनीय हदीस में जितना बताया गया है, उतना ही मानना चाहिए।"
          ),
          AR(
            "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ",
            "প্রত্যেক প্রাণী মৃত্যুর স্বাদ গ্রহণ করবে।",
            "Every soul will taste death.",
            "हर जीव मृत्यु का स्वाद चखेगा।",
            "কুরআন, সূরা আলে ইমরান ৩:১৮৫"
          )
        ]),

        BOARD(L("কিয়ামত ও পুনরুত্থান", "The Day of Resurrection", "क़ियामत और पुनरुत्थान"), [
          P(
            "আল্লাহর নির্ধারিত সময়ে পৃথিবীর বর্তমান ব্যবস্থা শেষ হবে। এরপর মানুষকে পুনরুত্থিত করা হবে। সবাই আল্লাহর সামনে উপস্থিত হবে এবং দুনিয়ার জীবনের কাজের হিসাব দেবে।",
            "At the time appointed by Allah, the present world order will end. People will then be resurrected, stand before Allah, and answer for their worldly deeds.",
            "अल्लाह के निर्धारित समय पर दुनिया की वर्तमान व्यवस्था समाप्त होगी। फिर इंसानों को दोबारा उठाया जाएगा, वे अल्लाह के सामने उपस्थित होंगे और अपने सांसारिक कर्मों का हिसाब देंगे।"
          )
        ]),

        BOARD(L("হিসাব ও আমলনামা", "Judgement and Record of Deeds", "हिसाब और कर्मों का लेखा"), [
          P(
            "মানুষের কাজের হিসাব নেওয়া হবে। তার ভালো ও মন্দ কাজ প্রকাশিত হবে। আল্লাহ কারও প্রতি অন্যায় করেন না। মানুষের কাজ, নিয়ত ও দায়িত্ব সম্পর্কে তিনি সম্পূর্ণ অবগত।",
            "People will be judged for their deeds. Their good and bad actions will be made known. Allah does not wrong anyone and knows every person's actions, intentions, and responsibilities.",
            "लोगों के कर्मों का हिसाब लिया जाएगा। उनके अच्छे और बुरे काम सामने आएँगे। अल्लाह किसी पर अन्याय नहीं करता और हर व्यक्ति के काम, नियत और ज़िम्मेदारियों को जानता है।"
          ),
          AR(
            "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ",
            "কেউ অণু পরিমাণ ভালো কাজ করলে তা দেখতে পাবে এবং কেউ অণু পরিমাণ মন্দ কাজ করলে তাও দেখতে পাবে।",
            "Whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it.",
            "जिसने कण भर भी भलाई की होगी, वह उसे देखेगा; और जिसने कण भर भी बुराई की होगी, वह भी उसे देखेगा।",
            "কুরআন, সূরা আয-যিলযাল ৯৯:৭–৮"
          )
        ]),

        BOARD(L("মিজান ও সিরাত", "The Scale and the Bridge", "मिज़ान और सिरात"), [
          P(
            "আখিরাতে মানুষের আমলের ওজন ও বিচার হবে। সিরাত সম্পর্কে কুরআন ও সহিহ হাদিসে বর্ণনা এসেছে। এসব অদৃশ্য বিষয়ের প্রতি বিশ্বাস রাখা ঈমানের অংশ।",
            "In the Hereafter, deeds will be weighed and judged. The Bridge (Sirat) is described in authentic religious sources. Belief in these unseen matters is part of faith.",
            "आख़िरत में कर्मों का वज़न और हिसाब होगा। सिरात का वर्णन क़ुरआन और सहीह हदीस में आया है। इन ग़ैबी बातों पर विश्वास करना ईमान का हिस्सा है।"
          )
        ]),

        BOARD(L("জান্নাত", "Paradise", "जन्नत"), [
          P(
            "জান্নাত হলো আল্লাহর অনুগ্রহে মুমিনদের জন্য প্রস্তুত চিরস্থায়ী পুরস্কারের আবাস। সেখানে শান্তি, আনন্দ ও এমন নিয়ামত থাকবে যা মানুষ কল্পনাও করতে পারে না।",
            "Paradise is the everlasting home of reward prepared for believers by Allah's mercy. It contains peace, joy, and blessings beyond human imagination.",
            "जन्नत अल्लाह की कृपा से ईमान वालों के लिए तैयार किया गया हमेशा रहने वाला इनाम का घर है। वहाँ शांति, खुशी और ऐसी नेमतें होंगी जिनकी इंसान कल्पना भी नहीं कर सकता।"
          )
        ]),

        BOARD(L("জাহান্নাম", "Hell", "जहन्नम"), [
          P(
            "জাহান্নাম হলো শাস্তির স্থান। আল্লাহর নির্দেশ অমান্য করা, অন্যায় ও অবিশ্বাসের পরিণতি সম্পর্কে মানুষকে সতর্ক করা হয়েছে। তাই গুনাহ থেকে বেঁচে থাকা এবং আল্লাহর কাছে ক্ষমা চাওয়া জরুরি।",
            "Hell is a place of punishment. People are warned about the consequences of disbelief, wrongdoing, and disobedience. Believers should avoid sin and seek Allah's forgiveness.",
            "जहन्नम सज़ा का स्थान है। कुफ़्र, अन्याय और अवज्ञा के परिणामों से इंसानों को सावधान किया गया है। इसलिए गुनाहों से बचना और अल्लाह से माफ़ी माँगना ज़रूरी है।"
          )
        ]),

        BOARD(L("আখিরাতের প্রস্তুতি", "Preparing for the Hereafter", "आख़िरत की तैयारी"), [
          LIST(
            [
              "নিয়মিত নামাজ আদায় করা।",
              "সত্য কথা বলা ও আমানত রক্ষা করা।",
              "মানুষের অধিকার নষ্ট না করা।",
              "গুনাহ হলে আন্তরিক তওবা করা।",
              "দান, সদকা ও ভালো কাজ করা।",
              "মৃত্যু ও আখিরাতকে স্মরণ রাখা।"
            ],
            [
              "Perform prayers regularly.",
              "Speak truthfully and fulfil trusts.",
              "Do not violate the rights of others.",
              "Repent sincerely after sinning.",
              "Give charity and perform good deeds.",
              "Remember death and the Hereafter."
            ],
            [
              "नियमित नमाज़ पढ़ें।",
              "सच बोलें और अमानत की रक्षा करें।",
              "दूसरों के अधिकार न छीनें।",
              "गुनाह होने पर सच्ची तौबा करें।",
              "दान और अच्छे काम करें।",
              "मृत्यु और आख़िरत को याद रखें।"
            ]
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "দুনিয়ার জীবন অস্থায়ী, আখিরাত স্থায়ী। তাই শুধু দুনিয়ার লাভ নয়, আল্লাহর সন্তুষ্টি ও পরকালের সফলতার জন্যও জীবন পরিচালনা করতে হবে।",
            "Worldly life is temporary, while the Hereafter is everlasting. Life should be guided not only by worldly gains but also by seeking Allah's pleasure and success in the Hereafter.",
            "दुनिया का जीवन अस्थायी है और आख़िरत हमेशा रहने वाली है। इसलिए जीवन केवल दुनियावी लाभ के लिए नहीं, बल्कि अल्लाह की प्रसन्नता और आख़िरत की सफलता के लिए भी बिताना चाहिए।"
          )
        ])
      ]
    },

    /* =====================================================
       8. DIVINE DECREE
       ===================================================== */

    qadar: {
      intro: L(
        "তাকদির হলো আল্লাহর পূর্ণ জ্ঞান, ইচ্ছা ও নির্ধারণের প্রতি বিশ্বাস। পৃথিবীতে যা ঘটে, আল্লাহ তা আগে থেকেই জানেন। তবে মানুষকে চিন্তা, ইচ্ছা ও সিদ্ধান্ত নেওয়ার ক্ষমতা দেওয়া হয়েছে এবং সে নিজের কাজের জন্য দায়বদ্ধ।",
        "Qadar means believing in Allah's complete knowledge, will, and decree. Allah knows everything that happens. Human beings are nevertheless given the ability to think, choose, and act, and are accountable for their choices.",
        "तक़दीर का अर्थ है अल्लाह के पूर्ण ज्ञान, इच्छा और निर्धारण पर विश्वास करना। दुनिया में जो कुछ होता है, अल्लाह उसे जानता है। फिर भी इंसान को सोचने, चुनने और काम करने की क्षमता दी गई है और वह अपने चुनावों के लिए जवाबदेह है।"
      ),

      boards: [
        BOARD(L("তাকদির কী?", "What Is Qadar?", "तक़दीर क्या है?"), [
          P(
            "তাকদিরের অর্থ হলো আল্লাহ সবকিছু সম্পর্কে পূর্ণ জ্ঞান রাখেন এবং তাঁর জ্ঞান ও ইচ্ছার বাইরে কিছু ঘটে না। কোনো ঘটনাই তাঁর অজানা নয়।",
            "Qadar means that Allah has complete knowledge of everything and nothing occurs outside His knowledge and will. Nothing is unknown to Him.",
            "तक़दीर का अर्थ है कि अल्लाह को हर चीज़ का पूरा ज्ञान है और उसकी जानकारी तथा इच्छा के बाहर कुछ नहीं होता। कोई बात उससे छिपी नहीं है।"
          )
        ]),

        BOARD(L("আল্লাহর জ্ঞান", "Allah's Knowledge", "अल्लाह का ज्ञान"), [
          P(
            "আল্লাহ অতীত, বর্তমান ও ভবিষ্যৎ সবকিছু জানেন। মানুষের প্রকাশ্য কাজ, গোপন চিন্তা এবং ভবিষ্যতে কী ঘটবে—সবই তাঁর জ্ঞানের অন্তর্ভুক্ত।",
            "Allah knows the past, present, and future. Human actions, hidden thoughts, and everything that will happen are within His knowledge.",
            "अल्लाह भूत, वर्तमान और भविष्य सब जानता है। इंसान के खुले काम, छिपे विचार और भविष्य में होने वाली हर बात उसके ज्ञान में है।"
          )
        ]),

        BOARD(L("মানুষের ইচ্ছা ও দায়িত্ব", "Human Choice and Responsibility", "इंसान की इच्छा और ज़िम्मेदारी"), [
          P(
            "মানুষকে ভালো-মন্দ বোঝার ক্ষমতা এবং সিদ্ধান্ত নেওয়ার সুযোগ দেওয়া হয়েছে। সে ইচ্ছা করে ভালো বা মন্দ কাজ বেছে নেয়। তাই নিজের কাজের জন্য তাকে জবাবদিহি করতে হবে।",
            "Human beings are given the ability to distinguish right from wrong and make choices. They choose actions and are accountable for what they do.",
            "इंसान को अच्छे और बुरे में अंतर समझने तथा चुनाव करने की क्षमता दी गई है। वह अपने काम चुनता है और अपने कर्मों के लिए जवाबदेह है।"
          ),
          P(
            "ভুল কাজ করে তাকদিরকে অজুহাত বানানো ঠিক নয়। আল্লাহ মানুষকে সঠিক পথ দেখিয়েছেন এবং ভালো কাজ করার নির্দেশ দিয়েছেন।",
            "It is not right to use destiny as an excuse for wrongdoing. Allah has shown people the right path and commanded them to do good.",
            "गलत काम करके तक़दीर को बहाना बनाना सही नहीं। अल्लाह ने इंसान को सही रास्ता दिखाया और अच्छे काम करने का आदेश दिया है।"
          )
        ]),

        BOARD(L("চেষ্টা ও আল্লাহর ওপর ভরসা", "Effort and Reliance on Allah", "कोशिश और अल्लाह पर भरोसा"), [
          P(
            "কোনো লক্ষ্য অর্জনের জন্য সঠিক পরিকল্পনা ও চেষ্টা করতে হবে। এরপর ফলাফল আল্লাহর হাতে ছেড়ে দিতে হবে। পরীক্ষায় ভালো ফল চাইলে পড়াশোনা করতে হবে; সুস্থ থাকতে চাইলে যথাযথ যত্ন নিতে হবে।",
            "We should plan and make proper efforts to achieve our goals, then leave the outcome to Allah. To do well in an examination, one must study; to stay healthy, one must take proper care.",
            "लक्ष्य प्राप्त करने के लिए सही योजना और मेहनत करनी चाहिए। फिर परिणाम अल्लाह पर छोड़ देना चाहिए। परीक्षा में अच्छे परिणाम के लिए पढ़ना और स्वस्थ रहने के लिए उचित देखभाल करना ज़रूरी है।"
          )
        ]),

        BOARD(L("বিপদে ধৈর্য ও কৃতজ্ঞতা", "Patience in Hardship and Gratitude", "मुसीबत में सब्र और शुक्र"), [
          P(
            "সুখে আল্লাহর প্রতি কৃতজ্ঞ থাকতে হবে এবং বিপদে ধৈর্য ধরতে হবে। কষ্টের সময় বৈধ উপায়ে সমাধানের চেষ্টা করতে হবে এবং আল্লাহর কাছে সাহায্য চাইতে হবে।",
            "In times of ease, be grateful to Allah; in hardship, remain patient. Seek lawful solutions and ask Allah for help during difficulties.",
            "सुख के समय अल्लाह का शुक्र अदा करें और कठिनाई में सब्र रखें। परेशानी के समय सही उपाय करें और अल्लाह से मदद माँगें।"
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "তাকদিরে বিশ্বাস মানে চেষ্টা ছেড়ে দেওয়া নয়। আল্লাহর ওপর ভরসা রেখে সৎ সিদ্ধান্ত নেওয়া, পরিশ্রম করা এবং ফলাফল মেনে নেওয়াই একজন মুমিনের সুন্দর আচরণ।",
            "Belief in Qadar does not mean giving up effort. A believer trusts Allah, makes good choices, works hard, and accepts the outcome.",
            "तक़दीर पर विश्वास का अर्थ मेहनत छोड़ना नहीं है। मोमिन अल्लाह पर भरोसा करता है, सही चुनाव करता है, मेहनत करता है और परिणाम को स्वीकार करता है।"
          )
        ])
      ]
    },

    /* =====================================================
       9. COMPANIONS AND AHL AL-BAYT
       ===================================================== */

    companions: {
      intro: L(
        "সাহাবিরা হলেন সেই সৌভাগ্যবান মানুষ, যাঁরা ঈমানের সঙ্গে মুহাম্মদ (সা.)-এর সাক্ষাৎ লাভ করেছেন এবং মুসলিম অবস্থায় মৃত্যুবরণ করেছেন। আহলে বাইত বলতে রাসুল (সা.)-এর পরিবার ও তাঁর ঘনিষ্ঠ পারিবারিক সদস্যদের বোঝায়। তাঁদের মর্যাদা, অবদান ও ইসলামের ইতিহাস জানা মুসলিমদের জন্য গুরুত্বপূর্ণ।",
        "The Companions were the blessed people who met Muhammad with faith and died as Muslims. Ahl al-Bayt refers to the Prophet's family and close household members. Learning about their honour, contributions, and place in Islamic history is important.",
        "सहाबा वे भाग्यशाली लोग हैं जिन्होंने ईमान की अवस्था में मुहम्मद से मुलाक़ात की और मुसलमान के रूप में उनका निधन हुआ। अहले बैत से मुराद रसूल के परिवार और उनके करीबी पारिवारिक सदस्य हैं। उनकी प्रतिष्ठा, योगदान और इस्लामी इतिहास में स्थान जानना महत्वपूर्ण है।"
      ),

      boards: [
        BOARD(L("সাহাবি কারা?", "Who Are the Companions?", "सहाबा कौन हैं?"), [
          P(
            "যাঁরা ঈমানের সঙ্গে রাসুলুল্লাহ (সা.)-এর সাক্ষাৎ পেয়েছেন এবং মুসলিম অবস্থায় মৃত্যুবরণ করেছেন, তাঁরা সাহাবি হিসেবে পরিচিত। তাঁরা ইসলাম গ্রহণ, শিক্ষা, প্রচার ও সংরক্ষণে গুরুত্বপূর্ণ ভূমিকা পালন করেছেন।",
            "Those who met the Messenger of Allah with faith and died as Muslims are known as Companions. They played important roles in accepting, learning, spreading, and preserving Islam.",
            "जिन लोगों ने ईमान के साथ अल्लाह के रसूल से मुलाक़ात की और मुसलमान के रूप में मृत्यु पाई, वे सहाबा कहलाते हैं। उन्होंने इस्लाम अपनाने, सीखने, फैलाने और सुरक्षित रखने में महत्वपूर्ण भूमिका निभाई।"
          )
        ]),

        BOARD(L("প্রথম যুগের বিশিষ্ট সাহাবি", "Well-Known Early Companions", "प्रारंभिक प्रसिद्ध सहाबा"), [
          LIST(
            [
              "আবু বকর (রা.)",
              "উমর ইবনুল খাত্তাব (রা.)",
              "উসমান ইবনু আফফান (রা.)",
              "আলি ইবনু আবি তালিব (রা.)",
              "তালহা ইবনু উবাইদুল্লাহ (রা.)",
              "যুবাইর ইবনুল আওয়াম (রা.)",
              "আবদুর রহমান ইবনু আউফ (রা.)",
              "সাদ ইবনু আবি ওয়াক্কাস (রা.)",
              "সাঈদ ইবনু যায়েদ (রা.)",
              "আবু উবাইদা ইবনুল জাররাহ (রা.)"
            ],
            [
              "Abu Bakr, Umar ibn al-Khattab, Uthman ibn Affan, Ali ibn Abi Talib, Talha ibn Ubaydullah, Zubayr ibn al-Awwam, Abd al-Rahman ibn Awf, Sa'd ibn Abi Waqqas, Sa'id ibn Zayd, and Abu Ubaydah ibn al-Jarrah (may Allah be pleased with them)."
            ],
            [
              "अबू बक्र, उमर इब्नुल ख़त्ताब, उस्मान इब्नु अफ़्फ़ान, अली इब्नु अबी तालिब, तल्हा इब्नु उबैदुल्लाह, ज़ुबैर इब्नुल अव्वाम, अब्दुर्रहमान इब्नु औफ़, साद इब्नु अबी वक़्क़ास, सईद इब्नु ज़ैद और अबू उबैदा इब्नुल जर्राह (अल्लाह उनसे प्रसन्न हो)।"
            ]
          )
        ]),

        BOARD(L("আহলে বাইত কারা?", "Who Are Ahl al-Bayt?", "अहले बैत कौन हैं?"), [
          P(
            "আহলে বাইত বলতে রাসুলুল্লাহ (সা.)-এর পরিবার ও তাঁর ঘনিষ্ঠ পারিবারিক সদস্যদের বোঝায়। তাঁদের মধ্যে আলি (রা.), ফাতিমা (রা.), হাসান (রা.) ও হুসাইন (রা.) বিশেষভাবে পরিচিত।",
            "Ahl al-Bayt refers to the Prophet's family and close household members. Ali, Fatimah, Hasan, and Husayn are especially well known among them.",
            "अहले बैत से मुराद रसूल का परिवार और उनके करीबी पारिवारिक सदस्य हैं। अली, फ़ातिमा, हसन और हुसैन उनमें विशेष रूप से प्रसिद्ध हैं।"
          )
        ]),

        BOARD(L("সাহাবি ও আহলে বাইতের মর্যাদা", "The Honour of the Companions and Ahl al-Bayt", "सहाबा और अहले बैत का सम्मान"), [
          P(
            "সাহাবি ও আহলে বাইত ইসলামের ইতিহাসে গুরুত্বপূর্ণ মর্যাদার অধিকারী। তাঁদের প্রতি সম্মান দেখানো, তাঁদের অবদান স্মরণ করা এবং তাঁদের সম্পর্কে অশোভন ভাষা পরিহার করা উচিত।",
            "The Companions and Ahl al-Bayt hold an important place in Islamic history. They should be treated with respect, their contributions remembered, and disrespectful speech about them avoided.",
            "सहाबा और अहले बैत का इस्लामी इतिहास में महत्वपूर्ण स्थान है। उनका सम्मान करना, उनके योगदान को याद रखना और उनके बारे में अपमानजनक भाषा से बचना चाहिए।"
          ),
          P(
            "তাঁদের জীবন থেকে ঈমান, ত্যাগ, ধৈর্য, জ্ঞান, ন্যায়বিচার, দানশীলতা ও আল্লাহর প্রতি আনুগত্যের শিক্ষা পাওয়া যায়।",
            "Their lives teach faith, sacrifice, patience, knowledge, justice, generosity, and obedience to Allah.",
            "उनके जीवन से ईमान, त्याग, सब्र, ज्ञान, न्याय, उदारता और अल्लाह की आज्ञाकारिता की शिक्षा मिलती है।"
          )
        ]),

        BOARD(L("ইসলামের ইতিহাস জানার আদব", "Etiquette in Learning Islamic History", "इस्लामी इतिहास सीखने का आदाब"), [
          LIST(
            [
              "নির্ভরযোগ্য ইতিহাস ও হাদিসের ভিত্তিতে পড়ুন।",
              "প্রমাণ ছাড়া কারও বিরুদ্ধে অভিযোগ করবেন না।",
              "বিভেদ ও বিদ্বেষ ছড়ায় এমন বক্তব্য এড়িয়ে চলুন।",
              "সবার অবদান ও মর্যাদা সম্পর্কে ন্যায়সংগত থাকুন।",
              "ইতিহাস থেকে ভালো শিক্ষা গ্রহণ করুন।"
            ],
            [
              "Study reliable historical and Hadith sources.",
              "Do not accuse anyone without evidence.",
              "Avoid statements that spread hatred and division.",
              "Be fair when discussing people's contributions and honour.",
              "Take positive lessons from history."
            ],
            [
              "विश्वसनीय इतिहास और हदीस के स्रोतों से पढ़ें।",
              "बिना प्रमाण किसी पर आरोप न लगाएँ।",
              "नफ़रत और विभाजन फैलाने वाली बातों से बचें।",
              "सबके योगदान और सम्मान के बारे में न्यायपूर्ण रहें।",
              "इतिहास से अच्छी सीख लें।"
            ]
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "সাহাবি ও আহলে বাইত উভয়েই মুসলিম ইতিহাসের সম্মানিত অংশ। তাঁদের প্রতি ভালোবাসা, সম্মান ও ন্যায়বিচার বজায় রাখুন এবং তাঁদের জীবন থেকে উত্তম শিক্ষা গ্রহণ করুন।",
            "The Companions and Ahl al-Bayt are both honoured parts of Muslim history. Maintain love, respect, and fairness towards them, and learn from their lives.",
            "सहाबा और अहले बैत दोनों मुस्लिम इतिहास के सम्मानित हिस्से हैं। उनके प्रति प्रेम, सम्मान और न्याय बनाए रखें तथा उनके जीवन से अच्छी शिक्षा लें।"
          )
        ])
      ]
    },

    /* =====================================================
       10. FAITH IN DAILY LIFE
       ===================================================== */

    practice: {
      intro: L(
        "ঈমান শুধু বিশ্বাসের বিষয় নয়; এটি মানুষের দৈনন্দিন জীবন, আচরণ, সিদ্ধান্ত ও চরিত্রকে সুন্দর করে। একজন মুমিন আল্লাহকে স্মরণ করেন, সত্য কথা বলেন, মানুষের অধিকার রক্ষা করেন এবং ভালো কাজের চেষ্টা করেন।",
        "Faith is not only a matter of belief; it improves daily life, behaviour, decisions, and character. A believer remembers Allah, speaks truthfully, protects people's rights, and strives to do good.",
        "ईमान केवल विश्वास का विषय नहीं है; यह इंसान के रोज़मर्रा के जीवन, व्यवहार, निर्णय और चरित्र को बेहतर बनाता है। मोमिन अल्लाह को याद करता है, सच बोलता है, लोगों के अधिकारों की रक्षा करता है और अच्छे काम करने की कोशिश करता है।"
      ),

      boards: [
        BOARD(L("ঈমান ও চরিত্র", "Faith and Character", "ईमान और चरित्र"), [
          P(
            "সত্যবাদিতা, বিনয়, ধৈর্য, ক্ষমা, দয়া ও ন্যায়বিচার একজন মুমিনের সুন্দর চরিত্রের অংশ। মানুষের সঙ্গে ভালো ব্যবহার করা এবং কাউকে কষ্ট না দেওয়ার চেষ্টা করা উচিত।",
            "Truthfulness, humility, patience, forgiveness, mercy, and justice are qualities of good character. A believer should treat others well and avoid causing harm.",
            "सच्चाई, विनम्रता, सब्र, माफ़ी, दया और न्याय अच्छे चरित्र के गुण हैं। मोमिन को दूसरों के साथ अच्छा व्यवहार करना और किसी को तकलीफ़ न देने की कोशिश करनी चाहिए।"
          )
        ]),

        BOARD(L("ইবাদত ও আল্লাহর স্মরণ", "Worship and Remembrance of Allah", "इबादत और अल्लाह का ज़िक्र"), [
          LIST(
            [
              "পাঁচ ওয়াক্ত নামাজ আদায় করা।",
              "কুরআন তিলাওয়াত ও অর্থ বোঝার চেষ্টা করা।",
              "নিয়মিত দোয়া ও জিকির করা।",
              "রোজা ও অন্যান্য ফরজ ইবাদত পালন করা।",
              "সামর্থ্য অনুযায়ী দান-সদকা করা।"
            ],
            [
              "Perform the five daily prayers.",
              "Recite the Qur'an and try to understand its meaning.",
              "Make supplication and remember Allah regularly.",
              "Observe fasting and other obligatory acts of worship.",
              "Give charity according to one's ability."
            ],
            [
              "पाँच वक्त की नमाज़ पढ़ें।",
              "क़ुरआन पढ़ें और उसका अर्थ समझने की कोशिश करें।",
              "नियमित दुआ और ज़िक्र करें।",
              "रोज़ा और अन्य फ़र्ज़ इबादतें पूरी करें।",
              "अपनी क्षमता के अनुसार दान-सदक़ा करें।"
            ]
          )
        ]),

        BOARD(L("মানুষের অধিকার", "The Rights of Others", "दूसरों के अधिकार"), [
          P(
            "ইসলামে মানুষের অধিকার রক্ষা অত্যন্ত গুরুত্বপূর্ণ। বাবা-মা, পরিবার, প্রতিবেশী, আত্মীয়, অসহায় মানুষ এবং সমাজের সবার সঙ্গে ন্যায় ও সদাচরণ করতে হবে।",
            "Protecting the rights of others is very important in Islam. We should act justly and kindly towards parents, family, neighbours, relatives, vulnerable people, and society.",
            "इस्लाम में दूसरों के अधिकारों की रक्षा बहुत महत्वपूर्ण है। माता-पिता, परिवार, पड़ोसियों, रिश्तेदारों, ज़रूरतमंदों और समाज के सभी लोगों के साथ न्याय और अच्छा व्यवहार करना चाहिए।"
          ),
          LIST(
            [
              "বাবা-মায়ের সঙ্গে সদ্ব্যবহার করা।",
              "আত্মীয়তার সম্পর্ক বজায় রাখা।",
              "প্রতিবেশীর অধিকার রক্ষা করা।",
              "এতিম ও অসহায়দের সাহায্য করা।",
              "কারও সম্পদ বা সম্মান নষ্ট না করা।"
            ],
            [
              "Treat parents kindly.",
              "Maintain family ties.",
              "Respect neighbours' rights.",
              "Help orphans and vulnerable people.",
              "Do not violate anyone's property or dignity."
            ],
            [
              "माता-पिता के साथ अच्छा व्यवहार करें।",
              "रिश्तेदारी बनाए रखें।",
              "पड़ोसियों के अधिकारों का ध्यान रखें।",
              "यतीमों और ज़रूरतमंदों की मदद करें।",
              "किसी की संपत्ति या सम्मान को नुकसान न पहुँचाएँ।"
            ]
          )
        ]),

        BOARD(L("হালাল উপার্জন ও সততা", "Lawful Earning and Honesty", "हलाल कमाई और ईमानदारी"), [
          P(
            "জীবিকা অর্জনের ক্ষেত্রে হালাল ও ন্যায়সংগত পথ বেছে নিতে হবে। প্রতারণা, ঘুষ, চুরি, সুদ, অন্যের সম্পদ অন্যায়ভাবে গ্রহণ এবং মিথ্যা সাক্ষ্য থেকে দূরে থাকতে হবে।",
            "Choose lawful and fair ways to earn a living. Avoid fraud, bribery, theft, interest-based dealings, wrongful taking of property, and false testimony.",
            "रोज़ी कमाने के लिए हलाल और न्यायपूर्ण रास्ता अपनाएँ। धोखाधड़ी, रिश्वत, चोरी, सूद, दूसरों की संपत्ति नाजायज़ तरीके से लेने और झूठी गवाही से बचें।"
          )
        ]),

        BOARD(L("গুনাহ হলে তওবা", "Repentance After Sin", "गुनाह के बाद तौबा"), [
          P(
            "মানুষ ভুল করতে পারে। কিন্তু ভুল বুঝতে পারলে গুনাহ ছেড়ে দেওয়া, আন্তরিকভাবে অনুতপ্ত হওয়া, আবার না করার সংকল্প করা এবং আল্লাহর কাছে ক্ষমা চাওয়া জরুরি। কারও অধিকার নষ্ট করলে তা ফিরিয়ে দেওয়া বা ক্ষমা চাওয়াও প্রয়োজন।",
            "People can make mistakes. When a person realises a sin, they should stop it, sincerely regret it, resolve not to repeat it, and ask Allah for forgiveness. If another person's rights were violated, those rights must be restored or forgiveness sought.",
            "इंसान से गलती हो सकती है। गलती समझ आने पर गुनाह छोड़ना, सच्चे दिल से पछताना, दोबारा न करने का संकल्प लेना और अल्लाह से माफ़ी माँगना ज़रूरी है। यदि किसी का अधिकार छीना हो तो उसे लौटाना या माफ़ी माँगना भी ज़रूरी है।"
          )
        ]),

        BOARD(L("দৈনন্দিন জীবনে ঈমানের চর্চা", "Practising Faith Every Day", "रोज़मर्रा के जीवन में ईमान"), [
          LIST(
            [
              "প্রতিটি কাজের আগে সঠিক নিয়ত করা।",
              "কথা ও কাজে সত্যবাদী থাকা।",
              "রাগ নিয়ন্ত্রণ করা।",
              "অন্যের দোষ খোঁজার বদলে নিজের সংশোধন করা।",
              "সময় ও সম্পদের অপচয় না করা।",
              "বিপদে ধৈর্য এবং সুখে কৃতজ্ঞ থাকা।",
              "প্রতিদিন নিজের কাজের হিসাব নেওয়া।"
            ],
            [
              "Make a good intention before every action.",
              "Be truthful in speech and action.",
              "Control anger.",
              "Improve yourself instead of searching for others' faults.",
              "Avoid wasting time and resources.",
              "Be patient in hardship and grateful in ease.",
              "Review your actions every day."
            ],
            [
              "हर काम से पहले अच्छी नियत करें।",
              "बात और काम में सच्चे रहें।",
              "गुस्से पर काबू रखें।",
              "दूसरों की कमियाँ खोजने के बजाय खुद को सुधारें।",
              "समय और संसाधनों को बर्बाद न करें।",
              "मुसीबत में सब्र और सुख में शुक्र करें।",
              "हर दिन अपने कामों का जायज़ा लें।"
            ]
          )
        ]),

        BOARD(L("একজন মুমিনের দৈনিক আত্মপরীক্ষা", "A Believer's Daily Self-Review", "मोमिन का रोज़ाना आत्म-परीक्षण"), [
          LIST(
            [
              "আজ আমি কি নামাজ ঠিকভাবে আদায় করেছি?",
              "আজ আমি কি কাউকে কষ্ট দিয়েছি?",
              "আজ আমি কি সত্য কথা বলেছি?",
              "আজ আমি কি কোনো অন্যায় থেকে নিজেকে বিরত রেখেছি?",
              "আজ আমি কি আল্লাহর কাছে ক্ষমা চেয়েছি?",
              "আগামীকাল আমি কীভাবে আরও ভালো হতে পারি?"
            ],
            [
              "Did I perform my prayers properly today?",
              "Did I hurt anyone today?",
              "Did I speak truthfully today?",
              "Did I avoid wrongdoing today?",
              "Did I ask Allah for forgiveness today?",
              "How can I become better tomorrow?"
            ],
            [
              "क्या मैंने आज नमाज़ सही ढंग से पढ़ी?",
              "क्या मैंने आज किसी को तकलीफ़ दी?",
              "क्या मैंने आज सच बोला?",
              "क्या मैंने आज किसी गलत काम से खुद को रोका?",
              "क्या मैंने आज अल्लाह से माफ़ी माँगी?",
              "मैं कल और बेहतर कैसे बन सकता हूँ?"
            ]
          )
        ]),

        BOARD(L("মনে রাখুন", "Remember", "याद रखें"), [
          P(
            "সত্যিকারের ঈমান মানুষের আচরণে ভালো পরিবর্তন আনে। আল্লাহর প্রতি বিশ্বাস রাখুন, তাঁর নির্দেশ মেনে চলুন, মানুষের অধিকার রক্ষা করুন এবং প্রতিদিন নিজেকে সংশোধনের চেষ্টা করুন।",
            "True faith brings positive change to a person's behaviour. Believe in Allah, follow His guidance, protect people's rights, and try to improve yourself every day.",
            "सच्चा ईमान इंसान के व्यवहार में अच्छा बदलाव लाता है। अल्लाह पर विश्वास रखें, उसकी हिदायत पर चलें, लोगों के अधिकारों की रक्षा करें और हर दिन खुद को सुधारने की कोशिश करें।"
          )
        ])
      ]
    }
  };

  /* =========================================================
     STATE
     ========================================================= */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  let currentLanguage = "bn";
  let currentTheme = "light";
  let settingsObserver = null;
  let rendering = false;

  /* =========================================================
     SETTINGS
     ========================================================= */

  function getAppSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);

      if (!raw) return {};

      const parsed = JSON.parse(raw);

      return parsed && typeof parsed === "object"
        ? parsed
        : {};
    } catch (error) {
      console.warn("IBADAT: Unable to read appSettings.", error);
      return {};
    }
  }

  function normalizeLanguage(value) {
    if (!value) return null;

    const lang = String(value)
      .trim()
      .toLowerCase()
      .slice(0, 2);

    return SUPPORTED_LANGUAGES.includes(lang)
      ? lang
      : null;
  }

  function readLanguage() {
    const settings = getAppSettings();

    const saved = normalizeLanguage(
      settings.lang ||
      settings.language ||
      settings.selectedLanguage
    );

    if (saved) return saved;

    const candidates = [
      document.documentElement.dataset.language,
      document.documentElement.dataset.lang,
      document.documentElement.lang,
      document.body.dataset.language,
      document.body.dataset.lang
    ];

    try {
      candidates.push(
        localStorage.getItem("ibadat-language"),
        localStorage.getItem("selectedLanguage"),
        localStorage.getItem("language")
      );
    } catch (_) {}

    for (const value of candidates) {
      const lang = normalizeLanguage(value);
      if (lang) return lang;
    }

    return "bn";
  }

  function readTheme() {
    const settings = getAppSettings();

    if (
      Object.prototype.hasOwnProperty.call(settings, "dark")
    ) {
      return (
        settings.dark === true ||
        settings.dark === "true"
      ) ? "dark" : "light";
    }

    const root = document.documentElement;
    const body = document.body;

    const value = [
      root.dataset.theme,
      body.dataset.theme,
      root.dataset.mode,
      body.dataset.mode
    ].filter(Boolean).join(" ").toLowerCase();

    if (
      value.includes("dark") ||
      root.classList.contains("dark") ||
      body.classList.contains("dark") ||
      body.classList.contains("dark-mode")
    ) {
      return "dark";
    }

    try {
      const saved =
        localStorage.getItem("ibadat-theme") ||
        localStorage.getItem("theme");

      if (saved && /dark|night/i.test(saved)) {
        return "dark";
      }
    } catch (_) {}

    return "light";
  }

  function applyColorTheme() {
    const settings = getAppSettings();

    const selected = ALLOWED_THEMES.includes(
      settings.themeColor
    ) ? settings.themeColor : null;

    if (
      selected &&
      document.body.dataset.colorTheme !== selected
    ) {
      document.body.dataset.colorTheme = selected;
    }
  }

  /* =========================================================
     TEXT HELPERS
     ========================================================= */

  function localized(value) {
    if (typeof value === "string") return value;

    if (!value || typeof value !== "object") {
      return "";
    }

    return (
      value[currentLanguage] ||
      value.bn ||
      value.en ||
      value.hi ||
      ""
    );
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);

    if (className) {
      node.className = className;
    }

    if (text !== undefined && text !== null) {
      node.textContent = text;
    }

    return node;
  }

  /* =========================================================
     CONTENT RENDERING
     ========================================================= */

  function appendParagraph(board, text) {
    board.appendChild(
      element("p", "", text)
    );
  }

  function appendHeading(board, text) {
    board.appendChild(
      element("h4", "", text)
    );
  }

  function appendList(board, items) {
    const list = element("ul", "");

    items.forEach((item) => {
      list.appendChild(
        element("li", "", item)
      );
    });

    board.appendChild(list);
  }

  function appendArabicQuote(board, data) {
    const quote = element("div", "lesson-quote");

    const arabic = element(
      "p",
      "arabic-text",
      data.arabic
    );

    arabic.lang = "ar";
    arabic.dir = "rtl";

    quote.appendChild(arabic);

    const translation = element(
      "p",
      "lesson-translation",
      localized(data.translation)
    );

    quote.appendChild(translation);

    if (data.reference) {
      const reference = element(
        "p",
        "lesson-source",
        data.reference
      );

      quote.appendChild(reference);
    }

    board.appendChild(quote);
  }

  function appendContent(board, items) {
    if (!Array.isArray(items)) return;

    items.forEach((item) => {
      const text = localized(item.content);

      switch (item.type) {
        case "paragraph":
          appendParagraph(board, text);
          break;

        case "heading":
          appendHeading(board, text);
          break;

        case "list":
          appendList(board, item.content[currentLanguage] || []);
          break;

        case "quote":
          appendArabicQuote(board, item);
          break;

        case "note": {
          const note = element("div", "lesson-note");
          note.textContent = text;
          board.appendChild(note);
          break;
        }

        case "reference": {
          const reference = element(
            "p",
            "lesson-source",
            text
          );

          board.appendChild(reference);
          break;
        }

        default:
          if (text) appendParagraph(board, text);
      }
    });
  }

  /* =========================================================
     BOARD CREATION
     ========================================================= */

  function createBoard(topicId, title, content, intro = false, index = 0) {
    const board = element("article", "lesson-board");

    board.dataset.topic = topicId;
    board.dataset.part = String(index + 1);

    const titleText = localized(title);

    board.classList.add(
      intro ? "lesson-intro" : "lesson-step"
    );

    if (
      titleText === UI[currentLanguage].remember
    ) {
      board.classList.remove("lesson-step");
      board.classList.add("lesson-reminder");
    }

    const heading = element(
      "h3",
      intro ? "lesson-title" : "",
      titleText
    );

    board.appendChild(heading);

    appendContent(board, content);

    return board;
  }

  /* =========================================================
     RENDER ONE TOPIC
     ========================================================= */

  function renderTopic(topicId) {
    const topic = LESSONS[topicId];

    const section = document.querySelector(
      '.purity-topic[data-topic="' + topicId + '"]'
    );

    const container = document.getElementById(
      "content-" + topicId
    );

    if (!topic || !section || !container) {
      console.error(
        "IBADAT Iman: Missing topic section:",
        topicId
      );
      return;
    }

    const heading = section.querySelector(
      ".topic-heading"
    );

    const topicTitle =
      UI[currentLanguage].topics[topicId];

    if (heading) {
      heading.textContent = topicTitle;
    }

    container.replaceChildren();

    // First board: Topic introduction.
    const intro = createBoard(
      topicId,
      L(
        UI.bn.topics[topicId],
        UI.en.topics[topicId],
        UI.hi.topics[topicId]
      ),
      [
        P(
          topic.intro.bn,
          topic.intro.en,
          topic.intro.hi
        )
      ],
      true,
      0
    );

    container.appendChild(intro);

    // Remaining detailed lesson boards.
    topic.boards.forEach((data, index) => {
      const board = createBoard(
        topicId,
        data.title,
        data.content,
        false,
        index + 1
      );

      container.appendChild(board);
    });
  }

  /* =========================================================
     RENDER ALL TOPICS
     ========================================================= */

  function renderAllTopics() {
    rendering = true;

    try {
      Object.keys(LESSONS).forEach(renderTopic);
    } finally {
      rendering = false;
    }
  }

  /* =========================================================
     LANGUAGE MANAGEMENT
     ========================================================= */

  function setLanguage(language) {
    const lang = normalizeLanguage(language);

    if (!lang) return false;

    currentLanguage = lang;

    document.documentElement.lang = lang;
    document.documentElement.dataset.language = lang;
    document.documentElement.dataset.lang = lang;

    const title = $("#pageTitle");
    const footer = $("#footerText");

    if (title) {
      title.textContent = UI[lang].pageTitle;
    }

    if (footer) {
      footer.textContent = UI[lang].footer;
    }

    renderAllTopics();

    document.title =
      UI[lang].pageTitle + " | IBADAT";

    window.dispatchEvent(
      new CustomEvent("ibadat:iman-ready", {
        detail: {
          language: currentLanguage,
          theme: currentTheme
        }
      })
    );

    return true;
  }

  /* =========================================================
     THEME MANAGEMENT
     ========================================================= */

  function setTheme(theme) {
    const value = /dark|night/i.test(
      String(theme)
    ) ? "dark" : "light";

    currentTheme = value;

    document.body.classList.toggle(
      "dark-mode",
      value === "dark"
    );

    if (
      document.documentElement.dataset.theme !== value
    ) {
      document.documentElement.dataset.theme = value;
    }

    if (
      document.body.dataset.theme !== value
    ) {
      document.body.dataset.theme = value;
    }

    return value;
  }

  /* =========================================================
     SYNC PARENT SETTINGS
     ========================================================= */

  function syncSettings() {
    const language = readLanguage();
    const theme = readTheme();

    applyColorTheme();

    if (
      language !== currentLanguage ||
      !$("#content-basics")?.children.length
    ) {
      setLanguage(language);
    }

    if (theme !== currentTheme) {
      setTheme(theme);
    } else {
      document.body.classList.toggle(
        "dark-mode",
        theme === "dark"
      );
    }
  }

  /* =========================================================
     CONNECT TO PARENT WEBSITE
     ========================================================= */

  function connectSiteSettings() {
    window.addEventListener(
      "ibadat:language-changed",
      (event) => {
        const language =
          event.detail?.language ||
          event.detail?.lang;

        if (language) setLanguage(language);
      }
    );

    window.addEventListener(
      "ibadat:theme-changed",
      (event) => {
        const theme =
          event.detail?.theme ||
          event.detail?.mode;

        if (theme) setTheme(theme);
      }
    );

    window.addEventListener(
      "ibadat:settings-changed",
      syncSettings
    );

    window.addEventListener(
      "settings:changed",
      syncSettings
    );

    window.addEventListener(
      "storage",
      (event) => {
        if (
          event.key === SETTINGS_KEY ||
          event.key === null
        ) {
          syncSettings();
        }
      }
    );

    if (settingsObserver) {
      settingsObserver.disconnect();
    }

    settingsObserver = new MutationObserver(() => {
      if (rendering) return;

      const language = readLanguage();
      const theme = readTheme();

      if (language !== currentLanguage) {
        setLanguage(language);
      }

      if (theme !== currentTheme) {
        setTheme(theme);
      }

      applyColorTheme();
    });

    settingsObserver.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          "lang",
          "class",
          "data-theme",
          "data-language",
          "data-lang",
          "data-mode"
        ]
      }
    );

    settingsObserver.observe(
      document.body,
      {
        attributes: true,
        attributeFilter: [
          "class",
          "data-theme",
          "data-color-theme",
          "data-language",
          "data-lang",
          "data-mode"
        ]
      }
    );
  }

  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function init() {
    const page = $("#imanPage");
    const container = $("#purityLessons");

    if (!page || !container) {
      console.error(
        "IBADAT Iman: Expected #imanPage and #purityLessons."
      );
      return;
    }

    currentLanguage = "bn";
    currentTheme = readTheme();

    applyColorTheme();
    setTheme(currentTheme);

    // Always render all ten topics on first load.
    setLanguage(readLanguage());

    connectSiteSettings();

    // Public API.
    window.IBADATIman = Object.freeze({
      setLanguage,
      setTheme,
      syncSettings,

      getLanguage: () => currentLanguage,
      getTheme: () => currentTheme,
      getTopics: () => Object.keys(LESSONS)
    });

    console.info(
      "IBADAT Iman & Aqidah loaded successfully."
    );
  }

  /* =========================================================
     START
     ========================================================= */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();
