/* =========================================
   IBADAT — Namaz Conditions
   Bengali / English / Hindi
   Light / Dark theme
   Localized list numbering
   ========================================= */

(() => {
  "use strict";

  const translations = {
    bn: {
      pageTitle: "নামাজের শর্ত",
      introText: "নামাজ শুদ্ধ হওয়ার জন্য প্রয়োজনীয় বিষয়গুলো সহজভাবে শিখে নাও।",
      pageSubtitle: "নামাজ আদায়ের আগে যে বিষয়গুলো জানা জরুরি",

      intro: {
        kicker: "প্রথম পাঠ",
        title: "পরিচয় ও গুরুত্ব",
        lead: "নামাজ ইসলামের গুরুত্বপূর্ণ ইবাদত। নামাজ আদায়ের আগে এর প্রয়োজনীয় শর্তগুলো জানা দরকার, যাতে মনোযোগের সঙ্গে ইবাদত করা যায়।",
        beforeTitle: "নামাজের আগে মূল বিষয়গুলো",
        before: [
          "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা।",
          "নামাজের নির্ধারিত সময় হয়েছে কি না নিশ্চিত হওয়া।",
          "কিবলার দিকে মুখ করা এবং সতর ঢেকে রাখা।",
          "কোন নামাজ আদায় করবে, তা মনে স্থির করে নিয়ত করা।"
        ],
        noteTitle: "মনে রাখবে",
        note: "এগুলো নামাজ শেখার প্রাথমিক নির্দেশনা। বিস্তারিত বিধানে মাজহাবভেদে পার্থক্য থাকতে পারে। প্রয়োজনে নির্ভরযোগ্য আলেমের কাছ থেকে শিখবে।"
      },

      niyot: {
        kicker: "দ্বিতীয় পাঠ",
        title: "নিয়ত",
        lead: "নিয়ত হলো কোন ইবাদত আদায় করা হচ্ছে, তা অন্তরে স্থির করা। নামাজের ক্ষেত্রে কোন নামাজ পড়বে, তা মনে নির্ধারণ করাই মূল বিষয়।",
        howTitle: "নিয়ত কীভাবে করবে?",
        how: [
          "কোন নামাজ পড়বে—যেমন ফজর, যোহর বা আসর—তা মনে স্থির করো।",
          "আল্লাহর সন্তুষ্টির জন্য ইবাদত করার মনোভাব রাখো।",
          "নিয়তের বিস্তারিত বিধান সম্পর্কে নির্ভরযোগ্য আলেমের কাছ থেকে শেখো।"
        ],
        noteTitle: "মনে রাখবে",
        note: "নিয়ত মূলত অন্তরের বিষয়। অযথা দুশ্চিন্তা না করে নামাজের উদ্দেশ্য বুঝে মনোযোগী হও।"
      },

      qibla: {
        kicker: "তৃতীয় পাঠ",
        title: "কিবলামুখী হওয়া",
        lead: "স্বাভাবিক ও সক্ষম অবস্থায় নামাজে কাবা শরিফের দিকে মুখ করে দাঁড়াতে হয়। তাই কিবলার দিক নির্ভরযোগ্যভাবে নির্ধারণ করার চেষ্টা করবে।",
        checkTitle: "কিবলার দিক নির্ধারণ",
        check: [
          "মসজিদের কিবলা নির্দেশনা অনুসরণ করতে পারো।",
          "প্রয়োজনে নির্ভরযোগ্য কিবলা কম্পাস বা অ্যাপ ব্যবহার করো।",
          "অপরিচিত স্থানে নির্ভরযোগ্য ব্যক্তির কাছ থেকে দিক জেনে নাও।"
        ],
        noteTitle: "বিশেষ অবস্থা",
        note: "অসুস্থতা, ভয় বা জরুরি পরিস্থিতিতে আলাদা বিধান থাকতে পারে। প্রয়োজন হলে বিশ্বস্ত আলেমের পরামর্শ নাও।"
      },

      poshak: {
        kicker: "চতুর্থ পাঠ",
        title: "সতর ঢাকা ও পোশাক",
        lead: "নামাজে সতর ঢেকে রাখা এবং পোশাক পবিত্র ও শালীন হওয়া জরুরি।",
        checkTitle: "পোশাক পরার আগে খেয়াল করো",
        check: [
          "পোশাক শরীরের প্রয়োজনীয় অংশ ঢেকে রাখছে কি না।",
          "পোশাকে নিশ্চিত নাপাকি থাকলে তা পরিষ্কার করা হয়েছে কি না।",
          "পোশাক স্বচ্ছ বা এমনভাবে খোলা নয়, যাতে সতর প্রকাশ পায়।",
          "সতরের বিস্তারিত সীমা নির্ভরযোগ্য নির্দেশনা অনুযায়ী শিখে নাও।"
        ],
        noteTitle: "মনে রাখবে",
        note: "পরিচ্ছন্নতা, শালীনতা ও সতর ঢাকার বিষয়ে যত্নবান হও।"
      },

      prostuti: {
        kicker: "পঞ্চম পাঠ",
        title: "সময় ও প্রস্তুতি",
        lead: "প্রত্যেক ফরজ নামাজের নির্ধারিত সময় আছে। তাই নামাজের আগে সময় ও পবিত্রতা নিশ্চিত করা দরকার।",
        checkTitle: "নামাজের আগে প্রস্তুতির তালিকা",
        check: [
          "নামাজের সঠিক সময় হয়েছে কি না যাচাই করা।",
          "প্রয়োজন অনুযায়ী অজু, গোসল বা তায়াম্মুমের মাধ্যমে পবিত্রতা অর্জন করা।",
          "শরীর, পোশাক ও নামাজের স্থান পবিত্র রাখা।",
          "মনোযোগ নষ্ট করে এমন বিষয় দূরে রাখা।",
          "শান্ত মনে ইবাদতের জন্য প্রস্তুত হওয়া।"
        ],
        noteTitle: "সময় সম্পর্কে সতর্কতা",
        note: "নামাজের সময় স্থান ও ঋতুভেদে বদলে যায়। নির্ভরযোগ্য স্থানীয় সময়সূচি অনুসরণ করবে।"
      },

      osusthota: {
        kicker: "ষষ্ঠ পাঠ",
        title: "অসুস্থতা ও বিশেষ অবস্থা",
        lead: "ইসলাম সামর্থ্য অনুযায়ী ইবাদতের নির্দেশনা দেয়। অসুস্থতা বা চলাচলে অসুবিধা হলে নিজের পরিস্থিতি অনুযায়ী নামাজের বিধান শিখতে হবে।",
        guidanceTitle: "অসুস্থ হলে কী করবে?",
        guidance: [
          "দাঁড়াতে অক্ষম হলে বসে নামাজ পড়ার বিধান প্রযোজ্য হতে পারে।",
          "বসাও সম্ভব না হলে শোয়া অবস্থায় নামাজের নিয়ম জানতে হবে।",
          "পানি ব্যবহার ক্ষতিকর হলে নির্দিষ্ট শর্তে তায়াম্মুমের বিধান প্রযোজ্য হতে পারে।",
          "বিশেষ পরিস্থিতিতে নির্ভরযোগ্য ধর্মীয় নির্দেশনা অনুসরণ করবে।"
        ],
        noteTitle: "গুরুত্বপূর্ণ",
        note: "অসুস্থতার ধরন ও সামর্থ্য অনুযায়ী বিধান ভিন্ন হতে পারে। নিজের পরিস্থিতির জন্য বিশ্বস্ত আলেমের পরামর্শ নাও।"
      },

      sotorkota: {
        kicker: "সপ্তম পাঠ",
        title: "সাধারণ ভুল ও সতর্কতা",
        lead: "সঠিক জ্ঞান অর্জন ও নিয়মিত শেখার মাধ্যমে নামাজের সাধারণ ভুল কমানো যায়।",
        commonTitle: "যে বিষয়গুলোতে সতর্ক থাকবে",
        common: [
          "নামাজের সময় নিশ্চিত না হয়ে ফরজ নামাজ শুরু করা।",
          "পবিত্রতা ও পোশাকের বিষয়ে নিশ্চিত তথ্য না জেনে অযথা দুশ্চিন্তা করা।",
          "কিবলার দিক নির্ধারণে যথাসাধ্য চেষ্টা না করা।",
          "সতর ঢাকার প্রয়োজনীয়তা উপেক্ষা করা।",
          "যাচাই না করে শোনা কথাকে চূড়ান্ত বিধান মনে করা।"
        ],
        whatTitle: "ভুল হলে কী করবে?",
        what: [
          "শান্তভাবে সঠিক নিয়ম শিখে তা অনুসরণ করো।",
          "নামাজে ভুল হলে কী করতে হয়, তা নির্ভরযোগ্য আলেমের কাছ থেকে শেখো।",
          "বিস্তারিত বিধানে পার্থক্য থাকলে যাচাই না করে অন্যকে দোষারোপ করো না।"
        ],
        noteTitle: "শেষ কথা",
        note: "নামাজের শর্ত ও ভুল সংশোধনের বিস্তারিত বিধান শেখার জন্য নির্ভরযোগ্য আলেম বা স্বীকৃত শিক্ষাসামগ্রী অনুসরণ করো।"
      },

      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    },

    en: {
      pageTitle: "Conditions of Salah",
      introText: "Learn the essential requirements for valid prayer in a simple way.",
      pageSubtitle: "What to know before performing Salah",

      intro: {
        kicker: "Lesson One",
        title: "Introduction and Importance",
        lead: "Salah is an important act of worship in Islam. Learning its essential conditions helps you prepare for prayer with attention.",
        beforeTitle: "Essential Points Before Prayer",
        before: [
          "Keep your body, clothing, and prayer place clean.",
          "Make sure the prescribed prayer time has begun.",
          "Face the Qiblah and cover the required parts of the body.",
          "Form the intention for the prayer you are going to perform."
        ],
        noteTitle: "Remember",
        note: "These are introductory guidelines. Some detailed rulings may differ between schools of Islamic law. Consult a trusted scholar when needed."
      },

      niyot: {
        kicker: "Lesson Two",
        title: "Intention (Niyyah)",
        lead: "Niyyah means intending in your heart which act of worship you are performing. For Salah, the essential point is knowing which prayer you intend to offer.",
        howTitle: "How to Make the Intention",
        how: [
          "Decide in your heart which prayer you will perform, such as Fajr, Dhuhr, or Asr.",
          "Keep the intention of worshipping for the sake of Allah.",
          "Learn detailed rulings about intention from a trusted scholar."
        ],
        noteTitle: "Remember",
        note: "Intention is primarily a matter of the heart. Avoid unnecessary worry and focus on the purpose of your prayer."
      },

      qibla: {
        kicker: "Lesson Three",
        title: "Facing the Qiblah",
        lead: "When able and in normal circumstances, face the direction of the Ka'bah during prayer. Make a reasonable effort to determine the Qiblah accurately.",
        checkTitle: "Finding the Qiblah",
        check: [
          "Follow the Qiblah direction indicated in a mosque.",
          "Use a reliable Qiblah compass or app when needed.",
          "In an unfamiliar place, ask a reliable person for directions."
        ],
        noteTitle: "Special Circumstances",
        note: "Illness, danger, or emergencies may involve different rulings. Seek guidance from a trusted scholar when necessary."
      },

      poshak: {
        kicker: "Lesson Four",
        title: "Covering and Clothing",
        lead: "During prayer, the required parts of the body must be covered and clothing should be clean and modest.",
        checkTitle: "Check Before Dressing for Prayer",
        check: [
          "Make sure the clothing covers the required parts of the body.",
          "Clean any confirmed impurity from the clothing.",
          "Ensure the clothing is not transparent or open in a way that exposes the required covering.",
          "Learn the detailed requirements from reliable religious guidance."
        ],
        noteTitle: "Remember",
        note: "Take care to maintain cleanliness, modesty, and proper covering."
      },

      prostuti: {
        kicker: "Lesson Five",
        title: "Prayer Time and Preparation",
        lead: "Each obligatory prayer has a prescribed time. Check the time and ensure the required purification before praying.",
        checkTitle: "Preparation Checklist",
        check: [
          "Check that the correct prayer time has begun.",
          "Perform the required purification through wudu, ghusl, or tayammum when applicable.",
          "Keep your body, clothing, and prayer place clean.",
          "Put away distractions.",
          "Prepare yourself calmly for worship."
        ],
        noteTitle: "A Note About Prayer Times",
        note: "Prayer times change according to location and season. Follow a reliable local timetable."
      },

      osusthota: {
        kicker: "Lesson Six",
        title: "Illness and Special Circumstances",
        lead: "Islam provides guidance according to a person's ability. If illness or limited mobility affects prayer, learn the rulings that apply to your situation.",
        guidanceTitle: "What to Do When Ill",
        guidance: [
          "If you cannot stand, the prescribed rules may allow you to pray while sitting.",
          "If sitting is also impossible, learn the rules for praying while lying down.",
          "If using water would be harmful, tayammum may apply under specific conditions.",
          "Follow reliable religious guidance for special circumstances."
        ],
        noteTitle: "Important",
        note: "Rulings depend on the illness and the person's ability. Consult a trusted scholar about your circumstances."
      },

      sotorkota: {
        kicker: "Lesson Seven",
        title: "Common Mistakes and Cautions",
        lead: "Learning accurate information and reviewing the basics can help reduce common mistakes in prayer.",
        commonTitle: "Things to Watch For",
        common: [
          "Beginning an obligatory prayer without confirming its time.",
          "Worrying unnecessarily about purity or clothing without reliable information.",
          "Not making a reasonable effort to determine the Qiblah.",
          "Overlooking the requirement to cover the body properly.",
          "Treating unverified information as a definitive ruling."
        ],
        whatTitle: "What to Do If You Make a Mistake",
        what: [
          "Calmly learn the correct procedure and follow it.",
          "Ask a trusted scholar what to do if a mistake occurs during prayer.",
          "Do not blame others without checking when detailed rulings differ."
        ],
        noteTitle: "Final Note",
        note: "Use reliable scholars or recognised educational materials to learn the conditions of Salah and how to correct mistakes."
      },

      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।"
    },

    hi: {
      pageTitle: "नमाज़ की शर्तें",
      introText: "सही नमाज़ के लिए ज़रूरी बातों को आसान तरीके से सीखें।",
      pageSubtitle: "नमाज़ अदा करने से पहले जानने योग्य बातें",

      intro: {
        kicker: "पहला पाठ",
        title: "परिचय और महत्व",
        lead: "नमाज़ इस्लाम की एक महत्वपूर्ण इबादत है। इसकी ज़रूरी शर्तों को जानने से नमाज़ की तैयारी ध्यानपूर्वक की जा सकती है।",
        beforeTitle: "नमाज़ से पहले ज़रूरी बातें",
        before: [
          "शरीर, कपड़ों और नमाज़ की जगह को पाक रखें।",
          "सुनिश्चित करें कि नमाज़ का निर्धारित समय शुरू हो गया है।",
          "क़िबला की ओर रुख करें और ज़रूरी अंगों को ढकें।",
          "जिस नमाज़ को पढ़ना है, उसकी नीयत दिल में करें।"
        ],
        noteTitle: "याद रखें",
        note: "ये शुरुआती निर्देश हैं। कुछ विस्तृत नियम फ़िक़्ही मतों के अनुसार अलग हो सकते हैं। ज़रूरत पड़ने पर भरोसेमंद आलिम से सलाह लें।"
      },

      niyot: {
        kicker: "दूसरा पाठ",
        title: "नीयत",
        lead: "नीयत का अर्थ है दिल में यह इरादा करना कि कौन-सी इबादत की जा रही है। नमाज़ में यह जानना मुख्य है कि कौन-सी नमाज़ अदा करनी है।",
        howTitle: "नीयत कैसे करें?",
        how: [
          "दिल में तय करें कि कौन-सी नमाज़ पढ़नी है, जैसे फ़ज्र, ज़ुहर या अस्र।",
          "अल्लाह की रज़ा के लिए इबादत करने का इरादा रखें।",
          "नीयत के विस्तृत नियम किसी भरोसेमंद आलिम से सीखें।"
        ],
        noteTitle: "याद रखें",
        note: "नीयत मुख्य रूप से दिल का मामला है। बेवजह चिंता करने के बजाय नमाज़ के उद्देश्य पर ध्यान दें।"
      },

      qibla: {
        kicker: "तीसरा पाठ",
        title: "क़िबला की ओर रुख करना",
        lead: "सामान्य परिस्थितियों में और सक्षम होने पर नमाज़ में काबा शरीफ़ की दिशा की ओर रुख करें। क़िबला निर्धारित करने की उचित कोशिश करें।",
        checkTitle: "क़िबला कैसे निर्धारित करें",
        check: [
          "मस्जिद में दिए गए क़िबला दिशा-निर्देश का पालन करें।",
          "ज़रूरत पड़ने पर भरोसेमंद क़िबला कंपास या ऐप का उपयोग करें।",
          "अनजान जगह पर किसी भरोसेमंद व्यक्ति से दिशा पूछें।"
        ],
        noteTitle: "विशेष परिस्थिति",
        note: "बीमारी, ख़तरे या आपात स्थिति में अलग नियम लागू हो सकते हैं। ज़रूरत पड़ने पर भरोसेमंद आलिम से सलाह लें।"
      },

      poshak: {
        kicker: "चौथा पाठ",
        title: "सतर ढकना और कपड़े",
        lead: "नमाज़ के दौरान शरीर के निर्धारित हिस्सों को ढकना और पाक व शालीन कपड़े पहनना ज़रूरी है।",
        checkTitle: "नमाज़ के कपड़ों की जाँच करें",
        check: [
          "सुनिश्चित करें कि कपड़े शरीर के ज़रूरी हिस्सों को ढकते हैं।",
          "कपड़ों पर निश्चित नापाकी हो तो उसे साफ़ करें।",
          "कपड़े पारदर्शी या ऐसे खुले न हों कि सतर दिखाई दे।",
          "विस्तृत नियम भरोसेमंद धार्मिक मार्गदर्शन से सीखें।"
        ],
        noteTitle: "याद रखें",
        note: "सफ़ाई, शालीनता और सतर ढकने का ध्यान रखें।"
      },

      prostuti: {
        kicker: "पाँचवाँ पाठ",
        title: "समय और तैयारी",
        lead: "हर फ़र्ज़ नमाज़ का निर्धारित समय होता है। नमाज़ से पहले समय और ज़रूरी पाकी सुनिश्चित करें।",
        checkTitle: "तैयारी की सूची",
        check: [
          "जाँचें कि नमाज़ का सही समय शुरू हो गया है।",
          "ज़रूरत के अनुसार वुज़ू, ग़ुस्ल या तयम्मुम से पाकी हासिल करें।",
          "शरीर, कपड़ों और नमाज़ की जगह को पाक रखें।",
          "ध्यान भटकाने वाली चीज़ों को दूर रखें।",
          "शांत मन से इबादत के लिए तैयार हों।"
        ],
        noteTitle: "नमाज़ के समय के बारे में",
        note: "नमाज़ का समय स्थान और मौसम के अनुसार बदलता है। भरोसेमंद स्थानीय समय-सारणी का पालन करें।"
      },

      osusthota: {
        kicker: "छठा पाठ",
        title: "बीमारी और विशेष परिस्थितियाँ",
        lead: "इस्लाम इंसान की क्षमता के अनुसार इबादत की राह दिखाता है। बीमारी या चलने-फिरने में कठिनाई हो तो अपनी परिस्थिति के नियम सीखें।",
        guidanceTitle: "बीमार होने पर क्या करें?",
        guidance: [
          "खड़े होने में असमर्थ होने पर निर्धारित नियमों के अनुसार बैठकर नमाज़ पढ़ी जा सकती है।",
          "बैठना भी संभव न हो तो लेटकर नमाज़ पढ़ने के नियम जानें।",
          "पानी का इस्तेमाल नुकसानदेह हो तो विशेष शर्तों में तयम्मुम लागू हो सकता है।",
          "विशेष परिस्थितियों में भरोसेमंद धार्मिक मार्गदर्शन लें।"
        ],
        noteTitle: "महत्वपूर्ण",
        note: "नियम बीमारी और व्यक्ति की क्षमता के अनुसार अलग हो सकते हैं। अपनी परिस्थिति के लिए भरोसेमंद आलिम से सलाह लें।"
      },

      sotorkota: {
        kicker: "सातवाँ पाठ",
        title: "आम गलतियाँ और सावधानियाँ",
        lead: "सही जानकारी और नियमित सीखने से नमाज़ की आम गलतियों को कम किया जा सकता है।",
        commonTitle: "इन बातों का ध्यान रखें",
        common: [
          "समय की पुष्टि किए बिना फ़र्ज़ नमाज़ शुरू करना।",
          "भरोसेमंद जानकारी के बिना पाकी या कपड़ों को लेकर बेवजह चिंता करना।",
          "क़िबला निर्धारित करने की उचित कोशिश न करना।",
          "सतर ढकने की ज़रूरत को नज़रअंदाज़ करना।",
          "बिना जाँच के सुनी हुई बात को अंतिम धार्मिक नियम मान लेना।"
        ],
        whatTitle: "गलती होने पर क्या करें?",
        what: [
          "शांत होकर सही तरीका सीखें और उस पर अमल करें।",
          "नमाज़ में गलती होने पर क्या करना चाहिए, यह भरोसेमंद आलिम से सीखें।",
          "विस्तृत नियमों में अंतर हो तो जाँच किए बिना दूसरों को दोष न दें।"
        ],
        noteTitle: "अंतिम बात",
        note: "नमाज़ की शर्तें और गलतियों को सुधारने के नियम भरोसेमंद आलिम या मान्य शैक्षिक सामग्री से सीखें।"
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

  const localizedDigits = {
    bn: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
    en: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    hi: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
  };

  function readSettings() {
    try {
      return JSON.parse(localStorage.getItem("appSettings") || "{}");
    } catch (error) {
      return {};
    }
  }

  function getLanguage(settings) {
    const value = String(settings.lang || "bn").toLowerCase();

    if (translations[value]) return value;

    if (value.startsWith("en")) return "en";
    if (value.startsWith("hi")) return "hi";

    return "bn";
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

  function localizeOrderedLists(language) {
    /*
     * CSS counter দিয়ে <ol> নম্বর আঁকা হয়।
     * এতে বাংলা, ইংরেজি ও হিন্দির জন্য
     * আলাদা ডিজিট ব্যবহার করা যায়।
     */
    const digits = localizedDigits[language] || localizedDigits.bn;

    document.querySelectorAll(".lesson ol").forEach((list) => {
      list.style.listStyleType = "none";
      list.style.counterReset = "localized-list";
      
      list.querySelectorAll(":scope > li").forEach((item) => {
        item.style.counterIncrement = "localized-list";
        item.style.position = "relative";
        item.style.paddingLeft = "2.1em";

        item.style.setProperty(
          "--localized-list-number",
          '"' + digits[1] + '"'
        );

        const oldNumber = item.querySelector(":scope > .localized-list-number");

        if (oldNumber) oldNumber.remove();

        const number = document.createElement("span");
        number.className = "localized-list-number";
        number.setAttribute("aria-hidden", "true");

        const index = Array.from(list.children).indexOf(item) + 1;
        number.textContent = convertNumber(index, digits);

        number.style.position = "absolute";
        number.style.left = "0";
        number.style.top = "0";
        number.style.color = "var(--gold)";
        number.style.fontWeight = "800";

        item.prepend(number);
      });
    });
  }

  function convertNumber(number, digits) {
    return String(number).replace(/[0-9]/g, (digit) => {
      return digits[Number(digit)];
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
        number.textContent = convertNumber(index + 1, localizedDigits[language]);
      }
    });

    localizeOrderedLists(language);
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
      themeColor.setAttribute(
        "content",
        isDark ? "#102820" : "#f5f0df"
      );
    }
  }

  function refreshPage() {
    const settings = readSettings();
    const language = getLanguage(settings);

    applyLanguage(language);
    applyTheme(settings);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refreshPage);
  } else {
    refreshPage();
  }

  window.addEventListener("storage", (event) => {
    if (event.key === "appSettings") {
      refreshPage();
    }
  });

  window.refreshConditionsPage = refreshPage;
})();
