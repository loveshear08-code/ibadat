const lang = localStorage.getItem("appLang") || "bn";

/* LANGUAGE DATA */

const text={

bn:{
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],

fajr:"ফজর",
sunrise:"সূর্যোদয়",
dhuhr:"জোহর",
asr:"আসর",
maghrib:"মাগরিব",
isha:"এশা",

namaz:"📚 নামাজ শিক্ষা",
quran:"🕌 আল কুরআন",
dua:"🤲 দোয়া",
hadith:"📖 হাদিস",
qibla:"🕋 কিবলা কম্পাস",
tasbih:"📿 ডিজিটাল তসবিহ",

bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",

weather:{
clear:"পরিষ্কার",
cloud:"মেঘলা",
rain:"বৃষ্টি",
snow:"তুষার",
storm:"ঝড়"
},

quotes:[
"নামাজ জান্নাতের চাবি",
"আল্লাহকে স্মরণ করো",
"ধৈর্যশীলদের সাথে আল্লাহ আছেন"
]

},

en:{
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],

fajr:"Fajr",
sunrise:"Sunrise",
dhuhr:"Dhuhr",
asr:"Asr",
maghrib:"Maghrib",
isha:"Isha",

namaz:"📚 Namaz Guide",
quran:"🕌 Al Quran",
dua:"🤲 Dua",
hadith:"📖 Hadith",
qibla:"🕋 Qibla Compass",
tasbih:"📿 Digital Tasbih",

bismillah:"In the name of Allah, the Most Merciful",

weather:{
clear:"Clear",
cloud:"Cloudy",
rain:"Rain",
snow:"Snow",
storm:"Storm"
},

quotes:[
"Prayer is the key to Paradise",
"Remember Allah",
"Allah is with the patient"
]

}

};

const T=text[lang];

/* NUMBER CONVERT */

function convertNumber(str){

if(lang==="bn"){
const bn=["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
return str.replace(/[0-9]/g,d=>bn[d]);
}

return str;

}

/* TEXT SET */

document.getElementById("bismillahMeaning").innerText=T.bismillah;

document.getElementById("namaz").innerText=T.namaz;
document.getElementById("quran").innerText=T.quran;
document.getElementById("dua").innerText=T.dua;
document.getElementById("hadith").innerText=T.hadith;
document.getElementById("qibla").innerText=T.qibla;
document.getElementById("tasbih").innerText=T.tasbih;

/* DATE */

let today=new Date();

document.getElementById("date").innerText=
convertNumber(today.toLocaleDateString("en-GB"));

document.getElementById("todayDay").innerText=
T.days[today.getDay()];

/* CLOCK */

function updateClock(){

let now=new Date();
let time=now.toLocaleTimeString("en-GB",{hour12:false});

document.getElementById("clock").innerText=
convertNumber(time);

}

setInterval(updateClock,1000);
updateClock();

/* PRAYER API */

let prayerTimes=[];
let nextTime=null;

function loadPrayerTimes(lat,lon){

fetch("https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2")
.then(res=>res.json())
.then(data=>{

let t=data.data.timings;

prayerTimes=[

{name:T.fajr,time:t.Fajr},
{name:T.sunrise,time:t.Sunrise},
{name:T.dhuhr,time:t.Dhuhr},
{name:T.asr,time:t.Asr},
{name:T.maghrib,time:t.Maghrib},
{name:T.isha,time:t.Isha}

];

renderPrayerGrid();
updatePrayer();

});

}

/* PRAYER GRID */

function renderPrayerGrid(){

let grid=document.getElementById("prayerGrid");
grid.innerHTML="";

prayerTimes.forEach(p=>{

let box=document.createElement("div");
box.className="prayer-box";

box.innerHTML="<b>"+p.name+"</b><br>"+convertNumber(p.time);

grid.appendChild(box);

});

}

/* CURRENT + NEXT PRAYER */

function updatePrayer(){

let now=new Date();
let found=false;

for(let i=0;i<prayerTimes.length;i++){

let [h,m]=prayerTimes[i].time.split(":");

let pt=new Date();
pt.setHours(h);
pt.setMinutes(m);
pt.setSeconds(0);

if(now<pt){

document.getElementById("currentPrayerName").innerText=
i===0?prayerTimes[5].name:prayerTimes[i-1].name;

document.getElementById("nextPrayerName").innerText=
prayerTimes[i].name;

nextTime=pt;

found=true;

break;

}

}

if(!found){

document.getElementById("currentPrayerName").innerText=
prayerTimes[5].name;

document.getElementById("nextPrayerName").innerText=
prayerTimes[0].name;

}

}

/* COUNTDOWN */

function updateCountdown(){

if(!nextTime)return;

let diff=Math.floor((nextTime-new Date())/1000);

let h=Math.floor(diff/3600);
let m=Math.floor((diff%3600)/60);
let s=Math.floor(diff%60);

let time=
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

document.getElementById("countdown").innerText=
convertNumber(time);

}

setInterval(updatePrayer,30000);
setInterval(updateCountdown,1000);

/* WEATHER */

function loadWeather(lat,lon){

fetch("https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true")
.then(res=>res.json())
.then(data=>{

let temp=data.current_weather.temperature;

document.getElementById("weather").innerText=
convertNumber(temp+"°C");

});

}

/* CITY */

function loadCityName(lat,lon){

fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=${lang}")
.then(res=>res.json())
.then(data=>{

let city =
data.address.city ||
data.address.town ||
data.address.village ||
data.address.state ||
"";

document.getElementById("city").innerText = city;

})

.catch(()=>{

document.getElementById("city").innerText = "Location";

});

}

/* GEOLOCATION */

/* GEOLOCATION FIX */

function startApp(lat,lon){

loadPrayerTimes(lat,lon);
loadWeather(lat,lon);
loadCityName(lat,lon);

}

let savedLat = localStorage.getItem("lat");
let savedLon = localStorage.getItem("lon");

if(savedLat && savedLon){

startApp(savedLat,savedLon);

}else{

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

function(pos){

let lat = pos.coords.latitude;
let lon = pos.coords.longitude;

localStorage.setItem("lat",lat);
localStorage.setItem("lon",lon);

startApp(lat,lon);

},

function(){

/* fallback Kolkata */

startApp(22.5726,88.3639);

}

);

}else{

startApp(22.5726,88.3639);

}

}

/* FEATURES */

document.getElementById("bismillahCard").onclick=()=>{
window.location.href="allah-names.html";
};

document.getElementById("statusBoard").onclick=()=>{
window.location.href="calendar.html";
};

document.getElementById("namaz").onclick=()=>{
window.location.href="namaz-guide.html";
};

document.getElementById("quran").onclick=()=>{
window.location.href="quran.html";
};

document.getElementById("dua").onclick=()=>{
window.location.href="dua.html";
};

document.getElementById("hadith").onclick=()=>{
window.location.href="hadith.html";
};

document.getElementById("qibla").onclick=()=>{
window.location.href="qibla.html";
};

document.getElementById("tasbih").onclick=()=>{
window.location.href="tasbih.html";
};

/* QUOTE */

function updateQuote(){

let q=T.quotes[Math.floor(Math.random()*T.quotes.length)];
document.getElementById("bottomText").innerText=q;

}

updateQuote();
setInterval(updateQuote,3600000);

/* AZAN SYSTEM */

let lastAzanPlayed = null;

if ("Notification" in window) {
Notification.requestPermission();
}

function playAzan(prayerName) {

let azan = localStorage.getItem("azanSound") || "kuwait";

const audio = new Audio("../assets/" + azan + ".mp3");

audio.play().catch(() => {});

}

function checkAzan() {

if (!prayerTimes.length) return;

let now = new Date();

let current =
String(now.getHours()).padStart(2, "0") + ":" +
String(now.getMinutes()).padStart(2, "0");

prayerTimes.forEach(p => {

if (p.time === current && lastAzanPlayed !== p.name) {

playAzan(p.name);

lastAzanPlayed = p.name;

}

});

}

setInterval(checkAzan, 30000);
