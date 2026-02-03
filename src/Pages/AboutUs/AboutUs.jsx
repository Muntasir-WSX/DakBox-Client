import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tabContents } from "../../../data/aboutData"; 
import { History, Target, Trophy, Users} from "lucide-react";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabIcons = {
    story: <History size={20} />,
    mission: <Target size={20} />,
    success: <Trophy size={20} />,
    team: <Users size={20} />,
  };

  const tabs = [
    { id: "story", label: "Story" },
    { id: "mission", label: "Mission" },
    { id: "success", label: "Success" },
    { id: "team", label: "Team & Others" },
  ];

  const ceo = tabContents.team.slice(0, 1); 
  const secondRow = tabContents.team.slice(1, 3); 
  const remainingMembers = tabContents.team.slice(3);
  const TeamCard = ({ member, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-gray-50 p-8 rounded-[40px] border border-transparent hover:border-[#D9F26B] hover:bg-white flex flex-col items-center text-center transition-all duration-300 shadow-sm"
    >
      <div className="relative mb-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 md:w-44 md:h-44 rounded-4xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-transparent group-hover:border-[#D9F26B]"
        />
        
      </div>
      <h3 className="font-extrabold text-2xl text-[#0D2A38] mb-1">{member.name}</h3>
      <p className="text-sm md:text-base text-[#6B7C11] font-bold uppercase tracking-widest">
        {member.role}
      </p>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 bg-white rounded-[40px] shadow-sm border border-gray-100 font-urbanist mt-10">
      {/* Header Section */}
       <Helmet>
              <title>DakBox | About Us</title>
       </Helmet>
      <div className="flex flex-col font-urbanist md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-5xl  font-black text-[#0D2A38] mb-3 tracking-tighter uppercase">
            About <span className="text-[#6B7C11]">Us</span>
          </h2>
          <p className="text-gray-500 max-w-md font-urbanist ">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          </p>
        </div>
       
        <div className="bg-[#D9F26B] px-6 py-3 rounded-2xl hidden md:block border border-black/5 shadow-sm">
          <p className="font-bold text-black text-xs uppercase tracking-widest">Since 2026</p>
        </div>
      </div>

    
      <div className="flex flex-wrap gap-4 md:gap-12 border-b border-gray-100 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-base md:text-xl font-bold transition-all flex items-center gap-2 relative ${
              activeTab === tab.id ? "text-[#6B7C11]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tabIcons[tab.id]}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#6B7C11] rounded-full"
              />
            )}
          </button>
        ))}
      </div>

 
      <div className="min-h-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeTab === "team" ? (
              <div className="space-y-12 mt-6">
                {/* 1st Row: CEO (Muntasir) */}
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <TeamCard member={ceo[0]} index={0} />
                  </div>
                </div>

                {/* 2nd Row: 2 Members (Jami & Nabil) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {secondRow.map((m, i) => (
                    <TeamCard key={i} member={m} index={i + 1} />
                  ))}
                </div>

                {/* 3rd Row: Remaining 4 Members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {remainingMembers.map((m, i) => (
                    <TeamCard key={i} member={m} index={i + 3} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-5xl">
               
                <p className="text-gray-600 leading-relaxed text-xl md:text-2xl font-medium  mb-8 border-l-8 border-[#D9F26B] pl-8">
                  {tabContents[activeTab]}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                  <div className="p-8 bg-gray-50 rounded-3xl border-l-4 border-[#6B7C11] shadow-sm">
                    <p className="text-sm text-gray-500 font-urbanist ">"Delivering excellence across Bangladesh with every parcel we handle."</p>
                  </div>
                  <div className="p-8 bg-[#D9F26B]/10 rounded-3xl border-l-4 border-[#D9F26B] shadow-sm">
                    <p className="text-sm text-gray-800 font-extrabold uppercase tracking-tighter font-urbanist">Fast. Secure. Reliable.</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutUs;