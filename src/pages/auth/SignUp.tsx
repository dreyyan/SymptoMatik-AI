import { useNavigate, Link } from "react-router-dom";
import Styles from '../../styles/Styles';

// Components
import OAuthButton from "../../components/buttons/OAuthButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const SignUp = () => {
    document.title = "SymptoMatik: Sign Up";

    // [HANDLE]: User Authentication
    const navigate = useNavigate();

    const handleSignUp = () => {
        alert("Success! You may now proceed to login.")
        navigate("/");
    }

    // [HANDLE]: OAuth Authentication
    const handleFacebookSignUp = () => {
        alert("Logging in via Facebook...")
    }

    const handleGoogleSignUp = () => {
        alert("Logging in via Google...")
    }

    return (
    <div className={Styles.mainDivStyle}>
        {/* Login Panel */}
        <div className={Styles.loginDivStyle}>
            {/* Header */}
            <div className="flex gap-4">
                <img src="./symptomatik-logo.svg" className="w-10 mt-6 mb-4"/>
                <img src="./symptomatik-banner.svg" className="w-[50%] mt-6 mb-4"/>
            </div>

            <h2 className="text-[var(--trust-blue)] text-3xl font-bold">Start your journey</h2>
            <h2 className={Styles.pStyle}>Be a part of the revolution.</h2>

            {/* Form Input */}
            <form action="/login-form" className={Styles.formStyle}>
                <label htmlFor="username-email" className={Styles.inputLabelStyle}>Email</label>
                <input type="text" className={Styles.inputStyle}/>
                
                <label htmlFor="username-email" className={Styles.inputLabelStyle}>Username</label>
                <input type="text" className={Styles.inputStyle}/>

                <label htmlFor="password" className={Styles.inputLabelStyle}>Password</label>
                <input type="password" className={Styles.inputStyle}/>

                <label htmlFor="username-email" className={Styles.inputLabelStyle}>Confirm Password</label>
                <input type="text" className={Styles.inputStyle}/>
            </form>

            {/* Button: Sign Up */}
            <PrimaryButton text="Sign Up" onClick={handleSignUp} width="full" fontSize="18px" height="40px" disabled={false}/>

            {/* 'or' separator */}
            <div className="flex items-center w-full my-4 text-[var-(--trust-blue)]">
                <hr className="flex-grow border-t border-slate-400"/>
                <span className="mx-2 text-[var-(--trust-blue)] text-sm">or</span>
                <hr className="flex-grow border-t border-slate-400"/>
            </div>

            {/* Button: Sign Up */}
            <OAuthButton 
            src="/fb-icon.png" 
            alt="Facebook Sign Up" 
            onClick={handleFacebookSignUp} 
            label="Continue with Facebook"/>
            <OAuthButton
            src="/google-icon.png" 
            alt="Google Sign Up" 
            onClick={handleGoogleSignUp} 
            label="Continue with Google"/>

            {/* Link: Sign In */}
            <div className={Styles.signUpLinkDivStyle}>
                <h4>Already have an account?</h4>
                <Link to=".." className={Styles.sublinkStyle}>Sign In</Link>
            </div>
        </div>
    </div>
  );
};

export default SignUp;