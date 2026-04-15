import { useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";

export default function Request({ request, refresh }) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    try {
      setLoading(true);

      await api.patch(`/api/v1/admin/requests/${request._id}`, {
        action,
      });

      toast.success(`Request ${action}ed`);
      refresh();
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setLoading(false);
    }
  };

  const user = request.user;

  return (
    <div className="grid grid-cols-6 px-4 py-4 items-center border-t text-sm hover:bg-gray-50 transition">

      {/* User */}
      <span className="font-medium text-slate-900">
        {user?.username}
      </span>

      {/* Email */}
      <span className="text-slate-500 truncate">
        {user?.email}
      </span>

      {/* Role */}
      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 w-fit">
        {user?.role}
      </span>

      {/* Status */}
      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 w-fit">
        {request.status}
      </span>

      {/* Date */}
      <span className="text-slate-400 text-xs">
        {new Date(request.requestedAt).toLocaleDateString()}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-3">

        {/* Approve */}
        <button
          onClick={() => handleAction("approve")}
          disabled={loading}
          className="text-green-600 hover:text-green-700 text-lg font-bold disabled:opacity-50"
        >
          ✔
        </button>

        {/* Reject */}
        <button
          onClick={() => handleAction("reject")}
          disabled={loading}
          className="text-red-600 hover:text-red-700 text-lg font-bold disabled:opacity-50"
        >
          ✖
        </button>
      </div>
    </div>
  );
}