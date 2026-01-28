import React, { useState } from "react"; // useState যোগ করা হয়েছে প্রিভিউ দেখার জন্য
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createuser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); // ইমেজ প্রিভিউ স্টেট
    
  const onSubmit = (data) => {
    const imageFile = data.image[0];
    const localImageUrl = URL.createObjectURL(imageFile);
    console.log("Selected Image:", imageFile);

    createuser(data.email, data.password)
      .then((result) => {
        toast.success("Account created successfully!", {
          duration: 4000,
          style: {
            background: "#1F2937",
            color: "#D4E96D",
          },
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error("Email already in use!");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Welcome to DakBox!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Google Registration Failed");
      });
  };

  // ইমেজ সিলেক্ট করলে প্রিভিউ দেখানোর ফাংশন
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Create an Account</h1>
        <p className="text-gray-500 text-sm">Register with DakBox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Profile Image Section */}
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">Profile Picture</span>
          </label>
          <div className="flex items-center gap-4">
            {/* Clickable Circle for File Upload */}
            <label htmlFor="image-upload" className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 relative cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <span className="text-gray-400 text-2xl">👤</span>
                  <span className="absolute bottom-0 right-0 bg-white rounded-full text-[10px] p-1 border shadow-sm">⬆️</span>
                </>
              )}
            </label>
            {/* Actual Hidden File Input */}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                register("image").onChange(e); // react-hook-form এর সাথে কানেক্ট রাখতে
                handleImageChange(e); // প্রিভিউ দেখানোর জন্য
              }}
              className="hidden" // আমরা ইনপুটটি হাইড করে শুধু লেবেলে ক্লিক করাবো
            />
            <div className="text-xs text-gray-400">
              <p>Click the icon to upload</p>
              <p>JPG, PNG or GIF</p>
            </div>
          </div>
        </div>

        {/* Name Field */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text font-semibold text-gray-700">Name</span></label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${errors.name ? "border-red-500" : "focus:border-[#D4E96D]"}`}
          />
          {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text font-semibold text-gray-700">Email</span></label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${errors.email ? "border-red-500" : "focus:border-[#D4E96D]"}`}
          />
          {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
        </div>

        {/* Password Field */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text font-semibold text-gray-700">Password</span></label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
            })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${errors.password ? "border-red-500" : "focus:border-[#D4E96D]"}`}
          />
          {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
        </div>

        <button type="submit" className="btn w-full bg-[#D4E96D] hover:bg-[#c2d950] border-none text-gray-800 font-bold mt-4 normal-case text-lg shadow-sm">
          Register
        </button>
      </form>

      <div className="mt-6 text-sm">
        <p className="text-gray-600">Already have an account? <Link to="/signin" className="text-[#a8bf34] hover:underline font-bold">Login</Link></p>
        <div className="divider text-gray-400 text-xs my-8 font-light uppercase tracking-widest">Or</div>
        <button onClick={handleGoogleSignIn} type="button" className="btn btn-outline w-full border-none bg-[#F3F6F9] hover:bg-gray-200 text-gray-700 normal-case font-medium">
          <FcGoogle className="text-2xl mr-3" /> Register with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;