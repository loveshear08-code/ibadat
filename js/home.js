/* =====================================================
   IBADAT HOME JS
   PART 1
===================================================== */


/* ================= SETTINGS ================= */

function getSettings(){

    try{

        const raw =
            localStorage.getItem(
                "appSettings"
            );

        if(!raw){

            return {

                lang:"bn",

                dark:false
            };
        }

        return JSON.parse(raw);

    }catch(e){

        return {

            lang:"bn",

            dark:false
        };
    }
}


/* ================= GLOBAL ================= */

const settings =
    getSettings();

const LANG =
    settings.lang || "bn";


/* ================= THEME ================= */

function applyTheme(){

    if(settings.dark){

        document.body.classList.add(
            "dark-mode"
        );

    }else{

        document.body.classList.remove(
            "dark-mode"
        );
    }
}


/* ================= BISMILLAH ================= */

const BISMILLAH_MEANING = {

    bn:
    "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",

    en:
    "In the name of Allah, the Most Gracious, the Most Merciful",

    hi:
    "अल्लाह के नाम से, जो अत्यन्त कृपालु और दयावान है"
};


function loadBismillahMeaning(){

    const el =
        document.getElementById(
            "bismillahMeaning"
        );

    if(!el) return;

    el.innerText =
        BISMILLAH_MEANING[LANG]
        ||
        BISMILLAH_MEANING.bn;
}


/* ================= DATE ================= */

function loadDate(){

    const el =
        document.getElementById(
            "date"
        );

    if(!el) return;

    let locale = "bn-BD";

    if(LANG === "en")
        locale = "en-US";

    if(LANG === "hi")
        locale = "hi-IN";

    const now =
        new Date();

    el.innerText =
        now.toLocaleDateString(
            locale,
            {

                day:"numeric",

                month:"long",

                year:"numeric"
            }
        );
}


/* ================= CLOCK ================= */

function startClock(){

    const clock =
        document.getElementById(
            "clock"
        );

    if(!clock) return;

    function update(){

        let locale = "bn-BD";

        if(LANG==="en")
            locale="en-US";

        if(LANG==="hi")
            locale="hi-IN";

        clock.innerText =
            new Date()
            .toLocaleTimeString(
                locale,
                {

                    hour:"2-digit",

                    minute:"2-digit",

                    second:"2-digit",

                   hour12:false       
                }
            );
    }

    update();

    setInterval(
        update,
        1000
    );
}


/* ================= LOCATION ================= */

let USER_LAT = null;
let USER_LON = null;

function loadLocation(){

    const city =
        document.getElementById(
            "city"
        );

    if(!navigator.geolocation){

        city.innerText =
            "Location";

        return;
    }

    navigator.geolocation
    .getCurrentPosition(

        async(pos)=>{

            USER_LAT =
                pos.coords.latitude;

            USER_LON =
                pos.coords.longitude;

            try{

                const res =
                    await fetch(

                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${USER_LAT}&lon=${USER_LON}`

                    );

                const data =
                    await res.json();

                const cityName =

    data.address.city ||

    data.address.town ||

    data.address.village ||

    "Unknown";


const lang =
    getSettings().lang;


const CITY_NAMES = {

    Kolkata:{
        bn:"কলকাতা",
        en:"Kolkata",
        hi:"कोलकाता"
    },

    Delhi:{
        bn:"দিল্লি",
        en:"Delhi",
        hi:"दिल्ली"
    },

    Mumbai:{
        bn:"মুম্বাই",
        en:"Mumbai",
        hi:"मुंबई"
    }
};


city.innerText =

    CITY_NAMES[cityName]?.[lang]

    ||

    cityName;
            }catch(e){

                city.innerText =
                    "Location";
            }

        },

        ()=>{

            city.innerText =
                "Location";
        }
    );
}


/* ================= DAY NAME ================= */

function loadDayName(){

    const el =
        document.getElementById(
            "todayDay"
        );

    if(!el) return;

    const days = {

        bn:[
            "রবিবার",
            "সোমবার",
            "মঙ্গলবার",
            "বুধবার",
            "বৃহস্পতিবার",
            "শুক্রবার",
            "শনিবার"
        ],

        en:[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],

        hi:[
            "रविवार",
            "सोमवार",
            "मंगलवार",
            "बुधवार",
            "गुरुवार",
            "शुक्रवार",
            "शनिवार"
        ]
    };

    const d =
        new Date();

    el.innerText =
        days[LANG][
            d.getDay()
        ];
}


/* ================= INIT ================= */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        applyTheme();

        loadBismillahMeaning();

        loadDate();

        loadDayName();

        startClock();

        loadLocation();
    }
);


/* =====================================================
   PART 2
   PRAYER SYSTEM
===================================================== */

let prayerTimes = null;


/* ================= PRAYER LABELS ================= */

const PRAYER_TEXT = {

    bn:{
        fajr:"ফজর",
        sunrise:"সূর্যোদয়",
        dhuhr:"যোহর",
        asr:"আসর",
        maghrib:"মাগরিব",
        isha:"ইশা"
    },

    en:{
        fajr:"Fajr",
        sunrise:"Sunrise",
        dhuhr:"Dhuhr",
        asr:"Asr",
        maghrib:"Maghrib",
        isha:"Isha"
    },

    hi:{
        fajr:"फ़ज्र",
        sunrise:"सूर्योदय",
        dhuhr:"ज़ुहर",
        asr:"असर",
        maghrib:"मग़रिब",
        isha:"इशा"
    }
};


/* ================= FETCH PRAYER ================= */

async function loadPrayerTimes(){

    if(!USER_LAT || !USER_LON){

        setTimeout(
            loadPrayerTimes,
            2000
        );

        return;
    }

    try{

        const today =
            new Date();

        const day =
            today.getDate();

        const month =
            today.getMonth()+1;

        const year =
            today.getFullYear();

        const url =

`https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${USER_LAT}&longitude=${USER_LON}&method=1`;

        const res =
            await fetch(url);

        const data =
            await res.json();

        prayerTimes =
            data.data.timings;

        buildPrayerGrid();

        updatePrayerStatus();

        startPrayerTimer();

    }catch(err){

        console.log(err);
    }
}


/* ================= GRID ================= */

function buildPrayerGrid(){

    const grid =
        document.getElementById(
            "prayerGrid"
        );

    if(!grid) return;

    grid.innerHTML = "";

    const labels =
        PRAYER_TEXT[LANG];

    const prayers = [

        {
            key:"Fajr",
            text:labels.fajr
        },

        {
            key:"Sunrise",
            text:labels.sunrise
        },

        {
            key:"Dhuhr",
            text:labels.dhuhr
        },

        {
            key:"Asr",
            text:labels.asr
        },

        {
            key:"Maghrib",
            text:labels.maghrib
        },

        {
            key:"Isha",
            text:labels.isha
        }
    ];

    prayers.forEach(item=>{

        const box =
            document.createElement("div");

        box.className =
            "prayer-box";

        if(item.key==="Sunrise"){

            box.classList.add(
                "sunrise-box"
            );

            box.onclick=()=>{

                window.location.href =
                "setting.html";
            };
        }

        box.innerHTML =

        `
        <div>${item.text}</div>
        <div>
        ${prayerTimes[item.key]}
        </div>
        `;

        grid.appendChild(box);
    });
}


/* ================= TIME HELPER ================= */

function prayerToDate(time){

    const parts =
        time.split(":");

    const d =
        new Date();

    d.setHours(
        parseInt(parts[0]),
        parseInt(parts[1]),
        0,
        0
    );

    return d;
}


/* ================= CURRENT + NEXT ================= */

function updatePrayerStatus(){

    if(!prayerTimes) return;

    const now =
        new Date();

    const list = [

        {
            key:"Fajr",
            name:
            PRAYER_TEXT[LANG].fajr
        },

        {
            key:"Dhuhr",
            name:
            PRAYER_TEXT[LANG].dhuhr
        },

        {
            key:"Asr",
            name:
            PRAYER_TEXT[LANG].asr
        },

        {
            key:"Maghrib",
            name:
            PRAYER_TEXT[LANG].maghrib
        },

        {
            key:"Isha",
            name:
            PRAYER_TEXT[LANG].isha
        }
    ];

    let current =
        list[0];

    let next =
        list[0];

    for(let i=0;i<list.length;i++){

        const t =
            prayerToDate(
                prayerTimes[
                    list[i].key
                ]
            );

        if(now>=t){

            current =
                list[i];
        }

        if(now<t){

            next =
                list[i];

            break;
        }
    }

    const currentEl =
        document.getElementById(
            "currentPrayerName"
        );

    const nextEl =
        document.getElementById(
            "nextPrayerName"
        );

    if(currentEl){

    currentEl.innerHTML =

    `
    <span style="color:#198754;">
    ●
    </span>

    <span style="color:#0F5132;">
    ${current.name}
    </span>
    `;
}
}

if(nextEl){

    nextEl.innerHTML =

    `
    <span style="color:#D4AF37;">
    ⏭
    </span>

    <span style="color:#6B4F00;">
    ${next.name}
    </span>
    `;
}


/* ================= COUNTDOWN ================= */

function updateCountdown(){

    if(!prayerTimes) return;

    const now =
        new Date();

    const prayers = [

        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha"
    ];

    let target =
        null;

    for(const p of prayers){

        const d =
            prayerToDate(
                prayerTimes[p]
            );

        if(d>now){

            target=d;

            break;
        }
    }

    if(!target){

        target =
            prayerToDate(
                prayerTimes.Fajr
            );

        target.setDate(
            target.getDate()+1
        );
    }

    const diff =
        target-now;

    const h =
        Math.floor(
            diff/3600000
        );

    const m =
        Math.floor(
            diff%3600000/60000
        );

    const s =
        Math.floor(
            diff%60000/1000
        );

    const el =
        document.getElementById(
            "countdown"
        );

    if(el){

        el.innerText =

        String(h)
        .padStart(2,"0")

        + ":"

        +

        String(m)
        .padStart(2,"0")

        + ":"

        +

        String(s)
        .padStart(2,"0");
    }
}


/* ================= TIMER ================= */

function startPrayerTimer(){

    updatePrayerStatus();

    updateCountdown();

    setInterval(()=>{

        updatePrayerStatus();

        updateCountdown();

    },1000);
}


/* ================= START ================= */

setTimeout(

    loadPrayerTimes,

    3000
);


/* =====================================================
   PART 3
   NAVIGATION + QUOTES
===================================================== */


/* ================= BISMILLAH CLICK ================= */

function setupBoardNavigation(){

    const bismillahCard =
        document.getElementById(
            "bismillahCard"
        );

    if(bismillahCard){

        bismillahCard.onclick =
        ()=>{

            window.location.href =
            "allah-name.html";
        };
    }


    const statusCard =
        document.querySelector(
            ".status-card"
        );

    if(statusCard){

        statusCard.onclick =
        ()=>{

            window.location.href =
            "calendar.html";
        };
    }
}


/* ================= FEATURE TEXT ================= */

function loadFeatureNames(){

    const names = {

        bn:{
            namaz:"নামাজ",
            quran:"কুরআন",
            dua:"দুয়া",
            hadith:"হাদিস",
            qibla:"কিবলা",
            tasbih:"তাসবিহ"
        },

        en:{
            namaz:"Prayer",
            quran:"Quran",
            dua:"Dua",
            hadith:"Hadith",
            qibla:"Qibla",
            tasbih:"Tasbih"
        },

        hi:{
            namaz:"नमाज़",
            quran:"क़ुरआन",
            dua:"दुआ",
            hadith:"हदीस",
            qibla:"क़िब्ला",
            tasbih:"तस्बीह"
        }
    };

    const lang =
    getSettings().lang || "bn";

const t =
    names[lang];

    document.getElementById("namaz").innerText =
        t.namaz;

    document.getElementById("quran").innerText =
        t.quran;

    document.getElementById("dua").innerText =
        t.dua;

    document.getElementById("hadith").innerText =
        t.hadith;

    document.getElementById("qibla").innerText =
        t.qibla;

    document.getElementById("tasbih").innerText =
        t.tasbih;
}


/* ================= FEATURE NAVIGATION ================= */

function setupFeatureNavigation(){

    const pages = {

        namaz:
        "namaz.html",

        quran:
        "quran.html",

        dua:
        "dua.html",

        hadith:
        "hadith.html",

        qibla:
        "qibla.html",

        tasbih:
        "tasbih.html"
    };

    Object.keys(pages)
    .forEach(id=>{

        const el =
            document.getElementById(
                id
            );

        if(!el) return;

        el.onclick =
        ()=>{

            window.location.href =
            pages[id];
        };
    });
}


/* ================= ISLAMIC QUOTES ================= */

const QUOTES = {

    bn:[

        "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।",

        "আল্লাহর স্মরণেই অন্তর প্রশান্ত হয়।",

        "যে আল্লাহর উপর ভরসা করে, আল্লাহ তার জন্য যথেষ্ট।",

        "নামাজ মুমিনের মিরাজ।",

        "সর্বোত্তম মানুষ সে, যে মানুষের উপকার করে।",

        "আল্লাহ ক্ষমাশীল, তিনি ক্ষমা করতে ভালোবাসেন।",

        "ধৈর্য ধরো, নিশ্চয়ই আল্লাহ উত্তম পরিকল্পনাকারী।"
    ],

    en:[

        "Indeed Allah is with the patient.",

        "Verily, in the remembrance of Allah do hearts find rest.",

        "Whoever trusts Allah, He is sufficient for him.",

        "Prayer is the ascension of the believer.",

        "The best people are those who benefit others.",

        "Allah loves those who seek forgiveness."
    ],

    hi:[

        "निस्संदेह अल्लाह सब्र करने वालों के साथ है।",

        "अल्लाह की याद में दिलों को सुकून मिलता है।",

        "जो अल्लाह पर भरोसा करता है, उसके लिए अल्लाह काफी है।",

        "नमाज़ मोमिन की मेराज है।",

        "सबसे अच्छा इंसान वह है जो लोगों के काम आए।"
    ]
};


/* ================= QUOTE ROTATION ================= */

let quoteIndex = 0;

function startQuotes(){

    const el =
        document.getElementById(
            "bottomText"
        );

    if(!el) return;

    const list =
        QUOTES[LANG] ||
        QUOTES.bn;

    function update(){

        el.innerText =
            list[quoteIndex];

        quoteIndex++;

        if(
            quoteIndex >=
            list.length
        ){

            quoteIndex = 0;
        }
    }

    update();

    setInterval(

        update,

        12000
    );
}


/* ================= WEATHER PLACEHOLDER ================= */

function loadWeather(){

    const weather =
        document.getElementById(
            "weather"
        );

    if(!weather) return;

    weather.innerText =
        "--°";
}


/* ================= FINAL INIT ================= */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{
       
       loadFeatureNames();

        setupBoardNavigation();

        setupFeatureNavigation();

        startQuotes();

        loadWeather();
    }
);
