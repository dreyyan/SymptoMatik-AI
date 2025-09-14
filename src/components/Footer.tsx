import { useNavigate, Link } from "react-router-dom";
import Styles from '../styles/Styles';

// Components
import BurgerMenu from "./BurgerMenu";

const Footer = () => {
    return (
      <footer className="fixed bottom-0 w-full flex flex-col items-center justify-center gap-2 text-[var(--trust-blue)] py-4 shadow-[0px_-4px_10px_-5px_rgba(0,0,0,0.45)] bg-white">
          <div className="flex gap-6">
            <Link to="/about">About</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/help">Help</Link>
          </div>
          <p className="text-sm text-gray-500">© 2025 SymptoMatik. All rights reserved.</p>
      </footer>
    );
}

export default Footer;