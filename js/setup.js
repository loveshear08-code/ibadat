// Get Location
function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

// save location
localStorage.setItem("lat", lat);
localStorage.setItem("lon", lon);

alert("Location saved successfully");

}, function(){

alert("Location permission denied");

});

}else{

alert("Geolocation not supported");

}

}


// Continue Button
function continueApp(){

// language value
let lang = document.getElementById("language").value;

// save language
localStorage.setItem("appLang", lang);

// go to home page
window.location.href = "home.html";

}
