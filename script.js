const days = ["mon","tue","wed","thu","fri","sat","sun"];


// ========================
// 保存
// ========================

function saveTimetable(){

const data = {};

for(let i=1;i<=6;i++){

days.forEach(day=>{

const el = document.getElementById(day+i);
if(el){
data[day+i] = el.value;
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

days.forEach(day=>{

const el = document.getElementById(day+i);

if(el && data[day+i]){
el.value = data[day+i];
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
