/* ================= GLOBAL SETTINGS ================= */

const defaultSettings = {
    lang: "bn",
    dark: false,
    azan: "makkah"
};

/* ================= LANGUAGE TEXT ================= */

const TEXT = {
    bn: {
        title: "ইবাদত",
        settings: "⚙️ সেটিং",
        azan: "আজান সেটিং",
        azanDesc: "আজানের সাউন্ড নির্বাচন করুন",
        language: "ভাষা",
        theme: "থিম",
        dark: "ডার্ক মোড",
        save: "সেভ",
        test: "টেস্ট",
        saved: "✔ সেভ হয়েছে"
    },
    en: {
        title: "IBADAT",
        settings: "⚙️ Settings",
        azan: "Azan Setting",
        azanDesc: "Select azan sound",
        language: "Language",
        theme: "Theme",
        dark: "Dark Mode",
        save: "Save",
        test: "Test",
        saved: "✔ Saved"
    },
    hi: {
        title: "इबादत",
        settings: "⚙️ सेटिंग",
        azan: "अज़ान सेटिंग",
        azanDesc: "अज़ान ध्वनि चुनें",
        language: "भाषा",
        theme: "थीम",
        dark: "डार्क मोड",
        save: "सेव",
        test: "टेस्ट",
        saved: "✔ सेव हो गया"
    }
};

/* ================= AZAN NAME MULTI LANGUAGE ================= */

const AZAN_TEXT = {
    bn:["মক্কা","মদিনা","কুয়েত","বাংলাদেশ","আলাস্কা"],
    en:["Makkah","Madinah","Kuwait","Bangladesh","Alaska"],
    hi:["मक्का","मदीना","कुवैत","बांग्लादेश","अलास्का"]
};

/* ================= GET ================= */

function getSettings(){
    let s = localStorage.getItem("appSettings");
    return s ? JSON.parse(s) : defaultSettings;
}

/* ================= SAVE ================= */

function saveSettingsToStorage(newSettings){
    localStorage.setItem("appSettings", JSON.stringify(newSettings));
}

/* ================= APPLY ================= */

function applySettings(){

    let s = getSettings();
    let t = TEXT[s.lang] || TEXT["bn"];

    /* DARK MODE */
    if(s.dark){
        document.body.style.background = "#121212";
        document.body.style.color = "#ffffff";

        document.querySelectorAll(".card").forEach(el=>{
            el.style.background = "#1e1e1e";
            el.style.color = "#ffffff";
        });

    }else{
        document.body.style.background = "";
        document.body.style.color = "";

        document.querySelectorAll(".card").forEach(el=>{
            el.style.background = "";
            el.style.color = "";
        });
    }

    /* TITLE */
    document.title = t.title;

    /* TEXT APPLY */
    const map = {
        settingsTitle: t.settings,
        azanTitle: t.azan,
        langTitle: t.language,
        themeTitle: t.theme,
        darkLabel: t.dark,
        saveBtn: t.save
    };

    Object.keys(map).forEach(id=>{
        let el = document.getElementById(id);
        if(el) el.innerText = map[id];
    });

    /* SELECT VALUE */
    let langSelect = document.getElementById("langSelect");
    if(langSelect) langSelect.value = s.lang;

    let darkMode = document.getElementById("darkMode");
    if(darkMode) darkMode.checked = s.dark;

    /* AZAN ACTIVE */
    document.querySelectorAll(".option").forEach(el=>{
        let tick = el.querySelector(".tick");

        el.classList.remove("active");
        if(tick) tick.innerText = "";

        if(el.dataset.azan === s.azan){
            el.classList.add("active");
            if(tick) tick.innerText = "✔";
        }
    });

    /* 🔥 AZAN NAME APPLY (MAIN FIX) */
    applyAzanText();
}

/* ================= AZAN TEXT APPLY ================= */

function applyAzanText(){

    let s = getSettings();
    let lang = s.lang;

    let list = AZAN_TEXT[lang] || AZAN_TEXT["bn"];

    let ids = [
        "azan_makkah",
        "azan_madinah",
        "azan_kuwait",
        "azan_bangladesh",
        "azan_alaska"
    ];

    ids.forEach((id,i)=>{
        let el = document.getElementById(id);
        if(el){
            el.innerText = list[i];
        }
    });

}

/* ================= SET AZAN ================= */

function setAzan(type){

    let s = getSettings();
    s.azan = type;

    saveSettingsToStorage(s);

    document.querySelectorAll(".option").forEach(el=>{
        el.classList.remove("active");
        let tick = el.querySelector(".tick");
        if(tick) tick.innerText = "";
    });

    let selected = document.querySelector(`[data-azan="${type}"]`);
    if(selected){
        selected.classList.add("active");
        let tick = selected.querySelector(".tick");
        if(tick) tick.innerText = "✔";
    }
}

/* ================= SAVE BUTTON ================= */

function saveSettings(){

    let s = getSettings();

    let langEl = document.getElementById("langSelect");
    let darkEl = document.getElementById("darkMode");

    if(langEl) s.lang = langEl.value;
    if(darkEl) s.dark = darkEl.checked;

    saveSettingsToStorage(s);

    let t = TEXT[s.lang] || TEXT["bn"];
    alert(t.saved);

    location.reload();
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", function(){
    applySettings();
});

/* ================= AZAN AUDIO ================= */

const AZAN_FILES = {
    makkah: "../assets/makkah.mp3",
    madinah: "../assets/madinah.mp3",
    kuwait: "../assets/kuwait.mp3",
    bangladesh: "../assets/bangladesh.mp3",
    alaska: "../assets/alaska.mp3"
};

let audio = new Audio();

function playAzan(e,type){
    e.stopPropagation();

    audio.src = AZAN_FILES[type];
    audio.currentTime = 0;
    audio.play().catch(()=>{});
}
