import React, { useEffect, useState } from "react";
import { Landmark, Clock, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../../Hooks/useAuth";

const MyCashout = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [history, setHistory] = useState([]);
    const [balance, setBalance] = useState(0); 

    useEffect(() => {
       
        const fetchRiderData = async () => {
            try {
              
                const [deliveriesRes, cashoutRes] = await Promise.all([
                    axiosSecure.get(`/rider/my-deliveries/${user?.email}`),
                    axiosSecure.get(`/my-cashouts/${user?.email}`)
                ]);   
                const totalEarned = deliveriesRes.data.reduce((sum, item) => sum + (parseFloat(item.riderCommission) || 0), 0);
                const totalWithdrawn = cashoutRes.data
                    .filter(c => c.status === 'success')
                    .reduce((sum, item) => sum + parseFloat(item.amount), 0);

                setBalance(totalEarned - totalWithdrawn);
                setHistory(cashoutRes.data);
            } catch (error) {
                console.error("Error fetching rider data:", error);
            }
        };

        if (user?.email) fetchRiderData();
    }, [user?.email, axiosSecure]);

    const handleRequest = async (e) => {
        e.preventDefault();
        if (balance < 500) {
            return toast.error(" You cant withdraw your cash if you don't have minimum 500 tk");
        }
        
        const data = {
            riderEmail: user?.email,
            riderName: user?.displayName,
            amount: balance,
            method: e.target.method.value,
            number: e.target.number.value,
            requestDate: new Date(),
            status: "pending"
        };

        try {
            await axiosSecure.post("/cashout-requests", data);
            toast.success("Withdrawal request sent to Admin successfully!");
            e.target.reset();
            setHistory([data, ...history]);
        } catch (error) {
            toast.error("Failed to send request. Please try again.");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-black text-[#0D2A38] uppercase tracking-tight">
                            My <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">Wallet</span>
            </h2>

            <div className="grid mt-5 grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Withdrawal Form */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Landmark size={20} className="text-[#A3B730]" /> Withdraw Money
                    </h3>
                    <form onSubmit={handleRequest} className="space-y-4">
                        <div className="p-4 bg-[#0D2A38] rounded-xl text-center shadow-lg">
                            <p className="text-[10px] text-[#A3B730] uppercase font-bold tracking-widest">Available Balance</p>
                            <h2 className="text-3xl font-black text-white">৳{balance.toFixed(2)}</h2>
                        </div>
                        
                        <div className="form-control">
                            <label className="label text-xs font-bold text-gray-500 uppercase">Payment Method</label>
                            <select name="method" className="select select-bordered w-full bg-gray-50 focus:outline-[#A3B730]" required>
                                <option value="bkash">bKash</option>
                                <option value="nagad">Nagad</option>
                                <option value="rocket">Rocket</option>
                            </select>
                        </div>
                        
                        <div className="form-control">
                            <label className="label text-xs font-bold text-gray-500 uppercase">Account Number</label>
                            <input name="number" type="text" placeholder="017XXXXXXXX" className="input input-bordered w-full bg-gray-50 focus:outline-[#A3B730]" required />
                        </div>
                        
                        <button 
                            disabled={balance < 500}
                            className={`btn w-full border-none font-bold ${balance < 500 ? 'bg-gray-200 text-gray-400' : 'bg-[#D4E96D] text-[#0D2A38] hover:bg-[#A3B730]'}`}
                        >
                            {balance < 500 ? 'Insufficient Balance' : 'Send Withdrawal Request'}
                        </button>

                        {balance < 500 && (
                            <div className="flex items-center gap-2 justify-center p-2 bg-red-50 rounded-lg border border-red-100">
                                <p className="text-[10px] text-red-500 font-bold uppercase">
                                    Need ৳{(500 - balance).toFixed(2)} more to unlock
                                </p>
                            </div>
                        )}
                    </form>
                </div>

                {/* History Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 bg-gray-50 font-bold border-b border-gray-100 flex justify-between items-center">
                        <span>Withdrawal History</span>
                        <span className="badge badge-outline text-[10px]">{history.length} Records</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-gray-400 text-[10px] uppercase tracking-widest bg-gray-50/50">
                                    <th className="py-4">Date</th>
                                    <th>Method</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length > 0 ? history.map((h, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="text-gray-500 text-sm">
                                            {new Date(h.requestDate).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#A3B730]"></div>
                                                <span className="capitalize font-bold text-[#0D2A38]">{h.method}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400">{h.number}</p>
                                        </td>
                                        <td className="font-black text-[#0D2A38]">৳{parseFloat(h.amount).toFixed(2)}</td>
                                        <td>
                                            <span className={`badge border-none py-3 px-4 text-[10px] font-bold uppercase tracking-tighter ${
                                                h.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                                {h.status === 'pending' ? <Clock size={12} className="mr-1" /> : <CheckCircle2 size={12} className="mr-1" />}
                                                {h.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-20">
                                            <div className="flex flex-col items-center opacity-20">
                                                <Landmark size={48} />
                                                <p className="font-bold uppercase mt-2">No history yet</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCashout;