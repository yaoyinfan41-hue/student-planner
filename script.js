const days = ["月", "火", "水", "木", "金"];
const periods = 6;

const tableBody = document.getElementById("table-body");

let timetableData = [];
let timeData = [];

// モーダル
const modal = document.getElementById("modal");
const startInput = document.getElementById("start-time");
const endInput = document.getElementById("end-time");
const saveBtn = document.getElementById("save-time");
const modalTitle = document.getElementById("modal-title");

let currentPeriod = null;

init();

function init() {
loadData();
createTable();
}

function createTable() {

tableBody.innerHTML = "";

for (let i = 0; i < periods; i++) {

let row = document.createElement("tr");

// 時限セル
let periodCell = document.createElement("th");
periodCell.className = "period-cell";
periodCell.dataset.period = i;

updateTimeCell(periodCell, i);

periodCell.addEventListener("click", editTime);

row.appendChild(periodCell);

// 授業セル
for (let j = 0; j < days.length; j++) {

let cell = document.createElement("td");

cell.dataset.day = j;
cell.dataset.period = i;

cell.textContent = timetableData[i][j] || "";

cell.addEventListener("click", editCell);

row.appendChild(cell);
}

tableBody.appendChild(row);
}
}

function updateTimeCell(cell, index) {

let time = timeData[index];

let text = "--:-- - --:--";

if (time && time.start && time.end) {
text = `${time.start}-${time.end}`;
}

cell.innerHTML = `
<div>${index + 1}限</div>
<small>${text}</small>
`;
}

function editCell(e) {

let text = prompt("授業名を入力");

if (text !== null) {

e.target.textContent = text;

let day = parseInt(e.target.dataset.day);
let period = parseInt(e.target.dataset.period);

timetableData[period][day] = text;

saveData();
}
}

function editTime(e) {

currentPeriod = parseInt(e.currentTarget.dataset.period);

modal.style.display = "flex";

modalTitle.textContent = `${currentPeriod + 1}限の時間設定`;

let data = timeData[currentPeriod];

startInput.value = data?.start || "";
endInput.value = data?.end || "";
}

saveBtn.addEventListener("click", () => {

timeData[currentPeriod] = {
start: startInput.value,
end: endInput.value
};

document.querySelectorAll(".period-cell").forEach(cell => {
if (parseInt(cell.dataset.period) === currentPeriod) {
updateTimeCell(cell, currentPeriod);
}
});

saveData();

modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
if (e.target === modal) {
modal.style.display = "none";
}
});

function saveData() {

localStorage.setItem("timetable", JSON.stringify(timetableData));
localStorage.setItem("timeData", JSON.stringify(timeData));
}

function loadData() {

timetableData =
JSON.parse(localStorage.getItem("timetable")) ||
Array.from({ length: periods }, () => Array(days.length).fill(""));

timeData =
JSON.parse(localStorage.getItem("timeData")) ||
Array(periods).fill(null);
}
