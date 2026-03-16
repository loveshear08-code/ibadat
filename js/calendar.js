document.addEventListener("DOMContentLoaded", function () {

const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

let currentDate = new Date();

function renderCalendar(){

const year = currentDate.getFullYear();
const month = currentDate.getMonth();

const firstDay = new Date(year, month, 1).getDay();
const totalDays = new Date(year, month + 1, 0).getDate();

const monthNames=[
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

monthTitle.innerText = monthNames[month] + " " + year;

calendar.innerHTML="";

const grid=document.createElement("div");
grid.className="grid";

for(let i=0;i<firstDay;i++){
const empty=document.createElement("div");
grid.appendChild(empty);
}

for(let day=1;day<=totalDays;day++){

const cell=document.createElement("div");
cell.className="day";
cell.innerText=day;

grid.appendChild(cell);

}

calendar.appendChild(grid);

}

document.getElementById("prevMonth").onclick=function(){
currentDate.setMonth(currentDate.getMonth()-1);
renderCalendar();
};

document.getElementById("nextMonth").onclick=function(){
currentDate.setMonth(currentDate.getMonth()+1);
renderCalendar();
};

renderCalendar();

});
