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

/* 👉 GPS FAIL হলে fallback */
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
setText("city", loc.city || "Kolkata");
}catch{
setText("city","Kolkata");
}

/* WEATHER */
loadWeather(lat, lon);

/* PRAYER */
loadPrayer(lat, lon);

}

/* 👉 fallback (GPS off হলে Kolkata use করবে) */
function fallback(){

setText("city","Kolkata");

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

/* DATE */
let now=new Date();
let eng = now.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
let hij = `${hijri.day} ${hijri.month.en} ${hijri.year}`;

setText("date", formatNumber(eng+" | "+hij));

/* PRAYER LIST */
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
for(let p of prayerList){
let [h,m]=p[1].split(":");
let t=new Date();
t.setHours(h,m,0);
if(now<t) return {name:p[0],time:t};
}
return null;
}

function updateStatus(){

if(!prayerList.length) return;

let next=getNext();
if(!next) return;

setText("nextPrayerName","⏭ "+next.name);

}

/* ================= GRID ================= */

function renderGrid(){

let grid=document.getElementById("prayerGrid");
if(!grid) return;

grid.innerHTML="";

prayerList.forEach(p=>{

let div=document.createElement("div");
div.className="prayer-box";
div.innerHTML=`${p[0]}<br>${formatNumber(p[1])}`;
grid.appendChild(div);

});

}

/* ================= FEATURES ================= */

Object.keys(t.features).forEach(id=>setText(id,t.features[id]));

/* ================= QUOTES ================= */

let i=0;
setInterval(()=>{
setText("bottomText",t.quotes[i]);
i=(i+1)%t.quotes.length;
},3000);

});
