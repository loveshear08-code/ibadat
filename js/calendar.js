const LANG = {

bn:{
days:["রবি","সোম","মঙ্গল","বুধ","বৃহ","শুক্র","শনি"],
months:["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
numbers:["০","১","২","৩","৪","৫","৬","৭","৮","৯"]
},

hi:{
days:["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"],
months:["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"],
numbers:["०","१","२","३","४","५","६","७","८","९"]
},

en:{
days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
months:["January","February","March","April","May","June","July","August","September","October","November","December"],
numbers:["0","1","2","3","4","5","6","7","8","9"]
}

};

let currentLang = localStorage.getItem("appLang") || "bn";
let currentDate = new Date();

/* convert number */

function convertNumber(num){

const n = LANG[currentLang].numbers;

return num.toString().split("").map(d=>n[d]).join("");

}

/* render calendar */

function renderCalendar(){

const title = document.getElementById("monthTitle");
const weekdayRow = document.getElementById("weekdays");
const grid = document.getElementById("calendarGrid");

const year = currentDate.getFullYear();
const month = currentDate.getMonth();

const firstDay = new Date(year,month,1).getDay();
const lastDate = new Date(year,month+1,0).getDate();

const lang = LANG[currentLang];

title.innerText = lang.months[month] + " " + convertNumber(year);

weekdayRow.innerHTML="";

lang.days.forEach(d=>{
const el=document.createElement("div");
el.innerText=d;
weekdayRow.appendChild(el);
});

grid.innerHTML="";

for(let i=0;i<firstDay;i++){
const empty=document.createElement("div");
empty.className="empty";
grid.appendChild(empty);
}

const today = new Date();

for(let d=1;d<=lastDate;d++){

const date=new Date(year,month,d);

const el=document.createElement("div");
el.className="day";

if(date.getDay()==6){
el.classList.add("sat");
}

if(
d===today.getDate() &&
month===today.getMonth() &&
year===today.getFullYear()
){
el.classList.add("today");
}

el.innerHTML=`
<div>${convertNumber(d)}</div>
<div class="small">${d}</div>
`;

grid.appendChild(el);

}

}

/* auto update month */

setInterval(()=>{
let now=new Date();
if(now.getMonth()!=currentDate.getMonth()){
currentDate=now;
renderCalendar();
}
},60000);

window.addEventListener("DOMContentLoaded",renderCalendar);
