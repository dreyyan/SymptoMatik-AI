import { useState } from "react";
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
    name: "Dr. Juan dela Cruz",
    email: "juan.delacruz@gmail.com",
    phone: "09123456789",
    licenseNumber: "123456",
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
    // In a real app, save to backend or localStorage
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
      // In a real app, call API to delete account
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl inter-semibold text-[var(--trust-blue)] mt-4 mb-4">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
            <span className="flex gap-x-1">
                <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Profile Details</h2>
                <button
                  className="cursor-pointer flex items-center justify-center w-8 h-8 mr-6 rounded-full hover:opacity-70 transition-all duration-300"
                  onClick={() => setIsEditing(true)}
                >
                  <img className="w-5" src="edit-details-icon.svg" alt="Edit Details Icon" />
                </button>
            </span>
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-y-1">
                  <label className="block text-sm inter-semibold text-[var(--trust-blue)]">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="block text-sm inter-semibold text-[var(--trust-blue)]">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="block text-sm inter-semibold text-[var(--trust-blue)]">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label className="block text-sm inter-semibold text-[var(--trust-blue)]">License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full inter text-sm rounded-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--healing-teal)] focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-full bg-[var(--trust-blue)] text-[var(--clean-white)] hover:bg-blue-200 transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-full bg-gray-100 text-[var(--trust-blue)] hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm inter text-[var(--trust-blue)]">
                  <strong>Name:</strong> {profile.name}
                </p>
                <p className="text-sm inter text-[var(--trust-blue)]">
                  <strong>Email:</strong> {profile.email}
                </p>
                <p className="text-sm inter text-[var(--trust-blue)]">
                  <strong>Phone:</strong> {profile.phone}
                </p>
                <p className="text-sm inter text-[var(--trust-blue)]">
                  <strong>License Number:</strong> {profile.licenseNumber}
                </p>
              </div>
            )}
          </div>
          {/* Subscription Section */}
          {/* <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Subscription Plan</h2>
            <p className="text-sm inter text-gray-600">
              <strong>Current Plan:</strong> SuperGrok
            </p>
            <p className="text-sm inter text-gray-600 mt-2">
              For details or to change your plan, visit{" "}
              <a href="https://x.ai/grok" className="text-[var(--trust-blue)] hover:underline">
                x.ai/grok
              </a>.
            </p>
            <p className="text-sm inter text-gray-600 mt-2">
              Available Plans:
            </p>
            <ul className="list-disc list-inside text-sm inter text-gray-600 mt-2">
              <li>Free Plan: Limited usage quotas</li>
              <li>SuperGrok: Higher usage quotas</li>
            </ul>
          </div> */}
          {/* Privacy Settings Section */}
          <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Data Privacy Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm inter text-gray-600">
                <input
                  type="checkbox"
                  name="shareData"
                  checked={privacySettings.shareData}
                  onChange={handlePrivacyChange}
                  className="h-4 w-4 text-[var(--healing-teal)] accent-[var(--healing-teal)] focus:ring-[var(--healing-teal)] border-[var(--slate-gray)] rounded"
                />
                Share anonymized data for research
              </label>
              <label className="flex items-center gap-2 text-sm inter text-gray-600">
                <input
                  type="checkbox"
                  name="receiveUpdates"
                  checked={privacySettings.receiveUpdates}
                  onChange={handlePrivacyChange}
                  className="h-4 w-4 text-[var(--healing-teal)] accent-[var(--healing-teal)] focus:ring-[var(--healing-teal)] border-[var(--slate-gray)] rounded"
                />
                Receive email updates and newsletters
              </label>
              <button
                onClick={handleDeleteAccount}
                className="cursor-pointer flex items-center justify-center mt-8 px-4 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
          {/* Navigation Links */}
          {/* <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Navigation</h2>
            <div className="space-y-2">
              <Link
                to=".."
                className="block text-sm inter text-[var(--trust-blue)] hover:underline"
              >
                Log out
              </Link>
              <Link
                to="../diagnosis-patient"
                className="block text-sm inter text-[var(--trust-blue)] hover:underline"
              >
                Diagnosis - Patient
              </Link>
              <Link
                to="../consultation-patient"
                className="block text-sm inter text-[var(--trust-blue)] hover:underline"
              >
                Consultation - Patient
              </Link>
            </div>
          </div> */}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Account;