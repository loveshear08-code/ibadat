let count = 0;

/* LOAD */
function loadTasbih(){
    let saved = localStorage.getItem("tasbihCount");
    count = saved ? parseInt(saved) : 0;
    update();
}

/* UPDATE UI */
function update(){
    document.getElementById("count").innerText = count;
}

/* TAP */
function increase(){
    count++;

    /* vibration */
    if(navigator.vibrate){
        navigator.vibrate(50);
    }

    save();
    update();
}

/* RESET */
function resetTasbih(){
    if(confirm("Reset Tasbih?")){
        count = 0;
        save();
        update();
    }
}

/* SAVE */
function save(){
    localStorage.setItem("tasbihCount", count);
}

/* INIT */
document.addEventListener("DOMContentLoaded", loadTasbih);
