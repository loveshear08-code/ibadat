// NOTIFICATION PERMISSION
if(Notification.permission!=="granted"){
    Notification.requestPermission();
}

// PLAY AZAN
function playAutoAzan(){
    const sound = localStorage.getItem("azanVoice") || "makkah.mp3";

    let audio = new Audio("../assets/"+sound);
    audio.play();

    if(Notification.permission==="granted"){
        new Notification("🕌 নামাজের সময় হয়েছে");
    }
}

// CHECK TIME
function checkAzanTime(){

    const now = new Date();
    const current = now.getHours() + ":" + now.getMinutes().toString().padStart(2,"0");

    // ⚠️ DEMO TIMES (তুমি পরে change করবে)
    const times = ["05:00","13:30","16:45","18:30","20:00"];

    if(times.includes(current)){
        playAutoAzan();
    }
}

// RUN EVERY MINUTE
setInterval(checkAzanTime,60000);
