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

let today = new Date();

/* number convert */

function convertNumber(num){

const n = LANG[currentLang].numbers;

return num.toString().split("").map(d=>n[d]).join("");

}

/* hijri month name */

function getHijriMonth(date){

return new Intl.DateTimeFormat(
currentLang + "-u-ca-islamic",
{month:"long",year:"numeric"}
).format(date);

}

/* hijri day */

function getHijriDay(date){

return new Intl.DateTimeFormat(
currentLang + "-u-ca-islamic",
{day:"numeric"}
).format(date);

}

/* render calendar */

function renderCalendar(){

const title = document.getElementById("monthTitle");
const weekdayRow = document.getElementById("weekdays");
const grid = document.getElementById("calendarGrid");

title.innerText = getHijriMonth(today);

weekdayRow.innerHTML="";

LANG[currentLang].days.forEach(d=>{
const el=document.createElement("div");
el.innerText=d;
weekdayRow.appendChild(el);
});

grid.innerHTML="";

/* start day */

let firstDay = new Date(today.getFullYear(),today.getMonth(),1).getDay();

for(let i=0;i<firstDay;i++){
const empty=document.createElement("div");
empty.className="empty";
grid.appendChild(empty);
}

/* days */

for(let i=0;i<30;i++){

let d=new Date(today);

d.setDate(today.getDate()-today.getDate()+1+i);

const el=document.createElement("div");

el.className="day";

let hijri=getHijriDay(d);

el.innerHTML=`<div>${convertNumber(hijri)}</div>`;

grid.appendChild(el);

}

}

window.addEventListener("DOMContentLoaded",renderCalendar);
