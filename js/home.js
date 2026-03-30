document.addEventListener("DOMContentLoaded", function(){

/* ================= INIT ================= */

const s = getSettings();
applySettings();

let currentLang = s.lang;

/* ================= AUTO AZAN SYSTEM ================= */

let azanPlayed = {};
let lastAzan = "";
let azanAudio = new Audio();

let userLat = 22.5726;
let userLon = 88.3639;

const AZAN_FILES = {
    makkah: "assets/makkah.mp3",
    madinah: "assets/madinah.mp3",
    kuwait: "assets/kuwait.mp3",
    bangladesh: "assets/bangladesh.mp3",
    alaska: "assets/alaska.mp3"
};

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
prayer:["ফজর","সেটিং","যোহর","আসর","মাগরিব","এশা"],
hijriMonths:["মুহাররম","সফর","রবিউল আউয়াল","রবিউস সানি","জুমাদাল উলা","জুমাদাস সানিয়া","রজব","শাবান","রমজান","শাওয়াল","জিলকদ","জিলহজ্জ"]
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
prayer:["Fajr","Settings","Dhuhr","Asr","Maghrib","Isha"],
hijriMonths:["Muharram","Safar","Rabi al Awwal","Rabi al Thani","Jumada al Ula","Jumada al Akhirah","Rajab","Shaban","Ramadan","Shawwal","Dhul Qadah","Dhul Hijjah"]
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
prayer:["फ़ज्र","सेटिंग","ज़ुहर","असर","मग़रिब","इशा"],
hijriMonths:["मुहर्रम","सफ़र","रबी अल अव्वल","रबी अस सानी","जुमादा अल ऊला","जुमादा अस सानिया","रजब","शाबान","रमज़ान","शव्वाल","ज़िलक़ादा","ज़िलहिज्जा"]
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

/* ================= LOCATION ================= */

if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(pos=>{
userLat=pos.coords.latitude;
userLon=pos.coords.longitude;

setCity(userLat,userLon);
loadWeather(userLat,userLon);
loadPrayer(userLat,userLon);

},fallback);
}else fallback();

function fallback(){
setCity();
loadWeather(userLat,userLon);
loadPrayer(userLat,userLon);
}

/* ================= CITY ================= */

async function setCity(lat,lon){
try{
if(!lat){
setText("city","কলকাতা");
return;
}
let res=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`);
let data=await res.json();

let city=data.city || data.locality || "Kolkata";
if(s.lang==="bn" && city==="Kolkata") city="কলকাতা";

setText("city",city);

}catch{
setText("city","Kolkata");
}
}

/* ================= WEATHER FIX ================= */

function translateWeather(desc){
desc = desc.toLowerCase();

if(desc.includes("clear")) return "রোদ";
if(desc.includes("cloud")) return "মেঘলা";
if(desc.includes("rain")) return "বৃষ্টি";
if(desc.includes("mist") || desc.includes("fog")) return "কুয়াশা";

return "আবহাওয়া";
}

async function loadWeather(lat, lon){
try{

let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3cdd0e815e03d36fbdc1266a5a37da8e&units=metric`);
let data = await res.json();

let temp = Math.round(data.main.temp);
let desc = translateWeather(data.weather[0].description);

setText("weather", formatNumber(temp+"°C "+desc));

}catch{
setText("weather",t.weather);
}
}

/* AUTO UPDATE */
setInterval(()=>{
loadWeather(userLat,userLon);
},600000);

/* ================= PRAYER ================= */

let prayerList=[];

async function loadPrayer(lat, lon){

let res=await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`);
let data=await res.json();

let tm=data.data.timings;

prayerList=[
[t.prayer[0],tm.Fajr],
[t.prayer[1],""],
[t.prayer[2],tm.Dhuhr],
[t.prayer[3],tm.Asr],
[t.prayer[4],tm.Maghrib],
[t.prayer[5],tm.Isha]
];

renderGrid();
updateStatus();

}

/* ================= AZAN FIX ================= */

function checkAzan(){

let now=new Date();
let h=now.getHours();
let m=now.getMinutes();

prayerList.forEach(p=>{

if(!p[1]) return;

let [ph,pm]=p[1].split(":").map(Number);

if(h===ph && m===pm){

let id = p[0]+"_"+new Date().toDateString();
if(lastAzan===id) return;

lastAzan=id;

let type=getSettings().azan || "makkah";
azanAudio.src=AZAN_FILES[type];
azanAudio.play().catch(()=>{});

}

});
}

setInterval(checkAzan,10000);

/* ================= STATUS ================= */

function getNext(){
let now=new Date();
let valid=prayerList.filter(p=>p[1]);

for(let p of valid){
let [h,m]=p[1].split(":");
let tTime=new Date();
tTime.setHours(h,m,0);
if(now<tTime) return {name:p[0],time:tTime};
}

let [h,m]=valid[0][1].split(":");
let t2=new Date();
t2.setDate(t2.getDate()+1);
t2.setHours(h,m,0);

return {name:valid[0][0],time:t2};
}

function getCurrent(){
let now=new Date();
let valid=prayerList.filter(p=>p[1]);

for(let i=valid.length-1;i>=0;i--){
let [h,m]=valid[i][1].split(":");
let tTime=new Date();
tTime.setHours(h,m,0);
if(now>=tTime) return valid[i][0];
}

return valid[0][0];
}

function updateStatus(){
if(!prayerList.length) return;

let next=getNext();
let current=getCurrent();

setText("currentPrayerName","● "+current);
setText("nextPrayerName","⏭ "+next.name);

let diff=next.time-new Date();
if(diff<0) diff=0;

let time=
String(Math.floor(diff/3600000)).padStart(2,"0")+":"+
String(Math.floor((diff%3600000)/60000)).padStart(2,"0")+":"+
String(Math.floor((diff%60000)/1000)).padStart(2,"0");

setText("countdown",formatNumber(time));
}

setInterval(updateStatus,1000);

/* ================= GRID ================= */

function renderGrid(){

let grid=document.getElementById("prayerGrid");
grid.innerHTML="";

prayerList.forEach(p=>{

let div=document.createElement("div");
div.className="prayer-box";

if(p[0]===t.prayer[1]){
div.innerHTML=`<div>⚙️</div><div>${t.settings}</div>`;
div.onclick=()=>openPage("settings");
}else{
div.innerHTML=`${p[0]}<br>${formatNumber(p[1]||"")}`;
}

grid.appendChild(div);

});

}

/* ================= FEATURES ================= */

setTimeout(()=>{
["namaz","quran","dua","hadith","qibla","tasbih"].forEach(id=>{
let el=document.getElementById(id);
if(!el) return;

el.innerText=t.features[id];
el.onclick=()=>openPage(id==="namaz"?"namaz-guide":id);
});
},100);

/* ================= NAV ================= */

function openPage(page){
window.location.href="./html/"+page+".html";
}

/* ================= EXTRA ================= */

document.getElementById("bismillahCard").onclick=()=>openPage("allah-names");
document.querySelector(".status").onclick=()=>openPage("calendar");

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
