import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, ShieldAlert, X, UserCheck, Trash2, MessageSquareText, ChevronLeft, ChevronRight } from 'lucide-react'; 
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import AdminActionRidersReview from '../../ManageAllParcels/AdminActionRidersRivew';
import Loading from '../../../../SharedCopmponents/Loading/Loading';

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedRider, setSelectedRider] = useState(null);
    const [openReviewModal, setOpenReviewModal] = useState(null);
    
    // --- Pagination States ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch Riders with Pagination logic from backend
    const { data: riderData = { result: [], totalCount: 0 }, isLoading } = useQuery({
        queryKey: ['all-riders-manage', currentPage], // currentPage add kora hoyeche jate page change hole refetch hoy
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider-applications?page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        }
    });

    const riders = riderData.result || [];
    const totalCount = riderData.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

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
        }
    });

    // Delete Rider Mutation
    const deleteRiderMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/rider-applications/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['all-riders-manage']);
            Swal.fire("Removed!", "Rider has been removed.", "success");
        }
    });

    const handleToggle = (rider) => {
        const isActive = rider.status === 'active';
        Swal.fire({
            title: isActive ? "Apply Penalty?" : "Restore Access?",
            text: isActive ? "Rider will be restricted." : "Rider will be active again.",
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

    const handleDeleteRider = (id) => {
        Swal.fire({
            title: "Remove Rider?",
            text: "This will delete their application and reset role to 'user'.",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Yes, Remove!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRiderMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0D2A38]">Manage Riders</h2>
                <div className="badge bg-[#D4E96D] text-[#0D2A38] p-4 font-bold border-none">
                    Verified Riders: {totalCount}
                </div>
            </div>

            <div className="overflow-x-auto w-full grow">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-[#0D2A38]">
                            <th>Rider Info</th>
                            <th>Status</th>
                            <th className="text-center">Toggle Access</th>
                            <th className="text-center">Actions</th>
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
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => setSelectedRider(rider)} className="btn btn-square btn-sm bg-gray-100 text-gray-600 border-none hover:bg-gray-200"><Eye size={18} /></button>
                                            <button onClick={() => setOpenReviewModal(rider)} className="btn btn-square btn-sm bg-[#D4E96D]/20 text-[#0D2A38] border-none hover:bg-[#D4E96D]"><MessageSquareText size={18} /></button>
                                            <button onClick={() => handleDeleteRider(rider._id)} className="btn btn-square btn-sm bg-red-100 text-red-600 border-none hover:bg-red-200"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- Pagination Controls --- */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 mb-4">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-circle bg-white border-gray-200 disabled:opacity-30"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num + 1}
                            onClick={() => setCurrentPage(num + 1)}
                            className={`btn btn-sm btn-circle border-none ${
                                currentPage === num + 1 ? 'bg-[#0D2A38] text-white' : 'bg-gray-100 text-gray-700 hover:bg-[#D4E96D]'
                            }`}
                        >
                            {num + 1}
                        </button>
                    ))}

                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm btn-circle bg-white border-gray-200 disabled:opacity-30"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* Modals */}
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
                            <div><p className="text-xs text-gray-400 uppercase font-bold">Status</p><p className="text-lg font-bold text-blue-600 uppercase">{selectedRider.status}</p></div>
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setSelectedRider(null)} className="btn bg-[#0D2A38] text-white px-8 rounded-xl">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {openReviewModal && (
                <AdminActionRidersReview 
                    riderEmail={openReviewModal.email}
                    riderName={openReviewModal.name}
                    setOpenReviewModal={setOpenReviewModal}
                />
            )}
        </div>
    );
};

export default ActiveRiders;