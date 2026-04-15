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

  if (loading) {
  return <div className="p-6 text-center">Loading...</div>;
}

  // 🔐 Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // 🔒 Role check
  const userLevel = roleHierarchy[user?.role] || 0;
  const requiredLevel = roleHierarchy[minRole];

  if (userLevel < requiredLevel) {
    console.log(userLevel , requiredLevel);
    return (
      <div className="p-6 text-center text-red-600">
        You are not authorized to access this page
      </div>
    );
  }

  return children;
}