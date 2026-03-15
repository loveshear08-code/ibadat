const lang = localStorage.getItem("appLang") || "bn";

/* LANGUAGE DATA */

const text = {

bn:{
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
fajr:"ফজর",
sunrise:"সূর্যোদয়",
dhuhr:"জোহর",
asr:"আসর",
maghrib:"মাগরিব",
isha:"এশা",

namaz:"📚 নামাজ শিক্ষা",
quran:"🕌 আল কুরআন",
dua:"🤲 দোয়া",
hadith:"📖 হাদিস",
qibla:"🕋 কিবলা কম্পাস",
tasbih:"📿 ডিজিটাল তসবিহ",

bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",

quotes:[
"নামাজ জান্নাতের চাবি",
"আল্লাহকে স্মরণ করো",
"ধৈর্যশীলদের সাথে আল্লাহ আছেন"
]

},

en:{
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
fajr:"Fajr",
sunrise:"Sunrise",
dhuhr:"Dhuhr",
asr:"Asr",
maghrib:"Maghrib",
isha:"Isha",

namaz:"📚 Namaz Guide",
quran:"🕌 Al Quran",
dua:"🤲 Dua",
hadith:"📖 Hadith",
qibla:"🕋 Qibla Compass",
tasbih:"📿 Digital Tasbih",

bismillah:"In the name of Allah, the Most Merciful",

quotes:[
"Prayer is the key to Paradise",
"Remember Allah",
"Allah is with the patient"
]

}

};

const T = text[lang];

/* BISMILLAH */

document.getElementById("bismillahMeaning").innerText = T.bismillah;

/* FEATURE TEXT */

document.getElementById("namaz").innerText = T.namaz;
document.getElementById("quran").innerText = T.quran;
document.getElementById("dua").innerText = T.dua;
document.getElementById("hadith").innerText = T.hadith;
document.getElementById("qibla").innerText = T.qibla;
document.getElementById("tasbih").innerText = T.tasbih;

/* DATE */

let today = new Date();

document.getElementById("date").innerText =
today.toLocaleDateString("en-GB");

document.getElementById("todayDay").innerText =
T.days[today.getDay()];

/* CLOCK */

function updateClock(){

let now = new Date();

let time = now.toLocaleTimeString("en-GB",{hour12:false});

document.getElementById("clock").innerText = time;

}

setInterval(updateClock,1000);

updateClock();

/* BOTTOM QUOTE */

function updateQuote(){

let q = T.quotes[Math.floor(Math.random()*T.quotes.length)];

document.getElementById("bottomText").innerText = q;

}

updateQuote();

setInterval(updateQuote,3600000);
