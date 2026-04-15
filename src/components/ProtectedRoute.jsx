import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const roleHierarchy = {
  viewer: 1,
  analyst: 2,
  admin: 3,
};

export default function ProtectedRoute({ children, minRole = "viewer" }) {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.auth
  );

  // ✅ WAIT until auth is resolved
  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // 🔴 CRITICAL FIX: check BOTH together
  if (!isAuthenticated && !user) {
    return <Navigate to="/signin" replace />;
  }

  // ⛔ wait if user not yet hydrated
  if (!user) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // 🔒 role check
  const userLevel = roleHierarchy[user.role];
  const requiredLevel = roleHierarchy[minRole];

  if (userLevel < requiredLevel) {
    return (
      <div className="p-6 text-center text-red-600">
        You are not authorized to access this page
      </div>
    );
  }

  return children;
}