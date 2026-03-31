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

/* API CACHE */
async function fetchHijri(year,month){

let key = `hijri-${year}-${month}`;
let cached = localStorage.getItem(key);

if(cached){
return JSON.parse(cached);
}

let res = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month+1}/${year}`);
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

let hijriData = await fetchHijri(year,month);

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

let cell = document.createElement("div");
cell.className = "day";

/* ONLY NUMBER (CLEAN UI) */
cell.innerHTML = `
<div class="eng">${formatNum(d)}</div>
<div class="hijri">${formatNum(h.day)}</div>
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
