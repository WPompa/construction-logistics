import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/Login" />;
  }
  return children;
};

export default ProtectedRoute;
