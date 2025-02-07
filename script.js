let workers = [];
let categories = [];
let attendancePopup = document.getElementById("attendancePopup");

// Add Category
function addCategory() {
    let name = document.getElementById("newCategoryName").value;
    let wage = document.getElementById("newCategoryWage").value;
    categories.push({ name, wage });
    updateCategoryDropdown();
}

// Show Categories
function showCategories() {
    alert(categories.map(c => c.name + " - ₹" + c.wage).join("\n"));
}

// Update Category Dropdown
function updateCategoryDropdown() {
    let select = document.getElementById("workerCategorySelect");
    select.innerHTML = "";
    categories.forEach((cat, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${cat.name} - ₹${cat.wage}`;
        select.appendChild(option);
    });
}

// Add Worker
function addWorker() {
    let name = document.getElementById("newWorkerName").value;
    let categoryIndex = document.getElementById("workerCategorySelect").value;
    if (!name || categoryIndex === "") return;
    let category = categories[categoryIndex];
    let worker = { name, category, attendance: [null, null, null, null, null, null], total: 0 };
    workers.push(worker);
    updateTable();
}

// Update Table
function updateTable() {
    let tbody = document.getElementById("attendanceBody");
    tbody.innerHTML = "";
    workers.forEach((worker, i) => {
        let row = `<tr>
            <td>${i + 1}</td>
            <td>${worker.name}</td>
            <td>${worker.category.name}</td>
            ${worker.attendance.map((_, j) => `<td onclick="markAttendance(${i}, ${j})">-</td>`).join("")}
            <td>₹${worker.total}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Mark Attendance
function markAttendance(workerIndex, dayIndex) {
    workers[workerIndex].attendance[dayIndex] = "P";
    updateTable();
}
