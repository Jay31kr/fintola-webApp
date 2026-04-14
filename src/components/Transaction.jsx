export default function Transaction({
  tx,
  editingId,
  editData,
  onEdit,
  onSave,
  onDelete,
  onChange,
}) {
  const isEditing = editingId === tx._id;

  const categories = [
    "marketing",
    "HRexpense",
    "Utilities",
    "payroll",
    "ITservice",
    "productSale",
    "subscription",
    "others",
  ];

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition duration-150">

      {/* TITLE */}
      <td className="px-4 py-3 text-sm text-slate-900 font-medium">
        {isEditing ? (
          <input
            value={editData.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full border border-gray-300 px-2 py-1 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          tx.title
        )}
      </td>

      {/* NOTE */}
      <td className="px-4 py-3 text-sm text-slate-600 max-w-45">
        {isEditing ? (
          <input
            value={editData.note || ""}
            onChange={(e) => onChange("note", e.target.value)}
            className="w-full border border-gray-300 px-2 py-1 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <span className="truncate block">{tx.note}</span>
        )}
      </td>

      {/* CATEGORY */}
      <td className="px-4 py-3 text-sm text-slate-700">
        {isEditing ? (
          <select
            value={editData.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full border border-gray-300 px-2 py-1 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        ) : (
          tx.category
        )}
      </td>

      {/* TYPE */}
      <td className="px-4 py-3 text-sm">
        {isEditing ? (
          <select
            value={editData.type}
            onChange={(e) => onChange("type", e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        ) : (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              tx.type === "income"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {tx.type}
          </span>
        )}
      </td>

      {/* STATUS */}
      <td className="px-4 py-3 text-sm">
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            tx.status === "completed"
              ? "bg-green-100 text-green-700"
              : tx.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {tx.status}
        </span>
      </td>

      {/* AMOUNT */}
      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
        {isEditing ? (
          <input
            type="number"
            value={editData.amount}
            onChange={(e) => onChange("amount", e.target.value)}
            className="w-full border border-gray-300 px-2 py-1 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          `₹${tx.amount}`
        )}
      </td>

      {/* DATE */}
      <td className="px-4 py-3 text-sm text-slate-600">
        {new Date(tx.date).toLocaleDateString()}
      </td>

      {/* ACTIONS */}
      <td className="px-4 py-3 text-sm flex gap-3">
        {isEditing ? (
          <>
            <button
              onClick={onSave}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Save
            </button>

            <button
              onClick={() => onEdit(null)}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => onEdit(tx)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(tx._id)}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}