const days = ["mon","tue","wed","thu","fri","sat","sun"];


// ========================
// 時間割生成
// ========================

window.addEventListener("load",()=>{

const table = document.getElementById("timetable");

for(let i=1;i<=6;i++){

const tr = document.createElement("tr");

tr.innerHTML = `
<th>
${i}限<br>
<input type="time" id="start${i}">
<br>
<input type="time" id="end${i}">
</th>
`;

days.forEach(day=>{

const td = document.createElement("td");

if(day==="sat" || day==="sun"){
td.classList.add("weekend");
td.style.display="none";
}

td.innerHTML = cell(day,i);

tr.appendChild(td);

});

table.appendChild(tr);

}

loadTimetable();

});


// ========================
// セル
// ========================

function cell(day,i){
return `

<select id="${day}${i}_color">
<option value="">通常</option>
<option value="#ffd6d6">必修</option>
<option value="#d6e4ff">選択</option>
<option value="#d6ffd6">実験</option>
</select>
<br>

授業<br>
<input id="${day}${i}">
<br>

教室<br>
<input id="${day}${i}_room">
<br>

休講 <input type="checkbox" id="${day}${i}_cancel">
<br>

出席
<button onclick="addAttend('${day}${i}')">+</button>
<button onclick="subAttend('${day}${i}')">-</button>
<span id="${day}${i}_attend">0</span>
<br>

欠席
<button onclick="addAbsent('${day}${i}')">+</button>
<button onclick="subAbsent('${day}${i}')">-</button>
<span id="${day}${i}_absent">0</span>
<br>

<textarea id="${day}${i}_memo"></textarea>

`;
}


// ========================
// 出席
// ========================

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


// ========================
// 欠席
// ========================

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


// ========================
// 色分け
// ========================

setInterval(()=>{

for(let i=1;i<=6;i++){

days.forEach(day=>{

const sel=document.getElementById(day+i+"_color");
const sub=document.getElementById(day+i);

if(sel && sub){
sub.closest("td").style.background=sel.value;
}

});

}

},300);


// ========================
// 保存
// ========================

function saveTimetable(){

const data={};

for(let i=1;i<=6;i++){

data["start"+i]=document.getElementById("start"+i)?.value;

data["end"+i]=document.getElementById("end"+i)?.value;

days.forEach(day=>{

data[day+i]=document.getElementById(day+i)?.value;
data[day+i+"_room"]=document.getElementById(day+i+"_room)?.value;
data[day+i+"_memo"]=document.getElementById(day+i+"_memo)?.value;

data[day+i+"_attend"]=
document.getElementById(day+i+"_attend)?.textContent;

data[day+i+"_absent"]=
document.getElementById(day+i+"_absent)?.textContent;

data[day+i+"_color"]=
document.getElementById(day+i+"_color)?.value;

data[day+i+"_cancel"]=
document.getElementById(day+i+"_cancel)?.checked;

});

}

localStorage.setItem("timetableData",JSON.stringify(data));

}


// ========================
// 読み込み
// ========================

function loadTimetable(){

const data=JSON.parse(localStorage.getItem("timetableData")||"{}");

for(let i=1;i<=6;i++){

if(document.getElementById("start"+i))
document.getElementById("start"+i).value=data["start"+i]||"";

if(document.getElementById("end"+i))
document.getElementById("end"+i).value=data["end"+i]||"";

days.forEach(day=>{

if(document.getElementById(day+i))
document.getElementById(day+i).value=data[day+i]||"";

if(document.getElementById(day+i+"_room"))
document.getElementById(day+i+"_room").value=
data[day+i+"_room"]||"";

if(document.getElementById(day+i+"_memo"))
document.getElementById(day+i+"_memo").value=
data[day+i+"_memo"]||"";

if(document.getElementById(day+i+"_attend"))
document.getElementById(day+i+"_attend").textContent=
data[day+i+"_attend"]||"0";

if(document.getElementById(day+i+"_absent"))
document.getElementById(day+i+"_absent").textContent=
data[day+i+"_absent"]||"0";

if(document.getElementById(day+i+"_color"))
document.getElementById(day+i+"_color").value=
data[day+i+"_color"]||"";

if(document.getElementById(day+i+"_cancel"))
document.getElementById(day+i+"_cancel").checked=
data[day+i+"_cancel"]||false;

});

}

}


// ========================
// 今日の授業
// ========================

function showToday(){

const today=["sun","mon","tue","wed","thu","fri","sat"][new Date().getDay()];

days.forEach(day=>{

document.querySelectorAll(`[id^=${day}]`).forEach(el=>{

const td=el.closest("td");
if(!td) return;

td.style.display=(day===today)?"":"none";

});

});

}

function showAll(){
document.querySelectorAll("td").forEach(td=>td.style.display="");
}


// ========================
// 次の授業
// ========================

setInterval(showNextClass,60000);

function showNextClass(){

const now=new Date();
const day=["sun","mon","tue","wed","thu","fri","sat"][now.getDay()];

const h=now.getHours();
const m=now.getMinutes();

for(let i=1;i<=6;i++){

const start=document.getElementById("start"+i);
if(!start || !start.value) continue;

const [sh,sm]=start.value.split(":");

if(h<sh || (h==sh && m<sm)){

const sub=document.getElementById(day+i);

if(sub && sub.value){

document.getElementById("nextClass").textContent=
"次の授業: "+i+"限 "+sub.value;

return;

}

}

}

document.getElementById("nextClass").textContent="授業なし";

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
