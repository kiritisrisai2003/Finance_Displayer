import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
};

type MonthlyExpensesChartProps = {
  transactions: Transaction[];
};

export default function MonthlyExpensesChart({
  transactions,
}: MonthlyExpensesChartProps) {
  // Aggregate transactions by month
  const monthlyData = transactions.reduce<Record<string, number>>((acc, tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {});

  const data = Object.keys(monthlyData).map((month) => ({
    month,
    expenses: monthlyData[month],
  }));

  return (
    <div className="mt-4 p-4 bg-[#FDF6EC] shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-[#E4792B]">
        Monthly Expenses
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E0C3A3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6D6D6D" }}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 12, fill: "#6D6D6D" }} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FDF6EC",
                border: "1px solid #E4792B",
                fontSize: "12px",
                color: "#B05E27",
              }}
            />
            <Bar dataKey="expenses" fill="#E4792B" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-[#6D6D6D]">
          No transaction data available
        </p>
      )}
    </div>
  );
}
