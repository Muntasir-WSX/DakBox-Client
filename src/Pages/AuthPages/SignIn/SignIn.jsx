import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import UseAxios from "../../../Hooks/UseAxios";



const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = UseAxios(); 
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleJWTAndNavigate = async (email) => {
    try {
   
      const { data } = await axiosSecure.post("/jwt", { email });
      
      if (data.token) {
        localStorage.setItem("access-token", data.token);

       
       const roleRes = await axiosPublic.get(`/user-role?email=${email}`, {
           headers: { authorization: `Bearer ${data.token}` } 
        });
        const role = roleRes.data?.role;

        
        if (role === "admin") {
          navigate("/dashboard/manage-admin");
        } else if (role === "rider") {
          navigate("/dashboard/assigned-parcels");
        } else {
          navigate("/dashboard/myparcels");
        }
      }
    } catch (err) {
      console.error("JWT/Role Error:", err);
      toast.error("Failed to secure session or fetch role!");
    }
  };

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        toast.success("Welcome back!", {
          style: {
            background: "#1F2937",
            color: "#D9F26B",
            border: "1px solid #D9F26B",
          },
        });
        handleJWTAndNavigate(result.user.email);
      })
      .catch((error) => {
        console.error("Firebase Auth Error Code:", error.code);
        console.error("Firebase Auth Error Message:", error.message);
        toast.error("Login failed. Check your credentials.");
        if (error.code === 'auth/invalid-credential') {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("Login failed. " + error.message);
      }
    
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Google Sign-in Successful", {
          style: { background: "#D9F26B", color: "#000" },
        });
        handleJWTAndNavigate(result.user.email);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>DakBox | Sign In</title>
      </Helmet>
      
      <div className="mb-8 mt-4">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Sign In</h1>
        <p className="text-gray-500 text-sm">Welcome back to DakBox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${errors.email ? "border-red-500" : "focus:border-[#D4E96D]"}`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-semibold text-gray-700">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={`input input-bordered w-full bg-white focus:outline-none border-gray-300 ${errors.password ? "border-red-500" : "focus:border-[#D4E96D]"}`}
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
          )}
          <div className="flex justify-end mt-1">
            <button type="button" className="text-xs text-[#a8bf34] hover:underline font-medium">
              Forgot password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn w-full bg-[#D4E96D] hover:bg-[#c2d950] border-none text-gray-800 font-bold mt-4 normal-case text-lg shadow-sm"
        >
          Login
        </button>
      </form>

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
          onClick={handleGoogleSignIn}
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