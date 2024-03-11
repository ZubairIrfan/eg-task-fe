import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ userData }) => {
  return userData ? <Outlet userData={userData} /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
