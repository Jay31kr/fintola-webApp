import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";

const categories = [
  "marketing",
  "HRexpense",
  "Utilities",
  "payroll",
  "ITservice",
  "productSale",
  "subscription",
  "others",
];

export default function CreateTransaction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    note: "",
    amount: "",
    type: "expense",
    category: "",
    status: "pending",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setError(""); // ✅ clear error on typing
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // 🔥 VALIDATION
    if (!formData.title.trim()) return setError("Title is required");
    if (!formData.amount || Number(formData.amount) <= 0)
      return setError("Amount must be greater than 0");
    if (!formData.category) return setError("Category is required");
    if (!formData.date) return setError("Date is required");

    setLoading(true);
    setError("");

    try {
      const payload = {
        title: formData.title.trim(),
        note: formData.note.trim(),
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
        status: formData.status,
        date: new Date(formData.date),
      };

      await api.post("/api/v1/transactions/create", payload);

      toast.success("Transaction created successfully");

      // ✅ reset form
      setFormData({
        title: "",
        note: "",
        amount: "",
        type: "expense",
        category: "",
        status: "pending",
        date: "",
      });

      // ✅ redirect
      navigate("/transactions");

    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to create transaction";

      setError(message);
      toast.error(message); // ✅ fixed bug
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="max-w-4xl mx-auto">

    {/* HEADER */}
    <div className="mb-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-slate-900">
        Create Transaction
      </h1>
      <p className="text-sm text-slate-500">
        Add a new financial record
      </p>
    </div>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 max-w-3xl mx-auto"
    >

      {/* ERROR */}
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded mb-4">
          {error}
        </p>
      )}

      {/* TITLE */}
      <div className="mb-4">
        <label className="text-sm text-slate-600">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* NOTE */}
      <div className="mb-4">
        <label className="text-sm text-slate-600">Note</label>
        <input
          type="text"
          value={formData.note}
          onChange={(e) => handleChange("note", e.target.value)}
          className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* AMOUNT */}
      <div className="mb-4">
        <label className="text-sm text-slate-600">Amount</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* TYPE + CATEGORY */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-slate-600">Type</label>
          <select
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-600">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* STATUS */}
      <div className="mb-4">
        <label className="text-sm text-slate-600">Status</label>
        <select
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="reject">Rejected</option>
        </select>
      </div>

      {/* DATE */}
      <div className="mb-4">
        <label className="text-sm text-slate-600">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/transactions")}
          className="border border-gray-300 px-5 py-2 rounded-lg text-sm hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);
}