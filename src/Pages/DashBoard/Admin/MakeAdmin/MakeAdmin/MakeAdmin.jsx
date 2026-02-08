import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';
import Loading from '../../../../SharedCopmponents/Loading/Loading';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../../Hooks/useAuth'; 

const MakeAdmin = () => {
    const [users, setUsers] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth(); 

    const fetchUsers = async (searchTerm = "") => {
   if (authLoading || !user?.email) return;

    setLoading(true);
    try {
       
        const url = searchTerm ? `/users/admin-list?email=${searchTerm}` : `/users/admin-list`;
        const res = await axiosSecure.get(url);
        setUsers(res.data);
    } catch (error) {
        console.error("Fetch Error:", error);
    } finally {
        setLoading(false);
    }
};
 useEffect(() => {
    if (!authLoading && user?.email) {
        fetchUsers();
    }
}, [user?.email, authLoading]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers(searchId);
    };

    const handleToggleAdmin = async (userToUpdate) => {
        const newRole = userToUpdate.role === 'admin' ? 'user' : 'admin';

        Swal.fire({
            title: "Confirm Role Change?",
            text: `${userToUpdate.name} will be assigned as ${newRole}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0D2A38",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Yes, Update",
            background: "#fff",
            color: "#0D2A38"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/make-admin/${userToUpdate._id}`, { role: newRole });
                    if (res.data.modifiedCount > 0) {
                        fetchUsers(searchId); 
                        Swal.fire("Success!", `Role updated to ${newRole}`, "success");
                    }
                } catch (error) {
                    Swal.fire("Error", error.response?.data?.message || "Action failed", "error");
                }
            }
        });
    };

    if (authLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-urbanist">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-[#0D2A38] uppercase tracking-tight">
                            User <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">Management</span>
                        </h2>
                    </div>

                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search by email..."
                            className="w-full px-5 py-3 rounded-2xl bg-white border-2 border-gray-100 focus:border-[#D9F26B] outline-none shadow-sm transition-all font-bold pr-12"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#0D2A38] text-[#D9F26B] p-2 rounded-xl">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-[30px] shadow-xl border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="py-20 text-center"><Loading /></div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#0D2A38] text-white">
                                        <th className="p-5 font-black uppercase text-xs">User Name</th>
                                        <th className="p-5 font-black uppercase text-xs">Email</th>
                                        <th className="p-5 font-black uppercase text-xs">Role</th>
                                        <th className="p-5 font-black uppercase text-xs text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((userItem) => (
                                            <tr key={userItem._id} className="border-b hover:bg-gray-50">
                                                <td className="p-5 font-bold text-[#0D2A38]">{userItem.name}</td>
                                                <td className="p-5 text-gray-500 font-medium">{userItem.email}</td>
                                                <td className="p-5">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                                        userItem.role === 'admin' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                        {userItem.role || 'user'}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-center">
                                                    <button
                                                        onClick={() => handleToggleAdmin(userItem)}
                                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                                                            userItem.role === 'admin'
                                                            ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'
                                                            : 'bg-[#D9F26B] text-[#0D2A38] hover:bg-[#0D2A38] hover:text-[#D9F26B]'
                                                        }`}
                                                    >
                                                        {userItem.role === 'admin' ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
                                                        {userItem.role === 'admin' ? "Demote" : "Make Admin"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-10 text-center font-bold text-gray-400">No users found or Access Denied.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;