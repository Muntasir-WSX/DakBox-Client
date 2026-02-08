import React, { useState } from 'react'; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Eye, Trash2, PackageCheck, CreditCard, Box, Star } from "lucide-react"; 
import Loading from "../../SharedCopmponents/Loading/Loading";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import UserReview from './UserRivew';


const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(null); 

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-parcels/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/parcels/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["parcels"]);
      Swal.fire("Cancelled!", "Your parcel has been removed.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D2A38",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-8 font-urbanist min-h-screen bg-gray-50">
      <Helmet>
        <title>DakBox | My Parcels</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header section stays same */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-[#0D2A38] uppercase tracking-tight">
              My Sent <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">Parcels</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
            <PackageCheck size={20} className="text-[#0D2A38]" />
            <span className="text-xl font-black text-[#0D2A38]">{parcels.length}</span>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-4xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0D2A38] text-[#D9F26B] uppercase text-[10px] tracking-[0.2em] font-black">
                  <th className="p-5 text-center">#</th>
                  <th className="p-5">Parcel Info</th>
                  <th className="p-5 text-center">Type & Weight</th>
                  <th className="p-5 text-center">Tracing ID</th>
                  <th className="p-5 text-center">Booking Date</th>
                  <th className="p-5 text-center">Price</th>
                  <th className="p-5 text-center">Status</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {parcels.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50/80 transition-all group">
                    <td className="p-5 text-center font-bold text-gray-400">{index + 1}</td>
                    <td className="p-5">
                      <span className="font-black text-[#0D2A38] block text-base">{item.parcelName}</span>
                      <span className="text-[10px] text-gray-400 font-bold tracking-wider">to {item.receiverName}</span>
                    </td>
                    <td className="p-5 text-center">
                       <span className="text-[9px] font-black uppercase px-2 py-1 bg-gray-100 rounded-md">{item.parcelType}</span>
                       <div className="text-xs font-black text-gray-500 mt-1">{item.weight} kg</div>
                    </td>
                    <td className="p-5 text-center">
                      <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{item.tracingId}</span>
                    </td>
                    <td className="p-5 text-center text-sm font-bold text-gray-500">
                        {new Date(item.bookingDate).toLocaleDateString('en-GB')}
                    </td>
                    <td className="p-5 text-center text-xl font-black text-[#0D2A38]">৳{item.totalCharge}</td>
                    <td className="p-5 text-center">
                      <span className={`font-black text-[9px] uppercase px-4 py-2 rounded-full ring-1 ${item.status === 'pending' ? 'bg-orange-50 text-orange-600 ring-orange-200' : 'bg-green-50 text-green-700 ring-green-200'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">

                        {item.status === "delivered" && (
                          <button
                            onClick={() => setOpenModal(item)}
                            className="p-2 bg-[#D9F26B] text-[#0D2A38] rounded-xl transition-all border border-[#D9F26B] shadow-sm hover:bg-[#0D2A38] hover:text-[#D9F26B]"
                            title="Review Rider"
                          >
                            <Star size={16} fill="currentColor" />
                          </button>
                        )}

                        <Link to={`/dashboard/parcel-details/${item._id}`} className="p-2 hover:bg-[#0D2A38] hover:text-[#D9F26B] text-[#0D2A38] rounded-xl transition-all border border-gray-200 shadow-sm">
                          <Eye size={16} />
                        </Link>

                        {item.status === "pending" && (
                          <>
                            <Link to={`/dashboard/payment/${item._id}`} className="p-2 text-green-600 rounded-xl border border-gray-200 hover:bg-[#D9F26B] transition-all">
                              <CreditCard size={16} />
                            </Link>
                            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 rounded-xl border border-gray-200 hover:bg-red-600 hover:text-white transition-all">
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openModal && (
        <UserReview parcel={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default MyParcels;