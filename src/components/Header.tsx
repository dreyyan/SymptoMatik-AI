import Styles from "../styles/Styles";
import { useNavigate, Link } from "react-router-dom";

// Components
import BurgerMenu from "./BurgerMenu";

const Header = () => {
    return (
        <div className="h-20 row-span-6 col-span-3 bg-gradient-to-t from-transparent from-30% to-[var(--clean-white)] to-80%">
            <div className="flex h-full">
                {/* [L] BANNER */}
                <div className="flex justify-center items-center pl-12 pr-14 bg-white-500 w-[24%]">
                    <Link to="/home">
                        <img src="/symptomatik-banner.png" className="h-full"/>
                    </Link>
                </div>
                {/* [C]: NAVIGATION LINKS */}
                <div className="flex flex-row justify-start items-center gap-x-[8%] w-[70%] pt-2">
                    <input type="text" placeholder="Enter to search..." className={Styles.searchBarStyle}/>
                    <Link to="/home"><h3 className={Styles.navigationLinkStyle}>Home</h3></Link>
                    <Link to="/diagnosis"><h3 className={Styles.navigationLinkStyle}>Diagnosis</h3></Link>
                    <Link to="/help"><h3 className={Styles.navigationLinkStyle}>Help</h3></Link>
                </div>
                {/* [R]: BURGER MENU */}
                <BurgerMenu/>
            </div>
        </div>
    );
}

export default Header;