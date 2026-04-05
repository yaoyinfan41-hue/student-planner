// ========================
// 日記（複数）
// ========================

let diaries = {};

function saveDiary() {
  const date = document.getElementById("diaryDate").value;
  const text = document.getElementById("diary").value;

  if (!date || !text) return;

  if (!diaries[date]) {
    diaries[date] = [];
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
    diaries[date].forEach(text => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${date}</strong>
        <div>${text}</div>
      `;

      list.appendChild(li);
    });
  });
}


// ========================
// ToDo
// ========================

let todos = [];

function addTodo() {
  const input = document.getElementById("todoInput");
  const dateInput = document.getElementById("dateInput");

  const text = input.value;
  const date = dateInput.value;

  if (!text) return;

  todos.push({
    text: text,
    date: date
  });

  saveTodos();
  renderTodos();

  input.value = "";
  dateInput.value = "";
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
