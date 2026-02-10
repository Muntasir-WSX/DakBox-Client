import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading: isRoleLoading,
    isFetched,
  } = useQuery({
    queryKey: ["userRole", user?.email],

    enabled: !loading && !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/user-role?email=${user?.email}`);
      return res.data?.role;
    },

    staleTime: 1000 * 60 * 15,
  });

  const roleLoading = loading || isRoleLoading;

  return [role, roleLoading];
};

export default useRole;
