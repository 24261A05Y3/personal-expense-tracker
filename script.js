let expenses = [];
let editingIndex = null;
let currentFilter = "All";
let currentSort = { column: null, direction: "asc" };

const CATEGORIES = ["Food", "Travel", "Education", "Shopping", "Other"];
// This is the javascript file of personal expense tracker
window.onload = function () {
    let saved = localStorage.getItem("expenses");

    if (saved) {
        expenses = JSON.parse(saved);
    }

    renderExpenses();
};

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {

    let description = document.getElementById("description").value.trim();
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    if (editingIndex !== null) {
        expenses[editingIndex].description = description;
        expenses[editingIndex].amount = amount;
        expenses[editingIndex].category = category;

        editingIndex = null;
        document.getElementById("addBtn").innerHTML = "Add expense";
    } else {
        expenses.push({ description: description, amount: amount, category: category });
    }

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    saveExpenses();
    renderExpenses();
}

function setFilter(category) {
    currentFilter = category;

    document.querySelectorAll(".chip").forEach(function (chip) {
        chip.classList.toggle("chip--active", chip.dataset.category === category);
    });

    renderExpenses();
}

function setSort(column) {

    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
    } else {
        currentSort.column = column;
        currentSort.direction = "asc";
    }

    renderExpenses();
}

function updateSortIndicators() {

    ["description", "amount", "category"].forEach(function (column) {
        let indicator = document.getElementById("sort-" + column);

        if (currentSort.column === column) {
            indicator.innerHTML = currentSort.direction === "asc" ? "▲" : "▼";
        } else {
            indicator.innerHTML = "";
        }
    });
}

function renderExpenses() {

    let tableBody = document.getElementById("expenseList");
    tableBody.innerHTML = "";

    let total = 0;
    let categoryTotals = {};
    CATEGORIES.forEach(function (cat) { categoryTotals[cat] = 0; });

    expenses.forEach(function (expense) {
        total += expense.amount;
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    document.getElementById("total").innerHTML = total.toFixed(2).replace(/\.00$/, "");

    // Entry count, shown alongside the total figure
    let entryCount = expenses.length;
    document.getElementById("totalCount").innerHTML =
        entryCount + (entryCount === 1 ? " entry" : " entries");

    // Category breakdown bars
    let breakdownRows = document.getElementById("breakdownRows");
    let breakdown = document.getElementById("breakdown");
    breakdownRows.innerHTML = "";

    let maxCategory = Math.max(1, ...Object.values(categoryTotals));

    if (total === 0) {
        breakdown.style.display = "none";
    } else {
        breakdown.style.display = "block";

        CATEGORIES.forEach(function (cat) {
            let amt = categoryTotals[cat];
            if (amt === 0) return;

            let pct = (amt / maxCategory) * 100;

            let row = document.createElement("div");
            row.className = "breakdown__row";
            row.innerHTML =
                '<span class="breakdown__name">' + cat + '</span>' +
                '<span class="breakdown__track"><span class="breakdown__fill" style="width:' + pct + '%"></span></span>' +
                '<span class="breakdown__value">₹' + amt.toFixed(2).replace(/\.00$/, "") + '</span>';

            breakdownRows.appendChild(row);
        });
    }

    // Table rows, respecting the active filter and sort
    let highestIndex = null;
    let highestAmount = 0;

    expenses.forEach(function (expense, index) {
        if (expense.amount > highestAmount) {
            highestAmount = expense.amount;
            highestIndex = index;
        }
    });

    let visible = expenses
        .map(function (expense, index) { return { expense: expense, index: index }; })
        .filter(function (item) {
            return currentFilter === "All" || item.expense.category === currentFilter;
        });

    if (currentSort.column) {
        let column = currentSort.column;
        let direction = currentSort.direction === "asc" ? 1 : -1;

        visible.sort(function (a, b) {
            let valA = a.expense[column];
            let valB = b.expense[column];

            if (typeof valA === "string") {
                return valA.localeCompare(valB) * direction;
            }

            return (valA - valB) * direction;
        });
    }

    updateSortIndicators();

    let visibleCount = 0;

    visible.forEach(function (item) {

        let expense = item.expense;
        let index = item.index;

        visibleCount++;

        let row = tableBody.insertRow();

        row.insertCell(0).innerHTML = expense.description +
            (index === highestIndex ? ' <span class="badge">Highest</span>' : '');

        let amountCell = row.insertCell(1);
        amountCell.className = "table__amt";
        amountCell.innerHTML = "₹" + expense.amount.toFixed(2).replace(/\.00$/, "");

        let categoryCell = row.insertCell(2);
        categoryCell.className = "table__cat";
        categoryCell.innerHTML = expense.category;

        let actionCell = row.insertCell(3);
        actionCell.className = "table__act";
        actionCell.innerHTML =
            '<button class="row-btn" onclick="editExpense(' + index + ')">Edit</button>' +
            '<button class="row-btn row-btn--delete" onclick="deleteExpense(' + index + ')">Delete</button>';
    });

    document.getElementById("emptyState").style.display = visibleCount === 0 ? "block" : "none";
}

function editExpense(index) {

    let expense = expenses[index];

    document.getElementById("description").value = expense.description;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;

    editingIndex = index;
    document.getElementById("addBtn").innerHTML = "Update expense";

    document.getElementById("description").focus();
}

function deleteExpense(index) {

    expenses.splice(index, 1);

    if (editingIndex === index) {
        editingIndex = null;
        document.getElementById("addBtn").innerHTML = "Add expense";
    }

    saveExpenses();
    renderExpenses();
}
