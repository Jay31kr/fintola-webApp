import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  // ✅ wait
  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // ✅ redirect only when stable
  if (isAuthenticated) {
    return <Navigate to="/transactions" replace />;
  }

  return children;
}