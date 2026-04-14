import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Transactions", path: "/transactions" },
    { name: "Users", path: "/users" },
    { name: "Requests", path: "/admin-requests" },
    { name: "Insights", path: "/insights" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* 🔥 LOGO */}
        <Link
          to="/"
          className="text-xl font-semibold text-slate-900 tracking-tight"
        >
          Fintola
        </Link>

        {/* 🔥 NAV LINKS */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* 🔥 RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signin"
            className="text-sm text-gray-600 hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* 🔥 MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-lg"
        >
          ☰
        </button>
      </div>

      {/* 🔥 MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm text-gray-700 border-t">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="py-1"
            >
              {item.name}
            </Link>
          ))}

          <hr />

          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() => setOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}