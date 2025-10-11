import { useNavigate, Link } from "react-router-dom";
import React from "react";
import Styles from "../../styles/Styles";

// Components
import OAuthButton from "../../components/buttons/OAuthButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const SignIn = () => {
  document.title = "SymptoMatik: Sign In";

  // [HANDLE]: User Authentication
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/home");
  };

  // [HANDLE]: OAuth Authentication
  const handleFacebookSignIn = () => {
    alert("Logging in via Facebook...");
  };

  const handleGoogleSignIn = () => {
    alert("Logging in via Google...");
  };

  return (
    <div className={Styles.mainDivStyle}>
      {/* Login Panel */}
      <div className={Styles.loginDivStyle}>
        {/* Header */}
        <div className="flex justify-center items-center gap-x-3 mb-2 mt-8">
            <img src="/symptomatik-logo.svg" className="h-10" />
            <img src="/symptomatik-banner.svg" className="h-full" />
        </div>

        <h2 className="text-4xl text-center inter-semibold text-[var(--trust-blue)]">
          Welcome Back
        </h2>
        <h2 className="text-md text-center">
          Please enter your login credentials
        </h2>

        {/* Form Input */}
        <form action="/login-form" className={Styles.formStyle}>
        <label htmlFor="username-email" className={Styles.inputLabelStyle}>Username or Email</label>
          <input
            type="text"
            placeholder="Username or Email"
            className={Styles.inputStyle}
          />

          <label htmlFor="password" className={Styles.inputLabelStyle}>Password</label>
          <input
            type="password"
            placeholder="Password"
            className={Styles.inputStyle}
          />

          <Link to="ResetPassword" className={Styles.sublinkStyle}>
            Forgot password?
          </Link>
        </form>

        {/* Button: Sign In */}
        <PrimaryButton
          text="Sign In"
          onClick={handleSignIn}
          width="full"
          fontSize="18px"
          height="40px"
          disabled={false}
        />

        {/* 'or' separator */}
        <div className="flex items-center w-full my-4 text-[var-(--trust-blue)]">
          <hr className="flex-grow border-t border-slate-400" />
          <span className="mx-2 text-[var-(--trust-blue)] text-sm">or</span>
          <hr className="flex-grow border-t border-slate-400" />
        </div>

        {/* Button: Sign Up */}
        <OAuthButton
          src="/fb-icon.png"
          alt="Facebook Sign In"
          onClick={handleFacebookSignIn}
          label="Continue with Facebook"
        />
        <OAuthButton
          src="/google-icon.png"
          alt="Google Sign In"
          onClick={handleGoogleSignIn}
          label="Continue with Google"
        />

        {/* Link: Sign Up */}
        <div className={Styles.signUpLinkDivStyle}>
          <h4>Don't have an account?</h4>
          <Link to="sign-up" className={Styles.sublinkStyle}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
