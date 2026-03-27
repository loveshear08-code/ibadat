const T={
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
namaz:"📚 নামাজ শিক্ষা",
quran:"🕌 আল কুরআন",
dua:"🤲 দোয়া",
hadith:"📖 হাদিস",
qibla:"🕋 কিবলা কম্পাস",
tasbih:"📿 ডিজিটাল তসবিহ",
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
quotes:["নামাজ জান্নাতের চাবি","আল্লাহকে স্মরণ করো"]
};

/* TEXT */
document.getElementById("bismillahMeaning").innerText=T.bismillah;
document.getElementById("namaz").innerText=T.namaz;
document.getElementById("quran").innerText=T.quran;
document.getElementById("dua").innerText=T.dua;
document.getElementById("hadith").innerText=T.hadith;
document.getElementById("qibla").innerText=T.qibla;
document.getElementById("tasbih").innerText=T.tasbih;

/* DATE */
let d=new Date();
document.getElementById("todayDay").innerText=T.days[d.getDay()];
document.getElementById("date").innerText=d.toLocaleDateString();

/* CLOCK */
setInterval(()=>{
document.getElementById("clock").innerText=
new Date().toLocaleTimeString();
},1000);

/* PRAYER GRID DEMO */
let list=[
["ফজর","04:33"],
["সূর্যোদয়","05:34"],
["জোহর","11:42"],
["আসর","15:07"],
["মাগরিব","17:50"],
["এশা","18:52"]
];

let grid=document.getElementById("prayerGrid");

list.forEach(p=>{
let div=document.createElement("div");
div.className="prayer-box";
div.innerHTML=`${p[0]}<br>${p[1]}`;
grid.appendChild(div);
});

/* QUOTE */
let i=0;
setInterval(()=>{
document.getElementById("bottomText").innerText=T.quotes[i];
i=(i+1)%T.quotes.length;
},3000);
function runStatus(){

// clock
setInterval(()=>{
document.getElementById("clock").innerText =
new Date().toLocaleTimeString();
},1000);

// demo current + next
document.getElementById("currentPrayerName").innerText="● ফজর";
document.getElementById("nextPrayerName").innerText="⏭ জোহর";

// demo countdown
setInterval(()=>{
document.getElementById("countdown").innerText="01:25:10";
},1000);

}

runStatus();
