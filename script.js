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
["mon","tue","wed","thu","fri","sat","sun"].forEach(day=>{

const sel=document.getElementById(day+i+"_color");
const sub=document.getElementById(day+i);

if(sel && sub){
sub.closest("td").style.background=sel.value;
}

});
}

},300);

// ========================
// 今日の授業
// ========================

function showToday(){

const day=["sun","mon","tue","wed","thu","fri","sat"][new Date().getDay()];

["mon","tue","wed","thu","fri","sat","sun"].forEach(d=>{

document.querySelectorAll(`[id^=${d}]`).forEach(el=>{

const td=el.closest("td");
if(!td) return;

td.style.display=(d===day)?"":"none";

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
// 自動保存
// ========================

document.addEventListener("input",saveTimetable);
