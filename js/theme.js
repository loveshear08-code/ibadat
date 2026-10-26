
"use strict";

/* =====================================================
   IBADAT — GLOBAL THEME CONTROLLER
   File: js/theme.js

   Responsibilities:
   - Read global appSettings
   - Apply selected color theme
   - Apply light/dark mode
   - Keep theme in sync when settings change
   - Support classic, royal, rose and pista
===================================================== */

(function () {
    const DEFAULT_SETTINGS = {
        lang: "bn",
        dark: false,
        themeColor: "classic"
    };

    const VALID_THEMES = [
        "classic",
        "royal",
        "rose",
        "pista"
    ];

    /* ================================================
       READ SETTINGS
    ================================================ */

    function readAppSettings() {
        try {
            const saved = localStorage.getItem("appSettings");

            if (!saved) {
                return { ...DEFAULT_SETTINGS };
            }

            const parsed = JSON.parse(saved);

            if (
                !parsed ||
                typeof parsed !== "object" ||
                Array.isArray(parsed)
            ) {
                return { ...DEFAULT_SETTINGS };
            }

            const settings = {
                ...DEFAULT_SETTINGS,
                ...parsed
            };

            /* Support both existing theme property names. */

            if (VALID_THEMES.includes(parsed.themeColor)) {
                settings.themeColor = parsed.themeColor;
            } else if (VALID_THEMES.includes(parsed.theme)) {
                settings.themeColor = parsed.theme;
            } else {
                settings.themeColor = DEFAULT_SETTINGS.themeColor;
            }

            /* Normalize dark mode. */

            settings.dark = parsed.dark === true;

            /* Support both existing language property names. */

            if (
                ["bn", "en", "hi"].includes(parsed.lang)
            ) {
                settings.lang = parsed.lang;
            } else if (
                ["bn", "en", "hi"].includes(parsed.language)
            ) {
                settings.lang = parsed.language;
            } else {
                settings.lang = DEFAULT_SETTINGS.lang;
            }

            return settings;

        } catch (error) {
            console.error(
                "IBADAT: Could not read appSettings.",
                error
            );

            return { ...DEFAULT_SETTINGS };
        }
    }

    /* ================================================
       APPLY COLOR THEME
    ================================================ */

    function applyColorTheme(themeName) {
        const safeTheme = VALID_THEMES.includes(themeName)
            ? themeName
            : DEFAULT_SETTINGS.themeColor;

        /*
         * The CSS on each page can use:
         * body[data-color-theme="classic"]
         * body[data-color-theme="royal"]
         * body[data-color-theme="rose"]
         * body[data-color-theme="pista"]
         */

        document.body.dataset.colorTheme = safeTheme;

        /*
         * Keep compatibility with pages that use
         * the older data-theme-color attribute.
         */

        document.body.dataset.themeColor = safeTheme;

        /* Update the browser status-bar color if available. */

        const metaThemeColor = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (metaThemeColor) {
            const colors = {
                classic: "#0F5132",
                royal: "#173A60",
                rose: "#7D414B",
                pista: "#2F7135"
            };

            metaThemeColor.setAttribute(
                "content",
                colors[safeTheme]
            );
        }
    }

    /* ================================================
       APPLY LIGHT / DARK MODE
    ================================================ */

    function applyDarkMode(isDark) {
        document.body.classList.toggle(
            "dark-mode",
            isDark === true
        );
    }

    /* ================================================
       APPLY ALL GLOBAL SETTINGS
    ================================================ */

    function applyGlobalTheme() {
        const settings = readAppSettings();

        applyColorTheme(settings.themeColor);
        applyDarkMode(settings.dark);

        /*
         * Notify other page scripts that the global
         * settings have been applied.
         */

        window.dispatchEvent(
            new CustomEvent("globalThemeChanged", {
                detail: {
                    themeColor: settings.themeColor,
                    dark: settings.dark,
                    lang: settings.lang
                }
            })
        );
    }

    /* ================================================
       INITIALIZE
    ================================================ */

    function initializeGlobalTheme() {
        applyGlobalTheme();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeGlobalTheme,
            { once: true }
        );
    } else {
        initializeGlobalTheme();
    }

    /* ================================================
       UPDATE WHEN SETTINGS CHANGE IN ANOTHER TAB
    ================================================ */

    window.addEventListener("storage", function (event) {
        if (event.key === "appSettings") {
            applyGlobalTheme();
        }
    });

    /* ================================================
       PUBLIC REFRESH FUNCTION
       Other scripts may call this after saving settings.
    ================================================ */

    window.applyGlobalTheme = applyGlobalTheme;

})();
