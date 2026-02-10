import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { CheckCircle, Clock, Banknote } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const CashoutRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["admin-cashouts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/cashout-requests");
      return res.data;
    },
  });
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/admin/approve-cashout/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        Swal.fire(
          "Approved!",
          "Payment has been processed and rider's history updated.",
          "success",
        );
        queryClient.invalidateQueries(["admin-cashouts"]);
      }
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to approve",
        "error",
      );
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark the payment as successful!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading Requests...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl flex items-center gap-3 font-black text-[#0D2A38] uppercase tracking-tight">
        {" "}
        <Banknote className="text-green-600 shrink-0 " />        Rider CashOut{" "}
        <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">
          request
        </span>
               {" "}
      </h2>

      <div className="overflow-x-auto mt-5 bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Rider Email</th>
              <th>Amount (BDT)</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{req.riderEmail}</td>
                  <td className="text-green-600 font-bold">{req.amount} ৳</td>
                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td>
                    {req.status === "pending" ? (
                      <span className="badge badge-warning gap-1 p-3">
                        <Clock size={14} /> Pending
                      </span>
                    ) : (
                      <span className="badge badge-success gap-1 p-3 text-white">
                        <CheckCircle size={14} /> Success
                      </span>
                    )}
                  </td>
                  <td>
                    {req.status === "pending" && (
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="btn btn-sm btn-success text-white"
                        disabled={approveMutation.isLoading}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashoutRequests;
