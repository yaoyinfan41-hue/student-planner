// ========================
// 日記機能
// ========================
function saveDiary() {
  const text = document.getElementById("diary").value;
  localStorage.setItem("diary", text);
}

function loadDiary() {
  const saved = localStorage.getItem("diary");
  if (saved) {
    document.getElementById("diary").value = saved;
  }
}


// ========================
// ToDo（締切付き）
// ========================
let todos = [];

function addTodo() {
  const text = document.getElementById("todoInput").value;
  const date = document.getElementById("dateInput").value;

  if (text === "") return;

  const todo = {
    text: text,
    date: date
  };

  todos.push(todo);

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

    const dateText = todo.date ? todo.date : "なし";

    li.innerHTML = `
      ${todo.text}（締切: ${dateText}）
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
  } else {
    todos = [];
  }
}


// ========================
// 初期読み込み
// ========================
window.onload = function () {
  loadDiary();
  loadTodos();
  renderTodos();
};
