import { Navigate } from "react-router";


const PrivateRoute = ({ children }) => {
  
  const token = localStorage.getItem("dashboard");


  if (!token) {
    return <Navigate to="/"  />;
  }

  return children;
};

export default PrivateRoute;