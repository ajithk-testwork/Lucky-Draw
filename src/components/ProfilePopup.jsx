import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt,
  FaIdCard, FaBirthdayCake, FaUsers, FaTimes, FaBuilding
} from 'react-icons/fa';

const popupVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 0.6 }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
};

const ProfilePopup = ({ isOpen, onClose, userData, luckyNumber }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto">
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full p-8 text-white relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-slate-700 hover:bg-red-600 transition p-2 rounded-lg"
            >
              <FaTimes />
            </button>

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
              {/* Profile Image */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-blue-500 shadow-lg overflow-hidden bg-black">
  {userData.image ? (
    <img
      src={userData.image}
      alt={userData.name}
      className="w-full h-full object-contain"  // <-- FULL IMAGE SHOWN
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-blue-600">
      <FaUser className="text-white text-4xl" />
    </div>
  )}
</div>


              {/* Basic Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-extrabold mb-2 text-white">
                  {userData.name}
                </h2>
              

                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                 
                  <span className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                    ID: {luckyNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8 rounded-full"></div>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Left Info Section */}
              <div className="space-y-4">
                {/* Company Info */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/70 p-4 rounded-xl border border-slate-700"
                >
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-400">
                    <FaBuilding /> Company Info
                  </h3>
                  <p className="text-slate-300 text-sm">
                    <span className="font-semibold text-white">Company ID:</span>{' '}
                    {userData.companyId}
                  </p>
                  
                </motion.div>

                {/* Personal Details */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/70 p-4 rounded-xl border border-slate-700"
                >
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-400">
                    <FaIdCard /> Personal Details
                  </h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-center gap-3">
                      <FaBirthdayCake className="text-orange-400" /> Age:{' '}
                      <span className="text-white font-bold">{userData.age} Years</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaUsers className="text-teal-400" /> Family Members:{' '}
                      <span className="text-white font-bold">
                        {userData.familyMembers} People
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaUser className="text-purple-400" /> Gender:{' '}
                      <span className="text-white font-bold">
                        {userData.gender || 'Male'}
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Right Info Section */}
              <div className="space-y-4">
                {/* Contact Info */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/70 p-4 rounded-xl border border-slate-700"
                >
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-400">
                    <FaPhone /> Contact Information
                  </h3>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    <li className="flex items-center gap-3">
                      <FaPhone className="text-green-500" />
                      <span>{userData.phone}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaWhatsapp className="text-green-400" />
                      <span>{userData.whatsapp}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaEnvelope className="text-blue-400" />
                      <span className="break-all">{userData.email}</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Address */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/70 p-4 rounded-xl border border-slate-700"
                >
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-400">
                    <FaMapMarkerAlt /> Address
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {userData.address}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfilePopup;
