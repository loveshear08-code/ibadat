document.addEventListener("DOMContentLoaded", function(){

/* ================= INIT ================= */

const s = getSettings();
applySettings();
let currentLang = s.lang;

/* ================= AZAN ================= */

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
hijriMonths:["মুহাররম","সফর","রবিউল আউয়াল","রবিউস সানি","জুমাদাল উলা","জুমাদাল আখিরা","রজব","শাবান","রমজান","শাওয়াল","জিলকদ","জিলহজ"],
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
prayer:["ফজর","জোহর","আসর","মাগরিব","এশা"]
},
en:{
bismillah:"In the name of Allah, Most Merciful",
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
hijriMonths:["Muharram","Safar","Rabi al-Awwal","Rabi al-Thani","Jumada al-Ula","Jumada al-Akhirah","Rajab","Sha'ban","Ramadan","Shawwal","Dhul Qa'dah","Dhul Hijjah"],
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
prayer:["Fajr","Dhuhr","Asr","Maghrib","Isha"]
},
hi:{
bismillah:"अल्लाह के नाम से जो रहमान और रहीम है",
days:["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
hijriMonths:["मुहर्रम","सफर","रबीउल अव्वल","रबीउस सानी","जुमादा","रजब","शाबान","रमज़ान","शव्वाल","ज़िलक़ादा","ज़िलहिज्जा"],
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
prayer:["फ़ज्र","ज़ुहर","असर","मग़रिब","इशा"]
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

setTimeout(()=>{
setText("bismillahMeaning",t.bismillah);
},100);

/* ================= CLOCK ================= */

setInterval(()=>{
let d=new Date();

let time=
String(d.getHours()).padStart(2,"0")+":"+
String(d.getMinutes()).padStart(2,"0")+":"+
String(d.getSeconds()).padStart(2,"0");

setText("clock",formatNumber(time));
setText("todayDay",t.days[d.getDay()]);

},1000);

/* ================= CITY ================= */

function setCity(){
let city="Kolkata";
if(s.lang==="bn") city="কলকাতা";
if(s.lang==="hi") city="कोलकाता";
setText("city",city);
}
setCity();

/* ================= WEATHER ================= */

async function loadWeather(lat, lon){

try{
let apiKey = "a7f2e6a4e4dd9b86ec885982fac12ace";

let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
let data = await res.json();

let temp = Math.round(data.main.temp);
let desc = data.weather[0].main;

setText("weather", formatNumber(temp+"°C "+desc));

}catch{
setText("weather", t.weather);
}

}

/* ================= PRAYER ================= */

let prayerList=[];

async function loadPrayer(){

let res=await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Kolkata&country=India&method=2`);
let data=await res.json();

let tm=data.data.timings;
let hijri=data.data.date.hijri;

/* Hijri only */
let monthName = t.hijriMonths[hijri.month.number-1];
let hijriText = hijri.day+" "+monthName+" "+hijri.year;
setText("date",formatNumber(hijriText));

/* LIST (NO SUNRISE) */
prayerList=[
[t.prayer[0],tm.Fajr],
[t.prayer[1],tm.Dhuhr],
[t.prayer[2],tm.Asr],
[t.prayer[3],tm.Maghrib],
[t.prayer[4],tm.Isha]
];

renderGrid();
updateStatus();

}

/* ================= GRID (FIXED) ================= */

function renderGrid(){

let grid=document.getElementById("prayerGrid");
if(!grid) return;

grid.innerHTML="";

/* Settings box */
let sBox=document.createElement("div");
sBox.className="prayer-box";
sBox.innerHTML=`⚙️<br>${t.settings}`;
sBox.onclick=()=>openPage("settings");

/* EXACT ORDER */
grid.appendChild(makeBox(prayerList[0])); // Fajr
grid.appendChild(sBox);                  // Settings
grid.appendChild(makeBox(prayerList[1])); // Dhuhr
grid.appendChild(makeBox(prayerList[2])); // Asr
grid.appendChild(makeBox(prayerList[3])); // Maghrib
grid.appendChild(makeBox(prayerList[4])); // Isha

}

function makeBox(p){
let div=document.createElement("div");
div.className="prayer-box";
div.innerHTML=`${p[0]}<br>${formatNumber(p[1])}`;
return div;
}

/* ================= STATUS ================= */

function getNext(){

let now=new Date();

for(let p of prayerList){
let [h,m]=p[1].split(":");
let tTime=new Date();
tTime.setHours(h,m,0);
if(now<tTime) return {name:p[0],time:tTime};
}

let [h,m]=prayerList[0][1].split(":");
let t2=new Date();
t2.setDate(t2.getDate()+1);
t2.setHours(h,m,0);

return {name:prayerList[0][0],time:t2};
}

function getCurrent(){

let now=new Date();

for(let i=prayerList.length-1;i>=0;i--){
let [h,m]=prayerList[i][1].split(":");
let tTime=new Date();
tTime.setHours(h,m,0);
if(now>=tTime) return prayerList[i][0];
}

return prayerList[0][0];
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

/* ================= CLICK ================= */

document.getElementById("bismillahCard").onclick=()=>openPage("allah-names");
document.querySelector(".status").onclick=()=>openPage("calendar");

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

/* ================= QUOTES ================= */

let i=0;
setInterval(()=>{
setText("bottomText",t.quotes[i]);
i=(i+1)%t.quotes.length;
},3000);

/* ================= START ================= */

loadWeather(22.5726,88.3639);
loadPrayer();

/* ================= LANG AUTO ================= */

setInterval(()=>{
let newLang=getSettings().lang;
if(newLang!==currentLang) location.reload();
},1000);

});
