import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2"; 
import { warehouseData } from "../../Data/WareHouse";
import { FormInput, FormSelect, FormTextArea } from "./FormComponents";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = useAuth();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      parcelType: "Document",
      weight: 1,
      senderDistrict: "",
      receiverDistrict: "",
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    const { parcelType, weight, senderDistrict, receiverDistrict } = watchedValues;
    if (!senderDistrict || !receiverDistrict) return setDeliveryCharge(0);

    const isSameCity = senderDistrict === receiverDistrict;
    let charge = 0;

    if (parcelType === "Document") {
      charge = isSameCity ? 60 : 80;
    } else {
      const numWeight = parseFloat(weight) || 0;
      if (numWeight <= 3) {
        charge = isSameCity ? 110 : 150;
      } else {
        const baseCharge = isSameCity ? 110 : 150;
        const extraWeight = Math.ceil(numWeight - 3);
        charge = baseCharge + extraWeight * 40;
        if (!isSameCity) charge += 40;
      }
    }
    setDeliveryCharge(charge);
  }, [watchedValues.parcelType, watchedValues.weight, watchedValues.senderDistrict, watchedValues.receiverDistrict]);

  const generateTracingId = () => {
    const prefix = "DKB";
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${datePart}-${randomPart}`;
  };

  const onSubmit = async (data) => {
    
    Swal.fire({
      title: "Confirm Your Booking?",
      text: `Total Charge: ৳${deliveryCharge}. Do you want to proceed?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#D4E96D",
      cancelButtonColor: "#1F2937",
      confirmButtonText: "Proceed to Confirm",
      cancelButtonText: "Edit Details",
      background: "#FFFFFF",
      color: "#0D2A38",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const finalData = {
          ...data,
          tracingId: generateTracingId(),
          bookingDate: new Date().toISOString(),
          totalCharge: deliveryCharge,
          status: "pending",
          userEmail: user?.email || "guest",
          userName: user?.displayName || "Anonymous",
        };

        try {
          
          const res = await axiosSecure.post("/parcels", finalData);
          console.log("Server Response:", res.data);
          if (res.data.insertedId) {
            Swal.fire({
              title: "Booked!",
              text: `Your parcel has been booked. ID: ${finalData.tracingId}`,
              icon: "success",
              confirmButtonColor: "#D4E96D",
            });
            reset(); 
          }
        } catch (error) {
          console.error("Booking Error:", error);
          toast.error("Something went wrong. Please try again.");
        }
      }
    });
  };

  const districts = [...new Set(warehouseData.map((item) => item.district))].sort();

  return (
    <section className="py-12 bg-white min-h-screen px-4 font-sans text-[#0D2A38]">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Send A Parcel</h1>
          <h2 className="text-xl font-semibold mb-8 border-b pb-4">Enter your parcel details</h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Radio Buttons */}
          <div className="flex gap-10 items-center">
            {["Document", "Not-Document"].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    {...register("parcelType")}
                    type="radio"
                    value={type}
                    className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-full checked:border-green-500 transition-all"
                  />
                  <div className="absolute w-3 h-3 rounded-full peer-checked:bg-green-500 transition-all"></div>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-black transition-colors">{type}</span>
              </label>
            ))}
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <FormInput label="Parcel Name" name="parcelName" register={register} errors={errors} placeholder="Parcel Name" required />
            <FormInput label="Parcel Weight (KG)" name="weight" register={register} errors={errors} type="number" placeholder="Parcel Weight (KG)" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-8">
            {/* Sender Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Sender Details</h3>
              <FormInput label="Sender Name" name="senderName" register={register} errors={errors} required />
              <FormInput label="Address" name="senderAddress" register={register} errors={errors} required />
              <FormInput label="Sender Phone No" name="senderPhone" register={register} errors={errors} required />
              <FormSelect label="Sender District" name="senderDistrict" register={register} errors={errors} options={districts} required />
              <FormTextArea label="Pickup Instruction" name="pickupNote" register={register} />
            </div>

            {/* Receiver Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Receiver Details</h3>
              <FormInput label="Receiver Name" name="receiverName" register={register} errors={errors} required />
              <FormInput label="Receiver Address" name="receiverAddress" register={register} errors={errors} required />
              <FormInput label="Receiver Contact No" name="receiverPhone" register={register} errors={errors} required />
              <FormSelect label="Receiver District" name="receiverDistrict" register={register} errors={errors} options={districts} required />
              <FormTextArea label="Delivery Instruction" name="deliveryNote" register={register} />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-10 space-y-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-600 italic">* PickUp Time 4pm-7pm Approx.</p>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Cost</span>
                <span className="text-3xl font-black text-[#0D2A38]">৳{deliveryCharge}</span>
              </div>
            </div>
            <button type="submit" className="w-full md:w-auto bg-[#D4E96D] text-[#0D2A38] font-bold py-3 px-12 rounded-lg shadow-sm hover:brightness-95 active:scale-[0.98] transition-all text-sm">
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SendParcel;