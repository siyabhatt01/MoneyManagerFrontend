// utils/prepareIncomeLineChartData.js

export const prepareIncomeLineChartData = (transactions = []) => {
//   console.log("Incoming transactions:", transactions);

  // Since there is no "type" field, we will assume ALL are incomes
  const incomeTxns = transactions;  
//   console.log("Filtered income transactions:", incomeTxns);

  // Group by normalized date
  const grouped = incomeTxns.reduce((acc, txn) => {
    const dateKey = new Date(txn.date).toISOString().split("T")[0]; 

    if (!acc[dateKey]) {
      acc[dateKey] = { 
        date: dateKey, 
        totalAmount: 0, 
        month: new Date(dateKey).toLocaleString("default", { month: "short" }),
        items: [] 
      };
    }

    // amount field could be txn.amount or something else – adjust here
    const amount = Number(txn.amount) || 0;

    acc[dateKey].totalAmount += amount;
    acc[dateKey].items.push({
      name: txn.name,
      source: txn.categoryName,
      amount: amount
    });

    return acc;
  }, {});

  const result = Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

//   console.log("Final grouped result:", result);
  return result;
};
