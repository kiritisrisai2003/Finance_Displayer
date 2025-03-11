import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

export type Budget = {
  _id?: string;
  category: string;
  month: string; // Format: "YYYY-MM"
  amount: number;
};

type BudgetComparisonChartProps = {
  transactions: Transaction[];
  budgets: Budget[];
};

export default function BudgetComparisonChart({ transactions, budgets }: BudgetComparisonChartProps) {
  const currentMonth = new Date().toISOString().substring(0, 7);
  const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];

  const actuals = categories.reduce<Record<string, number>>((acc, category) => {
    acc[category] = transactions.reduce((sum, tx) => {
      const txMonth = new Date(tx.date).toISOString().substring(0, 7);
      if (tx.category === category && txMonth === currentMonth) {
        return sum + tx.amount;
      }
      return sum;
    }, 0);
    return acc;
  }, {});

  const data = categories.map((category) => {
    const budgetObj = budgets.find(b => b.category === category && b.month === currentMonth);
    return {
      category,
      actual: actuals[category],
      budget: budgetObj ? budgetObj.amount : 0,
    };
  });

  return (
    <div className="mt-4 p-4 bg-[#FAE5D3] shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-[#D66A00]">Budget vs Actual - {currentMonth}</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0B08A" />
            <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#D66A00" }} />
            <YAxis tick={{ fontSize: 12, fill: "#D66A00" }} />
            <Tooltip contentStyle={{ fontSize: '12px', backgroundColor: "#FCE5CD", borderColor: "#D66A00" }} />
            <Legend />
            <Bar dataKey="actual" fill="#E65100" name="Actual Spending" />
            <Bar dataKey="budget" fill="#F4A460" name="Budget" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-[#B86F50]">No data available for the current month</p>
      )}
    </div>
  );
}
