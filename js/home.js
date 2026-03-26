/* ======================
LANG
====================== */

const lang = localStorage.getItem("appLang") || "bn";

const text={
bn:{
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
fajr:"ফজর", sunrise:"সূর্যোদয়", dhuhr:"জোহর", asr:"আসর", maghrib:"মাগরিব", isha:"এশা",
namaz:"📚 নামাজ শিক্ষা", quran:"🕌 আল কুরআন", dua:"🤲 দোয়া", hadith:"📖 হাদিস",
qibla:"🕋 কিবলা কম্পাস", tasbih:"📿 ডিজিটাল তসবিহ",
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
location:"অবস্থান",
weatherText:{
clear:"পরিষ্কার",cloud:"মেঘলা",rain:"বৃষ্টি",snow:"তুষার",storm:"ঝড়"
},
quotes:["আল্লাহকে স্মরণ করো","ধৈর্য ধরো"]
},
en:{
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
fajr:"Fajr", sunrise:"Sunrise", dhuhr:"Dhuhr", asr:"Asr", maghrib:"Maghrib", isha:"Isha",
namaz:"📚 Namaz Guide", quran:"🕌 Al Quran", dua:"🤲 Dua", hadith:"📖 Hadith",
qibla:"🕋 Qibla Compass", tasbih:"📿 Digital Tasbih",
bismillah:"In the name of Allah",
location:"Location",
weatherText:{
clear:"Clear",cloud:"Cloudy",rain:"Rain",snow:"Snow",storm:"Storm"
},
quotes:["Remember Allah","Be patient"]
}
};

const T=text[lang];

/* ======================
SAFE SET
====================== */

function setText(id,val){
let el=document.getElementById(id);
if(el) el.innerText=val;
}

/* ======================
TEXT APPLY
====================== */

setText("bismillahMeaning",T.bismillah);
setText("namaz",T.namaz);
setText("quran",T.quran);
setText("dua",T.dua);
setText("hadith",T.hadith);
setText("qibla",T.qibla);
setText("tasbih",T.tasbih);
setText("locationLabel",T.location);

/* ======================
DATE + CLOCK
====================== */

let today=new Date();
setText("todayDay",T.days[today.getDay()]);
setText("date",today.toLocaleDateString("en-GB"));

function updateClock(){
let now=new Date();
setText("clock",now.toLocaleTimeString("en-GB",{hour12:false}));
}
setInterval(updateClock,1000);
updateClock();

/* ======================
PRAYER
====================== */

let prayerTimes=[];

function loadPrayerTimes(lat,lon){

fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
.then(r=>r.json())
.then(d=>{

let t=d.data.timings;

prayerTimes=[
{name:T.fajr,time:t.Fajr},
{name:T.sunrise,time:t.Sunrise},
{name:T.dhuhr,time:t.Dhuhr},
{name:T.asr,time:t.Asr},
{name:T.maghrib,time:t.Maghrib},
{name:T.isha,time:t.Isha}
];

renderGrid();
updatePrayer();

});

}

/* GRID */

function renderGrid(){

let grid=document.getElementById("prayerGrid");
grid.innerHTML="";

prayerTimes.forEach((p,i)=>{

let box=document.createElement("div");
box.className="prayer-box";
box.innerHTML=`<b>${p.name}</b><br>${p.time}`;

box.onclick=()=>{

if(i===1){
window.location.href="features/sunrise.html";
}else{
localStorage.setItem("selectedPrayer",p.name);
window.location.href="features/azan-setting.html";
}

};

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

setText("currentPrayerName",prayerTimes[i-1]?.name || prayerTimes[5].name);
setText("nextPrayerName",prayerTimes[i].name);

return;

}

}

}

/* ======================
WEATHER
====================== */

function loadWeather(lat,lon){

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
.then(r=>r.json())
.then(d=>{

let temp=d.current_weather.temperature;
let code=d.current_weather.weathercode;

let condition="clear";

if([1,2,3].includes(code)) condition="cloud";
if([51,53,55,61,63,65].includes(code)) condition="rain";
if([71,73,75].includes(code)) condition="snow";
if([95,96,99].includes(code)) condition="storm";

setText("weather",temp+"°C "+T.weatherText[condition]);

});

}

/* ======================
LOCATION
====================== */

function loadLocation(lat,lon){

fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
.then(r=>r.json())
.then(d=>{

let city=d.address.city || d.address.town || d.address.state;
setText("city",city);

})
.catch(()=>setText("city","--"));

}

/* ======================
GEO
====================== */

navigator.geolocation.getCurrentPosition(

p=>{
let lat=p.coords.latitude;
let lon=p.coords.longitude;

loadPrayerTimes(lat,lon);
loadWeather(lat,lon);
loadLocation(lat,lon);

},

()=>{
let lat=22.57,lon=88.36;

loadPrayerTimes(lat,lon);
loadWeather(lat,lon);
loadLocation(lat,lon);
}

);

/* ======================
FEATURE NAV
====================== */

document.getElementById("bismillahCard").onclick=()=>location.href="features/allah-names.html";
document.getElementById("namaz").onclick=()=>location.href="features/namaz-guide.html";
document.getElementById("quran").onclick=()=>location.href="features/quran.html";
document.getElementById("dua").onclick=()=>location.href="features/dua.html";
document.getElementById("hadith").onclick=()=>location.href="features/hadith.html";
document.getElementById("qibla").onclick=()=>location.href="features/qibla.html";
document.getElementById("tasbih").onclick=()=>location.href="features/tasbih.html";

/* ======================
SMOOTH SCROLL TEXT
====================== */

let i=0;

function scrollQuote(){

let text=T.quotes[i];

let el=document.getElementById("bottomText");

el.style.transition="all 1s";
el.style.opacity="0";

setTimeout(()=>{
el.innerText=text;
el.style.opacity="1";
},500);

i=(i+1)%T.quotes.length;

}

setInterval(scrollQuote,4000);
scrollQuote();
