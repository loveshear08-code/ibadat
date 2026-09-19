/* =========================================================
   IBADAT QIBLA - REFRESHED FINAL VERSION
   ========================================================= */


/* ================= CONSTANTS ================= */

const KAABA_LAT = 21.422487;
const KAABA_LON = 39.826206;


/* ================= LANGUAGE ================= */

const QIBLA_TEXT = {

    bn: {
        title: "কিবলা",
        location: "বর্তমান অবস্থান",
        locating: "লোকেশন খোঁজা হচ্ছে...",
        qiblaDirection: "কিবলার দিক",
        distance: "মক্কার দূরত্ব",
        start: "কম্পাস চালু করুন",
        started: "কম্পাস চালু হয়েছে",
        permission: "কম্পাস ব্যবহারের অনুমতি দিন",
        locationError: "লোকেশন পাওয়া যায়নি",
        compassError: "আপনার ডিভাইসে কম্পাস সাপোর্ট পাওয়া যায়নি"
    },

    en: {
        title: "Qibla",
        location: "Current Location",
        locating: "Finding location...",
        qiblaDirection: "Qibla Direction",
        distance: "Distance to Makkah",
        start: "Start Compass",
        started: "Compass started",
        permission: "Allow compass permission",
        locationError: "Location unavailable",
        compassError: "Compass is not supported on this device"
    },

    hi: {
        title: "क़िबला",
        location: "वर्तमान स्थान",
        locating: "स्थान खोजा जा रहा है...",
        qiblaDirection: "क़िबला दिशा",
        distance: "मक्का की दूरी",
        start: "कम्पास चालू करें",
        started: "कम्पास चालू हो गया",
        permission: "कम्पास की अनुमति दें",
        locationError: "स्थान उपलब्ध नहीं",
        compassError: "इस डिवाइस में कम्पास उपलब्ध नहीं है"
    }
};


/* ================= SETTINGS ================= */

function getLanguage(){

    try{

        const saved =
            localStorage.getItem("appSettings");

        if(saved){

            const settings =
                JSON.parse(saved);

            return settings.lang || "bn";
        }

    }catch(e){}

    return "bn";
}


function getText(){

    return QIBLA_TEXT[
        getLanguage()
    ] || QIBLA_TEXT.bn;
}


/* ================= DOM ================= */

const pageTitle =
    document.getElementById("pageTitle");

const locationLabel =
    document.getElementById("locationLabel");

const locationName =
    document.getElementById("locationName");

const distanceLabel =
    document.getElementById("distanceLabel");

const distance =
    document.getElementById("distance");

const directionText =
    document.getElementById("directionText");

const qiblaDegree =
    document.getElementById("qiblaDegree");

const startCompassBtn =
    document.getElementById("startCompass");

const compassMessage =
    document.getElementById("compassMessage");

const qiblaArrow =
    document.getElementById("qiblaArrow");

const backBtn =
    document.getElementById("backBtn");


/* ================= LOCATION STATE ================= */

let latitude = null;
let longitude = null;

let userLocationLoaded = false;

let qiblaBearing = 0;

let compassStarted = false;


/* ================= LANGUAGE APPLY ================= */

function applyLanguage(){

    const t = getText();


    if(pageTitle){

        pageTitle.innerText =
            t.title;
    }


    if(locationLabel){

        locationLabel.innerText =
            t.location;
    }


    if(
        locationName &&
        !userLocationLoaded
    ){

        locationName.innerText =
            t.locating;
    }


    if(distanceLabel){

        distanceLabel.innerText =
            t.distance;
    }


    if(directionText){

        directionText.innerText =
            t.qiblaDirection;
    }


    if(startCompassBtn){

        startCompassBtn.innerText =
            compassStarted
                ? t.started
                : t.start;
    }


    updateDegreeText();
}


/* ================= BACK BUTTON ================= */

if(backBtn){

    backBtn.onclick = function(){

        window.location.href =
            "../index.html";

    };
}


/* ================= NUMBER ================= */

function localNumber(number){

    const lang =
        getLanguage();


    if(lang === "bn"){

        return number
            .toString()
            .replace(
                /\d/g,
                d => "০১২৩৪৫৬৭৮৯"[d]
            );
    }


    if(lang === "hi"){

        return number
            .toString()
            .replace(
                /\d/g,
                d => "०१२३४५६७८९"[d]
            );
    }


    return number.toString();
}


/* ================= GET LOCATION ================= */

function getLocation(){

    if(!navigator.geolocation){

        locationName.innerText =
            getText().locationError;

        return;
    }


    navigator.geolocation.getCurrentPosition(

        position => {

            latitude =
                position.coords.latitude;

            longitude =
                position.coords.longitude;


            userLocationLoaded =
                true;


            /* LOCATION */

            showLocation();


            /* QIBLA */

            calculateQibla();


            /* DISTANCE */

            calculateDistance();

        },


        error => {

            locationName.innerText =
                getText().locationError;

        },


        {
            enableHighAccuracy:true,
            timeout:15000,
            maximumAge:60000
        }
    );
}


/* ================= REVERSE LOCATION ================= */

async function showLocation(){

    try{

        const url =
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;


        const response =
            await fetch(url);


        if(!response.ok){

            throw new Error(
                "Reverse location failed"
            );
        }


        const data =
            await response.json();


        const address =
            data.address || {};


        const name =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            address.state ||
            "Location";


        locationName.innerText =
            name;

    }catch(e){

        if(
            latitude !== null &&
            longitude !== null
        ){

            locationName.innerText =
                `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        }
    }
}


/* ================= QIBLA CALCULATION ================= */

function calculateQibla(){

    if(
        latitude === null ||
        longitude === null
    ){

        return;
    }


    const lat1 =
        latitude *
        Math.PI /
        180;


    const lon1 =
        longitude *
        Math.PI /
        180;


    const lat2 =
        KAABA_LAT *
        Math.PI /
        180;


    const lon2 =
        KAABA_LON *
        Math.PI /
        180;


    const deltaLon =
        lon2 - lon1;


    const y =
        Math.sin(deltaLon) *
        Math.cos(lat2);


    const x =
        Math.cos(lat1) *
        Math.sin(lat2)
        -
        Math.sin(lat1) *
        Math.cos(lat2) *
        Math.cos(deltaLon);


    let bearing =
        Math.atan2(y, x) *
        180 /
        Math.PI;


    bearing =
        (bearing + 360) % 360;


    qiblaBearing =
        bearing;


    updateDegreeText();
}


/* ================= DEGREE ================= */

function updateDegreeText(){

    if(!qiblaDegree) return;


    qiblaDegree.innerText =
        localNumber(
            Math.round(qiblaBearing)
        ) + "°";
}


/* ================= DISTANCE ================= */

function calculateDistance(){

    if(
        latitude === null ||
        longitude === null
    ){

        return;
    }


    const R = 6371;


    const lat1 =
        latitude *
        Math.PI /
        180;


    const lat2 =
        KAABA_LAT *
        Math.PI /
        180;


    const deltaLat =
        (KAABA_LAT - latitude) *
        Math.PI /
        180;


    const deltaLon =
        (KAABA_LON - longitude) *
        Math.PI /
        180;


    const a =
        Math.sin(deltaLat / 2) *
        Math.sin(deltaLat / 2)
        +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    const km =
        R * c;


    if(km >= 1000){

        const value =
            (km / 1000).toFixed(1);


        distance.innerText =
            localNumber(value) +
            " km";

    }else{

        const value =
            Math.round(km);


        distance.innerText =
            localNumber(value) +
            " km";
    }
}


/* ================= COMPASS ================= */

function handleOrientation(event){

    let heading = null;


    /*
       iPhone / iPad
    */

    if(
        typeof event.webkitCompassHeading ===
        "number"
    ){

        heading =
            event.webkitCompassHeading;
    }


    /*
       Android / Other browsers
    */

    else if(
        typeof event.alpha ===
        "number"
    ){

        heading =
            360 - event.alpha;
    }


    if(heading === null){

        return;
    }


    const rotation =
        qiblaBearing -
        heading;


    if(qiblaArrow){

        qiblaArrow.style.transform =
            `translateX(-50%) rotate(${rotation}deg)`;
    }
}


/* ================= START COMPASS ================= */

async function startCompass(){

    if(compassStarted){

        return;
    }


    const t =
        getText();


    try{

        /*
           iPhone / iPad permission
        */

        if(
            typeof DeviceOrientationEvent !==
            "undefined" &&

            typeof DeviceOrientationEvent
                .requestPermission ===
            "function"
        ){

            const permission =
                await DeviceOrientationEvent
                    .requestPermission();


            if(permission !== "granted"){

                compassMessage.innerText =
                    t.permission;

                return;
            }
        }


        /*
           Compass events
        */

        window.addEventListener(
            "deviceorientationabsolute",
            handleOrientation,
            true
        );


        window.addEventListener(
            "deviceorientation",
            handleOrientation,
            true
        );


        compassStarted =
            true;


        if(startCompassBtn){

            startCompassBtn.innerText =
                t.started;
        }


        if(compassMessage){

            compassMessage.innerText =
                "";
        }

    }catch(e){

        if(compassMessage){

            compassMessage.innerText =
                t.compassError;
        }
    }
}


/* ================= BUTTON ================= */

if(startCompassBtn){

    startCompassBtn.addEventListener(
        "click",
        startCompass
    );
}


/* ================= INIT ================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        applyLanguage();

        getLocation();

    }
);


/* ================= LANGUAGE WATCH ================= */

window.currentQiblaLang =
    getLanguage();


setInterval(

    () => {

        const newLang =
            getLanguage();


        if(
            newLang !==
            window.currentQiblaLang
        ){

            window.currentQiblaLang =
                newLang;


            applyLanguage();
        }

    },

    1000
);
