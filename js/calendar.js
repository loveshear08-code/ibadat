const LANG={

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

let currentLang=localStorage.getItem("appLang")||"bn";

let currentDate=new Date();

/* number convert */

function convertNumber(num){

const n=LANG[currentLang].numbers;

return num.toString().split("").map(d=>n[d]).join("");

}

/* hijri formatter */

function hijri(date,opt){

return new Intl.DateTimeFormat(
currentLang+"-u-ca-islamic",
opt
).format(date);

}

/* render */

function renderCalendar(){

const title=document.getElementById("monthTitle");
const weekdayRow=document.getElementById("weekdays");
const grid=document.getElementById("calendarGrid");

weekdayRow.innerHTML="";

LANG[currentLang].days.forEach(d=>{
const el=document.createElement("div");
el.innerText=d;
weekdayRow.appendChild(el);
});

title.innerText=hijri(currentDate,{month:"long",year:"numeric"});

grid.innerHTML="";

let firstDay=new Date(
currentDate.getFullYear(),
currentDate.getMonth(),
1
).getDay();

/* empty */

for(let i=0;i<firstDay;i++){

const e=document.createElement("div");
e.className="empty";
grid.appendChild(e);

}

/* days */

for(let i=1;i<=30;i++){

let d=new Date(
currentDate.getFullYear(),
currentDate.getMonth(),
i
);

let hDay=hijri(d,{day:"numeric"});

const el=document.createElement("div");

el.className="day";

el.innerHTML=convertNumber(hDay);

/* friday */

if(d.getDay()==5){
el.classList.add("friday");
}

/* today */

let now=new Date();

if(
i===now.getDate() &&
currentDate.getMonth()===now.getMonth()
){
el.classList.add("today");
}

/* ramadan */

let hMonth=hijri(d,{month:"numeric"});

if(hMonth==9){
el.classList.add("ramadan");
}

/* eid */

if(
(hMonth==10 && hDay==1) ||
(hMonth==12 && hDay==10)
){
el.classList.add("eid");
}

grid.appendChild(el);

}

}

renderCalendar();

/* buttons */

document.getElementById("prev").onclick=()=>{
currentDate.setMonth(currentDate.getMonth()-1);
renderCalendar();
};

document.getElementById("next").onclick=()=>{
currentDate.setMonth(currentDate.getMonth()+1);
renderCalendar();
};

/* swipe */

let startX=0;

document.addEventListener("touchstart",e=>{
startX=e.touches[0].clientX;
});

document.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX;

if(endX-startX>50){

currentDate.setMonth(currentDate.getMonth()-1);
renderCalendar();

}

if(startX-endX>50){

currentDate.setMonth(currentDate.getMonth()+1);
renderCalendar();

}

});
