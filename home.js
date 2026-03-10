const lang = localStorage.getItem("appLang") || "bn";

const text = {

bn:{
current:"বর্তমান ওয়াক্ত",
next:"পরবর্তী ওয়াক্ত",
fajr:"ফজর",
sunrise:"সূর্যোদয়",
dhuhr:"জোহর",
asr:"আসর",
maghrib:"মাগরিব",
isha:"এশা",
qibla:"🕋 কিবলা কম্পাস",
tasbih:"📿 ডিজিটাল তসবিহ",
namaz:"📚 নামাজ শিক্ষা",
quran:"🕌 আল কুরআন",
quotes:[
"নামাজ জান্নাতের চাবি",
"আল্লাহকে স্মরণ করো তিনি তোমাকে স্মরণ করবেন",
"ধৈর্যশীলদের সাথে আল্লাহ আছেন",
"তাওবা কারীদের আল্লাহ ভালোবাসেন"
]
},

en:{
current:"Current Prayer",
next:"Next Prayer",
fajr:"Fajr",
sunrise:"Sunrise",
dhuhr:"Dhuhr",
asr:"Asr",
maghrib:"Maghrib",
isha:"Isha",
qibla:"🕋 Qibla Compass",
tasbih:"📿 Digital Tasbih",
namaz:"📚 Namaz Guide",
quran:"🕌 Al Quran",
quotes:[
"Prayer is the key to Paradise",
"Remember Allah and He will remember you",
"Indeed Allah is with the patient",
"Allah loves those who repent"
]
},

hi:{
current:"वर्तमान नमाज़",
next:"अगली नमाज़",
fajr:"फ़ज्र",
sunrise:"सूर्योदय",
dhuhr:"ज़ुहर",
asr:"असर",
maghrib:"मगरिब",
isha:"इशा",
qibla:"🕋 क़िबला कम्पास",
tasbih:"📿 डिजिटल तस्बीह",
namaz:"📚 नमाज़ शिक्षा",
quran:"🕌 अल कुरआन",
quotes:[
"नमाज़ जन्नत की कुंजी है",
"अल्लाह को याद करो वह तुम्हें याद करेगा",
"अल्लाह सब्र करने वालों के साथ है",
"अल्लाह तौबा करने वालों से प्रेम करता है"
]
}

};

const T = text[lang];


/* CITY LANGUAGE MAP */

const cityNames = {
Kolkata:{
bn:"কলকাতা",
en:"Kolkata",
hi:"कोलकाता"
}
};


/* LABELS */

document.getElementById("currentLabel").innerText = T.current;
document.getElementById("nextLabel").innerText = T.next;

document.getElementById("qibla").innerText = T.qibla;
document.getElementById("tasbih").innerText = T.tasbih;
document.getElementById("namaz").innerText = T.namaz;
document.getElementById("quran").innerText = T.quran;


/* NUMBER CONVERT */

function convertNumber(str){

if(lang==="bn"){
const bn=["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
return str.replace(/[0-9]/g,d=>bn[d]);
}

if(lang==="hi"){
const hi=["०","१","२","३","४","५","६","७","८","९"];
return str.replace(/[0-9]/g,d=>hi[d]);
}

return str;

}


/* DATE */

function updateDate(){

let today = new Date();

document.getElementById("date").innerText =
convertNumber(today.toLocaleDateString("en-GB"));

}

updateDate();


/* CLOCK */

function updateClock(){

let now = new Date();

let time = now.toLocaleTimeString("en-GB");

document.getElementById("clock").innerText =
convertNumber(time);

}

setInterval(updateClock,1000);
updateClock();


/* PRAYER TIMES */

let prayerTimes = [];
let nextTime = null;


function loadPrayerTimes(lat,lon){

fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
.then(res=>res.json())
.then(data=>{

let t = data.data.timings;

prayerTimes = [

{name:T.fajr,time:t.Fajr},
{name:T.sunrise,time:t.Sunrise},
{name:T.dhuhr,time:t.Dhuhr},
{name:T.asr,time:t.Asr},
{name:T.maghrib,time:t.Maghrib},
{name:T.isha,time:t.Isha}

];

renderPrayerGrid();
updatePrayerStatus();

});

}


/* PRAYER GRID */

function renderPrayerGrid(){

const grid = document.getElementById("prayerGrid");

grid.innerHTML = "";

prayerTimes.forEach(p=>{

let div = document.createElement("div");

div.className="prayer-box";

div.innerHTML = "<b>"+p.name+"</b><br>"+convertNumber(p.time);

grid.appendChild(div);

});

}


/* CURRENT + NEXT PRAYER */

function updatePrayerStatus(){

if(prayerTimes.length===0) return;

let now = new Date();

let current="";
let next="";

for(let i=0;i<prayerTimes.length;i++){

let [h,m] = prayerTimes[i].time.split(":");

let pt = new Date();

pt.setHours(h);
pt.setMinutes(m);
pt.setSeconds(0);

if(now < pt){

next = prayerTimes[i].name;
nextTime = pt;

current = i===0 ? prayerTimes[5].name : prayerTimes[i-1].name;

break;

}

}

if(next===""){

current = prayerTimes[5].name;

let [h,m] = prayerTimes[0].time.split(":");

next = prayerTimes[0].name;

nextTime = new Date();

nextTime.setDate(nextTime.getDate()+1);
nextTime.setHours(h);
nextTime.setMinutes(m);

}

document.getElementById("currentPrayerName").innerText = current;
document.getElementById("nextPrayerName").innerText = next;

}


/* COUNTDOWN */

function updateCountdown(){

if(!nextTime) return;

let diff = Math.floor((nextTime.getTime() - Date.now())/1000);

let h = Math.floor(diff/3600);
let m = Math.floor((diff%3600)/60);
let s = Math.floor(diff%60);

let time =
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

document.getElementById("countdown").innerText =
convertNumber(time);

}

setInterval(updatePrayerStatus,30000);
setInterval(updateCountdown,1000);


/* LOCATION */

navigator.geolocation.getCurrentPosition(

function(pos){

let lat = pos.coords.latitude;
let lon = pos.coords.longitude;

loadPrayerTimes(lat,lon);

fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
.then(res=>res.json())
.then(data=>{

let city =
data.address.city ||
data.address.town ||
data.address.village ||
"Kolkata";

let cityText = cityNames[city]?.[lang] || city;

document.getElementById("city").innerText = cityText;

});

},

function(){

loadPrayerTimes(22.5726,88.3639);

document.getElementById("city").innerText =
cityNames["Kolkata"][lang];

}

);


/* BOTTOM QUOTE */

let quotes = T.quotes;

let randomQuote = quotes[Math.floor(Math.random()*quotes.length)];

document.getElementById("bottomText").innerText = randomQuote;