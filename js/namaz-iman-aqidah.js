
"use strict";

/* =========================================================
   IBADAT — IMAN & AQIDAH
   File: js/namaz-iman-aqidah.js

   Complete fresh JavaScript
   Languages: Bengali, English, Hindi
   Settings: Parent appSettings
   Topics: 10
   ========================================================= */

(() => {
  const SETTINGS_KEY = "appSettings";
  const LANGUAGES = ["bn", "en", "hi"];
  const THEMES = ["classic", "royal", "rose", "pista"];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  let currentLanguage = "bn";
  let currentTheme = "classic";
  let currentTopic = null;
  let isDark = false;
  let observer = null;
  let renderLock = false;

  /* ---------------------------------------------------------
     LANGUAGE HELPERS
  --------------------------------------------------------- */

  const L = (bn, en, hi) => ({ bn, en, hi });

  const DIGITS = {
    bn: "০১২৩৪৫৬৭৮৯",
    en: "0123456789",
    hi: "०१२३४५६७८९"
  };

  function localizeDigits(value) {
    const text = String(value ?? "");
    if (currentLanguage === "en") return text;

    return text.replace(/[0-9]/g, digit =>
      DIGITS[currentLanguage][Number(digit)]
    );
  }

  function t(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[currentLanguage] ?? value.bn ?? "";
    }
    return value ?? "";
  }

  function safeText(element, value) {
    if (element) element.textContent = localizeDigits(t(value));
  }

  function normalizeLanguage(value) {
    const language = String(value || "").toLowerCase().trim();

    if (["bn", "bangla", "bengali"].includes(language)) return "bn";
    if (["en", "english"].includes(language)) return "en";
    if (["hi", "hindi"].includes(language)) return "hi";

    return "bn";
  }

  function normalizeTheme(value) {
    const theme = String(value || "").toLowerCase().trim();
    return THEMES.includes(theme) ? theme : "classic";
  }

  /* ---------------------------------------------------------
     SETTINGS
  --------------------------------------------------------- */

  function readSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.warn("IBADAT: Could not read appSettings.", error);
      return {};
    }
  }

  function getRootLanguage() {
    return (
      document.documentElement.dataset.language ||
      document.documentElement.dataset.lang ||
      document.body?.dataset.language ||
      document.body?.dataset.lang ||
      ""
    );
  }

  function readLanguage() {
    const settings = readSettings();

    return normalizeLanguage(
      settings.lang ||
      settings.language ||
      settings.selectedLanguage ||
      getRootLanguage() ||
      new URLSearchParams(location.search).get("lang") ||
      "bn"
    );
  }

  function readTheme() {
    const settings = readSettings();

    currentTheme = normalizeTheme(
      settings.themeColor ||
      settings.colorTheme ||
      settings.theme ||
      document.documentElement.dataset.colorTheme ||
      document.body?.dataset.colorTheme ||
      "classic"
    );

    const darkValue =
      settings.darkMode ??
      settings.dark_mode ??
      settings.isDarkMode ??
      settings.dark ??
      false;

    isDark =
      darkValue === true ||
      darkValue === "true" ||
      darkValue === 1 ||
      settings.mode === "dark" ||
      document.documentElement.dataset.mode === "dark" ||
      document.body?.dataset.mode === "dark" ||
      document.body?.classList.contains("dark-mode") ||
      document.documentElement.classList.contains("dark-mode");
  }

  function applySettings() {
    if (renderLock) return;

    currentLanguage = readLanguage();
    readTheme();

    document.documentElement.lang = currentLanguage;

    // Keep the existing parent theme system.
    document.documentElement.dataset.colorTheme = currentTheme;
    document.body.dataset.colorTheme = currentTheme;

    document.documentElement.dataset.mode = isDark ? "dark" : "light";
    document.body.dataset.mode = isDark ? "dark" : "light";

    document.body.classList.toggle("dark-mode", isDark);
    document.documentElement.classList.toggle("dark-mode", isDark);

    renderPage();
  }

  /* ---------------------------------------------------------
     ARABIC QUOTE HELPER
     Pronunciation is a learning aid, not a replacement
     for listening to correct Arabic recitation.
  --------------------------------------------------------- */

  const AR = (arabic, pronunciation, meaning, reference = "") => ({
    type: "quote",
    arabic,
    pronunciation: L(
      pronunciation.bn,
      pronunciation.en,
      pronunciation.hi
    ),
    meaning: L(
      meaning.bn,
      meaning.en,
      meaning.hi
    ),
    reference: reference
      ? L(reference.bn, reference.en, reference.hi)
      : ""
  });

  const REF = (bn, en, hi) => L(bn, en, hi);

  /* ---------------------------------------------------------
     LESSON CONTENT — 10 TOPICS
  --------------------------------------------------------- */

  const LESSONS = [

    /* 1. IMAN BASICS */
    {
      id: "basics",
      title: L("ঈমানের মৌলিক বিষয়", "Fundamentals of Iman", "ईमान की बुनियादी बातें"),
      subtitle: L(
        "ঈমান কী এবং একজন মুসলিমের বিশ্বাসের ভিত্তি",
        "What Iman means and the foundation of Muslim belief",
        "ईमान का अर्थ और मुस्लिम विश्वास की बुनियाद"
      ),
      sections: [
        {
          title: L("ঈমান কী?", "What Is Iman?", "ईमान क्या है?"),
          paragraphs: [
            L(
              "ঈমান হলো আল্লাহর প্রতি এবং তাঁর জানানো সত্য বিষয়গুলোর প্রতি অন্তরের দৃঢ় বিশ্বাস। ইসলামে ঈমানের সঙ্গে মুখের স্বীকৃতি ও কাজের সম্পর্ক রয়েছে।",
              "Iman is firm belief in Allah and in the truths He has revealed. In Islam, faith is connected with affirmation and actions.",
              "ईमान अल्लाह और उनके बताए हुए सत्य पर दिल से दृढ़ विश्वास रखने का नाम है। इस्लाम में ईमान का संबंध स्वीकार करने और अमल से भी है।"
            )
          ]
        },
        {
          title: L("ঈমানের ছয়টি বিষয়", "The Six Articles of Faith", "ईमान के छह अरकान"),
          bullets: [
            L("আল্লাহর প্রতি ঈমান", "Belief in Allah", "अल्लाह पर ईमान"),
            L("ফেরেশতাদের প্রতি ঈমান", "Belief in the angels", "फ़रिश्तों पर ईमान"),
            L("আসমানি কিতাবসমূহের প্রতি ঈমান", "Belief in the revealed books", "आसमानी किताबों पर ईमान"),
            L("নবী ও রাসূলদের প্রতি ঈমান", "Belief in the prophets and messengers", "नबियों और रसूलों पर ईमान"),
            L("আখিরাতের প্রতি ঈমান", "Belief in the Last Day", "आख़िरत पर ईमान"),
            L("তাকদিরের ভালো-মন্দ আল্লাহর জ্ঞান ও ইচ্ছার অধীন—এতে ঈমান", "Belief in divine decree, its good and its difficult aspects", "तक़दीर के अच्छे और कठिन पहलुओं पर ईमान")
          ]
        },
        {
          title: L("ঈমানের গুরুত্ব", "Why Iman Matters", "ईमान की अहमियत"),
          paragraphs: [
            L(
              "ঈমান মানুষের জীবনকে সঠিক পথ দেখায়। এটি আল্লাহর আনুগত্য, সৎকর্ম, ন্যায়বিচার, ধৈর্য ও মানুষের প্রতি দায়িত্বশীল হতে সাহায্য করে।",
              "Iman guides a person's life. It encourages obedience to Allah, good deeds, justice, patience and responsibility toward others.",
              "ईमान इंसान को सही रास्ता दिखाता है। यह अल्लाह की आज्ञा मानने, नेक काम करने, न्याय, सब्र और लोगों के प्रति ज़िम्मेदारी निभाने की प्रेरणा देता है।"
            )
          ]
        },
        {
          title: L("কুরআনের নির্দেশনা", "Guidance from the Quran", "क़ुरआन की रहनुमाई"),
          quote: AR(
            "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ",
            {
              bn: "আমানার রাসূলু বিমা উনযিলা ইলাইহি মির রব্বিহি ওয়াল মুমিনূন",
              en: "Aamanar-rasoolu bimaa unzila ilayhi mir-rabbihi wal-mu'minoon",
              hi: "आमनर-रसूलु बिमा उन्ज़िला इलैहि मिर-रब्बिही वल-मुमिनून"
            },
            {
              bn: "রাসূল তাঁর রবের পক্ষ থেকে তাঁর প্রতি যা অবতীর্ণ হয়েছে তাতে ঈমান এনেছেন এবং মুমিনরাও।",
              en: "The Messenger believes in what was revealed to him from his Lord, and so do the believers.",
              hi: "रसूल अपने रब की ओर से उन पर उतारी गई चीज़ पर ईमान लाए और मोमिन भी।"
            },
            {
              bn: "সূরা আল-বাকারা ২:২৮৫",
              en: "Surah Al-Baqarah 2:285",
              hi: "सूरह अल-बक़रा 2:285"
            }
          )
        }
      ]
    },

    /* 2. KALIMAS */
    {
      id: "kalimas",
      title: L("পাঁচ কালেমা", "The Five Kalimas", "पाँच कलिमे"),
      subtitle: L(
        "কালেমার পরিচয়, আরবি পাঠ ও অর্থ",
        "The Kalimas: Arabic text, pronunciation and meaning",
        "कलिमों का परिचय, अरबी पाठ और अर्थ"
      ),
      sections: [
        {
          title: L("প্রথম কালেমা — তাইয়্যেবা", "First Kalima — Tayyibah", "पहला कलिमा — तैय्यबा"),
          quote: AR(
            "لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ",
            {
              bn: "লা ইলাহা ইল্লাল্লাহু মুহাম্মাদুর রাসূলুল্লাহ",
              en: "Laa ilaaha illallaahu Muhammadur Rasoolullaah",
              hi: "ला इलाहा इल्लल्लाहु मुहम्मदुर रसूलुल्लाह"
            },
            {
              bn: "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই; মুহাম্মদ ﷺ আল্লাহর রাসূল।",
              en: "There is no deity worthy of worship except Allah; Muhammad is the Messenger of Allah.",
              hi: "अल्लाह के सिवा कोई इबादत के योग्य नहीं; मुहम्मद अल्लाह के रसूल हैं।"
            }
          )
        },
        {
          title: L("দ্বিতীয় কালেমা — শাহাদাত", "Second Kalima — Shahadah", "दूसरा कलिमा — शहादत"),
          quote: AR(
            "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
            {
              bn: "আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহু",
              en: "Ash-hadu an laa ilaaha illallaahu wahdahu laa shareeka lahu, wa ash-hadu anna Muhammadan abduhu wa rasooluhu",
              hi: "अशहदु अल्ला इलाहा इल्लल्लाहु वहदहु ला शरीका लहू, व अशहदु अन्ना मुहम्मदन अब्दुहू व रसूलुहू"
            },
            {
              bn: "আমি সাক্ষ্য দিচ্ছি, আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি এক, তাঁর কোনো অংশীদার নেই। এবং আমি সাক্ষ্য দিচ্ছি, মুহাম্মদ ﷺ তাঁর বান্দা ও রাসূল।",
              en: "I bear witness that there is no deity except Allah, alone without partner, and I bear witness that Muhammad is His servant and Messenger.",
              hi: "मैं गवाही देता हूँ कि अल्लाह के सिवा कोई इबादत के योग्य नहीं, वह अकेला है, उसका कोई साझी नहीं; और मुहम्मद उसके बंदे और रसूल हैं।"
            }
          )
        },
        {
          title: L("তৃতীয় কালেমা — তামজীদ", "Third Kalima — Tamjeed", "तीसरा कलिमा — तमजीद"),
          quote: AR(
            "سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ",
            {
              bn: "সুবহানাল্লাহি ওয়াল হামদু লিল্লাহি ওয়ালা ইলাহা ইল্লাল্লাহু ওয়াল্লাহু আকবার",
              en: "Subhaanallaahi wal-hamdu lillaahi wa laa ilaaha illallaahu wallaahu akbar",
              hi: "सुब्हानल्लाहि वल-हम्दु लिल्लाहि व ला इलाहा इल्लल्लाहु वल्लाहु अकबर"
            },
            {
              bn: "আল্লাহ পবিত্র, সমস্ত প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোনো উপাস্য নেই এবং আল্লাহ সর্বশ্রেষ্ঠ।",
              en: "Glory be to Allah, all praise belongs to Allah, there is no deity except Allah, and Allah is the Greatest.",
              hi: "अल्लाह पाक है, सारी प्रशंसा अल्लाह के लिए है, अल्लाह के सिवा कोई उपास्य नहीं और अल्लाह सबसे बड़ा है।"
            }
          )
        },
        {
          title: L("চতুর্থ কালেমা — তাওহীদ", "Fourth Kalima — Tawheed", "चौथा कलिमा — तौहीद"),
          quote: AR(
            "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ أَبَدًا أَبَدًا",
            {
              bn: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, লাহুল মুলকু ওয়া লাহুল হামদু, ইউহয়ী ওয়া ইউমীতু, ওয়া হুয়া হাইয়্যুল লা ইয়ামূতু আবাদান আবাদা",
              en: "Laa ilaaha illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu, yuhyee wa yumeetu, wa huwa hayyun laa yamootu abadan abadaa",
              hi: "ला इलाहा इल्लल्लाहु वहदहु ला शरीका लहू, लहुल-मुल्कु व लहुल-हम्दु, युहयी व युमीतु, व हुवा हय्युल ला यमूतु अबदन अबदा"
            },
            {
              bn: "আল্লাহ ছাড়া কোনো উপাস্য নেই। তিনি এক, তাঁর কোনো অংশীদার নেই। রাজত্ব ও প্রশংসা তাঁরই। তিনি জীবন দান করেন ও মৃত্যু দেন। তিনি চিরঞ্জীব, কখনো মৃত্যুবরণ করেন না।",
              en: "There is no deity except Allah alone, without partner. His is the dominion and praise. He gives life and causes death, and He is Ever-Living and never dies.",
              hi: "अल्लाह के सिवा कोई उपास्य नहीं। वह अकेला है, उसका कोई साझी नहीं। बादशाहत और प्रशंसा उसी की है। वह जीवन देता और मृत्यु देता है। वह सदा जीवित है, कभी नहीं मरता।"
            }
          )
        },
        {
          title: L("পঞ্চম কালেমা — ইস্তিগফার", "Fifth Kalima — Istighfar", "पाँचवाँ कलिमा — इस्तिग़फ़ार"),
          quote: AR(
            "أَسْتَغْفِرُ اللّٰهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمَدًا أَوْ خَطَأً",
            {
              bn: "আস্তাগফিরুল্লাহা রব্বী মিন কুল্লি যাম্বিন আযনাবতুহু আমদান আও খাতা",
              en: "Astaghfirullaaha rabbee min kulli dhanbin adhnabtuhu amadan aw khata'an",
              hi: "अस्तग़फ़िरुल्लाहा रब्बी मिन कुल्लि ज़म्बिन अज़नबतুহू अमदन अव ख़ताअन"
            },
            {
              bn: "আমি আমার রব আল্লাহর কাছে আমার সব গুনাহের জন্য ক্ষমা প্রার্থনা করছি—ইচ্ছাকৃত বা অনিচ্ছাকৃত।",
              en: "I seek forgiveness from Allah, my Lord, for every sin I have committed intentionally or unintentionally.",
              hi: "मैं अपने रब अल्लाह से अपने हर गुनाह की माफ़ी माँगता हूँ, चाहे वह जान-बूझकर हो या अनजाने में।"
            }
          )
        },
        {
          title: L("কালেমা শেখার কথা", "Learning the Kalimas", "कलिमे सीखने की बात"),
          paragraphs: [
            L(
              "দক্ষ শিক্ষকের কাছ থেকে আরবি উচ্চারণ শিখুন। বাংলা বা হিন্দি উচ্চারণ কেবল শেখার সহায়ক; আরবি মাখরাজ ও তাজবিদের বিকল্প নয়।",
              "Learn Arabic pronunciation from a qualified teacher. Transliteration is only a learning aid and cannot replace correct Arabic articulation.",
              "अरबी उच्चारण किसी योग्य शिक्षक से सीखें। रोमन या देवनागरी उच्चारण केवल सहायता है, सही अरबी मख़ारिज़ का विकल्प नहीं।"
            )
          ]
        }
      ]
    },

    /* 3. ALLAH */
    {
      id: "allah",
      title: L("আল্লাহর প্রতি ঈমান", "Belief in Allah", "अल्लाह पर ईमान"),
      subtitle: L("তাওহীদ ও আল্লাহর পরিচয়", "Tawheed and knowing Allah", "तौहीद और अल्लाह की पहचान"),
      sections: [
        {
          title: L("আল্লাহ এক ও অদ্বিতীয়", "Allah Is One", "अल्लाह एक है"),
          paragraphs: [
            L(
              "আল্লাহ এক, অদ্বিতীয়, সৃষ্টিকর্তা ও পালনকর্তা। ইবাদত একমাত্র তাঁরই প্রাপ্য। তাঁর কোনো শরিক নেই।",
              "Allah is One, unique, the Creator and Sustainer. Worship belongs to Him alone, and He has no partner.",
              "अल्लाह एक और अद्वितीय है। वही पैदा करने वाला और पालनहार है। इबादत केवल उसी की है और उसका कोई साझी नहीं।"
            )
          ]
        },
        {
          title: L("তাওহীদের শিক্ষা", "The Meaning of Tawheed", "तौहीद की शिक्षा"),
          bullets: [
            L("আল্লাহর রবুবিয়্যাত স্বীকার করা", "Recognising Allah as the Lord and Creator", "अल्लाह को रब और पैदा करने वाला मानना"),
            L("একমাত্র আল্লাহর ইবাদত করা", "Worshipping Allah alone", "केवल अल्लाह की इबादत करना"),
            L("আল্লাহর সুন্দর নাম ও গুণাবলিতে ঈমান রাখা", "Believing in Allah's beautiful names and attributes", "अल्लाह के सुंदर नामों और गुणों पर ईमान रखना")
          ]
        },
        {
          title: L("সূরা ইখলাস", "Surah Al-Ikhlas", "सूरह अल-इख़लास"),
          quote: AR(
            "قُلْ هُوَ اللّٰهُ أَحَدٌ ۝ اللّٰهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
            {
              bn: "কুল হুওয়াল্লাহু আহাদ। আল্লাহুস সামাদ। লাম ইয়ালিদ ওয়া লাম ইউলাদ। ওয়া লাম ইয়াকুল্লাহু কুফুওয়ান আহাদ",
              en: "Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yoolad. Wa lam yakul-lahu kufuwan ahad",
              hi: "क़ुल हुवल्लाहु अहद। अल्लाहुस-समद। लम यलिद व लम यूलद। व लम यकुल्लहू कुफुवन अहद"
            },
            {
              bn: "বলুন, তিনি আল্লাহ, এক। আল্লাহ অমুখাপেক্ষী। তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি। তাঁর সমতুল্য কেউ নেই।",
              en: "Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, and none is comparable to Him.",
              hi: "कह दीजिए, वह अल्लाह एक है। अल्लाह बेनियाज़ है। न उसने किसी को जना और न वह जना गया, और कोई उसके बराबर नहीं।"
            },
            {
              bn: "সূরা আল-ইখলাস ১১২:১–৪",
              en: "Surah Al-Ikhlas 112:1–4",
              hi: "सूरह अल-इख़लास 112:1–4"
            }
          )
        },
        {
          title: L("আল্লাহর প্রতি ভালোবাসা", "Love of Allah", "अल्लाह से मुहब्बत"),
          paragraphs: [
            L(
              "আল্লাহকে ভালোবাসার প্রকাশ হলো তাঁর আদেশ মানা, নিষেধ থেকে দূরে থাকা, তাঁর কাছে দোয়া করা এবং তাঁর সৃষ্টির প্রতি ন্যায় ও দয়া প্রদর্শন করা।",
              "Love of Allah is shown through obedience, avoiding what He forbids, making dua and treating His creation with justice and mercy.",
              "अल्लाह से मुहब्बत का इज़हार उसके आदेश मानने, मना की गई चीज़ों से बचने, दुआ करने और उसकी मख़लूक़ के साथ इंसाफ़ और रहम करने से होता है।"
            )
          ]
        }
      ]
    },

    /* 4. ANGELS */
    {
      id: "angels",
      title: L("ফেরেশতাদের প্রতি ঈমান", "Belief in Angels", "फ़रिश्तों पर ईमान"),
      subtitle: L("ফেরেশতাদের পরিচয় ও দায়িত্ব", "Who angels are and their duties", "फ़रिश्तों की पहचान और उनके काम"),
      sections: [
        {
          title: L("ফেরেশতা কারা?", "Who Are the Angels?", "फ़रिश्ते कौन हैं?"),
          paragraphs: [
            L(
              "ফেরেশতারা আল্লাহর সৃষ্টি। তাঁরা আল্লাহর আদেশ অমান্য করেন না এবং তাঁকে যা করতে আদেশ করা হয় তা পালন করেন।",
              "Angels are created by Allah. They do not disobey Him and carry out what they are commanded.",
              "फ़रिश्ते अल्लाह की मख़लूक़ हैं। वे उसकी अवज्ञा नहीं करते और जो आदेश दिया जाता है उसे पूरा करते हैं।"
            )
          ]
        },
        {
          title: L("পরিচিত ফেরেশতা ও তাঁদের দায়িত্ব", "Known Angels and Their Duties", "प्रसिद्ध फ़रिश्ते और उनके काम"),
          bullets: [
            L("জিবরীল (আ.) — ওহি পৌঁছে দেওয়ার দায়িত্ব", "Jibril — conveying revelation", "जिब्रील — वही पहुँचाने की ज़िम्मेदारी"),
            L("মিকাঈল (আ.) — আল্লাহর আদেশে বৃষ্টি ও রিজিক-সংক্রান্ত ব্যবস্থার দায়িত্ব", "Mikail — assigned duties related to provision by Allah's command", "मीकाईल — अल्लाह के आदेश से रोज़ी और बारिश से जुड़े काम"),
            L("ইসরাফীল (আ.) — শিঙ্গায় ফুঁ দেওয়ার দায়িত্ব", "Israfil — assigned to blow the Trumpet", "इस्राफ़ील — सूर फूँकने की ज़िम्मेदारी"),
            L("মালাকুল মাউত — প্রাণ গ্রহণের দায়িত্ব", "Angel of Death — taking souls by Allah's command", "मलकुल मौत — अल्लाह के आदेश से जान निकालना"),
            L("কিরামান কাতিবীন — মানুষের কাজ লিপিবদ্ধ করেন", "The recording angels — recording deeds", "किरामन कातिबीन — इंसानों के कर्म लिखना")
          ]
        },
        {
          title: L("ফেরেশতাদের প্রতি ঈমানের শিক্ষা", "Lessons from Belief in Angels", "फ़रिश्तों पर ईमान की सीख"),
          paragraphs: [
            L(
              "মানুষের কথা ও কাজের হিসাব রাখা হয়—এই বিশ্বাস মানুষকে সতর্ক, সৎ ও দায়িত্বশীল হতে সাহায্য করে।",
              "Knowing that deeds are recorded encourages a person to be mindful, honest and responsible.",
              "यह विश्वास कि कर्म लिखे जाते हैं, इंसान को सावधान, सच्चा और ज़िम्मेदार बनने की प्रेरणा देता है।"
            )
          ]
        }
      ]
    },

    /* 5. BOOKS */
    {
      id: "books",
      title: L("আসমানি কিতাবসমূহ", "The Revealed Books", "आसमानी किताबें"),
      subtitle: L("আল্লাহর পক্ষ থেকে নাজিলকৃত কিতাবের প্রতি বিশ্বাস", "Belief in the books revealed by Allah", "अल्लाह की ओर से उतारी गई किताबों पर ईमान"),
      sections: [
        {
          title: L("আসমানি কিতাব কী?", "What Are the Revealed Books?", "आसमानी किताबें क्या हैं?"),
          paragraphs: [
            L(
              "আল্লাহ বিভিন্ন নবী ও রাসূলের কাছে মানুষের হিদায়াতের জন্য ওহি ও কিতাব নাজিল করেছেন। মুসলিমরা আল্লাহর পক্ষ থেকে নাজিল হওয়া সব কিতাবের মূল সত্যতায় ঈমান রাখে।",
              "Allah revealed guidance and scriptures to different prophets and messengers. Muslims believe in the original truth of all scriptures revealed by Allah.",
              "अल्लाह ने इंसानों की रहनुमाई के लिए अलग-अलग नबियों और रसूलों पर वही और किताबें उतारीं। मुसलमान अल्लाह की ओर से उतारी गई सभी किताबों की मूल सच्चाई पर ईमान रखते हैं।"
            )
          ]
        },
        {
          title: L("প্রধান চারটি কিতাব", "Four Well-Known Scriptures", "चार प्रसिद्ध आसमानी किताबें"),
          bullets: [
            L("তাওরাত — মূসা (আ.)-এর প্রতি", "Tawrat — revealed to Musa (Moses)", "तौरात — मूसा (अ.) पर"),
            L("যাবুর — দাউদ (আ.)-এর প্রতি", "Zabur — revealed to Dawud (David)", "ज़बूर — दाऊद (अ.) पर"),
            L("ইঞ্জিল — ঈসা (আ.)-এর প্রতি", "Injil — revealed to Isa (Jesus)", "इंजील — ईसा (अ.) पर"),
            L("আল-কুরআন — মুহাম্মদ ﷺ-এর প্রতি", "The Quran — revealed to Muhammad ﷺ", "अल-क़ुरआन — मुहम्मद ﷺ पर")
          ]
        },
        {
          title: L("আল-কুরআনের বৈশিষ্ট্য", "The Quran", "अल-क़ुरआन"),
          paragraphs: [
            L(
              "আল-কুরআন সর্বশেষ আসমানি কিতাব। মুসলিমদের বিশ্বাস অনুযায়ী আল্লাহ নিজেই কুরআন সংরক্ষণের দায়িত্ব নিয়েছেন। এটি মানবজাতির জন্য হিদায়াত।",
              "The Quran is the final revealed scripture. Muslims believe Allah has undertaken to preserve it. It is guidance for humanity.",
              "अल-क़ुरआन आख़िरी आसमानी किताब है। मुसलमानों का विश्वास है कि अल्लाह ने स्वयं इसकी हिफ़ाज़त की ज़िम्मेदारी ली है। यह इंसानियत के लिए रहनुमाई है।"
            )
          ]
        },
        {
          title: L("কুরআনের সংরক্ষণ", "Preservation of the Quran", "क़ुरआन की हिफ़ाज़त"),
          quote: AR(
            "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
            {
              bn: "ইন্না নাহনু নাযযালনায যিকরা ওয়া ইন্না লাহু লাহাফিযূন",
              en: "Innaa nahnu nazzalnadh-dhikra wa innaa lahu lahaafizoon",
              hi: "इन्ना नह्नु नज़्ज़लनज़-ज़िक्रा व इन्ना लहू लहाफ़िज़ून"
            },
            {
              bn: "নিশ্চয় আমিই উপদেশবাণী অবতীর্ণ করেছি এবং নিশ্চয় আমিই তার সংরক্ষক।",
              en: "Indeed, We have sent down the Reminder, and indeed, We will preserve it.",
              hi: "निस्संदेह हमने ही यह उपदेश उतारा है और हम ही इसकी हिफ़ाज़त करने वाले हैं।"
            },
            {
              bn: "সূরা আল-হিজর ১৫:৯",
              en: "Surah Al-Hijr 15:9",
              hi: "सूरह अल-हिज्र 15:9"
            }
          )
        }
      ]
    },

    /* 6. MESSENGERS */
    {
      id: "messengers",
      title: L("নবী ও রাসূলগণ", "Prophets and Messengers", "नबी और रसूल"),
      subtitle: L("নবীদের প্রতি ঈমান ও তাঁদের শিক্ষা", "Belief in the prophets and their teachings", "नबियों पर ईमान और उनकी शिक्षाएँ"),
      sections: [
        {
          title: L("নবী ও রাসূল কারা?", "Who Are Prophets and Messengers?", "नबी और रसूल कौन हैं?"),
          paragraphs: [
            L(
              "আল্লাহ মানুষের হিদায়াতের জন্য নবী ও রাসূল পাঠিয়েছেন। তাঁরা মানুষকে এক আল্লাহর ইবাদত, সৎকাজ ও ন্যায়ের পথে আহ্বান করেছেন।",
              "Allah sent prophets and messengers to guide humanity. They called people to worship One God, do good and uphold justice.",
              "अल्लाह ने इंसानों की रहनुमाई के लिए नबी और रसूल भेजे। उन्होंने लोगों को एक अल्लाह की इबादत, नेक काम और इंसाफ़ की ओर बुलाया।"
            )
          ]
        },
        {
          title: L("কুরআনে নাম উল্লেখিত ২৫ জন নবী", "The 25 Prophets Named in the Quran", "क़ुरआन में नामित 25 नबी"),
          bullets: [
            L("আদম (আ.)", "Adam", "आदम"),
            L("ইদরিস (আ.)", "Idris", "इदरीस"),
            L("নূহ (আ.)", "Nuh", "नूह"),
            L("হূদ (আ.)", "Hud", "हूद"),
            L("সালিহ (আ.)", "Salih", "सालिह"),
            L("ইবরাহিম (আ.)", "Ibrahim", "इब्राहीम"),
            L("লূত (আ.)", "Lut", "लूत"),
            L("ইসমাঈল (আ.)", "Ismail", "इस्माईल"),
            L("ইসহাক (আ.)", "Ishaq", "इसहाक़"),
            L("ইয়াকুব (আ.)", "Yaqub", "याक़ूब"),
            L("ইউসুফ (আ.)", "Yusuf", "यूसुफ़"),
            L("আইয়ুব (আ.)", "Ayyub", "अय्यूब"),
            L("শুআইব (আ.)", "Shuayb", "शुऐब"),
            L("মূসা (আ.)", "Musa", "मूसा"),
            L("হারুন (আ.)", "Harun", "हारून"),
            L("যুল-কিফল (আ.)", "Dhul-Kifl", "ज़ुल-किफ़्ल"),
            L("দাউদ (আ.)", "Dawud", "दाऊद"),
            L("সুলাইমান (আ.)", "Sulayman", "सुलेमान"),
            L("ইলিয়াস (আ.)", "Ilyas", "इलियास"),
            L("আল-ইয়াসা (আ.)", "Al-Yasa", "अल-यसअ"),
            L("ইউনুস (আ.)", "Yunus", "यूनुस"),
            L("যাকারিয়া (আ.)", "Zakariya", "ज़करिया"),
            L("ইয়াহইয়া (আ.)", "Yahya", "यहया"),
            L("ঈসা (আ.)", "Isa", "ईसा"),
            L("মুহাম্মদ ﷺ", "Muhammad ﷺ", "मुहम्मद ﷺ")
          ]
        },
        {
          title: L("রাসূলুল্লাহ ﷺ-এর শেষ নবী হওয়া", "Muhammad ﷺ as the Final Prophet", "मुहम्मद ﷺ आख़िरी नबी"),
          quote: AR(
            "مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللّٰهِ وَخَاتَمَ النَّبِيِّينَ",
            {
              bn: "মা কানা মুহাম্মাদুন আবা আহাদিম মির রিজালিকুম ওয়ালাকির রাসূলাল্লাহি ওয়া খাতামান নাবিয়্যীন",
              en: "Maa kaana Muhammadun abaa ahadim mir-rijaalikum wa laakin rasoolallaahi wa khaataman-nabiyyeen",
              hi: "मा काना मुहम्मदुन अबा अहदिम मिर-रिजालिकुम व लाकिर रसूलल्लाहि व ख़ातमन-नबिय्यीन"
            },
            {
              bn: "মুহাম্মদ তোমাদের কোনো পুরুষের পিতা নন; বরং তিনি আল্লাহর রাসূল এবং শেষ নবী।",
              en: "Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the Prophets.",
              hi: "मुहम्मद तुम्हारे पुरुषों में से किसी के पिता नहीं, बल्कि अल्लाह के रसूल और आख़िरी नबी हैं।"
            },
            {
              bn: "সূরা আল-আহযাব ৩৩:৪০",
              en: "Surah Al-Ahzab 33:40",
              hi: "सूरह अल-अहज़ाब 33:40"
            }
          )
        },
        {
          title: L("নবীদের প্রতি আমাদের কর্তব্য", "Our Duties Toward the Prophets", "नबियों के प्रति हमारी ज़िम्मेदारी"),
          bullets: [
            L("সব নবী ও রাসূলের প্রতি ঈমান রাখা", "Believe in all prophets and messengers", "सभी नबियों और रसूलों पर ईमान रखना"),
            L("তাঁদের সম্মান করা", "Respect them", "उनका सम्मान करना"),
            L("তাঁদের শিক্ষা থেকে শিক্ষা নেওয়া", "Learn from their teachings", "उनकी शिक्षाओं से सीखना"),
            L("মুহাম্মদ ﷺ-এর সুন্নাহ অনুসরণ করা", "Follow the Sunnah of Muhammad ﷺ", "मुहम्मद ﷺ की सुन्नत पर अमल करना")
          ]
        }
      ]
    },

    /* 7. AFTERLIFE */
    {
      id: "afterlife",
      title: L("আখিরাত ও পরকাল", "The Hereafter", "आख़िरत"),
      subtitle: L("মৃত্যু, পুনরুত্থান ও হিসাবের বিশ্বাস", "Belief in death, resurrection and accountability", "मौत, दोबारा उठाए जाने और हिसाब पर ईमान"),
      sections: [
        {
          title: L("আখিরাত কী?", "What Is the Hereafter?", "आख़िरत क्या है?"),
          paragraphs: [
            L(
              "আখিরাত হলো মৃত্যুর পরের স্থায়ী জীবন। ইসলামে বিশ্বাস করা হয় যে মানুষকে পুনরুত্থিত করা হবে এবং দুনিয়ার কাজের হিসাব দিতে হবে।",
              "The Hereafter is the everlasting life after death. Islam teaches that people will be resurrected and held accountable for their deeds in this world.",
              "आख़िरत मौत के बाद की हमेशा रहने वाली ज़िंदगी है। इस्लाम के अनुसार इंसानों को दोबारा उठाया जाएगा और दुनिया के कर्मों का हिसाब देना होगा।"
            )
          ]
        },
        {
          title: L("আখিরাতের গুরুত্বপূর্ণ পর্যায়", "Important Stages of the Hereafter", "आख़िरत के अहम मरहले"),
          bullets: [
            L("মৃত্যু", "Death", "मौत"),
            L("কবরের জীবন ও বারযাখ", "Life of the grave and Barzakh", "क़ब्र की ज़िंदगी और बरज़ख़"),
            L("কিয়ামত", "The Day of Resurrection", "क़ियामत"),
            L("পুনরুত্থান", "Resurrection", "दोबारा उठाया जाना"),
            L("হিসাব ও আমলনামা", "Accountability and record of deeds", "हिसाब और अमालनामा"),
            L("মীযান", "The Balance", "मीज़ान"),
            L("জান্নাত ও জাহান্নাম", "Paradise and Hell", "जन्नत और जहन्नम")
          ]
        },
        {
          title: L("কিয়ামতের দিনের কথা", "The Day of Judgment", "क़ियामत का दिन"),
          quote: AR(
            "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ",
            {
              bn: "কুল্লু নাফসিন যায়িকাতুল মাউত, ওয়া ইন্নামা তুওয়াফফাওনা উজূরাকুম ইয়াওমাল কিয়ামাহ",
              en: "Kullu nafsin dhaa'iqatul-mawt, wa innamaa tuwaffawna ujoorakum yawmal-qiyaamah",
              hi: "कुल्लु नफ़्सिन ज़ाइक़तुल-मौत, व इन्नमा तुवफ़्फ़ौना उजूरकुम यौमल-क़ियामह"
            },
            {
              bn: "প্রত্যেক প্রাণী মৃত্যুর স্বাদ গ্রহণ করবে। আর কিয়ামতের দিনই তোমাদের প্রতিদান পূর্ণভাবে দেওয়া হবে।",
              en: "Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection.",
              hi: "हर जान को मौत का स्वाद चखना है और क़ियामत के दिन ही तुम्हें पूरा बदला दिया जाएगा।"
            },
            {
              bn: "সূরা আলে ইমরান ৩:১৮৫",
              en: "Surah Aal-Imran 3:185",
              hi: "सूरह आले-इमरान 3:185"
            }
          )
        },
        {
          title: L("আখিরাতের প্রস্তুতি", "Preparing for the Hereafter", "आख़िरत की तैयारी"),
          bullets: [
            L("নিয়মিত নামাজ আদায় করা", "Perform prayers regularly", "नियमित नमाज़ पढ़ना"),
            L("সৎকর্ম ও মানুষের হক আদায় করা", "Do good deeds and fulfil people's rights", "नेक काम करना और लोगों के हक़ अदा करना"),
            L("গুনাহ থেকে তওবা করা", "Repent from sins", "गुनाहों से तौबा करना"),
            L("আল্লাহর কাছে ক্ষমা ও রহমত চাওয়া", "Seek Allah's forgiveness and mercy", "अल्लाह से माफ़ी और रहमत माँगना")
          ]
        }
      ]
    },

    /* 8. QADAR */
    {
      id: "qadar",
      title: L("তাকদিরের প্রতি ঈমান", "Belief in Qadar", "तक़दीर पर ईमान"),
      subtitle: L("আল্লাহর জ্ঞান, ইচ্ছা ও মানুষের দায়িত্ব", "Allah's knowledge, will and human responsibility", "अल्लाह का ज्ञान, इच्छा और इंसान की ज़िम्मेदारी"),
      sections: [
        {
          title: L("তাকদির কী?", "What Is Qadar?", "तक़दीर क्या है?"),
          paragraphs: [
            L(
              "তাকদিরের অর্থ হলো আল্লাহ সবকিছু জানেন এবং তাঁর জ্ঞান ও ইচ্ছার বাইরে কিছু ঘটে না। মানুষের ইচ্ছা ও কাজের জন্যও সে দায়বদ্ধ।",
              "Qadar means that Allah has complete knowledge of everything and nothing occurs outside His knowledge and will. Human beings remain accountable for their choices and actions.",
              "तक़दीर का अर्थ है कि अल्लाह को हर चीज़ का पूरा ज्ञान है और उसकी जानकारी तथा इच्छा के बाहर कुछ नहीं होता। इंसान अपने चुनाव और कर्मों के लिए जवाबदेह है।"
            )
          ]
        },
        {
          title: L("তাকদিরে বিশ্বাসের শিক্ষা", "Lessons of Belief in Qadar", "तक़दीर पर ईमान की सीख"),
          bullets: [
            L("আল্লাহর জ্ঞানের ওপর বিশ্বাস রাখা", "Believe in Allah's complete knowledge", "अल्लाह के पूर्ण ज्ञान पर विश्वास रखना"),
            L("সঠিক কাজের চেষ্টা করা", "Make sincere efforts to do what is right", "सही काम करने की कोशिश करना"),
            L("বিপদে ধৈর্য ধারণ করা", "Remain patient during hardship", "मुसीबत में सब्र करना"),
            L("সাফল্যে কৃতজ্ঞ থাকা", "Be grateful in times of success", "कामयाबी पर शुक्र अदा करना"),
            L("নিজের ভুলের দায়িত্ব নেওয়া", "Take responsibility for one's mistakes", "अपनी ग़लतियों की ज़िम्मेदारी लेना")
          ]
        },
        {
          title: L("তাওয়াক্কুল", "Tawakkul", "तवक्कुल"),
          paragraphs: [
            L(
              "তাওয়াক্কুল হলো যথাসাধ্য বৈধ চেষ্টা করার পর ফলাফলের জন্য আল্লাহর ওপর ভরসা রাখা। চেষ্টা ছেড়ে দিয়ে নিষ্ক্রিয় থাকা তাওয়াক্কুল নয়।",
              "Tawakkul means relying upon Allah after making appropriate and lawful effort. It does not mean abandoning effort or responsibility.",
              "तवक्कुल का अर्थ है जायज़ और पूरी कोशिश करने के बाद नतीजे के लिए अल्लाह पर भरोसा रखना। कोशिश छोड़ देना तवक्कुल नहीं है।"
            )
          ]
        },
        {
          title: L("কুরআনের নির্দেশনা", "Guidance from the Quran", "क़ुरआन की रहनुमाई"),
          quote: AR(
            "إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ",
            {
              bn: "ইন্না কুল্লা শাইইন খালাকনাহু বিকাদার",
              en: "Innaa kulla shay'in khalaqnaahu biqadar",
              hi: "इन्ना कुल्ला शैइन ख़लक़नाहु बिक़दर"
            },
            {
              bn: "নিশ্চয়ই আমি প্রত্যেক জিনিস নির্ধারিত পরিমাপে সৃষ্টি করেছি।",
              en: "Indeed, We created everything according to a precise measure.",
              hi: "निस्संदेह हमने हर चीज़ को एक निश्चित अंदाज़े के अनुसार पैदा किया।"
            },
            {
              bn: "সূরা আল-কামার ৫৪:৪৯",
              en: "Surah Al-Qamar 54:49",
              hi: "सूरह अल-क़मर 54:49"
            }
          )
        }
      ]
    },

    /* 9. COMPANIONS */
    {
      id: "companions",
      title: L("সাহাবায়ে কেরাম", "The Companions", "सहाबा-ए-किराम"),
      subtitle: L("রাসূলুল্লাহ ﷺ-এর সাহাবিদের পরিচয় ও মর্যাদা", "The companions of Prophet Muhammad ﷺ", "रसूलुल्लाह ﷺ के सहाबियों का परिचय"),
      sections: [
        {
          title: L("সাহাবি কারা?", "Who Are the Companions?", "सहाबी कौन हैं?"),
          paragraphs: [
            L(
              "সাহাবি হলেন সেই ব্যক্তি, যিনি ঈমানের সঙ্গে নবী মুহাম্মদ ﷺ-এর সাক্ষাৎ লাভ করেছেন এবং ইসলামের ওপর মৃত্যুবরণ করেছেন।",
              "A Companion is someone who met Prophet Muhammad ﷺ as a believer and died upon Islam.",
              "सहाबी वह व्यक्ति हैं जिन्होंने ईमान की हालत में नबी मुहम्मद ﷺ से मुलाक़ात की और इस्लाम पर मृत्यु पाई।"
            )
          ]
        },
        {
          title: L("চার খলিফায়ে রাশেদীন", "The Four Rightly Guided Caliphs", "चार ख़ुलफ़ा-ए-राशिदीन"),
          bullets: [
            L("আবু বকর আস-সিদ্দীক (রা.)", "Abu Bakr as-Siddiq", "अबू बक्र सिद्दीक़"),
            L("উমর ইবনুল খাত্তাব (রা.)", "Umar ibn al-Khattab", "उमर इब्नुल ख़त्ताब"),
            L("উসমান ইবনু আফফান (রা.)", "Uthman ibn Affan", "उस्मान इब्न अफ़्फ़ान"),
            L("আলী ইবনু আবি তালিব (রা.)", "Ali ibn Abi Talib", "अली इब्न अबी तालिब")
          ]
        },
        {
          title: L("আশারায়ে মুবাশশারা", "The Ten Given Glad Tidings of Paradise", "अशरा-ए-मुबश्शरा"),
          bullets: [
            L("আবু বকর (রা.)", "Abu Bakr", "अबू बक्र"),
            L("উমর (রা.)", "Umar", "उमर"),
            L("উসমান (রা.)", "Uthman", "उस्मान"),
            L("আলী (রা.)", "Ali", "अली"),
            L("তালহা ইবনু উবাইদুল্লাহ (রা.)", "Talha ibn Ubaydullah", "तल्हा इब्न उबैदुल्लाह"),
            L("যুবাইর ইবনুল আওয়াম (রা.)", "Zubayr ibn al-Awwam", "ज़ुबैर इब्नुल अव्वाम"),
            L("আবদুর রহমান ইবনু আউফ (রা.)", "Abd al-Rahman ibn Awf", "अब्दुर्रहमान इब्न औफ़"),
            L("সাদ ইবনু আবি ওয়াক্কাস (রা.)", "Sa'd ibn Abi Waqqas", "सअद इब्न अबी वक़्क़ास"),
            L("সাঈদ ইবনু যায়েদ (রা.)", "Sa'id ibn Zayd", "सईद इब्न ज़ैद"),
            L("আবু উবাইদাহ ইবনুল জাররাহ (রা.)", "Abu Ubaydah ibn al-Jarrah", "अबू उबैदह इब्नुल जर्राह")
          ]
        },
        {
          title: L("সাহাবিদের কাছ থেকে শিক্ষা", "Lessons from the Companions", "सहाबियों से सीख"),
          bullets: [
            L("সত্যবাদিতা ও আমানতদারি", "Truthfulness and trustworthiness", "सच्चाई और अमानतदारी"),
            L("ত্যাগ ও ধৈর্য", "Sacrifice and patience", "क़ुर्बानी और सब्र"),
            L("ইলম অর্জন ও আমল", "Seeking knowledge and acting upon it", "इल्म हासिल करना और उस पर अमल"),
            L("ন্যায়বিচার ও মানুষের সেবা", "Justice and service to people", "इंसाफ़ और लोगों की सेवा")
          ]
        }
      ]
    },

    /* 10. PRACTICE */
    {
      id: "practice",
      title: L("ঈমান ও আকিদার অনুশীলন", "Practising Iman and Aqidah", "ईमान और अक़ीदे पर अमल"),
      subtitle: L("বিশ্বাসকে জীবনে বাস্তবায়ন করার উপায়", "Putting belief into daily life", "ईमान को रोज़मर्रा की ज़िंदगी में अपनाना"),
      sections: [
        {
          title: L("দৈনন্দিন জীবনে ঈমান", "Iman in Daily Life", "रोज़मर्रा की ज़िंदगी में ईमान"),
          bullets: [
            L("পাঁচ ওয়াক্ত নামাজ আদায় করা", "Perform the five daily prayers", "पाँचों वक़्त की नमाज़ पढ़ना"),
            L("কুরআন পড়া ও অর্থ বোঝার চেষ্টা করা", "Read the Quran and try to understand its meaning", "क़ुरआन पढ़ना और उसका अर्थ समझना"),
            L("হালাল উপার্জন করা", "Earn through lawful means", "हलाल रोज़ी कमाना"),
            L("সত্য কথা বলা ও প্রতিশ্রুতি রক্ষা করা", "Speak truthfully and keep promises", "सच बोलना और वादा निभाना"),
            L("মা-বাবা ও পরিবারের হক আদায় করা", "Fulfil the rights of parents and family", "माता-पिता और परिवार के हक़ अदा करना"),
            L("প্রতিবেশী ও মানুষের সঙ্গে ভালো ব্যবহার করা", "Treat neighbours and others well", "पड़ोसियों और लोगों के साथ अच्छा व्यवहार करना")
          ]
        },
        {
          title: L("যে কাজগুলো থেকে বেঁচে থাকতে হবে", "Things to Avoid", "जिन कामों से बचना चाहिए"),
          bullets: [
            L("শিরক ও কুসংস্কার", "Shirk and superstition", "शिर्क और अंधविश्वास"),
            L("মিথ্যা, প্রতারণা ও গিবত", "Lying, deception and backbiting", "झूठ, धोखा और ग़ीबत"),
            L("অন্যের অধিকার নষ্ট করা", "Violating the rights of others", "दूसरों के हक़ मारना"),
            L("অহংকার ও হিংসা", "Arrogance and envy", "घमंड और जलन"),
            L("অন্যায় ও জুলুম", "Injustice and oppression", "नाइंसाफ़ी और ज़ुल्म")
          ]
        },
        {
          title: L("তওবা ও ইস্তিগফার", "Repentance and Seeking Forgiveness", "तौबा और इस्तिग़फ़ार"),
          quote: AR(
            "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
            {
              bn: "রব্বানা যালামনা আনফুসানা ওয়া ইল্লাম তাগফির লানা ওয়া তারহামনা লানাকূনান্না মিনাল খাসিরীন",
              en: "Rabbanaa zalamnaa anfusanaa wa illam taghfir lanaa wa tarhamnaa lanakoonanna minal-khaasireen",
              hi: "रब्बना ज़लमना अनफ़ुसना व इल्लम तग़फ़िर लना व तरहमना लनकूनन्ना मिनल-ख़ासिरीन"
            },
            {
              bn: "হে আমাদের রব! আমরা নিজেদের প্রতি জুলুম করেছি। আপনি যদি আমাদের ক্ষমা না করেন ও দয়া না করেন, তবে আমরা অবশ্যই ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।",
              en: "Our Lord, we have wronged ourselves. If You do not forgive us and have mercy upon us, we will surely be among the losers.",
              hi: "ऐ हमारे रब! हमने अपनी जानों पर ज़ुल्म किया। यदि तू हमें माफ़ न करे और हम पर रहम न करे तो हम नुक़सान उठाने वालों में होंगे।"
            },
            {
              bn: "সূরা আল-আ'রাফ ৭:২৩",
              en: "Surah Al-A'raf 7:23",
              hi: "सूरह अल-आ'राफ़ 7:23"
            }
          )
        },
        {
          title: L("মনে রাখুন", "Remember", "याद रखें"),
          paragraphs: [
            L(
              "ঈমান শুধু মুখের কথা নয়; বিশ্বাস, ইবাদত, চরিত্র ও মানুষের সঙ্গে আচরণে তার প্রভাব থাকা উচিত। ভুল হলে আন্তরিকভাবে তওবা করুন এবং সংশোধনের চেষ্টা করুন।",
              "Iman is not merely a statement. It should influence belief, worship, character and how we treat others. When you make a mistake, repent sincerely and try to improve.",
              "ईमान केवल ज़ुबान की बात नहीं है। इसका असर विश्वास, इबादत, चरित्र और लोगों के साथ व्यवहार में दिखना चाहिए। ग़लती हो तो सच्चे दिल से तौबा करें और सुधार की कोशिश करें।"
            )
          ]
        }
      ]
    }
  ];

  /* ---------------------------------------------------------
     PAGE UI TEXT
  --------------------------------------------------------- */

  const UI = {
    bn: {
      pageTitle: "ঈমান ও আকিদা",
      subtitle: "বিশ্বাস, জ্ঞান ও সুন্দর জীবনের পথে",
      footer: "ঈমানকে জানুন, আকিদাকে শুদ্ধ রাখুন, আমলে এগিয়ে চলুন।",
      intro: "ইসলামের মৌলিক বিশ্বাস, আল্লাহর পরিচয়, নবী-রাসূল, আসমানি কিতাব, আখিরাত ও দৈনন্দিন জীবনে ঈমানের অনুশীলন সম্পর্কে জানুন।",
      readMore: "পাঠ শুরু করুন",
      back: "ফিরে যান",
      pronunciation: "উচ্চারণ (শেখার সহায়িকা)",
      meaning: "অর্থ",
      reference: "সূত্র",
      note: "বিশেষ দ্রষ্টব্য",
      noteText: "আরবি উচ্চারণ শেখার জন্য নির্ভরযোগ্য শিক্ষক বা বিশুদ্ধ তিলাওয়াত শুনুন। বাংলা ও হিন্দি উচ্চারণ কেবল সহায়িকা।",
      lesson: "পাঠ",
      noContent: "এই বিষয়ের বিষয়বস্তু পাওয়া যায়নি।"
    },
    en: {
      pageTitle: "Iman and Aqidah",
      subtitle: "On the path of faith, knowledge and a good life",
      footer: "Learn Iman, strengthen Aqidah and live by good deeds.",
      intro: "Learn about the foundations of Islamic belief, Allah, prophets, revealed books, the Hereafter and practising faith in everyday life.",
      readMore: "Start learning",
      back: "Go back",
      pronunciation: "Pronunciation (learning aid)",
      meaning: "Meaning",
      reference: "Reference",
      note: "Important note",
      noteText: "Learn Arabic pronunciation from a qualified teacher or authentic recitation. Bengali and Hindi transliterations are only learning aids.",
      lesson: "Lesson",
      noContent: "Content for this topic could not be found."
    },
    hi: {
      pageTitle: "ईमान और अक़ीदा",
      subtitle: "ईमान, इल्म और अच्छे जीवन की राह",
      footer: "ईमान को जानें, अक़ीदे को मज़बूत करें और नेक अमल करें।",
      intro: "इस्लामी विश्वास की बुनियाद, अल्लाह, नबी-रसूल, आसमानी किताबें, आख़िरत और रोज़मर्रा की ज़िंदगी में ईमान पर अमल के बारे में जानें।",
      readMore: "सीखना शुरू करें",
      back: "वापस जाएँ",
      pronunciation: "उच्चारण (सीखने में सहायता)",
      meaning: "अर्थ",
      reference: "संदर्भ",
      note: "ज़रूरी बात",
      noteText: "अरबी उच्चारण किसी योग्य शिक्षक या सही तिलावत से सीखें। बंगाली और हिंदी उच्चारण केवल सहायता के लिए हैं।",
      lesson: "पाठ",
      noContent: "इस विषय की सामग्री नहीं मिली।"
    }
  };

  /* ---------------------------------------------------------
     DOM RENDERING HELPERS
  --------------------------------------------------------- */

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) {
      element.textContent = localizeDigits(text);
    }
    return element;
  }

  function renderQuote(item) {
    const board = makeElement("article", "iman-quote-board");

    const arabic = makeElement("p", "iman-arabic-text", item.arabic);
    arabic.setAttribute("dir", "rtl");
    arabic.setAttribute("lang", "ar");
    arabic.setAttribute("translate", "no");
    board.appendChild(arabic);

    const pronunciationTitle = makeElement(
      "h4",
      "iman-quote-label",
      UI[currentLanguage].pronunciation
    );
    board.appendChild(pronunciationTitle);

    const pronunciation = makeElement(
      "p",
      "iman-pronunciation",
      t(item.pronunciation)
    );
    board.appendChild(pronunciation);

    const meaningTitle = makeElement(
      "h4",
      "iman-quote-label",
      UI[currentLanguage].meaning
    );
    board.appendChild(meaningTitle);

    const meaning = makeElement(
      "p",
      "iman-meaning",
      t(item.meaning)
    );
    board.appendChild(meaning);

    if (item.reference) {
      const reference = makeElement(
        "p",
        "iman-reference",
        `${UI[currentLanguage].reference}: ${t(item.reference)}`
      );
      board.appendChild(reference);
    }

    return board;
  }

  function renderSection(section, index) {
    const board = makeElement("article", "iman-content-board");

    const heading = makeElement(
      "h3",
      "iman-section-heading",
      `${localizeDigits(index + 1)}. ${t(section.title)}`
    );
    board.appendChild(heading);

    if (section.paragraphs) {
      section.paragraphs.forEach(paragraph => {
        board.appendChild(
          makeElement("p", "iman-paragraph", t(paragraph))
        );
      });
    }

    if (section.bullets) {
      const list = makeElement("ul", "iman-list");

      section.bullets.forEach(item => {
        const li = makeElement("li", "", t(item));
        list.appendChild(li);
      });

      board.appendChild(list);
    }

    if (section.quote) {
      board.appendChild(renderQuote(section.quote));
    }

    if (section.note) {
      const note = makeElement("p", "iman-note", t(section.note));
      board.appendChild(note);
    }

    return board;
  }

  function renderTopic(topicId) {
    const lesson = LESSONS.find(item => item.id === topicId);
    if (!lesson) return;

    const target = document.getElementById(`content-${topicId}`);
    if (!target) {
      console.warn(`IBADAT Iman: #content-${topicId} was not found.`);
      return;
    }

    target.replaceChildren();

    const introBoard = makeElement("article", "iman-intro-board");

    introBoard.appendChild(
      makeElement("h2", "iman-topic-title", t(lesson.title))
    );

    introBoard.appendChild(
      makeElement("p", "iman-topic-subtitle", t(lesson.subtitle))
    );

    target.appendChild(introBoard);

    lesson.sections.forEach((section, index) => {
      target.appendChild(renderSection(section, index));
    });

    const noteBoard = makeElement("article", "iman-note-board");
    noteBoard.appendChild(
      makeElement("h3", "", UI[currentLanguage].note)
    );
    noteBoard.appendChild(
      makeElement("p", "", UI[currentLanguage].noteText)
    );
    target.appendChild(noteBoard);

    target.hidden = false;
  }

  function hideAllTopicContents() {
    LESSONS.forEach(lesson => {
      const content = document.getElementById(`content-${lesson.id}`);
      if (content) content.hidden = true;
    });
  }

  /* ---------------------------------------------------------
     TOPIC CARDS
  --------------------------------------------------------- */

  function updateTopicCards() {
    LESSONS.forEach(lesson => {
      const cards = $$(
        `.purity-topic[data-topic="${lesson.id}"]`
      );

      cards.forEach(card => {
        const title = $(".topic-heading", card);
        if (title) safeText(title, lesson.title);

        card.setAttribute("aria-label", t(lesson.title));
        card.setAttribute("aria-expanded", String(currentTopic === lesson.id));
      });
    });
  }

  function openTopic(topicId) {
    const lesson = LESSONS.find(item => item.id === topicId);
    if (!lesson) return;

    currentTopic = topicId;

    const page = $("#imanPage");
    const lessons = $("#purityLessons");

    hideAllTopicContents();
    renderTopic(topicId);

    if (page) page.dataset.activeTopic = topicId;
    if (lessons) lessons.dataset.activeTopic = topicId;

    updateTopicCards();

    const target = document.getElementById(`content-${topicId}`);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    window.dispatchEvent(
      new CustomEvent("ibadat:iman-topic-opened", {
        detail: { topic: topicId }
      })
    );
  }

  function closeTopic() {
    currentTopic = null;
    hideAllTopicContents();

    const page = $("#imanPage");
    const lessons = $("#purityLessons");

    if (page) delete page.dataset.activeTopic;
    if (lessons) delete lessons.dataset.activeTopic;

    updateTopicCards();
  }

  /* ---------------------------------------------------------
     PAGE HEADER AND FOOTER
  --------------------------------------------------------- */

  function updatePageText() {
    const ui = UI[currentLanguage];

    safeText($("#pageTitle"), ui.pageTitle);
    safeText($("#footerText"), ui.footer);

    const intro = $("#imanIntro");
    if (intro) safeText(intro, ui.intro);

    const subtitle = $("#pageSubtitle");
    if (subtitle) safeText(subtitle, ui.subtitle);
  }

  /* ---------------------------------------------------------
     FULL PAGE RENDER
  --------------------------------------------------------- */

  function renderPage() {
    if (renderLock) return;
    renderLock = true;

    try {
      updatePageText();
      updateTopicCards();

      if (currentTopic) {
        renderTopic(currentTopic);
      } else {
        hideAllTopicContents();
      }

      window.dispatchEvent(
        new CustomEvent("ibadat:iman-rendered", {
          detail: {
            language: currentLanguage,
            theme: currentTheme,
            topic: currentTopic
          }
        })
      );
    } finally {
      renderLock = false;
    }
  }

  /* ---------------------------------------------------------
     PUBLIC API
  --------------------------------------------------------- */

  function setLanguage(language) {
    currentLanguage = normalizeLanguage(language);
    renderPage();
  }

  function setTheme(theme, darkMode) {
    currentTheme = normalizeTheme(theme);

    if (typeof darkMode === "boolean") {
      isDark = darkMode;
    }

    document.documentElement.dataset.colorTheme = currentTheme;
    document.body.dataset.colorTheme = currentTheme;

    document.documentElement.dataset.mode = isDark ? "dark" : "light";
    document.body.dataset.mode = isDark ? "dark" : "light";

    document.body.classList.toggle("dark-mode", isDark);
    document.documentElement.classList.toggle("dark-mode", isDark);

    renderPage();
  }

  function syncSettings() {
    applySettings();
  }

  function getTopics() {
    return LESSONS.map(lesson => ({
      id: lesson.id,
      title: t(lesson.title),
      subtitle: t(lesson.subtitle)
    }));
  }

  window.IBADATIman = {
    setLanguage,
    setTheme,
    syncSettings,
    getLanguage: () => currentLanguage,
    getTheme: () => currentTheme,
    getTopics,
    openTopic,
    closeTopic
  };

  /* ---------------------------------------------------------
     EVENTS
  --------------------------------------------------------- */

  document.addEventListener("click", event => {
    const card = event.target.closest(".purity-topic[data-topic]");
    if (!card) return;

    const topicId = card.dataset.topic;
    if (LESSONS.some(lesson => lesson.id === topicId)) {
      openTopic(topicId);
    }
  });

  document.addEventListener("click", event => {
    const closeButton = event.target.closest("[data-iman-close]");
    if (closeButton) closeTopic();
  });

  window.addEventListener("ibadat:language-changed", event => {
    const language =
      event.detail?.language ||
      event.detail?.lang;

    if (language) setLanguage(language);
    else syncSettings();
  });

  window.addEventListener("ibadat:theme-changed", event => {
    const theme =
      event.detail?.theme ||
      event.detail?.colorTheme;

    const dark =
      event.detail?.darkMode ??
      event.detail?.dark;

    if (theme) setTheme(theme, typeof dark === "boolean" ? dark : undefined);
    else syncSettings();
  });

  window.addEventListener("ibadat:settings-changed", syncSettings);
  window.addEventListener("settings:changed", syncSettings);

  window.addEventListener("storage", event => {
    if (!event.key || event.key === SETTINGS_KEY) {
      syncSettings();
    }
  });

  /* ---------------------------------------------------------
     WATCH PARENT SETTINGS
  --------------------------------------------------------- */

  function setupSettingsObserver() {
    if (observer) observer.disconnect();

    observer = new MutationObserver(mutations => {
      const relevant = mutations.some(mutation => {
        if (mutation.type === "attributes") {
          return [
            "data-lang",
            "data-language",
            "data-color-theme",
            "data-mode",
            "class"
          ].includes(mutation.attributeName);
        }
        return false;
      });

      if (relevant) {
        const newLanguage = readLanguage();
        const newThemeBefore = currentTheme;
        const newDarkBefore = isDark;

        readTheme();

        if (
          newLanguage !== currentLanguage ||
          currentTheme !== newThemeBefore ||
          isDark !== newDarkBefore
        ) {
          currentLanguage = newLanguage;
          renderPage();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [
        "lang",
        "class",
        "data-lang",
        "data-language",
        "data-color-theme",
        "data-mode"
      ]
    });

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: [
          "class",
          "data-lang",
          "data-language",
          "data-color-theme",
          "data-mode"
        ]
      });
    }
  }

  /* ---------------------------------------------------------
     INITIALIZATION
  --------------------------------------------------------- */

  function initialize() {
    currentLanguage = readLanguage();
    readTheme();

    // Render only into existing page containers.
    const page = $("#imanPage");
    const lessons = $("#purityLessons");

    if (!page || !lessons) {
      console.warn(
        "IBADAT Iman: #imanPage or #purityLessons was not found. Check the HTML IDs."
      );
    }

    updatePageText();
    updateTopicCards();
    hideAllTopicContents();

    const initialTopic = new URLSearchParams(location.search).get("topic");

    if (initialTopic && LESSONS.some(item => item.id === initialTopic)) {
      openTopic(initialTopic);
    }

    setupSettingsObserver();

    window.dispatchEvent(
      new CustomEvent("ibadat:iman-ready", {
        detail: {
          language: currentLanguage,
          theme: currentTheme,
          topics: LESSONS.length
        }
      })
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

})();
