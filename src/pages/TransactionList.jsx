import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import Transaction from "../components/Transaction.jsx";

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

export default function TransactionList() {
  const navigate = useNavigate();

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

  const [draftFilters, setDraftFilters] = useState(filters);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const buildQuery = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });
    return params.toString();
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/v1/transactions/view?${buildQuery()}`);
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

  const applyFilters = () => {
    setFilters({ ...draftFilters, page: 1 });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/v1/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (tx) => {
    setEditingId(tx._id);
    setEditData(tx);
  };

  const handleSave = async () => {
    try {
      await api.patch(`/api/v1/transactions/${editingId}`, editData);
      setEditingId(null);
      fetchTransactions();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>

      {/* 🔥 PAGE HEADER */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-slate-900">
          Transactions
        </h1>
        <p className="text-sm text-slate-500">
          Track, filter and manage your financial data
        </p>
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6 p-4 flex flex-wrap gap-3 items-center">

        <select
          value={draftFilters.type}
          onChange={(e) =>
            setDraftFilters({ ...draftFilters, type: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={draftFilters.status}
          onChange={(e) =>
            setDraftFilters({ ...draftFilters, status: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Status</option>
          <option value="completed">Approved</option>
          <option value="pending">Pending</option>
          <option value="reject">Rejected</option>
        </select>

        <select
          value={draftFilters.category}
          onChange={(e) =>
            setDraftFilters({ ...draftFilters, category: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={draftFilters.startDate}
          onChange={(e) =>
            setDraftFilters({ ...draftFilters, startDate: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={draftFilters.endDate}
          onChange={(e) =>
            setDraftFilters({ ...draftFilters, endDate: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />

        {/* 🔥 ACTION BUTTONS */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={applyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Apply
          </button>

          <button
            onClick={() => navigate("/create-transaction")}
            className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Create
          </button>
        </div>
      </div>

      {/* 📊 TABLE */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-slate-700 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Note</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <Transaction
                  key={tx._id}
                  tx={tx}
                  editingId={editingId}
                  editData={editData}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onDelete={handleDelete}
                  onChange={handleEditChange}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔢 PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">

        <button
          disabled={filters.page === 1}
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
          }
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
        >
          ◀
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: pageNum }))
              }
              className={`px-3 py-1 border rounded-lg text-sm ${
                filters.page === pageNum
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={filters.page === totalPages}
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
          }
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
        >
          ▶
        </button>
      </div>
    </div>
  );
}