import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const { createuser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createuser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Create an Account</h1>
        <p className="text-gray-500 text-sm">Register with DakBox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Profile Upload Placeholder */}
        <div className="flex justify-start mb-6">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 relative cursor-pointer hover:bg-gray-200 transition-colors">
            <span className="text-gray-400 text-2xl">👤</span>
            <span className="absolute bottom-0 right-0 bg-white rounded-full text-[10px] p-1 border shadow-sm">
              ⬆️
            </span>
          </div>
        </div>

        {/* Name Field */}
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${
              errors.name ? "border-red-500" : "focus:border-[#D4E96D]"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${
              errors.email ? "border-red-500" : "focus:border-[#D4E96D]"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
              maxLength: { value: 20, message: "Maximum 20 characters allowed" },
            })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${
              errors.password ? "border-red-500" : "focus:border-[#D4E96D]"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="btn w-full bg-[#D4E96D] hover:bg-[#c2d950] border-none text-gray-800 font-bold mt-4 normal-case text-lg shadow-sm"
        >
          Register
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-6 text-sm">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#a8bf34] hover:underline font-bold">
            Login
          </Link>
        </p>

        <div className="divider text-gray-400 text-xs my-8 font-light uppercase tracking-widest">
          Or
        </div>

        <button
          type="button"
          className="btn btn-outline w-full border-none bg-[#F3F6F9] hover:bg-gray-200 text-gray-700 normal-case font-medium"
        >
          <FcGoogle className="text-2xl mr-3" /> Register with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;