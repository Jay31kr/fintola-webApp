import { useEffect } from "react";
import api from "./services/api.js";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  clearUser,
  setLoading,
} from "./store/features/AuthSlice.js";

function App() {
  const dispatch = useDispatch();
  // Grab loading state from Redux
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        const user = res.data?.data; 
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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