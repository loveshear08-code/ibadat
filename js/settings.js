/* =========================================================
   IBADAT SETTINGS - FINAL VERSION
   ========================================================= */


/* ================= DEFAULT SETTINGS ================= */

const defaultSettings = {

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


/* ================= LANGUAGE TEXT ================= */

const TEXT = {

    bn: {

        title: "⚙️ সেটিংস",

        azan: "আজান সেটিং",

        language: "ভাষা",

        theme: "থিম",

        normal: "নরমাল মোড",

        dark: "ডার্ক মোড",

        save: "সেভ",

        saved: "✔ সেভ হয়েছে",

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

        saved: "✔ Saved",

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

        saved: "✔ सेव हो गया",

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


/* ================= GET ================= */

function getSettings(){

    try{

        let raw =
            localStorage.getItem("appSettings");

        if(!raw){

            return structuredClone(defaultSettings);
        }

        let s = JSON.parse(raw);

        /* Old version migration */

        if(
            typeof s.azan === "string"
        ){

            const oldAzan = s.azan;

            s.azan = {

                fajr: oldAzan,
                dhuhr: oldAzan,
                asr: oldAzan,
                maghrib: oldAzan,
                isha: oldAzan
            };
        }

        if(!s.azan){

            s.azan =
                structuredClone(
                    defaultSettings.azan
                );
        }

        return s;

    }catch(e){

        return structuredClone(
            defaultSettings
        );
    }
}


/* ================= SAVE ================= */

function saveSettingsToStorage(settings){

    localStorage.setItem(
        "appSettings",
        JSON.stringify(settings)
    );
}


/* ================= APPLY ================= */

function applySettings(){

    const s = getSettings();

    const t =
        TEXT[s.lang] || TEXT.bn;


    /* ================= TITLE ================= */

    setText(
        "settingsTitle",
        t.title
    );


    setText(
        "azanTitle",
        t.azan
    );

    setText(
        "langTitle",
        t.language
    );

    setText(
        "themeTitle",
        t.theme
    );

    setText(
        "darkLabel",
        t.dark
    );

    setText(
        "normalLabel",
        t.normal
    );

    setText(
        "azanDesc",
        t.azanFor
    );

    setText(
        "saveBtn",
        t.save
    );


    /* ================= LANGUAGE ================= */

    const lang =
        document.getElementById("langSelect");

    if(lang){
        lang.value = s.lang;
    }


    /* ================= THEME ================= */

    const dark =
        document.getElementById("darkMode");

    if(dark){
        dark.checked = !!s.dark;
    }


    applyTheme();


    /* ================= PRAYER LABELS ================= */

    const prayerIds = [
        "fajr",
        "dhuhr",
        "asr",
        "maghrib",
        "isha"
    ];

    prayerIds.forEach(id => {

        const el =
            document.getElementById(
                "prayer_" + id
            );

        if(el){
            el.innerText =
                t.prayers[id];
        }
    });


    /* ================= AZAN OPTIONS ================= */

    const azanOptions = [
        "makkah",
        "madinah",
        "kuwait",
        "bangladesh",
        "alaska"
    ];

    prayerIds.forEach(prayer => {

        const select =
            document.getElementById(
                "azan_" + prayer
            );

        if(!select) return;

        select.innerHTML = "";

        azanOptions.forEach(azan => {

            const option =
                document.createElement("option");

            option.value = azan;

            option.innerText =
                t.azans[azan];

            select.appendChild(option);
        });

        select.value =
            s.azan[prayer] || "makkah";
    });
}


/* ================= THEME ================= */

function applyTheme(){

    const s = getSettings();

    if(s.dark){

        document.body.classList.add(
            "dark-mode"
        );

    }else{

        document.body.classList.remove(
            "dark-mode"
        );
    }
}


/* ================= SAVE BUTTON ================= */

function saveSettings(){

    const s = getSettings();

    const lang =
        document.getElementById("langSelect");

    const dark =
        document.getElementById("darkMode");


    if(lang){
        s.lang = lang.value;
    }

    if(dark){
        s.dark = dark.checked;
    }


    const prayers = [
        "fajr",
        "dhuhr",
        "asr",
        "maghrib",
        "isha"
    ];

    prayers.forEach(prayer => {

        const select =
            document.getElementById(
                "azan_" + prayer
            );

        if(select){
            s.azan[prayer] =
                select.value;
        }
    });


    saveSettingsToStorage(s);


    const t =
        TEXT[s.lang] || TEXT.bn;

    alert(t.saved);

    window.location.href = "../index.html";
}


/* ================= TEXT HELPER ================= */

function setText(id,text){

    const el =
        document.getElementById(id);

    if(el){
        el.innerText = text;
    }
}


/* ================= AZAN AUDIO ================= */

const AZAN_FILES = {

    makkah: "../assets/makkah.mp3",
    madinah: "../assets/madinah.mp3",
    kuwait: "../assets/kuwait.mp3",
    bangladesh: "../assets/bangladesh.mp3",
    alaska: "../assets/alaska.mp3"
};


let audio = new Audio();


function playAzan(type){

    if(!AZAN_FILES[type]) return;

    audio.pause();

    audio.src =
        AZAN_FILES[type];

    audio.currentTime = 0;

    audio.play().catch(() => {});
}


/* ================= INIT ================= */

document.addEventListener(
    "DOMContentLoaded",
    applySettings
);
