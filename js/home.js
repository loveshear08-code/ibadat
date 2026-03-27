document.addEventListener("DOMContentLoaded", function(){

/* =========================
   TEXT DATA
========================= */
const T={
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
quotes:[
"নামাজ জান্নাতের চাবি",
"আল্লাহকে স্মরণ করো",
"ধৈর্য ধরো, আল্লাহ সাথে আছেন"
],
features:{
namaz:"📚 নামাজ শিক্ষা",
quran:"🕌 আল কুরআন",
dua:"🤲 দোয়া",
hadith:"📖 হাদিস",
qibla:"🕋 কিবলা কম্পাস",
tasbih:"📿 ডিজিটাল তসবিহ"
},
weatherText:{
clear:"পরিষ্কার",
cloud:"মেঘলা",
rain:"বৃষ্টি",
snow:"তুষার",
storm:"ঝড়"
}
};

/* =========================
   SAFE TEXT SET
========================= */
function setText(id,text){
let el=document.getElementById(id);
if(el) el.innerText=text;
}

/* =========================
   BASIC TEXT
========================= */
setText("bismillahMeaning",T.bismillah);

Object.keys(T.features).forEach(k=>{
setText(k,T.features[k]);
});

/* =========================
   DATE + DAY
========================= */
let now=new Date();

setText("todayDay",T.days[now.getDay()]);

document.getElementById("date").innerText=
now.toLocaleDateString("bn-BD",{day:"2-digit",month:"short"});

/* =========================
   CLOCK
========================= */
setInterval(()=>{
setText("clock",new Date().toLocaleTimeString("bn-BD",{hour12:false}));
},1000);

/* =========================
   DEMO PRAYER (CURRENT + NEXT)
========================= */
setText("currentPrayerName","🟢 ফজর");
setText("nextPrayerName","⏭️ জোহর");

/* =========================
   COUNTDOWN (REAL RUNNING)
========================= */
let targetTime=new Date();
targetTime.setHours(11,42,0);

function updateCountdown(){

let now=new Date();

if(now >= targetTime){
targetTime.setDate(targetTime.getDate()+1);
}

let diff=targetTime-now;

let h=Math.floor(diff/1000/60/60);
let m=Math.floor((diff/1000/60)%60);
let s=Math.floor((diff/1000)%60);

setText("countdown",
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0")
);

}

setInterval(updateCountdown,1000);
updateCountdown();

/* =========================
   WEATHER (BASIC)
========================= */
setText("weather","25°C মেঘলা");

/* =========================
   LOCATION (AUTO FIX)
========================= */
function loadLocation(lat,lon){

fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
.then(r=>r.json())
.then(d=>{
let city=d.address.city || d.address.town || d.address.village || d.address.state || "";
setText("city",city || "অবস্থান");
})
.catch(()=>setText("city","অবস্থান"));

}

navigator.geolocation.getCurrentPosition(

pos=>{
loadLocation(pos.coords.latitude,pos.coords.longitude);
},

()=>{
setText("city","কলকাতা");
}

);

/* =========================
   PRAYER GRID
========================= */
let prayerList=[
["ফজর","04:33"],
["সূর্যোদয়","05:34"],
["জোহর","11:42"],
["আসর","15:07"],
["মাগরিব","17:50"],
["এশা","18:52"]
];

let grid=document.getElementById("prayerGrid");

if(grid){
grid.innerHTML="";

prayerList.forEach((p,i)=>{

let div=document.createElement("div");
div.className="prayer-box";
div.innerHTML=`${p[0]}<br>${p[1]}`;

/* 🔥 CLICK */
div.style.cursor="pointer";

div.onclick=()=>{
if(i===1){
window.location.href="sunrise.html";
}else{
window.location.href="azan-setting.html";
}
};

grid.appendChild(div);

});
}

/* =========================
   FEATURE CLICK
========================= */
const features={
namaz:"namaz",
quran:"quran",
dua:"dua",
hadith:"hadith",
qibla:"qibla",
tasbih:"tasbih"
};

Object.keys(features).forEach(id=>{
let el=document.getElementById(id);
if(el){
el.style.cursor="pointer";
el.onclick=()=>window.location.href=features[id]+".html";
}
});

/* =========================
   STATUS BOX CLICK
========================= */
["currentPrayerName","nextPrayerName"].forEach(id=>{
let el=document.getElementById(id);
if(el){
el.style.cursor="pointer";
el.onclick=()=>window.location.href="calendar.html";
}
});

/* =========================
   BOTTOM SCROLL TEXT
========================= */
let qi=0;

setInterval(()=>{
setText("bottomText",T.quotes[qi]);
qi=(qi+1)%T.quotes.length;
},4000);

});
