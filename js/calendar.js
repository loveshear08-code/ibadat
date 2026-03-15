const LANG = {

bn:{
days:["রবি","সোম","মঙ্গল","বুধ","বৃহ","শুক্র","শনি"],
numbers:["০","১","২","৩","৪","৫","৬","৭","৮","৯"]
},

hi:{
days:["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"],
numbers:["०","१","२","३","४","५","६","७","८","९"]
},

en:{
days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
numbers:["0","1","2","3","4","5","6","7","8","9"]
}

};

let currentLang = localStorage.getItem("appLang") || "bn";

let currentDate = new Date();

/* number convert */

function convertNumber(num){

const n = LANG[currentLang].numbers;

return num.toString().split("").map(d=>n[d]).join("");

}

/* hijri day */

function getHijriDay(date){

return new Intl.DateTimeFormat(
"en-u-ca-islamic",
{day:"numeric"}
).format(date);

}

/* hijri month */

function getHijriMonth(date){

return new Intl.DateTimeFormat(
"en-u-ca-islamic",
{month:"long",year:"numeric"}
).format(date);

}

/* render calendar */

function renderCalendar(){

const title = document.getElementById("monthTitle");
const weekdayRow = document.getElementById("weekdays");
const grid = document.getElementById("calendarGrid");

title.innerText = getHijriMonth(currentDate);

/* weekdays */

weekdayRow.innerHTML="";

LANG[currentLang].days.forEach(d=>{
const el=document.createElement("div");
el.innerText=d;
weekdayRow.appendChild(el);
});

/* clear grid */

grid.innerHTML="";

/* create days */

for(let i=1;i<=30;i++){

let date=new Date(currentDate);
date.setDate(i);

let hijriDay=getHijriDay(date);

const el=document.createElement("div");
el.className="day";

el.innerHTML=convertNumber(hijriDay);

grid.appendChild(el);

}

}

window.addEventListener("DOMContentLoaded",renderCalendar);
