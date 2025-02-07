document.addEventListener("DOMContentLoaded", () => {
    loadData();
    updateDate();
});

const categories = {};
let workers = [];

function updateDate() {
    document.getElementById("currentDate").innerText = new Date().toLocaleDateString();
}

function addCategory() {
    const name = prompt("Enter Category Name:");
    const wage = prompt("Enter Daily Wage:");

    if (name && wage) {
        categories[name] = parseFloat(wage);
        document.getElementById("categoryFilters").innerHTML += 
            `<button onclick="filterCategory('${name}')">${name}</button>`;
    }
}

function addWorker() {
    const name = prompt("Enter Worker Name:");
    const category = prompt("Enter Worker Category:");

    if (name && categories[category]) {
        workers.push({ name, category, attendance: Array(6).fill("") });
        renderTable();
    } else {
        alert("Invalid Category! Add category first.");
    }
}

function renderTable() {
    const tbody = document.querySelector("#attendanceTable tbody");
    tbody.innerHTML = "";

    workers.forEach((worker, index) => {
        let totalPay = 0;
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${worker.name}</td>
            <td>${worker.category}</td>`;

        worker.attendance.forEach((status, day) => {
            let className = status ? `attendance-${status}` : "";
            let pay = status === "P" ? categories[worker.category] :
                      status === "H" ? categories[worker.category] / 2 : 0;

            totalPay += pay;

            row += `<td class="attendance-cell ${className}" 
                        onclick="toggleAttendance(${index}, ${day})">
                        ${status}
                    </td>`;
        });

        row += `<td>₹${totalPay.toFixed(2)}</td></tr>`;
        tbody.innerHTML += row;
    });

    document.getElementById("grandTotal").innerText = 
        `Total Payment: ₹${workers.reduce((sum, w) => sum + w.attendance.reduce((s, a, d) => s + (a === "P" ? categories[w.category] : a === "H" ? categories[w.category] / 2 : 0), 0), 0).toFixed(2)}`;
}

function toggleAttendance(workerIndex, dayIndex) {
    let currentStatus = workers[workerIndex].attendance[dayIndex];
    let nextStatus = currentStatus === "" ? "P" : currentStatus === "P" ? "A" : currentStatus === "A" ? "H" : "";

    workers[workerIndex].attendance[dayIndex] = nextStatus;
    renderTable();
}

function newWeek() {
    workers.forEach(worker => worker.attendance.fill(""));
    renderTable();
}

function resetData() {
    workers = [];
    renderTable();
}

function filterCategory(category) {
    console.log("Filter by:", category);
}

function exportPDF() {
    alert("PDF Export coming soon!");
}

function loadData() {
    renderTable();
}
