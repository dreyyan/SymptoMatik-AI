import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Help = () => {
  document.title = "SymptoMatik: Help";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support request:", { email, message });
    // Add actual submission logic (e.g., API call)
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full bg-[var(--clean-white)] shadow-lg rounded-lg p-8">
          <h1 className="text-3xl inter-semibold text-[var(--trust-blue)] mb-4">Help Center</h1>
          <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mb-3">User Guide</h2>
          <p className="text-gray-700 mb-4">
            Explore our <a href="/user-guide.pdf" className="text-[var(--trust-blue)] hover:underline">User Guide</a> for detailed instructions on using SymptoMatik’s features.
          </p>
          <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mb-3">FAQs</h2>
          <div className="mb-6">
            <h3 className="text-lg text-gray-800">How do I start a diagnosis?</h3>
            <p className="text-gray-700">Navigate to the Diagnosis section, input your symptoms, and follow the prompts.</p>
            <h3 className="text-lg text-gray-800 mt-4">How secure is my data?</h3>
            <p className="text-gray-700">We prioritize your privacy. See our <Link to="/privacy-policy-terms" className="text-[var(--trust-blue)] hover:underline">Privacy Policy</Link> for details.</p>
          </div>
          <h2 className="text-xl inter-semibold text-[var(--trust-blue)] mb-3">Contact Support</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm inter-semibold text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)]"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm inter-semibold text-gray-700">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)]"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[var(--trust-blue)] text-[var(--clean-white)] px-6 py-2 rounded-md hover:bg-[var(--healing-teal)] transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

    {/* Footer */}
    <Footer />
    </div>
  );
};

export default Help;