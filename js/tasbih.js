alert("Tasbih JS Loaded");
// ================= SAFE LANGUAGE =================

function getLang(){
    try{
        if(typeof getSettings === "function"){
            const s = getSettings();
            return s.lang || "bn";
        }
        return "bn";
    }catch{
        return "bn";
    }
}

// ================= TEXT =================

const TEXT = {
bn:{title:"📿 ডিজিটাল তসবিহ", click:"ক্লিক", reset:"রিসেট"},
en:{title:"📿 Digital Tasbih", click:"Click", reset:"Reset"},
hi:{title:"📿 डिजिटल तस्बीह", click:"क्लिक", reset:"रीसेट"}
};

// ================= GLOBAL =================

let count = 0;

// ================= STORAGE =================

function loadCount(){
    const saved = localStorage.getItem("tasbih_count");
    count = saved ? parseInt(saved) : 0;
}

function saveCount(){
    localStorage.setItem("tasbih_count", count);
}

// ================= NUMBER =================

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

// ================= UI =================

function updateUI(){
    const el = document.getElementById("counter");
    if(el) el.innerText = formatNumber(count);
}

// ================= ACTION =================

function increment(){
    count++;
    saveCount();
    updateUI();

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

    const title = document.getElementById("title");
    const btnClick = document.getElementById("btnClick");
    const btnReset = document.getElementById("btnReset");

    if(title) title.innerText = t.title;
    if(btnClick) btnClick.innerText = t.click;
    if(btnReset) btnReset.innerText = t.reset;

    loadCount();
    updateUI();
});
