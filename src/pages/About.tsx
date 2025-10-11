import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  document.title = "SymptoMatik: About";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full bg-[var(--clean-white)] shadow-lg rounded-lg p-8">
          <h1 className="text-3xl inter-semibold text-[var(--trust-blue)] mb-4">About SymptoMatik</h1>
          <p className="text-lg text-gray-700 mb-6">
            SymptoMatik is an innovative health platform designed to empower medical professionals with advanced diagnostic tools, analytics, and consultation services. Our mission is to make healthcare accessible, efficient, and personalized through cutting-edge technology.
          </p>
          <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mb-3">Our Features</h2>
          <ul className="list-disc pl-5 text-gray-700 mb-6">
            <li>Accurate diagnostics powered by AI-driven analysis.</li>
            <li>Comprehensive analytics to track and understand health trends.</li>
            <li>Secure consultations with healthcare professionals.</li>
            <li>User-friendly interface for seamless navigation.</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Founded in 2025, SymptoMatik is committed to improving lives by providing reliable health insights and support. Learn more in our <Link to="/help" className="text-[var(--trust-blue)] hover:underline">Help Center</Link> or review our <Link to="/privacy-policy-and-terms" className="text-[var(--trust-blue)] hover:underline">Privacy Policy & Terms</Link>.
          </p>
          <button
            onClick={() => window.location.href = "mailto:adriandominic.tan@wvsu.edu.ph"}
            className="bg-[var(--trust-blue)] text-[var(--clean-white)] px-6 py-2 rounded-md hover:bg-[var(--healing-teal)] transition-colors duration-200"
          >
            Contact Us
          </button>
        </div>
      </div>

    {/* Footer */}
    <Footer />
    </div>
  );
};

export default About;