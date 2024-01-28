import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectRoute;
