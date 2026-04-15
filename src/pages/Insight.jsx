import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import InsightCard from "../components/InsightCard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#f59e0b"];

export default function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/v1/transactions/insights");
      setData(res.data.data);
    } catch {
      toast.error("Failed to load insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  // 🔥 monthly transform (income vs expense)
  const monthlyData =
    data?.monthlyTrends?.reduce((acc, item) => {
      const key = `${item._id.month}/${item._id.year}`;
      const existing = acc.find((i) => i.name === key);

      if (existing) {
        existing[item._id.type] = item.total;
      } else {
        acc.push({
          name: key,
          [item._id.type]: item.total,
        });
      }

      return acc;
    }, []) || [];

  return (
    <div className="space-y-10">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Insights Dashboard
          </h2>
          <p className="text-sm text-slate-400">
            Visual financial analytics
          </p>
        </div>

        <button
          onClick={fetchInsights}
          className="px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transition"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* 🔥 KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-4">
        <InsightCard title="Income" value={data?.totalIncome} color="green" />
        <InsightCard title="Expense" value={data?.totalExpense} color="red" />
        <InsightCard title="Balance" value={data?.netBalance} color="blue" />
        <InsightCard
          title="Avg Txn"
          value={data?.avgTransaction?.toFixed(2)}
          color="purple"
        />
      </div>

      {/* 🔥 LINE CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          Monthly Trends
        </h3>

        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#16a34a"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#dc2626"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 GRID SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Expense by Category
          </h3>

          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={data?.categoryExpense}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* EXPENSE PIE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Expense Distribution
          </h3>

          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data?.categoryExpense}
                  dataKey="total"
                  nameKey="_id"
                  outerRadius={100}
                >
                  {data?.categoryExpense?.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🔥 SECOND GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* INCOME PIE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Income Distribution
          </h3>

          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data?.categoryIncome}
                  dataKey="total"
                  nameKey="_id"
                  outerRadius={100}
                >
                  {data?.categoryIncome?.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP LIST */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Top Spending
          </h3>

          <div className="space-y-2">
            {data?.topExpenseCategories?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-2 border-b last:border-none"
              >
                <span className="text-slate-600 capitalize">
                  {item._id}
                </span>
                <span className="font-semibold text-slate-900">
                  ₹{item.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}