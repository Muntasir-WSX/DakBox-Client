import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, ShieldAlert, BadgeCheck, X, UserCheck } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedRider, setSelectedRider] = useState(null);

    // Fetch Active & Blocked Riders (Exclude Pending)
    const { data: riders = [], isLoading } = useQuery({
        queryKey: ['all-riders-manage'],
        queryFn: async () => {
            const res = await axiosSecure.get('/rider-applications');
            return res.data?.filter(rider => rider.status !== 'pending') || [];
        }
    });

    // Toggle Status Mutation
    const toggleMutation = useMutation({
        mutationFn: async (rider) => {
            const res = await axiosSecure.patch(`/rider-applications/toggle-status/${rider._id}`, {
                email: rider.email,
                currentStatus: rider.status
            });
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['all-riders-manage']);
            Swal.fire("Success!", data.message || "Status updated successfully", "success");
        },
        onError: () => {
            Swal.fire("Error", "Failed to update status", "error");
        }
    });

    const handleToggle = (rider) => {
        const isActive = rider.status === 'active';
        Swal.fire({
            title: isActive ? "Apply Penalty?" : "Restore Access?",
            text: isActive ? "Rider will be restricted from the platform." : "Rider will be active again.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: isActive ? "#ef4444" : "#D4E96D",
            confirmButtonText: isActive ? "Yes, Restrict" : "Yes, Activate"
        }).then((result) => {
            if (result.isConfirmed) {
                toggleMutation.mutate(rider);
            }
        });
    };

    if (isLoading) return <div className="flex justify-center p-20"><span className="loading loading-dots loading-lg text-[#D4E96D]"></span></div>;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0D2A38]">Manage Riders</h2>
                <div className="badge bg-[#D4E96D] text-[#0D2A38] p-4 font-bold border-none">
                    Verified Riders: {riders.length}
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-[#0D2A38]">
                            <th>Rider Info</th>
                            <th>Status</th>
                            <th className="text-center">Toggle Access</th>
                            <th className="text-center">Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-10 text-gray-400">No active riders found.</td></tr>
                        ) : (
                            riders.map((rider) => (
                                <tr key={rider._id} className="hover:bg-gray-50 border-b">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={rider.userPhoto || 'https://via.placeholder.com/150'} alt="Rider" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{rider.name}</div>
                                                <div className="text-sm opacity-50">{rider.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`badge badge-sm font-bold p-3 border-none ${
                                            rider.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {rider.status === 'active' ? 'ACTIVE' : 'RESTRICTED'}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleToggle(rider)}
                                            disabled={toggleMutation.isLoading}
                                            className={`btn btn-sm rounded-lg border-none px-4 flex items-center gap-2 mx-auto ${
                                                rider.status === 'active' 
                                                ? 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white' 
                                                : 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white'
                                            }`}
                                        >
                                            {rider.status === 'active' ? <><ShieldAlert size={16}/> Penalty</> : <><UserCheck size={16}/> Activate</>}
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={() => setSelectedRider(rider)} className="btn btn-square btn-sm bg-gray-100 text-gray-600 border-none hover:bg-gray-200">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedRider && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl bg-white rounded-3xl border-t-8 border-[#0D2A38]">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="font-bold text-2xl text-[#0D2A38]">Rider Profile</h3>
                            <button onClick={() => setSelectedRider(null)} className="btn btn-sm btn-circle btn-ghost"><X size={24} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mt-6">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">NID</p><p className="text-lg font-semibold">{selectedRider.nid}</p></div>
                            <div><p className="text-xs text-gray-400 uppercase font-bold">License</p><p className="text-lg font-semibold">{selectedRider.license}</p></div>
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Bike Model</p><p className="text-lg font-semibold">{selectedRider.bikeModel}</p></div>
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Current Status</p><p className="text-lg font-bold text-blue-600 uppercase">{selectedRider.status}</p></div>
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setSelectedRider(null)} className="btn bg-[#0D2A38] text-white px-8 rounded-xl">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveRiders;