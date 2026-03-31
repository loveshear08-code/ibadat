document.addEventListener("DOMContentLoaded", function(){

const grid = document.getElementById("calendarGrid");
const title = document.getElementById("monthTitle");
const dayNames = document.getElementById("dayNames");
const prev = document.getElementById("prevMonth");
const next = document.getElementById("nextMonth");

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

/* ================= HIJRI MONTHS ================= */

const HIJRI_MONTHS = {
bn:["মুহাররম","সফর","রবিউল আউয়াল","রবিউস সানি","জুমাদাল উলা","জুমাদাস সানিয়া","রজব","শাবান","রমজান","শাওয়াল","জিলকদ","জিলহজ্জ"],
en:["Muharram","Safar","Rabi I","Rabi II","Jumada I","Jumada II","Rajab","Shaban","Ramadan","Shawwal","Dhul Qadah","Dhul Hijjah"],
hi:["मुहर्रम","सफ़र","रबी I","रबी II","जुमादा I","जुमादा II","रजब","शाबान","रमज़ान","शव्वाल","ज़िलक़ादा","ज़िलहिज्जा"]
};

/* ================= NUMBER ================= */

function formatNumber(num){
let str=num.toString();
if(lang==="bn") return str.replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
if(lang==="hi") return str.replace(/[0-9]/g,d=>"०१२३४५६७८९"[d]);
return str;
}

/* ================= HIJRI (OFFLINE CALCULATION) ================= */

function getHijri(date){

// Julian Day
let jd = Math.floor((date - new Date(622,6,16)) / 86400000);

// Hijri calculation
let hYear = Math.floor(jd / 354.367);
let hMonth = Math.floor((jd % 354.367) / 29.5);
let hDay = Math.floor((jd % 29.5)) + 1;

// Fix range
if(hMonth < 0) hMonth = 0;
if(hMonth > 11) hMonth = 11;

let monthName = HIJRI_MONTHS[lang][hMonth];

return formatNumber(hDay) + " " + monthName;
}

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

/* ================= DRAW ================= */

function draw(){

grid.innerHTML="";

let year=current.getFullYear();
let month=current.getMonth();

title.innerText=TEXT[lang].months[month]+" "+formatNumber(year);

let firstDay=new Date(year,month,1).getDay();
let totalDays=new Date(year,month+1,0).getDate();

let today=new Date();

/* EMPTY */
for(let i=0;i<firstDay;i++){
grid.appendChild(document.createElement("div"));
}

/* DAYS */
for(let d=1; d<=totalDays; d++){

let full=new Date(year,month,d);

let div=document.createElement("div");
div.className="day";

div.innerHTML=`
<div class="eng">${formatNumber(d)}</div>
<div class="hijri">${getHijri(full)}</div>
`;

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

prev.onclick=()=>{
current.setMonth(current.getMonth()-1);
draw();
};

next.onclick=()=>{
current.setMonth(current.getMonth()+1);
draw();
};

/* ================= INIT ================= */

renderDays();
draw();

});
