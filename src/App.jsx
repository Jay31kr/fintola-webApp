import { useEffect } from "react";
import api from "./services/api.js";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser , clearUser , setLoading } from "./store/features/AuthSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(setLoading(true));

        const res = await api.get("/api/v1/auth/me");

        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto px-6 py-6">
        <Outlet />
      </div>
    </main>
  );
}

export default App;