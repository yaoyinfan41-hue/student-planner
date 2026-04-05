// ========================
// 日記（日付ごと）
// ========================

let diaries = {};

function saveDiary() {
  const date = document.getElementById("diaryDate").value;
  const text = document.getElementById("diary").value;

  if (!date) return;

  diaries[date] = text;

  localStorage.setItem("diaries", JSON.stringify(diaries));

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
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${date}</strong><br>
      ${diaries[date]}
    `;

    list.appendChild(li);
  });
}


// ========================
// ToDo（締切付き）
// ========================

let todos = [];

function addTodo() {
  const text = document.getElementById("todoInput").value;
  const date = document.getElementById("dateInput").value;

  if (!text) return;

  todos.push({
    text: text,
    date: date
  });

  saveTodos();
  renderTodos();

  document.getElementById("todoInput").value = "";
  document.getElementById("dateInput").value = "";
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${todo.text}（締切: ${todo.date || "なし"}）
      <button onclick="deleteTodo(${index})">削除</button>
    `;

    list.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const saved = localStorage.getItem("todos");

  if (saved) {
    todos = JSON.parse(saved);
  }
}


// ========================
// 初期読み込み
// ========================

window.onload = function () {
  loadDiary();
  renderDiaries();

  loadTodos();
  renderTodos();
};
