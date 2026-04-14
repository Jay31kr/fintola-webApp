import { useEffect } from "react";
import api from "./services/api.js";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await api.get("/health");
  //     console.log(res);
  //   };

  //   fetchData();
  // }, []);

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