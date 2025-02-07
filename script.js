let workers = [];
let categories = [];

function addCategory() {
  const name = document.getElementById("newCategoryName").value;
  const wage = document.getElementById("newCategoryWage").value;
  if (name && wage) {
    categories.push({ name, wage });
    updateCategoryDropdown();
    document.getElementById("newCategoryName").value = "";
    document.getElementById("newCategoryWage").value = "";
  }
}

function showCategories() {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = categories.map(c => `<li>${c.name} - ${c.wage}</li>`).join('');
}

function updateCategoryDropdown() {
  const dropdown = document.getElementById("workerCategorySelect");
  dropdown.innerHTML = categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

function addWorker() {
  const name = document.getElementById("newWorkerName").value;
  const category = document.getElementById("workerCategorySelect").value;
  if (name && category) {
    workers.push({ name, category });
    document.getElementById("newWorkerName").value = "";
    renderTable();
  }
}

function renderTable() {
  const tbody = document.getElementById("attendanceBody");
  tbody.innerHTML = workers.map((w, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${w.name}</td>
      <td>${w.category}</td>
      <td class="attendance-cell" onclick="markAttendance(${i}, 'Monday')"></td>
      <td class="attendance-cell" onclick="markAttendance(${i}, 'Tuesday')"></td>
      <td class="attendance-cell" onclick="markAttendance(${i}, 'Wednesday')"></td>
      <td class="attendance-cell" onclick="markAttendance(${i}, 'Thursday')"></td>
      <td class="attendance-cell" onclick="markAttendance(${i}, 'Friday')"></td>
      <td class="attendance-cell" onclick="markAttendance(${i}, 'Saturday')"></td>
      <td>0</td>
    </tr>`).join('');
}

function resetAttendance() {
  workers = [];
  renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCategoryDropdown();
  renderTable();
});
