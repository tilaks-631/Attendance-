document.addEventListener("DOMContentLoaded", function () {
    loadAttendance();
    loadCategories();
});

// Reset Attendance Data
function resetAttendance() {
    if (confirm("Are you sure you want to reset all attendance?")) {
        localStorage.removeItem("attendanceData");
        localStorage.removeItem("categories");
        loadAttendance();
        loadCategories();
    }
}

// Load Attendance Table
function loadAttendance() {
    let data = JSON.parse(localStorage.getItem("attendanceData")) || [];
    
    // Remove "Ramesh"
    data = data.filter(worker => worker.name !== "Ramesh");
    localStorage.setItem("attendanceData", JSON.stringify(data));

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

// Load Category Dropdown
function loadCategories() {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    
    // Remove "Driver" category
    categories = categories.filter(cat => cat.name !== "Driver");
    localStorage.setItem("categories", JSON.stringify(categories));

    let categorySelect = document.getElementById("workerCategorySelect");
    let filterContainer = document.getElementById("categoryFilters");

    categorySelect.innerHTML = `<option value="">Select Category</option>`;
    filterContainer.innerHTML = "";

    categories.forEach(category => {
        // Add to dropdown
        let option = document.createElement("option");
        option.value = category.name;
        option.textContent = `${category.name} (₹${category.wage})`;
        categorySelect.appendChild(option);

        // Add to filter buttons
        let btn = document.createElement("button");
        btn.classList.add("category");
        btn.textContent = category.name;
        btn.onclick = () => filterByCategory(category.name);
        filterContainer.appendChild(btn);
    });
}

// Add a New Category
function addCategory() {
    let categoryName = document.getElementById("newCategoryName").value.trim();
    let categoryWage = document.getElementById("newCategoryWage").value.trim();

    if (categoryName === "" || categoryWage === "") {
        alert("Please enter both category name and wage!");
        return;
    }

    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase())) {
        alert("Category already exists!");
        return;
    }

    categories.push({ name: categoryName, wage: parseFloat(categoryWage) });
    localStorage.setItem("categories", JSON.stringify(categories));

    loadCategories(); // Refresh dropdown & filter buttons
    document.getElementById("newCategoryName").value = "";
    document.getElementById("newCategoryWage").value = "";
}

// Add a Worker
function addWorker() {
    let workerName = document.getElementById("newWorkerName").value.trim();
    let workerCategory = document.getElementById("workerCategorySelect").value;

    if (workerName === "" || workerCategory === "") {
        alert("Please enter worker name and select a category!");
        return;
    }

    let data = JSON.parse(localStorage.getItem("attendanceData")) || [];
    data.push({ name: workerName, category: workerCategory });
    localStorage.setItem("attendanceData", JSON.stringify(data));

    loadAttendance(); // Refresh worker table
    document.getElementById("newWorkerName").value = "";
}

// Filter Workers by Category
function filterByCategory(category) {
    let rows = document.querySelectorAll("#attendanceTable tbody tr");
    rows.forEach(row => {
        row.style.display = row.children[2].textContent === category ? "" : "none";
    });
}
