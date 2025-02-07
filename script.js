let workers = [];
let categories = {};
let totalPayment = 0;

function addWorker() {
    let name = prompt("Enter Worker Name:");
    if (!name) return;
    
    let category = prompt("Enter Category:");
    if (!category || !categories[category]) {
        alert("Category does not exist!");
        return;
    }

    let wage = categories[category];
    workers.push({ name, category, wage, attendance: [null, null, null, null, null, null], total: 0 });
    renderTable();
}

function addCategory() {
    let category = prompt("Enter Category Name:");
    if (!category) return;
    
    let wage = parseInt(prompt("Enter Daily Wage:"));
    if (isNaN(wage) || wage <= 0) {
        alert("Invalid Wage!");
        return;
    }

    categories[category] = wage;
    alert(`Category "${category}" added successfully!`);
}

function markAttendance(workerIndex, dayIndex) {
    let status = prompt("Mark Attendance (P=Present, A=Absent, H=Half):");
    if (!['P', 'A', 'H'].includes(status.toUpperCase())) return;

    workers[workerIndex].attendance[dayIndex] = status.toUpperCase();
    calculatePayment();
    renderTable();
}

function calculatePayment() {
    totalPayment = 0;
    workers.forEach(worker => {
        let total = 0;
        worker.attendance.forEach(day => {
            if (day === 'P') total += worker.wage;
            else if (day === 'H') total += worker.wage / 2;
        });
        worker.total = total;
        totalPayment += total;
    });
    document.getElementById("totalPayment").innerText = totalPayment + " ₹";
}

function resetAttendance() {
    if (!confirm("Are you sure to reset attendance?")) return;
    workers.forEach(worker => worker.attendance.fill(null));
    calculatePayment();
    renderTable();
}

function renderTable() {
    let tbody = document.querySelector("#attendanceTable tbody");
    tbody.innerHTML = "";

    workers.forEach((worker, i) => {
        let row = `<tr>
            <td>${i + 1}</td>
            <td>${worker.name}</td>
            <td>${worker.category}</td>`;

        worker.attendance.forEach((day, j) => {
            let colorClass = day === 'P' ? 'present' : day === 'A' ? 'absent' : day === 'H' ? 'half' : '';
            row += `<td class="${colorClass}" onclick="markAttendance(${i}, ${j})">${day || '-'}</td>`;
        });

        row += `<td>${worker.total} ₹</td></tr>`;
        tbody.innerHTML += row;
    });
}

setInterval(() => {
    document.getElementById("date-time").innerText = new Date().toLocaleString();
}, 1000);
