// ========================
// 曜日
// ========================

const days = ["mon","tue","wed","thu","fri","sat","sun"];


// ========================
// 出席
// ========================

function addAttend(id){
const el = document.getElementById(id+"_attend");
el.textContent = parseInt(el.textContent)+1;
saveTimetable();
}

function subAttend(id){
const el = document.getElementById(id+"_attend");
let n = parseInt(el.textContent);
if(n>0) el.textContent = n-1;
saveTimetable();
}


// ========================
// 欠席
// ========================

function addAbsent(id){
const el = document.getElementById(id+"_absent");
el.textContent = parseInt(el.textContent)+1;
saveTimetable();
}

function subAbsent(id){
const el = document.getElementById(id+"_absent");
let n = parseInt(el.textContent);
if(n>0) el.textContent = n-1;
saveTimetable();
}



// ========================
// 色分け
// ========================

setInterval(()=>{

for(let i=1;i<=6;i++){

days.forEach(day=>{

const sel = document.getElementById(day+i+"_color");
const subject = document.getElementById(day+i);

if(sel && subject){
subject.closest("td").style.background = sel.value;
}

});

}

},300);



// ========================
// 今日の授業
// ========================

function showToday(){

const today = ["sun","mon","tue","wed","thu","fri","sat"][new Date().getDay()];

days.forEach(day=>{

document.querySelectorAll(`[id^=${day}]`).forEach(el=>{

const td = el.closest("td");
if(!td) return;

td.style.display = (day===today) ? "" : "none";

});

});

}

function showAll(){
document.querySelectorAll("td").forEach(td=>{
td.style.display="";
});
}



// ========================
// 次の授業表示
// ========================

setInterval(showNextClass,60000);
window.addEventListener("load",showNextClass);

function showNextClass(){

const now = new Date();

const day = ["sun","mon","tue","wed","thu","fri","sat"][now.getDay()];

const hour = now.getHours();
const min = now.getMinutes();

for(let i=1;i<=6;i++){

const start = document.getElementById("start"+i);
if(!start || !start.value) continue;

const [h,m] = start.value.split(":");

if(hour < h || (hour == h && min < m)){

const subject = document.getElementById(day+i);

if(subject && subject.value){

document.getElementById("nextClass").textContent =
"次の授業: " + i + "限 " + subject.value;

return;

}

}

}

document.getElementById("nextClass").textContent = "授業なし";

}



// ========================
// 保存
// ========================

function saveTimetable(){

const data = {};

for(let i=1;i<=6;i++){

data["start"+i] = document.getElementById("start"+i)?.value || "";
data["end"+i] = document.getElementById("end"+i)?.value || "";

days.forEach(day=>{

data[day+i] = document.getElementById(day+i)?.value || "";
data[day+i+"_room"] = document.getElementById(day+i+"_room")?.value || "";
data[day+i+"_memo"] = document.getElementById(day+i+"_memo")?.value || "";

data[day+i+"_attend"] =
document.getElementById(day+i+"_attend")?.textContent || "0";

data[day+i+"_absent"] =
document.getElementById(day+i+"_absent")?.textContent || "0";

data[day+i+"_color"] =
document.getElementById(day+i+"_color")?.value || "";

data[day+i+"_cancel"] =
document.getElementById(day+i+"_cancel")?.checked || false;

});

}

localStorage.setItem("timetableData",JSON.stringify(data));

}



// ========================
// 読み込み
// ========================

function loadTimetable(){

const data = JSON.parse(localStorage.getItem("timetableData")||"{}");

for(let i=1;i<=6;i++){

if(document.getElementById("start"+i))
document.getElementById("start"+i).value = data["start"+i] || "";

if(document.getElementById("end"+i))
document.getElementById("end"+i).value = data["end"+i] || "";

days.forEach(day=>{

if(document.getElementById(day+i))
document.getElementById(day+i).value = data[day+i] || "";

if(document.getElementById(day+i+"_room"))
document.getElementById(day+i+"_room").value =
data[day+i+"_room"] || "";

if(document.getElementById(day+i+"_memo"))
document.getElementById(day+i+"_memo").value =
data[day+i+"_memo"] || "";

if(document.getElementById(day+i+"_attend"))
document.getElementById(day+i+"_attend").textContent =
data[day+i+"_attend"] || "0";

if(document.getElementById(day+i+"_absent"))
document.getElementById(day+i+"_absent").textContent =
data[day+i+"_absent"] || "0";

if(document.getElementById(day+i+"_color"))
document.getElementById(day+i+"_color").value =
data[day+i+"_color"] || "";

if(document.getElementById(day+i+"_cancel"))
document.getElementById(day+i+"_cancel").checked =
data[day+i+"_cancel"] || false;

});

}

}



// ========================
// 自動保存
// ========================

document.addEventListener("input",saveTimetable);



// ========================
// 初期読み込み
// ========================

window.addEventListener("load",loadTimetable);



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
