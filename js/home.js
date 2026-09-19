/* =========================================================
   IBADAT HOME - FINAL VERSION
   LANGUAGE SYNC FIXED
   ========================================================= */


/* ================= LANGUAGE ================= */

const HOME_TEXT = {

    bn: {
        today: "আজ",
        current: "বর্তমান ওয়াক্ত",
        next: "পরবর্তী ওয়াক্ত",
        remaining: "বাকি",
        noPrayer: "এখন কোনো ওয়াক্ত নয়",
        clear: "আকাশ পরিষ্কার",
        cloudy: "মেঘলা",
        rain: "বৃষ্টি",
        locationError: "লোকেশন পাওয়া যায়নি",
        loading: "লোড হচ্ছে...",

        prayers: {
            Fajr: "ফজর",
            Sunrise: "সূর্যোদয়",
            Dhuhr: "জোহর",
            Asr: "আসর",
            Maghrib: "মাগরিব",
            Isha: "এশা"
        },

        features: {
            namaz: "নামাজ",
            quran: "কুরআন",
            dua: "দোয়া",
            hadith: "হাদিস",
            qibla: "কিবলা",
            tasbih: "তাসবিহ"
        },

        bottom: "আল্লাহকে স্মরণ করুন — নামাজ কায়েম করুন"
    },


    en: {
        today: "Today",
        current: "Current Prayer",
        next: "Next Prayer",
        remaining: "Remaining",
        noPrayer: "No prayer time now",
        clear: "Clear Sky",
        cloudy: "Cloudy",
        rain: "Rain",
        locationError: "Location unavailable",
        loading: "Loading...",

        prayers: {
            Fajr: "Fajr",
            Sunrise: "Sunrise",
            Dhuhr: "Dhuhr",
            Asr: "Asr",
            Maghrib: "Maghrib",
            Isha: "Isha"
        },

        features: {
            namaz: "Namaz",
            quran: "Quran",
            dua: "Dua",
            hadith: "Hadith",
            qibla: "Qibla",
            tasbih: "Tasbih"
        },

        bottom: "Remember Allah — Establish Prayer"
    },


    hi: {
        today: "आज",
        current: "वर्तमान नमाज़",
        next: "अगली नमाज़",
        remaining: "शेष",
        noPrayer: "अभी कोई नमाज़ का समय नहीं",
        clear: "आसमान साफ",
        cloudy: "बादल",
        rain: "बारिश",
        locationError: "स्थान उपलब्ध नहीं",
        loading: "लोड हो रहा है...",

        prayers: {
            Fajr: "फ़ज्र",
            Sunrise: "सूर्योदय",
            Dhuhr: "ज़ुहर",
            Asr: "असर",
            Maghrib: "मग़रिब",
            Isha: "इशा"
        },

        features: {
            namaz: "नमाज़",
            quran: "क़ुरआन",
            dua: "दुआ",
            hadith: "हदीस",
            qibla: "क़िबला",
            tasbih: "तस्बीह"
        },

        bottom: "अल्लाह को याद करें — नमाज़ कायम करें"
    }

};


/* ================= PRAYER ORDER ================= */

const ALL_TIMES = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha"
];


const ACTUAL_PRAYERS = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha"
];


/* ================= STATE ================= */

let prayerTimes = {};

let currentDateKey = "";

let lastAzanKey = "";

let latitude = null;

let longitude = null;

let locationTimezone = null;

let lastHomeLanguage = null;


/* ================= SETTINGS ================= */

/*
   Home থেকে প্রতিবার সরাসরি localStorage
   থেকে Language পড়া হবে।
*/

function homeSettings(){

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


    try{

        const saved =
            localStorage.getItem("appSettings");


        if(!saved){

            return defaultSettings;
        }


        const obj =
            JSON.parse(saved);


        if(!obj || typeof obj !== "object"){

            return defaultSettings;
        }


        /* ================= LANGUAGE ================= */

        if(
            obj.lang !== "bn" &&
            obj.lang !== "en" &&
            obj.lang !== "hi"
        ){

            obj.lang = "bn";
        }


        /* ================= AZAN ================= */

        if(
            !obj.azan ||
            typeof obj.azan !== "object"
        ){

            obj.azan = {

                fajr:
                    typeof obj.azan === "string"
                    ? obj.azan
                    : "makkah",

                dhuhr: "makkah",

                asr: "makkah",

                maghrib: "makkah",

                isha: "makkah"
            };
        }


        return obj;


    }catch(e){

        return defaultSettings;
    }
}


/* ================= GET CURRENT LANGUAGE ================= */

function getHomeLanguage(){

    try{

        const saved =
            localStorage.getItem("appSettings");


        if(saved){

            const obj =
                JSON.parse(saved);


            if(
                obj &&
                (
                    obj.lang === "bn" ||
                    obj.lang === "en" ||
                    obj.lang === "hi"
                )
            ){

                return obj.lang;
            }
        }

    }catch(e){

        console.error(
            "Language read error:",
            e
        );
    }


    return "bn";
}


/* ================= LANGUAGE NUMBER ================= */

function localNumber(value){

    const lang =
        getHomeLanguage();


    if(lang === "bn"){

        return String(value).replace(
            /\d/g,
            d => "০১২৩৪৫৬৭৮৯"[d]
        );
    }


    if(lang === "hi"){

        return String(value).replace(
            /\d/g,
            d => "०१२३४५६७८९"[d]
        );
    }


    return String(value);
}


/* ================= TIME ================= */

function formatClock(date){

    const h =
        date.getHours();

    const m =
        date.getMinutes();

    const sec =
        date.getSeconds();


    const result =

        String(h).padStart(2,"0") +
        ":" +
        String(m).padStart(2,"0") +
        ":" +
        String(sec).padStart(2,"0");


    return localNumber(result);
}


/* ================= PRAYER TIME FORMAT ================= */

function formatTime(time){

    if(!time){

        return "--:--";
    }


    const clean =
        String(time).split(" ")[0];


    const parts =
        clean.split(":");


    if(parts.length < 2){

        return clean;
    }


    const h =
        parseInt(parts[0],10);

    const m =
        parts[1];


    const result =

        String(h).padStart(2,"0") +
        ":" +
        String(m).padStart(2,"0");


    return localNumber(result);
}


/* ================= TIME TO MINUTES ================= */

function timeToMinutes(time){

    if(!time){

        return null;
    }


    const clean =
        String(time).split(" ")[0];


    const p =
        clean.split(":");


    if(p.length < 2){

        return null;
    }


    return (

        parseInt(p[0],10) * 60 +

        parseInt(p[1],10)
    );
}


/* ================= DATE KEY ================= */

function dateKey(date){

    return (

        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2,"0") +
        "-" +
        String(
            date.getDate()
        ).padStart(2,"0")
    );
}


/* ================= DATE FORMAT ================= */

function formatDate(date){

    const lang =
        getHomeLanguage();


    const options = {

        day: "numeric",

        month: "long",

        year: "numeric"
    };


    let locale =
        "bn-BD";


    if(lang === "en"){

        locale = "en-US";
    }


    if(lang === "hi"){

        locale = "hi-IN";
    }


    return new Intl.DateTimeFormat(
        locale,
        options
    ).format(date);
}


/* ================= WEEKDAY ================= */

function formatDay(date){

    const lang =
        getHomeLanguage();


    let locale =
        "bn-BD";


    if(lang === "en"){

        locale = "en-US";
    }


    if(lang === "hi"){

        locale = "hi-IN";
    }


    return new Intl.DateTimeFormat(
        locale,
        {
            weekday: "long"
        }
    ).format(date);
}


/* ================= APPLY LANGUAGE ================= */

function applyHomeLanguage(){

    /*
       IMPORTANT:
       প্রতিবার localStorage থেকে নতুন Language নেওয়া হচ্ছে।
    */

    const lang =
        getHomeLanguage();


    const t =
        HOME_TEXT[lang] ||
        HOME_TEXT.bn;


    /* HTML LANGUAGE */

    document.documentElement.lang =
        lang;


    /* TITLE */

    document.title =

        lang === "bn"
        ? "ইবাদত"

        : lang === "hi"
        ? "इबादत"

        : "IBADAT";


    /* FEATURES */

    setText(
        "namaz",
        t.features.namaz
    );

    setText(
        "quran",
        t.features.quran
    );

    setText(
        "dua",
        t.features.dua
    );

    setText(
        "hadith",
        t.features.hadith
    );

    setText(
        "qibla",
        t.features.qibla
    );

    setText(
        "tasbih",
        t.features.tasbih
    );


    /* BOTTOM */

    setText(
        "bottomText",
        t.bottom
    );


    /* BISMILLAH MEANING */

    setText(

        "bismillahMeaning",

        lang === "bn"

        ? "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে"

        : lang === "hi"

        ? "अत्यंत कृपाशील और दयालु अल्लाह के नाम से"

        : "In the name of Allah, the Most Gracious, the Most Merciful"
    );


    /* PRAYER GRID */

    updatePrayerGrid();


    /* DAY + DATE */

    updateToday();


    /*
       Prayer status থাকলে
       Current / Next language-ও সঙ্গে সঙ্গে বদলাবে।
    */

    if(
        Object.keys(prayerTimes).length > 0
    ){

        updateStatus();
    }


    /*
       Language পরিবর্তন হলে city-ও
       নতুন ভাষায় reverse geocode হবে।
    */

    if(
        latitude !== null &&
        longitude !== null
    ){

        reverseLocation();

        loadWeather();
    }
}


/* ================= SAFE TEXT ================= */

function setText(id,text){

    const el =
        document.getElementById(id);


    if(el){

        el.innerText = text;
    }
}


/* ================= PRAYER GRID ================= */

function updatePrayerGrid(){

    const grid =
        document.getElementById(
            "prayerGrid"
        );


    if(!grid){

        return;
    }


    const lang =
        getHomeLanguage();


    const t =
        HOME_TEXT[lang] ||
        HOME_TEXT.bn;


    grid.innerHTML = "";


    ALL_TIMES.forEach(name => {

        const box =
            document.createElement(
                "div"
            );


        box.className =
            "prayer-box";


        if(name === "Sunrise"){

            box.classList.add(
                "sunrise-box"
            );
        }


        box.innerHTML = `

            <div>
                ${t.prayers[name]}
            </div>

            <div>
                ${formatTime(
                    prayerTimes[name]
                )}
            </div>

        `;


        /* SUNRISE → SETTINGS */

        if(name === "Sunrise"){

            box.onclick = function(){

                window.location.href =
                    "html/settings.html";
            };
        }


        grid.appendChild(box);

    });
}


/* ================= STATUS ================= */

function updateStatus(){

    const lang =
        getHomeLanguage();


    const t =
        HOME_TEXT[lang] ||
        HOME_TEXT.bn;


    const now =
        new Date();


    /* LIVE CLOCK */

    setText(
        "clock",
        formatClock(now)
    );


    /* DAY */

    setText(
        "todayDay",
        formatDay(now)
    );


    /* DATE */

    setText(
        "date",
        formatDate(now)
    );


    /* GET PRAYER MINUTES */

    const times = {};


    ALL_TIMES.forEach(name => {

        const min =
            timeToMinutes(
                prayerTimes[name]
            );


        if(min !== null){

            times[name] = min;
        }
    });


    if(
        Object.keys(times).length === 0
    ){

        return;
    }


    const nowMinutes =

        now.getHours() * 60 +

        now.getMinutes() +

        now.getSeconds() / 60;


    /* ================= NEXT EVENT ================= */

    let nextName = null;

    let nextMinutes = null;


    for(
        const name of ALL_TIMES
    ){

        if(
            times[name] > nowMinutes
        ){

            nextName =
                name;

            nextMinutes =
                times[name];

            break;
        }
    }


    /* AFTER ISHA → NEXT DAY FAJR */

    if(!nextName){

        nextName =
            "Fajr";

        nextMinutes =
            times.Fajr + 1440;
    }


    /* ================= CURRENT TIME ================= */

    let currentName = null;


    /* Fajr → Sunrise */

    if(

        times.Fajr !== undefined &&

        times.Sunrise !== undefined &&

        nowMinutes >= times.Fajr &&

        nowMinutes < times.Sunrise

    ){

        currentName =
            "Fajr";
    }


    /* Sunrise → Dhuhr */

    else if(

        times.Sunrise !== undefined &&

        times.Dhuhr !== undefined &&

        nowMinutes >= times.Sunrise &&

        nowMinutes < times.Dhuhr

    ){

        currentName =
            "Sunrise";
    }


    /* Dhuhr → Asr */

    else if(

        times.Dhuhr !== undefined &&

        times.Asr !== undefined &&

        nowMinutes >= times.Dhuhr &&

        nowMinutes < times.Asr

    ){

        currentName =
            "Dhuhr";
    }


    /* Asr → Maghrib */

    else if(

        times.Asr !== undefined &&

        times.Maghrib !== undefined &&

        nowMinutes >= times.Asr &&

        nowMinutes < times.Maghrib

    ){

        currentName =
            "Asr";
    }


    /* Maghrib → Isha */

    else if(

        times.Maghrib !== undefined &&

        times.Isha !== undefined &&

        nowMinutes >= times.Maghrib &&

        nowMinutes < times.Isha

    ){

        currentName =
            "Maghrib";
    }


    /* Isha → Fajr */

    else if(

        times.Isha !== undefined &&

        nowMinutes >= times.Isha

    ){

        currentName =
            "Isha";
    }


    /* Fajr-এর আগে */

    else{

        currentName =
            null;
    }


    /* ================= CURRENT DISPLAY ================= */

    if(currentName){

    setText(
        "currentPrayerName",

        "🟢 : " +
        t.prayers[currentName]
    );

}else{

    setText(
        "currentPrayerName",

        "🟢 : " +
        t.noPrayer
    );
    }


    /* ================= NEXT ACTUAL PRAYER ================= */

    let nextPrayerName =
        null;


    for(
        const name of ACTUAL_PRAYERS
    ){

        if(
            times[name] > nowMinutes
        ){

            nextPrayerName =
                name;

            break;
        }
    }


    /* Next day Fajr */

    if(!nextPrayerName){

        nextPrayerName =
            "Fajr";
    }


    setText(

    "nextPrayerName",

    "⏭️ : " +
    t.prayers[nextPrayerName]
);


   /* ================= COUNTDOWN ================= */

    let nowSeconds =

        now.getHours() * 3600 +

        now.getMinutes() * 60 +

        now.getSeconds();


    let targetSeconds =

        nextMinutes * 60;


    let diff =

        targetSeconds -
        nowSeconds;


    if(diff < 0){

        diff +=
            24 * 60 * 60;
    }


    const hours =
        Math.floor(
            diff / 3600
        );


    const minutes =
        Math.floor(
            (diff % 3600) / 60
        );


    const seconds =
        diff % 60;


    const countdown =

        localNumber(

            String(hours).padStart(2,"0") +
            ":" +
            String(minutes).padStart(2,"0") +
            ":" +
            String(seconds).padStart(2,"0")
        );


    setText(
        "countdown",
        countdown
    );


    /* AZAN */

    checkAzan(
        now,
        times
    );
}


/* ================= AZAN FILES ================= */

const HOME_AZAN_FILES = {

    makkah:
        "assets/makkah.mp3",

    madinah:
        "assets/madinah.mp3",

    kuwait:
        "assets/kuwait.mp3",

    bangladesh:
        "assets/bangladesh.mp3",

    alaska:
        "assets/alaska.mp3"
};


let homeAudio =
    new Audio();


/* ================= AZAN CHECK ================= */

function checkAzan(
    now,
    times
){

    const s =
        homeSettings();


    const prayerMap = {

        Fajr:
            "fajr",

        Dhuhr:
            "dhuhr",

        Asr:
            "asr",

        Maghrib:
            "maghrib",

        Isha:
            "isha"
    };


    const minuteNow =

        now.getHours() * 60 +

        now.getMinutes();


    const today =
        dateKey(now);


    ACTUAL_PRAYERS.forEach(
        prayer => {

            if(
                times[prayer] === undefined
            ){

                return;
            }


            if(
                times[prayer] !== minuteNow
            ){

                return;
            }


            const key =

                today +
                "-" +
                prayer;


            if(
                lastAzanKey === key
            ){

                return;
            }


            lastAzanKey =
                key;


            const selected =

                s.azan &&
                s.azan[
                    prayerMap[prayer]
                ]

                ? s.azan[
                    prayerMap[prayer]
                ]

                : "makkah";


            const file =
                HOME_AZAN_FILES[
                    selected
                ];


            if(!file){

                return;
            }


            homeAudio.pause();


            homeAudio.src =
                file;


            homeAudio.currentTime =
                0;


            homeAudio.play()
                .catch(() => {

                    /*
                       Browser autoplay
                       policy may block audio.
                    */
                });

        }
    );
}


/* ================= WEATHER ================= */

async function loadWeather(){

    const weatherEl =
        document.getElementById(
            "weather"
        );


    if(
        !weatherEl ||
        latitude === null ||
        longitude === null
    ){

        return;
    }


    try{

        const url =

            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;


        const res =
            await fetch(url);


        const data =
            await res.json();


        if(
            !data.current
        ){

            return;
        }


        const temp =

            Math.round(
                data.current.temperature_2m
            );


        const code =
            data.current.weather_code;


        const lang =
            getHomeLanguage();


        const t =
            HOME_TEXT[lang] ||
            HOME_TEXT.bn;


        let condition =
            t.clear;


        let icon =
            "☀️";


        if(
            code >= 1 &&
            code <= 3
        ){

            condition =
                t.cloudy;

            icon =
                "⛅";
        }


        if(
            code >= 51
        ){

            condition =
                t.rain;

            icon =
                "🌧️";
        }


        let unit = "°C";

if(lang === "bn"){
    unit = "°সে";
}

if(lang === "hi"){
    unit = "°से";
}

setText(
    "weather",
    `${icon} ${localNumber(temp)}${unit}`
);


        const weatherTitle =
            document.getElementById(
                "weather"
            );


        if(weatherTitle){

            weatherTitle.title =
                condition;
        }


    }catch(e){

        setText(
            "weather",
            "--"
        );
    }
}


/* ================= LOCATION ================= */

async function loadLocation(){

    if(
        !navigator.geolocation
    ){

        setText(

            "city",

            HOME_TEXT[
                getHomeLanguage()
            ].locationError
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        async position => {

            latitude =
                position.coords.latitude;


            longitude =
                position.coords.longitude;


            await reverseLocation();


            await loadPrayerTimes();


            loadWeather();
        },


        () => {

            setText(

                "city",

                HOME_TEXT[
                    getHomeLanguage()
                ].locationError
            );

        },


        {

            enableHighAccuracy:
                true,

            timeout:
                15000,

            maximumAge:
                300000
        }
    );
}


/* ================= REVERSE LOCATION ================= */

async function reverseLocation(){

    if(
        latitude === null ||
        longitude === null
    ){

        return;
    }


    try{

        const lang =
            getHomeLanguage();


        const url =

            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${lang}`;


        const res =
            await fetch(url);


        const data =
            await res.json();


        let city =

            data.city ||

            data.locality ||

            data.principalSubdivision ||

            "";


        if(!city){

            city =
                data.countryName ||
                "";
        }


        if(city){

            setText(
                "city",
                city
            );
        }


    }catch(e){

        setText(

            "city",

            HOME_TEXT[
                getHomeLanguage()
            ].locationError
        );
    }
}


/* ================= PRAYER API ================= */

async function loadPrayerTimes(){

    if(
        latitude === null ||
        longitude === null
    ){

        return;
    }


    try{

        const today =
            new Date();


        const date =

            String(
                today.getDate()
            ).padStart(2,"0") +

            "-" +

            String(
                today.getMonth() + 1
            ).padStart(2,"0") +

            "-" +

            today.getFullYear();


        const url =

            `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=1`;


        const res =
            await fetch(url);


        const data =
            await res.json();


        if(
            !data.data ||
            !data.data.timings
        ){

            return;
        }


        prayerTimes =
            data.data.timings;


        /* LOCATION TIMEZONE */

        if(
            data.data.meta &&
            data.data.meta.timezone
        ){

            locationTimezone =
                data.data.meta.timezone;
        }


        currentDateKey =
            dateKey(today);


        updatePrayerGrid();

        updateStatus();


    }catch(e){

        console.error(
            "Prayer API error:",
            e
        );
    }
}


/* ================= TODAY ================= */

function updateToday(){

    const now =
        new Date();


    setText(
        "todayDay",
        formatDay(now)
    );


    setText(
        "date",
        formatDate(now)
    );
}


/* ================= NAVIGATION ================= */

function setupNavigation(){

    const routes = {

        namaz:
            "html/namaz-guide.html",

        quran:
            "html/quran.html",

        dua:
            "html/dua.html",

        hadith:
            "html/hadith.html",

        qibla:
            "html/qibla.html",

        tasbih:
            "html/tasbih.html"
    };


    Object.keys(routes).forEach(
        id => {

            const el =
                document.getElementById(
                    id
                );


            if(el){

                el.onclick = () => {

                    window.location.href =
                        routes[id];
                };
            }
        }
    );


    /* ================= BISMILLAH ================= */

    const bismillah =
        document.getElementById(
            "bismillahCard"
        );


    if(bismillah){

        bismillah.style.cursor =
            "pointer";


        bismillah.onclick = () => {

            window.location.href =
                "html/allah-names.html";
        };
    }


    /* ================= STATUS → CALENDAR ================= */

    const cards =
        document.querySelectorAll(
            ".card"
        );


    cards.forEach(card => {

        if(
            card.querySelector(
                ".status"
            )
        ){

            card.style.cursor =
                "pointer";


            card.onclick = () => {

                window.location.href =
                    "html/calendar.html";
            };
        }
    });
}


/* ================= MIDNIGHT REFRESH ================= */

function checkNewDay(){

    const todayKey =
        dateKey(
            new Date()
        );


    if(
        todayKey !== currentDateKey
    ){

        loadPrayerTimes();

        updateToday();
    }
}


/* ================= LANGUAGE SYNC ================= */

function syncHomeLanguage(){

    const currentLanguage =
        getHomeLanguage();


    /*
       প্রথমবার current language save করা
    */

    if(
        lastHomeLanguage === null
    ){

        lastHomeLanguage =
            currentLanguage;

        return;
    }


    /*
       Settings page থেকে language
       পরিবর্তন হয়েছে কি না।
    */

    if(
        currentLanguage !==
        lastHomeLanguage
    ){

        lastHomeLanguage =
            currentLanguage;


        /*
           সম্পূর্ণ Home UI নতুন
           language অনুযায়ী refresh
        */

        applyHomeLanguage();
    }
}


/* ================= START ================= */

function startHome(){

    /*
       Home শুরু হওয়ার সময়
       সরাসরি localStorage থেকে
       language নেওয়া হবে।
    */

    lastHomeLanguage =
        getHomeLanguage();


    applyHomeLanguage();

    updateToday();

    setupNavigation();

    loadLocation();


    /*
       প্রতি ১ সেকেন্ডে:

       - Language
       - Clock
       - Current
       - Next
       - Countdown
       - Azan
       - Date
    */

    setInterval(() => {

        syncHomeLanguage();

        updateToday();

        updateStatus();

        checkNewDay();

    },1000);
}


/* ================= INIT ================= */

document.addEventListener(
    "DOMContentLoaded",
    startHome
);
