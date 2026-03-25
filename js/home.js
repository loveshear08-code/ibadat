const lang = localStorage.getItem("appLang") || "bn";

/* LANGUAGE DATA */
const text = { /* 🔒 তোমার আগের text object same থাকবে */ };
const T = text[lang];

/* NUMBER CONVERT */
function convertNumber(str){
    if(lang==="bn"){
        const bn=["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
        return str.replace(/[0-9]/g,d=>bn[d]);
    }
    if(lang==="hi"){
        const hi=["०","१","२","३","४","५","६","७","८","९"];
        return str.replace(/[0-9]/g,d=>hi[d]);
    }
    return str;
}

/* CLEAN TIME */
function cleanTime(t){
    return t.split(" ")[0];
}

/* DATE + TEXT */
let today=new Date();

document.getElementById("bismillahMeaning").innerText=T.bismillah;
document.getElementById("todayDay").innerText=T.days[today.getDay()];
document.getElementById("date").innerText=
convertNumber(today.toLocaleDateString("en-GB"));

document.getElementById("namaz").innerText=T.namaz;
document.getElementById("quran").innerText=T.quran;
document.getElementById("dua").innerText=T.dua;
document.getElementById("hadith").innerText=T.hadith;
document.getElementById("qibla").innerText=T.qibla;
document.getElementById("tasbih").innerText=T.tasbih;

/* CLOCK */
function updateClock(){
    let now=new Date();
    let time=now.toLocaleTimeString("en-GB",{hour12:false});
    document.getElementById("clock").innerText=
    convertNumber(time);
}
setInterval(updateClock,1000);
updateClock();

/* PRAYER SYSTEM */
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

/* STORE CLEAN TIMES */
const cleanTimes = prayerTimes.map(p=>cleanTime(p.time));
localStorage.setItem("azanTimes", JSON.stringify(cleanTimes));

renderPrayerGrid();
updatePrayer();

});

}

/* GRID */
function renderPrayerGrid(){

let grid=document.getElementById("prayerGrid");
grid.innerHTML="";

prayerTimes.forEach(p=>{

let box=document.createElement("div");
box.className="prayer-box";

box.innerHTML="<b>"+p.name+"</b><br>"+convertNumber(cleanTime(p.time));

box.onclick=()=>{
if(p.name!==T.sunrise){
localStorage.setItem("selectedPrayer",p.name);
window.location.href="./azan-setting.html";
}else{
window.location.href="./sunrise.html";
}
};

grid.appendChild(box);

});

}

/* CURRENT + NEXT */
function updatePrayer(){

let now=new Date();
let found=false;

for(let i=0;i<prayerTimes.length;i++){

let [h,m]=cleanTime(prayerTimes[i].time).split(":");

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

let [h,m]=cleanTime(prayerTimes[0].time).split(":");

let tomorrow=new Date();
tomorrow.setDate(tomorrow.getDate()+1);
tomorrow.setHours(h);
tomorrow.setMinutes(m);
tomorrow.setSeconds(0);

nextTime=tomorrow;

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

/* AZAN SYSTEM (FIXED) */
let lastPlayedTime=null;

function playAzan(name){

let azan=localStorage.getItem("azanVoice") || "makkah";
let audio=new Audio("../assets/"+azan+".mp3");
audio.play().catch(()=>{});

if(Notification.permission==="granted"){
new Notification("🕌 "+name+" time");
}

}

function checkAzan(){

if(!prayerTimes.length)return;

let now=new Date();

let current=
String(now.getHours()).padStart(2,"0")+":"+
String(now.getMinutes()).padStart(2,"0");

if(current===lastPlayedTime)return;

prayerTimes.forEach(p=>{

let time=cleanTime(p.time);

if(time===current){
playAzan(p.name);
lastPlayedTime=current;
}

});

}

setInterval(checkAzan,30000);

/* GEO */
let savedLat = localStorage.getItem("lat");
let savedLon = localStorage.getItem("lon");

if(savedLat && savedLon){

loadPrayerTimes(savedLat,savedLon);

}else{

navigator.geolocation.getCurrentPosition(

pos=>{
let lat=pos.coords.latitude;
let lon=pos.coords.longitude;

localStorage.setItem("lat",lat);
localStorage.setItem("lon",lon);

loadPrayerTimes(lat,lon);
},

()=>{
loadPrayerTimes(22.5726,88.3639);
}

);

}
