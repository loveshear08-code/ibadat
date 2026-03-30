// ================= SETTINGS =================

// settings.js থেকে language নাও
function getLang(){
    try{
        const s = getSettings();
        return s.lang || "bn";
    }catch{
        return "bn";
    }
}

// ================= LANGUAGE TEXT =================

const TEXT = {
    bn:{
        title:"📿 ডিজিটাল তসবিহ",
        click:"ক্লিক",
        reset:"রিসেট"
    },
    en:{
        title:"📿 Digital Tasbih",
        click:"Click",
        reset:"Reset"
    },
    hi:{
        title:"📿 डिजिटल तस्बीह",
        click:"क्लिक",
        reset:"रीसेट"
    }
};

// ================= GLOBAL =================

let count = 0;

// ================= LOCAL STORAGE =================

function loadCount(){
    const saved = localStorage.getItem("tasbih_count");
    count = saved ? parseInt(saved) : 0;
}

function saveCount(){
    localStorage.setItem("tasbih_count", count);
}

// ================= NUMBER FORMAT =================

function formatNumber(num){
    const lang = getLang();

    if(lang === "bn"){
        return num.toString().replace(/[0-9]/g, d=>"০১২৩৪৫৬৭৮৯"[d]);
    }

    if(lang === "hi"){
        return num.toString().replace(/[0-9]/g, d=>"०१२३४५६७८९"[d]);
    }

    return num;
}

// ================= UI UPDATE =================

function updateUI(){
    document.getElementById("counter").innerText = formatNumber(count);
}

// ================= ACTION =================

function increment(){
    count++;
    saveCount();
    updateUI();

    // vibration (mobile)
    if(navigator.vibrate){
        navigator.vibrate(30);
    }
}

function reset(){
    count = 0;
    saveCount();
    updateUI();
}

// ================= INIT =================

document.addEventListener("DOMContentLoaded", ()=>{

    const lang = getLang();
    const t = TEXT[lang] || TEXT["bn"];

    // set text
    document.getElementById("title").innerText = t.title;
    document.getElementById("btnClick").innerText = t.click;
    document.getElementById("btnReset").innerText = t.reset;

    // load count
    loadCount();

    // show count
    updateUI();
});
