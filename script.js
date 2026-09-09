let total = 0;

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

    let table =
        document.getElementById("expenseList");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = description;

    row.insertCell(1).innerHTML = "₹" + amount;

    row.insertCell(2).innerHTML = category;

    let deleteCell = row.insertCell(3);

    deleteCell.innerHTML =
        '<button onclick="deleteExpense(this,' +
        amount + ')">Delete</button>';

    total = total + amount;

    document.getElementById("total").innerHTML = total;

    document.getElementById("description").value = "";

    document.getElementById("amount").value = "";
}

function deleteExpense(button, amount) {

    button.parentElement.parentElement.remove();

    total = total - amount;

    document.getElementById("total").innerHTML = total;
}