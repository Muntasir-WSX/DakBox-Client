import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

// ImgBB API Key (এখানে আপনার নিজের কী বসান)
const img_hosting_key = "YOUR_IMGBB_API_KEY"; 
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createuser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data.image[0] };

    try {
      
      let photoURL = "";
      if (data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const res = await fetch(img_hosting_api, { method: "POST", body: formData });
        const imgData = await res.json();
        photoURL = imgData.data.display_url;
      }

     
      const result = await createuser(data.email, data.password);
      
      await updateUserProfile(data.name, photoURL);

      toast.success("Account created successfully!", {
      style: {
        background: "#D9F26B",
        color: "#000",
        fontWeight: "bold"
      },
    });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed!", {
      style: { border: "1px solid #D9F26B" }
    });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Create an Account</h1>
        <p className="text-gray-500 text-sm">Register with DakBox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Profile Image */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text font-semibold text-gray-700">Profile Picture</span></label>
          <div className="flex items-center gap-4">
            <label htmlFor="image-upload" className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 relative cursor-pointer overflow-hidden">
              {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-gray-400 text-2xl">👤</span>}
            </label>
            <input id="image-upload" type="file" accept="image/*" {...register("image")} onChange={handleImageChange} className="hidden" />
            <div className="text-xs text-gray-400"><p>Click the icon to upload</p></div>
          </div>
        </div>

        {/* Name */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text font-semibold text-gray-700">Name</span></label>
          <input type="text" placeholder="Full Name" {...register("name", { required: "Name is required" })} className="input input-bordered w-full bg-white border-gray-300 focus:border-[#D4E96D] outline-none" />
        </div>

        {/* Email */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text font-semibold text-gray-700">Email</span></label>
          <input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full bg-white border-gray-300 focus:border-[#D4E96D] outline-none" />
        </div>

        {/* Password */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text font-semibold text-gray-700">Password</span></label>
          <input type="password" placeholder="Min 6 characters" {...register("password", { required: "Password is required", minLength: 6 })} className="input input-bordered w-full bg-white border-gray-300 focus:border-[#D4E96D] outline-none" />
          {errors.password && <span className="text-red-500 text-xs">Password must be 6+ characters</span>}
        </div>

        <button type="submit" disabled={loading} className="btn w-full bg-[#D4E96D] hover:bg-[#c2d950] border-none text-gray-800 font-bold mt-4">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {/* Google and Login Link codes remain same as your previous version */}
    </div>
  );
};

export default SignUp;