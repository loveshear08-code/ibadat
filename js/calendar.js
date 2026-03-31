document.addEventListener("DOMContentLoaded",function(){

const grid=document.getElementById("calendarGrid");
const monthTitle=document.getElementById("monthTitle");
const prev=document.getElementById("prevMonth");
const next=document.getElementById("nextMonth");

let current=new Date();

/* ================= SETTINGS ================= */

let s = JSON.parse(localStorage.getItem("appSettings")) || {lang:"bn"};
let lang = s.lang;

/* ================= TEXT ================= */

const TEXT = {
bn:{
months:["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
days:["রবি","সোম","মঙ্গল","বুধ","বৃহস্পতি","শুক্র","শনি"]
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

/* ================= HIJRI FIX ================= */

function getHijriDate(date){

return new Intl.DateTimeFormat('en-TN-u-ca-islamic',{
day:'numeric',
month:'short'
}).format(date);

}

/* ================= DRAW ================= */

function drawCalendar(){

grid.innerHTML="";

const year=current.getFullYear();
const month=current.getMonth();

monthTitle.innerText=TEXT[lang].months[month]+" "+year;

/* ===== DAY HEADER ===== */
TEXT[lang].days.forEach(d=>{
let div=document.createElement("div");
div.style.textAlign="center";
div.style.fontWeight="bold";
div.style.fontSize="12px";
div.innerText=d;
grid.appendChild(div);
});

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
<div style="color:#2e7d32;font-size:11px;">
${getHijriDate(fullDate)}
</div>
`;

/* today */
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
