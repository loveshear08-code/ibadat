/* ================= GLOBAL SETTINGS ================= */

const defaultSettings = {
    lang: "bn",
    dark: false,
    azan: "makkah.mp3"
};

/* GET */
function getSettings(){
    let s = localStorage.getItem("appSettings");
    return s ? JSON.parse(s) : defaultSettings;
}

/* SAVE */
function saveSettingsToStorage(newSettings){
    localStorage.setItem("appSettings", JSON.stringify(newSettings));
}

/* APPLY */
function applySettings(){

    let s = getSettings();

    /* DARK MODE */
    if(s.dark){
        document.body.style.background = "#121212";
        document.body.style.color = "#ffffff";
    }else{
        document.body.style.background = "";
        document.body.style.color = "";
    }

    /* LANGUAGE (basic) */
    document.title = (s.lang === "en") ? "IBADAT" : "ইবাদত";
}
