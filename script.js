const days=["mon","tue","wed","thu","fri","sat","sun"];



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



// 保存
function saveTimetable(){

const data={};

for(let i=1;i<=6;i++){

data["start"+i]=document.getElementById("start"+i)?.value;
data["end"+i]=document.getElementById("end"+i)?.value;

days.forEach(day=>{

data[day+i]=document.getElementById(day+i)?.value;
data[day+i+"_room"]=document.getElementById(day+i+"_room")?.value;
data[day+i+"_memo"]=document.getElementById(day+i+"_memo")?.value;
data[day+i+"_attend"]=document.getElementById(day+i+"_attend")?.textContent;
data[day+i+"_absent"]=document.getElementById(day+i+"_absent")?.textContent;

});

}

localStorage.setItem("timetable",JSON.stringify(data));

}



// 読み込み
function loadTimetable(){

const data=JSON.parse(localStorage.getItem("timetable")||"{}");

for(let i=1;i<=6;i++){

document.getElementById("start"+i).value=data["start"+i]||"";
document.getElementById("end"+i).value=data["end"+i]||"";

days.forEach(day=>{

if(document.getElementById(day+i))
document.getElementById(day+i).value=data[day+i]||"";

if(document.getElementById(day+i+"_room"))
document.getElementById(day+i+"_room").value=data[day+i+"_room"]||"";

if(document.getElementById(day+i+"_memo"))
document.getElementById(day+i+"_memo").value=data[day+i+"_memo"]||"";

if(document.getElementById(day+i+"_attend"))
document.getElementById(day+i+"_attend").textContent=data[day+i+"_attend"]||"0";

if(document.getElementById(day+i+"_absent"))
document.getElementById(day+i+"_absent").textContent=data[day+i+"_absent"]||"0";

});

}

}



// 土曜
function showSat(){
document.querySelectorAll(".sat").forEach(el=>el.style.display="")
}

function hideSat(){
document.querySelectorAll(".sat").forEach(el=>el.style.display="none")
}


// 日曜
function showSun(){
document.querySelectorAll(".sun").forEach(el=>el.style.display="")
}

function hideSun(){
document.querySelectorAll(".sun").forEach(el=>el.style.display="none")
}



window.onload=loadTimetable;
