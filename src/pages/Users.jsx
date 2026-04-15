import { useEffect, useState } from "react";
import api from "../services/api.js";
import User from "../components/User.jsx";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/v1/admin/", {
        params: {
          page,
          limit: 10,
          ...filters,
        },
      });

      setUsers(res.data.data.users);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filters]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* 🔥 Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Users
        </h2>
        <p className="text-sm text-slate-500">
          Manage system users and permissions
        </p>
      </div>

      {/* 🔥 Filters Toolbar (BIG FIX) */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-3">
          <select
            value={filters.role}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, role: e.target.value }))
            }
            className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option value="viewer">Viewer</option>
            <option value="analyst">Analyst</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* 🔥 Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        {/* Header Row */}
        <div className="grid grid-cols-6 px-4 py-3 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
          <span>Username</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Created</span>
          <span>Actions</span>
        </div>

        {/* Data */}
        {loading ? (
          <p className="p-4 text-sm text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No users found</p>
        ) : (
          users.map((user) => (
            <User key={user._id} user={user} refresh={fetchUsers} />
          ))
        )}
      </div>

      {/* 🔥 Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}