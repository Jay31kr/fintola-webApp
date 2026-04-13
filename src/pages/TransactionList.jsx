import { useEffect, useState } from "react";
import api from "../services/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: "",
    status: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  // 🔧 Build query string dynamically
  const buildQuery = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    return params.toString();
  };

  // 🔥 Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const query = buildQuery();
      const res = await api.get(`/api/v1/transactions/view?${query}`);

      const data = res.data.data;

      setTransactions(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Transactions</h1>

      {/* 🔍 FILTERS */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              type: e.target.value,
              page: 1,
            }))
          }
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              status: e.target.value,
              page: 1,
            }))
          }
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              category: e.target.value,
              page: 1,
            }))
          }
          className="border p-2 rounded"
        />

        {/* Date Range */}
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              startDate: e.target.value,
              page: 1,
            }))
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              endDate: e.target.value,
              page: 1,
            }))
          }
          className="border p-2 rounded"
        />
      </div>

      {/* 📦 LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="border p-3 rounded flex justify-between"
            >
              <div>
                <p className="font-medium">{tx.category}</p>
                <p className="text-sm text-gray-500">
                  {tx.type} • {tx.status}
                </p>
              </div>
              <p className="font-semibold">₹{tx.amount}</p>
            </div>
          ))}
        </div>
      )}

      {/* 🔢 PAGINATION */}
      <div className="flex gap-4 mt-6 items-center">
        <button
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
          disabled={filters.page === 1}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <span>
          Page {filters.page} / {totalPages}
        </span>

        <button
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page + 1,
            }))
          }
          disabled={filters.page === totalPages}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}