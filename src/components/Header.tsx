import Styles from "../styles/Styles";
import { useNavigate, Link } from "react-router-dom";

// Components
import BurgerMenu from "./BurgerMenu";
import ProfileButton from "../components/ProfileButton";

const Header = () => {
    return (
        <div className="sticky top-0 z-50 h-22 row-span-6 col-span-3 bg-[var(--clean-white)] shadow-[0px_4px_10px_-5px_rgba(0,0,0,0.45)]">
            <div className="flex h-full">
                {/* [L] BANNER */}
                <div className="flex justify-center items-center pl-8 pr-14 bg-white-500 w-[24%]">
                    <Link to="/home" className="flex items-center gap-2 h-[50%]">
                        <img src="/symptomatik-logo.svg" className="h-12"/>
                        <img src="/symptomatik-banner.png" className="h-full"/>
                    </Link>
                </div>
                {/* [C]: NAVIGATION LINKS */}
                <div className="flex flex-row justify-end items-center gap-x-[6%] w-full">
                    <Link to="/home"><h3 className={Styles.navigationLinkStyle}>Home</h3></Link>
                    <Link to="/diagnosis"><h3 className={Styles.navigationLinkStyle}>Diagnosis</h3></Link>
                    <Link to="/analytics"><h3 className={Styles.navigationLinkStyle}>Analytics</h3></Link>
                    <Link to="/help"><h3 className={Styles.navigationLinkStyle}>Help</h3></Link>
                </div>
                {/* [R] USER PROFILE */}
                <ProfileButton/>
            </div>
        </div>
    );
}

export default Header;