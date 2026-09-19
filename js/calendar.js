document.addEventListener("DOMContentLoaded", function(){

/* ================= ELEMENTS ================= */

const grid = document.getElementById("calendarGrid");
const title = document.getElementById("monthTitle");
const prev = document.getElementById("prevMonth");
const next = document.getElementById("nextMonth");
const dayNamesDiv = document.getElementById("dayNames");

const eventsTitle =
    document.getElementById("eventsTitle");

const eventsTimeline =
    document.getElementById("eventsTimeline");


/* ================= SETTINGS ================= */

let s =
    JSON.parse(
        localStorage.getItem("appSettings")
    ) || {lang:"bn"};

let lang =
    s.lang || "bn";


/* ================= MONTHS ================= */

const MONTHS = {

bn:[
"জানুয়ারি",
"ফেব্রুয়ারি",
"মার্চ",
"এপ্রিল",
"মে",
"জুন",
"জুলাই",
"আগস্ট",
"সেপ্টেম্বর",
"অক্টোবর",
"নভেম্বর",
"ডিসেম্বর"
],

en:[
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
],

hi:[
"जनवरी",
"फ़रवरी",
"मार्च",
"अप्रैल",
"मई",
"जून",
"जुलाई",
"अगस्त",
"सितंबर",
"अक्टूबर",
"नवंबर",
"दिसंबर"
]

};


/* ================= DAYS ================= */

const DAYS = {

bn:[
"রবি",
"সোম",
"মঙ্গল",
"বুধ",
"বৃহ",
"শুক্র",
"শনি"
],

en:[
"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat"
],

hi:[
"रवि",
"सोम",
"मंगल",
"बुध",
"गुरु",
"शुक्र",
"शनि"
]

};


/* ================= EVENTS TEXT ================= */

const EVENT_TEXT = {

bn:{
title:"এই মাসের ইসলামিক বিশেষ দিন",
empty:"এই মাসে কোনো বিশেষ ইসলামিক দিন পাওয়া যায়নি",
events:{
"1-1":"ইসলামী নববর্ষ",
"10-1":"আশুরা",
"12-3":"ঈদে মিলাদুন্নবী ﷺ",
"27-7":"শবে মেরাজ",
"15-8":"শবে বরাত",
"1-9":"রমজানের প্রথম দিন",
"27-9":"শবে কদর",
"1-10":"ঈদুল ফিতর",
"9-12":"আরাফার দিন",
"10-12":"ঈদুল আজহা"
}
},

en:{
title:"Islamic Special Days This Month",
empty:"No special Islamic day found this month",
events:{
"1-1":"Islamic New Year",
"10-1":"Ashura",
"12-3":"Mawlid an-Nabi ﷺ",
"27-7":"Laylat al-Miraj",
"15-8":"Laylat al-Bara'at",
"1-9":"First Day of Ramadan",
"27-9":"Laylat al-Qadr",
"1-10":"Eid al-Fitr",
"9-12":"Day of Arafah",
"10-12":"Eid al-Adha"
}
},

hi:{
title:"इस महीने के इस्लामी विशेष दिन",
empty:"इस महीने कोई विशेष इस्लामी दिन नहीं मिला",
events:{
"1-1":"इस्लामी नव वर्ष",
"10-1":"आशूरा",
"12-3":"ईद मिलादुन्नबी ﷺ",
"27-7":"शबे मेराज",
"15-8":"शबे बरात",
"1-9":"रमज़ान का पहला दिन",
"27-9":"शबे क़द्र",
"1-10":"ईद-उल-फ़ित्र",
"9-12":"अरफ़ा का दिन",
"10-12":"ईद-उल-अज़हा"
}
}

};


/* ================= NUMBER FORMAT ================= */

function formatNum(num){

if(lang==="bn"){

return num
.toString()
.replace(
/\d/g,
d=>"০১২৩৪৫৬৭৮৯"[d]
);

}

if(lang==="hi"){

return num
.toString()
.replace(
/\d/g,
d=>"०१२३४५६७८९"[d]
);

}

return num;

}


/* ================= DAY NAMES ================= */

function renderDays(){

dayNamesDiv.innerHTML="";

DAYS[lang].forEach(d=>{

dayNamesDiv.innerHTML +=
`<div>${d}</div>`;

});

}


/* ================= CURRENT ================= */

let current =
    new Date();


/* ================= EVENTS ================= */

function renderEvents(){

eventsTitle.innerText =
    EVENT_TEXT[lang].title;

eventsTimeline.innerHTML = "";


/*
   এই অংশটি বর্তমানে পরিচিত
   গুরুত্বপূর্ণ ইসলামিক দিনগুলোর
   Hijri month/day-এর সঙ্গে
   Gregorian month-এর calendar
   মিলিয়ে দেখবে।
*/

const events =
    EVENT_TEXT[lang].events;


/*
   বর্তমানে Calendar-এর Gregorian
   month অনুযায়ী AlAdhan-এর Hijri
   data আনা হচ্ছে।
*/

const year =
    current.getFullYear();

const month =
    current.getMonth() + 1;


eventsTimeline.innerHTML =
    `<div class="event-empty">
    ${EVENT_TEXT[lang].empty}
    </div>`;


/*
   AlAdhan Gregorian → Hijri Calendar API
*/

fetch(
`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`
)

.then(response=>response.json())

.then(data=>{

if(
!data ||
!data.data ||
!Array.isArray(data.data)
){

return;

}


let found = [];


data.data.forEach(day=>{

if(
!day.hijri ||
!day.hijri.day ||
!day.hijri.month
){

return;

}


const hijriDay =
    Number(day.hijri.day);

const hijriMonth =
    Number(day.hijri.month.number);


const key =
    hijriDay +
    "-" +
    hijriMonth;


if(events[key]){

found.push({

date:
    Number(
        day.gregorian.day
    ),

hijriDay:
    hijriDay,

hijriMonth:
    hijriMonth,

name:
    events[key]

});

}

});


if(found.length===0){

eventsTimeline.innerHTML =
`<div class="event-empty">
${EVENT_TEXT[lang].empty}
</div>`;

return;

}


eventsTimeline.innerHTML = "";


found.forEach(event=>{

const item =
    document.createElement("div");

item.className =
    "event-item";


const dot =
    document.createElement("div");

dot.className =
    "event-dot";


const date =
    document.createElement("div");

date.className =
    "event-date";


date.innerText =
    formatNum(event.date);


const name =
    document.createElement("div");

name.className =
    "event-name";


name.innerText =
    event.name;


item.appendChild(dot);
item.appendChild(date);
item.appendChild(name);

eventsTimeline.appendChild(item);

});

})

.catch(error=>{

eventsTimeline.innerHTML =
`<div class="event-empty">
${EVENT_TEXT[lang].empty}
</div>`;

});

}


/* ================= DRAW ================= */

function draw(){

grid.innerHTML="";

let year =
    current.getFullYear();

let month =
    current.getMonth();


title.innerText =
    MONTHS[lang][month]
    + " "
    + formatNum(year);


let firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();


let totalDays =
    new Date(
        year,
        month + 1,
        0
    ).getDate();


let today =
    new Date();


/* EMPTY */

for(
    let i=0;
    i<firstDay;
    i++
){

grid.innerHTML +=
    `<div></div>`;

}


/* DAYS */

for(
    let d=1;
    d<=totalDays;
    d++
){

let cell =
    document.createElement("div");

cell.className =
    "day";


cell.innerHTML = `
<div class="eng">
${formatNum(d)}
</div>
`;


/* TODAY */

if(

d === today.getDate() &&

month === today.getMonth() &&

year === today.getFullYear()

){

cell.classList.add("today");

}


grid.appendChild(cell);

}


/* ISLAMIC EVENTS */

renderEvents();

}


/* ================= NAV ================= */

prev.onclick = ()=>{

current.setMonth(
    current.getMonth() - 1
);

draw();

};


next.onclick = ()=>{

current.setMonth(
    current.getMonth() + 1
);

draw();

};


/* ================= INIT ================= */

renderDays();

draw();


/* ================= AUTO LANG UPDATE ================= */

setInterval(()=>{

let newLang =
    JSON.parse(
        localStorage.getItem("appSettings")
    )?.lang || "bn";


if(newLang !== lang){

lang = newLang;

renderDays();

draw();

}

},1000);

});
