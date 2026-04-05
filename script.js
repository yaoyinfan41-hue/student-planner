// ========================
// 日記（複数・安全版）
// ========================

let diaries = {};

function saveDiary() {
  const date = document.getElementById("diaryDate").value;
  const text = document.getElementById("diary").value;

  if (!date || !text) return;

  // 古い形式対応
  if (!diaries[date]) {
    diaries[date] = [];
  }

  if (!Array.isArray(diaries[date])) {
    diaries[date] = [diaries[date]];
  }

  diaries[date].push(text);

  localStorage.setItem("diaries", JSON.stringify(diaries));

  document.getElementById("diary").value = "";

  renderDiaries();
}

function loadDiary() {
  const saved = localStorage.getItem("diaries");

  if (saved) {
    diaries = JSON.parse(saved);
  }
}

function renderDiaries() {
  const list = document.getElementById("diaryList");
  list.innerHTML = "";

  Object.keys(diaries).forEach(date => {

    let entries = diaries[date];

    if (!Array.isArray(entries)) {
      entries = [entries];
    }

    entries.forEach(text => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${date}</strong><br>
        ${text}
      `;

      list.appendChild(li);
    });
  });
}
