function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(function(position){

localStorage.setItem("lat", position.coords.latitude);
localStorage.setItem("lon", position.coords.longitude);

alert("Location saved");

}, function(){

alert("Location permission denied");

});

}else{

alert("Geolocation not supported");

}

}


function continueApp(){

let lang = document.getElementById("language").value;

localStorage.setItem("appLang", lang);

window.location.href = "home.html";

}