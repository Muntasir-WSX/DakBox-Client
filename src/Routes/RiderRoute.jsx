import { Navigate, useLocation } from "react-router";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/SharedCopmponents/Loading/Loading";

const RiderRoute = ({ children }) => {
    const [role, isRoleLoading] = useRole();
    const location = useLocation();
   if (isRoleLoading) {
        return <Loading />;
    }
    if (role === 'rider') {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default RiderRoute;