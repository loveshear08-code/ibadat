/* =========================================================
   IBADAT QIBLA - FRESH GPS FINAL VERSION
   ========================================================= */


/* ================= CONSTANTS ================= */

const KAABA_LAT = 21.422487;
const KAABA_LON = 39.826206;

const IBADAT_LOCATION_KEY =
    "IBADAT_LOCATION";


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
        compassError: "আপনার ডিভাইসে কম্পাস সাপোর্ট পাওয়া যায়নি",
        holdFlat: "ফোনটি সমতলভাবে ধরে ধীরে ঘোরান"
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
        compassError: "Compass is not supported on this device",
        holdFlat: "Hold the phone flat and rotate slowly"
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
        compassError: "इस डिवाइस में कम्पास उपलब्ध नहीं है",
        holdFlat: "फ़ोन को समतल रखें और धीरे-धीरे घुमाएँ"
    }
};


/* ================= SETTINGS ================= */

function getLanguage(){

    try{

        const saved =
            localStorage.getItem(
                "appSettings"
            );

        if(saved){

            const settings =
                JSON.parse(saved);

            if(
                settings &&
                (
                    settings.lang === "bn" ||
                    settings.lang === "en" ||
                    settings.lang === "hi"
                )
            ){

                return settings.lang;
            }
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
    document.getElementById(
        "pageTitle"
    );

const locationLabel =
    document.getElementById(
        "locationLabel"
    );

const locationName =
    document.getElementById(
        "locationName"
    );

const distanceLabel =
    document.getElementById(
        "distanceLabel"
    );

const distance =
    document.getElementById(
        "distance"
    );

const directionText =
    document.getElementById(
        "directionText"
    );

const qiblaDegree =
    document.getElementById(
        "qiblaDegree"
    );

const startCompassBtn =
    document.getElementById(
        "startCompass"
    );

const compassMessage =
    document.getElementById(
        "compassMessage"
    );

const qiblaArrow =
    document.getElementById(
        "qiblaArrow"
    );

const backBtn =
    document.getElementById(
        "backBtn"
    );


/* ================= LOCATION STATE ================= */

let latitude = null;

let longitude = null;

let userLocationLoaded = false;

let qiblaBearing = 0;


/* ================= COMPASS STATE ================= */

let compassStarted = false;

let lastHeading = null;


/* =========================================================
   LANGUAGE APPLY
   ========================================================= */

function applyLanguage(){

    const t =
        getText();


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


/* ================= BACK ================= */

if(backBtn){

    backBtn.onclick = function(){

        window.location.href =
            "../index.html";
    };
}


/* =========================================================
   NUMBER
   ========================================================= */

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


/* =========================================================
   FRESH GPS LOCATION
   ========================================================= */

function getFreshLocation(){

    if(!navigator.geolocation){

        locationName.innerText =
            getText().locationError;

        return;
    }


    locationName.innerText =
        getText().locating;


    navigator.geolocation.getCurrentPosition(

        async position => {

            /*
               প্রতিবার Qibla খুললে
               নতুন GPS coordinate নেওয়া হচ্ছে।
            */

            latitude =
                position.coords.latitude;


            longitude =
                position.coords.longitude;


            userLocationLoaded =
                true;


            /*
               নতুন coordinate প্রথমে save।
            */

            saveSharedLocation();


            /*
               নতুন coordinate থেকে
               নতুন location name।
            */

            await reverseLocation();


            /*
               নতুন coordinate থেকেই
               Qibla calculation।
            */

            calculateQibla();


            calculateDistance();

        },


        error => {

            /*
               Fresh GPS না পাওয়া গেলে
               পুরোনো shared location fallback।
            */

            loadSharedLocationFallback();

        },


        {

            enableHighAccuracy:
                true,

            timeout:
                20000,

            maximumAge:
                0
        }
    );
}


/* =========================================================
   SHARED LOCATION FALLBACK
   ========================================================= */

function loadSharedLocationFallback(){

    try{

        const saved =
            localStorage.getItem(
                IBADAT_LOCATION_KEY
            );


        if(!saved){

            locationName.innerText =
                getText().locationError;

            return;
        }


        const data =
            JSON.parse(saved);


        if(
            !data ||
            typeof data.latitude !== "number" ||
            typeof data.longitude !== "number"
        ){

            locationName.innerText =
                getText().locationError;

            return;
        }


        latitude =
            data.latitude;


        longitude =
            data.longitude;


        userLocationLoaded =
            true;


        if(
            data.city &&
            locationName
        ){

            locationName.innerText =
                data.city;
        }


        calculateQibla();

        calculateDistance();


    }catch(e){

        locationName.innerText =
            getText().locationError;
    }
}


/* =========================================================
   SAVE SHARED LOCATION
   ========================================================= */

function saveSharedLocation(){

    if(
        latitude === null ||
        longitude === null
    ){

        return;
    }


    try{

        let oldData = {};


        const saved =
            localStorage.getItem(
                IBADAT_LOCATION_KEY
            );


        if(saved){

            oldData =
                JSON.parse(saved) || {};
        }


        const data = {

            latitude:
                latitude,

            longitude:
                longitude,

            city:
                oldData.city || "",

            updatedAt:
                Date.now()
        };


        localStorage.setItem(

            IBADAT_LOCATION_KEY,

            JSON.stringify(data)
        );


    }catch(e){

        console.error(
            "Location save error:",
            e
        );
    }
}


/* =========================================================
   REVERSE LOCATION
   ========================================================= */

async function reverseLocation(){

    if(
        latitude === null ||
        longitude === null
    ){

        return;
    }


    try{

        const lang =
            getLanguage();


        const url =

            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${lang}`;


        const response =
            await fetch(url);


        if(!response.ok){

            throw new Error(
                "Reverse geocoding failed"
            );
        }


        const data =
            await response.json();


        const city =

            data.locality ||

            data.city ||

            data.district ||

            data.principalSubdivision ||

            data.countryName ||

            "";


        if(city){

            locationName.innerText =
                city;


            try{

                const shared = {

                    latitude:
                        latitude,

                    longitude:
                        longitude,

                    city:
                        city,

                    updatedAt:
                        Date.now()
                };


                localStorage.setItem(

                    IBADAT_LOCATION_KEY,

                    JSON.stringify(shared)
                );

            }catch(e){}
        }


    }catch(e){

        /*
           GPS coordinate ঠিক থাকলে
           reverse location না পেলেও
           calculation চলবে।
        */

        const saved =
            localStorage.getItem(
                IBADAT_LOCATION_KEY
            );


        if(saved){

            try{

                const data =
                    JSON.parse(saved);


                if(data.city){

                    locationName.innerText =
                        data.city;
                }

            }catch(e){}
        }
    }
}


/* =========================================================
   QIBLA BEARING
   ========================================================= */

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

        Math.atan2(
            y,
            x
        ) *
        180 /
        Math.PI;


    bearing =
        (bearing + 360) % 360;


    /*
       IMPORTANT:

       এই bearing হলো
       GPS location → Kaaba-এর
       স্থির true bearing।

       ফোন ঘোরালেও এই number
       পরিবর্তন হবে না।
    */

    qiblaBearing =
        bearing;


    updateDegreeText();
}


/* =========================================================
   DEGREE DISPLAY
   ========================================================= */

function updateDegreeText(){

    if(!qiblaDegree){

        return;
    }


    qiblaDegree.innerText =

        localNumber(
            Math.round(qiblaBearing)
        ) +

        "°";
}


/* =========================================================
   MAKKAH DISTANCE
   ========================================================= */

function calculateDistance(){

    if(
        latitude === null ||
        longitude === null
    ){

        return;
    }


    const R =
        6371;


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


    /*
       1000 km-এর বেশি হলে
       হাজারে দেখানো হবে।
    */

    if(km >= 1000){

        const value =
            (km / 1000).toFixed(1);


        const lang =
            getLanguage();


        let unit =
            "হাজার কিমি";


        if(lang === "en"){

            unit =
                "thousand km";

        }else if(lang === "hi"){

            unit =
                "हज़ार किमी";
        }


        distance.innerText =

            localNumber(value) +
            " " +
            unit;

    }else{

        const value =
            km.toFixed(1);


        const lang =
            getLanguage();


        let unit =
            "কিমি";


        if(lang === "en"){

            unit =
                "km";

        }else if(lang === "hi"){

            unit =
                "किमी";
        }


        distance.innerText =

            localNumber(value) +
            " " +
            unit;
    }
}


/* =========================================================
   ANGLE NORMALIZE
   ========================================================= */

function normalizeAngle(angle){

    return (
        angle + 360
    ) % 360;
}


/* =========================================================
   SMOOTH COMPASS
   ========================================================= */

function smoothHeading(
    heading
){

    if(lastHeading === null){

        lastHeading =
            heading;

        return heading;
    }


    let difference =

        heading -
        lastHeading;


    if(difference > 180){

        difference -=
            360;
    }


    if(difference < -180){

        difference +=
            360;
    }


    lastHeading =

        normalizeAngle(

            lastHeading +
            difference * 0.25
        );


    return lastHeading;
}


/* =========================================================
   DEVICE ORIENTATION
   ========================================================= */

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
       Android absolute orientation
    */

    else if(

        event.absolute === true &&

        typeof event.alpha ===
        "number"

    ){

        heading =

            normalizeAngle(
                360 -
                event.alpha
            );
    }


    /*
       Browser fallback
    */

    else if(
        typeof event.alpha ===
        "number"
    ){

        heading =

            normalizeAngle(
                360 -
                event.alpha
            );
    }


    if(heading === null){

        return;
    }


    heading =
        smoothHeading(
            heading
        );


    /*
       IMPORTANT:

       Qibla bearing স্থির থাকবে।

       শুধু arrow-এর rotation
       phone heading অনুযায়ী বদলাবে।
    */

    const rotation =

        qiblaBearing -
        heading;


    if(qiblaArrow){

        qiblaArrow.style.transform =

            `translateX(-50%) rotate(${rotation}deg)`;
    }
}


/* =========================================================
   START COMPASS
   ========================================================= */

async function startCompass(){

    if(compassStarted){

        return;
    }


    const t =
        getText();


    try{

        /*
           iPhone / iPad
        */

        if(

            typeof DeviceOrientationEvent !==
            "undefined"

            &&

            typeof DeviceOrientationEvent
                .requestPermission ===
            "function"

        ){

            const permission =

                await DeviceOrientationEvent
                    .requestPermission();


            if(
                permission !==
                "granted"
            ){

                compassMessage.innerText =
                    t.permission;

                return;
            }
        }


        /*
           Absolute orientation
        */

        window.addEventListener(

            "deviceorientationabsolute",

            handleOrientation,

            true
        );


        /*
           Normal orientation fallback
        */

        window.addEventListener(

            "deviceorientation",

            handleOrientation,

            true
        );


        compassStarted =
            true;


        lastHeading =
            null;


        if(startCompassBtn){

            startCompassBtn.innerText =
                t.started;
        }


        if(compassMessage){

            compassMessage.innerText =
                t.holdFlat;
        }


    }catch(e){

        if(compassMessage){

            compassMessage.innerText =
                t.compassError;
        }
    }
}


/* =========================================================
   INIT
   ========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        applyLanguage();


        /*
           IMPORTANT:

           Qibla page খুললেই
           প্রথমে FRESH GPS নেওয়া হবে।

           পুরোনো location সরাসরি
           ব্যবহার করা হবে না।
        */

        getFreshLocation();

    }
);


/* =========================================================
   LANGUAGE WATCH
   ========================================================= */

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


            /*
               একই GPS coordinate রেখে
               নতুন ভাষায় location name।
            */

            if(
                latitude !== null &&
                longitude !== null
            ){

                await reverseLocation();

calculateQibla();

calculateDistance();

startCompass();
            }
        }

    },

    1000
);
