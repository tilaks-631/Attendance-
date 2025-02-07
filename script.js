let categories = [];

function addCategory() {
    let categoryName = document.getElementById("newCategoryName").value.trim();
    let dailyWage = document.getElementById("newCategoryWage").value;

    if (categoryName && dailyWage) {
        categories.push({ name: categoryName, wage: parseInt(dailyWage) });
        updateCategoryDropdown();
        document.getElementById("newCategoryName").value = "";
        document.getElementById("newCategoryWage").value = "";
    }
}

function updateCategoryDropdown() {
    let select = document.getElementById("workerCategorySelect");
    select.innerHTML = "";
    categories.forEach(cat => {
        let option = document.createElement("option");
        option.value = cat.name;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

function showCategories() {
    alert("Available Categories:\n" + categories.map(cat => cat.name).join(", "));
}

function addWorker() {
    let workerName = document.getElementById("newWorkerName").value.trim();
    let category = document.getElementById("workerCategorySelect").value;

    if (workerName && category) {
        console.log(`Worker Added: ${workerName} - ${category}`);
        document.getElementById("newWorkerName").value = "";
    }
}
