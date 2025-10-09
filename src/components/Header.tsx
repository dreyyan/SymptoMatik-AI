import Styles from "../styles/Styles";
import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import BurgerMenu from "./BurgerMenu";
import ProfileButton from "../components/ProfileButton";

const Header = () => {
  const [hovered, setHovered] = useState({
    diagnosis: false,
    analytics: false,
    consultation: false,
  });

  const handleHover = (key, state) => {
    setHovered((prev) => ({ ...prev, [key]: state }));
  };

  return (
    <div className="sticky top-0 z-50 h-22 row-span-6 col-span-3 bg-[var(--clean-white)] shadow-[0px_4px_10px_-5px_rgba(0,0,0,0.45)]">
      <div className="flex h-full">
        {/* [L] BANNER */}
        <div className="flex justify-center items-center pl-8 pr-14 bg-white-500 w-[24%]">
          <Link to="/home" className="flex items-center gap-4 h-[50%]">
            <img src="/symptomatik-logo.svg" className="h-10" />
            <img src="/symptomatik-banner.svg" className="h-full" />
          </Link>
        </div>

        {/* [C] NAVIGATION LINKS */}
        <div className="flex flex-row justify-end items-center gap-x-[6%] w-full">
          <Link to="/diagnosis">
            <img
              src={
                hovered.diagnosis
                  ? "diagnosis-icon-hover.svg"
                  : "diagnosis-icon.svg"
              }
              onMouseEnter={() => handleHover("diagnosis", true)}
              onMouseLeave={() => handleHover("diagnosis", false)}
              className="w-7 transition-all duration-150 hover:scale-105"
              alt="Diagnosis"
            />
          </Link>

          <Link to="/analytics">
            <img
              src={
                hovered.analytics
                  ? "analytics-icon-hover.svg"
                  : "analytics-icon.svg"
              }
              onMouseEnter={() => handleHover("analytics", true)}
              onMouseLeave={() => handleHover("analytics", false)}
              className="w-7 transition-all duration-150 hover:scale-105"
              alt="Analytics"
            />
          </Link>

          <Link to="/consultation">
            <img
              src={
                hovered.consultation
                  ? "consultation-icon-hover.svg"
                  : "consultation-icon.svg"
              }
              onMouseEnter={() => handleHover("consultation", true)}
              onMouseLeave={() => handleHover("consultation", false)}
              className="w-7 transition-all duration-150 hover:scale-105"
              alt="Consultation"
            />
          </Link>
        </div>

        {/* [R] USER PROFILE */}
        <ProfileButton />
      </div>
    </div>
  );
};

export default Header;
