// Global Variables & Data Persistence via localStorage
let workers = JSON.parse(localStorage.getItem("workers")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || {
  "Driver": { wage: 800 },
  "Helper": { wage: 500 }
};
let deletedWorkerStack = [];
let currentWeek = 0; // 0 means current week
let selectedCell = null;

// Utility: Save data to localStorage
function saveData() {
  localStorage.setItem("workers", JSON.stringify(workers));
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Update real-time date display
function updateCurrentDate() {
  const now = new Date();
  document.getElementById("currentDate").textContent = "Today: " + now.toLocaleDateString();
}
setInterval(updateCurrentDate, 1000);
updateCurrentDate();

// Render Category Filter Buttons and populate category select options
function renderCategoryFilters() {
  const container = document.getElementById("categoryFilters");
  container.innerHTML = "";
  for (let cat in categories) {
    const btn = document.createElement("button");
    btn.className = "category";
    btn.textContent = cat;
    btn.onclick = () => filterByCategory(cat);
    container.appendChild(btn);
  }
  // "All" button
  const allBtn = document.createElement("button");
  allBtn.className = "category";
  allBtn.textContent = "All";
  allBtn.onclick = () => filterByCategory("All");
  container.appendChild(allBtn);
  // Update worker category select options as well
  populateCategorySelect();
}

function populateCategorySelect() {
  const select = document.getElementById("workerCategorySelect");
  select.innerHTML = "";
  for (let cat in categories) {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  }
}

// Initialize Attendance Table
function initTable() {
  const tbody = document.getElementById("attendanceBody");
  tbody.innerHTML = "";
  workers.forEach((worker, index) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-worker-id", worker.id);
    // S.No, Worker Name, Category and attendance cells for each day
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${worker.name}</td>
      <td>${worker.category}</td>
      <td class="attendance-cell" data-day="Monday" data-worker-id="${worker.id}">${formatMark(worker.attendance?.Monday)}</td>
      <td class="attendance-cell" data-day="Tuesday" data-worker-id="${worker.id}">${formatMark(worker.attendance?.Tuesday)}</td>
      <td class="attendance-cell" data-day="Wednesday" data-worker-id="${worker.id}">${formatMark(worker.attendance?.Wednesday)}</td>
      <td class="attendance-cell" data-day="Thursday" data-worker-id="${worker.id}">${formatMark(worker.attendance?.Thursday)}</td>
      <td class="attendance-cell" data-day="Friday" data-worker-id="${worker.id}">${formatMark(worker.attendance?.Friday)}</td>
      <td class="attendance-cell" data-day="Saturday" data-worker-id="${worker.id}">${formatMark(worker.attendance?.Saturday)}</td>
      <td class="total-payment">${calculateWorkerPayment(worker)}</td>
    `;
    tbody.appendChild(tr);
  });
  addAttendanceCellListeners();
  updateGrandTotal();
  saveData();
}

// Format attendance mark with corresponding span/color
function formatMark(mark) {
  if (mark === "P") return `<span class="attendance-P">P</span>`;
  else if (mark === "A") return `<span class="attendance-A">A</span>`;
  else if (mark === "H") return `<span class="attendance-H">H</span>`;
  else return "";
}

// Calculate worker payment based on attendance and category wage
function calculateWorkerPayment(worker) {
  let total = 0;
  const wage = categories[worker.category] ? categories[worker.category].wage : 0;
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].forEach(day => {
    const mark = worker.attendance ? worker.attendance[day] : "";
    if (mark === "P") total += wage;
    else if (mark === "H") total += wage / 2;
  });
  return total;
}

// Update Grand Total Payment for all workers
function updateGrandTotal() {
  const grandTotal = workers.reduce((sum, worker) => sum + calculateWorkerPayment(worker), 0);
  document.getElementById("grandTotal").textContent = "Grand Total: " + grandTotal;
}

// Add listeners to attendance cells to show popup for marking attendance
function addAttendanceCellListeners() {
  const cells = document.querySelectorAll(".attendance-cell");
  cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
      selectedCell = cell;
      showPopup(cell);
    });
  });
}

// Show attendance popup near the clicked cell
function showPopup(cell) {
  const popup = document.getElementById("attendancePopup");
  const rect = cell.getBoundingClientRect();
  popup.style.top = (rect.bottom + window.scrollY + 5) + "px";
  popup.style.left = (rect.left + window.scrollX + cell.offsetWidth/2 - popup.offsetWidth/2) + "px";
  popup.style.display = "block";
}

// Hide the attendance popup
function hidePopup() {
  document.getElementById("attendancePopup").style.display = "none";
  selectedCell = null;
}

// Set attendance value (P, A, H) for the selected cell and update payment
function setAttendance(mark) {
  if (!selectedCell) return;
  selectedCell.innerHTML = formatMark(mark);
  const workerId = selectedCell.getAttribute("data-worker-id");
  const day = selectedCell.getAttribute("data-day");
  if (workerId && day) {
    const worker = workers.find(w => w.id == workerId);
    if (!worker.attendance) worker.attendance = {};
    worker.attendance[day] = mark;
    // Update row's total payment
    const row = selectedCell.parentElement;
    row.querySelector(".total-payment").textContent = calculateWorkerPayment(worker);
    updateGrandTotal();
    saveData();
  }
  hidePopup();
}

// Reset attendance for all workers after confirmation
function resetAttendance() {
  if (confirm("Are you sure you want to reset all attendance?")) {
    workers.forEach(worker => {
      worker.attendance = {
        "Monday": "",
        "Tuesday": "",
        "Wednesday": "",
        "Thursday": "",
        "Friday": "",
        "Saturday": ""
      };
    });
    initTable();
  }
}

// Undo deletion of last removed worker
function undoDelete() {
  if (deletedWorkerStack.length > 0) {
    const restored = deletedWorkerStack.pop();
    workers.push(restored);
    initTable();
  } else {
    alert("No worker available to undo deletion!");
  }
}

// Add a new worker
function addWorker() {
  const nameInput = document.getElementById("newWorkerName");
  const categorySelect = document.getElementById("workerCategorySelect");
  const name = nameInput.value.trim();
  const category = categorySelect.value;
  if (name === "") {
    alert("Please enter a worker name.");
    return;
  }
  const newWorker = {
    id: Date.now(),
    name: name,
    category: category,
    attendance: {
      "Monday": "",
      "Tuesday": "",
      "Wednesday": "",
      "Thursday": "",
      "Friday": "",
      "Saturday": ""
    }
  };
  workers.push(newWorker);
  nameInput.value = "";
  initTable();
}

// Add a new category with daily wage
function addCategory() {
  const catNameInput = document.getElementById("newCategoryName");
  const catWageInput = document.getElementById("newCategoryWage");
  const catName = catNameInput.value.trim();
  const wage = parseFloat(catWageInput.value);
  if (catName === "" || isNaN(wage) || wage <= 0) {
    alert("Please enter a valid category name and wage.");
    return;
  }
  categories[catName] = { wage: wage };
  catNameInput.value = "";
  catWageInput.value = "";
  renderCategoryFilters();
  saveData();
}

// Filter table rows by selected category
function filterByCategory(category) {
  const rows = document.querySelectorAll("#attendanceBody tr");
  rows.forEach(row => {
    const workerId = row.getAttribute("data-worker-id");
    if (workerId) {
      const worker = workers.find(w => w.id == workerId);
      if (category === "All") row.style.display = "";
      else row.style.display = worker.category === category ? "" : "none";
    }
  });
}

// Search worker by name in real-time
function searchWorker() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const rows = document.querySelectorAll("#attendanceBody tr");
  rows.forEach(row => {
    const workerId = row.getAttribute("data-worker-id");
    if (workerId) {
      const worker = workers.find(w => w.id == workerId);
      row.style.display = worker.name.toLowerCase().includes(query) ? "" : "none";
    }
  });
}

// Week Navigation Functions
function prevWeek() {
  currentWeek--;
  updateWeekDisplay();
  alert("Previous week data functionality can be customized.");
}
function nextWeek() {
  currentWeek++;
  updateWeekDisplay();
  alert("Next week data functionality can be customized.");
}
function newWeek() {
  if (confirm("Start a new week? Attendance will be cleared for all workers.")) {
    workers.forEach(worker => {
      worker.attendance = {
        "Monday": "",
        "Tuesday": "",
        "Wednesday": "",
        "Thursday": "",
        "Friday": "",
        "Saturday": ""
      };
    });
    currentWeek = 0;
    updateWeekDisplay();
    initTable();
  }
}
function updateWeekDisplay() {
  const weekDisplay = document.getElementById("weekDisplay");
  // For demo purposes, we simply show the week offset.
  weekDisplay.textContent = "Week Offset: " + currentWeek;
}

// PDF Download via print
function downloadPDF() {
  window.print();
}

// Long press/right-click deletion for worker row
document.addEventListener("contextmenu", function(e) {
  const row = e.target.closest("tr[data-worker-id]");
  if (row) {
    e.preventDefault();
    const workerId = row.getAttribute("data-worker-id");
    if (confirm("Are you sure you want to delete this worker?")) {
      const index = workers.findIndex(w => w.id == workerId);
      if (index !== -1) {
        deletedWorkerStack.push(workers[index]);
        workers.splice(index, 1);
        initTable();
      }
    }
  }
});

// Hide attendance popup if clicked outside
document.addEventListener("click", function(e) {
  if (selectedCell && !e.target.closest(".popup") && !e.target.classList.contains("attendance-cell")) {
    hidePopup();
  }
});

// Initial render on page load
renderCategoryFilters();
initTable();
updateWeekDisplay();