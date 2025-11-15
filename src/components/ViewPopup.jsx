// ViewPopup.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const ViewPopup = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 animate-opacity"
        onClick={onClose}
      ></div>

      {/* Modal (Updated: now scrollable) */}
      <div className="
        relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl 
        max-w-4xl w-full border border-gray-200 animate-scaleIn
        max-h-[90vh] overflow-y-auto
      ">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
            Participant Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-50 text-red-600 hover:text-red-700 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-300">
              <img src={user.userImage} className="w-full h-full object-cover" />
            </div>

          
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{user.name}</h3>

            <p className="text-lg text-gray-600 mb-6">
              Member ID:{" "}
              <span className="font-semibold tracking-wider bg-gray-100 px-2 py-1 rounded-lg">
                {user.userId}
              </span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                ["Address", user.address],
                ["Age", user.age],
                ["Gender", user.gender],
                ["Family Members", user.familyCount],
                ["Phone", user.phone],
                ["WhatsApp", user.whatsapp],
                ["Email", user.email],
                ["Food Preference", user.food],
                ["Company ID", user.companyId],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
                >
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{label}</p>
                  <p className="text-base font-medium text-gray-800 mt-1">{value || "N/A"}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-opacity { animation: fadeIn 0.3s ease; }
        .animate-scaleIn { animation: scaleIn 0.25s ease; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ViewPopup;
