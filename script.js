const days = ["月", "火", "水", "木", "金"];
const periods = 6;

const tableBody = document.getElementById("table-body");

let timetableData = [];
let timeData = [];

init();

function init() {
    loadData();
    createTable();
}

// 表作成
function createTable() {

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

// 時間セル更新
function updateTimeCell(cell, index) {

    let time = timeData[index] || "";

    cell.innerHTML = `
        <div>${index + 1}限</div>
        <small>${time}</small>
    `;
}

// 授業編集
function editCell(e) {

    let text = prompt("授業名を入力");

    if (text !== null) {

        e.target.textContent = text;

        let day = e.target.dataset.day;
        let period = e.target.dataset.period;

        timetableData[period][day] = text;

        saveData();
    }
}

// 時間編集
function editTime(e) {

    let period = e.currentTarget.dataset.period;

    let time = prompt("時間入力\n例: 09:00-10:30");

    if (time !== null) {

        timeData[period] = time;

        updateTimeCell(e.currentTarget, period);

        saveData();
    }
}

// 保存
function saveData() {

    localStorage.setItem("timetable", JSON.stringify(timetableData));
    localStorage.setItem("timeData", JSON.stringify(timeData));
}

// 読み込み
function loadData() {

    timetableData =
        JSON.parse(localStorage.getItem("timetable")) ||
        Array.from({ length: periods }, () => Array(days.length).fill(""));

    timeData =
        JSON.parse(localStorage.getItem("timeData")) ||
        Array(periods).fill("");
}
