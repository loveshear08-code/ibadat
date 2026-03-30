// ================= SAFE LANG =================
function getLang(){
    try{
        if(typeof getSettings === "function"){
            return getSettings().lang || "bn";
        }
        return "bn";
    }catch{
        return "bn";
    }
}

// ================= TEXT =================
const TEXT = {
bn:{title:"📿 তসবিহ", reset:"রিসেট"},
en:{title:"📿 Tasbih", reset:"Reset"},
hi:{title:"📿 तस्बीह", reset:"रीसेट"}
};

// ================= GLOBAL =================
let count = 0;

// ================= STORAGE =================
function load(){
    let s = localStorage.getItem("tasbih_count");
    count = s ? parseInt(s) : 0;
}

function save(){
    localStorage.setItem("tasbih_count", count);
}

// ================= FORMAT =================
function format(n){
    let lang = getLang();

    if(lang==="bn"){
        return n.toString().replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
    }
    if(lang==="hi"){
        return n.toString().replace(/[0-9]/g,d=>"०१२३४५६७८९"[d]);
    }
    return n;
}

// ================= UI =================
function update(){
    document.getElementById("counter").innerText = format(count);
}

// ================= ACTION =================
function increment(){
    count++;
    save();
    update();

    if(navigator.vibrate){
        navigator.vibrate(20);
    }
}

function reset(){
    count = 0;
    save();
    update();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded",()=>{

    let lang = getLang();
    let t = TEXT[lang] || TEXT["bn"];

    document.getElementById("title").innerText = t.title;
    document.getElementById("btnReset").innerText = t.reset;

    load();
    update();

    // FULL SCREEN TAP
    document.getElementById("tapArea").addEventListener("click", increment);

    // RESET BUTTON
    document.getElementById("btnReset").addEventListener("click",(e)=>{
        e.stopPropagation();
        reset();
    });

});
