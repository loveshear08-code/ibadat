/* =====================================================
   IBADAT — NAMAZ CONDITIONS
   Language: Bengali / English / Hindi
   Settings source: existing appSettings
   Theme source: existing ../js/theme.js
   ===================================================== */

(() => {
  "use strict";

  const SETTINGS_KEY = "appSettings";

  const translations = {
    bn: {
      title: "শর্ত ও প্রস্তুতি",
      footer: "নামাজ আদায়ের আগে প্রয়োজনীয় শর্তগুলো নিশ্চিত করুন।",
      items: {
        wudu: [
          "ওযু",
          "নামাজের আগে প্রয়োজন অনুযায়ী ওযু করে পবিত্রতা অর্জন করুন।"
        ],
        ghusl: [
          "গোসল",
          "গোসল ফরজ হলে নামাজের আগে ফরজ গোসল করে পবিত্র হন।"
        ],
        tayammum: [
          "তায়াম্মুম",
          "শরিয়তসম্মত কারণে পানি ব্যবহার সম্ভব না হলে তায়াম্মুম করুন।"
        ],
        body: [
          "শরীরের পবিত্রতা",
          "শরীর ও শরীরে লেগে থাকা নাপাকি দূর করে পবিত্র থাকুন।"
        ],
        clothing: [
          "পোশাকের পবিত্রতা",
          "নামাজের পোশাককে শরিয়তসম্মত নাপাকি থেকে পবিত্র রাখুন।"
        ],
        place: [
          "নামাজের স্থানের পবিত্রতা",
          "নামাজ আদায়ের স্থান নাপাকি থেকে মুক্ত ও পবিত্র রাখুন।"
        ],
        qibla: [
          "কিবলামুখী হওয়া",
          "সক্ষম অবস্থায় কাবা শরিফের দিকে মুখ করে নামাজ আদায় করুন।"
        ],
        satr: [
          "সতর ঢাকা",
          "নামাজের জন্য শরিয়ত নির্ধারিত সতর যথাযথভাবে ঢেকে রাখুন।"
        ],
        niyyah: [
          "নিয়ত",
          "কোন নামাজ আদায় করছেন, তা অন্তরে নির্দিষ্ট করুন।"
        ],
        time: [
          "নামাজের ওয়াক্ত",
          "প্রত্যেক ফরজ নামাজ তার নির্ধারিত ওয়াক্তের মধ্যে আদায় করুন।"
        ]
      }
    },

    en: {
      title: "Conditions & Preparation",
      footer: "Make sure the necessary conditions are met before offering Salah.",
      items: {
        wudu: [
          "Wudu",
          "Perform wudu before prayer when it is required."
        ],
        ghusl: [
          "Ghusl",
          "If ghusl is obligatory, perform it before offering Salah."
        ],
        tayammum: [
          "Tayammum",
          "Perform tayammum when water cannot be used for a valid reason."
        ],
        body: [
          "Body Purity",
          "Remove relevant impurities from your body before prayer."
        ],
        clothing: [
          "Clothing Purity",
          "Keep the clothes worn for prayer free from relevant impurities."
        ],
        place: [
          "Place of Prayer",
          "Make sure the place where you pray is free from impurities."
        ],
        qibla: [
          "Facing the Qibla",
          "When able, face the direction of the Kaaba for prayer."
        ],
        satr: [
          "Covering the Awrah",
          "Cover the parts of the body that must be covered in prayer."
        ],
        niyyah: [
          "Intention",
          "Form the intention in your heart for the prayer you are performing."
        ],
        time: [
          "Prayer Time",
          "Offer each obligatory prayer within its prescribed time."
        ]
      }
    },

    hi: {
      title: "शर्तें और तैयारी",
      footer: "नमाज़ अदा करने से पहले ज़रूरी शर्तों को पूरा करना सुनिश्चित करें।",
      items: {
        wudu: [
          "वुज़ू",
          "नमाज़ से पहले आवश्यकता के अनुसार वुज़ू करके पाकी हासिल करें।"
        ],
        ghusl: [
          "ग़ुस्ल",
          "यदि ग़ुस्ल फ़र्ज़ हो, तो नमाज़ से पहले फ़र्ज़ ग़ुस्ल करें।"
        ],
        tayammum: [
          "तयम्मुम",
          "वैध शरई कारण से पानी इस्तेमाल न कर सकें, तो तयम्मुम करें।"
        ],
        body: [
          "शरीर की पाकी",
          "नमाज़ से पहले शरीर पर लगी नापाकी दूर करें।"
        ],
        clothing: [
          "कपड़ों की पाकी",
          "नमाज़ के कपड़ों को नापाकी से पाक रखें।"
        ],
        place: [
          "नमाज़ की जगह की पाकी",
          "नमाज़ की जगह को नापाकी से पाक रखें।"
        ],
        qibla: [
          "क़िबला की ओर रुख़",
          "सक्षम होने पर काबा शरीफ़ की दिशा में मुँह करके नमाज़ पढ़ें।"
        ],
        satr: [
          "सतर ढकना",
          "नमाज़ के लिए शरीर के ज़रूरी हिस्सों को ढककर रखें।"
        ],
        niyyah: [
          "नीयत",
          "जो नमाज़ अदा कर रहे हैं, उसकी नीयत दिल में करें।"
        ],
        time: [
          "नमाज़ का वक़्त",
          "हर फ़र्ज़ नमाज़ उसके निर्धारित समय के भीतर अदा करें।"
        ]
      }
    }
  };

  /* ================================================
     READ APP SETTINGS
     ================================================ */

  function readSettings() {
    try {
      const value = JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
      );

      return value &&
        typeof value === "object" &&
        !Array.isArray(value)
          ? value
          : {};

    } catch (error) {
      console.warn(
        "IBADAT: appSettings could not be read.",
        error
      );

      return {};
    }
  }

  /* ================================================
     GET CURRENT LANGUAGE
     ================================================ */

  function getLanguage() {
    const settings = readSettings();

    const language =
      settings.lang ||
      settings.language ||
      document.documentElement.lang ||
      "bn";

    return Object.prototype.hasOwnProperty.call(
      translations,
      language
    )
      ? language
      : "bn";
  }

  /* ================================================
     APPLY LANGUAGE
     ================================================ */

  function applyLanguage() {
    const language = getLanguage();
    const text = translations[language];

    document.documentElement.lang = language;

    document.title = `${text.title} | IBADAT`;

    const title = document.getElementById("pageTitle");
    const footer = document.getElementById("footerText");

    if (title) {
      title.textContent = text.title;
    }

    if (footer) {
      footer.textContent = text.footer;
    }

    Object.entries(text.items).forEach(([key, values]) => {
      const heading = document.querySelector(
        `[data-title="${key}"]`
      );

      const description = document.querySelector(
        `[data-description="${key}"]`
      );

      if (heading) {
        heading.textContent = values[0];
      }

      if (description) {
        description.textContent = values[1];
      }
    });
  }

  /* ================================================
     UPDATE BROWSER THEME COLOR
     ================================================ */

  function applyMetaThemeColor() {
    const settings = readSettings();

    const theme =
      settings.themeColor ||
      settings.theme ||
      "classic";

    const colors = {
      classic: "#1B7F4B",
      royal: "#285A8E",
      rose: "#B96F79",
      pista: "#4CAF50"
    };

    const meta = document.getElementById("themeColorMeta");

    if (meta) {
      meta.content =
        settings.dark === true
          ? "#14251A"
          : (colors[theme] || colors.classic);
    }
  }

  /* ================================================
     REFRESH PAGE
     ================================================ */

  function refreshPage() {
    applyLanguage();
    applyMetaThemeColor();

    /*
     * Global theme.js owns:
     * body[data-color-theme]
     * body.dark-mode
     */
  }

  /* ================================================
     EXPOSE REFRESH FUNCTION
     ================================================ */

  window.refreshNamazConditions = refreshPage;

  /* ================================================
     SETTINGS CHANGE LISTENER
     ================================================ */

  window.addEventListener("storage", event => {
    if (
      !event ||
      event.key === null ||
      event.key === SETTINGS_KEY
    ) {
      refreshPage();
    }
  });

  /* ================================================
     PAGE SHOW
     ================================================ */

  window.addEventListener("pageshow", refreshPage);

  /* ================================================
     INITIALIZE
     ================================================ */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      refreshPage,
      { once: true }
    );
  } else {
    refreshPage();
  }

})();
