document.addEventListener("DOMContentLoaded", function(){

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
}
};

function setText(id,text){
let el=document.getElementById(id);
if(el) el.innerText=text;
}

/* TEXT */
setText("bismillahMeaning",T.bismillah);

Object.keys(T.features).forEach(k=>{
setText(k,T.features[k]);
});

/* DAY */
let now=new Date();
setText("todayDay",T.days[now.getDay()]);

/* DATE */
document.getElementById("date").innerText=
now.toLocaleDateString("bn-BD");

/* CLOCK */
setInterval(()=>{
setText("clock",new Date().toLocaleTimeString());
},1000);

/* STATUS */
setText("currentPrayerName","● ফজর");
setText("nextPrayerName","⏭ জোহর");

/* COUNTDOWN */
let targetTime=new Date();
targetTime.setHours(11);
targetTime.setMinutes(42);
targetTime.setSeconds(0);

function updateCountdown(){
let now=new Date();
let diff=targetTime-now;

if(diff<=0){
document.getElementById("countdown").innerText="00:00:00";
return;
}

let h=Math.floor(diff/1000/60/60);
let m=Math.floor((diff/1000/60)%60);
let s=Math.floor((diff/1000)%60);

document.getElementById("countdown").innerText=
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");
}

setInterval(updateCountdown,1000);

/* WEATHER */
setText("weather","25°C মেঘলা");

/* PRAYER GRID */
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
prayerList.forEach(p=>{
let div=document.createElement("div");
div.className="prayer-box";
div.innerHTML=`${p[0]}<br>${p[1]}`;
grid.appendChild(div);
});
}

/* BOTTOM */
let i=0;
setInterval(()=>{
setText("bottomText",T.quotes[i]);
i=(i+1)%T.quotes.length;
},3000);

});
/* =========================
   GLOBAL CLICK SYSTEM
========================= */

// 🔹 open page helper
function openPage(name){
window.location.href=name+".html";
}

/* =========================
   STATUS BOX CLICK
========================= */

// current → calendar page
let current=document.getElementById("currentPrayerName");
if(current){
current.style.cursor="pointer";
current.onclick=()=>openPage("calendar");
}

// next → calendar page
let next=document.getElementById("nextPrayerName");
if(next){
next.style.cursor="pointer";
next.onclick=()=>openPage("calendar");
}

/* =========================
   PRAYER GRID CLICK
========================= */

let grid=document.getElementById("prayerGrid");

if(grid){
grid.addEventListener("click",function(e){

let box=e.target.closest(".prayer-box");
if(!box) return;

let name=box.innerText.split("\n")[0]; // ফজর, জোহর etc

// 🔥 সব নামাজ → same settings page
openPage("azan");

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
el.onclick=()=>openPage(features[id]);
}
});
