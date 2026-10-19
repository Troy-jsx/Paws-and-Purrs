import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireRole({ role, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/home"} replace />;
  }
  return children;
}