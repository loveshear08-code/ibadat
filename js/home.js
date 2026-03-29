document.addEventListener("DOMContentLoaded", function(){

/* ================= INIT ================= */

const s = getSettings();
applySettings();

let currentLang = s.lang;

/* ================= TEXT ================= */

const TEXT = {
bn:{
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
weather:"লোড হচ্ছে...",
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
weather:"Loading...",
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
weather:"लोड हो रहा है...",
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

/* ================= BASIC ================= */

function setText(id,text){
let el=document.getElementById(id);
if(el) el.innerText=text;
}

function formatNumber(num){
let str=num.toString();
if(s.lang==="bn") return str.replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
if(s.lang==="hi") return str.replace(/[0-9]/g,d=>"०१२३४५६७८९"[d]);
return str;
}

/* ================= STATIC ================= */

setText("bismillahMeaning",t.bismillah);
setText("todayDay",t.days[new Date().getDay()]);

/* ================= CLOCK ================= */

setInterval(()=>{
let d=new Date();
let time=
String(d.getHours()).padStart(2,"0")+":"+
String(d.getMinutes()).padStart(2,"0")+":"+
String(d.getSeconds()).padStart(2,"0");

setText("clock",formatNumber(time));
},1000);

/* ================= MAIN ================= */

let prayerList=[];

if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(startApp, fallback);
}else{
fallback();
}

async function startApp(pos){

let lat = pos.coords.latitude;
let lon = pos.coords.longitude;

/* CITY */
try{
let locRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
let loc = await locRes.json();

let cityName = loc.city || "Kolkata";

if(s.lang==="bn" && cityName==="Kolkata") cityName="কলকাতা";
if(s.lang==="hi" && cityName==="Kolkata") cityName="कोलकाता";

setText("city", cityName);

}catch{
setText("city","Kolkata");
}

/* WEATHER */
loadWeather(lat, lon);

/* PRAYER */
loadPrayer(lat, lon);

}

function fallback(){

let cityName = "Kolkata";
if(s.lang==="bn") cityName="কলকাতা";
if(s.lang==="hi") cityName="कोलकाता";

setText("city",cityName);

loadWeather(22.5726,88.3639);
loadPrayer(22.5726,88.3639);

}

/* ================= WEATHER ================= */

async function loadWeather(lat, lon){

try{

let apiKey = "a7f2e6a4e4dd9b86ec885982fac12ace";

let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
let data = await res.json();

if(data && data.main){

let temp = Math.round(data.main.temp);
let desc = data.weather[0].main;

/* 🔥 WEATHER TRANSLATE */
const WEATHER = {
bn:{ "Haze":"কুয়াশা","Clouds":"মেঘলা","Clear":"পরিষ্কার","Rain":"বৃষ্টি" },
hi:{ "Haze":"धुंध","Clouds":"बादल","Clear":"साफ","Rain":"बारिश" }
};

if(WEATHER[s.lang] && WEATHER[s.lang][desc]){
desc = WEATHER[s.lang][desc];
}

setText("weather", formatNumber(temp+"°C "+desc));

}else{
setText("weather", t.weather);
}

}catch{
setText("weather", t.weather);
}

}

/* ================= PRAYER ================= */

async function loadPrayer(lat, lon){

try{

let res=await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`);
let data=await res.json();

let tm=data.data.timings;
let hijri=data.data.date.hijri;

/* 🔥 HIJRI TRANSLATE (FINAL FIX) */

let rawMonth = hijri.month.en || "";

/* FULL NORMALIZE */
let month = rawMonth
.toLowerCase()
.replace(/ā|â|ä/g,"a")
.replace(/ī|ï/g,"i")
.replace(/ū|ü/g,"u")
.replace(/'/g,"")
.replace(/[^a-z\s]/g,"")
.replace(/\s+/g," ")
.trim();

/* MAP */
const HIJRI_MONTH = {
bn:{
"muharram":"মুহাররম",
"safar":"সফর",
"rabi al awwal":"রবিউল আউয়াল",
"rabi al thani":"রবিউস সানি",
"jumada al ula":"জুমাদাল উলা",
"jumada al akhirah":"জুমাদাস সানিয়া",
"rajab":"রজব",
"shaban":"শাবান",
"ramadan":"রমজান",
"shawwal":"শাওয়াল",
"dhul qadah":"জিলকদ",
"dhul hijjah":"জিলহজ্জ"
},
hi:{
"muharram":"मुहर्रम",
"safar":"सफ़र",
"rabi al awwal":"रबी अल अव्वल",
"rabi al thani":"रबी अस सानी",
"jumada al ula":"जुमादा अल ऊला",
"jumada al akhirah":"जुमादा अस सानिया",
"rajab":"रजब",
"shaban":"शाबान",
"ramadan":"रमज़ान",
"shawwal":"शव्वाल",
"dhul qadah":"ज़िलक़ादा",
"dhul hijjah":"ज़िलहिज्जा"
}
};

/* FINAL MONTH SELECT */
let finalMonth = rawMonth; // default English

if(s.lang !== "en" && HIJRI_MONTH[s.lang] && HIJRI_MONTH[s.lang][month]){
finalMonth = HIJRI_MONTH[s.lang][month];
}

/* FINAL DATE */
let hij = `${hijri.day} ${finalMonth} ${hijri.year}`;
setText("date", formatNumber(hij));
/* LIST */

prayerList=[
[t.prayer[0],tm.Fajr],
[t.prayer[1],tm.Sunrise],
[t.prayer[2],tm.Dhuhr],
[t.prayer[3],tm.Asr],
[t.prayer[4],tm.Maghrib],
[t.prayer[5],tm.Isha]
];

renderGrid();
updateStatus();

}catch(e){
console.log("Prayer error",e);
}

}

/* ================= STATUS ================= */

function getNext(){

let now=new Date();

/* Sunrise বাদ */
let validPrayer = prayerList.filter(p => p[0] !== t.prayer[1]);

for(let p of validPrayer){
let [h,m]=p[1].split(":");
let tTime=new Date();
tTime.setHours(h,m,0);

if(now < tTime){
return {name:p[0], time:tTime};
}
}

/* next day Fajr */
let [h,m]=validPrayer[0][1].split(":");
let t2=new Date();
t2.setDate(t2.getDate()+1);
t2.setHours(h,m,0);

return {name:validPrayer[0][0], time:t2};
}


function getCurrent(){

let now=new Date();

/* Sunrise বাদ */
let validPrayer = prayerList.filter(p => p[0] !== t.prayer[1]);

for(let i=validPrayer.length-1;i>=0;i--){
let [h,m]=validPrayer[i][1].split(":");
let tTime=new Date();
tTime.setHours(h,m,0);

if(now >= tTime){
return validPrayer[i][0];
}
}

return validPrayer[0][0]; // fallback (early morning)
}


function updateStatus(){

if(!prayerList.length) return;

let next = getNext();
let current = getCurrent();

/* UI text */
setText("currentPrayerName","● "+current);
setText("nextPrayerName","⏭ "+next.name);

/* countdown */
let diff = next.time - new Date();
if(diff < 0) diff = 0;

let hours = Math.floor(diff / 3600000);
let minutes = Math.floor((diff % 3600000) / 60000);
let seconds = Math.floor((diff % 60000) / 1000);

let time =
String(hours).padStart(2,"0")+":"+
String(minutes).padStart(2,"0")+":"+
String(seconds).padStart(2,"0");

setText("countdown", formatNumber(time));

}


/* live update */
setInterval(updateStatus,1000);

/* ================= GRID ================= */

function renderGrid(){

let grid=document.getElementById("prayerGrid");
if(!grid) return;

grid.innerHTML="";

prayerList.forEach(p=>{

let div=document.createElement("div");
div.className="prayer-box";

if(p[0]===t.prayer[1]){
div.innerHTML=`<div style="font-size:24px;">⚙️</div><div>${t.settings}</div>`;
div.onclick=()=>openPage("settings");
}else{
div.innerHTML=`${p[0]}<br>${formatNumber(p[1])}`;
}

grid.appendChild(div);

});
}

/* ================= NAV ================= */

function openPage(page){
window.location.href="./html/"+page+".html";
}

/* ================= FEATURES ================= */

Object.keys(t.features).forEach(id=>setText(id,t.features[id]));

["namaz","quran","dua","hadith","qibla","tasbih"].forEach(id=>{
let el=document.getElementById(id);
if(el){
el.onclick=()=>openPage(id==="namaz"?"namaz-guide":id);
}
});

/* ================= EXTRA ================= */

let b=document.getElementById("bismillahCard");
if(b){
b.onclick=()=>openPage("allah-names");
}

let sBox=document.querySelector(".status");
if(sBox){
sBox.onclick=()=>openPage("calendar");
}

/* ================= QUOTES ================= */

let i=0;
setInterval(()=>{
setText("bottomText",t.quotes[i]);
i=(i+1)%t.quotes.length;
},3000);

/* ================= LANG AUTO ================= */

setInterval(()=>{
let newLang=getSettings().lang;
if(newLang!==currentLang) location.reload();
},1000);

});
