/* GET LOCATION */

function getLocation() {

if (navigator.geolocation) {

navigator.geolocation.getCurrentPosition(

  function (position) {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // Save location
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);

    alert("Location saved successfully");

  },

  function () {

    alert("Location permission denied");

  }

);

} else {

alert("Geolocation not supported");

}

}

/* CONTINUE BUTTON */

function continueApp() {

// Language value
let lang = document.getElementById("language").value;

// Save language
localStorage.setItem("appLang", lang);

// Go to home page
window.location.href = "html/home.html";

}
