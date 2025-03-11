import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type CategoryPieChartProps = {
  transactions: Transaction[];
};

// Updated warm orange & skin-tone palette
const COLORS = ["#E4792B", "#F4A261", "#D64532", "#FDF6EC", "#B05E27"];

export default function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  // Aggregate transactions by category
  const categoryData = transactions.reduce<Record<string, number>>(
    (acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    },
    {}
  );

  const data = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  return (
    <div className="mt-4 p-4 bg-[#FDF6EC] shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-[#E4792B]">
        Expenses by Category
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#FDF6EC", fontSize: "12px" }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-[#D64532] font-medium">
          No transaction data available
        </p>
      )}
    </div>
  );
}
