/* =========================================================
   IBADAT TASBIH - FINAL GUIDED TASBIH
   ========================================================= */


/* ================= STORAGE ================= */

const TASBIH_STORAGE_KEY = "tasbihData";
const TASBIH_DAILY_KEY = "tasbihDaily";
const OLD_COUNT_KEY = "tasbihCount";


/* ================= ZIKR ================= */

const ZIKR = {

    subhanallah: {
        arabic: "سُبْحَانَ اللّٰهِ",
        bn: "সুবহানাল্লাহ",
        en: "SubhanAllah",
        hi: "सुब्हानअल्लाह",
        target: 33
    },

    alhamdulillah: {
        arabic: "الْحَمْدُ لِلّٰهِ",
        bn: "আলহামদুলিল্লাহ",
        en: "Alhamdulillah",
        hi: "अल्हम्दुलिल्लाह",
        target: 33
    },

    allahuakbar: {
        arabic: "اللّٰهُ أَكْبَرُ",
        bn: "আল্লাহু আকবার",
        en: "Allahu Akbar",
        hi: "अल्लाहु अकबर",
        target: 33
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

        target: 1
    }

};


/* ================= LANGUAGE ================= */

const TEXT = {

    bn: {
        title: "তসবিহ",
        current: "বর্তমান জিকির",
        step: "বর্তমান ধাপ",
        total: "মোট কাউন্ট",
        progress: "অগ্রগতি",
        today: "আজ সম্পূর্ণ",
        times: "বার",
        tap: "TAP",
        reset: "রিসেট",
        complete:
            "মাশাআল্লাহ! একটি সম্পূর্ণ তসবিহ শেষ হয়েছে।",
        stepComplete:
            "সম্পূর্ণ হয়েছে",
        confirm:
            "তসবিহ রিসেট করবেন?"
    },

    en: {
        title: "Tasbih",
        current: "Current Zikr",
        step: "Current Step",
        total: "Total Count",
        progress: "Progress",
        today: "Completed Today",
        times: "times",
        tap: "TAP",
        reset: "Reset",
        complete:
            "MashaAllah! One complete Tasbih finished.",
        stepComplete:
            "completed",
        confirm:
            "Reset Tasbih?"
    },

    hi: {
        title: "तस्बीह",
        current: "वर्तमान ज़िक्र",
        step: "वर्तमान चरण",
        total: "कुल काउंट",
        progress: "प्रगति",
        today: "आज पूर्ण",
        times: "बार",
        tap: "TAP",
        reset: "रीसेट",
        complete:
            "माशाअल्लाह! एक पूरी तस्बीह पूरी हुई।",
        stepComplete:
            "पूरा हुआ",
        confirm:
            "तस्बीह रीसेट करें?"
    }

};


/* ================= STATE ================= */

let totalCount = 0;

let dailyComplete = 0;

let lastLanguage = "bn";

let lastDate = "";


/* ================= LANGUAGE ================= */

function getLanguage(){

    try{

        const raw =
            localStorage.getItem("appSettings");

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

        // Use Bengali if settings cannot be read
    }

    return "bn";
}


/* ================= TODAY ================= */

function getTodayKey(){

    const now = new Date();

    return (

        now.getFullYear() +
        "-" +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            now.getDate()
        ).padStart(2, "0")

    );
}


/* ================= LOAD DAILY ================= */

function loadDailyCount(){

    const today =
        getTodayKey();

    try{

        const raw =
            localStorage.getItem(
                TASBIH_DAILY_KEY
            );

        if(!raw){

            dailyComplete = 0;

            saveDailyCount();

            return;
        }

        const data =
            JSON.parse(raw);

        if(
            data.date === today
        ){

            dailyComplete =
                Number(data.count) || 0;

        }else{

            dailyComplete = 0;

            saveDailyCount();
        }

    }catch(error){

        dailyComplete = 0;

        saveDailyCount();
    }
}


/* ================= SAVE DAILY ================= */

function saveDailyCount(){

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

    totalCount = 0;

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

            /*
             * Old version compatibility
             */

            const old =
                localStorage.getItem(
                    OLD_COUNT_KEY
                );

            if(old){

                totalCount =
                    Number(old) || 0;

            }

            saveTasbih();
        }

    }catch(error){

        totalCount = 0;

        saveTasbih();
    }


    /*
     * A 100-count cycle is always 0-100.
     */

    if(
        totalCount < 0 ||
        totalCount > 100
    ){

        totalCount = 0;

        saveTasbih();
    }


    loadDailyCount();

    lastLanguage =
        getLanguage();

    lastDate =
        getTodayKey();

    updateUI();
}


/* ================= SAVE TASBIH ================= */

function saveTasbih(){

    localStorage.setItem(

        TASBIH_STORAGE_KEY,

        JSON.stringify({

            totalCount:
                totalCount

        })

    );
}


/* ================= CURRENT STEP ================= */

function getStepInfo(){

    /*
     * 0 - 32
     * SubhanAllah
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
     * Alhamdulillah
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
     * Allahu Akbar
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
     * 99
     * Final Zikr
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

    const t =
        TEXT[lang] || TEXT.bn;

    const info =
        getStepInfo();

    const zikr =
        ZIKR[info.key];


    /*
     * PAGE TITLE
     */

    setText(
        "pageTitle",
        t.title
    );


    /*
     * CURRENT ZIKR
     */

    setText(
        "zikrLabel",
        t.current
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
     * STEP
     */

    let stepPrefix;

    if(lang === "bn"){

        stepPrefix = "ধাপ ";

    }else if(lang === "hi"){

        stepPrefix = "चरण ";

    }else{

        stepPrefix = "Step ";
    }


    setText(

        "stepText",

        stepPrefix +
        info.step +
        " / 4"

    );


    /*
     * LABELS
     */

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


    /*
     * CURRENT STEP COUNT
     */

    setText(

        "stepCount",

        info.stepCount +
        " / " +
        info.target

    );


    /*
     * TOTAL COUNT
     */

    setText(

        "totalCount",

        totalCount +
        " / 100"

    );


    /*
     * TAP BUTTON NUMBER
     */

    setText(

        "tapNumber",

        totalCount

    );


    /*
     * PROGRESS BAR
     */

    const progressFill =
        document.getElementById(
            "progressFill"
        );

    if(progressFill){

        progressFill.style.width =
            totalCount + "%";
    }


    /*
     * PROGRESS %
     */

    setText(

        "progressPercent",

        totalCount + "%"

    );


    /*
     * TODAY COMPLETE
     */

    setText(

        "todayComplete",

        dailyComplete

    );


    /*
     * LANGUAGE
     */

    document.documentElement.lang =
        lang;
}


/* ================= TAP ================= */

function increase(){

    /*
     * Do nothing if the current
     * 100-count cycle is complete.
     */

    if(totalCount >= 100){

        return;
    }


    /*
     * Increase immediately.
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
     * Small vibration on every tap.
     */

    vibrate(50);


    /*
     * 33 completed
     */

    if(totalCount === 33){

        vibrate(200);

        showStepComplete(
            "subhanallah"
        );

        return;
    }


    /*
     * 66 completed
     */

    if(totalCount === 66){

        vibrate(200);

        showStepComplete(
            "alhamdulillah"
        );

        return;
    }


    /*
     * 99 completed
     */

    if(totalCount === 99){

        vibrate(200);

        showStepComplete(
            "allahuakbar"
        );

        return;
    }


    /*
     * 100 completed
     */

    if(totalCount === 100){

        finishTasbih();

        return;
    }

}


/* ================= VIBRATION ================= */

function vibrate(duration){

    try{

        if(
            "vibrate" in navigator
        ){

            navigator.vibrate(
                duration
            );
        }

    }catch(error){

        // Ignore vibration errors
    }
}


/* ================= STEP MESSAGE ================= */

function showStepComplete(key){

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


    /*
     * Keep message visible briefly.
     */

    setTimeout(

        function(){

            /*
             * Don't clear a newer
             * completion message.
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


/* ================= COMPLETE 100 ================= */

function finishTasbih(){

    /*
     * Strong completion vibration.
     */

    try{

        if(
            "vibrate" in navigator
        ){

            navigator.vibrate([
                300,
                100,
                300
            ]);

        }

    }catch(error){

        // Ignore vibration errors
    }


    /*
     * Increase today's
     * completed 100-count sets.
     */

    dailyComplete++;

    saveDailyCount();


    /*
     * Update current UI.
     */

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


    /*
     * Mark button as completed.
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
     * After 2 seconds:
     *
     * 100-count cycle resets to 0.
     *
     * Today's completed count
     * remains saved.
     */

    setTimeout(

        function(){

            totalCount = 0;

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

        element.innerText = "";

        element.classList.remove(
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


    const confirmed =
        window.confirm(
            t.confirm
        );


    if(!confirmed){

        return;
    }


    totalCount = 0;

    saveTasbih();

    clearMessage();

    updateUI();
}


/* ================= TEXT HELPER ================= */

function setText(id, value){

    const element =
        document.getElementById(id);

    if(element){

        element.innerText =
            value;
    }
}


/* ================= BACK ================= */

function goBack(){

    window.location.href =
        "../index.html";

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

function checkNewDay(){

    const today =
        getTodayKey();

    if(
        today !==
        lastDate
    ){

        lastDate =
            today;

        dailyComplete = 0;

        saveDailyCount();

        updateUI();
    }
}


/* ================= INIT ================= */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        /*
         * Load saved data.
         */

        loadTasbih();


        /*
         * TAP button
         */

        const tapButton =
            document.getElementById(
                "tapButton"
            );

        if(tapButton){

            tapButton.onclick =
                increase;

        }


        /*
         * RESET button
         */

        const resetButton =
            document.getElementById(
                "resetBtn"
            );

        if(resetButton){

            resetButton.onclick =
                resetTasbih;

        }


        /*
         * BACK button
         */

        const backButton =
            document.getElementById(
                "backBtn"
            );

        if(backButton){

            backButton.onclick =
                goBack;

        }


        /*
         * Check language every 500ms.
         */

        setInterval(

            checkLanguage,

            500

        );


        /*
         * Check midnight every 30 seconds.
         */

        setInterval(

            checkNewDay,

            30000

        );

    }

);
