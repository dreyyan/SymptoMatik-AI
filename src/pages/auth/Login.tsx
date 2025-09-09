import { useNavigate } from "react-router-dom";
import React from 'react';
import Styles from '../../styles/Styles';

// Components
import SignInButton from "../../components/SignInButton";

const Login = () => {
    // [ METHODS ]: User Authentication
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/Home");
    }

    const handleSignUp = () => {
        navigate("/SignUp");
    }

    // [ METHODS ]: OAuth Authentication
    const handleFacebookLogin = () => {
        alert("Logging in via Facebook...")
    }

    const handleGoogleLogin = () => {
        alert("Logging in via Google...")
    }

    const handleResetPassword = () => {

    }

    return (
    <div className={Styles.mainDivStyle}>
        <div className={Styles.loginDivStyle}>
            <img src="./symptomatik-banner.png" className="w-[80%] mt-6 mb-4"/>
            <h2 className={Styles.h2Style}>Welcome back!</h2>
            <h2 className={Styles.pStyle}>Sign in to access your dashboard.</h2>
            <form action="/login-form" className={Styles.formStyle}>
                <label htmlFor="username-email" className={Styles.inputLabelStyle}>Username or Email</label>
                <input type="text" className={Styles.inputStyle}/>
                <label htmlFor="password" className={Styles.inputLabelStyle}>Password</label>
                <input type="password" className={Styles.inputStyle}/>
                <button onClick={handleResetPassword} type="button" className={Styles.sublinkStyle}>Forgot your password?</button>
            </form>
            <button type="button" className={Styles.squareButtonStyle} onClick={handleLogin}>Sign In</button>
            <h4 className={Styles.separatorStyle}>------------------------------------ or ------------------------------------</h4>
                <SignInButton 
                src="/fb-icon.png" 
                alt="Facebook Login" 
                onClick={handleFacebookLogin} 
                label="Continue with Facebook"/>
                <SignInButton 
                src="/google-icon.png" 
                alt="Google Login" 
                onClick={handleGoogleLogin} 
                label="Continue with Google"/>
                <div className={Styles.signUpLinkDivStyle}>
                    <h4>Don't have an account?</h4>
                    <a className="text-[var(--trust-blue)]">Sign Up</a>
                </div>
        </div>
    </div>
  );
};

export default Login;