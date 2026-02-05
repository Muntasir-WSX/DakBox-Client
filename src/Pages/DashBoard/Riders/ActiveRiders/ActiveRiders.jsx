import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, UserX, X, BadgeCheck } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';


const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedRider, setSelectedRider] = useState(null);

    // Fetch Active Riders
    const { data: activeRiders = [], isLoading } = useQuery({
        queryKey: ['active-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/rider-applications');
            // Filtering for active status
            return res.data.filter(rider => rider.status === 'active');
        }
    });

    // Mutation for Disapproving Rider (Moving back to Pending)
    const disapproveMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/rider-applications/disapprove/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['active-riders']);
            queryClient.invalidateQueries(['pending-riders']);
            Swal.fire("Disapproved!", "Rider has been moved back to pending list.", "success");
        }
    });

    const handleDisapprove = (id) => {
        Swal.fire({
            title: "Disapprove Rider?",
            text: "This will remove their active status and move them to pending.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#0D2A38",
            confirmButtonText: "Yes, Disapprove!"
        }).then((result) => {
            if (result.isConfirmed) disapproveMutation.mutate(id);
        });
    };

    if (isLoading) return <span className="loading loading-dots loading-lg"></span>;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0D2A38]">Active Riders</h2>
                <div className="badge bg-[#D4E96D] text-[#0D2A38] p-4 font-bold border-none">
                    Total Active: {activeRiders.length}
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-[#0D2A38]">
                            <th>Rider Info</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th className="text-center">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeRiders.map((rider) => (
                            <tr key={rider._id} className="hover:bg-gray-50">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={rider.userPhoto} alt="Rider" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold flex items-center gap-1">
                                                {rider.name} <BadgeCheck size={14} className="text-blue-500" />
                                            </div>
                                            <div className="text-sm opacity-50">{rider.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="font-medium">{rider.district}</span>
                                    <p className="text-xs text-gray-400">{rider.region}</p>
                                </td>
                                <td>
                                    <div className="badge badge-success badge-outline gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        Active
                                    </div>
                                </td>
                                <td className="flex justify-center gap-2">
                                    {/* View Details */}
                                    <button 
                                        onClick={() => setSelectedRider(rider)}
                                        className="btn btn-square btn-sm bg-gray-100 text-gray-600 border-none hover:bg-gray-200"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    {/* Disapprove (Job khawa) */}
                                    <button 
                                        onClick={() => handleDisapprove(rider._id)}
                                        className="btn btn-square btn-sm bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white transition-colors"
                                        title="Disapprove Rider"
                                    >
                                        <UserX size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rider Details Modal */}
            {selectedRider && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl bg-white rounded-3xl">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="font-bold text-2xl text-[#0D2A38]">Active Profile</h3>
                            <button onClick={() => setSelectedRider(null)} className="btn btn-sm btn-circle btn-ghost">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                            <div className="bg-blue-50 p-3 rounded-2xl">
                                <p className="text-[10px] text-blue-400 uppercase font-black">License</p>
                                <p className="text-md font-bold text-blue-900">{selectedRider.license}</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-2xl">
                                <p className="text-[10px] text-purple-400 uppercase font-black">Phone</p>
                                <p className="text-md font-bold text-purple-900">{selectedRider.phone}</p>
                            </div>
                            <div className="bg-orange-50 p-3 rounded-2xl">
                                <p className="text-[10px] text-orange-400 uppercase font-black">Bike Model</p>
                                <p className="text-md font-bold text-orange-900">{selectedRider.bikeModel}</p>
                            </div>
                        </div>

                        <div className="mt-6 border p-4 rounded-2xl">
                             <h4 className="font-bold text-[#0D2A38] mb-2">Registration Info</h4>
                             <p className="text-sm"><span className="font-semibold">NID:</span> {selectedRider.nid}</p>
                             <p className="text-sm"><span className="font-semibold">Bike Reg:</span> {selectedRider.bikeReg}</p>
                        </div>

                        <div className="modal-action">
                            <button onClick={() => setSelectedRider(null)} className="btn bg-[#0D2A38] text-white rounded-xl border-none">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveRiders;