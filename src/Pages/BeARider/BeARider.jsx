import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import riderImg from "../../assets/agent-pending.png";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import divisions from "../../../data/division.json";
import { warehouseData as warehouses } from "../../Data/WareHouse";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });
  useEffect(() => {
    if (user) {
      setValue("name", user?.displayName);
      setValue("email", user?.email);
    }
  }, [user, setValue]);

  const selectedRegion = watch("region");

  useEffect(() => {
    if (selectedRegion) {
      const districts = warehouses
        .filter((w) => w.region === selectedRegion)
        .map((w) => w.district);

      setFilteredDistricts([...new Set(districts)]);
      setValue("district", "");
    }
  }, [selectedRegion, setValue]);

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit this rider application?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#D4E96D",
      cancelButtonColor: "#1F2937",
      confirmButtonText: "Yes, Submit!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const finalData = {
          ...data,
          status: "pending",
          appliedDate: new Date().toISOString(),
          userPhoto: user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png",
        };

        try {
          const res = await axiosSecure.post("/rider-applications", finalData);

          if (res.data.insertedId) {
            Swal.fire({
              title: "Submitted!",
              text: `Application sent successfully!`,
              icon: "success",
              confirmButtonColor: "#D4E96D",
            });
            reset();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Submission failed",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-sm mt-10">
      <Helmet>
        <title>DakBox | Be A Rider</title>
      </Helmet>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 w-full">
          <h1 className="text-4xl font-bold text-[#0D2A38] mb-2">Be a Rider</h1>
          <p className="text-gray-500 mb-8">
            Complete the form below to apply as a rider.
          </p>

          <h3 className="text-xl font-semibold mb-6">Application Form</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-medium mb-1">Full Name</label>
                <input
                  {...register("name")}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="form-control">
                <label className="label-text font-medium mb-1">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-medium mb-1">
                  Driving License
                </label>
                <input
                  {...register("license", { required: "License is required" })}
                  className="input input-bordered w-full bg-gray-50"
                  placeholder="DL-123456"
                />
                {errors.license && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.license.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label-text font-medium mb-1">
                  Your Region
                </label>
                <select
                  {...register("region", { required: "Region is required" })}
                  className="select select-bordered w-full bg-gray-50"
                >
                  <option value="">Select Region</option>
                  {divisions.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-medium mb-1">
                  Your District
                </label>
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  className="select select-bordered w-full bg-gray-50"
                  disabled={!selectedRegion}
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map((dis) => (
                    <option key={dis} value={dis}>
                      {dis}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label-text font-medium mb-1">NID No</label>
                <input
                  {...register("nid", { required: "NID is required" })}
                  className="input input-bordered w-full bg-gray-50"
                  placeholder="NID Number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-medium mb-1">
                  Phone Number
                </label>
                <input
                  {...register("phone", { required: "Phone is required" })}
                  className="input input-bordered w-full bg-gray-50"
                  placeholder="017XXXXXXXX"
                />
              </div>
              <div className="form-control">
                <label className="label-text font-medium mb-1">
                  Bike Model & Year
                </label>
                <input
                  {...register("bikeModel", { required: "Required" })}
                  className="input input-bordered w-full bg-gray-50"
                  placeholder="Yamaha R15 2023"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-full bg-[#D4E96D] hover:bg-[#c2d951] border-none text-[#0D2A38] font-bold text-lg mt-4 shadow-md"
            >
              Submit Application
            </button>
          </form>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <img
            src={riderImg}
            alt="Rider Illustration"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
