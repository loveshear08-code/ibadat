/* =========================================================
   IBADAT TASBIH - FINAL GUIDED 100
   ========================================================= */


/* ================= STORAGE ================= */

const TASBIH_STORAGE_KEY =
    "tasbihData";

const TASBIH_DAILY_KEY =
    "tasbihDaily";


/* ================= ZIKR ================= */

const ZIKR = {

    subhanallah: {

        arabic:
            "سُبْحَانَ اللّٰهِ",

        bn:
            "সুবহানাল্লাহ",

        en:
            "SubhanAllah",

        hi:
            "सुब्हानअल्लाह",

        target:
            33
    },


    alhamdulillah: {

        arabic:
            "الْحَمْدُ لِلّٰهِ",

        bn:
            "আলহামদুলিল্লাহ",

        en:
            "Alhamdulillah",

        hi:
            "अल्हम्दुलिल्लाह",

        target:
            33
    },


    allahuakbar: {

        arabic:
            "اللّٰهُ أَكْبَرُ",

        bn:
            "আল্লাহু আকবার",

        en:
            "Allahu Akbar",

        hi:
            "अल्लाहु अकबर",

        target:
            33
    },


    final: {

        arabic:
            "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",

        bn:
            "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু, লাহুল মুলকু ওয়ালাহুল হামদু, ওয়া হুয়া আলা কুল্লি শাইইন কাদীর",

        en:
            "La ilaha illallahu wahdahu la sharika lah, lahul mulku wa lahul hamd, wa huwa ala kulli shay'in qadir",

        hi:
            "ला इलाहा इल्लल्लाहु वहदहू ला शरीक लह, लहुल मुल्कु व लहुल हम्दु, व हुवा अला कुल्लि शयइन क़दीर",

        target:
            1
    }

};


/* ================= LANGUAGE ================= */

const TEXT = {

    bn: {

        title:
            "তসবিহ",

        current:
            "বর্তমান জিকির",

        step:
            "বর্তমান ধাপ",

        total:
            "মোট কাউন্ট",

        progress:
            "অগ্রগতি",

        today:
            "আজ মোট সম্পন্ন",

        times:
            "বার",

        tap:
            "TAP",

        complete:
            "মাশাআল্লাহ! একটি সম্পূর্ণ তসবিহ শেষ হয়েছে।",

        stepComplete:
            "সম্পূর্ণ হয়েছে"

    },


    en: {

        title:
            "Tasbih",

        current:
            "Current Zikr",

        step:
            "Current Step",

        total:
            "Total Count",

        progress:
            "Progress",

        today:
            "Completed Today",

        times:
            "times",

        tap:
            "TAP",

        complete:
            "MashaAllah! One complete Tasbih finished.",

        stepComplete:
            "completed"

    },


    hi: {

        title:
            "तस्बीह",

        current:
            "वर्तमान ज़िक्र",

        step:
            "वर्तमान चरण",

        total:
            "कुल काउंट",

        progress:
            "प्रगति",

        today:
            "आज कुल पूर्ण",

        times:
            "बार",

        tap:
            "TAP",

        complete:
            "माशाअल्लाह! एक पूरी तस्बीह पूरी हुई।",

        stepComplete:
            "पूरा हुआ"

    }

};


/* ================= STATE ================= */

let totalCount =
    0;

let dailyComplete =
    0;

let lastLanguage =
    "bn";

let lastDate =
    "";


/* ================= LANGUAGE ================= */

function getLanguage(){

    try{

        const raw =
            localStorage.getItem(
                "appSettings"
            );

        if(raw){

            const settings =
                JSON.parse(raw);

            if(
                settings.lang &&
                TEXT[settings.lang]
            ){

                return settings.lang;
            }
        }

    }catch(error){

        // Bengali fallback

    }

    return "bn";
}


/* ================= DATE ================= */

function getTodayKey(){

    const now =
        new Date();

    return [

        now.getFullYear(),

        String(
            now.getMonth() + 1
        ).padStart(2,"0"),

        String(
            now.getDate()
        ).padStart(2,"0")

    ].join("-");
}


/* ================= DAILY DATA ================= */

function loadDaily(){

    const today =
        getTodayKey();


    try{

        const raw =
            localStorage.getItem(
                TASBIH_DAILY_KEY
            );


        if(!raw){

            dailyComplete =
                0;

            saveDaily();

            return;
        }


        const data =
            JSON.parse(raw);


        if(
            data.date === today
        ){

            dailyComplete =
                Number(
                    data.count
                ) || 0;

        }else{

            /*
             * New day:
             * automatically reset
             */

            dailyComplete =
                0;

            saveDaily();
        }

    }catch(error){

        dailyComplete =
            0;

        saveDaily();
    }
}


/* ================= SAVE DAILY ================= */

function saveDaily(){

    localStorage.setItem(

        TASBIH_DAILY_KEY,

        JSON.stringify({

            date:
                getTodayKey(),

            count:
                dailyComplete

        })

    );
}


/* ================= LOAD TASBIH ================= */

function loadTasbih(){

    try{

        const raw =
            localStorage.getItem(
                TASBIH_STORAGE_KEY
            );


        if(raw){

            const data =
                JSON.parse(raw);

            totalCount =
                Number(
                    data.totalCount
                ) || 0;

        }else{

            totalCount =
                0;

            saveTasbih();
        }

    }catch(error){

        totalCount =
            0;

        saveTasbih();
    }


    /*
     * Safety
     */

    if(
        totalCount < 0 ||
        totalCount > 100
    ){

        totalCount =
            0;

        saveTasbih();
    }


    loadDaily();


    lastLanguage =
        getLanguage();

    lastDate =
        getTodayKey();


    updateUI();
}


/* ================= SAVE ================= */

function saveTasbih(){

    localStorage.setItem(

        TASBIH_STORAGE_KEY,

        JSON.stringify({

            totalCount:
                totalCount

        })

    );
}


/* ================= STEP INFO ================= */

function getStepInfo(){

    /*
     * 0 - 32
     */

    if(totalCount < 33){

        return {

            key:
                "subhanallah",

            step:
                1,

            stepCount:
                totalCount,

            target:
                33

        };
    }


    /*
     * 33 - 65
     */

    if(totalCount < 66){

        return {

            key:
                "alhamdulillah",

            step:
                2,

            stepCount:
                totalCount - 33,

            target:
                33

        };
    }


    /*
     * 66 - 98
     */

    if(totalCount < 99){

        return {

            key:
                "allahuakbar",

            step:
                3,

            stepCount:
                totalCount - 66,

            target:
                33

        };
    }


    /*
     * 99 - 100
     */

    return {

        key:
            "final",

        step:
            4,

        stepCount:
            totalCount - 99,

        target:
            1

    };
}


/* ================= UPDATE UI ================= */

function updateUI(){

    const lang =
        getLanguage();

    const text =
        TEXT[lang] || TEXT.bn;

    const info =
        getStepInfo();

    const zikr =
        ZIKR[info.key];


    /*
     * Title
     */

    setText(
        "pageTitle",
        text.title
    );


    /*
     * Current Zikr
     */

    setText(
        "zikrLabel",
        text.current
    );


    setText(
        "zikrArabic",
        zikr.arabic
    );


    setText(
        "zikrName",
        zikr[lang] || zikr.bn
    );


    /*
     * Step
     */

    let stepWord;

    if(lang === "bn"){

        stepWord =
            "ধাপ ";

    }else if(lang === "hi"){

        stepWord =
            "चरण ";

    }else{

        stepWord =
            "Step ";
    }


    setText(

        "stepText",

        stepWord +
        info.step +
        " / 4"

    );


    /*
     * Labels
     */

    setText(
        "stepCountLabel",
        text.step
    );


    setText(
        "totalCountLabel",
        text.total
    );


    setText(
        "progressLabel",
        text.progress
    );


    setText(
        "todayLabel",
        text.today
    );


    setText(
        "todayTimes",
        text.times
    );


    setText(
        "tapText",
        text.tap
    );


    /*
     * Current step
     */

    setText(

        "stepCount",

        info.stepCount +
        " / " +
        info.target

    );


    /*
     * Total
     */

    setText(

        "totalCount",

        totalCount +
        " / 100"

    );


    /*
     * TAP number
     */

    setText(

        "tapNumber",

        totalCount

    );


    /*
     * Progress %

     */

    setText(

        "progressPercent",

        totalCount +
        "%"

    );


    /*
     * Progress bar
     */

    const progress =
        document.getElementById(
            "progressFill"
        );


    if(progress){

        progress.style.width =
            totalCount + "%";
    }


    /*
     * Daily total
     */

    setText(

        "todayComplete",

        dailyComplete

    );


    /*
     * Language
     */

    document.documentElement.lang =
        lang;
}


/* ================= VIBRATION ================= */

function shortVibration(){

    try{

        if(
            "vibrate" in navigator
        ){

            navigator.vibrate(
                150
            );

        }

    }catch(error){

        // Ignore unsupported vibration
    }
}


function completeVibration(){

    try{

        if(
            "vibrate" in navigator
        ){

            navigator.vibrate([

                300,
                120,
                300

            ]);

        }

    }catch(error){

        // Ignore unsupported vibration
    }
}


/* ================= TAP ================= */

function increase(){

    /*
     * Never go above 100.
     */

    if(totalCount >= 100){

        return;
    }


    /*
     * Add one count.
     */

    totalCount++;


    /*
     * Save immediately.
     */

    saveTasbih();


    /*
     * Update immediately.
     */

    updateUI();


    /*
     * Small vibration on normal tap.
     */

    shortVibration();


    /*
     * 33 COMPLETE
     */

    if(totalCount === 33){

        shortVibration();

        showStepMessage(
            "subhanallah"
        );

        return;
    }


    /*
     * 66 COMPLETE
     */

    if(totalCount === 66){

        shortVibration();

        showStepMessage(
            "alhamdulillah"
        );

        return;
    }


    /*
     * 99 COMPLETE
     */

    if(totalCount === 99){

        shortVibration();

        showStepMessage(
            "allahuakbar"
        );

        return;
    }


    /*
     * 100 COMPLETE
     */

    if(totalCount === 100){

        completeTasbih();

        return;
    }
}


/* ================= STEP MESSAGE ================= */

function showStepMessage(key){

    const lang =
        getLanguage();

    const text =
        TEXT[lang] || TEXT.bn;

    const zikr =
        ZIKR[key];


    const message =

        "✓ " +

        (zikr[lang] || zikr.bn) +

        " " +

        text.stepComplete;


    const element =
        document.getElementById(
            "completeMessage"
        );


    if(!element){

        return;
    }


    element.innerText =
        message;

    element.classList.add(
        "show"
    );


    setTimeout(

        function(){

            /*
             * Don't remove
             * completion message
             * from another state.
             */

            if(
                totalCount === 33 ||
                totalCount === 66 ||
                totalCount === 99
            ){

                clearMessage();
            }

        },

        1200

    );
}


/* ================= 100 COMPLETE ================= */

function completeTasbih(){

    /*
     * Keep 100 / 100 visible.
     */

    totalCount =
        100;


    saveTasbih();


    updateUI();


    /*
     * Strong completion vibration.
     */

    completeVibration();


    /*
     * Daily total +1.
     */

    dailyComplete++;


    saveDaily();


    /*
     * Update Daily Total immediately.
     */

    updateUI();


    /*
     * Complete message.
     */

    const lang =
        getLanguage();

    const text =
        TEXT[lang] || TEXT.bn;


    const message =
        document.getElementById(
            "completeMessage"
        );


    if(message){

        message.innerText =
            text.complete;

        message.classList.add(
            "show"
        );
    }


    /*
     * Completed button style.
     */

    const tapButton =
        document.getElementById(
            "tapButton"
        );


    if(tapButton){

        tapButton.classList.add(
            "completed"
        );
    }


    /*
     * Wait 2 seconds.
     * Then automatically start
     * a fresh 100-count cycle.
     */

    setTimeout(

        function(){

            totalCount =
                0;


            saveTasbih();


            clearMessage();


            if(tapButton){

                tapButton.classList.remove(
                    "completed"
                );
            }


            updateUI();

        },

        2000

    );
}


/* ================= CLEAR MESSAGE ================= */

function clearMessage(){

    const element =
        document.getElementById(
            "completeMessage"
        );


    if(element){

        element.innerText =
            "";

        element.classList.remove(
            "show"
        );
    }
}


/* ================= BACK ================= */

function goBack(){

    window.location.href =
        "../index.html";
}


/* ================= TEXT HELPER ================= */

function setText(
    id,
    value
){

    const element =
        document.getElementById(
            id
        );


    if(element){

        element.innerText =
            value;
    }
}


/* ================= LANGUAGE CHECK ================= */

function checkLanguage(){

    const current =
        getLanguage();


    if(
        current !==
        lastLanguage
    ){

        lastLanguage =
            current;

        updateUI();
    }
}


/* ================= MIDNIGHT CHECK ================= */

function checkMidnight(){

    const today =
        getTodayKey();


    /*
     * New date detected.
     */

    if(
        today !==
        lastDate
    ){

        lastDate =
            today;


        /*
         * Only Daily Total
         * resets at midnight.
         */

        dailyComplete =
            0;


        saveDaily();


        updateUI();
    }
}


/* ================= INIT ================= */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        /*
         * Load everything.
         */

        loadTasbih();


        /*
         * Language watcher.
         */

        setInterval(

            checkLanguage,

            500

        );


        /*
         * Midnight watcher.
         *
         * Checks every 30 seconds.
         */

        setInterval(

            checkMidnight,

            30000

        );

    }

);
