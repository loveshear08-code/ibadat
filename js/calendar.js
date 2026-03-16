document.addEventListener("DOMContentLoaded",function(){

const grid=document.getElementById("calendarGrid");
const monthTitle=document.getElementById("monthTitle");
const prev=document.getElementById("prevMonth");
const next=document.getElementById("nextMonth");

let current=new Date();

function drawCalendar(){

grid.innerHTML="";

const year=current.getFullYear();
const month=current.getMonth();

const firstDay=new Date(year,month,1).getDay();
const days=new Date(year,month+1,0).getDate();

const months=[
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

monthTitle.textContent=months[month]+" "+year;

for(let i=0;i<firstDay;i++){
const empty=document.createElement("div");
grid.appendChild(empty);
}

for(let d=1;d<=days;d++){

const cell=document.createElement("div");
cell.className="day";
cell.textContent=d;

grid.appendChild(cell);

}

}

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
