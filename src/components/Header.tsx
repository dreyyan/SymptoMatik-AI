import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // STATES
  const [hovered, setHovered] = useState({
    diagnosis: false,
    analytics: false,
    consultation: false,
  });
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);

  // [HANDLE]: Interaction
  const handleHover = (key: string, state: boolean) => {
    setHovered((prev) => ({ ...prev, [key]: state }));
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // [HANDLE]: Navigation
  const navigateToMyProfile = () => {
    console.log("Navigating to /my-profile");
    navigate("/my-profile");
    setIsProfileDropdownOpen(false);
  };

  const navigateToSettings = () => {
    console.log("Navigating to /settings");
    navigate("/settings");
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out");
    navigate("/sign-in");
    setIsProfileDropdownOpen(false);
  };

  return (
    <div className="sticky top-0 z-[1001] h-24 row-span-6 col-span-3 shadow-[0px_4px_10px_-5px_rgba(0,0,0,0.45)] bg-gradient-to-r from-[var(--trust-blue)] to-[var(--healing-teal)]">
      <div className="flex h-full">
        {/* [L] Banner: SymptoMatik */}
        <div className="flex justify-center items-center pl-8 pr-14 bg-white-500 w-[600px]">
          <Link to="/home" className="flex items-center gap-4 h-[50%]">
            <img src="/symptomatik-white-logo.png" className="h-10" />
            <img src="/symptomatik-white-banner.png" className="w-50" />
          </Link>
        </div>

        {/* [C] Navigation Links */}
        <div className="flex flex-row justify-end items-center md:gap-x-[10%] lg:gap-x-[6%] w-full pr-[2%]">
          <div className="relative">
            {/* Link: Diagnosis */}
            <Link to="/diagnosis" onMouseEnter={() => handleHover("diagnosis", true)} onMouseLeave={() => handleHover("diagnosis", false)}>
              <img
                src="diagnosis-icon.svg"
                className="w-8 transition-all duration-150 hover:scale-105"
                alt="Diagnosis"
              />
            </Link>
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-[-1.3rem] text-xs inter-semibold text-[var(--clean-white)] transition-all duration-300 ease-in-out ${
                hovered.diagnosis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Diagnosis
            </span>
          </div>

          {/* Link: Analytics */}
          <div className="relative">
            <Link to="/analytics" onMouseEnter={() => handleHover("analytics", true)} onMouseLeave={() => handleHover("analytics", false)}>
              <img
                src="analytics-icon.svg"
                className="w-8 transition-all duration-150 hover:scale-105"
                alt="Analytics"
              />
            </Link>
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-[-1.3rem] text-xs inter-semibold text-[var(--clean-white)] transition-all duration-300 ease-in-out ${
                hovered.analytics ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Analytics
            </span>
          </div>

          {/* Link: Consultation */}
          <div className="relative">
            <Link to="/consultation" onMouseEnter={() => handleHover("consultation", true)} onMouseLeave={() => handleHover("consultation", false)}>
              <img
                src="consultation-icon.svg"
                className="w-8 transition-all duration-150 hover:scale-105"
                alt="Consultation"
              />
            </Link>
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-[-1.3rem] text-xs inter-semibold text-[var(--clean-white)] transition-all duration-300 ease-in-out ${
                hovered.consultation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Consultation
            </span>
          </div>
        </div>

        {/* [R] USER PROFILE */}
        <div className="flex flex-col justify-center items-end h-full px-6 lg:w-[500px]">
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={toggleProfileDropdown}
              className="flex justify-center items-center gap-x-4 cursor-pointer"
              aria-expanded={isProfileDropdownOpen}
              aria-label="Profile menu"
            >
              <div className="flex gap-x-4">
                {/* Profile Picture Placeholder */}
                <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-md inter-semibold">
                  J
                </div>
                {/* Name & Username */}
                <div className="flex flex-col pr-4 h-auto">
                  <h3 className="text-md inter-semibold text-[var(--clean-white)]">
                  Juan de la Cruz
                  </h3>
                  <h4 className="text-xs text-start font-[500] text-[var(--clean-white)]">
                  @juandelacruz09
                  </h4>
                </div>
              </div>
            </button>
            {/* Profile Dropdown */}
            {isProfileDropdownOpen && (
              <div
                className={`absolute top-full right-0 mt-2 w-40 shadow-lg bg-[var(--clean-white)] rounded-md py-2 z-50 transition-all duration-300 ease-in-out transform-gpu origin-top-right ${
                  isProfileDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {/* Link: My Profile */}
                <button
                  onClick={(event) => {
                    console.log("Clicked My Profile");
                    event.stopPropagation();
                    navigateToMyProfile();
                  }}
                  className="cursor-pointer block w-full text-left px-4 py-2 text-sm inter-semibold text-[var(--trust-blue)] hover:bg-[rgba(74,94,109,0.4)]/20 transition-colors duration-200"
                  aria-label="My Profile"
                >
                  My Profile
                </button>
                {/* Link: Settings */}
                <button
                  onClick={(event) => {
                    console.log("Clicked Settings");
                    event.stopPropagation();
                    navigateToSettings();
                  }}
                  className="cursor-pointer block w-full text-left px-4 py-2 text-sm inter-semibold text-[var(--trust-blue)] hover:bg-[rgba(74,94,109,0.4)]/20 transition-colors duration-200"
                  aria-label="Settings"
                >
                  Settings
                </button>
                {/* Link: Log Out */}
                <button
                  onClick={(event) => {
                    console.log("Clicked Log Out");
                    event.stopPropagation();
                    handleLogout();
                  }}
                  className="cursor-pointer block w-full text-left px-4 py-2 text-sm inter-semibold text-[#da4b41ff] hover:bg-[rgba(74,94,109,0.4)]/20 transition-colors duration-200"
                  aria-label="Log Out"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;