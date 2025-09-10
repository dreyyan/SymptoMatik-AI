import { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "../styles/Styles";

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        if (isOpen == false) setIsOpen(true)
        if (isOpen == true) setIsOpen(false)
    }

    return (
        <div className="flex justify-center items-center w-[8%]">
            {/* BURGER MENU */}
            <button onClick={toggleSidebar}>
                <img src="/burger-menu-icon.png" className="w-10 z-1"/>
            </button>

            {/* SIDEBAR MENU */}
            {isOpen &&
                <div className="flex flex-col items-end w-86 h-full bg-white z-1 fixed top-0 right-0 border-l-[2px] shadow-lg">
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
                            <img src="profile-placeholder.png" className="h-20"/>
                        </div>

                        {/* SIDEBAR NAVIGATION LINKS */}
                        <div className={Styles.sidebarLinkSeparatorStyle}><Link to="/analytics"><h3 className={Styles.sidebarLinkStyle}>Analytics</h3></Link></div>
                        <div className={Styles.sidebarLinkSeparatorStyle}><Link to="/case-trends"><h3 className={Styles.sidebarLinkStyle}>Case Trends</h3></Link></div>
                        <div className={Styles.sidebarLinkSeparatorStyle}><Link to="/outbreak-alerts"><h3 className={Styles.sidebarLinkStyle}>Outbreak Alerts</h3></Link></div>
                        <div className={Styles.sidebarLinkSeparatorStyle}><Link to="/collaboration"><h3 className={Styles.sidebarLinkStyle}>Collaboration</h3></Link></div>
                        <div className={Styles.sidebarLinkSeparatorStyle}><Link to="/share-case"><h3 className={Styles.sidebarLinkStyle}>Share Case</h3></Link></div>
                        <div className={Styles.sidebarLinkSeparatorStyle}><Link to="/consult-colleagues"><h3 className={Styles.sidebarLinkStyle}>Consult Colleagues</h3></Link></div>
                        <div className={Styles.sidebarLinkSeparatorStyle}><Link to="/language"><h3 className={Styles.sidebarLinkStyle}>Language</h3></Link></div>
                        <Link to="/"><h3 className="text-lg poppins-semibold relative text-[var(--trust-blue)]">Log Out</h3></Link>
                    </div>
                </div>
            }
        </div>
    );
}

export default BurgerMenu;