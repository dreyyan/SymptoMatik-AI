import Styles from "../styles/Styles";
import { useNavigate, Link } from "react-router-dom";

const ProfileButton = () => {
    return (
        <div className="flex flex-col justify-center items-end h-full px-6 w-[30%]">
            {/* PROFILE SECTION */}
            <div className="flex justify-center items-center">
                {/* NAME & USERNAME */}
                <div className="flex flex-col justify-center items-end pr-4">
                    <h3 className="text-xl poppins-bold text-[var(--trust-blue)]">Juan de la Cruz</h3>
                    <h4 className="text-xs poppints-semibold text-[var(--trust-blue)]">@juandelacruz09</h4>
                </div>
                <Link to="/account"><img src="profile-placeholder.png" className="h-12"/></Link>
            </div>
        </div>
    );
}

export default ProfileButton;