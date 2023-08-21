import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AdminRoute = ({ children }) => {
  const { user, isRouterLoading } = useAuth();
  const navigate = useNavigate();


  if (isRouterLoading) {
    return <Loader />;
  }

  if (!isRouterLoading && !user?.email === "admin@gmail.com") {
    navigate(`/login`);
  }
  if (!isRouterLoading && !user?.email === "admin@gmail.com") {
    return null;
  }

  return user?.email ==="admin@gmail.com" && <>{children}</>;
};
export default AdminRoute;
