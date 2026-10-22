"use strict";

/* =====================================================
   IBADAT SETTINGS
   Languages: Bengali, English, Hindi
===================================================== */

const DEFAULT_SETTINGS = {
    lang: "bn",
    dark: false,
    azan: {
        fajr: "makkah",
        dhuhr: "makkah",
        asr: "makkah",
        maghrib: "makkah",
        isha: "makkah"
    }
};

const PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

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
        save: "সেভ",
        saved: "সেটিংস সেভ হয়েছে",
        saveError: "সেটিংস সেভ করা যায়নি। আবার চেষ্টা করুন।",
        footer: "আল্লাহকে স্মরণ করুন",
        azanFor: "কোন ওয়াক্তে কোন আজান বাজবে",
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
        save: "Save",
        saved: "Settings saved",
        saveError: "Could not save settings. Please try again.",
        footer: "Remember Allah",
        azanFor: "Choose which Azan plays for each prayer",
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
        save: "सेव",
        saved: "सेटिंग्स सेव हो गईं",
        saveError: "सेटिंग्स सेव नहीं हो सकीं। फिर कोशिश करें।",
        footer: "अल्लाह को याद करें",
        azanFor: "हर नमाज़ के लिए अज़ान चुनें",
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
        azan: { ...DEFAULT_SETTINGS.azan }
    };
}

function getSettings() {
    try {
        const raw = localStorage.getItem("appSettings");

        if (!raw) return getDefaultSettings();

        const saved = JSON.parse(raw);

        if (!saved || typeof saved !== "object") {
            return getDefaultSettings();
        }

        const settings = getDefaultSettings();

        if (["bn", "en", "hi"].includes(saved.lang)) {
            settings.lang = saved.lang;
        }

        settings.dark = saved.dark === true;

        if (typeof saved.azan === "string") {
            const oldAzan = saved.azan;

            if (Object.hasOwn(AZAN_FILES, oldAzan)) {
                PRAYERS.forEach(prayer => {
                    settings.azan[prayer] = oldAzan;
                });
            }
        } else if (saved.azan && typeof saved.azan === "object") {
            PRAYERS.forEach(prayer => {
                const value = saved.azan[prayer];

                if (typeof value === "string" && Object.hasOwn(AZAN_FILES, value)) {
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
    if (element) element.textContent = value;
}

/* ================= LANGUAGE ================= */

function applyLanguage(lang) {
    const t = TEXT[lang] || TEXT.bn;

    document.documentElement.lang = lang;

    setText("settingsTitle", t.title);
    setText("azanTitle", t.azan);
    setText("azanDesc", t.azanFor);
    setText("langTitle", t.language);
    setText("themeTitle", t.theme);
    setText("darkLabel", t.dark);
    setText("saveBtn", t.save);
    setText("settingsFooter", t.footer);

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

/* ================= THEME ================= */

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

    if (langSelect) langSelect.value = settings.lang;
    if (darkMode) darkMode.checked = settings.dark;

    PRAYERS.forEach(prayer => {
        const select = document.getElementById("azan_" + prayer);
        if (select) select.value = settings.azan[prayer];
    });

    applyLanguage(settings.lang);
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
        // The audio may not have loaded yet.
    }

    azanAudio.src = AZAN_FILES[type];
    azanAudio.load();

    azanAudio.play().catch(error => {
        console.error("Azan playback failed:", error);
        const lang = document.getElementById("langSelect")?.value || "bn";
        alert(
            lang === "en"
                ? "The audio could not be played. Check the file path and try again."
                : lang === "hi"
                    ? "ऑडियो नहीं चल सका। फ़ाइल का पथ जाँचकर फिर कोशिश करें।"
                    : "আজানের অডিও চালানো যায়নি। ফাইলের পাথ পরীক্ষা করে আবার চেষ্টা করুন।"
        );
    });
}

/* ================= SAVE SETTINGS ================= */

function saveSettings() {
    const settings = getSettings();

    const langSelect = document.getElementById("langSelect");
    const darkMode = document.getElementById("darkMode");

    if (langSelect) settings.lang = langSelect.value;
    if (darkMode) settings.dark = darkMode.checked;

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
        darkMode.addEventListener("change", applyTheme);
    }
});
