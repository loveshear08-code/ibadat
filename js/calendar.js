document.addEventListener("DOMContentLoaded",function(){

const grid=document.getElementById("calendarGrid");
const monthTitle=document.getElementById("monthTitle");
const prev=document.getElementById("prevMonth");
const next=document.getElementById("nextMonth");

let current=new Date();

/* ================= SETTINGS ================= */

let s = JSON.parse(localStorage.getItem("appSettings")) || {lang:"bn"};
let lang = s.lang;

/* ================= MONTHS ================= */

const MONTHS = {
bn:["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
en:["January","February","March","April","May","June","July","August","September","October","November","December"],
hi:["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"]
};

/* ================= BANGLA DATE ================= */

function getBanglaDate(date){

const banglaMonths=[
"বৈশাখ","জ্যৈষ্ঠ","আষাঢ়","শ্রাবণ","ভাদ্র","আশ্বিন",
"কার্তিক","অগ্রহায়ণ","পৌষ","মাঘ","ফাল্গুন","চৈত্র"
];

const start = new Date(date.getFullYear(),3,14);

let diff = Math.floor((date - start) / (1000*60*60*24));

if(diff < 0){
diff += 365;
}

let month = Math.floor(diff / 30);
let day = (diff % 30) + 1;
let year = date.getFullYear() - 593;

return `${day} ${banglaMonths[month]} ${year}`;
}

/* ================= HIJRI DATE ================= */

function getHijriDate(date){

let locale = lang === "bn" ? "bn" : (lang === "hi" ? "hi" : "en");

return new Intl.DateTimeFormat(locale + '-u-ca-islamic',{
day:'numeric',
month:'short',
year:'numeric'
}).format(date);

}

/* ================= DRAW ================= */

function drawCalendar(){

grid.innerHTML="";

const year=current.getFullYear();
const month=current.getMonth();

monthTitle.innerText=MONTHS[lang][month]+" "+year;

const firstDay=new Date(year,month,1).getDay();
const days=new Date(year,month+1,0).getDate();

let today=new Date();

/* empty */
for(let i=0;i<firstDay;i++){
const empty=document.createElement("div");
grid.appendChild(empty);
}

/* days */
for(let d=1;d<=days;d++){

let fullDate=new Date(year,month,d);

const cell=document.createElement("div");
cell.className="day";

cell.innerHTML=`
<div>${d}</div>
<div>${getBanglaDate(fullDate)}</div>
<div>${getHijriDate(fullDate)}</div>
`;

/* today highlight */
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

/* ================= NAV ================= */

prev.onclick=function(){
current.setMonth(current.getMonth()-1);
drawCalendar();
}

next.onclick=function(){
current.setMonth(current.getMonth()+1);
drawCalendar();
}

drawCalendar();

});
