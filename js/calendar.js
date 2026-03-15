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

const HIJRI_MONTHS = {

bn:[
"মুহাররম","সফর","রবিউল আউয়াল","রবিউস সানি",
"জমাদিউল আউয়াল","জমাদিউস সানি",
"রজব","শাবান","রমজান",
"শাওয়াল","জিলকদ","জিলহজ"
],

hi:[
"मुहर्रम","सफ़र","रबीउल अव्वल","रबीउस्सानी",
"जमादिउल अव्वल","जमादिउस्सानी",
"रजब","शाबान","रमज़ान",
"शव्वाल","ज़िलक़ादा","ज़िलहिज्जा"
],

en:[
"Muharram","Safar","Rabi al-Awwal","Rabi al-Thani",
"Jumada al-Awwal","Jumada al-Thani",
"Rajab","Shaban","Ramadan",
"Shawwal","Dhul Qa'dah","Dhul Hijjah"
]

};

let currentLang = localStorage.getItem("appLang") || "bn";

let currentDate = new Date();

function convertNumber(num){

const n = LANG[currentLang].numbers;

return num.toString().split("").map(d=>n[d]).join("");

}

function getHijri(date){

const parts = new Intl.DateTimeFormat(
"en-u-ca-islamic",
{day:"numeric",month:"numeric",year:"numeric"}
).formatToParts(date);

let d,m,y;

parts.forEach(p=>{
if(p.type==="day") d=p.value;
if(p.type==="month") m=p.value;
if(p.type==="year") y=p.value;
});

return {
day:parseInt(d),
month:parseInt(m)-1,
year:y
};

}

function renderCalendar(){

const title=document.getElementById("monthTitle");
const weekdayRow=document.getElementById("weekdays");
const grid=document.getElementById("calendarGrid");

const hijri=getHijri(currentDate);

title.innerText=
HIJRI_MONTHS[currentLang][hijri.month]
+" "+
convertNumber(hijri.year);

weekdayRow.innerHTML="";

LANG[currentLang].days.forEach(d=>{
const el=document.createElement("div");
el.innerText=d;
weekdayRow.appendChild(el);
});

grid.innerHTML="";

const today=new Date();

for(let i=0;i<30;i++){

let date=new Date(currentDate);
date.setDate(date.getDate()-hijri.day+i+1);

const h=getHijri(date);

const el=document.createElement("div");
el.className="day";

if(
date.toDateString()===today.toDateString()
){
el.classList.add("today");
}

el.innerText=convertNumber(h.day);

grid.appendChild(el);

}

}

document.getElementById("prevBtn").onclick=()=>{
currentDate.setMonth(currentDate.getMonth()-1);
renderCalendar();
};

document.getElementById("nextBtn").onclick=()=>{
currentDate.setMonth(currentDate.getMonth()+1);
renderCalendar();
};

window.addEventListener("DOMContentLoaded",renderCalendar);
