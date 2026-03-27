document.addEventListener("DOMContentLoaded", function(){

function setText(id,text){
let el=document.getElementById(id);
if(el) el.innerText=text;
}

function toBN(num){
return num.toString().replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
}

/* TEXT */
setText("bismillahMeaning","পরম করুণাময় অসীম দয়ালু আল্লাহর নামে");

/* DATE */
let now=new Date();
let days=["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"];

setText("todayDay",days[now.getDay()]);
setText("date",now.toLocaleDateString("bn-BD"));

/* CLOCK */
setInterval(()=>{
let d=new Date();

let h=String(d.getHours()).padStart(2,"0");
let m=String(d.getMinutes()).padStart(2,"0");
let s=String(d.getSeconds()).padStart(2,"0");

let time=h+":"+m+":"+s;

setText("clock",toBN(time));
},1000);

/* PRAYER */
let prayerList=[
["ফজর","04:33"],
["সূর্যোদয়","05:34"],
["জোহর","11:42"],
["আসর","15:07"],
["মাগরিব","17:50"],
["এশা","18:52"]
];

function getNextPrayer(){
let now=new Date();

for(let p of prayerList){
let [h,m]=p[1].split(":");
let t=new Date();
t.setHours(h,m,0);

if(now < t){
return {name:p[0],time:t};
}
}

let [h,m]=prayerList[0][1].split(":");
let t=new Date();
t.setDate(t.getDate()+1);
t.setHours(h,m,0);

return {name:prayerList[0][0],time:t};
}

function getCurrentPrayer(){
let now=new Date();

for(let i=prayerList.length-1;i>=0;i--){
let [h,m]=prayerList[i][1].split(":");
let t=new Date();
t.setHours(h,m,0);

if(now>=t){
return prayerList[i][0];
}
}
return prayerList[0][0];
}

function updateStatus(){

let next=getNextPrayer();

setText("currentPrayerName","● "+getCurrentPrayer());
setText("nextPrayerName","⏭ "+next.name);

let diff=next.time - new Date();

let h=Math.floor(diff/1000/60/60);
let m=Math.floor((diff/1000/60)%60);
let s=Math.floor((diff/1000)%60);

let time=
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

setText("countdown",toBN(time));
}

setInterval(updateStatus,1000);
updateStatus();

/* WEATHER */
setText("weather","২৫°সি মেঘলা");

/* GRID */
let grid=document.getElementById("prayerGrid");

if(grid){
grid.innerHTML="";

prayerList.forEach(p=>{
let div=document.createElement("div");
div.className="prayer-box";

div.innerHTML=`${p[0]}<br>${toBN(p[1])}`;
grid.appendChild(div);
});
}

/* FEATURES */
const features={
namaz:"📚 নামাজ শিক্ষা",
quran:"🕌 আল কুরআন",
dua:"🤲 দোয়া",
hadith:"📖 হাদিস",
qibla:"🕋 কিবলা",
tasbih:"📿 তসবিহ"
};

Object.keys(features).forEach(id=>{
setText(id,features[id]);
});

});
