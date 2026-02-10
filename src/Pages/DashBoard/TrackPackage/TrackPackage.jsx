import React, { useState } from "react";
import {
  Search,
  Package,
  MapPin,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../SharedCopmponents/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const TrackPackage = () => {
  const [searchId, setSearchId] = useState("");
  const [tracingId, setTracingId] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: parcel, isLoading: parcelLoading } = useQuery({
    queryKey: ["parcel-track", tracingId],
    enabled: !!tracingId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/track-parcel-info/${tracingId}`);
      return res.data;
    },
    retry: false,
  });

  const { data: updates = [] } = useQuery({
    queryKey: ["tracking-updates", tracingId],
    enabled: !!tracingId && !!parcel,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${tracingId}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) setTracingId(searchId.trim());
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-urbanist">
      <Helmet>
        <title>DakBox | Track Parcel</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D2A38] uppercase">
            Track Your{" "}
            <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">
              Parcel
            </span>
          </h2>
          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-lg mx-auto relative"
          >
            <input
              type="text"
              placeholder="Enter Tracing ID"
              className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-gray-100 focus:border-[#D9F26B] outline-none shadow-sm font-bold"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-[#D9F26B] text-[#0D2A38] font-black px-6 rounded-xl hover:bg-[#0D2A38] hover:text-[#D9F26B] transition-all"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        <AnimatePresence mode="wait">
          {parcelLoading ? (
            <Loading key="loading" />
          ) : tracingId && parcel ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Side: Parcel Info */}
              <div className="lg:col-span-5 bg-white p-8 rounded-4xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-xl font-black text-[#0D2A38] mb-6 flex items-center gap-2">
                  <Package className="text-[#A3B730]" size={24} /> Consignment
                  Details
                </h3>
                <div className="space-y-6">
                  <DetailItem
                    label="Receiver"
                    value={parcel.receiverName}
                    subValue={parcel.receiverAddress}
                    icon={<MapPin size={18} />}
                  />
                  <DetailItem
                    label="Contact"
                    value={parcel.receiverPhone}
                    icon={<Phone size={18} />}
                  />
                  <DetailItem
                    label="Booking Date"
                    value={new Date(parcel.bookingDate).toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "long", year: "numeric" },
                    )}
                    icon={<Calendar size={18} />}
                  />

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">
                        Tracing Code
                      </p>
                      <p className="font-mono text-sm font-bold text-blue-600">
                        {parcel.tracingId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase">
                        Current Status
                      </p>
                      <span className="text-[10px] font-black bg-[#D9F26B] px-2 py-1 rounded uppercase">
                        {parcel.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/*  Tracking Updates  */}
              <div className="lg:col-span-7 bg-white p-8 rounded-4xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-[#0D2A38] mb-8">
                  Tracking Updates
                </h3>

                <div className="relative pl-8">
                  <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                  <div className="space-y-8">
                    {updates.map((update, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative flex items-center justify-between"
                      >
                        <div className="absolute -left-7.25 bg-white p-1">
                          <div
                            className={`w-5 h-5 rounded-full border-4 flex items-center justify-center ${idx === 0 ? "border-green-100 bg-green-500" : "border-gray-50 bg-gray-200"}`}
                          >
                            {idx === 0 && (
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 ml-4">
                          <p
                            className={`font-bold text-sm ${idx === 0 ? "text-[#0D2A38]" : "text-gray-400"}`}
                          >
                            {update.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            {update.message}
                          </p>
                        </div>

                        <div className="text-right ml-4">
                          <p className="text-[10px] font-black text-gray-400 uppercase">
                            {new Date(update.time).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-[10px] font-bold text-gray-300">
                            {new Date(update.time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {updates.length === 1 && parcel.status === "assigned" && (
                      <div className="relative flex items-center opacity-20 pl-0">
                        <div className="absolute -left-6.25 w-3 h-3 rounded-full bg-gray-200"></div>
                        <p className="ml-9 text-xs font-bold uppercase tracking-widest">
                          Awaiting Pickup...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            tracingId && (
              <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
                <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
                <h3 className="text-xl font-black text-[#0D2A38] uppercase">
                  No Consignment Found
                </h3>
                <p className="text-gray-400 font-medium">
                  Please check the Tracing ID and try again.
                </p>
              </div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, subValue, icon }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 text-[#A3B730] bg-gray-50 p-2 rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {label}
      </p>
      <p className="font-bold text-[#0D2A38] text-sm">{value}</p>
      {subValue && <p className="text-xs text-gray-500 mt-0.5">{subValue}</p>}
    </div>
  </div>
);

export default TrackPackage;
