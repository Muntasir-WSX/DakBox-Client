import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 mt-4">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Sign In</h1>
        <p className="text-gray-500 text-sm">Welcome back to ZapShift</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Must contain uppercase, lowercase and a number"
              }
            })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${
              errors.password ? "border-red-500" : "focus:border-[#D4E96D]"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
          )}
          
          <div className="flex justify-end mt-1">
            <a href="#" className="text-xs text-[#a8bf34] hover:underline font-medium">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn w-full bg-[#D4E96D] hover:bg-[#c2d950] border-none text-gray-800 font-bold mt-4 normal-case text-lg shadow-sm"
        >
          Login
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-6 text-sm">
        <p className="text-gray-600">
          New here?{" "}
          <Link to="/signup" className="text-[#a8bf34] hover:underline font-bold">
            Create an Account
          </Link>
        </p>

        <div className="divider text-gray-400 text-xs my-8 font-light uppercase tracking-widest">
          Or
        </div>

        <button
          type="button"
          className="btn btn-outline w-full border-none bg-[#F3F6F9] hover:bg-gray-200 text-gray-700 normal-case font-medium"
        >
          <FcGoogle className="text-2xl mr-3" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;