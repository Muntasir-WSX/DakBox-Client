import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyParcels = () => {
    const { user } = useAuth();
    const [parcels, setParcels] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/my-parcels/${user.email}`)
                .then(res => setParcels(res.data))
                .catch(err => console.error(err));
        }
    }, [user, axiosSecure]);

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            <h2 className="text-3xl font-black mb-8 text-[#0D2A38] tracking-tight uppercase">My Sent Parcels</h2>
            
            <div className="overflow-x-auto">
                <table className="table w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr className="bg-[#0D2A38] text-[#D4E96D] uppercase text-xs tracking-[0.2em]">
                            <th className="py-5 rounded-l-xl">#</th>
                            <th>Parcel Name</th>
                            <th>Tracing ID</th>
                            <th>Booking Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th className="rounded-r-xl">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((item, index) => (
                            <tr key={item._id} className="bg-gray-50/50 hover:bg-gray-100 transition-all group">
                                <th className="rounded-l-xl font-bold text-gray-400">{index + 1}</th>
                                <td className="font-bold text-[#0D2A38] py-4">{item.parcelName}</td>
                                <td className="font-semibold text-blue-600 tracking-tight">{item.tracingId}</td>
                                <td className="font-medium text-gray-500">
                                    {new Date(item.bookingDate).toLocaleDateString('en-GB')}
                                </td>
                                <td className="text-xl font-black text-[#0D2A38]">৳{item.totalCharge}</td>
                                <td>
                                    <span className="bg-[#D4E96D] text-[#0D2A38] font-black text-[10px] uppercase px-4 py-2 rounded-full tracking-widest">
                                        {item.status}
                                    </span>
                                </td>
                                <td className="rounded-r-xl">
                                    <button className="text-info font-black text-xs uppercase hover:underline underline-offset-4">
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {parcels.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No Parcels Found</p>
                </div>
            )}
        </div>
    );
};

export default MyParcels;