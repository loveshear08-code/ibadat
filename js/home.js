/* =========================
   IBADAT HOME JS (FINAL)
========================= */

/* TEXT DATA */
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

/* =========================
   BASIC TEXT SETUP
========================= */

// bismillah
document.getElementById("bismillahMeaning").innerText=T.bismillah;

// feature names
document.getElementById("namaz").innerText=T.features.namaz;
document.getElementById("quran").innerText=T.features.quran;
document.getElementById("dua").innerText=T.features.dua;
document.getElementById("hadith").innerText=T.features.hadith;
document.getElementById("qibla").innerText=T.features.qibla;
document.getElementById("tasbih").innerText=T.features.tasbih;

// day
let d=new Date();
document.getElementById("todayDay").innerText=T.days[d.getDay()];

/* =========================
   CLOCK + STATUS
========================= */

function runStatus(){

// 🔥 CLOCK
setInterval(()=>{
document.getElementById("clock").innerText=
new Date().toLocaleTimeString();
},1000);

// 🔥 CURRENT + NEXT (demo)
document.getElementById("currentPrayerName").innerText="● ফজর";
document.getElementById("nextPrayerName").innerText="⏭ জোহর";

// 🔥 COUNTDOWN (demo)
setInterval(()=>{
document.getElementById("countdown").innerText="01:25:10";
},1000);

}

runStatus();

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

prayerList.forEach(p=>{
let div=document.createElement("div");
div.className="prayer-box";
div.innerHTML=`${p[0]}<br>${p[1]}`;
grid.appendChild(div);
});

/* =========================
   BOTTOM TEXT SCROLL
========================= */

let i=0;
setInterval(()=>{
document.getElementById("bottomText").innerText=T.quotes[i];
i=(i+1)%T.quotes.length;
},3000);
