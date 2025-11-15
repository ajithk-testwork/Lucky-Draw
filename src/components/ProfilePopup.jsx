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
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto font-sans">
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
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-600">
                    <FaUser className="text-white text-4xl" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-4xl font-bold mb-3 text-white font-serif tracking-tight">
                  {userData.name}
                </h2>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  <span className="bg-blue-600 text-blue-100 px-4 py-2 rounded-full text-base font-semibold font-mono tracking-wide">
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
                  className="bg-slate-800/70 p-5 rounded-xl border border-slate-700"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400 font-sans tracking-wide">
                    <FaBuilding className="text-blue-400 text-lg" /> Company Information
                  </h3>
                  <p className="text-slate-300 text-base font-sans">
                    <span className="font-medium text-white">Company ID:</span>{' '}
                    <span className="font-mono tracking-wide">{userData.companyId}</span>
                  </p>
                </motion.div>

                {/* Personal Details */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/70 p-5 rounded-xl border border-slate-700"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400 font-sans tracking-wide">
                    <FaIdCard className="text-blue-400 text-lg" /> Personal Details
                  </h3>
                  <ul className="space-y-3 text-slate-300 text-base font-sans">
                    <li className="flex items-center gap-3">
                      <FaBirthdayCake className="text-orange-400 flex-shrink-0 text-lg" /> 
                      <span className="font-medium text-white">Age:</span>
                      <span className="font-mono tracking-wide ml-2">{userData.age} Years</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaUsers className="text-teal-400 flex-shrink-0 text-lg" /> 
                      <span className="font-medium text-white">Family Members:</span>
                      <span className="font-mono tracking-wide ml-2">{userData.familyMembers} People</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaUser className="text-purple-400 flex-shrink-0 text-lg" /> 
                      <span className="font-medium text-white">Gender:</span>
                      <span className="font-mono tracking-wide ml-2">{userData.gender || 'Male'}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-lg">🍽️</span>
                      <span className="font-medium text-white">Food Preference:</span>
                      <span className="font-mono tracking-wide ml-2">{userData.foodPreference}</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Right Info Section */}
              <div className="space-y-4">
                {/* Contact Info */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/70 p-5 rounded-xl border border-slate-700"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400 font-sans tracking-wide">
                    <FaPhone className="text-blue-400 text-lg" /> Contact Information
                  </h3>
                  <ul className="space-y-3 text-slate-300 text-base font-sans">
                    <li className="flex items-center gap-3">
                      <FaPhone className="text-green-500 flex-shrink-0 text-lg" />
                      <span className="font-medium text-white mr-3">Phone:</span>
                      <span className="font-mono tracking-wide">{userData.phone}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaWhatsapp className="text-green-400 flex-shrink-0 text-lg" />
                      <span className="font-medium text-white mr-3">WhatsApp:</span>
                      <span className="font-mono tracking-wide">{userData.whatsapp}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaEnvelope className="text-blue-400 flex-shrink-0 text-lg" />
                      <span className="font-medium text-white mr-3">Email:</span>
                      <span className="font-mono tracking-wide break-all">{userData.email}</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Address */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/70 p-5 rounded-xl border border-slate-700"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400 font-sans tracking-wide">
                    <FaMapMarkerAlt className="text-blue-400 text-lg" /> Address
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line font-sans">
                    {userData.address}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-center text-slate-400 text-base font-light font-sans tracking-wide">
                Member Profile • {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfilePopup;