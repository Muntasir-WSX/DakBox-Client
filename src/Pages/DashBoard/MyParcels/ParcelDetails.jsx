import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ArrowLeft, MapPin, User, Box } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ParcelDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="p-10 text-center font-black">FETCHING DETAILS...</div>
    );

  return (
    <div
      className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      style={{ fontFamily: "'Urbanist', sans-serif" }}
    >
      <Helmet>
        <title>DakBox | Parcel Details</title>
      </Helmet>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-500 font-bold hover:text-[#0D2A38]"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Sender & Receiver */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="flex items-center gap-2 font-black text-[#0D2A38] mb-4 uppercase text-sm">
              <User size={18} /> Sender Info
            </h3>
            <p className="font-bold">{parcel.senderName}</p>
            <p className="text-sm text-gray-500">{parcel.userEmail}</p>
            <p className="text-sm mt-2">
              <MapPin size={14} className="inline" /> {parcel.senderAddress}
            </p>
          </div>

          <div className="bg-[#D4E96D]/10 p-6 rounded-2xl">
            <h3 className="flex items-center gap-2 font-black text-[#0D2A38] mb-4 uppercase text-sm">
              <MapPin size={18} /> Delivery To
            </h3>
            <p className="font-bold">{parcel.receiverName}</p>
            <p className="text-sm">{parcel.receiverPhone}</p>
            <p className="text-sm mt-2 font-medium">
              {parcel.receiverAddress}, {parcel.receiverDistrict}
            </p>
          </div>
        </div>

        {/* Parcel Stats */}
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-200 p-6 rounded-2xl">
            <h3 className="flex items-center gap-2 font-black text-[#0D2A38] mb-4 uppercase text-sm">
              <Box size={18} /> Parcel Details
            </h3>
            <div className="flex justify-between border-b pb-2 mb-2">
              <span className="text-gray-400 font-bold">Type:</span>
              <span className="font-black text-[#0D2A38]">
                {parcel.parcelType}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2 mb-2">
              <span className="text-gray-400 font-bold">Weight:</span>
              <span className="font-black text-[#0D2A38]">
                {parcel.weight} KG
              </span>
            </div>
            <div className="flex justify-between border-b pb-2 mb-2">
              <span className="text-gray-400 font-bold">Tracing ID:</span>
              <span className="font-mono text-blue-600 font-bold">
                {parcel.tracingId}
              </span>
            </div>
            <div className="mt-4 p-3 bg-[#0D2A38] text-[#D4E96D] rounded-xl text-center">
              <p className="text-xs font-bold uppercase">Total Charge</p>
              <p className="text-2xl font-black">৳{parcel.totalCharge}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetails;
