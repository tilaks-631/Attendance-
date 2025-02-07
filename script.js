let workers = [];

function addWorker() {
    let name = document.getElementById('newWorkerName').value;
    let category = document.getElementById('workerCategorySelect').value;

    let worker = {
        name: name,
        category: category,
        attendance: { Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
        totalPayment: 0
    };

    workers.push(worker);
    updateTable();
}

function setAttendance(status) {
    let selectedBox = document.querySelector('.selected');
    selectedBox.innerHTML = `<span class="attendance-${status}">${status}</span>`;
    selectedBox.classList.remove('selected');
    updatePayment();
}

function updatePayment() {
    workers.forEach(worker => {
        let total = 0;
        for (let day in worker.attendance) {
            if (worker.attendance[day] === 'P') total += 100;
            if (worker.attendance[day] === 'H') total += 50;
        }
        worker.totalPayment = total;
    });

    document.getElementById('grandTotal').textContent = 'Grand Total: ' + workers.reduce((sum, w) => sum + w.totalPayment, 0);
}

function updateTable() {
    // (Re-renders the table with updated data)
}
