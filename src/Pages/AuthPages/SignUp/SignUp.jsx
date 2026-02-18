import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createuser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const createJWTandUser = async (user, name, photoURL) => {
    const userInfo = {
      name: name || user?.displayName,
      email: user?.email,
      photoURL: photoURL || user?.photoURL,
      role: "user",
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    const { data } = await axiosSecure.post("/jwt", {
      email: user?.email
    });
    if (data.token) {
      localStorage.setItem("access-token", data.token);
    }

    return await axiosSecure.post("/users", userInfo);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let photoURL = "";
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`;
        const res = await axios.post(imageUploadUrl, formData);
        if (res.data.success) {
          photoURL = res.data.data.display_url;
        }
      }

      const result = await createuser(data.email, data.password);
      await updateUserProfile(data.name, photoURL);

      const userRes = await createJWTandUser(result.user, data.name, photoURL);

      if (userRes.data.insertedId || userRes.data.inserted === false) {
        toast.success("Account created successfully!", {
          style: { background: "#D9F26B", color: "#000", fontWeight: "bold" },
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithGoogle();
      const res = await createJWTandUser(result.user);

      if (res.data.insertedId || res.data.inserted === false) {
        toast.success("Signed in with Google successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>DakBox | Sign Up</title>
      </Helmet>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          Create an Account
        </h1>
        <p className="text-gray-500 text-sm">Register with DakBox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">
              Profile Picture
            </span>
          </label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="image-upload"
              className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 relative cursor-pointer overflow-hidden"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-2xl">👤</span>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="text-xs text-gray-400">
              <p>Click the icon to upload</p>
            </div>
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">Name</span>
          </label>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full bg-white border-gray-300 focus:border-[#D4E96D] outline-none"
          />
        </div>
        {/* Email Input */}
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">
              Email
            </span>
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full bg-white border-gray-300 focus:border-[#D4E96D] outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">
              Password
            </span>
          </label>
          <input
            type="password"
            placeholder="Min 6 characters"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            className="input input-bordered w-full bg-white border-gray-300 focus:border-[#D4E96D] outline-none"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              Password must be 6+ characters
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-[#D4E96D] hover:bg-[#c2d950] border-none text-gray-800 font-bold mt-4"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignUp}
        className="btn btn-outline w-full flex items-center gap-2 border-gray-300"
      >
        <FcGoogle size={20} /> Sign up with Google
      </button>

      <p className="text-center mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-[#0D2A38] font-bold underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
