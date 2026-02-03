import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Eye, Trash2, PackageCheck, CreditCard } from 'lucide-react';
import Loading from '../../SharedCopmponents/Loading/Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient(); 

    // 1. Query hook
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-parcels/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // 2. Mutation hook for deleting a parcel
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/parcels/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['parcels']);
            Swal.fire("Cancelled!", "Your parcel has been removed.", "success");
        },
        onError: (error) => {
            Swal.fire("Error", error.response?.data?.message || "Failed to cancel", "error");
        }
    });

    // handler for delete action
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0D2A38",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    // ৩. conditional loading state
    if (isLoading) return <Loading />;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 font-urbanist">
            <div className="flex justify-between items-center mb-8">
                 <Helmet>
                        <title>DakBox | My Parcels</title>
                      </Helmet>
                <div>
                    <h2 className="text-3xl font-black text-[#0D2A38] tracking-tight uppercase">My Sent Parcels</h2>
                    <p className="text-sm text-gray-400 font-medium">Manage and track your delivery requests</p>
                </div>
                <div className="flex items-center gap-2 bg-[#0D2A38] text-[#D4E96D] px-6 py-2 rounded-2xl shadow-lg">
                    <PackageCheck size={20} />
                    <span className="text-lg font-black">{parcels.length}</span>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="table w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr className="bg-[#0D2A38] text-[#D4E96D] uppercase text-[10px] tracking-[0.2em]">
                            <th className="py-5 rounded-l-2xl text-center">#</th>
                            <th>Parcel Info</th>
                            <th>Type & Weight</th>
                            <th>Tracing ID</th>
                            <th>Booking Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th className="rounded-r-2xl text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((item, index) => (
                            <tr key={item._id} className="bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-gray-100">
                                <th className="rounded-l-2xl font-bold text-gray-400 text-center">{index + 1}</th>
                                
                                <td className="py-4">
                                    <span className="font-bold text-[#0D2A38] block text-base leading-tight">{item.parcelName}</span>
                                    <span className="text-xs text-gray-400 font-medium lowercase">to {item.receiverName}</span>
                                </td>

                                <td>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md mb-1 inline-block ${
                                        item.parcelType === 'Document' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                    }`}>
                                        {item.parcelType}
                                    </span>
                                    <div className="text-sm font-black text-gray-600 italic leading-none">{item.weight} kg</div>
                                </td>

                                <td className="font-mono text-xs font-bold text-blue-600 bg-blue-50/50 p-2 rounded-lg">
                                    {item.tracingId}
                                </td>

                                <td className="font-bold text-gray-500 text-sm uppercase tracking-tighter">
                                    {new Date(item.bookingDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </td>

                                <td className="text-xl font-black text-[#0D2A38]">৳{item.totalCharge}</td>

                                <td>
                                    <span className={`font-black text-[9px] uppercase px-4 py-2 rounded-full tracking-widest ring-1 ring-inset ${
                                        item.status === 'pending' 
                                        ? 'bg-orange-50 text-orange-600 ring-orange-200' 
                                        : 'bg-[#D4E96D]/20 text-[#0D2A38] ring-[#D4E96D]'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>

                                <td className="rounded-r-2xl">
                                    <div className="flex justify-center gap-2">
                                        <Link to={`/dashboard/parcel-details/${item._id}`} className="p-2 hover:bg-[#0D2A38] hover:text-white text-[#0D2A38] rounded-xl transition-all border border-gray-200 shadow-sm" title="View Details">
                                            <Eye size={16} />
                                        </Link>
                                        <button className="p-2 hover:bg-green-600 hover:text-white text-green-600 rounded-xl transition-all border border-gray-200 shadow-sm" title="Pay Now">
                                            <CreditCard size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item._id)} 
                                            disabled={item.status !== 'pending'} 
                                            className="p-2 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-all border border-gray-200 shadow-sm disabled:cursor-not-allowed disabled:opacity-30" 
                                            title="Cancel"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {parcels.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl mt-4 border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-sm">Empty Parcel Box</p>
                </div>
            )}
        </div>
    );
};

export default MyParcels;