import Styles from "../styles/Styles";
import { useNavigate, Link } from "react-router-dom";

const ProfileButton = () => {
  return (
    <div className="flex flex-col justify-center items-end h-full px-6 w-[26%]">
      {/* PROFILE SECTION */}
      <Link to="/account" className="flex justify-center items-center gap-x-4">
        {/* PROFILE PLACEHOLDER */}
        <img src="profile-placeholder.avif" className="h-12 rounded-full" />
        {/* NAME & USERNAME */}
        <div className="flex flex-col justify-center pr-4">
          <h3 className="text-md font-[300] text-[var(--text)]">
            Juan de la Cruz
          </h3>
          <h4 className="text-xs font-[500] text-[var(--neutral-gray)]">
            @juandelacruz09
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default ProfileButton;
