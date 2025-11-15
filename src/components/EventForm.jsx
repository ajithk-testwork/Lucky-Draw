import axios from "axios";
import React, { useState } from "react";

export default function EventForm() {

   const defaultForm = {
    Name: "",
    Address: "",
    Age: "",
    Gender: "",
    Company_ID: "",
    Phone_Number: "",
    WhatsApp_Number: "",
    Email: "",
    Family_Member_Count: "",
    Food: "",
  };

  const [form, setForm] = useState(defaultForm);

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const uploadPhoto = async () => {
    const fd = new FormData();
    fd.append("files", photo);

    const res = await axios.post("https://api.moviemads.com/api/upload", fd);
    return res.data[0].id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      let photoId = null;

      // Step 1: Upload photo first
      if (photo) {
        photoId = await uploadPhoto(photo);
      }

      // Step 2: Save form with uploaded photo ID
      const response = await axios.post(
        "https://api.moviemads.com/api/event-forms",
        {
          data: {
            ...form,
            Photo: photoId,
          },
        }
      );

      console.log("SUCCESS:", response.data);
      alert("Form submitted successfully!");
        setForm(defaultForm);
      setPhoto(null);
    } catch (error) {
      console.error("ERROR:", error.response?.data || error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Event Registration Form
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg">
            Please fill in your details below
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
            {/* Personal Information Section */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1.5 h-6 sm:h-8 bg-blue-600 rounded-full mr-3 sm:mr-4"></div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Personal Information
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      name="Name"
                      value={form.Name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Age *
                    </label>
                    <input
                      name="Age"
                      value={form.Age}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter your age"
                      type="number"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Gender *
                    </label>
                    <div className="relative">
                      <select
                        name="Gender"
                        onChange={handleChange}
                        value={form.Gender}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white cursor-pointer"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-gray-700">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Company ID
                    </label>
                    <input
                      name="Company_ID"
                      value={form.Company_ID}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter company ID"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1.5 h-6 sm:h-8 bg-green-600 rounded-full mr-3 sm:mr-4"></div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Contact Information
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Phone Number *
                    </label>
                    <input
                      name="Phone_Number"
                      value={form.Phone_Number}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter phone number"
                      type="tel"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      name="WhatsApp_Number"
                      value={form.WhatsApp_Number}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter WhatsApp number"
                      type="tel"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    name="Email"
                    value={form.Email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter email address"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Address *
                  </label>
                  <input
                    name="Address"
                    value={form.Address}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1.5 h-6 sm:h-8 bg-purple-600 rounded-full mr-3 sm:mr-4"></div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Additional Information
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Family Member Count
                  </label>
                  <input
                    name="Family_Member_Count"
                    value={form.Family_Member_Count}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Number of family members"
                    type="number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Food Preference
                  </label>
                  <div className="relative">
                    <select
                      name="Food"
                      onChange={handleChange}
                      value={form.Food}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white cursor-pointer"
                    >
                      <option value="">Select Food Preference</option>
                      <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-gray-700">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-1.5 h-6 sm:h-8 bg-orange-500 rounded-full mr-3 sm:mr-4"></div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Photo Upload
                </h2>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:border-blue-400 transition-colors duration-200">
                <div className="max-w-md mx-auto">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">Upload your photo</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Supports JPG, PNG, JPEG (Max 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4 sm:pt-6">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-500 text-xs sm:text-sm">
            All fields marked with * are required
          </p>
        </div>
      </div>
    </div>
  );
}