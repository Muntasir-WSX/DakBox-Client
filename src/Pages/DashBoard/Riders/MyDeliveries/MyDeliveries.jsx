import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth"; 
import Swal from "sweetalert2";

const MyDeliveries = () => {
  const { user } = useAuth();
  const [myParcels, setMyParcels] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/rider/my-deliveries/${user.email}`)
        .then(res => setMyParcels(res.data))
        .catch(err => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/parcels/update-status/${id}`, 
        
       { status: newStatus,

        message: `Rider updated status to ${newStatus}`

       });

      if (res.data.success) {
    
        setMyParcels(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
        Swal.fire("Updated!", `Status changed to ${newStatus}`, "success");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#0D2A38]">My <span className="text-[#A3B730]">Deliveries</span></h2>
      
      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="table w-full bg-white">
          <thead className="bg-gray-100 text-[#0D2A38]">
            <tr>
              <th>Receiver Name</th>
              <th>Pickup Address</th>
              <th>Delivery Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myParcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50">
                <td className="font-bold">{parcel.receiverName}</td>
                
                
                <td className="text-xs max-w-[150px]">{parcel.senderAddress}</td>
                <td className="text-xs max-w-[150px]">{parcel.receiverAddress}</td>
                
                <td>
                  <span className={`badge border-none py-3 px-3 capitalize ${
                    parcel.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {parcel.status}
                  </span>
                </td>

                <td>
                
                  <select 
                    className="select select-bordered select-sm w-full max-w-xs focus:outline-[#D4E96D]"
                    defaultValue={parcel.status}
                    onChange={(e) => handleStatusUpdate(parcel._id, e.target.value)}
                    disabled={parcel.status === 'delivered'}
                  >
                    <option value="assigned">Assigned</option>
                    <option value="picked-up">Picked Up</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveries;