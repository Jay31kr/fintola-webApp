import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">

      {/* 🔥 HERO */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Control Your Financial Data
        </h1>

        <p className="text-slate-500 max-w-2xl mx-auto mb-8">
          Fintola is a modern financial analytics platform with role-based access —
          built for teams to track, analyze, and manage transactions efficiently.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/transactions")}
            className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            View Demo
          </button>
        </div>
      </section>

      {/* 🔥 ROLE SECTION */}
      <section className="grid md:grid-cols-3 gap-6">

        {/* Viewer */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Viewer
          </h3>
          <p className="text-sm text-slate-500">
            Access and monitor all transactions in a clean, read-only interface.
          </p>
        </div>

        {/* Analyst */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Analyst
          </h3>
          <p className="text-sm text-slate-500">
            Gain insights with charts, trends, and financial analytics tools.
          </p>
        </div>

        {/* Admin */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Admin
          </h3>
          <p className="text-sm text-slate-500">
            Full control over users, approvals, and system-wide operations.
          </p>
        </div>
      </section>

      {/* 🔥 FEATURES */}
      <section className="space-y-10">

        {/* Transactions */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Transaction Management
            </h3>
            <p className="text-slate-500">
              Create, update, filter, and manage transactions with a clean and powerful interface.
            </p>
          </div>

          <div className="bg-white border rounded-2xl h-40 flex items-center justify-center text-gray-400">
            Table Preview
          </div>
        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white border rounded-2xl h-40 flex items-center justify-center text-gray-400">
            Charts Preview
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Financial Insights
            </h3>
            <p className="text-slate-500">
              Visualize your financial data with intuitive charts and analytics.
            </p>
          </div>
        </div>

        {/* Admin */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              User & System Control
            </h3>
            <p className="text-slate-500">
              Manage users, roles, and requests with full administrative control.
            </p>
          </div>

          <div className="bg-white border rounded-2xl h-40 flex items-center justify-center text-gray-400">
            Admin Panel Preview
          </div>
        </div>

      </section>

      {/* 🔥 CTA */}
      <section className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Start Managing Your Financial System Today
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </section>

    </div>
  );
}