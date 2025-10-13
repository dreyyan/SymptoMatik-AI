import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../data/data.json"; // Import symptomMetadata and diseases

const Settings = () => {
  document.title = "SymptoMatik: Settings";

  // State for user settings
  const [name, setName] = useState("Dr. Juan dela Cruz"); // Mock user name
  const [phone, setPhone] = useState("+639123456789"); // Mock phone (PH-based)
  const [licenseNumber, setLicenseNumber] = useState("123456"); // Mock license number
  const [email, setEmail] = useState("user@example.com"); // Mock user email
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    monitoredDiseases: ["Influenza", "Dengue Fever"],
  });
  const [dataPrivacy, setDataPrivacy] = useState({
    shareData: true,
    storeHealthData: true,
  });

  // Available diseases from data.json
  const availableDiseases = data.diseases.map(d => d.diseaseName);

  // Handle form submission (mock)
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save logic (e.g., API call)
    console.log("Saving settings:", { name, phone, licenseNumber, email, password, notifications, dataPrivacy });
    alert("Settings saved successfully!");
  };

  // Toggle monitored diseases
  const toggleDisease = (disease: string) => {
    setNotifications(prev => ({
      ...prev,
      monitoredDiseases: prev.monitoredDiseases.includes(disease)
        ? prev.monitoredDiseases.filter(d => d !== disease)
        : [...prev.monitoredDiseases, disease],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Settings Section */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full bg-[var(--clean-white)] shadow-lg rounded-lg p-8">
          <h1 className="text-3xl inter-semibold text-[var(--trust-blue)] mb-4">Settings</h1>

          {/* Account Settings */}
          <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mb-3">Account Settings</h2>
          <form onSubmit={handleSaveSettings} className="space-y-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--trust-blue)] focus:outline-none text-gray-700"
                aria-label="Update name"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone (PH-based)
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--trust-blue)] focus:outline-none text-gray-700"
                aria-label="Update phone number"
                placeholder="+63"
                pattern="\+63[0-9]{10}"
                required
              />
            </div>
            <div>
              <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--trust-blue)] focus:outline-none text-gray-700"
                aria-label="Update license number"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--trust-blue)] focus:outline-none text-gray-700"
                aria-label="Update email address"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--trust-blue)] focus:outline-none text-gray-700"
                aria-label="Update password"
                placeholder="Enter new password"
              />
            </div>

            {/* Notification Preferences */}
            <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mt-6 mb-3">Notification Preferences</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailAlerts"
                  checked={notifications.emailAlerts}
                  onChange={() => setNotifications({ ...notifications, emailAlerts: !notifications.emailAlerts })}
                  className="h-4 w-4 text-[var(--trust-blue)] focus:ring-[var(--trust-blue)] border-gray-300 rounded"
                  aria-label="Toggle email notifications for outbreak alerts"
                />
                <label htmlFor="emailAlerts" className="ml-2 text-sm text-gray-700">
                  Receive email notifications for outbreak alerts
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsAlerts"
                  checked={notifications.smsAlerts}
                  onChange={() => setNotifications({ ...notifications, smsAlerts: !notifications.smsAlerts })}
                  className="h-4 w-4 text-[var(--trust-blue)] focus:ring-[var(--trust-blue)] border-gray-300 rounded"
                  aria-label="Toggle SMS notifications for outbreak alerts"
                />
                <label htmlFor="smsAlerts" className="ml-2 text-sm text-gray-700">
                  Receive SMS notifications for outbreak alerts
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monitored Diseases
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableDiseases.map(d => (
                    <div key={d} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`disease-${d}`}
                        checked={notifications.monitoredDiseases.includes(d)}
                        onChange={() => toggleDisease(d)}
                        className="h-4 w-4 text-[var(--trust-blue)] focus:ring-[var(--trust-blue)] border-gray-300 rounded"
                        aria-label={`Toggle monitoring for ${d}`}
                      />
                      <label htmlFor={`disease-${d}`} className="ml-2 text-sm text-gray-700">
                        {d}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Privacy */}
            <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mt-6 mb-3">Data Privacy</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="shareData"
                  checked={dataPrivacy.shareData}
                  onChange={() => setDataPrivacy({ ...dataPrivacy, shareData: !dataPrivacy.shareData })}
                  className="h-4 w-4 text-[var(--trust-blue)] focus:ring-[var(--trust-blue)] border-gray-300 rounded"
                  aria-label="Toggle data sharing for analytics"
                />
                <label htmlFor="shareData" className="ml-2 text-sm text-gray-700">
                  Share anonymized data for health analytics
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="storeHealthData"
                  checked={dataPrivacy.storeHealthData}
                  onChange={() => setDataPrivacy({ ...dataPrivacy, storeHealthData: !dataPrivacy.storeHealthData })}
                  className="h-4 w-4 text-[var(--trust-blue)] focus:ring-[var(--trust-blue)] border-gray-300 rounded"
                  aria-label="Toggle storage of health data"
                />
                <label htmlFor="storeHealthData" className="ml-2 text-sm text-gray-700">
                  Store health data for personalized diagnostics
                </label>
              </div>
              <button
                type="button"
                onClick={() => alert("Health data cleared (mock action).")}
                className="text-sm text-[var(--trust-blue)] hover:underline focus:ring-2 focus:ring-[var(--trust-blue)] focus:outline-none"
                aria-label="Clear stored health data"
              >
                Clear Stored Health Data
              </button>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="mt-6 inline-block bg-[var(--trust-blue)] text-[var(--clean-white)] px-6 py-2 rounded-md hover:bg-[var(--healing-teal)] transition-colors duration-200"
            >
              Save Settings
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-2">
            <p className="text-gray-700">
              Need help? Visit our <Link to="/help" className="text-[var(--trust-blue)] hover:underline">Help Center</Link>.
            </p>
            <p className="text-gray-700">
              Review our <Link to="/privacy-terms" className="text-[var(--trust-blue)] hover:underline">Privacy Policy & Terms</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Settings;