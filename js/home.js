/* =========================================================
   IBADAT HOME - FINAL VERSION
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

/*
   Sunrise countdown-এর অংশ।
   কিন্তু Sunrise নামাজ নয় এবং Azan বাজাবে না।
*/

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

let latitude = 23.8103;
let longitude = 90.4125;


/* ================= SETTINGS ================= */

function homeSettings(){

    try{
        let s = localStorage.getItem("appSettings");

        if(!s){
            return {
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
        }

        let obj = JSON.parse(s);

        if(!obj.azan || typeof obj.azan !== "object"){
            obj.azan = {
                fajr: obj.azan || "makkah",
                dhuhr: "makkah",
                asr: "makkah",
                maghrib: "makkah",
                isha: "makkah"
            };
        }

        return obj;

    }catch(e){

        return {
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
    }
}


/* ================= LANGUAGE NUMBERS ================= */

function localNumber(value){

    const s = homeSettings();
    const lang = s.lang || "bn";

    if(lang === "bn"){
        return String(value).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
    }

    if(lang === "hi"){
        return String(value).replace(/\d/g, d => "०१२३४५६७८९"[d]);
    }

    return String(value);
}


/* ================= TIME ================= */

function formatClock(date){

    const s = homeSettings();

    let h = date.getHours();
    let m = date.getMinutes();
    let sec = date.getSeconds();

    let result =
        String(h).padStart(2,"0") + ":" +
        String(m).padStart(2,"0") + ":" +
        String(sec).padStart(2,"0");

    return localNumber(result);
}


function formatTime(time){

    if(!time) return "--:--";

    let clean = String(time).split(" ")[0];

    let parts = clean.split(":");

    if(parts.length < 2) return clean;

    let h = parseInt(parts[0],10);
    let m = parts[1];

    let result =
        String(h).padStart(2,"0") + ":" +
        String(m).padStart(2,"0");

    return localNumber(result);
}


/* ================= TIME TO MINUTES ================= */

function timeToMinutes(time){

    if(!time) return null;

    let clean = String(time).split(" ")[0];
    let p = clean.split(":");

    if(p.length < 2) return null;

    return parseInt(p[0],10) * 60 + parseInt(p[1],10);
}


/* ================= DATE ================= */

function dateKey(date){

    return date.getFullYear() + "-" +
           String(date.getMonth()+1).padStart(2,"0") + "-" +
           String(date.getDate()).padStart(2,"0");
}


/* ================= DATE FORMAT ================= */

function formatDate(date){

    const s = homeSettings();
    const lang = s.lang || "bn";

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    let locale = "bn-BD";

    if(lang === "en") locale = "en-US";
    if(lang === "hi") locale = "hi-IN";

    return new Intl.DateTimeFormat(locale, options).format(date);
}


/* ================= APPLY LANGUAGE ================= */

function applyHomeLanguage(){

    const s = homeSettings();
    const t = HOME_TEXT[s.lang] || HOME_TEXT.bn;

    document.title =
        s.lang === "bn" ? "ইবাদত" :
        s.lang === "hi" ? "इबादत" :
        "IBADAT";

    setText("namaz", t.features.namaz);
    setText("quran", t.features.quran);
    setText("dua", t.features.dua);
    setText("hadith", t.features.hadith);
    setText("qibla", t.features.qibla);
    setText("tasbih", t.features.tasbih);

    setText("bottomText", t.bottom);

    setText("bismillahMeaning",
        s.lang === "bn"
        ? "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে"
        : s.lang === "hi"
        ? "अत्यंत कृपाशील और दयालु अल्लाह के नाम से"
        : "In the name of Allah, the Most Gracious, the Most Merciful"
    );

    updatePrayerGrid();
}


/* ================= SAFE TEXT ================= */

function setText(id,text){

    const el = document.getElementById(id);

    if(el){
        el.innerText = text;
    }
}


/* ================= PRAYER GRID ================= */

function updatePrayerGrid(){

    const grid = document.getElementById("prayerGrid");

    if(!grid) return;

    const s = homeSettings();
    const t = HOME_TEXT[s.lang] || HOME_TEXT.bn;

    grid.innerHTML = "";

    ALL_TIMES.forEach(name => {

        const box = document.createElement("div");

        box.className = "prayer-box";

        if(name === "Sunrise"){
            box.classList.add("sunrise-box");
        }

        box.innerHTML = `
            <div>${t.prayers[name]}</div>
            <div>${formatTime(prayerTimes[name])}</div>
        `;

        /* Sunrise → Settings */

        if(name === "Sunrise"){

            box.onclick = function(){
                window.location.href = "html/settings.html";
            };

        }

        grid.appendChild(box);
    });
}


/* ================= STATUS ================= */

function updateStatus(){

    const s = homeSettings();
    const t = HOME_TEXT[s.lang] || HOME_TEXT.bn;

    const now = new Date();

    setText("clock", formatClock(now));

    const times = {};

    ALL_TIMES.forEach(name => {

        let min = timeToMinutes(prayerTimes[name]);

        if(min !== null){
            times[name] = min;
        }
    });

    if(Object.keys(times).length === 0) return;

    const nowMinutes =
        now.getHours() * 60 +
        now.getMinutes() +
        now.getSeconds()/60;


    /* ================= NEXT TIME ================= */

    let nextName = null;
    let nextMinutes = null;

    for(const name of ALL_TIMES){

        if(times[name] > nowMinutes){

            nextName = name;
            nextMinutes = times[name];

            break;
        }
    }

    /* Next day Fajr */

    if(!nextName){

        nextName = "Fajr";
        nextMinutes = times.Fajr + 1440;
    }


    /* ================= CURRENT PRAYER ================= */

    let currentName = null;

    /*
       Sunrise current prayer নয়।
       তাই Actual prayers দিয়েই Current নির্ধারণ হবে।
    */

    for(let i = ACTUAL_PRAYERS.length - 1; i >= 0; i--){

        const name = ACTUAL_PRAYERS[i];

        if(times[name] <= nowMinutes){

            currentName = name;
            break;
        }
    }

    /*
       যদি Fajr-এর আগে হয়,
       previous day's Isha technically current cycle-এর শেষ।
       কিন্তু UI-তে current prayer হিসেবে Isha দেখানো যেতে পারে।
    */

    if(!currentName){

        currentName = "Isha";
    }


    /* ================= NEXT DISPLAY ================= */

    setText(
        "currentPrayerName",
        t.current + ": " + t.prayers[currentName]
    );

    /*
       Countdown-এ Sunrise থাকবে।
    */

    setText(
        "nextPrayerName",
        t.next + ": " + t.prayers[nextName]
    );


    /* ================= COUNTDOWN ================= */

    let nowSeconds =
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds();

    let targetSeconds =
        nextMinutes * 60;

    let diff = targetSeconds - nowSeconds;

    if(diff < 0){
        diff += 24 * 60 * 60;
    }

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    const countdown =
        localNumber(
            String(hours).padStart(2,"0") + ":" +
            String(minutes).padStart(2,"0") + ":" +
            String(seconds).padStart(2,"0")
        );

    setText("countdown", countdown);

    checkAzan(now, times);
}


/* ================= AZAN FILES ================= */

const HOME_AZAN_FILES = {

    makkah: "assets/makkah.mp3",
    madinah: "assets/madinah.mp3",
    kuwait: "assets/kuwait.mp3",
    bangladesh: "assets/bangladesh.mp3",
    alaska: "assets/alaska.mp3"
};

let homeAudio = new Audio();


/* ================= AZAN CHECK ================= */

function checkAzan(now, times){

    const s = homeSettings();

    const prayerMap = {
        Fajr: "fajr",
        Dhuhr: "dhuhr",
        Asr: "asr",
        Maghrib: "maghrib",
        Isha: "isha"
    };

    const minuteNow =
        now.getHours() * 60 +
        now.getMinutes();

    const today = dateKey(now);

    ACTUAL_PRAYERS.forEach(prayer => {

        if(times[prayer] === undefined) return;

        if(times[prayer] !== minuteNow) return;

        const key = today + "-" + prayer;

        if(lastAzanKey === key) return;

        lastAzanKey = key;

        const selected =
            s.azan[prayerMap[prayer]] || "makkah";

        const file =
            HOME_AZAN_FILES[selected];

        if(!file) return;

        homeAudio.src = file;
        homeAudio.currentTime = 0;

        homeAudio.play().catch(() => {
            /*
               Browser autoplay policy may block
               background audio.
            */
        });

    });
}


/* ================= WEATHER ================= */

async function loadWeather(){

    const weatherEl = document.getElementById("weather");

    if(!weatherEl) return;

    try{

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;

        const res = await fetch(url);
        const data = await res.json();

        const temp =
            Math.round(data.current.temperature_2m);

        const code =
            data.current.weather_code;

        const s = homeSettings();
        const t = HOME_TEXT[s.lang] || HOME_TEXT.bn;

        let condition = t.clear;
        let icon = "☀️";

        if(code >= 1 && code <= 3){
            condition = t.cloudy;
            icon = "⛅";
        }

        if(code >= 51){
            condition = t.rain;
            icon = "🌧️";
        }

        setText(
            "weather",
            `${icon} ${localNumber(temp)}°C`
        );

        const weatherTitle =
            document.getElementById("weather");

        if(weatherTitle){
            weatherTitle.title = condition;
        }

    }catch(e){

        setText("weather","--");
    }
}


/* ================= CITY / LOCATION ================= */

async function loadLocation(){

    if(!navigator.geolocation){

        setText(
            "city",
            HOME_TEXT[homeSettings().lang].locationError
        );

        loadPrayerTimes();
        loadWeather();

        return;
    }

    navigator.geolocation.getCurrentPosition(

        async position => {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            await reverseLocation();

            loadPrayerTimes();
            loadWeather();
        },

        () => {

            loadPrayerTimes();
            loadWeather();
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}


/* ================= REVERSE LOCATION ================= */

async function reverseLocation(){

    try{

        const url =
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;

        const res = await fetch(url);
        const data = await res.json();

        if(data.results && data.results.length){

            const r = data.results[0];

            let city =
                r.name ||
                r.city ||
                r.town ||
                r.village ||
                "";

            setText("city", city);
        }

    }catch(e){

        setText("city","Kolkata");
    }
}

     /* ================= PRAYER API ================= */

async function loadPrayerTimes(){

    try{

        const today = new Date();

        const date =
            String(today.getDate()).padStart(2,"0") + "-" +
            String(today.getMonth()+1).padStart(2,"0") + "-" +
            today.getFullYear();

        const url =
            `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=1`;

        const res = await fetch(url);
        const data = await res.json();

        if(!data.data || !data.data.timings){

            return;
        }

        prayerTimes = data.data.timings;

        currentDateKey = dateKey(today);

        updatePrayerGrid();
        updateStatus();

    }catch(e){

        console.error("Prayer API error:",e);
    }
}


/* ================= TODAY ================= */

function updateToday(){

    const now = new Date();

    const s = homeSettings();
    const t = HOME_TEXT[s.lang] || HOME_TEXT.bn;

    const day =
        formatDate(now);

    setText("todayDay", day);
}


/* ================= NAVIGATION ================= */

function setupNavigation(){

    const routes = {

        namaz: "html/namaz-guide.html",
        quran: "html/quran.html",
        dua: "html/dua.html",
        hadith: "html/hadith.html",
        qibla: "html/qibla.html",
        tasbih: "html/tasbih.html"
    };

    Object.keys(routes).forEach(id => {

        const el = document.getElementById(id);

        if(el){

            el.onclick = () => {
                window.location.href = routes[id];
            };
        }
    });


    /* Bismillah → Allah Names */

    const bismillah =
        document.getElementById("bismillahCard");

    if(bismillah){

        bismillah.style.cursor = "pointer";

        bismillah.onclick = () => {
            window.location.href =
                "html/allah-names.html";
        };
    }


    /* Status → Calendar */

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        if(
            card.querySelector(".status")
        ){

            card.style.cursor = "pointer";

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
        dateKey(new Date());

    if(todayKey !== currentDateKey){

        loadPrayerTimes();
        updateToday();
    }
}


/* ================= START ================= */

function startHome(){

    applyHomeLanguage();

    updateToday();

    setupNavigation();

    loadLocation();

    setInterval(() => {

        updateToday();
        updateStatus();
        checkNewDay();

    },1000);
}


document.addEventListener(
    "DOMContentLoaded",
    startHome
););
