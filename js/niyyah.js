
/* =========================================================
   IBADAT — NIYYAH LESSON PAGE
   File: js/niyyah.js
   Features:
   - Bengali, English and Hindi translations
   - Section headings, paragraphs and lists
   - Light/dark theme compatibility
   - Direct section links and natural scrolling
   ========================================================= */

(() => {
  "use strict";

  const LANGUAGES = ["bn", "en", "hi"];

  const translations = {
    bn: {
      title: "নিয়ত",
      description:
        "নামাজের নিয়ত কী, কেন প্রয়োজন এবং কীভাবে নিয়ত করতে হয় জানুন",
      footer: "মনোযোগ দিয়ে ইবাদত করো।",

      sections: {
        "niyyah-intro": {
          heading: "নিয়ত কী?",
          paragraphs: [
            "নিয়ত হলো অন্তরের সংকল্প। কোনো ইবাদত আল্লাহর সন্তুষ্টির উদ্দেশ্যে করার যে দৃঢ় ইচ্ছা অন্তরে করা হয়, সেটিই নিয়ত।",
            "নামাজের ক্ষেত্রে কোন নামাজ আদায় করা হচ্ছে, তা মনে স্থির রেখে আল্লাহর জন্য নামাজ শুরু করাই নিয়তের মূল বিষয়। নিয়ত শুধু মুখে কিছু শব্দ বলার নাম নয়।"
          ]
        },

        "niyyah-importance": {
          heading: "নিয়তের গুরুত্ব",
          paragraphs: [
            "ইসলামে কাজের উদ্দেশ্য অত্যন্ত গুরুত্বপূর্ণ। নিয়ত ইবাদতের উদ্দেশ্যকে স্পষ্ট করে এবং মানুষকে আল্লাহর সন্তুষ্টির জন্য কাজ করতে সাহায্য করে।",
            "রাসুলুল্লাহ ﷺ বলেছেন, কাজের ফলাফল নিয়তের ওপর নির্ভরশীল। তাই নামাজ আদায়ের সময় লোক দেখানো বা অন্য কোনো উদ্দেশ্যের পরিবর্তে আল্লাহর সন্তুষ্টিকে লক্ষ্য করা উচিত।"
          ]
        },

        "niyyah-method": {
          heading: "নামাজের নিয়ত কীভাবে করবেন?",
          paragraphs: [
            "নামাজ শুরু করার আগে মনে স্থির করুন আপনি কোন নামাজ পড়ছেন—যেমন ফজর, জোহর, আসর, মাগরিব বা এশার নামাজ। এরপর আল্লাহর সন্তুষ্টির উদ্দেশ্যে নামাজ শুরু করুন।",
            "নিয়তের জন্য নির্দিষ্ট আরবি বাক্য মুখস্থ করে বলা আবশ্যক—এমন নয়। অন্তরের সংকল্পই নিয়তের মূল বিষয়। মুখে বলাকে আবশ্যক মনে করবেন না।",
            "নিয়ত নিয়ে অতিরিক্ত দুশ্চিন্তা বা বারবার সংকল্প পুনরাবৃত্তি করার প্রয়োজন নেই। আপনি কোন নামাজ পড়তে দাঁড়িয়েছেন, তা যদি জানেন, সেটিই আপনার সংকল্পের পরিচায়ক হতে পারে।"
          ]
        },

        "niyyah-prayers": {
          heading: "বিভিন্ন নামাজের নিয়ত",
          paragraphs: [
            "নামাজের ধরন অনুযায়ী আপনার সংকল্প আলাদা হবে। উদাহরণস্বরূপ:",
            "বিভিন্ন নামাজের নিয়তের বিস্তারিত বিধান মাজহাব ও নামাজের ধরন অনুযায়ী ভিন্ন হতে পারে।"
          ],
          list: [
            "ফজরের নামাজ পড়তে দাঁড়ালে মনে ফজরের নামাজের সংকল্প রাখুন।",
            "জোহর, আসর, মাগরিব বা এশার নামাজ পড়লে সংশ্লিষ্ট নামাজের সংকল্প রাখুন।",
            "সুন্নত, নফল, বিতর বা কাজা নামাজের ক্ষেত্রে কোন নামাজ আদায় করছেন, তা মনে নির্দিষ্ট রাখুন।",
            "জামাতে নামাজ পড়লে ইমামের অনুসরণ করার বিষয়টিও নিজের প্রযোজ্য বিধান অনুযায়ী বিবেচনা করুন।"
          ]
        },

        "niyyah-spoken": {
          heading: "মুখে নিয়ত বলা কি জরুরি?",
          paragraphs: [
            "নিয়তের মূল স্থান হলো অন্তর। নামাজের জন্য মনে সংকল্প করাই মূল বিষয়; নির্দিষ্ট বাক্য মুখে উচ্চারণ করাকে সর্বজনীনভাবে আবশ্যক বলা যায় না।",
            "কিছু ফিকহি মত ও শিক্ষাপদ্ধতিতে মুখে নিয়ত উচ্চারণ করার কথা বলা হয়। এ বিষয়ে নিজের অনুসৃত মাজহাবের নির্ভরযোগ্য আলেমের নির্দেশনা অনুসরণ করুন।"
          ]
        },

        "niyyah-mistakes": {
          heading: "নিয়ত করার সময় সাধারণ ভুল",
          paragraphs: [
            "নিয়ত সহজ রাখুন। কোন নামাজ পড়ছেন তা মনে স্থির করুন এবং মনোযোগ দিয়ে নামাজ শুরু করুন।"
          ],
          list: [
            "নিয়ত শুধু মুখে বললেই হয়, অন্তরের সংকল্প দরকার নেই—এমন ধারণা করা।",
            "নির্দিষ্ট আরবি বাক্য না জানলে নামাজ হবে না—এমন অযথা ভয় করা।",
            "নিয়ত ঠিক হয়েছে কি না ভেবে বারবার সংকল্প পুনরাবৃত্তি করা।",
            "নামাজের প্রকৃত উদ্দেশ্য, অর্থাৎ আল্লাহর সন্তুষ্টির কথা ভুলে গিয়ে শুধু শব্দের ওপর নির্ভর করা।"
          ]
        },

        "niyyah-checklist": {
          heading: "নামাজের আগে নিয়ত যাচাই",
          paragraphs: [
            "মনে রাখুন, নিয়ত অন্তরের সংকল্প। নিয়ত সম্পর্কে বিশেষ কোনো মাসআলা থাকলে নির্ভরযোগ্য আলেমের কাছ থেকে জেনে নিন।"
          ],
          list: [
            "আমি আল্লাহর সন্তুষ্টির জন্য নামাজ পড়ছি।",
            "কোন নামাজ পড়ছি, তা আমার মনে স্পষ্ট।",
            "নামাজ শুরু করার জন্য আমি প্রস্তুত।",
            "অপ্রয়োজনীয় সন্দেহে না গিয়ে মনোযোগ দিয়ে নামাজ শুরু করছি।"
          ]
        }
      }
    },

    en: {
      title: "Intention (Niyyah)",
      description:
        "Learn what niyyah means, why it matters, and how to make the intention for prayer.",
      footer: "Worship with attentiveness.",

      sections: {
        "niyyah-intro": {
          heading: "What Is Niyyah?",
          paragraphs: [
            "Niyyah is the intention of the heart. It is the sincere resolve to perform an act of worship for the sake of Allah.",
            "For prayer, the essential idea is to know in your heart which prayer you are about to perform and to begin it for Allah's sake. Niyyah is not simply the act of saying certain words aloud."
          ]
        },

        "niyyah-importance": {
          heading: "The Importance of Niyyah",
          paragraphs: [
            "In Islam, the purpose behind an action is very important. Niyyah clarifies the purpose of worship and helps a person act for the pleasure of Allah.",
            "The Prophet Muhammad ﷺ taught that actions are judged by intentions. When praying, aim to please Allah rather than seeking attention or pursuing another purpose."
          ]
        },

        "niyyah-method": {
          heading: "How to Make the Intention for Prayer",
          paragraphs: [
            "Before starting prayer, be clear in your mind about which prayer you are performing, such as Fajr, Dhuhr, Asr, Maghrib, or Isha. Then begin the prayer for the sake of Allah.",
            "Memorizing and reciting a specific Arabic formula is not universally required for niyyah. The intention in the heart is the essential point; do not assume that saying words aloud is obligatory.",
            "There is no need to become excessively anxious or repeat the intention again and again. Knowing which prayer you have stood up to perform can express your intention."
          ]
        },

        "niyyah-prayers": {
          heading: "Intentions for Different Prayers",
          paragraphs: [
            "Your intention should correspond to the type of prayer you are about to perform. For example:",
            "Detailed rulings on intention can vary according to the school of jurisprudence and the type of prayer."
          ],
          list: [
            "When preparing for Fajr, intend in your heart to perform the Fajr prayer.",
            "For Dhuhr, Asr, Maghrib, or Isha, intend the corresponding prayer.",
            "For Sunnah, voluntary, Witr, or make-up prayers, be clear about which prayer you are performing.",
            "When praying in congregation, follow the applicable guidance concerning following the imam."
          ]
        },

        "niyyah-spoken": {
          heading: "Must the Intention Be Spoken Aloud?",
          paragraphs: [
            "The essential place of niyyah is the heart. Forming the intention for prayer is the central requirement; saying a particular formula aloud is not universally considered obligatory.",
            "Some jurisprudential opinions or teaching traditions discuss verbalizing the intention. Follow the guidance of a reliable scholar from the school of jurisprudence you follow."
          ]
        },

        "niyyah-mistakes": {
          heading: "Common Mistakes About Niyyah",
          paragraphs: [
            "Keep the intention simple. Be clear about which prayer you are performing, then begin your prayer attentively."
          ],
          list: [
            "Assuming that saying words aloud is enough and that the intention of the heart does not matter.",
            "Fearing unnecessarily that prayer will not count without memorizing a particular Arabic formula.",
            "Repeating the intention over and over because of doubts about whether it was correct.",
            "Focusing only on words and forgetting the real purpose of prayer: seeking the pleasure of Allah."
          ]
        },

        "niyyah-checklist": {
          heading: "Niyyah Checklist Before Prayer",
          paragraphs: [
            "Remember that niyyah is the intention of the heart. For a specific question about its rulings, consult a reliable qualified scholar."
          ],
          list: [
            "I am praying for the sake of Allah.",
            "I am clear about which prayer I am performing.",
            "I am ready to begin my prayer.",
            "I will begin attentively without getting caught up in unnecessary doubts."
          ]
        }
      }
    },

    hi: {
      title: "निय्यत",
      description:
        "जानें कि निय्यत क्या है, यह क्यों महत्वपूर्ण है और नमाज़ की निय्यत कैसे की जाती है।",
      footer: "ध्यान से इबादत करें।",

      sections: {
        "niyyah-intro": {
          heading: "निय्यत क्या है?",
          paragraphs: [
            "निय्यत दिल के इरादे को कहते हैं। किसी इबादत को अल्लाह की प्रसन्नता के लिए करने का सच्चा संकल्प ही निय्यत है।",
            "नमाज़ में मुख्य बात यह है कि दिल में स्पष्ट हो कि कौन-सी नमाज़ पढ़ने जा रहे हैं और उसे अल्लाह के लिए शुरू करें। निय्यत केवल कुछ शब्द ज़ोर से बोलने का नाम नहीं है।"
          ]
        },

        "niyyah-importance": {
          heading: "निय्यत का महत्व",
          paragraphs: [
            "इस्लाम में किसी काम का उद्देश्य बहुत महत्वपूर्ण है। निय्यत इबादत के उद्देश्य को स्पष्ट करती है और इंसान को अल्लाह की प्रसन्नता के लिए काम करने में मदद करती है।",
            "नबी मुहम्मद ﷺ ने बताया कि कर्मों का मूल्यांकन निय्यत के अनुसार होता है। इसलिए नमाज़ में दिखावे या किसी दूसरे उद्देश्य के बजाय अल्लाह की प्रसन्नता को लक्ष्य बनाएं।"
          ]
        },

        "niyyah-method": {
          heading: "नमाज़ की निय्यत कैसे करें?",
          paragraphs: [
            "नमाज़ शुरू करने से पहले दिल में स्पष्ट कर लें कि आप कौन-सी नमाज़ पढ़ रहे हैं, जैसे फ़ज्र, ज़ुहर, अस्र, मग़रिब या इशा। फिर अल्लाह की प्रसन्नता के लिए नमाज़ शुरू करें।",
            "निय्यत के लिए किसी खास अरबी वाक्य को याद करके बोलना हर मत में अनिवार्य नहीं है। दिल का इरादा मुख्य बात है; ज़ोर से बोलने को अनिवार्य न समझें।",
            "निय्यत को लेकर अत्यधिक चिंता करने या बार-बार इरादा दोहराने की आवश्यकता नहीं है। आप कौन-सी नमाज़ पढ़ने के लिए खड़े हुए हैं, यह जानना आपके इरादे को दर्शा सकता है।"
          ]
        },

        "niyyah-prayers": {
          heading: "अलग-अलग नमाज़ों की निय्यत",
          paragraphs: [
            "आपका इरादा उस नमाज़ के अनुसार होना चाहिए जिसे आप पढ़ने जा रहे हैं। उदाहरण के लिए:",
            "निय्यत के विस्तृत नियम फ़िक़्ही मज़हब और नमाज़ के प्रकार के अनुसार अलग हो सकते हैं।"
          ],
          list: [
            "फ़ज्र पढ़ने के लिए खड़े हों तो दिल में फ़ज्र की नमाज़ का इरादा रखें।",
            "ज़ुहर, अस्र, मग़रिब या इशा पढ़ते समय उसी नमाज़ का इरादा रखें।",
            "सुन्नत, नफ़्ल, वितर या क़ज़ा नमाज़ में स्पष्ट रखें कि कौन-सी नमाज़ पढ़ रहे हैं।",
            "जमाअत में नमाज़ पढ़ते समय इमाम का अनुसरण करने से जुड़े लागू नियमों का ध्यान रखें।"
          ]
        },

        "niyyah-spoken": {
          heading: "क्या निय्यत ज़ोर से बोलना ज़रूरी है?",
          paragraphs: [
            "निय्यत का मूल स्थान दिल है। नमाज़ का इरादा करना मुख्य बात है; किसी विशेष वाक्य को ज़ोर से बोलना हर मत में अनिवार्य नहीं माना जाता।",
            "कुछ फ़िक़्ही मतों या शिक्षण परंपराओं में निय्यत को ज़ोर से कहने का उल्लेख मिलता है। अपने फ़िक़्ही मज़हब के विश्वसनीय विद्वान की सलाह पर अमल करें।"
          ]
        },

        "niyyah-mistakes": {
          heading: "निय्यत करते समय आम गलतियाँ",
          paragraphs: [
            "निय्यत को सरल रखें। दिल में स्पष्ट करें कि कौन-सी नमाज़ पढ़ रहे हैं और फिर ध्यानपूर्वक नमाज़ शुरू करें।"
          ],
          list: [
            "यह समझना कि केवल ज़ोर से शब्द बोलना पर्याप्त है और दिल का इरादा आवश्यक नहीं।",
            "किसी विशेष अरबी वाक्य को याद न होने पर नमाज़ न होने का बेवजह डर रखना।",
            "निय्यत सही हुई या नहीं, इस संदेह में बार-बार इरादा दोहराना।",
            "नमाज़ के असली उद्देश्य, यानी अल्लाह की प्रसन्नता, को भूलकर केवल शब्दों पर निर्भर रहना।"
          ]
        },

        "niyyah-checklist": {
          heading: "नमाज़ से पहले निय्यत की जाँच",
          paragraphs: [
            "याद रखें कि निय्यत दिल का इरादा है। किसी विशेष मसले के बारे में जानने के लिए विश्वसनीय योग्य विद्वान से सलाह लें।"
          ],
          list: [
            "मैं अल्लाह की प्रसन्नता के लिए नमाज़ पढ़ रहा हूँ।",
            "मुझे स्पष्ट है कि मैं कौन-सी नमाज़ पढ़ रहा हूँ।",
            "मैं नमाज़ शुरू करने के लिए तैयार हूँ।",
            "अनावश्यक संदेह में पड़े बिना ध्यानपूर्वक नमाज़ शुरू करूँगा।"
          ]
        }
      }
    }
  };

  /* ---------- Safe storage helpers ---------- */

  function readStorage(keys) {
    try {
      for (const key of keys) {
        const value = localStorage.getItem(key);
        if (value) return value;
      }
    } catch (error) {
      // The page can still work when storage is unavailable.
    }

    return null;
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Language switching still works without persistent storage.
    }
  }

  /* ---------- Language handling ---------- */

  function normalizeLanguage(value) {
    if (!value) return "bn";

    const language = String(value).toLowerCase().slice(0, 2);

    return LANGUAGES.includes(language) ? language : "bn";
  }

  function getInitialLanguage() {
    return normalizeLanguage(
      readStorage(["language", "siteLanguage"]) ||
      document.documentElement.lang ||
      "bn"
    );
  }

  function setElementText(element, text) {
    if (element && typeof text === "string") {
      element.textContent = text;
    }
  }

  /* ---------- Section translation ---------- */

  function updateSection(sectionKey, sectionData) {
    const heading = document.getElementById(
      `heading-${sectionKey}`
    );

    const content = document.getElementById(
      `content-${sectionKey}`
    );

    if (!content) return;

    setElementText(heading, sectionData.heading);

    /*
     * Update direct paragraphs only.
     * This avoids accidentally replacing paragraphs nested
     * inside other elements.
     */
    const paragraphs = Array.from(content.children).filter(
      (element) => element.tagName === "P"
    );

    const paragraphTranslations = sectionData.paragraphs || [];

    paragraphs.forEach((paragraph, index) => {
      if (paragraphTranslations[index] !== undefined) {
        paragraph.textContent = paragraphTranslations[index];
      }
    });

    /*
     * Update list items without changing the surrounding
     * list structure or any HTML elements.
     */
    const lists = Array.from(content.querySelectorAll("ul, ol"));

    const listItems = lists.flatMap((list) =>
      Array.from(list.children).filter(
        (element) => element.tagName === "LI"
      )
    );

    const listTranslations = sectionData.list || [];

    listItems.forEach((item, index) => {
      if (listTranslations[index] !== undefined) {
        item.textContent = listTranslations[index];
      }
    });

    /*
     * The method and introductory sections contain paragraphs
     * inside .lesson-text, so handle those as well.
     */
    const lessonText = content.querySelector(".lesson-text");

    if (lessonText) {
      const nestedParagraphs = Array.from(
        lessonText.querySelectorAll("p")
      );

      nestedParagraphs.forEach((paragraph, index) => {
        if (paragraphTranslations[index] !== undefined) {
          paragraph.textContent = paragraphTranslations[index];
        }
      });
    }
  }

  /* ---------- Apply a language ---------- */

  function applyLanguage(language) {
    const lang = normalizeLanguage(language);
    const data = translations[lang];

    document.documentElement.lang = lang;

    setElementText(
      document.getElementById("pageTitle"),
      data.title
    );

    setElementText(
      document.getElementById("heroDescription"),
      data.description
    );

    setElementText(
      document.getElementById("footerText"),
      data.footer
    );

    Object.entries(data.sections).forEach(
      ([sectionKey, sectionData]) => {
        updateSection(sectionKey, sectionData);
      }
    );

    /*
     * Support either data-lang or data-language buttons.
     */
    document.querySelectorAll("[data-lang], [data-language]").forEach(
      (button) => {
        const buttonLanguage = normalizeLanguage(
          button.dataset.lang || button.dataset.language
        );

        const active = buttonLanguage === lang;

        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      }
    );

    writeStorage("language", lang);

    return lang;
  }

  /* ---------- Language controls ---------- */

  function initializeLanguageControls() {
    document.querySelectorAll("[data-lang], [data-language]").forEach(
      (button) => {
        button.addEventListener("click", () => {
          const requestedLanguage =
            button.dataset.lang ||
            button.dataset.language;

          if (requestedLanguage) {
            applyLanguage(requestedLanguage);
          }
        });
      }
    );
  }

  /* ---------- Theme compatibility ---------- */

  function syncThemeControls() {
    const theme = document.documentElement.dataset.theme;

    document.querySelectorAll("[data-theme-toggle]").forEach(
      (button) => {
        button.setAttribute(
          "aria-pressed",
          String(theme === "dark")
        );
      }
    );
  }

  function initializeThemeCompatibility() {
    /*
     * Do not override a theme already selected by theme.js.
     * Restore saved theme only if the page has no explicit theme.
     */
    const root = document.documentElement;
    const currentTheme = root.dataset.theme;

    if (currentTheme !== "dark" && currentTheme !== "light") {
      const savedTheme = readStorage(["theme", "siteTheme"]);

      if (savedTheme === "dark" || savedTheme === "light") {
        root.dataset.theme = savedTheme;
      } else {
        root.dataset.theme = "light";
      }
    }

    syncThemeControls();

    const observer = new MutationObserver(() => {
      syncThemeControls();
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
  }

  /* ---------- Direct links to lesson sections ---------- */

  function scrollToHashTarget() {
    if (!window.location.hash) return;

    let targetId;

    try {
      targetId = decodeURIComponent(
        window.location.hash.slice(1)
      );
    } catch (error) {
      targetId = window.location.hash.slice(1);
    }

    const target = document.getElementById(targetId);

    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: "auto",
        block: "start"
      });
    });
  }

  function initializeDeepLinks() {
    window.addEventListener("hashchange", scrollToHashTarget);

    /*
     * Wait for the page to finish loading so images and fonts
     * have less chance of shifting the target position.
     */
    if (document.readyState === "complete") {
      scrollToHashTarget();
    } else {
      window.addEventListener(
        "load",
        scrollToHashTarget,
        { once: true }
      );
    }
  }

  /* ---------- Initialization ---------- */

  function initialize() {
    initializeLanguageControls();
    initializeThemeCompatibility();

    applyLanguage(getInitialLanguage());

    initializeDeepLinks();
  }

  initialize();

  /*
   * Public API for other scripts, if needed.
   *
   * Example:
   * window.niyyahPage.setLanguage("en");
   */
  window.niyyahPage = Object.freeze({
    setLanguage: applyLanguage,
    getLanguage: getInitialLanguage,
    translations
  });
})();
