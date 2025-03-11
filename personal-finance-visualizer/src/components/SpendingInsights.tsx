import { Transaction } from "./BudgetComparisonChart";
import { Budget } from "./BudgetComparisonChart";

type SpendingInsightsProps = {
  transactions: Transaction[];
  budgets: Budget[];
};

export default function SpendingInsights({
  transactions,
  budgets,
}: SpendingInsightsProps) {
  const currentMonth = new Date().toISOString().substring(0, 7);
  const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];

  const insights = categories.map((category) => {
    const actual = transactions.reduce((sum, tx) => {
      const txMonth = new Date(tx.date).toISOString().substring(0, 7);
      return tx.category === category && txMonth === currentMonth ? sum + tx.amount : sum;
    }, 0);

    const budgetObj = budgets.find((b) => b.category === category && b.month === currentMonth);
    const budget = budgetObj ? budgetObj.amount : 0;
    const diff = budget - actual;

    return { category, actual, budget, diff }; // Returning all the data to be used later
  });

  return (
    <div className="mt-4 p-4 bg-[#FDF6EC] shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-[#E4792B]">
        Spending Insights - {currentMonth}
      </h2>
      <ul className="space-y-2">
        {insights.map(({ category, actual, budget, diff }) => (
          <li key={category} className="text-sm font-medium">
            {budget > 0 ? (
              diff < 0 ? (
                <span className="text-[#E4792B]">
                  ⚠️ You have exceeded your <strong>{category}</strong> budget by 
                  <span className="font-bold"> ${Math.abs(diff).toFixed(2)}</span>.
                </span>
              ) : (
                <span className="text-[#5A8C5E]">
                  ✅ You are under budget in <strong>{category}</strong> by 
                  <span className="font-bold"> ${diff.toFixed(2)}</span> (Actual: 
                  <span className="font-bold"> ${actual.toFixed(2)}</span>).
                </span>
              )
            ) : (
              <span className="text-[#6D6D6D]">
                ℹ️ No budget set for <strong>{category}</strong>.
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
