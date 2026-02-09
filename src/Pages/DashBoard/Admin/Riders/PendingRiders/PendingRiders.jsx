import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, CheckCircle, Trash2, X } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import Loading from '../../../../SharedCopmponents/Loading/Loading';

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedRider, setSelectedRider] = useState(null);

    // Fetch Pending Riders
    const { data: pendingRiders = [], isLoading } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/rider-applications');
            return res.data?.filter(rider => rider.status === 'pending') || [];
        }
    });

    // Mutation for Approving Rider
    const approveMutation = useMutation({
        mutationFn: async ({ id, email }) => {
            const res = await axiosSecure.patch(`/rider-applications/approve/${id}`, { email });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pending-riders']);
            queryClient.invalidateQueries(['all-riders-manage']); 
            Swal.fire("Approved!", "Rider is now active and role updated.", "success");
        },
        onError: (error) => {
            Swal.fire("Error!", error.response?.data?.message || "Approval failed", "error");
        }
    });

    // Mutation for Deleting/Rejecting Rider
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/rider-applications/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pending-riders']);
            Swal.fire("Deleted!", "Application has been removed.", "success");
        }
    });

    
    const handleApprove = (rider) => {
        Swal.fire({
            title: "Approve Rider?",
            text: `Confirming ${rider.email} as an active rider.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#D4E96D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then((result) => {
            if (result.isConfirmed) {
                // এখানে সঠিক ভাবে id এবং email পাঠানো হচ্ছে
                approveMutation.mutate({ id: rider._id, email: rider.email });
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This application will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) deleteMutation.mutate(id);
        });
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm min-h-100">
            <h2 className="text-2xl font-bold mb-6 text-[#0D2A38]">Pending Rider Applications</h2>
            
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-[#0D2A38]">
                            <th>Info</th>
                            <th>Region/District</th>
                            <th>Bike Details</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRiders.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-400">No pending applications found.</td>
                            </tr>
                        ) : (
                            pendingRiders.map((rider) => (
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
                                        <span className="badge badge-ghost font-medium">{rider.region}</span>
                                        <br />
                                        <span className="text-xs">{rider.district}</span>
                                    </td>
                                    <td>{rider.bikeModel}</td>
                                    <td className="flex justify-center gap-2">
                                        <button onClick={() => setSelectedRider(rider)} className="btn btn-square btn-sm bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                            <Eye size={18} />
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleApprove(rider)} 
                                            className="btn btn-square btn-sm bg-[#D4E96D] text-[#0D2A38] border-none hover:bg-[#b8cc56]"
                                        >
                                            <CheckCircle size={18} />
                                        </button>

                                        <button onClick={() => handleDelete(rider._id)} className="btn btn-square btn-sm bg-red-100 text-red-600 border-none hover:bg-red-200">
                                            <Trash2 size={18} />
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
                    <div className="modal-box max-w-2xl bg-white rounded-3xl border-t-8 border-[#D4E96D]">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="font-bold text-2xl text-[#0D2A38]">Rider Details</h3>
                            <button onClick={() => setSelectedRider(null)} className="btn btn-sm btn-circle btn-ghost"><X size={24} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mt-6">
                            <div><p className="text-xs text-gray-400 uppercase font-bold">NID Number</p><p className="text-lg font-semibold">{selectedRider.nid}</p></div>
                            <div><p className="text-xs text-gray-400 uppercase font-bold">License No</p><p className="text-lg font-semibold">{selectedRider.license}</p></div>
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Phone</p><p className="text-lg font-semibold">{selectedRider.phone}</p></div>
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Bike Reg</p><p className="text-lg font-semibold text-blue-600">{selectedRider.bikeReg}</p></div>
                        </div>
                        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-2">About Experience</p>
                            <p className="text-sm italic text-gray-700">"{selectedRider.about || 'No info provided'}"</p>
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setSelectedRider(null)} className="btn bg-[#0D2A38] text-white px-6 rounded-xl">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;