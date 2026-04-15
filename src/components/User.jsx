import { useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";

export default function User({ user, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    role: user.role,
    status: user.status,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.patch(`/api/v1/admin/users/${user._id}`, formData);

      toast.success("User updated");
      setEditMode(false);
      refresh();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this user?")) return;

    try {
      setLoading(true);
      await api.delete(`/api/v1/users/${user._id}`);

      toast.success("User deleted");
      refresh();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-6 px-4 py-4 text-sm items-center border-t hover:bg-gray-50 transition">
      
      {/* Username */}
      <span className="font-medium text-slate-900">
        {user.username}
      </span>

      {/* Email */}
      <span className="text-slate-500 truncate">
        {user.email}
      </span>

      {/* Role */}
      {editMode ? (
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="viewer">Viewer</option>
          <option value="analyst">Analyst</option>
          <option value="admin">Admin</option>
        </select>
      ) : (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : user.role === "analyst"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {user.role}
        </span>
      )}

      {/* Status */}
      {editMode ? (
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      ) : (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
            user.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>
      )}

      {/* Date */}
      <span className="text-slate-400 text-xs">
        {new Date(user.createdAt).toLocaleDateString()}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {editMode ? (
          <button
            onClick={handleSave}
            disabled={loading}
            className="text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
           Update
          </button>
        )}

      </div>
    </div>
  );
}