// ================= LANG =================
const lang = localStorage.getItem("appLang") || "bn";

const text={
bn:{
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
fajr:"ফজর", sunrise:"সূর্যোদয়", dhuhr:"জোহর", asr:"আসর", maghrib:"মাগরিব", isha:"এশা",
namaz:"📚 নামাজ শিক্ষা", quran:"🕌 আল কুরআন", dua:"🤲 দোয়া", hadith:"📖 হাদিস",
qibla:"🕋 কিবলা কম্পাস", tasbih:"📿 ডিজিটাল তসবিহ",
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
weatherText:{clear:"পরিষ্কার",cloud:"মেঘলা",rain:"বৃষ্টি",snow:"তুষার",storm:"ঝড়"},
quotes:["নামাজ জান্নাতের চাবি","আল্লাহকে স্মরণ করো","ধৈর্যশীলদের সাথে আল্লাহ আছেন"]
},
en:{
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
fajr:"Fajr", sunrise:"Sunrise", dhuhr:"Dhuhr", asr:"Asr", maghrib:"Maghrib", isha:"Isha",
namaz:"📚 Namaz Guide", quran:"🕌 Al Quran", dua:"🤲 Dua", hadith:"📖 Hadith",
qibla:"🕋 Qibla Compass", tasbih:"📿 Digital Tasbih",
bismillah:"In the name of Allah",
weatherText:{clear:"Clear",cloud:"Cloudy",rain:"Rain",snow:"Snow",storm:"Storm"},
quotes:["Prayer is the key","Remember Allah","Allah is with patience"]
}
};

const T=text[lang];

function setText(id,val){
const el=document.getElementById(id);
if(el) el.innerText=val;
}

// ================= TEXT =================
setText("bismillahMeaning",T.bismillah);
setText("namaz",T.namaz);
setText("quran",T.quran);
setText("dua",T.dua);
setText("hadith",T.hadith);
setText("qibla",T.qibla);
setText("tasbih",T.tasbih);

// ================= DATE =================
const today=new Date();
setText("todayDay",T.days[today.getDay()]);
setText("date",today.toLocaleDateString("en-GB"));

// ================= CLOCK =================
setInterval(()=>{
const now=new Date();
setText("clock",now.toLocaleTimeString("en-GB",{hour12:false}));
},1000);

// ================= PRAYER =================
let prayerTimes=[];
let nextTime=null;

function loadPrayerTimes(lat,lon){
fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
.then(r=>r.json())
.then(d=>{

const t=d.data.timings;

prayerTimes=[
{name:T.fajr,time:t.Fajr},
{name:T.sunrise,time:t.Sunrise},
{name:T.dhuhr,time:t.Dhuhr},
{name:T.asr,time:t.Asr},
{name:T.maghrib,time:t.Maghrib},
{name:T.isha,time:t.Isha}
];

// 🔥 NEW RENDER (LIST STYLE)
renderPrayerList();

updatePrayer();

});
}

// 🔥 PRAYER LIST (ONE BOX)
function renderPrayerList(){

const box=document.getElementById("prayerList");
if(!box) return;

box.innerHTML="";

prayerTimes.forEach((p,i)=>{

const div=document.createElement("div");
div.className="prayer-item";
div.innerHTML=`${p.name}<br>${p.time}`;

div.onclick=()=>{
if(i===1){
location.href="html/calendar.html";
}else{
location.href="html/azan-setting.html";
}
};

box.appendChild(div);

});
}

// ================= CURRENT / NEXT =================
function updatePrayer(){

if(!prayerTimes.length) return;

const now=new Date();

for(let i=0;i<prayerTimes.length;i++){

let [h,m]=prayerTimes[i].time.split(":");

let pt=new Date();
pt.setHours(parseInt(h));
pt.setMinutes(parseInt(m));
pt.setSeconds(0);

if(now < pt){

nextTime=pt;

setText("currentPrayerName",
"🟢 "+(i===0 ? prayerTimes[5].name : prayerTimes[i-1].name));

setText("nextPrayerName",
"⏭️ "+prayerTimes[i].name);

return;
}
}

// fallback
setText("currentPrayerName","🟢 "+prayerTimes[5].name);
setText("nextPrayerName","⏭️ "+prayerTimes[0].name);

}

// ================= COUNTDOWN =================
setInterval(()=>{
if(!nextTime) return;

let diff=Math.floor((nextTime-new Date())/1000);

let h=Math.floor(diff/3600);
let m=Math.floor((diff%3600)/60);
let s=diff%60;

setText("countdown",h+":"+m+":"+s);

},1000);

// ================= WEATHER =================
function loadWeather(lat,lon){
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
.then(r=>r.json())
.then(d=>{
let temp=d.current_weather.temperature;
setText("weather",temp+"°C");
});
}

// ================= LOCATION =================
function loadLocation(lat,lon){
fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
.then(r=>r.json())
.then(d=>{
let city=d.address.city || d.address.town || d.address.village || d.address.state || "";
setText("city",city);
})
.catch(()=>setText("city","--"));
}

// ================= GEO =================
navigator.geolocation.getCurrentPosition(

pos=>{
let lat=pos.coords.latitude;
let lon=pos.coords.longitude;

loadPrayerTimes(lat,lon);
loadWeather(lat,lon);
loadLocation(lat,lon);
},

()=>{
// fallback Kolkata
let lat=22.5726, lon=88.3639;

loadPrayerTimes(lat,lon);
loadWeather(lat,lon);
loadLocation(lat,lon);
}

);

// ================= QUOTE =================
let qi=0;

setInterval(()=>{
setText("bottomText",T.quotes[qi]);
qi=(qi+1)%T.quotes.length;
},4000);
