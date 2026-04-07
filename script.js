const days = ["月", "火", "水", "木", "金"];
const periods = 6;

const tableBody = document.getElementById("table-body");

// 表作成
for (let i = 1; i <= periods; i++) {

let row = document.createElement("tr");

// 時限列
let periodCell = document.createElement("th");
periodCell.textContent = i + "限";
row.appendChild(periodCell);

// 曜日列
for (let j = 0; j < days.length; j++) {

let cell = document.createElement("td");

cell.dataset.day = j;
cell.dataset.period = i;

cell.addEventListener("click", editCell);

row.appendChild(cell);
}

tableBody.appendChild(row);
}

loadData();

function editCell(e) {

let text = prompt("授業名を入力");

if (text !== null) {
e.target.textContent = text;
saveData();
}

}

function saveData() {

let data = [];

document.querySelectorAll("td").forEach(cell => {
data.push(cell.textContent);
});

localStorage.setItem("timetable", JSON.stringify(data));
}

function loadData() {

let data = JSON.parse(localStorage.getItem("timetable"));

if (!data) return;

document.querySelectorAll("td").forEach((cell, index) => {
cell.textContent = data[index];
});

}
