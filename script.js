let workers = [];
let categories = {};
let selectedCell = null;

// Add Category
function addCategory() {
  let name = document.getElementById("newCategoryName").value.trim();
  let wage = Number(document.getElementById("newCategoryWage").value);
  
  if (name && wage) {
    categories[name] = wage;
    updateCategoryDropdown();
  }
}

// Show Categories
function showCategories() {
  alert("Available Categories: " + Object.keys(categories).join(", "));
}

// Update Category Dropdown
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
        `<td class="attendance-cell" onclick="openAttendancePopup(event, '${worker.name}', '${day}', this)">
          ${worker.attendance[day] || ""}
        </td>`
      ).join("")}
      <td id="total-${worker.name}">${worker.totalPayment}</td>
    `;
    tbody.appendChild(row);
  });

  updateGrandTotal();
}

// Attendance Marking
function openAttendancePopup(event, workerName, day, cell) {
  selectedCell = { cell, workerName, day };

  let popup = document.getElementById("attendancePopup");
  popup.style.display = "block";
  popup.style.left = event.pageX + "px";
  popup.style.top = event.pageY + "px";
}

function setAttendance(status) {
  let { cell, workerName, day } = selectedCell;
  let worker = workers.find(w => w.name === workerName);
  
  worker.attendance[day] = status;
  cell.innerText = status;
  worker.totalPayment = calculatePayment(worker);
  updateGrandTotal();
}

// Grand Total Calculation
function updateGrandTotal() {
  let grandTotal = workers.reduce((sum, worker) => sum + worker.totalPayment, 0);
  document.getElementById("grandTotal").innerText = `Grand Total: ${grandTotal}`;
}
