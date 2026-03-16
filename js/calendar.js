const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

let currentDate = new Date();

function renderCalendar() {

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthTitle.innerText = monthNames[month] + " " + year;

  calendar.innerHTML = "";

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(7,1fr)";
  grid.style.gap = "6px";
  grid.style.padding = "10px";

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    grid.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {

    const cell = document.createElement("div");

    cell.innerText = day;

    cell.style.background = "white";
    cell.style.borderRadius = "8px";
    cell.style.padding = "10px";
    cell.style.textAlign = "center";
    cell.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

    grid.appendChild(cell);
  }

  calendar.appendChild(grid);
}

document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
