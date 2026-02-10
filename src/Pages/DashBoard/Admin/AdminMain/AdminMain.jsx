import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Package, Banknote, MapPin } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../SharedCopmponents/Loading/Loading";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  ResponsiveContainer,
  AreaChart,
  BarChart,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminMain = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: adminStats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  const COLORS = ["#D4E96D", "#0D2A38", "#22C55E", "#F59E0B", "#EF4444"];

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="p-10 text-red-500">Failed to load dashboard data.</div>
    );
  const cards = adminStats?.cards || {};
  const bookingTrends = adminStats?.bookingTrends || [];
  const districtStats = adminStats?.districtStats || [];
  const statusStats = adminStats?.statusStats || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-black text-[#0D2A38] uppercase tracking-tight">
          Insights &{" "}
          <span className="text-[#D9F26B] bg-[#0D2A38] px-2 rounded">
            Analytics
          </span>
        </h2>
        <p className="mt-5 text-gray-500">
          Welcome back! Here's what's happening with DakBox today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="p-4 bg-[#D4E96D]/20 rounded-2xl text-[#0D2A38]">
            <Banknote size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
              Total Revenue
            </p>
            <h2 className="text-3xl font-black text-[#0D2A38]">
              ৳{cards?.totalRevenue || 0}
            </h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
            <Package size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
              Total Parcels
            </p>
            <h2 className="text-3xl font-black text-[#0D2A38]">
              {cards?.totalParcels || 0}
            </h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="p-4 bg-purple-50 rounded-2xl text-purple-600">
            <Users size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
              Total Users
            </p>
            <h2 className="text-3xl font-black text-[#0D2A38]">
              {cards?.totalUsers || 0}
            </h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Package className="text-[#D4E96D]" /> Booking Trends
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingTrends}>
                <defs>
                  <linearGradient id="colorParcels" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4E96D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D4E96D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="parcels"
                  stroke="#D4E96D"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorParcels)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0D2A38] p-8 rounded-3xl shadow-xl text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#D4E96D]">
            <MapPin /> Top Districts
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtStats}>
                <XAxis
                  dataKey="district"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(212, 233, 109, 0.1)" }}
                  contentStyle={{ color: "#0D2A38", borderRadius: "12px" }}
                />
                <Bar
                  dataKey="total"
                  fill="#D4E96D"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">
            Delivery Status Breakdown
          </h3>
          <div className="flex flex-col md:flex-row items-center">
            <div className="h-[350px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusStats}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {statusStats?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <div className="grid grid-cols-2 gap-4">
                {statusStats?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      {item.name}
                    </p>
                    <p className="text-2xl font-black text-[#0D2A38]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
