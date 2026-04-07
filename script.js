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

    let time = timeData[index];

    let text = "";

    if (time) {
        text = `${time.start}-${time.end}`;
    }

    cell.innerHTML = `
        <div>${index + 1}限</div>
        <small>${text}</small>
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

    let start = timeData[period]?.start || "";
    let end = timeData[period]?.end || "";

    let html = `
開始: <input type="time" id="start" value="${start}"><br>
終了: <input type="time" id="end" value="${end}">
`;

    let wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    if (confirm("OKを押してから時間入力してください")) {

        setTimeout(() => {

            let startTime = prompt("開始時間 (例 09:00)", start);
            let endTime = prompt("終了時間 (例 10:30)", end);

            if (startTime && endTime) {

                timeData[period] = {
                    start: startTime,
                    end: endTime
                };

                updateTimeCell(e.currentTarget, period);
                saveData();
            }

        }, 100);

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
