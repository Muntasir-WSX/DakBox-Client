import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageAllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [activeRiders, setActiveRiders] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalParcels, setTotalParcels] = useState(0);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  const totalPages = Math.ceil(totalParcels / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  // ১. পার্সেল ফেচ করার জন্য useEffect
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await axiosSecure.get(`/admin/all-parcels?page=${currentPage}&limit=${itemsPerPage}`);
        setParcels(res.data.result);
        setTotalParcels(res.data.totalCount);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };
    fetchParcels();
  }, [currentPage, axiosSecure]);

  // ২. রাইডার ফেচ করার জন্য আলাদা useEffect (যাতে পেজ চেঞ্জ হলেও বারবার রাইডার ফেচ না হয়)
  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const res = await axiosSecure.get("/rider-applications");
        const approvedRiders = res.data?.filter(rider => rider.status === 'active') || [];
        setActiveRiders(approvedRiders);
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };
    fetchRiders();
  }, [axiosSecure]);

  const handleAssign = async (e) => {
    e.preventDefault();
    const form = e.target;
    const riderEmail = form.riderEmail.value;
    const deliveryDate = form.deliveryDate.value;

    const rider = activeRiders.find((r) => r.email === riderEmail);

    const updateData = {
      riderEmail,
      riderName: rider?.name,
      approximateDeliveryDate: deliveryDate,
    };

    try {
      const res = await axiosSecure.patch(
        `/admin/assign-rider/${selectedParcel._id}`,
        updateData,
      );
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Assigned!",
          text: `Parcel assigned to ${rider?.name}`,
          timer: 1500,
        });

        // Real-time UI Update
        setParcels((prev) =>
          prev.map((p) =>
            p._id === selectedParcel._id ? { ...p, status: "assigned" } : p,
          ),
        );
        document.getElementById("assign_modal").close();
      }
    } catch (err) {
      Swal.fire("Error", "Could not assign rider", "error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen flex flex-col">
      <h2 className="text-3xl font-black text-[#0D2A38] mb-8 border-b pb-4">
        Manage All <span className="text-[#A3B730]">Parcels</span>
      </h2>

      <div className="overflow-x-auto grow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr className="text-[#0D2A38] uppercase text-xs">
              <th>Tracing ID</th>
              <th>Sender</th>
              <th>Receiver District</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50 transition-colors">
                <td className="font-mono text-blue-600">{parcel.tracingId}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>{new Date(parcel.bookingDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge border-none py-3 px-4 ${
                      parcel.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : parcel.status === "pending"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    disabled={parcel.status !== "paid"}
                    onClick={() => {
                      setSelectedParcel(parcel);
                      document.getElementById("assign_modal").showModal();
                    }}
                    className={`btn btn-sm rounded-lg border-none ${
                      parcel.status === "paid"
                        ? "bg-[#D4E96D] text-[#0D2A38] hover:bg-[#0D2A38] hover:text-[#D4E96D]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn btn-sm btn-outline border-gray-300 hover:bg-[#0D2A38]"
        >
          Prev
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`btn btn-sm px-4 ${currentPage === number ? "bg-[#0D2A38] text-white border-[#0D2A38]" : "btn-ghost border border-gray-200"}`}
          >
            {number}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="btn btn-sm btn-outline border-gray-300 hover:bg-[#0D2A38]"
        >
          Next
        </button>
      </div>

      {/* Assignment Modal */}
      <dialog id="assign_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-2xl">
          <h3 className="font-bold text-xl text-[#0D2A38]">Assign Delivery Personnel</h3>
          <p className="py-2 text-sm text-gray-500 font-mono">
            Tracing ID: {selectedParcel?.tracingId}
          </p>

          <form onSubmit={handleAssign} className="mt-6 space-y-5">
            <div className="form-control w-full">
              <label className="label text-sm font-bold text-gray-700">Available Riders</label>
              <select name="riderEmail" className="select select-bordered w-full focus:outline-[#D4E96D]" defaultValue="" required>
                <option disabled value="">Select a rider from the list</option>
                {activeRiders.map((rider) => (
                  <option key={rider._id} value={rider.email}>
                    {rider.name} ({rider.district})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label text-sm font-bold text-gray-700">Estimated Delivery Date</label>
              <input type="date" name="deliveryDate" className="input input-bordered w-full focus:outline-[#D4E96D]" required />
            </div>

            <div className="modal-action flex items-center justify-between">
              <button type="button" onClick={() => document.getElementById("assign_modal").close()} className="btn btn-ghost hover:bg-gray-100 px-8">
                Cancel
              </button>
              <button type="submit" className="btn bg-[#0D2A38] text-[#D4E96D] hover:bg-[#A3B730] hover:text-[#0D2A38] px-10 border-none shadow-lg">
                Assign Now
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageAllParcels;