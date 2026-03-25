function getLocation(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(pos=>{

            localStorage.setItem("lat", pos.coords.latitude);
            localStorage.setItem("lon", pos.coords.longitude);

            alert("Location Saved ✔️");

        },()=>{
            alert("Location Permission Denied ❌");
        });

    }
}

function continueApp(){

    const lang = document.getElementById("language").value;

    localStorage.setItem("appLang", lang);

    window.location.href = "html/home.html";
}

/* AUTO REDIRECT */

if(localStorage.getItem("appLang")){
    window.location.href = "html/home.html";
}
