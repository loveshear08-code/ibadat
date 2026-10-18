/* =========================================
   IBADAT — Namaz Conditions
   Bengali / English / Hindi
   Light / Dark theme
   ========================================= */

(() => {
  "use strict";

  const translations = {
    bn: {
      pageTitle: "নামাজের শর্ত",
      introText: "নামাজ শুদ্ধ হওয়ার জন্য প্রয়োজনীয় বিষয়গুলো সহজভাবে শিখে নাও।",
      pageSubtitle: "নামাজ আদায়ের আগে যে বিষয়গুলো জানা জরুরি",

      intro: {
        kicker: "প্রথম ধাপ",
        title: "পরিচয় ও গুরুত্ব",
        lead: "নামাজ ইসলামের অন্যতম গুরুত্বপূর্ণ ইবাদত। নামাজ শুদ্ধভাবে আদায়ের জন্য কিছু শর্ত পূরণ করা জরুরি।",
        beforeTitle: "নামাজের আগে",
        before: [
          "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা।",
          "নামাজের সময় হয়েছে কি না নিশ্চিত হওয়া।",
          "সতর ঢেকে কিবলামুখী হয়ে দাঁড়ানো।"
        ],
        noteTitle: "মনে রাখবে",
        note: "নামাজের শর্তগুলো পূরণ করে মনোযোগ ও বিনয়ের সঙ্গে নামাজ আদায়ের চেষ্টা করো।"
      },

      niyot: {
        kicker: "দ্বিতীয় ধাপ",
        title: "নিয়ত",
        lead: "নিয়ত হলো অন্তরের ইচ্ছা—কোন নামাজ আদায় করা হচ্ছে, তা মনে স্থির করা।",
        howTitle: "কীভাবে নিয়ত করবে",
        how: [
          "কোন নামাজ আদায় করবে, তা মনে স্থির করো।",
          "নিয়ত মুখে উচ্চারণ করা আবশ্যক নয়; অন্তরের ইচ্ছাই মূল বিষয়।",
          "এরপর মনোযোগ দিয়ে নামাজ শুরু করো।"
        ],
        noteTitle: "মনে রাখবে",
        note: "নিয়ত নিয়ে অযথা দুশ্চিন্তা বা বারবার সন্দেহ করার প্রয়োজন নেই।"
      },

      qibla: {
        kicker: "তৃতীয় ধাপ",
        title: "কিবলামুখী হওয়া",
        lead: "নামাজের সময় কাবা শরিফের দিক, অর্থাৎ কিবলামুখী হয়ে দাঁড়াতে হয়।",
        checkTitle: "যা যাচাই করবে",
        check: [
          "সম্ভব হলে কিবলার দিক নিশ্চিত করে নাও।",
          "ভ্রমণে থাকলে নির্ভরযোগ্য দিকনির্দেশনা ব্যবহার করো।",
          "দিক নির্ধারণে আন্তরিক চেষ্টা করো।"
        ],
        noteTitle: "বিশেষ অবস্থা",
        note: "অক্ষমতা বা কিবলার দিক নির্ধারণে অনিশ্চয়তার মতো পরিস্থিতিতে করণীয় জানতে বিশ্বস্ত আলেমের পরামর্শ নাও।"
      },

      poshak: {
        kicker: "চতুর্থ ধাপ",
        title: "সতর ঢাকা ও পোশাক",
        lead: "নামাজের জন্য শরিয়ত নির্ধারিত সতর ঢেকে রাখা এবং পবিত্র পোশাক পরা জরুরি।",
        checkTitle: "পোশাক যাচাই করো",
        check: [
          "পোশাক শরীরের আবশ্যক অংশ ঢেকে রাখছে কি না দেখো।",
          "পোশাকে নাপাকি আছে কি না যাচাই করো।",
          "পোশাক যেন স্বচ্ছ না হয় এবং যথাযথভাবে সতর ঢাকে।"
        ],
        noteTitle: "মনে রাখবে",
        note: "সতরের বিস্তারিত বিধান নারী-পুরুষ ও পরিস্থিতি অনুযায়ী ভিন্ন হতে পারে। প্রয়োজনে নির্ভরযোগ্য আলেমের কাছে জেনে নাও।"
      },

      prostuti: {
        kicker: "পঞ্চম ধাপ",
        title: "সময় ও প্রস্তুতি",
        lead: "প্রত্যেক ফরজ নামাজের নির্ধারিত সময় রয়েছে। সময় প্রবেশের আগে সেই ফরজ নামাজ আদায় করা যায় না।",
        checkTitle: "নামাজের আগে",
        check: [
          "নামাজের নির্ধারিত সময় হয়েছে কি না নিশ্চিত হও।",
          "প্রয়োজনীয় পবিত্রতা অর্জন করো।",
          "পরিষ্কার ও উপযুক্ত স্থান বেছে নাও।",
          "নামাজের জন্য মনকে প্রস্তুত করো।"
        ],
        noteTitle: "মনে রাখবে",
        note: "জামাতে নামাজ আদায়ের সুযোগ থাকলে জামাতে অংশ নেওয়ার চেষ্টা করো।"
      },

      osusthota: {
        kicker: "ষষ্ঠ ধাপ",
        title: "অসুস্থতা ও বিশেষ অবস্থা",
        lead: "ইসলামে মানুষের সামর্থ্য ও অসুবিধার বিষয়টি বিবেচনা করা হয়েছে। অসুস্থতার কারণে নামাজের পদ্ধতিতে ছাড় থাকতে পারে।",
        guidanceTitle: "করণীয়",
        guidance: [
          "দাঁড়াতে অক্ষম হলে শরিয়তের নির্দেশনা অনুযায়ী বসে নামাজ আদায় করো।",
          "বসতে অক্ষম হলে সামর্থ্য অনুযায়ী অন্যভাবে নামাজ আদায়ের বিধান জেনে নাও।",
          "পানি ব্যবহার ক্ষতিকর হলে পবিত্রতা অর্জনের বিকল্প বিধান সম্পর্কে জেনে নাও।"
        ],
        noteTitle: "গুরুত্বপূর্ণ সতর্কতা",
        note: "অসুস্থতা, সফর বা বিশেষ পরিস্থিতির বিধান বিস্তারিত হতে পারে। নিজের অবস্থার জন্য বিশ্বস্ত আলেম বা যোগ্য ধর্মীয় শিক্ষকের পরামর্শ নাও।"
      },

      sotorkota: {
        kicker: "সপ্তম ধাপ",
        title: "সাধারণ ভুল ও সতর্কতা",
        lead: "নামাজের আগে কিছু বিষয় যাচাই করলে অনিচ্ছাকৃত ভুল এড়ানো সহজ হয়।",
        commonTitle: "সাধারণ ভুল",
        common: [
          "নামাজের সময় নিশ্চিত না হওয়া।",
          "শরীর, পোশাক বা স্থানের পবিত্রতা যাচাই না করা।",
          "সতর ঢাকা বা কিবলার দিকের বিষয়টি উপেক্ষা করা।",
          "নিয়ত নিয়ে অযথা বারবার সন্দেহ করা।"
        ],
        whatTitle: "কী করবে",
        what: [
          "নামাজের আগে প্রয়োজনীয় বিষয়গুলো শান্তভাবে যাচাই করো।",
          "কোনো বিধান বুঝতে অসুবিধা হলে নির্ভরযোগ্য উৎস থেকে শিখে নাও।",
          "সন্দেহের কারণে অযথা কঠিন পরিস্থিতি তৈরি কোরো না।"
        ],
        noteTitle: "গুরুত্বপূর্ণ সতর্কতা",
        note: "এগুলো সাধারণ শিক্ষামূলক নির্দেশনা। নির্দিষ্ট মাসআলার ক্ষেত্রে নিজের মাজহাব ও নির্ভরযোগ্য আলেমের নির্দেশনা অনুসরণ করো।"
      },

      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    },

    en: {
      pageTitle: "Conditions of Salah",
      introText: "Learn the essential requirements for valid prayer in a simple way.",
      pageSubtitle: "What to know before performing Salah",

      intro: {
        kicker: "Step One",
        title: "Introduction and Importance",
        lead: "Salah is one of the most important acts of worship in Islam. Certain conditions must be fulfilled for prayer to be valid.",
        beforeTitle: "Before Prayer",
        before: [
          "Ensure that your body, clothing, and prayer place are clean.",
          "Make sure the prescribed prayer time has begun.",
          "Cover the required parts of the body and face the Qiblah."
        ],
        noteTitle: "Remember",
        note: "Fulfil the conditions of prayer and try to pray with attention and humility."
      },

      niyot: {
        kicker: "Step Two",
        title: "Intention (Niyyah)",
        lead: "Niyyah is the intention in the heart to perform a particular prayer.",
        howTitle: "How to Make the Intention",
        how: [
          "Set in your heart which prayer you are going to perform.",
          "Speaking the intention aloud is not essential; the intention in the heart is what matters.",
          "Then begin your prayer with focus."
        ],
        noteTitle: "Remember",
        note: "There is no need to worry unnecessarily or repeatedly doubt your intention."
      },

      qibla: {
        kicker: "Step Three",
        title: "Facing the Qiblah",
        lead: "During prayer, face the direction of the Ka'bah, known as the Qiblah.",
        checkTitle: "What to Check",
        check: [
          "Confirm the Qiblah direction when possible.",
          "When travelling, use a reliable direction guide.",
          "Make a sincere effort to determine the correct direction."
        ],
        noteTitle: "Special Circumstances",
        note: "For situations involving inability or uncertainty about the direction, seek guidance from a trusted scholar."
      },

      poshak: {
        kicker: "Step Four",
        title: "Covering and Clothing",
        lead: "Prayer requires covering the prescribed parts of the body and wearing clean clothing.",
        checkTitle: "Check Your Clothing",
        check: [
          "Make sure your clothing covers the required parts of the body.",
          "Check that your clothing is free from impurity.",
          "Ensure that the clothing is not transparent and provides proper coverage."
        ],
        noteTitle: "Remember",
        note: "Detailed rules about required coverage may differ according to circumstances and between men and women. Ask a trusted scholar when needed."
      },

      prostuti: {
        kicker: "Step Five",
        title: "Prayer Time and Preparation",
        lead: "Each obligatory prayer has a prescribed time. The obligatory prayer should not be performed before its time begins.",
        checkTitle: "Before Prayer",
        check: [
          "Make sure the prescribed prayer time has begun.",
          "Perform the required purification.",
          "Choose a clean and suitable place.",
          "Prepare your mind for prayer."
        ],
        noteTitle: "Remember",
        note: "When possible, make an effort to perform the prayer in congregation."
      },

      osusthota: {
        kicker: "Step Six",
        title: "Illness and Special Circumstances",
        lead: "Islam takes a person's ability and difficulties into account. Illness may allow adjustments to the way prayer is performed.",
        guidanceTitle: "Guidance",
        guidance: [
          "If you cannot stand, learn the prescribed way to pray while sitting.",
          "If you cannot sit, seek guidance on how to pray according to your ability.",
          "If using water would cause harm, learn about the alternative rules for purification."
        ],
        noteTitle: "Important Caution",
        note: "Rules for illness, travel, and special circumstances can be detailed. Consult a trusted scholar or qualified religious teacher about your situation."
      },

      sotorkota: {
        kicker: "Step Seven",
        title: "Common Mistakes and Cautions",
        lead: "Checking a few things before prayer can help prevent avoidable mistakes.",
        commonTitle: "Common Mistakes",
        common: [
          "Not confirming that the prayer time has begun.",
          "Not checking the cleanliness of the body, clothing, or prayer place.",
          "Overlooking proper coverage or the Qiblah direction.",
          "Repeatedly doubting the intention without a good reason."
        ],
        whatTitle: "What to Do",
        what: [
          "Calmly check the essential requirements before praying.",
          "Learn from reliable sources when a ruling is unclear.",
          "Avoid making the situation unnecessarily difficult because of doubts."
        ],
        noteTitle: "Important Caution",
        note: "These are general educational guidelines. For specific rulings, follow the guidance of a trusted scholar and the school of law you follow."
      },

      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    },

    hi: {
      pageTitle: "नमाज़ की शर्तें",
      introText: "सही नमाज़ के लिए ज़रूरी बातों को आसान तरीके से सीखें।",
      pageSubtitle: "नमाज़ अदा करने से पहले जानने योग्य बातें",

      intro: {
        kicker: "पहला चरण",
        title: "परिचय और महत्व",
        lead: "नमाज़ इस्लाम की सबसे महत्वपूर्ण इबादतों में से एक है। नमाज़ सही होने के लिए कुछ शर्तों को पूरा करना ज़रूरी है।",
        beforeTitle: "नमाज़ से पहले",
        before: [
          "शरीर, कपड़ों और नमाज़ की जगह की पाकी सुनिश्चित करें।",
          "सुनिश्चित करें कि नमाज़ का निर्धारित समय शुरू हो गया है।",
          "ज़रूरी अंगों को ढककर क़िबला की ओर रुख करें।"
        ],
        noteTitle: "याद रखें",
        note: "नमाज़ की शर्तें पूरी करके ध्यान और विनम्रता के साथ नमाज़ पढ़ने की कोशिश करें।"
      },

      niyot: {
        kicker: "दूसरा चरण",
        title: "नीयत",
        lead: "नीयत दिल का इरादा है कि कौन-सी नमाज़ अदा की जा रही है।",
        howTitle: "नीयत कैसे करें",
        how: [
          "दिल में तय करें कि कौन-सी नमाज़ अदा करनी है।",
          "नीयत को ज़ोर से कहना अनिवार्य नहीं; दिल का इरादा मुख्य है।",
          "इसके बाद ध्यान के साथ नमाज़ शुरू करें।"
        ],
        noteTitle: "याद रखें",
        note: "नीयत के बारे में बेवजह चिंता या बार-बार शक करने की ज़रूरत नहीं है।"
      },

      qibla: {
        kicker: "तीसरा चरण",
        title: "क़िबला की ओर रुख करना",
        lead: "नमाज़ के दौरान काबा शरीफ़ की दिशा, यानी क़िबला की ओर रुख करना चाहिए।",
        checkTitle: "क्या जाँचें",
        check: [
          "संभव हो तो क़िबला की दिशा की पुष्टि करें।",
          "सफ़र में किसी भरोसेमंद दिशा-निर्देश का उपयोग करें।",
          "सही दिशा निर्धारित करने की पूरी कोशिश करें।"
        ],
        noteTitle: "विशेष परिस्थिति",
        note: "असमर्थता या दिशा के बारे में अनिश्चितता की स्थिति में किसी भरोसेमंद आलिम से मार्गदर्शन लें।"
      },

      poshak: {
        kicker: "चौथा चरण",
        title: "सतर ढकना और कपड़े",
        lead: "नमाज़ के लिए शरीर के निर्धारित हिस्सों को ढकना और पाक कपड़े पहनना ज़रूरी है।",
        checkTitle: "कपड़ों की जाँच करें",
        check: [
          "देखें कि कपड़े शरीर के ज़रूरी हिस्सों को ढकते हैं।",
          "जाँचें कि कपड़ों पर नापाकी तो नहीं है।",
          "कपड़े पारदर्शी न हों और उचित ढकाव प्रदान करें।"
        ],
        noteTitle: "याद रखें",
        note: "सतर से जुड़े विस्तृत नियम परिस्थिति और पुरुषों-महिलाओं के अनुसार अलग हो सकते हैं। ज़रूरत पड़ने पर भरोसेमंद आलिम से पूछें।"
      },

      prostuti: {
        kicker: "पाँचवाँ चरण",
        title: "समय और तैयारी",
        lead: "हर फ़र्ज़ नमाज़ का निर्धारित समय होता है। उसका समय शुरू होने से पहले वह फ़र्ज़ नमाज़ अदा नहीं की जाती।",
        checkTitle: "नमाज़ से पहले",
        check: [
          "सुनिश्चित करें कि नमाज़ का निर्धारित समय शुरू हो गया है।",
          "ज़रूरी पाकी हासिल करें।",
          "साफ़ और उपयुक्त जगह चुनें।",
          "अपने मन को नमाज़ के लिए तैयार करें।"
        ],
        noteTitle: "याद रखें",
        note: "मौका मिलने पर जमात के साथ नमाज़ अदा करने की कोशिश करें।"
      },

      osusthota: {
        kicker: "छठा चरण",
        title: "बीमारी और विशेष परिस्थितियाँ",
        lead: "इस्लाम इंसान की क्षमता और कठिनाइयों का ध्यान रखता है। बीमारी की वजह से नमाज़ अदा करने के तरीके में रियायत हो सकती है।",
        guidanceTitle: "क्या करें",
        guidance: [
          "खड़े होने में असमर्थ हों तो निर्धारित तरीके से बैठकर नमाज़ पढ़ने का तरीका जानें।",
          "बैठने में भी असमर्थ हों तो अपनी क्षमता के अनुसार नमाज़ पढ़ने का तरीका जानें।",
          "पानी का इस्तेमाल नुकसानदेह हो तो पाकी के वैकल्पिक नियमों के बारे में जानें।"
        ],
        noteTitle: "महत्वपूर्ण सावधानी",
        note: "बीमारी, सफ़र और विशेष परिस्थितियों के नियम विस्तृत हो सकते हैं। अपनी परिस्थिति के लिए भरोसेमंद आलिम या योग्य धार्मिक शिक्षक से सलाह लें।"
      },

      sotorkota: {
        kicker: "सातवाँ चरण",
        title: "आम गलतियाँ और सावधानियाँ",
        lead: "नमाज़ से पहले कुछ बातें जाँचने से अनावश्यक गलतियों से बचने में मदद मिलती है।",
        commonTitle: "आम गलतियाँ",
        common: [
          "नमाज़ का समय शुरू होने की पुष्टि न करना।",
          "शरीर, कपड़ों या नमाज़ की जगह की पाकी न जाँचना।",
          "सतर ढकने या क़िबला की दिशा को नज़रअंदाज़ करना।",
          "नीयत के बारे में बेवजह बार-बार शक करना।"
        ],
        whatTitle: "क्या करें",
        what: [
          "नमाज़ से पहले ज़रूरी बातों को शांतिपूर्वक जाँचें।",
          "कोई नियम समझ न आए तो भरोसेमंद स्रोत से सीखें।",
          "शक की वजह से बेवजह मुश्किल पैदा न करें।"
        ],
        noteTitle: "महत्वपूर्ण सावधानी",
        note: "ये सामान्य शैक्षिक निर्देश हैं। विशेष धार्मिक नियमों के लिए भरोसेमंद आलिम और अपने फ़िक़्ही मत के मार्गदर्शन का पालन करें।"
      },

      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    }
  };

  const sectionIds = [
    "intro",
    "niyot",
    "qibla",
    "poshak",
    "prostuti",
    "osusthota",
    "sotorkota"
  ];

  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem("appSettings") || "{}");
    } catch (error) {
      return {};
    }
  }

  function getLanguage(settings) {
    const language = String(settings.lang || "bn").toLowerCase();
    return translations[language] ? language : "bn";
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined) {
      element.textContent = value;
    }
  }

  function setList(id, items) {
    const element = document.getElementById(id);
    if (!element || !Array.isArray(items)) return;

    element.replaceChildren();

    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  }

  function applyLanguage(language) {
    const content = translations[language] || translations.bn;

    document.documentElement.lang = language;

    setText("page-title", content.pageTitle);
    setText("intro-text", content.introText);
    setText("page-subtitle", content.pageSubtitle);

    sectionIds.forEach((sectionId, index) => {
      const section = content[sectionId];
      if (!section) return;

      setText(`${sectionId}-kicker`, section.kicker);
      setText(`${sectionId}-title`, section.title);
      setText(`${sectionId}-lead`, section.lead);

      if (section.beforeTitle !== undefined) {
        setText(`${sectionId}-before-title`, section.beforeTitle);
        setList(`${sectionId}-before`, section.before);
      }

      if (section.howTitle !== undefined) {
        setText(`${sectionId}-how-title`, section.howTitle);
        setList(`${sectionId}-how`, section.how);
      }

      if (section.checkTitle !== undefined) {
        setText(`${sectionId}-check-title`, section.checkTitle);
        setList(`${sectionId}-check`, section.check);
      }

      if (section.guidanceTitle !== undefined) {
        setText(`${sectionId}-guidance-title`, section.guidanceTitle);
        setList(`${sectionId}-guidance`, section.guidance);
      }

      if (section.commonTitle !== undefined) {
        setText(`${sectionId}-common-title`, section.commonTitle);
        setList(`${sectionId}-common`, section.common);
      }

      if (section.whatTitle !== undefined) {
        setText(`${sectionId}-what-title`, section.whatTitle);
        setList(`${sectionId}-what`, section.what);
      }

      setText(`${sectionId}-note-title`, section.noteTitle);
      setText(`${sectionId}-note`, section.note);

      const number = document.querySelector(
        `#${sectionId} .section-number`
      );

      if (number) {
        const localizedNumbers = {
          bn: ["১", "২", "৩", "৪", "৫", "৬", "৭"],
          en: ["1", "2", "3", "4", "5", "6", "7"],
          hi: ["१", "२", "३", "४", "५", "६", "७"]
        };

        number.textContent = localizedNumbers[language][index];
      }
    });

    setText("footerText", content.footer);
  }

  function applyTheme(settings) {
    const theme = String(
      settings.theme || (settings.dark ? "dark" : "light")
    ).toLowerCase();

    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#102820" : "#f5f0df");
    }
  }

  function refreshPage() {
    const settings = readSettings();
    const language = getLanguage(settings);

    applyLanguage(language);
    applyTheme(settings);
  }

  document.addEventListener("DOMContentLoaded", refreshPage);

  window.addEventListener("storage", (event) => {
    if (event.key === "appSettings") {
      refreshPage();
    }
  });

  window.refreshConditionsPage = refreshPage;
})();
