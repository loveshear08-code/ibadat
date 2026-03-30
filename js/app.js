// ==========================
// 🌍 GLOBAL APP SYSTEM
// ==========================

// 🔹 Default Settings
let appSettings = {
    language: localStorage.getItem("lang") || "bn",
    theme: localStorage.getItem("theme") || "light"
};

// ==========================
// 🎨 THEME SYSTEM
// ==========================
function applyTheme() {
    if (appSettings.theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

// ==========================
// 🌐 LANGUAGE SYSTEM
// ==========================
function applyLanguage() {
    const lang = appSettings.language;

    // Example text change (তুমি নিজের মতো extend করবে)
    const langTitle = document.getElementById("langTitle");
    if (langTitle) {
        if (lang === "bn") langTitle.innerText = "ভাষা";
        if (lang === "en") langTitle.innerText = "Language";
        if (lang === "hi") langTitle.innerText = "भाषा";
    }

    const themeTitle = document.getElementById("themeTitle");
    if (themeTitle) {
        if (lang === "bn") themeTitle.innerText = "থিম";
        if (lang === "en") themeTitle.innerText = "Theme";
        if (lang === "hi") themeTitle.innerText = "थीम";
    }
}

// ==========================
// 🔄 SAVE SETTINGS
// ==========================
function saveSettings() {
    const langSelect = document.getElementById("langSelect");
    const darkMode = document.getElementById("darkMode");

    if (langSelect) {
        appSettings.language = langSelect.value;
        localStorage.setItem("lang", langSelect.value);
    }

    if (darkMode) {
        appSettings.theme = darkMode.checked ? "dark" : "light";
        localStorage.setItem("theme", appSettings.theme);
    }

    applyTheme();
    applyLanguage();

    alert("Settings Saved ✅");
}

// ==========================
// 🔗 NAVIGATION SYSTEM
// ==========================
function goPage(page) {
    window.location.href = "../html/" + page;
}

// ==========================
// 🔙 BACK SYSTEM (WEBVIEW FRIENDLY)
// ==========================
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../index.html";
    }
}

// ==========================
// 📦 INIT APP
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    applyTheme();
    applyLanguage();

    // Settings page auto-fill
    const langSelect = document.getElementById("langSelect");
    const darkMode = document.getElementById("darkMode");

    if (langSelect) {
        langSelect.value = appSettings.language;
    }

    if (darkMode) {
        darkMode.checked = appSettings.theme === "dark";
    }
});
