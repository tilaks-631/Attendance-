document.addEventListener("DOMContentLoaded", function () {
    loadAttendance();
});

function resetAttendance() {
    if (confirm("Are you sure you want to reset all attendance?")) {
        localStorage.removeItem("attendanceData");
        localStorage.removeItem("categories");
        loadAttendance();
    }
}

function loadAttendance() {
    let data = JSON.parse(localStorage.getItem("attendanceData")) || [];
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Remove "Ramesh" and "Driver" category
    data = data.filter(worker => worker.name !== "Ramesh");
    categories = categories.filter(cat => cat.name !== "Driver");

    localStorage.setItem("attendanceData", JSON.stringify(data));
    localStorage.setItem("categories", JSON.stringify(categories));

    let tbody = document.getElementById("attendanceBody");
    tbody.innerHTML = "";
    data.forEach((worker, index) => {
        let row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${worker.name}</td>
            <td>${worker.category}</td>
            <td class="attendance-cell"></td>
            <td class="attendance-cell"></td>
            <td class="attendance-cell"></td>
            <td class="attendance-cell"></td>
            <td class="attendance-cell"></td>
            <td class="attendance-cell"></td>
            <td>₹0</td>
        `;
    });

    document.getElementById("grandTotal").innerText = "Grand Total: ₹0";
}
