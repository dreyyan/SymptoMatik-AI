import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  licenseNumber?: string; // Optional for non-pediatrician users
}

const MyProfile = () => {
  document.title = "SymptoMatik: My Profile";

  // Mock user data
  const profile: UserProfile = {
    name: "Dr. Juan dela Cruz",
    email: "juan.delacruz@gmail.com",
    phone: "09123456789",
    licenseNumber: "123456",
  };

  // Mock user statistics
  const stats = {
    diagnosesPerformed: 42,
    consultationsBooked: 15,
    lastDiagnosisDate: "October 10, 2025",
    mostTrackedSymptoms: ["Fever", "Cough", "Headache"], // From data.json
    mostTrackedDiseases: ["Influenza", "Common Cold"], // From data.json
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6 md:p-8">
        <h1 className="text-3xl inter-semibold text-[var(--trust-blue)] mt-4 mb-6">My Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] md:col-span-2">
            <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Profile Details</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              {profile.licenseNumber && (
                <p><strong>License Number:</strong> {profile.licenseNumber}</p>
              )}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Usage Statistics</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Diagnoses Performed:</strong> {stats.diagnosesPerformed}</p>
              <p><strong>Consultations Booked:</strong> {stats.consultationsBooked}</p>
              <p><strong>Last Diagnosis:</strong> {stats.lastDiagnosisDate}</p>
              <p>
                <strong>Most Tracked Symptoms:</strong>{" "}
                {stats.mostTrackedSymptoms.join(", ")}
              </p>
              <p>
                <strong>Most Tracked Diseases:</strong>{" "}
                {stats.mostTrackedDiseases.join(", ")}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white p-6 rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg inter-semibold text-[var(--trust-blue)] mb-4">Navigation (For Patients)</h2>
            <div className="space-y-2">
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
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyProfile;