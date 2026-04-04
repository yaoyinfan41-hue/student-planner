function save() {
  const text = document.getElementById("diary").value;
  localStorage.setItem("diary", text);
}

window.onload = function() {
  const saved = localStorage.getItem("diary");
  document.getElementById("diary").value = saved || "";
}