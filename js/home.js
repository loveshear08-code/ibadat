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
setInterval(()=>{
setText("countdown","01:25:10");
},1000);

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
