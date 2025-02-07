let workers = [];
let categories = {};
let selectedCell = null;

// Add Category
function addCategory() {
  let name = document.getElementById("newCategoryName").value.trim();
  let wage = document.getElementById("newCategoryWage").value.trim();
  
  if (name && wage) {
    categories[name] = Number(wage);
    updateCategoryDropdown();
    document.getElementById("newCategoryName").value = "";
    document.getElementById("newCategoryWage").value = "";
  }
}

// Show Categories
function showCategories() {
  alert("Categories: " + Object.keys(categories).join(", "));
}

// Update Dropdown
function updateCategoryDropdown() {
  let select = document.getElementById("workerCategorySelect");
  select.innerHTML = "";
  Object.keys(categories).forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// Add Worker
function addWorker() {
  let name = document.getElementById("newWorkerName").value.trim();
  let category = document.getElementById("workerCategorySelect").value;
  
  if (name && category) {
    workers.push({ name, category, attendance: {}, totalPayment: 0 });
    renderTable();
    document.getElementById("newWorkerName").value = "";
  }
}

// Render Table
function renderTable() {
  let tbody = document.getElementById("attendanceBody");
  tbody.innerHTML = "";
  
  workers.forEach((worker, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${worker.name}</td>
      <td>${worker.category}</td>
      ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => 
        `<td class="attendance-cell" onclick="openAttendancePopup(this, '${worker.name}', '${day}')">
          ${worker.attendance[day] || ""}
        </td>`
      ).join("")}
      <td>${worker.totalPayment}</td>
    `;
    tbody.appendChild(row);
  });
}

// Open Attendance Popup
function openAttendancePopup(cell, workerName, day) {
  selectedCell = { cell, workerName, day };
  let popup = document.getElementById("attendancePopup");
  popup.style.display = "block";
}

// Set Attendance
function setAttendance(status) {
  let { cell, workerName, day } = selectedCell;
  let worker = workers.find(w => w.name === workerName);
  
  if (worker) {
    worker.attendance[day] = status;
    cell.innerHTML = status;
    worker.totalPayment = calculatePayment(worker);
    renderTable();
  }
  document.getElementById("attendancePopup").style.display = "none";
}

// Calculate Payment
function calculatePayment(worker) {
  return Object.values(worker.attendance).reduce((sum, status) => 
    sum + (status === "P" ? categories[worker.category] : status === "H" ? categories[worker.category] / 2 : 0), 0);
}
