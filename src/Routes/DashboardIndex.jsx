import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/SharedCopmponents/Loading/Loading";

const DashboardIndex = () => {
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) return <Loading />;

    if (role === 'admin') return <Navigate to="/dashboard/manage-admin" replace />;
    if (role === 'rider') return <Navigate to="/dashboard/assigned-parcels" replace />;
    
    
    return <Navigate to="/" replace />;
};

export default DashboardIndex;