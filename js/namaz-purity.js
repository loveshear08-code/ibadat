
"use strict";

/* =========================================================
   IBADAT — PAK-PABITRATA
   File: js/namaz-purity.js

   One page, eight topics, separate lesson boards.
   Languages: Bengali, English, Hindi.
   Theme: follows the parent site's light/dark preference.
   ========================================================= */

(() => {
  const IMAGE_DIR = "../assets/images/";

  const UI = {
    bn: {
      pageTitle: "পাক-পবিত্রতা",
      intro: "পাক-পবিত্রতা মানুষের পরিচ্ছন্নতা ও ইবাদতের প্রস্তুতির গুরুত্বপূর্ণ অংশ। সঠিক নিয়মে পবিত্রতা অর্জন করে আমরা নামাজসহ বিভিন্ন ইবাদতের জন্য প্রস্তুত হই।",
      footer: "পবিত্রতা রক্ষা করো, ইবাদতে প্রশান্তি খুঁজে নাও।",
      introduction: "পরিচয় ও গুরুত্ব",
      remember: "মনে রাখুন",
      imageAlt: "শিক্ষামূলক ছবি",
      topics: {
        wudu: "ওযু",
        ghusl: "গোসল",
        tayammum: "তায়াম্মুম",
        "body-purity": "শরীরের পবিত্রতা",
        "clothing-purity": "পোশাকের পবিত্রতা",
        "place-purity": "নামাজের স্থানের পবিত্রতা",
        "impurity-removal": "নাপাকি দূরীকরণ",
        "hayez-nifas": "হায়েজ ও নিফাস"
      }
    },

    en: {
      pageTitle: "Purification",
      intro: "Purity and cleanliness are important parts of preparing for worship. By observing the proper rules of purification, we prepare ourselves for prayer and other acts of worship.",
      footer: "Maintain purity and find peace in worship.",
      introduction: "Introduction and importance",
      remember: "Remember",
      imageAlt: "Educational illustration",
      topics: {
        wudu: "Wudu",
        ghusl: "Ghusl",
        tayammum: "Tayammum",
        "body-purity": "Body purity",
        "clothing-purity": "Clothing purity",
        "place-purity": "Purity of the prayer place",
        "impurity-removal": "Removing impurity",
        "hayez-nifas": "Menstruation and postnatal bleeding"
      }
    },

    hi: {
      pageTitle: "पाक-सफ़ाई",
      intro: "पाकी और स्वच्छता इबादत की तैयारी का महत्वपूर्ण हिस्सा हैं। सही तरीक़े से पाकी हासिल करके हम नमाज़ और दूसरी इबादतों के लिए तैयार होते हैं।",
      footer: "पाकी बनाए रखें और इबादत में सुकून पाएँ।",
      introduction: "परिचय और महत्व",
      remember: "याद रखें",
      imageAlt: "शैक्षिक चित्र",
      topics: {
        wudu: "वुज़ू",
        ghusl: "ग़ुस्ल",
        tayammum: "तयम्मुम",
        "body-purity": "शरीर की पवित्रता",
        "clothing-purity": "कपड़ों की पवित्रता",
        "place-purity": "नमाज़ की जगह की पवित्रता",
        "impurity-removal": "नापाकी दूर करना",
        "hayez-nifas": "हैज़ और निफ़ास"
      }
    }
  };

  /*
   * Every object in boards becomes one independent board.
   * Image filenames match the assets/images directory.
   */

  const LESSONS = {
    wudu: {
      image: "wudu.png",
      intro: {
        bn: "ওযু হলো নির্দিষ্ট অঙ্গ ধোয়া ও মাথা মাসেহ করার মাধ্যমে নামাজের জন্য পবিত্রতা অর্জন। সঠিক ওযুতে পানি যেন নির্ধারিত অঙ্গের সব প্রয়োজনীয় স্থানে পৌঁছায়, তা খেয়াল রাখতে হয়।",
        en: "Wudu is the prescribed purification performed by washing particular body parts and wiping the head before prayer. Ensure water reaches every required area.",
        hi: "वुज़ू नमाज़ से पहले निर्धारित अंगों को धोने और सिर का मसह करके पाकी हासिल करने की प्रक्रिया है। ध्यान रखें कि पानी सभी आवश्यक हिस्सों तक पहुँचे।"
      },
      boards: [
        {
          title: {bn:"ওযুর নিয়ত",en:"Intention for wudu",hi:"वुज़ू की नियत"},
          text: {
            bn:["পবিত্রতা অর্জন করে নামাজ আদায়ের উদ্দেশ্য মনে স্থির করুন। নিয়ত অন্তরের বিষয়; নির্দিষ্ট বাক্য মুখে বলা আবশ্যক নয়।"],
            en:["Intend in your heart to perform wudu for worship. Intention is an act of the heart; a particular spoken formula is not required."],
            hi:["पाकी हासिल करके इबादत करने का इरादा दिल में करें। नियत दिल का काम है; कोई खास वाक्य बोलना अनिवार्य नहीं है।"]
          }
        },
        {
          title:{bn:"দুই হাত ধোয়া",en:"Wash both hands",hi:"दोनों हाथ धोएँ"},
          image:"wudu-hands.png",
          text:{
            bn:["দুই হাত কবজি পর্যন্ত ভালোভাবে ধুয়ে নিন। প্রচলিত সুন্নত পদ্ধতিতে শুরুতে তিনবার ধোয়া হয়। আঙুলের ফাঁকেও পানি পৌঁছান।"],
            en:["Wash both hands up to the wrists. In the commonly taught sunnah method, wash them three times at the beginning. Clean between the fingers."],
            hi:["दोनों हाथों को कलाई तक अच्छी तरह धोएँ। प्रचलित सुन्नत तरीके में शुरुआत में तीन बार धोया जाता है। उँगलियों के बीच भी पानी पहुँचाएँ।"]
          }
        },
        {
          title:{bn:"কুলি করা",en:"Rinse the mouth",hi:"कुल्ली करें"},
          image:"wudu-mouth.png",
          text:{
            bn:["মুখে পানি নিয়ে ভালোভাবে কুলি করুন। সুন্নত পদ্ধতিতে তিনবার কুলি করা হয়। রোজা থাকলে পানি গিলে ফেলা থেকে সতর্ক থাকুন।"],
            en:["Take water into the mouth and rinse thoroughly. The sunnah method includes three rinses. While fasting, take care not to swallow water."],
            hi:["मुँह में पानी लेकर अच्छी तरह कुल्ली करें। सुन्नत तरीके में तीन बार कुल्ली की जाती है। रोज़े में पानी निगलने से बचें।"]
          }
        },
        {
          title:{bn:"নাকে পানি দেওয়া",en:"Rinse the nose",hi:"नाक में पानी डालें"},
          image:"wudu-nose.png",
          text:{
            bn:["নাকে পানি নিয়ে পরিষ্কার করুন এবং পানি বের করে দিন। সুন্নত পদ্ধতিতে তিনবার করা হয়। রোজা থাকলে পানি নাকের গভীরে টেনে নেবেন না।"],
            en:["Gently draw water into the nose and expel it. The sunnah method is performed three times. While fasting, do not draw water deeply into the nose."],
            hi:["नाक में हल्का पानी डालकर साफ़ करें और बाहर निकाल दें। सुन्नत तरीके में तीन बार किया जाता है। रोज़े में पानी अंदर तक न खींचें।"]
          }
        },
        {
          title:{bn:"মুখ ধোয়া",en:"Wash the face",hi:"चेहरा धोएँ"},
          image:"wudu-face.png",
          text:{
            bn:["কপালের স্বাভাবিক চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং মুখের এক পাশ থেকে অন্য পাশ পর্যন্ত পুরো মুখ ধুতে হবে। ফরজ হলো একবার সম্পূর্ণ মুখ ধোয়া; সুন্নত পদ্ধতিতে তিনবার ধোয়া হয়।"],
            en:["Wash the whole face from the normal hairline to the bottom of the chin and from one side of the face to the other. One complete wash is obligatory; the sunnah method washes it three times."],
            hi:["सामान्य हेयरलाइन से ठोड़ी के नीचे तक और चेहरे के एक किनारे से दूसरे किनारे तक पूरा चेहरा धोएँ। एक बार पूरा धोना फ़र्ज़ है; सुन्नत तरीके में तीन बार धोया जाता है।"]
          }
        },
        {
          title:{bn:"দুই হাত কনুইসহ ধোয়া",en:"Wash both arms including the elbows",hi:"कोहनियों सहित दोनों हाथ धोएँ"},
          image:"wudu-arms.png",
          text:{
            bn:["প্রথমে ডান হাত, তারপর বাম হাত আঙুলের ডগা থেকে কনুইসহ ধুয়ে নিন। কনুই অবশ্যই ধোয়ার মধ্যে অন্তর্ভুক্ত হবে। ফরজ হলো একবার সম্পূর্ণ ধোয়া; সুন্নত পদ্ধতিতে তিনবার ধোয়া হয়।"],
            en:["Wash the right arm and then the left, from the fingertips to and including the elbows. One complete wash is obligatory; the sunnah method washes each arm three times."],
            hi:["पहले दायाँ और फिर बायाँ हाथ उँगलियों से कोहनी सहित धोएँ। एक बार पूरा धोना फ़र्ज़ है; सुन्नत तरीके में प्रत्येक हाथ तीन बार धोया जाता है।"]
          }
        },
        {
          title:{bn:"মাথা মাসেহ করা",en:"Wipe the head",hi:"सिर का मसह करें"},
          image:"wudu-head.png",
          text:{
            bn:["ভেজা হাত দিয়ে মাথা মাসেহ করুন। মাথা ধোয়া নয়, মাসেহ করা হয়। পানি যেন মাথার নির্ধারিত অংশে পৌঁছায়, সে জন্য নির্ভরযোগ্যভাবে শেখানো পদ্ধতি অনুসরণ করুন।"],
            en:["Wipe the head with wet hands. The head is wiped, not washed. Follow a reliable taught method for the required extent of wiping."],
            hi:["गीले हाथों से सिर का मसह करें। सिर को धोने के बजाय मसह किया जाता है। आवश्यक हिस्से के लिए विश्वसनीय तरीके का पालन करें।"]
          }
        },
        {
          title:{bn:"কান মাসেহ করা",en:"Wipe the ears",hi:"कानों का मसह करें"},
          image:"wudu-ears.png",
          text:{
            bn:["ভেজা আঙুল দিয়ে কানের দৃশ্যমান ভেতরের অংশ এবং বাইরের অংশ আলতোভাবে মাসেহ করুন।"],
            en:["With damp fingers, gently wipe the accessible inner and outer parts of both ears."],
            hi:["गीली उँगलियों से दोनों कानों के दिखाई देने वाले अंदरूनी और बाहरी हिस्सों का हल्के से मसह करें।"]
          }
        },
        {
          title:{bn:"দুই পা টাখনুসহ ধোয়া",en:"Wash both feet including the ankles",hi:"टखनों सहित दोनों पैर धोएँ"},
          image:"wudu-feet.png",
          text:{
            bn:["প্রথমে ডান পা, তারপর বাম পা টাখনুসহ ধুয়ে নিন। পায়ের আঙুলের ফাঁকেও পানি পৌঁছান। ফরজ হলো একবার সম্পূর্ণ ধোয়া; সুন্নত পদ্ধতিতে তিনবার ধোয়া হয়।"],
            en:["Wash the right foot and then the left, including the ankles. Ensure water reaches between the toes. One complete wash is obligatory; the sunnah method washes each foot three times."],
            hi:["पहले दायाँ और फिर बायाँ पैर टखनों सहित धोएँ। उँगलियों के बीच भी पानी पहुँचाएँ। एक बार पूरा धोना फ़र्ज़ है; सुन्नत तरीके में प्रत्येक पैर तीन बार धोया जाता है।"]
          }
        },
        {
          title:{bn:"ওযুর ফরজ",en:"Obligatory acts of wudu",hi:"वुज़ू के फ़र्ज़"},
          text:{
            bn:["কুরআন, সূরা আল-মায়িদা ৫:৬-এ ওযুর নির্দেশ দেওয়া হয়েছে। মূল ফরজ কাজগুলো হলো:","১. পুরো মুখ ধোয়া।","২. দুই হাত কনুইসহ ধোয়া।","৩. মাথা মাসেহ করা।","৪. দুই পা টাখনুসহ ধোয়া।","ধোয়ার অঙ্গগুলোর প্রতিটি প্রয়োজনীয় স্থানে পানি পৌঁছাতে হবে।"],
            en:["Wudu is described in Qur’an 5:6. The core obligatory acts are:","1. Wash the whole face.","2. Wash both arms including the elbows.","3. Wipe the head.","4. Wash both feet including the ankles.","Water must reach every required area of the parts that are to be washed."],
            hi:["वुज़ू का उल्लेख क़ुरआन 5:6 में है। इसके मुख्य फ़र्ज़ हैं:","1. पूरा चेहरा धोना।","2. कोहनियों सहित दोनों हाथ धोना।","3. सिर का मसह करना।","4. टखनों सहित दोनों पैर धोना।","धोए जाने वाले अंगों के सभी आवश्यक हिस्सों तक पानी पहुँचना चाहिए।"]
          },
          reference: {
            bn:"তথ্যসূত্র: কুরআন, সূরা আল-মায়িদা ৫:৬।",
            en:"Reference: Qur’an, Surah Al-Ma’idah 5:6.",
            hi:"संदर्भ: क़ुरआन, सूरह अल-माइदा 5:6।"
          }
        },
        {
          title:{bn:"ওযুর সুন্নত",en:"Sunnah practices of wudu",hi:"वुज़ू की सुन्नतें"},
          text:{
            bn:["প্রচলিত পূর্ণ সুন্নত পদ্ধতির গুরুত্বপূর্ণ কাজগুলো হলো:","১. শুরুতে বিসমিল্লাহ বলা।","২. দুই হাত কবজি পর্যন্ত তিনবার ধোয়া।","৩. তিনবার কুলি করা ও নাকে পানি দিয়ে পরিষ্কার করা।","৪. মুখ তিনবার ধোয়া।","৫. দুই হাত কনুইসহ তিনবার ধোয়া।","৬. মাথা একবার মাসেহ করা ও কান মাসেহ করা।","৭. দুই পা টাখনুসহ তিনবার ধোয়া।","৮. ডান দিক দিয়ে শুরু করা এবং পানি অপচয় না করা।"],
            en:["Important actions in the commonly taught complete sunnah method include:","1. Saying Bismillah at the beginning.","2. Washing both hands to the wrists three times.","3. Rinsing the mouth and nose three times.","4. Washing the face three times.","5. Washing each arm including the elbow three times.","6. Wiping the head once and wiping the ears.","7. Washing each foot including the ankle three times.","8. Beginning with the right side and avoiding waste."],
            hi:["प्रचलित संपूर्ण सुन्नत तरीके के महत्वपूर्ण काम हैं:","1. शुरुआत में बिस्मिल्लाह कहना।","2. दोनों हाथ कलाई तक तीन बार धोना।","3. तीन बार कुल्ली करना और नाक साफ़ करना।","4. चेहरा तीन बार धोना।","5. कोहनी सहित प्रत्येक हाथ तीन बार धोना।","6. सिर का एक बार मसह और कानों का मसह करना।","7. टखनों सहित प्रत्येक पैर तीन बार धोना।","8. दाएँ तरफ़ से शुरू करना और पानी बर्बाद न करना।"]
          }
        },
        {
          title:{bn:"ওযু ভঙ্গের কারণ",en:"What invalidates wudu",hi:"वुज़ू टूटने के कारण"},
          text:{
            bn:["সাধারণভাবে নিচের ঘটনাগুলো ওযু ভঙ্গ করে:","১. প্রস্রাব, পায়খানা বা বায়ু নির্গত হওয়া।","২. গভীর ঘুম বা চেতনা হারানো।","৩. শরীর থেকে এমন কিছু নির্গত হওয়া, যা ওযু ভঙ্গের অন্তর্ভুক্ত।","৪. এমন অবস্থা সৃষ্টি হওয়া, যাতে গোসল ফরজ হয়।","কোনো বিশেষ পরিস্থিতি নিয়ে সন্দেহ থাকলে নির্ভরযোগ্য ধর্মীয় নির্দেশনা নিন।"],
            en:["Common causes that invalidate wudu include:","1. Urinating, defecating, or passing wind.","2. Deep sleep or loss of consciousness.","3. Certain bodily discharges that invalidate wudu.","4. Entering a state that requires obligatory ghusl.","Seek reliable religious guidance if a particular circumstance is unclear."],
            hi:["आम तौर पर इन स्थितियों में वुज़ू टूट जाता है:","1. पेशाब, पाख़ाना या हवा निकलना।","2. गहरी नींद या बेहोशी।","3. शरीर से कुछ ऐसे पदार्थ निकलना जिनसे वुज़ू टूटता है।","4. ऐसी स्थिति पैदा होना जिसमें फ़र्ज़ ग़ुस्ल आवश्यक हो।","विशेष स्थिति स्पष्ट न हो तो विश्वसनीय धार्मिक मार्गदर्शन लें।"]
          }
        },
        {
          title:{bn:"মনে রাখুন",en:"Remember",hi:"याद रखें"},
          text:{
            bn:["ওযুর ধোয়ার অঙ্গগুলো একবার সম্পূর্ণ ধুলেই ফরজ আদায় হয়; তিনবার ধোয়া সুন্নত পদ্ধতির অংশ। মাথা ও কান মাসেহ করা হয়। পানি যেন কোনো প্রয়োজনীয় স্থানে পৌঁছাতে বাদ না পড়ে।"],
            en:["One complete wash of each required washing part fulfils the washing requirement; washing three times belongs to the sunnah method. The head and ears are wiped. Ensure no required area is missed."],
            hi:["धोए जाने वाले प्रत्येक आवश्यक अंग को एक बार पूरा धोना फ़र्ज़ की पूर्ति करता है; तीन बार धोना सुन्नत तरीके का हिस्सा है। सिर और कानों का मसह किया जाता है। कोई आवश्यक हिस्सा छूटने न दें।"]
          }
        }
      ]
    },

    ghusl: {
      image:"ghusl.png",
      intro:{
        bn:"গোসল হলো পবিত্রতা অর্জনের উদ্দেশ্যে পুরো শরীরে পানি পৌঁছানো। কিছু নির্দিষ্ট অবস্থায় গোসল ফরজ হয়; গোসলের সময় শরীরের কোনো প্রয়োজনীয় অংশ শুকনো রাখা যাবে না।",
        en:"Ghusl is the ritual washing of the whole body to attain purity. It becomes obligatory in specific circumstances, and water must reach all required parts of the body.",
        hi:"ग़ुस्ल पाकी हासिल करने के लिए पूरे शरीर पर पानी पहुँचाने की प्रक्रिया है। कुछ स्थितियों में यह फ़र्ज़ होता है और शरीर के सभी आवश्यक हिस्सों तक पानी पहुँचना चाहिए।"
      },
      boards:[
        {title:{bn:"গোসলের নিয়ত",en:"Intention for ghusl",hi:"ग़ुस्ल की नियत"},text:{
          bn:["পবিত্রতা অর্জনের উদ্দেশ্য মনে স্থির করুন। নির্দিষ্ট বাক্য মুখে বলা আবশ্যক নয়।"],
          en:["Intend in your heart to attain ritual purity. A particular spoken formula is not required."],
          hi:["पाकी हासिल करने का इरादा दिल में करें। कोई खास वाक्य बोलना अनिवार्य नहीं है।"]
        }},
        {title:{bn:"নাপাকি পরিষ্কার করা",en:"Remove physical impurity",hi:"नापाकी साफ़ करें"},text:{
          bn:["শরীরে দৃশ্যমান নাপাকি থাকলে প্রথমে তা পানি দিয়ে পরিষ্কার করুন। এরপর গোসলের বাকি ধাপগুলো সম্পন্ন করুন।"],
          en:["If visible impurity is present on the body, wash it away first, then continue with the remaining steps."],
          hi:["शरीर पर दिखाई देने वाली नापाकी हो तो पहले उसे पानी से साफ़ करें, फिर बाकी चरण पूरे करें।"]
        }},
        {title:{bn:"দুই হাত ধোয়া ও ওযু করা",en:"Wash hands and perform wudu",hi:"हाथ धोएँ और वुज़ू करें"},text:{
          bn:["দুই হাত ধুয়ে নামাজের ওযুর মতো ওযু করুন। গোসলের স্থানে সুবিধা অনুযায়ী পা শেষে ধোয়া যেতে পারে।"],
          en:["Wash the hands and perform wudu as for prayer. Depending on the bathing area, the feet may be washed at the end."],
          hi:["हाथ धोकर नमाज़ वाला वुज़ू करें। नहाने की जगह के अनुसार पैरों को अंत में धोया जा सकता है।"]
        }},
        {title:{bn:"মাথা ও চুলে পানি দেওয়া",en:"Wet the head and hair",hi:"सिर और बालों पर पानी डालें"},text:{
          bn:["মাথায় পানি ঢেলে চুলের গোড়া পর্যন্ত পৌঁছান। চুল ঘন হলে গোড়া ভিজেছে কি না খেয়াল করুন।"],
          en:["Pour water over the head and ensure it reaches the roots of the hair, including where hair is thick."],
          hi:["सिर पर पानी डालें और बालों की जड़ों तक पहुँचाएँ। घने बालों में जड़ों तक पानी पहुँचने का ध्यान रखें।"]
        }},
        {title:{bn:"পুরো শরীরে পানি পৌঁছানো",en:"Wash the entire body",hi:"पूरे शरीर पर पानी पहुँचाएँ"},text:{
          bn:["প্রথমে শরীরের ডান দিক, তারপর বাম দিক ধুয়ে নিন। বগল, নাভি, কানের পেছন, আঙুলের ফাঁক ও শরীরের ভাঁজে পানি পৌঁছান।"],
          en:["Wash the right side and then the left. Ensure water reaches the armpits, navel, behind the ears, between fingers and toes, and skin folds."],
          hi:["पहले दायाँ और फिर बायाँ हिस्सा धोएँ। बगल, नाभि, कानों के पीछे, उँगलियों के बीच और शरीर की सिलवटों तक पानी पहुँचाएँ।"]
        }},
        {title:{bn:"গোসলের ফরজ",en:"Obligatory requirements of ghusl",hi:"ग़ुस्ल के फ़र्ज़"},text:{
          bn:["ফরজ গোসলের মূল শর্ত হলো পুরো শরীরের নির্ধারিত অংশে পানি পৌঁছানো। মুখ ও নাকে পানি পৌঁছানোর বিধানও প্রচলিত শিক্ষায় অন্তর্ভুক্ত। শরীরের কোনো প্রয়োজনীয় অংশ শুকনো রাখবেন না।"],
          en:["The central requirement of obligatory ghusl is that water reaches the entire required body area. Rinsing the mouth and nose is also included in commonly taught instructions. Do not leave a required area dry."],
          hi:["फ़र्ज़ ग़ुस्ल की मुख्य शर्त पूरे आवश्यक शरीर तक पानी पहुँचाना है। प्रचलित शिक्षा में मुँह और नाक में पानी पहुँचाना भी शामिल है। कोई आवश्यक हिस्सा सूखा न छोड़ें।"]
        }},
        {title:{bn:"গোসলের সুন্নত ও আদব",en:"Sunnah practices and etiquette",hi:"ग़ुस्ल की सुन्नतें और आदाब"},text:{
          bn:["শুরুতে বিসমিল্লাহ বলা, হাত ধোয়া, নাপাকি পরিষ্কার করা, ওযু করা, মাথায় পানি দেওয়া এবং পুরো শরীরে পানি পৌঁছানো শেখানো পূর্ণ পদ্ধতির গুরুত্বপূর্ণ অংশ। পানি অপচয় করবেন না।"],
          en:["Beginning with Bismillah, washing the hands, removing impurity, performing wudu, wetting the head, and washing the whole body are important parts of the commonly taught complete method. Avoid wasting water."],
          hi:["बिस्मिल्लाह कहना, हाथ धोना, नापाकी साफ़ करना, वुज़ू करना, सिर पर पानी डालना और पूरे शरीर तक पानी पहुँचाना प्रचलित संपूर्ण तरीके के महत्वपूर्ण हिस्से हैं। पानी बर्बाद न करें।"]
        }},
        {title:{bn:"কখন গোসল ফরজ হয়",en:"When ghusl becomes obligatory",hi:"ग़ुस्ल कब फ़र्ज़ होता है"},text:{
          bn:["যৌনসঙ্গম, বীর্যপাত এবং হায়েজ বা নিফাস শেষ হওয়ার মতো নির্দিষ্ট অবস্থায় গোসল ফরজ হয়। ব্যক্তিগত পরিস্থিতি নিয়ে সন্দেহ থাকলে নির্ভরযোগ্য নির্দেশনা নিন।"],
          en:["Ghusl becomes obligatory in specific circumstances, including sexual intercourse, ejaculation, and the end of menstruation or postnatal bleeding. Seek reliable guidance for personal circumstances."],
          hi:["यौन संबंध, वीर्यस्खलन तथा हैज़ या निफ़ास समाप्त होने जैसी स्थितियों में ग़ुस्ल फ़र्ज़ होता है। व्यक्तिगत स्थिति को लेकर संदेह हो तो विश्वसनीय मार्गदर्शन लें।"]
        }},
        {title:{bn:"মনে রাখুন",en:"Remember",hi:"याद रखें"},text:{
          bn:["গোসলের সময় চুলের গোড়া ও শরীরের সব প্রয়োজনীয় স্থানে পানি পৌঁছানো নিশ্চিত করুন। পরিচ্ছন্নতা বজায় রাখুন এবং পানি অপচয় করবেন না।"],
          en:["Ensure water reaches the hair roots and every required body area. Maintain cleanliness and avoid wasting water."],
          hi:["बालों की जड़ों और शरीर के सभी आवश्यक हिस्सों तक पानी पहुँचाएँ। सफ़ाई बनाए रखें और पानी बर्बाद न करें।"]
        }}
      ]
    },

    tayammum: {
      image:"tayammum.png",
      intro:{
        bn:"পানি না পাওয়া গেলে বা পানি ব্যবহার করলে ক্ষতির আশঙ্কা থাকলে নির্ধারিত শর্তে তায়াম্মুম করা যায়। এতে উপযুক্ত পরিষ্কার মাটিজাতীয় উপাদান দিয়ে মুখ ও হাত মাসেহ করা হয়।",
        en:"Tayammum is a prescribed dry purification allowed when water is unavailable or its use could cause harm. Suitable clean earth is used to wipe the face and hands.",
        hi:"पानी न मिलने या उसके उपयोग से नुकसान का डर होने पर निर्धारित शर्तों के साथ तयम्मुम किया जा सकता है। इसमें उपयुक्त साफ़ मिट्टी से चेहरे और हाथों का मसह किया जाता है।"
      },
      boards:[
        {title:{bn:"তায়াম্মুমের নিয়ত ও শর্ত",en:"Intention and conditions",hi:"नियत और शर्तें"},text:{
          bn:["পবিত্রতা অর্জনের নিয়ত করুন। পানি না পাওয়া, তা ব্যবহার করতে অক্ষমতা বা ক্ষতির যুক্তিসংগত আশঙ্কার মতো বৈধ কারণ থাকতে হবে। উপযুক্ত পরিষ্কার মাটিজাতীয় উপাদান ব্যবহার করুন।"],
          en:["Intend to attain purification. There must be a valid reason, such as unavailable water, inability to use it, or a reasonable risk of harm. Use suitable clean earth-based material."],
          hi:["पाकी की नियत करें। पानी न मिलना, उसे इस्तेमाल न कर पाना या नुकसान का उचित डर जैसी वैध वजह होनी चाहिए। उपयुक्त साफ़ मिट्टी वाली सामग्री इस्तेमाल करें।"]
        }},
        {title:{bn:"হাত মাটিতে স্পর্শ করানো",en:"Touch suitable earth",hi:"उपयुक्त मिट्टी को छुएँ"},image:"tayammum-hands.png",text:{
          bn:["দুই হাত পরিষ্কার ও উপযুক্ত মাটিজাতীয় পৃষ্ঠে স্পর্শ করান। অতিরিক্ত ধুলো থাকলে হালকাভাবে ঝেড়ে নিন।"],
          en:["Touch both hands to a clean, suitable earth-based surface. If there is excess dust, shake it off gently."],
          hi:["दोनों हाथों को साफ़ और उपयुक्त मिट्टी वाली सतह से छुआएँ। अधिक धूल हो तो हल्के से झाड़ दें।"]
        }},
        {title:{bn:"মুখ মাসেহ করা",en:"Wipe the face",hi:"चेहरे का मसह करें"},image:"tayammum-face.png",text:{
          bn:["হাত দিয়ে পুরো মুখ মাসেহ করুন, যেন নির্ধারিত কোনো অংশ বাদ না পড়ে।"],
          en:["Wipe the whole face with the hands, making sure no required area is missed."],
          hi:["हाथों से पूरे चेहरे का मसह करें और ध्यान रखें कि कोई आवश्यक हिस्सा छूट न जाए।"]
        }},
        {title:{bn:"দুই হাত মাসেহ করা",en:"Wipe both hands",hi:"दोनों हाथों का मसह करें"},image:"tayammum-arms.png",text:{
          bn:["নির্ধারিত পদ্ধতিতে দুই হাত মাসেহ করুন। হাতের কোন সীমা পর্যন্ত মাসেহ করতে হবে এবং মাটিতে কতবার হাত দিতে হবে, তা সঠিকভাবে শিখে অনুসরণ করুন।"],
          en:["Wipe both hands according to the prescribed method. Learn the required extent of wiping and how many times the hands touch the earth."],
          hi:["निर्धारित तरीके से दोनों हाथों का मसह करें। कहाँ तक मसह करना है और मिट्टी को कितनी बार छूना है, यह सही तरीके से सीखें।"]
        }},
        {title:{bn:"তায়াম্মুমের মূল কাজ",en:"Essential acts of tayammum",hi:"तयम्मुम के आवश्यक काम"},text:{
          bn:["তায়াম্মুমের মূল কাজ হলো পবিত্রতার নিয়ত করে উপযুক্ত মাটিজাতীয় উপাদান দিয়ে মুখ ও হাত মাসেহ করা। সঠিক সীমা ও ক্রম জানা জরুরি।"],
          en:["The essential acts are intending purification and wiping the face and hands with suitable earth-based material. Learn the required extent and order."],
          hi:["तयम्मुम के मुख्य काम पाकी की नियत करना और उपयुक्त मिट्टी से चेहरे तथा हाथों का मसह करना हैं। सही सीमा और क्रम जानना ज़रूरी है।"]
        }},
        {title:{bn:"তায়াম্মুম ভঙ্গের কারণ",en:"What invalidates tayammum",hi:"तयम्मुम टूटने के कारण"},text:{
          bn:["সাধারণভাবে যে কারণে ওযু ভঙ্গ হয়, সেসব কারণে তায়াম্মুমও ভঙ্গ হয়। পানি পাওয়া গেলে এবং তা ব্যবহার করা সম্ভব হলে তায়াম্মুমের অনুমতি শেষ হয়ে যেতে পারে।"],
          en:["In general, the things that invalidate wudu also invalidate tayammum. When water becomes available and can be used, the allowance for tayammum may end."],
          hi:["आम तौर पर जिन कारणों से वुज़ू टूटता है, उनसे तयम्मुम भी टूटता है। पानी उपलब्ध हो जाए और इस्तेमाल करना संभव हो, तो तयम्मुम की अनुमति समाप्त हो सकती है।"]
        }},
        {title:{bn:"মনে রাখুন",en:"Remember",hi:"याद रखें"},text:{
          bn:["তায়াম্মুম কেবল বৈধ প্রয়োজনের সময় করা হয়। উপযুক্ত পরিষ্কার মাটিজাতীয় উপাদান ব্যবহার করুন এবং মুখ ও হাতের নির্ধারিত অংশ ঠিকভাবে মাসেহ করুন।"],
          en:["Tayammum is used only when its conditions are met. Use suitable clean earth-based material and wipe the required parts of the face and hands properly."],
          hi:["तयम्मुम तभी करें जब उसकी शर्तें पूरी हों। उपयुक्त साफ़ मिट्टी इस्तेमाल करें और चेहरे व हाथों के आवश्यक हिस्सों का सही मसह करें।"]
        }}
      ]
    },

    "body-purity": {
      image:"body-purity.png",
      intro:{
        bn:"শরীর পরিষ্কার রাখা ইসলামের পরিচ্ছন্নতার শিক্ষার অংশ। শরীরে নাপাকি লাগলে প্রযোজ্য নিয়মে তা দূর করতে হবে; দৈনন্দিন স্বাস্থ্যবিধিও বজায় রাখা জরুরি।",
        en:"Keeping the body clean is part of Islamic teaching on cleanliness. Remove impurity according to the applicable rules and maintain everyday hygiene.",
        hi:"शरीर को साफ़ रखना इस्लामी स्वच्छता की शिक्षा का हिस्सा है। नापाकी लग जाए तो लागू नियमों के अनुसार उसे दूर करें और सामान्य स्वच्छता भी बनाए रखें।"
      },
      boards:[
        {title:{bn:"দৈনন্দিন পরিচ্ছন্নতা",en:"Everyday hygiene",hi:"रोज़मर्रा की सफ़ाई"},text:{
          bn:["নিয়মিত গোসল করুন, ঘাম ও ময়লা পরিষ্কার করুন এবং নখ ও শরীরের পরিচ্ছন্নতার যত্ন নিন।"],
          en:["Bathe regularly, remove sweat and dirt, and care for nails and general hygiene."],
          hi:["नियमित स्नान करें, पसीना और मैल साफ़ करें तथा नाखूनों और सामान्य स्वच्छता का ध्यान रखें।"]
        }},
        {title:{bn:"শরীরে নাপাকি লাগলে",en:"If impurity gets on the body",hi:"शरीर पर नापाकी लग जाए तो"},text:{
          bn:["যে অংশে নাপাকি লেগেছে, সেই অংশ পরিষ্কার পানি দিয়ে ধুয়ে নিন, যতক্ষণ না নাপাকি দূর হয়। আলাদা কারণে গোসল ফরজ না হলে পুরো শরীর ধোয়া প্রয়োজন হয় না।"],
          en:["Wash the affected area with clean water until the impurity is removed. Washing the whole body is not necessary unless there is a separate reason that makes ghusl obligatory."],
          hi:["जिस हिस्से पर नापाकी लगी है, उसे साफ़ पानी से तब तक धोएँ जब तक नापाकी दूर न हो जाए। अलग से फ़र्ज़ ग़ुस्ल की वजह न हो तो पूरा शरीर धोना ज़रूरी नहीं।"]
        }},
        {title:{bn:"অসুস্থতা বা আঘাতের ক্ষেত্রে",en:"In case of illness or injury",hi:"बीमारी या चोट की स्थिति में"},text:{
          bn:["পানি ব্যবহার করলে ক্ষতি বাড়ার আশঙ্কা থাকলে নিজের পরিস্থিতি অনুযায়ী নির্ভরযোগ্য চিকিৎসা ও ধর্মীয় নির্দেশনা নিন। পরিচ্ছন্নতার জন্য শরীরের ক্ষতি করবেন না।"],
          en:["If water may worsen an injury or illness, seek reliable medical and religious guidance. Do not harm yourself in an attempt to clean."],
          hi:["यदि पानी से चोट या बीमारी बढ़ने का डर हो, तो विश्वसनीय चिकित्सकीय और धार्मिक सलाह लें। सफ़ाई के लिए खुद को नुकसान न पहुँचाएँ।"]
        }},
        {title:{bn:"মনে রাখুন",en:"Remember",hi:"याद रखें"},text:{
          bn:["সাধারণ ময়লা ও ধর্মীয় নাপাকি এক বিষয় নয়। যে অংশে নাপাকি লেগেছে তা যথাযথভাবে পরিষ্কার করুন এবং অযথা সন্দেহে পড়বেন না।"],
          en:["Ordinary dirt and ritual impurity are not the same. Clean the affected area properly and avoid unnecessary doubts."],
          hi:["सामान्य मैल और धार्मिक नापाकी एक ही चीज़ नहीं हैं। प्रभावित हिस्से को अच्छी तरह साफ़ करें और बेवजह शक न करें।"]
        }}
      ]
    },

    "clothing-purity": {
      image:"clothing-purity.png",
      intro:{
        bn:"নামাজের পোশাক পরিষ্কার হতে হবে এবং শরীরের আবশ্যক অংশ ঢাকতে হবে। পোশাকে নাপাকি লাগলে আক্রান্ত অংশ পরিষ্কার করুন।",
        en:"Prayer clothing should be clean and cover the required parts of the body. If impurity gets on clothing, clean the affected area.",
        hi:"नमाज़ के कपड़े साफ़ होने चाहिए और शरीर के आवश्यक हिस्सों को ढकना चाहिए। कपड़ों पर नापाकी लग जाए तो प्रभावित हिस्से को साफ़ करें।"
      },
      boards:[
        {title:{bn:"নামাজের পোশাক",en:"Clothing for prayer",hi:"नमाज़ के कपड़े"},text:{
          bn:["নামাজের আগে পোশাকে দৃশ্যমান ময়লা বা নাপাকি আছে কি না দেখুন। পোশাক পরিষ্কার ও শরীর ঢাকার উপযোগী হওয়া উচিত।"],
          en:["Before prayer, check for visible dirt or impurity. Clothing should be clean and cover the required parts of the body."],
          hi:["नमाज़ से पहले कपड़ों पर दिखाई देने वाला मैल या नापाकी जाँच लें। कपड़े साफ़ हों और शरीर के आवश्यक हिस्सों को ढकें।"]
        }},
        {title:{bn:"পোশাকে নাপাকি লাগলে",en:"If clothing becomes impure",hi:"कपड़ों पर नापाकी लग जाए तो"},text:{
          bn:["যে অংশে নাপাকি লেগেছে, সেটি পানি দিয়ে ভালোভাবে ধুয়ে নিন। পুরো পোশাক ধোয়া প্রয়োজন কি না, তা নাপাকির বিস্তার ও পরিষ্কারের পদ্ধতির ওপর নির্ভর করে।"],
          en:["Wash the affected area thoroughly with water. Whether the whole garment needs washing depends on the spread of impurity and the cleaning method."],
          hi:["जिस हिस्से पर नापाकी लगी है, उसे पानी से अच्छी तरह धोएँ। पूरा कपड़ा धोना है या नहीं, यह नापाकी के फैलाव और सफ़ाई के तरीके पर निर्भर करता है।"]
        }},
        {title:{bn:"পরিষ্কার করার পর",en:"After cleaning",hi:"साफ़ करने के बाद"},text:{
          bn:["নাপাকি দূর হয়েছে কি না নিশ্চিত করুন। নাপাকির বস্তু দূর হয়ে গেলে কেবল হালকা দাগ বা গন্ধ থাকলেই নাপাকি রয়ে গেছে বলে ধরে নেবেন না।"],
          en:["Make sure the impurity has been removed. If the impure substance has been removed, a faint stain or smell alone does not necessarily mean impurity remains."],
          hi:["सुनिश्चित करें कि नापाकी दूर हो गई है। नापाक पदार्थ हट जाने पर केवल हल्का दाग या गंध रहना अपने-आप में नापाकी बाकी होने का प्रमाण नहीं है।"]
        }},
        {title:{bn:"মনে রাখুন",en:"Remember",hi:"याद रखें"},text:{
          bn:["নামাজের আগে পোশাক পরিষ্কার এবং শরীর ঢাকার উপযোগী কি না দেখুন। নাপাকি নিশ্চিত হলে তা দূর করুন; শুধু সন্দেহের কারণে পোশাককে নাপাক ধরে নেবেন না।"],
          en:["Before prayer, check that clothing is clean and provides the required coverage. Remove confirmed impurity, but do not treat clothing as impure based only on doubt."],
          hi:["नमाज़ से पहले कपड़ों की सफ़ाई और आवश्यक ढकाव जाँचें। निश्चित नापाकी दूर करें, लेकिन केवल शक के आधार पर कपड़ों को नापाक न मानें।"]
        }}
      ]
    },

    "place-purity": {
      image:"place-purity.png",
      intro:{
        bn:"নামাজের স্থানে নাপাকি থাকা উচিত নয়। মেঝে, জায়নামাজ বা কার্পেটে নাপাকি নিশ্চিত হলে প্রযোজ্য নিয়মে পরিষ্কার করে নিন।",
        en:"The prayer area should be free from impurity. If impurity is known to be on the floor, prayer mat, or carpet, clean it according to the applicable rules.",
        hi:"नमाज़ की जगह नापाकी से पाक होनी चाहिए। फ़र्श, जानमाज़ या कालीन पर नापाकी निश्चित हो तो लागू नियमों के अनुसार साफ़ करें।"
      },
      boards:[
        {title:{bn:"নামাজের স্থান পরীক্ষা",en:"Check the prayer area",hi:"नमाज़ की जगह जाँचें"},text:{
          bn:["নামাজের আগে জায়গাটি দেখে নিন। দৃশ্যমান নাপাকি থাকলে সরিয়ে পরিষ্কার করুন। শুধু সন্দেহের কারণে পরিষ্কার স্থানকে নাপাক ধরে নেওয়ার প্রয়োজন নেই।"],
          en:["Check the area before prayer. Remove and clean visible impurity. A clean place does not need to be treated as impure merely because of unsupported suspicion."],
          hi:["नमाज़ से पहले जगह देख लें। दिखाई देने वाली नापाकी हो तो हटाकर साफ़ करें। केवल शक के कारण साफ़ जगह को नापाक मानना ज़रूरी नहीं।"]
        }},
        {title:{bn:"মেঝে বা কার্পেটে নাপাকি",en:"Impurity on a floor or carpet",hi:"फ़र्श या कालीन पर नापाकी"},text:{
          bn:["নাপাকির স্থান নির্ধারণ করে উপযুক্ত পদ্ধতিতে পরিষ্কার করুন। পানি ব্যবহার করলে তা আক্রান্ত স্থানে পৌঁছাতে দিন এবং নাপাকি দূর করুন।"],
          en:["Identify the affected area and clean it appropriately. When using water, ensure it reaches the affected area and removes the impurity."],
          hi:["प्रभावित जगह पहचानकर उचित तरीके से साफ़ करें। पानी इस्तेमाल करते समय उसे प्रभावित हिस्से तक पहुँचाएँ और नापाकी दूर करें।"]
        }},
        {title:{bn:"জায়নামাজ ও অন্যান্য জিনিস",en:"Prayer mats and other items",hi:"जानमाज़ और दूसरी चीज़ें"},text:{
          bn:["জায়নামাজ, চাদর বা অন্য কোনো বস্তুতে নাপাকি লাগলে সেই অংশ পরিষ্কার করুন। নামাজের জায়গা পরিষ্কার রাখুন।"],
          en:["If a prayer mat, sheet, or other item becomes impure, clean the affected area. Keep the prayer space clean."],
          hi:["जानमाज़, चादर या किसी दूसरी चीज़ पर नापाकी लगे तो प्रभावित हिस्सा साफ़ करें। नमाज़ की जगह साफ़ रखें।"]
        }},
        {title:{bn:"মনে রাখুন",en:"Remember",hi:"याद रखें"},text:{
          bn:["নামাজের স্থান পরিষ্কার রাখুন। নাপাকি নিশ্চিত হলে পরিষ্কার করুন; কেবল সন্দেহের ভিত্তিতে কোনো স্থানকে নাপাক ঘোষণা করবেন না।"],
          en:["Keep the prayer area clean. Clean confirmed impurity, but do not declare a place impure based only on doubt."],
          hi:["नमाज़ की जगह साफ़ रखें। निश्चित नापाकी साफ़ करें, लेकिन केवल शक के आधार पर जगह को नापाक न मानें।"]
        }}
      ]
    },

    "impurity-removal": {
      image:"impurity-removal.png",
      intro:{
        bn:"নাপাকি দূর করার উদ্দেশ্য হলো নাপাক বস্তু পরিষ্কার করা। কোথায় নাপাকি লেগেছে এবং কী ধরনের নাপাকি, তার ওপর পরিষ্কারের পদ্ধতি নির্ভর করে।",
        en:"The aim of removing impurity is to clean away the impure substance. The method depends on the type of impurity and where it is found.",
        hi:"नापाकी दूर करने का उद्देश्य नापाक पदार्थ को साफ़ करना है। तरीका इस बात पर निर्भर करता है कि नापाकी किस प्रकार की है और कहाँ लगी है।"
      },
      boards:[
        {title:{bn:"নাপাকি শনাক্ত করা",en:"Identify the impurity",hi:"नापाकी पहचानें"},text:{
          bn:["নাপাকি কোথায় লেগেছে তা নির্ধারণ করুন—শরীর, পোশাক নাকি মেঝে। প্রয়োজনমতো দৃশ্যমান নাপাকি আগে সরিয়ে নিন।"],
          en:["Identify where the impurity is—on the body, clothing, or floor. Remove visible material first when appropriate."],
          hi:["पहचानें कि नापाकी कहाँ लगी है—शरीर, कपड़ों या फ़र्श पर। जहाँ ज़रूरी हो, दिखाई देने वाला पदार्थ पहले हटा दें।"]
        }},
        {title:{bn:"পানি দিয়ে পরিষ্কার করা",en:"Clean with water",hi:"पानी से साफ़ करें"},text:{
          bn:["আক্রান্ত স্থানে পরিষ্কার পানি ব্যবহার করুন এবং নাপাকি দূর করুন। কাপড় বা পানি শোষণকারী বস্তু হলে প্রয়োজনমতো ধুয়ে নিন।"],
          en:["Use clean water on the affected area and remove the impurity. Wash fabric or absorbent material as needed."],
          hi:["प्रभावित हिस्से पर साफ़ पानी डालकर नापाकी दूर करें। कपड़े या पानी सोखने वाली चीज़ को ज़रूरत के अनुसार धोएँ।"]
        }},
        {title:{bn:"শরীর, পোশাক ও স্থানের পরিচ্ছন্নতা",en:"Cleaning the body, clothing, and surfaces",hi:"शरीर, कपड़े और सतह की सफ़ाई"},text:{
          bn:["শরীরে নাপাকি লাগলে আক্রান্ত অংশ ধুয়ে নিন। পোশাকে লাগলে সেই অংশ পরিষ্কার করুন। মেঝে বা কার্পেটে লাগলে আক্রান্ত স্থান পরিষ্কার করুন। বস্তু অনুযায়ী পদ্ধতি বদলাতে পারে।"],
          en:["For the body, wash the affected area. For clothing, clean the affected portion. For a floor or carpet, clean the affected spot. The method may vary by material."],
          hi:["शरीर पर नापाकी हो तो प्रभावित हिस्सा धोएँ। कपड़ों पर हो तो वही हिस्सा साफ़ करें। फ़र्श या कालीन पर हो तो प्रभावित जगह साफ़ करें। सामग्री के अनुसार तरीका बदल सकता है।"]
        }},
        {title:{bn:"মনে রাখুন",en:"Remember",hi:"याद रखें"},text:{
          bn:["নাপাকি দূর হওয়ার মতো যথাযথ পরিষ্কার করাই মূল কথা। পরিষ্কার হয়ে গেলে অকারণে বারবার ধোয়া বা পানি অপচয় করা জরুরি নয়।"],
          en:["The key is to clean properly until the impurity is removed. Repeated washing and wasting water are unnecessary once the area is clean."],
          hi:["मुख्य बात नापाकी को ठीक से दूर करना है। जगह साफ़ हो जाने के बाद बार-बार धोना या पानी बर्बाद करना ज़रूरी नहीं।"]
        }}
      ]
    },

    "hayez-nifas": {
      image:"hayez-nifas.png",
      intro:{
        bn:"হায়েজ হলো মাসিক ঋতুস্রাব এবং নিফাস হলো সন্তান প্রসবের পরের রক্তস্রাব। এই সময় নামাজ, রোজা, পবিত্রতা ও গোসলের বিধান বুঝে চলা জরুরি।",
        en:"Hayez refers to menstruation and nifas to postnatal bleeding. It is important to understand the related rules for prayer, fasting, purity, and ghusl.",
        hi:"हैज़ मासिक धर्म और निफ़ास प्रसव के बाद होने वाले रक्तस्राव को कहते हैं। नमाज़, रोज़ा, पाकी और ग़ुस्ल के संबंधित नियम समझना ज़रूरी है।"
      },
      boards:[
        {title:{bn:"হায়েজ কী",en:"What is hayez?",hi:"हैज़ क्या है?"},text:{
          bn:["হায়েজ হলো নারীদের মাসিক ঋতুস্রাব। এ সময় নামাজ আদায় করা হয় না। রোজার ক্ষেত্রে প্রযোজ্য বিধান অনুসরণ করতে হয়।"],
          en:["Hayez is menstruation. Prayer is not performed during this period, and the applicable rules for fasting should be followed."],
          hi:["हैज़ मासिक धर्म है। इस अवधि में नमाज़ नहीं पढ़ी जाती और रोज़े के लागू नियमों का पालन किया जाता है।"]
        }},
        {title:{bn:"নিফাস কী",en:"What is nifas?",hi:"निफ़ास क्या है?"},text:{
          bn:["সন্তান প্রসবের পরের রক্তস্রাবকে নিফাস বলা হয়। এই সময়ের ইবাদত ও পবিত্রতার বিধান বুঝে চলতে হবে।"],
          en:["Nifas is bleeding after childbirth. The applicable rules for worship and purity should be observed."],
          hi:["प्रसव के बाद होने वाले रक्तस्राव को निफ़ास कहते हैं। इस अवधि में इबादत और पाकी के लागू नियमों का पालन करना चाहिए।"]
        }},
        {title:{bn:"এই সময় নামাজ ও রোজা",en:"Prayer and fasting during this time",hi:"इस अवधि में नमाज़ और रोज़ा"},text:{
          bn:["হায়েজ ও নিফাস চলাকালে নামাজ আদায় করা হয় না। রোজার বিষয়ে প্রযোজ্য বিধান মেনে চলুন; যে রোজাগুলো পরে পূরণ করতে হয়, সেগুলো কাজা করুন।"],
          en:["Prayer is not performed during menstruation or postnatal bleeding. Follow the applicable fasting rules and make up the fasts that are required later."],
          hi:["हैज़ और निफ़ास के दौरान नमाज़ नहीं पढ़ी जाती। रोज़े के लागू नियमों का पालन करें और जिन रोज़ों की क़ज़ा आवश्यक हो, उन्हें बाद में पूरा करें।"]
        }},
        {title:{bn:"রক্তস্রাব শেষ হলে গোসল",en:"Ghusl after bleeding ends",hi:"रक्तस्राव समाप्त होने पर ग़ुस्ल"},text:{
          bn:["রক্তস্রাব সম্পূর্ণ বন্ধ হয়ে পবিত্রতা ফিরে এলে প্রযোজ্য নিয়ম অনুযায়ী গোসল করুন। এরপর নামাজ ও অন্যান্য ইবাদত শুরু করুন।"],
          en:["When bleeding has fully stopped and purity has returned, perform ghusl according to the applicable rules, then resume prayer and other worship."],
          hi:["रक्तस्राव पूरी तरह बंद हो जाए और पाकी लौट आए तो लागू नियमों के अनुसार ग़ुस्ल करें। फिर नमाज़ और दूसरी इबादत शुरू करें।"]
        }},
        {title:{bn:"বিশেষ পরিস্থিতি",en:"Special circumstances",hi:"विशेष परिस्थितियाँ"},text:{
          bn:["অনিয়মিত বা দীর্ঘ সময় রক্তস্রাব হলে তারিখ ও বিবরণ লিখে রাখুন। এ ধরনের পরিস্থিতিতে ব্যক্তিগত নির্দেশনা প্রয়োজন হতে পারে; নির্ভরযোগ্য আলেম বা স্বাস্থ্য-পেশাজীবীর পরামর্শ নিন।"],
          en:["If bleeding is irregular or prolonged, keep a record of dates and details. Individual guidance may be needed; consult a reliable scholar or health professional as appropriate."],
          hi:["यदि रक्तस्राव अनियमित या लंबे समय तक हो, तो तारीख़ें और विवरण लिखें। ऐसी स्थिति में व्यक्तिगत मार्गदर्शन की ज़रूरत हो सकती है; विश्वसनीय विद्वान या स्वास्थ्य विशेषज्ञ से सलाह लें।"]
        }},
        {title:{bn:"মনে রাখুন",en:"Remember",hi:"याद रखें"},text:{
          bn:["হায়েজ ও নিফাসের সময়সীমা নিয়ে অনুমান না করে নির্ভরযোগ্য নির্দেশনা নিন। রক্তস্রাব শেষ হয়ে পবিত্রতা ফিরে এলে প্রযোজ্য নিয়ম অনুযায়ী গোসল করে ইবাদত শুরু করুন।"],
          en:["Do not guess about the duration of menstruation or postnatal bleeding; seek reliable guidance. When bleeding ends and purity returns, perform ghusl as required and resume worship."],
          hi:["हैज़ और निफ़ास की अवधि का अनुमान न लगाएँ; विश्वसनीय मार्गदर्शन लें। रक्तस्राव समाप्त होकर पाकी लौटने पर आवश्यक ग़ुस्ल करें और इबादत शुरू करें।"]
        }}
      ]
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);

  let currentLanguage = "bn";
  let currentTheme = "light";
  let rendering = false;

  function pickText(value) {
    if (typeof value === "string") return value;
    if (!value) return "";
    return value[currentLanguage] || value.bn || value.en || value.hi || "";
  }

  function readLanguage() {
    const root = document.documentElement;
    const body = document.body;

    const candidates = [
      root.dataset.language,
      root.dataset.lang,
      root.lang,
      body.dataset.language,
      body.dataset.lang
    ];

    try {
      candidates.push(
        localStorage.getItem("ibadat-language"),
        localStorage.getItem("selectedLanguage"),
        localStorage.getItem("language")
      );
    } catch (_) {}

    for (const candidate of candidates) {
      if (!candidate) continue;
      const code = String(candidate).toLowerCase().slice(0, 2);
      if (UI[code]) return code;
    }

    return "bn";
  }

  function readTheme() {
    const root = document.documentElement;
    const body = document.body;

    const values = [
      root.dataset.theme,
      body.dataset.theme,
      root.dataset.mode,
      body.dataset.mode
    ].filter(Boolean).join(" ").toLowerCase();

    if (
      values.includes("dark") ||
      root.classList.contains("dark") ||
      body.classList.contains("dark") ||
      body.classList.contains("dark-mode")
    ) {
      return "dark";
    }

    try {
      const saved =
        localStorage.getItem("ibadat-theme") ||
        localStorage.getItem("theme") ||
        localStorage.getItem("color-theme");

      if (saved && /dark|night/i.test(saved)) return "dark";
    } catch (_) {}

    return "light";
  }

  function makeElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) {
      node.textContent = text;
    }
    return node;
  }

  function appendImage(board, filename, alt) {
    if (!filename) return;

    const img = makeElement("img", "lesson-image");
    img.src = IMAGE_DIR + filename;
    img.alt = alt || UI[currentLanguage].imageAlt;
    img.loading = "lazy";
    img.decoding = "async";

    img.addEventListener("error", () => {
      img.hidden = true;
      console.warn("IBADAT: image not found:", img.src);
    });

    board.appendChild(img);
  }

  function appendText(board, textList) {
    const paragraphs =
      textList[currentLanguage] ||
      textList.bn ||
      textList.en ||
      [];

    paragraphs.forEach((text) => {
      board.appendChild(makeElement("p", "", text));
    });
  }

  function makeBoard(topicId, data, index, intro = false) {
    const board = makeElement("article", "lesson-board");

    board.dataset.topic = topicId;
    board.dataset.part = String(index + 1);

    const titleText = pickText(data.title);
    const reminder =
      titleText === UI[currentLanguage].remember;

    board.classList.add(
      intro ? "lesson-intro" :
      reminder ? "lesson-reminder" :
      "lesson-step"
    );

    board.appendChild(
      makeElement("h3", "", titleText)
    );

    if (data.image) {
      appendImage(board, data.image, titleText);
    }

    if (data.text) {
      appendText(board, data.text);
    }

    if (data.reference) {
      const source = makeElement("p", "lesson-source");
      source.textContent = pickText(data.reference);
      board.appendChild(source);
    }

    return board;
  }

  function renderTopic(topicId) {
    const topic = LESSONS[topicId];
    const section = document.querySelector(
      '.purity-topic[data-topic="' + topicId + '"]'
    );
    const container = document.getElementById(
      "content-" + topicId
    );

    if (!topic || !section || !container) {
      console.error("IBADAT: missing topic container:", topicId);
      return;
    }

    const heading = section.querySelector(".topic-heading");
    if (heading) {
      heading.textContent = UI[currentLanguage].topics[topicId];
    }

    container.replaceChildren();

    const introBoard = makeBoard(
      topicId,
      {
        title: {
          bn: UI.bn.introduction,
          en: UI.en.introduction,
          hi: UI.hi.introduction
        },
        image: topic.image,
        text: {
          bn: [topic.intro.bn],
          en: [topic.intro.en],
          hi: [topic.intro.hi]
        }
      },
      -1,
      true
    );

    container.appendChild(introBoard);

    topic.boards.forEach((data, index) => {
      const boardData = {
        ...data,
        title: data.title
      };

      const board = makeBoard(topicId, boardData, index);

      const reminderTitle = {
        bn: "মনে রাখুন",
        en: "Remember",
        hi: "याद रखें"
      };

      if (pickText(data.title) === reminderTitle[currentLanguage]) {
        board.classList.remove("lesson-step");
        board.classList.add("lesson-reminder");
      }

      container.appendChild(board);
    });
  }

  function setLanguage(language) {
    const lang = String(language || "").toLowerCase().slice(0, 2);
    if (!UI[lang]) return false;

    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dataset.language = lang;

    const title = $("#pageTitle");
    const intro = $("#pageIntro");
    const footer = $("#footerText");

    if (title) title.textContent = UI[lang].pageTitle;
    if (intro) intro.textContent = UI[lang].intro;
    if (footer) footer.textContent = UI[lang].footer;

    rendering = true;
    Object.keys(LESSONS).forEach(renderTopic);
    rendering = false;

    document.title = UI[lang].pageTitle + " | IBADAT";

    window.dispatchEvent(new CustomEvent("ibadat:purity-ready", {
      detail: {
        language: currentLanguage,
        theme: currentTheme
      }
    }));

    return true;
  }

  function setTheme(theme) {
    const value = /dark|night/i.test(String(theme)) ? "dark" : "light";
    currentTheme = value;

    document.documentElement.dataset.theme = value;
    document.body.dataset.theme = value;
    document.body.classList.toggle("dark-mode", value === "dark");

    return value;
  }

  function connectSiteSettings() {
    /*
     * The parent site can notify this page when settings change:
     *
     * window.dispatchEvent(new CustomEvent("ibadat:language-changed", {
     *   detail: { language: "en" }
     * }));
     *
     * window.dispatchEvent(new CustomEvent("ibadat:theme-changed", {
     *   detail: { theme: "dark" }
     * }));
     */

    window.addEventListener("ibadat:language-changed", (event) => {
      const language = event.detail?.language || event.detail?.lang;
      if (language) setLanguage(language);
    });

    window.addEventListener("ibadat:theme-changed", (event) => {
      const theme = event.detail?.theme || event.detail?.mode;
      if (theme) setTheme(theme);
    });

    window.addEventListener("storage", (event) => {
      if (
        ["ibadat-language", "selectedLanguage", "language"].includes(event.key)
      ) {
        setLanguage(event.newValue || "bn");
      }

      if (
        ["ibadat-theme", "theme", "color-theme"].includes(event.key)
      ) {
        setTheme(event.newValue || "light");
      }
    });

    /*
     * Follow changes to common site-wide HTML attributes/classes.
     * No language or theme controls are added to this page.
     */
    const observer = new MutationObserver(() => {
      if (rendering) return;

      const lang = readLanguage();
      const theme = readTheme();

      if (lang !== currentLanguage) setLanguage(lang);
      if (theme !== currentTheme) setTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [
        "lang",
        "class",
        "data-theme",
        "data-language",
        "data-lang",
        "data-mode"
      ]
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [
        "class",
        "data-theme",
        "data-language",
        "data-lang",
        "data-mode"
      ]
    });
  }

  function init() {
    if (!$("#purityPage") || !$("#purityLessons")) {
      console.error(
        "IBADAT Purity: expected #purityPage and #purityLessons in the HTML."
      );
      return;
    }

    currentLanguage = readLanguage();
    currentTheme = readTheme();

    setTheme(currentTheme);
    setLanguage(currentLanguage);
    connectSiteSettings();

    window.IBADATPurity = Object.freeze({
      setLanguage,
      setTheme,
      getLanguage: () => currentLanguage,
      getTheme: () => currentTheme,
      getTopics: () => Object.keys(LESSONS)
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
