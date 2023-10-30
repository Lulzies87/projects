var transactions = [];
var totalIncome = 0;
var totalExpenses = 0;
updateDashboard();
var addTransactionForm = document.forms.namedItem("add-transaction");
addTransactionForm === null || addTransactionForm === void 0 ? void 0 : addTransactionForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var type = parseInput(formData.get("type"), "Type");
    var amount = Number(formData.get("amount"));
    var category = parseInput(formData.get("category"), "Category");
    addTransaction(type, amount, category);
});
function parseInput(input, key) {
    if (input == null) {
        throw Error("value of " + key + " cant be null");
    }
    return input;
}
function updateDashboard() {
    var balance = totalIncome - totalExpenses;
    document.getElementById("dashboard").innerHTML = "\n        <h2>Dashboard</h2>\n        <p>Total Income: $" + totalIncome + "</p>\n        <p>Total Expenses: $" + totalExpenses + "</p>\n        <p>Balance: $" + balance + "</p>\n    ";
}
function addTransaction(type, amount, category) {
    if (type === "Income") {
        totalIncome += amount;
        transactions.push({
            type: type,
            amount: amount,
            category: category
        });
    }
    else if (type === "Expense") {
        totalExpenses += amount;
        transactions.push({
            type: type,
            amount: amount,
            category: category
        });
    }
    updateDashboard();
    displayTransactions();
}
function displayTransactions() {
    var transactionList = document.getElementById("transactions");
    transactionList.innerHTML = "<h2>Transactions</h2>";
    transactions.forEach(function (transaction) {
        transactionList.innerHTML += "\n            <p>" + (transaction.category.charAt(0).toUpperCase() +
            transaction.category.slice(1)) + ": $" + transaction.amount + "</p>\n        ";
    });
}
