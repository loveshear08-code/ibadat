document.addEventListener("DOMContentLoaded", function(){

/* ================= INIT ================= */

const s = getSettings();
applySettings();

let currentLang = s.lang;

/* ================= AUTO AZAN SYSTEM ================= */

let azanPlayed = {};
let azanAudio = new Audio();

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

    const WEATHER_MAP = {
    haze:{bn:"কুয়াশা", hi:"कुहासा", en:"Haze"},
    mist:{bn:"কুয়াশা", hi:"धुंध", en:"Mist"},
    fog:{bn:"কুয়াশা", hi:"कोहरा", en:"Fog"},
    smoke:{bn:"ধোঁয়া", hi:"धुआँ", en:"Smoke"},
    dust:{bn:"ধূলা", hi:"धूल", en:"Dust"},
    sand:{bn:"বালু", hi:"रेत", en:"Sand"},
    
    clear:{bn:"পরিষ্কার", hi:"साफ", en:"Clear"},
    clouds:{bn:"মেঘলা", hi:"बादल", en:"Clouds"},
    
    rain:{bn:"বৃষ্টি", hi:"बारिश", en:"Rain"},
    drizzle:{bn:"গুঁড়ি বৃষ্টি", hi:"बूंदाबांदी", en:"Drizzle"},
    
    thunderstorm:{bn:"বজ্রপাত", hi:"तूफान", en:"Thunderstorm"}
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
let lat=pos.coords.latitude;
let lon=pos.coords.longitude;

setCity(lat,lon);
loadWeather(lat,lon);
loadPrayer(lat,lon);

},fallback);
}else fallback();

function fallback(){
setCity();
loadWeather(22.5726,88.3639);
loadPrayer(22.5726,88.3639);
}

/* ================= CITY ================= */

async function setCity(lat,lon){
try{
if(!lat){
setText("city", s.lang==="bn"?"কলকাতা":s.lang==="hi"?"कोलकाता":"Kolkata");
return;
}
let res=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
let data=await res.json();

let city=data.city || data.locality || "Kolkata";

if(s.lang==="bn" && city==="Kolkata") city="কলকাতা";
if(s.lang==="hi" && city==="Kolkata") city="कोलकाता";

setText("city",city);

}catch{
setText("city","Kolkata");
}
}

/* ================= WEATHER (FIXED) ================= */

async function loadWeather(lat, lon){
try{

let apiKey="3cdd0e815e03d36fbdc1266a5a37da8e";

let langCode = s.lang==="hi" ? "hi" : "en";

let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${langCode}`);

let data = await res.json();

if(data.cod === 200){

let temp = Math.round(data.main.temp);
let raw = data.weather[0].main.toLowerCase();

let desc;

if(WEATHER_MAP[raw]){
    desc = WEATHER_MAP[raw][s.lang];
}else{
    if(s.lang === "bn"){
        desc = "🌤️ আবহাওয়া";
    }else if(s.lang === "hi"){
        desc = "🌤️ मौसम";
    }else{
        desc = "🌤️ Weather";
    }
}

setText("weather", formatNumber(temp + "°C " + desc));

}else{
setText("weather", t.weather);
}

}catch(e){
console.log(e);
setText("weather",t.weather);
}
}

/* ================= PRAYER ================= */

let prayerList=[];

async function loadPrayer(lat, lon){

let res=await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`);
let data=await res.json();

let tm=data.data.timings;
let hijri=data.data.date.hijri;

let month=t.hijriMonths[hijri.month.number-1];
setText("date",formatNumber(hijri.day+" "+month+" "+hijri.year));

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

/* ================= AZAN ================= */

function checkAzan(){
let now=new Date();

let currentTime=
String(now.getHours()).padStart(2,"0")+":"+
String(now.getMinutes()).padStart(2,"0");

prayerList.forEach(p=>{
if(!p[1]) return;
if(azanPlayed[p[0]]) return;

if(currentTime===p[1]){
let type=getSettings().azan || "makkah";
azanAudio.src=AZAN_FILES[type];
azanAudio.play().catch(()=>{});
azanPlayed[p[0]]=true;
}
});
}

setInterval(checkAzan,1000);

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
div.innerHTML=`<div style="font-size:16px;">⚙️</div><div>${t.settings}</div>`;
div.onclick=()=>openPage("settings");
}else{
div.innerHTML=`${p[0]}<br>${formatNumber(p[1]||"")}`;
}

grid.appendChild(div);

});

}

/* ================= FEATURES FIX ================= */

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
