// ========================================
// IBADAT — ALLAH'S NAMES
// File: js/allah-names.js
// ========================================


// ================= SETTINGS =================

function getSafeLanguage() {
    try {
        const settings = JSON.parse(
            localStorage.getItem("appSettings") || "{}"
        );

        if (["bn", "en", "hi"].includes(settings.lang)) {
            return settings.lang;
        }

        if (["bn", "en", "hi"].includes(settings.language)) {
            return settings.language;
        }

        return "bn";
    } catch (error) {
        return "bn";
    }
}

let lang = getSafeLanguage();


// ================= TITLE =================

const TITLE = {
    bn: "আল্লাহর নামসমূহ",
    en: "Names of Allah",
    hi: "अल्लाह के नाम"
};

const pageTitle = document.getElementById("pageTitle");
const introTitle = document.getElementById("introTitle");


// ================= BISMILLAH =================

const BISMILLAH = {
    bn: {
        ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        text: "বিসমিল্লাহির রাহমানির রাহিম",
        meaning: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে"
    },

    en: {
        ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        text: "Bismillahir Rahmanir Raheem",
        meaning: "In the name of Allah, the Most Gracious, the Most Merciful"
    },

    hi: {
        ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        text: "बिस्मिल्लाहिर रहमानिर रहीम",
        meaning: "परम कृपाशील, अत्यंत दयालु अल्लाह के नाम से"
    }
};


// ================= FOOTER MESSAGE =================

const FOOTER_MESSAGES = {
    bn: "আল্লাহকে জানুন, স্মরণে রাখুন।",
    en: "Know Allah, and keep Him in remembrance.",
    hi: "अल्लाह को जानें और उनका स्मरण करते रहें।"
};


// ================= DATA =================

// এই অংশে তোমার পাঠানো মূল ৯৯টি names array
// একদম অপরিবর্তিতভাবে বসাবে।
// কোনো নাম, আরবি লেখা, উচ্চারণ বা অর্থ বাদ দেবে না।

const names = [
    // এখানে তোমার মূল names array বসাও
];


// ================= ELEMENTS =================

const container = document.getElementById("namesContainer");
const footerText = document.getElementById("namesFooterText");


// ================= LANGUAGE UPDATE =================

function updatePageLanguage() {
    lang = getSafeLanguage();

    const title = TITLE[lang] || TITLE.bn;

    if (pageTitle) {
        pageTitle.textContent = title;
    }

    if (introTitle) {
        introTitle.textContent = title;
    }

    document.title = `${title} | IBADAT`;
    document.documentElement.lang = lang;

    if (footerText) {
        footerText.textContent =
            FOOTER_MESSAGES[lang] || FOOTER_MESSAGES.bn;
    }
}


// ================= LOCALIZED NUMBERS =================

function toLocalizedNumber(number) {
    if (lang === "bn") {
        return Number(number).toLocaleString("bn-BD");
    }

    if (lang === "hi") {
        return Number(number).toLocaleString("hi-IN-u-nu-deva");
    }

    return Number(number).toLocaleString("en-US");
}


// ================= RENDER NAMES =================

function renderNames(resetScroll = true) {
    updatePageLanguage();

    if (!container) {
        return;
    }

    let html = "";

    // Bismillah — first card, without a serial number

    const bismillah = BISMILLAH[lang] || BISMILLAH.bn;

    html += `
        <article class="name-card bismillah-card">

            <div class="name-arabic arabic" lang="ar" dir="rtl">
                ${bismillah.ar}
            </div>

            <div class="name-pronunciation pron" lang="${lang}">
                ${bismillah.text}
            </div>

            <div class="name-meaning meaning" lang="${lang}">
                ${bismillah.meaning}
            </div>

        </article>
    `;

    // Render names in their original array order

    names.forEach((item, index) => {
        const displayName = item[lang] || item.bn || "";
        const meaning =
            item[`${lang}_mean`] || item.bn_mean || "";

        const serial = toLocalizedNumber(index + 1);

        html += `
            <article class="name-card">

                <div class="name-number">
                    ${serial}
                </div>

                <div class="name-arabic arabic"
                     lang="ar"
                     dir="rtl">
                    ${item.ar}
                </div>

                <div class="name-pronunciation pron"
                     lang="${lang}">
                    ${displayName}
                </div>

                <div class="name-meaning meaning"
                     lang="${lang}">
                    ${meaning}
                </div>

            </article>
        `;
    });

    container.innerHTML = html;

    if (resetScroll) {
        container.scrollTop = 0;
    }
}


// ================= INITIAL RENDER =================

renderNames();


// ================= SETTINGS CHANGE =================

// Settings changed in another browser tab

window.addEventListener("storage", function (event) {
    if (event.key === "appSettings") {
        renderNames();
    }
});


// Settings changed inside the current app

window.addEventListener("languageChanged", function () {
    renderNames();
});


// Support the app's global settings/theme script if it
// dispatches a settingsChanged event after saving settings.

window.addEventListener("settingsChanged", function () {
    renderNames();
});


// Allow another script to refresh this page

window.refreshAllahNamesLanguage = renderNames;
