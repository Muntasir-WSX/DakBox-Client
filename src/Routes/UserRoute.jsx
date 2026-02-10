import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/SharedCopmponents/Loading/Loading";
const UserRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();
   if (loading || isRoleLoading) {
        return <Loading />;
    }
    if (user && role === 'user') {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default UserRoute;