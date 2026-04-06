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

  const today = new Date();

  // 締切順にソート
  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  sortedTodos.forEach((todo) => {
    const index = todos.indexOf(todo);

    const li = document.createElement("li");

    let deadlineText = "なし";

    if (todo.date) {
      const deadline = new Date(todo.date);
      const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

      if (diff === 0) deadlineText = "今日";
      else if (diff > 0) deadlineText = `あと${diff}日`;
      else deadlineText = "期限切れ";
    }

    li.innerHTML = `
      ${todo.text}（${deadlineText}）
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

// ========================
// 時間割
// ========================

const days = ["mon","tue","wed","thu","fri","sat","sun"];

function saveTimetable() {
  const timetable = {};
  const times = {};

  for(let i=1;i<=6;i++){

    times[i] = document.getElementById("time"+i).value;

    days.forEach(day=>{
      const el = document.getElementById(day+i);
      if(!el) return;

      if(!timetable[day]) timetable[day]=[];

      timetable[day][i] = el.value;
    });
  }

  localStorage.setItem("timetable",JSON.stringify(timetable));
  localStorage.setItem("times",JSON.stringify(times));
}

function loadTimetable(){

  const timetable = JSON.parse(localStorage.getItem("timetable")||"{}");
  const times = JSON.parse(localStorage.getItem("times")||"{}");

  for(let i=1;i<=6;i++){

    const time = document.getElementById("time"+i);
    if(time) time.value = times[i] || "";

    days.forEach(day=>{
      const el = document.getElementById(day+i);
      if(el && timetable[day]){
        el.value = timetable[day][i] || "";
      }
    });
  }
}

function toggleWeekend(){
  const weekend = document.querySelectorAll(".weekend");

  weekend.forEach(el=>{
    if(el.style.display === "none"){
      el.style.display = "";
    }else{
      el.style.display = "none";
    }
  });
}

window.addEventListener("load", loadTimetable);

// 土曜追加
function addSaturday(){
document.querySelectorAll(".sat").forEach(el=>{
el.style.display = "";
});
}

// 日曜追加
function addSunday(){
document.querySelectorAll(".sun").forEach(el=>{
el.style.display = "";
});
}

// 出席
function addAttend(id){
const el = document.getElementById(id+"_attend");
el.textContent = parseInt(el.textContent)+1;
}

// 欠席
function addAbsent(id){
const el = document.getElementById(id+"_absent");
el.textContent = parseInt(el.textContent)+1;
}
