/* =========================================================
   IBADAT HOME - FINAL VERSION
   SHARED LOCATION SYSTEM
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

        bottom:
            "আল্লাহকে স্মরণ করুন — নামাজ কায়েম করুন"
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

        bottom:
            "Remember Allah — Establish Prayer"
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

        bottom:
            "अल्लाह को याद करें — नमाज़ कायम करें"
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


/* ================= SHARED LOCATION ================= */

const IBADAT_LOCATION_KEY =
    "IBADAT_LOCATION";


/* ================= STATE ================= */

let prayerTimes = {};

let currentDateKey = "";

let lastAzanKey = "";

let latitude = null;

let longitude = null;

let locationTimezone = null;

let lastHomeLanguage = null;


/* ================= SETTINGS ================= */

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
            localStorage.getItem(
                "appSettings"
            );


        if(!saved){

            return defaultSettings;
        }


        const obj =
            JSON.parse(saved);


        if(
            !obj ||
            typeof obj !== "object"
        ){

            return defaultSettings;
        }


        if(
            obj.lang !== "bn" &&
            obj.lang !== "en" &&
            obj.lang !== "hi"
        ){

            obj.lang = "bn";
        }


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


/* ================= LANGUAGE ================= */

function getHomeLanguage(){

    try{

        const saved =
            localStorage.getItem(
                "appSettings"
            );


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


/* ================= NUMBER ================= */

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

        locale =
            "en-US";
    }


    if(lang === "hi"){

        locale =
            "hi-IN-u-nu-deva";
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

        locale =
            "en-US";
    }


    if(lang === "hi"){

        locale =
            "hi-IN";
    }


    return new Intl.DateTimeFormat(
        locale,
        {
            weekday: "long"
        }
    ).format(date);
}


/* ================= SAFE TEXT ================= */

function setText(id,text){

    const el =
        document.getElementById(id);


    if(el){

        el.innerText =
            text;
    }
}


/* =========================================================
   SHARED LOCATION SAVE
   ========================================================= */

function saveSharedLocation(
    lat,
    lon,
    city
){

    try{

        const locationData = {

            latitude:
                Number(lat),

            longitude:
                Number(lon),

            city:
                city || "",

            updatedAt:
                Date.now()
        };


        localStorage.setItem(

            IBADAT_LOCATION_KEY,

            JSON.stringify(
                locationData
            )
        );

    }catch(e){

        console.error(
            "Shared location save error:",
            e
        );
    }
}


/* =========================================================
   SHARED LOCATION READ
   ========================================================= */

function getSharedLocation(){

    try{

        const saved =
            localStorage.getItem(
                IBADAT_LOCATION_KEY
            );


        if(!saved){

            return null;
        }


        const data =
            JSON.parse(saved);


        if(
            !data ||
            typeof data.latitude !== "number" ||
            typeof data.longitude !== "number"
        ){

            return null;
        }


        return data;


    }catch(e){

        return null;
    }
}


/* ================= APPLY LANGUAGE ================= */

function applyHomeLanguage(){

    const lang =
        getHomeLanguage();


    const t =
        HOME_TEXT[lang] ||
        HOME_TEXT.bn;


    document.documentElement.lang =
        lang;


    document.title =

        lang === "bn"
        ? "ইবাদত"

        : lang === "hi"
        ? "इबादत"

        : "IBADAT";


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


    setText(

        "bismillahMeaning",

        lang === "bn"

        ? "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে"

        : lang === "hi"

        ? "अत्यंत कृपाशील और दयालु अल्लाह के नाम से"

        : "In the name of Allah, the Most Gracious, the Most Merciful"
    );


    updatePrayerGrid();

    updateToday();


    if(
        Object.keys(prayerTimes).length > 0
    ){

        updateStatus();
    }


    if(
        latitude !== null &&
        longitude !== null
    ){

        reverseLocation();

        loadWeather();
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


    setText(
        "clock",
        formatClock(now)
    );


    setText(
        "todayDay",
        formatDay(now)
    );


    setText(
        "date",
        formatDate(now)
    );


    const times = {};


    ALL_TIMES.forEach(name => {

        const min =
            timeToMinutes(
                prayerTimes[name]
            );


        if(min !== null){

            times[name] =
                min;
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


    if(!nextName){

        nextName =
            "Fajr";

        nextMinutes =
            times.Fajr + 1440;
    }


    let currentName = null;


    if(

        times.Fajr !== undefined &&

        times.Sunrise !== undefined &&

        nowMinutes >= times.Fajr &&

        nowMinutes < times.Sunrise

    ){

        currentName =
            "Fajr";
    }


    else if(

        times.Sunrise !== undefined &&

        times.Dhuhr !== undefined &&

        nowMinutes >= times.Sunrise &&

        nowMinutes < times.Dhuhr

    ){

        currentName =
            "Sunrise";
    }


    else if(

        times.Dhuhr !== undefined &&

        times.Asr !== undefined &&

        nowMinutes >= times.Dhuhr &&

        nowMinutes < times.Asr

    ){

        currentName =
            "Dhuhr";
    }


    else if(

        times.Asr !== undefined &&

        times.Maghrib !== undefined &&

        nowMinutes >= times.Asr &&

        nowMinutes < times.Maghrib

    ){

        currentName =
            "Asr";
    }


    else if(

        times.Maghrib !== undefined &&

        times.Isha !== undefined &&

        nowMinutes >= times.Maghrib &&

        nowMinutes < times.Isha

    ){

        currentName =
            "Maghrib";
    }


    else if(

        times.Isha !== undefined &&

        nowMinutes >= times.Isha

    ){

        currentName =
            "Isha";
    }


    else{

        currentName =
            null;
    }


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


    if(!nextPrayerName){

        nextPrayerName =
            "Fajr";
    }


    setText(

        "nextPrayerName",

        "⏭️ : " +
        t.prayers[nextPrayerName]
    );


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


/*
   Azan trigger window.

   Exact minute-এর বদলে prayer time পার হওয়ার
   পর কয়েক মিনিটের মধ্যে check করা হবে।
   এতে timer/background/API delay-এর কারণে
   Azan miss হওয়ার সম্ভাবনা কমবে।
*/

const AZAN_TRIGGER_WINDOW_SECONDS =
    180;


/* =========================================================
   AZAN KEY
   ========================================================= */

function getAzanStorageKey(){

    return "IBADAT_LAST_AZAN_KEY";
}


/* =========================================================
   AZAN CHECK
   ========================================================= */

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


    const nowSeconds =

        now.getHours() * 3600 +

        now.getMinutes() * 60 +

        now.getSeconds();


    const today =
        dateKey(now);


    ACTUAL_PRAYERS.forEach(
        prayer => {

            if(
                times[prayer] === undefined
            ){

                return;
            }


            const prayerMinutes =
                times[prayer];


            const prayerSeconds =
                prayerMinutes * 60;


            const elapsed =
                nowSeconds -
                prayerSeconds;


            /*
               Prayer time এখনো আসেনি।
            */

            if(elapsed < 0){

                return;
            }


            /*
               Prayer time অনেকক্ষণ আগে হয়ে গেলে
               Azan আর বাজানো হবে না।
            */

            if(
                elapsed >
                AZAN_TRIGGER_WINDOW_SECONDS
            ){

                return;
            }


            const key =

                today +
                "-" +
                prayer;


            /*
               প্রথমে memory check।
            */

            if(
                lastAzanKey === key
            ){

                return;
            }


            /*
               Page reload হলেও একই prayer-এর
               Azan যেন আবার না বাজে।
            */

            try{

                const savedKey =
                    sessionStorage.getItem(
                        getAzanStorageKey()
                    );


                if(
                    savedKey === key
                ){

                    lastAzanKey =
                        key;

                    return;
                }

            }catch(e){

                /* sessionStorage না থাকলেও
                   Azan system চলবে */
            }


            /*
               Azan key আগে থেকেই mark করা হচ্ছে।
               ফলে একই মুহূর্তে একাধিকবার
               check হলেও duplicate হবে না।
            */

            lastAzanKey =
                key;


            try{

                sessionStorage.setItem(

                    getAzanStorageKey(),

                    key
                );

            }catch(e){

                /* storage error হলে
                   audio বন্ধ হবে না */
            }


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


            /*
               আগের audio বন্ধ করে
               নতুন Azan শুরু।
            */

            try{

                homeAudio.pause();

                homeAudio.currentTime =
                    0;

                homeAudio.src =
                    file;

                homeAudio.load();


                const playPromise =
                    homeAudio.play();


                if(
                    playPromise &&
                    typeof playPromise.catch ===
                    "function"
                ){

                    playPromise.catch(
                        error => {

                            console.warn(
                                "Azan playback blocked:",
                                error
                            );
                        }
                    );
                }

            }catch(e){

                console.warn(
                    "Azan playback error:",
                    e
                );
            }

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


        let unit =
            "°C";


        if(lang === "bn"){

            unit =
                "°সে";
        }


        if(lang === "hi"){

            unit =
                "°से";
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


/* =========================================================
   LOCATION
   ========================================================= */

async function loadLocation(){

    if(!navigator.geolocation){

        setText(

            "city",

            HOME_TEXT[
                getHomeLanguage()
            ].locationError
        );

        return;
    }


    /*
       Fresh GPS location নেওয়া হবে।
       পুরোনো cached GPS ব্যবহার করা হবে না।
    */

    navigator.geolocation.getCurrentPosition(

        async position => {

            latitude =
                position.coords.latitude;


            longitude =
                position.coords.longitude;


            /*
               প্রথমে coordinate save
               করা হচ্ছে।
            */

            saveSharedLocation(
                latitude,
                longitude,
                ""
            );


            /*
               তারপর একই coordinate থেকে
               city বের করা হবে।
            */

            await reverseLocation();


            /*
               Prayer time-ও একই GPS
               coordinate ব্যবহার করবে।
            */

            await loadPrayerTimes();


            /*
               Weather-ও একই coordinate।
            */

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
            getHomeLanguage();


        const url =

            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${lang}`;


        const res =
            await fetch(url);


        if(!res.ok){

            throw new Error(
                "Reverse geocoding failed"
            );
        }


        const data =
            await res.json();


        /*
           ছোট locality আগে।
           যাতে Baranagar-এর মতো
           actual local area পাওয়া যায়।
        */

        let city =

            data.locality ||

            data.city ||

            data.district ||

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


            /*
               City-সহ একই GPS data
               Qibla-এর জন্য save করা হচ্ছে।
            */

            saveSharedLocation(

                latitude,

                longitude,

                city
            );
        }


    }catch(e){

        /*
           Reverse geocode না হলেও
           GPS coordinate হারাবে না।
        */

        saveSharedLocation(

            latitude,

            longitude,

            ""
        );


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


    if(
        lastHomeLanguage === null
    ){

        lastHomeLanguage =
            currentLanguage;

        return;
    }


    if(
        currentLanguage !==
        lastHomeLanguage
    ){

        lastHomeLanguage =
            currentLanguage;


        applyHomeLanguage();
    }
}


/* =========================================================
   PAGE VISIBILITY / RESUME
   ========================================================= */

function handleHomeResume(){

    /*
       Browser/app background থেকে ফিরে এলে
       সঙ্গে সঙ্গে prayer status এবং Azan
       আবার check করা হবে।
    */

    if(
        Object.keys(prayerTimes).length > 0
    ){

        updateStatus();
    }
}


/* ================= START ================= */

function startHome(){

    lastHomeLanguage =
        getHomeLanguage();


    applyHomeLanguage();

    updateToday();

    setupNavigation();

    loadLocation();


    setInterval(() => {

        syncHomeLanguage();

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
