const days = ["月", "火", "水", "木", "金"];
const periods = 6;

const tableBody = document.getElementById("table-body");

let timetableData;
let timeData;
let onlineClasses = [];

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
const attendInput = document.getElementById("attend-input");
const absentInput = document.getElementById("absent-input");

// オンデマンド
const onlineSubject = document.getElementById("online-subject");
const onlineMemo = document.getElementById("online-memo");
const addOnlineBtn = document.getElementById("add-online");

let currentDay = null;
let currentClassPeriod = null;
let currentPeriod = null;

init();

function init() {
  loadData();
  createTable();
  updateTodayView();
  renderOnline();
}

function createTable() {
  tableBody.innerHTML = "";

  for (let i = 0; i < periods; i++) {
    let row = document.createElement("tr");

    let periodCell = document.createElement("th");
    periodCell.className = "period-cell";
    periodCell.dataset.period = i;

    updateTimeCell(periodCell, i);
    periodCell.addEventListener("click", editTime);
    row.appendChild(periodCell);

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
  const cell = e.currentTarget;

  currentDay = Number(cell.dataset.day);
  currentClassPeriod = Number(cell.dataset.period);

  let data = timetableData[currentClassPeriod][currentDay] || {};

  subjectInput.value = data.subject || "";
  roomInput.value = data.room || "";
  memoInput.value = data.memo || "";
  typeInput.value = data.type || "";
  attendInput.value = data.attend || 0;
  absentInput.value = data.absent || 0;

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

  createTable();
  saveData();
  updateTodayView();
  modal.style.display = "none";
});

saveClassBtn.addEventListener("click", () => {
  let old = timetableData[currentClassPeriod][currentDay] || {};

  timetableData[currentClassPeriod][currentDay] = {
    ...old,
    subject: subjectInput.value,
    room: roomInput.value,
    memo: memoInput.value,
    type: typeInput.value,
    attend: Number(attendInput.value),
    absent: Number(absentInput.value)
  };

  updateTableDisplay();
  updateTodayView();
  saveData();
  classModal.style.display = "none";
});

// オンデマンド追加
addOnlineBtn.addEventListener("click", () => {
  if (!onlineSubject.value) return;

  onlineClasses.push({
    subject: onlineSubject.value,
    memo: onlineMemo.value
  });

  onlineSubject.value = "";
  onlineMemo.value = "";

  renderOnline();
  saveData();
});

function renderOnline() {
  const list = document.getElementById("online-list");
  list.innerHTML = "";

  onlineClasses.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "online-card";

    div.innerHTML = `
      <strong>${item.subject}</strong><br>
      <small>${item.memo || ""}</small>
      <button onclick="deleteOnline(${index})">削除</button>
    `;

    list.appendChild(div);
  });
}

function deleteOnline(index) {
  onlineClasses.splice(index, 1);
  renderOnline();
  saveData();
}

function updateTableDisplay() {
  document.querySelectorAll("td").forEach(cell => {
    let day = Number(cell.dataset.day);
    let period = Number(cell.dataset.period);
    let data = timetableData?.[period]?.[day];

    cell.className = "";

    if (!data || Object.keys(data).length === 0) {
      cell.textContent = "";
      return;
    }

    if (data.type) {
      cell.classList.add(data.type);
    }

    cell.innerHTML = `
    <div>${data.subject || ""}</div>
    <small>${data.room || ""}</small>
    <small>${data.memo || ""}</small>
    <small>出:${data.attend || 0} 欠:${data.absent || 0}</small>
    `;
  });
}

function updateTodayView() {
  const today = new Date().getDay();
  const todayIndex = today - 1;

  const todayView = document.getElementById("today-view");

  if (todayIndex < 0 || todayIndex > 4) {
    todayView.innerHTML = "今日は授業なし";
    return;
  }

  let html = "";

  for (let i = 0; i < periods; i++) {
    let data = timetableData[i][todayIndex];
    let time = timeData[i];

    let subject = data?.subject || "なし";
    let room = data?.room || "";

    let timeText = "--:--";
    if (time?.start && time?.end) {
      timeText = `${time.start}-${time.end}`;
    }

    html += `
    <div class="today-card">
    <strong>${i + 1}限 (${timeText})</strong><br>
    ${subject}<br>
    <small>${room}</small>
    </div>
    `;
  }

  todayView.innerHTML = html;
}

function saveData() {
  localStorage.setItem("timetable", JSON.stringify(timetableData));
  localStorage.setItem("timeData", JSON.stringify(timeData));
  localStorage.setItem("onlineClasses", JSON.stringify(onlineClasses));
}

function loadData() {
  let savedTable = JSON.parse(localStorage.getItem("timetable"));
  let savedTime = JSON.parse(localStorage.getItem("timeData"));
  let savedOnline = JSON.parse(localStorage.getItem("onlineClasses"));

  timetableData = Array.from({ length: periods }, () =>
    Array.from({ length: days.length }, () => ({}))
  );

  timeData = Array(periods).fill(null);
  onlineClasses = savedOnline || [];

  if (savedTable) {
    for (let i = 0; i < periods; i++) {
      for (let j = 0; j < days.length; j++) {
        timetableData[i][j] = savedTable?.[i]?.[j] || {};
      }
    }
  }

  if (savedTime) {
    for (let i = 0; i < periods; i++) {
      timeData[i] = savedTime[i] || null;
    }
  }
}
