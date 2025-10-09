import Styles from "../styles/Styles";
import { useNavigate, Link } from "react-router-dom";

const ProfileButton = () => {
    return (
        <div className="flex flex-col justify-center items-end h-full px-6 w-[30%]">
            {/* PROFILE SECTION */}
            <div className="flex justify-center items-center gap-x-4">
                {/* PROFILE PLACEHOLDER */}
                <Link to="/account"><img src="profile-placeholder.png" className="h-12"/></Link>
                {/* NAME & USERNAME */}
                <div className="flex flex-col justify-center pr-4">
                    <h3 className="text-lg font-[600] text-[var(--text)]">Juan de la Cruz</h3>
                    <h4 className="text-sm font-[500] text-[#AEAEAE]">@juandelacruz09</h4>
                </div>
            </div>
        </div>
    );
}

export default ProfileButton;