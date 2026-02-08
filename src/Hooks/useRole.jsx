import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'userRole'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-role?email=${user?.email}`);
            return res.data?.role;
        }
    });

    return [role, isRoleLoading];
};

export default useRole;