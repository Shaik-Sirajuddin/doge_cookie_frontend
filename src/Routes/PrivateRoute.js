import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, isRouterLoading } = useAuth();
  const navigate = useNavigate();

  console.log(isRouterLoading);

  if (isRouterLoading) {
    return <Loader />;
  }

  if (!isRouterLoading && !user) {
    navigate(`/login`);
  }
  if (!isRouterLoading && !user) {
    return null;
  }

  return <>{children}</>;
};
export default PrivateRoute;
