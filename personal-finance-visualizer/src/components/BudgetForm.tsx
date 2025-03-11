import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type BudgetData = {
  category: string;
  month: string; // Expected format: "YYYY-MM"
  amount: number | string;
  _id?: string;
};

type BudgetFormProps = {
  onSubmit: (data: BudgetData) => void;
  initialData?: BudgetData;
};

const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];

export default function BudgetForm({ onSubmit, initialData = {} as BudgetData }: BudgetFormProps) {
  const [category, setCategory] = useState(initialData.category || categories[0]);
  const [month, setMonth] = useState(initialData.month || "");
  const [amount, setAmount] = useState(initialData.amount || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!category || !month || !amount) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSubmit({ category, month, amount, _id: initialData._id });
    if (!initialData._id) {
      setCategory(categories[0]);
      setMonth("");
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-[#FDF6EC] shadow-md rounded-lg">
      {error && <p className="text-[#D64532] text-sm text-center">{error}</p>}

      <div className="grid gap-1">
        <Label htmlFor="budget-category" className="text-[#E4792B] font-medium">Category</Label>
        <select
          id="budget-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-[#E4792B] rounded-md p-2 w-full bg-white focus:ring-2 focus:ring-[#F4A261]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <Label htmlFor="budget-month" className="text-[#E4792B] font-medium">Month</Label>
        <Input
          id="budget-month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full border border-[#E4792B] focus:ring-2 focus:ring-[#F4A261]"
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="budget-amount" className="text-[#E4792B] font-medium">Budget Amount</Label>
        <Input
          id="budget-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget amount"
          className="w-full border border-[#E4792B] focus:ring-2 focus:ring-[#F4A261]"
        />
      </div>

      <Button type="submit" className="w-full bg-[#E4792B] text-white hover:bg-[#F4A261] transition-all duration-200">
        {initialData._id ? "Update Budget" : "Set Budget"}
      </Button>
    </form>
  );
}
