document.addEventListener("DOMContentLoaded", function(){

/* ================= INIT ================= */

const s = getSettings();
applySettings();

let currentLang = s.lang;

/* ================= LANGUAGE DATA ================= */

const TEXT = {
bn:{
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
weather:"২৫°সি মেঘলা",
settings:"সেটিংস",
features:{
namaz:"📚 নামাজ শিক্ষা",
quran:"🕌 আল কুরআন",
dua:"🤲 দোয়া",
hadith:"📖 হাদিস",
qibla:"🕋 কিবলা",
tasbih:"📿 তসবিহ"
},
quotes:["নামাজ জান্নাতের চাবি","আল্লাহকে স্মরণ করো","ধৈর্য ধরো"],
prayer:["ফজর","সূর্যোদয়","জোহর","আসর","মাগরিব","এশা"]
},

en:{
bismillah:"In the name of Allah, Most Merciful",
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
weather:"25°C Cloudy",
settings:"Settings",
features:{
namaz:"📚 Namaz Guide",
quran:"🕌 Al Quran",
dua:"🤲 Dua",
hadith:"📖 Hadith",
qibla:"🕋 Qibla",
tasbih:"📿 Tasbih"
},
quotes:["Prayer is the key to Jannah","Remember Allah","Have patience"],
prayer:["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"]
},

hi:{
bismillah:"अल्लाह के नाम से जो रहमान और रहीम है",
days:["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
weather:"25°C बादल",
settings:"सेटिंग्स",
features:{
namaz:"📚 नमाज़ गाइड",
quran:"🕌 अल कुरआन",
dua:"🤲 दुआ",
hadith:"📖 हदीस",
qibla:"🕋 क़िबला",
tasbih:"📿 तस्बीह"
},
quotes:["नमाज़ जन्नत की चाबी है","अल्लाह को याद करो","सब्र करो"],
prayer:["फ़ज्र","सूर्योदय","ज़ुहर","असर","मग़रिब","इशा"]
}
};

const t = TEXT[s.lang] || TEXT["bn"];

/* ================= CITY ================= */

const CITY = {
bn:"কলকাতা",
en:"Kolkata",
hi:"कोलकाता"
};

/* ================= HELPERS ================= */

function setText(id,text){
let el=document.getElementById(id);
if(el) el.innerText=text;
}

/* 🔥 NUMBER FORMAT FIX (FINAL) */
function formatNumber(num){
let str = num.toString();

if(s.lang === "bn"){
    return str.replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
}
if(s.lang === "hi"){
    return str.replace(/[0-9]/g,d=>"०१२३४५६७८९"[d]);
}
return str;
}

/* ================= APPLY TEXT ================= */

setTimeout(()=>{
setText("city", CITY[s.lang] || "কলকাতা");
},0);

setText("bismillahMeaning",t.bismillah);

/* ================= DATE ================= */

let now=new Date();

let locale =
s.lang==="bn" ? "bn-BD" :
s.lang==="hi" ? "hi-IN" : "en-US";

setText("todayDay",t.days[now.getDay()]);
setText("date", formatNumber(now.toLocaleDateString(locale)));

/* ================= CLOCK ================= */

setInterval(()=>{
let d=new Date();
let h=String(d.getHours()).padStart(2,"0");
let m=String(d.getMinutes()).padStart(2,"0");
let sec=String(d.getSeconds()).padStart(2,"0");

setText("clock", formatNumber(h+":"+m+":"+sec));
},1000);

/* ================= PRAYER DATA ================= */

let prayerList=[
[t.prayer[0],"04:33"],
[t.prayer[1],"05:34"],
[t.prayer[2],"11:42"],
[t.prayer[3],"15:07"],
[t.prayer[4],"17:50"],
[t.prayer[5],"18:52"]
];

/* ================= NEXT ================= */

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
let t2=new Date();
t2.setDate(t2.getDate()+1);
t2.setHours(h,m,0);

return {name:prayerList[0][0],time:t2};
}

/* ================= CURRENT ================= */

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

/* ================= STATUS ================= */

function updateStatus(){

let now = new Date(); // 🔥 SINGLE SOURCE

let next = getNextPrayer();

setText("currentPrayerName","● "+getCurrentPrayer());
setText("nextPrayerName","⏭ "+next.name);

let diff = next.time.getTime() - now.getTime(); // 🔥 FIX

if(diff < 0) diff = 0; // safety

let h = Math.floor(diff/1000/60/60);
let m = Math.floor((diff/1000/60)%60);
let sec = Math.floor((diff/1000)%60);

let time =
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(sec).padStart(2,"0");

setText("countdown", formatNumber(time));
}

setInterval(updateStatus,1000);
updateStatus();

/* ================= WEATHER ================= */

setText("weather", formatNumber(t.weather));

/* ================= NAVIGATION ================= */

function openPage(page){
window.location.href="./html/"+page+".html";
}

/* ================= PRAYER GRID (🔥 FINAL FIX) ================= */

let grid=document.getElementById("prayerGrid");

if(grid){
grid.innerHTML="";

prayerList.forEach(p=>{
let div=document.createElement("div");
div.className="prayer-box";

/* 🔥 FORCE RENDER FIX */
let timeFormatted = formatNumber(p[1]);

div.innerHTML = "";
div.innerHTML = `${p[0]}<br>${timeFormatted}`;

if(p[0] === t.prayer[1]){
    div.style.cursor="pointer";
    div.onclick=()=>openPage("settings");

    div.innerHTML += `<br><small style="opacity:0.6">⚙️ ${t.settings}</small>`;
}else{
    div.style.cursor="default";
}

grid.appendChild(div);
});
}

/* ================= FEATURES ================= */

Object.keys(t.features).forEach(id=>{
setText(id,t.features[id]);
});

/* ================= CLICK ================= */

["namaz","quran","dua","hadith","qibla","tasbih"].forEach(id=>{
let el=document.getElementById(id);
if(el){
el.style.cursor="pointer";
el.onclick=()=>openPage(id==="namaz"?"namaz-guide":id);
}
});

/* ================= STATUS CLICK ================= */

["currentPrayerName","nextPrayerName"].forEach(id=>{
let el=document.getElementById(id);
if(el){
el.style.cursor="pointer";
el.onclick=()=>openPage("calendar");
}
});

/* ================= BOTTOM TEXT ================= */

let i=0;
setInterval(()=>{
setText("bottomText",t.quotes[i]);
i=(i+1)%t.quotes.length;
},3000);

/* ================= AUTO LANGUAGE REFRESH ================= */

setInterval(()=>{
let newLang = getSettings().lang;
if(newLang !== currentLang){
    location.reload();
}
},1000);

});
