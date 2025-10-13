import { useNavigate, Link } from "react-router-dom";
import Styles from '../../styles/Styles';
import { useState } from "react";

// Components
import OAuthButton from "../../components/buttons/OAuthButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const SignUp = () => {
    document.title = "SymptoMatik: Sign Up";

    // STATES: Sign Up
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // [HANDLE]: User Authentication
    const navigate = useNavigate();

    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // prevent page reload

        const userData = {
        name,
        email,
        username,
        password,
        confirm_password: confirmPassword,
        };

        try {
            const res = await fetch("http://localhost:8000/api/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            });

            const data = await res.json();
            console.log("Response:", data);

            if (res.ok) { // ✅ check HTTP status instead of data.success
                alert(`User ${data.username} registered successfully!`);
                // Navigate to sign in page after registering account
                navigate("/");
            } else {
                alert(data.detail || "Signup failed");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Network error during signup");
        }
    };

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
        <div className="flex justify-center items-center gap-x-3 mb-4 mt-8">
            <img src="/symptomatik-logo.svg" className="h-10" />
            <img src="/symptomatik-banner.svg" className="h-full" />
        </div>

            <h2 className="text-4xl text-center inter-semibold text-[var(--trust-blue)]">Start your journey</h2>
            <h2 className={Styles.pStyle}>Be a part of the revolution.</h2>

            {/* Form Input */}
            <form onSubmit={handleSignUp} className={Styles.formStyle}>
                <label className={Styles.inputLabelStyle}>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name..." className={Styles.inputStyle}/>

                <label className={Styles.inputLabelStyle}>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your email..." className={Styles.inputStyle}/>
                
                <label className={Styles.inputLabelStyle}>Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username..." className={Styles.inputStyle}/>

                <label htmlFor="password" className={Styles.inputLabelStyle}>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="**********" className={Styles.inputStyle}/>

                <label className={Styles.inputLabelStyle}>Confirm Password</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="**********" className={Styles.inputStyle}/>
                {/* Button: Sign Up */}
                <PrimaryButton text="Sign Up" type="submit" width="full" fontSize="18px" height="40px" disabled={false}/>
            </form>

            {/* 'or' separator */}
            <div className="flex items-center w-full my-4">
                <hr className="flex-grow border-t border-slate-400"/>
                <span className="mx-2 text-[var(--slate-gray)] text-sm">or</span>
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
                <Link to="../sign-in" className={Styles.sublinkStyle}>Sign In</Link>
            </div>
        </div>
    </div>
  );
};

export default SignUp;