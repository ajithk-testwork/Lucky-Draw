// Complete working EditPopup.jsx (fixed 400 error)
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const EditPopup = ({ user, onClose, onSaved }) => {
  const [form, setForm] = useState({
    Name: "",
    Member_ID: "",
    Address: "",
    Age: "",
    Gender: "",
    Phone_Number: "",
    WhatsApp_Number: "",
    Email: "",
    Family_Member_Count: "",
    Company_ID: "",
    Food: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    setForm({
      Name: user.name || "",
      Member_ID: user.userId || "",
      Address: user.address || "",
      Age: user.age || "",
      Gender: user.gender || "",
      Phone_Number: user.phone || "",
      WhatsApp_Number: user.whatsapp || "",
      Email: user.email || "",
      Family_Member_Count: user.familyCount || "",
      Company_ID: user.companyId || "",
      Food: user.food || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoFile(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      let uploadedPhoto = null;

      if (photoFile) {
        const fd = new FormData();
        fd.append("files", photoFile);

        const uploadRes = await axios.post(
          "https://api.moviemads.com/api/upload",
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (Array.isArray(uploadRes.data) && uploadRes.data.length > 0) {
          uploadedPhoto = uploadRes.data[0];
        }
      }

      // MUST match Strapi field names exactly
      const payload = {
  Name: form.Name,
  Member_ID: form.Member_ID,
  Address: form.Address,
  Age: Number(form.Age) || 0,
  Gender: form.Gender, // Must be "Male", "Female", or "Other"
  Phone_Number: form.Phone_Number ? Number(form.Phone_Number) : null,
  WhatsApp_Number: form.WhatsApp_Number ? Number(form.WhatsApp_Number) : null,
  Email: form.Email,
  Family_Member_Count: Number(form.Family_Member_Count) || 0,
  Company_ID: form.Company_ID,
  Food: form.Food, // Must be "Veg" or "Non-Veg"
};


      if (uploadedPhoto) {
        payload.Photo = uploadedPhoto.id;
      }

      await axios.put(
        `https://api.moviemads.com/api/event-forms/${user.userId}`,
        { data: payload }
      );

      setSaving(false);
      onSaved();
    } catch (err) {
      console.error("Update error:", err);
      setSaving(false);
      setError("Failed to update participant. Check required fields.");
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">Edit Participant</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-red-50 text-red-600">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-8">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-44 h-44 rounded-xl overflow-hidden border shadow-md">
              <img
                src={photoFile ? URL.createObjectURL(photoFile) : user.userImage}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-5 w-full">
              <label className="text-sm font-medium text-gray-700">Change Photo</label>
              <input type="file" accept="image/*" onChange={handleFile} className="mt-2 w-full text-sm" />
              {photoFile && <p className="text-xs text-gray-600 mt-1">Selected: {photoFile.name}</p>}
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Name", "Name"],
                ["Member ID", "Member_ID"],
                ["Phone Number", "Phone_Number"],
                ["WhatsApp Number", "WhatsApp_Number"],
                ["Email", "Email"],
                ["Company ID", "Company_ID"],
                ["Age", "Age"],
                ["Family Members", "Family_Member_Count"],
                ["Gender", "Gender"],
                ["Food", "Food"],
              ].map(([label, field]) => (
                <div key={field}>
                  <label className="text-xs text-gray-600 font-semibold">{label}</label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="text-xs text-gray-600 font-semibold">Address</label>
                <textarea
                  name="Address"
                  value={form.Address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
            </div>

            {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update"}
              </button>

              <button onClick={onClose} className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-sm hover:bg-red-700" disabled={saving}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;