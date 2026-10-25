
"use strict";

/* =====================================================
   IBADAT SETTINGS
   Languages: Bengali, English, Hindi
   Light / Dark Mode
   Four selectable color themes
===================================================== */

const DEFAULT_SETTINGS = {
    lang: "bn",
    dark: false,
    themeColor: "classic",
    azan: {
        fajr: "makkah",
        dhuhr: "makkah",
        asr: "makkah",
        maghrib: "makkah",
        isha: "makkah"
    }
};

const PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

const VALID_LANGUAGES = ["bn", "en", "hi"];

const VALID_THEMES = ["classic", "royal", "rose", "pista"];

const AZAN_FILES = {
    alaska: "../assets/azan/alaska.mp3",
    bangladesh: "../assets/azan/bangladesh.mp3",
    kuwait: "../assets/azan/kuwait.mp3",
    madina: "../assets/azan/madina.mp3",
    makkah: "../assets/azan/makkah.mp3"
};

/* ================= TRANSLATIONS ================= */

const TEXT = {
    bn: {
        title: "সেটিংস",
        azan: "আজান সেটিং",
        language: "ভাষা",
        theme: "থিম",
        dark: "ডার্ক মোড",
        themeColor: "থিম কালার",
        themeColorDesc: "আপনার পছন্দের রঙ নির্বাচন করুন",
        themes: {
            classic: "ক্লাসিক সবুজ",
            royal: "রয়্যাল নীল",
            rose: "রোজ ও শ্যাম্পেন",
            pista: "ফ্রেশ পিস্তা"
        },
        save: "সেভ",
        saved: "সেটিংস সেভ হয়েছে",
        saveError: "সেটিংস সেভ করা যায়নি। আবার চেষ্টা করুন।",
        footer: "আল্লাহকে স্মরণ করুন",
        azanFor: "কোন ওয়াক্তে কোন আজান বাজবে",
        audioError: "আজানের অডিও চালানো যায়নি। ফাইলের পাথ পরীক্ষা করে আবার চেষ্টা করুন।",
        prayers: {
            fajr: "ফজর",
            dhuhr: "জোহর",
            asr: "আসর",
            maghrib: "মাগরিব",
            isha: "এশা"
        },
        azans: {
            makkah: "মক্কা",
            madina: "মদিনা",
            kuwait: "কুয়েত",
            bangladesh: "বাংলাদেশ",
            alaska: "আলাস্কা"
        }
    },

    en: {
        title: "Settings",
        azan: "Azan Settings",
        language: "Language",
        theme: "Theme",
        dark: "Dark Mode",
        themeColor: "Theme Color",
        themeColorDesc: "Choose your preferred colors",
        themes: {
            classic: "Classic Green",
            royal: "Royal Blue",
            rose: "Rose Champagne",
            pista: "Fresh Pista"
        },
        save: "Save",
        saved: "Settings saved",
        saveError: "Could not save settings. Please try again.",
        footer: "Remember Allah",
        azanFor: "Choose which Azan plays for each prayer",
        audioError: "The audio could not be played. Check the file path and try again.",
        prayers: {
            fajr: "Fajr",
            dhuhr: "Dhuhr",
            asr: "Asr",
            maghrib: "Maghrib",
            isha: "Isha"
        },
        azans: {
            makkah: "Makkah",
            madina: "Madina",
            kuwait: "Kuwait",
            bangladesh: "Bangladesh",
            alaska: "Alaska"
        }
    },

    hi: {
        title: "सेटिंग्स",
        azan: "अज़ान सेटिंग",
        language: "भाषा",
        theme: "थीम",
        dark: "डार्क मोड",
        themeColor: "थीम का रंग",
        themeColorDesc: "अपनी पसंद के रंग चुनें",
        themes: {
            classic: "क्लासिक हरा",
            royal: "रॉयल नीला",
            rose: "रोज़ शैम्पेन",
            pista: "फ्रेश पिस्ता"
        },
        save: "सेव",
        saved: "सेटिंग्स सेव हो गईं",
        saveError: "सेटिंग्स सेव नहीं हो सकीं। फिर कोशिश करें।",
        footer: "अल्लाह को याद करें",
        azanFor: "हर नमाज़ के लिए अज़ान चुनें",
        audioError: "ऑडियो नहीं चल सका। फ़ाइल का पथ जाँचकर फिर कोशिश करें।",
        prayers: {
            fajr: "फ़ज्र",
            dhuhr: "ज़ुहर",
            asr: "असर",
            maghrib: "मग़रिब",
            isha: "इशा"
        },
        azans: {
            makkah: "मक्का",
            madina: "मदीना",
            kuwait: "कुवैत",
            bangladesh: "बांग्लादेश",
            alaska: "अलास्का"
        }
    }
};

/* ================= SETTINGS STORAGE ================= */

function getDefaultSettings() {
    return {
        lang: DEFAULT_SETTINGS.lang,
        dark: DEFAULT_SETTINGS.dark,
        themeColor: DEFAULT_SETTINGS.themeColor,
        azan: { ...DEFAULT_SETTINGS.azan }
    };
}

function getSettings() {
    try {
        const raw = localStorage.getItem("appSettings");

        if (!raw) return getDefaultSettings();

        const saved = JSON.parse(raw);

        if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
            return getDefaultSettings();
        }

        const settings = getDefaultSettings();

        if (VALID_LANGUAGES.includes(saved.lang)) {
            settings.lang = saved.lang;
        } else if (VALID_LANGUAGES.includes(saved.language)) {
            settings.lang = saved.language;
        }

        settings.dark = saved.dark === true;

        if (VALID_THEMES.includes(saved.themeColor)) {
            settings.themeColor = saved.themeColor;
        } else if (VALID_THEMES.includes(saved.theme)) {
            settings.themeColor = saved.theme;
        }

        if (typeof saved.azan === "string") {
            if (Object.hasOwn(AZAN_FILES, saved.azan)) {
                PRAYERS.forEach(prayer => {
                    settings.azan[prayer] = saved.azan;
                });
            }
        } else if (saved.azan && typeof saved.azan === "object") {
            PRAYERS.forEach(prayer => {
                const value = saved.azan[prayer];

                if (
                    typeof value === "string" &&
                    Object.hasOwn(AZAN_FILES, value)
                ) {
                    settings.azan[prayer] = value;
                }
            });
        }

        return settings;
    } catch (error) {
        console.error("Could not read settings:", error);
        return getDefaultSettings();
    }
}

function saveSettingsToStorage(settings) {
    localStorage.setItem("appSettings", JSON.stringify(settings));
}

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

/* ================= LANGUAGE ================= */

function applyLanguage(lang) {
    const safeLang = VALID_LANGUAGES.includes(lang) ? lang : "bn";
    const t = TEXT[safeLang];

    document.documentElement.lang = safeLang;

    setText("settingsTitle", t.title);
    setText("azanTitle", t.azan);
    setText("azanDesc", t.azanFor);
    setText("langTitle", t.language);
    setText("themeTitle", t.theme);
    setText("darkLabel", t.dark);
    setText("themeColorTitle", t.themeColor);
    setText("themeColorDesc", t.themeColorDesc);
    setText("saveBtn", t.save);
    setText("settingsFooter", t.footer);

    document.querySelectorAll("[data-theme-name]").forEach(element => {
        const themeName = element.dataset.themeName;

        if (t.themes[themeName]) {
            element.textContent = t.themes[themeName];
        }
    });

    PRAYERS.forEach(prayer => {
        setText("prayer_" + prayer, t.prayers[prayer]);

        const select = document.getElementById("azan_" + prayer);

        if (!select) return;

        const savedValue = select.value || getSettings().azan[prayer];

        select.replaceChildren();

        Object.entries(t.azans).forEach(([value, label]) => {
            const option = document.createElement("option");

            option.value = value;
            option.textContent = label;

            select.appendChild(option);
        });

        select.value = Object.hasOwn(AZAN_FILES, savedValue)
            ? savedValue
            : DEFAULT_SETTINGS.azan[prayer];
    });
}

/* ================= COLOR THEME ================= */

function applyColorTheme(themeName) {
    const safeTheme = VALID_THEMES.includes(themeName)
        ? themeName
        : DEFAULT_SETTINGS.themeColor;

    document.body.dataset.colorTheme = safeTheme;

    document.querySelectorAll(".theme-option").forEach(button => {
        const isSelected = button.dataset.theme === safeTheme;

        button.setAttribute("aria-checked", String(isSelected));
        button.classList.toggle("selected", isSelected);
    });
}

function selectColorTheme(themeName) {
    if (!VALID_THEMES.includes(themeName)) return;

    applyColorTheme(themeName);

    /*
     * Preview and persist the palette immediately.
     * Merge with existing settings so language, dark mode,
     * and Azan preferences are preserved.
     */
    try {
        const settings = getSettings();

        settings.themeColor = themeName;

        saveSettingsToStorage(settings);
    } catch (error) {
        console.error("Could not save color theme:", error);
    }
}

/* ================= LIGHT / DARK THEME ================= */

function applyTheme() {
    const checkbox = document.getElementById("darkMode");

    if (!checkbox) return;

    document.body.classList.toggle("dark-mode", checkbox.checked);
}

/* ================= LOAD SETTINGS ================= */

function applySettings() {
    const settings = getSettings();

    const langSelect = document.getElementById("langSelect");
    const darkMode = document.getElementById("darkMode");

    if (langSelect) {
        langSelect.value = settings.lang;
    }

    if (darkMode) {
        darkMode.checked = settings.dark;
    }

    PRAYERS.forEach(prayer => {
        const select = document.getElementById("azan_" + prayer);

        if (select) {
            select.value = settings.azan[prayer];
        }
    });

    applyLanguage(settings.lang);
    applyColorTheme(settings.themeColor);
    applyTheme();
}

/* ================= AUDIO PREVIEW ================= */

let azanAudio = null;

function playAzan(type) {
    if (!Object.hasOwn(AZAN_FILES, type)) {
        console.error("Unknown Azan selection:", type);
        return;
    }

    if (!azanAudio) {
        azanAudio = new Audio();
        azanAudio.preload = "none";
    }

    azanAudio.pause();

    try {
        azanAudio.currentTime = 0;
    } catch (error) {
        // Audio may not have loaded yet.
    }

    azanAudio.src = AZAN_FILES[type];
    azanAudio.load();

    azanAudio.play().catch(error => {
        console.error("Azan playback failed:", error);

        const lang =
            document.getElementById("langSelect")?.value || "bn";

        const t = TEXT[VALID_LANGUAGES.includes(lang) ? lang : "bn"];

        alert(t.audioError);
    });
}

/* ================= SAVE SETTINGS ================= */

function saveSettings() {
    const settings = getSettings();

    const langSelect = document.getElementById("langSelect");
    const darkMode = document.getElementById("darkMode");

    if (langSelect && VALID_LANGUAGES.includes(langSelect.value)) {
        settings.lang = langSelect.value;
    }

    if (darkMode) {
        settings.dark = darkMode.checked;
    }

    const selectedTheme = document.body.dataset.colorTheme;

    if (VALID_THEMES.includes(selectedTheme)) {
        settings.themeColor = selectedTheme;
    }

    PRAYERS.forEach(prayer => {
        const select = document.getElementById("azan_" + prayer);

        if (select && Object.hasOwn(AZAN_FILES, select.value)) {
            settings.azan[prayer] = select.value;
        }
    });

    try {
        saveSettingsToStorage(settings);

        const t = TEXT[settings.lang] || TEXT.bn;

        alert(t.saved);

        window.location.href = "../index.html";
    } catch (error) {
        console.error("Could not save settings:", error);

        const t = TEXT[settings.lang] || TEXT.bn;

        alert(t.saveError);
    }
}

/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", function () {
    applySettings();

    const langSelect = document.getElementById("langSelect");
    const darkMode = document.getElementById("darkMode");

    if (langSelect) {
        langSelect.addEventListener("change", function () {
            applyLanguage(langSelect.value);
        });
    }

    if (darkMode) {
        darkMode.addEventListener("change", function () {
            applyTheme();
        });
    }

    document.querySelectorAll(".theme-option").forEach(button => {
        button.addEventListener("click", function () {
            selectColorTheme(button.dataset.theme);
        });
    });
});
