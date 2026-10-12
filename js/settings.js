
"use strict";

/* =====================================
   IBADAT APP — SETTINGS
   Languages: Bengali, English, Hindi
   ===================================== */

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

/* ---------- TRANSLATIONS ---------- */

const TEXT = {
    bn: {
        title: "⚙️ সেটিংস",
        azan: "আজান সেটিং",
        language: "ভাষা",
        theme: "থিম",
        normal: "নরমাল মোড",
        dark: "ডার্ক মোড",
        save: "সেভ",
        saved: "✔ সেটিংস সেভ হয়েছে",
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
            madinah: "মদিনা",
            kuwait: "কুয়েত",
            bangladesh: "বাংলাদেশ",
            alaska: "আলাস্কা"
        }
    },

    en: {
        title: "⚙️ Settings",
        azan: "Azan Settings",
        language: "Language",
        theme: "Theme",
        normal: "Normal Mode",
        dark: "Dark Mode",
        save: "Save",
        saved: "✔ Settings saved",
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
            madinah: "Madinah",
            kuwait: "Kuwait",
            bangladesh: "Bangladesh",
            alaska: "Alaska"
        }
    },

    hi: {
        title: "⚙️ सेटिंग्स",
        azan: "अज़ान सेटिंग",
        language: "भाषा",
        theme: "थीम",
        normal: "नॉर्मल मोड",
        dark: "डार्क मोड",
        save: "सेव",
        saved: "✔ सेटिंग्स सेव हो गईं",
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
            madinah: "मदीना",
            kuwait: "कुवैत",
            bangladesh: "बांग्लादेश",
            alaska: "अलास्का"
        }
    }
};

/* ---------- DEFAULT SETTINGS COPY ---------- */

function getDefaultSettings() {
    return {
        lang: DEFAULT_SETTINGS.lang,
        dark: DEFAULT_SETTINGS.dark,
        azan: { ...DEFAULT_SETTINGS.azan }
    };
}

/* ---------- READ SAVED SETTINGS ---------- */

function getSettings() {
    try {
        const raw = localStorage.getItem("appSettings");

        if (!raw) {
            return getDefaultSettings();
        }

        const saved = JSON.parse(raw);

        if (!saved || typeof saved !== "object") {
            return getDefaultSettings();
        }

        const settings = getDefaultSettings();

        if (["bn", "en", "hi"].includes(saved.lang)) {
            settings.lang = saved.lang;
        }

        settings.dark = saved.dark === true;

        /*
         * Older versions may store azan as a single string.
         * Convert it without losing the previous selection.
         */
        if (typeof saved.azan === "string") {
            const oldAzan = saved.azan;

            for (const prayer of Object.keys(settings.azan)) {
                settings.azan[prayer] = oldAzan;
            }
        } else if (
            saved.azan &&
            typeof saved.azan === "object"
        ) {
            for (const prayer of Object.keys(settings.azan)) {
                const value = saved.azan[prayer];

                if (
                    typeof value === "string" &&
                    Object.prototype.hasOwnProperty.call(
                        TEXT.en.azans,
                        value
                    )
                ) {
                    settings.azan[prayer] = value;
                }
            }
        }

        return settings;

    } catch (error) {
        console.error("Could not read settings:", error);
        return getDefaultSettings();
    }
}

/* ---------- SAVE SETTINGS TO STORAGE ---------- */

function saveSettingsToStorage(settings) {
    localStorage.setItem(
        "appSettings",
        JSON.stringify(settings)
    );
}

/* ---------- TEXT HELPER ---------- */

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

/* ---------- APPLY LANGUAGE ---------- */

function applyLanguage(lang) {
    const t = TEXT[lang] || TEXT.bn;

    setText("settingsTitle", t.title);
    setText("azanTitle", t.azan);
    setText("azanDesc", t.azanFor);
    setText("langTitle", t.language);
    setText("themeTitle", t.theme);
    setText("darkLabel", t.dark);
    setText("saveBtn", t.save);

    const prayerIds = [
        "fajr",
        "dhuhr",
        "asr",
        "maghrib",
        "isha"
    ];

    prayerIds.forEach(prayer => {
        setText("prayer_" + prayer, t.prayers[prayer]);
    });

    /*
     * Update Azan names while preserving
     * the currently selected value.
     */
    const settings = getSettings();

    prayerIds.forEach(prayer => {
        const select = document.getElementById("azan_" + prayer);

        if (!select) return;

        const selectedValue = select.value || settings.azan[prayer];

        select.innerHTML = "";

        Object.entries(t.azans).forEach(([value, label]) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            select.appendChild(option);
        });

        select.value = selectedValue;
    });
}

/* ---------- APPLY THEME ---------- */

function applyTheme() {
    const darkMode = document.getElementById("darkMode");

    if (!darkMode) return;

    document.body.classList.toggle(
        "dark-mode",
        darkMode.checked
    );
}

/* ---------- LOAD SETTINGS ---------- */

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

    const prayerIds = [
        "fajr",
        "dhuhr",
        "asr",
        "maghrib",
        "isha"
    ];

    prayerIds.forEach(prayer => {
        const select = document.getElementById("azan_" + prayer);

        if (select) {
            select.value = settings.azan[prayer];
        }
    });

    applyLanguage(settings.lang);
    applyTheme();
}

/* ---------- SAVE BUTTON ---------- */

function saveSettings() {
    const settings = getSettings();

    const langSelect = document.getElementById("langSelect");
    const darkMode = document.getElementById("darkMode");

    if (langSelect) {
        settings.lang = langSelect.value;
    }

    if (darkMode) {
        settings.dark = darkMode.checked;
    }

    const prayerIds = [
        "fajr",
        "dhuhr",
        "asr",
        "maghrib",
        "isha"
    ];

    prayerIds.forEach(prayer => {
        const select = document.getElementById("azan_" + prayer);

        if (select) {
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
        alert("Settings could not be saved. Please try again.");
    }
}

/* ---------- AZAN AUDIO ---------- */

const AZAN_FILES = {
    makkah: "../assets/makkah.mp3",
    madinah: "../assets/madinah.mp3",
    kuwait: "../assets/kuwait.mp3",
    bangladesh: "../assets/bangladesh.mp3",
    alaska: "../assets/alaska.mp3"
};

let azanAudio = null;

function playAzan(type) {
    if (!Object.prototype.hasOwnProperty.call(AZAN_FILES, type)) {
        return;
    }

    if (!azanAudio) {
        azanAudio = new Audio();
    }

    azanAudio.pause();
    azanAudio.currentTime = 0;
    azanAudio.src = AZAN_FILES[type];

    azanAudio.play().catch(error => {
        console.error("Azan playback failed:", error);
    });
}

/* ---------- EVENT LISTENERS ---------- */

document.addEventListener("DOMContentLoaded", function () {
    applySettings();

    const langSelect = document.getElementById("langSelect");
    const darkMode = document.getElementById("darkMode");

    /*
     * Preview language immediately.
     * The permanent setting changes only when Save is pressed.
     */
    if (langSelect) {
        langSelect.addEventListener("change", function () {
            applyLanguage(langSelect.value);
        });
    }

    /*
     * Preview the selected theme immediately.
     * Save stores the choice permanently.
     */
    if (darkMode) {
        darkMode.addEventListener("change", applyTheme);
    }
});
