// タブ切り替え
function showTab(tab) {
  document.getElementById("timetable-section").style.display = "none";
  document.getElementById("today-section").style.display = "none";
  document.getElementById("online-section").style.display = "none";

  document.getElementById(tab + "-section").style.display = "block";
}

// 初期表示
showTab("timetable");

// 戻るボタン
document.getElementById("close-class").onclick = () => {
  document.getElementById("class-modal").style.display = "none";
};

document.getElementById("close-time").onclick = () => {
  document.getElementById("modal").style.display = "none";
};
