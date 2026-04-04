let todos = [];

function addTodo() {
  const text = document.getElementById("todoInput").value;
  const date = document.getElementById("dateInput").value;

  if (text === "") return;

  todos.push({
    text: text,
    date: date
  });

  saveTodos();
  renderTodos();

  document.getElementById("todoInput").value = "";
  document.getElementById("dateInput").value = "";
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    let text;
    let date;

    if (typeof todo === "string") {
      text = todo;
      date = "なし";
    } else {
      text = todo.text;
      date = todo.date || "なし";
    }

    li.innerHTML = `
      ${text}（締切: ${date}）
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

loadTodos();
renderTodos();
