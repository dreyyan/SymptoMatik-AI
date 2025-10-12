import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicyTerms = () => {
  document.title = "SymptoMatik: Privacy Policy & Terms";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full bg-[var(--clean-white)] shadow-lg rounded-lg p-8">
          <h1 className="text-3xl inter-semibold text-[var(--trust-blue)] mb-4">Privacy Policy & Terms of Service</h1>
          <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mb-3">Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            At SymptoMatik, we are committed to protecting your privacy. We collect personal information (e.g., email, health data) only to provide and improve our services. Data is stored securely and never shared without consent, except as required by law.
          </p>
          <p className="text-gray-700 mb-6">
            For details, contact us at <a href="mailto:support@symptomatik.com" className="text-[var(--trust-blue)] hover:underline">support@symptomatik.com</a> or visit our <Link to="/help" className="text-[var(--trust-blue)] hover:underline">Help Center</Link>.
          </p>
          <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mb-3">Terms of Service</h2>
          <p className="text-gray-700 mb-4">
            By using SymptoMatik, you agree to our terms, including responsible use of our diagnostic tools and consultation services. You must be 18 or older to create an account. We reserve the right to update these terms as needed.
          </p>
          <p className="text-gray-700 mb-6">
            Questions? Reach out via our <Link to="/help" className="text-[var(--trust-blue)] hover:underline">Help Center</Link>.
          </p>
          <Link
            to="/about"
            className="inline-block bg-[var(--trust-blue)] text-[var(--clean-white)] px-6 py-2 rounded-md hover:bg-[var(--healing-teal)] transition-colors duration-200"
          >
            Learn More About Us
          </Link>
        </div>
      </div>

    {/* Footer */}
    <Footer />
    </div>
  );
};

export default PrivacyPolicyTerms;