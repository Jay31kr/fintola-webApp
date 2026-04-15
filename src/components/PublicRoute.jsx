import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/transactions" replace />;
  }

  return children;
}