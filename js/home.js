const lang = localStorage.getItem("appLang") || "bn";

/* TEXT */

const text={
bn:{
days:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
fajr:"ফজর", sunrise:"সূর্যোদয়", dhuhr:"জোহর", asr:"আসর", maghrib:"মাগরিব", isha:"এশা",
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে",
location:"অবস্থান",
weather:"আবহাওয়া",
current:"বর্তমান",
next:"পরবর্তী",
quotes:["আল্লাহকে স্মরণ করো"]
},
en:{
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
fajr:"Fajr", sunrise:"Sunrise", dhuhr:"Dhuhr", asr:"Asr", maghrib:"Maghrib", isha:"Isha",
bismillah:"In the name of Allah",
location:"Location",
weather:"Weather",
current:"Current",
next:"Next",
quotes:["Remember Allah"]
}
};

const T=text[lang];

/* SAFE SET */

function setText(id,val){
let el=document.getElementById(id);
if(el) el.innerText=val;
}

/* DATE */

let today=new Date();
setText("todayDay",T.days[today.getDay()]);
setText("date",today.toLocaleDateString("en-GB"));

/* BISMILLAH */
setText("bismillahMeaning",T.bismillah);

/* PRAYER */

let prayerTimes=[];
let nextTime=null;

function loadPrayer(lat,lon){

fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
.then(r=>r.json())
.then(d=>{

let t=d.data.timings;

prayerTimes=[
{name:T.fajr,time:t.Fajr},
{name:T.sunrise,time:t.Sunrise},
{name:T.dhuhr,time:t.Dhuhr},
{name:T.asr,time:t.Asr},
{name:T.maghrib,time:t.Maghrib},
{name:T.isha,time:t.Isha}
];

renderGrid();
updateCurrent();

});

}

/* GRID */

function renderGrid(){

let grid=document.getElementById("prayerGrid");
grid.innerHTML="";

prayerTimes.forEach((p,i)=>{

let box=document.createElement("div");
box.className="prayer-box";
box.innerHTML=`<b>${p.name}</b><br>${p.time}`;

box.onclick=()=>{

if(i===1){
window.location.href="./sunrise.html";
}else{
localStorage.setItem("selectedPrayer",p.name);
window.location.href="./azan-setting.html";
}

};

grid.appendChild(box);

});

}

/* CURRENT + NEXT */

function updateCurrent(){

let now=new Date();

for(let i=0;i<prayerTimes.length;i++){

let [h,m]=prayerTimes[i].time.split(":");

let pt=new Date();
pt.setHours(h,m,0);

if(now<pt){

setText("currentPrayerName",prayerTimes[i-1]?.name || prayerTimes[5].name);
setText("nextPrayerName",prayerTimes[i].name);

return;

}

}

}

/* WEATHER */

function loadWeather(lat,lon){

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
.then(r=>r.json())
.then(d=>{

let temp=d.current_weather.temperature;
setText("weather",temp+"°C");

});

}

/* LOCATION */

function loadLocation(lat,lon){

fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
.then(r=>r.json())
.then(d=>{

let city=d.address.city || d.address.town || d.address.state;
setText("city",city);
setText("locationLabel",T.location);

})
.catch(()=>setText("city","--"));

}

/* GEO */

navigator.geolocation.getCurrentPosition(

p=>{
let lat=p.coords.latitude;
let lon=p.coords.longitude;

loadPrayer(lat,lon);
loadWeather(lat,lon);
loadLocation(lat,lon);
},

()=>{
let lat=22.57,lon=88.36;
loadPrayer(lat,lon);
loadWeather(lat,lon);
loadLocation(lat,lon);
}

);

/* FOOTER */
setText("bottomText",T.quotes[0]);
