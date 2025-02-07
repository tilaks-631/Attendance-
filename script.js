function showCategories() {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let categoryList = document.getElementById("categoryList");

    categoryList.innerHTML = categories.length === 0 ? "<li>No categories available</li>" : "";
    
    categories.forEach(category => {
        let li = document.createElement("li");
        li.textContent = category.name + " (₹" + category.wage + "/day)";
        categoryList.appendChild(li);
    });

    document.getElementById("categoryListPopup").style.display = "block";
}

function closeCategoryPopup() {
    document.getElementById("categoryListPopup").style.display = "none";
}

function loadCategories() {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let categorySelect = document.getElementById("workerCategorySelect");

    categorySelect.innerHTML = "<option value=''>Select Category</option>";
    
    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadCategories();
});
