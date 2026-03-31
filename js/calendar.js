document.addEventListener("DOMContentLoaded", function(){

const grid = document.getElementById("calendarGrid");
const title = document.getElementById("monthTitle");
const dayNames = document.getElementById("dayNames");
const prev = document.getElementById("prevMonth");
const next = document.getElementById("nextMonth");

/* ================= SETTINGS ================= */

let s = typeof getSettings === "function" ? getSettings() : {lang:"bn"};
let lang = s.lang || "bn";

/* ================= TEXT ================= */

const TEXT = {
bn:{
months:["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
days:["রবি","সোম","মঙ্গল","বুধ","বৃহ","শুক্র","শনি"]
},
en:{
months:["January","February","March","April","May","June","July","August","September","October","November","December"],
days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
},
hi:{
months:["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"],
days:["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"]
}
};

/* ================= CURRENT ================= */

let current = new Date();

/* ================= DAY NAMES ================= */

function renderDays(){
dayNames.innerHTML="";
TEXT[lang].days.forEach(d=>{
let div=document.createElement("div");
div.innerText=d;
dayNames.appendChild(div);
});
}

/* ================= HIJRI ================= */

function getHijri(date){
return new Intl.DateTimeFormat('en-TN-u-ca-islamic',{
day:'numeric',
month:'short'
}).format(date);
}

/* ================= DRAW ================= */

function draw(){

grid.innerHTML="";

let year = current.getFullYear();
let month = current.getMonth();

title.innerText = TEXT[lang].months[month] + " " + year;

let firstDay = new Date(year,month,1).getDay();
let totalDays = new Date(year,month+1,0).getDate();

let today = new Date();

/* EMPTY */
for(let i=0;i<firstDay;i++){
grid.appendChild(document.createElement("div"));
}

/* DAYS */
for(let d=1; d<=totalDays; d++){

let full = new Date(year,month,d);

let div = document.createElement("div");
div.className="day";

div.innerHTML = `
<div class="eng">${d}</div>
<div class="hijri">${getHijri(full)}</div>
`;

/* TODAY */
if(
d===today.getDate() &&
month===today.getMonth() &&
year===today.getFullYear()
){
div.classList.add("today");
}

grid.appendChild(div);
}

}

/* ================= NAV ================= */

prev.onclick = ()=>{
current.setMonth(current.getMonth()-1);
draw();
};

next.onclick = ()=>{
current.setMonth(current.getMonth()+1);
draw();
};

/* ================= INIT ================= */

renderDays();
draw();

});
