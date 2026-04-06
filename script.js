const days = ["mon","tue","wed","thu","fri","sat","sun"];


// ========================
// 保存
// ========================

function saveTimetable(){

const data = {};

for(let i=1;i<=6;i++){

data["start"+i] = document.getElementById("start"+i)?.value;
data["end"+i] = document.getElementById("end"+i)?.value;

days.forEach(day=>{

const el = document.getElementById(day+i);
if(el){
data[day+i] = el.value;
}

const room = document.getElementById(day+i+"_room");
if(room){
data[day+i+"_room"] = room.value;
}

});

}

localStorage.setItem("timetable",JSON.stringify(data));

}



// ========================
// 読み込み
// ========================

function loadTimetable(){

const data = JSON.parse(localStorage.getItem("timetable") || "{}");

for(let i=1;i<=6;i++){

if(document.getElementById("start"+i))
document.getElementById("start"+i).value = data["start"+i] || "";

if(document.getElementById("end"+i))
document.getElementById("end"+i).value = data["end"+i] || "";
  
days.forEach(day=>{

const el = document.getElementById(day+i);

if(el && data[day+i]){
el.value = data[day+i];
}

const room = document.getElementById(day+i+"_room");
if(room && data[day+i+"_room"]){
room.value = data[day+i+"_room"];
}

});

}

}



// ========================
// 土日表示
// ========================

function toggleWeekend(){

document.querySelectorAll(".weekend").forEach(el=>{

if(el.style.display==="none"){
el.style.display="";
}else{
el.style.display="none";
}

});

}



// ========================
// 初期読み込み
// ========================

window.onload = loadTimetable;

// 出席
function addAttend(id){
const el=document.getElementById(id+"_attend");
el.textContent=parseInt(el.textContent)+1;
saveTimetable();
}

function subAttend(id){
const el=document.getElementById(id+"_attend");
let n=parseInt(el.textContent);
if(n>0) el.textContent=n-1;
saveTimetable();
}

// 欠席
function addAbsent(id){
const el=document.getElementById(id+"_absent");
el.textContent=parseInt(el.textContent)+1;
saveTimetable();
}

function subAbsent(id){
const el=document.getElementById(id+"_absent");
let n=parseInt(el.textContent);
if(n>0) el.textContent=n-1;
saveTimetable();
}
