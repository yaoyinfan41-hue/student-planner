const days = ["月", "火", "水", "木", "金"];
const periods = 6;

const tableBody = document.getElementById("table-body");

let timetableData;
let timeData;

// モーダル
const modal = document.getElementById("modal");
const startInput = document.getElementById("start-time");
const endInput = document.getElementById("end-time");
const saveBtn = document.getElementById("save-time");
const modalTitle = document.getElementById("modal-title");
const classModal = document.getElementById("class-modal");
const subjectInput = document.getElementById("subject-input");
const roomInput = document.getElementById("room-input");
const memoInput = document.getElementById("memo-input");
const saveClassBtn = document.getElementById("save-class");
const typeInput = document.getElementById("type-input");

let currentDay = null;
let currentClassPeriod = null;

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

let data = timetableData[i][j];

if (data) {
cell.innerHTML = `
<div>${data.subject || ""}</div>
<small>${data.room || ""}</small>
`;
}

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

currentDay = Number(e.target.dataset.day);
currentClassPeriod = Number(e.target.dataset.period);

let data = timetableData[currentClassPeriod][currentDay] || {};

subjectInput.value = data.subject || "";
roomInput.value = data.room || "";
memoInput.value = data.memo || "";
typeInput.value = data.type || "";

classModal.style.display = "flex";
}

function editTime(e) {

currentPeriod = Number(e.currentTarget.dataset.period);

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
if (Number(cell.dataset.period) === currentPeriod) {
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

let savedTable = JSON.parse(localStorage.getItem("timetable"));
let savedTime = JSON.parse(localStorage.getItem("timeData"));

// 常に新規作成
timetableData = Array.from({ length: periods }, () =>
Array(days.length).fill("")
);

timeData = Array(periods).fill(null);

// 上書き復元
if (savedTable) {
for (let i = 0; i < periods; i++) {
for (let j = 0; j < days.length; j++) {
timetableData[i][j] = savedTable?.[i]?.[j] || "";
}
}
}

if (savedTime) {
for (let i = 0; i < periods; i++) {
timeData[i] = savedTime[i] || null;
}
}
}

saveClassBtn.addEventListener("click", () => {

timetableData[currentClassPeriod][currentDay] = {
subject: subjectInput.value,
room: roomInput.value,
memo: memoInput.value,
type: typeInput.value
};

updateTableDisplay();
saveData();
classModal.style.display = "none";

});

function updateTableDisplay() {

document.querySelectorAll("td").forEach(cell => {

let day = Number(cell.dataset.day);
let period = Number(cell.dataset.period);

let data = timetableData[period][day];

cell.className = "";

if (!data) {
cell.textContent = "";
return;
}

if (data.type) {
cell.classList.add(data.type);
}

cell.innerHTML = `
<div>${data.subject || ""}</div>
<small>${data.room || ""}</small>
`;

});
}

classModal.addEventListener("click", (e) => {
if (e.target === classModal) {
classModal.style.display = "none";
}
});
