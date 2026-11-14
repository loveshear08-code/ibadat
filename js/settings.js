"use strict";

/* =====================================================
   IBADAT SETTINGS
   Four Themes | Dark Mode | BN / EN / HI
   Azan Selection | Azan Sound Preference
   ===================================================== */

const DEFAULT_SETTINGS = {
    lang: "bn",
    dark: false,
    themeColor: "classic",
    azanSound: true,

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

/* =====================================================
   TRANSLATIONS
   ===================================================== */

const TEXT = {
    bn: {
        title: "সেটিংস",
        azan: "আযান",
        language: "ভাষা",
        theme: "থিম",
        dark: "ডার্ক মোড",
        azanSound: "আজান সাউন্ড",

        themeColorDesc: "থিম নির্বাচন করুন",

        themes: {
            classic: "ক্লাসিক সবুজ",
            royal: "রয়্যাল নীল",
            rose: "রোজ ও শ্যাম্পেন",
            pista: "ফ্রেশ পিস্তা"
        },

        save: "সংরক্ষণ",
        saved: "সেটিংস সংরক্ষিত হয়েছে",
        saveError: "সেটিংস সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।",

        footer: "আপনার ইবাদত, আপনার নিয়ন্ত্রণে।",

        azanFor: "আজান নির্বাচন করুন",

        play: "আজান চালান",
        pause: "আজান থামান",

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
        azan: "Azan",
        language: "Language",
        theme: "Theme",
        dark: "Dark Mode",
        azanSound: "Azan Sound",

        themeColorDesc: "Choose Theme",

        themes: {
            classic: "Classic Green",
            royal: "Royal Blue",
            rose: "Rose Champagne",
            pista: "Fresh Pista"
        },

        save: "Save",
        saved: "Settings saved",
        saveError: "Could not save settings. Please try again.",

        footer: "Your Worship, Under Your Control.",

        azanFor: "Choose Azan",

        play: "Play Azan",
        pause: "Pause Azan",

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
        azan: "अज़ान",
        language: "भाषा",
        theme: "थीम",
        dark: "डार्क मोड",
        azanSound: "अज़ान की आवाज़",

        themeColorDesc: "थीम चुनें",

        themes: {
            classic: "क्लासिक हरा",
            royal: "रॉयल नीला",
            rose: "रोज़ शैम्पेन",
            pista: "फ्रेश पिस्ता"
        },

        save: "सहेजें",
        saved: "सेटिंग्स सहेजी गईं",
        saveError: "सेटिंग्स सहेजी नहीं जा सकीं। फिर कोशिश करें।",

        footer: "आपकी इबादत, आपके नियंत्रण में।",

        azanFor: "अज़ान चुनें",

        play: "अज़ान चलाएँ",
        pause: "अज़ान रोकें",

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

/* =====================================================
   SETTINGS STORAGE
   ===================================================== */

function getDefaultSettings() {
    return {
        lang: DEFAULT_SETTINGS.lang,
        dark: DEFAULT_SETTINGS.dark,
        themeColor: DEFAULT_SETTINGS.themeColor,
        azanSound: DEFAULT_SETTINGS.azanSound,
        azan: { ...DEFAULT_SETTINGS.azan }
    };
}

function getSettings() {
    try {
        const raw = localStorage.getItem("appSettings");

        if (!raw) {
            return getDefaultSettings();
        }

        const saved = JSON.parse(raw);

        if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
            return getDefaultSettings();
        }

        const settings = getDefaultSettings();

        /* LANGUAGE */

        if (VALID_LANGUAGES.includes(saved.lang)) {
            settings.lang = saved.lang;
        } else if (VALID_LANGUAGES.includes(saved.language)) {
            settings.lang = saved.language;
        }

        /* DARK MODE */

        settings.dark = saved.dark === true;

        /* THEME */

        if (VALID_THEMES.includes(saved.themeColor)) {
            settings.themeColor = saved.themeColor;
        } else if (VALID_THEMES.includes(saved.theme)) {
            settings.themeColor = saved.theme;
        }

        /* AZAN SOUND
           Old settings without this property default to ON.
        */

        settings.azanSound =
            typeof saved.azanSound === "boolean"
                ? saved.azanSound
                : true;

        /* AZAN SELECTION */

        if (typeof saved.azan === "string" && AZAN_FILES[saved.azan]) {
            PRAYERS.forEach(prayer => {
                settings.azan[prayer] = saved.azan;
            });

        } else if (saved.azan && typeof saved.azan === "object") {
            PRAYERS.forEach(prayer => {
                if (
                    typeof saved.azan[prayer] === "string" &&
                    AZAN_FILES[saved.azan[prayer]]
                ) {
                    settings.azan[prayer] = saved.azan[prayer];
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

/* =====================================================
   COMMON HELPERS
   ===================================================== */

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function currentLanguage() {
    const selected =
        document.getElementById("langSelect")?.value ||
        getSettings().lang;

    return VALID_LANGUAGES.includes(selected)
        ? selected
        : "bn";
}

/* =====================================================
   LANGUAGE APPLICATION
   ===================================================== */

function applyLanguage(language) {
    const safeLang = VALID_LANGUAGES.includes(language)
        ? language
        : "bn";

    const t = TEXT[safeLang];

    document.documentElement.lang = safeLang;

    setText("settingsTitle", t.title);
    setText("azanTitle", t.azan);
    setText("azanDesc", t.azanFor);

    setText("langTitle", t.language);
    setText("themeTitle", t.theme);
    setText("darkLabel", t.dark);

    setText("azanSoundLabel", t.azanSound);

    setText("themeColorDesc", t.themeColorDesc);

    setText("saveBtn", t.save);
    setText("settingsFooter", t.footer);

    /* THEME NAMES */

    document.querySelectorAll("[data-theme-name]").forEach(element => {
        const themeName = element.dataset.themeName;

        if (t.themes[themeName]) {
            element.textContent = t.themes[themeName];
        }
    });

    /* THEME ACCESSIBILITY LABELS */

    document.querySelectorAll(".theme-option").forEach(button => {
        const themeName = button.dataset.theme;

        button.setAttribute(
            "aria-label",
            t.themes[themeName] || themeName
        );
    });

    /* PLAY BUTTON LABELS */

    document.querySelectorAll(".play-button").forEach(button => {
        const prayer = button.dataset.prayer;
        const playing = button.classList.contains("is-playing");

        button.setAttribute(
            "aria-label",
            playing
                ? `${t.pause} - ${t.prayers[prayer]}`
                : `${t.play} - ${t.prayers[prayer]}`
        );
    });

    /* PRAYER NAMES AND AZAN OPTIONS */

    PRAYERS.forEach(prayer => {
        setText("prayer_" + prayer, t.prayers[prayer]);

        const select = document.getElementById("azan_" + prayer);

        if (!select) return;

        const oldValue =
            select.value ||
            getSettings().azan[prayer];

        select.replaceChildren();

        Object.entries(t.azans).forEach(([value, label]) => {
            const option = document.createElement("option");

            option.value = value;
            option.textContent = label;

            select.appendChild(option);
        });

        select.value = AZAN_FILES[oldValue]
            ? oldValue
            : DEFAULT_SETTINGS.azan[prayer];
    });
}

/* =====================================================
   COLOR THEME
   ===================================================== */

function applyColorTheme(themeName) {
    const safeTheme = VALID_THEMES.includes(themeName)
        ? themeName
        : DEFAULT_SETTINGS.themeColor;

    document.body.dataset.colorTheme = safeTheme;

    document.querySelectorAll(".theme-option").forEach(button => {
        const selected = button.dataset.theme === safeTheme;

        button.setAttribute("aria-checked", String(selected));
        button.classList.toggle("selected", selected);
    });

    const themeMeta = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (themeMeta) {
        const colors = {
            classic: "#0F5132",
            royal: "#173A60",
            rose: "#7D414B",
            pista: "#2F7135"
        };

        themeMeta.setAttribute("content", colors[safeTheme]);
    }
}

function selectColorTheme(themeName) {
    if (!VALID_THEMES.includes(themeName)) return;

    applyColorTheme(themeName);

    try {
        const settings = getSettings();

        settings.themeColor = themeName;

        saveSettingsToStorage(settings);

    } catch (error) {
        console.error("Could not save color theme:", error);
    }
}

/* =====================================================
   DARK MODE
   ===================================================== */

function applyTheme() {
    const checkbox = document.getElementById("darkMode");

    if (!checkbox) return;

    document.body.classList.toggle(
        "dark-mode",
        checkbox.checked
    );
}

/* =====================================================
   APPLY SAVED SETTINGS
   ===================================================== */

function applySettings() {
    const settings = getSettings();

    document.getElementById("langSelect").value = settings.lang;

    document.getElementById("darkMode").checked = settings.dark;

    document.getElementById("azanSound").checked = settings.azanSound;

    PRAYERS.forEach(prayer => {
        const select = document.getElementById("azan_" + prayer);

        if (select) {
            select.value = settings.azan[prayer];
        }
    });

    applyColorTheme(settings.themeColor);
    applyLanguage(settings.lang);
    applyTheme();
}

/* =====================================================
   AUDIO PREVIEW
   ===================================================== */

let azanAudio = null;
let activePrayer = null;

function getPlayButton(prayer) {
    return document.querySelector(
        '.play-button[data-prayer="' + prayer + '"]'
    );
}

function updatePlayButton(prayer, playing) {
    const button = getPlayButton(prayer);

    if (!button) return;

    const t = TEXT[currentLanguage()];

    button.textContent = playing ? "Ⅱ" : "▶";

    button.classList.toggle("is-playing", playing);

    button.setAttribute(
        "aria-label",
        playing
            ? `${t.pause} - ${t.prayers[prayer]}`
            : `${t.play} - ${t.prayers[prayer]}`
    );

    button.setAttribute("aria-pressed", String(playing));
}

function updateAllPlayButtons() {
    PRAYERS.forEach(prayer => {
        updatePlayButton(
            prayer,
            Boolean(
                azanAudio &&
                !azanAudio.paused &&
                !azanAudio.ended &&
                activePrayer === prayer
            )
        );
    });
}

function stopAzanPreview(resetTime = true) {
    if (azanAudio) {
        azanAudio.pause();

        if (resetTime) {
            try {
                azanAudio.currentTime = 0;
            } catch (_) {}
        }
    }

    if (activePrayer) {
        updatePlayButton(activePrayer, false);
    }

    activePrayer = null;
}

async function playAzan(type, prayer) {
    if (!AZAN_FILES[type]) {
        console.error("Unknown Azan selection:", type);
        return;
    }

    if (!azanAudio) {
        azanAudio = new Audio();

        azanAudio.preload = "none";

        azanAudio.addEventListener("ended", () => {
            if (activePrayer) {
                updatePlayButton(activePrayer, false);
            }

            activePrayer = null;
        });
    }

    const selectedSource = new URL(
        AZAN_FILES[type],
        document.baseURI
    ).href;

    if (
        activePrayer === prayer &&
        !azanAudio.paused &&
        !azanAudio.ended &&
        azanAudio.src === selectedSource
    ) {
        azanAudio.pause();

        updatePlayButton(prayer, false);

        return;
    }

    stopAzanPreview();

    activePrayer = prayer;

    azanAudio.src = AZAN_FILES[type];

    azanAudio.load();

    try {
        await azanAudio.play();

        updateAllPlayButtons();

    } catch (error) {
        console.error("Azan playback failed:", error);

        updatePlayButton(prayer, false);

        activePrayer = null;

        alert(TEXT[currentLanguage()].audioError);
    }
}

/* =====================================================
   SAVE SETTINGS
   ===================================================== */

function saveSettings() {
    const settings = getSettings();

    settings.lang = currentLanguage();

    settings.dark = document.getElementById("darkMode").checked;

    settings.azanSound = document.getElementById("azanSound").checked;

    const selectedTheme = document.body.dataset.colorTheme;

    if (VALID_THEMES.includes(selectedTheme)) {
        settings.themeColor = selectedTheme;
    }

    PRAYERS.forEach(prayer => {
        const select = document.getElementById("azan_" + prayer);

        if (select && AZAN_FILES[select.value]) {
            settings.azan[prayer] = select.value;
        }
    });

    try {
        saveSettingsToStorage(settings);

        alert(TEXT[settings.lang].saved);

        window.location.href = "../index.html";

    } catch (error) {
        console.error("Could not save settings:", error);

        alert(TEXT[settings.lang].saveError);
    }
}

/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* APPLY SAVED SETTINGS */

    applySettings();

    /* LANGUAGE CHANGE */

    document.getElementById("langSelect").addEventListener(
        "change",
        event => {
            applyLanguage(event.target.value);
        }
    );

    /* DARK MODE CHANGE */

    document.getElementById("darkMode").addEventListener(
        "change",
        () => {
            applyTheme();
        }
    );

    /* THEME SELECTION */

    document.querySelectorAll(".theme-option").forEach(button => {
        button.addEventListener("click", () => {
            selectColorTheme(button.dataset.theme);
        });
    });

    /* AZAN PREVIEW */

    document.querySelectorAll(".play-button").forEach(button => {
        button.addEventListener("click", () => {
            const prayer = button.dataset.prayer;

            const select = document.getElementById(
                "azan_" + prayer
            );

            if (select) {
                playAzan(select.value, prayer);
            }
        });
    });

    /* SAVE */

    document.getElementById("saveBtn").addEventListener(
        "click",
        saveSettings
    );
});
