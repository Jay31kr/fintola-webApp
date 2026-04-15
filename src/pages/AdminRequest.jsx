import { useEffect, useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";
import Request from "../components/Request.jsx";

export default function AdminRequest() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/requests", {
        params: { page, limit: 10 },
      });

      setRequests(res.data.data.requests);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* 🔥 Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Admin Requests
        </h2>
        <p className="text-sm text-slate-500">
          Review and manage admin access requests
        </p>
      </div>

      {/* 🔥 Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        {/* Header Row */}
        <div className="grid grid-cols-6 px-4 py-3 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
          <span>User</span>
          <span>Email</span>
          <span>Current Role</span>
          <span>Status</span>
          <span>Requested At</span>
          <span>Actions</span>
        </div>

        {/* Data */}
        {loading ? (
          <p className="p-4 text-sm text-gray-500">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No pending requests</p>
        ) : (
          requests.map((req) => (
            <Request
              key={req._id}
              request={req}
              refresh={fetchRequests}
            />
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