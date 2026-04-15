export default function InsightCard({ title, value, color }) {
  const styles = {
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

      {/* label */}
      <p className="text-xs text-slate-400 mb-3 uppercase tracking-wide">
        {title}
      </p>

      {/* value */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          ₹{value || 0}
        </h2>

        {/* colored badge */}
        <span className={`text-xs px-2 py-1 rounded-full ${styles[color]}`}>
          {color}
        </span>
      </div>
    </div>
  );
}