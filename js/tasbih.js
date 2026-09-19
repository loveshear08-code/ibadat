/* =========================================================
   IBADAT TASBIH - GUIDED 100
   ========================================================= */


/* ================= STORAGE ================= */

const STORAGE_KEY =
    "tasbihData";

const OLD_STORAGE_KEY =
    "tasbihCount";

const DAILY_KEY =
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

        target:33

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

        target:33

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

        target:33

    },


    final: {

        arabic:
            "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ",

        bn:
            "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু",

        en:
            "La ilaha illallahu wahdahu la sharika lah",

        hi:
            "ला इलाहा इल्लल्लाहु वहदहू ला शरीक लह",

        target:1

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
            "আজ সম্পূর্ণ",

        times:
            "বার",

        tap:
            "TAP",

        reset:
            "রিসেট",

        complete:
            "মাশাআল্লাহ! একটি সম্পূর্ণ তসবিহ শেষ হয়েছে।",

        stepComplete:
            "ধাপ সম্পূর্ণ",

        confirm:
            "তসবিহ রিসেট করবেন?",

        yes:
            "হ্যাঁ",

        no:
            "না"

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

        reset:
            "Reset",

        complete:
            "MashaAllah! One complete Tasbih finished.",

        stepComplete:
            "Step completed",

        confirm:
            "Reset Tasbih?",

        yes:
            "Yes",

        no:
            "No"

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
            "आज पूर्ण",

        times:
            "बार",

        tap:
            "TAP",

        reset:
            "रीसेट",

        complete:
            "माशाअल्लाह! एक पूरी तस्बीह पूरी हुई।",

        stepComplete:
            "चरण पूरा हुआ",

        confirm:
            "तस्बीह रीसेट करें?",

        yes:
            "हाँ",

        no:
            "नहीं"

    }

};


/* ================= STATE ================= */

let totalCount = 0;

let dailyComplete = 0;


/* ================= GET LANGUAGE ================= */

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

    }catch(e){}

    return "bn";
}


/* ================= TODAY KEY ================= */

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


/* ================= LOAD DAILY ================= */

function loadDaily(){

    const today =
        getTodayKey();

    try{

        const raw =
            localStorage.getItem(
                DAILY_KEY
            );

        if(!raw){

            dailyComplete = 0;

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

            dailyComplete = 0;

            saveDaily();
        }

    }catch(e){

        dailyComplete = 0;

        saveDaily();
    }
}


/* ================= SAVE DAILY ================= */

function saveDaily(){

    localStorage.setItem(

        DAILY_KEY,

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
                STORAGE_KEY
            );

        if(raw){

            const data =
                JSON.parse(raw);

            totalCount =
                Number(
                    data.totalCount
                ) || 0;

        }else{

            const old =
                localStorage.getItem(
                    OLD_STORAGE_KEY
                );

            if(old){

                totalCount =
                    Number(old) || 0;

            }else{

                totalCount = 0;
            }

            saveTasbih();
        }

    }catch(e){

        totalCount = 0;

        saveTasbih();
    }


    /* Safety */

    if(
        totalCount < 0 ||
        totalCount > 100
    ){

        totalCount = 0;
    }


    loadDaily();

    updateUI();
}


/* ================= SAVE TASBIH ================= */

function saveTasbih(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify({

            totalCount:
                totalCount

        })

    );
}


/* ================= CURRENT STEP ================= */

function getStepInfo(){

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


/* ================= UPDATE LANGUAGE ================= */

function updateLanguage(){

    const lang =
        getLanguage();

    const t =
        TEXT[lang] || TEXT.bn;


    document.documentElement.lang =
        lang;


    setText(
        "pageTitle",
        t.title
    );

    setText(
        "zikrLabel",
        t.current
    );

    setText(
        "stepCountLabel",
        t.step
    );

    setText(
        "totalCountLabel",
        t.total
    );

    setText(
        "progressLabel",
        t.progress
    );

    setText(
        "todayLabel",
        t.today
    );

    setText(
        "todayTimes",
        t.times
    );

    setText(
        "tapText",
        t.tap
    );

    setText(
        "resetText",
        t.reset
    );


    updateZikrText(lang);

    updateCompleteMessage(lang);
}


/* ================= UPDATE ZIKR TEXT ================= */

function updateZikrText(lang){

    const info =
        getStepInfo();

    const zikr =
        ZIKR[info.key];


    setText(
        "zikrArabic",
        zikr.arabic
    );


    setText(
        "zikrName",
        zikr[lang] || zikr.bn
    );


    setText(

        "stepText",

        (
            lang === "bn"
                ? "ধাপ "
                : lang === "hi"
                    ? "चरण "
                    : "Step "
        ) +

        info.step +

        (

            lang === "bn"
                ? " / ৪"
                : lang === "hi"
                    ? " / 4"
                    : " / 4"
        )

    );
}


/* ================= UPDATE UI ================= */

function updateUI(){

    updateLanguage();


    const info =
        getStepInfo();


    /* Current step */

    setText(

        "stepCount",

        info.stepCount +
        " / " +
        info.target

    );


    /* Total */

    setText(

        "totalCount",

        totalCount +
        " / 100"

    );


    /* Tap number */

    setText(

        "tapNumber",

        totalCount

    );


    /* Progress */

    const percent =
        totalCount;

    const fill =
        document.getElementById(
            "progressFill"
        );

    if(fill){

        fill.style.width =
            percent + "%";
    }


    setText(

        "progressPercent",

        percent + "%"

    );


    /* Daily */

    setText(

        "todayComplete",

        dailyComplete

    );


    /* Complete button */

    const tap =
        document.getElementById(
            "tapButton"
        );

    if(tap){

        if(totalCount >= 100){

            tap.classList.add(
                "completed"
            );

        }else{

            tap.classList.remove(
                "completed"
            );
        }
    }
}


/* ================= TAP ================= */

function increase(){

    /* Prevent extra tap after 100 */

    if(totalCount >= 100){

        return;
    }


    totalCount++;


    /* Every normal tap */

    if(navigator.vibrate){

        navigator.vibrate(50);

    }


    /* 33 */

    if(totalCount === 33){

        stepComplete(
            "subhanallah"
        );

        return;
    }


    /* 66 */

    if(totalCount === 66){

        stepComplete(
            "alhamdulillah"
        );

        return;
    }


    /* 99 */

    if(totalCount === 99){

        stepComplete(
            "allahuakbar"
        );

        return;
    }


    /* 100 */

    if(totalCount === 100){

        finishTasbih();

        return;
    }


    saveTasbih();

    updateUI();
}


/* ================= STEP COMPLETE ================= */

function stepComplete(key){

    if(navigator.vibrate){

        navigator.vibrate(200);

    }


    saveTasbih();

    updateUI();


    showStepMessage(key);


    setTimeout(

        () => {

            clearMessage();

            updateUI();

        },

        1200

    );
}


/* ================= SHOW STEP MESSAGE ================= */

function showStepMessage(key){

    const lang =
        getLanguage();

    const t =
        TEXT[lang] || TEXT.bn;

    const zikr =
        ZIKR[key];


    const message =

        "✓ " +

        (zikr[lang] || zikr.bn) +

        " " +

        t.stepComplete;


    const el =
        document.getElementById(
            "completeMessage"
        );

    if(el){

        el.innerText =
            message;

        el.classList.add(
            "show"
        );
    }
}


/* ================= FINISH 100 ================= */

function finishTasbih(){

    saveTasbih();


    /* Stronger completion vibration */

    if(navigator.vibrate){

        navigator.vibrate([
            300,
            100,
            300
        ]);

    }


    dailyComplete++;


    saveDaily();


    updateUI();


    const lang =
        getLanguage();

    const t =
        TEXT[lang] || TEXT.bn;


    const message =
        document.getElementById(
            "completeMessage"
        );


    if(message){

        message.innerText =
            t.complete;

        message.classList.add(
            "show"
        );
    }


    const tap =
        document.getElementById(
            "tapButton"
        );

    if(tap){

        tap.classList.add(
            "completed"
        );
    }


    /* Wait, show completion,
       then automatically start
       a new 100-count cycle */

    setTimeout(

        () => {

            totalCount = 0;

            saveTasbih();

            clearMessage();

            updateUI();

        },

        2000

    );
}


/* ================= CLEAR MESSAGE ================= */

function clearMessage(){

    const el =
        document.getElementById(
            "completeMessage"
        );

    if(el){

        el.innerText = "";

        el.classList.remove(
            "show"
        );
    }
}


/* ================= RESET ================= */

function resetTasbih(){

    const lang =
        getLanguage();

    const t =
        TEXT[lang] || TEXT.bn;


    const answer =
        window.confirm(
            t.confirm
        );


    if(!answer){

        return;
    }


    totalCount = 0;

    saveTasbih();

    clearMessage();

    updateUI();
}


/* ================= TEXT HELPER ================= */

function setText(id,text){

    const el =
        document.getElementById(id);

    if(el){

        el.innerText =
            text;

    }
}


/* ================= BACK ================= */

function goBack(){

    window.location.href =
        "../index.html";

}


/* ================= LANGUAGE WATCHER ================= */

let lastLanguage =
    getLanguage();


setInterval(

    () => {

        const currentLanguage =
            getLanguage();

        if(
            currentLanguage !==
            lastLanguage
        ){

            lastLanguage =
                currentLanguage;

            updateUI();
        }

    },

    500

);


/* ================= MIDNIGHT CHECK ================= */

let lastDate =
    getTodayKey();


setInterval(

    () => {

        const today =
            getTodayKey();


        if(today !== lastDate){

            lastDate =
                today;

            dailyComplete =
                0;

            saveDaily();

            updateUI();

        }

    },

    30000

);


/* ================= INIT ================= */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadTasbih();


        const tap =
            document.getElementById(
                "tapButton"
            );

        if(tap){

            tap.addEventListener(
                "click",
                increase
            );

        }


        const reset =
            document.getElementById(
                "resetBtn"
            );

        if(reset){

            reset.addEventListener(
                "click",
                resetTasbih
            );

        }


        const back =
            document.getElementById(
                "backBtn"
            );

        if(back){

            back.addEventListener(
                "click",
                goBack
            );

        }

    }

);
