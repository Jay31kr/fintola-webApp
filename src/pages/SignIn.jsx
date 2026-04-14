import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";

export default function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      await api.post("/api/v1/auth/signin", formData);

      toast.success("Logged in successfully");
      navigate("/transactions");

    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6">

        {/* 🔥 HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">
            Login to your account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}