/* =========================
   🔥 LANGUAGE
========================= */

const lang = localStorage.getItem("appLang") || "bn";

const text = {
bn:{
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
fajr:"ফজর", sunrise:"সূর্যোদয়", dhuhr:"জোহর", asr:"আসর", maghrib:"মাগরিব", isha:"এশা",
namaz:"📚 নামাজ শিক্ষা", quran:"🕌 আল কুরআন", dua:"🤲 দোয়া", hadith:"📖 হাদিস",
qibla:"🕋 কিবলা কম্পাস", tasbih:"📿 ডিজিটাল তসবিহ",
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
weather:{clear:"পরিষ্কার",cloud:"মেঘলা",rain:"বৃষ্টি",snow:"তুষার",storm:"ঝড়"},
quotes:["নামাজ জান্নাতের চাবি","আল্লাহকে স্মরণ করো","ধৈর্যশীলদের সাথে আল্লাহ আছেন"]
},
en:{
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
fajr:"Fajr", sunrise:"Sunrise", dhuhr:"Dhuhr", asr:"Asr", maghrib:"Maghrib", isha:"Isha",
namaz:"📚 Namaz Guide", quran:"🕌 Al Quran", dua:"🤲 Dua", hadith:"📖 Hadith",
qibla:"🕋 Qibla Compass", tasbih:"📿 Digital Tasbih",
bismillah:"In the name of Allah",
weather:{clear:"Clear",cloud:"Cloudy",rain:"Rain",snow:"Snow",storm:"Storm"},
quotes:["Prayer is the key to Paradise","Remember Allah","Allah is with the patient"]
}
};

const T = text[lang];

/* =========================
   🔢 NUMBER CONVERT
========================= */

function convertNumber(str){
if(lang==="bn"){
const bn=["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
return str.replace(/[0-9]/g,d=>bn[d]);
}
return str;
}

/* =========================
   🧾 SAFE TEXT SET
========================= */

function setText(id,val){
const el=document.getElementById(id);
if(el) el.innerText=val;
}

setText("bismillahMeaning",T.bismillah);
setText("namaz",T.namaz);
setText("quran",T.quran);
setText("dua",T.dua);
setText("hadith",T.hadith);
setText("qibla",T.qibla);
setText("tasbih",T.tasbih);

/* =========================
   📅 DATE + CLOCK
========================= */

let today=new Date();

setText("date",convertNumber(today.toLocaleDateString("en-GB")));
setText("todayDay",T.days[today.getDay()]);

function updateClock(){
let now=new Date();
let time=now.toLocaleTimeString("en-GB",{hour12:false});
setText("clock",convertNumber(time));
}
setInterval(updateClock,1000);
updateClock();

/* =========================
   🕌 PRAYER
========================= */

let prayerTimes=[];
let nextTime=null;

function loadPrayerTimes(lat,lon){

fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
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

/* GRID */

function renderPrayerGrid(){
let grid=document.getElementById("prayerGrid");
if(!grid) return;

grid.innerHTML="";

prayerTimes.forEach(p=>{
let box=document.createElement("div");
box.className="prayer-box";
box.innerHTML="<b>"+p.name+"</b><br>"+convertNumber(p.time);
grid.appendChild(box);
});
}

/* CURRENT / NEXT */

function updatePrayer(){

let now=new Date();

for(let i=0;i<prayerTimes.length;i++){

let [h,m]=prayerTimes[i].time.split(":");

let pt=new Date();
pt.setHours(h,m,0);

if(now<pt){

setText("currentPrayerName", i===0?prayerTimes[5].name:prayerTimes[i-1].name);
setText("nextPrayerName", prayerTimes[i].name);

nextTime=pt;
return;
}
}

}

/* COUNTDOWN */

function updateCountdown(){
if(!nextTime) return;

let diff=Math.floor((nextTime-new Date())/1000);

let h=Math.floor(diff/3600);
let m=Math.floor((diff%3600)/60);
let s=Math.floor(diff%60);

let time=`${h}:${m}:${s}`;
setText("countdown",convertNumber(time));
}

setInterval(updateCountdown,1000);

/* =========================
   🌦 WEATHER + LOCATION
========================= */

function loadWeather(lat,lon){

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
.then(res=>res.json())
.then(data=>{

let temp=data.current_weather.temperature;
setText("weather",convertNumber(temp+"°C"));

});

}

function loadCityName(lat,lon){

fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
.then(res=>res.json())
.then(data=>{

let city=data.address.city || data.address.town || data.address.state;
setText("city",city);

})
.catch(()=>setText("city","Location"));

}

/* =========================
   📍 GEO
========================= */

navigator.geolocation.getCurrentPosition(

pos=>{
let lat=pos.coords.latitude;
let lon=pos.coords.longitude;

loadPrayerTimes(lat,lon);
loadWeather(lat,lon);
loadCityName(lat,lon);
},

()=>{
let lat=22.5726;
let lon=88.3639;

loadPrayerTimes(lat,lon);
loadWeather(lat,lon);
loadCityName(lat,lon);
}

);

/* =========================
   💬 QUOTE LOOP
========================= */

let qi=0;

function updateQuote(){
setText("bottomText",T.quotes[qi]);
qi=(qi+1)%T.quotes.length;
}

setInterval(updateQuote,5000);
updateQuote();

/* =========================
   🔔 AZAN
========================= */

function playAzan(name){
const audio=new Audio("../assets/kuwait.mp3");
audio.play();
}


setInterval(()=>{
let now=new Date();
let current=String(now.getHours()).padStart(2,"0")+":"+String(now.getMinutes()).padStart(2,"0");

prayerTimes.forEach(p=>{
if(p.time===current){
playAzan(p.name);
}
});

},30000);

/* =========================
   🔗 FINAL CLICK SYSTEM (WORKING)
========================= */

/* Waqt Board → Calendar */
document.addEventListener("DOMContentLoaded", ()=>{

    const statusBoard = document.getElementById("statusBoard");

    if(statusBoard){
        statusBoard.addEventListener("click", ()=>{
            window.location.href = "./calendar.html";
        });
    }

});


/* Prayer Box Click (NO FAIL SYSTEM) */
document.addEventListener("click", function(e){

    const box = e.target.closest(".prayer-box");
    if(!box) return;

    const boxes = document.querySelectorAll(".prayer-box");
    const index = Array.from(boxes).indexOf(box);

    if(index === -1 || !prayerTimes.length) return;

    console.log("Clicked:", index);

    // Sunrise
    if(index === 1){
        window.location.href = "./sunrise.html";
    }else{
        localStorage.setItem("selectedPrayer", prayerTimes[index].name);
        window.location.href = "./azan-setting.html";
    }

});
/* =========================
   🌐 EXTRA LANGUAGE FIX
========================= */

const extraText = {
bn:{
location:"অবস্থান",
remember:"আল্লাহকে স্মরণ করো"
},
en:{
location:"Location",
remember:"Remember Allah"
}
};

if(extraText[lang]){
setText("locationLabel", extraText[lang].location);
setText("bottomText", extraText[lang].remember);
}
