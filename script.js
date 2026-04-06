<script>
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

// 教室
const room = document.getElementById(day+i+"_room");
if(room){
data[day+i+"_room"] = room.value;
}

// メモ
const memo = document.getElementById(day+i+"_memo");
if(memo){
data[day+i+"_memo"] = memo.value;
}

// 出席
const attend = document.getElementById(day+i+"_attend");
if(attend){
data[day+i+"_attend"] = attend.textContent;
}

// 欠席
const absent = document.getElementById(day+i+"_absent");
if(absent){
data[day+i+"_absent"] = absent.textContent;
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

// 教室
const room = document.getElementById(day+i+"_room");
if(room && data[day+i+"_room"]){
room.value = data[day+i+"_room"];
}

// メモ
const memo = document.getElementById(day+i+"_memo");
if(memo && data[day+i+"_memo"]){
memo.value = data[day+i+"_memo"];
}

// 出席
const attend = document.getElementById(day+i+"_attend");
if(attend && data[day+i+"_attend"]){
attend.textContent = data[day+i+"_attend"];
}

// 欠席
const absent = document.getElementById(day+i+"_absent");
if(absent && data[day+i+"_absent"]){
absent.textContent = data[day+i+"_absent"];
}

});

}

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
// 土日表示
// ========================

let weekendVisible = false;

function toggleWeekend(){
    weekendVisible = !weekendVisible;

    document.querySelectorAll(".weekend").forEach(el=>{
        el.style.display = weekendVisible ? "" : "none";
    });
}


// ========================
// 初期読み込み
// ========================

// ========================
// 初期読み込み
// ========================

window.onload = function(){
    loadTimetable();

    // 最初は土日を非表示
    document.querySelectorAll(".weekend").forEach(el=>{
        el.style.display = "none";
    });
};
</script>
</body>
</html>
