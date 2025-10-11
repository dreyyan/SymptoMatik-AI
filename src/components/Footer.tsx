import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className=" w-full z-100 flex flex-col items-center justify-center gap-2 text-[rgba(26,42,68,0.6)] py-4 bg-white transition duration-300 ease-in-out">
          <div className="flex gap-6">
            <Link to="/about" className="text-sm inter transition duration-150 ease-in-out hover:text-[var(--healing-teal)]">About</Link>
            <Link to="/privacy-policy-and-terms" className="text-sm inter transition duration-150 ease-in-out hover:text-[var(--healing-teal)]">Privacy Policy | Terms of Services</Link>
            <Link to="/help-support" className="text-sm inter transition duration-150 ease-in-out hover:text-[var(--healing-teal)]">Help & Support</Link>
          </div>
          <p className="text-sm text-[var(--slate-gray)]">© 2025 SymptoMatik. All rights reserved.</p>
      </footer>
    );
}

export default Footer;