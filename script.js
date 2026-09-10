let total = 0;
let editingRow = null; // holds reference to the row currently being edited

function addExpense() {

    let description =
        document.getElementById("description").value;

    let amount =
        Number(document.getElementById("amount").value);

    let category =
        document.getElementById("category").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    if (editingRow) {
        // Update mode: apply changes to the row being edited
        let oldAmount = Number(editingRow.dataset.amount);

        editingRow.cells[0].innerHTML = description;
        editingRow.cells[1].innerHTML = "₹" + amount;
        editingRow.cells[2].innerHTML = category;
        editingRow.dataset.amount = amount;

        total = total - oldAmount + amount;
        document.getElementById("total").innerHTML = total;

        editingRow = null;
        document.getElementById("addBtn").innerHTML = "Add Expense";
    } else {
        // Normal add mode
        let table =
            document.getElementById("expenseList");

        let row = table.insertRow();
        row.dataset.amount = amount;

        row.insertCell(0).innerHTML = description;

        row.insertCell(1).innerHTML = "₹" + amount;

        row.insertCell(2).innerHTML = category;

        let actionCell = row.insertCell(3);

        actionCell.innerHTML =
            '<button onclick="editExpense(this)">Edit</button> ' +
            '<button onclick="deleteExpense(this,' +
            amount + ')">Delete</button>';

        total = total + amount;

        document.getElementById("total").innerHTML = total;
    }

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    filterExpenses();
}

function filterExpenses() {

    let selectedCategory =
        document.getElementById("filterCategory").value;

    let rows =
        document.getElementById("expenseList").rows;

    for (let i = 0; i < rows.length; i++) {

        let rowCategory = rows[i].cells[2].innerHTML;

        if (selectedCategory === "All" || rowCategory === selectedCategory) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function editExpense(button) {

    let row = button.parentElement.parentElement;

    document.getElementById("description").value = row.cells[0].innerHTML;
    document.getElementById("amount").value = Number(row.dataset.amount);
    document.getElementById("category").value = row.cells[2].innerHTML;

    editingRow = row;
    document.getElementById("addBtn").innerHTML = "Update Expense";
}

function deleteExpense(button, amount) {

    button.parentElement.parentElement.remove();

    total = total - amount;

    document.getElementById("total").innerHTML = total;
}