/* ================= GLOBAL SETTINGS ================= */

const defaultSettings = {
    lang: "bn",
    dark: false,
    azan: "makkah.mp3"
};

function getSettings(){
    let s = localStorage.getItem("appSettings");
    return s ? JSON.parse(s) : defaultSettings;
}

function saveSettings(newSettings){
    localStorage.setItem("appSettings", JSON.stringify(newSettings));
}

/* ================= APPLY SETTINGS ================= */

function applySettings(){

    let s = getSettings();

    /* DARK MODE */
    if(s.dark){
        document.body.style.background = "#121212";
        document.body.style.color = "#ffffff";
    }

    /* LANGUAGE (simple demo) */
    if(s.lang === "en"){
        document.title = "IBADAT";
    }else{
        document.title = "ইবাদত";
    }

}
