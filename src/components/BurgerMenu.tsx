import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../styles/Styles";

const BurgerMenu = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        if (isOpen == false) setIsOpen(true)
        if (isOpen == true) setIsOpen(false)
    }

    const ref = useRef<HTMLDivElement | null>(null);

    // [ EVENT LISTENERS ]
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          // If ref exists AND the clicked target is not inside it
          if (ref.current && !ref.current.contains(event.target as Node)) {
            console.log("Clicked outside!");
            
            // Close 
            setIsOpen(false);
        }
    }

        // Attach listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Cleanup listener
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-center items-center w-[8%]">
            {/* BURGER MENU */}
            <button onClick={toggleSidebar}>
                <img src="/burger-menu-icon.png" className="w-10 z-1"/>
            </button>

            {/* SIDEBAR MENU */}
            {isOpen &&
                <div ref={ref} className="flex flex-col items-end w-86 h-full bg-white z-1 fixed top-0 right-0 border-l-[2px] shadow-lg">
                    {/* CLOSE BUTTON */}
                    {/* <button onClick={toggleSidebar} className="pr-[6%] mt-[8%]">
                        <img src="/exit-icon.png" className="w-8 z-1"/>
                    </button> */}

                    {/* MY PROFILE */}
                    <div className={Styles.sidebarLinkDivStyle}>
                        {/* PROFILE SECTION */}
                        <div className="flex justify-center items-center h-[12%] mb-8 mt-6">
                            {/* NAME & USERNAME */}
                            <div className="flex flex-col justify-center items-end pr-4">
                                <h3 className="text-xl poppins-bold text-[var(--trust-blue)]">Juan de la Cruz</h3>
                                <h4 className="text-xs poppints-semibold text-[var(--trust-blue)]">@juandelacruz09</h4>
                            </div>
                            <Link to="/account"><img src="profile-placeholder.png" className="h-20"/></Link>
                        </div>

                        {/* SIDEBAR NAVIGATION LINKS */}
                        <div className={Styles.sidebarLinkSeparatorStyle}><Link to="/analytics"><h3 className={Styles.sidebarLinkStyle}>Analytics</h3></Link></div>
                        <Link to="/"><h3 className="text-lg poppins-semibold relative text-[var(--trust-blue)]">Log Out</h3></Link>
                    </div>
                    <div className={Styles.sidebarLinkSeparatorStyle}><h3 className={Styles.sidebarLinkStyle}>Language</h3></div>
                </div>
            }
        </div>
    );
}

export default BurgerMenu;