import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function SignIn(){

 const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/v1/auth/signin", formData);
      console.log(res.data); // success
      navigate("/transactions");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
   return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" w-85 p-6 border rounded-lg shadow-md flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded hover:opacity-90"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}