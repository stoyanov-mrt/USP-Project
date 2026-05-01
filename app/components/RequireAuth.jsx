import { Navigate } from "react-router-dom";
import { getStoredAuth } from "../src/api/api";

function RequireAuth({ children }) {
  const auth = getStoredAuth();
  if (!auth?.token) return <Navigate to="/login" replace />;
  return children;
}

export { RequireAuth };

