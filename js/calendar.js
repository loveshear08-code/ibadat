document.addEventListener("DOMContentLoaded", async function(){

const grid = document.getElementById("calendarGrid");
const title = document.getElementById("monthTitle");
const prev = document.getElementById("prevMonth");
const next = document.getElementById("nextMonth");
const dayNamesDiv = document.getElementById("dayNames");

/* SETTINGS */
let s = JSON.parse(localStorage.getItem("appSettings")) || {lang:"bn"};
let lang = s.lang;

/* MONTHS */
const MONTHS = {
bn:["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
en:["January","February","March","April","May","June","July","August","September","October","November","December"],
hi:["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"]
};

/* DAYS */
const DAYS = {
bn:["রবি","সোম","মঙ্গল","বুধ","বৃহ","শুক্র","শনি"],
en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
hi:["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"]
};

/* HIJRI MONTH NAMES */
const H_MONTHS = {
bn:["মুহাররম","সফর","রবিউল আউয়াল","রবিউস সানি","জমাদিউল আউয়াল","জমাদিউস সানি","রজব","শাবান","রমজান","শাওয়াল","যিলকদ","যিলহজ্জ"],
en:["Muharram","Safar","Rabi I","Rabi II","Jumada I","Jumada II","Rajab","Shaban","Ramadan","Shawwal","Dhul Qadah","Dhul Hijjah"],
hi:["मुहर्रम","सफ़र","रबी I","रबी II","जुमादा I","जुमादा II","रजब","शाबान","रमज़ान","शव्वाल","ज़िलक़ादा","ज़िलहिज्जा"]
};

/* NUMBER FORMAT */
function formatNum(num){
if(lang==="bn") return num.toString().replace(/\d/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
if(lang==="hi") return num.toString().replace(/\d/g,d=>"०१२३४५६७८९"[d]);
return num;
}

/* DAY NAMES */
dayNamesDiv.innerHTML="";
DAYS[lang].forEach(d=>{
dayNamesDiv.innerHTML += `<div>${d}</div>`;
});

let current = new Date();

/* 🔥 HIJRI FETCH (MONTH BASED CACHE) */
async function fetchHijri(year,month){

let key = `hijri-${year}-${month}`;
let cached = localStorage.getItem(key);

if(cached){
return JSON.parse(cached);
}

let url = `https://api.aladhan.com/v1/gToHCalendar/${month+1}/${year}`;
let res = await fetch(url);
let data = await res.json();

localStorage.setItem(key, JSON.stringify(data.data));

return data.data;
}

/* DRAW */
async function draw(){

grid.innerHTML="";

let year = current.getFullYear();
let month = current.getMonth();

title.innerText = MONTHS[lang][month] + " " + formatNum(year);

/* API DATA */
let hijriData = await fetchHijri(year,month);

/* CALC */
let firstDay = new Date(year,month,1).getDay();
let totalDays = new Date(year,month+1,0).getDate();

let today = new Date();

/* EMPTY */
for(let i=0;i<firstDay;i++){
grid.innerHTML += `<div></div>`;
}

/* DAYS */
for(let d=1; d<=totalDays; d++){

let h = hijriData[d-1].hijri;

let hDay = formatNum(h.day);
let hMonth = H_MONTHS[lang][parseInt(h.month.number)-1];

let cell = document.createElement("div");
cell.className = "day";

/* 🔥 RAMADAN / EID */
let specialClass = "";
if(h.month.number == 9) specialClass = "ramadan";
if(h.month.number == 10 && h.day == 1) specialClass = "eid";

cell.classList.add(specialClass);

cell.innerHTML = `
<div class="eng">${formatNum(d)}</div>
<div class="hijri">${hDay} ${hMonth}</div>
`;

/* TODAY */
if(
d===today.getDate() &&
month===today.getMonth() &&
year===today.getFullYear()
){
cell.classList.add("today");
}

grid.appendChild(cell);
}

}

/* NAV */
prev.onclick = ()=>{
current.setMonth(current.getMonth()-1);
draw();
};

next.onclick = ()=>{
current.setMonth(current.getMonth()+1);
draw();
};

/* INIT */
draw();

});
