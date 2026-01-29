import React from 'react';

export const FormInput = ({ label, name, register, errors, placeholder, type = "text", required }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
        <input 
            type={type} 
            step="any"
            placeholder={placeholder}
            {...register(name, { required: required ? `${label} is required` : false })}
            className={`w-full px-5 py-3.5 bg-gray-50 border ${errors[name] ? 'border-red-400' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-[#D4E96D] outline-none transition-all`}
        />
        {errors[name] && <span className="text-red-500 text-xs ml-1 font-medium">{errors[name].message}</span>}
    </div>
);

export const FormSelect = ({ label, name, register, errors, options, required }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
        <div className="relative">
            <select 
                {...register(name, { required: required ? "Please select a district" : false })}
                className={`w-full px-5 py-3.5 bg-gray-50 border ${errors[name] ? 'border-red-400' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-[#D4E96D] outline-none appearance-none cursor-pointer`}
            >
                <option value="">Select District</option>
                {options.map((dist, i) => <option key={i} value={dist}>{dist}</option>)}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                ▼
            </div>
        </div>
        {errors[name] && <span className="text-red-500 text-xs ml-1 font-medium">{errors[name].message}</span>}
    </div>
);

export const FormTextArea = ({ label, name, register, placeholder }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
        <textarea 
            rows="3"
            placeholder={placeholder}
            {...register(name)}
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4E96D] outline-none resize-none transition-all"
        />
    </div>
);