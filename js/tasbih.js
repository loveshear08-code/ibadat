// ================= LANGUAGE =================

function getLang(){
    try{
        const s = getSettings();
        return s.lang || "bn";
    }catch{
        return "bn";
    }
}

// ================= TEXT =================

const TEXT = {
bn:{title:"📿 ডিজিটাল তসবিহ", reset:"রিসেট"},
en:{title:"📿 Digital Tasbih", reset:"Reset"},
hi:{title:"📿 डिजिटल तस्बीह", reset:"रीसेट"}
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
    document.getElementById("counter").innerText = formatNumber(count);
}

// ================= TAP ACTION =================

function increment(){

    count++;
    saveCount();
    updateUI();

    // vibration
    if(navigator.vibrate){
        navigator.vibrate(20);
    }

    // animation
    let c = document.getElementById("counter");
    c.classList.add("tap");
    setTimeout(()=>c.classList.remove("tap"),100);
}

// ================= RESET =================

function reset(e){
    e.stopPropagation(); // prevent tap
    count = 0;
    saveCount();
    updateUI();
}

// ================= INIT =================

document.addEventListener("DOMContentLoaded", ()=>{

    const lang = getLang();
    const t = TEXT[lang] || TEXT["bn"];

    document.getElementById("title").innerText = t.title;
    document.getElementById("btnReset").innerText = t.reset;

    loadCount();
    updateUI();

    // FULL SCREEN TAP
    document.getElementById("tapArea").addEventListener("click", increment);

});
