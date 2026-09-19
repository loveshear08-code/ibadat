/* =========================================================
   IBADAT TASBIH
   ========================================================= */


/* ================= DATA ================= */

const zikrNames = {

    bn: {

        subhanallah: "সুবহানাল্লাহ",
        alhamdulillah: "আলহামদুলিল্লাহ",
        allahuakbar: "আল্লাহু আকবার",
        astaghfirullah: "আস্তাগফিরুল্লাহ",
        salawat: "দরুদ শরীফ"

    },

    en: {

        subhanallah: "SubhanAllah",
        alhamdulillah: "Alhamdulillah",
        allahuakbar: "Allahu Akbar",
        astaghfirullah: "Astaghfirullah",
        salawat: "Salawat"

    },

    hi: {

        subhanallah: "सुब्हानल्लाह",
        alhamdulillah: "अल्हम्दुलिल्लाह",
        allahuakbar: "अल्लाहु अकबर",
        astaghfirullah: "अस्तग़फ़िरुल्लाह",
        salawat: "दरूद शरीफ़"

    }

};


const texts = {

    bn: {

        title: "তসবিহ",

        zikr: "জিকির",

        target: "লক্ষ্য",

        count: "বর্তমান গণনা",

        remaining: "বাকি",

        infoTitle: "তসবিহ সম্পর্কে",

        infoText:
            "জিকির নির্বাচন করে লক্ষ্য সংখ্যা নির্ধারণ করুন। তারপর তসবিহ বাটনে চাপ দিয়ে গণনা করুন।",

        reset: "RESET",

        tap: "TAP",

        done: "লক্ষ্য পূর্ণ হয়েছে"

    },

    en: {

        title: "Tasbih",

        zikr: "Zikr",

        target: "Target",

        count: "Current Count",

        remaining: "Remaining",

        infoTitle: "About Tasbih",

        infoText:
            "Select a Zikr, choose your target, then tap the Tasbih button to count.",

        reset: "RESET",

        tap: "TAP",

        done: "Target completed"

    },

    hi: {

        title: "तस्बीह",

        zikr: "ज़िक्र",

        target: "लक्ष्य",

        count: "वर्तमान गिनती",

        remaining: "बाकी",

        infoTitle: "तस्बीह के बारे में",

        infoText:
            "ज़िक्र चुनें, लक्ष्य संख्या निर्धारित करें और तस्बीह बटन दबाकर गिनती करें।",

        reset: "RESET",

        tap: "TAP",

        done: "लक्ष्य पूरा हुआ"

    }

};


/* ================= STATE ================= */

let count = 0;

let target = 33;

let selectedZikr = "subhanallah";


const STORAGE_KEY =
    "tasbihData";


/* ================= SETTINGS ================= */

function getLanguage(){

    try{

        const saved =
            localStorage.getItem("appSettings");

        if(saved){

            const settings =
                JSON.parse(saved);

            if(
                settings.lang === "en" ||
                settings.lang === "hi"
            ){

                return settings.lang;

            }

        }

    }catch(e){}

    return "bn";
}


/* ================= LOAD ================= */

function loadTasbih(){

    try{

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if(saved){

            const data =
                JSON.parse(saved);

            count =
                Number(data.count) || 0;

            target =
                Number(data.target) || 33;

            selectedZikr =
                data.zikr ||
                "subhanallah";

        }else{

            /* OLD VERSION SUPPORT */

            const oldCount =
                localStorage.getItem(
                    "tasbihCount"
                );

            count =
                oldCount
                    ? parseInt(oldCount)
                    : 0;

        }

    }catch(e){

        count = 0;

        target = 33;

        selectedZikr =
            "subhanallah";

    }


    updateLanguage();

    updateUI();

}


/* ================= SAVE ================= */

function saveTasbih(){

    const data = {

        count: count,

        target: target,

        zikr: selectedZikr

    };

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

    /* Keep old storage updated too */

    localStorage.setItem(

        "tasbihCount",

        count

    );

}


/* ================= UPDATE LANGUAGE ================= */

function updateLanguage(){

    const lang =
        getLanguage();

    const t =
        texts[lang] || texts.bn;


    document.documentElement.lang =
        lang === "bn"
            ? "bn"
            : lang === "hi"
                ? "hi"
                : "en";


    setText(
        "pageTitle",
        t.title
    );

    setText(
        "zikrLabel",
        t.zikr
    );

    setText(
        "targetLabel",
        t.target
    );

    setText(
        "countLabel",
        t.count
    );

    setText(
        "resetBtn",
        t.reset
    );

    setText(
        "tapText",
        t.tap
    );

    setText(
        "infoTitle",
        t.infoTitle
    );

    setText(
        "infoText",
        t.infoText
    );


    updateZikrOptions(lang);

}


/* ================= ZIKR OPTIONS ================= */

function updateZikrOptions(lang){

    const select =
        document.getElementById(
            "zikrSelect"
        );

    if(!select) return;


    const names =
        zikrNames[lang] ||
        zikrNames.bn;


    Object.keys(names).forEach(
        key => {

            const option =
                select.querySelector(
                    `option[value="${key}"]`
                );

            if(option){

                option.innerText =
                    names[key];

            }

        }
    );


    select.value =
        selectedZikr;

}


/* ================= UPDATE UI ================= */

function updateUI(){

    const countElement =
        document.getElementById(
            "count"
        );

    const remainingElement =
        document.getElementById(
            "remaining"
        );

    const progressFill =
        document.getElementById(
            "progressFill"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );


    if(countElement){

        countElement.innerText =
            count;

    }


    let remaining =
        target - count;

    if(remaining < 0){

        remaining = 0;

    }


    const lang =
        getLanguage();

    const t =
        texts[lang] || texts.bn;


    if(remainingElement){

        if(count >= target){

            remainingElement.innerText =
                t.done;

        }else{

            remainingElement.innerText =
                t.remaining +
                ": " +
                remaining;

        }

    }


    let percentage =
        (count / target) * 100;

    if(percentage > 100){

        percentage = 100;

    }

    if(percentage < 0){

        percentage = 0;

    }


    if(progressFill){

        progressFill.style.width =
            percentage + "%";

    }


    if(progressText){

        progressText.innerText =
            Math.round(percentage) +
            "%";

    }


    updateTargetButtons();

}


/* ================= TARGET BUTTON ================= */

function updateTargetButtons(){

    const buttons =
        document.querySelectorAll(
            ".target-btn"
        );


    buttons.forEach(button => {

        const value =
            parseInt(
                button.dataset.target
            );


        if(value === target){

            button.classList.add(
                "active"
            );

        }else{

            button.classList.remove(
                "active"
            );

        }

    });

}


/* ================= TAP ================= */

function increase(){

    if(count < target){

        count++;

    }


    /* vibration */

    if(navigator.vibrate){

        navigator.vibrate(50);

    }


    saveTasbih();

    updateUI();

}


/* ================= RESET ================= */

function resetTasbih(){

    const lang =
        getLanguage();


    let message =
        "Reset Tasbih?";


    if(lang === "bn"){

        message =
            "তসবিহের গণনা কি রিসেট করবেন?";

    }

    if(lang === "hi"){

        message =
            "क्या तस्बीह की गिनती रीसेट करें?";

    }


    if(confirm(message)){

        count = 0;

        saveTasbih();

        updateUI();

    }

}


/* ================= TARGET ================= */

function setTarget(value){

    target =
        parseInt(value);


    count = 0;


    saveTasbih();

    updateUI();

}


/* ================= ZIKR ================= */

function changeZikr(){

    const select =
        document.getElementById(
            "zikrSelect"
        );

    if(!select) return;


    selectedZikr =
        select.value;


    count = 0;


    saveTasbih();

    updateUI();

}


/* ================= TEXT HELPER ================= */

function setText(id,text){

    const element =
        document.getElementById(id);

    if(element){

        element.innerText =
            text;

    }

}


/* ================= NAVIGATION ================= */

function setupNavigation(){

    const back =
        document.getElementById(
            "backBtn"
        );

    if(back){

        back.addEventListener(
            "click",
            () => {

                window.location.href =
                    "../index.html";

            }
        );

    }

}


/* ================= TARGET EVENTS ================= */

function setupTargetButtons(){

    const buttons =
        document.querySelectorAll(
            ".target-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setTarget(
                    button.dataset.target
                );

            }
        );

    });

}


/* ================= INIT ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTasbih();

        setupNavigation();

        setupTargetButtons();


        const tapButton =
            document.getElementById(
                "tapButton"
            );

        if(tapButton){

            tapButton.addEventListener(
                "click",
                increase
            );

        }


        const resetButton =
            document.getElementById(
                "resetBtn"
            );

        if(resetButton){

            resetButton.addEventListener(
                "click",
                resetTasbih
            );

        }


        const zikrSelect =
            document.getElementById(
                "zikrSelect"
            );

        if(zikrSelect){

            zikrSelect.addEventListener(
                "change",
                changeZikr
            );

        }

    }
);
