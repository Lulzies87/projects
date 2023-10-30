type TransactionType = "Income" | "Expense";
type Category =
  | "Housing"
  | "Transportation"
  | "Food"
  | "HealthCare"
  | "Insurance"
  | "Clothing and Personal Care"
  | "Gifts and Donations"
  | "Childcare";
type Transaction = {
  type: TransactionType;
  amount: number;
  category: Category;
};
type TransactionArray = Transaction[];
const transactions: TransactionArray = [];
let totalIncome = 0;
let totalExpenses = 0;

updateDashboard();

const addTransactionForm = document.forms.namedItem("add-transaction");
addTransactionForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const type = parseInput(formData.get("type"), "Type");
  const amount = Number(formData.get("amount"));
  const category = parseInput(formData.get("category"), "Category");

  addTransaction(type, amount, category);
});

function parseInput(input, key) {
  if (input == null) {
    throw Error(`value of ${key} cant be null`);
  }
  return input;
}

function updateDashboard() {
  const balance = totalIncome - totalExpenses;
  document.getElementById("dashboard")!.innerHTML = `
        <h2>Dashboard</h2>
        <p>Total Income: $${totalIncome}</p>
        <p>Total Expenses: $${totalExpenses}</p>
        <p>Balance: $${balance}</p>
    `;
}

function addTransaction(
  type: TransactionType,
  amount: number,
  category: Category
) {
  if (type === "Income") {
    totalIncome += amount;
    transactions.push({
      type: type,
      amount: amount,
      category: category,
    });
  } else if (type === "Expense") {
    totalExpenses += amount;
    transactions.push({
      type: type,
      amount: amount,
      category: category,
    });
  }
  updateDashboard();
  displayTransactions();
}

function displayTransactions() {
  const transactionList = document.getElementById("transactions");
  transactionList!.innerHTML = "<h2>Transactions</h2>";

  transactions.forEach((transaction) => {
    transactionList!.innerHTML += `
            <p>${
              transaction.category.charAt(0).toUpperCase() +
              transaction.category.slice(1)
            }: $${transaction.amount}</p>
        `;
  });
}
