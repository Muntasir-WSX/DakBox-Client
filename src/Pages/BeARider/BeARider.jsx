import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import riderImg from "../../assets/agent-pending.png"; 
import useAuth from '../../Hooks/useAuth';
import divisions from '../../../data/division.json';
import warehouses from '../../../data/warehouses.json';
import { Helmet } from 'react-helmet-async';

const BeARider = () => {
    const { user } = useAuth();
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || ""
        }
    });
    const selectedRegion = watch("region");

    useEffect(() => {
        if (selectedRegion) {
            const districts = warehouses
                .filter(w => w.region === selectedRegion)
                .map(w => w.district);
            
            setFilteredDistricts([...new Set(districts)]);
            setValue("district", "");
        }
    }, [selectedRegion, setValue]);

    const onSubmit = (data) => {
        console.log("Rider Application Data:", data);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-sm mt-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
                
                <Helmet>
                        <title>DakBox | Be A Rider</title>
                      </Helmet>
                {/* Left Side: Form */}
                <div className="flex-1 w-full">
                    <h1 className="text-4xl font-bold text-[#0D2A38] mb-2">Be a Rider</h1>
                    <p className="text-gray-500 mb-8">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>

                    <h3 className="text-xl font-semibold mb-6">Tell us about yourself</h3>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label-text font-medium mb-1">Your Name</label>
                                <input 
                                    {...register("name", { required: true })} 
                                    className="input input-bordered w-full bg-gray-50" 
                                    placeholder="Your Name"
                                />
                            </div>
                            {/* License */}
                            <div className="form-control">
                                <label className="label-text font-medium mb-1">Driving License Number</label>
                                <input 
                                    {...register("license", { required: "License is required" })} 
                                    className="input input-bordered w-full bg-gray-50" 
                                    placeholder="Driving License Number"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Email */}
                            <div className="form-control">
                                <label className="label-text font-medium mb-1">Your Email</label>
                                <input 
                                    {...register("email")} 
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed" 
                                />
                            </div>
                            {/* Region */}
                            <div className="form-control">
                                <label className="label-text font-medium mb-1">Your Region</label>
                                <select 
                                    {...register("region", { required: true })} 
                                    className="select select-bordered w-full bg-gray-50"
                                >
                                    <option value="">Select your Region</option>
                                    {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* District */}
                            <div className="form-control">
                                <label className="label-text font-medium mb-1">Your District</label>
                                <select 
                                    {...register("district", { required: true })} 
                                    className="select select-bordered w-full bg-gray-50"
                                    disabled={!selectedRegion}
                                >
                                    <option value="">Select your District</option>
                                    {filteredDistricts.map(dis => <option key={dis} value={dis}>{dis}</option>)}
                                </select>
                            </div>
                            {/* NID */}
                            <div className="form-control">
                                <label className="label-text font-medium mb-1">NID No</label>
                                <input 
                                    {...register("nid", { required: true })} 
                                    className="input input-bordered w-full bg-gray-50" 
                                    placeholder="NID Number"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Phone */}
                            <div className="form-control">
                                <label className="label-text font-medium mb-1">Phone Number</label>
                                <input 
                                    {...register("phone", { required: true })} 
                                    className="input input-bordered w-full bg-gray-50" 
                                    placeholder="Phone Number"
                                />
                            </div>
                            {/* Bike Model */}
                            <div className="form-control">
                                <label className="label-text font-medium mb-1">Bike Brand Model and Year</label>
                                <input 
                                    {...register("bikeModel", { required: true })} 
                                    className="input input-bordered w-full bg-gray-50" 
                                    placeholder="e.g. Yamaha FZS 2022"
                                />
                            </div>
                        </div>

                        {/* Bike Reg */}
                        <div className="form-control">
                            <label className="label-text font-medium mb-1">Bike Registration Number</label>
                            <input 
                                {...register("bikeReg", { required: true })} 
                                className="input input-bordered w-full bg-gray-50" 
                                placeholder="Bike Registration Number"
                            />
                        </div>

                        {/* About */}
                        <div className="form-control">
                            <label className="label-text font-medium mb-1">Tell Us About Yourself</label>
                            <textarea 
                                {...register("about")} 
                                className="textarea textarea-bordered w-full bg-gray-50" 
                                placeholder="Write something about your experience..."
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="btn w-full bg-[#D4E96D] hover:bg-[#c2d951] border-none text-black font-bold text-lg mt-4"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Right Side: Image */}
                <div className="hidden md:flex flex-1 justify-center">
                    <img src={riderImg} alt="Rider Illustration" className="w-full max-w-md object-contain" />
                </div>
            </div>
        </div>
    );
};

export default BeARider;