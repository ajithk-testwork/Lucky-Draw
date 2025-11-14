import axios from "axios";
import React, { useState } from "react";

export default function EventForm() {
  const [form, setForm] = useState({
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
  });

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

    const res = await axios.post("http://localhost:1337/api/upload", fd);
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
        "http://localhost:1337/api/event-forms",
        {
          data: {
            ...form,
            Photo: photoId, // PUT FILE ID HERE
          },
        }
      );

      console.log("SUCCESS:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("ERROR:", error.response?.data || error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Event Registration Form</h1>
          <p className="text-gray-600 text-lg">Please fill in your details below</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Personal Information Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full mr-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    name="Name"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    name="Age"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your age"
                    type="number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <div className="relative">
                    <select
                      name="Gender"
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white cursor-pointer"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company ID
                  </label>
                  <input
                    name="Company_ID"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter company ID"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-1.5 h-8 bg-green-600 rounded-full mr-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="Phone_Number"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter phone number"
                    type="tel"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    name="WhatsApp_Number"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter WhatsApp number"
                    type="tel"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    name="Email"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter email address"
                    type="email"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    name="Address"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-1.5 h-8 bg-purple-600 rounded-full mr-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Family Member Count
                  </label>
                  <input
                    name="Family_Member_Count"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Number of family members"
                    type="number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Food Preference
                  </label>
                  <div className="relative">
                    <select
                      name="Food"
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none bg-white cursor-pointer"
                    >
                     
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-1.5 h-8 bg-orange-500 rounded-full mr-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Photo Upload</h2>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-2">Upload your photo</p>
                  <p className="text-gray-400 text-sm mb-4">Supports JPG, PNG, JPEG (Max 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            All fields marked with * are required
          </p>
        </div>
      </div>
    </div>
  );
}