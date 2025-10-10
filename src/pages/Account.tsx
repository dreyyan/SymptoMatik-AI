import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface PediatricianProfile {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
}

const Account = () => {
  // Mock pediatrician data
  const [profile, setProfile] = useState<PediatricianProfile>({
    name: "Dr. Jane Smith",
    email: "jane.smith@pediatrics.com",
    phone: "(123) 456-7890",
    licenseNumber: "PED123456",
  });

  // State for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PediatricianProfile>({ ...profile });

  // State for privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    receiveUpdates: true,
  });

  // Handle profile form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile save
  const handleSaveProfile = () => {
    setProfile(formData);
    setIsEditing(false);
    console.log("Profile updated:", formData);
  };

  // Handle privacy settings change
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPrivacySettings((prev) => ({ ...prev, [name]: checked }));
    console.log("Privacy settings updated:", { ...privacySettings, [name]: checked });
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested");
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6 flex gap-6">
        {/* Sidebar: Navigation */}
        {/* <div className="w-1/4 bg-white rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] p-6">
          <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Navigation</h2>
          <div className="space-y-3">
            <Link
              to=".."
              className="block text-sm inter text-[var(--trust-blue)] hover:bg-blue-100 hover:text-[var(--trust-blue)] px-3 py-2 rounded-md transition-all duration-300"
            >
              Log out
            </Link>
            <Link
              to="../diagnosis-patient"
              className="block text-sm inter text-[var(--trust-blue)] hover:bg-blue-100 hover:text-[var(--trust-blue)] px-3 py-2 rounded-md transition-all duration-300"
            >
              Diagnosis - Patient
            </Link>
            <Link
              to="../consultation-patient"
              className="block text-sm inter text-[var(--trust-blue)] hover:bg-blue-100 hover:text-[var(--trust-blue)] px-3 py-2 rounded-md transition-all duration-300"
            >
              Consultation - Patient
            </Link>
          </div>
        </div> */}
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl inter-semibold text-[var(--trust-blue)] mt-4">Account Settings</h1>
          {/* Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.3)] transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <img
                className="w-12 h-12 rounded-full"
                src="doctor-icon.webp"
                alt="Profile Icon"
              />
              <h2 className="text-lg inter-semibold text-[var(--trust-blue)]">Profile Details</h2>
            </div>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm inter text-[var(--slate-gray)] mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-[var(--trust-blue)] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm inter text-[var(--slate-gray)] mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-[var(--trust-blue)] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm inter text-[var(--slate-gray)] mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-[var(--trust-blue)] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm inter text-[var(--slate-gray)] mb-1">License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-[var(--trust-blue)] transition-all duration-300"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--trust-blue)] text-white hover:bg-blue-600 transition-all duration-300"
                  >
                    <img className="w-5" src="save-icon.svg" alt="Save Icon" />
                    Save Profile
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-[var(--slate-gray)] hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm inter text-[var(--slate-gray)]">
                  <strong>Name:</strong> {profile.name}
                </p>
                <p className="text-sm inter text-[var(--slate-gray)]">
                  <strong>Email:</strong> {profile.email}
                </p>
                <p className="text-sm inter text-[var(--slate-gray)]">
                  <strong>Phone:</strong> {profile.phone}
                </p>
                <p className="text-sm inter text-[var(--slate-gray)]">
                  <strong>License Number:</strong> {profile.licenseNumber}
                </p>
              <div className="flex gap-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-2 py-2 rounded-full bg-[var(--healing-teal)] text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                  >
                    <img className="w-5" src="edit-icon.svg" alt="Edit Icon" />
                  </button>
                  <button
                    className="px-2 py-2 rounded-full bg-[var(--healing-teal)] text-[var(--trust-blue)] hover:bg-blue-200 transition-all duration-300"
                  >
                    <img className="w-5" src="upload-icon.svg" alt="Upload Icon" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Subscription and Privacy Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subscription Section */}
            <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.3)] transition-shadow duration-300">
              <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">SymptoMatik Subscription</h2>
              <div className="space-y-3">
                <p className="text-sm inter text-[var(--slate-gray)]">
                  <strong>Current Plan:</strong> Premium
                </p>
                <p className="text-sm inter text-[var(--slate-gray)]">
                  For details or to change your plan, visit{" "}
                  <a href="https://symptomatik.com/plans" className="text-[var(--trust-blue)] hover:underline">
                    symptomatik.com/plans
                  </a>.
                </p>
                <p className="text-sm inter text-[var(--slate-gray)]">Available Plans:</p>
                <ul className="list-disc list-inside text-sm inter text-[var(--slate-gray)]">
                  <li><b>Free Plan:&nbsp;</b>Up to 5 diagnoses/month, 1 consultation hour</li>
                  <li><b>Premium:&nbsp;</b>Unlimited diagnoses, 10 consultation hours, 50 patient file storage</li>
                  <li><b>Professional:&nbsp;</b>Unlimited diagnoses, 50 consultation hours, advanced analytics, priority support</li>
                </ul>
                <button
                  onClick={() => console.log("Manage plan clicked")}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--healing-teal)] text-white hover:bg-teal-600 transition-all duration-300"
                >
                  <img className="w-5" src="manage-icon.svg" alt="Manage Icon" />
                  Manage Plan
                </button>
              </div>
            </div>
            {/* Privacy Settings Section */}
            <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.3)] transition-shadow duration-300">
              <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Data Privacy Settings</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm inter text-[var(--slate-gray)]">
                  <input
                    type="checkbox"
                    name="shareData"
                    checked={privacySettings.shareData}
                    onChange={handlePrivacyChange}
                    className="h-4 w-4 text-[var(--healing-teal)] focus:ring-[var(--healing-teal)] border-gray-300 rounded"
                  />
                  Share anonymized data for research
                </label>
                <label className="flex items-center gap-2 text-sm inter text-[var(--slate-gray)]">
                  <input
                    type="checkbox"
                    name="receiveUpdates"
                    checked={privacySettings.receiveUpdates}
                    onChange={handlePrivacyChange}
                    className="h-4 w-4 text-[var(--healing-teal)] focus:ring-[var(--healing-teal)] border-gray-300 rounded"
                  />
                  Receive email updates and newsletters
                </label>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
                >
                  <img className="w-5" src="delete-icon.svg" alt="Delete Icon" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Account;