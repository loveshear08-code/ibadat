/* =========================================================
   IBADAT HOME - FINAL
   PART 1
   ========================================================= */


/* ================= LANGUAGE ================= */

const HOME_TEXT = {

    bn: {
        noPrayer: "এখন কোনো ওয়াক্ত নয়",
        locationError: "লোকেশন পাওয়া যায়নি",

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

        bottom:
            "আল্লাহকে স্মরণ করুন — নামাজ কায়েম করুন"
    },

    en: {
        noPrayer: "No Prayer",

        locationError:
            "Location unavailable",

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

        bottom:
            "Remember Allah — Establish Prayer"
    },

    hi: {
        noPrayer:
            "अभी कोई नमाज़ नहीं",

        locationError:
            "स्थान उपलब्ध नहीं",

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

        bottom:
            "अल्लाह को याद करें — नमाज़ कायम करें"
    }
};


/* ================= STATE ================= */

let prayerTimes = {};

let latitude = null;
let longitude = null;

let currentDateKey = "";

let lastLanguage = null;


/* ================= CONSTANTS ================= */

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


/* ================= SETTINGS ================= */

function getSettings(){

    try{

        const saved =
            localStorage.getItem(
                "appSettings"
            );

        if(saved){

            return JSON.parse(saved);
        }

    }catch(e){}

    return {

        lang: "bn"
    };
}


/* ================= LANGUAGE ================= */

function getLanguage(){

    const settings =
        getSettings();

    return settings.lang || "bn";
}


/* ================= TEXT ================= */

function setText(id,text){

    const el =
        document.getElementById(id);

    if(el){

        el.textContent =
            text;
    }
}


/* ================= LOCAL NUMBER ================= */

function localNumber(value){

    const lang =
        getLanguage();

    if(lang === "bn"){

        return String(value)
            .replace(/\d/g,
            d => "০১২৩৪৫৬৭৮৯"[d]);
    }

    if(lang === "hi"){

        return String(value)
            .replace(/\d/g,
            d => "०१२३४५६७८९"[d]);
    }

    return String(value);
}


/* ================= DATE KEY ================= */

function dateKey(date){

    return (

        date.getFullYear() +
        "-" +

        String(
            date.getMonth()+1
        ).padStart(2,"0") +

        "-" +

        String(
            date.getDate()
        ).padStart(2,"0")
    );
}


/* ================= DATE ================= */

function formatDate(date){

    const lang =
        getLanguage();

    let locale =
        "bn-BD";

    if(lang==="en")
        locale="en-US";

    if(lang==="hi")
        locale="hi-IN";

    return new Intl.DateTimeFormat(

        locale,

        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }

    ).format(date);
}


/* ================= DAY ================= */

function formatDay(date){

    const lang =
        getLanguage();

    let locale =
        "bn-BD";

    if(lang==="en")
        locale="en-US";

    if(lang==="hi")
        locale="hi-IN";

    return new Intl.DateTimeFormat(

        locale,

        {
            weekday:"long"
        }

    ).format(date);
}


/* ================= CLOCK ================= */

function formatClock(date){

    const result =

        String(
            date.getHours()
        ).padStart(2,"0")

        + ":"

        + String(
            date.getMinutes()
        ).padStart(2,"0")

        + ":"

        + String(
            date.getSeconds()
        ).padStart(2,"0");

    return localNumber(result);
}


/* =========================================================
   LANGUAGE
   ========================================================= */


/* ================= APPLY LANGUAGE ================= */

function applyLanguage(){

    const lang =
        getLanguage();

    const t =
        HOME_TEXT[lang] ||
        HOME_TEXT.bn;


    document.documentElement.lang =
        lang;


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

    setText(
        "bottomText",
        t.bottom
    );


    const meaning =

        lang === "bn"

        ? "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে"

        : lang === "hi"

        ? "अत्यंत कृपालु और दयालु अल्लाह के नाम से"

        : "In the name of Allah, the Most Gracious, the Most Merciful";


    setText(
        "bismillahMeaning",
        meaning
    );


    updatePrayerGrid();
}


/* ================= TIME FORMAT ================= */

function formatTime(time){

    if(!time){

        return "--:--";
    }

    const clean =
        String(time)
        .split(" ")[0];

    const parts =
        clean.split(":");

    if(parts.length < 2){

        return clean;
    }

    const result =

        parts[0]
        .padStart(2,"0")

        + ":"

        + parts[1]
        .padStart(2,"0");

    return localNumber(
        result
    );
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
        getLanguage();

    const t =
        HOME_TEXT[lang];

    grid.innerHTML = "";


    ALL_TIMES.forEach(name => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "prayer-box";

        card.innerHTML =

            `<div>
                ${t.prayers[name]}
            </div>

            <div>
                ${formatTime(
                    prayerTimes[name]
                )}
            </div>`;

        grid.appendChild(
            card
        );
    });
}


/* =========================================================
   LOCATION
   ========================================================= */

async function loadLocation(){

    if(
        !navigator.geolocation
    ){

        setText(
            "city",
            HOME_TEXT[
                getLanguage()
            ].locationError
        );

        return;
    }


    navigator.geolocation
    .getCurrentPosition(

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
                    getLanguage()
                ].locationError
            );
        },

        {

            enableHighAccuracy:
                true,

            timeout:
                20000,

            maximumAge:
                0
        }
    );
}


/* =========================================================
   REVERSE LOCATION
   ========================================================= */

async function reverseLocation(){

    if(
        latitude === null ||
        longitude === null
    ){

        return;
    }

    try{

        const lang =
            getLanguage();

        const url =

            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${lang}`;

        const res =
            await fetch(url);

        const data =
            await res.json();


        let city =

            data.locality ||

            data.city ||

            data.district ||

            data.principalSubdivision ||

            data.countryName ||

            "";


        setText(
            "city",
            city
        );

    }catch(e){

        setText(

            "city",

            HOME_TEXT[
                getLanguage()
            ].locationError
        );
    }
}


/* =========================================================
   WEATHER
   ========================================================= */

async function loadWeather(){

    if(
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
                data.current
                .temperature_2m
            );

        let icon =
            "☀️";

        const code =
            data.current
            .weather_code;

        if(
            code >= 1 &&
            code <= 3
        ){

            icon = "⛅";
        }

        if(
            code >= 51
        ){

            icon = "🌧️";
        }

        setText(

            "weather",

            `${icon} ${localNumber(temp)}°`
        );

    }catch(e){

        setText(
            "weather",
            "--"
        );
    }
}


/* =========================================================
   PRAYER API
   ========================================================= */


/* ================= TIME TO MINUTES ================= */

function timeToMinutes(time){

    if(!time){

        return null;
    }

    const clean =
        String(time)
        .split(" ")[0];

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


/* =========================================================
   PRAYER API
   ========================================================= */

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
            ).padStart(2,"0")

            + "-"

            + String(
                today.getMonth()+1
            ).padStart(2,"0")

            + "-"

            + today.getFullYear();


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

        currentDateKey =
            dateKey(today);

        updatePrayerGrid();

        updateStatus();

    }catch(e){

        console.error(
            "Prayer API Error",
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


/* =========================================================
   STATUS CARD
   ========================================================= */

function updateStatus(){

    const lang =
        getLanguage();

    const t =
        HOME_TEXT[lang];

    const now =
        new Date();


    setText(
        "clock",
        formatClock(now)
    );


    const times = {};


    ALL_TIMES.forEach(name => {

        const min =
            timeToMinutes(
                prayerTimes[name]
            );

        if(
            min !== null
        ){

            times[name] = min;
        }
    });


    if(
        Object.keys(times).length === 0
    ){

        return;
    }


    const nowMinutes =

        now.getHours()*60 +

        now.getMinutes() +

        now.getSeconds()/60;


    let currentPrayer =
        null;

    let nextPrayer =
        null;

    let nextMinutes =
        null;


    if(
        nowMinutes >= times.Fajr &&
        nowMinutes < times.Sunrise
    ){

        currentPrayer =
            "Fajr";
    }

    else if(
        nowMinutes >= times.Dhuhr &&
        nowMinutes < times.Asr
    ){

        currentPrayer =
            "Dhuhr";
    }

    else if(
        nowMinutes >= times.Asr &&
        nowMinutes < times.Maghrib
    ){

        currentPrayer =
            "Asr";
    }

    else if(
        nowMinutes >= times.Maghrib &&
        nowMinutes < times.Isha
    ){

        currentPrayer =
            "Maghrib";
    }

    else if(
        nowMinutes >= times.Isha
    ){

        currentPrayer =
            "Isha";
    }


    for(
        const prayer of
        ACTUAL_PRAYERS
    ){

        if(
            times[prayer] >
            nowMinutes
        ){

            nextPrayer =
                prayer;

            nextMinutes =
                times[prayer];

            break;
        }
    }


    if(
        !nextPrayer
    ){

        nextPrayer =
            "Fajr";

        nextMinutes =
            times.Fajr + 1440;
    }


    if(
        currentPrayer
    ){

        setText(

            "currentPrayerName",

            "🟢 : " +

            t.prayers[
                currentPrayer
            ]
        );

    }else{

        setText(

            "currentPrayerName",

            "🟢 : " +

            t.noPrayer
        );
    }


    setText(

        "nextPrayerName",

        "⏭️ : " +

        t.prayers[
            nextPrayer
        ]
    );


    let nowSeconds =

        now.getHours()*3600 +

        now.getMinutes()*60 +

        now.getSeconds();


    let targetSeconds =

        nextMinutes * 60;


    let diff =

        targetSeconds -
        nowSeconds;


    if(diff < 0){

        diff +=
            24*60*60;
    }


    const h =
        Math.floor(
            diff/3600
        );

    const m =
        Math.floor(
            (diff%3600)/60
        );

    const s =
        diff%60;


    const countdown =

        localNumber(

            String(h)
            .padStart(2,"0")

            + ":"

            + String(m)
            .padStart(2,"0")

            + ":"

            + String(s)
            .padStart(2,"0")
        );


    setText(
        "countdown",
        countdown
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


    Object.keys(routes)
    .forEach(id => {

        const el =
            document.getElementById(id);

        if(!el){

            return;
        }

        el.onclick = () => {

            window.location.href =
                routes[id];
        };

    });


    const bismillah =
        document.getElementById(
            "bismillahCard"
        );

    if(bismillah){

        bismillah.onclick = () => {

            window.location.href =
                "html/allah-names.html";
        };
    }


    const statusCard =
        document.querySelector(
            ".status-card"
        );

    if(statusCard){

        statusCard.onclick = () => {

            window.location.href =
                "html/calendar.html";
        };
    }
}


/* ================= LANGUAGE SYNC ================= */

function syncLanguage(){

    const current =
        getLanguage();

    if(
        lastLanguage === null
    ){

        lastLanguage =
            current;

        return;
    }


    if(
        current !==
        lastLanguage
    ){

        lastLanguage =
            current;

        applyLanguage();

        updateToday();

        updateStatus();

        loadWeather();
    }
}


/* ================= MIDNIGHT REFRESH ================= */

function checkNewDay(){

    const today =
        dateKey(
            new Date()
        );

    if(
        today !==
        currentDateKey
    ){

        currentDateKey =
            today;

        loadPrayerTimes();

        updateToday();
    }
}


/* ================= RESUME ================= */

function handleHomeResume(){

    updateToday();

    updateStatus();

    loadWeather();

    checkNewDay();
}


/* ================= START ================= */

function startHome(){

    lastLanguage =
        getLanguage();


    applyLanguage();

    updateToday();

    setupNavigation();

    loadLocation();


    setInterval(() => {

        syncLanguage();

        updateToday();

        updateStatus();

        checkNewDay();

    },1000);
}


/* ================= VISIBILITY ================= */

document.addEventListener(

    "visibilitychange",

    () => {

        if(
            document.visibilityState ===
            "visible"
        ){

            handleHomeResume();
        }
    }
);


/* ================= PAGE SHOW ================= */

window.addEventListener(

    "pageshow",

    () => {

        handleHomeResume();
    }
);


/* ================= INIT ================= */

document.addEventListener(

    "DOMContentLoaded",

    startHome
);
